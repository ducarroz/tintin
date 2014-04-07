function makeLiteralObserver(e){return function(t){return t(e)||Function.noop}}function observeValue(e,t){return e(t.value)||Function.noop}function observeParameters(e,t){return e(t.parameters)||Function.noop}function makeElementObserver(e){return function(t,n){return t(n.document.getElementById(e))||Function.noop}}function makeComponentObserver(e,t){return function(n,r){var i=r.components,a=i.getObjectByLabel||i.getComponentByLabel,s=a.call(i,e);return t.component=s,n(s)||Function.noop}}function observeProperty(e,t,n,r){function i(e,t,r){a(),a=n(e,t,r)||Function.noop}if(null==e)return n();var a=Function.noop;return PropertyChanges.addOwnPropertyChangeListener(e,t,i,r.beforeChange),i(e[t],t,e),once(function(){a(),PropertyChanges.removeOwnPropertyChangeListener(e,t,i,r.beforeChange)})}function makePropertyObserver(e,t){return function(n,r){return t(autoCancelPrevious(function(t){return"string"!=typeof t&&"number"!=typeof t?n():e(autoCancelPrevious(function(e){return null==e?n():e.observeProperty?e.observeProperty(t,n,r):_observeProperty(e,t,n,r)}),r)}),r)}}function observeGet(e,t,n,r){function i(e,r,i){s(t,r)&&(a(),a=n(e,t,i)||Function.noop)}var a=Function.noop,s=e.contentEquals||Object.equals;return i(e.get(t),t,e),e.addMapChangeListener(i,r.beforeChange),once(function(){a(),e.removeMapChangeListener(i)})}function makeGetObserver(e,t){return function(n,r){return e(autoCancelPrevious(function(e){return e?t(autoCancelPrevious(function(t){return null==t?n():e.observeGet?e.observeGet(t,n,r):_observeGet(e,t,n,r)}),r):n()}),r)}}function makeHasObserver(e,t){return function(n,r){return n=makeUniq(n),t(autoCancelPrevious(function(t){return e(autoCancelPrevious(function(e){return e?observeRangeChange(e,function(){return n((e.has||e.contains).call(e,t))},r):n()}),r)}),r)}}function makeObserversObserver(e){return function(t,n){for(var r=Array(e.length),i=0;e.length>i;i++)r[i]=void 0;var a=e.map(function(e,t){return e(function(e){r.set(t,e)},n)}),s=t(r)||Function.noop;return once(function(){s(),cancelEach(a)})}}function makeObjectObserver(e){return function(t,n){var r={},i={};for(var a in e)(function(e,t){r[e]=t(function(t){i[e]=t},n)})(a,e[a]);var s=t(i)||Function.noop;return function(){s();for(var e in r)r[e]()}}}function makeArrayObserver(){return makeObserversObserver(Array.prototype.slice.call(arguments))}function makeOperatorObserverMaker(e){return function(){var t=makeObserversObserver(Array.prototype.slice.call(arguments)),n=makeRangeContentObserver(t);return function(t,r){return n(autoCancelPrevious(function(n){return n.every(Operators.defined)?t(e.apply(void 0,n)):t()}),r)}}}function makeMethodObserverMaker(e){var t=e.slice(0,1).toUpperCase()+e.slice(1),n="make"+t+"Observer",r="observe"+t;return function(){var t=arguments[0],i=Array.prototype.slice.call(arguments,1),a=i.map(function(e){return function(t,n){return e(autoCancelPrevious(t),n)}}),s=makeObserversObserver(i),o=makeRangeContentObserver(s);return function(i,s){return t(autoCancelPrevious(function(t){return t?t[n]?t[n].apply(t,a)(i,s):t[r]?t[r](i,s):o(autoCancelPrevious(function(n){return n.every(Operators.defined)?"function"==typeof t[e]?i(t[e].apply(t,n)):i():i()}),s):i()}),s)}}}function makeNotObserver(e){return function(t,n){return e(autoCancelPrevious(function(e){return t(!e)}),n)}}function makeAndObserver(e,t){return function(n,r){return e(autoCancelPrevious(function(e){return e?t(n,r):n(e)}),r)}}function makeOrObserver(e,t){return function(n,r){return e(autoCancelPrevious(function(e){return e?n(e):t(n,r)}),r)}}function makeConditionalObserver(e,t,n){return function(r,i){return e(autoCancelPrevious(function(e){return null==e?r():e?t(r,i):n(r,i)}),i)}}function makeDefinedObserver(e){return function(t,n){return e(autoCancelPrevious(function(e){return t(null!=e)}),n)}}function makeDefaultObserver(e,t){return function(n,r){return e(autoCancelPrevious(function(e){return null==e?t(n,r):n(e)}),r)}}function makeReplacingMapBlockObserver(e,t){return function(n,r){return e(autoCancelPrevious(function(e){function i(t){for(;e.length>t;t++)o[t].index=t}function a(e,n,a){o.swap(a,n.length,e.map(function(e,t){return{index:a+t}})),i(a+e.length);var c,u=[];cancelEach(l.swap(a,n.length,e.map(function(e,n){var i=o[a+n];return t(autoCancelPrevious(function(e){c?s.set(i.index,e):u[n]=e}),r.nest(e))}))),c=!0,s.swap(a,n.length,u)}if(!e)return n();var s=[],o=[],l=[],c=observeRangeChange(e,a,r),u=n(s,e)||Function.noop;return once(function(){u(),cancelEach(l),c()})}),r)}}function makeReplacingFilterBlockObserver(e,t){var n=makeReplacingMapBlockObserver(e,t);return function(e,t){return n(autoCancelPrevious(function(n,r){function i(e){for(;n.length>e;e++)l[e+1]=l[e]+!!n[e]}function a(e,t,n){var a=r.slice(n,n+e.length),o=t.map(Boolean).sum(),c=a.filter(function(t,n){return e[n]}),u=l[n],h=s.slice(u,u+o);(h.length!==c.length||h.some(function(e,t){return e!==c[t]}))&&s.swap(u,o,c),i(u)}if(!r)return e();var s=[],o=[],l=[0],c=observeRangeChange(n,a,t),u=e(s)||Function.noop;return once(function(){u(),cancelEach(o),c()})}),t)}}function makeSortedBlockObserver(e,t){var n=makeRelationEntryObserver(t),r=makeReplacingMapBlockObserver(e,n),i=function(e,t){return r(autoCancelPrevious(function(n){function r(e,t){a.addEach(e),a.deleteEach(t)}if(!n)return e();var i=[],a=SortedArray(i,entryValueEquals,entryValueCompare),s=observeRangeChange(n,r,t),o=e(i)||Function.noop;return function(){o(),s()}}),t)};return makeMapBlockObserver(i,observeEntryKey)}function entryValueEquals(e,t){return Object.equals(e[1],t[1])}function entryValueCompare(e,t){return Object.compare(e[1],t[1])}function makeRelationEntryObserver(e){return function(t,n){return e(autoCancelPrevious(function(e){return t([n.value,e])||Function.noop}),n)}}function makeSortedSetBlockObserver(e,t){var n=makeRelationEntryObserver(t),r=makeReplacingMapBlockObserver(e,n),i=makeGroupBlockObserver(r,observeEntryValue),a=makeReplacingMapBlockObserver(i,makeLastObserver(observeEntryValue));return function(e,t){function n(e,t){return e=o.get(e),t=o.get(t),Object.compare(e,t)}function r(e,t){return e=o.get(e),t=o.get(t),Object.equals(e,t)}function i(e,t){t.forEach(function(e){l["delete"](e[0]),o["delete"](e[0])}),e.forEach(function(e){o.set(e[0],e[1]),l.add(e[0])})}function s(e){return l.clear(),observeRangeChange(e,i,t)}var o=new Map,l=new SortedSet(null,r,n),c=e(l)||Function.noop,u=a(s,t);return function(){c(),u()}}}function makeReplacingReversedObserver(e){return function(t,n){return e(autoCancelPrevious(function(e){function r(e,t,n){var r=i.length-n-t.length;i.swap(r,t.length,e.reversed())}if(!e)return t();var i=[],a=observeRangeChange(e,r,n),s=t(i);return once(function(){s(),a()})}),n)}}function makeReplacingFlattenObserver(e){return function(t,n){return e(autoCancelPrevious(function(e){function r(t){for(var n=t;e.length>n;n++)l[n].index=n,o[n+1]=e[n]?o[n]+e[n].length:o[n]}function i(e,t,i){var c=o[i],u=o[i+t.length],h=u-c;a.swap(c,h,[]),l.swap(i,t.length,e.map(function(){return{index:null}})),r(i),cancelEach(s.swap(i,t.length,e.map(function(e,t){function s(e,t,n){r(c.index);var i=o[c.index]+n,s=o[c.index]+n+t.length,l=s-i;a.swap(i,l,e)}var c=l[i+t];return observeRangeChange(e,s,n)})))}if(!e)return t();var a=[],s=[],o=[0],l=[],c=observeRangeChange(e,i,n),u=t(a)||Function.noop;return once(function(){u(),cancelEach(s),c()})}),n)}}function makeConcatObserver(){return makeFlattenObserver(makeObserversObserver(Array.prototype.slice.call(arguments)))}function makeSomeBlockObserver(e,t){var n=makeFilterBlockObserver(e,t),r=makePropertyObserver(n,observeLengthLiteral);return makeConverterObserver(r,Boolean)}function makeEveryBlockObserver(e,t){var n=makeConverterObserver(t,Operators.not),r=makeFilterBlockObserver(e,n),i=makePropertyObserver(r,observeLengthLiteral);return makeConverterObserver(i,Operators.not)}function makeGroupBlockObserver(e,t){var n=makeGroupMapBlockObserver(e,t);return makeEntriesObserver(n)}function makeGroupMapBlockObserver(e,t){var n=makeRelationEntryObserver(t),r=makeReplacingMapBlockObserver(e,n);return function(e,t){return r(autoCancelPrevious(function(n,r){function i(e,t){t.forEach(function(e){var t=a.get(e[1]);1===t.length?a["delete"](e[1]):t["delete"](e[0])}),e.forEach(function(e){var t,n=!a.has(e[1]);t=n?r.constructClone():a.get(e[1]),t.add(e[0]),n&&a.set(e[1],t)})}if(!n)return e();var a=Map(),s=observeRangeChange(n,i,t),o=e(a)||Function.noop;return function(){s(),o()}}),t)}}function makeHeapBlockObserver(e,t,n){function r(e,t){return Object.compare(e[1],t[1])*n}var i=makeRelationEntryObserver(t),a=makeReplacingMapBlockObserver(e,i);return function(e,t){return a(autoCancelPrevious(function(n){function i(e,t){s.addEach(e),s.deleteEach(t)}function a(t,n){return 0===n?t?e(t[0]):e():void 0}if(!n)return e();var s=new Heap(null,entryValueEquals,r),o=observeRangeChange(n,i,t),l=observeMapChange(s,a,t);return function(){o(),l()}}),t)}}function makeMaxBlockObserver(e,t){return makeHeapBlockObserver(e,t,1)}function makeMinBlockObserver(e,t){return makeHeapBlockObserver(e,t,-1)}function makeMaxObserver(e){return makeHeapBlockObserver(e,observeValue,1)}function makeMinObserver(e){return makeHeapBlockObserver(e,observeValue,-1)}function makeCollectionObserverMaker(e){return function(t){return function(n,r){return n=makeUniq(n),t(autoCancelPrevious(function(t){if(!t)return n();var i=e(t,n);return observeRangeChange(t,function(e,t,r){return n(i(e,t,r))},r)}),r)}}}function isNumber(e){return"number"==typeof e&&!isNaN(e)}function makeReplacingViewObserver(e,t,n){return n||(n=t,t=observeZero),function(r,i){return e(autoCancelPrevious(function(e){function a(t,n,r){if(h){var i=t.length-n.length;o>=r?i>0?(u.swap(0,0,e.slice(o,o+i)),u.splice(s,u.length-s)):(u.splice(0,-i),u.swap(u.length,0,e.slice(o+u.length,o+s))):o+s>r&&(u.swap(r-o,n.length,t),i>0?u.splice(s,u.length-s):u.swap(u.length,0,e.slice(o+u.length,o+s)))}}if(!e)return r();var s,o,l,c,u=[],h=!1,p=observeRangeChange(e,a,i),d=n(function(t){t=+t,isNaN(t)&&(t=void 0);var n="number"==typeof t&&"number"==typeof o,r=Math.max(0,t);"number"==typeof c&&(r=Math.min(r,e.length-c)),h!==n?(n?u.swap(0,0,e.slice(c,c+r)):u.clear(),h=n):h&&l!==r&&(l>r?u.splice(t,l-r):u.swap(l,0,e.slice(c+l,c+r))),s=t,l=r},i),g=t(function(t){t=+t,isNaN(t)&&(t=void 0);var n="number"==typeof s&&"number"==typeof t,r=Math.max(0,t);"number"==typeof s&&(r=Math.min(r,e.length));var i=Math.max(0,s);if("number"==typeof r&&(i=Math.min(i,e.length-r)),h!==n)n?u.swap(0,u.length,e.slice(r,r+i)):u.clear(),h=n;else if(h&&c!==r){var a=Math.abs(r-c);l>a&&c>r?(u.swap(0,0,e.slice(r,c)),u.splice(i,u.length-i)):l>a&&r>c?(u.swap(u.length,0,e.slice(c+l,r+i)),u.splice(0,u.length-i)):u.swap(0,u.length,e.slice(r,r+i))}o=t,c=r,l=i},i),f=r(u)||Function.noop;return function(){f(),d(),g(),p()}}),i)}}function makeReplacingEnumerateObserver(e){return function(t,n){return e(autoCancelPrevious(function(e){function r(e){for(;a.length>e;e++)a[e].set(0,e)}function i(e,t,n){a.swap(n,t.length,e.map(function(e,t){return[n+t,e]})),r(n+e.length)}if(!e)return t();var a=[],s=observeRangeChange(e,i,n),o=t(a)||Function.noop;return function(){o(),s()}}),n)}}function makeRangeObserver(e){return function(t,n){var r=[],i=t(r)||Function.noop,a=e(function(e){if(e>>>=0,null==e)r.clear();else if(e>r.length){for(var t=[],n=r.length;e>n;n++)t.push(n);r.swap(r.length,0,t)}else r.length>e&&r.splice(e,r.length)},n);return function(){i(),a()}}}function makeStartsWithObserver(e,t){return function(n,r){return t(function(t){var i=RegExp("^"+RegExp.escape(t));return e(function(e){return n(i.test(e))||Function.noop},r)},r)}}function makeEndsWithObserver(e,t){return function(n,r){return t(function(t){var i=RegExp(RegExp.escape(t)+"$");return e(function(e){return n(i.test(e))||Function.noop},r)},r)}}function makeContainsObserver(e,t){return function(n,r){return t(function(t){var i=RegExp(RegExp.escape(t));return e(function(e){return n(i.test(e))||Function.noop},r)},r)}}function makeJoinObserver(e,t){return t=t||observeNullString,function(n,r){return e(autoCancelPrevious(function(e){return e?t(autoCancelPrevious(function(t){function i(){a=n(e.join(t))||Function.noop}if("string"!=typeof t)return n()||Function.noop;var a=Function.noop,s=observeRangeChange(e,i,r);return function(){s(),a()}}),r):n()||Function.noop}),r)}}function observeRangeChange(e,t,n){function r(e,n,r){i(),i=t(e,n,r)||Function.noop}if(!e)return Function.noop;var i=Function.noop;if(!e.toArray)return Function.noop;if(!e.addRangeChangeListener)return Function.noop;r(e.toArray(),[],0);var a=e.addRangeChangeListener(r,null,n.beforeChange);return function(){i(),a()}}function makeLastObserver(e){return function(t,n){return e(autoCancelPrevious(function(e){return _observeLast(e,t,n)}),n)}}function observeLast(e,t,n){function r(n,r,o){if(i+=n.length-r.length,!(i>o+r.length&&i>o+n.length)){var l=0>i?null:e.get(i);a(),a=t(l)||Function.noop,s=l}}var i=-1,a=Function.noop,s=null,o=observeRangeChange(e,r,n);return function(){a(),o()}}function makeOnlyObserver(e){return function(t,n){return e(autoCancelPrevious(makeUniq(function(e){return observeOnly(e,t,n)})),n)}}function observeOnly(e,t,n){function r(n,r){return i+=n.length-r.length,1===i?t(e.only()):t()}var i=0;return observeRangeChange(e,r,n)}function makeOneObserver(e){return function(t,n){return e(autoCancelPrevious(makeUniq(function(e){return observeOne(e,t,n)})),n)}}function observeOne(e,t,n){function r(n,r){return i+=n.length-r.length,i>0?t(e.one()):t()}var i=0;return observeRangeChange(e,r,n)}function makeRangeContentObserver(e){return function(t,n){return e(autoCancelPrevious(function(e){return e&&e.addRangeChangeListener?observeRangeChange(e,function(){return t(e)},n):t(e)}),n)}}function makeMapContentObserver(e){return function(t,n){return e(autoCancelPrevious(function(e){return e&&e.addMapChangeListener?observeMapChange(e,function(){return t(e)},n):t(e)}),n)}}function observeMapChange(e,t,n){function r(e,n,r){var a=i.get(n)||Function.noop;i["delete"](n),a(),a=t(e,n,r)||Function.noop,void 0===e?a():i.set(n,a)}if(e.addMapChangeListener){var i=new Map;e.forEach(r);var a=e.addMapChangeListener(r,n.beforeChange);return once(function(){i.forEach(function(e){e()}),a()})}}function makeReplacingEntriesObserver(e){return function(t,n){return e(autoCancelPrevious(function(e){return e?observeEntries(e,t,n):t()}),n)}}function observeEntries(e,t,n){function r(e,t){var n,r;a.has(t)?null==e?(n=a.get(t),a["delete"](t),r=i.indexOf(n),i.splice(r,1)):(n=a.get(t),n.set(1,e)):(n=[t,e],a.set(t,n),i.push(n))}var i=[],a=Map(),s=t(i)||Function.noop,o=observeMapChange(e,r,n)||Function.noop;return once(function(){s(),o()})}function makeKeysObserver(e){var t=makeEntriesObserver(e);return makeMapBlockObserver(t,observeEntryKey)}function observeEntryKey(e,t){return t.value?e(t.value[0])||Function.noop:e()}function makeValuesObserver(e){var t=makeEntriesObserver(e);return makeMapBlockObserver(t,observeEntryValue)}function observeEntryValue(e,t){return t.value?e(t.value[1])||Function.noop:e()}function makeToMapObserver(e){return function(t,n){var r=new Map,i=t(r)||Function.noop,a=e(autoCancelPrevious(function(e){function t(e,t){void 0===e?r["delete"](t):r.set(t,e)}if(r.clear(),e&&"object"==typeof e){if(e.addRangeChangeListener)return observeUniqueEntries(autoCancelPrevious(function(e){function t(e,t){t.forEach(function(e){r["delete"](e[0])}),e.forEach(function(e){r.set(e[0],e[1])})}return observeRangeChange(e,t,n)}),n.nest(e));if(e.addMapChangeListener)return observeMapChange(e,t,n);var i=Object.keys(e).map(function(t){return _observeProperty(e,t,autoCancelPrevious(function(e){void 0===e?r["delete"](t):r.set(t,e)}),n)});return function(){cancelEach(i)}}}),n);return function(){i(),a()}}}function makeParentObserver(e){return function(t,n){return e(t,n.parent||n.nest())}}function makeConverterObserver(e,t,n){return function(r,i){return r=makeUniq(r),e(autoCancelPrevious(function(e){return r(t.call(n,e))}),i)}}function makeComputerObserver(e,t,n){return function(r,i){return r=makeUniq(r),e(autoCancelPrevious(function(e){return e&&e.every(Operators.defined)?r(t.apply(n,e)):void 0}),i)}}function makeExpressionObserver(e,t){var n=require("./parse"),r=require("./compile-observer");return function(i,a){return i=makeUniq(i),t(autoCancelPrevious(function(t){if(null==t)return i();var s,o;try{s=n(t),o=r(s)}catch(l){return i()}return e(autoCancelPrevious(function(e){return o(i,a.nest(e))}),a)}),a)}}function makeWithObserver(e,t){return function(n,r){return e(autoCancelPrevious(function(e){return t(autoCancelPrevious(function(e){return n(e)}),r.nest(e))}),r)}}function makeNonReplacing(e){return function(){var t=e.apply(this,arguments);return function(e,n){var r=[],i=t(autoCancelPrevious(function(e){function t(e,t,n){r.swap(n,t.length,e)}if(e){merge(r,e);var i=e.addRangeChangeListener(t,null,n.beforeChange);return once(i)}r.clear()}),n),a=e(r)||Function.noop;return once(function(){i(),a()})}}}function makeUniq(e){var t;return function(n){if(n!==t){var r=e.apply(this,arguments);return t=n,r}}}function cancelEach(e){e.forEach(function(e){e&&e()})}function autoCancelPrevious(e){var t=Function.noop;return function(){return t(),t=e.apply(this,arguments)||Function.noop,function(){t()}}}function once(e){var t;return function(){return t?Function.noop:(t=!0,e.apply(this,arguments))}}require("collections/shim");var PropertyChanges=require("collections/listen/property-changes");require("collections/listen/array-changes");var SortedArray=require("collections/sorted-array"),SortedSet=require("collections/sorted-set"),Map=require("collections/map"),Set=require("collections/set"),Heap=require("collections/heap"),Scope=require("./scope"),Operators=require("./operators");exports.makeLiteralObserver=makeLiteralObserver,exports.observeValue=observeValue,exports.observeParameters=observeParameters,exports.makeElementObserver=makeElementObserver,exports.makeComponentObserver=makeComponentObserver,exports.observeProperty=observeProperty;var _observeProperty=observeProperty;exports.makePropertyObserver=makePropertyObserver,exports.observeKey=observeGet,exports.observeGet=observeGet;var _observeGet=observeGet;exports.makeGetObserver=makeGetObserver,exports.makeHasObserver=makeHasObserver,exports.makeObserversObserver=makeObserversObserver,exports.makeRecordObserver=makeObjectObserver,exports.makeObjectObserver=makeObjectObserver,exports.makeTupleObserver=makeArrayObserver,exports.makeArrayObserver=makeArrayObserver,exports.makeOperatorObserverMaker=makeOperatorObserverMaker,exports.makeMethodObserverMaker=makeMethodObserverMaker,exports.makeNotObserver=makeNotObserver,exports.makeAndObserver=makeAndObserver,exports.makeOrObserver=makeOrObserver,exports.makeConditionalObserver=makeConditionalObserver,exports.makeDefinedObserver=makeDefinedObserver,exports.makeDefaultObserver=makeDefaultObserver;var makeMapBlockObserver=exports.makeMapBlockObserver=makeNonReplacing(makeReplacingMapBlockObserver),makeFilterBlockObserver=exports.makeFilterBlockObserver=makeNonReplacing(makeReplacingFilterBlockObserver);exports.makeSortedBlockObserver=makeSortedBlockObserver,exports.makeSortedSetBlockObserver=makeSortedSetBlockObserver,exports.makeReversedObserver=makeNonReplacing(makeReplacingReversedObserver);var makeFlattenObserver=exports.makeFlattenObserver=makeNonReplacing(makeReplacingFlattenObserver);exports.makeConcatObserver=makeConcatObserver,exports.makeSomeBlockObserver=makeSomeBlockObserver,exports.makeEveryBlockObserver=makeEveryBlockObserver,exports.makeGroupBlockObserver=makeGroupBlockObserver,exports.makeGroupMapBlockObserver=makeGroupMapBlockObserver,exports.makeMaxBlockObserver=makeMaxBlockObserver,exports.makeMinBlockObserver=makeMinBlockObserver,exports.makeMaxObserver=makeMaxObserver,exports.makeMinObserver=makeMinObserver;var observeLengthLiteral=makeLiteralObserver("length");exports.makeSumObserver=makeCollectionObserverMaker(function(){var e=0;return function(t,n){return t=t.filter(isNumber),n=n.filter(isNumber),e+=t.sum()-n.sum()}}),exports.makeAverageObserver=makeCollectionObserverMaker(function(){var e=0,t=0;return function(n,r){return n=n.filter(isNumber),r=r.filter(isNumber),e+=n.sum()-r.sum(),t+=n.length-r.length,e/t}}),exports.makeViewObserver=makeNonReplacing(makeReplacingViewObserver);var observeZero=makeLiteralObserver(0);exports.makeEnumerateObserver=makeNonReplacing(makeReplacingEnumerateObserver),exports.makeEnumerationObserver=exports.makeEnumerateObserver,exports.makeRangeObserver=makeRangeObserver,exports.makeStartsWithObserver=makeStartsWithObserver,exports.makeEndsWithObserver=makeEndsWithObserver,exports.makeContainsObserver=makeContainsObserver,exports.makeJoinObserver=makeJoinObserver;var observeNullString=makeLiteralObserver("");exports.observeRangeChange=observeRangeChange,exports.makeLastObserver=makeLastObserver,exports.observeLast=observeLast;var _observeLast=observeLast;exports.makeOnlyObserver=makeOnlyObserver,exports.observeOnly=observeOnly,exports.makeOneObserver=makeOneObserver,exports.observeOne=observeOne,exports.makeRangeContentObserver=makeRangeContentObserver,exports.makeMapContentObserver=makeMapContentObserver,exports.observeMapChange=observeMapChange;var makeEntriesObserver=exports.makeEntriesObserver=makeNonReplacing(makeReplacingEntriesObserver);exports.observeEntries=observeEntries,exports.makeKeysObserver=makeKeysObserver,exports.observeEntryKey=observeEntryKey,exports.makeValuesObserver=makeValuesObserver,exports.observeEntryValue=observeEntryValue,exports.makeToMapObserver=makeToMapObserver;var observeUniqueEntries=makeMapBlockObserver(makeGroupBlockObserver(observeValue,observeEntryKey),makeLastObserver(observeEntryValue));exports.makeParentObserver=makeParentObserver,exports.makeConverterObserver=makeConverterObserver,exports.makeComputerObserver=makeComputerObserver,exports.makePathObserver=makeExpressionObserver,exports.makeExpressionObserver=makeExpressionObserver,exports.makeWithObserver=makeWithObserver,exports.makeToArrayObserver=makeNonReplacing(Function.identity),exports.makeAsArrayObserver=exports.makeToArrayObserver;var merge=require("./merge").merge;exports.makeUniq=makeUniq,exports.cancelEach=cancelEach,exports.autoCancelPrevious=autoCancelPrevious,exports.once=once;