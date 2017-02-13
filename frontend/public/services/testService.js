(function(){
    'use strict';

    function TesteService($http, $q){
        this.getTest = function(){
            return $http.get('http://localhost:5000/api/testdata').then(function(result){
                return result.data;
            });
        };

    }

    angular.module('angularNode')
        .service('TesteService', TesteService);



})();
