'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll/mypoll', {
          templateUrl: 'app/poll/mypoll/mypoll.html',
          controller: 'MyPollCtrl'
      });
  })
  .controller('MyPollCtrl', function ($scope, $location, Auth, $http) {
    
    $scope.polls = [];
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    $http.get('/api/poll/user/'+ $scope.getCurrentUser()._id).success(function(poll) {
      $scope.polls = poll;
    });

    $scope.deletePoll = function(poll) {
      $http.delete('/api/poll/' + poll._id);
      for(var i=0; i<$scope.polls.length; i++){
        if($scope.polls[i]._id === poll._id){
           $scope.polls.splice(i, 1);
        }
      }
    };

  });