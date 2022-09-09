"use strict";(self["webpackChunkboxes"]=self["webpackChunkboxes"]||[]).push([[78],{487:function(t,e,o){o.d(e,{a:function(){return a},c:function(){return h},g:function(){return l},s:function(){return f}});var n=o(587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const r="ION-CONTENT",s="ion-content",c=".ion-content-scroll-host",i=`${s}, ${c}`,u=t=>t&&t.tagName===r,l=async t=>u(t)?(await new Promise((e=>(0,n.c)(t,e))),t.getScrollElement()):t,a=t=>t.closest(i),f=(t,e)=>{if(u(t)){const o=t;return o.scrollToTop(e)}return Promise.resolve(t.scrollTo({top:0,left:0,behavior:e>0?"smooth":"auto"}))},h=(t,e,o,n)=>{if(u(t)){const r=t;return r.scrollByPoint(e,o,n)}return Promise.resolve(t.scrollBy({top:o,left:e,behavior:n>0?"smooth":"auto"}))}},78:function(t,e,o){o.r(e),o.d(e,{startStatusTap:function(){return c}});var n=o(65),r=o(487),s=o(587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const c=()=>{const t=window;t.addEventListener("statusTap",(()=>{(0,n.wj)((()=>{const e=t.innerWidth,o=t.innerHeight,c=document.elementFromPoint(e/2,o/2);if(!c)return;const i=(0,r.a)(c);i&&new Promise((t=>(0,s.c)(i,t))).then((()=>{(0,n.Iu)((async()=>{i.style.setProperty("--overflow","hidden"),await(0,r.s)(i,300),i.style.removeProperty("--overflow")}))}))}))}))}}}]);
//# sourceMappingURL=78.8cede7f3.js.map