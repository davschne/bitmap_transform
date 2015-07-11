var transform = require('./transform');
var bitmapToObject = require('./bitmapToObject');
var objectToBitmap = require('./objectToBitmap');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();


var parseArgs = function(args) {
  // return {src: filename.bmp, dest: filename.bmp, transform: name, transData: obj}
  var options = {};
	options.src = args[2];
	options.dest = args[3];
  return options;
}

var options = parseArgs(process.argv);

// Create object from bitmap file
bitmapToObject(options.src, ee);

// when function finishes loading file, it will call:
//   ee.emit('objectCreated', imageSpecs);

ee.on('objectCreated', function(err, imageSpecs) {

  // Transform pixel array
  imageSpecs.pixels = transform.scaleGrey(imageSpecs.pixels);

  // Write new bitmap file from object
  objectToBitmap(options.dest, imageSpecs);
});
