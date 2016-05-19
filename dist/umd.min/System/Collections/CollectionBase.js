/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)};!function(t){if("object"==typeof module&&"object"==typeof module.exports){var e=t(require,exports);void 0!==e&&(module.exports=e)}else"function"==typeof define&&define.amd&&define(["require","exports","./Enumeration/Enumerator","../Compare","../Exceptions/ArgumentNullException","../Exceptions/InvalidOperationException","../Disposable/DisposableBase"],t)}(function(t,e){"use strict";var o=t("./Enumeration/Enumerator"),i=t("../Compare"),n=t("../Exceptions/ArgumentNullException"),r=t("../Exceptions/InvalidOperationException"),a=t("../Disposable/DisposableBase"),s="CollectionBase",u="Cannot modify a disposed collection.",p="Cannot modify a read-only collection.",d=function(t){function e(e,o){void 0===o&&(o=i.areEqual),t.call(this),this._equalityComparer=o;var n=this;n._disposableObjectName=s,n._importEntries(e),n._updateRecursion=0,n._modifiedCount=0,n._version=0}return __extends(e,t),Object.defineProperty(e.prototype,"count",{get:function(){return this.getCount()},enumerable:!0,configurable:!0}),e.prototype.getIsReadOnly=function(){return!1},Object.defineProperty(e.prototype,"isReadOnly",{get:function(){return this.getIsReadOnly()},enumerable:!0,configurable:!0}),e.prototype.assertModifiable=function(){if(this.throwIfDisposed(u),this.getIsReadOnly())throw new r.InvalidOperationException(p)},e.prototype.assertVersion=function(t){if(t!=this._version)throw new r.InvalidOperationException("Collection was modified.")},e.prototype._onModified=function(){},e.prototype._signalModification=function(t){var e=this;if(t&&e._modifiedCount++,e._modifiedCount&&!this._updateRecursion){e._modifiedCount=0,e._version++;try{e._onModified()}catch(o){console.error(o)}return!0}return!1},e.prototype._incrementModified=function(){this._modifiedCount++},Object.defineProperty(e.prototype,"isUpdating",{get:function(){return 0!=this._updateRecursion},enumerable:!0,configurable:!0}),e.prototype.handleUpdate=function(t){if(!t)return!1;var e=this;e.assertModifiable(),e._updateRecursion++;var o=!1;try{(o=t())&&e._modifiedCount++}finally{e._updateRecursion--}return e._signalModification(),o},e.prototype.add=function(t){var e=this;e.assertModifiable(),e._updateRecursion++;try{e._addInternal(t)&&e._modifiedCount++}finally{e._updateRecursion--}e._signalModification()},e.prototype.remove=function(t,e){void 0===e&&(e=1/0);var o=this;o.assertModifiable(),o._updateRecursion++;var i;try{(i=o._removeInternal(t,e))&&o._modifiedCount++}finally{o._updateRecursion--}return o._signalModification(),i},e.prototype.clear=function(){var t=this;t.assertModifiable(),t._updateRecursion++;var e;try{(e=t._clearInternal())&&t._modifiedCount++}finally{t._updateRecursion--}return t._signalModification(),e},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._clearInternal(),this._version=0,this._updateRecursion=0,this._modifiedCount=0},e.prototype._importEntries=function(t){var e=this,i=0;if(t)if(Array.isArray(t))for(var n=0,r=t;n<r.length;n++){var a=r[n];this._addInternal(a)&&i++}else o.forEach(t,function(t){e._addInternal(t)&&i++});return i},e.prototype.importEntries=function(t){var e=this;e.assertModifiable(),e._updateRecursion++;var o;try{(o=e._importEntries(t))&&e._modifiedCount++}finally{e._updateRecursion--}return e._signalModification(),o},e.prototype.contains=function(t){if(!this.getCount())return!1;var e=!1,o=this._equalityComparer;return this.forEach(function(i){return!(e=o(t,i))}),e},e.prototype.forEach=function(t,e){if(e){var i=this.toArray();o.forEach(i,t),i.length=0}else o.forEach(this.getEnumerator(),t)},e.prototype.copyTo=function(t,e){if(void 0===e&&(e=0),!t)throw new n.ArgumentNullException("target");var o=this.getCount(),i=o+e;t.length<i&&(t.length=i);for(var r=this.getEnumerator();r.moveNext();)t[e++]=r.current;return t},e.prototype.toArray=function(){var t=this.getCount();return this.copyTo(t>65536?new Array(t):[])},e}(a.DisposableBase);e.CollectionBase=d,Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=d});
//# sourceMappingURL=CollectionBase.js.map
