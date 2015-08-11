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
    $scope.poll = {};
    $scope.owner = '';
    $scope.decsion = '';
    
    $scope.update = function(descion){
      $scope.descion = descion;
      var vote = { descion : $scope.descion };
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