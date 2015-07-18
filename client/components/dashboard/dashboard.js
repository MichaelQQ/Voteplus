'use strict';

angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $location, Auth, $http) {
    
    $scope.options = [];
    $scope.polls = [];
    $scope.index = 0;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.gotPolls = false;
    
    $scope.$watch('active', function () {
      if($scope.active === 1) { 
        if($scope.gotPolls === false){
          $http.get('/api/poll/'+ $scope.getCurrentUser()._id).success(function(poll) {
            $scope.polls = poll;
            $scope.gotPolls = true;
          });
        }
      }
    });
    
    $scope.getNumber = function(){
      return new Array($scope.index);
    };
    
    $scope.addOption = function(){
      $scope.index++;
    };

    $scope.addPoll = function(isValid) {
      if(!isValid){
        return;
      }
      $scope.options.forEach(function(value){
        value.count = 0;
      });
      $http.post('/api/poll', { 
        name: $scope.newPoll,
        owner: $scope.getCurrentUser()._id,
        option: $scope.options
      });
      $scope.newPoll = '';
      $scope.options = [];
      reflashPoll();
    };

    var reflashPoll = function(){
      $http.get('/api/poll/'+ $scope.getCurrentUser()._id).success(function(poll) {
        $scope.polls = poll;
      });
    };

    $scope.deletePoll = function(poll) {
      $http.delete('/api/poll/' + poll._id);
      reflashPoll();
    };

  });