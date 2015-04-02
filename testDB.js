var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
 	console.log('******************db connected*************');
 	var kittySchema = mongoose.Schema({
	    name: String
	});

	kittySchema.methods.speak = function () {
	  var greeting = this.name
	    ? "Meow name is " + this.name
	    : "I don't have a name";
	  console.log(greeting);
	}

	var Test = mongoose.model('user', kittySchema);

	var fluffy = new Test({ name: 'wd3', age: '21' });

	fluffy.save(function (err, fluffy) {
	  if (err) return console.error(err);
	  fluffy.speak();
	});


	console.log('*************start list all items***************');
	Test.find(function(err, kittens){
		if (err) return console.error(err);
	  	console.log(kittens);
	});
});