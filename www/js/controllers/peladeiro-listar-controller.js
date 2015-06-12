var app = angular.module('boolu.controllers');

app.controller('PeladeiroListarController', function($scope, $location, peladeiroService) {
	
	peladeiroService.getAll().success(function(data) {

		// console.log(data);
		$scope.items = data.results;

	});

});