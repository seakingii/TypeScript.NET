define(["require","exports","./SystemException","../Text/Utility","../../extends"],function(e,t,n,r,i){"use strict";var u=i["default"],o="ArgumentException",c=function(e){function t(t,n,i,u){var o,c=t?"{"+t+"} ":"";return o=e.call(this,r.trim(c+(n||"")),i,function(e){e.paramName=t,u&&u(e)})||this}return u(t,e),t.prototype.getName=function(){return o},t}(n.SystemException);t.ArgumentException=c,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=c});
//# sourceMappingURL=ArgumentException.js.map