angular = require("angular")

RegisterCtrl = ['$scope', '$http', '$window', ($scope, $http, $window) ->
  $scope.register = (username, password) ->
    $http({
      url:'/user/register'
      method: 'POST'
      data: {username, password}
    })
    .success(() ->
      $window.location.reload()
    )
]

module.exports = angular.module('hacklyfe.register', [])
  .controller('RegisterCtrl', RegisterCtrl)
  .name

