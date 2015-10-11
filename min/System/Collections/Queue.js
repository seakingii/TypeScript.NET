/*
 * @author electricessence / https://github.com/electricessence/
 * Based Upon: http://referencesource.microsoft.com/#System/CompMod/system/collections/generic/queue.cs
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
define(["require","exports","../Compare","../Types","./Array/Utility","./Enumeration/EnumeratorBase","./Enumeration/forEach","../Exceptions/NotImplementedException","../Exceptions/InvalidOperationException","../Exceptions/ArgumentException","../Exceptions/ArgumentOutOfRangeException"],function(e,t,r,i,n,a,o,c,u,p,y){function _(e,t){if(e!=Math.floor(e))throw new p(t,"Must be an integer.")}function s(e,t){if(0>e)throw new y(t,e,"Must be greater than zero")}function l(e,t){_(e,t),s(e,t)}var f=4,h=100,v=f,d=[],m=function(){function e(e){var t=this;if(t._head=0,t._tail=0,t._size=0,t._version=0,e)if(i.isNumber(e)){var r=e;l(r,"capacity"),t._array=r?n.initialize(r):d}else{var a=e;t._array=n.initialize(a instanceof Array||"length"in a?a.length:v),o(a,function(e){return t.enqueue(e)}),t._version=0}else t._array=d;t._capacity=t._array.length}return Object.defineProperty(e.prototype,"count",{get:function(){return this._size},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isReadOnly",{get:function(){return!1},enumerable:!0,configurable:!0}),e.prototype.add=function(e){this.enqueue(e)},e.prototype.clear=function(){var e=this,t=e._array,r=e._head,i=e._tail,a=e._size;return i>r?n.clear(t,r,a):(n.clear(t,r,t.length-r),n.clear(t,0,i)),e._head=0,e._tail=0,e._size=0,e._version++,a},e.prototype.contains=function(e){for(var t=this,i=t._array,n=t._head,a=t._size,o=t._capacity;a-->0;){if(r.areEqual(i[n],e))return!0;n=(n+1)%o}return!1},e.prototype.copyTo=function(e,t){if(void 0===t&&(t=0),null==e)throw new Error("ArgumentNullException: array cannot be null.");l(t,"arrayIndex");var r=this,i=r._size;if(i){var a=i,o=r._array,c=r._capacity,u=r._head,p=c-u,y=i>p?p:i;return n.copyTo(o,e,u,t,y),a-=y,a>0&&n.copyTo(o,e,0,t+c-u,a),e}},e.prototype.toArray=function(){var e=this,t=e._size,r=n.initialize(t);return t?e.copyTo(r):r},e.prototype.remove=function(e){throw new c("ICollection<T>.remove is not implemented in Queue<T> since it would require destroying the underlying array to remove the item.")},e.prototype.dispose=function(){var e=this;e.clear(),e._array!=d&&(e._array.length=e._capacity=0,e._array=d),e._version=0},e.prototype.forEach=function(e){for(var t=this,r=t.toArray(),i=t._size,n=0;i>n&&e(r[n],n)!==!1;n++);},e.prototype.setCapacity=function(e){l(e,"capacity");var t=this,r=t._array,i=t._capacity;if(e!=i){var a=t._head,o=t._tail,c=t._size;if(r!=d&&e>i&&o>a)return r.length=t._capacity=e,void t._version++;var u=n.initialize(e);c>0&&(o>a?n.copyTo(r,u,a,0,c):(n.copyTo(r,u,a,0,i-a),n.copyTo(r,u,0,i-a,o))),t._array=u,t._capacity=e,t._head=0,t._tail=c==e?0:c,t._version++}},e.prototype.enqueue=function(e){var t=this,r=t._array,i=0|t._size,n=0|t._capacity;if(i==n){var a=n*h;n+f>a&&(a=n+f),t.setCapacity(a),r=t._array,n=t._capacity}var o=t._tail;r[o]=e,t._tail=(o+1)%n,t._size=i+1,t._version++},e.prototype.dequeue=function(){var e=this;if(0==e._size)throw new u("Cannot dequeue an empty queue.");var t=e._array,r=e._head,i=e._array[r];return t[r]=null,e._head=(r+1)%e._capacity,e._size--,e._version++,i},e.prototype._getElement=function(e){l(e,"index");var t=this;return t._array[(t._head+e)%t._capacity]},e.prototype.peek=function(){if(0==this._size)throw new u("Cannot call peek on an empty queue.");return this._array[this._head]},e.prototype.trimExcess=function(){var e=this,t=e._size;t<Math.floor(.9*e._capacity)&&e.setCapacity(t)},e.prototype.getEnumerator=function(){var e,t,r=this;return new a(function(){t=r._version,e=0},function(i){if(t!=r._version)throw new u("Collection was changed during enumeration.");return e==r._size?i.yieldBreak():i.yieldReturn(r._getElement(e++))})},e}();return m});
//# sourceMappingURL=Queue.js.map
