!function(e,t){if("object"==typeof module&&"object"==typeof module.exports){var o=t(require,exports);void 0!==o&&(module.exports=o)}else"function"==typeof define&&define.amd&&define(e,t)}(["require","exports","../../Compare","./SortContext","../../Functions","../../../extends"],function(e,t){"use strict";var o=e("../../Compare"),r=e("./SortContext"),n=e("../../Functions"),i=e("../../../extends"),u=i["default"],c=function(e){function t(t,r,n,i){void 0===n&&(n=1),void 0===i&&(i=o.compare);var u=e.call(this,t,i,n)||this;return u._keySelector=r,u}return u(t,e),t.prototype.compare=function(t,r){var i=this,u=i._keySelector;if(!u||u==n.Functions.Identity)return e.prototype.compare.call(this,t,r);var c=o.compare(u(t),u(r));return 0==c&&i._next?i._next.compare(t,r):i._order*c},t}(r.SortContext);t.KeySortedContext=c,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=c});
//# sourceMappingURL=KeySortedContext.js.map