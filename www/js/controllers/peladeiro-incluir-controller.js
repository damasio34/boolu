var app = angular.module('boolu.controllers');

app.controller('PeladeiroIncluirController', function($scope, $location, peladeiroService) {
	
	$scope.Model = {};

	$scope.incluir = function () { 
		peladeiroService.incluir($scope.Model).then(function() {
	    	$location.path("#/app/dashboard");
	  	}, function() {
		    console.log("There was an error saving");
	  	}); 
	}

});