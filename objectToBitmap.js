var fs = require('fs');
//exports = module.exports = function buildImage(filename, dataObject){
exports = module.exports = function buildImage(filename, fileData){

  var buffer = fileData.dataBuffer; //dataObject.headerBuffer
  var startPixelLocation = buffer.readUInt32LE(10); //bufferLocation;
  var bufferSize = buffer.readUInt32LE(34)
  var pixArray = fileData.pixels; //[2, 2, 44];

  /*
  console.log("Image Type: " + buffer.toString('ascii', 0, 2)); // file type
  console.log("File Size: " + buffer.readUInt32LE(2)); // file size
  console.log("Image Data Offset: " + buffer.readUInt32LE(10)); // image data offset
  console.log("Image Type: " + buffer.readUInt32LE(46)); // num colors in palette.
  console.log("Image Height: " + buffer.readUInt32LE(18)); // image height.
  console.log("Image Width: " + buffer.readUInt32LE(22)); // image width
  console.log("Image Depth: " + buffer.readUInt32LE(28)); // color depth.
  console.log("Total Image Bytes: " + buffer.readUInt32LE(34));
  console.log("start: " + startPixelLocation + " size: " + buffer.readUInt32LE(2));
  */
  //interate through pixelArray and assign values to pixels
  //for ( var i = startPixelLocation; i < buffer.readUInt32LE(2) - 4; i += 3 ) {
    //console.log('(' + i + '): ' + pixArray[i][0] + ' : ' + pixArray[i][1] + ' : ' + pixArray[i][2]);
    //buffer.writeInt16LE(pixArray[i][0], i);
    //buffer.writeInt16LE(pixArray[i][1], i + 1);
    //buffer.writeInt16LE(pixArray[i][2], i + 2);
  //}

  var pixelCount = 0;
  for (var i = 0; i < pixArray.length; i++ ) {
    for(var j = 0; j < 3; j++){
      //make sure not to go out of bounds - why 2 - I have now fn idea.
      if(pixelCount > buffer.readUInt32LE(34) - 2){
        break;
      }
      //console.log('(' + pixelCount + '): ' + pixArray[i][j]);
      buffer.writeInt16LE(pixArray[i][j], + (pixelCount + startPixelLocation));
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