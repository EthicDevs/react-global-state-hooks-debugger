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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WS_READY_STATE": () => (/* binding */ WS_READY_STATE)
/* harmony export */ });
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
    function recreateWebSocket(log) {
        if (ws.readyState === WS_READY_STATE.Open) {
            return undefined;
        }
        if (ws.readyState === WS_READY_STATE.Closed) {
            log === null || log === void 0 ? void 0 : log("[rgsh-debugger/ui] Lost connection to debugger. Sleeping 3s before reconnecting...");
        }
        // Give it a grace period of 3s before reconnecting
        setTimeout(function () {
            if (ws.readyState !== WS_READY_STATE.Open) {
                ws = new WebSocket(wsUri);
            }
        }, 1000 * 3);
        return undefined;
    }
    ws.onerror = function error(ev) {
        if (wsReadyStateEl != null) {
            wsReadyStateEl.textContent = "errored, error: " + ev.message;
            recreateWebSocket(function (message) {
                wsReadyStateEl.textContent = message;
            });
        }
        else {
            recreateWebSocket();
        }
    };
    ws.onclose = function close(_a) {
        var code = _a.code, reason = _a.reason;
        var tags = ["code=".concat(code || "none"), "reason=".concat(reason || "none")];
        if (wsReadyStateEl != null) {
            wsReadyStateEl.textContent = "connection closed. ".concat(tags.join(" "));
            recreateWebSocket(function (message) {
                wsReadyStateEl.textContent = message;
            });
        }
        else {
            recreateWebSocket();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDZEQUFJO0FBQ2pDLGlEQUFpRCxhQUFhLGdCQUFnQjtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9kZWVwLW9iamVjdC1kaWZmL21qcy9hZGRlZC5qcyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9kZWVwLW9iamVjdC1kaWZmL21qcy9kZWxldGVkLmpzIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL2RlZXAtb2JqZWN0LWRpZmYvbWpzL2RldGFpbGVkLmpzIiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL2RlZXAtb2JqZWN0LWRpZmYvbWpzL2RpZmYuanMiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvLi9ub2RlX21vZHVsZXMvZGVlcC1vYmplY3QtZGlmZi9tanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvLi9ub2RlX21vZHVsZXMvZGVlcC1vYmplY3QtZGlmZi9tanMvdXBkYXRlZC5qcyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9kZWVwLW9iamVjdC1kaWZmL21qcy91dGlscy5qcyIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGV0aGljZGV2cy9yZWFjdC1nbG9iYWwtc3RhdGUtaG9va3MtZGVidWdnZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZXRoaWNkZXZzL3JlYWN0LWdsb2JhbC1zdGF0ZS1ob29rcy1kZWJ1Z2dlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BldGhpY2RldnMvcmVhY3QtZ2xvYmFsLXN0YXRlLWhvb2tzLWRlYnVnZ2VyLy4vZGVidWdnZXItdWkvZGVidWdnZXItdWkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNFbXB0eSwgaXNPYmplY3QsIGhhc093blByb3BlcnR5IH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNvbnN0IGFkZGVkRGlmZiA9IChsaHMsIHJocykgPT4ge1xuXG4gIGlmIChsaHMgPT09IHJocyB8fCAhaXNPYmplY3QobGhzKSB8fCAhaXNPYmplY3QocmhzKSkgcmV0dXJuIHt9O1xuXG4gIGNvbnN0IGwgPSBsaHM7XG4gIGNvbnN0IHIgPSByaHM7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkobCwga2V5KSkge1xuICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IGFkZGVkRGlmZihsW2tleV0sIHJba2V5XSk7XG5cbiAgICAgIGlmIChpc09iamVjdChkaWZmZXJlbmNlKSAmJiBpc0VtcHR5KGRpZmZlcmVuY2UpKSByZXR1cm4gYWNjO1xuXG4gICAgICBhY2Nba2V5XSA9IGRpZmZlcmVuY2U7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH1cblxuICAgIGFjY1trZXldID0gcltrZXldO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFkZGVkRGlmZjtcbiIsImltcG9ydCB7IGlzRW1wdHksIGlzT2JqZWN0LCBoYXNPd25Qcm9wZXJ0eSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5jb25zdCBkZWxldGVkRGlmZiA9IChsaHMsIHJocykgPT4ge1xuICBpZiAobGhzID09PSByaHMgfHwgIWlzT2JqZWN0KGxocykgfHwgIWlzT2JqZWN0KHJocykpIHJldHVybiB7fTtcblxuICBjb25zdCBsID0gbGhzO1xuICBjb25zdCByID0gcmhzO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhsKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHIsIGtleSkpIHtcbiAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBkZWxldGVkRGlmZihsW2tleV0sIHJba2V5XSk7XG5cbiAgICAgIGlmIChpc09iamVjdChkaWZmZXJlbmNlKSAmJiBpc0VtcHR5KGRpZmZlcmVuY2UpKSByZXR1cm4gYWNjO1xuXG4gICAgICBhY2Nba2V5XSA9IGRpZmZlcmVuY2U7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH1cblxuICAgIGFjY1trZXldID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlbGV0ZWREaWZmO1xuIiwiaW1wb3J0IGFkZGVkRGlmZiBmcm9tICcuL2FkZGVkLmpzJztcbmltcG9ydCBkZWxldGVkRGlmZiBmcm9tICcuL2RlbGV0ZWQuanMnO1xuaW1wb3J0IHVwZGF0ZWREaWZmIGZyb20gJy4vdXBkYXRlZC5qcyc7XG5cbmNvbnN0IGRldGFpbGVkRGlmZiA9IChsaHMsIHJocykgPT4gKHtcbiAgYWRkZWQ6IGFkZGVkRGlmZihsaHMsIHJocyksXG4gIGRlbGV0ZWQ6IGRlbGV0ZWREaWZmKGxocywgcmhzKSxcbiAgdXBkYXRlZDogdXBkYXRlZERpZmYobGhzLCByaHMpLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRldGFpbGVkRGlmZjtcbiIsImltcG9ydCB7IGlzRGF0ZSwgaXNFbXB0eU9iamVjdCwgaXNPYmplY3QsIGhhc093blByb3BlcnR5IH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNvbnN0IGRpZmYgPSAobGhzLCByaHMpID0+IHtcbiAgaWYgKGxocyA9PT0gcmhzKSByZXR1cm4ge307IC8vIGVxdWFsIHJldHVybiBubyBkaWZmXG5cbiAgaWYgKCFpc09iamVjdChsaHMpIHx8ICFpc09iamVjdChyaHMpKSByZXR1cm4gcmhzOyAvLyByZXR1cm4gdXBkYXRlZCByaHNcblxuICBjb25zdCBsID0gbGhzO1xuICBjb25zdCByID0gcmhzO1xuXG4gIGNvbnN0IGRlbGV0ZWRWYWx1ZXMgPSBPYmplY3Qua2V5cyhsKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShyLCBrZXkpKSB7XG4gICAgICBhY2Nba2V5XSA9IHVuZGVmaW5lZDtcbiAgICAgIFxuICAgIH1cblxuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcblxuICBpZiAoaXNEYXRlKGwpIHx8IGlzRGF0ZShyKSkge1xuICAgIGlmIChsLnZhbHVlT2YoKSA9PSByLnZhbHVlT2YoKSkgcmV0dXJuIHt9O1xuICAgIHJldHVybiByO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBpZiAoIWhhc093blByb3BlcnR5KGwsIGtleSkpe1xuICAgICAgYWNjW2tleV0gPSByW2tleV07IC8vIHJldHVybiBhZGRlZCByIGtleVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9IFxuXG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IGRpZmYobFtrZXldLCByW2tleV0pO1xuXG4gICAgLy8gSWYgdGhlIGRpZmZlcmVuY2UgaXMgZW1wdHksIGFuZCB0aGUgbGhzIGlzIGFuIGVtcHR5IG9iamVjdCBvciB0aGUgcmhzIGlzIG5vdCBhbiBlbXB0eSBvYmplY3RcbiAgICBpZiAoaXNFbXB0eU9iamVjdChkaWZmZXJlbmNlKSAmJiAhaXNEYXRlKGRpZmZlcmVuY2UpICYmIChpc0VtcHR5T2JqZWN0KGxba2V5XSkgfHwgIWlzRW1wdHlPYmplY3QocltrZXldKSkpXG4gICAgICByZXR1cm4gYWNjOyAvLyByZXR1cm4gbm8gZGlmZlxuXG4gICAgYWNjW2tleV0gPSBkaWZmZXJlbmNlIC8vIHJldHVybiB1cGRhdGVkIGtleVxuICAgIHJldHVybiBhY2M7IC8vIHJldHVybiB1cGRhdGVkIGtleVxuICB9LCBkZWxldGVkVmFsdWVzKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpZmY7XG4iLCJpbXBvcnQgZGlmZiBmcm9tICcuL2RpZmYuanMnO1xuaW1wb3J0IGFkZGVkRGlmZiBmcm9tICcuL2FkZGVkLmpzJztcbmltcG9ydCBkZWxldGVkRGlmZiBmcm9tICcuL2RlbGV0ZWQuanMnO1xuaW1wb3J0IHVwZGF0ZWREaWZmIGZyb20gJy4vdXBkYXRlZC5qcyc7XG5pbXBvcnQgZGV0YWlsZWREaWZmIGZyb20gJy4vZGV0YWlsZWQuanMnO1xuXG5leHBvcnQge1xuICBhZGRlZERpZmYsXG4gIGRpZmYsXG4gIGRlbGV0ZWREaWZmLFxuICB1cGRhdGVkRGlmZixcbiAgZGV0YWlsZWREaWZmXG59O1xuIiwiaW1wb3J0IHsgaXNEYXRlLCBpc0VtcHR5T2JqZWN0LCBpc09iamVjdCwgaGFzT3duUHJvcGVydHkgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuY29uc3QgdXBkYXRlZERpZmYgPSAobGhzLCByaHMpID0+IHtcbiAgaWYgKGxocyA9PT0gcmhzKSByZXR1cm4ge307XG5cbiAgaWYgKCFpc09iamVjdChsaHMpIHx8ICFpc09iamVjdChyaHMpKSByZXR1cm4gcmhzO1xuXG4gIGNvbnN0IGwgPSBsaHM7XG4gIGNvbnN0IHIgPSByaHM7XG5cbiAgaWYgKGlzRGF0ZShsKSB8fCBpc0RhdGUocikpIHtcbiAgICBpZiAobC52YWx1ZU9mKCkgPT0gci52YWx1ZU9mKCkpIHJldHVybiB7fTtcbiAgICByZXR1cm4gcjtcbiAgfVxuXG4gIHJldHVybiBPYmplY3Qua2V5cyhyKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KGwsIGtleSkpIHtcbiAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB1cGRhdGVkRGlmZihsW2tleV0sIHJba2V5XSk7XG5cbiAgICAgIC8vIElmIHRoZSBkaWZmZXJlbmNlIGlzIGVtcHR5LCBhbmQgdGhlIGxocyBpcyBhbiBlbXB0eSBvYmplY3Qgb3IgdGhlIHJocyBpcyBub3QgYW4gZW1wdHkgb2JqZWN0XG4gICAgICBpZiAoaXNFbXB0eU9iamVjdChkaWZmZXJlbmNlKSAmJiAhaXNEYXRlKGRpZmZlcmVuY2UpICYmIChpc0VtcHR5T2JqZWN0KGxba2V5XSkgfHwgIWlzRW1wdHlPYmplY3QocltrZXldKSkpXG4gICAgICAgIHJldHVybiBhY2M7IC8vIHJldHVybiBubyBkaWZmXG5cbiAgICAgIGFjY1trZXldID0gZGlmZmVyZW5jZTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlZERpZmY7XG4iLCJleHBvcnQgY29uc3QgaXNEYXRlID0gZCA9PiBkIGluc3RhbmNlb2YgRGF0ZTtcbmV4cG9ydCBjb25zdCBpc0VtcHR5ID0gbyA9PiBPYmplY3Qua2V5cyhvKS5sZW5ndGggPT09IDA7XG5leHBvcnQgY29uc3QgaXNPYmplY3QgPSBvID0+IG8gIT0gbnVsbCAmJiB0eXBlb2YgbyA9PT0gJ29iamVjdCc7XG5leHBvcnQgY29uc3QgaGFzT3duUHJvcGVydHkgPSAobywgLi4uYXJncykgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIC4uLmFyZ3MpXG5leHBvcnQgY29uc3QgaXNFbXB0eU9iamVjdCA9IChvKSA9PiBpc09iamVjdChvKSAmJiBpc0VtcHR5KG8pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0IHsgdXBkYXRlZERpZmYgYXMgZGlmZiB9IGZyb20gXCJkZWVwLW9iamVjdC1kaWZmXCI7XG5leHBvcnQgdmFyIFdTX1JFQURZX1NUQVRFO1xuKGZ1bmN0aW9uIChXU19SRUFEWV9TVEFURSkge1xuICAgIFdTX1JFQURZX1NUQVRFW1dTX1JFQURZX1NUQVRFW1wiQ29ubmVjdGluZ1wiXSA9IDBdID0gXCJDb25uZWN0aW5nXCI7XG4gICAgV1NfUkVBRFlfU1RBVEVbV1NfUkVBRFlfU1RBVEVbXCJPcGVuXCJdID0gMV0gPSBcIk9wZW5cIjtcbiAgICBXU19SRUFEWV9TVEFURVtXU19SRUFEWV9TVEFURVtcIkNsb3NpbmdcIl0gPSAyXSA9IFwiQ2xvc2luZ1wiO1xuICAgIFdTX1JFQURZX1NUQVRFW1dTX1JFQURZX1NUQVRFW1wiQ2xvc2VkXCJdID0gM10gPSBcIkNsb3NlZFwiO1xufSkoV1NfUkVBRFlfU1RBVEUgfHwgKFdTX1JFQURZX1NUQVRFID0ge30pKTtcbmZ1bmN0aW9uIG5lc3RlZEluY2x1ZGVzKG9iaiwgdG9NYXRjaCkge1xuICAgIHZhciBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMob2JqKTtcbiAgICB2YXIgbWFwcGVkRW50cmllcyA9IGVudHJpZXMubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgayA9IF9hWzBdLCB2ID0gX2FbMV07XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIFtrLCBuZXN0ZWRJbmNsdWRlcyh2LCB0b01hdGNoKV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICAgICAgdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCIgfHxcbiAgICAgICAgICAgIHR5cGVvZiB2ID09PSBcInN5bWJvbFwiIHx8XG4gICAgICAgICAgICB0eXBlb2YgdiA9PT0gXCJiaWdpbnRcIiB8fFxuICAgICAgICAgICAgdHlwZW9mIHYgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBbaywgZmFsc2VdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gW2ssIHYuaW5jbHVkZXModG9NYXRjaCldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtrLCBmYWxzZV07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWFwcGVkRW50cmllcy5zb21lKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgXyA9IF9hWzBdLCB2ID0gX2FbMV07XG4gICAgICAgIHJldHVybiB2ID09PSB0cnVlO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbWFrZUxvZ0VudHJ5KHBhY2tldCkge1xuICAgIHZhciBfYTtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHBhY2tldC5fdCkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICB2YXIgcGFja2V0VHlwZSA9IChfYSA9IHBhY2tldC5fZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnR5cGU7XG4gICAgdmFyIG1heWJlQWN0aW9uVHlwZSA9IHBhY2tldFR5cGUgPT0gbnVsbCA/IFwiXCIgOiBcIlwiLmNvbmNhdChwYWNrZXRUeXBlLCBcIiA9PiBcIik7XG4gICAgdmFyIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShwYWNrZXQuX2QsIG51bGwsIDIpO1xuICAgIHZhciBzdHIgPSBcIltcIi5jb25jYXQoZGF0ZSwgXCJdOiBcIikuY29uY2F0KG1heWJlQWN0aW9uVHlwZSkuY29uY2F0KGNvbnRlbnQpO1xuICAgIHZhciBfYiA9IHN0ci5zcGxpdChcIlxcblwiKSwgZmlyc3RMaW5lID0gX2JbMF0sIG90aGVyTGluZXMgPSBfYi5zbGljZSgxKTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICB2YXIgZGV0YWlsc05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGV0YWlsc1wiKTtcbiAgICB2YXIgc3VtbWFyeU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3VtbWFyeVwiKTtcbiAgICB2YXIgcHJlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIik7XG4gICAgdmFyIHN1bW1hcnlUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZpcnN0TGluZSk7XG4gICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUob3RoZXJMaW5lcy5qb2luKFwiXFxuXCIpKTtcbiAgICBkZXRhaWxzTm9kZS5zZXRBdHRyaWJ1dGUoXCJvcGVuXCIsIFwidHJ1ZVwiKTtcbiAgICBkZXRhaWxzTm9kZS5jbGFzc0xpc3QuYWRkKFwibG9nXCIpO1xuICAgIGRldGFpbHNOb2RlLmNsYXNzTGlzdC5hZGQoXCJsb2ctXCIuY29uY2F0KHBhY2tldC5faykpO1xuICAgIHN1bW1hcnlOb2RlLmFwcGVuZENoaWxkKHN1bW1hcnlUZXh0Tm9kZSk7XG4gICAgcHJlTm9kZS5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgZGV0YWlsc05vZGUuYXBwZW5kQ2hpbGQoc3VtbWFyeU5vZGUpO1xuICAgIGRldGFpbHNOb2RlLmFwcGVuZENoaWxkKHByZU5vZGUpO1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoZGV0YWlsc05vZGUpO1xuICAgIHJldHVybiBub2RlO1xufVxudmFyIG1ha2VOb2RlVG9nZ2xlRm9sZGluZyA9IGZ1bmN0aW9uIChhbGxGb2xkZWQpIHsgcmV0dXJuIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKGFsbEZvbGRlZCkge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcIm9wZW5cIiwgdHJ1ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShcIm9wZW5cIik7XG4gICAgfVxufTsgfTtcbihmdW5jdGlvbiBpaWZlKHdzVXJpKSB7XG4gICAgaWYgKHdzVXJpID09PSB2b2lkIDApIHsgd3NVcmkgPSBcIndzOi8vbG9jYWxob3N0OjgwODBcIjsgfVxuICAgIGNvbnNvbGUubG9nKFwiW3Jnc2gtZGVidWdnZXIvdWldIEhleSwgd2lsbCBjb25uZWN0IHRvIHdzIG9uOiBcIi5jb25jYXQod3NVcmkpKTtcbiAgICB2YXIgd3MgPSBuZXcgV2ViU29ja2V0KHdzVXJpKTtcbiAgICB2YXIgc3RhdHMgPSB7XG4gICAgICAgIGRpc3BhdGNoZWRBY3Rpb25zOiAwLFxuICAgICAgICBzdGF0ZVVwZGF0ZXM6IDAsXG4gICAgfTtcbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgIGFjdGlvbnNBbGxGb2xkZWQ6IGZhbHNlLFxuICAgICAgICBzdGF0ZUFsbEZvbGRlZDogZmFsc2UsXG4gICAgICAgIHN0YXRlRGlmZk1vZGU6IGZhbHNlLFxuICAgICAgICBsYXN0U3RhdGVEYXRhOiBudWxsLFxuICAgICAgICBhY3Rpb25zRmlsdGVyQnlWYWx1ZTogXCJcIixcbiAgICAgICAgc3RhdGVGaWx0ZXJCeVZhbHVlOiBcIlwiLFxuICAgIH07XG4gICAgdmFyIHdzUmVhZHlTdGF0ZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3cy1yZWFkeS1zdGF0ZVwiKTtcbiAgICB2YXIgYWN0aW9uc0xvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aW9ucy1kaXNwYXRjaFwiKTtcbiAgICB2YXIgYWN0aW9uc0lucHV0RmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC1maWx0ZXItYWN0aW9uc1wiKTtcbiAgICB2YXIgYWN0aW9uc0Rpc3BhdGNoQ291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlzcGF0Y2hlZC1hY3Rpb25zLWNvdW50ZXJcIik7XG4gICAgdmFyIGFjdGlvbnNUb2dnbGVGb2xkaW5nQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG4tYWN0aW9uLXRvZ2dsZS1mb2xkaW5nXCIpO1xuICAgIHZhciBzdGF0ZUxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhdGUtdXBkYXRlc1wiKTtcbiAgICB2YXIgc3RhdGVJbnB1dEZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtZmlsdGVyLXN0YXRlXCIpO1xuICAgIHZhciBzdGF0ZVVwZGF0ZXNDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGF0ZS11cGRhdGVzLWNvdW50ZXJcIik7XG4gICAgdmFyIHN0YXRlRGlmZk1vZGVTdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXRlLWRpZmYtbW9kZVwiKTtcbiAgICB2YXIgc3RhdGVUb2dnbGVGb2xkaW5nQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG4tc3RhdGUtdG9nZ2xlLWZvbGRpbmdcIik7XG4gICAgdmFyIHN0YXRlVG9nZ2xlRGlmZk1vZGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bi1zdGF0ZS10b2dnbGUtZGlmZi1tb2RlXCIpO1xuICAgIGFjdGlvbnNJbnB1dEZpbHRlciA9PT0gbnVsbCB8fCBhY3Rpb25zSW5wdXRGaWx0ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFjdGlvbnNJbnB1dEZpbHRlci5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgICBpZiAoZXYudGFyZ2V0LnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0YXRlLmFjdGlvbnNGaWx0ZXJCeVZhbHVlID0gZXYudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaWx0ZXI6OmFjdGlvbnNGaWx0ZXJCeVZhbHVlOlwiLCBzdGF0ZS5hY3Rpb25zRmlsdGVyQnlWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBzdGF0ZUlucHV0RmlsdGVyID09PSBudWxsIHx8IHN0YXRlSW5wdXRGaWx0ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlSW5wdXRGaWx0ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgaWYgKGV2LnRhcmdldC52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZS5zdGF0ZUZpbHRlckJ5VmFsdWUgPSBldi50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbHRlcjo6c3RhdGVGaWx0ZXJCeVZhbHVlOlwiLCBzdGF0ZS5zdGF0ZUZpbHRlckJ5VmFsdWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgYWN0aW9uc1RvZ2dsZUZvbGRpbmdCdXR0b24gPT09IG51bGwgfHwgYWN0aW9uc1RvZ2dsZUZvbGRpbmdCdXR0b24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFjdGlvbnNUb2dnbGVGb2xkaW5nQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhbGxBY3Rpb25Ob2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubG9nLWFjdGlvblwiKTtcbiAgICAgICAgYWxsQWN0aW9uTm9kZXMuZm9yRWFjaChtYWtlTm9kZVRvZ2dsZUZvbGRpbmcoc3RhdGUuYWN0aW9uc0FsbEZvbGRlZCkpO1xuICAgICAgICBzdGF0ZS5hY3Rpb25zQWxsRm9sZGVkID0gIXN0YXRlLmFjdGlvbnNBbGxGb2xkZWQ7XG4gICAgfSk7XG4gICAgc3RhdGVUb2dnbGVGb2xkaW5nQnV0dG9uID09PSBudWxsIHx8IHN0YXRlVG9nZ2xlRm9sZGluZ0J1dHRvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGVUb2dnbGVGb2xkaW5nQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhbGxTdGF0ZU5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5sb2ctc3RhdGVcIik7XG4gICAgICAgIGFsbFN0YXRlTm9kZXMuZm9yRWFjaChtYWtlTm9kZVRvZ2dsZUZvbGRpbmcoc3RhdGUuc3RhdGVBbGxGb2xkZWQpKTtcbiAgICAgICAgc3RhdGUuc3RhdGVBbGxGb2xkZWQgPSAhc3RhdGUuc3RhdGVBbGxGb2xkZWQ7XG4gICAgfSk7XG4gICAgc3RhdGVUb2dnbGVEaWZmTW9kZUJ1dHRvbiA9PT0gbnVsbCB8fCBzdGF0ZVRvZ2dsZURpZmZNb2RlQnV0dG9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZVRvZ2dsZURpZmZNb2RlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXRlLnN0YXRlRGlmZk1vZGUgPSAhc3RhdGUuc3RhdGVEaWZmTW9kZTtcbiAgICAgICAgaWYgKHN0YXRlRGlmZk1vZGVTdGF0dXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhdGVEaWZmTW9kZVN0YXR1cy50ZXh0Q29udGVudCA9IHN0YXRlLnN0YXRlRGlmZk1vZGUgPyBcIk9uXCIgOiBcIk9mZlwiO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgd3Mub25vcGVuID0gZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgd3Muc2VuZChcInRhaWxcIik7XG4gICAgICAgIGlmICh3c1JlYWR5U3RhdGVFbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB3c1JlYWR5U3RhdGVFbC50ZXh0Q29udGVudCA9IFwiY29ubmVjdGVkXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJlY3JlYXRlV2ViU29ja2V0KGxvZykge1xuICAgICAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gV1NfUkVBRFlfU1RBVEUuT3Blbikge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gV1NfUkVBRFlfU1RBVEUuQ2xvc2VkKSB7XG4gICAgICAgICAgICBsb2cgPT09IG51bGwgfHwgbG9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsb2coXCJbcmdzaC1kZWJ1Z2dlci91aV0gTG9zdCBjb25uZWN0aW9uIHRvIGRlYnVnZ2VyLiBTbGVlcGluZyAzcyBiZWZvcmUgcmVjb25uZWN0aW5nLi4uXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdpdmUgaXQgYSBncmFjZSBwZXJpb2Qgb2YgM3MgYmVmb3JlIHJlY29ubmVjdGluZ1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh3cy5yZWFkeVN0YXRlICE9PSBXU19SRUFEWV9TVEFURS5PcGVuKSB7XG4gICAgICAgICAgICAgICAgd3MgPSBuZXcgV2ViU29ja2V0KHdzVXJpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCAqIDMpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB3cy5vbmVycm9yID0gZnVuY3Rpb24gZXJyb3IoZXYpIHtcbiAgICAgICAgaWYgKHdzUmVhZHlTdGF0ZUVsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHdzUmVhZHlTdGF0ZUVsLnRleHRDb250ZW50ID0gXCJlcnJvcmVkLCBlcnJvcjogXCIgKyBldi5tZXNzYWdlO1xuICAgICAgICAgICAgcmVjcmVhdGVXZWJTb2NrZXQoZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB3c1JlYWR5U3RhdGVFbC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlY3JlYXRlV2ViU29ja2V0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHdzLm9uY2xvc2UgPSBmdW5jdGlvbiBjbG9zZShfYSkge1xuICAgICAgICB2YXIgY29kZSA9IF9hLmNvZGUsIHJlYXNvbiA9IF9hLnJlYXNvbjtcbiAgICAgICAgdmFyIHRhZ3MgPSBbXCJjb2RlPVwiLmNvbmNhdChjb2RlIHx8IFwibm9uZVwiKSwgXCJyZWFzb249XCIuY29uY2F0KHJlYXNvbiB8fCBcIm5vbmVcIildO1xuICAgICAgICBpZiAod3NSZWFkeVN0YXRlRWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgd3NSZWFkeVN0YXRlRWwudGV4dENvbnRlbnQgPSBcImNvbm5lY3Rpb24gY2xvc2VkLiBcIi5jb25jYXQodGFncy5qb2luKFwiIFwiKSk7XG4gICAgICAgICAgICByZWNyZWF0ZVdlYlNvY2tldChmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHdzUmVhZHlTdGF0ZUVsLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVjcmVhdGVXZWJTb2NrZXQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgd3Mub25tZXNzYWdlID0gZnVuY3Rpb24gbWVzc2FnZShldikge1xuICAgICAgICB2YXIgZGF0YSA9IGV2LmRhdGEudG9TdHJpbmcoKTtcbiAgICAgICAgdmFyIHBhY2tldCA9IEpTT04ucGFyc2UoZGF0YS50b1N0cmluZygpKTtcbiAgICAgICAgaWYgKHBhY2tldC5fayA9PT0gXCJhY3Rpb25cIikge1xuICAgICAgICAgICAgc3RhdHMuZGlzcGF0Y2hlZEFjdGlvbnMgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwYWNrZXQuX2sgPT09IFwic3RhdGVcIikge1xuICAgICAgICAgICAgc3RhdHMuc3RhdGVVcGRhdGVzICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhY2tldC5fayA9PT0gXCJzdGF0ZVwiICYmXG4gICAgICAgICAgICBzdGF0ZS5zdGF0ZUZpbHRlckJ5VmFsdWUgIT0gbnVsbCAmJlxuICAgICAgICAgICAgc3RhdGUuc3RhdGVGaWx0ZXJCeVZhbHVlLnRyaW0oKSAhPT0gXCJcIiAmJlxuICAgICAgICAgICAgbmVzdGVkSW5jbHVkZXMocGFja2V0Ll9kLCBzdGF0ZS5zdGF0ZUZpbHRlckJ5VmFsdWUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbmNsdWRlc1N0YXRlRmlsdGVyOlwiLCBuZXN0ZWRJbmNsdWRlcyhwYWNrZXQuX2QsIHN0YXRlLnN0YXRlRmlsdGVyQnlWYWx1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBza2lwXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhY2tldC5fayA9PT0gXCJhY3Rpb25cIiAmJlxuICAgICAgICAgICAgc3RhdGUuYWN0aW9uc0ZpbHRlckJ5VmFsdWUgIT0gbnVsbCAmJlxuICAgICAgICAgICAgc3RhdGUuYWN0aW9uc0ZpbHRlckJ5VmFsdWUudHJpbSgpICE9PSBcIlwiICYmXG4gICAgICAgICAgICBuZXN0ZWRJbmNsdWRlcyhwYWNrZXQuX2QsIHN0YXRlLmFjdGlvbnNGaWx0ZXJCeVZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5jbHVkZXNBY3Rpb25zRmlsdGVyOlwiLCBuZXN0ZWRJbmNsdWRlcyhwYWNrZXQuX2QsIHN0YXRlLmFjdGlvbnNGaWx0ZXJCeVZhbHVlKSk7XG4gICAgICAgICAgICByZXR1cm47IC8vIHNraXBcbiAgICAgICAgfVxuICAgICAgICB2YXIgbG9nRW50cnk7XG4gICAgICAgIHZhciBub2RlVG9VcGRhdGU7XG4gICAgICAgIGlmIChwYWNrZXQuX2sgPT09IFwic3RhdGVcIiAmJlxuICAgICAgICAgICAgc3RhdGUuc3RhdGVEaWZmTW9kZSA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgc3RhdGUubGFzdFN0YXRlRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgZGlmZlJlc3VsdCA9IGRpZmYoc3RhdGUubGFzdFN0YXRlRGF0YSwgcGFja2V0Ll9kKTtcbiAgICAgICAgICAgIHZhciBkaWZmUGFja2V0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHBhY2tldCksIHsgX2Q6IGRpZmZSZXN1bHQgfSk7XG4gICAgICAgICAgICBsb2dFbnRyeSA9IG1ha2VMb2dFbnRyeShkaWZmUGFja2V0KTtcbiAgICAgICAgICAgIG5vZGVUb1VwZGF0ZSA9IHN0YXRlTG9nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nRW50cnkgPSBtYWtlTG9nRW50cnkocGFja2V0KTtcbiAgICAgICAgICAgIG5vZGVUb1VwZGF0ZSA9IHBhY2tldC5fayA9PT0gXCJhY3Rpb25cIiA/IGFjdGlvbnNMb2cgOiBzdGF0ZUxvZztcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZVRvVXBkYXRlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGVUb1VwZGF0ZS5hcHBlbmRDaGlsZChsb2dFbnRyeSk7XG4gICAgICAgICAgICBub2RlVG9VcGRhdGUuc2Nyb2xsVG9wID0gbm9kZVRvVXBkYXRlLnNjcm9sbEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uc0Rpc3BhdGNoQ291bnRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICBhY3Rpb25zRGlzcGF0Y2hDb3VudGVyLnRleHRDb250ZW50ID0gXCIoXCIuY29uY2F0KHN0YXRzLmRpc3BhdGNoZWRBY3Rpb25zLCBcIiBkaXNwYXRjaGVzKVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGVVcGRhdGVzQ291bnRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZVVwZGF0ZXNDb3VudGVyLnRleHRDb250ZW50ID0gXCIoXCIuY29uY2F0KHN0YXRzLnN0YXRlVXBkYXRlcywgXCIgdXBkYXRlcylcIik7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUubGFzdFN0YXRlRGF0YSA9IHBhY2tldC5fZDtcbiAgICB9O1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==