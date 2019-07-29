class slider{
constructor(){
this.cnf = {
height: 50,
width : 100,
size_point : 50,
padding: 0,
time : .4,
off_color : '#4EBF5F',
on_color : '#69FF7F',
point_color : '#FFFFFF' 
}
}

_init(){
let style = document.createElement('style');
let cnf = this.cnf;
style.innerHTML ='*{padding:0;margin:0;box-sizing:border-box}.switch {position : relative;display : inline-block;width:'+cnf.width+'px;height:'+cnf.height+'px;}.slider{position:absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;border-radius:'+cnf.height+'px;background-color:'+cnf.off_color+';-webkit-transition:'+cnf.time+'s;transition:'+cnf.time+'s;}.slider:before{position:absolute;content: "";height:'+cnf.size_point+'px;width:'+cnf.size_point+'px;left:'+cnf.padding+'px;bottom:'+cnf.padding+'px;border-radius : 50%;background-color:'+cnf.point_color+';-webkit-transition: '+cnf.time+'s;transition: '+cnf.time+'s;}.slider-on {background-color:'+cnf.on_color+'}.slider-on:before {-webkit-transform: translateX('+(cnf.height-cnf.size_point)+'px);-ms-transform: translateX('+(cnf.width-cnf.size_point)+'px);transform: translateX('+(cnf.width-cnf.size_point-cnf.padding)+'px);}';
document.querySelector('head').append(style);
}
_setConfig(ocnf){
if(ocnf.height !== undefined){this.cnf.height = ocnf.height}
if(ocnf.width !== undefined){this.cnf.width = ocnf.width}
if(ocnf.size_point !== undefined){this.cnf.size_point = ocnf.size_point}
if(ocnf.padding !== undefined){this.cnf.padding = ocnf.padding}
if(ocnf.time !== undefined){this.cnf.time = ocnf.time}
if(ocnf.off_color !== undefined){this.cnf.off_color = ocnf.off_color}
if(ocnf.on_color !== undefined){this.cnf.on_color = ocnf.on_color}
if(ocnf.point_color !== undefined){this.cnf.point_color = ocnf.point_color}
}
createSlider(ocnf){
this._setConfig(ocnf);
this._init();
let l = document.createElement('label');
let s = document.createElement('span');
l.append(s);
l.classList.add('switch');
s.classList.add('slider');
s.addEventListener('click', e=> {
if(s.classList.contains('slider-on')){
s.classList.remove('slider-on');
}
else{
s.classList.add('slider-on');
}
}, false);
return l;
}
}
