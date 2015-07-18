'use strict';

angular.module('workspaceApp')
// Service
    .factory('Poll', ['$http', function($http){
      return $http.get('/polls');
    }]);
  //.factory('Poll', function Poll($location, $rootScope, $http, User, $cookieStore, $q) {
    /*var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {*/
      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      /*createPoll: function(poll, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      }
    };
  });*/
