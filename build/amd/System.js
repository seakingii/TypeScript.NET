﻿define("TypeScript.NET/System",
function () {
	var __extends,System;(function(n){"use strict";function t(t){return typeof t===n.Types.Number&&isNaN(t)}function r(n,i,r){return typeof r=="undefined"&&(r=!0),n===i||!r&&n==i||t(n)&&t(i)}function u(n,t,i){return typeof i=="undefined"&&(i=!0),r(n,t,i)?0:n>t?1:-1}function i(t,r){var u,f,e;if(typeof r=="undefined"&&(r=0),r<0)return t;switch(typeof t){case n.Types.Undefined:case n.Types.Null:case n.Types.String:case n.Types.Boolean:case n.Types.Number:case n.Types.Function:return t}if(t instanceof Array){if(u=t.slice(),r>0)for(f=0;f<u.length;f++)f in u&&(u[f]=i(u[f],r-1))}else if(u={},r>0)for(e in t)u[e]=i(t[e],r-1);return u}function f(n,t){for(var i in n)t[i]=n[i]}function e(n,t){t.forEach(function(t){Object.getOwnPropertyNames(t.prototype).forEach(function(i){n.prototype[i]=t.prototype[i]})})}n.Functions={Identity:function(n){return n},True:function(){return!0},False:function(){return!1},Blank:function(){}};n.Types={Boolean:"boolean",Number:"number",String:"string",Object:"object",Null:"object",Undefined:typeof undefined,Function:typeof n.Functions.Blank};n.isEqualToNaN=t;n.areEqual=r;n.compare=u;n.clone=i;n.copyTo=f;n.applyMixins=e})(System||(System={})),function(n){function t(t){t&&typeof t.dispose==n.Types.Function&&t.dispose()}function i(n,i){try{return i(n)}finally{t(n)}}n.dispose=t;n.using=i;var r=function(){function n(n){this._finalizer=n;this._wasDisposed=!1}return Object.defineProperty(n.prototype,"wasDisposed",{get:function(){return this._wasDisposed},enumerable:!0,configurable:!0}),n.assertIsNotDisposed=function(n,t){if(typeof t=="undefined"&&(t="ObjectDisposedException"),n)throw new Error(t);return!0},n.prototype.assertIsNotDisposed=function(t){return typeof t=="undefined"&&(t="ObjectDisposedException"),n.assertIsNotDisposed(this._wasDisposed,t)},n.prototype.dispose=function(){var n=this;if(!n._wasDisposed){n._wasDisposed=!0;try{n._onDispose()}finally{n._finalizer&&n._finalizer()}}},n.prototype._onDispose=function(){},n}();n.DisposableBase=r}(System||(System={}));__extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},function(n){var t=function(n){function t(t){n.call(this);this._closure=t}return __extends(t,n),Object.defineProperty(t.prototype,"isValueCreated",{get:function(){return this._isValueCreated},enumerable:!0,configurable:!0}),t.prototype.reset=function(){var n=this;if(!n._closure)throw new Error("Cannot reset.  This Lazy has de-referenced its closure.");n._isValueCreated=!1;n._value=null},Object.defineProperty(t.prototype,"value",{get:function(){var n=this,t;return!n._isValueCreated&&n._closure?(t=n._closure(),n._value=t,n._isValueCreated=!0,t):n._value},enumerable:!0,configurable:!0}),t.prototype.valueOnce=function(){try{return this.value}finally{this._closure=null}},t.prototype._onDispose=function(){this._closure=null;this._value=null},t}(n.DisposableBase);n.Lazy=t}(System||(System={})),function(n){(function(t){(function(t){function f(n){return n?n.slice():n}function i(n,t){return n?n.indexOf(t)!=-1:!1}function e(n,t,i,r){var f=0,u;if(r!==0)for(r||(r=Infinity),u=n.length-1;u>=0;--u)if(n[u]===t&&(n[u]=i,++f,!--r))break;return f}function o(n,t){var r=n&&(!n.length||!i(n,t));return r&&n.push(t),r}function s(n,t){for(var r=n.length,i=0;i<r;++i)if(i in n&&t(n[i]))return i;return-1}function h(n,t){var u,i,f;if(n.length<2)throw new Error("Cannot compare a set of arrays less than 2.");for(u=n[0],i=0,f=n.length;i<f;++i)if(!r(u,n[i],t))return!1;return!0}function r(t,i,r){var f,e,u;if(t===i)return!0;if(f=t.length,f!=i.length)return!1;for(e=n.areEqual,u=0;u<f;++u)if(!e(t[u],i[u],r))return!1;return!0}function c(n,t){for(var i=0;i<n.length;++i)n[i]=t(n[i]);return n}function l(n,t){var i=t<n.length;return i&&n.splice(t,1),i}function a(n,t,i){var u=0,r;if(n&&n.length&&i!==0)for(i||(i=Infinity),r=n.length-1;r>=0;--r)if(n[r]===t&&(n.splice(r,1),++u,!--i))break;return u}function v(n,t){for(var i=[];t--;)i.push(n);return i}function y(n,t){if(typeof t=="undefined"&&(t=!1),!n.length)return 0;var i=0;return t?n.forEach(function(n){isNaN(n)||(i+=n)}):n.every(function(n){return i+=n,!isNaN(i)}),i}function p(n,t){if(typeof t=="undefined"&&(t=!1),!n.length)return NaN;var i=0,r;return t?(r=0,n.forEach(function(n){isNaN(n)||(i+=n,r++)})):(r=n.length,n.every(function(n){return i+=n,!isNaN(i)})),!r||isNaN(i)?NaN:i/r}function w(n,t){var i,r;return(typeof t=="undefined"&&(t=!1),!n.length)?NaN:(i=1,t?(r=!1,n.forEach(function(n){isNaN(n)||(i*=n,r||(r=!0))}),r||(i=NaN)):n.every(function(n){return isNaN(n)?(i=NaN,!1):(i*=n,!0)}),i)}function u(n,t,i,r){var u,f;return n.length?(u=t,i?(f=!1,n.forEach(function(n){isNaN(n)||(r(n,u)&&(u=n),f||(f=!0))}),f||(u=NaN)):n.every(function(n){return isNaN(n)?(u=NaN,!1):(r(n,u)&&(u=n),!0)}),u):NaN}function b(n,t){return typeof t=="undefined"&&(t=!1),u(n,+Infinity,t,function(n,t){return n<t})}function k(n,t){return typeof t=="undefined"&&(t=!1),u(n,-Infinity,t,function(n,t){return n>t})}t.copy=f;t.contains=i;t.replace=e;t.register=o;t.findIndex=s;t.areAllEqual=h;t.areEqual=r;t.applyTo=c;t.removeIndex=l;t.remove=a;t.repeat=v;t.sum=y;t.average=p;t.product=w;t.min=b;t.max=k})(t.ArrayUtility||(t.ArrayUtility={}));var i=t.ArrayUtility})(n.Collections||(n.Collections={}));var t=n.Collections}(System||(System={})),function(n){var t=n.Collections.ArrayUtility,i=function(n){function t(t,i,r,u){typeof r=="undefined"&&(r=!1);typeof u=="undefined"&&(u=0);n.call(this);this.type=t;this.listener=i;this.useCapture=r;this.priority=u}return __extends(t,n),t.prototype.dispose=function(){this.listener=null},Object.defineProperty(t.prototype,"wasDisposed",{get:function(){return this.listener==null},enumerable:!0,configurable:!0}),t.prototype.matches=function(n,t,i){typeof i=="undefined"&&(i=!1);var r=this;return r.type==n&&r.listener==t&&r.useCapture==i},t.prototype.equals=function(n){var t=this;return t.type==n.type&&t.listener==n.listener&&t.useCapture==n.useCapture&&t.priority==n.priority},t}(n.DisposableBase),r=function(r){function u(){r.apply(this,arguments);this._isDisposing=!1}return __extends(u,r),u.prototype.addEventListener=function(n,t,r,u){typeof r=="undefined"&&(r=!1);typeof u=="undefined"&&(u=0);var f=this._listeners;f||(this._listeners=f=[]);f.push(new i(n,t,r,u))},u.prototype.registerEventListener=function(n,t,i,r){typeof i=="undefined"&&(i=!1);typeof r=="undefined"&&(r=0);this.hasEventListener(n,t,i)||this.addEventListener(n,t,i,r)},u.prototype.hasEventListener=function(n,t,i){typeof i=="undefined"&&(i=!1);var r=this._listeners;return r&&r.some(function(r){return n==r.type&&(!t||t==r.listener&&i==r.useCapture)})},u.prototype.removeEventListener=function(n,i,r){var u,f,e;typeof r=="undefined"&&(r=!1);u=this._listeners;u&&(f=t.findIndex(u,function(t){return t.matches(n,i,r)}),f!=-1&&(e=u[f],u.splice(f,1),e.dispose()))},u.prototype.dispatchEvent=function(t,i){var s=this,e=this,f=e._listeners,r,o,u;return!f||!f.length?!1:(typeof t=="string"?(r=new Event,i||(i={}),r.cancelable=!!i.cancelable,r.target=e,r.type=t):r=t,o=r.type,u=[],f.forEach(function(n){n.type==o&&u.push(n)}),!u.length)?!1:(u.sort(function(n,t){return t.priority-n.priority}),u.forEach(function(t){var i=new Event;n.copyTo(r,i);i.target=s;t.listener(i)}),!0)},Object.defineProperty(u,"DISPOSING",{get:function(){return"disposing"},enumerable:!0,configurable:!0}),Object.defineProperty(u,"DISPOSED",{get:function(){return"disposed"},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"isDisposing",{get:function(){return this._isDisposing},enumerable:!0,configurable:!0}),u.prototype.dispose=function(){var n=this,t;n.wasDisposed||n._isDisposing||(n._isDisposing=!0,n.dispatchEvent(u.DISPOSING),r.prototype.dispose.call(this),n.dispatchEvent(u.DISPOSED),t=n._listeners,t&&(this._listeners=null,t.forEach(function(n){return n.dispose()})))},u}(n.DisposableBase);n.EventDispatcher=r}(System||(System={})),function(n){(function(t){"use strict";var e=function(){function n(){}return Object.defineProperty(n.prototype,"current",{get:function(){return this._current},enumerable:!0,configurable:!0}),n.prototype.yieldReturn=function(n){return this._current=n,!0},n.prototype.yieldBreak=function(){return this._current=null,!1},n}(),f,o,i,r,u;(function(n){n[n.Before=0]="Before";n[n.Running=1]="Running";n[n.After=2]="After"})(f||(f={})),function(n){function t(n){if(n instanceof Array)return new u(n);if(n.getEnumerator)return n.getEnumerator();throw new Error("Unknown enumerable.");}n.from=t}(t.Enumerator||(t.Enumerator={}));o=t.Enumerator;i=function(n){function t(t,i,r){n.call(this);this.initializer=t;this.tryGetNext=i;this.disposer=r;this.reset()}return __extends(t,n),Object.defineProperty(t.prototype,"current",{get:function(){return this._yielder.current},enumerable:!0,configurable:!0}),t.prototype.reset=function(){var n=this;n._yielder=new e;n._state=0},t.prototype.moveNext=function(){var n=this,t;try{switch(n._state){case 0:n._state=1;t=n.initializer;t&&t();case 1:return n.tryGetNext(n._yielder)?!0:(this.dispose(),!1);case 2:return!1}}catch(i){this.dispose();throw i;}},t.prototype._onDispose=function(){var n=this,i=n.disposer,t;n.initializer=null;n.disposer=null;t=n._yielder;n._yielder=null;t&&t.yieldBreak();try{i&&i()}finally{this._state=2}},t}(n.DisposableBase);t.EnumeratorBase=i;r=function(n){function t(t){var i;n.call(this,function(){if(i=t(),i&&i.source){if(i.length&&i.step===0)throw new Error("Invalid IndexEnumerator step value (0).");i.pointer||(i.pointer=0);var n=i.step;if(n){if(n!=Math.floor(n))throw new Error("Invalid IndexEnumerator step value ("+n+") has decimal.");}else i.step=1}},function(n){var r=i&&i.source?i.length:0,t;return r?(t=i.pointer,i.pointer+=i.step,t<r&&t>=0?n.yieldReturn(i.source[t]):n.yieldBreak()):n.yieldBreak()},function(){i&&(i.source=null)})}return __extends(t,n),t}(i);t.IndexEnumerator=r;u=function(n){function t(t,i,r){typeof i=="undefined"&&(i=0);typeof r=="undefined"&&(r=1);n.call(this,function(){var n=t instanceof Array?t:t();return{source:n,pointer:i,length:n?n.length:0,step:r}})}return __extends(t,n),t}(r);t.ArrayEnumerator=u})(n.Collections||(n.Collections={}));var t=n.Collections}(System||(System={})),function(n){(function(t){var i=function(){function i(){this._updateRecursion=0}return Object.defineProperty(i.prototype,"isUpdating",{get:function(){return this._updateRecursion!=0},enumerable:!0,configurable:!0}),i.prototype._onValueUpdate=function(t,i,r){if(!n.areEqual(i,r,!0)){var u=this;if(u.onValueChanged)u.onValueChanged(t,i,r);u._updateRecursion==0&&u._onUpdated()}},i.prototype._onUpdated=function(){var n=this;n.onUpdated&&n.onUpdated()},i.prototype.handleUpdate=function(n){var t=this,i;if(n){t._updateRecursion++;try{i=n()}finally{t._updateRecursion--}}else i=t._updateRecursion==0;return i&&t._updateRecursion==0&&t._onUpdated(),i},Object.defineProperty(i.prototype,"isReadOnly",{get:function(){return!1},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"count",{get:function(){throw new Error("Not implemented.");},enumerable:!0,configurable:!0}),i.prototype.add=function(n){this.addByKeyValue(n.key,n.value)},i.prototype.clear=function(){var n=this,i=n.keys,t=i.length;return t&&n.handleUpdate(function(){return i.forEach(function(t){return n.removeByKey(t)}),!0}),t!=n.count&&console.warn("Dictioary clear() results in mismatched count."),t},i.prototype.contains=function(t){var i=this.get(t.key);return n.areEqual(i,t.value)},i.prototype.copyTo=function(n,t){typeof t=="undefined"&&(t=0);for(var i=this.getEnumerator();i.moveNext();)n[t++]=i.current},i.prototype.remove=function(t){var i=t.key,r=this.get(i);return n.areEqual(r,t.value)&&this.removeByKey(i)?1:0},Object.defineProperty(i.prototype,"keys",{get:function(){throw new Error("Not implemented.");},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"values",{get:function(){throw new Error("Not implemented.");},enumerable:!0,configurable:!0}),i.prototype.addByKeyValue=function(n,t){var i=this;if(i.containsKey(n))throw new Error("Adding key/value when one already exists.");i.set(n,t)},i.prototype.get=function(){throw new Error("Not implemented.");},i.prototype.set=function(){throw new Error("Not implemented.");},i.prototype.containsKey=function(n){var t=this.get(n);return t!==undefined},i.prototype.containsValue=function(t){for(var i=this.getEnumerator(),r=n.areEqual;i.moveNext();)if(r(i.current,t,!0))return i.dispose(),!0;return!1},i.prototype.removeByKey=function(n){return this.set(n,undefined)},i.prototype.removeByValue=function(t){var i=this,r=0,u=n.areEqual;return i.keys.forEach(function(n){u(i.get(n),t,!0)&&(i.removeByKey(n),++r)}),r},i.prototype.importPairs=function(n){var t=this;return t.handleUpdate(function(){var i=!1;return n.forEach(function(n){t.set(n.key,n.value);i=!0}),i})},i.prototype.getEnumerator=function(){var i=this,n,r,u=0;return new t.EnumeratorBase(function(){n=i.keys;r=n.length},function(t){while(u<r){var f=n[u++],e=i.get(f);if(e!==undefined)return t.yieldReturn({key:f,value:e})}return t.yieldBreak()})},i}();t.DictionaryAbstractBase=i})(n.Collections||(n.Collections={}));var t=n.Collections}(System||(System={})),function(n){(function(t){function r(n,t){return Object.prototype.hasOwnProperty.call(n,t)}function u(t){return t===null?"null":t===undefined?"undefined":typeof t.toString===n.Types.Function?t.toString():Object.prototype.toString.call(t)}var i=function(){function n(n,t,i,r){this.key=n;this.value=t;this.prev=i;this.next=r}return n}(),f=function(){function n(n,t){this.first=n;this.last=t}return n.prototype.addLast=function(n){var t=this;t.last!=null?(t.last.next=n,n.prev=t.last,t.last=n):t.first=t.last=n},n.prototype.replace=function(n,t){var i=this;n.prev!=null?(n.prev.next=t,t.prev=n.prev):i.first=t;n.next!=null?(n.next.prev=t,t.next=n.next):i.last=t},n.prototype.remove=function(n){var t=this;n.prev!=null?n.prev.next=n.next:t.first=n.next;n.next!=null?n.next.prev=n.prev:t.last=n.prev},n.prototype.clear=function(){for(var n=this;n.last;)n.remove(n.last)},n.prototype.forEach=function(n){for(var i=this,t=i.first;t;)n(t),t=t.next},n}(),e=function(e){function o(t){typeof t=="undefined"&&(t=n.Functions.Identity);e.call(this);this.compareSelector=t;this._count=0;this._entries=new f;this._buckets={}}return __extends(o,e),o.prototype.setKV=function(t,f,e){var o=this,a=o._buckets,y=o._entries,w=o.compareSelector,b=w(t),v=u(b),s,k,h,c,l,p;if(r(a,v)){for(k=n.areEqual,h=a[v],c=0;c<h.length;c++)if(l=h[c],w(l.key)===b){if(!e)throw new Error("Key already exists.");return p=!k(l.value,f),p&&(f===undefined?(y.remove(l),h.splice(c,1),h.length||delete a[v],--o._count):(s=new i(t,f),y.replace(l,s),h[c]=s),o._onValueUpdate(t,f,l.value)),p}h.push(s=s||new i(t,f))}else{if(f===undefined){if(e)return!1;throw new Error("Cannot add 'undefined' value.");}a[v]=[s=new i(t,f)]}return++o._count,y.addLast(s),o._onValueUpdate(t,f,undefined),!0},o.prototype.addByKeyValue=function(n,t){this.setKV(n,t,!1)},o.prototype.get=function(n){var e=this._buckets,o=this.compareSelector,s=o(n),h=u(s),i,t,c,f;if(!r(e,h))return undefined;for(i=e[h],t=0,c=i.length;t<c;t++)if(f=i[t],o(f.key)===s)return f.value;return undefined},o.prototype.set=function(n,t){return this.setKV(n,t,!0)},o.prototype.containsKey=function(n){var f=this,e=f._buckets,o=f.compareSelector,s=o(n),h=u(s),i,t,c;if(!r(e,h))return!1;for(i=e[h],t=0,c=i.length;t<c;t++)if(o(i[t].key)===s)return!0;return!1},o.prototype.clear=function(){var n=this,t=n._buckets,r=e.prototype.clear.call(this),i;n._count=0;for(i in t)delete t[i];return n._entries.clear(),r},Object.defineProperty(o.prototype,"count",{get:function(){return this._count},enumerable:!0,configurable:!0}),o.prototype.getEnumerator=function(){var i=this,n;return new t.EnumeratorBase(function(){n=i._entries.first},function(t){if(n!=null){var i={key:n.key,value:n.value};return n=n.next,t.yieldReturn(i)}return t.yieldBreak()})},Object.defineProperty(o.prototype,"keys",{get:function(){var t=this,n=[];return t._entries.forEach(function(t){return n.push(t.key)}),n},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"values",{get:function(){var t=this,n=[];return t._entries.forEach(function(t){return n.push(t.value)}),n},enumerable:!0,configurable:!0}),o}(t.DictionaryAbstractBase);t.Dictionary=e})(n.Collections||(n.Collections={}));var t=n.Collections}(System||(System={})),function(n){(function(t){var i=function(t){function i(){t.apply(this,arguments);this._count=0;this._map={}}return __extends(i,t),i.prototype.containsKey=function(n){return n in this._map},i.prototype.containsValue=function(t){var i=this._map,u=n.areEqual;for(var r in i)if(i.hasOwnProperty(r)&&u(i[r],t))return!0;return!1},i.prototype.get=function(n){return this._map[n]},i.prototype.set=function(n,t){var r=this,i=r._map,u=i[n];return u!==t?(t===undefined?n in i&&(delete i[n],--r._count):(n in i||++r._count,i[n]=t),r._onValueUpdate(n,t,u),!0):!1},i.prototype.importMap=function(n){var t=this;return t.handleUpdate(function(){var r=!1;for(var i in n)n.hasOwnProperty(i)&&t.set(i,n[i])&&(r=!0);return r})},i.prototype.toMap=function(n){var r=this,u={},t,i;for(t in r._map)r._map.hasOwnProperty(t)&&(i=r._map[t],n&&(i=n(t,i)),i!==undefined&&(u[t]=i));return u},Object.defineProperty(i.prototype,"keys",{get:function(){var n=this,t=[];for(var i in n._map)n._map.hasOwnProperty(i)&&t.push(i);return t},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"values",{get:function(){var n=this,t=[];for(var i in n._map)n._map.hasOwnProperty(i)&&t.push(n._map[i]);return t},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"count",{get:function(){return this._count},enumerable:!0,configurable:!0}),i}(t.DictionaryAbstractBase);t.StringKeyDictionary=i})(n.Collections||(n.Collections={}));var t=n.Collections}(System||(System={})),function(n){(function(n){var t=function(t){function i(){t.call(this);this._order=[]}return __extends(i,t),i.prototype.indexOfKey=function(n){return this._order.indexOf(n)},i.prototype.getValueByIndex=function(n){return this.get(this._order[n])},i.prototype.set=function(i,r,u){var f=this,e=f.indexOfKey(i)!=-1;return!e&&(r!==undefined||u)?f._order.push(i):e&&r===undefined&&!u&&n.ArrayUtility.remove(f._order,i),t.prototype.set.call(this,i,r)},i.prototype.setByIndex=function(n,t){var i=this,r=i._order;if(n<0||n>=r.length)throw new Error("IndexOutOfRange Exception.");return i.set(r[n],t)},i.prototype.importValues=function(n){var t=this;return t.handleUpdate(function(){for(var r=!1,i=0;i<n.length;i++)t.setByIndex(i,n[i])&&(r=!0);return r})},i.prototype.setValues=function(){for(var t=[],n=0;n<arguments.length-0;n++)t[n]=arguments[n+0];return this.importValues(t)},i.prototype.removeByIndex=function(n){return this.setByIndex(n,undefined)},Object.defineProperty(i.prototype,"keys",{get:function(){var n=this;return n._order.filter(function(t){return n.containsKey(t)})},enumerable:!0,configurable:!0}),i}(n.StringKeyDictionary);n.OrderedStringKeyDictionary=t})(n.Collections||(n.Collections={}));var t=n.Collections}(System||(System={}));
	return System;
});