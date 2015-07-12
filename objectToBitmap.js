var fs = require('fs');
//exports = module.exports = function(filename, dataObject) {
exports = module.exports = function(filename, image) {

  var buffer = image.dataBuffer; //dataObject.headerBuffer
  var imageStart = buffer.readUInt32LE(10); //bufferLocation;
  // var bufferSize = buffer.readUInt32LE(34)
  var pixels = image.pixels; //[2, 2, 44];

  var pixelCount = 0;
  for (var i = 0; i < pixels.length; i++ ) {
    for (var j = 0; j < 3; j++) {
      //make sure not to go out of bounds - why 2 - I have now fn idea.
      if(pixelCount > buffer.readUInt32LE(34) - 2){
        break;
      }
      //console.log('(' + pixelCount + '): ' + pixels[i][j]);
      buffer.writeInt16LE(pixels[i][j], + (pixelCount + imageStart));
      pixelCount++;
    }
  }

  //Will write new image byte data
  this.writeBmpFile = function(filename, buffer){
    console.log(filename)
    fs.writeFile(filename, buffer, 'binary', function(err){
      if (err) throw err
      console.log('File saved.')
    });
  }

  writeBmpFile(filename, buffer);

}
