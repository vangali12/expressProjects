var users = require('./../controllers/users.js');

module.exports = function(app) {
	console.log("HEYYY")
	app.get('/', function(req, res) {
		users.index(req,res)
	})

	app.get('/new/:name', function(req, res) {
		users.create(req, res)
	})

	app.get('/delete/:name', function(req, res) {
		users.delete(req, res)
	})

	app.get('/:name', function(req, res) {
		users.show(req, res)
	})
}