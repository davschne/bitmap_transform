var transform = require('./transform');
var bitmapToObject = require('./bitmapToObject');
var objectToBitmap = require('./objectToBitmap');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var parseArgs = function(args) {
  return {src: args[2], dest: args[3], transform: [args[4]], /*transData: obj*/}
}

var options = parseArgs(process.argv);

// Create object from bitmap file
bitmapToObject(options.src, ee);

// when function finishes loading file, it will call:
// ee.emit('objectCreated', imageSpecs);

ee.on('objectCreated', function(imageObj) {

  // Transform pixel array
  imageObj.pixels = transform[options.transform](imageObj.pixels/*, options.transData*/);

  // Write new bitmap file from object
  objectToBitmap(options.dest, imageObj);
});
