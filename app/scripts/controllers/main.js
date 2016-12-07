'use strict';

/**
 * @ngdoc function
 * @name testingangularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testingangularApp
 */
angular.module('testingangularApp')
  .controller('MainCtrl', function ($scope, backendService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.currentStatus = null;
    $scope.init = function(){
    		backendService.getStatus().then(function(data){
    			$scope.currentStatus = data;
    		});
    }
  });
