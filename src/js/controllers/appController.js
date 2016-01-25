(function () {

   'use strict';

   function appController( $scope, $controller ) {

      // Extend the core controller that takes care of basic setup and common functions
      angular.extend(appController, $controller('widgetCoreController', {
         '$scope': $scope
      }));

      $scope.defaultHeight = 450;

      var player;

      function loadYoutubeApi() {
         var tag = document.createElement('script');

         tag.src = 'https://www.youtube.com/iframe_api';
         var firstScriptTag = document.getElementsByTagName('script')[0];
         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      /**
       * This runs when the Youtube API framework has loaded
       */
      window.onYouTubeIframeAPIReady = function () {

         // Call the init method in the coreWidgetController so that we setup everything using our overridden values
         // The init-method returns a promise that resolves when all of the configurations are set, for instance the $scope.args variables
         // so we can call our methods that require parameters from the widget settings after the init method is called
         $scope.init().then(function () {

            $scope.locale = $scope.getConfigValue('locale').replace('_', '-');

            var defaultYoutubeArgs = {
               origin: window.location.href,
               height: $scope.defaultHeight - 37,
               width: '100%',
               title: 'Manchester United Playlist',
               playerVars: {
                  hl: $scope.locale,
                  autoplay: 0,
                  controls: 1,
                  listType: 'playlist',
                  list: 'PLFC6EDC1132AFE0FA'
               }
            }, youtubeArgs;

            youtubeArgs = angular.merge(defaultYoutubeArgs, $scope.args.youtube);

            $scope.title = youtubeArgs.title;

            player = new YT.Player('youtube_player', youtubeArgs);
         });
      };

      /**
       * Load the youtube api framework
       */
      loadYoutubeApi();
   }

   (function ( $app ) {
      return $app.controller('appController', ['$scope', '$controller', appController]);
   })(angular.module('youtubeWidget'));

}).call(this);
