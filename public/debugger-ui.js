/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@ethicdevs/json-tree-view/dist/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ethicdevs/json-tree-view/dist/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderJSONTreeView": () => (/* binding */ renderJSONTreeView)
/* harmony export */ });
/**
 * @name @ethicdevs/json-tree-view
 * @license MIT
 * @maintainer <William Nemencha, EthicDevs, https://github.com/EthicDevs/json-tree-view>
 * @forked-from <前端通過元素展示Json樹狀資料，因, https://github.com/yuda-lyu/w-jsonview-tree>
 * @itself-forked-from <沒有加入預先展開數據功能，自己下載來修改, https://github.com/pgrabovets/json-view>
 */
/**
 * @export
 * @param {Object} jsonObj 輸入Json物件
 * @param {Element} rootElem 輸入初始化元素
 * @param {Object} [option={}] 輸入設定物件，預設為空物件
 * @param {Boolean} [option.expanded=false] 輸入是否預先展開，預設為false
 */
function renderJSONTreeView(jsonObj, rootElem, options) {
    if (options === void 0) { options = {}; }
    //default expanded
    var _expanded = false;
    function init() {
        //get expanded
        if (options) {
            _expanded = options["expanded"] === true;
        }
        //clear
        rootElem.innerHTML = "";
        //add class
        rootElem.classList.add("CompCssDJsonViewTree");
        //render
        var tree = createTree(jsonObj);
        render(tree, rootElem);
        return tree;
    }
    /**
     * Create html element
     * @param {String} type html element
     * @param {Object} config
     */
    function createElement(type, config) {
        var htmlElement = document.createElement(type);
        if (config === undefined) {
            return htmlElement;
        }
        if (config.className) {
            htmlElement.className = config.className;
        }
        if (config.content) {
            htmlElement.textContent = config.content;
        }
        if (config.children) {
            config.children.forEach(function (el) {
                if (el !== null) {
                    htmlElement.appendChild(el);
                }
            });
        }
        return htmlElement;
    }
    function createExpandedElement(node) {
        var _a, _b, _c;
        var iElem = createElement("i");
        if (node.expanded) {
            iElem.className = "wicon w-caret-down";
        }
        else {
            iElem.className = "wicon w-caret-right";
        }
        var caretElem = createElement("div", {
            className: "wjv-caret-icon",
            children: [iElem],
        });
        var handleClick = node.toggle.bind(node);
        caretElem.addEventListener("click", handleClick);
        var indexElem = createElement("div", {
            className: "wjv-json-index",
            content: node.key,
        });
        var typeElem = createElement("div", {
            className: "wjv-json-type",
            content: node.type,
        });
        var keyElem = createElement("div", {
            className: "wjv-json-key",
            content: node.key,
        });
        var sizeElem = createElement("div", {
            className: "wjv-json-size",
        });
        if (node.type === "array") {
            sizeElem.innerText = "[" + ((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) + "]";
        }
        else if (node.type === "object") {
            sizeElem.innerText = "{" + ((_b = node.children) === null || _b === void 0 ? void 0 : _b.length) + "}";
        }
        var lineChildren;
        if (node.key === null) {
            lineChildren = [caretElem, typeElem, sizeElem];
        }
        else if (((_c = node === null || node === void 0 ? void 0 : node.parent) === null || _c === void 0 ? void 0 : _c.type) === "array") {
            lineChildren = [caretElem, indexElem, sizeElem];
        }
        else {
            lineChildren = [caretElem, keyElem, sizeElem];
        }
        var lineElem = createElement("div", {
            className: "wjv-line",
            children: lineChildren,
        });
        if (node.depth > 0) {
            //lineElem.style = 'margin-left: ' + node.depth * 24 + 'px;' //IE11 strict模式下無法指派, style為唯讀屬性
            lineElem.setAttribute("style", "margin-left: " + node.depth * 24 + "px;");
        }
        return lineElem;
    }
    /**
     * Create not expanded element
     * @param {Object} node
     * @return {HTMLElement}
     */
    function createNotExpandedElement(node) {
        var caretElem = createElement("div", {
            className: "wjv-empty-icon",
        });
        var keyElem = createElement("div", {
            className: "wjv-json-key",
            content: node.key,
        });
        var separatorElement = createElement("div", {
            className: "wjv-json-separator",
            content: ":",
        });
        var valueType = " wjv-json-" + typeof node.value;
        var valueContent = String(node.value);
        var valueElement = createElement("div", {
            className: "wjv-json-value" + valueType,
            content: valueContent,
        });
        var lineElem = createElement("div", {
            className: "wjv-line",
            children: [caretElem, keyElem, separatorElement, valueElement],
        });
        if (node.depth > 0) {
            //lineElem.style = 'margin-left: ' + node.depth * 24 + 'px;' //IE11 strict模式下無法指派, style為唯讀屬性
            lineElem.setAttribute("style", "margin-left: " + node.depth * 24 + "px;");
        }
        return lineElem;
    }
    /**
     * Create tree node
     * @return {Object}
     */
    function createNode() {
        return {
            key: null,
            parent: null,
            value: null,
            expanded: _expanded,
            type: null,
            children: null,
            elem: null,
            depth: 0,
            setCaretIconRight: function () {
                var _a;
                var icon = (_a = this.elem) === null || _a === void 0 ? void 0 : _a.querySelector(".wicon");
                icon === null || icon === void 0 ? void 0 : icon.classList.replace("w-caret-down", "w-caret-right");
            },
            setCaretIconDown: function () {
                var _a;
                var icon = (_a = this.elem) === null || _a === void 0 ? void 0 : _a.querySelector(".wicon");
                icon === null || icon === void 0 ? void 0 : icon.classList.replace("w-caret-right", "w-caret-down");
            },
            hideChildren: function () {
                if (this.children !== null) {
                    this.children.forEach(function (item) {
                        var _a;
                        (_a = item.elem) === null || _a === void 0 ? void 0 : _a.classList.add("wjv-json-hide");
                        if (item.expanded) {
                            item.hideChildren();
                        }
                    });
                }
            },
            showChildren: function () {
                if (this.children !== null) {
                    this.children.forEach(function (item) {
                        var _a;
                        (_a = item.elem) === null || _a === void 0 ? void 0 : _a.classList.remove("wjv-json-hide");
                        if (item.expanded) {
                            item.showChildren();
                        }
                    });
                }
            },
            toggle: function () {
                if (this.expanded) {
                    this.expanded = false;
                    this.hideChildren();
                    this.setCaretIconRight();
                }
                else {
                    this.expanded = true;
                    this.showChildren();
                    this.setCaretIconDown();
                }
            },
        };
    }
    /**
     * Return variable type
     * @param {*} val
     */
    function getType(val) {
        var type = typeof val;
        if (Array.isArray(val)) {
            type = "array";
        }
        else if (val === null) {
            type = "null";
        }
        return type;
    }
    /**
     * Recursively traverse json object
     * @param {Object} obj parsed json object
     * @param {Object} parent of object tree
     */
    function traverseObject(obj, parent) {
        for (var key in obj) {
            var child = createNode();
            child.parent = parent;
            child.key = key;
            child.type = getType(obj[key]);
            child.depth = parent.depth + 1;
            child.expanded = _expanded;
            if (typeof obj[key] === "object") {
                child.children = [];
                if (parent.children == null) {
                    parent.children = [];
                }
                parent.children.push(child);
                traverseObject(obj[key], child);
                child.elem = createExpandedElement(child);
            }
            else {
                child.value = obj[key];
                child.elem = createNotExpandedElement(child);
                if (parent.children == null) {
                    parent.children = [];
                }
                parent.children.push(child);
            }
        }
    }
    /**
     * Create root of a tree
     * @param {Object} obj Json object
     * @return {Object}
     */
    function createTree(obj) {
        var tree = createNode();
        tree.type = getType(obj);
        tree.children = [];
        tree.expanded = _expanded;
        traverseObject(obj, tree);
        tree.elem = createExpandedElement(tree);
        return tree;
    }
    /**
     * Recursively traverse Tree object
     * @param {Object} node
     * @param {Callback} callback
     */
    function traverseTree(node, callback) {
        callback(node);
        if (node.children !== null) {
            node.children.forEach(function (item) {
                traverseTree(item, callback);
            });
        }
    }
    /**
     * Render Tree object
     * @param {Object} tree
     * @param {String} rootElem
     */
    function render(tree, rootElem) {
        traverseTree(tree, function (node) {
            if (!node.expanded) {
                node.hideChildren();
            }
            if (node.elem) {
                rootElem.appendChild(node.elem);
            }
        });
    }
    return init();
}


/***/ }),

/***/ "./node_modules/deep-object-diff/mjs/added.js":
/*!****************************************************!*\
  !*** ./node_modules/deep-object-diff/mjs/added.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/deep-object-diff/mjs/utils.js");


const addedDiff = (lhs, rhs) => {

  if (lhs === rhs || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(lhs) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(rhs)) return {};

  const l = lhs;
  const r = rhs;

  return Object.keys(r).reduce((acc, key) => {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty)(l, key)) {
      const difference = addedDiff(l[key], r[key]);

      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(difference) && (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(difference)) return acc;

      acc[key] = difference;
      return acc;
    }

    acc[key] = r[key];
    return acc;
  }, {});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addedDiff);


/***/ }),

/***/ "./node_modules/deep-object-diff/mjs/deleted.js":
/*!******************************************************!*\
  !*** ./node_modules/deep-object-diff/mjs/deleted.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/deep-object-diff/mjs/utils.js");


const deletedDiff = (lhs, rhs) => {
  if (lhs === rhs || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(lhs) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(rhs)) return {};

  const l = lhs;
  const r = rhs;

  return Object.keys(l).reduce((acc, key) => {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty)(r, key)) {
      const difference = deletedDiff(l[key], r[key]);

      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(difference) && (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(difference)) return acc;

      acc[key] = difference;
      return acc;
    }

    acc[key] = undefined;
    return acc;
  }, {});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deletedDiff);


/***/ }),

/***/ "./node_modules/deep-object-diff/mjs/detailed.js":
/*!*******************************************************!*\
  !*** ./node_modules/deep-object-diff/mjs/detailed.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _added_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./added.js */ "./node_modules/deep-object-diff/mjs/added.js");
/* harmony import */ var _deleted_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deleted.js */ "./node_modules/deep-object-diff/mjs/deleted.js");
/* harmony import */ var _updated_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updated.js */ "./node_modules/deep-object-diff/mjs/updated.js");




const detailedDiff = (lhs, rhs) => ({
  added: (0,_added_js__WEBPACK_IMPORTED_MODULE_0__["default"])(lhs, rhs),
  deleted: (0,_deleted_js__WEBPACK_IMPORTED_MODULE_1__["default"])(lhs, rhs),
  updated: (0,_updated_js__WEBPACK_IMPORTED_MODULE_2__["default"])(lhs, rhs),
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (detailedDiff);


/***/ }),

/***/ "./node_modules/deep-object-diff/mjs/diff.js":
/*!***************************************************!*\
  !*** ./node_modules/deep-object-diff/mjs/diff.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/deep-object-diff/mjs/utils.js");


const diff = (lhs, rhs) => {
  if (lhs === rhs) return {}; // equal return no diff

  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(lhs) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(rhs)) return rhs; // return updated rhs

  const l = lhs;
  const r = rhs;

  const deletedValues = Object.keys(l).reduce((acc, key) => {
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty)(r, key)) {
      acc[key] = undefined;
      
    }

    return acc;
  }, {});

  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isDate)(l) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isDate)(r)) {
    if (l.valueOf() == r.valueOf()) return {};
    return r;
  }

  return Object.keys(r).reduce((acc, key) => {
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty)(l, key)){
      acc[key] = r[key]; // return added r key
      return acc;
    } 

    const difference = diff(l[key], r[key]);

    // If the difference is empty, and the lhs is an empty object or the rhs is not an empty object
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(difference) && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isDate)(difference) && ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(l[key]) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(r[key])))
      return acc; // return no diff

    acc[key] = difference // return updated key
    return acc; // return updated key
  }, deletedValues);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (diff);


/***/ }),

/***/ "./node_modules/deep-object-diff/mjs/index.js":
/*!****************************************************!*\
  !*** ./node_modules/deep-object-diff/mjs/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addedDiff": () => (/* reexport safe */ _added_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "deletedDiff": () => (/* reexport safe */ _deleted_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "detailedDiff": () => (/* reexport safe */ _detailed_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "diff": () => (/* reexport safe */ _diff_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "updatedDiff": () => (/* reexport safe */ _updated_js__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _diff_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diff.js */ "./node_modules/deep-object-diff/mjs/diff.js");
/* harmony import */ var _added_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./added.js */ "./node_modules/deep-object-diff/mjs/added.js");
/* harmony import */ var _deleted_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deleted.js */ "./node_modules/deep-object-diff/mjs/deleted.js");
/* harmony import */ var _updated_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updated.js */ "./node_modules/deep-object-diff/mjs/updated.js");
/* harmony import */ var _detailed_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./detailed.js */ "./node_modules/deep-object-diff/mjs/detailed.js");









/***/ }),

/***/ "./node_modules/deep-object-diff/mjs/updated.js":
/*!******************************************************!*\
  !*** ./node_modules/deep-object-diff/mjs/updated.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/deep-object-diff/mjs/utils.js");


const updatedDiff = (lhs, rhs) => {
  if (lhs === rhs) return {};

  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(lhs) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(rhs)) return rhs;

  const l = lhs;
  const r = rhs;

  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isDate)(l) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isDate)(r)) {
    if (l.valueOf() == r.valueOf()) return {};
    return r;
  }

  return Object.keys(r).reduce((acc, key) => {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty)(l, key)) {
      const difference = updatedDiff(l[key], r[key]);

      // If the difference is empty, and the lhs is an empty object or the rhs is not an empty object
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(difference) && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isDate)(difference) && ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(l[key]) || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(r[key])))
        return acc; // return no diff

      acc[key] = difference;
      return acc;
    }

    return acc;
  }, {});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updatedDiff);


/***/ }),

/***/ "./node_modules/deep-object-diff/mjs/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/deep-object-diff/mjs/utils.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasOwnProperty": () => (/* binding */ hasOwnProperty),
/* harmony export */   "isDate": () => (/* binding */ isDate),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "isEmptyObject": () => (/* binding */ isEmptyObject),
/* harmony export */   "isObject": () => (/* binding */ isObject)
/* harmony export */ });
const isDate = d => d instanceof Date;
const isEmpty = o => Object.keys(o).length === 0;
const isObject = o => o != null && typeof o === 'object';
const hasOwnProperty = (o, ...args) => Object.prototype.hasOwnProperty.call(o, ...args)
const isEmptyObject = (o) => isObject(o) && isEmpty(o);


/***/ })

/******/ 	});
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./debugger-ui/debugger-ui.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WS_READY_STATE": () => (/* binding */ WS_READY_STATE)
/* harmony export */ });
/* harmony import */ var _ethicdevs_json_tree_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethicdevs/json-tree-view */ "./node_modules/@ethicdevs/json-tree-view/dist/index.js");
/* harmony import */ var deep_object_diff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! deep-object-diff */ "./node_modules/deep-object-diff/mjs/index.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};


var WS_READY_STATE;
(function (WS_READY_STATE) {
    WS_READY_STATE[WS_READY_STATE["Connecting"] = 0] = "Connecting";
    WS_READY_STATE[WS_READY_STATE["Open"] = 1] = "Open";
    WS_READY_STATE[WS_READY_STATE["Closing"] = 2] = "Closing";
    WS_READY_STATE[WS_READY_STATE["Closed"] = 3] = "Closed";
})(WS_READY_STATE || (WS_READY_STATE = {}));
function nestedIncludes(obj, toMatch) {
    var entries = Object.entries(obj);
    var mappedEntries = entries.map(function (_a) {
        var k = _a[0], v = _a[1];
        if (typeof v === "object") {
            return [k, nestedIncludes(v, toMatch)];
        }
        else if (typeof v === "function" ||
            typeof v === "undefined" ||
            typeof v === "symbol" ||
            typeof v === "bigint" ||
            typeof v === "number") {
            return [k, false];
        }
        else if (typeof v === "string") {
            return [k, v.includes(toMatch)];
        }
        else {
            return [k, false];
        }
    });
    return mappedEntries.some(function (_a) {
        var _ = _a[0], v = _a[1];
        return v === true;
    });
}
function strToBytesLen(str) {
    try {
        return new TextEncoder().encode(str).length;
    }
    catch (_) {
        return -1;
    }
}
function humanFileSize(bytes, si, dp) {
    if (si === void 0) { si = false; }
    if (dp === void 0) { dp = 1; }
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + " B";
    }
    var units = si
        ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    var u = -1;
    var r = Math.pow(10, dp);
    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh &&
        u < units.length - 1);
    return bytes.toFixed(dp) + " " + units[u];
}
function getLogLines(packet, packetBytes) {
    var _a;
    var date = new Date(packet._t).toLocaleString();
    var packetType = (_a = packet._d) === null || _a === void 0 ? void 0 : _a.type;
    var packetSize = humanFileSize(packetBytes);
    var maybeActionType = packetType == null ? "" : "".concat(packetType, " => ");
    var content = JSON.stringify(packet._d, null, 2);
    var str = "[".concat(date, "] (").concat(packetSize, ") => ").concat(maybeActionType, "\n").concat(content);
    var _b = str.split("\n"), firstLine = _b[0], otherLines = _b.slice(1);
    return __spreadArray([firstLine], otherLines, true);
}
/* function makeLogEntry(packet: DebuggerPacket) {
  const date = new Date(packet._t).toLocaleString();
  const packetType = packet._d?.type;
  const maybeActionType = packetType == null ? "" : `${packetType} => `;
  const content = JSON.stringify(packet._d, null, 2);
  const str = `[${date}]: ${maybeActionType}${content}`;
  const [firstLine, ...otherLines] = str.split("\n");

  const node = document.createElement("li");
  const detailsNode = document.createElement("details");
  const summaryNode = document.createElement("summary");
  const preNode = document.createElement("pre");
  const summaryTextNode = document.createTextNode(firstLine);
  const textNode = document.createTextNode(otherLines.join("\n"));

  detailsNode.setAttribute("open", "true");
  detailsNode.classList.add("log");
  detailsNode.classList.add(`log-${packet._k}`);

  summaryNode.appendChild(summaryTextNode);
  preNode.appendChild(textNode);
  detailsNode.appendChild(summaryNode);
  detailsNode.appendChild(preNode);
  node.appendChild(detailsNode);

  return node;
} */
var makeNodeToggleFolding = function (allFolded) { return function (node) {
    if (allFolded) {
        node.setAttribute("open", true);
    }
    else {
        node.removeAttribute("open");
    }
}; };
(function iife(wsUri) {
    if (wsUri === void 0) { wsUri = "ws://localhost:8080"; }
    console.log("[rgsh-debugger/ui] Hey, will connect to ws on: ".concat(wsUri));
    var ws = new WebSocket(wsUri);
    var stats = {
        dispatchedActions: 0,
        stateUpdates: 0,
    };
    var state = {
        actionsAllFolded: false,
        stateAllFolded: false,
        stateDiffMode: false,
        lastStateData: null,
        actionsFilterByValue: "",
        stateFilterByValue: "",
    };
    var wsReadyStateEl = document.querySelector("#ws-ready-state");
    var actionsLog = document.querySelector("#actions-dispatch-wrapper");
    var actionsInputFilter = document.querySelector("#input-filter-actions");
    var actionsDispatchCounter = document.querySelector("#dispatched-actions-counter");
    var actionsToggleFoldingButton = document.querySelector("#btn-action-toggle-folding");
    var stateLog = document.querySelector("#state-updates-wrapper");
    var stateInputFilter = document.querySelector("#input-filter-state");
    var stateUpdatesCounter = document.querySelector("#state-updates-counter");
    var stateDiffModeStatus = document.querySelector("#state-diff-mode");
    var stateToggleFoldingButton = document.querySelector("#btn-state-toggle-folding");
    var stateToggleDiffModeButton = document.querySelector("#btn-state-toggle-diff-mode");
    function log(message) {
        if (wsReadyStateEl != null) {
            wsReadyStateEl.textContent = message;
        }
    }
    function wsOpen(_) {
        ws.send("tail");
        log("Connected!");
    }
    function wsError(ev, reconnectWebSocket) {
        log("Socket error: " + ev.message);
        reconnectWebSocket();
    }
    function wsClose(_a, reconnectWebSocket) {
        var code = _a.code, reason = _a.reason;
        var tags = ["code=".concat(code || "none"), "reason=".concat(reason || "none")];
        log("Connection closed. ".concat(tags.join(" ")));
        reconnectWebSocket();
    }
    function wsMessage(ev) {
        var data = ev.data.toString();
        var packet = JSON.parse(data);
        var packetBytes = strToBytesLen(data);
        if (packet._k === "action") {
            stats.dispatchedActions += 1;
        }
        else if (packet._k === "state") {
            stats.stateUpdates += 1;
        }
        if (packet._k === "state" &&
            state.stateFilterByValue != null &&
            state.stateFilterByValue.trim() !== "" &&
            nestedIncludes(packet._d, state.stateFilterByValue) === false) {
            console.log("includesStateFilter:", nestedIncludes(packet._d, state.stateFilterByValue));
            return; // skip
        }
        if (packet._k === "action" &&
            state.actionsFilterByValue != null &&
            state.actionsFilterByValue.trim() !== "" &&
            nestedIncludes(packet._d, state.actionsFilterByValue) === false) {
            console.log("includesActionsFilter:", nestedIncludes(packet._d, state.actionsFilterByValue));
            return; // skip
        }
        //let logEntry;
        var logLines = [];
        var nodeToUpdate;
        if (packet._k === "state" &&
            state.stateDiffMode === true &&
            state.lastStateData != null) {
            var diffResult = (0,deep_object_diff__WEBPACK_IMPORTED_MODULE_1__.updatedDiff)(state.lastStateData, packet._d);
            var diffPacket = __assign(__assign({}, packet), { _d: diffResult });
            //logEntry = makeLogEntry(diffPacket);
            logLines = getLogLines(diffPacket, strToBytesLen(JSON.stringify(diffPacket)));
            nodeToUpdate = stateLog;
        }
        else {
            //logEntry = makeLogEntry(packet);
            logLines = getLogLines(packet, packetBytes);
            nodeToUpdate = packet._k === "action" ? actionsLog : stateLog;
        }
        if (nodeToUpdate != null) {
            var jsonTreeViewNode = document.createElement("div");
            (0,_ethicdevs_json_tree_view__WEBPACK_IMPORTED_MODULE_0__.renderJSONTreeView)(packet._d, jsonTreeViewNode, {
                expanded: false,
            });
            var firstLine = logLines[0];
            var firstLineNode = document.createTextNode(firstLine);
            var wrapperNode = document.createElement("div");
            wrapperNode.appendChild(firstLineNode);
            wrapperNode.appendChild(jsonTreeViewNode);
            nodeToUpdate.appendChild(wrapperNode);
            if (nodeToUpdate.parentElement != null) {
                nodeToUpdate.parentElement.scrollTop =
                    nodeToUpdate.parentElement.scrollHeight;
            }
        }
        if (actionsDispatchCounter != null) {
            actionsDispatchCounter.textContent = "(".concat(stats.dispatchedActions, " dispatches)");
        }
        if (stateUpdatesCounter != null) {
            stateUpdatesCounter.textContent = "(".concat(stats.stateUpdates, " updates)");
        }
        state.lastStateData = packet._d;
    }
    function recreateWebSocket(bindEvents, firstTime) {
        if (ws.readyState === WS_READY_STATE.Closed) {
            log("Lost connection to debugger. Sleeping 3s before reconnecting...");
        }
        // Try reconnecting every 3s
        var reconnectIntervalId = setInterval(function () {
            if (ws.readyState === WS_READY_STATE.Closed) {
                log("Trying to ".concat(firstTime ? "re" : "", "connect..."));
                ws = new WebSocket(wsUri);
            }
            else if (ws.readyState === WS_READY_STATE.Open) {
                if (reconnectIntervalId) {
                    clearInterval(reconnectIntervalId);
                    reconnectIntervalId = null;
                    log(firstTime ? "Connected!" : "Re-connected!");
                    bindEvents(ws);
                    ws.send("tail");
                }
            }
            return undefined;
        }, 1000 * 3);
        return undefined;
    }
    function bindWsEvents(socket) {
        socket.onopen = wsOpen;
        socket.onmessage = wsMessage;
        socket.onerror = function (ev) {
            wsError(ev, recreateWebSocket.bind(null, bindWsEvents));
        };
        socket.onclose = function (ev) {
            wsClose(ev, recreateWebSocket.bind(null, bindWsEvents));
        };
    }
    bindWsEvents(ws);
    ws.send("tail");
    actionsInputFilter === null || actionsInputFilter === void 0 ? void 0 : actionsInputFilter.addEventListener("change", function (ev) {
        if (ev.target.value != null) {
            state.actionsFilterByValue = ev.target.value;
        }
    });
    stateInputFilter === null || stateInputFilter === void 0 ? void 0 : stateInputFilter.addEventListener("change", function (ev) {
        if (ev.target.value != null) {
            state.stateFilterByValue = ev.target.value;
        }
    });
    actionsToggleFoldingButton === null || actionsToggleFoldingButton === void 0 ? void 0 : actionsToggleFoldingButton.addEventListener("click", function () {
        var allActionNodes = document.querySelectorAll(".log-action");
        allActionNodes.forEach(makeNodeToggleFolding(state.actionsAllFolded));
        state.actionsAllFolded = !state.actionsAllFolded;
    });
    stateToggleFoldingButton === null || stateToggleFoldingButton === void 0 ? void 0 : stateToggleFoldingButton.addEventListener("click", function () {
        var allStateNodes = document.querySelectorAll(".log-state");
        allStateNodes.forEach(makeNodeToggleFolding(state.stateAllFolded));
        state.stateAllFolded = !state.stateAllFolded;
    });
    stateToggleDiffModeButton === null || stateToggleDiffModeButton === void 0 ? void 0 : stateToggleDiffModeButton.addEventListener("click", function () {
        state.stateDiffMode = !state.stateDiffMode;
        if (stateDiffModeStatus != null) {
            stateDiffModeStatus.textContent = state.stateDiffMode ? "On" : "Off";
        }
    });
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qiw2REFBSTtBQUNqQyxpREFBaUQsYUFBYSxnQkFBZ0I7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkVBQWtCO0FBQzlCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvLi9ub2RlX21vZHVsZXMvQGV0aGljZGV2cy9qc29uLXRyZWUtdmlldy9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL2RlZXAtb2JqZWN0LWRpZmYvbWpzL2FkZGVkLmpzIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL2RlZXAtb2JqZWN0LWRpZmYvbWpzL2RlbGV0ZWQuanMiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvLi9ub2RlX21vZHVsZXMvZGVlcC1vYmplY3QtZGlmZi9tanMvZGV0YWlsZWQuanMiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvLi9ub2RlX21vZHVsZXMvZGVlcC1vYmplY3QtZGlmZi9tanMvZGlmZi5qcyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9kZWVwLW9iamVjdC1kaWZmL21qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9kZWVwLW9iamVjdC1kaWZmL21qcy91cGRhdGVkLmpzIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL2RlZXAtb2JqZWN0LWRpZmYvbWpzL3V0aWxzLmpzIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvLi9kZWJ1Z2dlci11aS9kZWJ1Z2dlci11aS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBuYW1lIEBldGhpY2RldnMvanNvbi10cmVlLXZpZXdcbiAqIEBsaWNlbnNlIE1JVFxuICogQG1haW50YWluZXIgPFdpbGxpYW0gTmVtZW5jaGEsIEV0aGljRGV2cywgaHR0cHM6Ly9naXRodWIuY29tL0V0aGljRGV2cy9qc29uLXRyZWUtdmlldz5cbiAqIEBmb3JrZWQtZnJvbSA85YmN56uv6YCa6YGO5YWD57Sg5bGV56S6SnNvbuaoueeLgOizh+aWme+8jOWboCwgaHR0cHM6Ly9naXRodWIuY29tL3l1ZGEtbHl1L3ctanNvbnZpZXctdHJlZT5cbiAqIEBpdHNlbGYtZm9ya2VkLWZyb20gPOaykuacieWKoOWFpemgkOWFiOWxlemWi+aVuOaTmuWKn+iDve+8jOiHquW3seS4i+i8ieS+huS/ruaUuSwgaHR0cHM6Ly9naXRodWIuY29tL3BncmFib3ZldHMvanNvbi12aWV3PlxuICovXG4vKipcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBqc29uT2JqIOi8uOWFpUpzb27nianku7ZcbiAqIEBwYXJhbSB7RWxlbWVudH0gcm9vdEVsZW0g6Ly45YWl5Yid5aeL5YyW5YWD57SgXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbj17fV0g6Ly45YWl6Kit5a6a54mp5Lu277yM6aCQ6Kit54K656m654mp5Lu2XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb24uZXhwYW5kZWQ9ZmFsc2VdIOi8uOWFpeaYr+WQpumgkOWFiOWxlemWi++8jOmgkOioreeCumZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJKU09OVHJlZVZpZXcoanNvbk9iaiwgcm9vdEVsZW0sIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIC8vZGVmYXVsdCBleHBhbmRlZFxuICAgIHZhciBfZXhwYW5kZWQgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAvL2dldCBleHBhbmRlZFxuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgX2V4cGFuZGVkID0gb3B0aW9uc1tcImV4cGFuZGVkXCJdID09PSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vY2xlYXJcbiAgICAgICAgcm9vdEVsZW0uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgLy9hZGQgY2xhc3NcbiAgICAgICAgcm9vdEVsZW0uY2xhc3NMaXN0LmFkZChcIkNvbXBDc3NESnNvblZpZXdUcmVlXCIpO1xuICAgICAgICAvL3JlbmRlclxuICAgICAgICB2YXIgdHJlZSA9IGNyZWF0ZVRyZWUoanNvbk9iaik7XG4gICAgICAgIHJlbmRlcih0cmVlLCByb290RWxlbSk7XG4gICAgICAgIHJldHVybiB0cmVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgaHRtbCBlbGVtZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgaHRtbCBlbGVtZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBodG1sRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGh0bWxFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBodG1sRWxlbWVudC5jbGFzc05hbWUgPSBjb25maWcuY2xhc3NOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuY29udGVudCkge1xuICAgICAgICAgICAgaHRtbEVsZW1lbnQudGV4dENvbnRlbnQgPSBjb25maWcuY29udGVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25maWcuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodG1sRWxlbWVudDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRXhwYW5kZWRFbGVtZW50KG5vZGUpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHZhciBpRWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgICAgICBpZiAobm9kZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgaUVsZW0uY2xhc3NOYW1lID0gXCJ3aWNvbiB3LWNhcmV0LWRvd25cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlFbGVtLmNsYXNzTmFtZSA9IFwid2ljb24gdy1jYXJldC1yaWdodFwiO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYXJldEVsZW0gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ3anYtY2FyZXQtaWNvblwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtpRWxlbV0sXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgaGFuZGxlQ2xpY2sgPSBub2RlLnRvZ2dsZS5iaW5kKG5vZGUpO1xuICAgICAgICBjYXJldEVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrKTtcbiAgICAgICAgdmFyIGluZGV4RWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndqdi1qc29uLWluZGV4XCIsXG4gICAgICAgICAgICBjb250ZW50OiBub2RlLmtleSxcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB0eXBlRWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndqdi1qc29uLXR5cGVcIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IG5vZGUudHlwZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBrZXlFbGVtID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IFwid2p2LWpzb24ta2V5XCIsXG4gICAgICAgICAgICBjb250ZW50OiBub2RlLmtleSxcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzaXplRWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndqdi1qc29uLXNpemVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IFwiYXJyYXlcIikge1xuICAgICAgICAgICAgc2l6ZUVsZW0uaW5uZXJUZXh0ID0gXCJbXCIgKyAoKF9hID0gbm9kZS5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgKyBcIl1cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub2RlLnR5cGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHNpemVFbGVtLmlubmVyVGV4dCA9IFwie1wiICsgKChfYiA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5sZW5ndGgpICsgXCJ9XCI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbmVDaGlsZHJlbjtcbiAgICAgICAgaWYgKG5vZGUua2V5ID09PSBudWxsKSB7XG4gICAgICAgICAgICBsaW5lQ2hpbGRyZW4gPSBbY2FyZXRFbGVtLCB0eXBlRWxlbSwgc2l6ZUVsZW1dO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCgoX2MgPSBub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5vZGUucGFyZW50KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MudHlwZSkgPT09IFwiYXJyYXlcIikge1xuICAgICAgICAgICAgbGluZUNoaWxkcmVuID0gW2NhcmV0RWxlbSwgaW5kZXhFbGVtLCBzaXplRWxlbV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsaW5lQ2hpbGRyZW4gPSBbY2FyZXRFbGVtLCBrZXlFbGVtLCBzaXplRWxlbV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbmVFbGVtID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IFwid2p2LWxpbmVcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBsaW5lQ2hpbGRyZW4sXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobm9kZS5kZXB0aCA+IDApIHtcbiAgICAgICAgICAgIC8vbGluZUVsZW0uc3R5bGUgPSAnbWFyZ2luLWxlZnQ6ICcgKyBub2RlLmRlcHRoICogMjQgKyAncHg7JyAvL0lFMTEgc3RyaWN05qih5byP5LiL54Sh5rOV5oyH5rS+LCBzdHlsZeeCuuWUr+iugOWxrOaAp1xuICAgICAgICAgICAgbGluZUVsZW0uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJtYXJnaW4tbGVmdDogXCIgKyBub2RlLmRlcHRoICogMjQgKyBcInB4O1wiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZUVsZW07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBub3QgZXhwYW5kZWQgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlTm90RXhwYW5kZWRFbGVtZW50KG5vZGUpIHtcbiAgICAgICAgdmFyIGNhcmV0RWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndqdi1lbXB0eS1pY29uXCIsXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIga2V5RWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndqdi1qc29uLWtleVwiLFxuICAgICAgICAgICAgY29udGVudDogbm9kZS5rZXksXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2VwYXJhdG9yRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndqdi1qc29uLXNlcGFyYXRvclwiLFxuICAgICAgICAgICAgY29udGVudDogXCI6XCIsXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdmFsdWVUeXBlID0gXCIgd2p2LWpzb24tXCIgKyB0eXBlb2Ygbm9kZS52YWx1ZTtcbiAgICAgICAgdmFyIHZhbHVlQ29udGVudCA9IFN0cmluZyhub2RlLnZhbHVlKTtcbiAgICAgICAgdmFyIHZhbHVlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndqdi1qc29uLXZhbHVlXCIgKyB2YWx1ZVR5cGUsXG4gICAgICAgICAgICBjb250ZW50OiB2YWx1ZUNvbnRlbnQsXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbGluZUVsZW0gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ3anYtbGluZVwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtjYXJldEVsZW0sIGtleUVsZW0sIHNlcGFyYXRvckVsZW1lbnQsIHZhbHVlRWxlbWVudF0sXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobm9kZS5kZXB0aCA+IDApIHtcbiAgICAgICAgICAgIC8vbGluZUVsZW0uc3R5bGUgPSAnbWFyZ2luLWxlZnQ6ICcgKyBub2RlLmRlcHRoICogMjQgKyAncHg7JyAvL0lFMTEgc3RyaWN05qih5byP5LiL54Sh5rOV5oyH5rS+LCBzdHlsZeeCuuWUr+iugOWxrOaAp1xuICAgICAgICAgICAgbGluZUVsZW0uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJtYXJnaW4tbGVmdDogXCIgKyBub2RlLmRlcHRoICogMjQgKyBcInB4O1wiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZUVsZW07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0cmVlIG5vZGVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlTm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleTogbnVsbCxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgZXhwYW5kZWQ6IF9leHBhbmRlZCxcbiAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICBjaGlsZHJlbjogbnVsbCxcbiAgICAgICAgICAgIGVsZW06IG51bGwsXG4gICAgICAgICAgICBkZXB0aDogMCxcbiAgICAgICAgICAgIHNldENhcmV0SWNvblJpZ2h0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHZhciBpY29uID0gKF9hID0gdGhpcy5lbGVtKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcihcIi53aWNvblwiKTtcbiAgICAgICAgICAgICAgICBpY29uID09PSBudWxsIHx8IGljb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGljb24uY2xhc3NMaXN0LnJlcGxhY2UoXCJ3LWNhcmV0LWRvd25cIiwgXCJ3LWNhcmV0LXJpZ2h0XCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldENhcmV0SWNvbkRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgdmFyIGljb24gPSAoX2EgPSB0aGlzLmVsZW0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yKFwiLndpY29uXCIpO1xuICAgICAgICAgICAgICAgIGljb24gPT09IG51bGwgfHwgaWNvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogaWNvbi5jbGFzc0xpc3QucmVwbGFjZShcInctY2FyZXQtcmlnaHRcIiwgXCJ3LWNhcmV0LWRvd25cIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGlkZUNoaWxkcmVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgICAgICAoX2EgPSBpdGVtLmVsZW0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3QuYWRkKFwid2p2LWpzb24taGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5oaWRlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dDaGlsZHJlbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICAgICAgKF9hID0gaXRlbS5lbGVtKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xhc3NMaXN0LnJlbW92ZShcIndqdi1qc29uLWhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2hvd0NoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2FyZXRJY29uUmlnaHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENhcmV0SWNvbkRvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdmFyaWFibGUgdHlwZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0VHlwZSh2YWwpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgICB0eXBlID0gXCJhcnJheVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdHlwZSA9IFwibnVsbFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWN1cnNpdmVseSB0cmF2ZXJzZSBqc29uIG9iamVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogcGFyc2VkIGpzb24gb2JqZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudCBvZiBvYmplY3QgdHJlZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRyYXZlcnNlT2JqZWN0KG9iaiwgcGFyZW50KSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNyZWF0ZU5vZGUoKTtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgIGNoaWxkLmtleSA9IGtleTtcbiAgICAgICAgICAgIGNoaWxkLnR5cGUgPSBnZXRUeXBlKG9ialtrZXldKTtcbiAgICAgICAgICAgIGNoaWxkLmRlcHRoID0gcGFyZW50LmRlcHRoICsgMTtcbiAgICAgICAgICAgIGNoaWxkLmV4cGFuZGVkID0gX2V4cGFuZGVkO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIGNoaWxkLmNoaWxkcmVuID0gW107XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgICAgICAgICAgdHJhdmVyc2VPYmplY3Qob2JqW2tleV0sIGNoaWxkKTtcbiAgICAgICAgICAgICAgICBjaGlsZC5lbGVtID0gY3JlYXRlRXhwYW5kZWRFbGVtZW50KGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoaWxkLnZhbHVlID0gb2JqW2tleV07XG4gICAgICAgICAgICAgICAgY2hpbGQuZWxlbSA9IGNyZWF0ZU5vdEV4cGFuZGVkRWxlbWVudChjaGlsZCk7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHJvb3Qgb2YgYSB0cmVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBKc29uIG9iamVjdFxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVUcmVlKG9iaikge1xuICAgICAgICB2YXIgdHJlZSA9IGNyZWF0ZU5vZGUoKTtcbiAgICAgICAgdHJlZS50eXBlID0gZ2V0VHlwZShvYmopO1xuICAgICAgICB0cmVlLmNoaWxkcmVuID0gW107XG4gICAgICAgIHRyZWUuZXhwYW5kZWQgPSBfZXhwYW5kZWQ7XG4gICAgICAgIHRyYXZlcnNlT2JqZWN0KG9iaiwgdHJlZSk7XG4gICAgICAgIHRyZWUuZWxlbSA9IGNyZWF0ZUV4cGFuZGVkRWxlbWVudCh0cmVlKTtcbiAgICAgICAgcmV0dXJuIHRyZWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlY3Vyc2l2ZWx5IHRyYXZlcnNlIFRyZWUgb2JqZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICAgKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRyYXZlcnNlVHJlZShub2RlLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhub2RlKTtcbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHRyYXZlcnNlVHJlZShpdGVtLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgVHJlZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdHJlZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByb290RWxlbVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlbmRlcih0cmVlLCByb290RWxlbSkge1xuICAgICAgICB0cmF2ZXJzZVRyZWUodHJlZSwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGlmICghbm9kZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgIG5vZGUuaGlkZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5lbGVtKSB7XG4gICAgICAgICAgICAgICAgcm9vdEVsZW0uYXBwZW5kQ2hpbGQobm9kZS5lbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBpbml0KCk7XG59XG4iLCJpbXBvcnQgeyBpc0VtcHR5LCBpc09iamVjdCwgaGFzT3duUHJvcGVydHkgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuY29uc3QgYWRkZWREaWZmID0gKGxocywgcmhzKSA9PiB7XG5cbiAgaWYgKGxocyA9PT0gcmhzIHx8ICFpc09iamVjdChsaHMpIHx8ICFpc09iamVjdChyaHMpKSByZXR1cm4ge307XG5cbiAgY29uc3QgbCA9IGxocztcbiAgY29uc3QgciA9IHJocztcblxuICByZXR1cm4gT2JqZWN0LmtleXMocikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eShsLCBrZXkpKSB7XG4gICAgICBjb25zdCBkaWZmZXJlbmNlID0gYWRkZWREaWZmKGxba2V5XSwgcltrZXldKTtcblxuICAgICAgaWYgKGlzT2JqZWN0KGRpZmZlcmVuY2UpICYmIGlzRW1wdHkoZGlmZmVyZW5jZSkpIHJldHVybiBhY2M7XG5cbiAgICAgIGFjY1trZXldID0gZGlmZmVyZW5jZTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfVxuXG4gICAgYWNjW2tleV0gPSByW2tleV07XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYWRkZWREaWZmO1xuIiwiaW1wb3J0IHsgaXNFbXB0eSwgaXNPYmplY3QsIGhhc093blByb3BlcnR5IH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNvbnN0IGRlbGV0ZWREaWZmID0gKGxocywgcmhzKSA9PiB7XG4gIGlmIChsaHMgPT09IHJocyB8fCAhaXNPYmplY3QobGhzKSB8fCAhaXNPYmplY3QocmhzKSkgcmV0dXJuIHt9O1xuXG4gIGNvbnN0IGwgPSBsaHM7XG4gIGNvbnN0IHIgPSByaHM7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKGwpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkociwga2V5KSkge1xuICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IGRlbGV0ZWREaWZmKGxba2V5XSwgcltrZXldKTtcblxuICAgICAgaWYgKGlzT2JqZWN0KGRpZmZlcmVuY2UpICYmIGlzRW1wdHkoZGlmZmVyZW5jZSkpIHJldHVybiBhY2M7XG5cbiAgICAgIGFjY1trZXldID0gZGlmZmVyZW5jZTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfVxuXG4gICAgYWNjW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVsZXRlZERpZmY7XG4iLCJpbXBvcnQgYWRkZWREaWZmIGZyb20gJy4vYWRkZWQuanMnO1xuaW1wb3J0IGRlbGV0ZWREaWZmIGZyb20gJy4vZGVsZXRlZC5qcyc7XG5pbXBvcnQgdXBkYXRlZERpZmYgZnJvbSAnLi91cGRhdGVkLmpzJztcblxuY29uc3QgZGV0YWlsZWREaWZmID0gKGxocywgcmhzKSA9PiAoe1xuICBhZGRlZDogYWRkZWREaWZmKGxocywgcmhzKSxcbiAgZGVsZXRlZDogZGVsZXRlZERpZmYobGhzLCByaHMpLFxuICB1cGRhdGVkOiB1cGRhdGVkRGlmZihsaHMsIHJocyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGV0YWlsZWREaWZmO1xuIiwiaW1wb3J0IHsgaXNEYXRlLCBpc0VtcHR5T2JqZWN0LCBpc09iamVjdCwgaGFzT3duUHJvcGVydHkgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuY29uc3QgZGlmZiA9IChsaHMsIHJocykgPT4ge1xuICBpZiAobGhzID09PSByaHMpIHJldHVybiB7fTsgLy8gZXF1YWwgcmV0dXJuIG5vIGRpZmZcblxuICBpZiAoIWlzT2JqZWN0KGxocykgfHwgIWlzT2JqZWN0KHJocykpIHJldHVybiByaHM7IC8vIHJldHVybiB1cGRhdGVkIHJoc1xuXG4gIGNvbnN0IGwgPSBsaHM7XG4gIGNvbnN0IHIgPSByaHM7XG5cbiAgY29uc3QgZGVsZXRlZFZhbHVlcyA9IE9iamVjdC5rZXlzKGwpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBpZiAoIWhhc093blByb3BlcnR5KHIsIGtleSkpIHtcbiAgICAgIGFjY1trZXldID0gdW5kZWZpbmVkO1xuICAgICAgXG4gICAgfVxuXG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuXG4gIGlmIChpc0RhdGUobCkgfHwgaXNEYXRlKHIpKSB7XG4gICAgaWYgKGwudmFsdWVPZigpID09IHIudmFsdWVPZigpKSByZXR1cm4ge307XG4gICAgcmV0dXJuIHI7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmtleXMocikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgIGlmICghaGFzT3duUHJvcGVydHkobCwga2V5KSl7XG4gICAgICBhY2Nba2V5XSA9IHJba2V5XTsgLy8gcmV0dXJuIGFkZGVkIHIga2V5XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0gXG5cbiAgICBjb25zdCBkaWZmZXJlbmNlID0gZGlmZihsW2tleV0sIHJba2V5XSk7XG5cbiAgICAvLyBJZiB0aGUgZGlmZmVyZW5jZSBpcyBlbXB0eSwgYW5kIHRoZSBsaHMgaXMgYW4gZW1wdHkgb2JqZWN0IG9yIHRoZSByaHMgaXMgbm90IGFuIGVtcHR5IG9iamVjdFxuICAgIGlmIChpc0VtcHR5T2JqZWN0KGRpZmZlcmVuY2UpICYmICFpc0RhdGUoZGlmZmVyZW5jZSkgJiYgKGlzRW1wdHlPYmplY3QobFtrZXldKSB8fCAhaXNFbXB0eU9iamVjdChyW2tleV0pKSlcbiAgICAgIHJldHVybiBhY2M7IC8vIHJldHVybiBubyBkaWZmXG5cbiAgICBhY2Nba2V5XSA9IGRpZmZlcmVuY2UgLy8gcmV0dXJuIHVwZGF0ZWQga2V5XG4gICAgcmV0dXJuIGFjYzsgLy8gcmV0dXJuIHVwZGF0ZWQga2V5XG4gIH0sIGRlbGV0ZWRWYWx1ZXMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlmZjtcbiIsImltcG9ydCBkaWZmIGZyb20gJy4vZGlmZi5qcyc7XG5pbXBvcnQgYWRkZWREaWZmIGZyb20gJy4vYWRkZWQuanMnO1xuaW1wb3J0IGRlbGV0ZWREaWZmIGZyb20gJy4vZGVsZXRlZC5qcyc7XG5pbXBvcnQgdXBkYXRlZERpZmYgZnJvbSAnLi91cGRhdGVkLmpzJztcbmltcG9ydCBkZXRhaWxlZERpZmYgZnJvbSAnLi9kZXRhaWxlZC5qcyc7XG5cbmV4cG9ydCB7XG4gIGFkZGVkRGlmZixcbiAgZGlmZixcbiAgZGVsZXRlZERpZmYsXG4gIHVwZGF0ZWREaWZmLFxuICBkZXRhaWxlZERpZmZcbn07XG4iLCJpbXBvcnQgeyBpc0RhdGUsIGlzRW1wdHlPYmplY3QsIGlzT2JqZWN0LCBoYXNPd25Qcm9wZXJ0eSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5jb25zdCB1cGRhdGVkRGlmZiA9IChsaHMsIHJocykgPT4ge1xuICBpZiAobGhzID09PSByaHMpIHJldHVybiB7fTtcblxuICBpZiAoIWlzT2JqZWN0KGxocykgfHwgIWlzT2JqZWN0KHJocykpIHJldHVybiByaHM7XG5cbiAgY29uc3QgbCA9IGxocztcbiAgY29uc3QgciA9IHJocztcblxuICBpZiAoaXNEYXRlKGwpIHx8IGlzRGF0ZShyKSkge1xuICAgIGlmIChsLnZhbHVlT2YoKSA9PSByLnZhbHVlT2YoKSkgcmV0dXJuIHt9O1xuICAgIHJldHVybiByO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkobCwga2V5KSkge1xuICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IHVwZGF0ZWREaWZmKGxba2V5XSwgcltrZXldKTtcblxuICAgICAgLy8gSWYgdGhlIGRpZmZlcmVuY2UgaXMgZW1wdHksIGFuZCB0aGUgbGhzIGlzIGFuIGVtcHR5IG9iamVjdCBvciB0aGUgcmhzIGlzIG5vdCBhbiBlbXB0eSBvYmplY3RcbiAgICAgIGlmIChpc0VtcHR5T2JqZWN0KGRpZmZlcmVuY2UpICYmICFpc0RhdGUoZGlmZmVyZW5jZSkgJiYgKGlzRW1wdHlPYmplY3QobFtrZXldKSB8fCAhaXNFbXB0eU9iamVjdChyW2tleV0pKSlcbiAgICAgICAgcmV0dXJuIGFjYzsgLy8gcmV0dXJuIG5vIGRpZmZcblxuICAgICAgYWNjW2tleV0gPSBkaWZmZXJlbmNlO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVkRGlmZjtcbiIsImV4cG9ydCBjb25zdCBpc0RhdGUgPSBkID0+IGQgaW5zdGFuY2VvZiBEYXRlO1xuZXhwb3J0IGNvbnN0IGlzRW1wdHkgPSBvID0+IE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMDtcbmV4cG9ydCBjb25zdCBpc09iamVjdCA9IG8gPT4gbyAhPSBudWxsICYmIHR5cGVvZiBvID09PSAnb2JqZWN0JztcbmV4cG9ydCBjb25zdCBoYXNPd25Qcm9wZXJ0eSA9IChvLCAuLi5hcmdzKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgLi4uYXJncylcbmV4cG9ydCBjb25zdCBpc0VtcHR5T2JqZWN0ID0gKG8pID0+IGlzT2JqZWN0KG8pICYmIGlzRW1wdHkobyk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG5pbXBvcnQgeyByZW5kZXJKU09OVHJlZVZpZXcgfSBmcm9tIFwiQGV0aGljZGV2cy9qc29uLXRyZWUtdmlld1wiO1xuaW1wb3J0IHsgdXBkYXRlZERpZmYgYXMgZGlmZiB9IGZyb20gXCJkZWVwLW9iamVjdC1kaWZmXCI7XG5leHBvcnQgdmFyIFdTX1JFQURZX1NUQVRFO1xuKGZ1bmN0aW9uIChXU19SRUFEWV9TVEFURSkge1xuICAgIFdTX1JFQURZX1NUQVRFW1dTX1JFQURZX1NUQVRFW1wiQ29ubmVjdGluZ1wiXSA9IDBdID0gXCJDb25uZWN0aW5nXCI7XG4gICAgV1NfUkVBRFlfU1RBVEVbV1NfUkVBRFlfU1RBVEVbXCJPcGVuXCJdID0gMV0gPSBcIk9wZW5cIjtcbiAgICBXU19SRUFEWV9TVEFURVtXU19SRUFEWV9TVEFURVtcIkNsb3NpbmdcIl0gPSAyXSA9IFwiQ2xvc2luZ1wiO1xuICAgIFdTX1JFQURZX1NUQVRFW1dTX1JFQURZX1NUQVRFW1wiQ2xvc2VkXCJdID0gM10gPSBcIkNsb3NlZFwiO1xufSkoV1NfUkVBRFlfU1RBVEUgfHwgKFdTX1JFQURZX1NUQVRFID0ge30pKTtcbmZ1bmN0aW9uIG5lc3RlZEluY2x1ZGVzKG9iaiwgdG9NYXRjaCkge1xuICAgIHZhciBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMob2JqKTtcbiAgICB2YXIgbWFwcGVkRW50cmllcyA9IGVudHJpZXMubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgayA9IF9hWzBdLCB2ID0gX2FbMV07XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIFtrLCBuZXN0ZWRJbmNsdWRlcyh2LCB0b01hdGNoKV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICAgICAgdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCIgfHxcbiAgICAgICAgICAgIHR5cGVvZiB2ID09PSBcInN5bWJvbFwiIHx8XG4gICAgICAgICAgICB0eXBlb2YgdiA9PT0gXCJiaWdpbnRcIiB8fFxuICAgICAgICAgICAgdHlwZW9mIHYgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBbaywgZmFsc2VdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gW2ssIHYuaW5jbHVkZXModG9NYXRjaCldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtrLCBmYWxzZV07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWFwcGVkRW50cmllcy5zb21lKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgXyA9IF9hWzBdLCB2ID0gX2FbMV07XG4gICAgICAgIHJldHVybiB2ID09PSB0cnVlO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gc3RyVG9CeXRlc0xlbihzdHIpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHN0cikubGVuZ3RoO1xuICAgIH1cbiAgICBjYXRjaCAoXykge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxufVxuZnVuY3Rpb24gaHVtYW5GaWxlU2l6ZShieXRlcywgc2ksIGRwKSB7XG4gICAgaWYgKHNpID09PSB2b2lkIDApIHsgc2kgPSBmYWxzZTsgfVxuICAgIGlmIChkcCA9PT0gdm9pZCAwKSB7IGRwID0gMTsgfVxuICAgIHZhciB0aHJlc2ggPSBzaSA/IDEwMDAgOiAxMDI0O1xuICAgIGlmIChNYXRoLmFicyhieXRlcykgPCB0aHJlc2gpIHtcbiAgICAgICAgcmV0dXJuIGJ5dGVzICsgXCIgQlwiO1xuICAgIH1cbiAgICB2YXIgdW5pdHMgPSBzaVxuICAgICAgICA/IFtcImtCXCIsIFwiTUJcIiwgXCJHQlwiLCBcIlRCXCIsIFwiUEJcIiwgXCJFQlwiLCBcIlpCXCIsIFwiWUJcIl1cbiAgICAgICAgOiBbXCJLaUJcIiwgXCJNaUJcIiwgXCJHaUJcIiwgXCJUaUJcIiwgXCJQaUJcIiwgXCJFaUJcIiwgXCJaaUJcIiwgXCJZaUJcIl07XG4gICAgdmFyIHUgPSAtMTtcbiAgICB2YXIgciA9IE1hdGgucG93KDEwLCBkcCk7XG4gICAgZG8ge1xuICAgICAgICBieXRlcyAvPSB0aHJlc2g7XG4gICAgICAgICsrdTtcbiAgICB9IHdoaWxlIChNYXRoLnJvdW5kKE1hdGguYWJzKGJ5dGVzKSAqIHIpIC8gciA+PSB0aHJlc2ggJiZcbiAgICAgICAgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiBieXRlcy50b0ZpeGVkKGRwKSArIFwiIFwiICsgdW5pdHNbdV07XG59XG5mdW5jdGlvbiBnZXRMb2dMaW5lcyhwYWNrZXQsIHBhY2tldEJ5dGVzKSB7XG4gICAgdmFyIF9hO1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUocGFja2V0Ll90KS50b0xvY2FsZVN0cmluZygpO1xuICAgIHZhciBwYWNrZXRUeXBlID0gKF9hID0gcGFja2V0Ll9kKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudHlwZTtcbiAgICB2YXIgcGFja2V0U2l6ZSA9IGh1bWFuRmlsZVNpemUocGFja2V0Qnl0ZXMpO1xuICAgIHZhciBtYXliZUFjdGlvblR5cGUgPSBwYWNrZXRUeXBlID09IG51bGwgPyBcIlwiIDogXCJcIi5jb25jYXQocGFja2V0VHlwZSwgXCIgPT4gXCIpO1xuICAgIHZhciBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkocGFja2V0Ll9kLCBudWxsLCAyKTtcbiAgICB2YXIgc3RyID0gXCJbXCIuY29uY2F0KGRhdGUsIFwiXSAoXCIpLmNvbmNhdChwYWNrZXRTaXplLCBcIikgPT4gXCIpLmNvbmNhdChtYXliZUFjdGlvblR5cGUsIFwiXFxuXCIpLmNvbmNhdChjb250ZW50KTtcbiAgICB2YXIgX2IgPSBzdHIuc3BsaXQoXCJcXG5cIiksIGZpcnN0TGluZSA9IF9iWzBdLCBvdGhlckxpbmVzID0gX2Iuc2xpY2UoMSk7XG4gICAgcmV0dXJuIF9fc3ByZWFkQXJyYXkoW2ZpcnN0TGluZV0sIG90aGVyTGluZXMsIHRydWUpO1xufVxuLyogZnVuY3Rpb24gbWFrZUxvZ0VudHJ5KHBhY2tldDogRGVidWdnZXJQYWNrZXQpIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHBhY2tldC5fdCkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgY29uc3QgcGFja2V0VHlwZSA9IHBhY2tldC5fZD8udHlwZTtcbiAgY29uc3QgbWF5YmVBY3Rpb25UeXBlID0gcGFja2V0VHlwZSA9PSBudWxsID8gXCJcIiA6IGAke3BhY2tldFR5cGV9ID0+IGA7XG4gIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShwYWNrZXQuX2QsIG51bGwsIDIpO1xuICBjb25zdCBzdHIgPSBgWyR7ZGF0ZX1dOiAke21heWJlQWN0aW9uVHlwZX0ke2NvbnRlbnR9YDtcbiAgY29uc3QgW2ZpcnN0TGluZSwgLi4ub3RoZXJMaW5lc10gPSBzdHIuc3BsaXQoXCJcXG5cIik7XG5cbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgZGV0YWlsc05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGV0YWlsc1wiKTtcbiAgY29uc3Qgc3VtbWFyeU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3VtbWFyeVwiKTtcbiAgY29uc3QgcHJlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIik7XG4gIGNvbnN0IHN1bW1hcnlUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZpcnN0TGluZSk7XG4gIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUob3RoZXJMaW5lcy5qb2luKFwiXFxuXCIpKTtcblxuICBkZXRhaWxzTm9kZS5zZXRBdHRyaWJ1dGUoXCJvcGVuXCIsIFwidHJ1ZVwiKTtcbiAgZGV0YWlsc05vZGUuY2xhc3NMaXN0LmFkZChcImxvZ1wiKTtcbiAgZGV0YWlsc05vZGUuY2xhc3NMaXN0LmFkZChgbG9nLSR7cGFja2V0Ll9rfWApO1xuXG4gIHN1bW1hcnlOb2RlLmFwcGVuZENoaWxkKHN1bW1hcnlUZXh0Tm9kZSk7XG4gIHByZU5vZGUuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICBkZXRhaWxzTm9kZS5hcHBlbmRDaGlsZChzdW1tYXJ5Tm9kZSk7XG4gIGRldGFpbHNOb2RlLmFwcGVuZENoaWxkKHByZU5vZGUpO1xuICBub2RlLmFwcGVuZENoaWxkKGRldGFpbHNOb2RlKTtcblxuICByZXR1cm4gbm9kZTtcbn0gKi9cbnZhciBtYWtlTm9kZVRvZ2dsZUZvbGRpbmcgPSBmdW5jdGlvbiAoYWxsRm9sZGVkKSB7IHJldHVybiBmdW5jdGlvbiAobm9kZSkge1xuICAgIGlmIChhbGxGb2xkZWQpIHtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoXCJvcGVuXCIsIHRydWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoXCJvcGVuXCIpO1xuICAgIH1cbn07IH07XG4oZnVuY3Rpb24gaWlmZSh3c1VyaSkge1xuICAgIGlmICh3c1VyaSA9PT0gdm9pZCAwKSB7IHdzVXJpID0gXCJ3czovL2xvY2FsaG9zdDo4MDgwXCI7IH1cbiAgICBjb25zb2xlLmxvZyhcIltyZ3NoLWRlYnVnZ2VyL3VpXSBIZXksIHdpbGwgY29ubmVjdCB0byB3cyBvbjogXCIuY29uY2F0KHdzVXJpKSk7XG4gICAgdmFyIHdzID0gbmV3IFdlYlNvY2tldCh3c1VyaSk7XG4gICAgdmFyIHN0YXRzID0ge1xuICAgICAgICBkaXNwYXRjaGVkQWN0aW9uczogMCxcbiAgICAgICAgc3RhdGVVcGRhdGVzOiAwLFxuICAgIH07XG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgICBhY3Rpb25zQWxsRm9sZGVkOiBmYWxzZSxcbiAgICAgICAgc3RhdGVBbGxGb2xkZWQ6IGZhbHNlLFxuICAgICAgICBzdGF0ZURpZmZNb2RlOiBmYWxzZSxcbiAgICAgICAgbGFzdFN0YXRlRGF0YTogbnVsbCxcbiAgICAgICAgYWN0aW9uc0ZpbHRlckJ5VmFsdWU6IFwiXCIsXG4gICAgICAgIHN0YXRlRmlsdGVyQnlWYWx1ZTogXCJcIixcbiAgICB9O1xuICAgIHZhciB3c1JlYWR5U3RhdGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd3MtcmVhZHktc3RhdGVcIik7XG4gICAgdmFyIGFjdGlvbnNMb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGlvbnMtZGlzcGF0Y2gtd3JhcHBlclwiKTtcbiAgICB2YXIgYWN0aW9uc0lucHV0RmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC1maWx0ZXItYWN0aW9uc1wiKTtcbiAgICB2YXIgYWN0aW9uc0Rpc3BhdGNoQ291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlzcGF0Y2hlZC1hY3Rpb25zLWNvdW50ZXJcIik7XG4gICAgdmFyIGFjdGlvbnNUb2dnbGVGb2xkaW5nQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG4tYWN0aW9uLXRvZ2dsZS1mb2xkaW5nXCIpO1xuICAgIHZhciBzdGF0ZUxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhdGUtdXBkYXRlcy13cmFwcGVyXCIpO1xuICAgIHZhciBzdGF0ZUlucHV0RmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC1maWx0ZXItc3RhdGVcIik7XG4gICAgdmFyIHN0YXRlVXBkYXRlc0NvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXRlLXVwZGF0ZXMtY291bnRlclwiKTtcbiAgICB2YXIgc3RhdGVEaWZmTW9kZVN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhdGUtZGlmZi1tb2RlXCIpO1xuICAgIHZhciBzdGF0ZVRvZ2dsZUZvbGRpbmdCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bi1zdGF0ZS10b2dnbGUtZm9sZGluZ1wiKTtcbiAgICB2YXIgc3RhdGVUb2dnbGVEaWZmTW9kZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuLXN0YXRlLXRvZ2dsZS1kaWZmLW1vZGVcIik7XG4gICAgZnVuY3Rpb24gbG9nKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHdzUmVhZHlTdGF0ZUVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHdzUmVhZHlTdGF0ZUVsLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB3c09wZW4oXykge1xuICAgICAgICB3cy5zZW5kKFwidGFpbFwiKTtcbiAgICAgICAgbG9nKFwiQ29ubmVjdGVkIVwiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gd3NFcnJvcihldiwgcmVjb25uZWN0V2ViU29ja2V0KSB7XG4gICAgICAgIGxvZyhcIlNvY2tldCBlcnJvcjogXCIgKyBldi5tZXNzYWdlKTtcbiAgICAgICAgcmVjb25uZWN0V2ViU29ja2V0KCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdzQ2xvc2UoX2EsIHJlY29ubmVjdFdlYlNvY2tldCkge1xuICAgICAgICB2YXIgY29kZSA9IF9hLmNvZGUsIHJlYXNvbiA9IF9hLnJlYXNvbjtcbiAgICAgICAgdmFyIHRhZ3MgPSBbXCJjb2RlPVwiLmNvbmNhdChjb2RlIHx8IFwibm9uZVwiKSwgXCJyZWFzb249XCIuY29uY2F0KHJlYXNvbiB8fCBcIm5vbmVcIildO1xuICAgICAgICBsb2coXCJDb25uZWN0aW9uIGNsb3NlZC4gXCIuY29uY2F0KHRhZ3Muam9pbihcIiBcIikpKTtcbiAgICAgICAgcmVjb25uZWN0V2ViU29ja2V0KCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdzTWVzc2FnZShldikge1xuICAgICAgICB2YXIgZGF0YSA9IGV2LmRhdGEudG9TdHJpbmcoKTtcbiAgICAgICAgdmFyIHBhY2tldCA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIHZhciBwYWNrZXRCeXRlcyA9IHN0clRvQnl0ZXNMZW4oZGF0YSk7XG4gICAgICAgIGlmIChwYWNrZXQuX2sgPT09IFwiYWN0aW9uXCIpIHtcbiAgICAgICAgICAgIHN0YXRzLmRpc3BhdGNoZWRBY3Rpb25zICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocGFja2V0Ll9rID09PSBcInN0YXRlXCIpIHtcbiAgICAgICAgICAgIHN0YXRzLnN0YXRlVXBkYXRlcyArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWNrZXQuX2sgPT09IFwic3RhdGVcIiAmJlxuICAgICAgICAgICAgc3RhdGUuc3RhdGVGaWx0ZXJCeVZhbHVlICE9IG51bGwgJiZcbiAgICAgICAgICAgIHN0YXRlLnN0YXRlRmlsdGVyQnlWYWx1ZS50cmltKCkgIT09IFwiXCIgJiZcbiAgICAgICAgICAgIG5lc3RlZEluY2x1ZGVzKHBhY2tldC5fZCwgc3RhdGUuc3RhdGVGaWx0ZXJCeVZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5jbHVkZXNTdGF0ZUZpbHRlcjpcIiwgbmVzdGVkSW5jbHVkZXMocGFja2V0Ll9kLCBzdGF0ZS5zdGF0ZUZpbHRlckJ5VmFsdWUpKTtcbiAgICAgICAgICAgIHJldHVybjsgLy8gc2tpcFxuICAgICAgICB9XG4gICAgICAgIGlmIChwYWNrZXQuX2sgPT09IFwiYWN0aW9uXCIgJiZcbiAgICAgICAgICAgIHN0YXRlLmFjdGlvbnNGaWx0ZXJCeVZhbHVlICE9IG51bGwgJiZcbiAgICAgICAgICAgIHN0YXRlLmFjdGlvbnNGaWx0ZXJCeVZhbHVlLnRyaW0oKSAhPT0gXCJcIiAmJlxuICAgICAgICAgICAgbmVzdGVkSW5jbHVkZXMocGFja2V0Ll9kLCBzdGF0ZS5hY3Rpb25zRmlsdGVyQnlWYWx1ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImluY2x1ZGVzQWN0aW9uc0ZpbHRlcjpcIiwgbmVzdGVkSW5jbHVkZXMocGFja2V0Ll9kLCBzdGF0ZS5hY3Rpb25zRmlsdGVyQnlWYWx1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBza2lwXG4gICAgICAgIH1cbiAgICAgICAgLy9sZXQgbG9nRW50cnk7XG4gICAgICAgIHZhciBsb2dMaW5lcyA9IFtdO1xuICAgICAgICB2YXIgbm9kZVRvVXBkYXRlO1xuICAgICAgICBpZiAocGFja2V0Ll9rID09PSBcInN0YXRlXCIgJiZcbiAgICAgICAgICAgIHN0YXRlLnN0YXRlRGlmZk1vZGUgPT09IHRydWUgJiZcbiAgICAgICAgICAgIHN0YXRlLmxhc3RTdGF0ZURhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGRpZmZSZXN1bHQgPSBkaWZmKHN0YXRlLmxhc3RTdGF0ZURhdGEsIHBhY2tldC5fZCk7XG4gICAgICAgICAgICB2YXIgZGlmZlBhY2tldCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBwYWNrZXQpLCB7IF9kOiBkaWZmUmVzdWx0IH0pO1xuICAgICAgICAgICAgLy9sb2dFbnRyeSA9IG1ha2VMb2dFbnRyeShkaWZmUGFja2V0KTtcbiAgICAgICAgICAgIGxvZ0xpbmVzID0gZ2V0TG9nTGluZXMoZGlmZlBhY2tldCwgc3RyVG9CeXRlc0xlbihKU09OLnN0cmluZ2lmeShkaWZmUGFja2V0KSkpO1xuICAgICAgICAgICAgbm9kZVRvVXBkYXRlID0gc3RhdGVMb2c7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL2xvZ0VudHJ5ID0gbWFrZUxvZ0VudHJ5KHBhY2tldCk7XG4gICAgICAgICAgICBsb2dMaW5lcyA9IGdldExvZ0xpbmVzKHBhY2tldCwgcGFja2V0Qnl0ZXMpO1xuICAgICAgICAgICAgbm9kZVRvVXBkYXRlID0gcGFja2V0Ll9rID09PSBcImFjdGlvblwiID8gYWN0aW9uc0xvZyA6IHN0YXRlTG9nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlVG9VcGRhdGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGpzb25UcmVlVmlld05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgcmVuZGVySlNPTlRyZWVWaWV3KHBhY2tldC5fZCwganNvblRyZWVWaWV3Tm9kZSwge1xuICAgICAgICAgICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGZpcnN0TGluZSA9IGxvZ0xpbmVzWzBdO1xuICAgICAgICAgICAgdmFyIGZpcnN0TGluZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShmaXJzdExpbmUpO1xuICAgICAgICAgICAgdmFyIHdyYXBwZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHdyYXBwZXJOb2RlLmFwcGVuZENoaWxkKGZpcnN0TGluZU5vZGUpO1xuICAgICAgICAgICAgd3JhcHBlck5vZGUuYXBwZW5kQ2hpbGQoanNvblRyZWVWaWV3Tm9kZSk7XG4gICAgICAgICAgICBub2RlVG9VcGRhdGUuYXBwZW5kQ2hpbGQod3JhcHBlck5vZGUpO1xuICAgICAgICAgICAgaWYgKG5vZGVUb1VwZGF0ZS5wYXJlbnRFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBub2RlVG9VcGRhdGUucGFyZW50RWxlbWVudC5zY3JvbGxUb3AgPVxuICAgICAgICAgICAgICAgICAgICBub2RlVG9VcGRhdGUucGFyZW50RWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbnNEaXNwYXRjaENvdW50ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgYWN0aW9uc0Rpc3BhdGNoQ291bnRlci50ZXh0Q29udGVudCA9IFwiKFwiLmNvbmNhdChzdGF0cy5kaXNwYXRjaGVkQWN0aW9ucywgXCIgZGlzcGF0Y2hlcylcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRlVXBkYXRlc0NvdW50ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhdGVVcGRhdGVzQ291bnRlci50ZXh0Q29udGVudCA9IFwiKFwiLmNvbmNhdChzdGF0cy5zdGF0ZVVwZGF0ZXMsIFwiIHVwZGF0ZXMpXCIpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmxhc3RTdGF0ZURhdGEgPSBwYWNrZXQuX2Q7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlY3JlYXRlV2ViU29ja2V0KGJpbmRFdmVudHMsIGZpcnN0VGltZSkge1xuICAgICAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gV1NfUkVBRFlfU1RBVEUuQ2xvc2VkKSB7XG4gICAgICAgICAgICBsb2coXCJMb3N0IGNvbm5lY3Rpb24gdG8gZGVidWdnZXIuIFNsZWVwaW5nIDNzIGJlZm9yZSByZWNvbm5lY3RpbmcuLi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVHJ5IHJlY29ubmVjdGluZyBldmVyeSAzc1xuICAgICAgICB2YXIgcmVjb25uZWN0SW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh3cy5yZWFkeVN0YXRlID09PSBXU19SRUFEWV9TVEFURS5DbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBsb2coXCJUcnlpbmcgdG8gXCIuY29uY2F0KGZpcnN0VGltZSA/IFwicmVcIiA6IFwiXCIsIFwiY29ubmVjdC4uLlwiKSk7XG4gICAgICAgICAgICAgICAgd3MgPSBuZXcgV2ViU29ja2V0KHdzVXJpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdzLnJlYWR5U3RhdGUgPT09IFdTX1JFQURZX1NUQVRFLk9wZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAocmVjb25uZWN0SW50ZXJ2YWxJZCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlY29ubmVjdEludGVydmFsSWQpO1xuICAgICAgICAgICAgICAgICAgICByZWNvbm5lY3RJbnRlcnZhbElkID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgbG9nKGZpcnN0VGltZSA/IFwiQ29ubmVjdGVkIVwiIDogXCJSZS1jb25uZWN0ZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICBiaW5kRXZlbnRzKHdzKTtcbiAgICAgICAgICAgICAgICAgICAgd3Muc2VuZChcInRhaWxcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSwgMTAwMCAqIDMpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBmdW5jdGlvbiBiaW5kV3NFdmVudHMoc29ja2V0KSB7XG4gICAgICAgIHNvY2tldC5vbm9wZW4gPSB3c09wZW47XG4gICAgICAgIHNvY2tldC5vbm1lc3NhZ2UgPSB3c01lc3NhZ2U7XG4gICAgICAgIHNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB3c0Vycm9yKGV2LCByZWNyZWF0ZVdlYlNvY2tldC5iaW5kKG51bGwsIGJpbmRXc0V2ZW50cykpO1xuICAgICAgICB9O1xuICAgICAgICBzb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgd3NDbG9zZShldiwgcmVjcmVhdGVXZWJTb2NrZXQuYmluZChudWxsLCBiaW5kV3NFdmVudHMpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYmluZFdzRXZlbnRzKHdzKTtcbiAgICB3cy5zZW5kKFwidGFpbFwiKTtcbiAgICBhY3Rpb25zSW5wdXRGaWx0ZXIgPT09IG51bGwgfHwgYWN0aW9uc0lucHV0RmlsdGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhY3Rpb25zSW5wdXRGaWx0ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgaWYgKGV2LnRhcmdldC52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZS5hY3Rpb25zRmlsdGVyQnlWYWx1ZSA9IGV2LnRhcmdldC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN0YXRlSW5wdXRGaWx0ZXIgPT09IG51bGwgfHwgc3RhdGVJbnB1dEZpbHRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGVJbnB1dEZpbHRlci5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgICBpZiAoZXYudGFyZ2V0LnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0YXRlLnN0YXRlRmlsdGVyQnlWYWx1ZSA9IGV2LnRhcmdldC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGFjdGlvbnNUb2dnbGVGb2xkaW5nQnV0dG9uID09PSBudWxsIHx8IGFjdGlvbnNUb2dnbGVGb2xkaW5nQnV0dG9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhY3Rpb25zVG9nZ2xlRm9sZGluZ0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWxsQWN0aW9uTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxvZy1hY3Rpb25cIik7XG4gICAgICAgIGFsbEFjdGlvbk5vZGVzLmZvckVhY2gobWFrZU5vZGVUb2dnbGVGb2xkaW5nKHN0YXRlLmFjdGlvbnNBbGxGb2xkZWQpKTtcbiAgICAgICAgc3RhdGUuYWN0aW9uc0FsbEZvbGRlZCA9ICFzdGF0ZS5hY3Rpb25zQWxsRm9sZGVkO1xuICAgIH0pO1xuICAgIHN0YXRlVG9nZ2xlRm9sZGluZ0J1dHRvbiA9PT0gbnVsbCB8fCBzdGF0ZVRvZ2dsZUZvbGRpbmdCdXR0b24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlVG9nZ2xlRm9sZGluZ0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWxsU3RhdGVOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubG9nLXN0YXRlXCIpO1xuICAgICAgICBhbGxTdGF0ZU5vZGVzLmZvckVhY2gobWFrZU5vZGVUb2dnbGVGb2xkaW5nKHN0YXRlLnN0YXRlQWxsRm9sZGVkKSk7XG4gICAgICAgIHN0YXRlLnN0YXRlQWxsRm9sZGVkID0gIXN0YXRlLnN0YXRlQWxsRm9sZGVkO1xuICAgIH0pO1xuICAgIHN0YXRlVG9nZ2xlRGlmZk1vZGVCdXR0b24gPT09IG51bGwgfHwgc3RhdGVUb2dnbGVEaWZmTW9kZUJ1dHRvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGVUb2dnbGVEaWZmTW9kZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGF0ZS5zdGF0ZURpZmZNb2RlID0gIXN0YXRlLnN0YXRlRGlmZk1vZGU7XG4gICAgICAgIGlmIChzdGF0ZURpZmZNb2RlU3RhdHVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0YXRlRGlmZk1vZGVTdGF0dXMudGV4dENvbnRlbnQgPSBzdGF0ZS5zdGF0ZURpZmZNb2RlID8gXCJPblwiIDogXCJPZmZcIjtcbiAgICAgICAgfVxuICAgIH0pO1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==