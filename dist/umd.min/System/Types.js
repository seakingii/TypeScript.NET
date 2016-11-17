!function(i,e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(i,e)}(["require","exports"],function(i,e){"use strict";var t=void 0,r=typeof!0,n="number",s="string",o="symbol",u=typeof{},a=typeof t,f="function",c="length",h={},y=function(){function i(i,e){switch(this.isBoolean=!1,this.isNumber=!1,this.isString=!1,this.isTrueNaN=!1,this.isObject=!1,this.isFunction=!1,this.isUndefined=!1,this.isNull=!1,this.isPrimitive=!1,this.isSymbol=!1,this.type=typeof i){case r:this.isBoolean=!0,this.isPrimitive=!0;break;case n:this.isNumber=!0,this.isTrueNaN=isNaN(i),this.isFinite=isFinite(i),this.isValidNumber=!this.isTrueNaN,this.isPrimitive=!0;break;case s:this.isString=!0,this.isPrimitive=!0;break;case o:this.isSymbol=!0;break;case u:this.target=i,null===i?(this.isNull=!0,this.isNullOrUndefined=!0,this.isPrimitive=!0):(this.isArray=Array.isArray(i),this.isObject=!0);break;case f:this.target=i,this.isFunction=!0;break;case a:this.isUndefined=!0,this.isNullOrUndefined=!0,this.isPrimitive=!0;break;default:throw"Fatal type failure.  Unknown type: "+this.type}e&&e(this),Object.freeze(this)}return i.prototype.member=function(e){var r=this.target;return i.getFor(r&&e in r?r[e]:t)},i.getFor=function(e){var t=typeof e;switch(t){case u:case f:return new i(e)}var r=h[t];return r||(h[t]=r=new i(e)),r},i}();e.TypeInfo=y;var l;!function(i){function e(i){return null===i||i===t}function h(i){return typeof i===r}function l(i,e){return e===t&&(e=!0),typeof i===n&&(e||!isNaN(i))}function N(i){return typeof i===n&&isNaN(i)}function p(i){return typeof i===s}function b(i,e){void 0===e&&(e=!1);var t=typeof i;switch(t){case r:case s:case n:return!0;case a:return e;case u:return null===i}return!1}function d(i,e){return void 0===e&&(e=!1),typeof i===o||b(i,e)}function m(i){var e=typeof i;switch(e){case s:case n:case o:return!0}return!1}function v(i){return typeof i===f}function O(i,e){return void 0===e&&(e=!1),typeof i===u&&(e||null!==i)}function g(i){return isNaN(i)?NaN:i}function F(i){return y.getFor(i)}function T(i,e){return i&&!b(i)&&e in i}function P(i,e,t){return T(i,e)&&typeof i[e]===t}function k(i,e){return P(i,e,f)}function S(e){return e instanceof Array||i.isString(e)||!i.isFunction(e)&&T(e,c)}i.BOOLEAN=r,i.NUMBER=n,i.STRING=s,i.OBJECT=u,i.SYMBOL=o,i.UNDEFINED=a,i.FUNCTION=f,i.isNullOrUndefined=e,i.isBoolean=h,i.isNumber=l,i.isTrueNaN=N,i.isString=p,i.isPrimitive=b,i.isPrimitiveOrSymbol=d,i.isPropertyKey=m,i.isFunction=v,i.isObject=O,i.numberOrNaN=g,i.of=F,i.hasMember=T,i.hasMemberOfType=P,i.hasMethod=k,i.isArrayLike=S}(l=e.Type||(e.Type={})),Object.freeze(l),Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=l});
//# sourceMappingURL=Types.js.map