var request = require("request"),
querystring = require("querystring"), 
_ = require('underscore')

// var base_url = "https://api.venmo.com/" // real url
var base_url = "https://sandbox-api.venmo.com/" // sandbox url
var payments_endpoint = "payments"

// Payments endpoint
// see https://beta-developer.venmo.com/endpoints/payments 

// parameters is an object with access_token and 
// (optionally) limit, after, before
// callback is a function with parameters error, response, and body
function getPayments(parameters, callback){
	var url = base_url + payments_endpoint + "?" + querystring.stringify(parameters);
	var header = {
		uri: url, 
		method:"GET",
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
	var url = base_url + payments_endpoint + "?" + querystring.stringify(parameters);
	var header = {
		uri: url, 
		method:"POST",
	}

	request(header, function(error, response, body){
		return callback(error, response, body);
	});
}

// Gets details about a particular transaction
// parameters is an object with access_token.
// Payment_id is an integer.
// callback is a function with parameters error, response, and body
function getPaymentDetails(parameters, payment_id, callback){
	// var tempobj = {access_token: parameters.access_token};
	// console.log(tempobj)
	var url = base_url + payments_endpoint + '/' + payment_id 
		+ "?" + querystring.stringify(parameters);
	console.log(url)
	var header = {
		uri: url, 
		method:"GET",
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
	var url = base_url + ME_ENDPOINT + '?' + querystring.stringify(parameters)
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
function otherUser(parameters, user_id, callback){
	var OTHER_USER_ENDPOINT = "users/" + user_id
	var url = base_url + OTHER_USER_ENDPOINT + '?' + querystring.stringify(parameters)
	console.log(url)
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
function friends(parameters, user_id, callback){
	var FRIENDS_ENDPOINT = "users/" + user_id + "/friends"
	var url = base_url + FRIENDS_ENDPOINT + '?' + querystring.stringify(parameters)
	var header = {
		uri: url, 
		method:"GET"
	}

	request(header, function(error, response, body){
		return callback(error, response, body);
	});
}

////
//TESTS
////

//sj_token = '' // your token here

// params_make = {access_token: sj_token,
// user_id: 153136,
// note: "test trans.",
// amount: 0.10 };
// makePayment(params_make, function(error, response, body){
// 	console.log(makePayment);
// 	console.log(body);
// });

// params_get = {access_token: sj_token}

// getPayments(params_get, function (error, response, body) {
// 	console.log(getPayments);
// 	console.log(body);
// });

// params_get = {access_token: sj_token}
// getPaymentDetails(params_get, 0, function(error, response, body){
// 	console.log(body)
// })

// params_get = {access_token: sj_token}
// me(params_get, function(error, response, body){
// 	console.log(body)
// })

// params_get = {access_token: sj_token}
// otherUser(params_get, 153136, function(error, response, body){
// 	console.log(body)
// });

// params_get = {access_token: sj_token}
// friends(params_get, 595288, function(error, response, body){
// 	console.log(body)
// });