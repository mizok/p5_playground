!function(n){function e(e){for(var o,u,c=e[0],f=e[1],s=e[2],a=0,d=[];a<c.length;a++)u=c[a],Object.prototype.hasOwnProperty.call(r,u)&&r[u]&&d.push(r[u][0]),r[u]=0;for(o in f)Object.prototype.hasOwnProperty.call(f,o)&&(n[o]=f[o]);for(l&&l(e);d.length;)d.shift()();return i.push.apply(i,s||[]),t()}function t(){for(var n,e=0;e<i.length;e++){for(var t=i[e],o=!0,c=1;c<t.length;c++){var f=t[c];0!==r[f]&&(o=!1)}o&&(i.splice(e--,1),n=u(u.s=t[0]))}return n}var o={},r={0:0},i=[];function u(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.m=n,u.c=o,u.d=function(n,e,t){u.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},u.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},u.t=function(n,e){if(1&e&&(n=u(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)u.d(t,o,function(e){return n[e]}.bind(null,o));return t},u.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return u.d(e,"a",e),e},u.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},u.p="";var c=window.webpackJsonp=window.webpackJsonp||[],f=c.push.bind(c);c.push=e,c=c.slice();for(var s=0;s<c.length;s++)e(c[s]);var l=f;i.push([40,1]),t()}({40:function(n,e,t){t(41),n.exports=t(74)},41:function(n,e,t){"use strict";t.r(e);t(42);var o=t(9),r=t(39),i=t.n(r);Object(o.c)(),Object(o.b)((function(){var n;n=new i.a((function(n){n.setup=function(){n.createCanvas(n.windowWidth,n.windowHeight)},n.draw=function(){n.background(0,0,0,.75),n.stroke(255,255,255),n.line(0,0,n.mouseX,n.mouseY),n.ellipse(n.mouseX,n.mouseY,200,200),n.fill(.1*n.mouseX,.2*n.mouseY,.5*n.mouseY)},window.addEventListener("resize",Object(o.a)((function(){n.resizeCanvas(n.windowWidth,n.windowHeight)}),200))})),window.p5Instance=n}))},74:function(n,e,t){},9:function(n,e,t){"use strict";(function(n){t.d(e,"c",(function(){return o})),t.d(e,"b",(function(){return r})),t.d(e,"a",(function(){return i}));t(61),t(68),t(69),t(72);function o(){if(void 0===window.console){var n=function(){};window.console={log:n,debug:n,info:n,warn:n}}if(void 0===console.log||"undefined"===console.log){console.log=function(){}}if(void 0===console.debug||"undefined"===console.debug){console.debug=function(){}}if(void 0===console.info||"undefined"===console.info){console.info=function(){}}if(void 0===console.warn||"undefined"===console.warn){console.warn=function(){}}}function r(n){var e,t,o,i,u;for(e=document.getElementsByTagName("*"),t=0;t<e.length;t++)if(i=(o=e[t]).getAttribute("include-html"))return(u=new XMLHttpRequest).onreadystatechange=function(){4===this.readyState&&(200===this.status&&(o.innerHTML=this.responseText),404===this.status&&(o.innerHTML="Page not found."),o.removeAttribute("include-html"),r(n))},u.open("GET",i,!0),void u.send();n&&n()}function i(n,e,t){var o;return function(){var r=this,i=arguments,u=function(){o=null,t||n.apply(r,i)},c=t&&!o;clearTimeout(o),o=setTimeout(u,e),c&&n.apply(r,i)}}}).call(this,t(60))}});