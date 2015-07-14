var transform = require('./transform');
var bitmapToObject = require('./bitmapToObject');
var objectToBitmap = require('./objectToBitmap');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var parseArgs = function(args) {
  var options = Array.prototype.slice.call(args, 5, args.length);
  for (var i = 0; i < options.length; i++) {
    options[i] = Number(options[i]);
  }
  return {src: args[2],
          dest: args[3],
          transform: args[4],
          transData: options};
};

var options = parseArgs(process.argv);

// Create object from bitmap file
bitmapToObject(options.src, ee);

// when function finishes loading file, it will call:
// ee.emit('objectCreated', imageSpecs);

ee.on('objectCreated', function(imageObj) {

  // Transform pixel array
  imageObj = transform[options.transform](imageObj, options.transData);

  // Write new bitmap file from object
  objectToBitmap(options.dest, imageObj);
});
