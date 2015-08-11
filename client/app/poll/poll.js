'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll/:id', {
          templateUrl: 'app/poll/poll.html',
          controller: 'PollCtrl'
      });
  })
  .controller('PollCtrl', function ($scope, $location, Auth, $http, $routeParams) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.poll = {};
    $scope.owner = '';
    $scope.decsion = '';
    
    $scope.voted = function(){
      for(var i=0; i<$scope.poll.member.length; i++){
        if($scope.poll.member[i] === $scope.getCurrentUser()._id)
          return true;
      }
      return false;
    };
    
    $scope.update = function(descion){
      $scope.descion = descion;
      var vote = { 
        descion : $scope.descion,
        voter: $scope.getCurrentUser()._id
      };
      $http.patch('/api/poll/' + $routeParams.id, vote).success(function(updatedpoll){
        $scope.poll = updatedpoll;
      });
      $scope.decsion = '';
      //$scope.refresh();
    };
    
    $scope.refresh = function(){
      $http.get('/api/poll/'+ $routeParams.id).success(function(poll) {
        $scope.poll = poll;
        $http.get('/api/users/'+ poll.owner).success(function(user) {
            $scope.owner = user.name;
        });
      });
    };
      
    $http.get('/api/poll/'+ $routeParams.id).success(function(poll) {
        $scope.poll = poll;
        $http.get('/api/users/'+ poll.owner).success(function(user) {
            $scope.owner = user.name;
        });
    });
      
  });