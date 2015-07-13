var fs = require('fs');

var buildHeader = function(image) {

  this.write(image.type, 0, 2, 'ascii'); // type
  this.writeUInt32LE(image.fileSize, 2); // file size
  this.writeUInt32LE(0, 6); // reserved values (not needed)
  this.writeUInt32LE(image.imageStart, 10); // start of pixel data
  this.writeUInt32LE(image.DIBsize, 14); // DIB header size

  if (image.DIBsize === 40) {

    // BITMAPINFOHEADER
    this.writeInt32LE(image.width, 18); // signed int
    this.writeInt32LE(image.height, 22); // signed int
    this.writeUInt16LE(1, 26); // color planes : 1
    this.writeUInt16LE(image.colorDepth, 28); // bits per pixel
    this.writeUInt32LE(0, 30); // compression : none
    this.writeUInt32LE(image.imageSize, 34); // image size incl padding
    this.writeInt32LE(2835, 38); // h resolution, signed
    this.writeInt32LE(2835, 42); // v resolution, signed
    this.writeUInt32LE(image.numColorInPalette, 46); // colors in palette
    this.writeUInt32LE(0, 50); // 0 : all colors important

  } else if (image.DIBsize === 12) {

    // BITMAPCOREHEADER
    this.writeUInt16LE(image.width, 18);
    this.writeUInt16LE(image.height, 20);
    this.writeUInt16LE(1, 22);
    this.writeUInt16LE(image.colorDepth, 24);

  } else {
    throw new Error('Unexpected DIB header size: unrecognized encoding');
  }

  return this;
}

exports = module.exports = function(filename, image) {

  // var numPixels = Math.abs(image.width * image.height);
  console.log(image.pixels[1], image.pixels[image.pixels.length - 1])
  var channels = 3;//image.colorDepth / 8;
  var bytesPerRow = image.width * channels;
  var paddingPerRow = (4 - (bytesPerRow % 4)) % 4;
  image.imageSize = Math.abs((bytesPerRow + paddingPerRow) * image.height);
  image.fileSize = 54 /*image.imageStart*/ + image.imageSize;
  var buffer = new Buffer(image.fileSize);
  buffer = buildHeader.call(buffer, image);

  var pixels = image.pixels;

  var offset = 54; //image.imageStart;


  var i = 0;
  // iterate rows
  for (var y = 0; y < Math.abs(image.height); y++) {
    var byteCount = 0;
    // iterate columns
    for (var x = 0; x < image.width; x++) {
      // var i = (y * image.width) + x;
      // iterate color channels
      for (var ch = 0; ch < 3; ch++) {
        buffer.writeUInt8(pixels[i][ch], offset);
        // console.log('offset: ', offset); // DEBUG
        // console.log('byteCount: ', byteCount); // DEBUG
        offset++;
        byteCount++;
      }
      i++;
    }
    var bytesPadding = (4 - (byteCount % 4)) % 4;
    while (bytesPadding > 0) {
      buffer.writeUInt8(0, offset);
      // console.log('padding: ', offset); // DEBUG
      offset++;
      bytesPadding--;
    }
  }

  //Will write new image byte data
  this.writeBmpFile = function(filename, buffer) {
    console.log(filename)
    fs.writeFile(filename, buffer, 'binary', function(err) {
      if (err) throw err
      console.log('File saved.')
    });
  }

  writeBmpFile(filename, buffer);
}
