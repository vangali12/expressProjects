var mongoose = require("mongoose");
var Task = mongoose.model("Task");

module.exports = {
	index: function(req, res) {
		Task.find({}, function(err, tasks) {
			if(err) {
				console.lost("Something's wrong");
				return json(err)
			} else {
				return res.render('index', {tasks})
			}
		})
	},

	create: function(req, res) {
		Task.create({
			title: req.body.title,
			description: req.body.description,
			completed: req.body.completed
		})
		return res.redirect('/')
	},

	edit: function(req, res) {
		Task.findOne({_id: req.param("id")}, function(err, task) {
			if (err) {
				console.log("ERRORZZ")
			} else {
				console.log(task)
				return res.render('editPage', {task})
			}
		})
	},

	update: function(req, res) {
		Task.update({_id: req.param("id")}, {
			title: req.body.title,
			description: req.body.description,
			completed: req.body.completed		
		}, function(err, task){
			if (err) {
				console.log("There is an error :O")
			} else {
				return res.redirect('/')
			}
		})
	},

	delete: function(req, res) {
		Task.remove({_id: req.param("id")}, function(err, tasks){
			if(err) {
				console.log("UH OH.")
			} else {
				return res.redirect('/')
			}
		})
	},

	completed: function(req, res) {
		Task.update({_id: req.param("id")}, {
			completed: true
		}, function(err, tasks) {
			if (err) {
				console.log("Did you really finish this task?")
			} else {
				return res.redirect('/')
			}
		})
	}

}