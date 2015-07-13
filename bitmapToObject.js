var fs = require('fs');

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

		if (image.DIBsize === 40) {

			// BITMAPINFOHEADER
			image.width = data.readInt32LE(18); // signed int
			image.height = data.readInt32LE(22); // signed int
			image.colorDepth = data.readUInt16LE(28);
			if (data.readUInt32LE(30) !== 0) {
				throw new Error('Can only accept uncompressed bitmaps');
			}
			image.imageSize = data.readUInt32LE(34);
			image.numColorInPalette = data.readUInt32LE(46);

		} else if (image.DIBsize === 12) {

			// BITMAPCOREHEADER
			image.width = data.readUInt16LE(18);
			image.height = data.readUInt16LE(20);
			image.colorDepth = data.readUInt16LE(24);

		} else {
			throw new Error('Unexpected DIB header size: unrecognized encoding');
		}

		image.bufferSize = data.length;

		image.dataBuffer = data;

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
		ee.emit('objectCreated', image);
	});
};

