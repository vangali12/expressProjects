var express = require("express");
var path = require("path");
var bp = require("body-parser");
var mongoose = require("mongoose");

var app = express();

app.use(bp.urlencoded({extended:true}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	return res.render('index');
})

app.get('/quotes', function(req, res) {
	Quote.find({}, function(err, quotes) {
		if (err) {
			console.log('it dont work');
		} else {
			return res.render('quotes', {quotes});
		}
	})
})

app.post('/quotes', function(req, res) {
	var quote = new Quote({name: req.body.name, quote: req.body.quote});
	quote.save(function(err) {
		if (err) {
			console.log("something went wrong");
			console.log(err)
			return res.render('index', {'errors': quote.errors});
		} else {
			console.log("successfully created");
			console.log(req.body.date)
			return res.redirect('/quotes');
		}
	})
})

var port = 8000;
app.listen(port, function() {
	console.log(`We are listening on port ${port}`)
})

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/basic_mongoose');
var QuoteSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 2},
	quote: {type: String, required: true, minlength: 5}
}, {timestamps:true});

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');