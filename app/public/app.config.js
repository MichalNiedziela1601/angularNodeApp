(function ()
{
    'use strict';
    function config($routeProvider)
    {

        $routeProvider.when('/', {
            templateUrl: 'views/testCtrl.html', controller: 'TestController', controllerAs: 'testCtrl'
        })
                .otherwise({redirectTo: '/'});
    }
    angular.module('angularNode')
            .config(config)
})();
