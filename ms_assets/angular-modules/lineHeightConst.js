angular.module('modernBlogApp')
  .constant('lineHeight', (function() {
    var lineHeight = null,
        content = $('p:first').html();

    if (content) {
      $('p:first').html('<span id="one-word">' + content.replace(/ /, '</span> '));
      lineHeight = $('#one-word').height();
    }

    return lineHeight;
  })());
