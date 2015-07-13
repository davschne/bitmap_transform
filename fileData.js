var bitmapToObject = require('./bitmapToObject');
var EventEmitter = require('events').EventEmitter;

var ee = new EventEmitter();
var filename = process.argv[2];

bitmapToObject(filename, ee);

ee.on('objectCreated', function(image) {
  for (key in image) {
    if (key !== 'dataBuffer' &&
        key !== 'pixels') {
      console.log(key, image[key]);
    }
  }
});
