var Qs=Object.defineProperty;var Js=Object.getOwnPropertyDescriptor;var u=(c,r,e,t)=>{for(var s=t>1?void 0:t?Js(r,e):r,n=c.length-1,i;n>=0;n--)(i=c[n])&&(s=(t?i(r,e,s):i(s))||s);return t&&s&&Qs(r,e,s),s};var Qe=globalThis,Je=Qe.ShadowRoot&&(Qe.ShadyCSS===void 0||Qe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$t=Symbol(),ss=new WeakMap,Re=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==$t)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(Je&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=ss.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&ss.set(e,r))}return r}toString(){return this.cssText}},is=c=>new Re(typeof c=="string"?c:c+"",void 0,$t),T=(c,...r)=>{let e=c.length===1?c[0]:r.reduce((t,s,n)=>t+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+c[n+1],c[0]);return new Re(e,c,$t)},ns=(c,r)=>{if(Je)c.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),s=Qe.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,c.appendChild(t)}},_t=Je?c=>c:c=>c instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return is(e)})(c):c;var{is:Vs,defineProperty:ei,getOwnPropertyDescriptor:ti,getOwnPropertyNames:si,getOwnPropertySymbols:ii,getPrototypeOf:ni}=Object,Ve=globalThis,as=Ve.trustedTypes,ai=as?as.emptyScript:"",ri=Ve.reactiveElementPolyfillSupport,Ce=(c,r)=>c,Ae={toAttribute(c,r){switch(r){case Boolean:c=c?ai:null;break;case Object:case Array:c=c==null?c:JSON.stringify(c)}return c},fromAttribute(c,r){let e=c;switch(r){case Boolean:e=c!==null;break;case Number:e=c===null?null:Number(c);break;case Object:case Array:try{e=JSON.parse(c)}catch{e=null}}return e}},et=(c,r)=>!Vs(c,r),rs={attribute:!0,type:String,converter:Ae,reflect:!1,useDefault:!1,hasChanged:et};Symbol.metadata??=Symbol("metadata"),Ve.litPropertyMetadata??=new WeakMap;var ie=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=rs){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(r,t,e);s!==void 0&&ei(this.prototype,r,s)}}static getPropertyDescriptor(r,e,t){let{get:s,set:n}=ti(this.prototype,r)??{get(){return this[e]},set(i){this[e]=i}};return{get:s,set(i){let a=s?.call(this);n?.call(this,i),this.requestUpdate(r,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??rs}static _$Ei(){if(this.hasOwnProperty(Ce("elementProperties")))return;let r=ni(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(Ce("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ce("properties"))){let e=this.properties,t=[...si(e),...ii(e)];for(let s of t)this.createProperty(s,e[s])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let s of t)e.unshift(_t(s))}else r!==void 0&&e.push(_t(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ns(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),s=this.constructor._$Eu(r,t);if(s!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:Ae).toAttribute(e,t.type);this._$Em=r,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(r,e){let t=this.constructor,s=t._$Eh.get(r);if(s!==void 0&&this._$Em!==s){let n=t.getPropertyOptions(s),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Ae;this._$Em=s;let a=i.fromAttribute(e,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(r,e,t,s=!1,n){if(r!==void 0){let i=this.constructor;if(s===!1&&(n=this[r]),t??=i.getPropertyOptions(r),!((t.hasChanged??et)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(r)&&!this.hasAttribute(i._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:s,wrapped:n},i){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,i??e??this[r]),n!==!0||i!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),s===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,n]of t){let{wrapped:i}=n,a=this[s];i!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};ie.elementStyles=[],ie.shadowRootOptions={mode:"open"},ie[Ce("elementProperties")]=new Map,ie[Ce("finalized")]=new Map,ri?.({ReactiveElement:ie}),(Ve.reactiveElementVersions??=[]).push("2.1.2");var Tt=globalThis,os=c=>c,tt=Tt.trustedTypes,ls=tt?tt.createPolicy("lit-html",{createHTML:c=>c}):void 0,ms="$lit$",oe=`lit$${Math.random().toFixed(9).slice(2)}$`,gs="?"+oe,oi=`<${gs}>`,ue=document,He=()=>ue.createComment(""),Ie=c=>c===null||typeof c!="object"&&typeof c!="function",zt=Array.isArray,li=c=>zt(c)||typeof c?.[Symbol.iterator]=="function",wt=`[ 	
\f\r]`,Le=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ds=/-->/g,cs=/>/g,he=RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),hs=/'/g,ps=/"/g,fs=/^(?:script|style|textarea|title)$/i,jt=c=>(r,...e)=>({_$litType$:c,strings:r,values:e}),l=jt(1),S=jt(2),Xi=jt(3),ne=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),us=new WeakMap,pe=ue.createTreeWalker(ue,129);function vs(c,r){if(!zt(c)||!c.hasOwnProperty("raw"))throw Error("invalid template strings array");return ls!==void 0?ls.createHTML(r):r}var di=(c,r)=>{let e=c.length-1,t=[],s,n=r===2?"<svg>":r===3?"<math>":"",i=Le;for(let a=0;a<e;a++){let o=c[a],d,h,m=-1,v=0;for(;v<o.length&&(i.lastIndex=v,h=i.exec(o),h!==null);)v=i.lastIndex,i===Le?h[1]==="!--"?i=ds:h[1]!==void 0?i=cs:h[2]!==void 0?(fs.test(h[2])&&(s=RegExp("</"+h[2],"g")),i=he):h[3]!==void 0&&(i=he):i===he?h[0]===">"?(i=s??Le,m=-1):h[1]===void 0?m=-2:(m=i.lastIndex-h[2].length,d=h[1],i=h[3]===void 0?he:h[3]==='"'?ps:hs):i===ps||i===hs?i=he:i===ds||i===cs?i=Le:(i=he,s=void 0);let b=i===he&&c[a+1].startsWith("/>")?" ":"";n+=i===Le?o+oi:m>=0?(t.push(d),o.slice(0,m)+ms+o.slice(m)+oe+b):o+oe+(m===-2?a:b)}return[vs(c,n+(c[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},Oe=class c{constructor({strings:r,_$litType$:e},t){let s;this.parts=[];let n=0,i=0,a=r.length-1,o=this.parts,[d,h]=di(r,e);if(this.el=c.createElement(d,t),pe.currentNode=this.el.content,e===2||e===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=pe.nextNode())!==null&&o.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(ms)){let v=h[i++],b=s.getAttribute(m).split(oe),_=/([.?@])?(.*)/.exec(v);o.push({type:1,index:n,name:_[2],strings:b,ctor:_[1]==="."?xt:_[1]==="?"?St:_[1]==="@"?Mt:we}),s.removeAttribute(m)}else m.startsWith(oe)&&(o.push({type:6,index:n}),s.removeAttribute(m));if(fs.test(s.tagName)){let m=s.textContent.split(oe),v=m.length-1;if(v>0){s.textContent=tt?tt.emptyScript:"";for(let b=0;b<v;b++)s.append(m[b],He()),pe.nextNode(),o.push({type:2,index:++n});s.append(m[v],He())}}}else if(s.nodeType===8)if(s.data===gs)o.push({type:2,index:n});else{let m=-1;for(;(m=s.data.indexOf(oe,m+1))!==-1;)o.push({type:7,index:n}),m+=oe.length-1}n++}}static createElement(r,e){let t=ue.createElement("template");return t.innerHTML=r,t}};function _e(c,r,e=c,t){if(r===ne)return r;let s=t!==void 0?e._$Co?.[t]:e._$Cl,n=Ie(r)?void 0:r._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(c),s._$AT(c,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(r=_e(c,s._$AS(c,r.values),s,t)),r}var kt=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,s=(r?.creationScope??ue).importNode(e,!0);pe.currentNode=s;let n=pe.nextNode(),i=0,a=0,o=t[0];for(;o!==void 0;){if(i===o.index){let d;o.type===2?d=new Be(n,n.nextSibling,this,r):o.type===1?d=new o.ctor(n,o.name,o.strings,this,r):o.type===6&&(d=new Et(n,this,r)),this._$AV.push(d),o=t[++a]}i!==o?.index&&(n=pe.nextNode(),i++)}return pe.currentNode=ue,s}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},Be=class c{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=_e(this,r,e),Ie(r)?r===p||r==null||r===""?(this._$AH!==p&&this._$AR(),this._$AH=p):r!==this._$AH&&r!==ne&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):li(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==p&&Ie(this._$AH)?this._$AA.nextSibling.data=r:this.T(ue.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,s=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=Oe.createElement(vs(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new kt(s,this),i=n.u(this.options);n.p(e),this.T(i),this._$AH=n}}_$AC(r){let e=us.get(r.strings);return e===void 0&&us.set(r.strings,e=new Oe(r)),e}k(r){zt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let n of r)s===e.length?e.push(t=new c(this.O(He()),this.O(He()),this,this.options)):t=e[s],t._$AI(n),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=os(r).nextSibling;os(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},we=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,s,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=r,this.name=e,this._$AM=s,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=p}_$AI(r,e=this,t,s){let n=this.strings,i=!1;if(n===void 0)r=_e(this,r,e,0),i=!Ie(r)||r!==this._$AH&&r!==ne,i&&(this._$AH=r);else{let a=r,o,d;for(r=n[0],o=0;o<n.length-1;o++)d=_e(this,a[t+o],e,o),d===ne&&(d=this._$AH[o]),i||=!Ie(d)||d!==this._$AH[o],d===p?r=p:r!==p&&(r+=(d??"")+n[o+1]),this._$AH[o]=d}i&&!s&&this.j(r)}j(r){r===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},xt=class extends we{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===p?void 0:r}},St=class extends we{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==p)}},Mt=class extends we{constructor(r,e,t,s,n){super(r,e,t,s,n),this.type=5}_$AI(r,e=this){if((r=_e(this,r,e,0)??p)===ne)return;let t=this._$AH,s=r===p&&t!==p||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,n=r!==p&&(t===p||s);s&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Et=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){_e(this,r)}};var ci=Tt.litHtmlPolyfillSupport;ci?.(Oe,Be),(Tt.litHtmlVersions??=[]).push("3.3.3");var bs=(c,r,e)=>{let t=e?.renderBefore??r,s=t._$litPart$;if(s===void 0){let n=e?.renderBefore??null;t._$litPart$=s=new Be(r.insertBefore(He(),n),n,void 0,e??{})}return s._$AI(c),s};var Pt=globalThis,E=class extends ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=bs(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ne}};E._$litElement$=!0,E.finalized=!0,Pt.litElementHydrateSupport?.({LitElement:E});var hi=Pt.litElementPolyfillSupport;hi?.({LitElement:E});(Pt.litElementVersions??=[]).push("4.2.2");var P=c=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(c,r)}):customElements.define(c,r)};var pi={attribute:!0,type:String,converter:Ae,reflect:!1,hasChanged:et},ui=(c=pi,r,e)=>{let{kind:t,metadata:s}=e,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),t==="setter"&&((c=Object.create(c)).wrapped=!0),n.set(e.name,c),t==="accessor"){let{name:i}=e;return{set(a){let o=r.get.call(this);r.set.call(this,a),this.requestUpdate(i,o,c,!0,a)},init(a){return a!==void 0&&this.C(i,void 0,c,a),a}}}if(t==="setter"){let{name:i}=e;return function(a){let o=this[i];r.call(this,a),this.requestUpdate(i,o,c,!0,a)}}throw Error("Unsupported decorator location: "+t)};function g(c){return(r,e)=>typeof e=="object"?ui(c,r,e):((t,s,n)=>{let i=s.hasOwnProperty(n);return s.constructor.createProperty(n,t),i?Object.getOwnPropertyDescriptor(s,n):void 0})(c,r,e)}function f(c){return g({...c,state:!0,attribute:!1})}var me=(c,r,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(c,r,e),e);function st(c,r){return(e,t,s)=>{let n=i=>i.renderRoot?.querySelector(c)??null;if(r){let{get:i,set:a}=typeof t=="object"?e:s??(()=>{let o=Symbol();return{get(){return this[o]},set(d){this[o]=d}}})();return me(e,t,{get(){let o=i.call(this);return o===void 0&&(o=n(this),(o!==null||this.hasUpdated)&&a.call(this,o)),o}})}return me(e,t,{get(){return n(this)}})}}var it="garden_manager",Ne=class{constructor(r){this.hass=r}setHass(r){this.hass=r}call(r,e={}){return this.hass.connection.sendMessagePromise({type:`${it}/${r}`,...e})}subscribe(r){return this.hass.connection.subscribeMessage(r,{type:`${it}/subscribe`})}plants(){return this.call("plants")}savePlant(r,e){return this.call("plants/save",{plant:r,mode:e})}deletePlant(r){return this.call("plants/delete",{plant_id:r})}plantWindows(r,e,t){return this.call("plants/windows",{plant_id:r,zone_id:e??null,season:t??null})}savePlan(r,e){return this.call("plan/save",{...r,base_revision:e})}syslog(r={}){return this.call("syslog/list",r)}undo(r,e=!1){return this.call("syslog/undo",{entry_id:r,force:e})}checkBed(r,e){return this.call("plan/check",{bed:r,plantings:e})}succession(r,e,t,s){return this.call("plan/succession",{planting:r,count:e,interval_days:t,placement:s})}exportPlan(r,e=!1){return this.call("plan/export",{format:r,include_tasks:e})}importPlan(r,e){return this.call("plan/import",{content:r,mode:e})}addTask(r){return this.call("tasks/add",r)}taskAction(r,e,t={}){return this.call("tasks/action",{task_id:r,action:e,...t})}saveSettings(r){return this.call("settings/save",{settings:r})}autofill(r){return this.call("plan/autofill",r)}autofillApply(r,e,t){return this.call("plan/autofill/apply",{plantings:r,replace_beds:e,base_revision:t})}printPreview(r){return this.call("print/render",{options:r})}async printPdf(r){let e=new URLSearchParams;for(let[i,a]of Object.entries(r))a==null||a===""||e.set(i,Array.isArray(a)?a.join(","):String(a));let t=await this.hass.fetchWithAuth(`/api/${it}/print?${e.toString()}`);if(!t.ok)throw new Error(`${t.status} ${await t.text()}`);let s=t.headers.get("Content-Disposition")??"",n=/filename="([^"]+)"/.exec(s)?.[1]??"hortulus.pdf";return{blob:await t.blob(),filename:n}}exportPdfToConfig(r){return this.hass.callService(it,"export_pdf",r)}handbookIndex(r){return this.call("handbook/index",r?{lang:r}:{})}handbookChapter(r,e){return this.call("handbook/chapter",{chapter_id:r,...e?{lang:e}:{}})}handbookSearch(r,e){return this.call("handbook/search",{query:r,...e?{lang:e}:{}})}irrigationPlan(){return this.call("irrigation/plan")}irrigationRun(r,e){return this.call("irrigation/run",{...r?{bed_ids:r}:{},...e?{amount_mm:e}:{}})}irrigationStop(){return this.call("irrigation/stop")}advice(){return this.call("advice")}qaOptions(){return this.call("qa/options")}qaAsk(r,e,t){return this.call("qa/ask",{subject:r,problem:e,target:t})}supplies(){return this.call("supplies")}records(){return this.call("records/overview")}logHarvest(r){return this.call("records/harvest/add",r)}deleteRecord(r,e){return this.call("records/delete",{kind:r,record_id:e})}saveJournal(r){return this.call("records/journal/save",{entry:r})}saveSeed(r){return this.call("records/seeds/save",{packet:r})}saveSoilTest(r,e){return this.call("records/soil/save",{bed_id:r,test:e})}deleteSoilTest(r,e){return this.call("records/soil/delete",{bed_id:r,date:e})}async uploadPhoto(r){let e=new FormData;e.append("file",r);let t=await this.hass.fetchWithAuth("/api/image/upload",{method:"POST",body:e});if(!t.ok)throw new Error(`Upload failed (${t.status})`);return(await t.json()).id}},ge=(c,r="256x256")=>c.startsWith("http")||c.startsWith("/")?c:`/api/image/serve/${c}/${r}`;var Rt=(c=32)=>S`
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
  </svg>`;var Ct={"app.name":"Hortulus","app.tagline":"Your vegetable garden, planned and cared for","nav.dashboard":"Today","nav.planner":"Planner","nav.library":"Plants","nav.calendar":"Calendar","nav.settings":"Settings","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.close":"Close","common.add":"Add","common.edit":"Edit","common.none":"None","common.loading":"Loading your garden\u2026","common.not_loaded":"Hortulus is not set up yet. Add the integration under Settings \u2192 Devices & services.","common.minutes":"{n} min","common.days":"{n} days","common.cm":"{n} cm","common.today":"Today","common.tomorrow":"Tomorrow","common.yesterday":"Yesterday","common.overdue":"Overdue","common.unknown":"Unknown","common.search":"Search","common.all":"All","common.season":"Season {year}","common.admin_only":"Only administrators can change the plan.","common.saved":"Saved","common.saving":"Saving\u2026","common.unsaved":"Unsaved changes","common.conflict":"Changed elsewhere - reloaded","common.error":"Something went wrong: {message}","dash.greeting_morning":"Good morning","dash.greeting_afternoon":"Good afternoon","dash.greeting_evening":"Good evening","dash.today_tasks":"Today's tasks","dash.no_tasks":"Nothing to do today. Enjoy the garden!","dash.show_all":"Show all {n} tasks in the calendar","dash.total_time":"About {minutes} min of work","dash.beds":"Beds","dash.weather":"Next 48 hours","dash.greenhouse":"Greenhouse","dash.coming_up":"Coming up","dash.gdd":"Growing degree days","dash.gdd_since":"since {date}","dash.frost_risk":"Frost risk","dash.min_temp":"Lowest {temp} \xB0C","dash.rain":"Rain {mm} mm","dash.inside":"Inside {temp} \xB0C","dash.limits":"Crops tolerate {min}\u2013{max} \xB0C","dash.no_sensor":"No sensor","dash.active_crops":"{n} crops in the ground","dash.forecast_missing":"No forecast - advice is less precise.","planner.season":"Season","planner.undo":"Undo","planner.redo":"Redo","planner.snap":"Snap to grid","planner.zoom_in":"Zoom in","planner.zoom_out":"Zoom out","planner.fit":"Fit to screen","planner.add_bed":"Add bed","planner.add_zone":"Add zone","planner.overlay_companions":"Companions","planner.overlay_moisture":"Moisture","planner.overlay_temperature":"Temperature","planner.view_date":"Show garden on","planner.palette":"Plants","planner.palette_hint":"Drag a plant onto a bed, or press Enter to add it to the selected bed.","planner.layout":"Layout","planner.layout.single":"Single","planner.layout.block":"Block","planner.layout.row":"Row","planner.inspector":"Details","planner.nothing_selected":"Select a bed or planting to see details. Press ? for keyboard shortcuts.","planner.method":"Method","planner.method.indoor_sow":"Sow indoors, plant out","planner.method.direct_sow":"Sow in place","planner.method.transplant":"Plant (bought plants / sets)","planner.status":"Status","planner.count":"{n} plants","planner.timeline":"Timeline","planner.succession":"Succession sowing","planner.succession_count":"Number of sowings","planner.succession_interval":"Every (days)","planner.succession_placement":"Placement","planner.succession.split":"Split the area in strips","planner.succession.stack":"Same spot, one after another","planner.succession_create":"Create sowings","planner.succession_dropped":"{n} sowings fell outside the sowing window and were skipped.","planner.duplicate":"Duplicate","planner.remove":"Remove","planner.bed_name":"Name","planner.zone":"Zone","planner.kind":"Type","planner.width":"Width (cm)","planner.length":"Length (cm)","planner.orientation":"Row direction (\xB0)","planner.soil":"Soil","planner.shade":"Shade (%)","planner.wind":"Wind","planner.score":"Companion score","planner.warnings":"Warnings","planner.no_warnings":"No conflicts - nice combination!","planner.out_of_bounds":"Partly outside the bed.","planner.placed":"{plant} placed in {bed}.","planner.moved":"{name} moved.","planner.removed":"{name} removed.","planner.no_bed_here":"Drop plants onto a bed.","planner.export_json":"Export JSON","planner.export_yaml":"Export YAML","planner.import":"Import plan","planner.import_mode":"Import mode","planner.import_merge":"Merge with current plan","planner.import_replace":"Replace current plan","planner.imported":"Imported: {beds} beds, {plantings} plantings.","planner.shortcuts":"Keyboard shortcuts","planner.legend":"Plant families","planner.new_bed":"New bed","planner.new_zone":"New zone","shortcut.move":"Move selection (Shift = 10\xD7)","shortcut.undo":"Undo","shortcut.redo":"Redo","shortcut.delete":"Remove selection","shortcut.duplicate":"Duplicate selection","shortcut.grid":"Toggle snap-to-grid","shortcut.companions":"Toggle companion overlay","shortcut.moisture":"Toggle moisture overlay","shortcut.zoom":"Zoom in / out","shortcut.escape":"Clear selection","shortcut.cycle":"Select next / previous item","shortcut.help":"Show this help","lib.title":"Plant library","lib.search":"Search by name, latin name or family","lib.family":"Family","lib.filter_greenhouse":"Greenhouse","lib.filter_quick":"Quick crops","lib.filter_custom":"My plants","lib.add_custom":"New plant","lib.customize":"Customize","lib.reset":"Reset to built-in","lib.spacing":"Spacing","lib.row_spacing":"Row spacing","lib.depth":"Sowing depth","lib.germination":"Germination","lib.maturity":"Days to maturity","lib.soil_temp":"Min. soil temperature","lib.frost":"Frost tolerance","lib.min_temp":"Minimum temperature","lib.greenhouse":"Greenhouse","lib.water":"Water","lib.nutrients":"Nutrients","lib.rotation":"Rotation","lib.rotation_years":"{n} years before the same family returns","lib.friends":"Good companions","lib.enemies":"Keep apart from","lib.pests":"Pests","lib.diseases":"Diseases","lib.care":"Care","lib.calendar":"Sowing calendar","lib.indoor_sow":"Sow indoors","lib.direct_sow":"Sow outdoors","lib.transplant":"Plant out","lib.harvest":"Harvest","lib.source.builtin":"Built-in","lib.source.custom":"Custom","lib.source.override":"Customized","lib.id":"Identifier","lib.name_en":"Name (English)","lib.name_nl":"Name (Dutch)","lib.scientific":"Scientific name","lib.variety":"Variety","lib.habit":"Growth habit","lib.windows_hint":"Weeks relative to the average last spring frost (negative = before).","lib.weeks":"weeks","lib.from":"from","lib.to":"to","lib.saved":"{plant} saved.","cal.month":"Month","cal.week":"Week","cal.list":"List","cal.prev":"Previous","cal.next":"Next","cal.show_done":"Show completed","cal.add_task":"New task","cal.all_beds":"All beds","task.complete":"Done","task.skip":"Skip","task.reopen":"Reopen","task.postpone":"Postpone","task.postpone_1":"+1 day","task.postpone_3":"+3 days","task.postpone_7":"+1 week","task.postpone_to":"Move to date","task.note":"Note","task.notes":"Notes","task.photos":"Photos","task.add_photo":"Add photo","task.priority":"Priority","task.duration":"Duration (min)","task.due":"Due","task.window":"Window {start} \u2013 {end}","task.repeat":"Repeats every {n} days","task.repeat_days":"Repeat every (days, optional)","task.title":"Title","task.type":"Type","task.bed":"Bed","task.description":"Description","task.shifted":"{n} dependent tasks moved along.","task.beyond_window":"Careful: the new date is after the ideal window.","task.completed":"Nice work! {title} done.","task.source.generated":"From your plan","task.source.sensor":"From sensors","task.source.weather":"From the forecast","task.source.user":"Added by you","settings.region":"Climate & region","settings.hemisphere":"Hemisphere","settings.hemisphere.north":"Northern","settings.hemisphere.south":"Southern","settings.mode":"Profile","settings.mode.preset":"Regional preset","settings.mode.usda":"USDA hardiness zone","settings.mode.custom":"Custom frost dates","settings.preset":"Region","settings.zone":"Hardiness zone","settings.last_frost":"Last spring frost (MM-DD)","settings.first_frost":"First autumn frost (MM-DD)","settings.frost_dates_now":"This season: last frost {last}, first frost {first}.","settings.weather":"Weather & outdoor sensors","settings.weather_entity":"Weather entity","settings.outdoor_temp":"Outdoor temperature","settings.rain":"Rain sensor","settings.zones":"Zones & microclimates","settings.beds":"Beds & sensors","settings.zone_type.outdoor":"Outdoor","settings.zone_type.greenhouse":"Greenhouse","settings.zone_type.cold_frame":"Cold frame","settings.heated":"Heated","settings.min_heating":"Heating keeps above (\xB0C)","settings.sensors":"Sensors","settings.sensor.soil_moisture":"Soil moisture","settings.sensor.soil_temperature":"Soil temperature","settings.sensor.air_temperature":"Air temperature","settings.sensor.air_humidity":"Air humidity","settings.sensor.light":"Light","settings.sensor.rain":"Rain","settings.irrigation":"Irrigation switch/valve","settings.flow":"Flow (L/min)","settings.vent":"Vent / window opener","settings.notifications":"Notifications","settings.persistent":"Persistent notifications","settings.notify_services":"Push notifications (comma separated notify services)","settings.tts":"Text-to-speech entity","settings.tts_players":"Speakers (comma separated)","settings.digest":"Daily digest at","settings.frost_alerts":"Frost alerts","settings.heat_alerts":"Heat alerts","settings.tts_frost":"Announce frost on speakers","settings.general":"General","settings.language":"Language","settings.language.auto":"Follow Home Assistant","settings.units":"Units","settings.units_metric":"Metric (cm, \xB0C, mm, L)","settings.snap":"Grid size (cm)","settings.radius":"Companion radius (cm)","settings.data":"Import & export","settings.saved":"Settings saved.","type.sow_indoor":"Sow indoors","type.sow_direct":"Sow outdoors","type.harden_off":"Harden off","type.transplant":"Plant out","type.thin":"Thin","type.stake":"Support","type.prune":"Prune","type.pinch":"Pinch","type.earth_up":"Earth up","type.feed":"Feed","type.water":"Water","type.weed":"Weed","type.pest_check":"Pest check","type.harvest":"Harvest","type.ventilate":"Ventilate","type.shade":"Shade","type.frost_protect":"Frost protection","type.custom":"Task","priority.low":"Low","priority.normal":"Normal","priority.high":"High","priority.urgent":"Urgent","status.planned":"Planned","status.sown_indoors":"Sown indoors","status.sown":"Sown","status.transplanted":"Planted out","status.harvesting":"Harvesting","status.finished":"Finished","status.failed":"Failed","risk.none":"none","risk.low":"low","risk.moderate":"moderate","risk.high":"high","risk.unknown":"unknown","moisture.dry":"Dry","moisture.slightly_dry":"Slightly dry","moisture.optimal":"Optimal","moisture.wet":"Wet","moisture.unknown":"No data","irrigation.none":"No water needed","irrigation.water":"Water {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Skip - rain expected","irrigation.check_manually":"Check by hand (~{mm} mm)","gh.none":"All good","gh.ventilate":"Ventilate","gh.shade":"Shade now","gh.close_up":"Close before night","gh.heat":"Turn on heating","level.low":"Low","level.medium":"Medium","level.high":"High","suit.yes":"Suitable","suit.no":"Not suitable","suit.conditional":"Possible","frost.tender":"Tender","frost.half_hardy":"Half hardy","frost.hardy":"Hardy","frost.very_hardy":"Very hardy","kind.in_ground":"In-ground bed","kind.raised":"Raised bed","kind.container":"Container","soil.sandy":"Sandy","soil.loam":"Loam","soil.clay":"Clay","soil.silt":"Silt","soil.peat":"Peat","soil.chalk":"Chalk","soil.potting_mix":"Potting mix","wind.sheltered":"Sheltered","wind.moderate":"Moderate","wind.exposed":"Exposed","habit.bush":"Bush","habit.vine":"Vine","habit.climbing":"Climbing","habit.upright":"Upright","habit.rosette":"Rosette","habit.root":"Root crop","habit.bulb":"Bulb","reason.soil_too_cold":"Soil is {soil} \xB0C; {plant} needs {min} \xB0C to germinate.","reason.soil_too_hot":"Soil is {soil} \xB0C; above {max} \xB0C {plant} germinates poorly.","reason.frost_forecast":"Frost ({temp} \xB0C) forecast before {date}; {plant} is frost tender.","reason.window_open":"Window is open.","reason.window_not_yet":"Window opens {date}.","reason.window_closed":"Window closed on {date}.","reason.not_greenhouse_suitable":"{plant} is not suited to a greenhouse.","compat.friend":"{a} and {b} are good companions: {reason}","compat.enemy":"{a} and {b} should not be planted together: {reason}","compat.overlap":"{a} and {b} overlap - not enough space.","compat.rotation":"{family} grew in {bed} in {season}; wait {years} years.","compat.same_family_adjacent":"{a} and {b} share a family and its pests.","alert.frost":"Frost risk {level}: {temp} \xB0C expected {when}","alert.heat":"Heat stress in {zone}: {temp} \xB0C expected","alert.dry":"{bed} is dry ({moisture}%)","alert.sensor_stale":"Sensor {entity} has not reported for a while","alert.forecast_unavailable":"Weather forecast unavailable","when.tonight":"tonight","when.tomorrow_night":"tomorrow night","nav.handbook":"Handbook","nav.print":"Print","type.soil_prep":"Prepare soil","type.compost":"Compost","type.green_manure":"Green manure","type.mulch":"Mulch","type.clean_greenhouse":"Clean greenhouse","type.winter_prep":"Winter preparation","type.plan_season":"Plan season","type.tool_care":"Tool care","type.soil_test":"Soil test","type.cut_back":"Cut back","type.divide":"Divide","type.protect":"Protect","type.clean":"Clean up","type.tie_in":"Tie in","type.thin_fruit":"Thin fruit","type.pollinate":"Pollinate","type.check":"Check","type.make_feed":"Make plant feed","category.vegetable":"Vegetables","category.herb":"Herbs","category.fruit":"Fruit","category.flower":"Flowers","feature.path":"Gravel path","feature.compost":"Compost heap / bin","feature.water_butt":"Water butt","feature.shed":"Shed","feature.tree":"Tree","feature.hedge":"Hedge","feature.trellis":"Trellis","feature.other":"Other","stage.not_planted":"Not planted","stage.establishing":"Establishing","stage.vegetative":"Growing","stage.flowering":"Flowering","stage.ripening":"Ripening","stage.harvest":"Harvest","stage.finished":"Finished","compat.deters":"{a} protects {b}: it deters {pests}.","compat.trap":"{a} lures {pests} away from {b} (trap crop).","compat.allelopathy":"{a} releases growth-inhibiting compounds - keep it away from {b}.","compat.competition":"{a} and {b} are both heavy feeders this close together - add extra compost or give more space.","compat.shading":"{a} (about {height} cm tall) will shade {b} - plant tall crops on the side away from the sun.","compat.shade_benefit":"{a} gives {b} welcome summer shade.","alert.disease":"Disease risk {level} in {zone}","alert.nutrients":"Nutrient balance in {bed}: {status}","autoplan.bed_not_empty":"{bed} already has crops this season - tick 'replace' to re-plan it.","autoplan.no_beds":"No empty beds to fill. Select beds and tick 'replace'.","autoplan.compost_short":"Needs about {need} kg compost, you have {have} kg.","autoplan.time_over":"About {need} min per week of work - more than the {have} min you have.","autoplan.wanted_missing":"No room for: {plants}.","autoplan.consider_irrigation":"About {liters} L of water in a dry summer week - drip irrigation or a water butt will save you time.","autofill.title":"Autofill","autofill.intro":"Proposes crops, amounts and positions for season {season} from your beds and resources. Nothing is changed until you apply it.","autofill.household":"People in the household","autofill.hours":"Hours per week","autofill.water":"Water per week (L)","autofill.compost":"Compost available (kg)","autofill.has_irrigation":"Drip irrigation / automatic watering available","autofill.goals":"Goals","autofill.wanted":"Must have","autofill.excluded":"Never","autofill.beds":"Beds","autofill.all_empty":"(all empty beds)","autofill.replace":"Replace this season's crops in the selected beds","autofill.propose":"Make a proposal","autofill.apply":"Apply to plan","autofill.applied":"{n} plantings added to the plan","autofill.skipped":"Not placed","autofill.sum_crops":"{n} crops","autofill.sum_yield":"\u2248 {kg} kg harvest","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in a peak week","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Fresh vegetables","autofill.goal.storage":"Storage crops","autofill.goal.herbs":"Herbs","autofill.goal.pollinators":"Pollinators","autofill.goal.winter":"Winter harvest","autofill.goal.perennials":"Perennials","autofill.goal.easy":"Low maintenance","autofill.reason.no_suitable_bed":"no suitable bed","autofill.reason.no_space":"no space","autofill.reason.time_budget":"time budget","autofill.reason.water_budget":"water budget","cal.timeline":"Timeline","cal.garden_work":"Garden work","cal.growing":"Growing","cal.harvest_estimate":"Harvest expected around {date}","cal.harvest_estimate_short":"Expected harvest (degree days)","cal.last_frost":"Last frost","cal.first_frost":"First frost","cal.frost_dates":"Frost dates","cal.no_plantings":"No crops planned this season.","ctx.title":"Right now","ctx.moisture":"Soil moisture","ctx.soil_temp":"Soil temperature","ctx.irrigation":"Watering","ctx.water_balance":"Water deficit","ctx.nutrients":"Nutrient balance","ctx.air_temp":"Air temperature","ctx.humidity":"Humidity","ctx.disease":"Disease risk","ctx.frost":"Frost risk","ctx.today":"Today","ctx.rain":"Rain today","ctx.et0":"Evaporation (ET\u2080)","dash.gdd_today":"Degree days today","dash.water_climate":"Water & climate","dash.irrigation_mode":"Irrigation","dash.watering_now":"Watering {bed}","dash.stop":"Stop","dash.beds_need_water":"Beds needing water","dash.water_now":"Water now","dash.safety_note":"Frost lockout, rain skip and max runtime always apply.","dash.disease_risk":"Disease risk","dash.nutrients":"Nutrients","dash.water_balance":"Water deficit","dash.irrigation_started":"Watering started ({min} min)","dash.irrigation_stopped":"Watering stopped","dash.irrigation_nothing":"Nothing to water right now","handbook.title":"Gardening handbook","handbook.intro":"Background to everything Hortulus advises: soil, sowing, watering, feeding, rotation, the greenhouse and the garden year.","handbook.contents":"Contents","handbook.overview":"Overview","handbook.glossary":"Glossary","handbook.search":"Search the handbook","handbook.results":"Results for \u201C{query}\u201D","handbook.no_results":"Nothing found.","handbook.read_more":"Read more in the handbook","lib.category":"Category","lib.count":"{n} plants","lib.perennial":"perennial","lib.height":"Height","lib.roots":"roots","lib.gdd":"Degree days to harvest","lib.base":"base","lib.per_person":"Plants per person \xB7 yield","lib.deters":"Deters","lib.trap_for":"Trap crop for","lib.allelopathic":"Inhibits neighbours","lib.shade_tolerant":"Tolerates shade","lib.plant":"Plant","planner.layer_zones":"Show zones","planner.layer_features":"Show paths & elements","planner.layer_plantings":"Show crops","planner.add_feature":"Element","planner.align.left":"Align left","planner.align.right":"Align right","planner.align.top":"Align top","planner.align.bottom":"Align bottom","planner.align.hcenter":"Centre horizontally","planner.align.vcenter":"Centre vertically","planner.align.hdistribute":"Distribute horizontally","planner.align.vdistribute":"Distribute vertically","planner.aligned":"{n} items aligned","planner.moved_n":"{n} items moved","planner.removed_n":"{n} items removed","planner.selected_n":"{n} selected","planner.multi_hint":"Shift- or Ctrl-click to select several beds or crops, then drag, align or distribute them.","planner.alternatives":"Fits in","planner.better_neighbours":"Better neighbours","planner.heat_stress":"{n} hot days ahead","print.options":"Print options","print.document":"Document","print.page":"Paper","print.orientation":"Orientation","print.portrait":"Portrait","print.landscape":"Landscape","print.colors":"Colours","print.beds":"Beds","print.days":"Days ahead","print.title":"Title","print.notes":"Notes area (dot grid)","print.grid":"10 cm grid on bed sheets","print.labels":"Crop names on the map","print.download":"Download PDF","print.refresh":"Refresh preview","print.save_config":"Save to /config/hortulus/exports","print.saved_to_config":"PDF saved (/config/hortulus/exports)","print.preview":"Preview","print.empty":"No preview yet.","print.page_n":"Page {n} of {total}","print.all_greenhouses":"All greenhouses","print.all_zones":"All zones","print.remarkable_hint":"reMarkable Paper Pro: 179.6 \xD7 239.5 mm, extra margin on the left for the toolbar. E-ink colours use light tints and patterns so your pen stays visible. Send the PDF with the reMarkable app or email.","print.doc.garden":"Garden map","print.doc.garden.hint":"Zones, beds, crops, legend","print.doc.zone":"Greenhouse / zone","print.doc.zone.hint":"One zone, zoomed in","print.doc.beds":"Bed sheets","print.doc.beds.hint":"A page per bed with grid","print.doc.tasks":"Checklist","print.doc.tasks.hint":"Open tasks per week","print.doc.season":"Season chart","print.doc.season.hint":"Sow \u2192 harvest timeline","print.doc.blank":"Planning sheet","print.doc.blank.hint":"Outlines to sketch on","print.doc.plants":"Plant cards","print.doc.plants.hint":"Key facts per crop","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Full colour","print.color.eink":"E-ink (light + patterns)","print.color.grayscale":"Grayscale","settings.irrigation_hw":"Irrigation hardware","settings.irrigation_mode":"Mode","settings.irrigation_mode.off":"Off","settings.irrigation_mode.advise":"Advise (tasks only)","settings.irrigation_mode.auto":"Automatic","settings.pump":"Pump (switch)","settings.start_time":"Start time","settings.max_runtime":"Max runtime per valve (min)","settings.frost_lockout":"Frost lockout below (\xB0C)","settings.rain_skip":"Skip when rain forecast \u2265 (mm)","settings.pump_lead":"Pump stop before valve (s)","settings.irrigation_hint":"{n} beds have a valve. Set the flow (L/min) per bed under Beds.","settings.resources":"Resources (autofill)","settings.maintenance_tasks":"Seasonal garden tasks in the calendar (soil prep, greenhouse cleaning, winter rest ...)","settings.open_meteo":"Use Open-Meteo for humidity, wind and sunshine","settings.open_meteo_hint":"Optional and off by default: sends the garden's rounded coordinates to api.open-meteo.com. Improves the evaporation (Penman-Monteith) estimate.","settings.elevation":"Elevation (m)","settings.shade_entity":"Shade screen (cover or switch)","settings.climate_control":"Vent & shade control","settings.climate_control.off":"Off","settings.climate_control.advise":"Advise (tasks)","settings.climate_control.auto":"Automatic","settings.wall_heat":"Against a warm wall","settings.thermal_mass":"Thermal mass (water barrels, stone)","settings.sensor.par":"Light (PAR)","settings.sensor.leaf_wetness":"Leaf wetness","settings.sensor.ec":"Soil EC","settings.sensor.npk_n":"Nitrogen (N)","settings.sensor.npk_p":"Phosphorus (P)","settings.sensor.npk_k":"Potassium (K)","task.postponed":"{title} postponed by {n} day(s)","common.done":"Done","planner.removed_from":"{name} removed from season {season} on (history kept).","planner.steps":"Build your garden plan in three steps","planner.step.site":"Draw your site","planner.step.site.hint":"zones & elements","planner.step.zones":"Arrange zones","planner.step.zones.hint":"name, beds, own map","planner.step.plant":"Plant","planner.step.plant.hint":"by hand or by the system","planner.whole_garden":"Whole garden","planner.zone_map":"Zone map","planner.site_intro":"Pick a zone type or element, then drag a rectangle on the grid (squares of 10 \xD7 10 cm). A single click places a standard size. Double-click a zone to open its own map.","planner.zones":"Zones","planner.elements":"Paths, lawn, trees & more","planner.your_zones":"Your zones","planner.no_zones":"No zones yet - start with your vegetable garden, greenhouse or orchard.","planner.open_zone":"Open zone map","planner.next":"Next","planner.zones_intro":"Open a zone to give it a name and draw its beds on its own map. Trees and bushes in an orchard or fruit zone stay there year after year.","planner.n_beds":"{n} beds","planner.zone_name":"Zone name","planner.beds_in_zone":"Beds & elements in this zone","planner.draw_bed":"Bed","planner.fill_by_hand":"Fill in myself","planner.fill_by_system":"Let the system fill it","planner.bed_needs_zone":"Draw a bed inside a zone.","planner.draw_hint":"Drag on the grid to draw: {what}","planner.palette_for_zone":"Showing plants that suit {zone}. Pick a category to see everything.","planner.perennial":"perennial","planner.bears_after":"fruit after ~{n} yr","planner.perennial_since":"Perennial - in the ground since {season} and carried over every year until you remove it.","planner.bearing_from":"First harvest expected from {season}.","planner.eco_tips":"Eco tips & home remedies","planner.remove_perennial":"Remove {name}?","planner.remove_perennial_intro":"{name} was planted in {season} and stays in your plan every year. What happened?","planner.remove_from_season":"It is gone from {season} on","planner.remove_from_season_hint":"Earlier years keep it (rotation history, harvests, notes).","planner.remove_everywhere":"Delete it completely","planner.remove_everywhere_hint":"As if it was never planted - also removed from earlier years.","planner.legend.perennial":"perennial (stays)","planner.legend.warning":"neighbour / rotation warning","planner.legend.succession":"succession sowing","planner.legend.rows":"rows of seedlings","planner.legend.border":"Border colour = plant family (for crop rotation); the icon shows the crop itself.","settings.zone_type.orchard":"Orchard","settings.zone_type.fruit":"Soft fruit","settings.zone_type.herbs":"Herb garden","settings.zone_type.flowers":"Flower garden","zone_hint.outdoor":"Vegetable garden: annual crops with rotation, beds and paths.","zone_hint.greenhouse":"Greenhouse: warm crops, climate control, ventilation and shading.","zone_hint.cold_frame":"Cold frame: hardening off, early and late salads.","zone_hint.orchard":"Orchard: fruit trees that stay for decades - prune, thin and harvest yearly.","zone_hint.fruit":"Soft fruit: berries, currants, grapes and kiwi berries.","zone_hint.herbs":"Herb garden: perennial and annual herbs, a bee magnet.","zone_hint.flowers":"Flower garden: pollinators, beneficial insects and cut flowers.","feature.terrace":"Terrace","feature.lawn":"Lawn","feature.flowerbed":"Flower bed","feature.fence":"Fence","feature.pond":"Pond","pollination.insects":"Needs insects for pollination - add flowers nearby.","pollination.wind":"Wind-pollinated - plant in blocks, not single rows.","pollination.partner":"Needs a pollination partner (second variety) nearby.","pollination.none":"No pollination needed (leaves, roots).","planner.more":"More","settings.reminders":"Reminders","settings.overdue_reminders":"Remind me of tasks left undone","settings.overdue_time":"Reminder time","settings.overdue_after":"Remind after (days late)","settings.weekly_plan":"Weekly look-ahead","settings.weekly_day":"Day","settings.weekly_time":"Time","settings.weather_aware":"Weather-aware scheduling","settings.weather_aware_hint":"Sowing, planting out, spraying, pruning and mulching move automatically to the best dry, frost-free, not-too-hot day inside their window.","feature.house":"House","feature.driveway":"Driveway","feature.street":"Street","feature.parking":"Parking","feature.play":"Play area","feature.beehive":"Beehive","autofill.prefs":"Preferences","autofill.freedom":"Freedom of choice","autofill.freedom.strict":"Only what I want","autofill.freedom.balanced":"My wishes + goals","autofill.freedom.free":"Free: surprise me","autofill.pref.respect_companions":"Respect plant neighbours","autofill.pref.add_pollinators":"Add flowers for pollinators","autofill.pref.year_round":"Aim for harvests all year","autofill.pref.allow_perennials":"Perennials allowed","autofill.pref.match_zone_type":"Respect zone type (orchard = fruit \u2026)","autofill.reason.pollinators":"pollinators","nav.advice":"Advice","task.tools":"You need","advice.ask_title":"Ask Hortulus","advice.i_have":"I have a","advice.mode.question":"question","advice.mode.problem":"problem","advice.about":"about","advice.subject":"Subject","advice.target":"Which one","advice.problem":"Question","advice.ask":"Ask","advice.in_garden":"In your garden","advice.all_plants":"All plants","advice.whole_garden":"the whole garden","advice.subject.plant":"a plant / vegetable / fruit","advice.subject.greenhouse":"my greenhouse","advice.subject.garden":"my garden","advice.subject.bed":"a bed","advice.subject.tools":"tools & supplies","advice.q.status":"How is it doing?","advice.q.what_to_do":"What should I do now?","advice.q.when_sow":"When to sow or plant?","advice.q.when_harvest":"When to harvest?","advice.q.growth":"it grows badly","advice.q.yellow_leaves":"yellow leaves","advice.q.wilting":"it wilts / droops","advice.q.no_fruit":"flowers but no fruit","advice.q.bolting":"it bolts (runs to seed)","advice.q.pests":"pests / bugs on it","advice.q.disease":"spots, mould or rot","advice.q.feeding":"How to feed it?","advice.q.watering":"How much water?","advice.q.pruning":"How to prune?","advice.q.companions":"What grows well next to it?","advice.q.too_hot":"it is too hot","advice.q.too_cold":"it is too cold","advice.q.winter_crops":"What can grow in winter?","advice.q.year_round":"How do I harvest all year?","advice.q.soil":"my soil is poor","advice.q.slugs":"slugs!","advice.q.frost":"frost is coming","advice.q.what_next":"What should go in next?","advice.q.for_task":"Which tools for this job?","advice.q.shopping":"What do I need to buy?","advice.sec.status":"Now in your garden","advice.sec.facts":"Good to know","advice.sec.causes":"Possible causes","advice.sec.actions":"What to do","advice.sec.remedies":"Eco & home remedies","advice.sec.prevention":"Prevent it next time","advice.sec.tasks":"Open tasks","advice.read_more":"Read more in the handbook","advice.suggestions":"Suggestions for your garden","advice.suggestions_intro":"Hortulus looks at placement, pollination, neighbours, year-round harvest, soil and ecology.","advice.none":"No suggestions - your plan looks great!","advice.apply_add":"Add to plan","advice.apply_open":"Show in planner","advice.dismiss":"Hide","advice.no_space":"No free space in {bed}.","advice.kind.pollination":"Pollination","advice.kind.neighbours":"Neighbours","advice.kind.placement":"Placement","advice.kind.year_round":"Year-round","advice.kind.soil":"Soil","advice.kind.eco":"Ecology","advice.kind.growth":"Growth","advice.kind.greenhouse":"Greenhouse","advice.coverage":"Harvest per month","advice.coverage_gaps":"Red months have nothing to harvest - the suggestions show what fills them.","advice.coverage_full":"Something to harvest every month.","advice.nothing":"nothing","advice.shopping":"Shopping list this season","advice.shopping_intro":"Worked out from your plan: seed, plants, compost, protection and support.","advice.nothing_to_buy":"Nothing to buy yet - plan some crops first.","advice.tools_per_task":"Tools per job","advice.read_tools":"Tools & DIY feeds","advice.cat.seeds":"Seed","advice.cat.plants":"Young plants","advice.cat.soil":"Soil & feeding","advice.cat.protection":"Protection","advice.cat.support":"Support & mulch","advice.cat.other":"Other","print.doc.year":"Year plan","print.doc.year.hint":"Month matrix: sow, plant, harvest","nav.journal":"Journal","task.assignee":"Assigned to","task.anyone":"anyone","task.harvested":"Harvested:","journal.diary":"Diary","journal.harvest":"Harvest","journal.seeds":"Seed box","journal.water":"Water","journal.new":"New diary entry","journal.text":"What did you see or do?","journal.placeholder":"First tomatoes ripening, aphids on the broad beans \u2026","journal.kind":"Kind","journal.kind.note":"Note","journal.kind.observation":"Observation","journal.kind.problem":"Problem","journal.kind.milestone":"Milestone","journal.link":"About","journal.whole_garden":"the whole garden","journal.beds":"Beds","journal.crops":"Crops this season","journal.add_photo":"Add photo","journal.save":"Save","journal.saved":"Saved in the diary.","journal.filter":"Filter","journal.all":"Everything","journal.empty":"No entries yet - note what you see: it is the best garden teacher.","journal.log_harvest":"Log a harvest","journal.what":"Crop","journal.kg":"Weight (kg)","journal.count":"Count","journal.day":"Date","journal.quality":"Quality","journal.learn_hint":"Hortulus learns your own yields per m\xB2 from this and uses them in Autofill and advice.","journal.harvest_saved":"Harvest saved.","journal.harvest_season":"Harvest {season}","journal.crops_n":"{n} crops","journal.yield":"your yield {kg} kg/m\xB2 (database {db})","journal.recent":"Latest entries","journal.no_harvest":"Nothing logged yet.","journal.add_seed":"Add seed packet","journal.variety":"Variety","journal.year":"Year","journal.quantity":"Quantity","journal.unit":"Unit","journal.unit.packet":"packet(s)","journal.unit.seeds":"seeds","journal.unit.g":"g","journal.source":"Source","journal.source_hint":"shop, swap, own seed \u2026","journal.seed_saved":"Seed packet saved.","journal.seed_missing":"Still needed for this season","journal.seed_hint":"Seed keeps 1-2 years (parsnip, onion) up to 5-6 years (cabbages, cucurbits). Old seed: do a germination test.","journal.seed_box":"Seed box","journal.status":"Status","journal.needed":"needed this season","journal.seed.ok":"good","journal.seed.use_soon":"use this year","journal.seed.expired":"old (test it)","journal.seed.empty":"empty","journal.seed.unknown":"year unknown","journal.no_seeds":"No seed packets yet.","journal.water_setup":"Link a water meter and/or a water-butt level sensor in Settings \u203A Water to follow your garden water.","journal.water_week":"Mains water, 7 days","journal.water_season":"Mains water this year","journal.rain_available":"Rain water available","journal.per_day":"Per day (last 14 days)","journal.water_hint":"Watering tasks mention how much rain water is left so you use it first.","cal.year":"Year","cal.tasks_per_month":"Tasks","cal.act.sow_indoor":"sow indoors","cal.act.sow":"sow","cal.act.plant":"plant out","cal.act.grow":"growing","cal.act.harvest":"harvest","cal.act_short.sow_indoor":"S","cal.act_short.sow":"S","cal.act_short.plant":"P","cal.act_short.harvest":"H","settings.water":"Water meter & rain butt","settings.water_meter":"Garden water meter (m\xB3 or L)","settings.butt_level":"Rain butt level (%)","settings.butt_capacity":"Total butt capacity (L)","settings.water_hint":"Hortulus stores one reading per day. You get water use per week, the rain water still available, and watering tasks say how much of it you can use first.","settings.household":"Household & voice","settings.nobody":"Nobody (unassigned)","settings.default_person":"Use the default","settings.no_persons":"No people found. Add people under Settings \u2192 People to assign tasks.","settings.assign_default":"New tasks go to","settings.assign_per_type":"Per task type","settings.person_notify":"Personal reminders","settings.person_notify_hint":"Each person gets their own tasks on this notify service (daily digest and overdue reminders).","settings.voice":"Voice (Assist)","settings.voice_hint":"Ask Assist \u201Cwhat do I need to do in the garden today?\u201D, \u201Chow much did I harvest?\u201D, \u201Cis there frost tonight?\u201D. Install the sentences once, then they work in English and Dutch.","settings.voice_install":"Install voice sentences","settings.voice_installed":"Voice sentences installed","soil_test.title":"Soil analysis","soil_test.none":"No soil analysis yet.","soil_test.add":"Add soil analysis","soil_test.om":"Organic matter (%)","soil_test.lime":"Lime status","soil_test.lime.low":"too low","soil_test.lime.ok":"fine","soil_test.lime.high":"high","soil_test.hint":"Lab report or home kit. Hortulus adjusts the fertiliser plan and lime advice of this bed to the latest analysis.","cal.hours":"{n} h","planner.other_season":"{name} (season {year})","journal.system":"System log","syslog.intro":"Every change in Hortulus is listed here: what you or someone else did in the panel, through automations, and what Hortulus adjusted itself (tasks, clean-up). Undo an entry to restore the state from before that action; the undo is logged as well, so it can be reverted too.","syslog.show_system":"Show automatic actions by Hortulus","syslog.empty":"Nothing logged yet.","syslog.by_system":"Hortulus (automatic)","syslog.by_unknown":"Automation or service","syslog.is_undone":"undone","syslog.undo":"Undo","syslog.undone":"Undone.","syslog.confirm":"Undo: {what}?","syslog.conflict":"{n} item(s) changed again since. Undo anyway? Those later changes will be lost.","syslog.blocked":"Cannot undo: this would refer to a bed, zone or plant that has been deleted since. Undo that later deletion first.","syslog.more":"Load older entries","syslog.and_more":"\u2026 and {n} more","syslog.n_changes":"{verb} \u2013 {n} items","syslog.op.add":"Added","syslog.op.remove":"Removed","syslog.op.change":"Changed","syslog.op.mixed":"Updated","syslog.reason.plan":"planner","syslog.reason.import":"import","syslog.reason.tasks":"tasks","syslog.reason.settings":"settings","syslog.reason.plants":"plant library","syslog.reason.records":"journal","syslog.reason.auto":"automatic","syslog.reason.undo":"Undo","syslog.col.zones":"Zone","syslog.col.beds":"Bed","syslog.col.plantings":"Crop","syslog.col.tasks":"Task","syslog.col.custom_plants":"Custom plant","syslog.col.features":"Garden feature","syslog.col.harvest_log":"Harvest","syslog.col.journal":"Diary note","syslog.col.seed_stock":"Seed stock","syslog.col.rotation_history":"Crop history","syslog.col.irrigation_log":"Irrigation","syslog.col.plant_overrides":"Plant data","syslog.col.settings":"Setting","planner.draw_site":"Site & elements","planner.draw_planter":"Planter / pot","planner.draw_planter_hint":"Draw a planter, pot or window box - you can plant it like a bed afterwards.","planner.new_planter":"Planter","planner.elements_in_zone":"Paths, terrace, lawn, hedge \u2026 in this zone","planner.elements.buildings":"Buildings & paving","planner.elements.paths":"Paths","planner.elements.green":"Green","planner.elements.outdoor_living":"Outdoor living & equipment","feature.stone_path":"Stone path","feature.wood_path":"Wooden path","feature.stepping_stones":"Stepping stones","feature.bark_path":"Bark path","feature.decking":"Decking","feature.wall":"Wall","feature.carport":"Carport / garage","feature.shrub":"Shrub","feature.pool":"Swimming pool","feature.seating":"Seating area","settings.zone_type.garden":"Ornamental garden","settings.zone_type.containers":"Planters & pots","zone_hint.garden":"Ornamental garden: shrubs, borders and perennials around lawn and terrace.","zone_hint.containers":"Planters & pots: on a terrace, balcony or window sill - draw every planter or pot and plant it."};var ys={"app.name":"Hortulus","app.tagline":"Je moestuin, gepland en verzorgd","nav.dashboard":"Vandaag","nav.planner":"Planner","nav.library":"Planten","nav.calendar":"Kalender","nav.settings":"Instellingen","common.save":"Opslaan","common.cancel":"Annuleren","common.delete":"Verwijderen","common.close":"Sluiten","common.add":"Toevoegen","common.edit":"Bewerken","common.none":"Geen","common.loading":"Je tuin wordt geladen\u2026","common.not_loaded":"Hortulus is nog niet ingesteld. Voeg de integratie toe via Instellingen \u2192 Apparaten & diensten.","common.minutes":"{n} min","common.days":"{n} dagen","common.cm":"{n} cm","common.today":"Vandaag","common.tomorrow":"Morgen","common.yesterday":"Gisteren","common.overdue":"Te laat","common.unknown":"Onbekend","common.search":"Zoeken","common.all":"Alle","common.season":"Seizoen {year}","common.admin_only":"Alleen beheerders kunnen het plan wijzigen.","common.saved":"Opgeslagen","common.saving":"Opslaan\u2026","common.unsaved":"Niet-opgeslagen wijzigingen","common.conflict":"Elders gewijzigd - opnieuw geladen","common.error":"Er ging iets mis: {message}","dash.greeting_morning":"Goedemorgen","dash.greeting_afternoon":"Goedemiddag","dash.greeting_evening":"Goedenavond","dash.today_tasks":"Taken voor vandaag","dash.no_tasks":"Niets te doen vandaag. Geniet van de tuin!","dash.show_all":"Alle {n} taken tonen in de kalender","dash.total_time":"Ongeveer {minutes} min werk","dash.beds":"Bedden","dash.weather":"Komende 48 uur","dash.greenhouse":"Kas","dash.coming_up":"Binnenkort","dash.gdd":"Graaddagen","dash.gdd_since":"sinds {date}","dash.frost_risk":"Vorstrisico","dash.min_temp":"Laagste {temp} \xB0C","dash.rain":"Regen {mm} mm","dash.inside":"Binnen {temp} \xB0C","dash.limits":"Gewassen verdragen {min}\u2013{max} \xB0C","dash.no_sensor":"Geen sensor","dash.active_crops":"{n} gewassen in de grond","dash.forecast_missing":"Geen weersverwachting - advies is minder nauwkeurig.","planner.season":"Seizoen","planner.undo":"Ongedaan maken","planner.redo":"Opnieuw","planner.snap":"Uitlijnen op raster","planner.zoom_in":"Inzoomen","planner.zoom_out":"Uitzoomen","planner.fit":"Passend maken","planner.add_bed":"Bed toevoegen","planner.add_zone":"Zone toevoegen","planner.overlay_companions":"Buurplanten","planner.overlay_moisture":"Vocht","planner.overlay_temperature":"Temperatuur","planner.view_date":"Toon tuin op","planner.palette":"Planten","planner.palette_hint":"Sleep een plant naar een bed, of druk op Enter om hem aan het geselecteerde bed toe te voegen.","planner.layout":"Indeling","planner.layout.single":"Los","planner.layout.block":"Blok","planner.layout.row":"Rij","planner.inspector":"Details","planner.nothing_selected":"Selecteer een bed of beplanting voor details. Druk op ? voor sneltoetsen.","planner.method":"Methode","planner.method.indoor_sow":"Binnen zaaien, later uitplanten","planner.method.direct_sow":"Ter plaatse zaaien","planner.method.transplant":"Planten (gekochte planten / plantuitjes)","planner.status":"Status","planner.count":"{n} planten","planner.timeline":"Tijdlijn","planner.succession":"Opeenvolgend zaaien","planner.succession_count":"Aantal zaaimomenten","planner.succession_interval":"Elke (dagen)","planner.succession_placement":"Plaatsing","planner.succession.split":"Vlak in stroken verdelen","planner.succession.stack":"Zelfde plek, na elkaar","planner.succession_create":"Zaaimomenten maken","planner.succession_dropped":"{n} zaaimomenten vielen buiten het zaaivenster en zijn overgeslagen.","planner.duplicate":"Dupliceren","planner.remove":"Verwijderen","planner.bed_name":"Naam","planner.zone":"Zone","planner.kind":"Soort","planner.width":"Breedte (cm)","planner.length":"Lengte (cm)","planner.orientation":"Rijrichting (\xB0)","planner.soil":"Grond","planner.shade":"Schaduw (%)","planner.wind":"Wind","planner.score":"Buurplantenscore","planner.warnings":"Waarschuwingen","planner.no_warnings":"Geen conflicten - mooie combinatie!","planner.out_of_bounds":"Valt deels buiten het bed.","planner.placed":"{plant} geplaatst in {bed}.","planner.moved":"{name} verplaatst.","planner.removed":"{name} verwijderd.","planner.no_bed_here":"Zet planten op een bed.","planner.export_json":"Exporteer JSON","planner.export_yaml":"Exporteer YAML","planner.import":"Plan importeren","planner.import_mode":"Importmodus","planner.import_merge":"Samenvoegen met huidig plan","planner.import_replace":"Huidig plan vervangen","planner.imported":"Ge\xEFmporteerd: {beds} bedden, {plantings} beplantingen.","planner.shortcuts":"Sneltoetsen","planner.legend":"Plantenfamilies","planner.new_bed":"Nieuw bed","planner.new_zone":"Nieuwe zone","shortcut.move":"Selectie verplaatsen (Shift = 10\xD7)","shortcut.undo":"Ongedaan maken","shortcut.redo":"Opnieuw","shortcut.delete":"Selectie verwijderen","shortcut.duplicate":"Selectie dupliceren","shortcut.grid":"Raster aan/uit","shortcut.companions":"Buurplanten-laag aan/uit","shortcut.moisture":"Vochtlaag aan/uit","shortcut.zoom":"In- / uitzoomen","shortcut.escape":"Selectie opheffen","shortcut.cycle":"Volgend / vorig item selecteren","shortcut.help":"Deze hulp tonen","lib.title":"Plantenbibliotheek","lib.search":"Zoek op naam, Latijnse naam of familie","lib.family":"Familie","lib.filter_greenhouse":"Kas","lib.filter_quick":"Snelle gewassen","lib.filter_custom":"Mijn planten","lib.add_custom":"Nieuwe plant","lib.customize":"Aanpassen","lib.reset":"Terug naar standaard","lib.spacing":"Plantafstand","lib.row_spacing":"Rijafstand","lib.depth":"Zaaidiepte","lib.germination":"Kiemduur","lib.maturity":"Dagen tot oogst","lib.soil_temp":"Min. bodemtemperatuur","lib.frost":"Vorstbestendigheid","lib.min_temp":"Minimumtemperatuur","lib.greenhouse":"Kas","lib.water":"Water","lib.nutrients":"Voeding","lib.rotation":"Wisselteelt","lib.rotation_years":"{n} jaar voordat dezelfde familie terugkomt","lib.friends":"Goede buren","lib.enemies":"Uit elkaar houden","lib.pests":"Plagen","lib.diseases":"Ziekten","lib.care":"Verzorging","lib.calendar":"Zaaikalender","lib.indoor_sow":"Binnen zaaien","lib.direct_sow":"Buiten zaaien","lib.transplant":"Uitplanten","lib.harvest":"Oogsten","lib.source.builtin":"Standaard","lib.source.custom":"Eigen","lib.source.override":"Aangepast","lib.id":"Code","lib.name_en":"Naam (Engels)","lib.name_nl":"Naam (Nederlands)","lib.scientific":"Wetenschappelijke naam","lib.variety":"Ras","lib.habit":"Groeiwijze","lib.windows_hint":"Weken ten opzichte van de gemiddelde laatste voorjaarsvorst (negatief = ervoor).","lib.weeks":"weken","lib.from":"van","lib.to":"tot","lib.saved":"{plant} opgeslagen.","cal.month":"Maand","cal.week":"Week","cal.list":"Lijst","cal.prev":"Vorige","cal.next":"Volgende","cal.show_done":"Afgeronde taken tonen","cal.add_task":"Nieuwe taak","cal.all_beds":"Alle bedden","task.complete":"Klaar","task.skip":"Overslaan","task.reopen":"Heropenen","task.postpone":"Uitstellen","task.postpone_1":"+1 dag","task.postpone_3":"+3 dagen","task.postpone_7":"+1 week","task.postpone_to":"Naar datum","task.note":"Notitie","task.notes":"Notities","task.photos":"Foto's","task.add_photo":"Foto toevoegen","task.priority":"Prioriteit","task.duration":"Duur (min)","task.due":"Datum","task.window":"Venster {start} \u2013 {end}","task.repeat":"Herhaalt elke {n} dagen","task.repeat_days":"Herhaal elke (dagen, optioneel)","task.title":"Titel","task.type":"Soort","task.bed":"Bed","task.description":"Omschrijving","task.shifted":"{n} afhankelijke taken schoven mee.","task.beyond_window":"Let op: de nieuwe datum ligt na het ideale venster.","task.completed":"Goed bezig! {title} gedaan.","task.source.generated":"Uit je plan","task.source.sensor":"Uit sensoren","task.source.weather":"Uit de weersverwachting","task.source.user":"Door jou toegevoegd","settings.region":"Klimaat & regio","settings.hemisphere":"Halfrond","settings.hemisphere.north":"Noordelijk","settings.hemisphere.south":"Zuidelijk","settings.mode":"Profiel","settings.mode.preset":"Regionale voorinstelling","settings.mode.usda":"USDA-winterhardheidszone","settings.mode.custom":"Eigen vorstdata","settings.preset":"Regio","settings.zone":"Winterhardheidszone","settings.last_frost":"Laatste voorjaarsvorst (MM-DD)","settings.first_frost":"Eerste najaarsvorst (MM-DD)","settings.frost_dates_now":"Dit seizoen: laatste vorst {last}, eerste vorst {first}.","settings.weather":"Weer & buitensensoren","settings.weather_entity":"Weerentiteit","settings.outdoor_temp":"Buitentemperatuur","settings.rain":"Regensensor","settings.zones":"Zones & microklimaat","settings.beds":"Bedden & sensoren","settings.zone_type.outdoor":"Buiten","settings.zone_type.greenhouse":"Kas","settings.zone_type.cold_frame":"Koude bak","settings.heated":"Verwarmd","settings.min_heating":"Verwarming houdt boven (\xB0C)","settings.sensors":"Sensoren","settings.sensor.soil_moisture":"Bodemvocht","settings.sensor.soil_temperature":"Bodemtemperatuur","settings.sensor.air_temperature":"Luchttemperatuur","settings.sensor.air_humidity":"Luchtvochtigheid","settings.sensor.light":"Licht","settings.sensor.rain":"Regen","settings.irrigation":"Beregeningsschakelaar/-klep","settings.flow":"Debiet (L/min)","settings.vent":"Raamopener / ventilatie","settings.notifications":"Meldingen","settings.persistent":"Blijvende meldingen","settings.notify_services":"Pushmeldingen (notify-diensten, kommagescheiden)","settings.tts":"Tekst-naar-spraak-entiteit","settings.tts_players":"Speakers (kommagescheiden)","settings.digest":"Dagelijks overzicht om","settings.frost_alerts":"Vorstwaarschuwingen","settings.heat_alerts":"Hittewaarschuwingen","settings.tts_frost":"Vorst omroepen via speakers","settings.general":"Algemeen","settings.language":"Taal","settings.language.auto":"Volg Home Assistant","settings.units":"Eenheden","settings.units_metric":"Metrisch (cm, \xB0C, mm, L)","settings.snap":"Rastergrootte (cm)","settings.radius":"Bereik buurplanten (cm)","settings.data":"Importeren & exporteren","settings.saved":"Instellingen opgeslagen.","type.sow_indoor":"Binnen zaaien","type.sow_direct":"Buiten zaaien","type.harden_off":"Afharden","type.transplant":"Uitplanten","type.thin":"Uitdunnen","type.stake":"Ondersteunen","type.prune":"Snoeien","type.pinch":"Toppen","type.earth_up":"Aanaarden","type.feed":"Bemesten","type.water":"Water geven","type.weed":"Wieden","type.pest_check":"Plaagcontrole","type.harvest":"Oogsten","type.ventilate":"Luchten","type.shade":"Schaduwen","type.frost_protect":"Vorstbescherming","type.custom":"Taak","priority.low":"Laag","priority.normal":"Normaal","priority.high":"Hoog","priority.urgent":"Dringend","status.planned":"Gepland","status.sown_indoors":"Binnen gezaaid","status.sown":"Gezaaid","status.transplanted":"Uitgeplant","status.harvesting":"Oogst loopt","status.finished":"Afgerond","status.failed":"Mislukt","risk.none":"geen","risk.low":"laag","risk.moderate":"matig","risk.high":"hoog","risk.unknown":"onbekend","moisture.dry":"Droog","moisture.slightly_dry":"Iets droog","moisture.optimal":"Optimaal","moisture.wet":"Nat","moisture.unknown":"Geen data","irrigation.none":"Geen water nodig","irrigation.water":"Geef {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Overslaan - regen verwacht","irrigation.check_manually":"Controleer met de hand (~{mm} mm)","gh.none":"Alles goed","gh.ventilate":"Luchten","gh.shade":"Nu schaduwen","gh.close_up":"Sluiten voor de nacht","gh.heat":"Verwarming aan","level.low":"Laag","level.medium":"Gemiddeld","level.high":"Hoog","suit.yes":"Geschikt","suit.no":"Niet geschikt","suit.conditional":"Mogelijk","frost.tender":"Vorstgevoelig","frost.half_hardy":"Half winterhard","frost.hardy":"Winterhard","frost.very_hardy":"Zeer winterhard","kind.in_ground":"Bed in de grond","kind.raised":"Verhoogd bed","kind.container":"Bak / pot","soil.sandy":"Zand","soil.loam":"Leem","soil.clay":"Klei","soil.silt":"L\xF6ss","soil.peat":"Veen","soil.chalk":"Kalk","soil.potting_mix":"Potgrond","wind.sheltered":"Beschut","wind.moderate":"Gemiddeld","wind.exposed":"Winderig","habit.bush":"Struik","habit.vine":"Rank","habit.climbing":"Klimmend","habit.upright":"Rechtop","habit.rosette":"Rozet","habit.root":"Wortelgewas","habit.bulb":"Bol","reason.soil_too_cold":"Grond is {soil} \xB0C; {plant} heeft {min} \xB0C nodig om te kiemen.","reason.soil_too_hot":"Grond is {soil} \xB0C; boven {max} \xB0C kiemt {plant} slecht.","reason.frost_forecast":"Vorst ({temp} \xB0C) verwacht voor {date}; {plant} is vorstgevoelig.","reason.window_open":"Het venster is open.","reason.window_not_yet":"Venster opent {date}.","reason.window_closed":"Venster sloot op {date}.","reason.not_greenhouse_suitable":"{plant} is niet geschikt voor de kas.","compat.friend":"{a} en {b} zijn goede buren: {reason}","compat.enemy":"{a} en {b} kun je beter niet samen planten: {reason}","compat.overlap":"{a} en {b} overlappen - te weinig ruimte.","compat.rotation":"{family} stond in {season} in {bed}; wacht {years} jaar.","compat.same_family_adjacent":"{a} en {b} zijn familie en delen plagen.","alert.frost":"Vorstrisico {level}: {temp} \xB0C verwacht {when}","alert.heat":"Hittestress in {zone}: {temp} \xB0C verwacht","alert.dry":"{bed} is droog ({moisture}%)","alert.sensor_stale":"Sensor {entity} heeft al een tijd niets gemeld","alert.forecast_unavailable":"Weersverwachting niet beschikbaar","when.tonight":"vannacht","when.tomorrow_night":"morgennacht","nav.handbook":"Handboek","nav.print":"Afdrukken","type.soil_prep":"Bodem klaarmaken","type.compost":"Compost","type.green_manure":"Groenbemester","type.mulch":"Mulchen","type.clean_greenhouse":"Serre kuisen","type.winter_prep":"Winterklaar maken","type.plan_season":"Seizoen plannen","type.tool_care":"Gereedschap","type.soil_test":"Bodemanalyse","type.cut_back":"Terugsnoeien","type.divide":"Scheuren","type.protect":"Beschermen","type.clean":"Opruimen","type.tie_in":"Aanbinden","type.thin_fruit":"Vruchten dunnen","type.pollinate":"Bestuiven","type.check":"Controleren","type.make_feed":"Plantengier maken","category.vegetable":"Groenten","category.herb":"Kruiden","category.fruit":"Fruit","category.flower":"Bloemen","feature.path":"Grindpad","feature.compost":"Composthoop / -vat","feature.water_butt":"Regenton","feature.shed":"Tuinhuis","feature.tree":"Boom","feature.hedge":"Haag","feature.trellis":"Klimrek","feature.other":"Overig","stage.not_planted":"Nog niet geplant","stage.establishing":"Aanslaan","stage.vegetative":"Groei","stage.flowering":"Bloei","stage.ripening":"Afrijping","stage.harvest":"Oogst","stage.finished":"Afgelopen","compat.deters":"{a} beschermt {b}: weert {pests}.","compat.trap":"{a} lokt {pests} weg van {b} (vangplant).","compat.allelopathy":"{a} scheidt groeiremmende stoffen af - houd uit de buurt van {b}.","compat.competition":"{a} en {b} zijn allebei zware eters zo dicht bij elkaar - geef extra compost of meer ruimte.","compat.shading":"{a} (ongeveer {height} cm hoog) zal {b} beschaduwen - zet hoge gewassen aan de kant weg van de zon.","compat.shade_benefit":"{a} geeft {b} welkome zomerschaduw.","alert.disease":"Ziekterisico {level} in {zone}","alert.nutrients":"Voedingsbalans in {bed}: {status}","autoplan.bed_not_empty":"{bed} heeft dit seizoen al gewassen - vink 'vervangen' aan om het opnieuw te plannen.","autoplan.no_beds":"Geen lege bedden om te vullen. Kies bedden en vink 'vervangen' aan.","autoplan.compost_short":"Er is ongeveer {need} kg compost nodig, je hebt {have} kg.","autoplan.time_over":"Ongeveer {need} min werk per week - meer dan de {have} min die je hebt.","autoplan.wanted_missing":"Geen plaats voor: {plants}.","autoplan.consider_irrigation":"Ongeveer {liters} L water in een droge zomerweek - druppelbevloeiing of een regenton bespaart je tijd.","autofill.title":"Automatisch invullen","autofill.intro":"Stelt gewassen, hoeveelheden en plaatsen voor seizoen {season} voor op basis van je bedden en middelen. Er verandert niets tot je het toepast.","autofill.household":"Personen in het gezin","autofill.hours":"Uren per week","autofill.water":"Water per week (L)","autofill.compost":"Beschikbare compost (kg)","autofill.has_irrigation":"Druppelbevloeiing / automatisch water geven aanwezig","autofill.goals":"Doelen","autofill.wanted":"Zeker erbij","autofill.excluded":"Nooit","autofill.beds":"Bedden","autofill.all_empty":"(alle lege bedden)","autofill.replace":"Gewassen van dit seizoen in de gekozen bedden vervangen","autofill.propose":"Voorstel maken","autofill.apply":"In het plan zetten","autofill.applied":"{n} teelten toegevoegd aan het plan","autofill.skipped":"Niet geplaatst","autofill.sum_crops":"{n} gewassen","autofill.sum_yield":"\u2248 {kg} kg oogst","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in een piekweek","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Verse groenten","autofill.goal.storage":"Bewaargroenten","autofill.goal.herbs":"Kruiden","autofill.goal.pollinators":"Bestuivers","autofill.goal.winter":"Wintergroenten","autofill.goal.perennials":"Vaste planten","autofill.goal.easy":"Weinig onderhoud","autofill.reason.no_suitable_bed":"geen geschikt bed","autofill.reason.no_space":"geen plaats","autofill.reason.time_budget":"tijdsbudget","autofill.reason.water_budget":"waterbudget","cal.timeline":"Tijdlijn","cal.garden_work":"Tuinwerk","cal.growing":"Groeit","cal.harvest_estimate":"Oogst verwacht rond {date}","cal.harvest_estimate_short":"Verwachte oogst (graaddagen)","cal.last_frost":"Laatste vorst","cal.first_frost":"Eerste vorst","cal.frost_dates":"Vorstdata","cal.no_plantings":"Dit seizoen nog geen gewassen gepland.","ctx.title":"Nu","ctx.moisture":"Bodemvocht","ctx.soil_temp":"Bodemtemperatuur","ctx.irrigation":"Water geven","ctx.water_balance":"Watertekort","ctx.nutrients":"Voedingsbalans","ctx.air_temp":"Luchttemperatuur","ctx.humidity":"Luchtvochtigheid","ctx.disease":"Ziekterisico","ctx.frost":"Vorstrisico","ctx.today":"Vandaag","ctx.rain":"Regen vandaag","ctx.et0":"Verdamping (ET\u2080)","dash.gdd_today":"Graaddagen vandaag","dash.water_climate":"Water & klimaat","dash.irrigation_mode":"Bewatering","dash.watering_now":"Bezig met {bed}","dash.stop":"Stop","dash.beds_need_water":"Bedden die water nodig hebben","dash.water_now":"Nu water geven","dash.safety_note":"Vorstvergrendeling, regen overslaan en maximale looptijd gelden altijd.","dash.disease_risk":"Ziekterisico","dash.nutrients":"Voeding","dash.water_balance":"Watertekort","dash.irrigation_started":"Bewatering gestart ({min} min)","dash.irrigation_stopped":"Bewatering gestopt","dash.irrigation_nothing":"Nu niets om water te geven","handbook.title":"Tuinhandboek","handbook.intro":"De achtergrond bij alles wat Hortulus aanraadt: bodem, zaaien, water, bemesting, vruchtwisseling, de serre en het tuinjaar.","handbook.contents":"Inhoud","handbook.overview":"Overzicht","handbook.glossary":"Woordenlijst","handbook.search":"Zoeken in het handboek","handbook.results":"Resultaten voor \u201C{query}\u201D","handbook.no_results":"Niets gevonden.","handbook.read_more":"Lees meer in het handboek","lib.category":"Categorie","lib.count":"{n} planten","lib.perennial":"overblijvend","lib.height":"Hoogte","lib.roots":"wortels","lib.gdd":"Graaddagen tot oogst","lib.base":"basis","lib.per_person":"Planten per persoon \xB7 opbrengst","lib.deters":"Weert","lib.trap_for":"Vangplant voor","lib.allelopathic":"Remt buren","lib.shade_tolerant":"Verdraagt schaduw","lib.plant":"Plant","planner.layer_zones":"Zones tonen","planner.layer_features":"Paden & elementen tonen","planner.layer_plantings":"Gewassen tonen","planner.add_feature":"Element","planner.align.left":"Links uitlijnen","planner.align.right":"Rechts uitlijnen","planner.align.top":"Boven uitlijnen","planner.align.bottom":"Onder uitlijnen","planner.align.hcenter":"Horizontaal centreren","planner.align.vcenter":"Verticaal centreren","planner.align.hdistribute":"Horizontaal verdelen","planner.align.vdistribute":"Verticaal verdelen","planner.aligned":"{n} items uitgelijnd","planner.moved_n":"{n} items verplaatst","planner.removed_n":"{n} items verwijderd","planner.selected_n":"{n} geselecteerd","planner.multi_hint":"Shift- of Ctrl-klik om meerdere bedden of gewassen te kiezen; sleep, lijn uit of verdeel ze daarna.","planner.alternatives":"Past in","planner.better_neighbours":"Betere buren","planner.heat_stress":"{n} hete dagen op komst","print.options":"Afdrukopties","print.document":"Document","print.page":"Papier","print.orientation":"Richting","print.portrait":"Staand","print.landscape":"Liggend","print.colors":"Kleuren","print.beds":"Bedden","print.days":"Dagen vooruit","print.title":"Titel","print.notes":"Notitievlak (stippelraster)","print.grid":"Raster van 10 cm op bedfiches","print.labels":"Gewasnamen op de kaart","print.download":"PDF downloaden","print.refresh":"Voorbeeld vernieuwen","print.save_config":"Opslaan in /config/hortulus/exports","print.saved_to_config":"PDF opgeslagen (/config/hortulus/exports)","print.preview":"Voorbeeld","print.empty":"Nog geen voorbeeld.","print.page_n":"Pagina {n} van {total}","print.all_greenhouses":"Alle serres","print.all_zones":"Alle zones","print.remarkable_hint":"reMarkable Paper Pro: 179,6 \xD7 239,5 mm, extra marge links voor de werkbalk. E-inkkleuren gebruiken lichte tinten en patronen zodat je pen zichtbaar blijft. Stuur de PDF via de reMarkable-app of e-mail.","print.doc.garden":"Tuinplan","print.doc.garden.hint":"Zones, bedden, gewassen, legende","print.doc.zone":"Serre / zone","print.doc.zone.hint":"E\xE9n zone, ingezoomd","print.doc.beds":"Bedfiches","print.doc.beds.hint":"Een pagina per bed met raster","print.doc.tasks":"Takenlijst","print.doc.tasks.hint":"Open taken per week","print.doc.season":"Seizoensoverzicht","print.doc.season.hint":"Tijdlijn zaaien \u2192 oogst","print.doc.blank":"Planningsblad","print.doc.blank.hint":"Omtrekken om op te schetsen","print.doc.plants":"Plantkaarten","print.doc.plants.hint":"Kerngegevens per gewas","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Volle kleur","print.color.eink":"E-ink (licht + patronen)","print.color.grayscale":"Grijstinten","settings.irrigation_hw":"Bewateringshardware","settings.irrigation_mode":"Modus","settings.irrigation_mode.off":"Uit","settings.irrigation_mode.advise":"Advies (alleen taken)","settings.irrigation_mode.auto":"Automatisch","settings.pump":"Pomp (schakelaar)","settings.start_time":"Starttijd","settings.max_runtime":"Max. looptijd per klep (min)","settings.frost_lockout":"Vorstvergrendeling onder (\xB0C)","settings.rain_skip":"Overslaan bij regenverwachting \u2265 (mm)","settings.pump_lead":"Pomp stopt v\xF3\xF3r klep (s)","settings.irrigation_hint":"{n} bedden hebben een klep. Stel per bed het debiet (L/min) in bij Bedden.","settings.resources":"Middelen (automatisch invullen)","settings.maintenance_tasks":"Seizoenswerk in de kalender (bodem klaarmaken, serre kuisen, winterrust ...)","settings.open_meteo":"Open-Meteo gebruiken voor vocht, wind en zon","settings.open_meteo_hint":"Optioneel en standaard uit: stuurt de afgeronde co\xF6rdinaten van de tuin naar api.open-meteo.com. Verbetert de verdampingsberekening (Penman-Monteith).","settings.elevation":"Hoogte (m)","settings.shade_entity":"Schaduwscherm (cover of schakelaar)","settings.climate_control":"Luchten & schaduw sturen","settings.climate_control.off":"Uit","settings.climate_control.advise":"Advies (taken)","settings.climate_control.auto":"Automatisch","settings.wall_heat":"Tegen een warme muur","settings.thermal_mass":"Thermische massa (watervaten, steen)","settings.sensor.par":"Licht (PAR)","settings.sensor.leaf_wetness":"Bladnat","settings.sensor.ec":"Bodem-EC","settings.sensor.npk_n":"Stikstof (N)","settings.sensor.npk_p":"Fosfor (P)","settings.sensor.npk_k":"Kalium (K)","task.postponed":"{title} {n} dag(en) uitgesteld","common.done":"Klaar","planner.removed_from":"{name} verwijderd vanaf seizoen {season} (historiek blijft).","planner.steps":"Bouw je tuinplan op in drie stappen","planner.step.site":"Terrein tekenen","planner.step.site.hint":"zones & elementen","planner.step.zones":"Zones inrichten","planner.step.zones.hint":"naam, bedden, eigen kaart","planner.step.plant":"Beplanten","planner.step.plant.hint":"zelf of door het systeem","planner.whole_garden":"Hele tuin","planner.zone_map":"Zonekaart","planner.site_intro":"Kies een zonetype of element en sleep een rechthoek op het raster (vakjes van 10 \xD7 10 cm). E\xE9n klik plaatst een standaardmaat. Dubbelklik op een zone om haar eigen kaart te openen.","planner.zones":"Zones","planner.elements":"Paden, gazon, bomen & meer","planner.your_zones":"Jouw zones","planner.no_zones":"Nog geen zones - begin met je moestuin, serre of boomgaard.","planner.open_zone":"Zonekaart openen","planner.next":"Volgende","planner.zones_intro":"Open een zone om ze een naam te geven en haar bedden op een eigen kaart te tekenen. Bomen en struiken in een boomgaard- of fruitzone blijven daar jaar na jaar staan.","planner.n_beds":"{n} bedden","planner.zone_name":"Naam van de zone","planner.beds_in_zone":"Bedden & elementen in deze zone","planner.draw_bed":"Bed","planner.fill_by_hand":"Zelf invullen","planner.fill_by_system":"Laat het systeem invullen","planner.bed_needs_zone":"Teken een bed binnen een zone.","planner.draw_hint":"Sleep op het raster om te tekenen: {what}","planner.palette_for_zone":"Je ziet planten die passen in {zone}. Kies een categorie om alles te zien.","planner.perennial":"meerjarig","planner.bears_after":"vruchten na ~{n} jaar","planner.perennial_since":"Meerjarig - staat er sinds {season} en gaat elk jaar mee tot je hem verwijdert.","planner.bearing_from":"Eerste oogst verwacht vanaf {season}.","planner.eco_tips":"Ecotips & huis-tuin-en-keukenmiddeltjes","planner.remove_perennial":"{name} verwijderen?","planner.remove_perennial_intro":"{name} werd geplant in {season} en staat elk jaar in je plan. Wat is er gebeurd?","planner.remove_from_season":"Weg vanaf {season}","planner.remove_from_season_hint":"Vorige jaren behouden hem (wisselteelthistoriek, oogsten, notities).","planner.remove_everywhere":"Volledig wissen","planner.remove_everywhere_hint":"Alsof hij nooit geplant werd - ook uit vorige jaren.","planner.legend.perennial":"meerjarig (blijft staan)","planner.legend.warning":"waarschuwing buren / wisselteelt","planner.legend.succession":"opeenvolgende zaai","planner.legend.rows":"zaairijen","planner.legend.border":"Randkleur = plantenfamilie (voor wisselteelt); het icoon toont het gewas zelf.","settings.zone_type.orchard":"Boomgaard","settings.zone_type.fruit":"Kleinfruit","settings.zone_type.herbs":"Kruidentuin","settings.zone_type.flowers":"Bloementuin","zone_hint.outdoor":"Moestuin: eenjarige gewassen met wisselteelt, bedden en paden.","zone_hint.greenhouse":"Serre: warmteminnende gewassen, klimaatsturing, verluchten en schaduw.","zone_hint.cold_frame":"Koude bak: afharden, vroege en late slaatjes.","zone_hint.orchard":"Boomgaard: fruitbomen die decennia blijven - jaarlijks snoeien, dunnen en oogsten.","zone_hint.fruit":"Kleinfruit: bessen, frambozen, druiven en kiwibessen.","zone_hint.herbs":"Kruidentuin: meerjarige en eenjarige kruiden, een bijenmagneet.","zone_hint.flowers":"Bloementuin: bestuivers, nuttige insecten en snijbloemen.","feature.terrace":"Terras","feature.lawn":"Gazon","feature.flowerbed":"Bloemperk","feature.fence":"Omheining","feature.pond":"Vijver","pollination.insects":"Heeft insecten nodig voor bestuiving - zet bloemen in de buurt.","pollination.wind":"Windbestuiving - plant in blokken, niet in \xE9\xE9n rij.","pollination.partner":"Heeft een bestuivingspartner (tweede ras) in de buurt nodig.","pollination.none":"Geen bestuiving nodig (blad, wortels).","planner.more":"Meer","settings.reminders":"Herinneringen","settings.overdue_reminders":"Herinner me aan blijven liggende taken","settings.overdue_time":"Tijdstip herinnering","settings.overdue_after":"Herinneren na (dagen te laat)","settings.weekly_plan":"Weekoverzicht vooraf","settings.weekly_day":"Dag","settings.weekly_time":"Tijdstip","settings.weather_aware":"Taken plannen volgens het weer","settings.weather_aware_hint":"Zaaien, uitplanten, spuiten, snoeien en mulchen schuiven automatisch naar de beste droge, vorstvrije en niet te hete dag binnen hun venster.","feature.house":"Huis","feature.driveway":"Oprit","feature.street":"Straat","feature.parking":"Parking","feature.play":"Speelhoek","feature.beehive":"Bijenkast","autofill.prefs":"Voorkeuren","autofill.freedom":"Keuzevrijheid van het systeem","autofill.freedom.strict":"Enkel wat ik wil","autofill.freedom.balanced":"Mijn wensen + doelen","autofill.freedom.free":"Vrij: verras me","autofill.pref.respect_companions":"Rekening houden met plantenburen","autofill.pref.add_pollinators":"Zelf bestuivingsbloemen toevoegen","autofill.pref.year_round":"Streven naar oogst het hele jaar","autofill.pref.allow_perennials":"Meerjarigen toegestaan","autofill.pref.match_zone_type":"Zonetype respecteren (boomgaard = fruit \u2026)","autofill.reason.pollinators":"bestuivers","nav.advice":"Advies","task.tools":"Je hebt nodig","advice.ask_title":"Vraag het aan Hortulus","advice.i_have":"Ik heb een","advice.mode.question":"vraag","advice.mode.problem":"probleem","advice.about":"met / over","advice.subject":"Onderwerp","advice.target":"Welke","advice.problem":"Vraag","advice.ask":"Vraag","advice.in_garden":"In je tuin","advice.all_plants":"Alle planten","advice.whole_garden":"de hele tuin","advice.subject.plant":"een plant / groente / fruit","advice.subject.greenhouse":"mijn serre","advice.subject.garden":"mijn tuin","advice.subject.bed":"een bed","advice.subject.tools":"gereedschap & benodigdheden","advice.q.status":"Hoe staat het ervoor?","advice.q.what_to_do":"Wat moet ik nu doen?","advice.q.when_sow":"Wanneer zaaien of planten?","advice.q.when_harvest":"Wanneer oogsten?","advice.q.growth":"het groeit slecht","advice.q.yellow_leaves":"gele bladeren","advice.q.wilting":"het hangt slap / verwelkt","advice.q.no_fruit":"bloeit maar geeft geen vruchten","advice.q.bolting":"het schiet door","advice.q.pests":"er zitten beestjes op","advice.q.disease":"vlekken, schimmel of rot","advice.q.feeding":"Hoe bemesten?","advice.q.watering":"Hoeveel water?","advice.q.pruning":"Hoe snoeien?","advice.q.companions":"Wat zet ik ernaast?","advice.q.too_hot":"het is te warm","advice.q.too_cold":"het is te koud","advice.q.winter_crops":"Wat kan er in de winter?","advice.q.year_round":"Hoe oogst ik het hele jaar?","advice.q.soil":"mijn grond is slecht","advice.q.slugs":"slakken!","advice.q.frost":"er komt vorst","advice.q.what_next":"Wat zet ik er hierna in?","advice.q.for_task":"Welk gereedschap voor deze klus?","advice.q.shopping":"Wat moet ik kopen?","advice.sec.status":"Nu in je tuin","advice.sec.facts":"Goed om te weten","advice.sec.causes":"Mogelijke oorzaken","advice.sec.actions":"Wat nu doen","advice.sec.remedies":"Eco- & huis-tuin-en-keukenmiddeltjes","advice.sec.prevention":"Volgende keer voorkomen","advice.sec.tasks":"Open taken","advice.read_more":"Lees meer in het handboek","advice.suggestions":"Voorstellen voor je tuin","advice.suggestions_intro":"Hortulus kijkt naar plaatsing, bestuiving, buren, oogst het hele jaar, bodem en ecologie.","advice.none":"Geen voorstellen - je plan ziet er prima uit!","advice.apply_add":"Toevoegen aan plan","advice.apply_open":"Toon in planner","advice.dismiss":"Verbergen","advice.no_space":"Geen vrije plaats in {bed}.","advice.kind.pollination":"Bestuiving","advice.kind.neighbours":"Buren","advice.kind.placement":"Plaatsing","advice.kind.year_round":"Hele jaar","advice.kind.soil":"Bodem","advice.kind.eco":"Ecologie","advice.kind.growth":"Groei","advice.kind.greenhouse":"Serre","advice.coverage":"Oogst per maand","advice.coverage_gaps":"Rode maanden hebben niets te oogsten - de voorstellen tonen wat ze opvult.","advice.coverage_full":"Elke maand iets te oogsten.","advice.nothing":"niets","advice.shopping":"Boodschappenlijst dit seizoen","advice.shopping_intro":"Berekend uit je plan: zaad, plantgoed, compost, bescherming en steun.","advice.nothing_to_buy":"Nog niets te kopen - plan eerst enkele teelten.","advice.tools_per_task":"Gereedschap per klus","advice.read_tools":"Gereedschap & zelf bemesting maken","advice.cat.seeds":"Zaad","advice.cat.plants":"Plantgoed","advice.cat.soil":"Bodem & bemesting","advice.cat.protection":"Bescherming","advice.cat.support":"Steun & mulch","advice.cat.other":"Overig","print.doc.year":"Jaarplan","print.doc.year.hint":"Maandmatrix: zaaien, planten, oogsten","nav.journal":"Logboek","task.assignee":"Toegewezen aan","task.anyone":"iedereen","task.harvested":"Geoogst:","journal.diary":"Dagboek","journal.harvest":"Oogst","journal.seeds":"Zaadvoorraad","journal.water":"Water","journal.new":"Nieuwe dagboeknotitie","journal.text":"Wat zag of deed je?","journal.placeholder":"Eerste tomaten kleuren, luizen op de tuinbonen \u2026","journal.kind":"Soort","journal.kind.note":"Notitie","journal.kind.observation":"Waarneming","journal.kind.problem":"Probleem","journal.kind.milestone":"Mijlpaal","journal.link":"Over","journal.whole_garden":"de hele tuin","journal.beds":"Bedden","journal.crops":"Teelten dit seizoen","journal.add_photo":"Foto toevoegen","journal.save":"Opslaan","journal.saved":"Bewaard in het dagboek.","journal.filter":"Filter","journal.all":"Alles","journal.empty":"Nog geen notities - schrijf op wat je ziet: de beste tuinleraar.","journal.log_harvest":"Oogst registreren","journal.what":"Gewas","journal.kg":"Gewicht (kg)","journal.count":"Aantal","journal.day":"Datum","journal.quality":"Kwaliteit","journal.learn_hint":"Hortulus leert hieruit je eigen opbrengst per m\xB2 en gebruikt die bij Automatisch invullen en advies.","journal.harvest_saved":"Oogst bewaard.","journal.harvest_season":"Oogst {season}","journal.crops_n":"{n} gewassen","journal.yield":"jouw opbrengst {kg} kg/m\xB2 (database {db})","journal.recent":"Laatste registraties","journal.no_harvest":"Nog niets geregistreerd.","journal.add_seed":"Zaadzakje toevoegen","journal.variety":"Ras","journal.year":"Jaar","journal.quantity":"Hoeveelheid","journal.unit":"Eenheid","journal.unit.packet":"zakje(s)","journal.unit.seeds":"zaden","journal.unit.g":"g","journal.source":"Herkomst","journal.source_hint":"winkel, ruil, eigen zaad \u2026","journal.seed_saved":"Zaadzakje bewaard.","journal.seed_missing":"Nog nodig voor dit seizoen","journal.seed_hint":"Zaad blijft 1-2 jaar (pastinaak, ui) tot 5-6 jaar (kolen, pompoenachtigen) goed. Oud zaad: doe een kiemproef.","journal.seed_box":"Zaaddoos","journal.status":"Status","journal.needed":"nodig dit seizoen","journal.seed.ok":"goed","journal.seed.use_soon":"dit jaar opmaken","journal.seed.expired":"oud (test het)","journal.seed.empty":"op","journal.seed.unknown":"jaar onbekend","journal.no_seeds":"Nog geen zaadzakjes.","journal.water_setup":"Koppel een watermeter en/of een niveausensor van de regenton in Instellingen \u203A Water om je tuinwater te volgen.","journal.water_week":"Leidingwater, 7 dagen","journal.water_season":"Leidingwater dit jaar","journal.rain_available":"Beschikbaar regenwater","journal.per_day":"Per dag (laatste 14 dagen)","journal.water_hint":"Watertaken vermelden hoeveel regenwater er nog is, zodat je dat eerst gebruikt.","cal.year":"Jaar","cal.tasks_per_month":"Taken","cal.act.sow_indoor":"binnen zaaien","cal.act.sow":"zaaien","cal.act.plant":"uitplanten","cal.act.grow":"groeit","cal.act.harvest":"oogsten","cal.act_short.sow_indoor":"Z","cal.act_short.sow":"Z","cal.act_short.plant":"P","cal.act_short.harvest":"O","settings.water":"Watermeter & regenton","settings.water_meter":"Watermeter tuin (m\xB3 of L)","settings.butt_level":"Peil regenton (%)","settings.butt_capacity":"Totale inhoud regentonnen (L)","settings.water_hint":"Hortulus bewaart \xE9\xE9n meting per dag. Je krijgt het verbruik per week, het regenwater dat nog beschikbaar is, en watertaken zeggen hoeveel je daarvan eerst kunt gebruiken.","settings.household":"Huishouden & spraak","settings.nobody":"Niemand (niet toegewezen)","settings.default_person":"Standaard gebruiken","settings.no_persons":"Geen personen gevonden. Voeg personen toe via Instellingen \u2192 Personen om taken toe te wijzen.","settings.assign_default":"Nieuwe taken gaan naar","settings.assign_per_type":"Per soort taak","settings.person_notify":"Persoonlijke herinneringen","settings.person_notify_hint":"Iedereen krijgt zijn eigen taken via deze notify-dienst (dagoverzicht en herinneringen voor achterstallige taken).","settings.voice":"Spraak (Assist)","settings.voice_hint":"Vraag Assist \u201Ewat moet ik vandaag in de tuin doen?\u201D, \u201Ehoeveel heb ik geoogst?\u201D, \u201Evriest het vannacht?\u201D. Installeer de zinnen \xE9\xE9n keer; ze werken in het Nederlands en Engels.","settings.voice_install":"Spraakzinnen installeren","settings.voice_installed":"Spraakzinnen ge\xEFnstalleerd","soil_test.title":"Bodemanalyse","soil_test.none":"Nog geen bodemanalyse.","soil_test.add":"Bodemanalyse toevoegen","soil_test.om":"Organische stof (%)","soil_test.lime":"Kalktoestand","soil_test.lime.low":"te laag","soil_test.lime.ok":"goed","soil_test.lime.high":"hoog","soil_test.hint":"Labo-rapport of thuistest. Hortulus past het bemestingsplan en kalkadvies van dit bed aan de laatste analyse aan.","cal.hours":"{n} u","planner.other_season":"{name} (seizoen {year})","journal.system":"Systeemlogboek","syslog.intro":"Elke wijziging in Hortulus staat hier: wat jij of een ander deed in het paneel, via automatiseringen, en wat Hortulus zelf aanpaste (taken, opruimen). Draai een regel terug om de toestand van v\xF3\xF3r die actie te herstellen; het terugdraaien zelf komt ook in het logboek en kan je dus weer ongedaan maken.","syslog.show_system":"Automatische acties van Hortulus tonen","syslog.empty":"Nog niets gelogd.","syslog.by_system":"Hortulus (automatisch)","syslog.by_unknown":"Automatisering of dienst","syslog.is_undone":"teruggedraaid","syslog.undo":"Terugdraaien","syslog.undone":"Teruggedraaid.","syslog.confirm":"Terugdraaien: {what}?","syslog.conflict":"{n} onderdeel/onderdelen zijn sindsdien opnieuw gewijzigd. Toch terugdraaien? Die latere wijzigingen gaan dan verloren.","syslog.blocked":"Kan niet terugdraaien: dit zou verwijzen naar een bed, zone of plant die intussen verwijderd is. Draai eerst die latere verwijdering terug.","syslog.more":"Oudere regels laden","syslog.and_more":"\u2026 en nog {n}","syslog.n_changes":"{verb} \u2013 {n} onderdelen","syslog.op.add":"Toegevoegd","syslog.op.remove":"Verwijderd","syslog.op.change":"Gewijzigd","syslog.op.mixed":"Aangepast","syslog.reason.plan":"planner","syslog.reason.import":"import","syslog.reason.tasks":"taken","syslog.reason.settings":"instellingen","syslog.reason.plants":"plantenbibliotheek","syslog.reason.records":"logboek","syslog.reason.auto":"automatisch","syslog.reason.undo":"Terugdraaiing","syslog.col.zones":"Zone","syslog.col.beds":"Bed","syslog.col.plantings":"Teelt","syslog.col.tasks":"Taak","syslog.col.custom_plants":"Eigen plant","syslog.col.features":"Tuinelement","syslog.col.harvest_log":"Oogst","syslog.col.journal":"Dagboeknotitie","syslog.col.seed_stock":"Zaadvoorraad","syslog.col.rotation_history":"Teeltgeschiedenis","syslog.col.irrigation_log":"Beregening","syslog.col.plant_overrides":"Plantgegevens","syslog.col.settings":"Instelling","planner.draw_site":"Terrein & elementen","planner.draw_planter":"Bloembak / pot","planner.draw_planter_hint":"Teken een bloembak, pot of plantenbak - die kan je daarna beplanten zoals een bed.","planner.new_planter":"Bloembak","planner.elements_in_zone":"Paden, terras, gazon, haag \u2026 in deze zone","planner.elements.buildings":"Gebouwen & verharding","planner.elements.paths":"Paden","planner.elements.green":"Groen","planner.elements.outdoor_living":"Buitenleven & uitrusting","feature.stone_path":"Stenen pad","feature.wood_path":"Houten pad","feature.stepping_stones":"Stapstenen","feature.bark_path":"Schorspad","feature.decking":"Vlonder","feature.wall":"Muur","feature.carport":"Carport / garage","feature.shrub":"Heester","feature.pool":"Zwembad","feature.seating":"Zithoek","settings.zone_type.garden":"Siertuin","settings.zone_type.containers":"Bloembakken & potten","zone_hint.garden":"Siertuin: heesters, borders en vaste planten rond gazon en terras.","zone_hint.containers":"Bloembakken & potten: op terras, balkon of vensterbank - teken elke bak of pot en beplant hem."};var mi={en:Ct,nl:ys},De=c=>(c??"en").toLowerCase().split(/[-_]/)[0]==="nl"?"nl":"en";function nt(c){let r=mi[De(c)];return(e,t={})=>(r[e]??Ct[e]??e).replace(/\{(\w+)\}/g,(n,i)=>{let a=t[i];return a==null?`{${i}}`:e.startsWith("alert.")&&i==="level"?r[`risk.${a}`]??String(a):e.startsWith("alert.")&&i==="when"?r[String(a)]??String(a):Array.isArray(a)?a.join(", "):String(a)})}var gi=c=>c.replace(/_/g," ").replace(/^\w/,r=>r.toUpperCase()),$s={aphids:"bladluis",whitefly:"witte vlieg",red_spider_mite:"spint",thrips:"trips",slugs:"slakken",cabbage_white:"koolwitje",cabbage_root_fly:"koolvlieg",flea_beetle:"aardvlo",carrot_fly:"wortelvlieg",onion_fly:"uienvlieg",leek_moth:"preimot",pea_moth:"erwtenbladroller",birds:"vogels",pigeons:"duiven",black_bean_aphid:"zwarte bonenluis",bean_weevil:"bonenkever",leaf_miner:"bladmineerder",late_blight:"phytophthora",early_blight:"alternaria (vroeg)",blossom_end_rot:"neusrot",botrytis:"grauwe schimmel",powdery_mildew:"echte meeldauw",downy_mildew:"valse meeldauw",cucumber_mosaic_virus:"komkommermoza\xEFekvirus",clubroot:"knolvoet",white_rot:"witrot",rust:"roest",alternaria:"alternaria",leaf_spot:"bladvlekken",root_rot:"wortelrot",anthracnose:"vlekkenziekte",halo_blight:"vetvlekkenziekte",chocolate_spot:"chocoladevlekken",damping_off:"kiemplantenziekte",ants:"mieren",asparagus_beetle:"aspergekever",canker:"kanker",celery_fly:"selderijvlieg",colorado_beetle:"coloradokever",nematodes:"aaltjes",scab:"schurft",smut:"builenbrand",verticillium_wilt:"verwelkingsziekte",wireworm:"ritnaald"},Fe=(c,r)=>De(r)==="nl"&&$s[c]?$s[c]:gi(c);var _s=T`
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
`,R=T`
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
`;var fi="#7d7d7d";function A(c,r){return r&&c[r]?.color||fi}function ws(c){let r=c.replace(/[^\p{L}\s]/gu,"").trim(),e=r.split(/\s+/);return e.length>1?(e[0][0]+e[1][0]).toUpperCase():(r.slice(0,2)||"?").replace(/^./,t=>t.toUpperCase())}function y(c,r){return c?c.names[r]||c.names.en||c.id:"?"}var ke={sow_indoor:"mdi:seed-outline",sow_direct:"mdi:seed",harden_off:"mdi:weather-partly-cloudy",transplant:"mdi:shovel",thin:"mdi:content-cut",stake:"mdi:pillar",prune:"mdi:scissors-cutting",pinch:"mdi:hand-back-left-outline",earth_up:"mdi:terrain",feed:"mdi:bottle-tonic-plus-outline",water:"mdi:watering-can",weed:"mdi:sprout-outline",pest_check:"mdi:bug-outline",harvest:"mdi:basket-outline",ventilate:"mdi:window-open-variant",shade:"mdi:sun-angle-outline",frost_protect:"mdi:snowflake-alert",soil_prep:"mdi:shovel",compost:"mdi:recycle",green_manure:"mdi:grass",mulch:"mdi:layers-outline",clean_greenhouse:"mdi:spray-bottle",winter_prep:"mdi:snowflake-variant",plan_season:"mdi:clipboard-text-outline",tool_care:"mdi:hammer-wrench",soil_test:"mdi:test-tube",cut_back:"mdi:content-cut",divide:"mdi:call-split",protect:"mdi:shield-sun-outline",clean:"mdi:broom",tie_in:"mdi:link-variant",thin_fruit:"mdi:fruit-cherries",pollinate:"mdi:bee-flower",check:"mdi:clipboard-check-outline",make_feed:"mdi:flask-outline",custom:"mdi:checkbox-marked-circle-outline"},xe={sow_indoor:"var(--hl-leaf-500)",sow_direct:"var(--hl-leaf-500)",transplant:"var(--hl-leaf-700)",harvest:"var(--hl-sun-500)",water:"var(--hl-water-500)",frost_protect:"var(--hl-frost-500)",ventilate:"var(--hl-frost-500)",shade:"var(--hl-sun-500)",weed:"var(--hl-soil-500)",pest_check:"var(--hl-tomato-500)",soil_prep:"var(--hl-soil-500)",compost:"var(--hl-soil-700)",green_manure:"var(--hl-leaf-600)",mulch:"var(--hl-soil-500)",clean_greenhouse:"var(--hl-frost-500)",winter_prep:"var(--hl-frost-500)",plan_season:"var(--hl-leaf-700)",protect:"var(--hl-sun-500)",clean:"var(--hl-soil-500)",tie_in:"var(--hl-leaf-600)",thin_fruit:"var(--hl-tomato-500)",pollinate:"var(--hl-sun-500)",make_feed:"var(--hl-soil-700)"},J=c=>{let[r,e,t]=c.slice(0,10).split("-").map(Number);return new Date(r,e-1,t,12)},Se=c=>`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}-${String(c.getDate()).padStart(2,"0")}`,I=(c,r)=>{let e=J(c);return e.setDate(e.getDate()+r),Se(e)},fe=(c,r)=>Math.round((J(r).getTime()-J(c).getTime())/864e5);function w(c,r,e={day:"numeric",month:"short"}){return c?J(c).toLocaleDateString(r==="nl"?"nl-NL":"en-GB",e):"\u2013"}function At(c,r){let e=c.anchor==="first_frost"?r.first_frost:r.last_frost,t=I(e,c.start_week*7),s=I(e,c.end_week*7+6);return t<=s?[t,s]:[s,t]}function ks(c,r,e){return r?c.status==="failed"||c.status==="finished"?!1:r.in_ground<=e&&e<=r.harvest_end:!0}function Ue(c){let r={urgent:3,high:2,normal:1,low:0};return[...c].sort((e,t)=>e.due===t.due?r[t.priority]-r[e.priority]:e.due<t.due?-1:1)}function te(c){let r=globalThis.crypto?.randomUUID?.()??Math.random().toString(16).slice(2)+Date.now().toString(16);return`${c}_${r.replace(/-/g,"").slice(0,10)}`}function at(c,r,e){let t=new Blob([r],{type:e}),s=URL.createObjectURL(t),n=document.createElement("a");n.href=s,n.download=c,n.click(),setTimeout(()=>URL.revokeObjectURL(s),1e3)}function ve(c,r,e){return r?c.season>e?!1:c.removed_season==null||e<c.removed_season:c.season===e}var xs={outdoor:["vegetable","herb","flower"],greenhouse:["vegetable","herb","fruit"],cold_frame:["vegetable","herb"],orchard:["fruit"],fruit:["fruit"],herbs:["herb","flower"],flowers:["flower","herb"],garden:["flower","herb","fruit"],containers:["vegetable","herb","flower","fruit"]};var rt=null;function Ss(c){rt=c}function Lt(c){return(rt?.task_tools[c]??[]).map(e=>`${rt?.tools[e]?.emoji??""} ${rt?.tools[e]?.name??e}`.trim()).join(", ")}var Ht=[];function Ms(c){Ht=Object.values(c.states).filter(r=>r.entity_id.startsWith("person.")).map(r=>({id:r.entity_id,name:String(r.attributes.friendly_name??r.entity_id.slice(7))})).sort((r,e)=>r.name.localeCompare(e.name))}var Ge=()=>Ht,Es=c=>c&&Ht.find(r=>r.id===c)?.name||(c?c.replace(/^person\./,""):"");var Ts={},It=new Set;function zs(c){Ts=c,It.forEach(r=>r())}function vi(c,r){c.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:r},bubbles:!0,composed:!0}))}var Me=null,le=class extends E{constructor(){super(...arguments);this.term="";this.open=!1;this.refresh=()=>this.requestUpdate();this.outside=e=>{e.composedPath().includes(this)?this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0}):this.close()}}connectedCallback(){super.connectedCallback(),It.add(this.refresh)}disconnectedCallback(){super.disconnectedCallback(),It.delete(this.refresh),Me===this&&(Me=null)}toggle(e){e.stopPropagation(),e.preventDefault(),!this.open&&Me&&Me!==this&&Me.close(),this.open=!this.open,Me=this.open?this:null,this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0})}close(){this.open=!1}onKey(e){e.key==="Escape"&&this.close()}render(){let e=Ts[this.term],t=e?.term??this.term;return l`<button class="i" aria-label=${t} aria-expanded=${String(this.open)} @click=${this.toggle} @keydown=${this.onKey}>
        <ha-icon icon="mdi:information-outline"></ha-icon></button>
      ${this.open&&e?l`<div class="pop" role="tooltip"><b>${e.term}</b>${e.text}
            ${e.chapter?l`<br /><a @click=${()=>{this.close(),vi(this,e.chapter)}}>${this.t?.("handbook.read_more")??"Read more"} →</a>`:p}
          </div>`:p}`}};le.styles=T`
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
  `,u([g()],le.prototype,"term",2),u([g({attribute:!1})],le.prototype,"t",2),u([f()],le.prototype,"open",2),le=u([P("hl-info")],le);var ot=80,lt=new WeakMap;function bi(c){c.pointerType!=="mouse"&&lt.set(c.currentTarget,{x:c.clientX,y:c.clientY,dx:0,active:!1,id:c.pointerId})}function yi(c){let r=c.currentTarget,e=lt.get(r);if(!e||e.id!==c.pointerId)return;let t=c.clientX-e.x,s=c.clientY-e.y;!e.active&&Math.abs(t)>12&&Math.abs(t)>Math.abs(s)*1.5&&(e.active=!0,r.setPointerCapture(c.pointerId)),e.active&&(e.dx=t,r.style.transform=`translateX(${Math.max(-140,Math.min(140,t))}px)`,r.dataset.swipe=t>ot?"complete":t<-ot?"postpone":"")}function js(c,r,e){let t=c.currentTarget,s=lt.get(t);lt.delete(t),t.style.transform="",delete t.dataset.swipe,s?.active&&(c.preventDefault(),s.dx>ot&&r.status==="open"?e.onComplete(r):s.dx<-ot&&r.status==="open"&&e.onPostpone&&e.onPostpone(r,1))}function qe(c,r){let e=c.status==="open"&&c.due<r.today,t=c.status!=="open",s=xe[c.type]??"var(--hl-soil-500)";return l`
    <li class="task-row ${t?"done":""} prio-${c.priority}" @pointerdown=${bi} @pointermove=${yi}
      @pointerup=${n=>js(n,c,r)} @pointercancel=${n=>js(n,c,r)}>
      <button class="check" role="checkbox" aria-checked=${String(t)} aria-label=${`${r.t("task.complete")}: ${c.title}`}
        ?disabled=${t} @click=${()=>r.onComplete(c)}>
        <ha-icon icon=${t?"mdi:check-circle":"mdi:checkbox-blank-circle-outline"}></ha-icon>
      </button>
      <button class="task-main" @click=${()=>r.onOpen(c)}>
        <span class="type-icon" style=${`color:${s}`}><ha-icon icon=${ke[c.type]}></ha-icon></span>
        <span class="task-text">
          <span class="task-title">${c.title}</span>
          <span class="task-meta">
            ${e?l`<span class="chip bad">${r.t("common.overdue")} · ${w(c.due,r.lang)}</span>`:l`<span>${w(c.due,r.lang,{weekday:"short",day:"numeric",month:"short"})}</span>`}
            <span>· ${r.t("common.minutes",{n:c.estimated_minutes})}</span>
            ${c.recurrence?l`<span title=${r.t("task.repeat",{n:c.recurrence.interval_days})}>· ↻ ${c.recurrence.interval_days}d</span>`:p}
            ${c.priority==="urgent"||c.priority==="high"?l`<span class="chip ${c.priority==="urgent"?"bad":"warn"}">${r.t(`priority.${c.priority}`)}</span>`:p}
            ${c.assignee?l`<span class="chip" title=${r.t("task.assignee")}><ha-icon icon="mdi:account-outline" style="--mdc-icon-size:14px"></ha-icon>${Es(c.assignee)}</span>`:p}
          </span>
        </span>
      </button>
    </li>`}var dt=T`
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
`,O=class extends E{constructor(){super(...arguments);this.task=null;this.beds=[];this.lang="en";this.today="";this.create=!1;this.snapshot=null;this.note="";this.harvestKg=0;this.harvestCount=0;this.photos=[];this.busy=!1;this.error=""}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&(this.task||this.create)&&e.showModal()}close(e=!1){this.note="",this.photos=[],this.error="",this.dispatchEvent(new CustomEvent("closed",{detail:{changed:e}}))}async run(e,t){this.busy=!0;try{await e(),t&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t},bubbles:!0,composed:!0})),this.close(!0)}catch(s){this.error=s.message??String(s)}finally{this.busy=!1}}async onPhoto(e){let t=e.target.files?.[0];if(t){this.busy=!0;try{this.photos=[...this.photos,await this.api.uploadPhoto(t)]}catch(s){this.error=s.message}finally{this.busy=!1}}}submitNew(e){e.preventDefault();let t=e.target,s=n=>t.elements.namedItem(n).value;this.run(()=>this.api.addTask({title:s("title"),due:s("due")||null,task_type:s("type"),description:s("description"),priority:s("priority"),estimated_minutes:Number(s("minutes"))||null,bed_id:s("bed")||null,recurrence_days:Number(s("repeat"))||null}))}renderCreate(){let e=["custom","water","weed","feed","pest_check","harvest","prune","stake","sow_direct","transplant","ventilate","frost_protect"];return l`<form @submit=${this.submitNew}>
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
        ${this.error?l`<p class="field-error">${this.error}</p>`:p}
      </div>
      <div class="foot">
        <button type="button" class="btn ghost" @click=${()=>this.close()}>${this.t("common.cancel")}</button>
        <button class="btn primary" type="submit" ?disabled=${this.busy}>${this.t("common.add")}</button>
      </div>
    </form>`}renderContext(e){let t=this.snapshot?.analysis;if(!t)return p;let s=[],n=e.bed_id?t.beds[e.bed_id]:void 0,i=e.zone_id??this.snapshot?.beds.find(h=>h.id===e.bed_id)?.zone_id,a=i?t.zones[i]:void 0,o=(h,m,v=0)=>h==null?null:`${h.toFixed(v)} ${m}`;if(n){let h=o(n.irrigation.moisture,"%");h&&s.push([this.t("ctx.moisture"),h]);let m=n.sensors?.soil_temperature?.value;m!=null&&s.push([this.t("ctx.soil_temp"),`${m.toFixed(1)} \xB0C`]),n.irrigation.action!=="none"&&s.push([this.t("ctx.irrigation"),this.t(`irrigation.${n.irrigation.action}`,{mm:n.irrigation.amount_mm,liters:Math.round(n.irrigation.liters)})]),n.depletion_mm!=null&&n.taw_mm&&s.push([this.t("ctx.water_balance"),`${n.depletion_mm.toFixed(0)} / ${n.taw_mm.toFixed(0)} mm`]),n.nutrients?.index!=null&&s.push([this.t("ctx.nutrients"),`${n.nutrients.index} / 100`])}a&&(a.air_temperature!=null&&s.push([this.t("ctx.air_temp"),`${a.air_temperature.toFixed(1)} \xB0C`]),a.humidity!=null&&s.push([this.t("ctx.humidity"),`${Math.round(a.humidity)} %`]),a.disease&&a.disease.level!=="unknown"&&s.push([this.t("ctx.disease"),this.t(`risk.${a.disease.level}`)]),a.frost.level!=="unknown"&&s.push([this.t("ctx.frost"),`${this.t(`risk.${a.frost.level}`)}${a.frost.plant_level_min_c!=null?` \xB7 ${a.frost.plant_level_min_c.toFixed(1)} \xB0C`:""}`]));let d=t.outlook[0];return d&&(d.tmin!=null&&d.tmax!=null&&s.push([this.t("ctx.today"),`${d.tmin.toFixed(0)}\u2013${d.tmax.toFixed(0)} \xB0C`]),s.push([this.t("ctx.rain"),`${d.rain_mm.toFixed(1)} mm`]),d.et0_mm!=null&&s.push([this.t("ctx.et0"),`${d.et0_mm.toFixed(1)} mm`])),s.length?l`<h4>${this.t("ctx.title")}</h4><div class="context">${s.map(([h,m])=>l`<div class="ctx">${h}<b>${m}</b></div>`)}</div>`:p}renderTask(e){let t=e.status==="open",s=(i,a)=>this.run(async()=>{if(i==="complete"&&e.type==="harvest"&&(this.harvestKg>0||this.harvestCount>0)){let o=this.snapshot?.plantings.find(d=>d.id===e.planting_id);await this.api.logHarvest({planting_id:e.planting_id,plant_id:o?null:e.title_params?.plant_id,kg:this.harvestKg,count:this.harvestCount||null,note:this.note||""})}await this.api.taskAction(e.id,i,{note:this.note||void 0,photos:this.photos.length?[...this.photos]:void 0})},a),n=(i,a)=>this.run(async()=>{let o=await this.api.taskAction(e.id,"postpone",{days:i,to:a,note:this.note||void 0}),d=[];o.shifted?.length&&d.push(this.t("task.shifted",{n:o.shifted.length})),o.warnings?.includes("beyond_window")&&d.push(this.t("task.beyond_window")),d.length&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:d.join(" ")},bubbles:!0,composed:!0}))});return l`
      <div class="head">
        <ha-icon class="big-icon" icon=${ke[e.type]} style=${`color:${xe[e.type]??"inherit"}`}></ha-icon>
        <div class="stack" style="gap:4px">
          <h2>${e.title}</h2>
          <div class="row wrap small muted">
            <span>${this.t("task.due")}: <b>${w(e.due,this.lang,{weekday:"long",day:"numeric",month:"long"})}</b></span>
            <span class="chip">${this.t(`type.${e.type}`)}</span>
            <span class="chip">${this.t(`task.source.${e.source}`)}</span>
          </div>
        </div>
      </div>
      <div class="body">
        ${e.description?l`<p>${e.description}</p>`:p}
        ${e.title_params?.handbook?l`<a class="small" href="#" @click=${i=>{i.preventDefault(),this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e.title_params.handbook},bubbles:!0,composed:!0})),this.close()}}><ha-icon icon="mdi:book-open-page-variant-outline" style="--mdc-icon-size:16px"></ha-icon> ${this.t("handbook.read_more")}</a>`:p}
        ${this.renderContext(e)}
        ${Lt(e.type)?l`<p class="small"><ha-icon icon="mdi:toolbox-outline" style="--mdc-icon-size:16px"></ha-icon>
          <b>${this.t("task.tools")}:</b> ${Lt(e.type)}</p>`:p}
        ${e.window_start&&e.window_end&&e.window_start!==e.window_end?l`<p class="small muted">${this.t("task.window",{start:w(e.window_start,this.lang),end:w(e.window_end,this.lang)})}</p>`:p}
        ${e.recurrence?l`<p class="small muted">↻ ${this.t("task.repeat",{n:e.recurrence.interval_days})}</p>`:p}
        ${Ge().length?l`<label class="row small">${this.t("task.assignee")}:
          <select @change=${i=>this.run(()=>this.api.taskAction(e.id,"update",{changes:{assignee:i.target.value||null}}))}>
            <option value="" ?selected=${!e.assignee}>${this.t("task.anyone")}</option>
            ${Ge().map(i=>l`<option value=${i.id} ?selected=${e.assignee===i.id}>${i.name}</option>`)}
          </select></label>`:p}
        ${t&&e.type==="harvest"?l`<div class="row wrap small harvest-log">
          <ha-icon icon="mdi:scale" style="--mdc-icon-size:18px"></ha-icon>${this.t("task.harvested")}
          <input type="number" min="0" step="0.05" inputmode="decimal" style="width:90px" placeholder="kg"
            @input=${i=>this.harvestKg=Number(i.target.value)||0} /> kg
          <input type="number" min="0" step="1" inputmode="numeric" style="width:80px" placeholder="#"
            @input=${i=>this.harvestCount=Number(i.target.value)||0} /> ×</div>`:p}
        <div class="row wrap small">
          <span>${this.t("task.priority")}:</span>
          ${["low","normal","high","urgent"].map(i=>l`
            <button class="chip" aria-pressed=${String(e.priority===i)}
              @click=${()=>this.run(()=>this.api.taskAction(e.id,"update",{changes:{priority:i}}))}>${this.t(`priority.${i}`)}</button>`)}
        </div>
        ${e.notes.length?l`<h4>${this.t("task.notes")}</h4>${e.notes.map(i=>l`<p class="note"><span class="xs muted">${w(i.at.slice(0,10),this.lang)}</span> ${i.text}</p>`)}`:p}
        ${e.photos.length||this.photos.length?l`<h4>${this.t("task.photos")}</h4>
          <div class="photos">${[...e.photos,...this.photos].map(i=>l`<a href=${ge(i,"original")} target="_blank" rel="noopener"><img src=${ge(i)} alt=${this.t("task.photos")} loading="lazy" /></a>`)}</div>`:p}
        <label class="field">${this.t("task.note")}<textarea rows="2" .value=${this.note} @input=${i=>this.note=i.target.value}></textarea></label>
        <label class="btn small" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("task.add_photo")}
          <input type="file" accept="image/*" capture="environment" class="visually-hidden" @change=${this.onPhoto} /></label>
        ${t?l`
          <div class="row wrap">
            <span class="small">${this.t("task.postpone")}:</span>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>n(1)}>${this.t("task.postpone_1")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>n(3)}>${this.t("task.postpone_3")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>n(7)}>${this.t("task.postpone_7")}</button>
            <input type="date" style="width:auto" aria-label=${this.t("task.postpone_to")} .min=${I(this.today,1)}
              @change=${i=>n(void 0,i.target.value)} />
          </div>`:p}
        ${this.error?l`<p class="field-error" role="alert">${this.error}</p>`:p}
      </div>
      <div class="foot">
        ${e.source==="user"?l`<button class="btn danger" ?disabled=${this.busy} @click=${()=>s("delete")}>${this.t("common.delete")}</button>`:p}
        <span class="spacer"></span>
        <button class="btn ghost" @click=${()=>this.close()}>${this.t("common.close")}</button>
        ${t?l`<button class="btn" ?disabled=${this.busy} @click=${()=>s("skip")}>${this.t("task.skip")}</button>
              <button class="btn primary" ?disabled=${this.busy} @click=${()=>s("complete",this.t("task.completed",{title:e.title}))}>
                <ha-icon icon="mdi:check"></ha-icon>${this.t("task.complete")}</button>`:l`<button class="btn" ?disabled=${this.busy} @click=${()=>s("reopen")}>${this.t("task.reopen")}</button>`}
      </div>`}render(){return!this.task&&!this.create?p:l`<dialog @close=${()=>this.close()}>${this.create?this.renderCreate():this.renderTask(this.task)}</dialog>`}};O.styles=[R,T`
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
    `],u([g({attribute:!1})],O.prototype,"task",2),u([g({attribute:!1})],O.prototype,"beds",2),u([g({attribute:!1})],O.prototype,"api",2),u([g({attribute:!1})],O.prototype,"t",2),u([g()],O.prototype,"lang",2),u([g()],O.prototype,"today",2),u([g({type:Boolean})],O.prototype,"create",2),u([g({attribute:!1})],O.prototype,"snapshot",2),u([f()],O.prototype,"note",2),u([f()],O.prototype,"harvestKg",2),u([f()],O.prototype,"harvestCount",2),u([f()],O.prototype,"photos",2),u([f()],O.prototype,"busy",2),u([f()],O.prototype,"error",2),O=u([P("hl-task-dialog")],O);var Ot={none:"ok",low:"cold",moderate:"warn",high:"bad",unknown:""},$i={frost:"mdi:snowflake-alert",heat:"mdi:thermometer-alert",dry:"mdi:water-alert",sensor_stale:"mdi:access-point-network-off",forecast:"mdi:weather-cloudy-alert",disease:"mdi:mushroom-outline",nutrients:"mdi:flask-outline"},V=class extends E{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en";this.admin=!0}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get ctx(){return{t:this.t,lang:this.lang,today:this.snapshot.analysis?.today??"",onOpen:e=>this.emit("open-task",e),onComplete:e=>this.emit("complete-task",e),onPostpone:(e,t)=>this.emit("postpone-task",{task:e,days:t})}}greeting(){let e=new Date().getHours();return this.t(e<12?"dash.greeting_morning":e<18?"dash.greeting_afternoon":"dash.greeting_evening")}render(){let e=this.snapshot,t=e.analysis;if(!t)return l`<p class="empty">${this.t("common.loading")}</p>`;let s=t.today,n=Ue(e.tasks.filter(d=>d.status==="open"&&d.due<=s)),i=Ue(e.tasks.filter(d=>d.status==="open"&&d.due>s&&d.due<=I(s,7))),a=n.reduce((d,h)=>d+h.estimated_minutes,0),o=e.zones.filter(d=>d.type!=="outdoor");return l`
      <section class="hero">
        <div class="stack" style="gap:4px">
          <span class="muted small">${w(s,this.lang,{weekday:"long",day:"numeric",month:"long"})} · ${this.t("common.season",{year:t.season})}</span>
          <h1>${this.greeting()} 🌱</h1>
        </div>
        <span class="spacer"></span>
        <span class="chip ${Ot[t.frost.level]}"><ha-icon icon="mdi:snowflake"></ha-icon>${this.t("dash.frost_risk")}: ${this.t(`risk.${t.frost.level}`)}</span>
        <span class="chip"><ha-icon icon="mdi:thermometer-plus"></ha-icon>${Math.round(t.gdd.season_total)} GDD</span>
      </section>

      ${t.alerts.length?l`<section class="alerts" aria-label="Alerts">
        ${t.alerts.map(d=>l`<div class="alert ${d.kind==="frost"?"frost":d.severity}" role=${d.severity==="critical"?"alert":"status"}>
          <ha-icon icon=${$i[d.kind]??"mdi:information-outline"}></ha-icon>
          <div><b>${this.t(d.message_key,d.params)}</b>
            ${Array.isArray(d.params.plants)&&d.params.plants.length?l`<div class="small">${d.params.plants.join(", ")}</div>`:p}</div>
        </div>`)}
      </section>`:p}

      <div class="grid">
        <section class="card span-8" aria-labelledby="today-h">
          <header><h2 id="today-h">${this.t("dash.today_tasks")}</h2><span class="spacer"></span>
            ${n.length?l`<span class="small muted">${this.t("dash.total_time",{minutes:a})}</span>`:p}</header>
          ${n.length?l`<ul class="tasks">${n.slice(0,10).map(d=>qe(d,this.ctx))}</ul>`:l`<p class="empty">${this.t("dash.no_tasks")}</p>`}
          ${n.length>10?l`<button class="btn small ghost" @click=${()=>this.emit("navigate","calendar")}>${this.t("dash.show_all",{n:n.length})}</button>`:p}
        </section>

        <section class="card span-4" aria-labelledby="weather-h">
          <header><h2 id="weather-h">${this.t("dash.weather")}</h2></header>
          ${t.weather_available?l`
            <div class="days">${t.outlook.slice(0,3).map(d=>l`
              <div class="day">
                <div class="small muted">${d.day===s?this.t("common.today"):w(d.day,this.lang,{weekday:"short"})}</div>
                <div class="temp">${d.tmax!=null?Math.round(d.tmax):"\u2013"}° <span class="muted small">${d.tmin!=null?Math.round(d.tmin):"\u2013"}°</span></div>
                <div class="xs muted">💧 ${d.rain_mm} mm${d.et0_mm!=null?l` · ET₀ ${d.et0_mm}`:p}</div>
              </div>`)}</div>
            <div class="divider"></div>
            <div class="kv"><span>${this.t("dash.frost_risk")}</span><span class="chip ${Ot[t.frost.level]}">${this.t(`risk.${t.frost.level}`)}</span></div>
            ${t.frost.plant_level_min_c!=null?l`<div class="kv"><span></span><span class="muted">${this.t("dash.min_temp",{temp:t.frost.plant_level_min_c})}${t.frost.min_at?` \xB7 ${new Date(t.frost.min_at).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{weekday:"short",hour:"2-digit",minute:"2-digit"})}`:""}</span></div>`:p}
          `:l`<p class="small muted">${this.t("dash.forecast_missing")}</p>`}
          <div class="divider"></div>
          ${t.et0_today!=null?l`<div class="kv"><span>ET₀ ${this.t("common.today").toLowerCase()} <hl-info term="et0" .t=${this.t}></hl-info></span>
            <span><b>${t.et0_today.toFixed(1)} mm</b> <span class="muted xs">${t.et0_method==="penman_monteith"?"Penman-Monteith":t.et0_method==="hargreaves"?"Hargreaves":""}</span></span></div>`:p}
          ${t.gdd_today!=null?l`<div class="kv"><span>${this.t("dash.gdd_today")}</span><span><b>${t.gdd_today.toFixed(1)}</b></span></div>`:p}
          <div class="kv"><span>${this.t("dash.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span><b>${Math.round(t.gdd.season_total)}</b> <span class="muted xs">${this.t("dash.gdd_since",{date:w(t.gdd.since,this.lang)})}</span></span></div>
        </section>

        <section class="card span-8" aria-labelledby="beds-h">
          <header><h2 id="beds-h">${this.t("dash.beds")}</h2></header>
          <div class="beds">${e.beds.map(d=>this.renderBed(d.id))}</div>
        </section>

        ${this.renderWaterClimate()}

        <section class="card span-4" aria-labelledby="up-h">
          ${o.map(d=>{let h=t.zones[d.id]?.greenhouse;return l`<header><h2>${d.name}</h2><span class="spacer"></span>
                <span class="chip ${h?.action==="none"||!h?"ok":h.action==="shade"||h.action==="heat"?"bad":"warn"}">${this.t(`gh.${h?.action??"none"}`)}</span></header>
              ${t.zones[d.id]?.air_temperature!=null?l`<div class="big">${t.zones[d.id].air_temperature?.toFixed(1)}°</div>`:l`<p class="small muted">${this.t("dash.no_sensor")}</p>`}
              ${h?.limit_max_c!=null&&h.limiting_plants.length?l`<p class="small muted">${this.t("dash.limits",{min:h.limit_min_c,max:h.limit_max_c})} (${h.limiting_plants.join(", ")})</p>`:p}
              ${h?.forecast_max_c!=null?l`<p class="xs muted">↑ ${h.forecast_max_c}° · ↓ ${h.forecast_min_c??"\u2013"}°</p>`:p}
              <div class="divider"></div>`})}
          <header><h2 id="up-h">${this.t("dash.coming_up")}</h2></header>
          ${i.length?l`<ul class="tasks">${i.slice(0,8).map(d=>qe(d,this.ctx))}</ul>`:l`<p class="small muted">–</p>`}
        </section>
      </div>
    `}renderWaterClimate(){let e=this.snapshot,t=e.analysis,s=e.irrigation_status,n=e.settings.irrigation,i=e.beds.filter(h=>h.irrigation_entity).length,a=e.zones.filter(h=>t.zones[h.id]?.disease&&t.zones[h.id].disease.level!=="unknown"),o=e.beds.filter(h=>t.beds[h.id]?.irrigation.action==="water"),d=h=>e.beds.find(m=>m.id===h)?.name??"";return l`<section class="card span-4" aria-labelledby="wc-h">
      <header><h2 id="wc-h">${this.t("dash.water_climate")}</h2></header>
      <div class="kv"><span>${this.t("dash.irrigation_mode")}</span><span class="chip">${this.t(`settings.irrigation_mode.${n?.mode??"advise"}`)}</span></div>
      ${s?.running?l`<div class="kv"><span class="chip ok"><ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.watering_now",{bed:d(s.bed_id)})}</span>
        <button class="btn small danger" @click=${()=>this.emit("irrigation","stop")}>${this.t("dash.stop")}</button></div>`:p}
      ${s?.last_error?l`<p class="xs" style="color:var(--hl-danger)">⚠ ${s.last_error}</p>`:p}
      <div class="kv"><span>${this.t("dash.beds_need_water")}</span><b>${o.length?o.map(h=>h.name).join(", "):"\u2013"}</b></div>
      ${i&&this.admin&&!s?.running?l`<button class="btn small" @click=${()=>this.emit("irrigation","run")}>
        <ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.water_now")}</button>
        <p class="xs muted">${this.t("dash.safety_note")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></p>`:p}
      ${a.length?l`<div class="divider"></div>
        <div class="kv"><span><b>${this.t("dash.disease_risk")}</b> <hl-info term="leaf_wetness" .t=${this.t}></hl-info></span></div>
        ${a.map(h=>{let m=t.zones[h.id].disease;return l`<div class="kv"><span>${h.name}</span><span class="chip ${Ot[m.level]}">${this.t(`risk.${m.level}`)}${m.wet_hours?` \xB7 ${Math.round(m.wet_hours)} h`:""}</span></div>`})}`:p}
    </section>`}renderBed(e){let t=this.snapshot,s=t.beds.find(v=>v.id===e),n=t.analysis?.beds[e],i=n?.irrigation,a=n?.moisture_status??"unknown",o=n?.sensors?.soil_temperature?.value,d=(n?.active_plantings??[]).map(v=>t.plantings.find(b=>b.id===v)).filter(Boolean),h=a==="optimal"?"ok":a==="dry"?"bad":a==="unknown"?"":a==="wet"?"cold":"warn",m=v=>Math.max(0,Math.min(100,v));return l`
      <article class="bed" aria-label=${s.name}>
        <div class="row"><h3>${s.name}</h3><span class="spacer"></span><span class="chip ${h}">${this.t(`moisture.${a}`)}</span></div>
        ${i?.moisture!=null?l`
          <div class="gauge" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(i.moisture)} aria-label=${this.t("settings.sensor.soil_moisture")}>
            ${i.target_low!=null&&i.target_high!=null?l`<div class="target" style=${`left:${m(i.target_low)}%;width:${m(i.target_high)-m(i.target_low)}%`}></div>`:p}
            <div class="value" style=${`left:${m(i.moisture)}%`}></div>
          </div>
          <div class="kv"><span>💧 ${Math.round(i.moisture)}%</span>${o!=null?l`<span>🌡 ${o.toFixed(1)} °C</span>`:p}</div>`:l`<p class="xs muted">${this.t("dash.no_sensor")}</p>`}
        ${i?l`<p class="small"><ha-icon icon="mdi:watering-can-outline" style="--mdc-icon-size:16px"></ha-icon>
          ${this.t(`irrigation.${i.action}`,{mm:i.amount_mm,liters:Math.round(i.liters)})}${i.duration_min?` \xB7 ${Math.round(i.duration_min)} min`:""}</p>`:p}
        ${n?.nutrients?.index!=null?l`<div class="kv"><span>${this.t("dash.nutrients")} <hl-info term="nutrient_index" .t=${this.t}></hl-info></span>
          <span class="chip ${n.nutrients.status==="balanced"?"ok":"warn"}">${n.nutrients.index}/100</span></div>`:p}
        ${n?.depletion_mm!=null&&n.taw_mm?l`<div class="kv xs muted"><span>${this.t("dash.water_balance")} <hl-info term="water_balance" .t=${this.t}></hl-info></span>
          <span>${Math.round(n.depletion_mm)} / ${Math.round(n.taw_mm)} mm</span></div>`:p}
        <div class="avatars" aria-label=${this.t("dash.active_crops",{n:d.length})}>
          ${d.map(v=>{let b=this.plants.get(v.plant_id),_=y(b,this.lang);return l`<span class="avatar" title=${_} style=${`background:${A(this.families,b?.family)}`}>${_.slice(0,2)}</span>`})}
        </div>
      </article>`}};V.styles=[R,dt,T`
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
    `],u([g({attribute:!1})],V.prototype,"snapshot",2),u([g({attribute:!1})],V.prototype,"plants",2),u([g({attribute:!1})],V.prototype,"families",2),u([g({attribute:!1})],V.prototype,"t",2),u([g()],V.prototype,"lang",2),u([g({type:Boolean})],V.prototype,"admin",2),V=u([P("hl-dashboard-view")],V);var Ps={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ht=c=>(...r)=>({_$litDirective$:c,values:r}),ct=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,e,t){this._$Ct=r,this._$AM=e,this._$Ci=t}_$AS(r,e){return this.update(r,e)}update(r,e){return this.render(...e)}};var be=class extends ct{constructor(r){if(super(r),this.it=p,r.type!==Ps.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===p||r==null)return this._t=void 0,this.it=r;if(r===ne)return r;if(typeof r!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;let e=[r];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};be.directiveName="unsafeHTML",be.resultType=1;var Rs=ht(be);var We=class extends be{};We.directiveName="unsafeSVG",We.resultType=2;var Bt=ht(We);var W="#4f8a34",ut="#6aa648",K="#3f7a2a",Nt="#7a5a3a",pt='fill="#fff" opacity=".32"',Ee=c=>`
  <rect x="10.8" y="14" width="2.4" height="8.5" rx="1" fill="${Nt}"/>
  <circle cx="12" cy="10" r="8.6" fill="${W}"/>
  <circle cx="9.2" cy="7.6" r="4.6" fill="${ut}"/>
  <g fill="currentColor" stroke="#fff" stroke-width=".55">${c}</g>`,mt={carrot:`
    <path d="M12 9.5C12.2 6 14.5 3.6 17.4 3M12 9.5c0-3.4-.1-5.7-.3-7.5M12 9.5C10.8 6.4 8.8 4.4 6.4 3.6" stroke="${W}" stroke-width="1.7" stroke-linecap="round" fill="none"/>
    <path d="M12 8.6c-2.4 0-3.9 1.4-3.9 3.4 0 3 1.8 7.2 3.9 10.6 2.1-3.4 3.9-7.6 3.9-10.6 0-2-1.5-3.4-3.9-3.4z" fill="currentColor"/>
    <path d="M9.4 12.8h2.1M10.4 15.8h1.8M11 18.8h1.1M12.6 11.4h1.9M12.6 14.4h1.6" stroke="rgba(0,0,0,.22)" stroke-width=".8" stroke-linecap="round"/>`,tomato:`
    <circle cx="12" cy="13.4" r="8.2" fill="currentColor"/>
    <ellipse cx="8.8" cy="11" rx="2.2" ry="1.4" ${pt}/>
    <path d="M12 6.4l1.5 2.4 2.9-.5-1.9 2 1.7 2-2.9-.6L12 14l-1.3-2.3-2.9.6 1.7-2-1.9-2 2.9.5z" fill="${K}"/>
    <path d="M12 6.8V3.4" stroke="${K}" stroke-width="1.5" stroke-linecap="round"/>`,pepper:`
    <path d="M5.8 10.2c0-2.6 2-3.7 3.6-3.1 1 .4 1.7.4 2.6 0s1.6-.4 2.6 0c1.6-.6 3.6.5 3.6 3.1 0 5.2-2.1 11-6.2 11S5.8 15.4 5.8 10.2z" fill="currentColor"/>
    <path d="M12 7.2V4c0-.7.6-1.1 1.4-.9" stroke="${K}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M8.2 10.5c-.2 2.4.2 5 1.2 7" stroke="#fff" stroke-opacity=".35" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,chili:`
    <path d="M7.8 5c1.6 0 2.6 1.1 2.9 2.6 1.3 5.4 4.2 9.4 9.3 12.9-7.2.6-13.2-5.4-13.5-11.9C6.4 6.6 6.8 5 7.8 5z" fill="currentColor"/>
    <path d="M7.9 5.3C7.7 3.6 8.5 2.4 10 2" stroke="${K}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M8.6 8.6c.6 3.4 2.6 6.4 5.6 8.6" stroke="#fff" stroke-opacity=".35" stroke-width="1" fill="none" stroke-linecap="round"/>`,eggplant:`
    <path d="M9 6.3c3.1-1 6.1 1.1 8.1 5.1 2.5 5 1 10.1-3 10.6S6 18.2 6.5 12.2C6.7 9.2 7.3 6.9 9 6.3z" fill="currentColor"/>
    <path d="M7.4 7.6c.5-3 3-4 5.6-2.7-1.2.3-2 1-2.3 2 1.3-.2 2.4.2 3.3 1.2-2.2-.3-4.5-.2-6.6-.5z" fill="${K}"/>
    <path d="M8.6 11c0 2.6 1 5 2.6 6.6" stroke="#fff" stroke-opacity=".3" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,cucumber:`
    <g transform="rotate(-32 12 12.5)">
      <rect x="2.6" y="9" width="18.8" height="7.2" rx="3.6" fill="currentColor"/>
      <path d="M5 11h14" stroke="#fff" stroke-opacity=".3" stroke-width="1.1" stroke-linecap="round"/>
      <g fill="#fff" opacity=".45"><circle cx="7" cy="13.6" r=".6"/><circle cx="11" cy="14.2" r=".6"/><circle cx="15" cy="13.6" r=".6"/><circle cx="9" cy="12.2" r=".5"/><circle cx="13" cy="12.4" r=".5"/></g>
    </g>
    <path d="M19.4 6.6l2-1.6" stroke="${K}" stroke-width="1.5" stroke-linecap="round"/>`,pumpkin:`
    <path d="M12 7.6V4.6c.3-.9 1.2-1.3 2.1-1.1" stroke="#6b5232" stroke-width="1.9" fill="none" stroke-linecap="round"/>
    <ellipse cx="12" cy="14" rx="9.6" ry="7.2" fill="currentColor"/>
    <path d="M12 6.9c-2.6 2-2.6 12.1 0 14.2M12 6.9c2.6 2 2.6 12.1 0 14.2M7 8.2c-2.6 2.6-2.6 9 0 11.6M17 8.2c2.6 2.6 2.6 9 0 11.6" stroke="rgba(0,0,0,.2)" stroke-width=".9" fill="none"/>`,melon:`
    <circle cx="12" cy="12.6" r="8.6" fill="currentColor"/>
    <path d="M12 4c-3 3-3 14.2 0 17.2M12 4c3 3 3 14.2 0 17.2M6 6.4c-2 3.6-2 9 0 12.2M18 6.4c2 3.6 2 9 0 12.2" stroke="rgba(0,0,0,.22)" stroke-width="1.1" fill="none"/>
    <ellipse cx="8.6" cy="9" rx="2" ry="1.2" ${pt}/>`,root:`
    <path d="M12 9.4C10.6 6.6 8.2 5 5.8 4.8c.8 2.5 3.1 4.1 6.2 4.6zM12 9.4c1.4-2.8 3.8-4.4 6.2-4.6-.8 2.5-3.1 4.1-6.2 4.6z" fill="${W}"/>
    <path d="M12 9.6V2.6" stroke="${W}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12 8.8c3.7 0 6 2.4 6 5.4 0 3.1-2.7 5.4-6 5.4s-6-2.3-6-5.4c0-3 2.3-5.4 6-5.4z" fill="currentColor"/>
    <path d="M12 19.4v3.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <ellipse cx="9.6" cy="12.6" rx="1.6" ry="1.1" ${pt}/>`,potato:`
    <path d="M4.8 12.6c0-4.1 3.6-6.6 7.7-6.4 4.4.2 7.1 2.8 6.7 6.6-.4 3.9-3.6 5.9-7.6 5.7-4.3-.2-6.8-1.9-6.8-5.9z" fill="currentColor"/>
    <g fill="rgba(0,0,0,.3)"><circle cx="8.8" cy="11" r=".75"/><circle cx="13.6" cy="9.4" r=".65"/><circle cx="15.7" cy="13.6" r=".75"/><circle cx="10.6" cy="15" r=".65"/></g>
    <path d="M14.5 6.6c.6-2.4 2.6-3.6 4.6-3.2-.6 2-2.3 3.2-4.6 3.2z" fill="${W}"/>`,onion:`
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
    <path d="M12 4.2C9.6 2 6.6 2 4.6 3.4 7 5 9.6 5.2 12 4.2zM12 4.2c2.4-2.2 5.4-2.2 7.4-.8-2.4 1.6-5 1.8-7.4.8z" fill="${W}"/>
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
    <path d="M10 13C5 12 4 6 7 2.8c3 1 4 5.2 3 10.2zM14 13c5-1 6-7 3-10.2-3 1-4 5.2-3 10.2zM12 12.2c-2-3-2-7.2 0-10.2 2 3 2 7.2 0 10.2z" fill="${K}"/>
    <path d="M9 22.2l1-9.4M12 22.2V12M15 22.2l-1-9.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`,celery:`
    <g fill="${W}"><circle cx="8.8" cy="7" r="2.7"/><circle cx="12" cy="4.8" r="2.9"/><circle cx="15.2" cy="7" r="2.7"/></g>
    <path d="M8 22.2l1.5-12.2M12 22.2V9M16 22.2l-1.5-12.2" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>`,fennel:`
    <path d="M10 11.6L8 3M12 11V2M14 11.6L16 3M8.8 6.4l-2-.8M9.5 8.8l-2 .2M12 5l-1.6-1M12 7.6l1.6-1M15.2 6.4l2-.8M14.5 8.8l2 .2" stroke="#5f9a3a" stroke-width="1" stroke-linecap="round"/>
    <path d="M6.4 16.2c0-3 2.6-5.2 5.6-5.2s5.6 2.2 5.6 5.2-2.6 5.6-5.6 5.6-5.6-2.6-5.6-5.6z" fill="currentColor" stroke="#b9c58a" stroke-width=".8"/>`,pea:`
    <path d="M2.8 15.2c3-4.1 9.1-7.1 16.2-8.1 1-.1 2 .7 1.5 1.7-2.5 4.4-8.5 8.4-15.5 8.9-1.5.1-2.8-1.2-2.2-2.5z" fill="currentColor"/>
    <g fill="#c4e48e"><circle cx="7.8" cy="14.4" r="1.8"/><circle cx="11.4" cy="12.8" r="1.8"/><circle cx="15" cy="10.9" r="1.7"/></g>
    <path d="M19.6 7.4c.5-2 2-2.6 2.6-1.6s-.5 2.1-1.3 1.4" stroke="${W}" stroke-width=".9" fill="none" stroke-linecap="round"/>`,bean:`
    <path d="M4 5.8c1 6.2 4.1 11.3 10.2 14.4 2 1 4.1.5 3.6-1C14.2 16.1 9.1 11 6.6 4.8c-.6-1.2-2.7-1-2.6 1z" fill="currentColor"/>
    <path d="M6.6 8.6c.8.3 1.4 1 1.5 2M9.1 12.6c.8.3 1.4 1 1.5 2M12.1 16.1c.8.3 1.4 1 1.5 2" stroke="rgba(255,255,255,.45)" stroke-width=".9" fill="none" stroke-linecap="round"/>
    <path d="M4.4 5C4.2 3.6 5 2.6 6.4 2.4" stroke="${K}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,corn:`
    <ellipse cx="12" cy="11" rx="4.2" ry="8.6" fill="currentColor"/>
    <path d="M8.4 7h7.2M8 10h8M8 13h8M8.5 16h7M10 3.2v15.4M14 3.2v15.4" stroke="rgba(0,0,0,.16)" stroke-width=".7"/>
    <path d="M12 22.4c-3-1-5.6-4.1-6.6-9.2 2 2 4.1 4.1 6.6 9.2zM12 22.4c3-1 5.6-4.1 6.6-9.2-2 2-4.1 4.1-6.6 9.2z" fill="${ut}"/>`,asparagus:`
    <g stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M8 22.2V7.4M12 22.2V4.2M16 22.2V8.4"/></g>
    <g fill="#5f7f3a"><path d="M6.7 8L8 4.2 9.3 8z"/><path d="M10.7 4.8L12 1 13.3 4.8z"/><path d="M14.7 9L16 5.2 17.3 9z"/></g>`,artichoke:`
    <path d="M12 20v3" stroke="#6b8f5a" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 2.8c3.1 2 6.2 5.1 6.2 9.7S15.1 20.2 12 20.2s-6.2-3.1-6.2-7.7S8.9 4.8 12 2.8z" fill="currentColor"/>
    <path d="M8 10.4c2 1 6 1 8 0M7 13.9c2.5 1.4 7.5 1.4 10 0M8.5 17.4c2 1 5 1 7 0M12 2.8v4" stroke="rgba(0,0,0,.22)" stroke-width=".9" fill="none"/>`,rhubarb:`
    <path d="M2.8 9.2c0-4.1 4.1-6.6 9.2-6.6s9.2 2.5 9.2 6.6c0 2-2 3.6-4.1 3.1-1.5 1.5-3.6 1.5-5.1.5-1.5 1-3.6 1-5.1-.5-2 .5-4.1-1-4.1-3.1z" fill="${W}"/>
    <path d="M12 12.6V4M12 8L7 5.6M12 8l5-2.4" stroke="rgba(255,255,255,.4)" stroke-width=".9" fill="none"/>
    <path d="M9.2 22.2l2-10M13.2 22.2l.9-10" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>`,strawberry:`
    <path d="M12 21.2c-4.1-2-7.6-6.6-7.6-10.6 0-3 2.5-4.6 4.6-4.1 1.2.3 2 .8 3 .8s1.8-.5 3-.8c2.1-.5 4.6 1.1 4.6 4.1 0 4-3.5 8.6-7.6 10.6z" fill="currentColor"/>
    <g fill="#f7e27a"><circle cx="9" cy="10.2" r=".55"/><circle cx="12" cy="11" r=".55"/><circle cx="15" cy="10.2" r=".55"/><circle cx="10.5" cy="13.6" r=".55"/><circle cx="13.5" cy="13.6" r=".55"/><circle cx="12" cy="16.6" r=".55"/><circle cx="8" cy="12.9" r=".5"/><circle cx="16" cy="12.9" r=".5"/></g>
    <path d="M6.8 7.4c1.6-1.1 3.2-1.3 5.2 0 2-1.3 3.6-1.1 5.2 0-1.6.9-3.4 1.1-5.2.3-1.8.8-3.6.6-5.2-.3zM12 7.4V3.4" fill="${K}" stroke="${K}" stroke-width="1" stroke-linecap="round"/>`,berry:`
    <path d="M12 8.6C12 5.6 14 3.6 16.6 3.4" stroke="${K}" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.18)" stroke-width=".5"><circle cx="9" cy="11" r="3.5"/><circle cx="15" cy="11" r="3.5"/><circle cx="12" cy="16.4" r="3.5"/></g>
    <g ${pt}><circle cx="8" cy="10" r=".9"/><circle cx="14" cy="10" r=".9"/><circle cx="11" cy="15.4" r=".9"/></g>`,currant:`
    <path d="M14.2 4.4c2-1.6 4.6-1.6 6.6 0-2 1.4-4.6 1.4-6.6 0z" fill="${W}"/>
    <path d="M8 2.8c2 1 3 3 4 6s3 7 4 12.2" stroke="#6b5232" stroke-width=".9" fill="none"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.25)" stroke-width=".5"><circle cx="11" cy="8" r="2.1"/><circle cx="14.2" cy="10.6" r="2.2"/><circle cx="11.6" cy="13.2" r="2.3"/><circle cx="15" cy="16" r="2.3"/><circle cx="12.6" cy="18.9" r="2.3"/></g>`,berry_bush:`
    <circle cx="12" cy="12.6" r="9.2" fill="${W}"/>
    <circle cx="9" cy="10" r="4.1" fill="${ut}"/><circle cx="15" cy="11" r="4" fill="${ut}" opacity=".7"/>
    <g fill="currentColor" stroke="#fff" stroke-width=".55"><circle cx="8" cy="13.2" r="1.6"/><circle cx="14" cy="8" r="1.6"/><circle cx="16.2" cy="14.6" r="1.6"/><circle cx="11" cy="17.6" r="1.6"/><circle cx="11.4" cy="10.6" r="1.5"/></g>`,cane:`
    <path d="M6.8 22.4C6.8 15 8 8 10 2.8M12 22.4c0-7 1-12.2 3-17.2M17.2 22.4c0-6.2 0-10.2 1.5-14" stroke="${Nt}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <g fill="${W}"><ellipse cx="6" cy="9" rx="2.6" ry="1.4" transform="rotate(-30 6 9)"/><ellipse cx="17.6" cy="5.8" rx="2.6" ry="1.4" transform="rotate(30 17.6 5.8)"/><ellipse cx="20.2" cy="12" rx="2.4" ry="1.3" transform="rotate(20 20.2 12)"/></g>
    <g fill="currentColor" stroke="rgba(0,0,0,.2)" stroke-width=".5"><circle cx="9.4" cy="12.4" r="2.2"/><circle cx="14" cy="9.2" r="2.2"/><circle cx="13.2" cy="16.4" r="2.1"/><circle cx="18.6" cy="16.2" r="2"/></g>`,grape:`
    <path d="M12.6 5.6V2.6c0-.6.6-1 1.4-.9" stroke="#6b5232" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M14 4.2c2-2 5-2 7 0-2 1.5-4.6 1.6-7 0z" fill="${W}"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.2)" stroke-width=".5"><circle cx="7.8" cy="8" r="2.5"/><circle cx="12.4" cy="8" r="2.5"/><circle cx="17" cy="8" r="2.5"/><circle cx="10" cy="12.2" r="2.5"/><circle cx="14.6" cy="12.2" r="2.5"/><circle cx="12.2" cy="16.4" r="2.5"/><circle cx="12.2" cy="20.4" r="2.1"/></g>`,tree_apple:Ee('<circle cx="7.8" cy="11" r="1.7"/><circle cx="13" cy="6.4" r="1.7"/><circle cx="15.9" cy="11.6" r="1.7"/><circle cx="11" cy="13.8" r="1.6"/>'),tree_pear:Ee('<ellipse cx="7.8" cy="11" rx="1.3" ry="1.9"/><ellipse cx="13" cy="6.4" rx="1.3" ry="1.9"/><ellipse cx="15.9" cy="11.6" rx="1.3" ry="1.9"/><ellipse cx="11" cy="14" rx="1.3" ry="1.8"/>'),tree_plum:Ee('<ellipse cx="8" cy="11" rx="1.4" ry="1.8"/><ellipse cx="13" cy="6.6" rx="1.4" ry="1.8"/><ellipse cx="15.8" cy="11.6" rx="1.4" ry="1.8"/><ellipse cx="11" cy="14" rx="1.4" ry="1.7"/><ellipse cx="10" cy="7.6" rx="1.3" ry="1.6"/>'),tree_cherry:Ee('<circle cx="7.4" cy="11.6" r="1.3"/><circle cx="9.4" cy="12" r="1.3"/><circle cx="13" cy="7" r="1.3"/><circle cx="15" cy="7.4" r="1.3"/><circle cx="14.8" cy="12.4" r="1.3"/><circle cx="16.8" cy="12" r="1.3"/>'),tree_fig:Ee('<path d="M8 9.4c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/><path d="M14.2 4.8c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/><path d="M15.6 10.6c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/>'),tree_nut:Ee('<circle cx="8" cy="11.4" r="1.5"/><circle cx="13.2" cy="6.8" r="1.5"/><circle cx="15.8" cy="12" r="1.5"/><circle cx="11" cy="14" r="1.4"/>'),tree:`
    <rect x="10.8" y="14" width="2.4" height="8.5" rx="1" fill="${Nt}"/>
    <circle cx="12" cy="10" r="8.6" fill="currentColor"/>
    <circle cx="9.2" cy="7.6" r="4.6" fill="#fff" opacity=".18"/>`,sunflower:`
    <g fill="currentColor">${Array.from({length:12},(c,r)=>`<ellipse cx="12" cy="4.6" rx="1.7" ry="3.4" transform="rotate(${r*30} 12 12)"/>`).join("")}</g>
    <circle cx="12" cy="12" r="4.4" fill="#6b4a2a"/>
    <g fill="#3f2a18"><circle cx="11" cy="11" r=".6"/><circle cx="13" cy="11.6" r=".6"/><circle cx="11.6" cy="13.2" r=".6"/><circle cx="13.4" cy="13.6" r=".5"/></g>`,flower:`
    <path d="M12 22.4V14" stroke="${W}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12 18.4c-1.6-2.4-4-3-5.6-2.4 1.2 2 3.4 2.8 5.6 2.4z" fill="${W}"/>
    <g fill="currentColor">${Array.from({length:5},(c,r)=>`<circle cx="12" cy="5.6" r="3.2" transform="rotate(${r*72} 12 10)"/>`).join("")}</g>
    <circle cx="12" cy="10" r="2.3" fill="#f4c430" stroke="#c9952a" stroke-width=".5"/>`,lavender:`
    <path d="M12 22.4C12 16 11 10 9 5M12 22.4c0-6 .4-12 .4-18.4M12 22.4c0-6 1.4-11 3.6-16" stroke="#7a9a6a" stroke-width="1" fill="none" stroke-linecap="round"/>
    <g fill="currentColor">${[[9,5],[9.6,7.4],[10.2,9.8],[12.4,3.4],[12.4,6],[12.4,8.6],[15.6,6],[15,8.4],[14.4,10.8]].map(([c,r])=>`<ellipse cx="${c}" cy="${r}" rx="1.1" ry="1.5"/>`).join("")}</g>`,herb:`
    <path d="M12 22.4V3.4" stroke="${K}" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="currentColor">${[[4.6,-35],[8.6,35],[12.6,-35],[16.6,35]].map(([c,r])=>`<ellipse cx="${r<0?8.4:15.6}" cy="${c+1}" rx="3.6" ry="1.8" transform="rotate(${r} ${r<0?8.4:15.6} ${c+1})"/>`).join("")}
      <ellipse cx="12" cy="3.2" rx="1.6" ry="2.4"/></g>`,umbel:`
    <path d="M12 22.4V12.4M12 12.4L6 6.4M12 12.4L9 4.6M12 12.4l3-7.8M12 12.4l6-6" stroke="#5f9a3a" stroke-width="1" stroke-linecap="round"/>
    <g fill="currentColor">${[[6,6.4],[9,4.6],[15,4.6],[18,6.4],[12,4]].map(([c,r])=>`<circle cx="${c}" cy="${r}" r="1.9"/>`).join("")}</g>`,clover:`
    <path d="M12 22.4v-9" stroke="${K}" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="currentColor" stroke="${K}" stroke-width=".6">${[0,120,240].map(c=>`<path d="M12 12c-1.6-1.6-4.6-1.4-4.6-4.2 0-1.6 1.4-2.6 2.6-2.2.4-1.4 2-2 2-2s1.6.6 2 2c1.2-.4 2.6.6 2.6 2.2 0 2.8-3 2.6-4.6 4.2z" transform="rotate(${c} 12 12)"/>`).join("")}</g>`,grain:`
    <path d="M12 22.4V4" stroke="#a88a4a" stroke-width="1.1" stroke-linecap="round"/>
    <g fill="currentColor">${[5,8,11,14].map(c=>`<ellipse cx="10" cy="${c}" rx="1.4" ry="2.3" transform="rotate(-25 10 ${c})"/><ellipse cx="14" cy="${c}" rx="1.4" ry="2.3" transform="rotate(25 14 ${c})"/>`).join("")}
      <ellipse cx="12" cy="2.8" rx="1.2" ry="2"/></g>`};function se(c){return c?.icon&&mt[c.icon]?c.icon:c?.category==="herb"?"herb":c?.category==="flower"?"flower":c?.category==="fruit"?"berry_bush":c?.habit==="root"?"root":c?.habit==="bulb"?"onion":"leafy"}function Cs(){let c=Object.entries(mt).map(([r,e])=>`<symbol id="pg-${r}" viewBox="0 0 24 24" overflow="visible">${e}</symbol>`).join("");return S`${Bt(c)}`}function gt(c,r,e,t,s){return S`<use href=${`#pg-${c}`} x=${r-t/2} y=${e-t/2} width=${t} height=${t} style=${`color:${s}`}></use>`}function de(c,r,e=28){return l`<svg class="plant-glyph" viewBox="0 0 24 24" width=${e} height=${e} style=${`color:${r}`} aria-hidden="true"
    >${Bt(mt[c]??mt.leafy)}</svg
  >`}var D=(c,r)=>r>0?Math.round(c/r)*r:c,Te=c=>({x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm}),ze=c=>({x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm}),As=(c,r)=>({x:r.x_cm+c.x_cm,y:r.y_cm+c.y_cm,w:c.width_cm,h:c.length_cm}),_i=(c,r,e)=>r>=c.x&&r<=c.x+c.w&&e>=c.y&&e<=c.y+c.h;function ae(c,r){let e=Math.min(c.w,r.w),t=Math.min(c.h,r.h);return{x:Math.min(Math.max(c.x,r.x),r.x+r.w-e),y:Math.min(Math.max(c.y,r.y),r.y+r.h-t),w:e,h:t}}function wi(c,r){return c.x<r.x+r.w&&r.x<c.x+c.w&&c.y<r.y+r.h&&r.y<c.y+c.h}function Ls(c,r,e){for(let t=c.length-1;t>=0;t--)if(_i(Te(c[t]),r,e))return c[t]}function Ze(c,r,e){let t=Math.max(c.spacing_cm,5);if(r==="single")return{w:t,h:t};if(r==="row"){let n=e.width_cm>=e.length_cm,i=Math.max(Math.min(c.row_spacing_cm,40),10);return n?{w:e.width_cm,h:i}:{w:i,h:e.length_cm}}let s=Math.min(Math.max(t*2,30),Math.min(e.width_cm,e.length_cm));return{w:s,h:s}}function Dt(c,r){let e={x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm};if(c.layout==="single")return[[e.x+e.w/2,e.y+e.h/2]];let t=Math.max(r.spacing_cm,1);if(c.layout==="row"){let a=e.w>=e.h,o=a?e.w:e.h,d=a?e.h:e.w,h=Math.max(1,Math.floor(o/t)),m=Math.max(1,Math.floor(d/Math.max(r.row_spacing_cm,1))),v=[];for(let b=0;b<m;b++)for(let _=0;_<h;_++){let $=o/h*(_+.5),x=d/m*(b+.5);v.push(a?[e.x+$,e.y+x]:[e.x+x,e.y+$])}return v}let s=Math.max(1,Math.floor(e.w/t)),n=Math.max(1,Math.floor(e.h/t)),i=[];for(let a=0;a<n;a++)for(let o=0;o<s;o++)i.push([e.x+e.w/s*(o+.5),e.y+e.h/n*(a+.5)]);return i}function Hs(c,r){return c.count&&c.count>0?c.count:Dt(c,r).length}function ye(c,r,e,t){let s=Math.max(t,5);for(let n=0;n+r.h<=c.length_cm+.01;n+=s)for(let i=0;i+r.w<=c.width_cm+.01;i+=s){let a={x:i,y:n,w:r.w,h:r.h};if(!e.some(o=>wi(a,o)))return{x:i,y:n}}return null}function ft(c,r,e=[]){let t=[...c.map(ze),...r.map(Te),...e];if(!t.length)return{x:0,y:0,w:600,h:400};let s=Math.min(...t.map(o=>o.x)),n=Math.min(...t.map(o=>o.y)),i=Math.max(...t.map(o=>o.x+o.w)),a=Math.max(...t.map(o=>o.y+o.h));return{x:s,y:n,w:i-s,h:a-n}}function Ft(c,r){if(c.length<2)return c.map(a=>({...a}));let e=c.map(a=>({...a})),t=Math.min(...c.map(a=>a.x)),s=Math.max(...c.map(a=>a.x+a.w)),n=Math.min(...c.map(a=>a.y)),i=Math.max(...c.map(a=>a.y+a.h));switch(r){case"left":e.forEach(a=>a.x=t);break;case"right":e.forEach(a=>a.x=s-a.w);break;case"top":e.forEach(a=>a.y=n);break;case"bottom":e.forEach(a=>a.y=i-a.h);break;case"hcenter":e.forEach(a=>a.x=(t+s)/2-a.w/2);break;case"vcenter":e.forEach(a=>a.y=(n+i)/2-a.h/2);break;case"hdistribute":{let a=e.map((h,m)=>[h,m]).sort((h,m)=>h[0].x-m[0].x),o=(s-t-a.reduce((h,[m])=>h+m.w,0))/(a.length-1),d=t;for(let[h]of a)h.x=d,d+=h.w+o;break}case"vdistribute":{let a=e.map((h,m)=>[h,m]).sort((h,m)=>h[0].y-m[0].y),o=(i-n-a.reduce((h,[m])=>h+m.h,0))/(a.length-1),d=n;for(let[h]of a)h.y=d,d+=h.h+o;break}}return e.map(a=>({...a,x:Math.round(a.x),y:Math.round(a.y)}))}var Ke={path:{fill:"#e3d6bd",stroke:"#b3a283",icon:"\u{1F6B6}",pattern:"gravel",opacity:.95},terrace:{fill:"#cfc6b8",stroke:"#8f8577",icon:"\u2615",pattern:"tiles",opacity:.95},lawn:{fill:"#9cc46a",stroke:"#6f9a45",icon:"\u{1F331}",pattern:"grass",opacity:.7},flowerbed:{fill:"#d7e8b8",stroke:"#8fae6a",icon:"\u{1F338}",pattern:"flowers",opacity:.85},compost:{fill:"#8a6a45",stroke:"#5c442a",icon:"\u267B",opacity:.7},water_butt:{fill:"#4c8fbf",stroke:"#2d6a96",icon:"\u{1F4A7}",opacity:.7},pond:{fill:"#7fb6d9",stroke:"#3f7fa8",icon:"\u{1F438}",pattern:"water",opacity:.85},shed:{fill:"#9aa3a0",stroke:"#6b7370",icon:"\u{1F3E0}",pattern:"roof",opacity:.85},tree:{fill:"#4e7d3a",stroke:"#2f5222",icon:"\u{1F333}",opacity:.5},hedge:{fill:"#5f8f45",stroke:"#3d6b2a",icon:"\u{1F33F}",pattern:"hedge",opacity:.8},fence:{fill:"#8a6a45",stroke:"#5c442a",icon:"\u{1FAB5}",opacity:.9},trellis:{fill:"#7a5c3e",stroke:"#5a3f25",icon:"\u256B",opacity:.6},house:{fill:"#c9b8a8",stroke:"#7d6a5a",icon:"\u{1F3E0}",pattern:"house",opacity:.95},driveway:{fill:"#d2ccc2",stroke:"#9a9285",icon:"\u{1F697}",pattern:"pavers",opacity:.95},parking:{fill:"#d2ccc2",stroke:"#9a9285",icon:"\u{1F17F}\uFE0F",pattern:"pavers",opacity:.95},street:{fill:"#8f9294",stroke:"#5f6264",icon:"\u{1F6E3}\uFE0F",pattern:"asphalt",opacity:.95},play:{fill:"#efe0a0",stroke:"#c2a84a",icon:"\u{1F6DD}",opacity:.7},beehive:{fill:"#f2c230",stroke:"#b5841a",icon:"\u{1F41D}",opacity:.85},stone_path:{fill:"#cfc8bd",stroke:"#958d80",icon:"\u{1FAA8}",pattern:"flagstones",opacity:.95},wood_path:{fill:"#c39463",stroke:"#8a6238",icon:"\u{1FAB5}",pattern:"planks",opacity:.95},stepping_stones:{fill:"#a6cc72",stroke:"#8f887c",icon:"\u{1F463}",pattern:"stepping",opacity:.9},bark_path:{fill:"#a07a52",stroke:"#7d5a38",icon:"\u{1F7EB}",pattern:"bark",opacity:.9},decking:{fill:"#c39463",stroke:"#8a6238",icon:"\u{1FA91}",pattern:"planks",opacity:.95},wall:{fill:"#b07a5c",stroke:"#7d4f36",icon:"\u{1F9F1}",pattern:"bricks",opacity:.95},carport:{fill:"#a4aca9",stroke:"#6b7370",icon:"\u{1F699}",pattern:"roof",opacity:.85},shrub:{fill:"#5f8f45",stroke:"#3d6b2a",icon:"\u{1F333}",pattern:"hedge",opacity:.75},pool:{fill:"#5fb0e0",stroke:"#2d7fb0",icon:"\u{1F3CA}",pattern:"pool",opacity:.95},seating:{fill:"#d9c7a3",stroke:"#9c8460",icon:"\u{1FA91}",pattern:"tiles",opacity:.85},other:{fill:"#b4b4b4",stroke:"#888",icon:"\u2022",opacity:.55}},X={outdoor:{fill:"var(--hl-zone-outdoor)",stroke:"var(--hl-leaf-300)",dash:"8 4",icon:"\u{1F955}"},greenhouse:{fill:"var(--hl-zone-greenhouse)",stroke:"var(--hl-frost-500)",dash:"none",icon:"\u{1F3E1}"},cold_frame:{fill:"var(--hl-zone-greenhouse)",stroke:"var(--hl-frost-500)",dash:"3 3",icon:"\u{1FA9F}"},orchard:{fill:"rgba(120, 170, 80, 0.16)",stroke:"#6f9a45",dash:"10 4",icon:"\u{1F34E}"},fruit:{fill:"rgba(200, 60, 90, 0.08)",stroke:"#c8506a",dash:"10 4",icon:"\u{1FAD0}"},herbs:{fill:"rgba(80, 110, 176, 0.09)",stroke:"#6a84c0",dash:"10 4",icon:"\u{1F33F}"},flowers:{fill:"rgba(224, 106, 160, 0.09)",stroke:"#d27aa8",dash:"10 4",icon:"\u{1F338}"},garden:{fill:"rgba(110, 150, 90, 0.10)",stroke:"#7a9a5a",dash:"10 4",icon:"\u{1F3E1}"},containers:{fill:"rgba(176, 122, 92, 0.10)",stroke:"#b07a5c",dash:"4 3",icon:"\u{1FAB4}"}},Is={friend:{color:"var(--hl-leaf-500)",dash:"none",width:2},pest_synergy:{color:"var(--hl-leaf-600)",dash:"2 3",width:2},enemy:{color:"var(--hl-tomato-500)",dash:"6 4",width:2.5},allelopathy:{color:"#8e5ba8",dash:"6 4",width:2.5},competition:{color:"var(--hl-sun-500)",dash:"3 3",width:2},shading:{color:"#6b7370",dash:"1 4",width:2.5},overlap:{color:"var(--hl-sun-500)",dash:"6 4",width:2.5}};var Os={dry:"#c8432f",slightly_dry:"#e8a33d",optimal:"#4c8c3f",wet:"#3a7ca5",unknown:"transparent"},M=class extends E{constructor(){super(...arguments);this.zones=[];this.beds=[];this.plantings=[];this.features=[];this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.plants=new Map;this.families={};this.selection=null;this.ghost=null;this.reports={};this.timelines={};this.analysis=null;this.lang="en";this.snapStep=10;this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.readonly=!1;this.focusZone="";this.drawTool=null;this.drawRect=null;this.k=1;this.tx=20;this.ty=20;this.preview=null;this.drag=null;this.pendingSelect=null;this.fitted=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.fitted||this.fit()}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}updated(e){!this.fitted&&(e.has("zones")||e.has("beds"))&&(this.zones.length||this.beds.length)&&this.fit()}fit(){let e=this.getBoundingClientRect();if(!e.width||!e.height)return;let t=ft(this.zones,this.beds,this.features.map(n=>({x:n.x_cm,y:n.y_cm,w:n.width_cm,h:n.length_cm}))),s=32;this.k=Math.max(.2,Math.min((e.width-s*2)/t.w,(e.height-s*2)/t.h,6)),this.tx=s-t.x*this.k+(e.width-s*2-t.w*this.k)/2,this.ty=s-t.y*this.k+(e.height-s*2-t.h*this.k)/2,this.fitted=!0}fitRect(e,t=40){let s=this.getBoundingClientRect();!s.width||!s.height||!e.w||!e.h||(this.k=Math.max(.2,Math.min((s.width-t*2)/e.w,(s.height-t*2)/e.h,8)),this.tx=t-e.x*this.k+(s.width-t*2-e.w*this.k)/2,this.ty=t-e.y*this.k+(s.height-t*2-e.h*this.k)/2,this.fitted=!0)}zoom(e,t,s){let n=this.getBoundingClientRect(),i=t??n.width/2,a=s??n.height/2,o=Math.max(.15,Math.min(this.k*e,12));this.tx=i-(i-this.tx)*o/this.k,this.ty=a-(a-this.ty)*o/this.k,this.k=o}clientToCanvas(e,t){let s=this.getBoundingClientRect();return e<s.left||e>s.right||t<s.top||t>s.bottom?null:{x:(e-s.left-this.tx)/this.k,y:(t-s.top-this.ty)/this.k}}focusCanvas(){this.svgEl?.focus()}rectOf(e,t){if(e==="feature"){let i=this.features.find(a=>a.id===t);return i?{x:i.x_cm,y:i.y_cm,w:i.width_cm,h:i.length_cm}:null}if(e==="zone"){let i=this.zones.find(a=>a.id===t);return i?ze(i):null}if(e==="bed"){let i=this.beds.find(a=>a.id===t);return i?Te(i):null}let s=this.plantings.find(i=>i.id===t),n=s&&this.beds.find(i=>i.id===s.bed_id);return s&&n?As(s,n):null}onPointerDown(e,t,s,n=!1){if(e.button!==0&&e.pointerType==="mouse")return;e.stopPropagation();let i=this.clientToCanvas(e.clientX,e.clientY);if(i){if(this.svgEl.setPointerCapture(e.pointerId),this.drawTool&&!n){let a=this.snapOn?this.snapStep:1,o=D(i.x,a),d=D(i.y,a);this.drag={mode:"draw",pointerId:e.pointerId,startX:o,startY:d,origin:{x:o,y:d,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1},this.drawRect={x:o,y:d,w:0,h:0};return}if(t&&s){let a=e.shiftKey||e.ctrlKey||e.metaKey;if(this.multi.some(h=>h.kind===t&&h.id===s)&&!a&&!n?this.pendingSelect={kind:t,id:s}:this.dispatchEvent(new CustomEvent("select",{detail:{kind:t,id:s,additive:a}})),a)return;let d=this.rectOf(t,s);if(!d||this.readonly){this.drag={mode:"pan",pointerId:e.pointerId,startX:i.x,startY:i.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1};return}this.drag={mode:n?"resize":"move",kind:t,id:s,pointerId:e.pointerId,startX:i.x,startY:i.y,origin:d,startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1}}else this.dispatchEvent(new CustomEvent("select",{detail:null})),this.drag={mode:"pan",pointerId:e.pointerId,startX:i.x,startY:i.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1}}}onPointerMove(e){let t=this.drag;if(!t||t.pointerId!==e.pointerId)return;if(Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)>3&&(t.moved=!0),t.mode==="pan"){this.tx=t.startTx+(e.clientX-t.clientX),this.ty=t.startTy+(e.clientY-t.clientY);return}let s=this.clientToCanvas(e.clientX,e.clientY);if(t.mode==="draw"){if(!s)return;let d=this.snapOn?this.snapStep:1,h=D(s.x,d),m=D(s.y,d);this.drawRect={x:Math.min(t.startX,h),y:Math.min(t.startY,m),w:Math.abs(h-t.startX),h:Math.abs(m-t.startY)};return}if(!s||!t.kind||!t.id)return;let n=s.x-t.startX,i=s.y-t.startY,a=this.snapOn?this.snapStep:1,o;if(t.mode==="move")if(o={...t.origin,x:t.origin.x+n,y:t.origin.y+i},t.kind==="planting"){let d=this.beds.find(h=>h.id===this.plantings.find(m=>m.id===t.id)?.bed_id);d&&(o.x=d.x_cm+D(o.x-d.x_cm,a),o.y=d.y_cm+D(o.y-d.y_cm,a))}else o.x=D(o.x,a),o.y=D(o.y,a);else if(o={...t.origin,w:Math.max(a,D(t.origin.w+n,a)),h:Math.max(a,D(t.origin.h+i,a))},t.kind==="planting"){let d=this.beds.find(h=>h.id===this.plantings.find(m=>m.id===t.id)?.bed_id);d&&(o=ae(o,Te(d)))}this.preview={kind:t.kind,id:t.id,rect:o}}onPointerUp(e){let t=this.drag;if(!t||t.pointerId!==e.pointerId)return;if(this.drag=null,this.svgEl.hasPointerCapture(e.pointerId)&&this.svgEl.releasePointerCapture(e.pointerId),t.mode==="draw"){let o=this.drawRect??t.origin;this.drawRect=null;let d=t.moved&&o.w>0&&o.h>0?o:{x:t.startX,y:t.startY,w:0,h:0};this.dispatchEvent(new CustomEvent("draw-rect",{detail:d}));return}let s=this.preview;this.preview=null;let n=this.pendingSelect;if(this.pendingSelect=null,n&&!t.moved&&this.dispatchEvent(new CustomEvent("select",{detail:n})),!s||!t.moved||t.mode==="pan")return;let i;if(s.kind==="planting"){let o=s.rect.x+s.rect.w/2,d=s.rect.y+s.rect.h/2;i=[...this.beds].reverse().find(m=>o>=m.x_cm&&o<=m.x_cm+m.width_cm&&d>=m.y_cm&&d<=m.y_cm+m.length_cm)?.id}let a=t.mode==="move"&&this.multi.length>1&&this.multi.some(o=>o.kind===s.kind&&o.id===s.id);this.dispatchEvent(new CustomEvent("item-change",{detail:{kind:s.kind,id:s.id,rect:s.rect,targetBedId:i,dx:s.rect.x-t.origin.x,dy:s.rect.y-t.origin.y,group:a}}))}onWheel(e){e.preventDefault();let t=this.getBoundingClientRect();this.zoom(e.deltaY<0?1.12:1/1.12,e.clientX-t.left,e.clientY-t.top)}effectiveRect(e,t,s){if(this.preview&&this.preview.kind===e&&this.preview.id===t)return this.preview.rect;let n=this.preview;if(n&&n.kind===e&&this.drag?.mode==="move"&&this.multi.length>1&&this.multi.some(i=>i.kind===e&&i.id===t)&&this.multi.some(i=>i.kind===n.kind&&i.id===n.id)){let i=this.drag.origin;return{...s,x:s.x+(n.rect.x-i.x),y:s.y+(n.rect.y-i.y)}}return s}renderFeature(e){let t=this.effectiveRect("feature",e.id,{x:e.x_cm,y:e.y_cm,w:e.width_cm,h:e.length_cm}),s=Ke[e.type]??Ke.other,n=11/this.k,i=t.x+t.w/2,a=t.y+t.h/2,o=e.type==="tree"||e.type==="water_butt"||e.type==="pond"||e.type==="shrub",d;if(e.type==="tree"){let m=Math.min(t.w,t.h);d=S`<ellipse cx=${i} cy=${a} rx=${t.w/2} ry=${t.h/2} fill="#2f5222" fill-opacity="0.12" stroke=${s.stroke} stroke-width="1.2"
          stroke-dasharray="4 3" vector-effect="non-scaling-stroke"></ellipse>
        ${gt("tree",i,a,m*.95,"#4e7d3a")}`}else if(e.type==="fence"){let m=t.w>=t.h,v=m?t.w:t.h,b=Math.max(1,Math.round(v/100)),_=Array.from({length:b+1},($,x)=>v/b*x);d=S`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} fill="transparent"></rect>
        <line x1=${m?t.x:i} y1=${m?a:t.y} x2=${m?t.x+t.w:i} y2=${m?a:t.y+t.h}
          stroke=${s.stroke} stroke-width="3" vector-effect="non-scaling-stroke" stroke-linecap="round"></line>
        ${_.map($=>S`<rect x=${(m?t.x+$:i)-4} y=${(m?a:t.y+$)-4} width="8" height="8" fill=${s.fill} stroke=${s.stroke}
          stroke-width="1" vector-effect="non-scaling-stroke"></rect>`)}`}else o?d=S`<ellipse cx=${i} cy=${a} rx=${t.w/2} ry=${t.h/2} fill=${s.pattern?`url(#feat-${s.pattern})`:s.fill}
        fill-opacity=${s.opacity??.6} stroke=${s.stroke} stroke-width="1.5" vector-effect="non-scaling-stroke"></ellipse>`:d=S`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${e.type==="path"?2/this.k:4/this.k}
        fill=${s.pattern?`url(#feat-${s.pattern})`:s.fill} fill-opacity=${s.opacity??.6} stroke=${s.stroke} stroke-width="1.2"
        vector-effect="non-scaling-stroke" stroke-dasharray=${e.type==="trellis"?"6 3":"none"}></rect>`;let h=e.type!=="fence"&&t.w*this.k>44&&t.h*this.k>16;return S`<g role="button" aria-label=${`${e.name} (${this.t(`feature.${e.type}`)})`} @pointerdown=${m=>this.onPointerDown(m,"feature",e.id)} style="cursor:move">
      <title>${e.name} · ${this.t(`feature.${e.type}`)}</title>
      ${d}
      ${h?this.renderPill(i,e.type==="tree"?t.y+t.h-n:a,`${s.icon} ${e.name}`.trim(),n):p}
    </g>`}zoneDelta(e){if(this.preview?.kind!=="zone"||this.preview.id!==e||this.drag?.mode!=="move")return{dx:0,dy:0};let t=this.zones.find(s=>s.id===e);return t?{dx:this.preview.rect.x-t.x_cm,dy:this.preview.rect.y-t.y_cm}:{dx:0,dy:0}}bedAbs(e){let{dx:t,dy:s}=this.zoneDelta(e.zone_id),n={...Te(e),x:e.x_cm+t,y:e.y_cm+s};return this.effectiveRect("bed",e.id,n)}renderGrid(){let e=Math.max(this.snapStep,5);return S`
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
        ${Cs()}
      </defs>
      <rect x="-5000" y="-5000" width="10000" height="10000" fill=${e*this.k>=5?"url(#major)":"url(#major-only)"}></rect>
    `}renderZone(e){let t=this.effectiveRect("zone",e.id,ze(e)),s=e.type==="greenhouse"||e.type==="cold_frame",n=X[e.type]??X.outdoor,i=12/this.k,a=this.t(`settings.zone_type.${e.type}`),o=e.name.toLowerCase()===a.toLowerCase()?`${n.icon} ${e.name}`:`${n.icon} ${e.name} \xB7 ${a}`,d=this.focusZone===e.id;return S`
      <g role="button" aria-label=${o} @pointerdown=${h=>this.onPointerDown(h,"zone",e.id)}
        @dblclick=${()=>this.dispatchEvent(new CustomEvent("zone-open",{detail:e.id}))}>
        <rect class="zone-rect" x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${8/this.k}
          fill=${n.fill} stroke=${n.stroke} stroke-dasharray=${n.dash} stroke-width=${d?2.5:1.5}></rect>
        ${s?S`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} fill="url(#glass)" pointer-events="none"></rect>`:p}
        <text class="label zone-label" x=${t.x+2/this.k} y=${t.y-i*.5} font-size=${i} font-weight="700">${o}</text>
      </g>`}renderBed(e){let t=this.bedAbs(e),s=12/this.k,n=this.analysis?.beds[e.id],i=n?.moisture_status??"unknown",a=this.showMoisture&&i!=="unknown"?Os[i]:"rgba(46,33,24,0.45)",o=this.zones.find(x=>x.id===e.zone_id)?.type??"outdoor",d=o==="orchard"||o==="fruit",h=o==="orchard"?"url(#feat-grass)":o==="fruit"?"url(#bark-mulch)":e.kind==="container"?"var(--hl-container-fill)":e.kind==="raised"?"var(--hl-bed-fill-raised)":"var(--hl-bed-fill)",m=e.kind==="container"?Math.min(t.w,t.h)/4:4/this.k,v=n?.irrigation.moisture,b=n?.sensors?.soil_temperature?.value,_=this.reports[e.id]??n?.compatibility,$=(_?.pairs.filter(x=>x.severity!=="info").length??0)+(_?.rotation?.length??0);return S`
      <g role="button" aria-label=${`${e.name}, ${this.t(`kind.${e.kind}`)}, ${Math.round(e.width_cm)} \xD7 ${Math.round(e.length_cm)} cm`}
        @pointerdown=${x=>this.onPointerDown(x,"bed",e.id)}>
        <rect class="bed-rect" x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${m} fill=${h}
          stroke=${a} stroke-width=${this.showMoisture&&i!=="unknown"?3:1.5}></rect>
        ${d?p:S`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${m} fill="url(#soil)" pointer-events="none"></rect>`}
        ${this.showMoisture&&i!=="unknown"?S`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${m} fill=${Os[i]} opacity="0.12" pointer-events="none"></rect>`:p}
        ${d||t.w*this.k<50?p:S`<text class="label on-soil" x=${t.x+6/this.k} y=${t.y+t.h-6/this.k} font-size=${s} font-weight="600">${e.name}</text>`}
        ${this.showMoisture&&v!=null?S`<text class="label on-soil" x=${t.x+t.w-6/this.k} y=${t.y+t.h-6/this.k} font-size=${s*.95} text-anchor="end">💧 ${Math.round(v)}%</text>`:p}
        ${this.showTemperature&&b!=null?S`<text class="label on-soil" x=${t.x+t.w-6/this.k} y=${t.y+s*1.3} font-size=${s*.95} text-anchor="end">🌡 ${b.toFixed(1)} °C</text>`:p}
        ${$?this.renderBadge(t.x+t.w,t.y,String($),"var(--hl-tomato-500)"):p}
      </g>`}renderBadge(e,t,s,n,i=9){let a=i/this.k;return S`<g pointer-events="none"><circle cx=${e} cy=${t} r=${a} fill=${n} stroke="#fff" stroke-width=${1.5/this.k}></circle>
      <text class="badge-text" x=${e} y=${t+a*.38} font-size=${a*1.1} text-anchor="middle">${s}</text></g>`}renderPill(e,t,s,n){let i=s.length*n*.56+n*1.1,a=n*1.55;return S`<g pointer-events="none">
      <rect x=${e-i/2} y=${t-a/2} width=${i} height=${a} rx=${a/2} fill="var(--hl-pill-bg, rgba(255,255,255,0.9))"
        stroke="rgba(0,0,0,0.12)" stroke-width="1" vector-effect="non-scaling-stroke"></rect>
      <text class="pill-text" x=${e} y=${t+n*.36} font-size=${n} text-anchor="middle">${s}</text></g>`}renderPlanting(e){let t=this.beds.find(N=>N.id===e.bed_id),s=this.plants.get(e.plant_id);if(!t||!s)return p;let n=this.bedAbs(t),i={x:n.x+e.x_cm,y:n.y+e.y_cm,w:e.width_cm,h:e.length_cm},a=this.effectiveRect("planting",e.id,i),o=A(this.families,s.family),d=s.color||o,h=se(s),m=y(s,this.lang),v=!this.viewDate||ks(e,this.timelines[e.id],this.viewDate),b={...e,x_cm:a.x-n.x,y_cm:a.y-n.y,width_cm:a.w,length_cm:a.h},_=Dt(b,s),$=this.reports[t.id]??this.analysis?.beds[t.id]?.compatibility,x=$?.pairs.filter(N=>(N.a===e.id||N.b===e.id)&&N.severity!=="info")??[],z=$?.out_of_bounds?.includes(e.id),j=this.k,ee=Math.min(s.spacing_cm,a.w,a.h)*j,Y=ee<18||_.length>90,q=`${m} \u2013 ${this.t(`planner.layout.${e.layout}`)}, ${this.t("planner.count",{n:_.length})}`+(x.length?` \u2013 ${x.length} \u26A0`:"")+(s.perennial?` \u2013 ${this.t("planner.perennial")}`:""),ce=11/j,yt;if(Y){let N=a.w>=a.h,$e=N?a.h:a.w,je=N?a.w:a.h,Kt=Math.max(e.layout==="row"?s.row_spacing_cm:Math.max(s.row_spacing_cm/2,s.spacing_cm),4),Yt=Math.max(1,Math.floor($e/Kt)),Xe=Math.min(s.spacing_cm/2,je/4),Xt=Math.max(Math.min(s.spacing_cm*.9,Kt*.45),2),Qt=s.category==="flower"?d:"#5f9a3a",Ys=Array.from({length:Yt},(Pe,Xs)=>$e/Yt*(Xs+.5)),Jt=`${Math.max(s.spacing_cm*.6,1.5)} ${Math.max(s.spacing_cm*.4,1)}`,Vt=Math.max(Math.min(Math.min(a.w,a.h)*.72,46/j),16/j),es=a.x+a.w/2,ts=a.y+a.h/2;yt=S`
        ${Ys.map(Pe=>N?S`<line x1=${a.x+Xe} y1=${a.y+Pe} x2=${a.x+a.w-Xe} y2=${a.y+Pe} stroke=${Qt} stroke-width=${Xt}
              stroke-linecap="round" stroke-dasharray=${Jt} opacity="0.75"></line>`:S`<line x1=${a.x+Pe} y1=${a.y+Xe} x2=${a.x+Pe} y2=${a.y+a.h-Xe} stroke=${Qt} stroke-width=${Xt}
              stroke-linecap="round" stroke-dasharray=${Jt} opacity="0.75"></line>`)}
        <circle cx=${es} cy=${ts} r=${Vt*.62} fill="var(--hl-pill-bg, rgba(255,255,255,0.92))" stroke=${o} stroke-width="2"
          vector-effect="non-scaling-stroke"></circle>
        ${gt(h,es,ts,Vt*.92,d)}`}else{let N=Math.max(Math.min(s.spacing_cm*.92,Math.min(a.w,a.h)*1.05),6/j);yt=S`
        ${_.slice(0,300).map(([$e,je])=>S`<ellipse cx=${n.x+$e} cy=${n.y+je+N*.42} rx=${N*.36} ry=${N*.09}
          fill="rgba(0,0,0,0.18)"></ellipse>`)}
        ${_.slice(0,300).map(([$e,je])=>gt(h,n.x+$e,n.y+je,N,d))}`}let Wt=(m.length*.56+1.1)*ce,Zt=a.w*j>=Math.min(m.length*7+16,140)&&a.h*j>=(Y?64:34),Ws=Y&&!Zt&&a.w>=a.h&&a.w*j>=Wt*j+70&&a.h*j>=16,Zs=Y?a.y+a.h-Math.max(ce*1.1,Math.min(a.h*.12,14/j)):a.y+a.h-ce*.95,Ks=Math.max(Math.min(Math.min(a.w,a.h)*.72,46/j),16/j)*.62;return S`
      <g class="planting ${v?"":"faded"}" role="button" aria-label=${q}
        @pointerdown=${N=>this.onPointerDown(N,"planting",e.id)}>
        <title>${q}</title>
        <rect class="planting-rect" x=${a.x} y=${a.y} width=${a.w} height=${a.h} rx=${4/j}
          fill=${d} fill-opacity="0.13" stroke=${o} stroke-width="1.6" stroke-dasharray=${v?"none":"4 3"}></rect>
        ${yt}
        ${Ws?this.renderPill(a.x+a.w/2+Ks+6/j+Wt/2,a.y+a.h/2,m,ce):Zt?this.renderPill(a.x+a.w/2,Zs,m,ce):!Y&&ee<10&&a.w*j>22&&a.h*j>22?S`<text class="mono" x=${a.x+a.w/2} y=${a.y+a.h/2+ce*.35} font-size=${ce} text-anchor="middle">${ws(m)}</text>`:p}
        ${s.perennial&&a.w*j>=36&&a.h*j>=36?this.renderBadge(a.x+a.w-9/j,a.y+a.h-9/j,"\u221E","var(--hl-leaf-700)",7):p}
        ${e.succession_group?this.renderBadge(a.x,a.y,String(e.succession_index+1),"var(--hl-soil-700)"):p}
        ${x.length||z?this.renderBadge(a.x+a.w,a.y,"!",x.some(N=>N.severity==="error")?"var(--hl-tomato-500)":"var(--hl-sun-500)"):p}
      </g>`}renderLinks(){if(!this.showCompanions)return[];let e=[],t=n=>{let i=this.plantings.find(h=>h.id===n),a=i&&this.beds.find(h=>h.id===i.bed_id);if(!i||!a)return null;let o=this.bedAbs(a),d=this.effectiveRect("planting",i.id,{x:o.x+i.x_cm,y:o.y+i.y_cm,w:i.width_cm,h:i.length_cm});return[d.x+d.w/2,d.y+d.h/2]},s=new Set(this.plantings.map(n=>n.id));for(let n of this.beds){let i=this.reports[n.id]??this.analysis?.beds[n.id]?.compatibility;for(let a of i?.pairs??[]){if(a.kind==="same_family"||!s.has(a.a)||!s.has(a.b))continue;let o=t(a.a),d=t(a.b);if(!o||!d)continue;let h=Is[a.kind]??Is.overlap;e.push(S`<line class="link" x1=${o[0]} y1=${o[1]} x2=${d[0]} y2=${d[1]} stroke=${h.color}
          stroke-width=${h.width} stroke-dasharray=${h.dash} stroke-linecap="round" opacity="0.9"><title>${this.t(a.key,a.params)}</title></line>`)}}return e}selectionRect(e){if(e.kind==="feature"){let i=this.features.find(a=>a.id===e.id);return i?this.effectiveRect("feature",i.id,{x:i.x_cm,y:i.y_cm,w:i.width_cm,h:i.length_cm}):null}if(e.kind==="bed"){let i=this.beds.find(a=>a.id===e.id);return i?this.bedAbs(i):null}if(e.kind==="zone"){let i=this.zones.find(a=>a.id===e.id);return i?this.effectiveRect("zone",i.id,ze(i)):null}let t=this.plantings.find(i=>i.id===e.id),s=t&&this.beds.find(i=>i.id===t.bed_id);if(!t||!s)return null;let n=this.bedAbs(s);return this.effectiveRect("planting",t.id,{x:n.x+t.x_cm,y:n.y+t.y_cm,w:t.width_cm,h:t.length_cm})}renderMulti(){if(this.multi.length<2)return[];let e=3/this.k;return this.multi.filter(t=>!(this.selection&&t.kind===this.selection.kind&&t.id===this.selection.id)).map(t=>this.selectionRect(t)).filter(t=>!!t).map(t=>S`<rect class="selected-outline" x=${t.x-e} y=${t.y-e} width=${t.w+e*2} height=${t.h+e*2} opacity="0.7"></rect>`)}renderSelection(){let e=this.selection;if(!e)return p;let t=null;if(e.kind==="feature")t=this.selectionRect(e);else if(e.kind==="bed"){let i=this.beds.find(a=>a.id===e.id);t=i?this.bedAbs(i):null}else if(e.kind==="zone"){let i=this.zones.find(a=>a.id===e.id);t=i?this.effectiveRect("zone",i.id,ze(i)):null}else{let i=this.plantings.find(o=>o.id===e.id),a=i&&this.beds.find(o=>o.id===i.bed_id);if(i&&a){let o=this.bedAbs(a);t=this.effectiveRect("planting",i.id,{x:o.x+i.x_cm,y:o.y+i.y_cm,w:i.width_cm,h:i.length_cm})}}if(!t)return p;let s=10/this.k,n=3/this.k;return S`
      <rect class="selected-outline" x=${t.x-n} y=${t.y-n} width=${t.w+n*2} height=${t.h+n*2}></rect>
      ${this.readonly?p:S`<rect class="handle" x=${t.x+t.w-s/2} y=${t.y+t.h-s/2} width=${s} height=${s} rx=${2/this.k}
        @pointerdown=${i=>this.onPointerDown(i,e.kind,e.id,!0)}></rect>`}`}renderGhost(){let e=this.ghost;if(!e)return p;let t=12/this.k;return S`<g pointer-events="none">
      <rect x=${e.rect.x} y=${e.rect.y} width=${e.rect.w} height=${e.rect.h} rx=${3/this.k}
        fill=${e.color} fill-opacity=${e.valid?.35:.12} stroke=${e.valid?e.color:"var(--hl-tomato-500)"}
        stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      <text class="label" x=${e.rect.x} y=${e.rect.y-t*.5} font-size=${t} font-weight="600">${e.label}</text></g>`}renderDrawRect(){let e=this.drawRect,t=this.drawTool;if(!e||!t||!e.w&&!e.h)return p;let s=12/this.k,n=i=>(i/100).toLocaleString(this.lang==="nl"?"nl-BE":"en-GB",{maximumFractionDigits:1});return S`<g pointer-events="none">
      <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${4/this.k} fill=${t.color} fill-opacity="0.22"
        stroke=${t.color} stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      ${this.renderPill(e.x+e.w/2,e.y+e.h/2,`${t.label} \xB7 ${n(e.w)} \xD7 ${n(e.h)} m`,s)}
    </g>`}outside(e){if(!this.focusZone)return!1;let t=this.zones.find(i=>i.id===this.focusZone);if(!t)return!1;let s=e.x+e.w/2,n=e.y+e.h/2;return!(s>=t.x_cm&&s<=t.x_cm+t.width_cm&&n>=t.y_cm&&n<=t.y_cm+t.length_cm)}render(){let e=this.focusZone,t=(s,n)=>s?S`<g class="dimmed">${n}</g>`:n;return l`
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
          ${this.renderGrid()} ${this.showZones?this.zones.map(s=>t(!!e&&s.id!==e,this.renderZone(s))):p}
          ${this.showFeatures?this.features.map(s=>t(this.outside({x:s.x_cm,y:s.y_cm,w:s.width_cm,h:s.length_cm}),this.renderFeature(s))):p}
          ${this.beds.map(s=>t(!!e&&s.zone_id!==e,this.renderBed(s)))}
          ${this.showPlantings?this.plantings.map(s=>{let n=this.beds.find(i=>i.id===s.bed_id);return t(!!e&&n?.zone_id!==e,this.renderPlanting(s))}):p} ${this.showPlantings?this.renderLinks():p}
          ${this.renderMulti()} ${this.renderSelection()} ${this.renderGhost()} ${this.renderDrawRect()}
        </g>
      </svg>
      <div class="zoom-indicator" aria-hidden="true">${Math.round(this.k*100)} px/m</div>
    `}};M.styles=[T`
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
    `],u([g({attribute:!1})],M.prototype,"zones",2),u([g({attribute:!1})],M.prototype,"beds",2),u([g({attribute:!1})],M.prototype,"plantings",2),u([g({attribute:!1})],M.prototype,"features",2),u([g({attribute:!1})],M.prototype,"multi",2),u([g({type:Boolean})],M.prototype,"showFeatures",2),u([g({type:Boolean})],M.prototype,"showPlantings",2),u([g({type:Boolean})],M.prototype,"showZones",2),u([g({attribute:!1})],M.prototype,"plants",2),u([g({attribute:!1})],M.prototype,"families",2),u([g({attribute:!1})],M.prototype,"selection",2),u([g({attribute:!1})],M.prototype,"ghost",2),u([g({attribute:!1})],M.prototype,"reports",2),u([g({attribute:!1})],M.prototype,"timelines",2),u([g({attribute:!1})],M.prototype,"analysis",2),u([g({attribute:!1})],M.prototype,"t",2),u([g()],M.prototype,"lang",2),u([g({type:Number})],M.prototype,"snapStep",2),u([g({type:Boolean})],M.prototype,"snapOn",2),u([g({type:Boolean})],M.prototype,"showCompanions",2),u([g({type:Boolean})],M.prototype,"showMoisture",2),u([g({type:Boolean})],M.prototype,"showTemperature",2),u([g()],M.prototype,"viewDate",2),u([g({type:Boolean})],M.prototype,"readonly",2),u([g()],M.prototype,"focusZone",2),u([g({attribute:!1})],M.prototype,"drawTool",2),u([f()],M.prototype,"drawRect",2),u([f()],M.prototype,"k",2),u([f()],M.prototype,"tx",2),u([f()],M.prototype,"ty",2),u([f()],M.prototype,"preview",2),u([st("svg")],M.prototype,"svgEl",2),M=u([P("hl-garden-canvas")],M);var vt=class{constructor(r,e=100){this.present=r;this.limit=e;this.past=[];this.future=[]}get current(){return this.present}get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}commit(r){return this.past.push(this.present),this.past.length>this.limit&&this.past.shift(),this.present=r,this.future=[],r}undo(){let r=this.past.pop();return r===void 0?this.present:(this.future.push(this.present),this.present=r,r)}redo(){let r=this.future.pop();return r===void 0?this.present:(this.past.push(this.present),this.present=r,r)}reset(r){this.past=[],this.future=[],this.present=r}};var L=c=>structuredClone(c),bt=()=>({soil_moisture:null,soil_temperature:null,air_temperature:null,air_humidity:null,light:null,rain:null}),Bs=[["buildings",["house","carport","shed","driveway","parking","street","terrace","decking","wall"]],["paths",["path","stone_path","wood_path","stepping_stones","bark_path"]],["green",["lawn","flowerbed","hedge","shrub","tree","pond"]],["outdoor_living",["seating","pool","play","fence","trellis","compost","water_butt","beehive","other"]]],ki=Bs.flatMap(([,c])=>c),xi={path:[300,60],terrace:[400,300],lawn:[500,400],flowerbed:[200,100],compost:[100,100],water_butt:[60,60],shed:[200,150],tree:[400,400],house:[1e3,800],driveway:[300,800],street:[1500,600],parking:[500,500],play:[300,300],beehive:[60,60],hedge:[400,80],fence:[500,10],trellis:[200,20],pond:[200,150],other:[80,80],stone_path:[300,80],wood_path:[300,80],stepping_stones:[300,50],bark_path:[300,60],decking:[400,300],wall:[400,20],carport:[300,500],shrub:[150,150],pool:[800,400],seating:[300,250]},Ut=["outdoor","garden","greenhouse","cold_frame","containers","orchard","fruit","herbs","flowers"],Si=["orchard","fruit","herbs","flowers","garden"],Mi={outdoor:[600,400],greenhouse:[300,200],cold_frame:[150,80],orchard:[1e3,800],fruit:[600,300],herbs:[300,200],flowers:[400,150],garden:[800,600],containers:[400,200]},Ei=["fresh","storage","herbs","pollinators","winter","perennials","easy"],Ti=["vegetable","herb","fruit","flower"];function Gt(c){let r=c.sowing;return r.direct_sow.length&&(!r.indoor_sow.length||c.habit==="root"||c.tags.includes("root"))?"direct_sow":r.indoor_sow.length&&r.transplant.length?"indoor_sow":r.transplant.length?"transplant":"direct_sow"}var k=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.narrow=!1;this.draft={zones:[],beds:[],plantings:[],features:[]};this.selection=null;this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.categoryFilter="";this.autofill=null;this.autofillBusy=!1;this.autofillReplace=!1;this.autofillBeds=[];this.autofillResources=null;this.season=new Date().getFullYear();this.saveState="saved";this.reports={};this.extraTimelines={};this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.layoutMode="block";this.search="";this.familyFilter="";this.paletteDrag=null;this.ghostReport=null;this.dialog=null;this.announcement="";this.paletteOpen=!0;this.step="plant";this.tool=null;this.focusZone="";this.removing=null;this.soilForm=null;this.harvestKg="";this.history=null;this.baseRevision=null;this.checkTimers=new Map;this.ghostCheckAt=0;this.plantMap=new Map}willUpdate(e){e.has("plants")&&(this.plantMap=new Map(this.plants.map(t=>[t.id,t]))),e.has("snapshot")&&this.snapshot&&this.syncFromSnapshot()}syncFromSnapshot(){let e=this.snapshot;this.history||(this.season=e.analysis?.season??new Date().getFullYear(),this.viewDate=e.analysis?.today??"",this.step=e.zones.length?e.plantings.length?"plant":"zones":"site");let t=this.saveState==="saved";if(!this.history||t&&e.revision!==this.baseRevision){let s={zones:L(e.zones),beds:L(e.beds),plantings:L(e.plantings),features:L(e.features??[])};this.history?this.history.reset(s):this.history=new vt(s),this.draft=s,this.baseRevision=e.revision,this.reports={},this.extraTimelines={}}}get timelines(){return{...this.snapshot.analysis?.timelines??{},...this.extraTimelines}}get seasonPlantings(){return this.draft.plantings.filter(e=>ve(e,!!this.plantMap.get(e.plant_id)?.perennial,this.season))}commit(e,t,s=[]){if(!(!this.admin||!this.history)){this.draft=this.history.commit(e),this.saveState="dirty",this.scheduleSave();for(let n of s)this.scheduleCheck(n);t&&this.announce(t)}}undo(){this.history?.canUndo&&(this.draft=this.history.undo(),this.afterHistoryJump())}redo(){this.history?.canRedo&&(this.draft=this.history.redo(),this.afterHistoryJump())}afterHistoryJump(){this.saveState="dirty",this.scheduleSave(),this.draft.beds.forEach(e=>this.scheduleCheck(e.id)),this.selection&&!this.findItem(this.selection)&&(this.selection=null)}scheduleSave(){window.clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>this.save(),1200)}async save(){if(this.saveState!=="dirty")return;let e=this.draft;this.saveState="saving";try{let t=await this.api.savePlan(e,this.baseRevision);this.baseRevision=t.revision,this.saveState=this.draft===e?"saved":"dirty",this.saveState==="dirty"&&this.scheduleSave()}catch(t){t.code==="revision_conflict"?(this.saveState="saved",this.history=null,this.syncFromSnapshot(),this.toast(this.t("common.conflict"))):(this.saveState="error",this.toast(this.t("common.error",{message:t.message??String(t)})))}}scheduleCheck(e){window.clearTimeout(this.checkTimers.get(e)),this.checkTimers.set(e,window.setTimeout(()=>this.runCheck(e),250))}bedPlantings(e,t=this.draft){return t.plantings.filter(s=>s.bed_id===e&&(this.plantMap.get(s.plant_id)?.perennial?ve(s,!0,this.season):Math.abs(s.season-this.season)<=1))}async runCheck(e){let t=this.draft.beds.find(s=>s.id===e);if(!t){let{[e]:s,...n}=this.reports;this.reports=n;return}try{let s=await this.api.checkBed(t,this.bedPlantings(e));this.reports={...this.reports,[e]:s},s.timelines&&(this.extraTimelines={...this.extraTimelines,...s.timelines})}catch{}}findItem(e){return(e.kind==="zone"?this.draft.zones:e.kind==="bed"?this.draft.beds:e.kind==="feature"?this.draft.features:this.draft.plantings).find(s=>s.id===e.id)}onSelect(e){if(!e){this.selection=null,this.multi=[];return}if(e.additive){let t=this.multi.filter(n=>n.kind===e.kind),s=t.some(n=>n.id===e.id);this.multi=s?t.filter(n=>n.id!==e.id):[...t,{kind:e.kind,id:e.id}],this.selection=this.multi[this.multi.length-1]??null,this.announce(this.t("planner.selected_n",{n:this.multi.length}));return}this.selection={kind:e.kind,id:e.id},this.multi=[this.selection]}align(e){if(this.multi.length<2||!this.admin)return;let t=L(this.draft),s=this.multi[0].kind,n=new Set;if(s==="planting"){let i=this.multi.map(d=>t.plantings.find(h=>h.id===d.id)).filter(Boolean),a=new Map(t.beds.map(d=>[d.id,d])),o=i.map(d=>({x:a.get(d.bed_id).x_cm+d.x_cm,y:a.get(d.bed_id).y_cm+d.y_cm,w:d.width_cm,h:d.length_cm}));Ft(o,e).forEach((d,h)=>{let m=i[h],v=a.get(m.bed_id),b=ae({...d,x:d.x-v.x_cm,y:d.y-v.y_cm},{x:0,y:0,w:v.width_cm,h:v.length_cm});Object.assign(m,{x_cm:b.x,y_cm:b.y}),n.add(v.id)})}else{let i=s==="bed"?t.beds:s==="zone"?t.zones:t.features,a=this.multi.map(o=>i.find(d=>d.id===o.id)).filter(Boolean);Ft(a.map(o=>({x:o.x_cm,y:o.y_cm,w:o.width_cm,h:o.length_cm})),e).forEach((o,d)=>{let h=a[d],m=o.x-h.x_cm,v=o.y-h.y_cm;if(h.x_cm=o.x,h.y_cm=o.y,s==="zone")for(let b of t.beds.filter(_=>_.zone_id===h.id))b.x_cm+=m,b.y_cm+=v;s==="bed"&&n.add(h.id)})}this.commit(t,this.t("planner.aligned",{n:this.multi.length}),[...n])}onItemChange(e){let{kind:t,id:s,rect:n,targetBedId:i,dx:a,dy:o,group:d}=e.detail,h=L(this.draft),m=this.snapOn?this.snapshot.settings.snap_cm:1;if(d){this.moveGroup(h,t,a,o);return}if(t==="feature"){let v=h.features.find(b=>b.id===s);Object.assign(v,{x_cm:n.x,y_cm:n.y,width_cm:n.w,length_cm:n.h}),this.commit(h,this.t("planner.moved",{name:v.name}));return}if(t==="zone"){let v=h.zones.find($=>$.id===s),b=n.x-v.x_cm,_=n.y-v.y_cm;if(Object.assign(v,{x_cm:n.x,y_cm:n.y,width_cm:n.w,length_cm:n.h}),b||_)for(let $ of h.beds.filter(x=>x.zone_id===s))$.x_cm+=b,$.y_cm+=_;this.commit(h,this.t("planner.moved",{name:v.name}))}else if(t==="bed"){let v=h.beds.find(x=>x.id===s);Object.assign(v,{x_cm:n.x,y_cm:n.y,width_cm:n.w,length_cm:n.h});let b=n.x+n.w/2,_=n.y+n.h/2,$=[...h.zones].reverse().find(x=>b>=x.x_cm&&b<=x.x_cm+x.width_cm&&_>=x.y_cm&&_<=x.y_cm+x.length_cm);$&&(v.zone_id=$.id),this.commit(h,this.t("planner.moved",{name:v.name}),[v.id])}else{let v=h.plantings.find(z=>z.id===s),b=v.bed_id,_=h.beds.find(z=>z.id===(i??b))??h.beds.find(z=>z.id===b),$=ae({...n,x:n.x-_.x_cm,y:n.y-_.y_cm},{x:0,y:0,w:_.width_cm,h:_.length_cm});Object.assign(v,{bed_id:_.id,x_cm:D($.x,m),y_cm:D($.y,m),width_cm:$.w,length_cm:$.h});let x=this.plantMap.get(v.plant_id);this.commit(h,this.t("planner.moved",{name:y(x,this.lang)}),[...new Set([b,_.id])])}}moveGroup(e,t,s,n){let i=new Set(this.multi.filter(o=>o.kind===t).map(o=>o.id)),a=new Set;if(t==="planting")for(let o of e.plantings.filter(d=>i.has(d.id))){let d=e.beds.find(m=>m.id===o.bed_id),h=ae({x:o.x_cm+s,y:o.y_cm+n,w:o.width_cm,h:o.length_cm},{x:0,y:0,w:d.width_cm,h:d.length_cm});Object.assign(o,{x_cm:h.x,y_cm:h.y}),a.add(d.id)}else{let o=t==="bed"?e.beds:t==="zone"?e.zones:e.features;for(let d of o.filter(h=>i.has(h.id))){if(d.x_cm=Math.round(d.x_cm+s),d.y_cm=Math.round(d.y_cm+n),t==="zone")for(let h of e.beds.filter(m=>m.zone_id===d.id))h.x_cm+=s,h.y_cm+=n;t==="bed"&&a.add(d.id)}}this.commit(e,this.t("planner.moved_n",{n:i.size}),[...a])}updateSelected(e,t){if(!this.selection)return;let s=L(this.draft),i=(this.selection.kind==="zone"?s.zones:this.selection.kind==="bed"?s.beds:this.selection.kind==="feature"?s.features:s.plantings).find(o=>o.id===this.selection.id);if(!i)return;Object.assign(t?i[t]:i,e);let a=this.selection.kind==="planting"?i.bed_id:this.selection.kind==="bed"?i.id:void 0;this.commit(s,void 0,a?[a]:[])}removeSelected(){let e=this.selection;if(!e||!this.admin)return;let t=L(this.draft),s="";if(this.multi.length>1&&(e.kind==="planting"||e.kind==="feature")){let n=new Set(this.multi.map(a=>a.id)),i=t.plantings.filter(a=>n.has(a.id)).map(a=>a.bed_id);t.plantings=t.plantings.filter(a=>!n.has(a.id)),t.features=t.features.filter(a=>!n.has(a.id)),this.commit(t,this.t("planner.removed_n",{n:n.size}),[...new Set(i)]),this.selection=null,this.multi=[];return}if(e.kind==="feature"){let n=t.features.find(i=>i.id===e.id);t.features=t.features.filter(i=>i.id!==e.id),this.commit(t,this.t("planner.removed",{name:n?.name??""})),this.selection=null,this.multi=[];return}if(e.kind==="planting"){let n=t.plantings.find(i=>i.id===e.id);if(n&&this.plantMap.get(n.plant_id)?.perennial&&n.season<this.season){this.removing=n;return}s=y(this.plantMap.get(n?.plant_id??""),this.lang),t.plantings=t.plantings.filter(i=>i.id!==e.id),this.commit(t,this.t("planner.removed",{name:s}),n?[n.bed_id]:[])}else if(e.kind==="bed"){let n=t.beds.find(a=>a.id===e.id),i=t.plantings.filter(a=>a.bed_id===e.id).length;if(i&&!confirm(`${n?.name}: ${this.t("planner.count",{n:i})} \u2013 ${this.t("common.delete")}?`))return;t.beds=t.beds.filter(a=>a.id!==e.id),t.plantings=t.plantings.filter(a=>a.bed_id!==e.id),this.commit(t,this.t("planner.removed",{name:n?.name??""}))}else{let n=t.zones.find(a=>a.id===e.id),i=t.beds.filter(a=>a.zone_id===e.id).map(a=>a.id);if(i.length&&!confirm(`${n?.name}: ${i.length} \xD7 ${this.t("planner.bed_name")} \u2013 ${this.t("common.delete")}?`))return;t.zones=t.zones.filter(a=>a.id!==e.id),t.beds=t.beds.filter(a=>!i.includes(a.id)),t.plantings=t.plantings.filter(a=>!i.includes(a.bed_id)),this.commit(t,this.t("planner.removed",{name:n?.name??""}))}this.selection=null,this.multi=[]}removePerennial(e){let t=this.removing;if(this.removing=null,!t)return;let s=L(this.draft),n=y(this.plantMap.get(t.plant_id),this.lang);e==="delete"?s.plantings=s.plantings.filter(i=>i.id!==t.id):Object.assign(s.plantings.find(i=>i.id===t.id),{removed_season:this.season}),this.selection=null,this.multi=[],this.commit(s,this.t(e==="delete"?"planner.removed":"planner.removed_from",{name:n,season:this.season}),[t.bed_id])}toolInfo(e){return e.kind==="zone"?{label:this.t(`settings.zone_type.${e.type}`),color:X[e.type].stroke.startsWith("var")?"#6f9a45":X[e.type].stroke}:e.kind==="feature"?{label:this.t(`feature.${e.type}`),color:Ke[e.type]?.stroke??"#888"}:{label:this.t(e.bedKind==="container"?"planner.draw_planter":"planner.bed_name"),color:"#8a6a45"}}onDrawRect(e){let t=this.tool;if(!t||!this.admin)return;let s=e.detail,n=L(this.draft),i=(a,o)=>({x:D(s.x-a/2,10),y:D(s.y-o/2,10),w:a,h:o});if(t.kind==="zone"){s.w||(s=i(...Mi[t.type]));let a=n.zones.filter(d=>d.type===t.type).length+1,o={id:te("zone"),name:`${this.t(`settings.zone_type.${t.type}`)}${a>1?` ${a}`:""}`,type:t.type,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:bt(),vent_entity:null};n.zones.push(o),Si.includes(t.type)&&n.beds.push(this.makeBed(o,{x:o.x_cm,y:o.y_cm,w:o.width_cm,h:o.length_cm},o.name,"in_ground")),this.selection={kind:"zone",id:o.id},this.commit(n,this.t("planner.placed",{plant:o.name,bed:""}))}else if(t.kind==="feature"){s.w||(s=i(...xi[t.type]));let a={id:te("ft"),name:this.t(`feature.${t.type}`),type:t.type,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,notes:""};n.features.push(a),this.selection={kind:"feature",id:a.id},this.commit(n,this.t("planner.placed",{plant:a.name,bed:""}))}else{s.w||(s=t.bedKind==="container"?i(80,40):i(120,80));let a=s.x+s.w/2,o=s.y+s.h/2,d=n.zones.find(m=>m.id===this.focusZone)??[...n.zones].reverse().find(m=>a>=m.x_cm&&a<=m.x_cm+m.width_cm&&o>=m.y_cm&&o<=m.y_cm+m.length_cm);if(!d){this.toast(this.t("planner.bed_needs_zone"));return}let h=this.makeBed(d,ae(s,{x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm}),`${this.t(t.bedKind==="container"?"planner.new_planter":"planner.new_bed")} ${n.beds.length+1}`,t.bedKind??(d.type==="containers"?"container":d.type==="outdoor"?"raised":"in_ground"));n.beds.push(h),this.selection={kind:"bed",id:h.id},this.commit(n,this.t("planner.placed",{plant:h.name,bed:d.name}),[h.id])}this.multi=this.selection?[this.selection]:[]}makeBed(e,t,s,n){return{id:te("bed"),name:s,zone_id:e.id,kind:n,x_cm:t.x,y_cm:t.y,width_cm:t.w,length_cm:t.h,orientation_deg:0,soil:n==="container"?"potting_mix":"loam",shade_pct:null,sensors:bt(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""}}openZone(e){this.focusZone=e,this.step==="site"&&(this.step="zones");let t=this.draft.zones.find(s=>s.id===e);this.selection=t?{kind:"zone",id:t.id}:null,this.multi=this.selection?[this.selection]:[],requestAnimationFrame(()=>t?this.canvas?.fitRect({x:t.x_cm,y:t.y_cm,w:t.width_cm,h:t.length_cm}):this.canvas?.fit())}closeZone(){this.focusZone="",requestAnimationFrame(()=>this.canvas?.fit())}moveToBed(e,t){let s=L(this.draft),n=s.plantings.find(m=>m.id===e),i=s.beds.find(m=>m.id===t);if(!n||!i)return;let a=n.bed_id,o=this.bedPlantings(i.id,s).filter(m=>m.season===n.season).map(m=>({x:m.x_cm,y:m.y_cm,w:m.width_cm,h:m.length_cm})),d={w:Math.min(n.width_cm,i.width_cm),h:Math.min(n.length_cm,i.length_cm)},h=ye(i,d,o,this.snapshot.settings.snap_cm)??{x:0,y:0};Object.assign(n,{bed_id:i.id,x_cm:h.x,y_cm:h.y,width_cm:d.w,length_cm:d.h}),this.commit(s,this.t("planner.moved",{name:y(this.plantMap.get(n.plant_id),this.lang)}),[a,i.id])}openAutofill(e=[]){let t=this.snapshot.settings.resources;this.autofillResources=t?L(t):{household_size:2,hours_per_week:3,water_liters_per_week:null,compost_kg:null,irrigation:!1,goals:["fresh","herbs"],wanted:[],excluded:[]},this.autofill=null,this.autofillBeds=e,this.dialog="autofill"}async runAutofill(){if(this.autofillResources){this.autofillBusy=!0;try{this.saveState!=="saved"&&await this.save(),this.autofill=await this.api.autofill({season:this.season,bed_ids:this.autofillBeds.length?this.autofillBeds:void 0,replace:this.autofillReplace,resources:this.autofillResources})}catch(e){this.toast(this.t("common.error",{message:e.message??String(e)}))}finally{this.autofillBusy=!1}}}async applyAutofill(){let e=this.autofill;if(e)try{let t=await this.api.autofillApply(e.plantings,this.autofillReplace?e.beds:[],this.baseRevision);this.baseRevision=t.revision,this.history=null,this.saveState="saved",this.dialog=null,this.autofill=null,this.toast(this.t("autofill.applied",{n:e.summary.plantings}))}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}}duplicateSelected(){let e=this.selection;if(!e||e.kind!=="planting")return;let t=L(this.draft),s=t.plantings.find(d=>d.id===e.id),n=s&&t.beds.find(d=>d.id===s.bed_id);if(!s||!n)return;let i=this.bedPlantings(n.id,t).filter(d=>d.season===s.season).map(d=>({x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm})),a=ye(n,{w:s.width_cm,h:s.length_cm},i,this.snapshot.settings.snap_cm)??{x:s.x_cm,y:s.y_cm},o={...L(s),id:te("pl"),x_cm:a.x,y_cm:a.y,succession_group:null,succession_index:0,status:"planned",sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null};t.plantings.push(o),this.selection={kind:"planting",id:o.id},this.commit(t,void 0,[n.id])}nudge(e,t,s=!1){let n=this.selection;if(!n||!this.admin)return;let i=L(this.draft),a=[];if(n.kind==="planting"){let o=i.plantings.find(v=>v.id===n.id),d=i.beds.find(v=>v.id===o.bed_id),h=s?{x:o.x_cm,y:o.y_cm,w:Math.max(5,o.width_cm+e),h:Math.max(5,o.length_cm+t)}:{x:o.x_cm+e,y:o.y_cm+t,w:o.width_cm,h:o.length_cm},m=ae(h,{x:0,y:0,w:d.width_cm,h:d.length_cm});Object.assign(o,{x_cm:m.x,y_cm:m.y,width_cm:m.w,length_cm:m.h}),a.push(d.id)}else{let o=(n.kind==="bed"?i.beds:i.zones).find(d=>d.id===n.id);if(s)o.width_cm=Math.max(10,o.width_cm+e),o.length_cm=Math.max(10,o.length_cm+t);else if(o.x_cm+=e,o.y_cm+=t,n.kind==="zone")for(let d of i.beds.filter(h=>h.zone_id===n.id))d.x_cm+=e,d.y_cm+=t;n.kind==="bed"&&a.push(n.id)}this.commit(i,void 0,a)}newPlanting(e,t,s){return{id:te("pl"),plant_id:e.id,bed_id:t.id,season:this.season,layout:this.layoutMode,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,count:null,method:Gt(e),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:""}}addToSelectedBed(e){if(!this.admin)return;let t=L(this.draft),s=this.selection?.kind==="bed"?this.selection.id:this.selection?.kind==="planting"?t.plantings.find(h=>h.id===this.selection.id)?.bed_id:void 0,n=t.beds.find(h=>h.id===s)??t.beds[0];if(!n)return;let i=Ze(e,this.layoutMode,n),a=this.bedPlantings(n.id,t).filter(h=>h.season===this.season).map(h=>({x:h.x_cm,y:h.y_cm,w:h.width_cm,h:h.length_cm})),o=ye(n,i,a,this.snapshot.settings.snap_cm)??{x:0,y:0},d=this.newPlanting(e,n,{...o,...i});t.plantings.push(d),this.selection={kind:"planting",id:d.id},this.commit(t,this.t("planner.placed",{plant:y(e,this.lang),bed:n.name}),[n.id]),this.canvas?.focusCanvas()}addBed(){let e=L(this.draft),t=this.selection?.kind==="zone"&&e.zones.find(o=>o.id===this.selection.id)||e.zones.find(o=>o.type==="outdoor")||e.zones[0];if(!t)return this.addZone();let s={w:120,h:80},n=e.beds.filter(o=>o.zone_id===t.id).map(o=>({x:o.x_cm-t.x_cm-20,y:o.y_cm-t.y_cm-20,w:o.width_cm+40,h:o.length_cm+40})),i=ye({...e.beds[0],width_cm:t.width_cm,length_cm:t.length_cm},s,n,10)??{x:20,y:20},a={id:te("bed"),name:`${this.t("planner.new_bed")} ${e.beds.length+1}`,zone_id:t.id,kind:"raised",x_cm:t.x_cm+i.x,y_cm:t.y_cm+i.y,width_cm:s.w,length_cm:s.h,orientation_deg:0,soil:"loam",shade_pct:null,sensors:bt(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""};e.beds.push(a),this.selection={kind:"bed",id:a.id},this.commit(e,this.t("planner.placed",{plant:a.name,bed:t.name}),[a.id])}addZone(){let e=L(this.draft),t=ft(e.zones,e.beds),s={id:te("zone"),name:`${this.t("planner.new_zone")} ${e.zones.length+1}`,type:"outdoor",x_cm:e.zones.length?t.x+t.w+100:0,y_cm:e.zones.length?t.y:0,width_cm:400,length_cm:300,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:bt(),vent_entity:null};e.zones.push(s),this.selection={kind:"zone",id:s.id},this.commit(e),requestAnimationFrame(()=>this.canvas?.fit())}onPalettePointerDown(e,t){!this.admin||e.pointerType==="mouse"&&e.button!==0||(e.currentTarget.setPointerCapture(e.pointerId),this.paletteDrag={plant:t,pointerId:e.pointerId,bedId:null,rect:null},this.ghostReport=null)}onPalettePointerMove(e){let t=this.paletteDrag;if(!t||t.pointerId!==e.pointerId)return;let s=this.canvas.clientToCanvas(e.clientX,e.clientY);if(!s){this.paletteDrag={...t,bedId:null,rect:null};return}let n=Ls(this.draft.beds,s.x,s.y);if(!n){let h={w:t.plant.spacing_cm,h:t.plant.spacing_cm};this.paletteDrag={...t,bedId:null,rect:{x:s.x-h.w/2,y:s.y-h.h/2,...h}};return}let i=Ze(t.plant,this.layoutMode,n),a=this.snapOn?this.snapshot.settings.snap_cm:1,o={x:D(s.x-n.x_cm-i.w/2,a),y:D(s.y-n.y_cm-i.h/2,a),...i};this.layoutMode==="row"&&(o=n.width_cm>=n.length_cm?{...o,x:0}:{...o,y:0}),o=ae(o,{x:0,y:0,w:n.width_cm,h:n.length_cm}),this.paletteDrag={...t,bedId:n.id,rect:{...o,x:o.x+n.x_cm,y:o.y+n.y_cm}};let d=performance.now();if(d-this.ghostCheckAt>220){this.ghostCheckAt=d;let h=this.newPlanting(t.plant,n,o);h.id="__ghost__",this.api.checkBed(n,[...this.bedPlantings(n.id),h]).then(m=>{this.paletteDrag&&(this.ghostReport=m)}).catch(()=>{})}}onPalettePointerUp(e){let t=this.paletteDrag;if(!t||t.pointerId!==e.pointerId)return;if(this.paletteDrag=null,this.ghostReport=null,!t.bedId||!t.rect){t.rect&&this.announce(this.t("planner.no_bed_here"));return}let s=L(this.draft),n=s.beds.find(a=>a.id===t.bedId),i=this.newPlanting(t.plant,n,{...t.rect,x:t.rect.x-n.x_cm,y:t.rect.y-n.y_cm});s.plantings.push(i),this.selection={kind:"planting",id:i.id},this.commit(s,this.t("planner.placed",{plant:y(t.plant,this.lang),bed:n.name}),[n.id])}ghostLabel(){let e=this.paletteDrag,t=y(e.plant,this.lang);if(!e.bedId)return t;let s=(this.ghostReport?.pairs??[]).filter(o=>o.a==="__ghost__"||o.b==="__ghost__"),n=s.filter(o=>o.kind==="enemy"||o.kind==="overlap").length,i=s.filter(o=>o.kind==="friend").length,a=(this.ghostReport?.rotation??[]).some(o=>o.planting==="__ghost__");return`${t}${i?` \xB7 \u2665 ${i}`:""}${n?` \xB7 \u26A0 ${n}`:""}${a?" \xB7 \u27F2":""}`}onKeyDown(e){let t=e.composedPath()[0];if(["INPUT","SELECT","TEXTAREA"].includes(t?.tagName))return;let s=e.ctrlKey||e.metaKey,n=(this.snapOn?this.snapshot.settings.snap_cm:1)*(e.shiftKey?10:1),i=e.key,a=()=>{e.preventDefault(),e.stopPropagation()};if(s&&i.toLowerCase()==="z"&&!e.shiftKey)return this.undo(),a();if(s&&i.toLowerCase()==="y"||s&&e.shiftKey&&i.toLowerCase()==="z")return this.redo(),a();if(s&&i.toLowerCase()==="d")return this.duplicateSelected(),a();if(s)return;let o={ArrowLeft:[-n,0],ArrowRight:[n,0],ArrowUp:[0,-n],ArrowDown:[0,n]};if(o[i]&&this.selection)return this.nudge(...o[i],e.altKey),a();switch(i){case"Delete":case"Backspace":return this.removeSelected(),a();case"Escape":return this.selection=null,this.multi=[],this.paletteDrag=null,this.dialog=null,a();case"g":return this.snapOn=!this.snapOn,a();case"c":return this.showCompanions=!this.showCompanions,a();case"m":return this.showMoisture=!this.showMoisture,a();case"t":return this.showTemperature=!this.showTemperature,a();case"+":case"=":return this.canvas.zoom(1.2),a();case"-":return this.canvas.zoom(1/1.2),a();case"0":return this.canvas.fit(),a();case"?":return this.dialog="shortcuts",a();case"]":case"[":return this.cycleSelection(i==="]"?1:-1),a();default:}}cycleSelection(e){let t=[...this.draft.beds.map(a=>({kind:"bed",id:a.id})),...this.seasonPlantings.map(a=>({kind:"planting",id:a.id}))];if(!t.length)return;let s=this.selection?t.findIndex(a=>a.id===this.selection.id):-1;this.selection=t[(s+e+t.length)%t.length];let n=this.findItem(this.selection),i=this.selection.kind==="planting"?y(this.plantMap.get(n.plant_id),this.lang):n.name;this.announce(i)}announce(e){this.announcement="",requestAnimationFrame(()=>this.announcement=e)}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async exportPlan(e){let{filename:t,content:s}=await this.api.exportPlan(e);at(t,s,e==="json"?"application/json":"application/yaml")}async importPlan(e){e.preventDefault();let t=e.target,s=t.elements.namedItem("file").files?.[0],n=t.elements.namedItem("mode").value;if(s)try{let i=await this.api.importPlan(await s.text(),n);this.history=null,this.saveState="saved",this.dialog=null,this.toast(this.t("planner.imported",{beds:i.counts.beds,plantings:i.counts.plantings}))}catch(i){this.toast(this.t("common.error",{message:i.message??String(i)}))}}async createSuccession(e){e.preventDefault();let t=this.selection,s=t?.kind==="planting"?this.draft.plantings.find(m=>m.id===t.id):void 0;if(!s)return;let n=e.target,i=Number(n.elements.namedItem("count").value),a=Number(n.elements.namedItem("interval").value)||null,o=n.elements.namedItem("placement").value,d=await this.api.succession(s,i,a,o),h=L(this.draft);h.plantings=h.plantings.filter(m=>m.id!==s.id).concat(d.plantings),this.dialog=null,this.commit(h,void 0,[s.bed_id]),d.dropped&&this.toast(this.t("planner.succession_dropped",{n:d.dropped}))}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal()}render(){if(!this.history)return l`<p class="empty">${this.t("common.loading")}</p>`;let e=this.paletteDrag,t=e?.rect?{rect:e.rect,valid:!!e.bedId,color:A(this.families,e.plant.family),label:this.ghostLabel()}:null;return l`
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
            <button class="btn small ghost" @click=${()=>this.tool=null}>${this.t("common.done")}</button></div>`:p}
          ${e?l`<div class="drag-ghost-hint" role="status">${t?t.label:y(e.plant,this.lang)}</div>`:p}
        </div>
        ${this.renderInspector()}
      </div>
      <div class="visually-hidden" role="status" aria-live="polite">${this.announcement}</div>
      ${this.renderDialog()}
    `}renderToolbar(){let e=[this.season-1,this.season,this.season+1],t={saved:"common.saved",dirty:"common.unsaved",saving:"common.saving",error:"common.unsaved"}[this.saveState],s=(n,i,a,o,d=!1)=>l`
      <button class="icon-btn" title=${i} aria-label=${i} aria-pressed=${o===void 0?p:String(o)} ?disabled=${d} @click=${a}>
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
          ${s("mdi:distribute-vertical-center",this.t("planner.align.vdistribute"),()=>this.align("vdistribute"),void 0,this.multi.length<3)}`:p}
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
          <button class="btn small" @click=${()=>this.addBed()}><ha-icon icon="mdi:plus"></ha-icon>${this.t("planner.add_bed")}</button>
          ${this.step!=="site"?l`<button class="btn small" @click=${()=>{this.closeZone(),this.step="site",this.tool=null}}>
            <ha-icon icon="mdi:draw"></ha-icon>${this.t("planner.draw_site")}</button>`:p}`:p}
        <details class="more">
          <summary class="icon-btn" title=${this.t("planner.more")} aria-label=${this.t("planner.more")}><ha-icon icon="mdi:dots-vertical"></ha-icon></summary>
          <div class="menu" role="menu">
            <button role="menuitem" @click=${()=>this.exportPlan("json")}><ha-icon icon="mdi:file-export-outline"></ha-icon>${this.t("planner.export_json")}</button>
            <button role="menuitem" @click=${()=>this.exportPlan("yaml")}><ha-icon icon="mdi:code-braces"></ha-icon>${this.t("planner.export_yaml")}</button>
            ${this.admin?l`<button role="menuitem" @click=${()=>this.dialog="import"}><ha-icon icon="mdi:file-import-outline"></ha-icon>${this.t("planner.import")}</button>`:p}
            <button role="menuitem" @click=${()=>this.dialog="shortcuts"}><ha-icon icon="mdi:keyboard-outline"></ha-icon>${this.t("planner.shortcuts")} (?)</button>
          </div>
        </details>
      </div>
      ${this.admin?p:l`<p class="readonly-note">${this.t("common.admin_only")}</p>`}
    `}renderStepper(){let e=[["site","mdi:vector-square","planner.step.site"],["zones","mdi:texture-box","planner.step.zones"],["plant","mdi:sprout","planner.step.plant"]],t=this.draft.zones.find(s=>s.id===this.focusZone);return l`<nav class="stepper" aria-label=${this.t("planner.steps")}>
      ${e.map(([s,n,i],a)=>l`
        <button class="step ${this.step===s?"active":""}" aria-current=${this.step===s?"step":p}
          @click=${()=>{this.step=s,this.tool=null}}>
          <span class="num">${a+1}</span><ha-icon icon=${n}></ha-icon>
          <span class="txt"><b>${this.t(i)}</b><span class="xs muted">${this.t(`${i}.hint`)}</span></span>
        </button>${a<e.length-1?l`<span class="step-sep" aria-hidden="true">›</span>`:p}`)}
      <span class="spacer"></span>
      <span class="crumbs" aria-label=${this.t("planner.zone_map")}>
        <button class="chip ${t?"":"ok"}" @click=${()=>this.closeZone()}><ha-icon icon="mdi:home-outline"></ha-icon>${this.t("planner.whole_garden")}</button>
        ${t?l`<span aria-hidden="true">›</span><span class="chip ok">${X[t.type]?.icon??""} ${t.name}</span>`:p}
      </span>
    </nav>`}renderToolButton(e,t,s,n=""){let i=this.tool&&this.tool.kind===e.kind&&("type"in e?this.tool.type===e.type:this.tool.bedKind===e.bedKind);return l`<button class="tool ${i?"active":""}" aria-pressed=${String(!!i)} title=${n||s} ?disabled=${!this.admin}
      @click=${()=>this.tool=i?null:e}>
      <span class="tool-icon">${t}</span><span class="tool-label">${s}</span></button>`}renderFeatureGroups(){return l`${Bs.map(([e,t])=>l`
      <h4>${this.t(`planner.elements.${e}`)}</h4>
      <div class="tool-grid">
        ${t.map(s=>this.renderToolButton({kind:"feature",type:s},Ke[s]?.icon||"\u25AD",this.t(`feature.${s}`)))}
      </div>`)}`}renderSitePane(){return l`<aside class="pane" aria-label=${this.t("planner.step.site")}>
      <header><h3>${this.t("planner.step.site")}</h3><hl-info term="zones" .t=${this.t}></hl-info></header>
      <div class="pane-body stack">
        <p class="small muted">${this.t("planner.site_intro")}</p>
        <h4>${this.t("planner.zones")}</h4>
        <div class="tool-grid">
          ${Ut.map(e=>this.renderToolButton({kind:"zone",type:e},X[e].icon,this.t(`settings.zone_type.${e}`),this.t(`zone_hint.${e}`)))}
        </div>
        ${this.renderFeatureGroups()}
        <div class="divider"></div>
        <h4>${this.t("planner.your_zones")} (${this.draft.zones.length})</h4>
        ${this.draft.zones.length?l`<div class="stack" style="gap:6px">${this.draft.zones.map(e=>l`
          <div class="zone-row"><span>${X[e.type]?.icon}</span>
            <span class="grow"><b>${e.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${e.type}`)} · ${(e.width_cm/100).toFixed(1)} × ${(e.length_cm/100).toFixed(1)} m</span></span>
            <button class="btn small ghost" @click=${()=>this.openZone(e.id)}>${this.t("planner.open_zone")}</button></div>`)}</div>`:l`<p class="xs muted">${this.t("planner.no_zones")}</p>`}
        ${this.draft.zones.length?l`<button class="btn primary" @click=${()=>{this.step="zones",this.tool=null}}>${this.t("planner.next")}: ${this.t("planner.step.zones")} ›</button>`:p}
      </div>
    </aside>`}renderZonesPane(){let e=this.draft.zones.find(n=>n.id===this.focusZone);if(!e)return l`<aside class="pane" aria-label=${this.t("planner.step.zones")}>
        <header><h3>${this.t("planner.step.zones")}</h3></header>
        <div class="pane-body stack">
          <p class="small muted">${this.t("planner.zones_intro")}</p>
          ${this.draft.zones.map(n=>{let i=this.draft.beds.filter(o=>o.zone_id===n.id),a=this.seasonPlantings.filter(o=>i.some(d=>d.id===o.bed_id)).length;return l`<button class="zone-card" style=${`border-left-color:${X[n.type]?.stroke}`} @click=${()=>this.openZone(n.id)}>
              <span class="big">${X[n.type]?.icon}</span>
              <span class="grow"><b>${n.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${n.type}`)} ·
                ${this.t("planner.n_beds",{n:i.length})} · ${this.t("planner.count",{n:a})}</span></span>
              <ha-icon icon="mdi:chevron-right"></ha-icon></button>`})}
          ${this.draft.zones.length?p:l`<button class="btn" @click=${()=>this.step="site"}>‹ ${this.t("planner.step.site")}</button>`}
        </div>
      </aside>`;let t=this.draft.beds.filter(n=>n.zone_id===e.id),s=!this.admin;return l`<aside class="pane" aria-label=${e.name}>
      <header><button class="icon-btn" aria-label=${this.t("planner.whole_garden")} @click=${()=>this.closeZone()}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <h3>${X[e.type]?.icon} ${e.name}</h3></header>
      <div class="pane-body stack">
        <label class="field">${this.t("planner.zone_name")}<input .value=${e.name} ?disabled=${s}
          @change=${n=>this.updateZone(e.id,{name:n.target.value})} /></label>
        <label class="field">${this.t("planner.kind")}
          <select ?disabled=${s} @change=${n=>this.updateZone(e.id,{type:n.target.value})}>
            ${Ut.map(n=>l`<option value=${n} ?selected=${e.type===n}>${this.t(`settings.zone_type.${n}`)}</option>`)}
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
        <div class="stack" style="gap:4px">${t.map(n=>l`<button class="zone-row as-btn" @click=${()=>this.onSelect({kind:"bed",id:n.id})}>
          <span>▭</span><span class="grow"><b>${n.name}</b> <span class="xs muted">${(n.width_cm/100).toFixed(1)} × ${(n.length_cm/100).toFixed(1)} m · ${this.t(`kind.${n.kind}`)}</span></span></button>`)}</div>
        <div class="divider"></div>
        <div class="row wrap">
          <button class="btn primary" @click=${()=>{this.step="plant",this.tool=null}}><ha-icon icon="mdi:sprout"></ha-icon>${this.t("planner.fill_by_hand")}</button>
          ${s?p:l`<button class="btn" @click=${()=>{this.autofillBeds=t.map(n=>n.id),this.openAutofill(t.map(n=>n.id))}}>
            <ha-icon icon="mdi:auto-fix"></ha-icon>${this.t("planner.fill_by_system")}</button>`}
        </div>
      </div>
    </aside>`}updateZone(e,t){let s=L(this.draft),n=s.zones.find(i=>i.id===e);n&&(Object.assign(n,t),this.commit(s))}renderPalette(){let e=this.search.trim().toLowerCase(),t=this.draft.zones.find(a=>a.id===this.focusZone),s=t?xs[t.type]:null,n=this.plants.filter(a=>s&&!this.categoryFilter&&!s.includes(a.category??"vegetable")||this.familyFilter&&a.family!==this.familyFilter||this.categoryFilter&&(a.category??"vegetable")!==this.categoryFilter?!1:e?[a.id,a.scientific_name,...Object.values(a.names)].some(o=>o.toLowerCase().includes(e)):!0).sort((a,o)=>y(a,this.lang).localeCompare(y(o,this.lang))),i=[...new Set(this.plants.map(a=>a.family))].sort();return l`
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
            ${Ti.map(a=>l`<button class="chip" aria-pressed=${String(this.categoryFilter===a)}
              @click=${()=>this.categoryFilter=this.categoryFilter===a?"":a}>${this.t(`category.${a}`)}</button>`)}
          </div>
          <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
            <select @change=${a=>this.familyFilter=a.target.value}>
              <option value="" ?selected=${!this.familyFilter}>${this.t("lib.family")}: ${this.t("common.all")}</option>
              ${i.map(a=>l`<option value=${a} ?selected=${this.familyFilter===a}>${this.families[a]?.[this.lang]??a}</option>`)}
            </select></label>
          ${t?l`<p class="xs zone-filter">${X[t.type]?.icon} ${this.t("planner.palette_for_zone",{zone:t.name})}</p>`:p}
          <p class="xs muted">${this.t("planner.palette_hint")}</p>
          <div class="palette-list" role="list">
            ${n.map(a=>{let o=y(a,this.lang);return l`
                <button class="plant-card" role="listitem" aria-label=${`${o}, ${a.scientific_name}`}
                  @pointerdown=${d=>this.onPalettePointerDown(d,a)}
                  @pointermove=${this.onPalettePointerMove}
                  @pointerup=${this.onPalettePointerUp}
                  @pointercancel=${()=>this.paletteDrag=null}
                  @keydown=${d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),this.addToSelectedBed(a))}}>
                  <span class="swatch" style=${`border-color:${A(this.families,a.family)}`}>${de(se(a),a.color||A(this.families,a.family),26)}</span>
                  <span class="meta"><span>${o}${a.perennial?l` <span class="perennial-tag" title=${this.t("planner.perennial")}>∞</span>`:p}</span>
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
            ${i.map(a=>l`<span><span class="family-dot" style=${`background:${A(this.families,a)}`}></span>${this.families[a]?.[this.lang]??a}</span>`)}
          </div>
          </div>
        </div>
      </aside>
    `}findingParams(e){let t={...e.params};for(let[s,n]of[[e.a,"a"],[e.b,"b"]]){let i=this.draft.plantings.find(a=>a.id===s);i&&i.season!==this.season&&!this.plantMap.get(i.plant_id)?.perennial&&typeof t[n]=="string"&&(t[n]=this.t("planner.other_season",{name:t[n],year:i.season}))}return t}renderFindings(e,t){let s=this.reports[e]??this.snapshot.analysis?.beds[e]?.compatibility,n=this.reports[e]?.rotation??this.snapshot.analysis?.beds[e]?.rotation??[],i=(s?.pairs??[]).filter(m=>!t||m.a===t||m.b===t),a=n.filter(m=>!t||m.planting===t),o=(s?.placement??[]).filter(m=>!t||m.planting===t),d=t?s?.out_of_bounds?.includes(t):(s?.out_of_bounds?.length??0)>0,h={error:"mdi:alert-octagon-outline",warning:"mdi:alert-outline",info:"mdi:heart-outline"};return!i.length&&!a.length&&!d&&!o.length?l`<p class="small muted">${this.t("planner.no_warnings")}</p>`:l`<div class="stack" style="gap:6px">
      ${i.map(m=>l`<div class="finding ${m.severity}"><ha-icon icon=${h[m.severity]}></ha-icon><span>${this.t(m.key,this.findingParams(m))}</span></div>`)}
      ${a.map(m=>l`<div class="finding ${m.severity}"><ha-icon icon="mdi:rotate-3d-variant"></ha-icon><span>${this.t(m.key,m.params)}
        <hl-info term="rotation" .t=${this.t}></hl-info>
        ${m.alternatives?.length?l`<br /><span class="xs">${this.t("planner.alternatives")}:
          ${m.alternatives.map(v=>l`<button class="chip" ?disabled=${!this.admin} @click=${()=>this.moveToBed(m.planting,v)}>${this.draft.beds.find(b=>b.id===v)?.name??v}</button>`)}</span>`:p}</span></div>`)}
      ${t&&s?.suggestions?.[t]?.length?l`<div class="finding info"><ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
        <span>${this.t("planner.better_neighbours")}: ${s.suggestions[t].map(m=>y(this.plantMap.get(m),this.lang)).join(", ")}</span></div>`:p}
      ${o.map(m=>l`<div class="finding warning"><ha-icon icon="mdi:greenhouse"></ha-icon><span>${this.t(m.key,m.params)}</span></div>`)}
      ${d?l`<div class="finding warning"><ha-icon icon="mdi:border-outside"></ha-icon><span>${this.t("planner.out_of_bounds")}</span></div>`:p}
    </div>`}renderTimeline(e){if(!e)return l`<p class="small muted">–</p>`;let s=this.snapshot.settings.region.hemisphere==="south"?`${this.season}-07-01`:`${this.season}-01-01`,n=485,i=h=>h?Math.max(0,Math.min(100,fe(s,h)/n*100)):null,a=(h,m,v,b,_)=>{let $=i(h),x=i(m);return $===null||x===null?p:l`<div class="bar" title=${`${_}: ${w(h,this.lang)} \u2013 ${w(m,this.lang)}`}
        style=${`left:${$}%;width:${Math.max(x-$,1)}%;top:${v}px;background:${b}`}></div>`},o=Array.from({length:16},(h,m)=>I(s,Math.round(m*30.4))),d=this.snapshot.analysis?.today;return l`
      <div class="timeline" role="img" aria-label=${`${this.t("lib.harvest")} ${w(e.harvest_start,this.lang)} \u2013 ${w(e.harvest_end,this.lang)}`}>
        ${a(e.sow_window?.start,e.sow_window?.end,6,"var(--hl-leaf-300)",this.t(e.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow"))}
        ${a(e.transplant_window?.start,e.transplant_window?.end,20,"var(--hl-leaf-600)",this.t("lib.transplant"))}
        ${a(e.in_ground,e.harvest_start,34,"color-mix(in srgb, var(--hl-leaf-500) 35%, transparent)",this.t("dash.active_crops",{n:1}))}
        ${a(e.harvest_start,e.harvest_end,34,"var(--hl-sun-500)",this.t("lib.harvest"))}
        ${o.filter((h,m)=>m%2===0).map(h=>l`<span class="month" style=${`left:${i(h)}%`}>${w(h,this.lang,{month:"short"})}</span>`)}
        ${d&&i(d)!==null?l`<div class="today" style=${`left:${i(d)}%`}></div>`:p}
      </div>
      <div class="xs muted" style="margin-top:4px">
        ${e.sow_date?l`${this.t(e.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}: <b>${w(e.sow_date,this.lang)}</b> · `:p}
        ${e.transplant_date?l`${this.t("lib.transplant")}: <b>${w(e.transplant_date,this.lang)}</b> · `:p}
        ${this.t("lib.harvest")}: <b>${w(e.harvest_start,this.lang)} – ${w(e.harvest_end,this.lang)}</b>
      </div>`}renderPhenology(e){let t=this.snapshot.analysis?.phenology?.[e];return!t||t.stage==="not_planted"?p:l`<div class="row wrap">
      <span class="chip ok"><ha-icon icon="mdi:sprout"></ha-icon>${this.t(`stage.${t.stage}`)}</span>
      <span class="chip">Kc ${t.kc.toFixed(2)} <hl-info term="kc" .t=${this.t}></hl-info></span>
      ${t.gdd!=null&&t.gdd_target?l`<span class="chip">${Math.round(t.gdd)} / ${t.gdd_target} GDD <hl-info term="gdd" .t=${this.t}></hl-info></span>`:p}
      ${t.harvest_estimate?l`<span class="chip warn"><ha-icon icon="mdi:basket-outline"></ha-icon>${this.t("cal.harvest_estimate",{date:w(t.harvest_estimate,this.lang)})}</span>`:p}
      ${t.heat_stress_days?l`<span class="chip bad">${this.t("planner.heat_stress",{n:t.heat_stress_days})}</span>`:p}
    </div>`}renderAutofill(){let e=this.autofillResources,t=o=>this.autofillResources={...e,...o},s=this.autofill,n=[...this.plants].sort((o,d)=>y(o,this.lang).localeCompare(y(d,this.lang))),i=()=>this.dialog=null,a=o=>this.draft.beds.find(d=>d.id===o)?.name??o;return l`<div class="stack">
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
        ${Ei.map(o=>l`<button class="chip" aria-pressed=${String(e.goals.includes(o))}
          @click=${()=>t({goals:e.goals.includes(o)?e.goals.filter(d=>d!==o):[...e.goals,o]})}>${this.t(`autofill.goal.${o}`)}</button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("autofill.wanted")}
          <select @change=${o=>{let d=o.target;d.value&&!e.wanted.includes(d.value)&&t({wanted:[...e.wanted,d.value]}),d.value=""}}>
            <option value="">+</option>${n.map(o=>l`<option value=${o.id}>${y(o,this.lang)}</option>`)}</select></label>
        <label class="field">${this.t("autofill.excluded")}
          <select @change=${o=>{let d=o.target;d.value&&!e.excluded.includes(d.value)&&t({excluded:[...e.excluded,d.value]}),d.value=""}}>
            <option value="">+</option>${n.map(o=>l`<option value=${o.id}>${y(o,this.lang)}</option>`)}</select></label>
      </div>
      <div class="row wrap">
        ${e.wanted.map(o=>l`<button class="chip ok" title=${this.t("common.delete")} @click=${()=>t({wanted:e.wanted.filter(d=>d!==o)})}>♥ ${y(this.plantMap.get(o),this.lang)} ✕</button>`)}
        ${e.excluded.map(o=>l`<button class="chip bad" title=${this.t("common.delete")} @click=${()=>t({excluded:e.excluded.filter(d=>d!==o)})}>⊘ ${y(this.plantMap.get(o),this.lang)} ✕</button>`)}
      </div>
      <fieldset class="prefs"><legend>${this.t("autofill.prefs")}</legend>
        <label class="field">${this.t("autofill.freedom")}
          <select @change=${o=>t({freedom:o.target.value})}>
            ${["strict","balanced","free"].map(o=>l`<option value=${o} ?selected=${(e.freedom??"balanced")===o}>${this.t(`autofill.freedom.${o}`)}</option>`)}
          </select></label>
        ${["respect_companions","add_pollinators","year_round","allow_perennials","match_zone_type"].map(o=>l`
          <label class="row small"><input type="checkbox" .checked=${e[o]??!["year_round"].includes(o)}
            @change=${d=>t({[o]:d.target.checked})} />${this.t(`autofill.pref.${o}`)}</label>`)}
      </fieldset>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.beds")}><span class="small">${this.t("autofill.beds")}:</span>
        ${this.draft.beds.map(o=>l`<button class="chip" aria-pressed=${String(this.autofillBeds.includes(o.id))}
          @click=${()=>this.autofillBeds=this.autofillBeds.includes(o.id)?this.autofillBeds.filter(d=>d!==o.id):[...this.autofillBeds,o.id]}>${o.name}</button>`)}
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
        ${s.warnings.map(o=>l`<div class="finding warning"><ha-icon icon="mdi:alert-outline"></ha-icon><span>${this.t(o.key,{...o.params,plants:Array.isArray(o.params.plants)?o.params.plants.map(d=>y(this.plantMap.get(d),this.lang)).join(", "):o.params.plants})}</span></div>`)}
        <div style="max-height:30vh;overflow:auto"><table class="shortcuts" style="width:100%">
          <tr><th align="left">${this.t("lib.plant")}</th><th align="left">${this.t("task.bed")}</th><th align="right">#</th><th align="right">m²</th><th align="right">kg</th></tr>
          ${s.placements.map(o=>l`<tr><td><span class="family-dot" style=${`background:${A(this.families,this.plantMap.get(o.plant_id)?.family)}`}></span>
            ${y(this.plantMap.get(o.plant_id),this.lang)}${o.sowings>1?l` <span class="xs muted">×${o.sowings}</span>`:p}</td>
            <td>${a(o.bed_id)}</td><td align="right">${o.count}</td><td align="right">${o.area_m2.toFixed(1)}</td><td align="right">${o.yield_kg.toFixed(1)}</td></tr>`)}
        </table></div>
        ${s.skipped.length?l`<p class="xs muted">${this.t("autofill.skipped")}: ${s.skipped.map(o=>`${y(this.plantMap.get(o.plant_id),this.lang)} (${this.t(`autofill.reason.${o.reason}`)})`).join(", ")}</p>`:p}
      `:p}
      <div class="row" style="justify-content:flex-end">
        <button class="btn ghost" @click=${i}>${this.t("common.cancel")}</button>
        <button class="btn primary" ?disabled=${!s?.plantings.length} @click=${()=>this.applyAutofill()}>${this.t("autofill.apply")}</button>
      </div>
    </div>`}renderSoilTests(e){let t=[...this.snapshot.beds.find(i=>i.id===e)?.soil_tests??[]].reverse(),s=this.soilForm,n=(i,a,o=.1)=>l`<label class="field">${a}
      <input type="number" step=${o} min="0" .value=${s?.[i]==null?"":String(s[i])}
        @input=${d=>{let h=d.target.value;this.soilForm={...this.soilForm,[i]:h===""?null:Number(h)}}} /></label>`;return l`<details class="tips" ?open=${!!s}><summary><ha-icon icon="mdi:test-tube"></ha-icon> ${this.t("soil_test.title")}
        ${t[0]?l`<span class="xs muted">· ${w(t[0].date,this.lang)}${t[0].ph!=null?` \xB7 pH ${t[0].ph}`:""}</span>`:p}</summary>
      ${t.length?l`<table class="soil"><thead><tr><th>${this.t("journal.day")}</th><th>pH</th><th>OM%</th><th>P</th><th>K</th><th></th></tr></thead><tbody>
        ${t.map(i=>l`<tr><td>${w(i.date,this.lang)}</td><td>${i.ph??"\u2013"}</td><td>${i.organic_matter_pct??"\u2013"}</td><td>${i.p_mg??"\u2013"}</td><td>${i.k_mg??"\u2013"}</td>
          <td>${this.admin?l`<button class="icon-btn" aria-label=${this.t("planner.remove")} @click=${()=>this.deleteSoil(e,i.date)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`:p}</td></tr>`)}
      </tbody></table>`:l`<p class="xs muted">${this.t("soil_test.none")}</p>`}
      ${this.admin?s?l`<div class="form-grid">
          <label class="field">${this.t("journal.day")}<input type="date" .value=${s.date??""} @input=${i=>this.soilForm={...s,date:i.target.value}} /></label>
          ${n("ph","pH")} ${n("organic_matter_pct",this.t("soil_test.om"))} ${n("n_mg","N (mg/100 g)",1)}
          ${n("p_mg","P (mg/100 g)",1)} ${n("k_mg","K (mg/100 g)",1)} ${n("mg_mg","Mg (mg/100 g)",1)}
          <label class="field">${this.t("soil_test.lime")}<select @change=${i=>this.soilForm={...s,lime_status:i.target.value||null}}>
            ${["","low","ok","high"].map(i=>l`<option value=${i} ?selected=${(s.lime_status??"")===i}>${i?this.t(`soil_test.lime.${i}`):"\u2013"}</option>`)}</select></label>
          <label class="field full">${this.t("task.notes")}<input .value=${s.notes??""} @input=${i=>this.soilForm={...s,notes:i.target.value}} /></label>
        </div>
        <div class="row"><button class="btn small primary" ?disabled=${!s.date} @click=${()=>this.saveSoil(e)}>${this.t("common.save")}</button>
          <button class="btn small ghost" @click=${()=>this.soilForm=null}>${this.t("common.cancel")}</button></div>
        <p class="xs muted">${this.t("soil_test.hint")}</p>`:l`<button class="btn small" @click=${()=>this.soilForm={date:new Date().toISOString().slice(0,10)}}><ha-icon icon="mdi:plus"></ha-icon>${this.t("soil_test.add")}</button>`:p}
    </details>`}async saveSoil(e){if(this.soilForm?.date)try{await this.api.saveSoilTest(e,this.soilForm),this.soilForm=null,this.toast(this.t("settings.saved"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async deleteSoil(e,t){try{await this.api.deleteSoilTest(e,t)}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderHarvestQuick(e){let s=(this.snapshot.harvest_log??[]).filter(a=>a.planting_id===e.id).reduce((a,o)=>a+o.kg,0),n=(this.snapshot.journal??[]).filter(a=>a.planting_id===e.id).slice(-3).reverse(),i=this.snapshot.plantings.some(a=>a.id===e.id);return l`<div class="stack" style="gap:6px">
      <h4><ha-icon icon="mdi:basket-outline"></ha-icon> ${this.t("journal.harvest")}${s?l` · ${s.toFixed(2)} kg`:p}</h4>
      ${this.admin&&i?l`<div class="row">
        <input type="number" min="0" step="0.05" style="width:90px" placeholder="kg" aria-label="kg" .value=${this.harvestKg}
          @input=${a=>this.harvestKg=a.target.value} />
        <button class="btn small" ?disabled=${!(Number(this.harvestKg)>0)} @click=${()=>this.logHarvest(e)}>${this.t("journal.log_harvest")}</button>
      </div>`:p}
      ${n.length?l`<ul class="notes">${n.map(a=>l`<li class="xs"><b>${w(a.at.slice(0,10),this.lang)}</b> ${a.text}
        ${a.photos.length?l`<ha-icon icon="mdi:camera-outline"></ha-icon>`:p}</li>`)}</ul>`:p}
    </div>`}async logHarvest(e){let t=Number(this.harvestKg);if(t>0)try{await this.api.logHarvest({planting_id:e.id,kg:t}),this.harvestKg="",this.toast(this.t("journal.harvest_saved"))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderInspector(){let e=this.selection,t=e?this.findItem(e):void 0,s=!this.admin,n;if(!e||!t)n=l`<p class="small muted">${this.t("planner.nothing_selected")}</p><p class="xs muted">${this.t("planner.multi_hint")}</p>`;else if(this.multi.length>1)n=l`<h3>${this.t("planner.selected_n",{n:this.multi.length})}</h3>
        <p class="small muted">${this.t("planner.multi_hint")}</p>
        <div class="row wrap">
          ${["left","hcenter","right","top","vcenter","bottom","hdistribute","vdistribute"].map(i=>l`
            <button class="btn small" ?disabled=${s||i.endsWith("distribute")&&this.multi.length<3} @click=${()=>this.align(i)}>${this.t(`planner.align.${i}`)}</button>`)}
        </div>
        ${!s&&(e.kind==="planting"||e.kind==="feature")?l`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`:p}`;else if(e.kind==="feature"){let i=t;n=l`<h3>${i.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${i.name} ?disabled=${s}
            @change=${a=>this.updateSelected({name:a.target.value})} /></label>
          <label class="field full">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${a=>this.updateSelected({type:a.target.value})}>
              ${ki.map(a=>l`<option value=${a} ?selected=${i.type===a}>${this.t(`feature.${a}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(i.width_cm)} ?disabled=${s}
            @change=${a=>this.updateSelected({width_cm:Number(a.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(i.length_cm)} ?disabled=${s}
            @change=${a=>this.updateSelected({length_cm:Number(a.target.value)})} /></label>
          <label class="field full">${this.t("task.notes")}<textarea rows="2" .value=${i.notes} ?disabled=${s}
            @change=${a=>this.updateSelected({notes:a.target.value})}></textarea></label>
        </div>
        ${s?p:l`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}`}else if(e.kind==="planting"){let i=t,a=this.plantMap.get(i.plant_id),o=this.draft.beds.find(h=>h.id===i.bed_id),d=this.snapshot.analysis?.advice[i.id];n=l`
        <div class="row">
          <span class="family-dot" style=${`background:${A(this.families,a?.family)};width:14px;height:14px`}></span>
          <h3>${y(a,this.lang)}</h3>
        </div>
        <p class="xs muted">${a?.scientific_name} · ${this.families[a?.family??""]?.[this.lang]??a?.family} · ${o?.name}</p>
        ${a?.perennial?l`<div class="finding info"><ha-icon icon="mdi:all-inclusive"></ha-icon><span>${this.t("planner.perennial_since",{season:i.season})}
          ${a.years_to_bearing?l`<br />${this.t("planner.bearing_from",{season:i.season+a.years_to_bearing})}`:p}</span></div>`:p}
        ${a?.pollination&&a.pollination!=="self"?l`<p class="xs"><ha-icon icon="mdi:bee"></ha-icon> ${this.t(`pollination.${a.pollination}`)}</p>`:p}
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
        <p class="small">${a?this.t("planner.count",{n:Hs(i,a)}):""}</p>
        ${d?.reasons.length?l`<div class="stack" style="gap:4px">${d.reasons.filter(h=>h.key!=="reason.window_open").map(h=>l`<p class="small">${this.t(h.key,h.params)}</p>`)}</div>`:p}
        ${this.renderPhenology(i.id)}
        ${this.renderHarvestQuick(i)}
        <h4>${this.t("planner.timeline")}</h4>
        ${this.renderTimeline(this.timelines[i.id])}
        <h4>${this.t("planner.warnings")}</h4>
        ${this.renderFindings(i.bed_id,i.id)}
        ${a?.tips?.[this.lang]?.length||a?.tips?.en?.length?l`<details class="tips" open><summary>${this.t("planner.eco_tips")}</summary>
          <ul>${(a.tips[this.lang]??a.tips.en).map(h=>l`<li>${h}</li>`)}</ul></details>`:p}
        ${s?p:l`
          <div class="row wrap">
            <button class="btn small" @click=${()=>this.dialog="succession"}><ha-icon icon="mdi:calendar-multiple"></ha-icon>${this.t("planner.succession")}</button>
            <button class="btn small ghost" @click=${()=>this.duplicateSelected()}>${this.t("planner.duplicate")}</button>
            <button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>
          </div>`}
      `}else if(e.kind==="bed"){let i=t,a=this.snapshot.analysis?.beds[i.id],o=this.reports[i.id]??a?.compatibility;n=l`
        <h3>${i.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${i.name} ?disabled=${s}
            @change=${d=>this.updateSelected({name:d.target.value})} /></label>
          <label class="field">${this.t("planner.zone")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({zone_id:d.target.value})}>
              ${this.draft.zones.map(d=>l`<option value=${d.id} ?selected=${i.zone_id===d.id}>${d.name}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({kind:d.target.value})}>
              ${["in_ground","raised","container"].map(d=>l`<option value=${d} ?selected=${i.kind===d}>${this.t(`kind.${d}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(i.width_cm)} ?disabled=${s}
            @change=${d=>this.updateSelected({width_cm:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(i.length_cm)} ?disabled=${s}
            @change=${d=>this.updateSelected({length_cm:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.soil")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({soil:d.target.value})}>
              ${["sandy","loam","clay","silt","peat","chalk","potting_mix"].map(d=>l`<option value=${d} ?selected=${i.soil===d}>${this.t(`soil.${d}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.orientation")}<input type="number" min="0" max="359" step="15" .value=${String(i.orientation_deg)} ?disabled=${s}
            @change=${d=>this.updateSelected({orientation_deg:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(i.shade_pct??"")} ?disabled=${s}
            @change=${d=>this.updateSelected({shade_pct:d.target.value===""?null:Number(d.target.value)})} /></label>
        </div>
        ${a?l`
          <div class="row wrap">
            <span class="chip ${a.moisture_status==="optimal"?"ok":a.moisture_status==="dry"?"bad":a.moisture_status==="unknown"?"":"warn"}">
              <ha-icon icon="mdi:water-percent"></ha-icon>${this.t(`moisture.${a.moisture_status}`)}${a.irrigation.moisture!=null?` \xB7 ${Math.round(a.irrigation.moisture)}%`:""}</span>
            <span class="chip">${this.t(`irrigation.${a.irrigation.action}`,{mm:a.irrigation.amount_mm,liters:Math.round(a.irrigation.liters)})}</span>
          </div>`:p}
        <div class="row"><span class="score">${Math.round(o?.score??50)}</span><span class="small muted">${this.t("planner.score")}</span></div>
        ${this.renderFindings(i.id)}
        ${this.renderSoilTests(i.id)}
        ${s?p:l`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}
      `}else{let i=t;n=l`
        <h3>${i.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${i.name} ?disabled=${s}
            @change=${a=>this.updateSelected({name:a.target.value})} /></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${a=>this.updateSelected({type:a.target.value})}>
              ${Ut.map(a=>l`<option value=${a} ?selected=${i.type===a}>${this.t(`settings.zone_type.${a}`)}</option>`)}
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
            @change=${a=>this.updateSelected({thermal_mass:a.target.checked},"microclimate")} />${this.t("settings.thermal_mass")}</label>`:p}
        </div>
        <div class="row wrap">
          <button class="btn small" @click=${()=>this.openZone(i.id)}><ha-icon icon="mdi:map-search-outline"></ha-icon>${this.t("planner.open_zone")}</button>
          ${s?p:l`<button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>`}
        </div>
      `}return l`<aside class="pane" aria-label=${this.t("planner.inspector")}>
      <header><h3>${this.t("planner.inspector")}</h3></header>
      <div class="pane-body stack">${n}</div>
    </aside>`}renderDialog(){if(this.removing){let s=this.removing,n=y(this.plantMap.get(s.plant_id),this.lang);return l`<dialog @close=${()=>this.removing=null}>
        <div class="stack">
          <h2><ha-icon icon="mdi:tree-outline"></ha-icon> ${this.t("planner.remove_perennial",{name:n})}</h2>
          <p class="small">${this.t("planner.remove_perennial_intro",{name:n,season:s.season})}</p>
          <button class="btn primary" @click=${()=>this.removePerennial("season")}>${this.t("planner.remove_from_season",{season:this.season})}</button>
          <p class="xs muted">${this.t("planner.remove_from_season_hint")}</p>
          <button class="btn danger" @click=${()=>this.removePerennial("delete")}>${this.t("planner.remove_everywhere")}</button>
          <p class="xs muted">${this.t("planner.remove_everywhere_hint")}</p>
          <div class="row" style="justify-content:flex-end"><button class="btn ghost" @click=${()=>this.removing=null}>${this.t("common.cancel")}</button></div>
        </div></dialog>`}if(!this.dialog)return p;let e=()=>this.dialog=null,t;if(this.dialog==="shortcuts"){let s=[["\u2190 \u2191 \u2192 \u2193","shortcut.move"],["Alt + \u2190 \u2191 \u2192 \u2193","planner.width"],["Ctrl + Z","shortcut.undo"],["Ctrl + Y","shortcut.redo"],["Delete","shortcut.delete"],["Ctrl + D","shortcut.duplicate"],["[ ]","shortcut.cycle"],["G","shortcut.grid"],["C","shortcut.companions"],["M","shortcut.moisture"],["+ / \u2212 / 0","shortcut.zoom"],["Esc","shortcut.escape"],["?","shortcut.help"]];t=l`<h2>${this.t("planner.shortcuts")}</h2>
        <table class="shortcuts">${s.map(([n,i])=>l`<tr><td><kbd>${n}</kbd></td><td>${this.t(i)}</td></tr>`)}</table>
        <div class="row" style="justify-content:flex-end"><button class="btn" @click=${e}>${this.t("common.close")}</button></div>`}else if(this.dialog==="autofill")t=this.renderAutofill();else if(this.dialog==="succession"){let s=this.selection?this.draft.plantings.find(i=>i.id===this.selection.id):void 0,n=s&&this.plantMap.get(s.plant_id);t=l`<form class="stack" @submit=${this.createSuccession}>
        <h2>${this.t("planner.succession")} – ${y(n,this.lang)}</h2>
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
      </form>`;return l`<dialog @close=${e} style=${this.dialog==="autofill"?"max-width:760px":""}>${t}</dialog>`}};k.styles=[R,T`
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
    `],u([g({attribute:!1})],k.prototype,"snapshot",2),u([g({attribute:!1})],k.prototype,"plants",2),u([g({attribute:!1})],k.prototype,"families",2),u([g({attribute:!1})],k.prototype,"api",2),u([g({attribute:!1})],k.prototype,"t",2),u([g()],k.prototype,"lang",2),u([g({type:Boolean})],k.prototype,"admin",2),u([g({type:Boolean})],k.prototype,"narrow",2),u([f()],k.prototype,"draft",2),u([f()],k.prototype,"selection",2),u([f()],k.prototype,"multi",2),u([f()],k.prototype,"showFeatures",2),u([f()],k.prototype,"showPlantings",2),u([f()],k.prototype,"showZones",2),u([f()],k.prototype,"categoryFilter",2),u([f()],k.prototype,"autofill",2),u([f()],k.prototype,"autofillBusy",2),u([f()],k.prototype,"autofillReplace",2),u([f()],k.prototype,"autofillBeds",2),u([f()],k.prototype,"autofillResources",2),u([f()],k.prototype,"season",2),u([f()],k.prototype,"saveState",2),u([f()],k.prototype,"reports",2),u([f()],k.prototype,"extraTimelines",2),u([f()],k.prototype,"snapOn",2),u([f()],k.prototype,"showCompanions",2),u([f()],k.prototype,"showMoisture",2),u([f()],k.prototype,"showTemperature",2),u([f()],k.prototype,"viewDate",2),u([f()],k.prototype,"layoutMode",2),u([f()],k.prototype,"search",2),u([f()],k.prototype,"familyFilter",2),u([f()],k.prototype,"paletteDrag",2),u([f()],k.prototype,"ghostReport",2),u([f()],k.prototype,"dialog",2),u([f()],k.prototype,"announcement",2),u([f()],k.prototype,"paletteOpen",2),u([f()],k.prototype,"step",2),u([f()],k.prototype,"tool",2),u([f()],k.prototype,"focusZone",2),u([f()],k.prototype,"removing",2),u([f()],k.prototype,"soilForm",2),u([f()],k.prototype,"harvestKg",2),u([st("hl-garden-canvas")],k.prototype,"canvas",2),k=u([P("hl-planner-view")],k);var zi={id:"",names:{en:"",nl:""},scientific_name:"",family:"Asteraceae",variety:null,habit:"bush",perennial:!1,spacing_cm:30,row_spacing_cm:30,sowing_depth_cm:1,germination_days:[7,14],min_soil_temp_c:8,optimal_soil_temp_c:18,max_soil_temp_c:null,days_to_maturity:[60,80],maturity_from:"sow",harvest_duration_days:14,harvestable:!0,continuous_harvest:!1,harvest_interval_days:null,transplant_age_days:[35,49],sowing:{indoor_sow:[],direct_sow:[{start_week:-2,end_week:8,anchor:"last_frost"}],transplant:[]},greenhouse:{suitability:"conditional",min_night_c:5,max_day_c:30,season_extension_weeks:2,notes:{}},frost_tolerance:"half_hardy",min_temp_c:0,max_temp_c:30,companions:[],rotation_years:3,pests:[],diseases:[],water_needs:"medium",nutrient_needs:"medium",feeding_interval_days:null,care:[],pruning_notes:{},thinning:!1,succession_interval_days:null,gdd_base_c:10,gdd_to_maturity:null,tags:[],source:"custom"},B=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.query="";this.family="";this.category="";this.filter="";this.selected=null;this.editing=null;this.error=""}get anchors(){return this.snapshot.analysis?.anchors??{last_frost:`${new Date().getFullYear()}-04-20`,first_frost:`${new Date().getFullYear()}-10-25`}}seasonStart(){let e=this.anchors.last_frost;return this.snapshot.settings.region.hemisphere==="south"?`${e.slice(0,4)}-07-01`:`${e.slice(0,4)}-01-01`}renderCalendar(e){let t=this.seasonStart(),s=d=>Math.max(0,Math.min(100,fe(t,d)/365*100)),n=[],i=(d,h,m)=>{for(let v of d){let[b,_]=At(v,this.anchors);n.push(l`<div class="b" style=${`left:${s(b)}%;width:${Math.max(s(_)-s(b),1)}%;top:${h}px;background:${m}`}></div>`)}};i(e.sowing.indoor_sow,2,"var(--hl-leaf-300)"),i(e.sowing.direct_sow,8,"var(--hl-leaf-500)"),i(e.sowing.transplant,14,"var(--hl-leaf-700)");let a=[...e.sowing.direct_sow,...e.sowing.transplant][0];if(a&&e.harvestable){let[d,h]=At(a,this.anchors),m=e.maturity_from==="transplant"&&!e.sowing.transplant.length?e.germination_days[1]+14:0;n.push(l`<div class="b" style=${`left:${s(I(d,e.days_to_maturity[0]+m))}%;width:${Math.max(s(I(h,e.days_to_maturity[1]+m+e.harvest_duration_days))-s(I(d,e.days_to_maturity[0]+m)),1)}%;top:20px;background:var(--hl-sun-500)`}></div>`)}let o=Array.from({length:12},(d,h)=>w(I(t,Math.round(h*30.5+10)),this.lang,{month:"narrow"}));return l`<div class="cal" role="img" aria-label=${this.t("lib.calendar")}>${o.map(d=>l`<div class="m">${d}</div>`)}${n}</div>`}filtered(){let e=this.query.trim().toLowerCase();return this.plants.filter(t=>!this.family||t.family===this.family).filter(t=>!this.category||(t.category??"vegetable")===this.category).filter(t=>this.filter!=="greenhouse"||t.greenhouse.suitability==="yes").filter(t=>this.filter!=="quick"||t.days_to_maturity[0]<=50).filter(t=>this.filter!=="custom"||t.source!=="builtin").filter(t=>!e||[t.id,t.scientific_name,t.family,this.families[t.family]?.[this.lang]??"",...Object.values(t.names)].some(s=>s.toLowerCase().includes(e))).sort((t,s)=>y(t,this.lang).localeCompare(y(s,this.lang)))}render(){let e=[...new Set(this.plants.map(t=>t.family))].sort();return l`
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
        ${this.admin?l`<button class="btn primary small" @click=${()=>this.editing={plant:structuredClone(zi),mode:"custom"}}>
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("lib.add_custom")}</button>`:p}
      </div>
      <div class="legend-row" aria-hidden="true">
        <span style="--c:var(--hl-leaf-300)">${this.t("lib.indoor_sow")}</span><span style="--c:var(--hl-leaf-500)">${this.t("lib.direct_sow")}</span>
        <span style="--c:var(--hl-leaf-700)">${this.t("lib.transplant")}</span><span style="--c:var(--hl-sun-500)">${this.t("lib.harvest")}</span>
      </div>
      <div class="grid" style="margin-top:12px">
        ${this.filtered().map(t=>l`
          <button class="pcard" @click=${()=>this.selected=t} aria-label=${y(t,this.lang)}>
            <div class="stripe" style=${`background:${A(this.families,t.family)}`}></div>
            <div class="inner">
              <div class="row"><h3>${y(t,this.lang)}</h3><span class="spacer"></span>
                ${t.source!=="builtin"?l`<span class="chip warn">${this.t(`lib.source.${t.source}`)}</span>`:p}</div>
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
      ${this.selected?this.renderDetail(this.selected):p}
      ${this.editing?this.renderEditor():p}
    `}renderDetail(e){let t=this.lang,s=i=>{let a=new Map;for(let o of e.companions)o.relation===i&&a.set(o.plant,o.reason[t]??o.reason.en??"");for(let o of this.plants)for(let d of o.companions)d.plant===e.id&&d.relation===i&&!a.has(o.id)&&a.set(o.id,d.reason[t]??d.reason.en??"");return[...a.entries()]},n=i=>y(this.plants.find(a=>a.id===i),this.lang);return l`
      <aside class="drawer" role="dialog" aria-modal="false" aria-label=${y(e,this.lang)} @keydown=${i=>i.key==="Escape"&&(this.selected=null)}>
        <header style=${`border-top: 6px solid ${A(this.families,e.family)}`}>
          <div class="stack" style="gap:2px"><h2>${y(e,this.lang)}</h2>
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
            ${e.category?l`<span>${this.t("lib.category")}</span><span>${this.t(`category.${e.category}`)}${e.perennial?` \xB7 ${this.t("lib.perennial")}`:""}</span>`:p}
            ${e.height_cm?l`<span>${this.t("lib.height")}</span><span>${e.height_cm} cm · ${this.t("lib.roots")} ${e.root_depth_cm??"?"} cm</span>`:p}
            ${e.kc?l`<span>Kc <hl-info term="kc" .t=${this.t}></hl-info></span><span>${e.kc.map(i=>i.toFixed(2)).join(" \u2192 ")}</span>`:p}
            ${e.npk?l`<span>N · P · K <hl-info term="npk" .t=${this.t}></hl-info></span><span>${e.npk.join(" \xB7 ")} / 3</span>`:p}
            ${e.gdd_to_maturity?l`<span>${this.t("lib.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span>${e.gdd_to_maturity} °C·d (${this.t("lib.base")} ${e.gdd_base_c} °C)</span>`:p}
            ${e.plants_per_person?l`<span>${this.t("lib.per_person")}</span><span>${e.plants_per_person} · ${e.yield_kg_m2??"?"} kg/m²</span>`:p}
          </div>
          ${e.deters?.length||e.trap_for?.length||e.allelopathic||e.shade_tolerant?l`<div class="row wrap">
            ${(e.deters??[]).map(i=>l`<span class="chip ok" title=${this.t("lib.deters")}>🛡 ${Fe(i,this.lang)}</span>`)}
            ${(e.trap_for??[]).map(i=>l`<span class="chip warn" title=${this.t("lib.trap_for")}>🪤 ${Fe(i,this.lang)} <hl-info term="trap_crop" .t=${this.t}></hl-info></span>`)}
            ${e.allelopathic?l`<span class="chip bad">${this.t("lib.allelopathic")} <hl-info term="allelopathy" .t=${this.t}></hl-info></span>`:p}
            ${e.shade_tolerant?l`<span class="chip cold">${this.t("lib.shade_tolerant")}</span>`:p}
          </div>`:p}
          ${e.greenhouse.notes[t]?l`<p class="small">${e.greenhouse.notes[t]}</p>`:p}
          <section class="stack"><h3>${this.t("lib.friends")}</h3>
            ${s("friend").map(([i,a])=>l`<div class="rel"><span class="chip ok">${n(i)}</span><span class="muted">${a}</span></div>`)}</section>
          <section class="stack"><h3>${this.t("lib.enemies")}</h3>
            ${s("enemy").length?s("enemy").map(([i,a])=>l`<div class="rel"><span class="chip bad">${n(i)}</span><span class="muted">${a}</span></div>`):l`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.pests")} & ${this.t("lib.diseases")}</h3>
            <div class="row wrap">${e.pests.map(i=>l`<span class="chip warn">${Fe(i,this.lang)}</span>`)}${e.diseases.map(i=>l`<span class="chip bad">${Fe(i,this.lang)}</span>`)}</div></section>
          ${e.care.length||e.pruning_notes[t]?l`<section class="stack"><h3>${this.t("lib.care")}</h3>
            ${e.care.map(i=>l`<p class="small"><b>${this.t(`type.${i.task}`)}</b>${i.interval_days?` \xB7 \u21BB ${i.interval_days} d`:""} – ${i.notes[t]??i.notes.en??""}</p>`)}
            ${e.pruning_notes[t]?l`<p class="small">${e.pruning_notes[t]}</p>`:p}</section>`:p}
          ${this.admin?l`<div class="row">
            <button class="btn" @click=${()=>this.editing={plant:structuredClone(e),mode:e.source==="custom"?"custom":"override"}}>
              <ha-icon icon="mdi:pencil"></ha-icon>${this.t("lib.customize")}</button>
            ${e.source!=="builtin"?l`<button class="btn danger" @click=${()=>this.removePlant(e)}>${e.source==="override"?this.t("lib.reset"):this.t("common.delete")}</button>`:p}
          </div>`:p}
        </div>
      </aside>`}async removePlant(e){try{await this.api.deletePlant(e.id),this.selected=null,this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0}))}catch(t){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t.message},bubbles:!0,composed:!0}))}}async save(e){e.preventDefault();let{plant:t,mode:s}=this.editing,n=e.target,i=v=>n.elements.namedItem(v).value,a=v=>Number(i(v)),o=v=>n.elements.namedItem(`${v}_on`).checked?[{start_week:a(`${v}_start`),end_week:a(`${v}_end`),anchor:"last_frost"}]:[],d=i("name_en").trim(),h={...t,id:s==="custom"&&!t.id?d.toLowerCase().normalize("NFKD").replace(/[^\w]+/g,"_").replace(/^_|_$/g,"")||"plant":t.id,names:{...t.names,en:d,nl:i("name_nl").trim()||d},scientific_name:i("scientific"),variety:i("variety")||null,family:i("family"),habit:i("habit"),spacing_cm:a("spacing"),row_spacing_cm:a("row_spacing"),sowing_depth_cm:a("depth"),germination_days:[a("germ_min"),a("germ_max")],min_soil_temp_c:a("soil_temp"),days_to_maturity:[a("dtm_min"),a("dtm_max")],maturity_from:i("maturity_from"),frost_tolerance:i("frost"),min_temp_c:a("min_temp"),max_temp_c:a("max_temp"),water_needs:i("water"),nutrient_needs:i("nutrients"),rotation_years:a("rotation"),greenhouse:{...t.greenhouse,suitability:i("gh")},sowing:{indoor_sow:o("indoor"),direct_sow:o("direct"),transplant:o("transplant")},pests:i("pests").split(",").map(v=>v.trim().replace(/\s+/g,"_")).filter(Boolean),diseases:i("diseases").split(",").map(v=>v.trim().replace(/\s+/g,"_")).filter(Boolean)},m=h;if(s==="override"){m={id:h.id};for(let v of Object.keys(h))v!=="source"&&JSON.stringify(h[v])!==JSON.stringify(t[v])&&(m[v]=h[v])}try{let v=await this.api.savePlant(m,s);this.editing=null,this.selected=v.plant,this.error="",this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("lib.saved",{plant:y(v.plant,this.lang)})},bubbles:!0,composed:!0}))}catch(v){this.error=v.message??String(v)}}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal()}renderEditor(){let{plant:e,mode:t}=this.editing,s=(i,a,o,d)=>l`
      <select name=${i}>${o.map(h=>l`<option value=${h} ?selected=${h===a}>${d?this.t(`${d}.${h}`):this.families[h]?.[this.lang]??h}</option>`)}</select>`,n=(i,a,o)=>l`
      <label class="row small"><input type="checkbox" name=${`${i}_on`} ?checked=${!!o} />${a}</label>
      <label class="field">${this.t("lib.from")} (${this.t("lib.weeks")})<input name=${`${i}_start`} type="number" min="-30" max="30" .value=${String(o?.start_week??-4)} /></label>
      <label class="field">${this.t("lib.to")} (${this.t("lib.weeks")})<input name=${`${i}_end`} type="number" min="-30" max="40" .value=${String(o?.end_week??2)} /></label>`;return l`<dialog @close=${()=>this.editing=null} style="border:none;border-radius:16px;padding:0;width:min(640px,calc(100vw - 32px));background:var(--hl-surface);color:var(--hl-text)">
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
        ${this.error?l`<p class="field-error" role="alert">${this.error}</p>`:p}
        <div class="row" style="justify-content:flex-end">
          <button type="button" class="btn ghost" @click=${()=>this.editing=null}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("common.save")}</button>
        </div>
      </form>
    </dialog>`}};B.styles=[R,T`
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
    `],u([g({attribute:!1})],B.prototype,"snapshot",2),u([g({attribute:!1})],B.prototype,"plants",2),u([g({attribute:!1})],B.prototype,"families",2),u([g({attribute:!1})],B.prototype,"api",2),u([g({attribute:!1})],B.prototype,"t",2),u([g()],B.prototype,"lang",2),u([g({type:Boolean})],B.prototype,"admin",2),u([f()],B.prototype,"query",2),u([f()],B.prototype,"family",2),u([f()],B.prototype,"category",2),u([f()],B.prototype,"filter",2),u([f()],B.prototype,"selected",2),u([f()],B.prototype,"editing",2),u([f()],B.prototype,"error",2),B=u([P("hl-library-view")],B);var G=class extends E{constructor(){super(...arguments);this.lang="en";this.plants=new Map;this.families={};this.mode="month";this.cursor="";this.showDone=!1;this.bedFilter="";this.year=null}async loadYear(){try{this.year=(await this.api?.records())?.year??null}catch{this.year=null}}renderYear(){let e=this.year;if(!e)return l`<p class="empty">${this.t("common.loading")}</p>`;let t=Array.from({length:12},(o,d)=>new Date(2026,d,1).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{month:"short"})),s=new Date().getMonth(),n=["harvest","plant","sow","sow_indoor","grow"],i=this.snapshot.beds.find(o=>o.id===this.bedFilter)?.name??"",a=e.rows.filter(o=>!this.bedFilter||o.beds.includes(i)).sort((o,d)=>y(this.plants.get(o.plant_id),this.lang).localeCompare(y(this.plants.get(d.plant_id),this.lang),this.lang));return l`<div class="card year-wrap"><table class="year">
      <thead><tr><th></th>${t.map((o,d)=>l`<th class=${d===s?"now":""}>${o}</th>`)}</tr></thead>
      <tbody>
        ${a.map(o=>{let d=this.plants.get(o.plant_id);return l`<tr><th scope="row"><span class="crop">${d?de(se(d),d.color||A(this.families,d.family),20):p}
            ${y(d,this.lang)}</span><span class="xs muted">${o.beds.join(", ")}</span></th>
            ${t.map((h,m)=>{let v=o.months[String(m+1)]??[],b=n.find(_=>v.includes(_));return l`<td class=${`${b??""} ${m===s?"now":""}`} title=${v.map(_=>this.t(`cal.act.${_}`)).join(", ")}>
                ${b&&b!=="grow"?this.t(`cal.act_short.${b}`):""}</td>`})}</tr>`})}
        <tr class="tasks-row"><th scope="row">${this.t("cal.tasks_per_month")}</th>${e.tasks.map((o,d)=>l`<td class=${d===s?"now":""}>${o||""}
          ${e.minutes[d]?l`<span class="xs muted"> · ${this.t("cal.hours",{n:Math.max(1,Math.round(e.minutes[d]/60))})}</span>`:p}</td>`)}</tr>
      </tbody></table>
      <div class="legend year-legend">${n.map(o=>l`<span><i class=${`sw ${o}`}></i> ${this.t(`cal.act.${o}`)}</span>`)}</div>
    </div>`}willUpdate(){this.cursor||(this.cursor=this.today)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get today(){return this.snapshot.analysis?.today??Se(new Date)}get tasks(){return this.snapshot.tasks.filter(e=>(this.showDone||e.status==="open")&&e.status!=="skipped"&&(!this.bedFilter||e.bed_id===this.bedFilter))}byDay(){let e=new Map;for(let t of Ue(this.tasks)){let s=t.status==="open"&&t.due<this.today?this.today:t.due;e.set(s,[...e.get(s)??[],t])}return e}move(e){let t=J(this.cursor);this.mode==="timeline"?t.setFullYear(t.getFullYear()+e):this.mode==="month"?t.setMonth(t.getMonth()+e,1):t.setDate(t.getDate()+e*(this.mode==="week"?7:30)),this.cursor=Se(t)}weekStart(e){let s=(J(e).getDay()+6)%7;return I(e,-s)}renderEvent(e){let t=e.status==="open"&&e.due<this.today;return l`<button class="ev ${e.status!=="open"?"done":""} ${t?"overdue":""}" style=${`border-left-color:${xe[e.type]??"var(--hl-soil-500)"}`}
      title=${e.title} @click=${()=>this.emit("open-task",e)}>
      <ha-icon icon=${ke[e.type]}></ha-icon><span>${e.title}</span></button>`}renderMonth(){let e=J(this.cursor);e.setDate(1);let t=this.weekStart(Se(e)),s=e.getMonth(),n=Array.from({length:42},(o,d)=>I(t,d)),i=this.byDay(),a=Array.from({length:7},(o,d)=>w(I(t,d),this.lang,{weekday:"short"}));return l`<div class="month" role="grid">
      ${a.map(o=>l`<div class="dow" role="columnheader">${o}</div>`)}
      ${n.map(o=>{let d=i.get(o)??[];return l`<div class="cell ${J(o).getMonth()!==s?"other":""} ${o===this.today?"today":""}" role="gridcell" aria-label=${w(o,this.lang,{day:"numeric",month:"long"})}>
          <span class="num">${J(o).getDate()}</span>
          ${d.slice(0,4).map(h=>this.renderEvent(h))}
          ${d.length>4?l`<button class="more" @click=${()=>{this.cursor=o,this.mode="week"}}>+${d.length-4}</button>`:p}
        </div>`})}
    </div>`}renderWeek(){let e=this.weekStart(this.cursor),t=this.byDay();return l`<div class="week">
      ${Array.from({length:7},(s,n)=>I(e,n)).map(s=>l`
        <div class="col ${s===this.today?"today":""}">
          <b class="small">${w(s,this.lang,{weekday:"long",day:"numeric",month:"short"})}</b>
          ${(t.get(s)??[]).map(n=>this.renderEvent(n))}
        </div>`)}
    </div>`}renderList(){let e={t:this.t,lang:this.lang,today:this.today,onOpen:n=>this.emit("open-task",n),onComplete:n=>this.emit("complete-task",n),onPostpone:(n,i)=>this.emit("postpone-task",{task:n,days:i})},t=this.byDay(),s=[...t.keys()].filter(n=>n>=this.cursor).sort().slice(0,30);return s.length?l`${s.map(n=>l`<div class="group">
      <h3>${n===this.today?this.t("common.today"):w(n,this.lang,{weekday:"long",day:"numeric",month:"long"})}</h3>
      <ul class="tasks">${t.get(n).map(i=>qe(i,e))}</ul></div>`)}`:l`<p class="empty">–</p>`}renderTimeline(){let e=this.snapshot.analysis;if(!e)return l`<p class="empty">–</p>`;let t=Number(this.cursor.slice(0,4))||e.season,s=this.snapshot.settings.region.hemisphere==="south",n=s?`${t}-07-01`:`${t}-01-01`,i=s?`${t+1}-06-30`:`${t}-12-31`,a=fe(n,i)+1,o=$=>$?Math.max(0,Math.min(100,fe(n,$)/a*100)):null,d=($,x,z,j,ee)=>{let Y=o($),q=o(x);return Y===null||q===null||q<=0||Y>=100?p:l`<div class="g-bar ${z}" title=${ee} style=${`left:${Y}%;width:${Math.max(q-Y,.6)}%;${j}`}></div>`},h=Array.from({length:12},($,x)=>{let z=J(n);return z.setMonth(z.getMonth()+x,1),Se(z)}),m=this.snapshot.plantings.filter($=>$.season===t&&e.timelines[$.id]&&(!this.bedFilter||$.bed_id===this.bedFilter)),v=this.snapshot.beds.filter($=>m.some(x=>x.bed_id===$.id)),b=this.snapshot.tasks.filter($=>$.key?.startsWith("m:")&&$.due>=n&&$.due<=i&&(this.showDone||$.status==="open")),_=l`
      ${!e.anchors.frost_free&&o(e.anchors.last_frost)!==null?l`<div class="g-line" style=${`left:${o(e.anchors.last_frost)}%`} title=${this.t("cal.last_frost")}></div>`:p}
      ${!e.anchors.frost_free&&o(e.anchors.first_frost)!==null?l`<div class="g-line" style=${`left:${o(e.anchors.first_frost)}%`} title=${this.t("cal.first_frost")}></div>`:p}
      ${this.today>=n&&this.today<=i?l`<div class="g-line today" style=${`left:${o(this.today)}%`} title=${this.t("common.today")}></div>`:p}`;return l`<div class="gantt"><div class="gantt-inner" role="table" aria-label=${this.t("cal.timeline")}>
      <div class="g-row head" role="row"><div class="g-label">${this.t("common.season",{year:t})}</div>
        <div class="g-track">${h.map($=>l`<span class="g-month" style=${`left:${o($)}%`}>${w($,this.lang,{month:"short"})}</span>`)}</div></div>
      ${b.length?l`<div class="g-row" role="row"><div class="g-label"><ha-icon icon="mdi:calendar-sync-outline"></ha-icon>${this.t("cal.garden_work")}</div>
        <div class="g-track">${_}${b.map($=>l`<button class="g-task" style=${`left:${o($.due)}%;color:${xe[$.type]??"var(--hl-soil-500)"}`}
          title=${`${w($.due,this.lang)} \xB7 ${$.title}`} @click=${()=>this.emit("open-task",$)}><ha-icon icon=${ke[$.type]}></ha-icon></button>`)}</div></div>`:p}
      ${v.map($=>l`
        <div class="g-row bed" role="row"><div class="g-label">${$.name}</div><div class="g-track">${_}</div></div>
        ${m.filter(x=>x.bed_id===$.id).sort((x,z)=>e.timelines[x.id].in_ground<e.timelines[z.id].in_ground?-1:1).map(x=>{let z=e.timelines[x.id],j=this.plants.get(x.plant_id),ee=A(this.families,j?.family),Y=y(j,this.lang),q=e.phenology?.[x.id];return l`<div class="g-row" role="row">
            <div class="g-label"><span class="family-dot" style=${`background:${ee};width:10px;height:10px`}></span>${Y}
              ${q&&q.stage!=="not_planted"&&q.stage!=="finished"?l`<span class="xs muted">· ${this.t(`stage.${q.stage}`)}</span>`:p}</div>
            <div class="g-track">${_}
              ${z.sow_date&&z.sow_date<z.in_ground?d(z.sow_date,z.in_ground,"sow",`background:${ee}`,`${this.t("lib.indoor_sow")}: ${w(z.sow_date,this.lang)}`):p}
              ${d(z.in_ground,z.harvest_start,"",`background:color-mix(in srgb, ${ee} 35%, transparent);border:1px solid ${ee}`,`${w(z.in_ground,this.lang)} \u2013 ${w(z.harvest_start,this.lang)}`)}
              ${d(z.harvest_start,z.harvest_end,"",`background:${ee}`,`${this.t("lib.harvest")}: ${w(z.harvest_start,this.lang)} \u2013 ${w(z.harvest_end,this.lang)}`)}
              ${q?.harvest_estimate&&o(q.harvest_estimate)!==null?l`<span class="g-mark" style=${`left:${o(q.harvest_estimate)}%`}
                title=${this.t("cal.harvest_estimate",{date:w(q.harvest_estimate,this.lang)})}></span>`:p}
            </div></div>`})}`)}
      ${v.length?p:l`<p class="empty">${this.t("cal.no_plantings")}</p>`}
      <div class="g-legend">
        <span><i style="background:var(--hl-leaf-300);height:4px"></i>${this.t("lib.indoor_sow")}</span>
        <span><i style="background:color-mix(in srgb, var(--hl-leaf-500) 35%, transparent);border:1px solid var(--hl-leaf-500)"></i>${this.t("cal.growing")}</span>
        <span><i style="background:var(--hl-leaf-600)"></i>${this.t("lib.harvest")}</span>
        <span><i style="width:10px;height:10px;transform:rotate(45deg);background:var(--hl-text)"></i>${this.t("cal.harvest_estimate_short")}</span>
        <span><i style="border-left:2px dashed var(--hl-frost-500);width:2px;height:12px;border-radius:0"></i>${this.t("cal.frost_dates")}</span>
      </div>
    </div></div>`}render(){let e=this.mode==="timeline"||this.mode==="year"?this.t("common.season",{year:this.mode==="year"?this.year?.season??Number(this.cursor.slice(0,4)):Number(this.cursor.slice(0,4))}):this.mode==="month"?w(this.cursor,this.lang,{month:"long",year:"numeric"}):`${w(this.weekStart(this.cursor),this.lang)} \u2013 ${w(I(this.weekStart(this.cursor),6),this.lang)}`;return l`
      <div class="bar">
        <button class="icon-btn" aria-label=${this.t("cal.prev")} @click=${()=>this.move(-1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
        <button class="btn small" @click=${()=>this.cursor=this.today}>${this.t("common.today")}</button>
        <button class="icon-btn" aria-label=${this.t("cal.next")} @click=${()=>this.move(1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
        <h2 aria-live="polite">${e}</h2>
        <span class="spacer"></span>
        <div class="row" role="group">
          ${["month","week","list","timeline","year"].map(t=>l`<button class="chip" aria-pressed=${String(this.mode===t)}
            @click=${()=>{this.mode=t,t==="year"&&this.loadYear()}}>${this.t(`cal.${t}`)}</button>`)}
        </div>
        <label class="row small"><span class="visually-hidden">${this.t("task.bed")}</span>
          <select style="width:auto" @change=${t=>this.bedFilter=t.target.value}>
            ${[{id:"",name:this.t("cal.all_beds")},...this.snapshot.beds].map(t=>l`<option value=${t.id} ?selected=${t.id===this.bedFilter}>${t.name}</option>`)}
          </select>
        </label>
        <label class="row small"><input type="checkbox" .checked=${this.showDone} @change=${t=>this.showDone=t.target.checked} />${this.t("cal.show_done")}</label>
        <button class="btn primary small" @click=${()=>this.emit("new-task",null)}><ha-icon icon="mdi:plus"></ha-icon>${this.t("cal.add_task")}</button>
      </div>
      ${this.mode==="month"?this.renderMonth():this.mode==="week"?this.renderWeek():this.mode==="timeline"?this.renderTimeline():this.mode==="year"?this.renderYear():this.renderList()}
    `}};G.styles=[R,dt,T`
      .bar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--hl-s2); margin-bottom: var(--hl-s3); }
      .bar h2 { min-width: 200px; text-transform: capitalize; }
      .year-wrap { overflow-x: auto; padding: var(--hl-s3); }
      table.year { border-collapse: separate; border-spacing: 2px; width: 100%; min-width: 720px; font-size: var(--hl-fs-sm); }
      table.year th { text-align: left; font-weight: 600; padding: 4px 6px; white-space: nowrap; }
      table.year thead th { text-align: center; color: var(--hl-text-muted); text-transform: capitalize; }
      table.year th[scope="row"] { display: flex; flex-direction: column; gap: 0; }
      table.year .crop { display: inline-flex; gap: 6px; align-items: center; }
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
    `],u([g({attribute:!1})],G.prototype,"snapshot",2),u([g({attribute:!1})],G.prototype,"t",2),u([g()],G.prototype,"lang",2),u([g({attribute:!1})],G.prototype,"plants",2),u([g({attribute:!1})],G.prototype,"families",2),u([f()],G.prototype,"mode",2),u([f()],G.prototype,"cursor",2),u([f()],G.prototype,"showDone",2),u([f()],G.prototype,"bedFilter",2),u([g({attribute:!1})],G.prototype,"api",2),u([f()],G.prototype,"year",2),G=u([P("hl-calendar-view")],G);var ji=["nl_be","uk_south","uk_north","de_central","fr_north","scandinavia_south","mediterranean","au_melbourne","nz_christchurch","za_highveld"],Pi={nl_be:"Nederland / Vlaanderen",uk_south:"UK (south)",uk_north:"UK (north)",de_central:"Deutschland (Mitte)",fr_north:"France (nord)",scandinavia_south:"Scandinavia (south)",mediterranean:"Mediterranean",au_melbourne:"Australia \u2013 Melbourne",nz_christchurch:"New Zealand \u2013 Christchurch",za_highveld:"South Africa \u2013 Highveld"},Ri=Array.from({length:13},(c,r)=>[`${r+1}a`,`${r+1}b`]).flat(),Ci={soil_moisture:{domains:["sensor"],deviceClass:"moisture"},soil_temperature:{domains:["sensor"],deviceClass:"temperature"},air_temperature:{domains:["sensor"],deviceClass:"temperature"},air_humidity:{domains:["sensor"],deviceClass:"humidity"},light:{domains:["sensor"],deviceClass:"illuminance"},rain:{domains:["sensor","binary_sensor"]},par:{domains:["sensor"]},ec:{domains:["sensor"],deviceClass:"conductivity"},npk_n:{domains:["sensor"]},npk_p:{domains:["sensor"]},npk_k:{domains:["sensor"]},leaf_wetness:{domains:["sensor","binary_sensor"]}},Ai=["fresh","storage","herbs","pollinators","winter","perennials","easy"],Q=class extends E{constructor(){super(...arguments);this.lang="en";this.admin=!0;this.busy=!1}entityOptions(e){let t=Object.values(this.hass?.states??{}),s=e==="weather"?{domains:["weather"]}:e==="irrigation"?{domains:["switch","valve"]}:e==="tts"?{domains:["tts"]}:e==="media_player"?{domains:["media_player"]}:e==="vent"?{domains:["cover","switch","fan"]}:e==="shade"?{domains:["cover","switch"]}:e==="pump"?{domains:["switch"]}:e==="meter"||e==="butt"?{domains:["sensor","input_number"]}:Ci[e];return t.filter(n=>s.domains.includes(n.entity_id.split(".")[0])).filter(n=>!("deviceClass"in s)||!s.deviceClass||n.attributes.device_class===s.deviceClass).map(n=>n.entity_id).sort()}entityInput(e,t,s,n,i){let a=`list-${t}`,o=s?this.hass?.states[s]:void 0;return l`<label class="field">${i}
      <input list=${a} .value=${s??""} placeholder=${`${{weather:"weather",irrigation:"switch",tts:"tts",media_player:"media_player",vent:"cover"}[t]??"sensor"}.\u2026`} ?disabled=${!this.admin} id=${e}
        aria-invalid=${s&&!o?"true":"false"}
        @change=${d=>n(d.target.value.trim()||null)} />
      ${s?l`<span class="state">${o?`${o.state} ${o.attributes.unit_of_measurement??""}`:"\u26A0 not found"}</span>`:p}
    </label>`}datalists(){return l`${["soil_moisture","soil_temperature","air_temperature","air_humidity","light","rain","par","ec","npk_n","npk_p","npk_k","leaf_wetness","weather","irrigation","tts","media_player","vent","shade","pump","meter","butt"].map(t=>l`<datalist id=${`list-${t}`}>${this.entityOptions(t).map(s=>l`<option value=${s}></option>`)}</datalist>`)}`}async saveSettings(e){this.busy=!0;try{await this.api.saveSettings(e),this.toast(this.t("settings.saved"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}finally{this.busy=!1}}async savePlan(e){let t=structuredClone({zones:this.snapshot.zones,beds:this.snapshot.beds,plantings:this.snapshot.plantings,features:this.snapshot.features??[]});e(t);try{await this.api.savePlan(t,this.snapshot.revision),this.toast(this.t("settings.saved"))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}renderRegion(){let e=this.snapshot.settings.region,t=this.snapshot.analysis?.anchors,s=n=>this.saveSettings({region:n});return l`<section class="card stack" aria-labelledby="s-region">
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
            ${ji.map(n=>l`<option value=${n} ?selected=${e.preset===n}>${Pi[n]}</option>`)}</select></label>`:p}
        ${e.mode==="usda"?l`<label class="field full">${this.t("settings.zone")}
          <select ?disabled=${!this.admin} @change=${n=>s({hardiness_zone:n.target.value})}>
            ${Ri.map(n=>l`<option value=${n} ?selected=${e.hardiness_zone===n}>${n}</option>`)}</select></label>`:p}
        ${e.mode==="custom"?l`
          <label class="field">${this.t("settings.last_frost")}<input pattern="\\d{2}-\\d{2}" .value=${e.last_frost} ?disabled=${!this.admin}
            @change=${n=>n.target.checkValidity()&&s({last_frost:n.target.value})} /></label>
          <label class="field">${this.t("settings.first_frost")}<input pattern="\\d{2}-\\d{2}" .value=${e.first_frost} ?disabled=${!this.admin}
            @change=${n=>n.target.checkValidity()&&s({first_frost:n.target.value})} /></label>`:p}
      </div>
      ${t?l`<p class="small muted">${this.t("settings.frost_dates_now",{last:w(t.last_frost,this.lang,{day:"numeric",month:"long"}),first:w(t.first_frost,this.lang,{day:"numeric",month:"long",year:"numeric"})})}</p>`:p}
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
      ${this.snapshot.weather.error?l`<p class="small" style="color:var(--hl-warning)">⚠ ${this.snapshot.weather.error}</p>`:p}
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
              @change=${s=>e(t.id,n=>n.microclimate.thermal_mass=s.target.checked)} />${this.t("settings.thermal_mass")}</label>`:p}
          <label class="field check"><input type="checkbox" .checked=${!!t.microclimate.wall_heat} ?disabled=${!this.admin}
            @change=${s=>e(t.id,n=>n.microclimate.wall_heat=s.target.checked)} />${this.t("settings.wall_heat")}</label>
          <label class="field check"><input type="checkbox" .checked=${t.microclimate.heated} ?disabled=${!this.admin}
            @change=${s=>e(t.id,n=>n.microclimate.heated=s.target.checked)} />${this.t("settings.heated")}</label>
          ${t.microclimate.heated?l`<label class="field">${this.t("settings.min_heating")}<input type="number" step="0.5" .value=${String(t.microclimate.min_heating_temp_c??5)}
            @change=${s=>e(t.id,n=>n.microclimate.min_heating_temp_c=Number(s.target.value))} /></label>`:p}
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
    </section>`}renderIrrigation(){let e=this.snapshot.settings.irrigation??{mode:"advise",pump_entity:null,start_time:"06:00",max_runtime_min:30,frost_lockout_c:2,rain_skip_mm:3,pump_lead_s:3},t=i=>this.saveSettings({irrigation:i}),s=(i,a,o=1,d=0,h=999)=>l`<label class="field">${a}
      <input type="number" step=${o} min=${d} max=${h} .value=${String(e[i])}
        @change=${m=>t({[i]:Number(m.target.value)})} /></label>`,n=this.snapshot.beds.filter(i=>i.irrigation_entity).length;return l`<section class="card stack" aria-labelledby="s-irrigation">
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
        ${Ai.map(i=>l`<button class="chip ${t.goals.includes(i)?"active":""}" aria-pressed=${String(t.goals.includes(i))} @click=${()=>n(i)}>${this.t(`autofill.goal.${i}`)}</button>`)}
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
    </section>`}renderWater(){let e=this.snapshot.settings.water??{meter_entity:null,butt_level_entity:null,butt_capacity_l:0},t=s=>this.saveSettings({water:s});return l`<section class="card stack" aria-labelledby="s-water">
      <h2 id="s-water">${this.t("settings.water")}</h2>
      <div class="form-grid">
        ${this.entityInput("meter","meter",e.meter_entity,s=>t({meter_entity:s}),this.t("settings.water_meter"))}
        ${this.entityInput("butt","butt",e.butt_level_entity,s=>t({butt_level_entity:s}),this.t("settings.butt_level"))}
        <label class="field">${this.t("settings.butt_capacity")}<input type="number" min="0" step="50" .value=${String(e.butt_capacity_l??0)}
          @change=${s=>t({butt_capacity_l:Number(s.target.value)||0})} /></label>
      </div>
      <p class="xs muted">${this.t("settings.water_hint")}</p>
    </section>`}renderHousehold(){let e=this.snapshot.settings,t=e.assignment??{},s=e.person_notify??{},n=Ge(),i=Object.keys(this.hass?.services?.notify??{}).map(d=>`notify.${d}`),a=["water","harvest","sow_indoor","sow_direct","transplant","weed","pest_check","feed","ventilate","prune","clean_greenhouse","tool_care"],o=d=>l`<select @change=${h=>this.saveSettings({assignment:{[d]:h.target.value}})}>
      <option value="" ?selected=${!t[d]}>${this.t(d==="*"?"settings.nobody":"settings.default_person")}</option>
      ${n.map(h=>l`<option value=${h.id} ?selected=${t[d]===h.id}>${h.name}</option>`)}</select>`;return l`<section class="card stack" aria-labelledby="s-household">
      <h2 id="s-household">${this.t("settings.household")}</h2>
      ${n.length===0?l`<p class="small muted">${this.t("settings.no_persons")}</p>`:l`
        <label class="field">${this.t("settings.assign_default")}${o("*")}</label>
        <details><summary class="small">${this.t("settings.assign_per_type")}</summary>
          <div class="form-grid" style="margin-top:8px">${a.map(d=>l`<label class="field">${this.t(`type.${d}`)}${o(d)}</label>`)}</div>
        </details>
        <h3>${this.t("settings.person_notify")}</h3>
        <datalist id="notify-person">${i.map(d=>l`<option value=${d}></option>`)}</datalist>
        <div class="form-grid">${n.map(d=>l`<label class="field">${d.name}
          <input list="notify-person" placeholder="notify.mobile_app_…" .value=${s[d.id]??""}
            @change=${h=>this.saveSettings({person_notify:{[d.id]:h.target.value.trim()}})} /></label>`)}</div>
        <p class="xs muted">${this.t("settings.person_notify_hint")}</p>`}
      <h3>${this.t("settings.voice")}</h3>
      <p class="xs muted">${this.t("settings.voice_hint")}</p>
      <div class="row wrap">
        <button class="btn small" @click=${()=>this.installVoice()}><ha-icon icon="mdi:microphone-message"></ha-icon>${this.t("settings.voice_install")}</button>
      </div>
    </section>`}async installVoice(){try{await this.hass.callService("garden_manager","install_voice_sentences",{overwrite:!0}),this.toast(this.t("settings.voice_installed"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}}renderGeneral(){let e=this.snapshot.settings;return l`<section class="card stack" aria-labelledby="s-general">
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
    </section>`}async export(e){let t=await this.api.exportPlan(e,!0);at(t.filename,t.content,e==="json"?"application/json":"application/yaml")}render(){return l`
      ${this.admin?p:l`<p class="small" style="color:var(--hl-warning);margin-bottom:12px">${this.t("common.admin_only")}</p>`}
      <fieldset ?disabled=${!this.admin||this.busy} style="border:0;padding:0;margin:0">
        <div class="sections">
          ${this.renderRegion()} ${this.renderWeather()} ${this.renderZones()} ${this.renderBeds()} ${this.renderIrrigation()}
          ${this.renderResources()} ${this.renderNotifications()} ${this.renderWater()} ${this.renderHousehold()} ${this.renderGeneral()}
        </div>
      </fieldset>
      ${this.datalists()}
    `}};Q.styles=[R,T`
      .sections { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: var(--hl-s4); align-items: start; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .item { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); display: flex; flex-direction: column; gap: var(--hl-s2); background: var(--hl-surface-2); }
      .item h4 { display: flex; align-items: center; gap: var(--hl-s2); }
      .check { flex-direction: row !important; align-items: center; gap: var(--hl-s2) !important; color: var(--hl-text) !important; }
      .state { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
    `],u([g({attribute:!1})],Q.prototype,"snapshot",2),u([g({attribute:!1})],Q.prototype,"hass",2),u([g({attribute:!1})],Q.prototype,"api",2),u([g({attribute:!1})],Q.prototype,"t",2),u([g()],Q.prototype,"lang",2),u([g({type:Boolean})],Q.prototype,"admin",2),u([f()],Q.prototype,"busy",2),Q=u([P("hl-settings-view")],Q);var Ye=c=>c.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");function re(c){let r=[],e=/(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g,t=0,s;for(;s=e.exec(c);)s.index>t&&r.push(c.slice(t,s.index)),s[2]!==void 0?r.push(l`<strong>${s[2]}</strong>`):s[3]!==void 0?r.push(l`<em>${s[3]}</em>`):r.push(l`<code>${s[4]}</code>`),t=s.index+s[0].length;return t<c.length&&r.push(c.slice(t)),r}function Ds(c){return c.split(`
`).filter(r=>/^#{2,3} /.test(r)).map(r=>{let e=r.startsWith("### ")?3:2,t=r.replace(/^#+ /,"").trim();return{level:e,text:t,id:Ye(t)}})}var Ns=c=>c.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(r=>r.trim());function Fs(c){let r=c.replace(/\r/g,"").split(`
`),e=[],t=0;for(;t<r.length;){let s=r[t];if(!s.trim()){t++;continue}let n=/^(#{1,4}) (.*)$/.exec(s);if(n){let a=n[2].trim(),o=Math.min(Math.max(n[1].length,2),4);e.push(o===2?l`<h2 id=${Ye(a)}>${re(a)}</h2>`:o===3?l`<h3 id=${Ye(a)}>${re(a)}</h3>`:l`<h4>${re(a)}</h4>`),t++;continue}if(s.trim().startsWith("|")){let a=[];for(;t<r.length&&r[t].trim().startsWith("|");)a.push(r[t++]);let[o,,...d]=a,m=a[1]!==void 0&&/^\s*\|?\s*:?-{2,}/.test(a[1])?d:a.slice(1);e.push(l`<div class="table-wrap"><table>
        <thead><tr>${Ns(o).map(v=>l`<th>${re(v)}</th>`)}</tr></thead>
        <tbody>${m.map(v=>l`<tr>${Ns(v).map(b=>l`<td>${re(b)}</td>`)}</tr>`)}</tbody>
      </table></div>`);continue}if(/^\s*([-*]|\d+\.) /.test(s)){let a=/^\s*\d+\. /.test(s),o=[];for(;t<r.length&&/^\s*([-*]|\d+\.) /.test(r[t]);)o.push(r[t].replace(/^\s*([-*]|\d+\.) /,"")),t++;let d=o.map(h=>l`<li>${re(h)}</li>`);e.push(a?l`<ol>${d}</ol>`:l`<ul>${d}</ul>`);continue}let i=[];for(;t<r.length&&r[t].trim()&&!/^(#{1,4} |\s*\||\s*([-*]|\d+\.) )/.test(r[t]);)i.push(r[t++].trim());e.push(l`<p>${re(i.join(" "))}</p>`)}return e.length?l`${e}`:l`${p}`}var Li={planning:"mdi:clipboard-text-outline",soil:"mdi:shovel",sowing:"mdi:seed-outline",watering:"mdi:watering-can-outline",fertilizing:"mdi:bottle-tonic-plus-outline",rotation:"mdi:rotate-3d-variant",companions:"mdi:handshake-outline",greenhouse:"mdi:greenhouse",pests:"mdi:bug-outline",diseases:"mdi:mushroom-outline",seasons:"mdi:calendar-sync-outline",harvest:"mdi:basket-outline",seeds:"mdi:seed",nodig:"mdi:layers-outline",herbs:"mdi:leaf",perennials:"mdi:flower-outline"},U=class extends E{constructor(){super(...arguments);this.lang="en";this.chapterId="";this.narrow=!1;this.chapters=[];this.glossary={};this.body="";this.loadedId="";this.query="";this.results=[];this.showGlossary=!1}willUpdate(e){(e.has("api")||e.has("lang"))&&this.api&&this.loadIndex(),(e.has("chapterId")||e.has("lang"))&&this.api&&this.chapterId&&this.chapterId!==this.loadedId&&this.loadChapter(this.chapterId)}async loadIndex(){let e=await this.api.handbookIndex(this.lang);this.chapters=e.chapters,this.glossary=e.glossary}async loadChapter(e){try{let t=await this.api.handbookChapter(e,this.lang);this.body=t.body,this.loadedId=e,this.updateComplete.then(()=>this.renderRoot.querySelector("article")?.scrollIntoView({block:"start"}))}catch{this.body="",this.loadedId=""}}open(e){this.showGlossary=!1,this.query="",this.results=[],this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e},bubbles:!0,composed:!0}))}onSearch(e){if(this.query=e,window.clearTimeout(this.searchTimer),!e.trim()){this.results=[];return}this.searchTimer=window.setTimeout(async()=>{let t=(await this.api.handbookSearch(e,this.lang)).results;e===this.query&&(this.results=t)},200)}renderToc(){return l`<nav class="toc card" aria-label=${this.t("handbook.contents")}>
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
          ${a.chapter?l` <a href="#" @click=${o=>{o.preventDefault(),this.open(a.chapter)}}>→ ${this.chapters.find(o=>o.id===a.chapter)?.title??a.chapter}</a>`:p}</dd>`)}</dl>
      </article>`}if(!this.chapterId)return l`<article style="max-width:none">
        <h1>${this.t("handbook.title")}</h1>
        <p class="muted">${this.t("handbook.intro")}</p>
        <div class="grid">${this.chapters.map(i=>l`<button class="card tile" @click=${()=>this.open(i.id)}>
          <h3><ha-icon icon=${Li[i.id]??"mdi:book-outline"}></ha-icon>${i.title}</h3><p class="small muted">${re(i.summary)}</p></button>`)}</div>
      </article>`;let e=this.chapters.find(i=>i.id===this.chapterId),t=this.chapters.findIndex(i=>i.id===this.chapterId),s=t>0?this.chapters[t-1]:void 0,n=t>=0&&t<this.chapters.length-1?this.chapters[t+1]:void 0;return l`<article class="card">
      <h1>${e?.title??""}</h1>
      <div class="sections">${Ds(this.body).filter(i=>i.level===2).map(i=>l`<a class="chip" href=${`#${i.id}`}
        @click=${a=>{a.preventDefault(),this.renderRoot.querySelector(`#${CSS.escape(Ye(i.text))}`)?.scrollIntoView({behavior:"smooth"})}}>${i.text}</a>`)}</div>
      ${this.loadedId===this.chapterId?Fs(this.body):l`<p class="muted">${this.t("common.loading")}</p>`}
      <div class="row" style="margin-top:var(--hl-s5)">
        ${s?l`<button class="btn small ghost" @click=${()=>this.open(s.id)}>← ${s.title}</button>`:p}
        <span class="spacer"></span>
        ${n?l`<button class="btn small" @click=${()=>this.open(n.id)}>${n.title} →</button>`:p}
      </div>
    </article>`}render(){let e=this.narrow&&(this.chapterId||this.showGlossary)?l`<details class="toc-wrap card"><summary><ha-icon icon="mdi:format-list-bulleted"></ha-icon>${this.t("handbook.contents")}</summary>${this.renderToc()}</details>`:this.renderToc();return l`<div class="layout ${this.narrow?"narrow":""}">${e}${this.renderBody()}</div>`}};U.styles=[R,T`
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
    `],u([g({attribute:!1})],U.prototype,"api",2),u([g({attribute:!1})],U.prototype,"t",2),u([g()],U.prototype,"lang",2),u([g()],U.prototype,"chapterId",2),u([g({type:Boolean})],U.prototype,"narrow",2),u([f()],U.prototype,"chapters",2),u([f()],U.prototype,"glossary",2),u([f()],U.prototype,"body",2),u([f()],U.prototype,"loadedId",2),u([f()],U.prototype,"query",2),u([f()],U.prototype,"results",2),u([f()],U.prototype,"showGlossary",2),U=u([P("hl-handbook-view")],U);var Hi=[{id:"garden",icon:"mdi:floor-plan"},{id:"zone",icon:"mdi:greenhouse"},{id:"beds",icon:"mdi:sprout-outline"},{id:"tasks",icon:"mdi:format-list-checks"},{id:"season",icon:"mdi:chart-gantt"},{id:"year",icon:"mdi:calendar-month"},{id:"blank",icon:"mdi:draw"},{id:"plants",icon:"mdi:card-text-outline"}],Ii=["remarkable","a4","a3","a5","letter"],Us="hortulus.print",Z=class extends E{constructor(){super(...arguments);this.lang="en";this.narrow=!1;this.admin=!0;this.opts={document:"garden",page:"remarkable",landscape:!1,color_mode:"eink",days:28,notes:!0,grid:!0,labels:!0};this.pages=[];this.busy=!1;this.error=""}connectedCallback(){super.connectedCallback();try{let e=JSON.parse(localStorage.getItem(Us)??"null");e&&(this.opts={...this.opts,...e})}catch{}}willUpdate(e){e.has("api")&&this.api&&!this.pages.length&&this.schedule(0)}set(e,t){this.opts={...this.opts,[e]:t},e==="page"&&t==="remarkable"&&this.opts.color_mode==="color"&&(this.opts={...this.opts,color_mode:"eink"});try{localStorage.setItem(Us,JSON.stringify({...this.opts,bed_ids:null,zone_id:null,title:null}))}catch{}this.schedule()}schedule(e=350){window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>this.preview(),e)}async preview(){this.busy=!0,this.error="";try{this.pages=(await this.api.printPreview(this.payload())).pages}catch(e){this.error=e.message??String(e)}finally{this.busy=!1}}payload(){let e={...this.opts};return e.document!=="zone"&&delete e.zone_id,e.document!=="beds"&&delete e.bed_ids,e.title||delete e.title,e}async download(){this.busy=!0;try{let{blob:e,filename:t}=await this.api.printPdf(this.payload()),s=URL.createObjectURL(e),n=document.createElement("a");n.href=s,n.download=t,n.click(),setTimeout(()=>URL.revokeObjectURL(s),2e3)}catch(e){this.toast(this.t("common.error",{message:e.message}))}finally{this.busy=!1}}async saveToConfig(){try{await this.api.exportPdfToConfig(this.payload()),this.toast(this.t("print.saved_to_config"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}renderForm(){let e=this.opts,t=this.snapshot.analysis?.season??new Date().getFullYear(),s=this.snapshot.zones;return l`<section class="card stack" aria-label=${this.t("print.options")}>
      <h2>${this.t("print.document")}</h2>
      <div class="docs" role="group">
        ${Hi.map(n=>l`<button class="doc" aria-pressed=${String(e.document===n.id)} @click=${()=>this.set("document",n.id)}>
          <ha-icon icon=${n.icon}></ha-icon><b>${this.t(`print.doc.${n.id}`)}</b><small>${this.t(`print.doc.${n.id}.hint`)}</small></button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("print.page")}
          <select @change=${n=>this.set("page",n.target.value)}>
            ${Ii.map(n=>l`<option value=${n} ?selected=${e.page===n}>${this.t(`print.page.${n}`)}</option>`)}
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
          </select></label>`:p}
        ${e.document==="beds"?l`<fieldset class="full" style="border:0;padding:0;margin:0">
          <legend class="small muted">${this.t("print.beds")}</legend>
          <div class="row wrap">${this.snapshot.beds.map(n=>{let i=!e.bed_ids||e.bed_ids.includes(n.id);return l`<button class="chip" aria-pressed=${String(i)} @click=${()=>{let a=this.snapshot.beds.map(h=>h.id),o=e.bed_ids??a,d=i?o.filter(h=>h!==n.id):[...o,n.id];this.set("bed_ids",d.length===a.length?null:d)}}>${n.name}</button>`})}</div></fieldset>`:p}
        ${e.document==="tasks"?l`<label class="field">${this.t("print.days")}<input type="number" min="1" max="120" .value=${String(e.days)}
          @change=${n=>this.set("days",Number(n.target.value))} /></label>`:p}
        <label class="field full">${this.t("print.title")}<input .value=${e.title??""} placeholder=${this.t(`print.doc.${e.document}`)}
          @change=${n=>this.set("title",n.target.value||null)} /></label>
        <label class="field check"><input type="checkbox" .checked=${e.notes} @change=${n=>this.set("notes",n.target.checked)} />${this.t("print.notes")}</label>
        <label class="field check"><input type="checkbox" .checked=${e.grid} @change=${n=>this.set("grid",n.target.checked)} />${this.t("print.grid")}</label>
        <label class="field check full"><input type="checkbox" .checked=${e.labels} @change=${n=>this.set("labels",n.target.checked)} />${this.t("print.labels")}</label>
      </div>
      ${e.page==="remarkable"?l`<div class="rm"><ha-icon icon="mdi:tablet"></ha-icon><span>${this.t("print.remarkable_hint")}</span></div>`:p}
      <div class="row wrap">
        <button class="btn primary" ?disabled=${this.busy} @click=${()=>this.download()}><ha-icon icon="mdi:file-pdf-box"></ha-icon>${this.t("print.download")}</button>
        <button class="btn" ?disabled=${this.busy} @click=${()=>this.preview()}><ha-icon icon="mdi:refresh"></ha-icon>${this.t("print.refresh")}</button>
        ${this.admin?l`<button class="btn ghost" @click=${()=>this.saveToConfig()}><ha-icon icon="mdi:folder-download-outline"></ha-icon>${this.t("print.save_config")}</button>`:p}
      </div>
    </section>`}render(){return l`<div class="layout ${this.narrow?"narrow":""}">
      ${this.renderForm()}
      <section class="preview" aria-label=${this.t("print.preview")} aria-busy=${String(this.busy)}>
        ${this.error?l`<p class="small" style="color:var(--hl-danger)">${this.error}</p>`:p}
        ${this.pages.length?this.pages.map((e,t)=>l`<figure class="sheet" style="margin:0">${Rs(e)}
            <figcaption class="num">${this.t("print.page_n",{n:t+1,total:this.pages.length})}</figcaption></figure>`):l`<p class="muted">${this.busy?this.t("common.loading"):this.t("print.empty")}</p>`}
      </section>
    </div>`}};Z.styles=[R,T`
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
    `],u([g({attribute:!1})],Z.prototype,"snapshot",2),u([g({attribute:!1})],Z.prototype,"api",2),u([g({attribute:!1})],Z.prototype,"t",2),u([g()],Z.prototype,"lang",2),u([g({type:Boolean})],Z.prototype,"narrow",2),u([g({type:Boolean})],Z.prototype,"admin",2),u([f()],Z.prototype,"opts",2),u([f()],Z.prototype,"pages",2),u([f()],Z.prototype,"busy",2),u([f()],Z.prototype,"error",2),Z=u([P("hl-print-view")],Z);var Oi=new Set(["growth","yellow_leaves","wilting","no_fruit","bolting","pests","disease","too_hot","too_cold","soil","slugs","frost"]),Bi={warning:"mdi:alert-outline",tip:"mdi:lightbulb-on-outline",info:"mdi:information-outline"},Ni={pollination:"mdi:bee-flower",neighbours:"mdi:handshake-outline",placement:"mdi:white-balance-sunny",year_round:"mdi:calendar-sync-outline",soil:"mdi:shovel",eco:"mdi:leaf-circle-outline",growth:"mdi:sprout",greenhouse:"mdi:greenhouse"},C=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.mode="question";this.options=null;this.subject="plant";this.target="";this.problem="what_to_do";this.answer=null;this.busy=!1;this.advice=null;this.supplies=null;this.dismissed=new Set}connectedCallback(){super.connectedCallback(),this.load()}async load(){try{let[e,t,s]=await Promise.all([this.api.qaOptions(),this.api.advice(),this.api.supplies()]);this.options=e,this.advice=t,this.supplies=s;let n=e.targets.plant.find(i=>i.planted);this.target=n?.id??e.targets.plant[0]?.id??""}catch(e){this.toast(e.message??String(e))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}openChapter(e){this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e},bubbles:!0,composed:!0}))}problems(){let e=this.options?.subjects[this.subject]??[],t=e.filter(s=>this.mode==="problem"===Oi.has(s));return t.length?t:e}setSubject(e){this.subject=e;let t=this.options?.targets[e]??[];this.target=t.find(s=>s.planted)?.id??t[0]?.id??"",this.problems().includes(this.problem)||(this.problem=this.problems()[0]??""),this.answer=null}setMode(e){this.mode=e,this.problems().includes(this.problem)||(this.problem=this.problems()[0]??""),this.answer=null}async ask(){this.busy=!0;try{this.answer=await this.api.qaAsk(this.subject,this.problem,this.target||null)}catch(e){this.toast(e.message??String(e))}finally{this.busy=!1}}async apply(e){let t=e.action;if(t)if(t.type==="add_planting"&&t.plant_id&&t.bed_id){let s=this.plants.find(b=>b.id===t.plant_id),n=this.snapshot,i=n.beds.find(b=>b.id===t.bed_id);if(!s||!i)return;let a=n.analysis?.season??new Date().getFullYear(),o=Ze(s,"block",i),d=n.plantings.filter(b=>b.bed_id===i.id&&ve(b,!!this.plants.find(_=>_.id===b.plant_id)?.perennial,a)).map(b=>({x:b.x_cm,y:b.y_cm,w:b.width_cm,h:b.length_cm})),h=ye(i,o,d,n.settings.snap_cm);if(!h){this.toast(this.t("advice.no_space",{bed:i.name}));return}let m={id:te("pl"),plant_id:s.id,bed_id:i.id,season:a,layout:"block",x_cm:h.x,y_cm:h.y,width_cm:o.w,length_cm:o.h,count:null,method:Gt(s),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:"advice"},v={zones:n.zones,beds:n.beds,plantings:[...n.plantings,m],features:n.features??[]};try{await this.api.savePlan(v,n.revision),this.dismissed=new Set([...this.dismissed,e.id]),this.toast(this.t("planner.placed",{plant:y(s,this.lang),bed:i.name}))}catch(b){this.toast(b.message??String(b))}}else this.dispatchEvent(new CustomEvent("navigate",{detail:"planner",bubbles:!0,composed:!0}))}plantChip(e){let t=this.plants.find(s=>s.id===e);return t?l`<span class="plant-chip">${de(se(t),t.color||A(this.families,t.family),20)}${y(t,this.lang)}</span>`:l``}render(){return this.options?l`<div class="grid">
      <div class="stack">${this.renderAsk()}${this.answer?this.renderAnswer(this.answer):p}${this.renderSuggestions()}</div>
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
          ${s.length?l`<optgroup label=${this.t("advice.in_garden")}>${s.map(i=>l`<option value=${i.id} ?selected=${i.id===this.target}>${i.name}</option>`)}</optgroup>`:p}
          ${s.length?l`<optgroup label=${this.t("advice.all_plants")}>${n.map(i=>l`<option value=${i.id} ?selected=${i.id===this.target}>${i.name==="*"?this.t("advice.whole_garden"):this.subject==="tools"?this.t(`type.${i.id}`):i.name}</option>`)}</optgroup>`:n.map(i=>l`<option value=${i.id} ?selected=${i.id===this.target}>${i.name==="*"?this.t("advice.whole_garden"):this.subject==="tools"?this.t(`type.${i.id}`):i.name}</option>`)}
        </select>`:p}
        <span>:</span>
        <select aria-label=${this.t("advice.problem")} @change=${i=>{this.problem=i.target.value,this.answer=null}}>
          ${this.problems().map(i=>l`<option value=${i} ?selected=${i===this.problem}>${this.t(`advice.q.${i}`)}</option>`)}
        </select>
        <button class="btn primary" ?disabled=${this.busy} @click=${()=>this.ask()}><ha-icon icon="mdi:send"></ha-icon>${this.t("advice.ask")}</button>
      </div>
    </section>`}renderAnswer(e){let t=(s,n,i,a)=>a.length?l`<div class="section ${s}"><ha-icon icon=${n}></ha-icon><h4>${i}</h4><ul>${a.map(o=>l`<li>${o}</li>`)}</ul></div>`:p;return l`<section class="card answer" aria-live="polite">
      <h3><ha-icon icon="mdi:message-reply-text-outline"></ha-icon>${e.title} – ${this.t(`advice.q.${e.problem}`)}</h3>
      ${t("status","mdi:pulse",this.t("advice.sec.status"),e.status)}
      ${t("facts","mdi:information-outline",this.t("advice.sec.facts"),e.facts)}
      ${t("causes","mdi:help-circle-outline",this.t("advice.sec.causes"),e.causes)}
      ${t("actions","mdi:checkbox-marked-circle-outline",this.t("advice.sec.actions"),e.actions)}
      ${t("remedies","mdi:leaf",this.t("advice.sec.remedies"),e.remedies)}
      ${t("prevention","mdi:shield-check-outline",this.t("advice.sec.prevention"),e.prevention)}
      ${e.tasks.length?l`<div class="section"><ha-icon icon="mdi:format-list-checks"></ha-icon><h4>${this.t("advice.sec.tasks")}</h4>
        <ul>${e.tasks.map(s=>l`<li>${s.title} <span class="xs muted">(${s.due})</span></li>`)}</ul></div>`:p}
      ${e.plants.length>1||e.subject!=="plant"?l`<div class="chips" style="margin-top:12px">${e.plants.map(s=>this.plantChip(s))}</div>`:p}
      ${e.handbook?l`<div class="row" style="margin-top:12px"><button class="btn small ghost" @click=${()=>this.openChapter(e.handbook)}>
        <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("advice.read_more")}</button></div>`:p}
    </section>`}renderSuggestions(){let e=(this.advice?.suggestions??[]).filter(t=>!this.dismissed.has(t.id));return l`<section class="card stack" aria-labelledby="sugg-h">
      <h2 id="sugg-h"><ha-icon icon="mdi:lightbulb-group-outline"></ha-icon> ${this.t("advice.suggestions")} <span class="chip">${e.length}</span></h2>
      <p class="small muted">${this.t("advice.suggestions_intro")}</p>
      ${e.length?e.map(t=>l`<article class="sugg ${t.severity}">
        <span class="icon" title=${this.t(`advice.kind.${t.kind}`)}><ha-icon icon=${Ni[t.kind]??Bi[t.severity]}></ha-icon></span>
        <div><b>${t.title}</b><span class="small">${t.text}</span></div>
        ${t.plants.length?l`<div class="row chips">${t.plants.slice(0,5).map(s=>this.plantChip(s))}</div>`:p}
        <div class="row wrap">
          ${t.action&&this.admin?l`<button class="btn small primary" @click=${()=>this.apply(t)}>
            ${this.t(t.action.type==="add_planting"?"advice.apply_add":"advice.apply_open")}</button>`:p}
          ${t.handbook?l`<button class="btn small ghost" @click=${()=>this.openChapter(t.handbook)}>${this.t("advice.read_more")}</button>`:p}
          <button class="btn small ghost" @click=${()=>this.dismissed=new Set([...this.dismissed,t.id])}>${this.t("advice.dismiss")}</button>
        </div></article>`):l`<p class="small">${this.t("advice.none")}</p>`}
    </section>`}renderCoverage(){let e=this.advice?.coverage;if(!e)return l``;let t=new Date().getMonth(),s=n=>new Date(2026,n,1).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{month:"short"});return l`<section class="card stack" aria-labelledby="cov-h">
      <h2 id="cov-h"><ha-icon icon="mdi:calendar-sync-outline"></ha-icon> ${this.t("advice.coverage")}</h2>
      <div class="months" role="list">
        ${e.months.map((n,i)=>l`<div role="listitem" class="month ${n.length?"":"gap"} ${i===t?"now":""}"
          title=${n.map(a=>y(this.plants.find(o=>o.id===a),this.lang)).join(", ")||this.t("advice.nothing")}>
          ${s(i)}<b>${n.length}</b></div>`)}
      </div>
      <p class="xs muted">${e.gaps.length?this.t("advice.coverage_gaps"):this.t("advice.coverage_full")}</p>
    </section>`}renderShopping(){let e=this.supplies;if(!e)return l``;let t="";return l`<section class="card stack" aria-labelledby="shop-h">
      <h2 id="shop-h"><ha-icon icon="mdi:cart-outline"></ha-icon> ${this.t("advice.shopping")}</h2>
      <p class="small muted">${this.t("advice.shopping_intro")}</p>
      ${e.shopping.length?l`<table>
        ${e.shopping.map(s=>{let n=s.category!==t?l`<tr><td class="cat" colspan="3">${this.t(`advice.cat.${s.category}`)}</td></tr>`:p;return t=s.category,l`${n}<tr><td>${s.emoji} ${s.name}</td><td class="num">${s.quantity} ${s.unit}</td><td class="xs muted">${s.reason}</td></tr>`})}
      </table>`:l`<p class="small">${this.t("advice.nothing_to_buy")}</p>`}
      <details><summary class="small"><b>${this.t("advice.tools_per_task")}</b></summary>
        <table>${Object.entries(e.task_tools).filter(([,s])=>s.length).map(([s,n])=>l`<tr>
          <td>${this.t(`type.${s}`)}</td><td class="small">${n.map(i=>`${e.tools[i]?.emoji??""} ${e.tools[i]?.name??i}`).join(", ")}</td></tr>`)}</table>
      </details>
      <button class="btn small ghost" @click=${()=>this.openChapter("tools")}><ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("advice.read_tools")}</button>
    </section>`}};C.styles=[R,T`
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
    `],u([g({attribute:!1})],C.prototype,"snapshot",2),u([g({attribute:!1})],C.prototype,"plants",2),u([g({attribute:!1})],C.prototype,"families",2),u([g({attribute:!1})],C.prototype,"api",2),u([g({attribute:!1})],C.prototype,"t",2),u([g()],C.prototype,"lang",2),u([g({type:Boolean})],C.prototype,"admin",2),u([f()],C.prototype,"mode",2),u([f()],C.prototype,"options",2),u([f()],C.prototype,"subject",2),u([f()],C.prototype,"target",2),u([f()],C.prototype,"problem",2),u([f()],C.prototype,"answer",2),u([f()],C.prototype,"busy",2),u([f()],C.prototype,"advice",2),u([f()],C.prototype,"supplies",2),u([f()],C.prototype,"dismissed",2),C=u([P("hl-advice-view")],C);var Gs=50,qt=6,Di={add:"mdi:plus-circle-outline",remove:"mdi:minus-circle-outline",change:"mdi:pencil-outline"},Fi=["note","observation","problem","milestone"],Ui={note:"mdi:note-text-outline",observation:"mdi:eye-outline",problem:"mdi:alert-circle-outline",milestone:"mdi:flag-checkered"},Gi={ok:"ok",use_soon:"warn",expired:"bad",empty:"",unknown:""},H=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.section="diary";this.overview=null;this.filter="";this.draftPhotos=[];this.busy=!1;this.syslog=[];this.syslogMore=!1;this.syslogSystem=!0;this.quality=0}connectedCallback(){super.connectedCallback(),this.load()}updated(e){!e.has("snapshot")||!this.snapshot||e.get("snapshot")===void 0||(window.clearTimeout(this.reloadTimer),this.reloadTimer=window.setTimeout(()=>void this.load(),800))}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.reloadTimer)}async load(){try{this.overview=await this.api.records()}catch{}this.section==="system"&&await this.loadSyslog()}async loadSyslog(e=!1){try{let t=e?this.syslog[this.syslog.length-1]?.id??null:null,s=e?Gs:Math.max(Gs,this.syslog.length),n=await this.api.syslog({limit:s,before:t,include_system:this.syslogSystem});this.syslog=e?[...this.syslog,...n.entries]:n.entries,this.syslogMore=n.more}catch{}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async guard(e,t){this.busy=!0;try{return await e(),t&&this.toast(t),!0}catch(s){return this.toast(this.t("common.error",{message:s.message??String(s)})),!1}finally{this.busy=!1}}plant(e){return this.plants.find(t=>t.id===e)}icon(e,t=24){let s=this.plant(e);return s?de(se(s),s.color||A(this.families,s.family),t):l``}get season(){return this.snapshot.analysis?.season??new Date().getFullYear()}get presentPlantings(){return this.snapshot.plantings.filter(e=>ve(e,!!this.plant(e.plant_id)?.perennial,this.season))}plantingLabel(e){let t=this.snapshot.beds.find(s=>s.id===e.bed_id);return`${y(this.plant(e.plant_id),this.lang)} \xB7 ${t?.name??""}`}render(){return l`
      <div class="tabs" role="tablist">
        ${[["diary","mdi:notebook-outline"],["harvest","mdi:basket-outline"],["seeds","mdi:seed-outline"],["water","mdi:water-outline"],["system","mdi:history"]].map(([t,s])=>l`<button class="chip" role="tab" aria-selected=${String(this.section===t)} aria-pressed=${String(this.section===t)}
          @click=${()=>this.openSection(t)}><ha-icon icon=${s}></ha-icon>${this.t(`journal.${t}`)}</button>`)}
      </div>
      ${this.section==="diary"?this.renderDiary():this.section==="harvest"?this.renderHarvest():this.section==="seeds"?this.renderSeeds():this.section==="water"?this.renderWater():this.renderSystem()}
    `}openSection(e){this.section=e,e==="system"&&this.loadSyslog()}async addPhoto(e){let t=[...e.target.files??[]];for(let s of t)await this.guard(async()=>{this.draftPhotos=[...this.draftPhotos,await this.api.uploadPhoto(s)]});e.target.value=""}async saveEntry(e){e.preventDefault();let t=e.target,s=a=>t.elements.namedItem(a).value,n=s("link"),i={text:s("text"),kind:s("kind"),photos:this.draftPhotos,planting_id:n.startsWith("p:")?n.slice(2):null,bed_id:n.startsWith("b:")?n.slice(2):null};await this.guard(()=>this.api.saveJournal(i),this.t("journal.saved"))&&(t.reset(),this.draftPhotos=[])}renderDiary(){let e=[...this.snapshot.journal??[]].sort((n,i)=>n.at<i.at?1:-1),t=e.filter(n=>!this.filter||n.bed_id===this.filter||n.plant_id===this.filter),s="";return l`<div class="grid">
      <section class="card stack" aria-labelledby="new-entry">
        <h2 id="new-entry"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon> ${this.t("journal.new")}</h2>
        <form class="stack" @submit=${this.saveEntry}>
          <label class="field">${this.t("journal.text")}<textarea name="text" placeholder=${this.t("journal.placeholder")}></textarea></label>
          <div class="form-grid">
            <label class="field">${this.t("journal.kind")}<select name="kind">${Fi.map(n=>l`<option value=${n}>${this.t(`journal.kind.${n}`)}</option>`)}</select></label>
            <label class="field">${this.t("journal.link")}<select name="link"><option value="">${this.t("journal.whole_garden")}</option>
              <optgroup label=${this.t("journal.beds")}>${this.snapshot.beds.map(n=>l`<option value=${`b:${n.id}`}>${n.name}</option>`)}</optgroup>
              <optgroup label=${this.t("journal.crops")}>${this.presentPlantings.map(n=>l`<option value=${`p:${n.id}`}>${this.plantingLabel(n)}</option>`)}</optgroup>
            </select></label>
          </div>
          <label class="btn small ghost" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("journal.add_photo")}
            <input type="file" accept="image/*" capture="environment" multiple hidden @change=${this.addPhoto} /></label>
          ${this.draftPhotos.length?l`<div class="photos" style="grid-column:auto">${this.draftPhotos.map(n=>l`<img src=${ge(n)} alt="" />`)}</div>`:p}
          <div class="row"><button class="btn primary" type="submit" ?disabled=${this.busy||!this.admin}>${this.t("journal.save")}</button></div>
        </form>
      </section>
      <section class="card stack" aria-labelledby="diary-h">
        <div class="row wrap"><h2 id="diary-h"><ha-icon icon="mdi:timeline-text-outline"></ha-icon> ${this.t("journal.diary")}</h2><span class="spacer"></span>
          <select aria-label=${this.t("journal.filter")} @change=${n=>this.filter=n.target.value}>
            <option value="">${this.t("journal.all")}</option>
            ${this.snapshot.beds.map(n=>l`<option value=${n.id}>${n.name}</option>`)}
            ${[...new Set(e.map(n=>n.plant_id).filter(Boolean))].map(n=>l`<option value=${n}>${y(this.plant(n),this.lang)}</option>`)}
          </select></div>
        ${t.length?l`<div class="timeline">${t.map(n=>{let i=w(n.at,this.lang,{month:"long",year:"numeric"}),a=i!==s?l`<div class="month">${i}</div>`:p;s=i;let o=this.snapshot.beds.find(d=>d.id===n.bed_id);return l`${a}<article class="entry ${n.kind}">
            <span class="icon">${n.plant_id?this.icon(n.plant_id,26):l`<ha-icon icon=${Ui[n.kind]}></ha-icon>`}</span>
            <div><div class="meta">${w(n.at,this.lang,{weekday:"short",day:"numeric",month:"short"})}
              · ${this.t(`journal.kind.${n.kind}`)}${n.plant_id?` \xB7 ${y(this.plant(n.plant_id),this.lang)}`:""}${o?` \xB7 ${o.name}`:""}${n.author?` \xB7 ${n.author}`:""}</div>
              <div>${n.text}</div></div>
            ${n.photos.length?l`<div class="photos">${n.photos.map(d=>l`<a href=${ge(d,"original")} target="_blank" rel="noopener"><img src=${ge(d)} alt="" loading="lazy" /></a>`)}</div>`:p}
            ${this.admin?l`<div style="grid-column:2"><button class="btn small ghost" @click=${()=>this.guard(()=>this.api.deleteRecord("journal",n.id))}>${this.t("common.delete")}</button></div>`:p}
          </article>`})}</div>`:l`<p class="small muted">${this.t("journal.empty")}</p>`}
      </section>
    </div>`}async saveHarvest(e){e.preventDefault();let t=e.target,s=a=>t.elements.namedItem(a).value,n=s("what");await this.guard(()=>this.api.logHarvest({planting_id:n.startsWith("p:")?n.slice(2):null,plant_id:n.startsWith("x:")?n.slice(2):null,kg:Number(s("kg"))||0,count:s("count")?Number(s("count")):null,quality:this.quality||null,day:s("day")||void 0,note:s("note")}),this.t("journal.harvest_saved"))&&(t.reset(),this.quality=0,this.load())}renderHarvest(){let e=this.overview,t=Object.values(e?.harvest_season??{}).sort((o,d)=>d.kg-o.kg),s=t.reduce((o,d)=>o+d.kg,0),n=Math.max(...t.map(o=>o.kg),.001),i=[...this.snapshot.harvest_log??[]].sort((o,d)=>o.day<d.day?1:-1).slice(0,25),a=this.presentPlantings.filter(o=>this.plant(o.plant_id)?.harvestable!==!1);return l`<div class="grid">
      <section class="card stack" aria-labelledby="h-new">
        <h2 id="h-new"><ha-icon icon="mdi:basket-plus-outline"></ha-icon> ${this.t("journal.log_harvest")}</h2>
        <form class="stack" @submit=${this.saveHarvest}>
          <label class="field">${this.t("journal.what")}<select name="what" required>
            <optgroup label=${this.t("journal.crops")}>${a.map(o=>l`<option value=${`p:${o.id}`}>${this.plantingLabel(o)}</option>`)}</optgroup>
            <optgroup label=${this.t("advice.all_plants")}>${[...this.plants].sort((o,d)=>y(o,this.lang).localeCompare(y(d,this.lang))).map(o=>l`<option value=${`x:${o.id}`}>${y(o,this.lang)}</option>`)}</optgroup>
          </select></label>
          <div class="form-grid">
            <label class="field">${this.t("journal.kg")}<input name="kg" type="number" min="0" step="0.05" inputmode="decimal" /></label>
            <label class="field">${this.t("journal.count")}<input name="count" type="number" min="0" step="1" inputmode="numeric" /></label>
            <label class="field">${this.t("journal.day")}<input name="day" type="date" .value=${this.snapshot.analysis?.today??""} /></label>
            <div class="field">${this.t("journal.quality")}<span class="stars" role="group">${[1,2,3,4,5].map(o=>l`<button type="button" aria-label=${String(o)}
              aria-pressed=${String(this.quality>=o)} @click=${()=>this.quality=this.quality===o?0:o}>★</button>`)}</span></div>
            <label class="field full">${this.t("task.notes")}<input name="note" /></label>
          </div>
          <div class="row"><button class="btn primary" type="submit" ?disabled=${this.busy||!this.admin}>${this.t("journal.save")}</button></div>
        </form>
        <p class="xs muted">${this.t("journal.learn_hint")}</p>
      </section>
      <section class="card stack" aria-labelledby="h-season">
        <h2 id="h-season"><ha-icon icon="mdi:chart-bar"></ha-icon> ${this.t("journal.harvest_season",{season:e?.season??this.season})}</h2>
        <div class="row"><span class="total">${s.toFixed(1)} kg</span><span class="small muted">${this.t("journal.crops_n",{n:t.length})}</span></div>
        ${t.map(o=>{let d=e?.learned_yields[o.plant_id],h=this.plant(o.plant_id)?.yield_kg_m2;return l`<div class="crop">${this.icon(o.plant_id,26)}
            <div><b>${y(this.plant(o.plant_id),this.lang)}</b>
              <div class="bar" style=${`width:${Math.max(o.kg/n*100,2)}%`}></div>
              ${d!=null?l`<span class="xs muted">${this.t("journal.yield",{kg:d,db:h??"\u2013"})}</span>`:p}</div>
            <span class="num"><b>${o.kg.toFixed(1)} kg</b>${o.count?l`<br /><span class="xs muted">${o.count} ×</span>`:p}</span></div>`})}
        ${i.length?l`<h3>${this.t("journal.recent")}</h3><table>
          <tr><th>${this.t("journal.day")}</th><th>${this.t("lib.plant")}</th><th class="num">kg</th><th class="num">#</th><th></th></tr>
          ${i.map(o=>l`<tr><td>${w(o.day,this.lang)}</td><td>${y(this.plant(o.plant_id),this.lang)}${o.quality?` ${"\u2605".repeat(o.quality)}`:""}</td>
            <td class="num">${o.kg?o.kg.toFixed(2):"\u2013"}</td><td class="num">${o.count??"\u2013"}</td>
            <td class="num">${this.admin?l`<button class="icon-btn" aria-label=${this.t("common.delete")} @click=${()=>this.guard(()=>this.api.deleteRecord("harvest",o.id)).then(()=>this.load())}>
              <ha-icon icon="mdi:delete-outline"></ha-icon></button>`:p}</td></tr>`)}
        </table>`:l`<p class="small muted">${this.t("journal.no_harvest")}</p>`}
      </section>
    </div>`}async saveSeed(e){e.preventDefault();let t=e.target,s=i=>t.elements.namedItem(i).value,n={plant_id:s("plant"),variety:s("variety"),year:s("year")?Number(s("year")):null,quantity:Number(s("quantity")||1),unit:s("unit"),source:s("source")};await this.guard(()=>this.api.saveSeed(n),this.t("journal.seed_saved"))&&(t.reset(),this.load())}renderSeeds(){let e=this.overview?.seeds,t=[...this.plants].sort((s,n)=>y(s,this.lang).localeCompare(y(n,this.lang)));return l`<div class="grid">
      <section class="card stack" aria-labelledby="s-new">
        <h2 id="s-new"><ha-icon icon="mdi:seed-plus-outline"></ha-icon> ${this.t("journal.add_seed")}</h2>
        <form class="stack" @submit=${this.saveSeed}>
          <label class="field">${this.t("lib.plant")}<select name="plant" required>${t.map(s=>l`<option value=${s.id}>${y(s,this.lang)}</option>`)}</select></label>
          <div class="form-grid">
            <label class="field">${this.t("journal.variety")}<input name="variety" /></label>
            <label class="field">${this.t("journal.year")}<input name="year" type="number" min="1990" max="2100" .value=${String(this.season)} /></label>
            <label class="field">${this.t("journal.quantity")}<input name="quantity" type="number" min="0" step="0.5" value="1" /></label>
            <label class="field">${this.t("journal.unit")}<select name="unit">${["packet","seeds","g"].map(s=>l`<option value=${s}>${this.t(`journal.unit.${s}`)}</option>`)}</select></label>
            <label class="field full">${this.t("journal.source")}<input name="source" placeholder=${this.t("journal.source_hint")} /></label>
          </div>
          <div class="row"><button class="btn primary" type="submit" ?disabled=${this.busy||!this.admin}>${this.t("journal.save")}</button></div>
        </form>
        ${e?.missing.length?l`<div class="finding warning"><ha-icon icon="mdi:cart-outline"></ha-icon><span>${this.t("journal.seed_missing")}:
          ${e.missing.map(s=>y(this.plant(s),this.lang)).join(", ")}</span></div>`:p}
        <p class="xs muted">${this.t("journal.seed_hint")}</p>
      </section>
      <section class="card stack" aria-labelledby="s-box">
        <h2 id="s-box"><ha-icon icon="mdi:archive-outline"></ha-icon> ${this.t("journal.seed_box")} <span class="chip">${e?.packets.length??0}</span></h2>
        ${e?.packets.length?l`<table>
          <tr><th>${this.t("lib.plant")}</th><th>${this.t("journal.variety")}</th><th class="num">${this.t("journal.year")}</th><th class="num">${this.t("journal.quantity")}</th><th>${this.t("journal.status")}</th><th></th></tr>
          ${e.packets.map(s=>l`<tr>
            <td>${this.icon(s.plant_id,18)} ${y(this.plant(s.plant_id),this.lang)}${s.needed?l` <span class="chip ok" title=${this.t("journal.needed")}>✓</span>`:p}</td>
            <td>${s.variety||"\u2013"}</td><td class="num">${s.year??"\u2013"}</td><td class="num">${s.quantity} ${this.t(`journal.unit.${s.unit}`)}</td>
            <td><span class="chip ${Gi[s.status]}">${this.t(`journal.seed.${s.status}`,{year:s.use_by??""})}</span></td>
            <td class="num">${this.admin?l`<button class="icon-btn" aria-label=${this.t("common.delete")} @click=${()=>this.guard(()=>this.api.deleteRecord("seed",s.id)).then(()=>this.load())}>
              <ha-icon icon="mdi:delete-outline"></ha-icon></button>`:p}</td></tr>`)}
        </table>`:l`<p class="small muted">${this.t("journal.no_seeds")}</p>`}
      </section>
    </div>`}renderWater(){let e=this.overview?.water,t=this.snapshot.settings.water,s=!!(t?.meter_entity||t?.butt_level_entity),n=Math.max(...(e?.per_day??[]).map(i=>i.liters),1);return l`<section class="card stack" aria-labelledby="w-h">
      <h2 id="w-h"><ha-icon icon="mdi:water-outline"></ha-icon> ${this.t("journal.water")}</h2>
      ${s?p:l`<div class="finding info"><ha-icon icon="mdi:information-outline"></ha-icon><span>${this.t("journal.water_setup")}</span></div>`}
      <div class="tiles">
        <div class="tile">${this.t("journal.water_week")}<b>${e?.week_l!=null?`${e.week_l} L`:"\u2013"}</b></div>
        <div class="tile">${this.t("journal.water_season")}<b>${e?.season_l!=null?`${e.season_l} L`:"\u2013"}</b></div>
        <div class="tile">${this.t("journal.rain_available")}<b>${e?.rain_available_l!=null?`${e.rain_available_l} L`:e?.butt_pct!=null?`${e.butt_pct}%`:"\u2013"}</b></div>
      </div>
      ${e?.per_day.length?l`<h3>${this.t("journal.per_day")}</h3><div class="days" role="img" aria-label=${this.t("journal.per_day")}>
        ${e.per_day.map(i=>l`<div title=${`${i.day}: ${i.liters} L`} style=${`height:${i.liters/n*100}%`}></div>`)}</div>`:p}
      <p class="xs muted">${this.t("journal.water_hint")}</p>
    </section>`}async undo(e){if(confirm(this.t("syslog.confirm",{what:this.entryTitle(e)}))){this.busy=!0;try{let t=await this.api.undo(e.id);!t.ok&&t.conflicts.length&&!t.problems.length&&confirm(this.t("syslog.conflict",{n:t.conflicts.length}))&&(t=await this.api.undo(e.id,!0)),t.ok?this.toast(this.t("syslog.undone")):t.problems.length&&this.toast(this.t("syslog.blocked")),await this.loadSyslog()}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}finally{this.busy=!1}}}summaryText(e){let t;e.col==="settings"?t=e.key??"":e.plant_id&&(e.col==="plantings"||!e.name)?t=y(this.plant(e.plant_id),this.lang)||e.plant_id:t=e.name??"";let s=[e.bed,e.col==="plantings"&&e.season?this.t("common.season",{year:e.season}):null].filter(Boolean).join(", ");return`${this.t(`syslog.col.${e.col}`)}: ${t}${s?` (${s})`:""}`}entryTitle(e){if(e.undo_of)return this.t("syslog.reason.undo");let t=e.summary[0],n=new Set(e.summary.map(i=>i.op)).size===1?this.t(`syslog.op.${t.op}`):this.t("syslog.op.mixed");return e.summary.length===1?`${n} \u2013 ${this.summaryText(t)}`:this.t("syslog.n_changes",{verb:n,n:e.count})}renderSystem(){let e=t=>new Date(t).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return l`<section class="card stack" aria-labelledby="sys-h">
      <h2 id="sys-h"><ha-icon icon="mdi:history"></ha-icon> ${this.t("journal.system")}</h2>
      <p class="small muted">${this.t("syslog.intro")}</p>
      <label class="row small"><input type="checkbox" .checked=${this.syslogSystem}
        @change=${t=>{this.syslogSystem=t.target.checked,this.loadSyslog()}} />${this.t("syslog.show_system")}</label>
      ${this.syslog.length?p:l`<p class="small muted">${this.t("syslog.empty")}</p>`}
      <div class="stack" style="gap:8px" role="list">
        ${this.syslog.map(t=>l`<article role="listitem" class="log ${t.source} ${t.undone_by?"undone":""}">
          <div class="icon"><ha-icon icon=${t.undo_of?"mdi:undo-variant":t.source==="system"?"mdi:robot-outline":"mdi:account-edit-outline"}></ha-icon></div>
          <div>
            <strong>${this.entryTitle(t)}</strong>
            <div class="meta">${e(t.at)} · ${t.source==="system"?this.t("syslog.by_system"):t.user??this.t("syslog.by_unknown")}
              · ${this.t(`syslog.reason.${t.reason}`)}${t.undone_by?l` · <span class="chip warn">${this.t("syslog.is_undone")}</span>`:p}</div>
            ${t.summary.length>1?l`<ul>
              ${t.summary.slice(0,qt).map(s=>l`<li><ha-icon icon=${Di[s.op]}></ha-icon>${this.summaryText(s)}</li>`)}
              ${t.summary.length>qt?l`<li class="muted">${this.t("syslog.and_more",{n:t.summary.length-qt})}</li>`:p}
            </ul>`:p}
          </div>
          ${this.admin&&!t.undone_by?l`<button class="btn small ghost" ?disabled=${this.busy} @click=${()=>this.undo(t)}
            aria-label=${`${this.t("syslog.undo")}: ${this.entryTitle(t)}`}><ha-icon icon="mdi:undo"></ha-icon>${this.t("syslog.undo")}</button>`:l`<span></span>`}
        </article>`)}
      </div>
      ${this.syslogMore?l`<div class="row"><button class="btn small" @click=${()=>this.loadSyslog(!0)}>${this.t("syslog.more")}</button></div>`:p}
    </section>`}};H.styles=[R,T`
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
      .log.system .icon { color: var(--hl-text-muted); }
      .log .icon { width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; background: var(--hl-surface-2); }
      .log ul { margin: 4px 0 0; padding: 0; list-style: none; font-size: var(--hl-fs-sm); }
      .log li { display: flex; gap: 6px; align-items: center; }
      .log li ha-icon { --mdc-icon-size: 16px; color: var(--hl-text-muted); flex: none; }
      .log .meta { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
      @media (max-width: 600px) { .log { grid-template-columns: 1fr; } .log .icon { display: none; } }
    `],u([g({attribute:!1})],H.prototype,"snapshot",2),u([g({attribute:!1})],H.prototype,"plants",2),u([g({attribute:!1})],H.prototype,"families",2),u([g({attribute:!1})],H.prototype,"api",2),u([g({attribute:!1})],H.prototype,"t",2),u([g()],H.prototype,"lang",2),u([g({type:Boolean})],H.prototype,"admin",2),u([g()],H.prototype,"section",2),u([f()],H.prototype,"overview",2),u([f()],H.prototype,"filter",2),u([f()],H.prototype,"draftPhotos",2),u([f()],H.prototype,"busy",2),u([f()],H.prototype,"syslog",2),u([f()],H.prototype,"syslogMore",2),u([f()],H.prototype,"syslogSystem",2),u([f()],H.prototype,"quality",2),H=u([P("hl-journal-view")],H);var qs=[{id:"dashboard",icon:"mdi:home-variant-outline",mobile:!0},{id:"planner",icon:"mdi:floor-plan",mobile:!0},{id:"library",icon:"mdi:sprout-outline",mobile:!0},{id:"calendar",icon:"mdi:calendar-month-outline",mobile:!0},{id:"journal",icon:"mdi:notebook-outline",mobile:!1},{id:"advice",icon:"mdi:chat-question-outline",mobile:!0},{id:"handbook",icon:"mdi:book-open-page-variant-outline",mobile:!0},{id:"print",icon:"mdi:printer-outline",mobile:!1},{id:"settings",icon:"mdi:cog-outline",mobile:!1}],F=class extends E{constructor(){super(...arguments);this.narrow=!1;this.snapshot=null;this.plants=[];this.families={};this.tab="dashboard";this.toastMsg="";this.openTask=null;this.creatingTask=!1;this.error="";this.chapter="";this.t=nt("en");this.uiLang="en"}willUpdate(e){if(e.has("hass")&&this.hass){let t=De(this.snapshot?.lang??this.hass.locale?.language??this.hass.language);t!==this.uiLang&&(this.uiLang=t,this.t=nt(t)),this.toggleAttribute("dark",!!this.hass.themes?.darkMode),Ms(this.hass),this.api?this.api.setHass(this.hass):(this.api=new Ne(this.hass),this.connect())}if(e.has("route")&&this.route){let[t,s]=this.route.path.replace(/^\//,"").split("/");this.tab=qs.some(n=>n.id===t)?t:"dashboard",this.tab==="handbook"&&(this.chapter=s??"")}}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.unsubscribe=void 0,this.api=void 0}connectedCallback(){super.connectedCallback(),this.hass&&!this.api&&(this.api=new Ne(this.hass),this.connect())}async connect(){try{await this.loadPlants(),this.loadGlossary(),this.unsubscribe=await this.api.subscribe(e=>{this.snapshot=e;let t=De(e.lang);t!==this.uiLang&&(this.uiLang=t,this.t=nt(t),this.loadGlossary()),this.openTask&&(this.openTask=e.tasks.find(s=>s.id===this.openTask.id)??null)})}catch(e){this.error=e.code==="not_loaded"?this.t("common.not_loaded"):String(e.message??e)}}async loadGlossary(){try{zs((await this.api.handbookIndex(this.uiLang)).glossary),Ss(await this.api.supplies())}catch{}}openHandbook(e=""){this.chapter=e;let t=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/handbook${e?`/${e}`:""}`;history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab="handbook"}async loadPlants(){let e=await this.api.plants();this.plants=e.plants,this.families=e.families}navigate(e,t){t?.preventDefault();let s=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/${e==="dashboard"?"":e}`.replace(/\/$/,"");history.pushState(null,"",s),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab=e}toast(e){this.toastMsg=e,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastMsg="",4500)}async completeTask(e){try{await this.api.taskAction(e.id,"complete"),this.toast(this.t("task.completed",{title:e.title}))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async irrigation(e){try{if(e==="stop"){await this.api.irrigationStop(),this.toast(this.t("dash.irrigation_stopped"));return}let t=await this.api.irrigationRun(),s=Object.values(t.reasons??{});this.toast(t.started?this.t("dash.irrigation_started",{min:Math.round(t.total_minutes)}):s[0]??this.t("dash.irrigation_nothing"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async postponeTask(e,t){try{await this.api.taskAction(e.id,"postpone",{days:t}),this.toast(this.t("task.postponed",{title:e.title,n:t}))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderTab(){let e=this.snapshot,t=this.hass.user?.is_admin??!0,s=new Map(this.plants.map(n=>[n.id,n]));switch(this.tab){case"planner":return l`<hl-planner-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} .narrow=${this.narrow}></hl-planner-view>`;case"library":return l`<hl-library-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} @plants-changed=${()=>this.loadPlants()}></hl-library-view>`;case"calendar":return l`<hl-calendar-view .snapshot=${e} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .plants=${s} .families=${this.families}></hl-calendar-view>`;case"journal":return l`<hl-journal-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t}></hl-journal-view>`;case"advice":return l`<hl-advice-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t}></hl-advice-view>`;case"handbook":return l`<hl-handbook-view .api=${this.api} .t=${this.t} .lang=${this.uiLang} .chapterId=${this.chapter} .narrow=${this.narrow}></hl-handbook-view>`;case"print":return l`<hl-print-view .snapshot=${e} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .narrow=${this.narrow} .admin=${t}></hl-print-view>`;case"settings":return l`<hl-settings-view .snapshot=${e} .hass=${this.hass} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .admin=${t}></hl-settings-view>`;default:return l`<hl-dashboard-view .snapshot=${e} .plants=${s} .families=${this.families} .t=${this.t} .lang=${this.uiLang} .admin=${t}></hl-dashboard-view>`}}renderNav(e){return l`<nav class=${e} aria-label="Hortulus">
      ${qs.filter(t=>e!=="bottom-nav"||t.mobile).map(t=>l`<a href="#" aria-current=${t.id===this.tab?"page":"false"} @click=${s=>this.navigate(t.id,s)}>
        <ha-icon icon=${t.icon}></ha-icon>${this.t(`nav.${t.id}`)}</a>`)}
    </nav>`}render(){return l`
      <header class="appbar">
        ${this.narrow?l`<button class="icon-btn" aria-label="Menu" @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}>
          <ha-icon icon="mdi:menu"></ha-icon></button>`:p}
        <div class="brand">${Rt(30)}<span>Hortulus</span>${this.narrow?p:l`<small>${this.t("app.tagline")}</small>`}</div>
        ${this.renderNav("top")}
        ${this.narrow?l`<span style="flex:1"></span>
          <button class="icon-btn" aria-label=${this.t("nav.journal")} @click=${()=>this.navigate("journal")}><ha-icon icon="mdi:notebook-outline"></ha-icon></button>
          <button class="icon-btn" aria-label=${this.t("nav.print")} @click=${()=>this.navigate("print")}><ha-icon icon="mdi:printer-outline"></ha-icon></button>
          <button class="icon-btn" aria-label=${this.t("nav.settings")} aria-pressed=${String(this.tab==="settings")} @click=${()=>this.navigate("settings")}>
            <ha-icon icon="mdi:cog-outline"></ha-icon></button>`:p}
      </header>
      <main @open-task=${e=>this.openTask=e.detail}
        @complete-task=${e=>this.completeTask(e.detail)}
        @postpone-task=${e=>this.postponeTask(e.detail.task,e.detail.days)}
        @irrigation=${e=>this.irrigation(e.detail)}
        @new-task=${()=>this.creatingTask=!0}
        @navigate=${e=>this.navigate(e.detail)}
        @open-handbook=${e=>this.openHandbook(e.detail?.chapter??"")}
        @hl-toast=${e=>this.toast(e.detail.message)}>
        ${this.error?l`<div class="card error">${Rt(56)}<p>${this.error}</p></div>`:this.snapshot?this.renderTab():l`<p class="empty">${this.t("common.loading")}</p>`}
      </main>
      ${this.renderNav("bottom-nav")}
      ${this.snapshot&&(this.openTask||this.creatingTask)?l`<hl-task-dialog .task=${this.openTask} .create=${this.creatingTask} .snapshot=${this.snapshot}
        @open-handbook=${e=>this.openHandbook(e.detail?.chapter??"")}
        .beds=${this.snapshot.beds} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .today=${this.snapshot.analysis?.today??""}
        @hl-toast=${e=>this.toast(e.detail.message)}
        @closed=${()=>{this.openTask=null,this.creatingTask=!1}}></hl-task-dialog>`:p}
      ${this.toastMsg?l`<div class="toast" role="status" aria-live="polite">${this.toastMsg}</div>`:p}
    `}};F.styles=[_s,R,T`
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
    `],u([g({attribute:!1})],F.prototype,"hass",2),u([g({type:Boolean,reflect:!0})],F.prototype,"narrow",2),u([g({attribute:!1})],F.prototype,"route",2),u([g({attribute:!1})],F.prototype,"panel",2),u([f()],F.prototype,"snapshot",2),u([f()],F.prototype,"plants",2),u([f()],F.prototype,"families",2),u([f()],F.prototype,"tab",2),u([f()],F.prototype,"toastMsg",2),u([f()],F.prototype,"openTask",2),u([f()],F.prototype,"creatingTask",2),u([f()],F.prototype,"error",2),u([f()],F.prototype,"chapter",2),F=u([P("hortulus-panel")],F);export{F as HortulusPanel};
