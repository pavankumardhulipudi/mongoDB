var gulp = require("gulp"),
	exec = require("child_process").exec,
	watch = require("gulp-watch"),
	concat = require("gulp-concat"),
	sass = require("gulp-sass"),
	appResources = "./source/",
	bowerComponents = "./bower_components/",
	config = {
		dist: "dist/",
		"vendor-styles": {
			sources: [
				bowerComponents + "bootstrap/dist/css/bootstrap.css"
			],
			output: "vendors.css",
			dist: "css"
		},
		"vendor-scripts": {
			sources: [
				bowerComponents + "jquery/dist/jquery.js",
				bowerComponents + "angular/angular.js",
				bowerComponents + "angular-ui-router/release/angular-ui-router.js",
				bowerComponents + "bootstrap/dist/js/bootstrap.js",
				bowerComponents + "ngstorage/ngStorage.js"
			],
			output: "vendors.js",
			dist: "js"
		},
		"client-styles": {
			sources: [
				appResources + "scss/main.scss"
			],
			output: "client.css",
			dist: "css"
		},
		"client-scripts": {
			sources: [
				appResources + "js/**/*.js"
			],
			output: "client.js",
			dist: "js"
		}
	}


gulp.task("start-server", ["client-scripts", "client-styles"], function(cb) {
	exec("node server.js", function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err)
	});
});

var compiler = function() {
	var params = config[this.currentTask.name];
	return gulp.src(params.sources)
		.pipe(concat(params.output))
		.pipe(gulp.dest(config.dist+params.dist));
};

var sassCompiler = function() {
	var params = config[this.currentTask.name];
	return gulp.src(params.sources)
		.pipe(sass().on("error", sass.logError))
		.pipe(concat(params.output))
		.pipe(gulp.dest(config.dist+params.dist));
};

gulp.task("vendor-scripts", compiler);
gulp.task("client-scripts", compiler);

gulp.task("vendor-styles", compiler);
gulp.task("client-styles", sassCompiler);

gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
gulp.Gulp.prototype._runTask = function(task) {
	this.currentTask = task;
	this.__runTask(task);
}

gulp.task("watch", function () {
	gulp.watch(appResources + "sass/**/*.scss", ["client-styles"]);
	gulp.watch(appResources + "js/**/*.js", ["client-scripts"]);
});

gulp.task("compile-app", ["vendor-scripts", "vendor-styles", "client-scripts", "client-styles"]);

gulp.task("default", ["start-server", "client-styles", "client-scripts", "watch"]);
