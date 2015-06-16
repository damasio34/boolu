(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('GrupoIncluirEditarController', 
		function($scope, $stateParams, GrupoService, FormHelperService) {

		FormHelperService.applySettings(this, $scope, GrupoService);
		this.setDefaultRoute('app/grupo/listar');
		if ($stateParams.id) this.editById($stateParams.id);
		else this.novoRegistro();

	});

})(angular);