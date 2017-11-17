angular.module('modernBlogApp')
  .directive('showhide', function () {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        headline: '@'
      },
      transclude: true,
      templateUrl: '/ng_templates/showhide.html',
      link: function (scope, elem, attrs) {
        scope.collapsed = true;
        scope.toggleMe = function() {
          scope.collapsed = !scope.collapsed;
        };
      }
    };
  });
