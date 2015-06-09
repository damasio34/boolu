var app = angular.module('boolu.controllers');

app.controller('DashboardController', function($scope, dashboardService) {

	dashboardService.getById('1exQL97mmy').then(function(data) {

		$scope.grupo = data;

	});

});