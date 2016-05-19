/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(e,t){function o(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)};!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","../Disposable/DisposableBase"],e)}(function(e,t){"use strict";var o=e("../Disposable/DisposableBase"),i=function(e){function t(){e.call(this),this._id=null}return __extends(t,e),Object.defineProperty(t.prototype,"isScheduled",{get:function(){return!!this._id},enumerable:!0,configurable:!0}),t.prototype.execute=function(e){this.cancel(),isNaN(e)||0>e?this._onExecute():isFinite(e)&&(this._id=setTimeout(t._handler,e,this))},t._handler=function(e){e.cancel(),e._onExecute()},t.prototype._onDispose=function(){this.cancel()},t.prototype.cancel=function(){var e=this._id;return e?(clearTimeout(e),this._id=null,!0):!1},t}(o.DisposableBase);t.TaskHandlerBase=i,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i});
//# sourceMappingURL=TaskHandlerBase.js.map
