var expect = require('chai').expect;
var transform = require('../transform');

describe('transform', function() {

  describe('.identity', function() {
    var array1 = [[1, 2, 3], [4, 5, 6]];
    var image = {};
    image.pixels = array1;
    it('should pass an array unchanged', function() {
      expect(transform.identity(image).pixels).to.deep.equal(array1);
    });
  });

  describe('.brightness', function() {
    var array1 = [[1, 2, 3], [4, 5, 6]];
    var image = {};
    image.pixels = array1;
    image.colorDepth = 24;
    it('should scale each pixel channel by a factor', function() {
      var scaleBy2 = [[2, 4, 6], [8, 10, 12]];
      expect(transform.brightness(image, [2]).pixels).to.deep.equal(scaleBy2);
    });
    // 'should throw an Error if colorDepth !== 24'
  });

  describe('.scaleRGB', function() {
    var array1 = [[1, 2, 3], [4, 5, 6]];
    var image = {};
    image.pixels = array1;
    image.colorDepth = 24;
    it('should scale RGB channels independently according to array of scaling factors', function() {
      var scale234 = [[1*4, 2*3, 3*2], [4*4, 5*3, 6*2]];
      expect(transform.scaleRGB(image, [2, 3, 4]).pixels).to.deep.equal(scale234);
    });
    // 'should throw an Error if colorDepth !== 24'
  });
});
