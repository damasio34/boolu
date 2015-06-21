(function(angular) {

	var services = angular.module('boolu.services');
	services.factory('LoginService',
		function($state, $http, RestServiceBase, PARSE_CREDENTIALS, WebStorageService, CryptSha1Service) {

		var _service = function() {

			this.efetuarLogin = function (_usuario, _senha) {
                // var whereQuery = {type: subtype};

                // console.log(CryptSha1Service.hash(_senha));

                return $http.get('https://api.parse.com/1/login', {

                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    params:  {
                     	username: _usuario, password: CryptSha1Service.hash(_senha),
                      	// where: {username: _usuario, password: _senha},
                     	// limit: 2,
                     	// count: 1
                     	// include: "something"
                    }

                }).success(function(data, status) {
					if (status == 200 && !!data.sessionToken) {
						WebStorageService.setSessionStorage('_$token', data.sessionToken);
						$state.go('app.dashboard');
					}
                }).error(function (data, status) {
                	console.log(status);
					console.log(data);
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