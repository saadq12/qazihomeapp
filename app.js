//
//File Name: index.js
//Description: This .js file will load the main website for qazihomeapp
//Date: 2018/05/15 - Version - 1.0.0

console.log("The server (QaziHomeApp) has started...");

//Load dependencies and middlewares
var express = require("express");
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
//var path = __dirname + '/views/';


//mongodb
mongoose.connect('mongodb://localhost/qazihomeapp');
var db = mongoose.connection;

//Routers Routes
var routes = require('./routes/index');
var users = require('./routes/users');

// init app
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//Favicon
app.use(favicon(__dirname + '/public/images/ms-icon-310x310.ico'));


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);
//app.use('/accounts', accounts);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});















///////////////////////////ignore//////////////////////
/*
/*Define Router Middle Layer, this will excute before any other Routes
and print the HTTP request type of the paritcular route
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(__dirname + "/views/index.html");
});

router.get("/about",function(req,res){
  res.sendFile(__dirname + "/views/about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(__dirname + "/views/contact.html");
});


//tell Express to use the routes we defined above
app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

*/
