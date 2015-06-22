(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('LoginController', function($scope, $state, LoginService) {

		if (LoginService.usuarioAutenticado()) $state.go('app.dashboard');

		$scope.Model = {
			usuario: 'damasio34',
			senha: '12345',
			salvarSenha: true
		};

		$scope.signIn = function (form) {
			if(form.$valid) {
				LoginService.efetuarLogin($scope.Model).success(function(){
					$state.go('app.dashboard');
				});
			};
		};

	});

})(angular);