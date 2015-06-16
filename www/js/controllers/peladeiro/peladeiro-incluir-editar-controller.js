(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('PeladeiroIncluirEditarController', 
		function($scope, $stateParams, PeladeiroService, FormHelperService) {

		FormHelperService.applySettings(this, $scope, PeladeiroService);
		this.setDefaultRoute('app/peladeiro/listar');
		if ($stateParams.id) this.editById($stateParams.id);
		else this.novoRegistro();

	});

})(angular);