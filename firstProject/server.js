var express = require("express");
var app = express();
var bp = require("body-parser");
app.use(bp.urlencoded({extended:true}));
var path = require("path");
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
app.use(express.static(path.join(__dirname, '/static')));
app.set("views", path.join(__dirname, '/views'));
app.set("view engine", "ejs");
app.get('/', function(req,res){
    User.find({}, function(err, users){
        if(err){
            console.log('something went wrong');
        }else{
            console.log(users);
            res.render('index', {users});
        }
    })
})
app.post('/users', function(req, res){
    console.log("POST DATA", req.body);
    var user = new User({name: req.body.name, age: req.body.age});
    user.save(function(err){
        if(err){
            console.log('something went wrong');
        }else{
            console.log('successfully added a user!');
            res.redirect('/');
        }
    })
})
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
   })
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'
app.listen(8000, function() {
    console.log("listening on port 8000");
})