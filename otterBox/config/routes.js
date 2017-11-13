var otters = require('./../controllers/otters.js')

module.exports = function(app) {
	app.get('/', function(req, res){
		otters.showAll(req, res)
	});

	app.get('/otters/new', function(req, res) {
		return res.render('createNewPage');
	});

	app.get('/otters/:id', function(req, res) {
		otters.showOne(req, res);
	});

	app.get('/otters/edit/:id', function(req, res) {
		otters.edit(req, res);
	});

	app.post('/otters', function(req, res) {
		otters.create(req, res)	
	});

	app.post('/otters/:id', function(req, res) {
		otters.update(req, res)
	});

	app.post('/otters/destroy/:id', function(req, res) {
		otters.delete(req, res)
	});
}