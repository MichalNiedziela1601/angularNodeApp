(function(){
    'use strict';

    function TestController(TesteService){
        var ctrl = this;
        ctrl.message = 'Hello 2';

        ctrl.test = TesteService.getTest().then(function(response){
            ctrl.test = response;
        });
    }

    angular.module('angularNode')
        .controller('TestController', TestController);


})();
