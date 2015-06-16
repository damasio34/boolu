(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('PeladaListarController', function($scope, PeladaService, ListHelperService) {

		ListHelperService.applySettings(this, $scope, PeladaService);
		this.listarItens();

	});

})(angular);