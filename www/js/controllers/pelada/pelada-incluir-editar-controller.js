(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('PeladaIncluirEditarController', 
		function($scope, $stateParams, PeladaService, FormHelperService) {

		FormHelperService.applySettings(this, $scope, PeladaService);
		this.setDefaultRoute('app/pelada/listar');
		if ($stateParams.id) this.editById($stateParams.id);
		else this.novoRegistro();

	});

})(angular);