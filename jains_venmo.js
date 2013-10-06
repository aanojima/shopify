var request = require("request");

// var base_url = "https://api.venmo.com/" // real url
var base_url = "https://sandbox-api.venmo.com/" // sandbox url
var payments_endpoint = "payments/"

// Payments endpoint
// see https://beta-developer.venmo.com/endpoints/payments 

// parameters is an object with access_token and 
// (optionally) limit, after, before
// callback is a function with parameters error, response, and body
function getPayments(paramemters, callback){
	var url = base_url + payments_endpoint 
	var header = {
		uri: url, 
		method:"GET",
		form: parameters
	}

	request(header, function(error, response, body){
		return callback(error, response, body);
	});
}

// Executes a payment 
// parameters is an object with access_token and 
// [ phone, email or user_id ] and note and amount
// and (optionally) audience
// callback is a function with parameters error, response, and body
function makePayment(parameters, callback){
	var url = base_url + payments_endpoint 
	var header = {
		uri: url, 
		method:"POST",
		form: parameters
	}

	request(header, function(error, response, body){
		return callback(error, response, body);
	});
}

// Gets details about a particular transaction
// parameters is an object with access_token
// and payment_id
// callback is a function with parameters error, response, and body
function getPaymentDetails(parameters, callback){
	var url = base_url + payments_endpoint + parameters.payment_id
	var header = {
		uri: url, 
		method:"GET",
		form: parameters.access_token
	}

	request(header, function(error, response, body){
		return callback(error, response, body);
	});
}

// Users endpoint
// see https://beta-developer.venmo.com/endpoints/users

var ACCESS_TOKEN_QUERYSTRING = "?access_token="

// Gets details about the current user
// parameters is an object with access_token
// callback is a function with parameters error, response, and body
function me(parameters, callback){
	var ME_ENDPOINT = "me"
	var url = base_url + ME_ENDPOINT + ACCESS_TOKEN_QUERYSTRING + parameters.access_token
	var header = {
		uri: url, 
		method:"GET",
	}

	request(header, function(error, response, body){
		return callback(error, response, body);
	});
}

// Gets details about the current user
// parameters is an object with access_token 
// and the other user's user_id
// callback is a function with parameters error, response, and body
function otherUser(parameters, callback){
	var OTHER_USER_ENDPOINT = "users/:" + parameters.user_id
	var url = base_url + OTHER_USER_ENDPOINT + ACCESS_TOKEN_QUERYSTRING + parameters.access_token
	var header = {
		uri: url, 
		method:"GET"
	}

	request(header, function(error, response, body){
		return callback(error, response, body);
	});
}

// Gets the user's friend 
// parameters is an object with access_token, 
// before, after, and limit
// callback is a function with parameters error, response, and body
function friends(parameters, callback){
	var FRIENDS_ENDPOINT = "users/:" + parameters.user_id
	var url = base_url + OTHER_USER_ENDPOINT + ACCESS_TOKEN_QUERYSTRING + parameters.access_token
	var header = {
		uri: url, 
		method:"GET"
	}

	request(header, function(error, response, body){
		return callback(error, response, body);
	});
}