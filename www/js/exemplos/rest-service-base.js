(function(angular){

	var services = angular.module('anywhere.services');

	services.factory('RestServiceBase', function(Restangular,) {

		var _service = function(){

			this.mainRoute = undefined;

			this.setErrorHandler = function(callBack){
				// Marcus Miris @ 13/Jun/2014
				// Por hora não faz nada, pq os erros já estão sendo tratados pela aplicação.
	        	//Restangular.setErrorInterceptor(callBack);
	        };

	        this.setMainRoute = function(mainRoute){
	        	this.mainRoute = mainRoute;
	        };

			this.getAll = function(callBack, callBackError){
				if (!this.mainRoute) throw "mainRoute não configurada.";

				return Restangular.all(this.mainRoute).getList();
			};

			//this.novo = function(callBack, callBackError){
			//	if (!this.mainRoute) throw "mainRoute não configurada.";

			//	return Restangular.all(this.mainRoute).one('novo').post({});
			//};

			this.getById = function(id){
				if (!id) throw "id não informado";
				if (!this.mainRoute) throw "mainRoute não configurada.";

				return Restangular.one(this.mainRoute, id).get();
			};

			this.incluir = function(novo){
				if (!this.mainRoute) throw "mainRoute não configurada.";

				return Restangular.all(this.mainRoute).post(novo);
			};

			this.alterar = function(model){
				if (!model.put) throw "Objeto a ser alterado inválido";

				return model.put();
			};

			this.novo = function(model){
				return Restangular.all(this.mainRoute + "/novo").post(model);
			};

			this.remover = function(model){
				if (!model.remove) throw "Objeto a ser removido inválido";

				return model.remove();
			};

			this.removerPeloId = function(id){
				if (!this.mainRoute) throw "mainRoute não configurada.";

				return Restangular.one(this.mainRoute, id).remove();
			};

		};

		return _service;

	});


})(angular);