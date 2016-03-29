!function(){"use strict";angular.module("devApp",["ngSanitize","ngRoute","ui.ngTextRoll"])}(),function(){"use strict";function e(e,t){e.calc={operator:"add"},e.getRandomDecimal=function(e,t){return parseFloat((Math.random()*(t-e)+e).toFixed(2))},e.getRandomDate=function(){var t=parseInt(e.getRandomDecimal(1,99)),a=new Date;return a.setDate(a.getDate()+t),a},e.updateNumeric=function(){var a=e.numericValue,n=e.numericValue;switch(e.calc.operator){case"add":n+=e.calc.amount;break;case"substract":n-=e.calc.amount;break;case"multiply":n*=e.calc.amount}n=parseFloat(n.toFixed(2)),e.numericValue=n,t.runAnim(a,n)},e.numericValue=e.getRandomDecimal(.01,10.99),e.calc.amount=e.getRandomDecimal(.01,3.99),e.dateValue=e.getRandomDate()}e.$inject=["$scope","ngTextRollSvc"],angular.module("devApp").controller("MainController",e)}(),function(){"use strict";function e(e){e.when("/",{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).otherwise({redirectTo:"/"})}e.$inject=["$routeProvider"],angular.module("devApp").config(e)}(),angular.module("devApp").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="container"><h1>ngTextRoll <small>Demo Page</small></h1><ng-text-roll target="numericValue" currency="true" height="\'40px\'"></ng-text-roll><br><br><ul><li><input type="radio" ng-model="calc.operator" value="add"> Add</li><li><input type="radio" ng-model="calc.operator" value="substract"> Substract</li><li><input type="radio" ng-model="calc.operator" value="multiply"> Multiple</li></ul><button ng-click="updateNumeric()">Update [{{calc.amount}}]</button></div>')}]);