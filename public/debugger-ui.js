/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var deep_object_diff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! deep-object-diff */ "./node_modules/deep-object-diff/mjs/index.js");
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
function makeLogEntry(packet) {
    var _a;
    var date = new Date(packet._t).toLocaleString();
    var packetType = (_a = packet._d) === null || _a === void 0 ? void 0 : _a.type;
    var maybeActionType = packetType == null ? "" : "".concat(packetType, " => ");
    var content = JSON.stringify(packet._d, null, 2);
    var str = "[".concat(date, "]: ").concat(maybeActionType).concat(content);
    var _b = str.split("\n"), firstLine = _b[0], otherLines = _b.slice(1);
    var node = document.createElement("li");
    var detailsNode = document.createElement("details");
    var summaryNode = document.createElement("summary");
    var preNode = document.createElement("pre");
    var summaryTextNode = document.createTextNode(firstLine);
    var textNode = document.createTextNode(otherLines.join("\n"));
    detailsNode.setAttribute("open", "true");
    detailsNode.classList.add("log");
    detailsNode.classList.add("log-".concat(packet._k));
    summaryNode.appendChild(summaryTextNode);
    preNode.appendChild(textNode);
    detailsNode.appendChild(summaryNode);
    detailsNode.appendChild(preNode);
    node.appendChild(detailsNode);
    return node;
}
var makeNodeToggleFolding = function (allFolded) { return function (node) {
    if (allFolded) {
        node.setAttribute("open", true);
    }
    else {
        node.removeAttribute("open");
    }
}; };
(function iife() {
    console.log("Hey from the debugger UI!");
    var ws = new WebSocket("ws://localhost:8080");
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
    var actionsLog = document.querySelector("#actions-dispatch");
    var actionsInputFilter = document.querySelector("#input-filter-actions");
    var actionsDispatchCounter = document.querySelector("#dispatched-actions-counter");
    var actionsToggleFoldingButton = document.querySelector("#btn-action-toggle-folding");
    var stateLog = document.querySelector("#state-updates");
    var stateInputFilter = document.querySelector("#input-filter-state");
    var stateUpdatesCounter = document.querySelector("#state-updates-counter");
    var stateDiffModeStatus = document.querySelector("#state-diff-mode");
    var stateToggleFoldingButton = document.querySelector("#btn-state-toggle-folding");
    var stateToggleDiffModeButton = document.querySelector("#btn-state-toggle-diff-mode");
    actionsInputFilter === null || actionsInputFilter === void 0 ? void 0 : actionsInputFilter.addEventListener("change", function (ev) {
        if (ev.target.value != null) {
            state.actionsFilterByValue = ev.target.value;
            console.log("filter::actionsFilterByValue:", state.actionsFilterByValue);
        }
    });
    stateInputFilter === null || stateInputFilter === void 0 ? void 0 : stateInputFilter.addEventListener("change", function (ev) {
        if (ev.target.value != null) {
            state.stateFilterByValue = ev.target.value;
            console.log("filter::stateFilterByValue:", state.stateFilterByValue);
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
    ws.onopen = function open() {
        ws.send("tail");
        if (wsReadyStateEl != null) {
            wsReadyStateEl.textContent = "connected";
        }
    };
    ws.onerror = function error(ev) {
        if (wsReadyStateEl != null) {
            wsReadyStateEl.textContent = "errored, error: " + ev.message;
        }
    };
    ws.onclose = function close(_a) {
        var code = _a.code, reason = _a.reason;
        var tags = ["code=".concat(code || "none"), "reason=".concat(reason || "none")];
        if (wsReadyStateEl != null) {
            wsReadyStateEl.textContent = "connection closed. ".concat(tags.join(" "));
        }
    };
    ws.onmessage = function message(ev) {
        var data = ev.data.toString();
        var packet = JSON.parse(data.toString());
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
        var logEntry;
        var nodeToUpdate;
        if (packet._k === "state" &&
            state.stateDiffMode === true &&
            state.lastStateData != null) {
            var diffResult = (0,deep_object_diff__WEBPACK_IMPORTED_MODULE_0__.updatedDiff)(state.lastStateData, packet._d);
            var diffPacket = __assign(__assign({}, packet), { _d: diffResult });
            logEntry = makeLogEntry(diffPacket);
            nodeToUpdate = stateLog;
        }
        else {
            logEntry = makeLogEntry(packet);
            nodeToUpdate = packet._k === "action" ? actionsLog : stateLog;
        }
        if (nodeToUpdate != null) {
            nodeToUpdate.appendChild(logEntry);
            nodeToUpdate.scrollTop = nodeToUpdate.scrollHeight;
        }
        if (actionsDispatchCounter != null) {
            actionsDispatchCounter.textContent = "(".concat(stats.dispatchedActions, " dispatches)");
        }
        if (stateUpdatesCounter != null) {
            stateUpdatesCounter.textContent = "(".concat(stats.stateUpdates, " updates)");
        }
        state.lastStateData = packet._d;
    };
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL2RlZXAtb2JqZWN0LWRpZmYvbWpzL2FkZGVkLmpzIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL2RlZXAtb2JqZWN0LWRpZmYvbWpzL2RlbGV0ZWQuanMiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvLi9ub2RlX21vZHVsZXMvZGVlcC1vYmplY3QtZGlmZi9tanMvZGV0YWlsZWQuanMiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvLi9ub2RlX21vZHVsZXMvZGVlcC1vYmplY3QtZGlmZi9tanMvZGlmZi5qcyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9kZWVwLW9iamVjdC1kaWZmL21qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9kZWVwLW9iamVjdC1kaWZmL21qcy91cGRhdGVkLmpzIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL2RlZXAtb2JqZWN0LWRpZmYvbWpzL3V0aWxzLmpzIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvLi9kZWJ1Z2dlci11aS9kZWJ1Z2dlci11aS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0VtcHR5LCBpc09iamVjdCwgaGFzT3duUHJvcGVydHkgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuY29uc3QgYWRkZWREaWZmID0gKGxocywgcmhzKSA9PiB7XG5cbiAgaWYgKGxocyA9PT0gcmhzIHx8ICFpc09iamVjdChsaHMpIHx8ICFpc09iamVjdChyaHMpKSByZXR1cm4ge307XG5cbiAgY29uc3QgbCA9IGxocztcbiAgY29uc3QgciA9IHJocztcblxuICByZXR1cm4gT2JqZWN0LmtleXMocikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eShsLCBrZXkpKSB7XG4gICAgICBjb25zdCBkaWZmZXJlbmNlID0gYWRkZWREaWZmKGxba2V5XSwgcltrZXldKTtcblxuICAgICAgaWYgKGlzT2JqZWN0KGRpZmZlcmVuY2UpICYmIGlzRW1wdHkoZGlmZmVyZW5jZSkpIHJldHVybiBhY2M7XG5cbiAgICAgIGFjY1trZXldID0gZGlmZmVyZW5jZTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfVxuXG4gICAgYWNjW2tleV0gPSByW2tleV07XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYWRkZWREaWZmO1xuIiwiaW1wb3J0IHsgaXNFbXB0eSwgaXNPYmplY3QsIGhhc093blByb3BlcnR5IH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNvbnN0IGRlbGV0ZWREaWZmID0gKGxocywgcmhzKSA9PiB7XG4gIGlmIChsaHMgPT09IHJocyB8fCAhaXNPYmplY3QobGhzKSB8fCAhaXNPYmplY3QocmhzKSkgcmV0dXJuIHt9O1xuXG4gIGNvbnN0IGwgPSBsaHM7XG4gIGNvbnN0IHIgPSByaHM7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKGwpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkociwga2V5KSkge1xuICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IGRlbGV0ZWREaWZmKGxba2V5XSwgcltrZXldKTtcblxuICAgICAgaWYgKGlzT2JqZWN0KGRpZmZlcmVuY2UpICYmIGlzRW1wdHkoZGlmZmVyZW5jZSkpIHJldHVybiBhY2M7XG5cbiAgICAgIGFjY1trZXldID0gZGlmZmVyZW5jZTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfVxuXG4gICAgYWNjW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVsZXRlZERpZmY7XG4iLCJpbXBvcnQgYWRkZWREaWZmIGZyb20gJy4vYWRkZWQuanMnO1xuaW1wb3J0IGRlbGV0ZWREaWZmIGZyb20gJy4vZGVsZXRlZC5qcyc7XG5pbXBvcnQgdXBkYXRlZERpZmYgZnJvbSAnLi91cGRhdGVkLmpzJztcblxuY29uc3QgZGV0YWlsZWREaWZmID0gKGxocywgcmhzKSA9PiAoe1xuICBhZGRlZDogYWRkZWREaWZmKGxocywgcmhzKSxcbiAgZGVsZXRlZDogZGVsZXRlZERpZmYobGhzLCByaHMpLFxuICB1cGRhdGVkOiB1cGRhdGVkRGlmZihsaHMsIHJocyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGV0YWlsZWREaWZmO1xuIiwiaW1wb3J0IHsgaXNEYXRlLCBpc0VtcHR5T2JqZWN0LCBpc09iamVjdCwgaGFzT3duUHJvcGVydHkgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuY29uc3QgZGlmZiA9IChsaHMsIHJocykgPT4ge1xuICBpZiAobGhzID09PSByaHMpIHJldHVybiB7fTsgLy8gZXF1YWwgcmV0dXJuIG5vIGRpZmZcblxuICBpZiAoIWlzT2JqZWN0KGxocykgfHwgIWlzT2JqZWN0KHJocykpIHJldHVybiByaHM7IC8vIHJldHVybiB1cGRhdGVkIHJoc1xuXG4gIGNvbnN0IGwgPSBsaHM7XG4gIGNvbnN0IHIgPSByaHM7XG5cbiAgY29uc3QgZGVsZXRlZFZhbHVlcyA9IE9iamVjdC5rZXlzKGwpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBpZiAoIWhhc093blByb3BlcnR5KHIsIGtleSkpIHtcbiAgICAgIGFjY1trZXldID0gdW5kZWZpbmVkO1xuICAgICAgXG4gICAgfVxuXG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuXG4gIGlmIChpc0RhdGUobCkgfHwgaXNEYXRlKHIpKSB7XG4gICAgaWYgKGwudmFsdWVPZigpID09IHIudmFsdWVPZigpKSByZXR1cm4ge307XG4gICAgcmV0dXJuIHI7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmtleXMocikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgIGlmICghaGFzT3duUHJvcGVydHkobCwga2V5KSl7XG4gICAgICBhY2Nba2V5XSA9IHJba2V5XTsgLy8gcmV0dXJuIGFkZGVkIHIga2V5XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0gXG5cbiAgICBjb25zdCBkaWZmZXJlbmNlID0gZGlmZihsW2tleV0sIHJba2V5XSk7XG5cbiAgICAvLyBJZiB0aGUgZGlmZmVyZW5jZSBpcyBlbXB0eSwgYW5kIHRoZSBsaHMgaXMgYW4gZW1wdHkgb2JqZWN0IG9yIHRoZSByaHMgaXMgbm90IGFuIGVtcHR5IG9iamVjdFxuICAgIGlmIChpc0VtcHR5T2JqZWN0KGRpZmZlcmVuY2UpICYmICFpc0RhdGUoZGlmZmVyZW5jZSkgJiYgKGlzRW1wdHlPYmplY3QobFtrZXldKSB8fCAhaXNFbXB0eU9iamVjdChyW2tleV0pKSlcbiAgICAgIHJldHVybiBhY2M7IC8vIHJldHVybiBubyBkaWZmXG5cbiAgICBhY2Nba2V5XSA9IGRpZmZlcmVuY2UgLy8gcmV0dXJuIHVwZGF0ZWQga2V5XG4gICAgcmV0dXJuIGFjYzsgLy8gcmV0dXJuIHVwZGF0ZWQga2V5XG4gIH0sIGRlbGV0ZWRWYWx1ZXMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlmZjtcbiIsImltcG9ydCBkaWZmIGZyb20gJy4vZGlmZi5qcyc7XG5pbXBvcnQgYWRkZWREaWZmIGZyb20gJy4vYWRkZWQuanMnO1xuaW1wb3J0IGRlbGV0ZWREaWZmIGZyb20gJy4vZGVsZXRlZC5qcyc7XG5pbXBvcnQgdXBkYXRlZERpZmYgZnJvbSAnLi91cGRhdGVkLmpzJztcbmltcG9ydCBkZXRhaWxlZERpZmYgZnJvbSAnLi9kZXRhaWxlZC5qcyc7XG5cbmV4cG9ydCB7XG4gIGFkZGVkRGlmZixcbiAgZGlmZixcbiAgZGVsZXRlZERpZmYsXG4gIHVwZGF0ZWREaWZmLFxuICBkZXRhaWxlZERpZmZcbn07XG4iLCJpbXBvcnQgeyBpc0RhdGUsIGlzRW1wdHlPYmplY3QsIGlzT2JqZWN0LCBoYXNPd25Qcm9wZXJ0eSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5jb25zdCB1cGRhdGVkRGlmZiA9IChsaHMsIHJocykgPT4ge1xuICBpZiAobGhzID09PSByaHMpIHJldHVybiB7fTtcblxuICBpZiAoIWlzT2JqZWN0KGxocykgfHwgIWlzT2JqZWN0KHJocykpIHJldHVybiByaHM7XG5cbiAgY29uc3QgbCA9IGxocztcbiAgY29uc3QgciA9IHJocztcblxuICBpZiAoaXNEYXRlKGwpIHx8IGlzRGF0ZShyKSkge1xuICAgIGlmIChsLnZhbHVlT2YoKSA9PSByLnZhbHVlT2YoKSkgcmV0dXJuIHt9O1xuICAgIHJldHVybiByO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkobCwga2V5KSkge1xuICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IHVwZGF0ZWREaWZmKGxba2V5XSwgcltrZXldKTtcblxuICAgICAgLy8gSWYgdGhlIGRpZmZlcmVuY2UgaXMgZW1wdHksIGFuZCB0aGUgbGhzIGlzIGFuIGVtcHR5IG9iamVjdCBvciB0aGUgcmhzIGlzIG5vdCBhbiBlbXB0eSBvYmplY3RcbiAgICAgIGlmIChpc0VtcHR5T2JqZWN0KGRpZmZlcmVuY2UpICYmICFpc0RhdGUoZGlmZmVyZW5jZSkgJiYgKGlzRW1wdHlPYmplY3QobFtrZXldKSB8fCAhaXNFbXB0eU9iamVjdChyW2tleV0pKSlcbiAgICAgICAgcmV0dXJuIGFjYzsgLy8gcmV0dXJuIG5vIGRpZmZcblxuICAgICAgYWNjW2tleV0gPSBkaWZmZXJlbmNlO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVkRGlmZjtcbiIsImV4cG9ydCBjb25zdCBpc0RhdGUgPSBkID0+IGQgaW5zdGFuY2VvZiBEYXRlO1xuZXhwb3J0IGNvbnN0IGlzRW1wdHkgPSBvID0+IE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMDtcbmV4cG9ydCBjb25zdCBpc09iamVjdCA9IG8gPT4gbyAhPSBudWxsICYmIHR5cGVvZiBvID09PSAnb2JqZWN0JztcbmV4cG9ydCBjb25zdCBoYXNPd25Qcm9wZXJ0eSA9IChvLCAuLi5hcmdzKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgLi4uYXJncylcbmV4cG9ydCBjb25zdCBpc0VtcHR5T2JqZWN0ID0gKG8pID0+IGlzT2JqZWN0KG8pICYmIGlzRW1wdHkobyk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5pbXBvcnQgeyB1cGRhdGVkRGlmZiBhcyBkaWZmIH0gZnJvbSBcImRlZXAtb2JqZWN0LWRpZmZcIjtcbmZ1bmN0aW9uIG5lc3RlZEluY2x1ZGVzKG9iaiwgdG9NYXRjaCkge1xuICAgIHZhciBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMob2JqKTtcbiAgICB2YXIgbWFwcGVkRW50cmllcyA9IGVudHJpZXMubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgayA9IF9hWzBdLCB2ID0gX2FbMV07XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIFtrLCBuZXN0ZWRJbmNsdWRlcyh2LCB0b01hdGNoKV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICAgICAgdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCIgfHxcbiAgICAgICAgICAgIHR5cGVvZiB2ID09PSBcInN5bWJvbFwiIHx8XG4gICAgICAgICAgICB0eXBlb2YgdiA9PT0gXCJiaWdpbnRcIiB8fFxuICAgICAgICAgICAgdHlwZW9mIHYgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBbaywgZmFsc2VdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gW2ssIHYuaW5jbHVkZXModG9NYXRjaCldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtrLCBmYWxzZV07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWFwcGVkRW50cmllcy5zb21lKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgXyA9IF9hWzBdLCB2ID0gX2FbMV07XG4gICAgICAgIHJldHVybiB2ID09PSB0cnVlO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbWFrZUxvZ0VudHJ5KHBhY2tldCkge1xuICAgIHZhciBfYTtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHBhY2tldC5fdCkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICB2YXIgcGFja2V0VHlwZSA9IChfYSA9IHBhY2tldC5fZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnR5cGU7XG4gICAgdmFyIG1heWJlQWN0aW9uVHlwZSA9IHBhY2tldFR5cGUgPT0gbnVsbCA/IFwiXCIgOiBcIlwiLmNvbmNhdChwYWNrZXRUeXBlLCBcIiA9PiBcIik7XG4gICAgdmFyIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShwYWNrZXQuX2QsIG51bGwsIDIpO1xuICAgIHZhciBzdHIgPSBcIltcIi5jb25jYXQoZGF0ZSwgXCJdOiBcIikuY29uY2F0KG1heWJlQWN0aW9uVHlwZSkuY29uY2F0KGNvbnRlbnQpO1xuICAgIHZhciBfYiA9IHN0ci5zcGxpdChcIlxcblwiKSwgZmlyc3RMaW5lID0gX2JbMF0sIG90aGVyTGluZXMgPSBfYi5zbGljZSgxKTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICB2YXIgZGV0YWlsc05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGV0YWlsc1wiKTtcbiAgICB2YXIgc3VtbWFyeU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3VtbWFyeVwiKTtcbiAgICB2YXIgcHJlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIik7XG4gICAgdmFyIHN1bW1hcnlUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZpcnN0TGluZSk7XG4gICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUob3RoZXJMaW5lcy5qb2luKFwiXFxuXCIpKTtcbiAgICBkZXRhaWxzTm9kZS5zZXRBdHRyaWJ1dGUoXCJvcGVuXCIsIFwidHJ1ZVwiKTtcbiAgICBkZXRhaWxzTm9kZS5jbGFzc0xpc3QuYWRkKFwibG9nXCIpO1xuICAgIGRldGFpbHNOb2RlLmNsYXNzTGlzdC5hZGQoXCJsb2ctXCIuY29uY2F0KHBhY2tldC5faykpO1xuICAgIHN1bW1hcnlOb2RlLmFwcGVuZENoaWxkKHN1bW1hcnlUZXh0Tm9kZSk7XG4gICAgcHJlTm9kZS5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgZGV0YWlsc05vZGUuYXBwZW5kQ2hpbGQoc3VtbWFyeU5vZGUpO1xuICAgIGRldGFpbHNOb2RlLmFwcGVuZENoaWxkKHByZU5vZGUpO1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoZGV0YWlsc05vZGUpO1xuICAgIHJldHVybiBub2RlO1xufVxudmFyIG1ha2VOb2RlVG9nZ2xlRm9sZGluZyA9IGZ1bmN0aW9uIChhbGxGb2xkZWQpIHsgcmV0dXJuIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKGFsbEZvbGRlZCkge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcIm9wZW5cIiwgdHJ1ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShcIm9wZW5cIik7XG4gICAgfVxufTsgfTtcbihmdW5jdGlvbiBpaWZlKCkge1xuICAgIGNvbnNvbGUubG9nKFwiSGV5IGZyb20gdGhlIGRlYnVnZ2VyIFVJIVwiKTtcbiAgICB2YXIgd3MgPSBuZXcgV2ViU29ja2V0KFwid3M6Ly9sb2NhbGhvc3Q6ODA4MFwiKTtcbiAgICB2YXIgc3RhdHMgPSB7XG4gICAgICAgIGRpc3BhdGNoZWRBY3Rpb25zOiAwLFxuICAgICAgICBzdGF0ZVVwZGF0ZXM6IDAsXG4gICAgfTtcbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgIGFjdGlvbnNBbGxGb2xkZWQ6IGZhbHNlLFxuICAgICAgICBzdGF0ZUFsbEZvbGRlZDogZmFsc2UsXG4gICAgICAgIHN0YXRlRGlmZk1vZGU6IGZhbHNlLFxuICAgICAgICBsYXN0U3RhdGVEYXRhOiBudWxsLFxuICAgICAgICBhY3Rpb25zRmlsdGVyQnlWYWx1ZTogXCJcIixcbiAgICAgICAgc3RhdGVGaWx0ZXJCeVZhbHVlOiBcIlwiLFxuICAgIH07XG4gICAgdmFyIHdzUmVhZHlTdGF0ZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3cy1yZWFkeS1zdGF0ZVwiKTtcbiAgICB2YXIgYWN0aW9uc0xvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aW9ucy1kaXNwYXRjaFwiKTtcbiAgICB2YXIgYWN0aW9uc0lucHV0RmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC1maWx0ZXItYWN0aW9uc1wiKTtcbiAgICB2YXIgYWN0aW9uc0Rpc3BhdGNoQ291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlzcGF0Y2hlZC1hY3Rpb25zLWNvdW50ZXJcIik7XG4gICAgdmFyIGFjdGlvbnNUb2dnbGVGb2xkaW5nQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG4tYWN0aW9uLXRvZ2dsZS1mb2xkaW5nXCIpO1xuICAgIHZhciBzdGF0ZUxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhdGUtdXBkYXRlc1wiKTtcbiAgICB2YXIgc3RhdGVJbnB1dEZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtZmlsdGVyLXN0YXRlXCIpO1xuICAgIHZhciBzdGF0ZVVwZGF0ZXNDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGF0ZS11cGRhdGVzLWNvdW50ZXJcIik7XG4gICAgdmFyIHN0YXRlRGlmZk1vZGVTdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXRlLWRpZmYtbW9kZVwiKTtcbiAgICB2YXIgc3RhdGVUb2dnbGVGb2xkaW5nQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG4tc3RhdGUtdG9nZ2xlLWZvbGRpbmdcIik7XG4gICAgdmFyIHN0YXRlVG9nZ2xlRGlmZk1vZGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bi1zdGF0ZS10b2dnbGUtZGlmZi1tb2RlXCIpO1xuICAgIGFjdGlvbnNJbnB1dEZpbHRlciA9PT0gbnVsbCB8fCBhY3Rpb25zSW5wdXRGaWx0ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFjdGlvbnNJbnB1dEZpbHRlci5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgICBpZiAoZXYudGFyZ2V0LnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0YXRlLmFjdGlvbnNGaWx0ZXJCeVZhbHVlID0gZXYudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaWx0ZXI6OmFjdGlvbnNGaWx0ZXJCeVZhbHVlOlwiLCBzdGF0ZS5hY3Rpb25zRmlsdGVyQnlWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBzdGF0ZUlucHV0RmlsdGVyID09PSBudWxsIHx8IHN0YXRlSW5wdXRGaWx0ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlSW5wdXRGaWx0ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgaWYgKGV2LnRhcmdldC52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZS5zdGF0ZUZpbHRlckJ5VmFsdWUgPSBldi50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbHRlcjo6c3RhdGVGaWx0ZXJCeVZhbHVlOlwiLCBzdGF0ZS5zdGF0ZUZpbHRlckJ5VmFsdWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgYWN0aW9uc1RvZ2dsZUZvbGRpbmdCdXR0b24gPT09IG51bGwgfHwgYWN0aW9uc1RvZ2dsZUZvbGRpbmdCdXR0b24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFjdGlvbnNUb2dnbGVGb2xkaW5nQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhbGxBY3Rpb25Ob2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubG9nLWFjdGlvblwiKTtcbiAgICAgICAgYWxsQWN0aW9uTm9kZXMuZm9yRWFjaChtYWtlTm9kZVRvZ2dsZUZvbGRpbmcoc3RhdGUuYWN0aW9uc0FsbEZvbGRlZCkpO1xuICAgICAgICBzdGF0ZS5hY3Rpb25zQWxsRm9sZGVkID0gIXN0YXRlLmFjdGlvbnNBbGxGb2xkZWQ7XG4gICAgfSk7XG4gICAgc3RhdGVUb2dnbGVGb2xkaW5nQnV0dG9uID09PSBudWxsIHx8IHN0YXRlVG9nZ2xlRm9sZGluZ0J1dHRvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGVUb2dnbGVGb2xkaW5nQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhbGxTdGF0ZU5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5sb2ctc3RhdGVcIik7XG4gICAgICAgIGFsbFN0YXRlTm9kZXMuZm9yRWFjaChtYWtlTm9kZVRvZ2dsZUZvbGRpbmcoc3RhdGUuc3RhdGVBbGxGb2xkZWQpKTtcbiAgICAgICAgc3RhdGUuc3RhdGVBbGxGb2xkZWQgPSAhc3RhdGUuc3RhdGVBbGxGb2xkZWQ7XG4gICAgfSk7XG4gICAgc3RhdGVUb2dnbGVEaWZmTW9kZUJ1dHRvbiA9PT0gbnVsbCB8fCBzdGF0ZVRvZ2dsZURpZmZNb2RlQnV0dG9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZVRvZ2dsZURpZmZNb2RlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXRlLnN0YXRlRGlmZk1vZGUgPSAhc3RhdGUuc3RhdGVEaWZmTW9kZTtcbiAgICAgICAgaWYgKHN0YXRlRGlmZk1vZGVTdGF0dXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhdGVEaWZmTW9kZVN0YXR1cy50ZXh0Q29udGVudCA9IHN0YXRlLnN0YXRlRGlmZk1vZGUgPyBcIk9uXCIgOiBcIk9mZlwiO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgd3Mub25vcGVuID0gZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgd3Muc2VuZChcInRhaWxcIik7XG4gICAgICAgIGlmICh3c1JlYWR5U3RhdGVFbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB3c1JlYWR5U3RhdGVFbC50ZXh0Q29udGVudCA9IFwiY29ubmVjdGVkXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHdzLm9uZXJyb3IgPSBmdW5jdGlvbiBlcnJvcihldikge1xuICAgICAgICBpZiAod3NSZWFkeVN0YXRlRWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgd3NSZWFkeVN0YXRlRWwudGV4dENvbnRlbnQgPSBcImVycm9yZWQsIGVycm9yOiBcIiArIGV2Lm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHdzLm9uY2xvc2UgPSBmdW5jdGlvbiBjbG9zZShfYSkge1xuICAgICAgICB2YXIgY29kZSA9IF9hLmNvZGUsIHJlYXNvbiA9IF9hLnJlYXNvbjtcbiAgICAgICAgdmFyIHRhZ3MgPSBbXCJjb2RlPVwiLmNvbmNhdChjb2RlIHx8IFwibm9uZVwiKSwgXCJyZWFzb249XCIuY29uY2F0KHJlYXNvbiB8fCBcIm5vbmVcIildO1xuICAgICAgICBpZiAod3NSZWFkeVN0YXRlRWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgd3NSZWFkeVN0YXRlRWwudGV4dENvbnRlbnQgPSBcImNvbm5lY3Rpb24gY2xvc2VkLiBcIi5jb25jYXQodGFncy5qb2luKFwiIFwiKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHdzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIG1lc3NhZ2UoZXYpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBldi5kYXRhLnRvU3RyaW5nKCk7XG4gICAgICAgIHZhciBwYWNrZXQgPSBKU09OLnBhcnNlKGRhdGEudG9TdHJpbmcoKSk7XG4gICAgICAgIGlmIChwYWNrZXQuX2sgPT09IFwiYWN0aW9uXCIpIHtcbiAgICAgICAgICAgIHN0YXRzLmRpc3BhdGNoZWRBY3Rpb25zICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocGFja2V0Ll9rID09PSBcInN0YXRlXCIpIHtcbiAgICAgICAgICAgIHN0YXRzLnN0YXRlVXBkYXRlcyArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWNrZXQuX2sgPT09IFwic3RhdGVcIiAmJlxuICAgICAgICAgICAgc3RhdGUuc3RhdGVGaWx0ZXJCeVZhbHVlICE9IG51bGwgJiZcbiAgICAgICAgICAgIHN0YXRlLnN0YXRlRmlsdGVyQnlWYWx1ZS50cmltKCkgIT09IFwiXCIgJiZcbiAgICAgICAgICAgIG5lc3RlZEluY2x1ZGVzKHBhY2tldC5fZCwgc3RhdGUuc3RhdGVGaWx0ZXJCeVZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5jbHVkZXNTdGF0ZUZpbHRlcjpcIiwgbmVzdGVkSW5jbHVkZXMocGFja2V0Ll9kLCBzdGF0ZS5zdGF0ZUZpbHRlckJ5VmFsdWUpKTtcbiAgICAgICAgICAgIHJldHVybjsgLy8gc2tpcFxuICAgICAgICB9XG4gICAgICAgIGlmIChwYWNrZXQuX2sgPT09IFwiYWN0aW9uXCIgJiZcbiAgICAgICAgICAgIHN0YXRlLmFjdGlvbnNGaWx0ZXJCeVZhbHVlICE9IG51bGwgJiZcbiAgICAgICAgICAgIHN0YXRlLmFjdGlvbnNGaWx0ZXJCeVZhbHVlLnRyaW0oKSAhPT0gXCJcIiAmJlxuICAgICAgICAgICAgbmVzdGVkSW5jbHVkZXMocGFja2V0Ll9kLCBzdGF0ZS5hY3Rpb25zRmlsdGVyQnlWYWx1ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImluY2x1ZGVzQWN0aW9uc0ZpbHRlcjpcIiwgbmVzdGVkSW5jbHVkZXMocGFja2V0Ll9kLCBzdGF0ZS5hY3Rpb25zRmlsdGVyQnlWYWx1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBza2lwXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxvZ0VudHJ5O1xuICAgICAgICB2YXIgbm9kZVRvVXBkYXRlO1xuICAgICAgICBpZiAocGFja2V0Ll9rID09PSBcInN0YXRlXCIgJiZcbiAgICAgICAgICAgIHN0YXRlLnN0YXRlRGlmZk1vZGUgPT09IHRydWUgJiZcbiAgICAgICAgICAgIHN0YXRlLmxhc3RTdGF0ZURhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGRpZmZSZXN1bHQgPSBkaWZmKHN0YXRlLmxhc3RTdGF0ZURhdGEsIHBhY2tldC5fZCk7XG4gICAgICAgICAgICB2YXIgZGlmZlBhY2tldCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBwYWNrZXQpLCB7IF9kOiBkaWZmUmVzdWx0IH0pO1xuICAgICAgICAgICAgbG9nRW50cnkgPSBtYWtlTG9nRW50cnkoZGlmZlBhY2tldCk7XG4gICAgICAgICAgICBub2RlVG9VcGRhdGUgPSBzdGF0ZUxvZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ0VudHJ5ID0gbWFrZUxvZ0VudHJ5KHBhY2tldCk7XG4gICAgICAgICAgICBub2RlVG9VcGRhdGUgPSBwYWNrZXQuX2sgPT09IFwiYWN0aW9uXCIgPyBhY3Rpb25zTG9nIDogc3RhdGVMb2c7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGVUb1VwZGF0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlVG9VcGRhdGUuYXBwZW5kQ2hpbGQobG9nRW50cnkpO1xuICAgICAgICAgICAgbm9kZVRvVXBkYXRlLnNjcm9sbFRvcCA9IG5vZGVUb1VwZGF0ZS5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbnNEaXNwYXRjaENvdW50ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgYWN0aW9uc0Rpc3BhdGNoQ291bnRlci50ZXh0Q29udGVudCA9IFwiKFwiLmNvbmNhdChzdGF0cy5kaXNwYXRjaGVkQWN0aW9ucywgXCIgZGlzcGF0Y2hlcylcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRlVXBkYXRlc0NvdW50ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhdGVVcGRhdGVzQ291bnRlci50ZXh0Q29udGVudCA9IFwiKFwiLmNvbmNhdChzdGF0cy5zdGF0ZVVwZGF0ZXMsIFwiIHVwZGF0ZXMpXCIpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmxhc3RTdGF0ZURhdGEgPSBwYWNrZXQuX2Q7XG4gICAgfTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=