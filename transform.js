function scale(value, scale_factor, max) {
  return Math.min(value * scale_factor, max || 255);
};

exports.brightness = function(pixels, scale_factor, max) {
  var newPixels;
  for (var i = 0; i < pixels.length; i++) {
    var pixel = pixels[i];
    var newPixel = newPixels[i];
    for (var ch = 0; ch < 4; ch++) {
      newPixel[ch] = scale(pixel[ch], scale_factor, max);
    }
  }
  return newPixels;
};

exports.scaleRGBA = function(pixels, Rscale, Gscale, Bscale, Ascale, max) {
  var newPixels;
  for (var i = 0; i < pixels.length; i++) {
    var pixel = pixels[i];
    var newPixel = newPixels[i];
    // Scale red
    newPixel[0] = scale(pixel[0], Rscale, max);
    newPixel[1] = scale(pixel[1], Gscale, max);
    newPixel[2] = scale(pixel[2], Bscale, max);
    newPixel[3] = scale(pixel[3], Ascale, max);
  }
  return newPixels;
};
