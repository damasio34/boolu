(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('LancamentoIncluirEditarController', 
		function($scope, $stateParams, LancamentoService, FormHelperService) {

		FormHelperService.applySettings(this, $scope, LancamentoService);
		this.setDefaultRoute('app/lancamento/listar');
		if ($stateParams.id) this.editById($stateParams.id);
		else this.novoRegistro();

	});

})(angular);