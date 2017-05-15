(function() {
	"use strict";

	angular.module("gm.app").config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state("viewCustomers", {
				url: "/view",
				templateUrl: "/views/viewCustomers.html",
				controller: "CustomersCtrl"
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
		$urlRouterProvider.otherwise("/view");
	});

})();