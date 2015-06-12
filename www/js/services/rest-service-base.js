(function(angular){

    var services = angular.module('boolu.services');
    services.factory('RestServiceBase', function($http, PARSE_CREDENTIALS, Restangular) {

        // console.log(Restangular.defaultHeaders);

        var _service = function() {

            self = this;

            this.mainRoute = undefined;
            this.urlBase = 'https://api.parse.com/1/classes/';

            this.headers = {
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            };

            this.setMainRoute = function(mainRoute) {
                self.mainRoute = mainRoute;
            };

            this.getAll = function() {
                if (!self.mainRoute) throw "mainRoute não configurada.";

                // return Restangular.all(this.mainRoute).getList();

                return $http.get(self.urlBase + self.mainRoute, {
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    }
                });
            };

            this.getById = function(id) {
                if (!id) throw "id não informado";
                if (!this.mainRoute) throw "mainRoute não configurada.";

                // return Restangular.one(this.mainRoute, id).get();

                return $http.get(self.urlBase + self.mainRoute + '/' + id, {
                    headers: {
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    }
                });
            };

            this.incluir = function(model) {
                if (!self.mainRoute) throw "mainRoute não configurada.";

                // return Restangular.all(self.mainRoute).post(model);

                return $http.post(self.urlBase + self.mainRoute, model, {
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                        'Content-Type':'application/json'
                    }
                });
            };

            this.editar = function(id, model){

                if (!model.put) throw "Objeto a ser alterado inválido";

                // return model.put();

                return $http.put(self.urlBase + self.mainRoute + '/' + id, model, {
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                        'Content-Type':'application/json'
                    }
                });
            };

            this.excluir = function(id) {
                if (!this.mainRoute) throw "mainRoute não configurada.";

                // return Restangular.one(this.mainRoute, id).remove();

                return $http.delete(self.urlBase + self.mainRoute + '/' + id, {
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                        'Content-Type':'application/json'
                    }
                });
            };
       	}

        return _service;

    });

})(angular);