var transform = require('./transform');
var bitmapToObject = require('./bitmapToObject');
var objectToBitmap = require('./objectToBitmap');

var parseArgs = function(args) {
  // return {src: filename, dest: filename, transform: name, transData: obj}
}

var options = parseArgs(process.argv);

var srcName = options.src;
var destName = options.dest;
var transformName = options.transform;

// Create object from bitmap file
var imageObj = bitmapToObject(srcName);

// Transform pixel array
imageObj.pixels = transform[transformName](imageObj.pixels, transData);

// Write new bitmap file from object
objectToBitmap(imageObj);
