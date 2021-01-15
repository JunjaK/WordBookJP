(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.vuetify-loader"],{

/***/ "./node_modules/vuetify-loader/lib/runtime/installComponents.js":
/*!**********************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/runtime/installComponents.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).\n// This module is a runtime utility for cleaner component module output and will\n// be included in the final webpack user bundle.\n\nmodule.exports = function installComponents (component, components) {\n  var options = typeof component.exports === 'function'\n    ? component.exports.extendOptions\n    : component.options\n\n  if (typeof component.exports === 'function') {\n    options.components = component.exports.options.components\n  }\n\n  options.components = options.components || {}\n\n  for (var i in components) {\n    options.components[i] = options.components[i] || components[i]\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/vuetify-loader/lib/runtime/installComponents.js?");

/***/ })

}]);