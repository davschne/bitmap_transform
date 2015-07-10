var fs = require('fs'),
		buffer = require('buffer'),
		paletteBuffer;

var paletteBMPObj = {},
		nonPaletteBMPObj = {};

fs.readFile('./palette-bitmap.bmp', function(err, data) {
//	paletteBuffer = data;
	paletteBMPObj.type = data.toString('ascii', 0, 2);
	paletteBMPObj.size = data.readUInt32LE(2); 
	paletteBMPObj.imageStart = data.readUInt32LE(10); 
	paletteBMPObj.imageWidth = data.readUInt32LE(18); // signed int?, read16, same result
	paletteBMPObj.imageHeight = data.readUInt32LE(22); // signed int?
	paletteBMPObj.colorDepth = data.readUInt16LE(28); // 8 bits per pixel or 1 byte
	paletteBMPObj.compression = data.readUInt32LE(30); 
	paletteBMPObj.rawSize = data.readUInt32LE(34);
	paletteBMPObj.numColorInPalette = data.readUInt32LE(46);
	paletteBMPObj.palette1 = data.readUInt32LE(54).toString(16); 
	paletteBMPObj.palette2 = data.readUInt32LE(58).toString(16); 
	// 54 + 256*4 = 1078, 256 colors in color palette
	paletteBMPObj.firstPixel = data.readUInt32LE(1078).toString(16); // image start, first pixel should use readInt8  or 16, or toString('hex'?
	paletteBMPObj.lastPixel = data.readUInt32LE(1078 + (100 * 100 - 4)); // last pixel ???? read 8bit or 32? 
	paletteBMPObj.bufferSize = data.length;
	console.log(paletteBMPObj);
});

fs.readFile('./non-palette-bitmap.bmp', function(err, data) {
//	paletteBuffer = data;
	nonPaletteBMPObj.type = data.toString('ascii', 0, 2);
	nonPaletteBMPObj.size = data.readUInt32LE(2); 
	nonPaletteBMPObj.imageStart = data.readUInt32LE(10); 
	nonPaletteBMPObj.imageWidth = data.readUInt32LE(18); 
	nonPaletteBMPObj.imageHeight = data.readUInt32LE(22); 
	nonPaletteBMPObj.colorDepth = data.readUInt16LE(28); // 24 bits per pixel or 3 bytes (no alpha value?) RGB24
	nonPaletteBMPObj.rawSize = data.readUInt32LE(34);
	nonPaletteBMPObj.numColorInPalette = data.readUInt32LE(46);
	nonPaletteBMPObj.firstPixel = data.readUInt32LE(54); 
	nonPaletteBMPObj.secondPixel = data.readUInt32LE(58); //??? there is no read24?
	nonPaletteBMPObj.lastPixel = data.readUInt32LE(54 + (100*100)*3-4);
	nonPaletteBMPObj.bufferSize = data.length;
	console.log(nonPaletteBMPObj);
});


//blue gree red order