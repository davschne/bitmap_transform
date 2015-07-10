var transform = require('./transform');
var bitmapToObject = require('./bitmapToObject');
var objectToBitmap = require('./objectToBitmap');

var parseArgs = function(args) {
  // return {src: filename.bmp, dest: filename.bmp, transform: name, transData: obj}
}

var options = parseArgs(process.argv);

// Create object from bitmap file
var imageObj = bitmapToObject(options.src);

// Transform pixel array
imageObj.pixels = transform[options.transform](imageObj.pixels, options.transData);

// Write new bitmap file from object
objectToBitmap(options.dest, imageObj);
