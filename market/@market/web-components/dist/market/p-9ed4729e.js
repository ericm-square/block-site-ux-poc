import{g as r}from"./p-4d83f578.js";import{i as n}from"./p-ba705441.js";function t(r,n,t){switch(t.length){case 0:return r.call(n);case 1:return r.call(n,t[0]);case 2:return r.call(n,t[0],t[1]);case 3:return r.call(n,t[0],t[1],t[2])}return r.apply(n,t)}var e=800,a=16;var u=Date.now;function i(r){var n=0,t=0;return function(){var i=u(),c=a-(i-t);t=i;if(c>0){if(++n>=e){return arguments[0]}}else{n=0}return r.apply(undefined,arguments)}}function c(r){return function(){return r}}var o=function(){try{var n=r(Object,"defineProperty");n({},"",{});return n}catch(r){}}();const f=o;var s=!f?n:function(r,n){return f(r,"toString",{configurable:true,enumerable:false,value:c(n),writable:true})};const v=s;var l=i(v);const d=l;var h=Math.max;function p(r,n,e){n=h(n===undefined?r.length-1:n,0);return function(){var a=arguments,u=-1,i=h(a.length-n,0),c=Array(i);while(++u<i){c[u]=a[n+u]}u=-1;var o=Array(n+1);while(++u<n){o[u]=a[u]}o[n]=e(c);return t(r,this,o)}}export{f as d,p as o,d as s};
//# sourceMappingURL=p-9ed4729e.js.map