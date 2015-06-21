(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('AppController', function($scope, $state, LoginService) {

		if (!LoginService.usuarioAutenticado()) {
			$state.go('login');
			throw "Usuário não autenticado.";
		};

		$scope.Sair = function() { 
			LoginService.logOut().success(function() {
				$state.go('login');
			});
		};

		// LoginService.getUsuario();

	});

})(angular);