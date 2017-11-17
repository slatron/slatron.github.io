angular.module('modernBlogApp')
  .directive('showcard', ['$http', '$document', '$compile', 'cacheFactory', 'lineHeight', function(
    $http,
    $document,
    $compile,
    cacheFactory,
    lineHeight) {
    'use strict';
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {

        // Do not run on small screen widths
        //================================================================================
        var widthTest = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (widthTest < 480) {
          return false;
        }

        // Initilize scope
        //================================================================================
        var cardActiveClassName = 'card-show';

        scope.text              = attrs.showcard || element[0].innerText;
        scope.cardLoaded        = false;
        scope.cardImgUrl        = '/ms_assets/images/blank.jpg';
        scope.cardUrl           = undefined;

        // GET card img URL from API
        //================================================================================
        if (cacheFactory.get('cardImgUrl:' + scope.text)) {
          scope.cardImgUrl = cacheFactory.get('cardImgUrl:' + scope.text);
          scope.cardUrl    = cacheFactory.get('cardUrl:' + scope.text);
          scope.cardLoaded = true;
        } else {
          $http({
            method: 'GET',
            url: 'https://api.deckbrew.com/mtg/cards?name=' + scope.text + '&format=modern'
          }).then(function successCallback(response) {
              var data = response.data[0];
              var editions = data.editions.filter(function(edition) {
                return edition.multiverse_id !== 0;
              });
              scope.cardImgUrl = editions[0].image_url;
              scope.cardUrl    = editions[0].store_url;
              cacheFactory.set('cardImgUrl:' + scope.text, editions[0].image_url);
              cacheFactory.set('cardUrl:' + scope.text, editions[0].store_url);
            })
            .catch(function(error) {
              console.warn(error);
              scope.cardUrl    = '/';
            })
            .finally(function() {
              scope.cardLoaded = true;
            });
        }
        // Generate card HTML and add to DOM
        //================================================================================
        var template =
          '<div class="card">' +
            '<img ng-src="{{cardImgUrl}}">' +
            '<span ng-if="!cardLoaded">Loading <span ng-bind="text"></span> Image</span>' +
            '<div class="card-arrow"></div>' +
          '</div>';
        var card = $compile(template)(scope);
        element.addClass('card-text-link'); // styling link
        $document.find('body').append(card);

        // Bind click event to open card
        //================================================================================
        element.bind('click', function(e) {
          window.location = scope.cardUrl;
        });

        // Bind mouseover event to display card next to text
        //================================================================================
        element.bind('mouseover', function(e) {
          // Determine if text is on right or left side of screen for card placement
          var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
          var textWidth   = element.innerWidth();
          var textOffset  = element.offset();
          var leftSide    = windowWidth/2 > (textOffset.left + (textWidth/2));
          var wrappedText = element.height() > lineHeight;

          if (wrappedText) {
            card.addClass('card-up');
          } else if (leftSide) {
            card.addClass('card-right');
          } else { // rightSide
            card.addClass('card-left');
          }
          card.addClass(cardActiveClassName);

          // Set position for card next to text
          var pos        = e.target.getBoundingClientRect(),
              offset     = card.offset(),
              cardHeight = card.outerHeight(),
              cardWidth  = card.outerWidth(),
              elWidth    = pos.width || pos.right - pos.left,
              elHeight   = pos.height || pos.bottom - pos.top,
              cardOffset = 10,
              scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

          if (card.hasClass('card-right')) {
            offset.top = pos.top - (cardHeight / 2) + (elHeight / 2) + scrollTop;
            offset.left = pos.right + cardOffset;
          }  else if (card.hasClass('card-up')) {
            offset.top = pos.top - cardHeight - cardOffset + scrollTop;
            offset.left = leftSide ? e.clientX - (7 * cardOffset) : e.clientX + (9 * cardOffset);
          } else { // card-left
            offset.top = pos.top - (cardHeight / 2) + (elHeight / 2) + scrollTop;
            offset.left = pos.left - cardWidth - cardOffset;
          }

          card.offset(offset);
        });

        // Bind mouseout event to remove card image
        //================================================================================
        element.bind('mouseout', function() {
          card.removeClass(cardActiveClassName);
          card.removeClass('card-left').removeClass('card-right');
        });
      }
    };
  }]);
