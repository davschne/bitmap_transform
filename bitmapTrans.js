var fs = require('fs')

var buffer = fs.readFileSync('./test/palette-bitmap.bmp');

console.log("Image Type: " + buffer.toString('ascii', 0, 2)); // file type
console.log("File Size: " + buffer.readUInt32LE(2)); // file size
console.log("Image Data Offset: " + buffer.readUInt32LE(10)); // image data offset
console.log("Image Type: " + buffer.readUInt32LE(46)); // num colors in palette.

console.log("Image Height: " + buffer.readUInt32LE(18)); // image height.
console.log("Image Width: " + buffer.readUInt32LE(22)); // image width
console.log("Image Depth: " + buffer.readUInt32LE(28)); // color depth.

var imageOffset = buffer.readUInt32LE(10);
var imageHeight = buffer.readUInt32LE(18);
var imageWidth = buffer.readUInt32LE(22);
var imageBitPerPixel = buffer.readUInt32LE(24);

console.log("Bit Per Pixel: " + imageBitPerPixel);

var rowSize = (((imageBitPerPixel/16) * imageWidth + 31) / 32) * 4;
var pixelArraySize = rowSize * imageHeight;

console.log("Row Size: " + rowSize);
console.log("Pixel Array Size: " + pixelArraySize);

// now fill the image
/*
for (var i=0; i<imageHeight; i++) {
  for (var j=0; j<imageWidth; j++) {
    var pixel = buffer[i*imageWidth + imageOffset];
    //console.log(i+"_"+j+" : "+pixel)
  }
}
*/

reverseFiltered = function(data, width, height) {

  if (this._colorType == 3) { // paletted

    // use values from palette
    var pxLineLength = width << 2;

    for (var y = 0; y < height; y++) {
      var pxRowPos = y * pxLineLength;

      for (var x = 0; x < width; x++) {
          var pxPos = pxRowPos + (x << 2),
              color = this._palette[data[pxPos]];

          for (var i = 0; i < 4; i++)
              data[pxPos + i] = color[i];
      }
    }
  }
};


fs.writeFile('image.bmp', buffer, 'binary', function(err){
  if (err) throw err
  console.log('File saved.')
})

//https://github.com/niegowski/node-pngjs/blob/master/lib/parser.js