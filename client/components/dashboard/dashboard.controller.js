'use strict';

angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    
    $scope.options = ["pespi","Coca-Cola"];
    
    $scope.addOption = function(){
      var placehoder = "New Option";
      $scope.options.push(placehoder);
    };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });