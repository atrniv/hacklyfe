angular = require("angular")
_ = require('lodash')

UserCtrl = ['$scope', ($scope) ->
  # TODO
]

competition = ['$window', ($window) ->
  competition = $window.competition
  return {
    getQuestion: (id) ->
      _.find(competition.questions, {id})
  }
]

module.exports = angular.module('hacklyfe.user', [
    require('common/leaderboard')
    require('./question')
  ])
  .controller('UserCtrl', UserCtrl)
  .factory('competition', competition)
  .name


