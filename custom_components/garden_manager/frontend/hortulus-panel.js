var ts=Object.defineProperty;var es=Object.getOwnPropertyDescriptor;var p=(d,a,t,e)=>{for(var s=e>1?void 0:e?es(a,t):a,i=d.length-1,n;i>=0;i--)(n=d[i])&&(s=(e?n(a,t,s):n(s))||s);return e&&s&&ts(a,t,s),s};var At=globalThis,Ct=At.ShadowRoot&&(At.ShadyCSS===void 0||At.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Kt=Symbol(),me=new WeakMap,gt=class{constructor(a,t,e){if(this._$cssResult$=!0,e!==Kt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=a,this.t=t}get styleSheet(){let a=this.o,t=this.t;if(Ct&&a===void 0){let e=t!==void 0&&t.length===1;e&&(a=me.get(t)),a===void 0&&((this.o=a=new CSSStyleSheet).replaceSync(this.cssText),e&&me.set(t,a))}return a}toString(){return this.cssText}},ue=d=>new gt(typeof d=="string"?d:d+"",void 0,Kt),P=(d,...a)=>{let t=d.length===1?d[0]:a.reduce((e,s,i)=>e+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+d[i+1],d[0]);return new gt(t,d,Kt)},ge=(d,a)=>{if(Ct)d.adoptedStyleSheets=a.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of a){let e=document.createElement("style"),s=At.litNonce;s!==void 0&&e.setAttribute("nonce",s),e.textContent=t.cssText,d.appendChild(e)}},Zt=Ct?d=>d:d=>d instanceof CSSStyleSheet?(a=>{let t="";for(let e of a.cssRules)t+=e.cssText;return ue(t)})(d):d;var{is:ss,defineProperty:is,getOwnPropertyDescriptor:ns,getOwnPropertyNames:as,getOwnPropertySymbols:rs,getPrototypeOf:os}=Object,Lt=globalThis,fe=Lt.trustedTypes,ls=fe?fe.emptyScript:"",ds=Lt.reactiveElementPolyfillSupport,ft=(d,a)=>d,bt={toAttribute(d,a){switch(a){case Boolean:d=d?ls:null;break;case Object:case Array:d=d==null?d:JSON.stringify(d)}return d},fromAttribute(d,a){let t=d;switch(a){case Boolean:t=d!==null;break;case Number:t=d===null?null:Number(d);break;case Object:case Array:try{t=JSON.parse(d)}catch{t=null}}return t}},It=(d,a)=>!ss(d,a),be={attribute:!0,type:String,converter:bt,reflect:!1,useDefault:!1,hasChanged:It};Symbol.metadata??=Symbol("metadata"),Lt.litPropertyMetadata??=new WeakMap;var Z=class extends HTMLElement{static addInitializer(a){this._$Ei(),(this.l??=[]).push(a)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(a,t=be){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(a)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(a,t),!t.noAccessor){let e=Symbol(),s=this.getPropertyDescriptor(a,e,t);s!==void 0&&is(this.prototype,a,s)}}static getPropertyDescriptor(a,t,e){let{get:s,set:i}=ns(this.prototype,a)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){let r=s?.call(this);i?.call(this,n),this.requestUpdate(a,r,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(a){return this.elementProperties.get(a)??be}static _$Ei(){if(this.hasOwnProperty(ft("elementProperties")))return;let a=os(this);a.finalize(),a.l!==void 0&&(this.l=[...a.l]),this.elementProperties=new Map(a.elementProperties)}static finalize(){if(this.hasOwnProperty(ft("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ft("properties"))){let t=this.properties,e=[...as(t),...rs(t)];for(let s of e)this.createProperty(s,t[s])}let a=this[Symbol.metadata];if(a!==null){let t=litPropertyMetadata.get(a);if(t!==void 0)for(let[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let s=this._$Eu(t,e);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(a){let t=[];if(Array.isArray(a)){let e=new Set(a.flat(1/0).reverse());for(let s of e)t.unshift(Zt(s))}else a!==void 0&&t.push(Zt(a));return t}static _$Eu(a,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof a=="string"?a.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(a=>a(this))}addController(a){(this._$EO??=new Set).add(a),this.renderRoot!==void 0&&this.isConnected&&a.hostConnected?.()}removeController(a){this._$EO?.delete(a)}_$E_(){let a=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(a.set(e,this[e]),delete this[e]);a.size>0&&(this._$Ep=a)}createRenderRoot(){let a=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ge(a,this.constructor.elementStyles),a}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(a=>a.hostConnected?.())}enableUpdating(a){}disconnectedCallback(){this._$EO?.forEach(a=>a.hostDisconnected?.())}attributeChangedCallback(a,t,e){this._$AK(a,e)}_$ET(a,t){let e=this.constructor.elementProperties.get(a),s=this.constructor._$Eu(a,e);if(s!==void 0&&e.reflect===!0){let i=(e.converter?.toAttribute!==void 0?e.converter:bt).toAttribute(t,e.type);this._$Em=a,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(a,t){let e=this.constructor,s=e._$Eh.get(a);if(s!==void 0&&this._$Em!==s){let i=e.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:bt;this._$Em=s;let r=n.fromAttribute(t,i.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(a,t,e,s=!1,i){if(a!==void 0){let n=this.constructor;if(s===!1&&(i=this[a]),e??=n.getPropertyOptions(a),!((e.hasChanged??It)(i,t)||e.useDefault&&e.reflect&&i===this._$Ej?.get(a)&&!this.hasAttribute(n._$Eu(a,e))))return;this.C(a,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(a,t,{useDefault:e,reflect:s,wrapped:i},n){e&&!(this._$Ej??=new Map).has(a)&&(this._$Ej.set(a,n??t??this[a]),i!==!0||n!==void 0)||(this._$AL.has(a)||(this.hasUpdated||e||(t=void 0),this._$AL.set(a,t)),s===!0&&this._$Em!==a&&(this._$Eq??=new Set).add(a))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let a=this.scheduleUpdate();return a!=null&&await a,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[s,i]of e){let{wrapped:n}=i,r=this[s];n!==!0||this._$AL.has(s)||r===void 0||this.C(s,void 0,i,r)}}let a=!1,t=this._$AL;try{a=this.shouldUpdate(t),a?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw a=!1,this._$EM(),e}a&&this._$AE(t)}willUpdate(a){}_$AE(a){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(a)),this.updated(a)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(a){return!0}update(a){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(a){}firstUpdated(a){}};Z.elementStyles=[],Z.shadowRootOptions={mode:"open"},Z[ft("elementProperties")]=new Map,Z[ft("finalized")]=new Map,ds?.({ReactiveElement:Z}),(Lt.reactiveElementVersions??=[]).push("2.1.2");var te=globalThis,ve=d=>d,Ht=te.trustedTypes,$e=Ht?Ht.createPolicy("lit-html",{createHTML:d=>d}):void 0,Se="$lit$",J=`lit$${Math.random().toFixed(9).slice(2)}$`,Ee="?"+J,hs=`<${Ee}>`,it=document,$t=()=>it.createComment(""),yt=d=>d===null||typeof d!="object"&&typeof d!="function",ee=Array.isArray,cs=d=>ee(d)||typeof d?.[Symbol.iterator]=="function",qt=`[ 	
\f\r]`,vt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ye=/-->/g,_e=/>/g,et=RegExp(`>|${qt}(?:([^\\s"'>=/]+)(${qt}*=${qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),we=/'/g,xe=/"/g,Te=/^(?:script|style|textarea|title)$/i,se=d=>(a,...t)=>({_$litType$:d,strings:a,values:t}),l=se(1),T=se(2),Ws=se(3),q=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ke=new WeakMap,st=it.createTreeWalker(it,129);function Me(d,a){if(!ee(d)||!d.hasOwnProperty("raw"))throw Error("invalid template strings array");return $e!==void 0?$e.createHTML(a):a}var ps=(d,a)=>{let t=d.length-1,e=[],s,i=a===2?"<svg>":a===3?"<math>":"",n=vt;for(let r=0;r<t;r++){let o=d[r],h,c,u=-1,g=0;for(;g<o.length&&(n.lastIndex=g,c=n.exec(o),c!==null);)g=n.lastIndex,n===vt?c[1]==="!--"?n=ye:c[1]!==void 0?n=_e:c[2]!==void 0?(Te.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=et):c[3]!==void 0&&(n=et):n===et?c[0]===">"?(n=s??vt,u=-1):c[1]===void 0?u=-2:(u=n.lastIndex-c[2].length,h=c[1],n=c[3]===void 0?et:c[3]==='"'?xe:we):n===xe||n===we?n=et:n===ye||n===_e?n=vt:(n=et,s=void 0);let $=n===et&&d[r+1].startsWith("/>")?" ":"";i+=n===vt?o+hs:u>=0?(e.push(h),o.slice(0,u)+Se+o.slice(u)+J+$):o+J+(u===-2?r:$)}return[Me(d,i+(d[t]||"<?>")+(a===2?"</svg>":a===3?"</math>":"")),e]},_t=class d{constructor({strings:a,_$litType$:t},e){let s;this.parts=[];let i=0,n=0,r=a.length-1,o=this.parts,[h,c]=ps(a,t);if(this.el=d.createElement(h,e),st.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=st.nextNode())!==null&&o.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(Se)){let g=c[n++],$=s.getAttribute(u).split(J),w=/([.?@])?(.*)/.exec(g);o.push({type:1,index:i,name:w[2],strings:$,ctor:w[1]==="."?Xt:w[1]==="?"?Jt:w[1]==="@"?Qt:ot}),s.removeAttribute(u)}else u.startsWith(J)&&(o.push({type:6,index:i}),s.removeAttribute(u));if(Te.test(s.tagName)){let u=s.textContent.split(J),g=u.length-1;if(g>0){s.textContent=Ht?Ht.emptyScript:"";for(let $=0;$<g;$++)s.append(u[$],$t()),st.nextNode(),o.push({type:2,index:++i});s.append(u[g],$t())}}}else if(s.nodeType===8)if(s.data===Ee)o.push({type:2,index:i});else{let u=-1;for(;(u=s.data.indexOf(J,u+1))!==-1;)o.push({type:7,index:i}),u+=J.length-1}i++}}static createElement(a,t){let e=it.createElement("template");return e.innerHTML=a,e}};function rt(d,a,t=d,e){if(a===q)return a;let s=e!==void 0?t._$Co?.[e]:t._$Cl,i=yt(a)?void 0:a._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(d),s._$AT(d,t,e)),e!==void 0?(t._$Co??=[])[e]=s:t._$Cl=s),s!==void 0&&(a=rt(d,s._$AS(d,a.values),s,e)),a}var Yt=class{constructor(a,t){this._$AV=[],this._$AN=void 0,this._$AD=a,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(a){let{el:{content:t},parts:e}=this._$AD,s=(a?.creationScope??it).importNode(t,!0);st.currentNode=s;let i=st.nextNode(),n=0,r=0,o=e[0];for(;o!==void 0;){if(n===o.index){let h;o.type===2?h=new wt(i,i.nextSibling,this,a):o.type===1?h=new o.ctor(i,o.name,o.strings,this,a):o.type===6&&(h=new Vt(i,this,a)),this._$AV.push(h),o=e[++r]}n!==o?.index&&(i=st.nextNode(),n++)}return st.currentNode=it,s}p(a){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(a,e,t),t+=e.strings.length-2):e._$AI(a[t])),t++}},wt=class d{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(a,t,e,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=a,this._$AB=t,this._$AM=e,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let a=this._$AA.parentNode,t=this._$AM;return t!==void 0&&a?.nodeType===11&&(a=t.parentNode),a}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(a,t=this){a=rt(this,a,t),yt(a)?a===m||a==null||a===""?(this._$AH!==m&&this._$AR(),this._$AH=m):a!==this._$AH&&a!==q&&this._(a):a._$litType$!==void 0?this.$(a):a.nodeType!==void 0?this.T(a):cs(a)?this.k(a):this._(a)}O(a){return this._$AA.parentNode.insertBefore(a,this._$AB)}T(a){this._$AH!==a&&(this._$AR(),this._$AH=this.O(a))}_(a){this._$AH!==m&&yt(this._$AH)?this._$AA.nextSibling.data=a:this.T(it.createTextNode(a)),this._$AH=a}$(a){let{values:t,_$litType$:e}=a,s=typeof e=="number"?this._$AC(a):(e.el===void 0&&(e.el=_t.createElement(Me(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===s)this._$AH.p(t);else{let i=new Yt(s,this),n=i.u(this.options);i.p(t),this.T(n),this._$AH=i}}_$AC(a){let t=ke.get(a.strings);return t===void 0&&ke.set(a.strings,t=new _t(a)),t}k(a){ee(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,s=0;for(let i of a)s===t.length?t.push(e=new d(this.O($t()),this.O($t()),this,this.options)):e=t[s],e._$AI(i),s++;s<t.length&&(this._$AR(e&&e._$AB.nextSibling,s),t.length=s)}_$AR(a=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);a!==this._$AB;){let e=ve(a).nextSibling;ve(a).remove(),a=e}}setConnected(a){this._$AM===void 0&&(this._$Cv=a,this._$AP?.(a))}},ot=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(a,t,e,s,i){this.type=1,this._$AH=m,this._$AN=void 0,this.element=a,this.name=t,this._$AM=s,this.options=i,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=m}_$AI(a,t=this,e,s){let i=this.strings,n=!1;if(i===void 0)a=rt(this,a,t,0),n=!yt(a)||a!==this._$AH&&a!==q,n&&(this._$AH=a);else{let r=a,o,h;for(a=i[0],o=0;o<i.length-1;o++)h=rt(this,r[e+o],t,o),h===q&&(h=this._$AH[o]),n||=!yt(h)||h!==this._$AH[o],h===m?a=m:a!==m&&(a+=(h??"")+i[o+1]),this._$AH[o]=h}n&&!s&&this.j(a)}j(a){a===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,a??"")}},Xt=class extends ot{constructor(){super(...arguments),this.type=3}j(a){this.element[this.name]=a===m?void 0:a}},Jt=class extends ot{constructor(){super(...arguments),this.type=4}j(a){this.element.toggleAttribute(this.name,!!a&&a!==m)}},Qt=class extends ot{constructor(a,t,e,s,i){super(a,t,e,s,i),this.type=5}_$AI(a,t=this){if((a=rt(this,a,t,0)??m)===q)return;let e=this._$AH,s=a===m&&e!==m||a.capture!==e.capture||a.once!==e.once||a.passive!==e.passive,i=a!==m&&(e===m||s);s&&this.element.removeEventListener(this.name,this,e),i&&this.element.addEventListener(this.name,this,a),this._$AH=a}handleEvent(a){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,a):this._$AH.handleEvent(a)}},Vt=class{constructor(a,t,e){this.element=a,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(a){rt(this,a)}};var ms=te.litHtmlPolyfillSupport;ms?.(_t,wt),(te.litHtmlVersions??=[]).push("3.3.3");var Pe=(d,a,t)=>{let e=t?.renderBefore??a,s=e._$litPart$;if(s===void 0){let i=t?.renderBefore??null;e._$litPart$=s=new wt(a.insertBefore($t(),i),i,void 0,t??{})}return s._$AI(d),s};var ie=globalThis,M=class extends Z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let a=super.createRenderRoot();return this.renderOptions.renderBefore??=a.firstChild,a}update(a){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(a),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};M._$litElement$=!0,M.finalized=!0,ie.litElementHydrateSupport?.({LitElement:M});var us=ie.litElementPolyfillSupport;us?.({LitElement:M});(ie.litElementVersions??=[]).push("4.2.2");var R=d=>(a,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(d,a)}):customElements.define(d,a)};var gs={attribute:!0,type:String,converter:bt,reflect:!1,hasChanged:It},fs=(d=gs,a,t)=>{let{kind:e,metadata:s}=t,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),e==="setter"&&((d=Object.create(d)).wrapped=!0),i.set(t.name,d),e==="accessor"){let{name:n}=t;return{set(r){let o=a.get.call(this);a.set.call(this,r),this.requestUpdate(n,o,d,!0,r)},init(r){return r!==void 0&&this.C(n,void 0,d,r),r}}}if(e==="setter"){let{name:n}=t;return function(r){let o=this[n];a.call(this,r),this.requestUpdate(n,o,d,!0,r)}}throw Error("Unsupported decorator location: "+e)};function f(d){return(a,t)=>typeof t=="object"?fs(d,a,t):((e,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,e),n?Object.getOwnPropertyDescriptor(s,i):void 0})(d,a,t)}function b(d){return f({...d,state:!0,attribute:!1})}var nt=(d,a,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof a!="object"&&Object.defineProperty(d,a,t),t);function Bt(d,a){return(t,e,s)=>{let i=n=>n.renderRoot?.querySelector(d)??null;if(a){let{get:n,set:r}=typeof e=="object"?t:s??(()=>{let o=Symbol();return{get(){return this[o]},set(h){this[o]=h}}})();return nt(t,e,{get(){let o=n.call(this);return o===void 0&&(o=i(this),(o!==null||this.hasUpdated)&&r.call(this,o)),o}})}return nt(t,e,{get(){return i(this)}})}}var Dt="garden_manager",xt=class{constructor(a){this.hass=a}setHass(a){this.hass=a}call(a,t={}){return this.hass.connection.sendMessagePromise({type:`${Dt}/${a}`,...t})}subscribe(a){return this.hass.connection.subscribeMessage(a,{type:`${Dt}/subscribe`})}plants(){return this.call("plants")}savePlant(a,t){return this.call("plants/save",{plant:a,mode:t})}deletePlant(a){return this.call("plants/delete",{plant_id:a})}plantWindows(a,t,e){return this.call("plants/windows",{plant_id:a,zone_id:t??null,season:e??null})}savePlan(a,t){return this.call("plan/save",{...a,base_revision:t})}checkBed(a,t){return this.call("plan/check",{bed:a,plantings:t})}succession(a,t,e,s){return this.call("plan/succession",{planting:a,count:t,interval_days:e,placement:s})}exportPlan(a,t=!1){return this.call("plan/export",{format:a,include_tasks:t})}importPlan(a,t){return this.call("plan/import",{content:a,mode:t})}addTask(a){return this.call("tasks/add",a)}taskAction(a,t,e={}){return this.call("tasks/action",{task_id:a,action:t,...e})}saveSettings(a){return this.call("settings/save",{settings:a})}autofill(a){return this.call("plan/autofill",a)}autofillApply(a,t,e){return this.call("plan/autofill/apply",{plantings:a,replace_beds:t,base_revision:e})}printPreview(a){return this.call("print/render",{options:a})}async printPdf(a){let t=new URLSearchParams;for(let[n,r]of Object.entries(a))r==null||r===""||t.set(n,Array.isArray(r)?r.join(","):String(r));let e=await this.hass.fetchWithAuth(`/api/${Dt}/print?${t.toString()}`);if(!e.ok)throw new Error(`${e.status} ${await e.text()}`);let s=e.headers.get("Content-Disposition")??"",i=/filename="([^"]+)"/.exec(s)?.[1]??"hortulus.pdf";return{blob:await e.blob(),filename:i}}exportPdfToConfig(a){return this.hass.callService(Dt,"export_pdf",a)}handbookIndex(a){return this.call("handbook/index",a?{lang:a}:{})}handbookChapter(a,t){return this.call("handbook/chapter",{chapter_id:a,...t?{lang:t}:{}})}handbookSearch(a,t){return this.call("handbook/search",{query:a,...t?{lang:t}:{}})}irrigationPlan(){return this.call("irrigation/plan")}irrigationRun(a,t){return this.call("irrigation/run",{...a?{bed_ids:a}:{},...t?{amount_mm:t}:{}})}irrigationStop(){return this.call("irrigation/stop")}async uploadPhoto(a){let t=new FormData;t.append("file",a);let e=await this.hass.fetchWithAuth("/api/image/upload",{method:"POST",body:t});if(!e.ok)throw new Error(`Upload failed (${e.status})`);return(await e.json()).id}},ne=(d,a="256x256")=>d.startsWith("http")||d.startsWith("/")?d:`/api/image/serve/${d}/${a}`;var ae=(d=32)=>T`
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
  </svg>`;var re={"app.name":"Hortulus","app.tagline":"Your vegetable garden, planned and cared for","nav.dashboard":"Today","nav.planner":"Planner","nav.library":"Plants","nav.calendar":"Calendar","nav.settings":"Settings","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.close":"Close","common.add":"Add","common.edit":"Edit","common.none":"None","common.loading":"Loading your garden\u2026","common.not_loaded":"Hortulus is not set up yet. Add the integration under Settings \u2192 Devices & services.","common.minutes":"{n} min","common.days":"{n} days","common.cm":"{n} cm","common.today":"Today","common.tomorrow":"Tomorrow","common.yesterday":"Yesterday","common.overdue":"Overdue","common.unknown":"Unknown","common.search":"Search","common.all":"All","common.season":"Season {year}","common.admin_only":"Only administrators can change the plan.","common.saved":"Saved","common.saving":"Saving\u2026","common.unsaved":"Unsaved changes","common.conflict":"Changed elsewhere - reloaded","common.error":"Something went wrong: {message}","dash.greeting_morning":"Good morning","dash.greeting_afternoon":"Good afternoon","dash.greeting_evening":"Good evening","dash.today_tasks":"Today's tasks","dash.no_tasks":"Nothing to do today. Enjoy the garden!","dash.show_all":"Show all {n} tasks in the calendar","dash.total_time":"About {minutes} min of work","dash.beds":"Beds","dash.weather":"Next 48 hours","dash.greenhouse":"Greenhouse","dash.coming_up":"Coming up","dash.gdd":"Growing degree days","dash.gdd_since":"since {date}","dash.frost_risk":"Frost risk","dash.min_temp":"Lowest {temp} \xB0C","dash.rain":"Rain {mm} mm","dash.inside":"Inside {temp} \xB0C","dash.limits":"Crops tolerate {min}\u2013{max} \xB0C","dash.no_sensor":"No sensor","dash.active_crops":"{n} crops in the ground","dash.forecast_missing":"No forecast - advice is less precise.","planner.season":"Season","planner.undo":"Undo","planner.redo":"Redo","planner.snap":"Snap to grid","planner.zoom_in":"Zoom in","planner.zoom_out":"Zoom out","planner.fit":"Fit to screen","planner.add_bed":"Add bed","planner.add_zone":"Add zone","planner.overlay_companions":"Companions","planner.overlay_moisture":"Moisture","planner.overlay_temperature":"Temperature","planner.view_date":"Show garden on","planner.palette":"Plants","planner.palette_hint":"Drag a plant onto a bed, or press Enter to add it to the selected bed.","planner.layout":"Layout","planner.layout.single":"Single","planner.layout.block":"Block","planner.layout.row":"Row","planner.inspector":"Details","planner.nothing_selected":"Select a bed or planting to see details. Press ? for keyboard shortcuts.","planner.method":"Method","planner.method.indoor_sow":"Sow indoors, plant out","planner.method.direct_sow":"Sow in place","planner.method.transplant":"Plant (bought plants / sets)","planner.status":"Status","planner.count":"{n} plants","planner.timeline":"Timeline","planner.succession":"Succession sowing","planner.succession_count":"Number of sowings","planner.succession_interval":"Every (days)","planner.succession_placement":"Placement","planner.succession.split":"Split the area in strips","planner.succession.stack":"Same spot, one after another","planner.succession_create":"Create sowings","planner.succession_dropped":"{n} sowings fell outside the sowing window and were skipped.","planner.duplicate":"Duplicate","planner.remove":"Remove","planner.bed_name":"Name","planner.zone":"Zone","planner.kind":"Type","planner.width":"Width (cm)","planner.length":"Length (cm)","planner.orientation":"Row direction (\xB0)","planner.soil":"Soil","planner.shade":"Shade (%)","planner.wind":"Wind","planner.score":"Companion score","planner.warnings":"Warnings","planner.no_warnings":"No conflicts - nice combination!","planner.out_of_bounds":"Partly outside the bed.","planner.placed":"{plant} placed in {bed}.","planner.moved":"{name} moved.","planner.removed":"{name} removed.","planner.no_bed_here":"Drop plants onto a bed.","planner.export_json":"Export JSON","planner.export_yaml":"Export YAML","planner.import":"Import plan","planner.import_mode":"Import mode","planner.import_merge":"Merge with current plan","planner.import_replace":"Replace current plan","planner.imported":"Imported: {beds} beds, {plantings} plantings.","planner.shortcuts":"Keyboard shortcuts","planner.legend":"Plant families","planner.new_bed":"New bed","planner.new_zone":"New zone","shortcut.move":"Move selection (Shift = 10\xD7)","shortcut.undo":"Undo","shortcut.redo":"Redo","shortcut.delete":"Remove selection","shortcut.duplicate":"Duplicate selection","shortcut.grid":"Toggle snap-to-grid","shortcut.companions":"Toggle companion overlay","shortcut.moisture":"Toggle moisture overlay","shortcut.zoom":"Zoom in / out","shortcut.escape":"Clear selection","shortcut.cycle":"Select next / previous item","shortcut.help":"Show this help","lib.title":"Plant library","lib.search":"Search by name, latin name or family","lib.family":"Family","lib.filter_greenhouse":"Greenhouse","lib.filter_quick":"Quick crops","lib.filter_custom":"My plants","lib.add_custom":"New plant","lib.customize":"Customize","lib.reset":"Reset to built-in","lib.spacing":"Spacing","lib.row_spacing":"Row spacing","lib.depth":"Sowing depth","lib.germination":"Germination","lib.maturity":"Days to maturity","lib.soil_temp":"Min. soil temperature","lib.frost":"Frost tolerance","lib.min_temp":"Minimum temperature","lib.greenhouse":"Greenhouse","lib.water":"Water","lib.nutrients":"Nutrients","lib.rotation":"Rotation","lib.rotation_years":"{n} years before the same family returns","lib.friends":"Good companions","lib.enemies":"Keep apart from","lib.pests":"Pests","lib.diseases":"Diseases","lib.care":"Care","lib.calendar":"Sowing calendar","lib.indoor_sow":"Sow indoors","lib.direct_sow":"Sow outdoors","lib.transplant":"Plant out","lib.harvest":"Harvest","lib.source.builtin":"Built-in","lib.source.custom":"Custom","lib.source.override":"Customized","lib.id":"Identifier","lib.name_en":"Name (English)","lib.name_nl":"Name (Dutch)","lib.scientific":"Scientific name","lib.variety":"Variety","lib.habit":"Growth habit","lib.windows_hint":"Weeks relative to the average last spring frost (negative = before).","lib.weeks":"weeks","lib.from":"from","lib.to":"to","lib.saved":"{plant} saved.","cal.month":"Month","cal.week":"Week","cal.list":"List","cal.prev":"Previous","cal.next":"Next","cal.show_done":"Show completed","cal.add_task":"New task","cal.all_beds":"All beds","task.complete":"Done","task.skip":"Skip","task.reopen":"Reopen","task.postpone":"Postpone","task.postpone_1":"+1 day","task.postpone_3":"+3 days","task.postpone_7":"+1 week","task.postpone_to":"Move to date","task.note":"Note","task.notes":"Notes","task.photos":"Photos","task.add_photo":"Add photo","task.priority":"Priority","task.duration":"Duration (min)","task.due":"Due","task.window":"Window {start} \u2013 {end}","task.repeat":"Repeats every {n} days","task.repeat_days":"Repeat every (days, optional)","task.title":"Title","task.type":"Type","task.bed":"Bed","task.description":"Description","task.shifted":"{n} dependent tasks moved along.","task.beyond_window":"Careful: the new date is after the ideal window.","task.completed":"Nice work! {title} done.","task.source.generated":"From your plan","task.source.sensor":"From sensors","task.source.weather":"From the forecast","task.source.user":"Added by you","settings.region":"Climate & region","settings.hemisphere":"Hemisphere","settings.hemisphere.north":"Northern","settings.hemisphere.south":"Southern","settings.mode":"Profile","settings.mode.preset":"Regional preset","settings.mode.usda":"USDA hardiness zone","settings.mode.custom":"Custom frost dates","settings.preset":"Region","settings.zone":"Hardiness zone","settings.last_frost":"Last spring frost (MM-DD)","settings.first_frost":"First autumn frost (MM-DD)","settings.frost_dates_now":"This season: last frost {last}, first frost {first}.","settings.weather":"Weather & outdoor sensors","settings.weather_entity":"Weather entity","settings.outdoor_temp":"Outdoor temperature","settings.rain":"Rain sensor","settings.zones":"Zones & microclimates","settings.beds":"Beds & sensors","settings.zone_type.outdoor":"Outdoor","settings.zone_type.greenhouse":"Greenhouse","settings.zone_type.cold_frame":"Cold frame","settings.heated":"Heated","settings.min_heating":"Heating keeps above (\xB0C)","settings.sensors":"Sensors","settings.sensor.soil_moisture":"Soil moisture","settings.sensor.soil_temperature":"Soil temperature","settings.sensor.air_temperature":"Air temperature","settings.sensor.air_humidity":"Air humidity","settings.sensor.light":"Light","settings.sensor.rain":"Rain","settings.irrigation":"Irrigation switch/valve","settings.flow":"Flow (L/min)","settings.vent":"Vent / window opener","settings.notifications":"Notifications","settings.persistent":"Persistent notifications","settings.notify_services":"Push notifications (comma separated notify services)","settings.tts":"Text-to-speech entity","settings.tts_players":"Speakers (comma separated)","settings.digest":"Daily digest at","settings.frost_alerts":"Frost alerts","settings.heat_alerts":"Heat alerts","settings.tts_frost":"Announce frost on speakers","settings.general":"General","settings.language":"Language","settings.language.auto":"Follow Home Assistant","settings.units":"Units","settings.units_metric":"Metric (cm, \xB0C, mm, L)","settings.snap":"Grid size (cm)","settings.radius":"Companion radius (cm)","settings.data":"Import & export","settings.saved":"Settings saved.","type.sow_indoor":"Sow indoors","type.sow_direct":"Sow outdoors","type.harden_off":"Harden off","type.transplant":"Plant out","type.thin":"Thin","type.stake":"Support","type.prune":"Prune","type.pinch":"Pinch","type.earth_up":"Earth up","type.feed":"Feed","type.water":"Water","type.weed":"Weed","type.pest_check":"Pest check","type.harvest":"Harvest","type.ventilate":"Ventilate","type.shade":"Shade","type.frost_protect":"Frost protection","type.custom":"Task","priority.low":"Low","priority.normal":"Normal","priority.high":"High","priority.urgent":"Urgent","status.planned":"Planned","status.sown_indoors":"Sown indoors","status.sown":"Sown","status.transplanted":"Planted out","status.harvesting":"Harvesting","status.finished":"Finished","status.failed":"Failed","risk.none":"none","risk.low":"low","risk.moderate":"moderate","risk.high":"high","risk.unknown":"unknown","moisture.dry":"Dry","moisture.slightly_dry":"Slightly dry","moisture.optimal":"Optimal","moisture.wet":"Wet","moisture.unknown":"No data","irrigation.none":"No water needed","irrigation.water":"Water {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Skip - rain expected","irrigation.check_manually":"Check by hand (~{mm} mm)","gh.none":"All good","gh.ventilate":"Ventilate","gh.shade":"Shade now","gh.close_up":"Close before night","gh.heat":"Turn on heating","level.low":"Low","level.medium":"Medium","level.high":"High","suit.yes":"Suitable","suit.no":"Not suitable","suit.conditional":"Possible","frost.tender":"Tender","frost.half_hardy":"Half hardy","frost.hardy":"Hardy","frost.very_hardy":"Very hardy","kind.in_ground":"In-ground bed","kind.raised":"Raised bed","kind.container":"Container","soil.sandy":"Sandy","soil.loam":"Loam","soil.clay":"Clay","soil.silt":"Silt","soil.peat":"Peat","soil.chalk":"Chalk","soil.potting_mix":"Potting mix","wind.sheltered":"Sheltered","wind.moderate":"Moderate","wind.exposed":"Exposed","habit.bush":"Bush","habit.vine":"Vine","habit.climbing":"Climbing","habit.upright":"Upright","habit.rosette":"Rosette","habit.root":"Root crop","habit.bulb":"Bulb","reason.soil_too_cold":"Soil is {soil} \xB0C; {plant} needs {min} \xB0C to germinate.","reason.soil_too_hot":"Soil is {soil} \xB0C; above {max} \xB0C {plant} germinates poorly.","reason.frost_forecast":"Frost ({temp} \xB0C) forecast before {date}; {plant} is frost tender.","reason.window_open":"Window is open.","reason.window_not_yet":"Window opens {date}.","reason.window_closed":"Window closed on {date}.","reason.not_greenhouse_suitable":"{plant} is not suited to a greenhouse.","compat.friend":"{a} and {b} are good companions: {reason}","compat.enemy":"{a} and {b} should not be planted together: {reason}","compat.overlap":"{a} and {b} overlap - not enough space.","compat.rotation":"{family} grew in {bed} in {season}; wait {years} years.","compat.same_family_adjacent":"{a} and {b} share a family and its pests.","alert.frost":"Frost risk {level}: {temp} \xB0C expected {when}","alert.heat":"Heat stress in {zone}: {temp} \xB0C expected","alert.dry":"{bed} is dry ({moisture}%)","alert.sensor_stale":"Sensor {entity} has not reported for a while","alert.forecast_unavailable":"Weather forecast unavailable","when.tonight":"tonight","when.tomorrow_night":"tomorrow night","nav.handbook":"Handbook","nav.print":"Print","type.soil_prep":"Prepare soil","type.compost":"Compost","type.green_manure":"Green manure","type.mulch":"Mulch","type.clean_greenhouse":"Clean greenhouse","type.winter_prep":"Winter preparation","type.plan_season":"Plan season","type.tool_care":"Tool care","type.soil_test":"Soil test","type.cut_back":"Cut back","type.divide":"Divide","category.vegetable":"Vegetables","category.herb":"Herbs","category.fruit":"Fruit","category.flower":"Flowers","feature.path":"Path","feature.compost":"Compost heap","feature.water_butt":"Water butt","feature.shed":"Shed","feature.tree":"Tree","feature.hedge":"Hedge","feature.trellis":"Trellis","feature.other":"Other","stage.not_planted":"Not planted","stage.establishing":"Establishing","stage.vegetative":"Growing","stage.flowering":"Flowering","stage.ripening":"Ripening","stage.harvest":"Harvest","stage.finished":"Finished","compat.deters":"{a} protects {b}: it deters {pests}.","compat.trap":"{a} lures {pests} away from {b} (trap crop).","compat.allelopathy":"{a} releases growth-inhibiting compounds - keep it away from {b}.","compat.competition":"{a} and {b} are both heavy feeders this close together - add extra compost or give more space.","compat.shading":"{a} (about {height} cm tall) will shade {b} - plant tall crops on the side away from the sun.","compat.shade_benefit":"{a} gives {b} welcome summer shade.","alert.disease":"Disease risk {level} in {zone}","alert.nutrients":"Nutrient balance in {bed}: {status}","autoplan.bed_not_empty":"{bed} already has crops this season - tick 'replace' to re-plan it.","autoplan.no_beds":"No empty beds to fill. Select beds and tick 'replace'.","autoplan.compost_short":"Needs about {need} kg compost, you have {have} kg.","autoplan.time_over":"About {need} min per week of work - more than the {have} min you have.","autoplan.wanted_missing":"No room for: {plants}.","autoplan.consider_irrigation":"About {liters} L of water in a dry summer week - drip irrigation or a water butt will save you time.","autofill.title":"Autofill","autofill.intro":"Proposes crops, amounts and positions for season {season} from your beds and resources. Nothing is changed until you apply it.","autofill.household":"People in the household","autofill.hours":"Hours per week","autofill.water":"Water per week (L)","autofill.compost":"Compost available (kg)","autofill.has_irrigation":"Drip irrigation / automatic watering available","autofill.goals":"Goals","autofill.wanted":"Must have","autofill.excluded":"Never","autofill.beds":"Beds","autofill.all_empty":"(all empty beds)","autofill.replace":"Replace this season's crops in the selected beds","autofill.propose":"Make a proposal","autofill.apply":"Apply to plan","autofill.applied":"{n} plantings added to the plan","autofill.skipped":"Not placed","autofill.sum_crops":"{n} crops","autofill.sum_yield":"\u2248 {kg} kg harvest","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in a peak week","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Fresh vegetables","autofill.goal.storage":"Storage crops","autofill.goal.herbs":"Herbs","autofill.goal.pollinators":"Pollinators","autofill.goal.winter":"Winter harvest","autofill.goal.perennials":"Perennials","autofill.goal.easy":"Low maintenance","autofill.reason.no_suitable_bed":"no suitable bed","autofill.reason.no_space":"no space","autofill.reason.time_budget":"time budget","autofill.reason.water_budget":"water budget","cal.timeline":"Timeline","cal.garden_work":"Garden work","cal.growing":"Growing","cal.harvest_estimate":"Harvest expected around {date}","cal.harvest_estimate_short":"Expected harvest (degree days)","cal.last_frost":"Last frost","cal.first_frost":"First frost","cal.frost_dates":"Frost dates","cal.no_plantings":"No crops planned this season.","ctx.title":"Right now","ctx.moisture":"Soil moisture","ctx.soil_temp":"Soil temperature","ctx.irrigation":"Watering","ctx.water_balance":"Water deficit","ctx.nutrients":"Nutrient balance","ctx.air_temp":"Air temperature","ctx.humidity":"Humidity","ctx.disease":"Disease risk","ctx.frost":"Frost risk","ctx.today":"Today","ctx.rain":"Rain today","ctx.et0":"Evaporation (ET\u2080)","dash.gdd_today":"Degree days today","dash.water_climate":"Water & climate","dash.irrigation_mode":"Irrigation","dash.watering_now":"Watering {bed}","dash.stop":"Stop","dash.beds_need_water":"Beds needing water","dash.water_now":"Water now","dash.safety_note":"Frost lockout, rain skip and max runtime always apply.","dash.disease_risk":"Disease risk","dash.nutrients":"Nutrients","dash.water_balance":"Water deficit","dash.irrigation_started":"Watering started ({min} min)","dash.irrigation_stopped":"Watering stopped","dash.irrigation_nothing":"Nothing to water right now","handbook.title":"Gardening handbook","handbook.intro":"Background to everything Hortulus advises: soil, sowing, watering, feeding, rotation, the greenhouse and the garden year.","handbook.contents":"Contents","handbook.overview":"Overview","handbook.glossary":"Glossary","handbook.search":"Search the handbook","handbook.results":"Results for \u201C{query}\u201D","handbook.no_results":"Nothing found.","handbook.read_more":"Read more in the handbook","lib.category":"Category","lib.count":"{n} plants","lib.perennial":"perennial","lib.height":"Height","lib.roots":"roots","lib.gdd":"Degree days to harvest","lib.base":"base","lib.per_person":"Plants per person \xB7 yield","lib.deters":"Deters","lib.trap_for":"Trap crop for","lib.allelopathic":"Inhibits neighbours","lib.shade_tolerant":"Tolerates shade","lib.plant":"Plant","planner.layer_zones":"Show zones","planner.layer_features":"Show paths & elements","planner.layer_plantings":"Show crops","planner.add_feature":"Element","planner.align.left":"Align left","planner.align.right":"Align right","planner.align.top":"Align top","planner.align.bottom":"Align bottom","planner.align.hcenter":"Centre horizontally","planner.align.vcenter":"Centre vertically","planner.align.hdistribute":"Distribute horizontally","planner.align.vdistribute":"Distribute vertically","planner.aligned":"{n} items aligned","planner.moved_n":"{n} items moved","planner.removed_n":"{n} items removed","planner.selected_n":"{n} selected","planner.multi_hint":"Shift- or Ctrl-click to select several beds or crops, then drag, align or distribute them.","planner.alternatives":"Fits in","planner.better_neighbours":"Better neighbours","planner.heat_stress":"{n} hot days ahead","print.options":"Print options","print.document":"Document","print.page":"Paper","print.orientation":"Orientation","print.portrait":"Portrait","print.landscape":"Landscape","print.colors":"Colours","print.beds":"Beds","print.days":"Days ahead","print.title":"Title","print.notes":"Notes area (dot grid)","print.grid":"10 cm grid on bed sheets","print.labels":"Crop names on the map","print.download":"Download PDF","print.refresh":"Refresh preview","print.save_config":"Save to /config/www/hortulus","print.saved_to_config":"PDF saved (/local/hortulus/)","print.preview":"Preview","print.empty":"No preview yet.","print.page_n":"Page {n} of {total}","print.all_greenhouses":"All greenhouses","print.all_zones":"All zones","print.remarkable_hint":"reMarkable Paper Pro: 179.6 \xD7 239.5 mm, extra margin on the left for the toolbar. E-ink colours use light tints and patterns so your pen stays visible. Send the PDF with the reMarkable app or email.","print.doc.garden":"Garden map","print.doc.garden.hint":"Zones, beds, crops, legend","print.doc.zone":"Greenhouse / zone","print.doc.zone.hint":"One zone, zoomed in","print.doc.beds":"Bed sheets","print.doc.beds.hint":"A page per bed with grid","print.doc.tasks":"Checklist","print.doc.tasks.hint":"Open tasks per week","print.doc.season":"Season chart","print.doc.season.hint":"Sow \u2192 harvest timeline","print.doc.blank":"Planning sheet","print.doc.blank.hint":"Outlines to sketch on","print.doc.plants":"Plant cards","print.doc.plants.hint":"Key facts per crop","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Full colour","print.color.eink":"E-ink (light + patterns)","print.color.grayscale":"Grayscale","settings.irrigation_hw":"Irrigation hardware","settings.irrigation_mode":"Mode","settings.irrigation_mode.off":"Off","settings.irrigation_mode.advise":"Advise (tasks only)","settings.irrigation_mode.auto":"Automatic","settings.pump":"Pump (switch)","settings.start_time":"Start time","settings.max_runtime":"Max runtime per valve (min)","settings.frost_lockout":"Frost lockout below (\xB0C)","settings.rain_skip":"Skip when rain forecast \u2265 (mm)","settings.pump_lead":"Pump stop before valve (s)","settings.irrigation_hint":"{n} beds have a valve. Set the flow (L/min) per bed under Beds.","settings.resources":"Resources (autofill)","settings.maintenance_tasks":"Seasonal garden tasks in the calendar (soil prep, greenhouse cleaning, winter rest ...)","settings.open_meteo":"Use Open-Meteo for humidity, wind and sunshine","settings.open_meteo_hint":"Optional and off by default: sends the garden's rounded coordinates to api.open-meteo.com. Improves the evaporation (Penman-Monteith) estimate.","settings.elevation":"Elevation (m)","settings.shade_entity":"Shade screen (cover or switch)","settings.climate_control":"Vent & shade control","settings.climate_control.off":"Off","settings.climate_control.advise":"Advise (tasks)","settings.climate_control.auto":"Automatic","settings.wall_heat":"Against a warm wall","settings.thermal_mass":"Thermal mass (water barrels, stone)","settings.sensor.par":"Light (PAR)","settings.sensor.leaf_wetness":"Leaf wetness","settings.sensor.ec":"Soil EC","settings.sensor.npk_n":"Nitrogen (N)","settings.sensor.npk_p":"Phosphorus (P)","settings.sensor.npk_k":"Potassium (K)","task.postponed":"{title} postponed by {n} day(s)"};var Re={"app.name":"Hortulus","app.tagline":"Je moestuin, gepland en verzorgd","nav.dashboard":"Vandaag","nav.planner":"Planner","nav.library":"Planten","nav.calendar":"Kalender","nav.settings":"Instellingen","common.save":"Opslaan","common.cancel":"Annuleren","common.delete":"Verwijderen","common.close":"Sluiten","common.add":"Toevoegen","common.edit":"Bewerken","common.none":"Geen","common.loading":"Je tuin wordt geladen\u2026","common.not_loaded":"Hortulus is nog niet ingesteld. Voeg de integratie toe via Instellingen \u2192 Apparaten & diensten.","common.minutes":"{n} min","common.days":"{n} dagen","common.cm":"{n} cm","common.today":"Vandaag","common.tomorrow":"Morgen","common.yesterday":"Gisteren","common.overdue":"Te laat","common.unknown":"Onbekend","common.search":"Zoeken","common.all":"Alle","common.season":"Seizoen {year}","common.admin_only":"Alleen beheerders kunnen het plan wijzigen.","common.saved":"Opgeslagen","common.saving":"Opslaan\u2026","common.unsaved":"Niet-opgeslagen wijzigingen","common.conflict":"Elders gewijzigd - opnieuw geladen","common.error":"Er ging iets mis: {message}","dash.greeting_morning":"Goedemorgen","dash.greeting_afternoon":"Goedemiddag","dash.greeting_evening":"Goedenavond","dash.today_tasks":"Taken voor vandaag","dash.no_tasks":"Niets te doen vandaag. Geniet van de tuin!","dash.show_all":"Alle {n} taken tonen in de kalender","dash.total_time":"Ongeveer {minutes} min werk","dash.beds":"Bedden","dash.weather":"Komende 48 uur","dash.greenhouse":"Kas","dash.coming_up":"Binnenkort","dash.gdd":"Graaddagen","dash.gdd_since":"sinds {date}","dash.frost_risk":"Vorstrisico","dash.min_temp":"Laagste {temp} \xB0C","dash.rain":"Regen {mm} mm","dash.inside":"Binnen {temp} \xB0C","dash.limits":"Gewassen verdragen {min}\u2013{max} \xB0C","dash.no_sensor":"Geen sensor","dash.active_crops":"{n} gewassen in de grond","dash.forecast_missing":"Geen weersverwachting - advies is minder nauwkeurig.","planner.season":"Seizoen","planner.undo":"Ongedaan maken","planner.redo":"Opnieuw","planner.snap":"Uitlijnen op raster","planner.zoom_in":"Inzoomen","planner.zoom_out":"Uitzoomen","planner.fit":"Passend maken","planner.add_bed":"Bed toevoegen","planner.add_zone":"Zone toevoegen","planner.overlay_companions":"Buurplanten","planner.overlay_moisture":"Vocht","planner.overlay_temperature":"Temperatuur","planner.view_date":"Toon tuin op","planner.palette":"Planten","planner.palette_hint":"Sleep een plant naar een bed, of druk op Enter om hem aan het geselecteerde bed toe te voegen.","planner.layout":"Indeling","planner.layout.single":"Los","planner.layout.block":"Blok","planner.layout.row":"Rij","planner.inspector":"Details","planner.nothing_selected":"Selecteer een bed of beplanting voor details. Druk op ? voor sneltoetsen.","planner.method":"Methode","planner.method.indoor_sow":"Binnen zaaien, later uitplanten","planner.method.direct_sow":"Ter plaatse zaaien","planner.method.transplant":"Planten (gekochte planten / plantuitjes)","planner.status":"Status","planner.count":"{n} planten","planner.timeline":"Tijdlijn","planner.succession":"Opeenvolgend zaaien","planner.succession_count":"Aantal zaaimomenten","planner.succession_interval":"Elke (dagen)","planner.succession_placement":"Plaatsing","planner.succession.split":"Vlak in stroken verdelen","planner.succession.stack":"Zelfde plek, na elkaar","planner.succession_create":"Zaaimomenten maken","planner.succession_dropped":"{n} zaaimomenten vielen buiten het zaaivenster en zijn overgeslagen.","planner.duplicate":"Dupliceren","planner.remove":"Verwijderen","planner.bed_name":"Naam","planner.zone":"Zone","planner.kind":"Soort","planner.width":"Breedte (cm)","planner.length":"Lengte (cm)","planner.orientation":"Rijrichting (\xB0)","planner.soil":"Grond","planner.shade":"Schaduw (%)","planner.wind":"Wind","planner.score":"Buurplantenscore","planner.warnings":"Waarschuwingen","planner.no_warnings":"Geen conflicten - mooie combinatie!","planner.out_of_bounds":"Valt deels buiten het bed.","planner.placed":"{plant} geplaatst in {bed}.","planner.moved":"{name} verplaatst.","planner.removed":"{name} verwijderd.","planner.no_bed_here":"Zet planten op een bed.","planner.export_json":"Exporteer JSON","planner.export_yaml":"Exporteer YAML","planner.import":"Plan importeren","planner.import_mode":"Importmodus","planner.import_merge":"Samenvoegen met huidig plan","planner.import_replace":"Huidig plan vervangen","planner.imported":"Ge\xEFmporteerd: {beds} bedden, {plantings} beplantingen.","planner.shortcuts":"Sneltoetsen","planner.legend":"Plantenfamilies","planner.new_bed":"Nieuw bed","planner.new_zone":"Nieuwe zone","shortcut.move":"Selectie verplaatsen (Shift = 10\xD7)","shortcut.undo":"Ongedaan maken","shortcut.redo":"Opnieuw","shortcut.delete":"Selectie verwijderen","shortcut.duplicate":"Selectie dupliceren","shortcut.grid":"Raster aan/uit","shortcut.companions":"Buurplanten-laag aan/uit","shortcut.moisture":"Vochtlaag aan/uit","shortcut.zoom":"In- / uitzoomen","shortcut.escape":"Selectie opheffen","shortcut.cycle":"Volgend / vorig item selecteren","shortcut.help":"Deze hulp tonen","lib.title":"Plantenbibliotheek","lib.search":"Zoek op naam, Latijnse naam of familie","lib.family":"Familie","lib.filter_greenhouse":"Kas","lib.filter_quick":"Snelle gewassen","lib.filter_custom":"Mijn planten","lib.add_custom":"Nieuwe plant","lib.customize":"Aanpassen","lib.reset":"Terug naar standaard","lib.spacing":"Plantafstand","lib.row_spacing":"Rijafstand","lib.depth":"Zaaidiepte","lib.germination":"Kiemduur","lib.maturity":"Dagen tot oogst","lib.soil_temp":"Min. bodemtemperatuur","lib.frost":"Vorstbestendigheid","lib.min_temp":"Minimumtemperatuur","lib.greenhouse":"Kas","lib.water":"Water","lib.nutrients":"Voeding","lib.rotation":"Wisselteelt","lib.rotation_years":"{n} jaar voordat dezelfde familie terugkomt","lib.friends":"Goede buren","lib.enemies":"Uit elkaar houden","lib.pests":"Plagen","lib.diseases":"Ziekten","lib.care":"Verzorging","lib.calendar":"Zaaikalender","lib.indoor_sow":"Binnen zaaien","lib.direct_sow":"Buiten zaaien","lib.transplant":"Uitplanten","lib.harvest":"Oogsten","lib.source.builtin":"Standaard","lib.source.custom":"Eigen","lib.source.override":"Aangepast","lib.id":"Code","lib.name_en":"Naam (Engels)","lib.name_nl":"Naam (Nederlands)","lib.scientific":"Wetenschappelijke naam","lib.variety":"Ras","lib.habit":"Groeiwijze","lib.windows_hint":"Weken ten opzichte van de gemiddelde laatste voorjaarsvorst (negatief = ervoor).","lib.weeks":"weken","lib.from":"van","lib.to":"tot","lib.saved":"{plant} opgeslagen.","cal.month":"Maand","cal.week":"Week","cal.list":"Lijst","cal.prev":"Vorige","cal.next":"Volgende","cal.show_done":"Afgeronde taken tonen","cal.add_task":"Nieuwe taak","cal.all_beds":"Alle bedden","task.complete":"Klaar","task.skip":"Overslaan","task.reopen":"Heropenen","task.postpone":"Uitstellen","task.postpone_1":"+1 dag","task.postpone_3":"+3 dagen","task.postpone_7":"+1 week","task.postpone_to":"Naar datum","task.note":"Notitie","task.notes":"Notities","task.photos":"Foto's","task.add_photo":"Foto toevoegen","task.priority":"Prioriteit","task.duration":"Duur (min)","task.due":"Datum","task.window":"Venster {start} \u2013 {end}","task.repeat":"Herhaalt elke {n} dagen","task.repeat_days":"Herhaal elke (dagen, optioneel)","task.title":"Titel","task.type":"Soort","task.bed":"Bed","task.description":"Omschrijving","task.shifted":"{n} afhankelijke taken schoven mee.","task.beyond_window":"Let op: de nieuwe datum ligt na het ideale venster.","task.completed":"Goed bezig! {title} gedaan.","task.source.generated":"Uit je plan","task.source.sensor":"Uit sensoren","task.source.weather":"Uit de weersverwachting","task.source.user":"Door jou toegevoegd","settings.region":"Klimaat & regio","settings.hemisphere":"Halfrond","settings.hemisphere.north":"Noordelijk","settings.hemisphere.south":"Zuidelijk","settings.mode":"Profiel","settings.mode.preset":"Regionale voorinstelling","settings.mode.usda":"USDA-winterhardheidszone","settings.mode.custom":"Eigen vorstdata","settings.preset":"Regio","settings.zone":"Winterhardheidszone","settings.last_frost":"Laatste voorjaarsvorst (MM-DD)","settings.first_frost":"Eerste najaarsvorst (MM-DD)","settings.frost_dates_now":"Dit seizoen: laatste vorst {last}, eerste vorst {first}.","settings.weather":"Weer & buitensensoren","settings.weather_entity":"Weerentiteit","settings.outdoor_temp":"Buitentemperatuur","settings.rain":"Regensensor","settings.zones":"Zones & microklimaat","settings.beds":"Bedden & sensoren","settings.zone_type.outdoor":"Buiten","settings.zone_type.greenhouse":"Kas","settings.zone_type.cold_frame":"Koude bak","settings.heated":"Verwarmd","settings.min_heating":"Verwarming houdt boven (\xB0C)","settings.sensors":"Sensoren","settings.sensor.soil_moisture":"Bodemvocht","settings.sensor.soil_temperature":"Bodemtemperatuur","settings.sensor.air_temperature":"Luchttemperatuur","settings.sensor.air_humidity":"Luchtvochtigheid","settings.sensor.light":"Licht","settings.sensor.rain":"Regen","settings.irrigation":"Beregeningsschakelaar/-klep","settings.flow":"Debiet (L/min)","settings.vent":"Raamopener / ventilatie","settings.notifications":"Meldingen","settings.persistent":"Blijvende meldingen","settings.notify_services":"Pushmeldingen (notify-diensten, kommagescheiden)","settings.tts":"Tekst-naar-spraak-entiteit","settings.tts_players":"Speakers (kommagescheiden)","settings.digest":"Dagelijks overzicht om","settings.frost_alerts":"Vorstwaarschuwingen","settings.heat_alerts":"Hittewaarschuwingen","settings.tts_frost":"Vorst omroepen via speakers","settings.general":"Algemeen","settings.language":"Taal","settings.language.auto":"Volg Home Assistant","settings.units":"Eenheden","settings.units_metric":"Metrisch (cm, \xB0C, mm, L)","settings.snap":"Rastergrootte (cm)","settings.radius":"Bereik buurplanten (cm)","settings.data":"Importeren & exporteren","settings.saved":"Instellingen opgeslagen.","type.sow_indoor":"Binnen zaaien","type.sow_direct":"Buiten zaaien","type.harden_off":"Afharden","type.transplant":"Uitplanten","type.thin":"Uitdunnen","type.stake":"Ondersteunen","type.prune":"Snoeien","type.pinch":"Toppen","type.earth_up":"Aanaarden","type.feed":"Bemesten","type.water":"Water geven","type.weed":"Wieden","type.pest_check":"Plaagcontrole","type.harvest":"Oogsten","type.ventilate":"Luchten","type.shade":"Schaduwen","type.frost_protect":"Vorstbescherming","type.custom":"Taak","priority.low":"Laag","priority.normal":"Normaal","priority.high":"Hoog","priority.urgent":"Dringend","status.planned":"Gepland","status.sown_indoors":"Binnen gezaaid","status.sown":"Gezaaid","status.transplanted":"Uitgeplant","status.harvesting":"Oogst loopt","status.finished":"Afgerond","status.failed":"Mislukt","risk.none":"geen","risk.low":"laag","risk.moderate":"matig","risk.high":"hoog","risk.unknown":"onbekend","moisture.dry":"Droog","moisture.slightly_dry":"Iets droog","moisture.optimal":"Optimaal","moisture.wet":"Nat","moisture.unknown":"Geen data","irrigation.none":"Geen water nodig","irrigation.water":"Geef {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Overslaan - regen verwacht","irrigation.check_manually":"Controleer met de hand (~{mm} mm)","gh.none":"Alles goed","gh.ventilate":"Luchten","gh.shade":"Nu schaduwen","gh.close_up":"Sluiten voor de nacht","gh.heat":"Verwarming aan","level.low":"Laag","level.medium":"Gemiddeld","level.high":"Hoog","suit.yes":"Geschikt","suit.no":"Niet geschikt","suit.conditional":"Mogelijk","frost.tender":"Vorstgevoelig","frost.half_hardy":"Half winterhard","frost.hardy":"Winterhard","frost.very_hardy":"Zeer winterhard","kind.in_ground":"Bed in de grond","kind.raised":"Verhoogd bed","kind.container":"Bak / pot","soil.sandy":"Zand","soil.loam":"Leem","soil.clay":"Klei","soil.silt":"L\xF6ss","soil.peat":"Veen","soil.chalk":"Kalk","soil.potting_mix":"Potgrond","wind.sheltered":"Beschut","wind.moderate":"Gemiddeld","wind.exposed":"Winderig","habit.bush":"Struik","habit.vine":"Rank","habit.climbing":"Klimmend","habit.upright":"Rechtop","habit.rosette":"Rozet","habit.root":"Wortelgewas","habit.bulb":"Bol","reason.soil_too_cold":"Grond is {soil} \xB0C; {plant} heeft {min} \xB0C nodig om te kiemen.","reason.soil_too_hot":"Grond is {soil} \xB0C; boven {max} \xB0C kiemt {plant} slecht.","reason.frost_forecast":"Vorst ({temp} \xB0C) verwacht voor {date}; {plant} is vorstgevoelig.","reason.window_open":"Het venster is open.","reason.window_not_yet":"Venster opent {date}.","reason.window_closed":"Venster sloot op {date}.","reason.not_greenhouse_suitable":"{plant} is niet geschikt voor de kas.","compat.friend":"{a} en {b} zijn goede buren: {reason}","compat.enemy":"{a} en {b} kun je beter niet samen planten: {reason}","compat.overlap":"{a} en {b} overlappen - te weinig ruimte.","compat.rotation":"{family} stond in {season} in {bed}; wacht {years} jaar.","compat.same_family_adjacent":"{a} en {b} zijn familie en delen plagen.","alert.frost":"Vorstrisico {level}: {temp} \xB0C verwacht {when}","alert.heat":"Hittestress in {zone}: {temp} \xB0C verwacht","alert.dry":"{bed} is droog ({moisture}%)","alert.sensor_stale":"Sensor {entity} heeft al een tijd niets gemeld","alert.forecast_unavailable":"Weersverwachting niet beschikbaar","when.tonight":"vannacht","when.tomorrow_night":"morgennacht","nav.handbook":"Handboek","nav.print":"Afdrukken","type.soil_prep":"Bodem klaarmaken","type.compost":"Compost","type.green_manure":"Groenbemester","type.mulch":"Mulchen","type.clean_greenhouse":"Serre kuisen","type.winter_prep":"Winterklaar maken","type.plan_season":"Seizoen plannen","type.tool_care":"Gereedschap","type.soil_test":"Bodemanalyse","type.cut_back":"Terugsnoeien","type.divide":"Scheuren","category.vegetable":"Groenten","category.herb":"Kruiden","category.fruit":"Fruit","category.flower":"Bloemen","feature.path":"Pad","feature.compost":"Composthoop","feature.water_butt":"Regenton","feature.shed":"Tuinhuis","feature.tree":"Boom","feature.hedge":"Haag","feature.trellis":"Klimrek","feature.other":"Overig","stage.not_planted":"Nog niet geplant","stage.establishing":"Aanslaan","stage.vegetative":"Groei","stage.flowering":"Bloei","stage.ripening":"Afrijping","stage.harvest":"Oogst","stage.finished":"Afgelopen","compat.deters":"{a} beschermt {b}: weert {pests}.","compat.trap":"{a} lokt {pests} weg van {b} (vangplant).","compat.allelopathy":"{a} scheidt groeiremmende stoffen af - houd uit de buurt van {b}.","compat.competition":"{a} en {b} zijn allebei zware eters zo dicht bij elkaar - geef extra compost of meer ruimte.","compat.shading":"{a} (ongeveer {height} cm hoog) zal {b} beschaduwen - zet hoge gewassen aan de kant weg van de zon.","compat.shade_benefit":"{a} geeft {b} welkome zomerschaduw.","alert.disease":"Ziekterisico {level} in {zone}","alert.nutrients":"Voedingsbalans in {bed}: {status}","autoplan.bed_not_empty":"{bed} heeft dit seizoen al gewassen - vink 'vervangen' aan om het opnieuw te plannen.","autoplan.no_beds":"Geen lege bedden om te vullen. Kies bedden en vink 'vervangen' aan.","autoplan.compost_short":"Er is ongeveer {need} kg compost nodig, je hebt {have} kg.","autoplan.time_over":"Ongeveer {need} min werk per week - meer dan de {have} min die je hebt.","autoplan.wanted_missing":"Geen plaats voor: {plants}.","autoplan.consider_irrigation":"Ongeveer {liters} L water in een droge zomerweek - druppelbevloeiing of een regenton bespaart je tijd.","autofill.title":"Automatisch invullen","autofill.intro":"Stelt gewassen, hoeveelheden en plaatsen voor seizoen {season} voor op basis van je bedden en middelen. Er verandert niets tot je het toepast.","autofill.household":"Personen in het gezin","autofill.hours":"Uren per week","autofill.water":"Water per week (L)","autofill.compost":"Beschikbare compost (kg)","autofill.has_irrigation":"Druppelbevloeiing / automatisch water geven aanwezig","autofill.goals":"Doelen","autofill.wanted":"Zeker erbij","autofill.excluded":"Nooit","autofill.beds":"Bedden","autofill.all_empty":"(alle lege bedden)","autofill.replace":"Gewassen van dit seizoen in de gekozen bedden vervangen","autofill.propose":"Voorstel maken","autofill.apply":"In het plan zetten","autofill.applied":"{n} teelten toegevoegd aan het plan","autofill.skipped":"Niet geplaatst","autofill.sum_crops":"{n} gewassen","autofill.sum_yield":"\u2248 {kg} kg oogst","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in een piekweek","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Verse groenten","autofill.goal.storage":"Bewaargroenten","autofill.goal.herbs":"Kruiden","autofill.goal.pollinators":"Bestuivers","autofill.goal.winter":"Wintergroenten","autofill.goal.perennials":"Vaste planten","autofill.goal.easy":"Weinig onderhoud","autofill.reason.no_suitable_bed":"geen geschikt bed","autofill.reason.no_space":"geen plaats","autofill.reason.time_budget":"tijdsbudget","autofill.reason.water_budget":"waterbudget","cal.timeline":"Tijdlijn","cal.garden_work":"Tuinwerk","cal.growing":"Groeit","cal.harvest_estimate":"Oogst verwacht rond {date}","cal.harvest_estimate_short":"Verwachte oogst (graaddagen)","cal.last_frost":"Laatste vorst","cal.first_frost":"Eerste vorst","cal.frost_dates":"Vorstdata","cal.no_plantings":"Dit seizoen nog geen gewassen gepland.","ctx.title":"Nu","ctx.moisture":"Bodemvocht","ctx.soil_temp":"Bodemtemperatuur","ctx.irrigation":"Water geven","ctx.water_balance":"Watertekort","ctx.nutrients":"Voedingsbalans","ctx.air_temp":"Luchttemperatuur","ctx.humidity":"Luchtvochtigheid","ctx.disease":"Ziekterisico","ctx.frost":"Vorstrisico","ctx.today":"Vandaag","ctx.rain":"Regen vandaag","ctx.et0":"Verdamping (ET\u2080)","dash.gdd_today":"Graaddagen vandaag","dash.water_climate":"Water & klimaat","dash.irrigation_mode":"Bewatering","dash.watering_now":"Bezig met {bed}","dash.stop":"Stop","dash.beds_need_water":"Bedden die water nodig hebben","dash.water_now":"Nu water geven","dash.safety_note":"Vorstvergrendeling, regen overslaan en maximale looptijd gelden altijd.","dash.disease_risk":"Ziekterisico","dash.nutrients":"Voeding","dash.water_balance":"Watertekort","dash.irrigation_started":"Bewatering gestart ({min} min)","dash.irrigation_stopped":"Bewatering gestopt","dash.irrigation_nothing":"Nu niets om water te geven","handbook.title":"Tuinhandboek","handbook.intro":"De achtergrond bij alles wat Hortulus aanraadt: bodem, zaaien, water, bemesting, vruchtwisseling, de serre en het tuinjaar.","handbook.contents":"Inhoud","handbook.overview":"Overzicht","handbook.glossary":"Woordenlijst","handbook.search":"Zoeken in het handboek","handbook.results":"Resultaten voor \u201C{query}\u201D","handbook.no_results":"Niets gevonden.","handbook.read_more":"Lees meer in het handboek","lib.category":"Categorie","lib.count":"{n} planten","lib.perennial":"overblijvend","lib.height":"Hoogte","lib.roots":"wortels","lib.gdd":"Graaddagen tot oogst","lib.base":"basis","lib.per_person":"Planten per persoon \xB7 opbrengst","lib.deters":"Weert","lib.trap_for":"Vangplant voor","lib.allelopathic":"Remt buren","lib.shade_tolerant":"Verdraagt schaduw","lib.plant":"Plant","planner.layer_zones":"Zones tonen","planner.layer_features":"Paden & elementen tonen","planner.layer_plantings":"Gewassen tonen","planner.add_feature":"Element","planner.align.left":"Links uitlijnen","planner.align.right":"Rechts uitlijnen","planner.align.top":"Boven uitlijnen","planner.align.bottom":"Onder uitlijnen","planner.align.hcenter":"Horizontaal centreren","planner.align.vcenter":"Verticaal centreren","planner.align.hdistribute":"Horizontaal verdelen","planner.align.vdistribute":"Verticaal verdelen","planner.aligned":"{n} items uitgelijnd","planner.moved_n":"{n} items verplaatst","planner.removed_n":"{n} items verwijderd","planner.selected_n":"{n} geselecteerd","planner.multi_hint":"Shift- of Ctrl-klik om meerdere bedden of gewassen te kiezen; sleep, lijn uit of verdeel ze daarna.","planner.alternatives":"Past in","planner.better_neighbours":"Betere buren","planner.heat_stress":"{n} hete dagen op komst","print.options":"Afdrukopties","print.document":"Document","print.page":"Papier","print.orientation":"Richting","print.portrait":"Staand","print.landscape":"Liggend","print.colors":"Kleuren","print.beds":"Bedden","print.days":"Dagen vooruit","print.title":"Titel","print.notes":"Notitievlak (stippelraster)","print.grid":"Raster van 10 cm op bedfiches","print.labels":"Gewasnamen op de kaart","print.download":"PDF downloaden","print.refresh":"Voorbeeld vernieuwen","print.save_config":"Opslaan in /config/www/hortulus","print.saved_to_config":"PDF opgeslagen (/local/hortulus/)","print.preview":"Voorbeeld","print.empty":"Nog geen voorbeeld.","print.page_n":"Pagina {n} van {total}","print.all_greenhouses":"Alle serres","print.all_zones":"Alle zones","print.remarkable_hint":"reMarkable Paper Pro: 179,6 \xD7 239,5 mm, extra marge links voor de werkbalk. E-inkkleuren gebruiken lichte tinten en patronen zodat je pen zichtbaar blijft. Stuur de PDF via de reMarkable-app of e-mail.","print.doc.garden":"Tuinplan","print.doc.garden.hint":"Zones, bedden, gewassen, legende","print.doc.zone":"Serre / zone","print.doc.zone.hint":"E\xE9n zone, ingezoomd","print.doc.beds":"Bedfiches","print.doc.beds.hint":"Een pagina per bed met raster","print.doc.tasks":"Takenlijst","print.doc.tasks.hint":"Open taken per week","print.doc.season":"Seizoensoverzicht","print.doc.season.hint":"Tijdlijn zaaien \u2192 oogst","print.doc.blank":"Planningsblad","print.doc.blank.hint":"Omtrekken om op te schetsen","print.doc.plants":"Plantkaarten","print.doc.plants.hint":"Kerngegevens per gewas","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Volle kleur","print.color.eink":"E-ink (licht + patronen)","print.color.grayscale":"Grijstinten","settings.irrigation_hw":"Bewateringshardware","settings.irrigation_mode":"Modus","settings.irrigation_mode.off":"Uit","settings.irrigation_mode.advise":"Advies (alleen taken)","settings.irrigation_mode.auto":"Automatisch","settings.pump":"Pomp (schakelaar)","settings.start_time":"Starttijd","settings.max_runtime":"Max. looptijd per klep (min)","settings.frost_lockout":"Vorstvergrendeling onder (\xB0C)","settings.rain_skip":"Overslaan bij regenverwachting \u2265 (mm)","settings.pump_lead":"Pomp stopt v\xF3\xF3r klep (s)","settings.irrigation_hint":"{n} bedden hebben een klep. Stel per bed het debiet (L/min) in bij Bedden.","settings.resources":"Middelen (automatisch invullen)","settings.maintenance_tasks":"Seizoenswerk in de kalender (bodem klaarmaken, serre kuisen, winterrust ...)","settings.open_meteo":"Open-Meteo gebruiken voor vocht, wind en zon","settings.open_meteo_hint":"Optioneel en standaard uit: stuurt de afgeronde co\xF6rdinaten van de tuin naar api.open-meteo.com. Verbetert de verdampingsberekening (Penman-Monteith).","settings.elevation":"Hoogte (m)","settings.shade_entity":"Schaduwscherm (cover of schakelaar)","settings.climate_control":"Luchten & schaduw sturen","settings.climate_control.off":"Uit","settings.climate_control.advise":"Advies (taken)","settings.climate_control.auto":"Automatisch","settings.wall_heat":"Tegen een warme muur","settings.thermal_mass":"Thermische massa (watervaten, steen)","settings.sensor.par":"Licht (PAR)","settings.sensor.leaf_wetness":"Bladnat","settings.sensor.ec":"Bodem-EC","settings.sensor.npk_n":"Stikstof (N)","settings.sensor.npk_p":"Fosfor (P)","settings.sensor.npk_k":"Kalium (K)","task.postponed":"{title} {n} dag(en) uitgesteld"};var bs={en:re,nl:Re},kt=d=>(d??"en").toLowerCase().split(/[-_]/)[0]==="nl"?"nl":"en";function Nt(d){let a=bs[kt(d)];return(t,e={})=>(a[t]??re[t]??t).replace(/\{(\w+)\}/g,(i,n)=>{let r=e[n];return r==null?`{${n}}`:t.startsWith("alert.")&&n==="level"?a[`risk.${r}`]??String(r):t.startsWith("alert.")&&n==="when"?a[String(r)]??String(r):Array.isArray(r)?r.join(", "):String(r)})}var vs=d=>d.replace(/_/g," ").replace(/^\w/,a=>a.toUpperCase()),ze={aphids:"bladluis",whitefly:"witte vlieg",red_spider_mite:"spint",thrips:"trips",slugs:"slakken",cabbage_white:"koolwitje",cabbage_root_fly:"koolvlieg",flea_beetle:"aardvlo",carrot_fly:"wortelvlieg",onion_fly:"uienvlieg",leek_moth:"preimot",pea_moth:"erwtenbladroller",birds:"vogels",pigeons:"duiven",black_bean_aphid:"zwarte bonenluis",bean_weevil:"bonenkever",leaf_miner:"bladmineerder",late_blight:"phytophthora",early_blight:"alternaria (vroeg)",blossom_end_rot:"neusrot",botrytis:"grauwe schimmel",powdery_mildew:"echte meeldauw",downy_mildew:"valse meeldauw",cucumber_mosaic_virus:"komkommermoza\xEFekvirus",clubroot:"knolvoet",white_rot:"witrot",rust:"roest",alternaria:"alternaria",leaf_spot:"bladvlekken",root_rot:"wortelrot",anthracnose:"vlekkenziekte",halo_blight:"vetvlekkenziekte",chocolate_spot:"chocoladevlekken",damping_off:"kiemplantenziekte",ants:"mieren",asparagus_beetle:"aspergekever",canker:"kanker",celery_fly:"selderijvlieg",colorado_beetle:"coloradokever",nematodes:"aaltjes",scab:"schurft",smut:"builenbrand",verticillium_wilt:"verwelkingsziekte",wireworm:"ritnaald"},St=(d,a)=>kt(a)==="nl"&&ze[d]?ze[d]:vs(d);var Ae=P`
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
`,I=P`
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
`;var $s="#7d7d7d";function N(d,a){return a&&d[a]?.color||$s}function Ce(d){let a=d.replace(/[^\p{L}\s]/gu,"").trim(),t=a.split(/\s+/);return t.length>1?(t[0][0]+t[1][0]).toUpperCase():(a.slice(0,2)||"?").replace(/^./,e=>e.toUpperCase())}function x(d,a){return d?d.names[a]||d.names.en||d.id:"?"}var lt={sow_indoor:"mdi:seed-outline",sow_direct:"mdi:seed",harden_off:"mdi:weather-partly-cloudy",transplant:"mdi:shovel",thin:"mdi:content-cut",stake:"mdi:pillar",prune:"mdi:scissors-cutting",pinch:"mdi:hand-back-left-outline",earth_up:"mdi:terrain",feed:"mdi:bottle-tonic-plus-outline",water:"mdi:watering-can",weed:"mdi:sprout-outline",pest_check:"mdi:bug-outline",harvest:"mdi:basket-outline",ventilate:"mdi:window-open-variant",shade:"mdi:sun-angle-outline",frost_protect:"mdi:snowflake-alert",soil_prep:"mdi:shovel",compost:"mdi:recycle",green_manure:"mdi:grass",mulch:"mdi:layers-outline",clean_greenhouse:"mdi:spray-bottle",winter_prep:"mdi:snowflake-variant",plan_season:"mdi:clipboard-text-outline",tool_care:"mdi:hammer-wrench",soil_test:"mdi:test-tube",cut_back:"mdi:content-cut",divide:"mdi:call-split",custom:"mdi:checkbox-marked-circle-outline"},dt={sow_indoor:"var(--hl-leaf-500)",sow_direct:"var(--hl-leaf-500)",transplant:"var(--hl-leaf-700)",harvest:"var(--hl-sun-500)",water:"var(--hl-water-500)",frost_protect:"var(--hl-frost-500)",ventilate:"var(--hl-frost-500)",shade:"var(--hl-sun-500)",weed:"var(--hl-soil-500)",pest_check:"var(--hl-tomato-500)",soil_prep:"var(--hl-soil-500)",compost:"var(--hl-soil-700)",green_manure:"var(--hl-leaf-600)",mulch:"var(--hl-soil-500)",clean_greenhouse:"var(--hl-frost-500)",winter_prep:"var(--hl-frost-500)",plan_season:"var(--hl-leaf-700)"},W=d=>{let[a,t,e]=d.slice(0,10).split("-").map(Number);return new Date(a,t-1,e,12)},ht=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`,A=(d,a)=>{let t=W(d);return t.setDate(t.getDate()+a),ht(t)},at=(d,a)=>Math.round((W(a).getTime()-W(d).getTime())/864e5);function y(d,a,t={day:"numeric",month:"short"}){return d?W(d).toLocaleDateString(a==="nl"?"nl-NL":"en-GB",t):"\u2013"}function oe(d,a){let t=d.anchor==="first_frost"?a.first_frost:a.last_frost,e=A(t,d.start_week*7),s=A(t,d.end_week*7+6);return e<=s?[e,s]:[s,e]}function Le(d,a,t){return a?d.status==="failed"||d.status==="finished"?!1:a.in_ground<=t&&t<=a.harvest_end:!0}function Et(d){let a={urgent:3,high:2,normal:1,low:0};return[...d].sort((t,e)=>t.due===e.due?a[e.priority]-a[t.priority]:t.due<e.due?-1:1)}function ct(d){let a=globalThis.crypto?.randomUUID?.()??Math.random().toString(16).slice(2)+Date.now().toString(16);return`${d}_${a.replace(/-/g,"").slice(0,10)}`}function Ot(d,a,t){let e=new Blob([a],{type:t}),s=URL.createObjectURL(e),i=document.createElement("a");i.href=s,i.download=d,i.click(),setTimeout(()=>URL.revokeObjectURL(s),1e3)}var Ie={},le=new Set;function He(d){Ie=d,le.forEach(a=>a())}function ys(d,a){d.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:a},bubbles:!0,composed:!0}))}var pt=null,Q=class extends M{constructor(){super(...arguments);this.term="";this.open=!1;this.refresh=()=>this.requestUpdate();this.outside=t=>{t.composedPath().includes(this)?this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0}):this.close()}}connectedCallback(){super.connectedCallback(),le.add(this.refresh)}disconnectedCallback(){super.disconnectedCallback(),le.delete(this.refresh),pt===this&&(pt=null)}toggle(t){t.stopPropagation(),t.preventDefault(),!this.open&&pt&&pt!==this&&pt.close(),this.open=!this.open,pt=this.open?this:null,this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0})}close(){this.open=!1}onKey(t){t.key==="Escape"&&this.close()}render(){let t=Ie[this.term],e=t?.term??this.term;return l`<button class="i" aria-label=${e} aria-expanded=${String(this.open)} @click=${this.toggle} @keydown=${this.onKey}>
        <ha-icon icon="mdi:information-outline"></ha-icon></button>
      ${this.open&&t?l`<div class="pop" role="tooltip"><b>${t.term}</b>${t.text}
            ${t.chapter?l`<br /><a @click=${()=>{this.close(),ys(this,t.chapter)}}>${this.t?.("handbook.read_more")??"Read more"} →</a>`:m}
          </div>`:m}`}};Q.styles=P`
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
  `,p([f()],Q.prototype,"term",2),p([f({attribute:!1})],Q.prototype,"t",2),p([b()],Q.prototype,"open",2),Q=p([R("hl-info")],Q);var jt=80,Ft=new WeakMap;function _s(d){d.pointerType!=="mouse"&&Ft.set(d.currentTarget,{x:d.clientX,y:d.clientY,dx:0,active:!1,id:d.pointerId})}function ws(d){let a=d.currentTarget,t=Ft.get(a);if(!t||t.id!==d.pointerId)return;let e=d.clientX-t.x,s=d.clientY-t.y;!t.active&&Math.abs(e)>12&&Math.abs(e)>Math.abs(s)*1.5&&(t.active=!0,a.setPointerCapture(d.pointerId)),t.active&&(t.dx=e,a.style.transform=`translateX(${Math.max(-140,Math.min(140,e))}px)`,a.dataset.swipe=e>jt?"complete":e<-jt?"postpone":"")}function Be(d,a,t){let e=d.currentTarget,s=Ft.get(e);Ft.delete(e),e.style.transform="",delete e.dataset.swipe,s?.active&&(d.preventDefault(),s.dx>jt&&a.status==="open"?t.onComplete(a):s.dx<-jt&&a.status==="open"&&t.onPostpone&&t.onPostpone(a,1))}function Tt(d,a){let t=d.status==="open"&&d.due<a.today,e=d.status!=="open",s=dt[d.type]??"var(--hl-soil-500)";return l`
    <li class="task-row ${e?"done":""} prio-${d.priority}" @pointerdown=${_s} @pointermove=${ws}
      @pointerup=${i=>Be(i,d,a)} @pointercancel=${i=>Be(i,d,a)}>
      <button class="check" role="checkbox" aria-checked=${String(e)} aria-label=${`${a.t("task.complete")}: ${d.title}`}
        ?disabled=${e} @click=${()=>a.onComplete(d)}>
        <ha-icon icon=${e?"mdi:check-circle":"mdi:checkbox-blank-circle-outline"}></ha-icon>
      </button>
      <button class="task-main" @click=${()=>a.onOpen(d)}>
        <span class="type-icon" style=${`color:${s}`}><ha-icon icon=${lt[d.type]}></ha-icon></span>
        <span class="task-text">
          <span class="task-title">${d.title}</span>
          <span class="task-meta">
            ${t?l`<span class="chip bad">${a.t("common.overdue")} · ${y(d.due,a.lang)}</span>`:l`<span>${y(d.due,a.lang,{weekday:"short",day:"numeric",month:"short"})}</span>`}
            <span>· ${a.t("common.minutes",{n:d.estimated_minutes})}</span>
            ${d.recurrence?l`<span title=${a.t("task.repeat",{n:d.recurrence.interval_days})}>· ↻ ${d.recurrence.interval_days}d</span>`:m}
            ${d.priority==="urgent"||d.priority==="high"?l`<span class="chip ${d.priority==="urgent"?"bad":"warn"}">${a.t(`priority.${d.priority}`)}</span>`:m}
          </span>
        </span>
      </button>
    </li>`}var Ut=P`
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
`,B=class extends M{constructor(){super(...arguments);this.task=null;this.beds=[];this.lang="en";this.today="";this.create=!1;this.snapshot=null;this.note="";this.photos=[];this.busy=!1;this.error=""}updated(){let t=this.renderRoot.querySelector("dialog");t&&!t.open&&(this.task||this.create)&&t.showModal()}close(t=!1){this.note="",this.photos=[],this.error="",this.dispatchEvent(new CustomEvent("closed",{detail:{changed:t}}))}async run(t,e){this.busy=!0;try{await t(),e&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0})),this.close(!0)}catch(s){this.error=s.message??String(s)}finally{this.busy=!1}}async onPhoto(t){let e=t.target.files?.[0];if(e){this.busy=!0;try{this.photos=[...this.photos,await this.api.uploadPhoto(e)]}catch(s){this.error=s.message}finally{this.busy=!1}}}submitNew(t){t.preventDefault();let e=t.target,s=i=>e.elements.namedItem(i).value;this.run(()=>this.api.addTask({title:s("title"),due:s("due")||null,task_type:s("type"),description:s("description"),priority:s("priority"),estimated_minutes:Number(s("minutes"))||null,bed_id:s("bed")||null,recurrence_days:Number(s("repeat"))||null}))}renderCreate(){let t=["custom","water","weed","feed","pest_check","harvest","prune","stake","sow_direct","transplant","ventilate","frost_protect"];return l`<form @submit=${this.submitNew}>
      <div class="head"><ha-icon class="big-icon" icon="mdi:clipboard-plus-outline"></ha-icon><h2>${this.t("cal.add_task")}</h2></div>
      <div class="body">
        <div class="form-grid">
          <label class="field full">${this.t("task.title")}<input name="title" required autofocus /></label>
          <label class="field">${this.t("task.due")}<input name="due" type="date" .value=${this.today} /></label>
          <label class="field">${this.t("task.type")}<select name="type">${t.map(e=>l`<option value=${e}>${this.t(`type.${e}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.priority")}<select name="priority">${["low","normal","high","urgent"].map(e=>l`<option value=${e} ?selected=${e==="normal"}>${this.t(`priority.${e}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.duration")}<input name="minutes" type="number" min="1" value="15" /></label>
          <label class="field">${this.t("task.bed")}<select name="bed"><option value="">–</option>${this.beds.map(e=>l`<option value=${e.id}>${e.name}</option>`)}</select></label>
          <label class="field">${this.t("task.repeat_days")}<input name="repeat" type="number" min="1" max="365" /></label>
          <label class="field full">${this.t("task.description")}<textarea name="description" rows="3"></textarea></label>
        </div>
        ${this.error?l`<p class="field-error">${this.error}</p>`:m}
      </div>
      <div class="foot">
        <button type="button" class="btn ghost" @click=${()=>this.close()}>${this.t("common.cancel")}</button>
        <button class="btn primary" type="submit" ?disabled=${this.busy}>${this.t("common.add")}</button>
      </div>
    </form>`}renderContext(t){let e=this.snapshot?.analysis;if(!e)return m;let s=[],i=t.bed_id?e.beds[t.bed_id]:void 0,n=t.zone_id??this.snapshot?.beds.find(c=>c.id===t.bed_id)?.zone_id,r=n?e.zones[n]:void 0,o=(c,u,g=0)=>c==null?null:`${c.toFixed(g)} ${u}`;if(i){let c=o(i.irrigation.moisture,"%");c&&s.push([this.t("ctx.moisture"),c]);let u=i.sensors?.soil_temperature?.value;u!=null&&s.push([this.t("ctx.soil_temp"),`${u.toFixed(1)} \xB0C`]),i.irrigation.action!=="none"&&s.push([this.t("ctx.irrigation"),this.t(`irrigation.${i.irrigation.action}`,{mm:i.irrigation.amount_mm,liters:Math.round(i.irrigation.liters)})]),i.depletion_mm!=null&&i.taw_mm&&s.push([this.t("ctx.water_balance"),`${i.depletion_mm.toFixed(0)} / ${i.taw_mm.toFixed(0)} mm`]),i.nutrients?.index!=null&&s.push([this.t("ctx.nutrients"),`${i.nutrients.index} / 100`])}r&&(r.air_temperature!=null&&s.push([this.t("ctx.air_temp"),`${r.air_temperature.toFixed(1)} \xB0C`]),r.humidity!=null&&s.push([this.t("ctx.humidity"),`${Math.round(r.humidity)} %`]),r.disease&&r.disease.level!=="unknown"&&s.push([this.t("ctx.disease"),this.t(`risk.${r.disease.level}`)]),r.frost.level!=="unknown"&&s.push([this.t("ctx.frost"),`${this.t(`risk.${r.frost.level}`)}${r.frost.plant_level_min_c!=null?` \xB7 ${r.frost.plant_level_min_c.toFixed(1)} \xB0C`:""}`]));let h=e.outlook[0];return h&&(h.tmin!=null&&h.tmax!=null&&s.push([this.t("ctx.today"),`${h.tmin.toFixed(0)}\u2013${h.tmax.toFixed(0)} \xB0C`]),s.push([this.t("ctx.rain"),`${h.rain_mm.toFixed(1)} mm`]),h.et0_mm!=null&&s.push([this.t("ctx.et0"),`${h.et0_mm.toFixed(1)} mm`])),s.length?l`<h4>${this.t("ctx.title")}</h4><div class="context">${s.map(([c,u])=>l`<div class="ctx">${c}<b>${u}</b></div>`)}</div>`:m}renderTask(t){let e=t.status==="open",s=(n,r)=>this.run(()=>this.api.taskAction(t.id,n,{note:this.note||void 0,photos:this.photos.length?[...t.photos,...this.photos]:void 0}),r),i=(n,r)=>this.run(async()=>{let o=await this.api.taskAction(t.id,"postpone",{days:n,to:r,note:this.note||void 0}),h=[];o.shifted?.length&&h.push(this.t("task.shifted",{n:o.shifted.length})),o.warnings?.includes("beyond_window")&&h.push(this.t("task.beyond_window")),h.length&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:h.join(" ")},bubbles:!0,composed:!0}))});return l`
      <div class="head">
        <ha-icon class="big-icon" icon=${lt[t.type]} style=${`color:${dt[t.type]??"inherit"}`}></ha-icon>
        <div class="stack" style="gap:4px">
          <h2>${t.title}</h2>
          <div class="row wrap small muted">
            <span>${this.t("task.due")}: <b>${y(t.due,this.lang,{weekday:"long",day:"numeric",month:"long"})}</b></span>
            <span class="chip">${this.t(`type.${t.type}`)}</span>
            <span class="chip">${this.t(`task.source.${t.source}`)}</span>
          </div>
        </div>
      </div>
      <div class="body">
        ${t.description?l`<p>${t.description}</p>`:m}
        ${t.title_params?.handbook?l`<a class="small" href="#" @click=${n=>{n.preventDefault(),this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:t.title_params.handbook},bubbles:!0,composed:!0})),this.close()}}><ha-icon icon="mdi:book-open-page-variant-outline" style="--mdc-icon-size:16px"></ha-icon> ${this.t("handbook.read_more")}</a>`:m}
        ${this.renderContext(t)}
        ${t.window_start&&t.window_end&&t.window_start!==t.window_end?l`<p class="small muted">${this.t("task.window",{start:y(t.window_start,this.lang),end:y(t.window_end,this.lang)})}</p>`:m}
        ${t.recurrence?l`<p class="small muted">↻ ${this.t("task.repeat",{n:t.recurrence.interval_days})}</p>`:m}
        <div class="row wrap small">
          <span>${this.t("task.priority")}:</span>
          ${["low","normal","high","urgent"].map(n=>l`
            <button class="chip" aria-pressed=${String(t.priority===n)}
              @click=${()=>this.run(()=>this.api.taskAction(t.id,"update",{changes:{priority:n}}))}>${this.t(`priority.${n}`)}</button>`)}
        </div>
        ${t.notes.length?l`<h4>${this.t("task.notes")}</h4>${t.notes.map(n=>l`<p class="note"><span class="xs muted">${y(n.at.slice(0,10),this.lang)}</span> ${n.text}</p>`)}`:m}
        ${t.photos.length||this.photos.length?l`<h4>${this.t("task.photos")}</h4>
          <div class="photos">${[...t.photos,...this.photos].map(n=>l`<a href=${ne(n,"original")} target="_blank" rel="noopener"><img src=${ne(n)} alt=${this.t("task.photos")} loading="lazy" /></a>`)}</div>`:m}
        <label class="field">${this.t("task.note")}<textarea rows="2" .value=${this.note} @input=${n=>this.note=n.target.value}></textarea></label>
        <label class="btn small" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("task.add_photo")}
          <input type="file" accept="image/*" capture="environment" class="visually-hidden" @change=${this.onPhoto} /></label>
        ${e?l`
          <div class="row wrap">
            <span class="small">${this.t("task.postpone")}:</span>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>i(1)}>${this.t("task.postpone_1")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>i(3)}>${this.t("task.postpone_3")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>i(7)}>${this.t("task.postpone_7")}</button>
            <input type="date" style="width:auto" aria-label=${this.t("task.postpone_to")} .min=${A(this.today,1)}
              @change=${n=>i(void 0,n.target.value)} />
          </div>`:m}
        ${this.error?l`<p class="field-error" role="alert">${this.error}</p>`:m}
      </div>
      <div class="foot">
        ${t.source==="user"?l`<button class="btn danger" ?disabled=${this.busy} @click=${()=>s("delete")}>${this.t("common.delete")}</button>`:m}
        <span class="spacer"></span>
        <button class="btn ghost" @click=${()=>this.close()}>${this.t("common.close")}</button>
        ${e?l`<button class="btn" ?disabled=${this.busy} @click=${()=>s("skip")}>${this.t("task.skip")}</button>
              <button class="btn primary" ?disabled=${this.busy} @click=${()=>s("complete",this.t("task.completed",{title:t.title}))}>
                <ha-icon icon="mdi:check"></ha-icon>${this.t("task.complete")}</button>`:l`<button class="btn" ?disabled=${this.busy} @click=${()=>s("reopen")}>${this.t("task.reopen")}</button>`}
      </div>`}render(){return!this.task&&!this.create?m:l`<dialog @close=${()=>this.close()}>${this.create?this.renderCreate():this.renderTask(this.task)}</dialog>`}};B.styles=[I,P`
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
    `],p([f({attribute:!1})],B.prototype,"task",2),p([f({attribute:!1})],B.prototype,"beds",2),p([f({attribute:!1})],B.prototype,"api",2),p([f({attribute:!1})],B.prototype,"t",2),p([f()],B.prototype,"lang",2),p([f()],B.prototype,"today",2),p([f({type:Boolean})],B.prototype,"create",2),p([f({attribute:!1})],B.prototype,"snapshot",2),p([b()],B.prototype,"note",2),p([b()],B.prototype,"photos",2),p([b()],B.prototype,"busy",2),p([b()],B.prototype,"error",2),B=p([R("hl-task-dialog")],B);var de={none:"ok",low:"cold",moderate:"warn",high:"bad",unknown:""},xs={frost:"mdi:snowflake-alert",heat:"mdi:thermometer-alert",dry:"mdi:water-alert",sensor_stale:"mdi:access-point-network-off",forecast:"mdi:weather-cloudy-alert",disease:"mdi:mushroom-outline",nutrients:"mdi:flask-outline"},K=class extends M{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en";this.admin=!0}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}get ctx(){return{t:this.t,lang:this.lang,today:this.snapshot.analysis?.today??"",onOpen:t=>this.emit("open-task",t),onComplete:t=>this.emit("complete-task",t),onPostpone:(t,e)=>this.emit("postpone-task",{task:t,days:e})}}greeting(){let t=new Date().getHours();return this.t(t<12?"dash.greeting_morning":t<18?"dash.greeting_afternoon":"dash.greeting_evening")}render(){let t=this.snapshot,e=t.analysis;if(!e)return l`<p class="empty">${this.t("common.loading")}</p>`;let s=e.today,i=Et(t.tasks.filter(h=>h.status==="open"&&h.due<=s)),n=Et(t.tasks.filter(h=>h.status==="open"&&h.due>s&&h.due<=A(s,7))),r=i.reduce((h,c)=>h+c.estimated_minutes,0),o=t.zones.filter(h=>h.type!=="outdoor");return l`
      <section class="hero">
        <div class="stack" style="gap:4px">
          <span class="muted small">${y(s,this.lang,{weekday:"long",day:"numeric",month:"long"})} · ${this.t("common.season",{year:e.season})}</span>
          <h1>${this.greeting()} 🌱</h1>
        </div>
        <span class="spacer"></span>
        <span class="chip ${de[e.frost.level]}"><ha-icon icon="mdi:snowflake"></ha-icon>${this.t("dash.frost_risk")}: ${this.t(`risk.${e.frost.level}`)}</span>
        <span class="chip"><ha-icon icon="mdi:thermometer-plus"></ha-icon>${Math.round(e.gdd.season_total)} GDD</span>
      </section>

      ${e.alerts.length?l`<section class="alerts" aria-label="Alerts">
        ${e.alerts.map(h=>l`<div class="alert ${h.kind==="frost"?"frost":h.severity}" role=${h.severity==="critical"?"alert":"status"}>
          <ha-icon icon=${xs[h.kind]??"mdi:information-outline"}></ha-icon>
          <div><b>${this.t(h.message_key,h.params)}</b>
            ${Array.isArray(h.params.plants)&&h.params.plants.length?l`<div class="small">${h.params.plants.join(", ")}</div>`:m}</div>
        </div>`)}
      </section>`:m}

      <div class="grid">
        <section class="card span-8" aria-labelledby="today-h">
          <header><h2 id="today-h">${this.t("dash.today_tasks")}</h2><span class="spacer"></span>
            ${i.length?l`<span class="small muted">${this.t("dash.total_time",{minutes:r})}</span>`:m}</header>
          ${i.length?l`<ul class="tasks">${i.slice(0,10).map(h=>Tt(h,this.ctx))}</ul>`:l`<p class="empty">${this.t("dash.no_tasks")}</p>`}
          ${i.length>10?l`<button class="btn small ghost" @click=${()=>this.emit("navigate","calendar")}>${this.t("dash.show_all",{n:i.length})}</button>`:m}
        </section>

        <section class="card span-4" aria-labelledby="weather-h">
          <header><h2 id="weather-h">${this.t("dash.weather")}</h2></header>
          ${e.weather_available?l`
            <div class="days">${e.outlook.slice(0,3).map(h=>l`
              <div class="day">
                <div class="small muted">${h.day===s?this.t("common.today"):y(h.day,this.lang,{weekday:"short"})}</div>
                <div class="temp">${h.tmax!=null?Math.round(h.tmax):"\u2013"}° <span class="muted small">${h.tmin!=null?Math.round(h.tmin):"\u2013"}°</span></div>
                <div class="xs muted">💧 ${h.rain_mm} mm${h.et0_mm!=null?l` · ET₀ ${h.et0_mm}`:m}</div>
              </div>`)}</div>
            <div class="divider"></div>
            <div class="kv"><span>${this.t("dash.frost_risk")}</span><span class="chip ${de[e.frost.level]}">${this.t(`risk.${e.frost.level}`)}</span></div>
            ${e.frost.plant_level_min_c!=null?l`<div class="kv"><span></span><span class="muted">${this.t("dash.min_temp",{temp:e.frost.plant_level_min_c})}${e.frost.min_at?` \xB7 ${new Date(e.frost.min_at).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{weekday:"short",hour:"2-digit",minute:"2-digit"})}`:""}</span></div>`:m}
          `:l`<p class="small muted">${this.t("dash.forecast_missing")}</p>`}
          <div class="divider"></div>
          ${e.et0_today!=null?l`<div class="kv"><span>ET₀ ${this.t("common.today").toLowerCase()} <hl-info term="et0" .t=${this.t}></hl-info></span>
            <span><b>${e.et0_today.toFixed(1)} mm</b> <span class="muted xs">${e.et0_method==="penman_monteith"?"Penman-Monteith":e.et0_method==="hargreaves"?"Hargreaves":""}</span></span></div>`:m}
          ${e.gdd_today!=null?l`<div class="kv"><span>${this.t("dash.gdd_today")}</span><span><b>${e.gdd_today.toFixed(1)}</b></span></div>`:m}
          <div class="kv"><span>${this.t("dash.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span><b>${Math.round(e.gdd.season_total)}</b> <span class="muted xs">${this.t("dash.gdd_since",{date:y(e.gdd.since,this.lang)})}</span></span></div>
        </section>

        <section class="card span-8" aria-labelledby="beds-h">
          <header><h2 id="beds-h">${this.t("dash.beds")}</h2></header>
          <div class="beds">${t.beds.map(h=>this.renderBed(h.id))}</div>
        </section>

        ${this.renderWaterClimate()}

        <section class="card span-4" aria-labelledby="up-h">
          ${o.map(h=>{let c=e.zones[h.id]?.greenhouse;return l`<header><h2>${h.name}</h2><span class="spacer"></span>
                <span class="chip ${c?.action==="none"||!c?"ok":c.action==="shade"||c.action==="heat"?"bad":"warn"}">${this.t(`gh.${c?.action??"none"}`)}</span></header>
              ${e.zones[h.id]?.air_temperature!=null?l`<div class="big">${e.zones[h.id].air_temperature?.toFixed(1)}°</div>`:l`<p class="small muted">${this.t("dash.no_sensor")}</p>`}
              ${c?.limit_max_c!=null&&c.limiting_plants.length?l`<p class="small muted">${this.t("dash.limits",{min:c.limit_min_c,max:c.limit_max_c})} (${c.limiting_plants.join(", ")})</p>`:m}
              ${c?.forecast_max_c!=null?l`<p class="xs muted">↑ ${c.forecast_max_c}° · ↓ ${c.forecast_min_c??"\u2013"}°</p>`:m}
              <div class="divider"></div>`})}
          <header><h2 id="up-h">${this.t("dash.coming_up")}</h2></header>
          ${n.length?l`<ul class="tasks">${n.slice(0,8).map(h=>Tt(h,this.ctx))}</ul>`:l`<p class="small muted">–</p>`}
        </section>
      </div>
    `}renderWaterClimate(){let t=this.snapshot,e=t.analysis,s=t.irrigation_status,i=t.settings.irrigation,n=t.beds.filter(c=>c.irrigation_entity).length,r=t.zones.filter(c=>e.zones[c.id]?.disease&&e.zones[c.id].disease.level!=="unknown"),o=t.beds.filter(c=>e.beds[c.id]?.irrigation.action==="water"),h=c=>t.beds.find(u=>u.id===c)?.name??"";return l`<section class="card span-4" aria-labelledby="wc-h">
      <header><h2 id="wc-h">${this.t("dash.water_climate")}</h2></header>
      <div class="kv"><span>${this.t("dash.irrigation_mode")}</span><span class="chip">${this.t(`settings.irrigation_mode.${i?.mode??"advise"}`)}</span></div>
      ${s?.running?l`<div class="kv"><span class="chip ok"><ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.watering_now",{bed:h(s.bed_id)})}</span>
        <button class="btn small danger" @click=${()=>this.emit("irrigation","stop")}>${this.t("dash.stop")}</button></div>`:m}
      ${s?.last_error?l`<p class="xs" style="color:var(--hl-danger)">⚠ ${s.last_error}</p>`:m}
      <div class="kv"><span>${this.t("dash.beds_need_water")}</span><b>${o.length?o.map(c=>c.name).join(", "):"\u2013"}</b></div>
      ${n&&this.admin&&!s?.running?l`<button class="btn small" @click=${()=>this.emit("irrigation","run")}>
        <ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.water_now")}</button>
        <p class="xs muted">${this.t("dash.safety_note")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></p>`:m}
      ${r.length?l`<div class="divider"></div>
        <div class="kv"><span><b>${this.t("dash.disease_risk")}</b> <hl-info term="leaf_wetness" .t=${this.t}></hl-info></span></div>
        ${r.map(c=>{let u=e.zones[c.id].disease;return l`<div class="kv"><span>${c.name}</span><span class="chip ${de[u.level]}">${this.t(`risk.${u.level}`)}${u.wet_hours?` \xB7 ${Math.round(u.wet_hours)} h`:""}</span></div>`})}`:m}
    </section>`}renderBed(t){let e=this.snapshot,s=e.beds.find(g=>g.id===t),i=e.analysis?.beds[t],n=i?.irrigation,r=i?.moisture_status??"unknown",o=i?.sensors?.soil_temperature?.value,h=(i?.active_plantings??[]).map(g=>e.plantings.find($=>$.id===g)).filter(Boolean),c=r==="optimal"?"ok":r==="dry"?"bad":r==="unknown"?"":r==="wet"?"cold":"warn",u=g=>Math.max(0,Math.min(100,g));return l`
      <article class="bed" aria-label=${s.name}>
        <div class="row"><h3>${s.name}</h3><span class="spacer"></span><span class="chip ${c}">${this.t(`moisture.${r}`)}</span></div>
        ${n?.moisture!=null?l`
          <div class="gauge" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(n.moisture)} aria-label=${this.t("settings.sensor.soil_moisture")}>
            ${n.target_low!=null&&n.target_high!=null?l`<div class="target" style=${`left:${u(n.target_low)}%;width:${u(n.target_high)-u(n.target_low)}%`}></div>`:m}
            <div class="value" style=${`left:${u(n.moisture)}%`}></div>
          </div>
          <div class="kv"><span>💧 ${Math.round(n.moisture)}%</span>${o!=null?l`<span>🌡 ${o.toFixed(1)} °C</span>`:m}</div>`:l`<p class="xs muted">${this.t("dash.no_sensor")}</p>`}
        ${n?l`<p class="small"><ha-icon icon="mdi:watering-can-outline" style="--mdc-icon-size:16px"></ha-icon>
          ${this.t(`irrigation.${n.action}`,{mm:n.amount_mm,liters:Math.round(n.liters)})}${n.duration_min?` \xB7 ${Math.round(n.duration_min)} min`:""}</p>`:m}
        ${i?.nutrients?.index!=null?l`<div class="kv"><span>${this.t("dash.nutrients")} <hl-info term="nutrient_index" .t=${this.t}></hl-info></span>
          <span class="chip ${i.nutrients.status==="balanced"?"ok":"warn"}">${i.nutrients.index}/100</span></div>`:m}
        ${i?.depletion_mm!=null&&i.taw_mm?l`<div class="kv xs muted"><span>${this.t("dash.water_balance")} <hl-info term="water_balance" .t=${this.t}></hl-info></span>
          <span>${Math.round(i.depletion_mm)} / ${Math.round(i.taw_mm)} mm</span></div>`:m}
        <div class="avatars" aria-label=${this.t("dash.active_crops",{n:h.length})}>
          ${h.map(g=>{let $=this.plants.get(g.plant_id),w=x($,this.lang);return l`<span class="avatar" title=${w} style=${`background:${N(this.families,$?.family)}`}>${w.slice(0,2)}</span>`})}
        </div>
      </article>`}};K.styles=[I,Ut,P`
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
    `],p([f({attribute:!1})],K.prototype,"snapshot",2),p([f({attribute:!1})],K.prototype,"plants",2),p([f({attribute:!1})],K.prototype,"families",2),p([f({attribute:!1})],K.prototype,"t",2),p([f()],K.prototype,"lang",2),p([f({type:Boolean})],K.prototype,"admin",2),K=p([R("hl-dashboard-view")],K);var U=(d,a)=>a>0?Math.round(d/a)*a:d,mt=d=>({x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm}),ut=d=>({x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm}),De=(d,a)=>({x:a.x_cm+d.x_cm,y:a.y_cm+d.y_cm,w:d.width_cm,h:d.length_cm}),ks=(d,a,t)=>a>=d.x&&a<=d.x+d.w&&t>=d.y&&t<=d.y+d.h;function V(d,a){let t=Math.min(d.w,a.w),e=Math.min(d.h,a.h);return{x:Math.min(Math.max(d.x,a.x),a.x+a.w-t),y:Math.min(Math.max(d.y,a.y),a.y+a.h-e),w:t,h:e}}function Ss(d,a){return d.x<a.x+a.w&&a.x<d.x+d.w&&d.y<a.y+a.h&&a.y<d.y+d.h}function Ne(d,a,t){for(let e=d.length-1;e>=0;e--)if(ks(mt(d[e]),a,t))return d[e]}function he(d,a,t){let e=Math.max(d.spacing_cm,5);if(a==="single")return{w:e,h:e};if(a==="row"){let i=t.width_cm>=t.length_cm,n=Math.max(Math.min(d.row_spacing_cm,40),10);return i?{w:t.width_cm,h:n}:{w:n,h:t.length_cm}}let s=Math.min(Math.max(e*2,30),Math.min(t.width_cm,t.length_cm));return{w:s,h:s}}function ce(d,a){let t={x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm};if(d.layout==="single")return[[t.x+t.w/2,t.y+t.h/2]];let e=Math.max(a.spacing_cm,1);if(d.layout==="row"){let r=t.w>=t.h,o=r?t.w:t.h,h=r?t.h:t.w,c=Math.max(1,Math.floor(o/e)),u=Math.max(1,Math.floor(h/Math.max(a.row_spacing_cm,1))),g=[];for(let $=0;$<u;$++)for(let w=0;w<c;w++){let v=o/c*(w+.5),k=h/u*($+.5);g.push(r?[t.x+v,t.y+k]:[t.x+k,t.y+v])}return g}let s=Math.max(1,Math.floor(t.w/e)),i=Math.max(1,Math.floor(t.h/e)),n=[];for(let r=0;r<i;r++)for(let o=0;o<s;o++)n.push([t.x+t.w/s*(o+.5),t.y+t.h/i*(r+.5)]);return n}function Oe(d,a){return d.count&&d.count>0?d.count:ce(d,a).length}function Mt(d,a,t,e){let s=Math.max(e,5);for(let i=0;i+a.h<=d.length_cm+.01;i+=s)for(let n=0;n+a.w<=d.width_cm+.01;n+=s){let r={x:n,y:i,w:a.w,h:a.h};if(!t.some(o=>Ss(r,o)))return{x:n,y:i}}return null}function Pt(d,a,t=[]){let e=[...d.map(ut),...a.map(mt),...t];if(!e.length)return{x:0,y:0,w:600,h:400};let s=Math.min(...e.map(o=>o.x)),i=Math.min(...e.map(o=>o.y)),n=Math.max(...e.map(o=>o.x+o.w)),r=Math.max(...e.map(o=>o.y+o.h));return{x:s,y:i,w:n-s,h:r-i}}function pe(d,a){if(d.length<2)return d.map(r=>({...r}));let t=d.map(r=>({...r})),e=Math.min(...d.map(r=>r.x)),s=Math.max(...d.map(r=>r.x+r.w)),i=Math.min(...d.map(r=>r.y)),n=Math.max(...d.map(r=>r.y+r.h));switch(a){case"left":t.forEach(r=>r.x=e);break;case"right":t.forEach(r=>r.x=s-r.w);break;case"top":t.forEach(r=>r.y=i);break;case"bottom":t.forEach(r=>r.y=n-r.h);break;case"hcenter":t.forEach(r=>r.x=(e+s)/2-r.w/2);break;case"vcenter":t.forEach(r=>r.y=(i+n)/2-r.h/2);break;case"hdistribute":{let r=t.map((c,u)=>[c,u]).sort((c,u)=>c[0].x-u[0].x),o=(s-e-r.reduce((c,[u])=>c+u.w,0))/(r.length-1),h=e;for(let[c]of r)c.x=h,h+=c.w+o;break}case"vdistribute":{let r=t.map((c,u)=>[c,u]).sort((c,u)=>c[0].y-u[0].y),o=(n-i-r.reduce((c,[u])=>c+u.h,0))/(r.length-1),h=i;for(let[c]of r)c.y=h,h+=c.h+o;break}}return t.map(r=>({...r,x:Math.round(r.x),y:Math.round(r.y)}))}var je={path:{fill:"#d8cbb3",stroke:"#a8987a",icon:"\u{1F6B6}"},compost:{fill:"#8a6a45",stroke:"#5c442a",icon:"\u267B"},water_butt:{fill:"#4c8fbf",stroke:"#2d6a96",icon:"\u{1F4A7}"},shed:{fill:"#9aa3a0",stroke:"#6b7370",icon:"\u{1F3E0}"},tree:{fill:"#4e7d3a",stroke:"#2f5222",icon:"\u{1F333}"},hedge:{fill:"#5f8f45",stroke:"#3d6b2a",icon:"\u{1F33F}"},trellis:{fill:"#7a5c3e",stroke:"#5a3f25",icon:"\u256B"},other:{fill:"#b4b4b4",stroke:"#888",icon:"\u2022"}},Fe={friend:{color:"var(--hl-leaf-500)",dash:"none",width:2},pest_synergy:{color:"var(--hl-leaf-600)",dash:"2 3",width:2},enemy:{color:"var(--hl-tomato-500)",dash:"6 4",width:2.5},allelopathy:{color:"#8e5ba8",dash:"6 4",width:2.5},competition:{color:"var(--hl-sun-500)",dash:"3 3",width:2},shading:{color:"#6b7370",dash:"1 4",width:2.5},overlap:{color:"var(--hl-sun-500)",dash:"6 4",width:2.5}};function Es(d,a,t,e,s){switch(d){case"climbing":return T`<path d=${`M${a} ${t-e} L${a+e*.9} ${t+e*.8} L${a-e*.9} ${t+e*.8} Z`} fill=${s} fill-opacity="0.85"></path>`;case"vine":return T`<circle cx=${a} cy=${t} r=${e*.8} fill="none" stroke=${s} stroke-width=${e*.45} stroke-opacity="0.85"></circle>`;case"upright":return T`<path d=${`M${a} ${t-e} L${a+e*.6} ${t} L${a} ${t+e} L${a-e*.6} ${t} Z`} fill=${s} fill-opacity="0.85"></path>`;case"rosette":{let i=e*.55;return T`<g fill=${s} fill-opacity="0.85"><circle cx=${a-i} cy=${t} r=${i}></circle><circle cx=${a+i} cy=${t} r=${i}></circle>
        <circle cx=${a} cy=${t-i} r=${i}></circle><circle cx=${a} cy=${t+i} r=${i}></circle></g>`}case"root":return T`<path d=${`M${a-e*.9} ${t-e*.7} L${a+e*.9} ${t-e*.7} L${a} ${t+e} Z`} fill=${s} fill-opacity="0.85"></path>`;case"bulb":return T`<path d=${`M${a} ${t-e} Q${a+e} ${t+e*.2} ${a} ${t+e} Q${a-e} ${t+e*.2} ${a} ${t-e} Z`} fill=${s} fill-opacity="0.85"></path>`;default:return T`<circle cx=${a} cy=${t} r=${e} fill=${s} fill-opacity="0.85"></circle>`}}var Ue={dry:"#c8432f",slightly_dry:"#e8a33d",optimal:"#4c8c3f",wet:"#3a7ca5",unknown:"transparent"},S=class extends M{constructor(){super(...arguments);this.zones=[];this.beds=[];this.plantings=[];this.features=[];this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.plants=new Map;this.families={};this.selection=null;this.ghost=null;this.reports={};this.timelines={};this.analysis=null;this.lang="en";this.snapStep=10;this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.readonly=!1;this.k=1;this.tx=20;this.ty=20;this.preview=null;this.drag=null;this.pendingSelect=null;this.fitted=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.fitted||this.fit()}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}updated(t){!this.fitted&&(t.has("zones")||t.has("beds"))&&(this.zones.length||this.beds.length)&&this.fit()}fit(){let t=this.getBoundingClientRect();if(!t.width||!t.height)return;let e=Pt(this.zones,this.beds,this.features.map(i=>({x:i.x_cm,y:i.y_cm,w:i.width_cm,h:i.length_cm}))),s=32;this.k=Math.max(.2,Math.min((t.width-s*2)/e.w,(t.height-s*2)/e.h,6)),this.tx=s-e.x*this.k+(t.width-s*2-e.w*this.k)/2,this.ty=s-e.y*this.k+(t.height-s*2-e.h*this.k)/2,this.fitted=!0}zoom(t,e,s){let i=this.getBoundingClientRect(),n=e??i.width/2,r=s??i.height/2,o=Math.max(.15,Math.min(this.k*t,12));this.tx=n-(n-this.tx)*o/this.k,this.ty=r-(r-this.ty)*o/this.k,this.k=o}clientToCanvas(t,e){let s=this.getBoundingClientRect();return t<s.left||t>s.right||e<s.top||e>s.bottom?null:{x:(t-s.left-this.tx)/this.k,y:(e-s.top-this.ty)/this.k}}focusCanvas(){this.svgEl?.focus()}rectOf(t,e){if(t==="feature"){let n=this.features.find(r=>r.id===e);return n?{x:n.x_cm,y:n.y_cm,w:n.width_cm,h:n.length_cm}:null}if(t==="zone"){let n=this.zones.find(r=>r.id===e);return n?ut(n):null}if(t==="bed"){let n=this.beds.find(r=>r.id===e);return n?mt(n):null}let s=this.plantings.find(n=>n.id===e),i=s&&this.beds.find(n=>n.id===s.bed_id);return s&&i?De(s,i):null}onPointerDown(t,e,s,i=!1){if(t.button!==0&&t.pointerType==="mouse")return;t.stopPropagation();let n=this.clientToCanvas(t.clientX,t.clientY);if(n)if(this.svgEl.setPointerCapture(t.pointerId),e&&s){let r=t.shiftKey||t.ctrlKey||t.metaKey;if(this.multi.some(c=>c.kind===e&&c.id===s)&&!r&&!i?this.pendingSelect={kind:e,id:s}:this.dispatchEvent(new CustomEvent("select",{detail:{kind:e,id:s,additive:r}})),r)return;let h=this.rectOf(e,s);if(!h||this.readonly){this.drag={mode:"pan",pointerId:t.pointerId,startX:n.x,startY:n.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:t.clientX,clientY:t.clientY,moved:!1};return}this.drag={mode:i?"resize":"move",kind:e,id:s,pointerId:t.pointerId,startX:n.x,startY:n.y,origin:h,startTx:this.tx,startTy:this.ty,clientX:t.clientX,clientY:t.clientY,moved:!1}}else this.dispatchEvent(new CustomEvent("select",{detail:null})),this.drag={mode:"pan",pointerId:t.pointerId,startX:n.x,startY:n.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:t.clientX,clientY:t.clientY,moved:!1}}onPointerMove(t){let e=this.drag;if(!e||e.pointerId!==t.pointerId)return;if(Math.hypot(t.clientX-e.clientX,t.clientY-e.clientY)>3&&(e.moved=!0),e.mode==="pan"){this.tx=e.startTx+(t.clientX-e.clientX),this.ty=e.startTy+(t.clientY-e.clientY);return}let s=this.clientToCanvas(t.clientX,t.clientY);if(!s||!e.kind||!e.id)return;let i=s.x-e.startX,n=s.y-e.startY,r=this.snapOn?this.snapStep:1,o;if(e.mode==="move")if(o={...e.origin,x:e.origin.x+i,y:e.origin.y+n},e.kind==="planting"){let h=this.beds.find(c=>c.id===this.plantings.find(u=>u.id===e.id)?.bed_id);h&&(o.x=h.x_cm+U(o.x-h.x_cm,r),o.y=h.y_cm+U(o.y-h.y_cm,r))}else o.x=U(o.x,r),o.y=U(o.y,r);else if(o={...e.origin,w:Math.max(r,U(e.origin.w+i,r)),h:Math.max(r,U(e.origin.h+n,r))},e.kind==="planting"){let h=this.beds.find(c=>c.id===this.plantings.find(u=>u.id===e.id)?.bed_id);h&&(o=V(o,mt(h)))}this.preview={kind:e.kind,id:e.id,rect:o}}onPointerUp(t){let e=this.drag;if(!e||e.pointerId!==t.pointerId)return;this.drag=null,this.svgEl.hasPointerCapture(t.pointerId)&&this.svgEl.releasePointerCapture(t.pointerId);let s=this.preview;this.preview=null;let i=this.pendingSelect;if(this.pendingSelect=null,i&&!e.moved&&this.dispatchEvent(new CustomEvent("select",{detail:i})),!s||!e.moved||e.mode==="pan")return;let n;if(s.kind==="planting"){let o=s.rect.x+s.rect.w/2,h=s.rect.y+s.rect.h/2;n=[...this.beds].reverse().find(u=>o>=u.x_cm&&o<=u.x_cm+u.width_cm&&h>=u.y_cm&&h<=u.y_cm+u.length_cm)?.id}let r=e.mode==="move"&&this.multi.length>1&&this.multi.some(o=>o.kind===s.kind&&o.id===s.id);this.dispatchEvent(new CustomEvent("item-change",{detail:{kind:s.kind,id:s.id,rect:s.rect,targetBedId:n,dx:s.rect.x-e.origin.x,dy:s.rect.y-e.origin.y,group:r}}))}onWheel(t){t.preventDefault();let e=this.getBoundingClientRect();this.zoom(t.deltaY<0?1.12:1/1.12,t.clientX-e.left,t.clientY-e.top)}effectiveRect(t,e,s){if(this.preview&&this.preview.kind===t&&this.preview.id===e)return this.preview.rect;let i=this.preview;if(i&&i.kind===t&&this.drag?.mode==="move"&&this.multi.length>1&&this.multi.some(n=>n.kind===t&&n.id===e)&&this.multi.some(n=>n.kind===i.kind&&n.id===i.id)){let n=this.drag.origin;return{...s,x:s.x+(i.rect.x-n.x),y:s.y+(i.rect.y-n.y)}}return s}renderFeature(t){let e=this.effectiveRect("feature",t.id,{x:t.x_cm,y:t.y_cm,w:t.width_cm,h:t.length_cm}),s=je[t.type]??je.other,i=11/this.k,n=t.type==="tree"||t.type==="water_butt";return T`<g role="button" aria-label=${`${t.name} (${this.t(`feature.${t.type}`)})`} @pointerdown=${r=>this.onPointerDown(r,"feature",t.id)} style="cursor:move">
      ${n?T`<ellipse cx=${e.x+e.w/2} cy=${e.y+e.h/2} rx=${e.w/2} ry=${e.h/2} fill=${s.fill} fill-opacity="0.55" stroke=${s.stroke} stroke-width="1.5" vector-effect="non-scaling-stroke"></ellipse>`:T`<rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${t.type==="path"?2/this.k:4/this.k} fill=${s.fill}
            fill-opacity=${t.type==="path"?.75:.55} stroke=${s.stroke} stroke-width="1.2" vector-effect="non-scaling-stroke"
            stroke-dasharray=${t.type==="trellis"?"6 3":"none"}></rect>`}
      ${e.w*this.k>40&&e.h*this.k>14?T`<text class="label" x=${e.x+e.w/2} y=${e.y+e.h/2+i*.35} font-size=${i} text-anchor="middle">${s.icon} ${t.name}</text>`:m}
    </g>`}zoneDelta(t){if(this.preview?.kind!=="zone"||this.preview.id!==t||this.drag?.mode!=="move")return{dx:0,dy:0};let e=this.zones.find(s=>s.id===t);return e?{dx:this.preview.rect.x-e.x_cm,dy:this.preview.rect.y-e.y_cm}:{dx:0,dy:0}}bedAbs(t){let{dx:e,dy:s}=this.zoneDelta(t.zone_id),i={...mt(t),x:t.x_cm+e,y:t.y_cm+s};return this.effectiveRect("bed",t.id,i)}renderGrid(){let t=Math.max(this.snapStep,5);return T`
      <defs>
        <pattern id="minor" width=${t} height=${t} patternUnits="userSpaceOnUse">
          <path d="M ${t} 0 L 0 0 0 ${t}" fill="none" stroke="var(--hl-grid-line)" stroke-width=${.6/this.k}></path>
        </pattern>
        <pattern id="major" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#minor)"></rect>
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--hl-grid-line-strong)" stroke-width=${1/this.k}></path>
        </pattern>
        <pattern id="soil" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="4" r="0.9" fill="rgba(255,255,255,0.10)"></circle>
          <circle cx="9" cy="9" r="0.7" fill="rgba(0,0,0,0.12)"></circle>
        </pattern>
        <pattern id="glass" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(91,141,184,0.18)" stroke-width="3"></line>
        </pattern>
      </defs>
      <rect x="-5000" y="-5000" width="10000" height="10000" fill="url(#major)"></rect>
    `}renderZone(t){let e=this.effectiveRect("zone",t.id,ut(t)),s=t.type!=="outdoor",i=12/this.k,n=`${t.name} \xB7 ${this.t(`settings.zone_type.${t.type}`)}`;return T`
      <g role="button" aria-label=${n} @pointerdown=${r=>this.onPointerDown(r,"zone",t.id)}>
        <rect class="zone-rect" x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${8/this.k}
          fill=${s?"var(--hl-zone-greenhouse)":"var(--hl-zone-outdoor)"}
          stroke=${s?"var(--hl-frost-500)":"var(--hl-leaf-300)"} stroke-dasharray=${s?"none":"8 4"}></rect>
        ${s?T`<rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} fill="url(#glass)" pointer-events="none"></rect>`:m}
        <text class="label" x=${e.x+2/this.k} y=${e.y-i*.5} font-size=${i} font-weight="600">${n}</text>
      </g>`}renderBed(t){let e=this.bedAbs(t),s=12/this.k,i=this.analysis?.beds[t.id],n=i?.moisture_status??"unknown",r=this.showMoisture&&n!=="unknown"?Ue[n]:"rgba(46,33,24,0.45)",o=t.kind==="container"?"var(--hl-container-fill)":t.kind==="raised"?"var(--hl-bed-fill-raised)":"var(--hl-bed-fill)",h=t.kind==="container"?Math.min(e.w,e.h)/4:4/this.k,c=i?.irrigation.moisture,u=i?.sensors?.soil_temperature?.value,g=this.reports[t.id]??i?.compatibility,$=(g?.pairs.filter(w=>w.severity!=="info").length??0)+(g?.rotation?.length??0);return T`
      <g role="button" aria-label=${`${t.name}, ${this.t(`kind.${t.kind}`)}, ${Math.round(t.width_cm)} \xD7 ${Math.round(t.length_cm)} cm`}
        @pointerdown=${w=>this.onPointerDown(w,"bed",t.id)}>
        <rect class="bed-rect" x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${h} fill=${o}
          stroke=${r} stroke-width=${this.showMoisture&&n!=="unknown"?3:1.5}></rect>
        <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${h} fill="url(#soil)" pointer-events="none"></rect>
        ${this.showMoisture&&n!=="unknown"?T`<rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${h} fill=${Ue[n]} opacity="0.12" pointer-events="none"></rect>`:m}
        <text class="label on-soil" x=${e.x+6/this.k} y=${e.y+e.h-6/this.k} font-size=${s} font-weight="600">${t.name}</text>
        ${this.showMoisture&&c!=null?T`<text class="label on-soil" x=${e.x+e.w-6/this.k} y=${e.y+e.h-6/this.k} font-size=${s*.95} text-anchor="end">💧 ${Math.round(c)}%</text>`:m}
        ${this.showTemperature&&u!=null?T`<text class="label on-soil" x=${e.x+e.w-6/this.k} y=${e.y+s*1.3} font-size=${s*.95} text-anchor="end">🌡 ${u.toFixed(1)} °C</text>`:m}
        ${$?this.renderBadge(e.x+e.w,e.y,String($),"var(--hl-tomato-500)"):m}
      </g>`}renderBadge(t,e,s,i){let n=9/this.k;return T`<g pointer-events="none"><circle cx=${t} cy=${e} r=${n} fill=${i} stroke="#fff" stroke-width=${1.5/this.k}></circle>
      <text class="badge-text" x=${t} y=${e+n*.38} font-size=${n*1.1} text-anchor="middle">${s}</text></g>`}renderPlanting(t){let e=this.beds.find(z=>z.id===t.bed_id),s=this.plants.get(t.plant_id);if(!e||!s)return m;let i=this.bedAbs(e),n={x:i.x+t.x_cm,y:i.y+t.y_cm,w:t.width_cm,h:t.length_cm},r=this.effectiveRect("planting",t.id,n),o=N(this.families,s.family),h=x(s,this.lang),c=!this.viewDate||Le(t,this.timelines[t.id],this.viewDate),u={...t,x_cm:r.x-i.x,y_cm:r.y-i.y,width_cm:r.w,length_cm:r.h},g=ce(u,s),$=Math.max(Math.min(s.spacing_cm/2.4,18),1.6),w=this.reports[e.id]??this.analysis?.beds[e.id]?.compatibility,v=w?.pairs.filter(z=>(z.a===t.id||z.b===t.id)&&z.severity!=="info")??[],k=w?.out_of_bounds?.includes(t.id),E=Math.min(11/this.k,r.h*.45),tt=`${h} \u2013 ${this.t(`planner.layout.${t.layout}`)}, ${this.t("planner.count",{n:g.length})}`+(v.length?` \u2013 ${v.length} \u26A0`:"");return T`
      <g class="planting ${c?"":"faded"}" role="button" aria-label=${tt}
        @pointerdown=${z=>this.onPointerDown(z,"planting",t.id)}>
        <title>${tt}</title>
        <rect class="planting-rect" x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${3/this.k}
          fill=${o} fill-opacity="0.22" stroke=${o} stroke-width="1.5" stroke-dasharray=${c?"none":"4 3"}></rect>
        ${g.slice(0,400).map(([z,X])=>Es(s.habit,i.x+z,i.y+X,$,o))}
        ${r.w*this.k>26&&r.h*this.k>14?T`<text class="mono" x=${r.x+r.w/2} y=${r.y+r.h/2+E*.35} font-size=${E} text-anchor="middle">${Ce(h)}</text>`:m}
        ${t.succession_group?this.renderBadge(r.x,r.y,String(t.succession_index+1),"var(--hl-soil-700)"):m}
        ${v.length||k?this.renderBadge(r.x+r.w,r.y,"!",v.some(z=>z.severity==="error")?"var(--hl-tomato-500)":"var(--hl-sun-500)"):m}
      </g>`}renderLinks(){if(!this.showCompanions)return[];let t=[],e=i=>{let n=this.plantings.find(c=>c.id===i),r=n&&this.beds.find(c=>c.id===n.bed_id);if(!n||!r)return null;let o=this.bedAbs(r),h=this.effectiveRect("planting",n.id,{x:o.x+n.x_cm,y:o.y+n.y_cm,w:n.width_cm,h:n.length_cm});return[h.x+h.w/2,h.y+h.h/2]},s=new Set(this.plantings.map(i=>i.id));for(let i of this.beds){let n=this.reports[i.id]??this.analysis?.beds[i.id]?.compatibility;for(let r of n?.pairs??[]){if(r.kind==="same_family"||!s.has(r.a)||!s.has(r.b))continue;let o=e(r.a),h=e(r.b);if(!o||!h)continue;let c=Fe[r.kind]??Fe.overlap;t.push(T`<line class="link" x1=${o[0]} y1=${o[1]} x2=${h[0]} y2=${h[1]} stroke=${c.color}
          stroke-width=${c.width} stroke-dasharray=${c.dash} stroke-linecap="round" opacity="0.9"><title>${this.t(r.key,r.params)}</title></line>`)}}return t}selectionRect(t){if(t.kind==="feature"){let n=this.features.find(r=>r.id===t.id);return n?this.effectiveRect("feature",n.id,{x:n.x_cm,y:n.y_cm,w:n.width_cm,h:n.length_cm}):null}if(t.kind==="bed"){let n=this.beds.find(r=>r.id===t.id);return n?this.bedAbs(n):null}if(t.kind==="zone"){let n=this.zones.find(r=>r.id===t.id);return n?this.effectiveRect("zone",n.id,ut(n)):null}let e=this.plantings.find(n=>n.id===t.id),s=e&&this.beds.find(n=>n.id===e.bed_id);if(!e||!s)return null;let i=this.bedAbs(s);return this.effectiveRect("planting",e.id,{x:i.x+e.x_cm,y:i.y+e.y_cm,w:e.width_cm,h:e.length_cm})}renderMulti(){if(this.multi.length<2)return[];let t=3/this.k;return this.multi.filter(e=>!(this.selection&&e.kind===this.selection.kind&&e.id===this.selection.id)).map(e=>this.selectionRect(e)).filter(e=>!!e).map(e=>T`<rect class="selected-outline" x=${e.x-t} y=${e.y-t} width=${e.w+t*2} height=${e.h+t*2} opacity="0.7"></rect>`)}renderSelection(){let t=this.selection;if(!t)return m;let e=null;if(t.kind==="feature")e=this.selectionRect(t);else if(t.kind==="bed"){let n=this.beds.find(r=>r.id===t.id);e=n?this.bedAbs(n):null}else if(t.kind==="zone"){let n=this.zones.find(r=>r.id===t.id);e=n?this.effectiveRect("zone",n.id,ut(n)):null}else{let n=this.plantings.find(o=>o.id===t.id),r=n&&this.beds.find(o=>o.id===n.bed_id);if(n&&r){let o=this.bedAbs(r);e=this.effectiveRect("planting",n.id,{x:o.x+n.x_cm,y:o.y+n.y_cm,w:n.width_cm,h:n.length_cm})}}if(!e)return m;let s=10/this.k,i=3/this.k;return T`
      <rect class="selected-outline" x=${e.x-i} y=${e.y-i} width=${e.w+i*2} height=${e.h+i*2}></rect>
      ${this.readonly?m:T`<rect class="handle" x=${e.x+e.w-s/2} y=${e.y+e.h-s/2} width=${s} height=${s} rx=${2/this.k}
        @pointerdown=${n=>this.onPointerDown(n,t.kind,t.id,!0)}></rect>`}`}renderGhost(){let t=this.ghost;if(!t)return m;let e=12/this.k;return T`<g pointer-events="none">
      <rect x=${t.rect.x} y=${t.rect.y} width=${t.rect.w} height=${t.rect.h} rx=${3/this.k}
        fill=${t.color} fill-opacity=${t.valid?.35:.12} stroke=${t.valid?t.color:"var(--hl-tomato-500)"}
        stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      <text class="label" x=${t.rect.x} y=${t.rect.y-e*.5} font-size=${e} font-weight="600">${t.label}</text></g>`}render(){return l`
      <svg
        tabindex="0"
        role="application"
        aria-roledescription="garden plan"
        aria-label=${this.t?.("nav.planner")??"Planner"}
        class=${this.drag?.mode==="pan"?"panning":""}
        @pointerdown=${t=>this.onPointerDown(t)}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @wheel=${this.onWheel}
      >
        <g transform=${`translate(${this.tx} ${this.ty}) scale(${this.k})`}>
          ${this.renderGrid()} ${this.showZones?this.zones.map(t=>this.renderZone(t)):m}
          ${this.showFeatures?this.features.map(t=>this.renderFeature(t)):m} ${this.beds.map(t=>this.renderBed(t))}
          ${this.showPlantings?this.plantings.map(t=>this.renderPlanting(t)):m} ${this.showPlantings?this.renderLinks():m}
          ${this.renderMulti()} ${this.renderSelection()} ${this.renderGhost()}
        </g>
      </svg>
      <div class="zoom-indicator" aria-hidden="true">${Math.round(this.k*100)} px/m</div>
    `}};S.styles=[P`
      :host { display: block; position: relative; height: 100%; min-height: 360px; touch-action: none; }
      svg { width: 100%; height: 100%; display: block; background: var(--hl-canvas-bg); border-radius: var(--hl-r-lg); outline: none; cursor: default; user-select: none; }
      svg:focus-visible { box-shadow: inset 0 0 0 2px var(--hl-focus); }
      svg.panning { cursor: grabbing; }
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
      .zoom-indicator { position: absolute; right: 12px; bottom: 12px; background: var(--hl-surface); border: 1px solid var(--hl-border);
        border-radius: var(--hl-r-pill); padding: 2px 10px; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); pointer-events: none; }
    `],p([f({attribute:!1})],S.prototype,"zones",2),p([f({attribute:!1})],S.prototype,"beds",2),p([f({attribute:!1})],S.prototype,"plantings",2),p([f({attribute:!1})],S.prototype,"features",2),p([f({attribute:!1})],S.prototype,"multi",2),p([f({type:Boolean})],S.prototype,"showFeatures",2),p([f({type:Boolean})],S.prototype,"showPlantings",2),p([f({type:Boolean})],S.prototype,"showZones",2),p([f({attribute:!1})],S.prototype,"plants",2),p([f({attribute:!1})],S.prototype,"families",2),p([f({attribute:!1})],S.prototype,"selection",2),p([f({attribute:!1})],S.prototype,"ghost",2),p([f({attribute:!1})],S.prototype,"reports",2),p([f({attribute:!1})],S.prototype,"timelines",2),p([f({attribute:!1})],S.prototype,"analysis",2),p([f({attribute:!1})],S.prototype,"t",2),p([f()],S.prototype,"lang",2),p([f({type:Number})],S.prototype,"snapStep",2),p([f({type:Boolean})],S.prototype,"snapOn",2),p([f({type:Boolean})],S.prototype,"showCompanions",2),p([f({type:Boolean})],S.prototype,"showMoisture",2),p([f({type:Boolean})],S.prototype,"showTemperature",2),p([f()],S.prototype,"viewDate",2),p([f({type:Boolean})],S.prototype,"readonly",2),p([b()],S.prototype,"k",2),p([b()],S.prototype,"tx",2),p([b()],S.prototype,"ty",2),p([b()],S.prototype,"preview",2),p([Bt("svg")],S.prototype,"svgEl",2),S=p([R("hl-garden-canvas")],S);var Gt=class{constructor(a,t=100){this.present=a;this.limit=t;this.past=[];this.future=[]}get current(){return this.present}get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}commit(a){return this.past.push(this.present),this.past.length>this.limit&&this.past.shift(),this.present=a,this.future=[],a}undo(){let a=this.past.pop();return a===void 0?this.present:(this.future.push(this.present),this.present=a,a)}redo(){let a=this.future.pop();return a===void 0?this.present:(this.past.push(this.present),this.present=a,a)}reset(a){this.past=[],this.future=[],this.present=a}};var C=d=>structuredClone(d),Ge=()=>({soil_moisture:null,soil_temperature:null,air_temperature:null,air_humidity:null,light:null,rain:null}),We=["path","compost","water_butt","shed","tree","hedge","trellis","other"],Ts={path:[300,50],compost:[100,100],water_butt:[60,60],shed:[200,150],tree:[150,150],hedge:[300,60],trellis:[200,20],other:[80,80]},Ms=["fresh","storage","herbs","pollinators","winter","perennials","easy"],Ps=["vegetable","herb","fruit","flower"];function Rs(d){let a=d.sowing;return a.direct_sow.length&&(!a.indoor_sow.length||d.habit==="root"||d.tags.includes("root"))?"direct_sow":a.indoor_sow.length&&a.transplant.length?"indoor_sow":a.transplant.length?"transplant":"direct_sow"}var _=class extends M{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.narrow=!1;this.draft={zones:[],beds:[],plantings:[],features:[]};this.selection=null;this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.categoryFilter="";this.autofill=null;this.autofillBusy=!1;this.autofillReplace=!1;this.autofillBeds=[];this.autofillResources=null;this.season=new Date().getFullYear();this.saveState="saved";this.reports={};this.extraTimelines={};this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.layoutMode="block";this.search="";this.familyFilter="";this.paletteDrag=null;this.ghostReport=null;this.dialog=null;this.announcement="";this.paletteOpen=!0;this.history=null;this.baseRevision=null;this.checkTimers=new Map;this.ghostCheckAt=0;this.plantMap=new Map}willUpdate(t){t.has("plants")&&(this.plantMap=new Map(this.plants.map(e=>[e.id,e]))),t.has("snapshot")&&this.snapshot&&this.syncFromSnapshot()}syncFromSnapshot(){let t=this.snapshot;this.history||(this.season=t.analysis?.season??new Date().getFullYear(),this.viewDate=t.analysis?.today??"");let e=this.saveState==="saved";if(!this.history||e&&t.revision!==this.baseRevision){let s={zones:C(t.zones),beds:C(t.beds),plantings:C(t.plantings),features:C(t.features??[])};this.history?this.history.reset(s):this.history=new Gt(s),this.draft=s,this.baseRevision=t.revision,this.reports={},this.extraTimelines={}}}get timelines(){return{...this.snapshot.analysis?.timelines??{},...this.extraTimelines}}get seasonPlantings(){return this.draft.plantings.filter(t=>t.season===this.season)}commit(t,e,s=[]){if(!(!this.admin||!this.history)){this.draft=this.history.commit(t),this.saveState="dirty",this.scheduleSave();for(let i of s)this.scheduleCheck(i);e&&this.announce(e)}}undo(){this.history?.canUndo&&(this.draft=this.history.undo(),this.afterHistoryJump())}redo(){this.history?.canRedo&&(this.draft=this.history.redo(),this.afterHistoryJump())}afterHistoryJump(){this.saveState="dirty",this.scheduleSave(),this.draft.beds.forEach(t=>this.scheduleCheck(t.id)),this.selection&&!this.findItem(this.selection)&&(this.selection=null)}scheduleSave(){window.clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>this.save(),1200)}async save(){if(this.saveState!=="dirty")return;let t=this.draft;this.saveState="saving";try{let e=await this.api.savePlan(t,this.baseRevision);this.baseRevision=e.revision,this.saveState=this.draft===t?"saved":"dirty",this.saveState==="dirty"&&this.scheduleSave()}catch(e){e.code==="revision_conflict"?(this.saveState="saved",this.history=null,this.syncFromSnapshot(),this.toast(this.t("common.conflict"))):(this.saveState="error",this.toast(this.t("common.error",{message:e.message??String(e)})))}}scheduleCheck(t){window.clearTimeout(this.checkTimers.get(t)),this.checkTimers.set(t,window.setTimeout(()=>this.runCheck(t),250))}bedPlantings(t,e=this.draft){return e.plantings.filter(s=>s.bed_id===t&&Math.abs(s.season-this.season)<=1)}async runCheck(t){let e=this.draft.beds.find(s=>s.id===t);if(!e){let{[t]:s,...i}=this.reports;this.reports=i;return}try{let s=await this.api.checkBed(e,this.bedPlantings(t));this.reports={...this.reports,[t]:s},s.timelines&&(this.extraTimelines={...this.extraTimelines,...s.timelines})}catch{}}findItem(t){return(t.kind==="zone"?this.draft.zones:t.kind==="bed"?this.draft.beds:t.kind==="feature"?this.draft.features:this.draft.plantings).find(s=>s.id===t.id)}onSelect(t){if(!t){this.selection=null,this.multi=[];return}if(t.additive){let e=this.multi.filter(i=>i.kind===t.kind),s=e.some(i=>i.id===t.id);this.multi=s?e.filter(i=>i.id!==t.id):[...e,{kind:t.kind,id:t.id}],this.selection=this.multi[this.multi.length-1]??null,this.announce(this.t("planner.selected_n",{n:this.multi.length}));return}this.selection={kind:t.kind,id:t.id},this.multi=[this.selection]}align(t){if(this.multi.length<2||!this.admin)return;let e=C(this.draft),s=this.multi[0].kind,i=new Set;if(s==="planting"){let n=this.multi.map(h=>e.plantings.find(c=>c.id===h.id)).filter(Boolean),r=new Map(e.beds.map(h=>[h.id,h])),o=n.map(h=>({x:r.get(h.bed_id).x_cm+h.x_cm,y:r.get(h.bed_id).y_cm+h.y_cm,w:h.width_cm,h:h.length_cm}));pe(o,t).forEach((h,c)=>{let u=n[c],g=r.get(u.bed_id),$=V({...h,x:h.x-g.x_cm,y:h.y-g.y_cm},{x:0,y:0,w:g.width_cm,h:g.length_cm});Object.assign(u,{x_cm:$.x,y_cm:$.y}),i.add(g.id)})}else{let n=s==="bed"?e.beds:s==="zone"?e.zones:e.features,r=this.multi.map(o=>n.find(h=>h.id===o.id)).filter(Boolean);pe(r.map(o=>({x:o.x_cm,y:o.y_cm,w:o.width_cm,h:o.length_cm})),t).forEach((o,h)=>{let c=r[h],u=o.x-c.x_cm,g=o.y-c.y_cm;if(c.x_cm=o.x,c.y_cm=o.y,s==="zone")for(let $ of e.beds.filter(w=>w.zone_id===c.id))$.x_cm+=u,$.y_cm+=g;s==="bed"&&i.add(c.id)})}this.commit(e,this.t("planner.aligned",{n:this.multi.length}),[...i])}onItemChange(t){let{kind:e,id:s,rect:i,targetBedId:n,dx:r,dy:o,group:h}=t.detail,c=C(this.draft),u=this.snapOn?this.snapshot.settings.snap_cm:1;if(h){this.moveGroup(c,e,r,o);return}if(e==="feature"){let g=c.features.find($=>$.id===s);Object.assign(g,{x_cm:i.x,y_cm:i.y,width_cm:i.w,length_cm:i.h}),this.commit(c,this.t("planner.moved",{name:g.name}));return}if(e==="zone"){let g=c.zones.find(v=>v.id===s),$=i.x-g.x_cm,w=i.y-g.y_cm;if(Object.assign(g,{x_cm:i.x,y_cm:i.y,width_cm:i.w,length_cm:i.h}),$||w)for(let v of c.beds.filter(k=>k.zone_id===s))v.x_cm+=$,v.y_cm+=w;this.commit(c,this.t("planner.moved",{name:g.name}))}else if(e==="bed"){let g=c.beds.find(k=>k.id===s);Object.assign(g,{x_cm:i.x,y_cm:i.y,width_cm:i.w,length_cm:i.h});let $=i.x+i.w/2,w=i.y+i.h/2,v=[...c.zones].reverse().find(k=>$>=k.x_cm&&$<=k.x_cm+k.width_cm&&w>=k.y_cm&&w<=k.y_cm+k.length_cm);v&&(g.zone_id=v.id),this.commit(c,this.t("planner.moved",{name:g.name}),[g.id])}else{let g=c.plantings.find(E=>E.id===s),$=g.bed_id,w=c.beds.find(E=>E.id===(n??$))??c.beds.find(E=>E.id===$),v=V({...i,x:i.x-w.x_cm,y:i.y-w.y_cm},{x:0,y:0,w:w.width_cm,h:w.length_cm});Object.assign(g,{bed_id:w.id,x_cm:U(v.x,u),y_cm:U(v.y,u),width_cm:v.w,length_cm:v.h});let k=this.plantMap.get(g.plant_id);this.commit(c,this.t("planner.moved",{name:x(k,this.lang)}),[...new Set([$,w.id])])}}moveGroup(t,e,s,i){let n=new Set(this.multi.filter(o=>o.kind===e).map(o=>o.id)),r=new Set;if(e==="planting")for(let o of t.plantings.filter(h=>n.has(h.id))){let h=t.beds.find(u=>u.id===o.bed_id),c=V({x:o.x_cm+s,y:o.y_cm+i,w:o.width_cm,h:o.length_cm},{x:0,y:0,w:h.width_cm,h:h.length_cm});Object.assign(o,{x_cm:c.x,y_cm:c.y}),r.add(h.id)}else{let o=e==="bed"?t.beds:e==="zone"?t.zones:t.features;for(let h of o.filter(c=>n.has(c.id))){if(h.x_cm=Math.round(h.x_cm+s),h.y_cm=Math.round(h.y_cm+i),e==="zone")for(let c of t.beds.filter(u=>u.zone_id===h.id))c.x_cm+=s,c.y_cm+=i;e==="bed"&&r.add(h.id)}}this.commit(t,this.t("planner.moved_n",{n:n.size}),[...r])}updateSelected(t,e){if(!this.selection)return;let s=C(this.draft),n=(this.selection.kind==="zone"?s.zones:this.selection.kind==="bed"?s.beds:this.selection.kind==="feature"?s.features:s.plantings).find(o=>o.id===this.selection.id);if(!n)return;Object.assign(e?n[e]:n,t);let r=this.selection.kind==="planting"?n.bed_id:this.selection.kind==="bed"?n.id:void 0;this.commit(s,void 0,r?[r]:[])}removeSelected(){let t=this.selection;if(!t||!this.admin)return;let e=C(this.draft),s="";if(this.multi.length>1&&(t.kind==="planting"||t.kind==="feature")){let i=new Set(this.multi.map(r=>r.id)),n=e.plantings.filter(r=>i.has(r.id)).map(r=>r.bed_id);e.plantings=e.plantings.filter(r=>!i.has(r.id)),e.features=e.features.filter(r=>!i.has(r.id)),this.commit(e,this.t("planner.removed_n",{n:i.size}),[...new Set(n)]),this.selection=null,this.multi=[];return}if(t.kind==="feature"){let i=e.features.find(n=>n.id===t.id);e.features=e.features.filter(n=>n.id!==t.id),this.commit(e,this.t("planner.removed",{name:i?.name??""})),this.selection=null,this.multi=[];return}if(t.kind==="planting"){let i=e.plantings.find(n=>n.id===t.id);s=x(this.plantMap.get(i?.plant_id??""),this.lang),e.plantings=e.plantings.filter(n=>n.id!==t.id),this.commit(e,this.t("planner.removed",{name:s}),i?[i.bed_id]:[])}else if(t.kind==="bed"){let i=e.beds.find(r=>r.id===t.id),n=e.plantings.filter(r=>r.bed_id===t.id).length;if(n&&!confirm(`${i?.name}: ${this.t("planner.count",{n})} \u2013 ${this.t("common.delete")}?`))return;e.beds=e.beds.filter(r=>r.id!==t.id),e.plantings=e.plantings.filter(r=>r.bed_id!==t.id),this.commit(e,this.t("planner.removed",{name:i?.name??""}))}else{let i=e.zones.find(r=>r.id===t.id),n=e.beds.filter(r=>r.zone_id===t.id).map(r=>r.id);if(n.length&&!confirm(`${i?.name}: ${n.length} \xD7 ${this.t("planner.bed_name")} \u2013 ${this.t("common.delete")}?`))return;e.zones=e.zones.filter(r=>r.id!==t.id),e.beds=e.beds.filter(r=>!n.includes(r.id)),e.plantings=e.plantings.filter(r=>!n.includes(r.bed_id)),this.commit(e,this.t("planner.removed",{name:i?.name??""}))}this.selection=null,this.multi=[]}addFeature(t){if(!this.admin)return;let e=C(this.draft),s=Pt(e.zones,e.beds),[i,n]=Ts[t],r={id:ct("ft"),name:this.t(`feature.${t}`),type:t,x_cm:Math.round(s.x),y_cm:Math.round(s.y+s.h+40),width_cm:i,length_cm:n,notes:""};e.features.push(r),this.selection={kind:"feature",id:r.id},this.multi=[this.selection],this.commit(e,this.t("planner.placed",{plant:r.name,bed:""})),requestAnimationFrame(()=>this.canvas?.fit())}moveToBed(t,e){let s=C(this.draft),i=s.plantings.find(u=>u.id===t),n=s.beds.find(u=>u.id===e);if(!i||!n)return;let r=i.bed_id,o=this.bedPlantings(n.id,s).filter(u=>u.season===i.season).map(u=>({x:u.x_cm,y:u.y_cm,w:u.width_cm,h:u.length_cm})),h={w:Math.min(i.width_cm,n.width_cm),h:Math.min(i.length_cm,n.length_cm)},c=Mt(n,h,o,this.snapshot.settings.snap_cm)??{x:0,y:0};Object.assign(i,{bed_id:n.id,x_cm:c.x,y_cm:c.y,width_cm:h.w,length_cm:h.h}),this.commit(s,this.t("planner.moved",{name:x(this.plantMap.get(i.plant_id),this.lang)}),[r,n.id])}openAutofill(){let t=this.snapshot.settings.resources;this.autofillResources=t?C(t):{household_size:2,hours_per_week:3,water_liters_per_week:null,compost_kg:null,irrigation:!1,goals:["fresh","herbs"],wanted:[],excluded:[]},this.autofill=null,this.autofillBeds=[],this.dialog="autofill"}async runAutofill(){if(this.autofillResources){this.autofillBusy=!0;try{this.saveState!=="saved"&&await this.save(),this.autofill=await this.api.autofill({season:this.season,bed_ids:this.autofillBeds.length?this.autofillBeds:void 0,replace:this.autofillReplace,resources:this.autofillResources})}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}finally{this.autofillBusy=!1}}}async applyAutofill(){let t=this.autofill;if(t)try{let e=await this.api.autofillApply(t.plantings,this.autofillReplace?t.beds:[],this.baseRevision);this.baseRevision=e.revision,this.history=null,this.saveState="saved",this.dialog=null,this.autofill=null,this.toast(this.t("autofill.applied",{n:t.summary.plantings}))}catch(e){this.toast(this.t("common.error",{message:e.message??String(e)}))}}duplicateSelected(){let t=this.selection;if(!t||t.kind!=="planting")return;let e=C(this.draft),s=e.plantings.find(h=>h.id===t.id),i=s&&e.beds.find(h=>h.id===s.bed_id);if(!s||!i)return;let n=this.bedPlantings(i.id,e).filter(h=>h.season===s.season).map(h=>({x:h.x_cm,y:h.y_cm,w:h.width_cm,h:h.length_cm})),r=Mt(i,{w:s.width_cm,h:s.length_cm},n,this.snapshot.settings.snap_cm)??{x:s.x_cm,y:s.y_cm},o={...C(s),id:ct("pl"),x_cm:r.x,y_cm:r.y,succession_group:null,succession_index:0,status:"planned",sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null};e.plantings.push(o),this.selection={kind:"planting",id:o.id},this.commit(e,void 0,[i.id])}nudge(t,e,s=!1){let i=this.selection;if(!i||!this.admin)return;let n=C(this.draft),r=[];if(i.kind==="planting"){let o=n.plantings.find(g=>g.id===i.id),h=n.beds.find(g=>g.id===o.bed_id),c=s?{x:o.x_cm,y:o.y_cm,w:Math.max(5,o.width_cm+t),h:Math.max(5,o.length_cm+e)}:{x:o.x_cm+t,y:o.y_cm+e,w:o.width_cm,h:o.length_cm},u=V(c,{x:0,y:0,w:h.width_cm,h:h.length_cm});Object.assign(o,{x_cm:u.x,y_cm:u.y,width_cm:u.w,length_cm:u.h}),r.push(h.id)}else{let o=(i.kind==="bed"?n.beds:n.zones).find(h=>h.id===i.id);if(s)o.width_cm=Math.max(10,o.width_cm+t),o.length_cm=Math.max(10,o.length_cm+e);else if(o.x_cm+=t,o.y_cm+=e,i.kind==="zone")for(let h of n.beds.filter(c=>c.zone_id===i.id))h.x_cm+=t,h.y_cm+=e;i.kind==="bed"&&r.push(i.id)}this.commit(n,void 0,r)}newPlanting(t,e,s){return{id:ct("pl"),plant_id:t.id,bed_id:e.id,season:this.season,layout:this.layoutMode,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,count:null,method:Rs(t),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:""}}addToSelectedBed(t){if(!this.admin)return;let e=C(this.draft),s=this.selection?.kind==="bed"?this.selection.id:this.selection?.kind==="planting"?e.plantings.find(c=>c.id===this.selection.id)?.bed_id:void 0,i=e.beds.find(c=>c.id===s)??e.beds[0];if(!i)return;let n=he(t,this.layoutMode,i),r=this.bedPlantings(i.id,e).filter(c=>c.season===this.season).map(c=>({x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm})),o=Mt(i,n,r,this.snapshot.settings.snap_cm)??{x:0,y:0},h=this.newPlanting(t,i,{...o,...n});e.plantings.push(h),this.selection={kind:"planting",id:h.id},this.commit(e,this.t("planner.placed",{plant:x(t,this.lang),bed:i.name}),[i.id]),this.canvas?.focusCanvas()}addBed(){let t=C(this.draft),e=this.selection?.kind==="zone"&&t.zones.find(o=>o.id===this.selection.id)||t.zones.find(o=>o.type==="outdoor")||t.zones[0];if(!e)return this.addZone();let s={w:120,h:80},i=t.beds.filter(o=>o.zone_id===e.id).map(o=>({x:o.x_cm-e.x_cm-20,y:o.y_cm-e.y_cm-20,w:o.width_cm+40,h:o.length_cm+40})),n=Mt({...t.beds[0],width_cm:e.width_cm,length_cm:e.length_cm},s,i,10)??{x:20,y:20},r={id:ct("bed"),name:`${this.t("planner.new_bed")} ${t.beds.length+1}`,zone_id:e.id,kind:"raised",x_cm:e.x_cm+n.x,y_cm:e.y_cm+n.y,width_cm:s.w,length_cm:s.h,orientation_deg:0,soil:"loam",shade_pct:null,sensors:Ge(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""};t.beds.push(r),this.selection={kind:"bed",id:r.id},this.commit(t,this.t("planner.placed",{plant:r.name,bed:e.name}),[r.id])}addZone(){let t=C(this.draft),e=Pt(t.zones,t.beds),s={id:ct("zone"),name:`${this.t("planner.new_zone")} ${t.zones.length+1}`,type:"outdoor",x_cm:t.zones.length?e.x+e.w+100:0,y_cm:t.zones.length?e.y:0,width_cm:400,length_cm:300,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:Ge(),vent_entity:null};t.zones.push(s),this.selection={kind:"zone",id:s.id},this.commit(t),requestAnimationFrame(()=>this.canvas?.fit())}onPalettePointerDown(t,e){!this.admin||t.pointerType==="mouse"&&t.button!==0||(t.currentTarget.setPointerCapture(t.pointerId),this.paletteDrag={plant:e,pointerId:t.pointerId,bedId:null,rect:null},this.ghostReport=null)}onPalettePointerMove(t){let e=this.paletteDrag;if(!e||e.pointerId!==t.pointerId)return;let s=this.canvas.clientToCanvas(t.clientX,t.clientY);if(!s){this.paletteDrag={...e,bedId:null,rect:null};return}let i=Ne(this.draft.beds,s.x,s.y);if(!i){let c={w:e.plant.spacing_cm,h:e.plant.spacing_cm};this.paletteDrag={...e,bedId:null,rect:{x:s.x-c.w/2,y:s.y-c.h/2,...c}};return}let n=he(e.plant,this.layoutMode,i),r=this.snapOn?this.snapshot.settings.snap_cm:1,o={x:U(s.x-i.x_cm-n.w/2,r),y:U(s.y-i.y_cm-n.h/2,r),...n};this.layoutMode==="row"&&(o=i.width_cm>=i.length_cm?{...o,x:0}:{...o,y:0}),o=V(o,{x:0,y:0,w:i.width_cm,h:i.length_cm}),this.paletteDrag={...e,bedId:i.id,rect:{...o,x:o.x+i.x_cm,y:o.y+i.y_cm}};let h=performance.now();if(h-this.ghostCheckAt>220){this.ghostCheckAt=h;let c=this.newPlanting(e.plant,i,o);c.id="__ghost__",this.api.checkBed(i,[...this.bedPlantings(i.id),c]).then(u=>{this.paletteDrag&&(this.ghostReport=u)}).catch(()=>{})}}onPalettePointerUp(t){let e=this.paletteDrag;if(!e||e.pointerId!==t.pointerId)return;if(this.paletteDrag=null,this.ghostReport=null,!e.bedId||!e.rect){e.rect&&this.announce(this.t("planner.no_bed_here"));return}let s=C(this.draft),i=s.beds.find(r=>r.id===e.bedId),n=this.newPlanting(e.plant,i,{...e.rect,x:e.rect.x-i.x_cm,y:e.rect.y-i.y_cm});s.plantings.push(n),this.selection={kind:"planting",id:n.id},this.commit(s,this.t("planner.placed",{plant:x(e.plant,this.lang),bed:i.name}),[i.id])}ghostLabel(){let t=this.paletteDrag,e=x(t.plant,this.lang);if(!t.bedId)return e;let s=(this.ghostReport?.pairs??[]).filter(o=>o.a==="__ghost__"||o.b==="__ghost__"),i=s.filter(o=>o.kind==="enemy"||o.kind==="overlap").length,n=s.filter(o=>o.kind==="friend").length,r=(this.ghostReport?.rotation??[]).some(o=>o.planting==="__ghost__");return`${e}${n?` \xB7 \u2665 ${n}`:""}${i?` \xB7 \u26A0 ${i}`:""}${r?" \xB7 \u27F2":""}`}onKeyDown(t){let e=t.composedPath()[0];if(["INPUT","SELECT","TEXTAREA"].includes(e?.tagName))return;let s=t.ctrlKey||t.metaKey,i=(this.snapOn?this.snapshot.settings.snap_cm:1)*(t.shiftKey?10:1),n=t.key,r=()=>{t.preventDefault(),t.stopPropagation()};if(s&&n.toLowerCase()==="z"&&!t.shiftKey)return this.undo(),r();if(s&&n.toLowerCase()==="y"||s&&t.shiftKey&&n.toLowerCase()==="z")return this.redo(),r();if(s&&n.toLowerCase()==="d")return this.duplicateSelected(),r();if(s)return;let o={ArrowLeft:[-i,0],ArrowRight:[i,0],ArrowUp:[0,-i],ArrowDown:[0,i]};if(o[n]&&this.selection)return this.nudge(...o[n],t.altKey),r();switch(n){case"Delete":case"Backspace":return this.removeSelected(),r();case"Escape":return this.selection=null,this.multi=[],this.paletteDrag=null,this.dialog=null,r();case"g":return this.snapOn=!this.snapOn,r();case"c":return this.showCompanions=!this.showCompanions,r();case"m":return this.showMoisture=!this.showMoisture,r();case"t":return this.showTemperature=!this.showTemperature,r();case"+":case"=":return this.canvas.zoom(1.2),r();case"-":return this.canvas.zoom(1/1.2),r();case"0":return this.canvas.fit(),r();case"?":return this.dialog="shortcuts",r();case"]":case"[":return this.cycleSelection(n==="]"?1:-1),r();default:}}cycleSelection(t){let e=[...this.draft.beds.map(r=>({kind:"bed",id:r.id})),...this.seasonPlantings.map(r=>({kind:"planting",id:r.id}))];if(!e.length)return;let s=this.selection?e.findIndex(r=>r.id===this.selection.id):-1;this.selection=e[(s+t+e.length)%e.length];let i=this.findItem(this.selection),n=this.selection.kind==="planting"?x(this.plantMap.get(i.plant_id),this.lang):i.name;this.announce(n)}announce(t){this.announcement="",requestAnimationFrame(()=>this.announcement=t)}toast(t){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t},bubbles:!0,composed:!0}))}async exportPlan(t){let{filename:e,content:s}=await this.api.exportPlan(t);Ot(e,s,t==="json"?"application/json":"application/yaml")}async importPlan(t){t.preventDefault();let e=t.target,s=e.elements.namedItem("file").files?.[0],i=e.elements.namedItem("mode").value;if(s)try{let n=await this.api.importPlan(await s.text(),i);this.history=null,this.saveState="saved",this.dialog=null,this.toast(this.t("planner.imported",{beds:n.counts.beds,plantings:n.counts.plantings}))}catch(n){this.toast(this.t("common.error",{message:n.message??String(n)}))}}async createSuccession(t){t.preventDefault();let e=this.selection,s=e?.kind==="planting"?this.draft.plantings.find(u=>u.id===e.id):void 0;if(!s)return;let i=t.target,n=Number(i.elements.namedItem("count").value),r=Number(i.elements.namedItem("interval").value)||null,o=i.elements.namedItem("placement").value,h=await this.api.succession(s,n,r,o),c=C(this.draft);c.plantings=c.plantings.filter(u=>u.id!==s.id).concat(h.plantings),this.dialog=null,this.commit(c,void 0,[s.bed_id]),h.dropped&&this.toast(this.t("planner.succession_dropped",{n:h.dropped}))}updated(){let t=this.renderRoot.querySelector("dialog");t&&!t.open&&t.showModal()}render(){if(!this.history)return l`<p class="empty">${this.t("common.loading")}</p>`;let t=this.paletteDrag,e=t?.rect?{rect:t.rect,valid:!!t.bedId,color:N(this.families,t.plant.family),label:this.ghostLabel()}:null;return l`
      ${this.renderToolbar()}
      <div class="layout ${this.narrow?"narrow":""} ${this.paletteOpen||this.narrow?"":"palette-closed"}" @keydown=${this.onKeyDown}>
        ${this.paletteOpen||this.narrow?this.renderPalette():l`<div></div>`}
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
            .ghost=${e}
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
            @select=${s=>this.onSelect(s.detail)}
            @item-change=${this.onItemChange}
          ></hl-garden-canvas>
          ${t?l`<div class="drag-ghost-hint" role="status">${e?e.label:x(t.plant,this.lang)}</div>`:m}
        </div>
        ${this.renderInspector()}
      </div>
      <div class="visually-hidden" role="status" aria-live="polite">${this.announcement}</div>
      ${this.renderDialog()}
    `}renderToolbar(){let t=[this.season-1,this.season,this.season+1],e={saved:"common.saved",dirty:"common.unsaved",saving:"common.saving",error:"common.unsaved"}[this.saveState],s=(i,n,r,o,h=!1)=>l`
      <button class="icon-btn" title=${n} aria-label=${n} aria-pressed=${o===void 0?m:String(o)} ?disabled=${h} @click=${r}>
        <ha-icon icon=${i}></ha-icon>
      </button>`;return l`
      <div class="toolbar" role="toolbar" aria-label=${this.t("nav.planner")}>
        ${s("mdi:dock-left",this.t("planner.palette"),()=>this.paletteOpen=!this.paletteOpen,this.paletteOpen)}
        <label class="row small"><span class="visually-hidden">${this.t("planner.season")}</span>
          <select aria-label=${this.t("planner.season")} @change=${i=>this.season=Number(i.target.value)}>
            ${t.map(i=>l`<option value=${i} ?selected=${i===this.season}>${this.t("common.season",{year:i})}</option>`)}
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
          <input type="date" .value=${this.viewDate} @change=${i=>this.viewDate=i.target.value} />
        </label>
        <span class="spacer"></span>
        <span class="save-state ${this.saveState==="error"?"error":""}" role="status">
          <ha-icon icon=${this.saveState==="saved"?"mdi:cloud-check-outline":"mdi:cloud-upload-outline"}></ha-icon>${this.t(e)}
        </span>
        ${this.admin?l`
          <button class="btn small primary" @click=${()=>this.openAutofill()}><ha-icon icon="mdi:auto-fix"></ha-icon>${this.t("autofill.title")}</button>
          <button class="btn small" @click=${()=>this.addBed()}><ha-icon icon="mdi:plus"></ha-icon>${this.t("planner.add_bed")}</button>
          <button class="btn small ghost" @click=${()=>this.addZone()}>${this.t("planner.add_zone")}</button>
          <label class="row small"><span class="visually-hidden">${this.t("planner.add_feature")}</span>
            <select aria-label=${this.t("planner.add_feature")} @change=${i=>{let n=i.target;n.value&&this.addFeature(n.value),n.value=""}}>
              <option value="">+ ${this.t("planner.add_feature")}</option>
              ${We.map(i=>l`<option value=${i}>${this.t(`feature.${i}`)}</option>`)}
            </select></label>`:m}
        ${s("mdi:file-export-outline",this.t("planner.export_json"),()=>this.exportPlan("json"))}
        ${s("mdi:code-braces",this.t("planner.export_yaml"),()=>this.exportPlan("yaml"))}
        ${this.admin?s("mdi:file-import-outline",this.t("planner.import"),()=>this.dialog="import"):m}
        ${s("mdi:keyboard-outline",`${this.t("planner.shortcuts")} (?)`,()=>this.dialog="shortcuts")}
      </div>
      ${this.admin?m:l`<p class="readonly-note">${this.t("common.admin_only")}</p>`}
    `}renderPalette(){let t=this.search.trim().toLowerCase(),e=this.plants.filter(i=>this.familyFilter&&i.family!==this.familyFilter||this.categoryFilter&&(i.category??"vegetable")!==this.categoryFilter?!1:t?[i.id,i.scientific_name,...Object.values(i.names)].some(n=>n.toLowerCase().includes(t)):!0).sort((i,n)=>x(i,this.lang).localeCompare(x(n,this.lang))),s=[...new Set(this.plants.map(i=>i.family))].sort();return l`
      <aside class="pane" aria-label=${this.t("planner.palette")}>
        <header>
          <h3>${this.t("planner.palette")}</h3>
          <span class="spacer"></span>
          <div class="segmented" role="group" aria-label=${this.t("planner.layout")}>
            ${["single","block","row"].map(i=>l`
              <button aria-pressed=${String(this.layoutMode===i)} @click=${()=>this.layoutMode=i}>${this.t(`planner.layout.${i}`)}</button>`)}
          </div>
        </header>
        <div class="pane-body stack">
          <input type="search" placeholder=${this.t("common.search")} aria-label=${this.t("common.search")} .value=${this.search}
            @input=${i=>this.search=i.target.value} />
          <div class="row wrap family-chips" role="group" aria-label=${this.t("lib.category")}>
            ${Ps.map(i=>l`<button class="chip" aria-pressed=${String(this.categoryFilter===i)}
              @click=${()=>this.categoryFilter=this.categoryFilter===i?"":i}>${this.t(`category.${i}`)}</button>`)}
          </div>
          <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
            <select @change=${i=>this.familyFilter=i.target.value}>
              <option value="" ?selected=${!this.familyFilter}>${this.t("lib.family")}: ${this.t("common.all")}</option>
              ${s.map(i=>l`<option value=${i} ?selected=${this.familyFilter===i}>${this.families[i]?.[this.lang]??i}</option>`)}
            </select></label>
          <p class="xs muted">${this.t("planner.palette_hint")}</p>
          <div class="palette-list" role="list">
            ${e.map(i=>{let n=x(i,this.lang);return l`
                <button class="plant-card" role="listitem" aria-label=${`${n}, ${i.scientific_name}`}
                  @pointerdown=${r=>this.onPalettePointerDown(r,i)}
                  @pointermove=${this.onPalettePointerMove}
                  @pointerup=${this.onPalettePointerUp}
                  @pointercancel=${()=>this.paletteDrag=null}
                  @keydown=${r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),this.addToSelectedBed(i))}}>
                  <span class="swatch" style=${`background:${N(this.families,i.family)}`}>${n.slice(0,2)}</span>
                  <span class="meta"><span>${n}</span><span class="xs muted">${i.spacing_cm} cm · ${i.days_to_maturity[0]}–${i.days_to_maturity[1]} d</span></span>
                </button>`})}
          </div>
          <div class="legend-block stack" style="gap:8px">
          <div class="divider"></div>
          <h4>${this.t("planner.legend")}</h4>
          <div class="legend">
            ${s.map(i=>l`<span><span class="family-dot" style=${`background:${N(this.families,i)}`}></span>${this.families[i]?.[this.lang]??i}</span>`)}
          </div>
          </div>
        </div>
      </aside>
    `}renderFindings(t,e){let s=this.reports[t]??this.snapshot.analysis?.beds[t]?.compatibility,i=this.reports[t]?.rotation??this.snapshot.analysis?.beds[t]?.rotation??[],n=(s?.pairs??[]).filter(u=>!e||u.a===e||u.b===e),r=i.filter(u=>!e||u.planting===e),o=(s?.placement??[]).filter(u=>!e||u.planting===e),h=e?s?.out_of_bounds?.includes(e):(s?.out_of_bounds?.length??0)>0,c={error:"mdi:alert-octagon-outline",warning:"mdi:alert-outline",info:"mdi:heart-outline"};return!n.length&&!r.length&&!h&&!o.length?l`<p class="small muted">${this.t("planner.no_warnings")}</p>`:l`<div class="stack" style="gap:6px">
      ${n.map(u=>l`<div class="finding ${u.severity}"><ha-icon icon=${c[u.severity]}></ha-icon><span>${this.t(u.key,u.params)}</span></div>`)}
      ${r.map(u=>l`<div class="finding ${u.severity}"><ha-icon icon="mdi:rotate-3d-variant"></ha-icon><span>${this.t(u.key,u.params)}
        <hl-info term="rotation" .t=${this.t}></hl-info>
        ${u.alternatives?.length?l`<br /><span class="xs">${this.t("planner.alternatives")}:
          ${u.alternatives.map(g=>l`<button class="chip" ?disabled=${!this.admin} @click=${()=>this.moveToBed(u.planting,g)}>${this.draft.beds.find($=>$.id===g)?.name??g}</button>`)}</span>`:m}</span></div>`)}
      ${e&&s?.suggestions?.[e]?.length?l`<div class="finding info"><ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
        <span>${this.t("planner.better_neighbours")}: ${s.suggestions[e].map(u=>x(this.plantMap.get(u),this.lang)).join(", ")}</span></div>`:m}
      ${o.map(u=>l`<div class="finding warning"><ha-icon icon="mdi:greenhouse"></ha-icon><span>${this.t(u.key,u.params)}</span></div>`)}
      ${h?l`<div class="finding warning"><ha-icon icon="mdi:border-outside"></ha-icon><span>${this.t("planner.out_of_bounds")}</span></div>`:m}
    </div>`}renderTimeline(t){if(!t)return l`<p class="small muted">–</p>`;let s=this.snapshot.settings.region.hemisphere==="south"?`${this.season}-07-01`:`${this.season}-01-01`,i=485,n=c=>c?Math.max(0,Math.min(100,at(s,c)/i*100)):null,r=(c,u,g,$,w)=>{let v=n(c),k=n(u);return v===null||k===null?m:l`<div class="bar" title=${`${w}: ${y(c,this.lang)} \u2013 ${y(u,this.lang)}`}
        style=${`left:${v}%;width:${Math.max(k-v,1)}%;top:${g}px;background:${$}`}></div>`},o=Array.from({length:16},(c,u)=>A(s,Math.round(u*30.4))),h=this.snapshot.analysis?.today;return l`
      <div class="timeline" role="img" aria-label=${`${this.t("lib.harvest")} ${y(t.harvest_start,this.lang)} \u2013 ${y(t.harvest_end,this.lang)}`}>
        ${r(t.sow_window?.start,t.sow_window?.end,6,"var(--hl-leaf-300)",this.t(t.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow"))}
        ${r(t.transplant_window?.start,t.transplant_window?.end,20,"var(--hl-leaf-600)",this.t("lib.transplant"))}
        ${r(t.in_ground,t.harvest_start,34,"color-mix(in srgb, var(--hl-leaf-500) 35%, transparent)",this.t("dash.active_crops",{n:1}))}
        ${r(t.harvest_start,t.harvest_end,34,"var(--hl-sun-500)",this.t("lib.harvest"))}
        ${o.filter((c,u)=>u%2===0).map(c=>l`<span class="month" style=${`left:${n(c)}%`}>${y(c,this.lang,{month:"short"})}</span>`)}
        ${h&&n(h)!==null?l`<div class="today" style=${`left:${n(h)}%`}></div>`:m}
      </div>
      <div class="xs muted" style="margin-top:4px">
        ${t.sow_date?l`${this.t(t.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}: <b>${y(t.sow_date,this.lang)}</b> · `:m}
        ${t.transplant_date?l`${this.t("lib.transplant")}: <b>${y(t.transplant_date,this.lang)}</b> · `:m}
        ${this.t("lib.harvest")}: <b>${y(t.harvest_start,this.lang)} – ${y(t.harvest_end,this.lang)}</b>
      </div>`}renderPhenology(t){let e=this.snapshot.analysis?.phenology?.[t];return!e||e.stage==="not_planted"?m:l`<div class="row wrap">
      <span class="chip ok"><ha-icon icon="mdi:sprout"></ha-icon>${this.t(`stage.${e.stage}`)}</span>
      <span class="chip">Kc ${e.kc.toFixed(2)} <hl-info term="kc" .t=${this.t}></hl-info></span>
      ${e.gdd!=null&&e.gdd_target?l`<span class="chip">${Math.round(e.gdd)} / ${e.gdd_target} GDD <hl-info term="gdd" .t=${this.t}></hl-info></span>`:m}
      ${e.harvest_estimate?l`<span class="chip warn"><ha-icon icon="mdi:basket-outline"></ha-icon>${this.t("cal.harvest_estimate",{date:y(e.harvest_estimate,this.lang)})}</span>`:m}
      ${e.heat_stress_days?l`<span class="chip bad">${this.t("planner.heat_stress",{n:e.heat_stress_days})}</span>`:m}
    </div>`}renderAutofill(){let t=this.autofillResources,e=o=>this.autofillResources={...t,...o},s=this.autofill,i=[...this.plants].sort((o,h)=>x(o,this.lang).localeCompare(x(h,this.lang))),n=()=>this.dialog=null,r=o=>this.draft.beds.find(h=>h.id===o)?.name??o;return l`<div class="stack">
      <h2><ha-icon icon="mdi:auto-fix"></ha-icon> ${this.t("autofill.title")} <hl-info term="autofill" .t=${this.t}></hl-info></h2>
      <p class="small muted">${this.t("autofill.intro",{season:this.season})}</p>
      <div class="form-grid">
        <label class="field">${this.t("autofill.household")}<input type="number" min="1" max="20" .value=${String(t.household_size)}
          @change=${o=>e({household_size:Number(o.target.value)})} /></label>
        <label class="field">${this.t("autofill.hours")}<input type="number" min="0" step="0.5" .value=${String(t.hours_per_week)}
          @change=${o=>e({hours_per_week:Number(o.target.value)})} /></label>
        <label class="field">${this.t("autofill.water")}<input type="number" min="0" step="10" placeholder="∞" .value=${String(t.water_liters_per_week??"")}
          @change=${o=>e({water_liters_per_week:o.target.value===""?null:Number(o.target.value)})} /></label>
        <label class="field">${this.t("autofill.compost")}<input type="number" min="0" step="5" placeholder="∞" .value=${String(t.compost_kg??"")}
          @change=${o=>e({compost_kg:o.target.value===""?null:Number(o.target.value)})} /></label>
        <label class="field full row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${t.irrigation}
          @change=${o=>e({irrigation:o.target.checked})} />${this.t("autofill.has_irrigation")}</label>
      </div>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.goals")}><span class="small">${this.t("autofill.goals")}:</span>
        ${Ms.map(o=>l`<button class="chip" aria-pressed=${String(t.goals.includes(o))}
          @click=${()=>e({goals:t.goals.includes(o)?t.goals.filter(h=>h!==o):[...t.goals,o]})}>${this.t(`autofill.goal.${o}`)}</button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("autofill.wanted")}
          <select @change=${o=>{let h=o.target;h.value&&!t.wanted.includes(h.value)&&e({wanted:[...t.wanted,h.value]}),h.value=""}}>
            <option value="">+</option>${i.map(o=>l`<option value=${o.id}>${x(o,this.lang)}</option>`)}</select></label>
        <label class="field">${this.t("autofill.excluded")}
          <select @change=${o=>{let h=o.target;h.value&&!t.excluded.includes(h.value)&&e({excluded:[...t.excluded,h.value]}),h.value=""}}>
            <option value="">+</option>${i.map(o=>l`<option value=${o.id}>${x(o,this.lang)}</option>`)}</select></label>
      </div>
      <div class="row wrap">
        ${t.wanted.map(o=>l`<button class="chip ok" title=${this.t("common.delete")} @click=${()=>e({wanted:t.wanted.filter(h=>h!==o)})}>♥ ${x(this.plantMap.get(o),this.lang)} ✕</button>`)}
        ${t.excluded.map(o=>l`<button class="chip bad" title=${this.t("common.delete")} @click=${()=>e({excluded:t.excluded.filter(h=>h!==o)})}>⊘ ${x(this.plantMap.get(o),this.lang)} ✕</button>`)}
      </div>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.beds")}><span class="small">${this.t("autofill.beds")}:</span>
        ${this.draft.beds.map(o=>l`<button class="chip" aria-pressed=${String(this.autofillBeds.includes(o.id))}
          @click=${()=>this.autofillBeds=this.autofillBeds.includes(o.id)?this.autofillBeds.filter(h=>h!==o.id):[...this.autofillBeds,o.id]}>${o.name}</button>`)}
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
        ${s.warnings.map(o=>l`<div class="finding warning"><ha-icon icon="mdi:alert-outline"></ha-icon><span>${this.t(o.key,{...o.params,plants:Array.isArray(o.params.plants)?o.params.plants.map(h=>x(this.plantMap.get(h),this.lang)).join(", "):o.params.plants})}</span></div>`)}
        <div style="max-height:30vh;overflow:auto"><table class="shortcuts" style="width:100%">
          <tr><th align="left">${this.t("lib.plant")}</th><th align="left">${this.t("task.bed")}</th><th align="right">#</th><th align="right">m²</th><th align="right">kg</th></tr>
          ${s.placements.map(o=>l`<tr><td><span class="family-dot" style=${`background:${N(this.families,this.plantMap.get(o.plant_id)?.family)}`}></span>
            ${x(this.plantMap.get(o.plant_id),this.lang)}${o.sowings>1?l` <span class="xs muted">×${o.sowings}</span>`:m}</td>
            <td>${r(o.bed_id)}</td><td align="right">${o.count}</td><td align="right">${o.area_m2.toFixed(1)}</td><td align="right">${o.yield_kg.toFixed(1)}</td></tr>`)}
        </table></div>
        ${s.skipped.length?l`<p class="xs muted">${this.t("autofill.skipped")}: ${s.skipped.map(o=>`${x(this.plantMap.get(o.plant_id),this.lang)} (${this.t(`autofill.reason.${o.reason}`)})`).join(", ")}</p>`:m}
      `:m}
      <div class="row" style="justify-content:flex-end">
        <button class="btn ghost" @click=${n}>${this.t("common.cancel")}</button>
        <button class="btn primary" ?disabled=${!s?.plantings.length} @click=${()=>this.applyAutofill()}>${this.t("autofill.apply")}</button>
      </div>
    </div>`}renderInspector(){let t=this.selection,e=t?this.findItem(t):void 0,s=!this.admin,i;if(!t||!e)i=l`<p class="small muted">${this.t("planner.nothing_selected")}</p><p class="xs muted">${this.t("planner.multi_hint")}</p>`;else if(this.multi.length>1)i=l`<h3>${this.t("planner.selected_n",{n:this.multi.length})}</h3>
        <p class="small muted">${this.t("planner.multi_hint")}</p>
        <div class="row wrap">
          ${["left","hcenter","right","top","vcenter","bottom","hdistribute","vdistribute"].map(n=>l`
            <button class="btn small" ?disabled=${s||n.endsWith("distribute")&&this.multi.length<3} @click=${()=>this.align(n)}>${this.t(`planner.align.${n}`)}</button>`)}
        </div>
        ${!s&&(t.kind==="planting"||t.kind==="feature")?l`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`:m}`;else if(t.kind==="feature"){let n=e;i=l`<h3>${n.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${n.name} ?disabled=${s}
            @change=${r=>this.updateSelected({name:r.target.value})} /></label>
          <label class="field full">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${r=>this.updateSelected({type:r.target.value})}>
              ${We.map(r=>l`<option value=${r} ?selected=${n.type===r}>${this.t(`feature.${r}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(n.width_cm)} ?disabled=${s}
            @change=${r=>this.updateSelected({width_cm:Number(r.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(n.length_cm)} ?disabled=${s}
            @change=${r=>this.updateSelected({length_cm:Number(r.target.value)})} /></label>
          <label class="field full">${this.t("task.notes")}<textarea rows="2" .value=${n.notes} ?disabled=${s}
            @change=${r=>this.updateSelected({notes:r.target.value})}></textarea></label>
        </div>
        ${s?m:l`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}`}else if(t.kind==="planting"){let n=e,r=this.plantMap.get(n.plant_id),o=this.draft.beds.find(c=>c.id===n.bed_id),h=this.snapshot.analysis?.advice[n.id];i=l`
        <div class="row">
          <span class="family-dot" style=${`background:${N(this.families,r?.family)};width:14px;height:14px`}></span>
          <h3>${x(r,this.lang)}</h3>
        </div>
        <p class="xs muted">${r?.scientific_name} · ${this.families[r?.family??""]?.[this.lang]??r?.family} · ${o?.name}</p>
        <div class="form-grid">
          <label class="field">${this.t("planner.layout")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({layout:c.target.value})}>
              ${["single","block","row"].map(c=>l`<option value=${c} ?selected=${n.layout===c}>${this.t(`planner.layout.${c}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.status")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({status:c.target.value})}>
              ${["planned","sown_indoors","sown","transplanted","harvesting","finished","failed"].map(c=>l`<option value=${c} ?selected=${n.status===c}>${this.t(`status.${c}`)}</option>`)}
            </select></label>
          <label class="field full">${this.t("planner.method")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({method:c.target.value})}>
              ${["indoor_sow","direct_sow","transplant"].map(c=>l`<option value=${c} ?selected=${n.method===c}>${this.t(`planner.method.${c}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="5" step="5" .value=${String(Math.round(n.width_cm))} ?disabled=${s}
            @change=${c=>this.updateSelected({width_cm:Number(c.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="5" step="5" .value=${String(Math.round(n.length_cm))} ?disabled=${s}
            @change=${c=>this.updateSelected({length_cm:Number(c.target.value)})} /></label>
          <label class="field full">${this.t(n.method==="transplant"?"lib.transplant":n.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}
            <input type="date" ?disabled=${s} .value=${(n.method==="transplant"?n.transplant_date:n.sow_date)??""}
              @change=${c=>this.updateSelected(n.method==="transplant"?{transplant_date:c.target.value||null}:{sow_date:c.target.value||null})} /></label>
        </div>
        <p class="small">${r?this.t("planner.count",{n:Oe(n,r)}):""}</p>
        ${h?.reasons.length?l`<div class="stack" style="gap:4px">${h.reasons.filter(c=>c.key!=="reason.window_open").map(c=>l`<p class="small">${this.t(c.key,c.params)}</p>`)}</div>`:m}
        ${this.renderPhenology(n.id)}
        <h4>${this.t("planner.timeline")}</h4>
        ${this.renderTimeline(this.timelines[n.id])}
        <h4>${this.t("planner.warnings")}</h4>
        ${this.renderFindings(n.bed_id,n.id)}
        ${s?m:l`
          <div class="row wrap">
            <button class="btn small" @click=${()=>this.dialog="succession"}><ha-icon icon="mdi:calendar-multiple"></ha-icon>${this.t("planner.succession")}</button>
            <button class="btn small ghost" @click=${()=>this.duplicateSelected()}>${this.t("planner.duplicate")}</button>
            <button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>
          </div>`}
      `}else if(t.kind==="bed"){let n=e,r=this.snapshot.analysis?.beds[n.id],o=this.reports[n.id]??r?.compatibility;i=l`
        <h3>${n.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${n.name} ?disabled=${s}
            @change=${h=>this.updateSelected({name:h.target.value})} /></label>
          <label class="field">${this.t("planner.zone")}
            <select ?disabled=${s} @change=${h=>this.updateSelected({zone_id:h.target.value})}>
              ${this.draft.zones.map(h=>l`<option value=${h.id} ?selected=${n.zone_id===h.id}>${h.name}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${h=>this.updateSelected({kind:h.target.value})}>
              ${["in_ground","raised","container"].map(h=>l`<option value=${h} ?selected=${n.kind===h}>${this.t(`kind.${h}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(n.width_cm)} ?disabled=${s}
            @change=${h=>this.updateSelected({width_cm:Number(h.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(n.length_cm)} ?disabled=${s}
            @change=${h=>this.updateSelected({length_cm:Number(h.target.value)})} /></label>
          <label class="field">${this.t("planner.soil")}
            <select ?disabled=${s} @change=${h=>this.updateSelected({soil:h.target.value})}>
              ${["sandy","loam","clay","silt","peat","chalk","potting_mix"].map(h=>l`<option value=${h} ?selected=${n.soil===h}>${this.t(`soil.${h}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.orientation")}<input type="number" min="0" max="359" step="15" .value=${String(n.orientation_deg)} ?disabled=${s}
            @change=${h=>this.updateSelected({orientation_deg:Number(h.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(n.shade_pct??"")} ?disabled=${s}
            @change=${h=>this.updateSelected({shade_pct:h.target.value===""?null:Number(h.target.value)})} /></label>
        </div>
        ${r?l`
          <div class="row wrap">
            <span class="chip ${r.moisture_status==="optimal"?"ok":r.moisture_status==="dry"?"bad":r.moisture_status==="unknown"?"":"warn"}">
              <ha-icon icon="mdi:water-percent"></ha-icon>${this.t(`moisture.${r.moisture_status}`)}${r.irrigation.moisture!=null?` \xB7 ${Math.round(r.irrigation.moisture)}%`:""}</span>
            <span class="chip">${this.t(`irrigation.${r.irrigation.action}`,{mm:r.irrigation.amount_mm,liters:Math.round(r.irrigation.liters)})}</span>
          </div>`:m}
        <div class="row"><span class="score">${Math.round(o?.score??50)}</span><span class="small muted">${this.t("planner.score")}</span></div>
        ${this.renderFindings(n.id)}
        ${s?m:l`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}
      `}else{let n=e;i=l`
        <h3>${n.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${n.name} ?disabled=${s}
            @change=${r=>this.updateSelected({name:r.target.value})} /></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${r=>this.updateSelected({type:r.target.value})}>
              ${["outdoor","greenhouse","cold_frame"].map(r=>l`<option value=${r} ?selected=${n.type===r}>${this.t(`settings.zone_type.${r}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.wind")}
            <select ?disabled=${s} @change=${r=>this.updateSelected({wind:r.target.value},"microclimate")}>
              ${["sheltered","moderate","exposed"].map(r=>l`<option value=${r} ?selected=${n.microclimate.wind===r}>${this.t(`wind.${r}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="50" step="10" .value=${String(n.width_cm)} ?disabled=${s}
            @change=${r=>this.updateSelected({width_cm:Number(r.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="50" step="10" .value=${String(n.length_cm)} ?disabled=${s}
            @change=${r=>this.updateSelected({length_cm:Number(r.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(n.microclimate.shade_pct)} ?disabled=${s}
            @change=${r=>this.updateSelected({shade_pct:Number(r.target.value)},"microclimate")} /></label>
          <label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${n.microclimate.heated} ?disabled=${s}
            @change=${r=>this.updateSelected({heated:r.target.checked},"microclimate")} />${this.t("settings.heated")}</label>
          <label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${!!n.microclimate.wall_heat} ?disabled=${s}
            @change=${r=>this.updateSelected({wall_heat:r.target.checked},"microclimate")} />${this.t("settings.wall_heat")}
            <hl-info term="microclimate" .t=${this.t}></hl-info></label>
          ${n.type!=="outdoor"?l`<label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${!!n.microclimate.thermal_mass} ?disabled=${s}
            @change=${r=>this.updateSelected({thermal_mass:r.target.checked},"microclimate")} />${this.t("settings.thermal_mass")}</label>`:m}
        </div>
        ${s?m:l`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}
      `}return l`<aside class="pane" aria-label=${this.t("planner.inspector")}>
      <header><h3>${this.t("planner.inspector")}</h3></header>
      <div class="pane-body stack">${i}</div>
    </aside>`}renderDialog(){if(!this.dialog)return m;let t=()=>this.dialog=null,e;if(this.dialog==="shortcuts"){let s=[["\u2190 \u2191 \u2192 \u2193","shortcut.move"],["Alt + \u2190 \u2191 \u2192 \u2193","planner.width"],["Ctrl + Z","shortcut.undo"],["Ctrl + Y","shortcut.redo"],["Delete","shortcut.delete"],["Ctrl + D","shortcut.duplicate"],["[ ]","shortcut.cycle"],["G","shortcut.grid"],["C","shortcut.companions"],["M","shortcut.moisture"],["+ / \u2212 / 0","shortcut.zoom"],["Esc","shortcut.escape"],["?","shortcut.help"]];e=l`<h2>${this.t("planner.shortcuts")}</h2>
        <table class="shortcuts">${s.map(([i,n])=>l`<tr><td><kbd>${i}</kbd></td><td>${this.t(n)}</td></tr>`)}</table>
        <div class="row" style="justify-content:flex-end"><button class="btn" @click=${t}>${this.t("common.close")}</button></div>`}else if(this.dialog==="autofill")e=this.renderAutofill();else if(this.dialog==="succession"){let s=this.selection?this.draft.plantings.find(n=>n.id===this.selection.id):void 0,i=s&&this.plantMap.get(s.plant_id);e=l`<form class="stack" @submit=${this.createSuccession}>
        <h2>${this.t("planner.succession")} – ${x(i,this.lang)}</h2>
        <label class="field">${this.t("planner.succession_count")}<input name="count" type="number" min="2" max="12" value="3" required /></label>
        <label class="field">${this.t("planner.succession_interval")}<input name="interval" type="number" min="3" max="90" .value=${String(i?.succession_interval_days??21)} /></label>
        <label class="field">${this.t("planner.succession_placement")}
          <select name="placement"><option value="split">${this.t("planner.succession.split")}</option><option value="stack">${this.t("planner.succession.stack")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${t}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.succession_create")}</button></div>
      </form>`}else e=l`<form class="stack" @submit=${this.importPlan}>
        <h2>${this.t("planner.import")}</h2>
        <input name="file" type="file" accept=".json,.yaml,.yml,application/json,application/yaml" required />
        <label class="field">${this.t("planner.import_mode")}
          <select name="mode"><option value="merge">${this.t("planner.import_merge")}</option><option value="replace">${this.t("planner.import_replace")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${t}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.import")}</button></div>
      </form>`;return l`<dialog @close=${t} style=${this.dialog==="autofill"?"max-width:760px":""}>${e}</dialog>`}};_.styles=[I,P`
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
      .plant-card .swatch { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; color: #fff; font-weight: 700; font-size: 12px; flex: none; }
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
      .readonly-note { font-size: var(--hl-fs-xs); color: var(--hl-warning); }
      dialog { border: none; border-radius: var(--hl-r-lg); padding: var(--hl-s5); max-width: 520px; width: calc(100% - 32px); background: var(--hl-surface); color: var(--hl-text); box-shadow: var(--hl-shadow-3); }
      dialog::backdrop { background: rgba(20, 24, 18, 0.45); }
      kbd { font-family: ui-monospace, monospace; font-size: 12px; background: var(--hl-surface-2); border: 1px solid var(--hl-border); border-bottom-width: 2px; border-radius: 4px; padding: 1px 6px; }
      table.shortcuts td { padding: 4px 8px; }
      .drag-ghost-hint { position: absolute; left: 50%; top: 12px; transform: translateX(-50%); background: var(--hl-surface); border: 1px solid var(--hl-border);
        padding: 6px 12px; border-radius: var(--hl-r-pill); box-shadow: var(--hl-shadow-2); font-size: var(--hl-fs-sm); pointer-events: none; max-width: 90%; }
    `],p([f({attribute:!1})],_.prototype,"snapshot",2),p([f({attribute:!1})],_.prototype,"plants",2),p([f({attribute:!1})],_.prototype,"families",2),p([f({attribute:!1})],_.prototype,"api",2),p([f({attribute:!1})],_.prototype,"t",2),p([f()],_.prototype,"lang",2),p([f({type:Boolean})],_.prototype,"admin",2),p([f({type:Boolean})],_.prototype,"narrow",2),p([b()],_.prototype,"draft",2),p([b()],_.prototype,"selection",2),p([b()],_.prototype,"multi",2),p([b()],_.prototype,"showFeatures",2),p([b()],_.prototype,"showPlantings",2),p([b()],_.prototype,"showZones",2),p([b()],_.prototype,"categoryFilter",2),p([b()],_.prototype,"autofill",2),p([b()],_.prototype,"autofillBusy",2),p([b()],_.prototype,"autofillReplace",2),p([b()],_.prototype,"autofillBeds",2),p([b()],_.prototype,"autofillResources",2),p([b()],_.prototype,"season",2),p([b()],_.prototype,"saveState",2),p([b()],_.prototype,"reports",2),p([b()],_.prototype,"extraTimelines",2),p([b()],_.prototype,"snapOn",2),p([b()],_.prototype,"showCompanions",2),p([b()],_.prototype,"showMoisture",2),p([b()],_.prototype,"showTemperature",2),p([b()],_.prototype,"viewDate",2),p([b()],_.prototype,"layoutMode",2),p([b()],_.prototype,"search",2),p([b()],_.prototype,"familyFilter",2),p([b()],_.prototype,"paletteDrag",2),p([b()],_.prototype,"ghostReport",2),p([b()],_.prototype,"dialog",2),p([b()],_.prototype,"announcement",2),p([b()],_.prototype,"paletteOpen",2),p([Bt("hl-garden-canvas")],_.prototype,"canvas",2),_=p([R("hl-planner-view")],_);var zs={id:"",names:{en:"",nl:""},scientific_name:"",family:"Asteraceae",variety:null,habit:"bush",perennial:!1,spacing_cm:30,row_spacing_cm:30,sowing_depth_cm:1,germination_days:[7,14],min_soil_temp_c:8,optimal_soil_temp_c:18,max_soil_temp_c:null,days_to_maturity:[60,80],maturity_from:"sow",harvest_duration_days:14,harvestable:!0,continuous_harvest:!1,harvest_interval_days:null,transplant_age_days:[35,49],sowing:{indoor_sow:[],direct_sow:[{start_week:-2,end_week:8,anchor:"last_frost"}],transplant:[]},greenhouse:{suitability:"conditional",min_night_c:5,max_day_c:30,season_extension_weeks:2,notes:{}},frost_tolerance:"half_hardy",min_temp_c:0,max_temp_c:30,companions:[],rotation_years:3,pests:[],diseases:[],water_needs:"medium",nutrient_needs:"medium",feeding_interval_days:null,care:[],pruning_notes:{},thinning:!1,succession_interval_days:null,gdd_base_c:10,gdd_to_maturity:null,tags:[],source:"custom"},L=class extends M{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.query="";this.family="";this.category="";this.filter="";this.selected=null;this.editing=null;this.error=""}get anchors(){return this.snapshot.analysis?.anchors??{last_frost:`${new Date().getFullYear()}-04-20`,first_frost:`${new Date().getFullYear()}-10-25`}}seasonStart(){let t=this.anchors.last_frost;return this.snapshot.settings.region.hemisphere==="south"?`${t.slice(0,4)}-07-01`:`${t.slice(0,4)}-01-01`}renderCalendar(t){let e=this.seasonStart(),s=h=>Math.max(0,Math.min(100,at(e,h)/365*100)),i=[],n=(h,c,u)=>{for(let g of h){let[$,w]=oe(g,this.anchors);i.push(l`<div class="b" style=${`left:${s($)}%;width:${Math.max(s(w)-s($),1)}%;top:${c}px;background:${u}`}></div>`)}};n(t.sowing.indoor_sow,2,"var(--hl-leaf-300)"),n(t.sowing.direct_sow,8,"var(--hl-leaf-500)"),n(t.sowing.transplant,14,"var(--hl-leaf-700)");let r=[...t.sowing.direct_sow,...t.sowing.transplant][0];if(r&&t.harvestable){let[h,c]=oe(r,this.anchors),u=t.maturity_from==="transplant"&&!t.sowing.transplant.length?t.germination_days[1]+14:0;i.push(l`<div class="b" style=${`left:${s(A(h,t.days_to_maturity[0]+u))}%;width:${Math.max(s(A(c,t.days_to_maturity[1]+u+t.harvest_duration_days))-s(A(h,t.days_to_maturity[0]+u)),1)}%;top:20px;background:var(--hl-sun-500)`}></div>`)}let o=Array.from({length:12},(h,c)=>y(A(e,Math.round(c*30.5+10)),this.lang,{month:"narrow"}));return l`<div class="cal" role="img" aria-label=${this.t("lib.calendar")}>${o.map(h=>l`<div class="m">${h}</div>`)}${i}</div>`}filtered(){let t=this.query.trim().toLowerCase();return this.plants.filter(e=>!this.family||e.family===this.family).filter(e=>!this.category||(e.category??"vegetable")===this.category).filter(e=>this.filter!=="greenhouse"||e.greenhouse.suitability==="yes").filter(e=>this.filter!=="quick"||e.days_to_maturity[0]<=50).filter(e=>this.filter!=="custom"||e.source!=="builtin").filter(e=>!t||[e.id,e.scientific_name,e.family,this.families[e.family]?.[this.lang]??"",...Object.values(e.names)].some(s=>s.toLowerCase().includes(t))).sort((e,s)=>x(e,this.lang).localeCompare(x(s,this.lang)))}render(){let t=[...new Set(this.plants.map(e=>e.family))].sort();return l`
      <div class="top">
        <input type="search" placeholder=${this.t("lib.search")} aria-label=${this.t("lib.search")} .value=${this.query}
          @input=${e=>this.query=e.target.value} />
        <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
          <select style="width:auto" @change=${e=>this.family=e.target.value}>
            ${["",...t].map(e=>l`<option value=${e} ?selected=${e===this.family}>${e?this.families[e]?.[this.lang]??e:`${this.t("lib.family")}: ${this.t("common.all")}`}</option>`)}
          </select>
        </label>
        <label class="row small"><span class="visually-hidden">${this.t("lib.category")}</span>
          <select style="width:auto" @change=${e=>this.category=e.target.value}>
            ${["","vegetable","herb","fruit","flower"].map(e=>l`<option value=${e} ?selected=${e===this.category}>${e?this.t(`category.${e}`):`${this.t("lib.category")}: ${this.t("common.all")}`}</option>`)}
          </select>
        </label>
        <span class="small muted">${this.t("lib.count",{n:this.filtered().length})}</span>
        ${["greenhouse","quick","custom"].map(e=>l`
          <button class="chip" aria-pressed=${String(this.filter===e)} @click=${()=>this.filter=this.filter===e?"":e}>${this.t(`lib.filter_${e}`)}</button>`)}
        <span class="spacer"></span>
        ${this.admin?l`<button class="btn primary small" @click=${()=>this.editing={plant:structuredClone(zs),mode:"custom"}}>
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("lib.add_custom")}</button>`:m}
      </div>
      <div class="legend-row" aria-hidden="true">
        <span style="--c:var(--hl-leaf-300)">${this.t("lib.indoor_sow")}</span><span style="--c:var(--hl-leaf-500)">${this.t("lib.direct_sow")}</span>
        <span style="--c:var(--hl-leaf-700)">${this.t("lib.transplant")}</span><span style="--c:var(--hl-sun-500)">${this.t("lib.harvest")}</span>
      </div>
      <div class="grid" style="margin-top:12px">
        ${this.filtered().map(e=>l`
          <button class="pcard" @click=${()=>this.selected=e} aria-label=${x(e,this.lang)}>
            <div class="stripe" style=${`background:${N(this.families,e.family)}`}></div>
            <div class="inner">
              <div class="row"><h3>${x(e,this.lang)}</h3><span class="spacer"></span>
                ${e.source!=="builtin"?l`<span class="chip warn">${this.t(`lib.source.${e.source}`)}</span>`:m}</div>
              <span class="xs muted"><i>${e.scientific_name}</i>${e.variety?` \xB7 ${e.variety}`:""}</span>
              <div class="facts">
                <span><b>${e.spacing_cm} cm</b>${this.t("lib.spacing")}</span>
                <span><b>${e.days_to_maturity[0]}–${e.days_to_maturity[1]}</b>${this.t("lib.maturity")}</span>
                <span><b>${this.t(`level.${e.water_needs}`)}</b>${this.t("lib.water")}</span>
              </div>
              ${this.renderCalendar(e)}
            </div>
          </button>`)}
      </div>
      ${this.selected?this.renderDetail(this.selected):m}
      ${this.editing?this.renderEditor():m}
    `}renderDetail(t){let e=this.lang,s=n=>{let r=new Map;for(let o of t.companions)o.relation===n&&r.set(o.plant,o.reason[e]??o.reason.en??"");for(let o of this.plants)for(let h of o.companions)h.plant===t.id&&h.relation===n&&!r.has(o.id)&&r.set(o.id,h.reason[e]??h.reason.en??"");return[...r.entries()]},i=n=>x(this.plants.find(r=>r.id===n),this.lang);return l`
      <aside class="drawer" role="dialog" aria-modal="false" aria-label=${x(t,this.lang)} @keydown=${n=>n.key==="Escape"&&(this.selected=null)}>
        <header style=${`border-top: 6px solid ${N(this.families,t.family)}`}>
          <div class="stack" style="gap:2px"><h2>${x(t,this.lang)}</h2>
            <span class="small muted"><i>${t.scientific_name}</i> · ${this.families[t.family]?.[e]??t.family}</span></div>
          <span class="spacer"></span>
          <button class="icon-btn" aria-label=${this.t("common.close")} @click=${()=>this.selected=null}><ha-icon icon="mdi:close"></ha-icon></button>
        </header>
        <div class="content">
          ${this.renderCalendar(t)}
          <div class="kv">
            <span>${this.t("lib.spacing")}</span><span>${t.spacing_cm} × ${t.row_spacing_cm} cm</span>
            <span>${this.t("lib.depth")}</span><span>${t.sowing_depth_cm} cm</span>
            <span>${this.t("lib.germination")}</span><span>${t.germination_days[0]}–${t.germination_days[1]} d · ≥ ${t.min_soil_temp_c} °C</span>
            <span>${this.t("lib.maturity")}</span><span>${t.days_to_maturity[0]}–${t.days_to_maturity[1]} d</span>
            <span>${this.t("lib.habit")}</span><span>${this.t(`habit.${t.habit}`)}</span>
            <span>${this.t("lib.frost")}</span><span>${this.t(`frost.${t.frost_tolerance}`)} (${t.min_temp_c} °C)</span>
            <span>${this.t("lib.greenhouse")}</span><span>${this.t(`suit.${t.greenhouse.suitability}`)} · ${t.greenhouse.min_night_c}–${t.greenhouse.max_day_c} °C</span>
            <span>${this.t("lib.water")} / ${this.t("lib.nutrients")}</span><span>${this.t(`level.${t.water_needs}`)} / ${this.t(`level.${t.nutrient_needs}`)}</span>
            <span>${this.t("lib.rotation")} <hl-info term="rotation" .t=${this.t}></hl-info></span><span>${this.t("lib.rotation_years",{n:t.rotation_years})}</span>
            ${t.category?l`<span>${this.t("lib.category")}</span><span>${this.t(`category.${t.category}`)}${t.perennial?` \xB7 ${this.t("lib.perennial")}`:""}</span>`:m}
            ${t.height_cm?l`<span>${this.t("lib.height")}</span><span>${t.height_cm} cm · ${this.t("lib.roots")} ${t.root_depth_cm??"?"} cm</span>`:m}
            ${t.kc?l`<span>Kc <hl-info term="kc" .t=${this.t}></hl-info></span><span>${t.kc.map(n=>n.toFixed(2)).join(" \u2192 ")}</span>`:m}
            ${t.npk?l`<span>N · P · K <hl-info term="npk" .t=${this.t}></hl-info></span><span>${t.npk.join(" \xB7 ")} / 3</span>`:m}
            ${t.gdd_to_maturity?l`<span>${this.t("lib.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span>${t.gdd_to_maturity} °C·d (${this.t("lib.base")} ${t.gdd_base_c} °C)</span>`:m}
            ${t.plants_per_person?l`<span>${this.t("lib.per_person")}</span><span>${t.plants_per_person} · ${t.yield_kg_m2??"?"} kg/m²</span>`:m}
          </div>
          ${t.deters?.length||t.trap_for?.length||t.allelopathic||t.shade_tolerant?l`<div class="row wrap">
            ${(t.deters??[]).map(n=>l`<span class="chip ok" title=${this.t("lib.deters")}>🛡 ${St(n,this.lang)}</span>`)}
            ${(t.trap_for??[]).map(n=>l`<span class="chip warn" title=${this.t("lib.trap_for")}>🪤 ${St(n,this.lang)} <hl-info term="trap_crop" .t=${this.t}></hl-info></span>`)}
            ${t.allelopathic?l`<span class="chip bad">${this.t("lib.allelopathic")} <hl-info term="allelopathy" .t=${this.t}></hl-info></span>`:m}
            ${t.shade_tolerant?l`<span class="chip cold">${this.t("lib.shade_tolerant")}</span>`:m}
          </div>`:m}
          ${t.greenhouse.notes[e]?l`<p class="small">${t.greenhouse.notes[e]}</p>`:m}
          <section class="stack"><h3>${this.t("lib.friends")}</h3>
            ${s("friend").map(([n,r])=>l`<div class="rel"><span class="chip ok">${i(n)}</span><span class="muted">${r}</span></div>`)}</section>
          <section class="stack"><h3>${this.t("lib.enemies")}</h3>
            ${s("enemy").length?s("enemy").map(([n,r])=>l`<div class="rel"><span class="chip bad">${i(n)}</span><span class="muted">${r}</span></div>`):l`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.pests")} & ${this.t("lib.diseases")}</h3>
            <div class="row wrap">${t.pests.map(n=>l`<span class="chip warn">${St(n,this.lang)}</span>`)}${t.diseases.map(n=>l`<span class="chip bad">${St(n,this.lang)}</span>`)}</div></section>
          ${t.care.length||t.pruning_notes[e]?l`<section class="stack"><h3>${this.t("lib.care")}</h3>
            ${t.care.map(n=>l`<p class="small"><b>${this.t(`type.${n.task}`)}</b>${n.interval_days?` \xB7 \u21BB ${n.interval_days} d`:""} – ${n.notes[e]??n.notes.en??""}</p>`)}
            ${t.pruning_notes[e]?l`<p class="small">${t.pruning_notes[e]}</p>`:m}</section>`:m}
          ${this.admin?l`<div class="row">
            <button class="btn" @click=${()=>this.editing={plant:structuredClone(t),mode:t.source==="custom"?"custom":"override"}}>
              <ha-icon icon="mdi:pencil"></ha-icon>${this.t("lib.customize")}</button>
            ${t.source!=="builtin"?l`<button class="btn danger" @click=${()=>this.removePlant(t)}>${t.source==="override"?this.t("lib.reset"):this.t("common.delete")}</button>`:m}
          </div>`:m}
        </div>
      </aside>`}async removePlant(t){try{await this.api.deletePlant(t.id),this.selected=null,this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0}))}catch(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e.message},bubbles:!0,composed:!0}))}}async save(t){t.preventDefault();let{plant:e,mode:s}=this.editing,i=t.target,n=g=>i.elements.namedItem(g).value,r=g=>Number(n(g)),o=g=>i.elements.namedItem(`${g}_on`).checked?[{start_week:r(`${g}_start`),end_week:r(`${g}_end`),anchor:"last_frost"}]:[],h=n("name_en").trim(),c={...e,id:s==="custom"&&!e.id?h.toLowerCase().normalize("NFKD").replace(/[^\w]+/g,"_").replace(/^_|_$/g,"")||"plant":e.id,names:{...e.names,en:h,nl:n("name_nl").trim()||h},scientific_name:n("scientific"),variety:n("variety")||null,family:n("family"),habit:n("habit"),spacing_cm:r("spacing"),row_spacing_cm:r("row_spacing"),sowing_depth_cm:r("depth"),germination_days:[r("germ_min"),r("germ_max")],min_soil_temp_c:r("soil_temp"),days_to_maturity:[r("dtm_min"),r("dtm_max")],maturity_from:n("maturity_from"),frost_tolerance:n("frost"),min_temp_c:r("min_temp"),max_temp_c:r("max_temp"),water_needs:n("water"),nutrient_needs:n("nutrients"),rotation_years:r("rotation"),greenhouse:{...e.greenhouse,suitability:n("gh")},sowing:{indoor_sow:o("indoor"),direct_sow:o("direct"),transplant:o("transplant")},pests:n("pests").split(",").map(g=>g.trim().replace(/\s+/g,"_")).filter(Boolean),diseases:n("diseases").split(",").map(g=>g.trim().replace(/\s+/g,"_")).filter(Boolean)},u=c;if(s==="override"){u={id:c.id};for(let g of Object.keys(c))g!=="source"&&JSON.stringify(c[g])!==JSON.stringify(e[g])&&(u[g]=c[g])}try{let g=await this.api.savePlant(u,s);this.editing=null,this.selected=g.plant,this.error="",this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("lib.saved",{plant:x(g.plant,this.lang)})},bubbles:!0,composed:!0}))}catch(g){this.error=g.message??String(g)}}updated(){let t=this.renderRoot.querySelector("dialog");t&&!t.open&&t.showModal()}renderEditor(){let{plant:t,mode:e}=this.editing,s=(n,r,o,h)=>l`
      <select name=${n}>${o.map(c=>l`<option value=${c} ?selected=${c===r}>${h?this.t(`${h}.${c}`):this.families[c]?.[this.lang]??c}</option>`)}</select>`,i=(n,r,o)=>l`
      <label class="row small"><input type="checkbox" name=${`${n}_on`} ?checked=${!!o} />${r}</label>
      <label class="field">${this.t("lib.from")} (${this.t("lib.weeks")})<input name=${`${n}_start`} type="number" min="-30" max="30" .value=${String(o?.start_week??-4)} /></label>
      <label class="field">${this.t("lib.to")} (${this.t("lib.weeks")})<input name=${`${n}_end`} type="number" min="-30" max="40" .value=${String(o?.end_week??2)} /></label>`;return l`<dialog @close=${()=>this.editing=null} style="border:none;border-radius:16px;padding:0;width:min(640px,calc(100vw - 32px));background:var(--hl-surface);color:var(--hl-text)">
      <form class="stack" style="padding:24px;max-height:85vh;overflow:auto" @submit=${this.save}>
        <h2>${e==="custom"&&!t.id?this.t("lib.add_custom"):`${this.t("lib.customize")}: ${x(t,this.lang)}`}</h2>
        <div class="form-grid">
          <label class="field">${this.t("lib.name_en")}<input name="name_en" required .value=${t.names.en??""} /></label>
          <label class="field">${this.t("lib.name_nl")}<input name="name_nl" .value=${t.names.nl??""} /></label>
          <label class="field">${this.t("lib.scientific")}<input name="scientific" .value=${t.scientific_name} /></label>
          <label class="field">${this.t("lib.variety")}<input name="variety" .value=${t.variety??""} /></label>
          <label class="field">${this.t("lib.family")}${s("family",t.family,Object.keys(this.families),"")}</label>
          <label class="field">${this.t("lib.habit")}${s("habit",t.habit,["bush","vine","climbing","upright","rosette","root","bulb"],"habit")}</label>
          <label class="field">${this.t("lib.spacing")} (cm)<input name="spacing" type="number" min="1" step="1" .value=${String(t.spacing_cm)} /></label>
          <label class="field">${this.t("lib.row_spacing")} (cm)<input name="row_spacing" type="number" min="1" .value=${String(t.row_spacing_cm)} /></label>
          <label class="field">${this.t("lib.depth")} (cm)<input name="depth" type="number" min="0" step="0.5" .value=${String(t.sowing_depth_cm)} /></label>
          <label class="field">${this.t("lib.soil_temp")} (°C)<input name="soil_temp" type="number" step="1" .value=${String(t.min_soil_temp_c)} /></label>
          <label class="field">${this.t("lib.germination")} min<input name="germ_min" type="number" min="1" .value=${String(t.germination_days[0])} /></label>
          <label class="field">${this.t("lib.germination")} max<input name="germ_max" type="number" min="1" .value=${String(t.germination_days[1])} /></label>
          <label class="field">${this.t("lib.maturity")} min<input name="dtm_min" type="number" min="1" .value=${String(t.days_to_maturity[0])} /></label>
          <label class="field">${this.t("lib.maturity")} max<input name="dtm_max" type="number" min="1" .value=${String(t.days_to_maturity[1])} /></label>
          <label class="field">${this.t("planner.method")}<select name="maturity_from">
            <option value="sow" ?selected=${t.maturity_from==="sow"}>${this.t("lib.direct_sow")}</option>
            <option value="transplant" ?selected=${t.maturity_from==="transplant"}>${this.t("lib.transplant")}</option></select></label>
          <label class="field">${this.t("lib.frost")}${s("frost",t.frost_tolerance,["tender","half_hardy","hardy","very_hardy"],"frost")}</label>
          <label class="field">${this.t("lib.min_temp")} (°C)<input name="min_temp" type="number" step="0.5" .value=${String(t.min_temp_c)} /></label>
          <label class="field">Max (°C)<input name="max_temp" type="number" step="0.5" .value=${String(t.max_temp_c)} /></label>
          <label class="field">${this.t("lib.water")}${s("water",t.water_needs,["low","medium","high"],"level")}</label>
          <label class="field">${this.t("lib.nutrients")}${s("nutrients",t.nutrient_needs,["low","medium","high"],"level")}</label>
          <label class="field">${this.t("lib.greenhouse")}${s("gh",t.greenhouse.suitability,["yes","conditional","no"],"suit")}</label>
          <label class="field">${this.t("lib.rotation")}<input name="rotation" type="number" min="1" max="8" .value=${String(t.rotation_years)} /></label>
        </div>
        <fieldset><legend>${this.t("lib.calendar")}</legend>
          <p class="xs muted">${this.t("lib.windows_hint")}</p>
          <div class="form-grid" style="grid-template-columns: 1.2fr 1fr 1fr; align-items:end">
            ${i("indoor",this.t("lib.indoor_sow"),t.sowing.indoor_sow[0])}
            ${i("direct",this.t("lib.direct_sow"),t.sowing.direct_sow[0])}
            ${i("transplant",this.t("lib.transplant"),t.sowing.transplant[0])}
          </div>
        </fieldset>
        <label class="field">${this.t("lib.pests")}<input name="pests" .value=${t.pests.join(", ")} /></label>
        <label class="field">${this.t("lib.diseases")}<input name="diseases" .value=${t.diseases.join(", ")} /></label>
        ${this.error?l`<p class="field-error" role="alert">${this.error}</p>`:m}
        <div class="row" style="justify-content:flex-end">
          <button type="button" class="btn ghost" @click=${()=>this.editing=null}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("common.save")}</button>
        </div>
      </form>
    </dialog>`}};L.styles=[I,P`
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
    `],p([f({attribute:!1})],L.prototype,"snapshot",2),p([f({attribute:!1})],L.prototype,"plants",2),p([f({attribute:!1})],L.prototype,"families",2),p([f({attribute:!1})],L.prototype,"api",2),p([f({attribute:!1})],L.prototype,"t",2),p([f()],L.prototype,"lang",2),p([f({type:Boolean})],L.prototype,"admin",2),p([b()],L.prototype,"query",2),p([b()],L.prototype,"family",2),p([b()],L.prototype,"category",2),p([b()],L.prototype,"filter",2),p([b()],L.prototype,"selected",2),p([b()],L.prototype,"editing",2),p([b()],L.prototype,"error",2),L=p([R("hl-library-view")],L);var j=class extends M{constructor(){super(...arguments);this.lang="en";this.plants=new Map;this.families={};this.mode="month";this.cursor="";this.showDone=!1;this.bedFilter=""}willUpdate(){this.cursor||(this.cursor=this.today)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}get today(){return this.snapshot.analysis?.today??ht(new Date)}get tasks(){return this.snapshot.tasks.filter(t=>(this.showDone||t.status==="open")&&t.status!=="skipped"&&(!this.bedFilter||t.bed_id===this.bedFilter))}byDay(){let t=new Map;for(let e of Et(this.tasks)){let s=e.status==="open"&&e.due<this.today?this.today:e.due;t.set(s,[...t.get(s)??[],e])}return t}move(t){let e=W(this.cursor);this.mode==="timeline"?e.setFullYear(e.getFullYear()+t):this.mode==="month"?e.setMonth(e.getMonth()+t,1):e.setDate(e.getDate()+t*(this.mode==="week"?7:30)),this.cursor=ht(e)}weekStart(t){let s=(W(t).getDay()+6)%7;return A(t,-s)}renderEvent(t){let e=t.status==="open"&&t.due<this.today;return l`<button class="ev ${t.status!=="open"?"done":""} ${e?"overdue":""}" style=${`border-left-color:${dt[t.type]??"var(--hl-soil-500)"}`}
      title=${t.title} @click=${()=>this.emit("open-task",t)}>
      <ha-icon icon=${lt[t.type]}></ha-icon><span>${t.title}</span></button>`}renderMonth(){let t=W(this.cursor);t.setDate(1);let e=this.weekStart(ht(t)),s=t.getMonth(),i=Array.from({length:42},(o,h)=>A(e,h)),n=this.byDay(),r=Array.from({length:7},(o,h)=>y(A(e,h),this.lang,{weekday:"short"}));return l`<div class="month" role="grid">
      ${r.map(o=>l`<div class="dow" role="columnheader">${o}</div>`)}
      ${i.map(o=>{let h=n.get(o)??[];return l`<div class="cell ${W(o).getMonth()!==s?"other":""} ${o===this.today?"today":""}" role="gridcell" aria-label=${y(o,this.lang,{day:"numeric",month:"long"})}>
          <span class="num">${W(o).getDate()}</span>
          ${h.slice(0,4).map(c=>this.renderEvent(c))}
          ${h.length>4?l`<button class="more" @click=${()=>{this.cursor=o,this.mode="week"}}>+${h.length-4}</button>`:m}
        </div>`})}
    </div>`}renderWeek(){let t=this.weekStart(this.cursor),e=this.byDay();return l`<div class="week">
      ${Array.from({length:7},(s,i)=>A(t,i)).map(s=>l`
        <div class="col ${s===this.today?"today":""}">
          <b class="small">${y(s,this.lang,{weekday:"long",day:"numeric",month:"short"})}</b>
          ${(e.get(s)??[]).map(i=>this.renderEvent(i))}
        </div>`)}
    </div>`}renderList(){let t={t:this.t,lang:this.lang,today:this.today,onOpen:i=>this.emit("open-task",i),onComplete:i=>this.emit("complete-task",i),onPostpone:(i,n)=>this.emit("postpone-task",{task:i,days:n})},e=this.byDay(),s=[...e.keys()].filter(i=>i>=this.cursor).sort().slice(0,30);return s.length?l`${s.map(i=>l`<div class="group">
      <h3>${i===this.today?this.t("common.today"):y(i,this.lang,{weekday:"long",day:"numeric",month:"long"})}</h3>
      <ul class="tasks">${e.get(i).map(n=>Tt(n,t))}</ul></div>`)}`:l`<p class="empty">–</p>`}renderTimeline(){let t=this.snapshot.analysis;if(!t)return l`<p class="empty">–</p>`;let e=Number(this.cursor.slice(0,4))||t.season,s=this.snapshot.settings.region.hemisphere==="south",i=s?`${e}-07-01`:`${e}-01-01`,n=s?`${e+1}-06-30`:`${e}-12-31`,r=at(i,n)+1,o=v=>v?Math.max(0,Math.min(100,at(i,v)/r*100)):null,h=(v,k,E,tt,z)=>{let X=o(v),F=o(k);return X===null||F===null||F<=0||X>=100?m:l`<div class="g-bar ${E}" title=${z} style=${`left:${X}%;width:${Math.max(F-X,.6)}%;${tt}`}></div>`},c=Array.from({length:12},(v,k)=>{let E=W(i);return E.setMonth(E.getMonth()+k,1),ht(E)}),u=this.snapshot.plantings.filter(v=>v.season===e&&t.timelines[v.id]&&(!this.bedFilter||v.bed_id===this.bedFilter)),g=this.snapshot.beds.filter(v=>u.some(k=>k.bed_id===v.id)),$=this.snapshot.tasks.filter(v=>v.key?.startsWith("m:")&&v.due>=i&&v.due<=n&&(this.showDone||v.status==="open")),w=l`
      ${!t.anchors.frost_free&&o(t.anchors.last_frost)!==null?l`<div class="g-line" style=${`left:${o(t.anchors.last_frost)}%`} title=${this.t("cal.last_frost")}></div>`:m}
      ${!t.anchors.frost_free&&o(t.anchors.first_frost)!==null?l`<div class="g-line" style=${`left:${o(t.anchors.first_frost)}%`} title=${this.t("cal.first_frost")}></div>`:m}
      ${this.today>=i&&this.today<=n?l`<div class="g-line today" style=${`left:${o(this.today)}%`} title=${this.t("common.today")}></div>`:m}`;return l`<div class="gantt"><div class="gantt-inner" role="table" aria-label=${this.t("cal.timeline")}>
      <div class="g-row head" role="row"><div class="g-label">${this.t("common.season",{year:e})}</div>
        <div class="g-track">${c.map(v=>l`<span class="g-month" style=${`left:${o(v)}%`}>${y(v,this.lang,{month:"short"})}</span>`)}</div></div>
      ${$.length?l`<div class="g-row" role="row"><div class="g-label"><ha-icon icon="mdi:calendar-sync-outline"></ha-icon>${this.t("cal.garden_work")}</div>
        <div class="g-track">${w}${$.map(v=>l`<button class="g-task" style=${`left:${o(v.due)}%;color:${dt[v.type]??"var(--hl-soil-500)"}`}
          title=${`${y(v.due,this.lang)} \xB7 ${v.title}`} @click=${()=>this.emit("open-task",v)}><ha-icon icon=${lt[v.type]}></ha-icon></button>`)}</div></div>`:m}
      ${g.map(v=>l`
        <div class="g-row bed" role="row"><div class="g-label">${v.name}</div><div class="g-track">${w}</div></div>
        ${u.filter(k=>k.bed_id===v.id).sort((k,E)=>t.timelines[k.id].in_ground<t.timelines[E.id].in_ground?-1:1).map(k=>{let E=t.timelines[k.id],tt=this.plants.get(k.plant_id),z=N(this.families,tt?.family),X=x(tt,this.lang),F=t.phenology?.[k.id];return l`<div class="g-row" role="row">
            <div class="g-label"><span class="family-dot" style=${`background:${z};width:10px;height:10px`}></span>${X}
              ${F&&F.stage!=="not_planted"&&F.stage!=="finished"?l`<span class="xs muted">· ${this.t(`stage.${F.stage}`)}</span>`:m}</div>
            <div class="g-track">${w}
              ${E.sow_date&&E.sow_date<E.in_ground?h(E.sow_date,E.in_ground,"sow",`background:${z}`,`${this.t("lib.indoor_sow")}: ${y(E.sow_date,this.lang)}`):m}
              ${h(E.in_ground,E.harvest_start,"",`background:color-mix(in srgb, ${z} 35%, transparent);border:1px solid ${z}`,`${y(E.in_ground,this.lang)} \u2013 ${y(E.harvest_start,this.lang)}`)}
              ${h(E.harvest_start,E.harvest_end,"",`background:${z}`,`${this.t("lib.harvest")}: ${y(E.harvest_start,this.lang)} \u2013 ${y(E.harvest_end,this.lang)}`)}
              ${F?.harvest_estimate&&o(F.harvest_estimate)!==null?l`<span class="g-mark" style=${`left:${o(F.harvest_estimate)}%`}
                title=${this.t("cal.harvest_estimate",{date:y(F.harvest_estimate,this.lang)})}></span>`:m}
            </div></div>`})}`)}
      ${g.length?m:l`<p class="empty">${this.t("cal.no_plantings")}</p>`}
      <div class="g-legend">
        <span><i style="background:var(--hl-leaf-300);height:4px"></i>${this.t("lib.indoor_sow")}</span>
        <span><i style="background:color-mix(in srgb, var(--hl-leaf-500) 35%, transparent);border:1px solid var(--hl-leaf-500)"></i>${this.t("cal.growing")}</span>
        <span><i style="background:var(--hl-leaf-600)"></i>${this.t("lib.harvest")}</span>
        <span><i style="width:10px;height:10px;transform:rotate(45deg);background:var(--hl-text)"></i>${this.t("cal.harvest_estimate_short")}</span>
        <span><i style="border-left:2px dashed var(--hl-frost-500);width:2px;height:12px;border-radius:0"></i>${this.t("cal.frost_dates")}</span>
      </div>
    </div></div>`}render(){let t=this.mode==="timeline"?this.t("common.season",{year:Number(this.cursor.slice(0,4))}):this.mode==="month"?y(this.cursor,this.lang,{month:"long",year:"numeric"}):`${y(this.weekStart(this.cursor),this.lang)} \u2013 ${y(A(this.weekStart(this.cursor),6),this.lang)}`;return l`
      <div class="bar">
        <button class="icon-btn" aria-label=${this.t("cal.prev")} @click=${()=>this.move(-1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
        <button class="btn small" @click=${()=>this.cursor=this.today}>${this.t("common.today")}</button>
        <button class="icon-btn" aria-label=${this.t("cal.next")} @click=${()=>this.move(1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
        <h2 aria-live="polite">${t}</h2>
        <span class="spacer"></span>
        <div class="row" role="group">
          ${["month","week","list","timeline"].map(e=>l`<button class="chip" aria-pressed=${String(this.mode===e)} @click=${()=>this.mode=e}>${this.t(`cal.${e}`)}</button>`)}
        </div>
        <label class="row small"><span class="visually-hidden">${this.t("task.bed")}</span>
          <select style="width:auto" @change=${e=>this.bedFilter=e.target.value}>
            ${[{id:"",name:this.t("cal.all_beds")},...this.snapshot.beds].map(e=>l`<option value=${e.id} ?selected=${e.id===this.bedFilter}>${e.name}</option>`)}
          </select>
        </label>
        <label class="row small"><input type="checkbox" .checked=${this.showDone} @change=${e=>this.showDone=e.target.checked} />${this.t("cal.show_done")}</label>
        <button class="btn primary small" @click=${()=>this.emit("new-task",null)}><ha-icon icon="mdi:plus"></ha-icon>${this.t("cal.add_task")}</button>
      </div>
      ${this.mode==="month"?this.renderMonth():this.mode==="week"?this.renderWeek():this.mode==="timeline"?this.renderTimeline():this.renderList()}
    `}};j.styles=[I,Ut,P`
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
    `],p([f({attribute:!1})],j.prototype,"snapshot",2),p([f({attribute:!1})],j.prototype,"t",2),p([f()],j.prototype,"lang",2),p([f({attribute:!1})],j.prototype,"plants",2),p([f({attribute:!1})],j.prototype,"families",2),p([b()],j.prototype,"mode",2),p([b()],j.prototype,"cursor",2),p([b()],j.prototype,"showDone",2),p([b()],j.prototype,"bedFilter",2),j=p([R("hl-calendar-view")],j);var As=["nl_be","uk_south","uk_north","de_central","fr_north","scandinavia_south","mediterranean","au_melbourne","nz_christchurch","za_highveld"],Cs={nl_be:"Nederland / Vlaanderen",uk_south:"UK (south)",uk_north:"UK (north)",de_central:"Deutschland (Mitte)",fr_north:"France (nord)",scandinavia_south:"Scandinavia (south)",mediterranean:"Mediterranean",au_melbourne:"Australia \u2013 Melbourne",nz_christchurch:"New Zealand \u2013 Christchurch",za_highveld:"South Africa \u2013 Highveld"},Ls=Array.from({length:13},(d,a)=>[`${a+1}a`,`${a+1}b`]).flat(),Is={soil_moisture:{domains:["sensor"],deviceClass:"moisture"},soil_temperature:{domains:["sensor"],deviceClass:"temperature"},air_temperature:{domains:["sensor"],deviceClass:"temperature"},air_humidity:{domains:["sensor"],deviceClass:"humidity"},light:{domains:["sensor"],deviceClass:"illuminance"},rain:{domains:["sensor","binary_sensor"]},par:{domains:["sensor"]},ec:{domains:["sensor"],deviceClass:"conductivity"},npk_n:{domains:["sensor"]},npk_p:{domains:["sensor"]},npk_k:{domains:["sensor"]},leaf_wetness:{domains:["sensor","binary_sensor"]}},Hs=["fresh","storage","herbs","pollinators","winter","perennials","easy"],G=class extends M{constructor(){super(...arguments);this.lang="en";this.admin=!0;this.busy=!1}entityOptions(t){let e=Object.values(this.hass?.states??{}),s=t==="weather"?{domains:["weather"]}:t==="irrigation"?{domains:["switch","valve"]}:t==="tts"?{domains:["tts"]}:t==="media_player"?{domains:["media_player"]}:t==="vent"?{domains:["cover","switch","fan"]}:t==="shade"?{domains:["cover","switch"]}:t==="pump"?{domains:["switch"]}:Is[t];return e.filter(i=>s.domains.includes(i.entity_id.split(".")[0])).filter(i=>!("deviceClass"in s)||!s.deviceClass||i.attributes.device_class===s.deviceClass).map(i=>i.entity_id).sort()}entityInput(t,e,s,i,n){let r=`list-${e}`,o=s?this.hass?.states[s]:void 0;return l`<label class="field">${n}
      <input list=${r} .value=${s??""} placeholder=${`${{weather:"weather",irrigation:"switch",tts:"tts",media_player:"media_player",vent:"cover"}[e]??"sensor"}.\u2026`} ?disabled=${!this.admin} id=${t}
        aria-invalid=${s&&!o?"true":"false"}
        @change=${h=>i(h.target.value.trim()||null)} />
      ${s?l`<span class="state">${o?`${o.state} ${o.attributes.unit_of_measurement??""}`:"\u26A0 not found"}</span>`:m}
    </label>`}datalists(){return l`${["soil_moisture","soil_temperature","air_temperature","air_humidity","light","rain","par","ec","npk_n","npk_p","npk_k","leaf_wetness","weather","irrigation","tts","media_player","vent","shade","pump"].map(e=>l`<datalist id=${`list-${e}`}>${this.entityOptions(e).map(s=>l`<option value=${s}></option>`)}</datalist>`)}`}async saveSettings(t){this.busy=!0;try{await this.api.saveSettings(t),this.toast(this.t("settings.saved"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}finally{this.busy=!1}}async savePlan(t){let e=structuredClone({zones:this.snapshot.zones,beds:this.snapshot.beds,plantings:this.snapshot.plantings,features:this.snapshot.features??[]});t(e);try{await this.api.savePlan(e,this.snapshot.revision),this.toast(this.t("settings.saved"))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}toast(t){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t},bubbles:!0,composed:!0}))}renderRegion(){let t=this.snapshot.settings.region,e=this.snapshot.analysis?.anchors,s=i=>this.saveSettings({region:i});return l`<section class="card stack" aria-labelledby="s-region">
      <h2 id="s-region">${this.t("settings.region")}</h2>
      <div class="form-grid">
        <label class="field">${this.t("settings.hemisphere")}
          <select ?disabled=${!this.admin} @change=${i=>s({hemisphere:i.target.value})}>
            ${["north","south"].map(i=>l`<option value=${i} ?selected=${t.hemisphere===i}>${this.t(`settings.hemisphere.${i}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("settings.mode")}
          <select ?disabled=${!this.admin} @change=${i=>s({mode:i.target.value})}>
            ${["preset","usda","custom"].map(i=>l`<option value=${i} ?selected=${t.mode===i}>${this.t(`settings.mode.${i}`)}</option>`)}
          </select></label>
        ${t.mode==="preset"?l`<label class="field full">${this.t("settings.preset")}
          <select ?disabled=${!this.admin} @change=${i=>s({preset:i.target.value})}>
            ${As.map(i=>l`<option value=${i} ?selected=${t.preset===i}>${Cs[i]}</option>`)}</select></label>`:m}
        ${t.mode==="usda"?l`<label class="field full">${this.t("settings.zone")}
          <select ?disabled=${!this.admin} @change=${i=>s({hardiness_zone:i.target.value})}>
            ${Ls.map(i=>l`<option value=${i} ?selected=${t.hardiness_zone===i}>${i}</option>`)}</select></label>`:m}
        ${t.mode==="custom"?l`
          <label class="field">${this.t("settings.last_frost")}<input pattern="\\d{2}-\\d{2}" .value=${t.last_frost} ?disabled=${!this.admin}
            @change=${i=>i.target.checkValidity()&&s({last_frost:i.target.value})} /></label>
          <label class="field">${this.t("settings.first_frost")}<input pattern="\\d{2}-\\d{2}" .value=${t.first_frost} ?disabled=${!this.admin}
            @change=${i=>i.target.checkValidity()&&s({first_frost:i.target.value})} /></label>`:m}
      </div>
      ${e?l`<p class="small muted">${this.t("settings.frost_dates_now",{last:y(e.last_frost,this.lang,{day:"numeric",month:"long"}),first:y(e.first_frost,this.lang,{day:"numeric",month:"long",year:"numeric"})})}</p>`:m}
    </section>`}renderWeather(){let t=this.snapshot.settings;return l`<section class="card stack" aria-labelledby="s-weather">
      <h2 id="s-weather">${this.t("settings.weather")}</h2>
      ${this.entityInput("w","weather",t.weather_entity,e=>this.saveSettings({weather_entity:e}),this.t("settings.weather_entity"))}
      ${this.entityInput("ot","air_temperature",t.outdoor_sensors.air_temperature,e=>this.saveSettings({outdoor_sensors:{air_temperature:e}}),this.t("settings.outdoor_temp"))}
      ${this.entityInput("rn","rain",t.outdoor_sensors.rain,e=>this.saveSettings({outdoor_sensors:{rain:e}}),this.t("settings.rain"))}
      ${this.entityInput("oh","air_humidity",t.outdoor_sensors.air_humidity,e=>this.saveSettings({outdoor_sensors:{air_humidity:e}}),this.t("settings.sensor.air_humidity"))}
      ${this.entityInput("lw","leaf_wetness",t.outdoor_sensors.leaf_wetness,e=>this.saveSettings({outdoor_sensors:{leaf_wetness:e}}),this.t("settings.sensor.leaf_wetness"))}
      <label class="field check"><input type="checkbox" .checked=${!!t.open_meteo} ?disabled=${!this.admin}
        @change=${e=>this.saveSettings({open_meteo:e.target.checked})} />${this.t("settings.open_meteo")}</label>
      <p class="xs muted">${this.t("settings.open_meteo_hint")}</p>
      <label class="field">${this.t("settings.elevation")}<input type="number" step="1" .value=${String(t.elevation_m??"")} ?disabled=${!this.admin}
        @change=${e=>this.saveSettings({elevation_m:e.target.value===""?null:Number(e.target.value)})} /></label>
      ${this.snapshot.weather.error?l`<p class="small" style="color:var(--hl-warning)">⚠ ${this.snapshot.weather.error}</p>`:m}
    </section>`}renderZones(){let t=(e,s)=>this.savePlan(i=>s(i.zones.find(n=>n.id===e)));return l`<section class="card stack" aria-labelledby="s-zones">
      <h2 id="s-zones">${this.t("settings.zones")}</h2>
      ${this.snapshot.zones.map(e=>l`<div class="item">
        <h4><ha-icon icon=${e.type==="outdoor"?"mdi:tree-outline":"mdi:greenhouse"}></ha-icon>${e.name}<span class="chip">${this.t(`settings.zone_type.${e.type}`)}</span></h4>
        <div class="form-grid">
          ${["air_temperature","air_humidity","light"].map(s=>this.entityInput(`${e.id}-${s}`,s,e.sensors[s],i=>t(e.id,n=>n.sensors[s]=i),this.t(`settings.sensor.${s}`)))}
          ${this.entityInput(`${e.id}-lw`,"leaf_wetness",e.sensors.leaf_wetness,s=>t(e.id,i=>i.sensors.leaf_wetness=s),this.t("settings.sensor.leaf_wetness"))}
          ${this.entityInput(`${e.id}-par`,"par",e.sensors.par,s=>t(e.id,i=>i.sensors.par=s),this.t("settings.sensor.par"))}
          ${e.type!=="outdoor"?l`
            ${this.entityInput(`${e.id}-vent`,"vent",e.vent_entity,s=>t(e.id,i=>i.vent_entity=s),this.t("settings.vent"))}
            ${this.entityInput(`${e.id}-shade`,"shade",e.shade_entity,s=>t(e.id,i=>i.shade_entity=s),this.t("settings.shade_entity"))}
            <label class="field">${this.t("settings.climate_control")}
              <select ?disabled=${!this.admin} @change=${s=>t(e.id,i=>i.climate_control=s.target.value)}>
                ${["off","advise","auto"].map(s=>l`<option value=${s} ?selected=${(e.climate_control??"advise")===s}>${this.t(`settings.climate_control.${s}`)}</option>`)}
              </select></label>
            <label class="field check"><input type="checkbox" .checked=${!!e.microclimate.thermal_mass} ?disabled=${!this.admin}
              @change=${s=>t(e.id,i=>i.microclimate.thermal_mass=s.target.checked)} />${this.t("settings.thermal_mass")}</label>`:m}
          <label class="field check"><input type="checkbox" .checked=${!!e.microclimate.wall_heat} ?disabled=${!this.admin}
            @change=${s=>t(e.id,i=>i.microclimate.wall_heat=s.target.checked)} />${this.t("settings.wall_heat")}</label>
          <label class="field check"><input type="checkbox" .checked=${e.microclimate.heated} ?disabled=${!this.admin}
            @change=${s=>t(e.id,i=>i.microclimate.heated=s.target.checked)} />${this.t("settings.heated")}</label>
          ${e.microclimate.heated?l`<label class="field">${this.t("settings.min_heating")}<input type="number" step="0.5" .value=${String(e.microclimate.min_heating_temp_c??5)}
            @change=${s=>t(e.id,i=>i.microclimate.min_heating_temp_c=Number(s.target.value))} /></label>`:m}
        </div>
      </div>`)}
    </section>`}renderBeds(){let t=(e,s)=>this.savePlan(i=>s(i.beds.find(n=>n.id===e)));return l`<section class="card stack" aria-labelledby="s-beds">
      <h2 id="s-beds">${this.t("settings.beds")}</h2>
      ${this.snapshot.beds.map(e=>l`<div class="item">
        <h4><ha-icon icon="mdi:sprout-outline"></ha-icon>${e.name}<span class="chip">${Math.round(e.width_cm)} × ${Math.round(e.length_cm)} cm</span></h4>
        <div class="form-grid">
          ${["soil_moisture","soil_temperature","ec","npk_n","npk_p","npk_k"].map(s=>this.entityInput(`${e.id}-${s}`,s,e.sensors[s],i=>t(e.id,n=>n.sensors[s]=i),this.t(`settings.sensor.${s}`)))}
          ${this.entityInput(`${e.id}-irr`,"irrigation",e.irrigation_entity,s=>t(e.id,i=>i.irrigation_entity=s),this.t("settings.irrigation"))}
          <label class="field">${this.t("settings.flow")}<input type="number" min="0" step="0.1" .value=${String(e.irrigation_flow_lpm??"")} ?disabled=${!this.admin}
            @change=${s=>t(e.id,i=>i.irrigation_flow_lpm=Number(s.target.value)||null)} /></label>
        </div>
      </div>`)}
    </section>`}renderIrrigation(){let t=this.snapshot.settings.irrigation??{mode:"advise",pump_entity:null,start_time:"06:00",max_runtime_min:30,frost_lockout_c:2,rain_skip_mm:3,pump_lead_s:3},e=n=>this.saveSettings({irrigation:n}),s=(n,r,o=1,h=0,c=999)=>l`<label class="field">${r}
      <input type="number" step=${o} min=${h} max=${c} .value=${String(t[n])}
        @change=${u=>e({[n]:Number(u.target.value)})} /></label>`,i=this.snapshot.beds.filter(n=>n.irrigation_entity).length;return l`<section class="card stack" aria-labelledby="s-irrigation">
      <h2 id="s-irrigation">${this.t("settings.irrigation_hw")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></h2>
      <div class="form-grid">
        <label class="field full">${this.t("settings.irrigation_mode")}
          <select @change=${n=>e({mode:n.target.value})}>
            ${["off","advise","auto"].map(n=>l`<option value=${n} ?selected=${t.mode===n}>${this.t(`settings.irrigation_mode.${n}`)}</option>`)}
          </select></label>
        ${this.entityInput("pump","pump",t.pump_entity,n=>e({pump_entity:n}),this.t("settings.pump"))}
        <label class="field">${this.t("settings.start_time")}<input type="time" .value=${t.start_time}
          @change=${n=>e({start_time:n.target.value})} /></label>
        ${s("max_runtime_min",this.t("settings.max_runtime"),1,1,180)}
        ${s("frost_lockout_c",this.t("settings.frost_lockout"),.5,-5,10)}
        ${s("rain_skip_mm",this.t("settings.rain_skip"),.5,0,30)}
        ${s("pump_lead_s",this.t("settings.pump_lead"),.5,0,30)}
      </div>
      <p class="xs muted">${this.t("settings.irrigation_hint",{n:i})}</p>
    </section>`}renderResources(){let t=this.snapshot.settings,e=t.resources??{household_size:2,hours_per_week:3,water_liters_per_week:null,compost_kg:null,irrigation:!1,goals:["fresh","herbs"],wanted:[],excluded:[]},s=n=>this.saveSettings({resources:n}),i=n=>s({goals:e.goals.includes(n)?e.goals.filter(r=>r!==n):[...e.goals,n]});return l`<section class="card stack" aria-labelledby="s-resources">
      <h2 id="s-resources">${this.t("settings.resources")} <hl-info term="autofill" .t=${this.t}></hl-info></h2>
      <div class="form-grid">
        <label class="field">${this.t("autofill.household")}<input type="number" min="1" max="20" .value=${String(e.household_size)}
          @change=${n=>s({household_size:Number(n.target.value)})} /></label>
        <label class="field">${this.t("autofill.hours")}<input type="number" min="0" step="0.5" .value=${String(e.hours_per_week)}
          @change=${n=>s({hours_per_week:Number(n.target.value)})} /></label>
        <label class="field">${this.t("autofill.water")}<input type="number" min="0" step="10" .value=${String(e.water_liters_per_week??"")}
          @change=${n=>s({water_liters_per_week:n.target.value===""?null:Number(n.target.value)})} /></label>
        <label class="field">${this.t("autofill.compost")}<input type="number" min="0" step="5" .value=${String(e.compost_kg??"")}
          @change=${n=>s({compost_kg:n.target.value===""?null:Number(n.target.value)})} /></label>
        <label class="field check full"><input type="checkbox" .checked=${e.irrigation}
          @change=${n=>s({irrigation:n.target.checked})} />${this.t("autofill.has_irrigation")}</label>
      </div>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.goals")}>
        ${Hs.map(n=>l`<button class="chip ${e.goals.includes(n)?"active":""}" aria-pressed=${String(e.goals.includes(n))} @click=${()=>i(n)}>${this.t(`autofill.goal.${n}`)}</button>`)}
      </div>
      <label class="field check"><input type="checkbox" .checked=${t.maintenance_tasks??!0}
        @change=${n=>this.saveSettings({maintenance_tasks:n.target.checked})} />${this.t("settings.maintenance_tasks")}</label>
    </section>`}renderNotifications(){let t=this.snapshot.settings.notifications,e=n=>this.saveSettings({notifications:n}),s=n=>n.split(",").map(r=>r.trim()).filter(Boolean),i=Object.keys(this.hass?.services?.notify??{}).map(n=>`notify.${n}`);return l`<section class="card stack" aria-labelledby="s-notify">
      <h2 id="s-notify">${this.t("settings.notifications")}</h2>
      <label class="field check"><input type="checkbox" .checked=${t.persistent} @change=${n=>e({persistent:n.target.checked})} />${this.t("settings.persistent")}</label>
      <label class="field">${this.t("settings.notify_services")}
        <input list="notify-services" .value=${t.notify_services.join(", ")} @change=${n=>e({notify_services:s(n.target.value)})} />
        <datalist id="notify-services">${i.map(n=>l`<option value=${n}></option>`)}</datalist></label>
      ${this.entityInput("tts","tts",t.tts_entity,n=>e({tts_entity:n}),this.t("settings.tts"))}
      <label class="field">${this.t("settings.tts_players")}<input list="list-media_player" .value=${t.tts_media_players.join(", ")}
        @change=${n=>e({tts_media_players:s(n.target.value)})} /></label>
      <div class="form-grid">
        <label class="field">${this.t("settings.digest")}<input type="time" .value=${t.digest_time} @change=${n=>e({digest_time:n.target.value})} /></label>
        <span></span>
        <label class="field check"><input type="checkbox" .checked=${t.frost_alerts} @change=${n=>e({frost_alerts:n.target.checked})} />${this.t("settings.frost_alerts")}</label>
        <label class="field check"><input type="checkbox" .checked=${t.heat_alerts} @change=${n=>e({heat_alerts:n.target.checked})} />${this.t("settings.heat_alerts")}</label>
        <label class="field check full"><input type="checkbox" .checked=${t.tts_frost_announcement} @change=${n=>e({tts_frost_announcement:n.target.checked})} />${this.t("settings.tts_frost")}</label>
      </div>
    </section>`}renderGeneral(){let t=this.snapshot.settings;return l`<section class="card stack" aria-labelledby="s-general">
      <h2 id="s-general">${this.t("settings.general")}</h2>
      <div class="form-grid">
        <label class="field">${this.t("settings.language")}
          <select @change=${e=>this.saveSettings({language:e.target.value||null})}>
            <option value="" ?selected=${!t.language}>${this.t("settings.language.auto")}</option>
            <option value="en" ?selected=${t.language==="en"}>English</option>
            <option value="nl" ?selected=${t.language==="nl"}>Nederlands</option>
          </select></label>
        <label class="field">${this.t("settings.units")}<input disabled .value=${this.t("settings.units_metric")} /></label>
        <label class="field">${this.t("settings.snap")}<input type="number" min="1" max="50" .value=${String(t.snap_cm)}
          @change=${e=>this.saveSettings({snap_cm:Number(e.target.value)})} /></label>
        <label class="field">${this.t("settings.radius")}<input type="number" min="10" max="300" step="5" .value=${String(t.companion_radius_cm)}
          @change=${e=>this.saveSettings({companion_radius_cm:Number(e.target.value)})} /></label>
      </div>
      <h3>${this.t("settings.data")}</h3>
      <div class="row wrap">
        <button class="btn small" @click=${()=>this.export("json")}><ha-icon icon="mdi:code-json"></ha-icon>${this.t("planner.export_json")}</button>
        <button class="btn small" @click=${()=>this.export("yaml")}><ha-icon icon="mdi:code-braces"></ha-icon>${this.t("planner.export_yaml")}</button>
      </div>
    </section>`}async export(t){let e=await this.api.exportPlan(t,!0);Ot(e.filename,e.content,t==="json"?"application/json":"application/yaml")}render(){return l`
      ${this.admin?m:l`<p class="small" style="color:var(--hl-warning);margin-bottom:12px">${this.t("common.admin_only")}</p>`}
      <fieldset ?disabled=${!this.admin||this.busy} style="border:0;padding:0;margin:0">
        <div class="sections">
          ${this.renderRegion()} ${this.renderWeather()} ${this.renderZones()} ${this.renderBeds()} ${this.renderIrrigation()}
          ${this.renderResources()} ${this.renderNotifications()} ${this.renderGeneral()}
        </div>
      </fieldset>
      ${this.datalists()}
    `}};G.styles=[I,P`
      .sections { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: var(--hl-s4); align-items: start; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .item { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); display: flex; flex-direction: column; gap: var(--hl-s2); background: var(--hl-surface-2); }
      .item h4 { display: flex; align-items: center; gap: var(--hl-s2); }
      .check { flex-direction: row !important; align-items: center; gap: var(--hl-s2) !important; color: var(--hl-text) !important; }
      .state { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
    `],p([f({attribute:!1})],G.prototype,"snapshot",2),p([f({attribute:!1})],G.prototype,"hass",2),p([f({attribute:!1})],G.prototype,"api",2),p([f({attribute:!1})],G.prototype,"t",2),p([f()],G.prototype,"lang",2),p([f({type:Boolean})],G.prototype,"admin",2),p([b()],G.prototype,"busy",2),G=p([R("hl-settings-view")],G);var Rt=d=>d.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");function Y(d){let a=[],t=/(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g,e=0,s;for(;s=t.exec(d);)s.index>e&&a.push(d.slice(e,s.index)),s[2]!==void 0?a.push(l`<strong>${s[2]}</strong>`):s[3]!==void 0?a.push(l`<em>${s[3]}</em>`):a.push(l`<code>${s[4]}</code>`),e=s.index+s[0].length;return e<d.length&&a.push(d.slice(e)),a}function Ze(d){return d.split(`
`).filter(a=>/^#{2,3} /.test(a)).map(a=>{let t=a.startsWith("### ")?3:2,e=a.replace(/^#+ /,"").trim();return{level:t,text:e,id:Rt(e)}})}var Ke=d=>d.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(a=>a.trim());function qe(d){let a=d.replace(/\r/g,"").split(`
`),t=[],e=0;for(;e<a.length;){let s=a[e];if(!s.trim()){e++;continue}let i=/^(#{1,4}) (.*)$/.exec(s);if(i){let r=i[2].trim(),o=Math.min(Math.max(i[1].length,2),4);t.push(o===2?l`<h2 id=${Rt(r)}>${Y(r)}</h2>`:o===3?l`<h3 id=${Rt(r)}>${Y(r)}</h3>`:l`<h4>${Y(r)}</h4>`),e++;continue}if(s.trim().startsWith("|")){let r=[];for(;e<a.length&&a[e].trim().startsWith("|");)r.push(a[e++]);let[o,,...h]=r,u=r[1]!==void 0&&/^\s*\|?\s*:?-{2,}/.test(r[1])?h:r.slice(1);t.push(l`<div class="table-wrap"><table>
        <thead><tr>${Ke(o).map(g=>l`<th>${Y(g)}</th>`)}</tr></thead>
        <tbody>${u.map(g=>l`<tr>${Ke(g).map($=>l`<td>${Y($)}</td>`)}</tr>`)}</tbody>
      </table></div>`);continue}if(/^\s*([-*]|\d+\.) /.test(s)){let r=/^\s*\d+\. /.test(s),o=[];for(;e<a.length&&/^\s*([-*]|\d+\.) /.test(a[e]);)o.push(a[e].replace(/^\s*([-*]|\d+\.) /,"")),e++;let h=o.map(c=>l`<li>${Y(c)}</li>`);t.push(r?l`<ol>${h}</ol>`:l`<ul>${h}</ul>`);continue}let n=[];for(;e<a.length&&a[e].trim()&&!/^(#{1,4} |\s*\||\s*([-*]|\d+\.) )/.test(a[e]);)n.push(a[e++].trim());t.push(l`<p>${Y(n.join(" "))}</p>`)}return t.length?l`${t}`:l`${m}`}var Bs={planning:"mdi:clipboard-text-outline",soil:"mdi:shovel",sowing:"mdi:seed-outline",watering:"mdi:watering-can-outline",fertilizing:"mdi:bottle-tonic-plus-outline",rotation:"mdi:rotate-3d-variant",companions:"mdi:handshake-outline",greenhouse:"mdi:greenhouse",pests:"mdi:bug-outline",diseases:"mdi:mushroom-outline",seasons:"mdi:calendar-sync-outline",harvest:"mdi:basket-outline",seeds:"mdi:seed",nodig:"mdi:layers-outline",herbs:"mdi:leaf",perennials:"mdi:flower-outline"},D=class extends M{constructor(){super(...arguments);this.lang="en";this.chapterId="";this.narrow=!1;this.chapters=[];this.glossary={};this.body="";this.loadedId="";this.query="";this.results=[];this.showGlossary=!1}willUpdate(t){(t.has("api")||t.has("lang"))&&this.api&&this.loadIndex(),(t.has("chapterId")||t.has("lang"))&&this.api&&this.chapterId&&this.chapterId!==this.loadedId&&this.loadChapter(this.chapterId)}async loadIndex(){let t=await this.api.handbookIndex(this.lang);this.chapters=t.chapters,this.glossary=t.glossary}async loadChapter(t){try{let e=await this.api.handbookChapter(t,this.lang);this.body=e.body,this.loadedId=t,this.updateComplete.then(()=>this.renderRoot.querySelector("article")?.scrollIntoView({block:"start"}))}catch{this.body="",this.loadedId=""}}open(t){this.showGlossary=!1,this.query="",this.results=[],this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:t},bubbles:!0,composed:!0}))}onSearch(t){if(this.query=t,window.clearTimeout(this.searchTimer),!t.trim()){this.results=[];return}this.searchTimer=window.setTimeout(async()=>{this.results=(await this.api.handbookSearch(t,this.lang)).results},200)}renderToc(){return l`<nav class="toc card" aria-label=${this.t("handbook.contents")}>
      <input class="search" type="search" placeholder=${this.t("handbook.search")} .value=${this.query}
        @input=${t=>this.onSearch(t.target.value)} aria-label=${this.t("handbook.search")} />
      <a aria-current=${!this.chapterId&&!this.showGlossary?"page":"false"} @click=${()=>this.open("")}>
        <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("handbook.overview")}</a>
      ${this.chapters.map(t=>l`<a aria-current=${t.id===this.chapterId&&!this.showGlossary?"page":"false"} @click=${()=>this.open(t.id)}>
        <span class="num">${t.order}</span>${t.title}</a>`)}
      <a aria-current=${this.showGlossary?"page":"false"} @click=${()=>this.showGlossary=!0}>
        <ha-icon icon="mdi:alphabetical-variant"></ha-icon>${this.t("handbook.glossary")}</a>
    </nav>`}renderBody(){if(this.query.trim())return l`<article class="card"><h1>${this.t("handbook.results",{query:this.query})}</h1>
        ${this.results.length?this.results.map(n=>l`<div class="hit" @click=${()=>this.open(n.id)}><b>${n.title}</b><p class="small muted">…${n.snippet}…</p></div>`):l`<p class="muted">${this.t("handbook.no_results")}</p>`}</article>`;if(this.showGlossary){let n=Object.entries(this.glossary).sort((r,o)=>r[1].term.localeCompare(o[1].term,this.lang));return l`<article class="card"><h1>${this.t("handbook.glossary")}</h1>
        <dl class="gloss">${n.map(([,r])=>l`<dt>${r.term}</dt><dd>${r.text}
          ${r.chapter?l` <a href="#" @click=${o=>{o.preventDefault(),this.open(r.chapter)}}>→ ${this.chapters.find(o=>o.id===r.chapter)?.title??r.chapter}</a>`:m}</dd>`)}</dl>
      </article>`}if(!this.chapterId)return l`<article style="max-width:none">
        <h1>${this.t("handbook.title")}</h1>
        <p class="muted">${this.t("handbook.intro")}</p>
        <div class="grid">${this.chapters.map(n=>l`<button class="card tile" @click=${()=>this.open(n.id)}>
          <h3><ha-icon icon=${Bs[n.id]??"mdi:book-outline"}></ha-icon>${n.title}</h3><p class="small muted">${Y(n.summary)}</p></button>`)}</div>
      </article>`;let t=this.chapters.find(n=>n.id===this.chapterId),e=this.chapters.findIndex(n=>n.id===this.chapterId),s=e>0?this.chapters[e-1]:void 0,i=e>=0&&e<this.chapters.length-1?this.chapters[e+1]:void 0;return l`<article class="card">
      <h1>${t?.title??""}</h1>
      <div class="sections">${Ze(this.body).filter(n=>n.level===2).map(n=>l`<a class="chip" href=${`#${n.id}`}
        @click=${r=>{r.preventDefault(),this.renderRoot.querySelector(`#${CSS.escape(Rt(n.text))}`)?.scrollIntoView({behavior:"smooth"})}}>${n.text}</a>`)}</div>
      ${this.loadedId===this.chapterId?qe(this.body):l`<p class="muted">${this.t("common.loading")}</p>`}
      <div class="row" style="margin-top:var(--hl-s5)">
        ${s?l`<button class="btn small ghost" @click=${()=>this.open(s.id)}>← ${s.title}</button>`:m}
        <span class="spacer"></span>
        ${i?l`<button class="btn small" @click=${()=>this.open(i.id)}>${i.title} →</button>`:m}
      </div>
    </article>`}render(){let t=this.narrow&&(this.chapterId||this.showGlossary)?l`<details class="toc-wrap card"><summary><ha-icon icon="mdi:format-list-bulleted"></ha-icon>${this.t("handbook.contents")}</summary>${this.renderToc()}</details>`:this.renderToc();return l`<div class="layout ${this.narrow?"narrow":""}">${t}${this.renderBody()}</div>`}};D.styles=[I,P`
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
    `],p([f({attribute:!1})],D.prototype,"api",2),p([f({attribute:!1})],D.prototype,"t",2),p([f()],D.prototype,"lang",2),p([f()],D.prototype,"chapterId",2),p([f({type:Boolean})],D.prototype,"narrow",2),p([b()],D.prototype,"chapters",2),p([b()],D.prototype,"glossary",2),p([b()],D.prototype,"body",2),p([b()],D.prototype,"loadedId",2),p([b()],D.prototype,"query",2),p([b()],D.prototype,"results",2),p([b()],D.prototype,"showGlossary",2),D=p([R("hl-handbook-view")],D);var Ye={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Xe=d=>(...a)=>({_$litDirective$:d,values:a}),Wt=class{constructor(a){}get _$AU(){return this._$AM._$AU}_$AT(a,t,e){this._$Ct=a,this._$AM=t,this._$Ci=e}_$AS(a,t){return this.update(a,t)}update(a,t){return this.render(...t)}};var zt=class extends Wt{constructor(a){if(super(a),this.it=m,a.type!==Ye.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(a){if(a===m||a==null)return this._t=void 0,this.it=a;if(a===q)return a;if(typeof a!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(a===this.it)return this._t;this.it=a;let t=[a];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};zt.directiveName="unsafeHTML",zt.resultType=1;var Je=Xe(zt);var Ds=[{id:"garden",icon:"mdi:floor-plan"},{id:"zone",icon:"mdi:greenhouse"},{id:"beds",icon:"mdi:sprout-outline"},{id:"tasks",icon:"mdi:format-list-checks"},{id:"season",icon:"mdi:chart-gantt"},{id:"blank",icon:"mdi:draw"},{id:"plants",icon:"mdi:card-text-outline"}],Ns=["remarkable","a4","a3","a5","letter"],Qe="hortulus.print",O=class extends M{constructor(){super(...arguments);this.lang="en";this.narrow=!1;this.admin=!0;this.opts={document:"garden",page:"remarkable",landscape:!1,color_mode:"eink",days:28,notes:!0,grid:!0,labels:!0};this.pages=[];this.busy=!1;this.error=""}connectedCallback(){super.connectedCallback();try{let t=JSON.parse(localStorage.getItem(Qe)??"null");t&&(this.opts={...this.opts,...t})}catch{}}willUpdate(t){t.has("api")&&this.api&&!this.pages.length&&this.schedule(0)}set(t,e){this.opts={...this.opts,[t]:e},t==="page"&&e==="remarkable"&&this.opts.color_mode==="color"&&(this.opts={...this.opts,color_mode:"eink"});try{localStorage.setItem(Qe,JSON.stringify({...this.opts,bed_ids:null,zone_id:null,title:null}))}catch{}this.schedule()}schedule(t=350){window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>this.preview(),t)}async preview(){this.busy=!0,this.error="";try{this.pages=(await this.api.printPreview(this.payload())).pages}catch(t){this.error=t.message??String(t)}finally{this.busy=!1}}payload(){let t={...this.opts};return t.document!=="zone"&&delete t.zone_id,t.document!=="beds"&&delete t.bed_ids,t.title||delete t.title,t}async download(){this.busy=!0;try{let{blob:t,filename:e}=await this.api.printPdf(this.payload()),s=URL.createObjectURL(t),i=document.createElement("a");i.href=s,i.download=e,i.click(),setTimeout(()=>URL.revokeObjectURL(s),2e3)}catch(t){this.toast(this.t("common.error",{message:t.message}))}finally{this.busy=!1}}async saveToConfig(){try{await this.api.exportPdfToConfig(this.payload()),this.toast(this.t("print.saved_to_config"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}toast(t){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t},bubbles:!0,composed:!0}))}renderForm(){let t=this.opts,e=this.snapshot.analysis?.season??new Date().getFullYear(),s=this.snapshot.zones;return l`<section class="card stack" aria-label=${this.t("print.options")}>
      <h2>${this.t("print.document")}</h2>
      <div class="docs" role="group">
        ${Ds.map(i=>l`<button class="doc" aria-pressed=${String(t.document===i.id)} @click=${()=>this.set("document",i.id)}>
          <ha-icon icon=${i.icon}></ha-icon><b>${this.t(`print.doc.${i.id}`)}</b><small>${this.t(`print.doc.${i.id}.hint`)}</small></button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("print.page")}
          <select @change=${i=>this.set("page",i.target.value)}>
            ${Ns.map(i=>l`<option value=${i} ?selected=${t.page===i}>${this.t(`print.page.${i}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("print.orientation")}
          <select @change=${i=>this.set("landscape",i.target.value==="landscape")}>
            <option value="portrait" ?selected=${!t.landscape}>${this.t("print.portrait")}</option>
            <option value="landscape" ?selected=${t.landscape}>${this.t("print.landscape")}</option>
          </select></label>
        <label class="field">${this.t("print.colors")}
          <select @change=${i=>this.set("color_mode",i.target.value)}>
            ${["color","eink","grayscale"].map(i=>l`<option value=${i} ?selected=${t.color_mode===i}>${this.t(`print.color.${i}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("planner.season")}
          <select @change=${i=>this.set("season",Number(i.target.value))}>
            ${[e-1,e,e+1].map(i=>l`<option value=${i} ?selected=${(t.season??e)===i}>${i}</option>`)}
          </select></label>
        ${t.document==="zone"||t.document==="blank"?l`<label class="field full">${this.t("planner.zone")}
          <select @change=${i=>this.set("zone_id",i.target.value||null)}>
            <option value="">${this.t(t.document==="zone"?"print.all_greenhouses":"print.all_zones")}</option>
            ${s.map(i=>l`<option value=${i.id} ?selected=${t.zone_id===i.id}>${i.name}</option>`)}
          </select></label>`:m}
        ${t.document==="beds"?l`<fieldset class="full" style="border:0;padding:0;margin:0">
          <legend class="small muted">${this.t("print.beds")}</legend>
          <div class="row wrap">${this.snapshot.beds.map(i=>{let n=!t.bed_ids||t.bed_ids.includes(i.id);return l`<button class="chip" aria-pressed=${String(n)} @click=${()=>{let r=this.snapshot.beds.map(c=>c.id),o=t.bed_ids??r,h=n?o.filter(c=>c!==i.id):[...o,i.id];this.set("bed_ids",h.length===r.length?null:h)}}>${i.name}</button>`})}</div></fieldset>`:m}
        ${t.document==="tasks"?l`<label class="field">${this.t("print.days")}<input type="number" min="1" max="120" .value=${String(t.days)}
          @change=${i=>this.set("days",Number(i.target.value))} /></label>`:m}
        <label class="field full">${this.t("print.title")}<input .value=${t.title??""} placeholder=${this.t(`print.doc.${t.document}`)}
          @change=${i=>this.set("title",i.target.value||null)} /></label>
        <label class="field check"><input type="checkbox" .checked=${t.notes} @change=${i=>this.set("notes",i.target.checked)} />${this.t("print.notes")}</label>
        <label class="field check"><input type="checkbox" .checked=${t.grid} @change=${i=>this.set("grid",i.target.checked)} />${this.t("print.grid")}</label>
        <label class="field check full"><input type="checkbox" .checked=${t.labels} @change=${i=>this.set("labels",i.target.checked)} />${this.t("print.labels")}</label>
      </div>
      ${t.page==="remarkable"?l`<div class="rm"><ha-icon icon="mdi:tablet"></ha-icon><span>${this.t("print.remarkable_hint")}</span></div>`:m}
      <div class="row wrap">
        <button class="btn primary" ?disabled=${this.busy} @click=${()=>this.download()}><ha-icon icon="mdi:file-pdf-box"></ha-icon>${this.t("print.download")}</button>
        <button class="btn" ?disabled=${this.busy} @click=${()=>this.preview()}><ha-icon icon="mdi:refresh"></ha-icon>${this.t("print.refresh")}</button>
        ${this.admin?l`<button class="btn ghost" @click=${()=>this.saveToConfig()}><ha-icon icon="mdi:folder-download-outline"></ha-icon>${this.t("print.save_config")}</button>`:m}
      </div>
    </section>`}render(){return l`<div class="layout ${this.narrow?"narrow":""}">
      ${this.renderForm()}
      <section class="preview" aria-label=${this.t("print.preview")} aria-busy=${String(this.busy)}>
        ${this.error?l`<p class="small" style="color:var(--hl-danger)">${this.error}</p>`:m}
        ${this.pages.length?this.pages.map((t,e)=>l`<figure class="sheet" style="margin:0">${Je(t)}
            <figcaption class="num">${this.t("print.page_n",{n:e+1,total:this.pages.length})}</figcaption></figure>`):l`<p class="muted">${this.busy?this.t("common.loading"):this.t("print.empty")}</p>`}
      </section>
    </div>`}};O.styles=[I,P`
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
    `],p([f({attribute:!1})],O.prototype,"snapshot",2),p([f({attribute:!1})],O.prototype,"api",2),p([f({attribute:!1})],O.prototype,"t",2),p([f()],O.prototype,"lang",2),p([f({type:Boolean})],O.prototype,"narrow",2),p([f({type:Boolean})],O.prototype,"admin",2),p([b()],O.prototype,"opts",2),p([b()],O.prototype,"pages",2),p([b()],O.prototype,"busy",2),p([b()],O.prototype,"error",2),O=p([R("hl-print-view")],O);var Ve=[{id:"dashboard",icon:"mdi:home-variant-outline",mobile:!0},{id:"planner",icon:"mdi:floor-plan",mobile:!0},{id:"library",icon:"mdi:sprout-outline",mobile:!0},{id:"calendar",icon:"mdi:calendar-month-outline",mobile:!0},{id:"handbook",icon:"mdi:book-open-page-variant-outline",mobile:!0},{id:"print",icon:"mdi:printer-outline",mobile:!1},{id:"settings",icon:"mdi:cog-outline",mobile:!0}],H=class extends M{constructor(){super(...arguments);this.narrow=!1;this.snapshot=null;this.plants=[];this.families={};this.tab="dashboard";this.toastMsg="";this.openTask=null;this.creatingTask=!1;this.error="";this.chapter="";this.t=Nt("en");this.uiLang="en"}willUpdate(t){if(t.has("hass")&&this.hass){let e=kt(this.snapshot?.lang??this.hass.locale?.language??this.hass.language);e!==this.uiLang&&(this.uiLang=e,this.t=Nt(e)),this.toggleAttribute("dark",!!this.hass.themes?.darkMode),this.api?this.api.setHass(this.hass):(this.api=new xt(this.hass),this.connect())}if(t.has("route")&&this.route){let[e,s]=this.route.path.replace(/^\//,"").split("/");this.tab=Ve.some(i=>i.id===e)?e:"dashboard",this.tab==="handbook"&&(this.chapter=s??"")}}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.unsubscribe=void 0,this.api=void 0}connectedCallback(){super.connectedCallback(),this.hass&&!this.api&&(this.api=new xt(this.hass),this.connect())}async connect(){try{await this.loadPlants(),this.loadGlossary(),this.unsubscribe=await this.api.subscribe(t=>{this.snapshot=t;let e=kt(t.lang);e!==this.uiLang&&(this.uiLang=e,this.t=Nt(e),this.loadGlossary()),this.openTask&&(this.openTask=t.tasks.find(s=>s.id===this.openTask.id)??null)})}catch(t){this.error=t.code==="not_loaded"?this.t("common.not_loaded"):String(t.message??t)}}async loadGlossary(){try{He((await this.api.handbookIndex(this.uiLang)).glossary)}catch{}}openHandbook(t=""){this.chapter=t;let e=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/handbook${t?`/${t}`:""}`;history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab="handbook"}async loadPlants(){let t=await this.api.plants();this.plants=t.plants,this.families=t.families}navigate(t,e){e?.preventDefault();let s=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/${t==="dashboard"?"":t}`.replace(/\/$/,"");history.pushState(null,"",s),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab=t}toast(t){this.toastMsg=t,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastMsg="",4500)}async completeTask(t){try{await this.api.taskAction(t.id,"complete"),this.toast(this.t("task.completed",{title:t.title}))}catch(e){this.toast(this.t("common.error",{message:e.message}))}}async irrigation(t){try{if(t==="stop"){await this.api.irrigationStop(),this.toast(this.t("dash.irrigation_stopped"));return}let e=await this.api.irrigationRun(),s=Object.values(e.reasons??{});this.toast(e.started?this.t("dash.irrigation_started",{min:Math.round(e.total_minutes)}):s[0]??this.t("dash.irrigation_nothing"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}}async postponeTask(t,e){try{await this.api.taskAction(t.id,"postpone",{days:e}),this.toast(this.t("task.postponed",{title:t.title,n:e}))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderTab(){let t=this.snapshot,e=this.hass.user?.is_admin??!0,s=new Map(this.plants.map(i=>[i.id,i]));switch(this.tab){case"planner":return l`<hl-planner-view .snapshot=${t} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${e} .narrow=${this.narrow}></hl-planner-view>`;case"library":return l`<hl-library-view .snapshot=${t} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${e} @plants-changed=${()=>this.loadPlants()}></hl-library-view>`;case"calendar":return l`<hl-calendar-view .snapshot=${t} .t=${this.t} .lang=${this.uiLang} .plants=${s} .families=${this.families}></hl-calendar-view>`;case"handbook":return l`<hl-handbook-view .api=${this.api} .t=${this.t} .lang=${this.uiLang} .chapterId=${this.chapter} .narrow=${this.narrow}></hl-handbook-view>`;case"print":return l`<hl-print-view .snapshot=${t} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .narrow=${this.narrow} .admin=${e}></hl-print-view>`;case"settings":return l`<hl-settings-view .snapshot=${t} .hass=${this.hass} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .admin=${e}></hl-settings-view>`;default:return l`<hl-dashboard-view .snapshot=${t} .plants=${s} .families=${this.families} .t=${this.t} .lang=${this.uiLang} .admin=${e}></hl-dashboard-view>`}}renderNav(t){return l`<nav class=${t} aria-label="Hortulus">
      ${Ve.filter(e=>t!=="bottom-nav"||e.mobile).map(e=>l`<a href="#" aria-current=${e.id===this.tab?"page":"false"} @click=${s=>this.navigate(e.id,s)}>
        <ha-icon icon=${e.icon}></ha-icon>${this.t(`nav.${e.id}`)}</a>`)}
    </nav>`}render(){return l`
      <header class="appbar">
        ${this.narrow?l`<button class="icon-btn" aria-label="Menu" @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}>
          <ha-icon icon="mdi:menu"></ha-icon></button>`:m}
        <div class="brand">${ae(30)}<span>Hortulus</span>${this.narrow?m:l`<small>${this.t("app.tagline")}</small>`}</div>
        ${this.renderNav("top")}
      </header>
      <main @open-task=${t=>this.openTask=t.detail}
        @complete-task=${t=>this.completeTask(t.detail)}
        @postpone-task=${t=>this.postponeTask(t.detail.task,t.detail.days)}
        @irrigation=${t=>this.irrigation(t.detail)}
        @new-task=${()=>this.creatingTask=!0}
        @navigate=${t=>this.navigate(t.detail)}
        @open-handbook=${t=>this.openHandbook(t.detail?.chapter??"")}
        @hl-toast=${t=>this.toast(t.detail.message)}>
        ${this.error?l`<div class="card error">${ae(56)}<p>${this.error}</p></div>`:this.snapshot?this.renderTab():l`<p class="empty">${this.t("common.loading")}</p>`}
      </main>
      ${this.renderNav("bottom-nav")}
      ${this.snapshot&&(this.openTask||this.creatingTask)?l`<hl-task-dialog .task=${this.openTask} .create=${this.creatingTask} .snapshot=${this.snapshot}
        @open-handbook=${t=>this.openHandbook(t.detail?.chapter??"")}
        .beds=${this.snapshot.beds} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .today=${this.snapshot.analysis?.today??""}
        @hl-toast=${t=>this.toast(t.detail.message)}
        @closed=${()=>{this.openTask=null,this.creatingTask=!1}}></hl-task-dialog>`:m}
      ${this.toastMsg?l`<div class="toast" role="status" aria-live="polite">${this.toastMsg}</div>`:m}
    `}};H.styles=[Ae,I,P`
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
      :host([narrow]) .bottom-nav a { flex-direction: column; height: auto; padding: 4px 6px; font-size: 11px; gap: 2px; margin: 0; }
      :host([narrow]) main { padding: var(--hl-s3) var(--hl-s3) 88px; }
      .toast { position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); z-index: 20; background: var(--hl-soil-900); color: #fff;
        padding: 10px 18px; border-radius: var(--hl-r-pill); box-shadow: var(--hl-shadow-3); font-size: var(--hl-fs-sm); max-width: calc(100vw - 32px); }
      :host([narrow]) .toast { bottom: 84px; }
      .error { margin: var(--hl-s6) auto; max-width: 560px; text-align: center; }
    `],p([f({attribute:!1})],H.prototype,"hass",2),p([f({type:Boolean,reflect:!0})],H.prototype,"narrow",2),p([f({attribute:!1})],H.prototype,"route",2),p([f({attribute:!1})],H.prototype,"panel",2),p([b()],H.prototype,"snapshot",2),p([b()],H.prototype,"plants",2),p([b()],H.prototype,"families",2),p([b()],H.prototype,"tab",2),p([b()],H.prototype,"toastMsg",2),p([b()],H.prototype,"openTask",2),p([b()],H.prototype,"creatingTask",2),p([b()],H.prototype,"error",2),p([b()],H.prototype,"chapter",2),H=p([R("hortulus-panel")],H);export{H as HortulusPanel};
