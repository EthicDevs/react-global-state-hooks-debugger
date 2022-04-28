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
        if (ws.readyState === WS_READY_STATE.Open) {
            return undefined;
        }
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
    recreateWebSocket(bindWsEvents, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qiw2REFBSTtBQUNqQyxpREFBaUQsYUFBYSxnQkFBZ0I7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkVBQWtCO0FBQzlCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL0BldGhpY2RldnMvanNvbi10cmVlLXZpZXcvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9kZWVwLW9iamVjdC1kaWZmL21qcy9hZGRlZC5qcyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9kZWVwLW9iamVjdC1kaWZmL21qcy9kZWxldGVkLmpzIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL2RlZXAtb2JqZWN0LWRpZmYvbWpzL2RldGFpbGVkLmpzIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL2RlZXAtb2JqZWN0LWRpZmYvbWpzL2RpZmYuanMiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvLi9ub2RlX21vZHVsZXMvZGVlcC1vYmplY3QtZGlmZi9tanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvLi9ub2RlX21vZHVsZXMvZGVlcC1vYmplY3QtZGlmZi9tanMvdXBkYXRlZC5qcyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9kZWVwLW9iamVjdC1kaWZmL21qcy91dGlscy5qcyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vZGVidWdnZXItdWkvZGVidWdnZXItdWkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbmFtZSBAZXRoaWNkZXZzL2pzb24tdHJlZS12aWV3XG4gKiBAbGljZW5zZSBNSVRcbiAqIEBtYWludGFpbmVyIDxXaWxsaWFtIE5lbWVuY2hhLCBFdGhpY0RldnMsIGh0dHBzOi8vZ2l0aHViLmNvbS9FdGhpY0RldnMvanNvbi10cmVlLXZpZXc+XG4gKiBAZm9ya2VkLWZyb20gPOWJjeerr+mAmumBjuWFg+e0oOWxleekukpzb27mqLnni4Dos4fmlpnvvIzlm6AsIGh0dHBzOi8vZ2l0aHViLmNvbS95dWRhLWx5dS93LWpzb252aWV3LXRyZWU+XG4gKiBAaXRzZWxmLWZvcmtlZC1mcm9tIDzmspLmnInliqDlhaXpoJDlhYjlsZXplovmlbjmk5rlip/og73vvIzoh6rlt7HkuIvovInkvobkv67mlLksIGh0dHBzOi8vZ2l0aHViLmNvbS9wZ3JhYm92ZXRzL2pzb24tdmlldz5cbiAqL1xuLyoqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge09iamVjdH0ganNvbk9iaiDovLjlhaVKc29u54mp5Lu2XG4gKiBAcGFyYW0ge0VsZW1lbnR9IHJvb3RFbGVtIOi8uOWFpeWIneWni+WMluWFg+e0oFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb249e31dIOi8uOWFpeioreWumueJqeS7tu+8jOmgkOioreeCuuepuueJqeS7tlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9uLmV4cGFuZGVkPWZhbHNlXSDovLjlhaXmmK/lkKbpoJDlhYjlsZXplovvvIzpoJDoqK3ngrpmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVySlNPTlRyZWVWaWV3KGpzb25PYmosIHJvb3RFbGVtLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAvL2RlZmF1bHQgZXhwYW5kZWRcbiAgICB2YXIgX2V4cGFuZGVkID0gZmFsc2U7XG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgLy9nZXQgZXhwYW5kZWRcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIF9leHBhbmRlZCA9IG9wdGlvbnNbXCJleHBhbmRlZFwiXSA9PT0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvL2NsZWFyXG4gICAgICAgIHJvb3RFbGVtLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIC8vYWRkIGNsYXNzXG4gICAgICAgIHJvb3RFbGVtLmNsYXNzTGlzdC5hZGQoXCJDb21wQ3NzREpzb25WaWV3VHJlZVwiKTtcbiAgICAgICAgLy9yZW5kZXJcbiAgICAgICAgdmFyIHRyZWUgPSBjcmVhdGVUcmVlKGpzb25PYmopO1xuICAgICAgICByZW5kZXIodHJlZSwgcm9vdEVsZW0pO1xuICAgICAgICByZXR1cm4gdHJlZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGh0bWwgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIGh0bWwgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIGNvbmZpZykge1xuICAgICAgICB2YXIgaHRtbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgICAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBodG1sRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgaHRtbEVsZW1lbnQuY2xhc3NOYW1lID0gY29uZmlnLmNsYXNzTmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIGh0bWxFbGVtZW50LnRleHRDb250ZW50ID0gY29uZmlnLmNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgY29uZmlnLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbEVsZW1lbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUV4cGFuZGVkRWxlbWVudChub2RlKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICB2YXIgaUVsZW0gPSBjcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICAgICAgaWYgKG5vZGUuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIGlFbGVtLmNsYXNzTmFtZSA9IFwid2ljb24gdy1jYXJldC1kb3duXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpRWxlbS5jbGFzc05hbWUgPSBcIndpY29uIHctY2FyZXQtcmlnaHRcIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FyZXRFbGVtID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IFwid2p2LWNhcmV0LWljb25cIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbaUVsZW1dLFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGhhbmRsZUNsaWNrID0gbm9kZS50b2dnbGUuYmluZChub2RlKTtcbiAgICAgICAgY2FyZXRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG4gICAgICAgIHZhciBpbmRleEVsZW0gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ3anYtanNvbi1pbmRleFwiLFxuICAgICAgICAgICAgY29udGVudDogbm9kZS5rZXksXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdHlwZUVsZW0gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ3anYtanNvbi10eXBlXCIsXG4gICAgICAgICAgICBjb250ZW50OiBub2RlLnR5cGUsXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIga2V5RWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndqdi1qc29uLWtleVwiLFxuICAgICAgICAgICAgY29udGVudDogbm9kZS5rZXksXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2l6ZUVsZW0gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ3anYtanNvbi1zaXplXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSBcImFycmF5XCIpIHtcbiAgICAgICAgICAgIHNpemVFbGVtLmlubmVyVGV4dCA9IFwiW1wiICsgKChfYSA9IG5vZGUuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpICsgXCJdXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobm9kZS50eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBzaXplRWxlbS5pbm5lclRleHQgPSBcIntcIiArICgoX2IgPSBub2RlLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubGVuZ3RoKSArIFwifVwiO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lQ2hpbGRyZW47XG4gICAgICAgIGlmIChub2RlLmtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgbGluZUNoaWxkcmVuID0gW2NhcmV0RWxlbSwgdHlwZUVsZW0sIHNpemVFbGVtXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgoKF9jID0gbm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBub2RlLnBhcmVudCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnR5cGUpID09PSBcImFycmF5XCIpIHtcbiAgICAgICAgICAgIGxpbmVDaGlsZHJlbiA9IFtjYXJldEVsZW0sIGluZGV4RWxlbSwgc2l6ZUVsZW1dO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGluZUNoaWxkcmVuID0gW2NhcmV0RWxlbSwga2V5RWxlbSwgc2l6ZUVsZW1dO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lRWxlbSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndqdi1saW5lXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogbGluZUNoaWxkcmVuLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5vZGUuZGVwdGggPiAwKSB7XG4gICAgICAgICAgICAvL2xpbmVFbGVtLnN0eWxlID0gJ21hcmdpbi1sZWZ0OiAnICsgbm9kZS5kZXB0aCAqIDI0ICsgJ3B4OycgLy9JRTExIHN0cmljdOaooeW8j+S4i+eEoeazleaMh+a0viwgc3R5bGXngrrllK/oroDlsazmgKdcbiAgICAgICAgICAgIGxpbmVFbGVtLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwibWFyZ2luLWxlZnQ6IFwiICsgbm9kZS5kZXB0aCAqIDI0ICsgXCJweDtcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpbmVFbGVtO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbm90IGV4cGFuZGVkIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZU5vdEV4cGFuZGVkRWxlbWVudChub2RlKSB7XG4gICAgICAgIHZhciBjYXJldEVsZW0gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ3anYtZW1wdHktaWNvblwiLFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGtleUVsZW0gPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ3anYtanNvbi1rZXlcIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IG5vZGUua2V5LFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHNlcGFyYXRvckVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ3anYtanNvbi1zZXBhcmF0b3JcIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiOlwiLFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHZhbHVlVHlwZSA9IFwiIHdqdi1qc29uLVwiICsgdHlwZW9mIG5vZGUudmFsdWU7XG4gICAgICAgIHZhciB2YWx1ZUNvbnRlbnQgPSBTdHJpbmcobm9kZS52YWx1ZSk7XG4gICAgICAgIHZhciB2YWx1ZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ3anYtanNvbi12YWx1ZVwiICsgdmFsdWVUeXBlLFxuICAgICAgICAgICAgY29udGVudDogdmFsdWVDb250ZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGxpbmVFbGVtID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IFwid2p2LWxpbmVcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbY2FyZXRFbGVtLCBrZXlFbGVtLCBzZXBhcmF0b3JFbGVtZW50LCB2YWx1ZUVsZW1lbnRdLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5vZGUuZGVwdGggPiAwKSB7XG4gICAgICAgICAgICAvL2xpbmVFbGVtLnN0eWxlID0gJ21hcmdpbi1sZWZ0OiAnICsgbm9kZS5kZXB0aCAqIDI0ICsgJ3B4OycgLy9JRTExIHN0cmljdOaooeW8j+S4i+eEoeazleaMh+a0viwgc3R5bGXngrrllK/oroDlsazmgKdcbiAgICAgICAgICAgIGxpbmVFbGVtLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwibWFyZ2luLWxlZnQ6IFwiICsgbm9kZS5kZXB0aCAqIDI0ICsgXCJweDtcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpbmVFbGVtO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdHJlZSBub2RlXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZU5vZGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IG51bGwsXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICAgIGV4cGFuZGVkOiBfZXhwYW5kZWQsXG4gICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgY2hpbGRyZW46IG51bGwsXG4gICAgICAgICAgICBlbGVtOiBudWxsLFxuICAgICAgICAgICAgZGVwdGg6IDAsXG4gICAgICAgICAgICBzZXRDYXJldEljb25SaWdodDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IChfYSA9IHRoaXMuZWxlbSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoXCIud2ljb25cIik7XG4gICAgICAgICAgICAgICAgaWNvbiA9PT0gbnVsbCB8fCBpY29uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpY29uLmNsYXNzTGlzdC5yZXBsYWNlKFwidy1jYXJldC1kb3duXCIsIFwidy1jYXJldC1yaWdodFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDYXJldEljb25Eb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHZhciBpY29uID0gKF9hID0gdGhpcy5lbGVtKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcihcIi53aWNvblwiKTtcbiAgICAgICAgICAgICAgICBpY29uID09PSBudWxsIHx8IGljb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGljb24uY2xhc3NMaXN0LnJlcGxhY2UoXCJ3LWNhcmV0LXJpZ2h0XCIsIFwidy1jYXJldC1kb3duXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhpZGVDaGlsZHJlbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICAgICAgKF9hID0gaXRlbS5lbGVtKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xhc3NMaXN0LmFkZChcIndqdi1qc29uLWhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGlkZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93Q2hpbGRyZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIChfYSA9IGl0ZW0uZWxlbSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsYXNzTGlzdC5yZW1vdmUoXCJ3anYtanNvbi1oaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnNob3dDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENhcmV0SWNvblJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDYXJldEljb25Eb3duKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHZhcmlhYmxlIHR5cGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFR5cGUodmFsKSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgdHlwZSA9IFwiYXJyYXlcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHR5cGUgPSBcIm51bGxcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVjdXJzaXZlbHkgdHJhdmVyc2UganNvbiBvYmplY3RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIHBhcnNlZCBqc29uIG9iamVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnQgb2Ygb2JqZWN0IHRyZWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0cmF2ZXJzZU9iamVjdChvYmosIHBhcmVudCkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjcmVhdGVOb2RlKCk7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgICBjaGlsZC5rZXkgPSBrZXk7XG4gICAgICAgICAgICBjaGlsZC50eXBlID0gZ2V0VHlwZShvYmpba2V5XSk7XG4gICAgICAgICAgICBjaGlsZC5kZXB0aCA9IHBhcmVudC5kZXB0aCArIDE7XG4gICAgICAgICAgICBjaGlsZC5leHBhbmRlZCA9IF9leHBhbmRlZDtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgICAgIHRyYXZlcnNlT2JqZWN0KG9ialtrZXldLCBjaGlsZCk7XG4gICAgICAgICAgICAgICAgY2hpbGQuZWxlbSA9IGNyZWF0ZUV4cGFuZGVkRWxlbWVudChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGlsZC52YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICAgICAgICAgIGNoaWxkLmVsZW0gPSBjcmVhdGVOb3RFeHBhbmRlZEVsZW1lbnQoY2hpbGQpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSByb290IG9mIGEgdHJlZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogSnNvbiBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlVHJlZShvYmopIHtcbiAgICAgICAgdmFyIHRyZWUgPSBjcmVhdGVOb2RlKCk7XG4gICAgICAgIHRyZWUudHlwZSA9IGdldFR5cGUob2JqKTtcbiAgICAgICAgdHJlZS5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB0cmVlLmV4cGFuZGVkID0gX2V4cGFuZGVkO1xuICAgICAgICB0cmF2ZXJzZU9iamVjdChvYmosIHRyZWUpO1xuICAgICAgICB0cmVlLmVsZW0gPSBjcmVhdGVFeHBhbmRlZEVsZW1lbnQodHJlZSk7XG4gICAgICAgIHJldHVybiB0cmVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWN1cnNpdmVseSB0cmF2ZXJzZSBUcmVlIG9iamVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAgICogQHBhcmFtIHtDYWxsYmFja30gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0cmF2ZXJzZVRyZWUobm9kZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuICE9PSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0cmF2ZXJzZVRyZWUoaXRlbSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIFRyZWUgb2JqZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRyZWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcm9vdEVsZW1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZW5kZXIodHJlZSwgcm9vdEVsZW0pIHtcbiAgICAgICAgdHJhdmVyc2VUcmVlKHRyZWUsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICBpZiAoIW5vZGUuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICBub2RlLmhpZGVDaGlsZHJlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUuZWxlbSkge1xuICAgICAgICAgICAgICAgIHJvb3RFbGVtLmFwcGVuZENoaWxkKG5vZGUuZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gaW5pdCgpO1xufVxuIiwiaW1wb3J0IHsgaXNFbXB0eSwgaXNPYmplY3QsIGhhc093blByb3BlcnR5IH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNvbnN0IGFkZGVkRGlmZiA9IChsaHMsIHJocykgPT4ge1xuXG4gIGlmIChsaHMgPT09IHJocyB8fCAhaXNPYmplY3QobGhzKSB8fCAhaXNPYmplY3QocmhzKSkgcmV0dXJuIHt9O1xuXG4gIGNvbnN0IGwgPSBsaHM7XG4gIGNvbnN0IHIgPSByaHM7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkobCwga2V5KSkge1xuICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IGFkZGVkRGlmZihsW2tleV0sIHJba2V5XSk7XG5cbiAgICAgIGlmIChpc09iamVjdChkaWZmZXJlbmNlKSAmJiBpc0VtcHR5KGRpZmZlcmVuY2UpKSByZXR1cm4gYWNjO1xuXG4gICAgICBhY2Nba2V5XSA9IGRpZmZlcmVuY2U7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH1cblxuICAgIGFjY1trZXldID0gcltrZXldO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFkZGVkRGlmZjtcbiIsImltcG9ydCB7IGlzRW1wdHksIGlzT2JqZWN0LCBoYXNPd25Qcm9wZXJ0eSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5jb25zdCBkZWxldGVkRGlmZiA9IChsaHMsIHJocykgPT4ge1xuICBpZiAobGhzID09PSByaHMgfHwgIWlzT2JqZWN0KGxocykgfHwgIWlzT2JqZWN0KHJocykpIHJldHVybiB7fTtcblxuICBjb25zdCBsID0gbGhzO1xuICBjb25zdCByID0gcmhzO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhsKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHIsIGtleSkpIHtcbiAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBkZWxldGVkRGlmZihsW2tleV0sIHJba2V5XSk7XG5cbiAgICAgIGlmIChpc09iamVjdChkaWZmZXJlbmNlKSAmJiBpc0VtcHR5KGRpZmZlcmVuY2UpKSByZXR1cm4gYWNjO1xuXG4gICAgICBhY2Nba2V5XSA9IGRpZmZlcmVuY2U7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH1cblxuICAgIGFjY1trZXldID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlbGV0ZWREaWZmO1xuIiwiaW1wb3J0IGFkZGVkRGlmZiBmcm9tICcuL2FkZGVkLmpzJztcbmltcG9ydCBkZWxldGVkRGlmZiBmcm9tICcuL2RlbGV0ZWQuanMnO1xuaW1wb3J0IHVwZGF0ZWREaWZmIGZyb20gJy4vdXBkYXRlZC5qcyc7XG5cbmNvbnN0IGRldGFpbGVkRGlmZiA9IChsaHMsIHJocykgPT4gKHtcbiAgYWRkZWQ6IGFkZGVkRGlmZihsaHMsIHJocyksXG4gIGRlbGV0ZWQ6IGRlbGV0ZWREaWZmKGxocywgcmhzKSxcbiAgdXBkYXRlZDogdXBkYXRlZERpZmYobGhzLCByaHMpLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRldGFpbGVkRGlmZjtcbiIsImltcG9ydCB7IGlzRGF0ZSwgaXNFbXB0eU9iamVjdCwgaXNPYmplY3QsIGhhc093blByb3BlcnR5IH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNvbnN0IGRpZmYgPSAobGhzLCByaHMpID0+IHtcbiAgaWYgKGxocyA9PT0gcmhzKSByZXR1cm4ge307IC8vIGVxdWFsIHJldHVybiBubyBkaWZmXG5cbiAgaWYgKCFpc09iamVjdChsaHMpIHx8ICFpc09iamVjdChyaHMpKSByZXR1cm4gcmhzOyAvLyByZXR1cm4gdXBkYXRlZCByaHNcblxuICBjb25zdCBsID0gbGhzO1xuICBjb25zdCByID0gcmhzO1xuXG4gIGNvbnN0IGRlbGV0ZWRWYWx1ZXMgPSBPYmplY3Qua2V5cyhsKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShyLCBrZXkpKSB7XG4gICAgICBhY2Nba2V5XSA9IHVuZGVmaW5lZDtcbiAgICAgIFxuICAgIH1cblxuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcblxuICBpZiAoaXNEYXRlKGwpIHx8IGlzRGF0ZShyKSkge1xuICAgIGlmIChsLnZhbHVlT2YoKSA9PSByLnZhbHVlT2YoKSkgcmV0dXJuIHt9O1xuICAgIHJldHVybiByO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBpZiAoIWhhc093blByb3BlcnR5KGwsIGtleSkpe1xuICAgICAgYWNjW2tleV0gPSByW2tleV07IC8vIHJldHVybiBhZGRlZCByIGtleVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9IFxuXG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IGRpZmYobFtrZXldLCByW2tleV0pO1xuXG4gICAgLy8gSWYgdGhlIGRpZmZlcmVuY2UgaXMgZW1wdHksIGFuZCB0aGUgbGhzIGlzIGFuIGVtcHR5IG9iamVjdCBvciB0aGUgcmhzIGlzIG5vdCBhbiBlbXB0eSBvYmplY3RcbiAgICBpZiAoaXNFbXB0eU9iamVjdChkaWZmZXJlbmNlKSAmJiAhaXNEYXRlKGRpZmZlcmVuY2UpICYmIChpc0VtcHR5T2JqZWN0KGxba2V5XSkgfHwgIWlzRW1wdHlPYmplY3QocltrZXldKSkpXG4gICAgICByZXR1cm4gYWNjOyAvLyByZXR1cm4gbm8gZGlmZlxuXG4gICAgYWNjW2tleV0gPSBkaWZmZXJlbmNlIC8vIHJldHVybiB1cGRhdGVkIGtleVxuICAgIHJldHVybiBhY2M7IC8vIHJldHVybiB1cGRhdGVkIGtleVxuICB9LCBkZWxldGVkVmFsdWVzKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpZmY7XG4iLCJpbXBvcnQgZGlmZiBmcm9tICcuL2RpZmYuanMnO1xuaW1wb3J0IGFkZGVkRGlmZiBmcm9tICcuL2FkZGVkLmpzJztcbmltcG9ydCBkZWxldGVkRGlmZiBmcm9tICcuL2RlbGV0ZWQuanMnO1xuaW1wb3J0IHVwZGF0ZWREaWZmIGZyb20gJy4vdXBkYXRlZC5qcyc7XG5pbXBvcnQgZGV0YWlsZWREaWZmIGZyb20gJy4vZGV0YWlsZWQuanMnO1xuXG5leHBvcnQge1xuICBhZGRlZERpZmYsXG4gIGRpZmYsXG4gIGRlbGV0ZWREaWZmLFxuICB1cGRhdGVkRGlmZixcbiAgZGV0YWlsZWREaWZmXG59O1xuIiwiaW1wb3J0IHsgaXNEYXRlLCBpc0VtcHR5T2JqZWN0LCBpc09iamVjdCwgaGFzT3duUHJvcGVydHkgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuY29uc3QgdXBkYXRlZERpZmYgPSAobGhzLCByaHMpID0+IHtcbiAgaWYgKGxocyA9PT0gcmhzKSByZXR1cm4ge307XG5cbiAgaWYgKCFpc09iamVjdChsaHMpIHx8ICFpc09iamVjdChyaHMpKSByZXR1cm4gcmhzO1xuXG4gIGNvbnN0IGwgPSBsaHM7XG4gIGNvbnN0IHIgPSByaHM7XG5cbiAgaWYgKGlzRGF0ZShsKSB8fCBpc0RhdGUocikpIHtcbiAgICBpZiAobC52YWx1ZU9mKCkgPT0gci52YWx1ZU9mKCkpIHJldHVybiB7fTtcbiAgICByZXR1cm4gcjtcbiAgfVxuXG4gIHJldHVybiBPYmplY3Qua2V5cyhyKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KGwsIGtleSkpIHtcbiAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB1cGRhdGVkRGlmZihsW2tleV0sIHJba2V5XSk7XG5cbiAgICAgIC8vIElmIHRoZSBkaWZmZXJlbmNlIGlzIGVtcHR5LCBhbmQgdGhlIGxocyBpcyBhbiBlbXB0eSBvYmplY3Qgb3IgdGhlIHJocyBpcyBub3QgYW4gZW1wdHkgb2JqZWN0XG4gICAgICBpZiAoaXNFbXB0eU9iamVjdChkaWZmZXJlbmNlKSAmJiAhaXNEYXRlKGRpZmZlcmVuY2UpICYmIChpc0VtcHR5T2JqZWN0KGxba2V5XSkgfHwgIWlzRW1wdHlPYmplY3QocltrZXldKSkpXG4gICAgICAgIHJldHVybiBhY2M7IC8vIHJldHVybiBubyBkaWZmXG5cbiAgICAgIGFjY1trZXldID0gZGlmZmVyZW5jZTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlZERpZmY7XG4iLCJleHBvcnQgY29uc3QgaXNEYXRlID0gZCA9PiBkIGluc3RhbmNlb2YgRGF0ZTtcbmV4cG9ydCBjb25zdCBpc0VtcHR5ID0gbyA9PiBPYmplY3Qua2V5cyhvKS5sZW5ndGggPT09IDA7XG5leHBvcnQgY29uc3QgaXNPYmplY3QgPSBvID0+IG8gIT0gbnVsbCAmJiB0eXBlb2YgbyA9PT0gJ29iamVjdCc7XG5leHBvcnQgY29uc3QgaGFzT3duUHJvcGVydHkgPSAobywgLi4uYXJncykgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIC4uLmFyZ3MpXG5leHBvcnQgY29uc3QgaXNFbXB0eU9iamVjdCA9IChvKSA9PiBpc09iamVjdChvKSAmJiBpc0VtcHR5KG8pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59O1xuaW1wb3J0IHsgcmVuZGVySlNPTlRyZWVWaWV3IH0gZnJvbSBcIkBldGhpY2RldnMvanNvbi10cmVlLXZpZXdcIjtcbmltcG9ydCB7IHVwZGF0ZWREaWZmIGFzIGRpZmYgfSBmcm9tIFwiZGVlcC1vYmplY3QtZGlmZlwiO1xuZXhwb3J0IHZhciBXU19SRUFEWV9TVEFURTtcbihmdW5jdGlvbiAoV1NfUkVBRFlfU1RBVEUpIHtcbiAgICBXU19SRUFEWV9TVEFURVtXU19SRUFEWV9TVEFURVtcIkNvbm5lY3RpbmdcIl0gPSAwXSA9IFwiQ29ubmVjdGluZ1wiO1xuICAgIFdTX1JFQURZX1NUQVRFW1dTX1JFQURZX1NUQVRFW1wiT3BlblwiXSA9IDFdID0gXCJPcGVuXCI7XG4gICAgV1NfUkVBRFlfU1RBVEVbV1NfUkVBRFlfU1RBVEVbXCJDbG9zaW5nXCJdID0gMl0gPSBcIkNsb3NpbmdcIjtcbiAgICBXU19SRUFEWV9TVEFURVtXU19SRUFEWV9TVEFURVtcIkNsb3NlZFwiXSA9IDNdID0gXCJDbG9zZWRcIjtcbn0pKFdTX1JFQURZX1NUQVRFIHx8IChXU19SRUFEWV9TVEFURSA9IHt9KSk7XG5mdW5jdGlvbiBuZXN0ZWRJbmNsdWRlcyhvYmosIHRvTWF0Y2gpIHtcbiAgICB2YXIgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG9iaik7XG4gICAgdmFyIG1hcHBlZEVudHJpZXMgPSBlbnRyaWVzLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIGsgPSBfYVswXSwgdiA9IF9hWzFdO1xuICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBbaywgbmVzdGVkSW5jbHVkZXModiwgdG9NYXRjaCldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgICAgICAgIHR5cGVvZiB2ID09PSBcInVuZGVmaW5lZFwiIHx8XG4gICAgICAgICAgICB0eXBlb2YgdiA9PT0gXCJzeW1ib2xcIiB8fFxuICAgICAgICAgICAgdHlwZW9mIHYgPT09IFwiYmlnaW50XCIgfHxcbiAgICAgICAgICAgIHR5cGVvZiB2ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gW2ssIGZhbHNlXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIFtrLCB2LmluY2x1ZGVzKHRvTWF0Y2gpXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbaywgZmFsc2VdO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hcHBlZEVudHJpZXMuc29tZShmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIF8gPSBfYVswXSwgdiA9IF9hWzFdO1xuICAgICAgICByZXR1cm4gdiA9PT0gdHJ1ZTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHN0clRvQnl0ZXNMZW4oc3RyKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShzdHIpLmxlbmd0aDtcbiAgICB9XG4gICAgY2F0Y2ggKF8pIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGh1bWFuRmlsZVNpemUoYnl0ZXMsIHNpLCBkcCkge1xuICAgIGlmIChzaSA9PT0gdm9pZCAwKSB7IHNpID0gZmFsc2U7IH1cbiAgICBpZiAoZHAgPT09IHZvaWQgMCkgeyBkcCA9IDE7IH1cbiAgICB2YXIgdGhyZXNoID0gc2kgPyAxMDAwIDogMTAyNDtcbiAgICBpZiAoTWF0aC5hYnMoYnl0ZXMpIDwgdGhyZXNoKSB7XG4gICAgICAgIHJldHVybiBieXRlcyArIFwiIEJcIjtcbiAgICB9XG4gICAgdmFyIHVuaXRzID0gc2lcbiAgICAgICAgPyBbXCJrQlwiLCBcIk1CXCIsIFwiR0JcIiwgXCJUQlwiLCBcIlBCXCIsIFwiRUJcIiwgXCJaQlwiLCBcIllCXCJdXG4gICAgICAgIDogW1wiS2lCXCIsIFwiTWlCXCIsIFwiR2lCXCIsIFwiVGlCXCIsIFwiUGlCXCIsIFwiRWlCXCIsIFwiWmlCXCIsIFwiWWlCXCJdO1xuICAgIHZhciB1ID0gLTE7XG4gICAgdmFyIHIgPSBNYXRoLnBvdygxMCwgZHApO1xuICAgIGRvIHtcbiAgICAgICAgYnl0ZXMgLz0gdGhyZXNoO1xuICAgICAgICArK3U7XG4gICAgfSB3aGlsZSAoTWF0aC5yb3VuZChNYXRoLmFicyhieXRlcykgKiByKSAvIHIgPj0gdGhyZXNoICYmXG4gICAgICAgIHUgPCB1bml0cy5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gYnl0ZXMudG9GaXhlZChkcCkgKyBcIiBcIiArIHVuaXRzW3VdO1xufVxuZnVuY3Rpb24gZ2V0TG9nTGluZXMocGFja2V0LCBwYWNrZXRCeXRlcykge1xuICAgIHZhciBfYTtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHBhY2tldC5fdCkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICB2YXIgcGFja2V0VHlwZSA9IChfYSA9IHBhY2tldC5fZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnR5cGU7XG4gICAgdmFyIHBhY2tldFNpemUgPSBodW1hbkZpbGVTaXplKHBhY2tldEJ5dGVzKTtcbiAgICB2YXIgbWF5YmVBY3Rpb25UeXBlID0gcGFja2V0VHlwZSA9PSBudWxsID8gXCJcIiA6IFwiXCIuY29uY2F0KHBhY2tldFR5cGUsIFwiID0+IFwiKTtcbiAgICB2YXIgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KHBhY2tldC5fZCwgbnVsbCwgMik7XG4gICAgdmFyIHN0ciA9IFwiW1wiLmNvbmNhdChkYXRlLCBcIl0gKFwiKS5jb25jYXQocGFja2V0U2l6ZSwgXCIpID0+IFwiKS5jb25jYXQobWF5YmVBY3Rpb25UeXBlLCBcIlxcblwiKS5jb25jYXQoY29udGVudCk7XG4gICAgdmFyIF9iID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBmaXJzdExpbmUgPSBfYlswXSwgb3RoZXJMaW5lcyA9IF9iLnNsaWNlKDEpO1xuICAgIHJldHVybiBfX3NwcmVhZEFycmF5KFtmaXJzdExpbmVdLCBvdGhlckxpbmVzLCB0cnVlKTtcbn1cbi8qIGZ1bmN0aW9uIG1ha2VMb2dFbnRyeShwYWNrZXQ6IERlYnVnZ2VyUGFja2V0KSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShwYWNrZXQuX3QpLnRvTG9jYWxlU3RyaW5nKCk7XG4gIGNvbnN0IHBhY2tldFR5cGUgPSBwYWNrZXQuX2Q/LnR5cGU7XG4gIGNvbnN0IG1heWJlQWN0aW9uVHlwZSA9IHBhY2tldFR5cGUgPT0gbnVsbCA/IFwiXCIgOiBgJHtwYWNrZXRUeXBlfSA9PiBgO1xuICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkocGFja2V0Ll9kLCBudWxsLCAyKTtcbiAgY29uc3Qgc3RyID0gYFske2RhdGV9XTogJHttYXliZUFjdGlvblR5cGV9JHtjb250ZW50fWA7XG4gIGNvbnN0IFtmaXJzdExpbmUsIC4uLm90aGVyTGluZXNdID0gc3RyLnNwbGl0KFwiXFxuXCIpO1xuXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGNvbnN0IGRldGFpbHNOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRldGFpbHNcIik7XG4gIGNvbnN0IHN1bW1hcnlOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN1bW1hcnlcIik7XG4gIGNvbnN0IHByZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicHJlXCIpO1xuICBjb25zdCBzdW1tYXJ5VGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShmaXJzdExpbmUpO1xuICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG90aGVyTGluZXMuam9pbihcIlxcblwiKSk7XG5cbiAgZGV0YWlsc05vZGUuc2V0QXR0cmlidXRlKFwib3BlblwiLCBcInRydWVcIik7XG4gIGRldGFpbHNOb2RlLmNsYXNzTGlzdC5hZGQoXCJsb2dcIik7XG4gIGRldGFpbHNOb2RlLmNsYXNzTGlzdC5hZGQoYGxvZy0ke3BhY2tldC5fa31gKTtcblxuICBzdW1tYXJ5Tm9kZS5hcHBlbmRDaGlsZChzdW1tYXJ5VGV4dE5vZGUpO1xuICBwcmVOb2RlLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgZGV0YWlsc05vZGUuYXBwZW5kQ2hpbGQoc3VtbWFyeU5vZGUpO1xuICBkZXRhaWxzTm9kZS5hcHBlbmRDaGlsZChwcmVOb2RlKTtcbiAgbm9kZS5hcHBlbmRDaGlsZChkZXRhaWxzTm9kZSk7XG5cbiAgcmV0dXJuIG5vZGU7XG59ICovXG52YXIgbWFrZU5vZGVUb2dnbGVGb2xkaW5nID0gZnVuY3Rpb24gKGFsbEZvbGRlZCkgeyByZXR1cm4gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAoYWxsRm9sZGVkKSB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFwib3BlblwiLCB0cnVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKFwib3BlblwiKTtcbiAgICB9XG59OyB9O1xuKGZ1bmN0aW9uIGlpZmUod3NVcmkpIHtcbiAgICBpZiAod3NVcmkgPT09IHZvaWQgMCkgeyB3c1VyaSA9IFwid3M6Ly9sb2NhbGhvc3Q6ODA4MFwiOyB9XG4gICAgY29uc29sZS5sb2coXCJbcmdzaC1kZWJ1Z2dlci91aV0gSGV5LCB3aWxsIGNvbm5lY3QgdG8gd3Mgb246IFwiLmNvbmNhdCh3c1VyaSkpO1xuICAgIHZhciB3cyA9IG5ldyBXZWJTb2NrZXQod3NVcmkpO1xuICAgIHZhciBzdGF0cyA9IHtcbiAgICAgICAgZGlzcGF0Y2hlZEFjdGlvbnM6IDAsXG4gICAgICAgIHN0YXRlVXBkYXRlczogMCxcbiAgICB9O1xuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgICAgYWN0aW9uc0FsbEZvbGRlZDogZmFsc2UsXG4gICAgICAgIHN0YXRlQWxsRm9sZGVkOiBmYWxzZSxcbiAgICAgICAgc3RhdGVEaWZmTW9kZTogZmFsc2UsXG4gICAgICAgIGxhc3RTdGF0ZURhdGE6IG51bGwsXG4gICAgICAgIGFjdGlvbnNGaWx0ZXJCeVZhbHVlOiBcIlwiLFxuICAgICAgICBzdGF0ZUZpbHRlckJ5VmFsdWU6IFwiXCIsXG4gICAgfTtcbiAgICB2YXIgd3NSZWFkeVN0YXRlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dzLXJlYWR5LXN0YXRlXCIpO1xuICAgIHZhciBhY3Rpb25zTG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3Rpb25zLWRpc3BhdGNoLXdyYXBwZXJcIik7XG4gICAgdmFyIGFjdGlvbnNJbnB1dEZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtZmlsdGVyLWFjdGlvbnNcIik7XG4gICAgdmFyIGFjdGlvbnNEaXNwYXRjaENvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rpc3BhdGNoZWQtYWN0aW9ucy1jb3VudGVyXCIpO1xuICAgIHZhciBhY3Rpb25zVG9nZ2xlRm9sZGluZ0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuLWFjdGlvbi10b2dnbGUtZm9sZGluZ1wiKTtcbiAgICB2YXIgc3RhdGVMb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXRlLXVwZGF0ZXMtd3JhcHBlclwiKTtcbiAgICB2YXIgc3RhdGVJbnB1dEZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtZmlsdGVyLXN0YXRlXCIpO1xuICAgIHZhciBzdGF0ZVVwZGF0ZXNDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGF0ZS11cGRhdGVzLWNvdW50ZXJcIik7XG4gICAgdmFyIHN0YXRlRGlmZk1vZGVTdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXRlLWRpZmYtbW9kZVwiKTtcbiAgICB2YXIgc3RhdGVUb2dnbGVGb2xkaW5nQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG4tc3RhdGUtdG9nZ2xlLWZvbGRpbmdcIik7XG4gICAgdmFyIHN0YXRlVG9nZ2xlRGlmZk1vZGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bi1zdGF0ZS10b2dnbGUtZGlmZi1tb2RlXCIpO1xuICAgIGZ1bmN0aW9uIGxvZyhtZXNzYWdlKSB7XG4gICAgICAgIGlmICh3c1JlYWR5U3RhdGVFbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB3c1JlYWR5U3RhdGVFbC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gd3NPcGVuKF8pIHtcbiAgICAgICAgd3Muc2VuZChcInRhaWxcIik7XG4gICAgICAgIGxvZyhcIkNvbm5lY3RlZCFcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdzRXJyb3IoZXYsIHJlY29ubmVjdFdlYlNvY2tldCkge1xuICAgICAgICBsb2coXCJTb2NrZXQgZXJyb3I6IFwiICsgZXYubWVzc2FnZSk7XG4gICAgICAgIHJlY29ubmVjdFdlYlNvY2tldCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3c0Nsb3NlKF9hLCByZWNvbm5lY3RXZWJTb2NrZXQpIHtcbiAgICAgICAgdmFyIGNvZGUgPSBfYS5jb2RlLCByZWFzb24gPSBfYS5yZWFzb247XG4gICAgICAgIHZhciB0YWdzID0gW1wiY29kZT1cIi5jb25jYXQoY29kZSB8fCBcIm5vbmVcIiksIFwicmVhc29uPVwiLmNvbmNhdChyZWFzb24gfHwgXCJub25lXCIpXTtcbiAgICAgICAgbG9nKFwiQ29ubmVjdGlvbiBjbG9zZWQuIFwiLmNvbmNhdCh0YWdzLmpvaW4oXCIgXCIpKSk7XG4gICAgICAgIHJlY29ubmVjdFdlYlNvY2tldCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3c01lc3NhZ2UoZXYpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBldi5kYXRhLnRvU3RyaW5nKCk7XG4gICAgICAgIHZhciBwYWNrZXQgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB2YXIgcGFja2V0Qnl0ZXMgPSBzdHJUb0J5dGVzTGVuKGRhdGEpO1xuICAgICAgICBpZiAocGFja2V0Ll9rID09PSBcImFjdGlvblwiKSB7XG4gICAgICAgICAgICBzdGF0cy5kaXNwYXRjaGVkQWN0aW9ucyArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhY2tldC5fayA9PT0gXCJzdGF0ZVwiKSB7XG4gICAgICAgICAgICBzdGF0cy5zdGF0ZVVwZGF0ZXMgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFja2V0Ll9rID09PSBcInN0YXRlXCIgJiZcbiAgICAgICAgICAgIHN0YXRlLnN0YXRlRmlsdGVyQnlWYWx1ZSAhPSBudWxsICYmXG4gICAgICAgICAgICBzdGF0ZS5zdGF0ZUZpbHRlckJ5VmFsdWUudHJpbSgpICE9PSBcIlwiICYmXG4gICAgICAgICAgICBuZXN0ZWRJbmNsdWRlcyhwYWNrZXQuX2QsIHN0YXRlLnN0YXRlRmlsdGVyQnlWYWx1ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImluY2x1ZGVzU3RhdGVGaWx0ZXI6XCIsIG5lc3RlZEluY2x1ZGVzKHBhY2tldC5fZCwgc3RhdGUuc3RhdGVGaWx0ZXJCeVZhbHVlKSk7XG4gICAgICAgICAgICByZXR1cm47IC8vIHNraXBcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFja2V0Ll9rID09PSBcImFjdGlvblwiICYmXG4gICAgICAgICAgICBzdGF0ZS5hY3Rpb25zRmlsdGVyQnlWYWx1ZSAhPSBudWxsICYmXG4gICAgICAgICAgICBzdGF0ZS5hY3Rpb25zRmlsdGVyQnlWYWx1ZS50cmltKCkgIT09IFwiXCIgJiZcbiAgICAgICAgICAgIG5lc3RlZEluY2x1ZGVzKHBhY2tldC5fZCwgc3RhdGUuYWN0aW9uc0ZpbHRlckJ5VmFsdWUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbmNsdWRlc0FjdGlvbnNGaWx0ZXI6XCIsIG5lc3RlZEluY2x1ZGVzKHBhY2tldC5fZCwgc3RhdGUuYWN0aW9uc0ZpbHRlckJ5VmFsdWUpKTtcbiAgICAgICAgICAgIHJldHVybjsgLy8gc2tpcFxuICAgICAgICB9XG4gICAgICAgIC8vbGV0IGxvZ0VudHJ5O1xuICAgICAgICB2YXIgbG9nTGluZXMgPSBbXTtcbiAgICAgICAgdmFyIG5vZGVUb1VwZGF0ZTtcbiAgICAgICAgaWYgKHBhY2tldC5fayA9PT0gXCJzdGF0ZVwiICYmXG4gICAgICAgICAgICBzdGF0ZS5zdGF0ZURpZmZNb2RlID09PSB0cnVlICYmXG4gICAgICAgICAgICBzdGF0ZS5sYXN0U3RhdGVEYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBkaWZmUmVzdWx0ID0gZGlmZihzdGF0ZS5sYXN0U3RhdGVEYXRhLCBwYWNrZXQuX2QpO1xuICAgICAgICAgICAgdmFyIGRpZmZQYWNrZXQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcGFja2V0KSwgeyBfZDogZGlmZlJlc3VsdCB9KTtcbiAgICAgICAgICAgIC8vbG9nRW50cnkgPSBtYWtlTG9nRW50cnkoZGlmZlBhY2tldCk7XG4gICAgICAgICAgICBsb2dMaW5lcyA9IGdldExvZ0xpbmVzKGRpZmZQYWNrZXQsIHN0clRvQnl0ZXNMZW4oSlNPTi5zdHJpbmdpZnkoZGlmZlBhY2tldCkpKTtcbiAgICAgICAgICAgIG5vZGVUb1VwZGF0ZSA9IHN0YXRlTG9nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy9sb2dFbnRyeSA9IG1ha2VMb2dFbnRyeShwYWNrZXQpO1xuICAgICAgICAgICAgbG9nTGluZXMgPSBnZXRMb2dMaW5lcyhwYWNrZXQsIHBhY2tldEJ5dGVzKTtcbiAgICAgICAgICAgIG5vZGVUb1VwZGF0ZSA9IHBhY2tldC5fayA9PT0gXCJhY3Rpb25cIiA/IGFjdGlvbnNMb2cgOiBzdGF0ZUxvZztcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZVRvVXBkYXRlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBqc29uVHJlZVZpZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHJlbmRlckpTT05UcmVlVmlldyhwYWNrZXQuX2QsIGpzb25UcmVlVmlld05vZGUsIHtcbiAgICAgICAgICAgICAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBmaXJzdExpbmUgPSBsb2dMaW5lc1swXTtcbiAgICAgICAgICAgIHZhciBmaXJzdExpbmVOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZmlyc3RMaW5lKTtcbiAgICAgICAgICAgIHZhciB3cmFwcGVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICB3cmFwcGVyTm9kZS5hcHBlbmRDaGlsZChmaXJzdExpbmVOb2RlKTtcbiAgICAgICAgICAgIHdyYXBwZXJOb2RlLmFwcGVuZENoaWxkKGpzb25UcmVlVmlld05vZGUpO1xuICAgICAgICAgICAgbm9kZVRvVXBkYXRlLmFwcGVuZENoaWxkKHdyYXBwZXJOb2RlKTtcbiAgICAgICAgICAgIGlmIChub2RlVG9VcGRhdGUucGFyZW50RWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbm9kZVRvVXBkYXRlLnBhcmVudEVsZW1lbnQuc2Nyb2xsVG9wID1cbiAgICAgICAgICAgICAgICAgICAgbm9kZVRvVXBkYXRlLnBhcmVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb25zRGlzcGF0Y2hDb3VudGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFjdGlvbnNEaXNwYXRjaENvdW50ZXIudGV4dENvbnRlbnQgPSBcIihcIi5jb25jYXQoc3RhdHMuZGlzcGF0Y2hlZEFjdGlvbnMsIFwiIGRpc3BhdGNoZXMpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0ZVVwZGF0ZXNDb3VudGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0YXRlVXBkYXRlc0NvdW50ZXIudGV4dENvbnRlbnQgPSBcIihcIi5jb25jYXQoc3RhdHMuc3RhdGVVcGRhdGVzLCBcIiB1cGRhdGVzKVwiKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5sYXN0U3RhdGVEYXRhID0gcGFja2V0Ll9kO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWNyZWF0ZVdlYlNvY2tldChiaW5kRXZlbnRzLCBmaXJzdFRpbWUpIHtcbiAgICAgICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IFdTX1JFQURZX1NUQVRFLk9wZW4pIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IFdTX1JFQURZX1NUQVRFLkNsb3NlZCkge1xuICAgICAgICAgICAgbG9nKFwiTG9zdCBjb25uZWN0aW9uIHRvIGRlYnVnZ2VyLiBTbGVlcGluZyAzcyBiZWZvcmUgcmVjb25uZWN0aW5nLi4uXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRyeSByZWNvbm5lY3RpbmcgZXZlcnkgM3NcbiAgICAgICAgdmFyIHJlY29ubmVjdEludGVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gV1NfUkVBRFlfU1RBVEUuQ2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgbG9nKFwiVHJ5aW5nIHRvIFwiLmNvbmNhdChmaXJzdFRpbWUgPyBcInJlXCIgOiBcIlwiLCBcImNvbm5lY3QuLi5cIikpO1xuICAgICAgICAgICAgICAgIHdzID0gbmV3IFdlYlNvY2tldCh3c1VyaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh3cy5yZWFkeVN0YXRlID09PSBXU19SRUFEWV9TVEFURS5PcGVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlY29ubmVjdEludGVydmFsSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWNvbm5lY3RJbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICAgICAgcmVjb25uZWN0SW50ZXJ2YWxJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGxvZyhmaXJzdFRpbWUgPyBcIkNvbm5lY3RlZCFcIiA6IFwiUmUtY29ubmVjdGVkIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYmluZEV2ZW50cyh3cyk7XG4gICAgICAgICAgICAgICAgICAgIHdzLnNlbmQoXCJ0YWlsXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0sIDEwMDAgKiAzKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZnVuY3Rpb24gYmluZFdzRXZlbnRzKHNvY2tldCkge1xuICAgICAgICBzb2NrZXQub25vcGVuID0gd3NPcGVuO1xuICAgICAgICBzb2NrZXQub25tZXNzYWdlID0gd3NNZXNzYWdlO1xuICAgICAgICBzb2NrZXQub25lcnJvciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgd3NFcnJvcihldiwgcmVjcmVhdGVXZWJTb2NrZXQuYmluZChudWxsLCBiaW5kV3NFdmVudHMpKTtcbiAgICAgICAgfTtcbiAgICAgICAgc29ja2V0Lm9uY2xvc2UgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHdzQ2xvc2UoZXYsIHJlY3JlYXRlV2ViU29ja2V0LmJpbmQobnVsbCwgYmluZFdzRXZlbnRzKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlY3JlYXRlV2ViU29ja2V0KGJpbmRXc0V2ZW50cywgdHJ1ZSk7XG4gICAgYWN0aW9uc0lucHV0RmlsdGVyID09PSBudWxsIHx8IGFjdGlvbnNJbnB1dEZpbHRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogYWN0aW9uc0lucHV0RmlsdGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgIGlmIChldi50YXJnZXQudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhdGUuYWN0aW9uc0ZpbHRlckJ5VmFsdWUgPSBldi50YXJnZXQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBzdGF0ZUlucHV0RmlsdGVyID09PSBudWxsIHx8IHN0YXRlSW5wdXRGaWx0ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlSW5wdXRGaWx0ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgaWYgKGV2LnRhcmdldC52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZS5zdGF0ZUZpbHRlckJ5VmFsdWUgPSBldi50YXJnZXQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBhY3Rpb25zVG9nZ2xlRm9sZGluZ0J1dHRvbiA9PT0gbnVsbCB8fCBhY3Rpb25zVG9nZ2xlRm9sZGluZ0J1dHRvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogYWN0aW9uc1RvZ2dsZUZvbGRpbmdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFsbEFjdGlvbk5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5sb2ctYWN0aW9uXCIpO1xuICAgICAgICBhbGxBY3Rpb25Ob2Rlcy5mb3JFYWNoKG1ha2VOb2RlVG9nZ2xlRm9sZGluZyhzdGF0ZS5hY3Rpb25zQWxsRm9sZGVkKSk7XG4gICAgICAgIHN0YXRlLmFjdGlvbnNBbGxGb2xkZWQgPSAhc3RhdGUuYWN0aW9uc0FsbEZvbGRlZDtcbiAgICB9KTtcbiAgICBzdGF0ZVRvZ2dsZUZvbGRpbmdCdXR0b24gPT09IG51bGwgfHwgc3RhdGVUb2dnbGVGb2xkaW5nQnV0dG9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZVRvZ2dsZUZvbGRpbmdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFsbFN0YXRlTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxvZy1zdGF0ZVwiKTtcbiAgICAgICAgYWxsU3RhdGVOb2Rlcy5mb3JFYWNoKG1ha2VOb2RlVG9nZ2xlRm9sZGluZyhzdGF0ZS5zdGF0ZUFsbEZvbGRlZCkpO1xuICAgICAgICBzdGF0ZS5zdGF0ZUFsbEZvbGRlZCA9ICFzdGF0ZS5zdGF0ZUFsbEZvbGRlZDtcbiAgICB9KTtcbiAgICBzdGF0ZVRvZ2dsZURpZmZNb2RlQnV0dG9uID09PSBudWxsIHx8IHN0YXRlVG9nZ2xlRGlmZk1vZGVCdXR0b24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlVG9nZ2xlRGlmZk1vZGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhdGUuc3RhdGVEaWZmTW9kZSA9ICFzdGF0ZS5zdGF0ZURpZmZNb2RlO1xuICAgICAgICBpZiAoc3RhdGVEaWZmTW9kZVN0YXR1cyAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZURpZmZNb2RlU3RhdHVzLnRleHRDb250ZW50ID0gc3RhdGUuc3RhdGVEaWZmTW9kZSA/IFwiT25cIiA6IFwiT2ZmXCI7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=