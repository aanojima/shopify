var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	// Works
});

function callback() {

	var kittySchema = mongoose.Schema({
		name : String
	});

	var Kitten = mongoose.model("Kitten", kittySchema);

	var silence = new Kitten({name: 'Silence'});
	console.log(silence.name);

	var fluffy = new Kitten({name : "fluffy"});

	fluffy.save(function(err, fluffy){
		console.log(fluffy.name);
	});

	Kitten.find(function(err, kittens){
		console.log(kittens);
	});
	
};

callback();