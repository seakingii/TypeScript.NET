!function(e,t){if("object"==typeof module&&"object"==typeof module.exports){var i=t(require,exports);void 0!==i&&(module.exports=i)}else"function"==typeof define&&define.amd&&define(e,t)}(["require","exports","../Compare","./Array/Utility","../Types","../Integer","./Enumeration/EnumeratorBase","../Exceptions/NotImplementedException","../Exceptions/InvalidOperationException","../Exceptions/ArgumentOutOfRangeException","./CollectionBase","../../extends"],function(e,t){"use strict";function i(e,t){if(e<0)throw new _.ArgumentOutOfRangeException(t,e,"Must be greater than zero")}function r(e,t){s.Integer.assert(e,t),i(e,t)}var n=e("../Compare"),a=e("./Array/Utility"),o=e("../Types"),s=e("../Integer"),p=e("./Enumeration/EnumeratorBase"),u=e("../Exceptions/NotImplementedException"),c=e("../Exceptions/InvalidOperationException"),_=e("../Exceptions/ArgumentOutOfRangeException"),l=e("./CollectionBase"),y=e("../../extends"),d=y["default"],f=void 0,h=4,v=32,m=100,E=h,x=Object.freeze([]),g=function(e){function t(t,i){void 0===i&&(i=n.areEqual);var s=e.call(this,f,i)||this,p=s;if(p._head=0,p._tail=0,p._size=0,t)if(o.Type.isNumber(t)){var u=t;r(u,"capacity"),p._array=u?a.initialize(u):x}else{var c=t;p._array=a.initialize(o.Type.isArrayLike(c)?c.length:E),p._importEntries(c)}else p._array=x;return p._capacity=p._array.length,s}return d(t,e),t.prototype.getCount=function(){return this._size},t.prototype._addInternal=function(e){var t=this,i=t._size,r=t._capacity;if(i==r){var n=r*m;n<r+h&&(n=r+h),t.setCapacity(n),r=t._capacity}var a=t._tail;return t._array[a]=e,t._tail=(a+1)%r,t._size=i+1,!0},t.prototype._removeInternal=function(e,t){throw new u.NotImplementedException("ICollection<T>.remove is not implemented in Queue<T> since it would require destroying the underlying array to remove the item.")},t.prototype._clearInternal=function(){var e=this,t=e._array,i=e._head,r=e._tail,n=e._size;return i<r?a.clear(t,i,r):(a.clear(t,i),a.clear(t,0,r)),e._head=0,e._tail=0,e._size=0,e.trimExcess(),n},t.prototype._onDispose=function(){e.prototype._onDispose.call(this);var t=this;t._array!=x&&(t._array.length=t._capacity=0,t._array=x)},t.prototype.dump=function(e){void 0===e&&(e=1/0);var t=this,i=[];if(isFinite(e)){if(s.Integer.assertZeroOrGreater(e),0!==e)for(;e--&&t._size;)i.push(t._dequeueInternal())}else for(;t._size;)i.push(t._dequeueInternal());return t.trimExcess(),t._signalModification(),i},t.prototype.forEach=function(t){return e.prototype.forEach.call(this,t,!0)},t.prototype.setCapacity=function(e){var t=this;r(e,"capacity");var i=t._array,n=t._capacity;if(e>n&&t.throwIfDisposed(),e!=n){var o=t._head,s=t._tail,p=t._size;if(i!=x&&e>n&&o<s)return i.length=t._capacity=e,void t._version++;var u=a.initialize(e);p>0&&(o<s?a.copyTo(i,u,o,0,p):(a.copyTo(i,u,o,0,n-o),a.copyTo(i,u,0,n-o,s))),t._array=u,t._capacity=e,t._head=0,t._tail=p==e?0:p,t._signalModification(!0)}},t.prototype.enqueue=function(e){this.add(e)},t.prototype._dequeueInternal=function(e){void 0===e&&(e=!1);var t=this;if(0==t._size){if(e)throw new c.InvalidOperationException("Cannot dequeue an empty queue.");return f}var i=t._array,r=t._head,n=t._array[r];return i[r]=null,t._head=(r+1)%t._capacity,t._size--,t._incrementModified(),n},t.prototype.dequeue=function(e){void 0===e&&(e=!1);var t=this;t.assertModifiable();var i=!!t._size,r=this._dequeueInternal(e);return i&&t._size<t._capacity/2&&t.trimExcess(v),t._signalModification(),r},t.prototype.tryDequeue=function(e){if(!this._size)return!1;var t=this.dequeue();return e&&e(t),!0},t.prototype._getElement=function(e){r(e,"index");var t=this;return t._array[(t._head+e)%t._capacity]},t.prototype.peek=function(){if(0==this._size)throw new c.InvalidOperationException("Cannot call peek on an empty queue.");return this._array[this._head]},t.prototype.trimExcess=function(e){var t=this,i=t._size;i<Math.floor(.9*t._capacity)&&(!e&&0!==e||isNaN(e)||e<i)&&t.setCapacity(i)},t.prototype.getEnumerator=function(){var e=this;e.throwIfDisposed();var t,i,r;return new p.EnumeratorBase(function(){i=e._version,r=e._size,t=0},function(n){return e.throwIfDisposed(),e.assertVersion(i),t==r?n.yieldBreak():n.yieldReturn(e._getElement(t++))})},t}(l.CollectionBase);t.Queue=g,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=g});
//# sourceMappingURL=Queue.js.map