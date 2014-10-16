angular.module('myApp', []);

angular.module('myApp').config([
  '$interpolateProvider', function($interpolateProvider) {
    return $interpolateProvider.startSymbol('{(').endSymbol(')}');
  }
]);

angular.module('myApp').directive('codeShowhide', [function () {
  return {
    restrict: 'A',
    replace: true,
    scope: {},
    transclude: true,
    templateUrl: '/ng_templates/showhide.html',
    link: function (scope, elem, attrs) {

      scope.collapsed = true;
      scope.headline = attrs.headline;

      scope.toggleMe = function() {
        scope.collapsed = !scope.collapsed;
      }

    }
  };
}])
