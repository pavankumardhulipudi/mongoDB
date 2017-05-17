(function() {
	"use strict";

	angular.module("um.common", []);

	angular.module("um.factories", [
		"um.common"
	]);

	angular.module("um.services", [
		"um.common"
	]);

	angular.module("um.filters", [
		"um.common"
	]);

	angular.module("um.apiServices", [
		"um.common"
	]);

	angular.module("um.app", [
		"ngStorage",
		"ui.router",
		"um.common",
		"um.factories",
		"um.services",
		"um.apiServices"
	]);

})();
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
(function() {
	"use strict";

	angular.module("um.common").controller("EditCustomerCtrl", [
		"$scope", "$state", "CustomerFactory",
		function(scope, state, customerFactory) {

			if(!customerFactory.selectedDatabase) {
				state.go("landing");
			}

			scope.selectedDatabase = customerFactory.selectedDatabase;

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
(function() {
	"use strict";

	angular.module("um.filters").filter("CommonFilter", [
		function(rootscope) {
			
		}
	]);
	
})();
(function() {
	"use strict";

	angular.module("um.apiServices")
		.service("personSvc", function($http) {

			this.selectedDatabase = "";
			
			this.getCustomer = function(_id){
				$http.post("/api/person/"+this.selectedDatabase+_id);
			};
	        
	        this.getCustomers = function() {
	        	return $http.get("/api/person/"+this.selectedDatabase);
	        };
			
			this.addCustomer = function(person) {
				$http.post("/api/person/"+this.selectedDatabase, person);
			};
	        
	        this.updateCustomer = function(person) {
	        	console.log("Before send -- ", person);
				$http.put("/api/person/"+this.selectedDatabase+"/"+person.person._id, person);
			};
			
			this.deleteCustomer = function(_id) {
				$http.delete("/api/person/"+this.selectedDatabase+"/"+_id);
			};
		
		});
})();