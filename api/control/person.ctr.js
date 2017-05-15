var mongoose = require("mongoose");
var express = require("express");

var PersonService = require("../service/person.svc");

var PersonCtr = express.Router();

PersonCtr.get("/", function(req, res, next) {
	PersonService.findAll().then(function(people){
		res.send(people);
	},
	function(err){
		next(err)
	});
});

PersonCtr.post("/", function(req, res, next) {
	PersonService.create(req.body.person).then(function(person){
		res.send(person);
	},
	function(err){
		next(err)
	});
});

PersonCtr.get("/:_id", function(req, res, next) {
	PersonService.find(req.params._id).then(function(person){
		res.send("Person found.");
	},
	function(err){
		next(err)
	});
});

PersonCtr.put("/:_id", function(req, res, next) {
	PersonService.update(req.params._id, req.body.person).then(function(person){
		res.send("person updated.");
	},
	function(err){
		next(err)
	});
});

PersonCtr.delete("/:_id", function(req, res, next) {
	PersonService.delete(req.params._id).then(function(person){
		res.send("person deleted.");
	},
	function(err){
		next(err)
	});
});

module.exports = PersonCtr;