(function() {
	"use strict";

	angular.module("gm.common").controller("EditCustomerCtrl", [
		"$scope", "$state", "CustomerFactory",
		function(scope, state, customerFactory) {

			scope.customer = customerFactory.selectedCustomer;

			if(!scope.customer) {
				state.go("viewCustomers");
			}
			scope.isCustomerUpdated = false;

			scope.updateCustomer = function() {
				if(scope.customer.email 
					&& scope.customer.firstname 
					&& scope.customer.lastname
					&& scope.customer.username
					&& scope.customer.password) {
					customerFactory.updateCustomer(scope.customer);
					scope.isCustomerUpdated = true;
				}
			}
		}
	]);
})();