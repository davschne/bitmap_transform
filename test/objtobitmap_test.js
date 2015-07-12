var buildImage = require('../bitmapToObject.js'),
		readImage = require('../bitmapToObject.js'),
		expect = require('chai').expect,
		dest = './testimg.bmp',
		fs = require('fs'),
		ee = require('events').EventEmitter;


// testing cases for 1. passing name variable to the func. 2. passing variable from command line

describe('bitmapToObject', function() {

	it('will write a js object back to the bmp file', function() {
		before(function() {
			readImage('./non-palette-bitmap.bmp', ee);
			ee.on('objectCreated', function(imageObj) {
				buildImage(dest, imageObj);
				done();
			});
		})
		fs.exists('./testimg.bmp', function (exists) {
  		expect(exists).to.be(true);	
		});
	});
	
});