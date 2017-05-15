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