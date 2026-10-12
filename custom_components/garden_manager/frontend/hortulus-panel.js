var Gs=Object.defineProperty;var qs=Object.getOwnPropertyDescriptor;var p=(d,r,e,t)=>{for(var s=t>1?void 0:t?qs(r,e):r,n=d.length-1,i;n>=0;n--)(i=d[n])&&(s=(t?i(r,e,s):i(s))||s);return t&&s&&Gs(r,e,s),s};var We=globalThis,Ze=We.ShadowRoot&&(We.ShadyCSS===void 0||We.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ft=Symbol(),Vt=new WeakMap,ze=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==ft)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(Ze&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=Vt.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&Vt.set(e,r))}return r}toString(){return this.cssText}},es=d=>new ze(typeof d=="string"?d:d+"",void 0,ft),z=(d,...r)=>{let e=d.length===1?d[0]:r.reduce((t,s,n)=>t+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+d[n+1],d[0]);return new ze(e,d,ft)},ts=(d,r)=>{if(Ze)d.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),s=We.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,d.appendChild(t)}},vt=Ze?d=>d:d=>d instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return es(e)})(d):d;var{is:Ws,defineProperty:Zs,getOwnPropertyDescriptor:Ks,getOwnPropertyNames:Ys,getOwnPropertySymbols:Xs,getPrototypeOf:Js}=Object,Ke=globalThis,ss=Ke.trustedTypes,Qs=ss?ss.emptyScript:"",Vs=Ke.reactiveElementPolyfillSupport,Pe=(d,r)=>d,Re={toAttribute(d,r){switch(r){case Boolean:d=d?Qs:null;break;case Object:case Array:d=d==null?d:JSON.stringify(d)}return d},fromAttribute(d,r){let e=d;switch(r){case Boolean:e=d!==null;break;case Number:e=d===null?null:Number(d);break;case Object:case Array:try{e=JSON.parse(d)}catch{e=null}}return e}},Ye=(d,r)=>!Ws(d,r),is={attribute:!0,type:String,converter:Re,reflect:!1,useDefault:!1,hasChanged:Ye};Symbol.metadata??=Symbol("metadata"),Ke.litPropertyMetadata??=new WeakMap;var te=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=is){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(r,t,e);s!==void 0&&Zs(this.prototype,r,s)}}static getPropertyDescriptor(r,e,t){let{get:s,set:n}=Ks(this.prototype,r)??{get(){return this[e]},set(i){this[e]=i}};return{get:s,set(i){let a=s?.call(this);n?.call(this,i),this.requestUpdate(r,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??is}static _$Ei(){if(this.hasOwnProperty(Pe("elementProperties")))return;let r=Js(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(Pe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Pe("properties"))){let e=this.properties,t=[...Ys(e),...Xs(e)];for(let s of t)this.createProperty(s,e[s])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let s of t)e.unshift(vt(s))}else r!==void 0&&e.push(vt(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ts(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),s=this.constructor._$Eu(r,t);if(s!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:Re).toAttribute(e,t.type);this._$Em=r,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(r,e){let t=this.constructor,s=t._$Eh.get(r);if(s!==void 0&&this._$Em!==s){let n=t.getPropertyOptions(s),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Re;this._$Em=s;let a=i.fromAttribute(e,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(r,e,t,s=!1,n){if(r!==void 0){let i=this.constructor;if(s===!1&&(n=this[r]),t??=i.getPropertyOptions(r),!((t.hasChanged??Ye)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(r)&&!this.hasAttribute(i._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:s,wrapped:n},i){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,i??e??this[r]),n!==!0||i!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),s===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,n]of t){let{wrapped:i}=n,a=this[s];i!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};te.elementStyles=[],te.shadowRootOptions={mode:"open"},te[Pe("elementProperties")]=new Map,te[Pe("finalized")]=new Map,Vs?.({ReactiveElement:te}),(Ke.reactiveElementVersions??=[]).push("2.1.2");var xt=globalThis,ns=d=>d,Xe=xt.trustedTypes,as=Xe?Xe.createPolicy("lit-html",{createHTML:d=>d}):void 0,hs="$lit$",ae=`lit$${Math.random().toFixed(9).slice(2)}$`,ps="?"+ae,ei=`<${ps}>`,ce=document,Ae=()=>ce.createComment(""),Le=d=>d===null||typeof d!="object"&&typeof d!="function",Mt=Array.isArray,ti=d=>Mt(d)||typeof d?.[Symbol.iterator]=="function",bt=`[ 	
\f\r]`,Ce=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rs=/-->/g,os=/>/g,le=RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ls=/'/g,ds=/"/g,ms=/^(?:script|style|textarea|title)$/i,St=d=>(r,...e)=>({_$litType$:d,strings:r,values:e}),l=St(1),M=St(2),Bi=St(3),se=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),cs=new WeakMap,de=ce.createTreeWalker(ce,129);function us(d,r){if(!Mt(d)||!d.hasOwnProperty("raw"))throw Error("invalid template strings array");return as!==void 0?as.createHTML(r):r}var si=(d,r)=>{let e=d.length-1,t=[],s,n=r===2?"<svg>":r===3?"<math>":"",i=Ce;for(let a=0;a<e;a++){let o=d[a],c,h,u=-1,f=0;for(;f<o.length&&(i.lastIndex=f,h=i.exec(o),h!==null);)f=i.lastIndex,i===Ce?h[1]==="!--"?i=rs:h[1]!==void 0?i=os:h[2]!==void 0?(ms.test(h[2])&&(s=RegExp("</"+h[2],"g")),i=le):h[3]!==void 0&&(i=le):i===le?h[0]===">"?(i=s??Ce,u=-1):h[1]===void 0?u=-2:(u=i.lastIndex-h[2].length,c=h[1],i=h[3]===void 0?le:h[3]==='"'?ds:ls):i===ds||i===ls?i=le:i===rs||i===os?i=Ce:(i=le,s=void 0);let b=i===le&&d[a+1].startsWith("/>")?" ":"";n+=i===Ce?o+ei:u>=0?(t.push(c),o.slice(0,u)+hs+o.slice(u)+ae+b):o+ae+(u===-2?a:b)}return[us(d,n+(d[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},je=class d{constructor({strings:r,_$litType$:e},t){let s;this.parts=[];let n=0,i=0,a=r.length-1,o=this.parts,[c,h]=si(r,e);if(this.el=d.createElement(c,t),de.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=de.nextNode())!==null&&o.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(hs)){let f=h[i++],b=s.getAttribute(u).split(ae),k=/([.?@])?(.*)/.exec(f);o.push({type:1,index:n,name:k[2],strings:b,ctor:k[1]==="."?$t:k[1]==="?"?_t:k[1]==="@"?wt:ve}),s.removeAttribute(u)}else u.startsWith(ae)&&(o.push({type:6,index:n}),s.removeAttribute(u));if(ms.test(s.tagName)){let u=s.textContent.split(ae),f=u.length-1;if(f>0){s.textContent=Xe?Xe.emptyScript:"";for(let b=0;b<f;b++)s.append(u[b],Ae()),de.nextNode(),o.push({type:2,index:++n});s.append(u[f],Ae())}}}else if(s.nodeType===8)if(s.data===ps)o.push({type:2,index:n});else{let u=-1;for(;(u=s.data.indexOf(ae,u+1))!==-1;)o.push({type:7,index:n}),u+=ae.length-1}n++}}static createElement(r,e){let t=ce.createElement("template");return t.innerHTML=r,t}};function fe(d,r,e=d,t){if(r===se)return r;let s=t!==void 0?e._$Co?.[t]:e._$Cl,n=Le(r)?void 0:r._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(d),s._$AT(d,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(r=fe(d,s._$AS(d,r.values),s,t)),r}var yt=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,s=(r?.creationScope??ce).importNode(e,!0);de.currentNode=s;let n=de.nextNode(),i=0,a=0,o=t[0];for(;o!==void 0;){if(i===o.index){let c;o.type===2?c=new Ie(n,n.nextSibling,this,r):o.type===1?c=new o.ctor(n,o.name,o.strings,this,r):o.type===6&&(c=new kt(n,this,r)),this._$AV.push(c),o=t[++a]}i!==o?.index&&(n=de.nextNode(),i++)}return de.currentNode=ce,s}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},Ie=class d{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=fe(this,r,e),Le(r)?r===m||r==null||r===""?(this._$AH!==m&&this._$AR(),this._$AH=m):r!==this._$AH&&r!==se&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):ti(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==m&&Le(this._$AH)?this._$AA.nextSibling.data=r:this.T(ce.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,s=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=je.createElement(us(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new yt(s,this),i=n.u(this.options);n.p(e),this.T(i),this._$AH=n}}_$AC(r){let e=cs.get(r.strings);return e===void 0&&cs.set(r.strings,e=new je(r)),e}k(r){Mt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let n of r)s===e.length?e.push(t=new d(this.O(Ae()),this.O(Ae()),this,this.options)):t=e[s],t._$AI(n),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=ns(r).nextSibling;ns(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},ve=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,s,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=r,this.name=e,this._$AM=s,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=m}_$AI(r,e=this,t,s){let n=this.strings,i=!1;if(n===void 0)r=fe(this,r,e,0),i=!Le(r)||r!==this._$AH&&r!==se,i&&(this._$AH=r);else{let a=r,o,c;for(r=n[0],o=0;o<n.length-1;o++)c=fe(this,a[t+o],e,o),c===se&&(c=this._$AH[o]),i||=!Le(c)||c!==this._$AH[o],c===m?r=m:r!==m&&(r+=(c??"")+n[o+1]),this._$AH[o]=c}i&&!s&&this.j(r)}j(r){r===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},$t=class extends ve{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===m?void 0:r}},_t=class extends ve{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==m)}},wt=class extends ve{constructor(r,e,t,s,n){super(r,e,t,s,n),this.type=5}_$AI(r,e=this){if((r=fe(this,r,e,0)??m)===se)return;let t=this._$AH,s=r===m&&t!==m||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,n=r!==m&&(t===m||s);s&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},kt=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){fe(this,r)}};var ii=xt.litHtmlPolyfillSupport;ii?.(je,Ie),(xt.litHtmlVersions??=[]).push("3.3.3");var gs=(d,r,e)=>{let t=e?.renderBefore??r,s=t._$litPart$;if(s===void 0){let n=e?.renderBefore??null;t._$litPart$=s=new Ie(r.insertBefore(Ae(),n),n,void 0,e??{})}return s._$AI(d),s};var Et=globalThis,T=class extends te{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=gs(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return se}};T._$litElement$=!0,T.finalized=!0,Et.litElementHydrateSupport?.({LitElement:T});var ni=Et.litElementPolyfillSupport;ni?.({LitElement:T});(Et.litElementVersions??=[]).push("4.2.2");var R=d=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(d,r)}):customElements.define(d,r)};var ai={attribute:!0,type:String,converter:Re,reflect:!1,hasChanged:Ye},ri=(d=ai,r,e)=>{let{kind:t,metadata:s}=e,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),t==="setter"&&((d=Object.create(d)).wrapped=!0),n.set(e.name,d),t==="accessor"){let{name:i}=e;return{set(a){let o=r.get.call(this);r.set.call(this,a),this.requestUpdate(i,o,d,!0,a)},init(a){return a!==void 0&&this.C(i,void 0,d,a),a}}}if(t==="setter"){let{name:i}=e;return function(a){let o=this[i];r.call(this,a),this.requestUpdate(i,o,d,!0,a)}}throw Error("Unsupported decorator location: "+t)};function g(d){return(r,e)=>typeof e=="object"?ri(d,r,e):((t,s,n)=>{let i=s.hasOwnProperty(n);return s.constructor.createProperty(n,t),i?Object.getOwnPropertyDescriptor(s,n):void 0})(d,r,e)}function v(d){return g({...d,state:!0,attribute:!1})}var he=(d,r,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(d,r,e),e);function Je(d,r){return(e,t,s)=>{let n=i=>i.renderRoot?.querySelector(d)??null;if(r){let{get:i,set:a}=typeof t=="object"?e:s??(()=>{let o=Symbol();return{get(){return this[o]},set(c){this[o]=c}}})();return he(e,t,{get(){let o=i.call(this);return o===void 0&&(o=n(this),(o!==null||this.hasUpdated)&&a.call(this,o)),o}})}return he(e,t,{get(){return n(this)}})}}var Qe="garden_manager",He=class{constructor(r){this.hass=r}setHass(r){this.hass=r}call(r,e={}){return this.hass.connection.sendMessagePromise({type:`${Qe}/${r}`,...e})}subscribe(r){return this.hass.connection.subscribeMessage(r,{type:`${Qe}/subscribe`})}plants(){return this.call("plants")}savePlant(r,e){return this.call("plants/save",{plant:r,mode:e})}deletePlant(r){return this.call("plants/delete",{plant_id:r})}plantWindows(r,e,t){return this.call("plants/windows",{plant_id:r,zone_id:e??null,season:t??null})}savePlan(r,e){return this.call("plan/save",{...r,base_revision:e})}checkBed(r,e){return this.call("plan/check",{bed:r,plantings:e})}succession(r,e,t,s){return this.call("plan/succession",{planting:r,count:e,interval_days:t,placement:s})}exportPlan(r,e=!1){return this.call("plan/export",{format:r,include_tasks:e})}importPlan(r,e){return this.call("plan/import",{content:r,mode:e})}addTask(r){return this.call("tasks/add",r)}taskAction(r,e,t={}){return this.call("tasks/action",{task_id:r,action:e,...t})}saveSettings(r){return this.call("settings/save",{settings:r})}autofill(r){return this.call("plan/autofill",r)}autofillApply(r,e,t){return this.call("plan/autofill/apply",{plantings:r,replace_beds:e,base_revision:t})}printPreview(r){return this.call("print/render",{options:r})}async printPdf(r){let e=new URLSearchParams;for(let[i,a]of Object.entries(r))a==null||a===""||e.set(i,Array.isArray(a)?a.join(","):String(a));let t=await this.hass.fetchWithAuth(`/api/${Qe}/print?${e.toString()}`);if(!t.ok)throw new Error(`${t.status} ${await t.text()}`);let s=t.headers.get("Content-Disposition")??"",n=/filename="([^"]+)"/.exec(s)?.[1]??"hortulus.pdf";return{blob:await t.blob(),filename:n}}exportPdfToConfig(r){return this.hass.callService(Qe,"export_pdf",r)}handbookIndex(r){return this.call("handbook/index",r?{lang:r}:{})}handbookChapter(r,e){return this.call("handbook/chapter",{chapter_id:r,...e?{lang:e}:{}})}handbookSearch(r,e){return this.call("handbook/search",{query:r,...e?{lang:e}:{}})}irrigationPlan(){return this.call("irrigation/plan")}irrigationRun(r,e){return this.call("irrigation/run",{...r?{bed_ids:r}:{},...e?{amount_mm:e}:{}})}irrigationStop(){return this.call("irrigation/stop")}advice(){return this.call("advice")}qaOptions(){return this.call("qa/options")}qaAsk(r,e,t){return this.call("qa/ask",{subject:r,problem:e,target:t})}supplies(){return this.call("supplies")}async uploadPhoto(r){let e=new FormData;e.append("file",r);let t=await this.hass.fetchWithAuth("/api/image/upload",{method:"POST",body:e});if(!t.ok)throw new Error(`Upload failed (${t.status})`);return(await t.json()).id}},Tt=(d,r="256x256")=>d.startsWith("http")||d.startsWith("/")?d:`/api/image/serve/${d}/${r}`;var zt=(d=32)=>M`
  <svg width=${d} height=${d} viewBox="0 0 64 64" role="img" aria-label="Hortulus" xmlns="http://www.w3.org/2000/svg">
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
  </svg>`;var Pt={"app.name":"Hortulus","app.tagline":"Your vegetable garden, planned and cared for","nav.dashboard":"Today","nav.planner":"Planner","nav.library":"Plants","nav.calendar":"Calendar","nav.settings":"Settings","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.close":"Close","common.add":"Add","common.edit":"Edit","common.none":"None","common.loading":"Loading your garden\u2026","common.not_loaded":"Hortulus is not set up yet. Add the integration under Settings \u2192 Devices & services.","common.minutes":"{n} min","common.days":"{n} days","common.cm":"{n} cm","common.today":"Today","common.tomorrow":"Tomorrow","common.yesterday":"Yesterday","common.overdue":"Overdue","common.unknown":"Unknown","common.search":"Search","common.all":"All","common.season":"Season {year}","common.admin_only":"Only administrators can change the plan.","common.saved":"Saved","common.saving":"Saving\u2026","common.unsaved":"Unsaved changes","common.conflict":"Changed elsewhere - reloaded","common.error":"Something went wrong: {message}","dash.greeting_morning":"Good morning","dash.greeting_afternoon":"Good afternoon","dash.greeting_evening":"Good evening","dash.today_tasks":"Today's tasks","dash.no_tasks":"Nothing to do today. Enjoy the garden!","dash.show_all":"Show all {n} tasks in the calendar","dash.total_time":"About {minutes} min of work","dash.beds":"Beds","dash.weather":"Next 48 hours","dash.greenhouse":"Greenhouse","dash.coming_up":"Coming up","dash.gdd":"Growing degree days","dash.gdd_since":"since {date}","dash.frost_risk":"Frost risk","dash.min_temp":"Lowest {temp} \xB0C","dash.rain":"Rain {mm} mm","dash.inside":"Inside {temp} \xB0C","dash.limits":"Crops tolerate {min}\u2013{max} \xB0C","dash.no_sensor":"No sensor","dash.active_crops":"{n} crops in the ground","dash.forecast_missing":"No forecast - advice is less precise.","planner.season":"Season","planner.undo":"Undo","planner.redo":"Redo","planner.snap":"Snap to grid","planner.zoom_in":"Zoom in","planner.zoom_out":"Zoom out","planner.fit":"Fit to screen","planner.add_bed":"Add bed","planner.add_zone":"Add zone","planner.overlay_companions":"Companions","planner.overlay_moisture":"Moisture","planner.overlay_temperature":"Temperature","planner.view_date":"Show garden on","planner.palette":"Plants","planner.palette_hint":"Drag a plant onto a bed, or press Enter to add it to the selected bed.","planner.layout":"Layout","planner.layout.single":"Single","planner.layout.block":"Block","planner.layout.row":"Row","planner.inspector":"Details","planner.nothing_selected":"Select a bed or planting to see details. Press ? for keyboard shortcuts.","planner.method":"Method","planner.method.indoor_sow":"Sow indoors, plant out","planner.method.direct_sow":"Sow in place","planner.method.transplant":"Plant (bought plants / sets)","planner.status":"Status","planner.count":"{n} plants","planner.timeline":"Timeline","planner.succession":"Succession sowing","planner.succession_count":"Number of sowings","planner.succession_interval":"Every (days)","planner.succession_placement":"Placement","planner.succession.split":"Split the area in strips","planner.succession.stack":"Same spot, one after another","planner.succession_create":"Create sowings","planner.succession_dropped":"{n} sowings fell outside the sowing window and were skipped.","planner.duplicate":"Duplicate","planner.remove":"Remove","planner.bed_name":"Name","planner.zone":"Zone","planner.kind":"Type","planner.width":"Width (cm)","planner.length":"Length (cm)","planner.orientation":"Row direction (\xB0)","planner.soil":"Soil","planner.shade":"Shade (%)","planner.wind":"Wind","planner.score":"Companion score","planner.warnings":"Warnings","planner.no_warnings":"No conflicts - nice combination!","planner.out_of_bounds":"Partly outside the bed.","planner.placed":"{plant} placed in {bed}.","planner.moved":"{name} moved.","planner.removed":"{name} removed.","planner.no_bed_here":"Drop plants onto a bed.","planner.export_json":"Export JSON","planner.export_yaml":"Export YAML","planner.import":"Import plan","planner.import_mode":"Import mode","planner.import_merge":"Merge with current plan","planner.import_replace":"Replace current plan","planner.imported":"Imported: {beds} beds, {plantings} plantings.","planner.shortcuts":"Keyboard shortcuts","planner.legend":"Plant families","planner.new_bed":"New bed","planner.new_zone":"New zone","shortcut.move":"Move selection (Shift = 10\xD7)","shortcut.undo":"Undo","shortcut.redo":"Redo","shortcut.delete":"Remove selection","shortcut.duplicate":"Duplicate selection","shortcut.grid":"Toggle snap-to-grid","shortcut.companions":"Toggle companion overlay","shortcut.moisture":"Toggle moisture overlay","shortcut.zoom":"Zoom in / out","shortcut.escape":"Clear selection","shortcut.cycle":"Select next / previous item","shortcut.help":"Show this help","lib.title":"Plant library","lib.search":"Search by name, latin name or family","lib.family":"Family","lib.filter_greenhouse":"Greenhouse","lib.filter_quick":"Quick crops","lib.filter_custom":"My plants","lib.add_custom":"New plant","lib.customize":"Customize","lib.reset":"Reset to built-in","lib.spacing":"Spacing","lib.row_spacing":"Row spacing","lib.depth":"Sowing depth","lib.germination":"Germination","lib.maturity":"Days to maturity","lib.soil_temp":"Min. soil temperature","lib.frost":"Frost tolerance","lib.min_temp":"Minimum temperature","lib.greenhouse":"Greenhouse","lib.water":"Water","lib.nutrients":"Nutrients","lib.rotation":"Rotation","lib.rotation_years":"{n} years before the same family returns","lib.friends":"Good companions","lib.enemies":"Keep apart from","lib.pests":"Pests","lib.diseases":"Diseases","lib.care":"Care","lib.calendar":"Sowing calendar","lib.indoor_sow":"Sow indoors","lib.direct_sow":"Sow outdoors","lib.transplant":"Plant out","lib.harvest":"Harvest","lib.source.builtin":"Built-in","lib.source.custom":"Custom","lib.source.override":"Customized","lib.id":"Identifier","lib.name_en":"Name (English)","lib.name_nl":"Name (Dutch)","lib.scientific":"Scientific name","lib.variety":"Variety","lib.habit":"Growth habit","lib.windows_hint":"Weeks relative to the average last spring frost (negative = before).","lib.weeks":"weeks","lib.from":"from","lib.to":"to","lib.saved":"{plant} saved.","cal.month":"Month","cal.week":"Week","cal.list":"List","cal.prev":"Previous","cal.next":"Next","cal.show_done":"Show completed","cal.add_task":"New task","cal.all_beds":"All beds","task.complete":"Done","task.skip":"Skip","task.reopen":"Reopen","task.postpone":"Postpone","task.postpone_1":"+1 day","task.postpone_3":"+3 days","task.postpone_7":"+1 week","task.postpone_to":"Move to date","task.note":"Note","task.notes":"Notes","task.photos":"Photos","task.add_photo":"Add photo","task.priority":"Priority","task.duration":"Duration (min)","task.due":"Due","task.window":"Window {start} \u2013 {end}","task.repeat":"Repeats every {n} days","task.repeat_days":"Repeat every (days, optional)","task.title":"Title","task.type":"Type","task.bed":"Bed","task.description":"Description","task.shifted":"{n} dependent tasks moved along.","task.beyond_window":"Careful: the new date is after the ideal window.","task.completed":"Nice work! {title} done.","task.source.generated":"From your plan","task.source.sensor":"From sensors","task.source.weather":"From the forecast","task.source.user":"Added by you","settings.region":"Climate & region","settings.hemisphere":"Hemisphere","settings.hemisphere.north":"Northern","settings.hemisphere.south":"Southern","settings.mode":"Profile","settings.mode.preset":"Regional preset","settings.mode.usda":"USDA hardiness zone","settings.mode.custom":"Custom frost dates","settings.preset":"Region","settings.zone":"Hardiness zone","settings.last_frost":"Last spring frost (MM-DD)","settings.first_frost":"First autumn frost (MM-DD)","settings.frost_dates_now":"This season: last frost {last}, first frost {first}.","settings.weather":"Weather & outdoor sensors","settings.weather_entity":"Weather entity","settings.outdoor_temp":"Outdoor temperature","settings.rain":"Rain sensor","settings.zones":"Zones & microclimates","settings.beds":"Beds & sensors","settings.zone_type.outdoor":"Outdoor","settings.zone_type.greenhouse":"Greenhouse","settings.zone_type.cold_frame":"Cold frame","settings.heated":"Heated","settings.min_heating":"Heating keeps above (\xB0C)","settings.sensors":"Sensors","settings.sensor.soil_moisture":"Soil moisture","settings.sensor.soil_temperature":"Soil temperature","settings.sensor.air_temperature":"Air temperature","settings.sensor.air_humidity":"Air humidity","settings.sensor.light":"Light","settings.sensor.rain":"Rain","settings.irrigation":"Irrigation switch/valve","settings.flow":"Flow (L/min)","settings.vent":"Vent / window opener","settings.notifications":"Notifications","settings.persistent":"Persistent notifications","settings.notify_services":"Push notifications (comma separated notify services)","settings.tts":"Text-to-speech entity","settings.tts_players":"Speakers (comma separated)","settings.digest":"Daily digest at","settings.frost_alerts":"Frost alerts","settings.heat_alerts":"Heat alerts","settings.tts_frost":"Announce frost on speakers","settings.general":"General","settings.language":"Language","settings.language.auto":"Follow Home Assistant","settings.units":"Units","settings.units_metric":"Metric (cm, \xB0C, mm, L)","settings.snap":"Grid size (cm)","settings.radius":"Companion radius (cm)","settings.data":"Import & export","settings.saved":"Settings saved.","type.sow_indoor":"Sow indoors","type.sow_direct":"Sow outdoors","type.harden_off":"Harden off","type.transplant":"Plant out","type.thin":"Thin","type.stake":"Support","type.prune":"Prune","type.pinch":"Pinch","type.earth_up":"Earth up","type.feed":"Feed","type.water":"Water","type.weed":"Weed","type.pest_check":"Pest check","type.harvest":"Harvest","type.ventilate":"Ventilate","type.shade":"Shade","type.frost_protect":"Frost protection","type.custom":"Task","priority.low":"Low","priority.normal":"Normal","priority.high":"High","priority.urgent":"Urgent","status.planned":"Planned","status.sown_indoors":"Sown indoors","status.sown":"Sown","status.transplanted":"Planted out","status.harvesting":"Harvesting","status.finished":"Finished","status.failed":"Failed","risk.none":"none","risk.low":"low","risk.moderate":"moderate","risk.high":"high","risk.unknown":"unknown","moisture.dry":"Dry","moisture.slightly_dry":"Slightly dry","moisture.optimal":"Optimal","moisture.wet":"Wet","moisture.unknown":"No data","irrigation.none":"No water needed","irrigation.water":"Water {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Skip - rain expected","irrigation.check_manually":"Check by hand (~{mm} mm)","gh.none":"All good","gh.ventilate":"Ventilate","gh.shade":"Shade now","gh.close_up":"Close before night","gh.heat":"Turn on heating","level.low":"Low","level.medium":"Medium","level.high":"High","suit.yes":"Suitable","suit.no":"Not suitable","suit.conditional":"Possible","frost.tender":"Tender","frost.half_hardy":"Half hardy","frost.hardy":"Hardy","frost.very_hardy":"Very hardy","kind.in_ground":"In-ground bed","kind.raised":"Raised bed","kind.container":"Container","soil.sandy":"Sandy","soil.loam":"Loam","soil.clay":"Clay","soil.silt":"Silt","soil.peat":"Peat","soil.chalk":"Chalk","soil.potting_mix":"Potting mix","wind.sheltered":"Sheltered","wind.moderate":"Moderate","wind.exposed":"Exposed","habit.bush":"Bush","habit.vine":"Vine","habit.climbing":"Climbing","habit.upright":"Upright","habit.rosette":"Rosette","habit.root":"Root crop","habit.bulb":"Bulb","reason.soil_too_cold":"Soil is {soil} \xB0C; {plant} needs {min} \xB0C to germinate.","reason.soil_too_hot":"Soil is {soil} \xB0C; above {max} \xB0C {plant} germinates poorly.","reason.frost_forecast":"Frost ({temp} \xB0C) forecast before {date}; {plant} is frost tender.","reason.window_open":"Window is open.","reason.window_not_yet":"Window opens {date}.","reason.window_closed":"Window closed on {date}.","reason.not_greenhouse_suitable":"{plant} is not suited to a greenhouse.","compat.friend":"{a} and {b} are good companions: {reason}","compat.enemy":"{a} and {b} should not be planted together: {reason}","compat.overlap":"{a} and {b} overlap - not enough space.","compat.rotation":"{family} grew in {bed} in {season}; wait {years} years.","compat.same_family_adjacent":"{a} and {b} share a family and its pests.","alert.frost":"Frost risk {level}: {temp} \xB0C expected {when}","alert.heat":"Heat stress in {zone}: {temp} \xB0C expected","alert.dry":"{bed} is dry ({moisture}%)","alert.sensor_stale":"Sensor {entity} has not reported for a while","alert.forecast_unavailable":"Weather forecast unavailable","when.tonight":"tonight","when.tomorrow_night":"tomorrow night","nav.handbook":"Handbook","nav.print":"Print","type.soil_prep":"Prepare soil","type.compost":"Compost","type.green_manure":"Green manure","type.mulch":"Mulch","type.clean_greenhouse":"Clean greenhouse","type.winter_prep":"Winter preparation","type.plan_season":"Plan season","type.tool_care":"Tool care","type.soil_test":"Soil test","type.cut_back":"Cut back","type.divide":"Divide","type.protect":"Protect","type.clean":"Clean up","type.tie_in":"Tie in","type.thin_fruit":"Thin fruit","type.pollinate":"Pollinate","type.check":"Check","type.make_feed":"Make plant feed","category.vegetable":"Vegetables","category.herb":"Herbs","category.fruit":"Fruit","category.flower":"Flowers","feature.path":"Path","feature.compost":"Compost heap / bin","feature.water_butt":"Water butt","feature.shed":"Shed","feature.tree":"Tree","feature.hedge":"Hedge","feature.trellis":"Trellis","feature.other":"Other","stage.not_planted":"Not planted","stage.establishing":"Establishing","stage.vegetative":"Growing","stage.flowering":"Flowering","stage.ripening":"Ripening","stage.harvest":"Harvest","stage.finished":"Finished","compat.deters":"{a} protects {b}: it deters {pests}.","compat.trap":"{a} lures {pests} away from {b} (trap crop).","compat.allelopathy":"{a} releases growth-inhibiting compounds - keep it away from {b}.","compat.competition":"{a} and {b} are both heavy feeders this close together - add extra compost or give more space.","compat.shading":"{a} (about {height} cm tall) will shade {b} - plant tall crops on the side away from the sun.","compat.shade_benefit":"{a} gives {b} welcome summer shade.","alert.disease":"Disease risk {level} in {zone}","alert.nutrients":"Nutrient balance in {bed}: {status}","autoplan.bed_not_empty":"{bed} already has crops this season - tick 'replace' to re-plan it.","autoplan.no_beds":"No empty beds to fill. Select beds and tick 'replace'.","autoplan.compost_short":"Needs about {need} kg compost, you have {have} kg.","autoplan.time_over":"About {need} min per week of work - more than the {have} min you have.","autoplan.wanted_missing":"No room for: {plants}.","autoplan.consider_irrigation":"About {liters} L of water in a dry summer week - drip irrigation or a water butt will save you time.","autofill.title":"Autofill","autofill.intro":"Proposes crops, amounts and positions for season {season} from your beds and resources. Nothing is changed until you apply it.","autofill.household":"People in the household","autofill.hours":"Hours per week","autofill.water":"Water per week (L)","autofill.compost":"Compost available (kg)","autofill.has_irrigation":"Drip irrigation / automatic watering available","autofill.goals":"Goals","autofill.wanted":"Must have","autofill.excluded":"Never","autofill.beds":"Beds","autofill.all_empty":"(all empty beds)","autofill.replace":"Replace this season's crops in the selected beds","autofill.propose":"Make a proposal","autofill.apply":"Apply to plan","autofill.applied":"{n} plantings added to the plan","autofill.skipped":"Not placed","autofill.sum_crops":"{n} crops","autofill.sum_yield":"\u2248 {kg} kg harvest","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in a peak week","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Fresh vegetables","autofill.goal.storage":"Storage crops","autofill.goal.herbs":"Herbs","autofill.goal.pollinators":"Pollinators","autofill.goal.winter":"Winter harvest","autofill.goal.perennials":"Perennials","autofill.goal.easy":"Low maintenance","autofill.reason.no_suitable_bed":"no suitable bed","autofill.reason.no_space":"no space","autofill.reason.time_budget":"time budget","autofill.reason.water_budget":"water budget","cal.timeline":"Timeline","cal.garden_work":"Garden work","cal.growing":"Growing","cal.harvest_estimate":"Harvest expected around {date}","cal.harvest_estimate_short":"Expected harvest (degree days)","cal.last_frost":"Last frost","cal.first_frost":"First frost","cal.frost_dates":"Frost dates","cal.no_plantings":"No crops planned this season.","ctx.title":"Right now","ctx.moisture":"Soil moisture","ctx.soil_temp":"Soil temperature","ctx.irrigation":"Watering","ctx.water_balance":"Water deficit","ctx.nutrients":"Nutrient balance","ctx.air_temp":"Air temperature","ctx.humidity":"Humidity","ctx.disease":"Disease risk","ctx.frost":"Frost risk","ctx.today":"Today","ctx.rain":"Rain today","ctx.et0":"Evaporation (ET\u2080)","dash.gdd_today":"Degree days today","dash.water_climate":"Water & climate","dash.irrigation_mode":"Irrigation","dash.watering_now":"Watering {bed}","dash.stop":"Stop","dash.beds_need_water":"Beds needing water","dash.water_now":"Water now","dash.safety_note":"Frost lockout, rain skip and max runtime always apply.","dash.disease_risk":"Disease risk","dash.nutrients":"Nutrients","dash.water_balance":"Water deficit","dash.irrigation_started":"Watering started ({min} min)","dash.irrigation_stopped":"Watering stopped","dash.irrigation_nothing":"Nothing to water right now","handbook.title":"Gardening handbook","handbook.intro":"Background to everything Hortulus advises: soil, sowing, watering, feeding, rotation, the greenhouse and the garden year.","handbook.contents":"Contents","handbook.overview":"Overview","handbook.glossary":"Glossary","handbook.search":"Search the handbook","handbook.results":"Results for \u201C{query}\u201D","handbook.no_results":"Nothing found.","handbook.read_more":"Read more in the handbook","lib.category":"Category","lib.count":"{n} plants","lib.perennial":"perennial","lib.height":"Height","lib.roots":"roots","lib.gdd":"Degree days to harvest","lib.base":"base","lib.per_person":"Plants per person \xB7 yield","lib.deters":"Deters","lib.trap_for":"Trap crop for","lib.allelopathic":"Inhibits neighbours","lib.shade_tolerant":"Tolerates shade","lib.plant":"Plant","planner.layer_zones":"Show zones","planner.layer_features":"Show paths & elements","planner.layer_plantings":"Show crops","planner.add_feature":"Element","planner.align.left":"Align left","planner.align.right":"Align right","planner.align.top":"Align top","planner.align.bottom":"Align bottom","planner.align.hcenter":"Centre horizontally","planner.align.vcenter":"Centre vertically","planner.align.hdistribute":"Distribute horizontally","planner.align.vdistribute":"Distribute vertically","planner.aligned":"{n} items aligned","planner.moved_n":"{n} items moved","planner.removed_n":"{n} items removed","planner.selected_n":"{n} selected","planner.multi_hint":"Shift- or Ctrl-click to select several beds or crops, then drag, align or distribute them.","planner.alternatives":"Fits in","planner.better_neighbours":"Better neighbours","planner.heat_stress":"{n} hot days ahead","print.options":"Print options","print.document":"Document","print.page":"Paper","print.orientation":"Orientation","print.portrait":"Portrait","print.landscape":"Landscape","print.colors":"Colours","print.beds":"Beds","print.days":"Days ahead","print.title":"Title","print.notes":"Notes area (dot grid)","print.grid":"10 cm grid on bed sheets","print.labels":"Crop names on the map","print.download":"Download PDF","print.refresh":"Refresh preview","print.save_config":"Save to /config/www/hortulus","print.saved_to_config":"PDF saved (/local/hortulus/)","print.preview":"Preview","print.empty":"No preview yet.","print.page_n":"Page {n} of {total}","print.all_greenhouses":"All greenhouses","print.all_zones":"All zones","print.remarkable_hint":"reMarkable Paper Pro: 179.6 \xD7 239.5 mm, extra margin on the left for the toolbar. E-ink colours use light tints and patterns so your pen stays visible. Send the PDF with the reMarkable app or email.","print.doc.garden":"Garden map","print.doc.garden.hint":"Zones, beds, crops, legend","print.doc.zone":"Greenhouse / zone","print.doc.zone.hint":"One zone, zoomed in","print.doc.beds":"Bed sheets","print.doc.beds.hint":"A page per bed with grid","print.doc.tasks":"Checklist","print.doc.tasks.hint":"Open tasks per week","print.doc.season":"Season chart","print.doc.season.hint":"Sow \u2192 harvest timeline","print.doc.blank":"Planning sheet","print.doc.blank.hint":"Outlines to sketch on","print.doc.plants":"Plant cards","print.doc.plants.hint":"Key facts per crop","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Full colour","print.color.eink":"E-ink (light + patterns)","print.color.grayscale":"Grayscale","settings.irrigation_hw":"Irrigation hardware","settings.irrigation_mode":"Mode","settings.irrigation_mode.off":"Off","settings.irrigation_mode.advise":"Advise (tasks only)","settings.irrigation_mode.auto":"Automatic","settings.pump":"Pump (switch)","settings.start_time":"Start time","settings.max_runtime":"Max runtime per valve (min)","settings.frost_lockout":"Frost lockout below (\xB0C)","settings.rain_skip":"Skip when rain forecast \u2265 (mm)","settings.pump_lead":"Pump stop before valve (s)","settings.irrigation_hint":"{n} beds have a valve. Set the flow (L/min) per bed under Beds.","settings.resources":"Resources (autofill)","settings.maintenance_tasks":"Seasonal garden tasks in the calendar (soil prep, greenhouse cleaning, winter rest ...)","settings.open_meteo":"Use Open-Meteo for humidity, wind and sunshine","settings.open_meteo_hint":"Optional and off by default: sends the garden's rounded coordinates to api.open-meteo.com. Improves the evaporation (Penman-Monteith) estimate.","settings.elevation":"Elevation (m)","settings.shade_entity":"Shade screen (cover or switch)","settings.climate_control":"Vent & shade control","settings.climate_control.off":"Off","settings.climate_control.advise":"Advise (tasks)","settings.climate_control.auto":"Automatic","settings.wall_heat":"Against a warm wall","settings.thermal_mass":"Thermal mass (water barrels, stone)","settings.sensor.par":"Light (PAR)","settings.sensor.leaf_wetness":"Leaf wetness","settings.sensor.ec":"Soil EC","settings.sensor.npk_n":"Nitrogen (N)","settings.sensor.npk_p":"Phosphorus (P)","settings.sensor.npk_k":"Potassium (K)","task.postponed":"{title} postponed by {n} day(s)","common.done":"Done","planner.removed_from":"{name} removed from season {season} on (history kept).","planner.steps":"Build your garden plan in three steps","planner.step.site":"Draw your site","planner.step.site.hint":"zones & elements","planner.step.zones":"Arrange zones","planner.step.zones.hint":"name, beds, own map","planner.step.plant":"Plant","planner.step.plant.hint":"by hand or by the system","planner.whole_garden":"Whole garden","planner.zone_map":"Zone map","planner.site_intro":"Pick a zone type or element, then drag a rectangle on the grid (squares of 10 \xD7 10 cm). A single click places a standard size. Double-click a zone to open its own map.","planner.zones":"Zones","planner.elements":"Paths, lawn, trees & more","planner.your_zones":"Your zones","planner.no_zones":"No zones yet - start with your vegetable garden, greenhouse or orchard.","planner.open_zone":"Open zone map","planner.next":"Next","planner.zones_intro":"Open a zone to give it a name and draw its beds on its own map. Trees and bushes in an orchard or fruit zone stay there year after year.","planner.n_beds":"{n} beds","planner.zone_name":"Zone name","planner.beds_in_zone":"Beds & elements in this zone","planner.draw_bed":"Bed","planner.fill_by_hand":"Fill in myself","planner.fill_by_system":"Let the system fill it","planner.bed_needs_zone":"Draw a bed inside a zone.","planner.draw_hint":"Drag on the grid to draw: {what}","planner.palette_for_zone":"Showing plants that suit {zone}. Pick a category to see everything.","planner.perennial":"perennial","planner.bears_after":"fruit after ~{n} yr","planner.perennial_since":"Perennial - in the ground since {season} and carried over every year until you remove it.","planner.bearing_from":"First harvest expected from {season}.","planner.eco_tips":"Eco tips & home remedies","planner.remove_perennial":"Remove {name}?","planner.remove_perennial_intro":"{name} was planted in {season} and stays in your plan every year. What happened?","planner.remove_from_season":"It is gone from {season} on","planner.remove_from_season_hint":"Earlier years keep it (rotation history, harvests, notes).","planner.remove_everywhere":"Delete it completely","planner.remove_everywhere_hint":"As if it was never planted - also removed from earlier years.","planner.legend.perennial":"perennial (stays)","planner.legend.warning":"neighbour / rotation warning","planner.legend.succession":"succession sowing","planner.legend.rows":"rows of seedlings","planner.legend.border":"Border colour = plant family (for crop rotation); the icon shows the crop itself.","settings.zone_type.orchard":"Orchard","settings.zone_type.fruit":"Soft fruit","settings.zone_type.herbs":"Herb garden","settings.zone_type.flowers":"Flower garden","zone_hint.outdoor":"Vegetable garden: annual crops with rotation, beds and paths.","zone_hint.greenhouse":"Greenhouse: warm crops, climate control, ventilation and shading.","zone_hint.cold_frame":"Cold frame: hardening off, early and late salads.","zone_hint.orchard":"Orchard: fruit trees that stay for decades - prune, thin and harvest yearly.","zone_hint.fruit":"Soft fruit: berries, currants, grapes and kiwi berries.","zone_hint.herbs":"Herb garden: perennial and annual herbs, a bee magnet.","zone_hint.flowers":"Flower garden: pollinators, beneficial insects and cut flowers.","feature.terrace":"Terrace","feature.lawn":"Lawn","feature.flowerbed":"Flower bed","feature.fence":"Fence","feature.pond":"Pond","pollination.insects":"Needs insects for pollination - add flowers nearby.","pollination.wind":"Wind-pollinated - plant in blocks, not single rows.","pollination.partner":"Needs a pollination partner (second variety) nearby.","pollination.none":"No pollination needed (leaves, roots).","planner.more":"More","settings.reminders":"Reminders","settings.overdue_reminders":"Remind me of tasks left undone","settings.overdue_time":"Reminder time","settings.overdue_after":"Remind after (days late)","settings.weekly_plan":"Weekly look-ahead","settings.weekly_day":"Day","settings.weekly_time":"Time","settings.weather_aware":"Weather-aware scheduling","settings.weather_aware_hint":"Sowing, planting out, spraying, pruning and mulching move automatically to the best dry, frost-free, not-too-hot day inside their window.","feature.house":"House","feature.driveway":"Driveway","feature.street":"Street","feature.parking":"Parking","feature.play":"Play area","feature.beehive":"Beehive","autofill.prefs":"Preferences","autofill.freedom":"Freedom of choice","autofill.freedom.strict":"Only what I want","autofill.freedom.balanced":"My wishes + goals","autofill.freedom.free":"Free: surprise me","autofill.pref.respect_companions":"Respect plant neighbours","autofill.pref.add_pollinators":"Add flowers for pollinators","autofill.pref.year_round":"Aim for harvests all year","autofill.pref.allow_perennials":"Perennials allowed","autofill.pref.match_zone_type":"Respect zone type (orchard = fruit \u2026)","autofill.reason.pollinators":"pollinators","nav.advice":"Advice","task.tools":"You need","advice.ask_title":"Ask Hortulus","advice.i_have":"I have a","advice.mode.question":"question","advice.mode.problem":"problem","advice.about":"about","advice.subject":"Subject","advice.target":"Which one","advice.problem":"Question","advice.ask":"Ask","advice.in_garden":"In your garden","advice.all_plants":"All plants","advice.whole_garden":"the whole garden","advice.subject.plant":"a plant / vegetable / fruit","advice.subject.greenhouse":"my greenhouse","advice.subject.garden":"my garden","advice.subject.bed":"a bed","advice.subject.tools":"tools & supplies","advice.q.status":"How is it doing?","advice.q.what_to_do":"What should I do now?","advice.q.when_sow":"When to sow or plant?","advice.q.when_harvest":"When to harvest?","advice.q.growth":"it grows badly","advice.q.yellow_leaves":"yellow leaves","advice.q.wilting":"it wilts / droops","advice.q.no_fruit":"flowers but no fruit","advice.q.bolting":"it bolts (runs to seed)","advice.q.pests":"pests / bugs on it","advice.q.disease":"spots, mould or rot","advice.q.feeding":"How to feed it?","advice.q.watering":"How much water?","advice.q.pruning":"How to prune?","advice.q.companions":"What grows well next to it?","advice.q.too_hot":"it is too hot","advice.q.too_cold":"it is too cold","advice.q.winter_crops":"What can grow in winter?","advice.q.year_round":"How do I harvest all year?","advice.q.soil":"my soil is poor","advice.q.slugs":"slugs!","advice.q.frost":"frost is coming","advice.q.what_next":"What should go in next?","advice.q.for_task":"Which tools for this job?","advice.q.shopping":"What do I need to buy?","advice.sec.status":"Now in your garden","advice.sec.facts":"Good to know","advice.sec.causes":"Possible causes","advice.sec.actions":"What to do","advice.sec.remedies":"Eco & home remedies","advice.sec.prevention":"Prevent it next time","advice.sec.tasks":"Open tasks","advice.read_more":"Read more in the handbook","advice.suggestions":"Suggestions for your garden","advice.suggestions_intro":"Hortulus looks at placement, pollination, neighbours, year-round harvest, soil and ecology.","advice.none":"No suggestions - your plan looks great!","advice.apply_add":"Add to plan","advice.apply_open":"Show in planner","advice.dismiss":"Hide","advice.no_space":"No free space in {bed}.","advice.kind.pollination":"Pollination","advice.kind.neighbours":"Neighbours","advice.kind.placement":"Placement","advice.kind.year_round":"Year-round","advice.kind.soil":"Soil","advice.kind.eco":"Ecology","advice.kind.growth":"Growth","advice.kind.greenhouse":"Greenhouse","advice.coverage":"Harvest per month","advice.coverage_gaps":"Red months have nothing to harvest - the suggestions show what fills them.","advice.coverage_full":"Something to harvest every month.","advice.nothing":"nothing","advice.shopping":"Shopping list this season","advice.shopping_intro":"Worked out from your plan: seed, plants, compost, protection and support.","advice.nothing_to_buy":"Nothing to buy yet - plan some crops first.","advice.tools_per_task":"Tools per job","advice.read_tools":"Tools & DIY feeds","advice.cat.seeds":"Seed","advice.cat.plants":"Young plants","advice.cat.soil":"Soil & feeding","advice.cat.protection":"Protection","advice.cat.support":"Support & mulch","advice.cat.other":"Other"};var fs={"app.name":"Hortulus","app.tagline":"Je moestuin, gepland en verzorgd","nav.dashboard":"Vandaag","nav.planner":"Planner","nav.library":"Planten","nav.calendar":"Kalender","nav.settings":"Instellingen","common.save":"Opslaan","common.cancel":"Annuleren","common.delete":"Verwijderen","common.close":"Sluiten","common.add":"Toevoegen","common.edit":"Bewerken","common.none":"Geen","common.loading":"Je tuin wordt geladen\u2026","common.not_loaded":"Hortulus is nog niet ingesteld. Voeg de integratie toe via Instellingen \u2192 Apparaten & diensten.","common.minutes":"{n} min","common.days":"{n} dagen","common.cm":"{n} cm","common.today":"Vandaag","common.tomorrow":"Morgen","common.yesterday":"Gisteren","common.overdue":"Te laat","common.unknown":"Onbekend","common.search":"Zoeken","common.all":"Alle","common.season":"Seizoen {year}","common.admin_only":"Alleen beheerders kunnen het plan wijzigen.","common.saved":"Opgeslagen","common.saving":"Opslaan\u2026","common.unsaved":"Niet-opgeslagen wijzigingen","common.conflict":"Elders gewijzigd - opnieuw geladen","common.error":"Er ging iets mis: {message}","dash.greeting_morning":"Goedemorgen","dash.greeting_afternoon":"Goedemiddag","dash.greeting_evening":"Goedenavond","dash.today_tasks":"Taken voor vandaag","dash.no_tasks":"Niets te doen vandaag. Geniet van de tuin!","dash.show_all":"Alle {n} taken tonen in de kalender","dash.total_time":"Ongeveer {minutes} min werk","dash.beds":"Bedden","dash.weather":"Komende 48 uur","dash.greenhouse":"Kas","dash.coming_up":"Binnenkort","dash.gdd":"Graaddagen","dash.gdd_since":"sinds {date}","dash.frost_risk":"Vorstrisico","dash.min_temp":"Laagste {temp} \xB0C","dash.rain":"Regen {mm} mm","dash.inside":"Binnen {temp} \xB0C","dash.limits":"Gewassen verdragen {min}\u2013{max} \xB0C","dash.no_sensor":"Geen sensor","dash.active_crops":"{n} gewassen in de grond","dash.forecast_missing":"Geen weersverwachting - advies is minder nauwkeurig.","planner.season":"Seizoen","planner.undo":"Ongedaan maken","planner.redo":"Opnieuw","planner.snap":"Uitlijnen op raster","planner.zoom_in":"Inzoomen","planner.zoom_out":"Uitzoomen","planner.fit":"Passend maken","planner.add_bed":"Bed toevoegen","planner.add_zone":"Zone toevoegen","planner.overlay_companions":"Buurplanten","planner.overlay_moisture":"Vocht","planner.overlay_temperature":"Temperatuur","planner.view_date":"Toon tuin op","planner.palette":"Planten","planner.palette_hint":"Sleep een plant naar een bed, of druk op Enter om hem aan het geselecteerde bed toe te voegen.","planner.layout":"Indeling","planner.layout.single":"Los","planner.layout.block":"Blok","planner.layout.row":"Rij","planner.inspector":"Details","planner.nothing_selected":"Selecteer een bed of beplanting voor details. Druk op ? voor sneltoetsen.","planner.method":"Methode","planner.method.indoor_sow":"Binnen zaaien, later uitplanten","planner.method.direct_sow":"Ter plaatse zaaien","planner.method.transplant":"Planten (gekochte planten / plantuitjes)","planner.status":"Status","planner.count":"{n} planten","planner.timeline":"Tijdlijn","planner.succession":"Opeenvolgend zaaien","planner.succession_count":"Aantal zaaimomenten","planner.succession_interval":"Elke (dagen)","planner.succession_placement":"Plaatsing","planner.succession.split":"Vlak in stroken verdelen","planner.succession.stack":"Zelfde plek, na elkaar","planner.succession_create":"Zaaimomenten maken","planner.succession_dropped":"{n} zaaimomenten vielen buiten het zaaivenster en zijn overgeslagen.","planner.duplicate":"Dupliceren","planner.remove":"Verwijderen","planner.bed_name":"Naam","planner.zone":"Zone","planner.kind":"Soort","planner.width":"Breedte (cm)","planner.length":"Lengte (cm)","planner.orientation":"Rijrichting (\xB0)","planner.soil":"Grond","planner.shade":"Schaduw (%)","planner.wind":"Wind","planner.score":"Buurplantenscore","planner.warnings":"Waarschuwingen","planner.no_warnings":"Geen conflicten - mooie combinatie!","planner.out_of_bounds":"Valt deels buiten het bed.","planner.placed":"{plant} geplaatst in {bed}.","planner.moved":"{name} verplaatst.","planner.removed":"{name} verwijderd.","planner.no_bed_here":"Zet planten op een bed.","planner.export_json":"Exporteer JSON","planner.export_yaml":"Exporteer YAML","planner.import":"Plan importeren","planner.import_mode":"Importmodus","planner.import_merge":"Samenvoegen met huidig plan","planner.import_replace":"Huidig plan vervangen","planner.imported":"Ge\xEFmporteerd: {beds} bedden, {plantings} beplantingen.","planner.shortcuts":"Sneltoetsen","planner.legend":"Plantenfamilies","planner.new_bed":"Nieuw bed","planner.new_zone":"Nieuwe zone","shortcut.move":"Selectie verplaatsen (Shift = 10\xD7)","shortcut.undo":"Ongedaan maken","shortcut.redo":"Opnieuw","shortcut.delete":"Selectie verwijderen","shortcut.duplicate":"Selectie dupliceren","shortcut.grid":"Raster aan/uit","shortcut.companions":"Buurplanten-laag aan/uit","shortcut.moisture":"Vochtlaag aan/uit","shortcut.zoom":"In- / uitzoomen","shortcut.escape":"Selectie opheffen","shortcut.cycle":"Volgend / vorig item selecteren","shortcut.help":"Deze hulp tonen","lib.title":"Plantenbibliotheek","lib.search":"Zoek op naam, Latijnse naam of familie","lib.family":"Familie","lib.filter_greenhouse":"Kas","lib.filter_quick":"Snelle gewassen","lib.filter_custom":"Mijn planten","lib.add_custom":"Nieuwe plant","lib.customize":"Aanpassen","lib.reset":"Terug naar standaard","lib.spacing":"Plantafstand","lib.row_spacing":"Rijafstand","lib.depth":"Zaaidiepte","lib.germination":"Kiemduur","lib.maturity":"Dagen tot oogst","lib.soil_temp":"Min. bodemtemperatuur","lib.frost":"Vorstbestendigheid","lib.min_temp":"Minimumtemperatuur","lib.greenhouse":"Kas","lib.water":"Water","lib.nutrients":"Voeding","lib.rotation":"Wisselteelt","lib.rotation_years":"{n} jaar voordat dezelfde familie terugkomt","lib.friends":"Goede buren","lib.enemies":"Uit elkaar houden","lib.pests":"Plagen","lib.diseases":"Ziekten","lib.care":"Verzorging","lib.calendar":"Zaaikalender","lib.indoor_sow":"Binnen zaaien","lib.direct_sow":"Buiten zaaien","lib.transplant":"Uitplanten","lib.harvest":"Oogsten","lib.source.builtin":"Standaard","lib.source.custom":"Eigen","lib.source.override":"Aangepast","lib.id":"Code","lib.name_en":"Naam (Engels)","lib.name_nl":"Naam (Nederlands)","lib.scientific":"Wetenschappelijke naam","lib.variety":"Ras","lib.habit":"Groeiwijze","lib.windows_hint":"Weken ten opzichte van de gemiddelde laatste voorjaarsvorst (negatief = ervoor).","lib.weeks":"weken","lib.from":"van","lib.to":"tot","lib.saved":"{plant} opgeslagen.","cal.month":"Maand","cal.week":"Week","cal.list":"Lijst","cal.prev":"Vorige","cal.next":"Volgende","cal.show_done":"Afgeronde taken tonen","cal.add_task":"Nieuwe taak","cal.all_beds":"Alle bedden","task.complete":"Klaar","task.skip":"Overslaan","task.reopen":"Heropenen","task.postpone":"Uitstellen","task.postpone_1":"+1 dag","task.postpone_3":"+3 dagen","task.postpone_7":"+1 week","task.postpone_to":"Naar datum","task.note":"Notitie","task.notes":"Notities","task.photos":"Foto's","task.add_photo":"Foto toevoegen","task.priority":"Prioriteit","task.duration":"Duur (min)","task.due":"Datum","task.window":"Venster {start} \u2013 {end}","task.repeat":"Herhaalt elke {n} dagen","task.repeat_days":"Herhaal elke (dagen, optioneel)","task.title":"Titel","task.type":"Soort","task.bed":"Bed","task.description":"Omschrijving","task.shifted":"{n} afhankelijke taken schoven mee.","task.beyond_window":"Let op: de nieuwe datum ligt na het ideale venster.","task.completed":"Goed bezig! {title} gedaan.","task.source.generated":"Uit je plan","task.source.sensor":"Uit sensoren","task.source.weather":"Uit de weersverwachting","task.source.user":"Door jou toegevoegd","settings.region":"Klimaat & regio","settings.hemisphere":"Halfrond","settings.hemisphere.north":"Noordelijk","settings.hemisphere.south":"Zuidelijk","settings.mode":"Profiel","settings.mode.preset":"Regionale voorinstelling","settings.mode.usda":"USDA-winterhardheidszone","settings.mode.custom":"Eigen vorstdata","settings.preset":"Regio","settings.zone":"Winterhardheidszone","settings.last_frost":"Laatste voorjaarsvorst (MM-DD)","settings.first_frost":"Eerste najaarsvorst (MM-DD)","settings.frost_dates_now":"Dit seizoen: laatste vorst {last}, eerste vorst {first}.","settings.weather":"Weer & buitensensoren","settings.weather_entity":"Weerentiteit","settings.outdoor_temp":"Buitentemperatuur","settings.rain":"Regensensor","settings.zones":"Zones & microklimaat","settings.beds":"Bedden & sensoren","settings.zone_type.outdoor":"Buiten","settings.zone_type.greenhouse":"Kas","settings.zone_type.cold_frame":"Koude bak","settings.heated":"Verwarmd","settings.min_heating":"Verwarming houdt boven (\xB0C)","settings.sensors":"Sensoren","settings.sensor.soil_moisture":"Bodemvocht","settings.sensor.soil_temperature":"Bodemtemperatuur","settings.sensor.air_temperature":"Luchttemperatuur","settings.sensor.air_humidity":"Luchtvochtigheid","settings.sensor.light":"Licht","settings.sensor.rain":"Regen","settings.irrigation":"Beregeningsschakelaar/-klep","settings.flow":"Debiet (L/min)","settings.vent":"Raamopener / ventilatie","settings.notifications":"Meldingen","settings.persistent":"Blijvende meldingen","settings.notify_services":"Pushmeldingen (notify-diensten, kommagescheiden)","settings.tts":"Tekst-naar-spraak-entiteit","settings.tts_players":"Speakers (kommagescheiden)","settings.digest":"Dagelijks overzicht om","settings.frost_alerts":"Vorstwaarschuwingen","settings.heat_alerts":"Hittewaarschuwingen","settings.tts_frost":"Vorst omroepen via speakers","settings.general":"Algemeen","settings.language":"Taal","settings.language.auto":"Volg Home Assistant","settings.units":"Eenheden","settings.units_metric":"Metrisch (cm, \xB0C, mm, L)","settings.snap":"Rastergrootte (cm)","settings.radius":"Bereik buurplanten (cm)","settings.data":"Importeren & exporteren","settings.saved":"Instellingen opgeslagen.","type.sow_indoor":"Binnen zaaien","type.sow_direct":"Buiten zaaien","type.harden_off":"Afharden","type.transplant":"Uitplanten","type.thin":"Uitdunnen","type.stake":"Ondersteunen","type.prune":"Snoeien","type.pinch":"Toppen","type.earth_up":"Aanaarden","type.feed":"Bemesten","type.water":"Water geven","type.weed":"Wieden","type.pest_check":"Plaagcontrole","type.harvest":"Oogsten","type.ventilate":"Luchten","type.shade":"Schaduwen","type.frost_protect":"Vorstbescherming","type.custom":"Taak","priority.low":"Laag","priority.normal":"Normaal","priority.high":"Hoog","priority.urgent":"Dringend","status.planned":"Gepland","status.sown_indoors":"Binnen gezaaid","status.sown":"Gezaaid","status.transplanted":"Uitgeplant","status.harvesting":"Oogst loopt","status.finished":"Afgerond","status.failed":"Mislukt","risk.none":"geen","risk.low":"laag","risk.moderate":"matig","risk.high":"hoog","risk.unknown":"onbekend","moisture.dry":"Droog","moisture.slightly_dry":"Iets droog","moisture.optimal":"Optimaal","moisture.wet":"Nat","moisture.unknown":"Geen data","irrigation.none":"Geen water nodig","irrigation.water":"Geef {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Overslaan - regen verwacht","irrigation.check_manually":"Controleer met de hand (~{mm} mm)","gh.none":"Alles goed","gh.ventilate":"Luchten","gh.shade":"Nu schaduwen","gh.close_up":"Sluiten voor de nacht","gh.heat":"Verwarming aan","level.low":"Laag","level.medium":"Gemiddeld","level.high":"Hoog","suit.yes":"Geschikt","suit.no":"Niet geschikt","suit.conditional":"Mogelijk","frost.tender":"Vorstgevoelig","frost.half_hardy":"Half winterhard","frost.hardy":"Winterhard","frost.very_hardy":"Zeer winterhard","kind.in_ground":"Bed in de grond","kind.raised":"Verhoogd bed","kind.container":"Bak / pot","soil.sandy":"Zand","soil.loam":"Leem","soil.clay":"Klei","soil.silt":"L\xF6ss","soil.peat":"Veen","soil.chalk":"Kalk","soil.potting_mix":"Potgrond","wind.sheltered":"Beschut","wind.moderate":"Gemiddeld","wind.exposed":"Winderig","habit.bush":"Struik","habit.vine":"Rank","habit.climbing":"Klimmend","habit.upright":"Rechtop","habit.rosette":"Rozet","habit.root":"Wortelgewas","habit.bulb":"Bol","reason.soil_too_cold":"Grond is {soil} \xB0C; {plant} heeft {min} \xB0C nodig om te kiemen.","reason.soil_too_hot":"Grond is {soil} \xB0C; boven {max} \xB0C kiemt {plant} slecht.","reason.frost_forecast":"Vorst ({temp} \xB0C) verwacht voor {date}; {plant} is vorstgevoelig.","reason.window_open":"Het venster is open.","reason.window_not_yet":"Venster opent {date}.","reason.window_closed":"Venster sloot op {date}.","reason.not_greenhouse_suitable":"{plant} is niet geschikt voor de kas.","compat.friend":"{a} en {b} zijn goede buren: {reason}","compat.enemy":"{a} en {b} kun je beter niet samen planten: {reason}","compat.overlap":"{a} en {b} overlappen - te weinig ruimte.","compat.rotation":"{family} stond in {season} in {bed}; wacht {years} jaar.","compat.same_family_adjacent":"{a} en {b} zijn familie en delen plagen.","alert.frost":"Vorstrisico {level}: {temp} \xB0C verwacht {when}","alert.heat":"Hittestress in {zone}: {temp} \xB0C verwacht","alert.dry":"{bed} is droog ({moisture}%)","alert.sensor_stale":"Sensor {entity} heeft al een tijd niets gemeld","alert.forecast_unavailable":"Weersverwachting niet beschikbaar","when.tonight":"vannacht","when.tomorrow_night":"morgennacht","nav.handbook":"Handboek","nav.print":"Afdrukken","type.soil_prep":"Bodem klaarmaken","type.compost":"Compost","type.green_manure":"Groenbemester","type.mulch":"Mulchen","type.clean_greenhouse":"Serre kuisen","type.winter_prep":"Winterklaar maken","type.plan_season":"Seizoen plannen","type.tool_care":"Gereedschap","type.soil_test":"Bodemanalyse","type.cut_back":"Terugsnoeien","type.divide":"Scheuren","type.protect":"Beschermen","type.clean":"Opruimen","type.tie_in":"Aanbinden","type.thin_fruit":"Vruchten dunnen","type.pollinate":"Bestuiven","type.check":"Controleren","type.make_feed":"Plantengier maken","category.vegetable":"Groenten","category.herb":"Kruiden","category.fruit":"Fruit","category.flower":"Bloemen","feature.path":"Pad","feature.compost":"Composthoop / -vat","feature.water_butt":"Regenton","feature.shed":"Tuinhuis","feature.tree":"Boom","feature.hedge":"Haag","feature.trellis":"Klimrek","feature.other":"Overig","stage.not_planted":"Nog niet geplant","stage.establishing":"Aanslaan","stage.vegetative":"Groei","stage.flowering":"Bloei","stage.ripening":"Afrijping","stage.harvest":"Oogst","stage.finished":"Afgelopen","compat.deters":"{a} beschermt {b}: weert {pests}.","compat.trap":"{a} lokt {pests} weg van {b} (vangplant).","compat.allelopathy":"{a} scheidt groeiremmende stoffen af - houd uit de buurt van {b}.","compat.competition":"{a} en {b} zijn allebei zware eters zo dicht bij elkaar - geef extra compost of meer ruimte.","compat.shading":"{a} (ongeveer {height} cm hoog) zal {b} beschaduwen - zet hoge gewassen aan de kant weg van de zon.","compat.shade_benefit":"{a} geeft {b} welkome zomerschaduw.","alert.disease":"Ziekterisico {level} in {zone}","alert.nutrients":"Voedingsbalans in {bed}: {status}","autoplan.bed_not_empty":"{bed} heeft dit seizoen al gewassen - vink 'vervangen' aan om het opnieuw te plannen.","autoplan.no_beds":"Geen lege bedden om te vullen. Kies bedden en vink 'vervangen' aan.","autoplan.compost_short":"Er is ongeveer {need} kg compost nodig, je hebt {have} kg.","autoplan.time_over":"Ongeveer {need} min werk per week - meer dan de {have} min die je hebt.","autoplan.wanted_missing":"Geen plaats voor: {plants}.","autoplan.consider_irrigation":"Ongeveer {liters} L water in een droge zomerweek - druppelbevloeiing of een regenton bespaart je tijd.","autofill.title":"Automatisch invullen","autofill.intro":"Stelt gewassen, hoeveelheden en plaatsen voor seizoen {season} voor op basis van je bedden en middelen. Er verandert niets tot je het toepast.","autofill.household":"Personen in het gezin","autofill.hours":"Uren per week","autofill.water":"Water per week (L)","autofill.compost":"Beschikbare compost (kg)","autofill.has_irrigation":"Druppelbevloeiing / automatisch water geven aanwezig","autofill.goals":"Doelen","autofill.wanted":"Zeker erbij","autofill.excluded":"Nooit","autofill.beds":"Bedden","autofill.all_empty":"(alle lege bedden)","autofill.replace":"Gewassen van dit seizoen in de gekozen bedden vervangen","autofill.propose":"Voorstel maken","autofill.apply":"In het plan zetten","autofill.applied":"{n} teelten toegevoegd aan het plan","autofill.skipped":"Niet geplaatst","autofill.sum_crops":"{n} gewassen","autofill.sum_yield":"\u2248 {kg} kg oogst","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in een piekweek","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Verse groenten","autofill.goal.storage":"Bewaargroenten","autofill.goal.herbs":"Kruiden","autofill.goal.pollinators":"Bestuivers","autofill.goal.winter":"Wintergroenten","autofill.goal.perennials":"Vaste planten","autofill.goal.easy":"Weinig onderhoud","autofill.reason.no_suitable_bed":"geen geschikt bed","autofill.reason.no_space":"geen plaats","autofill.reason.time_budget":"tijdsbudget","autofill.reason.water_budget":"waterbudget","cal.timeline":"Tijdlijn","cal.garden_work":"Tuinwerk","cal.growing":"Groeit","cal.harvest_estimate":"Oogst verwacht rond {date}","cal.harvest_estimate_short":"Verwachte oogst (graaddagen)","cal.last_frost":"Laatste vorst","cal.first_frost":"Eerste vorst","cal.frost_dates":"Vorstdata","cal.no_plantings":"Dit seizoen nog geen gewassen gepland.","ctx.title":"Nu","ctx.moisture":"Bodemvocht","ctx.soil_temp":"Bodemtemperatuur","ctx.irrigation":"Water geven","ctx.water_balance":"Watertekort","ctx.nutrients":"Voedingsbalans","ctx.air_temp":"Luchttemperatuur","ctx.humidity":"Luchtvochtigheid","ctx.disease":"Ziekterisico","ctx.frost":"Vorstrisico","ctx.today":"Vandaag","ctx.rain":"Regen vandaag","ctx.et0":"Verdamping (ET\u2080)","dash.gdd_today":"Graaddagen vandaag","dash.water_climate":"Water & klimaat","dash.irrigation_mode":"Bewatering","dash.watering_now":"Bezig met {bed}","dash.stop":"Stop","dash.beds_need_water":"Bedden die water nodig hebben","dash.water_now":"Nu water geven","dash.safety_note":"Vorstvergrendeling, regen overslaan en maximale looptijd gelden altijd.","dash.disease_risk":"Ziekterisico","dash.nutrients":"Voeding","dash.water_balance":"Watertekort","dash.irrigation_started":"Bewatering gestart ({min} min)","dash.irrigation_stopped":"Bewatering gestopt","dash.irrigation_nothing":"Nu niets om water te geven","handbook.title":"Tuinhandboek","handbook.intro":"De achtergrond bij alles wat Hortulus aanraadt: bodem, zaaien, water, bemesting, vruchtwisseling, de serre en het tuinjaar.","handbook.contents":"Inhoud","handbook.overview":"Overzicht","handbook.glossary":"Woordenlijst","handbook.search":"Zoeken in het handboek","handbook.results":"Resultaten voor \u201C{query}\u201D","handbook.no_results":"Niets gevonden.","handbook.read_more":"Lees meer in het handboek","lib.category":"Categorie","lib.count":"{n} planten","lib.perennial":"overblijvend","lib.height":"Hoogte","lib.roots":"wortels","lib.gdd":"Graaddagen tot oogst","lib.base":"basis","lib.per_person":"Planten per persoon \xB7 opbrengst","lib.deters":"Weert","lib.trap_for":"Vangplant voor","lib.allelopathic":"Remt buren","lib.shade_tolerant":"Verdraagt schaduw","lib.plant":"Plant","planner.layer_zones":"Zones tonen","planner.layer_features":"Paden & elementen tonen","planner.layer_plantings":"Gewassen tonen","planner.add_feature":"Element","planner.align.left":"Links uitlijnen","planner.align.right":"Rechts uitlijnen","planner.align.top":"Boven uitlijnen","planner.align.bottom":"Onder uitlijnen","planner.align.hcenter":"Horizontaal centreren","planner.align.vcenter":"Verticaal centreren","planner.align.hdistribute":"Horizontaal verdelen","planner.align.vdistribute":"Verticaal verdelen","planner.aligned":"{n} items uitgelijnd","planner.moved_n":"{n} items verplaatst","planner.removed_n":"{n} items verwijderd","planner.selected_n":"{n} geselecteerd","planner.multi_hint":"Shift- of Ctrl-klik om meerdere bedden of gewassen te kiezen; sleep, lijn uit of verdeel ze daarna.","planner.alternatives":"Past in","planner.better_neighbours":"Betere buren","planner.heat_stress":"{n} hete dagen op komst","print.options":"Afdrukopties","print.document":"Document","print.page":"Papier","print.orientation":"Richting","print.portrait":"Staand","print.landscape":"Liggend","print.colors":"Kleuren","print.beds":"Bedden","print.days":"Dagen vooruit","print.title":"Titel","print.notes":"Notitievlak (stippelraster)","print.grid":"Raster van 10 cm op bedfiches","print.labels":"Gewasnamen op de kaart","print.download":"PDF downloaden","print.refresh":"Voorbeeld vernieuwen","print.save_config":"Opslaan in /config/www/hortulus","print.saved_to_config":"PDF opgeslagen (/local/hortulus/)","print.preview":"Voorbeeld","print.empty":"Nog geen voorbeeld.","print.page_n":"Pagina {n} van {total}","print.all_greenhouses":"Alle serres","print.all_zones":"Alle zones","print.remarkable_hint":"reMarkable Paper Pro: 179,6 \xD7 239,5 mm, extra marge links voor de werkbalk. E-inkkleuren gebruiken lichte tinten en patronen zodat je pen zichtbaar blijft. Stuur de PDF via de reMarkable-app of e-mail.","print.doc.garden":"Tuinplan","print.doc.garden.hint":"Zones, bedden, gewassen, legende","print.doc.zone":"Serre / zone","print.doc.zone.hint":"E\xE9n zone, ingezoomd","print.doc.beds":"Bedfiches","print.doc.beds.hint":"Een pagina per bed met raster","print.doc.tasks":"Takenlijst","print.doc.tasks.hint":"Open taken per week","print.doc.season":"Seizoensoverzicht","print.doc.season.hint":"Tijdlijn zaaien \u2192 oogst","print.doc.blank":"Planningsblad","print.doc.blank.hint":"Omtrekken om op te schetsen","print.doc.plants":"Plantkaarten","print.doc.plants.hint":"Kerngegevens per gewas","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Volle kleur","print.color.eink":"E-ink (licht + patronen)","print.color.grayscale":"Grijstinten","settings.irrigation_hw":"Bewateringshardware","settings.irrigation_mode":"Modus","settings.irrigation_mode.off":"Uit","settings.irrigation_mode.advise":"Advies (alleen taken)","settings.irrigation_mode.auto":"Automatisch","settings.pump":"Pomp (schakelaar)","settings.start_time":"Starttijd","settings.max_runtime":"Max. looptijd per klep (min)","settings.frost_lockout":"Vorstvergrendeling onder (\xB0C)","settings.rain_skip":"Overslaan bij regenverwachting \u2265 (mm)","settings.pump_lead":"Pomp stopt v\xF3\xF3r klep (s)","settings.irrigation_hint":"{n} bedden hebben een klep. Stel per bed het debiet (L/min) in bij Bedden.","settings.resources":"Middelen (automatisch invullen)","settings.maintenance_tasks":"Seizoenswerk in de kalender (bodem klaarmaken, serre kuisen, winterrust ...)","settings.open_meteo":"Open-Meteo gebruiken voor vocht, wind en zon","settings.open_meteo_hint":"Optioneel en standaard uit: stuurt de afgeronde co\xF6rdinaten van de tuin naar api.open-meteo.com. Verbetert de verdampingsberekening (Penman-Monteith).","settings.elevation":"Hoogte (m)","settings.shade_entity":"Schaduwscherm (cover of schakelaar)","settings.climate_control":"Luchten & schaduw sturen","settings.climate_control.off":"Uit","settings.climate_control.advise":"Advies (taken)","settings.climate_control.auto":"Automatisch","settings.wall_heat":"Tegen een warme muur","settings.thermal_mass":"Thermische massa (watervaten, steen)","settings.sensor.par":"Licht (PAR)","settings.sensor.leaf_wetness":"Bladnat","settings.sensor.ec":"Bodem-EC","settings.sensor.npk_n":"Stikstof (N)","settings.sensor.npk_p":"Fosfor (P)","settings.sensor.npk_k":"Kalium (K)","task.postponed":"{title} {n} dag(en) uitgesteld","common.done":"Klaar","planner.removed_from":"{name} verwijderd vanaf seizoen {season} (historiek blijft).","planner.steps":"Bouw je tuinplan op in drie stappen","planner.step.site":"Terrein tekenen","planner.step.site.hint":"zones & elementen","planner.step.zones":"Zones inrichten","planner.step.zones.hint":"naam, bedden, eigen kaart","planner.step.plant":"Beplanten","planner.step.plant.hint":"zelf of door het systeem","planner.whole_garden":"Hele tuin","planner.zone_map":"Zonekaart","planner.site_intro":"Kies een zonetype of element en sleep een rechthoek op het raster (vakjes van 10 \xD7 10 cm). E\xE9n klik plaatst een standaardmaat. Dubbelklik op een zone om haar eigen kaart te openen.","planner.zones":"Zones","planner.elements":"Paden, gazon, bomen & meer","planner.your_zones":"Jouw zones","planner.no_zones":"Nog geen zones - begin met je moestuin, serre of boomgaard.","planner.open_zone":"Zonekaart openen","planner.next":"Volgende","planner.zones_intro":"Open een zone om ze een naam te geven en haar bedden op een eigen kaart te tekenen. Bomen en struiken in een boomgaard- of fruitzone blijven daar jaar na jaar staan.","planner.n_beds":"{n} bedden","planner.zone_name":"Naam van de zone","planner.beds_in_zone":"Bedden & elementen in deze zone","planner.draw_bed":"Bed","planner.fill_by_hand":"Zelf invullen","planner.fill_by_system":"Laat het systeem invullen","planner.bed_needs_zone":"Teken een bed binnen een zone.","planner.draw_hint":"Sleep op het raster om te tekenen: {what}","planner.palette_for_zone":"Je ziet planten die passen in {zone}. Kies een categorie om alles te zien.","planner.perennial":"meerjarig","planner.bears_after":"vruchten na ~{n} jaar","planner.perennial_since":"Meerjarig - staat er sinds {season} en gaat elk jaar mee tot je hem verwijdert.","planner.bearing_from":"Eerste oogst verwacht vanaf {season}.","planner.eco_tips":"Ecotips & huis-tuin-en-keukenmiddeltjes","planner.remove_perennial":"{name} verwijderen?","planner.remove_perennial_intro":"{name} werd geplant in {season} en staat elk jaar in je plan. Wat is er gebeurd?","planner.remove_from_season":"Weg vanaf {season}","planner.remove_from_season_hint":"Vorige jaren behouden hem (wisselteelthistoriek, oogsten, notities).","planner.remove_everywhere":"Volledig wissen","planner.remove_everywhere_hint":"Alsof hij nooit geplant werd - ook uit vorige jaren.","planner.legend.perennial":"meerjarig (blijft staan)","planner.legend.warning":"waarschuwing buren / wisselteelt","planner.legend.succession":"opeenvolgende zaai","planner.legend.rows":"zaairijen","planner.legend.border":"Randkleur = plantenfamilie (voor wisselteelt); het icoon toont het gewas zelf.","settings.zone_type.orchard":"Boomgaard","settings.zone_type.fruit":"Kleinfruit","settings.zone_type.herbs":"Kruidentuin","settings.zone_type.flowers":"Bloementuin","zone_hint.outdoor":"Moestuin: eenjarige gewassen met wisselteelt, bedden en paden.","zone_hint.greenhouse":"Serre: warmteminnende gewassen, klimaatsturing, verluchten en schaduw.","zone_hint.cold_frame":"Koude bak: afharden, vroege en late slaatjes.","zone_hint.orchard":"Boomgaard: fruitbomen die decennia blijven - jaarlijks snoeien, dunnen en oogsten.","zone_hint.fruit":"Kleinfruit: bessen, frambozen, druiven en kiwibessen.","zone_hint.herbs":"Kruidentuin: meerjarige en eenjarige kruiden, een bijenmagneet.","zone_hint.flowers":"Bloementuin: bestuivers, nuttige insecten en snijbloemen.","feature.terrace":"Terras","feature.lawn":"Gazon","feature.flowerbed":"Bloemperk","feature.fence":"Omheining","feature.pond":"Vijver","pollination.insects":"Heeft insecten nodig voor bestuiving - zet bloemen in de buurt.","pollination.wind":"Windbestuiving - plant in blokken, niet in \xE9\xE9n rij.","pollination.partner":"Heeft een bestuivingspartner (tweede ras) in de buurt nodig.","pollination.none":"Geen bestuiving nodig (blad, wortels).","planner.more":"Meer","settings.reminders":"Herinneringen","settings.overdue_reminders":"Herinner me aan blijven liggende taken","settings.overdue_time":"Tijdstip herinnering","settings.overdue_after":"Herinneren na (dagen te laat)","settings.weekly_plan":"Weekoverzicht vooraf","settings.weekly_day":"Dag","settings.weekly_time":"Tijdstip","settings.weather_aware":"Taken plannen volgens het weer","settings.weather_aware_hint":"Zaaien, uitplanten, spuiten, snoeien en mulchen schuiven automatisch naar de beste droge, vorstvrije en niet te hete dag binnen hun venster.","feature.house":"Huis","feature.driveway":"Oprit","feature.street":"Straat","feature.parking":"Parking","feature.play":"Speelhoek","feature.beehive":"Bijenkast","autofill.prefs":"Voorkeuren","autofill.freedom":"Keuzevrijheid van het systeem","autofill.freedom.strict":"Enkel wat ik wil","autofill.freedom.balanced":"Mijn wensen + doelen","autofill.freedom.free":"Vrij: verras me","autofill.pref.respect_companions":"Rekening houden met plantenburen","autofill.pref.add_pollinators":"Zelf bestuivingsbloemen toevoegen","autofill.pref.year_round":"Streven naar oogst het hele jaar","autofill.pref.allow_perennials":"Meerjarigen toegestaan","autofill.pref.match_zone_type":"Zonetype respecteren (boomgaard = fruit \u2026)","autofill.reason.pollinators":"bestuivers","nav.advice":"Advies","task.tools":"Je hebt nodig","advice.ask_title":"Vraag het aan Hortulus","advice.i_have":"Ik heb een","advice.mode.question":"vraag","advice.mode.problem":"probleem","advice.about":"met / over","advice.subject":"Onderwerp","advice.target":"Welke","advice.problem":"Vraag","advice.ask":"Vraag","advice.in_garden":"In je tuin","advice.all_plants":"Alle planten","advice.whole_garden":"de hele tuin","advice.subject.plant":"een plant / groente / fruit","advice.subject.greenhouse":"mijn serre","advice.subject.garden":"mijn tuin","advice.subject.bed":"een bed","advice.subject.tools":"gereedschap & benodigdheden","advice.q.status":"Hoe staat het ervoor?","advice.q.what_to_do":"Wat moet ik nu doen?","advice.q.when_sow":"Wanneer zaaien of planten?","advice.q.when_harvest":"Wanneer oogsten?","advice.q.growth":"het groeit slecht","advice.q.yellow_leaves":"gele bladeren","advice.q.wilting":"het hangt slap / verwelkt","advice.q.no_fruit":"bloeit maar geeft geen vruchten","advice.q.bolting":"het schiet door","advice.q.pests":"er zitten beestjes op","advice.q.disease":"vlekken, schimmel of rot","advice.q.feeding":"Hoe bemesten?","advice.q.watering":"Hoeveel water?","advice.q.pruning":"Hoe snoeien?","advice.q.companions":"Wat zet ik ernaast?","advice.q.too_hot":"het is te warm","advice.q.too_cold":"het is te koud","advice.q.winter_crops":"Wat kan er in de winter?","advice.q.year_round":"Hoe oogst ik het hele jaar?","advice.q.soil":"mijn grond is slecht","advice.q.slugs":"slakken!","advice.q.frost":"er komt vorst","advice.q.what_next":"Wat zet ik er hierna in?","advice.q.for_task":"Welk gereedschap voor deze klus?","advice.q.shopping":"Wat moet ik kopen?","advice.sec.status":"Nu in je tuin","advice.sec.facts":"Goed om te weten","advice.sec.causes":"Mogelijke oorzaken","advice.sec.actions":"Wat nu doen","advice.sec.remedies":"Eco- & huis-tuin-en-keukenmiddeltjes","advice.sec.prevention":"Volgende keer voorkomen","advice.sec.tasks":"Open taken","advice.read_more":"Lees meer in het handboek","advice.suggestions":"Voorstellen voor je tuin","advice.suggestions_intro":"Hortulus kijkt naar plaatsing, bestuiving, buren, oogst het hele jaar, bodem en ecologie.","advice.none":"Geen voorstellen - je plan ziet er prima uit!","advice.apply_add":"Toevoegen aan plan","advice.apply_open":"Toon in planner","advice.dismiss":"Verbergen","advice.no_space":"Geen vrije plaats in {bed}.","advice.kind.pollination":"Bestuiving","advice.kind.neighbours":"Buren","advice.kind.placement":"Plaatsing","advice.kind.year_round":"Hele jaar","advice.kind.soil":"Bodem","advice.kind.eco":"Ecologie","advice.kind.growth":"Groei","advice.kind.greenhouse":"Serre","advice.coverage":"Oogst per maand","advice.coverage_gaps":"Rode maanden hebben niets te oogsten - de voorstellen tonen wat ze opvult.","advice.coverage_full":"Elke maand iets te oogsten.","advice.nothing":"niets","advice.shopping":"Boodschappenlijst dit seizoen","advice.shopping_intro":"Berekend uit je plan: zaad, plantgoed, compost, bescherming en steun.","advice.nothing_to_buy":"Nog niets te kopen - plan eerst enkele teelten.","advice.tools_per_task":"Gereedschap per klus","advice.read_tools":"Gereedschap & zelf bemesting maken","advice.cat.seeds":"Zaad","advice.cat.plants":"Plantgoed","advice.cat.soil":"Bodem & bemesting","advice.cat.protection":"Bescherming","advice.cat.support":"Steun & mulch","advice.cat.other":"Overig"};var oi={en:Pt,nl:fs},Be=d=>(d??"en").toLowerCase().split(/[-_]/)[0]==="nl"?"nl":"en";function Ve(d){let r=oi[Be(d)];return(e,t={})=>(r[e]??Pt[e]??e).replace(/\{(\w+)\}/g,(n,i)=>{let a=t[i];return a==null?`{${i}}`:e.startsWith("alert.")&&i==="level"?r[`risk.${a}`]??String(a):e.startsWith("alert.")&&i==="when"?r[String(a)]??String(a):Array.isArray(a)?a.join(", "):String(a)})}var li=d=>d.replace(/_/g," ").replace(/^\w/,r=>r.toUpperCase()),vs={aphids:"bladluis",whitefly:"witte vlieg",red_spider_mite:"spint",thrips:"trips",slugs:"slakken",cabbage_white:"koolwitje",cabbage_root_fly:"koolvlieg",flea_beetle:"aardvlo",carrot_fly:"wortelvlieg",onion_fly:"uienvlieg",leek_moth:"preimot",pea_moth:"erwtenbladroller",birds:"vogels",pigeons:"duiven",black_bean_aphid:"zwarte bonenluis",bean_weevil:"bonenkever",leaf_miner:"bladmineerder",late_blight:"phytophthora",early_blight:"alternaria (vroeg)",blossom_end_rot:"neusrot",botrytis:"grauwe schimmel",powdery_mildew:"echte meeldauw",downy_mildew:"valse meeldauw",cucumber_mosaic_virus:"komkommermoza\xEFekvirus",clubroot:"knolvoet",white_rot:"witrot",rust:"roest",alternaria:"alternaria",leaf_spot:"bladvlekken",root_rot:"wortelrot",anthracnose:"vlekkenziekte",halo_blight:"vetvlekkenziekte",chocolate_spot:"chocoladevlekken",damping_off:"kiemplantenziekte",ants:"mieren",asparagus_beetle:"aspergekever",canker:"kanker",celery_fly:"selderijvlieg",colorado_beetle:"coloradokever",nematodes:"aaltjes",scab:"schurft",smut:"builenbrand",verticillium_wilt:"verwelkingsziekte",wireworm:"ritnaald"},Oe=(d,r)=>Be(r)==="nl"&&vs[d]?vs[d]:li(d);var bs=z`
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
`,L=z`
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
`;var di="#7d7d7d";function B(d,r){return r&&d[r]?.color||di}function ys(d){let r=d.replace(/[^\p{L}\s]/gu,"").trim(),e=r.split(/\s+/);return e.length>1?(e[0][0]+e[1][0]).toUpperCase():(r.slice(0,2)||"?").replace(/^./,t=>t.toUpperCase())}function _(d,r){return d?d.names[r]||d.names.en||d.id:"?"}var be={sow_indoor:"mdi:seed-outline",sow_direct:"mdi:seed",harden_off:"mdi:weather-partly-cloudy",transplant:"mdi:shovel",thin:"mdi:content-cut",stake:"mdi:pillar",prune:"mdi:scissors-cutting",pinch:"mdi:hand-back-left-outline",earth_up:"mdi:terrain",feed:"mdi:bottle-tonic-plus-outline",water:"mdi:watering-can",weed:"mdi:sprout-outline",pest_check:"mdi:bug-outline",harvest:"mdi:basket-outline",ventilate:"mdi:window-open-variant",shade:"mdi:sun-angle-outline",frost_protect:"mdi:snowflake-alert",soil_prep:"mdi:shovel",compost:"mdi:recycle",green_manure:"mdi:grass",mulch:"mdi:layers-outline",clean_greenhouse:"mdi:spray-bottle",winter_prep:"mdi:snowflake-variant",plan_season:"mdi:clipboard-text-outline",tool_care:"mdi:hammer-wrench",soil_test:"mdi:test-tube",cut_back:"mdi:content-cut",divide:"mdi:call-split",protect:"mdi:shield-sun-outline",clean:"mdi:broom",tie_in:"mdi:link-variant",thin_fruit:"mdi:fruit-cherries",pollinate:"mdi:bee-flower",check:"mdi:clipboard-check-outline",make_feed:"mdi:flask-outline",custom:"mdi:checkbox-marked-circle-outline"},ye={sow_indoor:"var(--hl-leaf-500)",sow_direct:"var(--hl-leaf-500)",transplant:"var(--hl-leaf-700)",harvest:"var(--hl-sun-500)",water:"var(--hl-water-500)",frost_protect:"var(--hl-frost-500)",ventilate:"var(--hl-frost-500)",shade:"var(--hl-sun-500)",weed:"var(--hl-soil-500)",pest_check:"var(--hl-tomato-500)",soil_prep:"var(--hl-soil-500)",compost:"var(--hl-soil-700)",green_manure:"var(--hl-leaf-600)",mulch:"var(--hl-soil-500)",clean_greenhouse:"var(--hl-frost-500)",winter_prep:"var(--hl-frost-500)",plan_season:"var(--hl-leaf-700)",protect:"var(--hl-sun-500)",clean:"var(--hl-soil-500)",tie_in:"var(--hl-leaf-600)",thin_fruit:"var(--hl-tomato-500)",pollinate:"var(--hl-sun-500)",make_feed:"var(--hl-soil-700)"},J=d=>{let[r,e,t]=d.slice(0,10).split("-").map(Number);return new Date(r,e-1,t,12)},$e=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`,j=(d,r)=>{let e=J(d);return e.setDate(e.getDate()+r),$e(e)},pe=(d,r)=>Math.round((J(r).getTime()-J(d).getTime())/864e5);function x(d,r,e={day:"numeric",month:"short"}){return d?J(d).toLocaleDateString(r==="nl"?"nl-NL":"en-GB",e):"\u2013"}function Rt(d,r){let e=d.anchor==="first_frost"?r.first_frost:r.last_frost,t=j(e,d.start_week*7),s=j(e,d.end_week*7+6);return t<=s?[t,s]:[s,t]}function $s(d,r,e){return r?d.status==="failed"||d.status==="finished"?!1:r.in_ground<=e&&e<=r.harvest_end:!0}function De(d){let r={urgent:3,high:2,normal:1,low:0};return[...d].sort((e,t)=>e.due===t.due?r[t.priority]-r[e.priority]:e.due<t.due?-1:1)}function ee(d){let r=globalThis.crypto?.randomUUID?.()??Math.random().toString(16).slice(2)+Date.now().toString(16);return`${d}_${r.replace(/-/g,"").slice(0,10)}`}function et(d,r,e){let t=new Blob([r],{type:e}),s=URL.createObjectURL(t),n=document.createElement("a");n.href=s,n.download=d,n.click(),setTimeout(()=>URL.revokeObjectURL(s),1e3)}function Ct(d,r,e){return r?d.season>e?!1:d.removed_season==null||e<d.removed_season:d.season===e}var _s={outdoor:["vegetable","herb","flower"],greenhouse:["vegetable","herb","fruit"],cold_frame:["vegetable","herb"],orchard:["fruit"],fruit:["fruit"],herbs:["herb","flower"],flowers:["flower","herb"]};var tt=null;function ws(d){tt=d}function At(d){return(tt?.task_tools[d]??[]).map(e=>`${tt?.tools[e]?.emoji??""} ${tt?.tools[e]?.name??e}`.trim()).join(", ")}var ks={},Lt=new Set;function xs(d){ks=d,Lt.forEach(r=>r())}function ci(d,r){d.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:r},bubbles:!0,composed:!0}))}var _e=null,re=class extends T{constructor(){super(...arguments);this.term="";this.open=!1;this.refresh=()=>this.requestUpdate();this.outside=e=>{e.composedPath().includes(this)?this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0}):this.close()}}connectedCallback(){super.connectedCallback(),Lt.add(this.refresh)}disconnectedCallback(){super.disconnectedCallback(),Lt.delete(this.refresh),_e===this&&(_e=null)}toggle(e){e.stopPropagation(),e.preventDefault(),!this.open&&_e&&_e!==this&&_e.close(),this.open=!this.open,_e=this.open?this:null,this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0})}close(){this.open=!1}onKey(e){e.key==="Escape"&&this.close()}render(){let e=ks[this.term],t=e?.term??this.term;return l`<button class="i" aria-label=${t} aria-expanded=${String(this.open)} @click=${this.toggle} @keydown=${this.onKey}>
        <ha-icon icon="mdi:information-outline"></ha-icon></button>
      ${this.open&&e?l`<div class="pop" role="tooltip"><b>${e.term}</b>${e.text}
            ${e.chapter?l`<br /><a @click=${()=>{this.close(),ci(this,e.chapter)}}>${this.t?.("handbook.read_more")??"Read more"} →</a>`:m}
          </div>`:m}`}};re.styles=z`
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
  `,p([g()],re.prototype,"term",2),p([g({attribute:!1})],re.prototype,"t",2),p([v()],re.prototype,"open",2),re=p([R("hl-info")],re);var st=80,it=new WeakMap;function hi(d){d.pointerType!=="mouse"&&it.set(d.currentTarget,{x:d.clientX,y:d.clientY,dx:0,active:!1,id:d.pointerId})}function pi(d){let r=d.currentTarget,e=it.get(r);if(!e||e.id!==d.pointerId)return;let t=d.clientX-e.x,s=d.clientY-e.y;!e.active&&Math.abs(t)>12&&Math.abs(t)>Math.abs(s)*1.5&&(e.active=!0,r.setPointerCapture(d.pointerId)),e.active&&(e.dx=t,r.style.transform=`translateX(${Math.max(-140,Math.min(140,t))}px)`,r.dataset.swipe=t>st?"complete":t<-st?"postpone":"")}function Ms(d,r,e){let t=d.currentTarget,s=it.get(t);it.delete(t),t.style.transform="",delete t.dataset.swipe,s?.active&&(d.preventDefault(),s.dx>st&&r.status==="open"?e.onComplete(r):s.dx<-st&&r.status==="open"&&e.onPostpone&&e.onPostpone(r,1))}function Ne(d,r){let e=d.status==="open"&&d.due<r.today,t=d.status!=="open",s=ye[d.type]??"var(--hl-soil-500)";return l`
    <li class="task-row ${t?"done":""} prio-${d.priority}" @pointerdown=${hi} @pointermove=${pi}
      @pointerup=${n=>Ms(n,d,r)} @pointercancel=${n=>Ms(n,d,r)}>
      <button class="check" role="checkbox" aria-checked=${String(t)} aria-label=${`${r.t("task.complete")}: ${d.title}`}
        ?disabled=${t} @click=${()=>r.onComplete(d)}>
        <ha-icon icon=${t?"mdi:check-circle":"mdi:checkbox-blank-circle-outline"}></ha-icon>
      </button>
      <button class="task-main" @click=${()=>r.onOpen(d)}>
        <span class="type-icon" style=${`color:${s}`}><ha-icon icon=${be[d.type]}></ha-icon></span>
        <span class="task-text">
          <span class="task-title">${d.title}</span>
          <span class="task-meta">
            ${e?l`<span class="chip bad">${r.t("common.overdue")} · ${x(d.due,r.lang)}</span>`:l`<span>${x(d.due,r.lang,{weekday:"short",day:"numeric",month:"short"})}</span>`}
            <span>· ${r.t("common.minutes",{n:d.estimated_minutes})}</span>
            ${d.recurrence?l`<span title=${r.t("task.repeat",{n:d.recurrence.interval_days})}>· ↻ ${d.recurrence.interval_days}d</span>`:m}
            ${d.priority==="urgent"||d.priority==="high"?l`<span class="chip ${d.priority==="urgent"?"bad":"warn"}">${r.t(`priority.${d.priority}`)}</span>`:m}
          </span>
        </span>
      </button>
    </li>`}var nt=z`
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
  .task-text { display: flex; flex-direction: column; min-width: 0; }
  .task-title { font-weight: 500; overflow: hidden; text-overflow: ellipsis; }
  .task-meta { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
`,N=class extends T{constructor(){super(...arguments);this.task=null;this.beds=[];this.lang="en";this.today="";this.create=!1;this.snapshot=null;this.note="";this.photos=[];this.busy=!1;this.error=""}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&(this.task||this.create)&&e.showModal()}close(e=!1){this.note="",this.photos=[],this.error="",this.dispatchEvent(new CustomEvent("closed",{detail:{changed:e}}))}async run(e,t){this.busy=!0;try{await e(),t&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t},bubbles:!0,composed:!0})),this.close(!0)}catch(s){this.error=s.message??String(s)}finally{this.busy=!1}}async onPhoto(e){let t=e.target.files?.[0];if(t){this.busy=!0;try{this.photos=[...this.photos,await this.api.uploadPhoto(t)]}catch(s){this.error=s.message}finally{this.busy=!1}}}submitNew(e){e.preventDefault();let t=e.target,s=n=>t.elements.namedItem(n).value;this.run(()=>this.api.addTask({title:s("title"),due:s("due")||null,task_type:s("type"),description:s("description"),priority:s("priority"),estimated_minutes:Number(s("minutes"))||null,bed_id:s("bed")||null,recurrence_days:Number(s("repeat"))||null}))}renderCreate(){let e=["custom","water","weed","feed","pest_check","harvest","prune","stake","sow_direct","transplant","ventilate","frost_protect"];return l`<form @submit=${this.submitNew}>
      <div class="head"><ha-icon class="big-icon" icon="mdi:clipboard-plus-outline"></ha-icon><h2>${this.t("cal.add_task")}</h2></div>
      <div class="body">
        <div class="form-grid">
          <label class="field full">${this.t("task.title")}<input name="title" required autofocus /></label>
          <label class="field">${this.t("task.due")}<input name="due" type="date" .value=${this.today} /></label>
          <label class="field">${this.t("task.type")}<select name="type">${e.map(t=>l`<option value=${t}>${this.t(`type.${t}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.priority")}<select name="priority">${["low","normal","high","urgent"].map(t=>l`<option value=${t} ?selected=${t==="normal"}>${this.t(`priority.${t}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.duration")}<input name="minutes" type="number" min="1" value="15" /></label>
          <label class="field">${this.t("task.bed")}<select name="bed"><option value="">–</option>${this.beds.map(t=>l`<option value=${t.id}>${t.name}</option>`)}</select></label>
          <label class="field">${this.t("task.repeat_days")}<input name="repeat" type="number" min="1" max="365" /></label>
          <label class="field full">${this.t("task.description")}<textarea name="description" rows="3"></textarea></label>
        </div>
        ${this.error?l`<p class="field-error">${this.error}</p>`:m}
      </div>
      <div class="foot">
        <button type="button" class="btn ghost" @click=${()=>this.close()}>${this.t("common.cancel")}</button>
        <button class="btn primary" type="submit" ?disabled=${this.busy}>${this.t("common.add")}</button>
      </div>
    </form>`}renderContext(e){let t=this.snapshot?.analysis;if(!t)return m;let s=[],n=e.bed_id?t.beds[e.bed_id]:void 0,i=e.zone_id??this.snapshot?.beds.find(h=>h.id===e.bed_id)?.zone_id,a=i?t.zones[i]:void 0,o=(h,u,f=0)=>h==null?null:`${h.toFixed(f)} ${u}`;if(n){let h=o(n.irrigation.moisture,"%");h&&s.push([this.t("ctx.moisture"),h]);let u=n.sensors?.soil_temperature?.value;u!=null&&s.push([this.t("ctx.soil_temp"),`${u.toFixed(1)} \xB0C`]),n.irrigation.action!=="none"&&s.push([this.t("ctx.irrigation"),this.t(`irrigation.${n.irrigation.action}`,{mm:n.irrigation.amount_mm,liters:Math.round(n.irrigation.liters)})]),n.depletion_mm!=null&&n.taw_mm&&s.push([this.t("ctx.water_balance"),`${n.depletion_mm.toFixed(0)} / ${n.taw_mm.toFixed(0)} mm`]),n.nutrients?.index!=null&&s.push([this.t("ctx.nutrients"),`${n.nutrients.index} / 100`])}a&&(a.air_temperature!=null&&s.push([this.t("ctx.air_temp"),`${a.air_temperature.toFixed(1)} \xB0C`]),a.humidity!=null&&s.push([this.t("ctx.humidity"),`${Math.round(a.humidity)} %`]),a.disease&&a.disease.level!=="unknown"&&s.push([this.t("ctx.disease"),this.t(`risk.${a.disease.level}`)]),a.frost.level!=="unknown"&&s.push([this.t("ctx.frost"),`${this.t(`risk.${a.frost.level}`)}${a.frost.plant_level_min_c!=null?` \xB7 ${a.frost.plant_level_min_c.toFixed(1)} \xB0C`:""}`]));let c=t.outlook[0];return c&&(c.tmin!=null&&c.tmax!=null&&s.push([this.t("ctx.today"),`${c.tmin.toFixed(0)}\u2013${c.tmax.toFixed(0)} \xB0C`]),s.push([this.t("ctx.rain"),`${c.rain_mm.toFixed(1)} mm`]),c.et0_mm!=null&&s.push([this.t("ctx.et0"),`${c.et0_mm.toFixed(1)} mm`])),s.length?l`<h4>${this.t("ctx.title")}</h4><div class="context">${s.map(([h,u])=>l`<div class="ctx">${h}<b>${u}</b></div>`)}</div>`:m}renderTask(e){let t=e.status==="open",s=(i,a)=>this.run(()=>this.api.taskAction(e.id,i,{note:this.note||void 0,photos:this.photos.length?[...e.photos,...this.photos]:void 0}),a),n=(i,a)=>this.run(async()=>{let o=await this.api.taskAction(e.id,"postpone",{days:i,to:a,note:this.note||void 0}),c=[];o.shifted?.length&&c.push(this.t("task.shifted",{n:o.shifted.length})),o.warnings?.includes("beyond_window")&&c.push(this.t("task.beyond_window")),c.length&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:c.join(" ")},bubbles:!0,composed:!0}))});return l`
      <div class="head">
        <ha-icon class="big-icon" icon=${be[e.type]} style=${`color:${ye[e.type]??"inherit"}`}></ha-icon>
        <div class="stack" style="gap:4px">
          <h2>${e.title}</h2>
          <div class="row wrap small muted">
            <span>${this.t("task.due")}: <b>${x(e.due,this.lang,{weekday:"long",day:"numeric",month:"long"})}</b></span>
            <span class="chip">${this.t(`type.${e.type}`)}</span>
            <span class="chip">${this.t(`task.source.${e.source}`)}</span>
          </div>
        </div>
      </div>
      <div class="body">
        ${e.description?l`<p>${e.description}</p>`:m}
        ${e.title_params?.handbook?l`<a class="small" href="#" @click=${i=>{i.preventDefault(),this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e.title_params.handbook},bubbles:!0,composed:!0})),this.close()}}><ha-icon icon="mdi:book-open-page-variant-outline" style="--mdc-icon-size:16px"></ha-icon> ${this.t("handbook.read_more")}</a>`:m}
        ${this.renderContext(e)}
        ${At(e.type)?l`<p class="small"><ha-icon icon="mdi:toolbox-outline" style="--mdc-icon-size:16px"></ha-icon>
          <b>${this.t("task.tools")}:</b> ${At(e.type)}</p>`:m}
        ${e.window_start&&e.window_end&&e.window_start!==e.window_end?l`<p class="small muted">${this.t("task.window",{start:x(e.window_start,this.lang),end:x(e.window_end,this.lang)})}</p>`:m}
        ${e.recurrence?l`<p class="small muted">↻ ${this.t("task.repeat",{n:e.recurrence.interval_days})}</p>`:m}
        <div class="row wrap small">
          <span>${this.t("task.priority")}:</span>
          ${["low","normal","high","urgent"].map(i=>l`
            <button class="chip" aria-pressed=${String(e.priority===i)}
              @click=${()=>this.run(()=>this.api.taskAction(e.id,"update",{changes:{priority:i}}))}>${this.t(`priority.${i}`)}</button>`)}
        </div>
        ${e.notes.length?l`<h4>${this.t("task.notes")}</h4>${e.notes.map(i=>l`<p class="note"><span class="xs muted">${x(i.at.slice(0,10),this.lang)}</span> ${i.text}</p>`)}`:m}
        ${e.photos.length||this.photos.length?l`<h4>${this.t("task.photos")}</h4>
          <div class="photos">${[...e.photos,...this.photos].map(i=>l`<a href=${Tt(i,"original")} target="_blank" rel="noopener"><img src=${Tt(i)} alt=${this.t("task.photos")} loading="lazy" /></a>`)}</div>`:m}
        <label class="field">${this.t("task.note")}<textarea rows="2" .value=${this.note} @input=${i=>this.note=i.target.value}></textarea></label>
        <label class="btn small" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("task.add_photo")}
          <input type="file" accept="image/*" capture="environment" class="visually-hidden" @change=${this.onPhoto} /></label>
        ${t?l`
          <div class="row wrap">
            <span class="small">${this.t("task.postpone")}:</span>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>n(1)}>${this.t("task.postpone_1")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>n(3)}>${this.t("task.postpone_3")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>n(7)}>${this.t("task.postpone_7")}</button>
            <input type="date" style="width:auto" aria-label=${this.t("task.postpone_to")} .min=${j(this.today,1)}
              @change=${i=>n(void 0,i.target.value)} />
          </div>`:m}
        ${this.error?l`<p class="field-error" role="alert">${this.error}</p>`:m}
      </div>
      <div class="foot">
        ${e.source==="user"?l`<button class="btn danger" ?disabled=${this.busy} @click=${()=>s("delete")}>${this.t("common.delete")}</button>`:m}
        <span class="spacer"></span>
        <button class="btn ghost" @click=${()=>this.close()}>${this.t("common.close")}</button>
        ${t?l`<button class="btn" ?disabled=${this.busy} @click=${()=>s("skip")}>${this.t("task.skip")}</button>
              <button class="btn primary" ?disabled=${this.busy} @click=${()=>s("complete",this.t("task.completed",{title:e.title}))}>
                <ha-icon icon="mdi:check"></ha-icon>${this.t("task.complete")}</button>`:l`<button class="btn" ?disabled=${this.busy} @click=${()=>s("reopen")}>${this.t("task.reopen")}</button>`}
      </div>`}render(){return!this.task&&!this.create?m:l`<dialog @close=${()=>this.close()}>${this.create?this.renderCreate():this.renderTask(this.task)}</dialog>`}};N.styles=[L,z`
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
    `],p([g({attribute:!1})],N.prototype,"task",2),p([g({attribute:!1})],N.prototype,"beds",2),p([g({attribute:!1})],N.prototype,"api",2),p([g({attribute:!1})],N.prototype,"t",2),p([g()],N.prototype,"lang",2),p([g()],N.prototype,"today",2),p([g({type:Boolean})],N.prototype,"create",2),p([g({attribute:!1})],N.prototype,"snapshot",2),p([v()],N.prototype,"note",2),p([v()],N.prototype,"photos",2),p([v()],N.prototype,"busy",2),p([v()],N.prototype,"error",2),N=p([R("hl-task-dialog")],N);var jt={none:"ok",low:"cold",moderate:"warn",high:"bad",unknown:""},mi={frost:"mdi:snowflake-alert",heat:"mdi:thermometer-alert",dry:"mdi:water-alert",sensor_stale:"mdi:access-point-network-off",forecast:"mdi:weather-cloudy-alert",disease:"mdi:mushroom-outline",nutrients:"mdi:flask-outline"},Q=class extends T{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en";this.admin=!0}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get ctx(){return{t:this.t,lang:this.lang,today:this.snapshot.analysis?.today??"",onOpen:e=>this.emit("open-task",e),onComplete:e=>this.emit("complete-task",e),onPostpone:(e,t)=>this.emit("postpone-task",{task:e,days:t})}}greeting(){let e=new Date().getHours();return this.t(e<12?"dash.greeting_morning":e<18?"dash.greeting_afternoon":"dash.greeting_evening")}render(){let e=this.snapshot,t=e.analysis;if(!t)return l`<p class="empty">${this.t("common.loading")}</p>`;let s=t.today,n=De(e.tasks.filter(c=>c.status==="open"&&c.due<=s)),i=De(e.tasks.filter(c=>c.status==="open"&&c.due>s&&c.due<=j(s,7))),a=n.reduce((c,h)=>c+h.estimated_minutes,0),o=e.zones.filter(c=>c.type!=="outdoor");return l`
      <section class="hero">
        <div class="stack" style="gap:4px">
          <span class="muted small">${x(s,this.lang,{weekday:"long",day:"numeric",month:"long"})} · ${this.t("common.season",{year:t.season})}</span>
          <h1>${this.greeting()} 🌱</h1>
        </div>
        <span class="spacer"></span>
        <span class="chip ${jt[t.frost.level]}"><ha-icon icon="mdi:snowflake"></ha-icon>${this.t("dash.frost_risk")}: ${this.t(`risk.${t.frost.level}`)}</span>
        <span class="chip"><ha-icon icon="mdi:thermometer-plus"></ha-icon>${Math.round(t.gdd.season_total)} GDD</span>
      </section>

      ${t.alerts.length?l`<section class="alerts" aria-label="Alerts">
        ${t.alerts.map(c=>l`<div class="alert ${c.kind==="frost"?"frost":c.severity}" role=${c.severity==="critical"?"alert":"status"}>
          <ha-icon icon=${mi[c.kind]??"mdi:information-outline"}></ha-icon>
          <div><b>${this.t(c.message_key,c.params)}</b>
            ${Array.isArray(c.params.plants)&&c.params.plants.length?l`<div class="small">${c.params.plants.join(", ")}</div>`:m}</div>
        </div>`)}
      </section>`:m}

      <div class="grid">
        <section class="card span-8" aria-labelledby="today-h">
          <header><h2 id="today-h">${this.t("dash.today_tasks")}</h2><span class="spacer"></span>
            ${n.length?l`<span class="small muted">${this.t("dash.total_time",{minutes:a})}</span>`:m}</header>
          ${n.length?l`<ul class="tasks">${n.slice(0,10).map(c=>Ne(c,this.ctx))}</ul>`:l`<p class="empty">${this.t("dash.no_tasks")}</p>`}
          ${n.length>10?l`<button class="btn small ghost" @click=${()=>this.emit("navigate","calendar")}>${this.t("dash.show_all",{n:n.length})}</button>`:m}
        </section>

        <section class="card span-4" aria-labelledby="weather-h">
          <header><h2 id="weather-h">${this.t("dash.weather")}</h2></header>
          ${t.weather_available?l`
            <div class="days">${t.outlook.slice(0,3).map(c=>l`
              <div class="day">
                <div class="small muted">${c.day===s?this.t("common.today"):x(c.day,this.lang,{weekday:"short"})}</div>
                <div class="temp">${c.tmax!=null?Math.round(c.tmax):"\u2013"}° <span class="muted small">${c.tmin!=null?Math.round(c.tmin):"\u2013"}°</span></div>
                <div class="xs muted">💧 ${c.rain_mm} mm${c.et0_mm!=null?l` · ET₀ ${c.et0_mm}`:m}</div>
              </div>`)}</div>
            <div class="divider"></div>
            <div class="kv"><span>${this.t("dash.frost_risk")}</span><span class="chip ${jt[t.frost.level]}">${this.t(`risk.${t.frost.level}`)}</span></div>
            ${t.frost.plant_level_min_c!=null?l`<div class="kv"><span></span><span class="muted">${this.t("dash.min_temp",{temp:t.frost.plant_level_min_c})}${t.frost.min_at?` \xB7 ${new Date(t.frost.min_at).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{weekday:"short",hour:"2-digit",minute:"2-digit"})}`:""}</span></div>`:m}
          `:l`<p class="small muted">${this.t("dash.forecast_missing")}</p>`}
          <div class="divider"></div>
          ${t.et0_today!=null?l`<div class="kv"><span>ET₀ ${this.t("common.today").toLowerCase()} <hl-info term="et0" .t=${this.t}></hl-info></span>
            <span><b>${t.et0_today.toFixed(1)} mm</b> <span class="muted xs">${t.et0_method==="penman_monteith"?"Penman-Monteith":t.et0_method==="hargreaves"?"Hargreaves":""}</span></span></div>`:m}
          ${t.gdd_today!=null?l`<div class="kv"><span>${this.t("dash.gdd_today")}</span><span><b>${t.gdd_today.toFixed(1)}</b></span></div>`:m}
          <div class="kv"><span>${this.t("dash.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span><b>${Math.round(t.gdd.season_total)}</b> <span class="muted xs">${this.t("dash.gdd_since",{date:x(t.gdd.since,this.lang)})}</span></span></div>
        </section>

        <section class="card span-8" aria-labelledby="beds-h">
          <header><h2 id="beds-h">${this.t("dash.beds")}</h2></header>
          <div class="beds">${e.beds.map(c=>this.renderBed(c.id))}</div>
        </section>

        ${this.renderWaterClimate()}

        <section class="card span-4" aria-labelledby="up-h">
          ${o.map(c=>{let h=t.zones[c.id]?.greenhouse;return l`<header><h2>${c.name}</h2><span class="spacer"></span>
                <span class="chip ${h?.action==="none"||!h?"ok":h.action==="shade"||h.action==="heat"?"bad":"warn"}">${this.t(`gh.${h?.action??"none"}`)}</span></header>
              ${t.zones[c.id]?.air_temperature!=null?l`<div class="big">${t.zones[c.id].air_temperature?.toFixed(1)}°</div>`:l`<p class="small muted">${this.t("dash.no_sensor")}</p>`}
              ${h?.limit_max_c!=null&&h.limiting_plants.length?l`<p class="small muted">${this.t("dash.limits",{min:h.limit_min_c,max:h.limit_max_c})} (${h.limiting_plants.join(", ")})</p>`:m}
              ${h?.forecast_max_c!=null?l`<p class="xs muted">↑ ${h.forecast_max_c}° · ↓ ${h.forecast_min_c??"\u2013"}°</p>`:m}
              <div class="divider"></div>`})}
          <header><h2 id="up-h">${this.t("dash.coming_up")}</h2></header>
          ${i.length?l`<ul class="tasks">${i.slice(0,8).map(c=>Ne(c,this.ctx))}</ul>`:l`<p class="small muted">–</p>`}
        </section>
      </div>
    `}renderWaterClimate(){let e=this.snapshot,t=e.analysis,s=e.irrigation_status,n=e.settings.irrigation,i=e.beds.filter(h=>h.irrigation_entity).length,a=e.zones.filter(h=>t.zones[h.id]?.disease&&t.zones[h.id].disease.level!=="unknown"),o=e.beds.filter(h=>t.beds[h.id]?.irrigation.action==="water"),c=h=>e.beds.find(u=>u.id===h)?.name??"";return l`<section class="card span-4" aria-labelledby="wc-h">
      <header><h2 id="wc-h">${this.t("dash.water_climate")}</h2></header>
      <div class="kv"><span>${this.t("dash.irrigation_mode")}</span><span class="chip">${this.t(`settings.irrigation_mode.${n?.mode??"advise"}`)}</span></div>
      ${s?.running?l`<div class="kv"><span class="chip ok"><ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.watering_now",{bed:c(s.bed_id)})}</span>
        <button class="btn small danger" @click=${()=>this.emit("irrigation","stop")}>${this.t("dash.stop")}</button></div>`:m}
      ${s?.last_error?l`<p class="xs" style="color:var(--hl-danger)">⚠ ${s.last_error}</p>`:m}
      <div class="kv"><span>${this.t("dash.beds_need_water")}</span><b>${o.length?o.map(h=>h.name).join(", "):"\u2013"}</b></div>
      ${i&&this.admin&&!s?.running?l`<button class="btn small" @click=${()=>this.emit("irrigation","run")}>
        <ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.water_now")}</button>
        <p class="xs muted">${this.t("dash.safety_note")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></p>`:m}
      ${a.length?l`<div class="divider"></div>
        <div class="kv"><span><b>${this.t("dash.disease_risk")}</b> <hl-info term="leaf_wetness" .t=${this.t}></hl-info></span></div>
        ${a.map(h=>{let u=t.zones[h.id].disease;return l`<div class="kv"><span>${h.name}</span><span class="chip ${jt[u.level]}">${this.t(`risk.${u.level}`)}${u.wet_hours?` \xB7 ${Math.round(u.wet_hours)} h`:""}</span></div>`})}`:m}
    </section>`}renderBed(e){let t=this.snapshot,s=t.beds.find(f=>f.id===e),n=t.analysis?.beds[e],i=n?.irrigation,a=n?.moisture_status??"unknown",o=n?.sensors?.soil_temperature?.value,c=(n?.active_plantings??[]).map(f=>t.plantings.find(b=>b.id===f)).filter(Boolean),h=a==="optimal"?"ok":a==="dry"?"bad":a==="unknown"?"":a==="wet"?"cold":"warn",u=f=>Math.max(0,Math.min(100,f));return l`
      <article class="bed" aria-label=${s.name}>
        <div class="row"><h3>${s.name}</h3><span class="spacer"></span><span class="chip ${h}">${this.t(`moisture.${a}`)}</span></div>
        ${i?.moisture!=null?l`
          <div class="gauge" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(i.moisture)} aria-label=${this.t("settings.sensor.soil_moisture")}>
            ${i.target_low!=null&&i.target_high!=null?l`<div class="target" style=${`left:${u(i.target_low)}%;width:${u(i.target_high)-u(i.target_low)}%`}></div>`:m}
            <div class="value" style=${`left:${u(i.moisture)}%`}></div>
          </div>
          <div class="kv"><span>💧 ${Math.round(i.moisture)}%</span>${o!=null?l`<span>🌡 ${o.toFixed(1)} °C</span>`:m}</div>`:l`<p class="xs muted">${this.t("dash.no_sensor")}</p>`}
        ${i?l`<p class="small"><ha-icon icon="mdi:watering-can-outline" style="--mdc-icon-size:16px"></ha-icon>
          ${this.t(`irrigation.${i.action}`,{mm:i.amount_mm,liters:Math.round(i.liters)})}${i.duration_min?` \xB7 ${Math.round(i.duration_min)} min`:""}</p>`:m}
        ${n?.nutrients?.index!=null?l`<div class="kv"><span>${this.t("dash.nutrients")} <hl-info term="nutrient_index" .t=${this.t}></hl-info></span>
          <span class="chip ${n.nutrients.status==="balanced"?"ok":"warn"}">${n.nutrients.index}/100</span></div>`:m}
        ${n?.depletion_mm!=null&&n.taw_mm?l`<div class="kv xs muted"><span>${this.t("dash.water_balance")} <hl-info term="water_balance" .t=${this.t}></hl-info></span>
          <span>${Math.round(n.depletion_mm)} / ${Math.round(n.taw_mm)} mm</span></div>`:m}
        <div class="avatars" aria-label=${this.t("dash.active_crops",{n:c.length})}>
          ${c.map(f=>{let b=this.plants.get(f.plant_id),k=_(b,this.lang);return l`<span class="avatar" title=${k} style=${`background:${B(this.families,b?.family)}`}>${k.slice(0,2)}</span>`})}
        </div>
      </article>`}};Q.styles=[L,nt,z`
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
      .avatar { width: 24px; height: 24px; border-radius: 6px; display: grid; place-items: center; color: #fff; font-size: 10px; font-weight: 700; }
      .days { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--hl-s2); }
      .day { text-align: center; padding: var(--hl-s2); border-radius: var(--hl-r-md); background: var(--hl-surface-2); }
      .day .temp { font-size: var(--hl-fs-lg); font-weight: 600; }
      .big { font-size: var(--hl-fs-3xl); font-weight: 700; line-height: 1; }
      .kv { display: flex; justify-content: space-between; gap: var(--hl-s2); font-size: var(--hl-fs-sm); }
    `],p([g({attribute:!1})],Q.prototype,"snapshot",2),p([g({attribute:!1})],Q.prototype,"plants",2),p([g({attribute:!1})],Q.prototype,"families",2),p([g({attribute:!1})],Q.prototype,"t",2),p([g()],Q.prototype,"lang",2),p([g({type:Boolean})],Q.prototype,"admin",2),Q=p([R("hl-dashboard-view")],Q);var Ss={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},rt=d=>(...r)=>({_$litDirective$:d,values:r}),at=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,e,t){this._$Ct=r,this._$AM=e,this._$Ci=t}_$AS(r,e){return this.update(r,e)}update(r,e){return this.render(...e)}};var me=class extends at{constructor(r){if(super(r),this.it=m,r.type!==Ss.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===m||r==null)return this._t=void 0,this.it=r;if(r===se)return r;if(typeof r!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;let e=[r];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};me.directiveName="unsafeHTML",me.resultType=1;var Es=rt(me);var Fe=class extends me{};Fe.directiveName="unsafeSVG",Fe.resultType=2;var It=rt(Fe);var G="#4f8a34",lt="#6aa648",W="#3f7a2a",Ht="#7a5a3a",ot='fill="#fff" opacity=".32"',we=d=>`
  <rect x="10.8" y="14" width="2.4" height="8.5" rx="1" fill="${Ht}"/>
  <circle cx="12" cy="10" r="8.6" fill="${G}"/>
  <circle cx="9.2" cy="7.6" r="4.6" fill="${lt}"/>
  <g fill="currentColor" stroke="#fff" stroke-width=".55">${d}</g>`,dt={carrot:`
    <path d="M12 9.5C12.2 6 14.5 3.6 17.4 3M12 9.5c0-3.4-.1-5.7-.3-7.5M12 9.5C10.8 6.4 8.8 4.4 6.4 3.6" stroke="${G}" stroke-width="1.7" stroke-linecap="round" fill="none"/>
    <path d="M12 8.6c-2.4 0-3.9 1.4-3.9 3.4 0 3 1.8 7.2 3.9 10.6 2.1-3.4 3.9-7.6 3.9-10.6 0-2-1.5-3.4-3.9-3.4z" fill="currentColor"/>
    <path d="M9.4 12.8h2.1M10.4 15.8h1.8M11 18.8h1.1M12.6 11.4h1.9M12.6 14.4h1.6" stroke="rgba(0,0,0,.22)" stroke-width=".8" stroke-linecap="round"/>`,tomato:`
    <circle cx="12" cy="13.4" r="8.2" fill="currentColor"/>
    <ellipse cx="8.8" cy="11" rx="2.2" ry="1.4" ${ot}/>
    <path d="M12 6.4l1.5 2.4 2.9-.5-1.9 2 1.7 2-2.9-.6L12 14l-1.3-2.3-2.9.6 1.7-2-1.9-2 2.9.5z" fill="${W}"/>
    <path d="M12 6.8V3.4" stroke="${W}" stroke-width="1.5" stroke-linecap="round"/>`,pepper:`
    <path d="M5.8 10.2c0-2.6 2-3.7 3.6-3.1 1 .4 1.7.4 2.6 0s1.6-.4 2.6 0c1.6-.6 3.6.5 3.6 3.1 0 5.2-2.1 11-6.2 11S5.8 15.4 5.8 10.2z" fill="currentColor"/>
    <path d="M12 7.2V4c0-.7.6-1.1 1.4-.9" stroke="${W}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M8.2 10.5c-.2 2.4.2 5 1.2 7" stroke="#fff" stroke-opacity=".35" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,chili:`
    <path d="M7.8 5c1.6 0 2.6 1.1 2.9 2.6 1.3 5.4 4.2 9.4 9.3 12.9-7.2.6-13.2-5.4-13.5-11.9C6.4 6.6 6.8 5 7.8 5z" fill="currentColor"/>
    <path d="M7.9 5.3C7.7 3.6 8.5 2.4 10 2" stroke="${W}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M8.6 8.6c.6 3.4 2.6 6.4 5.6 8.6" stroke="#fff" stroke-opacity=".35" stroke-width="1" fill="none" stroke-linecap="round"/>`,eggplant:`
    <path d="M9 6.3c3.1-1 6.1 1.1 8.1 5.1 2.5 5 1 10.1-3 10.6S6 18.2 6.5 12.2C6.7 9.2 7.3 6.9 9 6.3z" fill="currentColor"/>
    <path d="M7.4 7.6c.5-3 3-4 5.6-2.7-1.2.3-2 1-2.3 2 1.3-.2 2.4.2 3.3 1.2-2.2-.3-4.5-.2-6.6-.5z" fill="${W}"/>
    <path d="M8.6 11c0 2.6 1 5 2.6 6.6" stroke="#fff" stroke-opacity=".3" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,cucumber:`
    <g transform="rotate(-32 12 12.5)">
      <rect x="2.6" y="9" width="18.8" height="7.2" rx="3.6" fill="currentColor"/>
      <path d="M5 11h14" stroke="#fff" stroke-opacity=".3" stroke-width="1.1" stroke-linecap="round"/>
      <g fill="#fff" opacity=".45"><circle cx="7" cy="13.6" r=".6"/><circle cx="11" cy="14.2" r=".6"/><circle cx="15" cy="13.6" r=".6"/><circle cx="9" cy="12.2" r=".5"/><circle cx="13" cy="12.4" r=".5"/></g>
    </g>
    <path d="M19.4 6.6l2-1.6" stroke="${W}" stroke-width="1.5" stroke-linecap="round"/>`,pumpkin:`
    <path d="M12 7.6V4.6c.3-.9 1.2-1.3 2.1-1.1" stroke="#6b5232" stroke-width="1.9" fill="none" stroke-linecap="round"/>
    <ellipse cx="12" cy="14" rx="9.6" ry="7.2" fill="currentColor"/>
    <path d="M12 6.9c-2.6 2-2.6 12.1 0 14.2M12 6.9c2.6 2 2.6 12.1 0 14.2M7 8.2c-2.6 2.6-2.6 9 0 11.6M17 8.2c2.6 2.6 2.6 9 0 11.6" stroke="rgba(0,0,0,.2)" stroke-width=".9" fill="none"/>`,melon:`
    <circle cx="12" cy="12.6" r="8.6" fill="currentColor"/>
    <path d="M12 4c-3 3-3 14.2 0 17.2M12 4c3 3 3 14.2 0 17.2M6 6.4c-2 3.6-2 9 0 12.2M18 6.4c2 3.6 2 9 0 12.2" stroke="rgba(0,0,0,.22)" stroke-width="1.1" fill="none"/>
    <ellipse cx="8.6" cy="9" rx="2" ry="1.2" ${ot}/>`,root:`
    <path d="M12 9.4C10.6 6.6 8.2 5 5.8 4.8c.8 2.5 3.1 4.1 6.2 4.6zM12 9.4c1.4-2.8 3.8-4.4 6.2-4.6-.8 2.5-3.1 4.1-6.2 4.6z" fill="${G}"/>
    <path d="M12 9.6V2.6" stroke="${G}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12 8.8c3.7 0 6 2.4 6 5.4 0 3.1-2.7 5.4-6 5.4s-6-2.3-6-5.4c0-3 2.3-5.4 6-5.4z" fill="currentColor"/>
    <path d="M12 19.4v3.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <ellipse cx="9.6" cy="12.6" rx="1.6" ry="1.1" ${ot}/>`,potato:`
    <path d="M4.8 12.6c0-4.1 3.6-6.6 7.7-6.4 4.4.2 7.1 2.8 6.7 6.6-.4 3.9-3.6 5.9-7.6 5.7-4.3-.2-6.8-1.9-6.8-5.9z" fill="currentColor"/>
    <g fill="rgba(0,0,0,.3)"><circle cx="8.8" cy="11" r=".75"/><circle cx="13.6" cy="9.4" r=".65"/><circle cx="15.7" cy="13.6" r=".75"/><circle cx="10.6" cy="15" r=".65"/></g>
    <path d="M14.5 6.6c.6-2.4 2.6-3.6 4.6-3.2-.6 2-2.3 3.2-4.6 3.2z" fill="${G}"/>`,onion:`
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
    <path d="M12 4.2C9.6 2 6.6 2 4.6 3.4 7 5 9.6 5.2 12 4.2zM12 4.2c2.4-2.2 5.4-2.2 7.4-.8-2.4 1.6-5 1.8-7.4.8z" fill="${G}"/>
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
    <path d="M10 13C5 12 4 6 7 2.8c3 1 4 5.2 3 10.2zM14 13c5-1 6-7 3-10.2-3 1-4 5.2-3 10.2zM12 12.2c-2-3-2-7.2 0-10.2 2 3 2 7.2 0 10.2z" fill="${W}"/>
    <path d="M9 22.2l1-9.4M12 22.2V12M15 22.2l-1-9.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`,celery:`
    <g fill="${G}"><circle cx="8.8" cy="7" r="2.7"/><circle cx="12" cy="4.8" r="2.9"/><circle cx="15.2" cy="7" r="2.7"/></g>
    <path d="M8 22.2l1.5-12.2M12 22.2V9M16 22.2l-1.5-12.2" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>`,fennel:`
    <path d="M10 11.6L8 3M12 11V2M14 11.6L16 3M8.8 6.4l-2-.8M9.5 8.8l-2 .2M12 5l-1.6-1M12 7.6l1.6-1M15.2 6.4l2-.8M14.5 8.8l2 .2" stroke="#5f9a3a" stroke-width="1" stroke-linecap="round"/>
    <path d="M6.4 16.2c0-3 2.6-5.2 5.6-5.2s5.6 2.2 5.6 5.2-2.6 5.6-5.6 5.6-5.6-2.6-5.6-5.6z" fill="currentColor" stroke="#b9c58a" stroke-width=".8"/>`,pea:`
    <path d="M2.8 15.2c3-4.1 9.1-7.1 16.2-8.1 1-.1 2 .7 1.5 1.7-2.5 4.4-8.5 8.4-15.5 8.9-1.5.1-2.8-1.2-2.2-2.5z" fill="currentColor"/>
    <g fill="#c4e48e"><circle cx="7.8" cy="14.4" r="1.8"/><circle cx="11.4" cy="12.8" r="1.8"/><circle cx="15" cy="10.9" r="1.7"/></g>
    <path d="M19.6 7.4c.5-2 2-2.6 2.6-1.6s-.5 2.1-1.3 1.4" stroke="${G}" stroke-width=".9" fill="none" stroke-linecap="round"/>`,bean:`
    <path d="M4 5.8c1 6.2 4.1 11.3 10.2 14.4 2 1 4.1.5 3.6-1C14.2 16.1 9.1 11 6.6 4.8c-.6-1.2-2.7-1-2.6 1z" fill="currentColor"/>
    <path d="M6.6 8.6c.8.3 1.4 1 1.5 2M9.1 12.6c.8.3 1.4 1 1.5 2M12.1 16.1c.8.3 1.4 1 1.5 2" stroke="rgba(255,255,255,.45)" stroke-width=".9" fill="none" stroke-linecap="round"/>
    <path d="M4.4 5C4.2 3.6 5 2.6 6.4 2.4" stroke="${W}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,corn:`
    <ellipse cx="12" cy="11" rx="4.2" ry="8.6" fill="currentColor"/>
    <path d="M8.4 7h7.2M8 10h8M8 13h8M8.5 16h7M10 3.2v15.4M14 3.2v15.4" stroke="rgba(0,0,0,.16)" stroke-width=".7"/>
    <path d="M12 22.4c-3-1-5.6-4.1-6.6-9.2 2 2 4.1 4.1 6.6 9.2zM12 22.4c3-1 5.6-4.1 6.6-9.2-2 2-4.1 4.1-6.6 9.2z" fill="${lt}"/>`,asparagus:`
    <g stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M8 22.2V7.4M12 22.2V4.2M16 22.2V8.4"/></g>
    <g fill="#5f7f3a"><path d="M6.7 8L8 4.2 9.3 8z"/><path d="M10.7 4.8L12 1 13.3 4.8z"/><path d="M14.7 9L16 5.2 17.3 9z"/></g>`,artichoke:`
    <path d="M12 20v3" stroke="#6b8f5a" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 2.8c3.1 2 6.2 5.1 6.2 9.7S15.1 20.2 12 20.2s-6.2-3.1-6.2-7.7S8.9 4.8 12 2.8z" fill="currentColor"/>
    <path d="M8 10.4c2 1 6 1 8 0M7 13.9c2.5 1.4 7.5 1.4 10 0M8.5 17.4c2 1 5 1 7 0M12 2.8v4" stroke="rgba(0,0,0,.22)" stroke-width=".9" fill="none"/>`,rhubarb:`
    <path d="M2.8 9.2c0-4.1 4.1-6.6 9.2-6.6s9.2 2.5 9.2 6.6c0 2-2 3.6-4.1 3.1-1.5 1.5-3.6 1.5-5.1.5-1.5 1-3.6 1-5.1-.5-2 .5-4.1-1-4.1-3.1z" fill="${G}"/>
    <path d="M12 12.6V4M12 8L7 5.6M12 8l5-2.4" stroke="rgba(255,255,255,.4)" stroke-width=".9" fill="none"/>
    <path d="M9.2 22.2l2-10M13.2 22.2l.9-10" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>`,strawberry:`
    <path d="M12 21.2c-4.1-2-7.6-6.6-7.6-10.6 0-3 2.5-4.6 4.6-4.1 1.2.3 2 .8 3 .8s1.8-.5 3-.8c2.1-.5 4.6 1.1 4.6 4.1 0 4-3.5 8.6-7.6 10.6z" fill="currentColor"/>
    <g fill="#f7e27a"><circle cx="9" cy="10.2" r=".55"/><circle cx="12" cy="11" r=".55"/><circle cx="15" cy="10.2" r=".55"/><circle cx="10.5" cy="13.6" r=".55"/><circle cx="13.5" cy="13.6" r=".55"/><circle cx="12" cy="16.6" r=".55"/><circle cx="8" cy="12.9" r=".5"/><circle cx="16" cy="12.9" r=".5"/></g>
    <path d="M6.8 7.4c1.6-1.1 3.2-1.3 5.2 0 2-1.3 3.6-1.1 5.2 0-1.6.9-3.4 1.1-5.2.3-1.8.8-3.6.6-5.2-.3zM12 7.4V3.4" fill="${W}" stroke="${W}" stroke-width="1" stroke-linecap="round"/>`,berry:`
    <path d="M12 8.6C12 5.6 14 3.6 16.6 3.4" stroke="${W}" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.18)" stroke-width=".5"><circle cx="9" cy="11" r="3.5"/><circle cx="15" cy="11" r="3.5"/><circle cx="12" cy="16.4" r="3.5"/></g>
    <g ${ot}><circle cx="8" cy="10" r=".9"/><circle cx="14" cy="10" r=".9"/><circle cx="11" cy="15.4" r=".9"/></g>`,currant:`
    <path d="M14.2 4.4c2-1.6 4.6-1.6 6.6 0-2 1.4-4.6 1.4-6.6 0z" fill="${G}"/>
    <path d="M8 2.8c2 1 3 3 4 6s3 7 4 12.2" stroke="#6b5232" stroke-width=".9" fill="none"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.25)" stroke-width=".5"><circle cx="11" cy="8" r="2.1"/><circle cx="14.2" cy="10.6" r="2.2"/><circle cx="11.6" cy="13.2" r="2.3"/><circle cx="15" cy="16" r="2.3"/><circle cx="12.6" cy="18.9" r="2.3"/></g>`,berry_bush:`
    <circle cx="12" cy="12.6" r="9.2" fill="${G}"/>
    <circle cx="9" cy="10" r="4.1" fill="${lt}"/><circle cx="15" cy="11" r="4" fill="${lt}" opacity=".7"/>
    <g fill="currentColor" stroke="#fff" stroke-width=".55"><circle cx="8" cy="13.2" r="1.6"/><circle cx="14" cy="8" r="1.6"/><circle cx="16.2" cy="14.6" r="1.6"/><circle cx="11" cy="17.6" r="1.6"/><circle cx="11.4" cy="10.6" r="1.5"/></g>`,cane:`
    <path d="M6.8 22.4C6.8 15 8 8 10 2.8M12 22.4c0-7 1-12.2 3-17.2M17.2 22.4c0-6.2 0-10.2 1.5-14" stroke="${Ht}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <g fill="${G}"><ellipse cx="6" cy="9" rx="2.6" ry="1.4" transform="rotate(-30 6 9)"/><ellipse cx="17.6" cy="5.8" rx="2.6" ry="1.4" transform="rotate(30 17.6 5.8)"/><ellipse cx="20.2" cy="12" rx="2.4" ry="1.3" transform="rotate(20 20.2 12)"/></g>
    <g fill="currentColor" stroke="rgba(0,0,0,.2)" stroke-width=".5"><circle cx="9.4" cy="12.4" r="2.2"/><circle cx="14" cy="9.2" r="2.2"/><circle cx="13.2" cy="16.4" r="2.1"/><circle cx="18.6" cy="16.2" r="2"/></g>`,grape:`
    <path d="M12.6 5.6V2.6c0-.6.6-1 1.4-.9" stroke="#6b5232" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M14 4.2c2-2 5-2 7 0-2 1.5-4.6 1.6-7 0z" fill="${G}"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.2)" stroke-width=".5"><circle cx="7.8" cy="8" r="2.5"/><circle cx="12.4" cy="8" r="2.5"/><circle cx="17" cy="8" r="2.5"/><circle cx="10" cy="12.2" r="2.5"/><circle cx="14.6" cy="12.2" r="2.5"/><circle cx="12.2" cy="16.4" r="2.5"/><circle cx="12.2" cy="20.4" r="2.1"/></g>`,tree_apple:we('<circle cx="7.8" cy="11" r="1.7"/><circle cx="13" cy="6.4" r="1.7"/><circle cx="15.9" cy="11.6" r="1.7"/><circle cx="11" cy="13.8" r="1.6"/>'),tree_pear:we('<ellipse cx="7.8" cy="11" rx="1.3" ry="1.9"/><ellipse cx="13" cy="6.4" rx="1.3" ry="1.9"/><ellipse cx="15.9" cy="11.6" rx="1.3" ry="1.9"/><ellipse cx="11" cy="14" rx="1.3" ry="1.8"/>'),tree_plum:we('<ellipse cx="8" cy="11" rx="1.4" ry="1.8"/><ellipse cx="13" cy="6.6" rx="1.4" ry="1.8"/><ellipse cx="15.8" cy="11.6" rx="1.4" ry="1.8"/><ellipse cx="11" cy="14" rx="1.4" ry="1.7"/><ellipse cx="10" cy="7.6" rx="1.3" ry="1.6"/>'),tree_cherry:we('<circle cx="7.4" cy="11.6" r="1.3"/><circle cx="9.4" cy="12" r="1.3"/><circle cx="13" cy="7" r="1.3"/><circle cx="15" cy="7.4" r="1.3"/><circle cx="14.8" cy="12.4" r="1.3"/><circle cx="16.8" cy="12" r="1.3"/>'),tree_fig:we('<path d="M8 9.4c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/><path d="M14.2 4.8c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/><path d="M15.6 10.6c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/>'),tree_nut:we('<circle cx="8" cy="11.4" r="1.5"/><circle cx="13.2" cy="6.8" r="1.5"/><circle cx="15.8" cy="12" r="1.5"/><circle cx="11" cy="14" r="1.4"/>'),tree:`
    <rect x="10.8" y="14" width="2.4" height="8.5" rx="1" fill="${Ht}"/>
    <circle cx="12" cy="10" r="8.6" fill="currentColor"/>
    <circle cx="9.2" cy="7.6" r="4.6" fill="#fff" opacity=".18"/>`,sunflower:`
    <g fill="currentColor">${Array.from({length:12},(d,r)=>`<ellipse cx="12" cy="4.6" rx="1.7" ry="3.4" transform="rotate(${r*30} 12 12)"/>`).join("")}</g>
    <circle cx="12" cy="12" r="4.4" fill="#6b4a2a"/>
    <g fill="#3f2a18"><circle cx="11" cy="11" r=".6"/><circle cx="13" cy="11.6" r=".6"/><circle cx="11.6" cy="13.2" r=".6"/><circle cx="13.4" cy="13.6" r=".5"/></g>`,flower:`
    <path d="M12 22.4V14" stroke="${G}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12 18.4c-1.6-2.4-4-3-5.6-2.4 1.2 2 3.4 2.8 5.6 2.4z" fill="${G}"/>
    <g fill="currentColor">${Array.from({length:5},(d,r)=>`<circle cx="12" cy="5.6" r="3.2" transform="rotate(${r*72} 12 10)"/>`).join("")}</g>
    <circle cx="12" cy="10" r="2.3" fill="#f4c430" stroke="#c9952a" stroke-width=".5"/>`,lavender:`
    <path d="M12 22.4C12 16 11 10 9 5M12 22.4c0-6 .4-12 .4-18.4M12 22.4c0-6 1.4-11 3.6-16" stroke="#7a9a6a" stroke-width="1" fill="none" stroke-linecap="round"/>
    <g fill="currentColor">${[[9,5],[9.6,7.4],[10.2,9.8],[12.4,3.4],[12.4,6],[12.4,8.6],[15.6,6],[15,8.4],[14.4,10.8]].map(([d,r])=>`<ellipse cx="${d}" cy="${r}" rx="1.1" ry="1.5"/>`).join("")}</g>`,herb:`
    <path d="M12 22.4V3.4" stroke="${W}" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="currentColor">${[[4.6,-35],[8.6,35],[12.6,-35],[16.6,35]].map(([d,r])=>`<ellipse cx="${r<0?8.4:15.6}" cy="${d+1}" rx="3.6" ry="1.8" transform="rotate(${r} ${r<0?8.4:15.6} ${d+1})"/>`).join("")}
      <ellipse cx="12" cy="3.2" rx="1.6" ry="2.4"/></g>`,umbel:`
    <path d="M12 22.4V12.4M12 12.4L6 6.4M12 12.4L9 4.6M12 12.4l3-7.8M12 12.4l6-6" stroke="#5f9a3a" stroke-width="1" stroke-linecap="round"/>
    <g fill="currentColor">${[[6,6.4],[9,4.6],[15,4.6],[18,6.4],[12,4]].map(([d,r])=>`<circle cx="${d}" cy="${r}" r="1.9"/>`).join("")}</g>`,clover:`
    <path d="M12 22.4v-9" stroke="${W}" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="currentColor" stroke="${W}" stroke-width=".6">${[0,120,240].map(d=>`<path d="M12 12c-1.6-1.6-4.6-1.4-4.6-4.2 0-1.6 1.4-2.6 2.6-2.2.4-1.4 2-2 2-2s1.6.6 2 2c1.2-.4 2.6.6 2.6 2.2 0 2.8-3 2.6-4.6 4.2z" transform="rotate(${d} 12 12)"/>`).join("")}</g>`,grain:`
    <path d="M12 22.4V4" stroke="#a88a4a" stroke-width="1.1" stroke-linecap="round"/>
    <g fill="currentColor">${[5,8,11,14].map(d=>`<ellipse cx="10" cy="${d}" rx="1.4" ry="2.3" transform="rotate(-25 10 ${d})"/><ellipse cx="14" cy="${d}" rx="1.4" ry="2.3" transform="rotate(25 14 ${d})"/>`).join("")}
      <ellipse cx="12" cy="2.8" rx="1.2" ry="2"/></g>`};function ke(d){return d?.icon&&dt[d.icon]?d.icon:d?.category==="herb"?"herb":d?.category==="flower"?"flower":d?.category==="fruit"?"berry_bush":d?.habit==="root"?"root":d?.habit==="bulb"?"onion":"leafy"}function Ts(){let d=Object.entries(dt).map(([r,e])=>`<symbol id="pg-${r}" viewBox="0 0 24 24" overflow="visible">${e}</symbol>`).join("");return M`${It(d)}`}function ct(d,r,e,t,s){return M`<use href=${`#pg-${d}`} x=${r-t/2} y=${e-t/2} width=${t} height=${t} style=${`color:${s}`}></use>`}function ht(d,r,e=28){return l`<svg class="plant-glyph" viewBox="0 0 24 24" width=${e} height=${e} style=${`color:${r}`} aria-hidden="true"
    >${It(dt[d]??dt.leafy)}</svg
  >`}var O=(d,r)=>r>0?Math.round(d/r)*r:d,xe=d=>({x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm}),Me=d=>({x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm}),zs=(d,r)=>({x:r.x_cm+d.x_cm,y:r.y_cm+d.y_cm,w:d.width_cm,h:d.length_cm}),ui=(d,r,e)=>r>=d.x&&r<=d.x+d.w&&e>=d.y&&e<=d.y+d.h;function ie(d,r){let e=Math.min(d.w,r.w),t=Math.min(d.h,r.h);return{x:Math.min(Math.max(d.x,r.x),r.x+r.w-e),y:Math.min(Math.max(d.y,r.y),r.y+r.h-t),w:e,h:t}}function gi(d,r){return d.x<r.x+r.w&&r.x<d.x+d.w&&d.y<r.y+r.h&&r.y<d.y+d.h}function Ps(d,r,e){for(let t=d.length-1;t>=0;t--)if(ui(xe(d[t]),r,e))return d[t]}function Ue(d,r,e){let t=Math.max(d.spacing_cm,5);if(r==="single")return{w:t,h:t};if(r==="row"){let n=e.width_cm>=e.length_cm,i=Math.max(Math.min(d.row_spacing_cm,40),10);return n?{w:e.width_cm,h:i}:{w:i,h:e.length_cm}}let s=Math.min(Math.max(t*2,30),Math.min(e.width_cm,e.length_cm));return{w:s,h:s}}function Bt(d,r){let e={x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm};if(d.layout==="single")return[[e.x+e.w/2,e.y+e.h/2]];let t=Math.max(r.spacing_cm,1);if(d.layout==="row"){let a=e.w>=e.h,o=a?e.w:e.h,c=a?e.h:e.w,h=Math.max(1,Math.floor(o/t)),u=Math.max(1,Math.floor(c/Math.max(r.row_spacing_cm,1))),f=[];for(let b=0;b<u;b++)for(let k=0;k<h;k++){let y=o/h*(k+.5),w=c/u*(b+.5);f.push(a?[e.x+y,e.y+w]:[e.x+w,e.y+y])}return f}let s=Math.max(1,Math.floor(e.w/t)),n=Math.max(1,Math.floor(e.h/t)),i=[];for(let a=0;a<n;a++)for(let o=0;o<s;o++)i.push([e.x+e.w/s*(o+.5),e.y+e.h/n*(a+.5)]);return i}function Rs(d,r){return d.count&&d.count>0?d.count:Bt(d,r).length}function ue(d,r,e,t){let s=Math.max(t,5);for(let n=0;n+r.h<=d.length_cm+.01;n+=s)for(let i=0;i+r.w<=d.width_cm+.01;i+=s){let a={x:i,y:n,w:r.w,h:r.h};if(!e.some(o=>gi(a,o)))return{x:i,y:n}}return null}function pt(d,r,e=[]){let t=[...d.map(Me),...r.map(xe),...e];if(!t.length)return{x:0,y:0,w:600,h:400};let s=Math.min(...t.map(o=>o.x)),n=Math.min(...t.map(o=>o.y)),i=Math.max(...t.map(o=>o.x+o.w)),a=Math.max(...t.map(o=>o.y+o.h));return{x:s,y:n,w:i-s,h:a-n}}function Ot(d,r){if(d.length<2)return d.map(a=>({...a}));let e=d.map(a=>({...a})),t=Math.min(...d.map(a=>a.x)),s=Math.max(...d.map(a=>a.x+a.w)),n=Math.min(...d.map(a=>a.y)),i=Math.max(...d.map(a=>a.y+a.h));switch(r){case"left":e.forEach(a=>a.x=t);break;case"right":e.forEach(a=>a.x=s-a.w);break;case"top":e.forEach(a=>a.y=n);break;case"bottom":e.forEach(a=>a.y=i-a.h);break;case"hcenter":e.forEach(a=>a.x=(t+s)/2-a.w/2);break;case"vcenter":e.forEach(a=>a.y=(n+i)/2-a.h/2);break;case"hdistribute":{let a=e.map((h,u)=>[h,u]).sort((h,u)=>h[0].x-u[0].x),o=(s-t-a.reduce((h,[u])=>h+u.w,0))/(a.length-1),c=t;for(let[h]of a)h.x=c,c+=h.w+o;break}case"vdistribute":{let a=e.map((h,u)=>[h,u]).sort((h,u)=>h[0].y-u[0].y),o=(i-n-a.reduce((h,[u])=>h+u.h,0))/(a.length-1),c=n;for(let[h]of a)h.y=c,c+=h.h+o;break}}return e.map(a=>({...a,x:Math.round(a.x),y:Math.round(a.y)}))}var Se={path:{fill:"#e3d6bd",stroke:"#b3a283",icon:"\u{1F6B6}",pattern:"gravel",opacity:.95},terrace:{fill:"#cfc6b8",stroke:"#8f8577",icon:"\u2615",pattern:"tiles",opacity:.95},lawn:{fill:"#9cc46a",stroke:"#6f9a45",icon:"\u{1F331}",pattern:"grass",opacity:.7},flowerbed:{fill:"#d7e8b8",stroke:"#8fae6a",icon:"\u{1F338}",pattern:"flowers",opacity:.85},compost:{fill:"#8a6a45",stroke:"#5c442a",icon:"\u267B",opacity:.7},water_butt:{fill:"#4c8fbf",stroke:"#2d6a96",icon:"\u{1F4A7}",opacity:.7},pond:{fill:"#7fb6d9",stroke:"#3f7fa8",icon:"\u{1F438}",pattern:"water",opacity:.85},shed:{fill:"#9aa3a0",stroke:"#6b7370",icon:"\u{1F3E0}",pattern:"roof",opacity:.85},tree:{fill:"#4e7d3a",stroke:"#2f5222",icon:"\u{1F333}",opacity:.5},hedge:{fill:"#5f8f45",stroke:"#3d6b2a",icon:"\u{1F33F}",pattern:"hedge",opacity:.8},fence:{fill:"#8a6a45",stroke:"#5c442a",icon:"\u{1FAB5}",opacity:.9},trellis:{fill:"#7a5c3e",stroke:"#5a3f25",icon:"\u256B",opacity:.6},house:{fill:"#c9b8a8",stroke:"#7d6a5a",icon:"\u{1F3E0}",pattern:"house",opacity:.95},driveway:{fill:"#d2ccc2",stroke:"#9a9285",icon:"\u{1F697}",pattern:"pavers",opacity:.95},parking:{fill:"#d2ccc2",stroke:"#9a9285",icon:"\u{1F17F}\uFE0F",pattern:"pavers",opacity:.95},street:{fill:"#8f9294",stroke:"#5f6264",icon:"\u{1F6E3}\uFE0F",pattern:"asphalt",opacity:.95},play:{fill:"#efe0a0",stroke:"#c2a84a",icon:"\u{1F6DD}",opacity:.7},beehive:{fill:"#f2c230",stroke:"#b5841a",icon:"\u{1F41D}",opacity:.85},other:{fill:"#b4b4b4",stroke:"#888",icon:"\u2022",opacity:.55}},Y={outdoor:{fill:"var(--hl-zone-outdoor)",stroke:"var(--hl-leaf-300)",dash:"8 4",icon:"\u{1F955}"},greenhouse:{fill:"var(--hl-zone-greenhouse)",stroke:"var(--hl-frost-500)",dash:"none",icon:"\u{1F3E1}"},cold_frame:{fill:"var(--hl-zone-greenhouse)",stroke:"var(--hl-frost-500)",dash:"3 3",icon:"\u{1FA9F}"},orchard:{fill:"rgba(120, 170, 80, 0.16)",stroke:"#6f9a45",dash:"10 4",icon:"\u{1F34E}"},fruit:{fill:"rgba(200, 60, 90, 0.08)",stroke:"#c8506a",dash:"10 4",icon:"\u{1FAD0}"},herbs:{fill:"rgba(80, 110, 176, 0.09)",stroke:"#6a84c0",dash:"10 4",icon:"\u{1F33F}"},flowers:{fill:"rgba(224, 106, 160, 0.09)",stroke:"#d27aa8",dash:"10 4",icon:"\u{1F338}"}},Cs={friend:{color:"var(--hl-leaf-500)",dash:"none",width:2},pest_synergy:{color:"var(--hl-leaf-600)",dash:"2 3",width:2},enemy:{color:"var(--hl-tomato-500)",dash:"6 4",width:2.5},allelopathy:{color:"#8e5ba8",dash:"6 4",width:2.5},competition:{color:"var(--hl-sun-500)",dash:"3 3",width:2},shading:{color:"#6b7370",dash:"1 4",width:2.5},overlap:{color:"var(--hl-sun-500)",dash:"6 4",width:2.5}};var As={dry:"#c8432f",slightly_dry:"#e8a33d",optimal:"#4c8c3f",wet:"#3a7ca5",unknown:"transparent"},S=class extends T{constructor(){super(...arguments);this.zones=[];this.beds=[];this.plantings=[];this.features=[];this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.plants=new Map;this.families={};this.selection=null;this.ghost=null;this.reports={};this.timelines={};this.analysis=null;this.lang="en";this.snapStep=10;this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.readonly=!1;this.focusZone="";this.drawTool=null;this.drawRect=null;this.k=1;this.tx=20;this.ty=20;this.preview=null;this.drag=null;this.pendingSelect=null;this.fitted=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.fitted||this.fit()}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}updated(e){!this.fitted&&(e.has("zones")||e.has("beds"))&&(this.zones.length||this.beds.length)&&this.fit()}fit(){let e=this.getBoundingClientRect();if(!e.width||!e.height)return;let t=pt(this.zones,this.beds,this.features.map(n=>({x:n.x_cm,y:n.y_cm,w:n.width_cm,h:n.length_cm}))),s=32;this.k=Math.max(.2,Math.min((e.width-s*2)/t.w,(e.height-s*2)/t.h,6)),this.tx=s-t.x*this.k+(e.width-s*2-t.w*this.k)/2,this.ty=s-t.y*this.k+(e.height-s*2-t.h*this.k)/2,this.fitted=!0}fitRect(e,t=40){let s=this.getBoundingClientRect();!s.width||!s.height||!e.w||!e.h||(this.k=Math.max(.2,Math.min((s.width-t*2)/e.w,(s.height-t*2)/e.h,8)),this.tx=t-e.x*this.k+(s.width-t*2-e.w*this.k)/2,this.ty=t-e.y*this.k+(s.height-t*2-e.h*this.k)/2,this.fitted=!0)}zoom(e,t,s){let n=this.getBoundingClientRect(),i=t??n.width/2,a=s??n.height/2,o=Math.max(.15,Math.min(this.k*e,12));this.tx=i-(i-this.tx)*o/this.k,this.ty=a-(a-this.ty)*o/this.k,this.k=o}clientToCanvas(e,t){let s=this.getBoundingClientRect();return e<s.left||e>s.right||t<s.top||t>s.bottom?null:{x:(e-s.left-this.tx)/this.k,y:(t-s.top-this.ty)/this.k}}focusCanvas(){this.svgEl?.focus()}rectOf(e,t){if(e==="feature"){let i=this.features.find(a=>a.id===t);return i?{x:i.x_cm,y:i.y_cm,w:i.width_cm,h:i.length_cm}:null}if(e==="zone"){let i=this.zones.find(a=>a.id===t);return i?Me(i):null}if(e==="bed"){let i=this.beds.find(a=>a.id===t);return i?xe(i):null}let s=this.plantings.find(i=>i.id===t),n=s&&this.beds.find(i=>i.id===s.bed_id);return s&&n?zs(s,n):null}onPointerDown(e,t,s,n=!1){if(e.button!==0&&e.pointerType==="mouse")return;e.stopPropagation();let i=this.clientToCanvas(e.clientX,e.clientY);if(i){if(this.svgEl.setPointerCapture(e.pointerId),this.drawTool&&!n){let a=this.snapOn?this.snapStep:1,o=O(i.x,a),c=O(i.y,a);this.drag={mode:"draw",pointerId:e.pointerId,startX:o,startY:c,origin:{x:o,y:c,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1},this.drawRect={x:o,y:c,w:0,h:0};return}if(t&&s){let a=e.shiftKey||e.ctrlKey||e.metaKey;if(this.multi.some(h=>h.kind===t&&h.id===s)&&!a&&!n?this.pendingSelect={kind:t,id:s}:this.dispatchEvent(new CustomEvent("select",{detail:{kind:t,id:s,additive:a}})),a)return;let c=this.rectOf(t,s);if(!c||this.readonly){this.drag={mode:"pan",pointerId:e.pointerId,startX:i.x,startY:i.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1};return}this.drag={mode:n?"resize":"move",kind:t,id:s,pointerId:e.pointerId,startX:i.x,startY:i.y,origin:c,startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1}}else this.dispatchEvent(new CustomEvent("select",{detail:null})),this.drag={mode:"pan",pointerId:e.pointerId,startX:i.x,startY:i.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1}}}onPointerMove(e){let t=this.drag;if(!t||t.pointerId!==e.pointerId)return;if(Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)>3&&(t.moved=!0),t.mode==="pan"){this.tx=t.startTx+(e.clientX-t.clientX),this.ty=t.startTy+(e.clientY-t.clientY);return}let s=this.clientToCanvas(e.clientX,e.clientY);if(t.mode==="draw"){if(!s)return;let c=this.snapOn?this.snapStep:1,h=O(s.x,c),u=O(s.y,c);this.drawRect={x:Math.min(t.startX,h),y:Math.min(t.startY,u),w:Math.abs(h-t.startX),h:Math.abs(u-t.startY)};return}if(!s||!t.kind||!t.id)return;let n=s.x-t.startX,i=s.y-t.startY,a=this.snapOn?this.snapStep:1,o;if(t.mode==="move")if(o={...t.origin,x:t.origin.x+n,y:t.origin.y+i},t.kind==="planting"){let c=this.beds.find(h=>h.id===this.plantings.find(u=>u.id===t.id)?.bed_id);c&&(o.x=c.x_cm+O(o.x-c.x_cm,a),o.y=c.y_cm+O(o.y-c.y_cm,a))}else o.x=O(o.x,a),o.y=O(o.y,a);else if(o={...t.origin,w:Math.max(a,O(t.origin.w+n,a)),h:Math.max(a,O(t.origin.h+i,a))},t.kind==="planting"){let c=this.beds.find(h=>h.id===this.plantings.find(u=>u.id===t.id)?.bed_id);c&&(o=ie(o,xe(c)))}this.preview={kind:t.kind,id:t.id,rect:o}}onPointerUp(e){let t=this.drag;if(!t||t.pointerId!==e.pointerId)return;if(this.drag=null,this.svgEl.hasPointerCapture(e.pointerId)&&this.svgEl.releasePointerCapture(e.pointerId),t.mode==="draw"){let o=this.drawRect??t.origin;this.drawRect=null;let c=t.moved&&o.w>0&&o.h>0?o:{x:t.startX,y:t.startY,w:0,h:0};this.dispatchEvent(new CustomEvent("draw-rect",{detail:c}));return}let s=this.preview;this.preview=null;let n=this.pendingSelect;if(this.pendingSelect=null,n&&!t.moved&&this.dispatchEvent(new CustomEvent("select",{detail:n})),!s||!t.moved||t.mode==="pan")return;let i;if(s.kind==="planting"){let o=s.rect.x+s.rect.w/2,c=s.rect.y+s.rect.h/2;i=[...this.beds].reverse().find(u=>o>=u.x_cm&&o<=u.x_cm+u.width_cm&&c>=u.y_cm&&c<=u.y_cm+u.length_cm)?.id}let a=t.mode==="move"&&this.multi.length>1&&this.multi.some(o=>o.kind===s.kind&&o.id===s.id);this.dispatchEvent(new CustomEvent("item-change",{detail:{kind:s.kind,id:s.id,rect:s.rect,targetBedId:i,dx:s.rect.x-t.origin.x,dy:s.rect.y-t.origin.y,group:a}}))}onWheel(e){e.preventDefault();let t=this.getBoundingClientRect();this.zoom(e.deltaY<0?1.12:1/1.12,e.clientX-t.left,e.clientY-t.top)}effectiveRect(e,t,s){if(this.preview&&this.preview.kind===e&&this.preview.id===t)return this.preview.rect;let n=this.preview;if(n&&n.kind===e&&this.drag?.mode==="move"&&this.multi.length>1&&this.multi.some(i=>i.kind===e&&i.id===t)&&this.multi.some(i=>i.kind===n.kind&&i.id===n.id)){let i=this.drag.origin;return{...s,x:s.x+(n.rect.x-i.x),y:s.y+(n.rect.y-i.y)}}return s}renderFeature(e){let t=this.effectiveRect("feature",e.id,{x:e.x_cm,y:e.y_cm,w:e.width_cm,h:e.length_cm}),s=Se[e.type]??Se.other,n=11/this.k,i=t.x+t.w/2,a=t.y+t.h/2,o=e.type==="tree"||e.type==="water_butt"||e.type==="pond",c;if(e.type==="tree"){let u=Math.min(t.w,t.h);c=M`<ellipse cx=${i} cy=${a} rx=${t.w/2} ry=${t.h/2} fill="#2f5222" fill-opacity="0.12" stroke=${s.stroke} stroke-width="1.2"
          stroke-dasharray="4 3" vector-effect="non-scaling-stroke"></ellipse>
        ${ct("tree",i,a,u*.95,"#4e7d3a")}`}else if(e.type==="fence"){let u=t.w>=t.h,f=u?t.w:t.h,b=Math.max(1,Math.round(f/100)),k=Array.from({length:b+1},(y,w)=>f/b*w);c=M`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} fill="transparent"></rect>
        <line x1=${u?t.x:i} y1=${u?a:t.y} x2=${u?t.x+t.w:i} y2=${u?a:t.y+t.h}
          stroke=${s.stroke} stroke-width="3" vector-effect="non-scaling-stroke" stroke-linecap="round"></line>
        ${k.map(y=>M`<rect x=${(u?t.x+y:i)-4} y=${(u?a:t.y+y)-4} width="8" height="8" fill=${s.fill} stroke=${s.stroke}
          stroke-width="1" vector-effect="non-scaling-stroke"></rect>`)}`}else o?c=M`<ellipse cx=${i} cy=${a} rx=${t.w/2} ry=${t.h/2} fill=${s.pattern?`url(#feat-${s.pattern})`:s.fill}
        fill-opacity=${s.opacity??.6} stroke=${s.stroke} stroke-width="1.5" vector-effect="non-scaling-stroke"></ellipse>`:c=M`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${e.type==="path"?2/this.k:4/this.k}
        fill=${s.pattern?`url(#feat-${s.pattern})`:s.fill} fill-opacity=${s.opacity??.6} stroke=${s.stroke} stroke-width="1.2"
        vector-effect="non-scaling-stroke" stroke-dasharray=${e.type==="trellis"?"6 3":"none"}></rect>`;let h=e.type!=="fence"&&t.w*this.k>44&&t.h*this.k>16;return M`<g role="button" aria-label=${`${e.name} (${this.t(`feature.${e.type}`)})`} @pointerdown=${u=>this.onPointerDown(u,"feature",e.id)} style="cursor:move">
      <title>${e.name} · ${this.t(`feature.${e.type}`)}</title>
      ${c}
      ${h?this.renderPill(i,e.type==="tree"?t.y+t.h-n:a,`${s.icon} ${e.name}`.trim(),n):m}
    </g>`}zoneDelta(e){if(this.preview?.kind!=="zone"||this.preview.id!==e||this.drag?.mode!=="move")return{dx:0,dy:0};let t=this.zones.find(s=>s.id===e);return t?{dx:this.preview.rect.x-t.x_cm,dy:this.preview.rect.y-t.y_cm}:{dx:0,dy:0}}bedAbs(e){let{dx:t,dy:s}=this.zoneDelta(e.zone_id),n={...xe(e),x:e.x_cm+t,y:e.y_cm+s};return this.effectiveRect("bed",e.id,n)}renderGrid(){let e=Math.max(this.snapStep,5);return M`
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
        ${Ts()}
      </defs>
      <rect x="-5000" y="-5000" width="10000" height="10000" fill=${e*this.k>=5?"url(#major)":"url(#major-only)"}></rect>
    `}renderZone(e){let t=this.effectiveRect("zone",e.id,Me(e)),s=e.type==="greenhouse"||e.type==="cold_frame",n=Y[e.type]??Y.outdoor,i=12/this.k,a=this.t(`settings.zone_type.${e.type}`),o=e.name.toLowerCase()===a.toLowerCase()?`${n.icon} ${e.name}`:`${n.icon} ${e.name} \xB7 ${a}`,c=this.focusZone===e.id;return M`
      <g role="button" aria-label=${o} @pointerdown=${h=>this.onPointerDown(h,"zone",e.id)}
        @dblclick=${()=>this.dispatchEvent(new CustomEvent("zone-open",{detail:e.id}))}>
        <rect class="zone-rect" x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${8/this.k}
          fill=${n.fill} stroke=${n.stroke} stroke-dasharray=${n.dash} stroke-width=${c?2.5:1.5}></rect>
        ${s?M`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} fill="url(#glass)" pointer-events="none"></rect>`:m}
        <text class="label zone-label" x=${t.x+2/this.k} y=${t.y-i*.5} font-size=${i} font-weight="700">${o}</text>
      </g>`}renderBed(e){let t=this.bedAbs(e),s=12/this.k,n=this.analysis?.beds[e.id],i=n?.moisture_status??"unknown",a=this.showMoisture&&i!=="unknown"?As[i]:"rgba(46,33,24,0.45)",o=this.zones.find(w=>w.id===e.zone_id)?.type??"outdoor",c=o==="orchard"||o==="fruit",h=o==="orchard"?"url(#feat-grass)":o==="fruit"?"url(#bark-mulch)":e.kind==="container"?"var(--hl-container-fill)":e.kind==="raised"?"var(--hl-bed-fill-raised)":"var(--hl-bed-fill)",u=e.kind==="container"?Math.min(t.w,t.h)/4:4/this.k,f=n?.irrigation.moisture,b=n?.sensors?.soil_temperature?.value,k=this.reports[e.id]??n?.compatibility,y=(k?.pairs.filter(w=>w.severity!=="info").length??0)+(k?.rotation?.length??0);return M`
      <g role="button" aria-label=${`${e.name}, ${this.t(`kind.${e.kind}`)}, ${Math.round(e.width_cm)} \xD7 ${Math.round(e.length_cm)} cm`}
        @pointerdown=${w=>this.onPointerDown(w,"bed",e.id)}>
        <rect class="bed-rect" x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${u} fill=${h}
          stroke=${a} stroke-width=${this.showMoisture&&i!=="unknown"?3:1.5}></rect>
        ${c?m:M`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${u} fill="url(#soil)" pointer-events="none"></rect>`}
        ${this.showMoisture&&i!=="unknown"?M`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${u} fill=${As[i]} opacity="0.12" pointer-events="none"></rect>`:m}
        ${c||t.w*this.k<50?m:M`<text class="label on-soil" x=${t.x+6/this.k} y=${t.y+t.h-6/this.k} font-size=${s} font-weight="600">${e.name}</text>`}
        ${this.showMoisture&&f!=null?M`<text class="label on-soil" x=${t.x+t.w-6/this.k} y=${t.y+t.h-6/this.k} font-size=${s*.95} text-anchor="end">💧 ${Math.round(f)}%</text>`:m}
        ${this.showTemperature&&b!=null?M`<text class="label on-soil" x=${t.x+t.w-6/this.k} y=${t.y+s*1.3} font-size=${s*.95} text-anchor="end">🌡 ${b.toFixed(1)} °C</text>`:m}
        ${y?this.renderBadge(t.x+t.w,t.y,String(y),"var(--hl-tomato-500)"):m}
      </g>`}renderBadge(e,t,s,n,i=9){let a=i/this.k;return M`<g pointer-events="none"><circle cx=${e} cy=${t} r=${a} fill=${n} stroke="#fff" stroke-width=${1.5/this.k}></circle>
      <text class="badge-text" x=${e} y=${t+a*.38} font-size=${a*1.1} text-anchor="middle">${s}</text></g>`}renderPill(e,t,s,n){let i=s.length*n*.56+n*1.1,a=n*1.55;return M`<g pointer-events="none">
      <rect x=${e-i/2} y=${t-a/2} width=${i} height=${a} rx=${a/2} fill="var(--hl-pill-bg, rgba(255,255,255,0.9))"
        stroke="rgba(0,0,0,0.12)" stroke-width="1" vector-effect="non-scaling-stroke"></rect>
      <text class="pill-text" x=${e} y=${t+n*.36} font-size=${n} text-anchor="middle">${s}</text></g>`}renderPlanting(e){let t=this.beds.find(H=>H.id===e.bed_id),s=this.plants.get(e.plant_id);if(!t||!s)return m;let n=this.bedAbs(t),i={x:n.x+e.x_cm,y:n.y+e.y_cm,w:e.width_cm,h:e.length_cm},a=this.effectiveRect("planting",e.id,i),o=B(this.families,s.family),c=s.color||o,h=ke(s),u=_(s,this.lang),f=!this.viewDate||$s(e,this.timelines[e.id],this.viewDate),b={...e,x_cm:a.x-n.x,y_cm:a.y-n.y,width_cm:a.w,length_cm:a.h},k=Bt(b,s),y=this.reports[t.id]??this.analysis?.beds[t.id]?.compatibility,w=y?.pairs.filter(H=>(H.a===e.id||H.b===e.id)&&H.severity!=="info")??[],E=y?.out_of_bounds?.includes(e.id),P=this.k,V=Math.min(s.spacing_cm,a.w,a.h)*P,K=V<18||k.length>90,U=`${u} \u2013 ${this.t(`planner.layout.${e.layout}`)}, ${this.t("planner.count",{n:k.length})}`+(w.length?` \u2013 ${w.length} \u26A0`:"")+(s.perennial?` \u2013 ${this.t("planner.perennial")}`:""),oe=11/P,gt;if(K){let H=a.w>=a.h,ge=H?a.h:a.w,Ee=H?a.w:a.h,qt=Math.max(e.layout==="row"?s.row_spacing_cm:Math.max(s.row_spacing_cm/2,s.spacing_cm),4),Wt=Math.max(1,Math.floor(ge/qt)),qe=Math.min(s.spacing_cm/2,Ee/4),Zt=Math.max(Math.min(s.spacing_cm*.9,qt*.45),2),Kt=s.category==="flower"?c:"#5f9a3a",Fs=Array.from({length:Wt},(Te,Us)=>ge/Wt*(Us+.5)),Yt=`${Math.max(s.spacing_cm*.6,1.5)} ${Math.max(s.spacing_cm*.4,1)}`,Xt=Math.max(Math.min(Math.min(a.w,a.h)*.72,46/P),16/P),Jt=a.x+a.w/2,Qt=a.y+a.h/2;gt=M`
        ${Fs.map(Te=>H?M`<line x1=${a.x+qe} y1=${a.y+Te} x2=${a.x+a.w-qe} y2=${a.y+Te} stroke=${Kt} stroke-width=${Zt}
              stroke-linecap="round" stroke-dasharray=${Yt} opacity="0.75"></line>`:M`<line x1=${a.x+Te} y1=${a.y+qe} x2=${a.x+Te} y2=${a.y+a.h-qe} stroke=${Kt} stroke-width=${Zt}
              stroke-linecap="round" stroke-dasharray=${Yt} opacity="0.75"></line>`)}
        <circle cx=${Jt} cy=${Qt} r=${Xt*.62} fill="var(--hl-pill-bg, rgba(255,255,255,0.92))" stroke=${o} stroke-width="2"
          vector-effect="non-scaling-stroke"></circle>
        ${ct(h,Jt,Qt,Xt*.92,c)}`}else{let H=Math.max(Math.min(s.spacing_cm*.92,Math.min(a.w,a.h)*1.05),6/P);gt=M`
        ${k.slice(0,300).map(([ge,Ee])=>M`<ellipse cx=${n.x+ge} cy=${n.y+Ee+H*.42} rx=${H*.36} ry=${H*.09}
          fill="rgba(0,0,0,0.18)"></ellipse>`)}
        ${k.slice(0,300).map(([ge,Ee])=>ct(h,n.x+ge,n.y+Ee,H,c))}`}let Ut=(u.length*.56+1.1)*oe,Gt=a.w*P>=Math.min(u.length*7+16,140)&&a.h*P>=(K?64:34),Os=K&&!Gt&&a.w>=a.h&&a.w*P>=Ut*P+70&&a.h*P>=16,Ds=K?a.y+a.h-Math.max(oe*1.1,Math.min(a.h*.12,14/P)):a.y+a.h-oe*.95,Ns=Math.max(Math.min(Math.min(a.w,a.h)*.72,46/P),16/P)*.62;return M`
      <g class="planting ${f?"":"faded"}" role="button" aria-label=${U}
        @pointerdown=${H=>this.onPointerDown(H,"planting",e.id)}>
        <title>${U}</title>
        <rect class="planting-rect" x=${a.x} y=${a.y} width=${a.w} height=${a.h} rx=${4/P}
          fill=${c} fill-opacity="0.13" stroke=${o} stroke-width="1.6" stroke-dasharray=${f?"none":"4 3"}></rect>
        ${gt}
        ${Os?this.renderPill(a.x+a.w/2+Ns+6/P+Ut/2,a.y+a.h/2,u,oe):Gt?this.renderPill(a.x+a.w/2,Ds,u,oe):!K&&V<10&&a.w*P>22&&a.h*P>22?M`<text class="mono" x=${a.x+a.w/2} y=${a.y+a.h/2+oe*.35} font-size=${oe} text-anchor="middle">${ys(u)}</text>`:m}
        ${s.perennial&&a.w*P>=36&&a.h*P>=36?this.renderBadge(a.x+a.w-9/P,a.y+a.h-9/P,"\u221E","var(--hl-leaf-700)",7):m}
        ${e.succession_group?this.renderBadge(a.x,a.y,String(e.succession_index+1),"var(--hl-soil-700)"):m}
        ${w.length||E?this.renderBadge(a.x+a.w,a.y,"!",w.some(H=>H.severity==="error")?"var(--hl-tomato-500)":"var(--hl-sun-500)"):m}
      </g>`}renderLinks(){if(!this.showCompanions)return[];let e=[],t=n=>{let i=this.plantings.find(h=>h.id===n),a=i&&this.beds.find(h=>h.id===i.bed_id);if(!i||!a)return null;let o=this.bedAbs(a),c=this.effectiveRect("planting",i.id,{x:o.x+i.x_cm,y:o.y+i.y_cm,w:i.width_cm,h:i.length_cm});return[c.x+c.w/2,c.y+c.h/2]},s=new Set(this.plantings.map(n=>n.id));for(let n of this.beds){let i=this.reports[n.id]??this.analysis?.beds[n.id]?.compatibility;for(let a of i?.pairs??[]){if(a.kind==="same_family"||!s.has(a.a)||!s.has(a.b))continue;let o=t(a.a),c=t(a.b);if(!o||!c)continue;let h=Cs[a.kind]??Cs.overlap;e.push(M`<line class="link" x1=${o[0]} y1=${o[1]} x2=${c[0]} y2=${c[1]} stroke=${h.color}
          stroke-width=${h.width} stroke-dasharray=${h.dash} stroke-linecap="round" opacity="0.9"><title>${this.t(a.key,a.params)}</title></line>`)}}return e}selectionRect(e){if(e.kind==="feature"){let i=this.features.find(a=>a.id===e.id);return i?this.effectiveRect("feature",i.id,{x:i.x_cm,y:i.y_cm,w:i.width_cm,h:i.length_cm}):null}if(e.kind==="bed"){let i=this.beds.find(a=>a.id===e.id);return i?this.bedAbs(i):null}if(e.kind==="zone"){let i=this.zones.find(a=>a.id===e.id);return i?this.effectiveRect("zone",i.id,Me(i)):null}let t=this.plantings.find(i=>i.id===e.id),s=t&&this.beds.find(i=>i.id===t.bed_id);if(!t||!s)return null;let n=this.bedAbs(s);return this.effectiveRect("planting",t.id,{x:n.x+t.x_cm,y:n.y+t.y_cm,w:t.width_cm,h:t.length_cm})}renderMulti(){if(this.multi.length<2)return[];let e=3/this.k;return this.multi.filter(t=>!(this.selection&&t.kind===this.selection.kind&&t.id===this.selection.id)).map(t=>this.selectionRect(t)).filter(t=>!!t).map(t=>M`<rect class="selected-outline" x=${t.x-e} y=${t.y-e} width=${t.w+e*2} height=${t.h+e*2} opacity="0.7"></rect>`)}renderSelection(){let e=this.selection;if(!e)return m;let t=null;if(e.kind==="feature")t=this.selectionRect(e);else if(e.kind==="bed"){let i=this.beds.find(a=>a.id===e.id);t=i?this.bedAbs(i):null}else if(e.kind==="zone"){let i=this.zones.find(a=>a.id===e.id);t=i?this.effectiveRect("zone",i.id,Me(i)):null}else{let i=this.plantings.find(o=>o.id===e.id),a=i&&this.beds.find(o=>o.id===i.bed_id);if(i&&a){let o=this.bedAbs(a);t=this.effectiveRect("planting",i.id,{x:o.x+i.x_cm,y:o.y+i.y_cm,w:i.width_cm,h:i.length_cm})}}if(!t)return m;let s=10/this.k,n=3/this.k;return M`
      <rect class="selected-outline" x=${t.x-n} y=${t.y-n} width=${t.w+n*2} height=${t.h+n*2}></rect>
      ${this.readonly?m:M`<rect class="handle" x=${t.x+t.w-s/2} y=${t.y+t.h-s/2} width=${s} height=${s} rx=${2/this.k}
        @pointerdown=${i=>this.onPointerDown(i,e.kind,e.id,!0)}></rect>`}`}renderGhost(){let e=this.ghost;if(!e)return m;let t=12/this.k;return M`<g pointer-events="none">
      <rect x=${e.rect.x} y=${e.rect.y} width=${e.rect.w} height=${e.rect.h} rx=${3/this.k}
        fill=${e.color} fill-opacity=${e.valid?.35:.12} stroke=${e.valid?e.color:"var(--hl-tomato-500)"}
        stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      <text class="label" x=${e.rect.x} y=${e.rect.y-t*.5} font-size=${t} font-weight="600">${e.label}</text></g>`}renderDrawRect(){let e=this.drawRect,t=this.drawTool;if(!e||!t||!e.w&&!e.h)return m;let s=12/this.k,n=i=>(i/100).toLocaleString(this.lang==="nl"?"nl-BE":"en-GB",{maximumFractionDigits:1});return M`<g pointer-events="none">
      <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${4/this.k} fill=${t.color} fill-opacity="0.22"
        stroke=${t.color} stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      ${this.renderPill(e.x+e.w/2,e.y+e.h/2,`${t.label} \xB7 ${n(e.w)} \xD7 ${n(e.h)} m`,s)}
    </g>`}outside(e){if(!this.focusZone)return!1;let t=this.zones.find(i=>i.id===this.focusZone);if(!t)return!1;let s=e.x+e.w/2,n=e.y+e.h/2;return!(s>=t.x_cm&&s<=t.x_cm+t.width_cm&&n>=t.y_cm&&n<=t.y_cm+t.length_cm)}render(){let e=this.focusZone,t=(s,n)=>s?M`<g class="dimmed">${n}</g>`:n;return l`
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
          ${this.renderGrid()} ${this.showZones?this.zones.map(s=>t(!!e&&s.id!==e,this.renderZone(s))):m}
          ${this.showFeatures?this.features.map(s=>t(this.outside({x:s.x_cm,y:s.y_cm,w:s.width_cm,h:s.length_cm}),this.renderFeature(s))):m}
          ${this.beds.map(s=>t(!!e&&s.zone_id!==e,this.renderBed(s)))}
          ${this.showPlantings?this.plantings.map(s=>{let n=this.beds.find(i=>i.id===s.bed_id);return t(!!e&&n?.zone_id!==e,this.renderPlanting(s))}):m} ${this.showPlantings?this.renderLinks():m}
          ${this.renderMulti()} ${this.renderSelection()} ${this.renderGhost()} ${this.renderDrawRect()}
        </g>
      </svg>
      <div class="zoom-indicator" aria-hidden="true">${Math.round(this.k*100)} px/m</div>
    `}};S.styles=[z`
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
    `],p([g({attribute:!1})],S.prototype,"zones",2),p([g({attribute:!1})],S.prototype,"beds",2),p([g({attribute:!1})],S.prototype,"plantings",2),p([g({attribute:!1})],S.prototype,"features",2),p([g({attribute:!1})],S.prototype,"multi",2),p([g({type:Boolean})],S.prototype,"showFeatures",2),p([g({type:Boolean})],S.prototype,"showPlantings",2),p([g({type:Boolean})],S.prototype,"showZones",2),p([g({attribute:!1})],S.prototype,"plants",2),p([g({attribute:!1})],S.prototype,"families",2),p([g({attribute:!1})],S.prototype,"selection",2),p([g({attribute:!1})],S.prototype,"ghost",2),p([g({attribute:!1})],S.prototype,"reports",2),p([g({attribute:!1})],S.prototype,"timelines",2),p([g({attribute:!1})],S.prototype,"analysis",2),p([g({attribute:!1})],S.prototype,"t",2),p([g()],S.prototype,"lang",2),p([g({type:Number})],S.prototype,"snapStep",2),p([g({type:Boolean})],S.prototype,"snapOn",2),p([g({type:Boolean})],S.prototype,"showCompanions",2),p([g({type:Boolean})],S.prototype,"showMoisture",2),p([g({type:Boolean})],S.prototype,"showTemperature",2),p([g()],S.prototype,"viewDate",2),p([g({type:Boolean})],S.prototype,"readonly",2),p([g()],S.prototype,"focusZone",2),p([g({attribute:!1})],S.prototype,"drawTool",2),p([v()],S.prototype,"drawRect",2),p([v()],S.prototype,"k",2),p([v()],S.prototype,"tx",2),p([v()],S.prototype,"ty",2),p([v()],S.prototype,"preview",2),p([Je("svg")],S.prototype,"svgEl",2),S=p([R("hl-garden-canvas")],S);var mt=class{constructor(r,e=100){this.present=r;this.limit=e;this.past=[];this.future=[]}get current(){return this.present}get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}commit(r){return this.past.push(this.present),this.past.length>this.limit&&this.past.shift(),this.present=r,this.future=[],r}undo(){let r=this.past.pop();return r===void 0?this.present:(this.future.push(this.present),this.present=r,r)}redo(){let r=this.future.pop();return r===void 0?this.present:(this.past.push(this.present),this.present=r,r)}reset(r){this.past=[],this.future=[],this.present=r}};var A=d=>structuredClone(d),ut=()=>({soil_moisture:null,soil_temperature:null,air_temperature:null,air_humidity:null,light:null,rain:null}),Dt=["house","driveway","street","parking","terrace","path","lawn","flowerbed","hedge","fence","tree","pond","shed","compost","water_butt","trellis","play","beehive","other"],fi={path:[300,60],terrace:[400,300],lawn:[500,400],flowerbed:[200,100],compost:[100,100],water_butt:[60,60],shed:[200,150],tree:[400,400],house:[1e3,800],driveway:[300,800],street:[1500,600],parking:[500,500],play:[300,300],beehive:[60,60],hedge:[400,80],fence:[500,10],trellis:[200,20],pond:[200,150],other:[80,80]},Nt=["outdoor","greenhouse","cold_frame","orchard","fruit","herbs","flowers"],vi=["orchard","fruit","herbs","flowers"],bi={outdoor:[600,400],greenhouse:[300,200],cold_frame:[150,80],orchard:[1e3,800],fruit:[600,300],herbs:[300,200],flowers:[400,150]},yi=["fresh","storage","herbs","pollinators","winter","perennials","easy"],$i=["vegetable","herb","fruit","flower"];function Ft(d){let r=d.sowing;return r.direct_sow.length&&(!r.indoor_sow.length||d.habit==="root"||d.tags.includes("root"))?"direct_sow":r.indoor_sow.length&&r.transplant.length?"indoor_sow":r.transplant.length?"transplant":"direct_sow"}var $=class extends T{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.narrow=!1;this.draft={zones:[],beds:[],plantings:[],features:[]};this.selection=null;this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.categoryFilter="";this.autofill=null;this.autofillBusy=!1;this.autofillReplace=!1;this.autofillBeds=[];this.autofillResources=null;this.season=new Date().getFullYear();this.saveState="saved";this.reports={};this.extraTimelines={};this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.layoutMode="block";this.search="";this.familyFilter="";this.paletteDrag=null;this.ghostReport=null;this.dialog=null;this.announcement="";this.paletteOpen=!0;this.step="plant";this.tool=null;this.focusZone="";this.removing=null;this.history=null;this.baseRevision=null;this.checkTimers=new Map;this.ghostCheckAt=0;this.plantMap=new Map}willUpdate(e){e.has("plants")&&(this.plantMap=new Map(this.plants.map(t=>[t.id,t]))),e.has("snapshot")&&this.snapshot&&this.syncFromSnapshot()}syncFromSnapshot(){let e=this.snapshot;this.history||(this.season=e.analysis?.season??new Date().getFullYear(),this.viewDate=e.analysis?.today??"",this.step=e.zones.length?e.plantings.length?"plant":"zones":"site");let t=this.saveState==="saved";if(!this.history||t&&e.revision!==this.baseRevision){let s={zones:A(e.zones),beds:A(e.beds),plantings:A(e.plantings),features:A(e.features??[])};this.history?this.history.reset(s):this.history=new mt(s),this.draft=s,this.baseRevision=e.revision,this.reports={},this.extraTimelines={}}}get timelines(){return{...this.snapshot.analysis?.timelines??{},...this.extraTimelines}}get seasonPlantings(){return this.draft.plantings.filter(e=>Ct(e,!!this.plantMap.get(e.plant_id)?.perennial,this.season))}commit(e,t,s=[]){if(!(!this.admin||!this.history)){this.draft=this.history.commit(e),this.saveState="dirty",this.scheduleSave();for(let n of s)this.scheduleCheck(n);t&&this.announce(t)}}undo(){this.history?.canUndo&&(this.draft=this.history.undo(),this.afterHistoryJump())}redo(){this.history?.canRedo&&(this.draft=this.history.redo(),this.afterHistoryJump())}afterHistoryJump(){this.saveState="dirty",this.scheduleSave(),this.draft.beds.forEach(e=>this.scheduleCheck(e.id)),this.selection&&!this.findItem(this.selection)&&(this.selection=null)}scheduleSave(){window.clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>this.save(),1200)}async save(){if(this.saveState!=="dirty")return;let e=this.draft;this.saveState="saving";try{let t=await this.api.savePlan(e,this.baseRevision);this.baseRevision=t.revision,this.saveState=this.draft===e?"saved":"dirty",this.saveState==="dirty"&&this.scheduleSave()}catch(t){t.code==="revision_conflict"?(this.saveState="saved",this.history=null,this.syncFromSnapshot(),this.toast(this.t("common.conflict"))):(this.saveState="error",this.toast(this.t("common.error",{message:t.message??String(t)})))}}scheduleCheck(e){window.clearTimeout(this.checkTimers.get(e)),this.checkTimers.set(e,window.setTimeout(()=>this.runCheck(e),250))}bedPlantings(e,t=this.draft){return t.plantings.filter(s=>s.bed_id===e&&(this.plantMap.get(s.plant_id)?.perennial?Ct(s,!0,this.season):Math.abs(s.season-this.season)<=1))}async runCheck(e){let t=this.draft.beds.find(s=>s.id===e);if(!t){let{[e]:s,...n}=this.reports;this.reports=n;return}try{let s=await this.api.checkBed(t,this.bedPlantings(e));this.reports={...this.reports,[e]:s},s.timelines&&(this.extraTimelines={...this.extraTimelines,...s.timelines})}catch{}}findItem(e){return(e.kind==="zone"?this.draft.zones:e.kind==="bed"?this.draft.beds:e.kind==="feature"?this.draft.features:this.draft.plantings).find(s=>s.id===e.id)}onSelect(e){if(!e){this.selection=null,this.multi=[];return}if(e.additive){let t=this.multi.filter(n=>n.kind===e.kind),s=t.some(n=>n.id===e.id);this.multi=s?t.filter(n=>n.id!==e.id):[...t,{kind:e.kind,id:e.id}],this.selection=this.multi[this.multi.length-1]??null,this.announce(this.t("planner.selected_n",{n:this.multi.length}));return}this.selection={kind:e.kind,id:e.id},this.multi=[this.selection]}align(e){if(this.multi.length<2||!this.admin)return;let t=A(this.draft),s=this.multi[0].kind,n=new Set;if(s==="planting"){let i=this.multi.map(c=>t.plantings.find(h=>h.id===c.id)).filter(Boolean),a=new Map(t.beds.map(c=>[c.id,c])),o=i.map(c=>({x:a.get(c.bed_id).x_cm+c.x_cm,y:a.get(c.bed_id).y_cm+c.y_cm,w:c.width_cm,h:c.length_cm}));Ot(o,e).forEach((c,h)=>{let u=i[h],f=a.get(u.bed_id),b=ie({...c,x:c.x-f.x_cm,y:c.y-f.y_cm},{x:0,y:0,w:f.width_cm,h:f.length_cm});Object.assign(u,{x_cm:b.x,y_cm:b.y}),n.add(f.id)})}else{let i=s==="bed"?t.beds:s==="zone"?t.zones:t.features,a=this.multi.map(o=>i.find(c=>c.id===o.id)).filter(Boolean);Ot(a.map(o=>({x:o.x_cm,y:o.y_cm,w:o.width_cm,h:o.length_cm})),e).forEach((o,c)=>{let h=a[c],u=o.x-h.x_cm,f=o.y-h.y_cm;if(h.x_cm=o.x,h.y_cm=o.y,s==="zone")for(let b of t.beds.filter(k=>k.zone_id===h.id))b.x_cm+=u,b.y_cm+=f;s==="bed"&&n.add(h.id)})}this.commit(t,this.t("planner.aligned",{n:this.multi.length}),[...n])}onItemChange(e){let{kind:t,id:s,rect:n,targetBedId:i,dx:a,dy:o,group:c}=e.detail,h=A(this.draft),u=this.snapOn?this.snapshot.settings.snap_cm:1;if(c){this.moveGroup(h,t,a,o);return}if(t==="feature"){let f=h.features.find(b=>b.id===s);Object.assign(f,{x_cm:n.x,y_cm:n.y,width_cm:n.w,length_cm:n.h}),this.commit(h,this.t("planner.moved",{name:f.name}));return}if(t==="zone"){let f=h.zones.find(y=>y.id===s),b=n.x-f.x_cm,k=n.y-f.y_cm;if(Object.assign(f,{x_cm:n.x,y_cm:n.y,width_cm:n.w,length_cm:n.h}),b||k)for(let y of h.beds.filter(w=>w.zone_id===s))y.x_cm+=b,y.y_cm+=k;this.commit(h,this.t("planner.moved",{name:f.name}))}else if(t==="bed"){let f=h.beds.find(w=>w.id===s);Object.assign(f,{x_cm:n.x,y_cm:n.y,width_cm:n.w,length_cm:n.h});let b=n.x+n.w/2,k=n.y+n.h/2,y=[...h.zones].reverse().find(w=>b>=w.x_cm&&b<=w.x_cm+w.width_cm&&k>=w.y_cm&&k<=w.y_cm+w.length_cm);y&&(f.zone_id=y.id),this.commit(h,this.t("planner.moved",{name:f.name}),[f.id])}else{let f=h.plantings.find(E=>E.id===s),b=f.bed_id,k=h.beds.find(E=>E.id===(i??b))??h.beds.find(E=>E.id===b),y=ie({...n,x:n.x-k.x_cm,y:n.y-k.y_cm},{x:0,y:0,w:k.width_cm,h:k.length_cm});Object.assign(f,{bed_id:k.id,x_cm:O(y.x,u),y_cm:O(y.y,u),width_cm:y.w,length_cm:y.h});let w=this.plantMap.get(f.plant_id);this.commit(h,this.t("planner.moved",{name:_(w,this.lang)}),[...new Set([b,k.id])])}}moveGroup(e,t,s,n){let i=new Set(this.multi.filter(o=>o.kind===t).map(o=>o.id)),a=new Set;if(t==="planting")for(let o of e.plantings.filter(c=>i.has(c.id))){let c=e.beds.find(u=>u.id===o.bed_id),h=ie({x:o.x_cm+s,y:o.y_cm+n,w:o.width_cm,h:o.length_cm},{x:0,y:0,w:c.width_cm,h:c.length_cm});Object.assign(o,{x_cm:h.x,y_cm:h.y}),a.add(c.id)}else{let o=t==="bed"?e.beds:t==="zone"?e.zones:e.features;for(let c of o.filter(h=>i.has(h.id))){if(c.x_cm=Math.round(c.x_cm+s),c.y_cm=Math.round(c.y_cm+n),t==="zone")for(let h of e.beds.filter(u=>u.zone_id===c.id))h.x_cm+=s,h.y_cm+=n;t==="bed"&&a.add(c.id)}}this.commit(e,this.t("planner.moved_n",{n:i.size}),[...a])}updateSelected(e,t){if(!this.selection)return;let s=A(this.draft),i=(this.selection.kind==="zone"?s.zones:this.selection.kind==="bed"?s.beds:this.selection.kind==="feature"?s.features:s.plantings).find(o=>o.id===this.selection.id);if(!i)return;Object.assign(t?i[t]:i,e);let a=this.selection.kind==="planting"?i.bed_id:this.selection.kind==="bed"?i.id:void 0;this.commit(s,void 0,a?[a]:[])}removeSelected(){let e=this.selection;if(!e||!this.admin)return;let t=A(this.draft),s="";if(this.multi.length>1&&(e.kind==="planting"||e.kind==="feature")){let n=new Set(this.multi.map(a=>a.id)),i=t.plantings.filter(a=>n.has(a.id)).map(a=>a.bed_id);t.plantings=t.plantings.filter(a=>!n.has(a.id)),t.features=t.features.filter(a=>!n.has(a.id)),this.commit(t,this.t("planner.removed_n",{n:n.size}),[...new Set(i)]),this.selection=null,this.multi=[];return}if(e.kind==="feature"){let n=t.features.find(i=>i.id===e.id);t.features=t.features.filter(i=>i.id!==e.id),this.commit(t,this.t("planner.removed",{name:n?.name??""})),this.selection=null,this.multi=[];return}if(e.kind==="planting"){let n=t.plantings.find(i=>i.id===e.id);if(n&&this.plantMap.get(n.plant_id)?.perennial&&n.season<this.season){this.removing=n;return}s=_(this.plantMap.get(n?.plant_id??""),this.lang),t.plantings=t.plantings.filter(i=>i.id!==e.id),this.commit(t,this.t("planner.removed",{name:s}),n?[n.bed_id]:[])}else if(e.kind==="bed"){let n=t.beds.find(a=>a.id===e.id),i=t.plantings.filter(a=>a.bed_id===e.id).length;if(i&&!confirm(`${n?.name}: ${this.t("planner.count",{n:i})} \u2013 ${this.t("common.delete")}?`))return;t.beds=t.beds.filter(a=>a.id!==e.id),t.plantings=t.plantings.filter(a=>a.bed_id!==e.id),this.commit(t,this.t("planner.removed",{name:n?.name??""}))}else{let n=t.zones.find(a=>a.id===e.id),i=t.beds.filter(a=>a.zone_id===e.id).map(a=>a.id);if(i.length&&!confirm(`${n?.name}: ${i.length} \xD7 ${this.t("planner.bed_name")} \u2013 ${this.t("common.delete")}?`))return;t.zones=t.zones.filter(a=>a.id!==e.id),t.beds=t.beds.filter(a=>!i.includes(a.id)),t.plantings=t.plantings.filter(a=>!i.includes(a.bed_id)),this.commit(t,this.t("planner.removed",{name:n?.name??""}))}this.selection=null,this.multi=[]}removePerennial(e){let t=this.removing;if(this.removing=null,!t)return;let s=A(this.draft),n=_(this.plantMap.get(t.plant_id),this.lang);e==="delete"?s.plantings=s.plantings.filter(i=>i.id!==t.id):Object.assign(s.plantings.find(i=>i.id===t.id),{removed_season:this.season}),this.selection=null,this.multi=[],this.commit(s,this.t(e==="delete"?"planner.removed":"planner.removed_from",{name:n,season:this.season}),[t.bed_id])}toolInfo(e){return e.kind==="zone"?{label:this.t(`settings.zone_type.${e.type}`),color:Y[e.type].stroke.startsWith("var")?"#6f9a45":Y[e.type].stroke}:e.kind==="feature"?{label:this.t(`feature.${e.type}`),color:Se[e.type]?.stroke??"#888"}:{label:this.t("planner.bed_name"),color:"#8a6a45"}}onDrawRect(e){let t=this.tool;if(!t||!this.admin)return;let s=e.detail,n=A(this.draft),i=(a,o)=>({x:O(s.x-a/2,10),y:O(s.y-o/2,10),w:a,h:o});if(t.kind==="zone"){s.w||(s=i(...bi[t.type]));let a=n.zones.filter(c=>c.type===t.type).length+1,o={id:ee("zone"),name:`${this.t(`settings.zone_type.${t.type}`)}${a>1?` ${a}`:""}`,type:t.type,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:ut(),vent_entity:null};n.zones.push(o),vi.includes(t.type)&&n.beds.push(this.makeBed(o,{x:o.x_cm,y:o.y_cm,w:o.width_cm,h:o.length_cm},o.name,"in_ground")),this.selection={kind:"zone",id:o.id},this.commit(n,this.t("planner.placed",{plant:o.name,bed:""}))}else if(t.kind==="feature"){s.w||(s=i(...fi[t.type]));let a={id:ee("ft"),name:this.t(`feature.${t.type}`),type:t.type,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,notes:""};n.features.push(a),this.selection={kind:"feature",id:a.id},this.commit(n,this.t("planner.placed",{plant:a.name,bed:""}))}else{s.w||(s=i(120,80));let a=s.x+s.w/2,o=s.y+s.h/2,c=n.zones.find(u=>u.id===this.focusZone)??[...n.zones].reverse().find(u=>a>=u.x_cm&&a<=u.x_cm+u.width_cm&&o>=u.y_cm&&o<=u.y_cm+u.length_cm);if(!c){this.toast(this.t("planner.bed_needs_zone"));return}let h=this.makeBed(c,ie(s,{x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm}),`${this.t("planner.new_bed")} ${n.beds.length+1}`,c.type==="outdoor"?"raised":"in_ground");n.beds.push(h),this.selection={kind:"bed",id:h.id},this.commit(n,this.t("planner.placed",{plant:h.name,bed:c.name}),[h.id])}this.multi=this.selection?[this.selection]:[]}makeBed(e,t,s,n){return{id:ee("bed"),name:s,zone_id:e.id,kind:n,x_cm:t.x,y_cm:t.y,width_cm:t.w,length_cm:t.h,orientation_deg:0,soil:"loam",shade_pct:null,sensors:ut(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""}}openZone(e){this.focusZone=e,this.step==="site"&&(this.step="zones");let t=this.draft.zones.find(s=>s.id===e);this.selection=t?{kind:"zone",id:t.id}:null,this.multi=this.selection?[this.selection]:[],requestAnimationFrame(()=>t?this.canvas?.fitRect({x:t.x_cm,y:t.y_cm,w:t.width_cm,h:t.length_cm}):this.canvas?.fit())}closeZone(){this.focusZone="",requestAnimationFrame(()=>this.canvas?.fit())}moveToBed(e,t){let s=A(this.draft),n=s.plantings.find(u=>u.id===e),i=s.beds.find(u=>u.id===t);if(!n||!i)return;let a=n.bed_id,o=this.bedPlantings(i.id,s).filter(u=>u.season===n.season).map(u=>({x:u.x_cm,y:u.y_cm,w:u.width_cm,h:u.length_cm})),c={w:Math.min(n.width_cm,i.width_cm),h:Math.min(n.length_cm,i.length_cm)},h=ue(i,c,o,this.snapshot.settings.snap_cm)??{x:0,y:0};Object.assign(n,{bed_id:i.id,x_cm:h.x,y_cm:h.y,width_cm:c.w,length_cm:c.h}),this.commit(s,this.t("planner.moved",{name:_(this.plantMap.get(n.plant_id),this.lang)}),[a,i.id])}openAutofill(e=[]){let t=this.snapshot.settings.resources;this.autofillResources=t?A(t):{household_size:2,hours_per_week:3,water_liters_per_week:null,compost_kg:null,irrigation:!1,goals:["fresh","herbs"],wanted:[],excluded:[]},this.autofill=null,this.autofillBeds=e,this.dialog="autofill"}async runAutofill(){if(this.autofillResources){this.autofillBusy=!0;try{this.saveState!=="saved"&&await this.save(),this.autofill=await this.api.autofill({season:this.season,bed_ids:this.autofillBeds.length?this.autofillBeds:void 0,replace:this.autofillReplace,resources:this.autofillResources})}catch(e){this.toast(this.t("common.error",{message:e.message??String(e)}))}finally{this.autofillBusy=!1}}}async applyAutofill(){let e=this.autofill;if(e)try{let t=await this.api.autofillApply(e.plantings,this.autofillReplace?e.beds:[],this.baseRevision);this.baseRevision=t.revision,this.history=null,this.saveState="saved",this.dialog=null,this.autofill=null,this.toast(this.t("autofill.applied",{n:e.summary.plantings}))}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}}duplicateSelected(){let e=this.selection;if(!e||e.kind!=="planting")return;let t=A(this.draft),s=t.plantings.find(c=>c.id===e.id),n=s&&t.beds.find(c=>c.id===s.bed_id);if(!s||!n)return;let i=this.bedPlantings(n.id,t).filter(c=>c.season===s.season).map(c=>({x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm})),a=ue(n,{w:s.width_cm,h:s.length_cm},i,this.snapshot.settings.snap_cm)??{x:s.x_cm,y:s.y_cm},o={...A(s),id:ee("pl"),x_cm:a.x,y_cm:a.y,succession_group:null,succession_index:0,status:"planned",sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null};t.plantings.push(o),this.selection={kind:"planting",id:o.id},this.commit(t,void 0,[n.id])}nudge(e,t,s=!1){let n=this.selection;if(!n||!this.admin)return;let i=A(this.draft),a=[];if(n.kind==="planting"){let o=i.plantings.find(f=>f.id===n.id),c=i.beds.find(f=>f.id===o.bed_id),h=s?{x:o.x_cm,y:o.y_cm,w:Math.max(5,o.width_cm+e),h:Math.max(5,o.length_cm+t)}:{x:o.x_cm+e,y:o.y_cm+t,w:o.width_cm,h:o.length_cm},u=ie(h,{x:0,y:0,w:c.width_cm,h:c.length_cm});Object.assign(o,{x_cm:u.x,y_cm:u.y,width_cm:u.w,length_cm:u.h}),a.push(c.id)}else{let o=(n.kind==="bed"?i.beds:i.zones).find(c=>c.id===n.id);if(s)o.width_cm=Math.max(10,o.width_cm+e),o.length_cm=Math.max(10,o.length_cm+t);else if(o.x_cm+=e,o.y_cm+=t,n.kind==="zone")for(let c of i.beds.filter(h=>h.zone_id===n.id))c.x_cm+=e,c.y_cm+=t;n.kind==="bed"&&a.push(n.id)}this.commit(i,void 0,a)}newPlanting(e,t,s){return{id:ee("pl"),plant_id:e.id,bed_id:t.id,season:this.season,layout:this.layoutMode,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,count:null,method:Ft(e),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:""}}addToSelectedBed(e){if(!this.admin)return;let t=A(this.draft),s=this.selection?.kind==="bed"?this.selection.id:this.selection?.kind==="planting"?t.plantings.find(h=>h.id===this.selection.id)?.bed_id:void 0,n=t.beds.find(h=>h.id===s)??t.beds[0];if(!n)return;let i=Ue(e,this.layoutMode,n),a=this.bedPlantings(n.id,t).filter(h=>h.season===this.season).map(h=>({x:h.x_cm,y:h.y_cm,w:h.width_cm,h:h.length_cm})),o=ue(n,i,a,this.snapshot.settings.snap_cm)??{x:0,y:0},c=this.newPlanting(e,n,{...o,...i});t.plantings.push(c),this.selection={kind:"planting",id:c.id},this.commit(t,this.t("planner.placed",{plant:_(e,this.lang),bed:n.name}),[n.id]),this.canvas?.focusCanvas()}addBed(){let e=A(this.draft),t=this.selection?.kind==="zone"&&e.zones.find(o=>o.id===this.selection.id)||e.zones.find(o=>o.type==="outdoor")||e.zones[0];if(!t)return this.addZone();let s={w:120,h:80},n=e.beds.filter(o=>o.zone_id===t.id).map(o=>({x:o.x_cm-t.x_cm-20,y:o.y_cm-t.y_cm-20,w:o.width_cm+40,h:o.length_cm+40})),i=ue({...e.beds[0],width_cm:t.width_cm,length_cm:t.length_cm},s,n,10)??{x:20,y:20},a={id:ee("bed"),name:`${this.t("planner.new_bed")} ${e.beds.length+1}`,zone_id:t.id,kind:"raised",x_cm:t.x_cm+i.x,y_cm:t.y_cm+i.y,width_cm:s.w,length_cm:s.h,orientation_deg:0,soil:"loam",shade_pct:null,sensors:ut(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""};e.beds.push(a),this.selection={kind:"bed",id:a.id},this.commit(e,this.t("planner.placed",{plant:a.name,bed:t.name}),[a.id])}addZone(){let e=A(this.draft),t=pt(e.zones,e.beds),s={id:ee("zone"),name:`${this.t("planner.new_zone")} ${e.zones.length+1}`,type:"outdoor",x_cm:e.zones.length?t.x+t.w+100:0,y_cm:e.zones.length?t.y:0,width_cm:400,length_cm:300,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:ut(),vent_entity:null};e.zones.push(s),this.selection={kind:"zone",id:s.id},this.commit(e),requestAnimationFrame(()=>this.canvas?.fit())}onPalettePointerDown(e,t){!this.admin||e.pointerType==="mouse"&&e.button!==0||(e.currentTarget.setPointerCapture(e.pointerId),this.paletteDrag={plant:t,pointerId:e.pointerId,bedId:null,rect:null},this.ghostReport=null)}onPalettePointerMove(e){let t=this.paletteDrag;if(!t||t.pointerId!==e.pointerId)return;let s=this.canvas.clientToCanvas(e.clientX,e.clientY);if(!s){this.paletteDrag={...t,bedId:null,rect:null};return}let n=Ps(this.draft.beds,s.x,s.y);if(!n){let h={w:t.plant.spacing_cm,h:t.plant.spacing_cm};this.paletteDrag={...t,bedId:null,rect:{x:s.x-h.w/2,y:s.y-h.h/2,...h}};return}let i=Ue(t.plant,this.layoutMode,n),a=this.snapOn?this.snapshot.settings.snap_cm:1,o={x:O(s.x-n.x_cm-i.w/2,a),y:O(s.y-n.y_cm-i.h/2,a),...i};this.layoutMode==="row"&&(o=n.width_cm>=n.length_cm?{...o,x:0}:{...o,y:0}),o=ie(o,{x:0,y:0,w:n.width_cm,h:n.length_cm}),this.paletteDrag={...t,bedId:n.id,rect:{...o,x:o.x+n.x_cm,y:o.y+n.y_cm}};let c=performance.now();if(c-this.ghostCheckAt>220){this.ghostCheckAt=c;let h=this.newPlanting(t.plant,n,o);h.id="__ghost__",this.api.checkBed(n,[...this.bedPlantings(n.id),h]).then(u=>{this.paletteDrag&&(this.ghostReport=u)}).catch(()=>{})}}onPalettePointerUp(e){let t=this.paletteDrag;if(!t||t.pointerId!==e.pointerId)return;if(this.paletteDrag=null,this.ghostReport=null,!t.bedId||!t.rect){t.rect&&this.announce(this.t("planner.no_bed_here"));return}let s=A(this.draft),n=s.beds.find(a=>a.id===t.bedId),i=this.newPlanting(t.plant,n,{...t.rect,x:t.rect.x-n.x_cm,y:t.rect.y-n.y_cm});s.plantings.push(i),this.selection={kind:"planting",id:i.id},this.commit(s,this.t("planner.placed",{plant:_(t.plant,this.lang),bed:n.name}),[n.id])}ghostLabel(){let e=this.paletteDrag,t=_(e.plant,this.lang);if(!e.bedId)return t;let s=(this.ghostReport?.pairs??[]).filter(o=>o.a==="__ghost__"||o.b==="__ghost__"),n=s.filter(o=>o.kind==="enemy"||o.kind==="overlap").length,i=s.filter(o=>o.kind==="friend").length,a=(this.ghostReport?.rotation??[]).some(o=>o.planting==="__ghost__");return`${t}${i?` \xB7 \u2665 ${i}`:""}${n?` \xB7 \u26A0 ${n}`:""}${a?" \xB7 \u27F2":""}`}onKeyDown(e){let t=e.composedPath()[0];if(["INPUT","SELECT","TEXTAREA"].includes(t?.tagName))return;let s=e.ctrlKey||e.metaKey,n=(this.snapOn?this.snapshot.settings.snap_cm:1)*(e.shiftKey?10:1),i=e.key,a=()=>{e.preventDefault(),e.stopPropagation()};if(s&&i.toLowerCase()==="z"&&!e.shiftKey)return this.undo(),a();if(s&&i.toLowerCase()==="y"||s&&e.shiftKey&&i.toLowerCase()==="z")return this.redo(),a();if(s&&i.toLowerCase()==="d")return this.duplicateSelected(),a();if(s)return;let o={ArrowLeft:[-n,0],ArrowRight:[n,0],ArrowUp:[0,-n],ArrowDown:[0,n]};if(o[i]&&this.selection)return this.nudge(...o[i],e.altKey),a();switch(i){case"Delete":case"Backspace":return this.removeSelected(),a();case"Escape":return this.selection=null,this.multi=[],this.paletteDrag=null,this.dialog=null,a();case"g":return this.snapOn=!this.snapOn,a();case"c":return this.showCompanions=!this.showCompanions,a();case"m":return this.showMoisture=!this.showMoisture,a();case"t":return this.showTemperature=!this.showTemperature,a();case"+":case"=":return this.canvas.zoom(1.2),a();case"-":return this.canvas.zoom(1/1.2),a();case"0":return this.canvas.fit(),a();case"?":return this.dialog="shortcuts",a();case"]":case"[":return this.cycleSelection(i==="]"?1:-1),a();default:}}cycleSelection(e){let t=[...this.draft.beds.map(a=>({kind:"bed",id:a.id})),...this.seasonPlantings.map(a=>({kind:"planting",id:a.id}))];if(!t.length)return;let s=this.selection?t.findIndex(a=>a.id===this.selection.id):-1;this.selection=t[(s+e+t.length)%t.length];let n=this.findItem(this.selection),i=this.selection.kind==="planting"?_(this.plantMap.get(n.plant_id),this.lang):n.name;this.announce(i)}announce(e){this.announcement="",requestAnimationFrame(()=>this.announcement=e)}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async exportPlan(e){let{filename:t,content:s}=await this.api.exportPlan(e);et(t,s,e==="json"?"application/json":"application/yaml")}async importPlan(e){e.preventDefault();let t=e.target,s=t.elements.namedItem("file").files?.[0],n=t.elements.namedItem("mode").value;if(s)try{let i=await this.api.importPlan(await s.text(),n);this.history=null,this.saveState="saved",this.dialog=null,this.toast(this.t("planner.imported",{beds:i.counts.beds,plantings:i.counts.plantings}))}catch(i){this.toast(this.t("common.error",{message:i.message??String(i)}))}}async createSuccession(e){e.preventDefault();let t=this.selection,s=t?.kind==="planting"?this.draft.plantings.find(u=>u.id===t.id):void 0;if(!s)return;let n=e.target,i=Number(n.elements.namedItem("count").value),a=Number(n.elements.namedItem("interval").value)||null,o=n.elements.namedItem("placement").value,c=await this.api.succession(s,i,a,o),h=A(this.draft);h.plantings=h.plantings.filter(u=>u.id!==s.id).concat(c.plantings),this.dialog=null,this.commit(h,void 0,[s.bed_id]),c.dropped&&this.toast(this.t("planner.succession_dropped",{n:c.dropped}))}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal()}render(){if(!this.history)return l`<p class="empty">${this.t("common.loading")}</p>`;let e=this.paletteDrag,t=e?.rect?{rect:e.rect,valid:!!e.bedId,color:B(this.families,e.plant.family),label:this.ghostLabel()}:null;return l`
      ${this.renderStepper()}
      ${this.renderToolbar()}
      <div class="layout ${this.narrow?"narrow":""} ${this.paletteOpen||this.narrow?"":"palette-closed"}" @keydown=${this.onKeyDown}>
        ${this.paletteOpen||this.narrow?this.step==="site"?this.renderSitePane():this.step==="zones"?this.renderZonesPane():this.renderPalette():l`<div></div>`}
        <div class="center">
          <hl-garden-canvas
            .zones=${this.draft.zones}
            .beds=${this.draft.beds}
            .plantings=${this.seasonPlantings}
            .features=${this.draft.features}
            .multi=${this.multi}
            .showFeatures=${this.showFeatures}
            .showPlantings=${this.showPlantings}
            .showZones=${this.showZones}
            .plants=${this.plantMap}
            .families=${this.families}
            .selection=${this.selection}
            .ghost=${t}
            .reports=${this.reports}
            .timelines=${this.timelines}
            .analysis=${this.snapshot.analysis}
            .t=${this.t}
            .lang=${this.lang}
            .snapStep=${this.snapshot.settings.snap_cm}
            .snapOn=${this.snapOn}
            .showCompanions=${this.showCompanions}
            .showMoisture=${this.showMoisture}
            .showTemperature=${this.showTemperature}
            .viewDate=${this.viewDate}
            .readonly=${!this.admin}
            .focusZone=${this.focusZone}
            .drawTool=${this.tool?this.toolInfo(this.tool):null}
            @select=${s=>this.onSelect(s.detail)}
            @item-change=${this.onItemChange}
            @draw-rect=${this.onDrawRect}
            @zone-open=${s=>this.openZone(s.detail)}
          ></hl-garden-canvas>
          ${this.tool?l`<div class="draw-hint" role="status"><ha-icon icon="mdi:vector-rectangle"></ha-icon>
            ${this.t("planner.draw_hint",{what:this.toolInfo(this.tool).label})}
            <button class="btn small ghost" @click=${()=>this.tool=null}>${this.t("common.done")}</button></div>`:m}
          ${e?l`<div class="drag-ghost-hint" role="status">${t?t.label:_(e.plant,this.lang)}</div>`:m}
        </div>
        ${this.renderInspector()}
      </div>
      <div class="visually-hidden" role="status" aria-live="polite">${this.announcement}</div>
      ${this.renderDialog()}
    `}renderToolbar(){let e=[this.season-1,this.season,this.season+1],t={saved:"common.saved",dirty:"common.unsaved",saving:"common.saving",error:"common.unsaved"}[this.saveState],s=(n,i,a,o,c=!1)=>l`
      <button class="icon-btn" title=${i} aria-label=${i} aria-pressed=${o===void 0?m:String(o)} ?disabled=${c} @click=${a}>
        <ha-icon icon=${n}></ha-icon>
      </button>`;return l`
      <div class="toolbar" role="toolbar" aria-label=${this.t("nav.planner")}>
        ${s("mdi:dock-left",this.t("planner.palette"),()=>this.paletteOpen=!this.paletteOpen,this.paletteOpen)}
        <label class="row small"><span class="visually-hidden">${this.t("planner.season")}</span>
          <select aria-label=${this.t("planner.season")} @change=${n=>this.season=Number(n.target.value)}>
            ${e.map(n=>l`<option value=${n} ?selected=${n===this.season}>${this.t("common.season",{year:n})}</option>`)}
          </select>
        </label>
        <span class="sep"></span>
        ${s("mdi:undo",`${this.t("planner.undo")} (Ctrl+Z)`,()=>this.undo(),void 0,!this.history?.canUndo||!this.admin)}
        ${s("mdi:redo",`${this.t("planner.redo")} (Ctrl+Y)`,()=>this.redo(),void 0,!this.history?.canRedo||!this.admin)}
        <span class="sep"></span>
        ${s("mdi:grid",`${this.t("planner.snap")} (G)`,()=>this.snapOn=!this.snapOn,this.snapOn)}
        ${s("mdi:handshake-outline",`${this.t("planner.overlay_companions")} (C)`,()=>this.showCompanions=!this.showCompanions,this.showCompanions)}
        ${s("mdi:water-percent",`${this.t("planner.overlay_moisture")} (M)`,()=>this.showMoisture=!this.showMoisture,this.showMoisture)}
        ${s("mdi:thermometer",`${this.t("planner.overlay_temperature")} (T)`,()=>this.showTemperature=!this.showTemperature,this.showTemperature)}
        <span class="sep"></span>
        ${s("mdi:texture-box",this.t("planner.layer_zones"),()=>this.showZones=!this.showZones,this.showZones)}
        ${s("mdi:map-marker-path",this.t("planner.layer_features"),()=>this.showFeatures=!this.showFeatures,this.showFeatures)}
        ${s("mdi:sprout",this.t("planner.layer_plantings"),()=>this.showPlantings=!this.showPlantings,this.showPlantings)}
        ${this.multi.length>1?l`<span class="sep"></span>
          ${s("mdi:align-horizontal-left",this.t("planner.align.left"),()=>this.align("left"))}
          ${s("mdi:align-horizontal-center",this.t("planner.align.hcenter"),()=>this.align("hcenter"))}
          ${s("mdi:align-horizontal-right",this.t("planner.align.right"),()=>this.align("right"))}
          ${s("mdi:align-vertical-top",this.t("planner.align.top"),()=>this.align("top"))}
          ${s("mdi:align-vertical-center",this.t("planner.align.vcenter"),()=>this.align("vcenter"))}
          ${s("mdi:align-vertical-bottom",this.t("planner.align.bottom"),()=>this.align("bottom"))}
          ${s("mdi:distribute-horizontal-center",this.t("planner.align.hdistribute"),()=>this.align("hdistribute"),void 0,this.multi.length<3)}
          ${s("mdi:distribute-vertical-center",this.t("planner.align.vdistribute"),()=>this.align("vdistribute"),void 0,this.multi.length<3)}`:m}
        <span class="sep"></span>
        ${s("mdi:magnify-plus-outline",this.t("planner.zoom_in"),()=>this.canvas.zoom(1.2))}
        ${s("mdi:magnify-minus-outline",this.t("planner.zoom_out"),()=>this.canvas.zoom(1/1.2))}
        ${s("mdi:fit-to-screen-outline",this.t("planner.fit"),()=>this.canvas.fit())}
        <span class="sep"></span>
        <label class="row small">${this.t("planner.view_date")}
          <input type="date" .value=${this.viewDate} @change=${n=>this.viewDate=n.target.value} />
        </label>
        <span class="spacer"></span>
        <span class="save-state ${this.saveState==="error"?"error":""}" role="status">
          <ha-icon icon=${this.saveState==="saved"?"mdi:cloud-check-outline":"mdi:cloud-upload-outline"}></ha-icon>${this.t(t)}
        </span>
        ${this.admin?l`
          <button class="btn small primary" @click=${()=>this.openAutofill()}><ha-icon icon="mdi:auto-fix"></ha-icon>${this.t("autofill.title")}</button>
          <button class="btn small" @click=${()=>this.addBed()}><ha-icon icon="mdi:plus"></ha-icon>${this.t("planner.add_bed")}</button>`:m}
        <details class="more">
          <summary class="icon-btn" title=${this.t("planner.more")} aria-label=${this.t("planner.more")}><ha-icon icon="mdi:dots-vertical"></ha-icon></summary>
          <div class="menu" role="menu">
            <button role="menuitem" @click=${()=>this.exportPlan("json")}><ha-icon icon="mdi:file-export-outline"></ha-icon>${this.t("planner.export_json")}</button>
            <button role="menuitem" @click=${()=>this.exportPlan("yaml")}><ha-icon icon="mdi:code-braces"></ha-icon>${this.t("planner.export_yaml")}</button>
            ${this.admin?l`<button role="menuitem" @click=${()=>this.dialog="import"}><ha-icon icon="mdi:file-import-outline"></ha-icon>${this.t("planner.import")}</button>`:m}
            <button role="menuitem" @click=${()=>this.dialog="shortcuts"}><ha-icon icon="mdi:keyboard-outline"></ha-icon>${this.t("planner.shortcuts")} (?)</button>
          </div>
        </details>
      </div>
      ${this.admin?m:l`<p class="readonly-note">${this.t("common.admin_only")}</p>`}
    `}renderStepper(){let e=[["site","mdi:vector-square","planner.step.site"],["zones","mdi:texture-box","planner.step.zones"],["plant","mdi:sprout","planner.step.plant"]],t=this.draft.zones.find(s=>s.id===this.focusZone);return l`<nav class="stepper" aria-label=${this.t("planner.steps")}>
      ${e.map(([s,n,i],a)=>l`
        <button class="step ${this.step===s?"active":""}" aria-current=${this.step===s?"step":m}
          @click=${()=>{this.step=s,this.tool=null}}>
          <span class="num">${a+1}</span><ha-icon icon=${n}></ha-icon>
          <span class="txt"><b>${this.t(i)}</b><span class="xs muted">${this.t(`${i}.hint`)}</span></span>
        </button>${a<e.length-1?l`<span class="step-sep" aria-hidden="true">›</span>`:m}`)}
      <span class="spacer"></span>
      <span class="crumbs" aria-label=${this.t("planner.zone_map")}>
        <button class="chip ${t?"":"ok"}" @click=${()=>this.closeZone()}><ha-icon icon="mdi:home-outline"></ha-icon>${this.t("planner.whole_garden")}</button>
        ${t?l`<span aria-hidden="true">›</span><span class="chip ok">${Y[t.type]?.icon??""} ${t.name}</span>`:m}
      </span>
    </nav>`}renderToolButton(e,t,s,n=""){let i=this.tool&&this.tool.kind===e.kind&&("type"in e?this.tool.type===e.type:!0);return l`<button class="tool ${i?"active":""}" aria-pressed=${String(!!i)} title=${n||s} ?disabled=${!this.admin}
      @click=${()=>this.tool=i?null:e}>
      <span class="tool-icon">${t}</span><span class="tool-label">${s}</span></button>`}renderSitePane(){return l`<aside class="pane" aria-label=${this.t("planner.step.site")}>
      <header><h3>${this.t("planner.step.site")}</h3><hl-info term="zones" .t=${this.t}></hl-info></header>
      <div class="pane-body stack">
        <p class="small muted">${this.t("planner.site_intro")}</p>
        <h4>${this.t("planner.zones")}</h4>
        <div class="tool-grid">
          ${Nt.map(e=>this.renderToolButton({kind:"zone",type:e},Y[e].icon,this.t(`settings.zone_type.${e}`),this.t(`zone_hint.${e}`)))}
        </div>
        <h4>${this.t("planner.elements")}</h4>
        <div class="tool-grid">
          ${Dt.map(e=>this.renderToolButton({kind:"feature",type:e},Se[e]?.icon||"\u25AD",this.t(`feature.${e}`)))}
        </div>
        <div class="divider"></div>
        <h4>${this.t("planner.your_zones")} (${this.draft.zones.length})</h4>
        ${this.draft.zones.length?l`<div class="stack" style="gap:6px">${this.draft.zones.map(e=>l`
          <div class="zone-row"><span>${Y[e.type]?.icon}</span>
            <span class="grow"><b>${e.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${e.type}`)} · ${(e.width_cm/100).toFixed(1)} × ${(e.length_cm/100).toFixed(1)} m</span></span>
            <button class="btn small ghost" @click=${()=>this.openZone(e.id)}>${this.t("planner.open_zone")}</button></div>`)}</div>`:l`<p class="xs muted">${this.t("planner.no_zones")}</p>`}
        ${this.draft.zones.length?l`<button class="btn primary" @click=${()=>{this.step="zones",this.tool=null}}>${this.t("planner.next")}: ${this.t("planner.step.zones")} ›</button>`:m}
      </div>
    </aside>`}renderZonesPane(){let e=this.draft.zones.find(n=>n.id===this.focusZone);if(!e)return l`<aside class="pane" aria-label=${this.t("planner.step.zones")}>
        <header><h3>${this.t("planner.step.zones")}</h3></header>
        <div class="pane-body stack">
          <p class="small muted">${this.t("planner.zones_intro")}</p>
          ${this.draft.zones.map(n=>{let i=this.draft.beds.filter(o=>o.zone_id===n.id),a=this.seasonPlantings.filter(o=>i.some(c=>c.id===o.bed_id)).length;return l`<button class="zone-card" style=${`border-left-color:${Y[n.type]?.stroke}`} @click=${()=>this.openZone(n.id)}>
              <span class="big">${Y[n.type]?.icon}</span>
              <span class="grow"><b>${n.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${n.type}`)} ·
                ${this.t("planner.n_beds",{n:i.length})} · ${this.t("planner.count",{n:a})}</span></span>
              <ha-icon icon="mdi:chevron-right"></ha-icon></button>`})}
          ${this.draft.zones.length?m:l`<button class="btn" @click=${()=>this.step="site"}>‹ ${this.t("planner.step.site")}</button>`}
        </div>
      </aside>`;let t=this.draft.beds.filter(n=>n.zone_id===e.id),s=!this.admin;return l`<aside class="pane" aria-label=${e.name}>
      <header><button class="icon-btn" aria-label=${this.t("planner.whole_garden")} @click=${()=>this.closeZone()}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <h3>${Y[e.type]?.icon} ${e.name}</h3></header>
      <div class="pane-body stack">
        <label class="field">${this.t("planner.zone_name")}<input .value=${e.name} ?disabled=${s}
          @change=${n=>this.updateZone(e.id,{name:n.target.value})} /></label>
        <label class="field">${this.t("planner.kind")}
          <select ?disabled=${s} @change=${n=>this.updateZone(e.id,{type:n.target.value})}>
            ${Nt.map(n=>l`<option value=${n} ?selected=${e.type===n}>${this.t(`settings.zone_type.${n}`)}</option>`)}
          </select></label>
        <p class="xs muted">${this.t(`zone_hint.${e.type}`)}</p>
        <h4>${this.t("planner.beds_in_zone")} (${t.length})</h4>
        <div class="tool-grid">
          ${this.renderToolButton({kind:"bed"},"\u25AD",this.t("planner.draw_bed"))}
          ${Dt.filter(n=>["path","tree","trellis","water_butt","compost","flowerbed"].includes(n)).map(n=>this.renderToolButton({kind:"feature",type:n},Se[n]?.icon||"\u25AD",this.t(`feature.${n}`)))}
        </div>
        <div class="stack" style="gap:4px">${t.map(n=>l`<button class="zone-row as-btn" @click=${()=>this.onSelect({kind:"bed",id:n.id})}>
          <span>▭</span><span class="grow"><b>${n.name}</b> <span class="xs muted">${(n.width_cm/100).toFixed(1)} × ${(n.length_cm/100).toFixed(1)} m · ${this.t(`kind.${n.kind}`)}</span></span></button>`)}</div>
        <div class="divider"></div>
        <div class="row wrap">
          <button class="btn primary" @click=${()=>{this.step="plant",this.tool=null}}><ha-icon icon="mdi:sprout"></ha-icon>${this.t("planner.fill_by_hand")}</button>
          ${s?m:l`<button class="btn" @click=${()=>{this.autofillBeds=t.map(n=>n.id),this.openAutofill(t.map(n=>n.id))}}>
            <ha-icon icon="mdi:auto-fix"></ha-icon>${this.t("planner.fill_by_system")}</button>`}
        </div>
      </div>
    </aside>`}updateZone(e,t){let s=A(this.draft),n=s.zones.find(i=>i.id===e);n&&(Object.assign(n,t),this.commit(s))}renderPalette(){let e=this.search.trim().toLowerCase(),t=this.draft.zones.find(a=>a.id===this.focusZone),s=t?_s[t.type]:null,n=this.plants.filter(a=>s&&!this.categoryFilter&&!s.includes(a.category??"vegetable")||this.familyFilter&&a.family!==this.familyFilter||this.categoryFilter&&(a.category??"vegetable")!==this.categoryFilter?!1:e?[a.id,a.scientific_name,...Object.values(a.names)].some(o=>o.toLowerCase().includes(e)):!0).sort((a,o)=>_(a,this.lang).localeCompare(_(o,this.lang))),i=[...new Set(this.plants.map(a=>a.family))].sort();return l`
      <aside class="pane" aria-label=${this.t("planner.palette")}>
        <header>
          <h3>${this.t("planner.palette")}</h3>
          <span class="spacer"></span>
          <div class="segmented" role="group" aria-label=${this.t("planner.layout")}>
            ${["single","block","row"].map(a=>l`
              <button aria-pressed=${String(this.layoutMode===a)} @click=${()=>this.layoutMode=a}>${this.t(`planner.layout.${a}`)}</button>`)}
          </div>
        </header>
        <div class="pane-body stack">
          <input type="search" placeholder=${this.t("common.search")} aria-label=${this.t("common.search")} .value=${this.search}
            @input=${a=>this.search=a.target.value} />
          <div class="row wrap family-chips" role="group" aria-label=${this.t("lib.category")}>
            ${$i.map(a=>l`<button class="chip" aria-pressed=${String(this.categoryFilter===a)}
              @click=${()=>this.categoryFilter=this.categoryFilter===a?"":a}>${this.t(`category.${a}`)}</button>`)}
          </div>
          <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
            <select @change=${a=>this.familyFilter=a.target.value}>
              <option value="" ?selected=${!this.familyFilter}>${this.t("lib.family")}: ${this.t("common.all")}</option>
              ${i.map(a=>l`<option value=${a} ?selected=${this.familyFilter===a}>${this.families[a]?.[this.lang]??a}</option>`)}
            </select></label>
          ${t?l`<p class="xs zone-filter">${Y[t.type]?.icon} ${this.t("planner.palette_for_zone",{zone:t.name})}</p>`:m}
          <p class="xs muted">${this.t("planner.palette_hint")}</p>
          <div class="palette-list" role="list">
            ${n.map(a=>{let o=_(a,this.lang);return l`
                <button class="plant-card" role="listitem" aria-label=${`${o}, ${a.scientific_name}`}
                  @pointerdown=${c=>this.onPalettePointerDown(c,a)}
                  @pointermove=${this.onPalettePointerMove}
                  @pointerup=${this.onPalettePointerUp}
                  @pointercancel=${()=>this.paletteDrag=null}
                  @keydown=${c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),this.addToSelectedBed(a))}}>
                  <span class="swatch" style=${`border-color:${B(this.families,a.family)}`}>${ht(ke(a),a.color||B(this.families,a.family),26)}</span>
                  <span class="meta"><span>${o}${a.perennial?l` <span class="perennial-tag" title=${this.t("planner.perennial")}>∞</span>`:m}</span>
                    <span class="xs muted">${a.spacing_cm} cm · ${a.perennial&&a.years_to_bearing?this.t("planner.bears_after",{n:a.years_to_bearing}):`${a.days_to_maturity[0]}\u2013${a.days_to_maturity[1]} d`}</span></span>
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
            ${i.map(a=>l`<span><span class="family-dot" style=${`background:${B(this.families,a)}`}></span>${this.families[a]?.[this.lang]??a}</span>`)}
          </div>
          </div>
        </div>
      </aside>
    `}renderFindings(e,t){let s=this.reports[e]??this.snapshot.analysis?.beds[e]?.compatibility,n=this.reports[e]?.rotation??this.snapshot.analysis?.beds[e]?.rotation??[],i=(s?.pairs??[]).filter(u=>!t||u.a===t||u.b===t),a=n.filter(u=>!t||u.planting===t),o=(s?.placement??[]).filter(u=>!t||u.planting===t),c=t?s?.out_of_bounds?.includes(t):(s?.out_of_bounds?.length??0)>0,h={error:"mdi:alert-octagon-outline",warning:"mdi:alert-outline",info:"mdi:heart-outline"};return!i.length&&!a.length&&!c&&!o.length?l`<p class="small muted">${this.t("planner.no_warnings")}</p>`:l`<div class="stack" style="gap:6px">
      ${i.map(u=>l`<div class="finding ${u.severity}"><ha-icon icon=${h[u.severity]}></ha-icon><span>${this.t(u.key,u.params)}</span></div>`)}
      ${a.map(u=>l`<div class="finding ${u.severity}"><ha-icon icon="mdi:rotate-3d-variant"></ha-icon><span>${this.t(u.key,u.params)}
        <hl-info term="rotation" .t=${this.t}></hl-info>
        ${u.alternatives?.length?l`<br /><span class="xs">${this.t("planner.alternatives")}:
          ${u.alternatives.map(f=>l`<button class="chip" ?disabled=${!this.admin} @click=${()=>this.moveToBed(u.planting,f)}>${this.draft.beds.find(b=>b.id===f)?.name??f}</button>`)}</span>`:m}</span></div>`)}
      ${t&&s?.suggestions?.[t]?.length?l`<div class="finding info"><ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
        <span>${this.t("planner.better_neighbours")}: ${s.suggestions[t].map(u=>_(this.plantMap.get(u),this.lang)).join(", ")}</span></div>`:m}
      ${o.map(u=>l`<div class="finding warning"><ha-icon icon="mdi:greenhouse"></ha-icon><span>${this.t(u.key,u.params)}</span></div>`)}
      ${c?l`<div class="finding warning"><ha-icon icon="mdi:border-outside"></ha-icon><span>${this.t("planner.out_of_bounds")}</span></div>`:m}
    </div>`}renderTimeline(e){if(!e)return l`<p class="small muted">–</p>`;let s=this.snapshot.settings.region.hemisphere==="south"?`${this.season}-07-01`:`${this.season}-01-01`,n=485,i=h=>h?Math.max(0,Math.min(100,pe(s,h)/n*100)):null,a=(h,u,f,b,k)=>{let y=i(h),w=i(u);return y===null||w===null?m:l`<div class="bar" title=${`${k}: ${x(h,this.lang)} \u2013 ${x(u,this.lang)}`}
        style=${`left:${y}%;width:${Math.max(w-y,1)}%;top:${f}px;background:${b}`}></div>`},o=Array.from({length:16},(h,u)=>j(s,Math.round(u*30.4))),c=this.snapshot.analysis?.today;return l`
      <div class="timeline" role="img" aria-label=${`${this.t("lib.harvest")} ${x(e.harvest_start,this.lang)} \u2013 ${x(e.harvest_end,this.lang)}`}>
        ${a(e.sow_window?.start,e.sow_window?.end,6,"var(--hl-leaf-300)",this.t(e.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow"))}
        ${a(e.transplant_window?.start,e.transplant_window?.end,20,"var(--hl-leaf-600)",this.t("lib.transplant"))}
        ${a(e.in_ground,e.harvest_start,34,"color-mix(in srgb, var(--hl-leaf-500) 35%, transparent)",this.t("dash.active_crops",{n:1}))}
        ${a(e.harvest_start,e.harvest_end,34,"var(--hl-sun-500)",this.t("lib.harvest"))}
        ${o.filter((h,u)=>u%2===0).map(h=>l`<span class="month" style=${`left:${i(h)}%`}>${x(h,this.lang,{month:"short"})}</span>`)}
        ${c&&i(c)!==null?l`<div class="today" style=${`left:${i(c)}%`}></div>`:m}
      </div>
      <div class="xs muted" style="margin-top:4px">
        ${e.sow_date?l`${this.t(e.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}: <b>${x(e.sow_date,this.lang)}</b> · `:m}
        ${e.transplant_date?l`${this.t("lib.transplant")}: <b>${x(e.transplant_date,this.lang)}</b> · `:m}
        ${this.t("lib.harvest")}: <b>${x(e.harvest_start,this.lang)} – ${x(e.harvest_end,this.lang)}</b>
      </div>`}renderPhenology(e){let t=this.snapshot.analysis?.phenology?.[e];return!t||t.stage==="not_planted"?m:l`<div class="row wrap">
      <span class="chip ok"><ha-icon icon="mdi:sprout"></ha-icon>${this.t(`stage.${t.stage}`)}</span>
      <span class="chip">Kc ${t.kc.toFixed(2)} <hl-info term="kc" .t=${this.t}></hl-info></span>
      ${t.gdd!=null&&t.gdd_target?l`<span class="chip">${Math.round(t.gdd)} / ${t.gdd_target} GDD <hl-info term="gdd" .t=${this.t}></hl-info></span>`:m}
      ${t.harvest_estimate?l`<span class="chip warn"><ha-icon icon="mdi:basket-outline"></ha-icon>${this.t("cal.harvest_estimate",{date:x(t.harvest_estimate,this.lang)})}</span>`:m}
      ${t.heat_stress_days?l`<span class="chip bad">${this.t("planner.heat_stress",{n:t.heat_stress_days})}</span>`:m}
    </div>`}renderAutofill(){let e=this.autofillResources,t=o=>this.autofillResources={...e,...o},s=this.autofill,n=[...this.plants].sort((o,c)=>_(o,this.lang).localeCompare(_(c,this.lang))),i=()=>this.dialog=null,a=o=>this.draft.beds.find(c=>c.id===o)?.name??o;return l`<div class="stack">
      <h2><ha-icon icon="mdi:auto-fix"></ha-icon> ${this.t("autofill.title")} <hl-info term="autofill" .t=${this.t}></hl-info></h2>
      <p class="small muted">${this.t("autofill.intro",{season:this.season})}</p>
      <div class="form-grid">
        <label class="field">${this.t("autofill.household")}<input type="number" min="1" max="20" .value=${String(e.household_size)}
          @change=${o=>t({household_size:Number(o.target.value)})} /></label>
        <label class="field">${this.t("autofill.hours")}<input type="number" min="0" step="0.5" .value=${String(e.hours_per_week)}
          @change=${o=>t({hours_per_week:Number(o.target.value)})} /></label>
        <label class="field">${this.t("autofill.water")}<input type="number" min="0" step="10" placeholder="∞" .value=${String(e.water_liters_per_week??"")}
          @change=${o=>t({water_liters_per_week:o.target.value===""?null:Number(o.target.value)})} /></label>
        <label class="field">${this.t("autofill.compost")}<input type="number" min="0" step="5" placeholder="∞" .value=${String(e.compost_kg??"")}
          @change=${o=>t({compost_kg:o.target.value===""?null:Number(o.target.value)})} /></label>
        <label class="field full row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${e.irrigation}
          @change=${o=>t({irrigation:o.target.checked})} />${this.t("autofill.has_irrigation")}</label>
      </div>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.goals")}><span class="small">${this.t("autofill.goals")}:</span>
        ${yi.map(o=>l`<button class="chip" aria-pressed=${String(e.goals.includes(o))}
          @click=${()=>t({goals:e.goals.includes(o)?e.goals.filter(c=>c!==o):[...e.goals,o]})}>${this.t(`autofill.goal.${o}`)}</button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("autofill.wanted")}
          <select @change=${o=>{let c=o.target;c.value&&!e.wanted.includes(c.value)&&t({wanted:[...e.wanted,c.value]}),c.value=""}}>
            <option value="">+</option>${n.map(o=>l`<option value=${o.id}>${_(o,this.lang)}</option>`)}</select></label>
        <label class="field">${this.t("autofill.excluded")}
          <select @change=${o=>{let c=o.target;c.value&&!e.excluded.includes(c.value)&&t({excluded:[...e.excluded,c.value]}),c.value=""}}>
            <option value="">+</option>${n.map(o=>l`<option value=${o.id}>${_(o,this.lang)}</option>`)}</select></label>
      </div>
      <div class="row wrap">
        ${e.wanted.map(o=>l`<button class="chip ok" title=${this.t("common.delete")} @click=${()=>t({wanted:e.wanted.filter(c=>c!==o)})}>♥ ${_(this.plantMap.get(o),this.lang)} ✕</button>`)}
        ${e.excluded.map(o=>l`<button class="chip bad" title=${this.t("common.delete")} @click=${()=>t({excluded:e.excluded.filter(c=>c!==o)})}>⊘ ${_(this.plantMap.get(o),this.lang)} ✕</button>`)}
      </div>
      <fieldset class="prefs"><legend>${this.t("autofill.prefs")}</legend>
        <label class="field">${this.t("autofill.freedom")}
          <select @change=${o=>t({freedom:o.target.value})}>
            ${["strict","balanced","free"].map(o=>l`<option value=${o} ?selected=${(e.freedom??"balanced")===o}>${this.t(`autofill.freedom.${o}`)}</option>`)}
          </select></label>
        ${["respect_companions","add_pollinators","year_round","allow_perennials","match_zone_type"].map(o=>l`
          <label class="row small"><input type="checkbox" .checked=${e[o]??!["year_round"].includes(o)}
            @change=${c=>t({[o]:c.target.checked})} />${this.t(`autofill.pref.${o}`)}</label>`)}
      </fieldset>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.beds")}><span class="small">${this.t("autofill.beds")}:</span>
        ${this.draft.beds.map(o=>l`<button class="chip" aria-pressed=${String(this.autofillBeds.includes(o.id))}
          @click=${()=>this.autofillBeds=this.autofillBeds.includes(o.id)?this.autofillBeds.filter(c=>c!==o.id):[...this.autofillBeds,o.id]}>${o.name}</button>`)}
        <span class="xs muted">${this.autofillBeds.length?"":this.t("autofill.all_empty")}</span>
      </div>
      <label class="row small"><input type="checkbox" .checked=${this.autofillReplace} @change=${o=>this.autofillReplace=o.target.checked} />${this.t("autofill.replace")}</label>
      <div class="row"><button class="btn" ?disabled=${this.autofillBusy} @click=${()=>this.runAutofill()}><ha-icon icon="mdi:creation"></ha-icon>${this.t("autofill.propose")}</button></div>
      ${s?l`
        <div class="divider"></div>
        <div class="row wrap">
          <span class="chip ok">${this.t("autofill.sum_crops",{n:s.summary.crops})}</span>
          <span class="chip">${this.t("autofill.sum_yield",{kg:s.summary.yield_kg})}</span>
          <span class="chip">${this.t("autofill.sum_time",{min:s.summary.minutes_week})}</span>
          <span class="chip">${this.t("autofill.sum_water",{l:s.summary.water_l_week})}</span>
          <span class="chip">${this.t("autofill.sum_compost",{kg:s.summary.compost_kg})}</span>
        </div>
        ${s.warnings.map(o=>l`<div class="finding warning"><ha-icon icon="mdi:alert-outline"></ha-icon><span>${this.t(o.key,{...o.params,plants:Array.isArray(o.params.plants)?o.params.plants.map(c=>_(this.plantMap.get(c),this.lang)).join(", "):o.params.plants})}</span></div>`)}
        <div style="max-height:30vh;overflow:auto"><table class="shortcuts" style="width:100%">
          <tr><th align="left">${this.t("lib.plant")}</th><th align="left">${this.t("task.bed")}</th><th align="right">#</th><th align="right">m²</th><th align="right">kg</th></tr>
          ${s.placements.map(o=>l`<tr><td><span class="family-dot" style=${`background:${B(this.families,this.plantMap.get(o.plant_id)?.family)}`}></span>
            ${_(this.plantMap.get(o.plant_id),this.lang)}${o.sowings>1?l` <span class="xs muted">×${o.sowings}</span>`:m}</td>
            <td>${a(o.bed_id)}</td><td align="right">${o.count}</td><td align="right">${o.area_m2.toFixed(1)}</td><td align="right">${o.yield_kg.toFixed(1)}</td></tr>`)}
        </table></div>
        ${s.skipped.length?l`<p class="xs muted">${this.t("autofill.skipped")}: ${s.skipped.map(o=>`${_(this.plantMap.get(o.plant_id),this.lang)} (${this.t(`autofill.reason.${o.reason}`)})`).join(", ")}</p>`:m}
      `:m}
      <div class="row" style="justify-content:flex-end">
        <button class="btn ghost" @click=${i}>${this.t("common.cancel")}</button>
        <button class="btn primary" ?disabled=${!s?.plantings.length} @click=${()=>this.applyAutofill()}>${this.t("autofill.apply")}</button>
      </div>
    </div>`}renderInspector(){let e=this.selection,t=e?this.findItem(e):void 0,s=!this.admin,n;if(!e||!t)n=l`<p class="small muted">${this.t("planner.nothing_selected")}</p><p class="xs muted">${this.t("planner.multi_hint")}</p>`;else if(this.multi.length>1)n=l`<h3>${this.t("planner.selected_n",{n:this.multi.length})}</h3>
        <p class="small muted">${this.t("planner.multi_hint")}</p>
        <div class="row wrap">
          ${["left","hcenter","right","top","vcenter","bottom","hdistribute","vdistribute"].map(i=>l`
            <button class="btn small" ?disabled=${s||i.endsWith("distribute")&&this.multi.length<3} @click=${()=>this.align(i)}>${this.t(`planner.align.${i}`)}</button>`)}
        </div>
        ${!s&&(e.kind==="planting"||e.kind==="feature")?l`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`:m}`;else if(e.kind==="feature"){let i=t;n=l`<h3>${i.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${i.name} ?disabled=${s}
            @change=${a=>this.updateSelected({name:a.target.value})} /></label>
          <label class="field full">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${a=>this.updateSelected({type:a.target.value})}>
              ${Dt.map(a=>l`<option value=${a} ?selected=${i.type===a}>${this.t(`feature.${a}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(i.width_cm)} ?disabled=${s}
            @change=${a=>this.updateSelected({width_cm:Number(a.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(i.length_cm)} ?disabled=${s}
            @change=${a=>this.updateSelected({length_cm:Number(a.target.value)})} /></label>
          <label class="field full">${this.t("task.notes")}<textarea rows="2" .value=${i.notes} ?disabled=${s}
            @change=${a=>this.updateSelected({notes:a.target.value})}></textarea></label>
        </div>
        ${s?m:l`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}`}else if(e.kind==="planting"){let i=t,a=this.plantMap.get(i.plant_id),o=this.draft.beds.find(h=>h.id===i.bed_id),c=this.snapshot.analysis?.advice[i.id];n=l`
        <div class="row">
          <span class="family-dot" style=${`background:${B(this.families,a?.family)};width:14px;height:14px`}></span>
          <h3>${_(a,this.lang)}</h3>
        </div>
        <p class="xs muted">${a?.scientific_name} · ${this.families[a?.family??""]?.[this.lang]??a?.family} · ${o?.name}</p>
        ${a?.perennial?l`<div class="finding info"><ha-icon icon="mdi:all-inclusive"></ha-icon><span>${this.t("planner.perennial_since",{season:i.season})}
          ${a.years_to_bearing?l`<br />${this.t("planner.bearing_from",{season:i.season+a.years_to_bearing})}`:m}</span></div>`:m}
        ${a?.pollination&&a.pollination!=="self"?l`<p class="xs"><ha-icon icon="mdi:bee"></ha-icon> ${this.t(`pollination.${a.pollination}`)}</p>`:m}
        <div class="form-grid">
          <label class="field">${this.t("planner.layout")}
            <select ?disabled=${s} @change=${h=>this.updateSelected({layout:h.target.value})}>
              ${["single","block","row"].map(h=>l`<option value=${h} ?selected=${i.layout===h}>${this.t(`planner.layout.${h}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.status")}
            <select ?disabled=${s} @change=${h=>this.updateSelected({status:h.target.value})}>
              ${["planned","sown_indoors","sown","transplanted","harvesting","finished","failed"].map(h=>l`<option value=${h} ?selected=${i.status===h}>${this.t(`status.${h}`)}</option>`)}
            </select></label>
          <label class="field full">${this.t("planner.method")}
            <select ?disabled=${s} @change=${h=>this.updateSelected({method:h.target.value})}>
              ${["indoor_sow","direct_sow","transplant"].map(h=>l`<option value=${h} ?selected=${i.method===h}>${this.t(`planner.method.${h}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="5" step="5" .value=${String(Math.round(i.width_cm))} ?disabled=${s}
            @change=${h=>this.updateSelected({width_cm:Number(h.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="5" step="5" .value=${String(Math.round(i.length_cm))} ?disabled=${s}
            @change=${h=>this.updateSelected({length_cm:Number(h.target.value)})} /></label>
          <label class="field full">${this.t(i.method==="transplant"?"lib.transplant":i.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}
            <input type="date" ?disabled=${s} .value=${(i.method==="transplant"?i.transplant_date:i.sow_date)??""}
              @change=${h=>this.updateSelected(i.method==="transplant"?{transplant_date:h.target.value||null}:{sow_date:h.target.value||null})} /></label>
        </div>
        <p class="small">${a?this.t("planner.count",{n:Rs(i,a)}):""}</p>
        ${c?.reasons.length?l`<div class="stack" style="gap:4px">${c.reasons.filter(h=>h.key!=="reason.window_open").map(h=>l`<p class="small">${this.t(h.key,h.params)}</p>`)}</div>`:m}
        ${this.renderPhenology(i.id)}
        <h4>${this.t("planner.timeline")}</h4>
        ${this.renderTimeline(this.timelines[i.id])}
        <h4>${this.t("planner.warnings")}</h4>
        ${this.renderFindings(i.bed_id,i.id)}
        ${a?.tips?.[this.lang]?.length||a?.tips?.en?.length?l`<details class="tips" open><summary>${this.t("planner.eco_tips")}</summary>
          <ul>${(a.tips[this.lang]??a.tips.en).map(h=>l`<li>${h}</li>`)}</ul></details>`:m}
        ${s?m:l`
          <div class="row wrap">
            <button class="btn small" @click=${()=>this.dialog="succession"}><ha-icon icon="mdi:calendar-multiple"></ha-icon>${this.t("planner.succession")}</button>
            <button class="btn small ghost" @click=${()=>this.duplicateSelected()}>${this.t("planner.duplicate")}</button>
            <button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>
          </div>`}
      `}else if(e.kind==="bed"){let i=t,a=this.snapshot.analysis?.beds[i.id],o=this.reports[i.id]??a?.compatibility;n=l`
        <h3>${i.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${i.name} ?disabled=${s}
            @change=${c=>this.updateSelected({name:c.target.value})} /></label>
          <label class="field">${this.t("planner.zone")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({zone_id:c.target.value})}>
              ${this.draft.zones.map(c=>l`<option value=${c.id} ?selected=${i.zone_id===c.id}>${c.name}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({kind:c.target.value})}>
              ${["in_ground","raised","container"].map(c=>l`<option value=${c} ?selected=${i.kind===c}>${this.t(`kind.${c}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(i.width_cm)} ?disabled=${s}
            @change=${c=>this.updateSelected({width_cm:Number(c.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(i.length_cm)} ?disabled=${s}
            @change=${c=>this.updateSelected({length_cm:Number(c.target.value)})} /></label>
          <label class="field">${this.t("planner.soil")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({soil:c.target.value})}>
              ${["sandy","loam","clay","silt","peat","chalk","potting_mix"].map(c=>l`<option value=${c} ?selected=${i.soil===c}>${this.t(`soil.${c}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.orientation")}<input type="number" min="0" max="359" step="15" .value=${String(i.orientation_deg)} ?disabled=${s}
            @change=${c=>this.updateSelected({orientation_deg:Number(c.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(i.shade_pct??"")} ?disabled=${s}
            @change=${c=>this.updateSelected({shade_pct:c.target.value===""?null:Number(c.target.value)})} /></label>
        </div>
        ${a?l`
          <div class="row wrap">
            <span class="chip ${a.moisture_status==="optimal"?"ok":a.moisture_status==="dry"?"bad":a.moisture_status==="unknown"?"":"warn"}">
              <ha-icon icon="mdi:water-percent"></ha-icon>${this.t(`moisture.${a.moisture_status}`)}${a.irrigation.moisture!=null?` \xB7 ${Math.round(a.irrigation.moisture)}%`:""}</span>
            <span class="chip">${this.t(`irrigation.${a.irrigation.action}`,{mm:a.irrigation.amount_mm,liters:Math.round(a.irrigation.liters)})}</span>
          </div>`:m}
        <div class="row"><span class="score">${Math.round(o?.score??50)}</span><span class="small muted">${this.t("planner.score")}</span></div>
        ${this.renderFindings(i.id)}
        ${s?m:l`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}
      `}else{let i=t;n=l`
        <h3>${i.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${i.name} ?disabled=${s}
            @change=${a=>this.updateSelected({name:a.target.value})} /></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${a=>this.updateSelected({type:a.target.value})}>
              ${Nt.map(a=>l`<option value=${a} ?selected=${i.type===a}>${this.t(`settings.zone_type.${a}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.wind")}
            <select ?disabled=${s} @change=${a=>this.updateSelected({wind:a.target.value},"microclimate")}>
              ${["sheltered","moderate","exposed"].map(a=>l`<option value=${a} ?selected=${i.microclimate.wind===a}>${this.t(`wind.${a}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="50" step="10" .value=${String(i.width_cm)} ?disabled=${s}
            @change=${a=>this.updateSelected({width_cm:Number(a.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="50" step="10" .value=${String(i.length_cm)} ?disabled=${s}
            @change=${a=>this.updateSelected({length_cm:Number(a.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(i.microclimate.shade_pct)} ?disabled=${s}
            @change=${a=>this.updateSelected({shade_pct:Number(a.target.value)},"microclimate")} /></label>
          <label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${i.microclimate.heated} ?disabled=${s}
            @change=${a=>this.updateSelected({heated:a.target.checked},"microclimate")} />${this.t("settings.heated")}</label>
          <label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${!!i.microclimate.wall_heat} ?disabled=${s}
            @change=${a=>this.updateSelected({wall_heat:a.target.checked},"microclimate")} />${this.t("settings.wall_heat")}
            <hl-info term="microclimate" .t=${this.t}></hl-info></label>
          ${i.type==="greenhouse"||i.type==="cold_frame"?l`<label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${!!i.microclimate.thermal_mass} ?disabled=${s}
            @change=${a=>this.updateSelected({thermal_mass:a.target.checked},"microclimate")} />${this.t("settings.thermal_mass")}</label>`:m}
        </div>
        <div class="row wrap">
          <button class="btn small" @click=${()=>this.openZone(i.id)}><ha-icon icon="mdi:map-search-outline"></ha-icon>${this.t("planner.open_zone")}</button>
          ${s?m:l`<button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>`}
        </div>
      `}return l`<aside class="pane" aria-label=${this.t("planner.inspector")}>
      <header><h3>${this.t("planner.inspector")}</h3></header>
      <div class="pane-body stack">${n}</div>
    </aside>`}renderDialog(){if(this.removing){let s=this.removing,n=_(this.plantMap.get(s.plant_id),this.lang);return l`<dialog @close=${()=>this.removing=null}>
        <div class="stack">
          <h2><ha-icon icon="mdi:tree-outline"></ha-icon> ${this.t("planner.remove_perennial",{name:n})}</h2>
          <p class="small">${this.t("planner.remove_perennial_intro",{name:n,season:s.season})}</p>
          <button class="btn primary" @click=${()=>this.removePerennial("season")}>${this.t("planner.remove_from_season",{season:this.season})}</button>
          <p class="xs muted">${this.t("planner.remove_from_season_hint")}</p>
          <button class="btn danger" @click=${()=>this.removePerennial("delete")}>${this.t("planner.remove_everywhere")}</button>
          <p class="xs muted">${this.t("planner.remove_everywhere_hint")}</p>
          <div class="row" style="justify-content:flex-end"><button class="btn ghost" @click=${()=>this.removing=null}>${this.t("common.cancel")}</button></div>
        </div></dialog>`}if(!this.dialog)return m;let e=()=>this.dialog=null,t;if(this.dialog==="shortcuts"){let s=[["\u2190 \u2191 \u2192 \u2193","shortcut.move"],["Alt + \u2190 \u2191 \u2192 \u2193","planner.width"],["Ctrl + Z","shortcut.undo"],["Ctrl + Y","shortcut.redo"],["Delete","shortcut.delete"],["Ctrl + D","shortcut.duplicate"],["[ ]","shortcut.cycle"],["G","shortcut.grid"],["C","shortcut.companions"],["M","shortcut.moisture"],["+ / \u2212 / 0","shortcut.zoom"],["Esc","shortcut.escape"],["?","shortcut.help"]];t=l`<h2>${this.t("planner.shortcuts")}</h2>
        <table class="shortcuts">${s.map(([n,i])=>l`<tr><td><kbd>${n}</kbd></td><td>${this.t(i)}</td></tr>`)}</table>
        <div class="row" style="justify-content:flex-end"><button class="btn" @click=${e}>${this.t("common.close")}</button></div>`}else if(this.dialog==="autofill")t=this.renderAutofill();else if(this.dialog==="succession"){let s=this.selection?this.draft.plantings.find(i=>i.id===this.selection.id):void 0,n=s&&this.plantMap.get(s.plant_id);t=l`<form class="stack" @submit=${this.createSuccession}>
        <h2>${this.t("planner.succession")} – ${_(n,this.lang)}</h2>
        <label class="field">${this.t("planner.succession_count")}<input name="count" type="number" min="2" max="12" value="3" required /></label>
        <label class="field">${this.t("planner.succession_interval")}<input name="interval" type="number" min="3" max="90" .value=${String(n?.succession_interval_days??21)} /></label>
        <label class="field">${this.t("planner.succession_placement")}
          <select name="placement"><option value="split">${this.t("planner.succession.split")}</option><option value="stack">${this.t("planner.succession.stack")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${e}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.succession_create")}</button></div>
      </form>`}else t=l`<form class="stack" @submit=${this.importPlan}>
        <h2>${this.t("planner.import")}</h2>
        <input name="file" type="file" accept=".json,.yaml,.yml,application/json,application/yaml" required />
        <label class="field">${this.t("planner.import_mode")}
          <select name="mode"><option value="merge">${this.t("planner.import_merge")}</option><option value="replace">${this.t("planner.import_replace")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${e}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.import")}</button></div>
      </form>`;return l`<dialog @close=${e} style=${this.dialog==="autofill"?"max-width:760px":""}>${t}</dialog>`}};$.styles=[L,z`
      :host { display: block; height: 100%; }
      .layout { display: grid; grid-template-columns: 260px 1fr 320px; gap: var(--hl-s3); height: calc(100vh - 150px); min-height: 520px; }
      .layout.narrow { grid-template-columns: 1fr; height: auto; }
      .layout.narrow hl-garden-canvas { height: 58vh; }
      /* Mobile: canvas first, palette becomes a horizontal strip, inspector last. */
      .layout.narrow .center { order: -1; }
      .layout.narrow .palette-list { flex-direction: row; overflow-x: auto; padding-bottom: 4px; scroll-snap-type: x proximity; }
      .layout.narrow .plant-card { min-width: 168px; scroll-snap-align: start; }
      .layout.narrow .family-chips { flex-wrap: nowrap; overflow-x: auto; }
      .layout.narrow .legend-block { display: none; }
      .layout.palette-closed { grid-template-columns: 0 1fr 320px; }
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
      .tool-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(74px, 1fr)); gap: 6px; }
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
      .plant-glyph { display: block; }
      .readonly-note { font-size: var(--hl-fs-xs); color: var(--hl-warning); }
      dialog { border: none; border-radius: var(--hl-r-lg); padding: var(--hl-s5); max-width: 520px; width: calc(100% - 32px); background: var(--hl-surface); color: var(--hl-text); box-shadow: var(--hl-shadow-3); }
      dialog::backdrop { background: rgba(20, 24, 18, 0.45); }
      kbd { font-family: ui-monospace, monospace; font-size: 12px; background: var(--hl-surface-2); border: 1px solid var(--hl-border); border-bottom-width: 2px; border-radius: 4px; padding: 1px 6px; }
      table.shortcuts td { padding: 4px 8px; }
      .drag-ghost-hint { position: absolute; left: 50%; top: 12px; transform: translateX(-50%); background: var(--hl-surface); border: 1px solid var(--hl-border);
        padding: 6px 12px; border-radius: var(--hl-r-pill); box-shadow: var(--hl-shadow-2); font-size: var(--hl-fs-sm); pointer-events: none; max-width: 90%; }
    `],p([g({attribute:!1})],$.prototype,"snapshot",2),p([g({attribute:!1})],$.prototype,"plants",2),p([g({attribute:!1})],$.prototype,"families",2),p([g({attribute:!1})],$.prototype,"api",2),p([g({attribute:!1})],$.prototype,"t",2),p([g()],$.prototype,"lang",2),p([g({type:Boolean})],$.prototype,"admin",2),p([g({type:Boolean})],$.prototype,"narrow",2),p([v()],$.prototype,"draft",2),p([v()],$.prototype,"selection",2),p([v()],$.prototype,"multi",2),p([v()],$.prototype,"showFeatures",2),p([v()],$.prototype,"showPlantings",2),p([v()],$.prototype,"showZones",2),p([v()],$.prototype,"categoryFilter",2),p([v()],$.prototype,"autofill",2),p([v()],$.prototype,"autofillBusy",2),p([v()],$.prototype,"autofillReplace",2),p([v()],$.prototype,"autofillBeds",2),p([v()],$.prototype,"autofillResources",2),p([v()],$.prototype,"season",2),p([v()],$.prototype,"saveState",2),p([v()],$.prototype,"reports",2),p([v()],$.prototype,"extraTimelines",2),p([v()],$.prototype,"snapOn",2),p([v()],$.prototype,"showCompanions",2),p([v()],$.prototype,"showMoisture",2),p([v()],$.prototype,"showTemperature",2),p([v()],$.prototype,"viewDate",2),p([v()],$.prototype,"layoutMode",2),p([v()],$.prototype,"search",2),p([v()],$.prototype,"familyFilter",2),p([v()],$.prototype,"paletteDrag",2),p([v()],$.prototype,"ghostReport",2),p([v()],$.prototype,"dialog",2),p([v()],$.prototype,"announcement",2),p([v()],$.prototype,"paletteOpen",2),p([v()],$.prototype,"step",2),p([v()],$.prototype,"tool",2),p([v()],$.prototype,"focusZone",2),p([v()],$.prototype,"removing",2),p([Je("hl-garden-canvas")],$.prototype,"canvas",2),$=p([R("hl-planner-view")],$);var _i={id:"",names:{en:"",nl:""},scientific_name:"",family:"Asteraceae",variety:null,habit:"bush",perennial:!1,spacing_cm:30,row_spacing_cm:30,sowing_depth_cm:1,germination_days:[7,14],min_soil_temp_c:8,optimal_soil_temp_c:18,max_soil_temp_c:null,days_to_maturity:[60,80],maturity_from:"sow",harvest_duration_days:14,harvestable:!0,continuous_harvest:!1,harvest_interval_days:null,transplant_age_days:[35,49],sowing:{indoor_sow:[],direct_sow:[{start_week:-2,end_week:8,anchor:"last_frost"}],transplant:[]},greenhouse:{suitability:"conditional",min_night_c:5,max_day_c:30,season_extension_weeks:2,notes:{}},frost_tolerance:"half_hardy",min_temp_c:0,max_temp_c:30,companions:[],rotation_years:3,pests:[],diseases:[],water_needs:"medium",nutrient_needs:"medium",feeding_interval_days:null,care:[],pruning_notes:{},thinning:!1,succession_interval_days:null,gdd_base_c:10,gdd_to_maturity:null,tags:[],source:"custom"},I=class extends T{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.query="";this.family="";this.category="";this.filter="";this.selected=null;this.editing=null;this.error=""}get anchors(){return this.snapshot.analysis?.anchors??{last_frost:`${new Date().getFullYear()}-04-20`,first_frost:`${new Date().getFullYear()}-10-25`}}seasonStart(){let e=this.anchors.last_frost;return this.snapshot.settings.region.hemisphere==="south"?`${e.slice(0,4)}-07-01`:`${e.slice(0,4)}-01-01`}renderCalendar(e){let t=this.seasonStart(),s=c=>Math.max(0,Math.min(100,pe(t,c)/365*100)),n=[],i=(c,h,u)=>{for(let f of c){let[b,k]=Rt(f,this.anchors);n.push(l`<div class="b" style=${`left:${s(b)}%;width:${Math.max(s(k)-s(b),1)}%;top:${h}px;background:${u}`}></div>`)}};i(e.sowing.indoor_sow,2,"var(--hl-leaf-300)"),i(e.sowing.direct_sow,8,"var(--hl-leaf-500)"),i(e.sowing.transplant,14,"var(--hl-leaf-700)");let a=[...e.sowing.direct_sow,...e.sowing.transplant][0];if(a&&e.harvestable){let[c,h]=Rt(a,this.anchors),u=e.maturity_from==="transplant"&&!e.sowing.transplant.length?e.germination_days[1]+14:0;n.push(l`<div class="b" style=${`left:${s(j(c,e.days_to_maturity[0]+u))}%;width:${Math.max(s(j(h,e.days_to_maturity[1]+u+e.harvest_duration_days))-s(j(c,e.days_to_maturity[0]+u)),1)}%;top:20px;background:var(--hl-sun-500)`}></div>`)}let o=Array.from({length:12},(c,h)=>x(j(t,Math.round(h*30.5+10)),this.lang,{month:"narrow"}));return l`<div class="cal" role="img" aria-label=${this.t("lib.calendar")}>${o.map(c=>l`<div class="m">${c}</div>`)}${n}</div>`}filtered(){let e=this.query.trim().toLowerCase();return this.plants.filter(t=>!this.family||t.family===this.family).filter(t=>!this.category||(t.category??"vegetable")===this.category).filter(t=>this.filter!=="greenhouse"||t.greenhouse.suitability==="yes").filter(t=>this.filter!=="quick"||t.days_to_maturity[0]<=50).filter(t=>this.filter!=="custom"||t.source!=="builtin").filter(t=>!e||[t.id,t.scientific_name,t.family,this.families[t.family]?.[this.lang]??"",...Object.values(t.names)].some(s=>s.toLowerCase().includes(e))).sort((t,s)=>_(t,this.lang).localeCompare(_(s,this.lang)))}render(){let e=[...new Set(this.plants.map(t=>t.family))].sort();return l`
      <div class="top">
        <input type="search" placeholder=${this.t("lib.search")} aria-label=${this.t("lib.search")} .value=${this.query}
          @input=${t=>this.query=t.target.value} />
        <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
          <select style="width:auto" @change=${t=>this.family=t.target.value}>
            ${["",...e].map(t=>l`<option value=${t} ?selected=${t===this.family}>${t?this.families[t]?.[this.lang]??t:`${this.t("lib.family")}: ${this.t("common.all")}`}</option>`)}
          </select>
        </label>
        <label class="row small"><span class="visually-hidden">${this.t("lib.category")}</span>
          <select style="width:auto" @change=${t=>this.category=t.target.value}>
            ${["","vegetable","herb","fruit","flower"].map(t=>l`<option value=${t} ?selected=${t===this.category}>${t?this.t(`category.${t}`):`${this.t("lib.category")}: ${this.t("common.all")}`}</option>`)}
          </select>
        </label>
        <span class="small muted">${this.t("lib.count",{n:this.filtered().length})}</span>
        ${["greenhouse","quick","custom"].map(t=>l`
          <button class="chip" aria-pressed=${String(this.filter===t)} @click=${()=>this.filter=this.filter===t?"":t}>${this.t(`lib.filter_${t}`)}</button>`)}
        <span class="spacer"></span>
        ${this.admin?l`<button class="btn primary small" @click=${()=>this.editing={plant:structuredClone(_i),mode:"custom"}}>
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("lib.add_custom")}</button>`:m}
      </div>
      <div class="legend-row" aria-hidden="true">
        <span style="--c:var(--hl-leaf-300)">${this.t("lib.indoor_sow")}</span><span style="--c:var(--hl-leaf-500)">${this.t("lib.direct_sow")}</span>
        <span style="--c:var(--hl-leaf-700)">${this.t("lib.transplant")}</span><span style="--c:var(--hl-sun-500)">${this.t("lib.harvest")}</span>
      </div>
      <div class="grid" style="margin-top:12px">
        ${this.filtered().map(t=>l`
          <button class="pcard" @click=${()=>this.selected=t} aria-label=${_(t,this.lang)}>
            <div class="stripe" style=${`background:${B(this.families,t.family)}`}></div>
            <div class="inner">
              <div class="row"><h3>${_(t,this.lang)}</h3><span class="spacer"></span>
                ${t.source!=="builtin"?l`<span class="chip warn">${this.t(`lib.source.${t.source}`)}</span>`:m}</div>
              <span class="xs muted"><i>${t.scientific_name}</i>${t.variety?` \xB7 ${t.variety}`:""}</span>
              <div class="facts">
                <span><b>${t.spacing_cm} cm</b>${this.t("lib.spacing")}</span>
                <span><b>${t.days_to_maturity[0]}–${t.days_to_maturity[1]}</b>${this.t("lib.maturity")}</span>
                <span><b>${this.t(`level.${t.water_needs}`)}</b>${this.t("lib.water")}</span>
              </div>
              ${this.renderCalendar(t)}
            </div>
          </button>`)}
      </div>
      ${this.selected?this.renderDetail(this.selected):m}
      ${this.editing?this.renderEditor():m}
    `}renderDetail(e){let t=this.lang,s=i=>{let a=new Map;for(let o of e.companions)o.relation===i&&a.set(o.plant,o.reason[t]??o.reason.en??"");for(let o of this.plants)for(let c of o.companions)c.plant===e.id&&c.relation===i&&!a.has(o.id)&&a.set(o.id,c.reason[t]??c.reason.en??"");return[...a.entries()]},n=i=>_(this.plants.find(a=>a.id===i),this.lang);return l`
      <aside class="drawer" role="dialog" aria-modal="false" aria-label=${_(e,this.lang)} @keydown=${i=>i.key==="Escape"&&(this.selected=null)}>
        <header style=${`border-top: 6px solid ${B(this.families,e.family)}`}>
          <div class="stack" style="gap:2px"><h2>${_(e,this.lang)}</h2>
            <span class="small muted"><i>${e.scientific_name}</i> · ${this.families[e.family]?.[t]??e.family}</span></div>
          <span class="spacer"></span>
          <button class="icon-btn" aria-label=${this.t("common.close")} @click=${()=>this.selected=null}><ha-icon icon="mdi:close"></ha-icon></button>
        </header>
        <div class="content">
          ${this.renderCalendar(e)}
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
            ${e.category?l`<span>${this.t("lib.category")}</span><span>${this.t(`category.${e.category}`)}${e.perennial?` \xB7 ${this.t("lib.perennial")}`:""}</span>`:m}
            ${e.height_cm?l`<span>${this.t("lib.height")}</span><span>${e.height_cm} cm · ${this.t("lib.roots")} ${e.root_depth_cm??"?"} cm</span>`:m}
            ${e.kc?l`<span>Kc <hl-info term="kc" .t=${this.t}></hl-info></span><span>${e.kc.map(i=>i.toFixed(2)).join(" \u2192 ")}</span>`:m}
            ${e.npk?l`<span>N · P · K <hl-info term="npk" .t=${this.t}></hl-info></span><span>${e.npk.join(" \xB7 ")} / 3</span>`:m}
            ${e.gdd_to_maturity?l`<span>${this.t("lib.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span>${e.gdd_to_maturity} °C·d (${this.t("lib.base")} ${e.gdd_base_c} °C)</span>`:m}
            ${e.plants_per_person?l`<span>${this.t("lib.per_person")}</span><span>${e.plants_per_person} · ${e.yield_kg_m2??"?"} kg/m²</span>`:m}
          </div>
          ${e.deters?.length||e.trap_for?.length||e.allelopathic||e.shade_tolerant?l`<div class="row wrap">
            ${(e.deters??[]).map(i=>l`<span class="chip ok" title=${this.t("lib.deters")}>🛡 ${Oe(i,this.lang)}</span>`)}
            ${(e.trap_for??[]).map(i=>l`<span class="chip warn" title=${this.t("lib.trap_for")}>🪤 ${Oe(i,this.lang)} <hl-info term="trap_crop" .t=${this.t}></hl-info></span>`)}
            ${e.allelopathic?l`<span class="chip bad">${this.t("lib.allelopathic")} <hl-info term="allelopathy" .t=${this.t}></hl-info></span>`:m}
            ${e.shade_tolerant?l`<span class="chip cold">${this.t("lib.shade_tolerant")}</span>`:m}
          </div>`:m}
          ${e.greenhouse.notes[t]?l`<p class="small">${e.greenhouse.notes[t]}</p>`:m}
          <section class="stack"><h3>${this.t("lib.friends")}</h3>
            ${s("friend").map(([i,a])=>l`<div class="rel"><span class="chip ok">${n(i)}</span><span class="muted">${a}</span></div>`)}</section>
          <section class="stack"><h3>${this.t("lib.enemies")}</h3>
            ${s("enemy").length?s("enemy").map(([i,a])=>l`<div class="rel"><span class="chip bad">${n(i)}</span><span class="muted">${a}</span></div>`):l`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.pests")} & ${this.t("lib.diseases")}</h3>
            <div class="row wrap">${e.pests.map(i=>l`<span class="chip warn">${Oe(i,this.lang)}</span>`)}${e.diseases.map(i=>l`<span class="chip bad">${Oe(i,this.lang)}</span>`)}</div></section>
          ${e.care.length||e.pruning_notes[t]?l`<section class="stack"><h3>${this.t("lib.care")}</h3>
            ${e.care.map(i=>l`<p class="small"><b>${this.t(`type.${i.task}`)}</b>${i.interval_days?` \xB7 \u21BB ${i.interval_days} d`:""} – ${i.notes[t]??i.notes.en??""}</p>`)}
            ${e.pruning_notes[t]?l`<p class="small">${e.pruning_notes[t]}</p>`:m}</section>`:m}
          ${this.admin?l`<div class="row">
            <button class="btn" @click=${()=>this.editing={plant:structuredClone(e),mode:e.source==="custom"?"custom":"override"}}>
              <ha-icon icon="mdi:pencil"></ha-icon>${this.t("lib.customize")}</button>
            ${e.source!=="builtin"?l`<button class="btn danger" @click=${()=>this.removePlant(e)}>${e.source==="override"?this.t("lib.reset"):this.t("common.delete")}</button>`:m}
          </div>`:m}
        </div>
      </aside>`}async removePlant(e){try{await this.api.deletePlant(e.id),this.selected=null,this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0}))}catch(t){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t.message},bubbles:!0,composed:!0}))}}async save(e){e.preventDefault();let{plant:t,mode:s}=this.editing,n=e.target,i=f=>n.elements.namedItem(f).value,a=f=>Number(i(f)),o=f=>n.elements.namedItem(`${f}_on`).checked?[{start_week:a(`${f}_start`),end_week:a(`${f}_end`),anchor:"last_frost"}]:[],c=i("name_en").trim(),h={...t,id:s==="custom"&&!t.id?c.toLowerCase().normalize("NFKD").replace(/[^\w]+/g,"_").replace(/^_|_$/g,"")||"plant":t.id,names:{...t.names,en:c,nl:i("name_nl").trim()||c},scientific_name:i("scientific"),variety:i("variety")||null,family:i("family"),habit:i("habit"),spacing_cm:a("spacing"),row_spacing_cm:a("row_spacing"),sowing_depth_cm:a("depth"),germination_days:[a("germ_min"),a("germ_max")],min_soil_temp_c:a("soil_temp"),days_to_maturity:[a("dtm_min"),a("dtm_max")],maturity_from:i("maturity_from"),frost_tolerance:i("frost"),min_temp_c:a("min_temp"),max_temp_c:a("max_temp"),water_needs:i("water"),nutrient_needs:i("nutrients"),rotation_years:a("rotation"),greenhouse:{...t.greenhouse,suitability:i("gh")},sowing:{indoor_sow:o("indoor"),direct_sow:o("direct"),transplant:o("transplant")},pests:i("pests").split(",").map(f=>f.trim().replace(/\s+/g,"_")).filter(Boolean),diseases:i("diseases").split(",").map(f=>f.trim().replace(/\s+/g,"_")).filter(Boolean)},u=h;if(s==="override"){u={id:h.id};for(let f of Object.keys(h))f!=="source"&&JSON.stringify(h[f])!==JSON.stringify(t[f])&&(u[f]=h[f])}try{let f=await this.api.savePlant(u,s);this.editing=null,this.selected=f.plant,this.error="",this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("lib.saved",{plant:_(f.plant,this.lang)})},bubbles:!0,composed:!0}))}catch(f){this.error=f.message??String(f)}}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal()}renderEditor(){let{plant:e,mode:t}=this.editing,s=(i,a,o,c)=>l`
      <select name=${i}>${o.map(h=>l`<option value=${h} ?selected=${h===a}>${c?this.t(`${c}.${h}`):this.families[h]?.[this.lang]??h}</option>`)}</select>`,n=(i,a,o)=>l`
      <label class="row small"><input type="checkbox" name=${`${i}_on`} ?checked=${!!o} />${a}</label>
      <label class="field">${this.t("lib.from")} (${this.t("lib.weeks")})<input name=${`${i}_start`} type="number" min="-30" max="30" .value=${String(o?.start_week??-4)} /></label>
      <label class="field">${this.t("lib.to")} (${this.t("lib.weeks")})<input name=${`${i}_end`} type="number" min="-30" max="40" .value=${String(o?.end_week??2)} /></label>`;return l`<dialog @close=${()=>this.editing=null} style="border:none;border-radius:16px;padding:0;width:min(640px,calc(100vw - 32px));background:var(--hl-surface);color:var(--hl-text)">
      <form class="stack" style="padding:24px;max-height:85vh;overflow:auto" @submit=${this.save}>
        <h2>${t==="custom"&&!e.id?this.t("lib.add_custom"):`${this.t("lib.customize")}: ${_(e,this.lang)}`}</h2>
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
        ${this.error?l`<p class="field-error" role="alert">${this.error}</p>`:m}
        <div class="row" style="justify-content:flex-end">
          <button type="button" class="btn ghost" @click=${()=>this.editing=null}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("common.save")}</button>
        </div>
      </form>
    </dialog>`}};I.styles=[L,z`
      .top { display: flex; flex-wrap: wrap; gap: var(--hl-s2); align-items: center; margin-bottom: var(--hl-s3); }
      .top input[type="search"] { max-width: 360px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--hl-s3); }
      .pcard { text-align: left; border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); background: var(--hl-surface); padding: 0; cursor: pointer;
        overflow: hidden; display: flex; flex-direction: column; color: var(--hl-text); transition: box-shadow var(--hl-dur) var(--hl-ease), transform var(--hl-dur) var(--hl-ease); }
      .pcard:hover { box-shadow: var(--hl-shadow-2); transform: translateY(-1px); }
      .pcard .stripe { height: 6px; }
      .pcard .inner { padding: var(--hl-s3) var(--hl-s4); display: flex; flex-direction: column; gap: var(--hl-s2); }
      .facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
      .facts b { display: block; color: var(--hl-text); font-size: var(--hl-fs-sm); }
      .cal { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1px; position: relative; height: 34px; }
      .cal .m { background: var(--hl-surface-2); font-size: 9px; color: var(--hl-text-muted); text-align: center; padding-top: 22px; }
      .cal .b { position: absolute; height: 5px; border-radius: 3px; }
      .drawer { position: fixed; top: 0; right: 0; bottom: 0; width: min(520px, 100vw); background: var(--hl-surface); box-shadow: var(--hl-shadow-3);
        z-index: 5; display: flex; flex-direction: column; border-left: 1px solid var(--hl-border); }
      .drawer header { padding: var(--hl-s4) var(--hl-s5); border-bottom: 1px solid var(--hl-border); display: flex; gap: var(--hl-s2); align-items: center; }
      .drawer .content { padding: var(--hl-s4) var(--hl-s5); overflow: auto; display: flex; flex-direction: column; gap: var(--hl-s4); }
      .kv { display: grid; grid-template-columns: 1fr 1fr; gap: 6px var(--hl-s4); font-size: var(--hl-fs-sm); }
      .kv span:nth-child(odd) { color: var(--hl-text-muted); }
      .rel { display: flex; gap: var(--hl-s2); align-items: flex-start; font-size: var(--hl-fs-sm); }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      fieldset { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); margin: 0; }
      legend { font-weight: 600; font-size: var(--hl-fs-sm); padding: 0 4px; }
      .legend-row { display: flex; gap: var(--hl-s3); font-size: var(--hl-fs-xs); color: var(--hl-text-muted); flex-wrap: wrap; }
      .legend-row span::before { content: ""; display: inline-block; width: 14px; height: 5px; border-radius: 3px; margin-right: 4px; vertical-align: middle; background: var(--c); }
    `],p([g({attribute:!1})],I.prototype,"snapshot",2),p([g({attribute:!1})],I.prototype,"plants",2),p([g({attribute:!1})],I.prototype,"families",2),p([g({attribute:!1})],I.prototype,"api",2),p([g({attribute:!1})],I.prototype,"t",2),p([g()],I.prototype,"lang",2),p([g({type:Boolean})],I.prototype,"admin",2),p([v()],I.prototype,"query",2),p([v()],I.prototype,"family",2),p([v()],I.prototype,"category",2),p([v()],I.prototype,"filter",2),p([v()],I.prototype,"selected",2),p([v()],I.prototype,"editing",2),p([v()],I.prototype,"error",2),I=p([R("hl-library-view")],I);var Z=class extends T{constructor(){super(...arguments);this.lang="en";this.plants=new Map;this.families={};this.mode="month";this.cursor="";this.showDone=!1;this.bedFilter=""}willUpdate(){this.cursor||(this.cursor=this.today)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get today(){return this.snapshot.analysis?.today??$e(new Date)}get tasks(){return this.snapshot.tasks.filter(e=>(this.showDone||e.status==="open")&&e.status!=="skipped"&&(!this.bedFilter||e.bed_id===this.bedFilter))}byDay(){let e=new Map;for(let t of De(this.tasks)){let s=t.status==="open"&&t.due<this.today?this.today:t.due;e.set(s,[...e.get(s)??[],t])}return e}move(e){let t=J(this.cursor);this.mode==="timeline"?t.setFullYear(t.getFullYear()+e):this.mode==="month"?t.setMonth(t.getMonth()+e,1):t.setDate(t.getDate()+e*(this.mode==="week"?7:30)),this.cursor=$e(t)}weekStart(e){let s=(J(e).getDay()+6)%7;return j(e,-s)}renderEvent(e){let t=e.status==="open"&&e.due<this.today;return l`<button class="ev ${e.status!=="open"?"done":""} ${t?"overdue":""}" style=${`border-left-color:${ye[e.type]??"var(--hl-soil-500)"}`}
      title=${e.title} @click=${()=>this.emit("open-task",e)}>
      <ha-icon icon=${be[e.type]}></ha-icon><span>${e.title}</span></button>`}renderMonth(){let e=J(this.cursor);e.setDate(1);let t=this.weekStart($e(e)),s=e.getMonth(),n=Array.from({length:42},(o,c)=>j(t,c)),i=this.byDay(),a=Array.from({length:7},(o,c)=>x(j(t,c),this.lang,{weekday:"short"}));return l`<div class="month" role="grid">
      ${a.map(o=>l`<div class="dow" role="columnheader">${o}</div>`)}
      ${n.map(o=>{let c=i.get(o)??[];return l`<div class="cell ${J(o).getMonth()!==s?"other":""} ${o===this.today?"today":""}" role="gridcell" aria-label=${x(o,this.lang,{day:"numeric",month:"long"})}>
          <span class="num">${J(o).getDate()}</span>
          ${c.slice(0,4).map(h=>this.renderEvent(h))}
          ${c.length>4?l`<button class="more" @click=${()=>{this.cursor=o,this.mode="week"}}>+${c.length-4}</button>`:m}
        </div>`})}
    </div>`}renderWeek(){let e=this.weekStart(this.cursor),t=this.byDay();return l`<div class="week">
      ${Array.from({length:7},(s,n)=>j(e,n)).map(s=>l`
        <div class="col ${s===this.today?"today":""}">
          <b class="small">${x(s,this.lang,{weekday:"long",day:"numeric",month:"short"})}</b>
          ${(t.get(s)??[]).map(n=>this.renderEvent(n))}
        </div>`)}
    </div>`}renderList(){let e={t:this.t,lang:this.lang,today:this.today,onOpen:n=>this.emit("open-task",n),onComplete:n=>this.emit("complete-task",n),onPostpone:(n,i)=>this.emit("postpone-task",{task:n,days:i})},t=this.byDay(),s=[...t.keys()].filter(n=>n>=this.cursor).sort().slice(0,30);return s.length?l`${s.map(n=>l`<div class="group">
      <h3>${n===this.today?this.t("common.today"):x(n,this.lang,{weekday:"long",day:"numeric",month:"long"})}</h3>
      <ul class="tasks">${t.get(n).map(i=>Ne(i,e))}</ul></div>`)}`:l`<p class="empty">–</p>`}renderTimeline(){let e=this.snapshot.analysis;if(!e)return l`<p class="empty">–</p>`;let t=Number(this.cursor.slice(0,4))||e.season,s=this.snapshot.settings.region.hemisphere==="south",n=s?`${t}-07-01`:`${t}-01-01`,i=s?`${t+1}-06-30`:`${t}-12-31`,a=pe(n,i)+1,o=y=>y?Math.max(0,Math.min(100,pe(n,y)/a*100)):null,c=(y,w,E,P,V)=>{let K=o(y),U=o(w);return K===null||U===null||U<=0||K>=100?m:l`<div class="g-bar ${E}" title=${V} style=${`left:${K}%;width:${Math.max(U-K,.6)}%;${P}`}></div>`},h=Array.from({length:12},(y,w)=>{let E=J(n);return E.setMonth(E.getMonth()+w,1),$e(E)}),u=this.snapshot.plantings.filter(y=>y.season===t&&e.timelines[y.id]&&(!this.bedFilter||y.bed_id===this.bedFilter)),f=this.snapshot.beds.filter(y=>u.some(w=>w.bed_id===y.id)),b=this.snapshot.tasks.filter(y=>y.key?.startsWith("m:")&&y.due>=n&&y.due<=i&&(this.showDone||y.status==="open")),k=l`
      ${!e.anchors.frost_free&&o(e.anchors.last_frost)!==null?l`<div class="g-line" style=${`left:${o(e.anchors.last_frost)}%`} title=${this.t("cal.last_frost")}></div>`:m}
      ${!e.anchors.frost_free&&o(e.anchors.first_frost)!==null?l`<div class="g-line" style=${`left:${o(e.anchors.first_frost)}%`} title=${this.t("cal.first_frost")}></div>`:m}
      ${this.today>=n&&this.today<=i?l`<div class="g-line today" style=${`left:${o(this.today)}%`} title=${this.t("common.today")}></div>`:m}`;return l`<div class="gantt"><div class="gantt-inner" role="table" aria-label=${this.t("cal.timeline")}>
      <div class="g-row head" role="row"><div class="g-label">${this.t("common.season",{year:t})}</div>
        <div class="g-track">${h.map(y=>l`<span class="g-month" style=${`left:${o(y)}%`}>${x(y,this.lang,{month:"short"})}</span>`)}</div></div>
      ${b.length?l`<div class="g-row" role="row"><div class="g-label"><ha-icon icon="mdi:calendar-sync-outline"></ha-icon>${this.t("cal.garden_work")}</div>
        <div class="g-track">${k}${b.map(y=>l`<button class="g-task" style=${`left:${o(y.due)}%;color:${ye[y.type]??"var(--hl-soil-500)"}`}
          title=${`${x(y.due,this.lang)} \xB7 ${y.title}`} @click=${()=>this.emit("open-task",y)}><ha-icon icon=${be[y.type]}></ha-icon></button>`)}</div></div>`:m}
      ${f.map(y=>l`
        <div class="g-row bed" role="row"><div class="g-label">${y.name}</div><div class="g-track">${k}</div></div>
        ${u.filter(w=>w.bed_id===y.id).sort((w,E)=>e.timelines[w.id].in_ground<e.timelines[E.id].in_ground?-1:1).map(w=>{let E=e.timelines[w.id],P=this.plants.get(w.plant_id),V=B(this.families,P?.family),K=_(P,this.lang),U=e.phenology?.[w.id];return l`<div class="g-row" role="row">
            <div class="g-label"><span class="family-dot" style=${`background:${V};width:10px;height:10px`}></span>${K}
              ${U&&U.stage!=="not_planted"&&U.stage!=="finished"?l`<span class="xs muted">· ${this.t(`stage.${U.stage}`)}</span>`:m}</div>
            <div class="g-track">${k}
              ${E.sow_date&&E.sow_date<E.in_ground?c(E.sow_date,E.in_ground,"sow",`background:${V}`,`${this.t("lib.indoor_sow")}: ${x(E.sow_date,this.lang)}`):m}
              ${c(E.in_ground,E.harvest_start,"",`background:color-mix(in srgb, ${V} 35%, transparent);border:1px solid ${V}`,`${x(E.in_ground,this.lang)} \u2013 ${x(E.harvest_start,this.lang)}`)}
              ${c(E.harvest_start,E.harvest_end,"",`background:${V}`,`${this.t("lib.harvest")}: ${x(E.harvest_start,this.lang)} \u2013 ${x(E.harvest_end,this.lang)}`)}
              ${U?.harvest_estimate&&o(U.harvest_estimate)!==null?l`<span class="g-mark" style=${`left:${o(U.harvest_estimate)}%`}
                title=${this.t("cal.harvest_estimate",{date:x(U.harvest_estimate,this.lang)})}></span>`:m}
            </div></div>`})}`)}
      ${f.length?m:l`<p class="empty">${this.t("cal.no_plantings")}</p>`}
      <div class="g-legend">
        <span><i style="background:var(--hl-leaf-300);height:4px"></i>${this.t("lib.indoor_sow")}</span>
        <span><i style="background:color-mix(in srgb, var(--hl-leaf-500) 35%, transparent);border:1px solid var(--hl-leaf-500)"></i>${this.t("cal.growing")}</span>
        <span><i style="background:var(--hl-leaf-600)"></i>${this.t("lib.harvest")}</span>
        <span><i style="width:10px;height:10px;transform:rotate(45deg);background:var(--hl-text)"></i>${this.t("cal.harvest_estimate_short")}</span>
        <span><i style="border-left:2px dashed var(--hl-frost-500);width:2px;height:12px;border-radius:0"></i>${this.t("cal.frost_dates")}</span>
      </div>
    </div></div>`}render(){let e=this.mode==="timeline"?this.t("common.season",{year:Number(this.cursor.slice(0,4))}):this.mode==="month"?x(this.cursor,this.lang,{month:"long",year:"numeric"}):`${x(this.weekStart(this.cursor),this.lang)} \u2013 ${x(j(this.weekStart(this.cursor),6),this.lang)}`;return l`
      <div class="bar">
        <button class="icon-btn" aria-label=${this.t("cal.prev")} @click=${()=>this.move(-1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
        <button class="btn small" @click=${()=>this.cursor=this.today}>${this.t("common.today")}</button>
        <button class="icon-btn" aria-label=${this.t("cal.next")} @click=${()=>this.move(1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
        <h2 aria-live="polite">${e}</h2>
        <span class="spacer"></span>
        <div class="row" role="group">
          ${["month","week","list","timeline"].map(t=>l`<button class="chip" aria-pressed=${String(this.mode===t)} @click=${()=>this.mode=t}>${this.t(`cal.${t}`)}</button>`)}
        </div>
        <label class="row small"><span class="visually-hidden">${this.t("task.bed")}</span>
          <select style="width:auto" @change=${t=>this.bedFilter=t.target.value}>
            ${[{id:"",name:this.t("cal.all_beds")},...this.snapshot.beds].map(t=>l`<option value=${t.id} ?selected=${t.id===this.bedFilter}>${t.name}</option>`)}
          </select>
        </label>
        <label class="row small"><input type="checkbox" .checked=${this.showDone} @change=${t=>this.showDone=t.target.checked} />${this.t("cal.show_done")}</label>
        <button class="btn primary small" @click=${()=>this.emit("new-task",null)}><ha-icon icon="mdi:plus"></ha-icon>${this.t("cal.add_task")}</button>
      </div>
      ${this.mode==="month"?this.renderMonth():this.mode==="week"?this.renderWeek():this.mode==="timeline"?this.renderTimeline():this.renderList()}
    `}};Z.styles=[L,nt,z`
      .bar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--hl-s2); margin-bottom: var(--hl-s3); }
      .bar h2 { min-width: 200px; text-transform: capitalize; }
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
    `],p([g({attribute:!1})],Z.prototype,"snapshot",2),p([g({attribute:!1})],Z.prototype,"t",2),p([g()],Z.prototype,"lang",2),p([g({attribute:!1})],Z.prototype,"plants",2),p([g({attribute:!1})],Z.prototype,"families",2),p([v()],Z.prototype,"mode",2),p([v()],Z.prototype,"cursor",2),p([v()],Z.prototype,"showDone",2),p([v()],Z.prototype,"bedFilter",2),Z=p([R("hl-calendar-view")],Z);var wi=["nl_be","uk_south","uk_north","de_central","fr_north","scandinavia_south","mediterranean","au_melbourne","nz_christchurch","za_highveld"],ki={nl_be:"Nederland / Vlaanderen",uk_south:"UK (south)",uk_north:"UK (north)",de_central:"Deutschland (Mitte)",fr_north:"France (nord)",scandinavia_south:"Scandinavia (south)",mediterranean:"Mediterranean",au_melbourne:"Australia \u2013 Melbourne",nz_christchurch:"New Zealand \u2013 Christchurch",za_highveld:"South Africa \u2013 Highveld"},xi=Array.from({length:13},(d,r)=>[`${r+1}a`,`${r+1}b`]).flat(),Mi={soil_moisture:{domains:["sensor"],deviceClass:"moisture"},soil_temperature:{domains:["sensor"],deviceClass:"temperature"},air_temperature:{domains:["sensor"],deviceClass:"temperature"},air_humidity:{domains:["sensor"],deviceClass:"humidity"},light:{domains:["sensor"],deviceClass:"illuminance"},rain:{domains:["sensor","binary_sensor"]},par:{domains:["sensor"]},ec:{domains:["sensor"],deviceClass:"conductivity"},npk_n:{domains:["sensor"]},npk_p:{domains:["sensor"]},npk_k:{domains:["sensor"]},leaf_wetness:{domains:["sensor","binary_sensor"]}},Si=["fresh","storage","herbs","pollinators","winter","perennials","easy"],X=class extends T{constructor(){super(...arguments);this.lang="en";this.admin=!0;this.busy=!1}entityOptions(e){let t=Object.values(this.hass?.states??{}),s=e==="weather"?{domains:["weather"]}:e==="irrigation"?{domains:["switch","valve"]}:e==="tts"?{domains:["tts"]}:e==="media_player"?{domains:["media_player"]}:e==="vent"?{domains:["cover","switch","fan"]}:e==="shade"?{domains:["cover","switch"]}:e==="pump"?{domains:["switch"]}:Mi[e];return t.filter(n=>s.domains.includes(n.entity_id.split(".")[0])).filter(n=>!("deviceClass"in s)||!s.deviceClass||n.attributes.device_class===s.deviceClass).map(n=>n.entity_id).sort()}entityInput(e,t,s,n,i){let a=`list-${t}`,o=s?this.hass?.states[s]:void 0;return l`<label class="field">${i}
      <input list=${a} .value=${s??""} placeholder=${`${{weather:"weather",irrigation:"switch",tts:"tts",media_player:"media_player",vent:"cover"}[t]??"sensor"}.\u2026`} ?disabled=${!this.admin} id=${e}
        aria-invalid=${s&&!o?"true":"false"}
        @change=${c=>n(c.target.value.trim()||null)} />
      ${s?l`<span class="state">${o?`${o.state} ${o.attributes.unit_of_measurement??""}`:"\u26A0 not found"}</span>`:m}
    </label>`}datalists(){return l`${["soil_moisture","soil_temperature","air_temperature","air_humidity","light","rain","par","ec","npk_n","npk_p","npk_k","leaf_wetness","weather","irrigation","tts","media_player","vent","shade","pump"].map(t=>l`<datalist id=${`list-${t}`}>${this.entityOptions(t).map(s=>l`<option value=${s}></option>`)}</datalist>`)}`}async saveSettings(e){this.busy=!0;try{await this.api.saveSettings(e),this.toast(this.t("settings.saved"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}finally{this.busy=!1}}async savePlan(e){let t=structuredClone({zones:this.snapshot.zones,beds:this.snapshot.beds,plantings:this.snapshot.plantings,features:this.snapshot.features??[]});e(t);try{await this.api.savePlan(t,this.snapshot.revision),this.toast(this.t("settings.saved"))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}renderRegion(){let e=this.snapshot.settings.region,t=this.snapshot.analysis?.anchors,s=n=>this.saveSettings({region:n});return l`<section class="card stack" aria-labelledby="s-region">
      <h2 id="s-region">${this.t("settings.region")}</h2>
      <div class="form-grid">
        <label class="field">${this.t("settings.hemisphere")}
          <select ?disabled=${!this.admin} @change=${n=>s({hemisphere:n.target.value})}>
            ${["north","south"].map(n=>l`<option value=${n} ?selected=${e.hemisphere===n}>${this.t(`settings.hemisphere.${n}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("settings.mode")}
          <select ?disabled=${!this.admin} @change=${n=>s({mode:n.target.value})}>
            ${["preset","usda","custom"].map(n=>l`<option value=${n} ?selected=${e.mode===n}>${this.t(`settings.mode.${n}`)}</option>`)}
          </select></label>
        ${e.mode==="preset"?l`<label class="field full">${this.t("settings.preset")}
          <select ?disabled=${!this.admin} @change=${n=>s({preset:n.target.value})}>
            ${wi.map(n=>l`<option value=${n} ?selected=${e.preset===n}>${ki[n]}</option>`)}</select></label>`:m}
        ${e.mode==="usda"?l`<label class="field full">${this.t("settings.zone")}
          <select ?disabled=${!this.admin} @change=${n=>s({hardiness_zone:n.target.value})}>
            ${xi.map(n=>l`<option value=${n} ?selected=${e.hardiness_zone===n}>${n}</option>`)}</select></label>`:m}
        ${e.mode==="custom"?l`
          <label class="field">${this.t("settings.last_frost")}<input pattern="\\d{2}-\\d{2}" .value=${e.last_frost} ?disabled=${!this.admin}
            @change=${n=>n.target.checkValidity()&&s({last_frost:n.target.value})} /></label>
          <label class="field">${this.t("settings.first_frost")}<input pattern="\\d{2}-\\d{2}" .value=${e.first_frost} ?disabled=${!this.admin}
            @change=${n=>n.target.checkValidity()&&s({first_frost:n.target.value})} /></label>`:m}
      </div>
      ${t?l`<p class="small muted">${this.t("settings.frost_dates_now",{last:x(t.last_frost,this.lang,{day:"numeric",month:"long"}),first:x(t.first_frost,this.lang,{day:"numeric",month:"long",year:"numeric"})})}</p>`:m}
    </section>`}renderWeather(){let e=this.snapshot.settings;return l`<section class="card stack" aria-labelledby="s-weather">
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
      ${this.snapshot.weather.error?l`<p class="small" style="color:var(--hl-warning)">⚠ ${this.snapshot.weather.error}</p>`:m}
    </section>`}renderZones(){let e=(t,s)=>this.savePlan(n=>s(n.zones.find(i=>i.id===t)));return l`<section class="card stack" aria-labelledby="s-zones">
      <h2 id="s-zones">${this.t("settings.zones")}</h2>
      ${this.snapshot.zones.map(t=>l`<div class="item">
        <h4><ha-icon icon=${t.type==="outdoor"?"mdi:tree-outline":"mdi:greenhouse"}></ha-icon>${t.name}<span class="chip">${this.t(`settings.zone_type.${t.type}`)}</span></h4>
        <div class="form-grid">
          ${["air_temperature","air_humidity","light"].map(s=>this.entityInput(`${t.id}-${s}`,s,t.sensors[s],n=>e(t.id,i=>i.sensors[s]=n),this.t(`settings.sensor.${s}`)))}
          ${this.entityInput(`${t.id}-lw`,"leaf_wetness",t.sensors.leaf_wetness,s=>e(t.id,n=>n.sensors.leaf_wetness=s),this.t("settings.sensor.leaf_wetness"))}
          ${this.entityInput(`${t.id}-par`,"par",t.sensors.par,s=>e(t.id,n=>n.sensors.par=s),this.t("settings.sensor.par"))}
          ${t.type!=="outdoor"?l`
            ${this.entityInput(`${t.id}-vent`,"vent",t.vent_entity,s=>e(t.id,n=>n.vent_entity=s),this.t("settings.vent"))}
            ${this.entityInput(`${t.id}-shade`,"shade",t.shade_entity,s=>e(t.id,n=>n.shade_entity=s),this.t("settings.shade_entity"))}
            <label class="field">${this.t("settings.climate_control")}
              <select ?disabled=${!this.admin} @change=${s=>e(t.id,n=>n.climate_control=s.target.value)}>
                ${["off","advise","auto"].map(s=>l`<option value=${s} ?selected=${(t.climate_control??"advise")===s}>${this.t(`settings.climate_control.${s}`)}</option>`)}
              </select></label>
            <label class="field check"><input type="checkbox" .checked=${!!t.microclimate.thermal_mass} ?disabled=${!this.admin}
              @change=${s=>e(t.id,n=>n.microclimate.thermal_mass=s.target.checked)} />${this.t("settings.thermal_mass")}</label>`:m}
          <label class="field check"><input type="checkbox" .checked=${!!t.microclimate.wall_heat} ?disabled=${!this.admin}
            @change=${s=>e(t.id,n=>n.microclimate.wall_heat=s.target.checked)} />${this.t("settings.wall_heat")}</label>
          <label class="field check"><input type="checkbox" .checked=${t.microclimate.heated} ?disabled=${!this.admin}
            @change=${s=>e(t.id,n=>n.microclimate.heated=s.target.checked)} />${this.t("settings.heated")}</label>
          ${t.microclimate.heated?l`<label class="field">${this.t("settings.min_heating")}<input type="number" step="0.5" .value=${String(t.microclimate.min_heating_temp_c??5)}
            @change=${s=>e(t.id,n=>n.microclimate.min_heating_temp_c=Number(s.target.value))} /></label>`:m}
        </div>
      </div>`)}
    </section>`}renderBeds(){let e=(t,s)=>this.savePlan(n=>s(n.beds.find(i=>i.id===t)));return l`<section class="card stack" aria-labelledby="s-beds">
      <h2 id="s-beds">${this.t("settings.beds")}</h2>
      ${this.snapshot.beds.map(t=>l`<div class="item">
        <h4><ha-icon icon="mdi:sprout-outline"></ha-icon>${t.name}<span class="chip">${Math.round(t.width_cm)} × ${Math.round(t.length_cm)} cm</span></h4>
        <div class="form-grid">
          ${["soil_moisture","soil_temperature","ec","npk_n","npk_p","npk_k"].map(s=>this.entityInput(`${t.id}-${s}`,s,t.sensors[s],n=>e(t.id,i=>i.sensors[s]=n),this.t(`settings.sensor.${s}`)))}
          ${this.entityInput(`${t.id}-irr`,"irrigation",t.irrigation_entity,s=>e(t.id,n=>n.irrigation_entity=s),this.t("settings.irrigation"))}
          <label class="field">${this.t("settings.flow")}<input type="number" min="0" step="0.1" .value=${String(t.irrigation_flow_lpm??"")} ?disabled=${!this.admin}
            @change=${s=>e(t.id,n=>n.irrigation_flow_lpm=Number(s.target.value)||null)} /></label>
        </div>
      </div>`)}
    </section>`}renderIrrigation(){let e=this.snapshot.settings.irrigation??{mode:"advise",pump_entity:null,start_time:"06:00",max_runtime_min:30,frost_lockout_c:2,rain_skip_mm:3,pump_lead_s:3},t=i=>this.saveSettings({irrigation:i}),s=(i,a,o=1,c=0,h=999)=>l`<label class="field">${a}
      <input type="number" step=${o} min=${c} max=${h} .value=${String(e[i])}
        @change=${u=>t({[i]:Number(u.target.value)})} /></label>`,n=this.snapshot.beds.filter(i=>i.irrigation_entity).length;return l`<section class="card stack" aria-labelledby="s-irrigation">
      <h2 id="s-irrigation">${this.t("settings.irrigation_hw")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></h2>
      <div class="form-grid">
        <label class="field full">${this.t("settings.irrigation_mode")}
          <select @change=${i=>t({mode:i.target.value})}>
            ${["off","advise","auto"].map(i=>l`<option value=${i} ?selected=${e.mode===i}>${this.t(`settings.irrigation_mode.${i}`)}</option>`)}
          </select></label>
        ${this.entityInput("pump","pump",e.pump_entity,i=>t({pump_entity:i}),this.t("settings.pump"))}
        <label class="field">${this.t("settings.start_time")}<input type="time" .value=${e.start_time}
          @change=${i=>t({start_time:i.target.value})} /></label>
        ${s("max_runtime_min",this.t("settings.max_runtime"),1,1,180)}
        ${s("frost_lockout_c",this.t("settings.frost_lockout"),.5,-5,10)}
        ${s("rain_skip_mm",this.t("settings.rain_skip"),.5,0,30)}
        ${s("pump_lead_s",this.t("settings.pump_lead"),.5,0,30)}
      </div>
      <p class="xs muted">${this.t("settings.irrigation_hint",{n})}</p>
    </section>`}renderResources(){let e=this.snapshot.settings,t=e.resources??{household_size:2,hours_per_week:3,water_liters_per_week:null,compost_kg:null,irrigation:!1,goals:["fresh","herbs"],wanted:[],excluded:[]},s=i=>this.saveSettings({resources:i}),n=i=>s({goals:t.goals.includes(i)?t.goals.filter(a=>a!==i):[...t.goals,i]});return l`<section class="card stack" aria-labelledby="s-resources">
      <h2 id="s-resources">${this.t("settings.resources")} <hl-info term="autofill" .t=${this.t}></hl-info></h2>
      <div class="form-grid">
        <label class="field">${this.t("autofill.household")}<input type="number" min="1" max="20" .value=${String(t.household_size)}
          @change=${i=>s({household_size:Number(i.target.value)})} /></label>
        <label class="field">${this.t("autofill.hours")}<input type="number" min="0" step="0.5" .value=${String(t.hours_per_week)}
          @change=${i=>s({hours_per_week:Number(i.target.value)})} /></label>
        <label class="field">${this.t("autofill.water")}<input type="number" min="0" step="10" .value=${String(t.water_liters_per_week??"")}
          @change=${i=>s({water_liters_per_week:i.target.value===""?null:Number(i.target.value)})} /></label>
        <label class="field">${this.t("autofill.compost")}<input type="number" min="0" step="5" .value=${String(t.compost_kg??"")}
          @change=${i=>s({compost_kg:i.target.value===""?null:Number(i.target.value)})} /></label>
        <label class="field check full"><input type="checkbox" .checked=${t.irrigation}
          @change=${i=>s({irrigation:i.target.checked})} />${this.t("autofill.has_irrigation")}</label>
      </div>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.goals")}>
        ${Si.map(i=>l`<button class="chip ${t.goals.includes(i)?"active":""}" aria-pressed=${String(t.goals.includes(i))} @click=${()=>n(i)}>${this.t(`autofill.goal.${i}`)}</button>`)}
      </div>
      <label class="field check"><input type="checkbox" .checked=${e.maintenance_tasks??!0}
        @change=${i=>this.saveSettings({maintenance_tasks:i.target.checked})} />${this.t("settings.maintenance_tasks")}</label>
    </section>`}renderNotifications(){let e=this.snapshot.settings.notifications,t=i=>this.saveSettings({notifications:i}),s=i=>i.split(",").map(a=>a.trim()).filter(Boolean),n=Object.keys(this.hass?.services?.notify??{}).map(i=>`notify.${i}`);return l`<section class="card stack" aria-labelledby="s-notify">
      <h2 id="s-notify">${this.t("settings.notifications")}</h2>
      <label class="field check"><input type="checkbox" .checked=${e.persistent} @change=${i=>t({persistent:i.target.checked})} />${this.t("settings.persistent")}</label>
      <label class="field">${this.t("settings.notify_services")}
        <input list="notify-services" .value=${e.notify_services.join(", ")} @change=${i=>t({notify_services:s(i.target.value)})} />
        <datalist id="notify-services">${n.map(i=>l`<option value=${i}></option>`)}</datalist></label>
      ${this.entityInput("tts","tts",e.tts_entity,i=>t({tts_entity:i}),this.t("settings.tts"))}
      <label class="field">${this.t("settings.tts_players")}<input list="list-media_player" .value=${e.tts_media_players.join(", ")}
        @change=${i=>t({tts_media_players:s(i.target.value)})} /></label>
      <div class="form-grid">
        <label class="field">${this.t("settings.digest")}<input type="time" .value=${e.digest_time} @change=${i=>t({digest_time:i.target.value})} /></label>
        <span></span>
        <label class="field check"><input type="checkbox" .checked=${e.frost_alerts} @change=${i=>t({frost_alerts:i.target.checked})} />${this.t("settings.frost_alerts")}</label>
        <label class="field check"><input type="checkbox" .checked=${e.heat_alerts} @change=${i=>t({heat_alerts:i.target.checked})} />${this.t("settings.heat_alerts")}</label>
        <label class="field check full"><input type="checkbox" .checked=${e.tts_frost_announcement} @change=${i=>t({tts_frost_announcement:i.target.checked})} />${this.t("settings.tts_frost")}</label>
      </div>
      <h3>${this.t("settings.reminders")}</h3>
      <div class="form-grid">
        <label class="field check"><input type="checkbox" .checked=${e.overdue_reminders??!0} @change=${i=>t({overdue_reminders:i.target.checked})} />${this.t("settings.overdue_reminders")}</label>
        <label class="field">${this.t("settings.overdue_time")}<input type="time" .value=${e.overdue_time??"18:30"} @change=${i=>t({overdue_time:i.target.value})} /></label>
        <label class="field">${this.t("settings.overdue_after")}<input type="number" min="0" max="14" .value=${String(e.overdue_after_days??1)} @change=${i=>t({overdue_after_days:Number(i.target.value)})} /></label>
        <span></span>
        <label class="field check"><input type="checkbox" .checked=${e.weekly_plan??!0} @change=${i=>t({weekly_plan:i.target.checked})} />${this.t("settings.weekly_plan")}</label>
        <label class="field">${this.t("settings.weekly_day")}<select @change=${i=>t({weekly_plan_weekday:Number(i.target.value)})}>
          ${[0,1,2,3,4,5,6].map(i=>l`<option value=${i} ?selected=${(e.weekly_plan_weekday??6)===i}>${new Date(2024,0,1+i).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{weekday:"long"})}</option>`)}
        </select></label>
        <label class="field">${this.t("settings.weekly_time")}<input type="time" .value=${e.weekly_plan_time??"19:00"} @change=${i=>t({weekly_plan_time:i.target.value})} /></label>
      </div>
      <label class="field check"><input type="checkbox" .checked=${this.snapshot.settings.weather_aware_scheduling??!0}
        @change=${i=>this.saveSettings({weather_aware_scheduling:i.target.checked})} />${this.t("settings.weather_aware")}</label>
      <p class="xs muted">${this.t("settings.weather_aware_hint")}</p>
    </section>`}renderGeneral(){let e=this.snapshot.settings;return l`<section class="card stack" aria-labelledby="s-general">
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
    </section>`}async export(e){let t=await this.api.exportPlan(e,!0);et(t.filename,t.content,e==="json"?"application/json":"application/yaml")}render(){return l`
      ${this.admin?m:l`<p class="small" style="color:var(--hl-warning);margin-bottom:12px">${this.t("common.admin_only")}</p>`}
      <fieldset ?disabled=${!this.admin||this.busy} style="border:0;padding:0;margin:0">
        <div class="sections">
          ${this.renderRegion()} ${this.renderWeather()} ${this.renderZones()} ${this.renderBeds()} ${this.renderIrrigation()}
          ${this.renderResources()} ${this.renderNotifications()} ${this.renderGeneral()}
        </div>
      </fieldset>
      ${this.datalists()}
    `}};X.styles=[L,z`
      .sections { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: var(--hl-s4); align-items: start; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .item { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); display: flex; flex-direction: column; gap: var(--hl-s2); background: var(--hl-surface-2); }
      .item h4 { display: flex; align-items: center; gap: var(--hl-s2); }
      .check { flex-direction: row !important; align-items: center; gap: var(--hl-s2) !important; color: var(--hl-text) !important; }
      .state { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
    `],p([g({attribute:!1})],X.prototype,"snapshot",2),p([g({attribute:!1})],X.prototype,"hass",2),p([g({attribute:!1})],X.prototype,"api",2),p([g({attribute:!1})],X.prototype,"t",2),p([g()],X.prototype,"lang",2),p([g({type:Boolean})],X.prototype,"admin",2),p([v()],X.prototype,"busy",2),X=p([R("hl-settings-view")],X);var Ge=d=>d.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");function ne(d){let r=[],e=/(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g,t=0,s;for(;s=e.exec(d);)s.index>t&&r.push(d.slice(t,s.index)),s[2]!==void 0?r.push(l`<strong>${s[2]}</strong>`):s[3]!==void 0?r.push(l`<em>${s[3]}</em>`):r.push(l`<code>${s[4]}</code>`),t=s.index+s[0].length;return t<d.length&&r.push(d.slice(t)),r}function js(d){return d.split(`
`).filter(r=>/^#{2,3} /.test(r)).map(r=>{let e=r.startsWith("### ")?3:2,t=r.replace(/^#+ /,"").trim();return{level:e,text:t,id:Ge(t)}})}var Ls=d=>d.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(r=>r.trim());function Is(d){let r=d.replace(/\r/g,"").split(`
`),e=[],t=0;for(;t<r.length;){let s=r[t];if(!s.trim()){t++;continue}let n=/^(#{1,4}) (.*)$/.exec(s);if(n){let a=n[2].trim(),o=Math.min(Math.max(n[1].length,2),4);e.push(o===2?l`<h2 id=${Ge(a)}>${ne(a)}</h2>`:o===3?l`<h3 id=${Ge(a)}>${ne(a)}</h3>`:l`<h4>${ne(a)}</h4>`),t++;continue}if(s.trim().startsWith("|")){let a=[];for(;t<r.length&&r[t].trim().startsWith("|");)a.push(r[t++]);let[o,,...c]=a,u=a[1]!==void 0&&/^\s*\|?\s*:?-{2,}/.test(a[1])?c:a.slice(1);e.push(l`<div class="table-wrap"><table>
        <thead><tr>${Ls(o).map(f=>l`<th>${ne(f)}</th>`)}</tr></thead>
        <tbody>${u.map(f=>l`<tr>${Ls(f).map(b=>l`<td>${ne(b)}</td>`)}</tr>`)}</tbody>
      </table></div>`);continue}if(/^\s*([-*]|\d+\.) /.test(s)){let a=/^\s*\d+\. /.test(s),o=[];for(;t<r.length&&/^\s*([-*]|\d+\.) /.test(r[t]);)o.push(r[t].replace(/^\s*([-*]|\d+\.) /,"")),t++;let c=o.map(h=>l`<li>${ne(h)}</li>`);e.push(a?l`<ol>${c}</ol>`:l`<ul>${c}</ul>`);continue}let i=[];for(;t<r.length&&r[t].trim()&&!/^(#{1,4} |\s*\||\s*([-*]|\d+\.) )/.test(r[t]);)i.push(r[t++].trim());e.push(l`<p>${ne(i.join(" "))}</p>`)}return e.length?l`${e}`:l`${m}`}var Ei={planning:"mdi:clipboard-text-outline",soil:"mdi:shovel",sowing:"mdi:seed-outline",watering:"mdi:watering-can-outline",fertilizing:"mdi:bottle-tonic-plus-outline",rotation:"mdi:rotate-3d-variant",companions:"mdi:handshake-outline",greenhouse:"mdi:greenhouse",pests:"mdi:bug-outline",diseases:"mdi:mushroom-outline",seasons:"mdi:calendar-sync-outline",harvest:"mdi:basket-outline",seeds:"mdi:seed",nodig:"mdi:layers-outline",herbs:"mdi:leaf",perennials:"mdi:flower-outline"},F=class extends T{constructor(){super(...arguments);this.lang="en";this.chapterId="";this.narrow=!1;this.chapters=[];this.glossary={};this.body="";this.loadedId="";this.query="";this.results=[];this.showGlossary=!1}willUpdate(e){(e.has("api")||e.has("lang"))&&this.api&&this.loadIndex(),(e.has("chapterId")||e.has("lang"))&&this.api&&this.chapterId&&this.chapterId!==this.loadedId&&this.loadChapter(this.chapterId)}async loadIndex(){let e=await this.api.handbookIndex(this.lang);this.chapters=e.chapters,this.glossary=e.glossary}async loadChapter(e){try{let t=await this.api.handbookChapter(e,this.lang);this.body=t.body,this.loadedId=e,this.updateComplete.then(()=>this.renderRoot.querySelector("article")?.scrollIntoView({block:"start"}))}catch{this.body="",this.loadedId=""}}open(e){this.showGlossary=!1,this.query="",this.results=[],this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e},bubbles:!0,composed:!0}))}onSearch(e){if(this.query=e,window.clearTimeout(this.searchTimer),!e.trim()){this.results=[];return}this.searchTimer=window.setTimeout(async()=>{this.results=(await this.api.handbookSearch(e,this.lang)).results},200)}renderToc(){return l`<nav class="toc card" aria-label=${this.t("handbook.contents")}>
      <input class="search" type="search" placeholder=${this.t("handbook.search")} .value=${this.query}
        @input=${e=>this.onSearch(e.target.value)} aria-label=${this.t("handbook.search")} />
      <a aria-current=${!this.chapterId&&!this.showGlossary?"page":"false"} @click=${()=>this.open("")}>
        <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("handbook.overview")}</a>
      ${this.chapters.map(e=>l`<a aria-current=${e.id===this.chapterId&&!this.showGlossary?"page":"false"} @click=${()=>this.open(e.id)}>
        <span class="num">${e.order}</span>${e.title}</a>`)}
      <a aria-current=${this.showGlossary?"page":"false"} @click=${()=>this.showGlossary=!0}>
        <ha-icon icon="mdi:alphabetical-variant"></ha-icon>${this.t("handbook.glossary")}</a>
    </nav>`}renderBody(){if(this.query.trim())return l`<article class="card"><h1>${this.t("handbook.results",{query:this.query})}</h1>
        ${this.results.length?this.results.map(i=>l`<div class="hit" @click=${()=>this.open(i.id)}><b>${i.title}</b><p class="small muted">…${i.snippet}…</p></div>`):l`<p class="muted">${this.t("handbook.no_results")}</p>`}</article>`;if(this.showGlossary){let i=Object.entries(this.glossary).sort((a,o)=>a[1].term.localeCompare(o[1].term,this.lang));return l`<article class="card"><h1>${this.t("handbook.glossary")}</h1>
        <dl class="gloss">${i.map(([,a])=>l`<dt>${a.term}</dt><dd>${a.text}
          ${a.chapter?l` <a href="#" @click=${o=>{o.preventDefault(),this.open(a.chapter)}}>→ ${this.chapters.find(o=>o.id===a.chapter)?.title??a.chapter}</a>`:m}</dd>`)}</dl>
      </article>`}if(!this.chapterId)return l`<article style="max-width:none">
        <h1>${this.t("handbook.title")}</h1>
        <p class="muted">${this.t("handbook.intro")}</p>
        <div class="grid">${this.chapters.map(i=>l`<button class="card tile" @click=${()=>this.open(i.id)}>
          <h3><ha-icon icon=${Ei[i.id]??"mdi:book-outline"}></ha-icon>${i.title}</h3><p class="small muted">${ne(i.summary)}</p></button>`)}</div>
      </article>`;let e=this.chapters.find(i=>i.id===this.chapterId),t=this.chapters.findIndex(i=>i.id===this.chapterId),s=t>0?this.chapters[t-1]:void 0,n=t>=0&&t<this.chapters.length-1?this.chapters[t+1]:void 0;return l`<article class="card">
      <h1>${e?.title??""}</h1>
      <div class="sections">${js(this.body).filter(i=>i.level===2).map(i=>l`<a class="chip" href=${`#${i.id}`}
        @click=${a=>{a.preventDefault(),this.renderRoot.querySelector(`#${CSS.escape(Ge(i.text))}`)?.scrollIntoView({behavior:"smooth"})}}>${i.text}</a>`)}</div>
      ${this.loadedId===this.chapterId?Is(this.body):l`<p class="muted">${this.t("common.loading")}</p>`}
      <div class="row" style="margin-top:var(--hl-s5)">
        ${s?l`<button class="btn small ghost" @click=${()=>this.open(s.id)}>← ${s.title}</button>`:m}
        <span class="spacer"></span>
        ${n?l`<button class="btn small" @click=${()=>this.open(n.id)}>${n.title} →</button>`:m}
      </div>
    </article>`}render(){let e=this.narrow&&(this.chapterId||this.showGlossary)?l`<details class="toc-wrap card"><summary><ha-icon icon="mdi:format-list-bulleted"></ha-icon>${this.t("handbook.contents")}</summary>${this.renderToc()}</details>`:this.renderToc();return l`<div class="layout ${this.narrow?"narrow":""}">${e}${this.renderBody()}</div>`}};F.styles=[L,z`
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
      .tile h3 { display: flex; gap: var(--hl-s2); align-items: center; margin: 0 0 6px; --mdc-icon-size: 20px; }
      .hit { padding: var(--hl-s2) 0; border-bottom: 1px solid var(--hl-border); cursor: pointer; }
      dl.gloss dt { font-weight: 700; margin-top: var(--hl-s3); }
      dl.gloss dd { margin: 2px 0 0; }
      .search { width: 100%; }
    `],p([g({attribute:!1})],F.prototype,"api",2),p([g({attribute:!1})],F.prototype,"t",2),p([g()],F.prototype,"lang",2),p([g()],F.prototype,"chapterId",2),p([g({type:Boolean})],F.prototype,"narrow",2),p([v()],F.prototype,"chapters",2),p([v()],F.prototype,"glossary",2),p([v()],F.prototype,"body",2),p([v()],F.prototype,"loadedId",2),p([v()],F.prototype,"query",2),p([v()],F.prototype,"results",2),p([v()],F.prototype,"showGlossary",2),F=p([R("hl-handbook-view")],F);var Ti=[{id:"garden",icon:"mdi:floor-plan"},{id:"zone",icon:"mdi:greenhouse"},{id:"beds",icon:"mdi:sprout-outline"},{id:"tasks",icon:"mdi:format-list-checks"},{id:"season",icon:"mdi:chart-gantt"},{id:"blank",icon:"mdi:draw"},{id:"plants",icon:"mdi:card-text-outline"}],zi=["remarkable","a4","a3","a5","letter"],Hs="hortulus.print",q=class extends T{constructor(){super(...arguments);this.lang="en";this.narrow=!1;this.admin=!0;this.opts={document:"garden",page:"remarkable",landscape:!1,color_mode:"eink",days:28,notes:!0,grid:!0,labels:!0};this.pages=[];this.busy=!1;this.error=""}connectedCallback(){super.connectedCallback();try{let e=JSON.parse(localStorage.getItem(Hs)??"null");e&&(this.opts={...this.opts,...e})}catch{}}willUpdate(e){e.has("api")&&this.api&&!this.pages.length&&this.schedule(0)}set(e,t){this.opts={...this.opts,[e]:t},e==="page"&&t==="remarkable"&&this.opts.color_mode==="color"&&(this.opts={...this.opts,color_mode:"eink"});try{localStorage.setItem(Hs,JSON.stringify({...this.opts,bed_ids:null,zone_id:null,title:null}))}catch{}this.schedule()}schedule(e=350){window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>this.preview(),e)}async preview(){this.busy=!0,this.error="";try{this.pages=(await this.api.printPreview(this.payload())).pages}catch(e){this.error=e.message??String(e)}finally{this.busy=!1}}payload(){let e={...this.opts};return e.document!=="zone"&&delete e.zone_id,e.document!=="beds"&&delete e.bed_ids,e.title||delete e.title,e}async download(){this.busy=!0;try{let{blob:e,filename:t}=await this.api.printPdf(this.payload()),s=URL.createObjectURL(e),n=document.createElement("a");n.href=s,n.download=t,n.click(),setTimeout(()=>URL.revokeObjectURL(s),2e3)}catch(e){this.toast(this.t("common.error",{message:e.message}))}finally{this.busy=!1}}async saveToConfig(){try{await this.api.exportPdfToConfig(this.payload()),this.toast(this.t("print.saved_to_config"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}renderForm(){let e=this.opts,t=this.snapshot.analysis?.season??new Date().getFullYear(),s=this.snapshot.zones;return l`<section class="card stack" aria-label=${this.t("print.options")}>
      <h2>${this.t("print.document")}</h2>
      <div class="docs" role="group">
        ${Ti.map(n=>l`<button class="doc" aria-pressed=${String(e.document===n.id)} @click=${()=>this.set("document",n.id)}>
          <ha-icon icon=${n.icon}></ha-icon><b>${this.t(`print.doc.${n.id}`)}</b><small>${this.t(`print.doc.${n.id}.hint`)}</small></button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("print.page")}
          <select @change=${n=>this.set("page",n.target.value)}>
            ${zi.map(n=>l`<option value=${n} ?selected=${e.page===n}>${this.t(`print.page.${n}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("print.orientation")}
          <select @change=${n=>this.set("landscape",n.target.value==="landscape")}>
            <option value="portrait" ?selected=${!e.landscape}>${this.t("print.portrait")}</option>
            <option value="landscape" ?selected=${e.landscape}>${this.t("print.landscape")}</option>
          </select></label>
        <label class="field">${this.t("print.colors")}
          <select @change=${n=>this.set("color_mode",n.target.value)}>
            ${["color","eink","grayscale"].map(n=>l`<option value=${n} ?selected=${e.color_mode===n}>${this.t(`print.color.${n}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("planner.season")}
          <select @change=${n=>this.set("season",Number(n.target.value))}>
            ${[t-1,t,t+1].map(n=>l`<option value=${n} ?selected=${(e.season??t)===n}>${n}</option>`)}
          </select></label>
        ${e.document==="zone"||e.document==="blank"?l`<label class="field full">${this.t("planner.zone")}
          <select @change=${n=>this.set("zone_id",n.target.value||null)}>
            <option value="">${this.t(e.document==="zone"?"print.all_greenhouses":"print.all_zones")}</option>
            ${s.map(n=>l`<option value=${n.id} ?selected=${e.zone_id===n.id}>${n.name}</option>`)}
          </select></label>`:m}
        ${e.document==="beds"?l`<fieldset class="full" style="border:0;padding:0;margin:0">
          <legend class="small muted">${this.t("print.beds")}</legend>
          <div class="row wrap">${this.snapshot.beds.map(n=>{let i=!e.bed_ids||e.bed_ids.includes(n.id);return l`<button class="chip" aria-pressed=${String(i)} @click=${()=>{let a=this.snapshot.beds.map(h=>h.id),o=e.bed_ids??a,c=i?o.filter(h=>h!==n.id):[...o,n.id];this.set("bed_ids",c.length===a.length?null:c)}}>${n.name}</button>`})}</div></fieldset>`:m}
        ${e.document==="tasks"?l`<label class="field">${this.t("print.days")}<input type="number" min="1" max="120" .value=${String(e.days)}
          @change=${n=>this.set("days",Number(n.target.value))} /></label>`:m}
        <label class="field full">${this.t("print.title")}<input .value=${e.title??""} placeholder=${this.t(`print.doc.${e.document}`)}
          @change=${n=>this.set("title",n.target.value||null)} /></label>
        <label class="field check"><input type="checkbox" .checked=${e.notes} @change=${n=>this.set("notes",n.target.checked)} />${this.t("print.notes")}</label>
        <label class="field check"><input type="checkbox" .checked=${e.grid} @change=${n=>this.set("grid",n.target.checked)} />${this.t("print.grid")}</label>
        <label class="field check full"><input type="checkbox" .checked=${e.labels} @change=${n=>this.set("labels",n.target.checked)} />${this.t("print.labels")}</label>
      </div>
      ${e.page==="remarkable"?l`<div class="rm"><ha-icon icon="mdi:tablet"></ha-icon><span>${this.t("print.remarkable_hint")}</span></div>`:m}
      <div class="row wrap">
        <button class="btn primary" ?disabled=${this.busy} @click=${()=>this.download()}><ha-icon icon="mdi:file-pdf-box"></ha-icon>${this.t("print.download")}</button>
        <button class="btn" ?disabled=${this.busy} @click=${()=>this.preview()}><ha-icon icon="mdi:refresh"></ha-icon>${this.t("print.refresh")}</button>
        ${this.admin?l`<button class="btn ghost" @click=${()=>this.saveToConfig()}><ha-icon icon="mdi:folder-download-outline"></ha-icon>${this.t("print.save_config")}</button>`:m}
      </div>
    </section>`}render(){return l`<div class="layout ${this.narrow?"narrow":""}">
      ${this.renderForm()}
      <section class="preview" aria-label=${this.t("print.preview")} aria-busy=${String(this.busy)}>
        ${this.error?l`<p class="small" style="color:var(--hl-danger)">${this.error}</p>`:m}
        ${this.pages.length?this.pages.map((e,t)=>l`<figure class="sheet" style="margin:0">${Es(e)}
            <figcaption class="num">${this.t("print.page_n",{n:t+1,total:this.pages.length})}</figcaption></figure>`):l`<p class="muted">${this.busy?this.t("common.loading"):this.t("print.empty")}</p>`}
      </section>
    </div>`}};q.styles=[L,z`
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
    `],p([g({attribute:!1})],q.prototype,"snapshot",2),p([g({attribute:!1})],q.prototype,"api",2),p([g({attribute:!1})],q.prototype,"t",2),p([g()],q.prototype,"lang",2),p([g({type:Boolean})],q.prototype,"narrow",2),p([g({type:Boolean})],q.prototype,"admin",2),p([v()],q.prototype,"opts",2),p([v()],q.prototype,"pages",2),p([v()],q.prototype,"busy",2),p([v()],q.prototype,"error",2),q=p([R("hl-print-view")],q);var Pi=new Set(["growth","yellow_leaves","wilting","no_fruit","bolting","pests","disease","too_hot","too_cold","soil","slugs","frost"]),Ri={warning:"mdi:alert-outline",tip:"mdi:lightbulb-on-outline",info:"mdi:information-outline"},Ci={pollination:"mdi:bee-flower",neighbours:"mdi:handshake-outline",placement:"mdi:white-balance-sunny",year_round:"mdi:calendar-sync-outline",soil:"mdi:shovel",eco:"mdi:leaf-circle-outline",growth:"mdi:sprout",greenhouse:"mdi:greenhouse"},C=class extends T{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.mode="question";this.options=null;this.subject="plant";this.target="";this.problem="what_to_do";this.answer=null;this.busy=!1;this.advice=null;this.supplies=null;this.dismissed=new Set}connectedCallback(){super.connectedCallback(),this.load()}async load(){try{let[e,t,s]=await Promise.all([this.api.qaOptions(),this.api.advice(),this.api.supplies()]);this.options=e,this.advice=t,this.supplies=s;let n=e.targets.plant.find(i=>i.planted);this.target=n?.id??e.targets.plant[0]?.id??""}catch(e){this.toast(e.message??String(e))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}openChapter(e){this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e},bubbles:!0,composed:!0}))}problems(){let e=this.options?.subjects[this.subject]??[],t=e.filter(s=>this.mode==="problem"===Pi.has(s));return t.length?t:e}setSubject(e){this.subject=e;let t=this.options?.targets[e]??[];this.target=t.find(s=>s.planted)?.id??t[0]?.id??"",this.problems().includes(this.problem)||(this.problem=this.problems()[0]??""),this.answer=null}setMode(e){this.mode=e,this.problems().includes(this.problem)||(this.problem=this.problems()[0]??""),this.answer=null}async ask(){this.busy=!0;try{this.answer=await this.api.qaAsk(this.subject,this.problem,this.target||null)}catch(e){this.toast(e.message??String(e))}finally{this.busy=!1}}async apply(e){let t=e.action;if(t)if(t.type==="add_planting"&&t.plant_id&&t.bed_id){let s=this.plants.find(b=>b.id===t.plant_id),n=this.snapshot,i=n.beds.find(b=>b.id===t.bed_id);if(!s||!i)return;let a=n.analysis?.season??new Date().getFullYear(),o=Ue(s,"block",i),c=n.plantings.filter(b=>b.bed_id===i.id&&b.season===a).map(b=>({x:b.x_cm,y:b.y_cm,w:b.width_cm,h:b.length_cm})),h=ue(i,o,c,n.settings.snap_cm);if(!h){this.toast(this.t("advice.no_space",{bed:i.name}));return}let u={id:ee("pl"),plant_id:s.id,bed_id:i.id,season:a,layout:"block",x_cm:h.x,y_cm:h.y,width_cm:o.w,length_cm:o.h,count:null,method:Ft(s),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:"advice"},f={zones:n.zones,beds:n.beds,plantings:[...n.plantings,u],features:n.features??[]};try{await this.api.savePlan(f,n.revision),this.dismissed=new Set([...this.dismissed,e.id]),this.toast(this.t("planner.placed",{plant:_(s,this.lang),bed:i.name}))}catch(b){this.toast(b.message??String(b))}}else this.dispatchEvent(new CustomEvent("navigate",{detail:"planner",bubbles:!0,composed:!0}))}plantChip(e){let t=this.plants.find(s=>s.id===e);return t?l`<span class="plant-chip">${ht(ke(t),t.color||B(this.families,t.family),20)}${_(t,this.lang)}</span>`:l``}render(){return this.options?l`<div class="grid">
      <div class="stack">${this.renderAsk()}${this.answer?this.renderAnswer(this.answer):m}${this.renderSuggestions()}</div>
      <div class="stack">${this.renderCoverage()}${this.renderShopping()}</div>
    </div>`:l`<p class="empty">${this.t("common.loading")}</p>`}renderAsk(){let e=this.options,t=e.targets[this.subject]??[],s=t.filter(i=>i.planted),n=t.filter(i=>!i.planted);return l`<section class="card ask stack" aria-labelledby="ask-h">
      <h2 id="ask-h"><ha-icon icon="mdi:chat-question-outline"></ha-icon> ${this.t("advice.ask_title")}</h2>
      <div class="sentence">
        <span>${this.t("advice.i_have")}</span>
        <span class="modes segmented" role="group">
          <button aria-pressed=${String(this.mode==="question")} @click=${()=>this.setMode("question")}>${this.t("advice.mode.question")}</button>
          <button aria-pressed=${String(this.mode==="problem")} @click=${()=>this.setMode("problem")}>${this.t("advice.mode.problem")}</button>
        </span>
        <span>${this.t("advice.about")}</span>
        <select aria-label=${this.t("advice.subject")} @change=${i=>this.setSubject(i.target.value)}>
          ${Object.keys(e.subjects).map(i=>l`<option value=${i} ?selected=${i===this.subject}>${this.t(`advice.subject.${i}`)}</option>`)}
        </select>
        ${t.length?l`<select aria-label=${this.t("advice.target")} @change=${i=>{this.target=i.target.value,this.answer=null}}>
          ${s.length?l`<optgroup label=${this.t("advice.in_garden")}>${s.map(i=>l`<option value=${i.id} ?selected=${i.id===this.target}>${i.name}</option>`)}</optgroup>`:m}
          ${s.length?l`<optgroup label=${this.t("advice.all_plants")}>${n.map(i=>l`<option value=${i.id} ?selected=${i.id===this.target}>${i.name==="*"?this.t("advice.whole_garden"):this.subject==="tools"?this.t(`type.${i.id}`):i.name}</option>`)}</optgroup>`:n.map(i=>l`<option value=${i.id} ?selected=${i.id===this.target}>${i.name==="*"?this.t("advice.whole_garden"):this.subject==="tools"?this.t(`type.${i.id}`):i.name}</option>`)}
        </select>`:m}
        <span>:</span>
        <select aria-label=${this.t("advice.problem")} @change=${i=>{this.problem=i.target.value,this.answer=null}}>
          ${this.problems().map(i=>l`<option value=${i} ?selected=${i===this.problem}>${this.t(`advice.q.${i}`)}</option>`)}
        </select>
        <button class="btn primary" ?disabled=${this.busy} @click=${()=>this.ask()}><ha-icon icon="mdi:send"></ha-icon>${this.t("advice.ask")}</button>
      </div>
    </section>`}renderAnswer(e){let t=(s,n,i,a)=>a.length?l`<div class="section ${s}"><ha-icon icon=${n}></ha-icon><h4>${i}</h4><ul>${a.map(o=>l`<li>${o}</li>`)}</ul></div>`:m;return l`<section class="card answer" aria-live="polite">
      <h3><ha-icon icon="mdi:message-reply-text-outline"></ha-icon>${e.title} – ${this.t(`advice.q.${e.problem}`)}</h3>
      ${t("status","mdi:pulse",this.t("advice.sec.status"),e.status)}
      ${t("facts","mdi:information-outline",this.t("advice.sec.facts"),e.facts)}
      ${t("causes","mdi:help-circle-outline",this.t("advice.sec.causes"),e.causes)}
      ${t("actions","mdi:checkbox-marked-circle-outline",this.t("advice.sec.actions"),e.actions)}
      ${t("remedies","mdi:leaf",this.t("advice.sec.remedies"),e.remedies)}
      ${t("prevention","mdi:shield-check-outline",this.t("advice.sec.prevention"),e.prevention)}
      ${e.tasks.length?l`<div class="section"><ha-icon icon="mdi:format-list-checks"></ha-icon><h4>${this.t("advice.sec.tasks")}</h4>
        <ul>${e.tasks.map(s=>l`<li>${s.title} <span class="xs muted">(${s.due})</span></li>`)}</ul></div>`:m}
      ${e.plants.length>1||e.subject!=="plant"?l`<div class="chips" style="margin-top:12px">${e.plants.map(s=>this.plantChip(s))}</div>`:m}
      ${e.handbook?l`<div class="row" style="margin-top:12px"><button class="btn small ghost" @click=${()=>this.openChapter(e.handbook)}>
        <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("advice.read_more")}</button></div>`:m}
    </section>`}renderSuggestions(){let e=(this.advice?.suggestions??[]).filter(t=>!this.dismissed.has(t.id));return l`<section class="card stack" aria-labelledby="sugg-h">
      <h2 id="sugg-h"><ha-icon icon="mdi:lightbulb-group-outline"></ha-icon> ${this.t("advice.suggestions")} <span class="chip">${e.length}</span></h2>
      <p class="small muted">${this.t("advice.suggestions_intro")}</p>
      ${e.length?e.map(t=>l`<article class="sugg ${t.severity}">
        <span class="icon" title=${this.t(`advice.kind.${t.kind}`)}><ha-icon icon=${Ci[t.kind]??Ri[t.severity]}></ha-icon></span>
        <div><b>${t.title}</b><span class="small">${t.text}</span></div>
        ${t.plants.length?l`<div class="row chips">${t.plants.slice(0,5).map(s=>this.plantChip(s))}</div>`:m}
        <div class="row wrap">
          ${t.action&&this.admin?l`<button class="btn small primary" @click=${()=>this.apply(t)}>
            ${this.t(t.action.type==="add_planting"?"advice.apply_add":"advice.apply_open")}</button>`:m}
          ${t.handbook?l`<button class="btn small ghost" @click=${()=>this.openChapter(t.handbook)}>${this.t("advice.read_more")}</button>`:m}
          <button class="btn small ghost" @click=${()=>this.dismissed=new Set([...this.dismissed,t.id])}>${this.t("advice.dismiss")}</button>
        </div></article>`):l`<p class="small">${this.t("advice.none")}</p>`}
    </section>`}renderCoverage(){let e=this.advice?.coverage;if(!e)return l``;let t=new Date().getMonth(),s=n=>new Date(2026,n,1).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{month:"short"});return l`<section class="card stack" aria-labelledby="cov-h">
      <h2 id="cov-h"><ha-icon icon="mdi:calendar-sync-outline"></ha-icon> ${this.t("advice.coverage")}</h2>
      <div class="months" role="list">
        ${e.months.map((n,i)=>l`<div role="listitem" class="month ${n.length?"":"gap"} ${i===t?"now":""}"
          title=${n.map(a=>_(this.plants.find(o=>o.id===a),this.lang)).join(", ")||this.t("advice.nothing")}>
          ${s(i)}<b>${n.length}</b></div>`)}
      </div>
      <p class="xs muted">${e.gaps.length?this.t("advice.coverage_gaps"):this.t("advice.coverage_full")}</p>
    </section>`}renderShopping(){let e=this.supplies;if(!e)return l``;let t="";return l`<section class="card stack" aria-labelledby="shop-h">
      <h2 id="shop-h"><ha-icon icon="mdi:cart-outline"></ha-icon> ${this.t("advice.shopping")}</h2>
      <p class="small muted">${this.t("advice.shopping_intro")}</p>
      ${e.shopping.length?l`<table>
        ${e.shopping.map(s=>{let n=s.category!==t?l`<tr><td class="cat" colspan="3">${this.t(`advice.cat.${s.category}`)}</td></tr>`:m;return t=s.category,l`${n}<tr><td>${s.emoji} ${s.name}</td><td class="num">${s.quantity} ${s.unit}</td><td class="xs muted">${s.reason}</td></tr>`})}
      </table>`:l`<p class="small">${this.t("advice.nothing_to_buy")}</p>`}
      <details><summary class="small"><b>${this.t("advice.tools_per_task")}</b></summary>
        <table>${Object.entries(e.task_tools).filter(([,s])=>s.length).map(([s,n])=>l`<tr>
          <td>${this.t(`type.${s}`)}</td><td class="small">${n.map(i=>`${e.tools[i]?.emoji??""} ${e.tools[i]?.name??i}`).join(", ")}</td></tr>`)}</table>
      </details>
      <button class="btn small ghost" @click=${()=>this.openChapter("tools")}><ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("advice.read_tools")}</button>
    </section>`}};C.styles=[L,z`
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
      .sugg { display: grid; grid-template-columns: 32px 1fr; gap: 4px 10px; padding: 10px 12px; border-radius: var(--hl-r-md);
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
    `],p([g({attribute:!1})],C.prototype,"snapshot",2),p([g({attribute:!1})],C.prototype,"plants",2),p([g({attribute:!1})],C.prototype,"families",2),p([g({attribute:!1})],C.prototype,"api",2),p([g({attribute:!1})],C.prototype,"t",2),p([g()],C.prototype,"lang",2),p([g({type:Boolean})],C.prototype,"admin",2),p([v()],C.prototype,"mode",2),p([v()],C.prototype,"options",2),p([v()],C.prototype,"subject",2),p([v()],C.prototype,"target",2),p([v()],C.prototype,"problem",2),p([v()],C.prototype,"answer",2),p([v()],C.prototype,"busy",2),p([v()],C.prototype,"advice",2),p([v()],C.prototype,"supplies",2),p([v()],C.prototype,"dismissed",2),C=p([R("hl-advice-view")],C);var Bs=[{id:"dashboard",icon:"mdi:home-variant-outline",mobile:!0},{id:"planner",icon:"mdi:floor-plan",mobile:!0},{id:"library",icon:"mdi:sprout-outline",mobile:!0},{id:"calendar",icon:"mdi:calendar-month-outline",mobile:!0},{id:"advice",icon:"mdi:chat-question-outline",mobile:!0},{id:"handbook",icon:"mdi:book-open-page-variant-outline",mobile:!0},{id:"print",icon:"mdi:printer-outline",mobile:!1},{id:"settings",icon:"mdi:cog-outline",mobile:!1}],D=class extends T{constructor(){super(...arguments);this.narrow=!1;this.snapshot=null;this.plants=[];this.families={};this.tab="dashboard";this.toastMsg="";this.openTask=null;this.creatingTask=!1;this.error="";this.chapter="";this.t=Ve("en");this.uiLang="en"}willUpdate(e){if(e.has("hass")&&this.hass){let t=Be(this.snapshot?.lang??this.hass.locale?.language??this.hass.language);t!==this.uiLang&&(this.uiLang=t,this.t=Ve(t)),this.toggleAttribute("dark",!!this.hass.themes?.darkMode),this.api?this.api.setHass(this.hass):(this.api=new He(this.hass),this.connect())}if(e.has("route")&&this.route){let[t,s]=this.route.path.replace(/^\//,"").split("/");this.tab=Bs.some(n=>n.id===t)?t:"dashboard",this.tab==="handbook"&&(this.chapter=s??"")}}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.unsubscribe=void 0,this.api=void 0}connectedCallback(){super.connectedCallback(),this.hass&&!this.api&&(this.api=new He(this.hass),this.connect())}async connect(){try{await this.loadPlants(),this.loadGlossary(),this.unsubscribe=await this.api.subscribe(e=>{this.snapshot=e;let t=Be(e.lang);t!==this.uiLang&&(this.uiLang=t,this.t=Ve(t),this.loadGlossary()),this.openTask&&(this.openTask=e.tasks.find(s=>s.id===this.openTask.id)??null)})}catch(e){this.error=e.code==="not_loaded"?this.t("common.not_loaded"):String(e.message??e)}}async loadGlossary(){try{xs((await this.api.handbookIndex(this.uiLang)).glossary),ws(await this.api.supplies())}catch{}}openHandbook(e=""){this.chapter=e;let t=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/handbook${e?`/${e}`:""}`;history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab="handbook"}async loadPlants(){let e=await this.api.plants();this.plants=e.plants,this.families=e.families}navigate(e,t){t?.preventDefault();let s=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/${e==="dashboard"?"":e}`.replace(/\/$/,"");history.pushState(null,"",s),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab=e}toast(e){this.toastMsg=e,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastMsg="",4500)}async completeTask(e){try{await this.api.taskAction(e.id,"complete"),this.toast(this.t("task.completed",{title:e.title}))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async irrigation(e){try{if(e==="stop"){await this.api.irrigationStop(),this.toast(this.t("dash.irrigation_stopped"));return}let t=await this.api.irrigationRun(),s=Object.values(t.reasons??{});this.toast(t.started?this.t("dash.irrigation_started",{min:Math.round(t.total_minutes)}):s[0]??this.t("dash.irrigation_nothing"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async postponeTask(e,t){try{await this.api.taskAction(e.id,"postpone",{days:t}),this.toast(this.t("task.postponed",{title:e.title,n:t}))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderTab(){let e=this.snapshot,t=this.hass.user?.is_admin??!0,s=new Map(this.plants.map(n=>[n.id,n]));switch(this.tab){case"planner":return l`<hl-planner-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} .narrow=${this.narrow}></hl-planner-view>`;case"library":return l`<hl-library-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} @plants-changed=${()=>this.loadPlants()}></hl-library-view>`;case"calendar":return l`<hl-calendar-view .snapshot=${e} .t=${this.t} .lang=${this.uiLang} .plants=${s} .families=${this.families}></hl-calendar-view>`;case"advice":return l`<hl-advice-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t}></hl-advice-view>`;case"handbook":return l`<hl-handbook-view .api=${this.api} .t=${this.t} .lang=${this.uiLang} .chapterId=${this.chapter} .narrow=${this.narrow}></hl-handbook-view>`;case"print":return l`<hl-print-view .snapshot=${e} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .narrow=${this.narrow} .admin=${t}></hl-print-view>`;case"settings":return l`<hl-settings-view .snapshot=${e} .hass=${this.hass} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .admin=${t}></hl-settings-view>`;default:return l`<hl-dashboard-view .snapshot=${e} .plants=${s} .families=${this.families} .t=${this.t} .lang=${this.uiLang} .admin=${t}></hl-dashboard-view>`}}renderNav(e){return l`<nav class=${e} aria-label="Hortulus">
      ${Bs.filter(t=>e!=="bottom-nav"||t.mobile).map(t=>l`<a href="#" aria-current=${t.id===this.tab?"page":"false"} @click=${s=>this.navigate(t.id,s)}>
        <ha-icon icon=${t.icon}></ha-icon>${this.t(`nav.${t.id}`)}</a>`)}
    </nav>`}render(){return l`
      <header class="appbar">
        ${this.narrow?l`<button class="icon-btn" aria-label="Menu" @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}>
          <ha-icon icon="mdi:menu"></ha-icon></button>`:m}
        <div class="brand">${zt(30)}<span>Hortulus</span>${this.narrow?m:l`<small>${this.t("app.tagline")}</small>`}</div>
        ${this.renderNav("top")}
        ${this.narrow?l`<span style="flex:1"></span>
          <button class="icon-btn" aria-label=${this.t("nav.print")} @click=${()=>this.navigate("print")}><ha-icon icon="mdi:printer-outline"></ha-icon></button>
          <button class="icon-btn" aria-label=${this.t("nav.settings")} aria-pressed=${String(this.tab==="settings")} @click=${()=>this.navigate("settings")}>
            <ha-icon icon="mdi:cog-outline"></ha-icon></button>`:m}
      </header>
      <main @open-task=${e=>this.openTask=e.detail}
        @complete-task=${e=>this.completeTask(e.detail)}
        @postpone-task=${e=>this.postponeTask(e.detail.task,e.detail.days)}
        @irrigation=${e=>this.irrigation(e.detail)}
        @new-task=${()=>this.creatingTask=!0}
        @navigate=${e=>this.navigate(e.detail)}
        @open-handbook=${e=>this.openHandbook(e.detail?.chapter??"")}
        @hl-toast=${e=>this.toast(e.detail.message)}>
        ${this.error?l`<div class="card error">${zt(56)}<p>${this.error}</p></div>`:this.snapshot?this.renderTab():l`<p class="empty">${this.t("common.loading")}</p>`}
      </main>
      ${this.renderNav("bottom-nav")}
      ${this.snapshot&&(this.openTask||this.creatingTask)?l`<hl-task-dialog .task=${this.openTask} .create=${this.creatingTask} .snapshot=${this.snapshot}
        @open-handbook=${e=>this.openHandbook(e.detail?.chapter??"")}
        .beds=${this.snapshot.beds} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .today=${this.snapshot.analysis?.today??""}
        @hl-toast=${e=>this.toast(e.detail.message)}
        @closed=${()=>{this.openTask=null,this.creatingTask=!1}}></hl-task-dialog>`:m}
      ${this.toastMsg?l`<div class="toast" role="status" aria-live="polite">${this.toastMsg}</div>`:m}
    `}};D.styles=[bs,L,z`
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
    `],p([g({attribute:!1})],D.prototype,"hass",2),p([g({type:Boolean,reflect:!0})],D.prototype,"narrow",2),p([g({attribute:!1})],D.prototype,"route",2),p([g({attribute:!1})],D.prototype,"panel",2),p([v()],D.prototype,"snapshot",2),p([v()],D.prototype,"plants",2),p([v()],D.prototype,"families",2),p([v()],D.prototype,"tab",2),p([v()],D.prototype,"toastMsg",2),p([v()],D.prototype,"openTask",2),p([v()],D.prototype,"creatingTask",2),p([v()],D.prototype,"error",2),p([v()],D.prototype,"chapter",2),D=p([R("hortulus-panel")],D);export{D as HortulusPanel};
