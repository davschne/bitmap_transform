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

  describe('.scale', function() {
    var array1 = [[1, 2, 3], [4, 5, 6]];
    var image = {};
    image.pixels = array1;
    image.colorDepth = 24;
    it('should scale each pixel channel by a factor', function() {
      var scaleBy2 = [[2, 4, 6], [8, 10, 12]];
      expect(transform.scale(image, [2]).pixels).to.deep.equal(scaleBy2);
    });
    // 'should clip values greater than 255'
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
    // 'should clip values greater than 255'
    // 'should throw an Error if colorDepth !== 24'
  });

  describe('.grayscale', function() {
    var array1 = [[1, 2, 3], [4, 5, 6]];
    var image = {};
    image.pixels = array1;
    image.colorDepth = 24;
    it('should set all channels per pixel to the average of R, G, B values', function() {
      var grayscaled = [[2, 2, 2], [5, 5, 5]];
      expect(transform.grayscale(image).pixels).to.deep.equal(grayscaled);
    });
    // 'should throw an Error if colorDepth !== 24'
  });

  describe('.rotateCCW', function() {
    var array1 = [[1,  2,  3],  [4,  5,  6],
                  [7,  8,  9],  [10, 11, 12],
                  [13, 14, 15], [16, 17, 18]];
    var image = {};
    image.pixels = array1;
    image.width = 2;
    image.height = 3;
    image.colorDepth = 24;
    var rotatedCCW = [[13, 14, 15], [7,  8,  9],  [1, 2, 3],
                     [16, 17, 18], [10, 11, 12], [4, 5, 6]];
    var rotatedImage = transform.rotateCCW(image);
    it('should rotate the pixel array clockwise 90 degrees', function() {
      expect(rotatedImage.pixels).to.deep.equal(rotatedCCW);
    });
    it('should switch image.width and image.height properties', function() {
      expect(rotatedImage.width).to.equal(3);
      expect(rotatedImage.height).to.equal(2);
    });
  });
});
