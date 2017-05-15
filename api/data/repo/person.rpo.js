var mongoose = require("mongoose"),
	PersonSchema = require("../model/person.mdl");

PersonSchema.statics.createPerson = function(newPerson) {
	return this.create(newPerson);
}

PersonSchema.statics.findPerson = function(_id) {
	return this.findOne({_id: username}).exec();
}

PersonSchema.statics.updatePerson = function(_id, newPerson) {
	return this.findOne({_id: newPerson._id}).exec().then(function(person){
		if(!person) {
			throw new Error("Could not update person. Person not found");
		}

		person.copy(newPerson);

		return person.save();
	});
}

PersonSchema.statics.findAll = function() {
	return this.find().exec();
}

PersonSchema.statics.deletePerson = function(id) {
	return this.remove({_id: id});
}

module.exports = mongoose.model("Person", PersonSchema);