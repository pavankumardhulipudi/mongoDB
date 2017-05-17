(function() {
	"use strict";

	angular.module("um.common").controller("AddCustomerCtrl", [
		"$scope", "$state", "CustomerFactory",
		function(scope, state, customerFactory) {

			if(!customerFactory.selectedDatabase) {
				state.go("landing");
			}

			scope.selectedDatabase = customerFactory.selectedDatabase;
			
			scope.customer = {};

			scope.isCustomerAdded = false;

			scope.addCustomer = function() {
				if(scope.customer.firstname 
					&& scope.customer.lastname
					&& scope.customer.email
					&& scope.customer.username
					&& scope.customer.password) {
					customerFactory.addCustomer(scope.customer);
					scope.isCustomerAdded = true;
				}
			};

			scope.resetScope = function() {
				delete scope.isAddCustomerSuccess;
				delete scope.customer;
			}

		}
	]);
	
})();