var mongoose = require('mongoose');
var CONNECTION_STRING = "mongodb://localhost";
mongoose.connect(CONNECTION_STRING);
var Request;
var db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', initialize);

function initialize(){

	var RequestSchema = mongoose.Schema({
		id : String,
		agent: String,
		client: String,
		approved: Boolean,
		purchased: Boolean,
		delivered: Boolean,
		done: Boolean,
		email : String,
		item : String,
		details : String,
		offer : Number,
		date: Date,
		place : Object
	});

	Request = mongoose.model("Request", RequestSchema, "Requests");

}

exports = {
	findOneRequest : function(field, value, callback){
		Request.findOne({field : value}, callback);
	},
	findRequests : function(field, value, callback){
		Request.find({field: value}, callback);
	},
	removeRequest : function(field, value, callback){
		Request.findOne({field: value}).remove(callback);
	},
	insertRequest : function(newObject, callback){
		Request.create([newObject], callback);
	},
	updateRequest : function(field, value, update, callback){
		Request.update({field : value}, {$set : update}, {safe: true}, callback);
	}
};
