(function() {
	"use strict";

	angular.module("gm.common").controller("AddCustomerCtrl", [
		"$scope", "$state", "CustomerFactory",
		function(scope, state, customerFactory) {

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