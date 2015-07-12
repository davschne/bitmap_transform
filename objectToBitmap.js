var fs = require('fs');

exports = module.exports = function(filename, image) {

  var buffer = image.dataBuffer;
  // var imageStart = buffer.readUInt32LE(10);
  // var bufferSize = buffer.readUInt32LE(34)
  var pixels = image.pixels; //[2, 2, 44];

  var offset = image.imageStart;
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
        console.log('offset: ', offset); // DEBUG
        console.log('byteCount: ', byteCount); // DEBUG
        offset++;
        byteCount++;
      }
      i++;
    }
    var bytesPadding = (4 - (byteCount % 4)) % 4;
    while (bytesPadding > 0) {
      buffer.writeUInt8(0, offset);
      console.log('padding: ', offset); // DEBUG
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
