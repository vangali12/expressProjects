var page = require("./../controllers/page.js")
module.exports = function(app) {
	app.get("/", function(req, res) {
		return res.render('index');
	})
}