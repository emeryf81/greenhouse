var Me=Object.defineProperty;var Pe=Object.getOwnPropertyDescriptor;var p=(o,n,t,e)=>{for(var s=e>1?void 0:e?Pe(n,t):n,i=o.length-1,a;i>=0;i--)(a=o[i])&&(s=(e?a(n,t,s):a(s))||s);return e&&s&&Me(n,t,s),s};var vt=globalThis,bt=vt.ShadowRoot&&(vt.ShadyCSS===void 0||vt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,At=Symbol(),Jt=new WeakMap,tt=class{constructor(n,t,e){if(this._$cssResult$=!0,e!==At)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=t}get styleSheet(){let n=this.o,t=this.t;if(bt&&n===void 0){let e=t!==void 0&&t.length===1;e&&(n=Jt.get(t)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),e&&Jt.set(t,n))}return n}toString(){return this.cssText}},Qt=o=>new tt(typeof o=="string"?o:o+"",void 0,At),S=(o,...n)=>{let t=o.length===1?o[0]:n.reduce((e,s,i)=>e+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[i+1],o[0]);return new tt(t,o,At)},Vt=(o,n)=>{if(bt)o.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of n){let e=document.createElement("style"),s=vt.litNonce;s!==void 0&&e.setAttribute("nonce",s),e.textContent=t.cssText,o.appendChild(e)}},Rt=bt?o=>o:o=>o instanceof CSSStyleSheet?(n=>{let t="";for(let e of n.cssRules)t+=e.cssText;return Qt(t)})(o):o;var{is:Ae,defineProperty:Re,getOwnPropertyDescriptor:ze,getOwnPropertyNames:Ce,getOwnPropertySymbols:Le,getPrototypeOf:Ie}=Object,yt=globalThis,te=yt.trustedTypes,De=te?te.emptyScript:"",He=yt.reactiveElementPolyfillSupport,et=(o,n)=>o,st={toAttribute(o,n){switch(n){case Boolean:o=o?De:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,n){let t=o;switch(n){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},$t=(o,n)=>!Ae(o,n),ee={attribute:!0,type:String,converter:st,reflect:!1,useDefault:!1,hasChanged:$t};Symbol.metadata??=Symbol("metadata"),yt.litPropertyMetadata??=new WeakMap;var U=class extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(n,t),!t.noAccessor){let e=Symbol(),s=this.getPropertyDescriptor(n,e,t);s!==void 0&&Re(this.prototype,n,s)}}static getPropertyDescriptor(n,t,e){let{get:s,set:i}=ze(this.prototype,n)??{get(){return this[t]},set(a){this[t]=a}};return{get:s,set(a){let r=s?.call(this);i?.call(this,a),this.requestUpdate(n,r,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??ee}static _$Ei(){if(this.hasOwnProperty(et("elementProperties")))return;let n=Ie(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(et("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(et("properties"))){let t=this.properties,e=[...Ce(t),...Le(t)];for(let s of e)this.createProperty(s,t[s])}let n=this[Symbol.metadata];if(n!==null){let t=litPropertyMetadata.get(n);if(t!==void 0)for(let[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let s=this._$Eu(t,e);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let t=[];if(Array.isArray(n)){let e=new Set(n.flat(1/0).reverse());for(let s of e)t.unshift(Rt(s))}else n!==void 0&&t.push(Rt(n));return t}static _$Eu(n,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(n=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(n.set(e,this[e]),delete this[e]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Vt(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(n=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach(n=>n.hostDisconnected?.())}attributeChangedCallback(n,t,e){this._$AK(n,e)}_$ET(n,t){let e=this.constructor.elementProperties.get(n),s=this.constructor._$Eu(n,e);if(s!==void 0&&e.reflect===!0){let i=(e.converter?.toAttribute!==void 0?e.converter:st).toAttribute(t,e.type);this._$Em=n,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(n,t){let e=this.constructor,s=e._$Eh.get(n);if(s!==void 0&&this._$Em!==s){let i=e.getPropertyOptions(s),a=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:st;this._$Em=s;let r=a.fromAttribute(t,i.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(n,t,e,s=!1,i){if(n!==void 0){let a=this.constructor;if(s===!1&&(i=this[n]),e??=a.getPropertyOptions(n),!((e.hasChanged??$t)(i,t)||e.useDefault&&e.reflect&&i===this._$Ej?.get(n)&&!this.hasAttribute(a._$Eu(n,e))))return;this.C(n,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,t,{useDefault:e,reflect:s,wrapped:i},a){e&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,a??t??this[n]),i!==!0||a!==void 0)||(this._$AL.has(n)||(this.hasUpdated||e||(t=void 0),this._$AL.set(n,t)),s===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[s,i]of e){let{wrapped:a}=i,r=this[s];a!==!0||this._$AL.has(s)||r===void 0||this.C(s,void 0,i,r)}}let n=!1,t=this._$AL;try{n=this.shouldUpdate(t),n?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw n=!1,this._$EM(),e}n&&this._$AE(t)}willUpdate(n){}_$AE(n){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(n){}firstUpdated(n){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[et("elementProperties")]=new Map,U[et("finalized")]=new Map,He?.({ReactiveElement:U}),(yt.reactiveElementVersions??=[]).push("2.1.2");var Ot=globalThis,se=o=>o,_t=Ot.trustedTypes,ne=_t?_t.createPolicy("lit-html",{createHTML:o=>o}):void 0,de="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,he="?"+F,Oe=`<${he}>`,Z=document,it=()=>Z.createComment(""),at=o=>o===null||typeof o!="object"&&typeof o!="function",Nt=Array.isArray,Ne=o=>Nt(o)||typeof o?.[Symbol.iterator]=="function",zt=`[ 	
\f\r]`,nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ie=/-->/g,ae=/>/g,K=RegExp(`>|${zt}(?:([^\\s"'>=/]+)(${zt}*=${zt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),re=/'/g,oe=/"/g,ce=/^(?:script|style|textarea|title)$/i,Bt=o=>(n,...t)=>({_$litType$:o,strings:n,values:t}),h=Bt(1),E=Bt(2),ls=Bt(3),q=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),le=new WeakMap,G=Z.createTreeWalker(Z,129);function pe(o,n){if(!Nt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ne!==void 0?ne.createHTML(n):n}var Be=(o,n)=>{let t=o.length-1,e=[],s,i=n===2?"<svg>":n===3?"<math>":"",a=nt;for(let r=0;r<t;r++){let d=o[r],l,c,u=-1,g=0;for(;g<d.length&&(a.lastIndex=g,c=a.exec(d),c!==null);)g=a.lastIndex,a===nt?c[1]==="!--"?a=ie:c[1]!==void 0?a=ae:c[2]!==void 0?(ce.test(c[2])&&(s=RegExp("</"+c[2],"g")),a=K):c[3]!==void 0&&(a=K):a===K?c[0]===">"?(a=s??nt,u=-1):c[1]===void 0?u=-2:(u=a.lastIndex-c[2].length,l=c[1],a=c[3]===void 0?K:c[3]==='"'?oe:re):a===oe||a===re?a=K:a===ie||a===ae?a=nt:(a=K,s=void 0);let b=a===K&&o[r+1].startsWith("/>")?" ":"";i+=a===nt?d+Oe:u>=0?(e.push(l),d.slice(0,u)+de+d.slice(u)+F+b):d+F+(u===-2?r:b)}return[pe(o,i+(o[t]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),e]},rt=class o{constructor({strings:n,_$litType$:t},e){let s;this.parts=[];let i=0,a=0,r=n.length-1,d=this.parts,[l,c]=Be(n,t);if(this.el=o.createElement(l,e),G.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=G.nextNode())!==null&&d.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(de)){let g=c[a++],b=s.getAttribute(u).split(F),w=/([.?@])?(.*)/.exec(g);d.push({type:1,index:i,name:w[2],strings:b,ctor:w[1]==="."?Lt:w[1]==="?"?It:w[1]==="@"?Dt:J}),s.removeAttribute(u)}else u.startsWith(F)&&(d.push({type:6,index:i}),s.removeAttribute(u));if(ce.test(s.tagName)){let u=s.textContent.split(F),g=u.length-1;if(g>0){s.textContent=_t?_t.emptyScript:"";for(let b=0;b<g;b++)s.append(u[b],it()),G.nextNode(),d.push({type:2,index:++i});s.append(u[g],it())}}}else if(s.nodeType===8)if(s.data===he)d.push({type:2,index:i});else{let u=-1;for(;(u=s.data.indexOf(F,u+1))!==-1;)d.push({type:7,index:i}),u+=F.length-1}i++}}static createElement(n,t){let e=Z.createElement("template");return e.innerHTML=n,e}};function X(o,n,t=o,e){if(n===q)return n;let s=e!==void 0?t._$Co?.[e]:t._$Cl,i=at(n)?void 0:n._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(o),s._$AT(o,t,e)),e!==void 0?(t._$Co??=[])[e]=s:t._$Cl=s),s!==void 0&&(n=X(o,s._$AS(o,n.values),s,e)),n}var Ct=class{constructor(n,t){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:t},parts:e}=this._$AD,s=(n?.creationScope??Z).importNode(t,!0);G.currentNode=s;let i=G.nextNode(),a=0,r=0,d=e[0];for(;d!==void 0;){if(a===d.index){let l;d.type===2?l=new ot(i,i.nextSibling,this,n):d.type===1?l=new d.ctor(i,d.name,d.strings,this,n):d.type===6&&(l=new Ht(i,this,n)),this._$AV.push(l),d=e[++r]}a!==d?.index&&(i=G.nextNode(),a++)}return G.currentNode=Z,s}p(n){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(n,e,t),t+=e.strings.length-2):e._$AI(n[t])),t++}},ot=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,t,e,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=n,this._$AB=t,this._$AM=e,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,t=this._$AM;return t!==void 0&&n?.nodeType===11&&(n=t.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,t=this){n=X(this,n,t),at(n)?n===m||n==null||n===""?(this._$AH!==m&&this._$AR(),this._$AH=m):n!==this._$AH&&n!==q&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):Ne(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==m&&at(this._$AH)?this._$AA.nextSibling.data=n:this.T(Z.createTextNode(n)),this._$AH=n}$(n){let{values:t,_$litType$:e}=n,s=typeof e=="number"?this._$AC(n):(e.el===void 0&&(e.el=rt.createElement(pe(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===s)this._$AH.p(t);else{let i=new Ct(s,this),a=i.u(this.options);i.p(t),this.T(a),this._$AH=i}}_$AC(n){let t=le.get(n.strings);return t===void 0&&le.set(n.strings,t=new rt(n)),t}k(n){Nt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,s=0;for(let i of n)s===t.length?t.push(e=new o(this.O(it()),this.O(it()),this,this.options)):e=t[s],e._$AI(i),s++;s<t.length&&(this._$AR(e&&e._$AB.nextSibling,s),t.length=s)}_$AR(n=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);n!==this._$AB;){let e=se(n).nextSibling;se(n).remove(),n=e}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,t,e,s,i){this.type=1,this._$AH=m,this._$AN=void 0,this.element=n,this.name=t,this._$AM=s,this.options=i,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=m}_$AI(n,t=this,e,s){let i=this.strings,a=!1;if(i===void 0)n=X(this,n,t,0),a=!at(n)||n!==this._$AH&&n!==q,a&&(this._$AH=n);else{let r=n,d,l;for(n=i[0],d=0;d<i.length-1;d++)l=X(this,r[e+d],t,d),l===q&&(l=this._$AH[d]),a||=!at(l)||l!==this._$AH[d],l===m?n=m:n!==m&&(n+=(l??"")+i[d+1]),this._$AH[d]=l}a&&!s&&this.j(n)}j(n){n===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}},Lt=class extends J{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===m?void 0:n}},It=class extends J{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==m)}},Dt=class extends J{constructor(n,t,e,s,i){super(n,t,e,s,i),this.type=5}_$AI(n,t=this){if((n=X(this,n,t,0)??m)===q)return;let e=this._$AH,s=n===m&&e!==m||n.capture!==e.capture||n.once!==e.once||n.passive!==e.passive,i=n!==m&&(e===m||s);s&&this.element.removeEventListener(this.name,this,e),i&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}},Ht=class{constructor(n,t,e){this.element=n,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(n){X(this,n)}};var je=Ot.litHtmlPolyfillSupport;je?.(rt,ot),(Ot.litHtmlVersions??=[]).push("3.3.3");var me=(o,n,t)=>{let e=t?.renderBefore??n,s=e._$litPart$;if(s===void 0){let i=t?.renderBefore??null;e._$litPart$=s=new ot(n.insertBefore(it(),i),i,void 0,t??{})}return s._$AI(o),s};var jt=globalThis,k=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};k._$litElement$=!0,k.finalized=!0,jt.litElementHydrateSupport?.({LitElement:k});var Ue=jt.litElementPolyfillSupport;Ue?.({LitElement:k});(jt.litElementVersions??=[]).push("4.2.2");var A=o=>(n,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,n)}):customElements.define(o,n)};var Fe={attribute:!0,type:String,converter:st,reflect:!1,hasChanged:$t},We=(o=Fe,n,t)=>{let{kind:e,metadata:s}=t,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),e==="setter"&&((o=Object.create(o)).wrapped=!0),i.set(t.name,o),e==="accessor"){let{name:a}=t;return{set(r){let d=n.get.call(this);n.set.call(this,r),this.requestUpdate(a,d,o,!0,r)},init(r){return r!==void 0&&this.C(a,void 0,o,r),r}}}if(e==="setter"){let{name:a}=t;return function(r){let d=this[a];n.call(this,r),this.requestUpdate(a,d,o,!0,r)}}throw Error("Unsupported decorator location: "+e)};function f(o){return(n,t)=>typeof t=="object"?We(o,n,t):((e,s,i)=>{let a=s.hasOwnProperty(i);return s.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(s,i):void 0})(o,n,t)}function v(o){return f({...o,state:!0,attribute:!1})}var Y=(o,n,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof n!="object"&&Object.defineProperty(o,n,t),t);function wt(o,n){return(t,e,s)=>{let i=a=>a.renderRoot?.querySelector(o)??null;if(n){let{get:a,set:r}=typeof e=="object"?t:s??(()=>{let d=Symbol();return{get(){return this[d]},set(l){this[d]=l}}})();return Y(t,e,{get(){let d=a.call(this);return d===void 0&&(d=i(this),(d!==null||this.hasUpdated)&&r.call(this,d)),d}})}return Y(t,e,{get(){return i(this)}})}}var ue="garden_manager",lt=class{constructor(n){this.hass=n}setHass(n){this.hass=n}call(n,t={}){return this.hass.connection.sendMessagePromise({type:`${ue}/${n}`,...t})}subscribe(n){return this.hass.connection.subscribeMessage(n,{type:`${ue}/subscribe`})}plants(){return this.call("plants")}savePlant(n,t){return this.call("plants/save",{plant:n,mode:t})}deletePlant(n){return this.call("plants/delete",{plant_id:n})}plantWindows(n,t,e){return this.call("plants/windows",{plant_id:n,zone_id:t??null,season:e??null})}savePlan(n,t){return this.call("plan/save",{...n,base_revision:t})}checkBed(n,t){return this.call("plan/check",{bed:n,plantings:t})}succession(n,t,e,s){return this.call("plan/succession",{planting:n,count:t,interval_days:e,placement:s})}exportPlan(n,t=!1){return this.call("plan/export",{format:n,include_tasks:t})}importPlan(n,t){return this.call("plan/import",{content:n,mode:t})}addTask(n){return this.call("tasks/add",n)}taskAction(n,t,e={}){return this.call("tasks/action",{task_id:n,action:t,...e})}saveSettings(n){return this.call("settings/save",{settings:n})}async uploadPhoto(n){let t=new FormData;t.append("file",n);let e=await this.hass.fetchWithAuth("/api/image/upload",{method:"POST",body:t});if(!e.ok)throw new Error(`Upload failed (${e.status})`);return(await e.json()).id}},Ut=(o,n="256x256")=>o.startsWith("http")||o.startsWith("/")?o:`/api/image/serve/${o}/${n}`;var Ft=(o=32)=>E`
  <svg width=${o} height=${o} viewBox="0 0 64 64" role="img" aria-label="Hortulus" xmlns="http://www.w3.org/2000/svg">
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
  </svg>`;var Wt={"app.name":"Hortulus","app.tagline":"Your vegetable garden, planned and cared for","nav.dashboard":"Today","nav.planner":"Planner","nav.library":"Plants","nav.calendar":"Calendar","nav.settings":"Settings","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.close":"Close","common.add":"Add","common.edit":"Edit","common.none":"None","common.loading":"Loading your garden\u2026","common.not_loaded":"Hortulus is not set up yet. Add the integration under Settings \u2192 Devices & services.","common.minutes":"{n} min","common.days":"{n} days","common.cm":"{n} cm","common.today":"Today","common.tomorrow":"Tomorrow","common.yesterday":"Yesterday","common.overdue":"Overdue","common.unknown":"Unknown","common.search":"Search","common.all":"All","common.season":"Season {year}","common.admin_only":"Only administrators can change the plan.","common.saved":"Saved","common.saving":"Saving\u2026","common.unsaved":"Unsaved changes","common.conflict":"Changed elsewhere - reloaded","common.error":"Something went wrong: {message}","dash.greeting_morning":"Good morning","dash.greeting_afternoon":"Good afternoon","dash.greeting_evening":"Good evening","dash.today_tasks":"Today's tasks","dash.no_tasks":"Nothing to do today. Enjoy the garden!","dash.show_all":"Show all {n} tasks in the calendar","dash.total_time":"About {minutes} min of work","dash.beds":"Beds","dash.weather":"Next 48 hours","dash.greenhouse":"Greenhouse","dash.coming_up":"Coming up","dash.gdd":"Growing degree days","dash.gdd_since":"since {date}","dash.frost_risk":"Frost risk","dash.min_temp":"Lowest {temp} \xB0C","dash.rain":"Rain {mm} mm","dash.inside":"Inside {temp} \xB0C","dash.limits":"Crops tolerate {min}\u2013{max} \xB0C","dash.no_sensor":"No sensor","dash.active_crops":"{n} crops in the ground","dash.forecast_missing":"No forecast - advice is less precise.","planner.season":"Season","planner.undo":"Undo","planner.redo":"Redo","planner.snap":"Snap to grid","planner.zoom_in":"Zoom in","planner.zoom_out":"Zoom out","planner.fit":"Fit to screen","planner.add_bed":"Add bed","planner.add_zone":"Add zone","planner.overlay_companions":"Companions","planner.overlay_moisture":"Moisture","planner.overlay_temperature":"Temperature","planner.view_date":"Show garden on","planner.palette":"Plants","planner.palette_hint":"Drag a plant onto a bed, or press Enter to add it to the selected bed.","planner.layout":"Layout","planner.layout.single":"Single","planner.layout.block":"Block","planner.layout.row":"Row","planner.inspector":"Details","planner.nothing_selected":"Select a bed or planting to see details. Press ? for keyboard shortcuts.","planner.method":"Method","planner.method.indoor_sow":"Sow indoors, plant out","planner.method.direct_sow":"Sow in place","planner.method.transplant":"Plant (bought plants / sets)","planner.status":"Status","planner.count":"{n} plants","planner.timeline":"Timeline","planner.succession":"Succession sowing","planner.succession_count":"Number of sowings","planner.succession_interval":"Every (days)","planner.succession_placement":"Placement","planner.succession.split":"Split the area in strips","planner.succession.stack":"Same spot, one after another","planner.succession_create":"Create sowings","planner.succession_dropped":"{n} sowings fell outside the sowing window and were skipped.","planner.duplicate":"Duplicate","planner.remove":"Remove","planner.bed_name":"Name","planner.zone":"Zone","planner.kind":"Type","planner.width":"Width (cm)","planner.length":"Length (cm)","planner.orientation":"Row direction (\xB0)","planner.soil":"Soil","planner.shade":"Shade (%)","planner.wind":"Wind","planner.score":"Companion score","planner.warnings":"Warnings","planner.no_warnings":"No conflicts - nice combination!","planner.out_of_bounds":"Partly outside the bed.","planner.placed":"{plant} placed in {bed}.","planner.moved":"{name} moved.","planner.removed":"{name} removed.","planner.no_bed_here":"Drop plants onto a bed.","planner.export_json":"Export JSON","planner.export_yaml":"Export YAML","planner.import":"Import plan","planner.import_mode":"Import mode","planner.import_merge":"Merge with current plan","planner.import_replace":"Replace current plan","planner.imported":"Imported: {beds} beds, {plantings} plantings.","planner.shortcuts":"Keyboard shortcuts","planner.legend":"Plant families","planner.new_bed":"New bed","planner.new_zone":"New zone","shortcut.move":"Move selection (Shift = 10\xD7)","shortcut.undo":"Undo","shortcut.redo":"Redo","shortcut.delete":"Remove selection","shortcut.duplicate":"Duplicate selection","shortcut.grid":"Toggle snap-to-grid","shortcut.companions":"Toggle companion overlay","shortcut.moisture":"Toggle moisture overlay","shortcut.zoom":"Zoom in / out","shortcut.escape":"Clear selection","shortcut.cycle":"Select next / previous item","shortcut.help":"Show this help","lib.title":"Plant library","lib.search":"Search by name, latin name or family","lib.family":"Family","lib.filter_greenhouse":"Greenhouse","lib.filter_quick":"Quick crops","lib.filter_custom":"My plants","lib.add_custom":"New plant","lib.customize":"Customize","lib.reset":"Reset to built-in","lib.spacing":"Spacing","lib.row_spacing":"Row spacing","lib.depth":"Sowing depth","lib.germination":"Germination","lib.maturity":"Days to maturity","lib.soil_temp":"Min. soil temperature","lib.frost":"Frost tolerance","lib.min_temp":"Minimum temperature","lib.greenhouse":"Greenhouse","lib.water":"Water","lib.nutrients":"Nutrients","lib.rotation":"Rotation","lib.rotation_years":"{n} years before the same family returns","lib.friends":"Good companions","lib.enemies":"Keep apart from","lib.pests":"Pests","lib.diseases":"Diseases","lib.care":"Care","lib.calendar":"Sowing calendar","lib.indoor_sow":"Sow indoors","lib.direct_sow":"Sow outdoors","lib.transplant":"Plant out","lib.harvest":"Harvest","lib.source.builtin":"Built-in","lib.source.custom":"Custom","lib.source.override":"Customized","lib.id":"Identifier","lib.name_en":"Name (English)","lib.name_nl":"Name (Dutch)","lib.scientific":"Scientific name","lib.variety":"Variety","lib.habit":"Growth habit","lib.windows_hint":"Weeks relative to the average last spring frost (negative = before).","lib.weeks":"weeks","lib.from":"from","lib.to":"to","lib.saved":"{plant} saved.","cal.month":"Month","cal.week":"Week","cal.list":"List","cal.prev":"Previous","cal.next":"Next","cal.show_done":"Show completed","cal.add_task":"New task","cal.all_beds":"All beds","task.complete":"Done","task.skip":"Skip","task.reopen":"Reopen","task.postpone":"Postpone","task.postpone_1":"+1 day","task.postpone_3":"+3 days","task.postpone_7":"+1 week","task.postpone_to":"Move to date","task.note":"Note","task.notes":"Notes","task.photos":"Photos","task.add_photo":"Add photo","task.priority":"Priority","task.duration":"Duration (min)","task.due":"Due","task.window":"Window {start} \u2013 {end}","task.repeat":"Repeats every {n} days","task.repeat_days":"Repeat every (days, optional)","task.title":"Title","task.type":"Type","task.bed":"Bed","task.description":"Description","task.shifted":"{n} dependent tasks moved along.","task.beyond_window":"Careful: the new date is after the ideal window.","task.completed":"Nice work! {title} done.","task.source.generated":"From your plan","task.source.sensor":"From sensors","task.source.weather":"From the forecast","task.source.user":"Added by you","settings.region":"Climate & region","settings.hemisphere":"Hemisphere","settings.hemisphere.north":"Northern","settings.hemisphere.south":"Southern","settings.mode":"Profile","settings.mode.preset":"Regional preset","settings.mode.usda":"USDA hardiness zone","settings.mode.custom":"Custom frost dates","settings.preset":"Region","settings.zone":"Hardiness zone","settings.last_frost":"Last spring frost (MM-DD)","settings.first_frost":"First autumn frost (MM-DD)","settings.frost_dates_now":"This season: last frost {last}, first frost {first}.","settings.weather":"Weather & outdoor sensors","settings.weather_entity":"Weather entity","settings.outdoor_temp":"Outdoor temperature","settings.rain":"Rain sensor","settings.zones":"Zones & microclimates","settings.beds":"Beds & sensors","settings.zone_type.outdoor":"Outdoor","settings.zone_type.greenhouse":"Greenhouse","settings.zone_type.cold_frame":"Cold frame","settings.heated":"Heated","settings.min_heating":"Heating keeps above (\xB0C)","settings.sensors":"Sensors","settings.sensor.soil_moisture":"Soil moisture","settings.sensor.soil_temperature":"Soil temperature","settings.sensor.air_temperature":"Air temperature","settings.sensor.air_humidity":"Air humidity","settings.sensor.light":"Light","settings.sensor.rain":"Rain","settings.irrigation":"Irrigation switch/valve","settings.flow":"Flow (L/min)","settings.vent":"Vent / window opener","settings.notifications":"Notifications","settings.persistent":"Persistent notifications","settings.notify_services":"Push notifications (comma separated notify services)","settings.tts":"Text-to-speech entity","settings.tts_players":"Speakers (comma separated)","settings.digest":"Daily digest at","settings.frost_alerts":"Frost alerts","settings.heat_alerts":"Heat alerts","settings.tts_frost":"Announce frost on speakers","settings.general":"General","settings.language":"Language","settings.language.auto":"Follow Home Assistant","settings.units":"Units","settings.units_metric":"Metric (cm, \xB0C, mm, L)","settings.snap":"Grid size (cm)","settings.radius":"Companion radius (cm)","settings.data":"Import & export","settings.saved":"Settings saved.","type.sow_indoor":"Sow indoors","type.sow_direct":"Sow outdoors","type.harden_off":"Harden off","type.transplant":"Plant out","type.thin":"Thin","type.stake":"Support","type.prune":"Prune","type.pinch":"Pinch","type.earth_up":"Earth up","type.feed":"Feed","type.water":"Water","type.weed":"Weed","type.pest_check":"Pest check","type.harvest":"Harvest","type.ventilate":"Ventilate","type.shade":"Shade","type.frost_protect":"Frost protection","type.custom":"Task","priority.low":"Low","priority.normal":"Normal","priority.high":"High","priority.urgent":"Urgent","status.planned":"Planned","status.sown_indoors":"Sown indoors","status.sown":"Sown","status.transplanted":"Planted out","status.harvesting":"Harvesting","status.finished":"Finished","status.failed":"Failed","risk.none":"none","risk.low":"low","risk.moderate":"moderate","risk.high":"high","risk.unknown":"unknown","moisture.dry":"Dry","moisture.slightly_dry":"Slightly dry","moisture.optimal":"Optimal","moisture.wet":"Wet","moisture.unknown":"No data","irrigation.none":"No water needed","irrigation.water":"Water {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Skip - rain expected","irrigation.check_manually":"Check by hand (~{mm} mm)","gh.none":"All good","gh.ventilate":"Ventilate","gh.shade":"Shade now","gh.close_up":"Close before night","gh.heat":"Turn on heating","level.low":"Low","level.medium":"Medium","level.high":"High","suit.yes":"Suitable","suit.no":"Not suitable","suit.conditional":"Possible","frost.tender":"Tender","frost.half_hardy":"Half hardy","frost.hardy":"Hardy","frost.very_hardy":"Very hardy","kind.in_ground":"In-ground bed","kind.raised":"Raised bed","kind.container":"Container","soil.sandy":"Sandy","soil.loam":"Loam","soil.clay":"Clay","soil.silt":"Silt","soil.peat":"Peat","soil.chalk":"Chalk","soil.potting_mix":"Potting mix","wind.sheltered":"Sheltered","wind.moderate":"Moderate","wind.exposed":"Exposed","habit.bush":"Bush","habit.vine":"Vine","habit.climbing":"Climbing","habit.upright":"Upright","habit.rosette":"Rosette","habit.root":"Root crop","habit.bulb":"Bulb","reason.soil_too_cold":"Soil is {soil} \xB0C; {plant} needs {min} \xB0C to germinate.","reason.soil_too_hot":"Soil is {soil} \xB0C; above {max} \xB0C {plant} germinates poorly.","reason.frost_forecast":"Frost ({temp} \xB0C) forecast before {date}; {plant} is frost tender.","reason.window_open":"Window is open.","reason.window_not_yet":"Window opens {date}.","reason.window_closed":"Window closed on {date}.","reason.not_greenhouse_suitable":"{plant} is not suited to a greenhouse.","compat.friend":"{a} and {b} are good companions: {reason}","compat.enemy":"{a} and {b} should not be planted together: {reason}","compat.overlap":"{a} and {b} overlap - not enough space.","compat.rotation":"{family} grew in {bed} in {season}; wait {years} years.","compat.same_family_adjacent":"{a} and {b} share a family and its pests.","alert.frost":"Frost risk {level}: {temp} \xB0C expected {when}","alert.heat":"Heat stress in {zone}: {temp} \xB0C expected","alert.dry":"{bed} is dry ({moisture}%)","alert.sensor_stale":"Sensor {entity} has not reported for a while","alert.forecast_unavailable":"Weather forecast unavailable","when.tonight":"tonight","when.tomorrow_night":"tomorrow night"};var ge={"app.name":"Hortulus","app.tagline":"Je moestuin, gepland en verzorgd","nav.dashboard":"Vandaag","nav.planner":"Planner","nav.library":"Planten","nav.calendar":"Kalender","nav.settings":"Instellingen","common.save":"Opslaan","common.cancel":"Annuleren","common.delete":"Verwijderen","common.close":"Sluiten","common.add":"Toevoegen","common.edit":"Bewerken","common.none":"Geen","common.loading":"Je tuin wordt geladen\u2026","common.not_loaded":"Hortulus is nog niet ingesteld. Voeg de integratie toe via Instellingen \u2192 Apparaten & diensten.","common.minutes":"{n} min","common.days":"{n} dagen","common.cm":"{n} cm","common.today":"Vandaag","common.tomorrow":"Morgen","common.yesterday":"Gisteren","common.overdue":"Te laat","common.unknown":"Onbekend","common.search":"Zoeken","common.all":"Alle","common.season":"Seizoen {year}","common.admin_only":"Alleen beheerders kunnen het plan wijzigen.","common.saved":"Opgeslagen","common.saving":"Opslaan\u2026","common.unsaved":"Niet-opgeslagen wijzigingen","common.conflict":"Elders gewijzigd - opnieuw geladen","common.error":"Er ging iets mis: {message}","dash.greeting_morning":"Goedemorgen","dash.greeting_afternoon":"Goedemiddag","dash.greeting_evening":"Goedenavond","dash.today_tasks":"Taken voor vandaag","dash.no_tasks":"Niets te doen vandaag. Geniet van de tuin!","dash.show_all":"Alle {n} taken tonen in de kalender","dash.total_time":"Ongeveer {minutes} min werk","dash.beds":"Bedden","dash.weather":"Komende 48 uur","dash.greenhouse":"Kas","dash.coming_up":"Binnenkort","dash.gdd":"Graaddagen","dash.gdd_since":"sinds {date}","dash.frost_risk":"Vorstrisico","dash.min_temp":"Laagste {temp} \xB0C","dash.rain":"Regen {mm} mm","dash.inside":"Binnen {temp} \xB0C","dash.limits":"Gewassen verdragen {min}\u2013{max} \xB0C","dash.no_sensor":"Geen sensor","dash.active_crops":"{n} gewassen in de grond","dash.forecast_missing":"Geen weersverwachting - advies is minder nauwkeurig.","planner.season":"Seizoen","planner.undo":"Ongedaan maken","planner.redo":"Opnieuw","planner.snap":"Uitlijnen op raster","planner.zoom_in":"Inzoomen","planner.zoom_out":"Uitzoomen","planner.fit":"Passend maken","planner.add_bed":"Bed toevoegen","planner.add_zone":"Zone toevoegen","planner.overlay_companions":"Buurplanten","planner.overlay_moisture":"Vocht","planner.overlay_temperature":"Temperatuur","planner.view_date":"Toon tuin op","planner.palette":"Planten","planner.palette_hint":"Sleep een plant naar een bed, of druk op Enter om hem aan het geselecteerde bed toe te voegen.","planner.layout":"Indeling","planner.layout.single":"Los","planner.layout.block":"Blok","planner.layout.row":"Rij","planner.inspector":"Details","planner.nothing_selected":"Selecteer een bed of beplanting voor details. Druk op ? voor sneltoetsen.","planner.method":"Methode","planner.method.indoor_sow":"Binnen zaaien, later uitplanten","planner.method.direct_sow":"Ter plaatse zaaien","planner.method.transplant":"Planten (gekochte planten / plantuitjes)","planner.status":"Status","planner.count":"{n} planten","planner.timeline":"Tijdlijn","planner.succession":"Opeenvolgend zaaien","planner.succession_count":"Aantal zaaimomenten","planner.succession_interval":"Elke (dagen)","planner.succession_placement":"Plaatsing","planner.succession.split":"Vlak in stroken verdelen","planner.succession.stack":"Zelfde plek, na elkaar","planner.succession_create":"Zaaimomenten maken","planner.succession_dropped":"{n} zaaimomenten vielen buiten het zaaivenster en zijn overgeslagen.","planner.duplicate":"Dupliceren","planner.remove":"Verwijderen","planner.bed_name":"Naam","planner.zone":"Zone","planner.kind":"Soort","planner.width":"Breedte (cm)","planner.length":"Lengte (cm)","planner.orientation":"Rijrichting (\xB0)","planner.soil":"Grond","planner.shade":"Schaduw (%)","planner.wind":"Wind","planner.score":"Buurplantenscore","planner.warnings":"Waarschuwingen","planner.no_warnings":"Geen conflicten - mooie combinatie!","planner.out_of_bounds":"Valt deels buiten het bed.","planner.placed":"{plant} geplaatst in {bed}.","planner.moved":"{name} verplaatst.","planner.removed":"{name} verwijderd.","planner.no_bed_here":"Zet planten op een bed.","planner.export_json":"Exporteer JSON","planner.export_yaml":"Exporteer YAML","planner.import":"Plan importeren","planner.import_mode":"Importmodus","planner.import_merge":"Samenvoegen met huidig plan","planner.import_replace":"Huidig plan vervangen","planner.imported":"Ge\xEFmporteerd: {beds} bedden, {plantings} beplantingen.","planner.shortcuts":"Sneltoetsen","planner.legend":"Plantenfamilies","planner.new_bed":"Nieuw bed","planner.new_zone":"Nieuwe zone","shortcut.move":"Selectie verplaatsen (Shift = 10\xD7)","shortcut.undo":"Ongedaan maken","shortcut.redo":"Opnieuw","shortcut.delete":"Selectie verwijderen","shortcut.duplicate":"Selectie dupliceren","shortcut.grid":"Raster aan/uit","shortcut.companions":"Buurplanten-laag aan/uit","shortcut.moisture":"Vochtlaag aan/uit","shortcut.zoom":"In- / uitzoomen","shortcut.escape":"Selectie opheffen","shortcut.cycle":"Volgend / vorig item selecteren","shortcut.help":"Deze hulp tonen","lib.title":"Plantenbibliotheek","lib.search":"Zoek op naam, Latijnse naam of familie","lib.family":"Familie","lib.filter_greenhouse":"Kas","lib.filter_quick":"Snelle gewassen","lib.filter_custom":"Mijn planten","lib.add_custom":"Nieuwe plant","lib.customize":"Aanpassen","lib.reset":"Terug naar standaard","lib.spacing":"Plantafstand","lib.row_spacing":"Rijafstand","lib.depth":"Zaaidiepte","lib.germination":"Kiemduur","lib.maturity":"Dagen tot oogst","lib.soil_temp":"Min. bodemtemperatuur","lib.frost":"Vorstbestendigheid","lib.min_temp":"Minimumtemperatuur","lib.greenhouse":"Kas","lib.water":"Water","lib.nutrients":"Voeding","lib.rotation":"Wisselteelt","lib.rotation_years":"{n} jaar voordat dezelfde familie terugkomt","lib.friends":"Goede buren","lib.enemies":"Uit elkaar houden","lib.pests":"Plagen","lib.diseases":"Ziekten","lib.care":"Verzorging","lib.calendar":"Zaaikalender","lib.indoor_sow":"Binnen zaaien","lib.direct_sow":"Buiten zaaien","lib.transplant":"Uitplanten","lib.harvest":"Oogsten","lib.source.builtin":"Standaard","lib.source.custom":"Eigen","lib.source.override":"Aangepast","lib.id":"Code","lib.name_en":"Naam (Engels)","lib.name_nl":"Naam (Nederlands)","lib.scientific":"Wetenschappelijke naam","lib.variety":"Ras","lib.habit":"Groeiwijze","lib.windows_hint":"Weken ten opzichte van de gemiddelde laatste voorjaarsvorst (negatief = ervoor).","lib.weeks":"weken","lib.from":"van","lib.to":"tot","lib.saved":"{plant} opgeslagen.","cal.month":"Maand","cal.week":"Week","cal.list":"Lijst","cal.prev":"Vorige","cal.next":"Volgende","cal.show_done":"Afgeronde taken tonen","cal.add_task":"Nieuwe taak","cal.all_beds":"Alle bedden","task.complete":"Klaar","task.skip":"Overslaan","task.reopen":"Heropenen","task.postpone":"Uitstellen","task.postpone_1":"+1 dag","task.postpone_3":"+3 dagen","task.postpone_7":"+1 week","task.postpone_to":"Naar datum","task.note":"Notitie","task.notes":"Notities","task.photos":"Foto's","task.add_photo":"Foto toevoegen","task.priority":"Prioriteit","task.duration":"Duur (min)","task.due":"Datum","task.window":"Venster {start} \u2013 {end}","task.repeat":"Herhaalt elke {n} dagen","task.repeat_days":"Herhaal elke (dagen, optioneel)","task.title":"Titel","task.type":"Soort","task.bed":"Bed","task.description":"Omschrijving","task.shifted":"{n} afhankelijke taken schoven mee.","task.beyond_window":"Let op: de nieuwe datum ligt na het ideale venster.","task.completed":"Goed bezig! {title} gedaan.","task.source.generated":"Uit je plan","task.source.sensor":"Uit sensoren","task.source.weather":"Uit de weersverwachting","task.source.user":"Door jou toegevoegd","settings.region":"Klimaat & regio","settings.hemisphere":"Halfrond","settings.hemisphere.north":"Noordelijk","settings.hemisphere.south":"Zuidelijk","settings.mode":"Profiel","settings.mode.preset":"Regionale voorinstelling","settings.mode.usda":"USDA-winterhardheidszone","settings.mode.custom":"Eigen vorstdata","settings.preset":"Regio","settings.zone":"Winterhardheidszone","settings.last_frost":"Laatste voorjaarsvorst (MM-DD)","settings.first_frost":"Eerste najaarsvorst (MM-DD)","settings.frost_dates_now":"Dit seizoen: laatste vorst {last}, eerste vorst {first}.","settings.weather":"Weer & buitensensoren","settings.weather_entity":"Weerentiteit","settings.outdoor_temp":"Buitentemperatuur","settings.rain":"Regensensor","settings.zones":"Zones & microklimaat","settings.beds":"Bedden & sensoren","settings.zone_type.outdoor":"Buiten","settings.zone_type.greenhouse":"Kas","settings.zone_type.cold_frame":"Koude bak","settings.heated":"Verwarmd","settings.min_heating":"Verwarming houdt boven (\xB0C)","settings.sensors":"Sensoren","settings.sensor.soil_moisture":"Bodemvocht","settings.sensor.soil_temperature":"Bodemtemperatuur","settings.sensor.air_temperature":"Luchttemperatuur","settings.sensor.air_humidity":"Luchtvochtigheid","settings.sensor.light":"Licht","settings.sensor.rain":"Regen","settings.irrigation":"Beregeningsschakelaar/-klep","settings.flow":"Debiet (L/min)","settings.vent":"Raamopener / ventilatie","settings.notifications":"Meldingen","settings.persistent":"Blijvende meldingen","settings.notify_services":"Pushmeldingen (notify-diensten, kommagescheiden)","settings.tts":"Tekst-naar-spraak-entiteit","settings.tts_players":"Speakers (kommagescheiden)","settings.digest":"Dagelijks overzicht om","settings.frost_alerts":"Vorstwaarschuwingen","settings.heat_alerts":"Hittewaarschuwingen","settings.tts_frost":"Vorst omroepen via speakers","settings.general":"Algemeen","settings.language":"Taal","settings.language.auto":"Volg Home Assistant","settings.units":"Eenheden","settings.units_metric":"Metrisch (cm, \xB0C, mm, L)","settings.snap":"Rastergrootte (cm)","settings.radius":"Bereik buurplanten (cm)","settings.data":"Importeren & exporteren","settings.saved":"Instellingen opgeslagen.","type.sow_indoor":"Binnen zaaien","type.sow_direct":"Buiten zaaien","type.harden_off":"Afharden","type.transplant":"Uitplanten","type.thin":"Uitdunnen","type.stake":"Ondersteunen","type.prune":"Snoeien","type.pinch":"Toppen","type.earth_up":"Aanaarden","type.feed":"Bemesten","type.water":"Water geven","type.weed":"Wieden","type.pest_check":"Plaagcontrole","type.harvest":"Oogsten","type.ventilate":"Luchten","type.shade":"Schaduwen","type.frost_protect":"Vorstbescherming","type.custom":"Taak","priority.low":"Laag","priority.normal":"Normaal","priority.high":"Hoog","priority.urgent":"Dringend","status.planned":"Gepland","status.sown_indoors":"Binnen gezaaid","status.sown":"Gezaaid","status.transplanted":"Uitgeplant","status.harvesting":"Oogst loopt","status.finished":"Afgerond","status.failed":"Mislukt","risk.none":"geen","risk.low":"laag","risk.moderate":"matig","risk.high":"hoog","risk.unknown":"onbekend","moisture.dry":"Droog","moisture.slightly_dry":"Iets droog","moisture.optimal":"Optimaal","moisture.wet":"Nat","moisture.unknown":"Geen data","irrigation.none":"Geen water nodig","irrigation.water":"Geef {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Overslaan - regen verwacht","irrigation.check_manually":"Controleer met de hand (~{mm} mm)","gh.none":"Alles goed","gh.ventilate":"Luchten","gh.shade":"Nu schaduwen","gh.close_up":"Sluiten voor de nacht","gh.heat":"Verwarming aan","level.low":"Laag","level.medium":"Gemiddeld","level.high":"Hoog","suit.yes":"Geschikt","suit.no":"Niet geschikt","suit.conditional":"Mogelijk","frost.tender":"Vorstgevoelig","frost.half_hardy":"Half winterhard","frost.hardy":"Winterhard","frost.very_hardy":"Zeer winterhard","kind.in_ground":"Bed in de grond","kind.raised":"Verhoogd bed","kind.container":"Bak / pot","soil.sandy":"Zand","soil.loam":"Leem","soil.clay":"Klei","soil.silt":"L\xF6ss","soil.peat":"Veen","soil.chalk":"Kalk","soil.potting_mix":"Potgrond","wind.sheltered":"Beschut","wind.moderate":"Gemiddeld","wind.exposed":"Winderig","habit.bush":"Struik","habit.vine":"Rank","habit.climbing":"Klimmend","habit.upright":"Rechtop","habit.rosette":"Rozet","habit.root":"Wortelgewas","habit.bulb":"Bol","reason.soil_too_cold":"Grond is {soil} \xB0C; {plant} heeft {min} \xB0C nodig om te kiemen.","reason.soil_too_hot":"Grond is {soil} \xB0C; boven {max} \xB0C kiemt {plant} slecht.","reason.frost_forecast":"Vorst ({temp} \xB0C) verwacht voor {date}; {plant} is vorstgevoelig.","reason.window_open":"Het venster is open.","reason.window_not_yet":"Venster opent {date}.","reason.window_closed":"Venster sloot op {date}.","reason.not_greenhouse_suitable":"{plant} is niet geschikt voor de kas.","compat.friend":"{a} en {b} zijn goede buren: {reason}","compat.enemy":"{a} en {b} kun je beter niet samen planten: {reason}","compat.overlap":"{a} en {b} overlappen - te weinig ruimte.","compat.rotation":"{family} stond in {season} in {bed}; wacht {years} jaar.","compat.same_family_adjacent":"{a} en {b} zijn familie en delen plagen.","alert.frost":"Vorstrisico {level}: {temp} \xB0C verwacht {when}","alert.heat":"Hittestress in {zone}: {temp} \xB0C verwacht","alert.dry":"{bed} is droog ({moisture}%)","alert.sensor_stale":"Sensor {entity} heeft al een tijd niets gemeld","alert.forecast_unavailable":"Weersverwachting niet beschikbaar","when.tonight":"vannacht","when.tomorrow_night":"morgennacht"};var Ke={en:Wt,nl:ge},dt=o=>(o??"en").toLowerCase().split(/[-_]/)[0]==="nl"?"nl":"en";function xt(o){let n=Ke[dt(o)];return(t,e={})=>(n[t]??Wt[t]??t).replace(/\{(\w+)\}/g,(i,a)=>{let r=e[a];return r==null?`{${a}}`:t.startsWith("alert.")&&a==="level"?n[`risk.${r}`]??String(r):t.startsWith("alert.")&&a==="when"?n[String(r)]??String(r):Array.isArray(r)?r.join(", "):String(r)})}var Ge=o=>o.replace(/_/g," ").replace(/^\w/,n=>n.toUpperCase()),fe={aphids:"bladluis",whitefly:"witte vlieg",red_spider_mite:"spint",thrips:"trips",slugs:"slakken",cabbage_white:"koolwitje",cabbage_root_fly:"koolvlieg",flea_beetle:"aardvlo",carrot_fly:"wortelvlieg",onion_fly:"uienvlieg",leek_moth:"preimot",pea_moth:"erwtenbladroller",birds:"vogels",pigeons:"duiven",black_bean_aphid:"zwarte bonenluis",bean_weevil:"bonenkever",leaf_miner:"bladmineerder",late_blight:"phytophthora",early_blight:"alternaria (vroeg)",blossom_end_rot:"neusrot",botrytis:"grauwe schimmel",powdery_mildew:"echte meeldauw",downy_mildew:"valse meeldauw",cucumber_mosaic_virus:"komkommermoza\xEFekvirus",clubroot:"knolvoet",white_rot:"witrot",rust:"roest",alternaria:"alternaria",leaf_spot:"bladvlekken",root_rot:"wortelrot",anthracnose:"vlekkenziekte",halo_blight:"vetvlekkenziekte",chocolate_spot:"chocoladevlekken",damping_off:"kiemplantenziekte"},Kt=(o,n)=>dt(n)==="nl"&&fe[o]?fe[o]:Ge(o);var ve=S`
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
`,z=S`
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
`;var Ze="#7d7d7d";function L(o,n){return n&&o[n]?.color||Ze}function be(o){let n=o.replace(/[^\p{L}\s]/gu,"").trim(),t=n.split(/\s+/);return t.length>1?(t[0][0]+t[1][0]).toUpperCase():(n.slice(0,2)||"?").replace(/^./,e=>e.toUpperCase())}function x(o,n){return o?o.names[n]||o.names.en||o.id:"?"}var ht={sow_indoor:"mdi:seed-outline",sow_direct:"mdi:seed",harden_off:"mdi:weather-partly-cloudy",transplant:"mdi:shovel",thin:"mdi:content-cut",stake:"mdi:pillar",prune:"mdi:scissors-cutting",pinch:"mdi:hand-back-left-outline",earth_up:"mdi:terrain",feed:"mdi:bottle-tonic-plus-outline",water:"mdi:watering-can",weed:"mdi:sprout-outline",pest_check:"mdi:bug-outline",harvest:"mdi:basket-outline",ventilate:"mdi:window-open-variant",shade:"mdi:sun-angle-outline",frost_protect:"mdi:snowflake-alert",custom:"mdi:checkbox-marked-circle-outline"},ct={sow_indoor:"var(--hl-leaf-500)",sow_direct:"var(--hl-leaf-500)",transplant:"var(--hl-leaf-700)",harvest:"var(--hl-sun-500)",water:"var(--hl-water-500)",frost_protect:"var(--hl-frost-500)",ventilate:"var(--hl-frost-500)",shade:"var(--hl-sun-500)",weed:"var(--hl-soil-500)",pest_check:"var(--hl-tomato-500)"},B=o=>{let[n,t,e]=o.slice(0,10).split("-").map(Number);return new Date(n,t-1,e,12)},pt=o=>`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`,T=(o,n)=>{let t=B(o);return t.setDate(t.getDate()+n),pt(t)},kt=(o,n)=>Math.round((B(n).getTime()-B(o).getTime())/864e5);function y(o,n,t={day:"numeric",month:"short"}){return o?B(o).toLocaleDateString(n==="nl"?"nl-NL":"en-GB",t):"\u2013"}function Gt(o,n){let t=o.anchor==="first_frost"?n.first_frost:n.last_frost,e=T(t,o.start_week*7),s=T(t,o.end_week*7+6);return e<=s?[e,s]:[s,e]}function ye(o,n,t){return n?o.status==="failed"||o.status==="finished"?!1:n.in_ground<=t&&t<=n.harvest_end:!0}function mt(o){let n={urgent:3,high:2,normal:1,low:0};return[...o].sort((t,e)=>t.due===e.due?n[e.priority]-n[t.priority]:t.due<e.due?-1:1)}function ut(o){let n=globalThis.crypto?.randomUUID?.()??Math.random().toString(16).slice(2)+Date.now().toString(16);return`${o}_${n.replace(/-/g,"").slice(0,10)}`}function St(o,n,t){let e=new Blob([n],{type:t}),s=URL.createObjectURL(e),i=document.createElement("a");i.href=s,i.download=o,i.click(),setTimeout(()=>URL.revokeObjectURL(s),1e3)}function gt(o,n){let t=o.status==="open"&&o.due<n.today,e=o.status!=="open",s=ct[o.type]??"var(--hl-soil-500)";return h`
    <li class="task-row ${e?"done":""} prio-${o.priority}">
      <button class="check" role="checkbox" aria-checked=${String(e)} aria-label=${`${n.t("task.complete")}: ${o.title}`}
        ?disabled=${e} @click=${()=>n.onComplete(o)}>
        <ha-icon icon=${e?"mdi:check-circle":"mdi:checkbox-blank-circle-outline"}></ha-icon>
      </button>
      <button class="task-main" @click=${()=>n.onOpen(o)}>
        <span class="type-icon" style=${`color:${s}`}><ha-icon icon=${ht[o.type]}></ha-icon></span>
        <span class="task-text">
          <span class="task-title">${o.title}</span>
          <span class="task-meta">
            ${t?h`<span class="chip bad">${n.t("common.overdue")} · ${y(o.due,n.lang)}</span>`:h`<span>${y(o.due,n.lang,{weekday:"short",day:"numeric",month:"short"})}</span>`}
            <span>· ${n.t("common.minutes",{n:o.estimated_minutes})}</span>
            ${o.recurrence?h`<span title=${n.t("task.repeat",{n:o.recurrence.interval_days})}>· ↻ ${o.recurrence.interval_days}d</span>`:m}
            ${o.priority==="urgent"||o.priority==="high"?h`<span class="chip ${o.priority==="urgent"?"bad":"warn"}">${n.t(`priority.${o.priority}`)}</span>`:m}
          </span>
        </span>
      </button>
    </li>`}var Tt=S`
  ul.tasks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
  .task-row { display: flex; align-items: center; gap: var(--hl-s1); border-radius: var(--hl-r-md); }
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
`,R=class extends k{constructor(){super(...arguments);this.task=null;this.beds=[];this.lang="en";this.today="";this.create=!1;this.note="";this.photos=[];this.busy=!1;this.error=""}updated(){let t=this.renderRoot.querySelector("dialog");t&&!t.open&&(this.task||this.create)&&t.showModal()}close(t=!1){this.note="",this.photos=[],this.error="",this.dispatchEvent(new CustomEvent("closed",{detail:{changed:t}}))}async run(t,e){this.busy=!0;try{await t(),e&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0})),this.close(!0)}catch(s){this.error=s.message??String(s)}finally{this.busy=!1}}async onPhoto(t){let e=t.target.files?.[0];if(e){this.busy=!0;try{this.photos=[...this.photos,await this.api.uploadPhoto(e)]}catch(s){this.error=s.message}finally{this.busy=!1}}}submitNew(t){t.preventDefault();let e=t.target,s=i=>e.elements.namedItem(i).value;this.run(()=>this.api.addTask({title:s("title"),due:s("due")||null,task_type:s("type"),description:s("description"),priority:s("priority"),estimated_minutes:Number(s("minutes"))||null,bed_id:s("bed")||null,recurrence_days:Number(s("repeat"))||null}))}renderCreate(){let t=["custom","water","weed","feed","pest_check","harvest","prune","stake","sow_direct","transplant","ventilate","frost_protect"];return h`<form @submit=${this.submitNew}>
      <div class="head"><ha-icon class="big-icon" icon="mdi:clipboard-plus-outline"></ha-icon><h2>${this.t("cal.add_task")}</h2></div>
      <div class="body">
        <div class="form-grid">
          <label class="field full">${this.t("task.title")}<input name="title" required autofocus /></label>
          <label class="field">${this.t("task.due")}<input name="due" type="date" .value=${this.today} /></label>
          <label class="field">${this.t("task.type")}<select name="type">${t.map(e=>h`<option value=${e}>${this.t(`type.${e}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.priority")}<select name="priority">${["low","normal","high","urgent"].map(e=>h`<option value=${e} ?selected=${e==="normal"}>${this.t(`priority.${e}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.duration")}<input name="minutes" type="number" min="1" value="15" /></label>
          <label class="field">${this.t("task.bed")}<select name="bed"><option value="">–</option>${this.beds.map(e=>h`<option value=${e.id}>${e.name}</option>`)}</select></label>
          <label class="field">${this.t("task.repeat_days")}<input name="repeat" type="number" min="1" max="365" /></label>
          <label class="field full">${this.t("task.description")}<textarea name="description" rows="3"></textarea></label>
        </div>
        ${this.error?h`<p class="field-error">${this.error}</p>`:m}
      </div>
      <div class="foot">
        <button type="button" class="btn ghost" @click=${()=>this.close()}>${this.t("common.cancel")}</button>
        <button class="btn primary" type="submit" ?disabled=${this.busy}>${this.t("common.add")}</button>
      </div>
    </form>`}renderTask(t){let e=t.status==="open",s=(a,r)=>this.run(()=>this.api.taskAction(t.id,a,{note:this.note||void 0,photos:this.photos.length?[...t.photos,...this.photos]:void 0}),r),i=(a,r)=>this.run(async()=>{let d=await this.api.taskAction(t.id,"postpone",{days:a,to:r,note:this.note||void 0}),l=[];d.shifted?.length&&l.push(this.t("task.shifted",{n:d.shifted.length})),d.warnings?.includes("beyond_window")&&l.push(this.t("task.beyond_window")),l.length&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:l.join(" ")},bubbles:!0,composed:!0}))});return h`
      <div class="head">
        <ha-icon class="big-icon" icon=${ht[t.type]} style=${`color:${ct[t.type]??"inherit"}`}></ha-icon>
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
        ${t.description?h`<p>${t.description}</p>`:m}
        ${t.window_start&&t.window_end&&t.window_start!==t.window_end?h`<p class="small muted">${this.t("task.window",{start:y(t.window_start,this.lang),end:y(t.window_end,this.lang)})}</p>`:m}
        ${t.recurrence?h`<p class="small muted">↻ ${this.t("task.repeat",{n:t.recurrence.interval_days})}</p>`:m}
        <div class="row wrap small">
          <span>${this.t("task.priority")}:</span>
          ${["low","normal","high","urgent"].map(a=>h`
            <button class="chip" aria-pressed=${String(t.priority===a)}
              @click=${()=>this.run(()=>this.api.taskAction(t.id,"update",{changes:{priority:a}}))}>${this.t(`priority.${a}`)}</button>`)}
        </div>
        ${t.notes.length?h`<h4>${this.t("task.notes")}</h4>${t.notes.map(a=>h`<p class="note"><span class="xs muted">${y(a.at.slice(0,10),this.lang)}</span> ${a.text}</p>`)}`:m}
        ${t.photos.length||this.photos.length?h`<h4>${this.t("task.photos")}</h4>
          <div class="photos">${[...t.photos,...this.photos].map(a=>h`<a href=${Ut(a,"original")} target="_blank" rel="noopener"><img src=${Ut(a)} alt=${this.t("task.photos")} loading="lazy" /></a>`)}</div>`:m}
        <label class="field">${this.t("task.note")}<textarea rows="2" .value=${this.note} @input=${a=>this.note=a.target.value}></textarea></label>
        <label class="btn small" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("task.add_photo")}
          <input type="file" accept="image/*" capture="environment" class="visually-hidden" @change=${this.onPhoto} /></label>
        ${e?h`
          <div class="row wrap">
            <span class="small">${this.t("task.postpone")}:</span>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>i(1)}>${this.t("task.postpone_1")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>i(3)}>${this.t("task.postpone_3")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>i(7)}>${this.t("task.postpone_7")}</button>
            <input type="date" style="width:auto" aria-label=${this.t("task.postpone_to")} .min=${T(this.today,1)}
              @change=${a=>i(void 0,a.target.value)} />
          </div>`:m}
        ${this.error?h`<p class="field-error" role="alert">${this.error}</p>`:m}
      </div>
      <div class="foot">
        ${t.source==="user"?h`<button class="btn danger" ?disabled=${this.busy} @click=${()=>s("delete")}>${this.t("common.delete")}</button>`:m}
        <span class="spacer"></span>
        <button class="btn ghost" @click=${()=>this.close()}>${this.t("common.close")}</button>
        ${e?h`<button class="btn" ?disabled=${this.busy} @click=${()=>s("skip")}>${this.t("task.skip")}</button>
              <button class="btn primary" ?disabled=${this.busy} @click=${()=>s("complete",this.t("task.completed",{title:t.title}))}>
                <ha-icon icon="mdi:check"></ha-icon>${this.t("task.complete")}</button>`:h`<button class="btn" ?disabled=${this.busy} @click=${()=>s("reopen")}>${this.t("task.reopen")}</button>`}
      </div>`}render(){return!this.task&&!this.create?m:h`<dialog @close=${()=>this.close()}>${this.create?this.renderCreate():this.renderTask(this.task)}</dialog>`}};R.styles=[z,S`
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
    `],p([f({attribute:!1})],R.prototype,"task",2),p([f({attribute:!1})],R.prototype,"beds",2),p([f({attribute:!1})],R.prototype,"api",2),p([f({attribute:!1})],R.prototype,"t",2),p([f()],R.prototype,"lang",2),p([f()],R.prototype,"today",2),p([f({type:Boolean})],R.prototype,"create",2),p([v()],R.prototype,"note",2),p([v()],R.prototype,"photos",2),p([v()],R.prototype,"busy",2),p([v()],R.prototype,"error",2),R=p([A("hl-task-dialog")],R);var $e={none:"ok",low:"cold",moderate:"warn",high:"bad",unknown:""},qe={frost:"mdi:snowflake-alert",heat:"mdi:thermometer-alert",dry:"mdi:water-alert",sensor_stale:"mdi:access-point-network-off",forecast:"mdi:weather-cloudy-alert"},j=class extends k{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en"}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}get ctx(){return{t:this.t,lang:this.lang,today:this.snapshot.analysis?.today??"",onOpen:t=>this.emit("open-task",t),onComplete:t=>this.emit("complete-task",t)}}greeting(){let t=new Date().getHours();return this.t(t<12?"dash.greeting_morning":t<18?"dash.greeting_afternoon":"dash.greeting_evening")}render(){let t=this.snapshot,e=t.analysis;if(!e)return h`<p class="empty">${this.t("common.loading")}</p>`;let s=e.today,i=mt(t.tasks.filter(l=>l.status==="open"&&l.due<=s)),a=mt(t.tasks.filter(l=>l.status==="open"&&l.due>s&&l.due<=T(s,7))),r=i.reduce((l,c)=>l+c.estimated_minutes,0),d=t.zones.filter(l=>l.type!=="outdoor");return h`
      <section class="hero">
        <div class="stack" style="gap:4px">
          <span class="muted small">${y(s,this.lang,{weekday:"long",day:"numeric",month:"long"})} · ${this.t("common.season",{year:e.season})}</span>
          <h1>${this.greeting()} 🌱</h1>
        </div>
        <span class="spacer"></span>
        <span class="chip ${$e[e.frost.level]}"><ha-icon icon="mdi:snowflake"></ha-icon>${this.t("dash.frost_risk")}: ${this.t(`risk.${e.frost.level}`)}</span>
        <span class="chip"><ha-icon icon="mdi:thermometer-plus"></ha-icon>${Math.round(e.gdd.season_total)} GDD</span>
      </section>

      ${e.alerts.length?h`<section class="alerts" aria-label="Alerts">
        ${e.alerts.map(l=>h`<div class="alert ${l.kind==="frost"?"frost":l.severity}" role=${l.severity==="critical"?"alert":"status"}>
          <ha-icon icon=${qe[l.kind]??"mdi:information-outline"}></ha-icon>
          <div><b>${this.t(l.message_key,l.params)}</b>
            ${Array.isArray(l.params.plants)&&l.params.plants.length?h`<div class="small">${l.params.plants.join(", ")}</div>`:m}</div>
        </div>`)}
      </section>`:m}

      <div class="grid">
        <section class="card span-8" aria-labelledby="today-h">
          <header><h2 id="today-h">${this.t("dash.today_tasks")}</h2><span class="spacer"></span>
            ${i.length?h`<span class="small muted">${this.t("dash.total_time",{minutes:r})}</span>`:m}</header>
          ${i.length?h`<ul class="tasks">${i.slice(0,10).map(l=>gt(l,this.ctx))}</ul>`:h`<p class="empty">${this.t("dash.no_tasks")}</p>`}
          ${i.length>10?h`<button class="btn small ghost" @click=${()=>this.emit("navigate","calendar")}>${this.t("dash.show_all",{n:i.length})}</button>`:m}
        </section>

        <section class="card span-4" aria-labelledby="weather-h">
          <header><h2 id="weather-h">${this.t("dash.weather")}</h2></header>
          ${e.weather_available?h`
            <div class="days">${e.outlook.slice(0,3).map(l=>h`
              <div class="day">
                <div class="small muted">${l.day===s?this.t("common.today"):y(l.day,this.lang,{weekday:"short"})}</div>
                <div class="temp">${l.tmax!=null?Math.round(l.tmax):"\u2013"}° <span class="muted small">${l.tmin!=null?Math.round(l.tmin):"\u2013"}°</span></div>
                <div class="xs muted">💧 ${l.rain_mm} mm${l.et0_mm!=null?h` · ET₀ ${l.et0_mm}`:m}</div>
              </div>`)}</div>
            <div class="divider"></div>
            <div class="kv"><span>${this.t("dash.frost_risk")}</span><span class="chip ${$e[e.frost.level]}">${this.t(`risk.${e.frost.level}`)}</span></div>
            ${e.frost.plant_level_min_c!=null?h`<div class="kv"><span></span><span class="muted">${this.t("dash.min_temp",{temp:e.frost.plant_level_min_c})}${e.frost.min_at?` \xB7 ${new Date(e.frost.min_at).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{weekday:"short",hour:"2-digit",minute:"2-digit"})}`:""}</span></div>`:m}
          `:h`<p class="small muted">${this.t("dash.forecast_missing")}</p>`}
          <div class="divider"></div>
          <div class="kv"><span>${this.t("dash.gdd")}</span><span><b>${Math.round(e.gdd.season_total)}</b> <span class="muted xs">${this.t("dash.gdd_since",{date:y(e.gdd.since,this.lang)})}</span></span></div>
        </section>

        <section class="card span-8" aria-labelledby="beds-h">
          <header><h2 id="beds-h">${this.t("dash.beds")}</h2></header>
          <div class="beds">${t.beds.map(l=>this.renderBed(l.id))}</div>
        </section>

        <section class="card span-4" aria-labelledby="up-h">
          ${d.map(l=>{let c=e.zones[l.id]?.greenhouse;return h`<header><h2>${l.name}</h2><span class="spacer"></span>
                <span class="chip ${c?.action==="none"||!c?"ok":c.action==="shade"||c.action==="heat"?"bad":"warn"}">${this.t(`gh.${c?.action??"none"}`)}</span></header>
              ${e.zones[l.id]?.air_temperature!=null?h`<div class="big">${e.zones[l.id].air_temperature?.toFixed(1)}°</div>`:h`<p class="small muted">${this.t("dash.no_sensor")}</p>`}
              ${c?.limit_max_c!=null&&c.limiting_plants.length?h`<p class="small muted">${this.t("dash.limits",{min:c.limit_min_c,max:c.limit_max_c})} (${c.limiting_plants.join(", ")})</p>`:m}
              ${c?.forecast_max_c!=null?h`<p class="xs muted">↑ ${c.forecast_max_c}° · ↓ ${c.forecast_min_c??"\u2013"}°</p>`:m}
              <div class="divider"></div>`})}
          <header><h2 id="up-h">${this.t("dash.coming_up")}</h2></header>
          ${a.length?h`<ul class="tasks">${a.slice(0,8).map(l=>gt(l,this.ctx))}</ul>`:h`<p class="small muted">–</p>`}
        </section>
      </div>
    `}renderBed(t){let e=this.snapshot,s=e.beds.find(g=>g.id===t),i=e.analysis?.beds[t],a=i?.irrigation,r=i?.moisture_status??"unknown",d=i?.sensors?.soil_temperature?.value,l=(i?.active_plantings??[]).map(g=>e.plantings.find(b=>b.id===g)).filter(Boolean),c=r==="optimal"?"ok":r==="dry"?"bad":r==="unknown"?"":r==="wet"?"cold":"warn",u=g=>Math.max(0,Math.min(100,g));return h`
      <article class="bed" aria-label=${s.name}>
        <div class="row"><h3>${s.name}</h3><span class="spacer"></span><span class="chip ${c}">${this.t(`moisture.${r}`)}</span></div>
        ${a?.moisture!=null?h`
          <div class="gauge" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(a.moisture)} aria-label=${this.t("settings.sensor.soil_moisture")}>
            ${a.target_low!=null&&a.target_high!=null?h`<div class="target" style=${`left:${u(a.target_low)}%;width:${u(a.target_high)-u(a.target_low)}%`}></div>`:m}
            <div class="value" style=${`left:${u(a.moisture)}%`}></div>
          </div>
          <div class="kv"><span>💧 ${Math.round(a.moisture)}%</span>${d!=null?h`<span>🌡 ${d.toFixed(1)} °C</span>`:m}</div>`:h`<p class="xs muted">${this.t("dash.no_sensor")}</p>`}
        ${a?h`<p class="small"><ha-icon icon="mdi:watering-can-outline" style="--mdc-icon-size:16px"></ha-icon>
          ${this.t(`irrigation.${a.action}`,{mm:a.amount_mm,liters:Math.round(a.liters)})}${a.duration_min?` \xB7 ${Math.round(a.duration_min)} min`:""}</p>`:m}
        <div class="avatars" aria-label=${this.t("dash.active_crops",{n:l.length})}>
          ${l.map(g=>{let b=this.plants.get(g.plant_id),w=x(b,this.lang);return h`<span class="avatar" title=${w} style=${`background:${L(this.families,b?.family)}`}>${w.slice(0,2)}</span>`})}
        </div>
      </article>`}};j.styles=[z,Tt,S`
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
    `],p([f({attribute:!1})],j.prototype,"snapshot",2),p([f({attribute:!1})],j.prototype,"plants",2),p([f({attribute:!1})],j.prototype,"families",2),p([f({attribute:!1})],j.prototype,"t",2),p([f()],j.prototype,"lang",2),j=p([A("hl-dashboard-view")],j);var I=(o,n)=>n>0?Math.round(o/n)*n:o,Q=o=>({x:o.x_cm,y:o.y_cm,w:o.width_cm,h:o.length_cm}),ft=o=>({x:o.x_cm,y:o.y_cm,w:o.width_cm,h:o.length_cm}),_e=(o,n)=>({x:n.x_cm+o.x_cm,y:n.y_cm+o.y_cm,w:o.width_cm,h:o.length_cm}),Ye=(o,n,t)=>n>=o.x&&n<=o.x+o.w&&t>=o.y&&t<=o.y+o.h;function V(o,n){let t=Math.min(o.w,n.w),e=Math.min(o.h,n.h);return{x:Math.min(Math.max(o.x,n.x),n.x+n.w-t),y:Math.min(Math.max(o.y,n.y),n.y+n.h-e),w:t,h:e}}function Xe(o,n){return o.x<n.x+n.w&&n.x<o.x+o.w&&o.y<n.y+n.h&&n.y<o.y+o.h}function we(o,n,t){for(let e=o.length-1;e>=0;e--)if(Ye(Q(o[e]),n,t))return o[e]}function Zt(o,n,t){let e=Math.max(o.spacing_cm,5);if(n==="single")return{w:e,h:e};if(n==="row"){let i=t.width_cm>=t.length_cm,a=Math.max(Math.min(o.row_spacing_cm,40),10);return i?{w:t.width_cm,h:a}:{w:a,h:t.length_cm}}let s=Math.min(Math.max(e*2,30),Math.min(t.width_cm,t.length_cm));return{w:s,h:s}}function qt(o,n){let t={x:o.x_cm,y:o.y_cm,w:o.width_cm,h:o.length_cm};if(o.layout==="single")return[[t.x+t.w/2,t.y+t.h/2]];let e=Math.max(n.spacing_cm,1);if(o.layout==="row"){let r=t.w>=t.h,d=r?t.w:t.h,l=r?t.h:t.w,c=Math.max(1,Math.floor(d/e)),u=Math.max(1,Math.floor(l/Math.max(n.row_spacing_cm,1))),g=[];for(let b=0;b<u;b++)for(let w=0;w<c;w++){let O=d/c*(w+.5),W=l/u*(b+.5);g.push(r?[t.x+O,t.y+W]:[t.x+W,t.y+O])}return g}let s=Math.max(1,Math.floor(t.w/e)),i=Math.max(1,Math.floor(t.h/e)),a=[];for(let r=0;r<i;r++)for(let d=0;d<s;d++)a.push([t.x+t.w/s*(d+.5),t.y+t.h/i*(r+.5)]);return a}function xe(o,n){return o.count&&o.count>0?o.count:qt(o,n).length}function Et(o,n,t,e){let s=Math.max(e,5);for(let i=0;i+n.h<=o.length_cm+.01;i+=s)for(let a=0;a+n.w<=o.width_cm+.01;a+=s){let r={x:a,y:i,w:n.w,h:n.h};if(!t.some(d=>Xe(r,d)))return{x:a,y:i}}return null}function Mt(o,n){let t=[...o.map(ft),...n.map(Q)];if(!t.length)return{x:0,y:0,w:600,h:400};let e=Math.min(...t.map(r=>r.x)),s=Math.min(...t.map(r=>r.y)),i=Math.max(...t.map(r=>r.x+r.w)),a=Math.max(...t.map(r=>r.y+r.h));return{x:e,y:s,w:i-e,h:a-s}}var ke={dry:"#c8432f",slightly_dry:"#e8a33d",optimal:"#4c8c3f",wet:"#3a7ca5",unknown:"transparent"},_=class extends k{constructor(){super(...arguments);this.zones=[];this.beds=[];this.plantings=[];this.plants=new Map;this.families={};this.selection=null;this.ghost=null;this.reports={};this.timelines={};this.analysis=null;this.lang="en";this.snapStep=10;this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.readonly=!1;this.k=1;this.tx=20;this.ty=20;this.preview=null;this.drag=null;this.fitted=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.fitted||this.fit()}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}updated(t){!this.fitted&&(t.has("zones")||t.has("beds"))&&(this.zones.length||this.beds.length)&&this.fit()}fit(){let t=this.getBoundingClientRect();if(!t.width||!t.height)return;let e=Mt(this.zones,this.beds),s=32;this.k=Math.max(.2,Math.min((t.width-s*2)/e.w,(t.height-s*2)/e.h,6)),this.tx=s-e.x*this.k+(t.width-s*2-e.w*this.k)/2,this.ty=s-e.y*this.k+(t.height-s*2-e.h*this.k)/2,this.fitted=!0}zoom(t,e,s){let i=this.getBoundingClientRect(),a=e??i.width/2,r=s??i.height/2,d=Math.max(.15,Math.min(this.k*t,12));this.tx=a-(a-this.tx)*d/this.k,this.ty=r-(r-this.ty)*d/this.k,this.k=d}clientToCanvas(t,e){let s=this.getBoundingClientRect();return t<s.left||t>s.right||e<s.top||e>s.bottom?null:{x:(t-s.left-this.tx)/this.k,y:(e-s.top-this.ty)/this.k}}focusCanvas(){this.svgEl?.focus()}rectOf(t,e){if(t==="zone"){let a=this.zones.find(r=>r.id===e);return a?ft(a):null}if(t==="bed"){let a=this.beds.find(r=>r.id===e);return a?Q(a):null}let s=this.plantings.find(a=>a.id===e),i=s&&this.beds.find(a=>a.id===s.bed_id);return s&&i?_e(s,i):null}onPointerDown(t,e,s,i=!1){if(t.button!==0&&t.pointerType==="mouse")return;t.stopPropagation();let a=this.clientToCanvas(t.clientX,t.clientY);if(a)if(this.svgEl.setPointerCapture(t.pointerId),e&&s){this.dispatchEvent(new CustomEvent("select",{detail:{kind:e,id:s}}));let r=this.rectOf(e,s);if(!r||this.readonly){this.drag={mode:"pan",pointerId:t.pointerId,startX:a.x,startY:a.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:t.clientX,clientY:t.clientY,moved:!1};return}this.drag={mode:i?"resize":"move",kind:e,id:s,pointerId:t.pointerId,startX:a.x,startY:a.y,origin:r,startTx:this.tx,startTy:this.ty,clientX:t.clientX,clientY:t.clientY,moved:!1}}else this.dispatchEvent(new CustomEvent("select",{detail:null})),this.drag={mode:"pan",pointerId:t.pointerId,startX:a.x,startY:a.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:t.clientX,clientY:t.clientY,moved:!1}}onPointerMove(t){let e=this.drag;if(!e||e.pointerId!==t.pointerId)return;if(Math.hypot(t.clientX-e.clientX,t.clientY-e.clientY)>3&&(e.moved=!0),e.mode==="pan"){this.tx=e.startTx+(t.clientX-e.clientX),this.ty=e.startTy+(t.clientY-e.clientY);return}let s=this.clientToCanvas(t.clientX,t.clientY);if(!s||!e.kind||!e.id)return;let i=s.x-e.startX,a=s.y-e.startY,r=this.snapOn?this.snapStep:1,d;if(e.mode==="move")if(d={...e.origin,x:e.origin.x+i,y:e.origin.y+a},e.kind==="planting"){let l=this.beds.find(c=>c.id===this.plantings.find(u=>u.id===e.id)?.bed_id);l&&(d.x=l.x_cm+I(d.x-l.x_cm,r),d.y=l.y_cm+I(d.y-l.y_cm,r))}else d.x=I(d.x,r),d.y=I(d.y,r);else if(d={...e.origin,w:Math.max(r,I(e.origin.w+i,r)),h:Math.max(r,I(e.origin.h+a,r))},e.kind==="planting"){let l=this.beds.find(c=>c.id===this.plantings.find(u=>u.id===e.id)?.bed_id);l&&(d=V(d,Q(l)))}this.preview={kind:e.kind,id:e.id,rect:d}}onPointerUp(t){let e=this.drag;if(!e||e.pointerId!==t.pointerId)return;this.drag=null,this.svgEl.hasPointerCapture(t.pointerId)&&this.svgEl.releasePointerCapture(t.pointerId);let s=this.preview;if(this.preview=null,!s||!e.moved||e.mode==="pan")return;let i;if(s.kind==="planting"){let a=s.rect.x+s.rect.w/2,r=s.rect.y+s.rect.h/2;i=[...this.beds].reverse().find(l=>a>=l.x_cm&&a<=l.x_cm+l.width_cm&&r>=l.y_cm&&r<=l.y_cm+l.length_cm)?.id}this.dispatchEvent(new CustomEvent("item-change",{detail:{kind:s.kind,id:s.id,rect:s.rect,targetBedId:i}}))}onWheel(t){t.preventDefault();let e=this.getBoundingClientRect();this.zoom(t.deltaY<0?1.12:1/1.12,t.clientX-e.left,t.clientY-e.top)}effectiveRect(t,e,s){return this.preview&&this.preview.kind===t&&this.preview.id===e?this.preview.rect:s}zoneDelta(t){if(this.preview?.kind!=="zone"||this.preview.id!==t||this.drag?.mode!=="move")return{dx:0,dy:0};let e=this.zones.find(s=>s.id===t);return e?{dx:this.preview.rect.x-e.x_cm,dy:this.preview.rect.y-e.y_cm}:{dx:0,dy:0}}bedAbs(t){let{dx:e,dy:s}=this.zoneDelta(t.zone_id),i={...Q(t),x:t.x_cm+e,y:t.y_cm+s};return this.effectiveRect("bed",t.id,i)}renderGrid(){let t=Math.max(this.snapStep,5);return E`
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
    `}renderZone(t){let e=this.effectiveRect("zone",t.id,ft(t)),s=t.type!=="outdoor",i=12/this.k,a=`${t.name} \xB7 ${this.t(`settings.zone_type.${t.type}`)}`;return E`
      <g role="button" aria-label=${a} @pointerdown=${r=>this.onPointerDown(r,"zone",t.id)}>
        <rect class="zone-rect" x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${8/this.k}
          fill=${s?"var(--hl-zone-greenhouse)":"var(--hl-zone-outdoor)"}
          stroke=${s?"var(--hl-frost-500)":"var(--hl-leaf-300)"} stroke-dasharray=${s?"none":"8 4"}></rect>
        ${s?E`<rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} fill="url(#glass)" pointer-events="none"></rect>`:m}
        <text class="label" x=${e.x+2/this.k} y=${e.y-i*.5} font-size=${i} font-weight="600">${a}</text>
      </g>`}renderBed(t){let e=this.bedAbs(t),s=12/this.k,i=this.analysis?.beds[t.id],a=i?.moisture_status??"unknown",r=this.showMoisture&&a!=="unknown"?ke[a]:"rgba(46,33,24,0.45)",d=t.kind==="container"?"var(--hl-container-fill)":t.kind==="raised"?"var(--hl-bed-fill-raised)":"var(--hl-bed-fill)",l=t.kind==="container"?Math.min(e.w,e.h)/4:4/this.k,c=i?.irrigation.moisture,u=i?.sensors?.soil_temperature?.value,g=this.reports[t.id]??i?.compatibility,b=(g?.pairs.filter(w=>w.severity!=="info").length??0)+(g?.rotation?.length??0);return E`
      <g role="button" aria-label=${`${t.name}, ${this.t(`kind.${t.kind}`)}, ${Math.round(t.width_cm)} \xD7 ${Math.round(t.length_cm)} cm`}
        @pointerdown=${w=>this.onPointerDown(w,"bed",t.id)}>
        <rect class="bed-rect" x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${l} fill=${d}
          stroke=${r} stroke-width=${this.showMoisture&&a!=="unknown"?3:1.5}></rect>
        <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${l} fill="url(#soil)" pointer-events="none"></rect>
        ${this.showMoisture&&a!=="unknown"?E`<rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${l} fill=${ke[a]} opacity="0.12" pointer-events="none"></rect>`:m}
        <text class="label on-soil" x=${e.x+6/this.k} y=${e.y+e.h-6/this.k} font-size=${s} font-weight="600">${t.name}</text>
        ${this.showMoisture&&c!=null?E`<text class="label on-soil" x=${e.x+e.w-6/this.k} y=${e.y+e.h-6/this.k} font-size=${s*.95} text-anchor="end">💧 ${Math.round(c)}%</text>`:m}
        ${this.showTemperature&&u!=null?E`<text class="label on-soil" x=${e.x+e.w-6/this.k} y=${e.y+s*1.3} font-size=${s*.95} text-anchor="end">🌡 ${u.toFixed(1)} °C</text>`:m}
        ${b?this.renderBadge(e.x+e.w,e.y,String(b),"var(--hl-tomato-500)"):m}
      </g>`}renderBadge(t,e,s,i){let a=9/this.k;return E`<g pointer-events="none"><circle cx=${t} cy=${e} r=${a} fill=${i} stroke="#fff" stroke-width=${1.5/this.k}></circle>
      <text class="badge-text" x=${t} y=${e+a*.38} font-size=${a*1.1} text-anchor="middle">${s}</text></g>`}renderPlanting(t){let e=this.beds.find(N=>N.id===t.bed_id),s=this.plants.get(t.plant_id);if(!e||!s)return m;let i=this.bedAbs(e),a={x:i.x+t.x_cm,y:i.y+t.y_cm,w:t.width_cm,h:t.length_cm},r=this.effectiveRect("planting",t.id,a),d=L(this.families,s.family),l=x(s,this.lang),c=!this.viewDate||ye(t,this.timelines[t.id],this.viewDate),u={...t,x_cm:r.x-i.x,y_cm:r.y-i.y,width_cm:r.w,length_cm:r.h},g=qt(u,s),b=Math.max(Math.min(s.spacing_cm/2.4,18),1.6),w=this.reports[e.id]??this.analysis?.beds[e.id]?.compatibility,O=w?.pairs.filter(N=>(N.a===t.id||N.b===t.id)&&N.severity!=="info")??[],W=w?.out_of_bounds?.includes(t.id),Yt=Math.min(11/this.k,r.h*.45),Xt=`${l} \u2013 ${this.t(`planner.layout.${t.layout}`)}, ${this.t("planner.count",{n:g.length})}`+(O.length?` \u2013 ${O.length} \u26A0`:"");return E`
      <g class="planting ${c?"":"faded"}" role="button" aria-label=${Xt}
        @pointerdown=${N=>this.onPointerDown(N,"planting",t.id)}>
        <title>${Xt}</title>
        <rect class="planting-rect" x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${3/this.k}
          fill=${d} fill-opacity="0.22" stroke=${d} stroke-width="1.5" stroke-dasharray=${c?"none":"4 3"}></rect>
        ${g.slice(0,400).map(([N,Ee])=>E`<circle cx=${i.x+N} cy=${i.y+Ee} r=${b} fill=${d} fill-opacity="0.85"></circle>`)}
        ${r.w*this.k>26&&r.h*this.k>14?E`<text class="mono" x=${r.x+r.w/2} y=${r.y+r.h/2+Yt*.35} font-size=${Yt} text-anchor="middle">${be(l)}</text>`:m}
        ${t.succession_group?this.renderBadge(r.x,r.y,String(t.succession_index+1),"var(--hl-soil-700)"):m}
        ${O.length||W?this.renderBadge(r.x+r.w,r.y,"!",O.some(N=>N.severity==="error")?"var(--hl-tomato-500)":"var(--hl-sun-500)"):m}
      </g>`}renderLinks(){if(!this.showCompanions)return[];let t=[],e=i=>{let a=this.plantings.find(c=>c.id===i),r=a&&this.beds.find(c=>c.id===a.bed_id);if(!a||!r)return null;let d=this.bedAbs(r),l=this.effectiveRect("planting",a.id,{x:d.x+a.x_cm,y:d.y+a.y_cm,w:a.width_cm,h:a.length_cm});return[l.x+l.w/2,l.y+l.h/2]},s=new Set(this.plantings.map(i=>i.id));for(let i of this.beds){let a=this.reports[i.id]??this.analysis?.beds[i.id]?.compatibility;for(let r of a?.pairs??[]){if(r.kind==="same_family"||!s.has(r.a)||!s.has(r.b))continue;let d=e(r.a),l=e(r.b);if(!d||!l)continue;let c=r.kind==="friend"?"var(--hl-leaf-500)":r.kind==="enemy"?"var(--hl-tomato-500)":"var(--hl-sun-500)";t.push(E`<line class="link" x1=${d[0]} y1=${d[1]} x2=${l[0]} y2=${l[1]} stroke=${c}
          stroke-width=${r.kind==="friend"?2:2.5} stroke-dasharray=${r.kind==="friend"?"none":"6 4"} stroke-linecap="round" opacity="0.9"></line>`)}}return t}renderSelection(){let t=this.selection;if(!t)return m;let e=null;if(t.kind==="bed"){let a=this.beds.find(r=>r.id===t.id);e=a?this.bedAbs(a):null}else if(t.kind==="zone"){let a=this.zones.find(r=>r.id===t.id);e=a?this.effectiveRect("zone",a.id,ft(a)):null}else{let a=this.plantings.find(d=>d.id===t.id),r=a&&this.beds.find(d=>d.id===a.bed_id);if(a&&r){let d=this.bedAbs(r);e=this.effectiveRect("planting",a.id,{x:d.x+a.x_cm,y:d.y+a.y_cm,w:a.width_cm,h:a.length_cm})}}if(!e)return m;let s=10/this.k,i=3/this.k;return E`
      <rect class="selected-outline" x=${e.x-i} y=${e.y-i} width=${e.w+i*2} height=${e.h+i*2}></rect>
      ${this.readonly?m:E`<rect class="handle" x=${e.x+e.w-s/2} y=${e.y+e.h-s/2} width=${s} height=${s} rx=${2/this.k}
        @pointerdown=${a=>this.onPointerDown(a,t.kind,t.id,!0)}></rect>`}`}renderGhost(){let t=this.ghost;if(!t)return m;let e=12/this.k;return E`<g pointer-events="none">
      <rect x=${t.rect.x} y=${t.rect.y} width=${t.rect.w} height=${t.rect.h} rx=${3/this.k}
        fill=${t.color} fill-opacity=${t.valid?.35:.12} stroke=${t.valid?t.color:"var(--hl-tomato-500)"}
        stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      <text class="label" x=${t.rect.x} y=${t.rect.y-e*.5} font-size=${e} font-weight="600">${t.label}</text></g>`}render(){return h`
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
          ${this.renderGrid()} ${this.zones.map(t=>this.renderZone(t))} ${this.beds.map(t=>this.renderBed(t))}
          ${this.plantings.map(t=>this.renderPlanting(t))} ${this.renderLinks()} ${this.renderSelection()} ${this.renderGhost()}
        </g>
      </svg>
      <div class="zoom-indicator" aria-hidden="true">${Math.round(this.k*100)} px/m</div>
    `}};_.styles=[S`
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
    `],p([f({attribute:!1})],_.prototype,"zones",2),p([f({attribute:!1})],_.prototype,"beds",2),p([f({attribute:!1})],_.prototype,"plantings",2),p([f({attribute:!1})],_.prototype,"plants",2),p([f({attribute:!1})],_.prototype,"families",2),p([f({attribute:!1})],_.prototype,"selection",2),p([f({attribute:!1})],_.prototype,"ghost",2),p([f({attribute:!1})],_.prototype,"reports",2),p([f({attribute:!1})],_.prototype,"timelines",2),p([f({attribute:!1})],_.prototype,"analysis",2),p([f({attribute:!1})],_.prototype,"t",2),p([f()],_.prototype,"lang",2),p([f({type:Number})],_.prototype,"snapStep",2),p([f({type:Boolean})],_.prototype,"snapOn",2),p([f({type:Boolean})],_.prototype,"showCompanions",2),p([f({type:Boolean})],_.prototype,"showMoisture",2),p([f({type:Boolean})],_.prototype,"showTemperature",2),p([f()],_.prototype,"viewDate",2),p([f({type:Boolean})],_.prototype,"readonly",2),p([v()],_.prototype,"k",2),p([v()],_.prototype,"tx",2),p([v()],_.prototype,"ty",2),p([v()],_.prototype,"preview",2),p([wt("svg")],_.prototype,"svgEl",2),_=p([A("hl-garden-canvas")],_);var Pt=class{constructor(n,t=100){this.present=n;this.limit=t;this.past=[];this.future=[]}get current(){return this.present}get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}commit(n){return this.past.push(this.present),this.past.length>this.limit&&this.past.shift(),this.present=n,this.future=[],n}undo(){let n=this.past.pop();return n===void 0?this.present:(this.future.push(this.present),this.present=n,n)}redo(){let n=this.future.pop();return n===void 0?this.present:(this.past.push(this.present),this.present=n,n)}reset(n){this.past=[],this.future=[],this.present=n}};var C=o=>structuredClone(o),Se=()=>({soil_moisture:null,soil_temperature:null,air_temperature:null,air_humidity:null,light:null,rain:null});function Je(o){let n=o.sowing;return n.direct_sow.length&&(!n.indoor_sow.length||o.habit==="root"||o.tags.includes("root"))?"direct_sow":n.indoor_sow.length&&n.transplant.length?"indoor_sow":n.transplant.length?"transplant":"direct_sow"}var $=class extends k{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.narrow=!1;this.draft={zones:[],beds:[],plantings:[]};this.selection=null;this.season=new Date().getFullYear();this.saveState="saved";this.reports={};this.extraTimelines={};this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.layoutMode="block";this.search="";this.familyFilter="";this.paletteDrag=null;this.ghostReport=null;this.dialog=null;this.announcement="";this.paletteOpen=!0;this.history=null;this.baseRevision=null;this.checkTimers=new Map;this.ghostCheckAt=0;this.plantMap=new Map}willUpdate(t){t.has("plants")&&(this.plantMap=new Map(this.plants.map(e=>[e.id,e]))),t.has("snapshot")&&this.snapshot&&this.syncFromSnapshot()}syncFromSnapshot(){let t=this.snapshot;this.history||(this.season=t.analysis?.season??new Date().getFullYear(),this.viewDate=t.analysis?.today??"");let e=this.saveState==="saved";if(!this.history||e&&t.revision!==this.baseRevision){let s={zones:C(t.zones),beds:C(t.beds),plantings:C(t.plantings)};this.history?this.history.reset(s):this.history=new Pt(s),this.draft=s,this.baseRevision=t.revision,this.reports={},this.extraTimelines={}}}get timelines(){return{...this.snapshot.analysis?.timelines??{},...this.extraTimelines}}get seasonPlantings(){return this.draft.plantings.filter(t=>t.season===this.season)}commit(t,e,s=[]){if(!(!this.admin||!this.history)){this.draft=this.history.commit(t),this.saveState="dirty",this.scheduleSave();for(let i of s)this.scheduleCheck(i);e&&this.announce(e)}}undo(){this.history?.canUndo&&(this.draft=this.history.undo(),this.afterHistoryJump())}redo(){this.history?.canRedo&&(this.draft=this.history.redo(),this.afterHistoryJump())}afterHistoryJump(){this.saveState="dirty",this.scheduleSave(),this.draft.beds.forEach(t=>this.scheduleCheck(t.id)),this.selection&&!this.findItem(this.selection)&&(this.selection=null)}scheduleSave(){window.clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>this.save(),1200)}async save(){if(this.saveState!=="dirty")return;let t=this.draft;this.saveState="saving";try{let e=await this.api.savePlan(t,this.baseRevision);this.baseRevision=e.revision,this.saveState=this.draft===t?"saved":"dirty",this.saveState==="dirty"&&this.scheduleSave()}catch(e){e.code==="revision_conflict"?(this.saveState="saved",this.history=null,this.syncFromSnapshot(),this.toast(this.t("common.conflict"))):(this.saveState="error",this.toast(this.t("common.error",{message:e.message??String(e)})))}}scheduleCheck(t){window.clearTimeout(this.checkTimers.get(t)),this.checkTimers.set(t,window.setTimeout(()=>this.runCheck(t),250))}bedPlantings(t,e=this.draft){return e.plantings.filter(s=>s.bed_id===t&&Math.abs(s.season-this.season)<=1)}async runCheck(t){let e=this.draft.beds.find(s=>s.id===t);if(!e){let{[t]:s,...i}=this.reports;this.reports=i;return}try{let s=await this.api.checkBed(e,this.bedPlantings(t));this.reports={...this.reports,[t]:s},s.timelines&&(this.extraTimelines={...this.extraTimelines,...s.timelines})}catch{}}findItem(t){return(t.kind==="zone"?this.draft.zones:t.kind==="bed"?this.draft.beds:this.draft.plantings).find(s=>s.id===t.id)}onItemChange(t){let{kind:e,id:s,rect:i,targetBedId:a}=t.detail,r=C(this.draft),d=this.snapOn?this.snapshot.settings.snap_cm:1;if(e==="zone"){let l=r.zones.find(g=>g.id===s),c=i.x-l.x_cm,u=i.y-l.y_cm;if(Object.assign(l,{x_cm:i.x,y_cm:i.y,width_cm:i.w,length_cm:i.h}),c||u)for(let g of r.beds.filter(b=>b.zone_id===s))g.x_cm+=c,g.y_cm+=u;this.commit(r,this.t("planner.moved",{name:l.name}))}else if(e==="bed"){let l=r.beds.find(b=>b.id===s);Object.assign(l,{x_cm:i.x,y_cm:i.y,width_cm:i.w,length_cm:i.h});let c=i.x+i.w/2,u=i.y+i.h/2,g=[...r.zones].reverse().find(b=>c>=b.x_cm&&c<=b.x_cm+b.width_cm&&u>=b.y_cm&&u<=b.y_cm+b.length_cm);g&&(l.zone_id=g.id),this.commit(r,this.t("planner.moved",{name:l.name}),[l.id])}else{let l=r.plantings.find(w=>w.id===s),c=l.bed_id,u=r.beds.find(w=>w.id===(a??c))??r.beds.find(w=>w.id===c),g=V({...i,x:i.x-u.x_cm,y:i.y-u.y_cm},{x:0,y:0,w:u.width_cm,h:u.length_cm});Object.assign(l,{bed_id:u.id,x_cm:I(g.x,d),y_cm:I(g.y,d),width_cm:g.w,length_cm:g.h});let b=this.plantMap.get(l.plant_id);this.commit(r,this.t("planner.moved",{name:x(b,this.lang)}),[...new Set([c,u.id])])}}updateSelected(t,e){if(!this.selection)return;let s=C(this.draft),a=(this.selection.kind==="zone"?s.zones:this.selection.kind==="bed"?s.beds:s.plantings).find(d=>d.id===this.selection.id);if(!a)return;Object.assign(e?a[e]:a,t);let r=this.selection.kind==="planting"?a.bed_id:this.selection.kind==="bed"?a.id:void 0;this.commit(s,void 0,r?[r]:[])}removeSelected(){let t=this.selection;if(!t||!this.admin)return;let e=C(this.draft),s="";if(t.kind==="planting"){let i=e.plantings.find(a=>a.id===t.id);s=x(this.plantMap.get(i?.plant_id??""),this.lang),e.plantings=e.plantings.filter(a=>a.id!==t.id),this.commit(e,this.t("planner.removed",{name:s}),i?[i.bed_id]:[])}else if(t.kind==="bed"){let i=e.beds.find(r=>r.id===t.id),a=e.plantings.filter(r=>r.bed_id===t.id).length;if(a&&!confirm(`${i?.name}: ${this.t("planner.count",{n:a})} \u2013 ${this.t("common.delete")}?`))return;e.beds=e.beds.filter(r=>r.id!==t.id),e.plantings=e.plantings.filter(r=>r.bed_id!==t.id),this.commit(e,this.t("planner.removed",{name:i?.name??""}))}else{let i=e.zones.find(r=>r.id===t.id),a=e.beds.filter(r=>r.zone_id===t.id).map(r=>r.id);if(a.length&&!confirm(`${i?.name}: ${a.length} \xD7 ${this.t("planner.bed_name")} \u2013 ${this.t("common.delete")}?`))return;e.zones=e.zones.filter(r=>r.id!==t.id),e.beds=e.beds.filter(r=>!a.includes(r.id)),e.plantings=e.plantings.filter(r=>!a.includes(r.bed_id)),this.commit(e,this.t("planner.removed",{name:i?.name??""}))}this.selection=null}duplicateSelected(){let t=this.selection;if(!t||t.kind!=="planting")return;let e=C(this.draft),s=e.plantings.find(l=>l.id===t.id),i=s&&e.beds.find(l=>l.id===s.bed_id);if(!s||!i)return;let a=this.bedPlantings(i.id,e).filter(l=>l.season===s.season).map(l=>({x:l.x_cm,y:l.y_cm,w:l.width_cm,h:l.length_cm})),r=Et(i,{w:s.width_cm,h:s.length_cm},a,this.snapshot.settings.snap_cm)??{x:s.x_cm,y:s.y_cm},d={...C(s),id:ut("pl"),x_cm:r.x,y_cm:r.y,succession_group:null,succession_index:0,status:"planned",sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null};e.plantings.push(d),this.selection={kind:"planting",id:d.id},this.commit(e,void 0,[i.id])}nudge(t,e,s=!1){let i=this.selection;if(!i||!this.admin)return;let a=C(this.draft),r=[];if(i.kind==="planting"){let d=a.plantings.find(g=>g.id===i.id),l=a.beds.find(g=>g.id===d.bed_id),c=s?{x:d.x_cm,y:d.y_cm,w:Math.max(5,d.width_cm+t),h:Math.max(5,d.length_cm+e)}:{x:d.x_cm+t,y:d.y_cm+e,w:d.width_cm,h:d.length_cm},u=V(c,{x:0,y:0,w:l.width_cm,h:l.length_cm});Object.assign(d,{x_cm:u.x,y_cm:u.y,width_cm:u.w,length_cm:u.h}),r.push(l.id)}else{let d=(i.kind==="bed"?a.beds:a.zones).find(l=>l.id===i.id);if(s)d.width_cm=Math.max(10,d.width_cm+t),d.length_cm=Math.max(10,d.length_cm+e);else if(d.x_cm+=t,d.y_cm+=e,i.kind==="zone")for(let l of a.beds.filter(c=>c.zone_id===i.id))l.x_cm+=t,l.y_cm+=e;i.kind==="bed"&&r.push(i.id)}this.commit(a,void 0,r)}newPlanting(t,e,s){return{id:ut("pl"),plant_id:t.id,bed_id:e.id,season:this.season,layout:this.layoutMode,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,count:null,method:Je(t),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:""}}addToSelectedBed(t){if(!this.admin)return;let e=C(this.draft),s=this.selection?.kind==="bed"?this.selection.id:this.selection?.kind==="planting"?e.plantings.find(c=>c.id===this.selection.id)?.bed_id:void 0,i=e.beds.find(c=>c.id===s)??e.beds[0];if(!i)return;let a=Zt(t,this.layoutMode,i),r=this.bedPlantings(i.id,e).filter(c=>c.season===this.season).map(c=>({x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm})),d=Et(i,a,r,this.snapshot.settings.snap_cm)??{x:0,y:0},l=this.newPlanting(t,i,{...d,...a});e.plantings.push(l),this.selection={kind:"planting",id:l.id},this.commit(e,this.t("planner.placed",{plant:x(t,this.lang),bed:i.name}),[i.id]),this.canvas?.focusCanvas()}addBed(){let t=C(this.draft),e=this.selection?.kind==="zone"&&t.zones.find(d=>d.id===this.selection.id)||t.zones.find(d=>d.type==="outdoor")||t.zones[0];if(!e)return this.addZone();let s={w:120,h:80},i=t.beds.filter(d=>d.zone_id===e.id).map(d=>({x:d.x_cm-e.x_cm-20,y:d.y_cm-e.y_cm-20,w:d.width_cm+40,h:d.length_cm+40})),a=Et({...t.beds[0],width_cm:e.width_cm,length_cm:e.length_cm},s,i,10)??{x:20,y:20},r={id:ut("bed"),name:`${this.t("planner.new_bed")} ${t.beds.length+1}`,zone_id:e.id,kind:"raised",x_cm:e.x_cm+a.x,y_cm:e.y_cm+a.y,width_cm:s.w,length_cm:s.h,orientation_deg:0,soil:"loam",shade_pct:null,sensors:Se(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""};t.beds.push(r),this.selection={kind:"bed",id:r.id},this.commit(t,this.t("planner.placed",{plant:r.name,bed:e.name}),[r.id])}addZone(){let t=C(this.draft),e=Mt(t.zones,t.beds),s={id:ut("zone"),name:`${this.t("planner.new_zone")} ${t.zones.length+1}`,type:"outdoor",x_cm:t.zones.length?e.x+e.w+100:0,y_cm:t.zones.length?e.y:0,width_cm:400,length_cm:300,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:Se(),vent_entity:null};t.zones.push(s),this.selection={kind:"zone",id:s.id},this.commit(t),requestAnimationFrame(()=>this.canvas?.fit())}onPalettePointerDown(t,e){!this.admin||t.pointerType==="mouse"&&t.button!==0||(t.currentTarget.setPointerCapture(t.pointerId),this.paletteDrag={plant:e,pointerId:t.pointerId,bedId:null,rect:null},this.ghostReport=null)}onPalettePointerMove(t){let e=this.paletteDrag;if(!e||e.pointerId!==t.pointerId)return;let s=this.canvas.clientToCanvas(t.clientX,t.clientY);if(!s){this.paletteDrag={...e,bedId:null,rect:null};return}let i=we(this.draft.beds,s.x,s.y);if(!i){let c={w:e.plant.spacing_cm,h:e.plant.spacing_cm};this.paletteDrag={...e,bedId:null,rect:{x:s.x-c.w/2,y:s.y-c.h/2,...c}};return}let a=Zt(e.plant,this.layoutMode,i),r=this.snapOn?this.snapshot.settings.snap_cm:1,d={x:I(s.x-i.x_cm-a.w/2,r),y:I(s.y-i.y_cm-a.h/2,r),...a};this.layoutMode==="row"&&(d=i.width_cm>=i.length_cm?{...d,x:0}:{...d,y:0}),d=V(d,{x:0,y:0,w:i.width_cm,h:i.length_cm}),this.paletteDrag={...e,bedId:i.id,rect:{...d,x:d.x+i.x_cm,y:d.y+i.y_cm}};let l=performance.now();if(l-this.ghostCheckAt>220){this.ghostCheckAt=l;let c=this.newPlanting(e.plant,i,d);c.id="__ghost__",this.api.checkBed(i,[...this.bedPlantings(i.id),c]).then(u=>{this.paletteDrag&&(this.ghostReport=u)}).catch(()=>{})}}onPalettePointerUp(t){let e=this.paletteDrag;if(!e||e.pointerId!==t.pointerId)return;if(this.paletteDrag=null,this.ghostReport=null,!e.bedId||!e.rect){e.rect&&this.announce(this.t("planner.no_bed_here"));return}let s=C(this.draft),i=s.beds.find(r=>r.id===e.bedId),a=this.newPlanting(e.plant,i,{...e.rect,x:e.rect.x-i.x_cm,y:e.rect.y-i.y_cm});s.plantings.push(a),this.selection={kind:"planting",id:a.id},this.commit(s,this.t("planner.placed",{plant:x(e.plant,this.lang),bed:i.name}),[i.id])}ghostLabel(){let t=this.paletteDrag,e=x(t.plant,this.lang);if(!t.bedId)return e;let s=(this.ghostReport?.pairs??[]).filter(d=>d.a==="__ghost__"||d.b==="__ghost__"),i=s.filter(d=>d.kind==="enemy"||d.kind==="overlap").length,a=s.filter(d=>d.kind==="friend").length,r=(this.ghostReport?.rotation??[]).some(d=>d.planting==="__ghost__");return`${e}${a?` \xB7 \u2665 ${a}`:""}${i?` \xB7 \u26A0 ${i}`:""}${r?" \xB7 \u27F2":""}`}onKeyDown(t){let e=t.composedPath()[0];if(["INPUT","SELECT","TEXTAREA"].includes(e?.tagName))return;let s=t.ctrlKey||t.metaKey,i=(this.snapOn?this.snapshot.settings.snap_cm:1)*(t.shiftKey?10:1),a=t.key,r=()=>{t.preventDefault(),t.stopPropagation()};if(s&&a.toLowerCase()==="z"&&!t.shiftKey)return this.undo(),r();if(s&&a.toLowerCase()==="y"||s&&t.shiftKey&&a.toLowerCase()==="z")return this.redo(),r();if(s&&a.toLowerCase()==="d")return this.duplicateSelected(),r();if(s)return;let d={ArrowLeft:[-i,0],ArrowRight:[i,0],ArrowUp:[0,-i],ArrowDown:[0,i]};if(d[a]&&this.selection)return this.nudge(...d[a],t.altKey),r();switch(a){case"Delete":case"Backspace":return this.removeSelected(),r();case"Escape":return this.selection=null,this.paletteDrag=null,this.dialog=null,r();case"g":return this.snapOn=!this.snapOn,r();case"c":return this.showCompanions=!this.showCompanions,r();case"m":return this.showMoisture=!this.showMoisture,r();case"t":return this.showTemperature=!this.showTemperature,r();case"+":case"=":return this.canvas.zoom(1.2),r();case"-":return this.canvas.zoom(1/1.2),r();case"0":return this.canvas.fit(),r();case"?":return this.dialog="shortcuts",r();case"]":case"[":return this.cycleSelection(a==="]"?1:-1),r();default:}}cycleSelection(t){let e=[...this.draft.beds.map(r=>({kind:"bed",id:r.id})),...this.seasonPlantings.map(r=>({kind:"planting",id:r.id}))];if(!e.length)return;let s=this.selection?e.findIndex(r=>r.id===this.selection.id):-1;this.selection=e[(s+t+e.length)%e.length];let i=this.findItem(this.selection),a=this.selection.kind==="planting"?x(this.plantMap.get(i.plant_id),this.lang):i.name;this.announce(a)}announce(t){this.announcement="",requestAnimationFrame(()=>this.announcement=t)}toast(t){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t},bubbles:!0,composed:!0}))}async exportPlan(t){let{filename:e,content:s}=await this.api.exportPlan(t);St(e,s,t==="json"?"application/json":"application/yaml")}async importPlan(t){t.preventDefault();let e=t.target,s=e.elements.namedItem("file").files?.[0],i=e.elements.namedItem("mode").value;if(s)try{let a=await this.api.importPlan(await s.text(),i);this.history=null,this.saveState="saved",this.dialog=null,this.toast(this.t("planner.imported",{beds:a.counts.beds,plantings:a.counts.plantings}))}catch(a){this.toast(this.t("common.error",{message:a.message??String(a)}))}}async createSuccession(t){t.preventDefault();let e=this.selection,s=e?.kind==="planting"?this.draft.plantings.find(u=>u.id===e.id):void 0;if(!s)return;let i=t.target,a=Number(i.elements.namedItem("count").value),r=Number(i.elements.namedItem("interval").value)||null,d=i.elements.namedItem("placement").value,l=await this.api.succession(s,a,r,d),c=C(this.draft);c.plantings=c.plantings.filter(u=>u.id!==s.id).concat(l.plantings),this.dialog=null,this.commit(c,void 0,[s.bed_id]),l.dropped&&this.toast(this.t("planner.succession_dropped",{n:l.dropped}))}updated(){let t=this.renderRoot.querySelector("dialog");t&&!t.open&&t.showModal()}render(){if(!this.history)return h`<p class="empty">${this.t("common.loading")}</p>`;let t=this.paletteDrag,e=t?.rect?{rect:t.rect,valid:!!t.bedId,color:L(this.families,t.plant.family),label:this.ghostLabel()}:null;return h`
      ${this.renderToolbar()}
      <div class="layout ${this.narrow?"narrow":""} ${this.paletteOpen||this.narrow?"":"palette-closed"}" @keydown=${this.onKeyDown}>
        ${this.paletteOpen||this.narrow?this.renderPalette():h`<div></div>`}
        <div class="center">
          <hl-garden-canvas
            .zones=${this.draft.zones}
            .beds=${this.draft.beds}
            .plantings=${this.seasonPlantings}
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
            @select=${s=>this.selection=s.detail}
            @item-change=${this.onItemChange}
          ></hl-garden-canvas>
          ${t?h`<div class="drag-ghost-hint" role="status">${e?e.label:x(t.plant,this.lang)}</div>`:m}
        </div>
        ${this.renderInspector()}
      </div>
      <div class="visually-hidden" role="status" aria-live="polite">${this.announcement}</div>
      ${this.renderDialog()}
    `}renderToolbar(){let t=[this.season-1,this.season,this.season+1],e={saved:"common.saved",dirty:"common.unsaved",saving:"common.saving",error:"common.unsaved"}[this.saveState],s=(i,a,r,d,l=!1)=>h`
      <button class="icon-btn" title=${a} aria-label=${a} aria-pressed=${d===void 0?m:String(d)} ?disabled=${l} @click=${r}>
        <ha-icon icon=${i}></ha-icon>
      </button>`;return h`
      <div class="toolbar" role="toolbar" aria-label=${this.t("nav.planner")}>
        ${s("mdi:dock-left",this.t("planner.palette"),()=>this.paletteOpen=!this.paletteOpen,this.paletteOpen)}
        <label class="row small"><span class="visually-hidden">${this.t("planner.season")}</span>
          <select aria-label=${this.t("planner.season")} @change=${i=>this.season=Number(i.target.value)}>
            ${t.map(i=>h`<option value=${i} ?selected=${i===this.season}>${this.t("common.season",{year:i})}</option>`)}
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
        ${this.admin?h`
          <button class="btn small" @click=${()=>this.addBed()}><ha-icon icon="mdi:plus"></ha-icon>${this.t("planner.add_bed")}</button>
          <button class="btn small ghost" @click=${()=>this.addZone()}>${this.t("planner.add_zone")}</button>`:m}
        ${s("mdi:file-export-outline",this.t("planner.export_json"),()=>this.exportPlan("json"))}
        ${s("mdi:code-braces",this.t("planner.export_yaml"),()=>this.exportPlan("yaml"))}
        ${this.admin?s("mdi:file-import-outline",this.t("planner.import"),()=>this.dialog="import"):m}
        ${s("mdi:keyboard-outline",`${this.t("planner.shortcuts")} (?)`,()=>this.dialog="shortcuts")}
      </div>
      ${this.admin?m:h`<p class="readonly-note">${this.t("common.admin_only")}</p>`}
    `}renderPalette(){let t=this.search.trim().toLowerCase(),e=this.plants.filter(i=>this.familyFilter&&i.family!==this.familyFilter?!1:t?[i.id,i.scientific_name,...Object.values(i.names)].some(a=>a.toLowerCase().includes(t)):!0).sort((i,a)=>x(i,this.lang).localeCompare(x(a,this.lang))),s=[...new Set(this.plants.map(i=>i.family))].sort();return h`
      <aside class="pane" aria-label=${this.t("planner.palette")}>
        <header>
          <h3>${this.t("planner.palette")}</h3>
          <span class="spacer"></span>
          <div class="segmented" role="group" aria-label=${this.t("planner.layout")}>
            ${["single","block","row"].map(i=>h`
              <button aria-pressed=${String(this.layoutMode===i)} @click=${()=>this.layoutMode=i}>${this.t(`planner.layout.${i}`)}</button>`)}
          </div>
        </header>
        <div class="pane-body stack">
          <input type="search" placeholder=${this.t("common.search")} aria-label=${this.t("common.search")} .value=${this.search}
            @input=${i=>this.search=i.target.value} />
          <div class="row wrap family-chips">
            <button class="chip" aria-pressed=${String(!this.familyFilter)} @click=${()=>this.familyFilter=""}>${this.t("common.all")}</button>
            ${s.map(i=>h`
              <button class="chip" aria-pressed=${String(this.familyFilter===i)} @click=${()=>this.familyFilter=this.familyFilter===i?"":i}
                title=${this.families[i]?.[this.lang]??i}>
                <span class="family-dot" style=${`background:${L(this.families,i)}`}></span>${(this.families[i]?.[this.lang]??i).split(" ")[0]}
              </button>`)}
          </div>
          <p class="xs muted">${this.t("planner.palette_hint")}</p>
          <div class="palette-list" role="list">
            ${e.map(i=>{let a=x(i,this.lang);return h`
                <button class="plant-card" role="listitem" aria-label=${`${a}, ${i.scientific_name}`}
                  @pointerdown=${r=>this.onPalettePointerDown(r,i)}
                  @pointermove=${this.onPalettePointerMove}
                  @pointerup=${this.onPalettePointerUp}
                  @pointercancel=${()=>this.paletteDrag=null}
                  @keydown=${r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),this.addToSelectedBed(i))}}>
                  <span class="swatch" style=${`background:${L(this.families,i.family)}`}>${a.slice(0,2)}</span>
                  <span class="meta"><span>${a}</span><span class="xs muted">${i.spacing_cm} cm · ${i.days_to_maturity[0]}–${i.days_to_maturity[1]} d</span></span>
                </button>`})}
          </div>
          <div class="legend-block stack" style="gap:8px">
          <div class="divider"></div>
          <h4>${this.t("planner.legend")}</h4>
          <div class="legend">
            ${s.map(i=>h`<span><span class="family-dot" style=${`background:${L(this.families,i)}`}></span>${this.families[i]?.[this.lang]??i}</span>`)}
          </div>
          </div>
        </div>
      </aside>
    `}renderFindings(t,e){let s=this.reports[t]??this.snapshot.analysis?.beds[t]?.compatibility,i=this.reports[t]?.rotation??this.snapshot.analysis?.beds[t]?.rotation??[],a=(s?.pairs??[]).filter(u=>!e||u.a===e||u.b===e),r=i.filter(u=>!e||u.planting===e),d=(s?.placement??[]).filter(u=>!e||u.planting===e),l=e?s?.out_of_bounds?.includes(e):(s?.out_of_bounds?.length??0)>0,c={error:"mdi:alert-octagon-outline",warning:"mdi:alert-outline",info:"mdi:heart-outline"};return!a.length&&!r.length&&!l&&!d.length?h`<p class="small muted">${this.t("planner.no_warnings")}</p>`:h`<div class="stack" style="gap:6px">
      ${a.map(u=>h`<div class="finding ${u.severity}"><ha-icon icon=${c[u.severity]}></ha-icon><span>${this.t(u.key,u.params)}</span></div>`)}
      ${r.map(u=>h`<div class="finding ${u.severity}"><ha-icon icon="mdi:rotate-3d-variant"></ha-icon><span>${this.t(u.key,u.params)}</span></div>`)}
      ${d.map(u=>h`<div class="finding warning"><ha-icon icon="mdi:greenhouse"></ha-icon><span>${this.t(u.key,u.params)}</span></div>`)}
      ${l?h`<div class="finding warning"><ha-icon icon="mdi:border-outside"></ha-icon><span>${this.t("planner.out_of_bounds")}</span></div>`:m}
    </div>`}renderTimeline(t){if(!t)return h`<p class="small muted">–</p>`;let s=this.snapshot.settings.region.hemisphere==="south"?`${this.season}-07-01`:`${this.season}-01-01`,i=485,a=c=>c?Math.max(0,Math.min(100,kt(s,c)/i*100)):null,r=(c,u,g,b,w)=>{let O=a(c),W=a(u);return O===null||W===null?m:h`<div class="bar" title=${`${w}: ${y(c,this.lang)} \u2013 ${y(u,this.lang)}`}
        style=${`left:${O}%;width:${Math.max(W-O,1)}%;top:${g}px;background:${b}`}></div>`},d=Array.from({length:16},(c,u)=>T(s,Math.round(u*30.4))),l=this.snapshot.analysis?.today;return h`
      <div class="timeline" role="img" aria-label=${`${this.t("lib.harvest")} ${y(t.harvest_start,this.lang)} \u2013 ${y(t.harvest_end,this.lang)}`}>
        ${r(t.sow_window?.start,t.sow_window?.end,6,"var(--hl-leaf-300)",this.t(t.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow"))}
        ${r(t.transplant_window?.start,t.transplant_window?.end,20,"var(--hl-leaf-600)",this.t("lib.transplant"))}
        ${r(t.in_ground,t.harvest_start,34,"color-mix(in srgb, var(--hl-leaf-500) 35%, transparent)",this.t("dash.active_crops",{n:1}))}
        ${r(t.harvest_start,t.harvest_end,34,"var(--hl-sun-500)",this.t("lib.harvest"))}
        ${d.filter((c,u)=>u%2===0).map(c=>h`<span class="month" style=${`left:${a(c)}%`}>${y(c,this.lang,{month:"short"})}</span>`)}
        ${l&&a(l)!==null?h`<div class="today" style=${`left:${a(l)}%`}></div>`:m}
      </div>
      <div class="xs muted" style="margin-top:4px">
        ${t.sow_date?h`${this.t(t.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}: <b>${y(t.sow_date,this.lang)}</b> · `:m}
        ${t.transplant_date?h`${this.t("lib.transplant")}: <b>${y(t.transplant_date,this.lang)}</b> · `:m}
        ${this.t("lib.harvest")}: <b>${y(t.harvest_start,this.lang)} – ${y(t.harvest_end,this.lang)}</b>
      </div>`}renderInspector(){let t=this.selection,e=t?this.findItem(t):void 0,s=!this.admin,i;if(!t||!e)i=h`<p class="small muted">${this.t("planner.nothing_selected")}</p>`;else if(t.kind==="planting"){let a=e,r=this.plantMap.get(a.plant_id),d=this.draft.beds.find(c=>c.id===a.bed_id),l=this.snapshot.analysis?.advice[a.id];i=h`
        <div class="row">
          <span class="family-dot" style=${`background:${L(this.families,r?.family)};width:14px;height:14px`}></span>
          <h3>${x(r,this.lang)}</h3>
        </div>
        <p class="xs muted">${r?.scientific_name} · ${this.families[r?.family??""]?.[this.lang]??r?.family} · ${d?.name}</p>
        <div class="form-grid">
          <label class="field">${this.t("planner.layout")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({layout:c.target.value})}>
              ${["single","block","row"].map(c=>h`<option value=${c} ?selected=${a.layout===c}>${this.t(`planner.layout.${c}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.status")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({status:c.target.value})}>
              ${["planned","sown_indoors","sown","transplanted","harvesting","finished","failed"].map(c=>h`<option value=${c} ?selected=${a.status===c}>${this.t(`status.${c}`)}</option>`)}
            </select></label>
          <label class="field full">${this.t("planner.method")}
            <select ?disabled=${s} @change=${c=>this.updateSelected({method:c.target.value})}>
              ${["indoor_sow","direct_sow","transplant"].map(c=>h`<option value=${c} ?selected=${a.method===c}>${this.t(`planner.method.${c}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="5" step="5" .value=${String(Math.round(a.width_cm))} ?disabled=${s}
            @change=${c=>this.updateSelected({width_cm:Number(c.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="5" step="5" .value=${String(Math.round(a.length_cm))} ?disabled=${s}
            @change=${c=>this.updateSelected({length_cm:Number(c.target.value)})} /></label>
          <label class="field full">${this.t(a.method==="transplant"?"lib.transplant":a.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}
            <input type="date" ?disabled=${s} .value=${(a.method==="transplant"?a.transplant_date:a.sow_date)??""}
              @change=${c=>this.updateSelected(a.method==="transplant"?{transplant_date:c.target.value||null}:{sow_date:c.target.value||null})} /></label>
        </div>
        <p class="small">${r?this.t("planner.count",{n:xe(a,r)}):""}</p>
        ${l?.reasons.length?h`<div class="stack" style="gap:4px">${l.reasons.filter(c=>c.key!=="reason.window_open").map(c=>h`<p class="small">${this.t(c.key,c.params)}</p>`)}</div>`:m}
        <h4>${this.t("planner.timeline")}</h4>
        ${this.renderTimeline(this.timelines[a.id])}
        <h4>${this.t("planner.warnings")}</h4>
        ${this.renderFindings(a.bed_id,a.id)}
        ${s?m:h`
          <div class="row wrap">
            <button class="btn small" @click=${()=>this.dialog="succession"}><ha-icon icon="mdi:calendar-multiple"></ha-icon>${this.t("planner.succession")}</button>
            <button class="btn small ghost" @click=${()=>this.duplicateSelected()}>${this.t("planner.duplicate")}</button>
            <button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>
          </div>`}
      `}else if(t.kind==="bed"){let a=e,r=this.snapshot.analysis?.beds[a.id],d=this.reports[a.id]??r?.compatibility;i=h`
        <h3>${a.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${a.name} ?disabled=${s}
            @change=${l=>this.updateSelected({name:l.target.value})} /></label>
          <label class="field">${this.t("planner.zone")}
            <select ?disabled=${s} @change=${l=>this.updateSelected({zone_id:l.target.value})}>
              ${this.draft.zones.map(l=>h`<option value=${l.id} ?selected=${a.zone_id===l.id}>${l.name}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${l=>this.updateSelected({kind:l.target.value})}>
              ${["in_ground","raised","container"].map(l=>h`<option value=${l} ?selected=${a.kind===l}>${this.t(`kind.${l}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(a.width_cm)} ?disabled=${s}
            @change=${l=>this.updateSelected({width_cm:Number(l.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(a.length_cm)} ?disabled=${s}
            @change=${l=>this.updateSelected({length_cm:Number(l.target.value)})} /></label>
          <label class="field">${this.t("planner.soil")}
            <select ?disabled=${s} @change=${l=>this.updateSelected({soil:l.target.value})}>
              ${["sandy","loam","clay","silt","peat","chalk","potting_mix"].map(l=>h`<option value=${l} ?selected=${a.soil===l}>${this.t(`soil.${l}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.orientation")}<input type="number" min="0" max="359" step="15" .value=${String(a.orientation_deg)} ?disabled=${s}
            @change=${l=>this.updateSelected({orientation_deg:Number(l.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(a.shade_pct??"")} ?disabled=${s}
            @change=${l=>this.updateSelected({shade_pct:l.target.value===""?null:Number(l.target.value)})} /></label>
        </div>
        ${r?h`
          <div class="row wrap">
            <span class="chip ${r.moisture_status==="optimal"?"ok":r.moisture_status==="dry"?"bad":r.moisture_status==="unknown"?"":"warn"}">
              <ha-icon icon="mdi:water-percent"></ha-icon>${this.t(`moisture.${r.moisture_status}`)}${r.irrigation.moisture!=null?` \xB7 ${Math.round(r.irrigation.moisture)}%`:""}</span>
            <span class="chip">${this.t(`irrigation.${r.irrigation.action}`,{mm:r.irrigation.amount_mm,liters:Math.round(r.irrigation.liters)})}</span>
          </div>`:m}
        <div class="row"><span class="score">${Math.round(d?.score??50)}</span><span class="small muted">${this.t("planner.score")}</span></div>
        ${this.renderFindings(a.id)}
        ${s?m:h`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}
      `}else{let a=e;i=h`
        <h3>${a.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${a.name} ?disabled=${s}
            @change=${r=>this.updateSelected({name:r.target.value})} /></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${r=>this.updateSelected({type:r.target.value})}>
              ${["outdoor","greenhouse","cold_frame"].map(r=>h`<option value=${r} ?selected=${a.type===r}>${this.t(`settings.zone_type.${r}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.wind")}
            <select ?disabled=${s} @change=${r=>this.updateSelected({wind:r.target.value},"microclimate")}>
              ${["sheltered","moderate","exposed"].map(r=>h`<option value=${r} ?selected=${a.microclimate.wind===r}>${this.t(`wind.${r}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="50" step="10" .value=${String(a.width_cm)} ?disabled=${s}
            @change=${r=>this.updateSelected({width_cm:Number(r.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="50" step="10" .value=${String(a.length_cm)} ?disabled=${s}
            @change=${r=>this.updateSelected({length_cm:Number(r.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(a.microclimate.shade_pct)} ?disabled=${s}
            @change=${r=>this.updateSelected({shade_pct:Number(r.target.value)},"microclimate")} /></label>
          <label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${a.microclimate.heated} ?disabled=${s}
            @change=${r=>this.updateSelected({heated:r.target.checked},"microclimate")} />${this.t("settings.heated")}</label>
        </div>
        ${s?m:h`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}
      `}return h`<aside class="pane" aria-label=${this.t("planner.inspector")}>
      <header><h3>${this.t("planner.inspector")}</h3></header>
      <div class="pane-body stack">${i}</div>
    </aside>`}renderDialog(){if(!this.dialog)return m;let t=()=>this.dialog=null,e;if(this.dialog==="shortcuts"){let s=[["\u2190 \u2191 \u2192 \u2193","shortcut.move"],["Alt + \u2190 \u2191 \u2192 \u2193","planner.width"],["Ctrl + Z","shortcut.undo"],["Ctrl + Y","shortcut.redo"],["Delete","shortcut.delete"],["Ctrl + D","shortcut.duplicate"],["[ ]","shortcut.cycle"],["G","shortcut.grid"],["C","shortcut.companions"],["M","shortcut.moisture"],["+ / \u2212 / 0","shortcut.zoom"],["Esc","shortcut.escape"],["?","shortcut.help"]];e=h`<h2>${this.t("planner.shortcuts")}</h2>
        <table class="shortcuts">${s.map(([i,a])=>h`<tr><td><kbd>${i}</kbd></td><td>${this.t(a)}</td></tr>`)}</table>
        <div class="row" style="justify-content:flex-end"><button class="btn" @click=${t}>${this.t("common.close")}</button></div>`}else if(this.dialog==="succession"){let s=this.selection?this.draft.plantings.find(a=>a.id===this.selection.id):void 0,i=s&&this.plantMap.get(s.plant_id);e=h`<form class="stack" @submit=${this.createSuccession}>
        <h2>${this.t("planner.succession")} – ${x(i,this.lang)}</h2>
        <label class="field">${this.t("planner.succession_count")}<input name="count" type="number" min="2" max="12" value="3" required /></label>
        <label class="field">${this.t("planner.succession_interval")}<input name="interval" type="number" min="3" max="90" .value=${String(i?.succession_interval_days??21)} /></label>
        <label class="field">${this.t("planner.succession_placement")}
          <select name="placement"><option value="split">${this.t("planner.succession.split")}</option><option value="stack">${this.t("planner.succession.stack")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${t}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.succession_create")}</button></div>
      </form>`}else e=h`<form class="stack" @submit=${this.importPlan}>
        <h2>${this.t("planner.import")}</h2>
        <input name="file" type="file" accept=".json,.yaml,.yml,application/json,application/yaml" required />
        <label class="field">${this.t("planner.import_mode")}
          <select name="mode"><option value="merge">${this.t("planner.import_merge")}</option><option value="replace">${this.t("planner.import_replace")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${t}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.import")}</button></div>
      </form>`;return h`<dialog @close=${t}>${e}</dialog>`}};$.styles=[z,S`
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
    `],p([f({attribute:!1})],$.prototype,"snapshot",2),p([f({attribute:!1})],$.prototype,"plants",2),p([f({attribute:!1})],$.prototype,"families",2),p([f({attribute:!1})],$.prototype,"api",2),p([f({attribute:!1})],$.prototype,"t",2),p([f()],$.prototype,"lang",2),p([f({type:Boolean})],$.prototype,"admin",2),p([f({type:Boolean})],$.prototype,"narrow",2),p([v()],$.prototype,"draft",2),p([v()],$.prototype,"selection",2),p([v()],$.prototype,"season",2),p([v()],$.prototype,"saveState",2),p([v()],$.prototype,"reports",2),p([v()],$.prototype,"extraTimelines",2),p([v()],$.prototype,"snapOn",2),p([v()],$.prototype,"showCompanions",2),p([v()],$.prototype,"showMoisture",2),p([v()],$.prototype,"showTemperature",2),p([v()],$.prototype,"viewDate",2),p([v()],$.prototype,"layoutMode",2),p([v()],$.prototype,"search",2),p([v()],$.prototype,"familyFilter",2),p([v()],$.prototype,"paletteDrag",2),p([v()],$.prototype,"ghostReport",2),p([v()],$.prototype,"dialog",2),p([v()],$.prototype,"announcement",2),p([v()],$.prototype,"paletteOpen",2),p([wt("hl-garden-canvas")],$.prototype,"canvas",2),$=p([A("hl-planner-view")],$);var Qe={id:"",names:{en:"",nl:""},scientific_name:"",family:"Asteraceae",variety:null,habit:"bush",perennial:!1,spacing_cm:30,row_spacing_cm:30,sowing_depth_cm:1,germination_days:[7,14],min_soil_temp_c:8,optimal_soil_temp_c:18,max_soil_temp_c:null,days_to_maturity:[60,80],maturity_from:"sow",harvest_duration_days:14,harvestable:!0,continuous_harvest:!1,harvest_interval_days:null,transplant_age_days:[35,49],sowing:{indoor_sow:[],direct_sow:[{start_week:-2,end_week:8,anchor:"last_frost"}],transplant:[]},greenhouse:{suitability:"conditional",min_night_c:5,max_day_c:30,season_extension_weeks:2,notes:{}},frost_tolerance:"half_hardy",min_temp_c:0,max_temp_c:30,companions:[],rotation_years:3,pests:[],diseases:[],water_needs:"medium",nutrient_needs:"medium",feeding_interval_days:null,care:[],pruning_notes:{},thinning:!1,succession_interval_days:null,gdd_base_c:10,gdd_to_maturity:null,tags:[],source:"custom"},M=class extends k{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.query="";this.family="";this.filter="";this.selected=null;this.editing=null;this.error=""}get anchors(){return this.snapshot.analysis?.anchors??{last_frost:`${new Date().getFullYear()}-04-20`,first_frost:`${new Date().getFullYear()}-10-25`}}seasonStart(){let t=this.anchors.last_frost;return this.snapshot.settings.region.hemisphere==="south"?`${t.slice(0,4)}-07-01`:`${t.slice(0,4)}-01-01`}renderCalendar(t){let e=this.seasonStart(),s=l=>Math.max(0,Math.min(100,kt(e,l)/365*100)),i=[],a=(l,c,u)=>{for(let g of l){let[b,w]=Gt(g,this.anchors);i.push(h`<div class="b" style=${`left:${s(b)}%;width:${Math.max(s(w)-s(b),1)}%;top:${c}px;background:${u}`}></div>`)}};a(t.sowing.indoor_sow,2,"var(--hl-leaf-300)"),a(t.sowing.direct_sow,8,"var(--hl-leaf-500)"),a(t.sowing.transplant,14,"var(--hl-leaf-700)");let r=[...t.sowing.direct_sow,...t.sowing.transplant][0];if(r&&t.harvestable){let[l,c]=Gt(r,this.anchors),u=t.maturity_from==="transplant"&&!t.sowing.transplant.length?t.germination_days[1]+14:0;i.push(h`<div class="b" style=${`left:${s(T(l,t.days_to_maturity[0]+u))}%;width:${Math.max(s(T(c,t.days_to_maturity[1]+u+t.harvest_duration_days))-s(T(l,t.days_to_maturity[0]+u)),1)}%;top:20px;background:var(--hl-sun-500)`}></div>`)}let d=Array.from({length:12},(l,c)=>y(T(e,Math.round(c*30.5+10)),this.lang,{month:"narrow"}));return h`<div class="cal" role="img" aria-label=${this.t("lib.calendar")}>${d.map(l=>h`<div class="m">${l}</div>`)}${i}</div>`}filtered(){let t=this.query.trim().toLowerCase();return this.plants.filter(e=>!this.family||e.family===this.family).filter(e=>this.filter!=="greenhouse"||e.greenhouse.suitability==="yes").filter(e=>this.filter!=="quick"||e.days_to_maturity[0]<=50).filter(e=>this.filter!=="custom"||e.source!=="builtin").filter(e=>!t||[e.id,e.scientific_name,e.family,this.families[e.family]?.[this.lang]??"",...Object.values(e.names)].some(s=>s.toLowerCase().includes(t))).sort((e,s)=>x(e,this.lang).localeCompare(x(s,this.lang)))}render(){let t=[...new Set(this.plants.map(e=>e.family))].sort();return h`
      <div class="top">
        <input type="search" placeholder=${this.t("lib.search")} aria-label=${this.t("lib.search")} .value=${this.query}
          @input=${e=>this.query=e.target.value} />
        <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
          <select style="width:auto" @change=${e=>this.family=e.target.value}>
            ${["",...t].map(e=>h`<option value=${e} ?selected=${e===this.family}>${e?this.families[e]?.[this.lang]??e:`${this.t("lib.family")}: ${this.t("common.all")}`}</option>`)}
          </select>
        </label>
        ${["greenhouse","quick","custom"].map(e=>h`
          <button class="chip" aria-pressed=${String(this.filter===e)} @click=${()=>this.filter=this.filter===e?"":e}>${this.t(`lib.filter_${e}`)}</button>`)}
        <span class="spacer"></span>
        ${this.admin?h`<button class="btn primary small" @click=${()=>this.editing={plant:structuredClone(Qe),mode:"custom"}}>
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("lib.add_custom")}</button>`:m}
      </div>
      <div class="legend-row" aria-hidden="true">
        <span style="--c:var(--hl-leaf-300)">${this.t("lib.indoor_sow")}</span><span style="--c:var(--hl-leaf-500)">${this.t("lib.direct_sow")}</span>
        <span style="--c:var(--hl-leaf-700)">${this.t("lib.transplant")}</span><span style="--c:var(--hl-sun-500)">${this.t("lib.harvest")}</span>
      </div>
      <div class="grid" style="margin-top:12px">
        ${this.filtered().map(e=>h`
          <button class="pcard" @click=${()=>this.selected=e} aria-label=${x(e,this.lang)}>
            <div class="stripe" style=${`background:${L(this.families,e.family)}`}></div>
            <div class="inner">
              <div class="row"><h3>${x(e,this.lang)}</h3><span class="spacer"></span>
                ${e.source!=="builtin"?h`<span class="chip warn">${this.t(`lib.source.${e.source}`)}</span>`:m}</div>
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
    `}renderDetail(t){let e=this.lang,s=a=>{let r=new Map;for(let d of t.companions)d.relation===a&&r.set(d.plant,d.reason[e]??d.reason.en??"");for(let d of this.plants)for(let l of d.companions)l.plant===t.id&&l.relation===a&&!r.has(d.id)&&r.set(d.id,l.reason[e]??l.reason.en??"");return[...r.entries()]},i=a=>x(this.plants.find(r=>r.id===a),this.lang);return h`
      <aside class="drawer" role="dialog" aria-modal="false" aria-label=${x(t,this.lang)} @keydown=${a=>a.key==="Escape"&&(this.selected=null)}>
        <header style=${`border-top: 6px solid ${L(this.families,t.family)}`}>
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
            <span>${this.t("lib.rotation")}</span><span>${this.t("lib.rotation_years",{n:t.rotation_years})}</span>
          </div>
          ${t.greenhouse.notes[e]?h`<p class="small">${t.greenhouse.notes[e]}</p>`:m}
          <section class="stack"><h3>${this.t("lib.friends")}</h3>
            ${s("friend").map(([a,r])=>h`<div class="rel"><span class="chip ok">${i(a)}</span><span class="muted">${r}</span></div>`)}</section>
          <section class="stack"><h3>${this.t("lib.enemies")}</h3>
            ${s("enemy").length?s("enemy").map(([a,r])=>h`<div class="rel"><span class="chip bad">${i(a)}</span><span class="muted">${r}</span></div>`):h`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.pests")} & ${this.t("lib.diseases")}</h3>
            <div class="row wrap">${t.pests.map(a=>h`<span class="chip warn">${Kt(a,this.lang)}</span>`)}${t.diseases.map(a=>h`<span class="chip bad">${Kt(a,this.lang)}</span>`)}</div></section>
          ${t.care.length||t.pruning_notes[e]?h`<section class="stack"><h3>${this.t("lib.care")}</h3>
            ${t.care.map(a=>h`<p class="small"><b>${this.t(`type.${a.task}`)}</b>${a.interval_days?` \xB7 \u21BB ${a.interval_days} d`:""} – ${a.notes[e]??a.notes.en??""}</p>`)}
            ${t.pruning_notes[e]?h`<p class="small">${t.pruning_notes[e]}</p>`:m}</section>`:m}
          ${this.admin?h`<div class="row">
            <button class="btn" @click=${()=>this.editing={plant:structuredClone(t),mode:t.source==="custom"?"custom":"override"}}>
              <ha-icon icon="mdi:pencil"></ha-icon>${this.t("lib.customize")}</button>
            ${t.source!=="builtin"?h`<button class="btn danger" @click=${()=>this.removePlant(t)}>${t.source==="override"?this.t("lib.reset"):this.t("common.delete")}</button>`:m}
          </div>`:m}
        </div>
      </aside>`}async removePlant(t){try{await this.api.deletePlant(t.id),this.selected=null,this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0}))}catch(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e.message},bubbles:!0,composed:!0}))}}async save(t){t.preventDefault();let{plant:e,mode:s}=this.editing,i=t.target,a=g=>i.elements.namedItem(g).value,r=g=>Number(a(g)),d=g=>i.elements.namedItem(`${g}_on`).checked?[{start_week:r(`${g}_start`),end_week:r(`${g}_end`),anchor:"last_frost"}]:[],l=a("name_en").trim(),c={...e,id:s==="custom"&&!e.id?l.toLowerCase().normalize("NFKD").replace(/[^\w]+/g,"_").replace(/^_|_$/g,"")||"plant":e.id,names:{...e.names,en:l,nl:a("name_nl").trim()||l},scientific_name:a("scientific"),variety:a("variety")||null,family:a("family"),habit:a("habit"),spacing_cm:r("spacing"),row_spacing_cm:r("row_spacing"),sowing_depth_cm:r("depth"),germination_days:[r("germ_min"),r("germ_max")],min_soil_temp_c:r("soil_temp"),days_to_maturity:[r("dtm_min"),r("dtm_max")],maturity_from:a("maturity_from"),frost_tolerance:a("frost"),min_temp_c:r("min_temp"),max_temp_c:r("max_temp"),water_needs:a("water"),nutrient_needs:a("nutrients"),rotation_years:r("rotation"),greenhouse:{...e.greenhouse,suitability:a("gh")},sowing:{indoor_sow:d("indoor"),direct_sow:d("direct"),transplant:d("transplant")},pests:a("pests").split(",").map(g=>g.trim().replace(/\s+/g,"_")).filter(Boolean),diseases:a("diseases").split(",").map(g=>g.trim().replace(/\s+/g,"_")).filter(Boolean)},u=c;if(s==="override"){u={id:c.id};for(let g of Object.keys(c))g!=="source"&&JSON.stringify(c[g])!==JSON.stringify(e[g])&&(u[g]=c[g])}try{let g=await this.api.savePlant(u,s);this.editing=null,this.selected=g.plant,this.error="",this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("lib.saved",{plant:x(g.plant,this.lang)})},bubbles:!0,composed:!0}))}catch(g){this.error=g.message??String(g)}}updated(){let t=this.renderRoot.querySelector("dialog");t&&!t.open&&t.showModal()}renderEditor(){let{plant:t,mode:e}=this.editing,s=(a,r,d,l)=>h`
      <select name=${a}>${d.map(c=>h`<option value=${c} ?selected=${c===r}>${l?this.t(`${l}.${c}`):this.families[c]?.[this.lang]??c}</option>`)}</select>`,i=(a,r,d)=>h`
      <label class="row small"><input type="checkbox" name=${`${a}_on`} ?checked=${!!d} />${r}</label>
      <label class="field">${this.t("lib.from")} (${this.t("lib.weeks")})<input name=${`${a}_start`} type="number" min="-30" max="30" .value=${String(d?.start_week??-4)} /></label>
      <label class="field">${this.t("lib.to")} (${this.t("lib.weeks")})<input name=${`${a}_end`} type="number" min="-30" max="40" .value=${String(d?.end_week??2)} /></label>`;return h`<dialog @close=${()=>this.editing=null} style="border:none;border-radius:16px;padding:0;width:min(640px,calc(100vw - 32px));background:var(--hl-surface);color:var(--hl-text)">
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
        ${this.error?h`<p class="field-error" role="alert">${this.error}</p>`:m}
        <div class="row" style="justify-content:flex-end">
          <button type="button" class="btn ghost" @click=${()=>this.editing=null}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("common.save")}</button>
        </div>
      </form>
    </dialog>`}};M.styles=[z,S`
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
    `],p([f({attribute:!1})],M.prototype,"snapshot",2),p([f({attribute:!1})],M.prototype,"plants",2),p([f({attribute:!1})],M.prototype,"families",2),p([f({attribute:!1})],M.prototype,"api",2),p([f({attribute:!1})],M.prototype,"t",2),p([f()],M.prototype,"lang",2),p([f({type:Boolean})],M.prototype,"admin",2),p([v()],M.prototype,"query",2),p([v()],M.prototype,"family",2),p([v()],M.prototype,"filter",2),p([v()],M.prototype,"selected",2),p([v()],M.prototype,"editing",2),p([v()],M.prototype,"error",2),M=p([A("hl-library-view")],M);var D=class extends k{constructor(){super(...arguments);this.lang="en";this.mode="month";this.cursor="";this.showDone=!1;this.bedFilter=""}willUpdate(){this.cursor||(this.cursor=this.today)}emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}get today(){return this.snapshot.analysis?.today??pt(new Date)}get tasks(){return this.snapshot.tasks.filter(t=>(this.showDone||t.status==="open")&&t.status!=="skipped"&&(!this.bedFilter||t.bed_id===this.bedFilter))}byDay(){let t=new Map;for(let e of mt(this.tasks)){let s=e.status==="open"&&e.due<this.today?this.today:e.due;t.set(s,[...t.get(s)??[],e])}return t}move(t){let e=B(this.cursor);this.mode==="month"?e.setMonth(e.getMonth()+t,1):e.setDate(e.getDate()+t*(this.mode==="week"?7:30)),this.cursor=pt(e)}weekStart(t){let s=(B(t).getDay()+6)%7;return T(t,-s)}renderEvent(t){let e=t.status==="open"&&t.due<this.today;return h`<button class="ev ${t.status!=="open"?"done":""} ${e?"overdue":""}" style=${`border-left-color:${ct[t.type]??"var(--hl-soil-500)"}`}
      title=${t.title} @click=${()=>this.emit("open-task",t)}>
      <ha-icon icon=${ht[t.type]}></ha-icon><span>${t.title}</span></button>`}renderMonth(){let t=B(this.cursor);t.setDate(1);let e=this.weekStart(pt(t)),s=t.getMonth(),i=Array.from({length:42},(d,l)=>T(e,l)),a=this.byDay(),r=Array.from({length:7},(d,l)=>y(T(e,l),this.lang,{weekday:"short"}));return h`<div class="month" role="grid">
      ${r.map(d=>h`<div class="dow" role="columnheader">${d}</div>`)}
      ${i.map(d=>{let l=a.get(d)??[];return h`<div class="cell ${B(d).getMonth()!==s?"other":""} ${d===this.today?"today":""}" role="gridcell" aria-label=${y(d,this.lang,{day:"numeric",month:"long"})}>
          <span class="num">${B(d).getDate()}</span>
          ${l.slice(0,4).map(c=>this.renderEvent(c))}
          ${l.length>4?h`<button class="more" @click=${()=>{this.cursor=d,this.mode="week"}}>+${l.length-4}</button>`:m}
        </div>`})}
    </div>`}renderWeek(){let t=this.weekStart(this.cursor),e=this.byDay();return h`<div class="week">
      ${Array.from({length:7},(s,i)=>T(t,i)).map(s=>h`
        <div class="col ${s===this.today?"today":""}">
          <b class="small">${y(s,this.lang,{weekday:"long",day:"numeric",month:"short"})}</b>
          ${(e.get(s)??[]).map(i=>this.renderEvent(i))}
        </div>`)}
    </div>`}renderList(){let t={t:this.t,lang:this.lang,today:this.today,onOpen:i=>this.emit("open-task",i),onComplete:i=>this.emit("complete-task",i)},e=this.byDay(),s=[...e.keys()].filter(i=>i>=this.cursor).sort().slice(0,30);return s.length?h`${s.map(i=>h`<div class="group">
      <h3>${i===this.today?this.t("common.today"):y(i,this.lang,{weekday:"long",day:"numeric",month:"long"})}</h3>
      <ul class="tasks">${e.get(i).map(a=>gt(a,t))}</ul></div>`)}`:h`<p class="empty">–</p>`}render(){let t=this.mode==="month"?y(this.cursor,this.lang,{month:"long",year:"numeric"}):`${y(this.weekStart(this.cursor),this.lang)} \u2013 ${y(T(this.weekStart(this.cursor),6),this.lang)}`;return h`
      <div class="bar">
        <button class="icon-btn" aria-label=${this.t("cal.prev")} @click=${()=>this.move(-1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
        <button class="btn small" @click=${()=>this.cursor=this.today}>${this.t("common.today")}</button>
        <button class="icon-btn" aria-label=${this.t("cal.next")} @click=${()=>this.move(1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
        <h2 aria-live="polite">${t}</h2>
        <span class="spacer"></span>
        <div class="row" role="group">
          ${["month","week","list"].map(e=>h`<button class="chip" aria-pressed=${String(this.mode===e)} @click=${()=>this.mode=e}>${this.t(`cal.${e}`)}</button>`)}
        </div>
        <label class="row small"><span class="visually-hidden">${this.t("task.bed")}</span>
          <select style="width:auto" @change=${e=>this.bedFilter=e.target.value}>
            ${[{id:"",name:this.t("cal.all_beds")},...this.snapshot.beds].map(e=>h`<option value=${e.id} ?selected=${e.id===this.bedFilter}>${e.name}</option>`)}
          </select>
        </label>
        <label class="row small"><input type="checkbox" .checked=${this.showDone} @change=${e=>this.showDone=e.target.checked} />${this.t("cal.show_done")}</label>
        <button class="btn primary small" @click=${()=>this.emit("new-task",null)}><ha-icon icon="mdi:plus"></ha-icon>${this.t("cal.add_task")}</button>
      </div>
      ${this.mode==="month"?this.renderMonth():this.mode==="week"?this.renderWeek():this.renderList()}
    `}};D.styles=[z,Tt,S`
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
    `],p([f({attribute:!1})],D.prototype,"snapshot",2),p([f({attribute:!1})],D.prototype,"t",2),p([f()],D.prototype,"lang",2),p([v()],D.prototype,"mode",2),p([v()],D.prototype,"cursor",2),p([v()],D.prototype,"showDone",2),p([v()],D.prototype,"bedFilter",2),D=p([A("hl-calendar-view")],D);var Ve=["nl_be","uk_south","uk_north","de_central","fr_north","scandinavia_south","mediterranean","au_melbourne","nz_christchurch","za_highveld"],ts={nl_be:"Nederland / Vlaanderen",uk_south:"UK (south)",uk_north:"UK (north)",de_central:"Deutschland (Mitte)",fr_north:"France (nord)",scandinavia_south:"Scandinavia (south)",mediterranean:"Mediterranean",au_melbourne:"Australia \u2013 Melbourne",nz_christchurch:"New Zealand \u2013 Christchurch",za_highveld:"South Africa \u2013 Highveld"},es=Array.from({length:13},(o,n)=>[`${n+1}a`,`${n+1}b`]).flat(),ss={soil_moisture:{domains:["sensor"],deviceClass:"moisture"},soil_temperature:{domains:["sensor"],deviceClass:"temperature"},air_temperature:{domains:["sensor"],deviceClass:"temperature"},air_humidity:{domains:["sensor"],deviceClass:"humidity"},light:{domains:["sensor"],deviceClass:"illuminance"},rain:{domains:["sensor","binary_sensor"]}},H=class extends k{constructor(){super(...arguments);this.lang="en";this.admin=!0;this.busy=!1}entityOptions(t){let e=Object.values(this.hass?.states??{}),s=t==="weather"?{domains:["weather"]}:t==="irrigation"?{domains:["switch","valve"]}:t==="tts"?{domains:["tts"]}:t==="media_player"?{domains:["media_player"]}:t==="vent"?{domains:["cover","switch","fan"]}:ss[t];return e.filter(i=>s.domains.includes(i.entity_id.split(".")[0])).filter(i=>!("deviceClass"in s)||!s.deviceClass||i.attributes.device_class===s.deviceClass).map(i=>i.entity_id).sort()}entityInput(t,e,s,i,a){let r=`list-${e}`,d=s?this.hass?.states[s]:void 0;return h`<label class="field">${a}
      <input list=${r} .value=${s??""} placeholder=${`${{weather:"weather",irrigation:"switch",tts:"tts",media_player:"media_player",vent:"cover"}[e]??"sensor"}.\u2026`} ?disabled=${!this.admin} id=${t}
        aria-invalid=${s&&!d?"true":"false"}
        @change=${l=>i(l.target.value.trim()||null)} />
      ${s?h`<span class="state">${d?`${d.state} ${d.attributes.unit_of_measurement??""}`:"\u26A0 not found"}</span>`:m}
    </label>`}datalists(){return h`${["soil_moisture","soil_temperature","air_temperature","air_humidity","light","rain","weather","irrigation","tts","media_player","vent"].map(e=>h`<datalist id=${`list-${e}`}>${this.entityOptions(e).map(s=>h`<option value=${s}></option>`)}</datalist>`)}`}async saveSettings(t){this.busy=!0;try{await this.api.saveSettings(t),this.toast(this.t("settings.saved"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}finally{this.busy=!1}}async savePlan(t){let e=structuredClone({zones:this.snapshot.zones,beds:this.snapshot.beds,plantings:this.snapshot.plantings});t(e);try{await this.api.savePlan(e,this.snapshot.revision),this.toast(this.t("settings.saved"))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}toast(t){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t},bubbles:!0,composed:!0}))}renderRegion(){let t=this.snapshot.settings.region,e=this.snapshot.analysis?.anchors,s=i=>this.saveSettings({region:i});return h`<section class="card stack" aria-labelledby="s-region">
      <h2 id="s-region">${this.t("settings.region")}</h2>
      <div class="form-grid">
        <label class="field">${this.t("settings.hemisphere")}
          <select ?disabled=${!this.admin} @change=${i=>s({hemisphere:i.target.value})}>
            ${["north","south"].map(i=>h`<option value=${i} ?selected=${t.hemisphere===i}>${this.t(`settings.hemisphere.${i}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("settings.mode")}
          <select ?disabled=${!this.admin} @change=${i=>s({mode:i.target.value})}>
            ${["preset","usda","custom"].map(i=>h`<option value=${i} ?selected=${t.mode===i}>${this.t(`settings.mode.${i}`)}</option>`)}
          </select></label>
        ${t.mode==="preset"?h`<label class="field full">${this.t("settings.preset")}
          <select ?disabled=${!this.admin} @change=${i=>s({preset:i.target.value})}>
            ${Ve.map(i=>h`<option value=${i} ?selected=${t.preset===i}>${ts[i]}</option>`)}</select></label>`:m}
        ${t.mode==="usda"?h`<label class="field full">${this.t("settings.zone")}
          <select ?disabled=${!this.admin} @change=${i=>s({hardiness_zone:i.target.value})}>
            ${es.map(i=>h`<option value=${i} ?selected=${t.hardiness_zone===i}>${i}</option>`)}</select></label>`:m}
        ${t.mode==="custom"?h`
          <label class="field">${this.t("settings.last_frost")}<input pattern="\\d{2}-\\d{2}" .value=${t.last_frost} ?disabled=${!this.admin}
            @change=${i=>i.target.checkValidity()&&s({last_frost:i.target.value})} /></label>
          <label class="field">${this.t("settings.first_frost")}<input pattern="\\d{2}-\\d{2}" .value=${t.first_frost} ?disabled=${!this.admin}
            @change=${i=>i.target.checkValidity()&&s({first_frost:i.target.value})} /></label>`:m}
      </div>
      ${e?h`<p class="small muted">${this.t("settings.frost_dates_now",{last:y(e.last_frost,this.lang,{day:"numeric",month:"long"}),first:y(e.first_frost,this.lang,{day:"numeric",month:"long",year:"numeric"})})}</p>`:m}
    </section>`}renderWeather(){let t=this.snapshot.settings;return h`<section class="card stack" aria-labelledby="s-weather">
      <h2 id="s-weather">${this.t("settings.weather")}</h2>
      ${this.entityInput("w","weather",t.weather_entity,e=>this.saveSettings({weather_entity:e}),this.t("settings.weather_entity"))}
      ${this.entityInput("ot","air_temperature",t.outdoor_sensors.air_temperature,e=>this.saveSettings({outdoor_sensors:{air_temperature:e}}),this.t("settings.outdoor_temp"))}
      ${this.entityInput("rn","rain",t.outdoor_sensors.rain,e=>this.saveSettings({outdoor_sensors:{rain:e}}),this.t("settings.rain"))}
      ${this.snapshot.weather.error?h`<p class="small" style="color:var(--hl-warning)">⚠ ${this.snapshot.weather.error}</p>`:m}
    </section>`}renderZones(){let t=(e,s)=>this.savePlan(i=>s(i.zones.find(a=>a.id===e)));return h`<section class="card stack" aria-labelledby="s-zones">
      <h2 id="s-zones">${this.t("settings.zones")}</h2>
      ${this.snapshot.zones.map(e=>h`<div class="item">
        <h4><ha-icon icon=${e.type==="outdoor"?"mdi:tree-outline":"mdi:greenhouse"}></ha-icon>${e.name}<span class="chip">${this.t(`settings.zone_type.${e.type}`)}</span></h4>
        <div class="form-grid">
          ${["air_temperature","air_humidity","light"].map(s=>this.entityInput(`${e.id}-${s}`,s,e.sensors[s],i=>t(e.id,a=>a.sensors[s]=i),this.t(`settings.sensor.${s}`)))}
          ${e.type!=="outdoor"?this.entityInput(`${e.id}-vent`,"vent",e.vent_entity,s=>t(e.id,i=>i.vent_entity=s),this.t("settings.vent")):m}
          <label class="field check"><input type="checkbox" .checked=${e.microclimate.heated} ?disabled=${!this.admin}
            @change=${s=>t(e.id,i=>i.microclimate.heated=s.target.checked)} />${this.t("settings.heated")}</label>
          ${e.microclimate.heated?h`<label class="field">${this.t("settings.min_heating")}<input type="number" step="0.5" .value=${String(e.microclimate.min_heating_temp_c??5)}
            @change=${s=>t(e.id,i=>i.microclimate.min_heating_temp_c=Number(s.target.value))} /></label>`:m}
        </div>
      </div>`)}
    </section>`}renderBeds(){let t=(e,s)=>this.savePlan(i=>s(i.beds.find(a=>a.id===e)));return h`<section class="card stack" aria-labelledby="s-beds">
      <h2 id="s-beds">${this.t("settings.beds")}</h2>
      ${this.snapshot.beds.map(e=>h`<div class="item">
        <h4><ha-icon icon="mdi:sprout-outline"></ha-icon>${e.name}<span class="chip">${Math.round(e.width_cm)} × ${Math.round(e.length_cm)} cm</span></h4>
        <div class="form-grid">
          ${["soil_moisture","soil_temperature"].map(s=>this.entityInput(`${e.id}-${s}`,s,e.sensors[s],i=>t(e.id,a=>a.sensors[s]=i),this.t(`settings.sensor.${s}`)))}
          ${this.entityInput(`${e.id}-irr`,"irrigation",e.irrigation_entity,s=>t(e.id,i=>i.irrigation_entity=s),this.t("settings.irrigation"))}
          <label class="field">${this.t("settings.flow")}<input type="number" min="0" step="0.1" .value=${String(e.irrigation_flow_lpm??"")} ?disabled=${!this.admin}
            @change=${s=>t(e.id,i=>i.irrigation_flow_lpm=Number(s.target.value)||null)} /></label>
        </div>
      </div>`)}
    </section>`}renderNotifications(){let t=this.snapshot.settings.notifications,e=a=>this.saveSettings({notifications:a}),s=a=>a.split(",").map(r=>r.trim()).filter(Boolean),i=Object.keys(this.hass?.services?.notify??{}).map(a=>`notify.${a}`);return h`<section class="card stack" aria-labelledby="s-notify">
      <h2 id="s-notify">${this.t("settings.notifications")}</h2>
      <label class="field check"><input type="checkbox" .checked=${t.persistent} @change=${a=>e({persistent:a.target.checked})} />${this.t("settings.persistent")}</label>
      <label class="field">${this.t("settings.notify_services")}
        <input list="notify-services" .value=${t.notify_services.join(", ")} @change=${a=>e({notify_services:s(a.target.value)})} />
        <datalist id="notify-services">${i.map(a=>h`<option value=${a}></option>`)}</datalist></label>
      ${this.entityInput("tts","tts",t.tts_entity,a=>e({tts_entity:a}),this.t("settings.tts"))}
      <label class="field">${this.t("settings.tts_players")}<input list="list-media_player" .value=${t.tts_media_players.join(", ")}
        @change=${a=>e({tts_media_players:s(a.target.value)})} /></label>
      <div class="form-grid">
        <label class="field">${this.t("settings.digest")}<input type="time" .value=${t.digest_time} @change=${a=>e({digest_time:a.target.value})} /></label>
        <span></span>
        <label class="field check"><input type="checkbox" .checked=${t.frost_alerts} @change=${a=>e({frost_alerts:a.target.checked})} />${this.t("settings.frost_alerts")}</label>
        <label class="field check"><input type="checkbox" .checked=${t.heat_alerts} @change=${a=>e({heat_alerts:a.target.checked})} />${this.t("settings.heat_alerts")}</label>
        <label class="field check full"><input type="checkbox" .checked=${t.tts_frost_announcement} @change=${a=>e({tts_frost_announcement:a.target.checked})} />${this.t("settings.tts_frost")}</label>
      </div>
    </section>`}renderGeneral(){let t=this.snapshot.settings;return h`<section class="card stack" aria-labelledby="s-general">
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
    </section>`}async export(t){let e=await this.api.exportPlan(t,!0);St(e.filename,e.content,t==="json"?"application/json":"application/yaml")}render(){return h`
      ${this.admin?m:h`<p class="small" style="color:var(--hl-warning);margin-bottom:12px">${this.t("common.admin_only")}</p>`}
      <fieldset ?disabled=${!this.admin||this.busy} style="border:0;padding:0;margin:0">
        <div class="sections">
          ${this.renderRegion()} ${this.renderWeather()} ${this.renderZones()} ${this.renderBeds()} ${this.renderNotifications()} ${this.renderGeneral()}
        </div>
      </fieldset>
      ${this.datalists()}
    `}};H.styles=[z,S`
      .sections { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: var(--hl-s4); align-items: start; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .item { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); display: flex; flex-direction: column; gap: var(--hl-s2); background: var(--hl-surface-2); }
      .item h4 { display: flex; align-items: center; gap: var(--hl-s2); }
      .check { flex-direction: row !important; align-items: center; gap: var(--hl-s2) !important; color: var(--hl-text) !important; }
      .state { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
    `],p([f({attribute:!1})],H.prototype,"snapshot",2),p([f({attribute:!1})],H.prototype,"hass",2),p([f({attribute:!1})],H.prototype,"api",2),p([f({attribute:!1})],H.prototype,"t",2),p([f()],H.prototype,"lang",2),p([f({type:Boolean})],H.prototype,"admin",2),p([v()],H.prototype,"busy",2),H=p([A("hl-settings-view")],H);var Te=[{id:"dashboard",icon:"mdi:home-variant-outline"},{id:"planner",icon:"mdi:floor-plan"},{id:"library",icon:"mdi:sprout-outline"},{id:"calendar",icon:"mdi:calendar-month-outline"},{id:"settings",icon:"mdi:cog-outline"}],P=class extends k{constructor(){super(...arguments);this.narrow=!1;this.snapshot=null;this.plants=[];this.families={};this.tab="dashboard";this.toastMsg="";this.openTask=null;this.creatingTask=!1;this.error="";this.t=xt("en");this.uiLang="en"}willUpdate(t){if(t.has("hass")&&this.hass){let e=dt(this.snapshot?.lang??this.hass.locale?.language??this.hass.language);e!==this.uiLang&&(this.uiLang=e,this.t=xt(e)),this.toggleAttribute("dark",!!this.hass.themes?.darkMode),this.api?this.api.setHass(this.hass):(this.api=new lt(this.hass),this.connect())}if(t.has("route")&&this.route){let e=this.route.path.replace(/^\//,"").split("/")[0];this.tab=Te.some(s=>s.id===e)?e:"dashboard"}}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.unsubscribe=void 0,this.api=void 0}connectedCallback(){super.connectedCallback(),this.hass&&!this.api&&(this.api=new lt(this.hass),this.connect())}async connect(){try{await this.loadPlants(),this.unsubscribe=await this.api.subscribe(t=>{this.snapshot=t;let e=dt(t.lang);e!==this.uiLang&&(this.uiLang=e,this.t=xt(e)),this.openTask&&(this.openTask=t.tasks.find(s=>s.id===this.openTask.id)??null)})}catch(t){this.error=t.code==="not_loaded"?this.t("common.not_loaded"):String(t.message??t)}}async loadPlants(){let t=await this.api.plants();this.plants=t.plants,this.families=t.families}navigate(t,e){e?.preventDefault();let s=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/${t==="dashboard"?"":t}`.replace(/\/$/,"");history.pushState(null,"",s),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab=t}toast(t){this.toastMsg=t,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastMsg="",4500)}async completeTask(t){try{await this.api.taskAction(t.id,"complete"),this.toast(this.t("task.completed",{title:t.title}))}catch(e){this.toast(this.t("common.error",{message:e.message}))}}renderTab(){let t=this.snapshot,e=this.hass.user?.is_admin??!0,s=new Map(this.plants.map(i=>[i.id,i]));switch(this.tab){case"planner":return h`<hl-planner-view .snapshot=${t} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${e} .narrow=${this.narrow}></hl-planner-view>`;case"library":return h`<hl-library-view .snapshot=${t} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${e} @plants-changed=${()=>this.loadPlants()}></hl-library-view>`;case"calendar":return h`<hl-calendar-view .snapshot=${t} .t=${this.t} .lang=${this.uiLang}></hl-calendar-view>`;case"settings":return h`<hl-settings-view .snapshot=${t} .hass=${this.hass} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .admin=${e}></hl-settings-view>`;default:return h`<hl-dashboard-view .snapshot=${t} .plants=${s} .families=${this.families} .t=${this.t} .lang=${this.uiLang}></hl-dashboard-view>`}}renderNav(t){return h`<nav class=${t} aria-label="Hortulus">
      ${Te.map(e=>h`<a href="#" aria-current=${e.id===this.tab?"page":"false"} @click=${s=>this.navigate(e.id,s)}>
        <ha-icon icon=${e.icon}></ha-icon>${this.t(`nav.${e.id}`)}</a>`)}
    </nav>`}render(){return h`
      <header class="appbar">
        ${this.narrow?h`<button class="icon-btn" aria-label="Menu" @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}>
          <ha-icon icon="mdi:menu"></ha-icon></button>`:m}
        <div class="brand">${Ft(30)}<span>Hortulus</span>${this.narrow?m:h`<small>${this.t("app.tagline")}</small>`}</div>
        ${this.renderNav("top")}
      </header>
      <main @open-task=${t=>this.openTask=t.detail}
        @complete-task=${t=>this.completeTask(t.detail)}
        @new-task=${()=>this.creatingTask=!0}
        @navigate=${t=>this.navigate(t.detail)}
        @hl-toast=${t=>this.toast(t.detail.message)}>
        ${this.error?h`<div class="card error">${Ft(56)}<p>${this.error}</p></div>`:this.snapshot?this.renderTab():h`<p class="empty">${this.t("common.loading")}</p>`}
      </main>
      ${this.renderNav("bottom-nav")}
      ${this.snapshot&&(this.openTask||this.creatingTask)?h`<hl-task-dialog .task=${this.openTask} .create=${this.creatingTask}
        .beds=${this.snapshot.beds} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .today=${this.snapshot.analysis?.today??""}
        @hl-toast=${t=>this.toast(t.detail.message)}
        @closed=${()=>{this.openTask=null,this.creatingTask=!1}}></hl-task-dialog>`:m}
      ${this.toastMsg?h`<div class="toast" role="status" aria-live="polite">${this.toastMsg}</div>`:m}
    `}};P.styles=[ve,z,S`
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
    `],p([f({attribute:!1})],P.prototype,"hass",2),p([f({type:Boolean,reflect:!0})],P.prototype,"narrow",2),p([f({attribute:!1})],P.prototype,"route",2),p([f({attribute:!1})],P.prototype,"panel",2),p([v()],P.prototype,"snapshot",2),p([v()],P.prototype,"plants",2),p([v()],P.prototype,"families",2),p([v()],P.prototype,"tab",2),p([v()],P.prototype,"toastMsg",2),p([v()],P.prototype,"openTask",2),p([v()],P.prototype,"creatingTask",2),p([v()],P.prototype,"error",2),P=p([A("hortulus-panel")],P);export{P as HortulusPanel};
