class clickable{
constructor(el){
el.addEventListener('mousedown', e => {
console.log(el.className);
let textContainers = document.getElementsByClassName('text-container');
let container = document.querySelector('.container');
container.style.border = "";
container.className = container.className.replace(/\bactive\b/g, "");
for(let i = 0;i<textContainers.length;i++){
textContainers[i].style.border = "";
textContainers[i].className= textContainers[i].className.replace(/\bactive\b/g, "");
}
el.style.border = "2px solid black";
let ac = el.className.split(" ");
  if (ac.indexOf('active') == -1) {
    el.className += " active";
}
if (!e) var  e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
}, false)
}
}
//----------------------------
function generateRange(min, max){
	return function(val){
		return Math.min(Math.max(val, min), max);
	};
}

function isRelative(el) {
	return window.getComputedStyle(el).position === 'relative';
}

function generateMoveFn(){
	if (window.requestAnimationFrame) {
		return function(customFn){
			const move = customFn || defaultMove;

			return function (el, x, y){
				window.requestAnimationFrame(function () {
					move(el, x, y);
				});
			};
		};
	}
	return function (customFn) {
		return function (el, x, y) {
			const move = customFn || defaultMove;
			move(el, x, y);
		};
	};
}

function defaultMove(el, x, y) {
	el.style.left = x + 'px';
	el.style.top = y + 'px';
}
//--------------------------------------------------


function mousedown(e){
	const cnf = this.cnf;
	if (cnf.highlightInputs){
		const target = e.target.tagName.toLowerCase();
		if (target === 'input' || target === 'textarea'){
			return;
		}
	}

	if (e.button === 0){
		const el = this.el;
		const events = this.events;

		if (typeof cnf.onMouseDown === 'function'){
			cnf.onMouseDown(el, e);
		}


		let wOff = e.clientX - el.offsetLeft;
		let hOff = e.clientY - el.offsetTop;
		events.mousemove = mousemove.bind(this, wOff, hOff);

		document.addEventListener('mousemove', events.mousemove, false);
		document.addEventListener('mouseup', events.mouseup, false);
	}
};

function mousemove(offsetW, offsetH, e){
	const el = this.el;
	const cnf = this.cnf;
	const data = this.data;

	if (typeof cnf.onMouseMove === 'function'){
		cnf.onMouseMove(el, e);
	}

	let x = e.clientX - offsetW;
	let y = e.clientY - offsetH;

	if (cnf.constrain){

		x = data.xRange(x);
		y = data.yRange(y);
	}
	this.handleMove(el, x, y);


	e.preventDefault();
	return false;
};

function mouseup(e){
	const el = this.el;
	const cnf = this.cnf;
	const events = this.events;

	if (typeof cnf.onMouseUp === 'function'){
		cnf.onMouseUp(el, e);
	}

	document.removeEventListener('mouseup', events.mouseup, false);
	document.removeEventListener('mousemove', events.mousemove, false);
};


function touchstart(e){
	const cnf = this.cnf;
	if (cnf.highlightInputs){
		const target = e.target.tagName.toLowerCase();
		if (target === 'input' || target === 'textarea'){
			return;
		}
	}

	const el = this.el;
	const events = this.events;

	if (typeof cnf.onTouchStart === 'function'){
		cnf.onTouchStart(el, e);
	}

	const touch = e.targetTouches[0];
	let wOff = touch.clientX - el.offsetLeft;
	let hOff = touch.clientY - el.offsetTop;
	events.touchmove = touchmove.bind(this, wOff, hOff);
	this.isDragging = true;

	document.addEventListener('touchmove', events.touchmove, false);
	document.addEventListener('touchend', events.touchstop, false);
	document.addEventListener('touchcancel', events.touchstop, false);
};

function touchmove(offsetW, offsetH, e){
	const el = this.el;
	const cnf = this.cnf;
	const data = this.data;

	if (typeof cnf.onTouchMove === 'function'){
		cnf.onTouchMove(el, e);
	}

	const touch = e.targetTouches[0];
	let x = touch.clientX - offsetW;
	let y = touch.clientY - offsetH;

	if (cnf.constrain){
		x = data.xRange(x);
		y = data.yRange(y);
	}
	this.handleMove(el, x, y);

	e.preventDefault();
	return false;
};

function touchstop(e){
	this.isDragging = false;
	const el = this.el;
	const cnf = this.cnf;
	const events = this.events;

	if (typeof cnf.onTouchStop === 'function'){
		cnf.onTouchStop(el, e);
	}
	document.removeEventListener('touchmove', events.touchmove, false);
	document.removeEventListener('touchend', events.touchstop, false);
	document.removeEventListener('touchcancel', events.touchstop, false);
};

//------------------------------------------------------

const moveFn = generateMoveFn();

const config = {
	constrain: false,
	relativeTo: null,
	handle: null,
	highlightInputs: false,


	onMouseDown: null,
	onMouseMove: null,
	onMouseUp: null,
	onTouchStart: null,
	onTouchMove: null,
	onTouchStop: null,

	customMove: null
};


//MAIM CLASS

class moveable {
	constructor(el, cnf){
		if (!el){
			throw Error('Kein bewegbares Element');
		}
		this.el = el;
		this.cnf = cnf;

		// init
		setup.call(this);
	}

	reinit(){
		this.destroy();
		setup.call(this);
	}
	destroy(){
		const events = this.events;

		this.handle.removeEventListener('mousedown', events.mousedown, false);
		document.removeEventListener('mousemove', events.mousemove, false);
		document.removeEventListener('mouseup', events.mouseup, false);

		this.handle.removeEventListener('touchstart', events.touchstart, false);
		document.removeEventListener('touchmove', events.touchmove, false);
		document.removeEventListener('touchstop', events.touchstop, false);
		document.removeEventListener('touchmove', this.events.scrollFix, { passive: false });
	}
}

function setup(){
	const el = this.el;
	const cnf = this.cnf || config;
	const data = {};


	el.style.position = 'absolute';
	this.handle = cnf.handle || el;


	if (cnf.constrain){
		const relTo = cnf.relativeTo || el.parentNode;

		let traverse = el;
		let minX = 0;
		let minY = 0;
		while (traverse !== relTo){
			traverse = traverse.parentNode;
			if (isRelative(traverse)){
				minX -= traverse.offsetLeft;
				minY -= traverse.offsetTop;
			}
			if (traverse === relTo){
				minX += traverse.offsetLeft;
				minY += traverse.offsetTop;
			}
		}

		const maxX = minX + relTo.offsetWidth - el.offsetWidth;
		const maxY = minY + relTo.offsetHeight - el.offsetHeight;

		data.xRange = generateRange(minX, maxX);
		data.yRange = generateRange(minY, maxY);
	}

	this.cnf = cnf;
	this.data = data;
	this.events = {
		mousedown: mousedown.bind(this),
		mouseup: mouseup.bind(this),
		touchstart: touchstart.bind(this),
		touchstop: touchstop.bind(this),
		scrollFix: e => {
			if (this.isDragging){
				e.preventDefault();
			}
		}
	};

	this.handleMove = moveFn(this.cnf.customMove);

	this.handle.addEventListener('mousedown', this.events.mousedown, false);
	this.handle.addEventListener('touchstart', this.events.touchstart, false);
	document.addEventListener('touchmove', this.events.scrollFix, { passive: false });
}

// YEET
