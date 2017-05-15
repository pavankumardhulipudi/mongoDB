(function() {
	"use strict";

	angular.module("gm.common", []);

	angular.module("gm.factories", [
		"gm.common"
	]);

	angular.module("gm.services", [
		"gm.common"
	]);

	angular.module("gm.filters", [
		"gm.common"
	]);

	angular.module("apiServices", [
		"gm.common"
	]);

	angular.module("gm.app", [
		"ui.router",
		"ngStorage",
		"gm.common",
		"gm.factories",
		"gm.services",
		"apiServices"
	]);

})();