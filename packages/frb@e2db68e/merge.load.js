montageDefine("e2db68e","merge",{dependencies:["collections/shim"],factory:function(e,t){"use strict";function n(e,t){for(var n,r=(t.length+1)*(e.length+1),i=Array(r),a=Array(t.length+1),s=Array(t.length+1),o=0;e.length+1>o;o++){for(var l=0;t.length+1>l;l++){var c,u;if(0===o&&0===l)c=" ",u=0;else if(0===o)c="insert",u=l;else if(0===l)c="delete",u=o;else if(e[o-1]===t[l-1])c="retain",u=s[l-1];else{var h=a[l-1],d=s[l];h>d?(c="delete",u=d+1):(c="insert",u=h+1)}i[o+l*(e.length+1)]=c,a[l]=u}n=a,a=s,s=n}return{edges:i,cost:s[t.length],source:t,target:e}}function r(e){for(var t,n,r=[],i=e.edges,a=t=e.target.length,s=e.source.length;t||s;){var o=i[t+s*(a+1)];if("delete"===o){if(n&&"delete"===n[0])n[1]++;else{var l=["delete",1];n=l,r.push(l)}t--}else if("insert"===o){if(n&&"insert"===n[0])n[1]++;else{var l=["insert",1];n=l,r.push(l)}s--}else if("retain"===o){var l=["retain",1];n&&"retain"===n[0]?n[1]++:(n=l,r.push(l)),t--,s--}}return r.reverse(),r}function i(e,t){return r(n(e,t))}function a(e,t){for(var n=i(e,t),r=[],a=0,s=0,o=0;n.length>o;){var l=n[o++];if("insert"===l[0])r.push([s,0,t.slice(s,s+l[1])]),s+=l[1];else if("delete"===l[0])if(n.length>o&&"insert"===n[o][0]){var c=n[o++];r.push([s,l[1],t.slice(s,s+c[1])]),a+=l[1],s+=c[1]}else r.push([s,l[1]]),a+=l[1];else"retain"==l[0]&&(a+=l[1],s+=l[1])}return r}function s(e,t){for(var n=0;t.length>n;n++)e.swap.apply(e,t[n])}function o(e,t){s(e,a(e,t))}e("collections/shim"),t.graphOt=n,t.traceOt=r,t.ot=i,t.diff=a,t.apply=s,t.merge=o}});