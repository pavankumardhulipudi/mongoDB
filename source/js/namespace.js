(function() {
	"use strict";

	angular.module("um.common", []);

	angular.module("um.factories", [
		"um.common"
	]);

	angular.module("um.services", [
		"um.common"
	]);

	angular.module("um.filters", [
		"um.common"
	]);

	angular.module("um.apiServices", [
		"um.common"
	]);

	angular.module("um.app", [
		"ngStorage",
		"ui.router",
		"um.common",
		"um.factories",
		"um.services",
		"um.apiServices"
	]);

})();