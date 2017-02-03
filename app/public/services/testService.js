(function(){
    'use strict';

    function TesteService($http, $q){
        this.getTest = function(){
            return $http.get('/test').then(function(result){
                console.log(result);
                return result.data;
            });
        };

        this.getTestData = function(){
          return $http.get('/api/testdata').then(function(result){
              console.log(result);
              return result.data;
          })
        }
    }

    angular.module('angularNode')
        .service('TesteService', TesteService);



})();
