var writeBmpFile = require('../objectToBitmap.js'),
		readImage = require('../bitmapToObject.js'),
		expect = require('chai').expect,
		child_process = require('child_process');
		dest = './testimg1.bmp',
		fs = require('fs'),
		EE = require('events').EventEmitter,
		ee = new EE();

describe('updated test', function() {

	describe('bitmapToObject', function() {
		it('will read the bmp file, convert to an object and emit an event', function() {
			readImage('./test/non-palette-bitmap.bmp', ee);
			ee.on('objectCreated', function(obj){
				expect(obj.type).equal('BM');
//				done();
				});
			});
		});

	describe('objectToBitmap', function(done) {
		it('will write a js object back to the bmp file', function(done) {
			readImage('./test/non-palette-bitmap.bmp', ee);

			ee.on('objectCreated', function(obj){
					writeBmpFile(dest, obj);
				});

			setTimeout(function() {
				fs.exists('./testimg1.bmp', function (exist) {
					expect(exist).to.be.true;
					done();
				});
			}, 500);
		});
		after(function() {
			child_process.execSync('rm testimg1.bmp');
		});
	});
});
