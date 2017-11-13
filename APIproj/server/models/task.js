var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	title: {type: String},
	description: {type: String, default: ''},
	completed: {type: Boolean, default: false},
}, {timestamps:true})

mongoose.model("Task", TaskSchema);