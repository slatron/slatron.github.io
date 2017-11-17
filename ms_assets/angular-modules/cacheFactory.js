angular.module('modernBlogApp')
  .factory('cacheFactory', function() {
    var pageCache = {},
        methods   = {},
        available = false;

    // Store value to cache and localstorage
    methods.set = function(key, value) {
      if (typeof(key) === 'string') {
        if (typeof(value) !== 'string') {
          value = angular.toJson(value);
        }
        pageCache[key] = value;
        if (available) {
          localStorage.setItem(key, value);
        }
      }
    };

    methods.get = function(key) {
      if (available && localStorage.getItem(key)) {
        return localStorage.getItem(key);
      } else if (pageCache[key]) {
        return pageCache[key];
      } else {
        return null;
      }
    };

    methods.removeFromLocalStorage = function(key) {
      delete pageCache[key];
      if (available) {
        localStorage.removeItem(key);
      }
    };

    methods.clearLocalStorage = function() {
      pageCache = {};
      if (available) {
        localStorage.clear();
      }
    };

    methods.storageAvailable = function() {
      try {
        var x = 'storage_test';
        localStorage.setItem(x, x);
        localStorage.removeItem(x);
        return true;
      }
      catch (e) {
        return false;
      }
    };
    available = methods.storageAvailable();
    return methods;
  });
