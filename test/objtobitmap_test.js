var buildImage = require('../objectToBitmap.js'),
		readImage = require('../bitmapToObject.js'),
		expect = require('chai').expect,
		dest = './testimg.bmp',
		fs = require('fs'),
		EE = require('events').EventEmitter,
		ee = new EE();

describe('all test', function() {

	describe('bitmapToObject', function() {
		it('will read the bmp file, convert to an object and emit an event', function() {
			readImage('./test/non-palette-bitmap.bmp', ee);
			ee.on('objectCreated', function(data) {
					expect(data.type).equal('BM');
				});
			});
		});

	describe('objectToBitmap', function() {
		it('will write a js object back to the bmp file', function() {
			before(function() {
				readImage('./test/non-palette-bitmap.bmp', ee);
				ee.on('objectCreated', function(imageSpecs) {
					buildImage(dest, imageSpecs);
					done();
				});
			})
			fs.readFile('./testimg.bmp', function (err, data) {
				expect(err).to.be(null);
			});
		});
	});

});
