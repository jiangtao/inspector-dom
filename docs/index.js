(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Inspector"] = factory();
	else
		root["Inspector"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var VALID_CLASSNAME = /^[_a-zA-Z\\- ]*$/\n\nvar constructCssPath = el => {\n  if (!(el instanceof Element)) return\n  let path = []\n  while (el.nodeType === Node.ELEMENT_NODE) {\n    let selector = el.nodeName.toLowerCase()\n    if (el.id) {\n      selector += `#${el.id}`\n      path.unshift(selector)\n      break\n    } else if (el.className && VALID_CLASSNAME.test(el.className)) {\n      selector += `.${(el.className.trim()).replace(/\\s+/g, '.')}`\n    } else {\n      let sib = el,\n        nth = 1\n      while ((sib = sib.previousElementSibling)) {\n        if (sib.nodeName.toLowerCase() == selector) nth++\n      }\n      if (nth != 1) selector += ':nth-of-type(' + nth + ')'\n    }\n    path.unshift(selector)\n    el = el.parentNode\n  }\n  return path.join(' > ')\n}\n\n\nvar defaultProps = {\n  root: 'body',\n  outlineStyle: '5px solid rgba(204, 146, 62, 0.3)',\n  onClick: el => console.log('Element was clicked:', constructCssPath(el)),\n}\n\nvar Inspector = ((props = {}) => {\n  const {root, excluded, included, outlineStyle, highlightClass} = {\n    ...defaultProps,\n    ...props\n  }\n  let onClick = props.onClick || defaultProps.onClick\n\n  let selected, excludedElements, includedElements\n\n  const removeHighlight = el => {\n    if (el) {\n      el.style.outline = 'none'\n      el.classList.remove(highlightClass)\n    }\n  }\n\n  const highlight = el => {\n    el.classList.add(highlightClass)\n    el.style.outline = outlineStyle\n    el.style.outlineOffset = `-${el.style.outlineWidth}`\n\n  }\n\n  const shouldBeExcluded = ev => {\n    if (excludedElements && excludedElements.length && excludedElements.some(parent => (parent === ev.target || parent.contains(ev.target)))){\n      return true\n    }\n  }\n  const shouldIncluded = ev => {\n    return includedElements && includedElements.length && includedElements.some(parent => (parent === ev.target))\n  }\n\n  const handleMouseOver = ev => {\n    if (shouldBeExcluded(ev)){\n      return\n    }\n    if (!shouldIncluded(ev)) {\n      return\n    }\n    selected = ev.target\n    highlight(selected)\n  }\n\n  const handleMouseOut = ev => {\n    if (shouldBeExcluded(ev)){\n      return\n    }\n    if (!shouldIncluded(ev)) {\n      return\n    }\n    removeHighlight(ev.target)\n  }\n\n  const handleClick = ev => {\n    if (shouldBeExcluded(ev)){\n      return\n    }\n    if (!shouldIncluded(ev)) {\n      return\n    }\n    ev.preventDefault()\n    ev.stopPropagation()\n    onClick(ev.target)\n    return false\n  }\n\n  const prepareExcluded = (rootEl) => {\n    if (!excluded.length){\n      return []\n    }\n    const excludedNested = excluded.flatMap(element => {\n      if (typeof element === 'string' || element instanceof String){\n        return Array.from(rootEl.querySelectorAll(element))\n      } else if (element instanceof Element){\n        return [element]\n      } else if (element.length>0 && element[0] instanceof Element){\n        return Array.from(element)\n      }\n    })\n    return Array.from(excludedNested).flat()\n  }\n  const prepareIncluded = (rootEl) => {\n    if (!included.length){\n      return []\n    }\n    const includedNested = included.flatMap(element => {\n      if (typeof element === 'string' || element instanceof String){\n        return Array.from(rootEl.querySelectorAll(element))\n      } else if (element instanceof Element){\n        return [element]\n      } else if (element.length>0 && element[0] instanceof Element){\n        return Array.from(element)\n      }\n    })\n    return Array.from(includedNested).flat()\n  }\n\n  const enable = onClickCallback => {\n    const rootEl = document.querySelector(root)\n    if (!rootEl)\n      return\n\n    if (excluded){\n      excludedElements = prepareExcluded(rootEl)\n    }\n    if (included){\n      includedElements = prepareIncluded(rootEl)\n    }\n    rootEl.addEventListener('mouseover', handleMouseOver, true)\n    rootEl.addEventListener('mouseout', handleMouseOut, true)\n    rootEl.addEventListener('click', handleClick, true)\n    if (onClickCallback){\n      onClick = onClickCallback\n    }\n  }\n  const cancel = () => {\n    const rootEl = document.querySelector(root)\n    if (!rootEl)\n      return\n    rootEl.removeEventListener('mouseover', handleMouseOver, true)\n    rootEl.removeEventListener('mouseout', handleMouseOut, true)\n    rootEl.removeEventListener('click', handleClick, true)\n    removeHighlight(selected)\n\n  }\n  return {\n    enable,\n    cancel\n  }\n})\n\nmodule.exports = Inspector\n\n\n//# sourceURL=webpack://Inspector/./src/index.js?");

/***/ })

/******/ });
});