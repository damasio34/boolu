(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('PeladeiroListarController', function($scope, PeladeiroService, ListHelperService) {

		ListHelperService.applySettings(this, $scope, PeladeiroService);
		this.listarItens();

		// $scope.data = {};
		// $scope.data.showDelete = true;

	});

})(angular);