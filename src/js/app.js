(function () {
   'use strict';

   var YoutubeWidget = CoreLibrary.Component.subclass({
      defaultArgs: {
         youtube: {
            origin: window.location.href,
            height: '100%',
            width: '100%',
            title: 'UEFA EURO 2016',
            playerVars: {
               hl: 'en',
               autoplay: 0,
               controls: 1,
               showinfo: 0,
               listType: 'playlist',
               list: 'PLkksCTsYZQhFI3Niv9mtpEiRX6XZDy6El'
            }
         }
      },

      constructor () {
         CoreLibrary.Component.apply(this, arguments);
      },

      init () {

         // Inject the Youtube SDK
         var loadYoutubeApi = () => {
            let tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
         };

         // Load the youtube api framework
         loadYoutubeApi();

         // Set a 16/9 ratio based on iframe width plus widget header height
         var setRatio = debounce(function () {
            // Holds main container width. Needed for ratio calculation
            var mainContainerWidth = document.getElementById('main-container').offsetWidth;
            let newHeight = ((9 / 16) * mainContainerWidth) + 37;
            CoreLibrary.widgetModule.adaptWidgetHeight(newHeight);
         }, 250);

         // Create a listener for window resize in order to resize the widget height
         window.onresize = setRatio;

         // This runs when the Youtube API framework has loaded
         window.onYouTubeIframeAPIReady = () => {
            // Set initial width
            setRatio();
            // Get locale
            let locale = CoreLibrary.config.locale.replace('_', '-');

            if ( this.scope.args.youtube ) {
               // Set locale
               let playerVars = Object.assign(this.scope.args.youtube, { hl: locale });
               let youtubeArgs = Object.assign(this.scope.args.youtube, playerVars);
               this.scope.widgetTitle = this.scope.args.youtube.title;
               // Load player
               let player = new window.YT.Player('youtube_player', youtubeArgs);
            } else {
               // Remove widget if config fails
               CoreLibrary.widgetModule.removeWidget();
            }
         };

         /**
          * Debounce function for resizing window
          */
         function debounce ( func, wait, immediate ) {
            var timeout;
            return function () {
               var context = this,
                  args = arguments;
               clearTimeout(timeout);
               timeout = setTimeout(function () {
                  timeout = null;
                  if ( !immediate ) {
                     func.apply(context, args);
                  }
               }, wait);
               if ( immediate && !timeout ) {
                  func.apply(context, args);
               }
            };
         }

      }

   });

   var youtubeWidget = new YoutubeWidget({
      rootElement: 'html'
   });
})();
