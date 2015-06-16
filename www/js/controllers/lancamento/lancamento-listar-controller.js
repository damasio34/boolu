(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('LancamentoListarController', function($scope, LancamentoService, ListHelperService) {

		ListHelperService.applySettings(this, $scope, LancamentoService);
		this.listarItens();

	});

})(angular);