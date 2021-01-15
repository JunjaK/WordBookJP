/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"npm.vuetify","npm.core-js","npm.axios","npm.roboto-fontface","npm.babel","npm.mdi","npm.css-loader","npm.vee-validate","npm.vue-style-loader","npm.node-libs-browser","npm.path-browserify","npm.register-service-worker","npm.vue-loader","npm.vue-router","npm.vue","npm.vuetify-loader","npm.vuex","npm.webpack"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      drawer: false,\n      navMenu: [{\n        icon: 'mdi-account-arrow-right',\n        text: 'Log out'\n      }, {\n        icon: 'mdi-home',\n        text: 'Home',\n        to: {\n          path: '/'\n        }\n      }, {\n        icon: 'mdi-file-document',\n        text: 'Test',\n        to: {\n          path: '/test'\n        }\n      }, {\n        icon: 'mdi-book-open',\n        text: 'Test Result',\n        to: {\n          path: '/testresult'\n        }\n      }],\n      navIndex: 1\n    };\n  },\n  computed: Object(_Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__[\"mapGetters\"])({\n    getToken: 'getAccessToken'\n  })),\n  created: function created() {},\n  mounted: function mounted() {\n    if (!this.getToken) {\n      this.$router.push('/login');\n    }\n  },\n  methods: {\n    logOut: function logOut() {\n      this.$store.dispatch('commitDelToken');\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"24939633-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"24939633-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"v-app\",\n    { attrs: { id: \"inspire\" } },\n    [\n      _c(\n        \"v-app-bar\",\n        {\n          attrs: { elevation: \"1\", app: \"\", fixed: \"\", flat: \"\", absolute: \"\" }\n        },\n        [\n          _c(\n            \"a\",\n            {\n              on: {\n                click: function($event) {\n                  return _vm.$router.go(\"/\")\n                }\n              }\n            },\n            [\n              _c(\n                \"div\",\n                { staticClass: \"subTitleStyle\" },\n                [\n                  _c(\n                    \"v-icon\",\n                    { staticClass: \"mr-1 mt-n1\", attrs: { color: \"primary\" } },\n                    [_vm._v(\"mdi-tag-multiple\")]\n                  ),\n                  _vm._v(\"JP Wordbook \")\n                ],\n                1\n              )\n            ]\n          ),\n          !_vm.$vuetify.breakpoint.xs && _vm.getToken\n            ? _c(\n                \"v-row\",\n                { staticClass: \"mx-0\" },\n                [\n                  _c(\"v-spacer\"),\n                  _c(\"a\", [\n                    _c(\n                      \"div\",\n                      {\n                        staticClass: \"titleStyle\",\n                        staticStyle: { \"margin-left\": \"-42px\" },\n                        on: {\n                          click: function($event) {\n                            return _vm.$router.push(\"/\")\n                          }\n                        }\n                      },\n                      [_vm._v(\"HOME\")]\n                    )\n                  ]),\n                  _c(\n                    \"div\",\n                    {\n                      staticClass: \"mx-7\",\n                      staticStyle: {\n                        color: \"#8ac6d1\",\n                        \"font-size\": \"22px\",\n                        \"margin-top\": \"0px\"\n                      }\n                    },\n                    [_vm._v(\"|\")]\n                  ),\n                  _c(\"a\", [\n                    _c(\n                      \"div\",\n                      {\n                        staticClass: \"titleStyle\",\n                        on: {\n                          click: function($event) {\n                            return _vm.$router.push(\"/test\")\n                          }\n                        }\n                      },\n                      [_vm._v(\"TEST\")]\n                    )\n                  ]),\n                  _c(\n                    \"div\",\n                    {\n                      staticClass: \"mx-7\",\n                      staticStyle: {\n                        color: \"#8ac6d1\",\n                        \"font-size\": \"22px\",\n                        \"margin-top\": \"0px\"\n                      }\n                    },\n                    [_vm._v(\"|\")]\n                  ),\n                  _c(\"a\", [\n                    _c(\n                      \"div\",\n                      {\n                        staticClass: \"titleStyle\",\n                        on: {\n                          click: function($event) {\n                            return _vm.$router.push(\"/testresult\")\n                          }\n                        }\n                      },\n                      [_vm._v(\"TEST RESULT\")]\n                    )\n                  ]),\n                  _c(\"v-spacer\"),\n                  _vm.getToken\n                    ? _c(\"div\", { staticStyle: { \"margin-top\": \"3px\" } }, [\n                        _c(\n                          \"a\",\n                          {\n                            staticClass: \"subTitleStyle\",\n                            on: {\n                              click: function($event) {\n                                return _vm.logOut()\n                              }\n                            }\n                          },\n                          [\n                            _c(\n                              \"v-icon\",\n                              {\n                                staticClass: \"mr-1 mt-n1\",\n                                attrs: { color: \"primary\" }\n                              },\n                              [_vm._v(\"mdi-account-arrow-right\")]\n                            ),\n                            _vm._v(\"LOG OUT \")\n                          ],\n                          1\n                        )\n                      ])\n                    : _c(\"div\", { staticStyle: { \"margin-top\": \"3px\" } }, [\n                        _c(\n                          \"a\",\n                          {\n                            staticClass: \"subTitleStyle\",\n                            on: {\n                              click: function($event) {\n                                return _vm.$router.push(\"/login\")\n                              }\n                            }\n                          },\n                          [\n                            _c(\n                              \"v-icon\",\n                              {\n                                staticClass: \"mr-1 mt-n1\",\n                                attrs: { color: \"primary\" }\n                              },\n                              [_vm._v(\"mdi-account-arrow-left\")]\n                            ),\n                            _vm._v(\"LOG IN \")\n                          ],\n                          1\n                        )\n                      ])\n                ],\n                1\n              )\n            : _c(\n                \"v-row\",\n                [\n                  _c(\"v-spacer\"),\n                  _vm.getToken\n                    ? _c(\"v-app-bar-nav-icon\", {\n                        staticStyle: { color: \"#8ac6d1\" },\n                        on: {\n                          click: function($event) {\n                            _vm.drawer = true\n                          }\n                        }\n                      })\n                    : _vm._e()\n                ],\n                1\n              )\n        ],\n        1\n      ),\n      _vm.getToken\n        ? _c(\n            \"v-navigation-drawer\",\n            {\n              attrs: { app: \"\", right: \"\", temporary: \"\" },\n              model: {\n                value: _vm.drawer,\n                callback: function($$v) {\n                  _vm.drawer = $$v\n                },\n                expression: \"drawer\"\n              }\n            },\n            [\n              _c(\n                \"div\",\n                {\n                  staticClass: \"titleStyle\",\n                  staticStyle: { \"text-align\": \"center\", \"margin-top\": \"20px\" }\n                },\n                [_vm._v(\"Menu\")]\n              ),\n              _c(\n                \"v-list\",\n                [\n                  _c(\n                    \"v-list-item-group\",\n                    {\n                      attrs: { color: \"primary\" },\n                      model: {\n                        value: _vm.navIndex,\n                        callback: function($$v) {\n                          _vm.navIndex = $$v\n                        },\n                        expression: \"navIndex\"\n                      }\n                    },\n                    _vm._l(_vm.navMenu, function(item, i) {\n                      return _c(\n                        \"v-list-item\",\n                        { key: i, attrs: { to: item.to } },\n                        [\n                          _c(\n                            \"v-list-item-icon\",\n                            [\n                              _c(\"v-icon\", {\n                                domProps: { textContent: _vm._s(item.icon) }\n                              })\n                            ],\n                            1\n                          ),\n                          _c(\"v-list-item-content\", [\n                            item.text === \"Log out\"\n                              ? _c(\"div\", {\n                                  staticClass: \"contentStyle\",\n                                  domProps: { textContent: _vm._s(item.text) },\n                                  on: { click: _vm.logOut }\n                                })\n                              : _c(\"div\", {\n                                  staticClass: \"contentStyle\",\n                                  domProps: { textContent: _vm._s(item.text) }\n                                })\n                          ])\n                        ],\n                        1\n                      )\n                    }),\n                    1\n                  )\n                ],\n                1\n              ),\n              _c(\"v-divider\", { staticClass: \"mx-3 my-2\" }),\n              _c(\n                \"v-row\",\n                { staticClass: \"ml-3 my-3\", attrs: { justify: \"start\" } },\n                [\n                  _c(\n                    \"div\",\n                    {\n                      staticStyle: {\n                        \"font-size\": \"15px\",\n                        \"font-weight\": \"400\",\n                        color: \"#343a40\"\n                      }\n                    },\n                    [\n                      _c(\n                        \"v-icon\",\n                        {\n                          staticClass: \"mr-1 mt-n1\",\n                          attrs: { size: \"20\", color: \"primary\" }\n                        },\n                        [_vm._v(\"mdi-tag-multiple\")]\n                      ),\n                      _vm._v(\"JP Wordbook \")\n                    ],\n                    1\n                  ),\n                  _c(\n                    \"div\",\n                    {\n                      staticStyle: {\n                        \"font-size\": \"15px\",\n                        \"font-weight\": \"400\",\n                        color: \"#343a40\",\n                        \"margin-left\": \"15px\"\n                      }\n                    },\n                    [_vm._v(\"made by Junjak\")]\n                  )\n                ]\n              ),\n              _c(\n                \"a\",\n                { attrs: { href: \"https://github.com/JunjaK/WordBookJP\" } },\n                [\n                  _c(\n                    \"div\",\n                    {\n                      staticStyle: {\n                        \"font-size\": \"15px\",\n                        \"font-weight\": \"500\",\n                        \"text-align\": \"right\",\n                        \"margin-right\": \"12px\"\n                      }\n                    },\n                    [_vm._v(\"GitHub Link\")]\n                  )\n                ]\n              )\n            ],\n            1\n          )\n        : _vm._e(),\n      _c(\"v-main\", [_c(\"router-view\")], 1),\n      !_vm.$vuetify.breakpoint.xs\n        ? _c(\n            \"v-footer\",\n            [\n              _c(\n                \"v-row\",\n                { staticClass: \"mx-0\", attrs: { justify: \"center\" } },\n                [\n                  _c(\n                    \"div\",\n                    {\n                      staticStyle: {\n                        \"font-size\": \"15px\",\n                        \"font-weight\": \"400\",\n                        color: \"#343a40\",\n                        \"margin-left\": \"15px\"\n                      }\n                    },\n                    [\n                      _c(\n                        \"v-icon\",\n                        {\n                          staticClass: \"mr-1 mt-n1\",\n                          attrs: { color: \"primary\" }\n                        },\n                        [_vm._v(\"mdi-tag-multiple\")]\n                      ),\n                      _vm._v(\"JP Wordbook \")\n                    ],\n                    1\n                  ),\n                  _c(\n                    \"div\",\n                    {\n                      staticStyle: {\n                        \"font-size\": \"15px\",\n                        \"font-weight\": \"400\",\n                        color: \"#343a40\",\n                        \"margin-left\": \"15px\"\n                      }\n                    },\n                    [_vm._v(\"made by Junjak\")]\n                  )\n                ]\n              ),\n              _c(\n                \"a\",\n                { attrs: { href: \"https://github.com/JunjaK/WordBookJP\" } },\n                [\n                  _c(\n                    \"div\",\n                    {\n                      staticStyle: {\n                        \"font-size\": \"15px\",\n                        \"font-weight\": \"500\",\n                        \"text-align\": \"right\",\n                        \"margin-right\": \"12px\"\n                      }\n                    },\n                    [_vm._v(\"GitHub Link\")]\n                  )\n                ]\n              )\n            ],\n            1\n          )\n        : _vm._e()\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2224939633-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css?family=Noto+Sans+JP:100,300,400,500&display=swap);\"]);\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500&display=swap);\"]);\n// Module\nexports.push([module.i, \"\\n#inspire {\\n  font-weight: 400;\\n}\\na {\\n  text-decoration: none;\\n}\\na:link {\\n  text-decoration: none;\\n}\\na:visited {\\n  text-decoration: none;\\n}\\n::-webkit-scrollbar {\\n  display: none;\\n}\\n.titleStyle {\\n  color: #3f3f44;\\n  font-size: 24px;\\n  font-weight: 300;\\n  letter-spacing: 3px;\\n}\\n.subTitleStyle {\\n  color: #8ac6d1;\\n  font-size: 20px;\\n  font-weight: 400;\\n}\\n.contentStyle {\\n  color: #343a40;\\n  font-size: 18px;\\n  font-weight: 400;\\n}\\n.smallContentStyle {\\n  font-size: 16px;\\n  font-weight: 400;\\n}\\n.dialogTitle {\\n  color: #343a40;\\n  text-align: center;\\n  font-size: 22px;\\n  font-weight: 300;\\n  letter-spacing: 2px;\\n}\\n.dialogSubTitle {\\n  color: #5a5a5a;\\n  text-align: center;\\n  font-size: 16px;\\n  font-weight: 400;\\n  letter-spacing: 2px;\\n}\\n.divider {\\n  width: 70px;\\n  margin: auto;\\n  background-color: #8ac6d1;\\n  height: 2px;\\n}\\n.categoryTitle {\\n  font-size: 40px;\\n  font-weight: 300;\\n  color: #3f3f44;\\n}\\n.categorySelect {\\n  font-size: 20px;\\n  font-weight: 300;\\n  color: #3f3f44;\\n}\\n.wordText {\\n  font-size: 15px;\\n  font-weight: 400;\\n  color: #3f3f44;\\n}\\n@media only screen and (max-width: 600px) {\\n.categoryTitle {\\n    font-size: 32px;\\n}\\n.categorySelect {\\n    font-size: 16px;\\n}\\n.wordText {\\n    font-size: 13px;\\n}\\n}\\n@media only screen and (max-width: 450px) {\\n.categoryTitle {\\n    font-size: 28px;\\n}\\n.wordText {\\n    font-size: 12px;\\n}\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"fa1ef42a\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ \"./src/App.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VApp */ \"./node_modules/vuetify/lib/components/VApp/index.js\");\n/* harmony import */ var vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VAppBar */ \"./node_modules/vuetify/lib/components/VAppBar/index.js\");\n/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ \"./node_modules/vuetify/lib/components/VDivider/index.js\");\n/* harmony import */ var vuetify_lib_components_VFooter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VFooter */ \"./node_modules/vuetify/lib/components/VFooter/index.js\");\n/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ \"./node_modules/vuetify/lib/components/VIcon/index.js\");\n/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VList */ \"./node_modules/vuetify/lib/components/VList/index.js\");\n/* harmony import */ var vuetify_lib_components_VMain__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VMain */ \"./node_modules/vuetify/lib/components/VMain/index.js\");\n/* harmony import */ var vuetify_lib_components_VNavigationDrawer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VNavigationDrawer */ \"./node_modules/vuetify/lib/components/VNavigationDrawer/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VApp: vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_5__[\"VApp\"],VAppBar: vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_6__[\"VAppBar\"],VAppBarNavIcon: vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_6__[\"VAppBarNavIcon\"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_7__[\"VDivider\"],VFooter: vuetify_lib_components_VFooter__WEBPACK_IMPORTED_MODULE_8__[\"VFooter\"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__[\"VIcon\"],VList: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__[\"VList\"],VListItem: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__[\"VListItem\"],VListItemContent: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__[\"VListItemContent\"],VListItemGroup: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__[\"VListItemGroup\"],VListItemIcon: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_10__[\"VListItemIcon\"],VMain: vuetify_lib_components_VMain__WEBPACK_IMPORTED_MODULE_11__[\"VMain\"],VNavigationDrawer: vuetify_lib_components_VNavigationDrawer__WEBPACK_IMPORTED_MODULE_12__[\"VNavigationDrawer\"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_13__[\"VRow\"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_13__[\"VSpacer\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader??ref--6-oneOf-1-0!../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_24939633_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"24939633-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"24939633-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_24939633_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_24939633_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var _Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var _Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var _Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var _Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_jun_develop_project_WordBookJP_pwa_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vee-validate */ \"./node_modules/vee-validate/dist/vee-validate.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n/* harmony import */ var _plugins_vuetify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./plugins/vuetify */ \"./src/plugins/vuetify.js\");\n/* harmony import */ var _registerServiceWorker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./registerServiceWorker */ \"./src/registerServiceWorker.js\");\n/* harmony import */ var _vee_validate__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./vee-validate */ \"./src/vee-validate.js\");\n/* harmony import */ var roboto_fontface_css_roboto_roboto_fontface_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! roboto-fontface/css/roboto/roboto-fontface.css */ \"./node_modules/roboto-fontface/css/roboto/roboto-fontface.css\");\n/* harmony import */ var roboto_fontface_css_roboto_roboto_fontface_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(roboto_fontface_css_roboto_roboto_fontface_css__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _mdi_font_css_materialdesignicons_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mdi/font/css/materialdesignicons.css */ \"./node_modules/@mdi/font/css/materialdesignicons.css\");\n/* harmony import */ var _mdi_font_css_materialdesignicons_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_mdi_font_css_materialdesignicons_css__WEBPACK_IMPORTED_MODULE_13__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(vee_validate__WEBPACK_IMPORTED_MODULE_5__); // add\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\nnew vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  router: _router__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  store: _store__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  vuetify: _plugins_vuetify__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/plugins/vuetify.js":
/*!********************************!*\
  !*** ./src/plugins/vuetify.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuetify_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuetify/lib */ \"./node_modules/vuetify/lib/index.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuetify_lib__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuetify_lib__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n  theme: {\n    options: {\n      customProperties: true\n    },\n    themes: {\n      light: {\n        primary: '#8ac6d1',\n        secondary: '#87DEBB',\n        accent: '#cceabb',\n        error: '#fe8a71',\n        info: '#fffdf9',\n        success: '#d1eaa3',\n        warning: '#ffe3ed',\n        normaltext: '#3f3f44'\n      }\n    }\n  }\n}));\n\n//# sourceURL=webpack:///./src/plugins/vuetify.js?");

/***/ }),

/***/ "./src/registerServiceWorker.js":
/*!**************************************!*\
  !*** ./src/registerServiceWorker.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var register_service_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! register-service-worker */ \"./node_modules/register-service-worker/index.js\");\n/* eslint-disable no-console */\n\n\nif (false) {}\n\n//# sourceURL=webpack:///./src/registerServiceWorker.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store */ \"./src/store/index.js\");\n\n\n\n\n // import store from '../store';\n\nvue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nvue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].prototype.$axios = axios__WEBPACK_IMPORTED_MODULE_3___default.a;\nvar apiRootPath =  true ? 'http://localhost:3333/api' : undefined; // const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://192.168.152.197:3333/api' : '/api';\n\nvue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].prototype.$apiRootPath = apiRootPath;\naxios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.baseURL = apiRootPath;\nconsole.log(axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.baseURL); // default as get token in headers\n\n/* eslint-disable */\n\naxios__WEBPACK_IMPORTED_MODULE_3___default.a.interceptors.request.use(function (config) {\n  config.headers.authorization = localStorage.getItem('accessToken');\n  return config;\n}, function (error) {\n  return Promise.reject(error);\n});\naxios__WEBPACK_IMPORTED_MODULE_3___default.a.interceptors.response.use(function (response) {\n  // Do something with response data\n  var token = response.data.token;\n  if (token) localStorage.setItem('token', token);\n  return response;\n}, function (error) {\n  switch (error.response.status) {\n    case 401:\n      _store__WEBPACK_IMPORTED_MODULE_4__[\"default\"].dispatch('commitDelToken');\n      break;\n  } // Do something with response error\n\n\n  return Promise.reject(error);\n});\nvar routes = [{\n  path: '/login',\n  name: 'Login',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ../views/Login.vue */ \"./src/views/Login.vue\"));\n  }\n}, {\n  path: '/',\n  name: 'Home',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! ../views/Home.vue */ \"./src/views/Home.vue\"));\n  }\n}, {\n  path: '/test',\n  name: 'Test',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, /*! ../views/Test.vue */ \"./src/views/Test.vue\"));\n  }\n}, {\n  path: '/testresult',\n  name: 'TestResult',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, /*! ../views/TestResult.vue */ \"./src/views/TestResult.vue\"));\n  }\n}];\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n  mode: 'history',\n  base: \"/\",\n  routes: routes\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_2__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuex__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Store({\n  state: {\n    userInfo: {\n      accessToken: localStorage.getItem('accessToken'),\n      nickname: localStorage.getItem('nickname'),\n      userId: localStorage.getItem('userId')\n    }\n  },\n  mutations: {\n    getToken: function getToken(state) {\n      state.userInfo.accessToken = localStorage.getItem('accessToken');\n      state.userInfo.nickname = localStorage.getItem('nickname');\n      state.userInfo.userId = localStorage.getItem('userId');\n    },\n    delToken: function delToken(state) {\n      localStorage.removeItem('accessToken');\n      localStorage.removeItem('nickname');\n      localStorage.removeItem('userId');\n      state.userInfo.accessToken = null;\n      state.userInfo.nickname = null;\n      state.userInfo.userId = null;\n      window.location.replace('/signin');\n    }\n  },\n  getters: {\n    getAccessToken: function getAccessToken(state) {\n      return state.userInfo.accessToken;\n    },\n    getNickname: function getNickname(state) {\n      return state.userInfo.nickname;\n    },\n    getUserId: function getUserId(state) {\n      return state.userInfo.userId;\n    }\n  },\n  actions: {\n    commitGetToken: function commitGetToken(context) {\n      return context.commit('getToken');\n    },\n    commitDelToken: function commitDelToken(context) {\n      return context.commit('delToken');\n    }\n  },\n  modules: {}\n}));\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/vee-validate.js":
/*!*****************************!*\
  !*** ./src/vee-validate.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vee-validate/dist/rules */ \"./node_modules/vee-validate/dist/rules.js\");\n/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vee-validate */ \"./node_modules/vee-validate/dist/vee-validate.esm.js\");\n\n\n\nObject(vee_validate__WEBPACK_IMPORTED_MODULE_2__[\"extend\"])('required', Object(_Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Object(_Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__[\"required\"]), {}, {\n  message: 'This field is required'\n}));\nObject(vee_validate__WEBPACK_IMPORTED_MODULE_2__[\"extend\"])('max', Object(_Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Object(_Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__[\"max\"]), {}, {\n  message: 'This field must be {length} characters or less'\n}));\nObject(vee_validate__WEBPACK_IMPORTED_MODULE_2__[\"extend\"])('min', Object(_Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Object(_Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__[\"min\"]), {}, {\n  message: 'This field must have at least {length} characters'\n}));\nObject(vee_validate__WEBPACK_IMPORTED_MODULE_2__[\"extend\"])('email', Object(_Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Object(_Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__[\"email\"]), {}, {\n  message: 'This field must be a valid email'\n}));\nObject(vee_validate__WEBPACK_IMPORTED_MODULE_2__[\"extend\"])('confirmed', Object(_Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Object(_Users_jun_develop_project_WordBookJP_pwa_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_1__[\"confirmed\"]), {}, {\n  message: 'The password must be same as confrim'\n}));\n\n//# sourceURL=webpack:///./src/vee-validate.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });