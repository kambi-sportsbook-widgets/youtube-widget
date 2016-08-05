(function () {
   'use strict';

   var YoutubeWidget = CoreLibrary.Component.subclass({
      defaultArgs: {
         // all options available: https://developers.google.com/youtube/iframe_api_reference
         origin: window.location.href,
         height: '100%',
         width: '100%',
         title: null, // title of the widget, if null uses the video title
         videoId: 'Gzewqj0yjoQ', // id of the video to show
         playerVars: {
            autoplay: 0,
            controls: 1,
            showinfo: 0
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

            if (this.scope.args.videoId == null) {
               CoreLibrary.widgetModule.removeWidget();
            }

            try {
               this.scope.args.hl = locale;
               let player = null;
               if (this.scope.args.title != null) {
                  this.scope.widgetTitle = this.scope.args.title;
               } else {
                  this.scope.args.events = {
                     onReady: () => {
                        this.scope.widgetTitle = player.getVideoData().title;
                     }
                  }
               }
               player = new window.YT.Player('youtube_player', this.scope.args);
            } catch (e) {
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
