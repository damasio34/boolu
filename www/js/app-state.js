var app = angular.module('boolu');

app.config(function($stateProvider, $urlRouterProvider) {
    
    // Rotas ou states
    $stateProvider.state('dashboard',{
        url:'/dashboard',
        controller:'DashboardController',
        templateUrl:'views/dashboard.html'
    });

    $urlRouterProvider.otherwise('/dashboard');

});