(function(angular){

    var services = angular.module('boolu.services');
    services.factory('restService', function($http, PARSE_CREDENTIALS, Restangular) {

        console.log(Restangular.defaultHeaders);

        var _service = function() {

            self = this;

            this.mainRoute = undefined;

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

                return $http.get('https://api.parse.com/1/classes/' + self.mainRoute, {
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    }
                });
            };
    	
            this.getById = function(id) {
                if (!id) throw "id não informado";
                if (!this.mainRoute) throw "mainRoute não configurada.";

                return Restangular.one(this.mainRoute, id).get();
            };

            this.incluir = function(model) {
                if (!self.mainRoute) throw "mainRoute não configurada.";

                return Restangular.all(self.mainRoute).post(model);
            };

            this.edit = function(id, data){

                if (!model.put) throw "Objeto a ser alterado inválido";

                return model.put();
            };

            this.delete = function(id) {
                if (!this.mainRoute) throw "mainRoute não configurada.";

                return Restangular.one(this.mainRoute, id).remove();            
            };
       	}

        return _service;

    });

})(angular);