(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('PeladeiroListarController', function($scope, PeladeiroService, ListHelperService) {

		ListHelperService.applySettings(this, $scope, PeladeiroService);
		this.listarItens();

		// $scope.data = {};
		$scope.showDelete = false;
		$scope.exibeBotaoExcluir = function() {
			$scope.showDelete = !$scope.showDelete;
		};

	});

})(angular);