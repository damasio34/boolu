/*

	Form Helper

	Serviço que centraliza as operações básicas de um formulário de inclusão/alteração de uma entidade.

*/




(function (angular) {
    var app = angular.module('anywhere.services');

    app.service('ShotcutService', function ($location, KeyboardShortcuts) {

        var self = this;

        var _redirectByShotcut = function ($scope, $location, atalho, path, $controller) {

            //console.log(KeyboardShortcuts);
            KeyboardShortcuts.remove('redirect');
            
            KeyboardShortcuts.register('redirect', atalho, function () {
                $location.path(path);
            }, { digest: true, preventDefault: true, keyboardPreservContext: false });
        };


        this.applySettings = function ($controller, $scope) {
            if (!$scope)
                throw "Variável '$scope' precisa ser definda";

            $controller.redirectByShotcut = function (atalho, path) {
                return _redirectByShotcut($scope, $location, atalho, path, $controller);
            };
        };

    });
})(angular);


(function (angular) {
    var app = angular.module('anywhere.services');

    app.service('focoService', function ($location) {

        var self = this;

        var _setFocusByIdOnReady = function ($scope, id) {
            setTimeout("jQuery(document).ready(function(){ " +
			            	"var ctrl = jQuery('#" + id + "')[0]; " +
			            	"ctrl.focus(); " +
			            	"ctrl.select(); " +
			            "});", 100);
        };

        var _setFocusById = function ($scope, id) {
            setTimeout("var ctrl = jQuery('#" + id + "')[0]; ctrl.focus(); ctrl.select();", 100);
        };

        var _setFocusByFilter = function ($scope, filter) {
            setTimeout("var ctrl = jQuery('" + filter + "')[0]; ctrl.focus(); ctrl.select();", 100);
        };

        var _setFocusLookup = function ($scope, idLookup) {
            setTimeout("var ctrl = jQuery('#" + idLookup + "').find('#txtLookup')[0]; ctrl.focus(); ctrl.select();", 100);
        };

        var _setFocusDatapicker = function ($scope, idDatapicker) {
            setTimeout("var ctrl = jQuery('#" + idDatapicker + "').find('#txtDatapicker')[0]; ctrl.focus(); ctrl.select();", 100);
        };

        this.applySettings = function ($controller, $scope) {
            if (!$scope)
                throw "Variável '$scope' precisa ser definda";

            $scope.setFocusByIdOnReady = function (id) {
                return _setFocusByIdOnReady($scope, id);
            };

            $scope.setFocusById = function (id) {
                return _setFocusById($scope, id);
            };

            $scope.setFocusLookup = function (idLookup) {
                return _setFocusLookup($scope, idLookup);
            };

            $scope.setFocusDatapicker = function (idDatapicker) {
                return _setFocusDatapicker($scope, idDatapicker);
            };

            $scope.setFocusByFilter = function (filter) {
                return _setFocusByFilter($scope, filter);
            };
        };
    });
})(angular);