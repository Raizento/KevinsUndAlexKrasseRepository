# Slider.js

## How to use:

1. Reference Class 

```
const slider = new slider();
```
2. Use the method createSlider()
```
slider.createSlider();
```

To customize the slider pass a javascript object in the createSlider() method

```
let cnf = {width:100};
slider.createSlider(cnf);
```

## Slider options

All values are in pixels expect time, wich is in seconds. If you're using colors, treat them as strings.

- width -> width of the Slider (px)
- height -> height of the Slider (px)
- size_point -> size of the Point (px)
- padding -> dont use it (px)
- time -> the time, how fast the Slide toggles (seconds)
- off_color -> color when the slide is off (hex,rgb,htmlcolor)
- on_color -> color when the slide is on (hex,rgb,htmlcolor)
- point_color -> color of the point (hex,rgb,htmlcolor)
