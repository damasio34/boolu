(function(angular){

    var services = angular.module('boolu.services');
    services.factory('CryptSha1Service', function() {

        var _service = function() {

	        this.hash = function (value) {
	            var str = JSON.stringify(value);
	            return CryptoJS.SHA1(str).toString();
	        }
	    };

        return new _service();

    });

})(angular)