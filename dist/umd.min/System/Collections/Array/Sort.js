!function(e,r){if("object"==typeof module&&"object"==typeof module.exports){var o=r(require,exports);void 0!==o&&(module.exports=o)}else"function"==typeof define&&define.amd&&define(e,r)}(["require","exports","./Sorting/createComparer","./Sorting/quickSort"],function(e,r){"use strict";function o(e){for(var o in e)r.hasOwnProperty(o)||(r[o]=e[o])}var t=e("./Sorting/createComparer");r.createComparer=t.createComparer,r["default"]=t.createComparer,r.by=t.createComparer,o(e("./Sorting/quickSort"))});
//# sourceMappingURL=Sort.js.map