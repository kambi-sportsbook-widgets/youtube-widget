'use strict';

(function () {
   'use strict';

   var YoutubeWidget = CoreLibrary.Component.subclass({
      defaultArgs: {
         youtube: {
            origin: window.location.href,
            height: 450,
            width: '100%',
            title: 'Barcelona Luis Suárez',
            playerVars: {
               hl: 'en',
               autoplay: 0,
               controls: 1,
               showinfo: 0,
               listType: 'playlist',
               list: 'PLkksCTsYZQhGEDvHDfvb5BGZ3QVuQNF2C'
            }
         }
      },

      constructor: function constructor() {
         CoreLibrary.Component.apply(this, arguments);
      },
      init: function init() {
         var _this = this;

         // Set a 16/9 ratio based on iframe width plus widget header height
         var setRatio = debounce(function () {
            // Holds main container width. Needed for ratio calculation
            var mainContainerWidth = document.getElementById('main-container').offsetWidth;
            var newHeight = 9 * mainContainerWidth / 16 + 37;
            CoreLibrary.widgetModule.setWidgetHeight(newHeight);
         }, 250);

         // Inject the Youtube SDK
         var loadYoutubeApi = function loadYoutubeApi() {
            var tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
         };
         // Creat a listener for window resize in order to resize the widget height
         window.onresize = setRatio;

         // Load the youtube api framework
         loadYoutubeApi();

         /**
          * Debounce function for resizing window
          */
         function debounce(func, wait, immediate) {
            var timeout;
            return function () {
               var context = this,
                   args = arguments;
               clearTimeout(timeout);
               timeout = setTimeout(function () {
                  timeout = null;
                  if (!immediate) {
                     func.apply(context, args);
                  }
               }, wait);
               if (immediate && !timeout) {
                  func.apply(context, args);
               }
            };
         }

         // This runs when the Youtube API framework has loaded
         window.onYouTubeIframeAPIReady = function () {
            // Set initial width
            setRatio();
            // Get locale
            var locale = CoreLibrary.config.clientConfig.locale.replace('_', '-');

            if (_this.scope.args.youtube) {
               // Set locale
               var playerVars = Object.assign(_this.scope.args.youtube, { hl: locale });
               var youtubeArgs = Object.assign(_this.scope.args.youtube, playerVars);
               _this.scope.widgetTitle = _this.scope.args.youtube.title;
               // Load player
               var player = new YT.Player('youtube_player', youtubeArgs);
            } else {
               // Remove widget if config fails
               CoreLibrary.widgetModule.removeWidget();
            }
         };
      }
   });

   var youtubeWidget = new YoutubeWidget({
      rootElement: 'html'
   });
})();
//# sourceMappingURL=app.js.map
