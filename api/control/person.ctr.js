var mongoose = require("mongoose");
var express = require("express");

var PersonService = require("../service/person.svc");
mongoose.Promise = global.Promise;
var PersonCtr = express.Router();

PersonCtr.get("/:dbname/", function(req, res, next) {
	mongoose.connect("mongodb://localhost/"+req.params.dbname);
	PersonService.findAll().then(function(people){
		mongoose.connection.close();
		res.send(people);
	},
	function(err){
		next(err)
	});
});

PersonCtr.post("/:dbname/", function(req, res, next) {
	mongoose.connect("mongodb://localhost/"+req.params.dbname);
	PersonService.create(req.body.person).then(function(person){
		mongoose.connection.close();
		res.send(person);
	},
	function(err){
		next(err)
	});
});

PersonCtr.get("/:dbname/:_id", function(req, res, next) {
	mongoose.connect("mongodb://localhost/"+req.params.dbname);
	PersonService.find(req.params._id).then(function(person){
		mongoose.connection.close();
		res.send("Person found.");
	},
	function(err){
		next(err)
	});
});

PersonCtr.put("/:dbname/:_id", function(req, res, next) {
	mongoose.connect("mongodb://localhost/"+req.params.dbname);
	PersonService.update(req.params._id, req.body.person).then(function(person){
		mongoose.connection.close();
		res.send("person updated.");
	},
	function(err){
		next(err)
	});
});

PersonCtr.delete("/:dbname/:_id", function(req, res, next) {
	mongoose.connect("mongodb://localhost/"+req.params.dbname);
	PersonService.delete(req.params._id).then(function(person){
		mongoose.connection.close();
		res.send("person deleted.");
	},
	function(err){
		next(err)
	});
});

module.exports = PersonCtr;