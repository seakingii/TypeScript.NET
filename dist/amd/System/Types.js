define(["require","exports"],function(i,t){"use strict";var e=void 0,r=typeof!0,n="number",s="string",u="symbol",o=typeof{},a=typeof e,c="function",f="length",h={},y=function(){function i(i,t){switch(this.isBoolean=!1,this.isNumber=!1,this.isString=!1,this.isTrueNaN=!1,this.isObject=!1,this.isFunction=!1,this.isUndefined=!1,this.isNull=!1,this.isPrimitive=!1,this.isSymbol=!1,this.type=typeof i){case r:this.isBoolean=!0,this.isPrimitive=!0;break;case n:this.isNumber=!0,this.isTrueNaN=isNaN(i),this.isFinite=isFinite(i),this.isValidNumber=!this.isTrueNaN,this.isPrimitive=!0;break;case s:this.isString=!0,this.isPrimitive=!0;break;case u:this.isSymbol=!0;break;case o:this.target=i,null===i?(this.isNull=!0,this.isNullOrUndefined=!0,this.isPrimitive=!0):(this.isArray=Array.isArray(i),this.isObject=!0);break;case c:this.target=i,this.isFunction=!0;break;case a:this.isUndefined=!0,this.isNullOrUndefined=!0,this.isPrimitive=!0;break;default:throw"Fatal type failure.  Unknown type: "+this.type}t&&t(this),Object.freeze(this)}return i.prototype.member=function(t){var r=this.target;return i.getFor(r&&t in r?r[t]:e)},i.getFor=function(t){var e=typeof t;switch(e){case o:case c:return new i(t)}var r=h[e];return r||(h[e]=r=new i(t)),r},i}();t.TypeInfo=y;var N;!function(i){function t(i){return null===i||i===e}function h(i){return typeof i===r}function N(i,t){return t===e&&(t=!0),typeof i===n&&(t||!isNaN(i))}function l(i){return typeof i===n&&isNaN(i)}function p(i){return typeof i===s}function b(i,t){void 0===t&&(t=!1);var e=typeof i;switch(e){case r:case s:case n:return!0;case a:return t;case o:return null===i}return!1}function m(i,t){return void 0===t&&(t=!1),typeof i===u||b(i,t)}function d(i){var t=typeof i;switch(t){case s:case n:case u:return!0}return!1}function v(i){return typeof i===c}function O(i,t){return void 0===t&&(t=!1),typeof i===o&&(t||null!==i)}function g(i){return isNaN(i)?NaN:i}function F(i){return y.getFor(i)}function T(i,t){return i&&!b(i)&&t in i}function P(i,t,e){return T(i,t)&&typeof i[t]===e}function k(i,t){return P(i,t,c)}function S(t){return t instanceof Array||i.isString(t)||!i.isFunction(t)&&T(t,f)}i.BOOLEAN=r,i.NUMBER=n,i.STRING=s,i.OBJECT=o,i.SYMBOL=u,i.UNDEFINED=a,i.FUNCTION=c,i.isNullOrUndefined=t,i.isBoolean=h,i.isNumber=N,i.isTrueNaN=l,i.isString=p,i.isPrimitive=b,i.isPrimitiveOrSymbol=m,i.isPropertyKey=d,i.isFunction=v,i.isObject=O,i.numberOrNaN=g,i.of=F,i.hasMember=T,i.hasMemberOfType=P,i.hasMethod=k,i.isArrayLike=S}(N=t.Type||(t.Type={})),Object.freeze(N),Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=N});
//# sourceMappingURL=Types.js.map