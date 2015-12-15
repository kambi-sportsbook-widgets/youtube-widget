# youtube-widget
A youtube widget to display a playlist player via widget settings configuration

## Configuration example:

__`client-widgets.js`__

```json

...
{
    "order": 1,
    "widgetId": "Youtube Manchester playlist",
    "args": {
        "youtube" : {
            playerVars: {
                autoplay: 0,
                controls: 1,
                listType: 'playlist',
                list: 'PLFC6EDC1132AFE0FA'
            }
        }
    }
},
...

```

### The configuration object must contain the key 'youtube', which in turn must hold the following keys, values:
1. `playerVars` holds the player configuration
    - `autoplay` This parameter specifies whether the initial video will automatically start to play when the player loads. Supported values are 0 or 1. The default value is 0.
    - `controls` This parameter indicates whether the video player controls are displayed. Values: 0, 1 or 2
    - `listType` The listType parameter, in conjunction with the list parameter, identifies the content that will load in the player. Valid parameter values are `playlist`, `search`, and `user_uploads`.
    - `list` The list parameter, in conjunction with the listType parameter, identifies the content that will load in the player.
        - If the listType parameter value is `search`, then the list parameter value specifies the search query.
        - If the listType parameter value is `user_uploads`, then the list parameter value identifies the YouTube channel whose uploaded videos will be loaded.
        - If the listType parameter value is `playlist`, then the list parameter value specifies a YouTube playlist ID.
2. `height` by default this is set to widget's height minus 50px
3. `width` by default is set to 100%

For more information on Youtube embeded Player, refer to https://developers.google.com/youtube/iframe_api_reference

