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

    var labels = [];
    var datas = [];
    
    function setChartData(){
      for(var i=0; i<$scope.poll.option.length; i++){
        labels.push($scope.poll.option[i].name);
        datas.push($scope.poll.option[i].count);
      }
    }
    
    function createChart(){
      var data = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: datas
            }
        ]
      };
    // Get the context of the canvas element we want to select
      var ctx = document.getElementById("myChart").getContext("2d");
      var myNewChart = new Chart(ctx).Bar(data);
    }
    
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
    };
      
    $http.get('/api/poll/'+ $routeParams.id).success(function(poll) {
        $scope.poll = poll;
        $http.get('/api/users/'+ poll.owner).success(function(user) {
            $scope.owner = user.name;
            setChartData();
            createChart();
        });
    });
      
  });