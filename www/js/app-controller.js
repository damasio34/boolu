(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('AppController', function($scope, $state, LocalStorageService) {

		var token = LocalStorageService.get('_$token');
		if (!token || token == null) {
			$state.go('login');
			throw "Usuário não autenticado.";
		};

	});

})(angular);