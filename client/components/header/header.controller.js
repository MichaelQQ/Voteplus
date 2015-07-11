'use strict';

angular.module('workspaceApp')
  .controller('HeaderCtrl', function ($rootScope, $scope, $location, Auth) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.active = 0;
    $scope.buttons = [
      {
        name: "New Poll",
        active: true
      },
      {
        name: "My Polls",
        active: false
      }];
    $rootScope.header = 0;
    
    
    $scope.toActive = function(n){
      $scope.buttons[$scope.active].active = false;
      $scope.active = n;
      $scope.buttons[n].active = true;
      $rootScope.header = $scope.active;
    };
    
    $scope.isActive = function(n){
      return $scope.buttons[n].active;
    };
    
  });