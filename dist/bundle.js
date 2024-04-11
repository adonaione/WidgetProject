/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Canvas = void 0;
const Canvas_1 = __importDefault(__webpack_require__(2));
exports.Canvas = Canvas_1.default;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Canvas {
    constructor(parent) {
        this.parent = parent;
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
}
exports["default"] = Canvas;


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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
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

})();

/******/ })()
;