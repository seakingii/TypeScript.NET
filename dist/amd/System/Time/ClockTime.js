define(["require","exports","./TimeQuantity","../../extends"],function(e,n,t,i){"use strict";function o(e,n){return 1!==Math.abs(e)&&(n+="s"),n}var r=i["default"],u=function(e){function n(){for(var t=[],i=0;i<arguments.length;i++)t[i-0]=arguments[i];var o=e.call(this,t.length>1?n.millisecondsFromTime(t[0]||0,t[1]||0,t.length>2&&t[2]||0,t.length>3&&t[3]||0):t.length>0&&t[0]||0)||this,r=Math.abs(o.getTotalMilliseconds()),u=Math.floor(r);return o.tick=1e4*(r-u),o.days=u/864e5|0,u-=864e5*o.days,o.hour=u/36e5|0,u-=36e5*o.hour,o.minute=u/6e4|0,u-=6e4*o.minute,o.second=u/1e3|0,u-=1e3*o.second,o.millisecond=u,Object.freeze(o),o}return r(n,e),n.from=function(e,t,i,o){return void 0===i&&(i=0),void 0===o&&(o=0),new n(e,t,i,o)},n.millisecondsFromTime=function(e,n,t,i){void 0===t&&(t=0),void 0===i&&(i=0);var o=e;return o*=60,o+=n,o*=60,o+=t,o*=1e3,o+=i},n.prototype.toString=function(){var e=this,n=[];return e.days&&n.push(o(e.days,"day")),e.hour&&n.push(o(e.hour,"hour")),e.minute&&n.push(o(e.minute,"minute")),e.second&&n.push(o(e.second,"second")),n.length>1&&n.splice(n.length-1,0,"and"),n.join(", ").replace(", and, "," and ")},n}(t.TimeQuantity);n.ClockTime=u,Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=u});
//# sourceMappingURL=ClockTime.js.map