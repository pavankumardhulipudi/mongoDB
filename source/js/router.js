(function() {
	"use strict";

	angular.module("um.app").config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state("landing", {
				url: "/landing",
				templateUrl: "/views/landing.html",
				controller: "LandingCtrl"
			})
			.state("viewCustomers", {
				url: "/view",
				templateUrl: "/views/viewCustomers.html",
				controller: "ViewCustomersCtrl"
			})
			.state("editCustomer", {
				url: "/edit",
				templateUrl: "/views/editCustomer.html",
				controller: "EditCustomerCtrl"
			})
			.state("addCustomer", {
				url: "/add",
				templateUrl: "/views/addCustomer.html",
				controller: "AddCustomerCtrl"
			});
		$urlRouterProvider.otherwise("/landing");
	});

})();