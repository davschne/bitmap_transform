var numColorChannels = 3;

function scale(value, scale_factor, max) {
  return Math.min(value * scale_factor, max || 255);
};

// scale overall brightness

exports.brightness = function(pixels, scale_factor, max) {
  var newPixels = [];
  for (var i = 0; i < pixels.length; i++) {
    newPixels[i] = [];
    for (var ch = 0; ch < numColorChannels; ch++) {
      newPixels[i][ch] = scale(pixels[i][ch], scale_factor, max);
    }
  }
  return newPixels;
};

// scale R, G, B independently

exports.scaleRGB = function(pixels, config, max) {
  // config is an array: [R, G, B]
  var newPixels = [];
  for (var i = 0; i < pixels.length; i++) {
    newPixels[i] = [];
    for (var ch = 0; ch < numColorChannels; ch++) {
      newPixels[i][ch] = scale(pixels[i][ch], config[numColorChannels - 1 - ch], max);
    }
  }
  return newPixels;
};

// pass pixel array unchanged

exports.identity = function(pixels) {
  return pixels;
}
