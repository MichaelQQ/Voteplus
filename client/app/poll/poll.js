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
      
    $http.get('/api/poll/'+ $routeParams.id).success(function(poll) {
        $scope.poll = poll;
        $http.get('/api/users/'+ poll.owner).success(function(user) {
            $scope.owner = user.name;
        });
    });
      
  });