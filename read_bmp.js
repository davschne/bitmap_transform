var fs = require('fs'),
		buffer = require('buffer'),
		nonPaletteBuffer;

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
	paletteBMPObj.palette1 = [data.readInt8(54), data.readInt8(55), data.readInt8(56)];
	paletteBMPObj.palette2 = [data.readInt8(57), data.readInt8(58), data.readInt8(59)];
	paletteBMPObj.palette3 = [data.readInt8(60), data.readInt8(61), data.readInt8(62)];
	// 54 + 256*4 = 1078, 256 colors in color palette
	paletteBMPObj.firstPixel = data.readInt8(1078) //
	paletteBMPObj.lastPixel = data.readUInt8(1078 + (100 * 100 - 4)); // last pixel ???? read 8bit or 32? 
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
	nonPaletteBMPObj.colorDepth = data.readUInt32LE(28); // 24 bits per pixel or 3 bytes (no alpha value?) RGB24
	nonPaletteBMPObj.rawSize = data.readUInt32LE(34);
	nonPaletteBMPObj.numColorInPalette = data.readUInt32LE(46);
	nonPaletteBMPObj.Pixel1 = [data.readInt8(54), data.readInt8(55), data.readInt8(56)];
	nonPaletteBMPObj.Pixel2 = [data.readInt8(57), data.readInt8(58), data.readInt8(59)];
	nonPaletteBMPObj.Pixel3 = [data.readInt8(60), data.readInt8(61), data.readInt8(62)];
	nonPaletteBMPObj.Pixel4 = [data.readInt8(63), data.readInt8(64), data.readInt8(65)];
	
	data.writeInt16LE(0, 54) // blue
	data.writeInt16LE(255, 55) // green
	data.writeInt16LE(0, 56) //red
	
	data.writeInt16LE(255, 57) // blue
	data.writeInt16LE(0, 59) // green
	data.writeInt16LE(0, 60) //red
	
	
	data.writeInt16LE(0, 63) // blue
	data.writeInt16LE(0, 64) // green
	data.writeInt16LE(255, 65) //red
//	nonPaletteBMPObj.lastPixel = data.readUInt32LE(54 + (100*100)*3-4);
	
	nonPaletteBuffer = Array.prototype.slice.call(data, (54));
	
	nonPaletteBMPObj.bufferSize = data.length;
	console.log(nonPaletteBMPObj);
	
	writeBuff(data);
	
});


function writeBuff(buff) {
	fs.writeFile('image.bmp', buff, 'binary', function(err){
  	if (err) throw err;
  	console.log('File saved.');
})
}

//blue gree red order