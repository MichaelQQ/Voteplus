'use strict';

angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $location, Auth, $http) {
    
    $scope.options = ["pespi","Coca-Cola"];
    $scope.polls = [];
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.getCurrentUser = Auth.getCurrentUser();

    
    $scope.addOption = function(){
      var placehoder = "New Option";
      $scope.options.push(placehoder);
    };
    
    
    $http.get('/api/poll').success(function(poll) {
      $scope.polls = poll;
    });

    $scope.addPoll = function() {
      if($scope.newPoll === '') {
        return;
      }
      $http.post('/api/poll', { 
        name: $scope.newPoll,
        owner: $scope.getCurrentUser._id
      });
      $scope.newPoll = '';
      reflashPoll();
    };

    var reflashPoll = function(){
      $http.get('/api/poll').success(function(poll) {
        $scope.polls = poll;
      });
    };

    $scope.deletePoll = function(poll) {
      $http.delete('/api/poll/' + poll._id);
      reflashPoll();
    };

    

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });