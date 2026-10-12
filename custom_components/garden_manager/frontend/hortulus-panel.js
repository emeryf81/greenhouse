var Xn=Object.defineProperty;var Jn=Object.getOwnPropertyDescriptor;var h=(c,r,e,t)=>{for(var s=t>1?void 0:t?Jn(r,e):r,n=c.length-1,a;n>=0;n--)(a=c[n])&&(s=(t?a(r,e,s):a(s))||s);return t&&s&&Xn(r,e,s),s};var $t=globalThis,_t=$t.ShadowRoot&&($t.ShadyCSS===void 0||$t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Gt=Symbol(),Is=new WeakMap,Qe=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==Gt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(_t&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=Is.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&Is.set(e,r))}return r}toString(){return this.cssText}},Ns=c=>new Qe(typeof c=="string"?c:c+"",void 0,Gt),S=(c,...r)=>{let e=c.length===1?c[0]:r.reduce((t,s,n)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+c[n+1],c[0]);return new Qe(e,c,Gt)},Os=(c,r)=>{if(_t)c.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),s=$t.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,c.appendChild(t)}},Wt=_t?c=>c:c=>c instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return Ns(e)})(c):c;var{is:Qn,defineProperty:Vn,getOwnPropertyDescriptor:ea,getOwnPropertyNames:ta,getOwnPropertySymbols:sa,getPrototypeOf:na}=Object,wt=globalThis,Bs=wt.trustedTypes,aa=Bs?Bs.emptyScript:"",ia=wt.reactiveElementPolyfillSupport,Ve=(c,r)=>c,et={toAttribute(c,r){switch(r){case Boolean:c=c?aa:null;break;case Object:case Array:c=c==null?c:JSON.stringify(c)}return c},fromAttribute(c,r){let e=c;switch(r){case Boolean:e=c!==null;break;case Number:e=c===null?null:Number(c);break;case Object:case Array:try{e=JSON.parse(c)}catch{e=null}}return e}},kt=(c,r)=>!Qn(c,r),Ds={attribute:!0,type:String,converter:et,reflect:!1,useDefault:!1,hasChanged:kt};Symbol.metadata??=Symbol("metadata"),wt.litPropertyMetadata??=new WeakMap;var fe=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=Ds){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(r,t,e);s!==void 0&&Vn(this.prototype,r,s)}}static getPropertyDescriptor(r,e,t){let{get:s,set:n}=ea(this.prototype,r)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let i=s?.call(this);n?.call(this,a),this.requestUpdate(r,i,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??Ds}static _$Ei(){if(this.hasOwnProperty(Ve("elementProperties")))return;let r=na(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(Ve("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ve("properties"))){let e=this.properties,t=[...ta(e),...sa(e)];for(let s of t)this.createProperty(s,e[s])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let s of t)e.unshift(Wt(s))}else r!==void 0&&e.push(Wt(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Os(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),s=this.constructor._$Eu(r,t);if(s!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:et).toAttribute(e,t.type);this._$Em=r,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(r,e){let t=this.constructor,s=t._$Eh.get(r);if(s!==void 0&&this._$Em!==s){let n=t.getPropertyOptions(s),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:et;this._$Em=s;let i=a.fromAttribute(e,n.type);this[s]=i??this._$Ej?.get(s)??i,this._$Em=null}}requestUpdate(r,e,t,s=!1,n){if(r!==void 0){let a=this.constructor;if(s===!1&&(n=this[r]),t??=a.getPropertyOptions(r),!((t.hasChanged??kt)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(r)&&!this.hasAttribute(a._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:s,wrapped:n},a){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,a??e??this[r]),n!==!0||a!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),s===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,n]of t){let{wrapped:a}=n,i=this[s];a!==!0||this._$AL.has(s)||i===void 0||this.C(s,void 0,n,i)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};fe.elementStyles=[],fe.shadowRootOptions={mode:"open"},fe[Ve("elementProperties")]=new Map,fe[Ve("finalized")]=new Map,ia?.({ReactiveElement:fe}),(wt.reactiveElementVersions??=[]).push("2.1.2");var Qt=globalThis,Fs=c=>c,xt=Qt.trustedTypes,Us=xt?xt.createPolicy("lit-html",{createHTML:c=>c}):void 0,Ys="$lit$",ke=`lit$${Math.random().toFixed(9).slice(2)}$`,Xs="?"+ke,oa=`<${Xs}>`,Pe=document,st=()=>Pe.createComment(""),nt=c=>c===null||typeof c!="object"&&typeof c!="function",Vt=Array.isArray,ra=c=>Vt(c)||typeof c?.[Symbol.iterator]=="function",qt=`[ 	
\f\r]`,tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Gs=/-->/g,Ws=/>/g,Me=RegExp(`>|${qt}(?:([^\\s"'>=/]+)(${qt}*=${qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qs=/'/g,Zs=/"/g,Js=/^(?:script|style|textarea|title)$/i,es=c=>(r,...e)=>({_$litType$:c,strings:r,values:e}),o=es(1),P=es(2),pi=es(3),ve=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ks=new WeakMap,ze=Pe.createTreeWalker(Pe,129);function Qs(c,r){if(!Vt(c)||!c.hasOwnProperty("raw"))throw Error("invalid template strings array");return Us!==void 0?Us.createHTML(r):r}var la=(c,r)=>{let e=c.length-1,t=[],s,n=r===2?"<svg>":r===3?"<math>":"",a=tt;for(let i=0;i<e;i++){let l=c[i],d,p,m=-1,v=0;for(;v<l.length&&(a.lastIndex=v,p=a.exec(l),p!==null);)v=a.lastIndex,a===tt?p[1]==="!--"?a=Gs:p[1]!==void 0?a=Ws:p[2]!==void 0?(Js.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Me):p[3]!==void 0&&(a=Me):a===Me?p[0]===">"?(a=s??tt,m=-1):p[1]===void 0?m=-2:(m=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Me:p[3]==='"'?Zs:qs):a===Zs||a===qs?a=Me:a===Gs||a===Ws?a=tt:(a=Me,s=void 0);let b=a===Me&&c[i+1].startsWith("/>")?" ":"";n+=a===tt?l+oa:m>=0?(t.push(d),l.slice(0,m)+Ys+l.slice(m)+ke+b):l+ke+(m===-2?i:b)}return[Qs(c,n+(c[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},at=class c{constructor({strings:r,_$litType$:e},t){let s;this.parts=[];let n=0,a=0,i=r.length-1,l=this.parts,[d,p]=la(r,e);if(this.el=c.createElement(d,t),ze.currentNode=this.el.content,e===2||e===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=ze.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Ys)){let v=p[a++],b=s.getAttribute(m).split(ke),x=/([.?@])?(.*)/.exec(v);l.push({type:1,index:n,name:x[2],strings:b,ctor:x[1]==="."?Kt:x[1]==="?"?Yt:x[1]==="@"?Xt:De}),s.removeAttribute(m)}else m.startsWith(ke)&&(l.push({type:6,index:n}),s.removeAttribute(m));if(Js.test(s.tagName)){let m=s.textContent.split(ke),v=m.length-1;if(v>0){s.textContent=xt?xt.emptyScript:"";for(let b=0;b<v;b++)s.append(m[b],st()),ze.nextNode(),l.push({type:2,index:++n});s.append(m[v],st())}}}else if(s.nodeType===8)if(s.data===Xs)l.push({type:2,index:n});else{let m=-1;for(;(m=s.data.indexOf(ke,m+1))!==-1;)l.push({type:7,index:n}),m+=ke.length-1}n++}}static createElement(r,e){let t=Pe.createElement("template");return t.innerHTML=r,t}};function Be(c,r,e=c,t){if(r===ve)return r;let s=t!==void 0?e._$Co?.[t]:e._$Cl,n=nt(r)?void 0:r._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(c),s._$AT(c,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(r=Be(c,s._$AS(c,r.values),s,t)),r}var Zt=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,s=(r?.creationScope??Pe).importNode(e,!0);ze.currentNode=s;let n=ze.nextNode(),a=0,i=0,l=t[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new it(n,n.nextSibling,this,r):l.type===1?d=new l.ctor(n,l.name,l.strings,this,r):l.type===6&&(d=new Jt(n,this,r)),this._$AV.push(d),l=t[++i]}a!==l?.index&&(n=ze.nextNode(),a++)}return ze.currentNode=Pe,s}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},it=class c{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=Be(this,r,e),nt(r)?r===u||r==null||r===""?(this._$AH!==u&&this._$AR(),this._$AH=u):r!==this._$AH&&r!==ve&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):ra(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==u&&nt(this._$AH)?this._$AA.nextSibling.data=r:this.T(Pe.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,s=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=at.createElement(Qs(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new Zt(s,this),a=n.u(this.options);n.p(e),this.T(a),this._$AH=n}}_$AC(r){let e=Ks.get(r.strings);return e===void 0&&Ks.set(r.strings,e=new at(r)),e}k(r){Vt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let n of r)s===e.length?e.push(t=new c(this.O(st()),this.O(st()),this,this.options)):t=e[s],t._$AI(n),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=Fs(r).nextSibling;Fs(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},De=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,s,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=r,this.name=e,this._$AM=s,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=u}_$AI(r,e=this,t,s){let n=this.strings,a=!1;if(n===void 0)r=Be(this,r,e,0),a=!nt(r)||r!==this._$AH&&r!==ve,a&&(this._$AH=r);else{let i=r,l,d;for(r=n[0],l=0;l<n.length-1;l++)d=Be(this,i[t+l],e,l),d===ve&&(d=this._$AH[l]),a||=!nt(d)||d!==this._$AH[l],d===u?r=u:r!==u&&(r+=(d??"")+n[l+1]),this._$AH[l]=d}a&&!s&&this.j(r)}j(r){r===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Kt=class extends De{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===u?void 0:r}},Yt=class extends De{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==u)}},Xt=class extends De{constructor(r,e,t,s,n){super(r,e,t,s,n),this.type=5}_$AI(r,e=this){if((r=Be(this,r,e,0)??u)===ve)return;let t=this._$AH,s=r===u&&t!==u||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,n=r!==u&&(t===u||s);s&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Jt=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){Be(this,r)}};var da=Qt.litHtmlPolyfillSupport;da?.(at,it),(Qt.litHtmlVersions??=[]).push("3.3.3");var Vs=(c,r,e)=>{let t=e?.renderBefore??r,s=t._$litPart$;if(s===void 0){let n=e?.renderBefore??null;t._$litPart$=s=new it(r.insertBefore(st(),n),n,void 0,e??{})}return s._$AI(c),s};var ts=globalThis,E=class extends fe{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Vs(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ve}};E._$litElement$=!0,E.finalized=!0,ts.litElementHydrateSupport?.({LitElement:E});var ca=ts.litElementPolyfillSupport;ca?.({LitElement:E});(ts.litElementVersions??=[]).push("4.2.2");var M=c=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(c,r)}):customElements.define(c,r)};var ha={attribute:!0,type:String,converter:et,reflect:!1,hasChanged:kt},pa=(c=ha,r,e)=>{let{kind:t,metadata:s}=e,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),t==="setter"&&((c=Object.create(c)).wrapped=!0),n.set(e.name,c),t==="accessor"){let{name:a}=e;return{set(i){let l=r.get.call(this);r.set.call(this,i),this.requestUpdate(a,l,c,!0,i)},init(i){return i!==void 0&&this.C(a,void 0,c,i),i}}}if(t==="setter"){let{name:a}=e;return function(i){let l=this[a];r.call(this,i),this.requestUpdate(a,l,c,!0,i)}}throw Error("Unsupported decorator location: "+t)};function g(c){return(r,e)=>typeof e=="object"?pa(c,r,e):((t,s,n)=>{let a=s.hasOwnProperty(n);return s.constructor.createProperty(n,t),a?Object.getOwnPropertyDescriptor(s,n):void 0})(c,r,e)}function f(c){return g({...c,state:!0,attribute:!1})}var je=(c,r,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(c,r,e),e);function be(c,r){return(e,t,s)=>{let n=a=>a.renderRoot?.querySelector(c)??null;if(r){let{get:a,set:i}=typeof t=="object"?e:s??(()=>{let l=Symbol();return{get(){return this[l]},set(d){this[l]=d}}})();return je(e,t,{get(){let l=a.call(this);return l===void 0&&(l=n(this),(l!==null||this.hasUpdated)&&i.call(this,l)),l}})}return je(e,t,{get(){return n(this)}})}}var St="garden_manager",ot=class{constructor(r){this.hass=r}setHass(r){this.hass=r}call(r,e={}){return this.hass.connection.sendMessagePromise({type:`${St}/${r}`,...e})}subscribe(r){return this.hass.connection.subscribeMessage(r,{type:`${St}/subscribe`})}plants(){return this.call("plants")}savePlant(r,e){return this.call("plants/save",{plant:r,mode:e})}deletePlant(r){return this.call("plants/delete",{plant_id:r})}plantWindows(r,e,t){return this.call("plants/windows",{plant_id:r,zone_id:e??null,season:t??null})}savePlan(r,e,t){return this.call("plan/save",{...r,base_revision:e,...t!=null?{season:t}:{}})}yearPreview(r){return this.call("year/preview",r!=null?{from_season:r}:{})}yearApply(r){return this.call("year/apply",r)}deleteLayout(r){return this.call("layout/delete",{season:r})}syslog(r={}){return this.call("syslog/list",r)}undo(r,e=!1){return this.call("syslog/undo",{entry_id:r,force:e})}checkBed(r,e){return this.call("plan/check",{bed:r,plantings:e})}succession(r,e,t,s){return this.call("plan/succession",{planting:r,count:e,interval_days:t,placement:s})}exportPlan(r,e=!1){return this.call("plan/export",{format:r,include_tasks:e})}importPlan(r,e){return this.call("plan/import",{content:r,mode:e})}addTask(r){return this.call("tasks/add",r)}taskAction(r,e,t={}){return this.call("tasks/action",{task_id:r,action:e,...t})}saveSettings(r){return this.call("settings/save",{settings:r})}autofill(r){return this.call("plan/autofill",r)}autofillApply(r,e,t,s){return this.call("plan/autofill/apply",{plantings:r,replace_beds:e,base_revision:t,...s!=null?{plan_from:s}:{}})}newPlan(r,e,t){return this.call("plan/new",{season:r,start:e,...t?{old_name:t}:{}})}activatePlan(r,e){return this.call("plan/activate",{plan_id:r,...e?{old_name:e}:{}})}deletePlan(r){return this.call("plan/delete",{plan_id:r})}plantingsSeason(r){return this.call("plantings/season",{season:r})}updatePlanting(r,e){return this.call("planting/update",{planting_id:r,changes:e})}updatePlantings(r,e){return this.call("plantings/update_many",{planting_ids:r,changes:e})}fixIssue(r){return this.call("analysis/fix",{code:r.code,params:r.params,refs:r.refs})}comparePlans(r,e){return this.call("plan/compare",{a:r,b:e})}planning(r){return this.call("planning",{season:r})}stillPossible(r){return this.call("analysis/still_possible",{season:r})}analysis(){return this.call("analysis")}explain(r,e,t=!0){return this.call("analysis/explain",{plant_id:r,season:e??null,match_zone:t})}printPreview(r){return this.call("print/render",{options:r})}async printPdf(r){let e=new URLSearchParams;for(let[a,i]of Object.entries(r))i==null||i===""||e.set(a,Array.isArray(i)?i.join(","):String(i));let t=await this.hass.fetchWithAuth(`/api/${St}/print?${e.toString()}`);if(!t.ok)throw new Error(`${t.status} ${await t.text()}`);let s=t.headers.get("Content-Disposition")??"",n=/filename="([^"]+)"/.exec(s)?.[1]??"hortulus.pdf";return{blob:await t.blob(),filename:n}}exportPdfToConfig(r){return this.hass.callService(St,"export_pdf",r)}handbookIndex(r){return this.call("handbook/index",r?{lang:r}:{})}handbookChapter(r,e){return this.call("handbook/chapter",{chapter_id:r,...e?{lang:e}:{}})}handbookSearch(r,e){return this.call("handbook/search",{query:r,...e?{lang:e}:{}})}irrigationPlan(){return this.call("irrigation/plan")}irrigationRun(r,e){return this.call("irrigation/run",{...r?{bed_ids:r}:{},...e?{amount_mm:e}:{}})}irrigationStop(){return this.call("irrigation/stop")}irrigationTest(r,e=5,t=!0){return this.call("irrigation/test",{entity_id:r,seconds:e,with_pump:t})}irrigationClose(r){return this.call("irrigation/close",{entity_id:r})}async history(r,e,t=new Date){return r.length?this.hass.connection.sendMessagePromise({type:"history/history_during_period",start_time:e.toISOString(),end_time:t.toISOString(),entity_ids:r,minimal_response:!0,no_attributes:!0,significant_changes_only:!1}):{}}advice(){return this.call("advice")}qaOptions(){return this.call("qa/options")}qaAsk(r,e,t){return this.call("qa/ask",{subject:r,problem:e,target:t})}supplies(){return this.call("supplies")}records(){return this.call("records/overview")}logHarvest(r){return this.call("records/harvest/add",r)}deleteRecord(r,e){return this.call("records/delete",{kind:r,record_id:e})}saveJournal(r){return this.call("records/journal/save",{entry:r})}saveSeed(r){return this.call("records/seeds/save",{packet:r})}saveSoilTest(r,e){return this.call("records/soil/save",{bed_id:r,test:e})}deleteSoilTest(r,e){return this.call("records/soil/delete",{bed_id:r,date:e})}async uploadPhoto(r){let e=new FormData;e.append("file",r);let t=await this.hass.fetchWithAuth("/api/image/upload",{method:"POST",body:e});if(!t.ok)throw new Error(`Upload failed (${t.status})`);return(await t.json()).id}},Re=(c,r="256x256")=>c.startsWith("http")||c.startsWith("/")?c:`/api/image/serve/${c}/${r}`;var ss=(c=32)=>P`
  <svg width=${c} height=${c} viewBox="0 0 64 64" role="img" aria-label="Hortulus" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hl-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#5A9C4B"></stop>
        <stop offset="1" stop-color="#2F5D2A"></stop>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#hl-bg)"></rect>
    <circle cx="47.5" cy="16.5" r="4.2" fill="#E8A33D"></circle>
    <path d="M15 49V31a17 17 0 0 1 34 0v18" fill="none" stroke="#F3F8EF" stroke-width="3.4" stroke-linecap="round"></path>
    <path d="M32 49V33.5" stroke="#FBEFD9" stroke-width="3" stroke-linecap="round"></path>
    <path d="M32 39c-7.5 0-11.5-4.8-11.5-10.6 6.4-.2 11.5 3.4 11.5 10.6z" fill="#9CC58A"></path>
    <path d="M32 34.5c0-7.6 4.6-12.4 12-12.6.2 7.4-4.6 12.6-12 12.6z" fill="#E4F0DC"></path>
    <path d="M12 49.5h40" stroke="#C4A587" stroke-width="3.4" stroke-linecap="round"></path>
    <path d="M19 55h26" stroke="#A07B5A" stroke-width="3" stroke-linecap="round" opacity=".9"></path>
  </svg>`;var ns={"app.name":"Hortulus","app.tagline":"Your vegetable garden, planned and cared for","nav.dashboard":"Today","nav.planner":"Planner","nav.library":"Plants","nav.calendar":"Calendar","nav.settings":"Settings","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.previous":"Previous","common.next":"Next","lib.in_garden":"In your garden","common.close":"Close","common.add":"Add","common.edit":"Edit","common.none":"None","common.loading":"Loading your garden\u2026","common.not_loaded":"Hortulus is not set up yet. Add the integration under Settings \u2192 Devices & services.","common.minutes":"{n} min","common.days":"{n} days","common.cm":"{n} cm","common.today":"Today","common.tomorrow":"Tomorrow","common.yesterday":"Yesterday","common.overdue":"Overdue","common.unknown":"Unknown","common.search":"Search","common.all":"All","common.season":"Season {year}","common.admin_only":"Only administrators can change the plan.","common.saved":"Saved","common.saving":"Saving\u2026","common.unsaved":"Unsaved changes","common.conflict":"Changed elsewhere - reloaded","common.error":"Something went wrong: {message}","dash.greeting_morning":"Good morning","dash.greeting_afternoon":"Good afternoon","dash.greeting_evening":"Good evening","dash.today_tasks":"Today's tasks","dash.no_tasks":"Nothing to do today. Enjoy the garden!","dash.show_all":"Show all {n} tasks in the calendar","dash.total_time":"About {minutes} min of work","dash.beds":"Beds","dash.weather":"Next 48 hours","dash.greenhouse":"Greenhouse","dash.coming_up":"Coming up","dash.gdd":"Growing degree days","dash.gdd_since":"since {date}","dash.frost_risk":"Frost risk","dash.min_temp":"Lowest {temp} \xB0C","dash.rain":"Rain {mm} mm","dash.inside":"Inside {temp} \xB0C","dash.limits":"Crops tolerate {min}\u2013{max} \xB0C","dash.no_sensor":"No sensor","dash.active_crops":"{n} crops in the ground","dash.forecast_missing":"No forecast - advice is less precise.","planner.season":"Season","planner.undo":"Undo","planner.redo":"Redo","planner.snap":"Snap to grid","planner.zoom_in":"Zoom in","planner.zoom_out":"Zoom out","planner.fit":"Fit to screen","planner.add_bed":"Add bed","planner.add_zone":"Add zone","planner.overlay_companions":"Companions","planner.overlay_moisture":"Moisture","planner.overlay_temperature":"Temperature","planner.view_date":"Show garden on","planner.palette":"Plants","planner.palette_hint":"Drag a plant onto a bed, or press Enter to add it to the selected bed.","planner.layout":"Layout","planner.layout.single":"Single","planner.layout.block":"Block","planner.layout.row":"Row","planner.inspector":"Details","planner.nothing_selected":"Select a bed or planting to see details. Press ? for keyboard shortcuts.","planner.method":"Method","planner.method.indoor_sow":"Sow indoors, plant out","planner.method.direct_sow":"Sow in place","planner.method.transplant":"Plant (bought plants / sets)","planner.status":"Status","planner.count":"{n} plants","planner.timeline":"Timeline","planner.succession":"Succession sowing","planner.succession_count":"Number of sowings","planner.succession_interval":"Every (days)","planner.succession_placement":"Placement","planner.succession.split":"Split the area in strips","planner.succession.stack":"Same spot, one after another","planner.succession_create":"Create sowings","planner.succession_dropped":"{n} sowings fell outside the sowing window and were skipped.","planner.duplicate":"Duplicate","planner.remove":"Remove","planner.bed_name":"Name","planner.zone":"Zone","planner.kind":"Type","planner.width":"Width (cm)","planner.length":"Length (cm)","planner.orientation":"Row direction (\xB0)","planner.soil":"Soil","planner.shade":"Shade (%)","planner.wind":"Wind","planner.score":"Companion score","planner.warnings":"Warnings","planner.no_warnings":"No conflicts - nice combination!","planner.out_of_bounds":"Partly outside the bed.","planner.placed":"{plant} placed in {bed}.","planner.moved":"{name} moved.","planner.removed":"{name} removed.","planner.no_bed_here":"Drop plants onto a bed.","planner.export_json":"Export JSON","planner.export_yaml":"Export YAML","planner.import":"Import plan","planner.import_mode":"Import mode","planner.import_merge":"Merge with current plan","planner.import_replace":"Replace current plan","planner.imported":"Imported: {beds} beds, {plantings} plantings.","planner.shortcuts":"Keyboard shortcuts","planner.legend":"Plant families","planner.new_bed":"New bed","planner.new_zone":"New zone","shortcut.move":"Move selection (Shift = 10\xD7)","shortcut.undo":"Undo","shortcut.redo":"Redo","shortcut.delete":"Remove selection","shortcut.duplicate":"Duplicate selection","shortcut.grid":"Toggle snap-to-grid","shortcut.companions":"Toggle companion overlay","shortcut.moisture":"Toggle moisture overlay","shortcut.zoom":"Zoom in / out","shortcut.escape":"Clear selection","shortcut.cycle":"Select next / previous item","shortcut.help":"Show this help","lib.title":"Plant library","lib.search":"Search by name, latin name or family","lib.family":"Family","lib.filter_greenhouse":"Greenhouse","lib.filter_quick":"Quick crops","lib.filter_custom":"My plants","lib.add_custom":"New plant","lib.customize":"Customize","lib.reset":"Reset to built-in","lib.spacing":"Spacing","lib.row_spacing":"Row spacing","lib.depth":"Sowing depth","lib.germination":"Germination","lib.maturity":"Days to maturity","lib.soil_temp":"Min. soil temperature","lib.frost":"Frost tolerance","lib.min_temp":"Minimum temperature","lib.greenhouse":"Greenhouse","lib.water":"Water","lib.nutrients":"Nutrients","lib.rotation":"Rotation","lib.rotation_years":"{n} years before the same family returns","lib.open_plant":"Show this plant","lib.friends":"Good companions","lib.enemies":"Keep apart from","lib.pests":"Pests","lib.diseases":"Diseases","lib.care":"Care","lib.calendar":"Sowing calendar","lib.indoor_sow":"Sow indoors","lib.direct_sow":"Sow outdoors","lib.transplant":"Plant out","lib.harvest":"Harvest","lib.source.builtin":"Built-in","lib.source.custom":"Custom","lib.source.override":"Customized","lib.id":"Identifier","lib.name_en":"Name (English)","lib.name_nl":"Name (Dutch)","lib.scientific":"Scientific name","lib.variety":"Variety","lib.habit":"Growth habit","lib.windows_hint":"Weeks relative to the average last spring frost (negative = before).","lib.weeks":"weeks","lib.from":"from","lib.to":"to","lib.saved":"{plant} saved.","cal.month":"Month","cal.week":"Week","cal.list":"List","cal.prev":"Previous","cal.next":"Next","cal.show_done":"Show completed","cal.add_task":"New task","cal.all_beds":"All beds","task.complete":"Done","task.skip":"Skip","task.reopen":"Reopen","task.postpone":"Postpone","task.postpone_1":"+1 day","task.postpone_3":"+3 days","task.postpone_7":"+1 week","task.postpone_to":"Move to date","task.note":"Note","task.notes":"Notes","task.photos":"Photos","task.add_photo":"Add photo","task.priority":"Priority","task.duration":"Duration (min)","task.due":"Due","task.window":"Window {start} \u2013 {end}","task.repeat":"Repeats every {n} days","task.repeat_days":"Repeat every (days, optional)","task.title":"Title","task.type":"Type","task.bed":"Bed","task.description":"Description","task.shifted":"{n} dependent tasks moved along.","task.beyond_window":"Careful: the new date is after the ideal window.","task.completed":"Nice work! {title} done.","task.source.generated":"From your plan","task.source.sensor":"From sensors","task.source.weather":"From the forecast","task.source.user":"Added by you","settings.region":"Climate & region","settings.hemisphere":"Hemisphere","settings.hemisphere.north":"Northern","settings.hemisphere.south":"Southern","settings.mode":"Profile","settings.mode.preset":"Regional preset","settings.mode.usda":"USDA hardiness zone","settings.mode.custom":"Custom frost dates","settings.preset":"Region","settings.zone":"Hardiness zone","settings.last_frost":"Last spring frost (MM-DD)","settings.first_frost":"First autumn frost (MM-DD)","settings.frost_dates_now":"This season: last frost {last}, first frost {first}.","settings.weather":"Weather & outdoor sensors","settings.weather_entity":"Weather entity","settings.outdoor_temp":"Outdoor temperature","settings.rain":"Rain sensor","settings.zones":"Zones & microclimates","settings.beds":"Beds & sensors","settings.zone_type.outdoor":"Outdoor","settings.zone_type.greenhouse":"Greenhouse","settings.zone_type.cold_frame":"Cold frame","settings.heated":"Heated","settings.min_heating":"Heating keeps above (\xB0C)","settings.sensors":"Sensors","settings.sensor.soil_moisture":"Soil moisture","settings.sensor.soil_temperature":"Soil temperature","settings.sensor.air_temperature":"Air temperature","settings.sensor.air_humidity":"Air humidity","settings.sensor.light":"Light","settings.sensor.rain":"Rain","settings.irrigation":"Irrigation switch/valve","settings.flow":"Flow (L/min)","settings.vent":"Vent / window opener","settings.notifications":"Notifications","settings.persistent":"Persistent notifications","settings.notify_services":"Push notifications (comma separated notify services)","settings.tts":"Text-to-speech entity","settings.tts_players":"Speakers (comma separated)","settings.digest":"Daily digest at","settings.frost_alerts":"Frost alerts","settings.heat_alerts":"Heat alerts","settings.tts_frost":"Announce frost on speakers","settings.general":"General","settings.language":"Language","settings.language.auto":"Follow Home Assistant","settings.units":"Units","settings.units_metric":"Metric (cm, \xB0C, mm, L)","settings.snap":"Grid size (cm)","settings.radius":"Companion radius (cm)","settings.data":"Import & export","settings.saved":"Settings saved.","type.sow_indoor":"Sow indoors","type.sow_direct":"Sow outdoors","type.harden_off":"Harden off","type.transplant":"Plant out","type.thin":"Thin","type.stake":"Support","type.prune":"Prune","type.pinch":"Pinch","type.earth_up":"Earth up","type.feed":"Feed","type.water":"Water","type.weed":"Weed","type.pest_check":"Pest check","type.harvest":"Harvest","type.ventilate":"Ventilate","type.shade":"Shade","type.frost_protect":"Frost protection","type.custom":"Task","priority.low":"Low","priority.normal":"Normal","priority.high":"High","priority.urgent":"Urgent","status.planned":"Planned","status.sown_indoors":"Sown indoors","status.sown":"Sown","status.transplanted":"Planted out","status.harvesting":"Harvesting","status.finished":"Finished","status.failed":"Failed","risk.none":"none","risk.low":"low","risk.moderate":"moderate","risk.high":"high","risk.unknown":"unknown","moisture.dry":"Dry","moisture.slightly_dry":"Slightly dry","moisture.optimal":"Optimal","moisture.wet":"Wet","moisture.unknown":"No data","irrigation.none":"No water needed","irrigation.water":"Water {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Skip - rain expected","irrigation.check_manually":"Check by hand (~{mm} mm)","gh.none":"All good","gh.ventilate":"Ventilate","gh.shade":"Shade now","gh.close_up":"Close before night","gh.heat":"Turn on heating","level.low":"Low","level.medium":"Medium","level.high":"High","suit.yes":"Suitable","suit.no":"Not suitable","suit.conditional":"Possible","frost.tender":"Tender","frost.half_hardy":"Half hardy","frost.hardy":"Hardy","frost.very_hardy":"Very hardy","kind.in_ground":"In-ground bed","kind.raised":"Raised bed","kind.container":"Container","soil.sandy":"Sandy","soil.loam":"Loam","soil.clay":"Clay","soil.silt":"Silt","soil.peat":"Peat","soil.chalk":"Chalk","soil.potting_mix":"Potting mix","wind.sheltered":"Sheltered","wind.moderate":"Moderate","wind.exposed":"Exposed","habit.bush":"Bush","habit.vine":"Vine","habit.climbing":"Climbing","habit.upright":"Upright","habit.rosette":"Rosette","habit.root":"Root crop","habit.bulb":"Bulb","reason.soil_too_cold":"Soil is {soil} \xB0C; {plant} needs {min} \xB0C to germinate.","reason.soil_too_hot":"Soil is {soil} \xB0C; above {max} \xB0C {plant} germinates poorly.","reason.frost_forecast":"Frost ({temp} \xB0C) forecast before {date}; {plant} is frost tender.","reason.window_open":"Window is open.","reason.window_not_yet":"Window opens {date}.","reason.window_closed":"Window closed on {date}.","reason.not_greenhouse_suitable":"{plant} is not suited to a greenhouse.","compat.friend":"{a} and {b} are good companions: {reason}","compat.enemy":"{a} and {b} should not be planted together: {reason}","compat.overlap":"{a} and {b} overlap - not enough space.","compat.rotation":"{family} grew in {bed} in {season}; wait {years} years.","compat.same_family_adjacent":"{a} and {b} share a family and its pests.","alert.frost":"Frost risk {level}: {temp} \xB0C expected {when}","alert.heat":"Heat stress in {zone}: {temp} \xB0C expected","alert.dry":"{bed} is dry ({moisture}%)","alert.sensor_stale":"Sensor {entity} has not reported for a while","alert.forecast_unavailable":"Weather forecast unavailable","when.tonight":"tonight","when.tomorrow_night":"tomorrow night","nav.handbook":"Handbook","nav.print":"Print","type.soil_prep":"Prepare soil","type.compost":"Compost","type.green_manure":"Green manure","type.mulch":"Mulch","type.clean_greenhouse":"Clean greenhouse","type.winter_prep":"Winter preparation","type.plan_season":"Plan season","type.tool_care":"Tool care","type.soil_test":"Soil test","type.cut_back":"Cut back","type.divide":"Divide","type.protect":"Protect","type.clean":"Clean up","type.tie_in":"Tie in","type.thin_fruit":"Thin fruit","type.pollinate":"Pollinate","type.check":"Check","type.make_feed":"Make plant feed","category.vegetable":"Vegetables","category.herb":"Herbs","category.fruit":"Fruit","category.flower":"Flowers","feature.path":"Gravel path","feature.compost":"Compost heap / bin","feature.water_butt":"Water butt","feature.shed":"Shed","feature.tree":"Tree","feature.hedge":"Hedge","feature.trellis":"Trellis","feature.other":"Other","stage.not_planted":"Not planted","stage.establishing":"Establishing","stage.vegetative":"Growing","stage.flowering":"Flowering","stage.ripening":"Ripening","stage.harvest":"Harvest","stage.finished":"Finished","compat.deters":"{a} protects {b}: it deters {pests}.","compat.trap":"{a} lures {pests} away from {b} (trap crop).","compat.allelopathy":"{a} releases growth-inhibiting compounds - keep it away from {b}.","compat.competition":"{a} and {b} are both heavy feeders this close together - add extra compost or give more space.","compat.shading":"{a} (about {height} cm tall) will shade {b} - plant tall crops on the side away from the sun.","compat.shade_benefit":"{a} gives {b} welcome summer shade.","alert.disease":"Disease risk {level} in {zone}","alert.nutrients":"Nutrient balance in {bed}: {status}","autoplan.bed_not_empty":"{bed} already has crops this season - tick 'replace' to re-plan it.","autoplan.no_beds":"No empty beds to fill. Select beds and tick 'replace'.","autoplan.compost_short":"Needs about {need} kg compost, you have {have} kg.","autoplan.time_over":"About {need} min per week of work - more than the {have} min you have.","autoplan.wanted_missing":"No room for: {plants}.","autoplan.consider_irrigation":"About {liters} L of water in a dry summer week - drip irrigation or a water butt will save you time.","autofill.title":"Autofill","autofill.intro":"Proposes crops, amounts and positions for season {season} from your beds and resources. Nothing is changed until you apply it.","autofill.household":"People in the household","autofill.hours":"Hours per week","autofill.water":"Water per week (L)","autofill.compost":"Compost available (kg)","autofill.has_irrigation":"Drip irrigation / automatic watering available","autofill.goals":"Goals","autofill.wanted":"Must have","autofill.excluded":"Never","autofill.beds":"Beds","autofill.all_empty":"(all empty beds)","autofill.replace":"Replace this season's crops in the selected beds","autofill.propose":"Make a proposal","autofill.apply":"Apply to plan","autofill.applied":"{n} plantings added to the plan","autofill.skipped":"Not placed","autofill.sum_crops":"{n} crops","autofill.sum_yield":"\u2248 {kg} kg harvest","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in a peak week","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Fresh vegetables","autofill.goal.storage":"Storage crops","autofill.goal.herbs":"Herbs","autofill.goal.pollinators":"Pollinators","autofill.goal.winter":"Winter harvest","autofill.goal.perennials":"Perennials","autofill.goal.easy":"Low maintenance","autofill.reason.no_suitable_bed":"no suitable bed","autofill.reason.no_space":"no space","autofill.reason.time_budget":"time budget","autofill.reason.water_budget":"water budget","cal.timeline":"Timeline","cal.garden_work":"Garden work","cal.growing":"Growing","cal.harvest_estimate":"Harvest expected around {date}","cal.harvest_estimate_short":"Expected harvest (degree days)","cal.last_frost":"Last frost","cal.first_frost":"First frost","cal.frost_dates":"Frost dates","cal.no_plantings":"No crops planned this season.","ctx.title":"Right now","ctx.moisture":"Soil moisture","ctx.soil_temp":"Soil temperature","ctx.irrigation":"Watering","ctx.water_balance":"Water deficit","ctx.nutrients":"Nutrient balance","ctx.air_temp":"Air temperature","ctx.humidity":"Humidity","ctx.disease":"Disease risk","ctx.frost":"Frost risk","ctx.today":"Today","ctx.rain":"Rain today","ctx.et0":"Evaporation (ET\u2080)","dash.gdd_today":"Degree days today","dash.water_climate":"Water & climate","dash.irrigation_mode":"Irrigation","dash.watering_now":"Watering {bed}","dash.stop":"Stop","dash.beds_need_water":"Beds needing water","dash.water_now":"Water now","dash.safety_note":"Frost lockout, rain skip and max runtime always apply.","dash.disease_risk":"Disease risk","dash.nutrients":"Nutrients","dash.water_balance":"Water deficit","dash.irrigation_started":"Watering started ({min} min)","dash.irrigation_stopped":"Watering stopped","dash.irrigation_nothing":"Nothing to water right now","handbook.title":"Gardening handbook","handbook.intro":"Background to everything Hortulus advises: soil, sowing, watering, feeding, rotation, the greenhouse and the garden year.","handbook.contents":"Contents","handbook.overview":"Overview","handbook.glossary":"Glossary","handbook.search":"Search the handbook","handbook.results":"Results for \u201C{query}\u201D","handbook.no_results":"Nothing found.","handbook.read_more":"Read more in the handbook","lib.category":"Category","lib.count":"{n} plants","lib.perennial":"perennial","lib.height":"Height","lib.roots":"roots","lib.gdd":"Degree days to harvest","lib.base":"base","lib.per_person":"Plants per person \xB7 yield","lib.deters":"Deters","lib.trap_for":"Trap crop for","lib.allelopathic":"Inhibits neighbours","lib.shade_tolerant":"Tolerates shade","lib.plant":"Plant","planner.layer_zones":"Show zones","planner.layer_features":"Show paths & elements","planner.layer_plantings":"Show crops","planner.add_feature":"Element","planner.align.left":"Align left","planner.align.right":"Align right","planner.align.top":"Align top","planner.align.bottom":"Align bottom","planner.align.hcenter":"Centre horizontally","planner.align.vcenter":"Centre vertically","planner.align.hdistribute":"Distribute horizontally","planner.align.vdistribute":"Distribute vertically","planner.aligned":"{n} items aligned","planner.moved_n":"{n} items moved","planner.removed_n":"{n} items removed","planner.selected_n":"{n} selected","planner.multi_hint":"Shift- or Ctrl-click to select several beds or crops, then drag, align or distribute them.","planner.alternatives":"Fits in","planner.better_neighbours":"Better neighbours","planner.heat_stress":"{n} hot days ahead","print.options":"Print options","print.document":"Document","print.page":"Paper","print.orientation":"Orientation","print.portrait":"Portrait","print.landscape":"Landscape","print.colors":"Colours","print.beds":"Beds","print.days":"Days ahead","print.title":"Title","print.notes":"Notes area (dot grid)","print.grid":"10 cm grid on bed sheets","print.labels":"Crop names on the map","print.download":"Download PDF","print.refresh":"Refresh preview","print.save_config":"Save to /config/hortulus/exports","print.saved_to_config":"PDF saved (/config/hortulus/exports)","print.preview":"Preview","print.empty":"No preview yet.","print.page_n":"Page {n} of {total}","print.all_greenhouses":"All greenhouses","print.all_zones":"All zones","print.remarkable_hint":"reMarkable Paper Pro: 179.6 \xD7 239.5 mm, extra margin on the left for the toolbar. E-ink colours use light tints and patterns so your pen stays visible. Send the PDF with the reMarkable app or email.","print.doc.garden":"Garden map","print.doc.garden.hint":"Zones, beds, crops, legend","print.doc.zone":"Greenhouse / zone","print.doc.zone.hint":"One zone, zoomed in","print.doc.beds":"Bed sheets","print.doc.beds.hint":"A page per bed with grid","print.doc.tasks":"Checklist","print.doc.tasks.hint":"Open tasks per week","print.doc.season":"Season chart","print.doc.season.hint":"Sow \u2192 harvest timeline","print.doc.blank":"Planning sheet","print.doc.blank.hint":"Outlines to sketch on","print.doc.plants":"Plant cards","print.doc.plants.hint":"Key facts per crop","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Full colour","print.color.eink":"E-ink (light + patterns)","print.color.grayscale":"Grayscale","settings.irrigation_hw":"Irrigation hardware","settings.irrigation_mode":"Mode","settings.irrigation_mode.off":"Off","settings.irrigation_mode.advise":"Advise (tasks only)","settings.irrigation_mode.auto":"Automatic","settings.pump":"Pump (switch or valve)","settings.start_time":"Start time","settings.max_runtime":"Max runtime per valve (min)","settings.frost_lockout":"Frost lockout below (\xB0C)","settings.rain_skip":"Skip when rain forecast \u2265 (mm)","settings.pump_lead":"Pump stop before valve (s)","settings.irrigation_hint":"{n} beds have a valve. Set the flow (L/min) per bed under Beds.","settings.resources":"Resources (autofill)","settings.maintenance_tasks":"Seasonal garden tasks in the calendar (soil prep, greenhouse cleaning, winter rest ...)","settings.open_meteo":"Use Open-Meteo for humidity, wind and sunshine","settings.open_meteo_hint":"Optional and off by default: sends the garden's rounded coordinates to api.open-meteo.com. Improves the evaporation (Penman-Monteith) estimate.","settings.elevation":"Elevation (m)","settings.shade_entity":"Shade screen (cover or switch)","settings.climate_control":"Vent & shade control","settings.climate_control.off":"Off","settings.climate_control.advise":"Advise (tasks)","settings.climate_control.auto":"Automatic","settings.wall_heat":"Against a warm wall","settings.thermal_mass":"Thermal mass (water barrels, stone)","settings.sensor.par":"Light (PAR)","settings.sensor.leaf_wetness":"Leaf wetness","settings.sensor.ec":"Soil EC","settings.sensor.npk_n":"Nitrogen (N)","settings.sensor.npk_p":"Phosphorus (P)","settings.sensor.npk_k":"Potassium (K)","task.postponed":"{title} postponed by {n} day(s)","common.done":"Done","planner.removed_from":"{name} removed from season {season} on (history kept).","planner.steps":"Build your garden plan in three steps","planner.step.site":"Draw your site","planner.step.site.hint":"zones & elements","planner.step.zones":"Arrange zones","planner.step.zones.hint":"name, beds, own map","planner.step.plant":"Plant","planner.step.plant.hint":"by hand or by the system","planner.whole_garden":"Whole garden","planner.zone_map":"Zone map","planner.site_intro":"Pick a zone type or element, then drag a rectangle on the grid (squares of 10 \xD7 10 cm). A single click places a standard size. Double-click a zone to open its own map.","planner.zones":"Zones","planner.elements":"Paths, lawn, trees & more","planner.your_zones":"Your zones","planner.no_zones":"No zones yet - start with your vegetable garden, greenhouse or orchard.","planner.open_zone":"Open zone map","planner.next":"Next","planner.zones_intro":"Open a zone to give it a name and draw its beds on its own map. This plan holds for this season only; you carry it into next year with the year-end transition.","planner.n_beds":"{n} beds","planner.zone_name":"Zone name","planner.beds_in_zone":"Beds & elements in this zone","planner.draw_bed":"Bed","planner.fill_by_hand":"Fill in myself","planner.fill_by_system":"Let the system fill it","planner.bed_needs_zone":"Draw a bed inside a zone.","planner.draw_hint":"Drag on the grid to draw: {what}","planner.palette_for_zone":"Showing plants that suit {zone}. Pick a category to see everything.","planner.perennial":"perennial","planner.bears_after":"fruit after ~{n} yr","planner.perennial_since":"Perennial - in the ground since {season}. At the end of the year you carry it over to next year's plan explicitly (year-end transition).","planner.bearing_from":"First harvest expected from {season}.","planner.eco_tips":"Eco tips & home remedies","planner.remove_perennial":"Remove {name}?","planner.remove_perennial_intro":"{name} was planted in {season} and stays in your plan every year. What happened?","planner.remove_from_season":"It is gone from {season} on","planner.remove_from_season_hint":"Earlier years keep it (rotation history, harvests, notes).","planner.remove_everywhere":"Delete it completely","planner.remove_everywhere_hint":"As if it was never planted - also removed from earlier years.","planner.legend.perennial":"perennial (stays)","planner.legend.warning":"neighbour / rotation warning","planner.legend.succession":"succession sowing","planner.legend.rows":"rows of seedlings","planner.legend.border":"Border colour = plant family (for crop rotation); the icon shows the crop itself.","settings.zone_type.orchard":"Orchard","settings.zone_type.fruit":"Soft fruit","settings.zone_type.herbs":"Herb garden","settings.zone_type.flowers":"Flower garden","zone_hint.outdoor":"Vegetable garden: annual crops with rotation, beds and paths.","zone_hint.greenhouse":"Greenhouse: warm crops, climate control, ventilation and shading.","zone_hint.cold_frame":"Cold frame: hardening off, early and late salads.","zone_hint.orchard":"Orchard: fruit trees that stay for decades - prune, thin and harvest yearly.","zone_hint.fruit":"Soft fruit: berries, currants, grapes and kiwi berries.","zone_hint.herbs":"Herb garden: perennial and annual herbs, a bee magnet.","zone_hint.flowers":"Flower garden: pollinators, beneficial insects and cut flowers.","feature.terrace":"Terrace","feature.lawn":"Lawn","feature.flowerbed":"Flower bed","feature.fence":"Fence","feature.pond":"Pond","pollination.insects":"Needs insects for pollination - add flowers nearby.","pollination.wind":"Wind-pollinated - plant in blocks, not single rows.","pollination.partner":"Needs a pollination partner (second variety) nearby.","pollination.none":"No pollination needed (leaves, roots).","planner.more":"More","settings.reminders":"Reminders","settings.overdue_reminders":"Remind me of tasks left undone","settings.overdue_time":"Reminder time","settings.overdue_after":"Remind after (days late)","settings.weekly_plan":"Weekly look-ahead","settings.weekly_day":"Day","settings.weekly_time":"Time","settings.weather_aware":"Weather-aware scheduling","settings.weather_aware_hint":"Sowing, planting out, spraying, pruning and mulching move automatically to the best dry, frost-free, not-too-hot day inside their window.","feature.house":"House","feature.driveway":"Driveway","feature.street":"Street","feature.parking":"Parking","feature.play":"Play area","feature.beehive":"Beehive","autofill.prefs":"Preferences","autofill.freedom":"Freedom of choice","autofill.freedom.strict":"Only what I want","autofill.freedom.balanced":"My wishes + goals","autofill.freedom.free":"Free: surprise me","autofill.pref.respect_companions":"Respect plant neighbours","autofill.pref.add_pollinators":"Add flowers for pollinators","autofill.pref.year_round":"Aim for harvests all year","autofill.pref.allow_perennials":"Perennials allowed","autofill.pref.match_zone_type":"Respect zone type (orchard = fruit \u2026)","autofill.reason.pollinators":"pollinators","nav.advice":"Advice","task.tools":"You need","advice.ask_title":"Ask Hortulus","advice.i_have":"I have a","advice.mode.question":"question","advice.mode.problem":"problem","advice.about":"about","advice.subject":"Subject","advice.target":"Which one","advice.problem":"Question","advice.ask":"Ask","advice.in_garden":"In your garden","advice.all_plants":"All plants","advice.whole_garden":"the whole garden","advice.subject.plant":"a plant / vegetable / fruit","advice.subject.greenhouse":"my greenhouse","advice.subject.garden":"my garden","advice.subject.bed":"a bed","advice.subject.tools":"tools & supplies","advice.q.status":"How is it doing?","advice.q.what_to_do":"What should I do now?","advice.q.when_sow":"When to sow or plant?","advice.q.when_harvest":"When to harvest?","advice.q.growth":"it grows badly","advice.q.yellow_leaves":"yellow leaves","advice.q.wilting":"it wilts / droops","advice.q.no_fruit":"flowers but no fruit","advice.q.bolting":"it bolts (runs to seed)","advice.q.pests":"pests / bugs on it","advice.q.disease":"spots, mould or rot","advice.q.feeding":"How to feed it?","advice.q.watering":"How much water?","advice.q.pruning":"How to prune?","advice.q.companions":"What grows well next to it?","advice.q.too_hot":"it is too hot","advice.q.too_cold":"it is too cold","advice.q.winter_crops":"What can grow in winter?","advice.q.year_round":"How do I harvest all year?","advice.q.soil":"my soil is poor","advice.q.slugs":"slugs!","advice.q.frost":"frost is coming","advice.q.what_next":"What should go in next?","advice.q.for_task":"Which tools for this job?","advice.q.shopping":"What do I need to buy?","advice.sec.status":"Now in your garden","advice.sec.facts":"Good to know","advice.sec.causes":"Possible causes","advice.sec.actions":"What to do","advice.sec.remedies":"Eco & home remedies","advice.sec.prevention":"Prevent it next time","advice.sec.tasks":"Open tasks","advice.read_more":"Read more in the handbook","advice.suggestions":"Suggestions for your garden","advice.suggestions_intro":"Hortulus looks at placement, pollination, neighbours, year-round harvest, soil and ecology.","advice.none":"No suggestions - your plan looks great!","advice.apply_add":"Add to plan","advice.apply_open":"Show in planner","advice.dismiss":"Hide","advice.no_space":"No free space in {bed}.","advice.kind.pollination":"Pollination","advice.kind.neighbours":"Neighbours","advice.kind.placement":"Placement","advice.kind.year_round":"Year-round","advice.kind.soil":"Soil","advice.kind.eco":"Ecology","advice.kind.growth":"Growth","advice.kind.greenhouse":"Greenhouse","advice.coverage":"Harvest per month","advice.coverage_gaps":"Red months have nothing to harvest - the suggestions show what fills them.","advice.coverage_full":"Something to harvest every month.","advice.nothing":"nothing","advice.shopping":"Shopping list this season","advice.shopping_intro":"Worked out from your plan: seed, plants, compost, protection and support.","advice.nothing_to_buy":"Nothing to buy yet - plan some crops first.","advice.tools_per_task":"Tools per job","advice.read_tools":"Tools & DIY feeds","advice.cat.seeds":"Seed","advice.cat.plants":"Young plants","advice.cat.soil":"Soil & feeding","advice.cat.protection":"Protection","advice.cat.support":"Support & mulch","advice.cat.other":"Other","print.doc.year":"Year plan","print.doc.year.hint":"Month matrix: sow, plant, harvest","nav.journal":"Journal","task.assignee":"Assigned to","task.anyone":"anyone","task.harvested":"Harvested:","journal.diary":"Diary","journal.harvest":"Harvest","journal.seeds":"Seed box","journal.water":"Water","journal.new":"New diary entry","journal.text":"What did you see or do?","journal.placeholder":"First tomatoes ripening, aphids on the broad beans \u2026","journal.kind":"Kind","journal.kind.note":"Note","journal.kind.observation":"Observation","journal.kind.problem":"Problem","journal.kind.milestone":"Milestone","journal.link":"About","journal.whole_garden":"the whole garden","journal.beds":"Beds","journal.crops":"Crops this season","journal.add_photo":"Add photo","journal.save":"Save","journal.saved":"Saved in the diary.","journal.filter":"Filter","journal.all":"Everything","journal.empty":"No entries yet - note what you see: it is the best garden teacher.","journal.log_harvest":"Log a harvest","journal.what":"Crop","journal.kg":"Weight (kg)","journal.count":"Count","journal.day":"Date","journal.quality":"Quality","journal.learn_hint":"Hortulus learns your own yields per m\xB2 from this and uses them in Autofill and advice.","journal.harvest_saved":"Harvest saved.","journal.harvest_season":"Harvest {season}","journal.crops_n":"{n} crops","journal.yield":"your yield {kg} kg/m\xB2 (database {db})","journal.recent":"Latest entries","journal.no_harvest":"Nothing logged yet.","journal.add_seed":"Add seed packet","journal.variety":"Variety","journal.year":"Year","journal.quantity":"Quantity","journal.unit":"Unit","journal.unit.packet":"packet(s)","journal.unit.seeds":"seeds","journal.unit.g":"g","journal.source":"Source","journal.source_hint":"shop, swap, own seed \u2026","journal.seed_saved":"Seed packet saved.","journal.seed_missing":"Still needed for this season","journal.seed_hint":"Seed keeps 1-2 years (parsnip, onion) up to 5-6 years (cabbages, cucurbits). Old seed: do a germination test.","journal.seed_box":"Seed box","journal.status":"Status","journal.needed":"needed this season","journal.seed.ok":"good","journal.seed.use_soon":"use this year","journal.seed.expired":"old (test it)","journal.seed.empty":"empty","journal.seed.unknown":"year unknown","journal.no_seeds":"No seed packets yet.","journal.water_setup":"Link a water meter and/or a water-butt level sensor in Settings \u203A Water to follow your garden water.","journal.water_week":"Mains water, 7 days","journal.water_season":"Mains water this year","journal.rain_available":"Rain water available","journal.per_day":"Per day (last 14 days)","journal.water_hint":"Watering tasks mention how much rain water is left so you use it first.","cal.year":"Year","cal.tasks_per_month":"Tasks","cal.act.sow_indoor":"sow indoors","cal.act.sow":"sow","cal.act.plant":"plant out","cal.act.grow":"growing","cal.act.harvest":"harvest","cal.act_short.sow_indoor":"S","cal.act_short.sow":"S","cal.act_short.plant":"P","cal.act_short.harvest":"H","settings.water":"Water meter & rain butt","settings.water_meter":"Garden water meter (m\xB3 or L)","settings.butt_level":"Rain butt level (%)","settings.butt_capacity":"Total butt capacity (L)","settings.water_hint":"Hortulus stores one reading per day. You get water use per week, the rain water still available, and watering tasks say how much of it you can use first.","settings.household":"Household & voice","settings.nobody":"Nobody (unassigned)","settings.default_person":"Use the default","settings.no_persons":"No people found. Add people under Settings \u2192 People to assign tasks.","settings.assign_default":"New tasks go to","settings.assign_per_type":"Per task type","settings.person_notify":"Personal reminders","settings.person_notify_hint":"Each person gets their own tasks on this notify service (daily digest and overdue reminders).","settings.voice":"Voice (Assist)","settings.voice_hint":"Ask Assist \u201Cwhat do I need to do in the garden today?\u201D, \u201Chow much did I harvest?\u201D, \u201Cis there frost tonight?\u201D. Install the sentences once, then they work in English and Dutch.","settings.voice_install":"Install voice sentences","settings.voice_installed":"Voice sentences installed","soil_test.title":"Soil analysis","soil_test.none":"No soil analysis yet.","soil_test.add":"Add soil analysis","soil_test.om":"Organic matter (%)","soil_test.lime":"Lime status","soil_test.lime.low":"too low","soil_test.lime.ok":"fine","soil_test.lime.high":"high","soil_test.hint":"Lab report or home kit. Hortulus adjusts the fertiliser plan and lime advice of this bed to the latest analysis.","cal.hours":"{n} h","planner.other_season":"{name} (season {year})","journal.system":"System log","syslog.intro":"Every change in Hortulus is listed here: what you or someone else did in the panel, through automations, and what Hortulus adjusted itself (tasks, clean-up). Undo an entry to restore the state from before that action; the undo is logged as well, so it can be reverted too.","syslog.show_system":"Show automatic actions by Hortulus","syslog.empty":"Nothing logged yet.","syslog.by_system":"Hortulus (automatic)","syslog.by_unknown":"Automation or service","syslog.is_undone":"undone","syslog.undo":"Undo","syslog.undone":"Undone.","syslog.confirm":"Undo: {what}?","syslog.conflict":"{n} item(s) changed again since. Undo anyway? Those later changes will be lost.","syslog.blocked":"Cannot undo: this would refer to a bed, zone or plant that has been deleted since. Undo that later deletion first.","syslog.more":"Load older entries","syslog.and_more":"\u2026 and {n} more","syslog.n_changes":"{verb} \u2013 {n} items","syslog.op.add":"Added","syslog.op.remove":"Removed","syslog.op.change":"Changed","syslog.op.mixed":"Updated","syslog.reason.plan":"planner","syslog.reason.import":"import","syslog.reason.tasks":"tasks","syslog.reason.settings":"settings","syslog.reason.plants":"plant library","syslog.reason.records":"journal","syslog.reason.auto":"automatic","syslog.reason.undo":"Undo","syslog.col.zones":"Zone","syslog.col.beds":"Bed","syslog.col.plantings":"Crop","syslog.col.tasks":"Task","syslog.col.custom_plants":"Custom plant","syslog.col.features":"Garden feature","syslog.col.harvest_log":"Harvest","syslog.col.journal":"Diary note","syslog.col.seed_stock":"Seed stock","syslog.col.rotation_history":"Crop history","syslog.col.irrigation_log":"Irrigation","syslog.col.plant_overrides":"Plant data","syslog.col.settings":"Setting","planner.draw_site":"Site & elements","planner.draw_planter":"Planter / pot","planner.draw_planter_hint":"Draw a planter, pot or window box - you can plant it like a bed afterwards.","planner.new_planter":"Planter","planner.elements_in_zone":"Paths, terrace, lawn, hedge \u2026 in this zone","planner.elements.buildings":"Buildings & paving","planner.elements.paths":"Paths","planner.elements.green":"Green","planner.elements.outdoor_living":"Outdoor living & equipment","feature.stone_path":"Stone path","feature.wood_path":"Wooden path","feature.stepping_stones":"Stepping stones","feature.bark_path":"Bark path","feature.decking":"Decking","feature.wall":"Wall","feature.carport":"Carport / garage","feature.shrub":"Shrub","feature.pool":"Swimming pool","feature.seating":"Seating area","settings.zone_type.garden":"Ornamental garden","settings.zone_type.containers":"Planters & pots","zone_hint.garden":"Ornamental garden: shrubs, borders and perennials around lawn and terrace.","zone_hint.containers":"Planters & pots: on a terrace, balcony or window sill - draw every planter or pot and plant it.","settings.display":"Display (this browser)","settings.photos":"Show plant photos (Wikipedia)","settings.photos_hint":"On top of the illustration Hortulus shows a photo from Wikipedia, looked up by scientific name. Your browser fetches it directly from Wikipedia (with credit); offline or when switched off you see the illustration.","nav.layout":"Garden plan","advice.apply_transition":"Open year-end transition","layout.current":"current","layout.no_plan":"no garden plan","layout.edit":"Edit garden plan","layout.to_planner":"To the planner","layout.make":"Make the {season} garden plan","layout.planting_on":"on the {season} garden plan - zones, beds and elements are edited in Garden plan","layout.started":"Garden plan {season} started.","layout.none_title":"No garden plan for {season} yet","layout.none_intro":"A garden plan fixes the shape of your garden for one year: zones (open ground, greenhouse, pots \u2026), beds and elements such as driveway, house, hedge, lawn, shed or water butt - without plants. Start from another year or empty.","layout.none_plant":"You plant a year on its own garden plan, and {season} has none yet. Make it in Garden plan, or move {live} over with the year-end transition.","layout.none_hint":"Nothing moves into a new year by itself: the garden plan and what carries on (perennials, overwintering crops) are moved over explicitly at the end of the year.","layout.copy_from":"Copy the {season} garden plan","layout.start_empty":"Start empty","year.button":"Year-end transition","year.title_short":"Year-end transition","year.title":"Year-end transition {from} \u2192 {to}","year.intro":"Nothing moves into {to} by itself. Choose which part of the garden plan and which crops go along; the rest stays in {from}. Everything is logged in the system log and can be undone.","year.plan":"Garden plan","year.keep":"Use the garden plan you already made for {to}","year.copy":"Copy the {from} garden plan (choose below what goes along)","year.copy_hint":"The {to} garden plan becomes a copy of {from}. Untick what does not go along.","year.elements":"Elements (driveway, house, hedge, paths \u2026)","year.perennials":"Perennials, trees and shrubs","year.overwinter":"Overwintering crops (still growing after the year ends)","year.none":"None.","year.bed_gone":"bed not in the new garden plan","year.not_chosen":"What you leave unticked stays in the old year and gets no tasks in {to}.","year.activate":"Make {to} the active garden year now","year.activate_hint":"The {from} garden plan is archived and {to} becomes your garden: tasks, sensors and irrigation follow the new plan.","year.prepare_hint":"Prepare only: the {to} garden plan is set up, {from} stays your active garden.","year.apply":"Move over to {to}","year.done":"Your garden is now in {season} - {n} crop(s) moved over.","year.prepared":"Garden plan {season} prepared - {n} crop(s) moved over.","year.skipped":"{n} crop(s) not moved: their bed is not in the new garden plan.","layout.save_first":"Your changes are not saved yet - try again in a moment.","reason.zone_type":"{zone} is a {zone_type}: it holds {allowed}, not {category}.","reason.not_under_glass":"Does not belong under glass ({zone}).","reason.too_late":"Too late for season {season}: the sowing/planting window ran until {until}.","reason.too_late_nodate":"Too late for season {season}: the sowing/planting window has passed.","reason.frost_before_harvest":"Frost ({frost}) comes before the first harvest ({harvest}) - use the greenhouse or start earlier next year.","reason.rotation":"Crop rotation: {family} grew here in {season} - wait {years} years.","reason.bad_neighbour":"Bad neighbour: {plant} is already in this bed.","reason.no_space":"No room left: {free_m2} m\xB2 free, {need_m2} m\xB2 needed.","reason.no_suitable_bed":"No bed where this crop fits.","reason.time_budget":"Does not fit your time per week any more.","reason.water_budget":"Does not fit your water per week any more.","reason.compost_budget":"Does not fit your compost any more.","autofill.mostly_late":"{n} crops are too late for season {season}: their sowing or planting time has passed. Fill {next} instead?","autofill.fill_next":"Fill {season}","autofill.skipped_why":"why not?","autoplan.plan_from":"{season} has no garden plan yet: the proposal uses the {from} plan. Applying it copies that plan into {season}.","autoplan.no_plan":"There is no garden plan for {season} yet - draw it in Garden plan first.","plans.button":"Plans","plans.title":"Plans for {season}","plans.intro":"Start over with a completely new plan. The current plan - with its beds and crops - is set inactive and kept; you can make it active again later.","plans.new":"Start a new plan","plans.start.empty":"Completely empty (from scratch)","plans.start.empty.hint":"No zones, beds, elements or crops - you draw everything again.","plans.start.zones":"Same zones, empty","plans.start.zones.hint":"Zones and elements (house, paths, hedge \u2026) stay, without beds and without crops.","plans.start.zones_beds":"Same zones and beds, no crops","plans.start.zones_beds.hint":"The whole layout stays; only this season's crops are cleared.","plans.old_name":"Name for the current plan","plans.old_name_hint":"e.g. Plan {season} \u2013 first version","plans.start_button":"Start new plan","plans.inactive":"Inactive plans","plans.none":"No inactive plans yet.","plans.counts":"{zones} zones \xB7 {beds} beds \xB7 {plantings} crops","plans.activate":"Activate","plans.confirm_new":"The current {season} plan is set inactive (with its crops) and you start a new plan. Continue?","plans.confirm_activate":"Make {name} active again for {season}? The plan that is active now is set inactive.","plans.confirm_delete":"Delete {name} for good? (It can still be undone in the system log.)","plans.started":"New plan for {season} started - the previous one is under inactive plans.","plans.activated":"{name} is active again.","plans.deleted":"{name} deleted.","nav.analysis":"Analysis","syslog.error":"Error","analysis.check":"Check","analysis.why":"Why not?","analysis.errors":"Errors","analysis.log":"System log","analysis.check_title":"Garden check","analysis.recheck":"Check again","analysis.check_intro":"Hortulus lays its garden plans, crops and seasons side by side and looks for what does not add up or explains unexpected behaviour.","analysis.all_good":"Nothing odd found.","analysis.to_planner":"To the planner","analysis.count.zones":"Zones","analysis.count.beds":"Beds","analysis.count.features":"Elements","analysis.count.plantings":"Crops (all years)","analysis.count.plans":"Years with a garden plan","analysis.count.archived_plans":"Inactive plans","analysis.count.log_entries":"Log entries","analysis.why_title":"Why does a plant (not) fit?","analysis.why_intro":"Pick a plant and a season: per bed you see whether it fits and, if not, why - the same rules as dragging and Autofill.","analysis.no_beds":"This garden plan has no beds yet.","analysis.free":"{m2} m\xB2 free","analysis.fits":"Fits here.","analysis.warning":"Note","analysis.errors_title":"Errors and refused actions","analysis.errors_intro":"Every action that failed or was refused (e.g. an invalid plan, a change made elsewhere at the same time) is listed here, with when and by whom.","analysis.no_errors":"No errors logged.","analysis.error.invalid_plan":"Plan refused","analysis.error.revision_conflict":"Changed elsewhere at the same time","analysis.error.unknown_bed":"Unknown bed","analysis.error.unknown_plant":"Unknown plant","analysis.error.unknown_record":"Not found","analysis.error.unexpected":"Unexpected error","analysis.error.invalid_format":"Invalid data","analysis.issue.transition_due":"The year-end transition {from} \u2192 {to} has not been done.","analysis.issue.transition_due.why":"Nothing moves into {to} by itself: perennials and the {from} garden plan get no tasks in {to} until you move them over.","analysis.issue.season_without_plan":"Season {season} has {n} crop(s) but no garden plan.","analysis.issue.season_without_plan.why":"Without a garden plan the planner does not show those crops. Copy or draw the {season} garden plan.","analysis.issue.planting_not_on_plan":"{n} crop(s) in {season} sit on a bed that is not in the {season} garden plan: {plants}.","analysis.issue.planting_not_on_plan.why":"They are invisible on the map and get no tasks. Usually the bed was deleted or belongs to another year or an inactive plan. Bring the bed back or remove the crops.","analysis.issue.unknown_plant":"Unknown plant in {season}: {ids}.","analysis.issue.unknown_plant.why":"A custom plant was deleted while it was still in the plan.","analysis.issue.bed_without_zone":"Bed {bed} ({season}) belongs to no zone.","analysis.issue.bed_without_zone.why":"Give the bed a zone in Garden plan.","analysis.issue.bed_outside_zone":"Bed {bed} lies (partly) outside zone {zone} ({season}).","analysis.issue.bed_outside_zone.why":"The bed counts for zone {zone} (climate, sensors) but does not lie in it. Move the bed or enlarge the zone.","analysis.issue.zone_without_beds":"Zone {zone} has no beds ({season}).","analysis.issue.zone_without_beds.why":"Nothing can be planted in a zone without beds - not even by Autofill. Draw a bed (or planter) in Garden plan.","analysis.issue.planting_outside_bed":"{plant} sticks out of bed {bed} ({season}).","analysis.issue.planting_outside_bed.why":"Spacing and plant counts are then off. Move or shrink the crop.","analysis.issue.plantings_overlap":"{a} and {b} lie on top of each other in {bed} ({season}).","analysis.issue.plantings_overlap.why":"Both occupy the same spot at the same time: too little room, which is what the overlap messages are about.","analysis.issue.planting_too_late":"{plant} is planned too late for {season}.","analysis.issue.planting_too_late.why":"The sowing/planting window has passed: dates move to today and the harvest comes (too) late. Plan it for {next} or adjust the dates.","analysis.issue.perennial_not_carried":"{n} perennial(s) were not moved into {season}: {plants}.","analysis.issue.perennial_not_carried.why":"Left unticked at the year-end transition - they get no tasks in {season}. On purpose? Otherwise undo the transition in the system log and do it again.","nav.crops":"Crops","crops.intro":"Every crop of this season in one list. Change dates, method, status, count and notes right here - without dragging anything. Leave a planned date empty and Hortulus computes it (grey underneath).","crops.search":"Search crop, bed or zone","crops.group":"Order","crops.group.bed":"by bed","crops.group.plant":"by crop","crops.group.date":"by date","crops.method":"Method","crops.status":"Status","crops.count":"Number of plants","crops.notes":"Notes","crops.computed":"computed","crops.field.sow_date":"Sow (planned)","crops.field.sown_on":"Sown on","crops.field.transplant_date":"Plant out (planned)","crops.field.transplanted_on":"Planted out on","crops.field.harvest_started_on":"Harvest started","crops.field.finished_on":"Finished on","crops.late":"Planned too late for this season - the dates move to today.","crops.no_bed":"no bed in this plan","crops.none":"No crops in {season} yet.","crops.window.sow":"Sowing window","crops.window.transplant":"Planting window","crops.in_ground":"In the ground","crops.harvest":"Harvest","crops.detail_hint":"Every change is saved right away and logged in the system log. Position and size are changed in the planner.","planner.why_here":"Why (not) here?","planner.to_crops":"In Crops","planner.plant_info":"Plant info","planner.why_ok":"Fits in {bed}.","planner.why_not":"Does not fit well in {bed}:","planner.why_no_bed":"This bed is not on this season's garden plan.","planner.why_fits_in":"Fits in: {beds}.","planner.why_fits_nowhere":"Fits in no bed this season.","planner.rotation_strip":"Crop rotation: plant families in this bed over the last years","planner.late_title":"Season {season} is coming to an end","planner.late_still":"Still possible: {n} plants. Click one to put it in the selected bed.","planner.late_none":"Hardly anything fits this season any more.","planner.late_add_hint":"Put it in the selected bed","planner.late_next":"Plan {season}","planner.drop_bad":"{plant} does not fit well here","analysis.compare":"Compare","analysis.badge":"{errors} error(s), {warnings} warning(s)","analysis.fixed":"Fixed. You can undo it in the system log.","analysis.export":"Export diagnosis","analysis.fix.season_without_plan":"Copy a garden plan","analysis.fix.planting_not_on_plan":"Put into a bed of this plan","analysis.fix.planting_outside_bed":"Move back into the bed","analysis.fix.bed_outside_zone":"Move the bed into its zone","analysis.fix.perennial_not_carried":"Carry over to this year","crops.bulk":"Change several crops","crops.bulk_n":"{n} selected","crops.bulk_date":"Date","crops.pick_date":"Pick a date","crops.bulk_apply":"Apply","crops.bulk_done":"{n} crops changed.","crops.pick_all":"Select all","crops.show_on_map":"Show on map","compare.title":"Compare plans","compare.intro":"Put two garden plans side by side - a season's or an inactive one - and see what was added, removed or changed.","compare.button":"Compare","compare.season_plan":"Garden plan {season}","compare.inactive_plan":"{name} (inactive, {season})","compare.from":"From","compare.to":"To","compare.identical":"These plans are the same.","compare.zones":"Zones","compare.beds":"Beds","compare.features":"Elements","compare.crops":"Crops","compare.what.moved":"moved or resized","compare.what.renamed":"renamed","compare.what.zone":"other zone","compare.what.type":"other type","compare.what.bed":"other bed","compare.what.status":"other status","valve.stuck_title":"Valve left open","valve.stuck":"{what} ({entity}) has been open far longer than any watering run.","valve.stuck_since":"Open since {time}. Is it stuck, or was it opened by hand?","valve.pump":"The pump","valve.close":"Close valve","valve.closed":"Valve closed.","valve.still_open":"The valve still reports: {state}. Please check it.","valve.test":"Test (5 s)","valve.testing":"Testing\u2026","valve.test_confirm":"Open {entity} for 5 seconds to test it? (the pump runs too when one is set)","valve.test_ok":"Works: opened ({open}) and closed again ({closed}).","valve.test_no_open":"Did not open: the valve reports {state}. Check the connection or the entity.","valve.test_no_close":"Opened, but still reports {state} after closing. Check the valve.","valve.test_save_first":"Save the settings first; Hortulus only tests valves that are linked already.","water.per_bed":"Watering per bed","water.days":"{n} days","water.given":"Water given","water.rain":"Rain","water.moisture":"Soil moisture","water.no_moisture":"no moisture sensor","water.chart_title":"Watering of {bed}","water.chart_empty":"No data for this period yet.","water.chart_hint":"Soil moisture comes from Home Assistant's history, water given from Hortulus' log, rain from the rain sensor (daily maximum). It shows whether a run really happened and helped.","crops.view.list":"List","crops.view.weeks":"Sowing plan","crops.view.seeds":"Seeds","crops.view.follow":"Succession","crops.view.harvest":"Harvest forecast","crops.all_dates":"All dates","plan.act.sow_indoor":"Sow indoors","plan.act.sow_direct":"Sow outdoors","plan.act.transplant":"Plant out","plan.act.harvest":"Harvest starts","plan.done":"Done","plan.weeks_title":"Sowing plan","plan.n_weeks":"{n} weeks","plan.weeks_intro":"What to sow indoors or outdoors, plant out and start harvesting in the coming weeks. Done fills in the real date (today) on the crop.","plan.overdue":"Overdue ({n})","plan.week_of":"Week of {date}","plan.seeds_title":"Seeds for {season}","plan.seeds_intro":"How much seed the plan still needs (plant count with a margin for germination, thinning and pests) against your seed stock.","plan.plants":"Plants","plan.seeds":"Seeds","plan.in_stock":"In stock","plan.seed.ok":"Enough","plan.seed.check":"Check","plan.seed.short":"Too few","plan.seed.none":"Buy","plan.seeds_hint":"Hortulus cannot count packets and grams: those say 'Check'. Bought plants and crops already sown do not count.","plan.seeds_none":"The plan needs no more seed.","plan.follow_title":"Succession","plan.follow_intro":"Beds that free up this season and what still fits there afterwards - same rules as autofill, without the same plant family.","plan.free_from":"free from {date}","plan.after":"after {plants}","plan.ready_by":"harvest from {date}","plan.follow_nothing":"Nothing fits there afterwards this season.","plan.follow_none":"No beds free up this season.","plan.harvest_title":"Harvest forecast {season}","plan.harvest_intro":"Expected harvest per week, about {kg} kg in all. Based on the area, the yield per m\xB2 (your own harvests where there are any) and the harvest window.","plan.learned":"your yield","plan.book_yield":"average yield","plan.harvest_none":"No harvest expected this season yet."};var en={"app.name":"Hortulus","app.tagline":"Je moestuin, gepland en verzorgd","nav.dashboard":"Vandaag","nav.planner":"Planner","nav.library":"Planten","nav.calendar":"Kalender","nav.settings":"Instellingen","common.save":"Opslaan","common.cancel":"Annuleren","common.delete":"Verwijderen","common.previous":"Vorige","common.next":"Volgende","lib.in_garden":"In je tuin","common.close":"Sluiten","common.add":"Toevoegen","common.edit":"Bewerken","common.none":"Geen","common.loading":"Je tuin wordt geladen\u2026","common.not_loaded":"Hortulus is nog niet ingesteld. Voeg de integratie toe via Instellingen \u2192 Apparaten & diensten.","common.minutes":"{n} min","common.days":"{n} dagen","common.cm":"{n} cm","common.today":"Vandaag","common.tomorrow":"Morgen","common.yesterday":"Gisteren","common.overdue":"Te laat","common.unknown":"Onbekend","common.search":"Zoeken","common.all":"Alle","common.season":"Seizoen {year}","common.admin_only":"Alleen beheerders kunnen het plan wijzigen.","common.saved":"Opgeslagen","common.saving":"Opslaan\u2026","common.unsaved":"Niet-opgeslagen wijzigingen","common.conflict":"Elders gewijzigd - opnieuw geladen","common.error":"Er ging iets mis: {message}","dash.greeting_morning":"Goedemorgen","dash.greeting_afternoon":"Goedemiddag","dash.greeting_evening":"Goedenavond","dash.today_tasks":"Taken voor vandaag","dash.no_tasks":"Niets te doen vandaag. Geniet van de tuin!","dash.show_all":"Alle {n} taken tonen in de kalender","dash.total_time":"Ongeveer {minutes} min werk","dash.beds":"Bedden","dash.weather":"Komende 48 uur","dash.greenhouse":"Kas","dash.coming_up":"Binnenkort","dash.gdd":"Graaddagen","dash.gdd_since":"sinds {date}","dash.frost_risk":"Vorstrisico","dash.min_temp":"Laagste {temp} \xB0C","dash.rain":"Regen {mm} mm","dash.inside":"Binnen {temp} \xB0C","dash.limits":"Gewassen verdragen {min}\u2013{max} \xB0C","dash.no_sensor":"Geen sensor","dash.active_crops":"{n} gewassen in de grond","dash.forecast_missing":"Geen weersverwachting - advies is minder nauwkeurig.","planner.season":"Seizoen","planner.undo":"Ongedaan maken","planner.redo":"Opnieuw","planner.snap":"Uitlijnen op raster","planner.zoom_in":"Inzoomen","planner.zoom_out":"Uitzoomen","planner.fit":"Passend maken","planner.add_bed":"Bed toevoegen","planner.add_zone":"Zone toevoegen","planner.overlay_companions":"Buurplanten","planner.overlay_moisture":"Vocht","planner.overlay_temperature":"Temperatuur","planner.view_date":"Toon tuin op","planner.palette":"Planten","planner.palette_hint":"Sleep een plant naar een bed, of druk op Enter om hem aan het geselecteerde bed toe te voegen.","planner.layout":"Indeling","planner.layout.single":"Los","planner.layout.block":"Blok","planner.layout.row":"Rij","planner.inspector":"Details","planner.nothing_selected":"Selecteer een bed of beplanting voor details. Druk op ? voor sneltoetsen.","planner.method":"Methode","planner.method.indoor_sow":"Binnen zaaien, later uitplanten","planner.method.direct_sow":"Ter plaatse zaaien","planner.method.transplant":"Planten (gekochte planten / plantuitjes)","planner.status":"Status","planner.count":"{n} planten","planner.timeline":"Tijdlijn","planner.succession":"Opeenvolgend zaaien","planner.succession_count":"Aantal zaaimomenten","planner.succession_interval":"Elke (dagen)","planner.succession_placement":"Plaatsing","planner.succession.split":"Vlak in stroken verdelen","planner.succession.stack":"Zelfde plek, na elkaar","planner.succession_create":"Zaaimomenten maken","planner.succession_dropped":"{n} zaaimomenten vielen buiten het zaaivenster en zijn overgeslagen.","planner.duplicate":"Dupliceren","planner.remove":"Verwijderen","planner.bed_name":"Naam","planner.zone":"Zone","planner.kind":"Soort","planner.width":"Breedte (cm)","planner.length":"Lengte (cm)","planner.orientation":"Rijrichting (\xB0)","planner.soil":"Grond","planner.shade":"Schaduw (%)","planner.wind":"Wind","planner.score":"Buurplantenscore","planner.warnings":"Waarschuwingen","planner.no_warnings":"Geen conflicten - mooie combinatie!","planner.out_of_bounds":"Valt deels buiten het bed.","planner.placed":"{plant} geplaatst in {bed}.","planner.moved":"{name} verplaatst.","planner.removed":"{name} verwijderd.","planner.no_bed_here":"Zet planten op een bed.","planner.export_json":"Exporteer JSON","planner.export_yaml":"Exporteer YAML","planner.import":"Plan importeren","planner.import_mode":"Importmodus","planner.import_merge":"Samenvoegen met huidig plan","planner.import_replace":"Huidig plan vervangen","planner.imported":"Ge\xEFmporteerd: {beds} bedden, {plantings} beplantingen.","planner.shortcuts":"Sneltoetsen","planner.legend":"Plantenfamilies","planner.new_bed":"Nieuw bed","planner.new_zone":"Nieuwe zone","shortcut.move":"Selectie verplaatsen (Shift = 10\xD7)","shortcut.undo":"Ongedaan maken","shortcut.redo":"Opnieuw","shortcut.delete":"Selectie verwijderen","shortcut.duplicate":"Selectie dupliceren","shortcut.grid":"Raster aan/uit","shortcut.companions":"Buurplanten-laag aan/uit","shortcut.moisture":"Vochtlaag aan/uit","shortcut.zoom":"In- / uitzoomen","shortcut.escape":"Selectie opheffen","shortcut.cycle":"Volgend / vorig item selecteren","shortcut.help":"Deze hulp tonen","lib.title":"Plantenbibliotheek","lib.search":"Zoek op naam, Latijnse naam of familie","lib.family":"Familie","lib.filter_greenhouse":"Kas","lib.filter_quick":"Snelle gewassen","lib.filter_custom":"Mijn planten","lib.add_custom":"Nieuwe plant","lib.customize":"Aanpassen","lib.reset":"Terug naar standaard","lib.spacing":"Plantafstand","lib.row_spacing":"Rijafstand","lib.depth":"Zaaidiepte","lib.germination":"Kiemduur","lib.maturity":"Dagen tot oogst","lib.soil_temp":"Min. bodemtemperatuur","lib.frost":"Vorstbestendigheid","lib.min_temp":"Minimumtemperatuur","lib.greenhouse":"Kas","lib.water":"Water","lib.nutrients":"Voeding","lib.rotation":"Wisselteelt","lib.rotation_years":"{n} jaar voordat dezelfde familie terugkomt","lib.open_plant":"Toon deze plant","lib.friends":"Goede buren","lib.enemies":"Uit elkaar houden","lib.pests":"Plagen","lib.diseases":"Ziekten","lib.care":"Verzorging","lib.calendar":"Zaaikalender","lib.indoor_sow":"Binnen zaaien","lib.direct_sow":"Buiten zaaien","lib.transplant":"Uitplanten","lib.harvest":"Oogsten","lib.source.builtin":"Standaard","lib.source.custom":"Eigen","lib.source.override":"Aangepast","lib.id":"Code","lib.name_en":"Naam (Engels)","lib.name_nl":"Naam (Nederlands)","lib.scientific":"Wetenschappelijke naam","lib.variety":"Ras","lib.habit":"Groeiwijze","lib.windows_hint":"Weken ten opzichte van de gemiddelde laatste voorjaarsvorst (negatief = ervoor).","lib.weeks":"weken","lib.from":"van","lib.to":"tot","lib.saved":"{plant} opgeslagen.","cal.month":"Maand","cal.week":"Week","cal.list":"Lijst","cal.prev":"Vorige","cal.next":"Volgende","cal.show_done":"Afgeronde taken tonen","cal.add_task":"Nieuwe taak","cal.all_beds":"Alle bedden","task.complete":"Klaar","task.skip":"Overslaan","task.reopen":"Heropenen","task.postpone":"Uitstellen","task.postpone_1":"+1 dag","task.postpone_3":"+3 dagen","task.postpone_7":"+1 week","task.postpone_to":"Naar datum","task.note":"Notitie","task.notes":"Notities","task.photos":"Foto's","task.add_photo":"Foto toevoegen","task.priority":"Prioriteit","task.duration":"Duur (min)","task.due":"Datum","task.window":"Venster {start} \u2013 {end}","task.repeat":"Herhaalt elke {n} dagen","task.repeat_days":"Herhaal elke (dagen, optioneel)","task.title":"Titel","task.type":"Soort","task.bed":"Bed","task.description":"Omschrijving","task.shifted":"{n} afhankelijke taken schoven mee.","task.beyond_window":"Let op: de nieuwe datum ligt na het ideale venster.","task.completed":"Goed bezig! {title} gedaan.","task.source.generated":"Uit je plan","task.source.sensor":"Uit sensoren","task.source.weather":"Uit de weersverwachting","task.source.user":"Door jou toegevoegd","settings.region":"Klimaat & regio","settings.hemisphere":"Halfrond","settings.hemisphere.north":"Noordelijk","settings.hemisphere.south":"Zuidelijk","settings.mode":"Profiel","settings.mode.preset":"Regionale voorinstelling","settings.mode.usda":"USDA-winterhardheidszone","settings.mode.custom":"Eigen vorstdata","settings.preset":"Regio","settings.zone":"Winterhardheidszone","settings.last_frost":"Laatste voorjaarsvorst (MM-DD)","settings.first_frost":"Eerste najaarsvorst (MM-DD)","settings.frost_dates_now":"Dit seizoen: laatste vorst {last}, eerste vorst {first}.","settings.weather":"Weer & buitensensoren","settings.weather_entity":"Weerentiteit","settings.outdoor_temp":"Buitentemperatuur","settings.rain":"Regensensor","settings.zones":"Zones & microklimaat","settings.beds":"Bedden & sensoren","settings.zone_type.outdoor":"Buiten","settings.zone_type.greenhouse":"Kas","settings.zone_type.cold_frame":"Koude bak","settings.heated":"Verwarmd","settings.min_heating":"Verwarming houdt boven (\xB0C)","settings.sensors":"Sensoren","settings.sensor.soil_moisture":"Bodemvocht","settings.sensor.soil_temperature":"Bodemtemperatuur","settings.sensor.air_temperature":"Luchttemperatuur","settings.sensor.air_humidity":"Luchtvochtigheid","settings.sensor.light":"Licht","settings.sensor.rain":"Regen","settings.irrigation":"Beregeningsschakelaar/-klep","settings.flow":"Debiet (L/min)","settings.vent":"Raamopener / ventilatie","settings.notifications":"Meldingen","settings.persistent":"Blijvende meldingen","settings.notify_services":"Pushmeldingen (notify-diensten, kommagescheiden)","settings.tts":"Tekst-naar-spraak-entiteit","settings.tts_players":"Speakers (kommagescheiden)","settings.digest":"Dagelijks overzicht om","settings.frost_alerts":"Vorstwaarschuwingen","settings.heat_alerts":"Hittewaarschuwingen","settings.tts_frost":"Vorst omroepen via speakers","settings.general":"Algemeen","settings.language":"Taal","settings.language.auto":"Volg Home Assistant","settings.units":"Eenheden","settings.units_metric":"Metrisch (cm, \xB0C, mm, L)","settings.snap":"Rastergrootte (cm)","settings.radius":"Bereik buurplanten (cm)","settings.data":"Importeren & exporteren","settings.saved":"Instellingen opgeslagen.","type.sow_indoor":"Binnen zaaien","type.sow_direct":"Buiten zaaien","type.harden_off":"Afharden","type.transplant":"Uitplanten","type.thin":"Uitdunnen","type.stake":"Ondersteunen","type.prune":"Snoeien","type.pinch":"Toppen","type.earth_up":"Aanaarden","type.feed":"Bemesten","type.water":"Water geven","type.weed":"Wieden","type.pest_check":"Plaagcontrole","type.harvest":"Oogsten","type.ventilate":"Luchten","type.shade":"Schaduwen","type.frost_protect":"Vorstbescherming","type.custom":"Taak","priority.low":"Laag","priority.normal":"Normaal","priority.high":"Hoog","priority.urgent":"Dringend","status.planned":"Gepland","status.sown_indoors":"Binnen gezaaid","status.sown":"Gezaaid","status.transplanted":"Uitgeplant","status.harvesting":"Oogst loopt","status.finished":"Afgerond","status.failed":"Mislukt","risk.none":"geen","risk.low":"laag","risk.moderate":"matig","risk.high":"hoog","risk.unknown":"onbekend","moisture.dry":"Droog","moisture.slightly_dry":"Iets droog","moisture.optimal":"Optimaal","moisture.wet":"Nat","moisture.unknown":"Geen data","irrigation.none":"Geen water nodig","irrigation.water":"Geef {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Overslaan - regen verwacht","irrigation.check_manually":"Controleer met de hand (~{mm} mm)","gh.none":"Alles goed","gh.ventilate":"Luchten","gh.shade":"Nu schaduwen","gh.close_up":"Sluiten voor de nacht","gh.heat":"Verwarming aan","level.low":"Laag","level.medium":"Gemiddeld","level.high":"Hoog","suit.yes":"Geschikt","suit.no":"Niet geschikt","suit.conditional":"Mogelijk","frost.tender":"Vorstgevoelig","frost.half_hardy":"Half winterhard","frost.hardy":"Winterhard","frost.very_hardy":"Zeer winterhard","kind.in_ground":"Bed in de grond","kind.raised":"Verhoogd bed","kind.container":"Bak / pot","soil.sandy":"Zand","soil.loam":"Leem","soil.clay":"Klei","soil.silt":"L\xF6ss","soil.peat":"Veen","soil.chalk":"Kalk","soil.potting_mix":"Potgrond","wind.sheltered":"Beschut","wind.moderate":"Gemiddeld","wind.exposed":"Winderig","habit.bush":"Struik","habit.vine":"Rank","habit.climbing":"Klimmend","habit.upright":"Rechtop","habit.rosette":"Rozet","habit.root":"Wortelgewas","habit.bulb":"Bol","reason.soil_too_cold":"Grond is {soil} \xB0C; {plant} heeft {min} \xB0C nodig om te kiemen.","reason.soil_too_hot":"Grond is {soil} \xB0C; boven {max} \xB0C kiemt {plant} slecht.","reason.frost_forecast":"Vorst ({temp} \xB0C) verwacht voor {date}; {plant} is vorstgevoelig.","reason.window_open":"Het venster is open.","reason.window_not_yet":"Venster opent {date}.","reason.window_closed":"Venster sloot op {date}.","reason.not_greenhouse_suitable":"{plant} is niet geschikt voor de kas.","compat.friend":"{a} en {b} zijn goede buren: {reason}","compat.enemy":"{a} en {b} kun je beter niet samen planten: {reason}","compat.overlap":"{a} en {b} overlappen - te weinig ruimte.","compat.rotation":"{family} stond in {season} in {bed}; wacht {years} jaar.","compat.same_family_adjacent":"{a} en {b} zijn familie en delen plagen.","alert.frost":"Vorstrisico {level}: {temp} \xB0C verwacht {when}","alert.heat":"Hittestress in {zone}: {temp} \xB0C verwacht","alert.dry":"{bed} is droog ({moisture}%)","alert.sensor_stale":"Sensor {entity} heeft al een tijd niets gemeld","alert.forecast_unavailable":"Weersverwachting niet beschikbaar","when.tonight":"vannacht","when.tomorrow_night":"morgennacht","nav.handbook":"Handboek","nav.print":"Afdrukken","type.soil_prep":"Bodem klaarmaken","type.compost":"Compost","type.green_manure":"Groenbemester","type.mulch":"Mulchen","type.clean_greenhouse":"Serre kuisen","type.winter_prep":"Winterklaar maken","type.plan_season":"Seizoen plannen","type.tool_care":"Gereedschap","type.soil_test":"Bodemanalyse","type.cut_back":"Terugsnoeien","type.divide":"Scheuren","type.protect":"Beschermen","type.clean":"Opruimen","type.tie_in":"Aanbinden","type.thin_fruit":"Vruchten dunnen","type.pollinate":"Bestuiven","type.check":"Controleren","type.make_feed":"Plantengier maken","category.vegetable":"Groenten","category.herb":"Kruiden","category.fruit":"Fruit","category.flower":"Bloemen","feature.path":"Grindpad","feature.compost":"Composthoop / -vat","feature.water_butt":"Regenton","feature.shed":"Tuinhuis","feature.tree":"Boom","feature.hedge":"Haag","feature.trellis":"Klimrek","feature.other":"Overig","stage.not_planted":"Nog niet geplant","stage.establishing":"Aanslaan","stage.vegetative":"Groei","stage.flowering":"Bloei","stage.ripening":"Afrijping","stage.harvest":"Oogst","stage.finished":"Afgelopen","compat.deters":"{a} beschermt {b}: weert {pests}.","compat.trap":"{a} lokt {pests} weg van {b} (vangplant).","compat.allelopathy":"{a} scheidt groeiremmende stoffen af - houd uit de buurt van {b}.","compat.competition":"{a} en {b} zijn allebei zware eters zo dicht bij elkaar - geef extra compost of meer ruimte.","compat.shading":"{a} (ongeveer {height} cm hoog) zal {b} beschaduwen - zet hoge gewassen aan de kant weg van de zon.","compat.shade_benefit":"{a} geeft {b} welkome zomerschaduw.","alert.disease":"Ziekterisico {level} in {zone}","alert.nutrients":"Voedingsbalans in {bed}: {status}","autoplan.bed_not_empty":"{bed} heeft dit seizoen al gewassen - vink 'vervangen' aan om het opnieuw te plannen.","autoplan.no_beds":"Geen lege bedden om te vullen. Kies bedden en vink 'vervangen' aan.","autoplan.compost_short":"Er is ongeveer {need} kg compost nodig, je hebt {have} kg.","autoplan.time_over":"Ongeveer {need} min werk per week - meer dan de {have} min die je hebt.","autoplan.wanted_missing":"Geen plaats voor: {plants}.","autoplan.consider_irrigation":"Ongeveer {liters} L water in een droge zomerweek - druppelbevloeiing of een regenton bespaart je tijd.","autofill.title":"Automatisch invullen","autofill.intro":"Stelt gewassen, hoeveelheden en plaatsen voor seizoen {season} voor op basis van je bedden en middelen. Er verandert niets tot je het toepast.","autofill.household":"Personen in het gezin","autofill.hours":"Uren per week","autofill.water":"Water per week (L)","autofill.compost":"Beschikbare compost (kg)","autofill.has_irrigation":"Druppelbevloeiing / automatisch water geven aanwezig","autofill.goals":"Doelen","autofill.wanted":"Zeker erbij","autofill.excluded":"Nooit","autofill.beds":"Bedden","autofill.all_empty":"(alle lege bedden)","autofill.replace":"Gewassen van dit seizoen in de gekozen bedden vervangen","autofill.propose":"Voorstel maken","autofill.apply":"In het plan zetten","autofill.applied":"{n} teelten toegevoegd aan het plan","autofill.skipped":"Niet geplaatst","autofill.sum_crops":"{n} gewassen","autofill.sum_yield":"\u2248 {kg} kg oogst","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in een piekweek","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Verse groenten","autofill.goal.storage":"Bewaargroenten","autofill.goal.herbs":"Kruiden","autofill.goal.pollinators":"Bestuivers","autofill.goal.winter":"Wintergroenten","autofill.goal.perennials":"Vaste planten","autofill.goal.easy":"Weinig onderhoud","autofill.reason.no_suitable_bed":"geen geschikt bed","autofill.reason.no_space":"geen plaats","autofill.reason.time_budget":"tijdsbudget","autofill.reason.water_budget":"waterbudget","cal.timeline":"Tijdlijn","cal.garden_work":"Tuinwerk","cal.growing":"Groeit","cal.harvest_estimate":"Oogst verwacht rond {date}","cal.harvest_estimate_short":"Verwachte oogst (graaddagen)","cal.last_frost":"Laatste vorst","cal.first_frost":"Eerste vorst","cal.frost_dates":"Vorstdata","cal.no_plantings":"Dit seizoen nog geen gewassen gepland.","ctx.title":"Nu","ctx.moisture":"Bodemvocht","ctx.soil_temp":"Bodemtemperatuur","ctx.irrigation":"Water geven","ctx.water_balance":"Watertekort","ctx.nutrients":"Voedingsbalans","ctx.air_temp":"Luchttemperatuur","ctx.humidity":"Luchtvochtigheid","ctx.disease":"Ziekterisico","ctx.frost":"Vorstrisico","ctx.today":"Vandaag","ctx.rain":"Regen vandaag","ctx.et0":"Verdamping (ET\u2080)","dash.gdd_today":"Graaddagen vandaag","dash.water_climate":"Water & klimaat","dash.irrigation_mode":"Bewatering","dash.watering_now":"Bezig met {bed}","dash.stop":"Stop","dash.beds_need_water":"Bedden die water nodig hebben","dash.water_now":"Nu water geven","dash.safety_note":"Vorstvergrendeling, regen overslaan en maximale looptijd gelden altijd.","dash.disease_risk":"Ziekterisico","dash.nutrients":"Voeding","dash.water_balance":"Watertekort","dash.irrigation_started":"Bewatering gestart ({min} min)","dash.irrigation_stopped":"Bewatering gestopt","dash.irrigation_nothing":"Nu niets om water te geven","handbook.title":"Tuinhandboek","handbook.intro":"De achtergrond bij alles wat Hortulus aanraadt: bodem, zaaien, water, bemesting, vruchtwisseling, de serre en het tuinjaar.","handbook.contents":"Inhoud","handbook.overview":"Overzicht","handbook.glossary":"Woordenlijst","handbook.search":"Zoeken in het handboek","handbook.results":"Resultaten voor \u201C{query}\u201D","handbook.no_results":"Niets gevonden.","handbook.read_more":"Lees meer in het handboek","lib.category":"Categorie","lib.count":"{n} planten","lib.perennial":"overblijvend","lib.height":"Hoogte","lib.roots":"wortels","lib.gdd":"Graaddagen tot oogst","lib.base":"basis","lib.per_person":"Planten per persoon \xB7 opbrengst","lib.deters":"Weert","lib.trap_for":"Vangplant voor","lib.allelopathic":"Remt buren","lib.shade_tolerant":"Verdraagt schaduw","lib.plant":"Plant","planner.layer_zones":"Zones tonen","planner.layer_features":"Paden & elementen tonen","planner.layer_plantings":"Gewassen tonen","planner.add_feature":"Element","planner.align.left":"Links uitlijnen","planner.align.right":"Rechts uitlijnen","planner.align.top":"Boven uitlijnen","planner.align.bottom":"Onder uitlijnen","planner.align.hcenter":"Horizontaal centreren","planner.align.vcenter":"Verticaal centreren","planner.align.hdistribute":"Horizontaal verdelen","planner.align.vdistribute":"Verticaal verdelen","planner.aligned":"{n} items uitgelijnd","planner.moved_n":"{n} items verplaatst","planner.removed_n":"{n} items verwijderd","planner.selected_n":"{n} geselecteerd","planner.multi_hint":"Shift- of Ctrl-klik om meerdere bedden of gewassen te kiezen; sleep, lijn uit of verdeel ze daarna.","planner.alternatives":"Past in","planner.better_neighbours":"Betere buren","planner.heat_stress":"{n} hete dagen op komst","print.options":"Afdrukopties","print.document":"Document","print.page":"Papier","print.orientation":"Richting","print.portrait":"Staand","print.landscape":"Liggend","print.colors":"Kleuren","print.beds":"Bedden","print.days":"Dagen vooruit","print.title":"Titel","print.notes":"Notitievlak (stippelraster)","print.grid":"Raster van 10 cm op bedfiches","print.labels":"Gewasnamen op de kaart","print.download":"PDF downloaden","print.refresh":"Voorbeeld vernieuwen","print.save_config":"Opslaan in /config/hortulus/exports","print.saved_to_config":"PDF opgeslagen (/config/hortulus/exports)","print.preview":"Voorbeeld","print.empty":"Nog geen voorbeeld.","print.page_n":"Pagina {n} van {total}","print.all_greenhouses":"Alle serres","print.all_zones":"Alle zones","print.remarkable_hint":"reMarkable Paper Pro: 179,6 \xD7 239,5 mm, extra marge links voor de werkbalk. E-inkkleuren gebruiken lichte tinten en patronen zodat je pen zichtbaar blijft. Stuur de PDF via de reMarkable-app of e-mail.","print.doc.garden":"Tuinplan","print.doc.garden.hint":"Zones, bedden, gewassen, legende","print.doc.zone":"Serre / zone","print.doc.zone.hint":"E\xE9n zone, ingezoomd","print.doc.beds":"Bedfiches","print.doc.beds.hint":"Een pagina per bed met raster","print.doc.tasks":"Takenlijst","print.doc.tasks.hint":"Open taken per week","print.doc.season":"Seizoensoverzicht","print.doc.season.hint":"Tijdlijn zaaien \u2192 oogst","print.doc.blank":"Planningsblad","print.doc.blank.hint":"Omtrekken om op te schetsen","print.doc.plants":"Plantkaarten","print.doc.plants.hint":"Kerngegevens per gewas","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Volle kleur","print.color.eink":"E-ink (licht + patronen)","print.color.grayscale":"Grijstinten","settings.irrigation_hw":"Bewateringshardware","settings.irrigation_mode":"Modus","settings.irrigation_mode.off":"Uit","settings.irrigation_mode.advise":"Advies (alleen taken)","settings.irrigation_mode.auto":"Automatisch","settings.pump":"Pomp (schakelaar of kraan)","settings.start_time":"Starttijd","settings.max_runtime":"Max. looptijd per klep (min)","settings.frost_lockout":"Vorstvergrendeling onder (\xB0C)","settings.rain_skip":"Overslaan bij regenverwachting \u2265 (mm)","settings.pump_lead":"Pomp stopt v\xF3\xF3r klep (s)","settings.irrigation_hint":"{n} bedden hebben een klep. Stel per bed het debiet (L/min) in bij Bedden.","settings.resources":"Middelen (automatisch invullen)","settings.maintenance_tasks":"Seizoenswerk in de kalender (bodem klaarmaken, serre kuisen, winterrust ...)","settings.open_meteo":"Open-Meteo gebruiken voor vocht, wind en zon","settings.open_meteo_hint":"Optioneel en standaard uit: stuurt de afgeronde co\xF6rdinaten van de tuin naar api.open-meteo.com. Verbetert de verdampingsberekening (Penman-Monteith).","settings.elevation":"Hoogte (m)","settings.shade_entity":"Schaduwscherm (cover of schakelaar)","settings.climate_control":"Luchten & schaduw sturen","settings.climate_control.off":"Uit","settings.climate_control.advise":"Advies (taken)","settings.climate_control.auto":"Automatisch","settings.wall_heat":"Tegen een warme muur","settings.thermal_mass":"Thermische massa (watervaten, steen)","settings.sensor.par":"Licht (PAR)","settings.sensor.leaf_wetness":"Bladnat","settings.sensor.ec":"Bodem-EC","settings.sensor.npk_n":"Stikstof (N)","settings.sensor.npk_p":"Fosfor (P)","settings.sensor.npk_k":"Kalium (K)","task.postponed":"{title} {n} dag(en) uitgesteld","common.done":"Klaar","planner.removed_from":"{name} verwijderd vanaf seizoen {season} (historiek blijft).","planner.steps":"Bouw je tuinplan op in drie stappen","planner.step.site":"Terrein tekenen","planner.step.site.hint":"zones & elementen","planner.step.zones":"Zones inrichten","planner.step.zones.hint":"naam, bedden, eigen kaart","planner.step.plant":"Beplanten","planner.step.plant.hint":"zelf of door het systeem","planner.whole_garden":"Hele tuin","planner.zone_map":"Zonekaart","planner.site_intro":"Kies een zonetype of element en sleep een rechthoek op het raster (vakjes van 10 \xD7 10 cm). E\xE9n klik plaatst een standaardmaat. Dubbelklik op een zone om haar eigen kaart te openen.","planner.zones":"Zones","planner.elements":"Paden, gazon, bomen & meer","planner.your_zones":"Jouw zones","planner.no_zones":"Nog geen zones - begin met je moestuin, serre of boomgaard.","planner.open_zone":"Zonekaart openen","planner.next":"Volgende","planner.zones_intro":"Open een zone om ze een naam te geven en haar bedden op een eigen kaart te tekenen. Dit plan geldt voor dit seizoen; met de jaarovergang neem je het mee naar volgend jaar.","planner.n_beds":"{n} bedden","planner.zone_name":"Naam van de zone","planner.beds_in_zone":"Bedden & elementen in deze zone","planner.draw_bed":"Bed","planner.fill_by_hand":"Zelf invullen","planner.fill_by_system":"Laat het systeem invullen","planner.bed_needs_zone":"Teken een bed binnen een zone.","planner.draw_hint":"Sleep op het raster om te tekenen: {what}","planner.palette_for_zone":"Je ziet planten die passen in {zone}. Kies een categorie om alles te zien.","planner.perennial":"meerjarig","planner.bears_after":"vruchten na ~{n} jaar","planner.perennial_since":"Meerjarig - staat er sinds {season}. Op het einde van het jaar zet je hem expliciet over naar het volgende tuinplan (Jaarovergang).","planner.bearing_from":"Eerste oogst verwacht vanaf {season}.","planner.eco_tips":"Ecotips & huis-tuin-en-keukenmiddeltjes","planner.remove_perennial":"{name} verwijderen?","planner.remove_perennial_intro":"{name} werd geplant in {season} en staat elk jaar in je plan. Wat is er gebeurd?","planner.remove_from_season":"Weg vanaf {season}","planner.remove_from_season_hint":"Vorige jaren behouden hem (wisselteelthistoriek, oogsten, notities).","planner.remove_everywhere":"Volledig wissen","planner.remove_everywhere_hint":"Alsof hij nooit geplant werd - ook uit vorige jaren.","planner.legend.perennial":"meerjarig (blijft staan)","planner.legend.warning":"waarschuwing buren / wisselteelt","planner.legend.succession":"opeenvolgende zaai","planner.legend.rows":"zaairijen","planner.legend.border":"Randkleur = plantenfamilie (voor wisselteelt); het icoon toont het gewas zelf.","settings.zone_type.orchard":"Boomgaard","settings.zone_type.fruit":"Kleinfruit","settings.zone_type.herbs":"Kruidentuin","settings.zone_type.flowers":"Bloementuin","zone_hint.outdoor":"Moestuin: eenjarige gewassen met wisselteelt, bedden en paden.","zone_hint.greenhouse":"Serre: warmteminnende gewassen, klimaatsturing, verluchten en schaduw.","zone_hint.cold_frame":"Koude bak: afharden, vroege en late slaatjes.","zone_hint.orchard":"Boomgaard: fruitbomen die decennia blijven - jaarlijks snoeien, dunnen en oogsten.","zone_hint.fruit":"Kleinfruit: bessen, frambozen, druiven en kiwibessen.","zone_hint.herbs":"Kruidentuin: meerjarige en eenjarige kruiden, een bijenmagneet.","zone_hint.flowers":"Bloementuin: bestuivers, nuttige insecten en snijbloemen.","feature.terrace":"Terras","feature.lawn":"Gazon","feature.flowerbed":"Bloemperk","feature.fence":"Omheining","feature.pond":"Vijver","pollination.insects":"Heeft insecten nodig voor bestuiving - zet bloemen in de buurt.","pollination.wind":"Windbestuiving - plant in blokken, niet in \xE9\xE9n rij.","pollination.partner":"Heeft een bestuivingspartner (tweede ras) in de buurt nodig.","pollination.none":"Geen bestuiving nodig (blad, wortels).","planner.more":"Meer","settings.reminders":"Herinneringen","settings.overdue_reminders":"Herinner me aan blijven liggende taken","settings.overdue_time":"Tijdstip herinnering","settings.overdue_after":"Herinneren na (dagen te laat)","settings.weekly_plan":"Weekoverzicht vooraf","settings.weekly_day":"Dag","settings.weekly_time":"Tijdstip","settings.weather_aware":"Taken plannen volgens het weer","settings.weather_aware_hint":"Zaaien, uitplanten, spuiten, snoeien en mulchen schuiven automatisch naar de beste droge, vorstvrije en niet te hete dag binnen hun venster.","feature.house":"Huis","feature.driveway":"Oprit","feature.street":"Straat","feature.parking":"Parking","feature.play":"Speelhoek","feature.beehive":"Bijenkast","autofill.prefs":"Voorkeuren","autofill.freedom":"Keuzevrijheid van het systeem","autofill.freedom.strict":"Enkel wat ik wil","autofill.freedom.balanced":"Mijn wensen + doelen","autofill.freedom.free":"Vrij: verras me","autofill.pref.respect_companions":"Rekening houden met plantenburen","autofill.pref.add_pollinators":"Zelf bestuivingsbloemen toevoegen","autofill.pref.year_round":"Streven naar oogst het hele jaar","autofill.pref.allow_perennials":"Meerjarigen toegestaan","autofill.pref.match_zone_type":"Zonetype respecteren (boomgaard = fruit \u2026)","autofill.reason.pollinators":"bestuivers","nav.advice":"Advies","task.tools":"Je hebt nodig","advice.ask_title":"Vraag het aan Hortulus","advice.i_have":"Ik heb een","advice.mode.question":"vraag","advice.mode.problem":"probleem","advice.about":"met / over","advice.subject":"Onderwerp","advice.target":"Welke","advice.problem":"Vraag","advice.ask":"Vraag","advice.in_garden":"In je tuin","advice.all_plants":"Alle planten","advice.whole_garden":"de hele tuin","advice.subject.plant":"een plant / groente / fruit","advice.subject.greenhouse":"mijn serre","advice.subject.garden":"mijn tuin","advice.subject.bed":"een bed","advice.subject.tools":"gereedschap & benodigdheden","advice.q.status":"Hoe staat het ervoor?","advice.q.what_to_do":"Wat moet ik nu doen?","advice.q.when_sow":"Wanneer zaaien of planten?","advice.q.when_harvest":"Wanneer oogsten?","advice.q.growth":"het groeit slecht","advice.q.yellow_leaves":"gele bladeren","advice.q.wilting":"het hangt slap / verwelkt","advice.q.no_fruit":"bloeit maar geeft geen vruchten","advice.q.bolting":"het schiet door","advice.q.pests":"er zitten beestjes op","advice.q.disease":"vlekken, schimmel of rot","advice.q.feeding":"Hoe bemesten?","advice.q.watering":"Hoeveel water?","advice.q.pruning":"Hoe snoeien?","advice.q.companions":"Wat zet ik ernaast?","advice.q.too_hot":"het is te warm","advice.q.too_cold":"het is te koud","advice.q.winter_crops":"Wat kan er in de winter?","advice.q.year_round":"Hoe oogst ik het hele jaar?","advice.q.soil":"mijn grond is slecht","advice.q.slugs":"slakken!","advice.q.frost":"er komt vorst","advice.q.what_next":"Wat zet ik er hierna in?","advice.q.for_task":"Welk gereedschap voor deze klus?","advice.q.shopping":"Wat moet ik kopen?","advice.sec.status":"Nu in je tuin","advice.sec.facts":"Goed om te weten","advice.sec.causes":"Mogelijke oorzaken","advice.sec.actions":"Wat nu doen","advice.sec.remedies":"Eco- & huis-tuin-en-keukenmiddeltjes","advice.sec.prevention":"Volgende keer voorkomen","advice.sec.tasks":"Open taken","advice.read_more":"Lees meer in het handboek","advice.suggestions":"Voorstellen voor je tuin","advice.suggestions_intro":"Hortulus kijkt naar plaatsing, bestuiving, buren, oogst het hele jaar, bodem en ecologie.","advice.none":"Geen voorstellen - je plan ziet er prima uit!","advice.apply_add":"Toevoegen aan plan","advice.apply_open":"Toon in planner","advice.dismiss":"Verbergen","advice.no_space":"Geen vrije plaats in {bed}.","advice.kind.pollination":"Bestuiving","advice.kind.neighbours":"Buren","advice.kind.placement":"Plaatsing","advice.kind.year_round":"Hele jaar","advice.kind.soil":"Bodem","advice.kind.eco":"Ecologie","advice.kind.growth":"Groei","advice.kind.greenhouse":"Serre","advice.coverage":"Oogst per maand","advice.coverage_gaps":"Rode maanden hebben niets te oogsten - de voorstellen tonen wat ze opvult.","advice.coverage_full":"Elke maand iets te oogsten.","advice.nothing":"niets","advice.shopping":"Boodschappenlijst dit seizoen","advice.shopping_intro":"Berekend uit je plan: zaad, plantgoed, compost, bescherming en steun.","advice.nothing_to_buy":"Nog niets te kopen - plan eerst enkele teelten.","advice.tools_per_task":"Gereedschap per klus","advice.read_tools":"Gereedschap & zelf bemesting maken","advice.cat.seeds":"Zaad","advice.cat.plants":"Plantgoed","advice.cat.soil":"Bodem & bemesting","advice.cat.protection":"Bescherming","advice.cat.support":"Steun & mulch","advice.cat.other":"Overig","print.doc.year":"Jaarplan","print.doc.year.hint":"Maandmatrix: zaaien, planten, oogsten","nav.journal":"Logboek","task.assignee":"Toegewezen aan","task.anyone":"iedereen","task.harvested":"Geoogst:","journal.diary":"Dagboek","journal.harvest":"Oogst","journal.seeds":"Zaadvoorraad","journal.water":"Water","journal.new":"Nieuwe dagboeknotitie","journal.text":"Wat zag of deed je?","journal.placeholder":"Eerste tomaten kleuren, luizen op de tuinbonen \u2026","journal.kind":"Soort","journal.kind.note":"Notitie","journal.kind.observation":"Waarneming","journal.kind.problem":"Probleem","journal.kind.milestone":"Mijlpaal","journal.link":"Over","journal.whole_garden":"de hele tuin","journal.beds":"Bedden","journal.crops":"Teelten dit seizoen","journal.add_photo":"Foto toevoegen","journal.save":"Opslaan","journal.saved":"Bewaard in het dagboek.","journal.filter":"Filter","journal.all":"Alles","journal.empty":"Nog geen notities - schrijf op wat je ziet: de beste tuinleraar.","journal.log_harvest":"Oogst registreren","journal.what":"Gewas","journal.kg":"Gewicht (kg)","journal.count":"Aantal","journal.day":"Datum","journal.quality":"Kwaliteit","journal.learn_hint":"Hortulus leert hieruit je eigen opbrengst per m\xB2 en gebruikt die bij Automatisch invullen en advies.","journal.harvest_saved":"Oogst bewaard.","journal.harvest_season":"Oogst {season}","journal.crops_n":"{n} gewassen","journal.yield":"jouw opbrengst {kg} kg/m\xB2 (database {db})","journal.recent":"Laatste registraties","journal.no_harvest":"Nog niets geregistreerd.","journal.add_seed":"Zaadzakje toevoegen","journal.variety":"Ras","journal.year":"Jaar","journal.quantity":"Hoeveelheid","journal.unit":"Eenheid","journal.unit.packet":"zakje(s)","journal.unit.seeds":"zaden","journal.unit.g":"g","journal.source":"Herkomst","journal.source_hint":"winkel, ruil, eigen zaad \u2026","journal.seed_saved":"Zaadzakje bewaard.","journal.seed_missing":"Nog nodig voor dit seizoen","journal.seed_hint":"Zaad blijft 1-2 jaar (pastinaak, ui) tot 5-6 jaar (kolen, pompoenachtigen) goed. Oud zaad: doe een kiemproef.","journal.seed_box":"Zaaddoos","journal.status":"Status","journal.needed":"nodig dit seizoen","journal.seed.ok":"goed","journal.seed.use_soon":"dit jaar opmaken","journal.seed.expired":"oud (test het)","journal.seed.empty":"op","journal.seed.unknown":"jaar onbekend","journal.no_seeds":"Nog geen zaadzakjes.","journal.water_setup":"Koppel een watermeter en/of een niveausensor van de regenton in Instellingen \u203A Water om je tuinwater te volgen.","journal.water_week":"Leidingwater, 7 dagen","journal.water_season":"Leidingwater dit jaar","journal.rain_available":"Beschikbaar regenwater","journal.per_day":"Per dag (laatste 14 dagen)","journal.water_hint":"Watertaken vermelden hoeveel regenwater er nog is, zodat je dat eerst gebruikt.","cal.year":"Jaar","cal.tasks_per_month":"Taken","cal.act.sow_indoor":"binnen zaaien","cal.act.sow":"zaaien","cal.act.plant":"uitplanten","cal.act.grow":"groeit","cal.act.harvest":"oogsten","cal.act_short.sow_indoor":"Z","cal.act_short.sow":"Z","cal.act_short.plant":"P","cal.act_short.harvest":"O","settings.water":"Watermeter & regenton","settings.water_meter":"Watermeter tuin (m\xB3 of L)","settings.butt_level":"Peil regenton (%)","settings.butt_capacity":"Totale inhoud regentonnen (L)","settings.water_hint":"Hortulus bewaart \xE9\xE9n meting per dag. Je krijgt het verbruik per week, het regenwater dat nog beschikbaar is, en watertaken zeggen hoeveel je daarvan eerst kunt gebruiken.","settings.household":"Huishouden & spraak","settings.nobody":"Niemand (niet toegewezen)","settings.default_person":"Standaard gebruiken","settings.no_persons":"Geen personen gevonden. Voeg personen toe via Instellingen \u2192 Personen om taken toe te wijzen.","settings.assign_default":"Nieuwe taken gaan naar","settings.assign_per_type":"Per soort taak","settings.person_notify":"Persoonlijke herinneringen","settings.person_notify_hint":"Iedereen krijgt zijn eigen taken via deze notify-dienst (dagoverzicht en herinneringen voor achterstallige taken).","settings.voice":"Spraak (Assist)","settings.voice_hint":"Vraag Assist \u201Ewat moet ik vandaag in de tuin doen?\u201D, \u201Ehoeveel heb ik geoogst?\u201D, \u201Evriest het vannacht?\u201D. Installeer de zinnen \xE9\xE9n keer; ze werken in het Nederlands en Engels.","settings.voice_install":"Spraakzinnen installeren","settings.voice_installed":"Spraakzinnen ge\xEFnstalleerd","soil_test.title":"Bodemanalyse","soil_test.none":"Nog geen bodemanalyse.","soil_test.add":"Bodemanalyse toevoegen","soil_test.om":"Organische stof (%)","soil_test.lime":"Kalktoestand","soil_test.lime.low":"te laag","soil_test.lime.ok":"goed","soil_test.lime.high":"hoog","soil_test.hint":"Labo-rapport of thuistest. Hortulus past het bemestingsplan en kalkadvies van dit bed aan de laatste analyse aan.","cal.hours":"{n} u","planner.other_season":"{name} (seizoen {year})","journal.system":"Systeemlogboek","syslog.intro":"Elke wijziging in Hortulus staat hier: wat jij of een ander deed in het paneel, via automatiseringen, en wat Hortulus zelf aanpaste (taken, opruimen). Draai een regel terug om de toestand van v\xF3\xF3r die actie te herstellen; het terugdraaien zelf komt ook in het logboek en kan je dus weer ongedaan maken.","syslog.show_system":"Automatische acties van Hortulus tonen","syslog.empty":"Nog niets gelogd.","syslog.by_system":"Hortulus (automatisch)","syslog.by_unknown":"Automatisering of dienst","syslog.is_undone":"teruggedraaid","syslog.undo":"Terugdraaien","syslog.undone":"Teruggedraaid.","syslog.confirm":"Terugdraaien: {what}?","syslog.conflict":"{n} onderdeel/onderdelen zijn sindsdien opnieuw gewijzigd. Toch terugdraaien? Die latere wijzigingen gaan dan verloren.","syslog.blocked":"Kan niet terugdraaien: dit zou verwijzen naar een bed, zone of plant die intussen verwijderd is. Draai eerst die latere verwijdering terug.","syslog.more":"Oudere regels laden","syslog.and_more":"\u2026 en nog {n}","syslog.n_changes":"{verb} \u2013 {n} onderdelen","syslog.op.add":"Toegevoegd","syslog.op.remove":"Verwijderd","syslog.op.change":"Gewijzigd","syslog.op.mixed":"Aangepast","syslog.reason.plan":"planner","syslog.reason.import":"import","syslog.reason.tasks":"taken","syslog.reason.settings":"instellingen","syslog.reason.plants":"plantenbibliotheek","syslog.reason.records":"logboek","syslog.reason.auto":"automatisch","syslog.reason.undo":"Terugdraaiing","syslog.col.zones":"Zone","syslog.col.beds":"Bed","syslog.col.plantings":"Teelt","syslog.col.tasks":"Taak","syslog.col.custom_plants":"Eigen plant","syslog.col.features":"Tuinelement","syslog.col.harvest_log":"Oogst","syslog.col.journal":"Dagboeknotitie","syslog.col.seed_stock":"Zaadvoorraad","syslog.col.rotation_history":"Teeltgeschiedenis","syslog.col.irrigation_log":"Beregening","syslog.col.plant_overrides":"Plantgegevens","syslog.col.settings":"Instelling","planner.draw_site":"Terrein & elementen","planner.draw_planter":"Bloembak / pot","planner.draw_planter_hint":"Teken een bloembak, pot of plantenbak - die kan je daarna beplanten zoals een bed.","planner.new_planter":"Bloembak","planner.elements_in_zone":"Paden, terras, gazon, haag \u2026 in deze zone","planner.elements.buildings":"Gebouwen & verharding","planner.elements.paths":"Paden","planner.elements.green":"Groen","planner.elements.outdoor_living":"Buitenleven & uitrusting","feature.stone_path":"Stenen pad","feature.wood_path":"Houten pad","feature.stepping_stones":"Stapstenen","feature.bark_path":"Schorspad","feature.decking":"Vlonder","feature.wall":"Muur","feature.carport":"Carport / garage","feature.shrub":"Heester","feature.pool":"Zwembad","feature.seating":"Zithoek","settings.zone_type.garden":"Siertuin","settings.zone_type.containers":"Bloembakken & potten","zone_hint.garden":"Siertuin: heesters, borders en vaste planten rond gazon en terras.","zone_hint.containers":"Bloembakken & potten: op terras, balkon of vensterbank - teken elke bak of pot en beplant hem.","settings.display":"Weergave (deze browser)","settings.photos":"Foto's van planten tonen (Wikipedia)","settings.photos_hint":"Bovenop de tekening toont Hortulus een foto van Wikipedia, gezocht op de Latijnse naam. Je browser haalt die rechtstreeks op bij Wikipedia (met bronvermelding); zonder internet of als dit uit staat zie je de tekening.","nav.layout":"Tuinplan","advice.apply_transition":"Jaarovergang openen","layout.current":"huidig","layout.no_plan":"geen tuinplan","layout.edit":"Tuinplan bewerken","layout.to_planner":"Naar de planner","layout.make":"Tuinplan {season} maken","layout.planting_on":"op het tuinplan van {season} - zones, bedden en elementen pas je aan in Tuinplan","layout.started":"Tuinplan {season} gestart.","layout.none_title":"Nog geen tuinplan voor {season}","layout.none_intro":"Een tuinplan legt de vorm van je tuin vast voor \xE9\xE9n jaar: zones (volle grond, serre, potten \u2026), bedden en elementen zoals oprit, huis, haag, gras, tuinhuis of watervat - zonder planten. Begin vanaf een ander jaar of leeg.","layout.none_plant":"Je beplant een jaar op zijn eigen tuinplan, en voor {season} is er nog geen. Maak het in Tuinplan, of zet {live} over met de jaarovergang.","layout.none_hint":"Niets gaat vanzelf naar een nieuw jaar: het tuinplan en wat er doorloopt (vaste planten, overwinterende gewassen) zet je op het einde van het jaar expliciet over.","layout.copy_from":"Kopieer tuinplan {season}","layout.start_empty":"Leeg beginnen","year.button":"Jaarovergang","year.title_short":"Jaarovergang","year.title":"Jaarovergang {from} \u2192 {to}","year.intro":"Niets gaat vanzelf mee naar {to}. Kies welk deel van het tuinplan en welke gewassen je overzet; de rest blijft in {from}. Alles komt in het systeemlogboek en kan je terugdraaien.","year.plan":"Tuinplan","year.keep":"Gebruik het tuinplan dat je al voor {to} maakte","year.copy":"Kopieer het tuinplan van {from} (kies hieronder wat meegaat)","year.copy_hint":"Het tuinplan van {to} wordt een kopie van {from}. Vink uit wat niet meer meegaat.","year.elements":"Elementen (oprit, huis, haag, paden \u2026)","year.perennials":"Vaste planten, bomen en struiken","year.overwinter":"Overwinterende gewassen (lopen door na het einde van het jaar)","year.none":"Geen.","year.bed_gone":"bed niet in het nieuwe tuinplan","year.not_chosen":"Wat je niet aanvinkt, blijft in het oude jaar en krijgt geen taken in {to}.","year.activate":"Maak {to} meteen het actieve tuinjaar","year.activate_hint":"Het tuinplan van {from} wordt gearchiveerd en {to} wordt je tuin: taken, sensoren en beregening volgen het nieuwe plan.","year.prepare_hint":"Alleen voorbereiden: het tuinplan van {to} wordt klaargezet, {from} blijft je actieve tuin.","year.apply":"Overzetten naar {to}","year.done":"Je tuin staat nu in {season} - {n} gewas(sen) overgezet.","year.prepared":"Tuinplan {season} klaargezet - {n} gewas(sen) overgezet.","year.skipped":"{n} gewas(sen) niet overgezet: hun bed zit niet in het nieuwe tuinplan.","layout.save_first":"Je wijzigingen zijn nog niet opgeslagen - probeer het zo opnieuw.","reason.zone_type":"{zone} is een {zone_type}: daar horen {allowed}, geen {category}.","reason.not_under_glass":"Hoort niet onder glas ({zone}).","reason.too_late":"Te laat voor seizoen {season}: het zaai-/plantvenster liep tot {until}.","reason.too_late_nodate":"Te laat voor seizoen {season}: het zaai-/plantvenster is voorbij.","reason.frost_before_harvest":"Vorst ({frost}) komt v\xF3\xF3r de eerste oogst ({harvest}) - kies de serre of volgend jaar vroeger.","reason.rotation":"Wisselteelt: {family} stond hier in {season} - wacht {years} jaar.","reason.bad_neighbour":"Slechte buur: {plant} staat al in dit bed.","reason.no_space":"Geen plaats meer: {free_m2} m\xB2 vrij, nodig {need_m2} m\xB2.","reason.no_suitable_bed":"Geen bed waar dit gewas past.","reason.time_budget":"Past niet meer in je tijd per week.","reason.water_budget":"Past niet meer in je water per week.","reason.compost_budget":"Past niet meer in je compost.","autofill.mostly_late":"{n} gewassen zijn te laat voor seizoen {season}: hun zaai- of plantmoment is voorbij. Wil je {next} invullen?","autofill.fill_next":"{season} invullen","autofill.skipped_why":"waarom niet?","autoplan.plan_from":"Voor {season} is er nog geen tuinplan: het voorstel gebruikt het plan van {from}. Bij toepassen wordt dat plan voor {season} gekopieerd.","autoplan.no_plan":"Er is nog geen tuinplan voor {season} - teken het eerst in Tuinplan.","plans.button":"Plannen","plans.title":"Plannen voor {season}","plans.intro":"Begin opnieuw met een volledig nieuw plan. Het huidige plan - met zijn bedden en gewassen - wordt non-actief gezet en bewaard; je kunt het later weer actief maken.","plans.new":"Nieuw plan beginnen","plans.start.empty":"Volledig leeg (vanaf 0)","plans.start.empty.hint":"Geen zones, bedden, elementen of gewassen - je tekent alles opnieuw.","plans.start.zones":"Zelfde zones, leeg","plans.start.zones.hint":"De zones en de elementen (huis, paden, haag \u2026) blijven, zonder bedden en zonder gewassen.","plans.start.zones_beds":"Zelfde zones en bedden, zonder gewassen","plans.start.zones_beds.hint":"De hele indeling blijft; alleen alle gewassen van dit seizoen gaan eruit.","plans.old_name":"Naam voor het huidige plan","plans.old_name_hint":"bv. Plan {season} \u2013 eerste versie","plans.start_button":"Nieuw plan starten","plans.inactive":"Niet-actieve plannen","plans.none":"Nog geen niet-actieve plannen.","plans.counts":"{zones} zones \xB7 {beds} bedden \xB7 {plantings} gewassen","plans.activate":"Activeren","plans.confirm_new":"Het huidige plan van {season} wordt non-actief gezet (met zijn gewassen) en je begint een nieuw plan. Doorgaan?","plans.confirm_activate":"{name} weer actief maken voor {season}? Het plan dat nu actief is, wordt non-actief gezet.","plans.confirm_delete":"{name} definitief verwijderen? (Terugdraaien kan nog via het systeemlogboek.)","plans.started":"Nieuw plan voor {season} gestart - het vorige staat bij de niet-actieve plannen.","plans.activated":"{name} is weer actief.","plans.deleted":"{name} verwijderd.","nav.analysis":"Analyse","syslog.error":"Fout","analysis.check":"Controle","analysis.why":"Waarom niet?","analysis.errors":"Fouten","analysis.log":"Systeemlogboek","analysis.check_title":"Controle van je tuin","analysis.recheck":"Opnieuw controleren","analysis.check_intro":"Hortulus legt zijn tuinplannen, gewassen en seizoenen naast elkaar en zoekt wat niet klopt of wat onverwacht gedrag verklaart.","analysis.all_good":"Niets vreemds gevonden.","analysis.to_planner":"Naar de planner","analysis.count.zones":"Zones","analysis.count.beds":"Bedden","analysis.count.features":"Elementen","analysis.count.plantings":"Gewassen (alle jaren)","analysis.count.plans":"Jaren met tuinplan","analysis.count.archived_plans":"Niet-actieve plannen","analysis.count.log_entries":"Logboekregels","analysis.why_title":"Waarom past een plant (niet)?","analysis.why_intro":"Kies een plant en een seizoen: per bed zie je of hij past, en zo niet, waarom - dezelfde regels als bij slepen en bij Automatisch invullen.","analysis.no_beds":"Dit tuinplan heeft nog geen bedden.","analysis.free":"{m2} m\xB2 vrij","analysis.fits":"Past hier.","analysis.warning":"Let op","analysis.errors_title":"Fouten en geweigerde acties","analysis.errors_intro":"Elke actie die mislukte of geweigerd werd (bv. een plan dat niet klopte, een wijziging die tegelijk elders gebeurde) komt hier, met wanneer en door wie.","analysis.no_errors":"Geen fouten gelogd.","analysis.error.invalid_plan":"Plan geweigerd","analysis.error.revision_conflict":"Tegelijk elders gewijzigd","analysis.error.unknown_bed":"Onbekend bed","analysis.error.unknown_plant":"Onbekende plant","analysis.error.unknown_record":"Niet gevonden","analysis.error.unexpected":"Onverwachte fout","analysis.error.invalid_format":"Ongeldige gegevens","analysis.issue.transition_due":"De jaarovergang {from} \u2192 {to} is nog niet gedaan.","analysis.issue.transition_due.why":"Niets gaat vanzelf naar {to}: vaste planten en het tuinplan van {from} krijgen geen taken in {to} tot je ze overzet.","analysis.issue.season_without_plan":"Seizoen {season} heeft {n} gewas(sen) maar geen tuinplan.","analysis.issue.season_without_plan.why":"Zonder tuinplan toont de planner die gewassen niet. Kopieer of teken het tuinplan van {season}.","analysis.issue.planting_not_on_plan":"{n} gewas(sen) in {season} staan op een bed dat niet in het tuinplan van {season} zit: {plants}.","analysis.issue.planting_not_on_plan.why":"Ze zijn onzichtbaar op de kaart en krijgen geen taken. Meestal is het bed verwijderd of hoort het bij een ander jaar of een niet-actief plan. Zet het bed terug of verwijder de gewassen.","analysis.issue.unknown_plant":"Onbekende plant in {season}: {ids}.","analysis.issue.unknown_plant.why":"Een eigen plant werd verwijderd terwijl ze nog in het plan stond.","analysis.issue.bed_without_zone":"Bed {bed} ({season}) hoort bij geen enkele zone.","analysis.issue.bed_without_zone.why":"Geef het bed een zone in Tuinplan.","analysis.issue.bed_outside_zone":"Bed {bed} ligt (deels) buiten zone {zone} ({season}).","analysis.issue.bed_outside_zone.why":"Het bed telt voor zone {zone} (klimaat, sensoren), maar ligt er niet in. Verschuif het bed of vergroot de zone.","analysis.issue.zone_without_beds":"Zone {zone} heeft geen bedden ({season}).","analysis.issue.zone_without_beds.why":"In een zone zonder bed kan je niets planten - ook Automatisch invullen niet. Teken een bed (of bloembak) in Tuinplan.","analysis.issue.planting_outside_bed":"{plant} steekt buiten bed {bed} uit ({season}).","analysis.issue.planting_outside_bed.why":"Plantafstand en aantallen kloppen dan niet. Versleep of verklein de teelt.","analysis.issue.plantings_overlap":"{a} en {b} liggen over elkaar in {bed} ({season}).","analysis.issue.plantings_overlap.why":"Beide staan tegelijk op dezelfde plek: te weinig ruimte, en dat geeft de meldingen over overlappen.","analysis.issue.planting_too_late":"{plant} is voor {season} te laat gepland.","analysis.issue.planting_too_late.why":"Het zaai-/plantvenster is voorbij: de datums schuiven op naar vandaag en de oogst komt (te) laat. Plan het voor {next} of pas de datums aan.","analysis.issue.perennial_not_carried":"{n} vaste plant(en) werden niet meegenomen naar {season}: {plants}.","analysis.issue.perennial_not_carried.why":"Bij de jaarovergang niet aangevinkt - ze krijgen geen taken in {season}. Bewust? Anders: draai de jaarovergang terug via het systeemlogboek en doe ze opnieuw.","nav.crops":"Teelten","crops.intro":"Alle gewassen van dit seizoen op \xE9\xE9n lijst. Pas datums, methode, status, aantal en notities hier rechtstreeks aan - zonder iets te verslepen. Laat je een geplande datum leeg, dan rekent Hortulus ze zelf uit (grijs eronder).","crops.search":"Zoek op gewas, bed of zone","crops.group":"Ordenen","crops.group.bed":"per bed","crops.group.plant":"per gewas","crops.group.date":"op datum","crops.method":"Methode","crops.status":"Status","crops.count":"Aantal planten","crops.notes":"Notities","crops.computed":"berekend","crops.field.sow_date":"Zaaien (gepland)","crops.field.sown_on":"Gezaaid op","crops.field.transplant_date":"Uitplanten (gepland)","crops.field.transplanted_on":"Uitgeplant op","crops.field.harvest_started_on":"Oogst gestart","crops.field.finished_on":"Afgerond op","crops.late":"Te laat gepland voor dit seizoen - de datums schuiven op naar vandaag.","crops.no_bed":"geen bed in dit plan","crops.none":"Nog geen gewassen in {season}.","crops.window.sow":"Zaaivenster","crops.window.transplant":"Uitplantvenster","crops.in_ground":"In de grond","crops.harvest":"Oogst","crops.detail_hint":"Elke wijziging wordt meteen bewaard en komt in het systeemlogboek. Plaats en grootte pas je aan in de planner.","planner.why_here":"Waarom (niet) hier?","planner.to_crops":"In Teelten","planner.plant_info":"Plantinfo","planner.why_ok":"Past in {bed}.","planner.why_not":"Past niet goed in {bed}:","planner.why_no_bed":"Dit bed staat niet op het tuinplan van dit seizoen.","planner.why_fits_in":"Past wel in: {beds}.","planner.why_fits_nowhere":"Past dit seizoen in geen enkel bed.","planner.rotation_strip":"Vruchtwisseling: plantenfamilies in dit bed de laatste jaren","planner.late_title":"Seizoen {season} loopt ten einde","planner.late_still":"Dit kan nog: {n} planten. Klik er een aan om hem in het gekozen bed te zetten.","planner.late_none":"Er past dit seizoen bijna niets meer.","planner.late_add_hint":"In het geselecteerde bed zetten","planner.late_next":"Plan {season}","planner.drop_bad":"{plant} past hier niet goed","analysis.compare":"Vergelijken","analysis.badge":"{errors} fout(en), {warnings} waarschuwing(en)","analysis.fixed":"Opgelost. Je kan dit terugdraaien in het systeemlogboek.","analysis.export":"Diagnose exporteren","analysis.fix.season_without_plan":"Tuinplan kopi\xEBren","analysis.fix.planting_not_on_plan":"In een bed van dit plan zetten","analysis.fix.planting_outside_bed":"Terug in het bed zetten","analysis.fix.bed_outside_zone":"Bed in de zone schuiven","analysis.fix.perennial_not_carried":"Overzetten naar dit jaar","crops.bulk":"Meerdere teelten aanpassen","crops.bulk_n":"{n} geselecteerd","crops.bulk_date":"Datum","crops.pick_date":"Kies een datum","crops.bulk_apply":"Toepassen","crops.bulk_done":"{n} teelten aangepast.","crops.pick_all":"Alles selecteren","crops.show_on_map":"Toon op kaart","compare.title":"Plannen vergelijken","compare.intro":"Zet twee tuinplannen naast elkaar - van een seizoen of een niet-actief plan - en zie wat toegevoegd, verdwenen of veranderd is.","compare.button":"Vergelijk","compare.season_plan":"Tuinplan {season}","compare.inactive_plan":"{name} (niet-actief, {season})","compare.from":"Van","compare.to":"Naar","compare.identical":"Deze plannen zijn gelijk.","compare.zones":"Zones","compare.beds":"Bedden","compare.features":"Elementen","compare.crops":"Gewassen","compare.what.moved":"verplaatst of andere maat","compare.what.renamed":"hernoemd","compare.what.zone":"andere zone","compare.what.type":"ander type","compare.what.bed":"ander bed","compare.what.status":"andere status","valve.stuck_title":"Kraan staat open","valve.stuck":"{what} ({entity}) staat al veel langer open dan een beregeningsbeurt duurt.","valve.stuck_since":"Open sinds {time}. Hangt hij vast, of werd hij met de hand geopend?","valve.pump":"De pomp","valve.close":"Kraan sluiten","valve.closed":"Kraan is dicht.","valve.still_open":"De kraan meldt nog steeds: {state}. Kijk hem na.","valve.test":"Test (5 s)","valve.testing":"Bezig met testen\u2026","valve.test_confirm":"{entity} 5 seconden openen om te testen? (de pomp draait mee als die ingesteld is)","valve.test_ok":"Werkt: ging open ({open}) en weer dicht ({closed}).","valve.test_no_open":"Ging niet open: de kraan meldt {state}. Kijk de verbinding of de entiteit na.","valve.test_no_close":"Ging open, maar meldt na het sluiten nog {state}. Kijk de kraan na.","valve.test_save_first":"Sla de instellingen eerst op; Hortulus test alleen kranen die al gekoppeld zijn.","water.per_bed":"Bewatering per bed","water.days":"{n} dagen","water.given":"Water gegeven","water.rain":"Regen","water.moisture":"Bodemvocht","water.no_moisture":"geen vochtsensor","water.chart_title":"Bewatering van {bed}","water.chart_empty":"Nog geen gegevens voor deze periode.","water.chart_hint":"Bodemvocht komt uit de geschiedenis van Home Assistant, het gegeven water uit het logboek van Hortulus, regen uit de regensensor (dagmaximum). Zo zie je of een beurt echt doorging en effect had.","crops.view.list":"Lijst","crops.view.weeks":"Zaaiplan","crops.view.seeds":"Zaden","crops.view.follow":"Opvolgteelt","crops.view.harvest":"Oogstverwachting","crops.all_dates":"Alle datums","plan.act.sow_indoor":"Binnen zaaien","plan.act.sow_direct":"Buiten zaaien","plan.act.transplant":"Uitplanten","plan.act.harvest":"Oogst begint","plan.done":"Gedaan","plan.weeks_title":"Zaaiplan","plan.n_weeks":"{n} weken","plan.weeks_intro":"Wat je de komende weken binnen of buiten zaait, uitplant en begint te oogsten. Gedaan vult de echte datum (vandaag) in bij de teelt.","plan.overdue":"Achterstand ({n})","plan.week_of":"Week van {date}","plan.seeds_title":"Zaden voor {season}","plan.seeds_intro":"Hoeveel zaad het plan nog nodig heeft (aantal planten met een marge voor kieming, uitdunnen en vraat) tegenover je zaadvoorraad.","plan.plants":"Planten","plan.seeds":"Zaden","plan.in_stock":"In voorraad","plan.seed.ok":"Genoeg","plan.seed.check":"Nakijken","plan.seed.short":"Te weinig","plan.seed.none":"Kopen","plan.seeds_hint":"Zakjes en grammen kan Hortulus niet tellen: daar staat 'Nakijken'. Gekochte plantjes en wat al gezaaid is tellen niet mee.","plan.seeds_none":"Het plan heeft geen zaad meer nodig.","plan.follow_title":"Opvolgteelt","plan.follow_intro":"Bedden die dit seizoen vrijkomen en wat daar daarna nog past - zelfde regels als automatisch invullen, zonder dezelfde plantenfamilie.","plan.free_from":"vrij vanaf {date}","plan.after":"na {plants}","plan.ready_by":"oogst vanaf {date}","plan.follow_nothing":"Daarna past er dit seizoen niets meer.","plan.follow_none":"Geen bedden die dit seizoen nog vrijkomen.","plan.harvest_title":"Oogstverwachting {season}","plan.harvest_intro":"Verwachte oogst per week, samen ongeveer {kg} kg. Gebaseerd op de oppervlakte, de opbrengst per m\xB2 (je eigen oogsten waar die er zijn) en het oogstvenster.","plan.learned":"jouw opbrengst","plan.book_yield":"gemiddelde opbrengst","plan.harvest_none":"Nog geen oogst verwacht in dit seizoen."};var ua={en:ns,nl:en},rt=c=>(c??"en").toLowerCase().split(/[-_]/)[0]==="nl"?"nl":"en";function Et(c){let r=ua[rt(c)];return(e,t={})=>(r[e]??ns[e]??e).replace(/\{(\w+)\}/g,(n,a)=>{let i=t[a];return i==null?`{${a}}`:e.startsWith("alert.")&&a==="level"?r[`risk.${i}`]??String(i):e.startsWith("alert.")&&a==="when"?r[String(i)]??String(i):Array.isArray(i)?i.join(", "):String(i)})}var ma=c=>c.replace(/_/g," ").replace(/^\w/,r=>r.toUpperCase()),tn={aphids:"bladluis",whitefly:"witte vlieg",red_spider_mite:"spint",thrips:"trips",slugs:"slakken",cabbage_white:"koolwitje",cabbage_root_fly:"koolvlieg",flea_beetle:"aardvlo",carrot_fly:"wortelvlieg",onion_fly:"uienvlieg",leek_moth:"preimot",pea_moth:"erwtenbladroller",birds:"vogels",pigeons:"duiven",black_bean_aphid:"zwarte bonenluis",bean_weevil:"bonenkever",leaf_miner:"bladmineerder",late_blight:"phytophthora",early_blight:"alternaria (vroeg)",blossom_end_rot:"neusrot",botrytis:"grauwe schimmel",powdery_mildew:"echte meeldauw",downy_mildew:"valse meeldauw",cucumber_mosaic_virus:"komkommermoza\xEFekvirus",clubroot:"knolvoet",white_rot:"witrot",rust:"roest",alternaria:"alternaria",leaf_spot:"bladvlekken",root_rot:"wortelrot",anthracnose:"vlekkenziekte",halo_blight:"vetvlekkenziekte",chocolate_spot:"chocoladevlekken",damping_off:"kiemplantenziekte",ants:"mieren",asparagus_beetle:"aspergekever",canker:"kanker",celery_fly:"selderijvlieg",colorado_beetle:"coloradokever",nematodes:"aaltjes",scab:"schurft",smut:"builenbrand",verticillium_wilt:"verwelkingsziekte",wireworm:"ritnaald"},lt=(c,r)=>rt(r)==="nl"&&tn[c]?tn[c]:ma(c);var sn=S`
  :host {
    /* -- brand palette ------------------------------------------------ */
    --hl-leaf-900: #1f3d1c;
    --hl-leaf-700: #2f5d2a;
    --hl-leaf-600: #3b7334;
    --hl-leaf-500: #4c8c3f;
    --hl-leaf-300: #9cc58a;
    --hl-leaf-100: #e4f0dc;
    --hl-leaf-50: #f3f8ef;
    --hl-soil-900: #2e2118;
    --hl-soil-700: #5a3f2b;
    --hl-soil-500: #8b6446;
    --hl-soil-300: #c4a587;
    --hl-soil-100: #efe4d6;
    --hl-sun-500: #e8a33d;
    --hl-sun-100: #fbefd9;
    --hl-tomato-600: #a8331f;
    --hl-tomato-500: #c8432f;
    --hl-tomato-100: #f8e1dc;
    --hl-frost-600: #2f6690;
    --hl-frost-500: #5b8db8;
    --hl-frost-100: #e1ecf5;
    --hl-water-500: #3a7ca5;

    /* -- semantic (light) --------------------------------------------- */
    --hl-bg: #faf7f0;
    --hl-surface: #ffffff;
    --hl-surface-2: #f3efe6;
    --hl-surface-3: #e9e3d6;
    --hl-text: #22281f;
    --hl-text-muted: #5e6658;
    --hl-border: #e2dccd;
    --hl-primary: var(--hl-leaf-600);
    --hl-primary-hover: var(--hl-leaf-700);
    --hl-on-primary: #ffffff;
    --hl-accent: var(--hl-sun-500);
    --hl-danger: var(--hl-tomato-500);
    --hl-warning: #b26b00;
    --hl-info: var(--hl-frost-600);
    --hl-success: var(--hl-leaf-600);
    --hl-focus: #2f7dd1;
    --hl-canvas-bg: #f6f1e4;
    --hl-grid-line: rgba(90, 63, 43, 0.12);
    --hl-grid-line-strong: rgba(90, 63, 43, 0.25);
    --hl-bed-fill: #8b6446;
    --hl-bed-fill-raised: #7a5539;
    --hl-container-fill: #a07b5a;
    --hl-zone-outdoor: rgba(76, 140, 63, 0.08);
    --hl-zone-greenhouse: rgba(91, 141, 184, 0.12);

    /* -- typography --------------------------------------------------- */
    --hl-font: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, "Roboto", "Noto Sans", system-ui, sans-serif));
    --hl-font-display: var(--ha-font-family-heading, var(--hl-font));
    --hl-fs-xs: 12px;
    --hl-fs-sm: 13px;
    --hl-fs-md: 14px;
    --hl-fs-lg: 16px;
    --hl-fs-xl: 20px;
    --hl-fs-2xl: 24px;
    --hl-fs-3xl: 32px;
    --hl-lh: 1.45;

    /* -- spacing, radii, elevation, motion ---------------------------- */
    --hl-s1: 4px;
    --hl-s2: 8px;
    --hl-s3: 12px;
    --hl-s4: 16px;
    --hl-s5: 24px;
    --hl-s6: 32px;
    --hl-s8: 48px;
    --hl-r-sm: 6px;
    --hl-r-md: 10px;
    --hl-r-lg: 16px;
    --hl-r-pill: 999px;
    --hl-shadow-1: 0 1px 2px rgba(46, 33, 24, 0.08), 0 1px 3px rgba(46, 33, 24, 0.06);
    --hl-shadow-2: 0 4px 12px rgba(46, 33, 24, 0.1), 0 2px 4px rgba(46, 33, 24, 0.06);
    --hl-shadow-3: 0 12px 32px rgba(46, 33, 24, 0.18);
    --hl-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
    --hl-dur: 160ms;

    /* -- plant families (also served by the backend FAMILIES table) --- */
    --hl-fam-solanaceae: #c8432f;
    --hl-fam-cucurbitaceae: #e0a526;
    --hl-fam-fabaceae: #6a9f3a;
    --hl-fam-brassicaceae: #3e7c8c;
    --hl-fam-apiaceae: #e07a2e;
    --hl-fam-amaryllidaceae: #8e5ba8;
    --hl-fam-amaranthaceae: #a23e6b;
    --hl-fam-asteraceae: #4fa38a;
    --hl-fam-lamiaceae: #4f6fb0;
    --hl-fam-poaceae: #b79f2e;

    --hl-chip-active-fg: var(--hl-leaf-700);
    color-scheme: light;
  }

  :host([dark]) {
    --hl-bg: #131811;
    --hl-surface: #1c2219;
    --hl-surface-2: #242b20;
    --hl-surface-3: #2e3629;
    --hl-text: #e8ede4;
    --hl-text-muted: #a3ad9c;
    --hl-border: #343c30;
    --hl-primary: #78b866;
    --hl-primary-hover: #8fcb7c;
    --hl-on-primary: #10200d;
    --hl-danger: #e2705c;
    --hl-warning: #f0b450;
    --hl-info: #8db7dc;
    --hl-success: #8fcb7c;
    --hl-focus: #7fb6ff;
    --hl-canvas-bg: #1a2017;
    --hl-grid-line: rgba(232, 237, 228, 0.07);
    --hl-grid-line-strong: rgba(232, 237, 228, 0.16);
    --hl-bed-fill: #5c4331;
    --hl-bed-fill-raised: #4f3928;
    --hl-container-fill: #6b5340;
    --hl-zone-outdoor: rgba(120, 184, 102, 0.07);
    --hl-zone-greenhouse: rgba(141, 183, 220, 0.1);
    --hl-leaf-100: #24331f;
    --hl-leaf-50: #1d2819;
    --hl-sun-100: #3a2f1a;
    --hl-tomato-100: #3c211c;
    --hl-frost-100: #1d2a36;
    --hl-soil-100: #2e261f;
    --hl-leaf-300: #4f7a43;
    --hl-chip-active-fg: var(--hl-primary);
    color-scheme: dark;
  }
`,R=S`
  :host {
    font-family: var(--hl-font);
    font-size: var(--hl-fs-md);
    line-height: var(--hl-lh);
    color: var(--hl-text);
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  h1, h2, h3, h4 {
    font-family: var(--hl-font-display);
    margin: 0;
    line-height: 1.25;
    color: var(--hl-text);
  }
  h1 { font-size: var(--hl-fs-3xl); font-weight: 600; letter-spacing: -0.01em; }
  h2 { font-size: var(--hl-fs-xl); font-weight: 600; }
  h3 { font-size: var(--hl-fs-lg); font-weight: 600; }
  h4 { font-size: var(--hl-fs-md); font-weight: 600; }
  p { margin: 0; }
  .muted { color: var(--hl-text-muted); }
  .small { font-size: var(--hl-fs-sm); }
  .xs { font-size: var(--hl-fs-xs); }
  .row { display: flex; align-items: center; gap: var(--hl-s2); }
  .row.wrap { flex-wrap: wrap; }
  .spacer { flex: 1; }
  .stack { display: flex; flex-direction: column; gap: var(--hl-s3); }
  .visually-hidden {
    position: absolute !important; width: 1px; height: 1px; overflow: hidden;
    clip: rect(0 0 0 0); white-space: nowrap; border: 0; padding: 0; margin: -1px;
  }

  /* -- cards ---------------------------------------------------------- */
  .card {
    background: var(--hl-surface);
    border: 1px solid var(--hl-border);
    border-radius: var(--hl-r-lg);
    box-shadow: var(--hl-shadow-1);
    padding: var(--hl-s4);
  }
  .card > header { display: flex; align-items: center; gap: var(--hl-s2); margin-bottom: var(--hl-s3); }

  /* -- buttons: default / hover / active / focus / disabled ------------ */
  button { font: inherit; }
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: var(--hl-s2);
    min-height: 36px; padding: 0 var(--hl-s4);
    border-radius: var(--hl-r-pill); border: 1px solid var(--hl-border);
    background: var(--hl-surface); color: var(--hl-text);
    font-weight: 500; font-size: var(--hl-fs-md); cursor: pointer;
    transition: background var(--hl-dur) var(--hl-ease), border-color var(--hl-dur) var(--hl-ease),
      transform var(--hl-dur) var(--hl-ease), box-shadow var(--hl-dur) var(--hl-ease);
    white-space: nowrap;
  }
  .btn:hover { background: var(--hl-surface-2); }
  .btn:active { transform: scale(0.97); }
  .btn:focus-visible, .icon-btn:focus-visible, .chip:focus-visible, input:focus-visible,
  select:focus-visible, textarea:focus-visible, [tabindex]:focus-visible {
    outline: 2px solid var(--hl-focus); outline-offset: 2px;
  }
  .btn[disabled], .icon-btn[disabled] { opacity: 0.45; cursor: not-allowed; transform: none; }
  .btn.primary { background: var(--hl-primary); border-color: transparent; color: var(--hl-on-primary); }
  .btn.primary:hover { background: var(--hl-primary-hover); }
  .btn.danger { color: var(--hl-danger); border-color: color-mix(in srgb, var(--hl-danger) 40%, transparent); }
  .btn.danger:hover { background: var(--hl-tomato-100); }
  .btn.ghost { background: transparent; border-color: transparent; }
  .btn.ghost:hover { background: var(--hl-surface-2); }
  .btn.small { min-height: 28px; padding: 0 var(--hl-s3); font-size: var(--hl-fs-sm); }
  .icon-btn {
    display: inline-grid; place-items: center; width: 36px; height: 36px; border-radius: var(--hl-r-md);
    border: 1px solid transparent; background: transparent; color: var(--hl-text); cursor: pointer;
    transition: background var(--hl-dur) var(--hl-ease);
    --mdc-icon-size: 20px;
  }
  .icon-btn:hover { background: var(--hl-surface-2); }
  .icon-btn[aria-pressed="true"] { background: var(--hl-leaf-100); color: var(--hl-primary); border-color: var(--hl-leaf-300); }

  /* -- chips ---------------------------------------------------------- */
  .chip {
    display: inline-flex; align-items: center; gap: var(--hl-s1);
    height: 26px; padding: 0 var(--hl-s3); border-radius: var(--hl-r-pill);
    font-size: var(--hl-fs-xs); font-weight: 600; letter-spacing: 0.01em;
    background: var(--hl-surface-2); color: var(--hl-text-muted); border: 1px solid transparent;
    --mdc-icon-size: 14px;
  }
  button.chip { cursor: pointer; }
  button.chip:hover { border-color: var(--hl-border); }
  .chip[aria-pressed="true"] { background: var(--hl-leaf-100); color: var(--hl-chip-active-fg); border-color: var(--hl-leaf-300); }
  .chip.ok { background: var(--hl-leaf-100); color: var(--hl-success); }
  .chip.warn { background: var(--hl-sun-100); color: var(--hl-warning); }
  .chip.bad { background: var(--hl-tomato-100); color: var(--hl-danger); }
  .chip.cold { background: var(--hl-frost-100); color: var(--hl-info); }

  /* -- forms: default / focus / error / disabled ---------------------- */
  label.field { display: flex; flex-direction: column; gap: var(--hl-s1); font-size: var(--hl-fs-sm); color: var(--hl-text-muted); }
  input, select, textarea {
    font: inherit; color: var(--hl-text); background: var(--hl-surface);
    border: 1px solid var(--hl-border); border-radius: var(--hl-r-sm);
    padding: 8px 10px; min-height: 36px; width: 100%;
    transition: border-color var(--hl-dur) var(--hl-ease);
  }
  input:hover, select:hover, textarea:hover { border-color: var(--hl-soil-300); }
  input[aria-invalid="true"] { border-color: var(--hl-danger); }
  input:disabled, select:disabled { opacity: 0.55; cursor: not-allowed; }
  input[type="checkbox"] { width: 18px; min-height: 18px; accent-color: var(--hl-primary); }
  .field-error { color: var(--hl-danger); font-size: var(--hl-fs-xs); }

  /* -- misc ----------------------------------------------------------- */
  .family-dot { width: 10px; height: 10px; border-radius: 50%; flex: none; display: inline-block; }
  .empty { padding: var(--hl-s6); text-align: center; color: var(--hl-text-muted); }
  .divider { height: 1px; background: var(--hl-border); margin: var(--hl-s3) 0; }
  ha-icon { --mdc-icon-size: 20px; }
`;var ga="#7d7d7d";function z(c,r){return r&&c[r]?.color||ga}function nn(c){let r=c.replace(/[^\p{L}\s]/gu,"").trim(),e=r.split(/\s+/);return e.length>1?(e[0][0]+e[1][0]).toUpperCase():(r.slice(0,2)||"?").replace(/^./,t=>t.toUpperCase())}function y(c,r){return c?c.names[r]||c.names.en||c.id:"?"}var Le={sow_indoor:"mdi:seed-outline",sow_direct:"mdi:seed",harden_off:"mdi:weather-partly-cloudy",transplant:"mdi:shovel",thin:"mdi:content-cut",stake:"mdi:pillar",prune:"mdi:scissors-cutting",pinch:"mdi:hand-back-left-outline",earth_up:"mdi:terrain",feed:"mdi:bottle-tonic-plus-outline",water:"mdi:watering-can",weed:"mdi:sprout-outline",pest_check:"mdi:bug-outline",harvest:"mdi:basket-outline",ventilate:"mdi:window-open-variant",shade:"mdi:sun-angle-outline",frost_protect:"mdi:snowflake-alert",soil_prep:"mdi:shovel",compost:"mdi:recycle",green_manure:"mdi:grass",mulch:"mdi:layers-outline",clean_greenhouse:"mdi:spray-bottle",winter_prep:"mdi:snowflake-variant",plan_season:"mdi:clipboard-text-outline",tool_care:"mdi:hammer-wrench",soil_test:"mdi:test-tube",cut_back:"mdi:content-cut",divide:"mdi:call-split",protect:"mdi:shield-sun-outline",clean:"mdi:broom",tie_in:"mdi:link-variant",thin_fruit:"mdi:fruit-cherries",pollinate:"mdi:bee-flower",check:"mdi:clipboard-check-outline",make_feed:"mdi:flask-outline",custom:"mdi:checkbox-marked-circle-outline"},Fe={sow_indoor:"var(--hl-leaf-500)",sow_direct:"var(--hl-leaf-500)",transplant:"var(--hl-leaf-700)",harvest:"var(--hl-sun-500)",water:"var(--hl-water-500)",frost_protect:"var(--hl-frost-500)",ventilate:"var(--hl-frost-500)",shade:"var(--hl-sun-500)",weed:"var(--hl-soil-500)",pest_check:"var(--hl-tomato-500)",soil_prep:"var(--hl-soil-500)",compost:"var(--hl-soil-700)",green_manure:"var(--hl-leaf-600)",mulch:"var(--hl-soil-500)",clean_greenhouse:"var(--hl-frost-500)",winter_prep:"var(--hl-frost-500)",plan_season:"var(--hl-leaf-700)",protect:"var(--hl-sun-500)",clean:"var(--hl-soil-500)",tie_in:"var(--hl-leaf-600)",thin_fruit:"var(--hl-tomato-500)",pollinate:"var(--hl-sun-500)",make_feed:"var(--hl-soil-700)"},pe=c=>{let[r,e,t]=c.slice(0,10).split("-").map(Number);return new Date(r,e-1,t,12)},Ue=c=>`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}-${String(c.getDate()).padStart(2,"0")}`,H=(c,r)=>{let e=pe(c);return e.setDate(e.getDate()+r),Ue(e)},ye=(c,r)=>Math.round((pe(r).getTime()-pe(c).getTime())/864e5);function _(c,r,e={day:"numeric",month:"short"}){return c?pe(c).toLocaleDateString(r==="nl"?"nl-NL":"en-GB",e):"\u2013"}function as(c,r){let e=c.anchor==="first_frost"?r.first_frost:r.last_frost,t=H(e,c.start_week*7),s=H(e,c.end_week*7+6);return t<=s?[t,s]:[s,t]}function an(c,r,e){return r?c.status==="failed"||c.status==="finished"?!1:r.in_ground<=e&&e<=r.harvest_end:!0}function dt(c){let r={urgent:3,high:2,normal:1,low:0};return[...c].sort((e,t)=>e.due===t.due?r[t.priority]-r[e.priority]:e.due<t.due?-1:1)}function ge(c){let r=globalThis.crypto?.randomUUID?.()??Math.random().toString(16).slice(2)+Date.now().toString(16);return`${c}_${r.replace(/-/g,"").slice(0,10)}`}function Ge(c,r,e){let t=new Blob([r],{type:e}),s=URL.createObjectURL(t),n=document.createElement("a");n.href=s,n.download=c,n.click(),setTimeout(()=>URL.revokeObjectURL(s),1e3)}function $e(c,r,e){return e<c.season||c.removed_season!=null&&e>=c.removed_season?!1:e<=(c.last_season??c.season)}function xe(c,r){return c.layout_season==null||r===c.layout_season?{zones:c.zones,beds:c.beds,features:c.features??[]}:c.layouts?.[String(r)]??null}var on={outdoor:["vegetable","herb","flower"],greenhouse:["vegetable","herb","fruit"],cold_frame:["vegetable","herb"],orchard:["fruit"],fruit:["fruit"],herbs:["herb","flower"],flowers:["flower","herb"],garden:["flower","herb","fruit"],containers:["vegetable","herb","flower","fruit"]};var rn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Mt=c=>(...r)=>({_$litDirective$:c,values:r}),Tt=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,e,t){this._$Ct=r,this._$AM=e,this._$Ci=t}_$AS(r,e){return this.update(r,e)}update(r,e){return this.render(...e)}};var Ce=class extends Tt{constructor(r){if(super(r),this.it=u,r.type!==rn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===u||r==null)return this._t=void 0,this.it=r;if(r===ve)return r;if(typeof r!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;let e=[r];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Ce.directiveName="unsafeHTML",Ce.resultType=1;var ln=Mt(Ce);var ct=class extends Ce{};ct.directiveName="unsafeSVG",ct.resultType=2;var We=Mt(ct);var se="#4f8a34",Pt="#6aa648",re="#3f7a2a",is="#7a5a3a",zt='fill="#fff" opacity=".32"',qe=c=>`
  <rect x="10.8" y="14" width="2.4" height="8.5" rx="1" fill="${is}"/>
  <circle cx="12" cy="10" r="8.6" fill="${se}"/>
  <circle cx="9.2" cy="7.6" r="4.6" fill="${Pt}"/>
  <g fill="currentColor" stroke="#fff" stroke-width=".55">${c}</g>`,Ae={carrot:`
    <path d="M12 9.5C12.2 6 14.5 3.6 17.4 3M12 9.5c0-3.4-.1-5.7-.3-7.5M12 9.5C10.8 6.4 8.8 4.4 6.4 3.6" stroke="${se}" stroke-width="1.7" stroke-linecap="round" fill="none"/>
    <path d="M12 8.6c-2.4 0-3.9 1.4-3.9 3.4 0 3 1.8 7.2 3.9 10.6 2.1-3.4 3.9-7.6 3.9-10.6 0-2-1.5-3.4-3.9-3.4z" fill="currentColor"/>
    <path d="M9.4 12.8h2.1M10.4 15.8h1.8M11 18.8h1.1M12.6 11.4h1.9M12.6 14.4h1.6" stroke="rgba(0,0,0,.22)" stroke-width=".8" stroke-linecap="round"/>`,tomato:`
    <circle cx="12" cy="13.4" r="8.2" fill="currentColor"/>
    <ellipse cx="8.8" cy="11" rx="2.2" ry="1.4" ${zt}/>
    <path d="M12 6.4l1.5 2.4 2.9-.5-1.9 2 1.7 2-2.9-.6L12 14l-1.3-2.3-2.9.6 1.7-2-1.9-2 2.9.5z" fill="${re}"/>
    <path d="M12 6.8V3.4" stroke="${re}" stroke-width="1.5" stroke-linecap="round"/>`,pepper:`
    <path d="M5.8 10.2c0-2.6 2-3.7 3.6-3.1 1 .4 1.7.4 2.6 0s1.6-.4 2.6 0c1.6-.6 3.6.5 3.6 3.1 0 5.2-2.1 11-6.2 11S5.8 15.4 5.8 10.2z" fill="currentColor"/>
    <path d="M12 7.2V4c0-.7.6-1.1 1.4-.9" stroke="${re}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M8.2 10.5c-.2 2.4.2 5 1.2 7" stroke="#fff" stroke-opacity=".35" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,chili:`
    <path d="M7.8 5c1.6 0 2.6 1.1 2.9 2.6 1.3 5.4 4.2 9.4 9.3 12.9-7.2.6-13.2-5.4-13.5-11.9C6.4 6.6 6.8 5 7.8 5z" fill="currentColor"/>
    <path d="M7.9 5.3C7.7 3.6 8.5 2.4 10 2" stroke="${re}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M8.6 8.6c.6 3.4 2.6 6.4 5.6 8.6" stroke="#fff" stroke-opacity=".35" stroke-width="1" fill="none" stroke-linecap="round"/>`,eggplant:`
    <path d="M9 6.3c3.1-1 6.1 1.1 8.1 5.1 2.5 5 1 10.1-3 10.6S6 18.2 6.5 12.2C6.7 9.2 7.3 6.9 9 6.3z" fill="currentColor"/>
    <path d="M7.4 7.6c.5-3 3-4 5.6-2.7-1.2.3-2 1-2.3 2 1.3-.2 2.4.2 3.3 1.2-2.2-.3-4.5-.2-6.6-.5z" fill="${re}"/>
    <path d="M8.6 11c0 2.6 1 5 2.6 6.6" stroke="#fff" stroke-opacity=".3" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,cucumber:`
    <g transform="rotate(-32 12 12.5)">
      <rect x="2.6" y="9" width="18.8" height="7.2" rx="3.6" fill="currentColor"/>
      <path d="M5 11h14" stroke="#fff" stroke-opacity=".3" stroke-width="1.1" stroke-linecap="round"/>
      <g fill="#fff" opacity=".45"><circle cx="7" cy="13.6" r=".6"/><circle cx="11" cy="14.2" r=".6"/><circle cx="15" cy="13.6" r=".6"/><circle cx="9" cy="12.2" r=".5"/><circle cx="13" cy="12.4" r=".5"/></g>
    </g>
    <path d="M19.4 6.6l2-1.6" stroke="${re}" stroke-width="1.5" stroke-linecap="round"/>`,pumpkin:`
    <path d="M12 7.6V4.6c.3-.9 1.2-1.3 2.1-1.1" stroke="#6b5232" stroke-width="1.9" fill="none" stroke-linecap="round"/>
    <ellipse cx="12" cy="14" rx="9.6" ry="7.2" fill="currentColor"/>
    <path d="M12 6.9c-2.6 2-2.6 12.1 0 14.2M12 6.9c2.6 2 2.6 12.1 0 14.2M7 8.2c-2.6 2.6-2.6 9 0 11.6M17 8.2c2.6 2.6 2.6 9 0 11.6" stroke="rgba(0,0,0,.2)" stroke-width=".9" fill="none"/>`,melon:`
    <circle cx="12" cy="12.6" r="8.6" fill="currentColor"/>
    <path d="M12 4c-3 3-3 14.2 0 17.2M12 4c3 3 3 14.2 0 17.2M6 6.4c-2 3.6-2 9 0 12.2M18 6.4c2 3.6 2 9 0 12.2" stroke="rgba(0,0,0,.22)" stroke-width="1.1" fill="none"/>
    <ellipse cx="8.6" cy="9" rx="2" ry="1.2" ${zt}/>`,root:`
    <path d="M12 9.4C10.6 6.6 8.2 5 5.8 4.8c.8 2.5 3.1 4.1 6.2 4.6zM12 9.4c1.4-2.8 3.8-4.4 6.2-4.6-.8 2.5-3.1 4.1-6.2 4.6z" fill="${se}"/>
    <path d="M12 9.6V2.6" stroke="${se}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12 8.8c3.7 0 6 2.4 6 5.4 0 3.1-2.7 5.4-6 5.4s-6-2.3-6-5.4c0-3 2.3-5.4 6-5.4z" fill="currentColor"/>
    <path d="M12 19.4v3.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <ellipse cx="9.6" cy="12.6" rx="1.6" ry="1.1" ${zt}/>`,potato:`
    <path d="M4.8 12.6c0-4.1 3.6-6.6 7.7-6.4 4.4.2 7.1 2.8 6.7 6.6-.4 3.9-3.6 5.9-7.6 5.7-4.3-.2-6.8-1.9-6.8-5.9z" fill="currentColor"/>
    <g fill="rgba(0,0,0,.3)"><circle cx="8.8" cy="11" r=".75"/><circle cx="13.6" cy="9.4" r=".65"/><circle cx="15.7" cy="13.6" r=".75"/><circle cx="10.6" cy="15" r=".65"/></g>
    <path d="M14.5 6.6c.6-2.4 2.6-3.6 4.6-3.2-.6 2-2.3 3.2-4.6 3.2z" fill="${se}"/>`,onion:`
    <path d="M12 3.8c.6 2.6 2.8 4.1 4.7 5.5 2 1.6 2.9 3.6 2.4 6.1-.7 3.6-3.6 5.7-7.1 5.7s-6.4-2.1-7.1-5.7c-.5-2.5.4-4.5 2.4-6.1C9.2 7.9 11.4 6.4 12 3.8z" fill="currentColor"/>
    <path d="M12 6c-2 3-3 9.2 0 15.1M12 6c2 3 3 9.2 0 15.1" stroke="rgba(0,0,0,.18)" stroke-width=".9" fill="none"/>
    <path d="M10.4 21l-.7 1.6M12 21.2v1.6M13.6 21l.7 1.6" stroke="#b49a6a" stroke-width=".8" stroke-linecap="round"/>`,garlic:`
    <path d="M12 3.4c.4 2.5 2.2 3.7 4 5.1 2.2 1.7 3.5 3.8 3 6.5-.6 3.4-3.5 5.7-7 5.7s-6.4-2.3-7-5.7c-.5-2.7.8-4.8 3-6.5 1.8-1.4 3.6-2.6 4-5.1z" fill="currentColor" stroke="#b9ac8e" stroke-width=".8"/>
    <path d="M12 6c-3 3-3.6 10.1 0 14.6M12 6c3 3 3.6 10.1 0 14.6M12 6v14.6" stroke="#b9ac8e" stroke-width=".8" fill="none"/>`,leek:`
    <path d="M12 13C11 8 8 5 4.8 3.4c2.6 3.6 4.1 6.6 4.8 9.6zM12 13c1-5 4-8 7.2-9.6-2.6 3.6-4.1 6.6-4.8 9.6zM11 13.4c0-4.2.3-8.2 1-11.4.7 3.2 1 7.2 1 11.4z" fill="currentColor"/>
    <rect x="9.9" y="12" width="4.2" height="10.2" rx="2.1" fill="#f1ecd8" stroke="#c9c0a0" stroke-width=".6"/>`,cabbage:`
    <circle cx="12" cy="12.6" r="9.2" fill="currentColor"/>
    <path d="M12 4.4c-4.1 2-5.6 6.1-4.6 10.2M12 4.4c4.1 2 5.6 6.1 4.6 10.2M4.6 10c2 0 4.1 1 5.6 3M19.4 10c-2 0-4.1 1-5.6 3M7 19c1.6-2 3.2-3 5-3s3.4 1 5 3" stroke="rgba(255,255,255,.5)" stroke-width="1" fill="none"/>
    <circle cx="12" cy="13" r="3.4" fill="#fff" opacity=".2"/>`,sprouts:`
    <rect x="11" y="3" width="2" height="19.4" rx="1" fill="#8aa86a"/>
    <path d="M12 4.2C9.6 2 6.6 2 4.6 3.4 7 5 9.6 5.2 12 4.2zM12 4.2c2.4-2.2 5.4-2.2 7.4-.8-2.4 1.6-5 1.8-7.4.8z" fill="${se}"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.18)" stroke-width=".5"><circle cx="8.4" cy="8" r="2.3"/><circle cx="15.6" cy="10.4" r="2.3"/><circle cx="8.4" cy="13.2" r="2.3"/><circle cx="15.6" cy="15.6" r="2.3"/><circle cx="8.4" cy="18.4" r="2.3"/></g>`,broccoli:`
    <path d="M9.6 13.6h4.8l1.2 8.6H8.4z" fill="#8fbf6a"/>
    <g fill="currentColor"><circle cx="7.4" cy="11" r="3.8"/><circle cx="16.6" cy="11" r="3.8"/><circle cx="12" cy="7.6" r="4.2"/><circle cx="12" cy="12.4" r="3.8"/></g>
    <g fill="rgba(0,0,0,.16)"><circle cx="10.4" cy="6.8" r=".85"/><circle cx="14.2" cy="9.4" r=".85"/><circle cx="6.8" cy="11.2" r=".85"/><circle cx="16.8" cy="12.2" r=".85"/><circle cx="12" cy="13.4" r=".8"/></g>`,kale:`
    <path d="M12 22.4V10" stroke="#9ab87a" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M12 2.6c2 1 2.4 2.4 4 2.6 1.4.2 2.6 1.4 2.2 3 1.6.8 1.6 2.6.4 3.6.8 1.6-.4 3-2 3-.6 1.6-2.4 2-3.6 1-1.2 1-3 .6-3.6-1-1.6 0-2.8-1.4-2-3-1.2-1-1.2-2.8.4-3.6-.4-1.6.8-2.8 2.2-3C9.6 5 10 3.6 12 2.6z" fill="currentColor"/>
    <path d="M12 15.6V5.4M12 9l-3-2M12 9l3-2M12 12.4l-3.4-2M12 12.4l3.4-2" stroke="rgba(255,255,255,.45)" stroke-width=".9" fill="none" stroke-linecap="round"/>`,lettuce:`
    <path d="M12 21.2c-5 0-8.2-3-8.2-7 0-2 1-3.1 2-3.6C6 7 9 4.8 12 4.8s6 2.2 6.2 5.8c1 .5 2 1.6 2 3.6 0 4-3.2 7-8.2 7z" fill="currentColor"/>
    <path d="M8.6 13.4c0-3.1 1.6-5.2 3.4-5.2s3.4 2.1 3.4 5.2" fill="#fff" opacity=".22"/>
    <path d="M12 21V9.6M12 15.4c-2-1-4.1-3-5.1-5.1M12 15.4c2-1 4.1-3 5.1-5.1" stroke="rgba(255,255,255,.5)" stroke-width="1" fill="none" stroke-linecap="round"/>`,leafy:`
    <path d="M12 21.4C6 19.4 4 13.2 6 5.8c4 1 7.1 5.1 6 15.6z" fill="currentColor"/>
    <path d="M12 21.4c6-2 8-8.2 6-15.6-4 1-7.1 5.1-6 15.6z" fill="currentColor" opacity=".82"/>
    <path d="M12 21.2C10 15.2 8.6 11.2 6.6 7.6M12 21.2c2-6 3.4-10 5.4-13.6" stroke="rgba(255,255,255,.5)" stroke-width=".9" fill="none" stroke-linecap="round"/>`,chard:`
    <path d="M10 13C5 12 4 6 7 2.8c3 1 4 5.2 3 10.2zM14 13c5-1 6-7 3-10.2-3 1-4 5.2-3 10.2zM12 12.2c-2-3-2-7.2 0-10.2 2 3 2 7.2 0 10.2z" fill="${re}"/>
    <path d="M9 22.2l1-9.4M12 22.2V12M15 22.2l-1-9.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`,celery:`
    <g fill="${se}"><circle cx="8.8" cy="7" r="2.7"/><circle cx="12" cy="4.8" r="2.9"/><circle cx="15.2" cy="7" r="2.7"/></g>
    <path d="M8 22.2l1.5-12.2M12 22.2V9M16 22.2l-1.5-12.2" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>`,fennel:`
    <path d="M10 11.6L8 3M12 11V2M14 11.6L16 3M8.8 6.4l-2-.8M9.5 8.8l-2 .2M12 5l-1.6-1M12 7.6l1.6-1M15.2 6.4l2-.8M14.5 8.8l2 .2" stroke="#5f9a3a" stroke-width="1" stroke-linecap="round"/>
    <path d="M6.4 16.2c0-3 2.6-5.2 5.6-5.2s5.6 2.2 5.6 5.2-2.6 5.6-5.6 5.6-5.6-2.6-5.6-5.6z" fill="currentColor" stroke="#b9c58a" stroke-width=".8"/>`,pea:`
    <path d="M2.8 15.2c3-4.1 9.1-7.1 16.2-8.1 1-.1 2 .7 1.5 1.7-2.5 4.4-8.5 8.4-15.5 8.9-1.5.1-2.8-1.2-2.2-2.5z" fill="currentColor"/>
    <g fill="#c4e48e"><circle cx="7.8" cy="14.4" r="1.8"/><circle cx="11.4" cy="12.8" r="1.8"/><circle cx="15" cy="10.9" r="1.7"/></g>
    <path d="M19.6 7.4c.5-2 2-2.6 2.6-1.6s-.5 2.1-1.3 1.4" stroke="${se}" stroke-width=".9" fill="none" stroke-linecap="round"/>`,bean:`
    <path d="M4 5.8c1 6.2 4.1 11.3 10.2 14.4 2 1 4.1.5 3.6-1C14.2 16.1 9.1 11 6.6 4.8c-.6-1.2-2.7-1-2.6 1z" fill="currentColor"/>
    <path d="M6.6 8.6c.8.3 1.4 1 1.5 2M9.1 12.6c.8.3 1.4 1 1.5 2M12.1 16.1c.8.3 1.4 1 1.5 2" stroke="rgba(255,255,255,.45)" stroke-width=".9" fill="none" stroke-linecap="round"/>
    <path d="M4.4 5C4.2 3.6 5 2.6 6.4 2.4" stroke="${re}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,corn:`
    <ellipse cx="12" cy="11" rx="4.2" ry="8.6" fill="currentColor"/>
    <path d="M8.4 7h7.2M8 10h8M8 13h8M8.5 16h7M10 3.2v15.4M14 3.2v15.4" stroke="rgba(0,0,0,.16)" stroke-width=".7"/>
    <path d="M12 22.4c-3-1-5.6-4.1-6.6-9.2 2 2 4.1 4.1 6.6 9.2zM12 22.4c3-1 5.6-4.1 6.6-9.2-2 2-4.1 4.1-6.6 9.2z" fill="${Pt}"/>`,asparagus:`
    <g stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M8 22.2V7.4M12 22.2V4.2M16 22.2V8.4"/></g>
    <g fill="#5f7f3a"><path d="M6.7 8L8 4.2 9.3 8z"/><path d="M10.7 4.8L12 1 13.3 4.8z"/><path d="M14.7 9L16 5.2 17.3 9z"/></g>`,artichoke:`
    <path d="M12 20v3" stroke="#6b8f5a" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 2.8c3.1 2 6.2 5.1 6.2 9.7S15.1 20.2 12 20.2s-6.2-3.1-6.2-7.7S8.9 4.8 12 2.8z" fill="currentColor"/>
    <path d="M8 10.4c2 1 6 1 8 0M7 13.9c2.5 1.4 7.5 1.4 10 0M8.5 17.4c2 1 5 1 7 0M12 2.8v4" stroke="rgba(0,0,0,.22)" stroke-width=".9" fill="none"/>`,rhubarb:`
    <path d="M2.8 9.2c0-4.1 4.1-6.6 9.2-6.6s9.2 2.5 9.2 6.6c0 2-2 3.6-4.1 3.1-1.5 1.5-3.6 1.5-5.1.5-1.5 1-3.6 1-5.1-.5-2 .5-4.1-1-4.1-3.1z" fill="${se}"/>
    <path d="M12 12.6V4M12 8L7 5.6M12 8l5-2.4" stroke="rgba(255,255,255,.4)" stroke-width=".9" fill="none"/>
    <path d="M9.2 22.2l2-10M13.2 22.2l.9-10" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>`,strawberry:`
    <path d="M12 21.2c-4.1-2-7.6-6.6-7.6-10.6 0-3 2.5-4.6 4.6-4.1 1.2.3 2 .8 3 .8s1.8-.5 3-.8c2.1-.5 4.6 1.1 4.6 4.1 0 4-3.5 8.6-7.6 10.6z" fill="currentColor"/>
    <g fill="#f7e27a"><circle cx="9" cy="10.2" r=".55"/><circle cx="12" cy="11" r=".55"/><circle cx="15" cy="10.2" r=".55"/><circle cx="10.5" cy="13.6" r=".55"/><circle cx="13.5" cy="13.6" r=".55"/><circle cx="12" cy="16.6" r=".55"/><circle cx="8" cy="12.9" r=".5"/><circle cx="16" cy="12.9" r=".5"/></g>
    <path d="M6.8 7.4c1.6-1.1 3.2-1.3 5.2 0 2-1.3 3.6-1.1 5.2 0-1.6.9-3.4 1.1-5.2.3-1.8.8-3.6.6-5.2-.3zM12 7.4V3.4" fill="${re}" stroke="${re}" stroke-width="1" stroke-linecap="round"/>`,berry:`
    <path d="M12 8.6C12 5.6 14 3.6 16.6 3.4" stroke="${re}" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.18)" stroke-width=".5"><circle cx="9" cy="11" r="3.5"/><circle cx="15" cy="11" r="3.5"/><circle cx="12" cy="16.4" r="3.5"/></g>
    <g ${zt}><circle cx="8" cy="10" r=".9"/><circle cx="14" cy="10" r=".9"/><circle cx="11" cy="15.4" r=".9"/></g>`,currant:`
    <path d="M14.2 4.4c2-1.6 4.6-1.6 6.6 0-2 1.4-4.6 1.4-6.6 0z" fill="${se}"/>
    <path d="M8 2.8c2 1 3 3 4 6s3 7 4 12.2" stroke="#6b5232" stroke-width=".9" fill="none"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.25)" stroke-width=".5"><circle cx="11" cy="8" r="2.1"/><circle cx="14.2" cy="10.6" r="2.2"/><circle cx="11.6" cy="13.2" r="2.3"/><circle cx="15" cy="16" r="2.3"/><circle cx="12.6" cy="18.9" r="2.3"/></g>`,berry_bush:`
    <circle cx="12" cy="12.6" r="9.2" fill="${se}"/>
    <circle cx="9" cy="10" r="4.1" fill="${Pt}"/><circle cx="15" cy="11" r="4" fill="${Pt}" opacity=".7"/>
    <g fill="currentColor" stroke="#fff" stroke-width=".55"><circle cx="8" cy="13.2" r="1.6"/><circle cx="14" cy="8" r="1.6"/><circle cx="16.2" cy="14.6" r="1.6"/><circle cx="11" cy="17.6" r="1.6"/><circle cx="11.4" cy="10.6" r="1.5"/></g>`,cane:`
    <path d="M6.8 22.4C6.8 15 8 8 10 2.8M12 22.4c0-7 1-12.2 3-17.2M17.2 22.4c0-6.2 0-10.2 1.5-14" stroke="${is}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <g fill="${se}"><ellipse cx="6" cy="9" rx="2.6" ry="1.4" transform="rotate(-30 6 9)"/><ellipse cx="17.6" cy="5.8" rx="2.6" ry="1.4" transform="rotate(30 17.6 5.8)"/><ellipse cx="20.2" cy="12" rx="2.4" ry="1.3" transform="rotate(20 20.2 12)"/></g>
    <g fill="currentColor" stroke="rgba(0,0,0,.2)" stroke-width=".5"><circle cx="9.4" cy="12.4" r="2.2"/><circle cx="14" cy="9.2" r="2.2"/><circle cx="13.2" cy="16.4" r="2.1"/><circle cx="18.6" cy="16.2" r="2"/></g>`,grape:`
    <path d="M12.6 5.6V2.6c0-.6.6-1 1.4-.9" stroke="#6b5232" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M14 4.2c2-2 5-2 7 0-2 1.5-4.6 1.6-7 0z" fill="${se}"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.2)" stroke-width=".5"><circle cx="7.8" cy="8" r="2.5"/><circle cx="12.4" cy="8" r="2.5"/><circle cx="17" cy="8" r="2.5"/><circle cx="10" cy="12.2" r="2.5"/><circle cx="14.6" cy="12.2" r="2.5"/><circle cx="12.2" cy="16.4" r="2.5"/><circle cx="12.2" cy="20.4" r="2.1"/></g>`,tree_apple:qe('<circle cx="7.8" cy="11" r="1.7"/><circle cx="13" cy="6.4" r="1.7"/><circle cx="15.9" cy="11.6" r="1.7"/><circle cx="11" cy="13.8" r="1.6"/>'),tree_pear:qe('<ellipse cx="7.8" cy="11" rx="1.3" ry="1.9"/><ellipse cx="13" cy="6.4" rx="1.3" ry="1.9"/><ellipse cx="15.9" cy="11.6" rx="1.3" ry="1.9"/><ellipse cx="11" cy="14" rx="1.3" ry="1.8"/>'),tree_plum:qe('<ellipse cx="8" cy="11" rx="1.4" ry="1.8"/><ellipse cx="13" cy="6.6" rx="1.4" ry="1.8"/><ellipse cx="15.8" cy="11.6" rx="1.4" ry="1.8"/><ellipse cx="11" cy="14" rx="1.4" ry="1.7"/><ellipse cx="10" cy="7.6" rx="1.3" ry="1.6"/>'),tree_cherry:qe('<circle cx="7.4" cy="11.6" r="1.3"/><circle cx="9.4" cy="12" r="1.3"/><circle cx="13" cy="7" r="1.3"/><circle cx="15" cy="7.4" r="1.3"/><circle cx="14.8" cy="12.4" r="1.3"/><circle cx="16.8" cy="12" r="1.3"/>'),tree_fig:qe('<path d="M8 9.4c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/><path d="M14.2 4.8c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/><path d="M15.6 10.6c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/>'),tree_nut:qe('<circle cx="8" cy="11.4" r="1.5"/><circle cx="13.2" cy="6.8" r="1.5"/><circle cx="15.8" cy="12" r="1.5"/><circle cx="11" cy="14" r="1.4"/>'),tree:`
    <rect x="10.8" y="14" width="2.4" height="8.5" rx="1" fill="${is}"/>
    <circle cx="12" cy="10" r="8.6" fill="currentColor"/>
    <circle cx="9.2" cy="7.6" r="4.6" fill="#fff" opacity=".18"/>`,sunflower:`
    <g fill="currentColor">${Array.from({length:12},(c,r)=>`<ellipse cx="12" cy="4.6" rx="1.7" ry="3.4" transform="rotate(${r*30} 12 12)"/>`).join("")}</g>
    <circle cx="12" cy="12" r="4.4" fill="#6b4a2a"/>
    <g fill="#3f2a18"><circle cx="11" cy="11" r=".6"/><circle cx="13" cy="11.6" r=".6"/><circle cx="11.6" cy="13.2" r=".6"/><circle cx="13.4" cy="13.6" r=".5"/></g>`,flower:`
    <path d="M12 22.4V14" stroke="${se}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12 18.4c-1.6-2.4-4-3-5.6-2.4 1.2 2 3.4 2.8 5.6 2.4z" fill="${se}"/>
    <g fill="currentColor">${Array.from({length:5},(c,r)=>`<circle cx="12" cy="5.6" r="3.2" transform="rotate(${r*72} 12 10)"/>`).join("")}</g>
    <circle cx="12" cy="10" r="2.3" fill="#f4c430" stroke="#c9952a" stroke-width=".5"/>`,lavender:`
    <path d="M12 22.4C12 16 11 10 9 5M12 22.4c0-6 .4-12 .4-18.4M12 22.4c0-6 1.4-11 3.6-16" stroke="#7a9a6a" stroke-width="1" fill="none" stroke-linecap="round"/>
    <g fill="currentColor">${[[9,5],[9.6,7.4],[10.2,9.8],[12.4,3.4],[12.4,6],[12.4,8.6],[15.6,6],[15,8.4],[14.4,10.8]].map(([c,r])=>`<ellipse cx="${c}" cy="${r}" rx="1.1" ry="1.5"/>`).join("")}</g>`,herb:`
    <path d="M12 22.4V3.4" stroke="${re}" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="currentColor">${[[4.6,-35],[8.6,35],[12.6,-35],[16.6,35]].map(([c,r])=>`<ellipse cx="${r<0?8.4:15.6}" cy="${c+1}" rx="3.6" ry="1.8" transform="rotate(${r} ${r<0?8.4:15.6} ${c+1})"/>`).join("")}
      <ellipse cx="12" cy="3.2" rx="1.6" ry="2.4"/></g>`,umbel:`
    <path d="M12 22.4V12.4M12 12.4L6 6.4M12 12.4L9 4.6M12 12.4l3-7.8M12 12.4l6-6" stroke="#5f9a3a" stroke-width="1" stroke-linecap="round"/>
    <g fill="currentColor">${[[6,6.4],[9,4.6],[15,4.6],[18,6.4],[12,4]].map(([c,r])=>`<circle cx="${c}" cy="${r}" r="1.9"/>`).join("")}</g>`,clover:`
    <path d="M12 22.4v-9" stroke="${re}" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="currentColor" stroke="${re}" stroke-width=".6">${[0,120,240].map(c=>`<path d="M12 12c-1.6-1.6-4.6-1.4-4.6-4.2 0-1.6 1.4-2.6 2.6-2.2.4-1.4 2-2 2-2s1.6.6 2 2c1.2-.4 2.6.6 2.6 2.2 0 2.8-3 2.6-4.6 4.2z" transform="rotate(${c} 12 12)"/>`).join("")}</g>`,grain:`
    <path d="M12 22.4V4" stroke="#a88a4a" stroke-width="1.1" stroke-linecap="round"/>
    <g fill="currentColor">${[5,8,11,14].map(c=>`<ellipse cx="10" cy="${c}" rx="1.4" ry="2.3" transform="rotate(-25 10 ${c})"/><ellipse cx="14" cy="${c}" rx="1.4" ry="2.3" transform="rotate(25 14 ${c})"/>`).join("")}
      <ellipse cx="12" cy="2.8" rx="1.2" ry="2"/></g>`};function N(c){return c?.icon&&Ae[c.icon]?c.icon:c?.category==="herb"?"herb":c?.category==="flower"?"flower":c?.category==="fruit"?"berry_bush":c?.habit==="root"?"root":c?.habit==="bulb"?"onion":"leafy"}function dn(){let c=Object.entries(Ae).map(([r,e])=>`<symbol id="pg-${r}" viewBox="0 0 24 24" overflow="visible">${e}</symbol>`).join("");return P`${We(c)}`}function jt(c,r,e,t,s){return P`<use href=${`#pg-${c}`} x=${r-t/2} y=${e-t/2} width=${t} height=${t} style=${`color:${s}`}></use>`}function D(c,r,e=28){return o`<svg class="plant-glyph" viewBox="0 0 24 24" width=${e} height=${e} style=${`color:${r}`} aria-hidden="true"
    >${We(Ae[c]??Ae.leafy)}</svg
  >`}var hn="hortulus-photos",pn="hortulus-photo:";var os=new Map,Rt=null;function ht(){if(Rt!==null)return Rt;try{return localStorage.getItem(hn)!=="off"}catch{return!0}}function ds(c){try{localStorage.setItem(hn,c?"on":"off"),Rt=null}catch{Rt=c}globalThis.dispatchEvent?.(new CustomEvent("hortulus-photos-changed"))}function fa(c){let r=c.trim().toLowerCase();return/^(cc[ -]?by(-sa)?([ -][\d.]+)?|cc0|public domain|pd\b|attribution)/.test(r)&&!/\b(nc|nd)\b/.test(r)}var rs=c=>c.replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim(),ls=class extends Error{};function cs(c){let r=(c??"").replace(/\s+/g," ").trim();if(!r||/^(onbekend|unknown)$/i.test(r))return[];let e=[r],t=r.split(" "),s=t[1]==="\xD7"?t.slice(0,3).join(" "):t.slice(0,2).join(" ");return s&&s!==r&&e.push(s),e}function va(c){try{let r=localStorage.getItem(pn+c);if(!r)return;let{at:e,photo:t}=JSON.parse(r);return Date.now()-e<30*864e5?t:void 0}catch{return}}function cn(c,r){try{localStorage.setItem(pn+c,JSON.stringify({at:Date.now(),photo:r}))}catch{}}async function un(c){let r=await fetch(c,{headers:{Accept:"application/json"}});if(r.status===429||r.status>=500)throw new ls(String(r.status));return r.ok?await r.json():null}async function ba(c,r){let e=`https://${c}.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=extmetadata%7Curl&titles=${encodeURIComponent(`File:${r}`)}`,t=await un(e),s=Object.values(t?.query?.pages??{})[0]?.imageinfo?.[0],n=s?.extmetadata??{},a=rs(n.LicenseShortName?.value??"");return!a||!fa(a)?null:{artist:rs(n.Artist?.value??"")||rs(n.Credit?.value??"")||"Wikimedia Commons",license:a,licenseUrl:n.LicenseUrl?.value??"",filePage:s?.descriptionurl??""}}function ya(c){let r=c;try{r=new URL(c).pathname}catch{r=c.split(/[?#]/)[0]}let e=r.split("/"),t=e.indexOf("thumb"),s=t>=0?e[t+3]:e[e.length-1];return decodeURIComponent(s??"")}async function $a(c,r){let e=await un(`https://${c}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(r.replace(/ /g,"_"))}`);if(!e||e.type==="disambiguation"||!e.thumbnail?.source)return null;let t=await ba(c,ya(e.originalimage?.source??e.thumbnail.source));return t?{src:e.thumbnail.source,page:e.content_urls?.desktop?.page??"",title:e.title??r,...t}:null}function mn(c,r){let e=cs(c.scientific_name);if(!e.length)return Promise.resolve(null);let t=`${r}:${e[0]}`,s=va(t);if(s!==void 0)return Promise.resolve(s);let n=os.get(t);return n||(n=(async()=>{let a=r==="en"?["en"]:[r,"en"];for(let i of e)for(let l of a){let d;try{d=await $a(l,i)}catch{return os.delete(t),null}if(d)return cn(t,d),d}return cn(t,null),null})(),os.set(t,n)),n}function hs(c){return`color-mix(in srgb, ${c} 22%, var(--hl-surface, #fff))`}var he=class extends E{constructor(){super(...arguments);this.color="#6aa648";this.lang="en";this.size="card";this.credit=!1;this.photo=null;this.loaded=!1;this.wantPhoto=!1;this.onPref=()=>this.reset()}connectedCallback(){super.connectedCallback(),window.addEventListener("hortulus-photos-changed",this.onPref)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hortulus-photos-changed",this.onPref),this.observer?.disconnect()}updated(e){(e.has("plant")||e.has("lang")||e.has("size"))&&this.reset()}reset(){if(this.photo=null,this.loaded=!1,this.observer?.disconnect(),this.wantPhoto=this.size!=="thumb"&&!!this.plant&&ht()&&cs(this.plant.scientific_name).length>0,!!this.wantPhoto){if(typeof IntersectionObserver>"u"){this.load();return}this.observer=new IntersectionObserver(e=>{e.some(t=>t.isIntersecting)&&(this.observer?.disconnect(),this.load())},{rootMargin:"200px"}),this.observer.observe(this)}}async load(){let e=this.plant;if(!e)return;let t=await mn(e,this.lang);e===this.plant&&this.wantPhoto&&(this.photo=t)}renderCredit(e){let t=`\xA9 ${e.artist} \xB7 ${e.license}`;return this.size==="thumb"?u:o`<a class="credit" href=${e.filePage||e.page} target="_blank" rel="noopener noreferrer"
      title=${`${e.title} \u2013 ${t} (Wikimedia Commons)`}>${this.credit?t:`\xA9 ${e.license}`}</a>`}render(){let e=this.plant,t=this.size==="hero"?150:this.size==="card"?84:32,s=e?e.names?.[this.lang]??e.names?.en??e.id:"";return o`
      <div class="art" style=${`background:${hs(this.color)}`} role="img" aria-label=${s}>
        ${D(N(e),e?.color||this.color,t)}
      </div>
      ${this.photo?o`<img class=${this.loaded?"on":""} src=${this.photo.src} alt=${s} loading="lazy" referrerpolicy="no-referrer"
        @load=${()=>this.loaded=!0} @error=${()=>this.photo=null} />`:u}
      ${this.photo&&this.loaded?this.renderCredit(this.photo):u}
    `}};he.styles=S`
    :host { display: block; position: relative; overflow: hidden; border-radius: var(--hl-r-md, 10px); flex: none; }
    :host([size="card"]) { height: 112px; }
    :host([size="hero"]) { height: 220px; }
    :host([size="thumb"]) { width: 44px; height: 44px; border-radius: 50%; flex: none; }
    .art { position: absolute; inset: 0; display: grid; place-items: center; }
    .art::before { content: ""; position: absolute; inset: 0;
      background: radial-gradient(circle at 30% 25%, rgba(255,255,255,.55), transparent 55%),
        repeating-linear-gradient(135deg, rgba(255,255,255,.12) 0 6px, transparent 6px 14px); }
    .art svg { position: relative; filter: drop-shadow(0 2px 3px rgba(0,0,0,.18)); }
    img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .3s; }
    img.on { opacity: 1; }
    .credit { position: absolute; right: 6px; bottom: 4px; max-width: calc(100% - 12px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      font-size: 10px; color: #fff; background: rgba(0,0,0,.45);
      padding: 1px 6px; border-radius: 8px; text-decoration: none; }
    .credit:hover { background: rgba(0,0,0,.65); }
  `,h([g({attribute:!1})],he.prototype,"plant",2),h([g()],he.prototype,"color",2),h([g()],he.prototype,"lang",2),h([g({reflect:!0})],he.prototype,"size",2),h([g({type:Boolean})],he.prototype,"credit",2),h([f()],he.prototype,"photo",2),h([f()],he.prototype,"loaded",2),he=h([M("hl-plant-image")],he);var Lt=null;function gn(c){Lt=c}function ps(c){return(Lt?.task_tools[c]??[]).map(e=>`${Lt?.tools[e]?.emoji??""} ${Lt?.tools[e]?.name??e}`.trim()).join(", ")}var us=[];function fn(c){us=Object.values(c.states).filter(r=>r.entity_id.startsWith("person.")).map(r=>({id:r.entity_id,name:String(r.attributes.friendly_name??r.entity_id.slice(7))})).sort((r,e)=>r.name.localeCompare(e.name))}var pt=()=>us,vn=c=>c&&us.find(r=>r.id===c)?.name||(c?c.replace(/^person\./,""):"");var bn={},ms=new Set;function yn(c){bn=c,ms.forEach(r=>r())}function _a(c,r){c.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:r},bubbles:!0,composed:!0}))}var Ze=null,Se=class extends E{constructor(){super(...arguments);this.term="";this.open=!1;this.refresh=()=>this.requestUpdate();this.outside=e=>{e.composedPath().includes(this)?this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0}):this.close()}}connectedCallback(){super.connectedCallback(),ms.add(this.refresh)}disconnectedCallback(){super.disconnectedCallback(),ms.delete(this.refresh),Ze===this&&(Ze=null)}toggle(e){e.stopPropagation(),e.preventDefault(),!this.open&&Ze&&Ze!==this&&Ze.close(),this.open=!this.open,Ze=this.open?this:null,this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0})}close(){this.open=!1}onKey(e){e.key==="Escape"&&this.close()}render(){let e=bn[this.term],t=e?.term??this.term;return o`<button class="i" aria-label=${t} aria-expanded=${String(this.open)} @click=${this.toggle} @keydown=${this.onKey}>
        <ha-icon icon="mdi:information-outline"></ha-icon></button>
      ${this.open&&e?o`<div class="pop" role="tooltip"><b>${e.term}</b>${e.text}
            ${e.chapter?o`<br /><a @click=${()=>{this.close(),_a(this,e.chapter)}}>${this.t?.("handbook.read_more")??"Read more"} →</a>`:u}
          </div>`:u}`}};Se.styles=S`
    :host { display: inline-flex; position: relative; vertical-align: middle; }
    button.i { border: 0; background: transparent; color: var(--hl-text-muted); cursor: help; padding: 0 2px; line-height: 1;
      --mdc-icon-size: 16px; display: inline-flex; border-radius: 50%; }
    button.i:hover, button.i[aria-expanded="true"] { color: var(--hl-primary); }
    button.i:focus-visible { outline: 2px solid var(--hl-focus); outline-offset: 1px; }
    .pop { position: absolute; z-index: 30; top: calc(100% + 6px); left: 50%; transform: translateX(-50%); width: min(300px, 80vw);
      background: var(--hl-surface); color: var(--hl-text); border: 1px solid var(--hl-border); border-radius: var(--hl-r-md, 10px);
      box-shadow: var(--hl-shadow-3); padding: 10px 12px; font-size: var(--hl-fs-sm, 13px); font-weight: 400; line-height: 1.45;
      text-align: left; white-space: normal; letter-spacing: normal; text-transform: none; }
    .pop b { display: block; margin-bottom: 4px; font-size: var(--hl-fs-sm, 13px); }
    .pop a { display: inline-block; margin-top: 6px; color: var(--hl-primary); cursor: pointer; font-weight: 600; text-decoration: none; }
    .pop a:hover { text-decoration: underline; }
  `,h([g()],Se.prototype,"term",2),h([g({attribute:!1})],Se.prototype,"t",2),h([f()],Se.prototype,"open",2),Se=h([M("hl-info")],Se);function gs(c,r){if(!c)return"";let[e,t,s]=c.slice(0,10).split("-");return e&&t&&s?[s,t,e].join(r==="nl"?"-":"/"):c}function $n(c){let r=c.trim();if(!r)return null;let e,t,s,n=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(r),a=/^(\d{1,2})[-/. ](\d{1,2})[-/. ](\d{2}|\d{4})$/.exec(r);if(n)[e,t,s]=[Number(n[1]),Number(n[2]),Number(n[3])];else if(a)[s,t,e]=[Number(a[1]),Number(a[2]),Number(a[3].length===2?`20${a[3]}`:a[3])];else return;let i=new Date(Date.UTC(e,t-1,s));if(!(i.getUTCFullYear()!==e||i.getUTCMonth()!==t-1||i.getUTCDate()!==s))return`${String(e).padStart(4,"0")}-${String(t).padStart(2,"0")}-${String(s).padStart(2,"0")}`}var ne=class extends E{constructor(){super();this.name="";this.min="";this.value="";this.lang="en";this.label="";this.pickLabel="Calendar";this.disabled=!1;this.invalid=!1;try{this.internals=this.attachInternals()}catch{}}updated(e){e.has("value")&&this.internals?.setFormValue(this.value||"")}emit(e){if(e&&this.min&&e<this.min){this.invalid=!0;return}this.invalid=!1,this.value=e??"",this.dispatchEvent(new CustomEvent("date-change",{detail:e,bubbles:!0,composed:!0}))}onText(e){let t=e.target,s=$n(t.value);this.invalid=s===void 0,s!==void 0&&(t.value=gs(s,this.lang),(s??"")!==(this.value??"")&&this.emit(s))}openPicker(){let e=this.picker;e.value=this.value||"";try{e.showPicker?e.showPicker():e.click()}catch{e.click()}}render(){let e=this.lang==="nl"?"dd-mm-jjjj":"dd/mm/yyyy";return o`<input class="text ${this.invalid?"invalid":""}" .value=${gs(this.value,this.lang)} placeholder=${e}
        aria-label=${this.label} aria-invalid=${String(this.invalid)} ?disabled=${this.disabled} inputmode="numeric" @change=${this.onText} />
      ${this.disabled?u:o`<button type="button" aria-label=${this.pickLabel} title=${this.pickLabel} @click=${this.openPicker}>📅</button>`}
      <input type="date" tabindex="-1" aria-hidden="true" .min=${this.min} @change=${t=>this.emit(t.target.value||null)} />`}};ne.formAssociated=!0,ne.styles=S`
    :host { display: inline-flex; align-items: stretch; border: 1px solid var(--hl-border-strong, #c9c2b4); border-radius: var(--hl-r-sm, 6px);
      background: var(--hl-surface, #fff); position: relative; min-height: 30px; max-width: 150px; }
    :host([disabled]) { opacity: 0.6; }
    input.text { border: 0; background: transparent; font: inherit; font-size: var(--hl-fs-sm, 14px); color: var(--hl-text, #222);
      width: 100%; min-width: 0; padding: 2px 6px; outline: none; }
    input.text.invalid { color: var(--hl-danger, #b3261e); }
    :host(:focus-within) { outline: 2px solid var(--hl-focus, #4b8b3b); outline-offset: 1px; }
    button { border: 0; background: transparent; cursor: pointer; padding: 0 6px; color: var(--hl-text-muted, #666); font-size: 14px; }
    button:disabled { cursor: default; }
    input[type="date"] { position: absolute; right: 0; bottom: 0; width: 1px; height: 1px; opacity: 0; border: 0; padding: 0; pointer-events: none; }
  `,h([g({reflect:!0})],ne.prototype,"name",2),h([g()],ne.prototype,"min",2),h([g()],ne.prototype,"value",2),h([g()],ne.prototype,"lang",2),h([g()],ne.prototype,"label",2),h([g()],ne.prototype,"pickLabel",2),h([g({type:Boolean})],ne.prototype,"disabled",2),h([f()],ne.prototype,"invalid",2),h([be("input[type=date]")],ne.prototype,"picker",2),ne=h([M("hl-date-input")],ne);function Ht(c,r,e){return t=>{let n=(t.planting_id?c?.plantings.find(i=>i.id===t.planting_id):void 0)?.plant_id??t.title_params?.plant_id,a=n?r.get(n):void 0;return a?{plant:a,color:a.color||z(e,a.family)}:null}}var Ct=80,At=new WeakMap;function wa(c){c.pointerType!=="mouse"&&At.set(c.currentTarget,{x:c.clientX,y:c.clientY,dx:0,active:!1,id:c.pointerId})}function ka(c){let r=c.currentTarget,e=At.get(r);if(!e||e.id!==c.pointerId)return;let t=c.clientX-e.x,s=c.clientY-e.y;!e.active&&Math.abs(t)>12&&Math.abs(t)>Math.abs(s)*1.5&&(e.active=!0,r.setPointerCapture(c.pointerId)),e.active&&(e.dx=t,r.style.transform=`translateX(${Math.max(-140,Math.min(140,t))}px)`,r.dataset.swipe=t>Ct?"complete":t<-Ct?"postpone":"")}function _n(c,r,e){let t=c.currentTarget,s=At.get(t);At.delete(t),t.style.transform="",delete t.dataset.swipe,s?.active&&(c.preventDefault(),s.dx>Ct&&r.status==="open"?e.onComplete(r):s.dx<-Ct&&r.status==="open"&&e.onPostpone&&e.onPostpone(r,1))}function ut(c,r){let e=c.status==="open"&&c.due<r.today,t=c.status!=="open",s=Fe[c.type]??"var(--hl-soil-500)",n=r.plantOf?.(c)??null;return o`
    <li class="task-row ${t?"done":""} prio-${c.priority}" @pointerdown=${wa} @pointermove=${ka}
      @pointerup=${a=>_n(a,c,r)} @pointercancel=${a=>_n(a,c,r)}>
      <button class="check" role="checkbox" aria-checked=${String(t)} aria-label=${`${r.t("task.complete")}: ${c.title}`}
        ?disabled=${t} @click=${()=>r.onComplete(c)}>
        <ha-icon icon=${t?"mdi:check-circle":"mdi:checkbox-blank-circle-outline"}></ha-icon>
      </button>
      <button class="task-main" @click=${()=>r.onOpen(c)}>
        ${n?o`<span class="type-icon crop" title=${r.t(`type.${c.type}`)}>${D(N(n.plant),n.color,24)}
          <span class="type-badge" style=${`background:${s}`}><ha-icon icon=${Le[c.type]}></ha-icon></span></span>`:o`<span class="type-icon" style=${`color:${s}`}><ha-icon icon=${Le[c.type]}></ha-icon></span>`}
        <span class="task-text">
          <span class="task-title">${c.title}</span>
          <span class="task-meta">
            ${e?o`<span class="chip bad">${r.t("common.overdue")} · ${_(c.due,r.lang)}</span>`:o`<span>${_(c.due,r.lang,{weekday:"short",day:"numeric",month:"short"})}</span>`}
            <span>· ${r.t("common.minutes",{n:c.estimated_minutes})}</span>
            ${c.recurrence?o`<span title=${r.t("task.repeat",{n:c.recurrence.interval_days})}>· ↻ ${c.recurrence.interval_days}d</span>`:u}
            ${c.priority==="urgent"||c.priority==="high"?o`<span class="chip ${c.priority==="urgent"?"bad":"warn"}">${r.t(`priority.${c.priority}`)}</span>`:u}
            ${c.assignee?o`<span class="chip" title=${r.t("task.assignee")}><ha-icon icon="mdi:account-outline" style="--mdc-icon-size:14px"></ha-icon>${vn(c.assignee)}</span>`:u}
          </span>
        </span>
      </button>
    </li>`}var It=S`
  ul.tasks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
  .task-row { display: flex; align-items: center; gap: var(--hl-s1); border-radius: var(--hl-r-md); touch-action: pan-y; transition: transform 0.15s ease-out; background: var(--hl-surface); }
  .task-row[data-swipe="complete"] { background: var(--hl-leaf-100); }
  .task-row[data-swipe="postpone"] { background: var(--hl-sun-100); }
  .task-row:hover { background: var(--hl-surface-2); }
  .task-row.done .task-title { text-decoration: line-through; color: var(--hl-text-muted); }
  .task-row.prio-urgent { box-shadow: inset 3px 0 0 var(--hl-danger); }
  .task-row.prio-high { box-shadow: inset 3px 0 0 var(--hl-warning); }
  .check { border: 0; background: transparent; color: var(--hl-primary); cursor: pointer; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 50%; --mdc-icon-size: 22px; }
  .check:hover:not([disabled]) { background: var(--hl-leaf-100); }
  .task-main { flex: 1; display: flex; align-items: center; gap: var(--hl-s2); border: 0; background: transparent; text-align: left; cursor: pointer; padding: 6px 4px; color: var(--hl-text); min-width: 0; }
  .type-icon { --mdc-icon-size: 20px; flex: none; }
  .type-icon.crop { position: relative; width: 28px; height: 28px; display: grid; place-items: center; }
  .type-badge { position: absolute; right: -4px; bottom: -4px; width: 15px; height: 15px; border-radius: 50%; display: grid; place-items: center;
    color: #fff; --mdc-icon-size: 10px; box-shadow: 0 0 0 2px var(--hl-surface); }
  .task-text { display: flex; flex-direction: column; min-width: 0; }
  .task-title { font-weight: 500; overflow: hidden; text-overflow: ellipsis; }
  .task-meta { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
`,W=class extends E{constructor(){super(...arguments);this.task=null;this.beds=[];this.lang="en";this.today="";this.create=!1;this.snapshot=null;this.note="";this.harvestKg=0;this.harvestCount=0;this.photos=[];this.busy=!1;this.error=""}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&(this.task||this.create)&&e.showModal()}close(e=!1){this.note="",this.photos=[],this.error="",this.dispatchEvent(new CustomEvent("closed",{detail:{changed:e}}))}async run(e,t){this.busy=!0;try{await e(),t&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t},bubbles:!0,composed:!0})),this.close(!0)}catch(s){this.error=s.message??String(s)}finally{this.busy=!1}}async onPhoto(e){let t=e.target.files?.[0];if(t){this.busy=!0;try{this.photos=[...this.photos,await this.api.uploadPhoto(t)]}catch(s){this.error=s.message}finally{this.busy=!1}}}submitNew(e){e.preventDefault();let t=e.target,s=n=>t.elements.namedItem(n).value;this.run(()=>this.api.addTask({title:s("title"),due:s("due")||null,task_type:s("type"),description:s("description"),priority:s("priority"),estimated_minutes:Number(s("minutes"))||null,bed_id:s("bed")||null,recurrence_days:Number(s("repeat"))||null}))}renderCreate(){let e=["custom","water","weed","feed","pest_check","harvest","prune","stake","sow_direct","transplant","ventilate","frost_protect"];return o`<form @submit=${this.submitNew}>
      <div class="head"><ha-icon class="big-icon" icon="mdi:clipboard-plus-outline"></ha-icon><h2>${this.t("cal.add_task")}</h2></div>
      <div class="body">
        <div class="form-grid">
          <label class="field full">${this.t("task.title")}<input name="title" required autofocus /></label>
          <label class="field">${this.t("task.due")}<hl-date-input name="due" .value=${this.today} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}></hl-date-input></label>
          <label class="field">${this.t("task.type")}<select name="type">${e.map(t=>o`<option value=${t}>${this.t(`type.${t}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.priority")}<select name="priority">${["low","normal","high","urgent"].map(t=>o`<option value=${t} ?selected=${t==="normal"}>${this.t(`priority.${t}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.duration")}<input name="minutes" type="number" min="1" value="15" /></label>
          <label class="field">${this.t("task.bed")}<select name="bed"><option value="">–</option>${this.beds.map(t=>o`<option value=${t.id}>${t.name}</option>`)}</select></label>
          <label class="field">${this.t("task.repeat_days")}<input name="repeat" type="number" min="1" max="365" /></label>
          <label class="field full">${this.t("task.description")}<textarea name="description" rows="3"></textarea></label>
        </div>
        ${this.error?o`<p class="field-error">${this.error}</p>`:u}
      </div>
      <div class="foot">
        <button type="button" class="btn ghost" @click=${()=>this.close()}>${this.t("common.cancel")}</button>
        <button class="btn primary" type="submit" ?disabled=${this.busy}>${this.t("common.add")}</button>
      </div>
    </form>`}renderContext(e){let t=this.snapshot?.analysis;if(!t)return u;let s=[],n=e.bed_id?t.beds[e.bed_id]:void 0,a=e.zone_id??this.snapshot?.beds.find(p=>p.id===e.bed_id)?.zone_id,i=a?t.zones[a]:void 0,l=(p,m,v=0)=>p==null?null:`${p.toFixed(v)} ${m}`;if(n){let p=l(n.irrigation.moisture,"%");p&&s.push([this.t("ctx.moisture"),p]);let m=n.sensors?.soil_temperature?.value;m!=null&&s.push([this.t("ctx.soil_temp"),`${m.toFixed(1)} \xB0C`]),n.irrigation.action!=="none"&&s.push([this.t("ctx.irrigation"),this.t(`irrigation.${n.irrigation.action}`,{mm:n.irrigation.amount_mm,liters:Math.round(n.irrigation.liters)})]),n.depletion_mm!=null&&n.taw_mm&&s.push([this.t("ctx.water_balance"),`${n.depletion_mm.toFixed(0)} / ${n.taw_mm.toFixed(0)} mm`]),n.nutrients?.index!=null&&s.push([this.t("ctx.nutrients"),`${n.nutrients.index} / 100`])}i&&(i.air_temperature!=null&&s.push([this.t("ctx.air_temp"),`${i.air_temperature.toFixed(1)} \xB0C`]),i.humidity!=null&&s.push([this.t("ctx.humidity"),`${Math.round(i.humidity)} %`]),i.disease&&i.disease.level!=="unknown"&&s.push([this.t("ctx.disease"),this.t(`risk.${i.disease.level}`)]),i.frost.level!=="unknown"&&s.push([this.t("ctx.frost"),`${this.t(`risk.${i.frost.level}`)}${i.frost.plant_level_min_c!=null?` \xB7 ${i.frost.plant_level_min_c.toFixed(1)} \xB0C`:""}`]));let d=t.outlook[0];return d&&(d.tmin!=null&&d.tmax!=null&&s.push([this.t("ctx.today"),`${d.tmin.toFixed(0)}\u2013${d.tmax.toFixed(0)} \xB0C`]),s.push([this.t("ctx.rain"),`${d.rain_mm.toFixed(1)} mm`]),d.et0_mm!=null&&s.push([this.t("ctx.et0"),`${d.et0_mm.toFixed(1)} mm`])),s.length?o`<h4>${this.t("ctx.title")}</h4><div class="context">${s.map(([p,m])=>o`<div class="ctx">${p}<b>${m}</b></div>`)}</div>`:u}renderTask(e){let t=e.status==="open",s=(a,i)=>this.run(async()=>{if(a==="complete"&&e.type==="harvest"&&(this.harvestKg>0||this.harvestCount>0)){let l=this.snapshot?.plantings.find(d=>d.id===e.planting_id);await this.api.logHarvest({planting_id:e.planting_id,plant_id:l?null:e.title_params?.plant_id,kg:this.harvestKg,count:this.harvestCount||null,note:this.note||""})}await this.api.taskAction(e.id,a,{note:this.note||void 0,photos:this.photos.length?[...this.photos]:void 0})},i),n=(a,i)=>this.run(async()=>{let l=await this.api.taskAction(e.id,"postpone",{days:a,to:i,note:this.note||void 0}),d=[];l.shifted?.length&&d.push(this.t("task.shifted",{n:l.shifted.length})),l.warnings?.includes("beyond_window")&&d.push(this.t("task.beyond_window")),d.length&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:d.join(" ")},bubbles:!0,composed:!0}))});return o`
      <div class="head">
        <ha-icon class="big-icon" icon=${Le[e.type]} style=${`color:${Fe[e.type]??"inherit"}`}></ha-icon>
        <div class="stack" style="gap:4px">
          <h2>${e.title}</h2>
          <div class="row wrap small muted">
            <span>${this.t("task.due")}: <b>${_(e.due,this.lang,{weekday:"long",day:"numeric",month:"long"})}</b></span>
            <span class="chip">${this.t(`type.${e.type}`)}</span>
            <span class="chip">${this.t(`task.source.${e.source}`)}</span>
          </div>
        </div>
      </div>
      <div class="body">
        ${e.description?o`<p>${e.description}</p>`:u}
        ${e.title_params?.handbook?o`<a class="small" href="#" @click=${a=>{a.preventDefault(),this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e.title_params.handbook},bubbles:!0,composed:!0})),this.close()}}><ha-icon icon="mdi:book-open-page-variant-outline" style="--mdc-icon-size:16px"></ha-icon> ${this.t("handbook.read_more")}</a>`:u}
        ${this.renderContext(e)}
        ${ps(e.type)?o`<p class="small"><ha-icon icon="mdi:toolbox-outline" style="--mdc-icon-size:16px"></ha-icon>
          <b>${this.t("task.tools")}:</b> ${ps(e.type)}</p>`:u}
        ${e.window_start&&e.window_end&&e.window_start!==e.window_end?o`<p class="small muted">${this.t("task.window",{start:_(e.window_start,this.lang),end:_(e.window_end,this.lang)})}</p>`:u}
        ${e.recurrence?o`<p class="small muted">↻ ${this.t("task.repeat",{n:e.recurrence.interval_days})}</p>`:u}
        ${pt().length?o`<label class="row small">${this.t("task.assignee")}:
          <select @change=${a=>this.run(()=>this.api.taskAction(e.id,"update",{changes:{assignee:a.target.value||null}}))}>
            <option value="" ?selected=${!e.assignee}>${this.t("task.anyone")}</option>
            ${pt().map(a=>o`<option value=${a.id} ?selected=${e.assignee===a.id}>${a.name}</option>`)}
          </select></label>`:u}
        ${t&&e.type==="harvest"?o`<div class="row wrap small harvest-log">
          <ha-icon icon="mdi:scale" style="--mdc-icon-size:18px"></ha-icon>${this.t("task.harvested")}
          <input type="number" min="0" step="0.05" inputmode="decimal" style="width:90px" placeholder="kg"
            @input=${a=>this.harvestKg=Number(a.target.value)||0} /> kg
          <input type="number" min="0" step="1" inputmode="numeric" style="width:80px" placeholder="#"
            @input=${a=>this.harvestCount=Number(a.target.value)||0} /> ×</div>`:u}
        <div class="row wrap small">
          <span>${this.t("task.priority")}:</span>
          ${["low","normal","high","urgent"].map(a=>o`
            <button class="chip" aria-pressed=${String(e.priority===a)}
              @click=${()=>this.run(()=>this.api.taskAction(e.id,"update",{changes:{priority:a}}))}>${this.t(`priority.${a}`)}</button>`)}
        </div>
        ${e.notes.length?o`<h4>${this.t("task.notes")}</h4>${e.notes.map(a=>o`<p class="note"><span class="xs muted">${_(a.at.slice(0,10),this.lang)}</span> ${a.text}</p>`)}`:u}
        ${e.photos.length||this.photos.length?o`<h4>${this.t("task.photos")}</h4>
          <div class="photos">${[...e.photos,...this.photos].map(a=>o`<a href=${Re(a,"original")} target="_blank" rel="noopener"><img src=${Re(a)} alt=${this.t("task.photos")} loading="lazy" /></a>`)}</div>`:u}
        <label class="field">${this.t("task.note")}<textarea rows="2" .value=${this.note} @input=${a=>this.note=a.target.value}></textarea></label>
        <label class="btn small" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("task.add_photo")}
          <input type="file" accept="image/*" capture="environment" class="visually-hidden" @change=${this.onPhoto} /></label>
        ${t?o`
          <div class="row wrap">
            <span class="small">${this.t("task.postpone")}:</span>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>n(1)}>${this.t("task.postpone_1")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>n(3)}>${this.t("task.postpone_3")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>n(7)}>${this.t("task.postpone_7")}</button>
            <hl-date-input label=${this.t("task.postpone_to")} min=${H(this.today,1)} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}
              @date-change=${a=>a.detail&&n(void 0,a.detail)}></hl-date-input>
          </div>`:u}
        ${this.error?o`<p class="field-error" role="alert">${this.error}</p>`:u}
      </div>
      <div class="foot">
        ${e.source==="user"?o`<button class="btn danger" ?disabled=${this.busy} @click=${()=>s("delete")}>${this.t("common.delete")}</button>`:u}
        <span class="spacer"></span>
        <button class="btn ghost" @click=${()=>this.close()}>${this.t("common.close")}</button>
        ${t?o`<button class="btn" ?disabled=${this.busy} @click=${()=>s("skip")}>${this.t("task.skip")}</button>
              <button class="btn primary" ?disabled=${this.busy} @click=${()=>s("complete",this.t("task.completed",{title:e.title}))}>
                <ha-icon icon="mdi:check"></ha-icon>${this.t("task.complete")}</button>`:o`<button class="btn" ?disabled=${this.busy} @click=${()=>s("reopen")}>${this.t("task.reopen")}</button>`}
      </div>`}render(){return!this.task&&!this.create?u:o`<dialog @close=${()=>this.close()}>${this.create?this.renderCreate():this.renderTask(this.task)}</dialog>`}};W.styles=[R,S`
      dialog { border: none; border-radius: var(--hl-r-lg); padding: 0; width: min(560px, calc(100vw - 32px)); background: var(--hl-surface); color: var(--hl-text); box-shadow: var(--hl-shadow-3); }
      dialog::backdrop { background: rgba(20, 24, 18, 0.45); }
      .head { padding: var(--hl-s4) var(--hl-s5); border-bottom: 1px solid var(--hl-border); display: flex; gap: var(--hl-s3); align-items: flex-start; }
      .body { padding: var(--hl-s4) var(--hl-s5); display: flex; flex-direction: column; gap: var(--hl-s3); max-height: 60vh; overflow: auto; }
      .foot { padding: var(--hl-s3) var(--hl-s5); border-top: 1px solid var(--hl-border); display: flex; gap: var(--hl-s2); flex-wrap: wrap; justify-content: flex-end; }
      .photos { display: flex; gap: var(--hl-s2); flex-wrap: wrap; }
      .photos img { width: 72px; height: 72px; object-fit: cover; border-radius: var(--hl-r-sm); border: 1px solid var(--hl-border); }
      .note { font-size: var(--hl-fs-sm); padding: 6px 8px; background: var(--hl-surface-2); border-radius: var(--hl-r-sm); }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .big-icon { --mdc-icon-size: 28px; }
      .context { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 6px; }
      .ctx { background: var(--hl-surface-2); border-radius: var(--hl-r-sm); padding: 6px 8px; font-size: var(--hl-fs-xs); color: var(--hl-text-muted);
        display: flex; flex-direction: column; gap: 2px; }
      .ctx b { font-size: var(--hl-fs-sm); color: var(--hl-text); }
    `],h([g({attribute:!1})],W.prototype,"task",2),h([g({attribute:!1})],W.prototype,"beds",2),h([g({attribute:!1})],W.prototype,"api",2),h([g({attribute:!1})],W.prototype,"t",2),h([g()],W.prototype,"lang",2),h([g()],W.prototype,"today",2),h([g({type:Boolean})],W.prototype,"create",2),h([g({attribute:!1})],W.prototype,"snapshot",2),h([f()],W.prototype,"note",2),h([f()],W.prototype,"harvestKg",2),h([f()],W.prototype,"harvestCount",2),h([f()],W.prototype,"photos",2),h([f()],W.prototype,"busy",2),h([f()],W.prototype,"error",2),W=h([M("hl-task-dialog")],W);var fs={none:"ok",low:"cold",moderate:"warn",high:"bad",unknown:""},xa={frost:"mdi:snowflake-alert",heat:"mdi:thermometer-alert",dry:"mdi:water-alert",sensor_stale:"mdi:access-point-network-off",forecast:"mdi:weather-cloudy-alert",disease:"mdi:mushroom-outline",nutrients:"mdi:flask-outline"},ue=class extends E{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en";this.admin=!0}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get ctx(){return{t:this.t,lang:this.lang,today:this.snapshot.analysis?.today??"",onOpen:e=>this.emit("open-task",e),onComplete:e=>this.emit("complete-task",e),onPostpone:(e,t)=>this.emit("postpone-task",{task:e,days:t}),plantOf:Ht(this.snapshot,this.plants,this.families)}}renderStuck(){let e=this.snapshot.irrigation_status?.stuck??[];return e.length?o`<section class="alerts" aria-label=${this.t("valve.stuck_title")}>${e.map(t=>o`<div class="alert critical" role="alert">
      <ha-icon icon="mdi:valve-open"></ha-icon>
      <div><b>${this.t("valve.stuck",{what:t.what==="pump"?this.t("valve.pump"):t.what,entity:t.entity_id})}</b>
        <div class="small">${this.t("valve.stuck_since",{time:new Date(t.since).toLocaleTimeString(this.lang==="nl"?"nl-NL":"en-GB",{hour:"2-digit",minute:"2-digit"})})}</div></div>
      <span class="spacer"></span>
      ${this.admin?o`<button class="btn small danger" @click=${()=>this.emit("close-valve",t.entity_id)}>${this.t("valve.close")}</button>`:u}
    </div>`)}</section>`:u}greeting(){let e=new Date().getHours();return this.t(e<12?"dash.greeting_morning":e<18?"dash.greeting_afternoon":"dash.greeting_evening")}render(){let e=this.snapshot,t=e.analysis;if(!t)return o`<p class="empty">${this.t("common.loading")}</p>`;let s=t.today,n=dt(e.tasks.filter(d=>d.status==="open"&&d.due<=s)),a=dt(e.tasks.filter(d=>d.status==="open"&&d.due>s&&d.due<=H(s,7))),i=n.reduce((d,p)=>d+p.estimated_minutes,0),l=e.zones.filter(d=>d.type!=="outdoor");return o`
      <section class="hero">
        <div class="stack" style="gap:4px">
          <span class="muted small">${_(s,this.lang,{weekday:"long",day:"numeric",month:"long"})} · ${this.t("common.season",{year:t.season})}</span>
          <h1>${this.greeting()} 🌱</h1>
        </div>
        <span class="spacer"></span>
        <span class="chip ${fs[t.frost.level]}"><ha-icon icon="mdi:snowflake"></ha-icon>${this.t("dash.frost_risk")}: ${this.t(`risk.${t.frost.level}`)}</span>
        <span class="chip"><ha-icon icon="mdi:thermometer-plus"></ha-icon>${Math.round(t.gdd.season_total)} GDD</span>
      </section>

      ${this.renderStuck()}
      ${t.alerts.length?o`<section class="alerts" aria-label="Alerts">
        ${t.alerts.map(d=>o`<div class="alert ${d.kind==="frost"?"frost":d.severity}" role=${d.severity==="critical"?"alert":"status"}>
          <ha-icon icon=${xa[d.kind]??"mdi:information-outline"}></ha-icon>
          <div><b>${this.t(d.message_key,d.params)}</b>
            ${Array.isArray(d.params.plants)&&d.params.plants.length?o`<div class="small">${d.params.plants.join(", ")}</div>`:u}</div>
        </div>`)}
      </section>`:u}

      <div class="grid">
        <section class="card span-8" aria-labelledby="today-h">
          <header><h2 id="today-h">${this.t("dash.today_tasks")}</h2><span class="spacer"></span>
            ${n.length?o`<span class="small muted">${this.t("dash.total_time",{minutes:i})}</span>`:u}</header>
          ${n.length?o`<ul class="tasks">${n.slice(0,10).map(d=>ut(d,this.ctx))}</ul>`:o`<p class="empty">${this.t("dash.no_tasks")}</p>`}
          ${n.length>10?o`<button class="btn small ghost" @click=${()=>this.emit("navigate","calendar")}>${this.t("dash.show_all",{n:n.length})}</button>`:u}
        </section>

        <section class="card span-4" aria-labelledby="weather-h">
          <header><h2 id="weather-h">${this.t("dash.weather")}</h2></header>
          ${t.weather_available?o`
            <div class="days">${t.outlook.slice(0,3).map(d=>o`
              <div class="day">
                <div class="small muted">${d.day===s?this.t("common.today"):_(d.day,this.lang,{weekday:"short"})}</div>
                <div class="temp">${d.tmax!=null?Math.round(d.tmax):"\u2013"}° <span class="muted small">${d.tmin!=null?Math.round(d.tmin):"\u2013"}°</span></div>
                <div class="xs muted">💧 ${d.rain_mm} mm${d.et0_mm!=null?o` · ET₀ ${d.et0_mm}`:u}</div>
              </div>`)}</div>
            <div class="divider"></div>
            <div class="kv"><span>${this.t("dash.frost_risk")}</span><span class="chip ${fs[t.frost.level]}">${this.t(`risk.${t.frost.level}`)}</span></div>
            ${t.frost.plant_level_min_c!=null?o`<div class="kv"><span></span><span class="muted">${this.t("dash.min_temp",{temp:t.frost.plant_level_min_c})}${t.frost.min_at?` \xB7 ${new Date(t.frost.min_at).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{weekday:"short",hour:"2-digit",minute:"2-digit"})}`:""}</span></div>`:u}
          `:o`<p class="small muted">${this.t("dash.forecast_missing")}</p>`}
          <div class="divider"></div>
          ${t.et0_today!=null?o`<div class="kv"><span>ET₀ ${this.t("common.today").toLowerCase()} <hl-info term="et0" .t=${this.t}></hl-info></span>
            <span><b>${t.et0_today.toFixed(1)} mm</b> <span class="muted xs">${t.et0_method==="penman_monteith"?"Penman-Monteith":t.et0_method==="hargreaves"?"Hargreaves":""}</span></span></div>`:u}
          ${t.gdd_today!=null?o`<div class="kv"><span>${this.t("dash.gdd_today")}</span><span><b>${t.gdd_today.toFixed(1)}</b></span></div>`:u}
          <div class="kv"><span>${this.t("dash.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span><b>${Math.round(t.gdd.season_total)}</b> <span class="muted xs">${this.t("dash.gdd_since",{date:_(t.gdd.since,this.lang)})}</span></span></div>
        </section>

        <section class="card span-8" aria-labelledby="beds-h">
          <header><h2 id="beds-h">${this.t("dash.beds")}</h2></header>
          <div class="beds">${e.beds.map(d=>this.renderBed(d.id))}</div>
        </section>

        ${this.renderWaterClimate()}

        <section class="card span-4" aria-labelledby="up-h">
          ${l.map(d=>{let p=t.zones[d.id]?.greenhouse;return o`<header><h2>${d.name}</h2><span class="spacer"></span>
                <span class="chip ${p?.action==="none"||!p?"ok":p.action==="shade"||p.action==="heat"?"bad":"warn"}">${this.t(`gh.${p?.action??"none"}`)}</span></header>
              ${t.zones[d.id]?.air_temperature!=null?o`<div class="big">${t.zones[d.id].air_temperature?.toFixed(1)}°</div>`:o`<p class="small muted">${this.t("dash.no_sensor")}</p>`}
              ${p?.limit_max_c!=null&&p.limiting_plants.length?o`<p class="small muted">${this.t("dash.limits",{min:p.limit_min_c,max:p.limit_max_c})} (${p.limiting_plants.join(", ")})</p>`:u}
              ${p?.forecast_max_c!=null?o`<p class="xs muted">↑ ${p.forecast_max_c}° · ↓ ${p.forecast_min_c??"\u2013"}°</p>`:u}
              <div class="divider"></div>`})}
          <header><h2 id="up-h">${this.t("dash.coming_up")}</h2></header>
          ${a.length?o`<ul class="tasks">${a.slice(0,8).map(d=>ut(d,this.ctx))}</ul>`:o`<p class="small muted">–</p>`}
        </section>
      </div>
    `}renderWaterClimate(){let e=this.snapshot,t=e.analysis,s=e.irrigation_status,n=e.settings.irrigation,a=e.beds.filter(p=>p.irrigation_entity).length,i=e.zones.filter(p=>t.zones[p.id]?.disease&&t.zones[p.id].disease.level!=="unknown"),l=e.beds.filter(p=>t.beds[p.id]?.irrigation.action==="water"),d=p=>e.beds.find(m=>m.id===p)?.name??"";return o`<section class="card span-4" aria-labelledby="wc-h">
      <header><h2 id="wc-h">${this.t("dash.water_climate")}</h2></header>
      <div class="kv"><span>${this.t("dash.irrigation_mode")}</span><span class="chip">${this.t(`settings.irrigation_mode.${n?.mode??"advise"}`)}</span></div>
      ${s?.running?o`<div class="kv"><span class="chip ok"><ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.watering_now",{bed:d(s.bed_id)})}</span>
        <button class="btn small danger" @click=${()=>this.emit("irrigation","stop")}>${this.t("dash.stop")}</button></div>`:u}
      ${s?.last_error?o`<p class="xs" style="color:var(--hl-danger)">⚠ ${s.last_error}</p>`:u}
      <div class="kv"><span>${this.t("dash.beds_need_water")}</span><b>${l.length?l.map(p=>p.name).join(", "):"\u2013"}</b></div>
      ${a&&this.admin&&!s?.running?o`<button class="btn small" @click=${()=>this.emit("irrigation","run")}>
        <ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.water_now")}</button>
        <p class="xs muted">${this.t("dash.safety_note")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></p>`:u}
      ${i.length?o`<div class="divider"></div>
        <div class="kv"><span><b>${this.t("dash.disease_risk")}</b> <hl-info term="leaf_wetness" .t=${this.t}></hl-info></span></div>
        ${i.map(p=>{let m=t.zones[p.id].disease;return o`<div class="kv"><span>${p.name}</span><span class="chip ${fs[m.level]}">${this.t(`risk.${m.level}`)}${m.wet_hours?` \xB7 ${Math.round(m.wet_hours)} h`:""}</span></div>`})}`:u}
    </section>`}renderBed(e){let t=this.snapshot,s=t.beds.find(v=>v.id===e),n=t.analysis?.beds[e],a=n?.irrigation,i=n?.moisture_status??"unknown",l=n?.sensors?.soil_temperature?.value,d=(n?.active_plantings??[]).map(v=>t.plantings.find(b=>b.id===v)).filter(Boolean),p=i==="optimal"?"ok":i==="dry"?"bad":i==="unknown"?"":i==="wet"?"cold":"warn",m=v=>Math.max(0,Math.min(100,v));return o`
      <article class="bed" aria-label=${s.name}>
        <div class="row"><h3>${s.name}</h3><span class="spacer"></span><span class="chip ${p}">${this.t(`moisture.${i}`)}</span></div>
        ${a?.moisture!=null?o`
          <div class="gauge" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(a.moisture)} aria-label=${this.t("settings.sensor.soil_moisture")}>
            ${a.target_low!=null&&a.target_high!=null?o`<div class="target" style=${`left:${m(a.target_low)}%;width:${m(a.target_high)-m(a.target_low)}%`}></div>`:u}
            <div class="value" style=${`left:${m(a.moisture)}%`}></div>
          </div>
          <div class="kv"><span>💧 ${Math.round(a.moisture)}%</span>${l!=null?o`<span>🌡 ${l.toFixed(1)} °C</span>`:u}</div>`:o`<p class="xs muted">${this.t("dash.no_sensor")}</p>`}
        ${a?o`<p class="small"><ha-icon icon="mdi:watering-can-outline" style="--mdc-icon-size:16px"></ha-icon>
          ${this.t(`irrigation.${a.action}`,{mm:a.amount_mm,liters:Math.round(a.liters)})}${a.duration_min?` \xB7 ${Math.round(a.duration_min)} min`:""}</p>`:u}
        ${n?.nutrients?.index!=null?o`<div class="kv"><span>${this.t("dash.nutrients")} <hl-info term="nutrient_index" .t=${this.t}></hl-info></span>
          <span class="chip ${n.nutrients.status==="balanced"?"ok":"warn"}">${n.nutrients.index}/100</span></div>`:u}
        ${n?.depletion_mm!=null&&n.taw_mm?o`<div class="kv xs muted"><span>${this.t("dash.water_balance")} <hl-info term="water_balance" .t=${this.t}></hl-info></span>
          <span>${Math.round(n.depletion_mm)} / ${Math.round(n.taw_mm)} mm</span></div>`:u}
        <div class="avatars" aria-label=${this.t("dash.active_crops",{n:d.length})}>
          ${d.map(v=>{let b=this.plants.get(v.plant_id),x=y(b,this.lang),$=b?.color||z(this.families,b?.family);return o`<button class="avatar" title=${x} style=${`background:${hs($)}`}
              @click=${()=>b&&this.emit("open-plant",b.id)}>${b?D(N(b),$,22):x.slice(0,2)}</button>`})}
        </div>
      </article>`}};ue.styles=[R,It,S`
      .hero { display: flex; flex-wrap: wrap; align-items: flex-end; gap: var(--hl-s4); margin-bottom: var(--hl-s4); }
      .hero h1 { font-size: var(--hl-fs-2xl); }
      .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--hl-s4); }
      .span-8 { grid-column: span 8; }
      .span-4 { grid-column: span 4; }
      .span-12 { grid-column: span 12; }
      @media (max-width: 1100px) { .span-8, .span-4 { grid-column: span 12; } }
      .alerts { display: flex; flex-direction: column; gap: var(--hl-s2); margin-bottom: var(--hl-s4); }
      .alert { display: flex; gap: var(--hl-s3); align-items: center; padding: var(--hl-s3) var(--hl-s4); border-radius: var(--hl-r-md); border: 1px solid var(--hl-border); background: var(--hl-surface); }
      .alert.critical { background: var(--hl-tomato-100); border-color: color-mix(in srgb, var(--hl-danger) 35%, transparent); }
      .alert.warning { background: var(--hl-sun-100); border-color: color-mix(in srgb, var(--hl-warning) 35%, transparent); }
      .alert.frost { background: var(--hl-frost-100); border-color: color-mix(in srgb, var(--hl-info) 35%, transparent); }
      .alert ha-icon { --mdc-icon-size: 24px; }
      .beds { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--hl-s3); }
      .bed { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); background: var(--hl-surface-2); display: flex; flex-direction: column; gap: var(--hl-s2); }
      .gauge { height: 8px; border-radius: 4px; background: var(--hl-surface-3); position: relative; overflow: hidden; }
      .gauge .target { position: absolute; top: 0; bottom: 0; background: color-mix(in srgb, var(--hl-leaf-500) 30%, transparent); }
      .gauge .value { position: absolute; top: -2px; bottom: -2px; width: 3px; background: var(--hl-text); border-radius: 2px; }
      .avatars { display: flex; flex-wrap: wrap; gap: 4px; }
      .avatar { border: 0; cursor: pointer; padding: 0; width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; color: #fff; font-size: 10px; font-weight: 700; }
      .days { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--hl-s2); }
      .day { text-align: center; padding: var(--hl-s2); border-radius: var(--hl-r-md); background: var(--hl-surface-2); }
      .day .temp { font-size: var(--hl-fs-lg); font-weight: 600; }
      .big { font-size: var(--hl-fs-3xl); font-weight: 700; line-height: 1; }
      .kv { display: flex; justify-content: space-between; gap: var(--hl-s2); font-size: var(--hl-fs-sm); }
    `],h([g({attribute:!1})],ue.prototype,"snapshot",2),h([g({attribute:!1})],ue.prototype,"plants",2),h([g({attribute:!1})],ue.prototype,"families",2),h([g({attribute:!1})],ue.prototype,"t",2),h([g()],ue.prototype,"lang",2),h([g({type:Boolean})],ue.prototype,"admin",2),ue=h([M("hl-dashboard-view")],ue);var K=(c,r)=>r>0?Math.round(c/r)*r:c,Ke=c=>({x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm}),Ye=c=>({x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm}),wn=(c,r)=>({x:r.x_cm+c.x_cm,y:r.y_cm+c.y_cm,w:c.width_cm,h:c.length_cm}),Sa=(c,r,e)=>r>=c.x&&r<=c.x+c.w&&e>=c.y&&e<=c.y+c.h;function _e(c,r){let e=Math.min(c.w,r.w),t=Math.min(c.h,r.h);return{x:Math.min(Math.max(c.x,r.x),r.x+r.w-e),y:Math.min(Math.max(c.y,r.y),r.y+r.h-t),w:e,h:t}}function Ea(c,r){return c.x<r.x+r.w&&r.x<c.x+c.w&&c.y<r.y+r.h&&r.y<c.y+c.h}function kn(c,r,e){for(let t=c.length-1;t>=0;t--)if(Sa(Ke(c[t]),r,e))return c[t]}function mt(c,r,e){let t=Math.max(c.spacing_cm,5);if(r==="single")return{w:t,h:t};if(r==="row"){let n=e.width_cm>=e.length_cm,a=Math.max(Math.min(c.row_spacing_cm,40),10);return n?{w:e.width_cm,h:a}:{w:a,h:e.length_cm}}let s=Math.min(Math.max(t*2,30),Math.min(e.width_cm,e.length_cm));return{w:s,h:s}}function vs(c,r){let e={x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm};if(c.layout==="single")return[[e.x+e.w/2,e.y+e.h/2]];let t=Math.max(r.spacing_cm,1);if(c.layout==="row"){let i=e.w>=e.h,l=i?e.w:e.h,d=i?e.h:e.w,p=Math.max(1,Math.floor(l/t)),m=Math.max(1,Math.floor(d/Math.max(r.row_spacing_cm,1))),v=[];for(let b=0;b<m;b++)for(let x=0;x<p;x++){let $=l/p*(x+.5),T=d/m*(b+.5);v.push(i?[e.x+$,e.y+T]:[e.x+T,e.y+$])}return v}let s=Math.max(1,Math.floor(e.w/t)),n=Math.max(1,Math.floor(e.h/t)),a=[];for(let i=0;i<n;i++)for(let l=0;l<s;l++)a.push([e.x+e.w/s*(l+.5),e.y+e.h/n*(i+.5)]);return a}function xn(c,r){return c.count&&c.count>0?c.count:vs(c,r).length}function He(c,r,e,t){let s=Math.max(t,5);for(let n=0;n+r.h<=c.length_cm+.01;n+=s)for(let a=0;a+r.w<=c.width_cm+.01;a+=s){let i={x:a,y:n,w:r.w,h:r.h};if(!e.some(l=>Ea(i,l)))return{x:a,y:n}}return null}function Nt(c,r,e=[]){let t=[...c.map(Ye),...r.map(Ke),...e];if(!t.length)return{x:0,y:0,w:600,h:400};let s=Math.min(...t.map(l=>l.x)),n=Math.min(...t.map(l=>l.y)),a=Math.max(...t.map(l=>l.x+l.w)),i=Math.max(...t.map(l=>l.y+l.h));return{x:s,y:n,w:a-s,h:i-n}}function bs(c,r){if(c.length<2)return c.map(i=>({...i}));let e=c.map(i=>({...i})),t=Math.min(...c.map(i=>i.x)),s=Math.max(...c.map(i=>i.x+i.w)),n=Math.min(...c.map(i=>i.y)),a=Math.max(...c.map(i=>i.y+i.h));switch(r){case"left":e.forEach(i=>i.x=t);break;case"right":e.forEach(i=>i.x=s-i.w);break;case"top":e.forEach(i=>i.y=n);break;case"bottom":e.forEach(i=>i.y=a-i.h);break;case"hcenter":e.forEach(i=>i.x=(t+s)/2-i.w/2);break;case"vcenter":e.forEach(i=>i.y=(n+a)/2-i.h/2);break;case"hdistribute":{let i=e.map((p,m)=>[p,m]).sort((p,m)=>p[0].x-m[0].x),l=(s-t-i.reduce((p,[m])=>p+m.w,0))/(i.length-1),d=t;for(let[p]of i)p.x=d,d+=p.w+l;break}case"vdistribute":{let i=e.map((p,m)=>[p,m]).sort((p,m)=>p[0].y-m[0].y),l=(a-n-i.reduce((p,[m])=>p+m.h,0))/(i.length-1),d=n;for(let[p]of i)p.y=d,d+=p.h+l;break}}return e.map(i=>({...i,x:Math.round(i.x),y:Math.round(i.y)}))}var Ie={path:{fill:"#e3d6bd",stroke:"#b3a283",icon:"\u{1F6B6}",pattern:"gravel",opacity:.95},terrace:{fill:"#cfc6b8",stroke:"#8f8577",icon:"\u2615",pattern:"tiles",opacity:.95},lawn:{fill:"#9cc46a",stroke:"#6f9a45",icon:"\u{1F331}",pattern:"grass",opacity:.7},flowerbed:{fill:"#d7e8b8",stroke:"#8fae6a",icon:"\u{1F338}",pattern:"flowers",opacity:.85},compost:{fill:"#8a6a45",stroke:"#5c442a",icon:"\u267B",opacity:.7},water_butt:{fill:"#4c8fbf",stroke:"#2d6a96",icon:"\u{1F4A7}",opacity:.7},pond:{fill:"#7fb6d9",stroke:"#3f7fa8",icon:"\u{1F438}",pattern:"water",opacity:.85},shed:{fill:"#9aa3a0",stroke:"#6b7370",icon:"\u{1F3E0}",pattern:"roof",opacity:.85},tree:{fill:"#4e7d3a",stroke:"#2f5222",icon:"\u{1F333}",opacity:.5},hedge:{fill:"#5f8f45",stroke:"#3d6b2a",icon:"\u{1F33F}",pattern:"hedge",opacity:.8},fence:{fill:"#8a6a45",stroke:"#5c442a",icon:"\u{1FAB5}",opacity:.9},trellis:{fill:"#7a5c3e",stroke:"#5a3f25",icon:"\u256B",opacity:.6},house:{fill:"#c9b8a8",stroke:"#7d6a5a",icon:"\u{1F3E0}",pattern:"house",opacity:.95},driveway:{fill:"#d2ccc2",stroke:"#9a9285",icon:"\u{1F697}",pattern:"pavers",opacity:.95},parking:{fill:"#d2ccc2",stroke:"#9a9285",icon:"\u{1F17F}\uFE0F",pattern:"pavers",opacity:.95},street:{fill:"#8f9294",stroke:"#5f6264",icon:"\u{1F6E3}\uFE0F",pattern:"asphalt",opacity:.95},play:{fill:"#efe0a0",stroke:"#c2a84a",icon:"\u{1F6DD}",opacity:.7},beehive:{fill:"#f2c230",stroke:"#b5841a",icon:"\u{1F41D}",opacity:.85},stone_path:{fill:"#cfc8bd",stroke:"#958d80",icon:"\u{1FAA8}",pattern:"flagstones",opacity:.95},wood_path:{fill:"#c39463",stroke:"#8a6238",icon:"\u{1FAB5}",pattern:"planks",opacity:.95},stepping_stones:{fill:"#a6cc72",stroke:"#8f887c",icon:"\u{1F463}",pattern:"stepping",opacity:.9},bark_path:{fill:"#a07a52",stroke:"#7d5a38",icon:"\u{1F7EB}",pattern:"bark",opacity:.9},decking:{fill:"#c39463",stroke:"#8a6238",icon:"\u{1FA91}",pattern:"planks",opacity:.95},wall:{fill:"#b07a5c",stroke:"#7d4f36",icon:"\u{1F9F1}",pattern:"bricks",opacity:.95},carport:{fill:"#a4aca9",stroke:"#6b7370",icon:"\u{1F699}",pattern:"roof",opacity:.85},shrub:{fill:"#5f8f45",stroke:"#3d6b2a",icon:"\u{1F333}",pattern:"hedge",opacity:.75},pool:{fill:"#5fb0e0",stroke:"#2d7fb0",icon:"\u{1F3CA}",pattern:"pool",opacity:.95},seating:{fill:"#d9c7a3",stroke:"#9c8460",icon:"\u{1FA91}",pattern:"tiles",opacity:.85},other:{fill:"#b4b4b4",stroke:"#888",icon:"\u2022",opacity:.55}},ae={outdoor:{fill:"var(--hl-zone-outdoor)",stroke:"var(--hl-leaf-300)",dash:"8 4",icon:"\u{1F955}"},greenhouse:{fill:"var(--hl-zone-greenhouse)",stroke:"var(--hl-frost-500)",dash:"none",icon:"\u{1F3E1}"},cold_frame:{fill:"var(--hl-zone-greenhouse)",stroke:"var(--hl-frost-500)",dash:"3 3",icon:"\u{1FA9F}"},orchard:{fill:"rgba(120, 170, 80, 0.16)",stroke:"#6f9a45",dash:"10 4",icon:"\u{1F34E}"},fruit:{fill:"rgba(200, 60, 90, 0.08)",stroke:"#c8506a",dash:"10 4",icon:"\u{1FAD0}"},herbs:{fill:"rgba(80, 110, 176, 0.09)",stroke:"#6a84c0",dash:"10 4",icon:"\u{1F33F}"},flowers:{fill:"rgba(224, 106, 160, 0.09)",stroke:"#d27aa8",dash:"10 4",icon:"\u{1F338}"},garden:{fill:"rgba(110, 150, 90, 0.10)",stroke:"#7a9a5a",dash:"10 4",icon:"\u{1F3E1}"},containers:{fill:"rgba(176, 122, 92, 0.10)",stroke:"#b07a5c",dash:"4 3",icon:"\u{1FAB4}"}},Sn={friend:{color:"var(--hl-leaf-500)",dash:"none",width:2},pest_synergy:{color:"var(--hl-leaf-600)",dash:"2 3",width:2},enemy:{color:"var(--hl-tomato-500)",dash:"6 4",width:2.5},allelopathy:{color:"#8e5ba8",dash:"6 4",width:2.5},competition:{color:"var(--hl-sun-500)",dash:"3 3",width:2},shading:{color:"#6b7370",dash:"1 4",width:2.5},overlap:{color:"var(--hl-sun-500)",dash:"6 4",width:2.5}};var En={dry:"#c8432f",slightly_dry:"#e8a33d",optimal:"#4c8c3f",wet:"#3a7ca5",unknown:"transparent"},j=class extends E{constructor(){super(...arguments);this.zones=[];this.beds=[];this.plantings=[];this.features=[];this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.plants=new Map;this.families={};this.selection=null;this.ghost=null;this.reports={};this.timelines={};this.analysis=null;this.lang="en";this.snapStep=10;this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.readonly=!1;this.lockLayout=!1;this.focusZone="";this.drawTool=null;this.drawRect=null;this.k=1;this.tx=20;this.ty=20;this.preview=null;this.drag=null;this.pendingSelect=null;this.fitted=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.fitted||this.fit()}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}updated(e){!this.fitted&&(e.has("zones")||e.has("beds"))&&(this.zones.length||this.beds.length)&&this.fit()}fit(){let e=this.getBoundingClientRect();if(!e.width||!e.height)return;let t=Nt(this.zones,this.beds,this.features.map(n=>({x:n.x_cm,y:n.y_cm,w:n.width_cm,h:n.length_cm}))),s=32;this.k=Math.max(.2,Math.min((e.width-s*2)/t.w,(e.height-s*2)/t.h,6)),this.tx=s-t.x*this.k+(e.width-s*2-t.w*this.k)/2,this.ty=s-t.y*this.k+(e.height-s*2-t.h*this.k)/2,this.fitted=!0}fitRect(e,t=40){let s=this.getBoundingClientRect();!s.width||!s.height||!e.w||!e.h||(this.k=Math.max(.2,Math.min((s.width-t*2)/e.w,(s.height-t*2)/e.h,8)),this.tx=t-e.x*this.k+(s.width-t*2-e.w*this.k)/2,this.ty=t-e.y*this.k+(s.height-t*2-e.h*this.k)/2,this.fitted=!0)}zoom(e,t,s){let n=this.getBoundingClientRect(),a=t??n.width/2,i=s??n.height/2,l=Math.max(.15,Math.min(this.k*e,12));this.tx=a-(a-this.tx)*l/this.k,this.ty=i-(i-this.ty)*l/this.k,this.k=l}clientToCanvas(e,t){let s=this.getBoundingClientRect();return e<s.left||e>s.right||t<s.top||t>s.bottom?null:{x:(e-s.left-this.tx)/this.k,y:(t-s.top-this.ty)/this.k}}focusCanvas(){this.svgEl?.focus()}rectOf(e,t){if(e==="feature"){let a=this.features.find(i=>i.id===t);return a?{x:a.x_cm,y:a.y_cm,w:a.width_cm,h:a.length_cm}:null}if(e==="zone"){let a=this.zones.find(i=>i.id===t);return a?Ye(a):null}if(e==="bed"){let a=this.beds.find(i=>i.id===t);return a?Ke(a):null}let s=this.plantings.find(a=>a.id===t),n=s&&this.beds.find(a=>a.id===s.bed_id);return s&&n?wn(s,n):null}onPointerDown(e,t,s,n=!1){if(e.button!==0&&e.pointerType==="mouse")return;e.stopPropagation();let a=this.clientToCanvas(e.clientX,e.clientY);if(a){if(this.svgEl.setPointerCapture(e.pointerId),this.drawTool&&!n){let i=this.snapOn?this.snapStep:1,l=K(a.x,i),d=K(a.y,i);this.drag={mode:"draw",pointerId:e.pointerId,startX:l,startY:d,origin:{x:l,y:d,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1},this.drawRect={x:l,y:d,w:0,h:0};return}if(t&&s){let i=e.shiftKey||e.ctrlKey||e.metaKey;if(this.multi.some(p=>p.kind===t&&p.id===s)&&!i&&!n?this.pendingSelect={kind:t,id:s}:this.dispatchEvent(new CustomEvent("select",{detail:{kind:t,id:s,additive:i}})),i)return;let d=this.rectOf(t,s);if(!d||this.readonly||this.lockLayout&&t!=="planting"){this.drag={mode:"pan",pointerId:e.pointerId,startX:a.x,startY:a.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1,clicked:{kind:t,id:s}};return}this.drag={mode:n?"resize":"move",kind:t,id:s,pointerId:e.pointerId,startX:a.x,startY:a.y,origin:d,startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1,clicked:n?void 0:{kind:t,id:s}}}else this.dispatchEvent(new CustomEvent("select",{detail:null})),this.drag={mode:"pan",pointerId:e.pointerId,startX:a.x,startY:a.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1}}}onPointerMove(e){let t=this.drag;if(!t||t.pointerId!==e.pointerId)return;if(Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)>3&&(t.moved=!0),t.mode==="pan"){this.tx=t.startTx+(e.clientX-t.clientX),this.ty=t.startTy+(e.clientY-t.clientY);return}let s=this.clientToCanvas(e.clientX,e.clientY);if(t.mode==="draw"){if(!s)return;let d=this.snapOn?this.snapStep:1,p=K(s.x,d),m=K(s.y,d);this.drawRect={x:Math.min(t.startX,p),y:Math.min(t.startY,m),w:Math.abs(p-t.startX),h:Math.abs(m-t.startY)};return}if(!s||!t.kind||!t.id)return;let n=s.x-t.startX,a=s.y-t.startY,i=this.snapOn?this.snapStep:1,l;if(t.mode==="move")if(l={...t.origin,x:t.origin.x+n,y:t.origin.y+a},t.kind==="planting"){let d=this.beds.find(p=>p.id===this.plantings.find(m=>m.id===t.id)?.bed_id);d&&(l.x=d.x_cm+K(l.x-d.x_cm,i),l.y=d.y_cm+K(l.y-d.y_cm,i))}else l.x=K(l.x,i),l.y=K(l.y,i);else if(l={...t.origin,w:Math.max(i,K(t.origin.w+n,i)),h:Math.max(i,K(t.origin.h+a,i))},t.kind==="planting"){let d=this.beds.find(p=>p.id===this.plantings.find(m=>m.id===t.id)?.bed_id);d&&(l=_e(l,Ke(d)))}this.preview={kind:t.kind,id:t.id,rect:l}}onPointerUp(e){let t=this.drag;if(!t||t.pointerId!==e.pointerId)return;if(this.drag=null,this.svgEl.hasPointerCapture(e.pointerId)&&this.svgEl.releasePointerCapture(e.pointerId),t.mode==="draw"){let l=this.drawRect??t.origin;this.drawRect=null;let d=t.moved&&l.w>0&&l.h>0?l:{x:t.startX,y:t.startY,w:0,h:0};this.dispatchEvent(new CustomEvent("draw-rect",{detail:d}));return}let s=this.preview;this.preview=null;let n=this.pendingSelect;if(this.pendingSelect=null,n&&!t.moved&&this.dispatchEvent(new CustomEvent("select",{detail:n})),t.clicked&&!t.moved&&!(e.shiftKey||e.ctrlKey||e.metaKey)&&this.dispatchEvent(new CustomEvent("item-click",{detail:{kind:t.clicked.kind,id:t.clicked.id}})),!s||!t.moved||t.mode==="pan")return;let a;if(s.kind==="planting"){let l=s.rect.x+s.rect.w/2,d=s.rect.y+s.rect.h/2;a=[...this.beds].reverse().find(m=>l>=m.x_cm&&l<=m.x_cm+m.width_cm&&d>=m.y_cm&&d<=m.y_cm+m.length_cm)?.id}let i=t.mode==="move"&&this.multi.length>1&&this.multi.some(l=>l.kind===s.kind&&l.id===s.id);this.dispatchEvent(new CustomEvent("item-change",{detail:{kind:s.kind,id:s.id,rect:s.rect,targetBedId:a,dx:s.rect.x-t.origin.x,dy:s.rect.y-t.origin.y,group:i}}))}onWheel(e){e.preventDefault();let t=this.getBoundingClientRect();this.zoom(e.deltaY<0?1.12:1/1.12,e.clientX-t.left,e.clientY-t.top)}effectiveRect(e,t,s){if(this.preview&&this.preview.kind===e&&this.preview.id===t)return this.preview.rect;let n=this.preview;if(n&&n.kind===e&&this.drag?.mode==="move"&&this.multi.length>1&&this.multi.some(a=>a.kind===e&&a.id===t)&&this.multi.some(a=>a.kind===n.kind&&a.id===n.id)){let a=this.drag.origin;return{...s,x:s.x+(n.rect.x-a.x),y:s.y+(n.rect.y-a.y)}}return s}renderFeature(e){let t=this.effectiveRect("feature",e.id,{x:e.x_cm,y:e.y_cm,w:e.width_cm,h:e.length_cm}),s=Ie[e.type]??Ie.other,n=11/this.k,a=t.x+t.w/2,i=t.y+t.h/2,l=e.type==="tree"||e.type==="water_butt"||e.type==="pond"||e.type==="shrub",d;if(e.type==="tree"){let m=Math.min(t.w,t.h);d=P`<ellipse cx=${a} cy=${i} rx=${t.w/2} ry=${t.h/2} fill="#2f5222" fill-opacity="0.12" stroke=${s.stroke} stroke-width="1.2"
          stroke-dasharray="4 3" vector-effect="non-scaling-stroke"></ellipse>
        ${jt("tree",a,i,m*.95,"#4e7d3a")}`}else if(e.type==="fence"){let m=t.w>=t.h,v=m?t.w:t.h,b=Math.max(1,Math.round(v/100)),x=Array.from({length:b+1},($,T)=>v/b*T);d=P`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} fill="transparent"></rect>
        <line x1=${m?t.x:a} y1=${m?i:t.y} x2=${m?t.x+t.w:a} y2=${m?i:t.y+t.h}
          stroke=${s.stroke} stroke-width="3" vector-effect="non-scaling-stroke" stroke-linecap="round"></line>
        ${x.map($=>P`<rect x=${(m?t.x+$:a)-4} y=${(m?i:t.y+$)-4} width="8" height="8" fill=${s.fill} stroke=${s.stroke}
          stroke-width="1" vector-effect="non-scaling-stroke"></rect>`)}`}else l?d=P`<ellipse cx=${a} cy=${i} rx=${t.w/2} ry=${t.h/2} fill=${s.pattern?`url(#feat-${s.pattern})`:s.fill}
        fill-opacity=${s.opacity??.6} stroke=${s.stroke} stroke-width="1.5" vector-effect="non-scaling-stroke"></ellipse>`:d=P`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${e.type==="path"?2/this.k:4/this.k}
        fill=${s.pattern?`url(#feat-${s.pattern})`:s.fill} fill-opacity=${s.opacity??.6} stroke=${s.stroke} stroke-width="1.2"
        vector-effect="non-scaling-stroke" stroke-dasharray=${e.type==="trellis"?"6 3":"none"}></rect>`;let p=e.type!=="fence"&&t.w*this.k>44&&t.h*this.k>16;return P`<g role="button" aria-label=${`${e.name} (${this.t(`feature.${e.type}`)})`} @pointerdown=${m=>this.onPointerDown(m,"feature",e.id)} style="cursor:move">
      <title>${e.name} · ${this.t(`feature.${e.type}`)}</title>
      ${d}
      ${p?this.renderPill(a,e.type==="tree"?t.y+t.h-n:i,`${s.icon} ${e.name}`.trim(),n):u}
    </g>`}zoneDelta(e){if(this.preview?.kind!=="zone"||this.preview.id!==e||this.drag?.mode!=="move")return{dx:0,dy:0};let t=this.zones.find(s=>s.id===e);return t?{dx:this.preview.rect.x-t.x_cm,dy:this.preview.rect.y-t.y_cm}:{dx:0,dy:0}}bedAbs(e){let{dx:t,dy:s}=this.zoneDelta(e.zone_id),n={...Ke(e),x:e.x_cm+t,y:e.y_cm+s};return this.effectiveRect("bed",e.id,n)}renderGrid(){let e=Math.max(this.snapStep,5);return P`
      <defs>
        <pattern id="minor" width=${e} height=${e} patternUnits="userSpaceOnUse">
          <path d="M ${e} 0 L 0 0 0 ${e}" fill="none" stroke="var(--hl-grid-line)" stroke-width=${.6/this.k}></path>
        </pattern>
        <pattern id="major" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#minor)"></rect>
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--hl-grid-line-strong)" stroke-width=${1/this.k}></path>
        </pattern>
        <pattern id="major-only" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--hl-grid-line-strong)" stroke-width=${1/this.k}></path>
        </pattern>
        <pattern id="soil" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="4" r="0.9" fill="rgba(255,255,255,0.10)"></circle>
          <circle cx="9" cy="9" r="0.7" fill="rgba(0,0,0,0.12)"></circle>
        </pattern>
        <pattern id="glass" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(91,141,184,0.18)" stroke-width="3"></line>
        </pattern>
        <pattern id="feat-gravel" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#e3d6bd"></rect>
          <circle cx="3" cy="3" r="1.4" fill="#cbbb9c"></circle><circle cx="10" cy="6" r="1.1" fill="#d4c4a6"></circle>
          <circle cx="6" cy="11" r="1.3" fill="#c2b192"></circle><circle cx="12" cy="12" r="0.8" fill="#bfae8f"></circle>
        </pattern>
        <pattern id="bark-mulch" width="18" height="18" patternUnits="userSpaceOnUse">
          <rect width="18" height="18" fill="#a07a52"></rect>
          <path d="M2 4l5 1M10 2l4 3M4 11l6-1M12 9l4 2M3 16l4-1M11 15l5 1" stroke="#7d5a38" stroke-width="1.4" stroke-linecap="round"></path>
        </pattern>
        <pattern id="feat-house" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="30" height="30" fill="#c9b8a8"></rect><path d="M0 0L30 30M30 0L0 30" stroke="#b3a191" stroke-width="1"></path>
        </pattern>
        <pattern id="feat-flagstones" width="48" height="36" patternUnits="userSpaceOnUse">
          <rect width="48" height="36" fill="#9a9285"></rect>
          <path d="M2 2h18l2 13H3zM24 2h21l-1 10H25zM25 15h20v19H27zM3 18h20l-1 16H2z" fill="#d2ccc2" stroke="#b3ab9e" stroke-width="0.8"></path>
        </pattern>
        <pattern id="feat-planks" width="40" height="12" patternUnits="userSpaceOnUse">
          <rect width="40" height="12" fill="#c39463"></rect>
          <path d="M0 0.5H40M0 6.5H40M14 0V6M32 6V12" stroke="#8a6238" stroke-width="0.9"></path>
          <path d="M3 3.5h6M20 9.5h8" stroke="#a87a4c" stroke-width="0.6"></path>
        </pattern>
        <pattern id="feat-stepping" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#a6cc72"></rect>
          <ellipse cx="11" cy="11" rx="8" ry="7" fill="#cfc8bd" stroke="#958d80" stroke-width="0.8"></ellipse>
          <ellipse cx="30" cy="30" rx="8" ry="7" fill="#cfc8bd" stroke="#958d80" stroke-width="0.8"></ellipse>
        </pattern>
        <pattern id="feat-bark" width="18" height="18" patternUnits="userSpaceOnUse">
          <rect width="18" height="18" fill="#a07a52"></rect>
          <path d="M2 4l5 1M10 2l4 3M4 11l6-1M12 9l4 2M3 16l4-1M11 15l5 1" stroke="#7d5a38" stroke-width="1.4" stroke-linecap="round"></path>
        </pattern>
        <pattern id="feat-bricks" width="24" height="12" patternUnits="userSpaceOnUse">
          <rect width="24" height="12" fill="#b07a5c"></rect><path d="M0 0.5H24M0 6.5H24M12 0V6M0 6V12M24 6V12" stroke="#e6d5c8" stroke-width="1"></path>
        </pattern>
        <pattern id="feat-pool" width="40" height="20" patternUnits="userSpaceOnUse">
          <rect width="40" height="20" fill="#62b6e6"></rect>
          <path d="M2 10q5-4 10 0t10 0 10 0 10 0" fill="none" stroke="#d8f0fb" stroke-width="1.4"></path>
        </pattern>
        <pattern id="feat-pavers" width="24" height="12" patternUnits="userSpaceOnUse">
          <rect width="24" height="12" fill="#d2ccc2"></rect><path d="M0 0.5H24M0 6.5H24M6 0V6M18 6V12" stroke="#b3ab9e" stroke-width="1"></path>
        </pattern>
        <pattern id="feat-asphalt" width="200" height="40" patternUnits="userSpaceOnUse">
          <rect width="200" height="40" fill="#8f9294"></rect><path d="M0 20H80M120 20H200" stroke="#f1f1f1" stroke-width="3" stroke-dasharray="40 40"></path>
          <circle cx="30" cy="8" r="1" fill="#7f8284"></circle><circle cx="140" cy="32" r="1.2" fill="#a0a3a5"></circle>
        </pattern>
        <pattern id="feat-tiles" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#d6cdbf"></rect>
          <path d="M0 0H40V40H0z M20 0V20 M0 20H40 M10 20V40 M30 20V40" fill="none" stroke="#a89e8f" stroke-width="1"></path>
        </pattern>
        <pattern id="feat-grass" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#a6cc72"></rect>
          <path d="M3 12l1-4M5 12l-1-5M11 6l1-4M13 6l-1-4M8 15l.5-3" stroke="#7fae4f" stroke-width="1" stroke-linecap="round"></path>
        </pattern>
        <pattern id="feat-flowers" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#d7e8b8"></rect>
          <circle cx="5" cy="6" r="2.4" fill="#e06aa0"></circle><circle cx="17" cy="9" r="2.2" fill="#f2c230"></circle>
          <circle cx="10" cy="18" r="2.4" fill="#8a6ac8"></circle><circle cx="21" cy="20" r="1.8" fill="#f07a1a"></circle>
          <circle cx="5" cy="6" r="0.8" fill="#fff6c0"></circle><circle cx="10" cy="18" r="0.8" fill="#fff6c0"></circle>
        </pattern>
        <pattern id="feat-water" width="30" height="16" patternUnits="userSpaceOnUse">
          <rect width="30" height="16" fill="#86bde0"></rect>
          <path d="M2 8q4-3 8 0t8 0 8 0" fill="none" stroke="#cfe7f6" stroke-width="1.2"></path>
        </pattern>
        <pattern id="feat-roof" width="20" height="10" patternUnits="userSpaceOnUse">
          <rect width="20" height="10" fill="#a4aca9"></rect><path d="M0 9.5H20M10 0V10" stroke="#7d8682" stroke-width="1"></path>
        </pattern>
        <pattern id="feat-hedge" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#5f8f45"></rect>
          <circle cx="5" cy="5" r="4" fill="#6f9f52"></circle><circle cx="15" cy="12" r="5" fill="#527f3a"></circle><circle cx="6" cy="16" r="3.5" fill="#6a9a4d"></circle>
        </pattern>
        ${dn()}
      </defs>
      <rect x="-5000" y="-5000" width="10000" height="10000" fill=${e*this.k>=5?"url(#major)":"url(#major-only)"}></rect>
    `}renderZone(e){let t=this.effectiveRect("zone",e.id,Ye(e)),s=e.type==="greenhouse"||e.type==="cold_frame",n=ae[e.type]??ae.outdoor,a=12/this.k,i=this.t(`settings.zone_type.${e.type}`),l=e.name.toLowerCase()===i.toLowerCase()?`${n.icon} ${e.name}`:`${n.icon} ${e.name} \xB7 ${i}`,d=this.focusZone===e.id;return P`
      <g role="button" aria-label=${l} @pointerdown=${p=>this.onPointerDown(p,"zone",e.id)}
        @dblclick=${()=>this.dispatchEvent(new CustomEvent("zone-open",{detail:e.id}))}>
        <rect class="zone-rect" x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${8/this.k}
          fill=${n.fill} stroke=${n.stroke} stroke-dasharray=${n.dash} stroke-width=${d?2.5:1.5}></rect>
        ${s?P`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} fill="url(#glass)" pointer-events="none"></rect>`:u}
        <text class="label zone-label" x=${t.x+2/this.k} y=${t.y-a*.5} font-size=${a} font-weight="700">${l}</text>
      </g>`}renderBed(e){let t=this.bedAbs(e),s=12/this.k,n=this.analysis?.beds[e.id],a=n?.moisture_status??"unknown",i=this.showMoisture&&a!=="unknown"?En[a]:"rgba(46,33,24,0.45)",l=this.zones.find(T=>T.id===e.zone_id)?.type??"outdoor",d=l==="orchard"||l==="fruit",p=l==="orchard"?"url(#feat-grass)":l==="fruit"?"url(#bark-mulch)":e.kind==="container"?"var(--hl-container-fill)":e.kind==="raised"?"var(--hl-bed-fill-raised)":"var(--hl-bed-fill)",m=e.kind==="container"?Math.min(t.w,t.h)/4:4/this.k,v=n?.irrigation.moisture,b=n?.sensors?.soil_temperature?.value,x=this.reports[e.id]??n?.compatibility,$=(x?.pairs.filter(T=>T.severity!=="info").length??0)+(x?.rotation?.length??0);return P`
      <g role="button" aria-label=${`${e.name}, ${this.t(`kind.${e.kind}`)}, ${Math.round(e.width_cm)} \xD7 ${Math.round(e.length_cm)} cm`}
        @pointerdown=${T=>this.onPointerDown(T,"bed",e.id)}>
        <rect class="bed-rect" x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${m} fill=${p}
          stroke=${i} stroke-width=${this.showMoisture&&a!=="unknown"?3:1.5}></rect>
        ${d?u:P`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${m} fill="url(#soil)" pointer-events="none"></rect>`}
        ${this.showMoisture&&a!=="unknown"?P`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${m} fill=${En[a]} opacity="0.12" pointer-events="none"></rect>`:u}
        ${d||t.w*this.k<50?u:P`<text class="label on-soil" x=${t.x+6/this.k} y=${t.y+t.h-6/this.k} font-size=${s} font-weight="600">${e.name}</text>`}
        ${this.showMoisture&&v!=null?P`<text class="label on-soil" x=${t.x+t.w-6/this.k} y=${t.y+t.h-6/this.k} font-size=${s*.95} text-anchor="end">💧 ${Math.round(v)}%</text>`:u}
        ${this.showTemperature&&b!=null?P`<text class="label on-soil" x=${t.x+t.w-6/this.k} y=${t.y+s*1.3} font-size=${s*.95} text-anchor="end">🌡 ${b.toFixed(1)} °C</text>`:u}
        ${$?this.renderBadge(t.x+t.w,t.y,String($),"var(--hl-tomato-500)"):u}
      </g>`}renderBadge(e,t,s,n,a=9){let i=a/this.k;return P`<g pointer-events="none"><circle cx=${e} cy=${t} r=${i} fill=${n} stroke="#fff" stroke-width=${1.5/this.k}></circle>
      <text class="badge-text" x=${e} y=${t+i*.38} font-size=${i*1.1} text-anchor="middle">${s}</text></g>`}renderPill(e,t,s,n){let a=s.length*n*.56+n*1.1,i=n*1.55;return P`<g pointer-events="none">
      <rect x=${e-a/2} y=${t-i/2} width=${a} height=${i} rx=${i/2} fill="var(--hl-pill-bg, rgba(255,255,255,0.9))"
        stroke="rgba(0,0,0,0.12)" stroke-width="1" vector-effect="non-scaling-stroke"></rect>
      <text class="pill-text" x=${e} y=${t+n*.36} font-size=${n} text-anchor="middle">${s}</text></g>`}renderPlanting(e){let t=this.beds.find(Z=>Z.id===e.bed_id),s=this.plants.get(e.plant_id);if(!t||!s)return u;let n=this.bedAbs(t),a={x:n.x+e.x_cm,y:n.y+e.y_cm,w:e.width_cm,h:e.length_cm},i=this.effectiveRect("planting",e.id,a),l=z(this.families,s.family),d=s.color||l,p=N(s),m=y(s,this.lang),v=!this.viewDate||an(e,this.timelines[e.id],this.viewDate),b={...e,x_cm:i.x-n.x,y_cm:i.y-n.y,width_cm:i.w,length_cm:i.h},x=vs(b,s),$=this.reports[t.id]??this.analysis?.beds[t.id]?.compatibility,T=$?.pairs.filter(Z=>(Z.a===e.id||Z.b===e.id)&&Z.severity!=="info")??[],L=$?.out_of_bounds?.includes(e.id),k=this.k,Y=Math.min(s.spacing_cm,i.w,i.h)*k,ce=Y<18||x.length>90,te=`${m} \u2013 ${this.t(`planner.layout.${e.layout}`)}, ${this.t("planner.count",{n:x.length})}`+(T.length?` \u2013 ${T.length} \u26A0`:"")+(s.perennial?` \u2013 ${this.t("planner.perennial")}`:""),Te=11/k,Ut;if(ce){let Z=i.w>=i.h,Oe=Z?i.h:i.w,Xe=Z?i.w:i.h,zs=Math.max(e.layout==="row"?s.row_spacing_cm:Math.max(s.row_spacing_cm/2,s.spacing_cm),4),Ps=Math.max(1,Math.floor(Oe/zs)),yt=Math.min(s.spacing_cm/2,Xe/4),js=Math.max(Math.min(s.spacing_cm*.9,zs*.45),2),Rs=s.category==="flower"?d:"#5f9a3a",Kn=Array.from({length:Ps},(Je,Yn)=>Oe/Ps*(Yn+.5)),Ls=`${Math.max(s.spacing_cm*.6,1.5)} ${Math.max(s.spacing_cm*.4,1)}`,Cs=Math.max(Math.min(Math.min(i.w,i.h)*.72,46/k),16/k),As=i.x+i.w/2,Hs=i.y+i.h/2;Ut=P`
        ${Kn.map(Je=>Z?P`<line x1=${i.x+yt} y1=${i.y+Je} x2=${i.x+i.w-yt} y2=${i.y+Je} stroke=${Rs} stroke-width=${js}
              stroke-linecap="round" stroke-dasharray=${Ls} opacity="0.75"></line>`:P`<line x1=${i.x+Je} y1=${i.y+yt} x2=${i.x+Je} y2=${i.y+i.h-yt} stroke=${Rs} stroke-width=${js}
              stroke-linecap="round" stroke-dasharray=${Ls} opacity="0.75"></line>`)}
        <circle cx=${As} cy=${Hs} r=${Cs*.62} fill="var(--hl-pill-bg, rgba(255,255,255,0.92))" stroke=${l} stroke-width="2"
          vector-effect="non-scaling-stroke"></circle>
        ${jt(p,As,Hs,Cs*.92,d)}`}else{let Z=Math.max(Math.min(s.spacing_cm*.92,Math.min(i.w,i.h)*1.05),6/k);Ut=P`
        ${x.slice(0,300).map(([Oe,Xe])=>P`<ellipse cx=${n.x+Oe} cy=${n.y+Xe+Z*.42} rx=${Z*.36} ry=${Z*.09}
          fill="rgba(0,0,0,0.18)"></ellipse>`)}
        ${x.slice(0,300).map(([Oe,Xe])=>jt(p,n.x+Oe,n.y+Xe,Z,d))}`}let Ts=(m.length*.56+1.1)*Te,Ms=i.w*k>=Math.min(m.length*7+16,140)&&i.h*k>=(ce?64:34),Wn=ce&&!Ms&&i.w>=i.h&&i.w*k>=Ts*k+70&&i.h*k>=16,qn=ce?i.y+i.h-Math.max(Te*1.1,Math.min(i.h*.12,14/k)):i.y+i.h-Te*.95,Zn=Math.max(Math.min(Math.min(i.w,i.h)*.72,46/k),16/k)*.62;return P`
      <g class="planting ${v?"":"faded"}" role="button" aria-label=${te}
        @pointerdown=${Z=>this.onPointerDown(Z,"planting",e.id)}>
        <title>${te}</title>
        <rect class="planting-rect" x=${i.x} y=${i.y} width=${i.w} height=${i.h} rx=${4/k}
          fill=${d} fill-opacity="0.13" stroke=${l} stroke-width="1.6" stroke-dasharray=${v?"none":"4 3"}></rect>
        ${Ut}
        ${Wn?this.renderPill(i.x+i.w/2+Zn+6/k+Ts/2,i.y+i.h/2,m,Te):Ms?this.renderPill(i.x+i.w/2,qn,m,Te):!ce&&Y<10&&i.w*k>22&&i.h*k>22?P`<text class="mono" x=${i.x+i.w/2} y=${i.y+i.h/2+Te*.35} font-size=${Te} text-anchor="middle">${nn(m)}</text>`:u}
        ${s.perennial&&i.w*k>=36&&i.h*k>=36?this.renderBadge(i.x+i.w-9/k,i.y+i.h-9/k,"\u221E","var(--hl-leaf-700)",7):u}
        ${e.succession_group?this.renderBadge(i.x,i.y,String(e.succession_index+1),"var(--hl-soil-700)"):u}
        ${T.length||L?this.renderBadge(i.x+i.w,i.y,"!",T.some(Z=>Z.severity==="error")?"var(--hl-tomato-500)":"var(--hl-sun-500)"):u}
      </g>`}renderLinks(){if(!this.showCompanions)return[];let e=[],t=n=>{let a=this.plantings.find(p=>p.id===n),i=a&&this.beds.find(p=>p.id===a.bed_id);if(!a||!i)return null;let l=this.bedAbs(i),d=this.effectiveRect("planting",a.id,{x:l.x+a.x_cm,y:l.y+a.y_cm,w:a.width_cm,h:a.length_cm});return[d.x+d.w/2,d.y+d.h/2]},s=new Set(this.plantings.map(n=>n.id));for(let n of this.beds){let a=this.reports[n.id]??this.analysis?.beds[n.id]?.compatibility;for(let i of a?.pairs??[]){if(i.kind==="same_family"||!s.has(i.a)||!s.has(i.b))continue;let l=t(i.a),d=t(i.b);if(!l||!d)continue;let p=Sn[i.kind]??Sn.overlap;e.push(P`<line class="link" x1=${l[0]} y1=${l[1]} x2=${d[0]} y2=${d[1]} stroke=${p.color}
          stroke-width=${p.width} stroke-dasharray=${p.dash} stroke-linecap="round" opacity="0.9"><title>${this.t(i.key,i.params)}</title></line>`)}}return e}selectionRect(e){if(e.kind==="feature"){let a=this.features.find(i=>i.id===e.id);return a?this.effectiveRect("feature",a.id,{x:a.x_cm,y:a.y_cm,w:a.width_cm,h:a.length_cm}):null}if(e.kind==="bed"){let a=this.beds.find(i=>i.id===e.id);return a?this.bedAbs(a):null}if(e.kind==="zone"){let a=this.zones.find(i=>i.id===e.id);return a?this.effectiveRect("zone",a.id,Ye(a)):null}let t=this.plantings.find(a=>a.id===e.id),s=t&&this.beds.find(a=>a.id===t.bed_id);if(!t||!s)return null;let n=this.bedAbs(s);return this.effectiveRect("planting",t.id,{x:n.x+t.x_cm,y:n.y+t.y_cm,w:t.width_cm,h:t.length_cm})}renderMulti(){if(this.multi.length<2)return[];let e=3/this.k;return this.multi.filter(t=>!(this.selection&&t.kind===this.selection.kind&&t.id===this.selection.id)).map(t=>this.selectionRect(t)).filter(t=>!!t).map(t=>P`<rect class="selected-outline" x=${t.x-e} y=${t.y-e} width=${t.w+e*2} height=${t.h+e*2} opacity="0.7"></rect>`)}renderSelection(){let e=this.selection;if(!e)return u;let t=null;if(e.kind==="feature")t=this.selectionRect(e);else if(e.kind==="bed"){let a=this.beds.find(i=>i.id===e.id);t=a?this.bedAbs(a):null}else if(e.kind==="zone"){let a=this.zones.find(i=>i.id===e.id);t=a?this.effectiveRect("zone",a.id,Ye(a)):null}else{let a=this.plantings.find(l=>l.id===e.id),i=a&&this.beds.find(l=>l.id===a.bed_id);if(a&&i){let l=this.bedAbs(i);t=this.effectiveRect("planting",a.id,{x:l.x+a.x_cm,y:l.y+a.y_cm,w:a.width_cm,h:a.length_cm})}}if(!t)return u;let s=10/this.k,n=3/this.k;return P`
      <rect class="selected-outline" x=${t.x-n} y=${t.y-n} width=${t.w+n*2} height=${t.h+n*2}></rect>
      ${this.readonly||this.lockLayout&&e.kind!=="planting"?u:P`<rect class="handle" x=${t.x+t.w-s/2} y=${t.y+t.h-s/2} width=${s} height=${s} rx=${2/this.k}
        @pointerdown=${a=>this.onPointerDown(a,e.kind,e.id,!0)}></rect>`}`}renderGhost(){let e=this.ghost;if(!e)return u;let t=12/this.k;return P`<g pointer-events="none">
      <rect x=${e.rect.x} y=${e.rect.y} width=${e.rect.w} height=${e.rect.h} rx=${3/this.k}
        fill=${e.color} fill-opacity=${e.valid?.35:.12} stroke=${e.valid?e.color:"var(--hl-tomato-500)"}
        stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      <text class="label" x=${e.rect.x} y=${e.rect.y-t*.5} font-size=${t} font-weight="600">${e.label}</text></g>`}renderDrawRect(){let e=this.drawRect,t=this.drawTool;if(!e||!t||!e.w&&!e.h)return u;let s=12/this.k,n=a=>(a/100).toLocaleString(this.lang==="nl"?"nl-BE":"en-GB",{maximumFractionDigits:1});return P`<g pointer-events="none">
      <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${4/this.k} fill=${t.color} fill-opacity="0.22"
        stroke=${t.color} stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      ${this.renderPill(e.x+e.w/2,e.y+e.h/2,`${t.label} \xB7 ${n(e.w)} \xD7 ${n(e.h)} m`,s)}
    </g>`}outside(e){if(!this.focusZone)return!1;let t=this.zones.find(a=>a.id===this.focusZone);if(!t)return!1;let s=e.x+e.w/2,n=e.y+e.h/2;return!(s>=t.x_cm&&s<=t.x_cm+t.width_cm&&n>=t.y_cm&&n<=t.y_cm+t.length_cm)}render(){let e=this.focusZone,t=(s,n)=>s?P`<g class="dimmed">${n}</g>`:n;return o`
      <svg
        tabindex="0"
        role="application"
        aria-roledescription="garden plan"
        aria-label=${this.t?.("nav.planner")??"Planner"}
        class=${this.drag?.mode==="pan"?"panning":this.drawTool?"drawing":""}
        @pointerdown=${s=>this.onPointerDown(s)}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @wheel=${this.onWheel}
      >
        <g transform=${`translate(${this.tx} ${this.ty}) scale(${this.k})`}>
          ${this.renderGrid()} ${this.showZones?this.zones.map(s=>t(!!e&&s.id!==e,this.renderZone(s))):u}
          ${this.showFeatures?this.features.map(s=>t(this.outside({x:s.x_cm,y:s.y_cm,w:s.width_cm,h:s.length_cm}),this.renderFeature(s))):u}
          ${this.beds.map(s=>t(!!e&&s.zone_id!==e,this.renderBed(s)))}
          ${this.showPlantings?this.plantings.map(s=>{let n=this.beds.find(a=>a.id===s.bed_id);return t(!!e&&n?.zone_id!==e,this.renderPlanting(s))}):u} ${this.showPlantings?this.renderLinks():u}
          ${this.renderMulti()} ${this.renderSelection()} ${this.renderGhost()} ${this.renderDrawRect()}
        </g>
      </svg>
      <div class="zoom-indicator" aria-hidden="true">${Math.round(this.k*100)} px/m</div>
    `}};j.styles=[S`
      :host { display: block; position: relative; height: 100%; min-height: 360px; touch-action: none; }
      svg { width: 100%; height: 100%; display: block; background: var(--hl-canvas-bg); border-radius: var(--hl-r-lg); outline: none; cursor: default; user-select: none; }
      svg:focus-visible { box-shadow: inset 0 0 0 2px var(--hl-focus); }
      svg.panning { cursor: grabbing; }
      svg.drawing, svg.drawing * { cursor: crosshair !important; }
      .dimmed { opacity: 0.22; pointer-events: none; filter: grayscale(0.6); }
      .zone-rect { stroke-width: 1.5; vector-effect: non-scaling-stroke; }
      .bed-rect { vector-effect: non-scaling-stroke; cursor: move; }
      .planting { cursor: move; }
      .planting-rect { vector-effect: non-scaling-stroke; }
      .faded { opacity: 0.32; }
      .label { font-family: var(--hl-font); fill: var(--hl-text); pointer-events: none; }
      .label.on-soil { fill: #fff7ec; paint-order: stroke; stroke: rgba(46, 33, 24, 0.55); stroke-width: 3px; }
      .mono { font-family: var(--hl-font); font-weight: 700; fill: #fff; pointer-events: none; paint-order: stroke; stroke: rgba(0, 0, 0, 0.35); stroke-width: 2px; }
      .selected-outline { fill: none; stroke: var(--hl-focus); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-dasharray: 6 3; pointer-events: none; }
      .handle { fill: var(--hl-surface); stroke: var(--hl-focus); stroke-width: 2; vector-effect: non-scaling-stroke; cursor: nwse-resize; }
      .link { vector-effect: non-scaling-stroke; pointer-events: none; }
      .badge-text { font-family: var(--hl-font); font-weight: 700; fill: #fff; pointer-events: none; }
      .pill-text { font-family: var(--hl-font); font-weight: 650; fill: #2e2118; pointer-events: none; }
      .zone-label { paint-order: stroke; stroke: var(--hl-canvas-bg); stroke-width: 3px; }
      .zoom-indicator { position: absolute; right: 12px; bottom: 12px; background: var(--hl-surface); border: 1px solid var(--hl-border);
        border-radius: var(--hl-r-pill); padding: 2px 10px; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); pointer-events: none; }
    `],h([g({attribute:!1})],j.prototype,"zones",2),h([g({attribute:!1})],j.prototype,"beds",2),h([g({attribute:!1})],j.prototype,"plantings",2),h([g({attribute:!1})],j.prototype,"features",2),h([g({attribute:!1})],j.prototype,"multi",2),h([g({type:Boolean})],j.prototype,"showFeatures",2),h([g({type:Boolean})],j.prototype,"showPlantings",2),h([g({type:Boolean})],j.prototype,"showZones",2),h([g({attribute:!1})],j.prototype,"plants",2),h([g({attribute:!1})],j.prototype,"families",2),h([g({attribute:!1})],j.prototype,"selection",2),h([g({attribute:!1})],j.prototype,"ghost",2),h([g({attribute:!1})],j.prototype,"reports",2),h([g({attribute:!1})],j.prototype,"timelines",2),h([g({attribute:!1})],j.prototype,"analysis",2),h([g({attribute:!1})],j.prototype,"t",2),h([g()],j.prototype,"lang",2),h([g({type:Number})],j.prototype,"snapStep",2),h([g({type:Boolean})],j.prototype,"snapOn",2),h([g({type:Boolean})],j.prototype,"showCompanions",2),h([g({type:Boolean})],j.prototype,"showMoisture",2),h([g({type:Boolean})],j.prototype,"showTemperature",2),h([g()],j.prototype,"viewDate",2),h([g({type:Boolean})],j.prototype,"readonly",2),h([g({type:Boolean})],j.prototype,"lockLayout",2),h([g()],j.prototype,"focusZone",2),h([g({attribute:!1})],j.prototype,"drawTool",2),h([f()],j.prototype,"drawRect",2),h([f()],j.prototype,"k",2),h([f()],j.prototype,"tx",2),h([f()],j.prototype,"ty",2),h([f()],j.prototype,"preview",2),h([be("svg")],j.prototype,"svgEl",2),j=h([M("hl-garden-canvas")],j);var U=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.fromSeason=null;this.preview=null;this.layout="copy";this.zones=new Set;this.features=new Set;this.carry=new Set;this.activate=!0;this.busy=!1;this.error=""}willUpdate(e){(e.has("api")||e.has("fromSeason"))&&this.api&&this.load()}async load(){this.error="";try{let e=await this.api.yearPreview(this.fromSeason??void 0);this.preview=e,this.layout=e.target_exists?"keep":"copy",this.zones=new Set(e.zones.map(t=>t.id)),this.features=new Set(e.features.map(t=>t.id)),this.carry=new Set(e.candidates.filter(t=>t.selected).map(t=>t.planting_id)),this.activate=e.is_live}catch(e){this.error=e.message??String(e)}}toggle(e,t,s){let n=new Set(e);return s?n.add(t):n.delete(t),n}targetBeds(){let e=this.preview;return this.layout==="keep"?new Set((this.snapshot.layouts?.[String(e.to_season)]?.beds??[]).map(t=>t.id)):new Set(e.beds.filter(t=>this.zones.has(t.zone_id)).map(t=>t.id))}async apply(){let e=this.preview;this.busy=!0;try{let t=await this.api.yearApply({from_season:e.from_season,layout:this.layout,zone_ids:this.layout==="copy"?[...this.zones]:null,feature_ids:this.layout==="copy"?[...this.features]:null,planting_ids:[...this.carry],activate:this.activate});this.dispatchEvent(new CustomEvent("transition-done",{detail:t,bubbles:!0,composed:!0}))}catch(t){this.error=t.message??String(t)}finally{this.busy=!1}}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){let e=this.preview;if(!e)return o`<div class="stack"><h2>${this.t("year.title_short")}</h2>
        ${this.error?o`<p class="warn">${this.error}</p>`:o`<p class="muted">${this.t("common.loading")}</p>`}
        <div class="row end"><button class="btn" @click=${this.close}>${this.t("common.close")}</button></div></div>`;let{from_season:t,to_season:s}=e,n=this.targetBeds(),a=p=>e.beds.find(m=>m.id===p)?.name??this.snapshot.layouts?.[String(s)]?.beds.find(m=>m.id===p)?.name??p,i=e.candidates.filter(p=>p.reason==="perennial"),l=e.candidates.filter(p=>p.reason==="overwinter"),d=p=>{let m=this.plants.find(b=>b.id===p.plant_id),v=!n.has(p.bed_id);return o`<label class="item ${this.carry.has(p.planting_id)?"":"off"}">
        <input type="checkbox" .checked=${this.carry.has(p.planting_id)} ?disabled=${v}
          @change=${b=>this.carry=this.toggle(this.carry,p.planting_id,b.target.checked)} />
        ${m?o`<hl-plant-image .plant=${m} color=${z(this.families,m.family)} lang=${this.lang} size="thumb"></hl-plant-image>`:u}
        <span>${y(m,this.lang)||p.plant_id}<small>${a(p.bed_id)}${v?o` · <span class="warn">${this.t("year.bed_gone")}</span>`:u}</small></span>
      </label>`};return o`<div class="stack">
      <h2>${this.t("year.title",{from:t,to:s})}</h2>
      <p class="small">${this.t("year.intro",{from:t,to:s})}</p>

      <section>
        <h3><ha-icon icon="mdi:floor-plan"></ha-icon>${this.t("year.plan")}</h3>
        ${e.target_exists?o`<div class="choice">
          <label class="row"><input type="radio" name="layout" .checked=${this.layout==="keep"} @change=${()=>this.layout="keep"} />${this.t("year.keep",{to:s})}</label>
          <label class="row"><input type="radio" name="layout" .checked=${this.layout==="copy"} @change=${()=>this.layout="copy"} />${this.t("year.copy",{from:t})}</label>
        </div>`:o`<p class="small muted">${this.t("year.copy_hint",{from:t,to:s})}</p>`}
        ${this.layout==="copy"?o`
          <h4>${this.t("planner.zones")}</h4>
          <div class="list">${e.zones.map(p=>o`<label class="item ${this.zones.has(p.id)?"":"off"}">
            <input type="checkbox" .checked=${this.zones.has(p.id)} @change=${m=>this.zones=this.toggle(this.zones,p.id,m.target.checked)} />
            <span>${ae[p.type]?.icon??""} ${p.name}<small>${this.t(`settings.zone_type.${p.type}`)} · ${this.t("planner.n_beds",{n:e.beds.filter(m=>m.zone_id===p.id).length})}</small></span>
          </label>`)}</div>
          ${e.features.length?o`<h4>${this.t("year.elements")}</h4>
            <div class="list">${e.features.map(p=>o`<label class="item ${this.features.has(p.id)?"":"off"}">
              <input type="checkbox" .checked=${this.features.has(p.id)} @change=${m=>this.features=this.toggle(this.features,p.id,m.target.checked)} />
              <span>${Ie[p.type]?.icon??""} ${p.name}<small>${this.t(`feature.${p.type}`)}</small></span>
            </label>`)}</div>`:u}`:u}
      </section>

      <section>
        <h3><ha-icon icon="mdi:tree-outline"></ha-icon>${this.t("year.perennials")}</h3>
        ${i.length?o`<div class="list">${i.map(d)}</div>`:o`<p class="small muted">${this.t("year.none")}</p>`}
        <h3 style="margin-top:var(--hl-s3)"><ha-icon icon="mdi:snowflake"></ha-icon>${this.t("year.overwinter")}</h3>
        ${l.length?o`<div class="list">${l.map(d)}</div>`:o`<p class="small muted">${this.t("year.none")}</p>`}
        <p class="xs muted">${this.t("year.not_chosen",{to:s})}</p>
      </section>

      <section>
        <label class="row"><input type="checkbox" .checked=${this.activate} ?disabled=${!e.is_live}
          @change=${p=>this.activate=p.target.checked} />${this.t("year.activate",{to:s})}</label>
        <p class="xs muted">${this.t(this.activate?"year.activate_hint":"year.prepare_hint",{from:t,to:s})}</p>
      </section>

      ${this.error?o`<p class="warn">${this.error}</p>`:u}
      <div class="row end">
        <button class="btn ghost" @click=${this.close}>${this.t("common.cancel")}</button>
        <button class="btn primary" ?disabled=${this.busy||!this.admin} @click=${()=>this.apply()}>
          <ha-icon icon="mdi:calendar-arrow-right"></ha-icon>${this.t("year.apply",{to:s})}</button>
      </div>
    </div>`}};U.styles=[R,S`
      :host { display: block; }
      h2 { margin: 0; }
      section { border-top: 1px solid var(--hl-border); padding-top: var(--hl-s3); margin-top: var(--hl-s3); }
      h3 { margin: 0 0 var(--hl-s2); display: flex; gap: 8px; align-items: center; }
      .list { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 6px; }
      label.item { display: flex; gap: 8px; align-items: center; padding: 6px 8px; border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); cursor: pointer; }
      label.item.off { opacity: 0.55; }
      label.item small { display: block; color: var(--hl-text-muted); }
      .warn { color: var(--hl-warning); }
      .row.end { justify-content: flex-end; }
      .choice { display: flex; flex-direction: column; gap: 6px; }
    `],h([g({attribute:!1})],U.prototype,"api",2),h([g({attribute:!1})],U.prototype,"t",2),h([g({attribute:!1})],U.prototype,"snapshot",2),h([g({attribute:!1})],U.prototype,"plants",2),h([g({attribute:!1})],U.prototype,"families",2),h([g()],U.prototype,"lang",2),h([g({type:Boolean})],U.prototype,"admin",2),h([g({type:Number})],U.prototype,"fromSeason",2),h([f()],U.prototype,"preview",2),h([f()],U.prototype,"layout",2),h([f()],U.prototype,"zones",2),h([f()],U.prototype,"features",2),h([f()],U.prototype,"carry",2),h([f()],U.prototype,"activate",2),h([f()],U.prototype,"busy",2),h([f()],U.prototype,"error",2),U=h([M("hl-year-transition")],U);function Ne(c,r,e,t){let s={...c.params};for(let n of["until","harvest","frost"])typeof s[n]=="string"&&(s[n]=_(s[n],e,{day:"numeric",month:"long"}));return typeof s.plant_id=="string"&&(s.plant=y(t.get(s.plant_id),e)||s.plant_id),typeof s.category=="string"&&(s.category=r(`category.${s.category}`)),Array.isArray(s.allowed)&&(s.allowed=s.allowed.map(n=>r(`category.${n}`)).join(", ")),typeof s.zone_type=="string"&&(s.zone_type=r(`settings.zone_type.${s.zone_type}`)),s.until==null&&c.code==="too_late"?r("reason.too_late_nodate",s):r(`reason.${c.code}`,s)}function Tn(c,r,e,t){let s=new Map;for(let n of Object.values(c??{}))for(let a of new Set(n.map(i=>Ne(i,r,e,t))))s.set(a,(s.get(a)??0)+1);return[...s.entries()].sort((n,a)=>a[1]-n[1]).map(([n])=>n)}var X=class extends E{constructor(){super(...arguments);this.heading="";this.subheading="";this.accent="";this.closeLabel="Close";this.prevLabel="Previous";this.nextLabel="Next";this.nav=!1;this.hasPrev=!1;this.hasNext=!1;this.size="normal"}firstUpdated(){this.dialog.open||this.dialog.showModal()}toTop(){this.content&&(this.content.scrollTop=0)}close(){this.dialog.close()}onKey(e){if(!this.nav)return;let t=e.composedPath()[0];t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||(e.key==="ArrowLeft"&&this.hasPrev&&(e.preventDefault(),this.step("prev")),e.key==="ArrowRight"&&this.hasNext&&(e.preventDefault(),this.step("next")))}step(e){this.dispatchEvent(new CustomEvent(e)),this.toTop()}onFooterSlot(e){let t=e.target;t.parentElement?.classList.toggle("has",t.assignedNodes({flatten:!0}).some(s=>s.nodeType===1))}render(){return o`<dialog aria-label=${this.heading} @keydown=${this.onKey}
      @close=${()=>this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}
      @click=${e=>{e.target===this.dialog&&this.close()}}>
      <header style=${this.accent?`border-top: 6px solid ${this.accent}`:""}>
        <slot name="media"></slot>
        <div class="titles"><h2>${this.heading}</h2>${this.subheading?o`<span class="small muted">${this.subheading}</span>`:u}
          <slot name="subheading"></slot></div>
        ${this.nav?o`
          <button class="icon-btn" aria-label=${this.prevLabel} title=${this.prevLabel} ?disabled=${!this.hasPrev} @click=${()=>this.step("prev")}><span class="x">‹</span></button>
          <button class="icon-btn" aria-label=${this.nextLabel} title=${this.nextLabel} ?disabled=${!this.hasNext} @click=${()=>this.step("next")}><span class="x">›</span></button>`:u}
        <button class="icon-btn" aria-label=${this.closeLabel} title=${this.closeLabel} @click=${()=>this.close()}><span class="x">×</span></button>
      </header>
      <div class="content"><slot></slot></div>
      <footer><slot name="actions" @slotchange=${this.onFooterSlot}></slot></footer>
    </dialog>`}};X.styles=[R,S`
      dialog { border: none; border-radius: 16px; padding: 0; width: min(760px, calc(100vw - 32px)); max-height: calc(100vh - 48px);
        background: var(--hl-surface); color: var(--hl-text); box-shadow: var(--hl-shadow-3); overflow: hidden; }
      :host([size="wide"]) dialog { width: min(980px, calc(100vw - 32px)); }
      :host([size="narrow"]) dialog { width: min(520px, calc(100vw - 32px)); }
      dialog[open] { display: flex; flex-direction: column; }
      dialog::backdrop { background: rgba(20, 30, 20, 0.45); }
      header { padding: var(--hl-s4) var(--hl-s5); border-bottom: 1px solid var(--hl-border); display: flex; gap: var(--hl-s2); align-items: center; }
      header h2 { margin: 0; }
      .titles { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
      .content { padding: var(--hl-s4) var(--hl-s5); overflow: auto; display: flex; flex-direction: column; gap: var(--hl-s4); }
      footer { padding: var(--hl-s3) var(--hl-s5); border-top: 1px solid var(--hl-border); display: flex; gap: var(--hl-s2); flex-wrap: wrap; align-items: center; }
      footer:not(.has) { display: none; }
      .x { font-size: 20px; line-height: 1; }
    `],h([g()],X.prototype,"heading",2),h([g()],X.prototype,"subheading",2),h([g()],X.prototype,"accent",2),h([g()],X.prototype,"closeLabel",2),h([g()],X.prototype,"prevLabel",2),h([g()],X.prototype,"nextLabel",2),h([g({type:Boolean})],X.prototype,"nav",2),h([g({type:Boolean,attribute:"has-prev"})],X.prototype,"hasPrev",2),h([g({type:Boolean,attribute:"has-next"})],X.prototype,"hasNext",2),h([g({reflect:!0})],X.prototype,"size",2),h([be("dialog")],X.prototype,"dialog",2),h([be(".content")],X.prototype,"content",2),X=h([M("hl-modal")],X);function Mn(c){return c.startsWith("p:")?{plan_id:c.slice(2)}:{season:Number(c.slice(2))}}var ie=class extends E{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en";this.left="";this.right="";this.result=null;this.error=""}options(){let e=new Set(Object.keys(this.snapshot.layouts??{}).map(Number));this.snapshot.layout_season!=null&&e.add(this.snapshot.layout_season);let t=[...e].sort().map(s=>[`s:${s}`,this.t("compare.season_plan",{season:s})]);for(let s of this.snapshot.archived_plans??[])t.push([`p:${s.id}`,this.t("compare.inactive_plan",{name:s.name,season:s.season})]);return t}willUpdate(){let e=this.options();!this.left&&e.length&&(this.left=e.find(([t])=>t.startsWith("p:"))?.[0]??e[0][0]),!this.right&&e.length&&(this.right=`s:${this.snapshot.layout_season??""}`)}updated(e){(e.has("left")||e.has("right"))&&this.run()}async run(){if(!(!this.left||!this.right)){this.error="";try{this.result=await this.api.comparePlans(Mn(this.left),Mn(this.right))}catch(e){this.result=null,this.error=e.message??String(e)}}}what(e){return e.map(t=>this.t(`compare.what.${t}`)).join(", ")}renderPart(e,t){return!t.added.length&&!t.removed.length&&!t.changed.length?u:o`<div class="part"><h4>${e}</h4><ul>
      ${t.added.map(s=>o`<li class="add"><span class="sign">+</span>${s.name}</li>`)}
      ${t.removed.map(s=>o`<li class="del"><span class="sign">−</span>${s.name}</li>`)}
      ${t.changed.map(s=>o`<li class="chg"><span class="sign">~</span>${s.was&&s.was!==s.name?`${s.was} \u2192 ${s.name}`:s.name}
        <span class="xs muted">(${this.what(s.what)})</span></li>`)}
    </ul></div>`}crop(e,t,s,n=""){let a=this.plants.get(e.plant_id);return o`<li class=${s}><span class="sign">${t}</span>
      ${a?D(N(a),a.color||z(this.families,a.family),16):u}${e.name}
      <span class="xs muted">${e.bed}</span>${n}</li>`}render(){let e=this.options(),t=this.result,s=(n,a,i)=>o`<label class="field">${i}
      <select @change=${l=>a(l.target.value)}>
        ${e.map(([l,d])=>o`<option value=${l} ?selected=${l===n}>${d}</option>`)}</select></label>`;return o`
      <div class="pick">
        ${s(this.left,n=>this.left=n,this.t("compare.from"))}
        <span>→</span>
        ${s(this.right,n=>this.right=n,this.t("compare.to"))}
      </div>
      ${this.error?o`<p class="small">${this.error}</p>`:u}
      ${t?t.identical?o`<div class="finding info"><span>${this.t("compare.identical")}</span></div>`:o`<div class="parts">
        ${this.renderPart(this.t("compare.zones"),t.zones)}
        ${this.renderPart(this.t("compare.beds"),t.beds)}
        ${this.renderPart(this.t("compare.features"),t.features)}
        ${t.plantings.added.length||t.plantings.removed.length||t.plantings.changed.length?o`<div class="part"><h4>${this.t("compare.crops")}</h4><ul>
          ${t.plantings.added.map(n=>this.crop(n,"+","add"))}
          ${t.plantings.removed.map(n=>this.crop(n,"\u2212","del"))}
          ${t.plantings.changed.map(n=>this.crop(n,"~","chg",o`<span class="xs muted">(${n.was_bed&&n.was_bed!==n.bed?`${n.was_bed} \u2192 ${n.bed}`:this.what(n.what)})</span>`))}
        </ul></div>`:u}
      </div>`:u}`}};ie.styles=[R,S`
      :host { display: block; }
      .pick { display: flex; flex-wrap: wrap; gap: var(--hl-s2); align-items: end; }
      .pick select { width: auto; min-width: 180px; }
      .parts { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--hl-s3); margin-top: var(--hl-s3); }
      .part h4 { margin: 0 0 4px; }
      ul { margin: 0; padding-left: 0; list-style: none; font-size: var(--hl-fs-sm); display: flex; flex-direction: column; gap: 3px; }
      li { display: flex; gap: 6px; align-items: center; }
      .sign { width: 18px; text-align: center; font-weight: 700; flex: none; }
      .add .sign { color: var(--hl-leaf-700); }
      .del .sign { color: var(--hl-tomato-500); }
      .chg .sign { color: var(--hl-sun-700, #a66b00); }
    `],h([g({attribute:!1})],ie.prototype,"snapshot",2),h([g({attribute:!1})],ie.prototype,"api",2),h([g({attribute:!1})],ie.prototype,"t",2),h([g({attribute:!1})],ie.prototype,"plants",2),h([g({attribute:!1})],ie.prototype,"families",2),h([g()],ie.prototype,"lang",2),h([g()],ie.prototype,"left",2),h([g()],ie.prototype,"right",2),h([f()],ie.prototype,"result",2),h([f()],ie.prototype,"error",2),ie=h([M("hl-plan-compare")],ie);var le=class extends E{constructor(){super(...arguments);this.lang="en";this.days=14;this.moisture=[];this.rainByDay={};this.loaded=!1;this.loadedFor=""}get today(){return this.snapshot.analysis?.today??new Date().toISOString().slice(0,10)}rainEntity(){return this.snapshot.zones.find(t=>t.id===this.bed.zone_id)?.sensors?.rain??this.snapshot.settings.outdoor_sensors?.rain??null}willUpdate(){let e=`${this.bed?.id}:${this.days}`;this.bed&&this.api&&e!==this.loadedFor&&(this.loadedFor=e,this.load())}async load(){this.loaded=!1;let e=this.bed.sensors?.soil_moisture??null,t=this.rainEntity(),s=new Date(`${H(this.today,-(this.days-1))}T00:00:00`);try{let n=await this.api.history([e,t].filter(i=>!!i),s);this.moisture=(e?n[e]??[]:[]).map(i=>({t:i.lu*1e3,v:Number(i.s)})).filter(i=>Number.isFinite(i.v));let a={};for(let i of t?n[t]??[]:[]){let l=Number(i.s);if(!Number.isFinite(l))continue;let d=new Date(i.lu*1e3).toISOString().slice(0,10);a[d]=Math.max(a[d]??0,l)}this.rainByDay=a}catch{this.moisture=[],this.rainByDay={}}finally{this.loaded=!0}}daysData(){let e=[];for(let t=this.days-1;t>=0;t--){let s=H(this.today,-t),n=(this.snapshot.irrigation_log??[]).filter(a=>a.bed_id===this.bed.id&&a.at.slice(0,10)===s);e.push({day:s,liters:n.reduce((a,i)=>a+i.liters,0),mm:n.reduce((a,i)=>a+i.mm,0),rain:this.rainByDay[s]??null})}return e}render(){let e=this.daysData(),t=700,s=170,n=34,a=34,i=10,l=26,d=(t-n-a)/e.length,p=Math.max(5,...e.map(k=>Math.max(k.mm,k.rain??0))),m=k=>s-l-k/p*(s-i-l),v=new Date(`${e[0].day}T00:00:00`).getTime(),b=this.days*864e5,x=k=>n+(k-v)/b*(t-n-a),$=k=>s-l-Math.max(0,Math.min(100,k))/100*(s-i-l),T=this.moisture.filter(k=>k.t>=v&&k.t<=v+b).map((k,Y)=>`${Y?"L":"M"}${x(k.t).toFixed(1)},${$(k.v).toFixed(1)}`).join(" "),L=e.some(k=>k.liters||k.rain)||this.moisture.length;return o`
      ${!L&&this.loaded?o`<p class="empty">${this.t("water.chart_empty")}</p>`:u}
      <svg viewBox="0 0 ${t} ${s}" role="img" aria-label=${this.t("water.chart_title",{bed:this.bed.name})}>
        <line x1=${n} x2=${t-a} y1=${s-l} y2=${s-l} stroke="var(--hl-border, #ccc)" />
        ${e.map((k,Y)=>P`
          ${k.rain?P`<rect x=${n+Y*d+d*.12} width=${d*.36} y=${m(k.rain)} height=${s-l-m(k.rain)} rx="2" fill="var(--hl-frost-300, #9cc7ec)"><title>${_(k.day,this.lang)} · ${this.t("water.rain")}: ${k.rain} mm</title></rect>`:u}
          ${k.mm?P`<rect x=${n+Y*d+d*.52} width=${d*.36} y=${m(k.mm)} height=${s-l-m(k.mm)} rx="2" fill="var(--hl-leaf-600, #3f7d2f)"><title>${_(k.day,this.lang)} · ${this.t("water.given")}: ${Math.round(k.liters)} L (${k.mm.toFixed(1)} mm)</title></rect>`:u}
          ${Y%2===0||this.days<=10?P`<text x=${n+Y*d+d/2} y=${s-8} font-size="10" text-anchor="middle" fill="var(--hl-text-muted, #777)">${_(k.day,this.lang,{day:"numeric",month:"numeric"})}</text>`:u}`)}
        ${T?P`<path d=${T} fill="none" stroke="var(--hl-soil-700, #7a4e2d)" stroke-width="2" />
          <text x=${t-a+4} y=${$(100)+4} font-size="10" fill="var(--hl-text-muted, #777)">100%</text>
          <text x=${t-a+4} y=${$(0)} font-size="10" fill="var(--hl-text-muted, #777)">0%</text>`:u}
        <text x="2" y=${i+8} font-size="10" fill="var(--hl-text-muted, #777)">${Math.round(p)} mm</text>
      </svg>
      <div class="legend">
        <span style="--c: var(--hl-leaf-600, #3f7d2f)">${this.t("water.given")}</span>
        ${this.rainEntity()?o`<span style="--c: var(--hl-frost-300, #9cc7ec)">${this.t("water.rain")}</span>`:u}
        ${this.bed.sensors?.soil_moisture?o`<span style="--c: var(--hl-soil-700, #7a4e2d)">${this.t("water.moisture")}</span>`:o`<span>${this.t("water.no_moisture")}</span>`}
      </div>`}};le.styles=S`
    :host { display: block; }
    svg { width: 100%; max-width: 820px; height: auto; display: block; }
    .legend { display: flex; gap: 12px; flex-wrap: wrap; font-size: 11px; color: var(--hl-text-muted, #666); margin-top: 4px; }
    .legend span::before { content: ""; display: inline-block; width: 12px; height: 8px; border-radius: 2px; margin-right: 4px; background: var(--c); vertical-align: middle; }
    .empty { font-size: 12px; color: var(--hl-text-muted, #666); }
  `,h([g({attribute:!1})],le.prototype,"bed",2),h([g({attribute:!1})],le.prototype,"snapshot",2),h([g({attribute:!1})],le.prototype,"api",2),h([g({attribute:!1})],le.prototype,"t",2),h([g()],le.prototype,"lang",2),h([g({type:Number})],le.prototype,"days",2),h([f()],le.prototype,"moisture",2),h([f()],le.prototype,"rainByDay",2),h([f()],le.prototype,"loaded",2),le=h([M("hl-water-chart")],le);var Ot=class{constructor(r,e=100){this.present=r;this.limit=e;this.past=[];this.future=[]}get current(){return this.present}get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}commit(r){return this.past.push(this.present),this.past.length>this.limit&&this.past.shift(),this.present=r,this.future=[],r}undo(){let r=this.past.pop();return r===void 0?this.present:(this.future.push(this.present),this.present=r,r)}redo(){let r=this.future.pop();return r===void 0?this.present:(this.past.push(this.present),this.present=r,r)}reset(r){this.past=[],this.future=[],this.present=r}};var I=c=>structuredClone(c),Bt=()=>({soil_moisture:null,soil_temperature:null,air_temperature:null,air_humidity:null,light:null,rain:null}),zn=[["buildings",["house","carport","shed","driveway","parking","street","terrace","decking","wall"]],["paths",["path","stone_path","wood_path","stepping_stones","bark_path"]],["green",["lawn","flowerbed","hedge","shrub","tree","pond"]],["outdoor_living",["seating","pool","play","fence","trellis","compost","water_butt","beehive","other"]]],Ta=zn.flatMap(([,c])=>c),Ma={path:[300,60],terrace:[400,300],lawn:[500,400],flowerbed:[200,100],compost:[100,100],water_butt:[60,60],shed:[200,150],tree:[400,400],house:[1e3,800],driveway:[300,800],street:[1500,600],parking:[500,500],play:[300,300],beehive:[60,60],hedge:[400,80],fence:[500,10],trellis:[200,20],pond:[200,150],other:[80,80],stone_path:[300,80],wood_path:[300,80],stepping_stones:[300,50],bark_path:[300,60],decking:[400,300],wall:[400,20],carport:[300,500],shrub:[150,150],pool:[800,400],seating:[300,250]},ys=["outdoor","garden","greenhouse","cold_frame","containers","orchard","fruit","herbs","flowers"],za=["orchard","fruit","herbs","flowers","garden"],Pa={outdoor:[600,400],greenhouse:[300,200],cold_frame:[150,80],orchard:[1e3,800],fruit:[600,300],herbs:[300,200],flowers:[400,150],garden:[800,600],containers:[400,200]},ja=["fresh","storage","herbs","pollinators","winter","perennials","easy"],Ra=["vegetable","herb","fruit","flower"];function $s(c){let r=c.sowing;return r.direct_sow.length&&(!r.indoor_sow.length||c.habit==="root"||c.tags.includes("root"))?"direct_sow":r.indoor_sow.length&&r.transplant.length?"indoor_sow":r.transplant.length?"transplant":"direct_sow"}var w=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.narrow=!1;this.mode="plant";this.transitionRequest=0;this.initialSeason=null;this.focusPlanting=null;this.why=null;this.dropWarning=null;this.stillPossible=null;this.stillPossibleFor=null;this.lateDismissed=!1;this.comparePlan="";this.draft={zones:[],beds:[],plantings:[],features:[]};this.selection=null;this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.categoryFilter="";this.autofill=null;this.autofillBusy=!1;this.autofillReplace=!1;this.autofillBeds=[];this.autofillResources=null;this.autofillSeason=0;this.season=new Date().getFullYear();this.saveState="saved";this.reports={};this.extraTimelines={};this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.layoutMode="block";this.search="";this.familyFilter="";this.paletteDrag=null;this.ghostReport=null;this.dialog=null;this.newPlanStart="zones";this.planBusy=!1;this.popupOpen=!1;this.announcement="";this.paletteOpen=!0;this.step="plant";this.tool=null;this.focusZone="";this.removing=null;this.soilForm=null;this.harvestKg="";this.history=null;this.baseRevision=null;this.checkTimers=new Map;this.ghostCheckAt=0;this.plantMap=new Map;this.seasonChosen=!1}willUpdate(e){e.has("plants")&&(this.plantMap=new Map(this.plants.map(t=>[t.id,t]))),e.has("snapshot")&&this.snapshot&&this.syncFromSnapshot(),e.has("mode")&&(this.step=this.mode==="plant"?"plant":this.draft.zones.length?"zones":"site",this.tool=null,this.selection=null,this.multi=[]),e.has("transitionRequest")&&this.transitionRequest>0&&(this.dialog="transition"),e.has("focusPlanting")&&this.focusPlanting&&this.openFocus(this.focusPlanting)}async openFocus(e){this.history||this.syncFromSnapshot(),e.season!==this.season&&await this.setSeason(e.season),this.draft.plantings.some(t=>t.id===e.id)&&(this.selection={kind:"planting",id:e.id},this.multi=[],this.popupOpen=!0)}async explainHere(e){this.why={plantingId:e.id,result:null,error:""};try{let t=await this.api.explain(e.plant_id,this.season);this.why?.plantingId===e.id&&(this.why={plantingId:e.id,result:t,error:""})}catch(t){this.why={plantingId:e.id,result:null,error:t.message}}}async checkDrop(e){try{let s=(await this.api.explain(e.plant_id,this.season)).beds.find(n=>n.bed_id===e.bed_id);s&&!s.ok&&(this.dropWarning={plantingId:e.id,text:s.reasons.map(n=>Ne(n,this.t,this.lang,this.plantMap))})}catch{}}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get hasLayout(){return!!this.snapshot&&xe(this.snapshot,this.season)!==null}locked(e){return this.mode==="plant"&&e!=="planting"}syncFromSnapshot(e=!1){let t=this.snapshot;if(!this.history&&!this.seasonChosen){this.season=t.layout_season??t.analysis?.season??new Date().getFullYear();let n=t.analysis?.season;n&&n!==this.season&&xe(t,n)&&(this.season=n),this.initialSeason&&(this.season=this.initialSeason),this.viewDate=t.analysis?.today??"",this.step=this.mode==="plant"?"plant":t.zones.length?"zones":"site"}let s=this.saveState==="saved";if(e||!this.history||s&&t.revision!==this.baseRevision){let n=xe(t,this.season)??{zones:[],beds:[],features:[]},a={zones:I(n.zones),beds:I(n.beds),plantings:I(t.plantings),features:I(n.features??[])};this.history?this.history.reset(a):this.history=new Ot(a),this.draft=a,this.baseRevision=t.revision,this.reports={},this.extraTimelines={}}}get timelines(){return{...this.snapshot.analysis?.timelines??{},...this.extraTimelines}}get seasonPlantings(){return this.draft.plantings.filter(e=>$e(e,!!this.plantMap.get(e.plant_id)?.perennial,this.season))}commit(e,t,s=[]){if(!(!this.admin||!this.history)){this.draft=this.history.commit(e),this.saveState="dirty",this.scheduleSave();for(let n of s)this.scheduleCheck(n);t&&this.announce(t)}}undo(){this.history?.canUndo&&(this.draft=this.history.undo(),this.afterHistoryJump())}redo(){this.history?.canRedo&&(this.draft=this.history.redo(),this.afterHistoryJump())}afterHistoryJump(){this.saveState="dirty",this.scheduleSave(),this.draft.beds.forEach(e=>this.scheduleCheck(e.id)),this.selection&&!this.findItem(this.selection)&&(this.selection=null)}scheduleSave(){window.clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>this.save(),1200)}async save(){if(this.saveState!=="dirty")return;let e=this.draft;this.saveState="saving";try{let t=await this.api.savePlan(e,this.baseRevision,this.season);this.baseRevision=t.revision,this.saveState=this.draft===e?"saved":"dirty",this.saveState==="dirty"&&this.scheduleSave()}catch(t){t.code==="revision_conflict"?(this.saveState="saved",this.history=null,this.syncFromSnapshot(),this.toast(this.t("common.conflict"))):(this.saveState="error",this.toast(this.t("common.error",{message:t.message??String(t)})))}}async setSeason(e){if(window.clearTimeout(this.saveTimer),this.saveState==="dirty"&&await this.save(),this.saveState!=="saved"){this.toast(this.t("layout.save_first")),this.requestUpdate();return}this.seasonChosen=!0,this.season=e,this.dispatchEvent(new CustomEvent("season-changed",{detail:e,bubbles:!0,composed:!0})),this.selection=null,this.multi=[],this.focusZone="",this.syncFromSnapshot(!0),this.mode==="layout"&&(this.step=this.draft.zones.length?this.step:"site"),requestAnimationFrame(()=>this.canvas?.fit())}startLayout(e){let t=e==null?null:xe(this.snapshot,e),s={...I(this.draft),zones:I(t?.zones??[]),beds:I(t?.beds??[]),features:I(t?.features??[])};this.commit(s,this.t("layout.started",{season:this.season})),this.step=s.zones.length?"zones":"site",requestAnimationFrame(()=>this.canvas?.fit())}scheduleCheck(e){window.clearTimeout(this.checkTimers.get(e)),this.checkTimers.set(e,window.setTimeout(()=>this.runCheck(e),250))}bedPlantings(e,t=this.draft){return t.plantings.filter(s=>s.bed_id===e&&(this.plantMap.get(s.plant_id)?.perennial?$e(s,!0,this.season):Math.abs(s.season-this.season)<=1))}async runCheck(e){let t=this.draft.beds.find(s=>s.id===e);if(!t){let{[e]:s,...n}=this.reports;this.reports=n;return}try{let s=await this.api.checkBed(t,this.bedPlantings(e));this.reports={...this.reports,[e]:s},s.timelines&&(this.extraTimelines={...this.extraTimelines,...s.timelines})}catch{}}findItem(e){return(e.kind==="zone"?this.draft.zones:e.kind==="bed"?this.draft.beds:e.kind==="feature"?this.draft.features:this.draft.plantings).find(s=>s.id===e.id)}onSelect(e){if(!e){this.selection=null,this.multi=[];return}if(e.additive){let t=this.multi.filter(n=>n.kind===e.kind),s=t.some(n=>n.id===e.id);this.multi=s?t.filter(n=>n.id!==e.id):[...t,{kind:e.kind,id:e.id}],this.selection=this.multi[this.multi.length-1]??null,this.announce(this.t("planner.selected_n",{n:this.multi.length}));return}this.selection={kind:e.kind,id:e.id},this.multi=[this.selection]}align(e){if(this.multi.length<2||!this.admin||this.locked(this.multi[0].kind))return;let t=I(this.draft),s=this.multi[0].kind,n=new Set;if(s==="planting"){let a=this.multi.map(d=>t.plantings.find(p=>p.id===d.id)).filter(Boolean),i=new Map(t.beds.map(d=>[d.id,d])),l=a.map(d=>({x:i.get(d.bed_id).x_cm+d.x_cm,y:i.get(d.bed_id).y_cm+d.y_cm,w:d.width_cm,h:d.length_cm}));bs(l,e).forEach((d,p)=>{let m=a[p],v=i.get(m.bed_id),b=_e({...d,x:d.x-v.x_cm,y:d.y-v.y_cm},{x:0,y:0,w:v.width_cm,h:v.length_cm});Object.assign(m,{x_cm:b.x,y_cm:b.y}),n.add(v.id)})}else{let a=s==="bed"?t.beds:s==="zone"?t.zones:t.features,i=this.multi.map(l=>a.find(d=>d.id===l.id)).filter(Boolean);bs(i.map(l=>({x:l.x_cm,y:l.y_cm,w:l.width_cm,h:l.length_cm})),e).forEach((l,d)=>{let p=i[d],m=l.x-p.x_cm,v=l.y-p.y_cm;if(p.x_cm=l.x,p.y_cm=l.y,s==="zone")for(let b of t.beds.filter(x=>x.zone_id===p.id))b.x_cm+=m,b.y_cm+=v;s==="bed"&&n.add(p.id)})}this.commit(t,this.t("planner.aligned",{n:this.multi.length}),[...n])}onItemChange(e){let{kind:t,id:s,rect:n,targetBedId:a,dx:i,dy:l,group:d}=e.detail;if(this.locked(t))return;let p=I(this.draft),m=this.snapOn?this.snapshot.settings.snap_cm:1;if(d){this.moveGroup(p,t,i,l);return}if(t==="feature"){let v=p.features.find(b=>b.id===s);Object.assign(v,{x_cm:n.x,y_cm:n.y,width_cm:n.w,length_cm:n.h}),this.commit(p,this.t("planner.moved",{name:v.name}));return}if(t==="zone"){let v=p.zones.find($=>$.id===s),b=n.x-v.x_cm,x=n.y-v.y_cm;if(Object.assign(v,{x_cm:n.x,y_cm:n.y,width_cm:n.w,length_cm:n.h}),b||x)for(let $ of p.beds.filter(T=>T.zone_id===s))$.x_cm+=b,$.y_cm+=x;this.commit(p,this.t("planner.moved",{name:v.name}))}else if(t==="bed"){let v=p.beds.find(T=>T.id===s);Object.assign(v,{x_cm:n.x,y_cm:n.y,width_cm:n.w,length_cm:n.h});let b=n.x+n.w/2,x=n.y+n.h/2,$=[...p.zones].reverse().find(T=>b>=T.x_cm&&b<=T.x_cm+T.width_cm&&x>=T.y_cm&&x<=T.y_cm+T.length_cm);$&&(v.zone_id=$.id),this.commit(p,this.t("planner.moved",{name:v.name}),[v.id])}else{let v=p.plantings.find(L=>L.id===s),b=v.bed_id,x=p.beds.find(L=>L.id===(a??b))??p.beds.find(L=>L.id===b),$=_e({...n,x:n.x-x.x_cm,y:n.y-x.y_cm},{x:0,y:0,w:x.width_cm,h:x.length_cm});Object.assign(v,{bed_id:x.id,x_cm:K($.x,m),y_cm:K($.y,m),width_cm:$.w,length_cm:$.h});let T=this.plantMap.get(v.plant_id);this.commit(p,this.t("planner.moved",{name:y(T,this.lang)}),[...new Set([b,x.id])])}}moveGroup(e,t,s,n){let a=new Set(this.multi.filter(l=>l.kind===t).map(l=>l.id)),i=new Set;if(t==="planting")for(let l of e.plantings.filter(d=>a.has(d.id))){let d=e.beds.find(m=>m.id===l.bed_id),p=_e({x:l.x_cm+s,y:l.y_cm+n,w:l.width_cm,h:l.length_cm},{x:0,y:0,w:d.width_cm,h:d.length_cm});Object.assign(l,{x_cm:p.x,y_cm:p.y}),i.add(d.id)}else{let l=t==="bed"?e.beds:t==="zone"?e.zones:e.features;for(let d of l.filter(p=>a.has(p.id))){if(d.x_cm=Math.round(d.x_cm+s),d.y_cm=Math.round(d.y_cm+n),t==="zone")for(let p of e.beds.filter(m=>m.zone_id===d.id))p.x_cm+=s,p.y_cm+=n;t==="bed"&&i.add(d.id)}}this.commit(e,this.t("planner.moved_n",{n:a.size}),[...i])}updateSelected(e,t){if(!this.selection||this.locked(this.selection.kind))return;let s=I(this.draft),a=(this.selection.kind==="zone"?s.zones:this.selection.kind==="bed"?s.beds:this.selection.kind==="feature"?s.features:s.plantings).find(l=>l.id===this.selection.id);if(!a)return;Object.assign(t?a[t]:a,e);let i=this.selection.kind==="planting"?a.bed_id:this.selection.kind==="bed"?a.id:void 0;this.commit(s,void 0,i?[i]:[])}inSeason(e){return $e(e,!!this.plantMap.get(e.plant_id)?.perennial,this.season)}dropFromSeason(e,t){let s=new Set(t);e.plantings=e.plantings.flatMap(n=>!s.has(n.bed_id)||!this.inSeason(n)?[n]:n.season<this.season?[{...n,last_season:this.season-1}]:[])}removeSelected(){let e=this.selection;if(!e||!this.admin||this.locked(e.kind))return;let t=I(this.draft),s="";if(this.multi.length>1&&(e.kind==="planting"||e.kind==="feature")){let n=new Set(this.multi.map(i=>i.id)),a=t.plantings.filter(i=>n.has(i.id)).map(i=>i.bed_id);t.plantings=t.plantings.filter(i=>!n.has(i.id)),t.features=t.features.filter(i=>!n.has(i.id)),this.commit(t,this.t("planner.removed_n",{n:n.size}),[...new Set(a)]),this.selection=null,this.multi=[];return}if(e.kind==="feature"){let n=t.features.find(a=>a.id===e.id);t.features=t.features.filter(a=>a.id!==e.id),this.commit(t,this.t("planner.removed",{name:n?.name??""})),this.selection=null,this.multi=[];return}if(e.kind==="planting"){let n=t.plantings.find(a=>a.id===e.id);if(n&&this.plantMap.get(n.plant_id)?.perennial&&n.season<this.season){this.removing=n;return}s=y(this.plantMap.get(n?.plant_id??""),this.lang),t.plantings=t.plantings.filter(a=>a.id!==e.id),this.commit(t,this.t("planner.removed",{name:s}),n?[n.bed_id]:[])}else if(e.kind==="bed"){let n=t.beds.find(i=>i.id===e.id),a=t.plantings.filter(i=>i.bed_id===e.id&&this.inSeason(i)).length;if(a&&!confirm(`${n?.name}: ${this.t("planner.count",{n:a})} \u2013 ${this.t("common.delete")}?`))return;t.beds=t.beds.filter(i=>i.id!==e.id),this.dropFromSeason(t,[e.id]),this.commit(t,this.t("planner.removed",{name:n?.name??""}))}else{let n=t.zones.find(i=>i.id===e.id),a=t.beds.filter(i=>i.zone_id===e.id).map(i=>i.id);if(a.length&&!confirm(`${n?.name}: ${a.length} \xD7 ${this.t("planner.bed_name")} \u2013 ${this.t("common.delete")}?`))return;t.zones=t.zones.filter(i=>i.id!==e.id),t.beds=t.beds.filter(i=>!a.includes(i.id)),this.dropFromSeason(t,a),this.commit(t,this.t("planner.removed",{name:n?.name??""}))}this.selection=null,this.multi=[]}removePerennial(e){let t=this.removing;if(this.removing=null,!t)return;let s=I(this.draft),n=y(this.plantMap.get(t.plant_id),this.lang);e==="delete"?s.plantings=s.plantings.filter(a=>a.id!==t.id):Object.assign(s.plantings.find(a=>a.id===t.id),{removed_season:this.season}),this.selection=null,this.multi=[],this.commit(s,this.t(e==="delete"?"planner.removed":"planner.removed_from",{name:n,season:this.season}),[t.bed_id])}toolInfo(e){return e.kind==="zone"?{label:this.t(`settings.zone_type.${e.type}`),color:ae[e.type].stroke.startsWith("var")?"#6f9a45":ae[e.type].stroke}:e.kind==="feature"?{label:this.t(`feature.${e.type}`),color:Ie[e.type]?.stroke??"#888"}:{label:this.t(e.bedKind==="container"?"planner.draw_planter":"planner.bed_name"),color:"#8a6a45"}}onDrawRect(e){let t=this.tool;if(!t||!this.admin)return;let s=e.detail,n=I(this.draft),a=(i,l)=>({x:K(s.x-i/2,10),y:K(s.y-l/2,10),w:i,h:l});if(t.kind==="zone"){s.w||(s=a(...Pa[t.type]));let i=n.zones.filter(d=>d.type===t.type).length+1,l={id:ge("zone"),name:`${this.t(`settings.zone_type.${t.type}`)}${i>1?` ${i}`:""}`,type:t.type,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:Bt(),vent_entity:null};n.zones.push(l),za.includes(t.type)&&n.beds.push(this.makeBed(l,{x:l.x_cm,y:l.y_cm,w:l.width_cm,h:l.length_cm},l.name,"in_ground")),this.selection={kind:"zone",id:l.id},this.commit(n,this.t("planner.placed",{plant:l.name,bed:""}))}else if(t.kind==="feature"){s.w||(s=a(...Ma[t.type]));let i={id:ge("ft"),name:this.t(`feature.${t.type}`),type:t.type,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,notes:""};n.features.push(i),this.selection={kind:"feature",id:i.id},this.commit(n,this.t("planner.placed",{plant:i.name,bed:""}))}else{s.w||(s=t.bedKind==="container"?a(80,40):a(120,80));let i=s.x+s.w/2,l=s.y+s.h/2,d=n.zones.find(m=>m.id===this.focusZone)??[...n.zones].reverse().find(m=>i>=m.x_cm&&i<=m.x_cm+m.width_cm&&l>=m.y_cm&&l<=m.y_cm+m.length_cm);if(!d){this.toast(this.t("planner.bed_needs_zone"));return}let p=this.makeBed(d,_e(s,{x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm}),`${this.t(t.bedKind==="container"?"planner.new_planter":"planner.new_bed")} ${n.beds.length+1}`,t.bedKind??(d.type==="containers"?"container":d.type==="outdoor"?"raised":"in_ground"));n.beds.push(p),this.selection={kind:"bed",id:p.id},this.commit(n,this.t("planner.placed",{plant:p.name,bed:d.name}),[p.id])}this.multi=this.selection?[this.selection]:[]}makeBed(e,t,s,n){return{id:ge("bed"),name:s,zone_id:e.id,kind:n,x_cm:t.x,y_cm:t.y,width_cm:t.w,length_cm:t.h,orientation_deg:0,soil:n==="container"?"potting_mix":"loam",shade_pct:null,sensors:Bt(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""}}openZone(e){this.focusZone=e,this.step==="site"&&(this.step="zones");let t=this.draft.zones.find(s=>s.id===e);this.selection=t?{kind:"zone",id:t.id}:null,this.multi=this.selection?[this.selection]:[],requestAnimationFrame(()=>t?this.canvas?.fitRect({x:t.x_cm,y:t.y_cm,w:t.width_cm,h:t.length_cm}):this.canvas?.fit())}closeZone(){this.focusZone="",requestAnimationFrame(()=>this.canvas?.fit())}moveToBed(e,t){let s=I(this.draft),n=s.plantings.find(m=>m.id===e),a=s.beds.find(m=>m.id===t);if(!n||!a)return;let i=n.bed_id,l=this.bedPlantings(a.id,s).filter(m=>m.season===n.season).map(m=>({x:m.x_cm,y:m.y_cm,w:m.width_cm,h:m.length_cm})),d={w:Math.min(n.width_cm,a.width_cm),h:Math.min(n.length_cm,a.length_cm)},p=He(a,d,l,this.snapshot.settings.snap_cm)??{x:0,y:0};Object.assign(n,{bed_id:a.id,x_cm:p.x,y_cm:p.y,width_cm:d.w,length_cm:d.h}),this.commit(s,this.t("planner.moved",{name:y(this.plantMap.get(n.plant_id),this.lang)}),[i,a.id])}openAutofill(e=[]){let t=this.snapshot.settings.resources;this.autofillResources=t?I(t):{household_size:2,hours_per_week:3,water_liters_per_week:null,compost_kg:null,irrigation:!1,goals:["fresh","herbs"],wanted:[],excluded:[]},this.autofill=null,this.autofillBeds=e;let s=this.snapshot.analysis,n=!!s&&this.season===s.season&&!!s.anchors?.first_frost&&!!s.today&&ye(s.today,s.anchors.first_frost)<60;this.autofillSeason=n?this.season+1:this.season,this.dialog="autofill"}async runAutofill(){if(this.autofillResources){this.autofillBusy=!0;try{this.saveState!=="saved"&&await this.save(),this.autofill=await this.api.autofill({season:this.autofillSeason||this.season,bed_ids:this.autofillBeds.length?this.autofillBeds:void 0,replace:this.autofillReplace,resources:this.autofillResources})}catch(e){this.toast(this.t("common.error",{message:e.message??String(e)}))}finally{this.autofillBusy=!1}}}async applyAutofill(){let e=this.autofill;if(e)try{let t=await this.api.autofillApply(e.plantings,this.autofillReplace?e.beds:[],this.baseRevision,e.plan_from);this.baseRevision=t.revision,this.saveState="saved",this.dialog=null,this.autofill=null,this.toast(this.t("autofill.applied",{n:e.summary.plantings})),e.season!==this.season&&(this.seasonChosen=!0,this.season=e.season,this.dispatchEvent(new CustomEvent("season-changed",{detail:e.season,bubbles:!0,composed:!0}))),this.history=null}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}}duplicateSelected(){let e=this.selection;if(!e||e.kind!=="planting")return;let t=I(this.draft),s=t.plantings.find(d=>d.id===e.id),n=s&&t.beds.find(d=>d.id===s.bed_id);if(!s||!n)return;let a=this.bedPlantings(n.id,t).filter(d=>d.season===s.season).map(d=>({x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm})),i=He(n,{w:s.width_cm,h:s.length_cm},a,this.snapshot.settings.snap_cm)??{x:s.x_cm,y:s.y_cm},l={...I(s),id:ge("pl"),x_cm:i.x,y_cm:i.y,succession_group:null,succession_index:0,status:"planned",sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null};t.plantings.push(l),this.selection={kind:"planting",id:l.id},this.commit(t,void 0,[n.id])}nudge(e,t,s=!1){let n=this.selection;if(!n||!this.admin||this.locked(n.kind))return;let a=I(this.draft),i=[];if(n.kind==="planting"){let l=a.plantings.find(v=>v.id===n.id),d=a.beds.find(v=>v.id===l.bed_id),p=s?{x:l.x_cm,y:l.y_cm,w:Math.max(5,l.width_cm+e),h:Math.max(5,l.length_cm+t)}:{x:l.x_cm+e,y:l.y_cm+t,w:l.width_cm,h:l.length_cm},m=_e(p,{x:0,y:0,w:d.width_cm,h:d.length_cm});Object.assign(l,{x_cm:m.x,y_cm:m.y,width_cm:m.w,length_cm:m.h}),i.push(d.id)}else{let l=(n.kind==="bed"?a.beds:a.zones).find(d=>d.id===n.id);if(s)l.width_cm=Math.max(10,l.width_cm+e),l.length_cm=Math.max(10,l.length_cm+t);else if(l.x_cm+=e,l.y_cm+=t,n.kind==="zone")for(let d of a.beds.filter(p=>p.zone_id===n.id))d.x_cm+=e,d.y_cm+=t;n.kind==="bed"&&i.push(n.id)}this.commit(a,void 0,i)}newPlanting(e,t,s){return{id:ge("pl"),plant_id:e.id,bed_id:t.id,season:this.season,layout:this.layoutMode,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,count:null,method:$s(e),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:""}}addToSelectedBed(e){if(!this.admin)return;let t=I(this.draft),s=this.selection?.kind==="bed"?this.selection.id:this.selection?.kind==="planting"?t.plantings.find(p=>p.id===this.selection.id)?.bed_id:void 0,n=t.beds.find(p=>p.id===s)??t.beds[0];if(!n)return;let a=mt(e,this.layoutMode,n),i=this.bedPlantings(n.id,t).filter(p=>p.season===this.season).map(p=>({x:p.x_cm,y:p.y_cm,w:p.width_cm,h:p.length_cm})),l=He(n,a,i,this.snapshot.settings.snap_cm)??{x:0,y:0},d=this.newPlanting(e,n,{...l,...a});t.plantings.push(d),this.selection={kind:"planting",id:d.id},this.commit(t,this.t("planner.placed",{plant:y(e,this.lang),bed:n.name}),[n.id]),this.canvas?.focusCanvas()}addBed(){let e=I(this.draft),t=this.selection?.kind==="zone"&&e.zones.find(l=>l.id===this.selection.id)||e.zones.find(l=>l.type==="outdoor")||e.zones[0];if(!t)return this.addZone();let s={w:120,h:80},n=e.beds.filter(l=>l.zone_id===t.id).map(l=>({x:l.x_cm-t.x_cm-20,y:l.y_cm-t.y_cm-20,w:l.width_cm+40,h:l.length_cm+40})),a=He({...e.beds[0],width_cm:t.width_cm,length_cm:t.length_cm},s,n,10)??{x:20,y:20},i={id:ge("bed"),name:`${this.t("planner.new_bed")} ${e.beds.length+1}`,zone_id:t.id,kind:"raised",x_cm:t.x_cm+a.x,y_cm:t.y_cm+a.y,width_cm:s.w,length_cm:s.h,orientation_deg:0,soil:"loam",shade_pct:null,sensors:Bt(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""};e.beds.push(i),this.selection={kind:"bed",id:i.id},this.commit(e,this.t("planner.placed",{plant:i.name,bed:t.name}),[i.id])}addZone(){let e=I(this.draft),t=Nt(e.zones,e.beds),s={id:ge("zone"),name:`${this.t("planner.new_zone")} ${e.zones.length+1}`,type:"outdoor",x_cm:e.zones.length?t.x+t.w+100:0,y_cm:e.zones.length?t.y:0,width_cm:400,length_cm:300,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:Bt(),vent_entity:null};e.zones.push(s),this.selection={kind:"zone",id:s.id},this.commit(e),requestAnimationFrame(()=>this.canvas?.fit())}onPalettePointerDown(e,t){!this.admin||e.pointerType==="mouse"&&e.button!==0||(e.currentTarget.setPointerCapture(e.pointerId),this.paletteDrag={plant:t,pointerId:e.pointerId,bedId:null,rect:null},this.ghostReport=null)}onPalettePointerMove(e){let t=this.paletteDrag;if(!t||t.pointerId!==e.pointerId)return;let s=this.canvas.clientToCanvas(e.clientX,e.clientY);if(!s){this.paletteDrag={...t,bedId:null,rect:null};return}let n=kn(this.draft.beds,s.x,s.y);if(!n){let p={w:t.plant.spacing_cm,h:t.plant.spacing_cm};this.paletteDrag={...t,bedId:null,rect:{x:s.x-p.w/2,y:s.y-p.h/2,...p}};return}let a=mt(t.plant,this.layoutMode,n),i=this.snapOn?this.snapshot.settings.snap_cm:1,l={x:K(s.x-n.x_cm-a.w/2,i),y:K(s.y-n.y_cm-a.h/2,i),...a};this.layoutMode==="row"&&(l=n.width_cm>=n.length_cm?{...l,x:0}:{...l,y:0}),l=_e(l,{x:0,y:0,w:n.width_cm,h:n.length_cm}),this.paletteDrag={...t,bedId:n.id,rect:{...l,x:l.x+n.x_cm,y:l.y+n.y_cm}};let d=performance.now();if(d-this.ghostCheckAt>220){this.ghostCheckAt=d;let p=this.newPlanting(t.plant,n,l);p.id="__ghost__",this.api.checkBed(n,[...this.bedPlantings(n.id),p]).then(m=>{this.paletteDrag&&(this.ghostReport=m)}).catch(()=>{})}}onPalettePointerUp(e){let t=this.paletteDrag;if(!t||t.pointerId!==e.pointerId)return;if(this.paletteDrag=null,this.ghostReport=null,!t.bedId||!t.rect){t.rect&&this.announce(this.t("planner.no_bed_here"));return}let s=I(this.draft),n=s.beds.find(i=>i.id===t.bedId),a=this.newPlanting(t.plant,n,{...t.rect,x:t.rect.x-n.x_cm,y:t.rect.y-n.y_cm});s.plantings.push(a),this.selection={kind:"planting",id:a.id},this.commit(s,this.t("planner.placed",{plant:y(t.plant,this.lang),bed:n.name}),[n.id]),this.dropWarning=null,this.checkDrop(a)}ghostLabel(){let e=this.paletteDrag,t=y(e.plant,this.lang);if(!e.bedId)return t;let s=(this.ghostReport?.pairs??[]).filter(l=>l.a==="__ghost__"||l.b==="__ghost__"),n=s.filter(l=>l.kind==="enemy"||l.kind==="overlap").length,a=s.filter(l=>l.kind==="friend").length,i=(this.ghostReport?.rotation??[]).some(l=>l.planting==="__ghost__");return`${t}${a?` \xB7 \u2665 ${a}`:""}${n?` \xB7 \u26A0 ${n}`:""}${i?" \xB7 \u27F2":""}`}onKeyDown(e){let t=e.composedPath()[0];if(["INPUT","SELECT","TEXTAREA"].includes(t?.tagName))return;let s=e.ctrlKey||e.metaKey,n=(this.snapOn?this.snapshot.settings.snap_cm:1)*(e.shiftKey?10:1),a=e.key,i=()=>{e.preventDefault(),e.stopPropagation()};if(s&&a.toLowerCase()==="z"&&!e.shiftKey)return this.undo(),i();if(s&&a.toLowerCase()==="y"||s&&e.shiftKey&&a.toLowerCase()==="z")return this.redo(),i();if(s&&a.toLowerCase()==="d")return this.duplicateSelected(),i();if(s)return;let l={ArrowLeft:[-n,0],ArrowRight:[n,0],ArrowUp:[0,-n],ArrowDown:[0,n]};if(l[a]&&this.selection)return this.nudge(...l[a],e.altKey),i();switch(a){case"Delete":case"Backspace":return this.removeSelected(),i();case"Escape":return this.selection=null,this.multi=[],this.paletteDrag=null,this.dialog=null,i();case"g":return this.snapOn=!this.snapOn,i();case"c":return this.showCompanions=!this.showCompanions,i();case"m":return this.showMoisture=!this.showMoisture,i();case"t":return this.showTemperature=!this.showTemperature,i();case"+":case"=":return this.canvas.zoom(1.2),i();case"-":return this.canvas.zoom(1/1.2),i();case"0":return this.canvas.fit(),i();case"?":return this.dialog="shortcuts",i();case"]":case"[":return this.cycleSelection(a==="]"?1:-1),i();default:}}cycleSelection(e){let t=[...this.draft.beds.map(i=>({kind:"bed",id:i.id})),...this.seasonPlantings.map(i=>({kind:"planting",id:i.id}))];if(!t.length)return;let s=this.selection?t.findIndex(i=>i.id===this.selection.id):-1;this.selection=t[(s+e+t.length)%t.length];let n=this.findItem(this.selection),a=this.selection.kind==="planting"?y(this.plantMap.get(n.plant_id),this.lang):n.name;this.announce(a)}announce(e){this.announcement="",requestAnimationFrame(()=>this.announcement=e)}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async exportPlan(e){let{filename:t,content:s}=await this.api.exportPlan(e);Ge(t,s,e==="json"?"application/json":"application/yaml")}async importPlan(e){e.preventDefault();let t=e.target,s=t.elements.namedItem("file").files?.[0],n=t.elements.namedItem("mode").value;if(s)try{let a=await this.api.importPlan(await s.text(),n);this.history=null,this.saveState="saved",this.dialog=null,this.toast(this.t("planner.imported",{beds:a.counts.beds,plantings:a.counts.plantings}))}catch(a){this.toast(this.t("common.error",{message:a.message??String(a)}))}}async createSuccession(e){e.preventDefault();let t=this.selection,s=t?.kind==="planting"?this.draft.plantings.find(m=>m.id===t.id):void 0;if(!s)return;let n=e.target,a=Number(n.elements.namedItem("count").value),i=Number(n.elements.namedItem("interval").value)||null,l=n.elements.namedItem("placement").value,d=await this.api.succession(s,a,i,l),p=I(this.draft);p.plantings=p.plantings.filter(m=>m.id!==s.id).concat(d.plantings),this.dialog=null,this.commit(p,void 0,[s.bed_id]),d.dropped&&this.toast(this.t("planner.succession_dropped",{n:d.dropped}))}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal()}render(){if(!this.history)return o`<p class="empty">${this.t("common.loading")}</p>`;if(!this.hasLayout&&!this.draft.zones.length)return o`${this.renderStepper()}${this.renderToolbar()}${this.renderNoLayout()}${this.renderDialog()}`;let e=this.mode==="plant",t=this.paletteDrag,s=t?.rect?{rect:t.rect,valid:!!t.bedId,color:z(this.families,t.plant.family),label:this.ghostLabel()}:null;return o`
      ${this.renderStepper()}
      ${this.renderToolbar()}
      <div class="layout ${this.narrow?"narrow":""} ${this.paletteOpen||this.narrow?"":"palette-closed"}" @keydown=${this.onKeyDown}>
        ${this.paletteOpen||this.narrow?e?this.renderPalette():this.step==="zones"?this.renderZonesPane():this.renderSitePane():o`<div></div>`}
        <div class="center">
          ${this.renderLateBanner()}
          ${this.renderDropWarning()}
          <hl-garden-canvas
            .zones=${this.draft.zones}
            .beds=${this.draft.beds}
            .plantings=${e?this.seasonPlantings:[]}
            .features=${this.draft.features}
            .multi=${this.multi}
            .showFeatures=${this.showFeatures}
            .showPlantings=${e&&this.showPlantings}
            .showZones=${this.showZones}
            .plants=${this.plantMap}
            .families=${this.families}
            .selection=${this.selection}
            .ghost=${s}
            .reports=${this.reports}
            .timelines=${this.timelines}
            .analysis=${this.snapshot.analysis}
            .t=${this.t}
            .lang=${this.lang}
            .snapStep=${this.snapshot.settings.snap_cm}
            .snapOn=${this.snapOn}
            .showCompanions=${e&&this.showCompanions}
            .showMoisture=${e&&this.showMoisture}
            .showTemperature=${e&&this.showTemperature}
            .lockLayout=${e}
            .viewDate=${this.viewDate}
            .readonly=${!this.admin}
            .focusZone=${this.focusZone}
            .drawTool=${this.tool?this.toolInfo(this.tool):null}
            @select=${n=>this.onSelect(n.detail)}
            @item-click=${n=>{this.onSelect(n.detail),this.popupOpen=!0}}
            @item-change=${this.onItemChange}
            @draw-rect=${this.onDrawRect}
            @zone-open=${n=>this.openZone(n.detail)}
          ></hl-garden-canvas>
          ${this.tool?o`<div class="draw-hint" role="status"><ha-icon icon="mdi:vector-rectangle"></ha-icon>
            ${this.t("planner.draw_hint",{what:this.toolInfo(this.tool).label})}
            <button class="btn small ghost" @click=${()=>this.tool=null}>${this.t("common.done")}</button></div>`:u}
          ${t?o`<div class="drag-ghost-hint" role="status">${s?s.label:y(t.plant,this.lang)}</div>`:u}
        </div>
      </div>
      <div class="visually-hidden" role="status" aria-live="polite">${this.announcement}</div>
      ${this.popupOpen&&this.selection&&!this.dialog&&!this.removing&&this.findItem(this.selection)?o`<hl-modal heading=${this.t("planner.inspector")} size="narrow" closeLabel=${this.t("common.close")}
            @closed=${()=>{this.popupOpen=!1,this.why=null}}>${this.renderInspector()}</hl-modal>`:u}
      ${this.renderDialog()}
    `}renderToolbar(){let e=this.mode==="plant",t=[this.season-1,this.season,this.season+1],s={saved:"common.saved",dirty:"common.unsaved",saving:"common.saving",error:"common.unsaved"}[this.saveState],n=(a,i,l,d,p=!1)=>o`
      <button class="icon-btn" title=${i} aria-label=${i} aria-pressed=${d===void 0?u:String(d)} ?disabled=${p} @click=${l}>
        <ha-icon icon=${a}></ha-icon>
      </button>`;return o`
      <div class="toolbar" role="toolbar" aria-label=${this.t("nav.planner")}>
        ${n("mdi:dock-left",this.t("planner.palette"),()=>this.paletteOpen=!this.paletteOpen,this.paletteOpen)}
        <label class="row small"><span class="visually-hidden">${this.t("planner.season")}</span>
          <select aria-label=${this.t("planner.season")} @change=${a=>this.setSeason(Number(a.target.value))}>
            ${t.map(a=>o`<option value=${a} ?selected=${a===this.season}>${this.t("common.season",{year:a})}${xe(this.snapshot,a)?a===this.snapshot.layout_season?` \xB7 ${this.t("layout.current")}`:"":` \xB7 ${this.t("layout.no_plan")}`}</option>`)}
          </select>
        </label>
        <span class="sep"></span>
        ${n("mdi:undo",`${this.t("planner.undo")} (Ctrl+Z)`,()=>this.undo(),void 0,!this.history?.canUndo||!this.admin)}
        ${n("mdi:redo",`${this.t("planner.redo")} (Ctrl+Y)`,()=>this.redo(),void 0,!this.history?.canRedo||!this.admin)}
        <span class="sep"></span>
        ${n("mdi:grid",`${this.t("planner.snap")} (G)`,()=>this.snapOn=!this.snapOn,this.snapOn)}
        ${e?o`
          ${n("mdi:handshake-outline",`${this.t("planner.overlay_companions")} (C)`,()=>this.showCompanions=!this.showCompanions,this.showCompanions)}
          ${n("mdi:water-percent",`${this.t("planner.overlay_moisture")} (M)`,()=>this.showMoisture=!this.showMoisture,this.showMoisture)}
          ${n("mdi:thermometer",`${this.t("planner.overlay_temperature")} (T)`,()=>this.showTemperature=!this.showTemperature,this.showTemperature)}`:u}
        <span class="sep"></span>
        ${n("mdi:texture-box",this.t("planner.layer_zones"),()=>this.showZones=!this.showZones,this.showZones)}
        ${n("mdi:map-marker-path",this.t("planner.layer_features"),()=>this.showFeatures=!this.showFeatures,this.showFeatures)}
        ${e?n("mdi:sprout",this.t("planner.layer_plantings"),()=>this.showPlantings=!this.showPlantings,this.showPlantings):u}
        ${this.multi.length>1?o`<span class="sep"></span>
          ${n("mdi:align-horizontal-left",this.t("planner.align.left"),()=>this.align("left"))}
          ${n("mdi:align-horizontal-center",this.t("planner.align.hcenter"),()=>this.align("hcenter"))}
          ${n("mdi:align-horizontal-right",this.t("planner.align.right"),()=>this.align("right"))}
          ${n("mdi:align-vertical-top",this.t("planner.align.top"),()=>this.align("top"))}
          ${n("mdi:align-vertical-center",this.t("planner.align.vcenter"),()=>this.align("vcenter"))}
          ${n("mdi:align-vertical-bottom",this.t("planner.align.bottom"),()=>this.align("bottom"))}
          ${n("mdi:distribute-horizontal-center",this.t("planner.align.hdistribute"),()=>this.align("hdistribute"),void 0,this.multi.length<3)}
          ${n("mdi:distribute-vertical-center",this.t("planner.align.vdistribute"),()=>this.align("vdistribute"),void 0,this.multi.length<3)}`:u}
        <span class="sep"></span>
        ${n("mdi:magnify-plus-outline",this.t("planner.zoom_in"),()=>this.canvas.zoom(1.2))}
        ${n("mdi:magnify-minus-outline",this.t("planner.zoom_out"),()=>this.canvas.zoom(1/1.2))}
        ${n("mdi:fit-to-screen-outline",this.t("planner.fit"),()=>this.canvas.fit())}
        <span class="sep"></span>
        ${e?o`<label class="row small">${this.t("planner.view_date")}
          <hl-date-input .value=${this.viewDate} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}
            @date-change=${a=>this.viewDate=a.detail??this.snapshot.analysis?.today??""}></hl-date-input>
        </label>`:u}
        <span class="spacer"></span>
        <span class="save-state ${this.saveState==="error"?"error":""}" role="status">
          <ha-icon icon=${this.saveState==="saved"?"mdi:cloud-check-outline":"mdi:cloud-upload-outline"}></ha-icon>${this.t(s)}
        </span>
        ${this.admin&&e&&this.hasLayout?o`
          <button class="btn small primary" @click=${()=>this.openAutofill()}><ha-icon icon="mdi:auto-fix"></ha-icon>${this.t("autofill.title")}</button>`:u}
        ${this.admin&&!e&&this.hasLayout?o`
          <button class="btn small" @click=${()=>this.addBed()}><ha-icon icon="mdi:plus"></ha-icon>${this.t("planner.add_bed")}</button>`:u}
        ${e?u:o`<button class="btn small" @click=${()=>this.dialog="plans"}><ha-icon icon="mdi:file-tree-outline"></ha-icon>${this.t("plans.button")}
          ${this.snapshot.archived_plans?.length?o`<span class="chip">${this.snapshot.archived_plans.length}</span>`:u}</button>`}
        <button class="btn small" @click=${()=>this.go(e?"layout":"planner")}>
          <ha-icon icon=${e?"mdi:floor-plan":"mdi:sprout"}></ha-icon>${this.t(e?"layout.edit":"layout.to_planner")}</button>
        <button class="btn small ${this.snapshot.transition_due?"primary":""}" @click=${()=>this.dialog="transition"}>
          <ha-icon icon="mdi:calendar-arrow-right"></ha-icon>${this.t("year.button")}</button>
        <details class="more">
          <summary class="icon-btn" title=${this.t("planner.more")} aria-label=${this.t("planner.more")}><ha-icon icon="mdi:dots-vertical"></ha-icon></summary>
          <div class="menu" role="menu">
            <button role="menuitem" @click=${()=>this.exportPlan("json")}><ha-icon icon="mdi:file-export-outline"></ha-icon>${this.t("planner.export_json")}</button>
            <button role="menuitem" @click=${()=>this.exportPlan("yaml")}><ha-icon icon="mdi:code-braces"></ha-icon>${this.t("planner.export_yaml")}</button>
            ${this.admin?o`<button role="menuitem" @click=${()=>this.dialog="import"}><ha-icon icon="mdi:file-import-outline"></ha-icon>${this.t("planner.import")}</button>`:u}
            <button role="menuitem" @click=${()=>this.dialog="shortcuts"}><ha-icon icon="mdi:keyboard-outline"></ha-icon>${this.t("planner.shortcuts")} (?)</button>
          </div>
        </details>
      </div>
      ${this.admin?u:o`<p class="readonly-note">${this.t("common.admin_only")}</p>`}
    `}renderStepper(){if(this.mode==="plant"){let s=this.draft.zones.find(n=>n.id===this.focusZone);return o`<nav class="stepper" aria-label=${this.t("nav.planner")}>
        <span class="step active"><ha-icon icon="mdi:sprout"></ha-icon>
          <span class="txt"><b>${this.t("planner.step.plant")} · ${this.t("common.season",{year:this.season})}</b>
          <span class="xs muted">${this.t("layout.planting_on",{season:this.season})}</span></span></span>
        <span class="spacer"></span>
        <span class="crumbs" aria-label=${this.t("planner.zone_map")}>
          <button class="chip ${s?"":"ok"}" @click=${()=>this.closeZone()}><ha-icon icon="mdi:home-outline"></ha-icon>${this.t("planner.whole_garden")}</button>
          ${s?o`<span aria-hidden="true">›</span><span class="chip ok">${ae[s.type]?.icon??""} ${s.name}</span>`:u}
        </span>
      </nav>`}let e=[["site","mdi:vector-square","planner.step.site"],["zones","mdi:texture-box","planner.step.zones"]],t=this.draft.zones.find(s=>s.id===this.focusZone);return o`<nav class="stepper" aria-label=${this.t("planner.steps")}>
      ${e.map(([s,n,a],i)=>o`
        <button class="step ${this.step===s?"active":""}" aria-current=${this.step===s?"step":u}
          @click=${()=>{this.step=s,this.tool=null}}>
          <span class="num">${i+1}</span><ha-icon icon=${n}></ha-icon>
          <span class="txt"><b>${this.t(a)}</b><span class="xs muted">${this.t(`${a}.hint`)}</span></span>
        </button>${i<e.length-1?o`<span class="step-sep" aria-hidden="true">›</span>`:u}`)}
      <span class="spacer"></span>
      <span class="crumbs" aria-label=${this.t("planner.zone_map")}>
        <button class="chip ${t?"":"ok"}" @click=${()=>this.closeZone()}><ha-icon icon="mdi:home-outline"></ha-icon>${this.t("planner.whole_garden")}</button>
        ${t?o`<span aria-hidden="true">›</span><span class="chip ok">${ae[t.type]?.icon??""} ${t.name}</span>`:u}
      </span>
    </nav>`}renderToolButton(e,t,s,n=""){let a=this.tool&&this.tool.kind===e.kind&&("type"in e?this.tool.type===e.type:this.tool.bedKind===e.bedKind);return o`<button class="tool ${a?"active":""}" aria-pressed=${String(!!a)} title=${n||s} ?disabled=${!this.admin}
      @click=${()=>this.tool=a?null:e}>
      <span class="tool-icon">${t}</span><span class="tool-label">${s}</span></button>`}renderFeatureGroups(){return o`${zn.map(([e,t])=>o`
      <h4>${this.t(`planner.elements.${e}`)}</h4>
      <div class="tool-grid">
        ${t.map(s=>this.renderToolButton({kind:"feature",type:s},Ie[s]?.icon||"\u25AD",this.t(`feature.${s}`)))}
      </div>`)}`}renderSitePane(){return o`<aside class="pane" aria-label=${this.t("planner.step.site")}>
      <header><h3>${this.t("planner.step.site")}</h3><hl-info term="zones" .t=${this.t}></hl-info></header>
      <div class="pane-body stack">
        <p class="small muted">${this.t("planner.site_intro")}</p>
        <h4>${this.t("planner.zones")}</h4>
        <div class="tool-grid">
          ${ys.map(e=>this.renderToolButton({kind:"zone",type:e},ae[e].icon,this.t(`settings.zone_type.${e}`),this.t(`zone_hint.${e}`)))}
        </div>
        ${this.renderFeatureGroups()}
        <div class="divider"></div>
        <h4>${this.t("planner.your_zones")} (${this.draft.zones.length})</h4>
        ${this.draft.zones.length?o`<div class="stack" style="gap:6px">${this.draft.zones.map(e=>o`
          <div class="zone-row"><span>${ae[e.type]?.icon}</span>
            <span class="grow"><b>${e.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${e.type}`)} · ${(e.width_cm/100).toFixed(1)} × ${(e.length_cm/100).toFixed(1)} m</span></span>
            <button class="btn small ghost" @click=${()=>this.openZone(e.id)}>${this.t("planner.open_zone")}</button></div>`)}</div>`:o`<p class="xs muted">${this.t("planner.no_zones")}</p>`}
        ${this.draft.zones.length?o`<button class="btn primary" @click=${()=>{this.step="zones",this.tool=null}}>${this.t("planner.next")}: ${this.t("planner.step.zones")} ›</button>`:u}
      </div>
    </aside>`}renderZonesPane(){let e=this.draft.zones.find(n=>n.id===this.focusZone);if(!e)return o`<aside class="pane" aria-label=${this.t("planner.step.zones")}>
        <header><h3>${this.t("planner.step.zones")}</h3></header>
        <div class="pane-body stack">
          <p class="small muted">${this.t("planner.zones_intro")}</p>
          ${this.draft.zones.map(n=>{let a=this.draft.beds.filter(l=>l.zone_id===n.id),i=this.seasonPlantings.filter(l=>a.some(d=>d.id===l.bed_id)).length;return o`<button class="zone-card" style=${`border-left-color:${ae[n.type]?.stroke}`} @click=${()=>this.openZone(n.id)}>
              <span class="big">${ae[n.type]?.icon}</span>
              <span class="grow"><b>${n.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${n.type}`)} ·
                ${this.t("planner.n_beds",{n:a.length})} · ${this.t("planner.count",{n:i})}</span></span>
              <ha-icon icon="mdi:chevron-right"></ha-icon></button>`})}
          ${this.draft.zones.length?u:o`<button class="btn" @click=${()=>this.step="site"}>‹ ${this.t("planner.step.site")}</button>`}
        </div>
      </aside>`;let t=this.draft.beds.filter(n=>n.zone_id===e.id),s=!this.admin;return o`<aside class="pane" aria-label=${e.name}>
      <header><button class="icon-btn" aria-label=${this.t("planner.whole_garden")} @click=${()=>this.closeZone()}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <h3>${ae[e.type]?.icon} ${e.name}</h3></header>
      <div class="pane-body stack">
        <label class="field">${this.t("planner.zone_name")}<input .value=${e.name} ?disabled=${s}
          @change=${n=>this.updateZone(e.id,{name:n.target.value})} /></label>
        <label class="field">${this.t("planner.kind")}
          <select ?disabled=${s} @change=${n=>this.updateZone(e.id,{type:n.target.value})}>
            ${ys.map(n=>o`<option value=${n} ?selected=${e.type===n}>${this.t(`settings.zone_type.${n}`)}</option>`)}
          </select></label>
        <p class="xs muted">${this.t(`zone_hint.${e.type}`)}</p>
        <h4>${this.t("planner.beds_in_zone")} (${t.length})</h4>
        <div class="tool-grid">
          ${this.renderToolButton({kind:"bed"},"\u25AD",this.t("planner.draw_bed"))}
          ${this.renderToolButton({kind:"bed",bedKind:"container"},"\u{1FAB4}",this.t("planner.draw_planter"),this.t("planner.draw_planter_hint"))}
        </div>
        <details class="elements">
          <summary class="small"><b>${this.t("planner.elements_in_zone")}</b></summary>
          ${this.renderFeatureGroups()}
        </details>
        <div class="stack" style="gap:4px">${t.map(n=>o`<button class="zone-row as-btn" @click=${()=>this.onSelect({kind:"bed",id:n.id})}>
          <span>▭</span><span class="grow"><b>${n.name}</b> <span class="xs muted">${(n.width_cm/100).toFixed(1)} × ${(n.length_cm/100).toFixed(1)} m · ${this.t(`kind.${n.kind}`)}</span></span></button>`)}</div>
        <div class="divider"></div>
        <div class="row wrap">
          <button class="btn primary" @click=${()=>this.go("planner")}><ha-icon icon="mdi:sprout"></ha-icon>${this.t("layout.to_planner")}</button>
        </div>
      </div>
    </aside>`}go(e){this.dispatchEvent(new CustomEvent("navigate",{detail:e,bubbles:!0,composed:!0}))}updateZone(e,t){let s=I(this.draft),n=s.zones.find(a=>a.id===e);n&&(Object.assign(n,t),this.commit(s))}renderPalette(){let e=this.search.trim().toLowerCase(),t=this.draft.zones.find(i=>i.id===this.focusZone),s=t?on[t.type]:null,n=this.plants.filter(i=>s&&!this.categoryFilter&&!s.includes(i.category??"vegetable")||this.familyFilter&&i.family!==this.familyFilter||this.categoryFilter&&(i.category??"vegetable")!==this.categoryFilter?!1:e?[i.id,i.scientific_name,...Object.values(i.names)].some(l=>l.toLowerCase().includes(e)):!0).sort((i,l)=>y(i,this.lang).localeCompare(y(l,this.lang))),a=[...new Set(this.plants.map(i=>i.family))].sort();return o`
      <aside class="pane" aria-label=${this.t("planner.palette")}>
        <header>
          <h3>${this.t("planner.palette")}</h3>
          <span class="spacer"></span>
          <div class="segmented" role="group" aria-label=${this.t("planner.layout")}>
            ${["single","block","row"].map(i=>o`
              <button aria-pressed=${String(this.layoutMode===i)} @click=${()=>this.layoutMode=i}>${this.t(`planner.layout.${i}`)}</button>`)}
          </div>
        </header>
        <div class="pane-body stack">
          <input type="search" placeholder=${this.t("common.search")} aria-label=${this.t("common.search")} .value=${this.search}
            @input=${i=>this.search=i.target.value} />
          <div class="row wrap family-chips" role="group" aria-label=${this.t("lib.category")}>
            ${Ra.map(i=>o`<button class="chip" aria-pressed=${String(this.categoryFilter===i)}
              @click=${()=>this.categoryFilter=this.categoryFilter===i?"":i}>${this.t(`category.${i}`)}</button>`)}
          </div>
          <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
            <select @change=${i=>this.familyFilter=i.target.value}>
              <option value="" ?selected=${!this.familyFilter}>${this.t("lib.family")}: ${this.t("common.all")}</option>
              ${a.map(i=>o`<option value=${i} ?selected=${this.familyFilter===i}>${this.families[i]?.[this.lang]??i}</option>`)}
            </select></label>
          ${t?o`<p class="xs zone-filter">${ae[t.type]?.icon} ${this.t("planner.palette_for_zone",{zone:t.name})}</p>`:u}
          <p class="xs muted">${this.t("planner.palette_hint")}</p>
          <div class="palette-list" role="list">
            ${n.map(i=>{let l=y(i,this.lang);return o`
                <button class="plant-card" role="listitem" aria-label=${`${l}, ${i.scientific_name}`}
                  @pointerdown=${d=>this.onPalettePointerDown(d,i)}
                  @pointermove=${this.onPalettePointerMove}
                  @pointerup=${this.onPalettePointerUp}
                  @pointercancel=${()=>this.paletteDrag=null}
                  @keydown=${d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),this.addToSelectedBed(i))}}>
                  <span class="swatch" style=${`border-color:${z(this.families,i.family)}`}>${D(N(i),i.color||z(this.families,i.family),26)}</span>
                  <span class="meta"><span>${l}${i.perennial?o` <span class="perennial-tag" title=${this.t("planner.perennial")}>∞</span>`:u}</span>
                    <span class="xs muted">${i.spacing_cm} cm · ${i.perennial&&i.years_to_bearing?this.t("planner.bears_after",{n:i.years_to_bearing}):`${i.days_to_maturity[0]}\u2013${i.days_to_maturity[1]} d`}</span></span>
                </button>`})}
          </div>
          <div class="legend-block stack" style="gap:8px">
          <div class="divider"></div>
          <h4>${this.t("planner.legend")}</h4>
          <div class="legend">
            <span><span class="badge-demo" style="background:var(--hl-leaf-700)">∞</span>${this.t("planner.legend.perennial")}</span>
            <span><span class="badge-demo" style="background:var(--hl-tomato-500)">!</span>${this.t("planner.legend.warning")}</span>
            <span><span class="badge-demo" style="background:var(--hl-soil-700)">2</span>${this.t("planner.legend.succession")}</span>
            <span><span class="row-demo"></span>${this.t("planner.legend.rows")}</span>
          </div>
          <p class="xs muted">${this.t("planner.legend.border")}</p>
          <div class="legend">
            ${a.map(i=>o`<span><span class="family-dot" style=${`background:${z(this.families,i)}`}></span>${this.families[i]?.[this.lang]??i}</span>`)}
          </div>
          </div>
        </div>
      </aside>
    `}findingParams(e){let t={...e.params};for(let[s,n]of[[e.a,"a"],[e.b,"b"]]){let a=this.draft.plantings.find(i=>i.id===s);a&&a.season!==this.season&&!this.plantMap.get(a.plant_id)?.perennial&&typeof t[n]=="string"&&(t[n]=this.t("planner.other_season",{name:t[n],year:a.season}))}return t}renderFindings(e,t){let s=this.reports[e]??this.snapshot.analysis?.beds[e]?.compatibility,n=this.reports[e]?.rotation??this.snapshot.analysis?.beds[e]?.rotation??[],a=(s?.pairs??[]).filter(m=>!t||m.a===t||m.b===t),i=n.filter(m=>!t||m.planting===t),l=(s?.placement??[]).filter(m=>!t||m.planting===t),d=t?s?.out_of_bounds?.includes(t):(s?.out_of_bounds?.length??0)>0,p={error:"mdi:alert-octagon-outline",warning:"mdi:alert-outline",info:"mdi:heart-outline"};return!a.length&&!i.length&&!d&&!l.length?o`<p class="small muted">${this.t("planner.no_warnings")}</p>`:o`<div class="stack" style="gap:6px">
      ${a.map(m=>o`<div class="finding ${m.severity}"><ha-icon icon=${p[m.severity]}></ha-icon><span>${this.t(m.key,this.findingParams(m))}</span></div>`)}
      ${i.map(m=>o`<div class="finding ${m.severity}"><ha-icon icon="mdi:rotate-3d-variant"></ha-icon><span>${this.t(m.key,m.params)}
        <hl-info term="rotation" .t=${this.t}></hl-info>
        ${m.alternatives?.length?o`<br /><span class="xs">${this.t("planner.alternatives")}:
          ${m.alternatives.map(v=>o`<button class="chip" ?disabled=${!this.admin} @click=${()=>this.moveToBed(m.planting,v)}>${this.draft.beds.find(b=>b.id===v)?.name??v}</button>`)}</span>`:u}</span></div>`)}
      ${t&&s?.suggestions?.[t]?.length?o`<div class="finding info"><ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
        <span>${this.t("planner.better_neighbours")}: ${s.suggestions[t].map(m=>y(this.plantMap.get(m),this.lang)).join(", ")}</span></div>`:u}
      ${l.map(m=>o`<div class="finding warning"><ha-icon icon="mdi:greenhouse"></ha-icon><span>${this.t(m.key,m.params)}</span></div>`)}
      ${d?o`<div class="finding warning"><ha-icon icon="mdi:border-outside"></ha-icon><span>${this.t("planner.out_of_bounds")}</span></div>`:u}
    </div>`}renderTimeline(e){if(!e)return o`<p class="small muted">–</p>`;let s=this.snapshot.settings.region.hemisphere==="south"?`${this.season}-07-01`:`${this.season}-01-01`,n=485,a=p=>p?Math.max(0,Math.min(100,ye(s,p)/n*100)):null,i=(p,m,v,b,x)=>{let $=a(p),T=a(m);return $===null||T===null?u:o`<div class="bar" title=${`${x}: ${_(p,this.lang)} \u2013 ${_(m,this.lang)}`}
        style=${`left:${$}%;width:${Math.max(T-$,1)}%;top:${v}px;background:${b}`}></div>`},l=Array.from({length:16},(p,m)=>H(s,Math.round(m*30.4))),d=this.snapshot.analysis?.today;return o`
      <div class="timeline" role="img" aria-label=${`${this.t("lib.harvest")} ${_(e.harvest_start,this.lang)} \u2013 ${_(e.harvest_end,this.lang)}`}>
        ${i(e.sow_window?.start,e.sow_window?.end,6,"var(--hl-leaf-300)",this.t(e.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow"))}
        ${i(e.transplant_window?.start,e.transplant_window?.end,20,"var(--hl-leaf-600)",this.t("lib.transplant"))}
        ${i(e.in_ground,e.harvest_start,34,"color-mix(in srgb, var(--hl-leaf-500) 35%, transparent)",this.t("dash.active_crops",{n:1}))}
        ${i(e.harvest_start,e.harvest_end,34,"var(--hl-sun-500)",this.t("lib.harvest"))}
        ${l.filter((p,m)=>m%2===0).map(p=>o`<span class="month" style=${`left:${a(p)}%`}>${_(p,this.lang,{month:"short"})}</span>`)}
        ${d&&a(d)!==null?o`<div class="today" style=${`left:${a(d)}%`}></div>`:u}
      </div>
      <div class="xs muted" style="margin-top:4px">
        ${e.sow_date?o`${this.t(e.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}: <b>${_(e.sow_date,this.lang)}</b> · `:u}
        ${e.transplant_date?o`${this.t("lib.transplant")}: <b>${_(e.transplant_date,this.lang)}</b> · `:u}
        ${this.t("lib.harvest")}: <b>${_(e.harvest_start,this.lang)} – ${_(e.harvest_end,this.lang)}</b>
      </div>`}renderPhenology(e){let t=this.snapshot.analysis?.phenology?.[e];return!t||t.stage==="not_planted"?u:o`<div class="row wrap">
      <span class="chip ok"><ha-icon icon="mdi:sprout"></ha-icon>${this.t(`stage.${t.stage}`)}</span>
      <span class="chip">Kc ${t.kc.toFixed(2)} <hl-info term="kc" .t=${this.t}></hl-info></span>
      ${t.gdd!=null&&t.gdd_target?o`<span class="chip">${Math.round(t.gdd)} / ${t.gdd_target} GDD <hl-info term="gdd" .t=${this.t}></hl-info></span>`:u}
      ${t.harvest_estimate?o`<span class="chip warn"><ha-icon icon="mdi:basket-outline"></ha-icon>${this.t("cal.harvest_estimate",{date:_(t.harvest_estimate,this.lang)})}</span>`:u}
      ${t.heat_stress_days?o`<span class="chip bad">${this.t("planner.heat_stress",{n:t.heat_stress_days})}</span>`:u}
    </div>`}renderSkipped(e){if(!e.skipped.length)return u;let t=e.skipped.filter(n=>n.reason==="too_late").length,s=n=>{let a=this.plantMap.get(n);return a?D(N(a),a.color||z(this.families,a.family),22):u};return o`
      ${t>=Math.max(2,e.skipped.length/2)?o`<div class="finding warning"><ha-icon icon="mdi:calendar-alert"></ha-icon>
        <span>${this.t("autofill.mostly_late",{season:e.season,next:e.season+1,n:t})}
        <button class="btn small" @click=${()=>{this.autofillSeason=e.season+1,this.runAutofill()}}>${this.t("autofill.fill_next",{season:e.season+1})}</button></span></div>`:u}
      <details class="skipped" ?open=${e.skipped.length<=6}>
        <summary class="small"><b>${this.t("autofill.skipped")} (${e.skipped.length})</b> – ${this.t("autofill.skipped_why")}</summary>
        <ul class="why">${e.skipped.map(n=>{let a=n.beds&&Object.keys(n.beds).length?Tn(n.beds,this.t,this.lang,this.plantMap):[this.t(`reason.${n.reason}`)];return o`<li>${s(n.plant_id)}<span><b>${y(this.plantMap.get(n.plant_id),this.lang)}</b><br />
            <span class="xs">${a.slice(0,3).join(" \xB7 ")}</span></span></li>`})}</ul>
      </details>`}renderAutofill(){let e=this.autofillResources,t=l=>this.autofillResources={...e,...l},s=this.autofill,n=[...this.plants].sort((l,d)=>y(l,this.lang).localeCompare(y(d,this.lang))),a=()=>this.dialog=null,i=l=>this.draft.beds.find(d=>d.id===l)?.name??l;return o`<div class="stack">
      <h2><ha-icon icon="mdi:auto-fix"></ha-icon> ${this.t("autofill.title")} <hl-info term="autofill" .t=${this.t}></hl-info></h2>
      <label class="row small">${this.t("planner.season")}
        <select style="width:auto" @change=${l=>{this.autofillSeason=Number(l.target.value),this.autofill=null}}>
          ${[this.season,this.season+1].map(l=>o`<option value=${l} ?selected=${l===(this.autofillSeason||this.season)}>${this.t("common.season",{year:l})}${xe(this.snapshot,l)?"":` \xB7 ${this.t("layout.no_plan")}`}</option>`)}
        </select></label>
      <p class="small muted">${this.t("autofill.intro",{season:this.autofillSeason||this.season})}</p>
      <div class="form-grid">
        <label class="field">${this.t("autofill.household")}<input type="number" min="1" max="20" .value=${String(e.household_size)}
          @change=${l=>t({household_size:Number(l.target.value)})} /></label>
        <label class="field">${this.t("autofill.hours")}<input type="number" min="0" step="0.5" .value=${String(e.hours_per_week)}
          @change=${l=>t({hours_per_week:Number(l.target.value)})} /></label>
        <label class="field">${this.t("autofill.water")}<input type="number" min="0" step="10" placeholder="∞" .value=${String(e.water_liters_per_week??"")}
          @change=${l=>t({water_liters_per_week:l.target.value===""?null:Number(l.target.value)})} /></label>
        <label class="field">${this.t("autofill.compost")}<input type="number" min="0" step="5" placeholder="∞" .value=${String(e.compost_kg??"")}
          @change=${l=>t({compost_kg:l.target.value===""?null:Number(l.target.value)})} /></label>
        <label class="field full row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${e.irrigation}
          @change=${l=>t({irrigation:l.target.checked})} />${this.t("autofill.has_irrigation")}</label>
      </div>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.goals")}><span class="small">${this.t("autofill.goals")}:</span>
        ${ja.map(l=>o`<button class="chip" aria-pressed=${String(e.goals.includes(l))}
          @click=${()=>t({goals:e.goals.includes(l)?e.goals.filter(d=>d!==l):[...e.goals,l]})}>${this.t(`autofill.goal.${l}`)}</button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("autofill.wanted")}
          <select @change=${l=>{let d=l.target;d.value&&!e.wanted.includes(d.value)&&t({wanted:[...e.wanted,d.value]}),d.value=""}}>
            <option value="">+</option>${n.map(l=>o`<option value=${l.id}>${y(l,this.lang)}</option>`)}</select></label>
        <label class="field">${this.t("autofill.excluded")}
          <select @change=${l=>{let d=l.target;d.value&&!e.excluded.includes(d.value)&&t({excluded:[...e.excluded,d.value]}),d.value=""}}>
            <option value="">+</option>${n.map(l=>o`<option value=${l.id}>${y(l,this.lang)}</option>`)}</select></label>
      </div>
      <div class="row wrap">
        ${e.wanted.map(l=>o`<button class="chip ok" title=${this.t("common.delete")} @click=${()=>t({wanted:e.wanted.filter(d=>d!==l)})}>♥ ${y(this.plantMap.get(l),this.lang)} ✕</button>`)}
        ${e.excluded.map(l=>o`<button class="chip bad" title=${this.t("common.delete")} @click=${()=>t({excluded:e.excluded.filter(d=>d!==l)})}>⊘ ${y(this.plantMap.get(l),this.lang)} ✕</button>`)}
      </div>
      <fieldset class="prefs"><legend>${this.t("autofill.prefs")}</legend>
        <label class="field">${this.t("autofill.freedom")}
          <select @change=${l=>t({freedom:l.target.value})}>
            ${["strict","balanced","free"].map(l=>o`<option value=${l} ?selected=${(e.freedom??"balanced")===l}>${this.t(`autofill.freedom.${l}`)}</option>`)}
          </select></label>
        ${["respect_companions","add_pollinators","year_round","allow_perennials","match_zone_type"].map(l=>o`
          <label class="row small"><input type="checkbox" .checked=${e[l]??!["year_round"].includes(l)}
            @change=${d=>t({[l]:d.target.checked})} />${this.t(`autofill.pref.${l}`)}</label>`)}
      </fieldset>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.beds")}><span class="small">${this.t("autofill.beds")}:</span>
        ${this.draft.beds.map(l=>o`<button class="chip" aria-pressed=${String(this.autofillBeds.includes(l.id))}
          @click=${()=>this.autofillBeds=this.autofillBeds.includes(l.id)?this.autofillBeds.filter(d=>d!==l.id):[...this.autofillBeds,l.id]}>${l.name}</button>`)}
        <span class="xs muted">${this.autofillBeds.length?"":this.t("autofill.all_empty")}</span>
      </div>
      <label class="row small"><input type="checkbox" .checked=${this.autofillReplace} @change=${l=>this.autofillReplace=l.target.checked} />${this.t("autofill.replace")}</label>
      <div class="row"><button class="btn" ?disabled=${this.autofillBusy} @click=${()=>this.runAutofill()}><ha-icon icon="mdi:creation"></ha-icon>${this.t("autofill.propose")}</button></div>
      ${s?o`
        <div class="divider"></div>
        <div class="row wrap">
          <span class="chip ok">${this.t("autofill.sum_crops",{n:s.summary.crops})}</span>
          <span class="chip">${this.t("autofill.sum_yield",{kg:s.summary.yield_kg})}</span>
          <span class="chip">${this.t("autofill.sum_time",{min:s.summary.minutes_week})}</span>
          <span class="chip">${this.t("autofill.sum_water",{l:s.summary.water_l_week})}</span>
          <span class="chip">${this.t("autofill.sum_compost",{kg:s.summary.compost_kg})}</span>
        </div>
        ${s.warnings.map(l=>o`<div class="finding warning"><ha-icon icon="mdi:alert-outline"></ha-icon><span>${this.t(l.key,{...l.params,plants:Array.isArray(l.params.plants)?l.params.plants.map(d=>y(this.plantMap.get(d),this.lang)).join(", "):l.params.plants})}</span></div>`)}
        <div style="max-height:30vh;overflow:auto"><table class="shortcuts" style="width:100%">
          <tr><th align="left">${this.t("lib.plant")}</th><th align="left">${this.t("task.bed")}</th><th align="right">#</th><th align="right">m²</th><th align="right">kg</th></tr>
          ${s.placements.map(l=>o`<tr><td><span class="family-dot" style=${`background:${z(this.families,this.plantMap.get(l.plant_id)?.family)}`}></span>
            ${y(this.plantMap.get(l.plant_id),this.lang)}${l.sowings>1?o` <span class="xs muted">×${l.sowings}</span>`:u}</td>
            <td>${i(l.bed_id)}</td><td align="right">${l.count}</td><td align="right">${l.area_m2.toFixed(1)}</td><td align="right">${l.yield_kg.toFixed(1)}</td></tr>`)}
        </table></div>
        ${this.renderSkipped(s)}
      `:u}
      <div class="row" style="justify-content:flex-end">
        <button class="btn ghost" @click=${a}>${this.t("common.cancel")}</button>
        <button class="btn primary" ?disabled=${!s?.plantings.length} @click=${()=>this.applyAutofill()}>${this.t("autofill.apply")}</button>
      </div>
    </div>`}renderSoilTests(e){let t=[...this.snapshot.beds.find(a=>a.id===e)?.soil_tests??[]].reverse(),s=this.soilForm,n=(a,i,l=.1)=>o`<label class="field">${i}
      <input type="number" step=${l} min="0" .value=${s?.[a]==null?"":String(s[a])}
        @input=${d=>{let p=d.target.value;this.soilForm={...this.soilForm,[a]:p===""?null:Number(p)}}} /></label>`;return o`<details class="tips" ?open=${!!s}><summary><ha-icon icon="mdi:test-tube"></ha-icon> ${this.t("soil_test.title")}
        ${t[0]?o`<span class="xs muted">· ${_(t[0].date,this.lang)}${t[0].ph!=null?` \xB7 pH ${t[0].ph}`:""}</span>`:u}</summary>
      ${t.length?o`<table class="soil"><thead><tr><th>${this.t("journal.day")}</th><th>pH</th><th>OM%</th><th>P</th><th>K</th><th></th></tr></thead><tbody>
        ${t.map(a=>o`<tr><td>${_(a.date,this.lang)}</td><td>${a.ph??"\u2013"}</td><td>${a.organic_matter_pct??"\u2013"}</td><td>${a.p_mg??"\u2013"}</td><td>${a.k_mg??"\u2013"}</td>
          <td>${this.admin?o`<button class="icon-btn" aria-label=${this.t("planner.remove")} @click=${()=>this.deleteSoil(e,a.date)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`:u}</td></tr>`)}
      </tbody></table>`:o`<p class="xs muted">${this.t("soil_test.none")}</p>`}
      ${this.admin?s?o`<div class="form-grid">
          <label class="field">${this.t("journal.day")}<hl-date-input .value=${s.date??""} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}
            @date-change=${a=>this.soilForm={...s,date:a.detail??""}}></hl-date-input></label>
          ${n("ph","pH")} ${n("organic_matter_pct",this.t("soil_test.om"))} ${n("n_mg","N (mg/100 g)",1)}
          ${n("p_mg","P (mg/100 g)",1)} ${n("k_mg","K (mg/100 g)",1)} ${n("mg_mg","Mg (mg/100 g)",1)}
          <label class="field">${this.t("soil_test.lime")}<select @change=${a=>this.soilForm={...s,lime_status:a.target.value||null}}>
            ${["","low","ok","high"].map(a=>o`<option value=${a} ?selected=${(s.lime_status??"")===a}>${a?this.t(`soil_test.lime.${a}`):"\u2013"}</option>`)}</select></label>
          <label class="field full">${this.t("task.notes")}<input .value=${s.notes??""} @input=${a=>this.soilForm={...s,notes:a.target.value}} /></label>
        </div>
        <div class="row"><button class="btn small primary" ?disabled=${!s.date} @click=${()=>this.saveSoil(e)}>${this.t("common.save")}</button>
          <button class="btn small ghost" @click=${()=>this.soilForm=null}>${this.t("common.cancel")}</button></div>
        <p class="xs muted">${this.t("soil_test.hint")}</p>`:o`<button class="btn small" @click=${()=>this.soilForm={date:new Date().toISOString().slice(0,10)}}><ha-icon icon="mdi:plus"></ha-icon>${this.t("soil_test.add")}</button>`:u}
    </details>`}async saveSoil(e){if(this.soilForm?.date)try{await this.api.saveSoilTest(e,this.soilForm),this.soilForm=null,this.toast(this.t("settings.saved"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async deleteSoil(e,t){try{await this.api.deleteSoilTest(e,t)}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderHarvestQuick(e){let s=(this.snapshot.harvest_log??[]).filter(i=>i.planting_id===e.id).reduce((i,l)=>i+l.kg,0),n=(this.snapshot.journal??[]).filter(i=>i.planting_id===e.id).slice(-3).reverse(),a=this.snapshot.plantings.some(i=>i.id===e.id);return o`<div class="stack" style="gap:6px">
      <h4><ha-icon icon="mdi:basket-outline"></ha-icon> ${this.t("journal.harvest")}${s?o` · ${s.toFixed(2)} kg`:u}</h4>
      ${this.admin&&a?o`<div class="row">
        <input type="number" min="0" step="0.05" style="width:90px" placeholder="kg" aria-label="kg" .value=${this.harvestKg}
          @input=${i=>this.harvestKg=i.target.value} />
        <button class="btn small" ?disabled=${!(Number(this.harvestKg)>0)} @click=${()=>this.logHarvest(e)}>${this.t("journal.log_harvest")}</button>
      </div>`:u}
      ${n.length?o`<ul class="notes">${n.map(i=>o`<li class="xs"><b>${_(i.at.slice(0,10),this.lang)}</b> ${i.text}
        ${i.photos.length?o`<ha-icon icon="mdi:camera-outline"></ha-icon>`:u}</li>`)}</ul>`:u}
    </div>`}async logHarvest(e){let t=Number(this.harvestKg);if(t>0)try{await this.api.logHarvest({planting_id:e.id,kg:t}),this.harvestKg="",this.toast(this.t("journal.harvest_saved"))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderInspector(){let e=this.selection,t=e?this.findItem(e):void 0,s=!this.admin||this.locked(e?.kind),n;if(!e||!t)n=o`<p class="small muted">${this.t("planner.nothing_selected")}</p><p class="xs muted">${this.t("planner.multi_hint")}</p>`;else if(this.multi.length>1)n=o`<h3>${this.t("planner.selected_n",{n:this.multi.length})}</h3>
        <p class="small muted">${this.t("planner.multi_hint")}</p>
        <div class="row wrap">
          ${["left","hcenter","right","top","vcenter","bottom","hdistribute","vdistribute"].map(a=>o`
            <button class="btn small" ?disabled=${s||a.endsWith("distribute")&&this.multi.length<3} @click=${()=>this.align(a)}>${this.t(`planner.align.${a}`)}</button>`)}
        </div>
        ${!s&&(e.kind==="planting"||e.kind==="feature")?o`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`:u}`;else if(e.kind==="feature"){let a=t;n=o`<h3>${a.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${a.name} ?disabled=${s}
            @change=${i=>this.updateSelected({name:i.target.value})} /></label>
          <label class="field full">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${i=>this.updateSelected({type:i.target.value})}>
              ${Ta.map(i=>o`<option value=${i} ?selected=${a.type===i}>${this.t(`feature.${i}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(a.width_cm)} ?disabled=${s}
            @change=${i=>this.updateSelected({width_cm:Number(i.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(a.length_cm)} ?disabled=${s}
            @change=${i=>this.updateSelected({length_cm:Number(i.target.value)})} /></label>
          <label class="field full">${this.t("task.notes")}<textarea rows="2" .value=${a.notes} ?disabled=${s}
            @change=${i=>this.updateSelected({notes:i.target.value})}></textarea></label>
        </div>
        ${s?u:o`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}`}else if(e.kind==="planting"){let a=t,i=this.plantMap.get(a.plant_id),l=this.draft.beds.find(p=>p.id===a.bed_id),d=this.snapshot.analysis?.advice[a.id];n=o`
        <div class="row">
          ${i?o`<hl-plant-image .plant=${i} color=${z(this.families,i.family)} lang=${this.lang} size="thumb"></hl-plant-image>`:o`<span class="family-dot" style="width:14px;height:14px"></span>`}
          <h3>${y(i,this.lang)}</h3>
        </div>
        <p class="xs muted">${i?.scientific_name} · ${this.families[i?.family??""]?.[this.lang]??i?.family} · ${l?.name}</p>
        <div class="row wrap">
          <button class="btn small" @click=${()=>this.explainHere(a)}><ha-icon icon="mdi:help-circle-outline"></ha-icon>${this.t("planner.why_here")}</button>
          <button class="btn small ghost" @click=${()=>this.emit("focus-crop",{planting_id:a.id,season:this.season})}><ha-icon icon="mdi:table"></ha-icon>${this.t("planner.to_crops")}</button>
          <button class="btn small ghost" @click=${()=>this.emit("open-plant",a.plant_id)}><ha-icon icon="mdi:sprout"></ha-icon>${this.t("planner.plant_info")}</button>
        </div>
        ${this.why?.plantingId===a.id?this.renderWhy(a):u}
        ${i?.perennial?o`<div class="finding info"><ha-icon icon="mdi:all-inclusive"></ha-icon><span>${this.t("planner.perennial_since",{season:a.season})}
          ${i.years_to_bearing?o`<br />${this.t("planner.bearing_from",{season:a.season+i.years_to_bearing})}`:u}</span></div>`:u}
        ${i?.pollination&&i.pollination!=="self"?o`<p class="xs"><ha-icon icon="mdi:bee"></ha-icon> ${this.t(`pollination.${i.pollination}`)}</p>`:u}
        <div class="form-grid">
          <label class="field">${this.t("planner.layout")}
            <select ?disabled=${s} @change=${p=>this.updateSelected({layout:p.target.value})}>
              ${["single","block","row"].map(p=>o`<option value=${p} ?selected=${a.layout===p}>${this.t(`planner.layout.${p}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.status")}
            <select ?disabled=${s} @change=${p=>this.updateSelected({status:p.target.value})}>
              ${["planned","sown_indoors","sown","transplanted","harvesting","finished","failed"].map(p=>o`<option value=${p} ?selected=${a.status===p}>${this.t(`status.${p}`)}</option>`)}
            </select></label>
          <label class="field full">${this.t("planner.method")}
            <select ?disabled=${s} @change=${p=>this.updateSelected({method:p.target.value})}>
              ${["indoor_sow","direct_sow","transplant"].map(p=>o`<option value=${p} ?selected=${a.method===p}>${this.t(`planner.method.${p}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="5" step="5" .value=${String(Math.round(a.width_cm))} ?disabled=${s}
            @change=${p=>this.updateSelected({width_cm:Number(p.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="5" step="5" .value=${String(Math.round(a.length_cm))} ?disabled=${s}
            @change=${p=>this.updateSelected({length_cm:Number(p.target.value)})} /></label>
          <label class="field full">${this.t(a.method==="transplant"?"lib.transplant":a.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}
            <hl-date-input ?disabled=${s} .value=${(a.method==="transplant"?a.transplant_date:a.sow_date)??""} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}
              @date-change=${p=>this.updateSelected(a.method==="transplant"?{transplant_date:p.detail}:{sow_date:p.detail})}></hl-date-input></label>
        </div>
        <p class="small">${i?this.t("planner.count",{n:xn(a,i)}):""}</p>
        ${d?.reasons.length?o`<div class="stack" style="gap:4px">${d.reasons.filter(p=>p.key!=="reason.window_open").map(p=>o`<p class="small">${this.t(p.key,p.params)}</p>`)}</div>`:u}
        ${this.renderPhenology(a.id)}
        ${this.renderHarvestQuick(a)}
        <h4>${this.t("planner.timeline")}</h4>
        ${this.renderTimeline(this.timelines[a.id])}
        <h4>${this.t("planner.warnings")}</h4>
        ${this.renderFindings(a.bed_id,a.id)}
        ${i?.tips?.[this.lang]?.length||i?.tips?.en?.length?o`<details class="tips" open><summary>${this.t("planner.eco_tips")}</summary>
          <ul>${(i.tips[this.lang]??i.tips.en).map(p=>o`<li>${p}</li>`)}</ul></details>`:u}
        ${s?u:o`
          <div class="row wrap">
            <button class="btn small" @click=${()=>this.dialog="succession"}><ha-icon icon="mdi:calendar-multiple"></ha-icon>${this.t("planner.succession")}</button>
            <button class="btn small ghost" @click=${()=>this.duplicateSelected()}>${this.t("planner.duplicate")}</button>
            <button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>
          </div>`}
      `}else if(e.kind==="bed"){let a=t,i=this.snapshot.analysis?.beds[a.id],l=this.reports[a.id]??i?.compatibility;n=o`
        <h3>${a.name}</h3>
        ${this.mode==="plant"?this.renderBedHistory(a):u}
        ${this.mode==="plant"&&(a.irrigation_entity||a.sensors?.soil_moisture)?o`<details class="water"><summary class="small">${this.t("water.per_bed")}</summary>
          <hl-water-chart .bed=${a} .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} days="14"></hl-water-chart></details>`:u}
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${a.name} ?disabled=${s}
            @change=${d=>this.updateSelected({name:d.target.value})} /></label>
          <label class="field">${this.t("planner.zone")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({zone_id:d.target.value})}>
              ${this.draft.zones.map(d=>o`<option value=${d.id} ?selected=${a.zone_id===d.id}>${d.name}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({kind:d.target.value})}>
              ${["in_ground","raised","container"].map(d=>o`<option value=${d} ?selected=${a.kind===d}>${this.t(`kind.${d}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(a.width_cm)} ?disabled=${s}
            @change=${d=>this.updateSelected({width_cm:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(a.length_cm)} ?disabled=${s}
            @change=${d=>this.updateSelected({length_cm:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.soil")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({soil:d.target.value})}>
              ${["sandy","loam","clay","silt","peat","chalk","potting_mix"].map(d=>o`<option value=${d} ?selected=${a.soil===d}>${this.t(`soil.${d}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.orientation")}<input type="number" min="0" max="359" step="15" .value=${String(a.orientation_deg)} ?disabled=${s}
            @change=${d=>this.updateSelected({orientation_deg:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(a.shade_pct??"")} ?disabled=${s}
            @change=${d=>this.updateSelected({shade_pct:d.target.value===""?null:Number(d.target.value)})} /></label>
        </div>
        ${i?o`
          <div class="row wrap">
            <span class="chip ${i.moisture_status==="optimal"?"ok":i.moisture_status==="dry"?"bad":i.moisture_status==="unknown"?"":"warn"}">
              <ha-icon icon="mdi:water-percent"></ha-icon>${this.t(`moisture.${i.moisture_status}`)}${i.irrigation.moisture!=null?` \xB7 ${Math.round(i.irrigation.moisture)}%`:""}</span>
            <span class="chip">${this.t(`irrigation.${i.irrigation.action}`,{mm:i.irrigation.amount_mm,liters:Math.round(i.irrigation.liters)})}</span>
          </div>`:u}
        <div class="row"><span class="score">${Math.round(l?.score??50)}</span><span class="small muted">${this.t("planner.score")}</span></div>
        ${this.renderFindings(a.id)}
        ${this.renderSoilTests(a.id)}
        ${s?u:o`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}
      `}else{let a=t;n=o`
        <h3>${a.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${a.name} ?disabled=${s}
            @change=${i=>this.updateSelected({name:i.target.value})} /></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${i=>this.updateSelected({type:i.target.value})}>
              ${ys.map(i=>o`<option value=${i} ?selected=${a.type===i}>${this.t(`settings.zone_type.${i}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.wind")}
            <select ?disabled=${s} @change=${i=>this.updateSelected({wind:i.target.value},"microclimate")}>
              ${["sheltered","moderate","exposed"].map(i=>o`<option value=${i} ?selected=${a.microclimate.wind===i}>${this.t(`wind.${i}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="50" step="10" .value=${String(a.width_cm)} ?disabled=${s}
            @change=${i=>this.updateSelected({width_cm:Number(i.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="50" step="10" .value=${String(a.length_cm)} ?disabled=${s}
            @change=${i=>this.updateSelected({length_cm:Number(i.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(a.microclimate.shade_pct)} ?disabled=${s}
            @change=${i=>this.updateSelected({shade_pct:Number(i.target.value)},"microclimate")} /></label>
          <label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${a.microclimate.heated} ?disabled=${s}
            @change=${i=>this.updateSelected({heated:i.target.checked},"microclimate")} />${this.t("settings.heated")}</label>
          <label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${!!a.microclimate.wall_heat} ?disabled=${s}
            @change=${i=>this.updateSelected({wall_heat:i.target.checked},"microclimate")} />${this.t("settings.wall_heat")}
            <hl-info term="microclimate" .t=${this.t}></hl-info></label>
          ${a.type==="greenhouse"||a.type==="cold_frame"?o`<label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${!!a.microclimate.thermal_mass} ?disabled=${s}
            @change=${i=>this.updateSelected({thermal_mass:i.target.checked},"microclimate")} />${this.t("settings.thermal_mass")}</label>`:u}
        </div>
        <div class="row wrap">
          <button class="btn small" @click=${()=>this.openZone(a.id)}><ha-icon icon="mdi:map-search-outline"></ha-icon>${this.t("planner.open_zone")}</button>
          ${s?u:o`<button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>`}
        </div>
      `}return o`<div class="stack inspector-body">${n}</div>`}renderWhy(e){let t=this.why;if(t.error)return o`<p class="small bad-text">${t.error}</p>`;if(!t.result)return o`<p class="small muted">${this.t("common.loading")}</p>`;let s=t.result.beds.find(i=>i.bed_id===e.bed_id),n=t.result.beds.filter(i=>i.ok&&i.bed_id!==e.bed_id),a=i=>Ne(i,this.t,this.lang,this.plantMap);return o`<div class="why card-inset stack" style="gap:6px">
      ${s?o`<p class="small"><b>${s.ok?this.t("planner.why_ok",{bed:s.bed}):this.t("planner.why_not",{bed:s.bed})}</b></p>
        ${s.reasons.length?o`<ul class="small">${s.reasons.map(i=>o`<li>${a(i)}</li>`)}</ul>`:u}
        ${s.warnings.length?o`<ul class="small muted">${s.warnings.map(i=>o`<li>${a(i)}</li>`)}</ul>`:u}`:o`<p class="small">${this.t("planner.why_no_bed")}</p>`}
      <p class="xs muted">${n.length?this.t("planner.why_fits_in",{beds:n.map(i=>i.bed).join(", ")}):this.t("planner.why_fits_nowhere")}</p>
    </div>`}renderBedHistory(e){let t=Array.from({length:5},(a,i)=>this.season-4+i),s=a=>{let i=new Set;for(let l of this.snapshot.plantings){if(l.bed_id!==e.id||!$e(l,!1,a))continue;let d=this.plantMap.get(l.plant_id);d&&!d.perennial&&i.add(d.family)}for(let l of this.snapshot.rotation_history??[])l.bed_id===e.id&&l.season===a&&i.add(l.family);return[...i]},n=a=>this.families[a]?.[this.lang]??a;return o`<div class="rotation" role="table" aria-label=${this.t("planner.rotation_strip")}>
      <p class="xs muted">${this.t("planner.rotation_strip")}</p>
      <div class="rot-row">${t.map(a=>{let i=s(a);return o`<div class="rot-cell ${a===this.season?"now":""}" role="cell" title=${i.map(n).join(", ")||"\u2013"}>
          <b>${a}</b>
          <div class="rot-dots">${i.length?i.map(l=>o`<span class="family-dot" style=${`background:${z(this.families,l)}`}></span>`):o`<span class="xs muted">–</span>`}</div>
          <span class="xs">${i.map(n).join(", ")}</span>
        </div>`})}</div>
    </div>`}renderLateBanner(){let e=this.snapshot,t=e.analysis?.today,s=e.analysis?.anchors?.first_frost;if(this.mode!=="plant"||this.lateDismissed||!t||!s)return u;if(this.season!==e.analysis?.season||ye(t,s)>45)return u;if(this.stillPossibleFor!==this.season){this.stillPossibleFor=this.season;let a=this.season;this.api.stillPossible(a).then(i=>this.stillPossible=i).catch(()=>{})}let n=this.stillPossible?.season===this.season?this.stillPossible.plants:null;return o`<div class="late-banner" role="status">
      <ha-icon icon="mdi:weather-snowy"></ha-icon>
      <div class="stack" style="gap:6px;flex:1">
        <b>${this.t("planner.late_title",{season:this.season})}</b>
        <span class="small">${n==null?this.t("common.loading"):n.length?this.t("planner.late_still",{n:n.length}):this.t("planner.late_none")}</span>
        ${n?.length?o`<div class="row wrap" style="gap:4px">${n.slice(0,16).map(a=>{let i=this.plantMap.get(a.plant_id);return i?o`<button class="chip" title=${this.t("planner.late_add_hint")} @click=${()=>this.addToSelectedBed(i)}>
            ${D(N(i),i.color||z(this.families,i.family),16)}${y(i,this.lang)}</button>`:u})}</div>`:u}
      </div>
      <button class="btn small primary" @click=${()=>this.setSeason(this.season+1)}>${this.t("planner.late_next",{season:this.season+1})}</button>
      <button class="icon-btn" aria-label=${this.t("common.close")} @click=${()=>this.lateDismissed=!0}>×</button>
    </div>`}renderDropWarning(){let e=this.dropWarning,t=e&&this.draft.plantings.find(s=>s.id===e.plantingId);return!e||!t?u:o`<div class="drop-warning" role="alert">
      <ha-icon icon="mdi:alert-outline"></ha-icon>
      <div class="stack" style="gap:2px;flex:1"><b>${this.t("planner.drop_bad",{plant:y(this.plantMap.get(t.plant_id),this.lang)})}</b>
        ${e.text.map(s=>o`<span class="small">${s}</span>`)}</div>
      <button class="btn small" @click=${()=>{this.selection={kind:"planting",id:t.id},this.popupOpen=!0,this.explainHere(t)}}>${this.t("planner.why_here")}</button>
      <button class="icon-btn" aria-label=${this.t("common.close")} @click=${()=>this.dropWarning=null}>×</button>
    </div>`}renderNoLayout(){let e=this.snapshot,t=e.layout_season??this.season,s=[...new Set([this.season-1,t,this.season+1])].filter(a=>a!==this.season&&xe(e,a)),n=this.admin&&this.mode==="layout";return o`<section class="card stack no-layout" aria-live="polite">
      <h2><ha-icon icon="mdi:floor-plan"></ha-icon> ${this.t("layout.none_title",{season:this.season})}</h2>
      <p>${this.t(this.mode==="plant"?"layout.none_plant":"layout.none_intro",{season:this.season,live:t})}</p>
      <div class="row wrap">
        ${n?o`
          ${s.map(a=>o`<button class="btn primary" @click=${()=>this.startLayout(a)}><ha-icon icon="mdi:content-copy"></ha-icon>${this.t("layout.copy_from",{season:a})}</button>`)}
          <button class="btn" @click=${()=>this.startLayout(null)}><ha-icon icon="mdi:vector-square"></ha-icon>${this.t("layout.start_empty")}</button>`:o`<button class="btn primary" @click=${()=>this.go("layout")}><ha-icon icon="mdi:floor-plan"></ha-icon>${this.t("layout.make",{season:this.season})}</button>`}
        ${this.season===t+1?o`<button class="btn" @click=${()=>this.dialog="transition"}>
          <ha-icon icon="mdi:calendar-arrow-right"></ha-icon>${this.t("year.title",{from:t,to:this.season})}</button>`:u}
      </div>
      <p class="xs muted">${this.t("layout.none_hint")}</p>
    </section>`}renderPlans(e){let t=[...this.snapshot.archived_plans??[]].sort((i,l)=>l.season-i.season||(l.archived_at??"").localeCompare(i.archived_at??"")),s=[["empty","mdi:file-outline"],["zones","mdi:texture-box"],["zones_beds","mdi:view-grid-outline"]],n=async(i,l)=>{this.planBusy=!0;try{window.clearTimeout(this.saveTimer),this.saveState==="dirty"&&await this.save(),await i(),this.toast(l),this.saveState="saved",this.history=null,this.dialog=null}catch(d){this.toast(this.t("common.error",{message:d.message??String(d)}))}finally{this.planBusy=!1}},a=i=>{let l=i.elements.namedItem("old_name").value;confirm(this.t("plans.confirm_new",{season:this.season}))&&n(()=>this.api.newPlan(this.season,this.newPlanStart,l||void 0),this.t("plans.started",{season:this.season}))};return o`<div class="stack">
      <h2><ha-icon icon="mdi:file-tree-outline"></ha-icon> ${this.t("plans.title",{season:this.season})}</h2>
      <p class="small">${this.t("plans.intro")}</p>
      <form class="stack" @submit=${i=>{i.preventDefault(),a(i.target)}}>
        <h3>${this.t("plans.new")}</h3>
        <div class="stack" style="gap:6px">${s.map(([i,l])=>o`
          <label class="plan-start ${this.newPlanStart===i?"on":""}"><input type="radio" name="start" .checked=${this.newPlanStart===i}
            @change=${()=>this.newPlanStart=i} /><ha-icon icon=${l}></ha-icon>
            <span><b>${this.t(`plans.start.${i}`)}</b><br /><span class="xs muted">${this.t(`plans.start.${i}.hint`)}</span></span></label>`)}</div>
        <label class="field">${this.t("plans.old_name")}<input name="old_name" maxlength="80" placeholder=${this.t("plans.old_name_hint",{season:this.season})} /></label>
        <div class="row"><button class="btn primary" type="submit" ?disabled=${this.planBusy||!this.admin}><ha-icon icon="mdi:file-plus-outline"></ha-icon>${this.t("plans.start_button")}</button></div>
      </form>
      <div class="divider"></div>
      <h3>${this.t("plans.inactive")} (${t.length})</h3>
      ${t.length?o`<div class="stack" style="gap:6px">${t.map(i=>o`<div class="zone-row">
        <ha-icon icon="mdi:file-hidden"></ha-icon>
        <span class="grow"><b>${i.name}</b><br /><span class="xs muted">${this.t("common.season",{year:i.season})} ·
          ${this.t("plans.counts",{zones:i.zones,beds:i.beds,plantings:i.plantings})}${i.archived_at?` \xB7 ${_(i.archived_at.slice(0,10),this.lang)}`:""}</span></span>
        <button class="btn small ghost" aria-pressed=${String(this.comparePlan===i.id)}
          @click=${()=>this.comparePlan=this.comparePlan===i.id?"":i.id}><ha-icon icon="mdi:compare-horizontal"></ha-icon>${this.t("compare.button")}</button>
        <button class="btn small" ?disabled=${this.planBusy||!this.admin}
          @click=${()=>confirm(this.t("plans.confirm_activate",{name:i.name,season:i.season}))&&n(()=>this.api.activatePlan(i.id),this.t("plans.activated",{name:i.name}))}>${this.t("plans.activate")}</button>
        <button class="btn small ghost danger" ?disabled=${this.planBusy||!this.admin}
          @click=${()=>confirm(this.t("plans.confirm_delete",{name:i.name}))&&n(()=>this.api.deletePlan(i.id),this.t("plans.deleted",{name:i.name}))}>${this.t("common.delete")}</button>
      </div>`)}</div>`:o`<p class="small muted">${this.t("plans.none")}</p>`}
      ${this.comparePlan?o`<div class="divider"></div><h3>${this.t("compare.title")}</h3>
        <hl-plan-compare .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} .plants=${this.plantMap} .families=${this.families}
          left=${`p:${this.comparePlan}`} right=${`s:${this.season}`}></hl-plan-compare>`:u}
      <div class="row" style="justify-content:flex-end"><button class="btn" @click=${e}>${this.t("common.close")}</button></div>
    </div>`}onTransitionDone(e){let t=e.detail;this.dialog=null,this.toast(this.t(t.activated?"year.done":"year.prepared",{season:t.season,n:t.carried.length})+(t.skipped.length?` ${this.t("year.skipped",{n:t.skipped.length})}`:"")),this.seasonChosen=!0,this.season=t.season,this.saveState="saved",this.syncFromSnapshot(!0),this.dispatchEvent(new CustomEvent("season-changed",{detail:t.season,bubbles:!0,composed:!0}))}renderDialog(){if(this.removing){let s=this.removing,n=y(this.plantMap.get(s.plant_id),this.lang);return o`<dialog @close=${()=>this.removing=null}>
        <div class="stack">
          <h2><ha-icon icon="mdi:tree-outline"></ha-icon> ${this.t("planner.remove_perennial",{name:n})}</h2>
          <p class="small">${this.t("planner.remove_perennial_intro",{name:n,season:s.season})}</p>
          <button class="btn primary" @click=${()=>this.removePerennial("season")}>${this.t("planner.remove_from_season",{season:this.season})}</button>
          <p class="xs muted">${this.t("planner.remove_from_season_hint")}</p>
          <button class="btn danger" @click=${()=>this.removePerennial("delete")}>${this.t("planner.remove_everywhere")}</button>
          <p class="xs muted">${this.t("planner.remove_everywhere_hint")}</p>
          <div class="row" style="justify-content:flex-end"><button class="btn ghost" @click=${()=>this.removing=null}>${this.t("common.cancel")}</button></div>
        </div></dialog>`}if(!this.dialog)return u;let e=()=>this.dialog=null,t;if(this.dialog==="shortcuts"){let s=[["\u2190 \u2191 \u2192 \u2193","shortcut.move"],["Alt + \u2190 \u2191 \u2192 \u2193","planner.width"],["Ctrl + Z","shortcut.undo"],["Ctrl + Y","shortcut.redo"],["Delete","shortcut.delete"],["Ctrl + D","shortcut.duplicate"],["[ ]","shortcut.cycle"],["G","shortcut.grid"],["C","shortcut.companions"],["M","shortcut.moisture"],["+ / \u2212 / 0","shortcut.zoom"],["Esc","shortcut.escape"],["?","shortcut.help"]];t=o`<h2>${this.t("planner.shortcuts")}</h2>
        <table class="shortcuts">${s.map(([n,a])=>o`<tr><td><kbd>${n}</kbd></td><td>${this.t(a)}</td></tr>`)}</table>
        <div class="row" style="justify-content:flex-end"><button class="btn" @click=${e}>${this.t("common.close")}</button></div>`}else if(this.dialog==="plans")t=this.renderPlans(e);else if(this.dialog==="transition")t=o`<hl-year-transition .api=${this.api} .t=${this.t} .snapshot=${this.snapshot} .plants=${this.plants}
        .families=${this.families} lang=${this.lang} ?admin=${this.admin}
        .fromSeason=${this.snapshot.transition_due??this.snapshot.layout_season??null}
        @close=${e} @transition-done=${this.onTransitionDone}></hl-year-transition>`;else if(this.dialog==="autofill")t=this.renderAutofill();else if(this.dialog==="succession"){let s=this.selection?this.draft.plantings.find(a=>a.id===this.selection.id):void 0,n=s&&this.plantMap.get(s.plant_id);t=o`<form class="stack" @submit=${this.createSuccession}>
        <h2>${this.t("planner.succession")} – ${y(n,this.lang)}</h2>
        <label class="field">${this.t("planner.succession_count")}<input name="count" type="number" min="2" max="12" value="3" required /></label>
        <label class="field">${this.t("planner.succession_interval")}<input name="interval" type="number" min="3" max="90" .value=${String(n?.succession_interval_days??21)} /></label>
        <label class="field">${this.t("planner.succession_placement")}
          <select name="placement"><option value="split">${this.t("planner.succession.split")}</option><option value="stack">${this.t("planner.succession.stack")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${e}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.succession_create")}</button></div>
      </form>`}else t=o`<form class="stack" @submit=${this.importPlan}>
        <h2>${this.t("planner.import")}</h2>
        <input name="file" type="file" accept=".json,.yaml,.yml,application/json,application/yaml" required />
        <label class="field">${this.t("planner.import_mode")}
          <select name="mode"><option value="merge">${this.t("planner.import_merge")}</option><option value="replace">${this.t("planner.import_replace")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${e}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.import")}</button></div>
      </form>`;return o`<dialog @close=${e} style=${this.dialog==="autofill"||this.dialog==="transition"?"max-width:820px":""}>${t}</dialog>`}};w.styles=[R,S`
      :host { display: block; height: 100%; }
      /* The map gets all the width and a fixed height; details open in a popup. */
      .layout { display: grid; grid-template-columns: 260px 1fr; gap: var(--hl-s3); height: max(640px, 78vh); }
      .why { background: var(--hl-surface-2); border-radius: var(--hl-r-md); padding: var(--hl-s2) var(--hl-s3); }
      .why ul { margin: 0; padding-left: 18px; }
      .rotation .rot-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; }
      .rot-cell { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: 4px 6px; display: flex; flex-direction: column; gap: 2px; min-width: 0; font-size: var(--hl-fs-xs); }
      .rot-cell.now { border-color: var(--hl-primary); background: var(--hl-leaf-100); }
      .rot-cell span.xs { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .rot-dots { display: flex; gap: 3px; min-height: 12px; align-items: center; }
      .late-banner, .drop-warning { display: flex; gap: var(--hl-s3); align-items: flex-start; padding: var(--hl-s2) var(--hl-s3); border-radius: var(--hl-r-md); margin-bottom: var(--hl-s2); }
      .late-banner { background: var(--hl-sky-100, #e6f0fa); border: 1px solid var(--hl-sky-300, #b5d0ee); }
      .drop-warning { background: var(--hl-sun-100); border: 1px solid var(--hl-warning); }
      .late-banner .chip { display: inline-flex; align-items: center; gap: 4px; cursor: pointer; border: 0; font: inherit; }
      .layout.narrow { grid-template-columns: 1fr; height: auto; }
      .layout.narrow hl-garden-canvas { height: 58vh; }
      /* Mobile: canvas first, palette becomes a horizontal strip, inspector last. */
      .layout.narrow .center { order: -1; }
      .layout.narrow .palette-list { flex-direction: row; overflow-x: auto; padding-bottom: 4px; scroll-snap-type: x proximity; }
      .layout.narrow .plant-card { min-width: 168px; scroll-snap-align: start; }
      .layout.narrow .family-chips { flex-wrap: nowrap; overflow-x: auto; }
      .layout.narrow .legend-block { display: none; }
      .layout.palette-closed { grid-template-columns: 0 1fr; }
      .pane { background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
      .pane > header { padding: var(--hl-s3) var(--hl-s4); border-bottom: 1px solid var(--hl-border); display: flex; align-items: center; gap: var(--hl-s2); }
      .pane-body { padding: var(--hl-s3) var(--hl-s4); overflow: auto; flex: 1; }
      .toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--hl-s1); padding: var(--hl-s2); background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); margin-bottom: var(--hl-s3); }
      .toolbar .sep { width: 1px; height: 24px; background: var(--hl-border); margin: 0 var(--hl-s1); }
      .toolbar select, .toolbar input[type="date"] { width: auto; min-height: 32px; padding: 4px 8px; }
      .save-state { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); display: inline-flex; align-items: center; gap: 4px; }
      .save-state.error { color: var(--hl-danger); }
      .center { position: relative; min-height: 0; }
      hl-garden-canvas { height: 100%; }
      .palette-list { display: flex; flex-direction: column; gap: var(--hl-s1); }
      .plant-card { display: flex; align-items: center; gap: var(--hl-s2); padding: 6px 8px; border-radius: var(--hl-r-md);
        border: 1px solid transparent; background: var(--hl-surface-2); cursor: grab; touch-action: none; user-select: none; text-align: left; width: 100%; color: var(--hl-text); }
      .plant-card:hover { border-color: var(--hl-border); background: var(--hl-surface-3); }
      .plant-card:active { cursor: grabbing; }
      .plant-card .swatch { width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; flex: none;
        background: var(--hl-surface); border: 2px solid; }
      .plant-card .meta { display: flex; flex-direction: column; min-width: 0; }
      .plant-card .meta span:first-child { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .segmented { display: inline-flex; background: var(--hl-surface-2); border-radius: var(--hl-r-pill); padding: 2px; }
      .segmented button { border: 0; background: transparent; padding: 4px 10px; border-radius: var(--hl-r-pill); cursor: pointer; font-size: var(--hl-fs-xs); font-weight: 600; color: var(--hl-text-muted); }
      .segmented button[aria-pressed="true"] { background: var(--hl-surface); color: var(--hl-text); box-shadow: var(--hl-shadow-1); }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .finding { display: flex; gap: var(--hl-s2); align-items: flex-start; font-size: var(--hl-fs-sm); padding: 6px 8px; border-radius: var(--hl-r-sm); background: var(--hl-surface-2); }
      .finding.error { background: var(--hl-tomato-100); }
      .finding.warning { background: var(--hl-sun-100); }
      .finding.info { background: var(--hl-leaf-100); }
      .timeline { position: relative; height: 64px; border-radius: var(--hl-r-sm); background: var(--hl-surface-2); overflow: hidden; }
      .timeline .bar { position: absolute; height: 12px; border-radius: 6px; }
      .timeline .month { position: absolute; bottom: 2px; font-size: 10px; color: var(--hl-text-muted); transform: translateX(-50%); }
      .timeline .today { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--hl-focus); }
      .legend { display: flex; flex-wrap: wrap; gap: var(--hl-s2); font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
      .legend span { display: inline-flex; align-items: center; gap: 4px; }
      .score { font-size: var(--hl-fs-2xl); font-weight: 700; }
      .prefs { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: 8px 12px; display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 6px 12px; }
      .prefs legend { font-weight: 600; padding: 0 4px; }
      .more { position: relative; }
      .more > summary { list-style: none; cursor: pointer; }
      .more > summary::-webkit-details-marker { display: none; }
      .more .menu { position: absolute; right: 0; top: calc(100% + 4px); z-index: 5; min-width: 220px; display: flex; flex-direction: column;
        background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); box-shadow: var(--hl-shadow-2); padding: 4px; }
      .more .menu button { display: flex; gap: 8px; align-items: center; border: 0; background: none; padding: 8px 10px; border-radius: var(--hl-r-sm);
        cursor: pointer; color: var(--hl-text); font: inherit; text-align: left; }
      .more .menu button:hover { background: var(--hl-surface-2); }
      .stepper { display: flex; align-items: center; gap: var(--hl-s1); flex-wrap: wrap; margin-bottom: var(--hl-s2); }
      .step { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px 6px 6px; border-radius: var(--hl-r-pill);
        border: 1px solid var(--hl-border); background: var(--hl-surface); color: var(--hl-text); cursor: pointer; text-align: left; font: inherit; }
      .step .num { width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; background: var(--hl-surface-3);
        font-weight: 700; font-size: var(--hl-fs-xs); }
      .step .txt { display: flex; flex-direction: column; line-height: 1.15; }
      .step.active { border-color: var(--hl-leaf-500); background: var(--hl-leaf-100); }
      .step.active .num { background: var(--hl-leaf-600); color: #fff; }
      .step-sep { color: var(--hl-text-muted); }
      .crumbs { display: inline-flex; gap: 6px; align-items: center; }
      label.plan-start { display: flex; gap: 10px; align-items: center; padding: 8px 10px; border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); cursor: pointer; }
      label.plan-start.on { border-color: var(--hl-leaf-500); background: var(--hl-leaf-100); }
      details.skipped ul.why { list-style: none; padding: 0; margin: 6px 0 0; display: grid; gap: 6px; max-height: 26vh; overflow: auto; }
      details.skipped li { display: flex; gap: 8px; align-items: flex-start; }
      .tool-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(74px, 1fr)); gap: 6px; }
      details.elements > summary { cursor: pointer; padding: 6px 0; }
      details.elements[open] > summary { margin-bottom: 4px; }
      .tool { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 4px; border-radius: var(--hl-r-md);
        border: 1px solid var(--hl-border); background: var(--hl-surface-2); cursor: pointer; color: var(--hl-text); font: inherit; }
      .tool:hover { background: var(--hl-surface-3); }
      .tool.active { border-color: var(--hl-focus); box-shadow: 0 0 0 2px color-mix(in srgb, var(--hl-focus) 30%, transparent); background: var(--hl-surface); }
      .tool-icon { font-size: 22px; line-height: 1; }
      .tool-label { font-size: 11px; text-align: center; line-height: 1.15; }
      .zone-row { display: flex; gap: 8px; align-items: center; padding: 6px 8px; border-radius: var(--hl-r-md); background: var(--hl-surface-2);
        border: 0; width: 100%; text-align: left; color: var(--hl-text); font: inherit; }
      .zone-row.as-btn { cursor: pointer; }
      .zone-card { display: flex; gap: 10px; align-items: center; padding: 10px; border-radius: var(--hl-r-md); border: 1px solid var(--hl-border);
        border-left-width: 5px; background: var(--hl-surface); cursor: pointer; text-align: left; color: var(--hl-text); font: inherit; width: 100%; }
      .zone-card:hover { background: var(--hl-surface-2); }
      .zone-card .big { font-size: 26px; }
      .grow { flex: 1; min-width: 0; }
      .draw-hint { position: absolute; left: 50%; top: 12px; transform: translateX(-50%); display: flex; gap: 8px; align-items: center;
        background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-pill); padding: 4px 6px 4px 12px;
        box-shadow: var(--hl-shadow-2); font-size: var(--hl-fs-sm); z-index: 2; max-width: calc(100% - 24px); }
      .zone-filter { background: var(--hl-leaf-100); border-radius: var(--hl-r-sm); padding: 4px 8px; margin: 0; }
      .perennial-tag { display: inline-grid; place-items: center; width: 16px; height: 16px; border-radius: 50%; background: var(--hl-leaf-700);
        color: #fff; font-size: 11px; vertical-align: 1px; }
      .badge-demo { display: inline-grid; place-items: center; width: 16px; height: 16px; border-radius: 50%; color: #fff; font-size: 10px; font-weight: 700; }
      .row-demo { display: inline-block; width: 22px; height: 0; border-top: 4px dashed #5f9a3a; }
      .tips summary { cursor: pointer; font-weight: 600; }
      .tips ul { margin: 6px 0 0; padding-left: 18px; font-size: var(--hl-fs-sm); }
      .tips li { margin-bottom: 4px; }
      table.soil { width: 100%; font-size: var(--hl-fs-xs); border-collapse: collapse; margin: 6px 0; }
      table.soil th, table.soil td { text-align: left; padding: 2px 4px; border-bottom: 1px solid var(--hl-border); }
      ul.notes { margin: 0; padding-left: 16px; }
      .plant-glyph { display: block; }
      .readonly-note { font-size: var(--hl-fs-xs); color: var(--hl-warning); }
      dialog { border: none; border-radius: var(--hl-r-lg); padding: var(--hl-s5); max-width: 520px; width: calc(100% - 32px); background: var(--hl-surface); color: var(--hl-text); box-shadow: var(--hl-shadow-3); }
      dialog::backdrop { background: rgba(20, 24, 18, 0.45); }
      kbd { font-family: ui-monospace, monospace; font-size: 12px; background: var(--hl-surface-2); border: 1px solid var(--hl-border); border-bottom-width: 2px; border-radius: 4px; padding: 1px 6px; }
      table.shortcuts td { padding: 4px 8px; }
      .drag-ghost-hint { position: absolute; left: 50%; top: 12px; transform: translateX(-50%); background: var(--hl-surface); border: 1px solid var(--hl-border);
        padding: 6px 12px; border-radius: var(--hl-r-pill); box-shadow: var(--hl-shadow-2); font-size: var(--hl-fs-sm); pointer-events: none; max-width: 90%; }
    `],h([g({attribute:!1})],w.prototype,"snapshot",2),h([g({attribute:!1})],w.prototype,"plants",2),h([g({attribute:!1})],w.prototype,"families",2),h([g({attribute:!1})],w.prototype,"api",2),h([g({attribute:!1})],w.prototype,"t",2),h([g()],w.prototype,"lang",2),h([g({type:Boolean})],w.prototype,"admin",2),h([g({type:Boolean})],w.prototype,"narrow",2),h([g({reflect:!0})],w.prototype,"mode",2),h([g({type:Number})],w.prototype,"transitionRequest",2),h([g({type:Number})],w.prototype,"initialSeason",2),h([g({attribute:!1})],w.prototype,"focusPlanting",2),h([f()],w.prototype,"why",2),h([f()],w.prototype,"dropWarning",2),h([f()],w.prototype,"stillPossible",2),h([f()],w.prototype,"lateDismissed",2),h([f()],w.prototype,"comparePlan",2),h([f()],w.prototype,"draft",2),h([f()],w.prototype,"selection",2),h([f()],w.prototype,"multi",2),h([f()],w.prototype,"showFeatures",2),h([f()],w.prototype,"showPlantings",2),h([f()],w.prototype,"showZones",2),h([f()],w.prototype,"categoryFilter",2),h([f()],w.prototype,"autofill",2),h([f()],w.prototype,"autofillBusy",2),h([f()],w.prototype,"autofillReplace",2),h([f()],w.prototype,"autofillBeds",2),h([f()],w.prototype,"autofillResources",2),h([f()],w.prototype,"autofillSeason",2),h([f()],w.prototype,"season",2),h([f()],w.prototype,"saveState",2),h([f()],w.prototype,"reports",2),h([f()],w.prototype,"extraTimelines",2),h([f()],w.prototype,"snapOn",2),h([f()],w.prototype,"showCompanions",2),h([f()],w.prototype,"showMoisture",2),h([f()],w.prototype,"showTemperature",2),h([f()],w.prototype,"viewDate",2),h([f()],w.prototype,"layoutMode",2),h([f()],w.prototype,"search",2),h([f()],w.prototype,"familyFilter",2),h([f()],w.prototype,"paletteDrag",2),h([f()],w.prototype,"ghostReport",2),h([f()],w.prototype,"dialog",2),h([f()],w.prototype,"newPlanStart",2),h([f()],w.prototype,"planBusy",2),h([f()],w.prototype,"popupOpen",2),h([f()],w.prototype,"announcement",2),h([f()],w.prototype,"paletteOpen",2),h([f()],w.prototype,"step",2),h([f()],w.prototype,"tool",2),h([f()],w.prototype,"focusZone",2),h([f()],w.prototype,"removing",2),h([f()],w.prototype,"soilForm",2),h([f()],w.prototype,"harvestKg",2),h([be("hl-garden-canvas")],w.prototype,"canvas",2),w=h([M("hl-planner-view")],w);var _s=S`
  .cal { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1px; position: relative; height: 34px; }
  .cal .m { background: var(--hl-surface-2); font-size: 9px; color: var(--hl-text-muted); text-align: center; padding-top: 22px; }
  .cal .b { position: absolute; height: 5px; border-radius: 3px; }
`;function ws(c,r,e,t){let s=r.analysis?.anchors??{last_frost:`${new Date().getFullYear()}-04-20`,first_frost:`${new Date().getFullYear()}-10-25`},n=s.last_frost,a=r.settings.region.hemisphere==="south"?`${n.slice(0,4)}-07-01`:`${n.slice(0,4)}-01-01`,i=v=>Math.max(0,Math.min(100,ye(a,v)/365*100)),l=[],d=(v,b,x)=>{for(let $ of v){let[T,L]=as($,s);l.push(o`<div class="b" style=${`left:${i(T)}%;width:${Math.max(i(L)-i(T),1)}%;top:${b}px;background:${x}`}></div>`)}};d(c.sowing.indoor_sow,2,"var(--hl-leaf-300)"),d(c.sowing.direct_sow,8,"var(--hl-leaf-500)"),d(c.sowing.transplant,14,"var(--hl-leaf-700)");let p=[...c.sowing.direct_sow,...c.sowing.transplant][0];if(p&&c.harvestable){let[v,b]=as(p,s),x=c.maturity_from==="transplant"&&!c.sowing.transplant.length?c.germination_days[1]+14:0;l.push(o`<div class="b" style=${`left:${i(H(v,c.days_to_maturity[0]+x))}%;width:${Math.max(i(H(b,c.days_to_maturity[1]+x+c.harvest_duration_days))-i(H(v,c.days_to_maturity[0]+x)),1)}%;top:20px;background:var(--hl-sun-500)`}></div>`)}let m=Array.from({length:12},(v,b)=>_(H(a,Math.round(b*30.5+10)),e,{month:"narrow"}));return o`<div class="cal" role="img" aria-label=${t("lib.calendar")}>${m.map(v=>o`<div class="m">${v}</div>`)}${l}</div>`}var me=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en"}pick(e){this.dispatchEvent(new CustomEvent("select-plant",{detail:e,bubbles:!0,composed:!0}))}renderMine(e){let t=(this.snapshot?.plantings??[]).filter(n=>n.plant_id===e.id);if(!t.length)return u;let s=new Map;for(let n of[{beds:this.snapshot.beds},...Object.values(this.snapshot.layouts??{})])for(let a of n.beds)s.set(a.id,a.name);return o`<section class="stack"><h3>${this.t("lib.in_garden")}</h3><div class="mine">
      ${t.sort((n,a)=>a.season-n.season).map(n=>o`<button class="chip" @click=${()=>this.dispatchEvent(new CustomEvent("focus-planting",{detail:{planting_id:n.id,season:n.season},bubbles:!0,composed:!0}))}>${n.season} · ${s.get(n.bed_id)??n.bed_id}</button>`)}
    </div></section>`}render(){let e=this.plant,t=this.lang,s=i=>{let l=new Map;for(let d of e.companions)d.relation===i&&l.set(d.plant,d.reason[t]??d.reason.en??"");for(let d of this.plants)for(let p of d.companions)p.plant===e.id&&p.relation===i&&!l.has(d.id)&&l.set(d.id,p.reason[t]??p.reason.en??"");return[...l.entries()]},n=i=>y(this.plants.find(l=>l.id===i),this.lang),a=(i,l)=>{let d=this.plants.find(p=>p.id===i);return o`<button class="chip ${l}" title=${this.t("lib.open_plant")} ?disabled=${!d} @click=${()=>d&&this.pick(d)}>
        ${d?D(N(d),d.color||z(this.families,d.family),16):u}${n(i)}</button>`};return o`
          <hl-plant-image .plant=${e} color=${z(this.families,e.family)} lang=${this.lang} size="hero" credit></hl-plant-image>
          ${ws(e,this.snapshot,this.lang,this.t)}
          <div class="kv">
            <span>${this.t("lib.spacing")}</span><span>${e.spacing_cm} × ${e.row_spacing_cm} cm</span>
            <span>${this.t("lib.depth")}</span><span>${e.sowing_depth_cm} cm</span>
            <span>${this.t("lib.germination")}</span><span>${e.germination_days[0]}–${e.germination_days[1]} d · ≥ ${e.min_soil_temp_c} °C</span>
            <span>${this.t("lib.maturity")}</span><span>${e.days_to_maturity[0]}–${e.days_to_maturity[1]} d</span>
            <span>${this.t("lib.habit")}</span><span>${this.t(`habit.${e.habit}`)}</span>
            <span>${this.t("lib.frost")}</span><span>${this.t(`frost.${e.frost_tolerance}`)} (${e.min_temp_c} °C)</span>
            <span>${this.t("lib.greenhouse")}</span><span>${this.t(`suit.${e.greenhouse.suitability}`)} · ${e.greenhouse.min_night_c}–${e.greenhouse.max_day_c} °C</span>
            <span>${this.t("lib.water")} / ${this.t("lib.nutrients")}</span><span>${this.t(`level.${e.water_needs}`)} / ${this.t(`level.${e.nutrient_needs}`)}</span>
            <span>${this.t("lib.rotation")} <hl-info term="rotation" .t=${this.t}></hl-info></span><span>${this.t("lib.rotation_years",{n:e.rotation_years})}</span>
            ${e.category?o`<span>${this.t("lib.category")}</span><span>${this.t(`category.${e.category}`)}${e.perennial?` \xB7 ${this.t("lib.perennial")}`:""}</span>`:u}
            ${e.height_cm?o`<span>${this.t("lib.height")}</span><span>${e.height_cm} cm · ${this.t("lib.roots")} ${e.root_depth_cm??"?"} cm</span>`:u}
            ${e.kc?o`<span>Kc <hl-info term="kc" .t=${this.t}></hl-info></span><span>${e.kc.map(i=>i.toFixed(2)).join(" \u2192 ")}</span>`:u}
            ${e.npk?o`<span>N · P · K <hl-info term="npk" .t=${this.t}></hl-info></span><span>${e.npk.join(" \xB7 ")} / 3</span>`:u}
            ${e.gdd_to_maturity?o`<span>${this.t("lib.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span>${e.gdd_to_maturity} °C·d (${this.t("lib.base")} ${e.gdd_base_c} °C)</span>`:u}
            ${e.plants_per_person?o`<span>${this.t("lib.per_person")}</span><span>${e.plants_per_person} · ${e.yield_kg_m2??"?"} kg/m²</span>`:u}
          </div>
          ${e.deters?.length||e.trap_for?.length||e.allelopathic||e.shade_tolerant?o`<div class="row wrap">
            ${(e.deters??[]).map(i=>o`<span class="chip ok" title=${this.t("lib.deters")}>🛡 ${lt(i,this.lang)}</span>`)}
            ${(e.trap_for??[]).map(i=>o`<span class="chip warn" title=${this.t("lib.trap_for")}>🪤 ${lt(i,this.lang)} <hl-info term="trap_crop" .t=${this.t}></hl-info></span>`)}
            ${e.allelopathic?o`<span class="chip bad">${this.t("lib.allelopathic")} <hl-info term="allelopathy" .t=${this.t}></hl-info></span>`:u}
            ${e.shade_tolerant?o`<span class="chip cold">${this.t("lib.shade_tolerant")}</span>`:u}
          </div>`:u}
          ${e.greenhouse.notes[t]?o`<p class="small">${e.greenhouse.notes[t]}</p>`:u}
          <section class="stack"><h3>${this.t("lib.friends")}</h3>
            ${s("friend").length?s("friend").map(([i,l])=>o`<div class="rel">${a(i,"ok")}<span class="muted">${l}</span></div>`):o`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.enemies")}</h3>
            ${s("enemy").length?s("enemy").map(([i,l])=>o`<div class="rel">${a(i,"bad")}<span class="muted">${l}</span></div>`):o`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.pests")} & ${this.t("lib.diseases")}</h3>
            <div class="row wrap">${e.pests.map(i=>o`<span class="chip warn">${lt(i,this.lang)}</span>`)}${e.diseases.map(i=>o`<span class="chip bad">${lt(i,this.lang)}</span>`)}</div></section>
          ${e.care.length||e.pruning_notes[t]?o`<section class="stack"><h3>${this.t("lib.care")}</h3>
            ${e.care.map(i=>o`<p class="small"><b>${this.t(`type.${i.task}`)}</b>${i.interval_days?` \xB7 \u21BB ${i.interval_days} d`:""} – ${i.notes[t]??i.notes.en??""}</p>`)}
            ${e.pruning_notes[t]?o`<p class="small">${e.pruning_notes[t]}</p>`:u}</section>`:u}
      ${this.renderMine(e)}`}};me.styles=[R,_s,S`
      :host { display: flex; flex-direction: column; gap: var(--hl-s4); }
      .kv { display: grid; grid-template-columns: 1fr 1fr; gap: 6px var(--hl-s4); font-size: var(--hl-fs-sm); }
      .kv span:nth-child(odd) { color: var(--hl-text-muted); }
      .rel { display: flex; gap: var(--hl-s2); align-items: flex-start; font-size: var(--hl-fs-sm); }
      .rel .chip { display: inline-flex; align-items: center; gap: 4px; cursor: pointer; border: 0; font: inherit; }
      .grow { flex: 1; }
      .mine { display: flex; flex-wrap: wrap; gap: 6px; }
    `],h([g({attribute:!1})],me.prototype,"plant",2),h([g({attribute:!1})],me.prototype,"plants",2),h([g({attribute:!1})],me.prototype,"families",2),h([g({attribute:!1})],me.prototype,"snapshot",2),h([g({attribute:!1})],me.prototype,"t",2),h([g()],me.prototype,"lang",2),me=h([M("hl-plant-detail")],me);var La={id:"",names:{en:"",nl:""},scientific_name:"",family:"Asteraceae",variety:null,habit:"bush",perennial:!1,spacing_cm:30,row_spacing_cm:30,sowing_depth_cm:1,germination_days:[7,14],min_soil_temp_c:8,optimal_soil_temp_c:18,max_soil_temp_c:null,days_to_maturity:[60,80],maturity_from:"sow",harvest_duration_days:14,harvestable:!0,continuous_harvest:!1,harvest_interval_days:null,transplant_age_days:[35,49],sowing:{indoor_sow:[],direct_sow:[{start_week:-2,end_week:8,anchor:"last_frost"}],transplant:[]},greenhouse:{suitability:"conditional",min_night_c:5,max_day_c:30,season_extension_weeks:2,notes:{}},frost_tolerance:"half_hardy",min_temp_c:0,max_temp_c:30,companions:[],rotation_years:3,pests:[],diseases:[],water_needs:"medium",nutrient_needs:"medium",feeding_interval_days:null,care:[],pruning_notes:{},thinning:!1,succession_interval_days:null,gdd_base_c:10,gdd_to_maturity:null,tags:[],source:"custom"},q=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.query="";this.family="";this.category="";this.filter="";this.selected=null;this.editing=null;this.error=""}filtered(){let e=this.query.trim().toLowerCase();return this.plants.filter(t=>!this.family||t.family===this.family).filter(t=>!this.category||(t.category??"vegetable")===this.category).filter(t=>this.filter!=="greenhouse"||t.greenhouse.suitability==="yes").filter(t=>this.filter!=="quick"||t.days_to_maturity[0]<=50).filter(t=>this.filter!=="custom"||t.source!=="builtin").filter(t=>!e||[t.id,t.scientific_name,t.family,this.families[t.family]?.[this.lang]??"",...Object.values(t.names)].some(s=>s.toLowerCase().includes(e))).sort((t,s)=>y(t,this.lang).localeCompare(y(s,this.lang)))}render(){let e=[...new Set(this.plants.map(t=>t.family))].sort();return o`
      <div class="top">
        <input type="search" placeholder=${this.t("lib.search")} aria-label=${this.t("lib.search")} .value=${this.query}
          @input=${t=>this.query=t.target.value} />
        <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
          <select style="width:auto" @change=${t=>this.family=t.target.value}>
            ${["",...e].map(t=>o`<option value=${t} ?selected=${t===this.family}>${t?this.families[t]?.[this.lang]??t:`${this.t("lib.family")}: ${this.t("common.all")}`}</option>`)}
          </select>
        </label>
        <label class="row small"><span class="visually-hidden">${this.t("lib.category")}</span>
          <select style="width:auto" @change=${t=>this.category=t.target.value}>
            ${["","vegetable","herb","fruit","flower"].map(t=>o`<option value=${t} ?selected=${t===this.category}>${t?this.t(`category.${t}`):`${this.t("lib.category")}: ${this.t("common.all")}`}</option>`)}
          </select>
        </label>
        <span class="small muted">${this.t("lib.count",{n:this.filtered().length})}</span>
        ${["greenhouse","quick","custom"].map(t=>o`
          <button class="chip" aria-pressed=${String(this.filter===t)} @click=${()=>this.filter=this.filter===t?"":t}>${this.t(`lib.filter_${t}`)}</button>`)}
        <span class="spacer"></span>
        ${this.admin?o`<button class="btn primary small" @click=${()=>this.editing={plant:structuredClone(La),mode:"custom"}}>
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("lib.add_custom")}</button>`:u}
      </div>
      <div class="legend-row" aria-hidden="true">
        <span style="--c:var(--hl-leaf-300)">${this.t("lib.indoor_sow")}</span><span style="--c:var(--hl-leaf-500)">${this.t("lib.direct_sow")}</span>
        <span style="--c:var(--hl-leaf-700)">${this.t("lib.transplant")}</span><span style="--c:var(--hl-sun-500)">${this.t("lib.harvest")}</span>
      </div>
      <div class="grid" style="margin-top:12px">
        ${this.filtered().map(t=>o`
          <button class="pcard" @click=${()=>this.selected=t} aria-label=${y(t,this.lang)}>
            <div class="stripe" style=${`background:${z(this.families,t.family)}`}></div>
            <hl-plant-image .plant=${t} color=${z(this.families,t.family)} lang=${this.lang} size="card"></hl-plant-image>
            <div class="inner">
              <div class="row"><h3>${y(t,this.lang)}</h3><span class="spacer"></span>
                ${t.source!=="builtin"?o`<span class="chip warn">${this.t(`lib.source.${t.source}`)}</span>`:u}</div>
              <span class="xs muted"><i>${t.scientific_name}</i>${t.variety?` \xB7 ${t.variety}`:""}</span>
              <div class="facts">
                <span><b>${t.spacing_cm} cm</b>${this.t("lib.spacing")}</span>
                <span><b>${t.days_to_maturity[0]}–${t.days_to_maturity[1]}</b>${this.t("lib.maturity")}</span>
                <span><b>${this.t(`level.${t.water_needs}`)}</b>${this.t("lib.water")}</span>
              </div>
              ${ws(t,this.snapshot,this.lang,this.t)}
            </div>
          </button>`)}
      </div>
      ${this.selected?this.renderDetail(this.selected):u}
      ${this.editing?this.renderEditor():u}
    `}renderDetail(e){let t=this.filtered(),s=t.findIndex(n=>n.id===e.id);return o`
      <hl-modal heading=${y(e,this.lang)} accent=${z(this.families,e.family)} nav ?has-prev=${s>0} ?has-next=${s>=0&&s<t.length-1}
        closeLabel=${this.t("common.close")} prevLabel=${this.t("common.previous")} nextLabel=${this.t("common.next")}
        @prev=${()=>this.selected=t[s-1]} @next=${()=>this.selected=t[s+1]}
        @closed=${()=>this.selected=null} @select-plant=${n=>this.showPlant(n.detail)}>
        <span slot="subheading" class="small muted"><i>${e.scientific_name}</i> · ${this.families[e.family]?.[this.lang]??e.family}</span>
        <hl-plant-detail .plant=${e} .plants=${this.plants} .families=${this.families} .snapshot=${this.snapshot} .t=${this.t} lang=${this.lang}></hl-plant-detail>
        ${this.admin?o`<div slot="actions" class="row">
          <button class="btn" @click=${()=>this.editing={plant:structuredClone(e),mode:e.source==="custom"?"custom":"override"}}>
            <ha-icon icon="mdi:pencil"></ha-icon>${this.t("lib.customize")}</button>
          ${e.source!=="builtin"?o`<button class="btn danger" @click=${()=>this.removePlant(e)}>${e.source==="override"?this.t("lib.reset"):this.t("common.delete")}</button>`:u}
        </div>`:u}
      </hl-modal>`}showPlant(e){this.selected=e,this.updateComplete.then(()=>this.renderRoot.querySelector("hl-modal")?.toTop())}async removePlant(e){try{await this.api.deletePlant(e.id),this.selected=null,this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0}))}catch(t){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t.message},bubbles:!0,composed:!0}))}}async save(e){e.preventDefault();let{plant:t,mode:s}=this.editing,n=e.target,a=v=>n.elements.namedItem(v).value,i=v=>Number(a(v)),l=v=>n.elements.namedItem(`${v}_on`).checked?[{start_week:i(`${v}_start`),end_week:i(`${v}_end`),anchor:"last_frost"}]:[],d=a("name_en").trim(),p={...t,id:s==="custom"&&!t.id?d.toLowerCase().normalize("NFKD").replace(/[^\w]+/g,"_").replace(/^_|_$/g,"")||"plant":t.id,names:{...t.names,en:d,nl:a("name_nl").trim()||d},scientific_name:a("scientific"),variety:a("variety")||null,family:a("family"),habit:a("habit"),spacing_cm:i("spacing"),row_spacing_cm:i("row_spacing"),sowing_depth_cm:i("depth"),germination_days:[i("germ_min"),i("germ_max")],min_soil_temp_c:i("soil_temp"),days_to_maturity:[i("dtm_min"),i("dtm_max")],maturity_from:a("maturity_from"),frost_tolerance:a("frost"),min_temp_c:i("min_temp"),max_temp_c:i("max_temp"),water_needs:a("water"),nutrient_needs:a("nutrients"),rotation_years:i("rotation"),greenhouse:{...t.greenhouse,suitability:a("gh")},sowing:{indoor_sow:l("indoor"),direct_sow:l("direct"),transplant:l("transplant")},pests:a("pests").split(",").map(v=>v.trim().replace(/\s+/g,"_")).filter(Boolean),diseases:a("diseases").split(",").map(v=>v.trim().replace(/\s+/g,"_")).filter(Boolean)},m=p;if(s==="override"){m={id:p.id};for(let v of Object.keys(p))v!=="source"&&JSON.stringify(p[v])!==JSON.stringify(t[v])&&(m[v]=p[v])}try{let v=await this.api.savePlant(m,s);this.editing=null,this.selected=v.plant,this.error="",this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("lib.saved",{plant:y(v.plant,this.lang)})},bubbles:!0,composed:!0}))}catch(v){this.error=v.message??String(v)}}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal()}renderEditor(){let{plant:e,mode:t}=this.editing,s=(a,i,l,d)=>o`
      <select name=${a}>${l.map(p=>o`<option value=${p} ?selected=${p===i}>${d?this.t(`${d}.${p}`):this.families[p]?.[this.lang]??p}</option>`)}</select>`,n=(a,i,l)=>o`
      <label class="row small"><input type="checkbox" name=${`${a}_on`} ?checked=${!!l} />${i}</label>
      <label class="field">${this.t("lib.from")} (${this.t("lib.weeks")})<input name=${`${a}_start`} type="number" min="-30" max="30" .value=${String(l?.start_week??-4)} /></label>
      <label class="field">${this.t("lib.to")} (${this.t("lib.weeks")})<input name=${`${a}_end`} type="number" min="-30" max="40" .value=${String(l?.end_week??2)} /></label>`;return o`<dialog @close=${()=>this.editing=null} style="border:none;border-radius:16px;padding:0;width:min(640px,calc(100vw - 32px));background:var(--hl-surface);color:var(--hl-text)">
      <form class="stack" style="padding:24px;max-height:85vh;overflow:auto" @submit=${this.save}>
        <h2>${t==="custom"&&!e.id?this.t("lib.add_custom"):`${this.t("lib.customize")}: ${y(e,this.lang)}`}</h2>
        <div class="form-grid">
          <label class="field">${this.t("lib.name_en")}<input name="name_en" required .value=${e.names.en??""} /></label>
          <label class="field">${this.t("lib.name_nl")}<input name="name_nl" .value=${e.names.nl??""} /></label>
          <label class="field">${this.t("lib.scientific")}<input name="scientific" .value=${e.scientific_name} /></label>
          <label class="field">${this.t("lib.variety")}<input name="variety" .value=${e.variety??""} /></label>
          <label class="field">${this.t("lib.family")}${s("family",e.family,Object.keys(this.families),"")}</label>
          <label class="field">${this.t("lib.habit")}${s("habit",e.habit,["bush","vine","climbing","upright","rosette","root","bulb"],"habit")}</label>
          <label class="field">${this.t("lib.spacing")} (cm)<input name="spacing" type="number" min="1" step="1" .value=${String(e.spacing_cm)} /></label>
          <label class="field">${this.t("lib.row_spacing")} (cm)<input name="row_spacing" type="number" min="1" .value=${String(e.row_spacing_cm)} /></label>
          <label class="field">${this.t("lib.depth")} (cm)<input name="depth" type="number" min="0" step="0.5" .value=${String(e.sowing_depth_cm)} /></label>
          <label class="field">${this.t("lib.soil_temp")} (°C)<input name="soil_temp" type="number" step="1" .value=${String(e.min_soil_temp_c)} /></label>
          <label class="field">${this.t("lib.germination")} min<input name="germ_min" type="number" min="1" .value=${String(e.germination_days[0])} /></label>
          <label class="field">${this.t("lib.germination")} max<input name="germ_max" type="number" min="1" .value=${String(e.germination_days[1])} /></label>
          <label class="field">${this.t("lib.maturity")} min<input name="dtm_min" type="number" min="1" .value=${String(e.days_to_maturity[0])} /></label>
          <label class="field">${this.t("lib.maturity")} max<input name="dtm_max" type="number" min="1" .value=${String(e.days_to_maturity[1])} /></label>
          <label class="field">${this.t("planner.method")}<select name="maturity_from">
            <option value="sow" ?selected=${e.maturity_from==="sow"}>${this.t("lib.direct_sow")}</option>
            <option value="transplant" ?selected=${e.maturity_from==="transplant"}>${this.t("lib.transplant")}</option></select></label>
          <label class="field">${this.t("lib.frost")}${s("frost",e.frost_tolerance,["tender","half_hardy","hardy","very_hardy"],"frost")}</label>
          <label class="field">${this.t("lib.min_temp")} (°C)<input name="min_temp" type="number" step="0.5" .value=${String(e.min_temp_c)} /></label>
          <label class="field">Max (°C)<input name="max_temp" type="number" step="0.5" .value=${String(e.max_temp_c)} /></label>
          <label class="field">${this.t("lib.water")}${s("water",e.water_needs,["low","medium","high"],"level")}</label>
          <label class="field">${this.t("lib.nutrients")}${s("nutrients",e.nutrient_needs,["low","medium","high"],"level")}</label>
          <label class="field">${this.t("lib.greenhouse")}${s("gh",e.greenhouse.suitability,["yes","conditional","no"],"suit")}</label>
          <label class="field">${this.t("lib.rotation")}<input name="rotation" type="number" min="1" max="8" .value=${String(e.rotation_years)} /></label>
        </div>
        <fieldset><legend>${this.t("lib.calendar")}</legend>
          <p class="xs muted">${this.t("lib.windows_hint")}</p>
          <div class="form-grid" style="grid-template-columns: 1.2fr 1fr 1fr; align-items:end">
            ${n("indoor",this.t("lib.indoor_sow"),e.sowing.indoor_sow[0])}
            ${n("direct",this.t("lib.direct_sow"),e.sowing.direct_sow[0])}
            ${n("transplant",this.t("lib.transplant"),e.sowing.transplant[0])}
          </div>
        </fieldset>
        <label class="field">${this.t("lib.pests")}<input name="pests" .value=${e.pests.join(", ")} /></label>
        <label class="field">${this.t("lib.diseases")}<input name="diseases" .value=${e.diseases.join(", ")} /></label>
        ${this.error?o`<p class="field-error" role="alert">${this.error}</p>`:u}
        <div class="row" style="justify-content:flex-end">
          <button type="button" class="btn ghost" @click=${()=>this.editing=null}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("common.save")}</button>
        </div>
      </form>
    </dialog>`}};q.styles=[R,_s,S`
      .top { display: flex; flex-wrap: wrap; gap: var(--hl-s2); align-items: center; margin-bottom: var(--hl-s3); }
      .top input[type="search"] { max-width: 360px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--hl-s3); }
      .pcard { text-align: left; border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); background: var(--hl-surface); padding: 0; cursor: pointer;
        overflow: hidden; display: flex; flex-direction: column; color: var(--hl-text); transition: box-shadow var(--hl-dur) var(--hl-ease), transform var(--hl-dur) var(--hl-ease); }
      .pcard:hover { box-shadow: var(--hl-shadow-2); transform: translateY(-1px); }
      .pcard .stripe { height: 6px; }
      .pcard hl-plant-image { border-radius: 0; }
      .pcard .inner { padding: var(--hl-s3) var(--hl-s4); display: flex; flex-direction: column; gap: var(--hl-s2); }
      .facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
      .facts b { display: block; color: var(--hl-text); font-size: var(--hl-fs-sm); }
      .kv { display: grid; grid-template-columns: 1fr 1fr; gap: 6px var(--hl-s4); font-size: var(--hl-fs-sm); }
      .kv span:nth-child(odd) { color: var(--hl-text-muted); }
      .rel { display: flex; gap: var(--hl-s2); align-items: flex-start; font-size: var(--hl-fs-sm); }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      fieldset { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); margin: 0; }
      legend { font-weight: 600; font-size: var(--hl-fs-sm); padding: 0 4px; }
      .legend-row { display: flex; gap: var(--hl-s3); font-size: var(--hl-fs-xs); color: var(--hl-text-muted); flex-wrap: wrap; }
      .legend-row span::before { content: ""; display: inline-block; width: 14px; height: 5px; border-radius: 3px; margin-right: 4px; vertical-align: middle; background: var(--c); }
    `],h([g({attribute:!1})],q.prototype,"snapshot",2),h([g({attribute:!1})],q.prototype,"plants",2),h([g({attribute:!1})],q.prototype,"families",2),h([g({attribute:!1})],q.prototype,"api",2),h([g({attribute:!1})],q.prototype,"t",2),h([g()],q.prototype,"lang",2),h([g({type:Boolean})],q.prototype,"admin",2),h([f()],q.prototype,"query",2),h([f()],q.prototype,"family",2),h([f()],q.prototype,"category",2),h([f()],q.prototype,"filter",2),h([f()],q.prototype,"selected",2),h([f()],q.prototype,"editing",2),h([f()],q.prototype,"error",2),q=h([M("hl-library-view")],q);var V=class extends E{constructor(){super(...arguments);this.lang="en";this.plants=new Map;this.families={};this.mode="month";this.cursor="";this.showDone=!1;this.bedFilter="";this.year=null}async loadYear(){try{this.year=(await this.api?.records())?.year??null}catch{this.year=null}}renderYear(){let e=this.year;if(!e)return o`<p class="empty">${this.t("common.loading")}</p>`;let t=Array.from({length:12},(l,d)=>new Date(2026,d,1).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{month:"short"})),s=new Date().getMonth(),n=["harvest","plant","sow","sow_indoor","grow"],a=this.snapshot.beds.find(l=>l.id===this.bedFilter)?.name??"",i=e.rows.filter(l=>!this.bedFilter||l.beds.includes(a)).sort((l,d)=>y(this.plants.get(l.plant_id),this.lang).localeCompare(y(this.plants.get(d.plant_id),this.lang),this.lang));return o`<div class="card year-wrap"><table class="year">
      <thead><tr><th></th>${t.map((l,d)=>o`<th class=${d===s?"now":""}>${l}</th>`)}</tr></thead>
      <tbody>
        ${i.map(l=>{let d=this.plants.get(l.plant_id);return o`<tr><th scope="row"><button class="crop linklike" title=${this.t("lib.open_plant")} @click=${()=>this.emit("open-plant",l.plant_id)}>${d?D(N(d),d.color||z(this.families,d.family),20):u}
            ${y(d,this.lang)}</button><span class="xs muted">${l.beds.join(", ")}</span></th>
            ${t.map((p,m)=>{let v=l.months[String(m+1)]??[],b=n.find(x=>v.includes(x));return o`<td class=${`${b??""} ${m===s?"now":""}`} title=${v.map(x=>this.t(`cal.act.${x}`)).join(", ")}>
                ${b&&b!=="grow"?this.t(`cal.act_short.${b}`):""}</td>`})}</tr>`})}
        <tr class="tasks-row"><th scope="row">${this.t("cal.tasks_per_month")}</th>${e.tasks.map((l,d)=>o`<td class=${d===s?"now":""}>${l||""}
          ${e.minutes[d]?o`<span class="xs muted"> · ${this.t("cal.hours",{n:Math.max(1,Math.round(e.minutes[d]/60))})}</span>`:u}</td>`)}</tr>
      </tbody></table>
      <div class="legend year-legend">${n.map(l=>o`<span><i class=${`sw ${l}`}></i> ${this.t(`cal.act.${l}`)}</span>`)}</div>
    </div>`}willUpdate(){this.cursor||(this.cursor=this.today)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get today(){return this.snapshot.analysis?.today??Ue(new Date)}get tasks(){return this.snapshot.tasks.filter(e=>(this.showDone||e.status==="open")&&e.status!=="skipped"&&(!this.bedFilter||e.bed_id===this.bedFilter))}byDay(){let e=new Map;for(let t of dt(this.tasks)){let s=t.status==="open"&&t.due<this.today?this.today:t.due;e.set(s,[...e.get(s)??[],t])}return e}move(e){let t=pe(this.cursor);this.mode==="timeline"?t.setFullYear(t.getFullYear()+e):this.mode==="month"?t.setMonth(t.getMonth()+e,1):t.setDate(t.getDate()+e*(this.mode==="week"?7:30)),this.cursor=Ue(t)}weekStart(e){let s=(pe(e).getDay()+6)%7;return H(e,-s)}renderEvent(e){let t=e.status==="open"&&e.due<this.today;return o`<button class="ev ${e.status!=="open"?"done":""} ${t?"overdue":""}" style=${`border-left-color:${Fe[e.type]??"var(--hl-soil-500)"}`}
      title=${e.title} @click=${()=>this.emit("open-task",e)}>
      <ha-icon icon=${Le[e.type]}></ha-icon><span>${e.title}</span></button>`}renderMonth(){let e=pe(this.cursor);e.setDate(1);let t=this.weekStart(Ue(e)),s=e.getMonth(),n=Array.from({length:42},(l,d)=>H(t,d)),a=this.byDay(),i=Array.from({length:7},(l,d)=>_(H(t,d),this.lang,{weekday:"short"}));return o`<div class="month" role="grid">
      ${i.map(l=>o`<div class="dow" role="columnheader">${l}</div>`)}
      ${n.map(l=>{let d=a.get(l)??[];return o`<div class="cell ${pe(l).getMonth()!==s?"other":""} ${l===this.today?"today":""}" role="gridcell" aria-label=${_(l,this.lang,{day:"numeric",month:"long"})}>
          <span class="num">${pe(l).getDate()}</span>
          ${d.slice(0,4).map(p=>this.renderEvent(p))}
          ${d.length>4?o`<button class="more" @click=${()=>{this.cursor=l,this.mode="week"}}>+${d.length-4}</button>`:u}
        </div>`})}
    </div>`}renderWeek(){let e=this.weekStart(this.cursor),t=this.byDay();return o`<div class="week">
      ${Array.from({length:7},(s,n)=>H(e,n)).map(s=>o`
        <div class="col ${s===this.today?"today":""}">
          <b class="small">${_(s,this.lang,{weekday:"long",day:"numeric",month:"short"})}</b>
          ${(t.get(s)??[]).map(n=>this.renderEvent(n))}
        </div>`)}
    </div>`}renderList(){let e={t:this.t,lang:this.lang,today:this.today,onOpen:n=>this.emit("open-task",n),onComplete:n=>this.emit("complete-task",n),onPostpone:(n,a)=>this.emit("postpone-task",{task:n,days:a}),plantOf:Ht(this.snapshot,this.plants,this.families)},t=this.byDay(),s=[...t.keys()].filter(n=>n>=this.cursor).sort().slice(0,30);return s.length?o`${s.map(n=>o`<div class="group">
      <h3>${n===this.today?this.t("common.today"):_(n,this.lang,{weekday:"long",day:"numeric",month:"long"})}</h3>
      <ul class="tasks">${t.get(n).map(a=>ut(a,e))}</ul></div>`)}`:o`<p class="empty">–</p>`}renderTimeline(){let e=this.snapshot.analysis;if(!e)return o`<p class="empty">–</p>`;let t=Number(this.cursor.slice(0,4))||e.season,s=this.snapshot.settings.region.hemisphere==="south",n=s?`${t}-07-01`:`${t}-01-01`,a=s?`${t+1}-06-30`:`${t}-12-31`,i=ye(n,a)+1,l=$=>$?Math.max(0,Math.min(100,ye(n,$)/i*100)):null,d=($,T,L,k,Y)=>{let ce=l($),te=l(T);return ce===null||te===null||te<=0||ce>=100?u:o`<div class="g-bar ${L}" title=${Y} style=${`left:${ce}%;width:${Math.max(te-ce,.6)}%;${k}`}></div>`},p=Array.from({length:12},($,T)=>{let L=pe(n);return L.setMonth(L.getMonth()+T,1),Ue(L)}),m=this.snapshot.plantings.filter($=>$.season===t&&e.timelines[$.id]&&(!this.bedFilter||$.bed_id===this.bedFilter)),v=this.snapshot.beds.filter($=>m.some(T=>T.bed_id===$.id)),b=this.snapshot.tasks.filter($=>$.key?.startsWith("m:")&&$.due>=n&&$.due<=a&&(this.showDone||$.status==="open")),x=o`
      ${!e.anchors.frost_free&&l(e.anchors.last_frost)!==null?o`<div class="g-line" style=${`left:${l(e.anchors.last_frost)}%`} title=${this.t("cal.last_frost")}></div>`:u}
      ${!e.anchors.frost_free&&l(e.anchors.first_frost)!==null?o`<div class="g-line" style=${`left:${l(e.anchors.first_frost)}%`} title=${this.t("cal.first_frost")}></div>`:u}
      ${this.today>=n&&this.today<=a?o`<div class="g-line today" style=${`left:${l(this.today)}%`} title=${this.t("common.today")}></div>`:u}`;return o`<div class="gantt"><div class="gantt-inner" role="table" aria-label=${this.t("cal.timeline")}>
      <div class="g-row head" role="row"><div class="g-label">${this.t("common.season",{year:t})}</div>
        <div class="g-track">${p.map($=>o`<span class="g-month" style=${`left:${l($)}%`}>${_($,this.lang,{month:"short"})}</span>`)}</div></div>
      ${b.length?o`<div class="g-row" role="row"><div class="g-label"><ha-icon icon="mdi:calendar-sync-outline"></ha-icon>${this.t("cal.garden_work")}</div>
        <div class="g-track">${x}${b.map($=>o`<button class="g-task" style=${`left:${l($.due)}%;color:${Fe[$.type]??"var(--hl-soil-500)"}`}
          title=${`${_($.due,this.lang)} \xB7 ${$.title}`} @click=${()=>this.emit("open-task",$)}><ha-icon icon=${Le[$.type]}></ha-icon></button>`)}</div></div>`:u}
      ${v.map($=>o`
        <div class="g-row bed" role="row"><div class="g-label">${$.name}</div><div class="g-track">${x}</div></div>
        ${m.filter(T=>T.bed_id===$.id).sort((T,L)=>e.timelines[T.id].in_ground<e.timelines[L.id].in_ground?-1:1).map(T=>{let L=e.timelines[T.id],k=this.plants.get(T.plant_id),Y=z(this.families,k?.family),ce=y(k,this.lang),te=e.phenology?.[T.id];return o`<div class="g-row" role="row">
            <div class="g-label"><span class="family-dot" style=${`background:${Y};width:10px;height:10px`}></span>${ce}
              ${te&&te.stage!=="not_planted"&&te.stage!=="finished"?o`<span class="xs muted">· ${this.t(`stage.${te.stage}`)}</span>`:u}</div>
            <div class="g-track">${x}
              ${L.sow_date&&L.sow_date<L.in_ground?d(L.sow_date,L.in_ground,"sow",`background:${Y}`,`${this.t("lib.indoor_sow")}: ${_(L.sow_date,this.lang)}`):u}
              ${d(L.in_ground,L.harvest_start,"",`background:color-mix(in srgb, ${Y} 35%, transparent);border:1px solid ${Y}`,`${_(L.in_ground,this.lang)} \u2013 ${_(L.harvest_start,this.lang)}`)}
              ${d(L.harvest_start,L.harvest_end,"",`background:${Y}`,`${this.t("lib.harvest")}: ${_(L.harvest_start,this.lang)} \u2013 ${_(L.harvest_end,this.lang)}`)}
              ${te?.harvest_estimate&&l(te.harvest_estimate)!==null?o`<span class="g-mark" style=${`left:${l(te.harvest_estimate)}%`}
                title=${this.t("cal.harvest_estimate",{date:_(te.harvest_estimate,this.lang)})}></span>`:u}
            </div></div>`})}`)}
      ${v.length?u:o`<p class="empty">${this.t("cal.no_plantings")}</p>`}
      <div class="g-legend">
        <span><i style="background:var(--hl-leaf-300);height:4px"></i>${this.t("lib.indoor_sow")}</span>
        <span><i style="background:color-mix(in srgb, var(--hl-leaf-500) 35%, transparent);border:1px solid var(--hl-leaf-500)"></i>${this.t("cal.growing")}</span>
        <span><i style="background:var(--hl-leaf-600)"></i>${this.t("lib.harvest")}</span>
        <span><i style="width:10px;height:10px;transform:rotate(45deg);background:var(--hl-text)"></i>${this.t("cal.harvest_estimate_short")}</span>
        <span><i style="border-left:2px dashed var(--hl-frost-500);width:2px;height:12px;border-radius:0"></i>${this.t("cal.frost_dates")}</span>
      </div>
    </div></div>`}render(){let e=this.mode==="timeline"||this.mode==="year"?this.t("common.season",{year:this.mode==="year"?this.year?.season??Number(this.cursor.slice(0,4)):Number(this.cursor.slice(0,4))}):this.mode==="month"?_(this.cursor,this.lang,{month:"long",year:"numeric"}):`${_(this.weekStart(this.cursor),this.lang)} \u2013 ${_(H(this.weekStart(this.cursor),6),this.lang)}`;return o`
      <div class="bar">
        <button class="icon-btn" aria-label=${this.t("cal.prev")} @click=${()=>this.move(-1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
        <button class="btn small" @click=${()=>this.cursor=this.today}>${this.t("common.today")}</button>
        <button class="icon-btn" aria-label=${this.t("cal.next")} @click=${()=>this.move(1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
        <h2 aria-live="polite">${e}</h2>
        <span class="spacer"></span>
        <div class="row" role="group">
          ${["month","week","list","timeline","year"].map(t=>o`<button class="chip" aria-pressed=${String(this.mode===t)}
            @click=${()=>{this.mode=t,t==="year"&&this.loadYear()}}>${this.t(`cal.${t}`)}</button>`)}
        </div>
        <label class="row small"><span class="visually-hidden">${this.t("task.bed")}</span>
          <select style="width:auto" @change=${t=>this.bedFilter=t.target.value}>
            ${[{id:"",name:this.t("cal.all_beds")},...this.snapshot.beds].map(t=>o`<option value=${t.id} ?selected=${t.id===this.bedFilter}>${t.name}</option>`)}
          </select>
        </label>
        <label class="row small"><input type="checkbox" .checked=${this.showDone} @change=${t=>this.showDone=t.target.checked} />${this.t("cal.show_done")}</label>
        <button class="btn primary small" @click=${()=>this.emit("new-task",null)}><ha-icon icon="mdi:plus"></ha-icon>${this.t("cal.add_task")}</button>
      </div>
      ${this.mode==="month"?this.renderMonth():this.mode==="week"?this.renderWeek():this.mode==="timeline"?this.renderTimeline():this.mode==="year"?this.renderYear():this.renderList()}
    `}};V.styles=[R,It,S`
      .bar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--hl-s2); margin-bottom: var(--hl-s3); }
      .bar h2 { min-width: 200px; text-transform: capitalize; }
      .year-wrap { overflow-x: auto; padding: var(--hl-s3); }
      table.year { border-collapse: separate; border-spacing: 2px; width: 100%; min-width: 720px; font-size: var(--hl-fs-sm); }
      table.year th { text-align: left; font-weight: 600; padding: 4px 6px; white-space: nowrap; }
      table.year thead th { text-align: center; color: var(--hl-text-muted); text-transform: capitalize; }
      table.year th[scope="row"] { display: flex; flex-direction: column; gap: 0; }
      table.year .crop { display: inline-flex; gap: 6px; align-items: center; }
      .linklike { border: 0; background: none; padding: 0; font: inherit; color: inherit; cursor: pointer; text-align: left; }
      .linklike:hover { text-decoration: underline; }
      table.year td { height: 30px; border-radius: 6px; background: var(--hl-surface-2); text-align: center; font-size: 11px; font-weight: 700; color: #fff; }
      table.year td.now, table.year th.now { outline: 2px solid var(--hl-focus); outline-offset: -2px; }
      table.year td.grow, .sw.grow { background: color-mix(in srgb, var(--hl-leaf-500) 25%, var(--hl-surface-2)); color: var(--hl-text); }
      table.year td.sow_indoor, .sw.sow_indoor { background: var(--hl-leaf-300); color: var(--hl-text); }
      table.year td.sow, .sw.sow { background: var(--hl-leaf-500); }
      table.year td.plant, .sw.plant { background: var(--hl-leaf-700); }
      table.year td.harvest, .sw.harvest { background: var(--hl-sun-500); color: #3a2a00; }
      table.year .tasks-row td { background: transparent; color: var(--hl-text); font-weight: 600; }
      .year-legend { display: flex; flex-wrap: wrap; gap: var(--hl-s3); margin-top: var(--hl-s2); font-size: var(--hl-fs-sm); }
      .year-legend .sw { display: inline-block; width: 14px; height: 10px; border-radius: 3px; vertical-align: middle; }
      .month { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 1px; background: var(--hl-border); border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); overflow: hidden; }
      .dow { background: var(--hl-surface-2); padding: 6px; font-size: var(--hl-fs-xs); font-weight: 600; color: var(--hl-text-muted); text-transform: uppercase; text-align: center; }
      .cell { background: var(--hl-surface); min-height: 108px; padding: 4px; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .cell.other { background: var(--hl-surface-2); }
      .cell.other .num { opacity: 0.5; }
      .cell.today { box-shadow: inset 0 0 0 2px var(--hl-primary); }
      .num { font-size: var(--hl-fs-xs); font-weight: 600; color: var(--hl-text-muted); padding: 2px 4px; }
      .ev { display: flex; align-items: center; gap: 4px; border: 0; border-left: 3px solid; background: var(--hl-surface-2); border-radius: 4px;
        padding: 2px 4px; font-size: 11px; text-align: left; cursor: pointer; color: var(--hl-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; --mdc-icon-size: 12px; }
      .ev:hover { background: var(--hl-surface-3); }
      .ev.done { opacity: 0.55; text-decoration: line-through; }
      .ev.overdue { background: var(--hl-tomato-100); }
      .more { font-size: 11px; color: var(--hl-text-muted); border: 0; background: transparent; cursor: pointer; text-align: left; padding: 0 4px; }
      .week { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: var(--hl-s2); }
      .week .col { background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s2); min-height: 260px; display: flex; flex-direction: column; gap: 4px; }
      .week .col.today { border-color: var(--hl-primary); }
      .week .ev { white-space: normal; }
      @media (max-width: 900px) {
        .week { grid-template-columns: 1fr; }
        .cell { min-height: 64px; }
        .ev span { display: none; }
      }
      .group h3 { margin: var(--hl-s3) 0 var(--hl-s1); font-size: var(--hl-fs-md); }
      .gantt { background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); overflow-x: auto; }
      .gantt-inner { min-width: 860px; position: relative; padding-bottom: var(--hl-s2); }
      .g-row { display: grid; grid-template-columns: 220px 1fr; align-items: center; min-height: 26px; border-bottom: 1px solid var(--hl-border); }
      .g-row.head { position: sticky; top: 0; background: var(--hl-surface-2); z-index: 1; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); font-weight: 600; }
      .g-row.bed { background: var(--hl-surface-2); font-weight: 700; font-size: var(--hl-fs-sm); }
      .g-label { padding: 2px var(--hl-s2); font-size: var(--hl-fs-sm); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: flex; gap: 6px; align-items: center; }
      .g-track { position: relative; height: 26px; }
      .g-bar { position: absolute; top: 6px; height: 14px; border-radius: 4px; }
      .g-bar.sow { top: 10px; height: 6px; opacity: 0.6; }
      .g-mark { position: absolute; top: 4px; width: 10px; height: 10px; transform: translateX(-5px) rotate(45deg); background: var(--hl-text); border: 2px solid var(--hl-surface); }
      .g-month { position: absolute; top: 0; bottom: 0; border-left: 1px solid var(--hl-border); padding-left: 4px; }
      .g-line { position: absolute; top: 0; bottom: 0; width: 0; border-left: 2px dashed var(--hl-frost-500); pointer-events: none; }
      .g-line.today { border-left: 2px solid var(--hl-tomato-500); }
      .g-task { position: absolute; top: 3px; transform: translateX(-10px); border: 0; background: transparent; cursor: pointer; --mdc-icon-size: 18px; padding: 0; }
      .g-legend { display: flex; gap: var(--hl-s3); flex-wrap: wrap; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); padding: var(--hl-s2); }
      .g-legend span { display: inline-flex; gap: 4px; align-items: center; }
      .g-legend i { display: inline-block; width: 18px; height: 8px; border-radius: 3px; }
    `],h([g({attribute:!1})],V.prototype,"snapshot",2),h([g({attribute:!1})],V.prototype,"t",2),h([g()],V.prototype,"lang",2),h([g({attribute:!1})],V.prototype,"plants",2),h([g({attribute:!1})],V.prototype,"families",2),h([f()],V.prototype,"mode",2),h([f()],V.prototype,"cursor",2),h([f()],V.prototype,"showDone",2),h([f()],V.prototype,"bedFilter",2),h([g({attribute:!1})],V.prototype,"api",2),h([f()],V.prototype,"year",2),V=h([M("hl-calendar-view")],V);var Ca=["nl_be","uk_south","uk_north","de_central","fr_north","scandinavia_south","mediterranean","au_melbourne","nz_christchurch","za_highveld"],Aa={nl_be:"Nederland / Vlaanderen",uk_south:"UK (south)",uk_north:"UK (north)",de_central:"Deutschland (Mitte)",fr_north:"France (nord)",scandinavia_south:"Scandinavia (south)",mediterranean:"Mediterranean",au_melbourne:"Australia \u2013 Melbourne",nz_christchurch:"New Zealand \u2013 Christchurch",za_highveld:"South Africa \u2013 Highveld"},Ha=Array.from({length:13},(c,r)=>[`${r+1}a`,`${r+1}b`]).flat(),Ia={soil_moisture:{domains:["sensor"],deviceClass:"moisture"},soil_temperature:{domains:["sensor"],deviceClass:"temperature"},air_temperature:{domains:["sensor"],deviceClass:"temperature"},air_humidity:{domains:["sensor"],deviceClass:"humidity"},light:{domains:["sensor"],deviceClass:"illuminance"},rain:{domains:["sensor","binary_sensor"]},par:{domains:["sensor"]},ec:{domains:["sensor"],deviceClass:"conductivity"},npk_n:{domains:["sensor"]},npk_p:{domains:["sensor"]},npk_k:{domains:["sensor"]},leaf_wetness:{domains:["sensor","binary_sensor"]}},Na=["fresh","storage","herbs","pollinators","winter","perennials","easy"],de=class extends E{constructor(){super(...arguments);this.lang="en";this.admin=!0;this.busy=!1;this.testing="";this.testResult={}}entityOptions(e){let t=Object.values(this.hass?.states??{}),s=e==="weather"?{domains:["weather"]}:e==="irrigation"?{domains:["switch","valve","input_boolean"]}:e==="tts"?{domains:["tts"]}:e==="media_player"?{domains:["media_player"]}:e==="vent"?{domains:["cover","switch","fan"]}:e==="shade"?{domains:["cover","switch"]}:e==="pump"?{domains:["switch","valve","input_boolean"]}:e==="meter"||e==="butt"?{domains:["sensor","input_number"]}:Ia[e];return t.filter(n=>s.domains.includes(n.entity_id.split(".")[0])).filter(n=>!("deviceClass"in s)||!s.deviceClass||n.attributes.device_class===s.deviceClass).map(n=>n.entity_id).sort()}entityInput(e,t,s,n,a){let i=`list-${t}`,l=s?this.hass?.states[s]:void 0;return o`<label class="field">${a}
      <input list=${i} .value=${s??""} placeholder=${`${{weather:"weather",irrigation:"switch",tts:"tts",media_player:"media_player",vent:"cover"}[t]??"sensor"}.\u2026`} ?disabled=${!this.admin} id=${e}
        aria-invalid=${s&&!l?"true":"false"}
        @change=${d=>n(d.target.value.trim()||null)} />
      ${s?o`<span class="state">${l?`${l.state} ${l.attributes.unit_of_measurement??""}`:"\u26A0 not found"}</span>`:u}
    </label>`}datalists(){return o`${["soil_moisture","soil_temperature","air_temperature","air_humidity","light","rain","par","ec","npk_n","npk_p","npk_k","leaf_wetness","weather","irrigation","tts","media_player","vent","shade","pump","meter","butt"].map(t=>o`<datalist id=${`list-${t}`}>${this.entityOptions(t).map(s=>o`<option value=${s}></option>`)}</datalist>`)}`}async saveSettings(e){this.busy=!0;try{await this.api.saveSettings(e),this.toast(this.t("settings.saved"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}finally{this.busy=!1}}async savePlan(e){let t=structuredClone({zones:this.snapshot.zones,beds:this.snapshot.beds,plantings:this.snapshot.plantings,features:this.snapshot.features??[]});e(t);try{await this.api.savePlan(t,this.snapshot.revision),this.toast(this.t("settings.saved"))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}valveTest(e,t=!0){if(!e||!this.admin)return u;let s=this.testResult[e];return o`<div class="field valve-test">
      <span>&nbsp;</span>
      <div class="row wrap" style="gap:6px;align-items:center">
        <button class="btn small" type="button" ?disabled=${!!this.testing} @click=${()=>this.runValveTest(e,t)}>
          <ha-icon icon="mdi:valve"></ha-icon>${this.testing===e?this.t("valve.testing"):this.t("valve.test")}</button>
        ${s?o`<span class="small">${s}</span>`:u}
      </div>
    </div>`}async runValveTest(e,t){if(confirm(this.t("valve.test_confirm",{entity:e}))){this.testing=e;try{let s=await this.api.irrigationTest(e,5,t),n=s.ok?this.t("valve.test_ok",{open:s.open_state??"?",closed:s.closed_state??"?"}):s.opened?this.t("valve.test_no_close",{state:s.closed_state??"?"}):this.t("valve.test_no_open",{state:s.open_state??"?"});this.testResult={...this.testResult,[e]:`${s.ok?"\u2705":"\u26A0\uFE0F"} ${n}`}}catch(s){let n=s.code;this.testResult={...this.testResult,[e]:`\u26A0\uFE0F ${n==="unknown_entity"?this.t("valve.test_save_first"):s.message}`}}finally{this.testing=""}}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}renderRegion(){let e=this.snapshot.settings.region,t=this.snapshot.analysis?.anchors,s=n=>this.saveSettings({region:n});return o`<section class="card stack" aria-labelledby="s-region">
      <h2 id="s-region">${this.t("settings.region")}</h2>
      <div class="form-grid">
        <label class="field">${this.t("settings.hemisphere")}
          <select ?disabled=${!this.admin} @change=${n=>s({hemisphere:n.target.value})}>
            ${["north","south"].map(n=>o`<option value=${n} ?selected=${e.hemisphere===n}>${this.t(`settings.hemisphere.${n}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("settings.mode")}
          <select ?disabled=${!this.admin} @change=${n=>s({mode:n.target.value})}>
            ${["preset","usda","custom"].map(n=>o`<option value=${n} ?selected=${e.mode===n}>${this.t(`settings.mode.${n}`)}</option>`)}
          </select></label>
        ${e.mode==="preset"?o`<label class="field full">${this.t("settings.preset")}
          <select ?disabled=${!this.admin} @change=${n=>s({preset:n.target.value})}>
            ${Ca.map(n=>o`<option value=${n} ?selected=${e.preset===n}>${Aa[n]}</option>`)}</select></label>`:u}
        ${e.mode==="usda"?o`<label class="field full">${this.t("settings.zone")}
          <select ?disabled=${!this.admin} @change=${n=>s({hardiness_zone:n.target.value})}>
            ${Ha.map(n=>o`<option value=${n} ?selected=${e.hardiness_zone===n}>${n}</option>`)}</select></label>`:u}
        ${e.mode==="custom"?o`
          <label class="field">${this.t("settings.last_frost")}<input pattern="\\d{2}-\\d{2}" .value=${e.last_frost} ?disabled=${!this.admin}
            @change=${n=>n.target.checkValidity()&&s({last_frost:n.target.value})} /></label>
          <label class="field">${this.t("settings.first_frost")}<input pattern="\\d{2}-\\d{2}" .value=${e.first_frost} ?disabled=${!this.admin}
            @change=${n=>n.target.checkValidity()&&s({first_frost:n.target.value})} /></label>`:u}
      </div>
      ${t?o`<p class="small muted">${this.t("settings.frost_dates_now",{last:_(t.last_frost,this.lang,{day:"numeric",month:"long"}),first:_(t.first_frost,this.lang,{day:"numeric",month:"long",year:"numeric"})})}</p>`:u}
    </section>`}renderWeather(){let e=this.snapshot.settings;return o`<section class="card stack" aria-labelledby="s-weather">
      <h2 id="s-weather">${this.t("settings.weather")}</h2>
      ${this.entityInput("w","weather",e.weather_entity,t=>this.saveSettings({weather_entity:t}),this.t("settings.weather_entity"))}
      ${this.entityInput("ot","air_temperature",e.outdoor_sensors.air_temperature,t=>this.saveSettings({outdoor_sensors:{air_temperature:t}}),this.t("settings.outdoor_temp"))}
      ${this.entityInput("rn","rain",e.outdoor_sensors.rain,t=>this.saveSettings({outdoor_sensors:{rain:t}}),this.t("settings.rain"))}
      ${this.entityInput("oh","air_humidity",e.outdoor_sensors.air_humidity,t=>this.saveSettings({outdoor_sensors:{air_humidity:t}}),this.t("settings.sensor.air_humidity"))}
      ${this.entityInput("lw","leaf_wetness",e.outdoor_sensors.leaf_wetness,t=>this.saveSettings({outdoor_sensors:{leaf_wetness:t}}),this.t("settings.sensor.leaf_wetness"))}
      <label class="field check"><input type="checkbox" .checked=${!!e.open_meteo} ?disabled=${!this.admin}
        @change=${t=>this.saveSettings({open_meteo:t.target.checked})} />${this.t("settings.open_meteo")}</label>
      <p class="xs muted">${this.t("settings.open_meteo_hint")}</p>
      <label class="field">${this.t("settings.elevation")}<input type="number" step="1" .value=${String(e.elevation_m??"")} ?disabled=${!this.admin}
        @change=${t=>this.saveSettings({elevation_m:t.target.value===""?null:Number(t.target.value)})} /></label>
      ${this.snapshot.weather.error?o`<p class="small" style="color:var(--hl-warning)">⚠ ${this.snapshot.weather.error}</p>`:u}
    </section>`}renderZones(){let e=(t,s)=>this.savePlan(n=>s(n.zones.find(a=>a.id===t)));return o`<section class="card stack" aria-labelledby="s-zones">
      <h2 id="s-zones">${this.t("settings.zones")}</h2>
      ${this.snapshot.zones.map(t=>o`<div class="item">
        <h4><ha-icon icon=${t.type==="outdoor"?"mdi:tree-outline":"mdi:greenhouse"}></ha-icon>${t.name}<span class="chip">${this.t(`settings.zone_type.${t.type}`)}</span></h4>
        <div class="form-grid">
          ${["air_temperature","air_humidity","light"].map(s=>this.entityInput(`${t.id}-${s}`,s,t.sensors[s],n=>e(t.id,a=>a.sensors[s]=n),this.t(`settings.sensor.${s}`)))}
          ${this.entityInput(`${t.id}-lw`,"leaf_wetness",t.sensors.leaf_wetness,s=>e(t.id,n=>n.sensors.leaf_wetness=s),this.t("settings.sensor.leaf_wetness"))}
          ${this.entityInput(`${t.id}-par`,"par",t.sensors.par,s=>e(t.id,n=>n.sensors.par=s),this.t("settings.sensor.par"))}
          ${t.type!=="outdoor"?o`
            ${this.entityInput(`${t.id}-vent`,"vent",t.vent_entity,s=>e(t.id,n=>n.vent_entity=s),this.t("settings.vent"))}
            ${this.entityInput(`${t.id}-shade`,"shade",t.shade_entity,s=>e(t.id,n=>n.shade_entity=s),this.t("settings.shade_entity"))}
            <label class="field">${this.t("settings.climate_control")}
              <select ?disabled=${!this.admin} @change=${s=>e(t.id,n=>n.climate_control=s.target.value)}>
                ${["off","advise","auto"].map(s=>o`<option value=${s} ?selected=${(t.climate_control??"advise")===s}>${this.t(`settings.climate_control.${s}`)}</option>`)}
              </select></label>
            <label class="field check"><input type="checkbox" .checked=${!!t.microclimate.thermal_mass} ?disabled=${!this.admin}
              @change=${s=>e(t.id,n=>n.microclimate.thermal_mass=s.target.checked)} />${this.t("settings.thermal_mass")}</label>`:u}
          <label class="field check"><input type="checkbox" .checked=${!!t.microclimate.wall_heat} ?disabled=${!this.admin}
            @change=${s=>e(t.id,n=>n.microclimate.wall_heat=s.target.checked)} />${this.t("settings.wall_heat")}</label>
          <label class="field check"><input type="checkbox" .checked=${t.microclimate.heated} ?disabled=${!this.admin}
            @change=${s=>e(t.id,n=>n.microclimate.heated=s.target.checked)} />${this.t("settings.heated")}</label>
          ${t.microclimate.heated?o`<label class="field">${this.t("settings.min_heating")}<input type="number" step="0.5" .value=${String(t.microclimate.min_heating_temp_c??5)}
            @change=${s=>e(t.id,n=>n.microclimate.min_heating_temp_c=Number(s.target.value))} /></label>`:u}
        </div>
      </div>`)}
    </section>`}renderBeds(){let e=(t,s)=>this.savePlan(n=>s(n.beds.find(a=>a.id===t)));return o`<section class="card stack" aria-labelledby="s-beds">
      <h2 id="s-beds">${this.t("settings.beds")}</h2>
      ${this.snapshot.beds.map(t=>o`<div class="item">
        <h4><ha-icon icon="mdi:sprout-outline"></ha-icon>${t.name}<span class="chip">${Math.round(t.width_cm)} × ${Math.round(t.length_cm)} cm</span></h4>
        <div class="form-grid">
          ${["soil_moisture","soil_temperature","ec","npk_n","npk_p","npk_k"].map(s=>this.entityInput(`${t.id}-${s}`,s,t.sensors[s],n=>e(t.id,a=>a.sensors[s]=n),this.t(`settings.sensor.${s}`)))}
          ${this.entityInput(`${t.id}-irr`,"irrigation",t.irrigation_entity,s=>e(t.id,n=>n.irrigation_entity=s),this.t("settings.irrigation"))}
          ${this.valveTest(t.irrigation_entity)}
          <label class="field">${this.t("settings.flow")}<input type="number" min="0" step="0.1" .value=${String(t.irrigation_flow_lpm??"")} ?disabled=${!this.admin}
            @change=${s=>e(t.id,n=>n.irrigation_flow_lpm=Number(s.target.value)||null)} /></label>
        </div>
      </div>`)}
    </section>`}renderIrrigation(){let e=this.snapshot.settings.irrigation??{mode:"advise",pump_entity:null,start_time:"06:00",max_runtime_min:30,frost_lockout_c:2,rain_skip_mm:3,pump_lead_s:3},t=a=>this.saveSettings({irrigation:a}),s=(a,i,l=1,d=0,p=999)=>o`<label class="field">${i}
      <input type="number" step=${l} min=${d} max=${p} .value=${String(e[a])}
        @change=${m=>t({[a]:Number(m.target.value)})} /></label>`,n=this.snapshot.beds.filter(a=>a.irrigation_entity).length;return o`<section class="card stack" aria-labelledby="s-irrigation">
      <h2 id="s-irrigation">${this.t("settings.irrigation_hw")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></h2>
      <div class="form-grid">
        <label class="field full">${this.t("settings.irrigation_mode")}
          <select @change=${a=>t({mode:a.target.value})}>
            ${["off","advise","auto"].map(a=>o`<option value=${a} ?selected=${e.mode===a}>${this.t(`settings.irrigation_mode.${a}`)}</option>`)}
          </select></label>
        ${this.entityInput("pump","pump",e.pump_entity,a=>t({pump_entity:a}),this.t("settings.pump"))}
        ${this.valveTest(e.pump_entity,!1)}
        <label class="field">${this.t("settings.start_time")}<input type="time" .value=${e.start_time}
          @change=${a=>t({start_time:a.target.value})} /></label>
        ${s("max_runtime_min",this.t("settings.max_runtime"),1,1,180)}
        ${s("frost_lockout_c",this.t("settings.frost_lockout"),.5,-5,10)}
        ${s("rain_skip_mm",this.t("settings.rain_skip"),.5,0,30)}
        ${s("pump_lead_s",this.t("settings.pump_lead"),.5,0,30)}
      </div>
      <p class="xs muted">${this.t("settings.irrigation_hint",{n})}</p>
    </section>`}renderResources(){let e=this.snapshot.settings,t=e.resources??{household_size:2,hours_per_week:3,water_liters_per_week:null,compost_kg:null,irrigation:!1,goals:["fresh","herbs"],wanted:[],excluded:[]},s=a=>this.saveSettings({resources:a}),n=a=>s({goals:t.goals.includes(a)?t.goals.filter(i=>i!==a):[...t.goals,a]});return o`<section class="card stack" aria-labelledby="s-resources">
      <h2 id="s-resources">${this.t("settings.resources")} <hl-info term="autofill" .t=${this.t}></hl-info></h2>
      <div class="form-grid">
        <label class="field">${this.t("autofill.household")}<input type="number" min="1" max="20" .value=${String(t.household_size)}
          @change=${a=>s({household_size:Number(a.target.value)})} /></label>
        <label class="field">${this.t("autofill.hours")}<input type="number" min="0" step="0.5" .value=${String(t.hours_per_week)}
          @change=${a=>s({hours_per_week:Number(a.target.value)})} /></label>
        <label class="field">${this.t("autofill.water")}<input type="number" min="0" step="10" .value=${String(t.water_liters_per_week??"")}
          @change=${a=>s({water_liters_per_week:a.target.value===""?null:Number(a.target.value)})} /></label>
        <label class="field">${this.t("autofill.compost")}<input type="number" min="0" step="5" .value=${String(t.compost_kg??"")}
          @change=${a=>s({compost_kg:a.target.value===""?null:Number(a.target.value)})} /></label>
        <label class="field check full"><input type="checkbox" .checked=${t.irrigation}
          @change=${a=>s({irrigation:a.target.checked})} />${this.t("autofill.has_irrigation")}</label>
      </div>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.goals")}>
        ${Na.map(a=>o`<button class="chip ${t.goals.includes(a)?"active":""}" aria-pressed=${String(t.goals.includes(a))} @click=${()=>n(a)}>${this.t(`autofill.goal.${a}`)}</button>`)}
      </div>
      <label class="field check"><input type="checkbox" .checked=${e.maintenance_tasks??!0}
        @change=${a=>this.saveSettings({maintenance_tasks:a.target.checked})} />${this.t("settings.maintenance_tasks")}</label>
    </section>`}renderNotifications(){let e=this.snapshot.settings.notifications,t=a=>this.saveSettings({notifications:a}),s=a=>a.split(",").map(i=>i.trim()).filter(Boolean),n=Object.keys(this.hass?.services?.notify??{}).map(a=>`notify.${a}`);return o`<section class="card stack" aria-labelledby="s-notify">
      <h2 id="s-notify">${this.t("settings.notifications")}</h2>
      <label class="field check"><input type="checkbox" .checked=${e.persistent} @change=${a=>t({persistent:a.target.checked})} />${this.t("settings.persistent")}</label>
      <label class="field">${this.t("settings.notify_services")}
        <input list="notify-services" .value=${e.notify_services.join(", ")} @change=${a=>t({notify_services:s(a.target.value)})} />
        <datalist id="notify-services">${n.map(a=>o`<option value=${a}></option>`)}</datalist></label>
      ${this.entityInput("tts","tts",e.tts_entity,a=>t({tts_entity:a}),this.t("settings.tts"))}
      <label class="field">${this.t("settings.tts_players")}<input list="list-media_player" .value=${e.tts_media_players.join(", ")}
        @change=${a=>t({tts_media_players:s(a.target.value)})} /></label>
      <div class="form-grid">
        <label class="field">${this.t("settings.digest")}<input type="time" .value=${e.digest_time} @change=${a=>t({digest_time:a.target.value})} /></label>
        <span></span>
        <label class="field check"><input type="checkbox" .checked=${e.frost_alerts} @change=${a=>t({frost_alerts:a.target.checked})} />${this.t("settings.frost_alerts")}</label>
        <label class="field check"><input type="checkbox" .checked=${e.heat_alerts} @change=${a=>t({heat_alerts:a.target.checked})} />${this.t("settings.heat_alerts")}</label>
        <label class="field check full"><input type="checkbox" .checked=${e.tts_frost_announcement} @change=${a=>t({tts_frost_announcement:a.target.checked})} />${this.t("settings.tts_frost")}</label>
      </div>
      <h3>${this.t("settings.reminders")}</h3>
      <div class="form-grid">
        <label class="field check"><input type="checkbox" .checked=${e.overdue_reminders??!0} @change=${a=>t({overdue_reminders:a.target.checked})} />${this.t("settings.overdue_reminders")}</label>
        <label class="field">${this.t("settings.overdue_time")}<input type="time" .value=${e.overdue_time??"18:30"} @change=${a=>t({overdue_time:a.target.value})} /></label>
        <label class="field">${this.t("settings.overdue_after")}<input type="number" min="0" max="14" .value=${String(e.overdue_after_days??1)} @change=${a=>t({overdue_after_days:Number(a.target.value)})} /></label>
        <span></span>
        <label class="field check"><input type="checkbox" .checked=${e.weekly_plan??!0} @change=${a=>t({weekly_plan:a.target.checked})} />${this.t("settings.weekly_plan")}</label>
        <label class="field">${this.t("settings.weekly_day")}<select @change=${a=>t({weekly_plan_weekday:Number(a.target.value)})}>
          ${[0,1,2,3,4,5,6].map(a=>o`<option value=${a} ?selected=${(e.weekly_plan_weekday??6)===a}>${new Date(2024,0,1+a).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{weekday:"long"})}</option>`)}
        </select></label>
        <label class="field">${this.t("settings.weekly_time")}<input type="time" .value=${e.weekly_plan_time??"19:00"} @change=${a=>t({weekly_plan_time:a.target.value})} /></label>
      </div>
      <label class="field check"><input type="checkbox" .checked=${this.snapshot.settings.weather_aware_scheduling??!0}
        @change=${a=>this.saveSettings({weather_aware_scheduling:a.target.checked})} />${this.t("settings.weather_aware")}</label>
      <p class="xs muted">${this.t("settings.weather_aware_hint")}</p>
    </section>`}renderWater(){let e=this.snapshot.settings.water??{meter_entity:null,butt_level_entity:null,butt_capacity_l:0},t=s=>this.saveSettings({water:s});return o`<section class="card stack" aria-labelledby="s-water">
      <h2 id="s-water">${this.t("settings.water")}</h2>
      <div class="form-grid">
        ${this.entityInput("meter","meter",e.meter_entity,s=>t({meter_entity:s}),this.t("settings.water_meter"))}
        ${this.entityInput("butt","butt",e.butt_level_entity,s=>t({butt_level_entity:s}),this.t("settings.butt_level"))}
        <label class="field">${this.t("settings.butt_capacity")}<input type="number" min="0" step="50" .value=${String(e.butt_capacity_l??0)}
          @change=${s=>t({butt_capacity_l:Number(s.target.value)||0})} /></label>
      </div>
      <p class="xs muted">${this.t("settings.water_hint")}</p>
    </section>`}renderHousehold(){let e=this.snapshot.settings,t=e.assignment??{},s=e.person_notify??{},n=pt(),a=Object.keys(this.hass?.services?.notify??{}).map(d=>`notify.${d}`),i=["water","harvest","sow_indoor","sow_direct","transplant","weed","pest_check","feed","ventilate","prune","clean_greenhouse","tool_care"],l=d=>o`<select @change=${p=>this.saveSettings({assignment:{[d]:p.target.value}})}>
      <option value="" ?selected=${!t[d]}>${this.t(d==="*"?"settings.nobody":"settings.default_person")}</option>
      ${n.map(p=>o`<option value=${p.id} ?selected=${t[d]===p.id}>${p.name}</option>`)}</select>`;return o`<section class="card stack" aria-labelledby="s-household">
      <h2 id="s-household">${this.t("settings.household")}</h2>
      ${n.length===0?o`<p class="small muted">${this.t("settings.no_persons")}</p>`:o`
        <label class="field">${this.t("settings.assign_default")}${l("*")}</label>
        <details><summary class="small">${this.t("settings.assign_per_type")}</summary>
          <div class="form-grid" style="margin-top:8px">${i.map(d=>o`<label class="field">${this.t(`type.${d}`)}${l(d)}</label>`)}</div>
        </details>
        <h3>${this.t("settings.person_notify")}</h3>
        <datalist id="notify-person">${a.map(d=>o`<option value=${d}></option>`)}</datalist>
        <div class="form-grid">${n.map(d=>o`<label class="field">${d.name}
          <input list="notify-person" placeholder="notify.mobile_app_…" .value=${s[d.id]??""}
            @change=${p=>this.saveSettings({person_notify:{[d.id]:p.target.value.trim()}})} /></label>`)}</div>
        <p class="xs muted">${this.t("settings.person_notify_hint")}</p>`}
      <h3>${this.t("settings.voice")}</h3>
      <p class="xs muted">${this.t("settings.voice_hint")}</p>
      <div class="row wrap">
        <button class="btn small" @click=${()=>this.installVoice()}><ha-icon icon="mdi:microphone-message"></ha-icon>${this.t("settings.voice_install")}</button>
      </div>
    </section>`}async installVoice(){try{await this.hass.callService("garden_manager","install_voice_sentences",{overwrite:!0}),this.toast(this.t("settings.voice_installed"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}}renderGeneral(){let e=this.snapshot.settings;return o`<section class="card stack" aria-labelledby="s-general">
      <h2 id="s-general">${this.t("settings.general")}</h2>
      <div class="form-grid">
        <label class="field">${this.t("settings.language")}
          <select @change=${t=>this.saveSettings({language:t.target.value||null})}>
            <option value="" ?selected=${!e.language}>${this.t("settings.language.auto")}</option>
            <option value="en" ?selected=${e.language==="en"}>English</option>
            <option value="nl" ?selected=${e.language==="nl"}>Nederlands</option>
          </select></label>
        <label class="field">${this.t("settings.units")}<input disabled .value=${this.t("settings.units_metric")} /></label>
        <label class="field">${this.t("settings.snap")}<input type="number" min="1" max="50" .value=${String(e.snap_cm)}
          @change=${t=>this.saveSettings({snap_cm:Number(t.target.value)})} /></label>
        <label class="field">${this.t("settings.radius")}<input type="number" min="10" max="300" step="5" .value=${String(e.companion_radius_cm)}
          @change=${t=>this.saveSettings({companion_radius_cm:Number(t.target.value)})} /></label>
      </div>
      <h3>${this.t("settings.data")}</h3>
      <div class="row wrap">
        <button class="btn small" @click=${()=>this.export("json")}><ha-icon icon="mdi:code-json"></ha-icon>${this.t("planner.export_json")}</button>
        <button class="btn small" @click=${()=>this.export("yaml")}><ha-icon icon="mdi:code-braces"></ha-icon>${this.t("planner.export_yaml")}</button>
      </div>
    </section>`}async export(e){let t=await this.api.exportPlan(e,!0);Ge(t.filename,t.content,e==="json"?"application/json":"application/yaml")}render(){return o`
      ${this.admin?u:o`<p class="small" style="color:var(--hl-warning);margin-bottom:12px">${this.t("common.admin_only")}</p>`}
      <fieldset ?disabled=${!this.admin||this.busy} style="border:0;padding:0;margin:0">
        <div class="sections">
          ${this.renderRegion()} ${this.renderWeather()} ${this.renderZones()} ${this.renderBeds()} ${this.renderIrrigation()}
          ${this.renderResources()} ${this.renderNotifications()} ${this.renderWater()} ${this.renderHousehold()} ${this.renderGeneral()}
        </div>
      </fieldset>
      <section class="card stack" style="margin-top:var(--hl-s4)" aria-labelledby="s-display">
        <h2 id="s-display">${this.t("settings.display")}</h2>
        <label class="field check"><input type="checkbox" .checked=${ht()}
          @change=${e=>ds(e.target.checked)} />${this.t("settings.photos")}</label>
        <p class="xs muted">${this.t("settings.photos_hint")}</p>
      </section>
      ${this.datalists()}
    `}};de.styles=[R,S`
      .sections { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: var(--hl-s4); align-items: start; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .item { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); display: flex; flex-direction: column; gap: var(--hl-s2); background: var(--hl-surface-2); }
      .item h4 { display: flex; align-items: center; gap: var(--hl-s2); }
      .check { flex-direction: row !important; align-items: center; gap: var(--hl-s2) !important; color: var(--hl-text) !important; }
      .state { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
    `],h([g({attribute:!1})],de.prototype,"snapshot",2),h([g({attribute:!1})],de.prototype,"hass",2),h([g({attribute:!1})],de.prototype,"api",2),h([g({attribute:!1})],de.prototype,"t",2),h([g()],de.prototype,"lang",2),h([g({type:Boolean})],de.prototype,"admin",2),h([f()],de.prototype,"busy",2),h([f()],de.prototype,"testing",2),h([f()],de.prototype,"testResult",2),de=h([M("hl-settings-view")],de);var gt=c=>c.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");function we(c){let r=[],e=/(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g,t=0,s;for(;s=e.exec(c);)s.index>t&&r.push(c.slice(t,s.index)),s[2]!==void 0?r.push(o`<strong>${s[2]}</strong>`):s[3]!==void 0?r.push(o`<em>${s[3]}</em>`):r.push(o`<code>${s[4]}</code>`),t=s.index+s[0].length;return t<c.length&&r.push(c.slice(t)),r}function jn(c){return c.split(`
`).filter(r=>/^#{2,3} /.test(r)).map(r=>{let e=r.startsWith("### ")?3:2,t=r.replace(/^#+ /,"").trim();return{level:e,text:t,id:gt(t)}})}var Pn=c=>c.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(r=>r.trim());function Rn(c){let r=c.replace(/\r/g,"").split(`
`),e=[],t=0;for(;t<r.length;){let s=r[t];if(!s.trim()){t++;continue}let n=/^(#{1,4}) (.*)$/.exec(s);if(n){let i=n[2].trim(),l=Math.min(Math.max(n[1].length,2),4);e.push(l===2?o`<h2 id=${gt(i)}>${we(i)}</h2>`:l===3?o`<h3 id=${gt(i)}>${we(i)}</h3>`:o`<h4>${we(i)}</h4>`),t++;continue}if(s.trim().startsWith("|")){let i=[];for(;t<r.length&&r[t].trim().startsWith("|");)i.push(r[t++]);let[l,,...d]=i,m=i[1]!==void 0&&/^\s*\|?\s*:?-{2,}/.test(i[1])?d:i.slice(1);e.push(o`<div class="table-wrap"><table>
        <thead><tr>${Pn(l).map(v=>o`<th>${we(v)}</th>`)}</tr></thead>
        <tbody>${m.map(v=>o`<tr>${Pn(v).map(b=>o`<td>${we(b)}</td>`)}</tr>`)}</tbody>
      </table></div>`);continue}if(/^\s*([-*]|\d+\.) /.test(s)){let i=/^\s*\d+\. /.test(s),l=[];for(;t<r.length&&/^\s*([-*]|\d+\.) /.test(r[t]);)l.push(r[t].replace(/^\s*([-*]|\d+\.) /,"")),t++;let d=l.map(p=>o`<li>${we(p)}</li>`);e.push(i?o`<ol>${d}</ol>`:o`<ul>${d}</ul>`);continue}let a=[];for(;t<r.length&&r[t].trim()&&!/^(#{1,4} |\s*\||\s*([-*]|\d+\.) )/.test(r[t]);)a.push(r[t++].trim());e.push(o`<p>${we(a.join(" "))}</p>`)}return e.length?o`${e}`:o`${u}`}var C="#5a9a3c",ee="#d9412b",Ee="#ef8a1e",Ft="#7a4aa0",ft="#f2c230",Dt='<circle cx="178" cy="16" r="9" fill="#f6cf4a"/><g stroke="#f6cf4a" stroke-width="2" stroke-linecap="round"><path d="M178 2v-2M178 32v2M164 16h-2M192 16h2M168 6l-1.5-1.5M188 6l1.5-1.5"/></g>',Oa=`<g stroke="#5b9fd4" stroke-width="2" stroke-linecap="round"><path d="M30 8l-3 7M44 12l-3 7M58 6l-3 7M72 11l-3 7"/></g>
  <path d="M22 8q6-8 14-3 6-6 13 0 8-2 9 5H22z" fill="#cfe1ef"/>`,Ba=`<path d="M118 62V34l26-16 26 16v28z" fill="#e6f2fb" fill-opacity=".7" stroke="#7fa9c9" stroke-width="1.6"/>
  <path d="M144 18v44M131 26v36M157 26v36M118 46h52" stroke="#7fa9c9" stroke-width="1"/>`,Ln=`<g transform="translate(150 34)"><path d="M0 8h22l-2 20H2z" fill="#4c8fbf"/><path d="M22 12l14-8" stroke="#4c8fbf" stroke-width="3" stroke-linecap="round"/>
  <path d="M5 8q6-10 12 0" fill="none" stroke="#2d6a96" stroke-width="2"/><g fill="#7fb6d9"><circle cx="40" cy="8" r="1.4"/><circle cx="43" cy="13" r="1.2"/><circle cx="40" cy="17" r="1"/></g></g>`,Da=`<path d="M140 64l10-22h28l10 22z" fill="#7a5a3a"/><path d="M146 52h36M143 58h42" stroke="#5c442a" stroke-width="1.4"/>
  <path d="M154 40q8-10 16 0" fill="none" stroke="#6aa648" stroke-width="2"/>`,Fa=`<g transform="translate(150 22)"><ellipse cx="10" cy="10" rx="9" ry="8" fill="${ee}"/><path d="M10 2v16" stroke="#222" stroke-width="1.2"/>
  <circle cx="10" cy="2.5" r="3.2" fill="#222"/><g fill="#222"><circle cx="6" cy="8" r="1.6"/><circle cx="14" cy="8" r="1.6"/><circle cx="6" cy="14" r="1.4"/><circle cx="14" cy="14" r="1.4"/></g></g>`,Ua=`<g transform="translate(150 30)"><path d="M2 14q12-20 24 0z" fill="#c8506a"/><rect x="11" y="13" width="6" height="12" rx="2" fill="#efe3cf"/>
  <g fill="#fff"><circle cx="9" cy="9" r="1.6"/><circle cx="17" cy="7" r="1.4"/><circle cx="21" cy="11" r="1.2"/></g></g>`,Ga=`<g transform="translate(144 34)"><path d="M2 10h36l-5 20H7z" fill="#b5843a"/><path d="M6 10q14-18 28 0" fill="none" stroke="#8a6238" stroke-width="2.5"/>
  <path d="M6 17h28M8 23h24" stroke="#8a6238" stroke-width="1.2"/><circle cx="14" cy="9" r="4" fill="${ee}"/><circle cx="23" cy="8" r="4.4" fill="${Ee}"/><circle cx="30" cy="10" r="3.4" fill="${Ft}"/></g>`,Cn=`<g transform="translate(146 26)"><rect width="22" height="30" rx="2" fill="#efe3cf" stroke="#b3a283"/><circle cx="11" cy="12" r="6" fill="${ft}"/>
  <g fill="#8a6a45"><ellipse cx="32" cy="24" rx="2" ry="1.2"/><ellipse cx="37" cy="28" rx="2" ry="1.2"/><ellipse cx="30" cy="30" rx="2" ry="1.2"/></g></g>`,An='<g transform="translate(160 14) rotate(20)"><rect x="3" width="3" height="30" fill="#8a6238"/><path d="M-2 30h13l-1 14q-5 4-11 0z" fill="#9aa3a0"/></g>',Wa=`<g fill="none" stroke="#6a84c0" stroke-width="2.2" stroke-linecap="round"><path d="M150 26a16 16 0 0 1 28 6"/><path d="M178 44a16 16 0 0 1-28-6"/></g>
  <path d="M176 26l3 7 5-5zM152 44l-3-7-5 5z" fill="#6a84c0"/>`,qa='<path d="M100 22c-4-6-12-2-10 4 1 4 10 10 10 10s9-6 10-10c2-6-6-10-10-4z" fill="#e06aa0"/>',Hn='<g stroke="#9cc1de" stroke-width="1.6" stroke-linecap="round"><path d="M178 8v16M170 16h16M172 10l12 12M184 10l-12 12"/></g>',Za=`<g transform="translate(150 20)"><rect width="16" height="24" rx="3" fill="#3a4a42"/><rect x="3" y="4" width="10" height="8" rx="1" fill="#9fe0a0"/>
  <rect x="6" y="24" width="4" height="18" fill="#8a8f8c"/><path d="M22 6a10 10 0 0 1 0 12M26 2a16 16 0 0 1 0 20" fill="none" stroke="#6a84c0" stroke-width="1.6" stroke-linecap="round"/></g>`,Ka='<path d="M0 66q50-6 100 0t100 0v14H0z" fill="#c9a86a"/><g stroke="#a8873f" stroke-width="1.2"><path d="M12 70l8-2M40 72l9 1M80 69l7 2M120 71l8-1M160 70l9 1"/></g>',Ya=`<g transform="translate(150 26)"><rect x="2" y="6" width="22" height="30" rx="4" fill="#cfe7f6" fill-opacity=".8" stroke="#7fa9c9"/>
  <rect y="0" width="26" height="7" rx="2" fill="#c8506a"/><path d="M6 20h14M6 26h14" stroke="#5a9a3c" stroke-width="2"/></g>`,ks={planning:{sky:"#eaf4e1",ground:"#8a6a45",pieces:[["carrot",Ee,14,1],["lettuce",C,32,.9],["tomato",ee,50,1],["bean",C,68,1.1]],extra:Dt},soil:{sky:"#f3ece0",ground:"#6b4f32",pieces:[["potato","#c9a46a",20,.9],["clover",C,40,.9],["leafy",C,58,.9]],extra:An},sowing:{sky:"#eef6e8",ground:"#8a6a45",pieces:[["pea",C,16,.8],["lettuce",C,34,.7],["root","#c84a6a",52,.8]],extra:Cn},watering:{sky:"#e6f1fa",ground:"#7a5d3e",pieces:[["cucumber",C,20,1],["chard",ee,40,1],["lettuce",C,60,.9]],extra:Oa+Ln},fertilizing:{sky:"#f1efe2",ground:"#7a5a3a",pieces:[["cabbage",C,18,1],["pumpkin",Ee,40,1],["leek",C,60,1]],extra:Da},rotation:{sky:"#eaf0f8",ground:"#8a6a45",pieces:[["potato","#c9a46a",14,.9],["bean",C,32,1],["cabbage",C,50,1],["onion","#b07a3a",68,.9]],extra:Wa},companions:{sky:"#f6eef3",ground:"#8a6a45",pieces:[["tomato",ee,30,1.1],["herb",C,60,.9],["flower",Ee,76,.8]],extra:qa},greenhouse:{sky:"#e8f3f8",ground:"#7a5d3e",pieces:[["pepper",ee,14,1],["eggplant",Ft,34,1],["tomato",ee,54,.9]],extra:Ba},pests:{sky:"#eef5e6",ground:"#7a5d3e",pieces:[["cabbage",C,18,1],["lettuce",C,40,.9],["flower",ft,60,.8]],extra:Fa},diseases:{sky:"#efeee8",ground:"#6b4f32",pieces:[["tomato",ee,18,1],["potato","#c9a46a",40,.9],["leafy",C,60,.9]],extra:Ua},seasons:{sky:"#eef2f7",ground:"#8a6a45",pieces:[["kale",C,16,1],["leek",C,34,1],["sprouts",C,52,1]],extra:Hn},harvest:{sky:"#fbf1df",ground:"#8a6a45",pieces:[["corn",ft,14,1.1],["pumpkin",Ee,34,1],["tomato",ee,54,.9]],extra:Ga},seeds:{sky:"#f7f1e2",ground:"#8a6a45",pieces:[["sunflower",ft,18,1.2],["bean",C,40,1],["umbel","#e8e2c8",60,.9]],extra:Cn},nodig:{sky:"#f3efe4",ground:"#8a6a45",pieces:[["lettuce",C,20,.9],["chard",ee,40,1],["kale",C,60,1]],extra:Ka},herbs:{sky:"#eef4ec",ground:"#7a5d3e",pieces:[["herb",C,16,1],["lavender",Ft,34,1],["umbel","#e8e2c8",52,1],["herb","#4f8a34",70,.8]],extra:Dt},perennials:{sky:"#eef4ec",ground:"#7a5d3e",pieces:[["rhubarb",ee,18,1.1],["asparagus",C,40,1],["artichoke","#6f8f6a",60,1]]},fruit:{sky:"#f4f0e8",ground:"#6f9a45",pieces:[["tree_apple",ee,16,1.4],["berry_bush",Ft,42,1],["strawberry",ee,62,.8]],extra:Dt},tools:{sky:"#f0efea",ground:"#8a6a45",pieces:[["leafy",C,24,.9],["carrot",Ee,46,.9]],extra:An+`<g transform="translate(-30 0)">${Ln}</g>`},home_remedies:{sky:"#f4eef4",ground:"#7a5d3e",pieces:[["herb",C,18,1],["flower",Ee,38,.9],["garlic","#efe3cf",58,.9]],extra:Ya},year_round:{sky:"#eef2f7",ground:"#8a6a45",pieces:[["leek",C,14,1],["kale",C,32,1],["tomato",ee,50,.9],["lettuce",C,68,.8]],extra:Dt+`<g transform="translate(-40 0)">${Hn}</g>`},sensors:{sky:"#e9f0f4",ground:"#7a5d3e",pieces:[["lettuce",C,20,.9],["tomato",ee,42,1],["pepper",ee,62,.9]],extra:Za}},In={sky:"#eef4ec",ground:"#8a6a45",pieces:[["leafy",C,24,1],["carrot",Ee,44,1],["flower",ft,64,.8]]};function Nn(c){let r=c.pieces.map(([e,t,s,n])=>{let a=34*n,i=Ae[e]??Ae.leafy;return`<g transform="translate(${s/100*200-a/2} ${64-a}) scale(${a/24})" style="color:${t}">${i}</g>`}).join("");return`<rect width="200" height="80" fill="${c.sky}"/>${c.extra??""}
    <path d="M0 62q50-5 100 0t100 0v18H0z" fill="${c.ground}"/>
    <path d="M0 64q50-5 100 0t100 0" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.5"/>${r}`}function vt(c,r=120){let e=ks[c]??In,t=Nn(e);return o`<svg class="chapter-art" viewBox="0 0 200 80" preserveAspectRatio="xMidYMid slice" width="100%" height=${r}
    aria-hidden="true">${We(t)}</svg>`}var Vl=Object.keys(ks);function On(c,r=190){let e=ks[c]??In,t=`display:block;line-height:0;background:linear-gradient(to bottom, ${e.sky} 78%, ${e.ground} 78%)`;return o`<span class="chapter-banner" style=${t}>
    <svg viewBox="0 0 200 80" preserveAspectRatio="xMidYMax meet" width="100%" style=${`max-height:${r}px;aspect-ratio:5/2;display:block;margin:0 auto`}
      aria-hidden="true">${We(Nn(e))}</svg></span>`}var Xa={planning:"mdi:clipboard-text-outline",soil:"mdi:shovel",sowing:"mdi:seed-outline",watering:"mdi:watering-can-outline",fertilizing:"mdi:bottle-tonic-plus-outline",rotation:"mdi:rotate-3d-variant",companions:"mdi:handshake-outline",greenhouse:"mdi:greenhouse",pests:"mdi:bug-outline",diseases:"mdi:mushroom-outline",seasons:"mdi:calendar-sync-outline",harvest:"mdi:basket-outline",seeds:"mdi:seed",nodig:"mdi:layers-outline",herbs:"mdi:leaf",perennials:"mdi:flower-outline"},J=class extends E{constructor(){super(...arguments);this.lang="en";this.chapterId="";this.narrow=!1;this.chapters=[];this.glossary={};this.body="";this.loadedId="";this.query="";this.results=[];this.showGlossary=!1}willUpdate(e){(e.has("api")||e.has("lang"))&&this.api&&this.loadIndex(),(e.has("chapterId")||e.has("lang"))&&this.api&&this.chapterId&&this.chapterId!==this.loadedId&&this.loadChapter(this.chapterId)}async loadIndex(){let e=await this.api.handbookIndex(this.lang);this.chapters=e.chapters,this.glossary=e.glossary}async loadChapter(e){try{let t=await this.api.handbookChapter(e,this.lang);this.body=t.body,this.loadedId=e,this.updateComplete.then(()=>this.renderRoot.querySelector("article")?.scrollIntoView({block:"start"}))}catch{this.body="",this.loadedId=""}}open(e){this.showGlossary=!1,this.query="",this.results=[],this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e},bubbles:!0,composed:!0}))}onSearch(e){if(this.query=e,window.clearTimeout(this.searchTimer),!e.trim()){this.results=[];return}this.searchTimer=window.setTimeout(async()=>{let t=(await this.api.handbookSearch(e,this.lang)).results;e===this.query&&(this.results=t)},200)}renderToc(){return o`<nav class="toc card" aria-label=${this.t("handbook.contents")}>
      <input class="search" type="search" placeholder=${this.t("handbook.search")} .value=${this.query}
        @input=${e=>this.onSearch(e.target.value)} aria-label=${this.t("handbook.search")} />
      <a aria-current=${!this.chapterId&&!this.showGlossary?"page":"false"} @click=${()=>this.open("")}>
        <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("handbook.overview")}</a>
      ${this.chapters.map(e=>o`<a aria-current=${e.id===this.chapterId&&!this.showGlossary?"page":"false"} @click=${()=>this.open(e.id)}>
        <span class="num">${e.order}</span>${e.title}</a>`)}
      <a aria-current=${this.showGlossary?"page":"false"} @click=${()=>this.showGlossary=!0}>
        <ha-icon icon="mdi:alphabetical-variant"></ha-icon>${this.t("handbook.glossary")}</a>
    </nav>`}renderBody(){if(this.query.trim())return o`<article class="card"><h1>${this.t("handbook.results",{query:this.query})}</h1>
        ${this.results.length?this.results.map(a=>o`<div class="hit" @click=${()=>this.open(a.id)}><b>${a.title}</b><p class="small muted">…${a.snippet}…</p></div>`):o`<p class="muted">${this.t("handbook.no_results")}</p>`}</article>`;if(this.showGlossary){let a=Object.entries(this.glossary).sort((i,l)=>i[1].term.localeCompare(l[1].term,this.lang));return o`<article class="card"><h1>${this.t("handbook.glossary")}</h1>
        <dl class="gloss">${a.map(([,i])=>o`<dt>${i.term}</dt><dd>${i.text}
          ${i.chapter?o` <a href="#" @click=${l=>{l.preventDefault(),this.open(i.chapter)}}>→ ${this.chapters.find(l=>l.id===i.chapter)?.title??i.chapter}</a>`:u}</dd>`)}</dl>
      </article>`}if(!this.chapterId)return o`<article style="max-width:none">
        <h1>${this.t("handbook.title")}</h1>
        <p class="muted">${this.t("handbook.intro")}</p>
        <div class="grid">${this.chapters.map(a=>o`<button class="card tile" @click=${()=>this.open(a.id)}>
          <span class="art">${vt(a.id,96)}</span>
          <span class="txt"><h3><ha-icon icon=${Xa[a.id]??"mdi:book-outline"}></ha-icon>${a.title}</h3>
          <p class="small muted">${we(a.summary)}</p></span></button>`)}</div>
      </article>`;let e=this.chapters.find(a=>a.id===this.chapterId),t=this.chapters.findIndex(a=>a.id===this.chapterId),s=t>0?this.chapters[t-1]:void 0,n=t>=0&&t<this.chapters.length-1?this.chapters[t+1]:void 0;return o`<article class="card">
      <span class="banner">${On(this.chapterId)}</span>
      <h1>${e?.title??""}</h1>
      <div class="sections">${jn(this.body).filter(a=>a.level===2).map(a=>o`<a class="chip" href=${`#${a.id}`}
        @click=${i=>{i.preventDefault(),this.renderRoot.querySelector(`#${CSS.escape(gt(a.text))}`)?.scrollIntoView({behavior:"smooth"})}}>${a.text}</a>`)}</div>
      ${this.loadedId===this.chapterId?Rn(this.body):o`<p class="muted">${this.t("common.loading")}</p>`}
      <div class="row" style="margin-top:var(--hl-s5)">
        ${s?o`<button class="btn small ghost" @click=${()=>this.open(s.id)}>← ${s.title}</button>`:u}
        <span class="spacer"></span>
        ${n?o`<button class="btn small" @click=${()=>this.open(n.id)}>${n.title} →</button>`:u}
      </div>
    </article>`}render(){let e=this.narrow&&(this.chapterId||this.showGlossary)?o`<details class="toc-wrap card"><summary><ha-icon icon="mdi:format-list-bulleted"></ha-icon>${this.t("handbook.contents")}</summary>${this.renderToc()}</details>`:this.renderToc();return o`<div class="layout ${this.narrow?"narrow":""}">${e}${this.renderBody()}</div>`}};J.styles=[R,S`
      .layout { display: grid; grid-template-columns: 280px 1fr; gap: var(--hl-s4); align-items: start; }
      .layout.narrow { grid-template-columns: 1fr; }
      nav.toc { position: sticky; top: 72px; display: flex; flex-direction: column; gap: 2px; max-height: calc(100vh - 100px); overflow: auto; }
      nav.toc a { display: flex; gap: var(--hl-s2); align-items: center; padding: 8px 10px; border-radius: var(--hl-r-md); color: var(--hl-text); text-decoration: none; cursor: pointer; --mdc-icon-size: 18px; }
      nav.toc a:hover { background: var(--hl-surface-2); }
      nav.toc a[aria-current="page"] { background: var(--hl-leaf-100); color: var(--hl-chip-active-fg); font-weight: 600; }
      nav.toc .num { color: var(--hl-text-muted); font-variant-numeric: tabular-nums; width: 1.6em; }
      article { max-width: 820px; line-height: 1.6; scroll-margin-top: 72px; }
      a.chip { text-decoration: none; color: inherit; }
      .layout.narrow nav.toc { position: static; max-height: none; }
      details.toc-wrap > summary { cursor: pointer; font-weight: 600; padding: var(--hl-s2) var(--hl-s3); list-style: none; display: flex; gap: var(--hl-s2); align-items: center; }
      article h1 { font-size: var(--hl-fs-2xl); margin: 0 0 var(--hl-s2); }
      article h2 { margin: var(--hl-s5) 0 var(--hl-s2); font-size: var(--hl-fs-xl); scroll-margin-top: 72px; }
      article h3 { margin: var(--hl-s4) 0 var(--hl-s2); scroll-margin-top: 72px; }
      article p, article li { font-size: var(--hl-fs-md, 15px); }
      article ul, article ol { padding-left: 1.4em; }
      .table-wrap { overflow-x: auto; margin: var(--hl-s3) 0; }
      table { border-collapse: collapse; width: 100%; font-size: var(--hl-fs-sm); }
      th, td { text-align: left; padding: 6px 10px; border-bottom: 1px solid var(--hl-border); vertical-align: top; }
      th { background: var(--hl-surface-2); }
      code { background: var(--hl-surface-2); padding: 1px 5px; border-radius: 4px; }
      .sections { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: var(--hl-s3); }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--hl-s3); }
      .tile { cursor: pointer; text-align: left; display: flex; flex-direction: column; justify-content: flex-start; color: var(--hl-text); font: inherit; }
      .tile { padding: 0; overflow: hidden; }
      .tile .art { display: block; line-height: 0; }
      .tile .txt { padding: var(--hl-s3) var(--hl-s4); }
      .banner { display: block; line-height: 0; border-radius: var(--hl-r-md); overflow: hidden; margin: 0 0 var(--hl-s3); }
      .tile h3 { display: flex; gap: var(--hl-s2); align-items: center; margin: 0 0 6px; --mdc-icon-size: 20px; }
      .hit { padding: var(--hl-s2) 0; border-bottom: 1px solid var(--hl-border); cursor: pointer; }
      dl.gloss dt { font-weight: 700; margin-top: var(--hl-s3); }
      dl.gloss dd { margin: 2px 0 0; }
      .search { width: 100%; }
    `],h([g({attribute:!1})],J.prototype,"api",2),h([g({attribute:!1})],J.prototype,"t",2),h([g()],J.prototype,"lang",2),h([g()],J.prototype,"chapterId",2),h([g({type:Boolean})],J.prototype,"narrow",2),h([f()],J.prototype,"chapters",2),h([f()],J.prototype,"glossary",2),h([f()],J.prototype,"body",2),h([f()],J.prototype,"loadedId",2),h([f()],J.prototype,"query",2),h([f()],J.prototype,"results",2),h([f()],J.prototype,"showGlossary",2),J=h([M("hl-handbook-view")],J);var Ja=[{id:"garden",icon:"mdi:floor-plan"},{id:"zone",icon:"mdi:greenhouse"},{id:"beds",icon:"mdi:sprout-outline"},{id:"tasks",icon:"mdi:format-list-checks"},{id:"season",icon:"mdi:chart-gantt"},{id:"year",icon:"mdi:calendar-month"},{id:"blank",icon:"mdi:draw"},{id:"plants",icon:"mdi:card-text-outline"}],Qa=["remarkable","a4","a3","a5","letter"],Bn="hortulus.print",oe=class extends E{constructor(){super(...arguments);this.lang="en";this.narrow=!1;this.admin=!0;this.opts={document:"garden",page:"remarkable",landscape:!1,color_mode:"eink",days:28,notes:!0,grid:!0,labels:!0};this.pages=[];this.busy=!1;this.error=""}connectedCallback(){super.connectedCallback();try{let e=JSON.parse(localStorage.getItem(Bn)??"null");e&&(this.opts={...this.opts,...e})}catch{}}willUpdate(e){e.has("api")&&this.api&&!this.pages.length&&this.schedule(0)}set(e,t){this.opts={...this.opts,[e]:t},e==="page"&&t==="remarkable"&&this.opts.color_mode==="color"&&(this.opts={...this.opts,color_mode:"eink"});try{localStorage.setItem(Bn,JSON.stringify({...this.opts,bed_ids:null,zone_id:null,title:null}))}catch{}this.schedule()}schedule(e=350){window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>this.preview(),e)}async preview(){this.busy=!0,this.error="";try{this.pages=(await this.api.printPreview(this.payload())).pages}catch(e){this.error=e.message??String(e)}finally{this.busy=!1}}payload(){let e={...this.opts};return e.document!=="zone"&&delete e.zone_id,e.document!=="beds"&&delete e.bed_ids,e.title||delete e.title,e}async download(){this.busy=!0;try{let{blob:e,filename:t}=await this.api.printPdf(this.payload()),s=URL.createObjectURL(e),n=document.createElement("a");n.href=s,n.download=t,n.click(),setTimeout(()=>URL.revokeObjectURL(s),2e3)}catch(e){this.toast(this.t("common.error",{message:e.message}))}finally{this.busy=!1}}async saveToConfig(){try{await this.api.exportPdfToConfig(this.payload()),this.toast(this.t("print.saved_to_config"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}renderForm(){let e=this.opts,t=this.snapshot.analysis?.season??new Date().getFullYear(),s=this.snapshot.zones;return o`<section class="card stack" aria-label=${this.t("print.options")}>
      <h2>${this.t("print.document")}</h2>
      <div class="docs" role="group">
        ${Ja.map(n=>o`<button class="doc" aria-pressed=${String(e.document===n.id)} @click=${()=>this.set("document",n.id)}>
          <ha-icon icon=${n.icon}></ha-icon><b>${this.t(`print.doc.${n.id}`)}</b><small>${this.t(`print.doc.${n.id}.hint`)}</small></button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("print.page")}
          <select @change=${n=>this.set("page",n.target.value)}>
            ${Qa.map(n=>o`<option value=${n} ?selected=${e.page===n}>${this.t(`print.page.${n}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("print.orientation")}
          <select @change=${n=>this.set("landscape",n.target.value==="landscape")}>
            <option value="portrait" ?selected=${!e.landscape}>${this.t("print.portrait")}</option>
            <option value="landscape" ?selected=${e.landscape}>${this.t("print.landscape")}</option>
          </select></label>
        <label class="field">${this.t("print.colors")}
          <select @change=${n=>this.set("color_mode",n.target.value)}>
            ${["color","eink","grayscale"].map(n=>o`<option value=${n} ?selected=${e.color_mode===n}>${this.t(`print.color.${n}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("planner.season")}
          <select @change=${n=>this.set("season",Number(n.target.value))}>
            ${[t-1,t,t+1].map(n=>o`<option value=${n} ?selected=${(e.season??t)===n}>${n}</option>`)}
          </select></label>
        ${e.document==="zone"||e.document==="blank"?o`<label class="field full">${this.t("planner.zone")}
          <select @change=${n=>this.set("zone_id",n.target.value||null)}>
            <option value="">${this.t(e.document==="zone"?"print.all_greenhouses":"print.all_zones")}</option>
            ${s.map(n=>o`<option value=${n.id} ?selected=${e.zone_id===n.id}>${n.name}</option>`)}
          </select></label>`:u}
        ${e.document==="beds"?o`<fieldset class="full" style="border:0;padding:0;margin:0">
          <legend class="small muted">${this.t("print.beds")}</legend>
          <div class="row wrap">${this.snapshot.beds.map(n=>{let a=!e.bed_ids||e.bed_ids.includes(n.id);return o`<button class="chip" aria-pressed=${String(a)} @click=${()=>{let i=this.snapshot.beds.map(p=>p.id),l=e.bed_ids??i,d=a?l.filter(p=>p!==n.id):[...l,n.id];this.set("bed_ids",d.length===i.length?null:d)}}>${n.name}</button>`})}</div></fieldset>`:u}
        ${e.document==="tasks"?o`<label class="field">${this.t("print.days")}<input type="number" min="1" max="120" .value=${String(e.days)}
          @change=${n=>this.set("days",Number(n.target.value))} /></label>`:u}
        <label class="field full">${this.t("print.title")}<input .value=${e.title??""} placeholder=${this.t(`print.doc.${e.document}`)}
          @change=${n=>this.set("title",n.target.value||null)} /></label>
        <label class="field check"><input type="checkbox" .checked=${e.notes} @change=${n=>this.set("notes",n.target.checked)} />${this.t("print.notes")}</label>
        <label class="field check"><input type="checkbox" .checked=${e.grid} @change=${n=>this.set("grid",n.target.checked)} />${this.t("print.grid")}</label>
        <label class="field check full"><input type="checkbox" .checked=${e.labels} @change=${n=>this.set("labels",n.target.checked)} />${this.t("print.labels")}</label>
      </div>
      ${e.page==="remarkable"?o`<div class="rm"><ha-icon icon="mdi:tablet"></ha-icon><span>${this.t("print.remarkable_hint")}</span></div>`:u}
      <div class="row wrap">
        <button class="btn primary" ?disabled=${this.busy} @click=${()=>this.download()}><ha-icon icon="mdi:file-pdf-box"></ha-icon>${this.t("print.download")}</button>
        <button class="btn" ?disabled=${this.busy} @click=${()=>this.preview()}><ha-icon icon="mdi:refresh"></ha-icon>${this.t("print.refresh")}</button>
        ${this.admin?o`<button class="btn ghost" @click=${()=>this.saveToConfig()}><ha-icon icon="mdi:folder-download-outline"></ha-icon>${this.t("print.save_config")}</button>`:u}
      </div>
    </section>`}render(){return o`<div class="layout ${this.narrow?"narrow":""}">
      ${this.renderForm()}
      <section class="preview" aria-label=${this.t("print.preview")} aria-busy=${String(this.busy)}>
        ${this.error?o`<p class="small" style="color:var(--hl-danger)">${this.error}</p>`:u}
        ${this.pages.length?this.pages.map((e,t)=>o`<figure class="sheet" style="margin:0">${ln(e)}
            <figcaption class="num">${this.t("print.page_n",{n:t+1,total:this.pages.length})}</figcaption></figure>`):o`<p class="muted">${this.busy?this.t("common.loading"):this.t("print.empty")}</p>`}
      </section>
    </div>`}};oe.styles=[R,S`
      .layout { display: grid; grid-template-columns: 340px 1fr; gap: var(--hl-s4); align-items: start; }
      .layout.narrow { grid-template-columns: 1fr; }
      .docs { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
      .doc { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 10px; border-radius: var(--hl-r-md); border: 1px solid var(--hl-border);
        background: var(--hl-surface); cursor: pointer; text-align: left; color: var(--hl-text); --mdc-icon-size: 20px; }
      .doc[aria-pressed="true"] { border-color: var(--hl-leaf-500); background: var(--hl-leaf-100); }
      .doc small { color: var(--hl-text-muted); font-size: var(--hl-fs-xs); }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .full { grid-column: 1 / -1; }
      .check { flex-direction: row !important; align-items: center; gap: var(--hl-s2) !important; color: var(--hl-text) !important; }
      .preview { display: flex; flex-wrap: wrap; gap: var(--hl-s4); justify-content: center; padding: var(--hl-s4); background: var(--hl-surface-2);
        border-radius: var(--hl-r-lg); min-height: 400px; }
      .sheet { background: #fff; box-shadow: var(--hl-shadow-2); border-radius: 2px; width: min(520px, 100%); }
      .sheet svg { display: block; width: 100%; height: auto; }
      .sheet .num { text-align: center; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); padding: 4px; background: var(--hl-surface); }
      .rm { display: flex; gap: var(--hl-s2); align-items: flex-start; padding: var(--hl-s3); border-radius: var(--hl-r-md); background: var(--hl-frost-100); font-size: var(--hl-fs-sm); }
    `],h([g({attribute:!1})],oe.prototype,"snapshot",2),h([g({attribute:!1})],oe.prototype,"api",2),h([g({attribute:!1})],oe.prototype,"t",2),h([g()],oe.prototype,"lang",2),h([g({type:Boolean})],oe.prototype,"narrow",2),h([g({type:Boolean})],oe.prototype,"admin",2),h([f()],oe.prototype,"opts",2),h([f()],oe.prototype,"pages",2),h([f()],oe.prototype,"busy",2),h([f()],oe.prototype,"error",2),oe=h([M("hl-print-view")],oe);var Va=new Set(["growth","yellow_leaves","wilting","no_fruit","bolting","pests","disease","too_hot","too_cold","soil","slugs","frost"]),ei={warning:"mdi:alert-outline",tip:"mdi:lightbulb-on-outline",info:"mdi:information-outline"},ti={pollination:"mdi:bee-flower",neighbours:"mdi:handshake-outline",placement:"mdi:white-balance-sunny",year_round:"mdi:calendar-sync-outline",soil:"mdi:shovel",eco:"mdi:leaf-circle-outline",growth:"mdi:sprout",greenhouse:"mdi:greenhouse"},F=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.mode="question";this.options=null;this.subject="plant";this.target="";this.problem="what_to_do";this.answer=null;this.busy=!1;this.advice=null;this.supplies=null;this.dismissed=new Set}connectedCallback(){super.connectedCallback(),this.load()}async load(){try{let[e,t,s]=await Promise.all([this.api.qaOptions(),this.api.advice(),this.api.supplies()]);this.options=e,this.advice=t,this.supplies=s;let n=e.targets.plant.find(a=>a.planted);this.target=n?.id??e.targets.plant[0]?.id??""}catch(e){this.toast(e.message??String(e))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}openChapter(e){this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e},bubbles:!0,composed:!0}))}problems(){let e=this.options?.subjects[this.subject]??[],t=e.filter(s=>this.mode==="problem"===Va.has(s));return t.length?t:e}setSubject(e){this.subject=e;let t=this.options?.targets[e]??[];this.target=t.find(s=>s.planted)?.id??t[0]?.id??"",this.problems().includes(this.problem)||(this.problem=this.problems()[0]??""),this.answer=null}setMode(e){this.mode=e,this.problems().includes(this.problem)||(this.problem=this.problems()[0]??""),this.answer=null}async ask(){this.busy=!0;try{this.answer=await this.api.qaAsk(this.subject,this.problem,this.target||null)}catch(e){this.toast(e.message??String(e))}finally{this.busy=!1}}async apply(e){let t=e.action;if(t)if(t.type==="add_planting"&&t.plant_id&&t.bed_id){let s=this.plants.find(b=>b.id===t.plant_id),n=this.snapshot,a=n.beds.find(b=>b.id===t.bed_id);if(!s||!a)return;let i=n.analysis?.season??new Date().getFullYear(),l=mt(s,"block",a),d=n.plantings.filter(b=>b.bed_id===a.id&&$e(b,!!this.plants.find(x=>x.id===b.plant_id)?.perennial,i)).map(b=>({x:b.x_cm,y:b.y_cm,w:b.width_cm,h:b.length_cm})),p=He(a,l,d,n.settings.snap_cm);if(!p){this.toast(this.t("advice.no_space",{bed:a.name}));return}let m={id:ge("pl"),plant_id:s.id,bed_id:a.id,season:i,layout:"block",x_cm:p.x,y_cm:p.y,width_cm:l.w,length_cm:l.h,count:null,method:$s(s),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:"advice"},v={zones:n.zones,beds:n.beds,plantings:[...n.plantings,m],features:n.features??[]};try{await this.api.savePlan(v,n.revision),this.dismissed=new Set([...this.dismissed,e.id]),this.toast(this.t("planner.placed",{plant:y(s,this.lang),bed:a.name}))}catch(b){this.toast(b.message??String(b))}}else t.type==="year_transition"?this.dispatchEvent(new CustomEvent("year-transition",{detail:t.from_season,bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("navigate",{detail:t.type==="draw"?"layout":"planner",bubbles:!0,composed:!0}))}suggestionPicture(e){let t=o`<ha-icon icon=${ti[e.kind]??ei[e.severity]}></ha-icon>`,s=e.plants.map(a=>this.plants.find(i=>i.id===a)).find(Boolean),n=this.t(`advice.kind.${e.kind}`);return s?o`<span class="pic" title=${`${n} \xB7 ${this.t("lib.open_plant")}`} role="button" tabindex="0"
        @click=${()=>this.dispatchEvent(new CustomEvent("open-plant",{detail:s.id,bubbles:!0,composed:!0}))}
        @keydown=${a=>a.key==="Enter"&&this.dispatchEvent(new CustomEvent("open-plant",{detail:s.id,bubbles:!0,composed:!0}))}><hl-plant-image .plant=${s} color=${z(this.families,s.family)}
        lang=${this.lang} size="thumb"></hl-plant-image><span class="badge">${t}</span></span>`:e.handbook?o`<span class="pic" title=${n}>${vt(e.handbook,44)}<span class="badge">${t}</span></span>`:o`<span class="icon" title=${n}>${t}</span>`}answerPicture(e){let t=e.subject==="plant"?this.plants.find(s=>s.id===e.target):void 0;return t?o`<hl-plant-image class="hero" .plant=${t} color=${z(this.families,t.family)} lang=${this.lang}
        size="hero" credit></hl-plant-image>`:e.handbook?o`<span class="hero">${vt(e.handbook,120)}</span>`:u}plantChip(e){let t=this.plants.find(s=>s.id===e);return t?o`<span class="plant-chip">${D(N(t),t.color||z(this.families,t.family),20)}${y(t,this.lang)}</span>`:o``}render(){return this.options?o`<div class="grid">
      <div class="stack">${this.renderAsk()}${this.answer?this.renderAnswer(this.answer):u}${this.renderSuggestions()}</div>
      <div class="stack">${this.renderCoverage()}${this.renderShopping()}</div>
    </div>`:o`<p class="empty">${this.t("common.loading")}</p>`}renderAsk(){let e=this.options,t=e.targets[this.subject]??[],s=t.filter(a=>a.planted),n=t.filter(a=>!a.planted);return o`<section class="card ask stack" aria-labelledby="ask-h">
      <h2 id="ask-h"><ha-icon icon="mdi:chat-question-outline"></ha-icon> ${this.t("advice.ask_title")}</h2>
      <div class="sentence">
        <span>${this.t("advice.i_have")}</span>
        <span class="modes segmented" role="group">
          <button aria-pressed=${String(this.mode==="question")} @click=${()=>this.setMode("question")}>${this.t("advice.mode.question")}</button>
          <button aria-pressed=${String(this.mode==="problem")} @click=${()=>this.setMode("problem")}>${this.t("advice.mode.problem")}</button>
        </span>
        <span>${this.t("advice.about")}</span>
        <select aria-label=${this.t("advice.subject")} @change=${a=>this.setSubject(a.target.value)}>
          ${Object.keys(e.subjects).map(a=>o`<option value=${a} ?selected=${a===this.subject}>${this.t(`advice.subject.${a}`)}</option>`)}
        </select>
        ${t.length?o`<select aria-label=${this.t("advice.target")} @change=${a=>{this.target=a.target.value,this.answer=null}}>
          ${s.length?o`<optgroup label=${this.t("advice.in_garden")}>${s.map(a=>o`<option value=${a.id} ?selected=${a.id===this.target}>${a.name}</option>`)}</optgroup>`:u}
          ${s.length?o`<optgroup label=${this.t("advice.all_plants")}>${n.map(a=>o`<option value=${a.id} ?selected=${a.id===this.target}>${a.name==="*"?this.t("advice.whole_garden"):this.subject==="tools"?this.t(`type.${a.id}`):a.name}</option>`)}</optgroup>`:n.map(a=>o`<option value=${a.id} ?selected=${a.id===this.target}>${a.name==="*"?this.t("advice.whole_garden"):this.subject==="tools"?this.t(`type.${a.id}`):a.name}</option>`)}
        </select>`:u}
        <span>:</span>
        <select aria-label=${this.t("advice.problem")} @change=${a=>{this.problem=a.target.value,this.answer=null}}>
          ${this.problems().map(a=>o`<option value=${a} ?selected=${a===this.problem}>${this.t(`advice.q.${a}`)}</option>`)}
        </select>
        <button class="btn primary" ?disabled=${this.busy} @click=${()=>this.ask()}><ha-icon icon="mdi:send"></ha-icon>${this.t("advice.ask")}</button>
      </div>
    </section>`}renderAnswer(e){let t=(s,n,a,i)=>i.length?o`<div class="section ${s}"><ha-icon icon=${n}></ha-icon><h4>${a}</h4><ul>${i.map(l=>o`<li>${l}</li>`)}</ul></div>`:u;return o`<section class="card answer" aria-live="polite">
      ${this.answerPicture(e)}
      <h3><ha-icon icon="mdi:message-reply-text-outline"></ha-icon>${e.title} – ${this.t(`advice.q.${e.problem}`)}</h3>
      ${t("status","mdi:pulse",this.t("advice.sec.status"),e.status)}
      ${t("facts","mdi:information-outline",this.t("advice.sec.facts"),e.facts)}
      ${t("causes","mdi:help-circle-outline",this.t("advice.sec.causes"),e.causes)}
      ${t("actions","mdi:checkbox-marked-circle-outline",this.t("advice.sec.actions"),e.actions)}
      ${t("remedies","mdi:leaf",this.t("advice.sec.remedies"),e.remedies)}
      ${t("prevention","mdi:shield-check-outline",this.t("advice.sec.prevention"),e.prevention)}
      ${e.tasks.length?o`<div class="section"><ha-icon icon="mdi:format-list-checks"></ha-icon><h4>${this.t("advice.sec.tasks")}</h4>
        <ul>${e.tasks.map(s=>o`<li>${s.title} <span class="xs muted">(${s.due})</span></li>`)}</ul></div>`:u}
      ${e.plants.length>1||e.subject!=="plant"?o`<div class="chips" style="margin-top:12px">${e.plants.map(s=>this.plantChip(s))}</div>`:u}
      ${e.handbook?o`<div class="row" style="margin-top:12px"><button class="btn small ghost" @click=${()=>this.openChapter(e.handbook)}>
        <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("advice.read_more")}</button></div>`:u}
    </section>`}renderSuggestions(){let e=(this.advice?.suggestions??[]).filter(t=>!this.dismissed.has(t.id));return o`<section class="card stack" aria-labelledby="sugg-h">
      <h2 id="sugg-h"><ha-icon icon="mdi:lightbulb-group-outline"></ha-icon> ${this.t("advice.suggestions")} <span class="chip">${e.length}</span></h2>
      <p class="small muted">${this.t("advice.suggestions_intro")}</p>
      ${e.length?e.map(t=>o`<article class="sugg ${t.severity}">
        ${this.suggestionPicture(t)}
        <div><b>${t.title}</b><span class="small">${t.text}</span></div>
        ${t.plants.length?o`<div class="row chips">${t.plants.slice(0,5).map(s=>this.plantChip(s))}</div>`:u}
        <div class="row wrap">
          ${t.action&&this.admin?o`<button class="btn small primary" @click=${()=>this.apply(t)}>
            ${this.t(t.action.type==="add_planting"?"advice.apply_add":t.action.type==="year_transition"?"advice.apply_transition":"advice.apply_open")}</button>`:u}
          ${t.handbook?o`<button class="btn small ghost" @click=${()=>this.openChapter(t.handbook)}>${this.t("advice.read_more")}</button>`:u}
          <button class="btn small ghost" @click=${()=>this.dismissed=new Set([...this.dismissed,t.id])}>${this.t("advice.dismiss")}</button>
        </div></article>`):o`<p class="small">${this.t("advice.none")}</p>`}
    </section>`}renderCoverage(){let e=this.advice?.coverage;if(!e)return o``;let t=new Date().getMonth(),s=n=>new Date(2026,n,1).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{month:"short"});return o`<section class="card stack" aria-labelledby="cov-h">
      <h2 id="cov-h"><ha-icon icon="mdi:calendar-sync-outline"></ha-icon> ${this.t("advice.coverage")}</h2>
      <div class="months" role="list">
        ${e.months.map((n,a)=>o`<div role="listitem" class="month ${n.length?"":"gap"} ${a===t?"now":""}"
          title=${n.map(i=>y(this.plants.find(l=>l.id===i),this.lang)).join(", ")||this.t("advice.nothing")}>
          ${s(a)}<b>${n.length}</b></div>`)}
      </div>
      <p class="xs muted">${e.gaps.length?this.t("advice.coverage_gaps"):this.t("advice.coverage_full")}</p>
    </section>`}renderShopping(){let e=this.supplies;if(!e)return o``;let t="";return o`<section class="card stack" aria-labelledby="shop-h">
      <h2 id="shop-h"><ha-icon icon="mdi:cart-outline"></ha-icon> ${this.t("advice.shopping")}</h2>
      <p class="small muted">${this.t("advice.shopping_intro")}</p>
      ${e.shopping.length?o`<table>
        ${e.shopping.map(s=>{let n=s.category!==t?o`<tr><td class="cat" colspan="3">${this.t(`advice.cat.${s.category}`)}</td></tr>`:u;return t=s.category,o`${n}<tr><td>${s.emoji} ${s.name}</td><td class="num">${s.quantity} ${s.unit}</td><td class="xs muted">${s.reason}</td></tr>`})}
      </table>`:o`<p class="small">${this.t("advice.nothing_to_buy")}</p>`}
      <details><summary class="small"><b>${this.t("advice.tools_per_task")}</b></summary>
        <table>${Object.entries(e.task_tools).filter(([,s])=>s.length).map(([s,n])=>o`<tr>
          <td>${this.t(`type.${s}`)}</td><td class="small">${n.map(a=>`${e.tools[a]?.emoji??""} ${e.tools[a]?.name??a}`).join(", ")}</td></tr>`)}</table>
      </details>
      <button class="btn small ghost" @click=${()=>this.openChapter("tools")}><ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("advice.read_tools")}</button>
    </section>`}};F.styles=[R,S`
      .pic[role="button"] { cursor: pointer; }
      :host { display: block; }
      .grid { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: var(--hl-s4); align-items: start; }
      @media (max-width: 980px) { .grid { grid-template-columns: 1fr; } }
      .ask { background: linear-gradient(135deg, var(--hl-leaf-100), var(--hl-surface)); }
      .sentence { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: var(--hl-fs-lg); line-height: 2.2; }
      .sentence select { width: auto; max-width: 100%; font-size: var(--hl-fs-md); font-weight: 600; border-radius: var(--hl-r-pill); padding: 4px 12px; }
      .segmented { display: inline-flex; background: var(--hl-surface-2); border-radius: var(--hl-r-pill); padding: 3px; border: 1px solid var(--hl-border); }
      .segmented button { border: 0; background: transparent; padding: 2px 14px; border-radius: var(--hl-r-pill); cursor: pointer;
        font: inherit; font-weight: 600; color: var(--hl-text-muted); line-height: 1.8; }
      .segmented button[aria-pressed="true"] { background: var(--hl-leaf-600); color: #fff; box-shadow: var(--hl-shadow-1); }
      .answer h3 { display: flex; gap: 8px; align-items: center; }
      .section { display: grid; grid-template-columns: 28px 1fr; gap: 4px 8px; margin-top: var(--hl-s3); }
      .section ha-icon { color: var(--hl-leaf-600); }
      .section h4 { margin: 0; }
      .section ul { margin: 4px 0 0; padding-left: 18px; grid-column: 2; }
      .section li { margin-bottom: 3px; }
      .section.status ha-icon { color: var(--hl-water-500); }
      .section.causes ha-icon { color: var(--hl-sun-500); }
      .section.remedies ha-icon { color: var(--hl-soil-500); }
      .chips { display: flex; flex-wrap: wrap; gap: 6px; }
      .plant-chip { display: inline-flex; gap: 6px; align-items: center; padding: 2px 10px 2px 4px; border-radius: var(--hl-r-pill);
        background: var(--hl-surface-2); border: 1px solid var(--hl-border); font-size: var(--hl-fs-sm); }
      .sugg .pic { width: 44px; height: 44px; border-radius: 50%; overflow: hidden; display: block; position: relative; }
      .sugg .pic .badge { position: absolute; right: -2px; bottom: -2px; width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center;
        background: var(--hl-surface); box-shadow: 0 0 0 2px var(--hl-surface); --mdc-icon-size: 14px; }
      .sugg .pic svg.chapter-art { display: block; }
      .answer .hero { display: block; margin-bottom: var(--hl-s3); border-radius: var(--hl-r-md); overflow: hidden; }
      .sugg { display: grid; grid-template-columns: 44px 1fr; gap: 4px 10px; padding: 10px 12px; border-radius: var(--hl-r-md);
        border: 1px solid var(--hl-border); background: var(--hl-surface); }
      .sugg.warning { border-left: 4px solid var(--hl-tomato-500); }
      .sugg.tip { border-left: 4px solid var(--hl-leaf-500); }
      .sugg.info { border-left: 4px solid var(--hl-frost-500); }
      .sugg .icon { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; background: var(--hl-surface-2); }
      .sugg b { display: block; }
      .sugg .row { grid-column: 2; }
      .months { display: grid; grid-template-columns: repeat(12, 1fr); gap: 4px; }
      .month { border-radius: var(--hl-r-sm); padding: 6px 2px; text-align: center; font-size: 11px; background: var(--hl-leaf-100); }
      .month b { display: block; font-size: 16px; }
      .month.gap { background: var(--hl-tomato-100); color: var(--hl-tomato-700, #8a2a1f); }
      .month.now { outline: 2px solid var(--hl-focus); }
      table { width: 100%; border-collapse: collapse; font-size: var(--hl-fs-sm); }
      td, th { padding: 4px 6px; border-bottom: 1px solid var(--hl-border); text-align: left; }
      td.num { text-align: right; white-space: nowrap; }
      .cat { font-weight: 700; padding-top: 10px; color: var(--hl-text-muted); text-transform: uppercase; font-size: 11px; letter-spacing: 0.04em; }
    `],h([g({attribute:!1})],F.prototype,"snapshot",2),h([g({attribute:!1})],F.prototype,"plants",2),h([g({attribute:!1})],F.prototype,"families",2),h([g({attribute:!1})],F.prototype,"api",2),h([g({attribute:!1})],F.prototype,"t",2),h([g()],F.prototype,"lang",2),h([g({type:Boolean})],F.prototype,"admin",2),h([f()],F.prototype,"mode",2),h([f()],F.prototype,"options",2),h([f()],F.prototype,"subject",2),h([f()],F.prototype,"target",2),h([f()],F.prototype,"problem",2),h([f()],F.prototype,"answer",2),h([f()],F.prototype,"busy",2),h([f()],F.prototype,"advice",2),h([f()],F.prototype,"supplies",2),h([f()],F.prototype,"dismissed",2),F=h([M("hl-advice-view")],F);var Dn=50,xs=6,si={add:"mdi:plus-circle-outline",remove:"mdi:minus-circle-outline",change:"mdi:pencil-outline"},ni=["note","observation","problem","milestone"],ai={note:"mdi:note-text-outline",observation:"mdi:eye-outline",problem:"mdi:alert-circle-outline",milestone:"mdi:flag-checkered"},ii={ok:"ok",use_soon:"warn",expired:"bad",empty:"",unknown:""},O=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.section="diary";this.systemOnly=!1;this.waterBed="";this.waterDays=14;this.overview=null;this.filter="";this.draftPhotos=[];this.busy=!1;this.syslog=[];this.syslogMore=!1;this.syslogSystem=!0;this.quality=0}connectedCallback(){super.connectedCallback(),this.load()}updated(e){!e.has("snapshot")||!this.snapshot||e.get("snapshot")===void 0||(window.clearTimeout(this.reloadTimer),this.reloadTimer=window.setTimeout(()=>void this.load(),800))}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.reloadTimer)}async load(){try{this.overview=await this.api.records()}catch{}(this.section==="system"||this.systemOnly)&&await this.loadSyslog()}async loadSyslog(e=!1){try{let t=e?this.syslog[this.syslog.length-1]?.id??null:null,s=e?Dn:Math.max(Dn,this.syslog.length),n=await this.api.syslog({limit:s,before:t,include_system:this.syslogSystem});this.syslog=e?[...this.syslog,...n.entries]:n.entries,this.syslogMore=n.more}catch{}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async guard(e,t){this.busy=!0;try{return await e(),t&&this.toast(t),!0}catch(s){return this.toast(this.t("common.error",{message:s.message??String(s)})),!1}finally{this.busy=!1}}plant(e){return this.plants.find(t=>t.id===e)}icon(e,t=24){let s=this.plant(e);return s?o`<button class="plant-icon" title=${this.t("lib.open_plant")} aria-label=${y(s,this.lang)}
      @click=${()=>this.dispatchEvent(new CustomEvent("open-plant",{detail:s.id,bubbles:!0,composed:!0}))}>${D(N(s),s.color||z(this.families,s.family),t)}</button>`:o``}get season(){return this.snapshot.analysis?.season??new Date().getFullYear()}get presentPlantings(){return this.snapshot.plantings.filter(e=>$e(e,!!this.plant(e.plant_id)?.perennial,this.season))}plantingLabel(e){let t=this.snapshot.beds.find(s=>s.id===e.bed_id);return`${y(this.plant(e.plant_id),this.lang)} \xB7 ${t?.name??""}`}render(){return this.systemOnly?this.renderSystem():o`
      <div class="tabs" role="tablist">
        ${[["diary","mdi:notebook-outline"],["harvest","mdi:basket-outline"],["seeds","mdi:seed-outline"],["water","mdi:water-outline"],["system","mdi:history"]].map(([t,s])=>o`<button class="chip" role="tab" aria-selected=${String(this.section===t)} aria-pressed=${String(this.section===t)}
          @click=${()=>this.openSection(t)}><ha-icon icon=${s}></ha-icon>${this.t(`journal.${t}`)}</button>`)}
      </div>
      ${this.section==="diary"?this.renderDiary():this.section==="harvest"?this.renderHarvest():this.section==="seeds"?this.renderSeeds():this.section==="water"?this.renderWater():this.renderSystem()}
    `}openSection(e){this.section=e,e==="system"&&this.loadSyslog()}async addPhoto(e){let t=[...e.target.files??[]];for(let s of t)await this.guard(async()=>{this.draftPhotos=[...this.draftPhotos,await this.api.uploadPhoto(s)]});e.target.value=""}async saveEntry(e){e.preventDefault();let t=e.target,s=i=>t.elements.namedItem(i).value,n=s("link"),a={text:s("text"),kind:s("kind"),photos:this.draftPhotos,planting_id:n.startsWith("p:")?n.slice(2):null,bed_id:n.startsWith("b:")?n.slice(2):null};await this.guard(()=>this.api.saveJournal(a),this.t("journal.saved"))&&(t.reset(),this.draftPhotos=[])}renderDiary(){let e=[...this.snapshot.journal??[]].sort((n,a)=>n.at<a.at?1:-1),t=e.filter(n=>!this.filter||n.bed_id===this.filter||n.plant_id===this.filter),s="";return o`<div class="grid">
      <section class="card stack" aria-labelledby="new-entry">
        <h2 id="new-entry"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon> ${this.t("journal.new")}</h2>
        <form class="stack" @submit=${this.saveEntry}>
          <label class="field">${this.t("journal.text")}<textarea name="text" placeholder=${this.t("journal.placeholder")}></textarea></label>
          <div class="form-grid">
            <label class="field">${this.t("journal.kind")}<select name="kind">${ni.map(n=>o`<option value=${n}>${this.t(`journal.kind.${n}`)}</option>`)}</select></label>
            <label class="field">${this.t("journal.link")}<select name="link"><option value="">${this.t("journal.whole_garden")}</option>
              <optgroup label=${this.t("journal.beds")}>${this.snapshot.beds.map(n=>o`<option value=${`b:${n.id}`}>${n.name}</option>`)}</optgroup>
              <optgroup label=${this.t("journal.crops")}>${this.presentPlantings.map(n=>o`<option value=${`p:${n.id}`}>${this.plantingLabel(n)}</option>`)}</optgroup>
            </select></label>
          </div>
          <label class="btn small ghost" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("journal.add_photo")}
            <input type="file" accept="image/*" capture="environment" multiple hidden @change=${this.addPhoto} /></label>
          ${this.draftPhotos.length?o`<div class="photos" style="grid-column:auto">${this.draftPhotos.map(n=>o`<img src=${Re(n)} alt="" />`)}</div>`:u}
          <div class="row"><button class="btn primary" type="submit" ?disabled=${this.busy||!this.admin}>${this.t("journal.save")}</button></div>
        </form>
      </section>
      <section class="card stack" aria-labelledby="diary-h">
        <div class="row wrap"><h2 id="diary-h"><ha-icon icon="mdi:timeline-text-outline"></ha-icon> ${this.t("journal.diary")}</h2><span class="spacer"></span>
          <select aria-label=${this.t("journal.filter")} @change=${n=>this.filter=n.target.value}>
            <option value="">${this.t("journal.all")}</option>
            ${this.snapshot.beds.map(n=>o`<option value=${n.id}>${n.name}</option>`)}
            ${[...new Set(e.map(n=>n.plant_id).filter(Boolean))].map(n=>o`<option value=${n}>${y(this.plant(n),this.lang)}</option>`)}
          </select></div>
        ${t.length?o`<div class="timeline">${t.map(n=>{let a=_(n.at,this.lang,{month:"long",year:"numeric"}),i=a!==s?o`<div class="month">${a}</div>`:u;s=a;let l=this.snapshot.beds.find(d=>d.id===n.bed_id);return o`${i}<article class="entry ${n.kind}">
            <span class="icon">${n.plant_id?this.icon(n.plant_id,26):o`<ha-icon icon=${ai[n.kind]}></ha-icon>`}</span>
            <div><div class="meta">${_(n.at,this.lang,{weekday:"short",day:"numeric",month:"short"})}
              · ${this.t(`journal.kind.${n.kind}`)}${n.plant_id?` \xB7 ${y(this.plant(n.plant_id),this.lang)}`:""}${l?` \xB7 ${l.name}`:""}${n.author?` \xB7 ${n.author}`:""}</div>
              <div>${n.text}</div></div>
            ${n.photos.length?o`<div class="photos">${n.photos.map(d=>o`<a href=${Re(d,"original")} target="_blank" rel="noopener"><img src=${Re(d)} alt="" loading="lazy" /></a>`)}</div>`:u}
            ${this.admin?o`<div style="grid-column:2"><button class="btn small ghost" @click=${()=>this.guard(()=>this.api.deleteRecord("journal",n.id))}>${this.t("common.delete")}</button></div>`:u}
          </article>`})}</div>`:o`<p class="small muted">${this.t("journal.empty")}</p>`}
      </section>
    </div>`}async saveHarvest(e){e.preventDefault();let t=e.target,s=i=>t.elements.namedItem(i).value,n=s("what");await this.guard(()=>this.api.logHarvest({planting_id:n.startsWith("p:")?n.slice(2):null,plant_id:n.startsWith("x:")?n.slice(2):null,kg:Number(s("kg"))||0,count:s("count")?Number(s("count")):null,quality:this.quality||null,day:s("day")||void 0,note:s("note")}),this.t("journal.harvest_saved"))&&(t.reset(),this.quality=0,this.load())}renderHarvest(){let e=this.overview,t=Object.values(e?.harvest_season??{}).sort((l,d)=>d.kg-l.kg),s=t.reduce((l,d)=>l+d.kg,0),n=Math.max(...t.map(l=>l.kg),.001),a=[...this.snapshot.harvest_log??[]].sort((l,d)=>l.day<d.day?1:-1).slice(0,25),i=this.presentPlantings.filter(l=>this.plant(l.plant_id)?.harvestable!==!1);return o`<div class="grid">
      <section class="card stack" aria-labelledby="h-new">
        <h2 id="h-new"><ha-icon icon="mdi:basket-plus-outline"></ha-icon> ${this.t("journal.log_harvest")}</h2>
        <form class="stack" @submit=${this.saveHarvest}>
          <label class="field">${this.t("journal.what")}<select name="what" required>
            <optgroup label=${this.t("journal.crops")}>${i.map(l=>o`<option value=${`p:${l.id}`}>${this.plantingLabel(l)}</option>`)}</optgroup>
            <optgroup label=${this.t("advice.all_plants")}>${[...this.plants].sort((l,d)=>y(l,this.lang).localeCompare(y(d,this.lang))).map(l=>o`<option value=${`x:${l.id}`}>${y(l,this.lang)}</option>`)}</optgroup>
          </select></label>
          <div class="form-grid">
            <label class="field">${this.t("journal.kg")}<input name="kg" type="number" min="0" step="0.05" inputmode="decimal" /></label>
            <label class="field">${this.t("journal.count")}<input name="count" type="number" min="0" step="1" inputmode="numeric" /></label>
            <label class="field">${this.t("journal.day")}<hl-date-input name="day" .value=${this.snapshot.analysis?.today??""} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}></hl-date-input></label>
            <div class="field">${this.t("journal.quality")}<span class="stars" role="group">${[1,2,3,4,5].map(l=>o`<button type="button" aria-label=${String(l)}
              aria-pressed=${String(this.quality>=l)} @click=${()=>this.quality=this.quality===l?0:l}>★</button>`)}</span></div>
            <label class="field full">${this.t("task.notes")}<input name="note" /></label>
          </div>
          <div class="row"><button class="btn primary" type="submit" ?disabled=${this.busy||!this.admin}>${this.t("journal.save")}</button></div>
        </form>
        <p class="xs muted">${this.t("journal.learn_hint")}</p>
      </section>
      <section class="card stack" aria-labelledby="h-season">
        <h2 id="h-season"><ha-icon icon="mdi:chart-bar"></ha-icon> ${this.t("journal.harvest_season",{season:e?.season??this.season})}</h2>
        <div class="row"><span class="total">${s.toFixed(1)} kg</span><span class="small muted">${this.t("journal.crops_n",{n:t.length})}</span></div>
        ${t.map(l=>{let d=e?.learned_yields[l.plant_id],p=this.plant(l.plant_id)?.yield_kg_m2;return o`<div class="crop">${this.icon(l.plant_id,26)}
            <div><b>${y(this.plant(l.plant_id),this.lang)}</b>
              <div class="bar" style=${`width:${Math.max(l.kg/n*100,2)}%`}></div>
              ${d!=null?o`<span class="xs muted">${this.t("journal.yield",{kg:d,db:p??"\u2013"})}</span>`:u}</div>
            <span class="num"><b>${l.kg.toFixed(1)} kg</b>${l.count?o`<br /><span class="xs muted">${l.count} ×</span>`:u}</span></div>`})}
        ${a.length?o`<h3>${this.t("journal.recent")}</h3><table>
          <tr><th>${this.t("journal.day")}</th><th>${this.t("lib.plant")}</th><th class="num">kg</th><th class="num">#</th><th></th></tr>
          ${a.map(l=>o`<tr><td>${_(l.day,this.lang)}</td><td>${y(this.plant(l.plant_id),this.lang)}${l.quality?` ${"\u2605".repeat(l.quality)}`:""}</td>
            <td class="num">${l.kg?l.kg.toFixed(2):"\u2013"}</td><td class="num">${l.count??"\u2013"}</td>
            <td class="num">${this.admin?o`<button class="icon-btn" aria-label=${this.t("common.delete")} @click=${()=>this.guard(()=>this.api.deleteRecord("harvest",l.id)).then(()=>this.load())}>
              <ha-icon icon="mdi:delete-outline"></ha-icon></button>`:u}</td></tr>`)}
        </table>`:o`<p class="small muted">${this.t("journal.no_harvest")}</p>`}
      </section>
    </div>`}async saveSeed(e){e.preventDefault();let t=e.target,s=a=>t.elements.namedItem(a).value,n={plant_id:s("plant"),variety:s("variety"),year:s("year")?Number(s("year")):null,quantity:Number(s("quantity")||1),unit:s("unit"),source:s("source")};await this.guard(()=>this.api.saveSeed(n),this.t("journal.seed_saved"))&&(t.reset(),this.load())}renderSeeds(){let e=this.overview?.seeds,t=[...this.plants].sort((s,n)=>y(s,this.lang).localeCompare(y(n,this.lang)));return o`<div class="grid">
      <section class="card stack" aria-labelledby="s-new">
        <h2 id="s-new"><ha-icon icon="mdi:seed-plus-outline"></ha-icon> ${this.t("journal.add_seed")}</h2>
        <form class="stack" @submit=${this.saveSeed}>
          <label class="field">${this.t("lib.plant")}<select name="plant" required>${t.map(s=>o`<option value=${s.id}>${y(s,this.lang)}</option>`)}</select></label>
          <div class="form-grid">
            <label class="field">${this.t("journal.variety")}<input name="variety" /></label>
            <label class="field">${this.t("journal.year")}<input name="year" type="number" min="1990" max="2100" .value=${String(this.season)} /></label>
            <label class="field">${this.t("journal.quantity")}<input name="quantity" type="number" min="0" step="0.5" value="1" /></label>
            <label class="field">${this.t("journal.unit")}<select name="unit">${["packet","seeds","g"].map(s=>o`<option value=${s}>${this.t(`journal.unit.${s}`)}</option>`)}</select></label>
            <label class="field full">${this.t("journal.source")}<input name="source" placeholder=${this.t("journal.source_hint")} /></label>
          </div>
          <div class="row"><button class="btn primary" type="submit" ?disabled=${this.busy||!this.admin}>${this.t("journal.save")}</button></div>
        </form>
        ${e?.missing.length?o`<div class="finding warning"><ha-icon icon="mdi:cart-outline"></ha-icon><span>${this.t("journal.seed_missing")}:
          ${e.missing.map(s=>y(this.plant(s),this.lang)).join(", ")}</span></div>`:u}
        <p class="xs muted">${this.t("journal.seed_hint")}</p>
      </section>
      <section class="card stack" aria-labelledby="s-box">
        <h2 id="s-box"><ha-icon icon="mdi:archive-outline"></ha-icon> ${this.t("journal.seed_box")} <span class="chip">${e?.packets.length??0}</span></h2>
        ${e?.packets.length?o`<table>
          <tr><th>${this.t("lib.plant")}</th><th>${this.t("journal.variety")}</th><th class="num">${this.t("journal.year")}</th><th class="num">${this.t("journal.quantity")}</th><th>${this.t("journal.status")}</th><th></th></tr>
          ${e.packets.map(s=>o`<tr>
            <td>${this.icon(s.plant_id,18)} ${y(this.plant(s.plant_id),this.lang)}${s.needed?o` <span class="chip ok" title=${this.t("journal.needed")}>✓</span>`:u}</td>
            <td>${s.variety||"\u2013"}</td><td class="num">${s.year??"\u2013"}</td><td class="num">${s.quantity} ${this.t(`journal.unit.${s.unit}`)}</td>
            <td><span class="chip ${ii[s.status]}">${this.t(`journal.seed.${s.status}`,{year:s.use_by??""})}</span></td>
            <td class="num">${this.admin?o`<button class="icon-btn" aria-label=${this.t("common.delete")} @click=${()=>this.guard(()=>this.api.deleteRecord("seed",s.id)).then(()=>this.load())}>
              <ha-icon icon="mdi:delete-outline"></ha-icon></button>`:u}</td></tr>`)}
        </table>`:o`<p class="small muted">${this.t("journal.no_seeds")}</p>`}
      </section>
    </div>`}renderWater(){let e=this.overview?.water,t=this.snapshot.settings.water,s=!!(t?.meter_entity||t?.butt_level_entity),n=Math.max(...(e?.per_day??[]).map(a=>a.liters),1);return o`<section class="card stack" aria-labelledby="w-h">
      <h2 id="w-h"><ha-icon icon="mdi:water-outline"></ha-icon> ${this.t("journal.water")}</h2>
      ${s?u:o`<div class="finding info"><ha-icon icon="mdi:information-outline"></ha-icon><span>${this.t("journal.water_setup")}</span></div>`}
      <div class="tiles">
        <div class="tile">${this.t("journal.water_week")}<b>${e?.week_l!=null?`${e.week_l} L`:"\u2013"}</b></div>
        <div class="tile">${this.t("journal.water_season")}<b>${e?.season_l!=null?`${e.season_l} L`:"\u2013"}</b></div>
        <div class="tile">${this.t("journal.rain_available")}<b>${e?.rain_available_l!=null?`${e.rain_available_l} L`:e?.butt_pct!=null?`${e.butt_pct}%`:"\u2013"}</b></div>
      </div>
      ${e?.per_day.length?o`<h3>${this.t("journal.per_day")}</h3><div class="days" role="img" aria-label=${this.t("journal.per_day")}>
        ${e.per_day.map(a=>o`<div title=${`${a.day}: ${a.liters} L`} style=${`height:${a.liters/n*100}%`}></div>`)}</div>`:u}
      <p class="xs muted">${this.t("journal.water_hint")}</p>
    </section>
    ${this.renderBedWater()}`}renderBedWater(){let e=this.snapshot.beds.filter(s=>s.irrigation_entity||s.sensors?.soil_moisture);if(!e.length)return u;let t=e.find(s=>s.id===this.waterBed)??e[0];return o`<section class="card stack" aria-labelledby="wb-h">
      <h2 id="wb-h"><ha-icon icon="mdi:chart-bell-curve"></ha-icon> ${this.t("water.per_bed")}</h2>
      <div class="row wrap">
        <select style="width:auto" aria-label=${this.t("task.bed")} @change=${s=>this.waterBed=s.target.value}>
          ${e.map(s=>o`<option value=${s.id} ?selected=${s.id===t.id}>${s.name}</option>`)}</select>
        ${[7,14,30].map(s=>o`<button class="chip" aria-pressed=${String(this.waterDays===s)} @click=${()=>this.waterDays=s}>${this.t("water.days",{n:s})}</button>`)}
      </div>
      <hl-water-chart .bed=${t} .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} days=${this.waterDays}></hl-water-chart>
      <p class="xs muted">${this.t("water.chart_hint")}</p>
    </section>`}async undo(e){if(confirm(this.t("syslog.confirm",{what:this.entryTitle(e)}))){this.busy=!0;try{let t=await this.api.undo(e.id);!t.ok&&t.conflicts.length&&!t.problems.length&&confirm(this.t("syslog.conflict",{n:t.conflicts.length}))&&(t=await this.api.undo(e.id,!0)),t.ok?this.toast(this.t("syslog.undone")):t.problems.length&&this.toast(this.t("syslog.blocked")),await this.loadSyslog()}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}finally{this.busy=!1}}}summaryText(e){let t;e.col==="settings"?t=e.key??"":e.plant_id&&(e.col==="plantings"||!e.name)?t=y(this.plant(e.plant_id),this.lang)||e.plant_id:t=e.name??"";let s=[e.bed,e.col==="plantings"&&e.season?this.t("common.season",{year:e.season}):null].filter(Boolean).join(", ");return`${this.t(`syslog.col.${e.col}`)}: ${t}${s?` (${s})`:""}`}entryTitle(e){if(e.source==="error")return`${this.t("syslog.error")}: ${e.summary[0]?.name??""}`;if(e.undo_of)return this.t("syslog.reason.undo");let t=e.summary[0],n=new Set(e.summary.map(a=>a.op)).size===1?this.t(`syslog.op.${t.op}`):this.t("syslog.op.mixed");return e.summary.length===1?`${n} \u2013 ${this.summaryText(t)}`:this.t("syslog.n_changes",{verb:n,n:e.count})}renderSystem(){let e=t=>new Date(t).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return o`<section class="card stack" aria-labelledby="sys-h">
      <h2 id="sys-h"><ha-icon icon="mdi:history"></ha-icon> ${this.t("journal.system")}</h2>
      <p class="small muted">${this.t("syslog.intro")}</p>
      <label class="row small"><input type="checkbox" .checked=${this.syslogSystem}
        @change=${t=>{this.syslogSystem=t.target.checked,this.loadSyslog()}} />${this.t("syslog.show_system")}</label>
      ${this.syslog.length?u:o`<p class="small muted">${this.t("syslog.empty")}</p>`}
      <div class="stack" style="gap:8px" role="list">
        ${this.syslog.map(t=>o`<article role="listitem" class="log ${t.source} ${t.undone_by?"undone":""}">
          <div class="icon"><ha-icon icon=${t.source==="error"?"mdi:alert-circle-outline":t.undo_of?"mdi:undo-variant":t.source==="system"?"mdi:robot-outline":"mdi:account-edit-outline"}></ha-icon></div>
          <div>
            <strong>${this.entryTitle(t)}</strong>
            <div class="meta">${e(t.at)} · ${t.source==="system"?this.t("syslog.by_system"):t.user??this.t("syslog.by_unknown")}
              · ${t.source==="error"?t.reason:this.t(`syslog.reason.${t.reason}`)}${t.undone_by?o` · <span class="chip warn">${this.t("syslog.is_undone")}</span>`:u}</div>
            ${t.summary.length>1?o`<ul>
              ${t.summary.slice(0,xs).map(s=>o`<li><ha-icon icon=${si[s.op]}></ha-icon>${this.summaryText(s)}</li>`)}
              ${t.summary.length>xs?o`<li class="muted">${this.t("syslog.and_more",{n:t.summary.length-xs})}</li>`:u}
            </ul>`:u}
          </div>
          ${this.admin&&!t.undone_by&&t.source!=="error"&&t.count>0?o`<button class="btn small ghost" ?disabled=${this.busy} @click=${()=>this.undo(t)}
            aria-label=${`${this.t("syslog.undo")}: ${this.entryTitle(t)}`}><ha-icon icon="mdi:undo"></ha-icon>${this.t("syslog.undo")}</button>`:o`<span></span>`}
        </article>`)}
      </div>
      ${this.syslogMore?o`<div class="row"><button class="btn small" @click=${()=>this.loadSyslog(!0)}>${this.t("syslog.more")}</button></div>`:u}
    </section>`}};O.styles=[R,S`
      .plant-icon { border: 0; background: none; padding: 0; cursor: pointer; display: inline-grid; vertical-align: middle; }
      :host { display: block; }
      .tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: var(--hl-s3); }
      .grid { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); gap: var(--hl-s4); align-items: start; }
      @media (max-width: 980px) { .grid { grid-template-columns: 1fr; } }
      form.stack textarea { min-height: 80px; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .timeline { display: flex; flex-direction: column; gap: var(--hl-s3); }
      .month { font-weight: 700; color: var(--hl-text-muted); text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; margin-top: 6px; }
      .entry { display: grid; grid-template-columns: 36px 1fr; gap: 4px 10px; padding: 10px 12px; border-radius: var(--hl-r-md);
        border: 1px solid var(--hl-border); background: var(--hl-surface); }
      .entry.problem { border-left: 4px solid var(--hl-tomato-500); }
      .entry.milestone { border-left: 4px solid var(--hl-sun-500); }
      .entry .icon { width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; background: var(--hl-surface-2); }
      .entry .meta { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
      .photos { display: flex; gap: 6px; flex-wrap: wrap; grid-column: 2; }
      .photos img { width: 96px; height: 96px; object-fit: cover; border-radius: var(--hl-r-sm); border: 1px solid var(--hl-border); }
      .crop { display: grid; grid-template-columns: 28px 1fr auto; gap: 8px; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--hl-border); }
      .bar { height: 8px; border-radius: 4px; background: var(--hl-sun-500); margin-top: 3px; }
      .total { font-size: var(--hl-fs-2xl); font-weight: 800; }
      table { width: 100%; border-collapse: collapse; font-size: var(--hl-fs-sm); }
      td, th { padding: 5px 6px; border-bottom: 1px solid var(--hl-border); text-align: left; }
      td.num, th.num { text-align: right; white-space: nowrap; }
      .tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: var(--hl-s3); }
      .tile { padding: 12px; border-radius: var(--hl-r-md); background: var(--hl-surface-2); }
      .tile b { display: block; font-size: var(--hl-fs-2xl); }
      .days { display: flex; align-items: flex-end; gap: 3px; height: 90px; }
      .days div { flex: 1; background: var(--hl-water-500); border-radius: 3px 3px 0 0; min-height: 2px; }
      .stars button { border: 0; background: none; cursor: pointer; font-size: 20px; color: var(--hl-text-muted); padding: 0 1px; }
      .stars button[aria-pressed="true"] { color: var(--hl-sun-500); }
      .log { display: grid; grid-template-columns: 36px 1fr auto; gap: 4px 10px; padding: 10px 12px; border-radius: var(--hl-r-md);
        border: 1px solid var(--hl-border); background: var(--hl-surface); align-items: start; }
      .log.undone { opacity: 0.6; }
      .log.error { border-left: 4px solid var(--hl-tomato-500); }
      .log.system .icon { color: var(--hl-text-muted); }
      .log .icon { width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; background: var(--hl-surface-2); }
      .log ul { margin: 4px 0 0; padding: 0; list-style: none; font-size: var(--hl-fs-sm); }
      .log li { display: flex; gap: 6px; align-items: center; }
      .log li ha-icon { --mdc-icon-size: 16px; color: var(--hl-text-muted); flex: none; }
      .log .meta { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
      @media (max-width: 600px) { .log { grid-template-columns: 1fr; } .log .icon { display: none; } }
    `],h([g({attribute:!1})],O.prototype,"snapshot",2),h([g({attribute:!1})],O.prototype,"plants",2),h([g({attribute:!1})],O.prototype,"families",2),h([g({attribute:!1})],O.prototype,"api",2),h([g({attribute:!1})],O.prototype,"t",2),h([g()],O.prototype,"lang",2),h([g({type:Boolean})],O.prototype,"admin",2),h([g()],O.prototype,"section",2),h([g({type:Boolean})],O.prototype,"systemOnly",2),h([f()],O.prototype,"waterBed",2),h([f()],O.prototype,"waterDays",2),h([f()],O.prototype,"overview",2),h([f()],O.prototype,"filter",2),h([f()],O.prototype,"draftPhotos",2),h([f()],O.prototype,"busy",2),h([f()],O.prototype,"syslog",2),h([f()],O.prototype,"syslogMore",2),h([f()],O.prototype,"syslogSystem",2),h([f()],O.prototype,"quality",2),O=h([M("hl-journal-view")],O);var oi={error:"mdi:alert-octagon-outline",warning:"mdi:alert-outline",info:"mdi:information-outline"},G=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.section="check";this.result=null;this.loading=!1;this.plantId="";this.season=0;this.matchZone=!0;this.explained=null;this.fixing="";this.plantMap=new Map}connectedCallback(){super.connectedCallback(),this.load()}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.reloadTimer)}willUpdate(e){e.has("plants")&&(this.plantMap=new Map(this.plants.map(t=>[t.id,t]))),e.has("snapshot")&&e.get("snapshot")!==void 0&&(window.clearTimeout(this.reloadTimer),this.reloadTimer=window.setTimeout(()=>void this.load(),800)),!this.season&&this.snapshot&&(this.season=this.snapshot.layout_season??this.snapshot.analysis?.season??new Date().getFullYear())}async load(){this.loading=!0;try{this.result=await this.api.analysis()}catch{}finally{this.loading=!1}}async explain(){if(this.plantId)try{this.explained=await this.api.explain(this.plantId,this.season,this.matchZone)}catch(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e.message},bubbles:!0,composed:!0}))}}async fix(e,t){this.fixing=t;try{await this.api.fixIssue(e),this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("analysis.fixed")},bubbles:!0,composed:!0})),await this.load()}catch(s){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("common.error",{message:s.message})},bubbles:!0,composed:!0}))}finally{this.fixing=""}}async exportDiagnosis(){let e=null;try{e=(await this.api.syslog({limit:200,include_system:!0})).entries}catch{}let t=this.snapshot,s={exported_at:new Date().toISOString(),lang:this.lang,panel:{user_agent:navigator.userAgent,url_path:location.pathname},garden:{revision:t.revision,layout_season:t.layout_season??null,plan_seasons:Object.keys(t.layouts??{}),archived_plans:t.archived_plans??[],zones:t.zones.length,beds:t.beds.length,plantings:t.plantings.length,transition_due:t.transition_due??null,diagnosis:t.diagnosis??null},analysis:this.result,system_log:e},n=t.analysis?.today??new Date().toISOString().slice(0,10);Ge(`hortulus-diagnose-${n}.json`,JSON.stringify(s,null,2),"application/json")}showIssue(e){let t=e.refs.planting?.[0],s=Number(e.params.season??this.snapshot.layout_season);t&&this.dispatchEvent(new CustomEvent("focus-planting",{detail:{planting_id:t,season:s},bubbles:!0,composed:!0}))}go(e){this.dispatchEvent(new CustomEvent("navigate",{detail:e,bubbles:!0,composed:!0}))}render(){let e=[["check","mdi:stethoscope"],["why","mdi:help-circle-outline"],["compare","mdi:compare-horizontal"],["errors","mdi:alert-circle-outline"],["log","mdi:history"]],t=this.result?.errors.length??0;return o`
      <div class="tabs" role="tablist">
        ${e.map(([s,n])=>o`<button class="chip" role="tab" aria-selected=${String(this.section===s)} aria-pressed=${String(this.section===s)}
          @click=${()=>this.section=s}><ha-icon icon=${n}></ha-icon>${this.t(`analysis.${s}`)}${s==="errors"&&t?o` <span class="chip bad">${t}</span>`:u}</button>`)}
      </div>
      ${this.section==="check"?this.renderCheck():this.section==="why"?this.renderWhy():this.section==="errors"?this.renderErrors():this.section==="compare"?o`<section class="card stack"><h2><ha-icon icon="mdi:compare-horizontal"></ha-icon> ${this.t("compare.title")}</h2>
            <p class="small muted">${this.t("compare.intro")}</p>
            <hl-plan-compare .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} .plants=${this.plantMap} .families=${this.families}></hl-plan-compare></section>`:o`<hl-journal-view systemOnly .snapshot=${this.snapshot} .plants=${this.plants} .families=${this.families} .api=${this.api}
            .t=${this.t} lang=${this.lang} ?admin=${this.admin}></hl-journal-view>`}`}issueText(e){return this.t(`analysis.issue.${e.code}`,e.params)}renderCheck(){let e=this.result;if(!e)return o`<p class="muted">${this.t("common.loading")}</p>`;let t=s=>{let n=`${s.code}:${JSON.stringify(s.refs)}`,a=s.fixable&&this.admin?o`<button class="btn small primary" ?disabled=${this.fixing===n} @click=${()=>this.fix(s,n)}>
        <ha-icon icon="mdi:auto-fix"></ha-icon>${this.t(`analysis.fix.${s.code}`)}</button>`:u,i=s.refs.planting?.length===1||s.refs.planting?.length&&s.code==="plantings_overlap"?o`<button class="btn small ghost" @click=${()=>this.showIssue(s)}>🗺 ${this.t("crops.show_on_map")}</button>`:u;return o`${a}${i}${this.navAction(s)}`};return this.renderCheckBody(e,t)}navAction(e){return e.code==="transition_due"?o`<button class="btn small" @click=${()=>this.dispatchEvent(new CustomEvent("year-transition",{bubbles:!0,composed:!0}))}>${this.t("advice.apply_transition")}</button>`:e.code==="season_without_plan"||e.code.startsWith("bed_")||e.code==="zone_without_beds"?o`<button class="btn small" @click=${()=>this.go("layout")}>${this.t("layout.edit")}</button>`:e.code.startsWith("planting")||e.code==="plantings_overlap"?o`<button class="btn small" @click=${()=>this.go("planner")}>${this.t("analysis.to_planner")}</button>`:u}renderCheckBody(e,t){return o`<section class="card stack" aria-labelledby="chk">
      <h2 id="chk"><ha-icon icon="mdi:stethoscope"></ha-icon> ${this.t("analysis.check_title")}
        <button class="btn small ghost" ?disabled=${this.loading} @click=${()=>this.load()}><ha-icon icon="mdi:refresh"></ha-icon>${this.t("analysis.recheck")}</button>
        <button class="btn small ghost" @click=${()=>this.exportDiagnosis()}><ha-icon icon="mdi:download"></ha-icon>${this.t("analysis.export")}</button></h2>
      <p class="small muted">${this.t("analysis.check_intro")}</p>
      <div class="tiles">${Object.entries(e.counts).map(([s,n])=>o`<div class="tile">${this.t(`analysis.count.${s}`)}<b>${n}</b></div>`)}</div>
      ${e.issues.length?o`<div class="stack" style="gap:8px">${e.issues.map(s=>o`<div class="issue ${s.severity}">
        <ha-icon icon=${oi[s.severity]}></ha-icon>
        <div><b>${this.issueText(s)}</b><div class="why">${this.t(`analysis.issue.${s.code}.why`,s.params)}</div>
          <div class="row wrap" style="margin-top:6px">${t(s)}</div></div>
      </div>`)}</div>`:o`<div class="finding info"><ha-icon icon="mdi:check-circle-outline"></ha-icon><span>${this.t("analysis.all_good")}</span></div>`}
    </section>`}renderWhy(){let e=[...this.plants].sort((a,i)=>y(a,this.lang).localeCompare(y(i,this.lang))),t=this.plantMap.get(this.plantId),s=[this.season-1,this.season,this.season+1],n=this.explained;return o`<section class="card stack" aria-labelledby="why">
      <h2 id="why"><ha-icon icon="mdi:help-circle-outline"></ha-icon> ${this.t("analysis.why_title")}</h2>
      <p class="small muted">${this.t("analysis.why_intro")}</p>
      <div class="pick">
        ${t?o`<hl-plant-image .plant=${t} color=${z(this.families,t.family)} lang=${this.lang} size="thumb"></hl-plant-image>`:u}
        <label class="field">${this.t("lib.plant")}
          <select @change=${a=>{this.plantId=a.target.value,this.explained=null,this.explain()}}>
            <option value="">–</option>${e.map(a=>o`<option value=${a.id} ?selected=${a.id===this.plantId}>${y(a,this.lang)}</option>`)}
          </select></label>
        <label class="field">${this.t("planner.season")}
          <select @change=${a=>{this.season=Number(a.target.value),this.explain()}}>
            ${s.map(a=>o`<option value=${a} ?selected=${a===this.season}>${this.t("common.season",{year:a})}</option>`)}
          </select></label>
        <label class="row small"><input type="checkbox" .checked=${this.matchZone}
          @change=${a=>{this.matchZone=a.target.checked,this.explain()}} />${this.t("autofill.pref.match_zone_type")}</label>
      </div>
      ${n?n.has_plan?n.beds.length?o`<div>${n.beds.map(a=>o`<div class="bed ${a.ok?"ok":"no"}">
            <ha-icon icon=${a.ok?"mdi:check-circle-outline":"mdi:close-circle-outline"}></ha-icon>
            <div><b>${a.bed}</b> <span class="xs muted">${a.zone} · ${this.t("analysis.free",{m2:a.free_m2})}</span>
              ${a.ok&&!a.warnings.length?o`<div class="small">${this.t("analysis.fits")}</div>`:u}
              ${a.reasons.length||a.warnings.length?o`<ul>
                ${a.reasons.map(i=>o`<li>${Ne(i,this.t,this.lang,this.plantMap)}</li>`)}
                ${a.warnings.map(i=>o`<li class="muted">${this.t("analysis.warning")}: ${Ne(i,this.t,this.lang,this.plantMap)}</li>`)}
              </ul>`:u}
            </div></div>`)}</div>`:o`<p class="small muted">${this.t("analysis.no_beds")}</p>`:o`<div class="finding warning"><ha-icon icon="mdi:floor-plan"></ha-icon><span>${this.t("layout.none_title",{season:n.season})}</span></div>`:u}
    </section>`}renderErrors(){let e=this.result?.errors??[],t=s=>new Date(s).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});return o`<section class="card stack" aria-labelledby="errs">
      <h2 id="errs"><ha-icon icon="mdi:alert-circle-outline"></ha-icon> ${this.t("analysis.errors_title")}</h2>
      <p class="small muted">${this.t("analysis.errors_intro")}</p>
      ${e.length?o`<div>${e.map(s=>o`<div class="err">
        <b>${this.t(`analysis.error.${s.summary[0]?.key??"unexpected"}`)}</b> <span class="xs muted">${t(s.at)} · ${s.user??""} · <code>${s.reason}</code></span>
        <div class="small">${s.summary[0]?.name??""}</div>
      </div>`)}</div>`:o`<div class="finding info"><ha-icon icon="mdi:check-circle-outline"></ha-icon><span>${this.t("analysis.no_errors")}</span></div>`}
    </section>`}};G.styles=[R,S`
      :host { display: block; }
      .tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: var(--hl-s3); }
      .issue { display: grid; grid-template-columns: 28px 1fr; gap: 4px 10px; padding: 10px 12px; border-radius: var(--hl-r-md);
        border: 1px solid var(--hl-border); background: var(--hl-surface); }
      .issue.error { border-left: 4px solid var(--hl-tomato-500); }
      .issue.warning { border-left: 4px solid var(--hl-sun-500); }
      .issue.info { border-left: 4px solid var(--hl-frost-500); }
      .issue .why { font-size: var(--hl-fs-sm); color: var(--hl-text-muted); }
      .tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: var(--hl-s2); }
      .tile { padding: 10px; border-radius: var(--hl-r-md); background: var(--hl-surface-2); }
      .tile b { display: block; font-size: var(--hl-fs-xl); }
      .bed { display: grid; grid-template-columns: 26px 1fr; gap: 2px 10px; padding: 8px 10px; border-bottom: 1px solid var(--hl-border); }
      .bed.ok ha-icon { color: var(--hl-leaf-600); }
      .bed.no ha-icon { color: var(--hl-tomato-500); }
      .bed ul { margin: 2px 0 0; padding-left: 1.1em; font-size: var(--hl-fs-sm); }
      .pick { display: flex; flex-wrap: wrap; gap: var(--hl-s2); align-items: end; }
      .pick hl-plant-image { width: 64px; height: 64px; }
      .err { padding: 8px 10px; border-bottom: 1px solid var(--hl-border); }
      .err code { font-size: var(--hl-fs-xs); }
    `],h([g({attribute:!1})],G.prototype,"snapshot",2),h([g({attribute:!1})],G.prototype,"plants",2),h([g({attribute:!1})],G.prototype,"families",2),h([g({attribute:!1})],G.prototype,"api",2),h([g({attribute:!1})],G.prototype,"t",2),h([g()],G.prototype,"lang",2),h([g({type:Boolean})],G.prototype,"admin",2),h([g()],G.prototype,"section",2),h([f()],G.prototype,"result",2),h([f()],G.prototype,"loading",2),h([f()],G.prototype,"plantId",2),h([f()],G.prototype,"season",2),h([f()],G.prototype,"matchZone",2),h([f()],G.prototype,"explained",2),h([f()],G.prototype,"fixing",2),G=h([M("hl-analysis-view")],G);function Ss(c){let r=new Date(`${c}T12:00:00`);return H(c,-((r.getDay()+6)%7))}var Q=class extends E{constructor(){super(...arguments);this.plants=new Map;this.families={};this.rows=[];this.lang="en";this.season=0;this.view="weeks";this.admin=!0;this.result=null;this.weeksAhead=8;this.loadedFor=""}willUpdate(){let e=`${this.season}:${this.view}`;this.view!=="weeks"&&this.api&&e!==this.loadedFor&&(this.loadedFor=e,this.result=null,this.api.planning(this.season).then(t=>this.result=t).catch(()=>{}))}plant(e){let t=this.plants.get(e);return o`<button class="plant-btn" title=${this.t("lib.open_plant")}
      @click=${()=>this.dispatchEvent(new CustomEvent("open-plant",{detail:e,bubbles:!0,composed:!0}))}>
      ${t?D(N(t),t.color||z(this.families,t.family),20):u}<span>${y(t,this.lang)||e}</span></button>`}render(){return this.view==="weeks"?this.renderWeeks():this.result?this.view==="seeds"?this.renderSeeds(this.result):this.view==="follow"?this.renderFollow(this.result):this.renderHarvest(this.result):o`<p class="muted">${this.t("common.loading")}</p>`}items(){let e=[],t={planned:0,sown_indoors:1,sown:2,transplanted:3,harvesting:4,finished:5,failed:5};for(let s of this.rows){let n=s.planting,a=s.timeline;if(!a||n.status==="failed"||n.status==="finished")continue;let i=t[n.status]??0,l=n.season<this.season,d=n.sow_date??a.sow_date;!l&&n.method==="indoor_sow"&&d&&e.push({row:s,action:"sow_indoor",date:d,done:!!n.sown_on||i>=1}),!l&&n.method==="direct_sow"&&d&&e.push({row:s,action:"sow_direct",date:d,done:!!n.sown_on||i>=2});let p=n.transplant_date??a.transplant_date;!l&&n.method!=="direct_sow"&&p&&e.push({row:s,action:"transplant",date:p,done:!!n.transplanted_on||i>=3}),a.harvest_start&&e.push({row:s,action:"harvest",date:a.harvest_start,done:!!n.harvest_started_on||i>=4})}return e}async done(e){let t=this.snapshot.analysis?.today??new Date().toISOString().slice(0,10),s=e.action==="sow_indoor"?{sown_on:t,status:"sown_indoors"}:e.action==="sow_direct"?{sown_on:t,status:"sown"}:e.action==="transplant"?{transplanted_on:t,status:"transplanted"}:{harvest_started_on:t,status:"harvesting"};try{await this.api.updatePlanting(e.row.planting.id,s),this.dispatchEvent(new CustomEvent("crops-changed",{bubbles:!0,composed:!0}))}catch(n){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("common.error",{message:n.message})},bubbles:!0,composed:!0}))}}renderWeeks(){let e=this.snapshot.analysis?.today??new Date().toISOString().slice(0,10),t=Ss(e),s=H(t,this.weeksAhead*7),n=this.items(),a=n.filter(p=>!p.done&&p.date<t),i=new Map;for(let p of n){if(p.date<t||p.date>=s)continue;let m=Ss(p.date);i.set(m,[...i.get(m)??[],p])}let l=Array.from({length:this.weeksAhead},(p,m)=>H(t,m*7)),d=p=>o`<div class="item ${p.done?"done":""}">
      <span class="act ${p.action}">${this.t(`plan.act.${p.action}`)}</span>
      <span class="grow">${this.plant(p.row.planting.plant_id)} <span class="xs muted">· ${p.row.bed??"\u2013"} · ${_(p.date,this.lang,{weekday:"short",day:"numeric",month:"short"})}</span></span>
      ${p.done?o`<span class="xs">✓</span>`:this.admin?o`<button class="btn small" @click=${()=>this.done(p)}>${this.t("plan.done")}</button>`:u}
    </div>`;return o`<section class="card stack">
      <div class="row wrap"><h2 style="margin:0">${this.t("plan.weeks_title")}</h2><span class="spacer"></span>
        ${[4,8,12].map(p=>o`<button class="chip" aria-pressed=${String(this.weeksAhead===p)} @click=${()=>this.weeksAhead=p}>${this.t("plan.n_weeks",{n:p})}</button>`)}</div>
      <p class="small muted">${this.t("plan.weeks_intro")}</p>
      ${a.length?o`<div class="week"><h3 class="bad-text">${this.t("plan.overdue",{n:a.length})}</h3>${a.map(d)}</div>`:u}
      ${l.map(p=>{let m=(i.get(p)??[]).sort((v,b)=>v.date.localeCompare(b.date));return o`<div class="week"><h3>${this.t("plan.week_of",{date:_(p,this.lang,{day:"numeric",month:"long"})})}${p===t?` \xB7 ${this.t("common.today")}`:""}</h3>
          ${m.length?m.map(d):o`<p class="xs muted">–</p>`}</div>`})}
    </section>`}renderSeeds(e){let t=s=>s.stock.map(n=>`${n.quantity} ${this.t(`journal.unit.${n.unit}`)}${n.year?` (${n.year})`:""}`).join(", ");return o`<section class="card stack">
      <h2 style="margin:0">${this.t("plan.seeds_title",{season:e.season})}</h2>
      <p class="small muted">${this.t("plan.seeds_intro")}</p>
      ${e.seeds.length?o`<table>
        <thead><tr><th>${this.t("lib.plant")}</th><th>${this.t("plan.plants")}</th><th>${this.t("plan.seeds")}</th><th>${this.t("plan.in_stock")}</th><th></th></tr></thead>
        <tbody>${e.seeds.map(s=>o`<tr>
          <td>${this.plant(s.plant_id)}</td><td>${s.plants}</td><td>~${s.seeds}</td><td class="small">${t(s)||"\u2013"}</td>
          <td><span class="chip ${s.status==="ok"?"ok":s.status==="check"?"":"bad"}">${this.t(`plan.seed.${s.status}`)}</span></td>
        </tr>`)}</tbody></table>
        <p class="xs muted">${this.t("plan.seeds_hint")}</p>`:o`<p class="muted">${this.t("plan.seeds_none")}</p>`}
    </section>`}renderFollow(e){let t=new Map;for(let s of[{beds:this.snapshot.beds},...Object.values(this.snapshot.layouts??{})])for(let n of s.beds)t.set(n.id,n.name);return o`<section class="card stack">
      <h2 style="margin:0">${this.t("plan.follow_title")}</h2>
      <p class="small muted">${this.t("plan.follow_intro")}</p>
      ${e.successions.length?e.successions.map(s=>o`<div class="bed">
        <b>${t.get(s.bed_id)??s.bed_id}</b> <span class="small muted">· ${this.t("plan.free_from",{date:_(s.free_from,this.lang,{day:"numeric",month:"long"})})}
          · ${this.t("plan.after",{plants:s.leaving.map(n=>y(this.plants.get(n),this.lang)).join(", ")})}</span>
        <div class="opts">${s.options.length?s.options.map(n=>o`<span class="chip">${this.plant(n.plant_id)}
          <span class="xs muted">${this.t("plan.ready_by",{date:_(n.harvest_by,this.lang,{day:"numeric",month:"short"})})}</span></span>`):o`<span class="small muted">${this.t("plan.follow_nothing")}</span>`}</div>
      </div>`):o`<p class="muted">${this.t("plan.follow_none")}</p>`}
    </section>`}renderHarvest(e){let t=e.harvest.weeks,s=t.findIndex(p=>p.kg>=.05),n=t.length-1-[...t].reverse().findIndex(p=>p.kg>=.05),a=s<0?[]:t.slice(s,n+1),i=Math.max(.1,...a.map(p=>p.kg)),l=Ss(this.snapshot.analysis?.today??new Date().toISOString().slice(0,10)),d=Object.values(e.harvest.totals).reduce((p,m)=>p+m,0);return o`<section class="card stack">
      <h2 style="margin:0">${this.t("plan.harvest_title",{season:e.season})}</h2>
      <p class="small muted">${this.t("plan.harvest_intro",{kg:Math.round(d)})}</p>
      ${a.length?o`
        <div class="bars" role="img" aria-label=${this.t("plan.harvest_title",{season:e.season})}>
          ${a.map(p=>o`<div class="b ${p.week===l?"now":""}" style=${`height:${p.kg/i*100}%`}
            title=${`${_(p.week,this.lang,{day:"numeric",month:"short"})}: ${p.kg} kg \u2013 ${Object.entries(p.by_plant).sort((m,v)=>v[1]-m[1]).slice(0,4).map(([m,v])=>`${y(this.plants.get(m),this.lang)} ${v}`).join(", ")}`}></div>`)}
        </div>
        <div class="axis">${a.map((p,m)=>o`<span>${m%4===0?_(p.week,this.lang,{day:"numeric",month:"numeric"}):""}</span>`)}</div>
        <table><thead><tr><th>${this.t("lib.plant")}</th><th>kg</th><th></th></tr></thead>
          <tbody>${Object.entries(e.harvest.totals).map(([p,m])=>o`<tr><td>${this.plant(p)}</td><td>${m}</td>
            <td class="xs muted">${e.harvest.learned.includes(p)?this.t("plan.learned"):this.t("plan.book_yield")}</td></tr>`)}</tbody></table>`:o`<p class="muted">${this.t("plan.harvest_none")}</p>`}
    </section>`}};Q.styles=[R,S`
      :host { display: block; }
      .week { margin-bottom: var(--hl-s3); }
      .week h3 { margin: 0 0 6px; font-size: var(--hl-fs-md); }
      .item { display: flex; gap: 8px; align-items: center; padding: 6px 8px; border-radius: var(--hl-r-md); background: var(--hl-surface); border: 1px solid var(--hl-border); margin-bottom: 4px; }
      .item.done { opacity: 0.55; }
      .item .grow { flex: 1; min-width: 0; }
      .act { font-size: var(--hl-fs-xs); padding: 1px 8px; border-radius: 10px; background: var(--hl-surface-2); white-space: nowrap; }
      .act.sow_indoor { background: var(--hl-leaf-100); }
      .act.sow_direct { background: var(--hl-sun-100); }
      .act.transplant { background: var(--hl-frost-100, #e3f0fb); }
      .act.harvest { background: var(--hl-tomato-100, #fde3dc); }
      table { width: 100%; border-collapse: collapse; font-size: var(--hl-fs-sm); }
      th, td { text-align: left; padding: 6px; border-bottom: 1px solid var(--hl-border); }
      .bars { display: flex; align-items: flex-end; gap: 3px; height: 160px; padding-top: 10px; }
      .bars .b { flex: 1; background: var(--hl-leaf-500); border-radius: 3px 3px 0 0; min-height: 1px; position: relative; }
      .bars .b.now { background: var(--hl-sun-500); }
      .axis { display: flex; gap: 3px; font-size: 9px; color: var(--hl-text-muted); }
      .axis span { flex: 1; text-align: center; overflow: hidden; }
      .bed { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s2) var(--hl-s3); margin-bottom: var(--hl-s2); }
      .opts { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
      .opts .chip, .plant { display: inline-flex; align-items: center; gap: 4px; }
      .plant-btn { border: 0; background: none; padding: 0; font: inherit; color: inherit; cursor: pointer; display: inline-flex; gap: 6px; align-items: center; }
    `],h([g({attribute:!1})],Q.prototype,"snapshot",2),h([g({attribute:!1})],Q.prototype,"api",2),h([g({attribute:!1})],Q.prototype,"t",2),h([g({attribute:!1})],Q.prototype,"plants",2),h([g({attribute:!1})],Q.prototype,"families",2),h([g({attribute:!1})],Q.prototype,"rows",2),h([g()],Q.prototype,"lang",2),h([g({type:Number})],Q.prototype,"season",2),h([g()],Q.prototype,"view",2),h([g({type:Boolean})],Q.prototype,"admin",2),h([f()],Q.prototype,"result",2),h([f()],Q.prototype,"weeksAhead",2),Q=h([M("hl-crops-planning")],Q);var Es=["planned","sown_indoors","sown","transplanted","harvesting","finished","failed"],Fn=["indoor_sow","direct_sow","transplant"],Un={indoor_sow:"lib.indoor_sow",direct_sow:"lib.direct_sow",transplant:"lib.transplant"},bt=["sow_date","sown_on","transplant_date","transplanted_on","harvest_started_on","finished_on"],A=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.initialSeason=null;this.focusPlanting=null;this.picked=new Set;this.bulkStatus="";this.bulkField="";this.bulkDate=null;this.highlight="";this.view="list";this.compact=!1;this.onMedia=()=>this.compact=!!this.media?.matches;this.season=0;this.rows=[];this.filter="";this.group="bed";this.open=null;this.saving=new Set;this.plantMap=new Map}connectedCallback(){super.connectedCallback(),this.media=window.matchMedia("(max-width: 760px)"),this.media.addEventListener("change",this.onMedia),this.onMedia(),this.season||(this.season=this.initialSeason??this.snapshot?.layout_season??this.snapshot?.analysis?.season??new Date().getFullYear()),this.load()}disconnectedCallback(){super.disconnectedCallback(),this.media?.removeEventListener("change",this.onMedia),window.clearTimeout(this.reloadTimer)}willUpdate(e){e.has("plants")&&(this.plantMap=new Map(this.plants.map(t=>[t.id,t]))),e.has("focusPlanting")&&this.focusPlanting&&this.showFocus(this.focusPlanting),e.has("snapshot")&&e.get("snapshot")!==void 0&&!this.saving.size&&(window.clearTimeout(this.reloadTimer),this.reloadTimer=window.setTimeout(()=>void this.load(),600))}async showFocus(e){e.season!==this.season?(this.season=e.season,await this.load()):this.rows.length||await this.load(),this.rows.find(s=>s.planting.id===e.id)&&(this.filter="",this.highlight=e.id,await this.updateComplete,this.renderRoot.querySelector(`tr[data-id="${e.id}"]`)?.scrollIntoView({block:"center",behavior:"smooth"}))}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}togglePick(e,t){let s=new Set(this.picked);t?s.add(e):s.delete(e),this.picked=s}async applyBulk(){let e={};if(this.bulkStatus&&(e.status=this.bulkStatus),this.bulkField&&(e[this.bulkField]=this.bulkDate),!(!Object.keys(e).length||!this.picked.size))try{let t=await this.api.updatePlantings([...this.picked],e);this.toast(this.t("crops.bulk_done",{n:t.updated})),this.picked=new Set,await this.load()}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}}renderBulk(){return!this.admin||!this.picked.size?u:o`<div class="bulk card" role="region" aria-label=${this.t("crops.bulk")}>
      <b>${this.t("crops.bulk_n",{n:this.picked.size})}</b>
      <label class="small">${this.t("crops.status")}
        <select @change=${e=>this.bulkStatus=e.target.value}>
          <option value="">–</option>${Es.map(e=>o`<option value=${e} ?selected=${this.bulkStatus===e}>${this.t(`status.${e}`)}</option>`)}
        </select></label>
      <label class="small">${this.t("crops.bulk_date")}
        <select @change=${e=>this.bulkField=e.target.value}>
          <option value="">–</option>${bt.map(e=>o`<option value=${e} ?selected=${this.bulkField===e}>${this.t(`crops.field.${e}`)}</option>`)}
        </select></label>
      ${this.bulkField?o`<hl-date-input .value=${this.bulkDate??""} lang=${this.lang} label=${this.t(`crops.field.${this.bulkField}`)}
        pickLabel=${this.t("crops.pick_date")} @date-change=${e=>this.bulkDate=e.detail}></hl-date-input>
        <button class="chip" @click=${()=>this.bulkDate=this.snapshot.analysis?.today??new Date().toISOString().slice(0,10)}>${this.t("common.today")}</button>`:u}
      <span class="spacer"></span>
      <button class="btn primary small" ?disabled=${!this.bulkStatus&&!this.bulkField} @click=${()=>this.applyBulk()}>${this.t("crops.bulk_apply")}</button>
      <button class="btn ghost small" @click=${()=>this.picked=new Set}>${this.t("common.cancel")}</button>
    </div>`}async load(){try{this.rows=(await this.api.plantingsSeason(this.season)).rows,this.open&&(this.open=this.rows.find(e=>e.planting.id===this.open.planting.id)??null)}catch{}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async saveRow(e,t){let s=e.planting.id;this.saving=new Set([...this.saving,s]);try{let n=await this.api.updatePlanting(s,t);n.row&&(this.rows=this.rows.map(a=>a.planting.id===s?n.row:a),this.open?.planting.id===s&&(this.open=n.row))}catch(n){this.toast(this.t("common.error",{message:n.message??String(n)})),await this.load()}finally{let n=new Set(this.saving);n.delete(s),this.saving=n}}computed(e,t){let s=e.timeline;return s?t==="sow_date"?s.sow_date:t==="transplant_date"?s.transplant_date:t==="harvest_started_on"?s.harvest_start:t==="finished_on"?s.harvest_end:null:null}dateInput(e,t){let s=e.planting[t]??"",n=this.computed(e,t);return o`<hl-date-input .value=${s} lang=${this.lang} ?disabled=${!this.admin} label=${this.t(`crops.field.${t}`)} pickLabel=${this.t("crops.pick_date")}
      @date-change=${a=>this.saveRow(e,{[t]:a.detail})}></hl-date-input>
      ${!s&&n?o`<span class="computed">${this.t("crops.computed")}: ${_(n,this.lang)}</span>`:u}`}icon(e,t="thumb"){let s=this.plantMap.get(e.planting.plant_id);return s?o`<hl-plant-image .plant=${s} color=${z(this.families,s.family)} lang=${this.lang} size=${t}
      style="width:32px;height:32px"></hl-plant-image>`:u}visibleRows(){let e=this.filter.trim().toLowerCase(),t=this.rows.filter(n=>!e||[y(this.plantMap.get(n.planting.plant_id),this.lang),n.bed??"",n.zone??""].some(a=>a.toLowerCase().includes(e))),s=n=>this.group==="bed"?`${n.zone??""} ${n.bed??""}`:this.group==="plant"?y(this.plantMap.get(n.planting.plant_id),this.lang):n.timeline?.in_ground??"";return t.sort((n,a)=>s(n).localeCompare(s(a))||y(this.plantMap.get(n.planting.plant_id),this.lang).localeCompare(y(this.plantMap.get(a.planting.plant_id),this.lang)))}render(){return o`
      <div class="views" role="tablist">${[["list","mdi:table"],["weeks","mdi:calendar-week"],["seeds","mdi:seed-outline"],["follow","mdi:swap-horizontal"],["harvest","mdi:basket-outline"]].map(([t,s])=>o`<button class="chip" role="tab" aria-selected=${String(this.view===t)}
        aria-pressed=${String(this.view===t)} @click=${()=>this.view=t}><ha-icon icon=${s}></ha-icon>${this.t(`crops.view.${t}`)}</button>`)}</div>
      ${this.view==="list"?this.renderList():o`${this.renderSeasonPick()}
        <hl-crops-planning .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} .plants=${this.plantMap} .families=${this.families}
          .rows=${this.rows} season=${this.season} view=${this.view} ?admin=${this.admin} @crops-changed=${()=>this.load()}></hl-crops-planning>`}
      ${this.open?this.renderDetail(this.open):u}`}renderSeasonPick(){let e=[this.season-1,this.season,this.season+1];return o`<select style="width:auto;margin-bottom:var(--hl-s2)" aria-label=${this.t("planner.season")} @change=${t=>{this.season=Number(t.target.value),this.load(),this.dispatchEvent(new CustomEvent("season-changed",{detail:this.season,bubbles:!0,composed:!0}))}}>
      ${e.map(t=>o`<option value=${t} ?selected=${t===this.season}>${this.t("common.season",{year:t})}</option>`)}
    </select>`}renderCards(e){return o`<div class="cards">${e.map(t=>{let s=t.planting,n=t.timeline,a={planned:0,sown_indoors:1,sown:2,transplanted:3,harvesting:4}[s.status]??5,i=!s.sown_on&&a<1&&s.method!=="transplant"?["sown_on"]:!s.transplanted_on&&a<3&&s.method!=="direct_sow"?["transplanted_on"]:!s.harvest_started_on&&a<4?["harvest_started_on"]:["finished_on"];return o`<article class="crop-card ${this.highlight===s.id?"hl":""}" data-id=${s.id}>
        <div class="row" style="gap:8px">${this.icon(t)}
          <button class="name" @click=${()=>this.open=t}>${y(this.plantMap.get(s.plant_id),this.lang)||s.plant_id}</button>
          <span class="spacer"></span><span class="chip">${this.t(`status.${s.status}`)}</span></div>
        <div class="xs muted">${t.zone??""} · ${t.bed??this.t("crops.no_bed")}${n?.late?` \xB7 \u26A0 ${this.t("crops.late")}`:""}</div>
        <label class="field">${this.t(`crops.field.${i[0]}`)}${this.dateInput(t,i[0])}</label>
        <div class="row wrap" style="gap:6px">
          <button class="btn small ghost" @click=${()=>this.open=t}>${this.t("crops.all_dates")}</button>
          ${t.bed?o`<button class="btn small ghost" @click=${()=>this.emit("focus-planting",{planting_id:s.id,season:this.season})}>🗺 ${this.t("crops.show_on_map")}</button>`:u}
        </div>
      </article>`})}</div>`}renderList(){let e=[this.season-1,this.season,this.season+1],t=this.visibleRows(),s="";return o`
      <div class="top">
        <select style="width:auto" aria-label=${this.t("planner.season")} @change=${n=>{this.season=Number(n.target.value),this.load(),this.dispatchEvent(new CustomEvent("season-changed",{detail:this.season,bubbles:!0,composed:!0}))}}>
          ${e.map(n=>o`<option value=${n} ?selected=${n===this.season}>${this.t("common.season",{year:n})}</option>`)}
        </select>
        <input type="search" placeholder=${this.t("crops.search")} .value=${this.filter} @input=${n=>this.filter=n.target.value} />
        <span class="small">${this.t("crops.group")}:</span>
        ${["bed","plant","date"].map(n=>o`<button class="chip" aria-pressed=${String(this.group===n)} @click=${()=>this.group=n}>${this.t(`crops.group.${n}`)}</button>`)}
        <span class="small muted">${this.t("planner.count",{n:t.length})}</span>
      </div>
      <p class="small muted">${this.t("crops.intro")}</p>
      ${this.renderBulk()}
      ${t.length&&this.compact?this.renderCards(t):t.length?o`<div class="card wrap"><table>
        <thead><tr>${this.admin?o`<th><input type="checkbox" aria-label=${this.t("crops.pick_all")} .checked=${t.length>0&&t.every(n=>this.picked.has(n.planting.id))}
          @change=${n=>this.picked=n.target.checked?new Set(t.map(a=>a.planting.id)):new Set} /></th>`:u}<th>${this.t("lib.plant")}</th><th>${this.t("task.bed")}</th><th>${this.t("crops.method")}</th><th>${this.t("crops.status")}</th>
          ${bt.map(n=>o`<th>${this.t(`crops.field.${n}`)}</th>`)}<th>#</th></tr></thead>
        <tbody>${t.map(n=>{let a=this.group==="bed"?`${n.zone??"?"} \xB7 ${n.bed??this.t("crops.no_bed")}`:"",i=a&&a!==s?o`<tr class="group"><td colspan=${6+bt.length}>${a}</td></tr>`:u;s=a||s;let l=n.planting;return o`${i}<tr data-id=${l.id} class="${this.saving.has(l.id)?"saving":""} ${this.highlight===l.id?"hl":""}">
            ${this.admin?o`<td><input type="checkbox" aria-label=${y(this.plantMap.get(l.plant_id),this.lang)} .checked=${this.picked.has(l.id)}
              @change=${d=>this.togglePick(l.id,d.target.checked)} /></td>`:u}
            <td class="plant">${this.icon(n)}<button @click=${()=>this.open=n}>${y(this.plantMap.get(l.plant_id),this.lang)||l.plant_id}</button>
              ${n.bed?o`<button class="map" title=${this.t("crops.show_on_map")} aria-label=${this.t("crops.show_on_map")}
                @click=${()=>this.emit("focus-planting",{planting_id:l.id,season:this.season})}>🗺</button>`:u}
              ${n.timeline?.late?o`<ha-icon class="late" icon="mdi:clock-alert-outline" title=${this.t("crops.late")}></ha-icon>`:u}</td>
            <td>${n.bed??o`<span class="late">${this.t("crops.no_bed")}</span>`}</td>
            <td><select ?disabled=${!this.admin} @change=${d=>this.saveRow(n,{method:d.target.value})}>
              ${Fn.map(d=>o`<option value=${d} ?selected=${l.method===d}>${this.t(Un[d])}</option>`)}</select></td>
            <td><select ?disabled=${!this.admin} @change=${d=>this.saveRow(n,{status:d.target.value})}>
              ${Es.map(d=>o`<option value=${d} ?selected=${l.status===d}>${this.t(`status.${d}`)}</option>`)}</select></td>
            ${bt.map(d=>o`<td>${this.dateInput(n,d)}</td>`)}
            <td><input type="number" min="0" .value=${l.count==null?"":String(l.count)} placeholder="auto" ?disabled=${!this.admin}
              @change=${d=>this.saveRow(n,{count:d.target.value===""?null:Number(d.target.value)})} /></td>
          </tr>`})}</tbody></table></div>`:o`<p class="muted">${this.t("crops.none",{season:this.season})}</p>`}`}renderDetail(e){let t=e.planting,s=this.plantMap.get(t.plant_id),n=e.timeline,a=this.visibleRows(),i=a.findIndex(d=>d.planting.id===t.id),l=(d,p,m)=>p?o`<span>${d}</span><span>${_(p,this.lang)}${m?` \u2013 ${_(m,this.lang)}`:""}</span>`:u;return o`<hl-modal heading=${y(s,this.lang)} subheading=${`${e.zone??""} \xB7 ${e.bed??""} \xB7 ${this.t("common.season",{year:t.season})}`}
      accent=${s?z(this.families,s.family):""} nav ?has-prev=${i>0} ?has-next=${i>=0&&i<a.length-1}
      closeLabel=${this.t("common.close")} prevLabel=${this.t("common.previous")} nextLabel=${this.t("common.next")}
      @prev=${()=>this.open=a[i-1]} @next=${()=>this.open=a[i+1]} @closed=${()=>this.open=null}>
      ${s?o`<hl-plant-image .plant=${s} color=${z(this.families,s.family)} lang=${this.lang} size="card" credit></hl-plant-image>`:u}
      ${n?o`<div class="kv">
        ${l(this.t("crops.window.sow"),n.sow_window?.start,n.sow_window?.end)}
        ${l(this.t("crops.window.transplant"),n.transplant_window?.start,n.transplant_window?.end)}
        ${l(this.t("crops.in_ground"),n.in_ground)}
        ${l(this.t("crops.harvest"),n.harvest_start,n.harvest_end)}
      </div>${n.late?o`<div class="finding warning"><ha-icon icon="mdi:clock-alert-outline"></ha-icon><span>${this.t("crops.late")}</span></div>`:u}`:u}
      <div class="form-grid">
        <label class="field">${this.t("crops.method")}<select ?disabled=${!this.admin} @change=${d=>this.saveRow(e,{method:d.target.value})}>
          ${Fn.map(d=>o`<option value=${d} ?selected=${t.method===d}>${this.t(Un[d])}</option>`)}</select></label>
        <label class="field">${this.t("crops.status")}<select ?disabled=${!this.admin} @change=${d=>this.saveRow(e,{status:d.target.value})}>
          ${Es.map(d=>o`<option value=${d} ?selected=${t.status===d}>${this.t(`status.${d}`)}</option>`)}</select></label>
        ${bt.map(d=>o`<label class="field">${this.t(`crops.field.${d}`)}${this.dateInput(e,d)}</label>`)}
        <label class="field">${this.t("crops.count")}<input type="number" min="0" .value=${t.count==null?"":String(t.count)} placeholder="auto" ?disabled=${!this.admin}
          @change=${d=>this.saveRow(e,{count:d.target.value===""?null:Number(d.target.value)})} /></label>
        <label class="field full">${this.t("crops.notes")}<textarea .value=${t.notes??""} ?disabled=${!this.admin}
          @change=${d=>this.saveRow(e,{notes:d.target.value})}></textarea></label>
      </div>
      <p class="xs muted">${this.t("crops.detail_hint")}</p>
      <div slot="actions" class="row wrap">
        ${e.bed?o`<button class="btn small" @click=${()=>this.emit("focus-planting",{planting_id:t.id,season:t.season})}>🗺 ${this.t("crops.show_on_map")}</button>`:u}
        <button class="btn small ghost" @click=${()=>this.emit("open-plant",t.plant_id)}>${this.t("planner.plant_info")}</button>
      </div>
    </hl-modal>`}};A.styles=[R,S`
      :host { display: block; }
      .top { display: flex; flex-wrap: wrap; gap: var(--hl-s2); align-items: center; margin-bottom: var(--hl-s3); }
      .top input[type="search"] { flex: 1; min-width: 180px; }
      table { width: 100%; border-collapse: collapse; font-size: var(--hl-fs-sm); }
      th { text-align: left; font-weight: 600; color: var(--hl-text-muted); padding: 6px; border-bottom: 2px solid var(--hl-border); white-space: nowrap; }
      td { padding: 4px 6px; border-bottom: 1px solid var(--hl-border); vertical-align: middle; }
      tr.group td { background: var(--hl-surface-2); font-weight: 700; padding-top: 10px; }
      td.plant { display: flex; gap: 8px; align-items: center; min-width: 160px; }
      td.plant button { all: unset; cursor: pointer; font-weight: 600; }
      td.plant button:hover { text-decoration: underline; }
      td hl-date-input { width: 136px; }
      td input[type="number"] { width: 64px; min-height: 30px; }
      td select { min-height: 30px; padding: 2px 4px; font-size: var(--hl-fs-sm); width: auto; }
      .computed { font-size: 10px; color: var(--hl-text-muted); display: block; }
      .late { color: var(--hl-warning); }
      .wrap { overflow-x: auto; }
      tr.saving { opacity: 0.6; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .full { grid-column: 1 / -1; }
      .kv { display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; font-size: var(--hl-fs-sm); }
      tr.hl td { background: var(--hl-sun-100); }
      td.plant button.map { font-weight: 400; opacity: 0.7; }
      td.plant button.map:hover { opacity: 1; text-decoration: none; }
      .bulk { display: flex; flex-wrap: wrap; gap: var(--hl-s2) var(--hl-s3); align-items: center; padding: var(--hl-s2) var(--hl-s3); margin-bottom: var(--hl-s2);
        position: sticky; top: 0; z-index: 2; border: 1px solid var(--hl-primary); }
      .bulk label { display: inline-flex; gap: 6px; align-items: center; }
      .views { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: var(--hl-s3); }
      .cards { display: flex; flex-direction: column; gap: var(--hl-s2); }
      .crop-card { background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); padding: var(--hl-s2) var(--hl-s3); display: flex; flex-direction: column; gap: 6px; }
      .crop-card.hl { background: var(--hl-sun-100); }
      .crop-card .name { all: unset; cursor: pointer; font-weight: 600; }
      .crop-card hl-date-input { max-width: none; }
      .bulk select { width: auto; min-height: 30px; }
    `],h([g({attribute:!1})],A.prototype,"snapshot",2),h([g({attribute:!1})],A.prototype,"plants",2),h([g({attribute:!1})],A.prototype,"families",2),h([g({attribute:!1})],A.prototype,"api",2),h([g({attribute:!1})],A.prototype,"t",2),h([g()],A.prototype,"lang",2),h([g({type:Boolean})],A.prototype,"admin",2),h([g({type:Number})],A.prototype,"initialSeason",2),h([g({attribute:!1})],A.prototype,"focusPlanting",2),h([f()],A.prototype,"picked",2),h([f()],A.prototype,"bulkStatus",2),h([f()],A.prototype,"bulkField",2),h([f()],A.prototype,"bulkDate",2),h([f()],A.prototype,"highlight",2),h([f()],A.prototype,"view",2),h([f()],A.prototype,"compact",2),h([f()],A.prototype,"season",2),h([f()],A.prototype,"rows",2),h([f()],A.prototype,"filter",2),h([f()],A.prototype,"group",2),h([f()],A.prototype,"open",2),h([f()],A.prototype,"saving",2),A=h([M("hl-crops-view")],A);var Gn=[{id:"dashboard",icon:"mdi:home-variant-outline",mobile:!0},{id:"layout",icon:"mdi:floor-plan",mobile:!1},{id:"planner",icon:"mdi:sprout",mobile:!0},{id:"crops",icon:"mdi:format-list-bulleted-square",mobile:!0},{id:"library",icon:"mdi:sprout-outline",mobile:!0},{id:"calendar",icon:"mdi:calendar-month-outline",mobile:!0},{id:"journal",icon:"mdi:notebook-outline",mobile:!1},{id:"advice",icon:"mdi:chat-question-outline",mobile:!0},{id:"analysis",icon:"mdi:stethoscope",mobile:!1},{id:"handbook",icon:"mdi:book-open-page-variant-outline",mobile:!0},{id:"print",icon:"mdi:printer-outline",mobile:!1},{id:"settings",icon:"mdi:cog-outline",mobile:!1}],B=class extends E{constructor(){super(...arguments);this.narrow=!1;this.snapshot=null;this.plants=[];this.families={};this.tab="dashboard";this.toastMsg="";this.openTask=null;this.creatingTask=!1;this.error="";this.chapter="";this.plannerSeason=null;this.transitionRequest=0;this.popupPlant=null;this.plannerFocus=null;this.cropsFocus=null;this.t=Et("en");this.uiLang="en"}willUpdate(e){if(e.has("hass")&&this.hass){let t=rt(this.snapshot?.lang??this.hass.locale?.language??this.hass.language);t!==this.uiLang&&(this.uiLang=t,this.t=Et(t)),this.toggleAttribute("dark",!!this.hass.themes?.darkMode),fn(this.hass),this.api?this.api.setHass(this.hass):(this.api=new ot(this.hass),this.connect())}if(e.has("route")&&this.route){let[t,s]=this.route.path.replace(/^\//,"").split("/");this.tab=Gn.some(n=>n.id===t)?t:"dashboard",this.tab==="handbook"&&(this.chapter=s??"")}}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.unsubscribe=void 0,this.api=void 0}connectedCallback(){super.connectedCallback(),this.hass&&!this.api&&(this.api=new ot(this.hass),this.connect())}async connect(){try{await this.loadPlants(),this.loadGlossary(),this.unsubscribe=await this.api.subscribe(e=>{this.snapshot=e;let t=rt(e.lang);t!==this.uiLang&&(this.uiLang=t,this.t=Et(t),this.loadGlossary()),this.openTask&&(this.openTask=e.tasks.find(s=>s.id===this.openTask.id)??null)})}catch(e){this.error=e.code==="not_loaded"?this.t("common.not_loaded"):String(e.message??e)}}async loadGlossary(){try{yn((await this.api.handbookIndex(this.uiLang)).glossary),gn(await this.api.supplies())}catch{}}openHandbook(e=""){this.chapter=e;let t=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/handbook${e?`/${e}`:""}`;history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab="handbook"}async loadPlants(){let e=await this.api.plants();this.plants=e.plants,this.families=e.families}navigate(e,t){t?.preventDefault();let s=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/${e==="dashboard"?"":e}`.replace(/\/$/,"");history.pushState(null,"",s),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab=e}openPlant(e){this.popupPlant=this.plants.find(t=>t.id===e)??null}focusPlanting(e){this.popupPlant=null,this.plannerSeason=e.season,this.plannerFocus={id:e.planting_id,season:e.season,n:(this.plannerFocus?.n??0)+1},this.navigate("planner")}focusCrop(e){this.plannerSeason=e.season,this.cropsFocus={id:e.planting_id,season:e.season,n:(this.cropsFocus?.n??0)+1},this.navigate("crops")}renderPlantPopup(){let e=this.popupPlant;return!e||!this.snapshot?u:o`<hl-modal heading=${y(e,this.uiLang)} accent=${z(this.families,e.family)} closeLabel=${this.t("common.close")}
      @closed=${()=>this.popupPlant=null}
      @select-plant=${t=>{this.popupPlant=t.detail,this.updateComplete.then(()=>this.renderRoot.querySelector("hl-modal")?.toTop())}}
      @focus-planting=${t=>this.focusPlanting(t.detail)}>
      <span slot="subheading" class="small muted"><i>${e.scientific_name}</i> · ${this.families[e.family]?.[this.uiLang]??e.family}</span>
      <hl-plant-detail .plant=${e} .plants=${this.plants} .families=${this.families} .snapshot=${this.snapshot} .t=${this.t} lang=${this.uiLang}></hl-plant-detail>
    </hl-modal>`}toast(e){this.toastMsg=e,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastMsg="",4500)}async completeTask(e){try{await this.api.taskAction(e.id,"complete"),this.toast(this.t("task.completed",{title:e.title}))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async irrigation(e){try{if(e==="stop"){await this.api.irrigationStop(),this.toast(this.t("dash.irrigation_stopped"));return}let t=await this.api.irrigationRun(),s=Object.values(t.reasons??{});this.toast(t.started?this.t("dash.irrigation_started",{min:Math.round(t.total_minutes)}):s[0]??this.t("dash.irrigation_nothing"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async closeValve(e){try{let t=await this.api.irrigationClose(e);this.toast(t.state==="off"||t.state==="closed"?this.t("valve.closed"):this.t("valve.still_open",{state:t.state??"?"}))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async postponeTask(e,t){try{await this.api.taskAction(e.id,"postpone",{days:t}),this.toast(this.t("task.postponed",{title:e.title,n:t}))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderTab(){let e=this.snapshot,t=this.hass.user?.is_admin??!0,s=new Map(this.plants.map(n=>[n.id,n]));switch(this.tab){case"layout":return o`<hl-planner-view mode="layout" .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} .narrow=${this.narrow} .initialSeason=${this.plannerSeason}
          .transitionRequest=${this.transitionRequest}></hl-planner-view>`;case"crops":return o`<hl-crops-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} .initialSeason=${this.plannerSeason} .focusPlanting=${this.cropsFocus}></hl-crops-view>`;case"analysis":return o`<hl-analysis-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t}></hl-analysis-view>`;case"planner":return o`<hl-planner-view mode="plant" .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} .narrow=${this.narrow} .initialSeason=${this.plannerSeason}
          .focusPlanting=${this.plannerFocus}></hl-planner-view>`;case"library":return o`<hl-library-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} @plants-changed=${()=>this.loadPlants()}></hl-library-view>`;case"calendar":return o`<hl-calendar-view .snapshot=${e} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .plants=${s} .families=${this.families}></hl-calendar-view>`;case"journal":return o`<hl-journal-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t}></hl-journal-view>`;case"advice":return o`<hl-advice-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t}></hl-advice-view>`;case"handbook":return o`<hl-handbook-view .api=${this.api} .t=${this.t} .lang=${this.uiLang} .chapterId=${this.chapter} .narrow=${this.narrow}></hl-handbook-view>`;case"print":return o`<hl-print-view .snapshot=${e} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .narrow=${this.narrow} .admin=${t}></hl-print-view>`;case"settings":return o`<hl-settings-view .snapshot=${e} .hass=${this.hass} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .admin=${t}></hl-settings-view>`;default:return o`<hl-dashboard-view .snapshot=${e} .plants=${s} .families=${this.families} .t=${this.t} .lang=${this.uiLang} .admin=${t}></hl-dashboard-view>`}}renderBadge(){let e=this.snapshot?.diagnosis,t=e?e.error+e.warning:0;return!e||!t?u:o`<span class="badge ${e.error?"bad":"warn"}" title=${this.t("analysis.badge",{errors:e.error,warnings:e.warning})}>${t}</span>`}renderNav(e){return o`<nav class=${e} aria-label="Hortulus">
      ${Gn.filter(t=>e!=="bottom-nav"||t.mobile).map(t=>o`<a href="#" aria-current=${t.id===this.tab?"page":"false"} @click=${s=>this.navigate(t.id,s)}>
        <ha-icon icon=${t.icon}></ha-icon>${this.t(`nav.${t.id}`)}${t.id==="analysis"?this.renderBadge():u}</a>`)}
    </nav>`}render(){return o`
      <header class="appbar">
        ${this.narrow?o`<button class="icon-btn" aria-label="Menu" @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}>
          <ha-icon icon="mdi:menu"></ha-icon></button>`:u}
        <div class="brand">${ss(30)}<span>Hortulus</span>${this.narrow?u:o`<small>${this.t("app.tagline")}</small>`}</div>
        ${this.renderNav("top")}
        ${this.narrow?o`<span style="flex:1"></span>
          <button class="icon-btn" aria-label=${this.t("nav.journal")} @click=${()=>this.navigate("journal")}><ha-icon icon="mdi:notebook-outline"></ha-icon></button>
          <button class="icon-btn" aria-label=${this.t("nav.print")} @click=${()=>this.navigate("print")}><ha-icon icon="mdi:printer-outline"></ha-icon></button>
          <button class="icon-btn" aria-label=${this.t("nav.settings")} aria-pressed=${String(this.tab==="settings")} @click=${()=>this.navigate("settings")}>
            <ha-icon icon="mdi:cog-outline"></ha-icon></button>`:u}
      </header>
      <main @open-task=${e=>this.openTask=e.detail}
        @complete-task=${e=>this.completeTask(e.detail)}
        @postpone-task=${e=>this.postponeTask(e.detail.task,e.detail.days)}
        @irrigation=${e=>this.irrigation(e.detail)}
        @close-valve=${e=>this.closeValve(e.detail)}
        @new-task=${()=>this.creatingTask=!0}
        @navigate=${e=>this.navigate(e.detail)}
        @season-changed=${e=>this.plannerSeason=e.detail}
        @year-transition=${()=>{this.navigate("layout"),this.transitionRequest+=1}}
        @open-handbook=${e=>this.openHandbook(e.detail?.chapter??"")}
        @open-plant=${e=>this.openPlant(e.detail)}
        @focus-planting=${e=>this.focusPlanting(e.detail)}
        @focus-crop=${e=>this.focusCrop(e.detail)}
        @hl-toast=${e=>this.toast(e.detail.message)}>
        ${this.error?o`<div class="card error">${ss(56)}<p>${this.error}</p></div>`:this.snapshot?this.renderTab():o`<p class="empty">${this.t("common.loading")}</p>`}
      </main>
      ${this.renderNav("bottom-nav")}
      ${this.snapshot&&(this.openTask||this.creatingTask)?o`<hl-task-dialog .task=${this.openTask} .create=${this.creatingTask} .snapshot=${this.snapshot}
        @open-handbook=${e=>this.openHandbook(e.detail?.chapter??"")}
        .beds=${this.snapshot.beds} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .today=${this.snapshot.analysis?.today??""}
        @hl-toast=${e=>this.toast(e.detail.message)}
        @closed=${()=>{this.openTask=null,this.creatingTask=!1}}></hl-task-dialog>`:u}
      ${this.renderPlantPopup()}
      ${this.toastMsg?o`<div class="toast" role="status" aria-live="polite">${this.toastMsg}</div>`:u}
    `}};B.styles=[sn,R,S`
      :host { display: block; min-height: 100vh; background: var(--hl-bg); }
      .appbar { position: sticky; top: 0; z-index: 4; display: flex; align-items: center; gap: var(--hl-s3);
        padding: 0 var(--hl-s4); height: 56px; background: color-mix(in srgb, var(--hl-surface) 92%, transparent);
        backdrop-filter: blur(8px); border-bottom: 1px solid var(--hl-border); }
      .brand { display: flex; align-items: center; gap: var(--hl-s2); font-weight: 700; font-size: var(--hl-fs-lg); letter-spacing: 0.01em; }
      .brand small { font-weight: 400; color: var(--hl-text-muted); font-size: var(--hl-fs-xs); }
      nav { display: flex; gap: 2px; margin-left: var(--hl-s4); overflow-x: auto; }
      nav a { display: inline-flex; align-items: center; gap: 6px; padding: 0 14px; height: 40px; border-radius: var(--hl-r-pill);
        color: var(--hl-text-muted); text-decoration: none; font-weight: 500; white-space: nowrap; --mdc-icon-size: 18px; }
      nav a:hover { background: var(--hl-surface-2); color: var(--hl-text); }
      nav a[aria-current="page"] { background: var(--hl-leaf-100); color: var(--hl-chip-active-fg); }
      nav a:focus-visible { outline: 2px solid var(--hl-focus); outline-offset: 2px; }
      nav a .badge { min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px; font-size: 11px; font-weight: 700; color: #fff;
        display: inline-grid; place-items: center; line-height: 1; }
      nav a .badge.bad { background: var(--hl-danger); }
      nav a .badge.warn { background: var(--hl-warning); }
      main { padding: var(--hl-s4); max-width: 1680px; margin: 0 auto; }
      .bottom-nav { display: none; }
      :host([narrow]) nav.top { display: none; }
      :host([narrow]) .bottom-nav { display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 4; background: var(--hl-surface);
        border-top: 1px solid var(--hl-border); justify-content: space-around; padding: 4px 0 calc(4px + env(safe-area-inset-bottom)); }
      :host([narrow]) .bottom-nav a { flex-direction: column; height: auto; padding: 4px 2px; font-size: 10.5px; gap: 2px; margin: 0;
        flex: 1 1 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      :host([narrow]) main { padding: var(--hl-s3) var(--hl-s3) 88px; }
      .toast { position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); z-index: 20; background: var(--hl-soil-900); color: #fff;
        padding: 10px 18px; border-radius: var(--hl-r-pill); box-shadow: var(--hl-shadow-3); font-size: var(--hl-fs-sm); max-width: calc(100vw - 32px); }
      :host([narrow]) .toast { bottom: 84px; }
      .error { margin: var(--hl-s6) auto; max-width: 560px; text-align: center; }
    `],h([g({attribute:!1})],B.prototype,"hass",2),h([g({type:Boolean,reflect:!0})],B.prototype,"narrow",2),h([g({attribute:!1})],B.prototype,"route",2),h([g({attribute:!1})],B.prototype,"panel",2),h([f()],B.prototype,"snapshot",2),h([f()],B.prototype,"plants",2),h([f()],B.prototype,"families",2),h([f()],B.prototype,"tab",2),h([f()],B.prototype,"toastMsg",2),h([f()],B.prototype,"openTask",2),h([f()],B.prototype,"creatingTask",2),h([f()],B.prototype,"error",2),h([f()],B.prototype,"chapter",2),h([f()],B.prototype,"plannerSeason",2),h([f()],B.prototype,"transitionRequest",2),h([f()],B.prototype,"popupPlant",2),h([f()],B.prototype,"plannerFocus",2),h([f()],B.prototype,"cropsFocus",2),B=h([M("hortulus-panel")],B);export{B as HortulusPanel};
