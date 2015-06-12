webpackJsonp([1],{

/***/ 0:
/*!****************************!*\
  !*** ./admin/index.coffee ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var AdminCtrl, AdminService, angular;

	angular = __webpack_require__(/*! angular */ 1);

	AdminService = [
	  '$http', function($http) {
	    return {
	      startCompetition: function() {
	        return $http({
	          url: '/admin/start',
	          method: 'POST'
	        });
	      },
	      stopCompetition: function() {
	        return $http({
	          url: '/admin/stop',
	          method: 'POST'
	        });
	      }
	    };
	  }
	];

	AdminCtrl = [
	  'AdminService', function(AdminService) {
	    return $scope.start = function() {
	      return AdminService.startCompetition().then(function() {
	        return alert('competion');
	      });
	    };
	  }
	];

	module.exports = angular.module('hacklyfe.admin', [__webpack_require__(/*! common/leaderboard */ 7)]).controller('AdminCtrl', AdminCtrl).controller('adminService').name;


/***/ },

/***/ 7:
/*!*****************************************!*\
  !*** ./common/leaderboard/index.coffee ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var angular, leaderboardDirective, template;

	angular = __webpack_require__(/*! angular */ 1);

	template = __webpack_require__(/*! ./template.html */ 8);

	leaderboardDirective = [
	  function() {
	    return {
	      restrict: 'E',
	      template: template,
	      scope: {
	        competition: '='
	      },
	      controller: [
	        '$scope', '$interval', '$http', function($scope, $interval, $http) {
	          var fetch, time;
	          $scope.state = {
	            leaderboard: []
	          };
	          fetch = function() {
	            var competition;
	            competition = $scope.competition;
	            return $http({
	              url: "/user/competitions/" + competition,
	              method: 'GET'
	            }).success(function(leaderboard) {
	              return $scope.state.leaderboard = leaderboard;
	            });
	          };
	          time = 5000;
	          return $interval(function() {
	            return fetch();
	          }, time);
	        }
	      ]
	    };
	  }
	];

	module.exports = angular.module('hacklyfe.leaderboard', []).directive('hacklyfeLeaderboard', leaderboardDirective).name;


/***/ },

/***/ 8:
/*!******************************************!*\
  !*** ./common/leaderboard/template.html ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"leaderboard-wrapper\">\n  <header class=\"leaderboard-header\">Top Hackers</header>\n  <ul class=\"leaderboard-list\" data-ng-repeat=\"player in state.leaderboard\">\n    <li class=\"leaderboard-item top\">\n      <div class=\"avatar\"></div>\n      <div class=\"name\">{{player.alias}}</div>\n      <div class=\"score\">{{player.score}}</div>\n    </li>\n  </ul>\n</div>\n"

/***/ }

});