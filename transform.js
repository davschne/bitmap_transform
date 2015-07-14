function scale(value, scale_factor, max) {
  return Math.min(value * scale_factor, max || 255);
};

// scale overall brightness
exports.scale = function(image, options) {
  if (image.colorDepth !== 24) {
    throw new Error("This transform only works for 24-bit color.");
  }
  var numColorChannels = 3;
  var pixels = image.pixels;
  var scale_factor = options[0];
  for (var i = 0; i < pixels.length; i++) {
    for (var ch = 0; ch < numColorChannels; ch++) {
      pixels[i][ch] = Math.round(scale(pixels[i][ch], scale_factor, 255));
    }
  }
  return image;
};

// scale R, G, B independently
exports.scaleRGB = function(image, options) {
  // options is an array: [R, G, B]
  if (image.colorDepth !== 24) {
    throw new Error("This transform only works for 24-bit color.");
  }
  var numColorChannels = 3;
  var pixels = image.pixels;
  for (var i = 0; i < pixels.length; i++) {
    for (var ch = 0; ch < numColorChannels; ch++) {
      pixels[i][ch] = Math.round(scale(pixels[i][ch], options[numColorChannels - 1 - ch], 255));
    }
  }
  return image;
};

// grayscale rendering by averaging RGB values per pixel
exports.grayscale = function(image) {
  if (image.colorDepth !== 24) {
    throw new Error("This transform only works for 24-bit color.");
  }
  var pixels = image.pixels;
  for (var i = 0; i < pixels.length; i++) {
    //console.log('(' + i + '): ' + pixArray[i][0] + ' : ' + pixArray[i][1] + ' : ' + pixArray[i][2]);
    var blue = pixels[i][0];
    var green = pixels[i][1];
    var red = pixels[i][2];

    var avg = Math.round((blue + green + red)/ pixels[i].length);
    //console.log(avg);

    pixels[i][0] = avg;
    pixels[i][1] = avg;
    pixels[i][2] = avg;
  }
  return image;
};

// pass pixel array unchanged

exports.identity = function(image) {
  return image;
};

exports.rotateCCW = function(image) {
  var pixels = image.pixels;
  var newPixels = [];
  var numColorChannels = 3;
  var width = image.width;
  var height = Math.abs(image.height);
  for (var x = 0; x < width; x++) {
    for (var y = height - 1; y >= 0; y--) {
      var i = y * width + x;
      var newPixel = [];
      for (var ch = 0; ch < numColorChannels; ch++) {
        newPixel.push(pixels[i][ch]);
      }
      newPixels.push(newPixel);
    }
  }
  image.pixels = newPixels;
  var saved = image.height;
  if (saved > 0) {
    image.height = image.width;
    image.width = saved;
  } else {
    image.height = image.width * -1;
    image.width = saved * -1;
  }
  return image;
};
