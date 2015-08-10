'use strict';

angular.module('workspaceApp')
  .controller('HeaderCtrl', function ($scope, $location, Auth) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    
    $scope.inNewPoll = function(){
      if($location.path() === '/poll/new'){
        return true;
      }
    };
    
    $scope.inMyPoll = function(){
      if($location.path() === '/poll/mypoll'){
        return true;
      }
    };
    
    $scope.inLogin = function(){
      if($location.path() === '/login' || $location.path() === '/signup'){
        return true;
      }
    };
    
    $scope.new = function() {
      $location.path('/poll/new');
    };
    
    $scope.mypoll = function() {
      $location.path('/poll/mypoll');
    };
    
  });