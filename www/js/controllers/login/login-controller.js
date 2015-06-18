(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('LoginController', function($scope, $state, LoginService) {

		$scope.Model = {
			usuario: 'damasio34',
			senha: '12345'
		}

		$scope.login = function () {
			LoginService.efetuarLogin($scope.Model.usuario, $scope.Model.senha);
		};

	});

})(angular);