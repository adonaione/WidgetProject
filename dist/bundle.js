/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Component = exports.Canvas = void 0;
const Canvas_1 = __importDefault(__webpack_require__(2));
exports.Canvas = Canvas_1.default;
const Component_1 = __importDefault(__webpack_require__(3));
exports.Component = Component_1.default;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class Canvas {
    constructor(parent, _components = []) {
        this.parent = parent;
        this._components = _components;
        this.parent.innerHTML = '';
        this.parent.id = 'canvas';
        const newStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'repeat(12, 1fr)',
            height: '100vh',
            columnGap: '5px',
            rowGap: '5px',
            aspectRatio: '1 / 1'
        };
        Object.assign(this.parent.style, newStyle);
    }
    get components() {
        return this._components;
    }
    addComponent(component) {
        // Add the component to the canvas's components array
        this.components.push(component);
        // Set the component's canvas property to this canvas
        component.canvas = this;
        // Render the components
        this.render();
    }
    render() {
        // clear the current canvas,
        this.parent.innerHTML = '';
        // loop through each component, build and place
        for (let component of this.components) {
            let div = this.initializeComponentDiv(component);
            this.placeComponent(component, div);
        }
    }
    initializeComponentDiv(component) {
        let div = document.createElement('div');
        div.id = component.id;
        const newStyle = {
            margin: 'auto',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            padding: '3%',
            aspectRatio: '1 / 1'
        };
        // Set the div styling
        Object.assign(div.style, newStyle);
        // Set up the shape for the component
        Object.assign(div.style, component.shape.attributes);
        return div;
    }
    placeComponent(component, div) {
        const newStyle = {
            gridColumnStart: component.locationLeft.toString(),
            gridColumnEnd: 'span ' + component.width,
            gridRowStart: component.locationTop.toString(),
            gridRowEnd: 'span ' + component.height
        };
        Object.assign(div.style, newStyle);
        this.parent.append(div);
    }
}
exports["default"] = Canvas;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const uuid_1 = __webpack_require__(4);
const containers_1 = __webpack_require__(9);
class Component {
    constructor(_id = (0, uuid_1.v4)(), _width = 2, _height = 2, _locationTop = 1, _locationLeft = 1, _content = '<div></div>', _shape = new containers_1.LeftLeaningContainer(), _canvas) {
        this._id = _id;
        this._width = _width;
        this._height = _height;
        this._locationTop = _locationTop;
        this._locationLeft = _locationLeft;
        this._content = _content;
        this._shape = _shape;
        this._canvas = _canvas;
    }
    get canvas() {
        return this._canvas;
    }
    set canvas(value) {
        this._canvas = value;
    }
    get content() {
        return this._content;
    }
    set content(value) {
        this._content = value;
    }
    get locationLeft() {
        return this._locationLeft;
    }
    set locationLeft(value) {
        this._locationLeft = value;
    }
    get locationTop() {
        return this._locationTop;
    }
    set locationTop(value) {
        this._locationTop = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get id() {
        return this._id;
    }
    get shape() {
        return this._shape;
    }
    set shape(value) {
        this._shape = value;
    }
}
exports["default"] = Component;


/***/ }),
/* 4 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var v1 = __webpack_require__(5);
var v4 = __webpack_require__(8);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(6);
var bytesToUuid = __webpack_require__(7);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 6 */
/***/ ((module) => {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),
/* 7 */
/***/ ((module) => {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),
/* 8 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(6);
var bytesToUuid = __webpack_require__(7);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RightLeaningContainer = exports.LeftLeaningContainer = void 0;
const Container_1 = __importDefault(__webpack_require__(10));
class LeftLeaningContainer extends Container_1.default {
    constructor() {
        super();
        this.borderRadius = '10% 25%';
    }
}
exports.LeftLeaningContainer = LeftLeaningContainer;
class RightLeaningContainer extends Container_1.default {
    constructor() {
        super();
        this.borderRadius = '25% 10%';
    }
}
exports.RightLeaningContainer = RightLeaningContainer;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class Container {
    //this class sets up the container
    constructor(_backgroundColor = 'white', _borderColor = 'black', _borderRadius = '0px', _borderWidth = '1px', _borderStyle = 'solid', _zIndex = 0) {
        this._backgroundColor = _backgroundColor;
        this._borderColor = _borderColor;
        this._borderRadius = _borderRadius;
        this._borderWidth = _borderWidth;
        this._borderStyle = _borderStyle;
        this._zIndex = _zIndex;
    }
    get attributes() {
        return {
            backgroundColor: this._backgroundColor,
            borderColor: this._borderColor,
            borderRadius: this._borderRadius,
            borderWidth: this._borderWidth,
            borderStyle: this._borderStyle,
            zIndex: this._zIndex
        };
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
    }
    get borderColor() {
        return this._borderColor;
    }
    set borderColor(value) {
        this._borderColor = value;
    }
    get borderRadius() {
        return this._borderRadius;
    }
    set borderRadius(value) {
        this._borderRadius = value;
    }
    get borderWidth() {
        return this._borderWidth;
    }
    set borderWidth(value) {
        this._borderWidth = value;
    }
    get borderStyle() {
        return this._borderStyle;
    }
    set borderStyle(value) {
        this._borderStyle = value;
    }
    get zIndex() {
        return this._zIndex;
    }
    set zIndex(value) {
        this._zIndex = value;
    }
}
exports["default"] = Container;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

// console.log('Hello World!');
// console.log('Log another line');
Object.defineProperty(exports, "__esModule", ({ value: true }));
// function sayHello(name:string){
//     console.log('Hello ' + name + '!')
// }
// sayHello('Adonai');
// to apply changes you need to run webpack again to re-bundle everything
// unless you set up scripts in package.json to do it for you
const widget_1 = __webpack_require__(1);
const canvas = new widget_1.Canvas(document.body);
console.log(canvas);
const firstComponent = new widget_1.Component();
console.log(firstComponent);
console.log(firstComponent.shape);
console.log(firstComponent.shape.attributes);
firstComponent.height = 4;
firstComponent.width = 4;
firstComponent.locationLeft = 3;
firstComponent.shape.backgroundColor = 'red';
firstComponent.shape.borderStyle = 'dashed';
firstComponent.shape.borderWidth = '5px';
canvas.addComponent(firstComponent);
const secondComponent = new widget_1.Component();
secondComponent.locationLeft = 4;
secondComponent.locationTop = 2;
secondComponent.shape.zIndex = 1;
canvas.addComponent(secondComponent);

})();

/******/ })()
;