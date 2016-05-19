/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
define(["require","exports","../Text/Utility","../Exceptions/InvalidOperationException","../Exceptions/ArgumentException","../Exceptions/ArgumentNullException","./Enumeration/EnumeratorBase"],function(t,e,n,r,o,i,u){"use strict";function s(t,e){if(void 0===e&&(e="node"),null==t)throw new i.ArgumentNullException(e);if(t.next||t.previous)throw new r.InvalidOperationException("Cannot add a node to a LinkedNodeList that is already linked.")}var a=function(){function t(){this._first=null,this._last=null,this.unsafeCount=0}return Object.defineProperty(t.prototype,"first",{get:function(){return this._first},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"last",{get:function(){return this._last},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"count",{get:function(){for(var t=this._first,e=0;t;)e++,t=t.next;return e},enumerable:!0,configurable:!0}),t.prototype.forEach=function(t){var e=null,n=this.first,r=0;do e=n,n=e&&e.next;while(e&&t(e,r++)!==!1)},t.prototype.map=function(t){if(!t)throw new i.ArgumentNullException("selector");var e=[];return this.forEach(function(n){e.push(t(n))}),e},t.prototype.clear=function(){var t,e=this,n=0,r=0;for(t=e._first,e._first=null;t;){n++;var o=t;t=t.next,o.next=null}for(t=e._last,e._last=null;t;){r++;var o=t;t=t.previous,o.previous=null}return n!==r&&console.warn("LinkedNodeList: Forward versus reverse count does not match when clearing. Forward: "+n+", Reverse: "+r),e.unsafeCount=0,n},t.prototype.dispose=function(){this.clear()},t.prototype.contains=function(t){return-1!=this.indexOf(t)},t.prototype.getNodeAt=function(t){if(0>t)return null;for(var e=this._first,n=0;e&&t<n++;)e=e.next;return e},t.prototype.find=function(t){var e=null;return this.forEach(function(n,r){return t(n,r)?(e=n,!1):void 0}),e},t.prototype.indexOf=function(t){if(t&&(t.previous||t.next)){var e,n=0,r=this._first;do{if(e=r,e===t)return n;n++}while(r=e&&e.next)}return-1},t.prototype.removeFirst=function(){return this.removeNode(this._first)},t.prototype.removeLast=function(){return this.removeNode(this._last)},t.prototype.removeNode=function(t){if(null==t)throw new i.ArgumentNullException("node");var e=this,r=t.previous,u=t.next,s=!1,a=!1;if(r?r.next=u:e._first==t?e._first=u:s=!0,u?u.previous=r:e._last==t?e._last=r:a=!0,s!==a)throw new o.ArgumentException("node",n.format("Provided node is has no {0} reference but is not the {1} node!",s?"previous":"next",s?"first":"last"));var f=!s&&!a;return f&&e.unsafeCount--,f},t.prototype.addNode=function(t){this.addNodeAfter(t)},t.prototype.addNodeBefore=function(t,e){s(t);var n=this;if(e||(e=n._first),e){var r=e.previous;t.previous=r,t.next=e,e.previous=t,r&&(r.next=t),e==n._first&&(n._last=t)}else n._first=n._last=t;n.unsafeCount++},t.prototype.addNodeAfter=function(t,e){s(t);var n=this;if(e||(e=n._last),e){var r=e.next;t.next=r,t.previous=e,e.next=t,r&&(r.previous=t),e==n._last&&(n._last=t)}else n._first=n._last=t;n.unsafeCount++},t.prototype.replace=function(t,e){if(null==t)throw new i.ArgumentNullException("node");s(e,"replacement");var n=this;e.previous=t.previous,e.next=t.next,t.previous&&(t.previous.next=e),t.next&&(t.next.previous=e),t==n._first&&(n._first=e),t==n._last&&(n._last=e)},t.valueEnumeratorFrom=function(t){if(!t)throw new i.ArgumentNullException("list");var e,n;return new u.EnumeratorBase(function(){e=null,n=t.first},function(t){return n?(e=n,n=e&&e.next,t.yieldReturn(e.value)):t.yieldBreak()})},t.copyValues=function(t,e,n){if(void 0===n&&(n=0),t&&t.first){if(!e)throw new i.ArgumentNullException("array");t.forEach(function(t,r){e[n+r]=t.value})}return e},t}();e.LinkedNodeList=a,Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=a});
//# sourceMappingURL=LinkedNodeList.js.map
