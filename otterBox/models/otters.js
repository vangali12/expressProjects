var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OtterSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 2},
	age: {type: Number, require: true},
	pebbleShape: {type: String, required: true}
}, {timestamps: true});

mongoose.model('Otter', OtterSchema);