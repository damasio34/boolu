(function(angular){

    var app = angular.module('boolu');
    app.config(function($stateProvider, $urlRouterProvider) {

        // Rotas ou states
        $stateProvider

        // App
        .state('app', {
    		url: "/app",
    		abstract: true,
    		templateUrl: "views/app.html"
    		// controller: 'AppController'
        })

        // Dashboard
        .state('app.dashboard', {
            url:'/dashboard',
            views: {
    	        'mainContent' :{
            		templateUrl:'views/dashboard/dashboard.html',
            		controller:'DashboardController'
    	        }
          	}
        })

        // Grupo
        .state('app.grupoListar', {
            url:'/grupo/listar',
            views: {
                'mainContent' :{
                    templateUrl:'views/grupo/grupo-listar.html',
                    controller:'GrupoListarController'
                }
            }
        })

        .state('app.grupoIncluir', {
            url:'/grupo/incluir',
            views: {
                'mainContent' :{
                    templateUrl:'views/grupo/grupo-incluir-editar.html',
                    controller:'GrupoIncluirEditarController'
                }
            }
        })

        .state('app.grupoEditar', {
            url:'/grupo/editar/:id',
            views: {
                'mainContent' :{
                    templateUrl:'views/grupo/grupo-incluir-editar.html',
                    controller:'GrupoIncluirEditarController'
                }
            }
        })

        // Pelada
        .state('app.peladaListar', {
            url:'/pelada/listar',
            views: {
                'mainContent' :{
                    templateUrl:'views/pelada/pelada-listar.html',
                    controller:'PeladaListarController'
                }
            }
        })

        .state('app.peladaIncluir', {
            url:'/pelada/incluir',
            views: {
                'mainContent' :{
                    templateUrl:'views/pelada/pelada-incluir-editar.html',
                    controller:'PeladaIncluirEditarController'
                }
            }
        })

        .state('app.peladaEditar', {
            url:'/pelada/editar/:id',
            views: {
                'mainContent' :{
                    templateUrl:'views/pelada/pelada-incluir-editar.html',
                    controller:'PeladaIncluirEditarController'
                }
            }
        })

        // Peladeiro
        .state('app.peladeiroListar', {
            url:'/peladeiro/listar',
            views: {
    	        'mainContent' :{
            		templateUrl:'views/peladeiro/peladeiro-listar.html',
            		controller:'PeladeiroListarController'
    	        }
          	}
        })

        .state('app.peladeiroIncluir', {
            url:'/peladeiro/incluir',
            views: {
    	        'mainContent' :{
            		templateUrl:'views/peladeiro/peladeiro-incluir-editar.html',
            		controller:'PeladeiroIncluirEditarController'
    	        }
          	}
        })

        .state('app.peladeiroEditar', {
            url:'/peladeiro/editar/:id',
            views: {
                'mainContent' :{
                    templateUrl:'views/peladeiro/peladeiro-incluir-editar.html',
                    controller:'PeladeiroIncluirEditarController'
                }
            }
        })

        // Lancamento
        .state('app.lancamentoListar', {
            url:'/lancamento/listar',
            views: {
                'mainContent' :{
                    templateUrl:'views/lancamento/lancamento-listar.html',
                    controller:'LancamentoListarController'
                }
            }
        })

        .state('app.lancamentoIncluir', {
            url:'/lancamento/incluir',
            views: {
                'mainContent' :{
                    templateUrl:'views/lancamento/lancamento-incluir-editar.html',
                    controller:'LancamentoIncluirEditarController'
                }
            }
        })

        .state('app.lancamentoEditar', {
            url:'/lancamento/editar/:id',
            views: {
                'mainContent' :{
                    templateUrl:'views/lancamento/lancamento-incluir-editar.html',
                    controller:'LancamentoIncluirEditarController'
                }
            }
        });

        $urlRouterProvider.otherwise('/app/dashboard');

    });

})(angular);