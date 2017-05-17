(function() {
	"use strict";

	angular.module("um.factories").factory("CustomerFactory", [
		"personSvc",
		function(personSvc) {

			var customerFactory = {};

			customerFactory.selectedDatabase;

			customerFactory.selectedCustomer;

			personSvc.getCustomers().then(function(response){
				customerFactory.customers = response.data || [];
			});

			customerFactory.getCustomers = function(){
				return customerFactory.customers;
			};

			customerFactory.addCustomer = function(customer) {
				personSvc.addCustomer({ person: customer});
            };

            customerFactory.updateCustomer = function(customer) {
				personSvc.updateCustomer({ person: customer});
            };

            customerFactory.deleteCustomer = function(_id) {
				personSvc.deleteCustomer(_id);
            };

			return customerFactory;

		}
	]);
	
})();