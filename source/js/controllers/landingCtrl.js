(function() {
	"use strict";

	angular.module("um.common").controller("LandingCtrl", [
		"$scope", "$state", "CustomerFactory", "personSvc",
		function(scope, state, customerFactory, personSvc) {

			scope.availableDBs = [
				{
					label: "DB1",
					value: "DB1"
				},
				{
					label: "DB2",
					value: "DB2"
				}
			];

			scope.selectDatabase = function() {
				if(scope.availableDBs[0].value === scope.selectedDatabase
					|| scope.availableDBs[1].value === scope.selectedDatabase) {
					customerFactory.selectedDatabase = scope.selectedDatabase;
					personSvc.selectedDatabase = scope.selectedDatabase;
					state.go("viewCustomers");
				}
			};
		}
	]);
})();