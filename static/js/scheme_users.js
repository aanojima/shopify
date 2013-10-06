var mongoose = require('mongoose');
var User;
var CONNECTION_STRING = "mongodb://nodejitsu_ericschmidt:rbkehkot5da21686s6vag70l8f@ds045998.mongolab.com:45998/nodejitsu_ericschmidt_nodejitsudb5211104003";
mongoose.connect(CONNECTION_STRING);
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
	mongoose.disconnect();
}

exports = {
	findOneUser : function (email, callback){
		mongoose.connect(CONNECTION_STRING);
		User.findOne({"email" : email}, callback);
		mongoose.disconnect();
	},
	findUsers : function(field, value, callback){
		mongoose.connect(CONNECTION_STRING);
		User.find({field: value}, callback);
		mongoose.disconnect();
		return output;
	},
	removeUser : function(email, callback){
		mongoose.connect(CONNECTION_STRING);
		User.findOne({"email": email}).remove(callback);
		mongoose.disconnect();
	},
	insertUser : function(newObject, callback){
		mongoose.connect(CONNECTION_STRING);
		User.create([newObject], callback);
		mongoose.disconnect();
	},
	updateUser : function(email, field, update, callback){
		mongoose.connect(CONNECTION_STRING);
		User.update({"email" : email}, {$set: update}, {safe: true}, callback);
		mongoose.disconnect();
	}
};