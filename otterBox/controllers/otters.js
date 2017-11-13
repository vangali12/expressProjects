var mongoose = require("mongoose");
var Otter = mongoose.model("Otter");

module.exports = {
	showAll: function(req, res) {
		Otter.find({}, function(err, otters) {
			if (err) {
				console.log('it dont work');
			} else {
				return res.render('showAllPage', {otters});
			}
		})
	}, 

	showOne: function(req, res) {
		var id = req.param("id");
		Otter.find({_id: id}, function(err, otter) {
			if(err) {
				console.log("You otter fix this problem.")
			} else {
				console.log(otter);
				return res.render('showOnePage', {otter})
			}
		})
	}, 

	edit: function(req, res) {
		var id = req.param("id");
		Otter.find({_id: id}, function(err, otter) {
			if(err) {
				console.log("You otter fix this problem.")
			} else {
				console.log(otter);
				return res.render('editPage', {otter})
			}
		})
	},

	create: function(req, res) {
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
	},

	update: function(req, res) {
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
	},

	delete: function(req, res) {
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
	}




}