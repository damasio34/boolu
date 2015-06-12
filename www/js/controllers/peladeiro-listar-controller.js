var app = angular.module('boolu.controllers');

app.controller('PeladeiroListarController', function($scope, PeladeiroService) {

	PeladeiroService.getAll().success(function(data) {

		$scope.items = data.results;

	});

});