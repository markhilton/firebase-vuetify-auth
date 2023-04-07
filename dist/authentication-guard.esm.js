(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".large-font>input[data-v-fc91d5d7]{font-size:1.5rem}.centered-input>input[data-v-fc91d5d7]{text-align:center;font-weight:700;font-size:1.5rem}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
function os(t,e){const n=Object.create(null),r=t.split(",");for(let i=0;i<r.length;i++)n[r[i]]=!0;return e?i=>!!n[i.toLowerCase()]:i=>!!n[i]}const as={},_n=()=>{},cs=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},us=Object.prototype.hasOwnProperty,Dt=(t,e)=>us.call(t,e),P=Array.isArray,Ve=t=>Mt(t)==="[object Map]",ls=t=>Mt(t)==="[object Set]",Ce=t=>typeof t=="function",ds=t=>typeof t=="string",vn=t=>typeof t=="symbol",Me=t=>t!==null&&typeof t=="object",hs=t=>Me(t)&&Ce(t.then)&&Ce(t.catch),fs=Object.prototype.toString,Mt=t=>fs.call(t),ps=t=>Mt(t).slice(8,-1),gs=t=>Mt(t)==="[object Object]",In=t=>ds(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Ke=(t,e)=>!Object.is(t,e),ms=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})};let A;class _s{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=A,!e&&A&&(this.index=(A.scopes||(A.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=A;try{return A=this,e()}finally{A=n}}}on(){A=this}off(){A=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0,this._active=!1}}}function vs(t){return new _s(t)}function Is(t,e=A){e&&e.active&&e.effects.push(t)}function Cr(){return A}function ys(t){A&&A.cleanups.push(t)}const yn=t=>{const e=new Set(t);return e.w=0,e.n=0,e},Nr=t=>(t.w&ue)>0,Dr=t=>(t.n&ue)>0,bs=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=ue},ws=t=>{const{deps:e}=t;if(e.length){let n=0;for(let r=0;r<e.length;r++){const i=e[r];Nr(i)&&!Dr(i)?i.delete(t):e[n++]=i,i.w&=~ue,i.n&=~ue}e.length=n}},wt=new WeakMap;let Ue=0,ue=1;const en=30;let $;const ve=Symbol(""),tn=Symbol("");class Mr{constructor(e,n=null,r){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,Is(this,r)}run(){if(!this.active)return this.fn();let e=$,n=oe;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=$,$=this,oe=!0,ue=1<<++Ue,Ue<=en?bs(this):Vn(this),this.fn()}finally{Ue<=en&&ws(this),ue=1<<--Ue,$=this.parent,oe=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){$===this?this.deferStop=!0:this.active&&(Vn(this),this.onStop&&this.onStop(),this.active=!1)}}function Vn(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let oe=!0;const Lr=[];function Es(){Lr.push(oe),oe=!1}function Ts(){const t=Lr.pop();oe=t===void 0?!0:t}function F(t,e,n){if(oe&&$){let r=wt.get(t);r||wt.set(t,r=new Map);let i=r.get(n);i||r.set(n,i=yn()),Ur(i)}}function Ur(t,e){let n=!1;Ue<=en?Dr(t)||(t.n|=ue,n=!Nr(t)):n=!t.has($),n&&(t.add($),$.deps.push(t))}function le(t,e,n,r,i,s){const o=wt.get(t);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(n==="length"&&P(t)){const c=Number(r);o.forEach((u,l)=>{(l==="length"||l>=c)&&a.push(u)})}else switch(n!==void 0&&a.push(o.get(n)),e){case"add":P(t)?In(n)&&a.push(o.get("length")):(a.push(o.get(ve)),Ve(t)&&a.push(o.get(tn)));break;case"delete":P(t)||(a.push(o.get(ve)),Ve(t)&&a.push(o.get(tn)));break;case"set":Ve(t)&&a.push(o.get(ve));break}if(a.length===1)a[0]&&nn(a[0]);else{const c=[];for(const u of a)u&&c.push(...u);nn(yn(c))}}function nn(t,e){const n=P(t)?t:[...t];for(const r of n)r.computed&&$n(r);for(const r of n)r.computed||$n(r)}function $n(t,e){(t!==$||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}function Ss(t,e){var n;return(n=wt.get(t))===null||n===void 0?void 0:n.get(e)}const Rs=os("__proto__,__v_isRef,__isVue"),xr=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(vn)),ks=Fr(),Os=Fr(!0),Hn=As();function As(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=g(this);for(let s=0,o=this.length;s<o;s++)F(r,"get",s+"");const i=r[e](...n);return i===-1||i===!1?r[e](...n.map(g)):i}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){Es();const r=g(this)[e].apply(this,n);return Ts(),r}}),t}function Ps(t){const e=g(this);return F(e,"has",t),e.hasOwnProperty(t)}function Fr(t=!1,e=!1){return function(r,i,s){if(i==="__v_isReactive")return!t;if(i==="__v_isReadonly")return t;if(i==="__v_isShallow")return e;if(i==="__v_raw"&&s===(t?e?qs:$r:e?zs:Vr).get(r))return r;const o=P(r);if(!t){if(o&&Dt(Hn,i))return Reflect.get(Hn,i,s);if(i==="hasOwnProperty")return Ps}const a=Reflect.get(r,i,s);return(vn(i)?xr.has(i):Rs(i))||(t||F(r,"get",i),e)?a:R(a)?o&&In(i)?a:a.value:Me(a)?t?Hr(a):wn(a):a}}const Cs=Ns();function Ns(t=!1){return function(n,r,i,s){let o=n[r];if(Ge(o)&&R(o)&&!R(i))return!1;if(!t&&(!Et(i)&&!Ge(i)&&(o=g(o),i=g(i)),!P(n)&&R(o)&&!R(i)))return o.value=i,!0;const a=P(n)&&In(r)?Number(r)<n.length:Dt(n,r),c=Reflect.set(n,r,i,s);return n===g(s)&&(a?Ke(i,o)&&le(n,"set",r,i):le(n,"add",r,i)),c}}function Ds(t,e){const n=Dt(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&le(t,"delete",e,void 0),r}function Ms(t,e){const n=Reflect.has(t,e);return(!vn(e)||!xr.has(e))&&F(t,"has",e),n}function Ls(t){return F(t,"iterate",P(t)?"length":ve),Reflect.ownKeys(t)}const Us={get:ks,set:Cs,deleteProperty:Ds,has:Ms,ownKeys:Ls},xs={get:Os,set(t,e){return!0},deleteProperty(t,e){return!0}},bn=t=>t,Lt=t=>Reflect.getPrototypeOf(t);function ht(t,e,n=!1,r=!1){t=t.__v_raw;const i=g(t),s=g(e);n||(e!==s&&F(i,"get",e),F(i,"get",s));const{has:o}=Lt(i),a=r?bn:n?En:Je;if(o.call(i,e))return a(t.get(e));if(o.call(i,s))return a(t.get(s));t!==i&&t.get(e)}function ft(t,e=!1){const n=this.__v_raw,r=g(n),i=g(t);return e||(t!==i&&F(r,"has",t),F(r,"has",i)),t===i?n.has(t):n.has(t)||n.has(i)}function pt(t,e=!1){return t=t.__v_raw,!e&&F(g(t),"iterate",ve),Reflect.get(t,"size",t)}function Wn(t){t=g(t);const e=g(this);return Lt(e).has.call(e,t)||(e.add(t),le(e,"add",t,t)),this}function jn(t,e){e=g(e);const n=g(this),{has:r,get:i}=Lt(n);let s=r.call(n,t);s||(t=g(t),s=r.call(n,t));const o=i.call(n,t);return n.set(t,e),s?Ke(e,o)&&le(n,"set",t,e):le(n,"add",t,e),this}function zn(t){const e=g(this),{has:n,get:r}=Lt(e);let i=n.call(e,t);i||(t=g(t),i=n.call(e,t)),r&&r.call(e,t);const s=e.delete(t);return i&&le(e,"delete",t,void 0),s}function qn(){const t=g(this),e=t.size!==0,n=t.clear();return e&&le(t,"clear",void 0,void 0),n}function gt(t,e){return function(r,i){const s=this,o=s.__v_raw,a=g(o),c=e?bn:t?En:Je;return!t&&F(a,"iterate",ve),o.forEach((u,l)=>r.call(i,c(u),c(l),s))}}function mt(t,e,n){return function(...r){const i=this.__v_raw,s=g(i),o=Ve(s),a=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,u=i[t](...r),l=n?bn:e?En:Je;return!e&&F(s,"iterate",c?tn:ve),{next(){const{value:h,done:p}=u.next();return p?{value:h,done:p}:{value:a?[l(h[0]),l(h[1])]:l(h),done:p}},[Symbol.iterator](){return this}}}}function ee(t){return function(...e){return t==="delete"?!1:this}}function Fs(){const t={get(s){return ht(this,s)},get size(){return pt(this)},has:ft,add:Wn,set:jn,delete:zn,clear:qn,forEach:gt(!1,!1)},e={get(s){return ht(this,s,!1,!0)},get size(){return pt(this)},has:ft,add:Wn,set:jn,delete:zn,clear:qn,forEach:gt(!1,!0)},n={get(s){return ht(this,s,!0)},get size(){return pt(this,!0)},has(s){return ft.call(this,s,!0)},add:ee("add"),set:ee("set"),delete:ee("delete"),clear:ee("clear"),forEach:gt(!0,!1)},r={get(s){return ht(this,s,!0,!0)},get size(){return pt(this,!0)},has(s){return ft.call(this,s,!0)},add:ee("add"),set:ee("set"),delete:ee("delete"),clear:ee("clear"),forEach:gt(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=mt(s,!1,!1),n[s]=mt(s,!0,!1),e[s]=mt(s,!1,!0),r[s]=mt(s,!0,!0)}),[t,n,e,r]}const[Bs,Vs,$s,Hs]=Fs();function Br(t,e){const n=e?t?Hs:$s:t?Vs:Bs;return(r,i,s)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?r:Reflect.get(Dt(n,i)&&i in r?n:r,i,s)}const Ws={get:Br(!1,!1)},js={get:Br(!0,!1)},Vr=new WeakMap,zs=new WeakMap,$r=new WeakMap,qs=new WeakMap;function Ks(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Gs(t){return t.__v_skip||!Object.isExtensible(t)?0:Ks(ps(t))}function wn(t){return Ge(t)?t:Wr(t,!1,Us,Ws,Vr)}function Hr(t){return Wr(t,!0,xs,js,$r)}function Wr(t,e,n,r,i){if(!Me(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const s=i.get(t);if(s)return s;const o=Gs(t);if(o===0)return t;const a=new Proxy(t,o===2?r:n);return i.set(t,a),a}function ke(t){return Ge(t)?ke(t.__v_raw):!!(t&&t.__v_isReactive)}function Ge(t){return!!(t&&t.__v_isReadonly)}function Et(t){return!!(t&&t.__v_isShallow)}function g(t){const e=t&&t.__v_raw;return e?g(e):t}function rn(t){return ms(t,"__v_skip",!0),t}const Je=t=>Me(t)?wn(t):t,En=t=>Me(t)?Hr(t):t;function jr(t){oe&&$&&(t=g(t),Ur(t.dep||(t.dep=yn())))}function zr(t,e){t=g(t);const n=t.dep;n&&nn(n)}function R(t){return!!(t&&t.__v_isRef===!0)}function Js(t){return Ys(t,!1)}function Ys(t,e){return R(t)?t:new Xs(t,e)}class Xs{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:g(e),this._value=n?e:Je(e)}get value(){return jr(this),this._value}set value(e){const n=this.__v_isShallow||Et(e)||Ge(e);e=n?e:g(e),Ke(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:Je(e),zr(this))}}function Qs(t){const e=P(t)?new Array(t.length):{};for(const n in t)e[n]=eo(t,n);return e}class Zs{constructor(e,n,r){this._object=e,this._key=n,this._defaultValue=r,this.__v_isRef=!0}get value(){const e=this._object[this._key];return e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return Ss(g(this._object),this._key)}}function eo(t,e,n){const r=t[e];return R(r)?r:new Zs(t,e,n)}var qr;class to{constructor(e,n,r,i){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this[qr]=!1,this._dirty=!0,this.effect=new Mr(e,()=>{this._dirty||(this._dirty=!0,zr(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!i,this.__v_isReadonly=r}get value(){const e=g(this);return jr(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}qr="__v_isReadonly";function no(t,e,n=!1){let r,i;const s=Ce(t);return s?(r=t,i=_n):(r=t.get,i=t.set),new to(r,i,s||!i,n)}function Oe(t,e,n,r){let i;try{i=r?t(...r):t()}catch(s){Kr(s,e,n)}return i}function sn(t,e,n,r){if(Ce(t)){const s=Oe(t,e,n,r);return s&&hs(s)&&s.catch(o=>{Kr(o,e,n)}),s}const i=[];for(let s=0;s<t.length;s++)i.push(sn(t[s],e,n,r));return i}function Kr(t,e,n,r=!0){const i=e?e.vnode:null;if(e){let s=e.parent;const o=e.proxy,a=n;for(;s;){const u=s.ec;if(u){for(let l=0;l<u.length;l++)if(u[l](t,o,a)===!1)return}s=s.parent}const c=e.appContext.config.errorHandler;if(c){Oe(c,null,10,[t,o,a]);return}}ro(t,n,i,r)}function ro(t,e,n,r=!0){console.error(t)}let Tt=!1,on=!1;const H=[];let re=0;const Ae=[];let K=null,_e=0;const Gr=Promise.resolve();let Tn=null;function io(t){const e=Tn||Gr;return t?e.then(this?t.bind(this):t):e}function so(t){let e=re+1,n=H.length;for(;e<n;){const r=e+n>>>1;Ye(H[r])<t?e=r+1:n=r}return e}function oo(t){(!H.length||!H.includes(t,Tt&&t.allowRecurse?re+1:re))&&(t.id==null?H.push(t):H.splice(so(t.id),0,t),Jr())}function Jr(){!Tt&&!on&&(on=!0,Tn=Gr.then(Yr))}function ao(t){P(t)?Ae.push(...t):(!K||!K.includes(t,t.allowRecurse?_e+1:_e))&&Ae.push(t),Jr()}function co(t){if(Ae.length){const e=[...new Set(Ae)];if(Ae.length=0,K){K.push(...e);return}for(K=e,K.sort((n,r)=>Ye(n)-Ye(r)),_e=0;_e<K.length;_e++)K[_e]();K=null,_e=0}}const Ye=t=>t.id==null?1/0:t.id,uo=(t,e)=>{const n=Ye(t)-Ye(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function Yr(t){on=!1,Tt=!0,H.sort(uo);const e=_n;try{for(re=0;re<H.length;re++){const n=H[re];n&&n.active!==!1&&Oe(n,null,14)}}finally{re=0,H.length=0,co(),Tt=!1,Tn=null,(H.length||Ae.length)&&Yr()}}let lo=null;function ho(t,e){e&&e.pendingBranch?P(t)?e.effects.push(...t):e.effects.push(t):ao(t)}const _t={};function fo(t,e,n){return po(t,e,n)}function po(t,e,{immediate:n,deep:r,flush:i,onTrack:s,onTrigger:o}=as){const a=Cr()===void 0?Xr:null;let c,u=!1,l=!1;if(R(t)?(c=()=>t.value,u=Et(t)):ke(t)?(c=()=>t,r=!0):P(t)?(l=!0,u=t.some(v=>ke(v)||Et(v)),c=()=>t.map(v=>{if(R(v))return v.value;if(ke(v))return Se(v);if(Ce(v))return Oe(v,a,2)})):Ce(t)?e?c=()=>Oe(t,a,2):c=()=>{if(!(a&&a.isUnmounted))return h&&h(),sn(t,a,3,[p])}:c=_n,e&&r){const v=c;c=()=>Se(v())}let h,p=v=>{h=w.onStop=()=>{Oe(v,a,4)}},_=l?new Array(t.length).fill(_t):_t;const y=()=>{if(w.active)if(e){const v=w.run();(r||u||(l?v.some((N,O)=>Ke(N,_[O])):Ke(v,_)))&&(h&&h(),sn(e,a,3,[v,_===_t?void 0:l&&_[0]===_t?[]:_,p]),_=v)}else w.run()};y.allowRecurse=!!e;let k;i==="sync"?k=y:i==="post"?k=()=>Kn(y,a&&a.suspense):(y.pre=!0,a&&(y.id=a.uid),k=()=>oo(y));const w=new Mr(c,k);return e?n?y():_=w.run():i==="post"?Kn(w.run.bind(w),a&&a.suspense):w.run(),()=>{w.stop(),a&&a.scope&&cs(a.scope.effects,w)}}function Se(t,e){if(!Me(t)||t.__v_skip||(e=e||new Set,e.has(t)))return t;if(e.add(t),R(t))Se(t.value,e);else if(P(t))for(let n=0;n<t.length;n++)Se(t[n],e);else if(ls(t)||Ve(t))t.forEach(n=>{Se(n,e)});else if(gs(t))for(const n in t)Se(t[n],e);return t}const Kn=ho;let Xr=null;const Qr=()=>Xr||lo;let go=!1;const mo=(t,e)=>no(t,e,go);/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */let Zr;const Sn=t=>Zr=t;function an(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var $e;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})($e||($e={}));const ei=()=>{};function Gn(t,e,n,r=ei){t.push(e);const i=()=>{const s=t.indexOf(e);s>-1&&(t.splice(s,1),r())};return!n&&Cr()&&ys(i),i}function Te(t,...e){t.slice().forEach(n=>{n(...e)})}function cn(t,e){t instanceof Map&&e instanceof Map&&e.forEach((n,r)=>t.set(r,n)),t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n],i=t[n];an(i)&&an(r)&&t.hasOwnProperty(n)&&!R(r)&&!ke(r)?t[n]=cn(i,r):t[n]=r}return t}const _o=Symbol();function vo(t){return!an(t)||!t.hasOwnProperty(_o)}const{assign:ne}=Object;function Io(t){return!!(R(t)&&t.effect)}function yo(t,e,n,r){const{state:i,actions:s,getters:o}=e,a=n.state.value[t];let c;function u(){a||(n.state.value[t]=i?i():{});const l=Qs(n.state.value[t]);return ne(l,s,Object.keys(o||{}).reduce((h,p)=>(h[p]=rn(mo(()=>{Sn(n);const _=n._s.get(t);return o[p].call(_,_)})),h),{}))}return c=ti(t,u,e,n,r,!0),c}function ti(t,e,n={},r,i,s){let o;const a=ne({actions:{}},n),c={deep:!0};let u,l,h=rn([]),p=rn([]),_;const y=r.state.value[t];!s&&!y&&(r.state.value[t]={}),Js({});let k;function w(m){let f;u=l=!1,typeof m=="function"?(m(r.state.value[t]),f={type:$e.patchFunction,storeId:t,events:_}):(cn(r.state.value[t],m),f={type:$e.patchObject,payload:m,storeId:t,events:_});const b=k=Symbol();io().then(()=>{k===b&&(u=!0)}),l=!0,Te(h,f,r.state.value[t])}const fe=s?function(){const{state:f}=n,b=f?f():{};this.$patch(M=>{ne(M,b)})}:ei;function v(){o.stop(),h=[],p=[],r._s.delete(t)}function N(m,f){return function(){Sn(r);const b=Array.from(arguments),M=[],pe=[];function L(S){M.push(S)}function ct(S){pe.push(S)}Te(p,{args:b,name:m,store:E,after:L,onError:ct});let U;try{U=f.apply(this&&this.$id===t?this:E,b)}catch(S){throw Te(pe,S),S}return U instanceof Promise?U.then(S=>(Te(M,S),S)).catch(S=>(Te(pe,S),Promise.reject(S))):(Te(M,U),U)}}const O={_p:r,$id:t,$onAction:Gn.bind(null,p),$patch:w,$reset:fe,$subscribe(m,f={}){const b=Gn(h,m,f.detached,()=>M()),M=o.run(()=>fo(()=>r.state.value[t],pe=>{(f.flush==="sync"?l:u)&&m({storeId:t,type:$e.direct,events:_},pe)},ne({},c,f)));return b},$dispose:v},E=wn(O);r._s.set(t,E);const D=r._e.run(()=>(o=vs(),o.run(()=>e())));for(const m in D){const f=D[m];if(R(f)&&!Io(f)||ke(f))s||(y&&vo(f)&&(R(f)?f.value=y[m]:cn(f,y[m])),r.state.value[t][m]=f);else if(typeof f=="function"){const b=N(m,f);D[m]=b,a.actions[m]=f}}return ne(E,D),ne(g(E),D),Object.defineProperty(E,"$state",{get:()=>r.state.value[t],set:m=>{w(f=>{ne(f,m)})}}),r._p.forEach(m=>{ne(E,o.run(()=>m({store:E,app:r._a,pinia:r,options:a})))}),y&&s&&n.hydrate&&n.hydrate(E.$state,y),u=!0,l=!0,E}function bo(t,e,n){let r,i;const s=typeof e=="function";typeof t=="string"?(r=t,i=s?n:e):(i=t,r=t.id);function o(a,c){const u=Qr();return a=a||u&&void 0,a&&Sn(a),a=Zr,a._s.has(r)||(s?ti(r,e,i,a):yo(r,i,a)),a._s.get(r)}return o.$id=r,o}const wo=()=>({config:null,error:null,current_user:null,text_confirmation:null,sign_by_phone_step:1,tab:!1,is_loading:!1,is_session_persistant:!0,is_login_with_phone_shown:!1,is_authguard_dialog_shown:!0,is_authguard_dialog_persistent:!0,is_email_verification_link_sent:!1,is_email_reset_password_link_sent:!1,is_email_verification_screen_shown:!1,is_reset_password_screen_shown:!1,is_route_public:!1,is_from_public_to_auth:!1});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ni=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Eo=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ri={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,u=c?t[i+2]:0,l=s>>2,h=(s&3)<<4|a>>4;let p=(a&15)<<2|u>>6,_=u&63;c||(_=64,o||(p=64)),r.push(n[l],n[h],n[p],n[_])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ni(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Eo(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const u=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||u==null||h==null)throw new To;const p=s<<2|a>>4;if(r.push(p),u!==64){const _=a<<4&240|u>>2;if(r.push(_),h!==64){const y=u<<6&192|h;r.push(y)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class To extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const So=function(t){const e=ni(t);return ri.encodeByteArray(e,!0)},ii=function(t){return So(t).replace(/\./g,"")},si=function(t){try{return ri.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ro(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko=()=>Ro().__FIREBASE_DEFAULTS__,Oo=()=>{if(typeof process>"u"||typeof{}>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Ao=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&si(t[1]);return e&&JSON.parse(e)},Rn=()=>{try{return ko()||Oo()||Ao()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Po=t=>{var e,n;return(n=(e=Rn())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Co=()=>{var t;return(t=Rn())===null||t===void 0?void 0:t.config},oi=t=>{var e;return(e=Rn())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Do(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(T())}function Mo(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Lo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Uo(){const t=T();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function xo(){try{return typeof indexedDB=="object"}catch{return!1}}function Fo(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo="FirebaseError";class de extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Bo,Object.setPrototypeOf(this,de.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,nt.prototype.create)}}class nt{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Vo(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new de(i,a,r)}}function Vo(t,e){return t.replace($o,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const $o=/\{\$([^}]+)}/g;function Ho(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function St(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Jn(s)&&Jn(o)){if(!St(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Jn(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function xe(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Fe(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Wo(t,e){const n=new jo(t,e);return n.subscribe.bind(n)}class jo{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");zo(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=zt),i.error===void 0&&(i.error=zt),i.complete===void 0&&(i.complete=zt);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function zo(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function zt(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(t){return t&&t._delegate?t._delegate:t}class Ne{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const me="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new No;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Go(e))try{this.getOrInitializeService({instanceIdentifier:me})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=me){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=me){return this.instances.has(e)}getOptions(e=me){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Ko(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=me){return this.component?this.component.multipleInstances?e:me:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ko(t){return t===me?void 0:t}function Go(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new qo(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var I;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(I||(I={}));const Yo={debug:I.DEBUG,verbose:I.VERBOSE,info:I.INFO,warn:I.WARN,error:I.ERROR,silent:I.SILENT},Xo=I.INFO,Qo={[I.DEBUG]:"log",[I.VERBOSE]:"log",[I.INFO]:"info",[I.WARN]:"warn",[I.ERROR]:"error"},Zo=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=Qo[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ai{constructor(e){this.name=e,this._logLevel=Xo,this._logHandler=Zo,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in I))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Yo[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,I.DEBUG,...e),this._logHandler(this,I.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,I.VERBOSE,...e),this._logHandler(this,I.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,I.INFO,...e),this._logHandler(this,I.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,I.WARN,...e),this._logHandler(this,I.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,I.ERROR,...e),this._logHandler(this,I.ERROR,...e)}}const ea=(t,e)=>e.some(n=>t instanceof n);let Yn,Xn;function ta(){return Yn||(Yn=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function na(){return Xn||(Xn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ci=new WeakMap,un=new WeakMap,ui=new WeakMap,qt=new WeakMap,kn=new WeakMap;function ra(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(ae(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ci.set(n,t)}).catch(()=>{}),kn.set(e,t),e}function ia(t){if(un.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});un.set(t,e)}let ln={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return un.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ui.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ae(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function sa(t){ln=t(ln)}function oa(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Kt(this),e,...n);return ui.set(r,e.sort?e.sort():[e]),ae(r)}:na().includes(t)?function(...e){return t.apply(Kt(this),e),ae(ci.get(this))}:function(...e){return ae(t.apply(Kt(this),e))}}function aa(t){return typeof t=="function"?oa(t):(t instanceof IDBTransaction&&ia(t),ea(t,ta())?new Proxy(t,ln):t)}function ae(t){if(t instanceof IDBRequest)return ra(t);if(qt.has(t))return qt.get(t);const e=aa(t);return e!==t&&(qt.set(t,e),kn.set(e,t)),e}const Kt=t=>kn.get(t);function ca(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=ae(o);return r&&o.addEventListener("upgradeneeded",c=>{r(ae(o.result),c.oldVersion,c.newVersion,ae(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",()=>i())}).catch(()=>{}),a}const ua=["get","getKey","getAll","getAllKeys","count"],la=["put","add","delete","clear"],Gt=new Map;function Qn(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Gt.get(e))return Gt.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=la.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||ua.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),i&&c.done]))[0]};return Gt.set(e,s),s}sa(t=>({...t,get:(e,n,r)=>Qn(e,n)||t.get(e,n,r),has:(e,n)=>!!Qn(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ha(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function ha(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const dn="@firebase/app",Zn="0.9.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye=new ai("@firebase/app"),fa="@firebase/app-compat",pa="@firebase/analytics-compat",ga="@firebase/analytics",ma="@firebase/app-check-compat",_a="@firebase/app-check",va="@firebase/auth",Ia="@firebase/auth-compat",ya="@firebase/database",ba="@firebase/database-compat",wa="@firebase/functions",Ea="@firebase/functions-compat",Ta="@firebase/installations",Sa="@firebase/installations-compat",Ra="@firebase/messaging",ka="@firebase/messaging-compat",Oa="@firebase/performance",Aa="@firebase/performance-compat",Pa="@firebase/remote-config",Ca="@firebase/remote-config-compat",Na="@firebase/storage",Da="@firebase/storage-compat",Ma="@firebase/firestore",La="@firebase/firestore-compat",Ua="firebase",xa="9.19.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn="[DEFAULT]",Fa={[dn]:"fire-core",[fa]:"fire-core-compat",[ga]:"fire-analytics",[pa]:"fire-analytics-compat",[_a]:"fire-app-check",[ma]:"fire-app-check-compat",[va]:"fire-auth",[Ia]:"fire-auth-compat",[ya]:"fire-rtdb",[ba]:"fire-rtdb-compat",[wa]:"fire-fn",[Ea]:"fire-fn-compat",[Ta]:"fire-iid",[Sa]:"fire-iid-compat",[Ra]:"fire-fcm",[ka]:"fire-fcm-compat",[Oa]:"fire-perf",[Aa]:"fire-perf-compat",[Pa]:"fire-rc",[Ca]:"fire-rc-compat",[Na]:"fire-gcs",[Da]:"fire-gcs-compat",[Ma]:"fire-fst",[La]:"fire-fst-compat","fire-js":"fire-js",[Ua]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt=new Map,fn=new Map;function Ba(t,e){try{t.container.addComponent(e)}catch(n){ye.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Xe(t){const e=t.name;if(fn.has(e))return ye.debug(`There were multiple attempts to register component ${e}.`),!1;fn.set(e,t);for(const n of Rt.values())Ba(n,t);return!0}function li(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},ce=new nt("app","Firebase",Va);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ne("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ce.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut=xa;function Ha(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:hn,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw ce.create("bad-app-name",{appName:String(i)});if(n||(n=Co()),!n)throw ce.create("no-options");const s=Rt.get(i);if(s){if(St(n,s.options)&&St(r,s.config))return s;throw ce.create("duplicate-app",{appName:i})}const o=new Jo(i);for(const c of fn.values())o.addComponent(c);const a=new $a(n,r,o);return Rt.set(i,a),a}function Wa(t=hn){const e=Rt.get(t);if(!e&&t===hn)return Ha();if(!e)throw ce.create("no-app",{appName:t});return e}function He(t,e,n){var r;let i=(r=Fa[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ye.warn(a.join(" "));return}Xe(new Ne(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja="firebase-heartbeat-database",za=1,Qe="firebase-heartbeat-store";let Jt=null;function di(){return Jt||(Jt=ca(ja,za,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Qe)}}}).catch(t=>{throw ce.create("idb-open",{originalErrorMessage:t.message})})),Jt}async function qa(t){try{return(await di()).transaction(Qe).objectStore(Qe).get(hi(t))}catch(e){if(e instanceof de)ye.warn(e.message);else{const n=ce.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ye.warn(n.message)}}}async function er(t,e){try{const r=(await di()).transaction(Qe,"readwrite");return await r.objectStore(Qe).put(e,hi(t)),r.done}catch(n){if(n instanceof de)ye.warn(n.message);else{const r=ce.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ye.warn(r.message)}}}function hi(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka=1024,Ga=30*24*60*60*1e3;class Ja{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Xa(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=tr();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(i=>{const s=new Date(i.date).valueOf();return Date.now()-s<=Ga}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=tr(),{heartbeatsToSend:n,unsentEntries:r}=Ya(this._heartbeatsCache.heartbeats),i=ii(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}}function tr(){return new Date().toISOString().substring(0,10)}function Ya(t,e=Ka){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),nr(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),nr(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Xa{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return xo()?Fo().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await qa(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return er(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return er(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function nr(t){return ii(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qa(t){Xe(new Ne("platform-logger",e=>new da(e),"PRIVATE")),Xe(new Ne("heartbeat",e=>new Ja(e),"PRIVATE")),He(dn,Zn,t),He(dn,Zn,"esm2017"),He("fire-js","")}Qa("");function On(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function fi(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Za=fi,pi=new nt("auth","Firebase",fi());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr=new ai("@firebase/auth");function vt(t,...e){rr.logLevel<=I.ERROR&&rr.error(`Auth (${Ut}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(t,...e){throw An(t,...e)}function j(t,...e){return An(t,...e)}function gi(t,e,n){const r=Object.assign(Object.assign({},Za()),{[e]:n});return new nt("auth","Firebase",r).create(e,{appName:t.name})}function ec(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&B(t,"argument-error"),gi(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function An(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return pi.create(t,...e)}function d(t,e,...n){if(!t)throw An(e,...n)}function Y(t){const e="INTERNAL ASSERTION FAILED: "+t;throw vt(e),new Error(e)}function Z(t,e){t||Y(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ir=new Map;function X(t){Z(t instanceof Function,"Expected a class definition");let e=ir.get(t);return e?(Z(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,ir.set(t,e),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tc(t,e){const n=li(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(St(s,e??{}))return i;B(i,"already-initialized")}return n.initialize({options:e})}function nc(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(X);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pn(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function rc(){return sr()==="http:"||sr()==="https:"}function sr(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ic(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(rc()||Mo()||"connection"in navigator)?navigator.onLine:!0}function sc(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e,n){this.shortDelay=e,this.longDelay=n,Z(n>e,"Short delay should be less than long delay!"),this.isMobile=Do()||Lo()}get(){return ic()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pn(t,e){Z(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Y("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Y("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Y("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oc={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac=new it(3e4,6e4);function V(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function q(t,e,n,r,i={}){return _i(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=rt(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode),mi.fetch()(vi(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},s))})}async function _i(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},oc),e);try{const i=new cc(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Be(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,u]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Be(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Be(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Be(t,"user-disabled",o);const l=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw gi(t,l,u);B(t,l)}}catch(i){if(i instanceof de)throw i;B(t,"network-request-failed",{message:String(i)})}}async function he(t,e,n,r,i={}){const s=await q(t,e,n,r,i);return"mfaPendingCredential"in s&&B(t,"multi-factor-auth-required",{_serverResponse:s}),s}function vi(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?Pn(t.config,i):`${t.config.apiScheme}://${i}`}class cc{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(j(this.auth,"network-request-failed")),ac.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Be(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=j(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uc(t,e){return q(t,"POST","/v1/accounts:delete",e)}async function lc(t,e){return q(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function dc(t,e=!1){const n=C(t),r=await n.getIdToken(e),i=Cn(r);d(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:We(Yt(i.auth_time)),issuedAtTime:We(Yt(i.iat)),expirationTime:We(Yt(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Yt(t){return Number(t)*1e3}function Cn(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return vt("JWT malformed, contained fewer than 3 sections"),null;try{const i=si(n);return i?JSON.parse(i):(vt("Failed to decode base64 JWT payload"),null)}catch(i){return vt("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function hc(t){const e=Cn(t);return d(e,"internal-error"),d(typeof e.exp<"u","internal-error"),d(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function De(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof de&&fc(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function fc({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=We(this.lastLoginAt),this.creationTime=We(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kt(t){var e;const n=t.auth,r=await t.getIdToken(),i=await De(t,lc(n,{idToken:r}));d(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?_c(s.providerUserInfo):[],a=mc(t.providerData,o),c=t.isAnonymous,u=!(t.email&&s.passwordHash)&&!(a!=null&&a.length),l=c?u:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ii(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(t,h)}async function gc(t){const e=C(t);await kt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function mc(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function _c(t){return t.map(e=>{var{providerId:n}=e,r=On(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vc(t,e){const n=await _i(t,{},async()=>{const r=rt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=vi(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",mi.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){d(e.idToken,"internal-error"),d(typeof e.idToken<"u","internal-error"),d(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):hc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return d(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await vc(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Ze;return r&&(d(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(d(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(d(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ze,this.toJSON())}_performRefresh(){return Y("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(t,e){d(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Ie{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=On(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new pc(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ii(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await De(this,this.stsTokenManager.getToken(this.auth,e));return d(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return dc(this,e)}reload(){return gc(this)}_assign(e){this!==e&&(d(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Ie(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){d(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await kt(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await De(this,uc(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,a,c,u,l;const h=(r=n.displayName)!==null&&r!==void 0?r:void 0,p=(i=n.email)!==null&&i!==void 0?i:void 0,_=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,y=(o=n.photoURL)!==null&&o!==void 0?o:void 0,k=(a=n.tenantId)!==null&&a!==void 0?a:void 0,w=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,fe=(u=n.createdAt)!==null&&u!==void 0?u:void 0,v=(l=n.lastLoginAt)!==null&&l!==void 0?l:void 0,{uid:N,emailVerified:O,isAnonymous:E,providerData:D,stsTokenManager:m}=n;d(N&&m,e,"internal-error");const f=Ze.fromJSON(this.name,m);d(typeof N=="string",e,"internal-error"),te(h,e.name),te(p,e.name),d(typeof O=="boolean",e,"internal-error"),d(typeof E=="boolean",e,"internal-error"),te(_,e.name),te(y,e.name),te(k,e.name),te(w,e.name),te(fe,e.name),te(v,e.name);const b=new Ie({uid:N,auth:e,email:p,emailVerified:O,displayName:h,isAnonymous:E,photoURL:y,phoneNumber:_,tenantId:k,stsTokenManager:f,createdAt:fe,lastLoginAt:v});return D&&Array.isArray(D)&&(b.providerData=D.map(M=>Object.assign({},M))),w&&(b._redirectEventId=w),b}static async _fromIdTokenResponse(e,n,r=!1){const i=new Ze;i.updateFromServerResponse(n);const s=new Ie({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await kt(s),s}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}yi.type="NONE";const or=yi;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(t,e,n){return`firebase:${t}:${e}:${n}`}class Pe{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=It(this.userKey,i.apiKey,s),this.fullPersistenceKey=It("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ie._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Pe(X(or),e,r);const i=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=i[0]||X(or);const o=It(r,e.config.apiKey,e.name);let a=null;for(const u of n)try{const l=await u._get(o);if(l){const h=Ie._fromJSON(e,l);u!==s&&(a=h),s=u;break}}catch{}const c=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Pe(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new Pe(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ar(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ei(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(bi(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Si(e))return"Blackberry";if(Ri(e))return"Webos";if(Nn(e))return"Safari";if((e.includes("chrome/")||wi(e))&&!e.includes("edge/"))return"Chrome";if(Ti(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function bi(t=T()){return/firefox\//i.test(t)}function Nn(t=T()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function wi(t=T()){return/crios\//i.test(t)}function Ei(t=T()){return/iemobile/i.test(t)}function Ti(t=T()){return/android/i.test(t)}function Si(t=T()){return/blackberry/i.test(t)}function Ri(t=T()){return/webos/i.test(t)}function xt(t=T()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Ic(t=T()){var e;return xt(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function yc(){return Uo()&&document.documentMode===10}function ki(t=T()){return xt(t)||Ti(t)||Ri(t)||Si(t)||/windows phone/i.test(t)||Ei(t)}function bc(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oi(t,e=[]){let n;switch(t){case"Browser":n=ar(T());break;case"Worker":n=`${ar(T())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ut}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ec{constructor(e,n,r){this.app=e,this.heartbeatServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new cr(this),this.idTokenSubscription=new cr(this),this.beforeStateQueue=new wc(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=pi,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=X(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Pe.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return d(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await kt(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=sc()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?C(e):null;return n&&d(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&d(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(X(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new nt("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&X(e)||this._popupRedirectResolver;d(n,this,"argument-error"),this.redirectPersistenceManager=await Pe.create(this,[X(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return d(o,this,"internal-error"),o.then(()=>s(this.currentUser)),typeof n=="function"?e.addObserver(n,r,i):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return d(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Oi(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return r&&(n["X-Firebase-Client"]=r),n}}function Ee(t){return C(t)}class cr{constructor(e){this.auth=e,this.observer=null,this.addObserver=Wo(n=>this.observer=n)}get next(){return d(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function Tc(t,e,n){const r=Ee(t);d(r._canInitEmulator,r,"emulator-config-failed"),d(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(n!=null&&n.disableWarnings),s=Ai(e),{host:o,port:a}=Sc(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Rc()}function Ai(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Sc(t){const e=Ai(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:ur(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:ur(o)}}}function ur(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Rc(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Y("not implemented")}_getIdTokenResponse(e){return Y("not implemented")}_linkToIdToken(e,n){return Y("not implemented")}_getReauthenticationResolver(e){return Y("not implemented")}}async function kc(t,e){return q(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oc(t,e){return he(t,"POST","/v1/accounts:signInWithPassword",V(t,e))}async function Pi(t,e){return q(t,"POST","/v1/accounts:sendOobCode",V(t,e))}async function Ac(t,e){return Pi(t,e)}async function Pc(t,e){return Pi(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cc(t,e){return he(t,"POST","/v1/accounts:signInWithEmailLink",V(t,e))}async function Nc(t,e){return he(t,"POST","/v1/accounts:signInWithEmailLink",V(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et extends st{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new et(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new et(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return Oc(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Cc(e,{email:this._email,oobCode:this._password});default:B(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return kc(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Nc(e,{idToken:n,email:this._email,oobCode:this._password});default:B(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q(t,e){return he(t,"POST","/v1/accounts:signInWithIdp",V(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dc="http://localhost";class be extends st{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new be(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):B("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=On(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new be(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Q(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Q(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Q(e,n)}buildRequest(){const e={requestUri:Dc,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=rt(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mc(t,e){return q(t,"POST","/v1/accounts:sendVerificationCode",V(t,e))}async function Lc(t,e){return he(t,"POST","/v1/accounts:signInWithPhoneNumber",V(t,e))}async function Uc(t,e){const n=await he(t,"POST","/v1/accounts:signInWithPhoneNumber",V(t,e));if(n.temporaryProof)throw Be(t,"account-exists-with-different-credential",n);return n}const xc={USER_NOT_FOUND:"user-not-found"};async function Fc(t,e){const n=Object.assign(Object.assign({},e),{operation:"REAUTH"});return he(t,"POST","/v1/accounts:signInWithPhoneNumber",V(t,n),xc)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je extends st{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new je({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new je({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return Lc(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return Uc(e,Object.assign({idToken:n},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Fc(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:r,verificationCode:i}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!n&&!i&&!s?null:new je({verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bc(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Vc(t){const e=xe(Fe(t)).link,n=e?xe(Fe(e)).deep_link_id:null,r=xe(Fe(t)).deep_link_id;return(r?xe(Fe(r)).link:null)||r||n||e||t}class Dn{constructor(e){var n,r,i,s,o,a;const c=xe(Fe(e)),u=(n=c.apiKey)!==null&&n!==void 0?n:null,l=(r=c.oobCode)!==null&&r!==void 0?r:null,h=Bc((i=c.mode)!==null&&i!==void 0?i:null);d(u&&l&&h,"argument-error"),this.apiKey=u,this.operation=h,this.code=l,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=Vc(e);try{return new Dn(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(){this.providerId=Le.PROVIDER_ID}static credential(e,n){return et._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Dn.parseLink(n);return d(r,"argument-error"),et._fromEmailAndCode(e,r.code,r.tenantId)}}Le.PROVIDER_ID="password";Le.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Le.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot extends Ft{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G extends ot{constructor(){super("facebook.com")}static credential(e){return be._fromParams({providerId:G.PROVIDER_ID,signInMethod:G.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return G.credentialFromTaggedObject(e)}static credentialFromError(e){return G.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return G.credential(e.oauthAccessToken)}catch{return null}}}G.FACEBOOK_SIGN_IN_METHOD="facebook.com";G.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J extends ot{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return be._fromParams({providerId:J.PROVIDER_ID,signInMethod:J.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return J.credentialFromTaggedObject(e)}static credentialFromError(e){return J.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return J.credential(n,r)}catch{return null}}}J.GOOGLE_SIGN_IN_METHOD="google.com";J.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie extends ot{constructor(){super("github.com")}static credential(e){return be._fromParams({providerId:ie.PROVIDER_ID,signInMethod:ie.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ie.credentialFromTaggedObject(e)}static credentialFromError(e){return ie.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ie.credential(e.oauthAccessToken)}catch{return null}}}ie.GITHUB_SIGN_IN_METHOD="github.com";ie.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c="http://localhost";class tt extends st{constructor(e,n){super(e,e),this.pendingToken=n}_getIdTokenResponse(e){const n=this.buildRequest();return Q(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Q(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Q(e,n)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,pendingToken:s}=n;return!r||!i||!s||r!==i?null:new tt(r,s)}static _create(e,n){return new tt(e,n)}buildRequest(){return{requestUri:$c,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hc="saml.";class Ot extends Ft{constructor(e){d(e.startsWith(Hc),"argument-error"),super(e)}static credentialFromResult(e){return Ot.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return Ot.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const n=tt.fromJSON(e);return d(n,"argument-error"),n}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:n,providerId:r}=e;if(!n||!r)return null;try{return tt._create(r,n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se extends ot{constructor(){super("twitter.com")}static credential(e,n){return be._fromParams({providerId:se.PROVIDER_ID,signInMethod:se.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return se.credentialFromTaggedObject(e)}static credentialFromError(e){return se.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return se.credential(n,r)}catch{return null}}}se.TWITTER_SIGN_IN_METHOD="twitter.com";se.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wc(t,e){return he(t,"POST","/v1/accounts:signUp",V(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Ie._fromIdTokenResponse(e,r,i),o=lr(r);return new we({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=lr(r);return new we({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function lr(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At extends de{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,At.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new At(e,n,r,i)}}function Ci(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?At._fromErrorAndOperation(t,s,e,r):s})}async function jc(t,e,n=!1){const r=await De(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return we._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zc(t,e,n=!1){const{auth:r}=t,i="reauthenticate";try{const s=await De(t,Ci(r,i,e,t),n);d(s.idToken,r,"internal-error");const o=Cn(s.idToken);d(o,r,"internal-error");const{sub:a}=o;return d(t.uid===a,r,"user-mismatch"),we._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&B(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ni(t,e,n=!1){const r="signIn",i=await Ci(t,r,e),s=await we._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function Di(t,e){return Ni(Ee(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mi(t,e,n){var r;d(((r=n.url)===null||r===void 0?void 0:r.length)>0,t,"invalid-continue-uri"),d(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(d(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(d(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qc(t,e,n){const r=C(t),i={requestType:"PASSWORD_RESET",email:e};n&&Mi(r,i,n),await Pc(r,i)}async function Kc(t,e,n){const r=Ee(t),i=await Wc(r,{returnSecureToken:!0,email:e,password:n}),s=await we._fromIdTokenResponse(r,"signIn",i);return await r._updateCurrentUser(s.user),s}function dr(t,e,n){return Di(C(t),Le.credential(e,n))}async function hr(t,e){const n=C(t),i={requestType:"VERIFY_EMAIL",idToken:await t.getIdToken()};e&&Mi(n.auth,i,e);const{email:s}=await Ac(n.auth,i);s!==t.email&&await t.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gc(t,e){return q(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jc(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=C(t),s={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await De(r,Gc(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fr(t,e){return C(t).setPersistence(e)}function Yc(t,e,n,r){return C(t).onIdTokenChanged(e,n,r)}function Xc(t,e,n){return C(t).beforeAuthStateChanged(e,n)}function pr(t){return C(t).signOut()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(t,e){return q(t,"POST","/v2/accounts/mfaEnrollment:start",V(t,e))}const Pt="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Pt,"1"),this.storage.removeItem(Pt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zc(){const t=T();return Nn(t)||xt(t)}const eu=1e3,tu=10;class Ui extends Li{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Zc()&&bc(),this.fallbackToPolling=ki(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);yc()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,tu):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},eu)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ui.type="LOCAL";const xi=Ui;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi extends Li{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Fi.type="SESSION";const Mn=Fi;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nu(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new Bt(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async u=>u(n.origin,s)),c=await nu(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Bt.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const u=Ln("",20);i.port1.start();const l=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(h){const p=h;if(p.data.eventId===u)switch(p.data.status){case"ack":clearTimeout(l),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(p.data.response);break;default:clearTimeout(l),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(){return window}function iu(t){z().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bi(){return typeof z().WorkerGlobalScope<"u"&&typeof z().importScripts=="function"}async function su(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ou(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function au(){return Bi()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vi="firebaseLocalStorageDb",cu=1,Ct="firebaseLocalStorage",$i="fbase_key";class at{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Vt(t,e){return t.transaction([Ct],e?"readwrite":"readonly").objectStore(Ct)}function uu(){const t=indexedDB.deleteDatabase(Vi);return new at(t).toPromise()}function gn(){const t=indexedDB.open(Vi,cu);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ct,{keyPath:$i})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ct)?e(r):(r.close(),await uu(),e(await gn()))})})}async function gr(t,e,n){const r=Vt(t,!0).put({[$i]:e,value:n});return new at(r).toPromise()}async function lu(t,e){const n=Vt(t,!1).get(e),r=await new at(n).toPromise();return r===void 0?null:r.value}function mr(t,e){const n=Vt(t,!0).delete(e);return new at(n).toPromise()}const du=800,hu=3;class Hi{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await gn(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>hu)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Bi()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Bt._getInstance(au()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await su(),!this.activeServiceWorker)return;this.sender=new ru(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ou()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await gn();return await gr(e,Pt,"1"),await mr(e,Pt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>gr(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>lu(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>mr(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Vt(i,!1).getAll();return new at(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),du)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Hi.type="LOCAL";const fu=Hi;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pu(t,e){return q(t,"POST","/v2/accounts/mfaSignIn:start",V(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gu(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function mu(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=j("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",gu().appendChild(r)})}function _u(t){return`__${t}${Math.floor(Math.random()*1e6)}`}new it(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu="recaptcha";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=je._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function yu(t,e,n){const r=Ee(t),i=await bu(r,e,C(n));return new Iu(i,s=>Di(r,s))}async function bu(t,e,n){var r;const i=await n.verify();try{d(typeof i=="string",t,"argument-error"),d(n.type===vu,t,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const o=s.session;if("phoneNumber"in s)return d(o.type==="enroll",t,"internal-error"),(await Qc(t,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{d(o.type==="signin",t,"internal-error");const a=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return d(a,t,"missing-multi-factor-info"),(await pu(t,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await Mc(t,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{n._reset()}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(t,e){return e?X(e):(d(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un extends st{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Q(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Q(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Q(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function wu(t){return Ni(t.auth,new Un(t),t.bypassAuthState)}function Eu(t){const{auth:e,user:n}=t;return d(n,e,"internal-error"),zc(n,new Un(t),t.bypassAuthState)}async function Tu(t){const{auth:e,user:n}=t;return d(n,e,"internal-error"),jc(n,new Un(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return wu;case"linkViaPopup":case"linkViaRedirect":return Tu;case"reauthViaPopup":case"reauthViaRedirect":return Eu;default:B(this.auth,"internal-error")}}resolve(e){Z(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Z(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Su=new it(2e3,1e4);class Re extends ji{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Re.currentPopupAction&&Re.currentPopupAction.cancel(),Re.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return d(e,this.auth,"internal-error"),e}async onExecution(){Z(this.filter.length===1,"Popup operations only handle one event");const e=Ln();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(j(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(j(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Re.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(j(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,Su.get())};e()}}Re.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ru="pendingRedirect",yt=new Map;class ku extends ji{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=yt.get(this.auth._key());if(!e){try{const r=await Ou(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}yt.set(this.auth._key(),e)}return this.bypassAuthState||yt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ou(t,e){const n=qi(e),r=zi(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}async function Au(t,e){return zi(t)._set(qi(e),"true")}function Pu(t,e){yt.set(t._key(),e)}function zi(t){return X(t._redirectPersistence)}function qi(t){return It(Ru,t.config.apiKey,t.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(t,e,n){return Cu(t,e,n)}async function Cu(t,e,n){const r=Ee(t);ec(t,e,Ft),await r._initializationPromise;const i=Wi(r,n);return await Au(i,r),i._openRedirect(r,e,"signInViaRedirect")}async function Nu(t,e,n=!1){const r=Ee(t),i=Wi(r,e),o=await new ku(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du=10*60*1e3;class Mu{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Lu(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Ki(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(j(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Du&&this.cachedEventUids.clear(),this.cachedEventUids.has(_r(e))}saveEventToCache(e){this.cachedEventUids.add(_r(e)),this.lastProcessedEventTime=Date.now()}}function _r(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Ki({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Lu(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ki(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uu(t,e={}){return q(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xu=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Fu=/^https?/;async function Bu(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Uu(t);for(const n of e)try{if(Vu(n))return}catch{}B(t,"unauthorized-domain")}function Vu(t){const e=pn(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Fu.test(n))return!1;if(xu.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $u=new it(3e4,6e4);function vr(){const t=z().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Hu(t){return new Promise((e,n)=>{var r,i,s;function o(){vr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{vr(),n(j(t,"network-request-failed"))},timeout:$u.get()})}if(!((i=(r=z().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=z().gapi)===null||s===void 0)&&s.load)o();else{const a=_u("iframefcb");return z()[a]=()=>{gapi.load?o():n(j(t,"network-request-failed"))},mu(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw bt=null,e})}let bt=null;function Wu(t){return bt=bt||Hu(t),bt}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ju=new it(5e3,15e3),zu="__/auth/iframe",qu="emulator/auth/iframe",Ku={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Gu=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Ju(t){const e=t.config;d(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Pn(e,qu):`https://${t.config.authDomain}/${zu}`,r={apiKey:e.apiKey,appName:t.name,v:Ut},i=Gu.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${rt(r).slice(1)}`}async function Yu(t){const e=await Wu(t),n=z().gapi;return d(n,t,"internal-error"),e.open({where:document.body,url:Ju(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ku,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=j(t,"network-request-failed"),a=z().setTimeout(()=>{s(o)},ju.get());function c(){z().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xu={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Qu=500,Zu=600,el="_blank",tl="http://localhost";class Ir{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function nl(t,e,n,r=Qu,i=Zu){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},Xu),{width:r.toString(),height:i.toString(),top:s,left:o}),u=T().toLowerCase();n&&(a=wi(u)?el:n),bi(u)&&(e=e||tl,c.scrollbars="yes");const l=Object.entries(c).reduce((p,[_,y])=>`${p}${_}=${y},`,"");if(Ic(u)&&a!=="_self")return rl(e||"",a),new Ir(null);const h=window.open(e||"",a,l);d(h,t,"popup-blocked");try{h.focus()}catch{}return new Ir(h)}function rl(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il="__/auth/handler",sl="emulator/auth/handler";function yr(t,e,n,r,i,s){d(t.config.authDomain,t,"auth-domain-config-required"),d(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ut,eventId:i};if(e instanceof Ft){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Ho(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[c,u]of Object.entries(s||{}))o[c]=u}if(e instanceof ot){const c=e.getScopes().filter(u=>u!=="");c.length>0&&(o.scopes=c.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const c of Object.keys(a))a[c]===void 0&&delete a[c];return`${ol(t)}?${rt(a).slice(1)}`}function ol({config:t}){return t.emulator?Pn(t,sl):`https://${t.authDomain}/${il}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt="webStorageSupport";class al{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Mn,this._completeRedirectFn=Nu,this._overrideRedirectResult=Pu}async _openPopup(e,n,r,i){var s;Z((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=yr(e,n,r,pn(),i);return nl(e,o,Ln())}async _openRedirect(e,n,r,i){return await this._originValidation(e),iu(yr(e,n,r,pn(),i)),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Z(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await Yu(e),r=new Mu(e);return n.register("authEvent",i=>(d(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Qt,{type:Qt},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Qt];o!==void 0&&n(!!o),B(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Bu(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return ki()||Nn()||xt()}}const cl=al;var br="@firebase/auth",wr="0.22.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){d(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ll(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function dl(t){Xe(new Ne("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),{apiKey:s,authDomain:o}=r.options;return((a,c)=>{d(s&&!s.includes(":"),"invalid-api-key",{appName:a.name}),d(!(o!=null&&o.includes(":")),"argument-error",{appName:a.name});const u={apiKey:s,authDomain:o,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Oi(t)},l=new Ec(a,c,u);return nc(l,n),l})(r,i)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Xe(new Ne("auth-internal",e=>{const n=Ee(e.getProvider("auth").getImmediate());return(r=>new ul(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),He(br,wr,ll(t)),He(br,wr,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl=5*60,fl=oi("authIdTokenMaxAge")||hl;let Er=null;const pl=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>fl)return;const i=n==null?void 0:n.token;Er!==i&&(Er=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function x(t=Wa()){const e=li(t,"auth");if(e.isInitialized())return e.getImmediate();const n=tc(t,{popupRedirectResolver:cl,persistence:[fu,xi,Mn]}),r=oi("authTokenSyncURL");if(r){const s=pl(r);Xc(n,s,()=>s(n.currentUser)),Yc(n,o=>s(o))}const i=Po("auth");return i&&Tc(n,`http://${i}`),n}dl("Browser");const gl=Qr(),ml={getError:t=>t.error,getSessionPersistence:t=>t.is_session_persistant,getCurrentUser:t=>t.current_user,getUid:t=>{var e;return((e=t==null?void 0:t.current_user)==null?void 0:e.uid)||null},getDisplayName:t=>{var e;return((e=t==null?void 0:t.current_user)==null?void 0:e.displayName)||null},getEmail:t=>{var e;return((e=t==null?void 0:t.current_user)==null?void 0:e.email)||null},getPhotoURL:t=>{var e;return((e=t==null?void 0:t.current_user)==null?void 0:e.photoURL)||null},getPhoneNumber:t=>{var e;return((e=t==null?void 0:t.current_user)==null?void 0:e.phoneNumber)||null},getMetadata:()=>{const t=x(gl.config.globalProperties.$authGuardFirebaseApp).currentUser;return t?t.metadata:null},isLoading:t=>t.is_loading,isAuthenticated:t=>!!(t!=null&&t.current_user),isAnonymous:t=>{var e;return((e=t==null?void 0:t.current_user)==null?void 0:e.isAnonymous)||null},isVerified:t=>{var e;return((e=t==null?void 0:t.current_user)==null?void 0:e.emailVerified)||null},isRoutePublic:t=>t.is_route_public,isFromPublicToAuth:t=>t.is_from_public_to_auth,isUserRegistrationAllowed:t=>t.config.registration,isEmailVerificationRequired:t=>t.config.verification,isEmailVerificationScrenShown:t=>t.is_email_verification_screen_shown,isEmailVerificationLinkSent:t=>t.is_email_verification_link_sent,isEmailResetPasswordLinkSent:t=>t.is_email_reset_password_link_sent,isResetPasswordScreenShown:t=>t.is_reset_password_screen_shown,isLoginWithPhoneShown:t=>t.is_login_with_phone_shown,isLoginWithProvidersActive:t=>t.config.google||t.config.facebook||t.config.phone||t.config.saml,isOnlySingleProvider:t=>{let e=0;return["google","facebook","phone","saml"].forEach(r=>{t.config[r]===!0&&e++}),e===1}};/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */var Tr;(function(t){t.pop="pop",t.push="push"})(Tr||(Tr={}));var Sr;(function(t){t.back="back",t.forward="forward",t.unknown=""})(Sr||(Sr={}));var Rr;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Rr||(Rr={}));function _l(){return void 0}const W=(...t)=>{Gi().config.debug&&console.log.apply(console,t)},vl=()=>{const t=Gi();W("[ auth check ]: execution started...");let e=!1;const r=x(t.config.firebase).currentUser,i=!!r,s=t.config.verification,o=t.is_route_public,a=t.is_from_public_to_auth;if(s&&W("[ auth check ]: email verification required: [",s,"]"),s&&r&&r.isAnonymous)W("[ auth check ]: anonymous user BLOCKED unable to verify email!"),t.is_authguard_dialog_shown=!0,t.is_authguard_dialog_persistent=!1;else if(o)e=!0,t.is_authguard_dialog_shown=!1,t.is_authguard_dialog_persistent=!1;else if(!o&&a&&!i)t.is_authguard_dialog_shown=!0,t.is_authguard_dialog_persistent=!1;else if(i){W("[ auth check ]: authenticated currentUser ID: [",r.uid,"]");let c=r.emailVerified||!1;const u=r.email?r.email.split("@")[1]:"";W("[ auth check ]: user email verified: [",c,"]"),e=c,s===!1?(W("[ auth check ]: authguard config does not require email verification"),e=!0):Array.isArray(s)&&!s.includes(u)?(W("[ auth check ]: user email domain: [",u,"] not included on domain list that requires email verification to authenticate:",s),e=!0):(W("[ auth check ]: authguard config requires email verification"),t.error=null,t.is_email_verification_screen_shown=!0),e?(t.is_authguard_dialog_shown=!1,t.is_authguard_dialog_persistent=!1):(t.is_authguard_dialog_shown=!0,a?t.is_authguard_dialog_persistent=!1:t.is_authguard_dialog_persistent=!0)}else W("[ auth check ]: currentUser is NOT authenticated"),t.is_authguard_dialog_shown=!0,t.is_authguard_dialog_persistent=!1;return W("[ auth check ]: is route ALLOWED: [",e,"]"),e},Il={SET_EMAIL_VERIFICATION_SCREEN_SHOWN(t){this.is_email_verification_screen_shown=t,t===!1&&(this.error=null)},SET_PASSWORD_RESET_SCREEN_SHOWN(t){this.tab=t?1:0,this.is_reset_password_screen_shown=t,t===!1&&(this.is_email_reset_password_link_sent=!1)},SET_SHOW_LOGIN_WITH_PHONE(t){this.tab=0,this.is_login_with_phone_shown=t,t===!1&&(this.sign_by_phone_step=1)},authGuardOnRouterReady(){this.config.debug&&console.log("[ auth guard ]: revalidate when vue router ready")},initializeGuard(){const t=this.config.debug,e=x(this.config.firebase).currentUser;if(e){const{uid:n,displayName:r,email:i,emailVerified:s,isAnonymous:o,phoneNumber:a,photoURL:c}=e,u={uid:n,displayName:r,email:i,emailVerified:s,isAnonymous:o,phoneNumber:a,photoURL:c};this.current_user={...u}}else this.current_user=null;t&&console.log("[ auth guard ]: component initialized for user: [",e?e.uid:null,"]"),this.is_email_verification_screen_shown=!1,vl(),this.authGuardOnRouterReady()},loginWithEmail({email:t,password:e}){return new Promise(async(n,r)=>{try{const i=x(this.config.firebase),s=_l();return this.is_loading=!0,await pr(i),this.config.session==="browser"?await fr(i,Mn):await fr(i,xi),await dr(i,t,e),s.currentRoute.name===null&&s.push(s.currentRoute.path).catch(()=>{}),this.is_loading=!1,n()}catch(i){return this.error=i,this.is_loading=!1,r()}})},loginWithGoogle(){const t=new J,e=x(this.config.firebase);Xt(e,t)},loginWithFacebook(){const t=new G,e=x(this.config.firebase);Xt(e,t)},loginWithPhone(){},loginWithSaml(){const t=new Ot(this.config.saml_provider_id),e=x(this.config.firebase);Xt(e,t)},async textPhoneVerificationCode({phoneNumber:t,recaptchaVerifier:e}){try{this.is_loading=!0,this.text_confirmation=null;const n="+1"+t.replace(/\D/g,""),r=x(this.config.firebase),i=await yu(r,n,e);this.is_loading=!1,this.sign_by_phone_step=2,this.text_confirmation=i}catch(n){this.error=n,this.is_loading=!1}},async confirmCode(t){try{this.is_loading=!0,console.log("confirmationCode",t.join()),await this.text_confirmation.confirm(t.join()),this.is_loading=!1,this.sign_by_phone_step=1}catch(e){this.error=e,this.is_loading=!1,this.sign_by_phone_step=1}},async registerUser({displayName:t,email:e,password:n}){try{this.is_loading=!0;const r=this.config.email,i=x(this.config.firebase);await Kc(i,e,n),await dr(i,e,n),await Jc(i.currentUser,{displayName:t});const s="XXX";(r===!0||Array.isArray(r)&&r.includes(s))&&await hr(i.currentUser),this.is_loading=!1}catch(r){this.error=r,this.is_loading=!1}},async emailPasswordResetLink(t){try{this.is_loading=!0;const e=x(this.config.firebase);await qc(e,t),this.error=!1,this.is_loading=!1,this.is_email_reset_password_link_sent=!0}catch(e){this.error=e,this.is_loading=!1}},signOut(){const t=this.config.debug,e=x(this.config.firebase);return t&&console.log("[ auth guard ]: signOut request"),pr(e)},sendVerificationEmail(){return new Promise(async(t,e)=>{try{this.is_loading=!0;const n=x(this.config.firebase);return await hr(n.currentUser),this.is_loading=!1,this.is_email_verification_link_sent=!0,t()}catch(n){return this.error=n,this.is_loading=!1,e()}})}},Gi=bo("auth",{state:wo,getters:ml,actions:Il});function kr(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,r)}return n}function ze(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?kr(Object(n),!0).forEach(function(r){Ji(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):kr(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function qe(t){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?qe=function(e){return typeof e}:qe=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},qe(t)}function Ji(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Yi="_",yl="function",bl=[];function wl(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:bl,e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Yi;if(!Xi(t))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(t.indexOf(e)!==-1)throw new Error(`Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.

`+"The placeholder character that was received is: ".concat(JSON.stringify(e),`

`)+"The mask that was received is: ".concat(JSON.stringify(t)));return t.map(function(n){return n instanceof RegExp?e:n}).join("")}function Xi(t){return Array.isArray&&Array.isArray(t)||t instanceof Array}var El="[]";function Tl(t){for(var e=[],n;n=t.indexOf(El),n!==-1;)e.push(n),t.splice(n,1);return{maskWithoutCaretTraps:t,indexes:e}}var Sl=[],ge="";function Qi(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ge,e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Sl,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!Xi(e))if(qe(e)===yl)e=e(t,n),e=Tl(e).maskWithoutCaretTraps;else throw new Error("Text-mask:conformToMask; The mask property must be an array.");var r=n.guide,i=r===void 0?!0:r,s=n.previousConformedValue,o=s===void 0?ge:s,a=n.placeholderChar,c=a===void 0?Yi:a,u=n.placeholder,l=u===void 0?wl(e,c):u,h=n.currentCaretPosition,p=n.keepCharPositions,_=i===!1&&o!==void 0,y=t.length,k=o.length,w=l.length,fe=e.length,v=y-k,N=v>0,O=h+(N?-v:0),E=O+Math.abs(v);if(p===!0&&!N){for(var D=ge,m=O;m<E;m++)l[m]===c&&(D+=c);t=t.slice(0,O)+D+t.slice(O,y)}for(var f=t.split(ge).map(function(ss,Bn){return{char:ss,isNew:Bn>=O&&Bn<E}}),b=y-1;b>=0;b--){var M=f[b].char;if(M!==c){var pe=b>=O&&k===fe;M===l[pe?b-v:b]&&f.splice(b,1)}}var L=ge,ct=!1;e:for(var U=0;U<w;U++){var S=l[U];if(S===c){if(f.length>0)for(;f.length>0;){var Fn=f.shift(),ut=Fn.char,rs=Fn.isNew;if(ut===c&&_!==!0){L+=c;continue e}else if(e[U].test(ut)){if(p!==!0||rs===!1||o===ge||i===!1||!N)L+=ut;else{for(var is=f.length,Ht=null,lt=0;lt<is;lt++){var Wt=f[lt];if(Wt.char!==c&&Wt.isNew===!1)break;if(Wt.char===c){Ht=lt;break}}Ht!==null?(L+=ut,f.splice(Ht,1)):U--}continue e}else ct=!0}_===!1&&(L+=l.substr(U,w));break}else L+=S}if(_&&N===!1){for(var jt=null,dt=0;dt<L.length;dt++)l[dt]===c&&(jt=dt);jt!==null?L=L.substr(0,jt+1):L=ge}return{conformedValue:L,meta:{someCharsRejected:ct}}}var mn={__nextCharOptional__:!0},$t={"#":/\d/,A:/[a-z]/i,N:/[a-z0-9]/i,"?":mn,X:/./},Rl=function(e){var n=e.lastIndexOf("/");return new RegExp(e.slice(1,n),e.slice(n+1))},kl=function(e){return Rl(e.toString().replace(/.(\/)[gmiyus]{0,6}$/,function(n){return n.replace("/","?/")}))},Ol=function(e){return"[\\^$.|?*+()".indexOf(e)>-1?"\\".concat(e):e},Al=function(e){return new RegExp("/[".concat(Ol(e),"]/"))},Pl=function(e){return e instanceof RegExp},Cl=function(e){return Pl(e)?e:Al(e)};function Zi(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:$t;return t.map(function(n,r,i){var s=e[n]||n,o=i[r-1],a=e[o]||o;return s===mn?null:a===mn?kl(Cl(s)):s}).filter(Boolean)}function Nl(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:$t;return Zi(t.split(""),e)}function Dl(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:$t,n=t.map(function(r){return r instanceof RegExp?r:typeof r=="string"?r.split(""):null}).filter(Boolean).reduce(function(r,i){return r.concat(i)},[]);return Zi(n,e)}var Ml=function(e,n){var r=document.createEvent("HTMLEvents");r.initEvent(n,!0,!0),e.dispatchEvent(r)},Zt=function(e){return e instanceof HTMLInputElement?e:e.querySelector("input")||e},es=function(e){return typeof e=="function"},xn=function(e){return typeof e=="string"},Ll=function(e){return e instanceof RegExp};function ts(t,e){return Array.isArray(t)?Dl(t,e):es(t)?t:xn(t)&&t.length>0?Nl(t,e):t}function Ul(){var t=new Map,e={previousValue:"",mask:[]};function n(s){return t.get(s)||ze({},e)}function r(s,o){t.set(s,ze(ze({},n(s)),o))}function i(s){t.delete(s)}return{partiallyUpdate:r,remove:i,get:n}}function ns(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:$t;return t===null||Array.isArray(t)||qe(t)!=="object"?e:Object.keys(t).reduce(function(n,r){var i=t[r];return i!==null&&!(i instanceof RegExp)?n:ze(ze({},n),{},Ji({},r,i))},e)}var Nt=Ul();function xl(t){Ml(t,"input")}function Or(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=t.value,r=Nt.get(t),i=r.previousValue,s=r.mask,o=n!==i,a=n.length>i.length,c=n&&o&&a;if((e||c)&&s){var u=Qi(n,s,{guide:!1}),l=u.conformedValue;t.value=l,xl(t)}Nt.partiallyUpdate(t,{previousValue:n})}function Ar(t,e,n){var r=ts(e,n);Nt.partiallyUpdate(t,{mask:r})}function Pr(t){var e=Array.isArray(t)?t:[t],n=e.filter(function(r){return xn(r)||Ll(r)});return n.toString()}function Fl(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=ns(t&&t.placeholders);return{bind:function(r,i){var s=i.value;r=Zt(r),Ar(r,s,e),Or(r)},componentUpdated:function(r,i){var s=i.value,o=i.oldValue;r=Zt(r);var a=es(s)||Pr(o)!==Pr(s);a&&Ar(r,s,e),Or(r,a)},unbind:function(r){r=Zt(r),Nt.remove(r)}}}Fl();function Bl(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=ns(t&&t.placeholders);return function(n,r){if(!xn(n)&&!Number.isFinite(n))return n;var i=ts(r,e),s=Qi("".concat(n),i,{guide:!1}),o=s.conformedValue;return o}}Bl();
