var express = require('express');
var router = express.Router();
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require ('passport-local').Strategy;

var User = require('../models/user');

//  const LiveCam = require('livecam');
//  const webcam_server = new LiveCam
// ({
//
// 			//address and port of the webcam UI
// 			'ui_addr' : '127.0.0.1',
// 			'ui_port' : 11000,
//
// 			///
// 			'broadcast_addr' : '127.0.0.1',
// 			'broadcast_port' : 12000,
//
// 			////
// 			'gst_tcp_addr' : '127.0.0.1',
// 			'gst_tcp_port' : 10000,
//
//
// 			//address
// 			'start':function(){
//  				console.log('webcamserver started?');
//  			}
//
//  });

//webcam_server.broadcast();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res, next){
	res.render('index', {title: 'Qazi Home App', indexNavBarActive: true});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
