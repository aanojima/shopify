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
	mongoose.disconnect();
}

exports = {
	findOneRequest : function(field, value, callback){
		mongoose.connect(CONNECTION_STRING);
		Request.findOne({field : value}, callback);
	},
	findRequests : function(field, value, callback){
		mongoose.connect(CONNECTION_STRING);
		Request.find({field: value}, callback);
		mongoose.disconnect();
	},
	removeRequest : function(field, value, callback){
		mongoose.connect(CONNECTION_STRING);
		Request.findOne({field: value}).remove(callback);
		mongoose.disconnect();
	},
	insertRequest : function(newObject, callback){
		mongoose.connect(CONNECTION_STRING);
		Request.create([newObject], callback);
		mongoose.disconnect();
	},
	updateRequest : function(field, value, update, callback){
		mongoose.connect(CONNECTION_STRING);
		Request.update({field : value}, {$set : update}, {safe: true}, callback);
		mongoose.disconnect();
	}
};
