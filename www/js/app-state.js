var app = angular.module('boolu');

app.config(function($stateProvider, $urlRouterProvider) {

    // Rotas ou states
    $stateProvider

    .state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "views/main.html",
		controller: 'MainController'
    })

    .state('app.dashboard', {
        url:'/dashboard',
        views: {
	        'mainContent' :{
        		templateUrl:'views/dashboard.html',
        		controller:'DashboardController'
	        }
      	}
    })

    .state('app.peladeiroListar', {
        url:'/peladeiro/listar',
        views: {
	        'mainContent' :{
        		templateUrl:'views/peladeiro-listar.html',
        		controller:'PeladeiroListarController'
	        }
      	}
    })

    .state('app.peladeiroIncluir', {
        url:'/peladeiro/incluir',
        views: {
	        'mainContent' :{
        		templateUrl:'views/peladeiro-incluir-editar.html',
        		controller:'PeladeiroIncluirEditarController'
	        }
      	}
    })

    .state('app.peladeiroEditar', {
        url:'/peladeiro/editar/:id',
        views: {
            'mainContent' :{
                templateUrl:'views/peladeiro-incluir-editar.html',
                controller:'PeladeiroIncluirEditarController'
            }
        }
    })

    ;

    $urlRouterProvider.otherwise('/app/dashboard');

});