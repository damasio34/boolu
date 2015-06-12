(function(angular) {

    var services = angular.module('boolu.services');
    services.service('FocusService', function ($location) {

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

        this.applySettings = function ($controller, $scope) {
            if (!$scope)
                throw "Variável '$scope' precisa ser definda";

            $scope.setFocusByIdOnReady = function (id) {
                return _setFocusByIdOnReady($scope, id);
            };

            $scope.setFocusById = function (id) {
                return _setFocusById($scope, id);
            };

            $scope.setFocusByFilter = function (filter) {
                return _setFocusByFilter($scope, filter);
            };
        };
    });

})(angular);