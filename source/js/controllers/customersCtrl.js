(function() {
	"use strict";

	angular.module("gm.common").controller("CustomersCtrl", [
		"$scope", "$state", "CustomerFactory", "personSvc",
		function(scope, state, customerFactory, personSvc) {

			personSvc.getCustomers().then(function(response){
				scope.customers = response.data || [];
			});

			scope.isCustomerDeleted = false;

			scope.deleteCustomer = function() {
				customerFactory.deleteCustomer(scope.selectedCustomer._id);
				var index = scope.customers.indexOf(scope.customers);
				scope.customers.splice(index, 1);
				scope.isCustomerDeleted = true;
			};

			scope.setSelectedCustomer = function(customer){
				customerFactory.selectedCustomer = customer;
				scope.selectedCustomer = customer;
				scope.isCustomerDeleted = false;
			};
		}
	]);
})();