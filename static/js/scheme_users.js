var mongoose = require('mongoose');
var CONNECTION_STRING = "mongodb://nodejitsu_ericschmidt:rbkehkot5da21686s6vag70l8f@ds045998.mongolab.com:45998/nodejitsu_ericschmidt_nodejitsudb5211104003";
mongoose.connect(CONNECTION_STRING);
var User;
var db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', initialize);

function initialize(){

	var UserSchema = mongoose.Schema({
		name: String,
		email: String,
		address: {
			address: String,
			city: String,
			state: String,
			zip_code: String,
			mobile_number: String
		},
		biography: String,
		password: String,
		payment: String
	});

	User = mongoose.model("User", UserSchema, "Users");

}

exports = {
	findOneUser : function (email, callback){
		var output;
		User.findOne({"email" : email}, callback);
	},
	findUsers : function(field, value, callback){
		var output;
		User.find({field: value}, callback);
		return output;
	},
	removeUser : function(email, callback){
		User.findOne({"email": email}).remove(callback);
	},
	insertUser : function(newObject, callback){
		User.create([newObject], callback);
	},
	updateUser : function(email, field, update, callback){
		User.update({"email" : email}, {$set, update}, {safe: true}, callback);
	}
};