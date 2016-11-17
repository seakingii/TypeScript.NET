/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
!function(e,t){if("object"==typeof module&&"object"==typeof module.exports){var r=t(require,exports);void 0!==r&&(module.exports=r)}else"function"==typeof define&&define.amd&&define(e,t)}(["require","exports","./ResolverBase","../extends"],function(e,t){"use strict";var r=e("./ResolverBase"),o=e("../extends"),u=o["default"],a=function(e){function t(t,r,o){void 0===r&&(r=!1),void 0===o&&(o=!1);var u=e.call(this,t,r,o)||this;return u._disposableObjectName="Lazy",u._isValueCreated=!1,u}return u(t,e),Object.defineProperty(t.prototype,"isValueCreated",{get:function(){return!!this._isValueCreated},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"value",{get:function(){return this.getValue()},enumerable:!0,configurable:!0}),t.prototype.equals=function(e){return this==e},t.prototype.valueEquals=function(e){return this.equals(e)||this.value===e.value},t}(r.ResolverBase);t.Lazy=a;var n=function(e){function t(t,r){void 0===r&&(r=!1);var o=e.call(this,t,r,!0)||this;return o._disposableObjectName="ResettableLazy",o}return u(t,e),t}(a);t.ResettableLazy=n,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a});
//# sourceMappingURL=Lazy.js.map