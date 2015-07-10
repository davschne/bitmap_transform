var expect = require('chai').expect;
var transform = require('../transform');

describe('transform', function() {
  var array1 = [[1, 2, 3], [4, 5, 6]];
  describe('.identity', function() {
    it('should pass an array unchanged', function() {
      expect(transform.identity(array1)).to.deep.equal(array1);
    });
  });
  describe('.brightness', function() {
    it('should scale each pixel channel by a factor', function() {
      var array1 = [[1, 2, 3], [4, 5, 6]];
      var scaleBy2 = [[2, 4, 6], [8, 10, 12]];
      console.log(transform.brightness(array1, 2));
      expect(transform.brightness(array1, 2)).to.deep.equal(scaleBy2);
    });
  });
});
