var fs = require('fs');

var buildArrayFromPalette = function(image, data) {
	var pixels = [];
	var offset = image.imageStart;
	var dataLength = image.fileSize - offset;
	console.log('dataLength: ', dataLength);
	var tableOffset = 54;
	console.log(image.fileSize);

	for (var i = 0; i < dataLength; i++) {
		//console.log(offset + tableOffset);
		var pointer = data.readUInt8(offset + tableOffset);
		//console.log('pointer: ', pointer);
		var palettePixel = [data.readUInt8(pointer),
								 				data.readUInt8(pointer + 1),
								 				data.readUInt8(pointer + 2)];
		var pixel = [];
		for (var ch = 0; ch < 3; ch++) {
			pixel.push(palettePixel[ch]);
		}
		pixels.push(pixel);
		offset += 1; // ASSUMING 8bit pointers
	}
	image.pixels = pixels;
	return image;
};

var buildArrayNonPalette = function(image, data) {
	// var pixelBuffer = Array.prototype.slice.call(data, image.imageStart);
	var pixels = [];

	//console.log('Pixels: ', image.width * image.height); // DEBUG
	//console.log('File size: ', image.fileSize); // DEBUG

	var offset = image.imageStart;
	// iterate rows
	for (var y = 0; y < Math.abs(image.height); y++) {
		var byteCount = 0;
		// iterate columns
		for (var x = 0; x < image.width; x++) {

			//console.log(offset); // DEBUG

			// var i = (y * width) + x;
			var pixel = [];
			for (var ch = 0; ch < 3; ch++) {
				pixel.push(data.readUInt8(offset));
				offset++;
				byteCount++;
			}
			pixels.push(pixel);
			// console.log(pixel); // DEBUG
		}
		var bytesPadding = (4 - (byteCount % 4)) % 4;
		offset += bytesPadding;
		//console.log('Padding (line ', y, '): ', bytesPadding); // DEBUG
	}
	image.pixels = pixels;
	return image;
};

module.exports = function (fileName, ee) {

	fs.readFile(fileName, function(err, data) {

		var image = Object.create(null);
		image.type = data.toString('ascii', 0, 2);

		if (image.type !== 'BM') {
	    throw new Error("Can only accept bitmap files of type BM");
	  }

		image.fileSize = data.readUInt32LE(2);
		image.imageStart = data.readUInt32LE(10);
		image.DIBsize = data.readUInt32LE(14);

		// BITMAPINFOHEADER
		image.width = data.readInt32LE(18); // signed int
		image.height = data.readInt32LE(22); // signed int
		image.colorDepth = data.readUInt16LE(28);
		if (data.readUInt32LE(30) !== 0) {
			throw new Error('Can only accept uncompressed bitmaps');
		}
		image.imageSize = data.readUInt32LE(34);
		image.numColorInPalette = data.readUInt32LE(46);

		image.bufferSize = data.length;

		image.dataBuffer = data;

		if (image.imageStart > 54) {
			throw new Error("No palettes allowed!!!");
			image = buildArrayFromPalette(image, data);
		} else {
			image = buildArrayNonPalette(image, data);
		}

		//console.log(image.pixels);

		ee.emit('objectCreated', image);
	});
};

