var numColorChannels = 3;

function scale(value, scale_factor, max) {
  return Math.min(value * scale_factor, max || 255);
};

// scale overall brightness
//exports.brightness = function(pixels, scale_factor, max) {
exports.brightness = function(pixels) {
  var newPixels = [];
  for (var i = 0; i < pixels.length; i++) {
    newPixels[i] = [];
    for (var ch = 0; ch < numColorChannels; ch++) {
      newPixels[i][ch] = Math.floor(scale(pixels[i][ch], 0.3, 200));
    }
  }
  console.log(newPixels);
  return newPixels;
};

// scale R, G, B independently
//exports.scaleRGB = function(pixels, config, max) {
exports.scaleRGB = function(pixels) {
  // config is an array: [R, G, B]
  var config = [128, 128, 128];
  var max = 50;
  var newPixels = [];
  for (var i = 0; i < pixels.length; i++) {
    newPixels[i] = [];
    for (var ch = 0; ch < numColorChannels; ch++) {
      newPixels[i][ch] = Math.floor(scale(pixels[i][ch], config[numColorChannels - 1 - ch], max));
    }
  }
  return newPixels;
};

// scale the data to grey values independently
exports.scaleGrey = function(pixels) {
  // config is an array: [R, G, B]
  for ( var i = 0; i < pixels.length; i++) {
    //console.log('(' + i + '): ' + pixArray[i][0] + ' : ' + pixArray[i][1] + ' : ' + pixArray[i][2]);
    var blue = pixels[i][0];
    var green = pixels[i][1];
    var red = pixels[i][2];

    var calGreyValue = Math.floor((blue + green + red)/ pixels[i].length);
    //console.log(calGreyValue);

    pixels[i][0] = calGreyValue;
    pixels[i][1] = calGreyValue;
    pixels[i][2] = calGreyValue;
  }
  return pixels;
};

// pass pixel array unchanged

exports.identity = function(pixels) {
  return pixels;
}
