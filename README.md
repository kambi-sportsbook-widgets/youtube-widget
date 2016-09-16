# youtube-widget


![](https://github.com/kambi-sportsbook-widgets/youtube-widget/blob/master/screenshot.jpg?raw=true)

A widget to display an embedded youtube playlist or individual embedded youtube video

This is a C-widget that means that it is not provided by Kambi directly, instead the operators that want to use this need to build and host the widget themselves. Please see Build Instructions.

## Configuration

Arguments and default values:
```json
{
    "videoId": "M7lc1UVf-VE",
    "title": null,
    "playerVars": {
        "autoplay": 0,
        "controls": 1,
        "showinfo": 0
    }
}
```

### The configuration object must contain the key 'youtube', which in turn must hold the following keys, values:

1. videoId - string - (optional) can be added to target a specific youtube video. It has to be the youtube video id and it should not be used with the `listType` and `list` parameters
2. title - string - if undefined will use the video title
3. playerVars - object - holds the player configuration
    - autoplay - integer - Specifies whether the initial video will automatically start to play when the player loads. Supported values are 0 or 1.
    - controls - integer - Indicates whether the video player controls are displayed. Values: 0, 1 or 2
    - showinfo - integer - Indicates if it should show information about the video before playing (video title and uploader). Values: 0 or 1


For more information of all values possible in playerVars see:

https://developers.google.com/youtube/player_parameters?playerVersion=HTML5


### Build Instructions

Please refer to the [core-library](https://github.com/kambi-sportsbook-widgets/widget-core-library)
