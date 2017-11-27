angular.module('modernBlogApp')
  .directive('deck', ['$http', '$document', '$compile', 'cacheFactory', function(
    $http,
    $document,
    $compile,
    cacheFactory) {
    'use strict';
    return {
      restrict: 'E',
      scope: {},
      controllerAs: 'deckVM',
      bindToController: true,
      controller: function($scope, $element) {
        var vm = this;

        // Do not run on small screen widths
        //================================================================================
        var widthTest = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (widthTest < 480) {
          return false;
        }

        // Initilize scope
        //================================================================================
        vm.loading    = true;
        vm.cardImgUrl = '/ms_assets/images/blank.jpg';

        // Attach mouseover to each card
        //================================================================================
        var $cards = $element.find('.deck-card');
        $cards.each(function(idx, card) {
          $(card).bind('mouseover', function(e) {
            vm.loading = true;
            _getCard(e.target.innerText);
          });
        });

        function _getCard(name) {
          if (cacheFactory.get('cardImgUrl:' + name)) {
            vm.cardImgUrl = cacheFactory.get('cardImgUrl:' + name);
            // vm.loading = false;
          } else {
            $http({
              method: 'GET',
              url: 'https://api.deckbrew.com/mtg/cards?name=' + name + '&format=modern'
            }).then(function successCallback(response) {
                var data = response.data[0];
                var editions = data.editions.filter(function(edition) {
                  return edition.multiverse_id !== 0;
                });
                vm.cardImgUrl = editions[0].image_url;
                cacheFactory.set('cardImgUrl:' + name, editions[0].image_url);
              })
              .catch(function(error) {
                console.warn(error);
              })
              .finally(function() {
                // cope.loading = false;
              });
          }
        }

      }
    };
  }]);
