var db = require("mongoose"),
	PersonRepo = db.model("Person");

exports.create = function(data){
	return PersonRepo.createPerson(data).then(function(person){
		return person.save();
	})
};

exports.find = function(_id){
	return PersonRepo.findPerson(_id);
};

exports.findAll = function(){
	return PersonRepo.findAll();
};

exports.update = function(_id, person){
	return PersonRepo.updatePerson(_id, person);
};

exports.delete = function(_id){
	return PersonRepo.deletePerson(_id);
};