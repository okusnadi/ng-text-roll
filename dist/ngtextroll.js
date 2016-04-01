(function() {

  'use strict';

  /**
   * @ngdoc component
   * @name ui.ng-text-roll.directive:ngTextRoll
   * @description
   * # ngTextRoll
   */

  angular.module('ui.ngTextRoll', ['ui.ngTextRoll.template'])
    .factory('ngTextRollSvc', function($timeout, $filter) {
      var svc = {};

      // local vars
      svc.current = 0;
      svc.render = [{}, {}];
      // Constants
      svc.zero = '0';

      svc.init = function(height, target, currency) {
        svc.height = height;
        svc.currency = currency;
        svc.intHeight = parseFloat(svc.height);
        svc.unitHeight = svc.height.replace(svc.intHeight, '');
        svc.offset = svc.intHeight * 0.17;
        svc.topAbove = ((svc.intHeight + svc.offset) * -1) + svc.unitHeight;
        svc.topBelow = (svc.intHeight + svc.offset) + svc.unitHeight;
        // set initial render
        svc.render[svc.current].style = {
          'top': svc.zero
        };
        svc.render[svc.current].target = svc.targetArray(target);
      };

      svc.targetArray = function(target) {
        return svc.currency ? $filter('currency')(target) : String(target);
      };

      svc.next = function() {
        svc.current = (svc.current === 0 ? 1 : 0);
      };

      svc.randDec = function(min, max) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
      };

      svc.trans = function() {
        return 'top '.concat(svc.randDec(0.3, 0.8), 's ease-in-out');
      };

      svc.animSetup = function(oldVal, newVal, pos) {
        svc.render[svc.current].target = svc.targetArray(newVal);
        svc.render[svc.current].style = [];
        angular.forEach(svc.render[svc.current].target, function() {
          svc.render[svc.current].style.push({
            '-webkit-transition': undefined,
            '-moz-transition': undefined,
            'transition': undefined,
            'top': pos ? svc.topBelow : svc.topAbove
          });
        });

        var inx = svc.current === 0 ? 1 : 0;
        svc.render[inx].target = svc.targetArray(oldVal);
        svc.render[inx].style = [];
        angular.forEach(svc.render[inx].target, function() {
          svc.render[inx].style.push({
            '-webkit-transition': undefined,
            '-moz-transition': undefined,
            'transition': undefined,
            'top': svc.zero
          });
        });

      };

      svc.animate = function(pos) {
        angular.forEach(svc.render[svc.current].style, function(s) {
          var trans = svc.trans();
          s['-webkit-transition'] = trans;
          s['-moz-transition'] = trans;
          s.transition = trans;
          s.top = svc.zero;
        });

        var inx = svc.current === 0 ? 1 : 0;
        angular.forEach(svc.render[inx].style, function(s) {
          var trans = svc.trans();
          s['-webkit-transition'] = trans;
          s['-moz-transition'] = trans;
          s.transition = trans;
          s.top = pos ? svc.topAbove : svc.topBelow;
        });
      };

      svc.runAnim = function(oldVal, newVal) {
        var pos = newVal > oldVal;
        svc.next();
        svc.animSetup(oldVal, newVal, pos);
        svc.t = $timeout(svc.animate, 25, true, pos);
      };

      svc.clearTimeout = function() { // clean up timer
        $timeout.cancel(svc.t);
      };

      return svc;
    })
    .component('ngTextRoll', {
      templateUrl: 'template/ngtextroll.html',
      bindings: {
        target: '=',
        currency: '<',
        height: '<'
      },
      controller: function($timeout, ngTextRollSvc) {
        var ctrl = this;

        ctrl.$onInit = function() {
          ctrl.svc = ngTextRollSvc; // simplify bindings
          ctrl.svc.init(ctrl.height, ctrl.target, this.currency);
        };

        ctrl.$onDestroy = function() { // clean up timer
          ctrl.svc.clearTimeout();
        };

      }
    });

  // template:js
  angular.module("ui.ngTextRoll.template", []).run(["$templateCache", function($templateCache) {$templateCache.put("template/ngtextroll.html","<div class=\"ng-text-roll\" ng-style=\"{\'font-size\' : $ctrl.height }\">\n  <div class=\"ng-text-roll-container\">\n    <div style=\"position: relative;\" ng-repeat=\"pChar in $ctrl.svc.render[$ctrl.svc.current].target track by $index\">\n      <div class=\"ng-text-roll-char\" ng-style=\"$ctrl.svc.render[0].style[$index]\">{{$ctrl.svc.render[0].target[$index]}}</div>\n      <div class=\"ng-text-roll-char\" ng-style=\"$ctrl.svc.render[1].style[$index]\">{{$ctrl.svc.render[1].target[$index]}}</div>\n      {{pChar}}\n    </div>\n  </div>\n</div>\n");}]);
  // endinject

})();
