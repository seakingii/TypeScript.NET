/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};define(["require","exports","../System/Compare","../System/Collections/Array/Compare","../System/Collections/Array/Utility","../System/Collections/Enumeration/Enumerator","../System/Types","../System/Integer","../System/Functions","../System/Collections/Enumeration/ArrayEnumerator","../System/Collections/Enumeration/EnumeratorBase","../System/Collections/Dictionaries/Dictionary","../System/Collections/Queue","../System/Disposable/dispose","../System/Disposable/DisposableBase","../System/Collections/Enumeration/UnsupportedEnumerableException","../System/Disposable/ObjectDisposedException","../System/Collections/Sorting/KeySortedContext","../System/Exceptions/ArgumentNullException","../System/Exceptions/ArgumentOutOfRangeException"],function(t,e,n,r,o,i,u,s,a,c,f,l,p,y,d,h,v,m,E,w){"use strict";function g(){return i.empty}function x(t,e){return e&&(e.moveNext()?t.enqueue(e):(y.dispose(e),e=null)),e}function N(t,e){void 0===e&&(e=null);var n=new m.KeySortedContext(e,t.keySelector,t.order,t.comparer);return t.parent?N(t.parent,n):n}function I(t){if(t)throw new v.ObjectDisposedException("Enumerable")}var _={},B=void 0,D=function(t){return 0},R=function(t){function e(){t.apply(this,arguments)}return __extends(e,t),e.prototype.Greater=function(t,e){return t>e?t:e},e.prototype.Lesser=function(t,e){return e>t?t:e},e}(a.Functions),b=new R;Object.freeze(b);var A=function(t){function e(e,n){t.call(this,n),this._enumeratorFactory=e,this._isEndless=!0}return __extends(e,t),Object.defineProperty(e.prototype,"isEndless",{get:function(){return this._isEndless},enumerable:!0,configurable:!0}),e.prototype.getEnumerator=function(){return this.throwIfDisposed(),this._enumeratorFactory()},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._enumeratorFactory=null},e.prototype.asEnumerable=function(){var t=this;return t.throwIfDisposed(),new e(function(){return t.getEnumerator()})},e.prototype.doAction=function(t,e,n){void 0===n&&(n=this.isEndless);var r=this,o=!r.throwIfDisposed();return new O(function(){var i,u=0;return new f.EnumeratorBase(function(){I(o),e&&e(),u=0,i=r.getEnumerator()},function(e){for(I(o);i.moveNext();){var n=t(i.current,u++);if(n===!1||0===n)return e.yieldBreak();if(2!==n)return e.yieldReturn(i.current)}return!1},function(){y.dispose(i)},n)},function(){o=!0},n)},e.prototype.force=function(){this.throwIfDisposed(),this.doAction(D).getEnumerator().moveNext()},e.prototype.skip=function(t){var e=this;return e.throwIfDisposed(),isFinite(t)?(s.Integer.assert(t,"count"),this.doAction(function(e,n){return t>n?2:1})):O.empty()},e.prototype.take=function(t){if(!(t>0))return O.empty();var e=this;if(e.throwIfDisposed(),!isFinite(t))throw new w.ArgumentOutOfRangeException("count",t,"Must be finite.");return s.Integer.assert(t,"count"),e.doAction(function(e,n){return t>n},null,!1)},e.prototype.elementAt=function(t){var e=this.elementAtOrDefault(t,_);if(e===_)throw new w.ArgumentOutOfRangeException("index",t,"is greater than or equal to the number of elements in source");return e},e.prototype.elementAtOrDefault=function(t,e){void 0===e&&(e=null);var n=this;n.throwIfDisposed(),s.Integer.assertZeroOrGreater(t,"index");var r=t;return y.using(this.getEnumerator(),function(t){for(var n=0;t.moveNext();){if(n==r)return t.current;n++}return e})},e.prototype.first=function(){var t=this.firstOrDefault(_);if(t===_)throw new Error("first:The sequence is empty.");return t},e.prototype.firstOrDefault=function(t){void 0===t&&(t=null);var e=this;return e.throwIfDisposed(),y.using(this.getEnumerator(),function(e){return e.moveNext()?e.current:t})},e.prototype.single=function(){var t=this;return t.throwIfDisposed(),y.using(this.getEnumerator(),function(t){if(t.moveNext()){var e=t.current;if(!t.moveNext())return e;throw new Error("single:sequence contains more than one element.")}throw new Error("single:The sequence is empty.")})},e.prototype.singleOrDefault=function(t){void 0===t&&(t=null);var e=this;return e.throwIfDisposed(),y.using(this.getEnumerator(),function(e){if(e.moveNext()){var n=e.current;if(!e.moveNext())return n}return t})},e.prototype.any=function(){var t=this;return t.throwIfDisposed(),y.using(this.getEnumerator(),function(t){return t.moveNext()})},e.prototype.isEmpty=function(){return!this.any()},e.prototype.traverseBreadthFirst=function(t,e){void 0===e&&(e=b.Identity);var n=this,r=n._isEndless||null;return new O(function(){var o,i,u,s=0;return new f.EnumeratorBase(function(){s=0,i=[],u=0,o=n.getEnumerator()},function(n){for(;;){if(o.moveNext())return i[u++]=o.current,n.yieldReturn(e(o.current,s));if(!u)return n.yieldBreak();var r=O.from(i).selectMany(t);if(!r.any())return n.yieldBreak();s++,i=[],u=0,o.dispose(),o=r.getEnumerator()}},function(){y.dispose(o),i.length=0},r)},null,r)},e.prototype.traverseDepthFirst=function(t,e){void 0===e&&(e=b.Identity);var n=this,r=n._isEndless||null;return new O(function(){var o,u,s=[];return new f.EnumeratorBase(function(){o=n.getEnumerator(),u=0},function(n){for(;;){if(o.moveNext()){var r=e(o.current,u);s[u++]=o;var a=O.fromAny(t(o.current));return o=a?a.getEnumerator():i.empty,n.yieldReturn(r)}if(0==u)return!1;o.dispose(),o=s[--u],s.length=u}},function(){try{y.dispose(o)}finally{y.dispose.these(s)}},r)},null,r)},e.prototype.flatten=function(){var t=this,e=t._isEndless||null;return new O(function(){var n,r=null;return new f.EnumeratorBase(function(){n=t.getEnumerator()},function(t){for(;;){if(r){if(r.moveNext())return t.yieldReturn(r.current);r.dispose(),r=null}if(n.moveNext()){var e=n.current,o=!u.Type.isString(e)&&O.fromAny(e);if(o){r=o.selectMany(b.Identity).flatten().getEnumerator();continue}return t.yieldReturn(e)}return t.yieldBreak()}},function(){y.dispose(n,r)},e)},null,e)},e.prototype.pairwise=function(t){var e=this;return new O(function(){var n;return new f.EnumeratorBase(function(){n=e.getEnumerator(),n.moveNext()},function(e){var r=n.current;return n.moveNext()&&e.yieldReturn(t(r,n.current))},function(){y.dispose(n)},e._isEndless)},null,e._isEndless)},e.prototype.scan=function(t,e){var n=e!==B,r=this;return new O(function(){var o,i,u;return new f.EnumeratorBase(function(){o=r.getEnumerator(),u=!0},function(r){return u?(u=!1,n?r.yieldReturn(i=e):o.moveNext()&&r.yieldReturn(i=o.current)):o.moveNext()?r.yieldReturn(i=t(i,o.current)):!1},function(){y.dispose(o)},r._isEndless)},null,r._isEndless)},e.prototype.select=function(t){var e=this,n=!e.throwIfDisposed();return new O(function(){var r,o=0;return new f.EnumeratorBase(function(){I(n),o=0,r=e.getEnumerator()},function(e){return I(n),r.moveNext()?e.yieldReturn(t(r.current,o++)):e.yieldBreak()},function(){y.dispose(r)},e._isEndless)},function(){n=!0},e._isEndless)},e.prototype._selectMany=function(t,e){var n=this,r=n._isEndless||null;return e||(e=function(t,e){return e}),new O(function(){var o,u,s=0;return new f.EnumeratorBase(function(){o=n.getEnumerator(),u=void 0,s=0},function(n){if(u===B&&!o.moveNext())return!1;do{if(!u){var r=t(o.current,s++);if(!r)continue;u=i.from(r)}if(u.moveNext())return n.yieldReturn(e(o.current,u.current));u.dispose(),u=null}while(o.moveNext());return!1},function(){y.dispose(o,u),o=null,u=null},r)},null,r)},e.prototype.selectMany=function(t,e){return this._selectMany(t,e)},e.prototype._choose=function(t){var e=this,n=!e.throwIfDisposed();return new O(function(){var r,o=0;return new f.EnumeratorBase(function(){I(n),o=0,r=e.getEnumerator()},function(e){for(I(n);r.moveNext();){var i=t(r.current,o++);if(null!==i&&i!==B)return e.yieldReturn(i)}return!1},function(){y.dispose(r)},e._isEndless)},function(){n=!0},e._isEndless)},e.prototype.choose=function(t){return void 0===t&&(t=b.Identity),this._choose(t)},e.prototype.where=function(t){var e=this,n=!e.throwIfDisposed();return new O(function(){var r,o=0;return new f.EnumeratorBase(function(){I(n),o=0,r=e.getEnumerator()},function(e){for(I(n);r.moveNext();)if(t(r.current,o++))return e.yieldReturn(r.current);return!1},function(){y.dispose(r)},e._isEndless)},function(){n=!0},e._isEndless)},e.prototype.ofType=function(t){var e;switch(t){case Number:e=u.Type.NUMBER;break;case String:e=u.Type.STRING;break;case Boolean:e=u.Type.BOOLEAN;break;case Function:e=u.Type.FUNCTION;break;default:return this.where(function(e){return e instanceof t})}return this.choose().where(function(t){return typeof t===e})},e.prototype.except=function(t,e){var n=this,r=!n.throwIfDisposed();return new O(function(){var o,u;return new f.EnumeratorBase(function(){I(r),o=n.getEnumerator(),u=new l.Dictionary(e),t&&i.forEach(t,function(t){return u.addByKeyValue(t,!0)})},function(t){for(I(r);o.moveNext();){var e=o.current;if(!u.containsKey(e))return u.addByKeyValue(e,!0),t.yieldReturn(e)}return!1},function(){y.dispose(o),u.clear()},n._isEndless)},function(){r=!0},n._isEndless)},e.prototype.distinct=function(t){return this.except(null,t)},e.prototype.distinctUntilChanged=function(t){void 0===t&&(t=b.Identity);var e=this,r=!e.throwIfDisposed();return new O(function(){var o,i,u=!0;return new f.EnumeratorBase(function(){I(r),o=e.getEnumerator()},function(e){for(I(r);o.moveNext();){var s=t(o.current);if(u)u=!1;else if(n.areEqual(i,s))continue;return i=s,e.yieldReturn(o.current)}return!1},function(){y.dispose(o)},e._isEndless)},function(){r=!0},e._isEndless)},e.prototype.defaultIfEmpty=function(t){void 0===t&&(t=null);var e=this,n=!e.throwIfDisposed();return new O(function(){var r,o;return new f.EnumeratorBase(function(){o=!0,I(n),r=e.getEnumerator()},function(e){return I(n),r.moveNext()?(o=!1,e.yieldReturn(r.current)):o?(o=!1,e.yieldReturn(t)):!1},function(){y.dispose(r)},e._isEndless)},null,e._isEndless)},e.prototype.zip=function(t,e){var n=this;return n.throwIfDisposed(),new O(function(){var r,o,u=0;return new f.EnumeratorBase(function(){u=0,r=n.getEnumerator(),o=i.from(t)},function(t){return r.moveNext()&&o.moveNext()&&t.yieldReturn(e(r.current,o.current,u++))},function(){y.dispose(r,o)})})},e.prototype.zipMultiple=function(t,e){var n=this;return n.throwIfDisposed(),t.length?new O(function(){var r,o,u,s=0;return new f.EnumeratorBase(function(){r=new p.Queue(t),s=0,o=n.getEnumerator(),u=null},function(t){if(o.moveNext())for(;;){for(;!u;){if(!r.count)return t.yieldBreak();var n=r.dequeue();n&&(u=i.from(n))}if(u.moveNext())return t.yieldReturn(e(o.current,u.current,s++));u.dispose(),u=null}return t.yieldBreak()},function(){y.dispose(o,r)})}):O.empty()},e.prototype.join=function(t,e,n,r,o){void 0===o&&(o=b.Identity);var i=this;return new O(function(){var u,s,a=null,c=0;return new f.EnumeratorBase(function(){u=i.getEnumerator(),s=O.from(t).toLookup(n,b.Identity,o)},function(t){for(;;){if(null!=a){var n=a[c++];if(n!==B)return t.yieldReturn(r(u.current,n));n=null,c=0}if(!u.moveNext())return t.yieldBreak();var o=e(u.current);a=s.get(o)}},function(){y.dispose(u)})})},e.prototype.groupJoin=function(t,e,n,r,o){void 0===o&&(o=b.Identity);var i=this;return new O(function(){var u,s=null;return new f.EnumeratorBase(function(){u=i.getEnumerator(),s=O.from(t).toLookup(n,b.Identity,o)},function(t){return u.moveNext()&&t.yieldReturn(r(u.current,s.get(e(u.current))))},function(){y.dispose(u)})})},e.prototype.merge=function(t){var e=this,n=e._isEndless||null;return t&&0!=t.length?new O(function(){var r,o;return new f.EnumeratorBase(function(){r=e.getEnumerator(),o=new p.Queue(t)},function(t){for(;;){for(;!r&&o.count;)r=i.from(o.dequeue());if(r&&r.moveNext())return t.yieldReturn(r.current);{if(!r)return t.yieldBreak();r.dispose(),r=null}}},function(){y.dispose(r,o)},n)},null,n):e},e.prototype.concat=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return this.merge(t)},e.prototype.union=function(t,e){void 0===e&&(e=b.Identity);var n=this,r=n._isEndless||null;return new O(function(){var o,u,s;return new f.EnumeratorBase(function(){o=n.getEnumerator(),s=new l.Dictionary(e)},function(e){var n;if(u===B){for(;o.moveNext();)if(n=o.current,!s.containsKey(n))return s.addByKeyValue(n,null),e.yieldReturn(n);u=i.from(t)}for(;u.moveNext();)if(n=u.current,!s.containsKey(n))return s.addByKeyValue(n,null),e.yieldReturn(n);return!1},function(){y.dispose(o,u)},r)},null,r)},e.prototype.insertAt=function(t,e){s.Integer.assertZeroOrGreater(t,"index");var n=t,r=this,o=r._isEndless||null;return r.throwIfDisposed(),new O(function(){var t,u,s=0,a=!1;return new f.EnumeratorBase(function(){s=0,t=r.getEnumerator(),u=i.from(e),a=!1},function(e){return s==n&&(a=!0,u.moveNext())?e.yieldReturn(u.current):t.moveNext()?(s++,e.yieldReturn(t.current)):!a&&u.moveNext()&&e.yieldReturn(u.current)},function(){y.dispose(t,u)},o)},null,o)},e.prototype.alternateMultiple=function(t){var e=this;return new O(function(){var n,r,o,i;return new f.EnumeratorBase(function(){i=new c.ArrayEnumerator(O.toArray(t)),o=e.getEnumerator();var u=o.moveNext();r=u?1:0,u&&(n=o.current)},function(t){switch(r){case 0:return t.yieldBreak();case 2:if(i.moveNext())return t.yieldReturn(i.current);i.reset(),r=1}var e=n,u=o.moveNext();return r=u?2:0,u&&(n=o.current),t.yieldReturn(e)},function(){y.dispose(o,i)},e._isEndless)},null,e._isEndless)},e.prototype.alternateSingle=function(t){return this.alternateMultiple(O.make(t))},e.prototype.alternate=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return this.alternateMultiple(t)},e.prototype.catchError=function(t){var e=this,n=!e.throwIfDisposed();return new O(function(){var r;return new f.EnumeratorBase(function(){try{I(n),r=e.getEnumerator()}catch(t){}},function(e){try{if(I(n),r.moveNext())return e.yieldReturn(r.current)}catch(o){t(o)}return!1},function(){y.dispose(r)})})},e.prototype.finallyAction=function(t){var e=this,n=!e.throwIfDisposed();return new O(function(){var r;return new f.EnumeratorBase(function(){I(n),r=e.getEnumerator()},function(t){return I(n),r.moveNext()?t.yieldReturn(r.current):!1},function(){try{y.dispose(r)}finally{t()}})})},e.prototype.buffer=function(t){if(1>t||!isFinite(t))throw new Error("Invalid buffer size.");s.Integer.assert(t,"size");var e,n=this;return new O(function(){var r;return new f.EnumeratorBase(function(){r=n.getEnumerator()},function(n){var i=o.initialize(t);for(e=0;t>e&&r.moveNext();)i[e++]=r.current;return i.length=e,e&&n.yieldReturn(i)},function(){y.dispose(r)},n._isEndless)},null,n._isEndless)},e.prototype.share=function(){var t=this;t.throwIfDisposed();var e;return new O(function(){return e||(e=t.getEnumerator())},function(){y.dispose(e)},t._isEndless)},e}(d.DisposableBase);e.InfiniteEnumerable=A;var O=function(t){function e(e,n,r){void 0===r&&(r=null),t.call(this,e,n),this._isEndless=r}return __extends(e,t),e.from=function(t){var n=e.fromAny(t);if(!n)throw new h.UnsupportedEnumerableException;return n},e.fromAny=function(t,n){if(void 0===n&&(n=null),u.Type.isObject(t)||u.Type.isString(t)){if(t instanceof e)return t;if(u.Type.isArrayLike(t))return new S(t);if(i.isEnumerable(t))return new e(function(){return t.getEnumerator()},null,t.isEndless)}return n},e.fromOrEmpty=function(t){return e.fromAny(t)||e.empty()},e.toArray=function(t){return t instanceof e?t.toArray():i.toArray(t)},e.choice=function(t){var e=t&&t.length;if(!e||!isFinite(e))throw new w.ArgumentOutOfRangeException("length",length);return new A(function(){return new f.EnumeratorBase(null,function(e){return e.yieldReturn(s.Integer.random.select(t))},!0)})},e.chooseFrom=function(){for(var t=[],n=0;n<arguments.length;n++)t[n-0]=arguments[n];return e.choice(t)},e.cycle=function(t){var e=t&&t.length;if(!e||!isFinite(e))throw new w.ArgumentOutOfRangeException("length",length);return new A(function(){var e=0;return new f.EnumeratorBase(function(){e=0},function(n){return e>=t.length&&(e=0),n.yieldReturn(t[e++])},!0)})},e.cycleThrough=function(){for(var t=[],n=0;n<arguments.length;n++)t[n-0]=arguments[n];return e.cycle(t)},e.empty=function(){return new k(g)},e.repeat=function(t,n){return void 0===n&&(n=1/0),n>0?isFinite(n)&&s.Integer.assert(n,"count")?new k(function(){var e=n,r=0;return new f.EnumeratorBase(function(){r=0},function(n){return r++<e&&n.yieldReturn(t)},null,!1)}):new e(function(){return new f.EnumeratorBase(null,function(e){return e.yieldReturn(t)},!0)}):e.empty()},e.repeatWithFinalize=function(t,e){return new A(function(){var n;return new f.EnumeratorBase(function(){n=t()},function(t){return t.yieldReturn(n)},function(){e(n)},!0)})},e.make=function(t){return e.repeat(t,1)},e.range=function(t,n,r){if(void 0===r&&(r=1),!isFinite(t))throw new w.ArgumentOutOfRangeException("start",t,"Must be a finite number.");if(!(n>0))return e.empty();if(!r)throw new w.ArgumentOutOfRangeException("step",r,"Must be a valid value");if(!isFinite(r))throw new w.ArgumentOutOfRangeException("step",r,"Must be a finite number.");return s.Integer.assert(n,"count"),new k(function(){var e,o=n,i=0;return new f.EnumeratorBase(function(){i=0,e=t},function(t){var u=i++<o&&t.yieldReturn(e);return u&&n>i&&(e+=r),u},!1)})},e.rangeDown=function(t,n,r){return void 0===r&&(r=1),r=-1*Math.abs(r),e.range(t,n,r)},e.toInfinity=function(t,e){if(void 0===t&&(t=0),void 0===e&&(e=1),!isFinite(t))throw new w.ArgumentOutOfRangeException("start",t,"Must be a finite number.");if(!e)throw new w.ArgumentOutOfRangeException("step",e,"Must be a valid value");if(!isFinite(e))throw new w.ArgumentOutOfRangeException("step",e,"Must be a finite number.");return new A(function(){var n;return new f.EnumeratorBase(function(){n=t},function(t){var r=n;return n+=e,t.yieldReturn(r)},!0)})},e.toNegativeInfinity=function(t,n){return void 0===t&&(t=0),void 0===n&&(n=1),e.toInfinity(t,-n)},e.rangeTo=function(t,e,n){if(void 0===n&&(n=1),isNaN(e)||!isFinite(e))throw new w.ArgumentOutOfRangeException("to",e,"Must be a finite number.");if(n&&!isFinite(n))throw new w.ArgumentOutOfRangeException("step",n,"Must be a finite non-zero number.");return n=Math.abs(n),new k(function(){var r;return new f.EnumeratorBase(function(){r=t},e>t?function(t){var o=e>=r&&t.yieldReturn(r);return o&&(r+=n),o}:function(t){var o=r>=e&&t.yieldReturn(r);return o&&(r-=n),o},!1)})},e.matches=function(t,e,n){if(void 0===n&&(n=""),null===t||t===B)throw new E.ArgumentNullException("input");var r=typeof t;if(r!=u.Type.STRING)throw new Error("Cannot exec RegExp matches of type '"+r+"'.");return e instanceof RegExp&&(n+=e.ignoreCase?"i":"",n+=e.multiline?"m":"",e=e.source),-1===n.indexOf("g")&&(n+="g"),new k(function(){var r;return new f.EnumeratorBase(function(){r=new RegExp(e,n)},function(e){var n=r.exec(t);return null!==n?e.yieldReturn(n):!1})})},e.generate=function(t,n){return void 0===n&&(n=1/0),isNaN(n)||0>=n?e.empty():isFinite(n)&&s.Integer.assert(n,"count")?new k(function(){var e=n,r=0;return new f.EnumeratorBase(function(){r=0},function(n){var o=r++;return e>o&&n.yieldReturn(t(o))},!1)}):new A(function(){var e=0;return new f.EnumeratorBase(function(){e=0},function(n){return n.yieldReturn(t(e++))},!0)})},e.unfold=function(t,e,n){return void 0===n&&(n=!1),new A(function(){var r,o,i=0;return new f.EnumeratorBase(function(){i=0,r=t,o=!n},function(t){var n=i++;return o?o=!1:r=e(r,n),t.yieldReturn(r)},!0)})},e.forEach=function(t,e){i.forEach(t,e)},e.map=function(t,e){return i.map(t,e)},e.max=function(t){return t.takeUntil(function(t){return t==+(1/0)},!0).aggregate(b.Greater)},e.min=function(t){return t.takeUntil(function(t){return t==-(1/0)},!0).aggregate(b.Lesser)},e.weave=function(t){if(!t)throw new E.ArgumentNullException("enumerables");return new e(function(){var e,n,r;return new f.EnumeratorBase(function(){r=0,e=new p.Queue,n=i.from(t)},function(t){var r;if(n){for(;!r&&n.moveNext();){var o=n.current;r=x(e,o&&i.from(o))}r||(n=null)}for(;!r&&e.count;)r=x(e,e.dequeue());return r?t.yieldReturn(r.current):t.yieldBreak()},function(){y.dispose.these(e.dump()),y.dispose(n,e),n=null,e=null})})},e.prototype.doAction=function(e,n,r){return void 0===r&&(r=this.isEndless),t.prototype.doAction.call(this,e,n,r)},e.prototype.skip=function(e){return t.prototype.skip.call(this,e)},e.prototype.skipWhile=function(t){return this.throwIfDisposed(),this.doAction(function(e,n){return t(e,n)?2:1})},e.prototype.takeWhile=function(t){if(this.throwIfDisposed(),!t)throw new E.ArgumentNullException("predicate");return this.doAction(function(e,n){return t(e,n)?1:0},null,null)},e.prototype.takeUntil=function(t,e){if(this.throwIfDisposed(),!t)throw new E.ArgumentNullException("predicate");if(!e)return this.doAction(function(e,n){return t(e,n)?0:1},null,null);var n=!1;return this.doAction(function(e,r){return n?0:(n=t(e,r),1)},function(){n=!1},null)},e.prototype.forEach=function(t){var e=this;e.throwIfDisposed(),i.throwIfEndless(e.isEndless);var n=0;y.using(e.getEnumerator(),function(r){for(i.throwIfEndless(r.isEndless);e.throwIfDisposed()&&r.moveNext()&&t(r.current,n++)!==!1;);})},e.prototype.toArray=function(t){return t?this.where(t).toArray():this.copyTo([])},e.prototype.copyTo=function(t,e){if(void 0===e&&(e=0),this.throwIfDisposed(),!t)throw new E.ArgumentNullException("target");return s.Integer.assertZeroOrGreater(e),i.forEach(this,function(n,r){t[r+e]=n}),t},e.prototype.toLookup=function(t,e,n){void 0===e&&(e=b.Identity),void 0===n&&(n=b.Identity);var r=new l.Dictionary(n);return this.forEach(function(n){var o=t(n),i=e(n),u=r.getValue(o);u!==B?u.push(i):r.addByKeyValue(o,[i])}),new T(r)},e.prototype.toMap=function(t,e){var n={};return this.forEach(function(r,o){n[t(r,o)]=e(r,o)}),n},e.prototype.toDictionary=function(t,e,n){void 0===n&&(n=b.Identity);var r=new l.Dictionary(n);return this.forEach(function(n,o){return r.addByKeyValue(t(n,o),e(n,o))}),r},e.prototype.toJoinedString=function(t,e){return void 0===t&&(t=""),void 0===e&&(e=b.Identity),this.select(e).toArray().join(t)},e.prototype.takeExceptLast=function(t){void 0===t&&(t=1);var n=this;if(!(t>0))return n;if(!isFinite(t))return e.empty();s.Integer.assert(t,"count");var r=t;return new e(function(){var t,e;return new f.EnumeratorBase(function(){t=n.getEnumerator(),e=new p.Queue},function(n){for(;t.moveNext();)if(e.enqueue(t.current),e.count>r)return n.yieldReturn(e.dequeue());return!1},function(){y.dispose(t,e)})})},e.prototype.skipToLast=function(t){if(!(t>0))return e.empty();var n=this;return isFinite(t)?(s.Integer.assert(t,"count"),n.reverse().take(t).reverse()):n},e.prototype.where=function(e){return t.prototype.where.call(this,e)},e.prototype.select=function(e){return t.prototype.select.call(this,e)},e.prototype.selectMany=function(t,e){return this._selectMany(t,e)},e.prototype.choose=function(t){return void 0===t&&(t=b.Identity),this._choose(t)},e.prototype.reverse=function(){var t=this,n=!t.throwIfDisposed();return i.throwIfEndless(t._isEndless),new e(function(){var e,r=0;return new f.EnumeratorBase(function(){I(n),e=t.toArray(),r=e.length},function(t){return r&&t.yieldReturn(e[--r])},function(){e.length=0})},function(){n=!0})},e.prototype.shuffle=function(){var t=this,n=!t.throwIfDisposed();return i.throwIfEndless(t._isEndless),new e(function(){var e,r,o;return new f.EnumeratorBase(function(){I(n),e=t.toArray(),r=o=e.length},function(t){if(!o)return t.yieldBreak();var n=s.Integer.random(o),r=e[n];return e[n]=e[--o],e[o]=null,o%32==0&&(e.length=o),t.yieldReturn(r)},function(){e.length=0})},function(){n=!0})},e.prototype.count=function(t){var e=0;return this.forEach(t?function(n,r){t(n,r)&&++e}:function(){++e}),e},e.prototype.all=function(t){if(!t)throw new E.ArgumentNullException("predicate");var e=!0;return this.forEach(function(n,r){return t(n,r)?void 0:(e=!1,!1)}),e},e.prototype.every=function(t){return this.all(t)},e.prototype.any=function(e){if(!e)return t.prototype.any.call(this);var n=!1;return this.forEach(function(t,r){return n=e(t,r),!n}),n},e.prototype.some=function(t){return this.any(t)},e.prototype.contains=function(t,e){return e?this.any(function(n){return e(n)===e(t)}):this.any(function(e){return e===t})},e.prototype.indexOf=function(t,e){var r=-1;return this.forEach(e?function(o,i){return n.areEqual(e(o,i),e(t,i),!0)?(r=i,!1):void 0}:function(e,o){return n.areEqual(e,t,!0)?(r=o,!1):void 0}),r},e.prototype.lastIndexOf=function(t,e){var r=-1;return this.forEach(e?function(o,i){n.areEqual(e(o,i),e(t,i),!0)&&(r=i)}:function(e,o){n.areEqual(e,t,!0)&&(r=o)}),r},e.prototype.merge=function(e){return t.prototype.merge.call(this,e)},e.prototype.concat=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return this.merge(t)},e.prototype.intersect=function(t,n){var r=this;return new e(function(){var e,o,u;return new f.EnumeratorBase(function(){e=r.getEnumerator(),o=new l.Dictionary(n),u=new l.Dictionary(n),i.forEach(t,function(t){o.addByKeyValue(t,!0)})},function(t){for(;e.moveNext();){var n=e.current;if(!u.containsKey(n)&&o.containsKey(n))return u.addByKeyValue(n,!0),t.yieldReturn(n)}return t.yieldBreak()},function(){y.dispose(e,o,u)},r._isEndless)},null,r._isEndless)},e.prototype.sequenceEqual=function(t,e){return void 0===e&&(e=n.areEqual),y.using(this.getEnumerator(),function(n){return y.using(i.from(t),function(t){for(i.throwIfEndless(n.isEndless&&t.isEndless);n.moveNext();)if(!t.moveNext()||!e(n.current,t.current))return!1;return!t.moveNext()})})},e.prototype.ofType=function(e){return t.prototype.ofType.call(this,e)},e.prototype.except=function(e,n){return t.prototype.except.call(this,e,n)},e.prototype.distinct=function(e){return t.prototype.distinct.call(this,e)},e.prototype.distinctUntilChanged=function(e){return void 0===e&&(e=b.Identity),t.prototype.distinctUntilChanged.call(this,e)},e.prototype.orderBy=function(t){return void 0===t&&(t=b.Identity),new q(this,t,1)},e.prototype.orderUsing=function(t){return new q(this,null,1,null,t)},e.prototype.orderUsingReversed=function(t){return new q(this,null,-1,null,t)},e.prototype.orderByDescending=function(t){return void 0===t&&(t=b.Identity),new q(this,t,-1)},e.prototype.buffer=function(e){return t.prototype.buffer.call(this,e)},e.prototype.groupBy=function(t,n,r){var o=this;return n||(n=b.Identity),new e(function(){return o.toLookup(t,n,r).getEnumerator()})},e.prototype.partitionBy=function(t,n,r,o){void 0===r&&(r=function(t,e){return new F(t,e)}),void 0===o&&(o=b.Identity);var i=this;return n||(n=b.Identity),new e(function(){var e,u,s,a,c;return new f.EnumeratorBase(function(){e=i.getEnumerator(),e.moveNext()?(u=t(e.current),s=o(u),a=[n(e.current)],c=1):a=null},function(i){if(!a)return i.yieldBreak();for(var f,l;(f=e.moveNext())&&(l=e.current,s===o(t(l)));)a[c++]=n(l);var p=r(u,a);return f?(l=e.current,u=t(l),s=o(u),a=[n(l)],c=1):a=null,i.yieldReturn(p)},function(){y.dispose(e),a=null})})},e.prototype.aggregate=function(t,e){return this.scan(t,e).lastOrDefault()},e.prototype.average=function(t){void 0===t&&(t=u.Type.numberOrNaN);var e=0,n=this.sum(function(n,r){return e++,t(n,r)});return isNaN(n)||!e?NaN:n/e},e.prototype.max=function(){return this.aggregate(b.Greater)},e.prototype.min=function(){return this.aggregate(b.Lesser)},e.prototype.maxBy=function(t){return void 0===t&&(t=b.Identity),this.aggregate(function(e,n){return t(e)>t(n)?e:n})},e.prototype.minBy=function(t){return void 0===t&&(t=b.Identity),this.aggregate(function(e,n){return t(e)<t(n)?e:n})},e.prototype.sum=function(t){void 0===t&&(t=u.Type.numberOrNaN);var e=0,n=0;return this.forEach(function(r){var o=t(r);return isNaN(o)?(e=NaN,!1):void(isFinite(o)?e+=o:n+=o>0?1:-1)}),isNaN(e)?NaN:n?n*(1/0):e},e.prototype.product=function(t){void 0===t&&(t=u.Type.numberOrNaN);var e=1,n=!1;return this.forEach(function(r,o){n=!0;var i=t(r,o);return isNaN(i)?(e=NaN,!1):0==i?(e=0,!1):void(e*=i)}),n&&isNaN(e)?NaN:e},e.prototype.quotient=function(t){void 0===t&&(t=u.Type.numberOrNaN);var e=0,n=NaN;return this.forEach(function(r,o){var i=t(r,o);if(e++,1===e)n=i;else{if(isNaN(i)||0===i||!isFinite(i))return n=NaN,!1;n/=i}}),1===e&&(n=NaN),n},e.prototype.last=function(){var t=this;t.throwIfDisposed();var e=void 0,n=!1;if(t.forEach(function(t){n=!0,e=t}),!n)throw new Error("last:No element satisfies the condition.");return e},e.prototype.lastOrDefault=function(t){void 0===t&&(t=null);var e=this;e.throwIfDisposed();var n=void 0,r=!1;return e.forEach(function(t){r=!0,n=t}),r?n:t},e.prototype.share=function(){return t.prototype.share.call(this)},e.prototype.catchError=function(e){return t.prototype.catchError.call(this,e)},e.prototype.finallyAction=function(e){return t.prototype.finallyAction.call(this,e)},e.prototype.memoize=function(){var t,n,r=this,o=!r.throwIfDisposed();return new e(function(){var e=0;return new f.EnumeratorBase(function(){I(o),n||(n=r.getEnumerator()),t||(t=[]),e=0},function(r){I(o);var i=e++;return i>=t.length?n.moveNext()?r.yieldReturn(t[i]=n.current):!1:r.yieldReturn(t[i])})},function(){o=!0,t&&(t.length=0),t=null,y.dispose(n),n=null})},e}(A);e.Enumerable=O;var k=function(t){function e(e,n){t.call(this,e,n,!1)}return __extends(e,t),e}(O);e.FiniteEnumerable=k;var S=function(t){function e(e){t.call(this,function(){return n.throwIfDisposed(),new c.ArrayEnumerator(function(){return n.throwIfDisposed("The underlying ArrayEnumerable was disposed.","ArrayEnumerator"),n._source})});var n=this;n._disposableObjectName="ArrayEnumerable",n._source=e}return __extends(e,t),e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._source=null},Object.defineProperty(e.prototype,"source",{get:function(){return this._source},enumerable:!0,configurable:!0}),e.prototype.toArray=function(){var t=this;return t.throwIfDisposed(),i.toArray(t._source)},e.prototype.asEnumerable=function(){return new e(this._source)},e.prototype.forEach=function(t){var e=this;e.throwIfDisposed(),i.forEach(e._source,t)},e.prototype.any=function(e){var n=this;n.throwIfDisposed();var r=n._source,o=r.length;return o&&(!e||t.prototype.any.call(this,e))},e.prototype.count=function(e){var n=this;n.throwIfDisposed();var r=n._source,o=r.length;return o&&(e?t.prototype.count.call(this,e):o)},e.prototype.elementAtOrDefault=function(t,e){void 0===e&&(e=null);var n=this;n.throwIfDisposed(),s.Integer.assertZeroOrGreater(t,"index");var r=n._source;return t<r.length?r[t]:e},e.prototype.last=function(){var e=this;e.throwIfDisposed();var n=e._source,r=n.length;return r?n[r-1]:t.prototype.last.call(this)},e.prototype.lastOrDefault=function(t){void 0===t&&(t=null);var e=this;e.throwIfDisposed();var n=e._source,r=n.length;return r?n[r-1]:t},e.prototype.skip=function(t){var e=this;return t>0?new O(function(){return new c.ArrayEnumerator(function(){return e._source},t)}):e},e.prototype.takeExceptLast=function(t){void 0===t&&(t=1);var e=this;return e.take(e._source.length-t)},e.prototype.skipToLast=function(t){if(!(t>0))return O.empty();var e=this;if(!isFinite(t))return e;var n=e._source?e._source.length:0;return e.skip(n-t)},e.prototype.reverse=function(){var t=this;return new O(function(){return new c.ArrayEnumerator(function(){return t._source},t._source?t._source.length-1:0,-1)})},e.prototype.memoize=function(){return this.asEnumerable()},e.prototype.sequenceEqual=function(o,i){return void 0===i&&(i=n.areEqual),u.Type.isArrayLike(o)?r.areEqual(this.source,o,!0,i):o instanceof e?o.sequenceEqual(this.source,i):t.prototype.sequenceEqual.call(this,o,i)},e.prototype.toJoinedString=function(e,n){void 0===e&&(e=""),void 0===n&&(n=b.Identity);var r=this._source;return!n&&Array.isArray(r)?r.join(e):t.prototype.toJoinedString.call(this,e,n)},e}(k),F=function(t){function e(e,n){t.call(this,n),this._groupKey=e}return __extends(e,t),Object.defineProperty(e.prototype,"key",{get:function(){return this._groupKey},enumerable:!0,configurable:!0}),e}(S),T=function(){function t(t){this._dictionary=t}return Object.defineProperty(t.prototype,"count",{get:function(){return this._dictionary.count},enumerable:!0,configurable:!0}),t.prototype.get=function(t){return this._dictionary.getValue(t)},t.prototype.contains=function(t){return this._dictionary.containsKey(t)},t.prototype.getEnumerator=function(){var t,e=this;return new f.EnumeratorBase(function(){
t=e._dictionary.getEnumerator()},function(e){if(!t.moveNext())return!1;var n=t.current;return e.yieldReturn(new F(n.key,n.value))},function(){y.dispose(t)})},t}(),q=function(t){function e(e,r,o,u,s){void 0===s&&(s=n.compare),t.call(this,null),this.source=e,this.keySelector=r,this.order=o,this.parent=u,this.comparer=s,i.throwIfEndless(e&&e.isEndless)}return __extends(e,t),e.prototype.createOrderedEnumerable=function(t,n){return new e(this.source,t,n,this)},e.prototype.thenBy=function(t){return this.createOrderedEnumerable(t,1)},e.prototype.thenUsing=function(t){return new e(this.source,null,1,this,t)},e.prototype.thenByDescending=function(t){return this.createOrderedEnumerable(t,-1)},e.prototype.thenUsingReversed=function(t){return new e(this.source,null,-1,this,t)},e.prototype.getEnumerator=function(){var t,e,n=this,r=0;return new f.EnumeratorBase(function(){r=0,t=O.toArray(n.source),e=N(n).generateSortedIndexes(t)},function(n){return r<e.length?n.yieldReturn(t[e[r++]]):!1},function(){t&&(t.length=0),t=null,e&&(e.length=0),e=null},!1)},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this.source=null,this.keySelector=null,this.order=null,this.parent=null},e}(k);Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=O});
//# sourceMappingURL=Linq.js.map
