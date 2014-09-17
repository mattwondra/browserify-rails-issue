




window._count = 0;
console.log("\n\nThis script will break due to browserify concatenation issues.");
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window._count = window._count || 0;
window._count++;

module.exports = {count: window._count};
},{}],2:[function(require,module,exports){
var counter = require("../lib/counter");

console.log("Module A: The counter has been initialized " + counter.count + " times.");

},{"../lib/counter":1}]},{},[2])(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window._count = window._count || 0;
window._count++;

module.exports = {count: window._count};
},{}],2:[function(require,module,exports){
var counter = require("../lib/counter");

console.log("Module B: The counter has been initialized " + counter.count + " times.");

},{"../lib/counter":1}]},{},[2])(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window._count = window._count || 0;
window._count++;

module.exports = {count: window._count};
},{}],2:[function(require,module,exports){
var counter = require("../lib/counter");

console.log("Module C: The counter has been initialized " + counter.count + " times.");

},{"../lib/counter":1}]},{},[2])