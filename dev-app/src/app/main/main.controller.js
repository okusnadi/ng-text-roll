(function() {
  'use strict';

  angular
    .module('devApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {

    $scope.calc = {
      operator: 'add'
    };

    $scope.getRandomDecimal = function(min, max) {
      return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    };

    $scope.getRandomDate = function() {
      var inc = parseInt($scope.getRandomDecimal(1,99));
      var date = new Date();
      date.setDate(date.getDate() + inc);
      return date;
    };

    $scope.updateNumeric = function() {
      var val = $scope.numericValue || 1;
      var delta = $scope.calc.amount || 0;
      switch ($scope.calc.operator) {
        case 'add':
          val += delta;
          break;
        case 'substract':
          val -= delta;
          break;
        case 'multiply':
          val *= delta;
          break;
        default:
          break;
      }
      val = parseFloat(val.toFixed(2));
      $scope.numericValue = val;
    };

    $scope.numericValue = $scope.getRandomDecimal(0.01, 10.99);
    $scope.calc.amount = $scope.getRandomDecimal(0.01, 3.99);
    $scope.dateValue = $scope.getRandomDate();

  }

})();