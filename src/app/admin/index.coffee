angular = require("angular")

AdminService = ['$http', ($http) ->
  startCompetition: () ->
    $http({
      url: '/admin/start'
      method: 'POST'
    })

  stopCompetition: () ->
    $http({
      url: '/admin/stop'
      method: 'POST'
    })
]

AdminCtrl = ['AdminService', (AdminService) ->
  $scope.start = () ->
    AdminService.startCompetition()
      .then(() ->
        alert('competion')
      )

]

module.exports = angular.module('hacklyfe.admin', [
    require('common/leaderboard')
  ])
  .controller('AdminCtrl', AdminCtrl)
  .controller('adminService', )
  .name

