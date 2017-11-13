var express = require("express");
var bp = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");

var app = express();

mongoose.Promise = global.Promise;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs')

app.use(bp.urlencoded({extended: true}));

// **************************************** //

app.get('/', function(req, res){
	Otter.find({}, function(err, otters) {
		if (err) {
			console.log('it dont work');
		} else {
			return res.render('showAllPage', {otters});
		}
	})
});

app.get('/otters/new', function(req, res) {
	return res.render('createNewPage');
});

app.get('/otters/:id', function(req, res) {
	var id = req.param("id");
	Otter.find({_id: id}, function(err, otter) {
		if(err) {
			console.log("You otter fix this problem.")
		} else {
			console.log(otter);
			return res.render('showOnePage', {otter})
		}
	})
});

app.get('/otters/edit/:id', function(req, res) {
	var id = req.param("id");
	Otter.find({_id: id}, function(err, otter) {
		if(err) {
			console.log("You otter fix this problem.")
		} else {
			console.log(otter);
			return res.render('editPage', {otter})
		}
	})
});


app.post('/otters', function(req, res) {
	console.log(req.body)
	var otter = new Otter({
		name: req.body.name,
		age: req.body.age,
		pebbleShape: req.body.pebbleShape
	})
	otter.save(function(err) {
		if (err) {
			console.log("Something went wrong.")
			console.log(otter.errors)
			return res.render('createNewPage', {'errors': otter.errors})
		} else {
			console.log("Creature Created!")
			return res.redirect('/');
		}
	})
	
});

app.post('/otters/:id', function(req, res) {
	var id = req.param("id");
	Otter.update({_id: id}, {
		name: req.body.name,
		age: req.body.age,
		pebbleShape: req.body.pebbleShape
	}, function(err, otter) {
		if(err) {
			console.log("You otter fix this problem.")
			return res.render('editPage', {'errors': otter.errors, 'otter': Otter.find({_id: id})})
		} else {
			console.log(otter);
			return res.redirect(`/otters/${id}`)
		}
	})
});

app.post('/otters/destroy/:id', function(req, res) {
	var id = req.param("id");
	Otter.remove({_id: id}, function(err, otter) {
		if(err) {
			console.log("You otter fix this problem.");
			return res.redirect('/');
		} else {
			console.log(otter);
			return res.redirect('/');
		}
	})
});

// **************************************** //

var port = 8000;
app.listen(port, function() {
	console.log(`Listening on port ${port}`);
})

mongoose.connect('mongodb://localhost/otterBox')
var OtterSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 2},
	age: {type: Number, require: true},
	pebbleShape: {type: String, required: true}
}, {timestamps: true});

mongoose.model('Otter', OtterSchema);
var Otter = mongoose.model('Otter');