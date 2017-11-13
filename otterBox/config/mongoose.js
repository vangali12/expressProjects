var mongoose = require("mongoose");
var path = require("path");
var fs = require("fs");
var mp = path.join(__dirname, './../models');

mongoose.connect('mongodb://localhost/otterBox')

fs.readdirSync(mp).forEach(function(file) {
	require(mp+'/'+file);
})