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