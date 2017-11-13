var tasks = require('./../controllers/tasksCon.js')

module.exports = function(app) {
	app.get('/', function(req, res) {
		tasks.index(req, res)
	})
	app.post('/create', function(req, res) {
		tasks.create(req, res)
	})

	app.post('/edit/:id', function(req, res) {
		tasks.edit(req, res)
	})

	app.post('/update/:id', function(req, res) {
		tasks.update(req, res)
	})

	app.post('/completed/:id', function(req, res) {
		tasks.completed(req, res)
	})

	app.post('/delete/:id', function(req, res) {
		tasks.delete(req, res)
	})

}