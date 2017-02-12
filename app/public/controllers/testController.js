(function(){
    'use strict';

    function TestController(TesteService){
        var ctrl = this;
        ctrl.message = 'Hello 2';

        ctrl.test = TesteService.getTest().then(function(data){
            ctrl.test = data;
        });

        ctrl.testData = TesteService.getTestData().then(function (data)
        {
            console.log(data);
            ctrl.testData = data.testData;
        })
    }

    angular.module('angularNode')
        .controller('TestController', TestController);


})();
