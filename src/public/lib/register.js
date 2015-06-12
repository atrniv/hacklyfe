webpackJsonp([0],[
/* 0 */
/*!*******************************!*\
  !*** ./register/index.coffee ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var RegisterCtrl, angular;

	angular = __webpack_require__(/*! angular */ 1);

	RegisterCtrl = [
	  '$scope', '$http', '$window', function($scope, $http, $window) {
	    return $scope.register = function(username, password) {
	      return $http({
	        url: '/user/register',
	        method: 'POST',
	        data: {
	          username: username,
	          password: password
	        }
	      }).success(function() {
	        return $window.location.reload();
	      });
	    };
	  }
	];

	module.exports = angular.module('hacklyfe.register', []).controller('RegisterCtrl', RegisterCtrl).name;


/***/ }
]);