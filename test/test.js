var buildImage = require('../objectToBitmap.js'),
		readImage = require('../bitmapToObject.js'),
		expect = require('chai').expect,
		dest = './testimg.bmp',
		fs = require('fs'),
		EE = require('events').EventEmitter,
		ee = new EE();

describe('updated test', function() {

	describe('bitmapToObject', function(done) {
		it('will read the bmp file, convert to an object and emit an event', function() {
			readImage('./non-palette-bitmap.bmp', ee, done);	
			ee.on('objectCreated', function(data) {
				console.log(data.type);
				expect(data.type).equal('BM');
//				done();
				});
			
			});
		});

	describe('objectToBitmap', function(done) {
		it('will write a js object back to the bmp file', function() {
				readImage('./non-palette-bitmap.bmp', ee, done);
				ee.on('objectCreated', function(imageSpecs) {
					buildImage(dest, imageSpecs);
					done();
				});
	
			fs.exists('./testimg.bmp', function (exist) {
				console.log(exist);
				expect(exist).to.be.true;
				done();	
			});
		});
	});
});
