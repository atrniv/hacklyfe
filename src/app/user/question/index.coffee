angular = require('angular')
template = require('./template.html')
_ = require('lodash')

questions = ['$window', ($window) ->
  list = $window.competition.questions
  return {
    get: (id) ->
      _.find(list, {id})
  }
]

questionPanel = [->
  restrict: 'E'
  template: template
  scope:
    questions: '='
  controller: ['$scope', '$http', 'competition', ($scope, $http, competition) ->
    $scope.state = {
      active_question: competition.getQuestion(0)
    }
    $scope.submit = (solution, question_id) ->
      $http({
        url: '/user/submit'
        method: 'POST'
        data: {solution, question: question_id}
      })
  ]
]

module.exports = angular.module('hacklyfe.question', [])
  .directive('hacklyfeQuestionPanel', questionPanel)
  .factory('questions', questions)
  .name
