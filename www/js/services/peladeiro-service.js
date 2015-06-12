(function(angular) {

	var services = angular.module('boolu.services');
	services.factory('PeladeiroService', function(RestServiceBase) {

		var _service = function() {};

		var base = new RestServiceBase();
		base.setMainRoute('Peladeiro');
		// Herdando a implementação de RestServiceBase
		_service.prototype = base;

		return new _service();

	});

})(angular);