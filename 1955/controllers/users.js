var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = {
	index: function(req, res) {
		User.find({}, function(err, users) {
			if (err) {
				console.log("Something's wrong");
				console.log(err)
				return res.json(err)
			} else {
				return res.render('index', {users});
			}
		})
	},

	create: function(req, res) {
		console.log(req.param("name"))
		User.create({
			name: req.param("name")
		})
		return res.redirect('/')
	},

	delete: function(req, res) {
		console.log(req.param("name"))
		User.remove({
			name: req.param("name")
		}, function(err) {
			return res.redirect('/')
		})
	},

	show: function(req, res) {
		console.log(req.param("name"))
		User.findOne({name: req.param("name")}, function(err, users) {
			return res.json(users)
		})
	}
}