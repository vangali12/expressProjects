var express = require("express");
var bp = require("body-parser");
var path = require("path");
var session = require("express-session");
var mongoose = require("mongoose");
var port = 8000;

var app = express();

mongoose.Promise = global.Promise;

app.use(bp.urlencoded({extended: true}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.listen(port, function() {
	console.log(`We are listening on port ${port}`);
})

mongoose.connect('mongodb://localhost/messageBoard')

var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 4},
	text: {type: String, required: true, minlength: 2},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');

var CommentSchema = new mongoose.Schema({
	_message: {type: Schema.Types.ObjectId, ref: 'Message'},
	name: {type: String, required: true, minlength: 4},
	text: {type: String, required: true, minlength: 2}
}, {timestamps: true});

mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');

// ************************************************ //

app.get('/', function(req, res) {
	Message.find({})
	.populate('comments')
	.exec(function(err, message) {
		console.log(message.comments)
		return res.render('index', {messages: message});
	})
})

app.post('/createMessage', function(req, res) {
	var message = new Message({
		name: req.body.name,
		text: req.body.text,
	})
	message.save(function(err) {
		if (err) {
			console.log("something went wrong");
			return res.render('index', {'errors': message.errors});
		} else {
			console.log("post created!")
			return res.redirect('/');
		}
	})
})

app.post('/createComment/:id', function(req, res) {
	var id = req.param("id");
	console.log(req.body)
	Message.findOne({_id: req.param("id")}, function(err, message){
		var comment = new Comment(req.body);
		comment._message = message._id;
		comment.save(function(err){
			message.comments.push(comment);
			message.save(function(err){
				if(err) {
					console.log('Error');
				} else {
					return res.redirect('/');
				}
			})
		})
	})
})

// ************************************************ //