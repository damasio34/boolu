var app = angular.module('boolu.controllers');

app.controller('PeladeiroListarController', function($scope, $location, peladeiroService) {

	peladeiroService.getAll().success(function(data) {

		$scope.items = data.results;

	});

});