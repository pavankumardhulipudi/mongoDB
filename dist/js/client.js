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
(function() {
	"use strict";

	angular.module("gm.factories").factory("CustomerFactory", [
		"personSvc",
		function(personSvc) {

			var customerFactory = {};

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
(function() {
	"use strict";

	angular.module("gm.filters").filter("CommonFilter", [
		function(rootscope) {
			
		}
	]);
	
})();
(function() {
	"use strict";

	angular.module("apiServices")
		.service("personSvc", function($http) {
			this.getCustomer = function(_id){
				$http.post("/api/person/"+_id);
			}
	        this.getCustomers = function() {
	        	return $http.get("/api/person/");
	        };
			this.addCustomer = function(person) {
				$http.post("/api/person/", person);
			};
	        this.updateCustomer = function(person) {
	        	console.log("Before send -- ", person);
				$http.put("/api/person/"+person.person._id, person);
			};
			this.deleteCustomer = function(_id) {
				$http.delete("/api/person/"+_id);
			};
		});
})();
(function() {
	"use strict";

	angular.module("gm.services").service("StorageService", [
		"$rootScope",
		function(rootscope) {

			this.setCustomers = function(customers) {
				localStorage.gmCustomers = JSON.stringify(customers);
            };

            this.getCustomers = function() {
				var customers = localStorage.gmCustomers;
            	if(typeof customers === "string") {
            		return JSON.parse(customers);
            	}
            };

		}
	]);
	
})();