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
		email : String
		title : String,
		details : String,
		price : double,
		date: Date,
		place : Object
	});

	Request = mongoose.model("Request", RequestSchema, "Requests");

}

function findOneRequest(field, value, callback){
	Request.findOne({field : value}, callback);
}

function findRequests(field, value, callback){
	Request.find({field: value}, callback);
}

function removeRequest(field, value, callback){
	Request.findOne({field: value}).remove(callback);
}

function insertRequest(newObject, callback){
	Request.create([newObject], callback);
}

function updateRequest(field, value, update, callback){
	Request.update({field : value}, {field : update}, {safe: true}, callback);
}
