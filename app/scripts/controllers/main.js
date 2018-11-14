'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('MainCtrl', ['$scope', '$filter', '$http', '$location', '$rootScope', function ($scope, $filter, $http, $location, $rootScope) {
  $scope.currentPage = 0;
  $scope.pageSize = 10;
  $scope.data = [];
  $scope.q = '';

  $scope.getData = function () {
    return $filter('filter')($scope.data, $scope.q)
  }

  $scope.numberOfPages = function () {
    return Math.ceil($scope.getData().length / $scope.pageSize);
  }
  
  $scope.redirectToDraftPage = function () {
    $location.path('/about');
  };


 

    var url = "http://www.omdbapi.com/?i=tt3896198&apikey=b990d094";

    $http.get(url).then(function (response) {
      $rootScope.otherData = response.data;
      angular.forEach(response.data, function (value, key) {
        $scope.data.push(value);
      });
     });
    

  $scope.$watch('q', function (newValue, oldValue) {
    if (oldValue != newValue) {
      $scope.currentPage = 0;
    }
  }, true);
}])
.filter('startFrom', function () {
  return function (input, start) {
    start = +start;
    return input.slice(start);
  }
});
