/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
define(["require","exports"],function(e,r){"use strict";function n(e,r){function n(e){return function(r){return t([e,r])}}function t(n){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,a&&(l=a[2&n[0]?"return":n[0]?"throw":"next"])&&!(l=l.call(a,n[1])).done)return l;switch(a=0,l&&(n=[0,l.value]),n[0]){case 0:case 1:l=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,a=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(l=u.trys,!(l=l.length>0&&l[l.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!l||n[1]>l[0]&&n[1]<l[3])){u.label=n[1];break}if(6===n[0]&&u.label<l[1]){u.label=l[1],l=n;break}if(l&&u.label<l[2]){u.label=l[2],u.ops.push(n);break}l[2]&&u.ops.pop(),u.trys.pop();continue}n=r.call(e,u)}catch(t){n=[6,t],a=0}finally{o=l=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,a,l,u={label:0,sent:function(){if(1&l[0])throw l[1];return l[1]},trys:[],ops:[]};return{next:n(0),"throw":n(1),"return":n(2)}}r.generator=n});
//# sourceMappingURL=generator.js.map