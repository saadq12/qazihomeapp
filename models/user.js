var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



// mongoose.connect('mongodb://localhost/qazihomeapp');
//
// var db = mongoose.connection;

//User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);


module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}


module.exports.getUserByUsername = function(username, callback){
		var query = {username: username};
		User.findOne(query, callback);
}


module.exports.getUserById = function(id, callback){
		User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback ){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
    // res == true
});

}

//pass the objectId to obtain username
module.exports.getUserNameById = function (id, callback){
		//var query = {id: id, user}

		//db.users.find({"_id":ObjectId("5aff102b06d59453587d9197")}, {"username":1})
}
