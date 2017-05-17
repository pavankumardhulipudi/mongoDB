var express = require("express"),
	bodyParser = require("body-parser"),
	ejs = require("ejs"),
	app = express(),
	mongoose = require("mongoose");

	//mongoose.Promise = require("bluebird");
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

//Load mongoose models
var PersonRepo = require("./api/data/repo/person.rpo");

var api = express.Router();
api.use("/person", require("./api/control/person.ctr"));
app.use("/api", api);

app.get("/", function(req, res) {
	res.render("../index.html");
});

app.use(express.static(__dirname + "/dist"));
app.use("/views", express.static(__dirname + "/source/views"));

app.use(function(err, req, res, next) {
	console.log(err.stack);
	res.status(err.status||500).send(err.message);
});

app.listen(3030, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("App is listening on port 3030");
	}
});
