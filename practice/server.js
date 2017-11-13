var express = require("express");
var bp = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var port = 8000;

var app = express();

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

require("./config/routes")(app);

app.use(bp.urlencoded({extended:true}));

app.listen(port, function() {
	console.log(`We are listening on port ${port}`);
})