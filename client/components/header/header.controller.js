'use strict';

angular.module('workspaceApp')
  .controller('HeaderCtrl', function ($scope, $location, Auth) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    //$scope.active = 0;
    $scope.buttons = [
      {
        name: "New Poll",
        active: true
      },
      {
        name: "My Polls",
        active: false
      }];
    
    
    $scope.toActive = function(n){
      $scope.buttons[$scope.active].active = false;
      $scope.setActive(n);
      $scope.buttons[n].active = true;
    };
    
    $scope.isActive = function(n){
      return $scope.buttons[n].active;
    };
    
  });