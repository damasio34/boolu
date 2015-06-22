(function(angular) {

	var services = angular.module('boolu.services');
	services.factory('LoginService',
		function($http, RestServiceBase, PARSE_CREDENTIALS, WebStorageService, CryptSha1Service) {

		var _service = function() {

			this.getToken = function(){
				return WebStorageService.getLocalStorage('_$token') || WebStorageService.getSessionStorage('_$token');
			};

			this.efetuarLogin = function (model) {
                // var whereQuery = {type: subtype};

				if (!!getToken()) this.logOut();

                return $http.get('https://api.parse.com/1/login', {

                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                     	username: model.usuario, password: CryptSha1Service.hash(model.senha),
                      	// where: {username: _usuario, password: _senha},
                     	// limit: 2,
                     	// count: 1
                     	// include: "something"
                    }

                }).success(function(data, status) {
					if (status == 200 && !!data.sessionToken) {
						if (model.salvarSenha) WebStorageService.setLocalStorage('_$token', data.sessionToken);
						else WebStorageService.setSessionStorage('_$token', data.sessionToken);
					}
                }).error(function (data, status) {
                	console.log(status);
					console.log(data);
				});
			};

			this.getUsuario = function() {
				var token = this.getToken();
				return $http.get('https://api.parse.com/1/users/me', {
                    headers: {
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                        'X-Parse-Session-Token': token,
                    },
                }).success(function(data, status) {
					if (status == 200) {
						console.log(data);
					}
                }).error(function (data, status) {
                	console.log(data.error);
				});			
			};

			this.usuarioAutenticado = function() {
				var token = this.getToken();
				if (!token || token == null) return false;
				else return true;				
			};

			this.logOut = function() {
				var token = this.getToken();
				if (!!token) {
					return $http.post('https://api.parse.com/1/logout', '', {

	                    headers: {
	                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
	                        'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
	                        'X-Parse-Session-Token': token,
	                    }

	                }).success(function(data, status, headers) {
						if (status == 200) {
							sessionStorage.removeItem('_$token');
							sessionStorage.clear();
							localStorage.removeItem('_$token');
							localStorage.clear();
						}
	                }).error(function (data, status) {
	                	// console.log(status);
	                	console.log(data.error);
					});
				};	
			};
		};

		return new _service();

	});

})(angular);