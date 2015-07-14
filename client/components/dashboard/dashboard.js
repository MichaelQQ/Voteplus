'use strict';

angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $location, Auth, $http) {
    
    $scope.options = [];
    $scope.polls = [];
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.index = 0;

    $scope.getNumber = function(){
      return new Array($scope.index);
    }
    
    $scope.addOption = function(){
      $scope.index++;
    };
    
    
    $http.get('/api/poll').success(function(poll) {
      $scope.polls = poll;
    });

    $scope.addPoll = function(isValid) {
      /*if($scope.newPoll === '') {
        return;
      }*/
      if(!isValid)
        return;
      $scope.options.forEach(function(value){
        value.count = 0;
      });
      $http.post('/api/poll', { 
        name: $scope.newPoll,
        owner: $scope.getCurrentUser._id,
        option: $scope.options
      });
      $scope.newPoll = '';
      $scope.options = [];
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

  });