var mongoose = require('mongoose');
var CONNECTION_STRING = "mongodb://localhost";
mongoose.connect(CONNECTION_STRING);
var Request;
var db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', initialize);

function initialize(){

	var RequestSchema = mongoose.Schema({
		title : String,
		details : String,
		price : double,
		place : String
	});

	Request = mongoose.model("Request", RequestSchema, "Requests");
	main();

}

function findOneRequest(field, value){
	var output;
	Request.findOne({field : value}), function(err, doc){
		output = doc;
	});
	return output;
}

function findRequests(field, value){
	var output;
	Request.find({field: value}, function(err, doc){
		output = doc;
	});
	return output;
}

function removeRequest(field, value){
	Request.findOne({field: value}).remove(function(){});
}

function insertRequest(newObject){
	Request.create([newObject], function(){});
}

function updateRequest(field, value, update){
	Request.update({field : value}, {field : update});
}
