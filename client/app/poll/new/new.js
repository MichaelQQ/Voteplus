'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll/new', {
          templateUrl: 'app/poll/new/new.html',
          controller: 'NewPollCtrl'
      });
  })
  .controller('NewPollCtrl', function ($scope, $location, Auth, $http) {

    $scope.options = [];
    $scope.polls = [];
    $scope.index = 0;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.success = false;
    $scope.link = 'http://fs2-fcc.herokuapp.com/poll/';
    $scope.resp;
      
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
      var newpoll = { 
        name: $scope.newPoll,
        owner: $scope.getCurrentUser()._id,
        option: $scope.options
      };
      $http.post('/api/poll', newpoll).success(function(res){
        $scope.success = true;
        $scope.link += res._id;
      });
      $scope.polls.push(newpoll);
      $scope.newPoll = '';
      $scope.options = [];
    };
  });