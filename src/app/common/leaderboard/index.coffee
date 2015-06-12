angular = require('angular')
template = require('./template.html')

leaderboardDirective = [->
  restrict: 'E'
  template: template
  scope:
    competition: '='
  controller: ['$scope', '$interval', '$http', ($scope, $interval, $http) ->
    $scope.state = {
      leaderboard: []
    }
    fetch = ->
      competition = $scope.competition
      $http({
        url: "/user/competitions/#{competition}"
        method: 'GET'
      })
      .success((leaderboard) ->
        $scope.state.leaderboard = leaderboard
      )

    # fetch
    time = 5000
    $interval(() ->
      fetch();
    , time)
  ]
]

module.exports = angular.module('hacklyfe.leaderboard', [])
  .directive('hacklyfeLeaderboard', leaderboardDirective)
  .name
