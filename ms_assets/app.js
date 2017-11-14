angular.module('myApp', [])
  .config([
    '$interpolateProvider', function($interpolateProvider, $compileProvider) {
      return $interpolateProvider.startSymbol('{(').endSymbol(')}');
    }
  ])

  .directive('codeShowhide', function () {
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
  })

  .directive('showcard', function ($document, $compile) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        var cardClassName       = 'card',
            cardActiveClassName = 'card-show';
        scope.cardClass         = [cardClassName];
        scope.text              = attrs.showcard;

        var card = $compile('<div ng-class="cardClass"><span ng-bind="text"><span><div class="card-arrow"></div></div>')(scope);


        if (attrs.cardPosition) {
          scope.cardClass.push('card-' + attrs.cardPosition);
        } else {
          scope.cardClass.push('card-down');
        }

        $document.find('body').append(card);

        element.bind('mouseover', function(e) {
          card.addClass(cardActiveClassName);

          var pos        = e.target.getBoundingClientRect(),
              offset     = card.offset(),
              cardHeight = card.outerHeight(),
              cardWidth  = card.outerWidth(),
              elWidth    = pos.width || pos.right - pos.left,
              elHeight   = pos.height || pos.bottom - pos.top,
              cardOffset = 10;

          if(card.hasClass('card-right')) {
            offset.top = pos.top - (cardHeight / 2) + (elHeight / 2);
            offset.left = pos.right + cardOffset;
          }
          else if(card.hasClass('card-left')) {
            offset.top = pos.top - (cardHeight / 2) + (elHeight / 2);
            offset.left = pos.left - cardWidth - cardOffset;
          }
          else if(card.hasClass('card-down')) {
            offset.top = pos.top + elHeight + cardOffset;
            offset.left = pos.left - (cardWidth / 2) + (elWidth / 2);
          }
          else {
            offset.top = pos.top - cardHeight - cardOffset;
            offset.left = pos.left - (cardWidth / 2) + (elWidth / 2);
          }

          card.offset(offset);
        });

        element.bind('mouseout', function() {
          card.removeClass(cardActiveClassName);
        });

        card.bind('mouseover', function() {
          card.addClass(cardActiveClassName);
        });

        card.bind('mouseout', function() {
          card.removeClass(cardActiveClassName);
        });
      }
    };
  });
