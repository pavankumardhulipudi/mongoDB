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