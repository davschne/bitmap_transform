var readBMP = require('./export_async_without_ee.js').readBMP;
var callback = require('./export_async_without_ee.js').callback;
var fs = require('fs');

var imgObj = {};

readBMP(function(err, data) {
	
	// this will the object that with all properties as before
	imgObj = callback(err, data);
	console.log(imgObj.type); // prove it's working
});
