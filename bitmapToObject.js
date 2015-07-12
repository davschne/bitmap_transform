var fs = require('fs');

module.exports = function (fileName, ee) {

	fs.readFile(fileName, function(err, data) {

		var image = Object.create(null);
		image.type = data.toString('ascii', 0, 2);

		if (image.type !== 'BM') {
	    throw new Error("Can only accept bitmap files of type BM");
	  }

		image.size = data.readUInt32LE(2);
		image.imageStart = data.readUInt32LE(10);
		image.DIBsize = data.readUInt32LE(14);

		if (image.DIBsize === 40) {

			// BITMAPCOREHEADER
			image.imageWidth = data.readUInt32LE(18);
			image.imageHeight = data.readUInt32LE(22);
			image.colorDepth = data.readUInt32LE(28);
			image.numColorInPalette = data.readUInt32LE(46);

		} else if (image.DIBsize === 12) {

			// BITMAPINFOHEADER
			image.imageWidth = data.readUInt16LE(18);
			image.imageHeight = data.readUInt16LE(20);
			image.colorDepth = data.readUInt16LE(24);

		} else {
			throw new Error('Unexpected DIB header size: unrecognized encoding');
		}

		image.bufferSize = data.length;

		image.dataBuffer = data;

		var pixelBuffer = Array.prototype.slice.call(data, image.imageStart);
		var pixels = [];

		for (var i = 0; i < pixelBuffer.length; i += 3) {
			pixels.push([data.readUInt8(pixelBuffer[i]), data.readUInt8(pixelBuffer[i+1]), data.readUInt8(pixelBuffer[i+2])]);
		}

		image.pixels = pixels;
		ee.emit('objectCreated', image);
	});
};

