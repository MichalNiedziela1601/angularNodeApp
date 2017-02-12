(function(){
    'use strict';

    function TesteService($http, $q){
        this.getTest = function(){
            return $http.get('http://localhost:5000/api/testdata').then(function(result){
                return result.data;
            });
        };

        this.getTestData = function(){
          return $http.get('/api/testdata').then(function(result){
              return result.data;
          })
                  .catch(function(error){
                      console.log(error);
                  })
        }
    }

    angular.module('angularNode')
        .service('TesteService', TesteService);



})();
