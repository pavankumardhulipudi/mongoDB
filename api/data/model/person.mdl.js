var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	PersonSchema = new Schema({
		username: {type: String, trim: true, index:{unique: true}, required: "A user must have a username"},
		password: {type: String, required: "A user must have a password"},
		email: {type: String, trim: true, lowercase: true, required: "A user must have a email"},
		firstname: {type: String, required: "A user must have a username"},
		lastname: {type: String, required: "A user must have a username"},
	});

PersonSchema.pre("save", function(next){
	return next();
});

PersonSchema.methods.copy =  function(person){
	this.email = person.email;
	this.firstname = person.firstname;
	this.lastname = person.lastname;
	this.username = person.username;
	this.password = person.password;
};

module.exports = PersonSchema;