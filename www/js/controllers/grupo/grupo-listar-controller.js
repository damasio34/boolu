(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('GrupoListarController', function($scope, GrupoService, ListHelperService) {

		ListHelperService.applySettings(this, $scope, GrupoService);
		this.listarItens();

	});

})(angular);