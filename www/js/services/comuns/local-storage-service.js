(function(angular) {

	var services = angular.module('boolu.services');
	services.factory('LocalStorageService', function(){

		var _service = function(){

			this.set = function(key, value){
				if (!!value) localStorage[key] = JSON.stringify(value);
			};

			this.get = function(key){
				if (!!localStorage[key]) return JSON.parse(localStorage[key]);
				else return null;
			}

		};

		return new _service();
	});

})(angular);