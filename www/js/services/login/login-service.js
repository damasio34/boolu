(function(angular) {

	var services = angular.module('boolu.services');
	services.factory('LoginService', 
		function($state, $http, RestServiceBase, PARSE_CREDENTIALS, LocalStorageService) {

		var _service = function() {

			this.efetuarLogin = function (_usuario, _senha) {
                if (!self.mainRoute) throw "mainRoute não configurada.";

                // var whereQuery = {type: subtype};

                return $http.get(self.urlBase + self.mainRoute, {

                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                        'X-Parse-Revocable-Session': '1',
                        // 'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    params:  { 
                     	username: _usuario, password: _senha,
                      	// where: {username: _usuario, password: _senha},
                     	// limit: 2,
                     	// count: 1
                     	// include: "something"
                    }

                }).success(function(data) {
					if (data.results.length == 1) {
						LocalStorageService.set('_$token', data.results.sessionToken);
						console.log(data.sessionToken);
						$state.go('app.dashboard');
					}
                });
			};
		};

		var base = new RestServiceBase();
		base.setMainRoute('_User');
		// Herdando a implementação de RestServiceBase
		_service.prototype = base;

		return new _service();

	});

})(angular);