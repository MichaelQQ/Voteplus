'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.awesomeThings = [];
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.active = 0;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
    
    $scope.setActive = function(n){
      $scope.active = n;
    };
    
  });
