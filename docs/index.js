!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Inspector=t():e.Inspector=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n=/^[_a-zA-Z\- ]*$/,r={root:"body",outlineStyle:"5px solid rgba(204, 146, 62, 0.3)",onClick:e=>console.log("Element was clicked:",(e=>{if(!(e instanceof Element))return;let t=[];for(;e.nodeType===Node.ELEMENT_NODE;){let r=e.nodeName.toLowerCase();if(e.id){r+=`#${e.id}`,t.unshift(r);break}if(e.className&&n.test(e.className))r+=`.${e.className.trim().replace(/\s+/g,".")}`;else{let t=e,n=1;for(;t=t.previousElementSibling;)t.nodeName.toLowerCase()==r&&n++;1!=n&&(r+=":nth-of-type("+n+")")}t.unshift(r),e=e.parentNode}return t.join(" > ")})(e))};e.exports=(e={})=>{const{root:t,excluded:n,included:o,outlineStyle:l,highlightClass:i}={...r,...e};let s,a,u,c=e.onClick||r.onClick;const f=e=>{e&&(e.style.outline="none",e.classList.remove(i))},d=e=>{if(a&&a.length&&a.some(t=>t===e.target||t.contains(e.target)))return!0},m=e=>u&&u.length&&u.some(t=>t===e.target),p=e=>{d(e)||m(e)&&(e=>{e.classList.add(i),e.style.outline=l,e.style.outlineOffset=`-${e.style.outlineWidth}`})(s=e.target)},y=e=>{d(e)||m(e)&&f(e.target)},g=e=>{if(!d(e)&&m(e))return e.preventDefault(),e.stopPropagation(),c(e.target),!1};return{enable:e=>{const r=document.querySelector(t);r&&(n&&(a=(e=>{if(!n.length)return[];const t=n.flatMap(t=>"string"==typeof t||t instanceof String?Array.from(e.querySelectorAll(t)):t instanceof Element?[t]:t.length>0&&t[0]instanceof Element?Array.from(t):void 0);return Array.from(t).flat()})(r)),o&&(u=(e=>{if(!o.length)return[];const t=o.flatMap(t=>"string"==typeof t||t instanceof String?Array.from(e.querySelectorAll(t)):t instanceof Element?[t]:t.length>0&&t[0]instanceof Element?Array.from(t):void 0);return Array.from(t).flat()})(r)),r.addEventListener("mouseover",p,!0),r.addEventListener("mouseout",y,!0),r.addEventListener("click",g,!0),e&&(c=e))},cancel:()=>{const e=document.querySelector(t);e&&(e.removeEventListener("mouseover",p,!0),e.removeEventListener("mouseout",y,!0),e.removeEventListener("click",g,!0),f(s))}}}}])});