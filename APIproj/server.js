var express = require("express");
var bp = require("body-parser");
var path = require("path");
var port = 8000;

var app = express();

app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose');
require('./server/config/routes')(app);

app.listen(port, function() {
	console.log(`We are listening on port ${port}`)
})