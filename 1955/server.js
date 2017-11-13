var express = require("express");
var path = require("path");
var bp = require("body-parser");
var session = require("express-session")
var port = 8000;
var mongoose = require("mongoose");

var app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
app.use(session({secret: 'secretSnake'}))

app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');

require('./config/mongoose');
require('./config/routes')(app);

app.listen(port, function() {
	console.log(`We are listening on port ${port}`);
})