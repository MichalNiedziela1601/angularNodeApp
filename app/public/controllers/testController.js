(function(){
    'use strict';

    function TestController(TesteService){
        var ctrl = this;
        ctrl.message = 'Hello 2';

        ctrl.test = TesteService.getTest().then(function(data){
            ctrl.test = data;
        });
    }

    angular.module('angularNode')
        .controller('TestController', TestController);


})();
