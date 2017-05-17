(function() {
	"use strict";

	angular.module("um.common").controller("ViewCustomersCtrl", [
		"$scope", "$state", "CustomerFactory", "personSvc",
		function(scope, state, customerFactory, personSvc) {
			
			if(!customerFactory.selectedDatabase) {
				state.go("landing");
			}

			scope.selectedDatabase = customerFactory.selectedDatabase;

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