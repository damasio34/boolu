(function(angular){

	var controllers = angular.module('boolu.controllers');
	controllers.controller('LoginController', function($scope, LoginService, $state) {

		$scope.Model = {
			usuario: 'damasio34',
			senha: '12345'
		}
		
		$scope.login = function () {
			LoginService.efetuarLogin($scope.Model.usuario, $scope.Model.senha)
				.success(function (data, status) {
					console.log(data);
					console.log(data.sessionToken);
					if (data.results.length == 1) {
						$state.go('app.dashboard');
					}
				})
				.error(function (data, status) {
					console.log(data);
				});
		};

	});

})(angular);