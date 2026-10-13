var Sn=Object.defineProperty;var En=Object.getOwnPropertyDescriptor;var p=(h,o,e,t)=>{for(var s=t>1?void 0:t?En(o,e):o,a=h.length-1,n;a>=0;a--)(n=h[a])&&(s=(t?n(o,e,s):n(s))||s);return t&&s&&Sn(o,e,s),s};var At=globalThis,It=At.ShadowRoot&&(At.ShadyCSS===void 0||At.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,hs=Symbol(),na=new WeakMap,mt=class{constructor(o,e,t){if(this._$cssResult$=!0,t!==hs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=o,this.t=e}get styleSheet(){let o=this.o,e=this.t;if(It&&o===void 0){let t=e!==void 0&&e.length===1;t&&(o=na.get(e)),o===void 0&&((this.o=o=new CSSStyleSheet).replaceSync(this.cssText),t&&na.set(e,o))}return o}toString(){return this.cssText}},ia=h=>new mt(typeof h=="string"?h:h+"",void 0,hs),S=(h,...o)=>{let e=h.length===1?h[0]:o.reduce((t,s,a)=>t+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+h[a+1],h[0]);return new mt(e,h,hs)},ra=(h,o)=>{if(It)h.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of o){let t=document.createElement("style"),s=At.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,h.appendChild(t)}},ps=It?h=>h:h=>h instanceof CSSStyleSheet?(o=>{let e="";for(let t of o.cssRules)e+=t.cssText;return ia(e)})(h):h;var{is:Tn,defineProperty:zn,getOwnPropertyDescriptor:Pn,getOwnPropertyNames:jn,getOwnPropertySymbols:Rn,getPrototypeOf:Ln}=Object,Ht=globalThis,oa=Ht.trustedTypes,Cn=oa?oa.emptyScript:"",An=Ht.reactiveElementPolyfillSupport,gt=(h,o)=>h,ft={toAttribute(h,o){switch(o){case Boolean:h=h?Cn:null;break;case Object:case Array:h=h==null?h:JSON.stringify(h)}return h},fromAttribute(h,o){let e=h;switch(o){case Boolean:e=h!==null;break;case Number:e=h===null?null:Number(h);break;case Object:case Array:try{e=JSON.parse(h)}catch{e=null}}return e}},Dt=(h,o)=>!Tn(h,o),la={attribute:!0,type:String,converter:ft,reflect:!1,useDefault:!1,hasChanged:Dt};Symbol.metadata??=Symbol("metadata"),Ht.litPropertyMetadata??=new WeakMap;var Ee=class extends HTMLElement{static addInitializer(o){this._$Ei(),(this.l??=[]).push(o)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(o,e=la){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(o)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(o,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(o,t,e);s!==void 0&&zn(this.prototype,o,s)}}static getPropertyDescriptor(o,e,t){let{get:s,set:a}=Pn(this.prototype,o)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let r=s?.call(this);a?.call(this,n),this.requestUpdate(o,r,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(o){return this.elementProperties.get(o)??la}static _$Ei(){if(this.hasOwnProperty(gt("elementProperties")))return;let o=Ln(this);o.finalize(),o.l!==void 0&&(this.l=[...o.l]),this.elementProperties=new Map(o.elementProperties)}static finalize(){if(this.hasOwnProperty(gt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(gt("properties"))){let e=this.properties,t=[...jn(e),...Rn(e)];for(let s of t)this.createProperty(s,e[s])}let o=this[Symbol.metadata];if(o!==null){let e=litPropertyMetadata.get(o);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(o){let e=[];if(Array.isArray(o)){let t=new Set(o.flat(1/0).reverse());for(let s of t)e.unshift(ps(s))}else o!==void 0&&e.push(ps(o));return e}static _$Eu(o,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof o=="string"?o.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(o=>this.enableUpdating=o),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(o=>o(this))}addController(o){(this._$EO??=new Set).add(o),this.renderRoot!==void 0&&this.isConnected&&o.hostConnected?.()}removeController(o){this._$EO?.delete(o)}_$E_(){let o=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(o.set(t,this[t]),delete this[t]);o.size>0&&(this._$Ep=o)}createRenderRoot(){let o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ra(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(o=>o.hostConnected?.())}enableUpdating(o){}disconnectedCallback(){this._$EO?.forEach(o=>o.hostDisconnected?.())}attributeChangedCallback(o,e,t){this._$AK(o,t)}_$ET(o,e){let t=this.constructor.elementProperties.get(o),s=this.constructor._$Eu(o,t);if(s!==void 0&&t.reflect===!0){let a=(t.converter?.toAttribute!==void 0?t.converter:ft).toAttribute(e,t.type);this._$Em=o,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(o,e){let t=this.constructor,s=t._$Eh.get(o);if(s!==void 0&&this._$Em!==s){let a=t.getPropertyOptions(s),n=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:ft;this._$Em=s;let r=n.fromAttribute(e,a.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(o,e,t,s=!1,a){if(o!==void 0){let n=this.constructor;if(s===!1&&(a=this[o]),t??=n.getPropertyOptions(o),!((t.hasChanged??Dt)(a,e)||t.useDefault&&t.reflect&&a===this._$Ej?.get(o)&&!this.hasAttribute(n._$Eu(o,t))))return;this.C(o,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(o,e,{useDefault:t,reflect:s,wrapped:a},n){t&&!(this._$Ej??=new Map).has(o)&&(this._$Ej.set(o,n??e??this[o]),a!==!0||n!==void 0)||(this._$AL.has(o)||(this.hasUpdated||t||(e=void 0),this._$AL.set(o,e)),s===!0&&this._$Em!==o&&(this._$Eq??=new Set).add(o))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let o=this.scheduleUpdate();return o!=null&&await o,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,a]of t){let{wrapped:n}=a,r=this[s];n!==!0||this._$AL.has(s)||r===void 0||this.C(s,void 0,a,r)}}let o=!1,e=this._$AL;try{o=this.shouldUpdate(e),o?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw o=!1,this._$EM(),t}o&&this._$AE(e)}willUpdate(o){}_$AE(o){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(o)),this.updated(o)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(o){return!0}update(o){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(o){}firstUpdated(o){}};Ee.elementStyles=[],Ee.shadowRootOptions={mode:"open"},Ee[gt("elementProperties")]=new Map,Ee[gt("finalized")]=new Map,An?.({ReactiveElement:Ee}),(Ht.reactiveElementVersions??=[]).push("2.1.2");var us=globalThis,da=h=>h,Nt=us.trustedTypes,ha=Nt?Nt.createPolicy("lit-html",{createHTML:h=>h}):void 0,ms="$lit$",Te=`lit$${Math.random().toFixed(9).slice(2)}$`,gs="?"+Te,In=`<${gs}>`,Oe=document,bt=()=>Oe.createComment(""),yt=h=>h===null||typeof h!="object"&&typeof h!="function",fs=Array.isArray,fa=h=>fs(h)||typeof h?.[Symbol.iterator]=="function",cs=`[ 	
\f\r]`,vt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pa=/-->/g,ca=/>/g,Ne=RegExp(`>|${cs}(?:([^\\s"'>=/]+)(${cs}*=${cs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ua=/'/g,ma=/"/g,va=/^(?:script|style|textarea|title)$/i,vs=h=>(o,...e)=>({_$litType$:h,strings:o,values:e}),i=vs(1),b=vs(2),Ki=vs(3),ze=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ga=new WeakMap,Be=Oe.createTreeWalker(Oe,129);function ba(h,o){if(!fs(h)||!h.hasOwnProperty("raw"))throw Error("invalid template strings array");return ha!==void 0?ha.createHTML(o):o}var ya=(h,o)=>{let e=h.length-1,t=[],s,a=o===2?"<svg>":o===3?"<math>":"",n=vt;for(let r=0;r<e;r++){let l=h[r],d,c,g=-1,v=0;for(;v<l.length&&(n.lastIndex=v,c=n.exec(l),c!==null);)v=n.lastIndex,n===vt?c[1]==="!--"?n=pa:c[1]!==void 0?n=ca:c[2]!==void 0?(va.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=Ne):c[3]!==void 0&&(n=Ne):n===Ne?c[0]===">"?(n=s??vt,g=-1):c[1]===void 0?g=-2:(g=n.lastIndex-c[2].length,d=c[1],n=c[3]===void 0?Ne:c[3]==='"'?ma:ua):n===ma||n===ua?n=Ne:n===pa||n===ca?n=vt:(n=Ne,s=void 0);let $=n===Ne&&h[r+1].startsWith("/>")?" ":"";a+=n===vt?l+In:g>=0?(t.push(d),l.slice(0,g)+ms+l.slice(g)+Te+$):l+Te+(g===-2?r:$)}return[ba(h,a+(h[e]||"<?>")+(o===2?"</svg>":o===3?"</math>":"")),t]},$t=class h{constructor({strings:o,_$litType$:e},t){let s;this.parts=[];let a=0,n=0,r=o.length-1,l=this.parts,[d,c]=ya(o,e);if(this.el=h.createElement(d,t),Be.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=Be.nextNode())!==null&&l.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(ms)){let v=c[n++],$=s.getAttribute(g).split(Te),T=/([.?@])?(.*)/.exec(v);l.push({type:1,index:a,name:T[2],strings:$,ctor:T[1]==="."?Ot:T[1]==="?"?Ft:T[1]==="@"?Ut:Ue}),s.removeAttribute(g)}else g.startsWith(Te)&&(l.push({type:6,index:a}),s.removeAttribute(g));if(va.test(s.tagName)){let g=s.textContent.split(Te),v=g.length-1;if(v>0){s.textContent=Nt?Nt.emptyScript:"";for(let $=0;$<v;$++)s.append(g[$],bt()),Be.nextNode(),l.push({type:2,index:++a});s.append(g[v],bt())}}}else if(s.nodeType===8)if(s.data===gs)l.push({type:2,index:a});else{let g=-1;for(;(g=s.data.indexOf(Te,g+1))!==-1;)l.push({type:7,index:a}),g+=Te.length-1}a++}}static createElement(o,e){let t=Oe.createElement("template");return t.innerHTML=o,t}};function Fe(h,o,e=h,t){if(o===ze)return o;let s=t!==void 0?e._$Co?.[t]:e._$Cl,a=yt(o)?void 0:o._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(h),s._$AT(h,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(o=Fe(h,s._$AS(h,o.values),s,t)),o}var Bt=class{constructor(o,e){this._$AV=[],this._$AN=void 0,this._$AD=o,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(o){let{el:{content:e},parts:t}=this._$AD,s=(o?.creationScope??Oe).importNode(e,!0);Be.currentNode=s;let a=Be.nextNode(),n=0,r=0,l=t[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new st(a,a.nextSibling,this,o):l.type===1?d=new l.ctor(a,l.name,l.strings,this,o):l.type===6&&(d=new Gt(a,this,o)),this._$AV.push(d),l=t[++r]}n!==l?.index&&(a=Be.nextNode(),n++)}return Be.currentNode=Oe,s}p(o){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(o,t,e),e+=t.strings.length-2):t._$AI(o[e])),e++}},st=class h{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(o,e,t,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=o,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let o=this._$AA.parentNode,e=this._$AM;return e!==void 0&&o?.nodeType===11&&(o=e.parentNode),o}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(o,e=this){o=Fe(this,o,e),yt(o)?o===u||o==null||o===""?(this._$AH!==u&&this._$AR(),this._$AH=u):o!==this._$AH&&o!==ze&&this._(o):o._$litType$!==void 0?this.$(o):o.nodeType!==void 0?this.T(o):fa(o)?this.k(o):this._(o)}O(o){return this._$AA.parentNode.insertBefore(o,this._$AB)}T(o){this._$AH!==o&&(this._$AR(),this._$AH=this.O(o))}_(o){this._$AH!==u&&yt(this._$AH)?this._$AA.nextSibling.data=o:this.T(Oe.createTextNode(o)),this._$AH=o}$(o){let{values:e,_$litType$:t}=o,s=typeof t=="number"?this._$AC(o):(t.el===void 0&&(t.el=$t.createElement(ba(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let a=new Bt(s,this),n=a.u(this.options);a.p(e),this.T(n),this._$AH=a}}_$AC(o){let e=ga.get(o.strings);return e===void 0&&ga.set(o.strings,e=new $t(o)),e}k(o){fs(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let a of o)s===e.length?e.push(t=new h(this.O(bt()),this.O(bt()),this,this.options)):t=e[s],t._$AI(a),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(o=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);o!==this._$AB;){let t=da(o).nextSibling;da(o).remove(),o=t}}setConnected(o){this._$AM===void 0&&(this._$Cv=o,this._$AP?.(o))}},Ue=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(o,e,t,s,a){this.type=1,this._$AH=u,this._$AN=void 0,this.element=o,this.name=e,this._$AM=s,this.options=a,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=u}_$AI(o,e=this,t,s){let a=this.strings,n=!1;if(a===void 0)o=Fe(this,o,e,0),n=!yt(o)||o!==this._$AH&&o!==ze,n&&(this._$AH=o);else{let r=o,l,d;for(o=a[0],l=0;l<a.length-1;l++)d=Fe(this,r[t+l],e,l),d===ze&&(d=this._$AH[l]),n||=!yt(d)||d!==this._$AH[l],d===u?o=u:o!==u&&(o+=(d??"")+a[l+1]),this._$AH[l]=d}n&&!s&&this.j(o)}j(o){o===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,o??"")}},Ot=class extends Ue{constructor(){super(...arguments),this.type=3}j(o){this.element[this.name]=o===u?void 0:o}},Ft=class extends Ue{constructor(){super(...arguments),this.type=4}j(o){this.element.toggleAttribute(this.name,!!o&&o!==u)}},Ut=class extends Ue{constructor(o,e,t,s,a){super(o,e,t,s,a),this.type=5}_$AI(o,e=this){if((o=Fe(this,o,e,0)??u)===ze)return;let t=this._$AH,s=o===u&&t!==u||o.capture!==t.capture||o.once!==t.once||o.passive!==t.passive,a=o!==u&&(t===u||s);s&&this.element.removeEventListener(this.name,this,t),a&&this.element.addEventListener(this.name,this,o),this._$AH=o}handleEvent(o){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,o):this._$AH.handleEvent(o)}},Gt=class{constructor(o,e,t){this.element=o,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(o){Fe(this,o)}},$a={M:ms,P:Te,A:gs,C:1,L:ya,R:Bt,D:fa,V:Fe,I:st,H:Ue,N:Ft,U:Ut,B:Ot,F:Gt},Hn=us.litHtmlPolyfillSupport;Hn?.($t,st),(us.litHtmlVersions??=[]).push("3.3.3");var wa=(h,o,e)=>{let t=e?.renderBefore??o,s=t._$litPart$;if(s===void 0){let a=e?.renderBefore??null;t._$litPart$=s=new st(o.insertBefore(bt(),a),a,void 0,e??{})}return s._$AI(h),s};var bs=globalThis,E=class extends Ee{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let o=super.createRenderRoot();return this.renderOptions.renderBefore??=o.firstChild,o}update(o){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(o),this._$Do=wa(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ze}};E._$litElement$=!0,E.finalized=!0,bs.litElementHydrateSupport?.({LitElement:E});var Dn=bs.litElementPolyfillSupport;Dn?.({LitElement:E});(bs.litElementVersions??=[]).push("4.2.2");var _a={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},nt=h=>(...o)=>({_$litDirective$:h,values:o}),at=class{constructor(o){}get _$AU(){return this._$AM._$AU}_$AT(o,e,t){this._$Ct=o,this._$AM=e,this._$Ci=t}_$AS(o,e){return this.update(o,e)}update(o,e){return this.render(...e)}};var{I:dr}=$a;var Nn={},ka=(h,o=Nn)=>h._$AH=o;var xa=nt(class extends at{constructor(){super(...arguments),this.key=u}render(h,o){return this.key=h,o}update(h,[o,e]){return o!==this.key&&(ka(h),this.key=o),e}});var z=h=>(o,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(h,o)}):customElements.define(h,o)};var Bn={attribute:!0,type:String,converter:ft,reflect:!1,hasChanged:Dt},On=(h=Bn,o,e)=>{let{kind:t,metadata:s}=e,a=globalThis.litPropertyMetadata.get(s);if(a===void 0&&globalThis.litPropertyMetadata.set(s,a=new Map),t==="setter"&&((h=Object.create(h)).wrapped=!0),a.set(e.name,h),t==="accessor"){let{name:n}=e;return{set(r){let l=o.get.call(this);o.set.call(this,r),this.requestUpdate(n,l,h,!0,r)},init(r){return r!==void 0&&this.C(n,void 0,h,r),r}}}if(t==="setter"){let{name:n}=e;return function(r){let l=this[n];o.call(this,r),this.requestUpdate(n,l,h,!0,r)}}throw Error("Unsupported decorator location: "+t)};function m(h){return(o,e)=>typeof e=="object"?On(h,o,e):((t,s,a)=>{let n=s.hasOwnProperty(a);return s.constructor.createProperty(a,t),n?Object.getOwnPropertyDescriptor(s,a):void 0})(h,o,e)}function f(h){return m({...h,state:!0,attribute:!1})}var Ge=(h,o,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof o!="object"&&Object.defineProperty(h,o,e),e);function Pe(h,o){return(e,t,s)=>{let a=n=>n.renderRoot?.querySelector(h)??null;if(o){let{get:n,set:r}=typeof t=="object"?e:s??(()=>{let l=Symbol();return{get(){return this[l]},set(d){this[l]=d}}})();return Ge(e,t,{get(){let l=n.call(this);return l===void 0&&(l=a(this),(l!==null||this.hasUpdated)&&r.call(this,l)),l}})}return Ge(e,t,{get(){return a(this)}})}}var qt="garden_manager",wt=class{constructor(o){this.hass=o;this.gardenId=""}setHass(o){this.hass=o}call(o,e={}){let t=this.gardenId?{garden_id:this.gardenId}:{};return this.hass.connection.sendMessagePromise({type:`${qt}/${o}`,...t,...e})}subscribe(o){return this.hass.connection.subscribeMessage(o,{type:`${qt}/subscribe`,...this.gardenId?{garden_id:this.gardenId}:{}})}plants(){return this.call("plants")}savePlant(o,e){return this.call("plants/save",{plant:o,mode:e})}deletePlant(o){return this.call("plants/delete",{plant_id:o})}plantWindows(o,e,t){return this.call("plants/windows",{plant_id:o,zone_id:e??null,season:t??null})}savePlan(o,e,t){return this.call("plan/save",{...o,base_revision:e,...t!=null?{season:t}:{}})}yearPreview(o){return this.call("year/preview",o!=null?{from_season:o}:{})}yearApply(o){return this.call("year/apply",o)}deleteLayout(o){return this.call("layout/delete",{season:o})}syslog(o={}){return this.call("syslog/list",o)}undo(o,e=!1){return this.call("syslog/undo",{entry_id:o,force:e})}checkBed(o,e){return this.call("plan/check",{bed:o,plantings:e})}succession(o,e,t,s){return this.call("plan/succession",{planting:o,count:e,interval_days:t,placement:s})}exportPlan(o,e=!1){return this.call("plan/export",{format:o,include_tasks:e})}importPlan(o,e){return this.call("plan/import",{content:o,mode:e})}addTask(o){return this.call("tasks/add",o)}taskAction(o,e,t={}){return this.call("tasks/action",{task_id:o,action:e,...t})}saveSettings(o){return this.call("settings/save",{settings:o})}autofill(o){return this.call("plan/autofill",o)}autofillApply(o,e,t,s){return this.call("plan/autofill/apply",{plantings:o,replace_beds:e,base_revision:t,...s!=null?{plan_from:s}:{}})}newPlan(o,e,t){return this.call("plan/new",{season:o,start:e,...t?{old_name:t}:{}})}activatePlan(o,e){return this.call("plan/activate",{plan_id:o,...e?{old_name:e}:{}})}deletePlan(o){return this.call("plan/delete",{plan_id:o})}plantingsSeason(o){return this.call("plantings/season",{season:o})}updatePlanting(o,e){return this.call("planting/update",{planting_id:o,changes:e})}updatePlantings(o,e){return this.call("plantings/update_many",{planting_ids:o,changes:e})}fixIssue(o){return this.call("analysis/fix",{code:o.code,params:o.params,refs:o.refs})}comparePlans(o,e){return this.call("plan/compare",{a:o,b:e})}seasonReport(o){return this.call("report/season",{season:o})}planning(o){return this.call("planning",{season:o})}stillPossible(o){return this.call("analysis/still_possible",{season:o})}analysis(){return this.call("analysis")}explain(o,e,t=!0){return this.call("analysis/explain",{plant_id:o,season:e??null,match_zone:t})}todoLists(){return Object.values(this.hass.states).filter(o=>o.entity_id.startsWith("todo.")&&!o.entity_id.startsWith("todo.hortulus")).map(o=>({entity_id:o.entity_id,name:String(o.attributes.friendly_name??o.entity_id)})).sort((o,e)=>o.name.localeCompare(e.name))}seedsToTodo(o,e){return this.call("seeds/to_todo",{season:o,entity_id:e})}printPreview(o){return this.call("print/render",{options:o})}async printPdf(o){let e=new URLSearchParams;this.gardenId&&e.set("garden_id",this.gardenId);for(let[n,r]of Object.entries(o))r==null||r===""||e.set(n,Array.isArray(r)?r.join(","):String(r));let t=await this.hass.fetchWithAuth(`/api/${qt}/print?${e.toString()}`);if(!t.ok)throw new Error(`${t.status} ${await t.text()}`);let s=t.headers.get("Content-Disposition")??"",a=/filename="([^"]+)"/.exec(s)?.[1]??"hortulus.pdf";return{blob:await t.blob(),filename:a}}exportPdfToConfig(o){return this.hass.callService(qt,"export_pdf",{...o,...this.gardenId?{garden:this.gardenId}:{}})}handbookIndex(o){return this.call("handbook/index",o?{lang:o}:{})}handbookChapter(o,e){return this.call("handbook/chapter",{chapter_id:o,...e?{lang:e}:{}})}handbookSearch(o,e){return this.call("handbook/search",{query:o,...e?{lang:e}:{}})}irrigationPlan(){return this.call("irrigation/plan")}irrigationRun(o,e){return this.call("irrigation/run",{...o?{bed_ids:o}:{},...e?{amount_mm:e}:{}})}irrigationStop(){return this.call("irrigation/stop")}irrigationTest(o,e=5,t=!0){return this.call("irrigation/test",{entity_id:o,seconds:e,with_pump:t})}irrigationClose(o){return this.call("irrigation/close",{entity_id:o})}async history(o,e,t=new Date){return o.length?this.hass.connection.sendMessagePromise({type:"history/history_during_period",start_time:e.toISOString(),end_time:t.toISOString(),entity_ids:o,minimal_response:!0,no_attributes:!0,significant_changes_only:!1}):{}}advice(){return this.call("advice")}qaOptions(){return this.call("qa/options")}qaAsk(o,e,t){return this.call("qa/ask",{subject:o,problem:e,target:t})}supplies(){return this.call("supplies")}records(){return this.call("records/overview")}logHarvest(o){return this.call("records/harvest/add",o)}deleteRecord(o,e){return this.call("records/delete",{kind:o,record_id:e})}saveJournal(o){return this.call("records/journal/save",{entry:o})}saveSeed(o){return this.call("records/seeds/save",{packet:o})}saveSoilTest(o,e){return this.call("records/soil/save",{bed_id:o,test:e})}deleteSoilTest(o,e){return this.call("records/soil/delete",{bed_id:o,date:e})}async uploadPhoto(o){let e=new FormData;e.append("file",o);let t=await this.hass.fetchWithAuth("/api/image/upload",{method:"POST",body:e});if(!t.ok)throw new Error(`Upload failed (${t.status})`);return(await t.json()).id}},ve=(h,o="256x256")=>h.startsWith("http")||h.startsWith("/")?h:`/api/image/serve/${h}/${o}`;var ys=(h=32)=>b`
  <svg width=${h} height=${h} viewBox="0 0 64 64" role="img" aria-label="Hortulus" xmlns="http://www.w3.org/2000/svg">
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
  </svg>`;var $s={"app.name":"Hortulus","app.tagline":"Your vegetable garden, planned and cared for","nav.dashboard":"Today","nav.planner":"Planner","nav.library":"Plants","nav.calendar":"Calendar","nav.settings":"Settings","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.previous":"Previous","common.next":"Next","lib.in_garden":"In your garden","common.close":"Close","common.add":"Add","common.edit":"Edit","common.none":"None","common.loading":"Loading your garden\u2026","common.not_loaded":"Hortulus is not set up yet. Add the integration under Settings \u2192 Devices & services.","common.minutes":"{n} min","common.days":"{n} days","common.cm":"{n} cm","common.today":"Today","common.tomorrow":"Tomorrow","common.yesterday":"Yesterday","common.overdue":"Overdue","common.unknown":"Unknown","common.search":"Search","common.all":"All","common.season":"Season {year}","common.admin_only":"Only administrators can change the plan.","common.saved":"Saved","common.saving":"Saving\u2026","common.unsaved":"Unsaved changes","common.conflict":"Changed elsewhere - reloaded","common.error":"Something went wrong: {message}","dash.greeting_morning":"Good morning","dash.greeting_afternoon":"Good afternoon","dash.greeting_evening":"Good evening","dash.stat_tasks":"tasks today","dash.stat_work":"work today","dash.stat_gdd":"degree days","dash.lede.spring":"The soil is warming and everything wants to grow. A good day to sow, prick out and see what comes up.","dash.lede.summer":"The garden is in full swing. Harvest, water and enjoy the long evenings.","dash.lede.autumn":"The harvest goes on and the garden turns golden. Time to store, tidy up and look ahead.","dash.lede.winter":"The garden rests, the gardener dreams. Time to plan a new season.","photos.timeline":"Photo timeline","photos.day":"Day {n}","photos.prev":"Previous photo","photos.next":"Next photo","photos.yours":"Your photos","quick.title":"Quick harvest","quick.hint":"Tap a crop, add up the weight, save","quick.none":"Nothing is ready to harvest right now.","quick.save":"Save harvest","quick.reset":"Reset","quick.saved":"{kg} kg of {plant} recorded. Enjoy!","app.garden":"Garden","nav.weather":"Weather","nav.group.garden":"Garden","nav.group.knowledge":"Knowledge","nav.group.manage":"Manage","weather.title":"Weather","weather.now":"Now","weather.hours":"The next 24 hours","weather.days":"The coming days","weather.garden":"What it means for the garden","weather.radar":"Rain radar","weather.humidity":"Humidity","weather.wind":"Wind","weather.pressure":"Pressure","weather.rain_today":"Rain today","weather.no_entity":"Choose a weather entity under Settings \u203A Weather & outdoor sensors to see the forecast.","weather.no_hourly":"This weather service has no hourly forecast.","weather.no_daily":"This weather service has no daily forecast.","weather.radar_none":"Add a radar camera in Home Assistant (e.g. the Buienradar integration) to see the rain map here.","weather.radar_failed":"The radar map could not be loaded. Try again later.","weather.radar_source":"Source: {source}, refreshed every 5 minutes","weather.tag.frost":"frost","weather.tag.heat":"heat","weather.hint.frost_title":"Frost ahead ({n} nights)","weather.hint.frost":"The coldest night is {day}, around {t} \xB0C. Cover tender crops and bring young plants inside.","weather.hint.heat_title":"Hot days ({n})","weather.hint.heat":"{day} reaches {t} \xB0C. Water in the morning, shade the greenhouse and ventilate well.","weather.hint.rain_title":"{mm} mm of rain in the next three days","weather.hint.rain":"Watering can wait; Hortulus skips irrigation when enough rain falls.","weather.hint.dry_title":"A dry spell","weather.hint.dry":"Hardly any rain in the next five days. Mulch holds moisture; water deeply once rather than a little every day.","weather.hint.beds_title":"{n} beds need water now","weather.hint.beds":"See Today for the amount per bed, or let Hortulus drive the valves.","weather.hint.none":"Calm garden weather: no frost, heat or heavy rain ahead.","weather.cond.sunny":"Sunny","weather.cond.clear-night":"Clear night","weather.cond.partlycloudy":"Partly cloudy","weather.cond.cloudy":"Cloudy","weather.cond.rainy":"Rain","weather.cond.pouring":"Pouring","weather.cond.lightning":"Thunder","weather.cond.lightning-rainy":"Thunder and rain","weather.cond.snowy":"Snow","weather.cond.snowy-rainy":"Sleet","weather.cond.hail":"Hail","weather.cond.fog":"Fog","weather.cond.windy":"Windy","weather.cond.windy-variant":"Windy and cloudy","weather.cond.exceptional":"Exceptional weather","weather.cond.unknown":"Unknown","weather.hint.frost_title_one":"Frost ahead (one night)","weather.hint.heat_title_one":"A hot day","weather.hint.beds_title_one":"One bed needs water now","settings.theme":"Colour theme","theme.classic":"Classic green","theme.classic.hint":"Leaf green and marigold","theme.earth":"Earth","theme.earth.hint":"Warm terracotta and clay","theme.night":"Night","theme.night.hint":"Always dark, moonlit mint","theme.season":"Season","theme.season.hint":"Follows the year: spring, summer, autumn, winter","harvest.years_title":"Harvest over the years","harvest.years_few":"After a second harvest year you will see here how the years compare.","harvest.best_year":"best: {year}","harvest.legend_best":"best year","harvest.legend_other":"other years","wall.open":"Wall screen","wall.exit":"Close","wall.late":"overdue since {date}","wall.watering":"{bed} is being watered","crops.view.timeline":"Timeline","gantt.nursery":"raising","gantt.grow":"growing","gantt.harvest":"harvest","gantt.drag":"drag to move","gantt.hint":"Drag a planned crop sideways to move its sowing and planting out.","dash.today_tasks":"Today's tasks","dash.no_tasks":"Nothing to do today. Enjoy the garden!","dash.show_all":"Show all {n} tasks in the calendar","dash.total_time":"About {minutes} min of work","dash.beds":"Beds","dash.weather":"Next 48 hours","dash.greenhouse":"Greenhouse","dash.coming_up":"Coming up","dash.gdd":"Growing degree days","dash.gdd_since":"since {date}","dash.frost_risk":"Frost risk","dash.min_temp":"Lowest {temp} \xB0C","dash.rain":"Rain {mm} mm","dash.inside":"Inside {temp} \xB0C","dash.limits":"Crops tolerate {min}\u2013{max} \xB0C","dash.no_sensor":"No sensor","dash.active_crops":"{n} crops in the ground","dash.forecast_missing":"No forecast - advice is less precise.","planner.season":"Season","planner.undo":"Undo","planner.redo":"Redo","planner.snap":"Snap to grid","planner.zoom_in":"Zoom in","planner.zoom_out":"Zoom out","planner.fit":"Fit to screen","planner.add_bed":"Add bed","planner.add_zone":"Add zone","planner.overlay_companions":"Companions","planner.overlay_moisture":"Moisture","planner.overlay_temperature":"Temperature","planner.view_date":"Show garden on","planner.palette":"Plants","planner.palette_hint":"Drag a plant onto a bed, or press Enter to add it to the selected bed.","planner.layout":"Layout","planner.layout.single":"Single","planner.layout.block":"Block","planner.layout.row":"Row","planner.inspector":"Details","planner.nothing_selected":"Select a bed or planting to see details. Press ? for keyboard shortcuts.","planner.method":"Method","planner.method.indoor_sow":"Sow indoors, plant out","planner.method.direct_sow":"Sow in place","planner.method.transplant":"Plant (bought plants / sets)","planner.status":"Status","planner.count":"{n} plants","planner.timeline":"Timeline","planner.succession":"Succession sowing","planner.succession_count":"Number of sowings","planner.succession_interval":"Every (days)","planner.succession_placement":"Placement","planner.succession.split":"Split the area in strips","planner.succession.stack":"Same spot, one after another","planner.succession_create":"Create sowings","planner.succession_dropped":"{n} sowings fell outside the sowing window and were skipped.","planner.duplicate":"Duplicate","planner.remove":"Remove","planner.bed_name":"Name","planner.zone":"Zone","planner.kind":"Type","planner.width":"Width (cm)","planner.length":"Length (cm)","planner.orientation":"Row direction (\xB0)","planner.soil":"Soil","planner.shade":"Shade (%)","planner.wind":"Wind","planner.score":"Companion score","planner.warnings":"Warnings","planner.no_warnings":"No conflicts - nice combination!","planner.out_of_bounds":"Partly outside the bed.","planner.placed":"{plant} placed in {bed}.","planner.moved":"{name} moved.","planner.removed":"{name} removed.","planner.no_bed_here":"Drop plants onto a bed.","planner.export_json":"Export JSON","planner.export_yaml":"Export YAML","planner.import":"Import plan","planner.import_mode":"Import mode","planner.import_merge":"Merge with current plan","planner.import_replace":"Replace current plan","planner.imported":"Imported: {beds} beds, {plantings} plantings.","planner.shortcuts":"Keyboard shortcuts","planner.legend":"Plant families","planner.new_bed":"New bed","planner.new_zone":"New zone","shortcut.move":"Move selection (Shift = 10\xD7)","shortcut.undo":"Undo","shortcut.redo":"Redo","shortcut.delete":"Remove selection","shortcut.duplicate":"Duplicate selection","shortcut.grid":"Toggle snap-to-grid","shortcut.companions":"Toggle companion overlay","shortcut.moisture":"Toggle moisture overlay","shortcut.zoom":"Zoom in / out","shortcut.escape":"Clear selection","shortcut.cycle":"Select next / previous item","shortcut.help":"Show this help","lib.title":"Plant library","lib.search":"Search by name, latin name or family","lib.family":"Family","lib.filter_greenhouse":"Greenhouse","lib.filter_quick":"Quick crops","lib.filter_custom":"My plants","lib.add_custom":"New plant","lib.customize":"Customize","lib.reset":"Reset to built-in","lib.spacing":"Spacing","lib.row_spacing":"Row spacing","lib.depth":"Sowing depth","lib.germination":"Germination","lib.maturity":"Days to maturity","lib.soil_temp":"Min. soil temperature","lib.frost":"Frost tolerance","lib.min_temp":"Minimum temperature","lib.greenhouse":"Greenhouse","lib.water":"Water","lib.nutrients":"Nutrients","lib.rotation":"Rotation","lib.rotation_years":"{n} years before the same family returns","lib.open_plant":"Show this plant","lib.friends":"Good companions","lib.enemies":"Keep apart from","lib.pests":"Pests","lib.diseases":"Diseases","lib.care":"Care","lib.calendar":"Sowing calendar","lib.indoor_sow":"Sow indoors","lib.direct_sow":"Sow outdoors","lib.transplant":"Plant out","lib.harvest":"Harvest","lib.source.builtin":"Built-in","lib.source.custom":"Custom","lib.source.override":"Customized","lib.id":"Identifier","lib.name_en":"Name (English)","lib.name_nl":"Name (Dutch)","lib.scientific":"Scientific name","lib.variety":"Variety","lib.habit":"Growth habit","lib.windows_hint":"Weeks relative to the average last spring frost (negative = before).","lib.weeks":"weeks","lib.from":"from","lib.to":"to","lib.saved":"{plant} saved.","cal.month":"Month","cal.week":"Week","cal.list":"List","cal.prev":"Previous","cal.next":"Next","cal.show_done":"Show completed","cal.add_task":"New task","cal.all_beds":"All beds","task.complete":"Done","task.skip":"Skip","task.reopen":"Reopen","task.postpone":"Postpone","task.postpone_1":"+1 day","task.postpone_3":"+3 days","task.postpone_7":"+1 week","task.postpone_to":"Move to date","task.note":"Note","task.notes":"Notes","task.photos":"Photos","task.add_photo":"Add photo","task.priority":"Priority","task.duration":"Duration (min)","task.due":"Due","task.window":"Window {start} \u2013 {end}","task.repeat":"Repeats every {n} days","task.repeat_days":"Repeat every (days, optional)","task.title":"Title","task.type":"Type","task.bed":"Bed","task.description":"Description","task.shifted":"{n} dependent tasks moved along.","task.beyond_window":"Careful: the new date is after the ideal window.","task.completed":"Nice work! {title} done.","task.source.generated":"From your plan","task.source.sensor":"From sensors","task.source.weather":"From the forecast","task.source.user":"Added by you","settings.region":"Climate & region","settings.hemisphere":"Hemisphere","settings.hemisphere.north":"Northern","settings.hemisphere.south":"Southern","settings.mode":"Profile","settings.mode.preset":"Regional preset","settings.mode.usda":"USDA hardiness zone","settings.mode.custom":"Custom frost dates","settings.preset":"Region","settings.zone":"Hardiness zone","settings.last_frost":"Last spring frost (MM-DD)","settings.first_frost":"First autumn frost (MM-DD)","settings.frost_dates_now":"This season: last frost {last}, first frost {first}.","settings.weather":"Weather & outdoor sensors","settings.weather_entity":"Weather entity","settings.outdoor_temp":"Outdoor temperature","settings.rain":"Rain sensor","settings.zones":"Zones & microclimates","settings.beds":"Beds & sensors","settings.zone_type.outdoor":"Outdoor","settings.zone_type.greenhouse":"Greenhouse","settings.zone_type.cold_frame":"Cold frame","settings.heated":"Heated","settings.min_heating":"Heating keeps above (\xB0C)","settings.sensors":"Sensors","settings.sensor.soil_moisture":"Soil moisture","settings.sensor.soil_temperature":"Soil temperature","settings.sensor.air_temperature":"Air temperature","settings.sensor.air_humidity":"Air humidity","settings.sensor.light":"Light","settings.sensor.rain":"Rain","settings.irrigation":"Irrigation switch/valve","settings.flow":"Flow (L/min)","settings.vent":"Vent / window opener","settings.notifications":"Notifications","settings.persistent":"Persistent notifications","settings.notify_services":"Push notifications (comma separated notify services)","settings.tts":"Text-to-speech entity","settings.tts_players":"Speakers (comma separated)","settings.digest":"Daily digest at","settings.frost_alerts":"Frost alerts","settings.heat_alerts":"Heat alerts","settings.tts_frost":"Announce frost on speakers","settings.general":"General","settings.language":"Language","settings.language.auto":"Follow Home Assistant","settings.units":"Units","settings.units_metric":"Metric (cm, \xB0C, mm, L)","settings.snap":"Grid size (cm)","settings.radius":"Companion radius (cm)","settings.data":"Import & export","settings.saved":"Settings saved.","type.sow_indoor":"Sow indoors","type.sow_direct":"Sow outdoors","type.harden_off":"Harden off","type.transplant":"Plant out","type.thin":"Thin","type.stake":"Support","type.prune":"Prune","type.pinch":"Pinch","type.earth_up":"Earth up","type.feed":"Feed","type.water":"Water","type.weed":"Weed","type.pest_check":"Pest check","type.harvest":"Harvest","type.ventilate":"Ventilate","type.shade":"Shade","type.frost_protect":"Frost protection","type.custom":"Task","priority.low":"Low","priority.normal":"Normal","priority.high":"High","priority.urgent":"Urgent","status.planned":"Planned","status.sown_indoors":"Sown indoors","status.sown":"Sown","status.transplanted":"Planted out","status.harvesting":"Harvesting","status.finished":"Finished","status.failed":"Failed","risk.none":"none","risk.low":"low","risk.moderate":"moderate","risk.high":"high","risk.unknown":"unknown","moisture.dry":"Dry","moisture.slightly_dry":"Slightly dry","moisture.optimal":"Optimal","moisture.wet":"Wet","moisture.unknown":"No data","irrigation.none":"No water needed","irrigation.water":"Water {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Skip - rain expected","irrigation.check_manually":"Check by hand (~{mm} mm)","gh.none":"All good","gh.ventilate":"Ventilate","gh.shade":"Shade now","gh.close_up":"Close before night","gh.heat":"Turn on heating","level.low":"Low","level.medium":"Medium","level.high":"High","suit.yes":"Suitable","suit.no":"Not suitable","suit.conditional":"Possible","frost.tender":"Tender","frost.half_hardy":"Half hardy","frost.hardy":"Hardy","frost.very_hardy":"Very hardy","kind.in_ground":"In-ground bed","kind.raised":"Raised bed","kind.container":"Container","soil.sandy":"Sandy","soil.loam":"Loam","soil.clay":"Clay","soil.silt":"Silt","soil.peat":"Peat","soil.chalk":"Chalk","soil.potting_mix":"Potting mix","wind.sheltered":"Sheltered","wind.moderate":"Moderate","wind.exposed":"Exposed","habit.bush":"Bush","habit.vine":"Vine","habit.climbing":"Climbing","habit.upright":"Upright","habit.rosette":"Rosette","habit.root":"Root crop","habit.bulb":"Bulb","reason.soil_too_cold":"Soil is {soil} \xB0C; {plant} needs {min} \xB0C to germinate.","reason.soil_too_hot":"Soil is {soil} \xB0C; above {max} \xB0C {plant} germinates poorly.","reason.frost_forecast":"Frost ({temp} \xB0C) forecast before {date}; {plant} is frost tender.","reason.window_open":"Window is open.","reason.window_not_yet":"Window opens {date}.","reason.window_closed":"Window closed on {date}.","reason.not_greenhouse_suitable":"{plant} is not suited to a greenhouse.","compat.friend":"{a} and {b} are good companions: {reason}","compat.enemy":"{a} and {b} should not be planted together: {reason}","compat.overlap":"{a} and {b} overlap - not enough space.","compat.rotation":"{family} grew in {bed} in {season}; wait {years} years.","compat.same_family_adjacent":"{a} and {b} share a family and its pests.","alert.frost":"Frost risk {level}: {temp} \xB0C expected {when}","alert.heat":"Heat stress in {zone}: {temp} \xB0C expected","alert.dry":"{bed} is dry ({moisture}%)","alert.sensor_stale":"Sensor {entity} has not reported for a while","alert.forecast_unavailable":"Weather forecast unavailable","when.tonight":"tonight","when.tomorrow_night":"tomorrow night","nav.handbook":"Handbook","nav.print":"Print","type.soil_prep":"Prepare soil","type.compost":"Compost","type.green_manure":"Green manure","type.mulch":"Mulch","type.clean_greenhouse":"Clean greenhouse","type.winter_prep":"Winter preparation","type.plan_season":"Plan season","type.tool_care":"Tool care","type.soil_test":"Soil test","type.cut_back":"Cut back","type.divide":"Divide","type.protect":"Protect","type.clean":"Clean up","type.tie_in":"Tie in","type.thin_fruit":"Thin fruit","type.pollinate":"Pollinate","type.check":"Check","type.make_feed":"Make plant feed","category.vegetable":"Vegetables","category.herb":"Herbs","category.fruit":"Fruit","category.flower":"Flowers","feature.path":"Gravel path","feature.compost":"Compost heap / bin","feature.water_butt":"Water butt","feature.shed":"Shed","feature.tree":"Tree","feature.hedge":"Hedge","feature.trellis":"Trellis","feature.other":"Other","stage.not_planted":"Not planted","stage.establishing":"Establishing","stage.vegetative":"Growing","stage.flowering":"Flowering","stage.ripening":"Ripening","stage.harvest":"Harvest","stage.finished":"Finished","compat.deters":"{a} protects {b}: it deters {pests}.","compat.trap":"{a} lures {pests} away from {b} (trap crop).","compat.allelopathy":"{a} releases growth-inhibiting compounds - keep it away from {b}.","compat.competition":"{a} and {b} are both heavy feeders this close together - add extra compost or give more space.","compat.shading":"{a} (about {height} cm tall) will shade {b} - plant tall crops on the side away from the sun.","compat.shade_benefit":"{a} gives {b} welcome summer shade.","alert.disease":"Disease risk {level} in {zone}","alert.nutrients":"Nutrient balance in {bed}: {status}","autoplan.bed_not_empty":"{bed} already has crops this season - tick 'replace' to re-plan it.","autoplan.no_beds":"No empty beds to fill. Select beds and tick 'replace'.","autoplan.compost_short":"Needs about {need} kg compost, you have {have} kg.","autoplan.time_over":"About {need} min per week of work - more than the {have} min you have.","autoplan.wanted_missing":"No room for: {plants}.","autoplan.consider_irrigation":"About {liters} L of water in a dry summer week - drip irrigation or a water butt will save you time.","autofill.title":"Autofill","autofill.intro":"Proposes crops, amounts and positions for season {season} from your beds and resources. Nothing is changed until you apply it.","autofill.household":"People in the household","autofill.hours":"Hours per week","autofill.water":"Water per week (L)","autofill.compost":"Compost available (kg)","autofill.has_irrigation":"Drip irrigation / automatic watering available","autofill.goals":"Goals","autofill.wanted":"Must have","autofill.excluded":"Never","autofill.beds":"Beds","autofill.all_empty":"(all empty beds)","autofill.replace":"Replace this season's crops in the selected beds","autofill.propose":"Make a proposal","autofill.apply":"Apply to plan","autofill.applied":"{n} plantings added to the plan","autofill.skipped":"Not placed","autofill.sum_crops":"{n} crops","autofill.sum_yield":"\u2248 {kg} kg harvest","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in a peak week","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Fresh vegetables","autofill.goal.storage":"Storage crops","autofill.goal.herbs":"Herbs","autofill.goal.pollinators":"Pollinators","autofill.goal.winter":"Winter harvest","autofill.goal.perennials":"Perennials","autofill.goal.easy":"Low maintenance","autofill.reason.no_suitable_bed":"no suitable bed","autofill.reason.no_space":"no space","autofill.reason.time_budget":"time budget","autofill.reason.water_budget":"water budget","cal.timeline":"Timeline","cal.garden_work":"Garden work","cal.growing":"Growing","cal.harvest_estimate":"Harvest expected around {date}","cal.harvest_estimate_short":"Expected harvest (degree days)","cal.last_frost":"Last frost","cal.first_frost":"First frost","cal.frost_dates":"Frost dates","cal.no_plantings":"No crops planned this season.","ctx.title":"Right now","ctx.moisture":"Soil moisture","ctx.soil_temp":"Soil temperature","ctx.irrigation":"Watering","ctx.water_balance":"Water deficit","ctx.nutrients":"Nutrient balance","ctx.air_temp":"Air temperature","ctx.humidity":"Humidity","ctx.disease":"Disease risk","ctx.frost":"Frost risk","ctx.today":"Today","ctx.rain":"Rain today","ctx.et0":"Evaporation (ET\u2080)","dash.gdd_today":"Degree days today","dash.water_climate":"Water & climate","dash.irrigation_mode":"Irrigation","dash.watering_now":"Watering {bed}","dash.stop":"Stop","dash.beds_need_water":"Beds needing water","dash.water_now":"Water now","dash.safety_note":"Frost lockout, rain skip and max runtime always apply.","dash.disease_risk":"Disease risk","dash.nutrients":"Nutrients","dash.water_balance":"Water deficit","dash.irrigation_started":"Watering started ({min} min)","dash.irrigation_stopped":"Watering stopped","dash.irrigation_nothing":"Nothing to water right now","handbook.title":"Gardening handbook","handbook.intro":"Background to everything Hortulus advises: soil, sowing, watering, feeding, rotation, the greenhouse and the garden year.","handbook.contents":"Contents","handbook.overview":"Overview","handbook.glossary":"Glossary","handbook.search":"Search the handbook","handbook.results":"Results for \u201C{query}\u201D","handbook.no_results":"Nothing found.","handbook.read_more":"Read more in the handbook","lib.category":"Category","lib.count":"{n} plants","lib.perennial":"perennial","lib.height":"Height","lib.roots":"roots","lib.gdd":"Degree days to harvest","lib.base":"base","lib.per_person":"Plants per person \xB7 yield","lib.deters":"Deters","lib.trap_for":"Trap crop for","lib.allelopathic":"Inhibits neighbours","lib.shade_tolerant":"Tolerates shade","lib.plant":"Plant","planner.layer_zones":"Show zones","planner.layer_features":"Show paths & elements","planner.layer_plantings":"Show crops","planner.add_feature":"Element","planner.align.left":"Align left","planner.align.right":"Align right","planner.align.top":"Align top","planner.align.bottom":"Align bottom","planner.align.hcenter":"Centre horizontally","planner.align.vcenter":"Centre vertically","planner.align.hdistribute":"Distribute horizontally","planner.align.vdistribute":"Distribute vertically","planner.aligned":"{n} items aligned","planner.moved_n":"{n} items moved","planner.removed_n":"{n} items removed","planner.selected_n":"{n} selected","planner.multi_hint":"Shift- or Ctrl-click to select several beds or crops, then drag, align or distribute them.","planner.alternatives":"Fits in","planner.better_neighbours":"Better neighbours","planner.heat_stress":"{n} hot days ahead","print.options":"Print options","print.document":"Document","print.page":"Paper","print.orientation":"Orientation","print.portrait":"Portrait","print.landscape":"Landscape","print.colors":"Colours","print.beds":"Beds","print.days":"Days ahead","print.title":"Title","print.notes":"Notes area (dot grid)","print.grid":"10 cm grid on bed sheets","print.labels":"Crop names on the map","print.download":"Download PDF","print.refresh":"Refresh preview","print.save_config":"Save to /config/hortulus/exports","print.saved_to_config":"PDF saved (/config/hortulus/exports)","print.preview":"Preview","print.empty":"No preview yet.","print.page_n":"Page {n} of {total}","print.all_greenhouses":"All greenhouses","print.all_zones":"All zones","print.remarkable_hint":"reMarkable Paper Pro: 179.6 \xD7 239.5 mm, extra margin on the left for the toolbar. E-ink colours use light tints and patterns so your pen stays visible. Send the PDF with the reMarkable app or email.","print.doc.garden":"Garden map","print.doc.garden.hint":"Zones, beds, crops, legend","print.doc.zone":"Greenhouse / zone","print.doc.zone.hint":"One zone, zoomed in","print.doc.beds":"Bed sheets","print.doc.beds.hint":"A page per bed with grid","print.doc.tasks":"Checklist","print.doc.tasks.hint":"Open tasks per week","print.doc.season":"Season chart","print.doc.season.hint":"Sow \u2192 harvest timeline","print.doc.blank":"Planning sheet","print.doc.blank.hint":"Outlines to sketch on","print.doc.plants":"Plant cards","print.doc.book":"Season book","settings.flow_measured":"measured: {lpm} L/min","settings.valve_timer":"Valve timer (min)","settings.valve_timer_none":"no timer of its own","settings.leak_alerts":"Notify when the water meter counts while every valve is closed","settings.leak_hint":"With a water meter Hortulus also learns the real flow of each valve; it is used when you do not enter a flow yourself.","valve.leak":"The water meter counted {liters} L in {minutes} minutes while every valve is closed","valve.leak_hint":"A leak, or a tap left open? ({entity})","plan.to_buy":"To buy","plan.todo_list":"Shopping list","plan.todo_send":"Add {n} to the list","plan.todo_done":"{added} added, {skipped} were already on it.","plan.todo_none":"Create a to-do list in Home Assistant (e.g. Shopping list) to add missing seed in one click.","report.book":"Season book (PDF)","report.book_hint":"The whole season as a book to print: by month, with your journal, photos and harvest","print.doc.book.hint":"Your garden year as a book: by month, with journal, photos and harvest","print.book_tip":"A complete book with cover, contents, introduction, one chapter per month (sowing, planting, work, your journal with photos, harvest, water and weather), the year in numbers, glossary, colophon and back cover. Choose A5 and print double-sided (flip on the long edge); the page count is a multiple of four. The preview shows the first pages.","print.doc.plants.hint":"Key facts per crop","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Full colour","print.color.eink":"E-ink (light + patterns)","print.color.grayscale":"Grayscale","settings.irrigation_hw":"Irrigation hardware","settings.irrigation_mode":"Mode","settings.irrigation_mode.off":"Off","settings.irrigation_mode.advise":"Advise (tasks only)","settings.irrigation_mode.auto":"Automatic","settings.pump":"Pump (switch or valve)","settings.start_time":"Start time","settings.max_runtime":"Max runtime per valve (min)","settings.frost_lockout":"Frost lockout below (\xB0C)","settings.rain_skip":"Skip when rain forecast \u2265 (mm)","settings.pump_lead":"Pump stop before valve (s)","settings.irrigation_hint":"{n} beds have a valve. Set the flow (L/min) per bed under Beds.","settings.resources":"Resources (autofill)","settings.maintenance_tasks":"Seasonal garden tasks in the calendar (soil prep, greenhouse cleaning, winter rest ...)","settings.open_meteo":"Use Open-Meteo for humidity, wind and sunshine","settings.open_meteo_hint":"Optional and off by default: sends the garden's rounded coordinates to api.open-meteo.com. Improves the evaporation (Penman-Monteith) estimate.","settings.elevation":"Elevation (m)","settings.shade_entity":"Shade screen (cover or switch)","settings.climate_control":"Vent & shade control","settings.climate_control.off":"Off","settings.climate_control.advise":"Advise (tasks)","settings.climate_control.auto":"Automatic","settings.wall_heat":"Against a warm wall","settings.thermal_mass":"Thermal mass (water barrels, stone)","settings.sensor.par":"Light (PAR)","settings.sensor.leaf_wetness":"Leaf wetness","settings.sensor.ec":"Soil EC","settings.sensor.npk_n":"Nitrogen (N)","settings.sensor.npk_p":"Phosphorus (P)","settings.sensor.npk_k":"Potassium (K)","task.postponed":"{title} postponed by {n} day(s)","common.done":"Done","planner.removed_from":"{name} removed from season {season} on (history kept).","planner.steps":"Build your garden plan in three steps","planner.step.site":"Draw your site","planner.step.site.hint":"zones & elements","planner.step.zones":"Arrange zones","planner.step.zones.hint":"name, beds, own map","planner.step.plant":"Plant","planner.step.plant.hint":"by hand or by the system","planner.whole_garden":"Whole garden","planner.zone_map":"Zone map","planner.site_intro":"Pick a zone type or element, then drag a rectangle on the grid (squares of 10 \xD7 10 cm). A single click places a standard size. Double-click a zone to open its own map.","planner.zones":"Zones","planner.elements":"Paths, lawn, trees & more","planner.your_zones":"Your zones","planner.no_zones":"No zones yet - start with your vegetable garden, greenhouse or orchard.","planner.open_zone":"Open zone map","planner.next":"Next","planner.zones_intro":"Open a zone to give it a name and draw its beds on its own map. This plan holds for this season only; you carry it into next year with the year-end transition.","planner.n_beds":"{n} beds","planner.zone_name":"Zone name","planner.beds_in_zone":"Beds & elements in this zone","planner.draw_bed":"Bed","planner.fill_by_hand":"Fill in myself","planner.fill_by_system":"Let the system fill it","planner.bed_needs_zone":"Draw a bed inside a zone.","planner.draw_hint":"Drag on the grid to draw: {what}","planner.palette_for_zone":"Showing plants that suit {zone}. Pick a category to see everything.","planner.perennial":"perennial","planner.bears_after":"fruit after ~{n} yr","planner.perennial_since":"Perennial - in the ground since {season}. At the end of the year you carry it over to next year's plan explicitly (year-end transition).","planner.bearing_from":"First harvest expected from {season}.","planner.eco_tips":"Eco tips & home remedies","planner.remove_perennial":"Remove {name}?","planner.remove_perennial_intro":"{name} was planted in {season} and stays in your plan every year. What happened?","planner.remove_from_season":"It is gone from {season} on","planner.remove_from_season_hint":"Earlier years keep it (rotation history, harvests, notes).","planner.remove_everywhere":"Delete it completely","planner.remove_everywhere_hint":"As if it was never planted - also removed from earlier years.","planner.legend.perennial":"perennial (stays)","planner.legend.warning":"neighbour / rotation warning","planner.legend.succession":"succession sowing","planner.legend.rows":"rows of seedlings","planner.legend.border":"Border colour = plant family (for crop rotation); the icon shows the crop itself.","settings.zone_type.orchard":"Orchard","settings.zone_type.fruit":"Soft fruit","settings.zone_type.herbs":"Herb garden","settings.zone_type.flowers":"Flower garden","zone_hint.outdoor":"Vegetable garden: annual crops with rotation, beds and paths.","zone_hint.greenhouse":"Greenhouse: warm crops, climate control, ventilation and shading.","zone_hint.cold_frame":"Cold frame: hardening off, early and late salads.","zone_hint.orchard":"Orchard: fruit trees that stay for decades - prune, thin and harvest yearly.","zone_hint.fruit":"Soft fruit: berries, currants, grapes and kiwi berries.","zone_hint.herbs":"Herb garden: perennial and annual herbs, a bee magnet.","zone_hint.flowers":"Flower garden: pollinators, beneficial insects and cut flowers.","feature.terrace":"Terrace","feature.lawn":"Lawn","feature.flowerbed":"Flower bed","feature.fence":"Fence","feature.pond":"Pond","pollination.insects":"Needs insects for pollination - add flowers nearby.","pollination.wind":"Wind-pollinated - plant in blocks, not single rows.","pollination.partner":"Needs a pollination partner (second variety) nearby.","pollination.none":"No pollination needed (leaves, roots).","planner.more":"More","settings.reminders":"Reminders","settings.overdue_reminders":"Remind me of tasks left undone","settings.overdue_time":"Reminder time","settings.overdue_after":"Remind after (days late)","settings.weekly_plan":"Weekly look-ahead","settings.weekly_day":"Day","settings.weekly_time":"Time","settings.weather_aware":"Weather-aware scheduling","settings.weather_aware_hint":"Sowing, planting out, spraying, pruning and mulching move automatically to the best dry, frost-free, not-too-hot day inside their window.","feature.house":"House","feature.driveway":"Driveway","feature.street":"Street","feature.parking":"Parking","feature.play":"Play area","feature.beehive":"Beehive","autofill.prefs":"Preferences","autofill.freedom":"Freedom of choice","autofill.freedom.strict":"Only what I want","autofill.freedom.balanced":"My wishes + goals","autofill.freedom.free":"Free: surprise me","autofill.pref.respect_companions":"Respect plant neighbours","autofill.pref.add_pollinators":"Add flowers for pollinators","autofill.pref.year_round":"Aim for harvests all year","autofill.pref.allow_perennials":"Perennials allowed","autofill.pref.match_zone_type":"Respect zone type (orchard = fruit \u2026)","autofill.reason.pollinators":"pollinators","nav.advice":"Advice","task.tools":"You need","advice.ask_title":"Ask Hortulus","advice.i_have":"I have a","advice.mode.question":"question","advice.mode.problem":"problem","advice.about":"about","advice.subject":"Subject","advice.target":"Which one","advice.problem":"Question","advice.ask":"Ask","advice.in_garden":"In your garden","advice.all_plants":"All plants","advice.whole_garden":"the whole garden","advice.subject.plant":"a plant / vegetable / fruit","advice.subject.greenhouse":"my greenhouse","advice.subject.garden":"my garden","advice.subject.bed":"a bed","advice.subject.tools":"tools & supplies","advice.q.status":"How is it doing?","advice.q.what_to_do":"What should I do now?","advice.q.when_sow":"When to sow or plant?","advice.q.when_harvest":"When to harvest?","advice.q.growth":"it grows badly","advice.q.yellow_leaves":"yellow leaves","advice.q.wilting":"it wilts / droops","advice.q.no_fruit":"flowers but no fruit","advice.q.bolting":"it bolts (runs to seed)","advice.q.pests":"pests / bugs on it","advice.q.disease":"spots, mould or rot","advice.q.feeding":"How to feed it?","advice.q.watering":"How much water?","advice.q.pruning":"How to prune?","advice.q.companions":"What grows well next to it?","advice.q.too_hot":"it is too hot","advice.q.too_cold":"it is too cold","advice.q.winter_crops":"What can grow in winter?","advice.q.year_round":"How do I harvest all year?","advice.q.soil":"my soil is poor","advice.q.slugs":"slugs!","advice.q.frost":"frost is coming","advice.q.what_next":"What should go in next?","advice.q.for_task":"Which tools for this job?","advice.q.shopping":"What do I need to buy?","advice.sec.status":"Now in your garden","advice.sec.facts":"Good to know","advice.sec.causes":"Possible causes","advice.sec.actions":"What to do","advice.sec.remedies":"Eco & home remedies","advice.sec.prevention":"Prevent it next time","advice.sec.tasks":"Open tasks","advice.read_more":"Read more in the handbook","advice.suggestions":"Suggestions for your garden","advice.suggestions_intro":"Hortulus looks at placement, pollination, neighbours, year-round harvest, soil and ecology.","advice.none":"No suggestions - your plan looks great!","advice.apply_add":"Add to plan","advice.apply_open":"Show in planner","advice.dismiss":"Hide","advice.no_space":"No free space in {bed}.","advice.kind.pollination":"Pollination","advice.kind.neighbours":"Neighbours","advice.kind.placement":"Placement","advice.kind.year_round":"Year-round","advice.kind.soil":"Soil","advice.kind.eco":"Ecology","advice.kind.growth":"Growth","advice.kind.greenhouse":"Greenhouse","advice.coverage":"Harvest per month","advice.coverage_gaps":"Red months have nothing to harvest - the suggestions show what fills them.","advice.coverage_full":"Something to harvest every month.","advice.nothing":"nothing","advice.shopping":"Shopping list this season","advice.shopping_intro":"Worked out from your plan: seed, plants, compost, protection and support.","advice.nothing_to_buy":"Nothing to buy yet - plan some crops first.","advice.tools_per_task":"Tools per job","advice.read_tools":"Tools & DIY feeds","advice.cat.seeds":"Seed","advice.cat.plants":"Young plants","advice.cat.soil":"Soil & feeding","advice.cat.protection":"Protection","advice.cat.support":"Support & mulch","advice.cat.other":"Other","print.doc.year":"Year plan","print.doc.year.hint":"Month matrix: sow, plant, harvest","nav.journal":"Journal","task.assignee":"Assigned to","task.anyone":"anyone","task.harvested":"Harvested:","journal.diary":"Diary","journal.harvest":"Harvest","journal.seeds":"Seed box","journal.water":"Water","journal.new":"New diary entry","journal.text":"What did you see or do?","journal.placeholder":"First tomatoes ripening, aphids on the broad beans \u2026","journal.kind":"Kind","journal.kind.note":"Note","journal.kind.observation":"Observation","journal.kind.problem":"Problem","journal.kind.milestone":"Milestone","journal.link":"About","journal.whole_garden":"the whole garden","journal.beds":"Beds","journal.crops":"Crops this season","journal.add_photo":"Add photo","journal.save":"Save","journal.saved":"Saved in the diary.","journal.filter":"Filter","journal.all":"Everything","journal.empty":"No entries yet - note what you see: it is the best garden teacher.","journal.log_harvest":"Log a harvest","journal.what":"Crop","journal.kg":"Weight (kg)","journal.count":"Count","journal.day":"Date","journal.quality":"Quality","journal.learn_hint":"Hortulus learns your own yields per m\xB2 from this and uses them in Autofill and advice.","journal.harvest_saved":"Harvest saved.","journal.harvest_season":"Harvest {season}","journal.crops_n":"{n} crops","journal.yield":"your yield {kg} kg/m\xB2 (database {db})","journal.recent":"Latest entries","journal.no_harvest":"Nothing logged yet.","journal.add_seed":"Add seed packet","journal.variety":"Variety","journal.year":"Year","journal.quantity":"Quantity","journal.unit":"Unit","journal.unit.packet":"packet(s)","journal.unit.seeds":"seeds","journal.unit.g":"g","journal.source":"Source","journal.source_hint":"shop, swap, own seed \u2026","journal.seed_saved":"Seed packet saved.","journal.seed_missing":"Still needed for this season","journal.seed_hint":"Seed keeps 1-2 years (parsnip, onion) up to 5-6 years (cabbages, cucurbits). Old seed: do a germination test.","journal.seed_box":"Seed box","journal.status":"Status","journal.needed":"needed this season","journal.seed.ok":"good","journal.seed.use_soon":"use this year","journal.seed.expired":"old (test it)","journal.seed.empty":"empty","journal.seed.unknown":"year unknown","journal.no_seeds":"No seed packets yet.","journal.water_setup":"Link a water meter and/or a water-butt level sensor in Settings \u203A Water to follow your garden water.","journal.water_week":"Mains water, 7 days","journal.water_season":"Mains water this year","journal.rain_available":"Rain water available","journal.per_day":"Per day (last 14 days)","journal.water_hint":"Watering tasks mention how much rain water is left so you use it first.","cal.year":"Year","cal.tasks_per_month":"Tasks","cal.act.sow_indoor":"sow indoors","cal.act.sow":"sow","cal.act.plant":"plant out","cal.act.grow":"growing","cal.act.harvest":"harvest","cal.act_short.sow_indoor":"S","cal.act_short.sow":"S","cal.act_short.plant":"P","cal.act_short.harvest":"H","settings.water":"Water meter & rain butt","settings.water_meter":"Garden water meter (m\xB3 or L)","settings.butt_level":"Rain butt level (%)","settings.butt_capacity":"Total butt capacity (L)","settings.water_hint":"Hortulus stores one reading per day. You get water use per week, the rain water still available, and watering tasks say how much of it you can use first.","settings.household":"Household & voice","settings.nobody":"Nobody (unassigned)","settings.default_person":"Use the default","settings.no_persons":"No people found. Add people under Settings \u2192 People to assign tasks.","settings.assign_default":"New tasks go to","settings.assign_per_type":"Per task type","settings.person_notify":"Personal reminders","settings.person_notify_hint":"Each person gets their own tasks on this notify service (daily digest and overdue reminders).","settings.voice":"Voice (Assist)","settings.voice_hint":"Ask Assist \u201Cwhat do I need to do in the garden today?\u201D, \u201Chow much did I harvest?\u201D, \u201Cis there frost tonight?\u201D. Install the sentences once, then they work in English and Dutch.","settings.voice_install":"Install voice sentences","settings.voice_installed":"Voice sentences installed","soil_test.title":"Soil analysis","soil_test.none":"No soil analysis yet.","soil_test.add":"Add soil analysis","soil_test.om":"Organic matter (%)","soil_test.lime":"Lime status","soil_test.lime.low":"too low","soil_test.lime.ok":"fine","soil_test.lime.high":"high","soil_test.hint":"Lab report or home kit. Hortulus adjusts the fertiliser plan and lime advice of this bed to the latest analysis.","cal.hours":"{n} h","planner.other_season":"{name} (season {year})","journal.system":"System log","syslog.intro":"Every change in Hortulus is listed here: what you or someone else did in the panel, through automations, and what Hortulus adjusted itself (tasks, clean-up). Undo an entry to restore the state from before that action; the undo is logged as well, so it can be reverted too.","syslog.show_system":"Show automatic actions by Hortulus","syslog.empty":"Nothing logged yet.","syslog.by_system":"Hortulus (automatic)","syslog.by_unknown":"Automation or service","syslog.is_undone":"undone","syslog.undo":"Undo","syslog.undone":"Undone.","syslog.confirm":"Undo: {what}?","syslog.conflict":"{n} item(s) changed again since. Undo anyway? Those later changes will be lost.","syslog.blocked":"Cannot undo: this would refer to a bed, zone or plant that has been deleted since. Undo that later deletion first.","syslog.more":"Load older entries","syslog.and_more":"\u2026 and {n} more","syslog.n_changes":"{verb} \u2013 {n} items","syslog.op.add":"Added","syslog.op.remove":"Removed","syslog.op.change":"Changed","syslog.op.mixed":"Updated","syslog.reason.plan":"planner","syslog.reason.import":"import","syslog.reason.tasks":"tasks","syslog.reason.settings":"settings","syslog.reason.plants":"plant library","syslog.reason.records":"journal","syslog.reason.auto":"automatic","syslog.reason.undo":"Undo","syslog.col.zones":"Zone","syslog.col.beds":"Bed","syslog.col.plantings":"Crop","syslog.col.tasks":"Task","syslog.col.custom_plants":"Custom plant","syslog.col.features":"Garden feature","syslog.col.harvest_log":"Harvest","syslog.col.journal":"Diary note","syslog.col.seed_stock":"Seed stock","syslog.col.rotation_history":"Crop history","syslog.col.irrigation_log":"Irrigation","syslog.col.plant_overrides":"Plant data","syslog.col.settings":"Setting","planner.draw_site":"Site & elements","planner.draw_planter":"Planter / pot","planner.draw_planter_hint":"Draw a planter, pot or window box - you can plant it like a bed afterwards.","planner.new_planter":"Planter","planner.elements_in_zone":"Paths, terrace, lawn, hedge \u2026 in this zone","planner.elements.buildings":"Buildings & paving","planner.elements.paths":"Paths","planner.elements.green":"Green","planner.elements.outdoor_living":"Outdoor living & equipment","feature.stone_path":"Stone path","feature.wood_path":"Wooden path","feature.stepping_stones":"Stepping stones","feature.bark_path":"Bark path","feature.decking":"Decking","feature.wall":"Wall","feature.carport":"Carport / garage","feature.shrub":"Shrub","feature.pool":"Swimming pool","feature.seating":"Seating area","settings.zone_type.garden":"Ornamental garden","settings.zone_type.containers":"Planters & pots","zone_hint.garden":"Ornamental garden: shrubs, borders and perennials around lawn and terrace.","zone_hint.containers":"Planters & pots: on a terrace, balcony or window sill - draw every planter or pot and plant it.","settings.display":"Display (this browser)","settings.photos":"Show plant photos (Wikipedia)","settings.photos_hint":"On top of the illustration Hortulus shows a photo from Wikipedia, looked up by scientific name. Your browser fetches it directly from Wikipedia (with credit); offline or when switched off you see the illustration.","nav.layout":"Garden plan","advice.apply_transition":"Open year-end transition","layout.current":"current","layout.no_plan":"no garden plan","layout.edit":"Edit garden plan","layout.to_planner":"To the planner","layout.make":"Make the {season} garden plan","layout.planting_on":"on the {season} garden plan - zones, beds and elements are edited in Garden plan","layout.started":"Garden plan {season} started.","layout.none_title":"No garden plan for {season} yet","layout.none_intro":"A garden plan fixes the shape of your garden for one year: zones (open ground, greenhouse, pots \u2026), beds and elements such as driveway, house, hedge, lawn, shed or water butt - without plants. Start from another year or empty.","layout.none_plant":"You plant a year on its own garden plan, and {season} has none yet. Make it in Garden plan, or move {live} over with the year-end transition.","layout.none_hint":"Nothing moves into a new year by itself: the garden plan and what carries on (perennials, overwintering crops) are moved over explicitly at the end of the year.","layout.copy_from":"Copy the {season} garden plan","layout.start_empty":"Start empty","year.button":"Year-end transition","year.title_short":"Year-end transition","year.title":"Year-end transition {from} \u2192 {to}","year.intro":"Nothing moves into {to} by itself. Choose which part of the garden plan and which crops go along; the rest stays in {from}. Everything is logged in the system log and can be undone.","year.plan":"Garden plan","year.keep":"Use the garden plan you already made for {to}","year.copy":"Copy the {from} garden plan (choose below what goes along)","year.copy_hint":"The {to} garden plan becomes a copy of {from}. Untick what does not go along.","year.elements":"Elements (driveway, house, hedge, paths \u2026)","year.perennials":"Perennials, trees and shrubs","year.overwinter":"Overwintering crops (still growing after the year ends)","year.none":"None.","year.bed_gone":"bed not in the new garden plan","year.not_chosen":"What you leave unticked stays in the old year and gets no tasks in {to}.","year.activate":"Make {to} the active garden year now","year.activate_hint":"The {from} garden plan is archived and {to} becomes your garden: tasks, sensors and irrigation follow the new plan.","year.prepare_hint":"Prepare only: the {to} garden plan is set up, {from} stays your active garden.","year.apply":"Move over to {to}","year.done":"Your garden is now in {season} - {n} crop(s) moved over.","year.prepared":"Garden plan {season} prepared - {n} crop(s) moved over.","year.skipped":"{n} crop(s) not moved: their bed is not in the new garden plan.","layout.save_first":"Your changes are not saved yet - try again in a moment.","reason.zone_type":"{zone} is a {zone_type}: it holds {allowed}, not {category}.","reason.not_under_glass":"Does not belong under glass ({zone}).","reason.too_late":"Too late for season {season}: the sowing/planting window ran until {until}.","reason.too_late_nodate":"Too late for season {season}: the sowing/planting window has passed.","reason.frost_before_harvest":"Frost ({frost}) comes before the first harvest ({harvest}) - use the greenhouse or start earlier next year.","reason.rotation":"Crop rotation: {family} grew here in {season} - wait {years} years.","reason.bad_neighbour":"Bad neighbour: {plant} is already in this bed.","reason.no_space":"No room left: {free_m2} m\xB2 free, {need_m2} m\xB2 needed.","reason.no_suitable_bed":"No bed where this crop fits.","reason.time_budget":"Does not fit your time per week any more.","reason.water_budget":"Does not fit your water per week any more.","reason.compost_budget":"Does not fit your compost any more.","autofill.mostly_late":"{n} crops are too late for season {season}: their sowing or planting time has passed. Fill {next} instead?","autofill.fill_next":"Fill {season}","autofill.skipped_why":"why not?","autoplan.plan_from":"{season} has no garden plan yet: the proposal uses the {from} plan. Applying it copies that plan into {season}.","autoplan.no_plan":"There is no garden plan for {season} yet - draw it in Garden plan first.","plans.button":"Plans","plans.title":"Plans for {season}","plans.intro":"Start over with a completely new plan. The current plan - with its beds and crops - is set inactive and kept; you can make it active again later.","plans.new":"Start a new plan","plans.start.empty":"Completely empty (from scratch)","plans.start.empty.hint":"No zones, beds, elements or crops - you draw everything again.","plans.start.zones":"Same zones, empty","plans.start.zones.hint":"Zones and elements (house, paths, hedge \u2026) stay, without beds and without crops.","plans.start.zones_beds":"Same zones and beds, no crops","plans.start.zones_beds.hint":"The whole layout stays; only this season's crops are cleared.","plans.old_name":"Name for the current plan","plans.old_name_hint":"e.g. Plan {season} \u2013 first version","plans.start_button":"Start new plan","plans.inactive":"Inactive plans","plans.none":"No inactive plans yet.","plans.counts":"{zones} zones \xB7 {beds} beds \xB7 {plantings} crops","plans.activate":"Activate","plans.confirm_new":"The current {season} plan is set inactive (with its crops) and you start a new plan. Continue?","plans.confirm_activate":"Make {name} active again for {season}? The plan that is active now is set inactive.","plans.confirm_delete":"Delete {name} for good? (It can still be undone in the system log.)","plans.started":"New plan for {season} started - the previous one is under inactive plans.","plans.activated":"{name} is active again.","plans.deleted":"{name} deleted.","nav.analysis":"Analysis","syslog.error":"Error","analysis.check":"Check","analysis.why":"Why not?","analysis.errors":"Errors","analysis.log":"System log","analysis.check_title":"Garden check","analysis.recheck":"Check again","analysis.check_intro":"Hortulus lays its garden plans, crops and seasons side by side and looks for what does not add up or explains unexpected behaviour.","analysis.all_good":"Nothing odd found.","analysis.to_planner":"To the planner","analysis.count.zones":"Zones","analysis.count.beds":"Beds","analysis.count.features":"Elements","analysis.count.plantings":"Crops (all years)","analysis.count.plans":"Years with a garden plan","analysis.count.archived_plans":"Inactive plans","analysis.count.log_entries":"Log entries","analysis.why_title":"Why does a plant (not) fit?","analysis.why_intro":"Pick a plant and a season: per bed you see whether it fits and, if not, why - the same rules as dragging and Autofill.","analysis.no_beds":"This garden plan has no beds yet.","analysis.free":"{m2} m\xB2 free","analysis.fits":"Fits here.","analysis.warning":"Note","analysis.errors_title":"Errors and refused actions","analysis.errors_intro":"Every action that failed or was refused (e.g. an invalid plan, a change made elsewhere at the same time) is listed here, with when and by whom.","analysis.no_errors":"No errors logged.","analysis.error.invalid_plan":"Plan refused","analysis.error.revision_conflict":"Changed elsewhere at the same time","analysis.error.unknown_bed":"Unknown bed","analysis.error.unknown_plant":"Unknown plant","analysis.error.unknown_record":"Not found","analysis.error.unexpected":"Unexpected error","analysis.error.invalid_format":"Invalid data","analysis.issue.transition_due":"The year-end transition {from} \u2192 {to} has not been done.","analysis.issue.transition_due.why":"Nothing moves into {to} by itself: perennials and the {from} garden plan get no tasks in {to} until you move them over.","analysis.issue.season_without_plan":"Season {season} has {n} crop(s) but no garden plan.","analysis.issue.season_without_plan.why":"Without a garden plan the planner does not show those crops. Copy or draw the {season} garden plan.","analysis.issue.planting_not_on_plan":"{n} crop(s) in {season} sit on a bed that is not in the {season} garden plan: {plants}.","analysis.issue.planting_not_on_plan.why":"They are invisible on the map and get no tasks. Usually the bed was deleted or belongs to another year or an inactive plan. Bring the bed back or remove the crops.","analysis.issue.unknown_plant":"Unknown plant in {season}: {ids}.","analysis.issue.unknown_plant.why":"A custom plant was deleted while it was still in the plan.","analysis.issue.bed_without_zone":"Bed {bed} ({season}) belongs to no zone.","analysis.issue.bed_without_zone.why":"Give the bed a zone in Garden plan.","analysis.issue.bed_outside_zone":"Bed {bed} lies (partly) outside zone {zone} ({season}).","analysis.issue.bed_outside_zone.why":"The bed counts for zone {zone} (climate, sensors) but does not lie in it. Move the bed or enlarge the zone.","analysis.issue.zone_without_beds":"Zone {zone} has no beds ({season}).","analysis.issue.zone_without_beds.why":"Nothing can be planted in a zone without beds - not even by Autofill. Draw a bed (or planter) in Garden plan.","analysis.issue.planting_outside_bed":"{plant} sticks out of bed {bed} ({season}).","analysis.issue.planting_outside_bed.why":"Spacing and plant counts are then off. Move or shrink the crop.","analysis.issue.plantings_overlap":"{a} and {b} lie on top of each other in {bed} ({season}).","analysis.issue.plantings_overlap.why":"Both occupy the same spot at the same time: too little room, which is what the overlap messages are about.","analysis.issue.planting_too_late":"{plant} is planned too late for {season}.","analysis.issue.planting_too_late.why":"The sowing/planting window has passed: dates move to today and the harvest comes (too) late. Plan it for {next} or adjust the dates.","analysis.issue.perennial_not_carried":"{n} perennial(s) were not moved into {season}: {plants}.","analysis.issue.perennial_not_carried.why":"Left unticked at the year-end transition - they get no tasks in {season}. On purpose? Otherwise undo the transition in the system log and do it again.","nav.crops":"Crops","crops.intro":"Every crop of this season in one list. Change dates, method, status, count and notes right here - without dragging anything. Leave a planned date empty and Hortulus computes it (grey underneath).","crops.search":"Search crop, bed or zone","crops.group":"Order","crops.group.bed":"by bed","crops.group.plant":"by crop","crops.group.date":"by date","crops.method":"Method","crops.status":"Status","crops.count":"Number of plants","crops.notes":"Notes","crops.computed":"computed","crops.field.sow_date":"Sow (planned)","crops.field.sown_on":"Sown on","crops.field.transplant_date":"Plant out (planned)","crops.field.transplanted_on":"Planted out on","crops.field.harvest_started_on":"Harvest started","crops.field.finished_on":"Finished on","crops.late":"Planned too late for this season - the dates move to today.","crops.no_bed":"no bed in this plan","crops.none":"No crops in {season} yet.","crops.window.sow":"Sowing window","crops.window.transplant":"Planting window","crops.in_ground":"In the ground","crops.harvest":"Harvest","crops.detail_hint":"Every change is saved right away and logged in the system log. Position and size are changed in the planner.","planner.why_here":"Why (not) here?","planner.to_crops":"In Crops","planner.plant_info":"Plant info","planner.why_ok":"Fits in {bed}.","planner.why_not":"Does not fit well in {bed}:","planner.why_no_bed":"This bed is not on this season's garden plan.","planner.why_fits_in":"Fits in: {beds}.","planner.why_fits_nowhere":"Fits in no bed this season.","planner.rotation_strip":"Crop rotation: plant families in this bed over the last years","planner.late_title":"Season {season} is coming to an end","planner.late_still":"Still possible: {n} plants. Click one to put it in the selected bed.","planner.late_none":"Hardly anything fits this season any more.","planner.late_add_hint":"Put it in the selected bed","planner.late_next":"Plan {season}","planner.drop_bad":"{plant} does not fit well here","analysis.compare":"Compare","analysis.badge":"{errors} error(s), {warnings} warning(s)","analysis.fixed":"Fixed. You can undo it in the system log.","analysis.export":"Export diagnosis","analysis.fix.season_without_plan":"Copy a garden plan","analysis.fix.planting_not_on_plan":"Put into a bed of this plan","analysis.fix.planting_outside_bed":"Move back into the bed","analysis.fix.bed_outside_zone":"Move the bed into its zone","analysis.fix.perennial_not_carried":"Carry over to this year","crops.bulk":"Change several crops","crops.bulk_n":"{n} selected","crops.bulk_date":"Date","crops.pick_date":"Pick a date","crops.bulk_apply":"Apply","crops.bulk_done":"{n} crops changed.","crops.pick_all":"Select all","crops.show_on_map":"Show on map","compare.title":"Compare plans","compare.intro":"Put two garden plans side by side - a season's or an inactive one - and see what was added, removed or changed.","compare.button":"Compare","compare.season_plan":"Garden plan {season}","compare.inactive_plan":"{name} (inactive, {season})","compare.from":"From","compare.to":"To","compare.identical":"These plans are the same.","compare.zones":"Zones","compare.beds":"Beds","compare.features":"Elements","compare.crops":"Crops","compare.what.moved":"moved or resized","compare.what.renamed":"renamed","compare.what.zone":"other zone","compare.what.type":"other type","compare.what.bed":"other bed","compare.what.status":"other status","valve.stuck_title":"Valve left open","valve.stuck":"{what} ({entity}) has been open far longer than any watering run.","valve.stuck_since":"Open since {time}. Is it stuck, or was it opened by hand?","valve.pump":"The pump","valve.close":"Close valve","valve.closed":"Valve closed.","valve.still_open":"The valve still reports: {state}. Please check it.","valve.pump_test_hint":"The pump is tested together with a bed valve (button at the bed), so it never runs against a closed valve.","valve.test":"Test (5 s)","valve.testing":"Testing\u2026","valve.test_confirm":"Open {entity} for 5 seconds to test it? (the pump runs too when one is set)","valve.test_ok":"Works: opened ({open}) and closed again ({closed}).","valve.test_no_open":"Did not open: the valve reports {state}. Check the connection or the entity.","valve.test_no_close":"Opened, but still reports {state} after closing. Check the valve.","valve.test_save_first":"Save the settings first; Hortulus only tests valves that are linked already.","water.per_bed":"Watering per bed","water.days":"{n} days","water.given":"Water given","water.rain":"Rain","water.moisture":"Soil moisture","water.no_moisture":"no moisture sensor","water.chart_title":"Watering of {bed}","water.chart_empty":"No data for this period yet.","water.chart_hint":"Soil moisture comes from Home Assistant's history, water given from Hortulus' log, rain from the rain sensor (daily maximum). It shows whether a run really happened and helped.","crops.view.list":"List","crops.view.weeks":"Sowing plan","crops.view.seeds":"Seeds","crops.view.follow":"Succession","crops.view.harvest":"Harvest forecast","crops.all_dates":"All dates","plan.act.sow_indoor":"Sow indoors","plan.act.sow_direct":"Sow outdoors","plan.act.transplant":"Plant out","plan.act.harvest":"Harvest starts","plan.done":"Done","plan.weeks_title":"Sowing plan","plan.n_weeks":"{n} weeks","plan.weeks_intro":"What to sow indoors or outdoors, plant out and start harvesting in the coming weeks. Done fills in the real date (today) on the crop.","plan.overdue":"Overdue ({n})","plan.week_of":"Week of {date}","plan.seeds_title":"Seeds for {season}","plan.seeds_intro":"How much seed the plan still needs (plant count with a margin for germination, thinning and pests) against your seed stock.","plan.plants":"Plants","plan.seeds":"Seeds","plan.in_stock":"In stock","plan.seed.ok":"Enough","plan.seed.check":"Check","plan.seed.short":"Too few","plan.seed.none":"Buy","plan.seeds_hint":"Hortulus cannot count packets and grams: those say 'Check'. Bought plants and crops already sown do not count.","plan.seeds_none":"The plan needs no more seed.","plan.follow_title":"Succession","plan.follow_intro":"Beds that free up this season and what still fits there afterwards - same rules as autofill, without the same plant family.","plan.free_from":"free from {date}","plan.after":"after {plants}","plan.ready_by":"harvest from {date}","plan.follow_nothing":"Nothing fits there afterwards this season.","plan.follow_none":"No beds free up this season.","plan.harvest_title":"Harvest forecast {season}","plan.harvest_intro":"Expected harvest per week, about {kg} kg in all. Based on the area, the yield per m\xB2 (your own harvests where there are any) and the harvest window.","plan.learned":"your yield","plan.book_yield":"average yield","plan.harvest_none":"No harvest expected this season yet.","note.title":"Note or photo","note.placeholder":"What do you see? (e.g. aphids, first flower, slug damage)","note.photo":"Photo","note.save":"Save","journal.report":"Season report","report.title":"Season report {season}","report.crops":"Crops","report.plantings":"plantings","report.harvest":"Harvest","report.expected":"expected","report.failed":"Failed","report.water":"Water given","report.runs":"runs","report.notes":"Notes","report.per_crop":"Per crop","report.problems":"Problems from the journal","report.milestones":"Milestones","report.download":"Download (Markdown)","report.empty":"Nothing planted or harvested in this season yet.","report.hint":"'Expected' uses the average yield per m\xB2. Log your harvest in Journal \u2192 Harvest and Hortulus learns your yield, making next year's forecast more accurate.","report.verdict.failed":"failed","report.verdict.no_record":"no harvest logged","report.verdict.above":"better than expected","report.verdict.below":"less than expected","report.verdict.as_expected":"as expected","report.verdict.ok":"\u2013","report.verdict.growing":"still growing","report.running":"The season is still running: what has not been harvested yet shows as 'still growing'."};var Ma={"app.name":"Hortulus","app.tagline":"Je moestuin, gepland en verzorgd","nav.dashboard":"Vandaag","nav.planner":"Planner","nav.library":"Planten","nav.calendar":"Kalender","nav.settings":"Instellingen","common.save":"Opslaan","common.cancel":"Annuleren","common.delete":"Verwijderen","common.previous":"Vorige","common.next":"Volgende","lib.in_garden":"In je tuin","common.close":"Sluiten","common.add":"Toevoegen","common.edit":"Bewerken","common.none":"Geen","common.loading":"Je tuin wordt geladen\u2026","common.not_loaded":"Hortulus is nog niet ingesteld. Voeg de integratie toe via Instellingen \u2192 Apparaten & diensten.","common.minutes":"{n} min","common.days":"{n} dagen","common.cm":"{n} cm","common.today":"Vandaag","common.tomorrow":"Morgen","common.yesterday":"Gisteren","common.overdue":"Te laat","common.unknown":"Onbekend","common.search":"Zoeken","common.all":"Alle","common.season":"Seizoen {year}","common.admin_only":"Alleen beheerders kunnen het plan wijzigen.","common.saved":"Opgeslagen","common.saving":"Opslaan\u2026","common.unsaved":"Niet-opgeslagen wijzigingen","common.conflict":"Elders gewijzigd - opnieuw geladen","common.error":"Er ging iets mis: {message}","dash.greeting_morning":"Goedemorgen","dash.greeting_afternoon":"Goedemiddag","dash.greeting_evening":"Goedenavond","dash.stat_tasks":"taken vandaag","dash.stat_work":"werk vandaag","dash.stat_gdd":"graaddagen","dash.lede.spring":"De grond warmt op en alles wil groeien. Een goede dag om te zaaien, te verspenen en te kijken wat er opkomt.","dash.lede.summer":"De tuin staat in volle bloei. Oogsten, water geven en genieten van de lange avonden.","dash.lede.autumn":"De oogst gaat door en de tuin kleurt goud. Tijd om te bewaren, op te ruimen en vooruit te kijken.","dash.lede.winter":"De tuin rust, de tuinier droomt. Plannen maken voor een nieuw seizoen.","photos.timeline":"Fototijdlijn","photos.day":"Dag {n}","photos.prev":"Vorige foto","photos.next":"Volgende foto","photos.yours":"Jouw foto's","quick.title":"Snel oogsten","quick.hint":"Tik een gewas, tel het gewicht op, bewaar","quick.none":"Er staat nu niets klaar om te oogsten.","quick.save":"Oogst bewaren","quick.reset":"Opnieuw","quick.saved":"{kg} kg {plant} genoteerd. Smakelijk!","app.garden":"Tuin","nav.weather":"Weer","nav.group.garden":"Tuin","nav.group.knowledge":"Kennis","nav.group.manage":"Beheer","weather.title":"Weer","weather.now":"Nu","weather.hours":"De komende 24 uur","weather.days":"De komende dagen","weather.garden":"Wat betekent dit voor de tuin?","weather.radar":"Buienradar","weather.humidity":"Vochtigheid","weather.wind":"Wind","weather.pressure":"Luchtdruk","weather.rain_today":"Regen vandaag","weather.no_entity":"Kies een weerentiteit bij Instellingen \u203A Weer & buitensensoren om de verwachting te zien.","weather.no_hourly":"Deze weerdienst geeft geen verwachting per uur.","weather.no_daily":"Deze weerdienst geeft geen verwachting per dag.","weather.radar_none":"Voeg in Home Assistant een radarcamera toe (bv. de Buienradar-integratie) om hier de neerslagkaart te zien.","weather.radar_failed":"De radarkaart kon niet geladen worden. Probeer later opnieuw.","weather.radar_source":"Bron: {source}, ververst elke 5 minuten","weather.tag.frost":"vorst","weather.tag.heat":"hitte","weather.hint.frost_title":"Vorst in zicht ({n} nachten)","weather.hint.frost":"De koudste nacht is {day}, rond {t} \xB0C. Dek gevoelige gewassen af en zet jonge planten binnen.","weather.hint.heat_title":"Warme dagen ({n})","weather.hint.heat":"{day} wordt het tot {t} \xB0C. Geef 's ochtends water, schaduw de serre en verlucht goed.","weather.hint.rain_title":"{mm} mm regen in de komende drie dagen","weather.hint.rain":"Water geven kan wachten; Hortulus slaat de beregening over als het genoeg regent.","weather.hint.dry_title":"Een droge periode","weather.hint.dry":"De komende vijf dagen valt er nauwelijks regen. Mulch houdt vocht vast; geef liever \xE9\xE9n keer flink water dan elke dag een beetje.","weather.hint.beds_title":"{n} bedden hebben nu water nodig","weather.hint.beds":"Zie Vandaag voor de hoeveelheid per bed, of laat Hortulus de kranen sturen.","weather.hint.none":"Rustig tuinweer: geen vorst, hitte of extreme regen in zicht.","weather.cond.sunny":"Zonnig","weather.cond.clear-night":"Heldere nacht","weather.cond.partlycloudy":"Half bewolkt","weather.cond.cloudy":"Bewolkt","weather.cond.rainy":"Regen","weather.cond.pouring":"Stortregen","weather.cond.lightning":"Onweer","weather.cond.lightning-rainy":"Onweer met regen","weather.cond.snowy":"Sneeuw","weather.cond.snowy-rainy":"Natte sneeuw","weather.cond.hail":"Hagel","weather.cond.fog":"Mist","weather.cond.windy":"Winderig","weather.cond.windy-variant":"Winderig en bewolkt","weather.cond.exceptional":"Uitzonderlijk weer","weather.cond.unknown":"Onbekend","weather.hint.frost_title_one":"Vorst in zicht (\xE9\xE9n nacht)","weather.hint.heat_title_one":"Een warme dag","weather.hint.beds_title_one":"E\xE9n bed heeft nu water nodig","settings.theme":"Kleurthema","theme.classic":"Klassiek groen","theme.classic.hint":"Bladgroen en goudsbloem","theme.earth":"Aarde","theme.earth.hint":"Warm terracotta en klei","theme.night":"Nacht","theme.night.hint":"Altijd donker, maanlicht-mint","theme.season":"Seizoen","theme.season.hint":"Wisselt mee: lente, zomer, herfst, winter","harvest.years_title":"Oogst door de jaren","harvest.years_few":"Na een tweede oogstjaar zie je hier hoe de jaren zich verhouden.","harvest.best_year":"beste: {year}","harvest.legend_best":"beste jaar","harvest.legend_other":"andere jaren","wall.open":"Wandscherm","wall.exit":"Sluiten","wall.late":"te laat sinds {date}","wall.watering":"{bed} krijgt nu water","crops.view.timeline":"Tijdlijn","gantt.nursery":"voorkweek","gantt.grow":"groeit","gantt.harvest":"oogst","gantt.drag":"sleep om te verschuiven","gantt.hint":"Sleep een geplande teelt opzij om zaaien en uitplanten te verschuiven.","dash.today_tasks":"Taken voor vandaag","dash.no_tasks":"Niets te doen vandaag. Geniet van de tuin!","dash.show_all":"Alle {n} taken tonen in de kalender","dash.total_time":"Ongeveer {minutes} min werk","dash.beds":"Bedden","dash.weather":"Komende 48 uur","dash.greenhouse":"Kas","dash.coming_up":"Binnenkort","dash.gdd":"Graaddagen","dash.gdd_since":"sinds {date}","dash.frost_risk":"Vorstrisico","dash.min_temp":"Laagste {temp} \xB0C","dash.rain":"Regen {mm} mm","dash.inside":"Binnen {temp} \xB0C","dash.limits":"Gewassen verdragen {min}\u2013{max} \xB0C","dash.no_sensor":"Geen sensor","dash.active_crops":"{n} gewassen in de grond","dash.forecast_missing":"Geen weersverwachting - advies is minder nauwkeurig.","planner.season":"Seizoen","planner.undo":"Ongedaan maken","planner.redo":"Opnieuw","planner.snap":"Uitlijnen op raster","planner.zoom_in":"Inzoomen","planner.zoom_out":"Uitzoomen","planner.fit":"Passend maken","planner.add_bed":"Bed toevoegen","planner.add_zone":"Zone toevoegen","planner.overlay_companions":"Buurplanten","planner.overlay_moisture":"Vocht","planner.overlay_temperature":"Temperatuur","planner.view_date":"Toon tuin op","planner.palette":"Planten","planner.palette_hint":"Sleep een plant naar een bed, of druk op Enter om hem aan het geselecteerde bed toe te voegen.","planner.layout":"Indeling","planner.layout.single":"Los","planner.layout.block":"Blok","planner.layout.row":"Rij","planner.inspector":"Details","planner.nothing_selected":"Selecteer een bed of beplanting voor details. Druk op ? voor sneltoetsen.","planner.method":"Methode","planner.method.indoor_sow":"Binnen zaaien, later uitplanten","planner.method.direct_sow":"Ter plaatse zaaien","planner.method.transplant":"Planten (gekochte planten / plantuitjes)","planner.status":"Status","planner.count":"{n} planten","planner.timeline":"Tijdlijn","planner.succession":"Opeenvolgend zaaien","planner.succession_count":"Aantal zaaimomenten","planner.succession_interval":"Elke (dagen)","planner.succession_placement":"Plaatsing","planner.succession.split":"Vlak in stroken verdelen","planner.succession.stack":"Zelfde plek, na elkaar","planner.succession_create":"Zaaimomenten maken","planner.succession_dropped":"{n} zaaimomenten vielen buiten het zaaivenster en zijn overgeslagen.","planner.duplicate":"Dupliceren","planner.remove":"Verwijderen","planner.bed_name":"Naam","planner.zone":"Zone","planner.kind":"Soort","planner.width":"Breedte (cm)","planner.length":"Lengte (cm)","planner.orientation":"Rijrichting (\xB0)","planner.soil":"Grond","planner.shade":"Schaduw (%)","planner.wind":"Wind","planner.score":"Buurplantenscore","planner.warnings":"Waarschuwingen","planner.no_warnings":"Geen conflicten - mooie combinatie!","planner.out_of_bounds":"Valt deels buiten het bed.","planner.placed":"{plant} geplaatst in {bed}.","planner.moved":"{name} verplaatst.","planner.removed":"{name} verwijderd.","planner.no_bed_here":"Zet planten op een bed.","planner.export_json":"Exporteer JSON","planner.export_yaml":"Exporteer YAML","planner.import":"Plan importeren","planner.import_mode":"Importmodus","planner.import_merge":"Samenvoegen met huidig plan","planner.import_replace":"Huidig plan vervangen","planner.imported":"Ge\xEFmporteerd: {beds} bedden, {plantings} beplantingen.","planner.shortcuts":"Sneltoetsen","planner.legend":"Plantenfamilies","planner.new_bed":"Nieuw bed","planner.new_zone":"Nieuwe zone","shortcut.move":"Selectie verplaatsen (Shift = 10\xD7)","shortcut.undo":"Ongedaan maken","shortcut.redo":"Opnieuw","shortcut.delete":"Selectie verwijderen","shortcut.duplicate":"Selectie dupliceren","shortcut.grid":"Raster aan/uit","shortcut.companions":"Buurplanten-laag aan/uit","shortcut.moisture":"Vochtlaag aan/uit","shortcut.zoom":"In- / uitzoomen","shortcut.escape":"Selectie opheffen","shortcut.cycle":"Volgend / vorig item selecteren","shortcut.help":"Deze hulp tonen","lib.title":"Plantenbibliotheek","lib.search":"Zoek op naam, Latijnse naam of familie","lib.family":"Familie","lib.filter_greenhouse":"Kas","lib.filter_quick":"Snelle gewassen","lib.filter_custom":"Mijn planten","lib.add_custom":"Nieuwe plant","lib.customize":"Aanpassen","lib.reset":"Terug naar standaard","lib.spacing":"Plantafstand","lib.row_spacing":"Rijafstand","lib.depth":"Zaaidiepte","lib.germination":"Kiemduur","lib.maturity":"Dagen tot oogst","lib.soil_temp":"Min. bodemtemperatuur","lib.frost":"Vorstbestendigheid","lib.min_temp":"Minimumtemperatuur","lib.greenhouse":"Kas","lib.water":"Water","lib.nutrients":"Voeding","lib.rotation":"Wisselteelt","lib.rotation_years":"{n} jaar voordat dezelfde familie terugkomt","lib.open_plant":"Toon deze plant","lib.friends":"Goede buren","lib.enemies":"Uit elkaar houden","lib.pests":"Plagen","lib.diseases":"Ziekten","lib.care":"Verzorging","lib.calendar":"Zaaikalender","lib.indoor_sow":"Binnen zaaien","lib.direct_sow":"Buiten zaaien","lib.transplant":"Uitplanten","lib.harvest":"Oogsten","lib.source.builtin":"Standaard","lib.source.custom":"Eigen","lib.source.override":"Aangepast","lib.id":"Code","lib.name_en":"Naam (Engels)","lib.name_nl":"Naam (Nederlands)","lib.scientific":"Wetenschappelijke naam","lib.variety":"Ras","lib.habit":"Groeiwijze","lib.windows_hint":"Weken ten opzichte van de gemiddelde laatste voorjaarsvorst (negatief = ervoor).","lib.weeks":"weken","lib.from":"van","lib.to":"tot","lib.saved":"{plant} opgeslagen.","cal.month":"Maand","cal.week":"Week","cal.list":"Lijst","cal.prev":"Vorige","cal.next":"Volgende","cal.show_done":"Afgeronde taken tonen","cal.add_task":"Nieuwe taak","cal.all_beds":"Alle bedden","task.complete":"Klaar","task.skip":"Overslaan","task.reopen":"Heropenen","task.postpone":"Uitstellen","task.postpone_1":"+1 dag","task.postpone_3":"+3 dagen","task.postpone_7":"+1 week","task.postpone_to":"Naar datum","task.note":"Notitie","task.notes":"Notities","task.photos":"Foto's","task.add_photo":"Foto toevoegen","task.priority":"Prioriteit","task.duration":"Duur (min)","task.due":"Datum","task.window":"Venster {start} \u2013 {end}","task.repeat":"Herhaalt elke {n} dagen","task.repeat_days":"Herhaal elke (dagen, optioneel)","task.title":"Titel","task.type":"Soort","task.bed":"Bed","task.description":"Omschrijving","task.shifted":"{n} afhankelijke taken schoven mee.","task.beyond_window":"Let op: de nieuwe datum ligt na het ideale venster.","task.completed":"Goed bezig! {title} gedaan.","task.source.generated":"Uit je plan","task.source.sensor":"Uit sensoren","task.source.weather":"Uit de weersverwachting","task.source.user":"Door jou toegevoegd","settings.region":"Klimaat & regio","settings.hemisphere":"Halfrond","settings.hemisphere.north":"Noordelijk","settings.hemisphere.south":"Zuidelijk","settings.mode":"Profiel","settings.mode.preset":"Regionale voorinstelling","settings.mode.usda":"USDA-winterhardheidszone","settings.mode.custom":"Eigen vorstdata","settings.preset":"Regio","settings.zone":"Winterhardheidszone","settings.last_frost":"Laatste voorjaarsvorst (MM-DD)","settings.first_frost":"Eerste najaarsvorst (MM-DD)","settings.frost_dates_now":"Dit seizoen: laatste vorst {last}, eerste vorst {first}.","settings.weather":"Weer & buitensensoren","settings.weather_entity":"Weerentiteit","settings.outdoor_temp":"Buitentemperatuur","settings.rain":"Regensensor","settings.zones":"Zones & microklimaat","settings.beds":"Bedden & sensoren","settings.zone_type.outdoor":"Buiten","settings.zone_type.greenhouse":"Kas","settings.zone_type.cold_frame":"Koude bak","settings.heated":"Verwarmd","settings.min_heating":"Verwarming houdt boven (\xB0C)","settings.sensors":"Sensoren","settings.sensor.soil_moisture":"Bodemvocht","settings.sensor.soil_temperature":"Bodemtemperatuur","settings.sensor.air_temperature":"Luchttemperatuur","settings.sensor.air_humidity":"Luchtvochtigheid","settings.sensor.light":"Licht","settings.sensor.rain":"Regen","settings.irrigation":"Beregeningsschakelaar/-klep","settings.flow":"Debiet (L/min)","settings.vent":"Raamopener / ventilatie","settings.notifications":"Meldingen","settings.persistent":"Blijvende meldingen","settings.notify_services":"Pushmeldingen (notify-diensten, kommagescheiden)","settings.tts":"Tekst-naar-spraak-entiteit","settings.tts_players":"Speakers (kommagescheiden)","settings.digest":"Dagelijks overzicht om","settings.frost_alerts":"Vorstwaarschuwingen","settings.heat_alerts":"Hittewaarschuwingen","settings.tts_frost":"Vorst omroepen via speakers","settings.general":"Algemeen","settings.language":"Taal","settings.language.auto":"Volg Home Assistant","settings.units":"Eenheden","settings.units_metric":"Metrisch (cm, \xB0C, mm, L)","settings.snap":"Rastergrootte (cm)","settings.radius":"Bereik buurplanten (cm)","settings.data":"Importeren & exporteren","settings.saved":"Instellingen opgeslagen.","type.sow_indoor":"Binnen zaaien","type.sow_direct":"Buiten zaaien","type.harden_off":"Afharden","type.transplant":"Uitplanten","type.thin":"Uitdunnen","type.stake":"Ondersteunen","type.prune":"Snoeien","type.pinch":"Toppen","type.earth_up":"Aanaarden","type.feed":"Bemesten","type.water":"Water geven","type.weed":"Wieden","type.pest_check":"Plaagcontrole","type.harvest":"Oogsten","type.ventilate":"Luchten","type.shade":"Schaduwen","type.frost_protect":"Vorstbescherming","type.custom":"Taak","priority.low":"Laag","priority.normal":"Normaal","priority.high":"Hoog","priority.urgent":"Dringend","status.planned":"Gepland","status.sown_indoors":"Binnen gezaaid","status.sown":"Gezaaid","status.transplanted":"Uitgeplant","status.harvesting":"Oogst loopt","status.finished":"Afgerond","status.failed":"Mislukt","risk.none":"geen","risk.low":"laag","risk.moderate":"matig","risk.high":"hoog","risk.unknown":"onbekend","moisture.dry":"Droog","moisture.slightly_dry":"Iets droog","moisture.optimal":"Optimaal","moisture.wet":"Nat","moisture.unknown":"Geen data","irrigation.none":"Geen water nodig","irrigation.water":"Geef {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Overslaan - regen verwacht","irrigation.check_manually":"Controleer met de hand (~{mm} mm)","gh.none":"Alles goed","gh.ventilate":"Luchten","gh.shade":"Nu schaduwen","gh.close_up":"Sluiten voor de nacht","gh.heat":"Verwarming aan","level.low":"Laag","level.medium":"Gemiddeld","level.high":"Hoog","suit.yes":"Geschikt","suit.no":"Niet geschikt","suit.conditional":"Mogelijk","frost.tender":"Vorstgevoelig","frost.half_hardy":"Half winterhard","frost.hardy":"Winterhard","frost.very_hardy":"Zeer winterhard","kind.in_ground":"Bed in de grond","kind.raised":"Verhoogd bed","kind.container":"Bak / pot","soil.sandy":"Zand","soil.loam":"Leem","soil.clay":"Klei","soil.silt":"L\xF6ss","soil.peat":"Veen","soil.chalk":"Kalk","soil.potting_mix":"Potgrond","wind.sheltered":"Beschut","wind.moderate":"Gemiddeld","wind.exposed":"Winderig","habit.bush":"Struik","habit.vine":"Rank","habit.climbing":"Klimmend","habit.upright":"Rechtop","habit.rosette":"Rozet","habit.root":"Wortelgewas","habit.bulb":"Bol","reason.soil_too_cold":"Grond is {soil} \xB0C; {plant} heeft {min} \xB0C nodig om te kiemen.","reason.soil_too_hot":"Grond is {soil} \xB0C; boven {max} \xB0C kiemt {plant} slecht.","reason.frost_forecast":"Vorst ({temp} \xB0C) verwacht voor {date}; {plant} is vorstgevoelig.","reason.window_open":"Het venster is open.","reason.window_not_yet":"Venster opent {date}.","reason.window_closed":"Venster sloot op {date}.","reason.not_greenhouse_suitable":"{plant} is niet geschikt voor de kas.","compat.friend":"{a} en {b} zijn goede buren: {reason}","compat.enemy":"{a} en {b} kun je beter niet samen planten: {reason}","compat.overlap":"{a} en {b} overlappen - te weinig ruimte.","compat.rotation":"{family} stond in {season} in {bed}; wacht {years} jaar.","compat.same_family_adjacent":"{a} en {b} zijn familie en delen plagen.","alert.frost":"Vorstrisico {level}: {temp} \xB0C verwacht {when}","alert.heat":"Hittestress in {zone}: {temp} \xB0C verwacht","alert.dry":"{bed} is droog ({moisture}%)","alert.sensor_stale":"Sensor {entity} heeft al een tijd niets gemeld","alert.forecast_unavailable":"Weersverwachting niet beschikbaar","when.tonight":"vannacht","when.tomorrow_night":"morgennacht","nav.handbook":"Handboek","nav.print":"Afdrukken","type.soil_prep":"Bodem klaarmaken","type.compost":"Compost","type.green_manure":"Groenbemester","type.mulch":"Mulchen","type.clean_greenhouse":"Serre kuisen","type.winter_prep":"Winterklaar maken","type.plan_season":"Seizoen plannen","type.tool_care":"Gereedschap","type.soil_test":"Bodemanalyse","type.cut_back":"Terugsnoeien","type.divide":"Scheuren","type.protect":"Beschermen","type.clean":"Opruimen","type.tie_in":"Aanbinden","type.thin_fruit":"Vruchten dunnen","type.pollinate":"Bestuiven","type.check":"Controleren","type.make_feed":"Plantengier maken","category.vegetable":"Groenten","category.herb":"Kruiden","category.fruit":"Fruit","category.flower":"Bloemen","feature.path":"Grindpad","feature.compost":"Composthoop / -vat","feature.water_butt":"Regenton","feature.shed":"Tuinhuis","feature.tree":"Boom","feature.hedge":"Haag","feature.trellis":"Klimrek","feature.other":"Overig","stage.not_planted":"Nog niet geplant","stage.establishing":"Aanslaan","stage.vegetative":"Groei","stage.flowering":"Bloei","stage.ripening":"Afrijping","stage.harvest":"Oogst","stage.finished":"Afgelopen","compat.deters":"{a} beschermt {b}: weert {pests}.","compat.trap":"{a} lokt {pests} weg van {b} (vangplant).","compat.allelopathy":"{a} scheidt groeiremmende stoffen af - houd uit de buurt van {b}.","compat.competition":"{a} en {b} zijn allebei zware eters zo dicht bij elkaar - geef extra compost of meer ruimte.","compat.shading":"{a} (ongeveer {height} cm hoog) zal {b} beschaduwen - zet hoge gewassen aan de kant weg van de zon.","compat.shade_benefit":"{a} geeft {b} welkome zomerschaduw.","alert.disease":"Ziekterisico {level} in {zone}","alert.nutrients":"Voedingsbalans in {bed}: {status}","autoplan.bed_not_empty":"{bed} heeft dit seizoen al gewassen - vink 'vervangen' aan om het opnieuw te plannen.","autoplan.no_beds":"Geen lege bedden om te vullen. Kies bedden en vink 'vervangen' aan.","autoplan.compost_short":"Er is ongeveer {need} kg compost nodig, je hebt {have} kg.","autoplan.time_over":"Ongeveer {need} min werk per week - meer dan de {have} min die je hebt.","autoplan.wanted_missing":"Geen plaats voor: {plants}.","autoplan.consider_irrigation":"Ongeveer {liters} L water in een droge zomerweek - druppelbevloeiing of een regenton bespaart je tijd.","autofill.title":"Automatisch invullen","autofill.intro":"Stelt gewassen, hoeveelheden en plaatsen voor seizoen {season} voor op basis van je bedden en middelen. Er verandert niets tot je het toepast.","autofill.household":"Personen in het gezin","autofill.hours":"Uren per week","autofill.water":"Water per week (L)","autofill.compost":"Beschikbare compost (kg)","autofill.has_irrigation":"Druppelbevloeiing / automatisch water geven aanwezig","autofill.goals":"Doelen","autofill.wanted":"Zeker erbij","autofill.excluded":"Nooit","autofill.beds":"Bedden","autofill.all_empty":"(alle lege bedden)","autofill.replace":"Gewassen van dit seizoen in de gekozen bedden vervangen","autofill.propose":"Voorstel maken","autofill.apply":"In het plan zetten","autofill.applied":"{n} teelten toegevoegd aan het plan","autofill.skipped":"Niet geplaatst","autofill.sum_crops":"{n} gewassen","autofill.sum_yield":"\u2248 {kg} kg oogst","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in een piekweek","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Verse groenten","autofill.goal.storage":"Bewaargroenten","autofill.goal.herbs":"Kruiden","autofill.goal.pollinators":"Bestuivers","autofill.goal.winter":"Wintergroenten","autofill.goal.perennials":"Vaste planten","autofill.goal.easy":"Weinig onderhoud","autofill.reason.no_suitable_bed":"geen geschikt bed","autofill.reason.no_space":"geen plaats","autofill.reason.time_budget":"tijdsbudget","autofill.reason.water_budget":"waterbudget","cal.timeline":"Tijdlijn","cal.garden_work":"Tuinwerk","cal.growing":"Groeit","cal.harvest_estimate":"Oogst verwacht rond {date}","cal.harvest_estimate_short":"Verwachte oogst (graaddagen)","cal.last_frost":"Laatste vorst","cal.first_frost":"Eerste vorst","cal.frost_dates":"Vorstdata","cal.no_plantings":"Dit seizoen nog geen gewassen gepland.","ctx.title":"Nu","ctx.moisture":"Bodemvocht","ctx.soil_temp":"Bodemtemperatuur","ctx.irrigation":"Water geven","ctx.water_balance":"Watertekort","ctx.nutrients":"Voedingsbalans","ctx.air_temp":"Luchttemperatuur","ctx.humidity":"Luchtvochtigheid","ctx.disease":"Ziekterisico","ctx.frost":"Vorstrisico","ctx.today":"Vandaag","ctx.rain":"Regen vandaag","ctx.et0":"Verdamping (ET\u2080)","dash.gdd_today":"Graaddagen vandaag","dash.water_climate":"Water & klimaat","dash.irrigation_mode":"Bewatering","dash.watering_now":"Bezig met {bed}","dash.stop":"Stop","dash.beds_need_water":"Bedden die water nodig hebben","dash.water_now":"Nu water geven","dash.safety_note":"Vorstvergrendeling, regen overslaan en maximale looptijd gelden altijd.","dash.disease_risk":"Ziekterisico","dash.nutrients":"Voeding","dash.water_balance":"Watertekort","dash.irrigation_started":"Bewatering gestart ({min} min)","dash.irrigation_stopped":"Bewatering gestopt","dash.irrigation_nothing":"Nu niets om water te geven","handbook.title":"Tuinhandboek","handbook.intro":"De achtergrond bij alles wat Hortulus aanraadt: bodem, zaaien, water, bemesting, vruchtwisseling, de serre en het tuinjaar.","handbook.contents":"Inhoud","handbook.overview":"Overzicht","handbook.glossary":"Woordenlijst","handbook.search":"Zoeken in het handboek","handbook.results":"Resultaten voor \u201C{query}\u201D","handbook.no_results":"Niets gevonden.","handbook.read_more":"Lees meer in het handboek","lib.category":"Categorie","lib.count":"{n} planten","lib.perennial":"overblijvend","lib.height":"Hoogte","lib.roots":"wortels","lib.gdd":"Graaddagen tot oogst","lib.base":"basis","lib.per_person":"Planten per persoon \xB7 opbrengst","lib.deters":"Weert","lib.trap_for":"Vangplant voor","lib.allelopathic":"Remt buren","lib.shade_tolerant":"Verdraagt schaduw","lib.plant":"Plant","planner.layer_zones":"Zones tonen","planner.layer_features":"Paden & elementen tonen","planner.layer_plantings":"Gewassen tonen","planner.add_feature":"Element","planner.align.left":"Links uitlijnen","planner.align.right":"Rechts uitlijnen","planner.align.top":"Boven uitlijnen","planner.align.bottom":"Onder uitlijnen","planner.align.hcenter":"Horizontaal centreren","planner.align.vcenter":"Verticaal centreren","planner.align.hdistribute":"Horizontaal verdelen","planner.align.vdistribute":"Verticaal verdelen","planner.aligned":"{n} items uitgelijnd","planner.moved_n":"{n} items verplaatst","planner.removed_n":"{n} items verwijderd","planner.selected_n":"{n} geselecteerd","planner.multi_hint":"Shift- of Ctrl-klik om meerdere bedden of gewassen te kiezen; sleep, lijn uit of verdeel ze daarna.","planner.alternatives":"Past in","planner.better_neighbours":"Betere buren","planner.heat_stress":"{n} hete dagen op komst","print.options":"Afdrukopties","print.document":"Document","print.page":"Papier","print.orientation":"Richting","print.portrait":"Staand","print.landscape":"Liggend","print.colors":"Kleuren","print.beds":"Bedden","print.days":"Dagen vooruit","print.title":"Titel","print.notes":"Notitievlak (stippelraster)","print.grid":"Raster van 10 cm op bedfiches","print.labels":"Gewasnamen op de kaart","print.download":"PDF downloaden","print.refresh":"Voorbeeld vernieuwen","print.save_config":"Opslaan in /config/hortulus/exports","print.saved_to_config":"PDF opgeslagen (/config/hortulus/exports)","print.preview":"Voorbeeld","print.empty":"Nog geen voorbeeld.","print.page_n":"Pagina {n} van {total}","print.all_greenhouses":"Alle serres","print.all_zones":"Alle zones","print.remarkable_hint":"reMarkable Paper Pro: 179,6 \xD7 239,5 mm, extra marge links voor de werkbalk. E-inkkleuren gebruiken lichte tinten en patronen zodat je pen zichtbaar blijft. Stuur de PDF via de reMarkable-app of e-mail.","print.doc.garden":"Tuinplan","print.doc.garden.hint":"Zones, bedden, gewassen, legende","print.doc.zone":"Serre / zone","print.doc.zone.hint":"E\xE9n zone, ingezoomd","print.doc.beds":"Bedfiches","print.doc.beds.hint":"Een pagina per bed met raster","print.doc.tasks":"Takenlijst","print.doc.tasks.hint":"Open taken per week","print.doc.season":"Seizoensoverzicht","print.doc.season.hint":"Tijdlijn zaaien \u2192 oogst","print.doc.blank":"Planningsblad","print.doc.blank.hint":"Omtrekken om op te schetsen","print.doc.plants":"Plantkaarten","print.doc.plants.hint":"Kerngegevens per gewas","print.doc.book":"Seizoensboek","settings.flow_measured":"gemeten: {lpm} L/min","settings.valve_timer":"Kraantimer (min)","settings.valve_timer_none":"geen eigen timer","settings.leak_alerts":"Melden als de watermeter telt terwijl alle kranen dicht zijn","settings.leak_hint":"Met een watermeter leert Hortulus ook het werkelijke debiet per kraan; dat wordt gebruikt als je zelf geen debiet invult.","valve.leak":"De watermeter telde {liters} L in {minutes} minuten terwijl alle kranen dicht zijn","valve.leak_hint":"Een lek, of staat er een kraan open? ({entity})","plan.to_buy":"Te kopen","plan.todo_list":"Boodschappenlijst","plan.todo_send":"{n} op de lijst zetten","plan.todo_done":"{added} toegevoegd, {skipped} stonden er al op.","plan.todo_none":"Maak in Home Assistant een takenlijst (bv. Boodschappenlijst) om ontbrekend zaad met \xE9\xE9n klik op te zetten.","report.book":"Seizoensboek (PDF)","report.book_hint":"Het hele seizoen als boek om af te drukken: per maand, met je dagboek, foto's en oogst","print.doc.book.hint":"Je tuinjaar als boek: per maand, met dagboek, foto's en oogst","print.book_tip":"Een volledig boek met voorblad, inhoud, inleiding, een hoofdstuk per maand (zaaien, planten, werk, je dagboek met foto's, oogst, water en weer), het jaar in cijfers, woordenlijst, colofon en achterblad. Kies A5 en druk dubbelzijdig af (spiegelen langs de lange kant); het aantal bladzijden is een veelvoud van vier. De voorvertoning toont de eerste bladzijden.","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Volle kleur","print.color.eink":"E-ink (licht + patronen)","print.color.grayscale":"Grijstinten","settings.irrigation_hw":"Bewateringshardware","settings.irrigation_mode":"Modus","settings.irrigation_mode.off":"Uit","settings.irrigation_mode.advise":"Advies (alleen taken)","settings.irrigation_mode.auto":"Automatisch","settings.pump":"Pomp (schakelaar of kraan)","settings.start_time":"Starttijd","settings.max_runtime":"Max. looptijd per klep (min)","settings.frost_lockout":"Vorstvergrendeling onder (\xB0C)","settings.rain_skip":"Overslaan bij regenverwachting \u2265 (mm)","settings.pump_lead":"Pomp stopt v\xF3\xF3r klep (s)","settings.irrigation_hint":"{n} bedden hebben een klep. Stel per bed het debiet (L/min) in bij Bedden.","settings.resources":"Middelen (automatisch invullen)","settings.maintenance_tasks":"Seizoenswerk in de kalender (bodem klaarmaken, serre kuisen, winterrust ...)","settings.open_meteo":"Open-Meteo gebruiken voor vocht, wind en zon","settings.open_meteo_hint":"Optioneel en standaard uit: stuurt de afgeronde co\xF6rdinaten van de tuin naar api.open-meteo.com. Verbetert de verdampingsberekening (Penman-Monteith).","settings.elevation":"Hoogte (m)","settings.shade_entity":"Schaduwscherm (cover of schakelaar)","settings.climate_control":"Luchten & schaduw sturen","settings.climate_control.off":"Uit","settings.climate_control.advise":"Advies (taken)","settings.climate_control.auto":"Automatisch","settings.wall_heat":"Tegen een warme muur","settings.thermal_mass":"Thermische massa (watervaten, steen)","settings.sensor.par":"Licht (PAR)","settings.sensor.leaf_wetness":"Bladnat","settings.sensor.ec":"Bodem-EC","settings.sensor.npk_n":"Stikstof (N)","settings.sensor.npk_p":"Fosfor (P)","settings.sensor.npk_k":"Kalium (K)","task.postponed":"{title} {n} dag(en) uitgesteld","common.done":"Klaar","planner.removed_from":"{name} verwijderd vanaf seizoen {season} (historiek blijft).","planner.steps":"Bouw je tuinplan op in drie stappen","planner.step.site":"Terrein tekenen","planner.step.site.hint":"zones & elementen","planner.step.zones":"Zones inrichten","planner.step.zones.hint":"naam, bedden, eigen kaart","planner.step.plant":"Beplanten","planner.step.plant.hint":"zelf of door het systeem","planner.whole_garden":"Hele tuin","planner.zone_map":"Zonekaart","planner.site_intro":"Kies een zonetype of element en sleep een rechthoek op het raster (vakjes van 10 \xD7 10 cm). E\xE9n klik plaatst een standaardmaat. Dubbelklik op een zone om haar eigen kaart te openen.","planner.zones":"Zones","planner.elements":"Paden, gazon, bomen & meer","planner.your_zones":"Jouw zones","planner.no_zones":"Nog geen zones - begin met je moestuin, serre of boomgaard.","planner.open_zone":"Zonekaart openen","planner.next":"Volgende","planner.zones_intro":"Open een zone om ze een naam te geven en haar bedden op een eigen kaart te tekenen. Dit plan geldt voor dit seizoen; met de jaarovergang neem je het mee naar volgend jaar.","planner.n_beds":"{n} bedden","planner.zone_name":"Naam van de zone","planner.beds_in_zone":"Bedden & elementen in deze zone","planner.draw_bed":"Bed","planner.fill_by_hand":"Zelf invullen","planner.fill_by_system":"Laat het systeem invullen","planner.bed_needs_zone":"Teken een bed binnen een zone.","planner.draw_hint":"Sleep op het raster om te tekenen: {what}","planner.palette_for_zone":"Je ziet planten die passen in {zone}. Kies een categorie om alles te zien.","planner.perennial":"meerjarig","planner.bears_after":"vruchten na ~{n} jaar","planner.perennial_since":"Meerjarig - staat er sinds {season}. Op het einde van het jaar zet je hem expliciet over naar het volgende tuinplan (Jaarovergang).","planner.bearing_from":"Eerste oogst verwacht vanaf {season}.","planner.eco_tips":"Ecotips & huis-tuin-en-keukenmiddeltjes","planner.remove_perennial":"{name} verwijderen?","planner.remove_perennial_intro":"{name} werd geplant in {season} en staat elk jaar in je plan. Wat is er gebeurd?","planner.remove_from_season":"Weg vanaf {season}","planner.remove_from_season_hint":"Vorige jaren behouden hem (wisselteelthistoriek, oogsten, notities).","planner.remove_everywhere":"Volledig wissen","planner.remove_everywhere_hint":"Alsof hij nooit geplant werd - ook uit vorige jaren.","planner.legend.perennial":"meerjarig (blijft staan)","planner.legend.warning":"waarschuwing buren / wisselteelt","planner.legend.succession":"opeenvolgende zaai","planner.legend.rows":"zaairijen","planner.legend.border":"Randkleur = plantenfamilie (voor wisselteelt); het icoon toont het gewas zelf.","settings.zone_type.orchard":"Boomgaard","settings.zone_type.fruit":"Kleinfruit","settings.zone_type.herbs":"Kruidentuin","settings.zone_type.flowers":"Bloementuin","zone_hint.outdoor":"Moestuin: eenjarige gewassen met wisselteelt, bedden en paden.","zone_hint.greenhouse":"Serre: warmteminnende gewassen, klimaatsturing, verluchten en schaduw.","zone_hint.cold_frame":"Koude bak: afharden, vroege en late slaatjes.","zone_hint.orchard":"Boomgaard: fruitbomen die decennia blijven - jaarlijks snoeien, dunnen en oogsten.","zone_hint.fruit":"Kleinfruit: bessen, frambozen, druiven en kiwibessen.","zone_hint.herbs":"Kruidentuin: meerjarige en eenjarige kruiden, een bijenmagneet.","zone_hint.flowers":"Bloementuin: bestuivers, nuttige insecten en snijbloemen.","feature.terrace":"Terras","feature.lawn":"Gazon","feature.flowerbed":"Bloemperk","feature.fence":"Omheining","feature.pond":"Vijver","pollination.insects":"Heeft insecten nodig voor bestuiving - zet bloemen in de buurt.","pollination.wind":"Windbestuiving - plant in blokken, niet in \xE9\xE9n rij.","pollination.partner":"Heeft een bestuivingspartner (tweede ras) in de buurt nodig.","pollination.none":"Geen bestuiving nodig (blad, wortels).","planner.more":"Meer","settings.reminders":"Herinneringen","settings.overdue_reminders":"Herinner me aan blijven liggende taken","settings.overdue_time":"Tijdstip herinnering","settings.overdue_after":"Herinneren na (dagen te laat)","settings.weekly_plan":"Weekoverzicht vooraf","settings.weekly_day":"Dag","settings.weekly_time":"Tijdstip","settings.weather_aware":"Taken plannen volgens het weer","settings.weather_aware_hint":"Zaaien, uitplanten, spuiten, snoeien en mulchen schuiven automatisch naar de beste droge, vorstvrije en niet te hete dag binnen hun venster.","feature.house":"Huis","feature.driveway":"Oprit","feature.street":"Straat","feature.parking":"Parking","feature.play":"Speelhoek","feature.beehive":"Bijenkast","autofill.prefs":"Voorkeuren","autofill.freedom":"Keuzevrijheid van het systeem","autofill.freedom.strict":"Enkel wat ik wil","autofill.freedom.balanced":"Mijn wensen + doelen","autofill.freedom.free":"Vrij: verras me","autofill.pref.respect_companions":"Rekening houden met plantenburen","autofill.pref.add_pollinators":"Zelf bestuivingsbloemen toevoegen","autofill.pref.year_round":"Streven naar oogst het hele jaar","autofill.pref.allow_perennials":"Meerjarigen toegestaan","autofill.pref.match_zone_type":"Zonetype respecteren (boomgaard = fruit \u2026)","autofill.reason.pollinators":"bestuivers","nav.advice":"Advies","task.tools":"Je hebt nodig","advice.ask_title":"Vraag het aan Hortulus","advice.i_have":"Ik heb een","advice.mode.question":"vraag","advice.mode.problem":"probleem","advice.about":"met / over","advice.subject":"Onderwerp","advice.target":"Welke","advice.problem":"Vraag","advice.ask":"Vraag","advice.in_garden":"In je tuin","advice.all_plants":"Alle planten","advice.whole_garden":"de hele tuin","advice.subject.plant":"een plant / groente / fruit","advice.subject.greenhouse":"mijn serre","advice.subject.garden":"mijn tuin","advice.subject.bed":"een bed","advice.subject.tools":"gereedschap & benodigdheden","advice.q.status":"Hoe staat het ervoor?","advice.q.what_to_do":"Wat moet ik nu doen?","advice.q.when_sow":"Wanneer zaaien of planten?","advice.q.when_harvest":"Wanneer oogsten?","advice.q.growth":"het groeit slecht","advice.q.yellow_leaves":"gele bladeren","advice.q.wilting":"het hangt slap / verwelkt","advice.q.no_fruit":"bloeit maar geeft geen vruchten","advice.q.bolting":"het schiet door","advice.q.pests":"er zitten beestjes op","advice.q.disease":"vlekken, schimmel of rot","advice.q.feeding":"Hoe bemesten?","advice.q.watering":"Hoeveel water?","advice.q.pruning":"Hoe snoeien?","advice.q.companions":"Wat zet ik ernaast?","advice.q.too_hot":"het is te warm","advice.q.too_cold":"het is te koud","advice.q.winter_crops":"Wat kan er in de winter?","advice.q.year_round":"Hoe oogst ik het hele jaar?","advice.q.soil":"mijn grond is slecht","advice.q.slugs":"slakken!","advice.q.frost":"er komt vorst","advice.q.what_next":"Wat zet ik er hierna in?","advice.q.for_task":"Welk gereedschap voor deze klus?","advice.q.shopping":"Wat moet ik kopen?","advice.sec.status":"Nu in je tuin","advice.sec.facts":"Goed om te weten","advice.sec.causes":"Mogelijke oorzaken","advice.sec.actions":"Wat nu doen","advice.sec.remedies":"Eco- & huis-tuin-en-keukenmiddeltjes","advice.sec.prevention":"Volgende keer voorkomen","advice.sec.tasks":"Open taken","advice.read_more":"Lees meer in het handboek","advice.suggestions":"Voorstellen voor je tuin","advice.suggestions_intro":"Hortulus kijkt naar plaatsing, bestuiving, buren, oogst het hele jaar, bodem en ecologie.","advice.none":"Geen voorstellen - je plan ziet er prima uit!","advice.apply_add":"Toevoegen aan plan","advice.apply_open":"Toon in planner","advice.dismiss":"Verbergen","advice.no_space":"Geen vrije plaats in {bed}.","advice.kind.pollination":"Bestuiving","advice.kind.neighbours":"Buren","advice.kind.placement":"Plaatsing","advice.kind.year_round":"Hele jaar","advice.kind.soil":"Bodem","advice.kind.eco":"Ecologie","advice.kind.growth":"Groei","advice.kind.greenhouse":"Serre","advice.coverage":"Oogst per maand","advice.coverage_gaps":"Rode maanden hebben niets te oogsten - de voorstellen tonen wat ze opvult.","advice.coverage_full":"Elke maand iets te oogsten.","advice.nothing":"niets","advice.shopping":"Boodschappenlijst dit seizoen","advice.shopping_intro":"Berekend uit je plan: zaad, plantgoed, compost, bescherming en steun.","advice.nothing_to_buy":"Nog niets te kopen - plan eerst enkele teelten.","advice.tools_per_task":"Gereedschap per klus","advice.read_tools":"Gereedschap & zelf bemesting maken","advice.cat.seeds":"Zaad","advice.cat.plants":"Plantgoed","advice.cat.soil":"Bodem & bemesting","advice.cat.protection":"Bescherming","advice.cat.support":"Steun & mulch","advice.cat.other":"Overig","print.doc.year":"Jaarplan","print.doc.year.hint":"Maandmatrix: zaaien, planten, oogsten","nav.journal":"Logboek","task.assignee":"Toegewezen aan","task.anyone":"iedereen","task.harvested":"Geoogst:","journal.diary":"Dagboek","journal.harvest":"Oogst","journal.seeds":"Zaadvoorraad","journal.water":"Water","journal.new":"Nieuwe dagboeknotitie","journal.text":"Wat zag of deed je?","journal.placeholder":"Eerste tomaten kleuren, luizen op de tuinbonen \u2026","journal.kind":"Soort","journal.kind.note":"Notitie","journal.kind.observation":"Waarneming","journal.kind.problem":"Probleem","journal.kind.milestone":"Mijlpaal","journal.link":"Over","journal.whole_garden":"de hele tuin","journal.beds":"Bedden","journal.crops":"Teelten dit seizoen","journal.add_photo":"Foto toevoegen","journal.save":"Opslaan","journal.saved":"Bewaard in het dagboek.","journal.filter":"Filter","journal.all":"Alles","journal.empty":"Nog geen notities - schrijf op wat je ziet: de beste tuinleraar.","journal.log_harvest":"Oogst registreren","journal.what":"Gewas","journal.kg":"Gewicht (kg)","journal.count":"Aantal","journal.day":"Datum","journal.quality":"Kwaliteit","journal.learn_hint":"Hortulus leert hieruit je eigen opbrengst per m\xB2 en gebruikt die bij Automatisch invullen en advies.","journal.harvest_saved":"Oogst bewaard.","journal.harvest_season":"Oogst {season}","journal.crops_n":"{n} gewassen","journal.yield":"jouw opbrengst {kg} kg/m\xB2 (database {db})","journal.recent":"Laatste registraties","journal.no_harvest":"Nog niets geregistreerd.","journal.add_seed":"Zaadzakje toevoegen","journal.variety":"Ras","journal.year":"Jaar","journal.quantity":"Hoeveelheid","journal.unit":"Eenheid","journal.unit.packet":"zakje(s)","journal.unit.seeds":"zaden","journal.unit.g":"g","journal.source":"Herkomst","journal.source_hint":"winkel, ruil, eigen zaad \u2026","journal.seed_saved":"Zaadzakje bewaard.","journal.seed_missing":"Nog nodig voor dit seizoen","journal.seed_hint":"Zaad blijft 1-2 jaar (pastinaak, ui) tot 5-6 jaar (kolen, pompoenachtigen) goed. Oud zaad: doe een kiemproef.","journal.seed_box":"Zaaddoos","journal.status":"Status","journal.needed":"nodig dit seizoen","journal.seed.ok":"goed","journal.seed.use_soon":"dit jaar opmaken","journal.seed.expired":"oud (test het)","journal.seed.empty":"op","journal.seed.unknown":"jaar onbekend","journal.no_seeds":"Nog geen zaadzakjes.","journal.water_setup":"Koppel een watermeter en/of een niveausensor van de regenton in Instellingen \u203A Water om je tuinwater te volgen.","journal.water_week":"Leidingwater, 7 dagen","journal.water_season":"Leidingwater dit jaar","journal.rain_available":"Beschikbaar regenwater","journal.per_day":"Per dag (laatste 14 dagen)","journal.water_hint":"Watertaken vermelden hoeveel regenwater er nog is, zodat je dat eerst gebruikt.","cal.year":"Jaar","cal.tasks_per_month":"Taken","cal.act.sow_indoor":"binnen zaaien","cal.act.sow":"zaaien","cal.act.plant":"uitplanten","cal.act.grow":"groeit","cal.act.harvest":"oogsten","cal.act_short.sow_indoor":"Z","cal.act_short.sow":"Z","cal.act_short.plant":"P","cal.act_short.harvest":"O","settings.water":"Watermeter & regenton","settings.water_meter":"Watermeter tuin (m\xB3 of L)","settings.butt_level":"Peil regenton (%)","settings.butt_capacity":"Totale inhoud regentonnen (L)","settings.water_hint":"Hortulus bewaart \xE9\xE9n meting per dag. Je krijgt het verbruik per week, het regenwater dat nog beschikbaar is, en watertaken zeggen hoeveel je daarvan eerst kunt gebruiken.","settings.household":"Huishouden & spraak","settings.nobody":"Niemand (niet toegewezen)","settings.default_person":"Standaard gebruiken","settings.no_persons":"Geen personen gevonden. Voeg personen toe via Instellingen \u2192 Personen om taken toe te wijzen.","settings.assign_default":"Nieuwe taken gaan naar","settings.assign_per_type":"Per soort taak","settings.person_notify":"Persoonlijke herinneringen","settings.person_notify_hint":"Iedereen krijgt zijn eigen taken via deze notify-dienst (dagoverzicht en herinneringen voor achterstallige taken).","settings.voice":"Spraak (Assist)","settings.voice_hint":"Vraag Assist \u201Ewat moet ik vandaag in de tuin doen?\u201D, \u201Ehoeveel heb ik geoogst?\u201D, \u201Evriest het vannacht?\u201D. Installeer de zinnen \xE9\xE9n keer; ze werken in het Nederlands en Engels.","settings.voice_install":"Spraakzinnen installeren","settings.voice_installed":"Spraakzinnen ge\xEFnstalleerd","soil_test.title":"Bodemanalyse","soil_test.none":"Nog geen bodemanalyse.","soil_test.add":"Bodemanalyse toevoegen","soil_test.om":"Organische stof (%)","soil_test.lime":"Kalktoestand","soil_test.lime.low":"te laag","soil_test.lime.ok":"goed","soil_test.lime.high":"hoog","soil_test.hint":"Labo-rapport of thuistest. Hortulus past het bemestingsplan en kalkadvies van dit bed aan de laatste analyse aan.","cal.hours":"{n} u","planner.other_season":"{name} (seizoen {year})","journal.system":"Systeemlogboek","syslog.intro":"Elke wijziging in Hortulus staat hier: wat jij of een ander deed in het paneel, via automatiseringen, en wat Hortulus zelf aanpaste (taken, opruimen). Draai een regel terug om de toestand van v\xF3\xF3r die actie te herstellen; het terugdraaien zelf komt ook in het logboek en kan je dus weer ongedaan maken.","syslog.show_system":"Automatische acties van Hortulus tonen","syslog.empty":"Nog niets gelogd.","syslog.by_system":"Hortulus (automatisch)","syslog.by_unknown":"Automatisering of dienst","syslog.is_undone":"teruggedraaid","syslog.undo":"Terugdraaien","syslog.undone":"Teruggedraaid.","syslog.confirm":"Terugdraaien: {what}?","syslog.conflict":"{n} onderdeel/onderdelen zijn sindsdien opnieuw gewijzigd. Toch terugdraaien? Die latere wijzigingen gaan dan verloren.","syslog.blocked":"Kan niet terugdraaien: dit zou verwijzen naar een bed, zone of plant die intussen verwijderd is. Draai eerst die latere verwijdering terug.","syslog.more":"Oudere regels laden","syslog.and_more":"\u2026 en nog {n}","syslog.n_changes":"{verb} \u2013 {n} onderdelen","syslog.op.add":"Toegevoegd","syslog.op.remove":"Verwijderd","syslog.op.change":"Gewijzigd","syslog.op.mixed":"Aangepast","syslog.reason.plan":"planner","syslog.reason.import":"import","syslog.reason.tasks":"taken","syslog.reason.settings":"instellingen","syslog.reason.plants":"plantenbibliotheek","syslog.reason.records":"logboek","syslog.reason.auto":"automatisch","syslog.reason.undo":"Terugdraaiing","syslog.col.zones":"Zone","syslog.col.beds":"Bed","syslog.col.plantings":"Teelt","syslog.col.tasks":"Taak","syslog.col.custom_plants":"Eigen plant","syslog.col.features":"Tuinelement","syslog.col.harvest_log":"Oogst","syslog.col.journal":"Dagboeknotitie","syslog.col.seed_stock":"Zaadvoorraad","syslog.col.rotation_history":"Teeltgeschiedenis","syslog.col.irrigation_log":"Beregening","syslog.col.plant_overrides":"Plantgegevens","syslog.col.settings":"Instelling","planner.draw_site":"Terrein & elementen","planner.draw_planter":"Bloembak / pot","planner.draw_planter_hint":"Teken een bloembak, pot of plantenbak - die kan je daarna beplanten zoals een bed.","planner.new_planter":"Bloembak","planner.elements_in_zone":"Paden, terras, gazon, haag \u2026 in deze zone","planner.elements.buildings":"Gebouwen & verharding","planner.elements.paths":"Paden","planner.elements.green":"Groen","planner.elements.outdoor_living":"Buitenleven & uitrusting","feature.stone_path":"Stenen pad","feature.wood_path":"Houten pad","feature.stepping_stones":"Stapstenen","feature.bark_path":"Schorspad","feature.decking":"Vlonder","feature.wall":"Muur","feature.carport":"Carport / garage","feature.shrub":"Heester","feature.pool":"Zwembad","feature.seating":"Zithoek","settings.zone_type.garden":"Siertuin","settings.zone_type.containers":"Bloembakken & potten","zone_hint.garden":"Siertuin: heesters, borders en vaste planten rond gazon en terras.","zone_hint.containers":"Bloembakken & potten: op terras, balkon of vensterbank - teken elke bak of pot en beplant hem.","settings.display":"Weergave (deze browser)","settings.photos":"Foto's van planten tonen (Wikipedia)","settings.photos_hint":"Bovenop de tekening toont Hortulus een foto van Wikipedia, gezocht op de Latijnse naam. Je browser haalt die rechtstreeks op bij Wikipedia (met bronvermelding); zonder internet of als dit uit staat zie je de tekening.","nav.layout":"Tuinplan","advice.apply_transition":"Jaarovergang openen","layout.current":"huidig","layout.no_plan":"geen tuinplan","layout.edit":"Tuinplan bewerken","layout.to_planner":"Naar de planner","layout.make":"Tuinplan {season} maken","layout.planting_on":"op het tuinplan van {season} - zones, bedden en elementen pas je aan in Tuinplan","layout.started":"Tuinplan {season} gestart.","layout.none_title":"Nog geen tuinplan voor {season}","layout.none_intro":"Een tuinplan legt de vorm van je tuin vast voor \xE9\xE9n jaar: zones (volle grond, serre, potten \u2026), bedden en elementen zoals oprit, huis, haag, gras, tuinhuis of watervat - zonder planten. Begin vanaf een ander jaar of leeg.","layout.none_plant":"Je beplant een jaar op zijn eigen tuinplan, en voor {season} is er nog geen. Maak het in Tuinplan, of zet {live} over met de jaarovergang.","layout.none_hint":"Niets gaat vanzelf naar een nieuw jaar: het tuinplan en wat er doorloopt (vaste planten, overwinterende gewassen) zet je op het einde van het jaar expliciet over.","layout.copy_from":"Kopieer tuinplan {season}","layout.start_empty":"Leeg beginnen","year.button":"Jaarovergang","year.title_short":"Jaarovergang","year.title":"Jaarovergang {from} \u2192 {to}","year.intro":"Niets gaat vanzelf mee naar {to}. Kies welk deel van het tuinplan en welke gewassen je overzet; de rest blijft in {from}. Alles komt in het systeemlogboek en kan je terugdraaien.","year.plan":"Tuinplan","year.keep":"Gebruik het tuinplan dat je al voor {to} maakte","year.copy":"Kopieer het tuinplan van {from} (kies hieronder wat meegaat)","year.copy_hint":"Het tuinplan van {to} wordt een kopie van {from}. Vink uit wat niet meer meegaat.","year.elements":"Elementen (oprit, huis, haag, paden \u2026)","year.perennials":"Vaste planten, bomen en struiken","year.overwinter":"Overwinterende gewassen (lopen door na het einde van het jaar)","year.none":"Geen.","year.bed_gone":"bed niet in het nieuwe tuinplan","year.not_chosen":"Wat je niet aanvinkt, blijft in het oude jaar en krijgt geen taken in {to}.","year.activate":"Maak {to} meteen het actieve tuinjaar","year.activate_hint":"Het tuinplan van {from} wordt gearchiveerd en {to} wordt je tuin: taken, sensoren en beregening volgen het nieuwe plan.","year.prepare_hint":"Alleen voorbereiden: het tuinplan van {to} wordt klaargezet, {from} blijft je actieve tuin.","year.apply":"Overzetten naar {to}","year.done":"Je tuin staat nu in {season} - {n} gewas(sen) overgezet.","year.prepared":"Tuinplan {season} klaargezet - {n} gewas(sen) overgezet.","year.skipped":"{n} gewas(sen) niet overgezet: hun bed zit niet in het nieuwe tuinplan.","layout.save_first":"Je wijzigingen zijn nog niet opgeslagen - probeer het zo opnieuw.","reason.zone_type":"{zone} is een {zone_type}: daar horen {allowed}, geen {category}.","reason.not_under_glass":"Hoort niet onder glas ({zone}).","reason.too_late":"Te laat voor seizoen {season}: het zaai-/plantvenster liep tot {until}.","reason.too_late_nodate":"Te laat voor seizoen {season}: het zaai-/plantvenster is voorbij.","reason.frost_before_harvest":"Vorst ({frost}) komt v\xF3\xF3r de eerste oogst ({harvest}) - kies de serre of volgend jaar vroeger.","reason.rotation":"Wisselteelt: {family} stond hier in {season} - wacht {years} jaar.","reason.bad_neighbour":"Slechte buur: {plant} staat al in dit bed.","reason.no_space":"Geen plaats meer: {free_m2} m\xB2 vrij, nodig {need_m2} m\xB2.","reason.no_suitable_bed":"Geen bed waar dit gewas past.","reason.time_budget":"Past niet meer in je tijd per week.","reason.water_budget":"Past niet meer in je water per week.","reason.compost_budget":"Past niet meer in je compost.","autofill.mostly_late":"{n} gewassen zijn te laat voor seizoen {season}: hun zaai- of plantmoment is voorbij. Wil je {next} invullen?","autofill.fill_next":"{season} invullen","autofill.skipped_why":"waarom niet?","autoplan.plan_from":"Voor {season} is er nog geen tuinplan: het voorstel gebruikt het plan van {from}. Bij toepassen wordt dat plan voor {season} gekopieerd.","autoplan.no_plan":"Er is nog geen tuinplan voor {season} - teken het eerst in Tuinplan.","plans.button":"Plannen","plans.title":"Plannen voor {season}","plans.intro":"Begin opnieuw met een volledig nieuw plan. Het huidige plan - met zijn bedden en gewassen - wordt non-actief gezet en bewaard; je kunt het later weer actief maken.","plans.new":"Nieuw plan beginnen","plans.start.empty":"Volledig leeg (vanaf 0)","plans.start.empty.hint":"Geen zones, bedden, elementen of gewassen - je tekent alles opnieuw.","plans.start.zones":"Zelfde zones, leeg","plans.start.zones.hint":"De zones en de elementen (huis, paden, haag \u2026) blijven, zonder bedden en zonder gewassen.","plans.start.zones_beds":"Zelfde zones en bedden, zonder gewassen","plans.start.zones_beds.hint":"De hele indeling blijft; alleen alle gewassen van dit seizoen gaan eruit.","plans.old_name":"Naam voor het huidige plan","plans.old_name_hint":"bv. Plan {season} \u2013 eerste versie","plans.start_button":"Nieuw plan starten","plans.inactive":"Niet-actieve plannen","plans.none":"Nog geen niet-actieve plannen.","plans.counts":"{zones} zones \xB7 {beds} bedden \xB7 {plantings} gewassen","plans.activate":"Activeren","plans.confirm_new":"Het huidige plan van {season} wordt non-actief gezet (met zijn gewassen) en je begint een nieuw plan. Doorgaan?","plans.confirm_activate":"{name} weer actief maken voor {season}? Het plan dat nu actief is, wordt non-actief gezet.","plans.confirm_delete":"{name} definitief verwijderen? (Terugdraaien kan nog via het systeemlogboek.)","plans.started":"Nieuw plan voor {season} gestart - het vorige staat bij de niet-actieve plannen.","plans.activated":"{name} is weer actief.","plans.deleted":"{name} verwijderd.","nav.analysis":"Analyse","syslog.error":"Fout","analysis.check":"Controle","analysis.why":"Waarom niet?","analysis.errors":"Fouten","analysis.log":"Systeemlogboek","analysis.check_title":"Controle van je tuin","analysis.recheck":"Opnieuw controleren","analysis.check_intro":"Hortulus legt zijn tuinplannen, gewassen en seizoenen naast elkaar en zoekt wat niet klopt of wat onverwacht gedrag verklaart.","analysis.all_good":"Niets vreemds gevonden.","analysis.to_planner":"Naar de planner","analysis.count.zones":"Zones","analysis.count.beds":"Bedden","analysis.count.features":"Elementen","analysis.count.plantings":"Gewassen (alle jaren)","analysis.count.plans":"Jaren met tuinplan","analysis.count.archived_plans":"Niet-actieve plannen","analysis.count.log_entries":"Logboekregels","analysis.why_title":"Waarom past een plant (niet)?","analysis.why_intro":"Kies een plant en een seizoen: per bed zie je of hij past, en zo niet, waarom - dezelfde regels als bij slepen en bij Automatisch invullen.","analysis.no_beds":"Dit tuinplan heeft nog geen bedden.","analysis.free":"{m2} m\xB2 vrij","analysis.fits":"Past hier.","analysis.warning":"Let op","analysis.errors_title":"Fouten en geweigerde acties","analysis.errors_intro":"Elke actie die mislukte of geweigerd werd (bv. een plan dat niet klopte, een wijziging die tegelijk elders gebeurde) komt hier, met wanneer en door wie.","analysis.no_errors":"Geen fouten gelogd.","analysis.error.invalid_plan":"Plan geweigerd","analysis.error.revision_conflict":"Tegelijk elders gewijzigd","analysis.error.unknown_bed":"Onbekend bed","analysis.error.unknown_plant":"Onbekende plant","analysis.error.unknown_record":"Niet gevonden","analysis.error.unexpected":"Onverwachte fout","analysis.error.invalid_format":"Ongeldige gegevens","analysis.issue.transition_due":"De jaarovergang {from} \u2192 {to} is nog niet gedaan.","analysis.issue.transition_due.why":"Niets gaat vanzelf naar {to}: vaste planten en het tuinplan van {from} krijgen geen taken in {to} tot je ze overzet.","analysis.issue.season_without_plan":"Seizoen {season} heeft {n} gewas(sen) maar geen tuinplan.","analysis.issue.season_without_plan.why":"Zonder tuinplan toont de planner die gewassen niet. Kopieer of teken het tuinplan van {season}.","analysis.issue.planting_not_on_plan":"{n} gewas(sen) in {season} staan op een bed dat niet in het tuinplan van {season} zit: {plants}.","analysis.issue.planting_not_on_plan.why":"Ze zijn onzichtbaar op de kaart en krijgen geen taken. Meestal is het bed verwijderd of hoort het bij een ander jaar of een niet-actief plan. Zet het bed terug of verwijder de gewassen.","analysis.issue.unknown_plant":"Onbekende plant in {season}: {ids}.","analysis.issue.unknown_plant.why":"Een eigen plant werd verwijderd terwijl ze nog in het plan stond.","analysis.issue.bed_without_zone":"Bed {bed} ({season}) hoort bij geen enkele zone.","analysis.issue.bed_without_zone.why":"Geef het bed een zone in Tuinplan.","analysis.issue.bed_outside_zone":"Bed {bed} ligt (deels) buiten zone {zone} ({season}).","analysis.issue.bed_outside_zone.why":"Het bed telt voor zone {zone} (klimaat, sensoren), maar ligt er niet in. Verschuif het bed of vergroot de zone.","analysis.issue.zone_without_beds":"Zone {zone} heeft geen bedden ({season}).","analysis.issue.zone_without_beds.why":"In een zone zonder bed kan je niets planten - ook Automatisch invullen niet. Teken een bed (of bloembak) in Tuinplan.","analysis.issue.planting_outside_bed":"{plant} steekt buiten bed {bed} uit ({season}).","analysis.issue.planting_outside_bed.why":"Plantafstand en aantallen kloppen dan niet. Versleep of verklein de teelt.","analysis.issue.plantings_overlap":"{a} en {b} liggen over elkaar in {bed} ({season}).","analysis.issue.plantings_overlap.why":"Beide staan tegelijk op dezelfde plek: te weinig ruimte, en dat geeft de meldingen over overlappen.","analysis.issue.planting_too_late":"{plant} is voor {season} te laat gepland.","analysis.issue.planting_too_late.why":"Het zaai-/plantvenster is voorbij: de datums schuiven op naar vandaag en de oogst komt (te) laat. Plan het voor {next} of pas de datums aan.","analysis.issue.perennial_not_carried":"{n} vaste plant(en) werden niet meegenomen naar {season}: {plants}.","analysis.issue.perennial_not_carried.why":"Bij de jaarovergang niet aangevinkt - ze krijgen geen taken in {season}. Bewust? Anders: draai de jaarovergang terug via het systeemlogboek en doe ze opnieuw.","nav.crops":"Teelten","crops.intro":"Alle gewassen van dit seizoen op \xE9\xE9n lijst. Pas datums, methode, status, aantal en notities hier rechtstreeks aan - zonder iets te verslepen. Laat je een geplande datum leeg, dan rekent Hortulus ze zelf uit (grijs eronder).","crops.search":"Zoek op gewas, bed of zone","crops.group":"Ordenen","crops.group.bed":"per bed","crops.group.plant":"per gewas","crops.group.date":"op datum","crops.method":"Methode","crops.status":"Status","crops.count":"Aantal planten","crops.notes":"Notities","crops.computed":"berekend","crops.field.sow_date":"Zaaien (gepland)","crops.field.sown_on":"Gezaaid op","crops.field.transplant_date":"Uitplanten (gepland)","crops.field.transplanted_on":"Uitgeplant op","crops.field.harvest_started_on":"Oogst gestart","crops.field.finished_on":"Afgerond op","crops.late":"Te laat gepland voor dit seizoen - de datums schuiven op naar vandaag.","crops.no_bed":"geen bed in dit plan","crops.none":"Nog geen gewassen in {season}.","crops.window.sow":"Zaaivenster","crops.window.transplant":"Uitplantvenster","crops.in_ground":"In de grond","crops.harvest":"Oogst","crops.detail_hint":"Elke wijziging wordt meteen bewaard en komt in het systeemlogboek. Plaats en grootte pas je aan in de planner.","planner.why_here":"Waarom (niet) hier?","planner.to_crops":"In Teelten","planner.plant_info":"Plantinfo","planner.why_ok":"Past in {bed}.","planner.why_not":"Past niet goed in {bed}:","planner.why_no_bed":"Dit bed staat niet op het tuinplan van dit seizoen.","planner.why_fits_in":"Past wel in: {beds}.","planner.why_fits_nowhere":"Past dit seizoen in geen enkel bed.","planner.rotation_strip":"Vruchtwisseling: plantenfamilies in dit bed de laatste jaren","planner.late_title":"Seizoen {season} loopt ten einde","planner.late_still":"Dit kan nog: {n} planten. Klik er een aan om hem in het gekozen bed te zetten.","planner.late_none":"Er past dit seizoen bijna niets meer.","planner.late_add_hint":"In het geselecteerde bed zetten","planner.late_next":"Plan {season}","planner.drop_bad":"{plant} past hier niet goed","analysis.compare":"Vergelijken","analysis.badge":"{errors} fout(en), {warnings} waarschuwing(en)","analysis.fixed":"Opgelost. Je kan dit terugdraaien in het systeemlogboek.","analysis.export":"Diagnose exporteren","analysis.fix.season_without_plan":"Tuinplan kopi\xEBren","analysis.fix.planting_not_on_plan":"In een bed van dit plan zetten","analysis.fix.planting_outside_bed":"Terug in het bed zetten","analysis.fix.bed_outside_zone":"Bed in de zone schuiven","analysis.fix.perennial_not_carried":"Overzetten naar dit jaar","crops.bulk":"Meerdere teelten aanpassen","crops.bulk_n":"{n} geselecteerd","crops.bulk_date":"Datum","crops.pick_date":"Kies een datum","crops.bulk_apply":"Toepassen","crops.bulk_done":"{n} teelten aangepast.","crops.pick_all":"Alles selecteren","crops.show_on_map":"Toon op kaart","compare.title":"Plannen vergelijken","compare.intro":"Zet twee tuinplannen naast elkaar - van een seizoen of een niet-actief plan - en zie wat toegevoegd, verdwenen of veranderd is.","compare.button":"Vergelijk","compare.season_plan":"Tuinplan {season}","compare.inactive_plan":"{name} (niet-actief, {season})","compare.from":"Van","compare.to":"Naar","compare.identical":"Deze plannen zijn gelijk.","compare.zones":"Zones","compare.beds":"Bedden","compare.features":"Elementen","compare.crops":"Gewassen","compare.what.moved":"verplaatst of andere maat","compare.what.renamed":"hernoemd","compare.what.zone":"andere zone","compare.what.type":"ander type","compare.what.bed":"ander bed","compare.what.status":"andere status","valve.stuck_title":"Kraan staat open","valve.stuck":"{what} ({entity}) staat al veel langer open dan een beregeningsbeurt duurt.","valve.stuck_since":"Open sinds {time}. Hangt hij vast, of werd hij met de hand geopend?","valve.pump":"De pomp","valve.close":"Kraan sluiten","valve.closed":"Kraan is dicht.","valve.still_open":"De kraan meldt nog steeds: {state}. Kijk hem na.","valve.pump_test_hint":"De pomp test je samen met een bedkraan (knop bij het bed): zo draait hij nooit tegen een gesloten kraan.","valve.test":"Test (5 s)","valve.testing":"Bezig met testen\u2026","valve.test_confirm":"{entity} 5 seconden openen om te testen? (de pomp draait mee als die ingesteld is)","valve.test_ok":"Werkt: ging open ({open}) en weer dicht ({closed}).","valve.test_no_open":"Ging niet open: de kraan meldt {state}. Kijk de verbinding of de entiteit na.","valve.test_no_close":"Ging open, maar meldt na het sluiten nog {state}. Kijk de kraan na.","valve.test_save_first":"Sla de instellingen eerst op; Hortulus test alleen kranen die al gekoppeld zijn.","water.per_bed":"Bewatering per bed","water.days":"{n} dagen","water.given":"Water gegeven","water.rain":"Regen","water.moisture":"Bodemvocht","water.no_moisture":"geen vochtsensor","water.chart_title":"Bewatering van {bed}","water.chart_empty":"Nog geen gegevens voor deze periode.","water.chart_hint":"Bodemvocht komt uit de geschiedenis van Home Assistant, het gegeven water uit het logboek van Hortulus, regen uit de regensensor (dagmaximum). Zo zie je of een beurt echt doorging en effect had.","crops.view.list":"Lijst","crops.view.weeks":"Zaaiplan","crops.view.seeds":"Zaden","crops.view.follow":"Opvolgteelt","crops.view.harvest":"Oogstverwachting","crops.all_dates":"Alle datums","plan.act.sow_indoor":"Binnen zaaien","plan.act.sow_direct":"Buiten zaaien","plan.act.transplant":"Uitplanten","plan.act.harvest":"Oogst begint","plan.done":"Gedaan","plan.weeks_title":"Zaaiplan","plan.n_weeks":"{n} weken","plan.weeks_intro":"Wat je de komende weken binnen of buiten zaait, uitplant en begint te oogsten. Gedaan vult de echte datum (vandaag) in bij de teelt.","plan.overdue":"Achterstand ({n})","plan.week_of":"Week van {date}","plan.seeds_title":"Zaden voor {season}","plan.seeds_intro":"Hoeveel zaad het plan nog nodig heeft (aantal planten met een marge voor kieming, uitdunnen en vraat) tegenover je zaadvoorraad.","plan.plants":"Planten","plan.seeds":"Zaden","plan.in_stock":"In voorraad","plan.seed.ok":"Genoeg","plan.seed.check":"Nakijken","plan.seed.short":"Te weinig","plan.seed.none":"Kopen","plan.seeds_hint":"Zakjes en grammen kan Hortulus niet tellen: daar staat 'Nakijken'. Gekochte plantjes en wat al gezaaid is tellen niet mee.","plan.seeds_none":"Het plan heeft geen zaad meer nodig.","plan.follow_title":"Opvolgteelt","plan.follow_intro":"Bedden die dit seizoen vrijkomen en wat daar daarna nog past - zelfde regels als automatisch invullen, zonder dezelfde plantenfamilie.","plan.free_from":"vrij vanaf {date}","plan.after":"na {plants}","plan.ready_by":"oogst vanaf {date}","plan.follow_nothing":"Daarna past er dit seizoen niets meer.","plan.follow_none":"Geen bedden die dit seizoen nog vrijkomen.","plan.harvest_title":"Oogstverwachting {season}","plan.harvest_intro":"Verwachte oogst per week, samen ongeveer {kg} kg. Gebaseerd op de oppervlakte, de opbrengst per m\xB2 (je eigen oogsten waar die er zijn) en het oogstvenster.","plan.learned":"jouw opbrengst","plan.book_yield":"gemiddelde opbrengst","plan.harvest_none":"Nog geen oogst verwacht in dit seizoen.","note.title":"Notitie of foto","note.placeholder":"Wat zie je? (bv. bladluis, eerste bloem, slakkenvraat)","note.photo":"Foto","note.save":"Bewaren","journal.report":"Seizoensrapport","report.title":"Seizoensrapport {season}","report.crops":"Gewassen","report.plantings":"teelten","report.harvest":"Oogst","report.expected":"verwacht","report.failed":"Mislukt","report.water":"Water gegeven","report.runs":"beurten","report.notes":"Notities","report.per_crop":"Per gewas","report.problems":"Problemen uit het logboek","report.milestones":"Mijlpalen","report.download":"Download (Markdown)","report.empty":"Nog niets geplant of geoogst in dit seizoen.","report.hint":"'Verwacht' rekent met de gemiddelde opbrengst per m\xB2. Registreer je oogst in Logboek \u2192 Oogst, dan leert Hortulus jouw opbrengst en wordt de oogstverwachting volgend jaar nauwkeuriger.","report.verdict.failed":"mislukt","report.verdict.no_record":"geen oogst geregistreerd","report.verdict.above":"beter dan verwacht","report.verdict.below":"minder dan verwacht","report.verdict.as_expected":"zoals verwacht","report.verdict.ok":"\u2013","report.verdict.growing":"groeit nog","report.running":"Het seizoen loopt nog: wat nog niet geoogst is, staat als 'groeit nog'."};var Fn={en:$s,nl:Ma},_t=h=>(h??"en").toLowerCase().split(/[-_]/)[0]==="nl"?"nl":"en";function Wt(h){let o=Fn[_t(h)];return(e,t={})=>(o[e]??$s[e]??e).replace(/\{(\w+)\}/g,(a,n)=>{let r=t[n];return r==null?`{${n}}`:e.startsWith("alert.")&&n==="level"?o[`risk.${r}`]??String(r):e.startsWith("alert.")&&n==="when"?o[String(r)]??String(r):Array.isArray(r)?r.join(", "):String(r)})}var Un=h=>h.replace(/_/g," ").replace(/^\w/,o=>o.toUpperCase()),Sa={aphids:"bladluis",whitefly:"witte vlieg",red_spider_mite:"spint",thrips:"trips",slugs:"slakken",cabbage_white:"koolwitje",cabbage_root_fly:"koolvlieg",flea_beetle:"aardvlo",carrot_fly:"wortelvlieg",onion_fly:"uienvlieg",leek_moth:"preimot",pea_moth:"erwtenbladroller",birds:"vogels",pigeons:"duiven",black_bean_aphid:"zwarte bonenluis",bean_weevil:"bonenkever",leaf_miner:"bladmineerder",late_blight:"phytophthora",early_blight:"alternaria (vroeg)",blossom_end_rot:"neusrot",botrytis:"grauwe schimmel",powdery_mildew:"echte meeldauw",downy_mildew:"valse meeldauw",cucumber_mosaic_virus:"komkommermoza\xEFekvirus",clubroot:"knolvoet",white_rot:"witrot",rust:"roest",alternaria:"alternaria",leaf_spot:"bladvlekken",root_rot:"wortelrot",anthracnose:"vlekkenziekte",halo_blight:"vetvlekkenziekte",chocolate_spot:"chocoladevlekken",damping_off:"kiemplantenziekte",ants:"mieren",asparagus_beetle:"aspergekever",canker:"kanker",celery_fly:"selderijvlieg",colorado_beetle:"coloradokever",nematodes:"aaltjes",scab:"schurft",smut:"builenbrand",verticillium_wilt:"verwelkingsziekte",wireworm:"ritnaald"},kt=(h,o)=>_t(o)==="nl"&&Sa[h]?Sa[h]:Un(h);var Ea=S`
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
    /* editorial serif for display type - the same voice as the printed season book */
    --hl-font-serif: "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", "URW Palladio L", Georgia, serif;
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
    /* layered, warm-tinted elevation (ambient + key light) */
    --hl-shadow-1: 0 1px 1px rgba(46, 33, 24, 0.04), 0 2px 4px rgba(46, 33, 24, 0.04), 0 0 0 1px rgba(46, 33, 24, 0.02);
    --hl-shadow-2: 0 1px 2px rgba(46, 33, 24, 0.05), 0 4px 8px rgba(46, 33, 24, 0.06), 0 12px 24px rgba(46, 33, 24, 0.06);
    --hl-shadow-3: 0 2px 4px rgba(46, 33, 24, 0.06), 0 12px 24px rgba(46, 33, 24, 0.12), 0 32px 64px rgba(46, 33, 24, 0.14);
    --hl-shadow-primary: 0 1px 2px rgba(31, 61, 28, 0.25), 0 4px 12px rgba(59, 115, 52, 0.28);
    --hl-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.65);
    --hl-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
    --hl-ease-spring: cubic-bezier(0.34, 1.4, 0.64, 1);
    --hl-dur: 160ms;
    --hl-dur-slow: 320ms;
    /* seasonal light for heroes and covers */
    --hl-grad-spring: linear-gradient(135deg, #e9f3df 0%, #cfe6bd 45%, #a9d18e 100%);
    --hl-grad-summer: linear-gradient(135deg, #fff4dc 0%, #ffe1a6 45%, #f6c26b 100%);
    --hl-grad-autumn: linear-gradient(135deg, #fbeadb 0%, #f2c6a0 45%, #d98e57 100%);
    --hl-grad-winter: linear-gradient(135deg, #eef3f7 0%, #d6e3ee 45%, #b3c9dc 100%);
    --hl-hero-ink: #1f2a1c;

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
    --hl-shadow-1: 0 1px 2px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.02);
    --hl-shadow-2: 0 2px 4px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.35);
    --hl-shadow-3: 0 12px 32px rgba(0, 0, 0, 0.5), 0 32px 64px rgba(0, 0, 0, 0.4);
    --hl-shadow-primary: 0 1px 2px rgba(0, 0, 0, 0.4), 0 4px 14px rgba(120, 184, 102, 0.22);
    --hl-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    --hl-grad-spring: linear-gradient(135deg, #1e2a19 0%, #24361d 50%, #2f4a25 100%);
    --hl-grad-summer: linear-gradient(135deg, #2a2416 0%, #3a2f17 50%, #4a3a17 100%);
    --hl-grad-autumn: linear-gradient(135deg, #2b1f17 0%, #3a2618 50%, #4a2e19 100%);
    --hl-grad-winter: linear-gradient(135deg, #1a2129 0%, #1f2b36 50%, #263848 100%);
    --hl-hero-ink: #eef3ea;
    color-scheme: dark;
  }
`,Ta=S`
  :host([theme="earth"]) {
    --hl-primary: #8a4f2a; --hl-primary-hover: #723f20; --hl-chip-active-fg: #723f20;
    --hl-leaf-100: #f4e6da; --hl-leaf-50: #faf3ec; --hl-leaf-300: #d8b394; --hl-accent: #c8743a;
    --hl-bg: #f7f1e8; --hl-surface-2: #f1e8dc; --hl-surface-3: #e6d9c7; --hl-border: #e3d5c3;
    --hl-shadow-primary: 0 1px 2px rgba(80, 40, 15, 0.25), 0 4px 12px rgba(138, 79, 42, 0.28);
    --hl-grad-spring: linear-gradient(135deg, #f8ede2 0%, #ecd3bb 45%, #d9ad86 100%);
    --hl-grad-summer: linear-gradient(135deg, #fbefdc 0%, #f1cf9c 45%, #dfa760 100%);
    --hl-grad-autumn: linear-gradient(135deg, #f7e4d6 0%, #e6b08c 45%, #c47a4c 100%);
    --hl-grad-winter: linear-gradient(135deg, #f1ebe4 0%, #ddcfc0 45%, #bfa98f 100%);
  }
  :host([theme="earth"][dark]) {
    --hl-primary: #e0a074; --hl-primary-hover: #ecb68f; --hl-on-primary: #2a1608; --hl-chip-active-fg: #e0a074;
    --hl-bg: #17120e; --hl-surface: #211a14; --hl-surface-2: #2a2119; --hl-surface-3: #352a20; --hl-border: #3a2e23;
    --hl-leaf-100: #3a281b; --hl-leaf-50: #2a1f16; --hl-leaf-300: #7a5236;
    --hl-grad-spring: linear-gradient(135deg, #2a1d14 0%, #3a2819 50%, #4a321e 100%);
    --hl-grad-summer: var(--hl-grad-spring); --hl-grad-autumn: var(--hl-grad-spring); --hl-grad-winter: var(--hl-grad-spring);
  }
  :host([theme="night"]) {
    --hl-bg: #0d1214; --hl-surface: #141b1e; --hl-surface-2: #1a2327; --hl-surface-3: #223035; --hl-border: #24323a;
    --hl-primary: #8fd0b0; --hl-primary-hover: #a6dcc1; --hl-on-primary: #0b1f16; --hl-chip-active-fg: #8fd0b0;
    --hl-accent: #c9b8ff; --hl-leaf-100: #183028; --hl-leaf-50: #12221d; --hl-leaf-300: #3d7a62;
    --hl-grad-spring: linear-gradient(135deg, #10201c 0%, #15302a 50%, #1c3e36 100%);
    --hl-grad-summer: linear-gradient(135deg, #141a2b 0%, #1a2340 50%, #232f55 100%);
    --hl-grad-autumn: linear-gradient(135deg, #1b1424 0%, #251a33 50%, #302144 100%);
    --hl-grad-winter: linear-gradient(135deg, #0f1724 0%, #142036 50%, #1a2a48 100%);
  }
  :host([theme="season-spring"]) { --hl-primary: #3f8a3a; --hl-primary-hover: #34742f; --hl-accent: #e88fb0; --hl-bg: #f6f9f1; }
  :host([theme="season-summer"]) { --hl-primary: #3b7334; --hl-accent: #f2b544; --hl-bg: #fbf7ec; --hl-surface-2: #f6efdc; }
  :host([theme="season-autumn"]) {
    --hl-primary: #9a4b22; --hl-primary-hover: #823d1a; --hl-chip-active-fg: #823d1a; --hl-accent: #d98e2b;
    --hl-leaf-100: #f6e5d6; --hl-leaf-50: #fbf2ea; --hl-leaf-300: #e0b48f; --hl-bg: #faf4ec;
    --hl-shadow-primary: 0 1px 2px rgba(80, 35, 10, 0.25), 0 4px 12px rgba(154, 75, 34, 0.28);
  }
  :host([theme="season-winter"]) {
    --hl-primary: #2f6690; --hl-primary-hover: #25557a; --hl-chip-active-fg: #25557a; --hl-accent: #9fb8cf;
    --hl-leaf-100: #e1ecf5; --hl-leaf-50: #f0f5fa; --hl-leaf-300: #9fc0dc; --hl-bg: #f4f7fa;
    --hl-shadow-primary: 0 1px 2px rgba(20, 45, 70, 0.25), 0 4px 12px rgba(47, 102, 144, 0.28);
  }
  :host([theme^="season-"][dark]) { --hl-bg: #131811; --hl-primary: #8fcb7c; --hl-on-primary: #10200d; --hl-leaf-100: #24331f; --hl-leaf-50: #1d2819; --hl-leaf-300: #4f7a43; }
`,L=S`
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
  h1 { font-family: var(--hl-font-serif); font-size: var(--hl-fs-3xl); font-weight: 600; letter-spacing: -0.015em; }
  h2 { font-family: var(--hl-font-serif); font-size: var(--hl-fs-xl); font-weight: 600; letter-spacing: -0.005em; }
  h3 { font-size: var(--hl-fs-lg); font-weight: 600; }
  h4 { font-size: var(--hl-fs-md); font-weight: 600; }
  p { margin: 0; }
  .muted { color: var(--hl-text-muted); }
  .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--hl-text-muted); }
  .num, td, .big, .temp { font-variant-numeric: tabular-nums; }
  ::selection { background: color-mix(in srgb, var(--hl-leaf-300) 55%, transparent); }
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
    border: 1px solid color-mix(in srgb, var(--hl-border) 80%, transparent);
    border-radius: var(--hl-r-lg);
    box-shadow: var(--hl-shadow-1), var(--hl-highlight);
    padding: var(--hl-s5);
    transition: box-shadow var(--hl-dur-slow) var(--hl-ease), transform var(--hl-dur-slow) var(--hl-ease);
  }
  .card:hover { box-shadow: var(--hl-shadow-2), var(--hl-highlight); }
  .card > header { display: flex; align-items: center; gap: var(--hl-s2); margin-bottom: var(--hl-s4); }
  .card > header h2 { font-size: 19px; }

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
  .btn { box-shadow: var(--hl-shadow-1); }
  .btn:hover { box-shadow: var(--hl-shadow-2); }
  .btn.primary {
    background: linear-gradient(180deg, color-mix(in srgb, var(--hl-primary) 88%, #fff) 0%, var(--hl-primary) 100%);
    border-color: color-mix(in srgb, var(--hl-primary) 70%, #000); color: var(--hl-on-primary);
    box-shadow: var(--hl-shadow-primary), inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }
  .btn.primary:hover { background: linear-gradient(180deg, var(--hl-primary) 0%, var(--hl-primary-hover) 100%); transform: translateY(-1px); }
  .btn.primary:active { transform: translateY(0) scale(0.98); }
  .btn.danger { color: var(--hl-danger); border-color: color-mix(in srgb, var(--hl-danger) 40%, transparent); }
  .btn.danger:hover { background: var(--hl-tomato-100); }
  .btn.ghost { background: transparent; border-color: transparent; box-shadow: none; }
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
  input:focus, select:focus, textarea:focus {
    outline: none; border-color: var(--hl-primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--hl-primary) 22%, transparent);
  }
  input[aria-invalid="true"] { border-color: var(--hl-danger); }
  input:disabled, select:disabled { opacity: 0.55; cursor: not-allowed; }
  input[type="checkbox"] { width: 18px; min-height: 18px; accent-color: var(--hl-primary); }
  .field-error { color: var(--hl-danger); font-size: var(--hl-fs-xs); }

  /* -- misc ----------------------------------------------------------- */
  .family-dot { width: 10px; height: 10px; border-radius: 50%; flex: none; display: inline-block; }
  .empty { padding: var(--hl-s6); text-align: center; color: var(--hl-text-muted); font-family: var(--hl-font-serif); font-style: italic; }

  /* -- data tables ------------------------------------------------------ */
  table th { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--hl-text-muted); }
  table tbody tr { transition: background var(--hl-dur) var(--hl-ease); }
  table tbody tr:hover { background: color-mix(in srgb, var(--hl-leaf-50) 70%, transparent); }

  /* -- motion ------------------------------------------------------------ */
  @keyframes hl-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  @keyframes hl-shimmer { from { background-position: -400px 0; } to { background-position: 400px 0; } }
  .rise { animation: hl-rise var(--hl-dur-slow) var(--hl-ease) both; }
  .skeleton {
    border-radius: var(--hl-r-sm); min-height: 14px;
    background: linear-gradient(90deg, var(--hl-surface-2) 0%, var(--hl-surface-3) 50%, var(--hl-surface-2) 100%);
    background-size: 800px 100%; animation: hl-shimmer 1.4s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }

  /* -- scrollbars ------------------------------------------------------- */
  * { scrollbar-width: thin; scrollbar-color: var(--hl-surface-3) transparent; }
  .divider { height: 1px; background: var(--hl-border); margin: var(--hl-s3) 0; }
  ha-icon { --mdc-icon-size: 20px; }
`;var Gn=5*6e4;function Zt(h,o=40,e=!1){let t=h??"cloudy",s=b`<g><circle cx="22" cy="20" r="8" fill="#F2B544"/>
    ${[0,45,90,135,180,225,270,315].map($=>b`<line x1=${22+Math.cos($*Math.PI/180)*11.5} y1=${20+Math.sin($*Math.PI/180)*11.5}
      x2=${22+Math.cos($*Math.PI/180)*15} y2=${20+Math.sin($*Math.PI/180)*15} stroke="#F2B544" stroke-width="2.2" stroke-linecap="round"/>`)}</g>`,a=b`<path d="M26 8a11 11 0 1 0 10 15 9 9 0 0 1-10-15z" fill="#C9D6E8"/>`,n=($="#E3E9EF",T=0)=>b`<path transform="translate(0 ${T})" d="M14 38h22a8 8 0 0 0 0-16 11 11 0 0 0-21-2 7 7 0 0 0-1 18z" fill=${$} stroke="#AEB9C4" stroke-width="1.2"/>`,r=$=>b`${Array.from({length:$},(T,k)=>b`<line x1=${17+k*7} y1="41" x2=${15+k*7} y2="47" stroke="#4A90C8" stroke-width="2.2" stroke-linecap="round"/>`)}`,l=b`${[17,25,33].map($=>b`<circle cx=${$} cy="44" r="1.8" fill="#9DB7D1"/>`)}`,d=b`<path d="M26 36l-5 8h4l-2 7 7-10h-4l3-5z" fill="#F2B544"/>`,c=b`${[30,36,42].map($=>b`<line x1="10" y1=${$} x2="40" y2=${$} stroke="#AEB9C4" stroke-width="2.4" stroke-linecap="round"/>`)}`,g=b`<path d="M8 22h22a4 4 0 1 0-4-4M8 30h28a4 4 0 1 1-4 4M8 38h16" fill="none" stroke="#8FA3B5" stroke-width="2.4" stroke-linecap="round"/>`,v;switch(t){case"sunny":v=s;break;case"clear-night":v=a;break;case"partlycloudy":v=b`${e?a:s}${n("#EEF2F6",4)}`;break;case"rainy":v=b`${n()}${r(3)}`;break;case"pouring":v=b`${n("#CBD5DF")}${r(4)}`;break;case"snowy":case"snowy-rainy":case"hail":v=b`${n()}${l}`;break;case"lightning":case"lightning-rainy":v=b`${n("#CBD5DF")}${d}`;break;case"fog":v=b`${n("#EEF2F6",-6)}${c}`;break;case"windy":case"windy-variant":v=g;break;default:v=n()}return i`<svg width=${o} height=${o} viewBox="0 0 50 50" aria-hidden="true">${v}</svg>`}var be=class extends E{constructor(){super(...arguments);this.lang="en";this.daily=[];this.hourly=[];this.radarTick=Date.now();this.radarFailed=!1;this.unsubs=[];this.subscribedTo=""}get entityId(){return this.snapshot.settings.weather_entity??null}willUpdate(e){(e.has("snapshot")||e.has("hass"))&&this.hass&&this.entityId&&this.entityId!==this.subscribedTo&&this.subscribe(this.entityId)}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>this.radarTick=Date.now(),Gn)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer),this.unsubscribe(),this.subscribedTo=""}unsubscribe(){for(let e of this.unsubs)e.then(t=>t()).catch(()=>{});this.unsubs=[]}subscribe(e){this.unsubscribe(),this.subscribedTo=e;for(let t of["daily","hourly"]){let s=this.hass.connection.subscribeMessage(a=>{t==="daily"?this.daily=a.forecast??[]:this.hourly=a.forecast??[]},{type:"weather/subscribe_forecast",entity_id:e,forecast_type:t});s.catch(()=>{}),this.unsubs.push(s)}}cond(e){return this.t(`weather.cond.${e??"unknown"}`)}fmtDay(e,t){return new Date(e).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",t)}sky(e){return e==="sunny"||e==="partlycloudy"?"var(--hl-grad-summer)":e==="rainy"||e==="pouring"||e==="lightning-rainy"||e==="lightning"||e==="snowy"||e==="snowy-rainy"||e==="hail"||e==="fog"||e==="clear-night"?"var(--hl-grad-winter)":"var(--hl-grad-spring)"}hints(){let e=[],t=this.daily.slice(0,7),s=this.snapshot.settings.irrigation?.frost_lockout_c??2,a=this.snapshot.settings.irrigation?.rain_skip_mm??3,n=t.filter(c=>c.templow!=null&&c.templow<=s);if(n.length){let c=n.reduce((g,v)=>(g.templow??99)<=(v.templow??99)?g:v);e.push({cls:"frost",title:this.t(n.length===1?"weather.hint.frost_title_one":"weather.hint.frost_title",{n:n.length}),text:this.t("weather.hint.frost",{day:this.fmtDay(c.datetime,{weekday:"long"}),t:Math.round(c.templow??0)})})}let r=t.filter(c=>(c.temperature??0)>=28);if(r.length){let c=r.reduce((g,v)=>(g.temperature??0)>=(v.temperature??0)?g:v);e.push({cls:"heat",title:this.t(r.length===1?"weather.hint.heat_title_one":"weather.hint.heat_title",{n:r.length}),text:this.t("weather.hint.heat",{day:this.fmtDay(c.datetime,{weekday:"long"}),t:Math.round(c.temperature??0)})})}let l=t.slice(0,3).reduce((c,g)=>c+(g.precipitation??0),0);l>=a?e.push({cls:"wet",title:this.t("weather.hint.rain_title",{mm:Math.round(l)}),text:this.t("weather.hint.rain")}):t.length>=5&&t.slice(0,5).every(c=>(c.precipitation??0)<1)&&e.push({cls:"dry",title:this.t("weather.hint.dry_title"),text:this.t("weather.hint.dry")});let d=Object.values(this.snapshot.analysis?.beds??{}).filter(c=>c.irrigation?.action==="water").length;return d&&e.push({cls:"dry",title:this.t(d===1?"weather.hint.beds_title_one":"weather.hint.beds_title",{n:d}),text:this.t("weather.hint.beds")}),e}renderHours(){let e=this.hourly.slice(0,24);if(e.length<2)return i`<p class="small muted">${this.t("weather.no_hourly")}</p>`;let t=720,s=190,a=14,n=14,r=34,l=34,d=e.map(_=>_.temperature??0),c=Math.floor(Math.min(...d))-1,g=Math.ceil(Math.max(...d))+1,v=_=>a+_/(e.length-1)*(t-a-n),$=_=>r+(1-(_-c)/Math.max(1,g-c))*(s-r-l-26),T=d.map((_,A)=>`${A?"L":"M"}${v(A).toFixed(1)},${$(_).toFixed(1)}`).join(" "),k=`${T} L${v(e.length-1)},${s-l} L${v(0)},${s-l} Z`,M=Math.max(2,...e.map(_=>_.precipitation??0)),R=(t-a-n)/e.length*.6;return i`<svg viewBox="0 0 ${t} ${s}" role="img" aria-label=${this.t("weather.hours")}>
      <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2b544" stop-opacity="0.35"/><stop offset="1" stop-color="#f2b544" stop-opacity="0"/></linearGradient></defs>
      ${e.map((_,A)=>(_.precipitation??0)>0?b`<rect x=${v(A)-R/2} width=${R} y=${s-l-(_.precipitation??0)/M*40} height=${(_.precipitation??0)/M*40}
        rx="2" fill="#4a90c8" fill-opacity="0.55"><title>${_.precipitation} mm</title></rect>`:u)}
      <path d=${k} fill="url(#tg)"/>
      <path d=${T} fill="none" stroke="#e08a2e" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
      ${e.map((_,A)=>A%3===0?b`
        <circle cx=${v(A)} cy=${$(_.temperature??0)} r="3" fill="#e08a2e"/>
        <text x=${v(A)} y=${$(_.temperature??0)-9} text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">${Math.round(_.temperature??0)}°</text>
        <text x=${v(A)} y=${s-10} text-anchor="middle" font-size="11" fill="var(--hl-text-muted)">${new Date(_.datetime).toLocaleTimeString(this.lang==="nl"?"nl-BE":"en-GB",{hour:"2-digit"})}</text>`:u)}
    </svg>`}renderDays(){let e=this.daily.slice(0,10);if(!e.length)return i`<p class="small muted">${this.t("weather.no_daily")}</p>`;let t=e.map(d=>d.templow??d.temperature??0),s=e.map(d=>d.temperature??0),a=Math.min(...t),n=Math.max(...s),r=d=>(d-a)/Math.max(1,n-a)*100,l=this.snapshot.settings.irrigation?.frost_lockout_c??2;return i`<div class="days">${e.map((d,c)=>{let g=d.templow??d.temperature??0,v=d.temperature??0;return i`<div class="day">
        <span class="name">${c===0?this.t("common.today"):this.fmtDay(d.datetime,{weekday:"long"})}<small>${this.fmtDay(d.datetime,{day:"numeric",month:"short"})}</small></span>
        <span title=${this.cond(d.condition)}>${Zt(d.condition,36)}</span>
        <span class="rain">${d.precipitation?`${d.precipitation} mm`:""}${d.precipitation_probability!=null?i`<br />${d.precipitation_probability}%`:u}</span>
        <span style="display:grid;grid-template-columns:32px 1fr 32px;gap:8px;align-items:center">
          <span class="tmin">${Math.round(g)}°</span>
          <span class="range"><span style="left:${r(g)}%;right:${100-r(v)}%"></span></span>
          <span class="tmax">${Math.round(v)}°</span></span>
        <span class="tags">
          ${g<=l?i`<span class="chip cold">${this.t("weather.tag.frost")}</span>`:u}
          ${v>=28?i`<span class="chip warn">${this.t("weather.tag.heat")}</span>`:u}
        </span>
      </div>`})}</div>`}radarSrc(){let e=Object.keys(this.hass.states).find(s=>s.startsWith("camera.")&&/buienradar|radar|regen|rain/i.test(s));if(e){let s=this.hass.states[e].attributes.access_token;return{src:`/api/camera_proxy/${e}?token=${s??""}&t=${this.radarTick}`,source:e,link:""}}let t=(this.hass.config?.country??(this.lang==="nl"?"NL":"")).toUpperCase();return t!=="NL"&&t!=="BE"?null:{src:`https://api.buienradar.nl/image/1.0/RadarMap${t}?w=500&h=512&t=${this.radarTick}`,source:"Buienradar",link:t==="BE"?"https://www.buienradar.be":"https://www.buienradar.nl"}}renderRadar(){let e=this.radarSrc();return e?i`<div class="radar">
      ${this.radarFailed?i`<p class="small muted">${this.t("weather.radar_failed")}</p>`:i`<img src=${e.src} alt=${this.t("weather.radar")} loading="lazy"
        @error=${()=>this.radarFailed=!0} @load=${()=>this.radarFailed=!1} />`}
      <p class="muted-note" style="margin-top:6px">${this.t("weather.radar_source",{source:e.source})}
        ${e.link?i` · <a href=${e.link} target="_blank" rel="noopener">${e.link.replace("https://www.","")}</a>`:u}</p>
    </div>`:i`<p class="small muted">${this.t("weather.radar_none")}</p>`}render(){let e=this.entityId;if(!e||!this.hass.states[e])return i`<section class="card"><h2>${this.t("weather.title")}</h2><p class="small muted" style="margin-top:8px">${this.t("weather.no_entity")}</p></section>`;let t=this.hass.states[e],s=t.attributes,a=this.hourly[0]?.is_daytime===!1||t.state==="clear-night",n=this.hints();return i`
      <section class="now" style=${`--sky:${this.sky(t.state)}`}>
        ${Zt(t.state,92,a)}
        <div>
          <div class="eyebrow">${this.t("weather.now")} · ${String(s.friendly_name??e)}</div>
          <div class="temp">${s.temperature!=null?Math.round(Number(s.temperature)):"\u2013"}°</div>
          <div class="cond">${this.cond(t.state)}</div>
        </div>
        <div class="facts">
          ${s.humidity!=null?i`<span>${this.t("weather.humidity")}</span><b>${Math.round(Number(s.humidity))} %</b>`:u}
          ${s.wind_speed!=null?i`<span>${this.t("weather.wind")}</span><b>${Math.round(Number(s.wind_speed))} ${s.wind_speed_unit??"km/h"}</b>`:u}
          ${s.pressure!=null?i`<span>${this.t("weather.pressure")}</span><b>${Math.round(Number(s.pressure))} ${s.pressure_unit??"hPa"}</b>`:u}
          ${this.daily[0]?.precipitation!=null?i`<span>${this.t("weather.rain_today")}</span><b>${this.daily[0].precipitation} mm</b>`:u}
        </div>
      </section>
      <div class="grid" style="margin-top:var(--hl-s4)">
        <section class="card s7"><header><h2>${this.t("weather.hours")}</h2></header>
          <div class="hours">${this.renderHours()}</div></section>
        <section class="card s5"><header><h2>${this.t("weather.garden")}</h2></header>
          <div class="stack" style="gap:8px">${n.length?n.map(r=>i`<div class="hint ${r.cls}"><span><b>${r.title}</b>${r.text}</span></div>`):i`<p class="small muted">${this.t("weather.hint.none")}</p>`}</div></section>
        <section class="card s7"><header><h2>${this.t("weather.days")}</h2></header>${this.renderDays()}</section>
        <section class="card s5"><header><h2>${this.t("weather.radar")}</h2></header>${this.renderRadar()}</section>
      </div>`}};be.styles=[L,S`
      :host { display: block; }
      .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--hl-s4); }
      .s12 { grid-column: span 12; } .s7 { grid-column: span 7; } .s5 { grid-column: span 5; }
      @media (max-width: 1100px) { .s7, .s5 { grid-column: span 12; } }
      .now { position: relative; overflow: hidden; border-radius: 22px; padding: 26px 30px; color: var(--hl-hero-ink);
        background: var(--sky, var(--hl-grad-winter)); box-shadow: var(--hl-shadow-2), var(--hl-highlight); display: flex; flex-wrap: wrap; gap: 24px; align-items: center; }
      .now .temp { font-family: var(--hl-font-serif); font-size: 64px; font-weight: 700; line-height: 1; font-variant-numeric: tabular-nums; }
      .now .cond { font-family: var(--hl-font-serif); font-size: 22px; font-style: italic; }
      .now .facts { display: grid; grid-template-columns: repeat(2, auto); gap: 4px 18px; font-size: var(--hl-fs-sm); margin-left: auto; }
      .now .facts b { font-variant-numeric: tabular-nums; }
      .hint { display: flex; gap: 10px; align-items: flex-start; padding: 10px 12px; border-radius: 12px; background: var(--hl-surface-2); font-size: var(--hl-fs-sm); }
      .hint.frost { background: var(--hl-frost-100); } .hint.heat { background: var(--hl-sun-100); } .hint.wet { background: color-mix(in srgb, var(--hl-water-500) 12%, var(--hl-surface)); }
      .hint.dry { background: var(--hl-soil-100); }
      .hint b { display: block; }
      .hours svg { width: 100%; height: auto; display: block; }
      .days { display: flex; flex-direction: column; }
      .day { display: grid; grid-template-columns: 92px 44px 70px 1fr 64px; align-items: center; gap: 10px; padding: 8px 4px; border-top: 1px solid color-mix(in srgb, var(--hl-border) 60%, transparent); }
      .day:first-child { border-top: 0; }
      .day .name { font-weight: 600; }
      .day .name small { display: block; font-weight: 400; color: var(--hl-text-muted); font-size: 11px; }
      .range { position: relative; height: 8px; border-radius: 4px; background: var(--hl-surface-2); }
      .range span { position: absolute; top: 0; bottom: 0; border-radius: 4px; background: linear-gradient(90deg, #6aa9de, #9cc58a, #f2b544, #e07a2e); }
      .tmin, .tmax { font-variant-numeric: tabular-nums; font-size: var(--hl-fs-sm); }
      .tmin { color: var(--hl-text-muted); text-align: right; }
      .rain { font-size: 12px; color: var(--hl-water-500); font-variant-numeric: tabular-nums; }
      .tags { display: flex; gap: 4px; flex-wrap: wrap; }
      .radar img { width: 100%; border-radius: 14px; display: block; background: var(--hl-surface-2); min-height: 200px; }
      .muted-note { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
      @media (max-width: 600px) { .day { grid-template-columns: 70px 36px 54px 1fr; } .day .tags { display: none; } .now .temp { font-size: 48px; } }
    `],p([m({attribute:!1})],be.prototype,"snapshot",2),p([m({attribute:!1})],be.prototype,"hass",2),p([m({attribute:!1})],be.prototype,"t",2),p([m()],be.prototype,"lang",2),p([f()],be.prototype,"daily",2),p([f()],be.prototype,"hourly",2),p([f()],be.prototype,"radarTick",2),p([f()],be.prototype,"radarFailed",2),be=p([z("hl-weather-view")],be);var y=h=>b`<path d=${h}/>`,xt={home:b`${y("M4 11.5 12 5l8 6.5")}${y("M6.5 10v9h11v-9")}${y("M12 19v-4.5")}${y("M12 14.5c-2.2 0-3.2-1.6-3.2-3.3 1.8 0 3.2 1 3.2 3.3zM12 13.2c0-2.2 1.3-3.6 3.4-3.7 0 2.1-1.3 3.7-3.4 3.7z")}`,garden:b`${y("M12 20v-8")}${y("M12 14c-3.5 0-5.5-2.3-5.5-5 3 0 5.5 1.7 5.5 5zM12 12c0-3.5 2.2-6 5.5-6 0 3.3-2.3 6-5.5 6z")}${y("M4 20h16")}`,calendar:b`<rect x="4" y="5.5" width="16" height="14" rx="2.5"/>${y("M4 10h16M8.5 3.5v4M15.5 3.5v4")}${y("M12 17.5v-3M12 15.6c-1.3 0-2-.8-2-1.9 1.1 0 2 .6 2 1.9zM12 14.8c0-1.3.8-2.1 2-2.1 0 1.2-.8 2.1-2 2.1z")}`,weather:b`<circle cx="9" cy="9" r="3.2"/>${y("M9 3v1.4M3 9h1.4M4.8 4.8l1 1M13.2 4.8l-1 1")}${y("M9.5 19h8a3 3 0 0 0 0-6 4.5 4.5 0 0 0-8.4-1.3A3.6 3.6 0 0 0 9.5 19z")}`,journal:b`<rect x="5" y="3.5" width="13.5" height="17" rx="2"/>${y("M8.5 3.5v17M11.5 8h4M11.5 11.5h4")}${y("M14.5 17.2c-1.6 0-2.4-1-2.4-2.3 1.4 0 2.4.8 2.4 2.3z")}`,knowledge:b`${y("M12 6.5C10 5 7 4.6 4 5v13c3-.4 6 0 8 1.5 2-1.5 5-1.9 8-1.5V5c-3-.4-6 0-8 1.5z")}${y("M12 6.5v13")}`,manage:b`${y("M5 7h9M18 7h1M5 12h3M12 12h7M5 17h8M17 17h2")}<circle cx="16" cy="7" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="15" cy="17" r="2"/>`,planner:b`<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/>${y("M3.5 12h17M12 3.5v17")}${y("M7.8 9.5V7.3M7.8 8c-1 0-1.6-.6-1.6-1.5.9 0 1.6.5 1.6 1.5zM16.2 17.5v-2.2M16.2 16c-1 0-1.6-.6-1.6-1.5.9 0 1.6.5 1.6 1.5z")}`,layout:b`${y("M3.5 6.5 9 4.5l6 2 5.5-2v13l-5.5 2-6-2-5.5 2z")}${y("M9 4.5v13M15 6.5v13")}`,crops:b`${y("M9 6.5h11M9 12h11M9 17.5h11")}${y("M5 8V5.2M5 6c-1 0-1.6-.7-1.6-1.6 1 0 1.6.6 1.6 1.6zM5 13.5v-2.8M5 11.5c-1 0-1.6-.7-1.6-1.6 1 0 1.6.6 1.6 1.6zM5 19v-2.8M5 17c-1 0-1.6-.7-1.6-1.6 1 0 1.6.6 1.6 1.6z")}`,library:b`${y("M5 19C5 10 10 5 19 5c0 9-5 14-14 14z")}${y("M5 19 13 11")}`,advice:b`${y("M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5h-7L7.5 20v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z")}${y("M12 13.5V10M12 11c-1.2 0-1.9-.8-1.9-1.9 1.1 0 1.9.7 1.9 1.9zM12 10.2c0-1.3.8-2.1 2-2.1 0 1.2-.8 2.1-2 2.1z")}`,handbook:b`${y("M6 4h11.5v16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z")}${y("M4 17.5a2 2 0 0 1 2-2h11.5")}${y("M11 12.5V8.8M11 10.3c-1.3 0-2-.9-2-2 1.2 0 2 .7 2 2zM11 9.6c0-1.3.8-2.2 2.1-2.2 0 1.3-.8 2.2-2.1 2.2z")}`,analysis:b`<circle cx="10.5" cy="10.5" r="6"/>${y("M15 15l5 5")}${y("M10.5 13.5V10M10.5 11c-1.2 0-1.8-.8-1.8-1.8 1 0 1.8.6 1.8 1.8zM10.5 10.3c0-1.2.8-2 1.9-2 0 1.2-.8 2-1.9 2z")}`,print:b`${y("M7 9V4h10v5")}<rect x="4" y="9" width="16" height="7.5" rx="2"/>${y("M7 14h10v6H7z")}`,settings:b`<circle cx="12" cy="12" r="3"/>${y("M12 3.5v2.3M12 18.2v2.3M3.5 12h2.3M18.2 12h2.3M6 6l1.6 1.6M16.4 16.4 18 18M6 18l1.6-1.6M16.4 7.6 18 6")}`,wall:b`<rect x="3.5" y="5" width="17" height="12" rx="2"/>${y("M9 20h6M12 17v3")}${y("M7 13.5h4M7 10.5h6")}`,sow_indoor:b`${y("M5 14h14l-1.5 6h-11z")}${y("M12 14v-4M12 11.5c-1.5 0-2.4-1-2.4-2.4 1.4 0 2.4.9 2.4 2.4zM12 10.5c0-1.6 1-2.6 2.6-2.6 0 1.5-1 2.6-2.6 2.6z")}${y("M7 4.5l1 1.5M17 4.5l-1 1.5")}`,sow_direct:b`${y("M3.5 16.5h17")}<ellipse cx="9" cy="12.5" rx="1.3" ry="1.8"/><ellipse cx="15" cy="9.5" rx="1.3" ry="1.8"/>${y("M6 20h3M14 20h3")}`,harden_off:b`<circle cx="16.5" cy="7" r="2.6"/>${y("M16.5 2.8v1M20.7 7h-1M19.5 4l-.7.7")}${y("M5 15h9l-1.2 5H6.2z")}${y("M9.5 15v-3.5M9.5 12.5c-1.4 0-2.2-.9-2.2-2.1 1.3 0 2.2.8 2.2 2.1z")}`,transplant:b`${y("M4 8.5h6l-1 4.5H5z")}${y("M7 8.5V6.3M7 7c-1 0-1.6-.6-1.6-1.5.9 0 1.6.5 1.6 1.5z")}${y("M11.5 11h5.5M15 9l2 2-2 2")}${y("M3.5 19h17M18.5 19v-3M18.5 16.8c-1 0-1.6-.7-1.6-1.6 1 0 1.6.6 1.6 1.6z")}`,thin:b`${y("M4 19h16")}${y("M7 19v-5M12 19v-3.5M17 19v-5")}<circle cx="9.5" cy="7" r="2"/><circle cx="14.5" cy="7" r="2"/>${y("M11 8.5 16 13M13 8.5 8 13")}`,stake:b`${y("M12 3.5v17")}${y("M12 9c-2.6 0-4-1.6-4-3.6 2.3 0 4 1.3 4 3.6zM12 14c2.6 0 4-1.6 4-3.6-2.3 0-4 1.3-4 3.6z")}${y("M9.5 12.5h5")}`,prune:b`<circle cx="7" cy="17" r="2.3"/><circle cx="17" cy="17" r="2.3"/>${y("M8.6 15.4 16 5M15.4 15.4 8 5")}`,pinch:b`${y("M12 20v-9")}${y("M12 14c-2.8 0-4.3-1.8-4.3-4 2.5 0 4.3 1.5 4.3 4z")}${y("M15 5.5l2.5 2.5M17.5 5.5 15 8")}`,earth_up:b`${y("M3 19c3-5 6-7 9-7s6 2 9 7z")}${y("M12 12V6M12 8.5c-1.6 0-2.6-1-2.6-2.4 1.5 0 2.6.9 2.6 2.4z")}`,feed:b`${y("M7 6h10l1.5 14h-13z")}${y("M9.5 6V4h5v2")}${y("M12 16.5c-1.5 0-2.5-1-2.5-2.3 0-1.4 2.5-3.7 2.5-3.7s2.5 2.3 2.5 3.7c0 1.3-1 2.3-2.5 2.3z")}`,water:b`${y("M5 11h9v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z")}${y("M14 13l5-4")}${y("M19.5 9.5l.6 1.8M21 8l1 1.2")}${y("M7.5 11V8.5a2 2 0 0 1 4 0V11")}`,weed:b`${y("M12 9V4M12 6c-1.4 0-2.2-.8-2.2-2 1.3 0 2.2.7 2.2 2zM12 5.3c0-1.3.8-2.1 2.1-2.1 0 1.2-.8 2.1-2.1 2.1z")}${y("M12 9v4M12 13l-3 4M12 13l3 5M12 15.5v5")}${y("M3.5 11h17")}`,pest_check:b`<ellipse cx="12" cy="13.5" rx="4" ry="5"/>${y("M12 8.5v10M8 11 4.5 9.5M8 15H4M8.5 18l-3 2M16 11l3.5-1.5M16 15h4M15.5 18l3 2M10 8.5 8.5 5.5M14 8.5l1.5-3")}`,harvest:b`${y("M3.5 10.5h17l-2 8.5a1.5 1.5 0 0 1-1.5 1H7a1.5 1.5 0 0 1-1.5-1z")}${y("M8 10.5 10.5 5M16 10.5 13.5 5")}${y("M8 14.5v2.5M12 14.5v2.5M16 14.5v2.5")}`,ventilate:b`<rect x="4" y="4" width="16" height="16" rx="2"/>${y("M12 4v16M4 12h8")}${y("M14.5 9c2 .5 3 1.5 3 3s-1 2.5-3 3")}`,shade:b`${y("M3.5 9 12 5l8.5 4")}${y("M3.5 9h17M6 9v11M18 9v11")}${y("M9 13h6M9 16h6")}`,frost_protect:b`${y("M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9")}${y("M10 4.5 12 6l2-1.5M10 19.5 12 18l2 1.5")}`,soil_prep:b`${y("M12 3.5v11")}${y("M9 3.5h6")}${y("M8.5 14.5h7l-1 4.5a2.5 2.5 0 0 1-5 0z")}`,compost:b`${y("M5 8h14l-1.5 12h-11z")}${y("M4 8h16M9.5 8V5.5h5V8")}${y("M9 12.5l2 2 4-4")}`,green_manure:b`<circle cx="9" cy="9" r="2.6"/><circle cx="15" cy="9" r="2.6"/><circle cx="12" cy="13.5" r="2.6"/>${y("M12 16v4.5")}`,mulch:b`${y("M3.5 18h17M3.5 14.5c3 0 3-1.5 5.7-1.5s2.7 1.5 5.6 1.5 2.7-1.5 5.7-1.5")}${y("M12 11.5V6M12 8c-1.4 0-2.2-.8-2.2-2 1.3 0 2.2.7 2.2 2z")}`,clean_greenhouse:b`${y("M4 20V10l8-6 8 6v10")}${y("M4 20h16M12 4v16")}${y("M15.5 12.5l1.5 1.5M17 12.5l-1.5 1.5")}`,winter_prep:b`${y("M4 20V11l8-6 8 6v9z")}${y("M12 10v7M9 11.8l6 3.5M9 15.3l6-3.5")}`,plan_season:b`<rect x="5" y="4.5" width="14" height="16" rx="2"/>${y("M9 4.5V3h6v1.5")}${y("M8.5 10h7M8.5 13.5h7M8.5 17h4")}`,tool_care:b`${y("M14.5 4.5a4 4 0 0 0-4.6 5.3L4 15.7 6.3 18l5.9-5.9a4 4 0 0 0 5.3-4.6l-2.4 2.4-2.2-.3-.3-2.2z")}`,soil_test:b`${y("M9.5 3.5h5M10.5 3.5v11a1.5 1.5 0 0 0 3 0v-11")}${y("M10.5 10h3")}${y("M5 20h14")}`,cut_back:b`${y("M4 20h16")}${y("M8 20v-6M12 20v-4M16 20v-6")}${y("M5 10l14-4M7 6.5l2 2.5")}`,divide:b`${y("M12 20v-6M12 14l-5-5M12 14l5-5")}<circle cx="7" cy="7" r="2.3"/><circle cx="17" cy="7" r="2.3"/>${y("M3.5 20h17")}`,protect:b`${y("M12 3.5 19 6v6c0 4.2-3 7.2-7 8.5-4-1.3-7-4.3-7-8.5V6z")}${y("M12 15.5v-4M12 12.6c-1.3 0-2-.8-2-1.9 1.2 0 2 .7 2 1.9z")}`,clean:b`${y("M15 4 9 14")}${y("M6 14h7l1.5 6.5h-10z")}`,tie_in:b`${y("M8 3.5v17")}${y("M8 9c3 0 6 1 8 3M8 15c2.5 0 5 .5 7 2")}<circle cx="8" cy="9" r="1.2"/><circle cx="8" cy="15" r="1.2"/>`,thin_fruit:b`<circle cx="8.5" cy="15.5" r="3.2"/><circle cx="16" cy="15.5" r="3.2"/>${y("M8.5 12.3C9 8 11 5.5 13 4.5M16 12.3c-.5-3-1.5-5.5-3-7.8")}`,pollinate:b`<ellipse cx="12" cy="13" rx="3.5" ry="4.5"/>${y("M8.5 13h7M9 16h6")}${y("M8.8 10.5C6 8 4 8.5 4 10.5s3 2 4.8.5zM15.2 10.5C18 8 20 8.5 20 10.5s-3 2-4.8.5z")}${y("M10.5 8.5 9 5.5M13.5 8.5 15 5.5")}`,check:b`<rect x="5" y="4.5" width="14" height="16" rx="2"/>${y("M9 12.5l2 2 4-4")}`,make_feed:b`${y("M9 3.5h6M10 3.5v6l-5 9a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2l-5-9v-6")}${y("M7.5 15h9")}`,custom:b`<circle cx="12" cy="12" r="8"/>${y("M8.5 12.3l2.4 2.4 4.6-4.6")}`};function qe(h,o=20){if(h.startsWith("mdi:"))return i`<ha-icon icon=${h} style=${`--mdc-icon-size:${o}px`}></ha-icon>`;let e=xt[h];return e?i`<svg class="gicon" width=${o} height=${o} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`:u}var We=class extends at{constructor(o){if(super(o),this.it=u,o.type!==_a.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(o){if(o===u||o==null)return this._t=void 0,this.it=o;if(o===ze)return o;if(typeof o!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(o===this.it)return this._t;this.it=o;let e=[o];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};We.directiveName="unsafeHTML",We.resultType=1;var za=nt(We);var Mt=class extends We{};Mt.directiveName="unsafeSVG",Mt.resultType=2;var it=nt(Mt);var le="#4f8a34",Yt="#6aa648",me="#3f7a2a",ws="#7a5a3a",Kt='fill="#fff" opacity=".32"',rt=h=>`
  <rect x="10.8" y="14" width="2.4" height="8.5" rx="1" fill="${ws}"/>
  <circle cx="12" cy="10" r="8.6" fill="${le}"/>
  <circle cx="9.2" cy="7.6" r="4.6" fill="${Yt}"/>
  <g fill="currentColor" stroke="#fff" stroke-width=".55">${h}</g>`,Ze={carrot:`
    <path d="M12 9.5C12.2 6 14.5 3.6 17.4 3M12 9.5c0-3.4-.1-5.7-.3-7.5M12 9.5C10.8 6.4 8.8 4.4 6.4 3.6" stroke="${le}" stroke-width="1.7" stroke-linecap="round" fill="none"/>
    <path d="M12 8.6c-2.4 0-3.9 1.4-3.9 3.4 0 3 1.8 7.2 3.9 10.6 2.1-3.4 3.9-7.6 3.9-10.6 0-2-1.5-3.4-3.9-3.4z" fill="currentColor"/>
    <path d="M9.4 12.8h2.1M10.4 15.8h1.8M11 18.8h1.1M12.6 11.4h1.9M12.6 14.4h1.6" stroke="rgba(0,0,0,.22)" stroke-width=".8" stroke-linecap="round"/>`,tomato:`
    <circle cx="12" cy="13.4" r="8.2" fill="currentColor"/>
    <ellipse cx="8.8" cy="11" rx="2.2" ry="1.4" ${Kt}/>
    <path d="M12 6.4l1.5 2.4 2.9-.5-1.9 2 1.7 2-2.9-.6L12 14l-1.3-2.3-2.9.6 1.7-2-1.9-2 2.9.5z" fill="${me}"/>
    <path d="M12 6.8V3.4" stroke="${me}" stroke-width="1.5" stroke-linecap="round"/>`,pepper:`
    <path d="M5.8 10.2c0-2.6 2-3.7 3.6-3.1 1 .4 1.7.4 2.6 0s1.6-.4 2.6 0c1.6-.6 3.6.5 3.6 3.1 0 5.2-2.1 11-6.2 11S5.8 15.4 5.8 10.2z" fill="currentColor"/>
    <path d="M12 7.2V4c0-.7.6-1.1 1.4-.9" stroke="${me}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M8.2 10.5c-.2 2.4.2 5 1.2 7" stroke="#fff" stroke-opacity=".35" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,chili:`
    <path d="M7.8 5c1.6 0 2.6 1.1 2.9 2.6 1.3 5.4 4.2 9.4 9.3 12.9-7.2.6-13.2-5.4-13.5-11.9C6.4 6.6 6.8 5 7.8 5z" fill="currentColor"/>
    <path d="M7.9 5.3C7.7 3.6 8.5 2.4 10 2" stroke="${me}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M8.6 8.6c.6 3.4 2.6 6.4 5.6 8.6" stroke="#fff" stroke-opacity=".35" stroke-width="1" fill="none" stroke-linecap="round"/>`,eggplant:`
    <path d="M9 6.3c3.1-1 6.1 1.1 8.1 5.1 2.5 5 1 10.1-3 10.6S6 18.2 6.5 12.2C6.7 9.2 7.3 6.9 9 6.3z" fill="currentColor"/>
    <path d="M7.4 7.6c.5-3 3-4 5.6-2.7-1.2.3-2 1-2.3 2 1.3-.2 2.4.2 3.3 1.2-2.2-.3-4.5-.2-6.6-.5z" fill="${me}"/>
    <path d="M8.6 11c0 2.6 1 5 2.6 6.6" stroke="#fff" stroke-opacity=".3" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,cucumber:`
    <g transform="rotate(-32 12 12.5)">
      <rect x="2.6" y="9" width="18.8" height="7.2" rx="3.6" fill="currentColor"/>
      <path d="M5 11h14" stroke="#fff" stroke-opacity=".3" stroke-width="1.1" stroke-linecap="round"/>
      <g fill="#fff" opacity=".45"><circle cx="7" cy="13.6" r=".6"/><circle cx="11" cy="14.2" r=".6"/><circle cx="15" cy="13.6" r=".6"/><circle cx="9" cy="12.2" r=".5"/><circle cx="13" cy="12.4" r=".5"/></g>
    </g>
    <path d="M19.4 6.6l2-1.6" stroke="${me}" stroke-width="1.5" stroke-linecap="round"/>`,pumpkin:`
    <path d="M12 7.6V4.6c.3-.9 1.2-1.3 2.1-1.1" stroke="#6b5232" stroke-width="1.9" fill="none" stroke-linecap="round"/>
    <ellipse cx="12" cy="14" rx="9.6" ry="7.2" fill="currentColor"/>
    <path d="M12 6.9c-2.6 2-2.6 12.1 0 14.2M12 6.9c2.6 2 2.6 12.1 0 14.2M7 8.2c-2.6 2.6-2.6 9 0 11.6M17 8.2c2.6 2.6 2.6 9 0 11.6" stroke="rgba(0,0,0,.2)" stroke-width=".9" fill="none"/>`,melon:`
    <circle cx="12" cy="12.6" r="8.6" fill="currentColor"/>
    <path d="M12 4c-3 3-3 14.2 0 17.2M12 4c3 3 3 14.2 0 17.2M6 6.4c-2 3.6-2 9 0 12.2M18 6.4c2 3.6 2 9 0 12.2" stroke="rgba(0,0,0,.22)" stroke-width="1.1" fill="none"/>
    <ellipse cx="8.6" cy="9" rx="2" ry="1.2" ${Kt}/>`,root:`
    <path d="M12 9.4C10.6 6.6 8.2 5 5.8 4.8c.8 2.5 3.1 4.1 6.2 4.6zM12 9.4c1.4-2.8 3.8-4.4 6.2-4.6-.8 2.5-3.1 4.1-6.2 4.6z" fill="${le}"/>
    <path d="M12 9.6V2.6" stroke="${le}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12 8.8c3.7 0 6 2.4 6 5.4 0 3.1-2.7 5.4-6 5.4s-6-2.3-6-5.4c0-3 2.3-5.4 6-5.4z" fill="currentColor"/>
    <path d="M12 19.4v3.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <ellipse cx="9.6" cy="12.6" rx="1.6" ry="1.1" ${Kt}/>`,potato:`
    <path d="M4.8 12.6c0-4.1 3.6-6.6 7.7-6.4 4.4.2 7.1 2.8 6.7 6.6-.4 3.9-3.6 5.9-7.6 5.7-4.3-.2-6.8-1.9-6.8-5.9z" fill="currentColor"/>
    <g fill="rgba(0,0,0,.3)"><circle cx="8.8" cy="11" r=".75"/><circle cx="13.6" cy="9.4" r=".65"/><circle cx="15.7" cy="13.6" r=".75"/><circle cx="10.6" cy="15" r=".65"/></g>
    <path d="M14.5 6.6c.6-2.4 2.6-3.6 4.6-3.2-.6 2-2.3 3.2-4.6 3.2z" fill="${le}"/>`,onion:`
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
    <path d="M12 4.2C9.6 2 6.6 2 4.6 3.4 7 5 9.6 5.2 12 4.2zM12 4.2c2.4-2.2 5.4-2.2 7.4-.8-2.4 1.6-5 1.8-7.4.8z" fill="${le}"/>
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
    <path d="M10 13C5 12 4 6 7 2.8c3 1 4 5.2 3 10.2zM14 13c5-1 6-7 3-10.2-3 1-4 5.2-3 10.2zM12 12.2c-2-3-2-7.2 0-10.2 2 3 2 7.2 0 10.2z" fill="${me}"/>
    <path d="M9 22.2l1-9.4M12 22.2V12M15 22.2l-1-9.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`,celery:`
    <g fill="${le}"><circle cx="8.8" cy="7" r="2.7"/><circle cx="12" cy="4.8" r="2.9"/><circle cx="15.2" cy="7" r="2.7"/></g>
    <path d="M8 22.2l1.5-12.2M12 22.2V9M16 22.2l-1.5-12.2" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>`,fennel:`
    <path d="M10 11.6L8 3M12 11V2M14 11.6L16 3M8.8 6.4l-2-.8M9.5 8.8l-2 .2M12 5l-1.6-1M12 7.6l1.6-1M15.2 6.4l2-.8M14.5 8.8l2 .2" stroke="#5f9a3a" stroke-width="1" stroke-linecap="round"/>
    <path d="M6.4 16.2c0-3 2.6-5.2 5.6-5.2s5.6 2.2 5.6 5.2-2.6 5.6-5.6 5.6-5.6-2.6-5.6-5.6z" fill="currentColor" stroke="#b9c58a" stroke-width=".8"/>`,pea:`
    <path d="M2.8 15.2c3-4.1 9.1-7.1 16.2-8.1 1-.1 2 .7 1.5 1.7-2.5 4.4-8.5 8.4-15.5 8.9-1.5.1-2.8-1.2-2.2-2.5z" fill="currentColor"/>
    <g fill="#c4e48e"><circle cx="7.8" cy="14.4" r="1.8"/><circle cx="11.4" cy="12.8" r="1.8"/><circle cx="15" cy="10.9" r="1.7"/></g>
    <path d="M19.6 7.4c.5-2 2-2.6 2.6-1.6s-.5 2.1-1.3 1.4" stroke="${le}" stroke-width=".9" fill="none" stroke-linecap="round"/>`,bean:`
    <path d="M4 5.8c1 6.2 4.1 11.3 10.2 14.4 2 1 4.1.5 3.6-1C14.2 16.1 9.1 11 6.6 4.8c-.6-1.2-2.7-1-2.6 1z" fill="currentColor"/>
    <path d="M6.6 8.6c.8.3 1.4 1 1.5 2M9.1 12.6c.8.3 1.4 1 1.5 2M12.1 16.1c.8.3 1.4 1 1.5 2" stroke="rgba(255,255,255,.45)" stroke-width=".9" fill="none" stroke-linecap="round"/>
    <path d="M4.4 5C4.2 3.6 5 2.6 6.4 2.4" stroke="${me}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,corn:`
    <ellipse cx="12" cy="11" rx="4.2" ry="8.6" fill="currentColor"/>
    <path d="M8.4 7h7.2M8 10h8M8 13h8M8.5 16h7M10 3.2v15.4M14 3.2v15.4" stroke="rgba(0,0,0,.16)" stroke-width=".7"/>
    <path d="M12 22.4c-3-1-5.6-4.1-6.6-9.2 2 2 4.1 4.1 6.6 9.2zM12 22.4c3-1 5.6-4.1 6.6-9.2-2 2-4.1 4.1-6.6 9.2z" fill="${Yt}"/>`,asparagus:`
    <g stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M8 22.2V7.4M12 22.2V4.2M16 22.2V8.4"/></g>
    <g fill="#5f7f3a"><path d="M6.7 8L8 4.2 9.3 8z"/><path d="M10.7 4.8L12 1 13.3 4.8z"/><path d="M14.7 9L16 5.2 17.3 9z"/></g>`,artichoke:`
    <path d="M12 20v3" stroke="#6b8f5a" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 2.8c3.1 2 6.2 5.1 6.2 9.7S15.1 20.2 12 20.2s-6.2-3.1-6.2-7.7S8.9 4.8 12 2.8z" fill="currentColor"/>
    <path d="M8 10.4c2 1 6 1 8 0M7 13.9c2.5 1.4 7.5 1.4 10 0M8.5 17.4c2 1 5 1 7 0M12 2.8v4" stroke="rgba(0,0,0,.22)" stroke-width=".9" fill="none"/>`,rhubarb:`
    <path d="M2.8 9.2c0-4.1 4.1-6.6 9.2-6.6s9.2 2.5 9.2 6.6c0 2-2 3.6-4.1 3.1-1.5 1.5-3.6 1.5-5.1.5-1.5 1-3.6 1-5.1-.5-2 .5-4.1-1-4.1-3.1z" fill="${le}"/>
    <path d="M12 12.6V4M12 8L7 5.6M12 8l5-2.4" stroke="rgba(255,255,255,.4)" stroke-width=".9" fill="none"/>
    <path d="M9.2 22.2l2-10M13.2 22.2l.9-10" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>`,strawberry:`
    <path d="M12 21.2c-4.1-2-7.6-6.6-7.6-10.6 0-3 2.5-4.6 4.6-4.1 1.2.3 2 .8 3 .8s1.8-.5 3-.8c2.1-.5 4.6 1.1 4.6 4.1 0 4-3.5 8.6-7.6 10.6z" fill="currentColor"/>
    <g fill="#f7e27a"><circle cx="9" cy="10.2" r=".55"/><circle cx="12" cy="11" r=".55"/><circle cx="15" cy="10.2" r=".55"/><circle cx="10.5" cy="13.6" r=".55"/><circle cx="13.5" cy="13.6" r=".55"/><circle cx="12" cy="16.6" r=".55"/><circle cx="8" cy="12.9" r=".5"/><circle cx="16" cy="12.9" r=".5"/></g>
    <path d="M6.8 7.4c1.6-1.1 3.2-1.3 5.2 0 2-1.3 3.6-1.1 5.2 0-1.6.9-3.4 1.1-5.2.3-1.8.8-3.6.6-5.2-.3zM12 7.4V3.4" fill="${me}" stroke="${me}" stroke-width="1" stroke-linecap="round"/>`,berry:`
    <path d="M12 8.6C12 5.6 14 3.6 16.6 3.4" stroke="${me}" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.18)" stroke-width=".5"><circle cx="9" cy="11" r="3.5"/><circle cx="15" cy="11" r="3.5"/><circle cx="12" cy="16.4" r="3.5"/></g>
    <g ${Kt}><circle cx="8" cy="10" r=".9"/><circle cx="14" cy="10" r=".9"/><circle cx="11" cy="15.4" r=".9"/></g>`,currant:`
    <path d="M14.2 4.4c2-1.6 4.6-1.6 6.6 0-2 1.4-4.6 1.4-6.6 0z" fill="${le}"/>
    <path d="M8 2.8c2 1 3 3 4 6s3 7 4 12.2" stroke="#6b5232" stroke-width=".9" fill="none"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.25)" stroke-width=".5"><circle cx="11" cy="8" r="2.1"/><circle cx="14.2" cy="10.6" r="2.2"/><circle cx="11.6" cy="13.2" r="2.3"/><circle cx="15" cy="16" r="2.3"/><circle cx="12.6" cy="18.9" r="2.3"/></g>`,berry_bush:`
    <circle cx="12" cy="12.6" r="9.2" fill="${le}"/>
    <circle cx="9" cy="10" r="4.1" fill="${Yt}"/><circle cx="15" cy="11" r="4" fill="${Yt}" opacity=".7"/>
    <g fill="currentColor" stroke="#fff" stroke-width=".55"><circle cx="8" cy="13.2" r="1.6"/><circle cx="14" cy="8" r="1.6"/><circle cx="16.2" cy="14.6" r="1.6"/><circle cx="11" cy="17.6" r="1.6"/><circle cx="11.4" cy="10.6" r="1.5"/></g>`,cane:`
    <path d="M6.8 22.4C6.8 15 8 8 10 2.8M12 22.4c0-7 1-12.2 3-17.2M17.2 22.4c0-6.2 0-10.2 1.5-14" stroke="${ws}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <g fill="${le}"><ellipse cx="6" cy="9" rx="2.6" ry="1.4" transform="rotate(-30 6 9)"/><ellipse cx="17.6" cy="5.8" rx="2.6" ry="1.4" transform="rotate(30 17.6 5.8)"/><ellipse cx="20.2" cy="12" rx="2.4" ry="1.3" transform="rotate(20 20.2 12)"/></g>
    <g fill="currentColor" stroke="rgba(0,0,0,.2)" stroke-width=".5"><circle cx="9.4" cy="12.4" r="2.2"/><circle cx="14" cy="9.2" r="2.2"/><circle cx="13.2" cy="16.4" r="2.1"/><circle cx="18.6" cy="16.2" r="2"/></g>`,grape:`
    <path d="M12.6 5.6V2.6c0-.6.6-1 1.4-.9" stroke="#6b5232" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M14 4.2c2-2 5-2 7 0-2 1.5-4.6 1.6-7 0z" fill="${le}"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.2)" stroke-width=".5"><circle cx="7.8" cy="8" r="2.5"/><circle cx="12.4" cy="8" r="2.5"/><circle cx="17" cy="8" r="2.5"/><circle cx="10" cy="12.2" r="2.5"/><circle cx="14.6" cy="12.2" r="2.5"/><circle cx="12.2" cy="16.4" r="2.5"/><circle cx="12.2" cy="20.4" r="2.1"/></g>`,tree_apple:rt('<circle cx="7.8" cy="11" r="1.7"/><circle cx="13" cy="6.4" r="1.7"/><circle cx="15.9" cy="11.6" r="1.7"/><circle cx="11" cy="13.8" r="1.6"/>'),tree_pear:rt('<ellipse cx="7.8" cy="11" rx="1.3" ry="1.9"/><ellipse cx="13" cy="6.4" rx="1.3" ry="1.9"/><ellipse cx="15.9" cy="11.6" rx="1.3" ry="1.9"/><ellipse cx="11" cy="14" rx="1.3" ry="1.8"/>'),tree_plum:rt('<ellipse cx="8" cy="11" rx="1.4" ry="1.8"/><ellipse cx="13" cy="6.6" rx="1.4" ry="1.8"/><ellipse cx="15.8" cy="11.6" rx="1.4" ry="1.8"/><ellipse cx="11" cy="14" rx="1.4" ry="1.7"/><ellipse cx="10" cy="7.6" rx="1.3" ry="1.6"/>'),tree_cherry:rt('<circle cx="7.4" cy="11.6" r="1.3"/><circle cx="9.4" cy="12" r="1.3"/><circle cx="13" cy="7" r="1.3"/><circle cx="15" cy="7.4" r="1.3"/><circle cx="14.8" cy="12.4" r="1.3"/><circle cx="16.8" cy="12" r="1.3"/>'),tree_fig:rt('<path d="M8 9.4c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/><path d="M14.2 4.8c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/><path d="M15.6 10.6c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/>'),tree_nut:rt('<circle cx="8" cy="11.4" r="1.5"/><circle cx="13.2" cy="6.8" r="1.5"/><circle cx="15.8" cy="12" r="1.5"/><circle cx="11" cy="14" r="1.4"/>'),tree:`
    <rect x="10.8" y="14" width="2.4" height="8.5" rx="1" fill="${ws}"/>
    <circle cx="12" cy="10" r="8.6" fill="currentColor"/>
    <circle cx="9.2" cy="7.6" r="4.6" fill="#fff" opacity=".18"/>`,sunflower:`
    <g fill="currentColor">${Array.from({length:12},(h,o)=>`<ellipse cx="12" cy="4.6" rx="1.7" ry="3.4" transform="rotate(${o*30} 12 12)"/>`).join("")}</g>
    <circle cx="12" cy="12" r="4.4" fill="#6b4a2a"/>
    <g fill="#3f2a18"><circle cx="11" cy="11" r=".6"/><circle cx="13" cy="11.6" r=".6"/><circle cx="11.6" cy="13.2" r=".6"/><circle cx="13.4" cy="13.6" r=".5"/></g>`,flower:`
    <path d="M12 22.4V14" stroke="${le}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12 18.4c-1.6-2.4-4-3-5.6-2.4 1.2 2 3.4 2.8 5.6 2.4z" fill="${le}"/>
    <g fill="currentColor">${Array.from({length:5},(h,o)=>`<circle cx="12" cy="5.6" r="3.2" transform="rotate(${o*72} 12 10)"/>`).join("")}</g>
    <circle cx="12" cy="10" r="2.3" fill="#f4c430" stroke="#c9952a" stroke-width=".5"/>`,lavender:`
    <path d="M12 22.4C12 16 11 10 9 5M12 22.4c0-6 .4-12 .4-18.4M12 22.4c0-6 1.4-11 3.6-16" stroke="#7a9a6a" stroke-width="1" fill="none" stroke-linecap="round"/>
    <g fill="currentColor">${[[9,5],[9.6,7.4],[10.2,9.8],[12.4,3.4],[12.4,6],[12.4,8.6],[15.6,6],[15,8.4],[14.4,10.8]].map(([h,o])=>`<ellipse cx="${h}" cy="${o}" rx="1.1" ry="1.5"/>`).join("")}</g>`,herb:`
    <path d="M12 22.4V3.4" stroke="${me}" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="currentColor">${[[4.6,-35],[8.6,35],[12.6,-35],[16.6,35]].map(([h,o])=>`<ellipse cx="${o<0?8.4:15.6}" cy="${h+1}" rx="3.6" ry="1.8" transform="rotate(${o} ${o<0?8.4:15.6} ${h+1})"/>`).join("")}
      <ellipse cx="12" cy="3.2" rx="1.6" ry="2.4"/></g>`,umbel:`
    <path d="M12 22.4V12.4M12 12.4L6 6.4M12 12.4L9 4.6M12 12.4l3-7.8M12 12.4l6-6" stroke="#5f9a3a" stroke-width="1" stroke-linecap="round"/>
    <g fill="currentColor">${[[6,6.4],[9,4.6],[15,4.6],[18,6.4],[12,4]].map(([h,o])=>`<circle cx="${h}" cy="${o}" r="1.9"/>`).join("")}</g>`,clover:`
    <path d="M12 22.4v-9" stroke="${me}" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="currentColor" stroke="${me}" stroke-width=".6">${[0,120,240].map(h=>`<path d="M12 12c-1.6-1.6-4.6-1.4-4.6-4.2 0-1.6 1.4-2.6 2.6-2.2.4-1.4 2-2 2-2s1.6.6 2 2c1.2-.4 2.6.6 2.6 2.2 0 2.8-3 2.6-4.6 4.2z" transform="rotate(${h} 12 12)"/>`).join("")}</g>`,grain:`
    <path d="M12 22.4V4" stroke="#a88a4a" stroke-width="1.1" stroke-linecap="round"/>
    <g fill="currentColor">${[5,8,11,14].map(h=>`<ellipse cx="10" cy="${h}" rx="1.4" ry="2.3" transform="rotate(-25 10 ${h})"/><ellipse cx="14" cy="${h}" rx="1.4" ry="2.3" transform="rotate(25 14 ${h})"/>`).join("")}
      <ellipse cx="12" cy="2.8" rx="1.2" ry="2"/></g>`};function I(h){return h?.icon&&Ze[h.icon]?h.icon:h?.category==="herb"?"herb":h?.category==="flower"?"flower":h?.category==="fruit"?"berry_bush":h?.habit==="root"?"root":h?.habit==="bulb"?"onion":"leafy"}function Pa(){let h=Object.entries(Ze).map(([o,e])=>`<symbol id="pg-${o}" viewBox="0 0 24 24" overflow="visible">${e}</symbol>`).join("");return b`${it(h)}`}function Xt(h,o,e,t,s){return b`<use href=${`#pg-${h}`} x=${o-t/2} y=${e-t/2} width=${t} height=${t} style=${`color:${s}`}></use>`}function H(h,o,e=28){return i`<svg class="plant-glyph" viewBox="0 0 24 24" width=${e} height=${e} style=${`color:${o}`} aria-hidden="true"
    >${it(Ze[h]??Ze.leafy)}</svg
  >`}var ja=["#7fb069","#4c8c3f","#e8a33d","#9cc58a","#c8432f"];function _s(h,o,e,t=12){if(globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return;let s=document.createElement("div");s.className="burst",s.setAttribute("aria-hidden","true"),s.style.left=`${o}px`,s.style.top=`${e}px`;for(let a=0;a<t;a++){let n=document.createElement("span"),r=a/t*Math.PI*2+Math.random()*.5,l=38+Math.random()*46;n.style.setProperty("--dx",`${Math.cos(r)*l}px`),n.style.setProperty("--dy",`${Math.sin(r)*l-18}px`),n.style.setProperty("--rot",`${Math.round(Math.random()*540-270)}deg`),n.style.setProperty("--c",ja[a%ja.length]),n.style.animationDelay=`${Math.random()*60}ms`,s.appendChild(n)}h.appendChild(s),setTimeout(()=>s.remove(),1100)}function Ke(h){if(!h)return;let o=h.getBoundingClientRect();h.dispatchEvent(new CustomEvent("hl-celebrate",{detail:{x:o.left+o.width/2,y:o.top+o.height/2},bubbles:!0,composed:!0}))}var qn="#7d7d7d";function j(h,o){return o&&h[o]?.color||qn}function Ra(h){let o=h.replace(/[^\p{L}\s]/gu,"").trim(),e=o.split(/\s+/);return e.length>1?(e[0][0]+e[1][0]).toUpperCase():(o.slice(0,2)||"?").replace(/^./,t=>t.toUpperCase())}function w(h,o){return h?h.names[o]||h.names.en||h.id:"?"}var Ye={sow_indoor:"mdi:seed-outline",sow_direct:"mdi:seed",harden_off:"mdi:weather-partly-cloudy",transplant:"mdi:shovel",thin:"mdi:content-cut",stake:"mdi:pillar",prune:"mdi:scissors-cutting",pinch:"mdi:hand-back-left-outline",earth_up:"mdi:terrain",feed:"mdi:bottle-tonic-plus-outline",water:"mdi:watering-can",weed:"mdi:sprout-outline",pest_check:"mdi:bug-outline",harvest:"mdi:basket-outline",ventilate:"mdi:window-open-variant",shade:"mdi:sun-angle-outline",frost_protect:"mdi:snowflake-alert",soil_prep:"mdi:shovel",compost:"mdi:recycle",green_manure:"mdi:grass",mulch:"mdi:layers-outline",clean_greenhouse:"mdi:spray-bottle",winter_prep:"mdi:snowflake-variant",plan_season:"mdi:clipboard-text-outline",tool_care:"mdi:hammer-wrench",soil_test:"mdi:test-tube",cut_back:"mdi:content-cut",divide:"mdi:call-split",protect:"mdi:shield-sun-outline",clean:"mdi:broom",tie_in:"mdi:link-variant",thin_fruit:"mdi:fruit-cherries",pollinate:"mdi:bee-flower",check:"mdi:clipboard-check-outline",make_feed:"mdi:flask-outline",custom:"mdi:checkbox-marked-circle-outline"},ot={sow_indoor:"var(--hl-leaf-500)",sow_direct:"var(--hl-leaf-500)",transplant:"var(--hl-leaf-700)",harvest:"var(--hl-sun-500)",water:"var(--hl-water-500)",frost_protect:"var(--hl-frost-500)",ventilate:"var(--hl-frost-500)",shade:"var(--hl-sun-500)",weed:"var(--hl-soil-500)",pest_check:"var(--hl-tomato-500)",soil_prep:"var(--hl-soil-500)",compost:"var(--hl-soil-700)",green_manure:"var(--hl-leaf-600)",mulch:"var(--hl-soil-500)",clean_greenhouse:"var(--hl-frost-500)",winter_prep:"var(--hl-frost-500)",plan_season:"var(--hl-leaf-700)",protect:"var(--hl-sun-500)",clean:"var(--hl-soil-500)",tie_in:"var(--hl-leaf-600)",thin_fruit:"var(--hl-tomato-500)",pollinate:"var(--hl-sun-500)",make_feed:"var(--hl-soil-700)"},ke=h=>{let[o,e,t]=h.slice(0,10).split("-").map(Number);return new Date(o,e-1,t,12)},lt=h=>`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}-${String(h.getDate()).padStart(2,"0")}`,D=(h,o)=>{let e=ke(h);return e.setDate(e.getDate()+o),lt(e)},je=(h,o)=>Math.round((ke(o).getTime()-ke(h).getTime())/864e5);function x(h,o,e={day:"numeric",month:"short"}){return h?ke(h).toLocaleDateString(o==="nl"?"nl-NL":"en-GB",e):"\u2013"}function ks(h,o){let e=h.anchor==="first_frost"?o.first_frost:o.last_frost,t=D(e,h.start_week*7),s=D(e,h.end_week*7+6);return t<=s?[t,s]:[s,t]}function La(h,o,e){return o?h.status==="failed"||h.status==="finished"?!1:o.in_ground<=e&&e<=o.harvest_end:!0}function Xe(h){let o={urgent:3,high:2,normal:1,low:0};return[...h].sort((e,t)=>e.due===t.due?o[t.priority]-o[e.priority]:e.due<t.due?-1:1)}function Me(h){let o=globalThis.crypto?.randomUUID?.()??Math.random().toString(16).slice(2)+Date.now().toString(16);return`${h}_${o.replace(/-/g,"").slice(0,10)}`}function Ae(h,o,e){let t=new Blob([o],{type:e}),s=URL.createObjectURL(t),a=document.createElement("a");a.href=s,a.download=h,a.click(),setTimeout(()=>URL.revokeObjectURL(s),1e3)}function Re(h,o,e){return e<h.season||h.removed_season!=null&&e>=h.removed_season?!1:e<=(h.last_season??h.season)}function Ie(h,o){return h.layout_season==null||o===h.layout_season?{zones:h.zones,beds:h.beds,features:h.features??[]}:h.layouts?.[String(o)]??null}var Ca={outdoor:["vegetable","herb","flower"],greenhouse:["vegetable","herb","fruit"],cold_frame:["vegetable","herb"],orchard:["fruit"],fruit:["fruit"],herbs:["herb","flower"],flowers:["flower","herb"],garden:["flower","herb","fruit"],containers:["vegetable","herb","flower","fruit"]};var $e=class extends E{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en";this.now=new Date}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>this.now=new Date,2e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}updated(){let e=this.now.getHours();this.toggleAttribute("night",e>=22||e<6)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}plantIcon(e){let t=e.planting_id?this.snapshot.plantings.find(a=>a.id===e.planting_id):void 0,s=t?this.plants.get(t.plant_id):void 0;return s?H(I(s),s.color||j(this.families,s.family),34):u}render(){let e=this.snapshot.analysis,t=e?.today??"",s=Xe(this.snapshot.tasks.filter(c=>c.status==="open"&&c.due<=t)).slice(0,8),a=this.lang==="nl"?"nl-BE":"en-GB",n=this.snapshot.settings.weather_entity,r=n?this.hass.states[n]:void 0,l=this.snapshot.beds.filter(c=>e?.beds[c.id]?.irrigation?.moisture!=null),d=this.snapshot.irrigation_status;return i`
      <button class="btn small ghost exit" @click=${()=>this.emit("navigate","dashboard")}>${this.t("wall.exit")}</button>
      <div class="top">
        <div>
          <div class="clock">${this.now.toLocaleTimeString(a,{hour:"2-digit",minute:"2-digit"})}</div>
          <div class="date">${this.now.toLocaleDateString(a,{weekday:"long",day:"numeric",month:"long"})} · ${this.snapshot.gardens?.find(c=>c.entry_id===this.snapshot.entry_id)?.title??"Hortulus"}</div>
        </div>
        ${r?i`<div class="weather">${Zt(r.state,96,this.now.getHours()>=21||this.now.getHours()<6)}
          <div><div class="t">${r.attributes.temperature!=null?Math.round(Number(r.attributes.temperature)):"\u2013"}°</div>
            <div class="c">${this.t(`weather.cond.${r.state}`)}</div></div></div>`:u}
      </div>
      ${d?.leak?i`<div class="alert">${this.t("valve.leak",{liters:d.leak.liters,minutes:d.leak.minutes})}</div>`:u}
      ${(d?.stuck??[]).map(c=>i`<div class="alert">${this.t("valve.stuck",{what:c.what==="pump"?this.t("valve.pump"):c.what,entity:c.entity_id})}</div>`)}
      ${e&&(e.frost.level==="high"||e.frost.level==="moderate")?i`<div class="alert frost">${this.t("dash.frost_risk")}: ${this.t(`risk.${e.frost.level}`)}</div>`:u}
      <div class="grid">
        <section class="panel">
          <h2>${this.t("dash.today_tasks")}</h2>
          ${s.length?i`<ul>${s.map(c=>i`<li class=${c.due<t?"late":""}>
            <button class="tick" aria-label=${this.t("task.complete")} @click=${g=>{Ke(g.currentTarget),this.emit("complete-task",c)}}></button>
            ${this.plantIcon(c)}
            <span>${c.title}<small>${c.due<t?this.t("wall.late",{date:x(c.due,this.lang)}):`${c.estimated_minutes} min`}</small></span>
          </li>`)}</ul>`:i`<p class="empty muted">${this.t("dash.no_tasks")}</p>`}
        </section>
        <section class="panel">
          <h2>${this.t("dash.weather")}</h2>
          ${e?.outlook?.length?i`<div class="days">${e.outlook.slice(0,3).map(c=>i`<div class="day">
            <span class="small muted">${c.day===t?this.t("common.today"):x(c.day,this.lang,{weekday:"long"})}</span>
            <b>${c.tmax!=null?Math.round(c.tmax):"\u2013"}° <span class="muted" style="font-size:18px">${c.tmin!=null?Math.round(c.tmin):"\u2013"}°</span></b>
            <span class="small" style="color:var(--hl-water-500)">${c.rain_mm} mm</span></div>`)}</div>`:u}
          ${l.length?i`<div class="beds">${l.map(c=>{let g=e.beds[c.id].irrigation.moisture??0;return i`<div class="bed"><span>${c.name}</span><span class="gauge"><span style=${`width:${Math.max(4,Math.min(100,g))}%`}></span></span><b>${Math.round(g)}%</b></div>`})}</div>`:u}
          ${d?.running?i`<p style="margin-top:14px;font-size:18px">💧 ${this.t("wall.watering",{bed:this.snapshot.beds.find(c=>c.id===d.bed_id)?.name??""})}</p>`:u}
        </section>
      </div>`}};$e.styles=[L,S`
      :host { display: block; min-height: 100vh; padding: 28px 36px; box-sizing: border-box; color: var(--hl-text);
        background: radial-gradient(900px 500px at 0% 0%, color-mix(in srgb, var(--hl-leaf-100) 80%, transparent), transparent 70%), var(--hl-bg); }
      :host([night]) { filter: brightness(0.78) saturate(0.85); }
      .top { display: flex; align-items: center; gap: 32px; flex-wrap: wrap; }
      .clock { font-family: var(--hl-font-serif); font-size: clamp(64px, 9vw, 128px); font-weight: 700; line-height: 0.95; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
      .date { font-family: var(--hl-font-serif); font-style: italic; font-size: clamp(18px, 2vw, 28px); color: var(--hl-text-muted); }
      .weather { display: flex; align-items: center; gap: 14px; margin-left: auto; }
      .weather .t { font-family: var(--hl-font-serif); font-size: clamp(44px, 5vw, 72px); font-weight: 700; line-height: 1; }
      .weather .c { font-size: 18px; color: var(--hl-text-muted); }
      .exit { position: fixed; top: 12px; right: 12px; opacity: 0.35; }
      .exit:hover { opacity: 1; }
      .grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; margin-top: 28px; }
      @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
      .panel { background: var(--hl-surface); border-radius: 24px; padding: 22px 26px; box-shadow: var(--hl-shadow-2), var(--hl-highlight); }
      .panel h2 { font-size: 26px; margin-bottom: 12px; }
      ul { list-style: none; margin: 0; padding: 0; }
      li { display: flex; align-items: center; gap: 16px; padding: 12px 0; border-top: 1px solid color-mix(in srgb, var(--hl-border) 60%, transparent); font-size: 20px; }
      li:first-child { border-top: 0; }
      .tick { width: 48px; height: 48px; border-radius: 50%; border: 2.5px solid var(--hl-primary); background: none; cursor: pointer; flex: none; }
      .tick:hover { background: var(--hl-leaf-100); }
      li small { display: block; font-size: 14px; color: var(--hl-text-muted); }
      .late small { color: var(--hl-danger); }
      .days { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .day { text-align: center; padding: 12px; border-radius: 16px; background: var(--hl-surface-2); }
      .day b { display: block; font-family: var(--hl-font-serif); font-size: 26px; }
      .beds { display: flex; flex-direction: column; gap: 12px; margin-top: 18px; }
      .bed { display: grid; grid-template-columns: 1fr 2fr 56px; gap: 12px; align-items: center; font-size: 17px; }
      .gauge { height: 12px; border-radius: 6px; background: var(--hl-surface-3); overflow: hidden; }
      .gauge span { display: block; height: 100%; border-radius: 6px; background: linear-gradient(90deg, #d98e57, #9cc58a, #4a90c8); }
      .alert { padding: 14px 18px; border-radius: 16px; font-size: 18px; font-weight: 600; margin-top: 14px;
        background: color-mix(in srgb, var(--hl-danger) 14%, var(--hl-surface)); color: var(--hl-danger); }
      .alert.frost { background: var(--hl-frost-100); color: var(--hl-info); }
      .empty { font-size: 20px; }
    `],p([m({attribute:!1})],$e.prototype,"snapshot",2),p([m({attribute:!1})],$e.prototype,"hass",2),p([m({attribute:!1})],$e.prototype,"t",2),p([m({attribute:!1})],$e.prototype,"plants",2),p([m({attribute:!1})],$e.prototype,"families",2),p([m()],$e.prototype,"lang",2),p([f()],$e.prototype,"now",2),$e=p([z("hl-wall-view")],$e);var xs=["classic","earth","night","season"],Aa="hortulus-theme",Jt=null;function Qt(){if(Jt)return Jt;try{let h=localStorage.getItem(Aa);return h&&xs.includes(h)?h:"classic"}catch{return"classic"}}function Ia(h){try{localStorage.setItem(Aa,h),Jt=null}catch{Jt=h}globalThis.dispatchEvent?.(new CustomEvent("hortulus-theme-changed"))}function Wn(h,o=!1){let e=Number(h.slice(5,7))-1;return o&&(e=(e+6)%12),e<2||e===11?"winter":e<5?"spring":e<8?"summer":"autumn"}function Ha(h,o,e=!1){return h==="night"?{theme:"night",dark:!0}:h==="season"?{theme:`season-${Wn(o,e)}`,dark:null}:{theme:h,dark:null}}var Zn=[.1,.25,.5,1],de=class extends E{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en";this.picked=null;this.kg=0;this.busy=!1;this.done=""}get ready(){let e=this.snapshot.analysis;if(!e)return[];let t=e.today;return this.snapshot.plantings.filter(s=>{if(s.status==="failed"||s.status==="finished")return!1;if(s.status==="harvesting")return!0;let a=e.timelines[s.id];return!!a&&a.harvest_start<=t&&t<=a.harvest_end}).sort((s,a)=>w(this.plants.get(s.plant_id),this.lang).localeCompare(w(this.plants.get(a.plant_id),this.lang)))}bedName(e){return this.snapshot.beds.find(t=>t.id===e)?.name??""}async save(){let e=this.picked,t=this.kg;if(!(!e||t<=0)){this.busy=!0;try{await this.api.logHarvest({planting_id:e.id,kg:Math.round(t*1e3)/1e3}),Ke(this.renderRoot.querySelector(".kg")),this.done=this.t("quick.saved",{kg:t.toLocaleString(this.lang,{maximumFractionDigits:2}),plant:w(this.plants.get(e.plant_id),this.lang)}),this.picked=null,this.kg=0}catch(s){this.done=s.message}finally{this.busy=!1}}}render(){let e=this.ready;return e.length?i`
      <div class="crops" role="group" aria-label=${this.t("quick.title")}>
        ${e.map(t=>{let s=this.plants.get(t.plant_id);return i`<button class="crop" aria-pressed=${String(this.picked?.id===t.id)} ?disabled=${this.busy}
              @click=${()=>{this.picked=this.picked?.id===t.id?null:t,this.kg=0,this.done=""}}>
            <span class="ic">${s?H(I(s),s.color||j(this.families,s.family),20):u}</span>
            <span>${w(s,this.lang)||t.plant_id}<br /><small>${this.bedName(t.bed_id)}</small></span>
          </button>`})}
      </div>
      ${this.picked?i`<div class="weigh">
        <div class="kg" aria-live="polite">${this.kg.toLocaleString(this.lang,{minimumFractionDigits:2,maximumFractionDigits:2})}<small>kg</small></div>
        ${Zn.map(t=>i`<button class="btn step" @click=${()=>this.kg=Math.round((this.kg+t)*100)/100}>+${t.toLocaleString(this.lang)}</button>`)}
        <button class="btn ghost small" ?disabled=${!this.kg} @click=${()=>this.kg=0}>${this.t("quick.reset")}</button>
        <span class="spacer"></span>
        <button class="btn primary" ?disabled=${this.busy||this.kg<=0} @click=${()=>this.save()}>${this.t("quick.save")}</button>
      </div>`:u}
      ${this.done?i`<p class="small ok" role="status">${this.done}</p>`:u}`:i`<p class="small muted">${this.t("quick.none")}</p>`}};de.styles=[L,S`
      :host { display: block; }
      .crops { display: flex; flex-wrap: wrap; gap: 8px; }
      .crop { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px 6px 6px; border-radius: 999px; cursor: pointer;
        border: 1px solid var(--hl-border); background: var(--hl-surface); color: var(--hl-text); font: inherit;
        box-shadow: var(--hl-shadow-1); transition: transform var(--hl-dur) var(--hl-ease), box-shadow var(--hl-dur) var(--hl-ease); }
      .crop:hover { transform: translateY(-1px); box-shadow: var(--hl-shadow-2); }
      .crop[aria-pressed="true"] { border-color: var(--hl-primary); background: var(--hl-leaf-50);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--hl-primary) 18%, transparent); }
      .crop .ic { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; background: var(--hl-surface-2); }
      .crop small { color: var(--hl-text-muted); font-size: 11px; }
      .weigh { margin-top: 14px; padding: 14px; border-radius: 16px; background: var(--hl-surface-2); display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
      .kg { font-family: var(--hl-font-serif); font-size: 34px; font-weight: 700; min-width: 120px; font-variant-numeric: tabular-nums; }
      .kg small { font-family: var(--hl-font); font-size: 14px; font-weight: 600; opacity: 0.7; margin-left: 4px; }
      .step { min-width: 64px; }
      .ok { color: var(--hl-success); font-weight: 600; }
    `],p([m({attribute:!1})],de.prototype,"snapshot",2),p([m({attribute:!1})],de.prototype,"api",2),p([m({attribute:!1})],de.prototype,"t",2),p([m({attribute:!1})],de.prototype,"plants",2),p([m({attribute:!1})],de.prototype,"families",2),p([m()],de.prototype,"lang",2),p([f()],de.prototype,"picked",2),p([f()],de.prototype,"kg",2),p([f()],de.prototype,"busy",2),p([f()],de.prototype,"done",2),de=p([z("hl-quick-harvest")],de);var Na="hortulus-photos",Ba="hortulus-photo:";var Ms=new Map,Vt=null;function St(){if(Vt!==null)return Vt;try{return localStorage.getItem(Na)!=="off"}catch{return!0}}function Ts(h){try{localStorage.setItem(Na,h?"on":"off"),Vt=null}catch{Vt=h}globalThis.dispatchEvent?.(new CustomEvent("hortulus-photos-changed"))}function Kn(h){let o=h.trim().toLowerCase();return/^(cc[ -]?by(-sa)?([ -][\d.]+)?|cc0|public domain|pd\b|attribution)/.test(o)&&!/\b(nc|nd)\b/.test(o)}var Ss=h=>h.replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim(),Es=class extends Error{};function zs(h){let o=(h??"").replace(/\s+/g," ").trim();if(!o||/^(onbekend|unknown)$/i.test(o))return[];let e=[o],t=o.split(" "),s=t[1]==="\xD7"?t.slice(0,3).join(" "):t.slice(0,2).join(" ");return s&&s!==o&&e.push(s),e}function Yn(h){try{let o=localStorage.getItem(Ba+h);if(!o)return;let{at:e,photo:t}=JSON.parse(o);return Date.now()-e<30*864e5?t:void 0}catch{return}}function Da(h,o){try{localStorage.setItem(Ba+h,JSON.stringify({at:Date.now(),photo:o}))}catch{}}async function Oa(h){let o=await fetch(h,{headers:{Accept:"application/json"}});if(o.status===429||o.status>=500)throw new Es(String(o.status));return o.ok?await o.json():null}async function Xn(h,o){let e=`https://${h}.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=extmetadata%7Curl&titles=${encodeURIComponent(`File:${o}`)}`,t=await Oa(e),s=Object.values(t?.query?.pages??{})[0]?.imageinfo?.[0],a=s?.extmetadata??{},n=Ss(a.LicenseShortName?.value??"");return!n||!Kn(n)?null:{artist:Ss(a.Artist?.value??"")||Ss(a.Credit?.value??"")||"Wikimedia Commons",license:n,licenseUrl:a.LicenseUrl?.value??"",filePage:s?.descriptionurl??""}}function Jn(h){let o=h;try{o=new URL(h).pathname}catch{o=h.split(/[?#]/)[0]}let e=o.split("/"),t=e.indexOf("thumb"),s=t>=0?e[t+3]:e[e.length-1];return decodeURIComponent(s??"")}async function Qn(h,o){let e=await Oa(`https://${h}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(o.replace(/ /g,"_"))}`);if(!e||e.type==="disambiguation"||!e.thumbnail?.source)return null;let t=await Xn(h,Jn(e.originalimage?.source??e.thumbnail.source));return t?{src:e.thumbnail.source,page:e.content_urls?.desktop?.page??"",title:e.title??o,...t}:null}function Fa(h,o){let e=zs(h.scientific_name);if(!e.length)return Promise.resolve(null);let t=`${o}:${e[0]}`,s=Yn(t);if(s!==void 0)return Promise.resolve(s);let a=Ms.get(t);return a||(a=(async()=>{let n=o==="en"?["en"]:[o,"en"];for(let r of e)for(let l of n){let d;try{d=await Qn(l,r)}catch{return Ms.delete(t),null}if(d)return Da(t,d),d}return Da(t,null),null})(),Ms.set(t,a)),a}function Ps(h){return`color-mix(in srgb, ${h} 22%, var(--hl-surface, #fff))`}var we=class extends E{constructor(){super(...arguments);this.color="#6aa648";this.lang="en";this.size="card";this.credit=!1;this.photo=null;this.loaded=!1;this.wantPhoto=!1;this.onPref=()=>this.reset()}connectedCallback(){super.connectedCallback(),window.addEventListener("hortulus-photos-changed",this.onPref)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hortulus-photos-changed",this.onPref),this.observer?.disconnect()}updated(e){(e.has("plant")||e.has("lang")||e.has("size"))&&this.reset()}reset(){if(this.photo=null,this.loaded=!1,this.observer?.disconnect(),this.wantPhoto=this.size!=="thumb"&&!!this.plant&&St()&&zs(this.plant.scientific_name).length>0,!!this.wantPhoto){if(typeof IntersectionObserver>"u"){this.load();return}this.observer=new IntersectionObserver(e=>{e.some(t=>t.isIntersecting)&&(this.observer?.disconnect(),this.load())},{rootMargin:"200px"}),this.observer.observe(this)}}async load(){let e=this.plant;if(!e)return;let t=await Fa(e,this.lang);e===this.plant&&this.wantPhoto&&(this.photo=t)}renderCredit(e){let t=`\xA9 ${e.artist} \xB7 ${e.license}`;return this.size==="thumb"?u:i`<a class="credit" href=${e.filePage||e.page} target="_blank" rel="noopener noreferrer"
      title=${`${e.title} \u2013 ${t} (Wikimedia Commons)`}>${this.credit?t:`\xA9 ${e.license}`}</a>`}render(){let e=this.plant,t=this.size==="hero"?150:this.size==="card"?84:32,s=e?e.names?.[this.lang]??e.names?.en??e.id:"";return i`
      <div class="art" style=${`background:${Ps(this.color)}`} role="img" aria-label=${s}>
        ${H(I(e),e?.color||this.color,t)}
      </div>
      ${this.photo?i`<img class=${this.loaded?"on":""} src=${this.photo.src} alt=${s} loading="lazy" referrerpolicy="no-referrer"
        @load=${()=>this.loaded=!0} @error=${()=>this.photo=null} />`:u}
      ${this.photo&&this.loaded?this.renderCredit(this.photo):u}
    `}};we.styles=S`
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
  `,p([m({attribute:!1})],we.prototype,"plant",2),p([m()],we.prototype,"color",2),p([m()],we.prototype,"lang",2),p([m({reflect:!0})],we.prototype,"size",2),p([m({type:Boolean})],we.prototype,"credit",2),p([f()],we.prototype,"photo",2),p([f()],we.prototype,"loaded",2),we=p([z("hl-plant-image")],we);var es=null;function Ua(h){es=h}function js(h){return(es?.task_tools[h]??[]).map(e=>`${es?.tools[e]?.emoji??""} ${es?.tools[e]?.name??e}`.trim()).join(", ")}var Rs=[];function Ga(h){Rs=Object.values(h.states).filter(o=>o.entity_id.startsWith("person.")).map(o=>({id:o.entity_id,name:String(o.attributes.friendly_name??o.entity_id.slice(7))})).sort((o,e)=>o.name.localeCompare(e.name))}var Et=()=>Rs,qa=h=>h&&Rs.find(o=>o.id===h)?.name||(h?h.replace(/^person\./,""):"");var Wa={},Ls=new Set;function Za(h){Wa=h,Ls.forEach(o=>o())}function Vn(h,o){h.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:o},bubbles:!0,composed:!0}))}var dt=null,He=class extends E{constructor(){super(...arguments);this.term="";this.open=!1;this.refresh=()=>this.requestUpdate();this.outside=e=>{e.composedPath().includes(this)?this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0}):this.close()}}connectedCallback(){super.connectedCallback(),Ls.add(this.refresh)}disconnectedCallback(){super.disconnectedCallback(),Ls.delete(this.refresh),dt===this&&(dt=null)}toggle(e){e.stopPropagation(),e.preventDefault(),!this.open&&dt&&dt!==this&&dt.close(),this.open=!this.open,dt=this.open?this:null,this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0})}close(){this.open=!1}onKey(e){e.key==="Escape"&&this.close()}render(){let e=Wa[this.term],t=e?.term??this.term;return i`<button class="i" aria-label=${t} aria-expanded=${String(this.open)} @click=${this.toggle} @keydown=${this.onKey}>
        <ha-icon icon="mdi:information-outline"></ha-icon></button>
      ${this.open&&e?i`<div class="pop" role="tooltip"><b>${e.term}</b>${e.text}
            ${e.chapter?i`<br /><a @click=${()=>{this.close(),Vn(this,e.chapter)}}>${this.t?.("handbook.read_more")??"Read more"} →</a>`:u}
          </div>`:u}`}};He.styles=S`
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
  `,p([m()],He.prototype,"term",2),p([m({attribute:!1})],He.prototype,"t",2),p([f()],He.prototype,"open",2),He=p([z("hl-info")],He);function Cs(h,o){if(!h)return"";let[e,t,s]=h.slice(0,10).split("-");return e&&t&&s?[s,t,e].join(o==="nl"?"-":"/"):h}function Ka(h){let o=h.trim();if(!o)return null;let e,t,s,a=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(o),n=/^(\d{1,2})[-/. ](\d{1,2})[-/. ](\d{2}|\d{4})$/.exec(o);if(a)[e,t,s]=[Number(a[1]),Number(a[2]),Number(a[3])];else if(n)[s,t,e]=[Number(n[1]),Number(n[2]),Number(n[3].length===2?`20${n[3]}`:n[3])];else return;let r=new Date(Date.UTC(e,t-1,s));if(!(r.getUTCFullYear()!==e||r.getUTCMonth()!==t-1||r.getUTCDate()!==s))return`${String(e).padStart(4,"0")}-${String(t).padStart(2,"0")}-${String(s).padStart(2,"0")}`}var se=class extends E{constructor(){super();this.name="";this.min="";this.value="";this.lang="en";this.label="";this.pickLabel="Calendar";this.invalidMessage="dd-mm-yyyy";this.disabled=!1;this.invalid=!1;try{this.internals=this.attachInternals()}catch{}}updated(e){e.has("value")&&this.internals?.setFormValue(this.value||"")}setInvalid(e){if(this.invalid=e,!this.internals)return;let t=this.renderRoot.querySelector("input.text")??void 0;e?this.internals.setValidity({badInput:!0},this.invalidMessage,t):this.internals.setValidity({})}emit(e){if(e&&this.min&&e<this.min){this.setInvalid(!0);return}this.setInvalid(!1),this.value=e??"",this.dispatchEvent(new CustomEvent("date-change",{detail:e,bubbles:!0,composed:!0}))}onText(e){let t=e.target,s=Ka(t.value);if(s===void 0){this.setInvalid(!0);return}if(s&&this.min&&s<this.min){this.setInvalid(!0);return}this.setInvalid(!1),t.value=Cs(s,this.lang),(s??"")!==(this.value??"")&&this.emit(s)}openPicker(){let e=this.picker;e.value=this.value||"";try{e.showPicker?e.showPicker():e.click()}catch{e.click()}}render(){let e=this.lang==="nl"?"dd-mm-jjjj":"dd/mm/yyyy";return i`<input class="text ${this.invalid?"invalid":""}" .value=${Cs(this.value,this.lang)} placeholder=${e}
        aria-label=${this.label} aria-invalid=${String(this.invalid)} ?disabled=${this.disabled} inputmode="numeric" @change=${this.onText} />
      ${this.disabled?u:i`<button type="button" aria-label=${this.pickLabel} title=${this.pickLabel} @click=${this.openPicker}>📅</button>`}
      <input type="date" tabindex="-1" aria-hidden="true" .min=${this.min} @change=${t=>this.emit(t.target.value||null)} />`}};se.formAssociated=!0,se.styles=S`
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
  `,p([m({reflect:!0})],se.prototype,"name",2),p([m()],se.prototype,"min",2),p([m()],se.prototype,"value",2),p([m()],se.prototype,"lang",2),p([m()],se.prototype,"label",2),p([m()],se.prototype,"pickLabel",2),p([m()],se.prototype,"invalidMessage",2),p([m({type:Boolean})],se.prototype,"disabled",2),p([f()],se.prototype,"invalid",2),p([Pe("input[type=date]")],se.prototype,"picker",2),se=p([z("hl-date-input")],se);function as(h,o,e){return t=>{let a=(t.planting_id?h?.plantings.find(r=>r.id===t.planting_id):void 0)?.plant_id??t.title_params?.plant_id,n=a?o.get(a):void 0;return n?{plant:n,color:n.color||j(e,n.family)}:null}}var ts=80,ss=new WeakMap;function ei(h){h.pointerType!=="mouse"&&ss.set(h.currentTarget,{x:h.clientX,y:h.clientY,dx:0,active:!1,id:h.pointerId})}function ti(h){let o=h.currentTarget,e=ss.get(o);if(!e||e.id!==h.pointerId)return;let t=h.clientX-e.x,s=h.clientY-e.y;!e.active&&Math.abs(t)>12&&Math.abs(t)>Math.abs(s)*1.5&&(e.active=!0,o.setPointerCapture(h.pointerId)),e.active&&(e.dx=t,o.style.transform=`translateX(${Math.max(-140,Math.min(140,t))}px)`,o.dataset.swipe=t>ts?"complete":t<-ts?"postpone":"")}function Ya(h,o,e){let t=h.currentTarget,s=ss.get(t);ss.delete(t),t.style.transform="",delete t.dataset.swipe,s?.active&&(h.preventDefault(),s.dx>ts&&o.status==="open"?(Ke(t),e.onComplete(o)):s.dx<-ts&&o.status==="open"&&e.onPostpone&&e.onPostpone(o,1))}function Tt(h,o){let e=h.status==="open"&&h.due<o.today,t=h.status!=="open",s=ot[h.type]??"var(--hl-soil-500)",a=o.plantOf?.(h)??null;return i`
    <li class="task-row ${t?"done":""} prio-${h.priority}" @pointerdown=${ei} @pointermove=${ti}
      @pointerup=${n=>Ya(n,h,o)} @pointercancel=${n=>Ya(n,h,o)}>
      <button class="check" role="checkbox" aria-checked=${String(t)} aria-label=${`${o.t("task.complete")}: ${h.title}`}
        ?disabled=${t} @click=${n=>{Ke(n.currentTarget),o.onComplete(h)}}>
        <ha-icon icon=${t?"mdi:check-circle":"mdi:checkbox-blank-circle-outline"}></ha-icon>
      </button>
      <button class="task-main" @click=${()=>o.onOpen(h)}>
        ${a?i`<span class="type-icon crop" title=${o.t(`type.${h.type}`)}>${H(I(a.plant),a.color,24)}
          <span class="type-badge" style=${`background:${s}`}>${qe(xt[h.type]?h.type:Ye[h.type],11)}</span></span>`:i`<span class="type-icon" style=${`color:${s}`}>${qe(xt[h.type]?h.type:Ye[h.type],21)}</span>`}
        <span class="task-text">
          <span class="task-title">${h.title}</span>
          <span class="task-meta">
            ${e?i`<span class="chip bad">${o.t("common.overdue")} · ${x(h.due,o.lang)}</span>`:i`<span>${x(h.due,o.lang,{weekday:"short",day:"numeric",month:"short"})}</span>`}
            <span>· ${o.t("common.minutes",{n:h.estimated_minutes})}</span>
            ${h.recurrence?i`<span title=${o.t("task.repeat",{n:h.recurrence.interval_days})}>· ↻ ${h.recurrence.interval_days}d</span>`:u}
            ${h.priority==="urgent"||h.priority==="high"?i`<span class="chip ${h.priority==="urgent"?"bad":"warn"}">${o.t(`priority.${h.priority}`)}</span>`:u}
            ${h.assignee?i`<span class="chip" title=${o.t("task.assignee")}><ha-icon icon="mdi:account-outline" style="--mdc-icon-size:14px"></ha-icon>${qa(h.assignee)}</span>`:u}
          </span>
        </span>
      </button>
    </li>`}var ns=S`
  ul.tasks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
  ul.tasks > li + li .task-row, ul.tasks > .task-row + .task-row { border-top: 1px solid color-mix(in srgb, var(--hl-border) 55%, transparent); }
  .task-row { position: relative; display: flex; align-items: center; gap: var(--hl-s1); border-radius: var(--hl-r-md); touch-action: pan-y;
    transition: transform 0.15s ease-out, background var(--hl-dur) var(--hl-ease); background: var(--hl-surface); padding-left: 6px; }
  .task-row[data-swipe="complete"] { background: var(--hl-leaf-100); }
  .task-row[data-swipe="postpone"] { background: var(--hl-sun-100); }
  .task-row:hover { background: var(--hl-surface-2); }
  .task-row.done .task-title { text-decoration: line-through; color: var(--hl-text-muted); }
  .task-row.prio-urgent::before, .task-row.prio-high::before { content: ""; position: absolute; left: 0; top: 12px; bottom: 12px; width: 3px; border-radius: 3px; }
  .task-row.prio-urgent::before { background: var(--hl-danger); }
  .task-row.prio-high::before { background: var(--hl-warning); }
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
`,X=class extends E{constructor(){super(...arguments);this.task=null;this.beds=[];this.lang="en";this.today="";this.create=!1;this.snapshot=null;this.note="";this.harvestKg=0;this.harvestCount=0;this.photos=[];this.busy=!1;this.error=""}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&(this.task||this.create)&&e.showModal()}close(e=!1){this.note="",this.photos=[],this.error="",this.dispatchEvent(new CustomEvent("closed",{detail:{changed:e}}))}async run(e,t){this.busy=!0;try{await e(),t&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t},bubbles:!0,composed:!0})),this.close(!0)}catch(s){this.error=s.message??String(s)}finally{this.busy=!1}}async onPhoto(e){let t=e.target.files?.[0];if(t){this.busy=!0;try{this.photos=[...this.photos,await this.api.uploadPhoto(t)]}catch(s){this.error=s.message}finally{this.busy=!1}}}submitNew(e){e.preventDefault();let t=e.target,s=a=>t.elements.namedItem(a).value;this.run(()=>this.api.addTask({title:s("title"),due:s("due")||null,task_type:s("type"),description:s("description"),priority:s("priority"),estimated_minutes:Number(s("minutes"))||null,bed_id:s("bed")||null,recurrence_days:Number(s("repeat"))||null}))}renderCreate(){let e=["custom","water","weed","feed","pest_check","harvest","prune","stake","sow_direct","transplant","ventilate","frost_protect"];return i`<form @submit=${this.submitNew}>
      <div class="head"><ha-icon class="big-icon" icon="mdi:clipboard-plus-outline"></ha-icon><h2>${this.t("cal.add_task")}</h2></div>
      <div class="body">
        <div class="form-grid">
          <label class="field full">${this.t("task.title")}<input name="title" required autofocus /></label>
          <label class="field">${this.t("task.due")}<hl-date-input name="due" .value=${this.today} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}></hl-date-input></label>
          <label class="field">${this.t("task.type")}<select name="type">${e.map(t=>i`<option value=${t}>${this.t(`type.${t}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.priority")}<select name="priority">${["low","normal","high","urgent"].map(t=>i`<option value=${t} ?selected=${t==="normal"}>${this.t(`priority.${t}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.duration")}<input name="minutes" type="number" min="1" value="15" /></label>
          <label class="field">${this.t("task.bed")}<select name="bed"><option value="">–</option>${this.beds.map(t=>i`<option value=${t.id}>${t.name}</option>`)}</select></label>
          <label class="field">${this.t("task.repeat_days")}<input name="repeat" type="number" min="1" max="365" /></label>
          <label class="field full">${this.t("task.description")}<textarea name="description" rows="3"></textarea></label>
        </div>
        ${this.error?i`<p class="field-error">${this.error}</p>`:u}
      </div>
      <div class="foot">
        <button type="button" class="btn ghost" @click=${()=>this.close()}>${this.t("common.cancel")}</button>
        <button class="btn primary" type="submit" ?disabled=${this.busy}>${this.t("common.add")}</button>
      </div>
    </form>`}renderContext(e){let t=this.snapshot?.analysis;if(!t)return u;let s=[],a=e.bed_id?t.beds[e.bed_id]:void 0,n=e.zone_id??this.snapshot?.beds.find(c=>c.id===e.bed_id)?.zone_id,r=n?t.zones[n]:void 0,l=(c,g,v=0)=>c==null?null:`${c.toFixed(v)} ${g}`;if(a){let c=l(a.irrigation.moisture,"%");c&&s.push([this.t("ctx.moisture"),c]);let g=a.sensors?.soil_temperature?.value;g!=null&&s.push([this.t("ctx.soil_temp"),`${g.toFixed(1)} \xB0C`]),a.irrigation.action!=="none"&&s.push([this.t("ctx.irrigation"),this.t(`irrigation.${a.irrigation.action}`,{mm:a.irrigation.amount_mm,liters:Math.round(a.irrigation.liters)})]),a.depletion_mm!=null&&a.taw_mm&&s.push([this.t("ctx.water_balance"),`${a.depletion_mm.toFixed(0)} / ${a.taw_mm.toFixed(0)} mm`]),a.nutrients?.index!=null&&s.push([this.t("ctx.nutrients"),`${a.nutrients.index} / 100`])}r&&(r.air_temperature!=null&&s.push([this.t("ctx.air_temp"),`${r.air_temperature.toFixed(1)} \xB0C`]),r.humidity!=null&&s.push([this.t("ctx.humidity"),`${Math.round(r.humidity)} %`]),r.disease&&r.disease.level!=="unknown"&&s.push([this.t("ctx.disease"),this.t(`risk.${r.disease.level}`)]),r.frost.level!=="unknown"&&s.push([this.t("ctx.frost"),`${this.t(`risk.${r.frost.level}`)}${r.frost.plant_level_min_c!=null?` \xB7 ${r.frost.plant_level_min_c.toFixed(1)} \xB0C`:""}`]));let d=t.outlook[0];return d&&(d.tmin!=null&&d.tmax!=null&&s.push([this.t("ctx.today"),`${d.tmin.toFixed(0)}\u2013${d.tmax.toFixed(0)} \xB0C`]),s.push([this.t("ctx.rain"),`${d.rain_mm.toFixed(1)} mm`]),d.et0_mm!=null&&s.push([this.t("ctx.et0"),`${d.et0_mm.toFixed(1)} mm`])),s.length?i`<h4>${this.t("ctx.title")}</h4><div class="context">${s.map(([c,g])=>i`<div class="ctx">${c}<b>${g}</b></div>`)}</div>`:u}renderTask(e){let t=e.status==="open",s=(n,r)=>this.run(async()=>{if(n==="complete"&&e.type==="harvest"&&(this.harvestKg>0||this.harvestCount>0)){let l=this.snapshot?.plantings.find(d=>d.id===e.planting_id);await this.api.logHarvest({planting_id:e.planting_id,plant_id:l?null:e.title_params?.plant_id,kg:this.harvestKg,count:this.harvestCount||null,note:this.note||""})}await this.api.taskAction(e.id,n,{note:this.note||void 0,photos:this.photos.length?[...this.photos]:void 0})},r),a=(n,r)=>this.run(async()=>{let l=await this.api.taskAction(e.id,"postpone",{days:n,to:r,note:this.note||void 0}),d=[];l.shifted?.length&&d.push(this.t("task.shifted",{n:l.shifted.length})),l.warnings?.includes("beyond_window")&&d.push(this.t("task.beyond_window")),d.length&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:d.join(" ")},bubbles:!0,composed:!0}))});return i`
      <div class="head">
        <span class="big-icon" style=${`color:${ot[e.type]??"inherit"}`}>${qe(xt[e.type]?e.type:Ye[e.type],36)}</span>
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
        ${e.description?i`<p>${e.description}</p>`:u}
        ${e.title_params?.handbook?i`<a class="small" href="#" @click=${n=>{n.preventDefault(),this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e.title_params.handbook},bubbles:!0,composed:!0})),this.close()}}><ha-icon icon="mdi:book-open-page-variant-outline" style="--mdc-icon-size:16px"></ha-icon> ${this.t("handbook.read_more")}</a>`:u}
        ${this.renderContext(e)}
        ${js(e.type)?i`<p class="small"><ha-icon icon="mdi:toolbox-outline" style="--mdc-icon-size:16px"></ha-icon>
          <b>${this.t("task.tools")}:</b> ${js(e.type)}</p>`:u}
        ${e.window_start&&e.window_end&&e.window_start!==e.window_end?i`<p class="small muted">${this.t("task.window",{start:x(e.window_start,this.lang),end:x(e.window_end,this.lang)})}</p>`:u}
        ${e.recurrence?i`<p class="small muted">↻ ${this.t("task.repeat",{n:e.recurrence.interval_days})}</p>`:u}
        ${Et().length?i`<label class="row small">${this.t("task.assignee")}:
          <select @change=${n=>this.run(()=>this.api.taskAction(e.id,"update",{changes:{assignee:n.target.value||null}}))}>
            <option value="" ?selected=${!e.assignee}>${this.t("task.anyone")}</option>
            ${Et().map(n=>i`<option value=${n.id} ?selected=${e.assignee===n.id}>${n.name}</option>`)}
          </select></label>`:u}
        ${t&&e.type==="harvest"?i`<div class="row wrap small harvest-log">
          <ha-icon icon="mdi:scale" style="--mdc-icon-size:18px"></ha-icon>${this.t("task.harvested")}
          <input type="number" min="0" step="0.05" inputmode="decimal" style="width:90px" placeholder="kg"
            @input=${n=>this.harvestKg=Number(n.target.value)||0} /> kg
          <input type="number" min="0" step="1" inputmode="numeric" style="width:80px" placeholder="#"
            @input=${n=>this.harvestCount=Number(n.target.value)||0} /> ×</div>`:u}
        <div class="row wrap small">
          <span>${this.t("task.priority")}:</span>
          ${["low","normal","high","urgent"].map(n=>i`
            <button class="chip" aria-pressed=${String(e.priority===n)}
              @click=${()=>this.run(()=>this.api.taskAction(e.id,"update",{changes:{priority:n}}))}>${this.t(`priority.${n}`)}</button>`)}
        </div>
        ${e.notes.length?i`<h4>${this.t("task.notes")}</h4>${e.notes.map(n=>i`<p class="note"><span class="xs muted">${x(n.at.slice(0,10),this.lang)}</span> ${n.text}</p>`)}`:u}
        ${e.photos.length||this.photos.length?i`<h4>${this.t("task.photos")}</h4>
          <div class="photos">${[...e.photos,...this.photos].map(n=>i`<a href=${ve(n,"original")} target="_blank" rel="noopener"><img src=${ve(n)} alt=${this.t("task.photos")} loading="lazy" /></a>`)}</div>`:u}
        <label class="field">${this.t("task.note")}<textarea rows="2" .value=${this.note} @input=${n=>this.note=n.target.value}></textarea></label>
        <label class="btn small" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("task.add_photo")}
          <input type="file" accept="image/*" capture="environment" class="visually-hidden" @change=${this.onPhoto} /></label>
        ${t?i`
          <div class="row wrap">
            <span class="small">${this.t("task.postpone")}:</span>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>a(1)}>${this.t("task.postpone_1")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>a(3)}>${this.t("task.postpone_3")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>a(7)}>${this.t("task.postpone_7")}</button>
            <hl-date-input label=${this.t("task.postpone_to")} min=${D(this.today,1)} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}
              @date-change=${n=>n.detail&&a(void 0,n.detail)}></hl-date-input>
          </div>`:u}
        ${this.error?i`<p class="field-error" role="alert">${this.error}</p>`:u}
      </div>
      <div class="foot">
        ${e.source==="user"?i`<button class="btn danger" ?disabled=${this.busy} @click=${()=>s("delete")}>${this.t("common.delete")}</button>`:u}
        <span class="spacer"></span>
        <button class="btn ghost" @click=${()=>this.close()}>${this.t("common.close")}</button>
        ${t?i`<button class="btn" ?disabled=${this.busy} @click=${()=>s("skip")}>${this.t("task.skip")}</button>
              <button class="btn primary" ?disabled=${this.busy} @click=${()=>s("complete",this.t("task.completed",{title:e.title}))}>
                <ha-icon icon="mdi:check"></ha-icon>${this.t("task.complete")}</button>`:i`<button class="btn" ?disabled=${this.busy} @click=${()=>s("reopen")}>${this.t("task.reopen")}</button>`}
      </div>`}render(){return!this.task&&!this.create?u:i`<dialog @close=${()=>this.close()}>${this.create?this.renderCreate():this.renderTask(this.task)}</dialog>`}};X.styles=[L,S`
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
    `],p([m({attribute:!1})],X.prototype,"task",2),p([m({attribute:!1})],X.prototype,"beds",2),p([m({attribute:!1})],X.prototype,"api",2),p([m({attribute:!1})],X.prototype,"t",2),p([m()],X.prototype,"lang",2),p([m()],X.prototype,"today",2),p([m({type:Boolean})],X.prototype,"create",2),p([m({attribute:!1})],X.prototype,"snapshot",2),p([f()],X.prototype,"note",2),p([f()],X.prototype,"harvestKg",2),p([f()],X.prototype,"harvestCount",2),p([f()],X.prototype,"photos",2),p([f()],X.prototype,"busy",2),p([f()],X.prototype,"error",2),X=p([z("hl-task-dialog")],X);var Xa={none:"ok",low:"cold",moderate:"warn",high:"bad",unknown:""},si={frost:"mdi:snowflake-alert",heat:"mdi:thermometer-alert",dry:"mdi:water-alert",sensor_stale:"mdi:access-point-network-off",forecast:"mdi:weather-cloudy-alert",disease:"mdi:mushroom-outline",nutrients:"mdi:flask-outline"},_e=class extends E{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en";this.admin=!0}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get ctx(){return{t:this.t,lang:this.lang,today:this.snapshot.analysis?.today??"",onOpen:e=>this.emit("open-task",e),onComplete:e=>this.emit("complete-task",e),onPostpone:(e,t)=>this.emit("postpone-task",{task:e,days:t}),plantOf:as(this.snapshot,this.plants,this.families)}}renderStuck(){let e=this.snapshot.irrigation_status?.stuck??[],t=this.snapshot.irrigation_status?.leak;return!e.length&&!t?u:i`<section class="alerts" aria-label=${this.t("valve.stuck_title")}>
      ${t?i`<div class="alert critical" role="alert"><ha-icon icon="mdi:water-alert"></ha-icon>
        <div><b>${this.t("valve.leak",{liters:t.liters,minutes:t.minutes})}</b>
        <div class="small">${this.t("valve.leak_hint",{entity:t.entity_id})}</div></div></div>`:u}
      ${e.map(s=>i`<div class="alert critical" role="alert">
      <ha-icon icon="mdi:valve-open"></ha-icon>
      <div><b>${this.t("valve.stuck",{what:s.what==="pump"?this.t("valve.pump"):s.what,entity:s.entity_id})}</b>
        <div class="small">${this.t("valve.stuck_since",{time:new Date(s.since).toLocaleTimeString(this.lang==="nl"?"nl-NL":"en-GB",{hour:"2-digit",minute:"2-digit"})})}</div></div>
      <span class="spacer"></span>
      ${this.admin?i`<button class="btn small danger" @click=${()=>this.emit("close-valve",s.entity_id)}>${this.t("valve.close")}</button>`:u}
    </div>`)}</section>`}seasonOf(e){let t=Number(e.slice(5,7))-1;return this.snapshot.settings.region?.hemisphere==="south"&&(t=(t+6)%12),t<2||t===11?"winter":t<5?"spring":t<8?"summer":"autumn"}greeting(){let e=new Date().getHours();return this.t(e<12?"dash.greeting_morning":e<18?"dash.greeting_afternoon":"dash.greeting_evening")}render(){let e=this.snapshot,t=e.analysis;if(!t)return i`<p class="empty">${this.t("common.loading")}</p>`;let s=t.today,a=Xe(e.tasks.filter(d=>d.status==="open"&&d.due<=s)),n=Xe(e.tasks.filter(d=>d.status==="open"&&d.due>s&&d.due<=D(s,7))),r=a.reduce((d,c)=>d+c.estimated_minutes,0),l=e.zones.filter(d=>d.type!=="outdoor");return i`
      <section class="hero" style=${`--season: var(--hl-grad-${this.seasonOf(s)})`}>
        ${ai(this.seasonOf(s))}
        <div class="eyebrow">${x(s,this.lang,{weekday:"long",day:"numeric",month:"long"})} · ${this.t("common.season",{year:t.season})}</div>
        <h1>${this.greeting()}</h1>
        <p class="lede">${this.t(`dash.lede.${this.seasonOf(s)}`)}</p>
        <button class="btn small ghost wall" @click=${()=>this.emit("navigate","wall")}><ha-icon icon="mdi:tablet-dashboard"></ha-icon>${this.t("wall.open")}</button>
        <div class="stats">
          <div class="stat"><div class="v">${a.length}</div><div class="l">${this.t("dash.stat_tasks")}</div></div>
          <div class="stat"><div class="v">${r}<small>min</small></div><div class="l">${this.t("dash.stat_work")}</div></div>
          <div class="stat ${t.frost.level==="high"||t.frost.level==="moderate"?"alert-frost":""}"><div class="v">${this.t(`risk.${t.frost.level}`)}</div><div class="l">${this.t("dash.frost_risk")}</div></div>
          <div class="stat"><div class="v">${Math.round(t.gdd.season_total)}</div><div class="l">${this.t("dash.stat_gdd")}</div></div>
        </div>
      </section>

      ${this.renderStuck()}
      ${t.alerts.length?i`<section class="alerts" aria-label="Alerts">
        ${t.alerts.map(d=>i`<div class="alert ${d.kind==="frost"?"frost":d.severity}" role=${d.severity==="critical"?"alert":"status"}>
          <ha-icon icon=${si[d.kind]??"mdi:information-outline"}></ha-icon>
          <div><b>${this.t(d.message_key,d.params)}</b>
            ${Array.isArray(d.params.plants)&&d.params.plants.length?i`<div class="small">${d.params.plants.join(", ")}</div>`:u}</div>
        </div>`)}
      </section>`:u}

      <div class="grid">
        <section class="card span-8" aria-labelledby="today-h">
          <header><h2 id="today-h">${this.t("dash.today_tasks")}</h2><span class="spacer"></span>
            ${a.length?i`<span class="small muted">${this.t("dash.total_time",{minutes:r})}</span>`:u}</header>
          ${a.length?i`<ul class="tasks">${a.slice(0,10).map(d=>Tt(d,this.ctx))}</ul>`:i`<p class="empty">${this.t("dash.no_tasks")}</p>`}
          ${a.length>10?i`<button class="btn small ghost" @click=${()=>this.emit("navigate","calendar")}>${this.t("dash.show_all",{n:a.length})}</button>`:u}
        </section>

        ${this.api&&this.admin?i`<section class="card span-12" aria-labelledby="quick-h">
          <header><h2 id="quick-h">${this.t("quick.title")}</h2><span class="spacer"></span><span class="small muted">${this.t("quick.hint")}</span></header>
          <hl-quick-harvest .snapshot=${e} .api=${this.api} .t=${this.t} .plants=${this.plants} .families=${this.families} lang=${this.lang}></hl-quick-harvest>
        </section>`:u}
        <section class="card span-4" aria-labelledby="weather-h">
          <header><h2 id="weather-h">${this.t("dash.weather")}</h2></header>
          ${t.weather_available?i`
            <div class="days">${t.outlook.slice(0,3).map(d=>i`
              <div class="day">
                <div class="small muted">${d.day===s?this.t("common.today"):x(d.day,this.lang,{weekday:"short"})}</div>
                <div class="temp">${d.tmax!=null?Math.round(d.tmax):"\u2013"}° <span class="muted small">${d.tmin!=null?Math.round(d.tmin):"\u2013"}°</span></div>
                <div class="xs muted">💧 ${d.rain_mm} mm${d.et0_mm!=null?i` · ET₀ ${d.et0_mm}`:u}</div>
              </div>`)}</div>
            <div class="divider"></div>
            <div class="kv"><span>${this.t("dash.frost_risk")}</span><span class="chip ${Xa[t.frost.level]}">${this.t(`risk.${t.frost.level}`)}</span></div>
            ${t.frost.plant_level_min_c!=null?i`<div class="kv"><span></span><span class="muted">${this.t("dash.min_temp",{temp:t.frost.plant_level_min_c})}${t.frost.min_at?` \xB7 ${new Date(t.frost.min_at).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{weekday:"short",hour:"2-digit",minute:"2-digit"})}`:""}</span></div>`:u}
          `:i`<p class="small muted">${this.t("dash.forecast_missing")}</p>`}
          <div class="divider"></div>
          ${t.et0_today!=null?i`<div class="kv"><span>ET₀ ${this.t("common.today").toLowerCase()} <hl-info term="et0" .t=${this.t}></hl-info></span>
            <span><b>${t.et0_today.toFixed(1)} mm</b> <span class="muted xs">${t.et0_method==="penman_monteith"?"Penman-Monteith":t.et0_method==="hargreaves"?"Hargreaves":""}</span></span></div>`:u}
          ${t.gdd_today!=null?i`<div class="kv"><span>${this.t("dash.gdd_today")}</span><span><b>${t.gdd_today.toFixed(1)}</b></span></div>`:u}
          <div class="kv"><span>${this.t("dash.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span><b>${Math.round(t.gdd.season_total)}</b> <span class="muted xs">${this.t("dash.gdd_since",{date:x(t.gdd.since,this.lang)})}</span></span></div>
        </section>

        <section class="card span-8" aria-labelledby="beds-h">
          <header><h2 id="beds-h">${this.t("dash.beds")}</h2></header>
          <div class="beds">${e.beds.map(d=>this.renderBed(d.id))}</div>
        </section>

        ${this.renderWaterClimate()}

        <section class="card span-4" aria-labelledby="up-h">
          ${l.map(d=>{let c=t.zones[d.id]?.greenhouse;return i`<header><h2>${d.name}</h2><span class="spacer"></span>
                <span class="chip ${c?.action==="none"||!c?"ok":c.action==="shade"||c.action==="heat"?"bad":"warn"}">${this.t(`gh.${c?.action??"none"}`)}</span></header>
              ${t.zones[d.id]?.air_temperature!=null?i`<div class="big">${t.zones[d.id].air_temperature?.toFixed(1)}°</div>`:i`<p class="small muted">${this.t("dash.no_sensor")}</p>`}
              ${c?.limit_max_c!=null&&c.limiting_plants.length?i`<p class="small muted">${this.t("dash.limits",{min:c.limit_min_c,max:c.limit_max_c})} (${c.limiting_plants.join(", ")})</p>`:u}
              ${c?.forecast_max_c!=null?i`<p class="xs muted">↑ ${c.forecast_max_c}° · ↓ ${c.forecast_min_c??"\u2013"}°</p>`:u}
              <div class="divider"></div>`})}
          <header><h2 id="up-h">${this.t("dash.coming_up")}</h2></header>
          ${n.length?i`<ul class="tasks">${n.slice(0,8).map(d=>Tt(d,this.ctx))}</ul>`:i`<p class="small muted">–</p>`}
        </section>
      </div>
    `}renderWaterClimate(){let e=this.snapshot,t=e.analysis,s=e.irrigation_status,a=e.settings.irrigation,n=e.beds.filter(c=>c.irrigation_entity).length,r=e.zones.filter(c=>t.zones[c.id]?.disease&&t.zones[c.id].disease.level!=="unknown"),l=e.beds.filter(c=>t.beds[c.id]?.irrigation.action==="water"),d=c=>e.beds.find(g=>g.id===c)?.name??"";return i`<section class="card span-4" aria-labelledby="wc-h">
      <header><h2 id="wc-h">${this.t("dash.water_climate")}</h2></header>
      <div class="kv"><span>${this.t("dash.irrigation_mode")}</span><span class="chip">${this.t(`settings.irrigation_mode.${a?.mode??"advise"}`)}</span></div>
      ${s?.running?i`<div class="kv"><span class="chip ok"><ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.watering_now",{bed:d(s.bed_id)})}</span>
        <button class="btn small danger" @click=${()=>this.emit("irrigation","stop")}>${this.t("dash.stop")}</button></div>`:u}
      ${s?.last_error?i`<p class="xs" style="color:var(--hl-danger)">⚠ ${s.last_error}</p>`:u}
      <div class="kv"><span>${this.t("dash.beds_need_water")}</span><b>${l.length?l.map(c=>c.name).join(", "):"\u2013"}</b></div>
      ${n&&this.admin&&!s?.running?i`<button class="btn small" @click=${()=>this.emit("irrigation","run")}>
        <ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.water_now")}</button>
        <p class="xs muted">${this.t("dash.safety_note")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></p>`:u}
      ${r.length?i`<div class="divider"></div>
        <div class="kv"><span><b>${this.t("dash.disease_risk")}</b> <hl-info term="leaf_wetness" .t=${this.t}></hl-info></span></div>
        ${r.map(c=>{let g=t.zones[c.id].disease;return i`<div class="kv"><span>${c.name}</span><span class="chip ${Xa[g.level]}">${this.t(`risk.${g.level}`)}${g.wet_hours?` \xB7 ${Math.round(g.wet_hours)} h`:""}</span></div>`})}`:u}
    </section>`}renderBed(e){let t=this.snapshot,s=t.beds.find(v=>v.id===e),a=t.analysis?.beds[e],n=a?.irrigation,r=a?.moisture_status??"unknown",l=a?.sensors?.soil_temperature?.value,d=(a?.active_plantings??[]).map(v=>t.plantings.find($=>$.id===v)).filter(Boolean),c=r==="optimal"?"ok":r==="dry"?"bad":r==="unknown"?"":r==="wet"?"cold":"warn",g=v=>Math.max(0,Math.min(100,v));return i`
      <article class="bed" aria-label=${s.name}>
        <div class="row"><h3>${s.name}</h3><span class="spacer"></span><span class="chip ${c}">${this.t(`moisture.${r}`)}</span></div>
        ${n?.moisture!=null?i`
          <div class="gauge" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(n.moisture)} aria-label=${this.t("settings.sensor.soil_moisture")}>
            ${n.target_low!=null&&n.target_high!=null?i`<div class="target" style=${`left:${g(n.target_low)}%;width:${g(n.target_high)-g(n.target_low)}%`}></div>`:u}
            <div class="value" style=${`left:${g(n.moisture)}%`}></div>
          </div>
          <div class="kv"><span>💧 ${Math.round(n.moisture)}%</span>${l!=null?i`<span>🌡 ${l.toFixed(1)} °C</span>`:u}</div>`:i`<p class="xs muted">${this.t("dash.no_sensor")}</p>`}
        ${n?i`<p class="small"><ha-icon icon="mdi:watering-can-outline" style="--mdc-icon-size:16px"></ha-icon>
          ${this.t(`irrigation.${n.action}`,{mm:n.amount_mm,liters:Math.round(n.liters)})}${n.duration_min?` \xB7 ${Math.round(n.duration_min)} min`:""}</p>`:u}
        ${a?.nutrients?.index!=null?i`<div class="kv"><span>${this.t("dash.nutrients")} <hl-info term="nutrient_index" .t=${this.t}></hl-info></span>
          <span class="chip ${a.nutrients.status==="balanced"?"ok":"warn"}">${a.nutrients.index}/100</span></div>`:u}
        ${a?.depletion_mm!=null&&a.taw_mm?i`<div class="kv xs muted"><span>${this.t("dash.water_balance")} <hl-info term="water_balance" .t=${this.t}></hl-info></span>
          <span>${Math.round(a.depletion_mm)} / ${Math.round(a.taw_mm)} mm</span></div>`:u}
        <div class="avatars" aria-label=${this.t("dash.active_crops",{n:d.length})}>
          ${d.map(v=>{let $=this.plants.get(v.plant_id),T=w($,this.lang),k=$?.color||j(this.families,$?.family);return i`<button class="avatar" title=${T} style=${`background:${Ps(k)}`}
              @click=${()=>$&&this.emit("open-plant",$.id)}>${$?H(I($),k,22):T.slice(0,2)}</button>`})}
        </div>
      </article>`}};_e.styles=[L,ns,S`
      .hero { position: relative; overflow: hidden; border-radius: 22px; margin-bottom: var(--hl-s5); padding: 28px 32px 24px;
        color: var(--hl-hero-ink); background: var(--season, var(--hl-grad-spring)); box-shadow: var(--hl-shadow-2), var(--hl-highlight);
        isolation: isolate; }
      .hero::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0.55;
        background: radial-gradient(600px 220px at 85% 10%, rgba(255, 255, 255, 0.7), transparent 70%),
          radial-gradient(400px 200px at 0% 120%, rgba(255, 255, 255, 0.35), transparent 70%); }
      :host-context([dark]) .hero::before { opacity: 0.08; }
      .hero .wall { position: absolute; top: 16px; right: 16px; background: color-mix(in srgb, var(--hl-surface) 55%, transparent); }
      .hero .art { position: absolute; right: 18px; top: -6px; height: 150%; opacity: 0.9; z-index: -1; pointer-events: none; }
      .hero .eyebrow { color: color-mix(in srgb, var(--hl-hero-ink) 70%, transparent); }
      .hero h1 { font-size: clamp(28px, 3.4vw, 42px); color: var(--hl-hero-ink); margin: 6px 0 2px; }
      .hero .lede { font-family: var(--hl-font-serif); font-style: italic; font-size: 16px; color: color-mix(in srgb, var(--hl-hero-ink) 78%, transparent); max-width: 560px; }
      .stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-top: 20px; max-width: 760px; }
      .stat { padding: 12px 14px; border-radius: 14px; background: color-mix(in srgb, var(--hl-surface) 62%, transparent);
        backdrop-filter: blur(6px); border: 1px solid color-mix(in srgb, #fff 45%, transparent); box-shadow: var(--hl-shadow-1); }
      :host-context([dark]) .stat { border-color: rgba(255, 255, 255, 0.06); }
      .stat .v { font-family: var(--hl-font-serif); font-size: 26px; font-weight: 700; line-height: 1.05; font-variant-numeric: tabular-nums; }
      .stat .v small { font-family: var(--hl-font); font-size: 12px; font-weight: 600; margin-left: 2px; opacity: 0.7; }
      .stat .l { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.72; margin-top: 4px; }
      .stat.alert-frost .v { color: var(--hl-info); }
      @media (max-width: 720px) { .hero { padding: 22px 20px; } .stats { grid-template-columns: repeat(2, 1fr); } .hero .art { opacity: 0.35; } }
      .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--hl-s4); }
      .span-8 { grid-column: span 8; }
      .span-4 { grid-column: span 4; }
      .span-12 { grid-column: span 12; }
      @media (max-width: 1100px) { .span-8, .span-4 { grid-column: span 12; } }
      .alerts { display: flex; flex-direction: column; gap: var(--hl-s2); margin-bottom: var(--hl-s4); }
      .alert { position: relative; display: flex; gap: var(--hl-s3); align-items: center; padding: 14px 18px 14px 22px; border-radius: 14px;
        border: 1px solid var(--hl-border); background: var(--hl-surface); box-shadow: var(--hl-shadow-1); overflow: hidden; }
      .alert::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--accent, var(--hl-text-muted)); }
      .alert > ha-icon { flex: none; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%;
        background: color-mix(in srgb, var(--accent, var(--hl-text-muted)) 14%, transparent); color: var(--accent, var(--hl-text)); }
      .alert.critical { --accent: var(--hl-danger); }
      .alert.warning { --accent: var(--hl-warning); }
      .alert.frost { --accent: var(--hl-info); }
      .alert.critical { background: var(--hl-tomato-100); border-color: color-mix(in srgb, var(--hl-danger) 35%, transparent); }
      .alert.warning { background: var(--hl-sun-100); border-color: color-mix(in srgb, var(--hl-warning) 35%, transparent); }
      .alert.frost { background: var(--hl-frost-100); border-color: color-mix(in srgb, var(--hl-info) 35%, transparent); }
      .alert ha-icon { --mdc-icon-size: 20px; }
      .beds { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--hl-s3); }
      .bed { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); background: var(--hl-surface-2); display: flex; flex-direction: column; gap: var(--hl-s2); }
      .gauge { height: 8px; border-radius: 4px; background: var(--hl-surface-3); position: relative; overflow: hidden; }
      .gauge .target { position: absolute; top: 0; bottom: 0; background: color-mix(in srgb, var(--hl-leaf-500) 30%, transparent); }
      .gauge .value { position: absolute; top: -2px; bottom: -2px; width: 3px; background: var(--hl-text); border-radius: 2px; }
      .avatars { display: flex; flex-wrap: wrap; gap: 4px; }
      .avatar { border: 0; cursor: pointer; padding: 0; width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; color: #fff; font-size: 10px; font-weight: 700; }
      .days { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--hl-s2); }
      .day { text-align: center; padding: 12px 8px; border-radius: 14px; border: 1px solid color-mix(in srgb, var(--hl-border) 70%, transparent);
        background: linear-gradient(180deg, var(--hl-frost-100) 0%, var(--hl-surface) 100%); }
      .day:first-child { background: linear-gradient(180deg, var(--hl-sun-100) 0%, var(--hl-surface) 100%); }
      .day .temp { font-family: var(--hl-font-serif); font-size: 24px; font-weight: 700; margin: 2px 0; }
      .alert.warning { background: color-mix(in srgb, var(--hl-sun-100) 65%, var(--hl-surface)); }
      .alert.critical { background: color-mix(in srgb, var(--hl-tomato-100) 65%, var(--hl-surface)); }
      .alert.frost { background: color-mix(in srgb, var(--hl-frost-100) 65%, var(--hl-surface)); }
      .big { font-size: var(--hl-fs-3xl); font-weight: 700; line-height: 1; }
      .kv { display: flex; justify-content: space-between; gap: var(--hl-s2); font-size: var(--hl-fs-sm); }
    `],p([m({attribute:!1})],_e.prototype,"snapshot",2),p([m({attribute:!1})],_e.prototype,"plants",2),p([m({attribute:!1})],_e.prototype,"families",2),p([m({attribute:!1})],_e.prototype,"api",2),p([m({attribute:!1})],_e.prototype,"t",2),p([m()],_e.prototype,"lang",2),p([m({type:Boolean})],_e.prototype,"admin",2),_e=p([z("hl-dashboard-view")],_e);function ai(h){let o="color-mix(in srgb, var(--hl-hero-ink) 32%, transparent)",e={spring:"#7fb069",summer:"#e8a33d",autumn:"#c8742f",winter:"#7d9bb8"}[h]??"#7fb069";return i`<svg class="art" viewBox="0 0 260 220" aria-hidden="true">
    <g fill="none" stroke=${o} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M150 220 C150 170 146 120 160 70 C168 42 182 22 200 8" />
      <path d="M152 170 C128 160 112 140 108 116 C132 118 150 136 152 170 Z" fill=${e} fill-opacity="0.28" />
      <path d="M156 128 C182 122 200 104 206 80 C182 82 162 98 156 128 Z" fill=${e} fill-opacity="0.28" />
      <path d="M160 92 C140 82 130 64 130 44 C150 50 162 68 160 92 Z" fill=${e} fill-opacity="0.22" />
      <path d="M182 40 C198 40 212 30 220 16 C204 14 190 24 182 40 Z" fill=${e} fill-opacity="0.22" />
      <path d="M152 170 L130 132 M156 128 L190 96 M160 92 L142 60" stroke-width="1" />
      <circle cx="214" cy="54" r="7" fill=${e} fill-opacity="0.5" />
      <circle cx="226" cy="70" r="4.5" fill=${e} fill-opacity="0.4" />
      <path d="M60 220 C64 190 58 166 70 140 M70 140 C58 128 52 112 56 96 C68 104 74 120 70 140 Z" fill=${e} fill-opacity="0.16" />
    </g>
  </svg>`}var V=(h,o)=>o>0?Math.round(h/o)*o:h,ht=h=>({x:h.x_cm,y:h.y_cm,w:h.width_cm,h:h.length_cm}),pt=h=>({x:h.x_cm,y:h.y_cm,w:h.width_cm,h:h.length_cm}),Ja=(h,o)=>({x:o.x_cm+h.x_cm,y:o.y_cm+h.y_cm,w:h.width_cm,h:h.length_cm}),ni=(h,o,e)=>o>=h.x&&o<=h.x+h.w&&e>=h.y&&e<=h.y+h.h;function Le(h,o){let e=Math.min(h.w,o.w),t=Math.min(h.h,o.h);return{x:Math.min(Math.max(h.x,o.x),o.x+o.w-e),y:Math.min(Math.max(h.y,o.y),o.y+o.h-t),w:e,h:t}}function ii(h,o){return h.x<o.x+o.w&&o.x<h.x+h.w&&h.y<o.y+o.h&&o.y<h.y+h.h}function Qa(h,o,e){for(let t=h.length-1;t>=0;t--)if(ni(ht(h[t]),o,e))return h[t]}function zt(h,o,e){let t=Math.max(h.spacing_cm,5);if(o==="single")return{w:t,h:t};if(o==="row"){let a=e.width_cm>=e.length_cm,n=Math.max(Math.min(h.row_spacing_cm,40),10);return a?{w:e.width_cm,h:n}:{w:n,h:e.length_cm}}let s=Math.min(Math.max(t*2,30),Math.min(e.width_cm,e.length_cm));return{w:s,h:s}}function As(h,o){let e={x:h.x_cm,y:h.y_cm,w:h.width_cm,h:h.length_cm};if(h.layout==="single")return[[e.x+e.w/2,e.y+e.h/2]];let t=Math.max(o.spacing_cm,1);if(h.layout==="row"){let r=e.w>=e.h,l=r?e.w:e.h,d=r?e.h:e.w,c=Math.max(1,Math.floor(l/t)),g=Math.max(1,Math.floor(d/Math.max(o.row_spacing_cm,1))),v=[];for(let $=0;$<g;$++)for(let T=0;T<c;T++){let k=l/c*(T+.5),M=d/g*($+.5);v.push(r?[e.x+k,e.y+M]:[e.x+M,e.y+k])}return v}let s=Math.max(1,Math.floor(e.w/t)),a=Math.max(1,Math.floor(e.h/t)),n=[];for(let r=0;r<a;r++)for(let l=0;l<s;l++)n.push([e.x+e.w/s*(l+.5),e.y+e.h/a*(r+.5)]);return n}function Va(h,o){return h.count&&h.count>0?h.count:As(h,o).length}function Je(h,o,e,t){let s=Math.max(t,5);for(let a=0;a+o.h<=h.length_cm+.01;a+=s)for(let n=0;n+o.w<=h.width_cm+.01;n+=s){let r={x:n,y:a,w:o.w,h:o.h};if(!e.some(l=>ii(r,l)))return{x:n,y:a}}return null}function is(h,o,e=[]){let t=[...h.map(pt),...o.map(ht),...e];if(!t.length)return{x:0,y:0,w:600,h:400};let s=Math.min(...t.map(l=>l.x)),a=Math.min(...t.map(l=>l.y)),n=Math.max(...t.map(l=>l.x+l.w)),r=Math.max(...t.map(l=>l.y+l.h));return{x:s,y:a,w:n-s,h:r-a}}function Is(h,o){if(h.length<2)return h.map(r=>({...r}));let e=h.map(r=>({...r})),t=Math.min(...h.map(r=>r.x)),s=Math.max(...h.map(r=>r.x+r.w)),a=Math.min(...h.map(r=>r.y)),n=Math.max(...h.map(r=>r.y+r.h));switch(o){case"left":e.forEach(r=>r.x=t);break;case"right":e.forEach(r=>r.x=s-r.w);break;case"top":e.forEach(r=>r.y=a);break;case"bottom":e.forEach(r=>r.y=n-r.h);break;case"hcenter":e.forEach(r=>r.x=(t+s)/2-r.w/2);break;case"vcenter":e.forEach(r=>r.y=(a+n)/2-r.h/2);break;case"hdistribute":{let r=e.map((c,g)=>[c,g]).sort((c,g)=>c[0].x-g[0].x),l=(s-t-r.reduce((c,[g])=>c+g.w,0))/(r.length-1),d=t;for(let[c]of r)c.x=d,d+=c.w+l;break}case"vdistribute":{let r=e.map((c,g)=>[c,g]).sort((c,g)=>c[0].y-g[0].y),l=(n-a-r.reduce((c,[g])=>c+g.h,0))/(r.length-1),d=a;for(let[c]of r)c.y=d,d+=c.h+l;break}}return e.map(r=>({...r,x:Math.round(r.x),y:Math.round(r.y)}))}var Qe={path:{fill:"#e3d6bd",stroke:"#b3a283",icon:"\u{1F6B6}",pattern:"gravel",opacity:.95},terrace:{fill:"#cfc6b8",stroke:"#8f8577",icon:"\u2615",pattern:"tiles",opacity:.95},lawn:{fill:"#9cc46a",stroke:"#6f9a45",icon:"\u{1F331}",pattern:"grass",opacity:.7},flowerbed:{fill:"#d7e8b8",stroke:"#8fae6a",icon:"\u{1F338}",pattern:"flowers",opacity:.85},compost:{fill:"#8a6a45",stroke:"#5c442a",icon:"\u267B",opacity:.7},water_butt:{fill:"#4c8fbf",stroke:"#2d6a96",icon:"\u{1F4A7}",opacity:.7},pond:{fill:"#7fb6d9",stroke:"#3f7fa8",icon:"\u{1F438}",pattern:"water",opacity:.85},shed:{fill:"#9aa3a0",stroke:"#6b7370",icon:"\u{1F3E0}",pattern:"roof",opacity:.85},tree:{fill:"#4e7d3a",stroke:"#2f5222",icon:"\u{1F333}",opacity:.5},hedge:{fill:"#5f8f45",stroke:"#3d6b2a",icon:"\u{1F33F}",pattern:"hedge",opacity:.8},fence:{fill:"#8a6a45",stroke:"#5c442a",icon:"\u{1FAB5}",opacity:.9},trellis:{fill:"#7a5c3e",stroke:"#5a3f25",icon:"\u256B",opacity:.6},house:{fill:"#c9b8a8",stroke:"#7d6a5a",icon:"\u{1F3E0}",pattern:"house",opacity:.95},driveway:{fill:"#d2ccc2",stroke:"#9a9285",icon:"\u{1F697}",pattern:"pavers",opacity:.95},parking:{fill:"#d2ccc2",stroke:"#9a9285",icon:"\u{1F17F}\uFE0F",pattern:"pavers",opacity:.95},street:{fill:"#8f9294",stroke:"#5f6264",icon:"\u{1F6E3}\uFE0F",pattern:"asphalt",opacity:.95},play:{fill:"#efe0a0",stroke:"#c2a84a",icon:"\u{1F6DD}",opacity:.7},beehive:{fill:"#f2c230",stroke:"#b5841a",icon:"\u{1F41D}",opacity:.85},stone_path:{fill:"#cfc8bd",stroke:"#958d80",icon:"\u{1FAA8}",pattern:"flagstones",opacity:.95},wood_path:{fill:"#c39463",stroke:"#8a6238",icon:"\u{1FAB5}",pattern:"planks",opacity:.95},stepping_stones:{fill:"#a6cc72",stroke:"#8f887c",icon:"\u{1F463}",pattern:"stepping",opacity:.9},bark_path:{fill:"#a07a52",stroke:"#7d5a38",icon:"\u{1F7EB}",pattern:"bark",opacity:.9},decking:{fill:"#c39463",stroke:"#8a6238",icon:"\u{1FA91}",pattern:"planks",opacity:.95},wall:{fill:"#b07a5c",stroke:"#7d4f36",icon:"\u{1F9F1}",pattern:"bricks",opacity:.95},carport:{fill:"#a4aca9",stroke:"#6b7370",icon:"\u{1F699}",pattern:"roof",opacity:.85},shrub:{fill:"#5f8f45",stroke:"#3d6b2a",icon:"\u{1F333}",pattern:"hedge",opacity:.75},pool:{fill:"#5fb0e0",stroke:"#2d7fb0",icon:"\u{1F3CA}",pattern:"pool",opacity:.95},seating:{fill:"#d9c7a3",stroke:"#9c8460",icon:"\u{1FA91}",pattern:"tiles",opacity:.85},other:{fill:"#b4b4b4",stroke:"#888",icon:"\u2022",opacity:.55}},he={outdoor:{fill:"var(--hl-zone-outdoor)",stroke:"var(--hl-leaf-300)",dash:"8 4",icon:"\u{1F955}"},greenhouse:{fill:"var(--hl-zone-greenhouse)",stroke:"var(--hl-frost-500)",dash:"none",icon:"\u{1F3E1}"},cold_frame:{fill:"var(--hl-zone-greenhouse)",stroke:"var(--hl-frost-500)",dash:"3 3",icon:"\u{1FA9F}"},orchard:{fill:"rgba(120, 170, 80, 0.16)",stroke:"#6f9a45",dash:"10 4",icon:"\u{1F34E}"},fruit:{fill:"rgba(200, 60, 90, 0.08)",stroke:"#c8506a",dash:"10 4",icon:"\u{1FAD0}"},herbs:{fill:"rgba(80, 110, 176, 0.09)",stroke:"#6a84c0",dash:"10 4",icon:"\u{1F33F}"},flowers:{fill:"rgba(224, 106, 160, 0.09)",stroke:"#d27aa8",dash:"10 4",icon:"\u{1F338}"},garden:{fill:"rgba(110, 150, 90, 0.10)",stroke:"#7a9a5a",dash:"10 4",icon:"\u{1F3E1}"},containers:{fill:"rgba(176, 122, 92, 0.10)",stroke:"#b07a5c",dash:"4 3",icon:"\u{1FAB4}"}},en={friend:{color:"var(--hl-leaf-500)",dash:"none",width:2},pest_synergy:{color:"var(--hl-leaf-600)",dash:"2 3",width:2},enemy:{color:"var(--hl-tomato-500)",dash:"6 4",width:2.5},allelopathy:{color:"#8e5ba8",dash:"6 4",width:2.5},competition:{color:"var(--hl-sun-500)",dash:"3 3",width:2},shading:{color:"#6b7370",dash:"1 4",width:2.5},overlap:{color:"var(--hl-sun-500)",dash:"6 4",width:2.5}};var tn={dry:"#c8432f",slightly_dry:"#e8a33d",optimal:"#4c8c3f",wet:"#3a7ca5",unknown:"transparent"},C=class extends E{constructor(){super(...arguments);this.zones=[];this.beds=[];this.plantings=[];this.features=[];this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.plants=new Map;this.families={};this.selection=null;this.ghost=null;this.reports={};this.timelines={};this.analysis=null;this.lang="en";this.snapStep=10;this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.readonly=!1;this.lockLayout=!1;this.focusZone="";this.drawTool=null;this.drawRect=null;this.k=1;this.tx=20;this.ty=20;this.preview=null;this.drag=null;this.pendingSelect=null;this.fitted=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.fitted||this.fit()}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}updated(e){!this.fitted&&(e.has("zones")||e.has("beds"))&&(this.zones.length||this.beds.length)&&this.fit()}fit(){let e=this.getBoundingClientRect();if(!e.width||!e.height)return;let t=is(this.zones,this.beds,this.features.map(a=>({x:a.x_cm,y:a.y_cm,w:a.width_cm,h:a.length_cm}))),s=32;this.k=Math.max(.2,Math.min((e.width-s*2)/t.w,(e.height-s*2)/t.h,6)),this.tx=s-t.x*this.k+(e.width-s*2-t.w*this.k)/2,this.ty=s-t.y*this.k+(e.height-s*2-t.h*this.k)/2,this.fitted=!0}fitRect(e,t=40){let s=this.getBoundingClientRect();!s.width||!s.height||!e.w||!e.h||(this.k=Math.max(.2,Math.min((s.width-t*2)/e.w,(s.height-t*2)/e.h,8)),this.tx=t-e.x*this.k+(s.width-t*2-e.w*this.k)/2,this.ty=t-e.y*this.k+(s.height-t*2-e.h*this.k)/2,this.fitted=!0)}zoom(e,t,s){let a=this.getBoundingClientRect(),n=t??a.width/2,r=s??a.height/2,l=Math.max(.15,Math.min(this.k*e,12));this.tx=n-(n-this.tx)*l/this.k,this.ty=r-(r-this.ty)*l/this.k,this.k=l}clientToCanvas(e,t){let s=this.getBoundingClientRect();return e<s.left||e>s.right||t<s.top||t>s.bottom?null:{x:(e-s.left-this.tx)/this.k,y:(t-s.top-this.ty)/this.k}}focusCanvas(){this.svgEl?.focus()}rectOf(e,t){if(e==="feature"){let n=this.features.find(r=>r.id===t);return n?{x:n.x_cm,y:n.y_cm,w:n.width_cm,h:n.length_cm}:null}if(e==="zone"){let n=this.zones.find(r=>r.id===t);return n?pt(n):null}if(e==="bed"){let n=this.beds.find(r=>r.id===t);return n?ht(n):null}let s=this.plantings.find(n=>n.id===t),a=s&&this.beds.find(n=>n.id===s.bed_id);return s&&a?Ja(s,a):null}onPointerDown(e,t,s,a=!1){if(e.button!==0&&e.pointerType==="mouse")return;e.stopPropagation();let n=this.clientToCanvas(e.clientX,e.clientY);if(n){if(this.svgEl.setPointerCapture(e.pointerId),this.drawTool&&!a){let r=this.snapOn?this.snapStep:1,l=V(n.x,r),d=V(n.y,r);this.drag={mode:"draw",pointerId:e.pointerId,startX:l,startY:d,origin:{x:l,y:d,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1},this.drawRect={x:l,y:d,w:0,h:0};return}if(t&&s){let r=e.shiftKey||e.ctrlKey||e.metaKey;if(this.multi.some(c=>c.kind===t&&c.id===s)&&!r&&!a?this.pendingSelect={kind:t,id:s}:this.dispatchEvent(new CustomEvent("select",{detail:{kind:t,id:s,additive:r}})),r)return;let d=this.rectOf(t,s);if(!d||this.readonly||this.lockLayout&&t!=="planting"){this.drag={mode:"pan",pointerId:e.pointerId,startX:n.x,startY:n.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1,clicked:{kind:t,id:s}};return}this.drag={mode:a?"resize":"move",kind:t,id:s,pointerId:e.pointerId,startX:n.x,startY:n.y,origin:d,startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1,clicked:a?void 0:{kind:t,id:s}}}else this.dispatchEvent(new CustomEvent("select",{detail:null})),this.drag={mode:"pan",pointerId:e.pointerId,startX:n.x,startY:n.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1}}}onPointerMove(e){let t=this.drag;if(!t||t.pointerId!==e.pointerId)return;if(Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)>3&&(t.moved=!0),t.mode==="pan"){this.tx=t.startTx+(e.clientX-t.clientX),this.ty=t.startTy+(e.clientY-t.clientY);return}let s=this.clientToCanvas(e.clientX,e.clientY);if(t.mode==="draw"){if(!s)return;let d=this.snapOn?this.snapStep:1,c=V(s.x,d),g=V(s.y,d);this.drawRect={x:Math.min(t.startX,c),y:Math.min(t.startY,g),w:Math.abs(c-t.startX),h:Math.abs(g-t.startY)};return}if(!s||!t.kind||!t.id)return;let a=s.x-t.startX,n=s.y-t.startY,r=this.snapOn?this.snapStep:1,l;if(t.mode==="move")if(l={...t.origin,x:t.origin.x+a,y:t.origin.y+n},t.kind==="planting"){let d=this.beds.find(c=>c.id===this.plantings.find(g=>g.id===t.id)?.bed_id);d&&(l.x=d.x_cm+V(l.x-d.x_cm,r),l.y=d.y_cm+V(l.y-d.y_cm,r))}else l.x=V(l.x,r),l.y=V(l.y,r);else if(l={...t.origin,w:Math.max(r,V(t.origin.w+a,r)),h:Math.max(r,V(t.origin.h+n,r))},t.kind==="planting"){let d=this.beds.find(c=>c.id===this.plantings.find(g=>g.id===t.id)?.bed_id);d&&(l=Le(l,ht(d)))}this.preview={kind:t.kind,id:t.id,rect:l}}onPointerUp(e){let t=this.drag;if(!t||t.pointerId!==e.pointerId)return;if(this.drag=null,this.svgEl.hasPointerCapture(e.pointerId)&&this.svgEl.releasePointerCapture(e.pointerId),t.mode==="draw"){let l=this.drawRect??t.origin;this.drawRect=null;let d=t.moved&&l.w>0&&l.h>0?l:{x:t.startX,y:t.startY,w:0,h:0};this.dispatchEvent(new CustomEvent("draw-rect",{detail:d}));return}let s=this.preview;this.preview=null;let a=this.pendingSelect;if(this.pendingSelect=null,a&&!t.moved&&this.dispatchEvent(new CustomEvent("select",{detail:a})),t.clicked&&!t.moved&&!(e.shiftKey||e.ctrlKey||e.metaKey)&&this.dispatchEvent(new CustomEvent("item-click",{detail:{kind:t.clicked.kind,id:t.clicked.id}})),!s||!t.moved||t.mode==="pan")return;let n;if(s.kind==="planting"){let l=s.rect.x+s.rect.w/2,d=s.rect.y+s.rect.h/2;n=[...this.beds].reverse().find(g=>l>=g.x_cm&&l<=g.x_cm+g.width_cm&&d>=g.y_cm&&d<=g.y_cm+g.length_cm)?.id}let r=t.mode==="move"&&this.multi.length>1&&this.multi.some(l=>l.kind===s.kind&&l.id===s.id);this.dispatchEvent(new CustomEvent("item-change",{detail:{kind:s.kind,id:s.id,rect:s.rect,targetBedId:n,dx:s.rect.x-t.origin.x,dy:s.rect.y-t.origin.y,group:r}}))}onWheel(e){e.preventDefault();let t=this.getBoundingClientRect();this.zoom(e.deltaY<0?1.12:1/1.12,e.clientX-t.left,e.clientY-t.top)}effectiveRect(e,t,s){if(this.preview&&this.preview.kind===e&&this.preview.id===t)return this.preview.rect;let a=this.preview;if(a&&a.kind===e&&this.drag?.mode==="move"&&this.multi.length>1&&this.multi.some(n=>n.kind===e&&n.id===t)&&this.multi.some(n=>n.kind===a.kind&&n.id===a.id)){let n=this.drag.origin;return{...s,x:s.x+(a.rect.x-n.x),y:s.y+(a.rect.y-n.y)}}return s}renderFeature(e){let t=this.effectiveRect("feature",e.id,{x:e.x_cm,y:e.y_cm,w:e.width_cm,h:e.length_cm}),s=Qe[e.type]??Qe.other,a=11/this.k,n=t.x+t.w/2,r=t.y+t.h/2,l=e.type==="tree"||e.type==="water_butt"||e.type==="pond"||e.type==="shrub",d;if(e.type==="tree"){let g=Math.min(t.w,t.h);d=b`<ellipse cx=${n} cy=${r} rx=${t.w/2} ry=${t.h/2} fill="#2f5222" fill-opacity="0.12" stroke=${s.stroke} stroke-width="1.2"
          stroke-dasharray="4 3" vector-effect="non-scaling-stroke"></ellipse>
        ${Xt("tree",n,r,g*.95,"#4e7d3a")}`}else if(e.type==="fence"){let g=t.w>=t.h,v=g?t.w:t.h,$=Math.max(1,Math.round(v/100)),T=Array.from({length:$+1},(k,M)=>v/$*M);d=b`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} fill="transparent"></rect>
        <line x1=${g?t.x:n} y1=${g?r:t.y} x2=${g?t.x+t.w:n} y2=${g?r:t.y+t.h}
          stroke=${s.stroke} stroke-width="3" vector-effect="non-scaling-stroke" stroke-linecap="round"></line>
        ${T.map(k=>b`<rect x=${(g?t.x+k:n)-4} y=${(g?r:t.y+k)-4} width="8" height="8" fill=${s.fill} stroke=${s.stroke}
          stroke-width="1" vector-effect="non-scaling-stroke"></rect>`)}`}else l?d=b`<ellipse cx=${n} cy=${r} rx=${t.w/2} ry=${t.h/2} fill=${s.pattern?`url(#feat-${s.pattern})`:s.fill}
        fill-opacity=${s.opacity??.6} stroke=${s.stroke} stroke-width="1.5" vector-effect="non-scaling-stroke"></ellipse>`:d=b`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${e.type==="path"?2/this.k:4/this.k}
        fill=${s.pattern?`url(#feat-${s.pattern})`:s.fill} fill-opacity=${s.opacity??.6} stroke=${s.stroke} stroke-width="1.2"
        vector-effect="non-scaling-stroke" stroke-dasharray=${e.type==="trellis"?"6 3":"none"}></rect>`;let c=e.type!=="fence"&&t.w*this.k>44&&t.h*this.k>16;return b`<g role="button" aria-label=${`${e.name} (${this.t(`feature.${e.type}`)})`} @pointerdown=${g=>this.onPointerDown(g,"feature",e.id)} style="cursor:move">
      <title>${e.name} · ${this.t(`feature.${e.type}`)}</title>
      ${d}
      ${c?this.renderPill(n,e.type==="tree"?t.y+t.h-a:r,`${s.icon} ${e.name}`.trim(),a):u}
    </g>`}zoneDelta(e){if(this.preview?.kind!=="zone"||this.preview.id!==e||this.drag?.mode!=="move")return{dx:0,dy:0};let t=this.zones.find(s=>s.id===e);return t?{dx:this.preview.rect.x-t.x_cm,dy:this.preview.rect.y-t.y_cm}:{dx:0,dy:0}}bedAbs(e){let{dx:t,dy:s}=this.zoneDelta(e.zone_id),a={...ht(e),x:e.x_cm+t,y:e.y_cm+s};return this.effectiveRect("bed",e.id,a)}renderGrid(){let e=Math.max(this.snapStep,5);return b`
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
        <pattern id="soil" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="4" r="0.9" fill="rgba(255,255,255,0.12)"></circle>
          <circle cx="9" cy="9" r="0.7" fill="rgba(0,0,0,0.14)"></circle>
          <circle cx="14" cy="3" r="0.6" fill="rgba(0,0,0,0.10)"></circle>
          <circle cx="6" cy="14" r="1.1" fill="rgba(255,255,255,0.07)"></circle>
          <circle cx="15" cy="13" r="0.5" fill="rgba(255,255,255,0.14)"></circle>
          <path d="M1 10 q2 -1 4 0" stroke="rgba(0,0,0,0.10)" stroke-width="0.5" fill="none"></path>
        </pattern>
        <!-- depth: beds cast a soft shadow, the ground has a faint grain -->
        <filter id="bed-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy=${3/this.k} stdDeviation=${3/this.k} flood-color="#2e2118" flood-opacity="0.28"></feDropShadow>
        </filter>
        <filter id="ground-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"></feTurbulence>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0.06 0"></feColorMatrix>
        </filter>
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
        ${Pa()}
      </defs>
      <rect x="-5000" y="-5000" width="10000" height="10000" filter="url(#ground-grain)" pointer-events="none"></rect>
      <rect x="-5000" y="-5000" width="10000" height="10000" fill=${e*this.k>=5?"url(#major)":"url(#major-only)"}></rect>
    `}renderZone(e){let t=this.effectiveRect("zone",e.id,pt(e)),s=e.type==="greenhouse"||e.type==="cold_frame",a=he[e.type]??he.outdoor,n=12/this.k,r=this.t(`settings.zone_type.${e.type}`),l=e.name.toLowerCase()===r.toLowerCase()?`${a.icon} ${e.name}`:`${a.icon} ${e.name} \xB7 ${r}`,d=this.focusZone===e.id;return b`
      <g role="button" aria-label=${l} @pointerdown=${c=>this.onPointerDown(c,"zone",e.id)}
        @dblclick=${()=>this.dispatchEvent(new CustomEvent("zone-open",{detail:e.id}))}>
        <rect class="zone-rect" x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${8/this.k}
          fill=${a.fill} stroke=${a.stroke} stroke-dasharray=${a.dash} stroke-width=${d?2.5:1.5}></rect>
        ${s?b`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} fill="url(#glass)" pointer-events="none"></rect>`:u}
        <text class="label zone-label" x=${t.x+2/this.k} y=${t.y-n*.5} font-size=${n} font-weight="700">${l}</text>
      </g>`}renderBed(e){let t=this.bedAbs(e),s=12/this.k,a=this.analysis?.beds[e.id],n=a?.moisture_status??"unknown",r=this.showMoisture&&n!=="unknown"?tn[n]:"rgba(46,33,24,0.45)",l=this.zones.find(M=>M.id===e.zone_id)?.type??"outdoor",d=l==="orchard"||l==="fruit",c=l==="orchard"?"url(#feat-grass)":l==="fruit"?"url(#bark-mulch)":e.kind==="container"?"var(--hl-container-fill)":e.kind==="raised"?"var(--hl-bed-fill-raised)":"var(--hl-bed-fill)",g=e.kind==="container"?Math.min(t.w,t.h)/4:4/this.k,v=a?.irrigation.moisture,$=a?.sensors?.soil_temperature?.value,T=this.reports[e.id]??a?.compatibility,k=(T?.pairs.filter(M=>M.severity!=="info").length??0)+(T?.rotation?.length??0);return b`
      <g role="button" aria-label=${`${e.name}, ${this.t(`kind.${e.kind}`)}, ${Math.round(e.width_cm)} \xD7 ${Math.round(e.length_cm)} cm`}
        @pointerdown=${M=>this.onPointerDown(M,"bed",e.id)}>
        <rect class="bed-rect" x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${g} fill=${c} filter=${d?u:"url(#bed-shadow)"}
          stroke=${r} stroke-width=${this.showMoisture&&n!=="unknown"?3:1.5}></rect>
        ${d?u:b`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${g} fill="url(#soil)" pointer-events="none"></rect>`}
        ${e.kind==="raised"&&!d&&t.w*this.k>24?b`<rect x=${t.x+2.5/this.k} y=${t.y+2.5/this.k} width=${Math.max(t.w-5/this.k,0)} height=${Math.max(t.h-5/this.k,0)} rx=${g}
              fill="none" stroke="#a0754e" stroke-width=${3.5/this.k} opacity="0.85" pointer-events="none"></rect>
            <rect x=${t.x+4.5/this.k} y=${t.y+4.5/this.k} width=${Math.max(t.w-9/this.k,0)} height=${Math.max(t.h-9/this.k,0)} rx=${g}
              fill="none" stroke="rgba(255,255,255,0.16)" stroke-width=${1/this.k} pointer-events="none"></rect>`:u}
        ${this.showMoisture&&n!=="unknown"?b`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${g} fill=${tn[n]} opacity="0.12" pointer-events="none"></rect>`:u}
        ${d||t.w*this.k<50?u:b`<text class="label on-soil" x=${t.x+6/this.k} y=${t.y+t.h-6/this.k} font-size=${s} font-weight="600">${e.name}</text>`}
        ${this.showMoisture&&v!=null?b`<text class="label on-soil" x=${t.x+t.w-6/this.k} y=${t.y+t.h-6/this.k} font-size=${s*.95} text-anchor="end">💧 ${Math.round(v)}%</text>`:u}
        ${this.showTemperature&&$!=null?b`<text class="label on-soil" x=${t.x+t.w-6/this.k} y=${t.y+s*1.3} font-size=${s*.95} text-anchor="end">🌡 ${$.toFixed(1)} °C</text>`:u}
        ${k?this.renderBadge(t.x+t.w,t.y,String(k),"var(--hl-tomato-500)"):u}
      </g>`}renderBadge(e,t,s,a,n=9){let r=n/this.k;return b`<g pointer-events="none"><circle cx=${e} cy=${t} r=${r} fill=${a} stroke="#fff" stroke-width=${1.5/this.k}></circle>
      <text class="badge-text" x=${e} y=${t+r*.38} font-size=${r*1.1} text-anchor="middle">${s}</text></g>`}renderPill(e,t,s,a){let n=s.length*a*.56+a*1.1,r=a*1.55;return b`<g pointer-events="none">
      <rect x=${e-n/2} y=${t-r/2} width=${n} height=${r} rx=${r/2} fill="var(--hl-pill-bg, rgba(255,255,255,0.9))"
        stroke="rgba(0,0,0,0.12)" stroke-width="1" vector-effect="non-scaling-stroke"></rect>
      <text class="pill-text" x=${e} y=${t+a*.36} font-size=${a} text-anchor="middle">${s}</text></g>`}growth(e,t){let s=this.timelines[e.id],a=this.viewDate||this.analysis?.today;if(!s||!a||t.perennial)return 1;let n=Date.parse(a),r=Date.parse(s.in_ground),l=Date.parse(s.harvest_start),d=Date.parse(s.harvest_end);return n<r?.4:n>=d?.85:n>=l||l<=r?1:.45+.55*(n-r)/(l-r)}renderPlanting(e){let t=this.beds.find(Q=>Q.id===e.bed_id),s=this.plants.get(e.plant_id);if(!t||!s)return u;let a=this.bedAbs(t),n={x:a.x+e.x_cm,y:a.y+e.y_cm,w:e.width_cm,h:e.length_cm},r=this.effectiveRect("planting",e.id,n),l=j(this.families,s.family),d=s.color||l,c=I(s),g=w(s,this.lang),v=!this.viewDate||La(e,this.timelines[e.id],this.viewDate),$={...e,x_cm:r.x-a.x,y_cm:r.y-a.y,width_cm:r.w,length_cm:r.h},T=As($,s),k=this.reports[t.id]??this.analysis?.beds[t.id]?.compatibility,M=k?.pairs.filter(Q=>(Q.a===e.id||Q.b===e.id)&&Q.severity!=="info")??[],R=k?.out_of_bounds?.includes(e.id),_=this.k,A=Math.min(s.spacing_cm,r.w,r.h)*_,Y=A<18||T.length>90,B=`${g} \u2013 ${this.t(`planner.layout.${e.layout}`)}, ${this.t("planner.count",{n:T.length})}`+(M.length?` \u2013 ${M.length} \u26A0`:"")+(s.perennial?` \u2013 ${this.t("planner.perennial")}`:""),oe=11/_,et;if(Y){let Q=r.w>=r.h,tt=Q?r.h:r.w,ct=Q?r.w:r.h,Xs=Math.max(e.layout==="row"?s.row_spacing_cm:Math.max(s.row_spacing_cm/2,s.spacing_cm),4),Js=Math.max(1,Math.floor(tt/Xs)),Ct=Math.min(s.spacing_cm/2,ct/4),Qs=Math.max(Math.min(s.spacing_cm*.9,Xs*.45)*this.growth(e,s),1.5),Vs=s.category==="flower"?d:"#5f9a3a",xn=Array.from({length:Js},(ut,Mn)=>tt/Js*(Mn+.5)),ea=`${Math.max(s.spacing_cm*.6,1.5)} ${Math.max(s.spacing_cm*.4,1)}`,ta=Math.max(Math.min(Math.min(r.w,r.h)*.72,46/_),16/_),sa=r.x+r.w/2,aa=r.y+r.h/2;et=b`
        ${xn.map(ut=>Q?b`<line x1=${r.x+Ct} y1=${r.y+ut} x2=${r.x+r.w-Ct} y2=${r.y+ut} stroke=${Vs} stroke-width=${Qs}
              stroke-linecap="round" stroke-dasharray=${ea} opacity="0.75"></line>`:b`<line x1=${r.x+ut} y1=${r.y+Ct} x2=${r.x+ut} y2=${r.y+r.h-Ct} stroke=${Vs} stroke-width=${Qs}
              stroke-linecap="round" stroke-dasharray=${ea} opacity="0.75"></line>`)}
        <circle cx=${sa} cy=${aa} r=${ta*.62} fill="var(--hl-pill-bg, rgba(255,255,255,0.92))" stroke=${l} stroke-width="2"
          vector-effect="non-scaling-stroke"></circle>
        ${Xt(c,sa,aa,ta*.92,d)}`}else{let Q=Math.max(Math.min(s.spacing_cm*.92,Math.min(r.w,r.h)*1.05)*this.growth(e,s),6/_);et=b`
        ${T.slice(0,300).map(([tt,ct])=>b`<ellipse cx=${a.x+tt} cy=${a.y+ct+Q*.42} rx=${Q*.36} ry=${Q*.09}
          fill="rgba(0,0,0,0.18)"></ellipse>`)}
        ${T.slice(0,300).map(([tt,ct])=>Xt(c,a.x+tt,a.y+ct,Q,d))}`}let Ks=(g.length*.56+1.1)*oe,Ys=r.w*_>=Math.min(g.length*7+16,140)&&r.h*_>=(Y?64:34),wn=Y&&!Ys&&r.w>=r.h&&r.w*_>=Ks*_+70&&r.h*_>=16,_n=Y?r.y+r.h-Math.max(oe*1.1,Math.min(r.h*.12,14/_)):r.y+r.h-oe*.95,kn=Math.max(Math.min(Math.min(r.w,r.h)*.72,46/_),16/_)*.62;return b`
      <g class="planting ${v?"":"faded"}" role="button" aria-label=${B}
        @pointerdown=${Q=>this.onPointerDown(Q,"planting",e.id)}>
        <title>${B}</title>
        <rect class="planting-rect" x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${4/_}
          fill=${d} fill-opacity="0.13" stroke=${l} stroke-width="1.6" stroke-dasharray=${v?"none":"4 3"}></rect>
        ${et}
        ${wn?this.renderPill(r.x+r.w/2+kn+6/_+Ks/2,r.y+r.h/2,g,oe):Ys?this.renderPill(r.x+r.w/2,_n,g,oe):!Y&&A<10&&r.w*_>22&&r.h*_>22?b`<text class="mono" x=${r.x+r.w/2} y=${r.y+r.h/2+oe*.35} font-size=${oe} text-anchor="middle">${Ra(g)}</text>`:u}
        ${s.perennial&&r.w*_>=36&&r.h*_>=36?this.renderBadge(r.x+r.w-9/_,r.y+r.h-9/_,"\u221E","var(--hl-leaf-700)",7):u}
        ${e.succession_group?this.renderBadge(r.x,r.y,String(e.succession_index+1),"var(--hl-soil-700)"):u}
        ${M.length||R?this.renderBadge(r.x+r.w,r.y,"!",M.some(Q=>Q.severity==="error")?"var(--hl-tomato-500)":"var(--hl-sun-500)"):u}
      </g>`}renderLinks(){if(!this.showCompanions)return[];let e=[],t=a=>{let n=this.plantings.find(c=>c.id===a),r=n&&this.beds.find(c=>c.id===n.bed_id);if(!n||!r)return null;let l=this.bedAbs(r),d=this.effectiveRect("planting",n.id,{x:l.x+n.x_cm,y:l.y+n.y_cm,w:n.width_cm,h:n.length_cm});return[d.x+d.w/2,d.y+d.h/2]},s=new Set(this.plantings.map(a=>a.id));for(let a of this.beds){let n=this.reports[a.id]??this.analysis?.beds[a.id]?.compatibility;for(let r of n?.pairs??[]){if(r.kind==="same_family"||!s.has(r.a)||!s.has(r.b))continue;let l=t(r.a),d=t(r.b);if(!l||!d)continue;let c=en[r.kind]??en.overlap;e.push(b`<line class="link" x1=${l[0]} y1=${l[1]} x2=${d[0]} y2=${d[1]} stroke=${c.color}
          stroke-width=${c.width} stroke-dasharray=${c.dash} stroke-linecap="round" opacity="0.9"><title>${this.t(r.key,r.params)}</title></line>`)}}return e}selectionRect(e){if(e.kind==="feature"){let n=this.features.find(r=>r.id===e.id);return n?this.effectiveRect("feature",n.id,{x:n.x_cm,y:n.y_cm,w:n.width_cm,h:n.length_cm}):null}if(e.kind==="bed"){let n=this.beds.find(r=>r.id===e.id);return n?this.bedAbs(n):null}if(e.kind==="zone"){let n=this.zones.find(r=>r.id===e.id);return n?this.effectiveRect("zone",n.id,pt(n)):null}let t=this.plantings.find(n=>n.id===e.id),s=t&&this.beds.find(n=>n.id===t.bed_id);if(!t||!s)return null;let a=this.bedAbs(s);return this.effectiveRect("planting",t.id,{x:a.x+t.x_cm,y:a.y+t.y_cm,w:t.width_cm,h:t.length_cm})}renderMulti(){if(this.multi.length<2)return[];let e=3/this.k;return this.multi.filter(t=>!(this.selection&&t.kind===this.selection.kind&&t.id===this.selection.id)).map(t=>this.selectionRect(t)).filter(t=>!!t).map(t=>b`<rect class="selected-outline" x=${t.x-e} y=${t.y-e} width=${t.w+e*2} height=${t.h+e*2} opacity="0.7"></rect>`)}renderSelection(){let e=this.selection;if(!e)return u;let t=null;if(e.kind==="feature")t=this.selectionRect(e);else if(e.kind==="bed"){let n=this.beds.find(r=>r.id===e.id);t=n?this.bedAbs(n):null}else if(e.kind==="zone"){let n=this.zones.find(r=>r.id===e.id);t=n?this.effectiveRect("zone",n.id,pt(n)):null}else{let n=this.plantings.find(l=>l.id===e.id),r=n&&this.beds.find(l=>l.id===n.bed_id);if(n&&r){let l=this.bedAbs(r);t=this.effectiveRect("planting",n.id,{x:l.x+n.x_cm,y:l.y+n.y_cm,w:n.width_cm,h:n.length_cm})}}if(!t)return u;let s=10/this.k,a=3/this.k;return b`
      <rect class="selected-outline" x=${t.x-a} y=${t.y-a} width=${t.w+a*2} height=${t.h+a*2}></rect>
      ${this.readonly||this.lockLayout&&e.kind!=="planting"?u:b`<rect class="handle" x=${t.x+t.w-s/2} y=${t.y+t.h-s/2} width=${s} height=${s} rx=${2/this.k}
        @pointerdown=${n=>this.onPointerDown(n,e.kind,e.id,!0)}></rect>`}`}renderGhost(){let e=this.ghost;if(!e)return u;let t=12/this.k;return b`<g pointer-events="none">
      <rect x=${e.rect.x} y=${e.rect.y} width=${e.rect.w} height=${e.rect.h} rx=${3/this.k}
        fill=${e.color} fill-opacity=${e.valid?.35:.12} stroke=${e.valid?e.color:"var(--hl-tomato-500)"}
        stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      <text class="label" x=${e.rect.x} y=${e.rect.y-t*.5} font-size=${t} font-weight="600">${e.label}</text></g>`}renderDrawRect(){let e=this.drawRect,t=this.drawTool;if(!e||!t||!e.w&&!e.h)return u;let s=12/this.k,a=n=>(n/100).toLocaleString(this.lang==="nl"?"nl-BE":"en-GB",{maximumFractionDigits:1});return b`<g pointer-events="none">
      <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${4/this.k} fill=${t.color} fill-opacity="0.22"
        stroke=${t.color} stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      ${this.renderPill(e.x+e.w/2,e.y+e.h/2,`${t.label} \xB7 ${a(e.w)} \xD7 ${a(e.h)} m`,s)}
    </g>`}outside(e){if(!this.focusZone)return!1;let t=this.zones.find(n=>n.id===this.focusZone);if(!t)return!1;let s=e.x+e.w/2,a=e.y+e.h/2;return!(s>=t.x_cm&&s<=t.x_cm+t.width_cm&&a>=t.y_cm&&a<=t.y_cm+t.length_cm)}render(){let e=this.focusZone,t=(s,a)=>s?b`<g class="dimmed">${a}</g>`:a;return i`
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
          ${this.showPlantings?this.plantings.map(s=>{let a=this.beds.find(n=>n.id===s.bed_id);return t(!!e&&a?.zone_id!==e,this.renderPlanting(s))}):u} ${this.showPlantings?this.renderLinks():u}
          ${this.renderMulti()} ${this.renderSelection()} ${this.renderGhost()} ${this.renderDrawRect()}
        </g>
      </svg>
      <div class="zoom-indicator" aria-hidden="true">${Math.round(this.k*100)} px/m</div>
    `}};C.styles=[S`
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
    `],p([m({attribute:!1})],C.prototype,"zones",2),p([m({attribute:!1})],C.prototype,"beds",2),p([m({attribute:!1})],C.prototype,"plantings",2),p([m({attribute:!1})],C.prototype,"features",2),p([m({attribute:!1})],C.prototype,"multi",2),p([m({type:Boolean})],C.prototype,"showFeatures",2),p([m({type:Boolean})],C.prototype,"showPlantings",2),p([m({type:Boolean})],C.prototype,"showZones",2),p([m({attribute:!1})],C.prototype,"plants",2),p([m({attribute:!1})],C.prototype,"families",2),p([m({attribute:!1})],C.prototype,"selection",2),p([m({attribute:!1})],C.prototype,"ghost",2),p([m({attribute:!1})],C.prototype,"reports",2),p([m({attribute:!1})],C.prototype,"timelines",2),p([m({attribute:!1})],C.prototype,"analysis",2),p([m({attribute:!1})],C.prototype,"t",2),p([m()],C.prototype,"lang",2),p([m({type:Number})],C.prototype,"snapStep",2),p([m({type:Boolean})],C.prototype,"snapOn",2),p([m({type:Boolean})],C.prototype,"showCompanions",2),p([m({type:Boolean})],C.prototype,"showMoisture",2),p([m({type:Boolean})],C.prototype,"showTemperature",2),p([m()],C.prototype,"viewDate",2),p([m({type:Boolean})],C.prototype,"readonly",2),p([m({type:Boolean})],C.prototype,"lockLayout",2),p([m()],C.prototype,"focusZone",2),p([m({attribute:!1})],C.prototype,"drawTool",2),p([f()],C.prototype,"drawRect",2),p([f()],C.prototype,"k",2),p([f()],C.prototype,"tx",2),p([f()],C.prototype,"ty",2),p([f()],C.prototype,"preview",2),p([Pe("svg")],C.prototype,"svgEl",2),C=p([z("hl-garden-canvas")],C);var ae=class extends E{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en";this.season=0;this.pick=!0;this.report=null;this.error="";this.bookBusy=!1;this.loadedFor=0}willUpdate(){!this.season&&this.snapshot&&(this.season=this.snapshot.analysis?.season??new Date().getFullYear()),this.season&&this.api&&this.season!==this.loadedFor&&(this.loadedFor=this.season,this.report=null,this.error="",this.api.seasonReport(this.season).then(e=>this.report=e).catch(e=>this.error=e.message))}async book(){this.bookBusy=!0;try{let{blob:e,filename:t}=await this.api.printPdf({document:"book",page:"a5",season:this.season}),s=URL.createObjectURL(e),a=document.createElement("a");a.href=s,a.download=t,a.click(),setTimeout(()=>URL.revokeObjectURL(s),2e3)}catch(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("common.error",{message:e.message})},bubbles:!0,composed:!0}))}finally{this.bookBusy=!1}}name(e){return w(this.plants.get(e),this.lang)||e}bed(e){for(let t of[{beds:this.snapshot.beds},...Object.values(this.snapshot.layouts??{})]){let s=t.beds.find(a=>a.id===e);if(s)return s.name}return e}markdown(e){let t=this.t,s=[`# ${t("report.title",{season:e.season})}`,"",`- ${t("report.crops")}: ${e.totals.crops} (${e.totals.plantings} ${t("report.plantings")})`,`- ${t("report.harvest")}: ${e.totals.kg} kg (${t("report.expected")} ${e.totals.expected_kg} kg)`,`- ${t("report.failed")}: ${e.totals.failed}`,`- ${t("report.water")}: ${e.totals.water_l} L (${e.totals.water_runs} ${t("report.runs")})`,"",`## ${t("report.per_crop")}`,"",`| ${t("lib.plant")} | m\xB2 | kg | ${t("report.expected")} | |`,"|---|---|---|---|---|",...e.crops.map(a=>`| ${this.name(a.plant_id)} | ${a.area_m2} | ${a.kg??"\u2013"} | ${a.expected_kg||"\u2013"} | ${t(`report.verdict.${a.verdict}`)} |`)];return e.failed.length&&s.push("",`## ${t("report.failed")}`,"",...e.failed.map(a=>`- ${this.name(a.plant_id)} (${this.bed(a.bed_id)})${a.notes?`: ${a.notes}`:""}`)),e.problems.length&&s.push("",`## ${t("report.problems")}`,"",...e.problems.map(a=>`- ${a.at.slice(0,10)}: ${a.text}`)),e.milestones.length&&s.push("",`## ${t("report.milestones")}`,"",...e.milestones.map(a=>`- ${a.at.slice(0,10)}: ${a.text}`)),s.join(`
`)+`
`}render(){let e=this.report,t=Array.from({length:4},(s,a)=>(this.snapshot.analysis?.season??new Date().getFullYear())-a);return i`<div class="stack">
      <div class="row wrap">
        ${this.pick?i`<select style="width:auto" aria-label=${this.t("planner.season")} @change=${s=>this.season=Number(s.target.value)}>
          ${t.map(s=>i`<option value=${s} ?selected=${s===this.season}>${this.t("common.season",{year:s})}</option>`)}</select>`:u}
        <span class="spacer"></span>
        <button class="btn small ghost" ?disabled=${this.bookBusy} @click=${()=>this.book()} title=${this.t("report.book_hint")}>
          <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.bookBusy?this.t("common.loading"):this.t("report.book")}</button>
        ${e?i`<button class="btn small ghost" @click=${()=>Ae(`hortulus-${e.season}.md`,this.markdown(e),"text/markdown")}>
          <ha-icon icon="mdi:download"></ha-icon>${this.t("report.download")}</button>`:u}
      </div>
      ${this.error?i`<p class="small">${this.error}</p>`:e?i`
        ${e.running?i`<p class="small muted">${this.t("report.running")}</p>`:u}
        <div class="tiles">
          <div class="tile">${this.t("report.crops")}<b>${e.totals.crops}</b></div>
          <div class="tile">${this.t("report.harvest")}<b>${e.totals.kg} kg</b><span class="xs muted">${this.t("report.expected")} ${e.totals.expected_kg} kg</span></div>
          <div class="tile">${this.t("report.failed")}<b>${e.totals.failed}</b></div>
          <div class="tile">${this.t("report.water")}<b>${e.totals.water_l} L</b><span class="xs muted">${e.totals.water_runs} ${this.t("report.runs")}</span></div>
          <div class="tile">${this.t("report.notes")}<b>${e.totals.journal}</b></div>
        </div>
        ${e.crops.length?i`<h3>${this.t("report.per_crop")}</h3><table>
          <thead><tr><th>${this.t("lib.plant")}</th><th>m²</th><th>kg</th><th>${this.t("report.expected")}</th><th></th></tr></thead>
          <tbody>${e.crops.map(s=>{let a=this.plants.get(s.plant_id);return i`<tr><td><span class="plant">${a?H(I(a),a.color||j(this.families,a.family),18):u}${this.name(s.plant_id)}</span></td>
              <td>${s.area_m2}</td><td>${s.kg??"\u2013"}</td><td>${s.expected_kg||"\u2013"}</td>
              <td><span class="chip ${s.verdict==="above"?"ok":s.verdict==="failed"||s.verdict==="below"?"bad":""}">${this.t(`report.verdict.${s.verdict}`)}</span></td></tr>`})}</tbody></table>`:i`<p class="muted">${this.t("report.empty")}</p>`}
        ${e.failed.length?i`<h3>${this.t("report.failed")}</h3><ul>${e.failed.map(s=>i`<li>${this.name(s.plant_id)} (${this.bed(s.bed_id)})${s.notes?` \u2013 ${s.notes}`:""}</li>`)}</ul>`:u}
        ${e.problems.length?i`<h3>${this.t("report.problems")}</h3><ul>${e.problems.map(s=>i`<li>${x(s.at.slice(0,10),this.lang)}: ${s.text}</li>`)}</ul>`:u}
        ${e.milestones.length?i`<h3>${this.t("report.milestones")}</h3><ul>${e.milestones.map(s=>i`<li>${x(s.at.slice(0,10),this.lang)}: ${s.text}</li>`)}</ul>`:u}
        <p class="xs muted">${this.t("report.hint")}</p>`:i`<p class="muted">${this.t("common.loading")}</p>`}
    </div>`}};ae.styles=[L,S`
      :host { display: block; }
      .tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: var(--hl-s2); }
      .tile { padding: 10px; border-radius: var(--hl-r-md); background: var(--hl-surface-2); font-size: var(--hl-fs-sm); }
      .tile b { display: block; font-size: var(--hl-fs-xl); }
      table { width: 100%; border-collapse: collapse; font-size: var(--hl-fs-sm); }
      th, td { text-align: left; padding: 5px 6px; border-bottom: 1px solid var(--hl-border); }
      .plant { display: inline-flex; gap: 6px; align-items: center; }
      ul { margin: 4px 0 0; padding-left: 1.2em; font-size: var(--hl-fs-sm); }
    `],p([m({attribute:!1})],ae.prototype,"snapshot",2),p([m({attribute:!1})],ae.prototype,"api",2),p([m({attribute:!1})],ae.prototype,"t",2),p([m({attribute:!1})],ae.prototype,"plants",2),p([m({attribute:!1})],ae.prototype,"families",2),p([m()],ae.prototype,"lang",2),p([m({type:Number})],ae.prototype,"season",2),p([m({type:Boolean})],ae.prototype,"pick",2),p([f()],ae.prototype,"report",2),p([f()],ae.prototype,"error",2),p([f()],ae.prototype,"bookBusy",2),ae=p([z("hl-season-report")],ae);var W=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.fromSeason=null;this.preview=null;this.layout="copy";this.zones=new Set;this.features=new Set;this.carry=new Set;this.activate=!0;this.busy=!1;this.error=""}willUpdate(e){(e.has("api")||e.has("fromSeason"))&&this.api&&this.load()}async load(){this.error="";try{let e=await this.api.yearPreview(this.fromSeason??void 0);this.preview=e,this.layout=e.target_exists?"keep":"copy",this.zones=new Set(e.zones.map(t=>t.id)),this.features=new Set(e.features.map(t=>t.id)),this.carry=new Set(e.candidates.filter(t=>t.selected).map(t=>t.planting_id)),this.activate=e.is_live}catch(e){this.error=e.message??String(e)}}toggle(e,t,s){let a=new Set(e);return s?a.add(t):a.delete(t),a}targetBeds(){let e=this.preview;return this.layout==="keep"?new Set((this.snapshot.layouts?.[String(e.to_season)]?.beds??[]).map(t=>t.id)):new Set(e.beds.filter(t=>this.zones.has(t.zone_id)).map(t=>t.id))}async apply(){let e=this.preview;this.busy=!0;try{let t=await this.api.yearApply({from_season:e.from_season,layout:this.layout,zone_ids:this.layout==="copy"?[...this.zones]:null,feature_ids:this.layout==="copy"?[...this.features]:null,planting_ids:[...this.carry],activate:this.activate});this.dispatchEvent(new CustomEvent("transition-done",{detail:t,bubbles:!0,composed:!0}))}catch(t){this.error=t.message??String(t)}finally{this.busy=!1}}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){let e=this.preview;if(!e)return i`<div class="stack"><h2>${this.t("year.title_short")}</h2>
        ${this.error?i`<p class="warn">${this.error}</p>`:i`<p class="muted">${this.t("common.loading")}</p>`}
        <div class="row end"><button class="btn" @click=${this.close}>${this.t("common.close")}</button></div></div>`;let{from_season:t,to_season:s}=e,a=this.targetBeds(),n=c=>e.beds.find(g=>g.id===c)?.name??this.snapshot.layouts?.[String(s)]?.beds.find(g=>g.id===c)?.name??c,r=e.candidates.filter(c=>c.reason==="perennial"),l=e.candidates.filter(c=>c.reason==="overwinter"),d=c=>{let g=this.plants.find($=>$.id===c.plant_id),v=!a.has(c.bed_id);return i`<label class="item ${this.carry.has(c.planting_id)?"":"off"}">
        <input type="checkbox" .checked=${this.carry.has(c.planting_id)} ?disabled=${v}
          @change=${$=>this.carry=this.toggle(this.carry,c.planting_id,$.target.checked)} />
        ${g?i`<hl-plant-image .plant=${g} color=${j(this.families,g.family)} lang=${this.lang} size="thumb"></hl-plant-image>`:u}
        <span>${w(g,this.lang)||c.plant_id}<small>${n(c.bed_id)}${v?i` · <span class="warn">${this.t("year.bed_gone")}</span>`:u}</small></span>
      </label>`};return i`<div class="stack">
      <h2>${this.t("year.title",{from:t,to:s})}</h2>
      <p class="small">${this.t("year.intro",{from:t,to:s})}</p>
      <details class="report"><summary><ha-icon icon="mdi:file-chart-outline"></ha-icon> ${this.t("report.title",{season:t})}</summary>
        <hl-season-report .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} season=${t} .pick=${!1}
          .plants=${new Map(this.plants.map(c=>[c.id,c]))} .families=${this.families}></hl-season-report></details>

      <section>
        <h3><ha-icon icon="mdi:floor-plan"></ha-icon>${this.t("year.plan")}</h3>
        ${e.target_exists?i`<div class="choice">
          <label class="row"><input type="radio" name="layout" .checked=${this.layout==="keep"} @change=${()=>this.layout="keep"} />${this.t("year.keep",{to:s})}</label>
          <label class="row"><input type="radio" name="layout" .checked=${this.layout==="copy"} @change=${()=>this.layout="copy"} />${this.t("year.copy",{from:t})}</label>
        </div>`:i`<p class="small muted">${this.t("year.copy_hint",{from:t,to:s})}</p>`}
        ${this.layout==="copy"?i`
          <h4>${this.t("planner.zones")}</h4>
          <div class="list">${e.zones.map(c=>i`<label class="item ${this.zones.has(c.id)?"":"off"}">
            <input type="checkbox" .checked=${this.zones.has(c.id)} @change=${g=>this.zones=this.toggle(this.zones,c.id,g.target.checked)} />
            <span>${he[c.type]?.icon??""} ${c.name}<small>${this.t(`settings.zone_type.${c.type}`)} · ${this.t("planner.n_beds",{n:e.beds.filter(g=>g.zone_id===c.id).length})}</small></span>
          </label>`)}</div>
          ${e.features.length?i`<h4>${this.t("year.elements")}</h4>
            <div class="list">${e.features.map(c=>i`<label class="item ${this.features.has(c.id)?"":"off"}">
              <input type="checkbox" .checked=${this.features.has(c.id)} @change=${g=>this.features=this.toggle(this.features,c.id,g.target.checked)} />
              <span>${Qe[c.type]?.icon??""} ${c.name}<small>${this.t(`feature.${c.type}`)}</small></span>
            </label>`)}</div>`:u}`:u}
      </section>

      <section>
        <h3><ha-icon icon="mdi:tree-outline"></ha-icon>${this.t("year.perennials")}</h3>
        ${r.length?i`<div class="list">${r.map(d)}</div>`:i`<p class="small muted">${this.t("year.none")}</p>`}
        <h3 style="margin-top:var(--hl-s3)"><ha-icon icon="mdi:snowflake"></ha-icon>${this.t("year.overwinter")}</h3>
        ${l.length?i`<div class="list">${l.map(d)}</div>`:i`<p class="small muted">${this.t("year.none")}</p>`}
        <p class="xs muted">${this.t("year.not_chosen",{to:s})}</p>
      </section>

      <section>
        <label class="row"><input type="checkbox" .checked=${this.activate} ?disabled=${!e.is_live}
          @change=${c=>this.activate=c.target.checked} />${this.t("year.activate",{to:s})}</label>
        <p class="xs muted">${this.t(this.activate?"year.activate_hint":"year.prepare_hint",{from:t,to:s})}</p>
      </section>

      ${this.error?i`<p class="warn">${this.error}</p>`:u}
      <div class="row end">
        <button class="btn ghost" @click=${this.close}>${this.t("common.cancel")}</button>
        <button class="btn primary" ?disabled=${this.busy||!this.admin} @click=${()=>this.apply()}>
          <ha-icon icon="mdi:calendar-arrow-right"></ha-icon>${this.t("year.apply",{to:s})}</button>
      </div>
    </div>`}};W.styles=[L,S`
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
    `],p([m({attribute:!1})],W.prototype,"api",2),p([m({attribute:!1})],W.prototype,"t",2),p([m({attribute:!1})],W.prototype,"snapshot",2),p([m({attribute:!1})],W.prototype,"plants",2),p([m({attribute:!1})],W.prototype,"families",2),p([m()],W.prototype,"lang",2),p([m({type:Boolean})],W.prototype,"admin",2),p([m({type:Number})],W.prototype,"fromSeason",2),p([f()],W.prototype,"preview",2),p([f()],W.prototype,"layout",2),p([f()],W.prototype,"zones",2),p([f()],W.prototype,"features",2),p([f()],W.prototype,"carry",2),p([f()],W.prototype,"activate",2),p([f()],W.prototype,"busy",2),p([f()],W.prototype,"error",2),W=p([z("hl-year-transition")],W);function Ve(h,o,e,t){let s={...h.params};for(let a of["until","harvest","frost"])typeof s[a]=="string"&&(s[a]=x(s[a],e,{day:"numeric",month:"long"}));return typeof s.plant_id=="string"&&(s.plant=w(t.get(s.plant_id),e)||s.plant_id),typeof s.category=="string"&&(s.category=o(`category.${s.category}`)),Array.isArray(s.allowed)&&(s.allowed=s.allowed.map(a=>o(`category.${a}`)).join(", ")),typeof s.zone_type=="string"&&(s.zone_type=o(`settings.zone_type.${s.zone_type}`)),s.until==null&&h.code==="too_late"?o("reason.too_late_nodate",s):o(`reason.${h.code}`,s)}function sn(h,o,e,t){let s=new Map;for(let a of Object.values(h??{}))for(let n of new Set(a.map(r=>Ve(r,o,e,t))))s.set(n,(s.get(n)??0)+1);return[...s.entries()].sort((a,n)=>n[1]-a[1]).map(([a])=>a)}var ee=class extends E{constructor(){super(...arguments);this.heading="";this.subheading="";this.accent="";this.closeLabel="Close";this.prevLabel="Previous";this.nextLabel="Next";this.nav=!1;this.hasPrev=!1;this.hasNext=!1;this.size="normal"}firstUpdated(){this.dialog.open||this.dialog.showModal()}toTop(){this.content&&(this.content.scrollTop=0)}close(){this.dialog.close()}onKey(e){if(!this.nav)return;let t=e.composedPath()[0];t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||(e.key==="ArrowLeft"&&this.hasPrev&&(e.preventDefault(),this.step("prev")),e.key==="ArrowRight"&&this.hasNext&&(e.preventDefault(),this.step("next")))}step(e){this.dispatchEvent(new CustomEvent(e)),this.toTop()}onFooterSlot(e){let t=e.target;t.parentElement?.classList.toggle("has",t.assignedNodes({flatten:!0}).some(s=>s.nodeType===1))}render(){return i`<dialog aria-label=${this.heading} @keydown=${this.onKey}
      @close=${()=>this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}
      @click=${e=>{e.target===this.dialog&&this.close()}}>
      <header style=${this.accent?`border-top: 6px solid ${this.accent}`:""}>
        <slot name="media"></slot>
        <div class="titles"><h2>${this.heading}</h2>${this.subheading?i`<span class="small muted">${this.subheading}</span>`:u}
          <slot name="subheading"></slot></div>
        ${this.nav?i`
          <button class="icon-btn" aria-label=${this.prevLabel} title=${this.prevLabel} ?disabled=${!this.hasPrev} @click=${()=>this.step("prev")}><span class="x">‹</span></button>
          <button class="icon-btn" aria-label=${this.nextLabel} title=${this.nextLabel} ?disabled=${!this.hasNext} @click=${()=>this.step("next")}><span class="x">›</span></button>`:u}
        <button class="icon-btn" aria-label=${this.closeLabel} title=${this.closeLabel} @click=${()=>this.close()}><span class="x">×</span></button>
      </header>
      <div class="content"><slot></slot></div>
      <footer><slot name="actions" @slotchange=${this.onFooterSlot}></slot></footer>
    </dialog>`}};ee.styles=[L,S`
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
    `],p([m()],ee.prototype,"heading",2),p([m()],ee.prototype,"subheading",2),p([m()],ee.prototype,"accent",2),p([m()],ee.prototype,"closeLabel",2),p([m()],ee.prototype,"prevLabel",2),p([m()],ee.prototype,"nextLabel",2),p([m({type:Boolean})],ee.prototype,"nav",2),p([m({type:Boolean,attribute:"has-prev"})],ee.prototype,"hasPrev",2),p([m({type:Boolean,attribute:"has-next"})],ee.prototype,"hasNext",2),p([m({reflect:!0})],ee.prototype,"size",2),p([Pe("dialog")],ee.prototype,"dialog",2),p([Pe(".content")],ee.prototype,"content",2),ee=p([z("hl-modal")],ee);function an(h){return h.startsWith("p:")?{plan_id:h.slice(2)}:{season:Number(h.slice(2))}}var pe=class extends E{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en";this.left="";this.right="";this.result=null;this.error=""}options(){let e=new Set(Object.keys(this.snapshot.layouts??{}).map(Number));this.snapshot.layout_season!=null&&e.add(this.snapshot.layout_season);let t=[...e].sort().map(s=>[`s:${s}`,this.t("compare.season_plan",{season:s})]);for(let s of this.snapshot.archived_plans??[])t.push([`p:${s.id}`,this.t("compare.inactive_plan",{name:s.name,season:s.season})]);return t}willUpdate(){let e=this.options();!this.left&&e.length&&(this.left=e.find(([t])=>t.startsWith("p:"))?.[0]??e[0][0]),!this.right&&e.length&&(this.right=`s:${this.snapshot.layout_season??""}`)}updated(e){(e.has("left")||e.has("right"))&&this.run()}async run(){if(!this.left||!this.right)return;let e=this.left,t=this.right;this.error="";try{let s=await this.api.comparePlans(an(e),an(t));e===this.left&&t===this.right&&(this.result=s)}catch(s){if(e!==this.left||t!==this.right)return;this.result=null,this.error=s.message??String(s)}}what(e){return e.map(t=>this.t(`compare.what.${t}`)).join(", ")}renderPart(e,t){return!t.added.length&&!t.removed.length&&!t.changed.length?u:i`<div class="part"><h4>${e}</h4><ul>
      ${t.added.map(s=>i`<li class="add"><span class="sign">+</span>${s.name}</li>`)}
      ${t.removed.map(s=>i`<li class="del"><span class="sign">−</span>${s.name}</li>`)}
      ${t.changed.map(s=>i`<li class="chg"><span class="sign">~</span>${s.was&&s.was!==s.name?`${s.was} \u2192 ${s.name}`:s.name}
        <span class="xs muted">(${this.what(s.what)})</span></li>`)}
    </ul></div>`}crop(e,t,s,a=""){let n=this.plants.get(e.plant_id);return i`<li class=${s}><span class="sign">${t}</span>
      ${n?H(I(n),n.color||j(this.families,n.family),16):u}${e.name}
      <span class="xs muted">${e.bed}</span>${a}</li>`}render(){let e=this.options(),t=this.result,s=(a,n,r)=>i`<label class="field">${r}
      <select @change=${l=>n(l.target.value)}>
        ${e.map(([l,d])=>i`<option value=${l} ?selected=${l===a}>${d}</option>`)}</select></label>`;return i`
      <div class="pick">
        ${s(this.left,a=>this.left=a,this.t("compare.from"))}
        <span>→</span>
        ${s(this.right,a=>this.right=a,this.t("compare.to"))}
      </div>
      ${this.error?i`<p class="small">${this.error}</p>`:u}
      ${t?t.identical?i`<div class="finding info"><span>${this.t("compare.identical")}</span></div>`:i`<div class="parts">
        ${this.renderPart(this.t("compare.zones"),t.zones)}
        ${this.renderPart(this.t("compare.beds"),t.beds)}
        ${this.renderPart(this.t("compare.features"),t.features)}
        ${t.plantings.added.length||t.plantings.removed.length||t.plantings.changed.length?i`<div class="part"><h4>${this.t("compare.crops")}</h4><ul>
          ${t.plantings.added.map(a=>this.crop(a,"+","add"))}
          ${t.plantings.removed.map(a=>this.crop(a,"\u2212","del"))}
          ${t.plantings.changed.map(a=>this.crop(a,"~","chg",i`<span class="xs muted">(${a.was_bed&&a.was_bed!==a.bed?`${a.was_bed} \u2192 ${a.bed}`:this.what(a.what)})</span>`))}
        </ul></div>`:u}
      </div>`:u}`}};pe.styles=[L,S`
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
    `],p([m({attribute:!1})],pe.prototype,"snapshot",2),p([m({attribute:!1})],pe.prototype,"api",2),p([m({attribute:!1})],pe.prototype,"t",2),p([m({attribute:!1})],pe.prototype,"plants",2),p([m({attribute:!1})],pe.prototype,"families",2),p([m()],pe.prototype,"lang",2),p([m()],pe.prototype,"left",2),p([m()],pe.prototype,"right",2),p([f()],pe.prototype,"result",2),p([f()],pe.prototype,"error",2),pe=p([z("hl-plan-compare")],pe);function ri(h){return`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}-${String(h.getDate()).padStart(2,"0")}`}var ge=class extends E{constructor(){super(...arguments);this.lang="en";this.days=14;this.moisture=[];this.rainByDay={};this.loaded=!1;this.loadedFor="";this.generation=0}get today(){return this.snapshot.analysis?.today??new Date().toISOString().slice(0,10)}rainEntity(){return this.snapshot.zones.find(t=>t.id===this.bed.zone_id)?.sensors?.rain??this.snapshot.settings.outdoor_sensors?.rain??null}willUpdate(){let e=`${this.bed?.id}:${this.days}`;this.bed&&this.api&&e!==this.loadedFor&&(this.loadedFor=e,this.load())}async load(){let e=++this.generation,t=this.bed.id;this.loaded=!1;let s=this.bed.sensors?.soil_moisture??null,a=this.rainEntity(),n=new Date(`${D(this.today,-(this.days-1))}T00:00:00`);try{let r=await this.api.history([s,a].filter(d=>!!d),n);if(e!==this.generation||t!==this.bed.id)return;this.moisture=(s?r[s]??[]:[]).map(d=>({t:d.lu*1e3,v:Number(d.s)})).filter(d=>Number.isFinite(d.v));let l={};for(let d of a?r[a]??[]:[]){let c=Number(d.s);if(!Number.isFinite(c))continue;let g=ri(new Date(d.lu*1e3));l[g]=Math.max(l[g]??0,c)}this.rainByDay=l}catch{if(e!==this.generation)return;this.moisture=[],this.rainByDay={}}finally{e===this.generation&&(this.loaded=!0)}}daysData(){let e=[];for(let t=this.days-1;t>=0;t--){let s=D(this.today,-t),a=(this.snapshot.irrigation_log??[]).filter(n=>n.bed_id===this.bed.id&&n.at.slice(0,10)===s);e.push({day:s,liters:a.reduce((n,r)=>n+r.liters,0),mm:a.reduce((n,r)=>n+r.mm,0),rain:this.rainByDay[s]??null})}return e}render(){let e=this.daysData(),t=700,s=170,a=34,n=34,r=10,l=26,d=(t-a-n)/e.length,c=Math.max(5,...e.map(_=>Math.max(_.mm,_.rain??0))),g=_=>s-l-_/c*(s-r-l),v=new Date(`${e[0].day}T00:00:00`).getTime(),$=this.days*864e5,T=_=>a+(_-v)/$*(t-a-n),k=_=>s-l-Math.max(0,Math.min(100,_))/100*(s-r-l),M=this.moisture.filter(_=>_.t>=v&&_.t<=v+$).map((_,A)=>`${A?"L":"M"}${T(_.t).toFixed(1)},${k(_.v).toFixed(1)}`).join(" "),R=e.some(_=>_.liters||_.rain)||this.moisture.length;return i`
      ${!R&&this.loaded?i`<p class="empty">${this.t("water.chart_empty")}</p>`:u}
      <svg viewBox="0 0 ${t} ${s}" role="img" aria-label=${this.t("water.chart_title",{bed:this.bed.name})}>
        <line x1=${a} x2=${t-n} y1=${s-l} y2=${s-l} stroke="var(--hl-border, #ccc)" />
        ${e.map((_,A)=>b`
          ${_.rain?b`<rect x=${a+A*d+d*.12} width=${d*.36} y=${g(_.rain)} height=${s-l-g(_.rain)} rx="2" fill="var(--hl-frost-300, #9cc7ec)"><title>${x(_.day,this.lang)} · ${this.t("water.rain")}: ${_.rain} mm</title></rect>`:u}
          ${_.mm?b`<rect x=${a+A*d+d*.52} width=${d*.36} y=${g(_.mm)} height=${s-l-g(_.mm)} rx="2" fill="var(--hl-leaf-600, #3f7d2f)"><title>${x(_.day,this.lang)} · ${this.t("water.given")}: ${Math.round(_.liters)} L (${_.mm.toFixed(1)} mm)</title></rect>`:u}
          ${A%2===0||this.days<=10?b`<text x=${a+A*d+d/2} y=${s-8} font-size="10" text-anchor="middle" fill="var(--hl-text-muted, #777)">${x(_.day,this.lang,{day:"numeric",month:"numeric"})}</text>`:u}`)}
        ${M?b`<path d=${M} fill="none" stroke="var(--hl-soil-700, #7a4e2d)" stroke-width="2" />
          <text x=${t-n+4} y=${k(100)+4} font-size="10" fill="var(--hl-text-muted, #777)">100%</text>
          <text x=${t-n+4} y=${k(0)} font-size="10" fill="var(--hl-text-muted, #777)">0%</text>`:u}
        <text x="2" y=${r+8} font-size="10" fill="var(--hl-text-muted, #777)">${Math.round(c)} mm</text>
      </svg>
      <div class="legend">
        <span style="--c: var(--hl-leaf-600, #3f7d2f)">${this.t("water.given")}</span>
        ${this.rainEntity()?i`<span style="--c: var(--hl-frost-300, #9cc7ec)">${this.t("water.rain")}</span>`:u}
        ${this.bed.sensors?.soil_moisture?i`<span style="--c: var(--hl-soil-700, #7a4e2d)">${this.t("water.moisture")}</span>`:i`<span>${this.t("water.no_moisture")}</span>`}
      </div>`}};ge.styles=S`
    :host { display: block; }
    svg { width: 100%; max-width: 820px; height: auto; display: block; }
    .legend { display: flex; gap: 12px; flex-wrap: wrap; font-size: 11px; color: var(--hl-text-muted, #666); margin-top: 4px; }
    .legend span::before { content: ""; display: inline-block; width: 12px; height: 8px; border-radius: 2px; margin-right: 4px; background: var(--c); vertical-align: middle; }
    .empty { font-size: 12px; color: var(--hl-text-muted, #666); }
  `,p([m({attribute:!1})],ge.prototype,"bed",2),p([m({attribute:!1})],ge.prototype,"snapshot",2),p([m({attribute:!1})],ge.prototype,"api",2),p([m({attribute:!1})],ge.prototype,"t",2),p([m()],ge.prototype,"lang",2),p([m({type:Number})],ge.prototype,"days",2),p([f()],ge.prototype,"moisture",2),p([f()],ge.prototype,"rainByDay",2),p([f()],ge.prototype,"loaded",2),ge=p([z("hl-water-chart")],ge);var ye=class extends E{constructor(){super(...arguments);this.journal=[];this.lang="en";this.plantingId="";this.bedId="";this.plantId="";this.plantingIds=[];this.open=-1}get shots(){let e=t=>this.plantingId&&t.planting_id===this.plantingId||!this.plantingId&&this.bedId&&t.bed_id===this.bedId||!this.plantingId&&!this.bedId&&this.plantId&&(t.plant_id===this.plantId||!!t.planting_id&&this.plantingIds.includes(t.planting_id));return this.journal.filter(t=>t.photos?.length&&e(t)).sort((t,s)=>t.at<s.at?-1:1).flatMap(t=>t.photos.map(s=>({id:s,at:t.at,text:t.text,kind:t.kind})))}dayOf(e,t){return Math.round((Date.parse(t.slice(0,10))-Date.parse(e.slice(0,10)))/864e5)+1}render(){let e=this.shots;if(!e.length)return u;let t=e[0].at,s=e[this.open];return i`
      <div class="rail" aria-hidden="true"></div>
      <div class="strip" role="list" aria-label=${this.t("photos.timeline")}>
        ${e.map((a,n)=>i`<button class="shot" role="listitem" @click=${()=>this.open=n}
            aria-label=${`${this.t("photos.day",{n:this.dayOf(t,a.at)})} \xB7 ${x(a.at.slice(0,10),this.lang)}`}>
          <img src=${ve(a.id,"256x256")} alt="" loading="lazy" />
          <div class="day">${this.t("photos.day",{n:this.dayOf(t,a.at)})}</div>
          <div class="date">${x(a.at.slice(0,10),this.lang)}</div>
        </button>`)}
      </div>
      ${s?i`<hl-modal heading=${this.t("photos.day",{n:this.dayOf(t,s.at)})} subheading=${x(s.at.slice(0,10),this.lang)}
          nav ?has-prev=${this.open>0} ?has-next=${this.open<e.length-1} size="wide"
          closeLabel=${this.t("common.close")} prevLabel=${this.t("common.previous")} nextLabel=${this.t("common.next")}
          @prev=${()=>this.open-=1} @next=${()=>this.open+=1} @closed=${a=>{a.stopPropagation(),this.open=-1}}>
        <div class="viewer">
          <img src=${ve(s.id,"1024x1024")} alt=${s.text} />
          ${s.text?i`<p class="caption">${s.text}</p>`:u}
          <span class="small muted">${this.open+1} / ${e.length}</span>
        </div>
      </hl-modal>`:u}`}};ye.styles=S`
    :host { display: block; }
    .strip { display: flex; gap: 10px; overflow-x: auto; padding: 4px 2px 10px; scroll-snap-type: x proximity; }
    .shot { flex: none; width: 108px; border: 0; padding: 0; background: none; cursor: zoom-in; text-align: left; scroll-snap-align: start;
      font: inherit; color: inherit; }
    .shot img { width: 108px; height: 108px; object-fit: cover; border-radius: 12px; display: block;
      box-shadow: var(--hl-shadow-1); transition: transform var(--hl-dur) var(--hl-ease), box-shadow var(--hl-dur) var(--hl-ease); }
    .shot:hover img { transform: translateY(-2px); box-shadow: var(--hl-shadow-2); }
    .shot:focus-visible img { outline: 2px solid var(--hl-focus); outline-offset: 2px; }
    .day { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--hl-primary); margin-top: 6px; }
    .date { font-size: 11px; color: var(--hl-text-muted); }
    .rail { position: relative; height: 2px; margin: 0 2px 2px; background: linear-gradient(90deg, var(--hl-leaf-300), var(--hl-sun-500)); border-radius: 2px; opacity: 0.6; }
    .viewer { display: flex; flex-direction: column; gap: 10px; }
    .viewer img { width: 100%; max-height: 70vh; object-fit: contain; border-radius: 12px; background: var(--hl-surface-2); }
    .small { font-size: var(--hl-fs-sm); } .muted { color: var(--hl-text-muted); }
    .caption { font-family: var(--hl-font-serif); font-style: italic; color: var(--hl-text-muted); }
  `,p([m({attribute:!1})],ye.prototype,"journal",2),p([m({attribute:!1})],ye.prototype,"t",2),p([m()],ye.prototype,"lang",2),p([m()],ye.prototype,"plantingId",2),p([m()],ye.prototype,"bedId",2),p([m()],ye.prototype,"plantId",2),p([m({attribute:!1})],ye.prototype,"plantingIds",2),p([f()],ye.prototype,"open",2),ye=p([z("hl-photo-timeline")],ye);var oi=["observation","problem","note","milestone"],ne=class extends E{constructor(){super(...arguments);this.lang="en";this.plantingId="";this.bedId="";this.admin=!0;this.text="";this.kind="observation";this.photos=[];this.busy=!1}get entries(){return(this.snapshot.journal??[]).filter(e=>this.plantingId&&e.planting_id===this.plantingId||!this.plantingId&&this.bedId&&e.bed_id===this.bedId).sort((e,t)=>e.at<t.at?1:-1).slice(0,3)}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async addPhotos(e){let t=e.target;this.busy=!0;try{for(let s of[...t.files??[]])this.photos=[...this.photos,await this.api.uploadPhoto(s)]}catch(s){this.toast(this.t("common.error",{message:s.message}))}finally{this.busy=!1,t.value=""}}async save(){if(!(!this.text.trim()&&!this.photos.length)){this.busy=!0;try{await this.api.saveJournal({text:this.text.trim(),kind:this.kind,photos:this.photos,planting_id:this.plantingId||null,bed_id:this.plantingId?null:this.bedId||null}),this.text="",this.photos=[],this.toast(this.t("journal.saved"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}finally{this.busy=!1}}}render(){return i`<div class="stack" style="gap:6px">
      ${this.admin?i`
        <textarea .value=${this.text} placeholder=${this.t("note.placeholder")} aria-label=${this.t("journal.text")}
          @input=${e=>this.text=e.target.value}></textarea>
        ${this.photos.length?i`<div class="photos">${this.photos.map(e=>i`<img src=${ve(e,"128x128")} alt="" />`)}</div>`:u}
        <div class="row wrap" style="gap:6px">
          <select style="width:auto" aria-label=${this.t("journal.kind")} @change=${e=>this.kind=e.target.value}>
            ${oi.map(e=>i`<option value=${e} ?selected=${this.kind===e}>${this.t(`journal.kind.${e}`)}</option>`)}</select>
          <span class="btn small ghost file"><ha-icon icon="mdi:camera-outline"></ha-icon>${this.t("note.photo")}
            <input type="file" accept="image/*" capture="environment" multiple ?disabled=${this.busy} @change=${this.addPhotos} /></span>
          <span class="spacer"></span>
          <button class="btn small primary" ?disabled=${this.busy||!this.text.trim()&&!this.photos.length} @click=${()=>this.save()}>${this.t("note.save")}</button>
        </div>`:u}
      <hl-photo-timeline .journal=${this.snapshot.journal??[]} .t=${this.t} lang=${this.lang} plantingId=${this.plantingId??""} bedId=${this.bedId??""}></hl-photo-timeline>
      ${this.entries.map(e=>i`<div class="entry">
        ${e.photos[0]?i`<img src=${ve(e.photos[0],"128x128")} alt="" />`:u}
        <div><span class="xs muted">${x(e.at.slice(0,10),this.lang)} · ${this.t(`journal.kind.${e.kind}`)}</span><br />${e.text}</div>
      </div>`)}
    </div>`}};ne.styles=[L,S`
      :host { display: block; }
      textarea { min-height: 54px; }
      .photos { display: flex; gap: 6px; flex-wrap: wrap; }
      .photos img { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; }
      .entry { display: flex; gap: 8px; padding: 6px 0; border-top: 1px solid var(--hl-border); font-size: var(--hl-fs-sm); }
      .entry img { width: 48px; height: 48px; object-fit: cover; border-radius: 6px; flex: none; }
      .file { position: relative; overflow: hidden; }
      .file input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
    `],p([m({attribute:!1})],ne.prototype,"snapshot",2),p([m({attribute:!1})],ne.prototype,"api",2),p([m({attribute:!1})],ne.prototype,"t",2),p([m()],ne.prototype,"lang",2),p([m()],ne.prototype,"plantingId",2),p([m()],ne.prototype,"bedId",2),p([m({type:Boolean})],ne.prototype,"admin",2),p([f()],ne.prototype,"text",2),p([f()],ne.prototype,"kind",2),p([f()],ne.prototype,"photos",2),p([f()],ne.prototype,"busy",2),ne=p([z("hl-quick-note")],ne);var rs=class{constructor(o,e=100){this.present=o;this.limit=e;this.past=[];this.future=[]}get current(){return this.present}get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}commit(o){return this.past.push(this.present),this.past.length>this.limit&&this.past.shift(),this.present=o,this.future=[],o}undo(){let o=this.past.pop();return o===void 0?this.present:(this.future.push(this.present),this.present=o,o)}redo(){let o=this.future.pop();return o===void 0?this.present:(this.past.push(this.present),this.present=o,o)}reset(o){this.past=[],this.future=[],this.present=o}};var F=h=>structuredClone(h),os=()=>({soil_moisture:null,soil_temperature:null,air_temperature:null,air_humidity:null,light:null,rain:null}),nn=[["buildings",["house","carport","shed","driveway","parking","street","terrace","decking","wall"]],["paths",["path","stone_path","wood_path","stepping_stones","bark_path"]],["green",["lawn","flowerbed","hedge","shrub","tree","pond"]],["outdoor_living",["seating","pool","play","fence","trellis","compost","water_butt","beehive","other"]]],li=nn.flatMap(([,h])=>h),di={path:[300,60],terrace:[400,300],lawn:[500,400],flowerbed:[200,100],compost:[100,100],water_butt:[60,60],shed:[200,150],tree:[400,400],house:[1e3,800],driveway:[300,800],street:[1500,600],parking:[500,500],play:[300,300],beehive:[60,60],hedge:[400,80],fence:[500,10],trellis:[200,20],pond:[200,150],other:[80,80],stone_path:[300,80],wood_path:[300,80],stepping_stones:[300,50],bark_path:[300,60],decking:[400,300],wall:[400,20],carport:[300,500],shrub:[150,150],pool:[800,400],seating:[300,250]},Hs=["outdoor","garden","greenhouse","cold_frame","containers","orchard","fruit","herbs","flowers"],hi=["orchard","fruit","herbs","flowers","garden"],pi={outdoor:[600,400],greenhouse:[300,200],cold_frame:[150,80],orchard:[1e3,800],fruit:[600,300],herbs:[300,200],flowers:[400,150],garden:[800,600],containers:[400,200]},ci=["fresh","storage","herbs","pollinators","winter","perennials","easy"],ui=["vegetable","herb","fruit","flower"];function Ds(h){let o=h.sowing;return o.direct_sow.length&&(!o.indoor_sow.length||h.habit==="root"||h.tags.includes("root"))?"direct_sow":o.indoor_sow.length&&o.transplant.length?"indoor_sow":o.transplant.length?"transplant":"direct_sow"}var P=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.narrow=!1;this.mode="plant";this.transitionRequest=0;this.initialSeason=null;this.focusPlanting=null;this.why=null;this.dropWarning=null;this.stillPossible=null;this.stillPossibleFor=null;this.lateDismissed=!1;this.comparePlan="";this.draft={zones:[],beds:[],plantings:[],features:[]};this.selection=null;this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.categoryFilter="";this.autofill=null;this.autofillBusy=!1;this.autofillReplace=!1;this.autofillBeds=[];this.autofillResources=null;this.autofillSeason=0;this.season=new Date().getFullYear();this.saveState="saved";this.reports={};this.extraTimelines={};this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.layoutMode="block";this.search="";this.familyFilter="";this.paletteDrag=null;this.ghostReport=null;this.dialog=null;this.newPlanStart="zones";this.planBusy=!1;this.popupOpen=!1;this.announcement="";this.paletteOpen=!0;this.step="plant";this.tool=null;this.focusZone="";this.removing=null;this.soilForm=null;this.harvestKg="";this.history=null;this.baseRevision=null;this.checkTimers=new Map;this.ghostCheckAt=0;this.plantMap=new Map;this.seasonChosen=!1;this.dropCheck=0}willUpdate(e){e.has("plants")&&(this.plantMap=new Map(this.plants.map(t=>[t.id,t]))),e.has("snapshot")&&this.snapshot&&this.syncFromSnapshot(),e.has("mode")&&(this.step=this.mode==="plant"?"plant":this.draft.zones.length?"zones":"site",this.tool=null,this.selection=null,this.multi=[]),e.has("transitionRequest")&&this.transitionRequest>0&&(this.dialog="transition"),e.has("focusPlanting")&&this.focusPlanting&&this.openFocus(this.focusPlanting),this.loadStillPossible()}async openFocus(e){this.history||this.syncFromSnapshot(),e.season!==this.season&&await this.setSeason(e.season),this.draft.plantings.some(t=>t.id===e.id)&&(this.selection={kind:"planting",id:e.id},this.multi=[],this.popupOpen=!0)}async explainHere(e){this.why={plantingId:e.id,result:null,error:""};try{let t=await this.api.explain(e.plant_id,this.season);this.why?.plantingId===e.id&&(this.why={plantingId:e.id,result:t,error:""})}catch(t){this.why={plantingId:e.id,result:null,error:t.message}}}async checkDrop(e){let t=++this.dropCheck;try{let s=await this.api.explain(e.plant_id,this.season);if(t!==this.dropCheck)return;let a=s.beds.find(n=>n.bed_id===e.bed_id);a&&!a.ok&&(this.dropWarning={plantingId:e.id,text:a.reasons.map(n=>Ve(n,this.t,this.lang,this.plantMap))})}catch{}}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get hasLayout(){return!!this.snapshot&&Ie(this.snapshot,this.season)!==null}locked(e){return this.mode==="plant"&&e!=="planting"}syncFromSnapshot(e=!1){let t=this.snapshot;if(!this.history&&!this.seasonChosen){this.season=t.layout_season??t.analysis?.season??new Date().getFullYear();let a=t.analysis?.season;a&&a!==this.season&&Ie(t,a)&&(this.season=a),this.initialSeason&&(this.season=this.initialSeason),this.viewDate=t.analysis?.today??"",this.step=this.mode==="plant"?"plant":t.zones.length?"zones":"site"}let s=this.saveState==="saved";if(e||!this.history||s&&t.revision!==this.baseRevision){let a=Ie(t,this.season)??{zones:[],beds:[],features:[]},n={zones:F(a.zones),beds:F(a.beds),plantings:F(t.plantings),features:F(a.features??[])};this.history?this.history.reset(n):this.history=new rs(n),this.draft=n,this.baseRevision=t.revision,this.reports={},this.extraTimelines={}}}get timelines(){return{...this.snapshot.analysis?.timelines??{},...this.extraTimelines}}get seasonPlantings(){return this.draft.plantings.filter(e=>Re(e,!!this.plantMap.get(e.plant_id)?.perennial,this.season))}commit(e,t,s=[]){if(!(!this.admin||!this.history)){this.draft=this.history.commit(e),this.saveState="dirty",this.scheduleSave();for(let a of s)this.scheduleCheck(a);t&&this.announce(t)}}undo(){this.history?.canUndo&&(this.draft=this.history.undo(),this.afterHistoryJump())}redo(){this.history?.canRedo&&(this.draft=this.history.redo(),this.afterHistoryJump())}afterHistoryJump(){this.saveState="dirty",this.scheduleSave(),this.draft.beds.forEach(e=>this.scheduleCheck(e.id)),this.selection&&!this.findItem(this.selection)&&(this.selection=null)}scheduleSave(){window.clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>this.save(),1200)}async save(){if(this.saveState!=="dirty")return;let e=this.draft;this.saveState="saving";try{let t=await this.api.savePlan(e,this.baseRevision,this.season);this.baseRevision=t.revision,this.saveState=this.draft===e?"saved":"dirty",this.saveState==="dirty"&&this.scheduleSave()}catch(t){t.code==="revision_conflict"?(this.saveState="saved",this.history=null,this.syncFromSnapshot(),this.toast(this.t("common.conflict"))):(this.saveState="error",this.toast(this.t("common.error",{message:t.message??String(t)})))}}async setSeason(e){if(window.clearTimeout(this.saveTimer),this.saveState==="dirty"&&await this.save(),this.saveState!=="saved"){this.toast(this.t("layout.save_first")),this.requestUpdate();return}this.seasonChosen=!0,this.season=e,this.dispatchEvent(new CustomEvent("season-changed",{detail:e,bubbles:!0,composed:!0})),this.selection=null,this.multi=[],this.focusZone="",this.syncFromSnapshot(!0),this.mode==="layout"&&(this.step=this.draft.zones.length?this.step:"site"),requestAnimationFrame(()=>this.canvas?.fit())}startLayout(e){let t=e==null?null:Ie(this.snapshot,e),s={...F(this.draft),zones:F(t?.zones??[]),beds:F(t?.beds??[]),features:F(t?.features??[])};this.commit(s,this.t("layout.started",{season:this.season})),this.step=s.zones.length?"zones":"site",requestAnimationFrame(()=>this.canvas?.fit())}scheduleCheck(e){window.clearTimeout(this.checkTimers.get(e)),this.checkTimers.set(e,window.setTimeout(()=>this.runCheck(e),250))}bedPlantings(e,t=this.draft){return t.plantings.filter(s=>s.bed_id===e&&(this.plantMap.get(s.plant_id)?.perennial?Re(s,!0,this.season):Math.abs(s.season-this.season)<=1))}async runCheck(e){let t=this.draft.beds.find(s=>s.id===e);if(!t){let{[e]:s,...a}=this.reports;this.reports=a;return}try{let s=await this.api.checkBed(t,this.bedPlantings(e));this.reports={...this.reports,[e]:s},s.timelines&&(this.extraTimelines={...this.extraTimelines,...s.timelines})}catch{}}findItem(e){return(e.kind==="zone"?this.draft.zones:e.kind==="bed"?this.draft.beds:e.kind==="feature"?this.draft.features:this.draft.plantings).find(s=>s.id===e.id)}onSelect(e){if(!e){this.selection=null,this.multi=[];return}if(e.additive){let t=this.multi.filter(a=>a.kind===e.kind),s=t.some(a=>a.id===e.id);this.multi=s?t.filter(a=>a.id!==e.id):[...t,{kind:e.kind,id:e.id}],this.selection=this.multi[this.multi.length-1]??null,this.announce(this.t("planner.selected_n",{n:this.multi.length}));return}this.selection={kind:e.kind,id:e.id},this.multi=[this.selection]}align(e){if(this.multi.length<2||!this.admin||this.locked(this.multi[0].kind))return;let t=F(this.draft),s=this.multi[0].kind,a=new Set;if(s==="planting"){let n=this.multi.map(d=>t.plantings.find(c=>c.id===d.id)).filter(Boolean),r=new Map(t.beds.map(d=>[d.id,d])),l=n.map(d=>({x:r.get(d.bed_id).x_cm+d.x_cm,y:r.get(d.bed_id).y_cm+d.y_cm,w:d.width_cm,h:d.length_cm}));Is(l,e).forEach((d,c)=>{let g=n[c],v=r.get(g.bed_id),$=Le({...d,x:d.x-v.x_cm,y:d.y-v.y_cm},{x:0,y:0,w:v.width_cm,h:v.length_cm});Object.assign(g,{x_cm:$.x,y_cm:$.y}),a.add(v.id)})}else{let n=s==="bed"?t.beds:s==="zone"?t.zones:t.features,r=this.multi.map(l=>n.find(d=>d.id===l.id)).filter(Boolean);Is(r.map(l=>({x:l.x_cm,y:l.y_cm,w:l.width_cm,h:l.length_cm})),e).forEach((l,d)=>{let c=r[d],g=l.x-c.x_cm,v=l.y-c.y_cm;if(c.x_cm=l.x,c.y_cm=l.y,s==="zone")for(let $ of t.beds.filter(T=>T.zone_id===c.id))$.x_cm+=g,$.y_cm+=v;s==="bed"&&a.add(c.id)})}this.commit(t,this.t("planner.aligned",{n:this.multi.length}),[...a])}onItemChange(e){let{kind:t,id:s,rect:a,targetBedId:n,dx:r,dy:l,group:d}=e.detail;if(this.locked(t))return;let c=F(this.draft),g=this.snapOn?this.snapshot.settings.snap_cm:1;if(d){this.moveGroup(c,t,r,l);return}if(t==="feature"){let v=c.features.find($=>$.id===s);Object.assign(v,{x_cm:a.x,y_cm:a.y,width_cm:a.w,length_cm:a.h}),this.commit(c,this.t("planner.moved",{name:v.name}));return}if(t==="zone"){let v=c.zones.find(k=>k.id===s),$=a.x-v.x_cm,T=a.y-v.y_cm;if(Object.assign(v,{x_cm:a.x,y_cm:a.y,width_cm:a.w,length_cm:a.h}),$||T)for(let k of c.beds.filter(M=>M.zone_id===s))k.x_cm+=$,k.y_cm+=T;this.commit(c,this.t("planner.moved",{name:v.name}))}else if(t==="bed"){let v=c.beds.find(M=>M.id===s);Object.assign(v,{x_cm:a.x,y_cm:a.y,width_cm:a.w,length_cm:a.h});let $=a.x+a.w/2,T=a.y+a.h/2,k=[...c.zones].reverse().find(M=>$>=M.x_cm&&$<=M.x_cm+M.width_cm&&T>=M.y_cm&&T<=M.y_cm+M.length_cm);k&&(v.zone_id=k.id),this.commit(c,this.t("planner.moved",{name:v.name}),[v.id])}else{let v=c.plantings.find(R=>R.id===s),$=v.bed_id,T=c.beds.find(R=>R.id===(n??$))??c.beds.find(R=>R.id===$),k=Le({...a,x:a.x-T.x_cm,y:a.y-T.y_cm},{x:0,y:0,w:T.width_cm,h:T.length_cm});Object.assign(v,{bed_id:T.id,x_cm:V(k.x,g),y_cm:V(k.y,g),width_cm:k.w,length_cm:k.h});let M=this.plantMap.get(v.plant_id);this.commit(c,this.t("planner.moved",{name:w(M,this.lang)}),[...new Set([$,T.id])])}}moveGroup(e,t,s,a){let n=new Set(this.multi.filter(l=>l.kind===t).map(l=>l.id)),r=new Set;if(t==="planting")for(let l of e.plantings.filter(d=>n.has(d.id))){let d=e.beds.find(g=>g.id===l.bed_id),c=Le({x:l.x_cm+s,y:l.y_cm+a,w:l.width_cm,h:l.length_cm},{x:0,y:0,w:d.width_cm,h:d.length_cm});Object.assign(l,{x_cm:c.x,y_cm:c.y}),r.add(d.id)}else{let l=t==="bed"?e.beds:t==="zone"?e.zones:e.features;for(let d of l.filter(c=>n.has(c.id))){if(d.x_cm=Math.round(d.x_cm+s),d.y_cm=Math.round(d.y_cm+a),t==="zone")for(let c of e.beds.filter(g=>g.zone_id===d.id))c.x_cm+=s,c.y_cm+=a;t==="bed"&&r.add(d.id)}}this.commit(e,this.t("planner.moved_n",{n:n.size}),[...r])}updateSelected(e,t){if(!this.selection||this.locked(this.selection.kind))return;let s=F(this.draft),n=(this.selection.kind==="zone"?s.zones:this.selection.kind==="bed"?s.beds:this.selection.kind==="feature"?s.features:s.plantings).find(l=>l.id===this.selection.id);if(!n)return;Object.assign(t?n[t]:n,e);let r=this.selection.kind==="planting"?n.bed_id:this.selection.kind==="bed"?n.id:void 0;this.commit(s,void 0,r?[r]:[])}inSeason(e){return Re(e,!!this.plantMap.get(e.plant_id)?.perennial,this.season)}dropFromSeason(e,t){let s=new Set(t);e.plantings=e.plantings.flatMap(a=>!s.has(a.bed_id)||!this.inSeason(a)?[a]:a.season<this.season?[{...a,last_season:this.season-1}]:[])}removeSelected(){let e=this.selection;if(!e||!this.admin||this.locked(e.kind))return;let t=F(this.draft),s="";if(this.multi.length>1&&(e.kind==="planting"||e.kind==="feature")){let a=new Set(this.multi.map(r=>r.id)),n=t.plantings.filter(r=>a.has(r.id)).map(r=>r.bed_id);t.plantings=t.plantings.filter(r=>!a.has(r.id)),t.features=t.features.filter(r=>!a.has(r.id)),this.commit(t,this.t("planner.removed_n",{n:a.size}),[...new Set(n)]),this.selection=null,this.multi=[];return}if(e.kind==="feature"){let a=t.features.find(n=>n.id===e.id);t.features=t.features.filter(n=>n.id!==e.id),this.commit(t,this.t("planner.removed",{name:a?.name??""})),this.selection=null,this.multi=[];return}if(e.kind==="planting"){let a=t.plantings.find(n=>n.id===e.id);if(a&&this.plantMap.get(a.plant_id)?.perennial&&a.season<this.season){this.removing=a;return}s=w(this.plantMap.get(a?.plant_id??""),this.lang),t.plantings=t.plantings.filter(n=>n.id!==e.id),this.commit(t,this.t("planner.removed",{name:s}),a?[a.bed_id]:[])}else if(e.kind==="bed"){let a=t.beds.find(r=>r.id===e.id),n=t.plantings.filter(r=>r.bed_id===e.id&&this.inSeason(r)).length;if(n&&!confirm(`${a?.name}: ${this.t("planner.count",{n})} \u2013 ${this.t("common.delete")}?`))return;t.beds=t.beds.filter(r=>r.id!==e.id),this.dropFromSeason(t,[e.id]),this.commit(t,this.t("planner.removed",{name:a?.name??""}))}else{let a=t.zones.find(r=>r.id===e.id),n=t.beds.filter(r=>r.zone_id===e.id).map(r=>r.id);if(n.length&&!confirm(`${a?.name}: ${n.length} \xD7 ${this.t("planner.bed_name")} \u2013 ${this.t("common.delete")}?`))return;t.zones=t.zones.filter(r=>r.id!==e.id),t.beds=t.beds.filter(r=>!n.includes(r.id)),this.dropFromSeason(t,n),this.commit(t,this.t("planner.removed",{name:a?.name??""}))}this.selection=null,this.multi=[]}removePerennial(e){let t=this.removing;if(this.removing=null,!t)return;let s=F(this.draft),a=w(this.plantMap.get(t.plant_id),this.lang);e==="delete"?s.plantings=s.plantings.filter(n=>n.id!==t.id):Object.assign(s.plantings.find(n=>n.id===t.id),{removed_season:this.season}),this.selection=null,this.multi=[],this.commit(s,this.t(e==="delete"?"planner.removed":"planner.removed_from",{name:a,season:this.season}),[t.bed_id])}toolInfo(e){return e.kind==="zone"?{label:this.t(`settings.zone_type.${e.type}`),color:he[e.type].stroke.startsWith("var")?"#6f9a45":he[e.type].stroke}:e.kind==="feature"?{label:this.t(`feature.${e.type}`),color:Qe[e.type]?.stroke??"#888"}:{label:this.t(e.bedKind==="container"?"planner.draw_planter":"planner.bed_name"),color:"#8a6a45"}}onDrawRect(e){let t=this.tool;if(!t||!this.admin)return;let s=e.detail,a=F(this.draft),n=(r,l)=>({x:V(s.x-r/2,10),y:V(s.y-l/2,10),w:r,h:l});if(t.kind==="zone"){s.w||(s=n(...pi[t.type]));let r=a.zones.filter(d=>d.type===t.type).length+1,l={id:Me("zone"),name:`${this.t(`settings.zone_type.${t.type}`)}${r>1?` ${r}`:""}`,type:t.type,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:os(),vent_entity:null};a.zones.push(l),hi.includes(t.type)&&a.beds.push(this.makeBed(l,{x:l.x_cm,y:l.y_cm,w:l.width_cm,h:l.length_cm},l.name,"in_ground")),this.selection={kind:"zone",id:l.id},this.commit(a,this.t("planner.placed",{plant:l.name,bed:""}))}else if(t.kind==="feature"){s.w||(s=n(...di[t.type]));let r={id:Me("ft"),name:this.t(`feature.${t.type}`),type:t.type,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,notes:""};a.features.push(r),this.selection={kind:"feature",id:r.id},this.commit(a,this.t("planner.placed",{plant:r.name,bed:""}))}else{s.w||(s=t.bedKind==="container"?n(80,40):n(120,80));let r=s.x+s.w/2,l=s.y+s.h/2,d=a.zones.find(g=>g.id===this.focusZone)??[...a.zones].reverse().find(g=>r>=g.x_cm&&r<=g.x_cm+g.width_cm&&l>=g.y_cm&&l<=g.y_cm+g.length_cm);if(!d){this.toast(this.t("planner.bed_needs_zone"));return}let c=this.makeBed(d,Le(s,{x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm}),`${this.t(t.bedKind==="container"?"planner.new_planter":"planner.new_bed")} ${a.beds.length+1}`,t.bedKind??(d.type==="containers"?"container":d.type==="outdoor"?"raised":"in_ground"));a.beds.push(c),this.selection={kind:"bed",id:c.id},this.commit(a,this.t("planner.placed",{plant:c.name,bed:d.name}),[c.id])}this.multi=this.selection?[this.selection]:[]}makeBed(e,t,s,a){return{id:Me("bed"),name:s,zone_id:e.id,kind:a,x_cm:t.x,y_cm:t.y,width_cm:t.w,length_cm:t.h,orientation_deg:0,soil:a==="container"?"potting_mix":"loam",shade_pct:null,sensors:os(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""}}openZone(e){this.focusZone=e,this.step==="site"&&(this.step="zones");let t=this.draft.zones.find(s=>s.id===e);this.selection=t?{kind:"zone",id:t.id}:null,this.multi=this.selection?[this.selection]:[],requestAnimationFrame(()=>t?this.canvas?.fitRect({x:t.x_cm,y:t.y_cm,w:t.width_cm,h:t.length_cm}):this.canvas?.fit())}closeZone(){this.focusZone="",requestAnimationFrame(()=>this.canvas?.fit())}moveToBed(e,t){let s=F(this.draft),a=s.plantings.find(g=>g.id===e),n=s.beds.find(g=>g.id===t);if(!a||!n)return;let r=a.bed_id,l=this.bedPlantings(n.id,s).filter(g=>g.season===a.season).map(g=>({x:g.x_cm,y:g.y_cm,w:g.width_cm,h:g.length_cm})),d={w:Math.min(a.width_cm,n.width_cm),h:Math.min(a.length_cm,n.length_cm)},c=Je(n,d,l,this.snapshot.settings.snap_cm)??{x:0,y:0};Object.assign(a,{bed_id:n.id,x_cm:c.x,y_cm:c.y,width_cm:d.w,length_cm:d.h}),this.commit(s,this.t("planner.moved",{name:w(this.plantMap.get(a.plant_id),this.lang)}),[r,n.id])}openAutofill(e=[]){let t=this.snapshot.settings.resources;this.autofillResources=t?F(t):{household_size:2,hours_per_week:3,water_liters_per_week:null,compost_kg:null,irrigation:!1,goals:["fresh","herbs"],wanted:[],excluded:[]},this.autofill=null,this.autofillBeds=e;let s=this.snapshot.analysis,a=!!s&&this.season===s.season&&!!s.anchors?.first_frost&&!!s.today&&je(s.today,s.anchors.first_frost)<60;this.autofillSeason=a?this.season+1:this.season,this.dialog="autofill"}async runAutofill(){if(this.autofillResources){this.autofillBusy=!0;try{this.saveState!=="saved"&&await this.save(),this.autofill=await this.api.autofill({season:this.autofillSeason||this.season,bed_ids:this.autofillBeds.length?this.autofillBeds:void 0,replace:this.autofillReplace,resources:this.autofillResources})}catch(e){this.toast(this.t("common.error",{message:e.message??String(e)}))}finally{this.autofillBusy=!1}}}async applyAutofill(){let e=this.autofill;if(e)try{let t=await this.api.autofillApply(e.plantings,this.autofillReplace?e.beds:[],this.baseRevision,e.plan_from);this.baseRevision=t.revision,this.saveState="saved",this.dialog=null,this.autofill=null,this.toast(this.t("autofill.applied",{n:e.summary.plantings})),e.season!==this.season&&(this.seasonChosen=!0,this.season=e.season,this.dispatchEvent(new CustomEvent("season-changed",{detail:e.season,bubbles:!0,composed:!0}))),this.history=null}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}}duplicateSelected(){let e=this.selection;if(!e||e.kind!=="planting")return;let t=F(this.draft),s=t.plantings.find(d=>d.id===e.id),a=s&&t.beds.find(d=>d.id===s.bed_id);if(!s||!a)return;let n=this.bedPlantings(a.id,t).filter(d=>d.season===s.season).map(d=>({x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm})),r=Je(a,{w:s.width_cm,h:s.length_cm},n,this.snapshot.settings.snap_cm)??{x:s.x_cm,y:s.y_cm},l={...F(s),id:Me("pl"),x_cm:r.x,y_cm:r.y,succession_group:null,succession_index:0,status:"planned",sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null};t.plantings.push(l),this.selection={kind:"planting",id:l.id},this.commit(t,void 0,[a.id])}nudge(e,t,s=!1){let a=this.selection;if(!a||!this.admin||this.locked(a.kind))return;let n=F(this.draft),r=[];if(a.kind==="planting"){let l=n.plantings.find(v=>v.id===a.id),d=n.beds.find(v=>v.id===l.bed_id),c=s?{x:l.x_cm,y:l.y_cm,w:Math.max(5,l.width_cm+e),h:Math.max(5,l.length_cm+t)}:{x:l.x_cm+e,y:l.y_cm+t,w:l.width_cm,h:l.length_cm},g=Le(c,{x:0,y:0,w:d.width_cm,h:d.length_cm});Object.assign(l,{x_cm:g.x,y_cm:g.y,width_cm:g.w,length_cm:g.h}),r.push(d.id)}else{let l=(a.kind==="bed"?n.beds:n.zones).find(d=>d.id===a.id);if(s)l.width_cm=Math.max(10,l.width_cm+e),l.length_cm=Math.max(10,l.length_cm+t);else if(l.x_cm+=e,l.y_cm+=t,a.kind==="zone")for(let d of n.beds.filter(c=>c.zone_id===a.id))d.x_cm+=e,d.y_cm+=t;a.kind==="bed"&&r.push(a.id)}this.commit(n,void 0,r)}newPlanting(e,t,s){return{id:Me("pl"),plant_id:e.id,bed_id:t.id,season:this.season,layout:this.layoutMode,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,count:null,method:Ds(e),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:""}}addToSelectedBed(e){if(!this.admin)return;let t=F(this.draft),s=this.selection?.kind==="bed"?this.selection.id:this.selection?.kind==="planting"?t.plantings.find(c=>c.id===this.selection.id)?.bed_id:void 0,a=t.beds.find(c=>c.id===s)??t.beds[0];if(!a)return;let n=zt(e,this.layoutMode,a),r=this.bedPlantings(a.id,t).filter(c=>c.season===this.season).map(c=>({x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm})),l=Je(a,n,r,this.snapshot.settings.snap_cm)??{x:0,y:0},d=this.newPlanting(e,a,{...l,...n});t.plantings.push(d),this.selection={kind:"planting",id:d.id},this.commit(t,this.t("planner.placed",{plant:w(e,this.lang),bed:a.name}),[a.id]),this.canvas?.focusCanvas()}addBed(){let e=F(this.draft),t=this.selection?.kind==="zone"&&e.zones.find(l=>l.id===this.selection.id)||e.zones.find(l=>l.type==="outdoor")||e.zones[0];if(!t)return this.addZone();let s={w:120,h:80},a=e.beds.filter(l=>l.zone_id===t.id).map(l=>({x:l.x_cm-t.x_cm-20,y:l.y_cm-t.y_cm-20,w:l.width_cm+40,h:l.length_cm+40})),n=Je({...e.beds[0],width_cm:t.width_cm,length_cm:t.length_cm},s,a,10)??{x:20,y:20},r={id:Me("bed"),name:`${this.t("planner.new_bed")} ${e.beds.length+1}`,zone_id:t.id,kind:"raised",x_cm:t.x_cm+n.x,y_cm:t.y_cm+n.y,width_cm:s.w,length_cm:s.h,orientation_deg:0,soil:"loam",shade_pct:null,sensors:os(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""};e.beds.push(r),this.selection={kind:"bed",id:r.id},this.commit(e,this.t("planner.placed",{plant:r.name,bed:t.name}),[r.id])}addZone(){let e=F(this.draft),t=is(e.zones,e.beds),s={id:Me("zone"),name:`${this.t("planner.new_zone")} ${e.zones.length+1}`,type:"outdoor",x_cm:e.zones.length?t.x+t.w+100:0,y_cm:e.zones.length?t.y:0,width_cm:400,length_cm:300,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:os(),vent_entity:null};e.zones.push(s),this.selection={kind:"zone",id:s.id},this.commit(e),requestAnimationFrame(()=>this.canvas?.fit())}onPalettePointerDown(e,t){!this.admin||e.pointerType==="mouse"&&e.button!==0||(e.currentTarget.setPointerCapture(e.pointerId),this.paletteDrag={plant:t,pointerId:e.pointerId,bedId:null,rect:null},this.ghostReport=null)}onPalettePointerMove(e){let t=this.paletteDrag;if(!t||t.pointerId!==e.pointerId)return;let s=this.canvas.clientToCanvas(e.clientX,e.clientY);if(!s){this.paletteDrag={...t,bedId:null,rect:null};return}let a=Qa(this.draft.beds,s.x,s.y);if(!a){let c={w:t.plant.spacing_cm,h:t.plant.spacing_cm};this.paletteDrag={...t,bedId:null,rect:{x:s.x-c.w/2,y:s.y-c.h/2,...c}};return}let n=zt(t.plant,this.layoutMode,a),r=this.snapOn?this.snapshot.settings.snap_cm:1,l={x:V(s.x-a.x_cm-n.w/2,r),y:V(s.y-a.y_cm-n.h/2,r),...n};this.layoutMode==="row"&&(l=a.width_cm>=a.length_cm?{...l,x:0}:{...l,y:0}),l=Le(l,{x:0,y:0,w:a.width_cm,h:a.length_cm}),this.paletteDrag={...t,bedId:a.id,rect:{...l,x:l.x+a.x_cm,y:l.y+a.y_cm}};let d=performance.now();if(d-this.ghostCheckAt>220){this.ghostCheckAt=d;let c=this.newPlanting(t.plant,a,l);c.id="__ghost__",this.api.checkBed(a,[...this.bedPlantings(a.id),c]).then(g=>{this.paletteDrag&&(this.ghostReport=g)}).catch(()=>{})}}onPalettePointerUp(e){let t=this.paletteDrag;if(!t||t.pointerId!==e.pointerId)return;if(this.paletteDrag=null,this.ghostReport=null,!t.bedId||!t.rect){t.rect&&this.announce(this.t("planner.no_bed_here"));return}let s=F(this.draft),a=s.beds.find(r=>r.id===t.bedId),n=this.newPlanting(t.plant,a,{...t.rect,x:t.rect.x-a.x_cm,y:t.rect.y-a.y_cm});s.plantings.push(n),this.selection={kind:"planting",id:n.id},this.commit(s,this.t("planner.placed",{plant:w(t.plant,this.lang),bed:a.name}),[a.id]),this.dropWarning=null,this.checkDrop(n)}ghostLabel(){let e=this.paletteDrag,t=w(e.plant,this.lang);if(!e.bedId)return t;let s=(this.ghostReport?.pairs??[]).filter(l=>l.a==="__ghost__"||l.b==="__ghost__"),a=s.filter(l=>l.kind==="enemy"||l.kind==="overlap").length,n=s.filter(l=>l.kind==="friend").length,r=(this.ghostReport?.rotation??[]).some(l=>l.planting==="__ghost__");return`${t}${n?` \xB7 \u2665 ${n}`:""}${a?` \xB7 \u26A0 ${a}`:""}${r?" \xB7 \u27F2":""}`}onKeyDown(e){let t=e.composedPath()[0];if(["INPUT","SELECT","TEXTAREA"].includes(t?.tagName))return;let s=e.ctrlKey||e.metaKey,a=(this.snapOn?this.snapshot.settings.snap_cm:1)*(e.shiftKey?10:1),n=e.key,r=()=>{e.preventDefault(),e.stopPropagation()};if(s&&n.toLowerCase()==="z"&&!e.shiftKey)return this.undo(),r();if(s&&n.toLowerCase()==="y"||s&&e.shiftKey&&n.toLowerCase()==="z")return this.redo(),r();if(s&&n.toLowerCase()==="d")return this.duplicateSelected(),r();if(s)return;let l={ArrowLeft:[-a,0],ArrowRight:[a,0],ArrowUp:[0,-a],ArrowDown:[0,a]};if(l[n]&&this.selection)return this.nudge(...l[n],e.altKey),r();switch(n){case"Delete":case"Backspace":return this.removeSelected(),r();case"Escape":return this.selection=null,this.multi=[],this.paletteDrag=null,this.dialog=null,r();case"g":return this.snapOn=!this.snapOn,r();case"c":return this.showCompanions=!this.showCompanions,r();case"m":return this.showMoisture=!this.showMoisture,r();case"t":return this.showTemperature=!this.showTemperature,r();case"+":case"=":return this.canvas.zoom(1.2),r();case"-":return this.canvas.zoom(1/1.2),r();case"0":return this.canvas.fit(),r();case"?":return this.dialog="shortcuts",r();case"]":case"[":return this.cycleSelection(n==="]"?1:-1),r();default:}}cycleSelection(e){let t=[...this.draft.beds.map(r=>({kind:"bed",id:r.id})),...this.seasonPlantings.map(r=>({kind:"planting",id:r.id}))];if(!t.length)return;let s=this.selection?t.findIndex(r=>r.id===this.selection.id):-1;this.selection=t[(s+e+t.length)%t.length];let a=this.findItem(this.selection),n=this.selection.kind==="planting"?w(this.plantMap.get(a.plant_id),this.lang):a.name;this.announce(n)}announce(e){this.announcement="",requestAnimationFrame(()=>this.announcement=e)}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async exportPlan(e){let{filename:t,content:s}=await this.api.exportPlan(e);Ae(t,s,e==="json"?"application/json":"application/yaml")}async importPlan(e){e.preventDefault();let t=e.target,s=t.elements.namedItem("file").files?.[0],a=t.elements.namedItem("mode").value;if(s)try{let n=await this.api.importPlan(await s.text(),a);this.history=null,this.saveState="saved",this.dialog=null,this.toast(this.t("planner.imported",{beds:n.counts.beds,plantings:n.counts.plantings}))}catch(n){this.toast(this.t("common.error",{message:n.message??String(n)}))}}async createSuccession(e){e.preventDefault();let t=this.selection,s=t?.kind==="planting"?this.draft.plantings.find(g=>g.id===t.id):void 0;if(!s)return;let a=e.target,n=Number(a.elements.namedItem("count").value),r=Number(a.elements.namedItem("interval").value)||null,l=a.elements.namedItem("placement").value,d=await this.api.succession(s,n,r,l),c=F(this.draft);c.plantings=c.plantings.filter(g=>g.id!==s.id).concat(d.plantings),this.dialog=null,this.commit(c,void 0,[s.bed_id]),d.dropped&&this.toast(this.t("planner.succession_dropped",{n:d.dropped}))}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal()}render(){if(!this.history)return i`<p class="empty">${this.t("common.loading")}</p>`;if(!this.hasLayout&&!this.draft.zones.length)return i`${this.renderStepper()}${this.renderToolbar()}${this.renderNoLayout()}${this.renderDialog()}`;let e=this.mode==="plant",t=this.paletteDrag,s=t?.rect?{rect:t.rect,valid:!!t.bedId,color:j(this.families,t.plant.family),label:this.ghostLabel()}:null;return i`
      ${this.renderStepper()}
      ${this.renderToolbar()}
      <div class="layout ${this.narrow?"narrow":""} ${this.paletteOpen||this.narrow?"":"palette-closed"}" @keydown=${this.onKeyDown}>
        ${this.paletteOpen||this.narrow?e?this.renderPalette():this.step==="zones"?this.renderZonesPane():this.renderSitePane():i`<div></div>`}
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
            @select=${a=>this.onSelect(a.detail)}
            @item-click=${a=>{this.onSelect(a.detail),this.popupOpen=!0}}
            @item-change=${this.onItemChange}
            @draw-rect=${this.onDrawRect}
            @zone-open=${a=>this.openZone(a.detail)}
          ></hl-garden-canvas>
          ${this.tool?i`<div class="draw-hint" role="status"><ha-icon icon="mdi:vector-rectangle"></ha-icon>
            ${this.t("planner.draw_hint",{what:this.toolInfo(this.tool).label})}
            <button class="btn small ghost" @click=${()=>this.tool=null}>${this.t("common.done")}</button></div>`:u}
          ${t?i`<div class="drag-ghost-hint" role="status">${s?s.label:w(t.plant,this.lang)}</div>`:u}
        </div>
      </div>
      <div class="visually-hidden" role="status" aria-live="polite">${this.announcement}</div>
      ${this.popupOpen&&this.selection&&!this.dialog&&!this.removing&&this.findItem(this.selection)?i`<hl-modal heading=${this.t("planner.inspector")} size="narrow" closeLabel=${this.t("common.close")}
            @closed=${()=>{this.popupOpen=!1,this.why=null}}>${this.renderInspector()}</hl-modal>`:u}
      ${this.renderDialog()}
    `}renderToolbar(){let e=this.mode==="plant",t=[this.season-1,this.season,this.season+1],s={saved:"common.saved",dirty:"common.unsaved",saving:"common.saving",error:"common.unsaved"}[this.saveState],a=(n,r,l,d,c=!1)=>i`
      <button class="icon-btn" title=${r} aria-label=${r} aria-pressed=${d===void 0?u:String(d)} ?disabled=${c} @click=${l}>
        <ha-icon icon=${n}></ha-icon>
      </button>`;return i`
      <div class="toolbar" role="toolbar" aria-label=${this.t("nav.planner")}>
        ${a("mdi:dock-left",this.t("planner.palette"),()=>this.paletteOpen=!this.paletteOpen,this.paletteOpen)}
        <label class="row small"><span class="visually-hidden">${this.t("planner.season")}</span>
          <select aria-label=${this.t("planner.season")} @change=${n=>this.setSeason(Number(n.target.value))}>
            ${t.map(n=>i`<option value=${n} ?selected=${n===this.season}>${this.t("common.season",{year:n})}${Ie(this.snapshot,n)?n===this.snapshot.layout_season?` \xB7 ${this.t("layout.current")}`:"":` \xB7 ${this.t("layout.no_plan")}`}</option>`)}
          </select>
        </label>
        <span class="sep"></span>
        ${a("mdi:undo",`${this.t("planner.undo")} (Ctrl+Z)`,()=>this.undo(),void 0,!this.history?.canUndo||!this.admin)}
        ${a("mdi:redo",`${this.t("planner.redo")} (Ctrl+Y)`,()=>this.redo(),void 0,!this.history?.canRedo||!this.admin)}
        <span class="sep"></span>
        ${a("mdi:grid",`${this.t("planner.snap")} (G)`,()=>this.snapOn=!this.snapOn,this.snapOn)}
        ${e?i`
          ${a("mdi:handshake-outline",`${this.t("planner.overlay_companions")} (C)`,()=>this.showCompanions=!this.showCompanions,this.showCompanions)}
          ${a("mdi:water-percent",`${this.t("planner.overlay_moisture")} (M)`,()=>this.showMoisture=!this.showMoisture,this.showMoisture)}
          ${a("mdi:thermometer",`${this.t("planner.overlay_temperature")} (T)`,()=>this.showTemperature=!this.showTemperature,this.showTemperature)}`:u}
        <span class="sep"></span>
        ${a("mdi:texture-box",this.t("planner.layer_zones"),()=>this.showZones=!this.showZones,this.showZones)}
        ${a("mdi:map-marker-path",this.t("planner.layer_features"),()=>this.showFeatures=!this.showFeatures,this.showFeatures)}
        ${e?a("mdi:sprout",this.t("planner.layer_plantings"),()=>this.showPlantings=!this.showPlantings,this.showPlantings):u}
        ${this.multi.length>1?i`<span class="sep"></span>
          ${a("mdi:align-horizontal-left",this.t("planner.align.left"),()=>this.align("left"))}
          ${a("mdi:align-horizontal-center",this.t("planner.align.hcenter"),()=>this.align("hcenter"))}
          ${a("mdi:align-horizontal-right",this.t("planner.align.right"),()=>this.align("right"))}
          ${a("mdi:align-vertical-top",this.t("planner.align.top"),()=>this.align("top"))}
          ${a("mdi:align-vertical-center",this.t("planner.align.vcenter"),()=>this.align("vcenter"))}
          ${a("mdi:align-vertical-bottom",this.t("planner.align.bottom"),()=>this.align("bottom"))}
          ${a("mdi:distribute-horizontal-center",this.t("planner.align.hdistribute"),()=>this.align("hdistribute"),void 0,this.multi.length<3)}
          ${a("mdi:distribute-vertical-center",this.t("planner.align.vdistribute"),()=>this.align("vdistribute"),void 0,this.multi.length<3)}`:u}
        <span class="sep"></span>
        ${a("mdi:magnify-plus-outline",this.t("planner.zoom_in"),()=>this.canvas.zoom(1.2))}
        ${a("mdi:magnify-minus-outline",this.t("planner.zoom_out"),()=>this.canvas.zoom(1/1.2))}
        ${a("mdi:fit-to-screen-outline",this.t("planner.fit"),()=>this.canvas.fit())}
        <span class="sep"></span>
        ${e?i`<label class="row small">${this.t("planner.view_date")}
          <hl-date-input .value=${this.viewDate} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}
            @date-change=${n=>this.viewDate=n.detail??this.snapshot.analysis?.today??""}></hl-date-input>
        </label>`:u}
        <span class="spacer"></span>
        <span class="save-state ${this.saveState==="error"?"error":""}" role="status">
          <ha-icon icon=${this.saveState==="saved"?"mdi:cloud-check-outline":"mdi:cloud-upload-outline"}></ha-icon>${this.t(s)}
        </span>
        ${this.admin&&e&&this.hasLayout?i`
          <button class="btn small primary" @click=${()=>this.openAutofill()}><ha-icon icon="mdi:auto-fix"></ha-icon>${this.t("autofill.title")}</button>`:u}
        ${this.admin&&!e&&this.hasLayout?i`
          <button class="btn small" @click=${()=>this.addBed()}><ha-icon icon="mdi:plus"></ha-icon>${this.t("planner.add_bed")}</button>`:u}
        ${e?u:i`<button class="btn small" @click=${()=>this.dialog="plans"}><ha-icon icon="mdi:file-tree-outline"></ha-icon>${this.t("plans.button")}
          ${this.snapshot.archived_plans?.length?i`<span class="chip">${this.snapshot.archived_plans.length}</span>`:u}</button>`}
        <button class="btn small" @click=${()=>this.go(e?"layout":"planner")}>
          <ha-icon icon=${e?"mdi:floor-plan":"mdi:sprout"}></ha-icon>${this.t(e?"layout.edit":"layout.to_planner")}</button>
        <button class="btn small ${this.snapshot.transition_due?"primary":""}" @click=${()=>this.dialog="transition"}>
          <ha-icon icon="mdi:calendar-arrow-right"></ha-icon>${this.t("year.button")}</button>
        <details class="more">
          <summary class="icon-btn" title=${this.t("planner.more")} aria-label=${this.t("planner.more")}><ha-icon icon="mdi:dots-vertical"></ha-icon></summary>
          <div class="menu" role="menu">
            <button role="menuitem" @click=${()=>this.exportPlan("json")}><ha-icon icon="mdi:file-export-outline"></ha-icon>${this.t("planner.export_json")}</button>
            <button role="menuitem" @click=${()=>this.exportPlan("yaml")}><ha-icon icon="mdi:code-braces"></ha-icon>${this.t("planner.export_yaml")}</button>
            ${this.admin?i`<button role="menuitem" @click=${()=>this.dialog="import"}><ha-icon icon="mdi:file-import-outline"></ha-icon>${this.t("planner.import")}</button>`:u}
            <button role="menuitem" @click=${()=>this.dialog="shortcuts"}><ha-icon icon="mdi:keyboard-outline"></ha-icon>${this.t("planner.shortcuts")} (?)</button>
          </div>
        </details>
      </div>
      ${this.admin?u:i`<p class="readonly-note">${this.t("common.admin_only")}</p>`}
    `}renderStepper(){if(this.mode==="plant"){let s=this.draft.zones.find(a=>a.id===this.focusZone);return i`<nav class="stepper" aria-label=${this.t("nav.planner")}>
        <span class="step active"><ha-icon icon="mdi:sprout"></ha-icon>
          <span class="txt"><b>${this.t("planner.step.plant")} · ${this.t("common.season",{year:this.season})}</b>
          <span class="xs muted">${this.t("layout.planting_on",{season:this.season})}</span></span></span>
        <span class="spacer"></span>
        <span class="crumbs" aria-label=${this.t("planner.zone_map")}>
          <button class="chip ${s?"":"ok"}" @click=${()=>this.closeZone()}><ha-icon icon="mdi:home-outline"></ha-icon>${this.t("planner.whole_garden")}</button>
          ${s?i`<span aria-hidden="true">›</span><span class="chip ok">${he[s.type]?.icon??""} ${s.name}</span>`:u}
        </span>
      </nav>`}let e=[["site","mdi:vector-square","planner.step.site"],["zones","mdi:texture-box","planner.step.zones"]],t=this.draft.zones.find(s=>s.id===this.focusZone);return i`<nav class="stepper" aria-label=${this.t("planner.steps")}>
      ${e.map(([s,a,n],r)=>i`
        <button class="step ${this.step===s?"active":""}" aria-current=${this.step===s?"step":u}
          @click=${()=>{this.step=s,this.tool=null}}>
          <span class="num">${r+1}</span><ha-icon icon=${a}></ha-icon>
          <span class="txt"><b>${this.t(n)}</b><span class="xs muted">${this.t(`${n}.hint`)}</span></span>
        </button>${r<e.length-1?i`<span class="step-sep" aria-hidden="true">›</span>`:u}`)}
      <span class="spacer"></span>
      <span class="crumbs" aria-label=${this.t("planner.zone_map")}>
        <button class="chip ${t?"":"ok"}" @click=${()=>this.closeZone()}><ha-icon icon="mdi:home-outline"></ha-icon>${this.t("planner.whole_garden")}</button>
        ${t?i`<span aria-hidden="true">›</span><span class="chip ok">${he[t.type]?.icon??""} ${t.name}</span>`:u}
      </span>
    </nav>`}renderToolButton(e,t,s,a=""){let n=this.tool&&this.tool.kind===e.kind&&("type"in e?this.tool.type===e.type:this.tool.bedKind===e.bedKind);return i`<button class="tool ${n?"active":""}" aria-pressed=${String(!!n)} title=${a||s} ?disabled=${!this.admin}
      @click=${()=>this.tool=n?null:e}>
      <span class="tool-icon">${t}</span><span class="tool-label">${s}</span></button>`}renderFeatureGroups(){return i`${nn.map(([e,t])=>i`
      <h4>${this.t(`planner.elements.${e}`)}</h4>
      <div class="tool-grid">
        ${t.map(s=>this.renderToolButton({kind:"feature",type:s},Qe[s]?.icon||"\u25AD",this.t(`feature.${s}`)))}
      </div>`)}`}renderSitePane(){return i`<aside class="pane" aria-label=${this.t("planner.step.site")}>
      <header><h3>${this.t("planner.step.site")}</h3><hl-info term="zones" .t=${this.t}></hl-info></header>
      <div class="pane-body stack">
        <p class="small muted">${this.t("planner.site_intro")}</p>
        <h4>${this.t("planner.zones")}</h4>
        <div class="tool-grid">
          ${Hs.map(e=>this.renderToolButton({kind:"zone",type:e},he[e].icon,this.t(`settings.zone_type.${e}`),this.t(`zone_hint.${e}`)))}
        </div>
        ${this.renderFeatureGroups()}
        <div class="divider"></div>
        <h4>${this.t("planner.your_zones")} (${this.draft.zones.length})</h4>
        ${this.draft.zones.length?i`<div class="stack" style="gap:6px">${this.draft.zones.map(e=>i`
          <div class="zone-row"><span>${he[e.type]?.icon}</span>
            <span class="grow"><b>${e.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${e.type}`)} · ${(e.width_cm/100).toFixed(1)} × ${(e.length_cm/100).toFixed(1)} m</span></span>
            <button class="btn small ghost" @click=${()=>this.openZone(e.id)}>${this.t("planner.open_zone")}</button></div>`)}</div>`:i`<p class="xs muted">${this.t("planner.no_zones")}</p>`}
        ${this.draft.zones.length?i`<button class="btn primary" @click=${()=>{this.step="zones",this.tool=null}}>${this.t("planner.next")}: ${this.t("planner.step.zones")} ›</button>`:u}
      </div>
    </aside>`}renderZonesPane(){let e=this.draft.zones.find(a=>a.id===this.focusZone);if(!e)return i`<aside class="pane" aria-label=${this.t("planner.step.zones")}>
        <header><h3>${this.t("planner.step.zones")}</h3></header>
        <div class="pane-body stack">
          <p class="small muted">${this.t("planner.zones_intro")}</p>
          ${this.draft.zones.map(a=>{let n=this.draft.beds.filter(l=>l.zone_id===a.id),r=this.seasonPlantings.filter(l=>n.some(d=>d.id===l.bed_id)).length;return i`<button class="zone-card" style=${`border-left-color:${he[a.type]?.stroke}`} @click=${()=>this.openZone(a.id)}>
              <span class="big">${he[a.type]?.icon}</span>
              <span class="grow"><b>${a.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${a.type}`)} ·
                ${this.t("planner.n_beds",{n:n.length})} · ${this.t("planner.count",{n:r})}</span></span>
              <ha-icon icon="mdi:chevron-right"></ha-icon></button>`})}
          ${this.draft.zones.length?u:i`<button class="btn" @click=${()=>this.step="site"}>‹ ${this.t("planner.step.site")}</button>`}
        </div>
      </aside>`;let t=this.draft.beds.filter(a=>a.zone_id===e.id),s=!this.admin;return i`<aside class="pane" aria-label=${e.name}>
      <header><button class="icon-btn" aria-label=${this.t("planner.whole_garden")} @click=${()=>this.closeZone()}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <h3>${he[e.type]?.icon} ${e.name}</h3></header>
      <div class="pane-body stack">
        <label class="field">${this.t("planner.zone_name")}<input .value=${e.name} ?disabled=${s}
          @change=${a=>this.updateZone(e.id,{name:a.target.value})} /></label>
        <label class="field">${this.t("planner.kind")}
          <select ?disabled=${s} @change=${a=>this.updateZone(e.id,{type:a.target.value})}>
            ${Hs.map(a=>i`<option value=${a} ?selected=${e.type===a}>${this.t(`settings.zone_type.${a}`)}</option>`)}
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
        <div class="stack" style="gap:4px">${t.map(a=>i`<button class="zone-row as-btn" @click=${()=>this.onSelect({kind:"bed",id:a.id})}>
          <span>▭</span><span class="grow"><b>${a.name}</b> <span class="xs muted">${(a.width_cm/100).toFixed(1)} × ${(a.length_cm/100).toFixed(1)} m · ${this.t(`kind.${a.kind}`)}</span></span></button>`)}</div>
        <div class="divider"></div>
        <div class="row wrap">
          <button class="btn primary" @click=${()=>this.go("planner")}><ha-icon icon="mdi:sprout"></ha-icon>${this.t("layout.to_planner")}</button>
        </div>
      </div>
    </aside>`}go(e){this.dispatchEvent(new CustomEvent("navigate",{detail:e,bubbles:!0,composed:!0}))}updateZone(e,t){let s=F(this.draft),a=s.zones.find(n=>n.id===e);a&&(Object.assign(a,t),this.commit(s))}renderPalette(){let e=this.search.trim().toLowerCase(),t=this.draft.zones.find(r=>r.id===this.focusZone),s=t?Ca[t.type]:null,a=this.plants.filter(r=>s&&!this.categoryFilter&&!s.includes(r.category??"vegetable")||this.familyFilter&&r.family!==this.familyFilter||this.categoryFilter&&(r.category??"vegetable")!==this.categoryFilter?!1:e?[r.id,r.scientific_name,...Object.values(r.names)].some(l=>l.toLowerCase().includes(e)):!0).sort((r,l)=>w(r,this.lang).localeCompare(w(l,this.lang))),n=[...new Set(this.plants.map(r=>r.family))].sort();return i`
      <aside class="pane" aria-label=${this.t("planner.palette")}>
        <header>
          <h3>${this.t("planner.palette")}</h3>
          <span class="spacer"></span>
          <div class="segmented" role="group" aria-label=${this.t("planner.layout")}>
            ${["single","block","row"].map(r=>i`
              <button aria-pressed=${String(this.layoutMode===r)} @click=${()=>this.layoutMode=r}>${this.t(`planner.layout.${r}`)}</button>`)}
          </div>
        </header>
        <div class="pane-body stack">
          <input type="search" placeholder=${this.t("common.search")} aria-label=${this.t("common.search")} .value=${this.search}
            @input=${r=>this.search=r.target.value} />
          <div class="row wrap family-chips" role="group" aria-label=${this.t("lib.category")}>
            ${ui.map(r=>i`<button class="chip" aria-pressed=${String(this.categoryFilter===r)}
              @click=${()=>this.categoryFilter=this.categoryFilter===r?"":r}>${this.t(`category.${r}`)}</button>`)}
          </div>
          <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
            <select @change=${r=>this.familyFilter=r.target.value}>
              <option value="" ?selected=${!this.familyFilter}>${this.t("lib.family")}: ${this.t("common.all")}</option>
              ${n.map(r=>i`<option value=${r} ?selected=${this.familyFilter===r}>${this.families[r]?.[this.lang]??r}</option>`)}
            </select></label>
          ${t?i`<p class="xs zone-filter">${he[t.type]?.icon} ${this.t("planner.palette_for_zone",{zone:t.name})}</p>`:u}
          <p class="xs muted">${this.t("planner.palette_hint")}</p>
          <div class="palette-list" role="list">
            ${a.map(r=>{let l=w(r,this.lang);return i`
                <button class="plant-card" role="listitem" aria-label=${`${l}, ${r.scientific_name}`}
                  @pointerdown=${d=>this.onPalettePointerDown(d,r)}
                  @pointermove=${this.onPalettePointerMove}
                  @pointerup=${this.onPalettePointerUp}
                  @pointercancel=${()=>this.paletteDrag=null}
                  @keydown=${d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),this.addToSelectedBed(r))}}>
                  <span class="swatch" style=${`border-color:${j(this.families,r.family)}`}>${H(I(r),r.color||j(this.families,r.family),26)}</span>
                  <span class="meta"><span>${l}${r.perennial?i` <span class="perennial-tag" title=${this.t("planner.perennial")}>∞</span>`:u}</span>
                    <span class="xs muted">${r.spacing_cm} cm · ${r.perennial&&r.years_to_bearing?this.t("planner.bears_after",{n:r.years_to_bearing}):`${r.days_to_maturity[0]}\u2013${r.days_to_maturity[1]} d`}</span></span>
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
            ${n.map(r=>i`<span><span class="family-dot" style=${`background:${j(this.families,r)}`}></span>${this.families[r]?.[this.lang]??r}</span>`)}
          </div>
          </div>
        </div>
      </aside>
    `}findingParams(e){let t={...e.params};for(let[s,a]of[[e.a,"a"],[e.b,"b"]]){let n=this.draft.plantings.find(r=>r.id===s);n&&n.season!==this.season&&!this.plantMap.get(n.plant_id)?.perennial&&typeof t[a]=="string"&&(t[a]=this.t("planner.other_season",{name:t[a],year:n.season}))}return t}renderFindings(e,t){let s=this.reports[e]??this.snapshot.analysis?.beds[e]?.compatibility,a=this.reports[e]?.rotation??this.snapshot.analysis?.beds[e]?.rotation??[],n=(s?.pairs??[]).filter(g=>!t||g.a===t||g.b===t),r=a.filter(g=>!t||g.planting===t),l=(s?.placement??[]).filter(g=>!t||g.planting===t),d=t?s?.out_of_bounds?.includes(t):(s?.out_of_bounds?.length??0)>0,c={error:"mdi:alert-octagon-outline",warning:"mdi:alert-outline",info:"mdi:heart-outline"};return!n.length&&!r.length&&!d&&!l.length?i`<p class="small muted">${this.t("planner.no_warnings")}</p>`:i`<div class="stack" style="gap:6px">
      ${n.map(g=>i`<div class="finding ${g.severity}"><ha-icon icon=${c[g.severity]}></ha-icon><span>${this.t(g.key,this.findingParams(g))}</span></div>`)}
      ${r.map(g=>i`<div class="finding ${g.severity}"><ha-icon icon="mdi:rotate-3d-variant"></ha-icon><span>${this.t(g.key,g.params)}
        <hl-info term="rotation" .t=${this.t}></hl-info>
        ${g.alternatives?.length?i`<br /><span class="xs">${this.t("planner.alternatives")}:
          ${g.alternatives.map(v=>i`<button class="chip" ?disabled=${!this.admin} @click=${()=>this.moveToBed(g.planting,v)}>${this.draft.beds.find($=>$.id===v)?.name??v}</button>`)}</span>`:u}</span></div>`)}
      ${t&&s?.suggestions?.[t]?.length?i`<div class="finding info"><ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
        <span>${this.t("planner.better_neighbours")}: ${s.suggestions[t].map(g=>w(this.plantMap.get(g),this.lang)).join(", ")}</span></div>`:u}
      ${l.map(g=>i`<div class="finding warning"><ha-icon icon="mdi:greenhouse"></ha-icon><span>${this.t(g.key,g.params)}</span></div>`)}
      ${d?i`<div class="finding warning"><ha-icon icon="mdi:border-outside"></ha-icon><span>${this.t("planner.out_of_bounds")}</span></div>`:u}
    </div>`}renderTimeline(e){if(!e)return i`<p class="small muted">–</p>`;let s=this.snapshot.settings.region.hemisphere==="south"?`${this.season}-07-01`:`${this.season}-01-01`,a=485,n=c=>c?Math.max(0,Math.min(100,je(s,c)/a*100)):null,r=(c,g,v,$,T)=>{let k=n(c),M=n(g);return k===null||M===null?u:i`<div class="bar" title=${`${T}: ${x(c,this.lang)} \u2013 ${x(g,this.lang)}`}
        style=${`left:${k}%;width:${Math.max(M-k,1)}%;top:${v}px;background:${$}`}></div>`},l=Array.from({length:16},(c,g)=>D(s,Math.round(g*30.4))),d=this.snapshot.analysis?.today;return i`
      <div class="timeline" role="img" aria-label=${`${this.t("lib.harvest")} ${x(e.harvest_start,this.lang)} \u2013 ${x(e.harvest_end,this.lang)}`}>
        ${r(e.sow_window?.start,e.sow_window?.end,6,"var(--hl-leaf-300)",this.t(e.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow"))}
        ${r(e.transplant_window?.start,e.transplant_window?.end,20,"var(--hl-leaf-600)",this.t("lib.transplant"))}
        ${r(e.in_ground,e.harvest_start,34,"color-mix(in srgb, var(--hl-leaf-500) 35%, transparent)",this.t("dash.active_crops",{n:1}))}
        ${r(e.harvest_start,e.harvest_end,34,"var(--hl-sun-500)",this.t("lib.harvest"))}
        ${l.filter((c,g)=>g%2===0).map(c=>i`<span class="month" style=${`left:${n(c)}%`}>${x(c,this.lang,{month:"short"})}</span>`)}
        ${d&&n(d)!==null?i`<div class="today" style=${`left:${n(d)}%`}></div>`:u}
      </div>
      <div class="xs muted" style="margin-top:4px">
        ${e.sow_date?i`${this.t(e.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}: <b>${x(e.sow_date,this.lang)}</b> · `:u}
        ${e.transplant_date?i`${this.t("lib.transplant")}: <b>${x(e.transplant_date,this.lang)}</b> · `:u}
        ${this.t("lib.harvest")}: <b>${x(e.harvest_start,this.lang)} – ${x(e.harvest_end,this.lang)}</b>
      </div>`}renderPhenology(e){let t=this.snapshot.analysis?.phenology?.[e];return!t||t.stage==="not_planted"?u:i`<div class="row wrap">
      <span class="chip ok"><ha-icon icon="mdi:sprout"></ha-icon>${this.t(`stage.${t.stage}`)}</span>
      <span class="chip">Kc ${t.kc.toFixed(2)} <hl-info term="kc" .t=${this.t}></hl-info></span>
      ${t.gdd!=null&&t.gdd_target?i`<span class="chip">${Math.round(t.gdd)} / ${t.gdd_target} GDD <hl-info term="gdd" .t=${this.t}></hl-info></span>`:u}
      ${t.harvest_estimate?i`<span class="chip warn"><ha-icon icon="mdi:basket-outline"></ha-icon>${this.t("cal.harvest_estimate",{date:x(t.harvest_estimate,this.lang)})}</span>`:u}
      ${t.heat_stress_days?i`<span class="chip bad">${this.t("planner.heat_stress",{n:t.heat_stress_days})}</span>`:u}
    </div>`}renderSkipped(e){if(!e.skipped.length)return u;let t=e.skipped.filter(a=>a.reason==="too_late").length,s=a=>{let n=this.plantMap.get(a);return n?H(I(n),n.color||j(this.families,n.family),22):u};return i`
      ${t>=Math.max(2,e.skipped.length/2)?i`<div class="finding warning"><ha-icon icon="mdi:calendar-alert"></ha-icon>
        <span>${this.t("autofill.mostly_late",{season:e.season,next:e.season+1,n:t})}
        <button class="btn small" @click=${()=>{this.autofillSeason=e.season+1,this.runAutofill()}}>${this.t("autofill.fill_next",{season:e.season+1})}</button></span></div>`:u}
      <details class="skipped" ?open=${e.skipped.length<=6}>
        <summary class="small"><b>${this.t("autofill.skipped")} (${e.skipped.length})</b> – ${this.t("autofill.skipped_why")}</summary>
        <ul class="why">${e.skipped.map(a=>{let n=a.beds&&Object.keys(a.beds).length?sn(a.beds,this.t,this.lang,this.plantMap):[this.t(`reason.${a.reason}`)];return i`<li>${s(a.plant_id)}<span><b>${w(this.plantMap.get(a.plant_id),this.lang)}</b><br />
            <span class="xs">${n.slice(0,3).join(" \xB7 ")}</span></span></li>`})}</ul>
      </details>`}renderAutofill(){let e=this.autofillResources,t=l=>this.autofillResources={...e,...l},s=this.autofill,a=[...this.plants].sort((l,d)=>w(l,this.lang).localeCompare(w(d,this.lang))),n=()=>this.dialog=null,r=l=>this.draft.beds.find(d=>d.id===l)?.name??l;return i`<div class="stack">
      <h2><ha-icon icon="mdi:auto-fix"></ha-icon> ${this.t("autofill.title")} <hl-info term="autofill" .t=${this.t}></hl-info></h2>
      <label class="row small">${this.t("planner.season")}
        <select style="width:auto" @change=${l=>{this.autofillSeason=Number(l.target.value),this.autofill=null}}>
          ${[this.season,this.season+1].map(l=>i`<option value=${l} ?selected=${l===(this.autofillSeason||this.season)}>${this.t("common.season",{year:l})}${Ie(this.snapshot,l)?"":` \xB7 ${this.t("layout.no_plan")}`}</option>`)}
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
        ${ci.map(l=>i`<button class="chip" aria-pressed=${String(e.goals.includes(l))}
          @click=${()=>t({goals:e.goals.includes(l)?e.goals.filter(d=>d!==l):[...e.goals,l]})}>${this.t(`autofill.goal.${l}`)}</button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("autofill.wanted")}
          <select @change=${l=>{let d=l.target;d.value&&!e.wanted.includes(d.value)&&t({wanted:[...e.wanted,d.value]}),d.value=""}}>
            <option value="">+</option>${a.map(l=>i`<option value=${l.id}>${w(l,this.lang)}</option>`)}</select></label>
        <label class="field">${this.t("autofill.excluded")}
          <select @change=${l=>{let d=l.target;d.value&&!e.excluded.includes(d.value)&&t({excluded:[...e.excluded,d.value]}),d.value=""}}>
            <option value="">+</option>${a.map(l=>i`<option value=${l.id}>${w(l,this.lang)}</option>`)}</select></label>
      </div>
      <div class="row wrap">
        ${e.wanted.map(l=>i`<button class="chip ok" title=${this.t("common.delete")} @click=${()=>t({wanted:e.wanted.filter(d=>d!==l)})}>♥ ${w(this.plantMap.get(l),this.lang)} ✕</button>`)}
        ${e.excluded.map(l=>i`<button class="chip bad" title=${this.t("common.delete")} @click=${()=>t({excluded:e.excluded.filter(d=>d!==l)})}>⊘ ${w(this.plantMap.get(l),this.lang)} ✕</button>`)}
      </div>
      <fieldset class="prefs"><legend>${this.t("autofill.prefs")}</legend>
        <label class="field">${this.t("autofill.freedom")}
          <select @change=${l=>t({freedom:l.target.value})}>
            ${["strict","balanced","free"].map(l=>i`<option value=${l} ?selected=${(e.freedom??"balanced")===l}>${this.t(`autofill.freedom.${l}`)}</option>`)}
          </select></label>
        ${["respect_companions","add_pollinators","year_round","allow_perennials","match_zone_type"].map(l=>i`
          <label class="row small"><input type="checkbox" .checked=${e[l]??!["year_round"].includes(l)}
            @change=${d=>t({[l]:d.target.checked})} />${this.t(`autofill.pref.${l}`)}</label>`)}
      </fieldset>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.beds")}><span class="small">${this.t("autofill.beds")}:</span>
        ${this.draft.beds.map(l=>i`<button class="chip" aria-pressed=${String(this.autofillBeds.includes(l.id))}
          @click=${()=>this.autofillBeds=this.autofillBeds.includes(l.id)?this.autofillBeds.filter(d=>d!==l.id):[...this.autofillBeds,l.id]}>${l.name}</button>`)}
        <span class="xs muted">${this.autofillBeds.length?"":this.t("autofill.all_empty")}</span>
      </div>
      <label class="row small"><input type="checkbox" .checked=${this.autofillReplace} @change=${l=>this.autofillReplace=l.target.checked} />${this.t("autofill.replace")}</label>
      <div class="row"><button class="btn" ?disabled=${this.autofillBusy} @click=${()=>this.runAutofill()}><ha-icon icon="mdi:creation"></ha-icon>${this.t("autofill.propose")}</button></div>
      ${s?i`
        <div class="divider"></div>
        <div class="row wrap">
          <span class="chip ok">${this.t("autofill.sum_crops",{n:s.summary.crops})}</span>
          <span class="chip">${this.t("autofill.sum_yield",{kg:s.summary.yield_kg})}</span>
          <span class="chip">${this.t("autofill.sum_time",{min:s.summary.minutes_week})}</span>
          <span class="chip">${this.t("autofill.sum_water",{l:s.summary.water_l_week})}</span>
          <span class="chip">${this.t("autofill.sum_compost",{kg:s.summary.compost_kg})}</span>
        </div>
        ${s.warnings.map(l=>i`<div class="finding warning"><ha-icon icon="mdi:alert-outline"></ha-icon><span>${this.t(l.key,{...l.params,plants:Array.isArray(l.params.plants)?l.params.plants.map(d=>w(this.plantMap.get(d),this.lang)).join(", "):l.params.plants})}</span></div>`)}
        <div style="max-height:30vh;overflow:auto"><table class="shortcuts" style="width:100%">
          <tr><th align="left">${this.t("lib.plant")}</th><th align="left">${this.t("task.bed")}</th><th align="right">#</th><th align="right">m²</th><th align="right">kg</th></tr>
          ${s.placements.map(l=>i`<tr><td><span class="family-dot" style=${`background:${j(this.families,this.plantMap.get(l.plant_id)?.family)}`}></span>
            ${w(this.plantMap.get(l.plant_id),this.lang)}${l.sowings>1?i` <span class="xs muted">×${l.sowings}</span>`:u}</td>
            <td>${r(l.bed_id)}</td><td align="right">${l.count}</td><td align="right">${l.area_m2.toFixed(1)}</td><td align="right">${l.yield_kg.toFixed(1)}</td></tr>`)}
        </table></div>
        ${this.renderSkipped(s)}
      `:u}
      <div class="row" style="justify-content:flex-end">
        <button class="btn ghost" @click=${n}>${this.t("common.cancel")}</button>
        <button class="btn primary" ?disabled=${!s?.plantings.length} @click=${()=>this.applyAutofill()}>${this.t("autofill.apply")}</button>
      </div>
    </div>`}renderSoilTests(e){let t=[...this.snapshot.beds.find(n=>n.id===e)?.soil_tests??[]].reverse(),s=this.soilForm,a=(n,r,l=.1)=>i`<label class="field">${r}
      <input type="number" step=${l} min="0" .value=${s?.[n]==null?"":String(s[n])}
        @input=${d=>{let c=d.target.value;this.soilForm={...this.soilForm,[n]:c===""?null:Number(c)}}} /></label>`;return i`<details class="tips" ?open=${!!s}><summary><ha-icon icon="mdi:test-tube"></ha-icon> ${this.t("soil_test.title")}
        ${t[0]?i`<span class="xs muted">· ${x(t[0].date,this.lang)}${t[0].ph!=null?` \xB7 pH ${t[0].ph}`:""}</span>`:u}</summary>
      ${t.length?i`<table class="soil"><thead><tr><th>${this.t("journal.day")}</th><th>pH</th><th>OM%</th><th>P</th><th>K</th><th></th></tr></thead><tbody>
        ${t.map(n=>i`<tr><td>${x(n.date,this.lang)}</td><td>${n.ph??"\u2013"}</td><td>${n.organic_matter_pct??"\u2013"}</td><td>${n.p_mg??"\u2013"}</td><td>${n.k_mg??"\u2013"}</td>
          <td>${this.admin?i`<button class="icon-btn" aria-label=${this.t("planner.remove")} @click=${()=>this.deleteSoil(e,n.date)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`:u}</td></tr>`)}
      </tbody></table>`:i`<p class="xs muted">${this.t("soil_test.none")}</p>`}
      ${this.admin?s?i`<div class="form-grid">
          <label class="field">${this.t("journal.day")}<hl-date-input .value=${s.date??""} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}
            @date-change=${n=>this.soilForm={...s,date:n.detail??""}}></hl-date-input></label>
          ${a("ph","pH")} ${a("organic_matter_pct",this.t("soil_test.om"))} ${a("n_mg","N (mg/100 g)",1)}
          ${a("p_mg","P (mg/100 g)",1)} ${a("k_mg","K (mg/100 g)",1)} ${a("mg_mg","Mg (mg/100 g)",1)}
          <label class="field">${this.t("soil_test.lime")}<select @change=${n=>this.soilForm={...s,lime_status:n.target.value||null}}>
            ${["","low","ok","high"].map(n=>i`<option value=${n} ?selected=${(s.lime_status??"")===n}>${n?this.t(`soil_test.lime.${n}`):"\u2013"}</option>`)}</select></label>
          <label class="field full">${this.t("task.notes")}<input .value=${s.notes??""} @input=${n=>this.soilForm={...s,notes:n.target.value}} /></label>
        </div>
        <div class="row"><button class="btn small primary" ?disabled=${!s.date} @click=${()=>this.saveSoil(e)}>${this.t("common.save")}</button>
          <button class="btn small ghost" @click=${()=>this.soilForm=null}>${this.t("common.cancel")}</button></div>
        <p class="xs muted">${this.t("soil_test.hint")}</p>`:i`<button class="btn small" @click=${()=>this.soilForm={date:new Date().toISOString().slice(0,10)}}><ha-icon icon="mdi:plus"></ha-icon>${this.t("soil_test.add")}</button>`:u}
    </details>`}async saveSoil(e){if(this.soilForm?.date)try{await this.api.saveSoilTest(e,this.soilForm),this.soilForm=null,this.toast(this.t("settings.saved"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async deleteSoil(e,t){try{await this.api.deleteSoilTest(e,t)}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderHarvestQuick(e){let s=(this.snapshot.harvest_log??[]).filter(r=>r.planting_id===e.id).reduce((r,l)=>r+l.kg,0),a=(this.snapshot.journal??[]).filter(r=>r.planting_id===e.id).slice(-3).reverse(),n=this.snapshot.plantings.some(r=>r.id===e.id);return i`<div class="stack" style="gap:6px">
      <h4><ha-icon icon="mdi:basket-outline"></ha-icon> ${this.t("journal.harvest")}${s?i` · ${s.toFixed(2)} kg`:u}</h4>
      ${this.admin&&n?i`<div class="row">
        <input type="number" min="0" step="0.05" style="width:90px" placeholder="kg" aria-label="kg" .value=${this.harvestKg}
          @input=${r=>this.harvestKg=r.target.value} />
        <button class="btn small" ?disabled=${!(Number(this.harvestKg)>0)} @click=${()=>this.logHarvest(e)}>${this.t("journal.log_harvest")}</button>
      </div>`:u}
      ${a.length?i`<ul class="notes">${a.map(r=>i`<li class="xs"><b>${x(r.at.slice(0,10),this.lang)}</b> ${r.text}
        ${r.photos.length?i`<ha-icon icon="mdi:camera-outline"></ha-icon>`:u}</li>`)}</ul>`:u}
    </div>`}async logHarvest(e){let t=Number(this.harvestKg);if(t>0)try{await this.api.logHarvest({planting_id:e.id,kg:t}),this.harvestKg="",this.toast(this.t("journal.harvest_saved"))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderInspector(){let e=this.selection,t=e?this.findItem(e):void 0,s=!this.admin||this.locked(e?.kind),a;if(!e||!t)a=i`<p class="small muted">${this.t("planner.nothing_selected")}</p><p class="xs muted">${this.t("planner.multi_hint")}</p>`;else if(this.multi.length>1)a=i`<h3>${this.t("planner.selected_n",{n:this.multi.length})}</h3>
        <p class="small muted">${this.t("planner.multi_hint")}</p>
        <div class="row wrap">
          ${["left","hcenter","right","top","vcenter","bottom","hdistribute","vdistribute"].map(n=>i`
            <button class="btn small" ?disabled=${s||n.endsWith("distribute")&&this.multi.length<3} @click=${()=>this.align(n)}>${this.t(`planner.align.${n}`)}</button>`)}
        </div>
        ${!s&&(e.kind==="planting"||e.kind==="feature")?i`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`:u}`;else if(e.kind==="feature"){let n=t;a=i`<h3>${n.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${n.name} ?disabled=${s}
            @change=${r=>this.updateSelected({name:r.target.value})} /></label>
          <label class="field full">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${r=>this.updateSelected({type:r.target.value})}>
              ${li.map(r=>i`<option value=${r} ?selected=${n.type===r}>${this.t(`feature.${r}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(n.width_cm)} ?disabled=${s}
            @change=${r=>this.updateSelected({width_cm:Number(r.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(n.length_cm)} ?disabled=${s}
            @change=${r=>this.updateSelected({length_cm:Number(r.target.value)})} /></label>
          <label class="field full">${this.t("task.notes")}<textarea rows="2" .value=${n.notes} ?disabled=${s}
            @change=${r=>this.updateSelected({notes:r.target.value})}></textarea></label>
        </div>
        ${s?u:i`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}`}else if(e.kind==="planting"){let n=t,r=this.plantMap.get(n.plant_id),l=this.draft.beds.find(c=>c.id===n.bed_id),d=this.snapshot.analysis?.advice[n.id];a=i`
        <div class="row">
          ${r?i`<hl-plant-image .plant=${r} color=${j(this.families,r.family)} lang=${this.lang} size="thumb"></hl-plant-image>`:i`<span class="family-dot" style="width:14px;height:14px"></span>`}
          <h3>${w(r,this.lang)}</h3>
        </div>
        <p class="xs muted">${r?.scientific_name} · ${this.families[r?.family??""]?.[this.lang]??r?.family} · ${l?.name}</p>
        <div class="row wrap">
          <button class="btn small" @click=${()=>this.explainHere(n)}><ha-icon icon="mdi:help-circle-outline"></ha-icon>${this.t("planner.why_here")}</button>
          <button class="btn small ghost" @click=${()=>this.emit("focus-crop",{planting_id:n.id,season:this.season})}><ha-icon icon="mdi:table"></ha-icon>${this.t("planner.to_crops")}</button>
          <button class="btn small ghost" @click=${()=>this.emit("open-plant",n.plant_id)}><ha-icon icon="mdi:sprout"></ha-icon>${this.t("planner.plant_info")}</button>
        </div>
        ${this.why?.plantingId===n.id?this.renderWhy(n):u}
        ${r?.perennial?i`<div class="finding info"><ha-icon icon="mdi:all-inclusive"></ha-icon><span>${this.t("planner.perennial_since",{season:n.season})}
          ${r.years_to_bearing?i`<br />${this.t("planner.bearing_from",{season:n.season+r.years_to_bearing})}`:u}</span></div>`:u}
        ${r?.pollination&&r.pollination!=="self"?i`<p class="xs"><ha-icon icon="mdi:bee"></ha-icon> ${this.t(`pollination.${r.pollination}`)}</p>`:u}
        <div class="form-grid">
          <label class="field">${this.t("planner.layout")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({layout:c.target.value})}>
              ${["single","block","row"].map(c=>i`<option value=${c} ?selected=${n.layout===c}>${this.t(`planner.layout.${c}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.status")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({status:c.target.value})}>
              ${["planned","sown_indoors","sown","transplanted","harvesting","finished","failed"].map(c=>i`<option value=${c} ?selected=${n.status===c}>${this.t(`status.${c}`)}</option>`)}
            </select></label>
          <label class="field full">${this.t("planner.method")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({method:c.target.value})}>
              ${["indoor_sow","direct_sow","transplant"].map(c=>i`<option value=${c} ?selected=${n.method===c}>${this.t(`planner.method.${c}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="5" step="5" .value=${String(Math.round(n.width_cm))} ?disabled=${s}
            @change=${c=>this.updateSelected({width_cm:Number(c.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="5" step="5" .value=${String(Math.round(n.length_cm))} ?disabled=${s}
            @change=${c=>this.updateSelected({length_cm:Number(c.target.value)})} /></label>
          <label class="field full">${this.t(n.method==="transplant"?"lib.transplant":n.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}
            <hl-date-input ?disabled=${s} .value=${(n.method==="transplant"?n.transplant_date:n.sow_date)??""} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}
              @date-change=${c=>this.updateSelected(n.method==="transplant"?{transplant_date:c.detail}:{sow_date:c.detail})}></hl-date-input></label>
        </div>
        <p class="small">${r?this.t("planner.count",{n:Va(n,r)}):""}</p>
        ${d?.reasons.length?i`<div class="stack" style="gap:4px">${d.reasons.filter(c=>c.key!=="reason.window_open").map(c=>i`<p class="small">${this.t(c.key,c.params)}</p>`)}</div>`:u}
        ${this.renderPhenology(n.id)}
        ${this.renderHarvestQuick(n)}
        <details class="note"><summary class="small"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon> ${this.t("note.title")}</summary>
          <hl-quick-note .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} plantingId=${n.id} ?admin=${this.admin}></hl-quick-note></details>
        <h4>${this.t("planner.timeline")}</h4>
        ${this.renderTimeline(this.timelines[n.id])}
        <h4>${this.t("planner.warnings")}</h4>
        ${this.renderFindings(n.bed_id,n.id)}
        ${r?.tips?.[this.lang]?.length||r?.tips?.en?.length?i`<details class="tips" open><summary>${this.t("planner.eco_tips")}</summary>
          <ul>${(r.tips[this.lang]??r.tips.en).map(c=>i`<li>${c}</li>`)}</ul></details>`:u}
        ${s?u:i`
          <div class="row wrap">
            <button class="btn small" @click=${()=>this.dialog="succession"}><ha-icon icon="mdi:calendar-multiple"></ha-icon>${this.t("planner.succession")}</button>
            <button class="btn small ghost" @click=${()=>this.duplicateSelected()}>${this.t("planner.duplicate")}</button>
            <button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>
          </div>`}
      `}else if(e.kind==="bed"){let n=t,r=this.snapshot.analysis?.beds[n.id],l=this.reports[n.id]??r?.compatibility;a=i`
        <h3>${n.name}</h3>
        ${this.mode==="plant"?this.renderBedHistory(n):u}
        ${this.mode==="plant"?i`<details class="note"><summary class="small"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon> ${this.t("note.title")}</summary>
          <hl-quick-note .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} bedId=${n.id} ?admin=${this.admin}></hl-quick-note></details>`:u}
        ${this.mode==="plant"&&(n.irrigation_entity||n.sensors?.soil_moisture)?i`<details class="water"><summary class="small">${this.t("water.per_bed")}</summary>
          <hl-water-chart .bed=${n} .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} days="14"></hl-water-chart></details>`:u}
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${n.name} ?disabled=${s}
            @change=${d=>this.updateSelected({name:d.target.value})} /></label>
          <label class="field">${this.t("planner.zone")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({zone_id:d.target.value})}>
              ${this.draft.zones.map(d=>i`<option value=${d.id} ?selected=${n.zone_id===d.id}>${d.name}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({kind:d.target.value})}>
              ${["in_ground","raised","container"].map(d=>i`<option value=${d} ?selected=${n.kind===d}>${this.t(`kind.${d}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(n.width_cm)} ?disabled=${s}
            @change=${d=>this.updateSelected({width_cm:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(n.length_cm)} ?disabled=${s}
            @change=${d=>this.updateSelected({length_cm:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.soil")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({soil:d.target.value})}>
              ${["sandy","loam","clay","silt","peat","chalk","potting_mix"].map(d=>i`<option value=${d} ?selected=${n.soil===d}>${this.t(`soil.${d}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.orientation")}<input type="number" min="0" max="359" step="15" .value=${String(n.orientation_deg)} ?disabled=${s}
            @change=${d=>this.updateSelected({orientation_deg:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(n.shade_pct??"")} ?disabled=${s}
            @change=${d=>this.updateSelected({shade_pct:d.target.value===""?null:Number(d.target.value)})} /></label>
        </div>
        ${r?i`
          <div class="row wrap">
            <span class="chip ${r.moisture_status==="optimal"?"ok":r.moisture_status==="dry"?"bad":r.moisture_status==="unknown"?"":"warn"}">
              <ha-icon icon="mdi:water-percent"></ha-icon>${this.t(`moisture.${r.moisture_status}`)}${r.irrigation.moisture!=null?` \xB7 ${Math.round(r.irrigation.moisture)}%`:""}</span>
            <span class="chip">${this.t(`irrigation.${r.irrigation.action}`,{mm:r.irrigation.amount_mm,liters:Math.round(r.irrigation.liters)})}</span>
          </div>`:u}
        <div class="row"><span class="score">${Math.round(l?.score??50)}</span><span class="small muted">${this.t("planner.score")}</span></div>
        ${this.renderFindings(n.id)}
        ${this.renderSoilTests(n.id)}
        ${s?u:i`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}
      `}else{let n=t;a=i`
        <h3>${n.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${n.name} ?disabled=${s}
            @change=${r=>this.updateSelected({name:r.target.value})} /></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${r=>this.updateSelected({type:r.target.value})}>
              ${Hs.map(r=>i`<option value=${r} ?selected=${n.type===r}>${this.t(`settings.zone_type.${r}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.wind")}
            <select ?disabled=${s} @change=${r=>this.updateSelected({wind:r.target.value},"microclimate")}>
              ${["sheltered","moderate","exposed"].map(r=>i`<option value=${r} ?selected=${n.microclimate.wind===r}>${this.t(`wind.${r}`)}</option>`)}
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
          ${n.type==="greenhouse"||n.type==="cold_frame"?i`<label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${!!n.microclimate.thermal_mass} ?disabled=${s}
            @change=${r=>this.updateSelected({thermal_mass:r.target.checked},"microclimate")} />${this.t("settings.thermal_mass")}</label>`:u}
        </div>
        <div class="row wrap">
          <button class="btn small" @click=${()=>this.openZone(n.id)}><ha-icon icon="mdi:map-search-outline"></ha-icon>${this.t("planner.open_zone")}</button>
          ${s?u:i`<button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>`}
        </div>
      `}return i`<div class="stack inspector-body">${a}</div>`}renderWhy(e){let t=this.why;if(t.error)return i`<p class="small bad-text">${t.error}</p>`;if(!t.result)return i`<p class="small muted">${this.t("common.loading")}</p>`;let s=t.result.beds.find(r=>r.bed_id===e.bed_id),a=t.result.beds.filter(r=>r.ok&&r.bed_id!==e.bed_id),n=r=>Ve(r,this.t,this.lang,this.plantMap);return i`<div class="why card-inset stack" style="gap:6px">
      ${s?i`<p class="small"><b>${s.ok?this.t("planner.why_ok",{bed:s.bed}):this.t("planner.why_not",{bed:s.bed})}</b></p>
        ${s.reasons.length?i`<ul class="small">${s.reasons.map(r=>i`<li>${n(r)}</li>`)}</ul>`:u}
        ${s.warnings.length?i`<ul class="small muted">${s.warnings.map(r=>i`<li>${n(r)}</li>`)}</ul>`:u}`:i`<p class="small">${this.t("planner.why_no_bed")}</p>`}
      <p class="xs muted">${a.length?this.t("planner.why_fits_in",{beds:a.map(r=>r.bed).join(", ")}):this.t("planner.why_fits_nowhere")}</p>
    </div>`}renderBedHistory(e){let t=Array.from({length:5},(n,r)=>this.season-4+r),s=n=>{let r=new Set;for(let l of this.snapshot.plantings){if(l.bed_id!==e.id||!Re(l,!1,n))continue;let d=this.plantMap.get(l.plant_id);d&&!d.perennial&&r.add(d.family)}for(let l of this.snapshot.rotation_history??[])l.bed_id===e.id&&l.season===n&&r.add(l.family);return[...r]},a=n=>this.families[n]?.[this.lang]??n;return i`<div class="rotation" role="table" aria-label=${this.t("planner.rotation_strip")}>
      <p class="xs muted">${this.t("planner.rotation_strip")}</p>
      <div class="rot-row">${t.map(n=>{let r=s(n);return i`<div class="rot-cell ${n===this.season?"now":""}" role="cell" title=${r.map(a).join(", ")||"\u2013"}>
          <b>${n}</b>
          <div class="rot-dots">${r.length?r.map(l=>i`<span class="family-dot" style=${`background:${j(this.families,l)}`}></span>`):i`<span class="xs muted">–</span>`}</div>
          <span class="xs">${r.map(a).join(", ")}</span>
        </div>`})}</div>
    </div>`}get lateInSeason(){let e=this.snapshot,t=e?.analysis?.today,s=e?.analysis?.anchors?.first_frost;return this.mode!=="plant"||this.lateDismissed||!t||!s?!1:this.season===e.analysis?.season&&je(t,s)<=45}loadStillPossible(){if(!this.lateInSeason||this.stillPossibleFor===this.season||!this.api)return;let e=this.season;this.stillPossibleFor=e,this.api.stillPossible(e).then(t=>this.stillPossible=t).catch(()=>{this.stillPossible={season:e,plants:[]},window.setTimeout(()=>{this.stillPossibleFor===e&&(this.stillPossibleFor=null,this.requestUpdate())},6e4)})}renderLateBanner(){if(!this.lateInSeason)return u;let e=this.stillPossible?.season===this.season?this.stillPossible.plants:null;return i`<div class="late-banner" role="status">
      <ha-icon icon="mdi:weather-snowy"></ha-icon>
      <div class="stack" style="gap:6px;flex:1">
        <b>${this.t("planner.late_title",{season:this.season})}</b>
        <span class="small">${e==null?this.t("common.loading"):e.length?this.t("planner.late_still",{n:e.length}):this.t("planner.late_none")}</span>
        ${e?.length?i`<div class="row wrap" style="gap:4px">${e.slice(0,16).map(t=>{let s=this.plantMap.get(t.plant_id);return s?i`<button class="chip" title=${this.t("planner.late_add_hint")} @click=${()=>this.addToSelectedBed(s)}>
            ${H(I(s),s.color||j(this.families,s.family),16)}${w(s,this.lang)}</button>`:u})}</div>`:u}
      </div>
      <button class="btn small primary" @click=${()=>this.setSeason(this.season+1)}>${this.t("planner.late_next",{season:this.season+1})}</button>
      <button class="icon-btn" aria-label=${this.t("common.close")} @click=${()=>this.lateDismissed=!0}>×</button>
    </div>`}renderDropWarning(){let e=this.dropWarning,t=e&&this.draft.plantings.find(s=>s.id===e.plantingId);return!e||!t?u:i`<div class="drop-warning" role="alert">
      <ha-icon icon="mdi:alert-outline"></ha-icon>
      <div class="stack" style="gap:2px;flex:1"><b>${this.t("planner.drop_bad",{plant:w(this.plantMap.get(t.plant_id),this.lang)})}</b>
        ${e.text.map(s=>i`<span class="small">${s}</span>`)}</div>
      <button class="btn small" @click=${()=>{this.selection={kind:"planting",id:t.id},this.popupOpen=!0,this.explainHere(t)}}>${this.t("planner.why_here")}</button>
      <button class="icon-btn" aria-label=${this.t("common.close")} @click=${()=>this.dropWarning=null}>×</button>
    </div>`}renderNoLayout(){let e=this.snapshot,t=e.layout_season??this.season,s=[...new Set([this.season-1,t,this.season+1])].filter(n=>n!==this.season&&Ie(e,n)),a=this.admin&&this.mode==="layout";return i`<section class="card stack no-layout" aria-live="polite">
      <h2><ha-icon icon="mdi:floor-plan"></ha-icon> ${this.t("layout.none_title",{season:this.season})}</h2>
      <p>${this.t(this.mode==="plant"?"layout.none_plant":"layout.none_intro",{season:this.season,live:t})}</p>
      <div class="row wrap">
        ${a?i`
          ${s.map(n=>i`<button class="btn primary" @click=${()=>this.startLayout(n)}><ha-icon icon="mdi:content-copy"></ha-icon>${this.t("layout.copy_from",{season:n})}</button>`)}
          <button class="btn" @click=${()=>this.startLayout(null)}><ha-icon icon="mdi:vector-square"></ha-icon>${this.t("layout.start_empty")}</button>`:i`<button class="btn primary" @click=${()=>this.go("layout")}><ha-icon icon="mdi:floor-plan"></ha-icon>${this.t("layout.make",{season:this.season})}</button>`}
        ${this.season===t+1?i`<button class="btn" @click=${()=>this.dialog="transition"}>
          <ha-icon icon="mdi:calendar-arrow-right"></ha-icon>${this.t("year.title",{from:t,to:this.season})}</button>`:u}
      </div>
      <p class="xs muted">${this.t("layout.none_hint")}</p>
    </section>`}renderPlans(e){let t=[...this.snapshot.archived_plans??[]].sort((r,l)=>l.season-r.season||(l.archived_at??"").localeCompare(r.archived_at??"")),s=[["empty","mdi:file-outline"],["zones","mdi:texture-box"],["zones_beds","mdi:view-grid-outline"]],a=async(r,l)=>{this.planBusy=!0;try{window.clearTimeout(this.saveTimer),this.saveState==="dirty"&&await this.save(),await r(),this.toast(l),this.saveState="saved",this.history=null,this.dialog=null}catch(d){this.toast(this.t("common.error",{message:d.message??String(d)}))}finally{this.planBusy=!1}},n=r=>{let l=r.elements.namedItem("old_name").value;confirm(this.t("plans.confirm_new",{season:this.season}))&&a(()=>this.api.newPlan(this.season,this.newPlanStart,l||void 0),this.t("plans.started",{season:this.season}))};return i`<div class="stack">
      <h2><ha-icon icon="mdi:file-tree-outline"></ha-icon> ${this.t("plans.title",{season:this.season})}</h2>
      <p class="small">${this.t("plans.intro")}</p>
      <form class="stack" @submit=${r=>{r.preventDefault(),n(r.target)}}>
        <h3>${this.t("plans.new")}</h3>
        <div class="stack" style="gap:6px">${s.map(([r,l])=>i`
          <label class="plan-start ${this.newPlanStart===r?"on":""}"><input type="radio" name="start" .checked=${this.newPlanStart===r}
            @change=${()=>this.newPlanStart=r} /><ha-icon icon=${l}></ha-icon>
            <span><b>${this.t(`plans.start.${r}`)}</b><br /><span class="xs muted">${this.t(`plans.start.${r}.hint`)}</span></span></label>`)}</div>
        <label class="field">${this.t("plans.old_name")}<input name="old_name" maxlength="80" placeholder=${this.t("plans.old_name_hint",{season:this.season})} /></label>
        <div class="row"><button class="btn primary" type="submit" ?disabled=${this.planBusy||!this.admin}><ha-icon icon="mdi:file-plus-outline"></ha-icon>${this.t("plans.start_button")}</button></div>
      </form>
      <div class="divider"></div>
      <h3>${this.t("plans.inactive")} (${t.length})</h3>
      ${t.length?i`<div class="stack" style="gap:6px">${t.map(r=>i`<div class="zone-row">
        <ha-icon icon="mdi:file-hidden"></ha-icon>
        <span class="grow"><b>${r.name}</b><br /><span class="xs muted">${this.t("common.season",{year:r.season})} ·
          ${this.t("plans.counts",{zones:r.zones,beds:r.beds,plantings:r.plantings})}${r.archived_at?` \xB7 ${x(r.archived_at.slice(0,10),this.lang)}`:""}</span></span>
        <button class="btn small ghost" aria-pressed=${String(this.comparePlan===r.id)}
          @click=${()=>this.comparePlan=this.comparePlan===r.id?"":r.id}><ha-icon icon="mdi:compare-horizontal"></ha-icon>${this.t("compare.button")}</button>
        <button class="btn small" ?disabled=${this.planBusy||!this.admin}
          @click=${()=>confirm(this.t("plans.confirm_activate",{name:r.name,season:r.season}))&&a(()=>this.api.activatePlan(r.id),this.t("plans.activated",{name:r.name}))}>${this.t("plans.activate")}</button>
        <button class="btn small ghost danger" ?disabled=${this.planBusy||!this.admin}
          @click=${()=>confirm(this.t("plans.confirm_delete",{name:r.name}))&&a(()=>this.api.deletePlan(r.id),this.t("plans.deleted",{name:r.name}))}>${this.t("common.delete")}</button>
      </div>`)}</div>`:i`<p class="small muted">${this.t("plans.none")}</p>`}
      ${this.comparePlan?i`<div class="divider"></div><h3>${this.t("compare.title")}</h3>
        <hl-plan-compare .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} .plants=${this.plantMap} .families=${this.families}
          left=${`p:${this.comparePlan}`} right=${`s:${this.season}`}></hl-plan-compare>`:u}
      <div class="row" style="justify-content:flex-end"><button class="btn" @click=${e}>${this.t("common.close")}</button></div>
    </div>`}onTransitionDone(e){let t=e.detail;this.dialog=null,this.toast(this.t(t.activated?"year.done":"year.prepared",{season:t.season,n:t.carried.length})+(t.skipped.length?` ${this.t("year.skipped",{n:t.skipped.length})}`:"")),this.seasonChosen=!0,this.season=t.season,this.saveState="saved",this.syncFromSnapshot(!0),this.dispatchEvent(new CustomEvent("season-changed",{detail:t.season,bubbles:!0,composed:!0}))}renderDialog(){if(this.removing){let s=this.removing,a=w(this.plantMap.get(s.plant_id),this.lang);return i`<dialog @close=${()=>this.removing=null}>
        <div class="stack">
          <h2><ha-icon icon="mdi:tree-outline"></ha-icon> ${this.t("planner.remove_perennial",{name:a})}</h2>
          <p class="small">${this.t("planner.remove_perennial_intro",{name:a,season:s.season})}</p>
          <button class="btn primary" @click=${()=>this.removePerennial("season")}>${this.t("planner.remove_from_season",{season:this.season})}</button>
          <p class="xs muted">${this.t("planner.remove_from_season_hint")}</p>
          <button class="btn danger" @click=${()=>this.removePerennial("delete")}>${this.t("planner.remove_everywhere")}</button>
          <p class="xs muted">${this.t("planner.remove_everywhere_hint")}</p>
          <div class="row" style="justify-content:flex-end"><button class="btn ghost" @click=${()=>this.removing=null}>${this.t("common.cancel")}</button></div>
        </div></dialog>`}if(!this.dialog)return u;let e=()=>this.dialog=null,t;if(this.dialog==="shortcuts"){let s=[["\u2190 \u2191 \u2192 \u2193","shortcut.move"],["Alt + \u2190 \u2191 \u2192 \u2193","planner.width"],["Ctrl + Z","shortcut.undo"],["Ctrl + Y","shortcut.redo"],["Delete","shortcut.delete"],["Ctrl + D","shortcut.duplicate"],["[ ]","shortcut.cycle"],["G","shortcut.grid"],["C","shortcut.companions"],["M","shortcut.moisture"],["+ / \u2212 / 0","shortcut.zoom"],["Esc","shortcut.escape"],["?","shortcut.help"]];t=i`<h2>${this.t("planner.shortcuts")}</h2>
        <table class="shortcuts">${s.map(([a,n])=>i`<tr><td><kbd>${a}</kbd></td><td>${this.t(n)}</td></tr>`)}</table>
        <div class="row" style="justify-content:flex-end"><button class="btn" @click=${e}>${this.t("common.close")}</button></div>`}else if(this.dialog==="plans")t=this.renderPlans(e);else if(this.dialog==="transition")t=i`<hl-year-transition .api=${this.api} .t=${this.t} .snapshot=${this.snapshot} .plants=${this.plants}
        .families=${this.families} lang=${this.lang} ?admin=${this.admin}
        .fromSeason=${this.snapshot.transition_due??this.snapshot.layout_season??null}
        @close=${e} @transition-done=${this.onTransitionDone}></hl-year-transition>`;else if(this.dialog==="autofill")t=this.renderAutofill();else if(this.dialog==="succession"){let s=this.selection?this.draft.plantings.find(n=>n.id===this.selection.id):void 0,a=s&&this.plantMap.get(s.plant_id);t=i`<form class="stack" @submit=${this.createSuccession}>
        <h2>${this.t("planner.succession")} – ${w(a,this.lang)}</h2>
        <label class="field">${this.t("planner.succession_count")}<input name="count" type="number" min="2" max="12" value="3" required /></label>
        <label class="field">${this.t("planner.succession_interval")}<input name="interval" type="number" min="3" max="90" .value=${String(a?.succession_interval_days??21)} /></label>
        <label class="field">${this.t("planner.succession_placement")}
          <select name="placement"><option value="split">${this.t("planner.succession.split")}</option><option value="stack">${this.t("planner.succession.stack")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${e}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.succession_create")}</button></div>
      </form>`}else t=i`<form class="stack" @submit=${this.importPlan}>
        <h2>${this.t("planner.import")}</h2>
        <input name="file" type="file" accept=".json,.yaml,.yml,application/json,application/yaml" required />
        <label class="field">${this.t("planner.import_mode")}
          <select name="mode"><option value="merge">${this.t("planner.import_merge")}</option><option value="replace">${this.t("planner.import_replace")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${e}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.import")}</button></div>
      </form>`;return i`<dialog @close=${e} style=${this.dialog==="autofill"||this.dialog==="transition"?"max-width:820px":""}>${t}</dialog>`}};P.styles=[L,S`
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
    `],p([m({attribute:!1})],P.prototype,"snapshot",2),p([m({attribute:!1})],P.prototype,"plants",2),p([m({attribute:!1})],P.prototype,"families",2),p([m({attribute:!1})],P.prototype,"api",2),p([m({attribute:!1})],P.prototype,"t",2),p([m()],P.prototype,"lang",2),p([m({type:Boolean})],P.prototype,"admin",2),p([m({type:Boolean})],P.prototype,"narrow",2),p([m({reflect:!0})],P.prototype,"mode",2),p([m({type:Number})],P.prototype,"transitionRequest",2),p([m({type:Number})],P.prototype,"initialSeason",2),p([m({attribute:!1})],P.prototype,"focusPlanting",2),p([f()],P.prototype,"why",2),p([f()],P.prototype,"dropWarning",2),p([f()],P.prototype,"stillPossible",2),p([f()],P.prototype,"lateDismissed",2),p([f()],P.prototype,"comparePlan",2),p([f()],P.prototype,"draft",2),p([f()],P.prototype,"selection",2),p([f()],P.prototype,"multi",2),p([f()],P.prototype,"showFeatures",2),p([f()],P.prototype,"showPlantings",2),p([f()],P.prototype,"showZones",2),p([f()],P.prototype,"categoryFilter",2),p([f()],P.prototype,"autofill",2),p([f()],P.prototype,"autofillBusy",2),p([f()],P.prototype,"autofillReplace",2),p([f()],P.prototype,"autofillBeds",2),p([f()],P.prototype,"autofillResources",2),p([f()],P.prototype,"autofillSeason",2),p([f()],P.prototype,"season",2),p([f()],P.prototype,"saveState",2),p([f()],P.prototype,"reports",2),p([f()],P.prototype,"extraTimelines",2),p([f()],P.prototype,"snapOn",2),p([f()],P.prototype,"showCompanions",2),p([f()],P.prototype,"showMoisture",2),p([f()],P.prototype,"showTemperature",2),p([f()],P.prototype,"viewDate",2),p([f()],P.prototype,"layoutMode",2),p([f()],P.prototype,"search",2),p([f()],P.prototype,"familyFilter",2),p([f()],P.prototype,"paletteDrag",2),p([f()],P.prototype,"ghostReport",2),p([f()],P.prototype,"dialog",2),p([f()],P.prototype,"newPlanStart",2),p([f()],P.prototype,"planBusy",2),p([f()],P.prototype,"popupOpen",2),p([f()],P.prototype,"announcement",2),p([f()],P.prototype,"paletteOpen",2),p([f()],P.prototype,"step",2),p([f()],P.prototype,"tool",2),p([f()],P.prototype,"focusZone",2),p([f()],P.prototype,"removing",2),p([f()],P.prototype,"soilForm",2),p([f()],P.prototype,"harvestKg",2),p([Pe("hl-garden-canvas")],P.prototype,"canvas",2),P=p([z("hl-planner-view")],P);var Ns=S`
  .cal { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1px; position: relative; height: 34px; }
  .cal .m { background: var(--hl-surface-2); font-size: 9px; color: var(--hl-text-muted); text-align: center; padding-top: 22px; }
  .cal .b { position: absolute; height: 5px; border-radius: 3px; }
`;function Bs(h,o,e,t){let s=o.analysis?.anchors??{last_frost:`${new Date().getFullYear()}-04-20`,first_frost:`${new Date().getFullYear()}-10-25`},a=s.last_frost,n=o.settings.region.hemisphere==="south"?`${a.slice(0,4)}-07-01`:`${a.slice(0,4)}-01-01`,r=v=>Math.max(0,Math.min(100,je(n,v)/365*100)),l=[],d=(v,$,T)=>{for(let k of v){let[M,R]=ks(k,s);l.push(i`<div class="b" style=${`left:${r(M)}%;width:${Math.max(r(R)-r(M),1)}%;top:${$}px;background:${T}`}></div>`)}};d(h.sowing.indoor_sow,2,"var(--hl-leaf-300)"),d(h.sowing.direct_sow,8,"var(--hl-leaf-500)"),d(h.sowing.transplant,14,"var(--hl-leaf-700)");let c=[...h.sowing.direct_sow,...h.sowing.transplant][0];if(c&&h.harvestable){let[v,$]=ks(c,s),T=h.maturity_from==="transplant"&&!h.sowing.transplant.length?h.germination_days[1]+14:0;l.push(i`<div class="b" style=${`left:${r(D(v,h.days_to_maturity[0]+T))}%;width:${Math.max(r(D($,h.days_to_maturity[1]+T+h.harvest_duration_days))-r(D(v,h.days_to_maturity[0]+T)),1)}%;top:20px;background:var(--hl-sun-500)`}></div>`)}let g=Array.from({length:12},(v,$)=>x(D(n,Math.round($*30.5+10)),e,{month:"narrow"}));return i`<div class="cal" role="img" aria-label=${t("lib.calendar")}>${g.map(v=>i`<div class="m">${v}</div>`)}${l}</div>`}var xe=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en"}pick(e){this.dispatchEvent(new CustomEvent("select-plant",{detail:e,bubbles:!0,composed:!0}))}renderMine(e){let t=(this.snapshot?.plantings??[]).filter(a=>a.plant_id===e.id);if(!t.length)return u;let s=new Map;for(let a of[{beds:this.snapshot.beds},...Object.values(this.snapshot.layouts??{})])for(let n of a.beds)s.set(n.id,n.name);return i`<section class="stack"><h3>${this.t("lib.in_garden")}</h3><div class="mine">
      ${t.sort((a,n)=>n.season-a.season).map(a=>i`<button class="chip" @click=${()=>this.dispatchEvent(new CustomEvent("focus-planting",{detail:{planting_id:a.id,season:a.season},bubbles:!0,composed:!0}))}>${a.season} · ${s.get(a.bed_id)??a.bed_id}</button>`)}
    </div></section>`}render(){let e=this.plant,t=this.lang,s=r=>{let l=new Map;for(let d of e.companions)d.relation===r&&l.set(d.plant,d.reason[t]??d.reason.en??"");for(let d of this.plants)for(let c of d.companions)c.plant===e.id&&c.relation===r&&!l.has(d.id)&&l.set(d.id,c.reason[t]??c.reason.en??"");return[...l.entries()]},a=r=>w(this.plants.find(l=>l.id===r),this.lang),n=(r,l)=>{let d=this.plants.find(c=>c.id===r);return i`<button class="chip ${l}" title=${this.t("lib.open_plant")} ?disabled=${!d} @click=${()=>d&&this.pick(d)}>
        ${d?H(I(d),d.color||j(this.families,d.family),16):u}${a(r)}</button>`};return i`
          <hl-plant-image .plant=${e} color=${j(this.families,e.family)} lang=${this.lang} size="hero" credit></hl-plant-image>
          ${Bs(e,this.snapshot,this.lang,this.t)}
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
            ${e.category?i`<span>${this.t("lib.category")}</span><span>${this.t(`category.${e.category}`)}${e.perennial?` \xB7 ${this.t("lib.perennial")}`:""}</span>`:u}
            ${e.height_cm?i`<span>${this.t("lib.height")}</span><span>${e.height_cm} cm · ${this.t("lib.roots")} ${e.root_depth_cm??"?"} cm</span>`:u}
            ${e.kc?i`<span>Kc <hl-info term="kc" .t=${this.t}></hl-info></span><span>${e.kc.map(r=>r.toFixed(2)).join(" \u2192 ")}</span>`:u}
            ${e.npk?i`<span>N · P · K <hl-info term="npk" .t=${this.t}></hl-info></span><span>${e.npk.join(" \xB7 ")} / 3</span>`:u}
            ${e.gdd_to_maturity?i`<span>${this.t("lib.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span>${e.gdd_to_maturity} °C·d (${this.t("lib.base")} ${e.gdd_base_c} °C)</span>`:u}
            ${e.plants_per_person?i`<span>${this.t("lib.per_person")}</span><span>${e.plants_per_person} · ${e.yield_kg_m2??"?"} kg/m²</span>`:u}
          </div>
          ${e.deters?.length||e.trap_for?.length||e.allelopathic||e.shade_tolerant?i`<div class="row wrap">
            ${(e.deters??[]).map(r=>i`<span class="chip ok" title=${this.t("lib.deters")}>🛡 ${kt(r,this.lang)}</span>`)}
            ${(e.trap_for??[]).map(r=>i`<span class="chip warn" title=${this.t("lib.trap_for")}>🪤 ${kt(r,this.lang)} <hl-info term="trap_crop" .t=${this.t}></hl-info></span>`)}
            ${e.allelopathic?i`<span class="chip bad">${this.t("lib.allelopathic")} <hl-info term="allelopathy" .t=${this.t}></hl-info></span>`:u}
            ${e.shade_tolerant?i`<span class="chip cold">${this.t("lib.shade_tolerant")}</span>`:u}
          </div>`:u}
          ${e.greenhouse.notes[t]?i`<p class="small">${e.greenhouse.notes[t]}</p>`:u}
          <section class="stack"><h3>${this.t("lib.friends")}</h3>
            ${s("friend").length?s("friend").map(([r,l])=>i`<div class="rel">${n(r,"ok")}<span class="muted">${l}</span></div>`):i`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.enemies")}</h3>
            ${s("enemy").length?s("enemy").map(([r,l])=>i`<div class="rel">${n(r,"bad")}<span class="muted">${l}</span></div>`):i`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.pests")} & ${this.t("lib.diseases")}</h3>
            <div class="row wrap">${e.pests.map(r=>i`<span class="chip warn">${kt(r,this.lang)}</span>`)}${e.diseases.map(r=>i`<span class="chip bad">${kt(r,this.lang)}</span>`)}</div></section>
          ${e.care.length||e.pruning_notes[t]?i`<section class="stack"><h3>${this.t("lib.care")}</h3>
            ${e.care.map(r=>i`<p class="small"><b>${this.t(`type.${r.task}`)}</b>${r.interval_days?` \xB7 \u21BB ${r.interval_days} d`:""} – ${r.notes[t]??r.notes.en??""}</p>`)}
            ${e.pruning_notes[t]?i`<p class="small">${e.pruning_notes[t]}</p>`:u}</section>`:u}
      ${this.renderMine(e)}
      ${this.renderPhotos(e)}`}renderPhotos(e){let t=this.snapshot?.journal??[],s=(this.snapshot?.plantings??[]).filter(a=>a.plant_id===e.id).map(a=>a.id);return t.some(a=>a.photos?.length&&(a.plant_id===e.id||a.planting_id&&s.includes(a.planting_id)))?i`<section class="stack"><h3>${this.t("photos.yours")}</h3>
      <hl-photo-timeline .journal=${t} .t=${this.t} lang=${this.lang} plantId=${e.id} .plantingIds=${s}></hl-photo-timeline></section>`:u}};xe.styles=[L,Ns,S`
      :host { display: flex; flex-direction: column; gap: var(--hl-s4); }
      .kv { display: grid; grid-template-columns: 1fr 1fr; gap: 6px var(--hl-s4); font-size: var(--hl-fs-sm); }
      .kv span:nth-child(odd) { color: var(--hl-text-muted); }
      .rel { display: flex; gap: var(--hl-s2); align-items: flex-start; font-size: var(--hl-fs-sm); }
      .rel .chip { display: inline-flex; align-items: center; gap: 4px; cursor: pointer; border: 0; font: inherit; }
      .grow { flex: 1; }
      .mine { display: flex; flex-wrap: wrap; gap: 6px; }
    `],p([m({attribute:!1})],xe.prototype,"plant",2),p([m({attribute:!1})],xe.prototype,"plants",2),p([m({attribute:!1})],xe.prototype,"families",2),p([m({attribute:!1})],xe.prototype,"snapshot",2),p([m({attribute:!1})],xe.prototype,"t",2),p([m()],xe.prototype,"lang",2),xe=p([z("hl-plant-detail")],xe);var mi={id:"",names:{en:"",nl:""},scientific_name:"",family:"Asteraceae",variety:null,habit:"bush",perennial:!1,spacing_cm:30,row_spacing_cm:30,sowing_depth_cm:1,germination_days:[7,14],min_soil_temp_c:8,optimal_soil_temp_c:18,max_soil_temp_c:null,days_to_maturity:[60,80],maturity_from:"sow",harvest_duration_days:14,harvestable:!0,continuous_harvest:!1,harvest_interval_days:null,transplant_age_days:[35,49],sowing:{indoor_sow:[],direct_sow:[{start_week:-2,end_week:8,anchor:"last_frost"}],transplant:[]},greenhouse:{suitability:"conditional",min_night_c:5,max_day_c:30,season_extension_weeks:2,notes:{}},frost_tolerance:"half_hardy",min_temp_c:0,max_temp_c:30,companions:[],rotation_years:3,pests:[],diseases:[],water_needs:"medium",nutrient_needs:"medium",feeding_interval_days:null,care:[],pruning_notes:{},thinning:!1,succession_interval_days:null,gdd_base_c:10,gdd_to_maturity:null,tags:[],source:"custom"},J=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.query="";this.family="";this.category="";this.filter="";this.selected=null;this.editing=null;this.error=""}filtered(){let e=this.query.trim().toLowerCase();return this.plants.filter(t=>!this.family||t.family===this.family).filter(t=>!this.category||(t.category??"vegetable")===this.category).filter(t=>this.filter!=="greenhouse"||t.greenhouse.suitability==="yes").filter(t=>this.filter!=="quick"||t.days_to_maturity[0]<=50).filter(t=>this.filter!=="custom"||t.source!=="builtin").filter(t=>!e||[t.id,t.scientific_name,t.family,this.families[t.family]?.[this.lang]??"",...Object.values(t.names)].some(s=>s.toLowerCase().includes(e))).sort((t,s)=>w(t,this.lang).localeCompare(w(s,this.lang)))}render(){let e=[...new Set(this.plants.map(t=>t.family))].sort();return i`
      <div class="top">
        <input type="search" placeholder=${this.t("lib.search")} aria-label=${this.t("lib.search")} .value=${this.query}
          @input=${t=>this.query=t.target.value} />
        <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
          <select style="width:auto" @change=${t=>this.family=t.target.value}>
            ${["",...e].map(t=>i`<option value=${t} ?selected=${t===this.family}>${t?this.families[t]?.[this.lang]??t:`${this.t("lib.family")}: ${this.t("common.all")}`}</option>`)}
          </select>
        </label>
        <label class="row small"><span class="visually-hidden">${this.t("lib.category")}</span>
          <select style="width:auto" @change=${t=>this.category=t.target.value}>
            ${["","vegetable","herb","fruit","flower"].map(t=>i`<option value=${t} ?selected=${t===this.category}>${t?this.t(`category.${t}`):`${this.t("lib.category")}: ${this.t("common.all")}`}</option>`)}
          </select>
        </label>
        <span class="small muted">${this.t("lib.count",{n:this.filtered().length})}</span>
        ${["greenhouse","quick","custom"].map(t=>i`
          <button class="chip" aria-pressed=${String(this.filter===t)} @click=${()=>this.filter=this.filter===t?"":t}>${this.t(`lib.filter_${t}`)}</button>`)}
        <span class="spacer"></span>
        ${this.admin?i`<button class="btn primary small" @click=${()=>this.editing={plant:structuredClone(mi),mode:"custom"}}>
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("lib.add_custom")}</button>`:u}
      </div>
      <div class="legend-row" aria-hidden="true">
        <span style="--c:var(--hl-leaf-300)">${this.t("lib.indoor_sow")}</span><span style="--c:var(--hl-leaf-500)">${this.t("lib.direct_sow")}</span>
        <span style="--c:var(--hl-leaf-700)">${this.t("lib.transplant")}</span><span style="--c:var(--hl-sun-500)">${this.t("lib.harvest")}</span>
      </div>
      <div class="grid" style="margin-top:12px">
        ${this.filtered().map(t=>i`
          <button class="pcard" @click=${()=>this.selected=t} aria-label=${w(t,this.lang)}>
            <div class="stripe" style=${`background:${j(this.families,t.family)}`}></div>
            <hl-plant-image .plant=${t} color=${j(this.families,t.family)} lang=${this.lang} size="card"></hl-plant-image>
            <div class="inner">
              <div class="row"><h3>${w(t,this.lang)}</h3><span class="spacer"></span>
                ${t.source!=="builtin"?i`<span class="chip warn">${this.t(`lib.source.${t.source}`)}</span>`:u}</div>
              <span class="xs muted"><i>${t.scientific_name}</i>${t.variety?` \xB7 ${t.variety}`:""}</span>
              <div class="facts">
                <span><b>${t.spacing_cm} cm</b>${this.t("lib.spacing")}</span>
                <span><b>${t.days_to_maturity[0]}–${t.days_to_maturity[1]}</b>${this.t("lib.maturity")}</span>
                <span><b>${this.t(`level.${t.water_needs}`)}</b>${this.t("lib.water")}</span>
              </div>
              ${Bs(t,this.snapshot,this.lang,this.t)}
            </div>
          </button>`)}
      </div>
      ${this.selected?this.renderDetail(this.selected):u}
      ${this.editing?this.renderEditor():u}
    `}renderDetail(e){let t=this.filtered(),s=t.findIndex(a=>a.id===e.id);return i`
      <hl-modal heading=${w(e,this.lang)} accent=${j(this.families,e.family)} nav ?has-prev=${s>0} ?has-next=${s>=0&&s<t.length-1}
        closeLabel=${this.t("common.close")} prevLabel=${this.t("common.previous")} nextLabel=${this.t("common.next")}
        @prev=${()=>this.selected=t[s-1]} @next=${()=>this.selected=t[s+1]}
        @closed=${()=>this.selected=null} @select-plant=${a=>this.showPlant(a.detail)}>
        <span slot="subheading" class="small muted"><i>${e.scientific_name}</i> · ${this.families[e.family]?.[this.lang]??e.family}</span>
        <hl-plant-detail .plant=${e} .plants=${this.plants} .families=${this.families} .snapshot=${this.snapshot} .t=${this.t} lang=${this.lang}></hl-plant-detail>
        ${this.admin?i`<div slot="actions" class="row">
          <button class="btn" @click=${()=>this.editing={plant:structuredClone(e),mode:e.source==="custom"?"custom":"override"}}>
            <ha-icon icon="mdi:pencil"></ha-icon>${this.t("lib.customize")}</button>
          ${e.source!=="builtin"?i`<button class="btn danger" @click=${()=>this.removePlant(e)}>${e.source==="override"?this.t("lib.reset"):this.t("common.delete")}</button>`:u}
        </div>`:u}
      </hl-modal>`}showPlant(e){this.selected=e,this.updateComplete.then(()=>this.renderRoot.querySelector("hl-modal")?.toTop())}async removePlant(e){try{await this.api.deletePlant(e.id),this.selected=null,this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0}))}catch(t){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t.message},bubbles:!0,composed:!0}))}}async save(e){e.preventDefault();let{plant:t,mode:s}=this.editing,a=e.target,n=v=>a.elements.namedItem(v).value,r=v=>Number(n(v)),l=v=>a.elements.namedItem(`${v}_on`).checked?[{start_week:r(`${v}_start`),end_week:r(`${v}_end`),anchor:"last_frost"}]:[],d=n("name_en").trim(),c={...t,id:s==="custom"&&!t.id?d.toLowerCase().normalize("NFKD").replace(/[^\w]+/g,"_").replace(/^_|_$/g,"")||"plant":t.id,names:{...t.names,en:d,nl:n("name_nl").trim()||d},scientific_name:n("scientific"),variety:n("variety")||null,family:n("family"),habit:n("habit"),spacing_cm:r("spacing"),row_spacing_cm:r("row_spacing"),sowing_depth_cm:r("depth"),germination_days:[r("germ_min"),r("germ_max")],min_soil_temp_c:r("soil_temp"),days_to_maturity:[r("dtm_min"),r("dtm_max")],maturity_from:n("maturity_from"),frost_tolerance:n("frost"),min_temp_c:r("min_temp"),max_temp_c:r("max_temp"),water_needs:n("water"),nutrient_needs:n("nutrients"),rotation_years:r("rotation"),greenhouse:{...t.greenhouse,suitability:n("gh")},sowing:{indoor_sow:l("indoor"),direct_sow:l("direct"),transplant:l("transplant")},pests:n("pests").split(",").map(v=>v.trim().replace(/\s+/g,"_")).filter(Boolean),diseases:n("diseases").split(",").map(v=>v.trim().replace(/\s+/g,"_")).filter(Boolean)},g=c;if(s==="override"){g={id:c.id};for(let v of Object.keys(c))v!=="source"&&JSON.stringify(c[v])!==JSON.stringify(t[v])&&(g[v]=c[v])}try{let v=await this.api.savePlant(g,s);this.editing=null,this.selected=v.plant,this.error="",this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("lib.saved",{plant:w(v.plant,this.lang)})},bubbles:!0,composed:!0}))}catch(v){this.error=v.message??String(v)}}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal()}renderEditor(){let{plant:e,mode:t}=this.editing,s=(n,r,l,d)=>i`
      <select name=${n}>${l.map(c=>i`<option value=${c} ?selected=${c===r}>${d?this.t(`${d}.${c}`):this.families[c]?.[this.lang]??c}</option>`)}</select>`,a=(n,r,l)=>i`
      <label class="row small"><input type="checkbox" name=${`${n}_on`} ?checked=${!!l} />${r}</label>
      <label class="field">${this.t("lib.from")} (${this.t("lib.weeks")})<input name=${`${n}_start`} type="number" min="-30" max="30" .value=${String(l?.start_week??-4)} /></label>
      <label class="field">${this.t("lib.to")} (${this.t("lib.weeks")})<input name=${`${n}_end`} type="number" min="-30" max="40" .value=${String(l?.end_week??2)} /></label>`;return i`<dialog @close=${()=>this.editing=null} style="border:none;border-radius:16px;padding:0;width:min(640px,calc(100vw - 32px));background:var(--hl-surface);color:var(--hl-text)">
      <form class="stack" style="padding:24px;max-height:85vh;overflow:auto" @submit=${this.save}>
        <h2>${t==="custom"&&!e.id?this.t("lib.add_custom"):`${this.t("lib.customize")}: ${w(e,this.lang)}`}</h2>
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
            ${a("indoor",this.t("lib.indoor_sow"),e.sowing.indoor_sow[0])}
            ${a("direct",this.t("lib.direct_sow"),e.sowing.direct_sow[0])}
            ${a("transplant",this.t("lib.transplant"),e.sowing.transplant[0])}
          </div>
        </fieldset>
        <label class="field">${this.t("lib.pests")}<input name="pests" .value=${e.pests.join(", ")} /></label>
        <label class="field">${this.t("lib.diseases")}<input name="diseases" .value=${e.diseases.join(", ")} /></label>
        ${this.error?i`<p class="field-error" role="alert">${this.error}</p>`:u}
        <div class="row" style="justify-content:flex-end">
          <button type="button" class="btn ghost" @click=${()=>this.editing=null}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("common.save")}</button>
        </div>
      </form>
    </dialog>`}};J.styles=[L,Ns,S`
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
    `],p([m({attribute:!1})],J.prototype,"snapshot",2),p([m({attribute:!1})],J.prototype,"plants",2),p([m({attribute:!1})],J.prototype,"families",2),p([m({attribute:!1})],J.prototype,"api",2),p([m({attribute:!1})],J.prototype,"t",2),p([m()],J.prototype,"lang",2),p([m({type:Boolean})],J.prototype,"admin",2),p([f()],J.prototype,"query",2),p([f()],J.prototype,"family",2),p([f()],J.prototype,"category",2),p([f()],J.prototype,"filter",2),p([f()],J.prototype,"selected",2),p([f()],J.prototype,"editing",2),p([f()],J.prototype,"error",2),J=p([z("hl-library-view")],J);var ie=class extends E{constructor(){super(...arguments);this.lang="en";this.plants=new Map;this.families={};this.mode="month";this.cursor="";this.showDone=!1;this.bedFilter="";this.year=null}async loadYear(){try{this.year=(await this.api?.records())?.year??null}catch{this.year=null}}renderYear(){let e=this.year;if(!e)return i`<p class="empty">${this.t("common.loading")}</p>`;let t=Array.from({length:12},(l,d)=>new Date(2026,d,1).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{month:"short"})),s=new Date().getMonth(),a=["harvest","plant","sow","sow_indoor","grow"],n=this.snapshot.beds.find(l=>l.id===this.bedFilter)?.name??"",r=e.rows.filter(l=>!this.bedFilter||l.beds.includes(n)).sort((l,d)=>w(this.plants.get(l.plant_id),this.lang).localeCompare(w(this.plants.get(d.plant_id),this.lang),this.lang));return i`<div class="card year-wrap"><table class="year">
      <thead><tr><th></th>${t.map((l,d)=>i`<th class=${d===s?"now":""}>${l}</th>`)}</tr></thead>
      <tbody>
        ${r.map(l=>{let d=this.plants.get(l.plant_id);return i`<tr><th scope="row"><button class="crop linklike" title=${this.t("lib.open_plant")} @click=${()=>this.emit("open-plant",l.plant_id)}>${d?H(I(d),d.color||j(this.families,d.family),20):u}
            ${w(d,this.lang)}</button><span class="xs muted">${l.beds.join(", ")}</span></th>
            ${t.map((c,g)=>{let v=l.months[String(g+1)]??[],$=a.find(T=>v.includes(T));return i`<td class=${`${$??""} ${g===s?"now":""}`} title=${v.map(T=>this.t(`cal.act.${T}`)).join(", ")}>
                ${$&&$!=="grow"?this.t(`cal.act_short.${$}`):""}</td>`})}</tr>`})}
        <tr class="tasks-row"><th scope="row">${this.t("cal.tasks_per_month")}</th>${e.tasks.map((l,d)=>i`<td class=${d===s?"now":""}>${l||""}
          ${e.minutes[d]?i`<span class="xs muted"> · ${this.t("cal.hours",{n:Math.max(1,Math.round(e.minutes[d]/60))})}</span>`:u}</td>`)}</tr>
      </tbody></table>
      <div class="legend year-legend">${a.map(l=>i`<span><i class=${`sw ${l}`}></i> ${this.t(`cal.act.${l}`)}</span>`)}</div>
    </div>`}willUpdate(){this.cursor||(this.cursor=this.today)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get today(){return this.snapshot.analysis?.today??lt(new Date)}get tasks(){return this.snapshot.tasks.filter(e=>(this.showDone||e.status==="open")&&e.status!=="skipped"&&(!this.bedFilter||e.bed_id===this.bedFilter))}byDay(){let e=new Map;for(let t of Xe(this.tasks)){let s=t.status==="open"&&t.due<this.today?this.today:t.due;e.set(s,[...e.get(s)??[],t])}return e}move(e){let t=ke(this.cursor);this.mode==="timeline"?t.setFullYear(t.getFullYear()+e):this.mode==="month"?t.setMonth(t.getMonth()+e,1):t.setDate(t.getDate()+e*(this.mode==="week"?7:30)),this.cursor=lt(t)}weekStart(e){let s=(ke(e).getDay()+6)%7;return D(e,-s)}renderEvent(e){let t=e.status==="open"&&e.due<this.today;return i`<button class="ev ${e.status!=="open"?"done":""} ${t?"overdue":""}" style=${`border-left-color:${ot[e.type]??"var(--hl-soil-500)"}`}
      title=${e.title} @click=${()=>this.emit("open-task",e)}>
      <ha-icon icon=${Ye[e.type]}></ha-icon><span>${e.title}</span></button>`}renderMonth(){let e=ke(this.cursor);e.setDate(1);let t=this.weekStart(lt(e)),s=e.getMonth(),a=Array.from({length:42},(l,d)=>D(t,d)),n=this.byDay(),r=Array.from({length:7},(l,d)=>x(D(t,d),this.lang,{weekday:"short"}));return i`<div class="month" role="grid">
      ${r.map(l=>i`<div class="dow" role="columnheader">${l}</div>`)}
      ${a.map(l=>{let d=n.get(l)??[];return i`<div class="cell ${ke(l).getMonth()!==s?"other":""} ${l===this.today?"today":""}" role="gridcell" aria-label=${x(l,this.lang,{day:"numeric",month:"long"})}>
          <span class="num">${ke(l).getDate()}</span>
          ${d.slice(0,4).map(c=>this.renderEvent(c))}
          ${d.length>4?i`<button class="more" @click=${()=>{this.cursor=l,this.mode="week"}}>+${d.length-4}</button>`:u}
        </div>`})}
    </div>`}renderWeek(){let e=this.weekStart(this.cursor),t=this.byDay();return i`<div class="week">
      ${Array.from({length:7},(s,a)=>D(e,a)).map(s=>i`
        <div class="col ${s===this.today?"today":""}">
          <b class="small">${x(s,this.lang,{weekday:"long",day:"numeric",month:"short"})}</b>
          ${(t.get(s)??[]).map(a=>this.renderEvent(a))}
        </div>`)}
    </div>`}renderList(){let e={t:this.t,lang:this.lang,today:this.today,onOpen:a=>this.emit("open-task",a),onComplete:a=>this.emit("complete-task",a),onPostpone:(a,n)=>this.emit("postpone-task",{task:a,days:n}),plantOf:as(this.snapshot,this.plants,this.families)},t=this.byDay(),s=[...t.keys()].filter(a=>a>=this.cursor).sort().slice(0,30);return s.length?i`${s.map(a=>i`<div class="group">
      <h3>${a===this.today?this.t("common.today"):x(a,this.lang,{weekday:"long",day:"numeric",month:"long"})}</h3>
      <ul class="tasks">${t.get(a).map(n=>Tt(n,e))}</ul></div>`)}`:i`<p class="empty">–</p>`}renderTimeline(){let e=this.snapshot.analysis;if(!e)return i`<p class="empty">–</p>`;let t=Number(this.cursor.slice(0,4))||e.season,s=this.snapshot.settings.region.hemisphere==="south",a=s?`${t}-07-01`:`${t}-01-01`,n=s?`${t+1}-06-30`:`${t}-12-31`,r=je(a,n)+1,l=k=>k?Math.max(0,Math.min(100,je(a,k)/r*100)):null,d=(k,M,R,_,A)=>{let Y=l(k),B=l(M);return Y===null||B===null||B<=0||Y>=100?u:i`<div class="g-bar ${R}" title=${A} style=${`left:${Y}%;width:${Math.max(B-Y,.6)}%;${_}`}></div>`},c=Array.from({length:12},(k,M)=>{let R=ke(a);return R.setMonth(R.getMonth()+M,1),lt(R)}),g=this.snapshot.plantings.filter(k=>k.season===t&&e.timelines[k.id]&&(!this.bedFilter||k.bed_id===this.bedFilter)),v=this.snapshot.beds.filter(k=>g.some(M=>M.bed_id===k.id)),$=this.snapshot.tasks.filter(k=>k.key?.startsWith("m:")&&k.due>=a&&k.due<=n&&(this.showDone||k.status==="open")),T=i`
      ${!e.anchors.frost_free&&l(e.anchors.last_frost)!==null?i`<div class="g-line" style=${`left:${l(e.anchors.last_frost)}%`} title=${this.t("cal.last_frost")}></div>`:u}
      ${!e.anchors.frost_free&&l(e.anchors.first_frost)!==null?i`<div class="g-line" style=${`left:${l(e.anchors.first_frost)}%`} title=${this.t("cal.first_frost")}></div>`:u}
      ${this.today>=a&&this.today<=n?i`<div class="g-line today" style=${`left:${l(this.today)}%`} title=${this.t("common.today")}></div>`:u}`;return i`<div class="gantt"><div class="gantt-inner" role="table" aria-label=${this.t("cal.timeline")}>
      <div class="g-row head" role="row"><div class="g-label">${this.t("common.season",{year:t})}</div>
        <div class="g-track">${c.map(k=>i`<span class="g-month" style=${`left:${l(k)}%`}>${x(k,this.lang,{month:"short"})}</span>`)}</div></div>
      ${$.length?i`<div class="g-row" role="row"><div class="g-label"><ha-icon icon="mdi:calendar-sync-outline"></ha-icon>${this.t("cal.garden_work")}</div>
        <div class="g-track">${T}${$.map(k=>i`<button class="g-task" style=${`left:${l(k.due)}%;color:${ot[k.type]??"var(--hl-soil-500)"}`}
          title=${`${x(k.due,this.lang)} \xB7 ${k.title}`} @click=${()=>this.emit("open-task",k)}><ha-icon icon=${Ye[k.type]}></ha-icon></button>`)}</div></div>`:u}
      ${v.map(k=>i`
        <div class="g-row bed" role="row"><div class="g-label">${k.name}</div><div class="g-track">${T}</div></div>
        ${g.filter(M=>M.bed_id===k.id).sort((M,R)=>e.timelines[M.id].in_ground<e.timelines[R.id].in_ground?-1:1).map(M=>{let R=e.timelines[M.id],_=this.plants.get(M.plant_id),A=j(this.families,_?.family),Y=w(_,this.lang),B=e.phenology?.[M.id];return i`<div class="g-row" role="row">
            <div class="g-label"><span class="family-dot" style=${`background:${A};width:10px;height:10px`}></span>${Y}
              ${B&&B.stage!=="not_planted"&&B.stage!=="finished"?i`<span class="xs muted">· ${this.t(`stage.${B.stage}`)}</span>`:u}</div>
            <div class="g-track">${T}
              ${R.sow_date&&R.sow_date<R.in_ground?d(R.sow_date,R.in_ground,"sow",`background:${A}`,`${this.t("lib.indoor_sow")}: ${x(R.sow_date,this.lang)}`):u}
              ${d(R.in_ground,R.harvest_start,"",`background:color-mix(in srgb, ${A} 35%, transparent);border:1px solid ${A}`,`${x(R.in_ground,this.lang)} \u2013 ${x(R.harvest_start,this.lang)}`)}
              ${d(R.harvest_start,R.harvest_end,"",`background:${A}`,`${this.t("lib.harvest")}: ${x(R.harvest_start,this.lang)} \u2013 ${x(R.harvest_end,this.lang)}`)}
              ${B?.harvest_estimate&&l(B.harvest_estimate)!==null?i`<span class="g-mark" style=${`left:${l(B.harvest_estimate)}%`}
                title=${this.t("cal.harvest_estimate",{date:x(B.harvest_estimate,this.lang)})}></span>`:u}
            </div></div>`})}`)}
      ${v.length?u:i`<p class="empty">${this.t("cal.no_plantings")}</p>`}
      <div class="g-legend">
        <span><i style="background:var(--hl-leaf-300);height:4px"></i>${this.t("lib.indoor_sow")}</span>
        <span><i style="background:color-mix(in srgb, var(--hl-leaf-500) 35%, transparent);border:1px solid var(--hl-leaf-500)"></i>${this.t("cal.growing")}</span>
        <span><i style="background:var(--hl-leaf-600)"></i>${this.t("lib.harvest")}</span>
        <span><i style="width:10px;height:10px;transform:rotate(45deg);background:var(--hl-text)"></i>${this.t("cal.harvest_estimate_short")}</span>
        <span><i style="border-left:2px dashed var(--hl-frost-500);width:2px;height:12px;border-radius:0"></i>${this.t("cal.frost_dates")}</span>
      </div>
    </div></div>`}render(){let e=this.mode==="timeline"||this.mode==="year"?this.t("common.season",{year:this.mode==="year"?this.year?.season??Number(this.cursor.slice(0,4)):Number(this.cursor.slice(0,4))}):this.mode==="month"?x(this.cursor,this.lang,{month:"long",year:"numeric"}):`${x(this.weekStart(this.cursor),this.lang)} \u2013 ${x(D(this.weekStart(this.cursor),6),this.lang)}`;return i`
      <div class="bar">
        <button class="icon-btn" aria-label=${this.t("cal.prev")} @click=${()=>this.move(-1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
        <button class="btn small" @click=${()=>this.cursor=this.today}>${this.t("common.today")}</button>
        <button class="icon-btn" aria-label=${this.t("cal.next")} @click=${()=>this.move(1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
        <h2 aria-live="polite">${e}</h2>
        <span class="spacer"></span>
        <div class="row" role="group">
          ${["month","week","list","timeline","year"].map(t=>i`<button class="chip" aria-pressed=${String(this.mode===t)}
            @click=${()=>{this.mode=t,t==="year"&&this.loadYear()}}>${this.t(`cal.${t}`)}</button>`)}
        </div>
        <label class="row small"><span class="visually-hidden">${this.t("task.bed")}</span>
          <select style="width:auto" @change=${t=>this.bedFilter=t.target.value}>
            ${[{id:"",name:this.t("cal.all_beds")},...this.snapshot.beds].map(t=>i`<option value=${t.id} ?selected=${t.id===this.bedFilter}>${t.name}</option>`)}
          </select>
        </label>
        <label class="row small"><input type="checkbox" .checked=${this.showDone} @change=${t=>this.showDone=t.target.checked} />${this.t("cal.show_done")}</label>
        <button class="btn primary small" @click=${()=>this.emit("new-task",null)}><ha-icon icon="mdi:plus"></ha-icon>${this.t("cal.add_task")}</button>
      </div>
      ${this.mode==="month"?this.renderMonth():this.mode==="week"?this.renderWeek():this.mode==="timeline"?this.renderTimeline():this.mode==="year"?this.renderYear():this.renderList()}
    `}};ie.styles=[L,ns,S`
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
    `],p([m({attribute:!1})],ie.prototype,"snapshot",2),p([m({attribute:!1})],ie.prototype,"t",2),p([m()],ie.prototype,"lang",2),p([m({attribute:!1})],ie.prototype,"plants",2),p([m({attribute:!1})],ie.prototype,"families",2),p([f()],ie.prototype,"mode",2),p([f()],ie.prototype,"cursor",2),p([f()],ie.prototype,"showDone",2),p([f()],ie.prototype,"bedFilter",2),p([m({attribute:!1})],ie.prototype,"api",2),p([f()],ie.prototype,"year",2),ie=p([z("hl-calendar-view")],ie);var gi=["nl_be","uk_south","uk_north","de_central","fr_north","scandinavia_south","mediterranean","au_melbourne","nz_christchurch","za_highveld"],fi={nl_be:"Nederland / Vlaanderen",uk_south:"UK (south)",uk_north:"UK (north)",de_central:"Deutschland (Mitte)",fr_north:"France (nord)",scandinavia_south:"Scandinavia (south)",mediterranean:"Mediterranean",au_melbourne:"Australia \u2013 Melbourne",nz_christchurch:"New Zealand \u2013 Christchurch",za_highveld:"South Africa \u2013 Highveld"},vi=Array.from({length:13},(h,o)=>[`${o+1}a`,`${o+1}b`]).flat(),bi={soil_moisture:{domains:["sensor"],deviceClass:"moisture"},soil_temperature:{domains:["sensor"],deviceClass:"temperature"},air_temperature:{domains:["sensor"],deviceClass:"temperature"},air_humidity:{domains:["sensor"],deviceClass:"humidity"},light:{domains:["sensor"],deviceClass:"illuminance"},rain:{domains:["sensor","binary_sensor"]},par:{domains:["sensor"]},ec:{domains:["sensor"],deviceClass:"conductivity"},npk_n:{domains:["sensor"]},npk_p:{domains:["sensor"]},npk_k:{domains:["sensor"]},leaf_wetness:{domains:["sensor","binary_sensor"]}},yi=["fresh","storage","herbs","pollinators","winter","perennials","easy"],fe=class extends E{constructor(){super(...arguments);this.lang="en";this.admin=!0;this.busy=!1;this.testing="";this.testResult={}}entityOptions(e){let t=Object.values(this.hass?.states??{}),s=e==="weather"?{domains:["weather"]}:e==="irrigation"?{domains:["switch","valve","input_boolean"]}:e==="tts"?{domains:["tts"]}:e==="media_player"?{domains:["media_player"]}:e==="vent"?{domains:["cover","switch","fan"]}:e==="shade"?{domains:["cover","switch"]}:e==="pump"?{domains:["switch","valve","input_boolean"]}:e==="meter"||e==="butt"?{domains:["sensor","input_number"]}:bi[e];return t.filter(a=>s.domains.includes(a.entity_id.split(".")[0])).filter(a=>!("deviceClass"in s)||!s.deviceClass||a.attributes.device_class===s.deviceClass).map(a=>a.entity_id).sort()}entityInput(e,t,s,a,n){let r=`list-${t}`,l=s?this.hass?.states[s]:void 0;return i`<label class="field">${n}
      <input list=${r} .value=${s??""} placeholder=${`${{weather:"weather",irrigation:"switch",tts:"tts",media_player:"media_player",vent:"cover"}[t]??"sensor"}.\u2026`} ?disabled=${!this.admin} id=${e}
        aria-invalid=${s&&!l?"true":"false"}
        @change=${d=>a(d.target.value.trim()||null)} />
      ${s?i`<span class="state">${l?`${l.state} ${l.attributes.unit_of_measurement??""}`:"\u26A0 not found"}</span>`:u}
    </label>`}datalists(){return i`${["soil_moisture","soil_temperature","air_temperature","air_humidity","light","rain","par","ec","npk_n","npk_p","npk_k","leaf_wetness","weather","irrigation","tts","media_player","vent","shade","pump","meter","butt"].map(t=>i`<datalist id=${`list-${t}`}>${this.entityOptions(t).map(s=>i`<option value=${s}></option>`)}</datalist>`)}`}async saveSettings(e){this.busy=!0;try{await this.api.saveSettings(e),this.toast(this.t("settings.saved"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}finally{this.busy=!1}}async savePlan(e){let t=structuredClone({zones:this.snapshot.zones,beds:this.snapshot.beds,plantings:this.snapshot.plantings,features:this.snapshot.features??[]});e(t);try{await this.api.savePlan(t,this.snapshot.revision),this.toast(this.t("settings.saved"))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}valveTest(e,t=!0){if(!e||!this.admin)return u;let s=this.testResult[e];return i`<div class="field valve-test">
      <span>&nbsp;</span>
      <div class="row wrap" style="gap:6px;align-items:center">
        <button class="btn small" type="button" ?disabled=${!!this.testing} @click=${()=>this.runValveTest(e,t)}>
          <ha-icon icon="mdi:valve"></ha-icon>${this.testing===e?this.t("valve.testing"):this.t("valve.test")}</button>
        ${s?i`<span class="small">${s}</span>`:u}
      </div>
    </div>`}async runValveTest(e,t){if(confirm(this.t("valve.test_confirm",{entity:e}))){this.testing=e;try{let s=await this.api.irrigationTest(e,5,t),a=s.ok?this.t("valve.test_ok",{open:s.open_state??"?",closed:s.closed_state??"?"}):s.opened?this.t("valve.test_no_close",{state:s.closed_state??"?"}):this.t("valve.test_no_open",{state:s.open_state??"?"});this.testResult={...this.testResult,[e]:`${s.ok?"\u2705":"\u26A0\uFE0F"} ${a}`}}catch(s){let a=s.code;this.testResult={...this.testResult,[e]:`\u26A0\uFE0F ${a==="unknown_entity"?this.t("valve.test_save_first"):s.message}`}}finally{this.testing=""}}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}renderRegion(){let e=this.snapshot.settings.region,t=this.snapshot.analysis?.anchors,s=a=>this.saveSettings({region:a});return i`<section class="card stack" aria-labelledby="s-region">
      <h2 id="s-region">${this.t("settings.region")}</h2>
      <div class="form-grid">
        <label class="field">${this.t("settings.hemisphere")}
          <select ?disabled=${!this.admin} @change=${a=>s({hemisphere:a.target.value})}>
            ${["north","south"].map(a=>i`<option value=${a} ?selected=${e.hemisphere===a}>${this.t(`settings.hemisphere.${a}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("settings.mode")}
          <select ?disabled=${!this.admin} @change=${a=>s({mode:a.target.value})}>
            ${["preset","usda","custom"].map(a=>i`<option value=${a} ?selected=${e.mode===a}>${this.t(`settings.mode.${a}`)}</option>`)}
          </select></label>
        ${e.mode==="preset"?i`<label class="field full">${this.t("settings.preset")}
          <select ?disabled=${!this.admin} @change=${a=>s({preset:a.target.value})}>
            ${gi.map(a=>i`<option value=${a} ?selected=${e.preset===a}>${fi[a]}</option>`)}</select></label>`:u}
        ${e.mode==="usda"?i`<label class="field full">${this.t("settings.zone")}
          <select ?disabled=${!this.admin} @change=${a=>s({hardiness_zone:a.target.value})}>
            ${vi.map(a=>i`<option value=${a} ?selected=${e.hardiness_zone===a}>${a}</option>`)}</select></label>`:u}
        ${e.mode==="custom"?i`
          <label class="field">${this.t("settings.last_frost")}<input pattern="\\d{2}-\\d{2}" .value=${e.last_frost} ?disabled=${!this.admin}
            @change=${a=>a.target.checkValidity()&&s({last_frost:a.target.value})} /></label>
          <label class="field">${this.t("settings.first_frost")}<input pattern="\\d{2}-\\d{2}" .value=${e.first_frost} ?disabled=${!this.admin}
            @change=${a=>a.target.checkValidity()&&s({first_frost:a.target.value})} /></label>`:u}
      </div>
      ${t?i`<p class="small muted">${this.t("settings.frost_dates_now",{last:x(t.last_frost,this.lang,{day:"numeric",month:"long"}),first:x(t.first_frost,this.lang,{day:"numeric",month:"long",year:"numeric"})})}</p>`:u}
    </section>`}renderWeather(){let e=this.snapshot.settings;return i`<section class="card stack" aria-labelledby="s-weather">
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
      ${this.snapshot.weather.error?i`<p class="small" style="color:var(--hl-warning)">⚠ ${this.snapshot.weather.error}</p>`:u}
    </section>`}renderZones(){let e=(t,s)=>this.savePlan(a=>s(a.zones.find(n=>n.id===t)));return i`<section class="card stack" aria-labelledby="s-zones">
      <h2 id="s-zones">${this.t("settings.zones")}</h2>
      ${this.snapshot.zones.map(t=>i`<div class="item">
        <h4><ha-icon icon=${t.type==="outdoor"?"mdi:tree-outline":"mdi:greenhouse"}></ha-icon>${t.name}<span class="chip">${this.t(`settings.zone_type.${t.type}`)}</span></h4>
        <div class="form-grid">
          ${["air_temperature","air_humidity","light"].map(s=>this.entityInput(`${t.id}-${s}`,s,t.sensors[s],a=>e(t.id,n=>n.sensors[s]=a),this.t(`settings.sensor.${s}`)))}
          ${this.entityInput(`${t.id}-lw`,"leaf_wetness",t.sensors.leaf_wetness,s=>e(t.id,a=>a.sensors.leaf_wetness=s),this.t("settings.sensor.leaf_wetness"))}
          ${this.entityInput(`${t.id}-par`,"par",t.sensors.par,s=>e(t.id,a=>a.sensors.par=s),this.t("settings.sensor.par"))}
          ${t.type!=="outdoor"?i`
            ${this.entityInput(`${t.id}-vent`,"vent",t.vent_entity,s=>e(t.id,a=>a.vent_entity=s),this.t("settings.vent"))}
            ${this.entityInput(`${t.id}-shade`,"shade",t.shade_entity,s=>e(t.id,a=>a.shade_entity=s),this.t("settings.shade_entity"))}
            <label class="field">${this.t("settings.climate_control")}
              <select ?disabled=${!this.admin} @change=${s=>e(t.id,a=>a.climate_control=s.target.value)}>
                ${["off","advise","auto"].map(s=>i`<option value=${s} ?selected=${(t.climate_control??"advise")===s}>${this.t(`settings.climate_control.${s}`)}</option>`)}
              </select></label>
            <label class="field check"><input type="checkbox" .checked=${!!t.microclimate.thermal_mass} ?disabled=${!this.admin}
              @change=${s=>e(t.id,a=>a.microclimate.thermal_mass=s.target.checked)} />${this.t("settings.thermal_mass")}</label>`:u}
          <label class="field check"><input type="checkbox" .checked=${!!t.microclimate.wall_heat} ?disabled=${!this.admin}
            @change=${s=>e(t.id,a=>a.microclimate.wall_heat=s.target.checked)} />${this.t("settings.wall_heat")}</label>
          <label class="field check"><input type="checkbox" .checked=${t.microclimate.heated} ?disabled=${!this.admin}
            @change=${s=>e(t.id,a=>a.microclimate.heated=s.target.checked)} />${this.t("settings.heated")}</label>
          ${t.microclimate.heated?i`<label class="field">${this.t("settings.min_heating")}<input type="number" step="0.5" .value=${String(t.microclimate.min_heating_temp_c??5)}
            @change=${s=>e(t.id,a=>a.microclimate.min_heating_temp_c=Number(s.target.value))} /></label>`:u}
        </div>
      </div>`)}
    </section>`}renderBeds(){let e=(t,s)=>this.savePlan(a=>s(a.beds.find(n=>n.id===t)));return i`<section class="card stack" aria-labelledby="s-beds">
      <h2 id="s-beds">${this.t("settings.beds")}</h2>
      ${this.snapshot.beds.map(t=>i`<div class="item">
        <h4><ha-icon icon="mdi:sprout-outline"></ha-icon>${t.name}<span class="chip">${Math.round(t.width_cm)} × ${Math.round(t.length_cm)} cm</span></h4>
        <div class="form-grid">
          ${["soil_moisture","soil_temperature","ec","npk_n","npk_p","npk_k"].map(s=>this.entityInput(`${t.id}-${s}`,s,t.sensors[s],a=>e(t.id,n=>n.sensors[s]=a),this.t(`settings.sensor.${s}`)))}
          ${this.entityInput(`${t.id}-irr`,"irrigation",t.irrigation_entity,s=>e(t.id,a=>a.irrigation_entity=s),this.t("settings.irrigation"))}
          ${this.valveTest(t.irrigation_entity)}
          <label class="field">${this.t("settings.flow")}<input type="number" min="0" step="0.1" .value=${String(t.irrigation_flow_lpm??"")} ?disabled=${!this.admin}
            placeholder=${t.measured_flow_lpm?this.t("settings.flow_measured",{lpm:t.measured_flow_lpm.toFixed(1)}):""}
            @change=${s=>e(t.id,a=>a.irrigation_flow_lpm=Number(s.target.value)||null)} />
            ${t.measured_flow_lpm?i`<span class="xs muted">${this.t("settings.flow_measured",{lpm:t.measured_flow_lpm.toFixed(1)})}</span>`:u}</label>
          ${t.irrigation_entity?i`<label class="field">${this.t("settings.valve_timer")}<input type="number" min="0" step="1" .value=${String(t.valve_max_min??"")} ?disabled=${!this.admin}
            placeholder=${this.t("settings.valve_timer_none")}
            @change=${s=>e(t.id,a=>a.valve_max_min=Number(s.target.value)||null)} /></label>`:u}
        </div>
      </div>`)}
    </section>`}renderIrrigation(){let e=this.snapshot.settings.irrigation??{mode:"advise",pump_entity:null,start_time:"06:00",max_runtime_min:30,frost_lockout_c:2,rain_skip_mm:3,pump_lead_s:3},t=n=>this.saveSettings({irrigation:n}),s=(n,r,l=1,d=0,c=999)=>i`<label class="field">${r}
      <input type="number" step=${l} min=${d} max=${c} .value=${String(e[n])}
        @change=${g=>t({[n]:Number(g.target.value)})} /></label>`,a=this.snapshot.beds.filter(n=>n.irrigation_entity).length;return i`<section class="card stack" aria-labelledby="s-irrigation">
      <h2 id="s-irrigation">${this.t("settings.irrigation_hw")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></h2>
      <div class="form-grid">
        <label class="field full">${this.t("settings.irrigation_mode")}
          <select @change=${n=>t({mode:n.target.value})}>
            ${["off","advise","auto"].map(n=>i`<option value=${n} ?selected=${e.mode===n}>${this.t(`settings.irrigation_mode.${n}`)}</option>`)}
          </select></label>
        ${this.entityInput("pump","pump",e.pump_entity,n=>t({pump_entity:n}),this.t("settings.pump"))}
        ${e.pump_entity?i`<p class="xs muted">${this.t("valve.pump_test_hint")}</p>`:u}
        <label class="field">${this.t("settings.start_time")}<input type="time" .value=${e.start_time}
          @change=${n=>t({start_time:n.target.value})} /></label>
        ${s("max_runtime_min",this.t("settings.max_runtime"),1,1,180)}
        ${s("frost_lockout_c",this.t("settings.frost_lockout"),.5,-5,10)}
        ${s("rain_skip_mm",this.t("settings.rain_skip"),.5,0,30)}
        ${s("pump_lead_s",this.t("settings.pump_lead"),.5,0,30)}
      </div>
      <p class="xs muted">${this.t("settings.irrigation_hint",{n:a})}</p>
    </section>`}renderResources(){let e=this.snapshot.settings,t=e.resources??{household_size:2,hours_per_week:3,water_liters_per_week:null,compost_kg:null,irrigation:!1,goals:["fresh","herbs"],wanted:[],excluded:[]},s=n=>this.saveSettings({resources:n}),a=n=>s({goals:t.goals.includes(n)?t.goals.filter(r=>r!==n):[...t.goals,n]});return i`<section class="card stack" aria-labelledby="s-resources">
      <h2 id="s-resources">${this.t("settings.resources")} <hl-info term="autofill" .t=${this.t}></hl-info></h2>
      <div class="form-grid">
        <label class="field">${this.t("autofill.household")}<input type="number" min="1" max="20" .value=${String(t.household_size)}
          @change=${n=>s({household_size:Number(n.target.value)})} /></label>
        <label class="field">${this.t("autofill.hours")}<input type="number" min="0" step="0.5" .value=${String(t.hours_per_week)}
          @change=${n=>s({hours_per_week:Number(n.target.value)})} /></label>
        <label class="field">${this.t("autofill.water")}<input type="number" min="0" step="10" .value=${String(t.water_liters_per_week??"")}
          @change=${n=>s({water_liters_per_week:n.target.value===""?null:Number(n.target.value)})} /></label>
        <label class="field">${this.t("autofill.compost")}<input type="number" min="0" step="5" .value=${String(t.compost_kg??"")}
          @change=${n=>s({compost_kg:n.target.value===""?null:Number(n.target.value)})} /></label>
        <label class="field check full"><input type="checkbox" .checked=${t.irrigation}
          @change=${n=>s({irrigation:n.target.checked})} />${this.t("autofill.has_irrigation")}</label>
      </div>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.goals")}>
        ${yi.map(n=>i`<button class="chip ${t.goals.includes(n)?"active":""}" aria-pressed=${String(t.goals.includes(n))} @click=${()=>a(n)}>${this.t(`autofill.goal.${n}`)}</button>`)}
      </div>
      <label class="field check"><input type="checkbox" .checked=${e.maintenance_tasks??!0}
        @change=${n=>this.saveSettings({maintenance_tasks:n.target.checked})} />${this.t("settings.maintenance_tasks")}</label>
    </section>`}renderNotifications(){let e=this.snapshot.settings.notifications,t=n=>this.saveSettings({notifications:n}),s=n=>n.split(",").map(r=>r.trim()).filter(Boolean),a=Object.keys(this.hass?.services?.notify??{}).map(n=>`notify.${n}`);return i`<section class="card stack" aria-labelledby="s-notify">
      <h2 id="s-notify">${this.t("settings.notifications")}</h2>
      <label class="field check"><input type="checkbox" .checked=${e.persistent} @change=${n=>t({persistent:n.target.checked})} />${this.t("settings.persistent")}</label>
      <label class="field">${this.t("settings.notify_services")}
        <input list="notify-services" .value=${e.notify_services.join(", ")} @change=${n=>t({notify_services:s(n.target.value)})} />
        <datalist id="notify-services">${a.map(n=>i`<option value=${n}></option>`)}</datalist></label>
      ${this.entityInput("tts","tts",e.tts_entity,n=>t({tts_entity:n}),this.t("settings.tts"))}
      <label class="field">${this.t("settings.tts_players")}<input list="list-media_player" .value=${e.tts_media_players.join(", ")}
        @change=${n=>t({tts_media_players:s(n.target.value)})} /></label>
      <div class="form-grid">
        <label class="field">${this.t("settings.digest")}<input type="time" .value=${e.digest_time} @change=${n=>t({digest_time:n.target.value})} /></label>
        <span></span>
        <label class="field check"><input type="checkbox" .checked=${e.frost_alerts} @change=${n=>t({frost_alerts:n.target.checked})} />${this.t("settings.frost_alerts")}</label>
        <label class="field check"><input type="checkbox" .checked=${e.heat_alerts} @change=${n=>t({heat_alerts:n.target.checked})} />${this.t("settings.heat_alerts")}</label>
        <label class="field check full"><input type="checkbox" .checked=${e.tts_frost_announcement} @change=${n=>t({tts_frost_announcement:n.target.checked})} />${this.t("settings.tts_frost")}</label>
      </div>
      <h3>${this.t("settings.reminders")}</h3>
      <div class="form-grid">
        <label class="field check"><input type="checkbox" .checked=${e.overdue_reminders??!0} @change=${n=>t({overdue_reminders:n.target.checked})} />${this.t("settings.overdue_reminders")}</label>
        <label class="field">${this.t("settings.overdue_time")}<input type="time" .value=${e.overdue_time??"18:30"} @change=${n=>t({overdue_time:n.target.value})} /></label>
        <label class="field">${this.t("settings.overdue_after")}<input type="number" min="0" max="14" .value=${String(e.overdue_after_days??1)} @change=${n=>t({overdue_after_days:Number(n.target.value)})} /></label>
        <span></span>
        <label class="field check"><input type="checkbox" .checked=${e.weekly_plan??!0} @change=${n=>t({weekly_plan:n.target.checked})} />${this.t("settings.weekly_plan")}</label>
        <label class="field">${this.t("settings.weekly_day")}<select @change=${n=>t({weekly_plan_weekday:Number(n.target.value)})}>
          ${[0,1,2,3,4,5,6].map(n=>i`<option value=${n} ?selected=${(e.weekly_plan_weekday??6)===n}>${new Date(2024,0,1+n).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{weekday:"long"})}</option>`)}
        </select></label>
        <label class="field">${this.t("settings.weekly_time")}<input type="time" .value=${e.weekly_plan_time??"19:00"} @change=${n=>t({weekly_plan_time:n.target.value})} /></label>
      </div>
      <label class="field check"><input type="checkbox" .checked=${this.snapshot.settings.weather_aware_scheduling??!0}
        @change=${n=>this.saveSettings({weather_aware_scheduling:n.target.checked})} />${this.t("settings.weather_aware")}</label>
      <p class="xs muted">${this.t("settings.weather_aware_hint")}</p>
    </section>`}renderWater(){let e=this.snapshot.settings.water??{meter_entity:null,butt_level_entity:null,butt_capacity_l:0},t=s=>this.saveSettings({water:s});return i`<section class="card stack" aria-labelledby="s-water">
      <h2 id="s-water">${this.t("settings.water")}</h2>
      <div class="form-grid">
        ${this.entityInput("meter","meter",e.meter_entity,s=>t({meter_entity:s}),this.t("settings.water_meter"))}
        ${this.entityInput("butt","butt",e.butt_level_entity,s=>t({butt_level_entity:s}),this.t("settings.butt_level"))}
        <label class="field">${this.t("settings.butt_capacity")}<input type="number" min="0" step="50" .value=${String(e.butt_capacity_l??0)}
          @change=${s=>t({butt_capacity_l:Number(s.target.value)||0})} /></label>
      </div>
      <label class="field check"><input type="checkbox" .checked=${e.leak_alerts??!0} ?disabled=${!e.meter_entity}
        @change=${s=>t({leak_alerts:s.target.checked})} />${this.t("settings.leak_alerts")}</label>
      <p class="xs muted">${this.t("settings.water_hint")} ${this.t("settings.leak_hint")}</p>
    </section>`}renderHousehold(){let e=this.snapshot.settings,t=e.assignment??{},s=e.person_notify??{},a=Et(),n=Object.keys(this.hass?.services?.notify??{}).map(d=>`notify.${d}`),r=["water","harvest","sow_indoor","sow_direct","transplant","weed","pest_check","feed","ventilate","prune","clean_greenhouse","tool_care"],l=d=>i`<select @change=${c=>this.saveSettings({assignment:{[d]:c.target.value}})}>
      <option value="" ?selected=${!t[d]}>${this.t(d==="*"?"settings.nobody":"settings.default_person")}</option>
      ${a.map(c=>i`<option value=${c.id} ?selected=${t[d]===c.id}>${c.name}</option>`)}</select>`;return i`<section class="card stack" aria-labelledby="s-household">
      <h2 id="s-household">${this.t("settings.household")}</h2>
      ${a.length===0?i`<p class="small muted">${this.t("settings.no_persons")}</p>`:i`
        <label class="field">${this.t("settings.assign_default")}${l("*")}</label>
        <details><summary class="small">${this.t("settings.assign_per_type")}</summary>
          <div class="form-grid" style="margin-top:8px">${r.map(d=>i`<label class="field">${this.t(`type.${d}`)}${l(d)}</label>`)}</div>
        </details>
        <h3>${this.t("settings.person_notify")}</h3>
        <datalist id="notify-person">${n.map(d=>i`<option value=${d}></option>`)}</datalist>
        <div class="form-grid">${a.map(d=>i`<label class="field">${d.name}
          <input list="notify-person" placeholder="notify.mobile_app_…" .value=${s[d.id]??""}
            @change=${c=>this.saveSettings({person_notify:{[d.id]:c.target.value.trim()}})} /></label>`)}</div>
        <p class="xs muted">${this.t("settings.person_notify_hint")}</p>`}
      <h3>${this.t("settings.voice")}</h3>
      <p class="xs muted">${this.t("settings.voice_hint")}</p>
      <div class="row wrap">
        <button class="btn small" @click=${()=>this.installVoice()}><ha-icon icon="mdi:microphone-message"></ha-icon>${this.t("settings.voice_install")}</button>
      </div>
    </section>`}async installVoice(){try{await this.hass.callService("garden_manager","install_voice_sentences",{overwrite:!0}),this.toast(this.t("settings.voice_installed"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}}renderGeneral(){let e=this.snapshot.settings;return i`<section class="card stack" aria-labelledby="s-general">
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
    </section>`}async export(e){let t=await this.api.exportPlan(e,!0);Ae(t.filename,t.content,e==="json"?"application/json":"application/yaml")}render(){return i`
      ${this.admin?u:i`<p class="small" style="color:var(--hl-warning);margin-bottom:12px">${this.t("common.admin_only")}</p>`}
      <fieldset ?disabled=${!this.admin||this.busy} style="border:0;padding:0;margin:0">
        <div class="sections">
          ${this.renderRegion()} ${this.renderWeather()} ${this.renderZones()} ${this.renderBeds()} ${this.renderIrrigation()}
          ${this.renderResources()} ${this.renderNotifications()} ${this.renderWater()} ${this.renderHousehold()} ${this.renderGeneral()}
        </div>
      </fieldset>
      <section class="card stack" style="margin-top:var(--hl-s4)" aria-labelledby="s-display">
        <h2 id="s-display">${this.t("settings.display")}</h2>
        <label class="field check"><input type="checkbox" .checked=${St()}
          @change=${e=>Ts(e.target.checked)} />${this.t("settings.photos")}</label>
        <p class="xs muted">${this.t("settings.photos_hint")}</p>
        <div class="field"><span>${this.t("settings.theme")}</span>
          <div class="themes" role="radiogroup" aria-label=${this.t("settings.theme")}>
            ${xs.map(e=>i`<button class="theme-opt" role="radio" aria-checked=${String(Qt()===e)}
                @click=${()=>{Ia(e),this.requestUpdate()}}>
              <span class="swatch ${e}"></span><b>${this.t(`theme.${e}`)}</b><small>${this.t(`theme.${e}.hint`)}</small></button>`)}
          </div></div>
      </section>
      ${this.datalists()}
    `}};fe.styles=[L,S`
      .sections { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: var(--hl-s4); align-items: start; }
      .themes { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 8px; margin-top: 6px; }
      .theme-opt { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 10px; border-radius: 14px; cursor: pointer; text-align: left;
        border: 1px solid var(--hl-border); background: var(--hl-surface); color: var(--hl-text); font: inherit; }
      .theme-opt[aria-checked="true"] { border-color: var(--hl-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hl-primary) 20%, transparent); }
      .theme-opt small { color: var(--hl-text-muted); font-size: 11px; }
      .swatch { width: 100%; height: 34px; border-radius: 9px; }
      .swatch.classic { background: linear-gradient(120deg, #3b7334 0 40%, #e8a33d 40% 55%, #faf7f0 55%); }
      .swatch.earth { background: linear-gradient(120deg, #8a4f2a 0 40%, #c8743a 40% 55%, #f7f1e8 55%); }
      .swatch.night { background: linear-gradient(120deg, #8fd0b0 0 30%, #c9b8ff 30% 45%, #0d1214 45%); }
      .swatch.season { background: linear-gradient(90deg, #a9d18e 0 25%, #f6c26b 25% 50%, #d98e57 50% 75%, #b3c9dc 75%); }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .item { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); display: flex; flex-direction: column; gap: var(--hl-s2); background: var(--hl-surface-2); }
      .item h4 { display: flex; align-items: center; gap: var(--hl-s2); }
      .check { flex-direction: row !important; align-items: center; gap: var(--hl-s2) !important; color: var(--hl-text) !important; }
      .state { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
    `],p([m({attribute:!1})],fe.prototype,"snapshot",2),p([m({attribute:!1})],fe.prototype,"hass",2),p([m({attribute:!1})],fe.prototype,"api",2),p([m({attribute:!1})],fe.prototype,"t",2),p([m()],fe.prototype,"lang",2),p([m({type:Boolean})],fe.prototype,"admin",2),p([f()],fe.prototype,"busy",2),p([f()],fe.prototype,"testing",2),p([f()],fe.prototype,"testResult",2),fe=p([z("hl-settings-view")],fe);var Pt=h=>h.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");function Ce(h){let o=[],e=/(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g,t=0,s;for(;s=e.exec(h);)s.index>t&&o.push(h.slice(t,s.index)),s[2]!==void 0?o.push(i`<strong>${s[2]}</strong>`):s[3]!==void 0?o.push(i`<em>${s[3]}</em>`):o.push(i`<code>${s[4]}</code>`),t=s.index+s[0].length;return t<h.length&&o.push(h.slice(t)),o}function on(h){return h.split(`
`).filter(o=>/^#{2,3} /.test(o)).map(o=>{let e=o.startsWith("### ")?3:2,t=o.replace(/^#+ /,"").trim();return{level:e,text:t,id:Pt(t)}})}var rn=h=>h.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(o=>o.trim());function ln(h){let o=h.replace(/\r/g,"").split(`
`),e=[],t=0;for(;t<o.length;){let s=o[t];if(!s.trim()){t++;continue}let a=/^(#{1,4}) (.*)$/.exec(s);if(a){let r=a[2].trim(),l=Math.min(Math.max(a[1].length,2),4);e.push(l===2?i`<h2 id=${Pt(r)}>${Ce(r)}</h2>`:l===3?i`<h3 id=${Pt(r)}>${Ce(r)}</h3>`:i`<h4>${Ce(r)}</h4>`),t++;continue}if(s.trim().startsWith("|")){let r=[];for(;t<o.length&&o[t].trim().startsWith("|");)r.push(o[t++]);let[l,,...d]=r,g=r[1]!==void 0&&/^\s*\|?\s*:?-{2,}/.test(r[1])?d:r.slice(1);e.push(i`<div class="table-wrap"><table>
        <thead><tr>${rn(l).map(v=>i`<th>${Ce(v)}</th>`)}</tr></thead>
        <tbody>${g.map(v=>i`<tr>${rn(v).map($=>i`<td>${Ce($)}</td>`)}</tr>`)}</tbody>
      </table></div>`);continue}if(/^\s*([-*]|\d+\.) /.test(s)){let r=/^\s*\d+\. /.test(s),l=[];for(;t<o.length&&/^\s*([-*]|\d+\.) /.test(o[t]);)l.push(o[t].replace(/^\s*([-*]|\d+\.) /,"")),t++;let d=l.map(c=>i`<li>${Ce(c)}</li>`);e.push(r?i`<ol>${d}</ol>`:i`<ul>${d}</ul>`);continue}let n=[];for(;t<o.length&&o[t].trim()&&!/^(#{1,4} |\s*\||\s*([-*]|\d+\.) )/.test(o[t]);)n.push(o[t++].trim());e.push(i`<p>${Ce(n.join(" "))}</p>`)}return e.length?i`${e}`:i`${u}`}var N="#5a9a3c",re="#d9412b",De="#ef8a1e",ds="#7a4aa0",jt="#f2c230",ls='<circle cx="178" cy="16" r="9" fill="#f6cf4a"/><g stroke="#f6cf4a" stroke-width="2" stroke-linecap="round"><path d="M178 2v-2M178 32v2M164 16h-2M192 16h2M168 6l-1.5-1.5M188 6l1.5-1.5"/></g>',$i=`<g stroke="#5b9fd4" stroke-width="2" stroke-linecap="round"><path d="M30 8l-3 7M44 12l-3 7M58 6l-3 7M72 11l-3 7"/></g>
  <path d="M22 8q6-8 14-3 6-6 13 0 8-2 9 5H22z" fill="#cfe1ef"/>`,wi=`<path d="M118 62V34l26-16 26 16v28z" fill="#e6f2fb" fill-opacity=".7" stroke="#7fa9c9" stroke-width="1.6"/>
  <path d="M144 18v44M131 26v36M157 26v36M118 46h52" stroke="#7fa9c9" stroke-width="1"/>`,dn=`<g transform="translate(150 34)"><path d="M0 8h22l-2 20H2z" fill="#4c8fbf"/><path d="M22 12l14-8" stroke="#4c8fbf" stroke-width="3" stroke-linecap="round"/>
  <path d="M5 8q6-10 12 0" fill="none" stroke="#2d6a96" stroke-width="2"/><g fill="#7fb6d9"><circle cx="40" cy="8" r="1.4"/><circle cx="43" cy="13" r="1.2"/><circle cx="40" cy="17" r="1"/></g></g>`,_i=`<path d="M140 64l10-22h28l10 22z" fill="#7a5a3a"/><path d="M146 52h36M143 58h42" stroke="#5c442a" stroke-width="1.4"/>
  <path d="M154 40q8-10 16 0" fill="none" stroke="#6aa648" stroke-width="2"/>`,ki=`<g transform="translate(150 22)"><ellipse cx="10" cy="10" rx="9" ry="8" fill="${re}"/><path d="M10 2v16" stroke="#222" stroke-width="1.2"/>
  <circle cx="10" cy="2.5" r="3.2" fill="#222"/><g fill="#222"><circle cx="6" cy="8" r="1.6"/><circle cx="14" cy="8" r="1.6"/><circle cx="6" cy="14" r="1.4"/><circle cx="14" cy="14" r="1.4"/></g></g>`,xi=`<g transform="translate(150 30)"><path d="M2 14q12-20 24 0z" fill="#c8506a"/><rect x="11" y="13" width="6" height="12" rx="2" fill="#efe3cf"/>
  <g fill="#fff"><circle cx="9" cy="9" r="1.6"/><circle cx="17" cy="7" r="1.4"/><circle cx="21" cy="11" r="1.2"/></g></g>`,Mi=`<g transform="translate(144 34)"><path d="M2 10h36l-5 20H7z" fill="#b5843a"/><path d="M6 10q14-18 28 0" fill="none" stroke="#8a6238" stroke-width="2.5"/>
  <path d="M6 17h28M8 23h24" stroke="#8a6238" stroke-width="1.2"/><circle cx="14" cy="9" r="4" fill="${re}"/><circle cx="23" cy="8" r="4.4" fill="${De}"/><circle cx="30" cy="10" r="3.4" fill="${ds}"/></g>`,hn=`<g transform="translate(146 26)"><rect width="22" height="30" rx="2" fill="#efe3cf" stroke="#b3a283"/><circle cx="11" cy="12" r="6" fill="${jt}"/>
  <g fill="#8a6a45"><ellipse cx="32" cy="24" rx="2" ry="1.2"/><ellipse cx="37" cy="28" rx="2" ry="1.2"/><ellipse cx="30" cy="30" rx="2" ry="1.2"/></g></g>`,pn='<g transform="translate(160 14) rotate(20)"><rect x="3" width="3" height="30" fill="#8a6238"/><path d="M-2 30h13l-1 14q-5 4-11 0z" fill="#9aa3a0"/></g>',Si=`<g fill="none" stroke="#6a84c0" stroke-width="2.2" stroke-linecap="round"><path d="M150 26a16 16 0 0 1 28 6"/><path d="M178 44a16 16 0 0 1-28-6"/></g>
  <path d="M176 26l3 7 5-5zM152 44l-3-7-5 5z" fill="#6a84c0"/>`,Ei='<path d="M100 22c-4-6-12-2-10 4 1 4 10 10 10 10s9-6 10-10c2-6-6-10-10-4z" fill="#e06aa0"/>',cn='<g stroke="#9cc1de" stroke-width="1.6" stroke-linecap="round"><path d="M178 8v16M170 16h16M172 10l12 12M184 10l-12 12"/></g>',Ti=`<g transform="translate(150 20)"><rect width="16" height="24" rx="3" fill="#3a4a42"/><rect x="3" y="4" width="10" height="8" rx="1" fill="#9fe0a0"/>
  <rect x="6" y="24" width="4" height="18" fill="#8a8f8c"/><path d="M22 6a10 10 0 0 1 0 12M26 2a16 16 0 0 1 0 20" fill="none" stroke="#6a84c0" stroke-width="1.6" stroke-linecap="round"/></g>`,zi='<path d="M0 66q50-6 100 0t100 0v14H0z" fill="#c9a86a"/><g stroke="#a8873f" stroke-width="1.2"><path d="M12 70l8-2M40 72l9 1M80 69l7 2M120 71l8-1M160 70l9 1"/></g>',Pi=`<g transform="translate(150 26)"><rect x="2" y="6" width="22" height="30" rx="4" fill="#cfe7f6" fill-opacity=".8" stroke="#7fa9c9"/>
  <rect y="0" width="26" height="7" rx="2" fill="#c8506a"/><path d="M6 20h14M6 26h14" stroke="#5a9a3c" stroke-width="2"/></g>`,Os={planning:{sky:"#eaf4e1",ground:"#8a6a45",pieces:[["carrot",De,14,1],["lettuce",N,32,.9],["tomato",re,50,1],["bean",N,68,1.1]],extra:ls},soil:{sky:"#f3ece0",ground:"#6b4f32",pieces:[["potato","#c9a46a",20,.9],["clover",N,40,.9],["leafy",N,58,.9]],extra:pn},sowing:{sky:"#eef6e8",ground:"#8a6a45",pieces:[["pea",N,16,.8],["lettuce",N,34,.7],["root","#c84a6a",52,.8]],extra:hn},watering:{sky:"#e6f1fa",ground:"#7a5d3e",pieces:[["cucumber",N,20,1],["chard",re,40,1],["lettuce",N,60,.9]],extra:$i+dn},fertilizing:{sky:"#f1efe2",ground:"#7a5a3a",pieces:[["cabbage",N,18,1],["pumpkin",De,40,1],["leek",N,60,1]],extra:_i},rotation:{sky:"#eaf0f8",ground:"#8a6a45",pieces:[["potato","#c9a46a",14,.9],["bean",N,32,1],["cabbage",N,50,1],["onion","#b07a3a",68,.9]],extra:Si},companions:{sky:"#f6eef3",ground:"#8a6a45",pieces:[["tomato",re,30,1.1],["herb",N,60,.9],["flower",De,76,.8]],extra:Ei},greenhouse:{sky:"#e8f3f8",ground:"#7a5d3e",pieces:[["pepper",re,14,1],["eggplant",ds,34,1],["tomato",re,54,.9]],extra:wi},pests:{sky:"#eef5e6",ground:"#7a5d3e",pieces:[["cabbage",N,18,1],["lettuce",N,40,.9],["flower",jt,60,.8]],extra:ki},diseases:{sky:"#efeee8",ground:"#6b4f32",pieces:[["tomato",re,18,1],["potato","#c9a46a",40,.9],["leafy",N,60,.9]],extra:xi},seasons:{sky:"#eef2f7",ground:"#8a6a45",pieces:[["kale",N,16,1],["leek",N,34,1],["sprouts",N,52,1]],extra:cn},harvest:{sky:"#fbf1df",ground:"#8a6a45",pieces:[["corn",jt,14,1.1],["pumpkin",De,34,1],["tomato",re,54,.9]],extra:Mi},seeds:{sky:"#f7f1e2",ground:"#8a6a45",pieces:[["sunflower",jt,18,1.2],["bean",N,40,1],["umbel","#e8e2c8",60,.9]],extra:hn},nodig:{sky:"#f3efe4",ground:"#8a6a45",pieces:[["lettuce",N,20,.9],["chard",re,40,1],["kale",N,60,1]],extra:zi},herbs:{sky:"#eef4ec",ground:"#7a5d3e",pieces:[["herb",N,16,1],["lavender",ds,34,1],["umbel","#e8e2c8",52,1],["herb","#4f8a34",70,.8]],extra:ls},perennials:{sky:"#eef4ec",ground:"#7a5d3e",pieces:[["rhubarb",re,18,1.1],["asparagus",N,40,1],["artichoke","#6f8f6a",60,1]]},fruit:{sky:"#f4f0e8",ground:"#6f9a45",pieces:[["tree_apple",re,16,1.4],["berry_bush",ds,42,1],["strawberry",re,62,.8]],extra:ls},tools:{sky:"#f0efea",ground:"#8a6a45",pieces:[["leafy",N,24,.9],["carrot",De,46,.9]],extra:pn+`<g transform="translate(-30 0)">${dn}</g>`},home_remedies:{sky:"#f4eef4",ground:"#7a5d3e",pieces:[["herb",N,18,1],["flower",De,38,.9],["garlic","#efe3cf",58,.9]],extra:Pi},year_round:{sky:"#eef2f7",ground:"#8a6a45",pieces:[["leek",N,14,1],["kale",N,32,1],["tomato",re,50,.9],["lettuce",N,68,.8]],extra:ls+`<g transform="translate(-40 0)">${cn}</g>`},sensors:{sky:"#e9f0f4",ground:"#7a5d3e",pieces:[["lettuce",N,20,.9],["tomato",re,42,1],["pepper",re,62,.9]],extra:Ti}},un={sky:"#eef4ec",ground:"#8a6a45",pieces:[["leafy",N,24,1],["carrot",De,44,1],["flower",jt,64,.8]]};function mn(h){let o=h.pieces.map(([e,t,s,a])=>{let n=34*a,r=Ze[e]??Ze.leafy;return`<g transform="translate(${s/100*200-n/2} ${64-n}) scale(${n/24})" style="color:${t}">${r}</g>`}).join("");return`<rect width="200" height="80" fill="${h.sky}"/>${h.extra??""}
    <path d="M0 62q50-5 100 0t100 0v18H0z" fill="${h.ground}"/>
    <path d="M0 64q50-5 100 0t100 0" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.5"/>${o}`}function Rt(h,o=120){let e=Os[h]??un,t=mn(e);return i`<svg class="chapter-art" viewBox="0 0 200 80" preserveAspectRatio="xMidYMid slice" width="100%" height=${o}
    aria-hidden="true">${it(t)}</svg>`}var Wh=Object.keys(Os);function gn(h,o=190){let e=Os[h]??un,t=`display:block;line-height:0;background:linear-gradient(to bottom, ${e.sky} 78%, ${e.ground} 78%)`;return i`<span class="chapter-banner" style=${t}>
    <svg viewBox="0 0 200 80" preserveAspectRatio="xMidYMax meet" width="100%" style=${`max-height:${o}px;aspect-ratio:5/2;display:block;margin:0 auto`}
      aria-hidden="true">${it(mn(e))}</svg></span>`}var ji={planning:"mdi:clipboard-text-outline",soil:"mdi:shovel",sowing:"mdi:seed-outline",watering:"mdi:watering-can-outline",fertilizing:"mdi:bottle-tonic-plus-outline",rotation:"mdi:rotate-3d-variant",companions:"mdi:handshake-outline",greenhouse:"mdi:greenhouse",pests:"mdi:bug-outline",diseases:"mdi:mushroom-outline",seasons:"mdi:calendar-sync-outline",harvest:"mdi:basket-outline",seeds:"mdi:seed",nodig:"mdi:layers-outline",herbs:"mdi:leaf",perennials:"mdi:flower-outline"},te=class extends E{constructor(){super(...arguments);this.lang="en";this.chapterId="";this.narrow=!1;this.chapters=[];this.glossary={};this.body="";this.loadedId="";this.query="";this.results=[];this.showGlossary=!1}willUpdate(e){(e.has("api")||e.has("lang"))&&this.api&&this.loadIndex(),(e.has("chapterId")||e.has("lang"))&&this.api&&this.chapterId&&this.chapterId!==this.loadedId&&this.loadChapter(this.chapterId)}async loadIndex(){let e=await this.api.handbookIndex(this.lang);this.chapters=e.chapters,this.glossary=e.glossary}async loadChapter(e){try{let t=await this.api.handbookChapter(e,this.lang);this.body=t.body,this.loadedId=e,this.updateComplete.then(()=>this.renderRoot.querySelector("article")?.scrollIntoView({block:"start"}))}catch{this.body="",this.loadedId=""}}open(e){this.showGlossary=!1,this.query="",this.results=[],this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e},bubbles:!0,composed:!0}))}onSearch(e){if(this.query=e,window.clearTimeout(this.searchTimer),!e.trim()){this.results=[];return}this.searchTimer=window.setTimeout(async()=>{let t=(await this.api.handbookSearch(e,this.lang)).results;e===this.query&&(this.results=t)},200)}renderToc(){return i`<nav class="toc card" aria-label=${this.t("handbook.contents")}>
      <input class="search" type="search" placeholder=${this.t("handbook.search")} .value=${this.query}
        @input=${e=>this.onSearch(e.target.value)} aria-label=${this.t("handbook.search")} />
      <a aria-current=${!this.chapterId&&!this.showGlossary?"page":"false"} @click=${()=>this.open("")}>
        <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("handbook.overview")}</a>
      ${this.chapters.map(e=>i`<a aria-current=${e.id===this.chapterId&&!this.showGlossary?"page":"false"} @click=${()=>this.open(e.id)}>
        <span class="num">${e.order}</span>${e.title}</a>`)}
      <a aria-current=${this.showGlossary?"page":"false"} @click=${()=>this.showGlossary=!0}>
        <ha-icon icon="mdi:alphabetical-variant"></ha-icon>${this.t("handbook.glossary")}</a>
    </nav>`}renderBody(){if(this.query.trim())return i`<article class="card"><h1>${this.t("handbook.results",{query:this.query})}</h1>
        ${this.results.length?this.results.map(n=>i`<div class="hit" @click=${()=>this.open(n.id)}><b>${n.title}</b><p class="small muted">…${n.snippet}…</p></div>`):i`<p class="muted">${this.t("handbook.no_results")}</p>`}</article>`;if(this.showGlossary){let n=Object.entries(this.glossary).sort((r,l)=>r[1].term.localeCompare(l[1].term,this.lang));return i`<article class="card"><h1>${this.t("handbook.glossary")}</h1>
        <dl class="gloss">${n.map(([,r])=>i`<dt>${r.term}</dt><dd>${r.text}
          ${r.chapter?i` <a href="#" @click=${l=>{l.preventDefault(),this.open(r.chapter)}}>→ ${this.chapters.find(l=>l.id===r.chapter)?.title??r.chapter}</a>`:u}</dd>`)}</dl>
      </article>`}if(!this.chapterId)return i`<article style="max-width:none">
        <h1>${this.t("handbook.title")}</h1>
        <p class="muted">${this.t("handbook.intro")}</p>
        <div class="grid">${this.chapters.map(n=>i`<button class="card tile" @click=${()=>this.open(n.id)}>
          <span class="art">${Rt(n.id,96)}</span>
          <span class="txt"><h3><ha-icon icon=${ji[n.id]??"mdi:book-outline"}></ha-icon>${n.title}</h3>
          <p class="small muted">${Ce(n.summary)}</p></span></button>`)}</div>
      </article>`;let e=this.chapters.find(n=>n.id===this.chapterId),t=this.chapters.findIndex(n=>n.id===this.chapterId),s=t>0?this.chapters[t-1]:void 0,a=t>=0&&t<this.chapters.length-1?this.chapters[t+1]:void 0;return i`<article class="card">
      <span class="banner">${gn(this.chapterId)}</span>
      <h1>${e?.title??""}</h1>
      <div class="sections">${on(this.body).filter(n=>n.level===2).map(n=>i`<a class="chip" href=${`#${n.id}`}
        @click=${r=>{r.preventDefault(),this.renderRoot.querySelector(`#${CSS.escape(Pt(n.text))}`)?.scrollIntoView({behavior:"smooth"})}}>${n.text}</a>`)}</div>
      ${this.loadedId===this.chapterId?ln(this.body):i`<p class="muted">${this.t("common.loading")}</p>`}
      <div class="row" style="margin-top:var(--hl-s5)">
        ${s?i`<button class="btn small ghost" @click=${()=>this.open(s.id)}>← ${s.title}</button>`:u}
        <span class="spacer"></span>
        ${a?i`<button class="btn small" @click=${()=>this.open(a.id)}>${a.title} →</button>`:u}
      </div>
    </article>`}render(){let e=this.narrow&&(this.chapterId||this.showGlossary)?i`<details class="toc-wrap card"><summary><ha-icon icon="mdi:format-list-bulleted"></ha-icon>${this.t("handbook.contents")}</summary>${this.renderToc()}</details>`:this.renderToc();return i`<div class="layout ${this.narrow?"narrow":""}">${e}${this.renderBody()}</div>`}};te.styles=[L,S`
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
    `],p([m({attribute:!1})],te.prototype,"api",2),p([m({attribute:!1})],te.prototype,"t",2),p([m()],te.prototype,"lang",2),p([m()],te.prototype,"chapterId",2),p([m({type:Boolean})],te.prototype,"narrow",2),p([f()],te.prototype,"chapters",2),p([f()],te.prototype,"glossary",2),p([f()],te.prototype,"body",2),p([f()],te.prototype,"loadedId",2),p([f()],te.prototype,"query",2),p([f()],te.prototype,"results",2),p([f()],te.prototype,"showGlossary",2),te=p([z("hl-handbook-view")],te);var Ri=[{id:"garden",icon:"mdi:floor-plan"},{id:"zone",icon:"mdi:greenhouse"},{id:"beds",icon:"mdi:sprout-outline"},{id:"tasks",icon:"mdi:format-list-checks"},{id:"season",icon:"mdi:chart-gantt"},{id:"year",icon:"mdi:calendar-month"},{id:"blank",icon:"mdi:draw"},{id:"plants",icon:"mdi:card-text-outline"},{id:"book",icon:"mdi:book-open-page-variant-outline"}],Li=["remarkable","a4","a3","a5","letter"],fn="hortulus.print",ce=class extends E{constructor(){super(...arguments);this.lang="en";this.narrow=!1;this.admin=!0;this.opts={document:"garden",page:"remarkable",landscape:!1,color_mode:"eink",days:28,notes:!0,grid:!0,labels:!0};this.pages=[];this.busy=!1;this.error=""}connectedCallback(){super.connectedCallback();try{let e=JSON.parse(localStorage.getItem(fn)??"null");e&&(this.opts={...this.opts,...e})}catch{}}willUpdate(e){e.has("api")&&this.api&&!this.pages.length&&this.schedule(0)}set(e,t){this.opts={...this.opts,[e]:t},e==="page"&&t==="remarkable"&&this.opts.color_mode==="color"&&(this.opts={...this.opts,color_mode:"eink"});try{localStorage.setItem(fn,JSON.stringify({...this.opts,bed_ids:null,zone_id:null,title:null}))}catch{}this.schedule()}schedule(e=350){window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>this.preview(),e)}async preview(){this.busy=!0,this.error="";try{this.pages=(await this.api.printPreview(this.payload())).pages}catch(e){this.error=e.message??String(e)}finally{this.busy=!1}}payload(){let e={...this.opts};return e.document!=="zone"&&delete e.zone_id,e.document!=="beds"&&delete e.bed_ids,e.title||delete e.title,e}async download(){this.busy=!0;try{let{blob:e,filename:t}=await this.api.printPdf(this.payload()),s=URL.createObjectURL(e),a=document.createElement("a");a.href=s,a.download=t,a.click(),setTimeout(()=>URL.revokeObjectURL(s),2e3)}catch(e){this.toast(this.t("common.error",{message:e.message}))}finally{this.busy=!1}}async saveToConfig(){try{await this.api.exportPdfToConfig(this.payload()),this.toast(this.t("print.saved_to_config"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}renderForm(){let e=this.opts,t=this.snapshot.analysis?.season??new Date().getFullYear(),s=this.snapshot.zones;return i`<section class="card stack" aria-label=${this.t("print.options")}>
      <h2>${this.t("print.document")}</h2>
      <div class="docs" role="group">
        ${Ri.map(a=>i`<button class="doc" aria-pressed=${String(e.document===a.id)} @click=${()=>this.set("document",a.id)}>
          <ha-icon icon=${a.icon}></ha-icon><b>${this.t(`print.doc.${a.id}`)}</b><small>${this.t(`print.doc.${a.id}.hint`)}</small></button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("print.page")}
          <select @change=${a=>this.set("page",a.target.value)}>
            ${Li.map(a=>i`<option value=${a} ?selected=${e.page===a}>${this.t(`print.page.${a}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("print.orientation")}
          <select @change=${a=>this.set("landscape",a.target.value==="landscape")}>
            <option value="portrait" ?selected=${!e.landscape}>${this.t("print.portrait")}</option>
            <option value="landscape" ?selected=${e.landscape}>${this.t("print.landscape")}</option>
          </select></label>
        <label class="field">${this.t("print.colors")}
          <select @change=${a=>this.set("color_mode",a.target.value)}>
            ${["color","eink","grayscale"].map(a=>i`<option value=${a} ?selected=${e.color_mode===a}>${this.t(`print.color.${a}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("planner.season")}
          <select @change=${a=>this.set("season",Number(a.target.value))}>
            ${[t-1,t,t+1].map(a=>i`<option value=${a} ?selected=${(e.season??t)===a}>${a}</option>`)}
          </select></label>
        ${e.document==="zone"||e.document==="blank"?i`<label class="field full">${this.t("planner.zone")}
          <select @change=${a=>this.set("zone_id",a.target.value||null)}>
            <option value="">${this.t(e.document==="zone"?"print.all_greenhouses":"print.all_zones")}</option>
            ${s.map(a=>i`<option value=${a.id} ?selected=${e.zone_id===a.id}>${a.name}</option>`)}
          </select></label>`:u}
        ${e.document==="beds"?i`<fieldset class="full" style="border:0;padding:0;margin:0">
          <legend class="small muted">${this.t("print.beds")}</legend>
          <div class="row wrap">${this.snapshot.beds.map(a=>{let n=!e.bed_ids||e.bed_ids.includes(a.id);return i`<button class="chip" aria-pressed=${String(n)} @click=${()=>{let r=this.snapshot.beds.map(c=>c.id),l=e.bed_ids??r,d=n?l.filter(c=>c!==a.id):[...l,a.id];this.set("bed_ids",d.length===r.length?null:d)}}>${a.name}</button>`})}</div></fieldset>`:u}
        ${e.document==="tasks"?i`<label class="field">${this.t("print.days")}<input type="number" min="1" max="120" .value=${String(e.days)}
          @change=${a=>this.set("days",Number(a.target.value))} /></label>`:u}
        <label class="field full">${this.t("print.title")}<input .value=${e.title??""} placeholder=${this.t(`print.doc.${e.document}`)}
          @change=${a=>this.set("title",a.target.value||null)} /></label>
        <label class="field check"><input type="checkbox" .checked=${e.notes} @change=${a=>this.set("notes",a.target.checked)} />${this.t("print.notes")}</label>
        <label class="field check"><input type="checkbox" .checked=${e.grid} @change=${a=>this.set("grid",a.target.checked)} />${this.t("print.grid")}</label>
        <label class="field check full"><input type="checkbox" .checked=${e.labels} @change=${a=>this.set("labels",a.target.checked)} />${this.t("print.labels")}</label>
      </div>
      ${e.page==="remarkable"?i`<div class="rm"><ha-icon icon="mdi:tablet"></ha-icon><span>${this.t("print.remarkable_hint")}</span></div>`:u}
      ${e.document==="book"?i`<div class="rm"><ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon><span>${this.t("print.book_tip")}</span></div>`:u}
      <div class="row wrap">
        <button class="btn primary" ?disabled=${this.busy} @click=${()=>this.download()}><ha-icon icon="mdi:file-pdf-box"></ha-icon>${this.t("print.download")}</button>
        <button class="btn" ?disabled=${this.busy} @click=${()=>this.preview()}><ha-icon icon="mdi:refresh"></ha-icon>${this.t("print.refresh")}</button>
        ${this.admin?i`<button class="btn ghost" @click=${()=>this.saveToConfig()}><ha-icon icon="mdi:folder-download-outline"></ha-icon>${this.t("print.save_config")}</button>`:u}
      </div>
    </section>`}render(){return i`<div class="layout ${this.narrow?"narrow":""}">
      ${this.renderForm()}
      <section class="preview" aria-label=${this.t("print.preview")} aria-busy=${String(this.busy)}>
        ${this.error?i`<p class="small" style="color:var(--hl-danger)">${this.error}</p>`:u}
        ${this.pages.length?this.pages.map((e,t)=>i`<figure class="sheet" style="margin:0">${za(e)}
            <figcaption class="num">${this.t("print.page_n",{n:t+1,total:this.pages.length})}</figcaption></figure>`):i`<p class="muted">${this.busy?this.t("common.loading"):this.t("print.empty")}</p>`}
      </section>
    </div>`}};ce.styles=[L,S`
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
    `],p([m({attribute:!1})],ce.prototype,"snapshot",2),p([m({attribute:!1})],ce.prototype,"api",2),p([m({attribute:!1})],ce.prototype,"t",2),p([m()],ce.prototype,"lang",2),p([m({type:Boolean})],ce.prototype,"narrow",2),p([m({type:Boolean})],ce.prototype,"admin",2),p([f()],ce.prototype,"opts",2),p([f()],ce.prototype,"pages",2),p([f()],ce.prototype,"busy",2),p([f()],ce.prototype,"error",2),ce=p([z("hl-print-view")],ce);var Ci=new Set(["growth","yellow_leaves","wilting","no_fruit","bolting","pests","disease","too_hot","too_cold","soil","slugs","frost"]),Ai={warning:"mdi:alert-outline",tip:"mdi:lightbulb-on-outline",info:"mdi:information-outline"},Ii={pollination:"mdi:bee-flower",neighbours:"mdi:handshake-outline",placement:"mdi:white-balance-sunny",year_round:"mdi:calendar-sync-outline",soil:"mdi:shovel",eco:"mdi:leaf-circle-outline",growth:"mdi:sprout",greenhouse:"mdi:greenhouse"},q=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.mode="question";this.options=null;this.subject="plant";this.target="";this.problem="what_to_do";this.answer=null;this.busy=!1;this.advice=null;this.supplies=null;this.dismissed=new Set}connectedCallback(){super.connectedCallback(),this.load()}async load(){try{let[e,t,s]=await Promise.all([this.api.qaOptions(),this.api.advice(),this.api.supplies()]);this.options=e,this.advice=t,this.supplies=s;let a=e.targets.plant.find(n=>n.planted);this.target=a?.id??e.targets.plant[0]?.id??""}catch(e){this.toast(e.message??String(e))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}openChapter(e){this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e},bubbles:!0,composed:!0}))}problems(){let e=this.options?.subjects[this.subject]??[],t=e.filter(s=>this.mode==="problem"===Ci.has(s));return t.length?t:e}setSubject(e){this.subject=e;let t=this.options?.targets[e]??[];this.target=t.find(s=>s.planted)?.id??t[0]?.id??"",this.problems().includes(this.problem)||(this.problem=this.problems()[0]??""),this.answer=null}setMode(e){this.mode=e,this.problems().includes(this.problem)||(this.problem=this.problems()[0]??""),this.answer=null}async ask(){this.busy=!0;try{this.answer=await this.api.qaAsk(this.subject,this.problem,this.target||null)}catch(e){this.toast(e.message??String(e))}finally{this.busy=!1}}async apply(e){let t=e.action;if(t)if(t.type==="add_planting"&&t.plant_id&&t.bed_id){let s=this.plants.find($=>$.id===t.plant_id),a=this.snapshot,n=a.beds.find($=>$.id===t.bed_id);if(!s||!n)return;let r=a.analysis?.season??new Date().getFullYear(),l=zt(s,"block",n),d=a.plantings.filter($=>$.bed_id===n.id&&Re($,!!this.plants.find(T=>T.id===$.plant_id)?.perennial,r)).map($=>({x:$.x_cm,y:$.y_cm,w:$.width_cm,h:$.length_cm})),c=Je(n,l,d,a.settings.snap_cm);if(!c){this.toast(this.t("advice.no_space",{bed:n.name}));return}let g={id:Me("pl"),plant_id:s.id,bed_id:n.id,season:r,layout:"block",x_cm:c.x,y_cm:c.y,width_cm:l.w,length_cm:l.h,count:null,method:Ds(s),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:"advice"},v={zones:a.zones,beds:a.beds,plantings:[...a.plantings,g],features:a.features??[]};try{await this.api.savePlan(v,a.revision),this.dismissed=new Set([...this.dismissed,e.id]),this.toast(this.t("planner.placed",{plant:w(s,this.lang),bed:n.name}))}catch($){this.toast($.message??String($))}}else t.type==="year_transition"?this.dispatchEvent(new CustomEvent("year-transition",{detail:t.from_season,bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("navigate",{detail:t.type==="draw"?"layout":"planner",bubbles:!0,composed:!0}))}suggestionPicture(e){let t=i`<ha-icon icon=${Ii[e.kind]??Ai[e.severity]}></ha-icon>`,s=e.plants.map(n=>this.plants.find(r=>r.id===n)).find(Boolean),a=this.t(`advice.kind.${e.kind}`);return s?i`<span class="pic" title=${`${a} \xB7 ${this.t("lib.open_plant")}`} role="button" tabindex="0"
        @click=${()=>this.dispatchEvent(new CustomEvent("open-plant",{detail:s.id,bubbles:!0,composed:!0}))}
        @keydown=${n=>{n.key!=="Enter"&&n.key!==" "||(n.preventDefault(),this.dispatchEvent(new CustomEvent("open-plant",{detail:s.id,bubbles:!0,composed:!0})))}}><hl-plant-image .plant=${s} color=${j(this.families,s.family)}
        lang=${this.lang} size="thumb"></hl-plant-image><span class="badge">${t}</span></span>`:e.handbook?i`<span class="pic" title=${a}>${Rt(e.handbook,44)}<span class="badge">${t}</span></span>`:i`<span class="icon" title=${a}>${t}</span>`}answerPicture(e){let t=e.subject==="plant"?this.plants.find(s=>s.id===e.target):void 0;return t?i`<hl-plant-image class="hero" .plant=${t} color=${j(this.families,t.family)} lang=${this.lang}
        size="hero" credit></hl-plant-image>`:e.handbook?i`<span class="hero">${Rt(e.handbook,120)}</span>`:u}plantChip(e){let t=this.plants.find(s=>s.id===e);return t?i`<span class="plant-chip">${H(I(t),t.color||j(this.families,t.family),20)}${w(t,this.lang)}</span>`:i``}render(){return this.options?i`<div class="grid">
      <div class="stack">${this.renderAsk()}${this.answer?this.renderAnswer(this.answer):u}${this.renderSuggestions()}</div>
      <div class="stack">${this.renderCoverage()}${this.renderShopping()}</div>
    </div>`:i`<p class="empty">${this.t("common.loading")}</p>`}renderAsk(){let e=this.options,t=e.targets[this.subject]??[],s=t.filter(n=>n.planted),a=t.filter(n=>!n.planted);return i`<section class="card ask stack" aria-labelledby="ask-h">
      <h2 id="ask-h"><ha-icon icon="mdi:chat-question-outline"></ha-icon> ${this.t("advice.ask_title")}</h2>
      <div class="sentence">
        <span>${this.t("advice.i_have")}</span>
        <span class="modes segmented" role="group">
          <button aria-pressed=${String(this.mode==="question")} @click=${()=>this.setMode("question")}>${this.t("advice.mode.question")}</button>
          <button aria-pressed=${String(this.mode==="problem")} @click=${()=>this.setMode("problem")}>${this.t("advice.mode.problem")}</button>
        </span>
        <span>${this.t("advice.about")}</span>
        <select aria-label=${this.t("advice.subject")} @change=${n=>this.setSubject(n.target.value)}>
          ${Object.keys(e.subjects).map(n=>i`<option value=${n} ?selected=${n===this.subject}>${this.t(`advice.subject.${n}`)}</option>`)}
        </select>
        ${t.length?i`<select aria-label=${this.t("advice.target")} @change=${n=>{this.target=n.target.value,this.answer=null}}>
          ${s.length?i`<optgroup label=${this.t("advice.in_garden")}>${s.map(n=>i`<option value=${n.id} ?selected=${n.id===this.target}>${n.name}</option>`)}</optgroup>`:u}
          ${s.length?i`<optgroup label=${this.t("advice.all_plants")}>${a.map(n=>i`<option value=${n.id} ?selected=${n.id===this.target}>${n.name==="*"?this.t("advice.whole_garden"):this.subject==="tools"?this.t(`type.${n.id}`):n.name}</option>`)}</optgroup>`:a.map(n=>i`<option value=${n.id} ?selected=${n.id===this.target}>${n.name==="*"?this.t("advice.whole_garden"):this.subject==="tools"?this.t(`type.${n.id}`):n.name}</option>`)}
        </select>`:u}
        <span>:</span>
        <select aria-label=${this.t("advice.problem")} @change=${n=>{this.problem=n.target.value,this.answer=null}}>
          ${this.problems().map(n=>i`<option value=${n} ?selected=${n===this.problem}>${this.t(`advice.q.${n}`)}</option>`)}
        </select>
        <button class="btn primary" ?disabled=${this.busy} @click=${()=>this.ask()}><ha-icon icon="mdi:send"></ha-icon>${this.t("advice.ask")}</button>
      </div>
    </section>`}renderAnswer(e){let t=(s,a,n,r)=>r.length?i`<div class="section ${s}"><ha-icon icon=${a}></ha-icon><h4>${n}</h4><ul>${r.map(l=>i`<li>${l}</li>`)}</ul></div>`:u;return i`<section class="card answer" aria-live="polite">
      ${this.answerPicture(e)}
      <h3><ha-icon icon="mdi:message-reply-text-outline"></ha-icon>${e.title} – ${this.t(`advice.q.${e.problem}`)}</h3>
      ${t("status","mdi:pulse",this.t("advice.sec.status"),e.status)}
      ${t("facts","mdi:information-outline",this.t("advice.sec.facts"),e.facts)}
      ${t("causes","mdi:help-circle-outline",this.t("advice.sec.causes"),e.causes)}
      ${t("actions","mdi:checkbox-marked-circle-outline",this.t("advice.sec.actions"),e.actions)}
      ${t("remedies","mdi:leaf",this.t("advice.sec.remedies"),e.remedies)}
      ${t("prevention","mdi:shield-check-outline",this.t("advice.sec.prevention"),e.prevention)}
      ${e.tasks.length?i`<div class="section"><ha-icon icon="mdi:format-list-checks"></ha-icon><h4>${this.t("advice.sec.tasks")}</h4>
        <ul>${e.tasks.map(s=>i`<li>${s.title} <span class="xs muted">(${s.due})</span></li>`)}</ul></div>`:u}
      ${e.plants.length>1||e.subject!=="plant"?i`<div class="chips" style="margin-top:12px">${e.plants.map(s=>this.plantChip(s))}</div>`:u}
      ${e.handbook?i`<div class="row" style="margin-top:12px"><button class="btn small ghost" @click=${()=>this.openChapter(e.handbook)}>
        <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("advice.read_more")}</button></div>`:u}
    </section>`}renderSuggestions(){let e=(this.advice?.suggestions??[]).filter(t=>!this.dismissed.has(t.id));return i`<section class="card stack" aria-labelledby="sugg-h">
      <h2 id="sugg-h"><ha-icon icon="mdi:lightbulb-group-outline"></ha-icon> ${this.t("advice.suggestions")} <span class="chip">${e.length}</span></h2>
      <p class="small muted">${this.t("advice.suggestions_intro")}</p>
      ${e.length?e.map(t=>i`<article class="sugg ${t.severity}">
        ${this.suggestionPicture(t)}
        <div><b>${t.title}</b><span class="small">${t.text}</span></div>
        ${t.plants.length?i`<div class="row chips">${t.plants.slice(0,5).map(s=>this.plantChip(s))}</div>`:u}
        <div class="row wrap">
          ${t.action&&this.admin?i`<button class="btn small primary" @click=${()=>this.apply(t)}>
            ${this.t(t.action.type==="add_planting"?"advice.apply_add":t.action.type==="year_transition"?"advice.apply_transition":"advice.apply_open")}</button>`:u}
          ${t.handbook?i`<button class="btn small ghost" @click=${()=>this.openChapter(t.handbook)}>${this.t("advice.read_more")}</button>`:u}
          <button class="btn small ghost" @click=${()=>this.dismissed=new Set([...this.dismissed,t.id])}>${this.t("advice.dismiss")}</button>
        </div></article>`):i`<p class="small">${this.t("advice.none")}</p>`}
    </section>`}renderCoverage(){let e=this.advice?.coverage;if(!e)return i``;let t=new Date().getMonth(),s=a=>new Date(2026,a,1).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{month:"short"});return i`<section class="card stack" aria-labelledby="cov-h">
      <h2 id="cov-h"><ha-icon icon="mdi:calendar-sync-outline"></ha-icon> ${this.t("advice.coverage")}</h2>
      <div class="months" role="list">
        ${e.months.map((a,n)=>i`<div role="listitem" class="month ${a.length?"":"gap"} ${n===t?"now":""}"
          title=${a.map(r=>w(this.plants.find(l=>l.id===r),this.lang)).join(", ")||this.t("advice.nothing")}>
          ${s(n)}<b>${a.length}</b></div>`)}
      </div>
      <p class="xs muted">${e.gaps.length?this.t("advice.coverage_gaps"):this.t("advice.coverage_full")}</p>
    </section>`}renderShopping(){let e=this.supplies;if(!e)return i``;let t="";return i`<section class="card stack" aria-labelledby="shop-h">
      <h2 id="shop-h"><ha-icon icon="mdi:cart-outline"></ha-icon> ${this.t("advice.shopping")}</h2>
      <p class="small muted">${this.t("advice.shopping_intro")}</p>
      ${e.shopping.length?i`<table>
        ${e.shopping.map(s=>{let a=s.category!==t?i`<tr><td class="cat" colspan="3">${this.t(`advice.cat.${s.category}`)}</td></tr>`:u;return t=s.category,i`${a}<tr><td>${s.emoji} ${s.name}</td><td class="num">${s.quantity} ${s.unit}</td><td class="xs muted">${s.reason}</td></tr>`})}
      </table>`:i`<p class="small">${this.t("advice.nothing_to_buy")}</p>`}
      <details><summary class="small"><b>${this.t("advice.tools_per_task")}</b></summary>
        <table>${Object.entries(e.task_tools).filter(([,s])=>s.length).map(([s,a])=>i`<tr>
          <td>${this.t(`type.${s}`)}</td><td class="small">${a.map(n=>`${e.tools[n]?.emoji??""} ${e.tools[n]?.name??n}`).join(", ")}</td></tr>`)}</table>
      </details>
      <button class="btn small ghost" @click=${()=>this.openChapter("tools")}><ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("advice.read_tools")}</button>
    </section>`}};q.styles=[L,S`
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
    `],p([m({attribute:!1})],q.prototype,"snapshot",2),p([m({attribute:!1})],q.prototype,"plants",2),p([m({attribute:!1})],q.prototype,"families",2),p([m({attribute:!1})],q.prototype,"api",2),p([m({attribute:!1})],q.prototype,"t",2),p([m()],q.prototype,"lang",2),p([m({type:Boolean})],q.prototype,"admin",2),p([f()],q.prototype,"mode",2),p([f()],q.prototype,"options",2),p([f()],q.prototype,"subject",2),p([f()],q.prototype,"target",2),p([f()],q.prototype,"problem",2),p([f()],q.prototype,"answer",2),p([f()],q.prototype,"busy",2),p([f()],q.prototype,"advice",2),p([f()],q.prototype,"supplies",2),p([f()],q.prototype,"dismissed",2),q=p([z("hl-advice-view")],q);var Se=class extends E{constructor(){super(...arguments);this.years={};this.plants=new Map;this.families={};this.lang="en"}render(){let e=Object.entries(this.years),t=[...new Set(e.flatMap(([,k])=>Object.keys(k)))].sort();if(t.length<2)return i`<p class="small muted">${this.t("harvest.years_few")}</p>`;let s=t.map(k=>e.reduce((M,[,R])=>M+(R[k]??0),0)),a=s.indexOf(Math.max(...s)),n=640,r=170,l=8,d=8,c=24,g=26,v=(n-l-d)/t.length,$=Math.max(...s,.1),T=e.map(([k,M])=>({pid:k,y:M,total:Object.values(M).reduce((R,_)=>R+_,0)})).sort((k,M)=>M.total-k.total).slice(0,10);return i`
      <svg class="total" viewBox="0 0 ${n} ${r}" role="img" aria-label=${this.t("harvest.years_title")}>
        ${t.map((k,M)=>{let R=s[M]/$*(r-c-g),_=l+M*v+v*.18;return b`<rect x=${_} y=${r-g-R} width=${v*.64} height=${R} rx="6"
              fill=${M===a?"var(--hl-accent)":"color-mix(in srgb, var(--hl-primary) 70%, transparent)"}><title>${k}: ${s[M].toFixed(1)} kg</title></rect>
            <text x=${_+v*.32} y=${r-g-R-7} text-anchor="middle" font-size="13" font-weight="700" fill="currentColor"
              font-family="var(--hl-font-serif)">${s[M].toFixed(s[M]<10?1:0)}</text>
            <text x=${_+v*.32} y=${r-8} text-anchor="middle" font-size="12" fill="var(--hl-text-muted)">${k}${M===a?" \u2605":""}</text>`})}
      </svg>
      <div class="rows">
        ${T.map(({pid:k,y:M,total:R})=>{let _=this.plants.get(k),A=t.map(oe=>M[oe]??0),Y=Math.max(...A,.01),B=A.indexOf(Y);return i`<div class="row">
            <span>${_?H(I(_),_.color||j(this.families,_.family),22):u}</span>
            <span class="name">${w(_,this.lang)||k}</span>
            <span class="bars" style=${`grid-template-columns: repeat(${t.length}, 1fr)`}>
              ${A.map((oe,et)=>i`<span class=${oe===0?"none":et===B?"best":""} style=${`height:${Math.max(6,oe/Y*100)}%`}
                title=${`${t[et]}: ${oe.toFixed(1)} kg`}></span>`)}
            </span>
            <span class="sum"><b>${R.toFixed(1)} kg</b><small>${this.t("harvest.best_year",{year:t[B]})}</small></span>
          </div>`})}
      </div>
      <div class="legend"><span><i style="background:var(--hl-accent)"></i>${this.t("harvest.legend_best")}</span>
        <span><i style="background:color-mix(in srgb, var(--hl-primary) 55%, transparent)"></i>${this.t("harvest.legend_other")}</span></div>`}};Se.styles=[L,S`
      :host { display: block; }
      svg.total { width: 100%; max-width: 760px; height: auto; display: block; margin: 0 auto; }
      .rows { display: flex; flex-direction: column; gap: 6px; margin-top: 14px; }
      .row { display: grid; grid-template-columns: 28px 140px 1fr 70px; gap: 10px; align-items: center; }
      .name { font-weight: 600; font-size: var(--hl-fs-sm); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .bars { display: grid; gap: 4px; align-items: end; height: 34px; }
      .bars span { display: block; border-radius: 4px 4px 1px 1px; background: color-mix(in srgb, var(--hl-primary) 55%, transparent); min-height: 2px; position: relative; }
      .bars span.best { background: var(--hl-accent); }
      .bars span.none { background: var(--hl-surface-3); }
      .sum { text-align: right; font-variant-numeric: tabular-nums; font-size: var(--hl-fs-sm); }
      .sum small { display: block; color: var(--hl-text-muted); font-size: 11px; }
      .legend { display: flex; gap: 14px; font-size: 11px; color: var(--hl-text-muted); margin-top: 8px; }
      .legend i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      @media (max-width: 600px) { .row { grid-template-columns: 24px 90px 1fr 56px; } }
    `],p([m({attribute:!1})],Se.prototype,"years",2),p([m({attribute:!1})],Se.prototype,"plants",2),p([m({attribute:!1})],Se.prototype,"families",2),p([m({attribute:!1})],Se.prototype,"t",2),p([m()],Se.prototype,"lang",2),Se=p([z("hl-harvest-years")],Se);var vn=50,Fs=6,Hi={add:"mdi:plus-circle-outline",remove:"mdi:minus-circle-outline",change:"mdi:pencil-outline"},Di=["note","observation","problem","milestone"],Ni={note:"mdi:note-text-outline",observation:"mdi:eye-outline",problem:"mdi:alert-circle-outline",milestone:"mdi:flag-checkered"},Bi={ok:"ok",use_soon:"warn",expired:"bad",empty:"",unknown:""},U=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.section="diary";this.systemOnly=!1;this.waterBed="";this.waterDays=14;this.overview=null;this.filter="";this.draftPhotos=[];this.busy=!1;this.syslog=[];this.syslogMore=!1;this.syslogSystem=!0;this.quality=0}connectedCallback(){super.connectedCallback(),this.load()}updated(e){!e.has("snapshot")||!this.snapshot||e.get("snapshot")===void 0||(window.clearTimeout(this.reloadTimer),this.reloadTimer=window.setTimeout(()=>void this.load(),800))}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.reloadTimer)}async load(){try{this.overview=await this.api.records()}catch{}(this.section==="system"||this.systemOnly)&&await this.loadSyslog()}async loadSyslog(e=!1){try{let t=e?this.syslog[this.syslog.length-1]?.id??null:null,s=e?vn:Math.max(vn,this.syslog.length),a=await this.api.syslog({limit:s,before:t,include_system:this.syslogSystem});this.syslog=e?[...this.syslog,...a.entries]:a.entries,this.syslogMore=a.more}catch{}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async guard(e,t){this.busy=!0;try{return await e(),t&&this.toast(t),!0}catch(s){return this.toast(this.t("common.error",{message:s.message??String(s)})),!1}finally{this.busy=!1}}plant(e){return this.plants.find(t=>t.id===e)}icon(e,t=24){let s=this.plant(e);return s?i`<button class="plant-icon" title=${this.t("lib.open_plant")} aria-label=${w(s,this.lang)}
      @click=${()=>this.dispatchEvent(new CustomEvent("open-plant",{detail:s.id,bubbles:!0,composed:!0}))}>${H(I(s),s.color||j(this.families,s.family),t)}</button>`:i``}get season(){return this.snapshot.analysis?.season??new Date().getFullYear()}get presentPlantings(){return this.snapshot.plantings.filter(e=>Re(e,!!this.plant(e.plant_id)?.perennial,this.season))}plantingLabel(e){let t=this.snapshot.beds.find(s=>s.id===e.bed_id);return`${w(this.plant(e.plant_id),this.lang)} \xB7 ${t?.name??""}`}render(){return this.systemOnly?this.renderSystem():i`
      <div class="tabs" role="tablist">
        ${[["diary","mdi:notebook-outline"],["harvest","mdi:basket-outline"],["seeds","mdi:seed-outline"],["water","mdi:water-outline"],["report","mdi:file-chart-outline"],["system","mdi:history"]].map(([t,s])=>i`<button class="chip" role="tab" aria-selected=${String(this.section===t)} aria-pressed=${String(this.section===t)}
          @click=${()=>this.openSection(t)}><ha-icon icon=${s}></ha-icon>${this.t(`journal.${t}`)}</button>`)}
      </div>
      ${this.section==="diary"?this.renderDiary():this.section==="harvest"?this.renderHarvest():this.section==="seeds"?this.renderSeeds():this.section==="water"?this.renderWater():this.section==="report"?i`<section class="card stack"><h2><ha-icon icon="mdi:file-chart-outline"></ha-icon> ${this.t("journal.report")}</h2>
            <hl-season-report .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang}
              .plants=${new Map(this.plants.map(t=>[t.id,t]))} .families=${this.families}></hl-season-report></section>`:this.renderSystem()}
    `}openSection(e){this.section=e,e==="system"&&this.loadSyslog()}async addPhoto(e){let t=[...e.target.files??[]];for(let s of t)await this.guard(async()=>{this.draftPhotos=[...this.draftPhotos,await this.api.uploadPhoto(s)]});e.target.value=""}async saveEntry(e){e.preventDefault();let t=e.target,s=r=>t.elements.namedItem(r).value,a=s("link"),n={text:s("text"),kind:s("kind"),photos:this.draftPhotos,planting_id:a.startsWith("p:")?a.slice(2):null,bed_id:a.startsWith("b:")?a.slice(2):null};await this.guard(()=>this.api.saveJournal(n),this.t("journal.saved"))&&(t.reset(),this.draftPhotos=[])}renderDiary(){let e=[...this.snapshot.journal??[]].sort((a,n)=>a.at<n.at?1:-1),t=e.filter(a=>!this.filter||a.bed_id===this.filter||a.plant_id===this.filter),s="";return i`<div class="grid">
      <section class="card stack" aria-labelledby="new-entry">
        <h2 id="new-entry"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon> ${this.t("journal.new")}</h2>
        <form class="stack" @submit=${this.saveEntry}>
          <label class="field">${this.t("journal.text")}<textarea name="text" placeholder=${this.t("journal.placeholder")}></textarea></label>
          <div class="form-grid">
            <label class="field">${this.t("journal.kind")}<select name="kind">${Di.map(a=>i`<option value=${a}>${this.t(`journal.kind.${a}`)}</option>`)}</select></label>
            <label class="field">${this.t("journal.link")}<select name="link"><option value="">${this.t("journal.whole_garden")}</option>
              <optgroup label=${this.t("journal.beds")}>${this.snapshot.beds.map(a=>i`<option value=${`b:${a.id}`}>${a.name}</option>`)}</optgroup>
              <optgroup label=${this.t("journal.crops")}>${this.presentPlantings.map(a=>i`<option value=${`p:${a.id}`}>${this.plantingLabel(a)}</option>`)}</optgroup>
            </select></label>
          </div>
          <label class="btn small ghost" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("journal.add_photo")}
            <input type="file" accept="image/*" capture="environment" multiple hidden @change=${this.addPhoto} /></label>
          ${this.draftPhotos.length?i`<div class="photos" style="grid-column:auto">${this.draftPhotos.map(a=>i`<img src=${ve(a)} alt="" />`)}</div>`:u}
          <div class="row"><button class="btn primary" type="submit" ?disabled=${this.busy||!this.admin}>${this.t("journal.save")}</button></div>
        </form>
      </section>
      <section class="card stack" aria-labelledby="diary-h">
        <div class="row wrap"><h2 id="diary-h"><ha-icon icon="mdi:timeline-text-outline"></ha-icon> ${this.t("journal.diary")}</h2><span class="spacer"></span>
          <select aria-label=${this.t("journal.filter")} @change=${a=>this.filter=a.target.value}>
            <option value="">${this.t("journal.all")}</option>
            ${this.snapshot.beds.map(a=>i`<option value=${a.id}>${a.name}</option>`)}
            ${[...new Set(e.map(a=>a.plant_id).filter(Boolean))].map(a=>i`<option value=${a}>${w(this.plant(a),this.lang)}</option>`)}
          </select></div>
        ${t.length?i`<div class="timeline">${t.map(a=>{let n=x(a.at,this.lang,{month:"long",year:"numeric"}),r=n!==s?i`<div class="month">${n}</div>`:u;s=n;let l=this.snapshot.beds.find(d=>d.id===a.bed_id);return i`${r}<article class="entry ${a.kind}">
            <span class="icon">${a.plant_id?this.icon(a.plant_id,26):i`<ha-icon icon=${Ni[a.kind]}></ha-icon>`}</span>
            <div><div class="meta">${x(a.at,this.lang,{weekday:"short",day:"numeric",month:"short"})}
              · ${this.t(`journal.kind.${a.kind}`)}${a.plant_id?` \xB7 ${w(this.plant(a.plant_id),this.lang)}`:""}${l?` \xB7 ${l.name}`:""}${a.author?` \xB7 ${a.author}`:""}</div>
              <div>${a.text}</div></div>
            ${a.photos.length?i`<div class="photos">${a.photos.map(d=>i`<a href=${ve(d,"original")} target="_blank" rel="noopener"><img src=${ve(d)} alt="" loading="lazy" /></a>`)}</div>`:u}
            ${this.admin?i`<div style="grid-column:2"><button class="btn small ghost" @click=${()=>this.guard(()=>this.api.deleteRecord("journal",a.id))}>${this.t("common.delete")}</button></div>`:u}
          </article>`})}</div>`:i`<p class="small muted">${this.t("journal.empty")}</p>`}
      </section>
    </div>`}async saveHarvest(e){e.preventDefault();let t=e.target,s=r=>t.elements.namedItem(r).value,a=s("what");await this.guard(()=>this.api.logHarvest({planting_id:a.startsWith("p:")?a.slice(2):null,plant_id:a.startsWith("x:")?a.slice(2):null,kg:Number(s("kg"))||0,count:s("count")?Number(s("count")):null,quality:this.quality||null,day:s("day")||void 0,note:s("note")}),this.t("journal.harvest_saved"))&&(t.reset(),this.quality=0,this.load())}renderHarvest(){let e=this.overview,t=Object.values(e?.harvest_season??{}).sort((l,d)=>d.kg-l.kg),s=t.reduce((l,d)=>l+d.kg,0),a=Math.max(...t.map(l=>l.kg),.001),n=[...this.snapshot.harvest_log??[]].sort((l,d)=>l.day<d.day?1:-1).slice(0,25),r=this.presentPlantings.filter(l=>this.plant(l.plant_id)?.harvestable!==!1);return i`<div class="grid">
      <section class="card stack" aria-labelledby="h-new">
        <h2 id="h-new"><ha-icon icon="mdi:basket-plus-outline"></ha-icon> ${this.t("journal.log_harvest")}</h2>
        <form class="stack" @submit=${this.saveHarvest}>
          <label class="field">${this.t("journal.what")}<select name="what" required>
            <optgroup label=${this.t("journal.crops")}>${r.map(l=>i`<option value=${`p:${l.id}`}>${this.plantingLabel(l)}</option>`)}</optgroup>
            <optgroup label=${this.t("advice.all_plants")}>${[...this.plants].sort((l,d)=>w(l,this.lang).localeCompare(w(d,this.lang))).map(l=>i`<option value=${`x:${l.id}`}>${w(l,this.lang)}</option>`)}</optgroup>
          </select></label>
          <div class="form-grid">
            <label class="field">${this.t("journal.kg")}<input name="kg" type="number" min="0" step="0.05" inputmode="decimal" /></label>
            <label class="field">${this.t("journal.count")}<input name="count" type="number" min="0" step="1" inputmode="numeric" /></label>
            <label class="field">${this.t("journal.day")}<hl-date-input name="day" .value=${this.snapshot.analysis?.today??""} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}></hl-date-input></label>
            <div class="field">${this.t("journal.quality")}<span class="stars" role="group">${[1,2,3,4,5].map(l=>i`<button type="button" aria-label=${String(l)}
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
        ${t.map(l=>{let d=e?.learned_yields[l.plant_id],c=this.plant(l.plant_id)?.yield_kg_m2;return i`<div class="crop">${this.icon(l.plant_id,26)}
            <div><b>${w(this.plant(l.plant_id),this.lang)}</b>
              <div class="bar" style=${`width:${Math.max(l.kg/a*100,2)}%`}></div>
              ${d!=null?i`<span class="xs muted">${this.t("journal.yield",{kg:d,db:c??"\u2013"})}</span>`:u}</div>
            <span class="num"><b>${l.kg.toFixed(1)} kg</b>${l.count?i`<br /><span class="xs muted">${l.count} ×</span>`:u}</span></div>`})}
        ${n.length?i`<h3>${this.t("journal.recent")}</h3><table>
          <tr><th>${this.t("journal.day")}</th><th>${this.t("lib.plant")}</th><th class="num">kg</th><th class="num">#</th><th></th></tr>
          ${n.map(l=>i`<tr><td>${x(l.day,this.lang)}</td><td>${w(this.plant(l.plant_id),this.lang)}${l.quality?` ${"\u2605".repeat(l.quality)}`:""}</td>
            <td class="num">${l.kg?l.kg.toFixed(2):"\u2013"}</td><td class="num">${l.count??"\u2013"}</td>
            <td class="num">${this.admin?i`<button class="icon-btn" aria-label=${this.t("common.delete")} @click=${()=>this.guard(()=>this.api.deleteRecord("harvest",l.id)).then(()=>this.load())}>
              <ha-icon icon="mdi:delete-outline"></ha-icon></button>`:u}</td></tr>`)}
        </table>`:i`<p class="small muted">${this.t("journal.no_harvest")}</p>`}
      </section>
      <section class="card stack" style="grid-column: 1 / -1" aria-labelledby="h-years">
        <h2 id="h-years"><ha-icon icon="mdi:chart-timeline-variant"></ha-icon> ${this.t("harvest.years_title")}</h2>
        <hl-harvest-years .years=${e?.harvest_years??{}} .plants=${new Map(this.plants.map(l=>[l.id,l]))} .families=${this.families}
          .t=${this.t} lang=${this.lang}></hl-harvest-years>
      </section>
    </div>`}async saveSeed(e){e.preventDefault();let t=e.target,s=n=>t.elements.namedItem(n).value,a={plant_id:s("plant"),variety:s("variety"),year:s("year")?Number(s("year")):null,quantity:Number(s("quantity")||1),unit:s("unit"),source:s("source")};await this.guard(()=>this.api.saveSeed(a),this.t("journal.seed_saved"))&&(t.reset(),this.load())}renderSeeds(){let e=this.overview?.seeds,t=[...this.plants].sort((s,a)=>w(s,this.lang).localeCompare(w(a,this.lang)));return i`<div class="grid">
      <section class="card stack" aria-labelledby="s-new">
        <h2 id="s-new"><ha-icon icon="mdi:seed-plus-outline"></ha-icon> ${this.t("journal.add_seed")}</h2>
        <form class="stack" @submit=${this.saveSeed}>
          <label class="field">${this.t("lib.plant")}<select name="plant" required>${t.map(s=>i`<option value=${s.id}>${w(s,this.lang)}</option>`)}</select></label>
          <div class="form-grid">
            <label class="field">${this.t("journal.variety")}<input name="variety" /></label>
            <label class="field">${this.t("journal.year")}<input name="year" type="number" min="1990" max="2100" .value=${String(this.season)} /></label>
            <label class="field">${this.t("journal.quantity")}<input name="quantity" type="number" min="0" step="0.5" value="1" /></label>
            <label class="field">${this.t("journal.unit")}<select name="unit">${["packet","seeds","g"].map(s=>i`<option value=${s}>${this.t(`journal.unit.${s}`)}</option>`)}</select></label>
            <label class="field full">${this.t("journal.source")}<input name="source" placeholder=${this.t("journal.source_hint")} /></label>
          </div>
          <div class="row"><button class="btn primary" type="submit" ?disabled=${this.busy||!this.admin}>${this.t("journal.save")}</button></div>
        </form>
        ${e?.missing.length?i`<div class="finding warning"><ha-icon icon="mdi:cart-outline"></ha-icon><span>${this.t("journal.seed_missing")}:
          ${e.missing.map(s=>w(this.plant(s),this.lang)).join(", ")}</span></div>`:u}
        <p class="xs muted">${this.t("journal.seed_hint")}</p>
      </section>
      <section class="card stack" aria-labelledby="s-box">
        <h2 id="s-box"><ha-icon icon="mdi:archive-outline"></ha-icon> ${this.t("journal.seed_box")} <span class="chip">${e?.packets.length??0}</span></h2>
        ${e?.packets.length?i`<table>
          <tr><th>${this.t("lib.plant")}</th><th>${this.t("journal.variety")}</th><th class="num">${this.t("journal.year")}</th><th class="num">${this.t("journal.quantity")}</th><th>${this.t("journal.status")}</th><th></th></tr>
          ${e.packets.map(s=>i`<tr>
            <td>${this.icon(s.plant_id,18)} ${w(this.plant(s.plant_id),this.lang)}${s.needed?i` <span class="chip ok" title=${this.t("journal.needed")}>✓</span>`:u}</td>
            <td>${s.variety||"\u2013"}</td><td class="num">${s.year??"\u2013"}</td><td class="num">${s.quantity} ${this.t(`journal.unit.${s.unit}`)}</td>
            <td><span class="chip ${Bi[s.status]}">${this.t(`journal.seed.${s.status}`,{year:s.use_by??""})}</span></td>
            <td class="num">${this.admin?i`<button class="icon-btn" aria-label=${this.t("common.delete")} @click=${()=>this.guard(()=>this.api.deleteRecord("seed",s.id)).then(()=>this.load())}>
              <ha-icon icon="mdi:delete-outline"></ha-icon></button>`:u}</td></tr>`)}
        </table>`:i`<p class="small muted">${this.t("journal.no_seeds")}</p>`}
      </section>
    </div>`}renderWater(){let e=this.overview?.water,t=this.snapshot.settings.water,s=!!(t?.meter_entity||t?.butt_level_entity),a=Math.max(...(e?.per_day??[]).map(n=>n.liters),1);return i`<section class="card stack" aria-labelledby="w-h">
      <h2 id="w-h"><ha-icon icon="mdi:water-outline"></ha-icon> ${this.t("journal.water")}</h2>
      ${s?u:i`<div class="finding info"><ha-icon icon="mdi:information-outline"></ha-icon><span>${this.t("journal.water_setup")}</span></div>`}
      <div class="tiles">
        <div class="tile">${this.t("journal.water_week")}<b>${e?.week_l!=null?`${e.week_l} L`:"\u2013"}</b></div>
        <div class="tile">${this.t("journal.water_season")}<b>${e?.season_l!=null?`${e.season_l} L`:"\u2013"}</b></div>
        <div class="tile">${this.t("journal.rain_available")}<b>${e?.rain_available_l!=null?`${e.rain_available_l} L`:e?.butt_pct!=null?`${e.butt_pct}%`:"\u2013"}</b></div>
      </div>
      ${e?.per_day.length?i`<h3>${this.t("journal.per_day")}</h3><div class="days" role="img" aria-label=${this.t("journal.per_day")}>
        ${e.per_day.map(n=>i`<div title=${`${n.day}: ${n.liters} L`} style=${`height:${n.liters/a*100}%`}></div>`)}</div>`:u}
      <p class="xs muted">${this.t("journal.water_hint")}</p>
    </section>
    ${this.renderBedWater()}`}renderBedWater(){let e=this.snapshot.beds.filter(s=>s.irrigation_entity||s.sensors?.soil_moisture);if(!e.length)return u;let t=e.find(s=>s.id===this.waterBed)??e[0];return i`<section class="card stack" aria-labelledby="wb-h">
      <h2 id="wb-h"><ha-icon icon="mdi:chart-bell-curve"></ha-icon> ${this.t("water.per_bed")}</h2>
      <div class="row wrap">
        <select style="width:auto" aria-label=${this.t("task.bed")} @change=${s=>this.waterBed=s.target.value}>
          ${e.map(s=>i`<option value=${s.id} ?selected=${s.id===t.id}>${s.name}</option>`)}</select>
        ${[7,14,30].map(s=>i`<button class="chip" aria-pressed=${String(this.waterDays===s)} @click=${()=>this.waterDays=s}>${this.t("water.days",{n:s})}</button>`)}
      </div>
      <hl-water-chart .bed=${t} .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} days=${this.waterDays}></hl-water-chart>
      <p class="xs muted">${this.t("water.chart_hint")}</p>
    </section>`}async undo(e){if(confirm(this.t("syslog.confirm",{what:this.entryTitle(e)}))){this.busy=!0;try{let t=await this.api.undo(e.id);!t.ok&&t.conflicts.length&&!t.problems.length&&confirm(this.t("syslog.conflict",{n:t.conflicts.length}))&&(t=await this.api.undo(e.id,!0)),t.ok?this.toast(this.t("syslog.undone")):t.problems.length&&this.toast(this.t("syslog.blocked")),await this.loadSyslog()}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}finally{this.busy=!1}}}summaryText(e){let t;e.col==="settings"?t=e.key??"":e.plant_id&&(e.col==="plantings"||!e.name)?t=w(this.plant(e.plant_id),this.lang)||e.plant_id:t=e.name??"";let s=[e.bed,e.col==="plantings"&&e.season?this.t("common.season",{year:e.season}):null].filter(Boolean).join(", ");return`${this.t(`syslog.col.${e.col}`)}: ${t}${s?` (${s})`:""}`}entryTitle(e){if(e.source==="error")return`${this.t("syslog.error")}: ${e.summary[0]?.name??""}`;if(e.undo_of)return this.t("syslog.reason.undo");let t=e.summary[0],a=new Set(e.summary.map(n=>n.op)).size===1?this.t(`syslog.op.${t.op}`):this.t("syslog.op.mixed");return e.summary.length===1?`${a} \u2013 ${this.summaryText(t)}`:this.t("syslog.n_changes",{verb:a,n:e.count})}renderSystem(){let e=t=>new Date(t).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return i`<section class="card stack" aria-labelledby="sys-h">
      <h2 id="sys-h"><ha-icon icon="mdi:history"></ha-icon> ${this.t("journal.system")}</h2>
      <p class="small muted">${this.t("syslog.intro")}</p>
      <label class="row small"><input type="checkbox" .checked=${this.syslogSystem}
        @change=${t=>{this.syslogSystem=t.target.checked,this.loadSyslog()}} />${this.t("syslog.show_system")}</label>
      ${this.syslog.length?u:i`<p class="small muted">${this.t("syslog.empty")}</p>`}
      <div class="stack" style="gap:8px" role="list">
        ${this.syslog.map(t=>i`<article role="listitem" class="log ${t.source} ${t.undone_by?"undone":""}">
          <div class="icon"><ha-icon icon=${t.source==="error"?"mdi:alert-circle-outline":t.undo_of?"mdi:undo-variant":t.source==="system"?"mdi:robot-outline":"mdi:account-edit-outline"}></ha-icon></div>
          <div>
            <strong>${this.entryTitle(t)}</strong>
            <div class="meta">${e(t.at)} · ${t.source==="system"?this.t("syslog.by_system"):t.user??this.t("syslog.by_unknown")}
              · ${t.source==="error"?t.reason:this.t(`syslog.reason.${t.reason}`)}${t.undone_by?i` · <span class="chip warn">${this.t("syslog.is_undone")}</span>`:u}</div>
            ${t.summary.length>1?i`<ul>
              ${t.summary.slice(0,Fs).map(s=>i`<li><ha-icon icon=${Hi[s.op]}></ha-icon>${this.summaryText(s)}</li>`)}
              ${t.summary.length>Fs?i`<li class="muted">${this.t("syslog.and_more",{n:t.summary.length-Fs})}</li>`:u}
            </ul>`:u}
          </div>
          ${this.admin&&!t.undone_by&&t.source!=="error"&&t.count>0?i`<button class="btn small ghost" ?disabled=${this.busy} @click=${()=>this.undo(t)}
            aria-label=${`${this.t("syslog.undo")}: ${this.entryTitle(t)}`}><ha-icon icon="mdi:undo"></ha-icon>${this.t("syslog.undo")}</button>`:i`<span></span>`}
        </article>`)}
      </div>
      ${this.syslogMore?i`<div class="row"><button class="btn small" @click=${()=>this.loadSyslog(!0)}>${this.t("syslog.more")}</button></div>`:u}
    </section>`}};U.styles=[L,S`
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
    `],p([m({attribute:!1})],U.prototype,"snapshot",2),p([m({attribute:!1})],U.prototype,"plants",2),p([m({attribute:!1})],U.prototype,"families",2),p([m({attribute:!1})],U.prototype,"api",2),p([m({attribute:!1})],U.prototype,"t",2),p([m()],U.prototype,"lang",2),p([m({type:Boolean})],U.prototype,"admin",2),p([m()],U.prototype,"section",2),p([m({type:Boolean})],U.prototype,"systemOnly",2),p([f()],U.prototype,"waterBed",2),p([f()],U.prototype,"waterDays",2),p([f()],U.prototype,"overview",2),p([f()],U.prototype,"filter",2),p([f()],U.prototype,"draftPhotos",2),p([f()],U.prototype,"busy",2),p([f()],U.prototype,"syslog",2),p([f()],U.prototype,"syslogMore",2),p([f()],U.prototype,"syslogSystem",2),p([f()],U.prototype,"quality",2),U=p([z("hl-journal-view")],U);var Oi={error:"mdi:alert-octagon-outline",warning:"mdi:alert-outline",info:"mdi:information-outline"},K=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.section="check";this.result=null;this.loading=!1;this.plantId="";this.season=0;this.matchZone=!0;this.explained=null;this.fixing="";this.plantMap=new Map}connectedCallback(){super.connectedCallback(),this.load()}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.reloadTimer)}willUpdate(e){e.has("plants")&&(this.plantMap=new Map(this.plants.map(t=>[t.id,t]))),e.has("snapshot")&&e.get("snapshot")!==void 0&&(window.clearTimeout(this.reloadTimer),this.reloadTimer=window.setTimeout(()=>void this.load(),800)),!this.season&&this.snapshot&&(this.season=this.snapshot.layout_season??this.snapshot.analysis?.season??new Date().getFullYear())}async load(){this.loading=!0;try{this.result=await this.api.analysis()}catch{}finally{this.loading=!1}}async explain(){if(this.plantId)try{this.explained=await this.api.explain(this.plantId,this.season,this.matchZone)}catch(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e.message},bubbles:!0,composed:!0}))}}async fix(e,t){this.fixing=t;try{await this.api.fixIssue(e),this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("analysis.fixed")},bubbles:!0,composed:!0})),await this.load()}catch(s){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("common.error",{message:s.message})},bubbles:!0,composed:!0}))}finally{this.fixing=""}}async exportDiagnosis(){let e=null;try{e=(await this.api.syslog({limit:200,include_system:!0})).entries}catch{}let t=this.snapshot,s={exported_at:new Date().toISOString(),lang:this.lang,panel:{user_agent:navigator.userAgent,url_path:location.pathname},garden:{revision:t.revision,layout_season:t.layout_season??null,plan_seasons:Object.keys(t.layouts??{}),archived_plans:t.archived_plans??[],zones:t.zones.length,beds:t.beds.length,plantings:t.plantings.length,transition_due:t.transition_due??null,diagnosis:t.diagnosis??null},analysis:this.result,system_log:e},a=t.analysis?.today??new Date().toISOString().slice(0,10);Ae(`hortulus-diagnose-${a}.json`,JSON.stringify(s,null,2),"application/json")}showIssue(e){let t=e.refs.planting?.[0],s=Number(e.params.season??this.snapshot.layout_season);t&&this.dispatchEvent(new CustomEvent("focus-planting",{detail:{planting_id:t,season:s},bubbles:!0,composed:!0}))}go(e){this.dispatchEvent(new CustomEvent("navigate",{detail:e,bubbles:!0,composed:!0}))}render(){let e=[["check","mdi:stethoscope"],["why","mdi:help-circle-outline"],["compare","mdi:compare-horizontal"],["errors","mdi:alert-circle-outline"],["log","mdi:history"]],t=this.result?.errors.length??0;return i`
      <div class="tabs" role="tablist">
        ${e.map(([s,a])=>i`<button class="chip" role="tab" aria-selected=${String(this.section===s)} aria-pressed=${String(this.section===s)}
          @click=${()=>this.section=s}><ha-icon icon=${a}></ha-icon>${this.t(`analysis.${s}`)}${s==="errors"&&t?i` <span class="chip bad">${t}</span>`:u}</button>`)}
      </div>
      ${this.section==="check"?this.renderCheck():this.section==="why"?this.renderWhy():this.section==="errors"?this.renderErrors():this.section==="compare"?i`<section class="card stack"><h2><ha-icon icon="mdi:compare-horizontal"></ha-icon> ${this.t("compare.title")}</h2>
            <p class="small muted">${this.t("compare.intro")}</p>
            <hl-plan-compare .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} .plants=${this.plantMap} .families=${this.families}></hl-plan-compare></section>`:i`<hl-journal-view systemOnly .snapshot=${this.snapshot} .plants=${this.plants} .families=${this.families} .api=${this.api}
            .t=${this.t} lang=${this.lang} ?admin=${this.admin}></hl-journal-view>`}`}issueText(e){return this.t(`analysis.issue.${e.code}`,e.params)}renderCheck(){let e=this.result;if(!e)return i`<p class="muted">${this.t("common.loading")}</p>`;let t=s=>{let a=`${s.code}:${JSON.stringify(s.refs)}`,n=s.fixable&&this.admin?i`<button class="btn small primary" ?disabled=${this.fixing===a} @click=${()=>this.fix(s,a)}>
        <ha-icon icon="mdi:auto-fix"></ha-icon>${this.t(`analysis.fix.${s.code}`)}</button>`:u,r=s.refs.planting?.length===1||s.refs.planting?.length&&s.code==="plantings_overlap"?i`<button class="btn small ghost" @click=${()=>this.showIssue(s)}>🗺 ${this.t("crops.show_on_map")}</button>`:u;return i`${n}${r}${this.navAction(s)}`};return this.renderCheckBody(e,t)}navAction(e){return e.code==="transition_due"?i`<button class="btn small" @click=${()=>this.dispatchEvent(new CustomEvent("year-transition",{bubbles:!0,composed:!0}))}>${this.t("advice.apply_transition")}</button>`:e.code==="season_without_plan"||e.code.startsWith("bed_")||e.code==="zone_without_beds"?i`<button class="btn small" @click=${()=>this.go("layout")}>${this.t("layout.edit")}</button>`:e.code.startsWith("planting")||e.code==="plantings_overlap"?i`<button class="btn small" @click=${()=>this.go("planner")}>${this.t("analysis.to_planner")}</button>`:u}renderCheckBody(e,t){return i`<section class="card stack" aria-labelledby="chk">
      <h2 id="chk"><ha-icon icon="mdi:stethoscope"></ha-icon> ${this.t("analysis.check_title")}
        <button class="btn small ghost" ?disabled=${this.loading} @click=${()=>this.load()}><ha-icon icon="mdi:refresh"></ha-icon>${this.t("analysis.recheck")}</button>
        <button class="btn small ghost" @click=${()=>this.exportDiagnosis()}><ha-icon icon="mdi:download"></ha-icon>${this.t("analysis.export")}</button></h2>
      <p class="small muted">${this.t("analysis.check_intro")}</p>
      <div class="tiles">${Object.entries(e.counts).map(([s,a])=>i`<div class="tile">${this.t(`analysis.count.${s}`)}<b>${a}</b></div>`)}</div>
      ${e.issues.length?i`<div class="stack" style="gap:8px">${e.issues.map(s=>i`<div class="issue ${s.severity}">
        <ha-icon icon=${Oi[s.severity]}></ha-icon>
        <div><b>${this.issueText(s)}</b><div class="why">${this.t(`analysis.issue.${s.code}.why`,s.params)}</div>
          <div class="row wrap" style="margin-top:6px">${t(s)}</div></div>
      </div>`)}</div>`:i`<div class="finding info"><ha-icon icon="mdi:check-circle-outline"></ha-icon><span>${this.t("analysis.all_good")}</span></div>`}
    </section>`}renderWhy(){let e=[...this.plants].sort((n,r)=>w(n,this.lang).localeCompare(w(r,this.lang))),t=this.plantMap.get(this.plantId),s=[this.season-1,this.season,this.season+1],a=this.explained;return i`<section class="card stack" aria-labelledby="why">
      <h2 id="why"><ha-icon icon="mdi:help-circle-outline"></ha-icon> ${this.t("analysis.why_title")}</h2>
      <p class="small muted">${this.t("analysis.why_intro")}</p>
      <div class="pick">
        ${t?i`<hl-plant-image .plant=${t} color=${j(this.families,t.family)} lang=${this.lang} size="thumb"></hl-plant-image>`:u}
        <label class="field">${this.t("lib.plant")}
          <select @change=${n=>{this.plantId=n.target.value,this.explained=null,this.explain()}}>
            <option value="">–</option>${e.map(n=>i`<option value=${n.id} ?selected=${n.id===this.plantId}>${w(n,this.lang)}</option>`)}
          </select></label>
        <label class="field">${this.t("planner.season")}
          <select @change=${n=>{this.season=Number(n.target.value),this.explain()}}>
            ${s.map(n=>i`<option value=${n} ?selected=${n===this.season}>${this.t("common.season",{year:n})}</option>`)}
          </select></label>
        <label class="row small"><input type="checkbox" .checked=${this.matchZone}
          @change=${n=>{this.matchZone=n.target.checked,this.explain()}} />${this.t("autofill.pref.match_zone_type")}</label>
      </div>
      ${a?a.has_plan?a.beds.length?i`<div>${a.beds.map(n=>i`<div class="bed ${n.ok?"ok":"no"}">
            <ha-icon icon=${n.ok?"mdi:check-circle-outline":"mdi:close-circle-outline"}></ha-icon>
            <div><b>${n.bed}</b> <span class="xs muted">${n.zone} · ${this.t("analysis.free",{m2:n.free_m2})}</span>
              ${n.ok&&!n.warnings.length?i`<div class="small">${this.t("analysis.fits")}</div>`:u}
              ${n.reasons.length||n.warnings.length?i`<ul>
                ${n.reasons.map(r=>i`<li>${Ve(r,this.t,this.lang,this.plantMap)}</li>`)}
                ${n.warnings.map(r=>i`<li class="muted">${this.t("analysis.warning")}: ${Ve(r,this.t,this.lang,this.plantMap)}</li>`)}
              </ul>`:u}
            </div></div>`)}</div>`:i`<p class="small muted">${this.t("analysis.no_beds")}</p>`:i`<div class="finding warning"><ha-icon icon="mdi:floor-plan"></ha-icon><span>${this.t("layout.none_title",{season:a.season})}</span></div>`:u}
    </section>`}renderErrors(){let e=this.result?.errors??[],t=s=>new Date(s).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});return i`<section class="card stack" aria-labelledby="errs">
      <h2 id="errs"><ha-icon icon="mdi:alert-circle-outline"></ha-icon> ${this.t("analysis.errors_title")}</h2>
      <p class="small muted">${this.t("analysis.errors_intro")}</p>
      ${e.length?i`<div>${e.map(s=>i`<div class="err">
        <b>${this.t(`analysis.error.${s.summary[0]?.key??"unexpected"}`)}</b> <span class="xs muted">${t(s.at)} · ${s.user??""} · <code>${s.reason}</code></span>
        <div class="small">${s.summary[0]?.name??""}</div>
      </div>`)}</div>`:i`<div class="finding info"><ha-icon icon="mdi:check-circle-outline"></ha-icon><span>${this.t("analysis.no_errors")}</span></div>`}
    </section>`}};K.styles=[L,S`
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
    `],p([m({attribute:!1})],K.prototype,"snapshot",2),p([m({attribute:!1})],K.prototype,"plants",2),p([m({attribute:!1})],K.prototype,"families",2),p([m({attribute:!1})],K.prototype,"api",2),p([m({attribute:!1})],K.prototype,"t",2),p([m()],K.prototype,"lang",2),p([m({type:Boolean})],K.prototype,"admin",2),p([m()],K.prototype,"section",2),p([f()],K.prototype,"result",2),p([f()],K.prototype,"loading",2),p([f()],K.prototype,"plantId",2),p([f()],K.prototype,"season",2),p([f()],K.prototype,"matchZone",2),p([f()],K.prototype,"explained",2),p([f()],K.prototype,"fixing",2),K=p([z("hl-analysis-view")],K);var Fi=864e5,Us=h=>Date.parse(`${h}T12:00:00`),ue=class extends E{constructor(){super(...arguments);this.rows=[];this.plants=new Map;this.families={};this.lang="en";this.season=0;this.today="";this.south=!1;this.admin=!0;this.drag=null}get start(){return Us(this.south?`${this.season}-07-01`:`${this.season}-01-01`)}get span(){return Us(this.south?`${this.season+1}-07-01`:`${this.season+1}-01-01`)-this.start}pct(e){return Math.max(0,Math.min(100,(Us(e)-this.start)/this.span*100))}movable(e){return this.admin&&e.status==="planned"}down(e,t){if(!this.movable(t.planting))return;let s=e.currentTarget.parentElement;e.currentTarget.setPointerCapture(e.pointerId),this.drag={id:t.planting.id,startX:e.clientX,days:0,width:s.getBoundingClientRect().width}}move(e){if(!this.drag)return;let t=Math.round((e.clientX-this.drag.startX)/this.drag.width*(this.span/Fi));t!==this.drag.days&&(this.drag={...this.drag,days:t})}up(e){let t=this.drag;if(this.drag=null,!t||t.id!==e.planting.id||!t.days)return;let s=e.timeline,a={},n=e.planting.sow_date??s?.sow_date,r=e.planting.transplant_date??s?.transplant_date;n&&(a.sow_date=D(n,t.days)),r&&(a.transplant_date=D(r,t.days)),!n&&!r&&s&&(a.sow_date=D(s.in_ground,t.days)),this.dispatchEvent(new CustomEvent("move-planting",{detail:{row:e,changes:a,days:t.days}}))}render(){let e=Array.from({length:12},(a,n)=>new Date(this.start+(n+.5)*(this.span/12)).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{month:"short"})),t=new Map;for(let a of this.rows.filter(n=>n.timeline)){let n=a.bed??"\u2013";t.set(n,[...t.get(n)??[],a])}let s=this.today?this.pct(this.today):-1;return i`<div class="wrap"><div class="chart">
      <div class="months"><span></span><div class="m">${e.map(a=>i`<span>${a}</span>`)}</div></div>
      ${[...t.entries()].map(([a,n])=>i`
        <div class="bed">${a}</div>
        ${n.sort((r,l)=>r.timeline.in_ground<l.timeline.in_ground?-1:1).map(r=>{let l=r.timeline,d=this.plants.get(r.planting.plant_id),c=d?.color||j(this.families,d?.family),g=this.drag?.id===r.planting.id?this.drag.days:0,v=B=>B?D(B,g):null,$=v(l.sow_date)??v(l.in_ground),T=v(l.in_ground),k=v(l.harvest_start),M=v(l.harvest_end),R=this.pct($),_=this.pct(M),A=Math.max(_-R,.6),Y=(B,oe)=>`${Math.max(this.pct(oe)-this.pct(B),0)/A*100}%`;return i`<div class="row">
            <span class="label">${d?H(I(d),c,20):u}${w(d,this.lang)||r.planting.plant_id}</span>
            <div class="track">
              ${s>=0?i`<span class="today" style=${`left:${s}%`}></span>`:u}
              <div class="bar ${this.movable(r.planting)?"movable":""} ${g?"dragging":""}" style=${`left:${R}%;width:${A}%;--c:${c}`}
                title=${`${x($,this.lang)} \u2192 ${x(M,this.lang)}${this.movable(r.planting)?` \xB7 ${this.t("gantt.drag")}`:""}`}
                @pointerdown=${B=>this.down(B,r)} @pointermove=${B=>this.move(B)}
                @pointerup=${()=>this.up(r)} @pointercancel=${()=>this.drag=null}>
                <span class="nursery" style=${`width:${Y($,T)}`}></span>
                <span class="grow" style=${`width:${Y(T,k)}`}></span>
                <span class="harvest" style=${`width:${Y(k,M)}`}></span>
                ${g?i`<span class="tip">${g>0?"+":""}${g} d · ${x($,this.lang)}</span>`:u}
              </div>
            </div>
          </div>`})}`)}
    </div></div>
    <div class="legend">
      <span><i class="nursery"></i>${this.t("gantt.nursery")}</span><span><i class="grow"></i>${this.t("gantt.grow")}</span>
      <span><i class="harvest"></i>${this.t("gantt.harvest")}</span><span>${this.t("gantt.hint")}</span>
    </div>`}};ue.styles=[L,S`
      :host { display: block; }
      .wrap { overflow-x: auto; }
      .chart { position: relative; min-width: 760px; }
      .months { display: grid; grid-template-columns: 180px 1fr; position: sticky; top: 0; z-index: 1; background: var(--hl-surface); }
      .months .m { display: grid; grid-template-columns: repeat(12, 1fr); border-bottom: 1px solid var(--hl-border); }
      .months .m span { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--hl-text-muted); padding: 6px 4px;
        border-left: 1px solid color-mix(in srgb, var(--hl-border) 60%, transparent); }
      .bed { font-family: var(--hl-font-serif); font-weight: 700; font-size: 15px; padding: 14px 0 4px; }
      .row { display: grid; grid-template-columns: 180px 1fr; align-items: center; min-height: 34px; }
      .label { display: flex; align-items: center; gap: 8px; font-size: var(--hl-fs-sm); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding-right: 8px; }
      .track { position: relative; height: 34px;
        background: repeating-linear-gradient(90deg, transparent 0, transparent calc(100% / 12 - 1px), color-mix(in srgb, var(--hl-border) 55%, transparent) calc(100% / 12 - 1px), color-mix(in srgb, var(--hl-border) 55%, transparent) calc(100% / 12)); }
      .bar { position: absolute; top: 7px; height: 20px; border-radius: 10px; display: flex; overflow: hidden; box-shadow: var(--hl-shadow-1);
        transition: box-shadow var(--hl-dur) var(--hl-ease); touch-action: none; }
      .bar.movable { cursor: grab; }
      .bar.movable:hover { box-shadow: var(--hl-shadow-2); }
      .bar.dragging { cursor: grabbing; box-shadow: var(--hl-shadow-3); opacity: 0.92; }
      .bar span { height: 100%; }
      .nursery { background: repeating-linear-gradient(135deg, color-mix(in srgb, var(--c) 30%, #fff) 0 4px, color-mix(in srgb, var(--c) 18%, #fff) 4px 8px); }
      .grow { background: color-mix(in srgb, var(--c) 70%, #fff); }
      .harvest { background: var(--c); }
      .today { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--hl-danger); opacity: 0.6; pointer-events: none; }
      .tip { position: absolute; top: -22px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 11px; font-weight: 700;
        background: var(--hl-text); color: var(--hl-surface); padding: 2px 8px; border-radius: 999px; }
      .legend { display: flex; gap: 16px; flex-wrap: wrap; font-size: 12px; color: var(--hl-text-muted); margin-top: 12px; }
      .legend i { display: inline-block; width: 22px; height: 10px; border-radius: 5px; margin-right: 6px; vertical-align: -1px; --c: var(--hl-primary); }
    `],p([m({attribute:!1})],ue.prototype,"rows",2),p([m({attribute:!1})],ue.prototype,"plants",2),p([m({attribute:!1})],ue.prototype,"families",2),p([m({attribute:!1})],ue.prototype,"t",2),p([m()],ue.prototype,"lang",2),p([m({type:Number})],ue.prototype,"season",2),p([m()],ue.prototype,"today",2),p([m({type:Boolean})],ue.prototype,"south",2),p([m({type:Boolean})],ue.prototype,"admin",2),p([f()],ue.prototype,"drag",2),ue=p([z("hl-crop-gantt")],ue);function Gs(h){let o=new Date(`${h}T12:00:00`);return D(h,-((o.getDay()+6)%7))}var Z=class extends E{constructor(){super(...arguments);this.plants=new Map;this.families={};this.rows=[];this.lang="en";this.season=0;this.view="weeks";this.admin=!0;this.result=null;this.weeksAhead=8;this.loadedFor=0;this.error="";this.todoList="";this.todoBusy=!1;this.todoMsg=""}willUpdate(){if(this.view!=="weeks"&&this.api&&this.season!==this.loadedFor){let e=this.season;this.loadedFor=e,this.result=null,this.error="",this.api.planning(e).then(t=>{e===this.season&&(this.result=t)}).catch(t=>{e===this.season&&(this.loadedFor=0,this.error=t.message??String(t))})}}plant(e){let t=this.plants.get(e);return i`<button class="plant-btn" title=${this.t("lib.open_plant")}
      @click=${()=>this.dispatchEvent(new CustomEvent("open-plant",{detail:e,bubbles:!0,composed:!0}))}>
      ${t?H(I(t),t.color||j(this.families,t.family),20):u}<span>${w(t,this.lang)||e}</span></button>`}render(){return this.view==="weeks"?this.renderWeeks():this.error?i`<p class="small">${this.t("common.error",{message:this.error})}</p>`:this.result?this.view==="seeds"?this.renderSeeds(this.result):this.view==="follow"?this.renderFollow(this.result):this.renderHarvest(this.result):i`<p class="muted">${this.t("common.loading")}</p>`}items(){let e=[],t={planned:0,sown_indoors:1,sown:2,transplanted:3,harvesting:4,finished:5,failed:5};for(let s of this.rows){let a=s.planting,n=s.timeline;if(!n||a.status==="failed"||a.status==="finished")continue;let r=t[a.status]??0,l=a.season<this.season,d=a.sow_date??n.sow_date;!l&&a.method==="indoor_sow"&&d&&e.push({row:s,action:"sow_indoor",date:d,done:!!a.sown_on||r>=1}),!l&&a.method==="direct_sow"&&d&&e.push({row:s,action:"sow_direct",date:d,done:!!a.sown_on||r>=2});let c=a.transplant_date??n.transplant_date;!l&&a.method!=="direct_sow"&&c&&e.push({row:s,action:"transplant",date:c,done:!!a.transplanted_on||r>=3}),n.harvest_start&&e.push({row:s,action:"harvest",date:n.harvest_start,done:!!a.harvest_started_on||r>=4})}return e}async done(e){let t=this.snapshot.analysis?.today??new Date().toISOString().slice(0,10),s=e.action==="sow_indoor"?{sown_on:t,status:"sown_indoors"}:e.action==="sow_direct"?{sown_on:t,status:"sown"}:e.action==="transplant"?{transplanted_on:t,status:"transplanted"}:{harvest_started_on:t,status:"harvesting"};try{await this.api.updatePlanting(e.row.planting.id,s),this.dispatchEvent(new CustomEvent("crops-changed",{bubbles:!0,composed:!0}))}catch(a){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("common.error",{message:a.message})},bubbles:!0,composed:!0}))}}renderWeeks(){let e=this.snapshot.analysis?.today??new Date().toISOString().slice(0,10),t=Gs(e),s=D(t,this.weeksAhead*7),a=this.items(),n=a.filter(c=>!c.done&&c.date<t),r=new Map;for(let c of a){if(c.date<t||c.date>=s)continue;let g=Gs(c.date);r.set(g,[...r.get(g)??[],c])}let l=Array.from({length:this.weeksAhead},(c,g)=>D(t,g*7)),d=c=>i`<div class="item ${c.done?"done":""}">
      <span class="act ${c.action}">${this.t(`plan.act.${c.action}`)}</span>
      <span class="grow">${this.plant(c.row.planting.plant_id)} <span class="xs muted">· ${c.row.bed??"\u2013"} · ${x(c.date,this.lang,{weekday:"short",day:"numeric",month:"short"})}</span></span>
      ${c.done?i`<span class="xs">✓</span>`:this.admin?i`<button class="btn small" @click=${()=>this.done(c)}>${this.t("plan.done")}</button>`:u}
    </div>`;return i`<section class="card stack">
      <div class="row wrap"><h2 style="margin:0">${this.t("plan.weeks_title")}</h2><span class="spacer"></span>
        ${[4,8,12].map(c=>i`<button class="chip" aria-pressed=${String(this.weeksAhead===c)} @click=${()=>this.weeksAhead=c}>${this.t("plan.n_weeks",{n:c})}</button>`)}</div>
      <p class="small muted">${this.t("plan.weeks_intro")}</p>
      ${n.length?i`<div class="week"><h3 class="bad-text">${this.t("plan.overdue",{n:n.length})}</h3>${n.map(d)}</div>`:u}
      ${l.map(c=>{let g=(r.get(c)??[]).sort((v,$)=>v.date.localeCompare($.date));return i`<div class="week"><h3>${this.t("plan.week_of",{date:x(c,this.lang,{day:"numeric",month:"long"})})}${c===t?` \xB7 ${this.t("common.today")}`:""}</h3>
          ${g.length?g.map(d):i`<p class="xs muted">–</p>`}</div>`})}
    </section>`}renderSeeds(e){let t=s=>s.stock.map(a=>`${a.quantity} ${this.t(`journal.unit.${a.unit}`)}${a.year?` (${a.year})`:""}`).join(", ");return i`<section class="card stack">
      <h2 style="margin:0">${this.t("plan.seeds_title",{season:e.season})}</h2>
      <p class="small muted">${this.t("plan.seeds_intro")}</p>
      ${e.seeds.length?i`<table>
        <thead><tr><th>${this.t("lib.plant")}</th><th>${this.t("plan.plants")}</th><th>${this.t("plan.seeds")}</th><th>${this.t("plan.in_stock")}</th><th>${this.t("plan.to_buy")}</th><th></th></tr></thead>
        <tbody>${e.seeds.map(s=>i`<tr>
          <td>${this.plant(s.plant_id)}</td><td>${s.plants}</td><td>~${s.seeds}</td><td class="small">${t(s)||"\u2013"}</td>
          <td>${s.status==="short"||s.status==="none"?s.to_buy?`~${s.to_buy}`:"\u2713":"\u2013"}</td>
          <td><span class="chip ${s.status==="ok"?"ok":s.status==="check"?"":"bad"}">${this.t(`plan.seed.${s.status}`)}</span></td>
        </tr>`)}</tbody></table>
        <p class="xs muted">${this.t("plan.seeds_hint")}</p>
        ${this.renderTodo(e)}`:i`<p class="muted">${this.t("plan.seeds_none")}</p>`}
    </section>`}renderTodo(e){let t=e.seeds.filter(l=>l.status==="short"||l.status==="none").length;if(!t)return u;let s=this.api.todoLists();if(!s.length)return i`<p class="xs muted">${this.t("plan.todo_none")}</p>`;let a=this.todoList;if(!a)try{a=localStorage.getItem("hortulus.seed_todo")??""}catch{}let n=s.some(l=>l.entity_id===a)?a:s.find(l=>l.entity_id.includes("shopping"))?.entity_id??s[0].entity_id,r=async()=>{this.todoBusy=!0,this.todoMsg="";try{localStorage.setItem("hortulus.seed_todo",n)}catch{}try{let l=await this.api.seedsToTodo(e.season,n);this.todoMsg=this.t("plan.todo_done",{added:l.added,skipped:l.skipped})}catch(l){this.todoMsg=l.message}finally{this.todoBusy=!1}};return i`<div class="row wrap" style="align-items:end">
      <label class="field">${this.t("plan.todo_list")}
        <select @change=${l=>this.todoList=l.target.value}>
          ${s.map(l=>i`<option value=${l.entity_id} ?selected=${l.entity_id===n}>${l.name}</option>`)}</select></label>
      <button class="btn small" ?disabled=${this.todoBusy} @click=${r}><ha-icon icon="mdi:cart-plus"></ha-icon>${this.t("plan.todo_send",{n:t})}</button>
      ${this.todoMsg?i`<span class="small muted" role="status">${this.todoMsg}</span>`:u}
    </div>`}renderFollow(e){let t=new Map;for(let s of[{beds:this.snapshot.beds},...Object.values(this.snapshot.layouts??{})])for(let a of s.beds)t.set(a.id,a.name);return i`<section class="card stack">
      <h2 style="margin:0">${this.t("plan.follow_title")}</h2>
      <p class="small muted">${this.t("plan.follow_intro")}</p>
      ${e.successions.length?e.successions.map(s=>i`<div class="bed">
        <b>${t.get(s.bed_id)??s.bed_id}</b> <span class="small muted">· ${this.t("plan.free_from",{date:x(s.free_from,this.lang,{day:"numeric",month:"long"})})}
          · ${this.t("plan.after",{plants:s.leaving.map(a=>w(this.plants.get(a),this.lang)).join(", ")})}</span>
        <div class="opts">${s.options.length?s.options.map(a=>i`<span class="chip">${this.plant(a.plant_id)}
          <span class="xs muted">${this.t("plan.ready_by",{date:x(a.harvest_by,this.lang,{day:"numeric",month:"short"})})}</span></span>`):i`<span class="small muted">${this.t("plan.follow_nothing")}</span>`}</div>
      </div>`):i`<p class="muted">${this.t("plan.follow_none")}</p>`}
    </section>`}renderHarvest(e){let t=e.harvest.weeks,s=t.findIndex(c=>c.kg>=.05),a=t.length-1-[...t].reverse().findIndex(c=>c.kg>=.05),n=s<0?[]:t.slice(s,a+1),r=Math.max(.1,...n.map(c=>c.kg)),l=Gs(this.snapshot.analysis?.today??new Date().toISOString().slice(0,10)),d=Object.values(e.harvest.totals).reduce((c,g)=>c+g,0);return i`<section class="card stack">
      <h2 style="margin:0">${this.t("plan.harvest_title",{season:e.season})}</h2>
      <p class="small muted">${this.t("plan.harvest_intro",{kg:Math.round(d)})}</p>
      ${n.length?i`
        <div class="bars" role="img" aria-label=${this.t("plan.harvest_title",{season:e.season})}>
          ${n.map(c=>i`<div class="b ${c.week===l?"now":""}" style=${`height:${c.kg/r*100}%`}
            title=${`${x(c.week,this.lang,{day:"numeric",month:"short"})}: ${c.kg} kg \u2013 ${Object.entries(c.by_plant).sort((g,v)=>v[1]-g[1]).slice(0,4).map(([g,v])=>`${w(this.plants.get(g),this.lang)} ${v}`).join(", ")}`}></div>`)}
        </div>
        <div class="axis">${n.map((c,g)=>i`<span>${g%4===0?x(c.week,this.lang,{day:"numeric",month:"numeric"}):""}</span>`)}</div>
        <table><thead><tr><th>${this.t("lib.plant")}</th><th>kg</th><th></th></tr></thead>
          <tbody>${Object.entries(e.harvest.totals).map(([c,g])=>i`<tr><td>${this.plant(c)}</td><td>${g}</td>
            <td class="xs muted">${e.harvest.learned.includes(c)?this.t("plan.learned"):this.t("plan.book_yield")}</td></tr>`)}</tbody></table>`:i`<p class="muted">${this.t("plan.harvest_none")}</p>`}
    </section>`}};Z.styles=[L,S`
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
    `],p([m({attribute:!1})],Z.prototype,"snapshot",2),p([m({attribute:!1})],Z.prototype,"api",2),p([m({attribute:!1})],Z.prototype,"t",2),p([m({attribute:!1})],Z.prototype,"plants",2),p([m({attribute:!1})],Z.prototype,"families",2),p([m({attribute:!1})],Z.prototype,"rows",2),p([m()],Z.prototype,"lang",2),p([m({type:Number})],Z.prototype,"season",2),p([m()],Z.prototype,"view",2),p([m({type:Boolean})],Z.prototype,"admin",2),p([f()],Z.prototype,"result",2),p([f()],Z.prototype,"weeksAhead",2),p([f()],Z.prototype,"error",2),p([f()],Z.prototype,"todoList",2),p([f()],Z.prototype,"todoBusy",2),p([f()],Z.prototype,"todoMsg",2),Z=p([z("hl-crops-planning")],Z);var qs=["planned","sown_indoors","sown","transplanted","harvesting","finished","failed"],bn=["indoor_sow","direct_sow","transplant"],yn={indoor_sow:"lib.indoor_sow",direct_sow:"lib.direct_sow",transplant:"lib.transplant"},Lt=["sow_date","sown_on","transplant_date","transplanted_on","harvest_started_on","finished_on"],O=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.initialSeason=null;this.focusPlanting=null;this.picked=new Set;this.bulkStatus="";this.bulkField="";this.bulkDate=null;this.highlight="";this.view="list";this.compact=!1;this.onMedia=()=>this.compact=!!this.media?.matches;this.season=0;this.rows=[];this.filter="";this.group="bed";this.open=null;this.saving=new Set;this.plantMap=new Map}connectedCallback(){super.connectedCallback(),this.media=window.matchMedia("(max-width: 760px)"),this.media.addEventListener("change",this.onMedia),this.onMedia(),this.season||(this.season=this.initialSeason??this.snapshot?.layout_season??this.snapshot?.analysis?.season??new Date().getFullYear()),this.load()}disconnectedCallback(){super.disconnectedCallback(),this.media?.removeEventListener("change",this.onMedia),window.clearTimeout(this.reloadTimer)}willUpdate(e){e.has("plants")&&(this.plantMap=new Map(this.plants.map(t=>[t.id,t]))),e.has("focusPlanting")&&this.focusPlanting&&this.showFocus(this.focusPlanting),e.has("season")&&e.get("season")&&this.picked.size&&(this.picked=new Set),e.has("snapshot")&&e.get("snapshot")!==void 0&&!this.saving.size&&(window.clearTimeout(this.reloadTimer),this.reloadTimer=window.setTimeout(()=>void this.load(),600))}async showFocus(e){e.season!==this.season?(this.season=e.season,await this.load()):this.rows.length||await this.load();let t=this.rows.find(s=>s.planting.id===e.id);t&&(this.filter="",this.highlight=e.id,this.open=t,await this.updateComplete,this.renderRoot.querySelector(`[data-id="${e.id}"]`)?.scrollIntoView({block:"center",behavior:"smooth"}))}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}togglePick(e,t){let s=new Set(this.picked);t?s.add(e):s.delete(e),this.picked=s}async applyBulk(){let e={};if(this.bulkStatus&&(e.status=this.bulkStatus),this.bulkField&&(e[this.bulkField]=this.bulkDate),!(!Object.keys(e).length||!this.picked.size))try{let t=await this.api.updatePlantings([...this.picked],e);this.toast(this.t("crops.bulk_done",{n:t.updated})),this.picked=new Set,await this.load()}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}}renderBulk(){return!this.admin||!this.picked.size?u:i`<div class="bulk card" role="region" aria-label=${this.t("crops.bulk")}>
      <b>${this.t("crops.bulk_n",{n:this.picked.size})}</b>
      <label class="small">${this.t("crops.status")}
        <select @change=${e=>this.bulkStatus=e.target.value}>
          <option value="">–</option>${qs.map(e=>i`<option value=${e} ?selected=${this.bulkStatus===e}>${this.t(`status.${e}`)}</option>`)}
        </select></label>
      <label class="small">${this.t("crops.bulk_date")}
        <select @change=${e=>this.bulkField=e.target.value}>
          <option value="">–</option>${Lt.map(e=>i`<option value=${e} ?selected=${this.bulkField===e}>${this.t(`crops.field.${e}`)}</option>`)}
        </select></label>
      ${this.bulkField?i`<hl-date-input .value=${this.bulkDate??""} lang=${this.lang} label=${this.t(`crops.field.${this.bulkField}`)}
        pickLabel=${this.t("crops.pick_date")} @date-change=${e=>this.bulkDate=e.detail}></hl-date-input>
        <button class="chip" @click=${()=>this.bulkDate=this.snapshot.analysis?.today??new Date().toISOString().slice(0,10)}>${this.t("common.today")}</button>`:u}
      <span class="spacer"></span>
      <button class="btn primary small" ?disabled=${!this.bulkStatus&&!this.bulkField} @click=${()=>this.applyBulk()}>${this.t("crops.bulk_apply")}</button>
      <button class="btn ghost small" @click=${()=>this.picked=new Set}>${this.t("common.cancel")}</button>
    </div>`}async load(){try{this.rows=(await this.api.plantingsSeason(this.season)).rows,this.open&&(this.open=this.rows.find(e=>e.planting.id===this.open.planting.id)??null)}catch{}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async saveRow(e,t){let s=e.planting.id;this.saving=new Set([...this.saving,s]);try{let a=await this.api.updatePlanting(s,t);a.row&&(this.rows=this.rows.map(n=>n.planting.id===s?a.row:n),this.open?.planting.id===s&&(this.open=a.row))}catch(a){this.toast(this.t("common.error",{message:a.message??String(a)})),await this.load()}finally{let a=new Set(this.saving);a.delete(s),this.saving=a}}computed(e,t){let s=e.timeline;return s?t==="sow_date"?s.sow_date:t==="transplant_date"?s.transplant_date:t==="harvest_started_on"?s.harvest_start:t==="finished_on"?s.harvest_end:null:null}dateInput(e,t){let s=e.planting[t]??"",a=this.computed(e,t);return i`<hl-date-input .value=${s} lang=${this.lang} ?disabled=${!this.admin} label=${this.t(`crops.field.${t}`)} pickLabel=${this.t("crops.pick_date")}
      @date-change=${n=>this.saveRow(e,{[t]:n.detail})}></hl-date-input>
      ${!s&&a?i`<span class="computed">${this.t("crops.computed")}: ${x(a,this.lang)}</span>`:u}`}icon(e,t="thumb"){let s=this.plantMap.get(e.planting.plant_id);return s?i`<hl-plant-image .plant=${s} color=${j(this.families,s.family)} lang=${this.lang} size=${t}
      style="width:32px;height:32px"></hl-plant-image>`:u}visibleRows(){let e=this.filter.trim().toLowerCase(),t=this.rows.filter(a=>!e||[w(this.plantMap.get(a.planting.plant_id),this.lang),a.bed??"",a.zone??""].some(n=>n.toLowerCase().includes(e))),s=a=>this.group==="bed"?`${a.zone??""} ${a.bed??""}`:this.group==="plant"?w(this.plantMap.get(a.planting.plant_id),this.lang):a.timeline?.in_ground??"";return t.sort((a,n)=>s(a).localeCompare(s(n))||w(this.plantMap.get(a.planting.plant_id),this.lang).localeCompare(w(this.plantMap.get(n.planting.plant_id),this.lang)))}render(){return i`
      <div class="views" role="tablist">${[["list","mdi:table"],["timeline","mdi:chart-gantt"],["weeks","mdi:calendar-week"],["seeds","mdi:seed-outline"],["follow","mdi:swap-horizontal"],["harvest","mdi:basket-outline"]].map(([t,s])=>i`<button class="chip" role="tab" aria-selected=${String(this.view===t)}
        aria-pressed=${String(this.view===t)} @click=${()=>this.view=t}><ha-icon icon=${s}></ha-icon>${this.t(`crops.view.${t}`)}</button>`)}</div>
      ${this.view==="list"?this.renderList():this.view==="timeline"?i`${this.renderSeasonPick()}
        <section class="card"><hl-crop-gantt .rows=${this.rows} .plants=${this.plantMap} .families=${this.families} .t=${this.t} lang=${this.lang}
          season=${this.season} today=${this.snapshot.analysis?.today??""} ?south=${this.snapshot.settings.region?.hemisphere==="south"} ?admin=${this.admin}
          @move-planting=${t=>this.saveRow(t.detail.row,t.detail.changes)}></hl-crop-gantt></section>`:i`${this.renderSeasonPick()}
        <hl-crops-planning .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} .plants=${this.plantMap} .families=${this.families}
          .rows=${this.rows} season=${this.season} view=${this.view} ?admin=${this.admin} @crops-changed=${()=>this.load()}></hl-crops-planning>`}
      ${this.open?this.renderDetail(this.open):u}`}renderSeasonPick(){let e=[this.season-1,this.season,this.season+1];return i`<select style="width:auto;margin-bottom:var(--hl-s2)" aria-label=${this.t("planner.season")} @change=${t=>{this.season=Number(t.target.value),this.load(),this.dispatchEvent(new CustomEvent("season-changed",{detail:this.season,bubbles:!0,composed:!0}))}}>
      ${e.map(t=>i`<option value=${t} ?selected=${t===this.season}>${this.t("common.season",{year:t})}</option>`)}
    </select>`}renderCards(e){return i`<div class="cards">${e.map(t=>{let s=t.planting,a=t.timeline,n={planned:0,sown_indoors:1,sown:2,transplanted:3,harvesting:4}[s.status]??5,r=!s.sown_on&&n<1&&s.method!=="transplant"?["sown_on"]:!s.transplanted_on&&n<3&&s.method!=="direct_sow"?["transplanted_on"]:!s.harvest_started_on&&n<4?["harvest_started_on"]:["finished_on"];return i`<article class="crop-card ${this.highlight===s.id?"hl":""}" data-id=${s.id}>
        <div class="row" style="gap:8px">${this.icon(t)}
          <button class="name" @click=${()=>this.open=t}>${w(this.plantMap.get(s.plant_id),this.lang)||s.plant_id}</button>
          <span class="spacer"></span><span class="chip">${this.t(`status.${s.status}`)}</span></div>
        <div class="xs muted">${t.zone??""} · ${t.bed??this.t("crops.no_bed")}${a?.late?` \xB7 \u26A0 ${this.t("crops.late")}`:""}</div>
        <label class="field">${this.t(`crops.field.${r[0]}`)}${this.dateInput(t,r[0])}</label>
        <div class="row wrap" style="gap:6px">
          <button class="btn small ghost" @click=${()=>this.open=t}>${this.t("crops.all_dates")}</button>
          ${t.bed?i`<button class="btn small ghost" @click=${()=>this.emit("focus-planting",{planting_id:s.id,season:this.season})}>🗺 ${this.t("crops.show_on_map")}</button>`:u}
        </div>
      </article>`})}</div>`}renderList(){let e=[this.season-1,this.season,this.season+1],t=this.visibleRows(),s="";return i`
      <div class="top">
        <select style="width:auto" aria-label=${this.t("planner.season")} @change=${a=>{this.season=Number(a.target.value),this.load(),this.dispatchEvent(new CustomEvent("season-changed",{detail:this.season,bubbles:!0,composed:!0}))}}>
          ${e.map(a=>i`<option value=${a} ?selected=${a===this.season}>${this.t("common.season",{year:a})}</option>`)}
        </select>
        <input type="search" placeholder=${this.t("crops.search")} .value=${this.filter} @input=${a=>this.filter=a.target.value} />
        <span class="small">${this.t("crops.group")}:</span>
        ${["bed","plant","date"].map(a=>i`<button class="chip" aria-pressed=${String(this.group===a)} @click=${()=>this.group=a}>${this.t(`crops.group.${a}`)}</button>`)}
        <span class="small muted">${this.t("planner.count",{n:t.length})}</span>
      </div>
      <p class="small muted">${this.t("crops.intro")}</p>
      ${this.renderBulk()}
      ${t.length&&this.compact?this.renderCards(t):t.length?i`<div class="card wrap"><table>
        <thead><tr>${this.admin?i`<th><input type="checkbox" aria-label=${this.t("crops.pick_all")} .checked=${t.length>0&&t.every(a=>this.picked.has(a.planting.id))}
          @change=${a=>this.picked=a.target.checked?new Set(t.map(n=>n.planting.id)):new Set} /></th>`:u}<th>${this.t("lib.plant")}</th><th>${this.t("task.bed")}</th><th>${this.t("crops.method")}</th><th>${this.t("crops.status")}</th>
          ${Lt.map(a=>i`<th>${this.t(`crops.field.${a}`)}</th>`)}<th>#</th></tr></thead>
        <tbody>${t.map(a=>{let n=this.group==="bed"?`${a.zone??"?"} \xB7 ${a.bed??this.t("crops.no_bed")}`:"",r=n&&n!==s?i`<tr class="group"><td colspan=${6+Lt.length}>${n}</td></tr>`:u;s=n||s;let l=a.planting;return i`${r}<tr data-id=${l.id} class="${this.saving.has(l.id)?"saving":""} ${this.highlight===l.id?"hl":""}">
            ${this.admin?i`<td><input type="checkbox" aria-label=${w(this.plantMap.get(l.plant_id),this.lang)} .checked=${this.picked.has(l.id)}
              @change=${d=>this.togglePick(l.id,d.target.checked)} /></td>`:u}
            <td class="plant">${this.icon(a)}<button @click=${()=>this.open=a}>${w(this.plantMap.get(l.plant_id),this.lang)||l.plant_id}</button>
              ${a.bed?i`<button class="map" title=${this.t("crops.show_on_map")} aria-label=${this.t("crops.show_on_map")}
                @click=${()=>this.emit("focus-planting",{planting_id:l.id,season:this.season})}>🗺</button>`:u}
              ${a.timeline?.late?i`<ha-icon class="late" icon="mdi:clock-alert-outline" title=${this.t("crops.late")}></ha-icon>`:u}</td>
            <td>${a.bed??i`<span class="late">${this.t("crops.no_bed")}</span>`}</td>
            <td><select ?disabled=${!this.admin} @change=${d=>this.saveRow(a,{method:d.target.value})}>
              ${bn.map(d=>i`<option value=${d} ?selected=${l.method===d}>${this.t(yn[d])}</option>`)}</select></td>
            <td><select ?disabled=${!this.admin} @change=${d=>this.saveRow(a,{status:d.target.value})}>
              ${qs.map(d=>i`<option value=${d} ?selected=${l.status===d}>${this.t(`status.${d}`)}</option>`)}</select></td>
            ${Lt.map(d=>i`<td>${this.dateInput(a,d)}</td>`)}
            <td><input type="number" min="0" .value=${l.count==null?"":String(l.count)} placeholder="auto" ?disabled=${!this.admin}
              @change=${d=>this.saveRow(a,{count:d.target.value===""?null:Number(d.target.value)})} /></td>
          </tr>`})}</tbody></table></div>`:i`<p class="muted">${this.t("crops.none",{season:this.season})}</p>`}`}renderDetail(e){let t=e.planting,s=this.plantMap.get(t.plant_id),a=e.timeline,n=this.visibleRows(),r=n.findIndex(d=>d.planting.id===t.id),l=(d,c,g)=>c?i`<span>${d}</span><span>${x(c,this.lang)}${g?` \u2013 ${x(g,this.lang)}`:""}</span>`:u;return i`<hl-modal heading=${w(s,this.lang)} subheading=${`${e.zone??""} \xB7 ${e.bed??""} \xB7 ${this.t("common.season",{year:t.season})}`}
      accent=${s?j(this.families,s.family):""} nav ?has-prev=${r>0} ?has-next=${r>=0&&r<n.length-1}
      closeLabel=${this.t("common.close")} prevLabel=${this.t("common.previous")} nextLabel=${this.t("common.next")}
      @prev=${()=>this.open=n[r-1]} @next=${()=>this.open=n[r+1]} @closed=${()=>this.open=null}>
      ${s?i`<hl-plant-image .plant=${s} color=${j(this.families,s.family)} lang=${this.lang} size="card" credit></hl-plant-image>`:u}
      ${a?i`<div class="kv">
        ${l(this.t("crops.window.sow"),a.sow_window?.start,a.sow_window?.end)}
        ${l(this.t("crops.window.transplant"),a.transplant_window?.start,a.transplant_window?.end)}
        ${l(this.t("crops.in_ground"),a.in_ground)}
        ${l(this.t("crops.harvest"),a.harvest_start,a.harvest_end)}
      </div>${a.late?i`<div class="finding warning"><ha-icon icon="mdi:clock-alert-outline"></ha-icon><span>${this.t("crops.late")}</span></div>`:u}`:u}
      <div class="form-grid">
        <label class="field">${this.t("crops.method")}<select ?disabled=${!this.admin} @change=${d=>this.saveRow(e,{method:d.target.value})}>
          ${bn.map(d=>i`<option value=${d} ?selected=${t.method===d}>${this.t(yn[d])}</option>`)}</select></label>
        <label class="field">${this.t("crops.status")}<select ?disabled=${!this.admin} @change=${d=>this.saveRow(e,{status:d.target.value})}>
          ${qs.map(d=>i`<option value=${d} ?selected=${t.status===d}>${this.t(`status.${d}`)}</option>`)}</select></label>
        ${Lt.map(d=>i`<label class="field">${this.t(`crops.field.${d}`)}${this.dateInput(e,d)}</label>`)}
        <label class="field">${this.t("crops.count")}<input type="number" min="0" .value=${t.count==null?"":String(t.count)} placeholder="auto" ?disabled=${!this.admin}
          @change=${d=>this.saveRow(e,{count:d.target.value===""?null:Number(d.target.value)})} /></label>
        <label class="field full">${this.t("crops.notes")}<textarea .value=${t.notes??""} ?disabled=${!this.admin}
          @change=${d=>this.saveRow(e,{notes:d.target.value})}></textarea></label>
      </div>
      <details><summary class="small">${this.t("note.title")}</summary>
        <hl-quick-note .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} plantingId=${t.id} ?admin=${this.admin}></hl-quick-note></details>
      <p class="xs muted">${this.t("crops.detail_hint")}</p>
      <div slot="actions" class="row wrap">
        ${e.bed?i`<button class="btn small" @click=${()=>this.emit("focus-planting",{planting_id:t.id,season:t.season})}>🗺 ${this.t("crops.show_on_map")}</button>`:u}
        <button class="btn small ghost" @click=${()=>this.emit("open-plant",t.plant_id)}>${this.t("planner.plant_info")}</button>
      </div>
    </hl-modal>`}};O.styles=[L,S`
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
    `],p([m({attribute:!1})],O.prototype,"snapshot",2),p([m({attribute:!1})],O.prototype,"plants",2),p([m({attribute:!1})],O.prototype,"families",2),p([m({attribute:!1})],O.prototype,"api",2),p([m({attribute:!1})],O.prototype,"t",2),p([m()],O.prototype,"lang",2),p([m({type:Boolean})],O.prototype,"admin",2),p([m({type:Number})],O.prototype,"initialSeason",2),p([m({attribute:!1})],O.prototype,"focusPlanting",2),p([f()],O.prototype,"picked",2),p([f()],O.prototype,"bulkStatus",2),p([f()],O.prototype,"bulkField",2),p([f()],O.prototype,"bulkDate",2),p([f()],O.prototype,"highlight",2),p([f()],O.prototype,"view",2),p([f()],O.prototype,"compact",2),p([f()],O.prototype,"season",2),p([f()],O.prototype,"rows",2),p([f()],O.prototype,"filter",2),p([f()],O.prototype,"group",2),p([f()],O.prototype,"open",2),p([f()],O.prototype,"saving",2),O=p([z("hl-crops-view")],O);var $n=[{id:"dashboard",icon:"home"},{id:"planner",icon:"planner"},{id:"layout",icon:"layout"},{id:"crops",icon:"crops"},{id:"calendar",icon:"calendar"},{id:"weather",icon:"weather"},{id:"journal",icon:"journal"},{id:"library",icon:"library"},{id:"advice",icon:"advice"},{id:"handbook",icon:"handbook"},{id:"analysis",icon:"analysis"},{id:"print",icon:"print"},{id:"settings",icon:"settings"},{id:"wall",icon:"wall"}],Zs=[{id:"today",icon:"home",tabs:["dashboard"]},{id:"garden",icon:"garden",tabs:["planner","layout","crops"]},{id:"calendar",icon:"calendar",tabs:["calendar"]},{id:"weather",icon:"weather",tabs:["weather"]},{id:"journal",icon:"journal",tabs:["journal"]},{id:"knowledge",icon:"knowledge",tabs:["library","advice","handbook"]},{id:"manage",icon:"manage",tabs:["analysis","print","settings"]}],Ws=h=>Zs.find(o=>o.tabs.includes(h))??Zs[0],G=class extends E{constructor(){super(...arguments);this.narrow=!1;this.snapshot=null;this.lastInGroup={};this.plants=[];this.families={};this.tab="dashboard";this.toastMsg="";this.openTask=null;this.creatingTask=!1;this.error="";this.chapter="";this.plannerSeason=null;this.transitionRequest=0;this.popupPlant=null;this.plannerFocus=null;this.cropsFocus=null;this.t=Wt("en");this.uiLang="en";this.applyTheme=()=>{let e=this.snapshot?.analysis?.today??new Date().toISOString().slice(0,10),{theme:t,dark:s}=Ha(Qt(),e,this.snapshot?.settings.region?.hemisphere==="south");this.setAttribute("theme",t),this.toggleAttribute("dark",s??!!this.hass?.themes?.darkMode)}}willUpdate(e){if(e.has("hass")&&this.hass){let t=_t(this.snapshot?.lang??this.hass.locale?.language??this.hass.language);t!==this.uiLang&&(this.uiLang=t,this.t=Wt(t)),this.applyTheme(),Ga(this.hass),this.api?this.api.setHass(this.hass):(this.api=new wt(this.hass),this.connect())}if(e.has("route")&&this.route){let[t,s]=this.route.path.replace(/^\//,"").split("/");this.tab=$n.some(a=>a.id===t)?t:"dashboard",this.tab==="handbook"&&(this.chapter=s??"")}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hortulus-theme-changed",this.applyTheme),this.unsubscribe?.(),this.unsubscribe=void 0,this.api=void 0}connectedCallback(){super.connectedCallback(),window.addEventListener("hortulus-theme-changed",this.applyTheme),this.hass&&!this.api&&(this.api=new wt(this.hass),this.connect())}async switchGarden(e){if(!(!this.api||e===(this.snapshot?.entry_id??""))){try{localStorage.setItem("hortulus.garden",e)}catch{}await this.unsubscribe?.(),this.unsubscribe=void 0,this.api.gardenId=e,this.snapshot=null,await this.connect()}}async connect(e=!1){if(this.api&&!this.api.gardenId&&!e)try{this.api.gardenId=localStorage.getItem("hortulus.garden")??""}catch{}try{await this.loadPlants(),this.loadGlossary(),this.unsubscribe=await this.api.subscribe(t=>{this.snapshot=t,this.applyTheme();let s=_t(t.lang);s!==this.uiLang&&(this.uiLang=s,this.t=Wt(s),this.loadGlossary()),this.openTask&&(this.openTask=t.tasks.find(a=>a.id===this.openTask.id)??null)})}catch(t){let s=t.code==="not_loaded";if(s&&this.api?.gardenId&&!e){this.api.gardenId="";try{localStorage.removeItem("hortulus.garden")}catch{}await this.connect(!0);return}this.error=s?this.t("common.not_loaded"):String(t.message??t)}}async loadGlossary(){try{Za((await this.api.handbookIndex(this.uiLang)).glossary),Ua(await this.api.supplies())}catch{}}openHandbook(e=""){this.chapter=e;let t=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/handbook${e?`/${e}`:""}`;history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab="handbook"}async loadPlants(){let e=await this.api.plants();this.plants=e.plants,this.families=e.families}navigate(e,t){t?.preventDefault();let s=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/${e==="dashboard"?"":e}`.replace(/\/$/,"");history.pushState(null,"",s),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab=e,this.lastInGroup={...this.lastInGroup,[Ws(e).id]:e}}openPlant(e){this.popupPlant=this.plants.find(t=>t.id===e)??null}focusPlanting(e){this.popupPlant=null,this.plannerSeason=e.season,this.plannerFocus={id:e.planting_id,season:e.season,n:(this.plannerFocus?.n??0)+1},this.navigate("planner")}focusCrop(e){this.popupPlant=null,this.plannerSeason=e.season,this.cropsFocus={id:e.planting_id,season:e.season,n:(this.cropsFocus?.n??0)+1},this.navigate("crops")}renderPlantPopup(){let e=this.popupPlant;return!e||!this.snapshot?u:i`<hl-modal heading=${w(e,this.uiLang)} accent=${j(this.families,e.family)} closeLabel=${this.t("common.close")}
      @closed=${()=>this.popupPlant=null}
      @select-plant=${t=>{this.popupPlant=t.detail,this.updateComplete.then(()=>this.renderRoot.querySelector("hl-modal")?.toTop())}}
      @focus-planting=${t=>this.focusPlanting(t.detail)}>
      <span slot="subheading" class="small muted"><i>${e.scientific_name}</i> · ${this.families[e.family]?.[this.uiLang]??e.family}</span>
      <hl-plant-detail .plant=${e} .plants=${this.plants} .families=${this.families} .snapshot=${this.snapshot} .t=${this.t} lang=${this.uiLang}></hl-plant-detail>
    </hl-modal>`}toast(e){this.toastMsg=e,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastMsg="",4500)}async completeTask(e){try{await this.api.taskAction(e.id,"complete"),this.toast(this.t("task.completed",{title:e.title}))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async irrigation(e){try{if(e==="stop"){await this.api.irrigationStop(),this.toast(this.t("dash.irrigation_stopped"));return}let t=await this.api.irrigationRun(),s=Object.values(t.reasons??{});this.toast(t.started?this.t("dash.irrigation_started",{min:Math.round(t.total_minutes)}):s[0]??this.t("dash.irrigation_nothing"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async closeValve(e){try{let t=await this.api.irrigationClose(e);this.toast(t.state==="off"||t.state==="closed"?this.t("valve.closed"):this.t("valve.still_open",{state:t.state??"?"}))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async postponeTask(e,t){try{await this.api.taskAction(e.id,"postpone",{days:t}),this.toast(this.t("task.postponed",{title:e.title,n:t}))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderTab(){let e=this.snapshot,t=this.hass.user?.is_admin??!0,s=new Map(this.plants.map(a=>[a.id,a]));switch(this.tab){case"layout":return i`<hl-planner-view mode="layout" .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} .narrow=${this.narrow} .initialSeason=${this.plannerSeason}
          .transitionRequest=${this.transitionRequest}></hl-planner-view>`;case"crops":return i`<hl-crops-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} .initialSeason=${this.plannerSeason} .focusPlanting=${this.cropsFocus}></hl-crops-view>`;case"analysis":return i`<hl-analysis-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t}></hl-analysis-view>`;case"planner":return i`<hl-planner-view mode="plant" .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} .narrow=${this.narrow} .initialSeason=${this.plannerSeason}
          .focusPlanting=${this.plannerFocus}></hl-planner-view>`;case"library":return i`<hl-library-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} @plants-changed=${()=>this.loadPlants()}></hl-library-view>`;case"weather":return i`<hl-weather-view .snapshot=${e} .hass=${this.hass} .t=${this.t} .lang=${this.uiLang}></hl-weather-view>`;case"calendar":return i`<hl-calendar-view .snapshot=${e} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .plants=${s} .families=${this.families}></hl-calendar-view>`;case"journal":return i`<hl-journal-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t}></hl-journal-view>`;case"advice":return i`<hl-advice-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t}></hl-advice-view>`;case"handbook":return i`<hl-handbook-view .api=${this.api} .t=${this.t} .lang=${this.uiLang} .chapterId=${this.chapter} .narrow=${this.narrow}></hl-handbook-view>`;case"print":return i`<hl-print-view .snapshot=${e} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .narrow=${this.narrow} .admin=${t}></hl-print-view>`;case"settings":return i`<hl-settings-view .snapshot=${e} .hass=${this.hass} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .admin=${t}></hl-settings-view>`;default:return i`<hl-dashboard-view .snapshot=${e} .api=${this.api} .plants=${s} .families=${this.families} .t=${this.t} .lang=${this.uiLang} .admin=${t}></hl-dashboard-view>`}}renderBadge(){let e=this.snapshot?.diagnosis,t=e?e.error+e.warning:0;return!e||!t?u:i`<span class="badge ${e.error?"bad":"warn"}" title=${this.t("analysis.badge",{errors:e.error,warnings:e.warning})}>${t}</span>`}openGroup(e,t){let s=this.lastInGroup[e.id];this.navigate(s&&e.tabs.includes(s)?s:e.tabs[0],t)}renderSubnav(){let e=Ws(this.tab);return e.tabs.length<2?u:i`<nav class="sub" aria-label=${this.t(`nav.group.${e.id}`)}>
      ${e.tabs.map(t=>{let s=$n.find(a=>a.id===t);return i`<a href="#" aria-current=${t===this.tab?"page":"false"} @click=${a=>this.navigate(t,a)}>
          ${qe(s.icon,17)}${this.t(`nav.${t}`)}${t==="analysis"?this.renderBadge():u}</a>`})}
    </nav>`}renderNav(e){let t=Ws(this.tab).id;return i`<nav class=${e} aria-label="Hortulus">
      ${Zs.map(s=>i`<a href="#" aria-current=${s.id===t?"page":"false"} @click=${a=>this.openGroup(s,a)}>
        ${qe(s.icon,19)}${this.t(s.tabs.length>1?`nav.group.${s.id}`:`nav.${s.tabs[0]}`)}${s.tabs.includes("analysis")?this.renderBadge():u}</a>`)}
    </nav>`}renderLoading(){return i`<div class="loading" aria-busy="true" aria-label=${this.t("common.loading")}>
      <div class="skeleton" style="width:220px;height:14px"></div>
      <div class="skeleton" style="width:320px;height:34px;margin-top:10px"></div>
      <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-top:24px">
        <div class="skeleton" style="height:320px;border-radius:16px"></div><div class="skeleton" style="height:320px;border-radius:16px"></div>
      </div></div>`}render(){return this.tab==="wall"&&this.snapshot&&this.api?i`<hl-wall-view .snapshot=${this.snapshot} .hass=${this.hass} .t=${this.t} lang=${this.uiLang}
          .plants=${new Map(this.plants.map(e=>[e.id,e]))} .families=${this.families}
          @navigate=${e=>this.navigate(e.detail)}
          @complete-task=${e=>this.completeTask(e.detail)}
          @hl-celebrate=${e=>_s(this.renderRoot,e.detail.x,e.detail.y)}></hl-wall-view>
        ${this.toastMsg?i`<div class="toast" role="status" aria-live="polite">${this.toastMsg}</div>`:u}`:i`
      <header class="appbar">
        ${this.narrow?i`<button class="icon-btn" aria-label="Menu" @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}>
          <ha-icon icon="mdi:menu"></ha-icon></button>`:u}
        <div class="brand">${ys(30)}<span>Hortulus</span>${this.narrow||(this.snapshot?.gardens?.length??0)>1?u:i`<small>${this.t("app.tagline")}</small>`}</div>
        ${(this.snapshot?.gardens?.length??0)>1?i`<select class="garden" aria-label=${this.t("app.garden")}
            @change=${e=>this.switchGarden(e.target.value)}>
          ${this.snapshot.gardens.map(e=>i`<option value=${e.entry_id} ?selected=${e.entry_id===this.snapshot.entry_id}>${e.title}</option>`)}
        </select>`:u}
        ${this.renderNav("top")}
        ${this.narrow?i`<span style="flex:1"></span>
          <button class="icon-btn" aria-label=${this.t("nav.settings")} aria-pressed=${String(this.tab==="settings")} @click=${()=>this.navigate("settings")}>
            <ha-icon icon="mdi:cog-outline"></ha-icon></button>`:u}
      </header>
      <main @open-task=${e=>this.openTask=e.detail}
        @complete-task=${e=>this.completeTask(e.detail)}
        @hl-celebrate=${e=>_s(this.renderRoot,e.detail.x,e.detail.y)}
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
        ${this.error?i`<div class="card error">${ys(56)}<p>${this.error}</p></div>`:this.snapshot?i`${this.renderSubnav()}${xa(this.tab,i`<div class="view">${this.renderTab()}</div>`)}`:this.renderLoading()}
      </main>
      ${this.renderNav("bottom-nav")}
      ${this.snapshot&&(this.openTask||this.creatingTask)?i`<hl-task-dialog .task=${this.openTask} .create=${this.creatingTask} .snapshot=${this.snapshot}
        @open-handbook=${e=>this.openHandbook(e.detail?.chapter??"")}
        .beds=${this.snapshot.beds} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .today=${this.snapshot.analysis?.today??""}
        @hl-toast=${e=>this.toast(e.detail.message)}
        @closed=${()=>{this.openTask=null,this.creatingTask=!1}}></hl-task-dialog>`:u}
      ${this.renderPlantPopup()}
      ${this.toastMsg?i`<div class="toast" role="status" aria-live="polite">${this.toastMsg}</div>`:u}
    `}};G.styles=[Ea,Ta,L,S`
      :host { display: block; min-height: 100vh; background:
        radial-gradient(1200px 520px at 12% -8%, color-mix(in srgb, var(--hl-leaf-100) 70%, transparent), transparent 70%),
        radial-gradient(900px 420px at 100% 0%, color-mix(in srgb, var(--hl-sun-100) 55%, transparent), transparent 70%),
        var(--hl-bg); background-attachment: fixed; }
      .appbar { position: sticky; top: 0; z-index: 4; display: flex; align-items: center; gap: var(--hl-s3);
        padding: 0 var(--hl-s5); height: 60px; background: color-mix(in srgb, var(--hl-surface) 78%, transparent);
        backdrop-filter: saturate(1.6) blur(14px); -webkit-backdrop-filter: saturate(1.6) blur(14px);
        border-bottom: 1px solid color-mix(in srgb, var(--hl-border) 70%, transparent);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 6px 20px -12px rgba(46, 33, 24, 0.25); }
      .brand { display: flex; align-items: center; gap: 10px; flex: none; }
      .brand > span { font-family: var(--hl-font-serif); font-weight: 700; font-size: 21px; letter-spacing: -0.01em; }
      .brand small { font-weight: 400; color: var(--hl-text-muted); font-size: var(--hl-fs-xs); line-height: 1.25; max-width: 150px;
        padding-left: 10px; border-left: 1px solid var(--hl-border); }
      .brand svg { filter: drop-shadow(0 2px 4px rgba(31, 61, 28, 0.25)); }
      nav { display: flex; gap: 2px; margin-left: var(--hl-s4); overflow-x: auto; padding: 4px; scrollbar-width: none;
        mask-image: linear-gradient(90deg, #000 0, #000 calc(100% - 32px), transparent); }
      nav::-webkit-scrollbar { display: none; }
      nav a { position: relative; display: inline-flex; align-items: center; gap: 6px; padding: 0 14px; height: 38px; border-radius: var(--hl-r-pill);
        color: var(--hl-text-muted); text-decoration: none; font-weight: 500; white-space: nowrap; --mdc-icon-size: 18px;
        transition: background var(--hl-dur) var(--hl-ease), color var(--hl-dur) var(--hl-ease), box-shadow var(--hl-dur) var(--hl-ease); }
      nav a:hover { background: color-mix(in srgb, var(--hl-surface-2) 80%, transparent); color: var(--hl-text); }
      nav a[aria-current="page"] { background: var(--hl-surface); color: var(--hl-primary); font-weight: 600;
        box-shadow: var(--hl-shadow-2), inset 0 0 0 1px color-mix(in srgb, var(--hl-leaf-300) 60%, transparent); }
      nav.top a[aria-current="page"]::after { content: ""; position: absolute; left: 50%; bottom: 4px; width: 16px; height: 2px; margin-left: -8px;
        border-radius: 2px; background: var(--hl-accent); }
      .view { animation: hl-rise var(--hl-dur-slow) var(--hl-ease) both; }
      .burst { position: fixed; z-index: 30; width: 0; height: 0; pointer-events: none; }
      .burst span { position: absolute; left: -5px; top: -4px; width: 10px; height: 7px; border-radius: 10px 0; background: var(--c);
        animation: hl-leaf 900ms cubic-bezier(0.2, 0.7, 0.3, 1) both; }
      @keyframes hl-leaf {
        0% { transform: translate(0, 0) rotate(0) scale(0.4); opacity: 0; }
        15% { opacity: 1; }
        100% { transform: translate(var(--dx), calc(var(--dy) + 40px)) rotate(var(--rot)) scale(1); opacity: 0; }
      }
      :host([narrow]) .bottom-nav a[aria-current="page"] { box-shadow: none; background: var(--hl-leaf-100); border-radius: 14px; }
      :host([narrow]) .bottom-nav { backdrop-filter: saturate(1.6) blur(14px); background: color-mix(in srgb, var(--hl-surface) 86%, transparent); }
      nav.sub { display: inline-flex; gap: 2px; padding: 4px; margin: 0 0 var(--hl-s4); border-radius: 999px; overflow-x: auto; max-width: 100%;
        background: color-mix(in srgb, var(--hl-surface-2) 85%, transparent); border: 1px solid color-mix(in srgb, var(--hl-border) 70%, transparent);
        scrollbar-width: none; }
      nav.sub a { display: inline-flex; align-items: center; gap: 6px; padding: 0 16px; height: 34px; border-radius: 999px; white-space: nowrap;
        color: var(--hl-text-muted); text-decoration: none; font-weight: 500; font-size: var(--hl-fs-sm); --mdc-icon-size: 17px;
        transition: background var(--hl-dur) var(--hl-ease), color var(--hl-dur) var(--hl-ease); }
      nav.sub a:hover { color: var(--hl-text); }
      nav.sub a[aria-current="page"] { background: var(--hl-surface); color: var(--hl-primary); font-weight: 600; box-shadow: var(--hl-shadow-1); }
      nav.sub a .badge { min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px; font-size: 11px; font-weight: 700; color: #fff;
        display: inline-grid; place-items: center; line-height: 1; }
      nav.sub a .badge.bad { background: var(--hl-danger); }
      nav.sub a .badge.warn { background: var(--hl-warning); }
      select.garden { width: auto; min-height: 34px; padding: 4px 30px 4px 12px; border-radius: 999px; font-weight: 600; flex: none;
        background-color: var(--hl-leaf-50); border-color: var(--hl-leaf-300); }
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
    `],p([m({attribute:!1})],G.prototype,"hass",2),p([m({type:Boolean,reflect:!0})],G.prototype,"narrow",2),p([m({attribute:!1})],G.prototype,"route",2),p([m({attribute:!1})],G.prototype,"panel",2),p([f()],G.prototype,"snapshot",2),p([f()],G.prototype,"lastInGroup",2),p([f()],G.prototype,"plants",2),p([f()],G.prototype,"families",2),p([f()],G.prototype,"tab",2),p([f()],G.prototype,"toastMsg",2),p([f()],G.prototype,"openTask",2),p([f()],G.prototype,"creatingTask",2),p([f()],G.prototype,"error",2),p([f()],G.prototype,"chapter",2),p([f()],G.prototype,"plannerSeason",2),p([f()],G.prototype,"transitionRequest",2),p([f()],G.prototype,"popupPlant",2),p([f()],G.prototype,"plannerFocus",2),p([f()],G.prototype,"cropsFocus",2),G=p([z("hortulus-panel")],G);export{G as HortulusPanel};
