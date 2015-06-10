(function(angular){

	var services = angular.module('boolu.services');
	services.factory('peladeiroService', function(restService) {

		var _service = function() {};

		var base = new restService();
		base.setMainRoute('Peladeiro');
		// Herdando a implementação de restService
		_service.prototype = base;

		return new _service();

	});


})(angular);