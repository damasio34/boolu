var app = angular.module('boolu.controllers');

app.controller('PeladeiroIncluirEditarController', function($scope, $stateParams, PeladeiroService, FormHelperService) {

	FormHelperService.applySettings(this, $scope, PeladeiroService);
	this.setDefaultRoute('fiscal/classificacoesFiscais/listar');

	this.editById($stateParams.id);

	// $scope.Model = {};

	// $scope.incluir = function () {
	// 	peladeiroService.incluir($scope.Model).then(function() {
	//     	$location.path("#/app/dashboard");
	//   	}, function() {
	// 	    console.log("There was an error saving");
	//   	});
	// }

});