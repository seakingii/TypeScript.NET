!function(e,t){if("object"==typeof module&&"object"==typeof module.exports){var n=t(require,exports);void 0!==n&&(module.exports=n)}else"function"==typeof define&&define.amd&&define(e,t)}(["require","exports","../Observable/ObservableBase","../../extends"],function(e,t){"use strict";var n=e("../Observable/ObservableBase"),o=e("../../extends"),i=o["default"],r=function(e){function t(t,n,o){void 0===n&&(n=1/0),void 0===o&&(o=t);var i=e.call(this)||this;if(i._interval=t,i._maxCount=n,i._initialDelay=o,i._count=0,null==t)throw"'interval' must be a valid number.";if(t<0)throw"'interval' cannot be negative.";return i}return i(t,e),t.startNew=function(e,n,o){void 0===n&&(n=1/0),void 0===o&&(o=e);var i=new t(e,n,o);return i.start(),i},Object.defineProperty(t.prototype,"isRunning",{get:function(){return!!this._cancel},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"count",{get:function(){return this._count},enumerable:!0,configurable:!0}),t.prototype.start=function(){var e=this;if(e.throwIfDisposed("This timer has been disposed and can't be reused."),!e._cancel&&e._count<e._maxCount)if(e._count||e._initialDelay==e._interval){var n=setInterval(t._onTick,e._interval,e);e._cancel=function(){clearInterval(n)}}else{var o=setTimeout(t._onTick,e._initialDelay,e,!0);e._cancel=function(){clearTimeout(o)}}},t.prototype.stop=function(){this.cancel()},t.prototype.reset=function(){this.stop(),this._count=0},t.prototype.complete=function(){return this.cancel(),this._onCompleted(),this._count},t.prototype.cancel=function(){return!!this._cancel&&(this._cancel(),this._cancel=null,!0)},t.prototype._onDispose=function(){this.cancel(),e.prototype._onDispose.call(this)},t._onTick=function(e,t){var n=e._count++,o=e._maxCount,i=e._count>=o;t&&(e.cancel(),e.start()),i&&e.stop(),n<o&&e._onNext(n),i&&e._onCompleted()},t}(n.ObservableBase);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r});
//# sourceMappingURL=Timer.js.map