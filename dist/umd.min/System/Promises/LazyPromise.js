!function(e,t){if("object"==typeof module&&"object"==typeof module.exports){var n=t(require,exports);void 0!==n&&(module.exports=n)}else"function"==typeof define&&define.amd&&define(e,t)}(["require","exports","./Promise","../Threading/defer","../Exceptions/ArgumentNullException","../../extends"],function(e,t){"use strict";var n=e("./Promise"),o=e("../Threading/defer"),r=e("../Exceptions/ArgumentNullException"),i=e("../../extends"),s=i["default"],u=void 0,l=function(e){function t(t){var n=e.call(this)||this;if(n._resolver=t,!t)throw new r.ArgumentNullException("resolver");return n._resolvedCalled=!0,n}return s(t,e),t.prototype._onDispose=function(){e.prototype._onDispose.call(this),this._resolver=u},t.prototype._onThen=function(){var e=this._resolver;e&&(this._resolver=u,this._resolvedCalled=!1,this.resolveUsing(e))},t.prototype.thenSynchronous=function(t,n){return this._onThen(),e.prototype.thenSynchronous.call(this,t,n)},t.prototype.thenThis=function(t,n){return this._onThen(),e.prototype.thenThis.call(this,t,n)},t.prototype.delayFromNow=function(n){var r=this;if(void 0===n&&(n=0),this.throwIfDisposed(),!this._resolver||this.isSettled)return e.prototype.delayFromNow.call(this,n);var i,s=!1,l=o.defer(function(){s=!0,i&&i()},n);return new t(function(e,t){i=function(){r.thenThis(function(t){return e(t)},function(e){return t(e)}),l.dispose(),l=u,i=u},s&&i()})},t.prototype.delayAfterResolve=function(n){var r=this;if(void 0===n&&(n=0),this.throwIfDisposed(),!this._resolver||this.isSettled)return e.prototype.delayAfterResolve.call(this,n);var i,s,l=function(){s&&(s.dispose(),s=u),i&&i(),l=u},f=function(){l&&(s=o.defer(l,n))};return e.prototype.thenThis.call(this,f,f),f=null,new t(function(e,t){r.isPending?(r.thenThis(function(t){return o.defer(function(){return e(t)},n)},function(e){return o.defer(function(){return t(e)},n)}),l()):(i=function(){r.thenThis(function(t){return e(t)},function(e){return t(e)})},l||i())})},t}(n.Promise);t.LazyPromise=l,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l});
//# sourceMappingURL=LazyPromise.js.map