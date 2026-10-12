var ki=Object.defineProperty;var xi=Object.getOwnPropertyDescriptor;var p=(c,r,e,t)=>{for(var s=t>1?void 0:t?xi(r,e):r,i=c.length-1,n;i>=0;i--)(n=c[i])&&(s=(t?n(r,e,s):n(s))||s);return t&&s&&ki(r,e,s),s};var lt=globalThis,dt=lt.ShadowRoot&&(lt.ShadyCSS===void 0||lt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Rt=Symbol(),vs=new WeakMap,De=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==Rt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(dt&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=vs.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&vs.set(e,r))}return r}toString(){return this.cssText}},bs=c=>new De(typeof c=="string"?c:c+"",void 0,Rt),T=(c,...r)=>{let e=c.length===1?c[0]:r.reduce((t,s,i)=>t+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+c[i+1],c[0]);return new De(e,c,Rt)},ys=(c,r)=>{if(dt)c.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),s=lt.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,c.appendChild(t)}},Ct=dt?c=>c:c=>c instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return bs(e)})(c):c;var{is:Si,defineProperty:Mi,getOwnPropertyDescriptor:Ei,getOwnPropertyNames:Ti,getOwnPropertySymbols:zi,getPrototypeOf:Pi}=Object,ct=globalThis,$s=ct.trustedTypes,ji=$s?$s.emptyScript:"",Ri=ct.reactiveElementPolyfillSupport,Fe=(c,r)=>c,Ue={toAttribute(c,r){switch(r){case Boolean:c=c?ji:null;break;case Object:case Array:c=c==null?c:JSON.stringify(c)}return c},fromAttribute(c,r){let e=c;switch(r){case Boolean:e=c!==null;break;case Number:e=c===null?null:Number(c);break;case Object:case Array:try{e=JSON.parse(c)}catch{e=null}}return e}},ht=(c,r)=>!Si(c,r),_s={attribute:!0,type:String,converter:Ue,reflect:!1,useDefault:!1,hasChanged:ht};Symbol.metadata??=Symbol("metadata"),ct.litPropertyMetadata??=new WeakMap;var le=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=_s){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(r,t,e);s!==void 0&&Mi(this.prototype,r,s)}}static getPropertyDescriptor(r,e,t){let{get:s,set:i}=Ei(this.prototype,r)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let a=s?.call(this);i?.call(this,n),this.requestUpdate(r,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??_s}static _$Ei(){if(this.hasOwnProperty(Fe("elementProperties")))return;let r=Pi(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(Fe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Fe("properties"))){let e=this.properties,t=[...Ti(e),...zi(e)];for(let s of t)this.createProperty(s,e[s])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let s of t)e.unshift(Ct(s))}else r!==void 0&&e.push(Ct(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ys(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),s=this.constructor._$Eu(r,t);if(s!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:Ue).toAttribute(e,t.type);this._$Em=r,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(r,e){let t=this.constructor,s=t._$Eh.get(r);if(s!==void 0&&this._$Em!==s){let i=t.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Ue;this._$Em=s;let a=n.fromAttribute(e,i.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(r,e,t,s=!1,i){if(r!==void 0){let n=this.constructor;if(s===!1&&(i=this[r]),t??=n.getPropertyOptions(r),!((t.hasChanged??ht)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(r)&&!this.hasAttribute(n._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:s,wrapped:i},n){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,n??e??this[r]),i!==!0||n!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),s===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,i]of t){let{wrapped:n}=i,a=this[s];n!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,i,a)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};le.elementStyles=[],le.shadowRootOptions={mode:"open"},le[Fe("elementProperties")]=new Map,le[Fe("finalized")]=new Map,Ri?.({ReactiveElement:le}),(ct.reactiveElementVersions??=[]).push("2.1.2");var Bt=globalThis,ws=c=>c,pt=Bt.trustedTypes,ks=pt?pt.createPolicy("lit-html",{createHTML:c=>c}):void 0,zs="$lit$",pe=`lit$${Math.random().toFixed(9).slice(2)}$`,Ps="?"+pe,Ci=`<${Ps}>`,ye=document,Ge=()=>ye.createComment(""),We=c=>c===null||typeof c!="object"&&typeof c!="function",Dt=Array.isArray,Li=c=>Dt(c)||typeof c?.[Symbol.iterator]=="function",Lt=`[ 	
\f\r]`,qe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xs=/-->/g,Ss=/>/g,ve=RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ms=/'/g,Es=/"/g,js=/^(?:script|style|textarea|title)$/i,Ft=c=>(r,...e)=>({_$litType$:c,strings:r,values:e}),o=Ft(1),M=Ft(2),In=Ft(3),de=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ts=new WeakMap,be=ye.createTreeWalker(ye,129);function Rs(c,r){if(!Dt(c)||!c.hasOwnProperty("raw"))throw Error("invalid template strings array");return ks!==void 0?ks.createHTML(r):r}var Ai=(c,r)=>{let e=c.length-1,t=[],s,i=r===2?"<svg>":r===3?"<math>":"",n=qe;for(let a=0;a<e;a++){let l=c[a],d,h,m=-1,v=0;for(;v<l.length&&(n.lastIndex=v,h=n.exec(l),h!==null);)v=n.lastIndex,n===qe?h[1]==="!--"?n=xs:h[1]!==void 0?n=Ss:h[2]!==void 0?(js.test(h[2])&&(s=RegExp("</"+h[2],"g")),n=ve):h[3]!==void 0&&(n=ve):n===ve?h[0]===">"?(n=s??qe,m=-1):h[1]===void 0?m=-2:(m=n.lastIndex-h[2].length,d=h[1],n=h[3]===void 0?ve:h[3]==='"'?Es:Ms):n===Es||n===Ms?n=ve:n===xs||n===Ss?n=qe:(n=ve,s=void 0);let b=n===ve&&c[a+1].startsWith("/>")?" ":"";i+=n===qe?l+Ci:m>=0?(t.push(d),l.slice(0,m)+zs+l.slice(m)+pe+b):l+pe+(m===-2?a:b)}return[Rs(c,i+(c[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},Ze=class c{constructor({strings:r,_$litType$:e},t){let s;this.parts=[];let i=0,n=0,a=r.length-1,l=this.parts,[d,h]=Ai(r,e);if(this.el=c.createElement(d,t),be.currentNode=this.el.content,e===2||e===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=be.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(zs)){let v=h[n++],b=s.getAttribute(m).split(pe),w=/([.?@])?(.*)/.exec(v);l.push({type:1,index:i,name:w[2],strings:b,ctor:w[1]==="."?Ht:w[1]==="?"?It:w[1]==="@"?Ot:Pe}),s.removeAttribute(m)}else m.startsWith(pe)&&(l.push({type:6,index:i}),s.removeAttribute(m));if(js.test(s.tagName)){let m=s.textContent.split(pe),v=m.length-1;if(v>0){s.textContent=pt?pt.emptyScript:"";for(let b=0;b<v;b++)s.append(m[b],Ge()),be.nextNode(),l.push({type:2,index:++i});s.append(m[v],Ge())}}}else if(s.nodeType===8)if(s.data===Ps)l.push({type:2,index:i});else{let m=-1;for(;(m=s.data.indexOf(pe,m+1))!==-1;)l.push({type:7,index:i}),m+=pe.length-1}i++}}static createElement(r,e){let t=ye.createElement("template");return t.innerHTML=r,t}};function ze(c,r,e=c,t){if(r===de)return r;let s=t!==void 0?e._$Co?.[t]:e._$Cl,i=We(r)?void 0:r._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(c),s._$AT(c,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(r=ze(c,s._$AS(c,r.values),s,t)),r}var At=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,s=(r?.creationScope??ye).importNode(e,!0);be.currentNode=s;let i=be.nextNode(),n=0,a=0,l=t[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new Ke(i,i.nextSibling,this,r):l.type===1?d=new l.ctor(i,l.name,l.strings,this,r):l.type===6&&(d=new Nt(i,this,r)),this._$AV.push(d),l=t[++a]}n!==l?.index&&(i=be.nextNode(),n++)}return be.currentNode=ye,s}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},Ke=class c{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=ze(this,r,e),We(r)?r===u||r==null||r===""?(this._$AH!==u&&this._$AR(),this._$AH=u):r!==this._$AH&&r!==de&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Li(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==u&&We(this._$AH)?this._$AA.nextSibling.data=r:this.T(ye.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,s=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=Ze.createElement(Rs(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new At(s,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(r){let e=Ts.get(r.strings);return e===void 0&&Ts.set(r.strings,e=new Ze(r)),e}k(r){Dt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let i of r)s===e.length?e.push(t=new c(this.O(Ge()),this.O(Ge()),this,this.options)):t=e[s],t._$AI(i),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=ws(r).nextSibling;ws(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},Pe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,s,i){this.type=1,this._$AH=u,this._$AN=void 0,this.element=r,this.name=e,this._$AM=s,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=u}_$AI(r,e=this,t,s){let i=this.strings,n=!1;if(i===void 0)r=ze(this,r,e,0),n=!We(r)||r!==this._$AH&&r!==de,n&&(this._$AH=r);else{let a=r,l,d;for(r=i[0],l=0;l<i.length-1;l++)d=ze(this,a[t+l],e,l),d===de&&(d=this._$AH[l]),n||=!We(d)||d!==this._$AH[l],d===u?r=u:r!==u&&(r+=(d??"")+i[l+1]),this._$AH[l]=d}n&&!s&&this.j(r)}j(r){r===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Ht=class extends Pe{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===u?void 0:r}},It=class extends Pe{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==u)}},Ot=class extends Pe{constructor(r,e,t,s,i){super(r,e,t,s,i),this.type=5}_$AI(r,e=this){if((r=ze(this,r,e,0)??u)===de)return;let t=this._$AH,s=r===u&&t!==u||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,i=r!==u&&(t===u||s);s&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Nt=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){ze(this,r)}};var Hi=Bt.litHtmlPolyfillSupport;Hi?.(Ze,Ke),(Bt.litHtmlVersions??=[]).push("3.3.3");var Cs=(c,r,e)=>{let t=e?.renderBefore??r,s=t._$litPart$;if(s===void 0){let i=e?.renderBefore??null;t._$litPart$=s=new Ke(r.insertBefore(Ge(),i),i,void 0,e??{})}return s._$AI(c),s};var Ut=globalThis,E=class extends le{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Cs(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return de}};E._$litElement$=!0,E.finalized=!0,Ut.litElementHydrateSupport?.({LitElement:E});var Ii=Ut.litElementPolyfillSupport;Ii?.({LitElement:E});(Ut.litElementVersions??=[]).push("4.2.2");var j=c=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(c,r)}):customElements.define(c,r)};var Oi={attribute:!0,type:String,converter:Ue,reflect:!1,hasChanged:ht},Ni=(c=Oi,r,e)=>{let{kind:t,metadata:s}=e,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),t==="setter"&&((c=Object.create(c)).wrapped=!0),i.set(e.name,c),t==="accessor"){let{name:n}=e;return{set(a){let l=r.get.call(this);r.set.call(this,a),this.requestUpdate(n,l,c,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,c,a),a}}}if(t==="setter"){let{name:n}=e;return function(a){let l=this[n];r.call(this,a),this.requestUpdate(n,l,c,!0,a)}}throw Error("Unsupported decorator location: "+t)};function g(c){return(r,e)=>typeof e=="object"?Ni(c,r,e):((t,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(s,i):void 0})(c,r,e)}function f(c){return g({...c,state:!0,attribute:!1})}var $e=(c,r,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(c,r,e),e);function ut(c,r){return(e,t,s)=>{let i=n=>n.renderRoot?.querySelector(c)??null;if(r){let{get:n,set:a}=typeof t=="object"?e:s??(()=>{let l=Symbol();return{get(){return this[l]},set(d){this[l]=d}}})();return $e(e,t,{get(){let l=n.call(this);return l===void 0&&(l=i(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return $e(e,t,{get(){return i(this)}})}}var mt="garden_manager",Ye=class{constructor(r){this.hass=r}setHass(r){this.hass=r}call(r,e={}){return this.hass.connection.sendMessagePromise({type:`${mt}/${r}`,...e})}subscribe(r){return this.hass.connection.subscribeMessage(r,{type:`${mt}/subscribe`})}plants(){return this.call("plants")}savePlant(r,e){return this.call("plants/save",{plant:r,mode:e})}deletePlant(r){return this.call("plants/delete",{plant_id:r})}plantWindows(r,e,t){return this.call("plants/windows",{plant_id:r,zone_id:e??null,season:t??null})}savePlan(r,e,t){return this.call("plan/save",{...r,base_revision:e,...t!=null?{season:t}:{}})}yearPreview(r){return this.call("year/preview",r!=null?{from_season:r}:{})}yearApply(r){return this.call("year/apply",r)}deleteLayout(r){return this.call("layout/delete",{season:r})}syslog(r={}){return this.call("syslog/list",r)}undo(r,e=!1){return this.call("syslog/undo",{entry_id:r,force:e})}checkBed(r,e){return this.call("plan/check",{bed:r,plantings:e})}succession(r,e,t,s){return this.call("plan/succession",{planting:r,count:e,interval_days:t,placement:s})}exportPlan(r,e=!1){return this.call("plan/export",{format:r,include_tasks:e})}importPlan(r,e){return this.call("plan/import",{content:r,mode:e})}addTask(r){return this.call("tasks/add",r)}taskAction(r,e,t={}){return this.call("tasks/action",{task_id:r,action:e,...t})}saveSettings(r){return this.call("settings/save",{settings:r})}autofill(r){return this.call("plan/autofill",r)}autofillApply(r,e,t){return this.call("plan/autofill/apply",{plantings:r,replace_beds:e,base_revision:t})}printPreview(r){return this.call("print/render",{options:r})}async printPdf(r){let e=new URLSearchParams;for(let[n,a]of Object.entries(r))a==null||a===""||e.set(n,Array.isArray(a)?a.join(","):String(a));let t=await this.hass.fetchWithAuth(`/api/${mt}/print?${e.toString()}`);if(!t.ok)throw new Error(`${t.status} ${await t.text()}`);let s=t.headers.get("Content-Disposition")??"",i=/filename="([^"]+)"/.exec(s)?.[1]??"hortulus.pdf";return{blob:await t.blob(),filename:i}}exportPdfToConfig(r){return this.hass.callService(mt,"export_pdf",r)}handbookIndex(r){return this.call("handbook/index",r?{lang:r}:{})}handbookChapter(r,e){return this.call("handbook/chapter",{chapter_id:r,...e?{lang:e}:{}})}handbookSearch(r,e){return this.call("handbook/search",{query:r,...e?{lang:e}:{}})}irrigationPlan(){return this.call("irrigation/plan")}irrigationRun(r,e){return this.call("irrigation/run",{...r?{bed_ids:r}:{},...e?{amount_mm:e}:{}})}irrigationStop(){return this.call("irrigation/stop")}advice(){return this.call("advice")}qaOptions(){return this.call("qa/options")}qaAsk(r,e,t){return this.call("qa/ask",{subject:r,problem:e,target:t})}supplies(){return this.call("supplies")}records(){return this.call("records/overview")}logHarvest(r){return this.call("records/harvest/add",r)}deleteRecord(r,e){return this.call("records/delete",{kind:r,record_id:e})}saveJournal(r){return this.call("records/journal/save",{entry:r})}saveSeed(r){return this.call("records/seeds/save",{packet:r})}saveSoilTest(r,e){return this.call("records/soil/save",{bed_id:r,test:e})}deleteSoilTest(r,e){return this.call("records/soil/delete",{bed_id:r,date:e})}async uploadPhoto(r){let e=new FormData;e.append("file",r);let t=await this.hass.fetchWithAuth("/api/image/upload",{method:"POST",body:e});if(!t.ok)throw new Error(`Upload failed (${t.status})`);return(await t.json()).id}},_e=(c,r="256x256")=>c.startsWith("http")||c.startsWith("/")?c:`/api/image/serve/${c}/${r}`;var qt=(c=32)=>M`
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
  </svg>`;var Gt={"app.name":"Hortulus","app.tagline":"Your vegetable garden, planned and cared for","nav.dashboard":"Today","nav.planner":"Planner","nav.library":"Plants","nav.calendar":"Calendar","nav.settings":"Settings","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.close":"Close","common.add":"Add","common.edit":"Edit","common.none":"None","common.loading":"Loading your garden\u2026","common.not_loaded":"Hortulus is not set up yet. Add the integration under Settings \u2192 Devices & services.","common.minutes":"{n} min","common.days":"{n} days","common.cm":"{n} cm","common.today":"Today","common.tomorrow":"Tomorrow","common.yesterday":"Yesterday","common.overdue":"Overdue","common.unknown":"Unknown","common.search":"Search","common.all":"All","common.season":"Season {year}","common.admin_only":"Only administrators can change the plan.","common.saved":"Saved","common.saving":"Saving\u2026","common.unsaved":"Unsaved changes","common.conflict":"Changed elsewhere - reloaded","common.error":"Something went wrong: {message}","dash.greeting_morning":"Good morning","dash.greeting_afternoon":"Good afternoon","dash.greeting_evening":"Good evening","dash.today_tasks":"Today's tasks","dash.no_tasks":"Nothing to do today. Enjoy the garden!","dash.show_all":"Show all {n} tasks in the calendar","dash.total_time":"About {minutes} min of work","dash.beds":"Beds","dash.weather":"Next 48 hours","dash.greenhouse":"Greenhouse","dash.coming_up":"Coming up","dash.gdd":"Growing degree days","dash.gdd_since":"since {date}","dash.frost_risk":"Frost risk","dash.min_temp":"Lowest {temp} \xB0C","dash.rain":"Rain {mm} mm","dash.inside":"Inside {temp} \xB0C","dash.limits":"Crops tolerate {min}\u2013{max} \xB0C","dash.no_sensor":"No sensor","dash.active_crops":"{n} crops in the ground","dash.forecast_missing":"No forecast - advice is less precise.","planner.season":"Season","planner.undo":"Undo","planner.redo":"Redo","planner.snap":"Snap to grid","planner.zoom_in":"Zoom in","planner.zoom_out":"Zoom out","planner.fit":"Fit to screen","planner.add_bed":"Add bed","planner.add_zone":"Add zone","planner.overlay_companions":"Companions","planner.overlay_moisture":"Moisture","planner.overlay_temperature":"Temperature","planner.view_date":"Show garden on","planner.palette":"Plants","planner.palette_hint":"Drag a plant onto a bed, or press Enter to add it to the selected bed.","planner.layout":"Layout","planner.layout.single":"Single","planner.layout.block":"Block","planner.layout.row":"Row","planner.inspector":"Details","planner.nothing_selected":"Select a bed or planting to see details. Press ? for keyboard shortcuts.","planner.method":"Method","planner.method.indoor_sow":"Sow indoors, plant out","planner.method.direct_sow":"Sow in place","planner.method.transplant":"Plant (bought plants / sets)","planner.status":"Status","planner.count":"{n} plants","planner.timeline":"Timeline","planner.succession":"Succession sowing","planner.succession_count":"Number of sowings","planner.succession_interval":"Every (days)","planner.succession_placement":"Placement","planner.succession.split":"Split the area in strips","planner.succession.stack":"Same spot, one after another","planner.succession_create":"Create sowings","planner.succession_dropped":"{n} sowings fell outside the sowing window and were skipped.","planner.duplicate":"Duplicate","planner.remove":"Remove","planner.bed_name":"Name","planner.zone":"Zone","planner.kind":"Type","planner.width":"Width (cm)","planner.length":"Length (cm)","planner.orientation":"Row direction (\xB0)","planner.soil":"Soil","planner.shade":"Shade (%)","planner.wind":"Wind","planner.score":"Companion score","planner.warnings":"Warnings","planner.no_warnings":"No conflicts - nice combination!","planner.out_of_bounds":"Partly outside the bed.","planner.placed":"{plant} placed in {bed}.","planner.moved":"{name} moved.","planner.removed":"{name} removed.","planner.no_bed_here":"Drop plants onto a bed.","planner.export_json":"Export JSON","planner.export_yaml":"Export YAML","planner.import":"Import plan","planner.import_mode":"Import mode","planner.import_merge":"Merge with current plan","planner.import_replace":"Replace current plan","planner.imported":"Imported: {beds} beds, {plantings} plantings.","planner.shortcuts":"Keyboard shortcuts","planner.legend":"Plant families","planner.new_bed":"New bed","planner.new_zone":"New zone","shortcut.move":"Move selection (Shift = 10\xD7)","shortcut.undo":"Undo","shortcut.redo":"Redo","shortcut.delete":"Remove selection","shortcut.duplicate":"Duplicate selection","shortcut.grid":"Toggle snap-to-grid","shortcut.companions":"Toggle companion overlay","shortcut.moisture":"Toggle moisture overlay","shortcut.zoom":"Zoom in / out","shortcut.escape":"Clear selection","shortcut.cycle":"Select next / previous item","shortcut.help":"Show this help","lib.title":"Plant library","lib.search":"Search by name, latin name or family","lib.family":"Family","lib.filter_greenhouse":"Greenhouse","lib.filter_quick":"Quick crops","lib.filter_custom":"My plants","lib.add_custom":"New plant","lib.customize":"Customize","lib.reset":"Reset to built-in","lib.spacing":"Spacing","lib.row_spacing":"Row spacing","lib.depth":"Sowing depth","lib.germination":"Germination","lib.maturity":"Days to maturity","lib.soil_temp":"Min. soil temperature","lib.frost":"Frost tolerance","lib.min_temp":"Minimum temperature","lib.greenhouse":"Greenhouse","lib.water":"Water","lib.nutrients":"Nutrients","lib.rotation":"Rotation","lib.rotation_years":"{n} years before the same family returns","lib.friends":"Good companions","lib.enemies":"Keep apart from","lib.pests":"Pests","lib.diseases":"Diseases","lib.care":"Care","lib.calendar":"Sowing calendar","lib.indoor_sow":"Sow indoors","lib.direct_sow":"Sow outdoors","lib.transplant":"Plant out","lib.harvest":"Harvest","lib.source.builtin":"Built-in","lib.source.custom":"Custom","lib.source.override":"Customized","lib.id":"Identifier","lib.name_en":"Name (English)","lib.name_nl":"Name (Dutch)","lib.scientific":"Scientific name","lib.variety":"Variety","lib.habit":"Growth habit","lib.windows_hint":"Weeks relative to the average last spring frost (negative = before).","lib.weeks":"weeks","lib.from":"from","lib.to":"to","lib.saved":"{plant} saved.","cal.month":"Month","cal.week":"Week","cal.list":"List","cal.prev":"Previous","cal.next":"Next","cal.show_done":"Show completed","cal.add_task":"New task","cal.all_beds":"All beds","task.complete":"Done","task.skip":"Skip","task.reopen":"Reopen","task.postpone":"Postpone","task.postpone_1":"+1 day","task.postpone_3":"+3 days","task.postpone_7":"+1 week","task.postpone_to":"Move to date","task.note":"Note","task.notes":"Notes","task.photos":"Photos","task.add_photo":"Add photo","task.priority":"Priority","task.duration":"Duration (min)","task.due":"Due","task.window":"Window {start} \u2013 {end}","task.repeat":"Repeats every {n} days","task.repeat_days":"Repeat every (days, optional)","task.title":"Title","task.type":"Type","task.bed":"Bed","task.description":"Description","task.shifted":"{n} dependent tasks moved along.","task.beyond_window":"Careful: the new date is after the ideal window.","task.completed":"Nice work! {title} done.","task.source.generated":"From your plan","task.source.sensor":"From sensors","task.source.weather":"From the forecast","task.source.user":"Added by you","settings.region":"Climate & region","settings.hemisphere":"Hemisphere","settings.hemisphere.north":"Northern","settings.hemisphere.south":"Southern","settings.mode":"Profile","settings.mode.preset":"Regional preset","settings.mode.usda":"USDA hardiness zone","settings.mode.custom":"Custom frost dates","settings.preset":"Region","settings.zone":"Hardiness zone","settings.last_frost":"Last spring frost (MM-DD)","settings.first_frost":"First autumn frost (MM-DD)","settings.frost_dates_now":"This season: last frost {last}, first frost {first}.","settings.weather":"Weather & outdoor sensors","settings.weather_entity":"Weather entity","settings.outdoor_temp":"Outdoor temperature","settings.rain":"Rain sensor","settings.zones":"Zones & microclimates","settings.beds":"Beds & sensors","settings.zone_type.outdoor":"Outdoor","settings.zone_type.greenhouse":"Greenhouse","settings.zone_type.cold_frame":"Cold frame","settings.heated":"Heated","settings.min_heating":"Heating keeps above (\xB0C)","settings.sensors":"Sensors","settings.sensor.soil_moisture":"Soil moisture","settings.sensor.soil_temperature":"Soil temperature","settings.sensor.air_temperature":"Air temperature","settings.sensor.air_humidity":"Air humidity","settings.sensor.light":"Light","settings.sensor.rain":"Rain","settings.irrigation":"Irrigation switch/valve","settings.flow":"Flow (L/min)","settings.vent":"Vent / window opener","settings.notifications":"Notifications","settings.persistent":"Persistent notifications","settings.notify_services":"Push notifications (comma separated notify services)","settings.tts":"Text-to-speech entity","settings.tts_players":"Speakers (comma separated)","settings.digest":"Daily digest at","settings.frost_alerts":"Frost alerts","settings.heat_alerts":"Heat alerts","settings.tts_frost":"Announce frost on speakers","settings.general":"General","settings.language":"Language","settings.language.auto":"Follow Home Assistant","settings.units":"Units","settings.units_metric":"Metric (cm, \xB0C, mm, L)","settings.snap":"Grid size (cm)","settings.radius":"Companion radius (cm)","settings.data":"Import & export","settings.saved":"Settings saved.","type.sow_indoor":"Sow indoors","type.sow_direct":"Sow outdoors","type.harden_off":"Harden off","type.transplant":"Plant out","type.thin":"Thin","type.stake":"Support","type.prune":"Prune","type.pinch":"Pinch","type.earth_up":"Earth up","type.feed":"Feed","type.water":"Water","type.weed":"Weed","type.pest_check":"Pest check","type.harvest":"Harvest","type.ventilate":"Ventilate","type.shade":"Shade","type.frost_protect":"Frost protection","type.custom":"Task","priority.low":"Low","priority.normal":"Normal","priority.high":"High","priority.urgent":"Urgent","status.planned":"Planned","status.sown_indoors":"Sown indoors","status.sown":"Sown","status.transplanted":"Planted out","status.harvesting":"Harvesting","status.finished":"Finished","status.failed":"Failed","risk.none":"none","risk.low":"low","risk.moderate":"moderate","risk.high":"high","risk.unknown":"unknown","moisture.dry":"Dry","moisture.slightly_dry":"Slightly dry","moisture.optimal":"Optimal","moisture.wet":"Wet","moisture.unknown":"No data","irrigation.none":"No water needed","irrigation.water":"Water {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Skip - rain expected","irrigation.check_manually":"Check by hand (~{mm} mm)","gh.none":"All good","gh.ventilate":"Ventilate","gh.shade":"Shade now","gh.close_up":"Close before night","gh.heat":"Turn on heating","level.low":"Low","level.medium":"Medium","level.high":"High","suit.yes":"Suitable","suit.no":"Not suitable","suit.conditional":"Possible","frost.tender":"Tender","frost.half_hardy":"Half hardy","frost.hardy":"Hardy","frost.very_hardy":"Very hardy","kind.in_ground":"In-ground bed","kind.raised":"Raised bed","kind.container":"Container","soil.sandy":"Sandy","soil.loam":"Loam","soil.clay":"Clay","soil.silt":"Silt","soil.peat":"Peat","soil.chalk":"Chalk","soil.potting_mix":"Potting mix","wind.sheltered":"Sheltered","wind.moderate":"Moderate","wind.exposed":"Exposed","habit.bush":"Bush","habit.vine":"Vine","habit.climbing":"Climbing","habit.upright":"Upright","habit.rosette":"Rosette","habit.root":"Root crop","habit.bulb":"Bulb","reason.soil_too_cold":"Soil is {soil} \xB0C; {plant} needs {min} \xB0C to germinate.","reason.soil_too_hot":"Soil is {soil} \xB0C; above {max} \xB0C {plant} germinates poorly.","reason.frost_forecast":"Frost ({temp} \xB0C) forecast before {date}; {plant} is frost tender.","reason.window_open":"Window is open.","reason.window_not_yet":"Window opens {date}.","reason.window_closed":"Window closed on {date}.","reason.not_greenhouse_suitable":"{plant} is not suited to a greenhouse.","compat.friend":"{a} and {b} are good companions: {reason}","compat.enemy":"{a} and {b} should not be planted together: {reason}","compat.overlap":"{a} and {b} overlap - not enough space.","compat.rotation":"{family} grew in {bed} in {season}; wait {years} years.","compat.same_family_adjacent":"{a} and {b} share a family and its pests.","alert.frost":"Frost risk {level}: {temp} \xB0C expected {when}","alert.heat":"Heat stress in {zone}: {temp} \xB0C expected","alert.dry":"{bed} is dry ({moisture}%)","alert.sensor_stale":"Sensor {entity} has not reported for a while","alert.forecast_unavailable":"Weather forecast unavailable","when.tonight":"tonight","when.tomorrow_night":"tomorrow night","nav.handbook":"Handbook","nav.print":"Print","type.soil_prep":"Prepare soil","type.compost":"Compost","type.green_manure":"Green manure","type.mulch":"Mulch","type.clean_greenhouse":"Clean greenhouse","type.winter_prep":"Winter preparation","type.plan_season":"Plan season","type.tool_care":"Tool care","type.soil_test":"Soil test","type.cut_back":"Cut back","type.divide":"Divide","type.protect":"Protect","type.clean":"Clean up","type.tie_in":"Tie in","type.thin_fruit":"Thin fruit","type.pollinate":"Pollinate","type.check":"Check","type.make_feed":"Make plant feed","category.vegetable":"Vegetables","category.herb":"Herbs","category.fruit":"Fruit","category.flower":"Flowers","feature.path":"Gravel path","feature.compost":"Compost heap / bin","feature.water_butt":"Water butt","feature.shed":"Shed","feature.tree":"Tree","feature.hedge":"Hedge","feature.trellis":"Trellis","feature.other":"Other","stage.not_planted":"Not planted","stage.establishing":"Establishing","stage.vegetative":"Growing","stage.flowering":"Flowering","stage.ripening":"Ripening","stage.harvest":"Harvest","stage.finished":"Finished","compat.deters":"{a} protects {b}: it deters {pests}.","compat.trap":"{a} lures {pests} away from {b} (trap crop).","compat.allelopathy":"{a} releases growth-inhibiting compounds - keep it away from {b}.","compat.competition":"{a} and {b} are both heavy feeders this close together - add extra compost or give more space.","compat.shading":"{a} (about {height} cm tall) will shade {b} - plant tall crops on the side away from the sun.","compat.shade_benefit":"{a} gives {b} welcome summer shade.","alert.disease":"Disease risk {level} in {zone}","alert.nutrients":"Nutrient balance in {bed}: {status}","autoplan.bed_not_empty":"{bed} already has crops this season - tick 'replace' to re-plan it.","autoplan.no_beds":"No empty beds to fill. Select beds and tick 'replace'.","autoplan.compost_short":"Needs about {need} kg compost, you have {have} kg.","autoplan.time_over":"About {need} min per week of work - more than the {have} min you have.","autoplan.wanted_missing":"No room for: {plants}.","autoplan.consider_irrigation":"About {liters} L of water in a dry summer week - drip irrigation or a water butt will save you time.","autofill.title":"Autofill","autofill.intro":"Proposes crops, amounts and positions for season {season} from your beds and resources. Nothing is changed until you apply it.","autofill.household":"People in the household","autofill.hours":"Hours per week","autofill.water":"Water per week (L)","autofill.compost":"Compost available (kg)","autofill.has_irrigation":"Drip irrigation / automatic watering available","autofill.goals":"Goals","autofill.wanted":"Must have","autofill.excluded":"Never","autofill.beds":"Beds","autofill.all_empty":"(all empty beds)","autofill.replace":"Replace this season's crops in the selected beds","autofill.propose":"Make a proposal","autofill.apply":"Apply to plan","autofill.applied":"{n} plantings added to the plan","autofill.skipped":"Not placed","autofill.sum_crops":"{n} crops","autofill.sum_yield":"\u2248 {kg} kg harvest","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in a peak week","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Fresh vegetables","autofill.goal.storage":"Storage crops","autofill.goal.herbs":"Herbs","autofill.goal.pollinators":"Pollinators","autofill.goal.winter":"Winter harvest","autofill.goal.perennials":"Perennials","autofill.goal.easy":"Low maintenance","autofill.reason.no_suitable_bed":"no suitable bed","autofill.reason.no_space":"no space","autofill.reason.time_budget":"time budget","autofill.reason.water_budget":"water budget","cal.timeline":"Timeline","cal.garden_work":"Garden work","cal.growing":"Growing","cal.harvest_estimate":"Harvest expected around {date}","cal.harvest_estimate_short":"Expected harvest (degree days)","cal.last_frost":"Last frost","cal.first_frost":"First frost","cal.frost_dates":"Frost dates","cal.no_plantings":"No crops planned this season.","ctx.title":"Right now","ctx.moisture":"Soil moisture","ctx.soil_temp":"Soil temperature","ctx.irrigation":"Watering","ctx.water_balance":"Water deficit","ctx.nutrients":"Nutrient balance","ctx.air_temp":"Air temperature","ctx.humidity":"Humidity","ctx.disease":"Disease risk","ctx.frost":"Frost risk","ctx.today":"Today","ctx.rain":"Rain today","ctx.et0":"Evaporation (ET\u2080)","dash.gdd_today":"Degree days today","dash.water_climate":"Water & climate","dash.irrigation_mode":"Irrigation","dash.watering_now":"Watering {bed}","dash.stop":"Stop","dash.beds_need_water":"Beds needing water","dash.water_now":"Water now","dash.safety_note":"Frost lockout, rain skip and max runtime always apply.","dash.disease_risk":"Disease risk","dash.nutrients":"Nutrients","dash.water_balance":"Water deficit","dash.irrigation_started":"Watering started ({min} min)","dash.irrigation_stopped":"Watering stopped","dash.irrigation_nothing":"Nothing to water right now","handbook.title":"Gardening handbook","handbook.intro":"Background to everything Hortulus advises: soil, sowing, watering, feeding, rotation, the greenhouse and the garden year.","handbook.contents":"Contents","handbook.overview":"Overview","handbook.glossary":"Glossary","handbook.search":"Search the handbook","handbook.results":"Results for \u201C{query}\u201D","handbook.no_results":"Nothing found.","handbook.read_more":"Read more in the handbook","lib.category":"Category","lib.count":"{n} plants","lib.perennial":"perennial","lib.height":"Height","lib.roots":"roots","lib.gdd":"Degree days to harvest","lib.base":"base","lib.per_person":"Plants per person \xB7 yield","lib.deters":"Deters","lib.trap_for":"Trap crop for","lib.allelopathic":"Inhibits neighbours","lib.shade_tolerant":"Tolerates shade","lib.plant":"Plant","planner.layer_zones":"Show zones","planner.layer_features":"Show paths & elements","planner.layer_plantings":"Show crops","planner.add_feature":"Element","planner.align.left":"Align left","planner.align.right":"Align right","planner.align.top":"Align top","planner.align.bottom":"Align bottom","planner.align.hcenter":"Centre horizontally","planner.align.vcenter":"Centre vertically","planner.align.hdistribute":"Distribute horizontally","planner.align.vdistribute":"Distribute vertically","planner.aligned":"{n} items aligned","planner.moved_n":"{n} items moved","planner.removed_n":"{n} items removed","planner.selected_n":"{n} selected","planner.multi_hint":"Shift- or Ctrl-click to select several beds or crops, then drag, align or distribute them.","planner.alternatives":"Fits in","planner.better_neighbours":"Better neighbours","planner.heat_stress":"{n} hot days ahead","print.options":"Print options","print.document":"Document","print.page":"Paper","print.orientation":"Orientation","print.portrait":"Portrait","print.landscape":"Landscape","print.colors":"Colours","print.beds":"Beds","print.days":"Days ahead","print.title":"Title","print.notes":"Notes area (dot grid)","print.grid":"10 cm grid on bed sheets","print.labels":"Crop names on the map","print.download":"Download PDF","print.refresh":"Refresh preview","print.save_config":"Save to /config/hortulus/exports","print.saved_to_config":"PDF saved (/config/hortulus/exports)","print.preview":"Preview","print.empty":"No preview yet.","print.page_n":"Page {n} of {total}","print.all_greenhouses":"All greenhouses","print.all_zones":"All zones","print.remarkable_hint":"reMarkable Paper Pro: 179.6 \xD7 239.5 mm, extra margin on the left for the toolbar. E-ink colours use light tints and patterns so your pen stays visible. Send the PDF with the reMarkable app or email.","print.doc.garden":"Garden map","print.doc.garden.hint":"Zones, beds, crops, legend","print.doc.zone":"Greenhouse / zone","print.doc.zone.hint":"One zone, zoomed in","print.doc.beds":"Bed sheets","print.doc.beds.hint":"A page per bed with grid","print.doc.tasks":"Checklist","print.doc.tasks.hint":"Open tasks per week","print.doc.season":"Season chart","print.doc.season.hint":"Sow \u2192 harvest timeline","print.doc.blank":"Planning sheet","print.doc.blank.hint":"Outlines to sketch on","print.doc.plants":"Plant cards","print.doc.plants.hint":"Key facts per crop","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Full colour","print.color.eink":"E-ink (light + patterns)","print.color.grayscale":"Grayscale","settings.irrigation_hw":"Irrigation hardware","settings.irrigation_mode":"Mode","settings.irrigation_mode.off":"Off","settings.irrigation_mode.advise":"Advise (tasks only)","settings.irrigation_mode.auto":"Automatic","settings.pump":"Pump (switch)","settings.start_time":"Start time","settings.max_runtime":"Max runtime per valve (min)","settings.frost_lockout":"Frost lockout below (\xB0C)","settings.rain_skip":"Skip when rain forecast \u2265 (mm)","settings.pump_lead":"Pump stop before valve (s)","settings.irrigation_hint":"{n} beds have a valve. Set the flow (L/min) per bed under Beds.","settings.resources":"Resources (autofill)","settings.maintenance_tasks":"Seasonal garden tasks in the calendar (soil prep, greenhouse cleaning, winter rest ...)","settings.open_meteo":"Use Open-Meteo for humidity, wind and sunshine","settings.open_meteo_hint":"Optional and off by default: sends the garden's rounded coordinates to api.open-meteo.com. Improves the evaporation (Penman-Monteith) estimate.","settings.elevation":"Elevation (m)","settings.shade_entity":"Shade screen (cover or switch)","settings.climate_control":"Vent & shade control","settings.climate_control.off":"Off","settings.climate_control.advise":"Advise (tasks)","settings.climate_control.auto":"Automatic","settings.wall_heat":"Against a warm wall","settings.thermal_mass":"Thermal mass (water barrels, stone)","settings.sensor.par":"Light (PAR)","settings.sensor.leaf_wetness":"Leaf wetness","settings.sensor.ec":"Soil EC","settings.sensor.npk_n":"Nitrogen (N)","settings.sensor.npk_p":"Phosphorus (P)","settings.sensor.npk_k":"Potassium (K)","task.postponed":"{title} postponed by {n} day(s)","common.done":"Done","planner.removed_from":"{name} removed from season {season} on (history kept).","planner.steps":"Build your garden plan in three steps","planner.step.site":"Draw your site","planner.step.site.hint":"zones & elements","planner.step.zones":"Arrange zones","planner.step.zones.hint":"name, beds, own map","planner.step.plant":"Plant","planner.step.plant.hint":"by hand or by the system","planner.whole_garden":"Whole garden","planner.zone_map":"Zone map","planner.site_intro":"Pick a zone type or element, then drag a rectangle on the grid (squares of 10 \xD7 10 cm). A single click places a standard size. Double-click a zone to open its own map.","planner.zones":"Zones","planner.elements":"Paths, lawn, trees & more","planner.your_zones":"Your zones","planner.no_zones":"No zones yet - start with your vegetable garden, greenhouse or orchard.","planner.open_zone":"Open zone map","planner.next":"Next","planner.zones_intro":"Open a zone to give it a name and draw its beds on its own map. This plan holds for this season only; you carry it into next year with the year-end transition.","planner.n_beds":"{n} beds","planner.zone_name":"Zone name","planner.beds_in_zone":"Beds & elements in this zone","planner.draw_bed":"Bed","planner.fill_by_hand":"Fill in myself","planner.fill_by_system":"Let the system fill it","planner.bed_needs_zone":"Draw a bed inside a zone.","planner.draw_hint":"Drag on the grid to draw: {what}","planner.palette_for_zone":"Showing plants that suit {zone}. Pick a category to see everything.","planner.perennial":"perennial","planner.bears_after":"fruit after ~{n} yr","planner.perennial_since":"Perennial - in the ground since {season} and carried over every year until you remove it.","planner.bearing_from":"First harvest expected from {season}.","planner.eco_tips":"Eco tips & home remedies","planner.remove_perennial":"Remove {name}?","planner.remove_perennial_intro":"{name} was planted in {season} and stays in your plan every year. What happened?","planner.remove_from_season":"It is gone from {season} on","planner.remove_from_season_hint":"Earlier years keep it (rotation history, harvests, notes).","planner.remove_everywhere":"Delete it completely","planner.remove_everywhere_hint":"As if it was never planted - also removed from earlier years.","planner.legend.perennial":"perennial (stays)","planner.legend.warning":"neighbour / rotation warning","planner.legend.succession":"succession sowing","planner.legend.rows":"rows of seedlings","planner.legend.border":"Border colour = plant family (for crop rotation); the icon shows the crop itself.","settings.zone_type.orchard":"Orchard","settings.zone_type.fruit":"Soft fruit","settings.zone_type.herbs":"Herb garden","settings.zone_type.flowers":"Flower garden","zone_hint.outdoor":"Vegetable garden: annual crops with rotation, beds and paths.","zone_hint.greenhouse":"Greenhouse: warm crops, climate control, ventilation and shading.","zone_hint.cold_frame":"Cold frame: hardening off, early and late salads.","zone_hint.orchard":"Orchard: fruit trees that stay for decades - prune, thin and harvest yearly.","zone_hint.fruit":"Soft fruit: berries, currants, grapes and kiwi berries.","zone_hint.herbs":"Herb garden: perennial and annual herbs, a bee magnet.","zone_hint.flowers":"Flower garden: pollinators, beneficial insects and cut flowers.","feature.terrace":"Terrace","feature.lawn":"Lawn","feature.flowerbed":"Flower bed","feature.fence":"Fence","feature.pond":"Pond","pollination.insects":"Needs insects for pollination - add flowers nearby.","pollination.wind":"Wind-pollinated - plant in blocks, not single rows.","pollination.partner":"Needs a pollination partner (second variety) nearby.","pollination.none":"No pollination needed (leaves, roots).","planner.more":"More","settings.reminders":"Reminders","settings.overdue_reminders":"Remind me of tasks left undone","settings.overdue_time":"Reminder time","settings.overdue_after":"Remind after (days late)","settings.weekly_plan":"Weekly look-ahead","settings.weekly_day":"Day","settings.weekly_time":"Time","settings.weather_aware":"Weather-aware scheduling","settings.weather_aware_hint":"Sowing, planting out, spraying, pruning and mulching move automatically to the best dry, frost-free, not-too-hot day inside their window.","feature.house":"House","feature.driveway":"Driveway","feature.street":"Street","feature.parking":"Parking","feature.play":"Play area","feature.beehive":"Beehive","autofill.prefs":"Preferences","autofill.freedom":"Freedom of choice","autofill.freedom.strict":"Only what I want","autofill.freedom.balanced":"My wishes + goals","autofill.freedom.free":"Free: surprise me","autofill.pref.respect_companions":"Respect plant neighbours","autofill.pref.add_pollinators":"Add flowers for pollinators","autofill.pref.year_round":"Aim for harvests all year","autofill.pref.allow_perennials":"Perennials allowed","autofill.pref.match_zone_type":"Respect zone type (orchard = fruit \u2026)","autofill.reason.pollinators":"pollinators","nav.advice":"Advice","task.tools":"You need","advice.ask_title":"Ask Hortulus","advice.i_have":"I have a","advice.mode.question":"question","advice.mode.problem":"problem","advice.about":"about","advice.subject":"Subject","advice.target":"Which one","advice.problem":"Question","advice.ask":"Ask","advice.in_garden":"In your garden","advice.all_plants":"All plants","advice.whole_garden":"the whole garden","advice.subject.plant":"a plant / vegetable / fruit","advice.subject.greenhouse":"my greenhouse","advice.subject.garden":"my garden","advice.subject.bed":"a bed","advice.subject.tools":"tools & supplies","advice.q.status":"How is it doing?","advice.q.what_to_do":"What should I do now?","advice.q.when_sow":"When to sow or plant?","advice.q.when_harvest":"When to harvest?","advice.q.growth":"it grows badly","advice.q.yellow_leaves":"yellow leaves","advice.q.wilting":"it wilts / droops","advice.q.no_fruit":"flowers but no fruit","advice.q.bolting":"it bolts (runs to seed)","advice.q.pests":"pests / bugs on it","advice.q.disease":"spots, mould or rot","advice.q.feeding":"How to feed it?","advice.q.watering":"How much water?","advice.q.pruning":"How to prune?","advice.q.companions":"What grows well next to it?","advice.q.too_hot":"it is too hot","advice.q.too_cold":"it is too cold","advice.q.winter_crops":"What can grow in winter?","advice.q.year_round":"How do I harvest all year?","advice.q.soil":"my soil is poor","advice.q.slugs":"slugs!","advice.q.frost":"frost is coming","advice.q.what_next":"What should go in next?","advice.q.for_task":"Which tools for this job?","advice.q.shopping":"What do I need to buy?","advice.sec.status":"Now in your garden","advice.sec.facts":"Good to know","advice.sec.causes":"Possible causes","advice.sec.actions":"What to do","advice.sec.remedies":"Eco & home remedies","advice.sec.prevention":"Prevent it next time","advice.sec.tasks":"Open tasks","advice.read_more":"Read more in the handbook","advice.suggestions":"Suggestions for your garden","advice.suggestions_intro":"Hortulus looks at placement, pollination, neighbours, year-round harvest, soil and ecology.","advice.none":"No suggestions - your plan looks great!","advice.apply_add":"Add to plan","advice.apply_open":"Show in planner","advice.dismiss":"Hide","advice.no_space":"No free space in {bed}.","advice.kind.pollination":"Pollination","advice.kind.neighbours":"Neighbours","advice.kind.placement":"Placement","advice.kind.year_round":"Year-round","advice.kind.soil":"Soil","advice.kind.eco":"Ecology","advice.kind.growth":"Growth","advice.kind.greenhouse":"Greenhouse","advice.coverage":"Harvest per month","advice.coverage_gaps":"Red months have nothing to harvest - the suggestions show what fills them.","advice.coverage_full":"Something to harvest every month.","advice.nothing":"nothing","advice.shopping":"Shopping list this season","advice.shopping_intro":"Worked out from your plan: seed, plants, compost, protection and support.","advice.nothing_to_buy":"Nothing to buy yet - plan some crops first.","advice.tools_per_task":"Tools per job","advice.read_tools":"Tools & DIY feeds","advice.cat.seeds":"Seed","advice.cat.plants":"Young plants","advice.cat.soil":"Soil & feeding","advice.cat.protection":"Protection","advice.cat.support":"Support & mulch","advice.cat.other":"Other","print.doc.year":"Year plan","print.doc.year.hint":"Month matrix: sow, plant, harvest","nav.journal":"Journal","task.assignee":"Assigned to","task.anyone":"anyone","task.harvested":"Harvested:","journal.diary":"Diary","journal.harvest":"Harvest","journal.seeds":"Seed box","journal.water":"Water","journal.new":"New diary entry","journal.text":"What did you see or do?","journal.placeholder":"First tomatoes ripening, aphids on the broad beans \u2026","journal.kind":"Kind","journal.kind.note":"Note","journal.kind.observation":"Observation","journal.kind.problem":"Problem","journal.kind.milestone":"Milestone","journal.link":"About","journal.whole_garden":"the whole garden","journal.beds":"Beds","journal.crops":"Crops this season","journal.add_photo":"Add photo","journal.save":"Save","journal.saved":"Saved in the diary.","journal.filter":"Filter","journal.all":"Everything","journal.empty":"No entries yet - note what you see: it is the best garden teacher.","journal.log_harvest":"Log a harvest","journal.what":"Crop","journal.kg":"Weight (kg)","journal.count":"Count","journal.day":"Date","journal.quality":"Quality","journal.learn_hint":"Hortulus learns your own yields per m\xB2 from this and uses them in Autofill and advice.","journal.harvest_saved":"Harvest saved.","journal.harvest_season":"Harvest {season}","journal.crops_n":"{n} crops","journal.yield":"your yield {kg} kg/m\xB2 (database {db})","journal.recent":"Latest entries","journal.no_harvest":"Nothing logged yet.","journal.add_seed":"Add seed packet","journal.variety":"Variety","journal.year":"Year","journal.quantity":"Quantity","journal.unit":"Unit","journal.unit.packet":"packet(s)","journal.unit.seeds":"seeds","journal.unit.g":"g","journal.source":"Source","journal.source_hint":"shop, swap, own seed \u2026","journal.seed_saved":"Seed packet saved.","journal.seed_missing":"Still needed for this season","journal.seed_hint":"Seed keeps 1-2 years (parsnip, onion) up to 5-6 years (cabbages, cucurbits). Old seed: do a germination test.","journal.seed_box":"Seed box","journal.status":"Status","journal.needed":"needed this season","journal.seed.ok":"good","journal.seed.use_soon":"use this year","journal.seed.expired":"old (test it)","journal.seed.empty":"empty","journal.seed.unknown":"year unknown","journal.no_seeds":"No seed packets yet.","journal.water_setup":"Link a water meter and/or a water-butt level sensor in Settings \u203A Water to follow your garden water.","journal.water_week":"Mains water, 7 days","journal.water_season":"Mains water this year","journal.rain_available":"Rain water available","journal.per_day":"Per day (last 14 days)","journal.water_hint":"Watering tasks mention how much rain water is left so you use it first.","cal.year":"Year","cal.tasks_per_month":"Tasks","cal.act.sow_indoor":"sow indoors","cal.act.sow":"sow","cal.act.plant":"plant out","cal.act.grow":"growing","cal.act.harvest":"harvest","cal.act_short.sow_indoor":"S","cal.act_short.sow":"S","cal.act_short.plant":"P","cal.act_short.harvest":"H","settings.water":"Water meter & rain butt","settings.water_meter":"Garden water meter (m\xB3 or L)","settings.butt_level":"Rain butt level (%)","settings.butt_capacity":"Total butt capacity (L)","settings.water_hint":"Hortulus stores one reading per day. You get water use per week, the rain water still available, and watering tasks say how much of it you can use first.","settings.household":"Household & voice","settings.nobody":"Nobody (unassigned)","settings.default_person":"Use the default","settings.no_persons":"No people found. Add people under Settings \u2192 People to assign tasks.","settings.assign_default":"New tasks go to","settings.assign_per_type":"Per task type","settings.person_notify":"Personal reminders","settings.person_notify_hint":"Each person gets their own tasks on this notify service (daily digest and overdue reminders).","settings.voice":"Voice (Assist)","settings.voice_hint":"Ask Assist \u201Cwhat do I need to do in the garden today?\u201D, \u201Chow much did I harvest?\u201D, \u201Cis there frost tonight?\u201D. Install the sentences once, then they work in English and Dutch.","settings.voice_install":"Install voice sentences","settings.voice_installed":"Voice sentences installed","soil_test.title":"Soil analysis","soil_test.none":"No soil analysis yet.","soil_test.add":"Add soil analysis","soil_test.om":"Organic matter (%)","soil_test.lime":"Lime status","soil_test.lime.low":"too low","soil_test.lime.ok":"fine","soil_test.lime.high":"high","soil_test.hint":"Lab report or home kit. Hortulus adjusts the fertiliser plan and lime advice of this bed to the latest analysis.","cal.hours":"{n} h","planner.other_season":"{name} (season {year})","journal.system":"System log","syslog.intro":"Every change in Hortulus is listed here: what you or someone else did in the panel, through automations, and what Hortulus adjusted itself (tasks, clean-up). Undo an entry to restore the state from before that action; the undo is logged as well, so it can be reverted too.","syslog.show_system":"Show automatic actions by Hortulus","syslog.empty":"Nothing logged yet.","syslog.by_system":"Hortulus (automatic)","syslog.by_unknown":"Automation or service","syslog.is_undone":"undone","syslog.undo":"Undo","syslog.undone":"Undone.","syslog.confirm":"Undo: {what}?","syslog.conflict":"{n} item(s) changed again since. Undo anyway? Those later changes will be lost.","syslog.blocked":"Cannot undo: this would refer to a bed, zone or plant that has been deleted since. Undo that later deletion first.","syslog.more":"Load older entries","syslog.and_more":"\u2026 and {n} more","syslog.n_changes":"{verb} \u2013 {n} items","syslog.op.add":"Added","syslog.op.remove":"Removed","syslog.op.change":"Changed","syslog.op.mixed":"Updated","syslog.reason.plan":"planner","syslog.reason.import":"import","syslog.reason.tasks":"tasks","syslog.reason.settings":"settings","syslog.reason.plants":"plant library","syslog.reason.records":"journal","syslog.reason.auto":"automatic","syslog.reason.undo":"Undo","syslog.col.zones":"Zone","syslog.col.beds":"Bed","syslog.col.plantings":"Crop","syslog.col.tasks":"Task","syslog.col.custom_plants":"Custom plant","syslog.col.features":"Garden feature","syslog.col.harvest_log":"Harvest","syslog.col.journal":"Diary note","syslog.col.seed_stock":"Seed stock","syslog.col.rotation_history":"Crop history","syslog.col.irrigation_log":"Irrigation","syslog.col.plant_overrides":"Plant data","syslog.col.settings":"Setting","planner.draw_site":"Site & elements","planner.draw_planter":"Planter / pot","planner.draw_planter_hint":"Draw a planter, pot or window box - you can plant it like a bed afterwards.","planner.new_planter":"Planter","planner.elements_in_zone":"Paths, terrace, lawn, hedge \u2026 in this zone","planner.elements.buildings":"Buildings & paving","planner.elements.paths":"Paths","planner.elements.green":"Green","planner.elements.outdoor_living":"Outdoor living & equipment","feature.stone_path":"Stone path","feature.wood_path":"Wooden path","feature.stepping_stones":"Stepping stones","feature.bark_path":"Bark path","feature.decking":"Decking","feature.wall":"Wall","feature.carport":"Carport / garage","feature.shrub":"Shrub","feature.pool":"Swimming pool","feature.seating":"Seating area","settings.zone_type.garden":"Ornamental garden","settings.zone_type.containers":"Planters & pots","zone_hint.garden":"Ornamental garden: shrubs, borders and perennials around lawn and terrace.","zone_hint.containers":"Planters & pots: on a terrace, balcony or window sill - draw every planter or pot and plant it.","settings.display":"Display (this browser)","settings.photos":"Show plant photos (Wikipedia)","settings.photos_hint":"On top of the illustration Hortulus shows a photo from Wikipedia, looked up by scientific name. Your browser fetches it directly from Wikipedia (with credit); offline or when switched off you see the illustration.","nav.layout":"Garden plan","advice.apply_transition":"Open year-end transition","layout.current":"current","layout.no_plan":"no garden plan","layout.edit":"Edit garden plan","layout.to_planner":"To the planner","layout.make":"Make the {season} garden plan","layout.planting_on":"on the {season} garden plan - zones, beds and elements are edited in Garden plan","layout.started":"Garden plan {season} started.","layout.none_title":"No garden plan for {season} yet","layout.none_intro":"A garden plan fixes the shape of your garden for one year: zones (open ground, greenhouse, pots \u2026), beds and elements such as driveway, house, hedge, lawn, shed or water butt - without plants. Start from another year or empty.","layout.none_plant":"You plant a year on its own garden plan, and {season} has none yet. Make it in Garden plan, or move {live} over with the year-end transition.","layout.none_hint":"Nothing moves into a new year by itself: the garden plan and what carries on (perennials, overwintering crops) are moved over explicitly at the end of the year.","layout.copy_from":"Copy the {season} garden plan","layout.start_empty":"Start empty","year.button":"Year-end transition","year.title_short":"Year-end transition","year.title":"Year-end transition {from} \u2192 {to}","year.intro":"Nothing moves into {to} by itself. Choose which part of the garden plan and which crops go along; the rest stays in {from}. Everything is logged in the system log and can be undone.","year.plan":"Garden plan","year.keep":"Use the garden plan you already made for {to}","year.copy":"Copy the {from} garden plan (choose below what goes along)","year.copy_hint":"The {to} garden plan becomes a copy of {from}. Untick what does not go along.","year.elements":"Elements (driveway, house, hedge, paths \u2026)","year.perennials":"Perennials, trees and shrubs","year.overwinter":"Overwintering crops (still growing after the year ends)","year.none":"None.","year.bed_gone":"bed not in the new garden plan","year.not_chosen":"What you leave unticked stays in the old year and gets no tasks in {to}.","year.activate":"Make {to} the active garden year now","year.activate_hint":"The {from} garden plan is archived and {to} becomes your garden: tasks, sensors and irrigation follow the new plan.","year.prepare_hint":"Prepare only: the {to} garden plan is set up, {from} stays your active garden.","year.apply":"Move over to {to}","year.done":"Your garden is now in {season} - {n} crop(s) moved over.","year.prepared":"Garden plan {season} prepared - {n} crop(s) moved over.","year.skipped":"{n} crop(s) not moved: their bed is not in the new garden plan."};var Ls={"app.name":"Hortulus","app.tagline":"Je moestuin, gepland en verzorgd","nav.dashboard":"Vandaag","nav.planner":"Planner","nav.library":"Planten","nav.calendar":"Kalender","nav.settings":"Instellingen","common.save":"Opslaan","common.cancel":"Annuleren","common.delete":"Verwijderen","common.close":"Sluiten","common.add":"Toevoegen","common.edit":"Bewerken","common.none":"Geen","common.loading":"Je tuin wordt geladen\u2026","common.not_loaded":"Hortulus is nog niet ingesteld. Voeg de integratie toe via Instellingen \u2192 Apparaten & diensten.","common.minutes":"{n} min","common.days":"{n} dagen","common.cm":"{n} cm","common.today":"Vandaag","common.tomorrow":"Morgen","common.yesterday":"Gisteren","common.overdue":"Te laat","common.unknown":"Onbekend","common.search":"Zoeken","common.all":"Alle","common.season":"Seizoen {year}","common.admin_only":"Alleen beheerders kunnen het plan wijzigen.","common.saved":"Opgeslagen","common.saving":"Opslaan\u2026","common.unsaved":"Niet-opgeslagen wijzigingen","common.conflict":"Elders gewijzigd - opnieuw geladen","common.error":"Er ging iets mis: {message}","dash.greeting_morning":"Goedemorgen","dash.greeting_afternoon":"Goedemiddag","dash.greeting_evening":"Goedenavond","dash.today_tasks":"Taken voor vandaag","dash.no_tasks":"Niets te doen vandaag. Geniet van de tuin!","dash.show_all":"Alle {n} taken tonen in de kalender","dash.total_time":"Ongeveer {minutes} min werk","dash.beds":"Bedden","dash.weather":"Komende 48 uur","dash.greenhouse":"Kas","dash.coming_up":"Binnenkort","dash.gdd":"Graaddagen","dash.gdd_since":"sinds {date}","dash.frost_risk":"Vorstrisico","dash.min_temp":"Laagste {temp} \xB0C","dash.rain":"Regen {mm} mm","dash.inside":"Binnen {temp} \xB0C","dash.limits":"Gewassen verdragen {min}\u2013{max} \xB0C","dash.no_sensor":"Geen sensor","dash.active_crops":"{n} gewassen in de grond","dash.forecast_missing":"Geen weersverwachting - advies is minder nauwkeurig.","planner.season":"Seizoen","planner.undo":"Ongedaan maken","planner.redo":"Opnieuw","planner.snap":"Uitlijnen op raster","planner.zoom_in":"Inzoomen","planner.zoom_out":"Uitzoomen","planner.fit":"Passend maken","planner.add_bed":"Bed toevoegen","planner.add_zone":"Zone toevoegen","planner.overlay_companions":"Buurplanten","planner.overlay_moisture":"Vocht","planner.overlay_temperature":"Temperatuur","planner.view_date":"Toon tuin op","planner.palette":"Planten","planner.palette_hint":"Sleep een plant naar een bed, of druk op Enter om hem aan het geselecteerde bed toe te voegen.","planner.layout":"Indeling","planner.layout.single":"Los","planner.layout.block":"Blok","planner.layout.row":"Rij","planner.inspector":"Details","planner.nothing_selected":"Selecteer een bed of beplanting voor details. Druk op ? voor sneltoetsen.","planner.method":"Methode","planner.method.indoor_sow":"Binnen zaaien, later uitplanten","planner.method.direct_sow":"Ter plaatse zaaien","planner.method.transplant":"Planten (gekochte planten / plantuitjes)","planner.status":"Status","planner.count":"{n} planten","planner.timeline":"Tijdlijn","planner.succession":"Opeenvolgend zaaien","planner.succession_count":"Aantal zaaimomenten","planner.succession_interval":"Elke (dagen)","planner.succession_placement":"Plaatsing","planner.succession.split":"Vlak in stroken verdelen","planner.succession.stack":"Zelfde plek, na elkaar","planner.succession_create":"Zaaimomenten maken","planner.succession_dropped":"{n} zaaimomenten vielen buiten het zaaivenster en zijn overgeslagen.","planner.duplicate":"Dupliceren","planner.remove":"Verwijderen","planner.bed_name":"Naam","planner.zone":"Zone","planner.kind":"Soort","planner.width":"Breedte (cm)","planner.length":"Lengte (cm)","planner.orientation":"Rijrichting (\xB0)","planner.soil":"Grond","planner.shade":"Schaduw (%)","planner.wind":"Wind","planner.score":"Buurplantenscore","planner.warnings":"Waarschuwingen","planner.no_warnings":"Geen conflicten - mooie combinatie!","planner.out_of_bounds":"Valt deels buiten het bed.","planner.placed":"{plant} geplaatst in {bed}.","planner.moved":"{name} verplaatst.","planner.removed":"{name} verwijderd.","planner.no_bed_here":"Zet planten op een bed.","planner.export_json":"Exporteer JSON","planner.export_yaml":"Exporteer YAML","planner.import":"Plan importeren","planner.import_mode":"Importmodus","planner.import_merge":"Samenvoegen met huidig plan","planner.import_replace":"Huidig plan vervangen","planner.imported":"Ge\xEFmporteerd: {beds} bedden, {plantings} beplantingen.","planner.shortcuts":"Sneltoetsen","planner.legend":"Plantenfamilies","planner.new_bed":"Nieuw bed","planner.new_zone":"Nieuwe zone","shortcut.move":"Selectie verplaatsen (Shift = 10\xD7)","shortcut.undo":"Ongedaan maken","shortcut.redo":"Opnieuw","shortcut.delete":"Selectie verwijderen","shortcut.duplicate":"Selectie dupliceren","shortcut.grid":"Raster aan/uit","shortcut.companions":"Buurplanten-laag aan/uit","shortcut.moisture":"Vochtlaag aan/uit","shortcut.zoom":"In- / uitzoomen","shortcut.escape":"Selectie opheffen","shortcut.cycle":"Volgend / vorig item selecteren","shortcut.help":"Deze hulp tonen","lib.title":"Plantenbibliotheek","lib.search":"Zoek op naam, Latijnse naam of familie","lib.family":"Familie","lib.filter_greenhouse":"Kas","lib.filter_quick":"Snelle gewassen","lib.filter_custom":"Mijn planten","lib.add_custom":"Nieuwe plant","lib.customize":"Aanpassen","lib.reset":"Terug naar standaard","lib.spacing":"Plantafstand","lib.row_spacing":"Rijafstand","lib.depth":"Zaaidiepte","lib.germination":"Kiemduur","lib.maturity":"Dagen tot oogst","lib.soil_temp":"Min. bodemtemperatuur","lib.frost":"Vorstbestendigheid","lib.min_temp":"Minimumtemperatuur","lib.greenhouse":"Kas","lib.water":"Water","lib.nutrients":"Voeding","lib.rotation":"Wisselteelt","lib.rotation_years":"{n} jaar voordat dezelfde familie terugkomt","lib.friends":"Goede buren","lib.enemies":"Uit elkaar houden","lib.pests":"Plagen","lib.diseases":"Ziekten","lib.care":"Verzorging","lib.calendar":"Zaaikalender","lib.indoor_sow":"Binnen zaaien","lib.direct_sow":"Buiten zaaien","lib.transplant":"Uitplanten","lib.harvest":"Oogsten","lib.source.builtin":"Standaard","lib.source.custom":"Eigen","lib.source.override":"Aangepast","lib.id":"Code","lib.name_en":"Naam (Engels)","lib.name_nl":"Naam (Nederlands)","lib.scientific":"Wetenschappelijke naam","lib.variety":"Ras","lib.habit":"Groeiwijze","lib.windows_hint":"Weken ten opzichte van de gemiddelde laatste voorjaarsvorst (negatief = ervoor).","lib.weeks":"weken","lib.from":"van","lib.to":"tot","lib.saved":"{plant} opgeslagen.","cal.month":"Maand","cal.week":"Week","cal.list":"Lijst","cal.prev":"Vorige","cal.next":"Volgende","cal.show_done":"Afgeronde taken tonen","cal.add_task":"Nieuwe taak","cal.all_beds":"Alle bedden","task.complete":"Klaar","task.skip":"Overslaan","task.reopen":"Heropenen","task.postpone":"Uitstellen","task.postpone_1":"+1 dag","task.postpone_3":"+3 dagen","task.postpone_7":"+1 week","task.postpone_to":"Naar datum","task.note":"Notitie","task.notes":"Notities","task.photos":"Foto's","task.add_photo":"Foto toevoegen","task.priority":"Prioriteit","task.duration":"Duur (min)","task.due":"Datum","task.window":"Venster {start} \u2013 {end}","task.repeat":"Herhaalt elke {n} dagen","task.repeat_days":"Herhaal elke (dagen, optioneel)","task.title":"Titel","task.type":"Soort","task.bed":"Bed","task.description":"Omschrijving","task.shifted":"{n} afhankelijke taken schoven mee.","task.beyond_window":"Let op: de nieuwe datum ligt na het ideale venster.","task.completed":"Goed bezig! {title} gedaan.","task.source.generated":"Uit je plan","task.source.sensor":"Uit sensoren","task.source.weather":"Uit de weersverwachting","task.source.user":"Door jou toegevoegd","settings.region":"Klimaat & regio","settings.hemisphere":"Halfrond","settings.hemisphere.north":"Noordelijk","settings.hemisphere.south":"Zuidelijk","settings.mode":"Profiel","settings.mode.preset":"Regionale voorinstelling","settings.mode.usda":"USDA-winterhardheidszone","settings.mode.custom":"Eigen vorstdata","settings.preset":"Regio","settings.zone":"Winterhardheidszone","settings.last_frost":"Laatste voorjaarsvorst (MM-DD)","settings.first_frost":"Eerste najaarsvorst (MM-DD)","settings.frost_dates_now":"Dit seizoen: laatste vorst {last}, eerste vorst {first}.","settings.weather":"Weer & buitensensoren","settings.weather_entity":"Weerentiteit","settings.outdoor_temp":"Buitentemperatuur","settings.rain":"Regensensor","settings.zones":"Zones & microklimaat","settings.beds":"Bedden & sensoren","settings.zone_type.outdoor":"Buiten","settings.zone_type.greenhouse":"Kas","settings.zone_type.cold_frame":"Koude bak","settings.heated":"Verwarmd","settings.min_heating":"Verwarming houdt boven (\xB0C)","settings.sensors":"Sensoren","settings.sensor.soil_moisture":"Bodemvocht","settings.sensor.soil_temperature":"Bodemtemperatuur","settings.sensor.air_temperature":"Luchttemperatuur","settings.sensor.air_humidity":"Luchtvochtigheid","settings.sensor.light":"Licht","settings.sensor.rain":"Regen","settings.irrigation":"Beregeningsschakelaar/-klep","settings.flow":"Debiet (L/min)","settings.vent":"Raamopener / ventilatie","settings.notifications":"Meldingen","settings.persistent":"Blijvende meldingen","settings.notify_services":"Pushmeldingen (notify-diensten, kommagescheiden)","settings.tts":"Tekst-naar-spraak-entiteit","settings.tts_players":"Speakers (kommagescheiden)","settings.digest":"Dagelijks overzicht om","settings.frost_alerts":"Vorstwaarschuwingen","settings.heat_alerts":"Hittewaarschuwingen","settings.tts_frost":"Vorst omroepen via speakers","settings.general":"Algemeen","settings.language":"Taal","settings.language.auto":"Volg Home Assistant","settings.units":"Eenheden","settings.units_metric":"Metrisch (cm, \xB0C, mm, L)","settings.snap":"Rastergrootte (cm)","settings.radius":"Bereik buurplanten (cm)","settings.data":"Importeren & exporteren","settings.saved":"Instellingen opgeslagen.","type.sow_indoor":"Binnen zaaien","type.sow_direct":"Buiten zaaien","type.harden_off":"Afharden","type.transplant":"Uitplanten","type.thin":"Uitdunnen","type.stake":"Ondersteunen","type.prune":"Snoeien","type.pinch":"Toppen","type.earth_up":"Aanaarden","type.feed":"Bemesten","type.water":"Water geven","type.weed":"Wieden","type.pest_check":"Plaagcontrole","type.harvest":"Oogsten","type.ventilate":"Luchten","type.shade":"Schaduwen","type.frost_protect":"Vorstbescherming","type.custom":"Taak","priority.low":"Laag","priority.normal":"Normaal","priority.high":"Hoog","priority.urgent":"Dringend","status.planned":"Gepland","status.sown_indoors":"Binnen gezaaid","status.sown":"Gezaaid","status.transplanted":"Uitgeplant","status.harvesting":"Oogst loopt","status.finished":"Afgerond","status.failed":"Mislukt","risk.none":"geen","risk.low":"laag","risk.moderate":"matig","risk.high":"hoog","risk.unknown":"onbekend","moisture.dry":"Droog","moisture.slightly_dry":"Iets droog","moisture.optimal":"Optimaal","moisture.wet":"Nat","moisture.unknown":"Geen data","irrigation.none":"Geen water nodig","irrigation.water":"Geef {mm} mm (~{liters} L)","irrigation.skip_rain_expected":"Overslaan - regen verwacht","irrigation.check_manually":"Controleer met de hand (~{mm} mm)","gh.none":"Alles goed","gh.ventilate":"Luchten","gh.shade":"Nu schaduwen","gh.close_up":"Sluiten voor de nacht","gh.heat":"Verwarming aan","level.low":"Laag","level.medium":"Gemiddeld","level.high":"Hoog","suit.yes":"Geschikt","suit.no":"Niet geschikt","suit.conditional":"Mogelijk","frost.tender":"Vorstgevoelig","frost.half_hardy":"Half winterhard","frost.hardy":"Winterhard","frost.very_hardy":"Zeer winterhard","kind.in_ground":"Bed in de grond","kind.raised":"Verhoogd bed","kind.container":"Bak / pot","soil.sandy":"Zand","soil.loam":"Leem","soil.clay":"Klei","soil.silt":"L\xF6ss","soil.peat":"Veen","soil.chalk":"Kalk","soil.potting_mix":"Potgrond","wind.sheltered":"Beschut","wind.moderate":"Gemiddeld","wind.exposed":"Winderig","habit.bush":"Struik","habit.vine":"Rank","habit.climbing":"Klimmend","habit.upright":"Rechtop","habit.rosette":"Rozet","habit.root":"Wortelgewas","habit.bulb":"Bol","reason.soil_too_cold":"Grond is {soil} \xB0C; {plant} heeft {min} \xB0C nodig om te kiemen.","reason.soil_too_hot":"Grond is {soil} \xB0C; boven {max} \xB0C kiemt {plant} slecht.","reason.frost_forecast":"Vorst ({temp} \xB0C) verwacht voor {date}; {plant} is vorstgevoelig.","reason.window_open":"Het venster is open.","reason.window_not_yet":"Venster opent {date}.","reason.window_closed":"Venster sloot op {date}.","reason.not_greenhouse_suitable":"{plant} is niet geschikt voor de kas.","compat.friend":"{a} en {b} zijn goede buren: {reason}","compat.enemy":"{a} en {b} kun je beter niet samen planten: {reason}","compat.overlap":"{a} en {b} overlappen - te weinig ruimte.","compat.rotation":"{family} stond in {season} in {bed}; wacht {years} jaar.","compat.same_family_adjacent":"{a} en {b} zijn familie en delen plagen.","alert.frost":"Vorstrisico {level}: {temp} \xB0C verwacht {when}","alert.heat":"Hittestress in {zone}: {temp} \xB0C verwacht","alert.dry":"{bed} is droog ({moisture}%)","alert.sensor_stale":"Sensor {entity} heeft al een tijd niets gemeld","alert.forecast_unavailable":"Weersverwachting niet beschikbaar","when.tonight":"vannacht","when.tomorrow_night":"morgennacht","nav.handbook":"Handboek","nav.print":"Afdrukken","type.soil_prep":"Bodem klaarmaken","type.compost":"Compost","type.green_manure":"Groenbemester","type.mulch":"Mulchen","type.clean_greenhouse":"Serre kuisen","type.winter_prep":"Winterklaar maken","type.plan_season":"Seizoen plannen","type.tool_care":"Gereedschap","type.soil_test":"Bodemanalyse","type.cut_back":"Terugsnoeien","type.divide":"Scheuren","type.protect":"Beschermen","type.clean":"Opruimen","type.tie_in":"Aanbinden","type.thin_fruit":"Vruchten dunnen","type.pollinate":"Bestuiven","type.check":"Controleren","type.make_feed":"Plantengier maken","category.vegetable":"Groenten","category.herb":"Kruiden","category.fruit":"Fruit","category.flower":"Bloemen","feature.path":"Grindpad","feature.compost":"Composthoop / -vat","feature.water_butt":"Regenton","feature.shed":"Tuinhuis","feature.tree":"Boom","feature.hedge":"Haag","feature.trellis":"Klimrek","feature.other":"Overig","stage.not_planted":"Nog niet geplant","stage.establishing":"Aanslaan","stage.vegetative":"Groei","stage.flowering":"Bloei","stage.ripening":"Afrijping","stage.harvest":"Oogst","stage.finished":"Afgelopen","compat.deters":"{a} beschermt {b}: weert {pests}.","compat.trap":"{a} lokt {pests} weg van {b} (vangplant).","compat.allelopathy":"{a} scheidt groeiremmende stoffen af - houd uit de buurt van {b}.","compat.competition":"{a} en {b} zijn allebei zware eters zo dicht bij elkaar - geef extra compost of meer ruimte.","compat.shading":"{a} (ongeveer {height} cm hoog) zal {b} beschaduwen - zet hoge gewassen aan de kant weg van de zon.","compat.shade_benefit":"{a} geeft {b} welkome zomerschaduw.","alert.disease":"Ziekterisico {level} in {zone}","alert.nutrients":"Voedingsbalans in {bed}: {status}","autoplan.bed_not_empty":"{bed} heeft dit seizoen al gewassen - vink 'vervangen' aan om het opnieuw te plannen.","autoplan.no_beds":"Geen lege bedden om te vullen. Kies bedden en vink 'vervangen' aan.","autoplan.compost_short":"Er is ongeveer {need} kg compost nodig, je hebt {have} kg.","autoplan.time_over":"Ongeveer {need} min werk per week - meer dan de {have} min die je hebt.","autoplan.wanted_missing":"Geen plaats voor: {plants}.","autoplan.consider_irrigation":"Ongeveer {liters} L water in een droge zomerweek - druppelbevloeiing of een regenton bespaart je tijd.","autofill.title":"Automatisch invullen","autofill.intro":"Stelt gewassen, hoeveelheden en plaatsen voor seizoen {season} voor op basis van je bedden en middelen. Er verandert niets tot je het toepast.","autofill.household":"Personen in het gezin","autofill.hours":"Uren per week","autofill.water":"Water per week (L)","autofill.compost":"Beschikbare compost (kg)","autofill.has_irrigation":"Druppelbevloeiing / automatisch water geven aanwezig","autofill.goals":"Doelen","autofill.wanted":"Zeker erbij","autofill.excluded":"Nooit","autofill.beds":"Bedden","autofill.all_empty":"(alle lege bedden)","autofill.replace":"Gewassen van dit seizoen in de gekozen bedden vervangen","autofill.propose":"Voorstel maken","autofill.apply":"In het plan zetten","autofill.applied":"{n} teelten toegevoegd aan het plan","autofill.skipped":"Niet geplaatst","autofill.sum_crops":"{n} gewassen","autofill.sum_yield":"\u2248 {kg} kg oogst","autofill.sum_time":"\u2248 {min} min/week","autofill.sum_water":"\u2248 {l} L in een piekweek","autofill.sum_compost":"{kg} kg compost","autofill.goal.fresh":"Verse groenten","autofill.goal.storage":"Bewaargroenten","autofill.goal.herbs":"Kruiden","autofill.goal.pollinators":"Bestuivers","autofill.goal.winter":"Wintergroenten","autofill.goal.perennials":"Vaste planten","autofill.goal.easy":"Weinig onderhoud","autofill.reason.no_suitable_bed":"geen geschikt bed","autofill.reason.no_space":"geen plaats","autofill.reason.time_budget":"tijdsbudget","autofill.reason.water_budget":"waterbudget","cal.timeline":"Tijdlijn","cal.garden_work":"Tuinwerk","cal.growing":"Groeit","cal.harvest_estimate":"Oogst verwacht rond {date}","cal.harvest_estimate_short":"Verwachte oogst (graaddagen)","cal.last_frost":"Laatste vorst","cal.first_frost":"Eerste vorst","cal.frost_dates":"Vorstdata","cal.no_plantings":"Dit seizoen nog geen gewassen gepland.","ctx.title":"Nu","ctx.moisture":"Bodemvocht","ctx.soil_temp":"Bodemtemperatuur","ctx.irrigation":"Water geven","ctx.water_balance":"Watertekort","ctx.nutrients":"Voedingsbalans","ctx.air_temp":"Luchttemperatuur","ctx.humidity":"Luchtvochtigheid","ctx.disease":"Ziekterisico","ctx.frost":"Vorstrisico","ctx.today":"Vandaag","ctx.rain":"Regen vandaag","ctx.et0":"Verdamping (ET\u2080)","dash.gdd_today":"Graaddagen vandaag","dash.water_climate":"Water & klimaat","dash.irrigation_mode":"Bewatering","dash.watering_now":"Bezig met {bed}","dash.stop":"Stop","dash.beds_need_water":"Bedden die water nodig hebben","dash.water_now":"Nu water geven","dash.safety_note":"Vorstvergrendeling, regen overslaan en maximale looptijd gelden altijd.","dash.disease_risk":"Ziekterisico","dash.nutrients":"Voeding","dash.water_balance":"Watertekort","dash.irrigation_started":"Bewatering gestart ({min} min)","dash.irrigation_stopped":"Bewatering gestopt","dash.irrigation_nothing":"Nu niets om water te geven","handbook.title":"Tuinhandboek","handbook.intro":"De achtergrond bij alles wat Hortulus aanraadt: bodem, zaaien, water, bemesting, vruchtwisseling, de serre en het tuinjaar.","handbook.contents":"Inhoud","handbook.overview":"Overzicht","handbook.glossary":"Woordenlijst","handbook.search":"Zoeken in het handboek","handbook.results":"Resultaten voor \u201C{query}\u201D","handbook.no_results":"Niets gevonden.","handbook.read_more":"Lees meer in het handboek","lib.category":"Categorie","lib.count":"{n} planten","lib.perennial":"overblijvend","lib.height":"Hoogte","lib.roots":"wortels","lib.gdd":"Graaddagen tot oogst","lib.base":"basis","lib.per_person":"Planten per persoon \xB7 opbrengst","lib.deters":"Weert","lib.trap_for":"Vangplant voor","lib.allelopathic":"Remt buren","lib.shade_tolerant":"Verdraagt schaduw","lib.plant":"Plant","planner.layer_zones":"Zones tonen","planner.layer_features":"Paden & elementen tonen","planner.layer_plantings":"Gewassen tonen","planner.add_feature":"Element","planner.align.left":"Links uitlijnen","planner.align.right":"Rechts uitlijnen","planner.align.top":"Boven uitlijnen","planner.align.bottom":"Onder uitlijnen","planner.align.hcenter":"Horizontaal centreren","planner.align.vcenter":"Verticaal centreren","planner.align.hdistribute":"Horizontaal verdelen","planner.align.vdistribute":"Verticaal verdelen","planner.aligned":"{n} items uitgelijnd","planner.moved_n":"{n} items verplaatst","planner.removed_n":"{n} items verwijderd","planner.selected_n":"{n} geselecteerd","planner.multi_hint":"Shift- of Ctrl-klik om meerdere bedden of gewassen te kiezen; sleep, lijn uit of verdeel ze daarna.","planner.alternatives":"Past in","planner.better_neighbours":"Betere buren","planner.heat_stress":"{n} hete dagen op komst","print.options":"Afdrukopties","print.document":"Document","print.page":"Papier","print.orientation":"Richting","print.portrait":"Staand","print.landscape":"Liggend","print.colors":"Kleuren","print.beds":"Bedden","print.days":"Dagen vooruit","print.title":"Titel","print.notes":"Notitievlak (stippelraster)","print.grid":"Raster van 10 cm op bedfiches","print.labels":"Gewasnamen op de kaart","print.download":"PDF downloaden","print.refresh":"Voorbeeld vernieuwen","print.save_config":"Opslaan in /config/hortulus/exports","print.saved_to_config":"PDF opgeslagen (/config/hortulus/exports)","print.preview":"Voorbeeld","print.empty":"Nog geen voorbeeld.","print.page_n":"Pagina {n} van {total}","print.all_greenhouses":"Alle serres","print.all_zones":"Alle zones","print.remarkable_hint":"reMarkable Paper Pro: 179,6 \xD7 239,5 mm, extra marge links voor de werkbalk. E-inkkleuren gebruiken lichte tinten en patronen zodat je pen zichtbaar blijft. Stuur de PDF via de reMarkable-app of e-mail.","print.doc.garden":"Tuinplan","print.doc.garden.hint":"Zones, bedden, gewassen, legende","print.doc.zone":"Serre / zone","print.doc.zone.hint":"E\xE9n zone, ingezoomd","print.doc.beds":"Bedfiches","print.doc.beds.hint":"Een pagina per bed met raster","print.doc.tasks":"Takenlijst","print.doc.tasks.hint":"Open taken per week","print.doc.season":"Seizoensoverzicht","print.doc.season.hint":"Tijdlijn zaaien \u2192 oogst","print.doc.blank":"Planningsblad","print.doc.blank.hint":"Omtrekken om op te schetsen","print.doc.plants":"Plantkaarten","print.doc.plants.hint":"Kerngegevens per gewas","print.page.remarkable":"reMarkable Paper Pro","print.page.a4":"A4","print.page.a3":"A3","print.page.a5":"A5","print.page.letter":"Letter","print.color.color":"Volle kleur","print.color.eink":"E-ink (licht + patronen)","print.color.grayscale":"Grijstinten","settings.irrigation_hw":"Bewateringshardware","settings.irrigation_mode":"Modus","settings.irrigation_mode.off":"Uit","settings.irrigation_mode.advise":"Advies (alleen taken)","settings.irrigation_mode.auto":"Automatisch","settings.pump":"Pomp (schakelaar)","settings.start_time":"Starttijd","settings.max_runtime":"Max. looptijd per klep (min)","settings.frost_lockout":"Vorstvergrendeling onder (\xB0C)","settings.rain_skip":"Overslaan bij regenverwachting \u2265 (mm)","settings.pump_lead":"Pomp stopt v\xF3\xF3r klep (s)","settings.irrigation_hint":"{n} bedden hebben een klep. Stel per bed het debiet (L/min) in bij Bedden.","settings.resources":"Middelen (automatisch invullen)","settings.maintenance_tasks":"Seizoenswerk in de kalender (bodem klaarmaken, serre kuisen, winterrust ...)","settings.open_meteo":"Open-Meteo gebruiken voor vocht, wind en zon","settings.open_meteo_hint":"Optioneel en standaard uit: stuurt de afgeronde co\xF6rdinaten van de tuin naar api.open-meteo.com. Verbetert de verdampingsberekening (Penman-Monteith).","settings.elevation":"Hoogte (m)","settings.shade_entity":"Schaduwscherm (cover of schakelaar)","settings.climate_control":"Luchten & schaduw sturen","settings.climate_control.off":"Uit","settings.climate_control.advise":"Advies (taken)","settings.climate_control.auto":"Automatisch","settings.wall_heat":"Tegen een warme muur","settings.thermal_mass":"Thermische massa (watervaten, steen)","settings.sensor.par":"Licht (PAR)","settings.sensor.leaf_wetness":"Bladnat","settings.sensor.ec":"Bodem-EC","settings.sensor.npk_n":"Stikstof (N)","settings.sensor.npk_p":"Fosfor (P)","settings.sensor.npk_k":"Kalium (K)","task.postponed":"{title} {n} dag(en) uitgesteld","common.done":"Klaar","planner.removed_from":"{name} verwijderd vanaf seizoen {season} (historiek blijft).","planner.steps":"Bouw je tuinplan op in drie stappen","planner.step.site":"Terrein tekenen","planner.step.site.hint":"zones & elementen","planner.step.zones":"Zones inrichten","planner.step.zones.hint":"naam, bedden, eigen kaart","planner.step.plant":"Beplanten","planner.step.plant.hint":"zelf of door het systeem","planner.whole_garden":"Hele tuin","planner.zone_map":"Zonekaart","planner.site_intro":"Kies een zonetype of element en sleep een rechthoek op het raster (vakjes van 10 \xD7 10 cm). E\xE9n klik plaatst een standaardmaat. Dubbelklik op een zone om haar eigen kaart te openen.","planner.zones":"Zones","planner.elements":"Paden, gazon, bomen & meer","planner.your_zones":"Jouw zones","planner.no_zones":"Nog geen zones - begin met je moestuin, serre of boomgaard.","planner.open_zone":"Zonekaart openen","planner.next":"Volgende","planner.zones_intro":"Open een zone om ze een naam te geven en haar bedden op een eigen kaart te tekenen. Dit plan geldt voor dit seizoen; met de jaarovergang neem je het mee naar volgend jaar.","planner.n_beds":"{n} bedden","planner.zone_name":"Naam van de zone","planner.beds_in_zone":"Bedden & elementen in deze zone","planner.draw_bed":"Bed","planner.fill_by_hand":"Zelf invullen","planner.fill_by_system":"Laat het systeem invullen","planner.bed_needs_zone":"Teken een bed binnen een zone.","planner.draw_hint":"Sleep op het raster om te tekenen: {what}","planner.palette_for_zone":"Je ziet planten die passen in {zone}. Kies een categorie om alles te zien.","planner.perennial":"meerjarig","planner.bears_after":"vruchten na ~{n} jaar","planner.perennial_since":"Meerjarig - staat er sinds {season} en gaat elk jaar mee tot je hem verwijdert.","planner.bearing_from":"Eerste oogst verwacht vanaf {season}.","planner.eco_tips":"Ecotips & huis-tuin-en-keukenmiddeltjes","planner.remove_perennial":"{name} verwijderen?","planner.remove_perennial_intro":"{name} werd geplant in {season} en staat elk jaar in je plan. Wat is er gebeurd?","planner.remove_from_season":"Weg vanaf {season}","planner.remove_from_season_hint":"Vorige jaren behouden hem (wisselteelthistoriek, oogsten, notities).","planner.remove_everywhere":"Volledig wissen","planner.remove_everywhere_hint":"Alsof hij nooit geplant werd - ook uit vorige jaren.","planner.legend.perennial":"meerjarig (blijft staan)","planner.legend.warning":"waarschuwing buren / wisselteelt","planner.legend.succession":"opeenvolgende zaai","planner.legend.rows":"zaairijen","planner.legend.border":"Randkleur = plantenfamilie (voor wisselteelt); het icoon toont het gewas zelf.","settings.zone_type.orchard":"Boomgaard","settings.zone_type.fruit":"Kleinfruit","settings.zone_type.herbs":"Kruidentuin","settings.zone_type.flowers":"Bloementuin","zone_hint.outdoor":"Moestuin: eenjarige gewassen met wisselteelt, bedden en paden.","zone_hint.greenhouse":"Serre: warmteminnende gewassen, klimaatsturing, verluchten en schaduw.","zone_hint.cold_frame":"Koude bak: afharden, vroege en late slaatjes.","zone_hint.orchard":"Boomgaard: fruitbomen die decennia blijven - jaarlijks snoeien, dunnen en oogsten.","zone_hint.fruit":"Kleinfruit: bessen, frambozen, druiven en kiwibessen.","zone_hint.herbs":"Kruidentuin: meerjarige en eenjarige kruiden, een bijenmagneet.","zone_hint.flowers":"Bloementuin: bestuivers, nuttige insecten en snijbloemen.","feature.terrace":"Terras","feature.lawn":"Gazon","feature.flowerbed":"Bloemperk","feature.fence":"Omheining","feature.pond":"Vijver","pollination.insects":"Heeft insecten nodig voor bestuiving - zet bloemen in de buurt.","pollination.wind":"Windbestuiving - plant in blokken, niet in \xE9\xE9n rij.","pollination.partner":"Heeft een bestuivingspartner (tweede ras) in de buurt nodig.","pollination.none":"Geen bestuiving nodig (blad, wortels).","planner.more":"Meer","settings.reminders":"Herinneringen","settings.overdue_reminders":"Herinner me aan blijven liggende taken","settings.overdue_time":"Tijdstip herinnering","settings.overdue_after":"Herinneren na (dagen te laat)","settings.weekly_plan":"Weekoverzicht vooraf","settings.weekly_day":"Dag","settings.weekly_time":"Tijdstip","settings.weather_aware":"Taken plannen volgens het weer","settings.weather_aware_hint":"Zaaien, uitplanten, spuiten, snoeien en mulchen schuiven automatisch naar de beste droge, vorstvrije en niet te hete dag binnen hun venster.","feature.house":"Huis","feature.driveway":"Oprit","feature.street":"Straat","feature.parking":"Parking","feature.play":"Speelhoek","feature.beehive":"Bijenkast","autofill.prefs":"Voorkeuren","autofill.freedom":"Keuzevrijheid van het systeem","autofill.freedom.strict":"Enkel wat ik wil","autofill.freedom.balanced":"Mijn wensen + doelen","autofill.freedom.free":"Vrij: verras me","autofill.pref.respect_companions":"Rekening houden met plantenburen","autofill.pref.add_pollinators":"Zelf bestuivingsbloemen toevoegen","autofill.pref.year_round":"Streven naar oogst het hele jaar","autofill.pref.allow_perennials":"Meerjarigen toegestaan","autofill.pref.match_zone_type":"Zonetype respecteren (boomgaard = fruit \u2026)","autofill.reason.pollinators":"bestuivers","nav.advice":"Advies","task.tools":"Je hebt nodig","advice.ask_title":"Vraag het aan Hortulus","advice.i_have":"Ik heb een","advice.mode.question":"vraag","advice.mode.problem":"probleem","advice.about":"met / over","advice.subject":"Onderwerp","advice.target":"Welke","advice.problem":"Vraag","advice.ask":"Vraag","advice.in_garden":"In je tuin","advice.all_plants":"Alle planten","advice.whole_garden":"de hele tuin","advice.subject.plant":"een plant / groente / fruit","advice.subject.greenhouse":"mijn serre","advice.subject.garden":"mijn tuin","advice.subject.bed":"een bed","advice.subject.tools":"gereedschap & benodigdheden","advice.q.status":"Hoe staat het ervoor?","advice.q.what_to_do":"Wat moet ik nu doen?","advice.q.when_sow":"Wanneer zaaien of planten?","advice.q.when_harvest":"Wanneer oogsten?","advice.q.growth":"het groeit slecht","advice.q.yellow_leaves":"gele bladeren","advice.q.wilting":"het hangt slap / verwelkt","advice.q.no_fruit":"bloeit maar geeft geen vruchten","advice.q.bolting":"het schiet door","advice.q.pests":"er zitten beestjes op","advice.q.disease":"vlekken, schimmel of rot","advice.q.feeding":"Hoe bemesten?","advice.q.watering":"Hoeveel water?","advice.q.pruning":"Hoe snoeien?","advice.q.companions":"Wat zet ik ernaast?","advice.q.too_hot":"het is te warm","advice.q.too_cold":"het is te koud","advice.q.winter_crops":"Wat kan er in de winter?","advice.q.year_round":"Hoe oogst ik het hele jaar?","advice.q.soil":"mijn grond is slecht","advice.q.slugs":"slakken!","advice.q.frost":"er komt vorst","advice.q.what_next":"Wat zet ik er hierna in?","advice.q.for_task":"Welk gereedschap voor deze klus?","advice.q.shopping":"Wat moet ik kopen?","advice.sec.status":"Nu in je tuin","advice.sec.facts":"Goed om te weten","advice.sec.causes":"Mogelijke oorzaken","advice.sec.actions":"Wat nu doen","advice.sec.remedies":"Eco- & huis-tuin-en-keukenmiddeltjes","advice.sec.prevention":"Volgende keer voorkomen","advice.sec.tasks":"Open taken","advice.read_more":"Lees meer in het handboek","advice.suggestions":"Voorstellen voor je tuin","advice.suggestions_intro":"Hortulus kijkt naar plaatsing, bestuiving, buren, oogst het hele jaar, bodem en ecologie.","advice.none":"Geen voorstellen - je plan ziet er prima uit!","advice.apply_add":"Toevoegen aan plan","advice.apply_open":"Toon in planner","advice.dismiss":"Verbergen","advice.no_space":"Geen vrije plaats in {bed}.","advice.kind.pollination":"Bestuiving","advice.kind.neighbours":"Buren","advice.kind.placement":"Plaatsing","advice.kind.year_round":"Hele jaar","advice.kind.soil":"Bodem","advice.kind.eco":"Ecologie","advice.kind.growth":"Groei","advice.kind.greenhouse":"Serre","advice.coverage":"Oogst per maand","advice.coverage_gaps":"Rode maanden hebben niets te oogsten - de voorstellen tonen wat ze opvult.","advice.coverage_full":"Elke maand iets te oogsten.","advice.nothing":"niets","advice.shopping":"Boodschappenlijst dit seizoen","advice.shopping_intro":"Berekend uit je plan: zaad, plantgoed, compost, bescherming en steun.","advice.nothing_to_buy":"Nog niets te kopen - plan eerst enkele teelten.","advice.tools_per_task":"Gereedschap per klus","advice.read_tools":"Gereedschap & zelf bemesting maken","advice.cat.seeds":"Zaad","advice.cat.plants":"Plantgoed","advice.cat.soil":"Bodem & bemesting","advice.cat.protection":"Bescherming","advice.cat.support":"Steun & mulch","advice.cat.other":"Overig","print.doc.year":"Jaarplan","print.doc.year.hint":"Maandmatrix: zaaien, planten, oogsten","nav.journal":"Logboek","task.assignee":"Toegewezen aan","task.anyone":"iedereen","task.harvested":"Geoogst:","journal.diary":"Dagboek","journal.harvest":"Oogst","journal.seeds":"Zaadvoorraad","journal.water":"Water","journal.new":"Nieuwe dagboeknotitie","journal.text":"Wat zag of deed je?","journal.placeholder":"Eerste tomaten kleuren, luizen op de tuinbonen \u2026","journal.kind":"Soort","journal.kind.note":"Notitie","journal.kind.observation":"Waarneming","journal.kind.problem":"Probleem","journal.kind.milestone":"Mijlpaal","journal.link":"Over","journal.whole_garden":"de hele tuin","journal.beds":"Bedden","journal.crops":"Teelten dit seizoen","journal.add_photo":"Foto toevoegen","journal.save":"Opslaan","journal.saved":"Bewaard in het dagboek.","journal.filter":"Filter","journal.all":"Alles","journal.empty":"Nog geen notities - schrijf op wat je ziet: de beste tuinleraar.","journal.log_harvest":"Oogst registreren","journal.what":"Gewas","journal.kg":"Gewicht (kg)","journal.count":"Aantal","journal.day":"Datum","journal.quality":"Kwaliteit","journal.learn_hint":"Hortulus leert hieruit je eigen opbrengst per m\xB2 en gebruikt die bij Automatisch invullen en advies.","journal.harvest_saved":"Oogst bewaard.","journal.harvest_season":"Oogst {season}","journal.crops_n":"{n} gewassen","journal.yield":"jouw opbrengst {kg} kg/m\xB2 (database {db})","journal.recent":"Laatste registraties","journal.no_harvest":"Nog niets geregistreerd.","journal.add_seed":"Zaadzakje toevoegen","journal.variety":"Ras","journal.year":"Jaar","journal.quantity":"Hoeveelheid","journal.unit":"Eenheid","journal.unit.packet":"zakje(s)","journal.unit.seeds":"zaden","journal.unit.g":"g","journal.source":"Herkomst","journal.source_hint":"winkel, ruil, eigen zaad \u2026","journal.seed_saved":"Zaadzakje bewaard.","journal.seed_missing":"Nog nodig voor dit seizoen","journal.seed_hint":"Zaad blijft 1-2 jaar (pastinaak, ui) tot 5-6 jaar (kolen, pompoenachtigen) goed. Oud zaad: doe een kiemproef.","journal.seed_box":"Zaaddoos","journal.status":"Status","journal.needed":"nodig dit seizoen","journal.seed.ok":"goed","journal.seed.use_soon":"dit jaar opmaken","journal.seed.expired":"oud (test het)","journal.seed.empty":"op","journal.seed.unknown":"jaar onbekend","journal.no_seeds":"Nog geen zaadzakjes.","journal.water_setup":"Koppel een watermeter en/of een niveausensor van de regenton in Instellingen \u203A Water om je tuinwater te volgen.","journal.water_week":"Leidingwater, 7 dagen","journal.water_season":"Leidingwater dit jaar","journal.rain_available":"Beschikbaar regenwater","journal.per_day":"Per dag (laatste 14 dagen)","journal.water_hint":"Watertaken vermelden hoeveel regenwater er nog is, zodat je dat eerst gebruikt.","cal.year":"Jaar","cal.tasks_per_month":"Taken","cal.act.sow_indoor":"binnen zaaien","cal.act.sow":"zaaien","cal.act.plant":"uitplanten","cal.act.grow":"groeit","cal.act.harvest":"oogsten","cal.act_short.sow_indoor":"Z","cal.act_short.sow":"Z","cal.act_short.plant":"P","cal.act_short.harvest":"O","settings.water":"Watermeter & regenton","settings.water_meter":"Watermeter tuin (m\xB3 of L)","settings.butt_level":"Peil regenton (%)","settings.butt_capacity":"Totale inhoud regentonnen (L)","settings.water_hint":"Hortulus bewaart \xE9\xE9n meting per dag. Je krijgt het verbruik per week, het regenwater dat nog beschikbaar is, en watertaken zeggen hoeveel je daarvan eerst kunt gebruiken.","settings.household":"Huishouden & spraak","settings.nobody":"Niemand (niet toegewezen)","settings.default_person":"Standaard gebruiken","settings.no_persons":"Geen personen gevonden. Voeg personen toe via Instellingen \u2192 Personen om taken toe te wijzen.","settings.assign_default":"Nieuwe taken gaan naar","settings.assign_per_type":"Per soort taak","settings.person_notify":"Persoonlijke herinneringen","settings.person_notify_hint":"Iedereen krijgt zijn eigen taken via deze notify-dienst (dagoverzicht en herinneringen voor achterstallige taken).","settings.voice":"Spraak (Assist)","settings.voice_hint":"Vraag Assist \u201Ewat moet ik vandaag in de tuin doen?\u201D, \u201Ehoeveel heb ik geoogst?\u201D, \u201Evriest het vannacht?\u201D. Installeer de zinnen \xE9\xE9n keer; ze werken in het Nederlands en Engels.","settings.voice_install":"Spraakzinnen installeren","settings.voice_installed":"Spraakzinnen ge\xEFnstalleerd","soil_test.title":"Bodemanalyse","soil_test.none":"Nog geen bodemanalyse.","soil_test.add":"Bodemanalyse toevoegen","soil_test.om":"Organische stof (%)","soil_test.lime":"Kalktoestand","soil_test.lime.low":"te laag","soil_test.lime.ok":"goed","soil_test.lime.high":"hoog","soil_test.hint":"Labo-rapport of thuistest. Hortulus past het bemestingsplan en kalkadvies van dit bed aan de laatste analyse aan.","cal.hours":"{n} u","planner.other_season":"{name} (seizoen {year})","journal.system":"Systeemlogboek","syslog.intro":"Elke wijziging in Hortulus staat hier: wat jij of een ander deed in het paneel, via automatiseringen, en wat Hortulus zelf aanpaste (taken, opruimen). Draai een regel terug om de toestand van v\xF3\xF3r die actie te herstellen; het terugdraaien zelf komt ook in het logboek en kan je dus weer ongedaan maken.","syslog.show_system":"Automatische acties van Hortulus tonen","syslog.empty":"Nog niets gelogd.","syslog.by_system":"Hortulus (automatisch)","syslog.by_unknown":"Automatisering of dienst","syslog.is_undone":"teruggedraaid","syslog.undo":"Terugdraaien","syslog.undone":"Teruggedraaid.","syslog.confirm":"Terugdraaien: {what}?","syslog.conflict":"{n} onderdeel/onderdelen zijn sindsdien opnieuw gewijzigd. Toch terugdraaien? Die latere wijzigingen gaan dan verloren.","syslog.blocked":"Kan niet terugdraaien: dit zou verwijzen naar een bed, zone of plant die intussen verwijderd is. Draai eerst die latere verwijdering terug.","syslog.more":"Oudere regels laden","syslog.and_more":"\u2026 en nog {n}","syslog.n_changes":"{verb} \u2013 {n} onderdelen","syslog.op.add":"Toegevoegd","syslog.op.remove":"Verwijderd","syslog.op.change":"Gewijzigd","syslog.op.mixed":"Aangepast","syslog.reason.plan":"planner","syslog.reason.import":"import","syslog.reason.tasks":"taken","syslog.reason.settings":"instellingen","syslog.reason.plants":"plantenbibliotheek","syslog.reason.records":"logboek","syslog.reason.auto":"automatisch","syslog.reason.undo":"Terugdraaiing","syslog.col.zones":"Zone","syslog.col.beds":"Bed","syslog.col.plantings":"Teelt","syslog.col.tasks":"Taak","syslog.col.custom_plants":"Eigen plant","syslog.col.features":"Tuinelement","syslog.col.harvest_log":"Oogst","syslog.col.journal":"Dagboeknotitie","syslog.col.seed_stock":"Zaadvoorraad","syslog.col.rotation_history":"Teeltgeschiedenis","syslog.col.irrigation_log":"Beregening","syslog.col.plant_overrides":"Plantgegevens","syslog.col.settings":"Instelling","planner.draw_site":"Terrein & elementen","planner.draw_planter":"Bloembak / pot","planner.draw_planter_hint":"Teken een bloembak, pot of plantenbak - die kan je daarna beplanten zoals een bed.","planner.new_planter":"Bloembak","planner.elements_in_zone":"Paden, terras, gazon, haag \u2026 in deze zone","planner.elements.buildings":"Gebouwen & verharding","planner.elements.paths":"Paden","planner.elements.green":"Groen","planner.elements.outdoor_living":"Buitenleven & uitrusting","feature.stone_path":"Stenen pad","feature.wood_path":"Houten pad","feature.stepping_stones":"Stapstenen","feature.bark_path":"Schorspad","feature.decking":"Vlonder","feature.wall":"Muur","feature.carport":"Carport / garage","feature.shrub":"Heester","feature.pool":"Zwembad","feature.seating":"Zithoek","settings.zone_type.garden":"Siertuin","settings.zone_type.containers":"Bloembakken & potten","zone_hint.garden":"Siertuin: heesters, borders en vaste planten rond gazon en terras.","zone_hint.containers":"Bloembakken & potten: op terras, balkon of vensterbank - teken elke bak of pot en beplant hem.","settings.display":"Weergave (deze browser)","settings.photos":"Foto's van planten tonen (Wikipedia)","settings.photos_hint":"Bovenop de tekening toont Hortulus een foto van Wikipedia, gezocht op de Latijnse naam. Je browser haalt die rechtstreeks op bij Wikipedia (met bronvermelding); zonder internet of als dit uit staat zie je de tekening.","nav.layout":"Tuinplan","advice.apply_transition":"Jaarovergang openen","layout.current":"huidig","layout.no_plan":"geen tuinplan","layout.edit":"Tuinplan bewerken","layout.to_planner":"Naar de planner","layout.make":"Tuinplan {season} maken","layout.planting_on":"op het tuinplan van {season} - zones, bedden en elementen pas je aan in Tuinplan","layout.started":"Tuinplan {season} gestart.","layout.none_title":"Nog geen tuinplan voor {season}","layout.none_intro":"Een tuinplan legt de vorm van je tuin vast voor \xE9\xE9n jaar: zones (volle grond, serre, potten \u2026), bedden en elementen zoals oprit, huis, haag, gras, tuinhuis of watervat - zonder planten. Begin vanaf een ander jaar of leeg.","layout.none_plant":"Je beplant een jaar op zijn eigen tuinplan, en voor {season} is er nog geen. Maak het in Tuinplan, of zet {live} over met de jaarovergang.","layout.none_hint":"Niets gaat vanzelf naar een nieuw jaar: het tuinplan en wat er doorloopt (vaste planten, overwinterende gewassen) zet je op het einde van het jaar expliciet over.","layout.copy_from":"Kopieer tuinplan {season}","layout.start_empty":"Leeg beginnen","year.button":"Jaarovergang","year.title_short":"Jaarovergang","year.title":"Jaarovergang {from} \u2192 {to}","year.intro":"Niets gaat vanzelf mee naar {to}. Kies welk deel van het tuinplan en welke gewassen je overzet; de rest blijft in {from}. Alles komt in het systeemlogboek en kan je terugdraaien.","year.plan":"Tuinplan","year.keep":"Gebruik het tuinplan dat je al voor {to} maakte","year.copy":"Kopieer het tuinplan van {from} (kies hieronder wat meegaat)","year.copy_hint":"Het tuinplan van {to} wordt een kopie van {from}. Vink uit wat niet meer meegaat.","year.elements":"Elementen (oprit, huis, haag, paden \u2026)","year.perennials":"Vaste planten, bomen en struiken","year.overwinter":"Overwinterende gewassen (lopen door na het einde van het jaar)","year.none":"Geen.","year.bed_gone":"bed niet in het nieuwe tuinplan","year.not_chosen":"Wat je niet aanvinkt, blijft in het oude jaar en krijgt geen taken in {to}.","year.activate":"Maak {to} meteen het actieve tuinjaar","year.activate_hint":"Het tuinplan van {from} wordt gearchiveerd en {to} wordt je tuin: taken, sensoren en beregening volgen het nieuwe plan.","year.prepare_hint":"Alleen voorbereiden: het tuinplan van {to} wordt klaargezet, {from} blijft je actieve tuin.","year.apply":"Overzetten naar {to}","year.done":"Je tuin staat nu in {season} - {n} gewas(sen) overgezet.","year.prepared":"Tuinplan {season} klaargezet - {n} gewas(sen) overgezet.","year.skipped":"{n} gewas(sen) niet overgezet: hun bed zit niet in het nieuwe tuinplan."};var Bi={en:Gt,nl:Ls},Xe=c=>(c??"en").toLowerCase().split(/[-_]/)[0]==="nl"?"nl":"en";function gt(c){let r=Bi[Xe(c)];return(e,t={})=>(r[e]??Gt[e]??e).replace(/\{(\w+)\}/g,(i,n)=>{let a=t[n];return a==null?`{${n}}`:e.startsWith("alert.")&&n==="level"?r[`risk.${a}`]??String(a):e.startsWith("alert.")&&n==="when"?r[String(a)]??String(a):Array.isArray(a)?a.join(", "):String(a)})}var Di=c=>c.replace(/_/g," ").replace(/^\w/,r=>r.toUpperCase()),As={aphids:"bladluis",whitefly:"witte vlieg",red_spider_mite:"spint",thrips:"trips",slugs:"slakken",cabbage_white:"koolwitje",cabbage_root_fly:"koolvlieg",flea_beetle:"aardvlo",carrot_fly:"wortelvlieg",onion_fly:"uienvlieg",leek_moth:"preimot",pea_moth:"erwtenbladroller",birds:"vogels",pigeons:"duiven",black_bean_aphid:"zwarte bonenluis",bean_weevil:"bonenkever",leaf_miner:"bladmineerder",late_blight:"phytophthora",early_blight:"alternaria (vroeg)",blossom_end_rot:"neusrot",botrytis:"grauwe schimmel",powdery_mildew:"echte meeldauw",downy_mildew:"valse meeldauw",cucumber_mosaic_virus:"komkommermoza\xEFekvirus",clubroot:"knolvoet",white_rot:"witrot",rust:"roest",alternaria:"alternaria",leaf_spot:"bladvlekken",root_rot:"wortelrot",anthracnose:"vlekkenziekte",halo_blight:"vetvlekkenziekte",chocolate_spot:"chocoladevlekken",damping_off:"kiemplantenziekte",ants:"mieren",asparagus_beetle:"aspergekever",canker:"kanker",celery_fly:"selderijvlieg",colorado_beetle:"coloradokever",nematodes:"aaltjes",scab:"schurft",smut:"builenbrand",verticillium_wilt:"verwelkingsziekte",wireworm:"ritnaald"},Je=(c,r)=>Xe(r)==="nl"&&As[c]?As[c]:Di(c);var Hs=T`
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
`,A=T`
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
`;var Fi="#7d7d7d";function R(c,r){return r&&c[r]?.color||Fi}function Is(c){let r=c.replace(/[^\p{L}\s]/gu,"").trim(),e=r.split(/\s+/);return e.length>1?(e[0][0]+e[1][0]).toUpperCase():(r.slice(0,2)||"?").replace(/^./,t=>t.toUpperCase())}function y(c,r){return c?c.names[r]||c.names.en||c.id:"?"}var je={sow_indoor:"mdi:seed-outline",sow_direct:"mdi:seed",harden_off:"mdi:weather-partly-cloudy",transplant:"mdi:shovel",thin:"mdi:content-cut",stake:"mdi:pillar",prune:"mdi:scissors-cutting",pinch:"mdi:hand-back-left-outline",earth_up:"mdi:terrain",feed:"mdi:bottle-tonic-plus-outline",water:"mdi:watering-can",weed:"mdi:sprout-outline",pest_check:"mdi:bug-outline",harvest:"mdi:basket-outline",ventilate:"mdi:window-open-variant",shade:"mdi:sun-angle-outline",frost_protect:"mdi:snowflake-alert",soil_prep:"mdi:shovel",compost:"mdi:recycle",green_manure:"mdi:grass",mulch:"mdi:layers-outline",clean_greenhouse:"mdi:spray-bottle",winter_prep:"mdi:snowflake-variant",plan_season:"mdi:clipboard-text-outline",tool_care:"mdi:hammer-wrench",soil_test:"mdi:test-tube",cut_back:"mdi:content-cut",divide:"mdi:call-split",protect:"mdi:shield-sun-outline",clean:"mdi:broom",tie_in:"mdi:link-variant",thin_fruit:"mdi:fruit-cherries",pollinate:"mdi:bee-flower",check:"mdi:clipboard-check-outline",make_feed:"mdi:flask-outline",custom:"mdi:checkbox-marked-circle-outline"},Re={sow_indoor:"var(--hl-leaf-500)",sow_direct:"var(--hl-leaf-500)",transplant:"var(--hl-leaf-700)",harvest:"var(--hl-sun-500)",water:"var(--hl-water-500)",frost_protect:"var(--hl-frost-500)",ventilate:"var(--hl-frost-500)",shade:"var(--hl-sun-500)",weed:"var(--hl-soil-500)",pest_check:"var(--hl-tomato-500)",soil_prep:"var(--hl-soil-500)",compost:"var(--hl-soil-700)",green_manure:"var(--hl-leaf-600)",mulch:"var(--hl-soil-500)",clean_greenhouse:"var(--hl-frost-500)",winter_prep:"var(--hl-frost-500)",plan_season:"var(--hl-leaf-700)",protect:"var(--hl-sun-500)",clean:"var(--hl-soil-500)",tie_in:"var(--hl-leaf-600)",thin_fruit:"var(--hl-tomato-500)",pollinate:"var(--hl-sun-500)",make_feed:"var(--hl-soil-700)"},ie=c=>{let[r,e,t]=c.slice(0,10).split("-").map(Number);return new Date(r,e-1,t,12)},Ce=c=>`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}-${String(c.getDate()).padStart(2,"0")}`,B=(c,r)=>{let e=ie(c);return e.setDate(e.getDate()+r),Ce(e)},we=(c,r)=>Math.round((ie(r).getTime()-ie(c).getTime())/864e5);function k(c,r,e={day:"numeric",month:"short"}){return c?ie(c).toLocaleDateString(r==="nl"?"nl-NL":"en-GB",e):"\u2013"}function Wt(c,r){let e=c.anchor==="first_frost"?r.first_frost:r.last_frost,t=B(e,c.start_week*7),s=B(e,c.end_week*7+6);return t<=s?[t,s]:[s,t]}function Os(c,r,e){return r?c.status==="failed"||c.status==="finished"?!1:r.in_ground<=e&&e<=r.harvest_end:!0}function Qe(c){let r={urgent:3,high:2,normal:1,low:0};return[...c].sort((e,t)=>e.due===t.due?r[t.priority]-r[e.priority]:e.due<t.due?-1:1)}function re(c){let r=globalThis.crypto?.randomUUID?.()??Math.random().toString(16).slice(2)+Date.now().toString(16);return`${c}_${r.replace(/-/g,"").slice(0,10)}`}function ft(c,r,e){let t=new Blob([r],{type:e}),s=URL.createObjectURL(t),i=document.createElement("a");i.href=s,i.download=c,i.click(),setTimeout(()=>URL.revokeObjectURL(s),1e3)}function ue(c,r,e){return e<c.season||c.removed_season!=null&&e>=c.removed_season?!1:e<=(c.last_season??c.season)}function ke(c,r){return c.layout_season==null||r===c.layout_season?{zones:c.zones,beds:c.beds,features:c.features??[]}:c.layouts?.[String(r)]??null}var Ns={outdoor:["vegetable","herb","flower"],greenhouse:["vegetable","herb","fruit"],cold_frame:["vegetable","herb"],orchard:["fruit"],fruit:["fruit"],herbs:["herb","flower"],flowers:["flower","herb"],garden:["flower","herb","fruit"],containers:["vegetable","herb","flower","fruit"]};var vt=null;function Bs(c){vt=c}function Zt(c){return(vt?.task_tools[c]??[]).map(e=>`${vt?.tools[e]?.emoji??""} ${vt?.tools[e]?.name??e}`.trim()).join(", ")}var Kt=[];function Ds(c){Kt=Object.values(c.states).filter(r=>r.entity_id.startsWith("person.")).map(r=>({id:r.entity_id,name:String(r.attributes.friendly_name??r.entity_id.slice(7))})).sort((r,e)=>r.name.localeCompare(e.name))}var Ve=()=>Kt,Fs=c=>c&&Kt.find(r=>r.id===c)?.name||(c?c.replace(/^person\./,""):"");var Us={},Yt=new Set;function qs(c){Us=c,Yt.forEach(r=>r())}function Ui(c,r){c.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:r},bubbles:!0,composed:!0}))}var Le=null,me=class extends E{constructor(){super(...arguments);this.term="";this.open=!1;this.refresh=()=>this.requestUpdate();this.outside=e=>{e.composedPath().includes(this)?this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0}):this.close()}}connectedCallback(){super.connectedCallback(),Yt.add(this.refresh)}disconnectedCallback(){super.disconnectedCallback(),Yt.delete(this.refresh),Le===this&&(Le=null)}toggle(e){e.stopPropagation(),e.preventDefault(),!this.open&&Le&&Le!==this&&Le.close(),this.open=!this.open,Le=this.open?this:null,this.open&&window.addEventListener("pointerdown",this.outside,{once:!0,capture:!0})}close(){this.open=!1}onKey(e){e.key==="Escape"&&this.close()}render(){let e=Us[this.term],t=e?.term??this.term;return o`<button class="i" aria-label=${t} aria-expanded=${String(this.open)} @click=${this.toggle} @keydown=${this.onKey}>
        <ha-icon icon="mdi:information-outline"></ha-icon></button>
      ${this.open&&e?o`<div class="pop" role="tooltip"><b>${e.term}</b>${e.text}
            ${e.chapter?o`<br /><a @click=${()=>{this.close(),Ui(this,e.chapter)}}>${this.t?.("handbook.read_more")??"Read more"} →</a>`:u}
          </div>`:u}`}};me.styles=T`
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
  `,p([g()],me.prototype,"term",2),p([g({attribute:!1})],me.prototype,"t",2),p([f()],me.prototype,"open",2),me=p([j("hl-info")],me);var bt=80,yt=new WeakMap;function qi(c){c.pointerType!=="mouse"&&yt.set(c.currentTarget,{x:c.clientX,y:c.clientY,dx:0,active:!1,id:c.pointerId})}function Gi(c){let r=c.currentTarget,e=yt.get(r);if(!e||e.id!==c.pointerId)return;let t=c.clientX-e.x,s=c.clientY-e.y;!e.active&&Math.abs(t)>12&&Math.abs(t)>Math.abs(s)*1.5&&(e.active=!0,r.setPointerCapture(c.pointerId)),e.active&&(e.dx=t,r.style.transform=`translateX(${Math.max(-140,Math.min(140,t))}px)`,r.dataset.swipe=t>bt?"complete":t<-bt?"postpone":"")}function Gs(c,r,e){let t=c.currentTarget,s=yt.get(t);yt.delete(t),t.style.transform="",delete t.dataset.swipe,s?.active&&(c.preventDefault(),s.dx>bt&&r.status==="open"?e.onComplete(r):s.dx<-bt&&r.status==="open"&&e.onPostpone&&e.onPostpone(r,1))}function et(c,r){let e=c.status==="open"&&c.due<r.today,t=c.status!=="open",s=Re[c.type]??"var(--hl-soil-500)";return o`
    <li class="task-row ${t?"done":""} prio-${c.priority}" @pointerdown=${qi} @pointermove=${Gi}
      @pointerup=${i=>Gs(i,c,r)} @pointercancel=${i=>Gs(i,c,r)}>
      <button class="check" role="checkbox" aria-checked=${String(t)} aria-label=${`${r.t("task.complete")}: ${c.title}`}
        ?disabled=${t} @click=${()=>r.onComplete(c)}>
        <ha-icon icon=${t?"mdi:check-circle":"mdi:checkbox-blank-circle-outline"}></ha-icon>
      </button>
      <button class="task-main" @click=${()=>r.onOpen(c)}>
        <span class="type-icon" style=${`color:${s}`}><ha-icon icon=${je[c.type]}></ha-icon></span>
        <span class="task-text">
          <span class="task-title">${c.title}</span>
          <span class="task-meta">
            ${e?o`<span class="chip bad">${r.t("common.overdue")} · ${k(c.due,r.lang)}</span>`:o`<span>${k(c.due,r.lang,{weekday:"short",day:"numeric",month:"short"})}</span>`}
            <span>· ${r.t("common.minutes",{n:c.estimated_minutes})}</span>
            ${c.recurrence?o`<span title=${r.t("task.repeat",{n:c.recurrence.interval_days})}>· ↻ ${c.recurrence.interval_days}d</span>`:u}
            ${c.priority==="urgent"||c.priority==="high"?o`<span class="chip ${c.priority==="urgent"?"bad":"warn"}">${r.t(`priority.${c.priority}`)}</span>`:u}
            ${c.assignee?o`<span class="chip" title=${r.t("task.assignee")}><ha-icon icon="mdi:account-outline" style="--mdc-icon-size:14px"></ha-icon>${Fs(c.assignee)}</span>`:u}
          </span>
        </span>
      </button>
    </li>`}var $t=T`
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
`,D=class extends E{constructor(){super(...arguments);this.task=null;this.beds=[];this.lang="en";this.today="";this.create=!1;this.snapshot=null;this.note="";this.harvestKg=0;this.harvestCount=0;this.photos=[];this.busy=!1;this.error=""}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&(this.task||this.create)&&e.showModal()}close(e=!1){this.note="",this.photos=[],this.error="",this.dispatchEvent(new CustomEvent("closed",{detail:{changed:e}}))}async run(e,t){this.busy=!0;try{await e(),t&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t},bubbles:!0,composed:!0})),this.close(!0)}catch(s){this.error=s.message??String(s)}finally{this.busy=!1}}async onPhoto(e){let t=e.target.files?.[0];if(t){this.busy=!0;try{this.photos=[...this.photos,await this.api.uploadPhoto(t)]}catch(s){this.error=s.message}finally{this.busy=!1}}}submitNew(e){e.preventDefault();let t=e.target,s=i=>t.elements.namedItem(i).value;this.run(()=>this.api.addTask({title:s("title"),due:s("due")||null,task_type:s("type"),description:s("description"),priority:s("priority"),estimated_minutes:Number(s("minutes"))||null,bed_id:s("bed")||null,recurrence_days:Number(s("repeat"))||null}))}renderCreate(){let e=["custom","water","weed","feed","pest_check","harvest","prune","stake","sow_direct","transplant","ventilate","frost_protect"];return o`<form @submit=${this.submitNew}>
      <div class="head"><ha-icon class="big-icon" icon="mdi:clipboard-plus-outline"></ha-icon><h2>${this.t("cal.add_task")}</h2></div>
      <div class="body">
        <div class="form-grid">
          <label class="field full">${this.t("task.title")}<input name="title" required autofocus /></label>
          <label class="field">${this.t("task.due")}<input name="due" type="date" .value=${this.today} /></label>
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
    </form>`}renderContext(e){let t=this.snapshot?.analysis;if(!t)return u;let s=[],i=e.bed_id?t.beds[e.bed_id]:void 0,n=e.zone_id??this.snapshot?.beds.find(h=>h.id===e.bed_id)?.zone_id,a=n?t.zones[n]:void 0,l=(h,m,v=0)=>h==null?null:`${h.toFixed(v)} ${m}`;if(i){let h=l(i.irrigation.moisture,"%");h&&s.push([this.t("ctx.moisture"),h]);let m=i.sensors?.soil_temperature?.value;m!=null&&s.push([this.t("ctx.soil_temp"),`${m.toFixed(1)} \xB0C`]),i.irrigation.action!=="none"&&s.push([this.t("ctx.irrigation"),this.t(`irrigation.${i.irrigation.action}`,{mm:i.irrigation.amount_mm,liters:Math.round(i.irrigation.liters)})]),i.depletion_mm!=null&&i.taw_mm&&s.push([this.t("ctx.water_balance"),`${i.depletion_mm.toFixed(0)} / ${i.taw_mm.toFixed(0)} mm`]),i.nutrients?.index!=null&&s.push([this.t("ctx.nutrients"),`${i.nutrients.index} / 100`])}a&&(a.air_temperature!=null&&s.push([this.t("ctx.air_temp"),`${a.air_temperature.toFixed(1)} \xB0C`]),a.humidity!=null&&s.push([this.t("ctx.humidity"),`${Math.round(a.humidity)} %`]),a.disease&&a.disease.level!=="unknown"&&s.push([this.t("ctx.disease"),this.t(`risk.${a.disease.level}`)]),a.frost.level!=="unknown"&&s.push([this.t("ctx.frost"),`${this.t(`risk.${a.frost.level}`)}${a.frost.plant_level_min_c!=null?` \xB7 ${a.frost.plant_level_min_c.toFixed(1)} \xB0C`:""}`]));let d=t.outlook[0];return d&&(d.tmin!=null&&d.tmax!=null&&s.push([this.t("ctx.today"),`${d.tmin.toFixed(0)}\u2013${d.tmax.toFixed(0)} \xB0C`]),s.push([this.t("ctx.rain"),`${d.rain_mm.toFixed(1)} mm`]),d.et0_mm!=null&&s.push([this.t("ctx.et0"),`${d.et0_mm.toFixed(1)} mm`])),s.length?o`<h4>${this.t("ctx.title")}</h4><div class="context">${s.map(([h,m])=>o`<div class="ctx">${h}<b>${m}</b></div>`)}</div>`:u}renderTask(e){let t=e.status==="open",s=(n,a)=>this.run(async()=>{if(n==="complete"&&e.type==="harvest"&&(this.harvestKg>0||this.harvestCount>0)){let l=this.snapshot?.plantings.find(d=>d.id===e.planting_id);await this.api.logHarvest({planting_id:e.planting_id,plant_id:l?null:e.title_params?.plant_id,kg:this.harvestKg,count:this.harvestCount||null,note:this.note||""})}await this.api.taskAction(e.id,n,{note:this.note||void 0,photos:this.photos.length?[...this.photos]:void 0})},a),i=(n,a)=>this.run(async()=>{let l=await this.api.taskAction(e.id,"postpone",{days:n,to:a,note:this.note||void 0}),d=[];l.shifted?.length&&d.push(this.t("task.shifted",{n:l.shifted.length})),l.warnings?.includes("beyond_window")&&d.push(this.t("task.beyond_window")),d.length&&this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:d.join(" ")},bubbles:!0,composed:!0}))});return o`
      <div class="head">
        <ha-icon class="big-icon" icon=${je[e.type]} style=${`color:${Re[e.type]??"inherit"}`}></ha-icon>
        <div class="stack" style="gap:4px">
          <h2>${e.title}</h2>
          <div class="row wrap small muted">
            <span>${this.t("task.due")}: <b>${k(e.due,this.lang,{weekday:"long",day:"numeric",month:"long"})}</b></span>
            <span class="chip">${this.t(`type.${e.type}`)}</span>
            <span class="chip">${this.t(`task.source.${e.source}`)}</span>
          </div>
        </div>
      </div>
      <div class="body">
        ${e.description?o`<p>${e.description}</p>`:u}
        ${e.title_params?.handbook?o`<a class="small" href="#" @click=${n=>{n.preventDefault(),this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e.title_params.handbook},bubbles:!0,composed:!0})),this.close()}}><ha-icon icon="mdi:book-open-page-variant-outline" style="--mdc-icon-size:16px"></ha-icon> ${this.t("handbook.read_more")}</a>`:u}
        ${this.renderContext(e)}
        ${Zt(e.type)?o`<p class="small"><ha-icon icon="mdi:toolbox-outline" style="--mdc-icon-size:16px"></ha-icon>
          <b>${this.t("task.tools")}:</b> ${Zt(e.type)}</p>`:u}
        ${e.window_start&&e.window_end&&e.window_start!==e.window_end?o`<p class="small muted">${this.t("task.window",{start:k(e.window_start,this.lang),end:k(e.window_end,this.lang)})}</p>`:u}
        ${e.recurrence?o`<p class="small muted">↻ ${this.t("task.repeat",{n:e.recurrence.interval_days})}</p>`:u}
        ${Ve().length?o`<label class="row small">${this.t("task.assignee")}:
          <select @change=${n=>this.run(()=>this.api.taskAction(e.id,"update",{changes:{assignee:n.target.value||null}}))}>
            <option value="" ?selected=${!e.assignee}>${this.t("task.anyone")}</option>
            ${Ve().map(n=>o`<option value=${n.id} ?selected=${e.assignee===n.id}>${n.name}</option>`)}
          </select></label>`:u}
        ${t&&e.type==="harvest"?o`<div class="row wrap small harvest-log">
          <ha-icon icon="mdi:scale" style="--mdc-icon-size:18px"></ha-icon>${this.t("task.harvested")}
          <input type="number" min="0" step="0.05" inputmode="decimal" style="width:90px" placeholder="kg"
            @input=${n=>this.harvestKg=Number(n.target.value)||0} /> kg
          <input type="number" min="0" step="1" inputmode="numeric" style="width:80px" placeholder="#"
            @input=${n=>this.harvestCount=Number(n.target.value)||0} /> ×</div>`:u}
        <div class="row wrap small">
          <span>${this.t("task.priority")}:</span>
          ${["low","normal","high","urgent"].map(n=>o`
            <button class="chip" aria-pressed=${String(e.priority===n)}
              @click=${()=>this.run(()=>this.api.taskAction(e.id,"update",{changes:{priority:n}}))}>${this.t(`priority.${n}`)}</button>`)}
        </div>
        ${e.notes.length?o`<h4>${this.t("task.notes")}</h4>${e.notes.map(n=>o`<p class="note"><span class="xs muted">${k(n.at.slice(0,10),this.lang)}</span> ${n.text}</p>`)}`:u}
        ${e.photos.length||this.photos.length?o`<h4>${this.t("task.photos")}</h4>
          <div class="photos">${[...e.photos,...this.photos].map(n=>o`<a href=${_e(n,"original")} target="_blank" rel="noopener"><img src=${_e(n)} alt=${this.t("task.photos")} loading="lazy" /></a>`)}</div>`:u}
        <label class="field">${this.t("task.note")}<textarea rows="2" .value=${this.note} @input=${n=>this.note=n.target.value}></textarea></label>
        <label class="btn small" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("task.add_photo")}
          <input type="file" accept="image/*" capture="environment" class="visually-hidden" @change=${this.onPhoto} /></label>
        ${t?o`
          <div class="row wrap">
            <span class="small">${this.t("task.postpone")}:</span>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>i(1)}>${this.t("task.postpone_1")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>i(3)}>${this.t("task.postpone_3")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${()=>i(7)}>${this.t("task.postpone_7")}</button>
            <input type="date" style="width:auto" aria-label=${this.t("task.postpone_to")} .min=${B(this.today,1)}
              @change=${n=>i(void 0,n.target.value)} />
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
      </div>`}render(){return!this.task&&!this.create?u:o`<dialog @close=${()=>this.close()}>${this.create?this.renderCreate():this.renderTask(this.task)}</dialog>`}};D.styles=[A,T`
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
    `],p([g({attribute:!1})],D.prototype,"task",2),p([g({attribute:!1})],D.prototype,"beds",2),p([g({attribute:!1})],D.prototype,"api",2),p([g({attribute:!1})],D.prototype,"t",2),p([g()],D.prototype,"lang",2),p([g()],D.prototype,"today",2),p([g({type:Boolean})],D.prototype,"create",2),p([g({attribute:!1})],D.prototype,"snapshot",2),p([f()],D.prototype,"note",2),p([f()],D.prototype,"harvestKg",2),p([f()],D.prototype,"harvestCount",2),p([f()],D.prototype,"photos",2),p([f()],D.prototype,"busy",2),p([f()],D.prototype,"error",2),D=p([j("hl-task-dialog")],D);var Xt={none:"ok",low:"cold",moderate:"warn",high:"bad",unknown:""},Wi={frost:"mdi:snowflake-alert",heat:"mdi:thermometer-alert",dry:"mdi:water-alert",sensor_stale:"mdi:access-point-network-off",forecast:"mdi:weather-cloudy-alert",disease:"mdi:mushroom-outline",nutrients:"mdi:flask-outline"},ne=class extends E{constructor(){super(...arguments);this.plants=new Map;this.families={};this.lang="en";this.admin=!0}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get ctx(){return{t:this.t,lang:this.lang,today:this.snapshot.analysis?.today??"",onOpen:e=>this.emit("open-task",e),onComplete:e=>this.emit("complete-task",e),onPostpone:(e,t)=>this.emit("postpone-task",{task:e,days:t})}}greeting(){let e=new Date().getHours();return this.t(e<12?"dash.greeting_morning":e<18?"dash.greeting_afternoon":"dash.greeting_evening")}render(){let e=this.snapshot,t=e.analysis;if(!t)return o`<p class="empty">${this.t("common.loading")}</p>`;let s=t.today,i=Qe(e.tasks.filter(d=>d.status==="open"&&d.due<=s)),n=Qe(e.tasks.filter(d=>d.status==="open"&&d.due>s&&d.due<=B(s,7))),a=i.reduce((d,h)=>d+h.estimated_minutes,0),l=e.zones.filter(d=>d.type!=="outdoor");return o`
      <section class="hero">
        <div class="stack" style="gap:4px">
          <span class="muted small">${k(s,this.lang,{weekday:"long",day:"numeric",month:"long"})} · ${this.t("common.season",{year:t.season})}</span>
          <h1>${this.greeting()} 🌱</h1>
        </div>
        <span class="spacer"></span>
        <span class="chip ${Xt[t.frost.level]}"><ha-icon icon="mdi:snowflake"></ha-icon>${this.t("dash.frost_risk")}: ${this.t(`risk.${t.frost.level}`)}</span>
        <span class="chip"><ha-icon icon="mdi:thermometer-plus"></ha-icon>${Math.round(t.gdd.season_total)} GDD</span>
      </section>

      ${t.alerts.length?o`<section class="alerts" aria-label="Alerts">
        ${t.alerts.map(d=>o`<div class="alert ${d.kind==="frost"?"frost":d.severity}" role=${d.severity==="critical"?"alert":"status"}>
          <ha-icon icon=${Wi[d.kind]??"mdi:information-outline"}></ha-icon>
          <div><b>${this.t(d.message_key,d.params)}</b>
            ${Array.isArray(d.params.plants)&&d.params.plants.length?o`<div class="small">${d.params.plants.join(", ")}</div>`:u}</div>
        </div>`)}
      </section>`:u}

      <div class="grid">
        <section class="card span-8" aria-labelledby="today-h">
          <header><h2 id="today-h">${this.t("dash.today_tasks")}</h2><span class="spacer"></span>
            ${i.length?o`<span class="small muted">${this.t("dash.total_time",{minutes:a})}</span>`:u}</header>
          ${i.length?o`<ul class="tasks">${i.slice(0,10).map(d=>et(d,this.ctx))}</ul>`:o`<p class="empty">${this.t("dash.no_tasks")}</p>`}
          ${i.length>10?o`<button class="btn small ghost" @click=${()=>this.emit("navigate","calendar")}>${this.t("dash.show_all",{n:i.length})}</button>`:u}
        </section>

        <section class="card span-4" aria-labelledby="weather-h">
          <header><h2 id="weather-h">${this.t("dash.weather")}</h2></header>
          ${t.weather_available?o`
            <div class="days">${t.outlook.slice(0,3).map(d=>o`
              <div class="day">
                <div class="small muted">${d.day===s?this.t("common.today"):k(d.day,this.lang,{weekday:"short"})}</div>
                <div class="temp">${d.tmax!=null?Math.round(d.tmax):"\u2013"}° <span class="muted small">${d.tmin!=null?Math.round(d.tmin):"\u2013"}°</span></div>
                <div class="xs muted">💧 ${d.rain_mm} mm${d.et0_mm!=null?o` · ET₀ ${d.et0_mm}`:u}</div>
              </div>`)}</div>
            <div class="divider"></div>
            <div class="kv"><span>${this.t("dash.frost_risk")}</span><span class="chip ${Xt[t.frost.level]}">${this.t(`risk.${t.frost.level}`)}</span></div>
            ${t.frost.plant_level_min_c!=null?o`<div class="kv"><span></span><span class="muted">${this.t("dash.min_temp",{temp:t.frost.plant_level_min_c})}${t.frost.min_at?` \xB7 ${new Date(t.frost.min_at).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{weekday:"short",hour:"2-digit",minute:"2-digit"})}`:""}</span></div>`:u}
          `:o`<p class="small muted">${this.t("dash.forecast_missing")}</p>`}
          <div class="divider"></div>
          ${t.et0_today!=null?o`<div class="kv"><span>ET₀ ${this.t("common.today").toLowerCase()} <hl-info term="et0" .t=${this.t}></hl-info></span>
            <span><b>${t.et0_today.toFixed(1)} mm</b> <span class="muted xs">${t.et0_method==="penman_monteith"?"Penman-Monteith":t.et0_method==="hargreaves"?"Hargreaves":""}</span></span></div>`:u}
          ${t.gdd_today!=null?o`<div class="kv"><span>${this.t("dash.gdd_today")}</span><span><b>${t.gdd_today.toFixed(1)}</b></span></div>`:u}
          <div class="kv"><span>${this.t("dash.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span><b>${Math.round(t.gdd.season_total)}</b> <span class="muted xs">${this.t("dash.gdd_since",{date:k(t.gdd.since,this.lang)})}</span></span></div>
        </section>

        <section class="card span-8" aria-labelledby="beds-h">
          <header><h2 id="beds-h">${this.t("dash.beds")}</h2></header>
          <div class="beds">${e.beds.map(d=>this.renderBed(d.id))}</div>
        </section>

        ${this.renderWaterClimate()}

        <section class="card span-4" aria-labelledby="up-h">
          ${l.map(d=>{let h=t.zones[d.id]?.greenhouse;return o`<header><h2>${d.name}</h2><span class="spacer"></span>
                <span class="chip ${h?.action==="none"||!h?"ok":h.action==="shade"||h.action==="heat"?"bad":"warn"}">${this.t(`gh.${h?.action??"none"}`)}</span></header>
              ${t.zones[d.id]?.air_temperature!=null?o`<div class="big">${t.zones[d.id].air_temperature?.toFixed(1)}°</div>`:o`<p class="small muted">${this.t("dash.no_sensor")}</p>`}
              ${h?.limit_max_c!=null&&h.limiting_plants.length?o`<p class="small muted">${this.t("dash.limits",{min:h.limit_min_c,max:h.limit_max_c})} (${h.limiting_plants.join(", ")})</p>`:u}
              ${h?.forecast_max_c!=null?o`<p class="xs muted">↑ ${h.forecast_max_c}° · ↓ ${h.forecast_min_c??"\u2013"}°</p>`:u}
              <div class="divider"></div>`})}
          <header><h2 id="up-h">${this.t("dash.coming_up")}</h2></header>
          ${n.length?o`<ul class="tasks">${n.slice(0,8).map(d=>et(d,this.ctx))}</ul>`:o`<p class="small muted">–</p>`}
        </section>
      </div>
    `}renderWaterClimate(){let e=this.snapshot,t=e.analysis,s=e.irrigation_status,i=e.settings.irrigation,n=e.beds.filter(h=>h.irrigation_entity).length,a=e.zones.filter(h=>t.zones[h.id]?.disease&&t.zones[h.id].disease.level!=="unknown"),l=e.beds.filter(h=>t.beds[h.id]?.irrigation.action==="water"),d=h=>e.beds.find(m=>m.id===h)?.name??"";return o`<section class="card span-4" aria-labelledby="wc-h">
      <header><h2 id="wc-h">${this.t("dash.water_climate")}</h2></header>
      <div class="kv"><span>${this.t("dash.irrigation_mode")}</span><span class="chip">${this.t(`settings.irrigation_mode.${i?.mode??"advise"}`)}</span></div>
      ${s?.running?o`<div class="kv"><span class="chip ok"><ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.watering_now",{bed:d(s.bed_id)})}</span>
        <button class="btn small danger" @click=${()=>this.emit("irrigation","stop")}>${this.t("dash.stop")}</button></div>`:u}
      ${s?.last_error?o`<p class="xs" style="color:var(--hl-danger)">⚠ ${s.last_error}</p>`:u}
      <div class="kv"><span>${this.t("dash.beds_need_water")}</span><b>${l.length?l.map(h=>h.name).join(", "):"\u2013"}</b></div>
      ${n&&this.admin&&!s?.running?o`<button class="btn small" @click=${()=>this.emit("irrigation","run")}>
        <ha-icon icon="mdi:sprinkler"></ha-icon>${this.t("dash.water_now")}</button>
        <p class="xs muted">${this.t("dash.safety_note")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></p>`:u}
      ${a.length?o`<div class="divider"></div>
        <div class="kv"><span><b>${this.t("dash.disease_risk")}</b> <hl-info term="leaf_wetness" .t=${this.t}></hl-info></span></div>
        ${a.map(h=>{let m=t.zones[h.id].disease;return o`<div class="kv"><span>${h.name}</span><span class="chip ${Xt[m.level]}">${this.t(`risk.${m.level}`)}${m.wet_hours?` \xB7 ${Math.round(m.wet_hours)} h`:""}</span></div>`})}`:u}
    </section>`}renderBed(e){let t=this.snapshot,s=t.beds.find(v=>v.id===e),i=t.analysis?.beds[e],n=i?.irrigation,a=i?.moisture_status??"unknown",l=i?.sensors?.soil_temperature?.value,d=(i?.active_plantings??[]).map(v=>t.plantings.find(b=>b.id===v)).filter(Boolean),h=a==="optimal"?"ok":a==="dry"?"bad":a==="unknown"?"":a==="wet"?"cold":"warn",m=v=>Math.max(0,Math.min(100,v));return o`
      <article class="bed" aria-label=${s.name}>
        <div class="row"><h3>${s.name}</h3><span class="spacer"></span><span class="chip ${h}">${this.t(`moisture.${a}`)}</span></div>
        ${n?.moisture!=null?o`
          <div class="gauge" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(n.moisture)} aria-label=${this.t("settings.sensor.soil_moisture")}>
            ${n.target_low!=null&&n.target_high!=null?o`<div class="target" style=${`left:${m(n.target_low)}%;width:${m(n.target_high)-m(n.target_low)}%`}></div>`:u}
            <div class="value" style=${`left:${m(n.moisture)}%`}></div>
          </div>
          <div class="kv"><span>💧 ${Math.round(n.moisture)}%</span>${l!=null?o`<span>🌡 ${l.toFixed(1)} °C</span>`:u}</div>`:o`<p class="xs muted">${this.t("dash.no_sensor")}</p>`}
        ${n?o`<p class="small"><ha-icon icon="mdi:watering-can-outline" style="--mdc-icon-size:16px"></ha-icon>
          ${this.t(`irrigation.${n.action}`,{mm:n.amount_mm,liters:Math.round(n.liters)})}${n.duration_min?` \xB7 ${Math.round(n.duration_min)} min`:""}</p>`:u}
        ${i?.nutrients?.index!=null?o`<div class="kv"><span>${this.t("dash.nutrients")} <hl-info term="nutrient_index" .t=${this.t}></hl-info></span>
          <span class="chip ${i.nutrients.status==="balanced"?"ok":"warn"}">${i.nutrients.index}/100</span></div>`:u}
        ${i?.depletion_mm!=null&&i.taw_mm?o`<div class="kv xs muted"><span>${this.t("dash.water_balance")} <hl-info term="water_balance" .t=${this.t}></hl-info></span>
          <span>${Math.round(i.depletion_mm)} / ${Math.round(i.taw_mm)} mm</span></div>`:u}
        <div class="avatars" aria-label=${this.t("dash.active_crops",{n:d.length})}>
          ${d.map(v=>{let b=this.plants.get(v.plant_id),w=y(b,this.lang);return o`<span class="avatar" title=${w} style=${`background:${R(this.families,b?.family)}`}>${w.slice(0,2)}</span>`})}
        </div>
      </article>`}};ne.styles=[A,$t,T`
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
    `],p([g({attribute:!1})],ne.prototype,"snapshot",2),p([g({attribute:!1})],ne.prototype,"plants",2),p([g({attribute:!1})],ne.prototype,"families",2),p([g({attribute:!1})],ne.prototype,"t",2),p([g()],ne.prototype,"lang",2),p([g({type:Boolean})],ne.prototype,"admin",2),ne=p([j("hl-dashboard-view")],ne);var Ws={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},wt=c=>(...r)=>({_$litDirective$:c,values:r}),_t=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,e,t){this._$Ct=r,this._$AM=e,this._$Ci=t}_$AS(r,e){return this.update(r,e)}update(r,e){return this.render(...e)}};var xe=class extends _t{constructor(r){if(super(r),this.it=u,r.type!==Ws.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===u||r==null)return this._t=void 0,this.it=r;if(r===de)return r;if(typeof r!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;let e=[r];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};xe.directiveName="unsafeHTML",xe.resultType=1;var Zs=wt(xe);var tt=class extends xe{};tt.directiveName="unsafeSVG",tt.resultType=2;var Ae=wt(tt);var Y="#4f8a34",xt="#6aa648",Q="#3f7a2a",Jt="#7a5a3a",kt='fill="#fff" opacity=".32"',He=c=>`
  <rect x="10.8" y="14" width="2.4" height="8.5" rx="1" fill="${Jt}"/>
  <circle cx="12" cy="10" r="8.6" fill="${Y}"/>
  <circle cx="9.2" cy="7.6" r="4.6" fill="${xt}"/>
  <g fill="currentColor" stroke="#fff" stroke-width=".55">${c}</g>`,Se={carrot:`
    <path d="M12 9.5C12.2 6 14.5 3.6 17.4 3M12 9.5c0-3.4-.1-5.7-.3-7.5M12 9.5C10.8 6.4 8.8 4.4 6.4 3.6" stroke="${Y}" stroke-width="1.7" stroke-linecap="round" fill="none"/>
    <path d="M12 8.6c-2.4 0-3.9 1.4-3.9 3.4 0 3 1.8 7.2 3.9 10.6 2.1-3.4 3.9-7.6 3.9-10.6 0-2-1.5-3.4-3.9-3.4z" fill="currentColor"/>
    <path d="M9.4 12.8h2.1M10.4 15.8h1.8M11 18.8h1.1M12.6 11.4h1.9M12.6 14.4h1.6" stroke="rgba(0,0,0,.22)" stroke-width=".8" stroke-linecap="round"/>`,tomato:`
    <circle cx="12" cy="13.4" r="8.2" fill="currentColor"/>
    <ellipse cx="8.8" cy="11" rx="2.2" ry="1.4" ${kt}/>
    <path d="M12 6.4l1.5 2.4 2.9-.5-1.9 2 1.7 2-2.9-.6L12 14l-1.3-2.3-2.9.6 1.7-2-1.9-2 2.9.5z" fill="${Q}"/>
    <path d="M12 6.8V3.4" stroke="${Q}" stroke-width="1.5" stroke-linecap="round"/>`,pepper:`
    <path d="M5.8 10.2c0-2.6 2-3.7 3.6-3.1 1 .4 1.7.4 2.6 0s1.6-.4 2.6 0c1.6-.6 3.6.5 3.6 3.1 0 5.2-2.1 11-6.2 11S5.8 15.4 5.8 10.2z" fill="currentColor"/>
    <path d="M12 7.2V4c0-.7.6-1.1 1.4-.9" stroke="${Q}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M8.2 10.5c-.2 2.4.2 5 1.2 7" stroke="#fff" stroke-opacity=".35" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,chili:`
    <path d="M7.8 5c1.6 0 2.6 1.1 2.9 2.6 1.3 5.4 4.2 9.4 9.3 12.9-7.2.6-13.2-5.4-13.5-11.9C6.4 6.6 6.8 5 7.8 5z" fill="currentColor"/>
    <path d="M7.9 5.3C7.7 3.6 8.5 2.4 10 2" stroke="${Q}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M8.6 8.6c.6 3.4 2.6 6.4 5.6 8.6" stroke="#fff" stroke-opacity=".35" stroke-width="1" fill="none" stroke-linecap="round"/>`,eggplant:`
    <path d="M9 6.3c3.1-1 6.1 1.1 8.1 5.1 2.5 5 1 10.1-3 10.6S6 18.2 6.5 12.2C6.7 9.2 7.3 6.9 9 6.3z" fill="currentColor"/>
    <path d="M7.4 7.6c.5-3 3-4 5.6-2.7-1.2.3-2 1-2.3 2 1.3-.2 2.4.2 3.3 1.2-2.2-.3-4.5-.2-6.6-.5z" fill="${Q}"/>
    <path d="M8.6 11c0 2.6 1 5 2.6 6.6" stroke="#fff" stroke-opacity=".3" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,cucumber:`
    <g transform="rotate(-32 12 12.5)">
      <rect x="2.6" y="9" width="18.8" height="7.2" rx="3.6" fill="currentColor"/>
      <path d="M5 11h14" stroke="#fff" stroke-opacity=".3" stroke-width="1.1" stroke-linecap="round"/>
      <g fill="#fff" opacity=".45"><circle cx="7" cy="13.6" r=".6"/><circle cx="11" cy="14.2" r=".6"/><circle cx="15" cy="13.6" r=".6"/><circle cx="9" cy="12.2" r=".5"/><circle cx="13" cy="12.4" r=".5"/></g>
    </g>
    <path d="M19.4 6.6l2-1.6" stroke="${Q}" stroke-width="1.5" stroke-linecap="round"/>`,pumpkin:`
    <path d="M12 7.6V4.6c.3-.9 1.2-1.3 2.1-1.1" stroke="#6b5232" stroke-width="1.9" fill="none" stroke-linecap="round"/>
    <ellipse cx="12" cy="14" rx="9.6" ry="7.2" fill="currentColor"/>
    <path d="M12 6.9c-2.6 2-2.6 12.1 0 14.2M12 6.9c2.6 2 2.6 12.1 0 14.2M7 8.2c-2.6 2.6-2.6 9 0 11.6M17 8.2c2.6 2.6 2.6 9 0 11.6" stroke="rgba(0,0,0,.2)" stroke-width=".9" fill="none"/>`,melon:`
    <circle cx="12" cy="12.6" r="8.6" fill="currentColor"/>
    <path d="M12 4c-3 3-3 14.2 0 17.2M12 4c3 3 3 14.2 0 17.2M6 6.4c-2 3.6-2 9 0 12.2M18 6.4c2 3.6 2 9 0 12.2" stroke="rgba(0,0,0,.22)" stroke-width="1.1" fill="none"/>
    <ellipse cx="8.6" cy="9" rx="2" ry="1.2" ${kt}/>`,root:`
    <path d="M12 9.4C10.6 6.6 8.2 5 5.8 4.8c.8 2.5 3.1 4.1 6.2 4.6zM12 9.4c1.4-2.8 3.8-4.4 6.2-4.6-.8 2.5-3.1 4.1-6.2 4.6z" fill="${Y}"/>
    <path d="M12 9.6V2.6" stroke="${Y}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12 8.8c3.7 0 6 2.4 6 5.4 0 3.1-2.7 5.4-6 5.4s-6-2.3-6-5.4c0-3 2.3-5.4 6-5.4z" fill="currentColor"/>
    <path d="M12 19.4v3.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <ellipse cx="9.6" cy="12.6" rx="1.6" ry="1.1" ${kt}/>`,potato:`
    <path d="M4.8 12.6c0-4.1 3.6-6.6 7.7-6.4 4.4.2 7.1 2.8 6.7 6.6-.4 3.9-3.6 5.9-7.6 5.7-4.3-.2-6.8-1.9-6.8-5.9z" fill="currentColor"/>
    <g fill="rgba(0,0,0,.3)"><circle cx="8.8" cy="11" r=".75"/><circle cx="13.6" cy="9.4" r=".65"/><circle cx="15.7" cy="13.6" r=".75"/><circle cx="10.6" cy="15" r=".65"/></g>
    <path d="M14.5 6.6c.6-2.4 2.6-3.6 4.6-3.2-.6 2-2.3 3.2-4.6 3.2z" fill="${Y}"/>`,onion:`
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
    <path d="M12 4.2C9.6 2 6.6 2 4.6 3.4 7 5 9.6 5.2 12 4.2zM12 4.2c2.4-2.2 5.4-2.2 7.4-.8-2.4 1.6-5 1.8-7.4.8z" fill="${Y}"/>
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
    <path d="M10 13C5 12 4 6 7 2.8c3 1 4 5.2 3 10.2zM14 13c5-1 6-7 3-10.2-3 1-4 5.2-3 10.2zM12 12.2c-2-3-2-7.2 0-10.2 2 3 2 7.2 0 10.2z" fill="${Q}"/>
    <path d="M9 22.2l1-9.4M12 22.2V12M15 22.2l-1-9.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`,celery:`
    <g fill="${Y}"><circle cx="8.8" cy="7" r="2.7"/><circle cx="12" cy="4.8" r="2.9"/><circle cx="15.2" cy="7" r="2.7"/></g>
    <path d="M8 22.2l1.5-12.2M12 22.2V9M16 22.2l-1.5-12.2" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>`,fennel:`
    <path d="M10 11.6L8 3M12 11V2M14 11.6L16 3M8.8 6.4l-2-.8M9.5 8.8l-2 .2M12 5l-1.6-1M12 7.6l1.6-1M15.2 6.4l2-.8M14.5 8.8l2 .2" stroke="#5f9a3a" stroke-width="1" stroke-linecap="round"/>
    <path d="M6.4 16.2c0-3 2.6-5.2 5.6-5.2s5.6 2.2 5.6 5.2-2.6 5.6-5.6 5.6-5.6-2.6-5.6-5.6z" fill="currentColor" stroke="#b9c58a" stroke-width=".8"/>`,pea:`
    <path d="M2.8 15.2c3-4.1 9.1-7.1 16.2-8.1 1-.1 2 .7 1.5 1.7-2.5 4.4-8.5 8.4-15.5 8.9-1.5.1-2.8-1.2-2.2-2.5z" fill="currentColor"/>
    <g fill="#c4e48e"><circle cx="7.8" cy="14.4" r="1.8"/><circle cx="11.4" cy="12.8" r="1.8"/><circle cx="15" cy="10.9" r="1.7"/></g>
    <path d="M19.6 7.4c.5-2 2-2.6 2.6-1.6s-.5 2.1-1.3 1.4" stroke="${Y}" stroke-width=".9" fill="none" stroke-linecap="round"/>`,bean:`
    <path d="M4 5.8c1 6.2 4.1 11.3 10.2 14.4 2 1 4.1.5 3.6-1C14.2 16.1 9.1 11 6.6 4.8c-.6-1.2-2.7-1-2.6 1z" fill="currentColor"/>
    <path d="M6.6 8.6c.8.3 1.4 1 1.5 2M9.1 12.6c.8.3 1.4 1 1.5 2M12.1 16.1c.8.3 1.4 1 1.5 2" stroke="rgba(255,255,255,.45)" stroke-width=".9" fill="none" stroke-linecap="round"/>
    <path d="M4.4 5C4.2 3.6 5 2.6 6.4 2.4" stroke="${Q}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,corn:`
    <ellipse cx="12" cy="11" rx="4.2" ry="8.6" fill="currentColor"/>
    <path d="M8.4 7h7.2M8 10h8M8 13h8M8.5 16h7M10 3.2v15.4M14 3.2v15.4" stroke="rgba(0,0,0,.16)" stroke-width=".7"/>
    <path d="M12 22.4c-3-1-5.6-4.1-6.6-9.2 2 2 4.1 4.1 6.6 9.2zM12 22.4c3-1 5.6-4.1 6.6-9.2-2 2-4.1 4.1-6.6 9.2z" fill="${xt}"/>`,asparagus:`
    <g stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M8 22.2V7.4M12 22.2V4.2M16 22.2V8.4"/></g>
    <g fill="#5f7f3a"><path d="M6.7 8L8 4.2 9.3 8z"/><path d="M10.7 4.8L12 1 13.3 4.8z"/><path d="M14.7 9L16 5.2 17.3 9z"/></g>`,artichoke:`
    <path d="M12 20v3" stroke="#6b8f5a" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 2.8c3.1 2 6.2 5.1 6.2 9.7S15.1 20.2 12 20.2s-6.2-3.1-6.2-7.7S8.9 4.8 12 2.8z" fill="currentColor"/>
    <path d="M8 10.4c2 1 6 1 8 0M7 13.9c2.5 1.4 7.5 1.4 10 0M8.5 17.4c2 1 5 1 7 0M12 2.8v4" stroke="rgba(0,0,0,.22)" stroke-width=".9" fill="none"/>`,rhubarb:`
    <path d="M2.8 9.2c0-4.1 4.1-6.6 9.2-6.6s9.2 2.5 9.2 6.6c0 2-2 3.6-4.1 3.1-1.5 1.5-3.6 1.5-5.1.5-1.5 1-3.6 1-5.1-.5-2 .5-4.1-1-4.1-3.1z" fill="${Y}"/>
    <path d="M12 12.6V4M12 8L7 5.6M12 8l5-2.4" stroke="rgba(255,255,255,.4)" stroke-width=".9" fill="none"/>
    <path d="M9.2 22.2l2-10M13.2 22.2l.9-10" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>`,strawberry:`
    <path d="M12 21.2c-4.1-2-7.6-6.6-7.6-10.6 0-3 2.5-4.6 4.6-4.1 1.2.3 2 .8 3 .8s1.8-.5 3-.8c2.1-.5 4.6 1.1 4.6 4.1 0 4-3.5 8.6-7.6 10.6z" fill="currentColor"/>
    <g fill="#f7e27a"><circle cx="9" cy="10.2" r=".55"/><circle cx="12" cy="11" r=".55"/><circle cx="15" cy="10.2" r=".55"/><circle cx="10.5" cy="13.6" r=".55"/><circle cx="13.5" cy="13.6" r=".55"/><circle cx="12" cy="16.6" r=".55"/><circle cx="8" cy="12.9" r=".5"/><circle cx="16" cy="12.9" r=".5"/></g>
    <path d="M6.8 7.4c1.6-1.1 3.2-1.3 5.2 0 2-1.3 3.6-1.1 5.2 0-1.6.9-3.4 1.1-5.2.3-1.8.8-3.6.6-5.2-.3zM12 7.4V3.4" fill="${Q}" stroke="${Q}" stroke-width="1" stroke-linecap="round"/>`,berry:`
    <path d="M12 8.6C12 5.6 14 3.6 16.6 3.4" stroke="${Q}" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.18)" stroke-width=".5"><circle cx="9" cy="11" r="3.5"/><circle cx="15" cy="11" r="3.5"/><circle cx="12" cy="16.4" r="3.5"/></g>
    <g ${kt}><circle cx="8" cy="10" r=".9"/><circle cx="14" cy="10" r=".9"/><circle cx="11" cy="15.4" r=".9"/></g>`,currant:`
    <path d="M14.2 4.4c2-1.6 4.6-1.6 6.6 0-2 1.4-4.6 1.4-6.6 0z" fill="${Y}"/>
    <path d="M8 2.8c2 1 3 3 4 6s3 7 4 12.2" stroke="#6b5232" stroke-width=".9" fill="none"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.25)" stroke-width=".5"><circle cx="11" cy="8" r="2.1"/><circle cx="14.2" cy="10.6" r="2.2"/><circle cx="11.6" cy="13.2" r="2.3"/><circle cx="15" cy="16" r="2.3"/><circle cx="12.6" cy="18.9" r="2.3"/></g>`,berry_bush:`
    <circle cx="12" cy="12.6" r="9.2" fill="${Y}"/>
    <circle cx="9" cy="10" r="4.1" fill="${xt}"/><circle cx="15" cy="11" r="4" fill="${xt}" opacity=".7"/>
    <g fill="currentColor" stroke="#fff" stroke-width=".55"><circle cx="8" cy="13.2" r="1.6"/><circle cx="14" cy="8" r="1.6"/><circle cx="16.2" cy="14.6" r="1.6"/><circle cx="11" cy="17.6" r="1.6"/><circle cx="11.4" cy="10.6" r="1.5"/></g>`,cane:`
    <path d="M6.8 22.4C6.8 15 8 8 10 2.8M12 22.4c0-7 1-12.2 3-17.2M17.2 22.4c0-6.2 0-10.2 1.5-14" stroke="${Jt}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <g fill="${Y}"><ellipse cx="6" cy="9" rx="2.6" ry="1.4" transform="rotate(-30 6 9)"/><ellipse cx="17.6" cy="5.8" rx="2.6" ry="1.4" transform="rotate(30 17.6 5.8)"/><ellipse cx="20.2" cy="12" rx="2.4" ry="1.3" transform="rotate(20 20.2 12)"/></g>
    <g fill="currentColor" stroke="rgba(0,0,0,.2)" stroke-width=".5"><circle cx="9.4" cy="12.4" r="2.2"/><circle cx="14" cy="9.2" r="2.2"/><circle cx="13.2" cy="16.4" r="2.1"/><circle cx="18.6" cy="16.2" r="2"/></g>`,grape:`
    <path d="M12.6 5.6V2.6c0-.6.6-1 1.4-.9" stroke="#6b5232" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M14 4.2c2-2 5-2 7 0-2 1.5-4.6 1.6-7 0z" fill="${Y}"/>
    <g fill="currentColor" stroke="rgba(0,0,0,.2)" stroke-width=".5"><circle cx="7.8" cy="8" r="2.5"/><circle cx="12.4" cy="8" r="2.5"/><circle cx="17" cy="8" r="2.5"/><circle cx="10" cy="12.2" r="2.5"/><circle cx="14.6" cy="12.2" r="2.5"/><circle cx="12.2" cy="16.4" r="2.5"/><circle cx="12.2" cy="20.4" r="2.1"/></g>`,tree_apple:He('<circle cx="7.8" cy="11" r="1.7"/><circle cx="13" cy="6.4" r="1.7"/><circle cx="15.9" cy="11.6" r="1.7"/><circle cx="11" cy="13.8" r="1.6"/>'),tree_pear:He('<ellipse cx="7.8" cy="11" rx="1.3" ry="1.9"/><ellipse cx="13" cy="6.4" rx="1.3" ry="1.9"/><ellipse cx="15.9" cy="11.6" rx="1.3" ry="1.9"/><ellipse cx="11" cy="14" rx="1.3" ry="1.8"/>'),tree_plum:He('<ellipse cx="8" cy="11" rx="1.4" ry="1.8"/><ellipse cx="13" cy="6.6" rx="1.4" ry="1.8"/><ellipse cx="15.8" cy="11.6" rx="1.4" ry="1.8"/><ellipse cx="11" cy="14" rx="1.4" ry="1.7"/><ellipse cx="10" cy="7.6" rx="1.3" ry="1.6"/>'),tree_cherry:He('<circle cx="7.4" cy="11.6" r="1.3"/><circle cx="9.4" cy="12" r="1.3"/><circle cx="13" cy="7" r="1.3"/><circle cx="15" cy="7.4" r="1.3"/><circle cx="14.8" cy="12.4" r="1.3"/><circle cx="16.8" cy="12" r="1.3"/>'),tree_fig:He('<path d="M8 9.4c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/><path d="M14.2 4.8c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/><path d="M15.6 10.6c1 1.1 1.8 2.2 1.8 3.2a1.8 1.8 0 01-3.6 0c0-1 .8-2.1 1.8-3.2z"/>'),tree_nut:He('<circle cx="8" cy="11.4" r="1.5"/><circle cx="13.2" cy="6.8" r="1.5"/><circle cx="15.8" cy="12" r="1.5"/><circle cx="11" cy="14" r="1.4"/>'),tree:`
    <rect x="10.8" y="14" width="2.4" height="8.5" rx="1" fill="${Jt}"/>
    <circle cx="12" cy="10" r="8.6" fill="currentColor"/>
    <circle cx="9.2" cy="7.6" r="4.6" fill="#fff" opacity=".18"/>`,sunflower:`
    <g fill="currentColor">${Array.from({length:12},(c,r)=>`<ellipse cx="12" cy="4.6" rx="1.7" ry="3.4" transform="rotate(${r*30} 12 12)"/>`).join("")}</g>
    <circle cx="12" cy="12" r="4.4" fill="#6b4a2a"/>
    <g fill="#3f2a18"><circle cx="11" cy="11" r=".6"/><circle cx="13" cy="11.6" r=".6"/><circle cx="11.6" cy="13.2" r=".6"/><circle cx="13.4" cy="13.6" r=".5"/></g>`,flower:`
    <path d="M12 22.4V14" stroke="${Y}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12 18.4c-1.6-2.4-4-3-5.6-2.4 1.2 2 3.4 2.8 5.6 2.4z" fill="${Y}"/>
    <g fill="currentColor">${Array.from({length:5},(c,r)=>`<circle cx="12" cy="5.6" r="3.2" transform="rotate(${r*72} 12 10)"/>`).join("")}</g>
    <circle cx="12" cy="10" r="2.3" fill="#f4c430" stroke="#c9952a" stroke-width=".5"/>`,lavender:`
    <path d="M12 22.4C12 16 11 10 9 5M12 22.4c0-6 .4-12 .4-18.4M12 22.4c0-6 1.4-11 3.6-16" stroke="#7a9a6a" stroke-width="1" fill="none" stroke-linecap="round"/>
    <g fill="currentColor">${[[9,5],[9.6,7.4],[10.2,9.8],[12.4,3.4],[12.4,6],[12.4,8.6],[15.6,6],[15,8.4],[14.4,10.8]].map(([c,r])=>`<ellipse cx="${c}" cy="${r}" rx="1.1" ry="1.5"/>`).join("")}</g>`,herb:`
    <path d="M12 22.4V3.4" stroke="${Q}" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="currentColor">${[[4.6,-35],[8.6,35],[12.6,-35],[16.6,35]].map(([c,r])=>`<ellipse cx="${r<0?8.4:15.6}" cy="${c+1}" rx="3.6" ry="1.8" transform="rotate(${r} ${r<0?8.4:15.6} ${c+1})"/>`).join("")}
      <ellipse cx="12" cy="3.2" rx="1.6" ry="2.4"/></g>`,umbel:`
    <path d="M12 22.4V12.4M12 12.4L6 6.4M12 12.4L9 4.6M12 12.4l3-7.8M12 12.4l6-6" stroke="#5f9a3a" stroke-width="1" stroke-linecap="round"/>
    <g fill="currentColor">${[[6,6.4],[9,4.6],[15,4.6],[18,6.4],[12,4]].map(([c,r])=>`<circle cx="${c}" cy="${r}" r="1.9"/>`).join("")}</g>`,clover:`
    <path d="M12 22.4v-9" stroke="${Q}" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="currentColor" stroke="${Q}" stroke-width=".6">${[0,120,240].map(c=>`<path d="M12 12c-1.6-1.6-4.6-1.4-4.6-4.2 0-1.6 1.4-2.6 2.6-2.2.4-1.4 2-2 2-2s1.6.6 2 2c1.2-.4 2.6.6 2.6 2.2 0 2.8-3 2.6-4.6 4.2z" transform="rotate(${c} 12 12)"/>`).join("")}</g>`,grain:`
    <path d="M12 22.4V4" stroke="#a88a4a" stroke-width="1.1" stroke-linecap="round"/>
    <g fill="currentColor">${[5,8,11,14].map(c=>`<ellipse cx="10" cy="${c}" rx="1.4" ry="2.3" transform="rotate(-25 10 ${c})"/><ellipse cx="14" cy="${c}" rx="1.4" ry="2.3" transform="rotate(25 14 ${c})"/>`).join("")}
      <ellipse cx="12" cy="2.8" rx="1.2" ry="2"/></g>`};function ee(c){return c?.icon&&Se[c.icon]?c.icon:c?.category==="herb"?"herb":c?.category==="flower"?"flower":c?.category==="fruit"?"berry_bush":c?.habit==="root"?"root":c?.habit==="bulb"?"onion":"leafy"}function Ks(){let c=Object.entries(Se).map(([r,e])=>`<symbol id="pg-${r}" viewBox="0 0 24 24" overflow="visible">${e}</symbol>`).join("");return M`${Ae(c)}`}function St(c,r,e,t,s){return M`<use href=${`#pg-${c}`} x=${r-t/2} y=${e-t/2} width=${t} height=${t} style=${`color:${s}`}></use>`}function oe(c,r,e=28){return o`<svg class="plant-glyph" viewBox="0 0 24 24" width=${e} height=${e} style=${`color:${r}`} aria-hidden="true"
    >${Ae(Se[c]??Se.leafy)}</svg
  >`}var q=(c,r)=>r>0?Math.round(c/r)*r:c,Ie=c=>({x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm}),Oe=c=>({x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm}),Ys=(c,r)=>({x:r.x_cm+c.x_cm,y:r.y_cm+c.y_cm,w:c.width_cm,h:c.length_cm}),Zi=(c,r,e)=>r>=c.x&&r<=c.x+c.w&&e>=c.y&&e<=c.y+c.h;function ce(c,r){let e=Math.min(c.w,r.w),t=Math.min(c.h,r.h);return{x:Math.min(Math.max(c.x,r.x),r.x+r.w-e),y:Math.min(Math.max(c.y,r.y),r.y+r.h-t),w:e,h:t}}function Ki(c,r){return c.x<r.x+r.w&&r.x<c.x+c.w&&c.y<r.y+r.h&&r.y<c.y+c.h}function Xs(c,r,e){for(let t=c.length-1;t>=0;t--)if(Zi(Ie(c[t]),r,e))return c[t]}function st(c,r,e){let t=Math.max(c.spacing_cm,5);if(r==="single")return{w:t,h:t};if(r==="row"){let i=e.width_cm>=e.length_cm,n=Math.max(Math.min(c.row_spacing_cm,40),10);return i?{w:e.width_cm,h:n}:{w:n,h:e.length_cm}}let s=Math.min(Math.max(t*2,30),Math.min(e.width_cm,e.length_cm));return{w:s,h:s}}function Qt(c,r){let e={x:c.x_cm,y:c.y_cm,w:c.width_cm,h:c.length_cm};if(c.layout==="single")return[[e.x+e.w/2,e.y+e.h/2]];let t=Math.max(r.spacing_cm,1);if(c.layout==="row"){let a=e.w>=e.h,l=a?e.w:e.h,d=a?e.h:e.w,h=Math.max(1,Math.floor(l/t)),m=Math.max(1,Math.floor(d/Math.max(r.row_spacing_cm,1))),v=[];for(let b=0;b<m;b++)for(let w=0;w<h;w++){let $=l/h*(w+.5),x=d/m*(b+.5);v.push(a?[e.x+$,e.y+x]:[e.x+x,e.y+$])}return v}let s=Math.max(1,Math.floor(e.w/t)),i=Math.max(1,Math.floor(e.h/t)),n=[];for(let a=0;a<i;a++)for(let l=0;l<s;l++)n.push([e.x+e.w/s*(l+.5),e.y+e.h/i*(a+.5)]);return n}function Js(c,r){return c.count&&c.count>0?c.count:Qt(c,r).length}function Me(c,r,e,t){let s=Math.max(t,5);for(let i=0;i+r.h<=c.length_cm+.01;i+=s)for(let n=0;n+r.w<=c.width_cm+.01;n+=s){let a={x:n,y:i,w:r.w,h:r.h};if(!e.some(l=>Ki(a,l)))return{x:n,y:i}}return null}function Mt(c,r,e=[]){let t=[...c.map(Oe),...r.map(Ie),...e];if(!t.length)return{x:0,y:0,w:600,h:400};let s=Math.min(...t.map(l=>l.x)),i=Math.min(...t.map(l=>l.y)),n=Math.max(...t.map(l=>l.x+l.w)),a=Math.max(...t.map(l=>l.y+l.h));return{x:s,y:i,w:n-s,h:a-i}}function Vt(c,r){if(c.length<2)return c.map(a=>({...a}));let e=c.map(a=>({...a})),t=Math.min(...c.map(a=>a.x)),s=Math.max(...c.map(a=>a.x+a.w)),i=Math.min(...c.map(a=>a.y)),n=Math.max(...c.map(a=>a.y+a.h));switch(r){case"left":e.forEach(a=>a.x=t);break;case"right":e.forEach(a=>a.x=s-a.w);break;case"top":e.forEach(a=>a.y=i);break;case"bottom":e.forEach(a=>a.y=n-a.h);break;case"hcenter":e.forEach(a=>a.x=(t+s)/2-a.w/2);break;case"vcenter":e.forEach(a=>a.y=(i+n)/2-a.h/2);break;case"hdistribute":{let a=e.map((h,m)=>[h,m]).sort((h,m)=>h[0].x-m[0].x),l=(s-t-a.reduce((h,[m])=>h+m.w,0))/(a.length-1),d=t;for(let[h]of a)h.x=d,d+=h.w+l;break}case"vdistribute":{let a=e.map((h,m)=>[h,m]).sort((h,m)=>h[0].y-m[0].y),l=(n-i-a.reduce((h,[m])=>h+m.h,0))/(a.length-1),d=i;for(let[h]of a)h.y=d,d+=h.h+l;break}}return e.map(a=>({...a,x:Math.round(a.x),y:Math.round(a.y)}))}var Ee={path:{fill:"#e3d6bd",stroke:"#b3a283",icon:"\u{1F6B6}",pattern:"gravel",opacity:.95},terrace:{fill:"#cfc6b8",stroke:"#8f8577",icon:"\u2615",pattern:"tiles",opacity:.95},lawn:{fill:"#9cc46a",stroke:"#6f9a45",icon:"\u{1F331}",pattern:"grass",opacity:.7},flowerbed:{fill:"#d7e8b8",stroke:"#8fae6a",icon:"\u{1F338}",pattern:"flowers",opacity:.85},compost:{fill:"#8a6a45",stroke:"#5c442a",icon:"\u267B",opacity:.7},water_butt:{fill:"#4c8fbf",stroke:"#2d6a96",icon:"\u{1F4A7}",opacity:.7},pond:{fill:"#7fb6d9",stroke:"#3f7fa8",icon:"\u{1F438}",pattern:"water",opacity:.85},shed:{fill:"#9aa3a0",stroke:"#6b7370",icon:"\u{1F3E0}",pattern:"roof",opacity:.85},tree:{fill:"#4e7d3a",stroke:"#2f5222",icon:"\u{1F333}",opacity:.5},hedge:{fill:"#5f8f45",stroke:"#3d6b2a",icon:"\u{1F33F}",pattern:"hedge",opacity:.8},fence:{fill:"#8a6a45",stroke:"#5c442a",icon:"\u{1FAB5}",opacity:.9},trellis:{fill:"#7a5c3e",stroke:"#5a3f25",icon:"\u256B",opacity:.6},house:{fill:"#c9b8a8",stroke:"#7d6a5a",icon:"\u{1F3E0}",pattern:"house",opacity:.95},driveway:{fill:"#d2ccc2",stroke:"#9a9285",icon:"\u{1F697}",pattern:"pavers",opacity:.95},parking:{fill:"#d2ccc2",stroke:"#9a9285",icon:"\u{1F17F}\uFE0F",pattern:"pavers",opacity:.95},street:{fill:"#8f9294",stroke:"#5f6264",icon:"\u{1F6E3}\uFE0F",pattern:"asphalt",opacity:.95},play:{fill:"#efe0a0",stroke:"#c2a84a",icon:"\u{1F6DD}",opacity:.7},beehive:{fill:"#f2c230",stroke:"#b5841a",icon:"\u{1F41D}",opacity:.85},stone_path:{fill:"#cfc8bd",stroke:"#958d80",icon:"\u{1FAA8}",pattern:"flagstones",opacity:.95},wood_path:{fill:"#c39463",stroke:"#8a6238",icon:"\u{1FAB5}",pattern:"planks",opacity:.95},stepping_stones:{fill:"#a6cc72",stroke:"#8f887c",icon:"\u{1F463}",pattern:"stepping",opacity:.9},bark_path:{fill:"#a07a52",stroke:"#7d5a38",icon:"\u{1F7EB}",pattern:"bark",opacity:.9},decking:{fill:"#c39463",stroke:"#8a6238",icon:"\u{1FA91}",pattern:"planks",opacity:.95},wall:{fill:"#b07a5c",stroke:"#7d4f36",icon:"\u{1F9F1}",pattern:"bricks",opacity:.95},carport:{fill:"#a4aca9",stroke:"#6b7370",icon:"\u{1F699}",pattern:"roof",opacity:.85},shrub:{fill:"#5f8f45",stroke:"#3d6b2a",icon:"\u{1F333}",pattern:"hedge",opacity:.75},pool:{fill:"#5fb0e0",stroke:"#2d7fb0",icon:"\u{1F3CA}",pattern:"pool",opacity:.95},seating:{fill:"#d9c7a3",stroke:"#9c8460",icon:"\u{1FA91}",pattern:"tiles",opacity:.85},other:{fill:"#b4b4b4",stroke:"#888",icon:"\u2022",opacity:.55}},X={outdoor:{fill:"var(--hl-zone-outdoor)",stroke:"var(--hl-leaf-300)",dash:"8 4",icon:"\u{1F955}"},greenhouse:{fill:"var(--hl-zone-greenhouse)",stroke:"var(--hl-frost-500)",dash:"none",icon:"\u{1F3E1}"},cold_frame:{fill:"var(--hl-zone-greenhouse)",stroke:"var(--hl-frost-500)",dash:"3 3",icon:"\u{1FA9F}"},orchard:{fill:"rgba(120, 170, 80, 0.16)",stroke:"#6f9a45",dash:"10 4",icon:"\u{1F34E}"},fruit:{fill:"rgba(200, 60, 90, 0.08)",stroke:"#c8506a",dash:"10 4",icon:"\u{1FAD0}"},herbs:{fill:"rgba(80, 110, 176, 0.09)",stroke:"#6a84c0",dash:"10 4",icon:"\u{1F33F}"},flowers:{fill:"rgba(224, 106, 160, 0.09)",stroke:"#d27aa8",dash:"10 4",icon:"\u{1F338}"},garden:{fill:"rgba(110, 150, 90, 0.10)",stroke:"#7a9a5a",dash:"10 4",icon:"\u{1F3E1}"},containers:{fill:"rgba(176, 122, 92, 0.10)",stroke:"#b07a5c",dash:"4 3",icon:"\u{1FAB4}"}},Qs={friend:{color:"var(--hl-leaf-500)",dash:"none",width:2},pest_synergy:{color:"var(--hl-leaf-600)",dash:"2 3",width:2},enemy:{color:"var(--hl-tomato-500)",dash:"6 4",width:2.5},allelopathy:{color:"#8e5ba8",dash:"6 4",width:2.5},competition:{color:"var(--hl-sun-500)",dash:"3 3",width:2},shading:{color:"#6b7370",dash:"1 4",width:2.5},overlap:{color:"var(--hl-sun-500)",dash:"6 4",width:2.5}};var Vs={dry:"#c8432f",slightly_dry:"#e8a33d",optimal:"#4c8c3f",wet:"#3a7ca5",unknown:"transparent"},S=class extends E{constructor(){super(...arguments);this.zones=[];this.beds=[];this.plantings=[];this.features=[];this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.plants=new Map;this.families={};this.selection=null;this.ghost=null;this.reports={};this.timelines={};this.analysis=null;this.lang="en";this.snapStep=10;this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.readonly=!1;this.lockLayout=!1;this.focusZone="";this.drawTool=null;this.drawRect=null;this.k=1;this.tx=20;this.ty=20;this.preview=null;this.drag=null;this.pendingSelect=null;this.fitted=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.fitted||this.fit()}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}updated(e){!this.fitted&&(e.has("zones")||e.has("beds"))&&(this.zones.length||this.beds.length)&&this.fit()}fit(){let e=this.getBoundingClientRect();if(!e.width||!e.height)return;let t=Mt(this.zones,this.beds,this.features.map(i=>({x:i.x_cm,y:i.y_cm,w:i.width_cm,h:i.length_cm}))),s=32;this.k=Math.max(.2,Math.min((e.width-s*2)/t.w,(e.height-s*2)/t.h,6)),this.tx=s-t.x*this.k+(e.width-s*2-t.w*this.k)/2,this.ty=s-t.y*this.k+(e.height-s*2-t.h*this.k)/2,this.fitted=!0}fitRect(e,t=40){let s=this.getBoundingClientRect();!s.width||!s.height||!e.w||!e.h||(this.k=Math.max(.2,Math.min((s.width-t*2)/e.w,(s.height-t*2)/e.h,8)),this.tx=t-e.x*this.k+(s.width-t*2-e.w*this.k)/2,this.ty=t-e.y*this.k+(s.height-t*2-e.h*this.k)/2,this.fitted=!0)}zoom(e,t,s){let i=this.getBoundingClientRect(),n=t??i.width/2,a=s??i.height/2,l=Math.max(.15,Math.min(this.k*e,12));this.tx=n-(n-this.tx)*l/this.k,this.ty=a-(a-this.ty)*l/this.k,this.k=l}clientToCanvas(e,t){let s=this.getBoundingClientRect();return e<s.left||e>s.right||t<s.top||t>s.bottom?null:{x:(e-s.left-this.tx)/this.k,y:(t-s.top-this.ty)/this.k}}focusCanvas(){this.svgEl?.focus()}rectOf(e,t){if(e==="feature"){let n=this.features.find(a=>a.id===t);return n?{x:n.x_cm,y:n.y_cm,w:n.width_cm,h:n.length_cm}:null}if(e==="zone"){let n=this.zones.find(a=>a.id===t);return n?Oe(n):null}if(e==="bed"){let n=this.beds.find(a=>a.id===t);return n?Ie(n):null}let s=this.plantings.find(n=>n.id===t),i=s&&this.beds.find(n=>n.id===s.bed_id);return s&&i?Ys(s,i):null}onPointerDown(e,t,s,i=!1){if(e.button!==0&&e.pointerType==="mouse")return;e.stopPropagation();let n=this.clientToCanvas(e.clientX,e.clientY);if(n){if(this.svgEl.setPointerCapture(e.pointerId),this.drawTool&&!i){let a=this.snapOn?this.snapStep:1,l=q(n.x,a),d=q(n.y,a);this.drag={mode:"draw",pointerId:e.pointerId,startX:l,startY:d,origin:{x:l,y:d,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1},this.drawRect={x:l,y:d,w:0,h:0};return}if(t&&s){let a=e.shiftKey||e.ctrlKey||e.metaKey;if(this.multi.some(h=>h.kind===t&&h.id===s)&&!a&&!i?this.pendingSelect={kind:t,id:s}:this.dispatchEvent(new CustomEvent("select",{detail:{kind:t,id:s,additive:a}})),a)return;let d=this.rectOf(t,s);if(!d||this.readonly||this.lockLayout&&t!=="planting"){this.drag={mode:"pan",pointerId:e.pointerId,startX:n.x,startY:n.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1};return}this.drag={mode:i?"resize":"move",kind:t,id:s,pointerId:e.pointerId,startX:n.x,startY:n.y,origin:d,startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1}}else this.dispatchEvent(new CustomEvent("select",{detail:null})),this.drag={mode:"pan",pointerId:e.pointerId,startX:n.x,startY:n.y,origin:{x:0,y:0,w:0,h:0},startTx:this.tx,startTy:this.ty,clientX:e.clientX,clientY:e.clientY,moved:!1}}}onPointerMove(e){let t=this.drag;if(!t||t.pointerId!==e.pointerId)return;if(Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)>3&&(t.moved=!0),t.mode==="pan"){this.tx=t.startTx+(e.clientX-t.clientX),this.ty=t.startTy+(e.clientY-t.clientY);return}let s=this.clientToCanvas(e.clientX,e.clientY);if(t.mode==="draw"){if(!s)return;let d=this.snapOn?this.snapStep:1,h=q(s.x,d),m=q(s.y,d);this.drawRect={x:Math.min(t.startX,h),y:Math.min(t.startY,m),w:Math.abs(h-t.startX),h:Math.abs(m-t.startY)};return}if(!s||!t.kind||!t.id)return;let i=s.x-t.startX,n=s.y-t.startY,a=this.snapOn?this.snapStep:1,l;if(t.mode==="move")if(l={...t.origin,x:t.origin.x+i,y:t.origin.y+n},t.kind==="planting"){let d=this.beds.find(h=>h.id===this.plantings.find(m=>m.id===t.id)?.bed_id);d&&(l.x=d.x_cm+q(l.x-d.x_cm,a),l.y=d.y_cm+q(l.y-d.y_cm,a))}else l.x=q(l.x,a),l.y=q(l.y,a);else if(l={...t.origin,w:Math.max(a,q(t.origin.w+i,a)),h:Math.max(a,q(t.origin.h+n,a))},t.kind==="planting"){let d=this.beds.find(h=>h.id===this.plantings.find(m=>m.id===t.id)?.bed_id);d&&(l=ce(l,Ie(d)))}this.preview={kind:t.kind,id:t.id,rect:l}}onPointerUp(e){let t=this.drag;if(!t||t.pointerId!==e.pointerId)return;if(this.drag=null,this.svgEl.hasPointerCapture(e.pointerId)&&this.svgEl.releasePointerCapture(e.pointerId),t.mode==="draw"){let l=this.drawRect??t.origin;this.drawRect=null;let d=t.moved&&l.w>0&&l.h>0?l:{x:t.startX,y:t.startY,w:0,h:0};this.dispatchEvent(new CustomEvent("draw-rect",{detail:d}));return}let s=this.preview;this.preview=null;let i=this.pendingSelect;if(this.pendingSelect=null,i&&!t.moved&&this.dispatchEvent(new CustomEvent("select",{detail:i})),!s||!t.moved||t.mode==="pan")return;let n;if(s.kind==="planting"){let l=s.rect.x+s.rect.w/2,d=s.rect.y+s.rect.h/2;n=[...this.beds].reverse().find(m=>l>=m.x_cm&&l<=m.x_cm+m.width_cm&&d>=m.y_cm&&d<=m.y_cm+m.length_cm)?.id}let a=t.mode==="move"&&this.multi.length>1&&this.multi.some(l=>l.kind===s.kind&&l.id===s.id);this.dispatchEvent(new CustomEvent("item-change",{detail:{kind:s.kind,id:s.id,rect:s.rect,targetBedId:n,dx:s.rect.x-t.origin.x,dy:s.rect.y-t.origin.y,group:a}}))}onWheel(e){e.preventDefault();let t=this.getBoundingClientRect();this.zoom(e.deltaY<0?1.12:1/1.12,e.clientX-t.left,e.clientY-t.top)}effectiveRect(e,t,s){if(this.preview&&this.preview.kind===e&&this.preview.id===t)return this.preview.rect;let i=this.preview;if(i&&i.kind===e&&this.drag?.mode==="move"&&this.multi.length>1&&this.multi.some(n=>n.kind===e&&n.id===t)&&this.multi.some(n=>n.kind===i.kind&&n.id===i.id)){let n=this.drag.origin;return{...s,x:s.x+(i.rect.x-n.x),y:s.y+(i.rect.y-n.y)}}return s}renderFeature(e){let t=this.effectiveRect("feature",e.id,{x:e.x_cm,y:e.y_cm,w:e.width_cm,h:e.length_cm}),s=Ee[e.type]??Ee.other,i=11/this.k,n=t.x+t.w/2,a=t.y+t.h/2,l=e.type==="tree"||e.type==="water_butt"||e.type==="pond"||e.type==="shrub",d;if(e.type==="tree"){let m=Math.min(t.w,t.h);d=M`<ellipse cx=${n} cy=${a} rx=${t.w/2} ry=${t.h/2} fill="#2f5222" fill-opacity="0.12" stroke=${s.stroke} stroke-width="1.2"
          stroke-dasharray="4 3" vector-effect="non-scaling-stroke"></ellipse>
        ${St("tree",n,a,m*.95,"#4e7d3a")}`}else if(e.type==="fence"){let m=t.w>=t.h,v=m?t.w:t.h,b=Math.max(1,Math.round(v/100)),w=Array.from({length:b+1},($,x)=>v/b*x);d=M`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} fill="transparent"></rect>
        <line x1=${m?t.x:n} y1=${m?a:t.y} x2=${m?t.x+t.w:n} y2=${m?a:t.y+t.h}
          stroke=${s.stroke} stroke-width="3" vector-effect="non-scaling-stroke" stroke-linecap="round"></line>
        ${w.map($=>M`<rect x=${(m?t.x+$:n)-4} y=${(m?a:t.y+$)-4} width="8" height="8" fill=${s.fill} stroke=${s.stroke}
          stroke-width="1" vector-effect="non-scaling-stroke"></rect>`)}`}else l?d=M`<ellipse cx=${n} cy=${a} rx=${t.w/2} ry=${t.h/2} fill=${s.pattern?`url(#feat-${s.pattern})`:s.fill}
        fill-opacity=${s.opacity??.6} stroke=${s.stroke} stroke-width="1.5" vector-effect="non-scaling-stroke"></ellipse>`:d=M`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${e.type==="path"?2/this.k:4/this.k}
        fill=${s.pattern?`url(#feat-${s.pattern})`:s.fill} fill-opacity=${s.opacity??.6} stroke=${s.stroke} stroke-width="1.2"
        vector-effect="non-scaling-stroke" stroke-dasharray=${e.type==="trellis"?"6 3":"none"}></rect>`;let h=e.type!=="fence"&&t.w*this.k>44&&t.h*this.k>16;return M`<g role="button" aria-label=${`${e.name} (${this.t(`feature.${e.type}`)})`} @pointerdown=${m=>this.onPointerDown(m,"feature",e.id)} style="cursor:move">
      <title>${e.name} · ${this.t(`feature.${e.type}`)}</title>
      ${d}
      ${h?this.renderPill(n,e.type==="tree"?t.y+t.h-i:a,`${s.icon} ${e.name}`.trim(),i):u}
    </g>`}zoneDelta(e){if(this.preview?.kind!=="zone"||this.preview.id!==e||this.drag?.mode!=="move")return{dx:0,dy:0};let t=this.zones.find(s=>s.id===e);return t?{dx:this.preview.rect.x-t.x_cm,dy:this.preview.rect.y-t.y_cm}:{dx:0,dy:0}}bedAbs(e){let{dx:t,dy:s}=this.zoneDelta(e.zone_id),i={...Ie(e),x:e.x_cm+t,y:e.y_cm+s};return this.effectiveRect("bed",e.id,i)}renderGrid(){let e=Math.max(this.snapStep,5);return M`
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
        ${Ks()}
      </defs>
      <rect x="-5000" y="-5000" width="10000" height="10000" fill=${e*this.k>=5?"url(#major)":"url(#major-only)"}></rect>
    `}renderZone(e){let t=this.effectiveRect("zone",e.id,Oe(e)),s=e.type==="greenhouse"||e.type==="cold_frame",i=X[e.type]??X.outdoor,n=12/this.k,a=this.t(`settings.zone_type.${e.type}`),l=e.name.toLowerCase()===a.toLowerCase()?`${i.icon} ${e.name}`:`${i.icon} ${e.name} \xB7 ${a}`,d=this.focusZone===e.id;return M`
      <g role="button" aria-label=${l} @pointerdown=${h=>this.onPointerDown(h,"zone",e.id)}
        @dblclick=${()=>this.dispatchEvent(new CustomEvent("zone-open",{detail:e.id}))}>
        <rect class="zone-rect" x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${8/this.k}
          fill=${i.fill} stroke=${i.stroke} stroke-dasharray=${i.dash} stroke-width=${d?2.5:1.5}></rect>
        ${s?M`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} fill="url(#glass)" pointer-events="none"></rect>`:u}
        <text class="label zone-label" x=${t.x+2/this.k} y=${t.y-n*.5} font-size=${n} font-weight="700">${l}</text>
      </g>`}renderBed(e){let t=this.bedAbs(e),s=12/this.k,i=this.analysis?.beds[e.id],n=i?.moisture_status??"unknown",a=this.showMoisture&&n!=="unknown"?Vs[n]:"rgba(46,33,24,0.45)",l=this.zones.find(x=>x.id===e.zone_id)?.type??"outdoor",d=l==="orchard"||l==="fruit",h=l==="orchard"?"url(#feat-grass)":l==="fruit"?"url(#bark-mulch)":e.kind==="container"?"var(--hl-container-fill)":e.kind==="raised"?"var(--hl-bed-fill-raised)":"var(--hl-bed-fill)",m=e.kind==="container"?Math.min(t.w,t.h)/4:4/this.k,v=i?.irrigation.moisture,b=i?.sensors?.soil_temperature?.value,w=this.reports[e.id]??i?.compatibility,$=(w?.pairs.filter(x=>x.severity!=="info").length??0)+(w?.rotation?.length??0);return M`
      <g role="button" aria-label=${`${e.name}, ${this.t(`kind.${e.kind}`)}, ${Math.round(e.width_cm)} \xD7 ${Math.round(e.length_cm)} cm`}
        @pointerdown=${x=>this.onPointerDown(x,"bed",e.id)}>
        <rect class="bed-rect" x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${m} fill=${h}
          stroke=${a} stroke-width=${this.showMoisture&&n!=="unknown"?3:1.5}></rect>
        ${d?u:M`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${m} fill="url(#soil)" pointer-events="none"></rect>`}
        ${this.showMoisture&&n!=="unknown"?M`<rect x=${t.x} y=${t.y} width=${t.w} height=${t.h} rx=${m} fill=${Vs[n]} opacity="0.12" pointer-events="none"></rect>`:u}
        ${d||t.w*this.k<50?u:M`<text class="label on-soil" x=${t.x+6/this.k} y=${t.y+t.h-6/this.k} font-size=${s} font-weight="600">${e.name}</text>`}
        ${this.showMoisture&&v!=null?M`<text class="label on-soil" x=${t.x+t.w-6/this.k} y=${t.y+t.h-6/this.k} font-size=${s*.95} text-anchor="end">💧 ${Math.round(v)}%</text>`:u}
        ${this.showTemperature&&b!=null?M`<text class="label on-soil" x=${t.x+t.w-6/this.k} y=${t.y+s*1.3} font-size=${s*.95} text-anchor="end">🌡 ${b.toFixed(1)} °C</text>`:u}
        ${$?this.renderBadge(t.x+t.w,t.y,String($),"var(--hl-tomato-500)"):u}
      </g>`}renderBadge(e,t,s,i,n=9){let a=n/this.k;return M`<g pointer-events="none"><circle cx=${e} cy=${t} r=${a} fill=${i} stroke="#fff" stroke-width=${1.5/this.k}></circle>
      <text class="badge-text" x=${e} y=${t+a*.38} font-size=${a*1.1} text-anchor="middle">${s}</text></g>`}renderPill(e,t,s,i){let n=s.length*i*.56+i*1.1,a=i*1.55;return M`<g pointer-events="none">
      <rect x=${e-n/2} y=${t-a/2} width=${n} height=${a} rx=${a/2} fill="var(--hl-pill-bg, rgba(255,255,255,0.9))"
        stroke="rgba(0,0,0,0.12)" stroke-width="1" vector-effect="non-scaling-stroke"></rect>
      <text class="pill-text" x=${e} y=${t+i*.36} font-size=${i} text-anchor="middle">${s}</text></g>`}renderPlanting(e){let t=this.beds.find(U=>U.id===e.bed_id),s=this.plants.get(e.plant_id);if(!t||!s)return u;let i=this.bedAbs(t),n={x:i.x+e.x_cm,y:i.y+e.y_cm,w:e.width_cm,h:e.length_cm},a=this.effectiveRect("planting",e.id,n),l=R(this.families,s.family),d=s.color||l,h=ee(s),m=y(s,this.lang),v=!this.viewDate||Os(e,this.timelines[e.id],this.viewDate),b={...e,x_cm:a.x-i.x,y_cm:a.y-i.y,width_cm:a.w,length_cm:a.h},w=Qt(b,s),$=this.reports[t.id]??this.analysis?.beds[t.id]?.compatibility,x=$?.pairs.filter(U=>(U.a===e.id||U.b===e.id)&&U.severity!=="info")??[],P=$?.out_of_bounds?.includes(e.id),C=this.k,ae=Math.min(s.spacing_cm,a.w,a.h)*C,V=ae<18||w.length>90,K=`${m} \u2013 ${this.t(`planner.layout.${e.layout}`)}, ${this.t("planner.count",{n:w.length})}`+(x.length?` \u2013 ${x.length} \u26A0`:"")+(s.perennial?` \u2013 ${this.t("planner.perennial")}`:""),fe=11/C,jt;if(V){let U=a.w>=a.h,Te=U?a.h:a.w,Ne=U?a.w:a.h,ds=Math.max(e.layout==="row"?s.row_spacing_cm:Math.max(s.row_spacing_cm/2,s.spacing_cm),4),cs=Math.max(1,Math.floor(Te/ds)),ot=Math.min(s.spacing_cm/2,Ne/4),hs=Math.max(Math.min(s.spacing_cm*.9,ds*.45),2),ps=s.category==="flower"?d:"#5f9a3a",_i=Array.from({length:cs},(Be,wi)=>Te/cs*(wi+.5)),us=`${Math.max(s.spacing_cm*.6,1.5)} ${Math.max(s.spacing_cm*.4,1)}`,ms=Math.max(Math.min(Math.min(a.w,a.h)*.72,46/C),16/C),gs=a.x+a.w/2,fs=a.y+a.h/2;jt=M`
        ${_i.map(Be=>U?M`<line x1=${a.x+ot} y1=${a.y+Be} x2=${a.x+a.w-ot} y2=${a.y+Be} stroke=${ps} stroke-width=${hs}
              stroke-linecap="round" stroke-dasharray=${us} opacity="0.75"></line>`:M`<line x1=${a.x+Be} y1=${a.y+ot} x2=${a.x+Be} y2=${a.y+a.h-ot} stroke=${ps} stroke-width=${hs}
              stroke-linecap="round" stroke-dasharray=${us} opacity="0.75"></line>`)}
        <circle cx=${gs} cy=${fs} r=${ms*.62} fill="var(--hl-pill-bg, rgba(255,255,255,0.92))" stroke=${l} stroke-width="2"
          vector-effect="non-scaling-stroke"></circle>
        ${St(h,gs,fs,ms*.92,d)}`}else{let U=Math.max(Math.min(s.spacing_cm*.92,Math.min(a.w,a.h)*1.05),6/C);jt=M`
        ${w.slice(0,300).map(([Te,Ne])=>M`<ellipse cx=${i.x+Te} cy=${i.y+Ne+U*.42} rx=${U*.36} ry=${U*.09}
          fill="rgba(0,0,0,0.18)"></ellipse>`)}
        ${w.slice(0,300).map(([Te,Ne])=>St(h,i.x+Te,i.y+Ne,U,d))}`}let os=(m.length*.56+1.1)*fe,ls=a.w*C>=Math.min(m.length*7+16,140)&&a.h*C>=(V?64:34),bi=V&&!ls&&a.w>=a.h&&a.w*C>=os*C+70&&a.h*C>=16,yi=V?a.y+a.h-Math.max(fe*1.1,Math.min(a.h*.12,14/C)):a.y+a.h-fe*.95,$i=Math.max(Math.min(Math.min(a.w,a.h)*.72,46/C),16/C)*.62;return M`
      <g class="planting ${v?"":"faded"}" role="button" aria-label=${K}
        @pointerdown=${U=>this.onPointerDown(U,"planting",e.id)}>
        <title>${K}</title>
        <rect class="planting-rect" x=${a.x} y=${a.y} width=${a.w} height=${a.h} rx=${4/C}
          fill=${d} fill-opacity="0.13" stroke=${l} stroke-width="1.6" stroke-dasharray=${v?"none":"4 3"}></rect>
        ${jt}
        ${bi?this.renderPill(a.x+a.w/2+$i+6/C+os/2,a.y+a.h/2,m,fe):ls?this.renderPill(a.x+a.w/2,yi,m,fe):!V&&ae<10&&a.w*C>22&&a.h*C>22?M`<text class="mono" x=${a.x+a.w/2} y=${a.y+a.h/2+fe*.35} font-size=${fe} text-anchor="middle">${Is(m)}</text>`:u}
        ${s.perennial&&a.w*C>=36&&a.h*C>=36?this.renderBadge(a.x+a.w-9/C,a.y+a.h-9/C,"\u221E","var(--hl-leaf-700)",7):u}
        ${e.succession_group?this.renderBadge(a.x,a.y,String(e.succession_index+1),"var(--hl-soil-700)"):u}
        ${x.length||P?this.renderBadge(a.x+a.w,a.y,"!",x.some(U=>U.severity==="error")?"var(--hl-tomato-500)":"var(--hl-sun-500)"):u}
      </g>`}renderLinks(){if(!this.showCompanions)return[];let e=[],t=i=>{let n=this.plantings.find(h=>h.id===i),a=n&&this.beds.find(h=>h.id===n.bed_id);if(!n||!a)return null;let l=this.bedAbs(a),d=this.effectiveRect("planting",n.id,{x:l.x+n.x_cm,y:l.y+n.y_cm,w:n.width_cm,h:n.length_cm});return[d.x+d.w/2,d.y+d.h/2]},s=new Set(this.plantings.map(i=>i.id));for(let i of this.beds){let n=this.reports[i.id]??this.analysis?.beds[i.id]?.compatibility;for(let a of n?.pairs??[]){if(a.kind==="same_family"||!s.has(a.a)||!s.has(a.b))continue;let l=t(a.a),d=t(a.b);if(!l||!d)continue;let h=Qs[a.kind]??Qs.overlap;e.push(M`<line class="link" x1=${l[0]} y1=${l[1]} x2=${d[0]} y2=${d[1]} stroke=${h.color}
          stroke-width=${h.width} stroke-dasharray=${h.dash} stroke-linecap="round" opacity="0.9"><title>${this.t(a.key,a.params)}</title></line>`)}}return e}selectionRect(e){if(e.kind==="feature"){let n=this.features.find(a=>a.id===e.id);return n?this.effectiveRect("feature",n.id,{x:n.x_cm,y:n.y_cm,w:n.width_cm,h:n.length_cm}):null}if(e.kind==="bed"){let n=this.beds.find(a=>a.id===e.id);return n?this.bedAbs(n):null}if(e.kind==="zone"){let n=this.zones.find(a=>a.id===e.id);return n?this.effectiveRect("zone",n.id,Oe(n)):null}let t=this.plantings.find(n=>n.id===e.id),s=t&&this.beds.find(n=>n.id===t.bed_id);if(!t||!s)return null;let i=this.bedAbs(s);return this.effectiveRect("planting",t.id,{x:i.x+t.x_cm,y:i.y+t.y_cm,w:t.width_cm,h:t.length_cm})}renderMulti(){if(this.multi.length<2)return[];let e=3/this.k;return this.multi.filter(t=>!(this.selection&&t.kind===this.selection.kind&&t.id===this.selection.id)).map(t=>this.selectionRect(t)).filter(t=>!!t).map(t=>M`<rect class="selected-outline" x=${t.x-e} y=${t.y-e} width=${t.w+e*2} height=${t.h+e*2} opacity="0.7"></rect>`)}renderSelection(){let e=this.selection;if(!e)return u;let t=null;if(e.kind==="feature")t=this.selectionRect(e);else if(e.kind==="bed"){let n=this.beds.find(a=>a.id===e.id);t=n?this.bedAbs(n):null}else if(e.kind==="zone"){let n=this.zones.find(a=>a.id===e.id);t=n?this.effectiveRect("zone",n.id,Oe(n)):null}else{let n=this.plantings.find(l=>l.id===e.id),a=n&&this.beds.find(l=>l.id===n.bed_id);if(n&&a){let l=this.bedAbs(a);t=this.effectiveRect("planting",n.id,{x:l.x+n.x_cm,y:l.y+n.y_cm,w:n.width_cm,h:n.length_cm})}}if(!t)return u;let s=10/this.k,i=3/this.k;return M`
      <rect class="selected-outline" x=${t.x-i} y=${t.y-i} width=${t.w+i*2} height=${t.h+i*2}></rect>
      ${this.readonly||this.lockLayout&&e.kind!=="planting"?u:M`<rect class="handle" x=${t.x+t.w-s/2} y=${t.y+t.h-s/2} width=${s} height=${s} rx=${2/this.k}
        @pointerdown=${n=>this.onPointerDown(n,e.kind,e.id,!0)}></rect>`}`}renderGhost(){let e=this.ghost;if(!e)return u;let t=12/this.k;return M`<g pointer-events="none">
      <rect x=${e.rect.x} y=${e.rect.y} width=${e.rect.w} height=${e.rect.h} rx=${3/this.k}
        fill=${e.color} fill-opacity=${e.valid?.35:.12} stroke=${e.valid?e.color:"var(--hl-tomato-500)"}
        stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      <text class="label" x=${e.rect.x} y=${e.rect.y-t*.5} font-size=${t} font-weight="600">${e.label}</text></g>`}renderDrawRect(){let e=this.drawRect,t=this.drawTool;if(!e||!t||!e.w&&!e.h)return u;let s=12/this.k,i=n=>(n/100).toLocaleString(this.lang==="nl"?"nl-BE":"en-GB",{maximumFractionDigits:1});return M`<g pointer-events="none">
      <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx=${4/this.k} fill=${t.color} fill-opacity="0.22"
        stroke=${t.color} stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      ${this.renderPill(e.x+e.w/2,e.y+e.h/2,`${t.label} \xB7 ${i(e.w)} \xD7 ${i(e.h)} m`,s)}
    </g>`}outside(e){if(!this.focusZone)return!1;let t=this.zones.find(n=>n.id===this.focusZone);if(!t)return!1;let s=e.x+e.w/2,i=e.y+e.h/2;return!(s>=t.x_cm&&s<=t.x_cm+t.width_cm&&i>=t.y_cm&&i<=t.y_cm+t.length_cm)}render(){let e=this.focusZone,t=(s,i)=>s?M`<g class="dimmed">${i}</g>`:i;return o`
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
          ${this.showPlantings?this.plantings.map(s=>{let i=this.beds.find(n=>n.id===s.bed_id);return t(!!e&&i?.zone_id!==e,this.renderPlanting(s))}):u} ${this.showPlantings?this.renderLinks():u}
          ${this.renderMulti()} ${this.renderSelection()} ${this.renderGhost()} ${this.renderDrawRect()}
        </g>
      </svg>
      <div class="zoom-indicator" aria-hidden="true">${Math.round(this.k*100)} px/m</div>
    `}};S.styles=[T`
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
    `],p([g({attribute:!1})],S.prototype,"zones",2),p([g({attribute:!1})],S.prototype,"beds",2),p([g({attribute:!1})],S.prototype,"plantings",2),p([g({attribute:!1})],S.prototype,"features",2),p([g({attribute:!1})],S.prototype,"multi",2),p([g({type:Boolean})],S.prototype,"showFeatures",2),p([g({type:Boolean})],S.prototype,"showPlantings",2),p([g({type:Boolean})],S.prototype,"showZones",2),p([g({attribute:!1})],S.prototype,"plants",2),p([g({attribute:!1})],S.prototype,"families",2),p([g({attribute:!1})],S.prototype,"selection",2),p([g({attribute:!1})],S.prototype,"ghost",2),p([g({attribute:!1})],S.prototype,"reports",2),p([g({attribute:!1})],S.prototype,"timelines",2),p([g({attribute:!1})],S.prototype,"analysis",2),p([g({attribute:!1})],S.prototype,"t",2),p([g()],S.prototype,"lang",2),p([g({type:Number})],S.prototype,"snapStep",2),p([g({type:Boolean})],S.prototype,"snapOn",2),p([g({type:Boolean})],S.prototype,"showCompanions",2),p([g({type:Boolean})],S.prototype,"showMoisture",2),p([g({type:Boolean})],S.prototype,"showTemperature",2),p([g()],S.prototype,"viewDate",2),p([g({type:Boolean})],S.prototype,"readonly",2),p([g({type:Boolean})],S.prototype,"lockLayout",2),p([g()],S.prototype,"focusZone",2),p([g({attribute:!1})],S.prototype,"drawTool",2),p([f()],S.prototype,"drawRect",2),p([f()],S.prototype,"k",2),p([f()],S.prototype,"tx",2),p([f()],S.prototype,"ty",2),p([f()],S.prototype,"preview",2),p([ut("svg")],S.prototype,"svgEl",2),S=p([j("hl-garden-canvas")],S);var ti="hortulus-photos",si="hortulus-photo:";var es=new Map;function it(){try{return localStorage.getItem(ti)!=="off"}catch{return!0}}function ts(c){try{localStorage.setItem(ti,c?"on":"off")}catch{}window.dispatchEvent(new CustomEvent("hortulus-photos-changed"))}function ss(c){let r=(c??"").replace(/\s+/g," ").trim();if(!r||/^(onbekend|unknown)$/i.test(r))return[];let e=[r],t=r.split(" "),s=t[1]==="\xD7"?t.slice(0,3).join(" "):t.slice(0,2).join(" ");return s&&s!==r&&e.push(s),e}function Yi(c){try{let r=localStorage.getItem(si+c);if(!r)return;let{at:e,photo:t}=JSON.parse(r);return Date.now()-e<30*864e5?t:void 0}catch{return}}function ei(c,r){try{localStorage.setItem(si+c,JSON.stringify({at:Date.now(),photo:r}))}catch{}}async function Xi(c,r){let e=`https://${c}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(r.replace(/ /g,"_"))}`,t=await fetch(e,{headers:{Accept:"application/json"}});if(!t.ok)return null;let s=await t.json();return s.type==="disambiguation"||!s.thumbnail?.source?null:{src:s.thumbnail.source,page:s.content_urls?.desktop?.page??"",title:s.title??r}}function ii(c,r){let e=ss(c.scientific_name);if(!e.length)return Promise.resolve(null);let t=`${r}:${e[0]}`,s=Yi(t);if(s!==void 0)return Promise.resolve(s);let i=es.get(t);return i||(i=(async()=>{let n=r==="en"?["en"]:[r,"en"];for(let a of e)for(let l of n){let d;try{d=await Xi(l,a)}catch{return es.delete(t),null}if(d)return ei(t,d),d}return ei(t,null),null})(),es.set(t,i)),i}function Ji(c){return`color-mix(in srgb, ${c} 22%, var(--hl-surface, #fff))`}var te=class extends E{constructor(){super(...arguments);this.color="#6aa648";this.lang="en";this.size="card";this.credit=!1;this.photo=null;this.loaded=!1;this.wantPhoto=!1;this.onPref=()=>this.reset()}connectedCallback(){super.connectedCallback(),window.addEventListener("hortulus-photos-changed",this.onPref)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hortulus-photos-changed",this.onPref),this.observer?.disconnect()}updated(e){(e.has("plant")||e.has("lang"))&&this.reset()}reset(){if(this.photo=null,this.loaded=!1,this.observer?.disconnect(),this.wantPhoto=!!this.plant&&it()&&ss(this.plant.scientific_name).length>0,!!this.wantPhoto){if(typeof IntersectionObserver>"u"){this.load();return}this.observer=new IntersectionObserver(e=>{e.some(t=>t.isIntersecting)&&(this.observer?.disconnect(),this.load())},{rootMargin:"200px"}),this.observer.observe(this)}}async load(){let e=this.plant;if(!e)return;let t=await ii(e,this.lang);e===this.plant&&this.wantPhoto&&(this.photo=t)}render(){let e=this.plant,t=this.size==="hero"?150:this.size==="card"?84:32,s=e?e.names?.[this.lang]??e.names?.en??e.id:"";return o`
      <div class="art" style=${`background:${Ji(this.color)}`} role="img" aria-label=${s}>
        ${oe(ee(e),e?.color||this.color,t)}
      </div>
      ${this.photo?o`<img class=${this.loaded?"on":""} src=${this.photo.src} alt=${s} loading="lazy" referrerpolicy="no-referrer"
        @load=${()=>this.loaded=!0} @error=${()=>this.photo=null} />`:u}
      ${this.photo&&this.loaded&&this.credit&&this.photo.page?o`<a class="credit" href=${this.photo.page} target="_blank" rel="noopener noreferrer"
        title=${this.photo.title}>Wikipedia</a>`:u}
    `}};te.styles=T`
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
    .credit { position: absolute; right: 6px; bottom: 4px; font-size: 10px; color: #fff; background: rgba(0,0,0,.45);
      padding: 1px 6px; border-radius: 8px; text-decoration: none; }
    .credit:hover { background: rgba(0,0,0,.65); }
  `,p([g({attribute:!1})],te.prototype,"plant",2),p([g()],te.prototype,"color",2),p([g()],te.prototype,"lang",2),p([g({reflect:!0})],te.prototype,"size",2),p([g({type:Boolean})],te.prototype,"credit",2),p([f()],te.prototype,"photo",2),p([f()],te.prototype,"loaded",2),te=p([j("hl-plant-image")],te);var I=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.fromSeason=null;this.preview=null;this.layout="copy";this.zones=new Set;this.features=new Set;this.carry=new Set;this.activate=!0;this.busy=!1;this.error=""}willUpdate(e){(e.has("api")||e.has("fromSeason"))&&this.api&&this.load()}async load(){this.error="";try{let e=await this.api.yearPreview(this.fromSeason??void 0);this.preview=e,this.layout=e.target_exists?"keep":"copy",this.zones=new Set(e.zones.map(t=>t.id)),this.features=new Set(e.features.map(t=>t.id)),this.carry=new Set(e.candidates.filter(t=>t.selected).map(t=>t.planting_id)),this.activate=e.is_live}catch(e){this.error=e.message??String(e)}}toggle(e,t,s){let i=new Set(e);return s?i.add(t):i.delete(t),i}targetBeds(){let e=this.preview;return this.layout==="keep"?new Set((this.snapshot.layouts?.[String(e.to_season)]?.beds??[]).map(t=>t.id)):new Set(e.beds.filter(t=>this.zones.has(t.zone_id)).map(t=>t.id))}async apply(){let e=this.preview;this.busy=!0;try{let t=await this.api.yearApply({from_season:e.from_season,layout:this.layout,zone_ids:this.layout==="copy"?[...this.zones]:null,feature_ids:this.layout==="copy"?[...this.features]:null,planting_ids:[...this.carry],activate:this.activate});this.dispatchEvent(new CustomEvent("transition-done",{detail:t,bubbles:!0,composed:!0}))}catch(t){this.error=t.message??String(t)}finally{this.busy=!1}}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){let e=this.preview;if(!e)return o`<div class="stack"><h2>${this.t("year.title_short")}</h2>
        ${this.error?o`<p class="warn">${this.error}</p>`:o`<p class="muted">${this.t("common.loading")}</p>`}
        <div class="row end"><button class="btn" @click=${this.close}>${this.t("common.close")}</button></div></div>`;let{from_season:t,to_season:s}=e,i=this.targetBeds(),n=h=>e.beds.find(m=>m.id===h)?.name??this.snapshot.layouts?.[String(s)]?.beds.find(m=>m.id===h)?.name??h,a=e.candidates.filter(h=>h.reason==="perennial"),l=e.candidates.filter(h=>h.reason==="overwinter"),d=h=>{let m=this.plants.find(b=>b.id===h.plant_id),v=!i.has(h.bed_id);return o`<label class="item ${this.carry.has(h.planting_id)?"":"off"}">
        <input type="checkbox" .checked=${this.carry.has(h.planting_id)} ?disabled=${v}
          @change=${b=>this.carry=this.toggle(this.carry,h.planting_id,b.target.checked)} />
        ${m?o`<hl-plant-image .plant=${m} color=${R(this.families,m.family)} lang=${this.lang} size="thumb"></hl-plant-image>`:u}
        <span>${y(m,this.lang)||h.plant_id}<small>${n(h.bed_id)}${v?o` · <span class="warn">${this.t("year.bed_gone")}</span>`:u}</small></span>
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
          <div class="list">${e.zones.map(h=>o`<label class="item ${this.zones.has(h.id)?"":"off"}">
            <input type="checkbox" .checked=${this.zones.has(h.id)} @change=${m=>this.zones=this.toggle(this.zones,h.id,m.target.checked)} />
            <span>${X[h.type]?.icon??""} ${h.name}<small>${this.t(`settings.zone_type.${h.type}`)} · ${this.t("planner.n_beds",{n:e.beds.filter(m=>m.zone_id===h.id).length})}</small></span>
          </label>`)}</div>
          ${e.features.length?o`<h4>${this.t("year.elements")}</h4>
            <div class="list">${e.features.map(h=>o`<label class="item ${this.features.has(h.id)?"":"off"}">
              <input type="checkbox" .checked=${this.features.has(h.id)} @change=${m=>this.features=this.toggle(this.features,h.id,m.target.checked)} />
              <span>${Ee[h.type]?.icon??""} ${h.name}<small>${this.t(`feature.${h.type}`)}</small></span>
            </label>`)}</div>`:u}`:u}
      </section>

      <section>
        <h3><ha-icon icon="mdi:tree-outline"></ha-icon>${this.t("year.perennials")}</h3>
        ${a.length?o`<div class="list">${a.map(d)}</div>`:o`<p class="small muted">${this.t("year.none")}</p>`}
        <h3 style="margin-top:var(--hl-s3)"><ha-icon icon="mdi:snowflake"></ha-icon>${this.t("year.overwinter")}</h3>
        ${l.length?o`<div class="list">${l.map(d)}</div>`:o`<p class="small muted">${this.t("year.none")}</p>`}
        <p class="xs muted">${this.t("year.not_chosen",{to:s})}</p>
      </section>

      <section>
        <label class="row"><input type="checkbox" .checked=${this.activate} ?disabled=${!e.is_live}
          @change=${h=>this.activate=h.target.checked} />${this.t("year.activate",{to:s})}</label>
        <p class="xs muted">${this.t(this.activate?"year.activate_hint":"year.prepare_hint",{from:t,to:s})}</p>
      </section>

      ${this.error?o`<p class="warn">${this.error}</p>`:u}
      <div class="row end">
        <button class="btn ghost" @click=${this.close}>${this.t("common.cancel")}</button>
        <button class="btn primary" ?disabled=${this.busy||!this.admin} @click=${()=>this.apply()}>
          <ha-icon icon="mdi:calendar-arrow-right"></ha-icon>${this.t("year.apply",{to:s})}</button>
      </div>
    </div>`}};I.styles=[A,T`
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
    `],p([g({attribute:!1})],I.prototype,"api",2),p([g({attribute:!1})],I.prototype,"t",2),p([g({attribute:!1})],I.prototype,"snapshot",2),p([g({attribute:!1})],I.prototype,"plants",2),p([g({attribute:!1})],I.prototype,"families",2),p([g()],I.prototype,"lang",2),p([g({type:Boolean})],I.prototype,"admin",2),p([g({type:Number})],I.prototype,"fromSeason",2),p([f()],I.prototype,"preview",2),p([f()],I.prototype,"layout",2),p([f()],I.prototype,"zones",2),p([f()],I.prototype,"features",2),p([f()],I.prototype,"carry",2),p([f()],I.prototype,"activate",2),p([f()],I.prototype,"busy",2),p([f()],I.prototype,"error",2),I=p([j("hl-year-transition")],I);var Et=class{constructor(r,e=100){this.present=r;this.limit=e;this.past=[];this.future=[]}get current(){return this.present}get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}commit(r){return this.past.push(this.present),this.past.length>this.limit&&this.past.shift(),this.present=r,this.future=[],r}undo(){let r=this.past.pop();return r===void 0?this.present:(this.future.push(this.present),this.present=r,r)}redo(){let r=this.future.pop();return r===void 0?this.present:(this.past.push(this.present),this.present=r,r)}reset(r){this.past=[],this.future=[],this.present=r}};var L=c=>structuredClone(c),Tt=()=>({soil_moisture:null,soil_temperature:null,air_temperature:null,air_humidity:null,light:null,rain:null}),ni=[["buildings",["house","carport","shed","driveway","parking","street","terrace","decking","wall"]],["paths",["path","stone_path","wood_path","stepping_stones","bark_path"]],["green",["lawn","flowerbed","hedge","shrub","tree","pond"]],["outdoor_living",["seating","pool","play","fence","trellis","compost","water_butt","beehive","other"]]],Qi=ni.flatMap(([,c])=>c),Vi={path:[300,60],terrace:[400,300],lawn:[500,400],flowerbed:[200,100],compost:[100,100],water_butt:[60,60],shed:[200,150],tree:[400,400],house:[1e3,800],driveway:[300,800],street:[1500,600],parking:[500,500],play:[300,300],beehive:[60,60],hedge:[400,80],fence:[500,10],trellis:[200,20],pond:[200,150],other:[80,80],stone_path:[300,80],wood_path:[300,80],stepping_stones:[300,50],bark_path:[300,60],decking:[400,300],wall:[400,20],carport:[300,500],shrub:[150,150],pool:[800,400],seating:[300,250]},is=["outdoor","garden","greenhouse","cold_frame","containers","orchard","fruit","herbs","flowers"],en=["orchard","fruit","herbs","flowers","garden"],tn={outdoor:[600,400],greenhouse:[300,200],cold_frame:[150,80],orchard:[1e3,800],fruit:[600,300],herbs:[300,200],flowers:[400,150],garden:[800,600],containers:[400,200]},sn=["fresh","storage","herbs","pollinators","winter","perennials","easy"],nn=["vegetable","herb","fruit","flower"];function ns(c){let r=c.sowing;return r.direct_sow.length&&(!r.indoor_sow.length||c.habit==="root"||c.tags.includes("root"))?"direct_sow":r.indoor_sow.length&&r.transplant.length?"indoor_sow":r.transplant.length?"transplant":"direct_sow"}var _=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.narrow=!1;this.mode="plant";this.transitionRequest=0;this.initialSeason=null;this.draft={zones:[],beds:[],plantings:[],features:[]};this.selection=null;this.multi=[];this.showFeatures=!0;this.showPlantings=!0;this.showZones=!0;this.categoryFilter="";this.autofill=null;this.autofillBusy=!1;this.autofillReplace=!1;this.autofillBeds=[];this.autofillResources=null;this.season=new Date().getFullYear();this.saveState="saved";this.reports={};this.extraTimelines={};this.snapOn=!0;this.showCompanions=!0;this.showMoisture=!0;this.showTemperature=!1;this.viewDate="";this.layoutMode="block";this.search="";this.familyFilter="";this.paletteDrag=null;this.ghostReport=null;this.dialog=null;this.announcement="";this.paletteOpen=!0;this.step="plant";this.tool=null;this.focusZone="";this.removing=null;this.soilForm=null;this.harvestKg="";this.history=null;this.baseRevision=null;this.checkTimers=new Map;this.ghostCheckAt=0;this.plantMap=new Map;this.seasonChosen=!1}willUpdate(e){e.has("plants")&&(this.plantMap=new Map(this.plants.map(t=>[t.id,t]))),e.has("snapshot")&&this.snapshot&&this.syncFromSnapshot(),e.has("mode")&&(this.step=this.mode==="plant"?"plant":this.draft.zones.length?"zones":"site",this.tool=null,this.selection=null,this.multi=[]),e.has("transitionRequest")&&this.transitionRequest>0&&(this.dialog="transition")}get hasLayout(){return!!this.snapshot&&ke(this.snapshot,this.season)!==null}locked(e){return this.mode==="plant"&&e!=="planting"}syncFromSnapshot(e=!1){let t=this.snapshot;if(!this.history&&!this.seasonChosen){this.season=t.layout_season??t.analysis?.season??new Date().getFullYear();let i=t.analysis?.season;i&&i!==this.season&&ke(t,i)&&(this.season=i),this.initialSeason&&(this.season=this.initialSeason),this.viewDate=t.analysis?.today??"",this.step=this.mode==="plant"?"plant":t.zones.length?"zones":"site"}let s=this.saveState==="saved";if(e||!this.history||s&&t.revision!==this.baseRevision){let i=ke(t,this.season)??{zones:[],beds:[],features:[]},n={zones:L(i.zones),beds:L(i.beds),plantings:L(t.plantings),features:L(i.features??[])};this.history?this.history.reset(n):this.history=new Et(n),this.draft=n,this.baseRevision=t.revision,this.reports={},this.extraTimelines={}}}get timelines(){return{...this.snapshot.analysis?.timelines??{},...this.extraTimelines}}get seasonPlantings(){return this.draft.plantings.filter(e=>ue(e,!!this.plantMap.get(e.plant_id)?.perennial,this.season))}commit(e,t,s=[]){if(!(!this.admin||!this.history)){this.draft=this.history.commit(e),this.saveState="dirty",this.scheduleSave();for(let i of s)this.scheduleCheck(i);t&&this.announce(t)}}undo(){this.history?.canUndo&&(this.draft=this.history.undo(),this.afterHistoryJump())}redo(){this.history?.canRedo&&(this.draft=this.history.redo(),this.afterHistoryJump())}afterHistoryJump(){this.saveState="dirty",this.scheduleSave(),this.draft.beds.forEach(e=>this.scheduleCheck(e.id)),this.selection&&!this.findItem(this.selection)&&(this.selection=null)}scheduleSave(){window.clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>this.save(),1200)}async save(){if(this.saveState!=="dirty")return;let e=this.draft;this.saveState="saving";try{let t=await this.api.savePlan(e,this.baseRevision,this.season);this.baseRevision=t.revision,this.saveState=this.draft===e?"saved":"dirty",this.saveState==="dirty"&&this.scheduleSave()}catch(t){t.code==="revision_conflict"?(this.saveState="saved",this.history=null,this.syncFromSnapshot(),this.toast(this.t("common.conflict"))):(this.saveState="error",this.toast(this.t("common.error",{message:t.message??String(t)})))}}async setSeason(e){window.clearTimeout(this.saveTimer),this.saveState==="dirty"&&await this.save(),this.seasonChosen=!0,this.season=e,this.dispatchEvent(new CustomEvent("season-changed",{detail:e,bubbles:!0,composed:!0})),this.selection=null,this.multi=[],this.focusZone="",this.syncFromSnapshot(!0),this.mode==="layout"&&(this.step=this.draft.zones.length?this.step:"site"),requestAnimationFrame(()=>this.canvas?.fit())}startLayout(e){let t=e==null?null:ke(this.snapshot,e),s={...L(this.draft),zones:L(t?.zones??[]),beds:L(t?.beds??[]),features:L(t?.features??[])};this.commit(s,this.t("layout.started",{season:this.season})),this.step=s.zones.length?"zones":"site",requestAnimationFrame(()=>this.canvas?.fit())}scheduleCheck(e){window.clearTimeout(this.checkTimers.get(e)),this.checkTimers.set(e,window.setTimeout(()=>this.runCheck(e),250))}bedPlantings(e,t=this.draft){return t.plantings.filter(s=>s.bed_id===e&&(this.plantMap.get(s.plant_id)?.perennial?ue(s,!0,this.season):Math.abs(s.season-this.season)<=1))}async runCheck(e){let t=this.draft.beds.find(s=>s.id===e);if(!t){let{[e]:s,...i}=this.reports;this.reports=i;return}try{let s=await this.api.checkBed(t,this.bedPlantings(e));this.reports={...this.reports,[e]:s},s.timelines&&(this.extraTimelines={...this.extraTimelines,...s.timelines})}catch{}}findItem(e){return(e.kind==="zone"?this.draft.zones:e.kind==="bed"?this.draft.beds:e.kind==="feature"?this.draft.features:this.draft.plantings).find(s=>s.id===e.id)}onSelect(e){if(!e){this.selection=null,this.multi=[];return}if(e.additive){let t=this.multi.filter(i=>i.kind===e.kind),s=t.some(i=>i.id===e.id);this.multi=s?t.filter(i=>i.id!==e.id):[...t,{kind:e.kind,id:e.id}],this.selection=this.multi[this.multi.length-1]??null,this.announce(this.t("planner.selected_n",{n:this.multi.length}));return}this.selection={kind:e.kind,id:e.id},this.multi=[this.selection]}align(e){if(this.multi.length<2||!this.admin||this.locked(this.multi[0].kind))return;let t=L(this.draft),s=this.multi[0].kind,i=new Set;if(s==="planting"){let n=this.multi.map(d=>t.plantings.find(h=>h.id===d.id)).filter(Boolean),a=new Map(t.beds.map(d=>[d.id,d])),l=n.map(d=>({x:a.get(d.bed_id).x_cm+d.x_cm,y:a.get(d.bed_id).y_cm+d.y_cm,w:d.width_cm,h:d.length_cm}));Vt(l,e).forEach((d,h)=>{let m=n[h],v=a.get(m.bed_id),b=ce({...d,x:d.x-v.x_cm,y:d.y-v.y_cm},{x:0,y:0,w:v.width_cm,h:v.length_cm});Object.assign(m,{x_cm:b.x,y_cm:b.y}),i.add(v.id)})}else{let n=s==="bed"?t.beds:s==="zone"?t.zones:t.features,a=this.multi.map(l=>n.find(d=>d.id===l.id)).filter(Boolean);Vt(a.map(l=>({x:l.x_cm,y:l.y_cm,w:l.width_cm,h:l.length_cm})),e).forEach((l,d)=>{let h=a[d],m=l.x-h.x_cm,v=l.y-h.y_cm;if(h.x_cm=l.x,h.y_cm=l.y,s==="zone")for(let b of t.beds.filter(w=>w.zone_id===h.id))b.x_cm+=m,b.y_cm+=v;s==="bed"&&i.add(h.id)})}this.commit(t,this.t("planner.aligned",{n:this.multi.length}),[...i])}onItemChange(e){let{kind:t,id:s,rect:i,targetBedId:n,dx:a,dy:l,group:d}=e.detail;if(this.locked(t))return;let h=L(this.draft),m=this.snapOn?this.snapshot.settings.snap_cm:1;if(d){this.moveGroup(h,t,a,l);return}if(t==="feature"){let v=h.features.find(b=>b.id===s);Object.assign(v,{x_cm:i.x,y_cm:i.y,width_cm:i.w,length_cm:i.h}),this.commit(h,this.t("planner.moved",{name:v.name}));return}if(t==="zone"){let v=h.zones.find($=>$.id===s),b=i.x-v.x_cm,w=i.y-v.y_cm;if(Object.assign(v,{x_cm:i.x,y_cm:i.y,width_cm:i.w,length_cm:i.h}),b||w)for(let $ of h.beds.filter(x=>x.zone_id===s))$.x_cm+=b,$.y_cm+=w;this.commit(h,this.t("planner.moved",{name:v.name}))}else if(t==="bed"){let v=h.beds.find(x=>x.id===s);Object.assign(v,{x_cm:i.x,y_cm:i.y,width_cm:i.w,length_cm:i.h});let b=i.x+i.w/2,w=i.y+i.h/2,$=[...h.zones].reverse().find(x=>b>=x.x_cm&&b<=x.x_cm+x.width_cm&&w>=x.y_cm&&w<=x.y_cm+x.length_cm);$&&(v.zone_id=$.id),this.commit(h,this.t("planner.moved",{name:v.name}),[v.id])}else{let v=h.plantings.find(P=>P.id===s),b=v.bed_id,w=h.beds.find(P=>P.id===(n??b))??h.beds.find(P=>P.id===b),$=ce({...i,x:i.x-w.x_cm,y:i.y-w.y_cm},{x:0,y:0,w:w.width_cm,h:w.length_cm});Object.assign(v,{bed_id:w.id,x_cm:q($.x,m),y_cm:q($.y,m),width_cm:$.w,length_cm:$.h});let x=this.plantMap.get(v.plant_id);this.commit(h,this.t("planner.moved",{name:y(x,this.lang)}),[...new Set([b,w.id])])}}moveGroup(e,t,s,i){let n=new Set(this.multi.filter(l=>l.kind===t).map(l=>l.id)),a=new Set;if(t==="planting")for(let l of e.plantings.filter(d=>n.has(d.id))){let d=e.beds.find(m=>m.id===l.bed_id),h=ce({x:l.x_cm+s,y:l.y_cm+i,w:l.width_cm,h:l.length_cm},{x:0,y:0,w:d.width_cm,h:d.length_cm});Object.assign(l,{x_cm:h.x,y_cm:h.y}),a.add(d.id)}else{let l=t==="bed"?e.beds:t==="zone"?e.zones:e.features;for(let d of l.filter(h=>n.has(h.id))){if(d.x_cm=Math.round(d.x_cm+s),d.y_cm=Math.round(d.y_cm+i),t==="zone")for(let h of e.beds.filter(m=>m.zone_id===d.id))h.x_cm+=s,h.y_cm+=i;t==="bed"&&a.add(d.id)}}this.commit(e,this.t("planner.moved_n",{n:n.size}),[...a])}updateSelected(e,t){if(!this.selection||this.locked(this.selection.kind))return;let s=L(this.draft),n=(this.selection.kind==="zone"?s.zones:this.selection.kind==="bed"?s.beds:this.selection.kind==="feature"?s.features:s.plantings).find(l=>l.id===this.selection.id);if(!n)return;Object.assign(t?n[t]:n,e);let a=this.selection.kind==="planting"?n.bed_id:this.selection.kind==="bed"?n.id:void 0;this.commit(s,void 0,a?[a]:[])}inSeason(e){return ue(e,!!this.plantMap.get(e.plant_id)?.perennial,this.season)}dropFromSeason(e,t){let s=new Set(t);e.plantings=e.plantings.flatMap(i=>!s.has(i.bed_id)||!this.inSeason(i)?[i]:i.season<this.season?[{...i,last_season:this.season-1}]:[])}removeSelected(){let e=this.selection;if(!e||!this.admin||this.locked(e.kind))return;let t=L(this.draft),s="";if(this.multi.length>1&&(e.kind==="planting"||e.kind==="feature")){let i=new Set(this.multi.map(a=>a.id)),n=t.plantings.filter(a=>i.has(a.id)).map(a=>a.bed_id);t.plantings=t.plantings.filter(a=>!i.has(a.id)),t.features=t.features.filter(a=>!i.has(a.id)),this.commit(t,this.t("planner.removed_n",{n:i.size}),[...new Set(n)]),this.selection=null,this.multi=[];return}if(e.kind==="feature"){let i=t.features.find(n=>n.id===e.id);t.features=t.features.filter(n=>n.id!==e.id),this.commit(t,this.t("planner.removed",{name:i?.name??""})),this.selection=null,this.multi=[];return}if(e.kind==="planting"){let i=t.plantings.find(n=>n.id===e.id);if(i&&this.plantMap.get(i.plant_id)?.perennial&&i.season<this.season){this.removing=i;return}s=y(this.plantMap.get(i?.plant_id??""),this.lang),t.plantings=t.plantings.filter(n=>n.id!==e.id),this.commit(t,this.t("planner.removed",{name:s}),i?[i.bed_id]:[])}else if(e.kind==="bed"){let i=t.beds.find(a=>a.id===e.id),n=t.plantings.filter(a=>a.bed_id===e.id&&this.inSeason(a)).length;if(n&&!confirm(`${i?.name}: ${this.t("planner.count",{n})} \u2013 ${this.t("common.delete")}?`))return;t.beds=t.beds.filter(a=>a.id!==e.id),this.dropFromSeason(t,[e.id]),this.commit(t,this.t("planner.removed",{name:i?.name??""}))}else{let i=t.zones.find(a=>a.id===e.id),n=t.beds.filter(a=>a.zone_id===e.id).map(a=>a.id);if(n.length&&!confirm(`${i?.name}: ${n.length} \xD7 ${this.t("planner.bed_name")} \u2013 ${this.t("common.delete")}?`))return;t.zones=t.zones.filter(a=>a.id!==e.id),t.beds=t.beds.filter(a=>!n.includes(a.id)),this.dropFromSeason(t,n),this.commit(t,this.t("planner.removed",{name:i?.name??""}))}this.selection=null,this.multi=[]}removePerennial(e){let t=this.removing;if(this.removing=null,!t)return;let s=L(this.draft),i=y(this.plantMap.get(t.plant_id),this.lang);e==="delete"?s.plantings=s.plantings.filter(n=>n.id!==t.id):Object.assign(s.plantings.find(n=>n.id===t.id),{removed_season:this.season}),this.selection=null,this.multi=[],this.commit(s,this.t(e==="delete"?"planner.removed":"planner.removed_from",{name:i,season:this.season}),[t.bed_id])}toolInfo(e){return e.kind==="zone"?{label:this.t(`settings.zone_type.${e.type}`),color:X[e.type].stroke.startsWith("var")?"#6f9a45":X[e.type].stroke}:e.kind==="feature"?{label:this.t(`feature.${e.type}`),color:Ee[e.type]?.stroke??"#888"}:{label:this.t(e.bedKind==="container"?"planner.draw_planter":"planner.bed_name"),color:"#8a6a45"}}onDrawRect(e){let t=this.tool;if(!t||!this.admin)return;let s=e.detail,i=L(this.draft),n=(a,l)=>({x:q(s.x-a/2,10),y:q(s.y-l/2,10),w:a,h:l});if(t.kind==="zone"){s.w||(s=n(...tn[t.type]));let a=i.zones.filter(d=>d.type===t.type).length+1,l={id:re("zone"),name:`${this.t(`settings.zone_type.${t.type}`)}${a>1?` ${a}`:""}`,type:t.type,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:Tt(),vent_entity:null};i.zones.push(l),en.includes(t.type)&&i.beds.push(this.makeBed(l,{x:l.x_cm,y:l.y_cm,w:l.width_cm,h:l.length_cm},l.name,"in_ground")),this.selection={kind:"zone",id:l.id},this.commit(i,this.t("planner.placed",{plant:l.name,bed:""}))}else if(t.kind==="feature"){s.w||(s=n(...Vi[t.type]));let a={id:re("ft"),name:this.t(`feature.${t.type}`),type:t.type,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,notes:""};i.features.push(a),this.selection={kind:"feature",id:a.id},this.commit(i,this.t("planner.placed",{plant:a.name,bed:""}))}else{s.w||(s=t.bedKind==="container"?n(80,40):n(120,80));let a=s.x+s.w/2,l=s.y+s.h/2,d=i.zones.find(m=>m.id===this.focusZone)??[...i.zones].reverse().find(m=>a>=m.x_cm&&a<=m.x_cm+m.width_cm&&l>=m.y_cm&&l<=m.y_cm+m.length_cm);if(!d){this.toast(this.t("planner.bed_needs_zone"));return}let h=this.makeBed(d,ce(s,{x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm}),`${this.t(t.bedKind==="container"?"planner.new_planter":"planner.new_bed")} ${i.beds.length+1}`,t.bedKind??(d.type==="containers"?"container":d.type==="outdoor"?"raised":"in_ground"));i.beds.push(h),this.selection={kind:"bed",id:h.id},this.commit(i,this.t("planner.placed",{plant:h.name,bed:d.name}),[h.id])}this.multi=this.selection?[this.selection]:[]}makeBed(e,t,s,i){return{id:re("bed"),name:s,zone_id:e.id,kind:i,x_cm:t.x,y_cm:t.y,width_cm:t.w,length_cm:t.h,orientation_deg:0,soil:i==="container"?"potting_mix":"loam",shade_pct:null,sensors:Tt(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""}}openZone(e){this.focusZone=e,this.step==="site"&&(this.step="zones");let t=this.draft.zones.find(s=>s.id===e);this.selection=t?{kind:"zone",id:t.id}:null,this.multi=this.selection?[this.selection]:[],requestAnimationFrame(()=>t?this.canvas?.fitRect({x:t.x_cm,y:t.y_cm,w:t.width_cm,h:t.length_cm}):this.canvas?.fit())}closeZone(){this.focusZone="",requestAnimationFrame(()=>this.canvas?.fit())}moveToBed(e,t){let s=L(this.draft),i=s.plantings.find(m=>m.id===e),n=s.beds.find(m=>m.id===t);if(!i||!n)return;let a=i.bed_id,l=this.bedPlantings(n.id,s).filter(m=>m.season===i.season).map(m=>({x:m.x_cm,y:m.y_cm,w:m.width_cm,h:m.length_cm})),d={w:Math.min(i.width_cm,n.width_cm),h:Math.min(i.length_cm,n.length_cm)},h=Me(n,d,l,this.snapshot.settings.snap_cm)??{x:0,y:0};Object.assign(i,{bed_id:n.id,x_cm:h.x,y_cm:h.y,width_cm:d.w,length_cm:d.h}),this.commit(s,this.t("planner.moved",{name:y(this.plantMap.get(i.plant_id),this.lang)}),[a,n.id])}openAutofill(e=[]){let t=this.snapshot.settings.resources;this.autofillResources=t?L(t):{household_size:2,hours_per_week:3,water_liters_per_week:null,compost_kg:null,irrigation:!1,goals:["fresh","herbs"],wanted:[],excluded:[]},this.autofill=null,this.autofillBeds=e,this.dialog="autofill"}async runAutofill(){if(this.autofillResources){this.autofillBusy=!0;try{this.saveState!=="saved"&&await this.save(),this.autofill=await this.api.autofill({season:this.season,bed_ids:this.autofillBeds.length?this.autofillBeds:void 0,replace:this.autofillReplace,resources:this.autofillResources})}catch(e){this.toast(this.t("common.error",{message:e.message??String(e)}))}finally{this.autofillBusy=!1}}}async applyAutofill(){let e=this.autofill;if(e)try{let t=await this.api.autofillApply(e.plantings,this.autofillReplace?e.beds:[],this.baseRevision);this.baseRevision=t.revision,this.history=null,this.saveState="saved",this.dialog=null,this.autofill=null,this.toast(this.t("autofill.applied",{n:e.summary.plantings}))}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}}duplicateSelected(){let e=this.selection;if(!e||e.kind!=="planting")return;let t=L(this.draft),s=t.plantings.find(d=>d.id===e.id),i=s&&t.beds.find(d=>d.id===s.bed_id);if(!s||!i)return;let n=this.bedPlantings(i.id,t).filter(d=>d.season===s.season).map(d=>({x:d.x_cm,y:d.y_cm,w:d.width_cm,h:d.length_cm})),a=Me(i,{w:s.width_cm,h:s.length_cm},n,this.snapshot.settings.snap_cm)??{x:s.x_cm,y:s.y_cm},l={...L(s),id:re("pl"),x_cm:a.x,y_cm:a.y,succession_group:null,succession_index:0,status:"planned",sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null};t.plantings.push(l),this.selection={kind:"planting",id:l.id},this.commit(t,void 0,[i.id])}nudge(e,t,s=!1){let i=this.selection;if(!i||!this.admin||this.locked(i.kind))return;let n=L(this.draft),a=[];if(i.kind==="planting"){let l=n.plantings.find(v=>v.id===i.id),d=n.beds.find(v=>v.id===l.bed_id),h=s?{x:l.x_cm,y:l.y_cm,w:Math.max(5,l.width_cm+e),h:Math.max(5,l.length_cm+t)}:{x:l.x_cm+e,y:l.y_cm+t,w:l.width_cm,h:l.length_cm},m=ce(h,{x:0,y:0,w:d.width_cm,h:d.length_cm});Object.assign(l,{x_cm:m.x,y_cm:m.y,width_cm:m.w,length_cm:m.h}),a.push(d.id)}else{let l=(i.kind==="bed"?n.beds:n.zones).find(d=>d.id===i.id);if(s)l.width_cm=Math.max(10,l.width_cm+e),l.length_cm=Math.max(10,l.length_cm+t);else if(l.x_cm+=e,l.y_cm+=t,i.kind==="zone")for(let d of n.beds.filter(h=>h.zone_id===i.id))d.x_cm+=e,d.y_cm+=t;i.kind==="bed"&&a.push(i.id)}this.commit(n,void 0,a)}newPlanting(e,t,s){return{id:re("pl"),plant_id:e.id,bed_id:t.id,season:this.season,layout:this.layoutMode,x_cm:s.x,y_cm:s.y,width_cm:s.w,length_cm:s.h,count:null,method:ns(e),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:""}}addToSelectedBed(e){if(!this.admin)return;let t=L(this.draft),s=this.selection?.kind==="bed"?this.selection.id:this.selection?.kind==="planting"?t.plantings.find(h=>h.id===this.selection.id)?.bed_id:void 0,i=t.beds.find(h=>h.id===s)??t.beds[0];if(!i)return;let n=st(e,this.layoutMode,i),a=this.bedPlantings(i.id,t).filter(h=>h.season===this.season).map(h=>({x:h.x_cm,y:h.y_cm,w:h.width_cm,h:h.length_cm})),l=Me(i,n,a,this.snapshot.settings.snap_cm)??{x:0,y:0},d=this.newPlanting(e,i,{...l,...n});t.plantings.push(d),this.selection={kind:"planting",id:d.id},this.commit(t,this.t("planner.placed",{plant:y(e,this.lang),bed:i.name}),[i.id]),this.canvas?.focusCanvas()}addBed(){let e=L(this.draft),t=this.selection?.kind==="zone"&&e.zones.find(l=>l.id===this.selection.id)||e.zones.find(l=>l.type==="outdoor")||e.zones[0];if(!t)return this.addZone();let s={w:120,h:80},i=e.beds.filter(l=>l.zone_id===t.id).map(l=>({x:l.x_cm-t.x_cm-20,y:l.y_cm-t.y_cm-20,w:l.width_cm+40,h:l.length_cm+40})),n=Me({...e.beds[0],width_cm:t.width_cm,length_cm:t.length_cm},s,i,10)??{x:20,y:20},a={id:re("bed"),name:`${this.t("planner.new_bed")} ${e.beds.length+1}`,zone_id:t.id,kind:"raised",x_cm:t.x_cm+n.x,y_cm:t.y_cm+n.y,width_cm:s.w,length_cm:s.h,orientation_deg:0,soil:"loam",shade_pct:null,sensors:Tt(),irrigation_entity:null,irrigation_flow_lpm:null,notes:""};e.beds.push(a),this.selection={kind:"bed",id:a.id},this.commit(e,this.t("planner.placed",{plant:a.name,bed:t.name}),[a.id])}addZone(){let e=L(this.draft),t=Mt(e.zones,e.beds),s={id:re("zone"),name:`${this.t("planner.new_zone")} ${e.zones.length+1}`,type:"outdoor",x_cm:e.zones.length?t.x+t.w+100:0,y_cm:e.zones.length?t.y:0,width_cm:400,length_cm:300,microclimate:{shade_pct:0,wind:"moderate",heated:!1,min_heating_temp_c:null,night_offset_c:null,solar_gain_c:null},sensors:Tt(),vent_entity:null};e.zones.push(s),this.selection={kind:"zone",id:s.id},this.commit(e),requestAnimationFrame(()=>this.canvas?.fit())}onPalettePointerDown(e,t){!this.admin||e.pointerType==="mouse"&&e.button!==0||(e.currentTarget.setPointerCapture(e.pointerId),this.paletteDrag={plant:t,pointerId:e.pointerId,bedId:null,rect:null},this.ghostReport=null)}onPalettePointerMove(e){let t=this.paletteDrag;if(!t||t.pointerId!==e.pointerId)return;let s=this.canvas.clientToCanvas(e.clientX,e.clientY);if(!s){this.paletteDrag={...t,bedId:null,rect:null};return}let i=Xs(this.draft.beds,s.x,s.y);if(!i){let h={w:t.plant.spacing_cm,h:t.plant.spacing_cm};this.paletteDrag={...t,bedId:null,rect:{x:s.x-h.w/2,y:s.y-h.h/2,...h}};return}let n=st(t.plant,this.layoutMode,i),a=this.snapOn?this.snapshot.settings.snap_cm:1,l={x:q(s.x-i.x_cm-n.w/2,a),y:q(s.y-i.y_cm-n.h/2,a),...n};this.layoutMode==="row"&&(l=i.width_cm>=i.length_cm?{...l,x:0}:{...l,y:0}),l=ce(l,{x:0,y:0,w:i.width_cm,h:i.length_cm}),this.paletteDrag={...t,bedId:i.id,rect:{...l,x:l.x+i.x_cm,y:l.y+i.y_cm}};let d=performance.now();if(d-this.ghostCheckAt>220){this.ghostCheckAt=d;let h=this.newPlanting(t.plant,i,l);h.id="__ghost__",this.api.checkBed(i,[...this.bedPlantings(i.id),h]).then(m=>{this.paletteDrag&&(this.ghostReport=m)}).catch(()=>{})}}onPalettePointerUp(e){let t=this.paletteDrag;if(!t||t.pointerId!==e.pointerId)return;if(this.paletteDrag=null,this.ghostReport=null,!t.bedId||!t.rect){t.rect&&this.announce(this.t("planner.no_bed_here"));return}let s=L(this.draft),i=s.beds.find(a=>a.id===t.bedId),n=this.newPlanting(t.plant,i,{...t.rect,x:t.rect.x-i.x_cm,y:t.rect.y-i.y_cm});s.plantings.push(n),this.selection={kind:"planting",id:n.id},this.commit(s,this.t("planner.placed",{plant:y(t.plant,this.lang),bed:i.name}),[i.id])}ghostLabel(){let e=this.paletteDrag,t=y(e.plant,this.lang);if(!e.bedId)return t;let s=(this.ghostReport?.pairs??[]).filter(l=>l.a==="__ghost__"||l.b==="__ghost__"),i=s.filter(l=>l.kind==="enemy"||l.kind==="overlap").length,n=s.filter(l=>l.kind==="friend").length,a=(this.ghostReport?.rotation??[]).some(l=>l.planting==="__ghost__");return`${t}${n?` \xB7 \u2665 ${n}`:""}${i?` \xB7 \u26A0 ${i}`:""}${a?" \xB7 \u27F2":""}`}onKeyDown(e){let t=e.composedPath()[0];if(["INPUT","SELECT","TEXTAREA"].includes(t?.tagName))return;let s=e.ctrlKey||e.metaKey,i=(this.snapOn?this.snapshot.settings.snap_cm:1)*(e.shiftKey?10:1),n=e.key,a=()=>{e.preventDefault(),e.stopPropagation()};if(s&&n.toLowerCase()==="z"&&!e.shiftKey)return this.undo(),a();if(s&&n.toLowerCase()==="y"||s&&e.shiftKey&&n.toLowerCase()==="z")return this.redo(),a();if(s&&n.toLowerCase()==="d")return this.duplicateSelected(),a();if(s)return;let l={ArrowLeft:[-i,0],ArrowRight:[i,0],ArrowUp:[0,-i],ArrowDown:[0,i]};if(l[n]&&this.selection)return this.nudge(...l[n],e.altKey),a();switch(n){case"Delete":case"Backspace":return this.removeSelected(),a();case"Escape":return this.selection=null,this.multi=[],this.paletteDrag=null,this.dialog=null,a();case"g":return this.snapOn=!this.snapOn,a();case"c":return this.showCompanions=!this.showCompanions,a();case"m":return this.showMoisture=!this.showMoisture,a();case"t":return this.showTemperature=!this.showTemperature,a();case"+":case"=":return this.canvas.zoom(1.2),a();case"-":return this.canvas.zoom(1/1.2),a();case"0":return this.canvas.fit(),a();case"?":return this.dialog="shortcuts",a();case"]":case"[":return this.cycleSelection(n==="]"?1:-1),a();default:}}cycleSelection(e){let t=[...this.draft.beds.map(a=>({kind:"bed",id:a.id})),...this.seasonPlantings.map(a=>({kind:"planting",id:a.id}))];if(!t.length)return;let s=this.selection?t.findIndex(a=>a.id===this.selection.id):-1;this.selection=t[(s+e+t.length)%t.length];let i=this.findItem(this.selection),n=this.selection.kind==="planting"?y(this.plantMap.get(i.plant_id),this.lang):i.name;this.announce(n)}announce(e){this.announcement="",requestAnimationFrame(()=>this.announcement=e)}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async exportPlan(e){let{filename:t,content:s}=await this.api.exportPlan(e);ft(t,s,e==="json"?"application/json":"application/yaml")}async importPlan(e){e.preventDefault();let t=e.target,s=t.elements.namedItem("file").files?.[0],i=t.elements.namedItem("mode").value;if(s)try{let n=await this.api.importPlan(await s.text(),i);this.history=null,this.saveState="saved",this.dialog=null,this.toast(this.t("planner.imported",{beds:n.counts.beds,plantings:n.counts.plantings}))}catch(n){this.toast(this.t("common.error",{message:n.message??String(n)}))}}async createSuccession(e){e.preventDefault();let t=this.selection,s=t?.kind==="planting"?this.draft.plantings.find(m=>m.id===t.id):void 0;if(!s)return;let i=e.target,n=Number(i.elements.namedItem("count").value),a=Number(i.elements.namedItem("interval").value)||null,l=i.elements.namedItem("placement").value,d=await this.api.succession(s,n,a,l),h=L(this.draft);h.plantings=h.plantings.filter(m=>m.id!==s.id).concat(d.plantings),this.dialog=null,this.commit(h,void 0,[s.bed_id]),d.dropped&&this.toast(this.t("planner.succession_dropped",{n:d.dropped}))}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal()}render(){if(!this.history)return o`<p class="empty">${this.t("common.loading")}</p>`;if(!this.hasLayout&&!this.draft.zones.length)return o`${this.renderStepper()}${this.renderToolbar()}${this.renderNoLayout()}${this.renderDialog()}`;let e=this.mode==="plant",t=this.paletteDrag,s=t?.rect?{rect:t.rect,valid:!!t.bedId,color:R(this.families,t.plant.family),label:this.ghostLabel()}:null;return o`
      ${this.renderStepper()}
      ${this.renderToolbar()}
      <div class="layout ${this.narrow?"narrow":""} ${this.paletteOpen||this.narrow?"":"palette-closed"}" @keydown=${this.onKeyDown}>
        ${this.paletteOpen||this.narrow?e?this.renderPalette():this.step==="zones"?this.renderZonesPane():this.renderSitePane():o`<div></div>`}
        <div class="center">
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
            @select=${i=>this.onSelect(i.detail)}
            @item-change=${this.onItemChange}
            @draw-rect=${this.onDrawRect}
            @zone-open=${i=>this.openZone(i.detail)}
          ></hl-garden-canvas>
          ${this.tool?o`<div class="draw-hint" role="status"><ha-icon icon="mdi:vector-rectangle"></ha-icon>
            ${this.t("planner.draw_hint",{what:this.toolInfo(this.tool).label})}
            <button class="btn small ghost" @click=${()=>this.tool=null}>${this.t("common.done")}</button></div>`:u}
          ${t?o`<div class="drag-ghost-hint" role="status">${s?s.label:y(t.plant,this.lang)}</div>`:u}
        </div>
        ${this.renderInspector()}
      </div>
      <div class="visually-hidden" role="status" aria-live="polite">${this.announcement}</div>
      ${this.renderDialog()}
    `}renderToolbar(){let e=this.mode==="plant",t=[this.season-1,this.season,this.season+1],s={saved:"common.saved",dirty:"common.unsaved",saving:"common.saving",error:"common.unsaved"}[this.saveState],i=(n,a,l,d,h=!1)=>o`
      <button class="icon-btn" title=${a} aria-label=${a} aria-pressed=${d===void 0?u:String(d)} ?disabled=${h} @click=${l}>
        <ha-icon icon=${n}></ha-icon>
      </button>`;return o`
      <div class="toolbar" role="toolbar" aria-label=${this.t("nav.planner")}>
        ${i("mdi:dock-left",this.t("planner.palette"),()=>this.paletteOpen=!this.paletteOpen,this.paletteOpen)}
        <label class="row small"><span class="visually-hidden">${this.t("planner.season")}</span>
          <select aria-label=${this.t("planner.season")} @change=${n=>this.setSeason(Number(n.target.value))}>
            ${t.map(n=>o`<option value=${n} ?selected=${n===this.season}>${this.t("common.season",{year:n})}${ke(this.snapshot,n)?n===this.snapshot.layout_season?` \xB7 ${this.t("layout.current")}`:"":` \xB7 ${this.t("layout.no_plan")}`}</option>`)}
          </select>
        </label>
        <span class="sep"></span>
        ${i("mdi:undo",`${this.t("planner.undo")} (Ctrl+Z)`,()=>this.undo(),void 0,!this.history?.canUndo||!this.admin)}
        ${i("mdi:redo",`${this.t("planner.redo")} (Ctrl+Y)`,()=>this.redo(),void 0,!this.history?.canRedo||!this.admin)}
        <span class="sep"></span>
        ${i("mdi:grid",`${this.t("planner.snap")} (G)`,()=>this.snapOn=!this.snapOn,this.snapOn)}
        ${e?o`
          ${i("mdi:handshake-outline",`${this.t("planner.overlay_companions")} (C)`,()=>this.showCompanions=!this.showCompanions,this.showCompanions)}
          ${i("mdi:water-percent",`${this.t("planner.overlay_moisture")} (M)`,()=>this.showMoisture=!this.showMoisture,this.showMoisture)}
          ${i("mdi:thermometer",`${this.t("planner.overlay_temperature")} (T)`,()=>this.showTemperature=!this.showTemperature,this.showTemperature)}`:u}
        <span class="sep"></span>
        ${i("mdi:texture-box",this.t("planner.layer_zones"),()=>this.showZones=!this.showZones,this.showZones)}
        ${i("mdi:map-marker-path",this.t("planner.layer_features"),()=>this.showFeatures=!this.showFeatures,this.showFeatures)}
        ${e?i("mdi:sprout",this.t("planner.layer_plantings"),()=>this.showPlantings=!this.showPlantings,this.showPlantings):u}
        ${this.multi.length>1?o`<span class="sep"></span>
          ${i("mdi:align-horizontal-left",this.t("planner.align.left"),()=>this.align("left"))}
          ${i("mdi:align-horizontal-center",this.t("planner.align.hcenter"),()=>this.align("hcenter"))}
          ${i("mdi:align-horizontal-right",this.t("planner.align.right"),()=>this.align("right"))}
          ${i("mdi:align-vertical-top",this.t("planner.align.top"),()=>this.align("top"))}
          ${i("mdi:align-vertical-center",this.t("planner.align.vcenter"),()=>this.align("vcenter"))}
          ${i("mdi:align-vertical-bottom",this.t("planner.align.bottom"),()=>this.align("bottom"))}
          ${i("mdi:distribute-horizontal-center",this.t("planner.align.hdistribute"),()=>this.align("hdistribute"),void 0,this.multi.length<3)}
          ${i("mdi:distribute-vertical-center",this.t("planner.align.vdistribute"),()=>this.align("vdistribute"),void 0,this.multi.length<3)}`:u}
        <span class="sep"></span>
        ${i("mdi:magnify-plus-outline",this.t("planner.zoom_in"),()=>this.canvas.zoom(1.2))}
        ${i("mdi:magnify-minus-outline",this.t("planner.zoom_out"),()=>this.canvas.zoom(1/1.2))}
        ${i("mdi:fit-to-screen-outline",this.t("planner.fit"),()=>this.canvas.fit())}
        <span class="sep"></span>
        ${e?o`<label class="row small">${this.t("planner.view_date")}
          <input type="date" .value=${this.viewDate} @change=${n=>this.viewDate=n.target.value} />
        </label>`:u}
        <span class="spacer"></span>
        <span class="save-state ${this.saveState==="error"?"error":""}" role="status">
          <ha-icon icon=${this.saveState==="saved"?"mdi:cloud-check-outline":"mdi:cloud-upload-outline"}></ha-icon>${this.t(s)}
        </span>
        ${this.admin&&e&&this.hasLayout?o`
          <button class="btn small primary" @click=${()=>this.openAutofill()}><ha-icon icon="mdi:auto-fix"></ha-icon>${this.t("autofill.title")}</button>`:u}
        ${this.admin&&!e&&this.hasLayout?o`
          <button class="btn small" @click=${()=>this.addBed()}><ha-icon icon="mdi:plus"></ha-icon>${this.t("planner.add_bed")}</button>`:u}
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
    `}renderStepper(){if(this.mode==="plant"){let s=this.draft.zones.find(i=>i.id===this.focusZone);return o`<nav class="stepper" aria-label=${this.t("nav.planner")}>
        <span class="step active"><ha-icon icon="mdi:sprout"></ha-icon>
          <span class="txt"><b>${this.t("planner.step.plant")} · ${this.t("common.season",{year:this.season})}</b>
          <span class="xs muted">${this.t("layout.planting_on",{season:this.season})}</span></span></span>
        <span class="spacer"></span>
        <span class="crumbs" aria-label=${this.t("planner.zone_map")}>
          <button class="chip ${s?"":"ok"}" @click=${()=>this.closeZone()}><ha-icon icon="mdi:home-outline"></ha-icon>${this.t("planner.whole_garden")}</button>
          ${s?o`<span aria-hidden="true">›</span><span class="chip ok">${X[s.type]?.icon??""} ${s.name}</span>`:u}
        </span>
      </nav>`}let e=[["site","mdi:vector-square","planner.step.site"],["zones","mdi:texture-box","planner.step.zones"]],t=this.draft.zones.find(s=>s.id===this.focusZone);return o`<nav class="stepper" aria-label=${this.t("planner.steps")}>
      ${e.map(([s,i,n],a)=>o`
        <button class="step ${this.step===s?"active":""}" aria-current=${this.step===s?"step":u}
          @click=${()=>{this.step=s,this.tool=null}}>
          <span class="num">${a+1}</span><ha-icon icon=${i}></ha-icon>
          <span class="txt"><b>${this.t(n)}</b><span class="xs muted">${this.t(`${n}.hint`)}</span></span>
        </button>${a<e.length-1?o`<span class="step-sep" aria-hidden="true">›</span>`:u}`)}
      <span class="spacer"></span>
      <span class="crumbs" aria-label=${this.t("planner.zone_map")}>
        <button class="chip ${t?"":"ok"}" @click=${()=>this.closeZone()}><ha-icon icon="mdi:home-outline"></ha-icon>${this.t("planner.whole_garden")}</button>
        ${t?o`<span aria-hidden="true">›</span><span class="chip ok">${X[t.type]?.icon??""} ${t.name}</span>`:u}
      </span>
    </nav>`}renderToolButton(e,t,s,i=""){let n=this.tool&&this.tool.kind===e.kind&&("type"in e?this.tool.type===e.type:this.tool.bedKind===e.bedKind);return o`<button class="tool ${n?"active":""}" aria-pressed=${String(!!n)} title=${i||s} ?disabled=${!this.admin}
      @click=${()=>this.tool=n?null:e}>
      <span class="tool-icon">${t}</span><span class="tool-label">${s}</span></button>`}renderFeatureGroups(){return o`${ni.map(([e,t])=>o`
      <h4>${this.t(`planner.elements.${e}`)}</h4>
      <div class="tool-grid">
        ${t.map(s=>this.renderToolButton({kind:"feature",type:s},Ee[s]?.icon||"\u25AD",this.t(`feature.${s}`)))}
      </div>`)}`}renderSitePane(){return o`<aside class="pane" aria-label=${this.t("planner.step.site")}>
      <header><h3>${this.t("planner.step.site")}</h3><hl-info term="zones" .t=${this.t}></hl-info></header>
      <div class="pane-body stack">
        <p class="small muted">${this.t("planner.site_intro")}</p>
        <h4>${this.t("planner.zones")}</h4>
        <div class="tool-grid">
          ${is.map(e=>this.renderToolButton({kind:"zone",type:e},X[e].icon,this.t(`settings.zone_type.${e}`),this.t(`zone_hint.${e}`)))}
        </div>
        ${this.renderFeatureGroups()}
        <div class="divider"></div>
        <h4>${this.t("planner.your_zones")} (${this.draft.zones.length})</h4>
        ${this.draft.zones.length?o`<div class="stack" style="gap:6px">${this.draft.zones.map(e=>o`
          <div class="zone-row"><span>${X[e.type]?.icon}</span>
            <span class="grow"><b>${e.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${e.type}`)} · ${(e.width_cm/100).toFixed(1)} × ${(e.length_cm/100).toFixed(1)} m</span></span>
            <button class="btn small ghost" @click=${()=>this.openZone(e.id)}>${this.t("planner.open_zone")}</button></div>`)}</div>`:o`<p class="xs muted">${this.t("planner.no_zones")}</p>`}
        ${this.draft.zones.length?o`<button class="btn primary" @click=${()=>{this.step="zones",this.tool=null}}>${this.t("planner.next")}: ${this.t("planner.step.zones")} ›</button>`:u}
      </div>
    </aside>`}renderZonesPane(){let e=this.draft.zones.find(i=>i.id===this.focusZone);if(!e)return o`<aside class="pane" aria-label=${this.t("planner.step.zones")}>
        <header><h3>${this.t("planner.step.zones")}</h3></header>
        <div class="pane-body stack">
          <p class="small muted">${this.t("planner.zones_intro")}</p>
          ${this.draft.zones.map(i=>{let n=this.draft.beds.filter(l=>l.zone_id===i.id),a=this.seasonPlantings.filter(l=>n.some(d=>d.id===l.bed_id)).length;return o`<button class="zone-card" style=${`border-left-color:${X[i.type]?.stroke}`} @click=${()=>this.openZone(i.id)}>
              <span class="big">${X[i.type]?.icon}</span>
              <span class="grow"><b>${i.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${i.type}`)} ·
                ${this.t("planner.n_beds",{n:n.length})} · ${this.t("planner.count",{n:a})}</span></span>
              <ha-icon icon="mdi:chevron-right"></ha-icon></button>`})}
          ${this.draft.zones.length?u:o`<button class="btn" @click=${()=>this.step="site"}>‹ ${this.t("planner.step.site")}</button>`}
        </div>
      </aside>`;let t=this.draft.beds.filter(i=>i.zone_id===e.id),s=!this.admin;return o`<aside class="pane" aria-label=${e.name}>
      <header><button class="icon-btn" aria-label=${this.t("planner.whole_garden")} @click=${()=>this.closeZone()}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <h3>${X[e.type]?.icon} ${e.name}</h3></header>
      <div class="pane-body stack">
        <label class="field">${this.t("planner.zone_name")}<input .value=${e.name} ?disabled=${s}
          @change=${i=>this.updateZone(e.id,{name:i.target.value})} /></label>
        <label class="field">${this.t("planner.kind")}
          <select ?disabled=${s} @change=${i=>this.updateZone(e.id,{type:i.target.value})}>
            ${is.map(i=>o`<option value=${i} ?selected=${e.type===i}>${this.t(`settings.zone_type.${i}`)}</option>`)}
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
        <div class="stack" style="gap:4px">${t.map(i=>o`<button class="zone-row as-btn" @click=${()=>this.onSelect({kind:"bed",id:i.id})}>
          <span>▭</span><span class="grow"><b>${i.name}</b> <span class="xs muted">${(i.width_cm/100).toFixed(1)} × ${(i.length_cm/100).toFixed(1)} m · ${this.t(`kind.${i.kind}`)}</span></span></button>`)}</div>
        <div class="divider"></div>
        <div class="row wrap">
          <button class="btn primary" @click=${()=>this.go("planner")}><ha-icon icon="mdi:sprout"></ha-icon>${this.t("layout.to_planner")}</button>
        </div>
      </div>
    </aside>`}go(e){this.dispatchEvent(new CustomEvent("navigate",{detail:e,bubbles:!0,composed:!0}))}updateZone(e,t){let s=L(this.draft),i=s.zones.find(n=>n.id===e);i&&(Object.assign(i,t),this.commit(s))}renderPalette(){let e=this.search.trim().toLowerCase(),t=this.draft.zones.find(a=>a.id===this.focusZone),s=t?Ns[t.type]:null,i=this.plants.filter(a=>s&&!this.categoryFilter&&!s.includes(a.category??"vegetable")||this.familyFilter&&a.family!==this.familyFilter||this.categoryFilter&&(a.category??"vegetable")!==this.categoryFilter?!1:e?[a.id,a.scientific_name,...Object.values(a.names)].some(l=>l.toLowerCase().includes(e)):!0).sort((a,l)=>y(a,this.lang).localeCompare(y(l,this.lang))),n=[...new Set(this.plants.map(a=>a.family))].sort();return o`
      <aside class="pane" aria-label=${this.t("planner.palette")}>
        <header>
          <h3>${this.t("planner.palette")}</h3>
          <span class="spacer"></span>
          <div class="segmented" role="group" aria-label=${this.t("planner.layout")}>
            ${["single","block","row"].map(a=>o`
              <button aria-pressed=${String(this.layoutMode===a)} @click=${()=>this.layoutMode=a}>${this.t(`planner.layout.${a}`)}</button>`)}
          </div>
        </header>
        <div class="pane-body stack">
          <input type="search" placeholder=${this.t("common.search")} aria-label=${this.t("common.search")} .value=${this.search}
            @input=${a=>this.search=a.target.value} />
          <div class="row wrap family-chips" role="group" aria-label=${this.t("lib.category")}>
            ${nn.map(a=>o`<button class="chip" aria-pressed=${String(this.categoryFilter===a)}
              @click=${()=>this.categoryFilter=this.categoryFilter===a?"":a}>${this.t(`category.${a}`)}</button>`)}
          </div>
          <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
            <select @change=${a=>this.familyFilter=a.target.value}>
              <option value="" ?selected=${!this.familyFilter}>${this.t("lib.family")}: ${this.t("common.all")}</option>
              ${n.map(a=>o`<option value=${a} ?selected=${this.familyFilter===a}>${this.families[a]?.[this.lang]??a}</option>`)}
            </select></label>
          ${t?o`<p class="xs zone-filter">${X[t.type]?.icon} ${this.t("planner.palette_for_zone",{zone:t.name})}</p>`:u}
          <p class="xs muted">${this.t("planner.palette_hint")}</p>
          <div class="palette-list" role="list">
            ${i.map(a=>{let l=y(a,this.lang);return o`
                <button class="plant-card" role="listitem" aria-label=${`${l}, ${a.scientific_name}`}
                  @pointerdown=${d=>this.onPalettePointerDown(d,a)}
                  @pointermove=${this.onPalettePointerMove}
                  @pointerup=${this.onPalettePointerUp}
                  @pointercancel=${()=>this.paletteDrag=null}
                  @keydown=${d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),this.addToSelectedBed(a))}}>
                  <span class="swatch" style=${`border-color:${R(this.families,a.family)}`}>${oe(ee(a),a.color||R(this.families,a.family),26)}</span>
                  <span class="meta"><span>${l}${a.perennial?o` <span class="perennial-tag" title=${this.t("planner.perennial")}>∞</span>`:u}</span>
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
            ${n.map(a=>o`<span><span class="family-dot" style=${`background:${R(this.families,a)}`}></span>${this.families[a]?.[this.lang]??a}</span>`)}
          </div>
          </div>
        </div>
      </aside>
    `}findingParams(e){let t={...e.params};for(let[s,i]of[[e.a,"a"],[e.b,"b"]]){let n=this.draft.plantings.find(a=>a.id===s);n&&n.season!==this.season&&!this.plantMap.get(n.plant_id)?.perennial&&typeof t[i]=="string"&&(t[i]=this.t("planner.other_season",{name:t[i],year:n.season}))}return t}renderFindings(e,t){let s=this.reports[e]??this.snapshot.analysis?.beds[e]?.compatibility,i=this.reports[e]?.rotation??this.snapshot.analysis?.beds[e]?.rotation??[],n=(s?.pairs??[]).filter(m=>!t||m.a===t||m.b===t),a=i.filter(m=>!t||m.planting===t),l=(s?.placement??[]).filter(m=>!t||m.planting===t),d=t?s?.out_of_bounds?.includes(t):(s?.out_of_bounds?.length??0)>0,h={error:"mdi:alert-octagon-outline",warning:"mdi:alert-outline",info:"mdi:heart-outline"};return!n.length&&!a.length&&!d&&!l.length?o`<p class="small muted">${this.t("planner.no_warnings")}</p>`:o`<div class="stack" style="gap:6px">
      ${n.map(m=>o`<div class="finding ${m.severity}"><ha-icon icon=${h[m.severity]}></ha-icon><span>${this.t(m.key,this.findingParams(m))}</span></div>`)}
      ${a.map(m=>o`<div class="finding ${m.severity}"><ha-icon icon="mdi:rotate-3d-variant"></ha-icon><span>${this.t(m.key,m.params)}
        <hl-info term="rotation" .t=${this.t}></hl-info>
        ${m.alternatives?.length?o`<br /><span class="xs">${this.t("planner.alternatives")}:
          ${m.alternatives.map(v=>o`<button class="chip" ?disabled=${!this.admin} @click=${()=>this.moveToBed(m.planting,v)}>${this.draft.beds.find(b=>b.id===v)?.name??v}</button>`)}</span>`:u}</span></div>`)}
      ${t&&s?.suggestions?.[t]?.length?o`<div class="finding info"><ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
        <span>${this.t("planner.better_neighbours")}: ${s.suggestions[t].map(m=>y(this.plantMap.get(m),this.lang)).join(", ")}</span></div>`:u}
      ${l.map(m=>o`<div class="finding warning"><ha-icon icon="mdi:greenhouse"></ha-icon><span>${this.t(m.key,m.params)}</span></div>`)}
      ${d?o`<div class="finding warning"><ha-icon icon="mdi:border-outside"></ha-icon><span>${this.t("planner.out_of_bounds")}</span></div>`:u}
    </div>`}renderTimeline(e){if(!e)return o`<p class="small muted">–</p>`;let s=this.snapshot.settings.region.hemisphere==="south"?`${this.season}-07-01`:`${this.season}-01-01`,i=485,n=h=>h?Math.max(0,Math.min(100,we(s,h)/i*100)):null,a=(h,m,v,b,w)=>{let $=n(h),x=n(m);return $===null||x===null?u:o`<div class="bar" title=${`${w}: ${k(h,this.lang)} \u2013 ${k(m,this.lang)}`}
        style=${`left:${$}%;width:${Math.max(x-$,1)}%;top:${v}px;background:${b}`}></div>`},l=Array.from({length:16},(h,m)=>B(s,Math.round(m*30.4))),d=this.snapshot.analysis?.today;return o`
      <div class="timeline" role="img" aria-label=${`${this.t("lib.harvest")} ${k(e.harvest_start,this.lang)} \u2013 ${k(e.harvest_end,this.lang)}`}>
        ${a(e.sow_window?.start,e.sow_window?.end,6,"var(--hl-leaf-300)",this.t(e.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow"))}
        ${a(e.transplant_window?.start,e.transplant_window?.end,20,"var(--hl-leaf-600)",this.t("lib.transplant"))}
        ${a(e.in_ground,e.harvest_start,34,"color-mix(in srgb, var(--hl-leaf-500) 35%, transparent)",this.t("dash.active_crops",{n:1}))}
        ${a(e.harvest_start,e.harvest_end,34,"var(--hl-sun-500)",this.t("lib.harvest"))}
        ${l.filter((h,m)=>m%2===0).map(h=>o`<span class="month" style=${`left:${n(h)}%`}>${k(h,this.lang,{month:"short"})}</span>`)}
        ${d&&n(d)!==null?o`<div class="today" style=${`left:${n(d)}%`}></div>`:u}
      </div>
      <div class="xs muted" style="margin-top:4px">
        ${e.sow_date?o`${this.t(e.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}: <b>${k(e.sow_date,this.lang)}</b> · `:u}
        ${e.transplant_date?o`${this.t("lib.transplant")}: <b>${k(e.transplant_date,this.lang)}</b> · `:u}
        ${this.t("lib.harvest")}: <b>${k(e.harvest_start,this.lang)} – ${k(e.harvest_end,this.lang)}</b>
      </div>`}renderPhenology(e){let t=this.snapshot.analysis?.phenology?.[e];return!t||t.stage==="not_planted"?u:o`<div class="row wrap">
      <span class="chip ok"><ha-icon icon="mdi:sprout"></ha-icon>${this.t(`stage.${t.stage}`)}</span>
      <span class="chip">Kc ${t.kc.toFixed(2)} <hl-info term="kc" .t=${this.t}></hl-info></span>
      ${t.gdd!=null&&t.gdd_target?o`<span class="chip">${Math.round(t.gdd)} / ${t.gdd_target} GDD <hl-info term="gdd" .t=${this.t}></hl-info></span>`:u}
      ${t.harvest_estimate?o`<span class="chip warn"><ha-icon icon="mdi:basket-outline"></ha-icon>${this.t("cal.harvest_estimate",{date:k(t.harvest_estimate,this.lang)})}</span>`:u}
      ${t.heat_stress_days?o`<span class="chip bad">${this.t("planner.heat_stress",{n:t.heat_stress_days})}</span>`:u}
    </div>`}renderAutofill(){let e=this.autofillResources,t=l=>this.autofillResources={...e,...l},s=this.autofill,i=[...this.plants].sort((l,d)=>y(l,this.lang).localeCompare(y(d,this.lang))),n=()=>this.dialog=null,a=l=>this.draft.beds.find(d=>d.id===l)?.name??l;return o`<div class="stack">
      <h2><ha-icon icon="mdi:auto-fix"></ha-icon> ${this.t("autofill.title")} <hl-info term="autofill" .t=${this.t}></hl-info></h2>
      <p class="small muted">${this.t("autofill.intro",{season:this.season})}</p>
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
        ${sn.map(l=>o`<button class="chip" aria-pressed=${String(e.goals.includes(l))}
          @click=${()=>t({goals:e.goals.includes(l)?e.goals.filter(d=>d!==l):[...e.goals,l]})}>${this.t(`autofill.goal.${l}`)}</button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("autofill.wanted")}
          <select @change=${l=>{let d=l.target;d.value&&!e.wanted.includes(d.value)&&t({wanted:[...e.wanted,d.value]}),d.value=""}}>
            <option value="">+</option>${i.map(l=>o`<option value=${l.id}>${y(l,this.lang)}</option>`)}</select></label>
        <label class="field">${this.t("autofill.excluded")}
          <select @change=${l=>{let d=l.target;d.value&&!e.excluded.includes(d.value)&&t({excluded:[...e.excluded,d.value]}),d.value=""}}>
            <option value="">+</option>${i.map(l=>o`<option value=${l.id}>${y(l,this.lang)}</option>`)}</select></label>
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
          ${s.placements.map(l=>o`<tr><td><span class="family-dot" style=${`background:${R(this.families,this.plantMap.get(l.plant_id)?.family)}`}></span>
            ${y(this.plantMap.get(l.plant_id),this.lang)}${l.sowings>1?o` <span class="xs muted">×${l.sowings}</span>`:u}</td>
            <td>${a(l.bed_id)}</td><td align="right">${l.count}</td><td align="right">${l.area_m2.toFixed(1)}</td><td align="right">${l.yield_kg.toFixed(1)}</td></tr>`)}
        </table></div>
        ${s.skipped.length?o`<p class="xs muted">${this.t("autofill.skipped")}: ${s.skipped.map(l=>`${y(this.plantMap.get(l.plant_id),this.lang)} (${this.t(`autofill.reason.${l.reason}`)})`).join(", ")}</p>`:u}
      `:u}
      <div class="row" style="justify-content:flex-end">
        <button class="btn ghost" @click=${n}>${this.t("common.cancel")}</button>
        <button class="btn primary" ?disabled=${!s?.plantings.length} @click=${()=>this.applyAutofill()}>${this.t("autofill.apply")}</button>
      </div>
    </div>`}renderSoilTests(e){let t=[...this.snapshot.beds.find(n=>n.id===e)?.soil_tests??[]].reverse(),s=this.soilForm,i=(n,a,l=.1)=>o`<label class="field">${a}
      <input type="number" step=${l} min="0" .value=${s?.[n]==null?"":String(s[n])}
        @input=${d=>{let h=d.target.value;this.soilForm={...this.soilForm,[n]:h===""?null:Number(h)}}} /></label>`;return o`<details class="tips" ?open=${!!s}><summary><ha-icon icon="mdi:test-tube"></ha-icon> ${this.t("soil_test.title")}
        ${t[0]?o`<span class="xs muted">· ${k(t[0].date,this.lang)}${t[0].ph!=null?` \xB7 pH ${t[0].ph}`:""}</span>`:u}</summary>
      ${t.length?o`<table class="soil"><thead><tr><th>${this.t("journal.day")}</th><th>pH</th><th>OM%</th><th>P</th><th>K</th><th></th></tr></thead><tbody>
        ${t.map(n=>o`<tr><td>${k(n.date,this.lang)}</td><td>${n.ph??"\u2013"}</td><td>${n.organic_matter_pct??"\u2013"}</td><td>${n.p_mg??"\u2013"}</td><td>${n.k_mg??"\u2013"}</td>
          <td>${this.admin?o`<button class="icon-btn" aria-label=${this.t("planner.remove")} @click=${()=>this.deleteSoil(e,n.date)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`:u}</td></tr>`)}
      </tbody></table>`:o`<p class="xs muted">${this.t("soil_test.none")}</p>`}
      ${this.admin?s?o`<div class="form-grid">
          <label class="field">${this.t("journal.day")}<input type="date" .value=${s.date??""} @input=${n=>this.soilForm={...s,date:n.target.value}} /></label>
          ${i("ph","pH")} ${i("organic_matter_pct",this.t("soil_test.om"))} ${i("n_mg","N (mg/100 g)",1)}
          ${i("p_mg","P (mg/100 g)",1)} ${i("k_mg","K (mg/100 g)",1)} ${i("mg_mg","Mg (mg/100 g)",1)}
          <label class="field">${this.t("soil_test.lime")}<select @change=${n=>this.soilForm={...s,lime_status:n.target.value||null}}>
            ${["","low","ok","high"].map(n=>o`<option value=${n} ?selected=${(s.lime_status??"")===n}>${n?this.t(`soil_test.lime.${n}`):"\u2013"}</option>`)}</select></label>
          <label class="field full">${this.t("task.notes")}<input .value=${s.notes??""} @input=${n=>this.soilForm={...s,notes:n.target.value}} /></label>
        </div>
        <div class="row"><button class="btn small primary" ?disabled=${!s.date} @click=${()=>this.saveSoil(e)}>${this.t("common.save")}</button>
          <button class="btn small ghost" @click=${()=>this.soilForm=null}>${this.t("common.cancel")}</button></div>
        <p class="xs muted">${this.t("soil_test.hint")}</p>`:o`<button class="btn small" @click=${()=>this.soilForm={date:new Date().toISOString().slice(0,10)}}><ha-icon icon="mdi:plus"></ha-icon>${this.t("soil_test.add")}</button>`:u}
    </details>`}async saveSoil(e){if(this.soilForm?.date)try{await this.api.saveSoilTest(e,this.soilForm),this.soilForm=null,this.toast(this.t("settings.saved"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async deleteSoil(e,t){try{await this.api.deleteSoilTest(e,t)}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderHarvestQuick(e){let s=(this.snapshot.harvest_log??[]).filter(a=>a.planting_id===e.id).reduce((a,l)=>a+l.kg,0),i=(this.snapshot.journal??[]).filter(a=>a.planting_id===e.id).slice(-3).reverse(),n=this.snapshot.plantings.some(a=>a.id===e.id);return o`<div class="stack" style="gap:6px">
      <h4><ha-icon icon="mdi:basket-outline"></ha-icon> ${this.t("journal.harvest")}${s?o` · ${s.toFixed(2)} kg`:u}</h4>
      ${this.admin&&n?o`<div class="row">
        <input type="number" min="0" step="0.05" style="width:90px" placeholder="kg" aria-label="kg" .value=${this.harvestKg}
          @input=${a=>this.harvestKg=a.target.value} />
        <button class="btn small" ?disabled=${!(Number(this.harvestKg)>0)} @click=${()=>this.logHarvest(e)}>${this.t("journal.log_harvest")}</button>
      </div>`:u}
      ${i.length?o`<ul class="notes">${i.map(a=>o`<li class="xs"><b>${k(a.at.slice(0,10),this.lang)}</b> ${a.text}
        ${a.photos.length?o`<ha-icon icon="mdi:camera-outline"></ha-icon>`:u}</li>`)}</ul>`:u}
    </div>`}async logHarvest(e){let t=Number(this.harvestKg);if(t>0)try{await this.api.logHarvest({planting_id:e.id,kg:t}),this.harvestKg="",this.toast(this.t("journal.harvest_saved"))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderInspector(){let e=this.selection,t=e?this.findItem(e):void 0,s=!this.admin||this.locked(e?.kind),i;if(!e||!t)i=o`<p class="small muted">${this.t("planner.nothing_selected")}</p><p class="xs muted">${this.t("planner.multi_hint")}</p>`;else if(this.multi.length>1)i=o`<h3>${this.t("planner.selected_n",{n:this.multi.length})}</h3>
        <p class="small muted">${this.t("planner.multi_hint")}</p>
        <div class="row wrap">
          ${["left","hcenter","right","top","vcenter","bottom","hdistribute","vdistribute"].map(n=>o`
            <button class="btn small" ?disabled=${s||n.endsWith("distribute")&&this.multi.length<3} @click=${()=>this.align(n)}>${this.t(`planner.align.${n}`)}</button>`)}
        </div>
        ${!s&&(e.kind==="planting"||e.kind==="feature")?o`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`:u}`;else if(e.kind==="feature"){let n=t;i=o`<h3>${n.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${n.name} ?disabled=${s}
            @change=${a=>this.updateSelected({name:a.target.value})} /></label>
          <label class="field full">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${a=>this.updateSelected({type:a.target.value})}>
              ${Qi.map(a=>o`<option value=${a} ?selected=${n.type===a}>${this.t(`feature.${a}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(n.width_cm)} ?disabled=${s}
            @change=${a=>this.updateSelected({width_cm:Number(a.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(n.length_cm)} ?disabled=${s}
            @change=${a=>this.updateSelected({length_cm:Number(a.target.value)})} /></label>
          <label class="field full">${this.t("task.notes")}<textarea rows="2" .value=${n.notes} ?disabled=${s}
            @change=${a=>this.updateSelected({notes:a.target.value})}></textarea></label>
        </div>
        ${s?u:o`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}`}else if(e.kind==="planting"){let n=t,a=this.plantMap.get(n.plant_id),l=this.draft.beds.find(h=>h.id===n.bed_id),d=this.snapshot.analysis?.advice[n.id];i=o`
        <div class="row">
          <span class="family-dot" style=${`background:${R(this.families,a?.family)};width:14px;height:14px`}></span>
          <h3>${y(a,this.lang)}</h3>
        </div>
        <p class="xs muted">${a?.scientific_name} · ${this.families[a?.family??""]?.[this.lang]??a?.family} · ${l?.name}</p>
        ${a?.perennial?o`<div class="finding info"><ha-icon icon="mdi:all-inclusive"></ha-icon><span>${this.t("planner.perennial_since",{season:n.season})}
          ${a.years_to_bearing?o`<br />${this.t("planner.bearing_from",{season:n.season+a.years_to_bearing})}`:u}</span></div>`:u}
        ${a?.pollination&&a.pollination!=="self"?o`<p class="xs"><ha-icon icon="mdi:bee"></ha-icon> ${this.t(`pollination.${a.pollination}`)}</p>`:u}
        <div class="form-grid">
          <label class="field">${this.t("planner.layout")}
            <select ?disabled=${s} @change=${h=>this.updateSelected({layout:h.target.value})}>
              ${["single","block","row"].map(h=>o`<option value=${h} ?selected=${n.layout===h}>${this.t(`planner.layout.${h}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.status")}
            <select ?disabled=${s} @change=${h=>this.updateSelected({status:h.target.value})}>
              ${["planned","sown_indoors","sown","transplanted","harvesting","finished","failed"].map(h=>o`<option value=${h} ?selected=${n.status===h}>${this.t(`status.${h}`)}</option>`)}
            </select></label>
          <label class="field full">${this.t("planner.method")}
            <select ?disabled=${s} @change=${h=>this.updateSelected({method:h.target.value})}>
              ${["indoor_sow","direct_sow","transplant"].map(h=>o`<option value=${h} ?selected=${n.method===h}>${this.t(`planner.method.${h}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="5" step="5" .value=${String(Math.round(n.width_cm))} ?disabled=${s}
            @change=${h=>this.updateSelected({width_cm:Number(h.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="5" step="5" .value=${String(Math.round(n.length_cm))} ?disabled=${s}
            @change=${h=>this.updateSelected({length_cm:Number(h.target.value)})} /></label>
          <label class="field full">${this.t(n.method==="transplant"?"lib.transplant":n.method==="indoor_sow"?"lib.indoor_sow":"lib.direct_sow")}
            <input type="date" ?disabled=${s} .value=${(n.method==="transplant"?n.transplant_date:n.sow_date)??""}
              @change=${h=>this.updateSelected(n.method==="transplant"?{transplant_date:h.target.value||null}:{sow_date:h.target.value||null})} /></label>
        </div>
        <p class="small">${a?this.t("planner.count",{n:Js(n,a)}):""}</p>
        ${d?.reasons.length?o`<div class="stack" style="gap:4px">${d.reasons.filter(h=>h.key!=="reason.window_open").map(h=>o`<p class="small">${this.t(h.key,h.params)}</p>`)}</div>`:u}
        ${this.renderPhenology(n.id)}
        ${this.renderHarvestQuick(n)}
        <h4>${this.t("planner.timeline")}</h4>
        ${this.renderTimeline(this.timelines[n.id])}
        <h4>${this.t("planner.warnings")}</h4>
        ${this.renderFindings(n.bed_id,n.id)}
        ${a?.tips?.[this.lang]?.length||a?.tips?.en?.length?o`<details class="tips" open><summary>${this.t("planner.eco_tips")}</summary>
          <ul>${(a.tips[this.lang]??a.tips.en).map(h=>o`<li>${h}</li>`)}</ul></details>`:u}
        ${s?u:o`
          <div class="row wrap">
            <button class="btn small" @click=${()=>this.dialog="succession"}><ha-icon icon="mdi:calendar-multiple"></ha-icon>${this.t("planner.succession")}</button>
            <button class="btn small ghost" @click=${()=>this.duplicateSelected()}>${this.t("planner.duplicate")}</button>
            <button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>
          </div>`}
      `}else if(e.kind==="bed"){let n=t,a=this.snapshot.analysis?.beds[n.id],l=this.reports[n.id]??a?.compatibility;i=o`
        <h3>${n.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${n.name} ?disabled=${s}
            @change=${d=>this.updateSelected({name:d.target.value})} /></label>
          <label class="field">${this.t("planner.zone")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({zone_id:d.target.value})}>
              ${this.draft.zones.map(d=>o`<option value=${d.id} ?selected=${n.zone_id===d.id}>${d.name}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({kind:d.target.value})}>
              ${["in_ground","raised","container"].map(d=>o`<option value=${d} ?selected=${n.kind===d}>${this.t(`kind.${d}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(n.width_cm)} ?disabled=${s}
            @change=${d=>this.updateSelected({width_cm:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(n.length_cm)} ?disabled=${s}
            @change=${d=>this.updateSelected({length_cm:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.soil")}
            <select ?disabled=${s} @change=${d=>this.updateSelected({soil:d.target.value})}>
              ${["sandy","loam","clay","silt","peat","chalk","potting_mix"].map(d=>o`<option value=${d} ?selected=${n.soil===d}>${this.t(`soil.${d}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.orientation")}<input type="number" min="0" max="359" step="15" .value=${String(n.orientation_deg)} ?disabled=${s}
            @change=${d=>this.updateSelected({orientation_deg:Number(d.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(n.shade_pct??"")} ?disabled=${s}
            @change=${d=>this.updateSelected({shade_pct:d.target.value===""?null:Number(d.target.value)})} /></label>
        </div>
        ${a?o`
          <div class="row wrap">
            <span class="chip ${a.moisture_status==="optimal"?"ok":a.moisture_status==="dry"?"bad":a.moisture_status==="unknown"?"":"warn"}">
              <ha-icon icon="mdi:water-percent"></ha-icon>${this.t(`moisture.${a.moisture_status}`)}${a.irrigation.moisture!=null?` \xB7 ${Math.round(a.irrigation.moisture)}%`:""}</span>
            <span class="chip">${this.t(`irrigation.${a.irrigation.action}`,{mm:a.irrigation.amount_mm,liters:Math.round(a.irrigation.liters)})}</span>
          </div>`:u}
        <div class="row"><span class="score">${Math.round(l?.score??50)}</span><span class="small muted">${this.t("planner.score")}</span></div>
        ${this.renderFindings(n.id)}
        ${this.renderSoilTests(n.id)}
        ${s?u:o`<div class="row"><button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button></div>`}
      `}else{let n=t;i=o`
        <h3>${n.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${n.name} ?disabled=${s}
            @change=${a=>this.updateSelected({name:a.target.value})} /></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${s} @change=${a=>this.updateSelected({type:a.target.value})}>
              ${is.map(a=>o`<option value=${a} ?selected=${n.type===a}>${this.t(`settings.zone_type.${a}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.wind")}
            <select ?disabled=${s} @change=${a=>this.updateSelected({wind:a.target.value},"microclimate")}>
              ${["sheltered","moderate","exposed"].map(a=>o`<option value=${a} ?selected=${n.microclimate.wind===a}>${this.t(`wind.${a}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="50" step="10" .value=${String(n.width_cm)} ?disabled=${s}
            @change=${a=>this.updateSelected({width_cm:Number(a.target.value)})} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="50" step="10" .value=${String(n.length_cm)} ?disabled=${s}
            @change=${a=>this.updateSelected({length_cm:Number(a.target.value)})} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(n.microclimate.shade_pct)} ?disabled=${s}
            @change=${a=>this.updateSelected({shade_pct:Number(a.target.value)},"microclimate")} /></label>
          <label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${n.microclimate.heated} ?disabled=${s}
            @change=${a=>this.updateSelected({heated:a.target.checked},"microclimate")} />${this.t("settings.heated")}</label>
          <label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${!!n.microclimate.wall_heat} ?disabled=${s}
            @change=${a=>this.updateSelected({wall_heat:a.target.checked},"microclimate")} />${this.t("settings.wall_heat")}
            <hl-info term="microclimate" .t=${this.t}></hl-info></label>
          ${n.type==="greenhouse"||n.type==="cold_frame"?o`<label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${!!n.microclimate.thermal_mass} ?disabled=${s}
            @change=${a=>this.updateSelected({thermal_mass:a.target.checked},"microclimate")} />${this.t("settings.thermal_mass")}</label>`:u}
        </div>
        <div class="row wrap">
          <button class="btn small" @click=${()=>this.openZone(n.id)}><ha-icon icon="mdi:map-search-outline"></ha-icon>${this.t("planner.open_zone")}</button>
          ${s?u:o`<button class="btn small danger" @click=${()=>this.removeSelected()}>${this.t("planner.remove")}</button>`}
        </div>
      `}return o`<aside class="pane" aria-label=${this.t("planner.inspector")}>
      <header><h3>${this.t("planner.inspector")}</h3></header>
      <div class="pane-body stack">${i}</div>
    </aside>`}renderNoLayout(){let e=this.snapshot,t=e.layout_season??this.season,s=[...new Set([this.season-1,t,this.season+1])].filter(n=>n!==this.season&&ke(e,n)),i=this.admin&&this.mode==="layout";return o`<section class="card stack no-layout" aria-live="polite">
      <h2><ha-icon icon="mdi:floor-plan"></ha-icon> ${this.t("layout.none_title",{season:this.season})}</h2>
      <p>${this.t(this.mode==="plant"?"layout.none_plant":"layout.none_intro",{season:this.season,live:t})}</p>
      <div class="row wrap">
        ${i?o`
          ${s.map(n=>o`<button class="btn primary" @click=${()=>this.startLayout(n)}><ha-icon icon="mdi:content-copy"></ha-icon>${this.t("layout.copy_from",{season:n})}</button>`)}
          <button class="btn" @click=${()=>this.startLayout(null)}><ha-icon icon="mdi:vector-square"></ha-icon>${this.t("layout.start_empty")}</button>`:o`<button class="btn primary" @click=${()=>this.go("layout")}><ha-icon icon="mdi:floor-plan"></ha-icon>${this.t("layout.make",{season:this.season})}</button>`}
        ${this.season===t+1?o`<button class="btn" @click=${()=>this.dialog="transition"}>
          <ha-icon icon="mdi:calendar-arrow-right"></ha-icon>${this.t("year.title",{from:t,to:this.season})}</button>`:u}
      </div>
      <p class="xs muted">${this.t("layout.none_hint")}</p>
    </section>`}onTransitionDone(e){let t=e.detail;this.dialog=null,this.toast(this.t(t.activated?"year.done":"year.prepared",{season:t.season,n:t.carried.length})+(t.skipped.length?` ${this.t("year.skipped",{n:t.skipped.length})}`:"")),this.seasonChosen=!0,this.season=t.season,this.saveState="saved",this.syncFromSnapshot(!0),this.dispatchEvent(new CustomEvent("season-changed",{detail:t.season,bubbles:!0,composed:!0}))}renderDialog(){if(this.removing){let s=this.removing,i=y(this.plantMap.get(s.plant_id),this.lang);return o`<dialog @close=${()=>this.removing=null}>
        <div class="stack">
          <h2><ha-icon icon="mdi:tree-outline"></ha-icon> ${this.t("planner.remove_perennial",{name:i})}</h2>
          <p class="small">${this.t("planner.remove_perennial_intro",{name:i,season:s.season})}</p>
          <button class="btn primary" @click=${()=>this.removePerennial("season")}>${this.t("planner.remove_from_season",{season:this.season})}</button>
          <p class="xs muted">${this.t("planner.remove_from_season_hint")}</p>
          <button class="btn danger" @click=${()=>this.removePerennial("delete")}>${this.t("planner.remove_everywhere")}</button>
          <p class="xs muted">${this.t("planner.remove_everywhere_hint")}</p>
          <div class="row" style="justify-content:flex-end"><button class="btn ghost" @click=${()=>this.removing=null}>${this.t("common.cancel")}</button></div>
        </div></dialog>`}if(!this.dialog)return u;let e=()=>this.dialog=null,t;if(this.dialog==="shortcuts"){let s=[["\u2190 \u2191 \u2192 \u2193","shortcut.move"],["Alt + \u2190 \u2191 \u2192 \u2193","planner.width"],["Ctrl + Z","shortcut.undo"],["Ctrl + Y","shortcut.redo"],["Delete","shortcut.delete"],["Ctrl + D","shortcut.duplicate"],["[ ]","shortcut.cycle"],["G","shortcut.grid"],["C","shortcut.companions"],["M","shortcut.moisture"],["+ / \u2212 / 0","shortcut.zoom"],["Esc","shortcut.escape"],["?","shortcut.help"]];t=o`<h2>${this.t("planner.shortcuts")}</h2>
        <table class="shortcuts">${s.map(([i,n])=>o`<tr><td><kbd>${i}</kbd></td><td>${this.t(n)}</td></tr>`)}</table>
        <div class="row" style="justify-content:flex-end"><button class="btn" @click=${e}>${this.t("common.close")}</button></div>`}else if(this.dialog==="transition")t=o`<hl-year-transition .api=${this.api} .t=${this.t} .snapshot=${this.snapshot} .plants=${this.plants}
        .families=${this.families} lang=${this.lang} ?admin=${this.admin}
        .fromSeason=${this.snapshot.transition_due??this.snapshot.layout_season??null}
        @close=${e} @transition-done=${this.onTransitionDone}></hl-year-transition>`;else if(this.dialog==="autofill")t=this.renderAutofill();else if(this.dialog==="succession"){let s=this.selection?this.draft.plantings.find(n=>n.id===this.selection.id):void 0,i=s&&this.plantMap.get(s.plant_id);t=o`<form class="stack" @submit=${this.createSuccession}>
        <h2>${this.t("planner.succession")} – ${y(i,this.lang)}</h2>
        <label class="field">${this.t("planner.succession_count")}<input name="count" type="number" min="2" max="12" value="3" required /></label>
        <label class="field">${this.t("planner.succession_interval")}<input name="interval" type="number" min="3" max="90" .value=${String(i?.succession_interval_days??21)} /></label>
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
      </form>`;return o`<dialog @close=${e} style=${this.dialog==="autofill"||this.dialog==="transition"?"max-width:820px":""}>${t}</dialog>`}};_.styles=[A,T`
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
    `],p([g({attribute:!1})],_.prototype,"snapshot",2),p([g({attribute:!1})],_.prototype,"plants",2),p([g({attribute:!1})],_.prototype,"families",2),p([g({attribute:!1})],_.prototype,"api",2),p([g({attribute:!1})],_.prototype,"t",2),p([g()],_.prototype,"lang",2),p([g({type:Boolean})],_.prototype,"admin",2),p([g({type:Boolean})],_.prototype,"narrow",2),p([g({reflect:!0})],_.prototype,"mode",2),p([g({type:Number})],_.prototype,"transitionRequest",2),p([g({type:Number})],_.prototype,"initialSeason",2),p([f()],_.prototype,"draft",2),p([f()],_.prototype,"selection",2),p([f()],_.prototype,"multi",2),p([f()],_.prototype,"showFeatures",2),p([f()],_.prototype,"showPlantings",2),p([f()],_.prototype,"showZones",2),p([f()],_.prototype,"categoryFilter",2),p([f()],_.prototype,"autofill",2),p([f()],_.prototype,"autofillBusy",2),p([f()],_.prototype,"autofillReplace",2),p([f()],_.prototype,"autofillBeds",2),p([f()],_.prototype,"autofillResources",2),p([f()],_.prototype,"season",2),p([f()],_.prototype,"saveState",2),p([f()],_.prototype,"reports",2),p([f()],_.prototype,"extraTimelines",2),p([f()],_.prototype,"snapOn",2),p([f()],_.prototype,"showCompanions",2),p([f()],_.prototype,"showMoisture",2),p([f()],_.prototype,"showTemperature",2),p([f()],_.prototype,"viewDate",2),p([f()],_.prototype,"layoutMode",2),p([f()],_.prototype,"search",2),p([f()],_.prototype,"familyFilter",2),p([f()],_.prototype,"paletteDrag",2),p([f()],_.prototype,"ghostReport",2),p([f()],_.prototype,"dialog",2),p([f()],_.prototype,"announcement",2),p([f()],_.prototype,"paletteOpen",2),p([f()],_.prototype,"step",2),p([f()],_.prototype,"tool",2),p([f()],_.prototype,"focusZone",2),p([f()],_.prototype,"removing",2),p([f()],_.prototype,"soilForm",2),p([f()],_.prototype,"harvestKg",2),p([ut("hl-garden-canvas")],_.prototype,"canvas",2),_=p([j("hl-planner-view")],_);var an={id:"",names:{en:"",nl:""},scientific_name:"",family:"Asteraceae",variety:null,habit:"bush",perennial:!1,spacing_cm:30,row_spacing_cm:30,sowing_depth_cm:1,germination_days:[7,14],min_soil_temp_c:8,optimal_soil_temp_c:18,max_soil_temp_c:null,days_to_maturity:[60,80],maturity_from:"sow",harvest_duration_days:14,harvestable:!0,continuous_harvest:!1,harvest_interval_days:null,transplant_age_days:[35,49],sowing:{indoor_sow:[],direct_sow:[{start_week:-2,end_week:8,anchor:"last_frost"}],transplant:[]},greenhouse:{suitability:"conditional",min_night_c:5,max_day_c:30,season_extension_weeks:2,notes:{}},frost_tolerance:"half_hardy",min_temp_c:0,max_temp_c:30,companions:[],rotation_years:3,pests:[],diseases:[],water_needs:"medium",nutrient_needs:"medium",feeding_interval_days:null,care:[],pruning_notes:{},thinning:!1,succession_interval_days:null,gdd_base_c:10,gdd_to_maturity:null,tags:[],source:"custom"},F=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.query="";this.family="";this.category="";this.filter="";this.selected=null;this.editing=null;this.error=""}get anchors(){return this.snapshot.analysis?.anchors??{last_frost:`${new Date().getFullYear()}-04-20`,first_frost:`${new Date().getFullYear()}-10-25`}}seasonStart(){let e=this.anchors.last_frost;return this.snapshot.settings.region.hemisphere==="south"?`${e.slice(0,4)}-07-01`:`${e.slice(0,4)}-01-01`}renderCalendar(e){let t=this.seasonStart(),s=d=>Math.max(0,Math.min(100,we(t,d)/365*100)),i=[],n=(d,h,m)=>{for(let v of d){let[b,w]=Wt(v,this.anchors);i.push(o`<div class="b" style=${`left:${s(b)}%;width:${Math.max(s(w)-s(b),1)}%;top:${h}px;background:${m}`}></div>`)}};n(e.sowing.indoor_sow,2,"var(--hl-leaf-300)"),n(e.sowing.direct_sow,8,"var(--hl-leaf-500)"),n(e.sowing.transplant,14,"var(--hl-leaf-700)");let a=[...e.sowing.direct_sow,...e.sowing.transplant][0];if(a&&e.harvestable){let[d,h]=Wt(a,this.anchors),m=e.maturity_from==="transplant"&&!e.sowing.transplant.length?e.germination_days[1]+14:0;i.push(o`<div class="b" style=${`left:${s(B(d,e.days_to_maturity[0]+m))}%;width:${Math.max(s(B(h,e.days_to_maturity[1]+m+e.harvest_duration_days))-s(B(d,e.days_to_maturity[0]+m)),1)}%;top:20px;background:var(--hl-sun-500)`}></div>`)}let l=Array.from({length:12},(d,h)=>k(B(t,Math.round(h*30.5+10)),this.lang,{month:"narrow"}));return o`<div class="cal" role="img" aria-label=${this.t("lib.calendar")}>${l.map(d=>o`<div class="m">${d}</div>`)}${i}</div>`}filtered(){let e=this.query.trim().toLowerCase();return this.plants.filter(t=>!this.family||t.family===this.family).filter(t=>!this.category||(t.category??"vegetable")===this.category).filter(t=>this.filter!=="greenhouse"||t.greenhouse.suitability==="yes").filter(t=>this.filter!=="quick"||t.days_to_maturity[0]<=50).filter(t=>this.filter!=="custom"||t.source!=="builtin").filter(t=>!e||[t.id,t.scientific_name,t.family,this.families[t.family]?.[this.lang]??"",...Object.values(t.names)].some(s=>s.toLowerCase().includes(e))).sort((t,s)=>y(t,this.lang).localeCompare(y(s,this.lang)))}render(){let e=[...new Set(this.plants.map(t=>t.family))].sort();return o`
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
        ${this.admin?o`<button class="btn primary small" @click=${()=>this.editing={plant:structuredClone(an),mode:"custom"}}>
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("lib.add_custom")}</button>`:u}
      </div>
      <div class="legend-row" aria-hidden="true">
        <span style="--c:var(--hl-leaf-300)">${this.t("lib.indoor_sow")}</span><span style="--c:var(--hl-leaf-500)">${this.t("lib.direct_sow")}</span>
        <span style="--c:var(--hl-leaf-700)">${this.t("lib.transplant")}</span><span style="--c:var(--hl-sun-500)">${this.t("lib.harvest")}</span>
      </div>
      <div class="grid" style="margin-top:12px">
        ${this.filtered().map(t=>o`
          <button class="pcard" @click=${()=>this.selected=t} aria-label=${y(t,this.lang)}>
            <div class="stripe" style=${`background:${R(this.families,t.family)}`}></div>
            <hl-plant-image .plant=${t} color=${R(this.families,t.family)} lang=${this.lang} size="card"></hl-plant-image>
            <div class="inner">
              <div class="row"><h3>${y(t,this.lang)}</h3><span class="spacer"></span>
                ${t.source!=="builtin"?o`<span class="chip warn">${this.t(`lib.source.${t.source}`)}</span>`:u}</div>
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
      ${this.selected?this.renderDetail(this.selected):u}
      ${this.editing?this.renderEditor():u}
    `}renderDetail(e){let t=this.lang,s=n=>{let a=new Map;for(let l of e.companions)l.relation===n&&a.set(l.plant,l.reason[t]??l.reason.en??"");for(let l of this.plants)for(let d of l.companions)d.plant===e.id&&d.relation===n&&!a.has(l.id)&&a.set(l.id,d.reason[t]??d.reason.en??"");return[...a.entries()]},i=n=>y(this.plants.find(a=>a.id===n),this.lang);return o`
      <aside class="drawer" role="dialog" aria-modal="false" aria-label=${y(e,this.lang)} @keydown=${n=>n.key==="Escape"&&(this.selected=null)}>
        <header style=${`border-top: 6px solid ${R(this.families,e.family)}`}>
          <div class="stack" style="gap:2px"><h2>${y(e,this.lang)}</h2>
            <span class="small muted"><i>${e.scientific_name}</i> · ${this.families[e.family]?.[t]??e.family}</span></div>
          <span class="spacer"></span>
          <button class="icon-btn" aria-label=${this.t("common.close")} @click=${()=>this.selected=null}><ha-icon icon="mdi:close"></ha-icon></button>
        </header>
        <div class="content">
          <hl-plant-image .plant=${e} color=${R(this.families,e.family)} lang=${this.lang} size="hero" credit></hl-plant-image>
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
            ${e.category?o`<span>${this.t("lib.category")}</span><span>${this.t(`category.${e.category}`)}${e.perennial?` \xB7 ${this.t("lib.perennial")}`:""}</span>`:u}
            ${e.height_cm?o`<span>${this.t("lib.height")}</span><span>${e.height_cm} cm · ${this.t("lib.roots")} ${e.root_depth_cm??"?"} cm</span>`:u}
            ${e.kc?o`<span>Kc <hl-info term="kc" .t=${this.t}></hl-info></span><span>${e.kc.map(n=>n.toFixed(2)).join(" \u2192 ")}</span>`:u}
            ${e.npk?o`<span>N · P · K <hl-info term="npk" .t=${this.t}></hl-info></span><span>${e.npk.join(" \xB7 ")} / 3</span>`:u}
            ${e.gdd_to_maturity?o`<span>${this.t("lib.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span>${e.gdd_to_maturity} °C·d (${this.t("lib.base")} ${e.gdd_base_c} °C)</span>`:u}
            ${e.plants_per_person?o`<span>${this.t("lib.per_person")}</span><span>${e.plants_per_person} · ${e.yield_kg_m2??"?"} kg/m²</span>`:u}
          </div>
          ${e.deters?.length||e.trap_for?.length||e.allelopathic||e.shade_tolerant?o`<div class="row wrap">
            ${(e.deters??[]).map(n=>o`<span class="chip ok" title=${this.t("lib.deters")}>🛡 ${Je(n,this.lang)}</span>`)}
            ${(e.trap_for??[]).map(n=>o`<span class="chip warn" title=${this.t("lib.trap_for")}>🪤 ${Je(n,this.lang)} <hl-info term="trap_crop" .t=${this.t}></hl-info></span>`)}
            ${e.allelopathic?o`<span class="chip bad">${this.t("lib.allelopathic")} <hl-info term="allelopathy" .t=${this.t}></hl-info></span>`:u}
            ${e.shade_tolerant?o`<span class="chip cold">${this.t("lib.shade_tolerant")}</span>`:u}
          </div>`:u}
          ${e.greenhouse.notes[t]?o`<p class="small">${e.greenhouse.notes[t]}</p>`:u}
          <section class="stack"><h3>${this.t("lib.friends")}</h3>
            ${s("friend").map(([n,a])=>o`<div class="rel"><span class="chip ok">${i(n)}</span><span class="muted">${a}</span></div>`)}</section>
          <section class="stack"><h3>${this.t("lib.enemies")}</h3>
            ${s("enemy").length?s("enemy").map(([n,a])=>o`<div class="rel"><span class="chip bad">${i(n)}</span><span class="muted">${a}</span></div>`):o`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.pests")} & ${this.t("lib.diseases")}</h3>
            <div class="row wrap">${e.pests.map(n=>o`<span class="chip warn">${Je(n,this.lang)}</span>`)}${e.diseases.map(n=>o`<span class="chip bad">${Je(n,this.lang)}</span>`)}</div></section>
          ${e.care.length||e.pruning_notes[t]?o`<section class="stack"><h3>${this.t("lib.care")}</h3>
            ${e.care.map(n=>o`<p class="small"><b>${this.t(`type.${n.task}`)}</b>${n.interval_days?` \xB7 \u21BB ${n.interval_days} d`:""} – ${n.notes[t]??n.notes.en??""}</p>`)}
            ${e.pruning_notes[t]?o`<p class="small">${e.pruning_notes[t]}</p>`:u}</section>`:u}
          ${this.admin?o`<div class="row">
            <button class="btn" @click=${()=>this.editing={plant:structuredClone(e),mode:e.source==="custom"?"custom":"override"}}>
              <ha-icon icon="mdi:pencil"></ha-icon>${this.t("lib.customize")}</button>
            ${e.source!=="builtin"?o`<button class="btn danger" @click=${()=>this.removePlant(e)}>${e.source==="override"?this.t("lib.reset"):this.t("common.delete")}</button>`:u}
          </div>`:u}
        </div>
      </aside>`}async removePlant(e){try{await this.api.deletePlant(e.id),this.selected=null,this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0}))}catch(t){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:t.message},bubbles:!0,composed:!0}))}}async save(e){e.preventDefault();let{plant:t,mode:s}=this.editing,i=e.target,n=v=>i.elements.namedItem(v).value,a=v=>Number(n(v)),l=v=>i.elements.namedItem(`${v}_on`).checked?[{start_week:a(`${v}_start`),end_week:a(`${v}_end`),anchor:"last_frost"}]:[],d=n("name_en").trim(),h={...t,id:s==="custom"&&!t.id?d.toLowerCase().normalize("NFKD").replace(/[^\w]+/g,"_").replace(/^_|_$/g,"")||"plant":t.id,names:{...t.names,en:d,nl:n("name_nl").trim()||d},scientific_name:n("scientific"),variety:n("variety")||null,family:n("family"),habit:n("habit"),spacing_cm:a("spacing"),row_spacing_cm:a("row_spacing"),sowing_depth_cm:a("depth"),germination_days:[a("germ_min"),a("germ_max")],min_soil_temp_c:a("soil_temp"),days_to_maturity:[a("dtm_min"),a("dtm_max")],maturity_from:n("maturity_from"),frost_tolerance:n("frost"),min_temp_c:a("min_temp"),max_temp_c:a("max_temp"),water_needs:n("water"),nutrient_needs:n("nutrients"),rotation_years:a("rotation"),greenhouse:{...t.greenhouse,suitability:n("gh")},sowing:{indoor_sow:l("indoor"),direct_sow:l("direct"),transplant:l("transplant")},pests:n("pests").split(",").map(v=>v.trim().replace(/\s+/g,"_")).filter(Boolean),diseases:n("diseases").split(",").map(v=>v.trim().replace(/\s+/g,"_")).filter(Boolean)},m=h;if(s==="override"){m={id:h.id};for(let v of Object.keys(h))v!=="source"&&JSON.stringify(h[v])!==JSON.stringify(t[v])&&(m[v]=h[v])}try{let v=await this.api.savePlant(m,s);this.editing=null,this.selected=v.plant,this.error="",this.dispatchEvent(new CustomEvent("plants-changed",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:this.t("lib.saved",{plant:y(v.plant,this.lang)})},bubbles:!0,composed:!0}))}catch(v){this.error=v.message??String(v)}}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal()}renderEditor(){let{plant:e,mode:t}=this.editing,s=(n,a,l,d)=>o`
      <select name=${n}>${l.map(h=>o`<option value=${h} ?selected=${h===a}>${d?this.t(`${d}.${h}`):this.families[h]?.[this.lang]??h}</option>`)}</select>`,i=(n,a,l)=>o`
      <label class="row small"><input type="checkbox" name=${`${n}_on`} ?checked=${!!l} />${a}</label>
      <label class="field">${this.t("lib.from")} (${this.t("lib.weeks")})<input name=${`${n}_start`} type="number" min="-30" max="30" .value=${String(l?.start_week??-4)} /></label>
      <label class="field">${this.t("lib.to")} (${this.t("lib.weeks")})<input name=${`${n}_end`} type="number" min="-30" max="40" .value=${String(l?.end_week??2)} /></label>`;return o`<dialog @close=${()=>this.editing=null} style="border:none;border-radius:16px;padding:0;width:min(640px,calc(100vw - 32px));background:var(--hl-surface);color:var(--hl-text)">
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
            ${i("indoor",this.t("lib.indoor_sow"),e.sowing.indoor_sow[0])}
            ${i("direct",this.t("lib.direct_sow"),e.sowing.direct_sow[0])}
            ${i("transplant",this.t("lib.transplant"),e.sowing.transplant[0])}
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
    </dialog>`}};F.styles=[A,T`
      .top { display: flex; flex-wrap: wrap; gap: var(--hl-s2); align-items: center; margin-bottom: var(--hl-s3); }
      .top input[type="search"] { max-width: 360px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--hl-s3); }
      .pcard { text-align: left; border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); background: var(--hl-surface); padding: 0; cursor: pointer;
        overflow: hidden; display: flex; flex-direction: column; color: var(--hl-text); transition: box-shadow var(--hl-dur) var(--hl-ease), transform var(--hl-dur) var(--hl-ease); }
      .pcard:hover { box-shadow: var(--hl-shadow-2); transform: translateY(-1px); }
      .pcard .stripe { height: 6px; }
      .pcard hl-plant-image { border-radius: 0; }
      .drawer hl-plant-image { margin-bottom: var(--hl-s3); }
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
    `],p([g({attribute:!1})],F.prototype,"snapshot",2),p([g({attribute:!1})],F.prototype,"plants",2),p([g({attribute:!1})],F.prototype,"families",2),p([g({attribute:!1})],F.prototype,"api",2),p([g({attribute:!1})],F.prototype,"t",2),p([g()],F.prototype,"lang",2),p([g({type:Boolean})],F.prototype,"admin",2),p([f()],F.prototype,"query",2),p([f()],F.prototype,"family",2),p([f()],F.prototype,"category",2),p([f()],F.prototype,"filter",2),p([f()],F.prototype,"selected",2),p([f()],F.prototype,"editing",2),p([f()],F.prototype,"error",2),F=p([j("hl-library-view")],F);var W=class extends E{constructor(){super(...arguments);this.lang="en";this.plants=new Map;this.families={};this.mode="month";this.cursor="";this.showDone=!1;this.bedFilter="";this.year=null}async loadYear(){try{this.year=(await this.api?.records())?.year??null}catch{this.year=null}}renderYear(){let e=this.year;if(!e)return o`<p class="empty">${this.t("common.loading")}</p>`;let t=Array.from({length:12},(l,d)=>new Date(2026,d,1).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{month:"short"})),s=new Date().getMonth(),i=["harvest","plant","sow","sow_indoor","grow"],n=this.snapshot.beds.find(l=>l.id===this.bedFilter)?.name??"",a=e.rows.filter(l=>!this.bedFilter||l.beds.includes(n)).sort((l,d)=>y(this.plants.get(l.plant_id),this.lang).localeCompare(y(this.plants.get(d.plant_id),this.lang),this.lang));return o`<div class="card year-wrap"><table class="year">
      <thead><tr><th></th>${t.map((l,d)=>o`<th class=${d===s?"now":""}>${l}</th>`)}</tr></thead>
      <tbody>
        ${a.map(l=>{let d=this.plants.get(l.plant_id);return o`<tr><th scope="row"><span class="crop">${d?oe(ee(d),d.color||R(this.families,d.family),20):u}
            ${y(d,this.lang)}</span><span class="xs muted">${l.beds.join(", ")}</span></th>
            ${t.map((h,m)=>{let v=l.months[String(m+1)]??[],b=i.find(w=>v.includes(w));return o`<td class=${`${b??""} ${m===s?"now":""}`} title=${v.map(w=>this.t(`cal.act.${w}`)).join(", ")}>
                ${b&&b!=="grow"?this.t(`cal.act_short.${b}`):""}</td>`})}</tr>`})}
        <tr class="tasks-row"><th scope="row">${this.t("cal.tasks_per_month")}</th>${e.tasks.map((l,d)=>o`<td class=${d===s?"now":""}>${l||""}
          ${e.minutes[d]?o`<span class="xs muted"> · ${this.t("cal.hours",{n:Math.max(1,Math.round(e.minutes[d]/60))})}</span>`:u}</td>`)}</tr>
      </tbody></table>
      <div class="legend year-legend">${i.map(l=>o`<span><i class=${`sw ${l}`}></i> ${this.t(`cal.act.${l}`)}</span>`)}</div>
    </div>`}willUpdate(){this.cursor||(this.cursor=this.today)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get today(){return this.snapshot.analysis?.today??Ce(new Date)}get tasks(){return this.snapshot.tasks.filter(e=>(this.showDone||e.status==="open")&&e.status!=="skipped"&&(!this.bedFilter||e.bed_id===this.bedFilter))}byDay(){let e=new Map;for(let t of Qe(this.tasks)){let s=t.status==="open"&&t.due<this.today?this.today:t.due;e.set(s,[...e.get(s)??[],t])}return e}move(e){let t=ie(this.cursor);this.mode==="timeline"?t.setFullYear(t.getFullYear()+e):this.mode==="month"?t.setMonth(t.getMonth()+e,1):t.setDate(t.getDate()+e*(this.mode==="week"?7:30)),this.cursor=Ce(t)}weekStart(e){let s=(ie(e).getDay()+6)%7;return B(e,-s)}renderEvent(e){let t=e.status==="open"&&e.due<this.today;return o`<button class="ev ${e.status!=="open"?"done":""} ${t?"overdue":""}" style=${`border-left-color:${Re[e.type]??"var(--hl-soil-500)"}`}
      title=${e.title} @click=${()=>this.emit("open-task",e)}>
      <ha-icon icon=${je[e.type]}></ha-icon><span>${e.title}</span></button>`}renderMonth(){let e=ie(this.cursor);e.setDate(1);let t=this.weekStart(Ce(e)),s=e.getMonth(),i=Array.from({length:42},(l,d)=>B(t,d)),n=this.byDay(),a=Array.from({length:7},(l,d)=>k(B(t,d),this.lang,{weekday:"short"}));return o`<div class="month" role="grid">
      ${a.map(l=>o`<div class="dow" role="columnheader">${l}</div>`)}
      ${i.map(l=>{let d=n.get(l)??[];return o`<div class="cell ${ie(l).getMonth()!==s?"other":""} ${l===this.today?"today":""}" role="gridcell" aria-label=${k(l,this.lang,{day:"numeric",month:"long"})}>
          <span class="num">${ie(l).getDate()}</span>
          ${d.slice(0,4).map(h=>this.renderEvent(h))}
          ${d.length>4?o`<button class="more" @click=${()=>{this.cursor=l,this.mode="week"}}>+${d.length-4}</button>`:u}
        </div>`})}
    </div>`}renderWeek(){let e=this.weekStart(this.cursor),t=this.byDay();return o`<div class="week">
      ${Array.from({length:7},(s,i)=>B(e,i)).map(s=>o`
        <div class="col ${s===this.today?"today":""}">
          <b class="small">${k(s,this.lang,{weekday:"long",day:"numeric",month:"short"})}</b>
          ${(t.get(s)??[]).map(i=>this.renderEvent(i))}
        </div>`)}
    </div>`}renderList(){let e={t:this.t,lang:this.lang,today:this.today,onOpen:i=>this.emit("open-task",i),onComplete:i=>this.emit("complete-task",i),onPostpone:(i,n)=>this.emit("postpone-task",{task:i,days:n})},t=this.byDay(),s=[...t.keys()].filter(i=>i>=this.cursor).sort().slice(0,30);return s.length?o`${s.map(i=>o`<div class="group">
      <h3>${i===this.today?this.t("common.today"):k(i,this.lang,{weekday:"long",day:"numeric",month:"long"})}</h3>
      <ul class="tasks">${t.get(i).map(n=>et(n,e))}</ul></div>`)}`:o`<p class="empty">–</p>`}renderTimeline(){let e=this.snapshot.analysis;if(!e)return o`<p class="empty">–</p>`;let t=Number(this.cursor.slice(0,4))||e.season,s=this.snapshot.settings.region.hemisphere==="south",i=s?`${t}-07-01`:`${t}-01-01`,n=s?`${t+1}-06-30`:`${t}-12-31`,a=we(i,n)+1,l=$=>$?Math.max(0,Math.min(100,we(i,$)/a*100)):null,d=($,x,P,C,ae)=>{let V=l($),K=l(x);return V===null||K===null||K<=0||V>=100?u:o`<div class="g-bar ${P}" title=${ae} style=${`left:${V}%;width:${Math.max(K-V,.6)}%;${C}`}></div>`},h=Array.from({length:12},($,x)=>{let P=ie(i);return P.setMonth(P.getMonth()+x,1),Ce(P)}),m=this.snapshot.plantings.filter($=>$.season===t&&e.timelines[$.id]&&(!this.bedFilter||$.bed_id===this.bedFilter)),v=this.snapshot.beds.filter($=>m.some(x=>x.bed_id===$.id)),b=this.snapshot.tasks.filter($=>$.key?.startsWith("m:")&&$.due>=i&&$.due<=n&&(this.showDone||$.status==="open")),w=o`
      ${!e.anchors.frost_free&&l(e.anchors.last_frost)!==null?o`<div class="g-line" style=${`left:${l(e.anchors.last_frost)}%`} title=${this.t("cal.last_frost")}></div>`:u}
      ${!e.anchors.frost_free&&l(e.anchors.first_frost)!==null?o`<div class="g-line" style=${`left:${l(e.anchors.first_frost)}%`} title=${this.t("cal.first_frost")}></div>`:u}
      ${this.today>=i&&this.today<=n?o`<div class="g-line today" style=${`left:${l(this.today)}%`} title=${this.t("common.today")}></div>`:u}`;return o`<div class="gantt"><div class="gantt-inner" role="table" aria-label=${this.t("cal.timeline")}>
      <div class="g-row head" role="row"><div class="g-label">${this.t("common.season",{year:t})}</div>
        <div class="g-track">${h.map($=>o`<span class="g-month" style=${`left:${l($)}%`}>${k($,this.lang,{month:"short"})}</span>`)}</div></div>
      ${b.length?o`<div class="g-row" role="row"><div class="g-label"><ha-icon icon="mdi:calendar-sync-outline"></ha-icon>${this.t("cal.garden_work")}</div>
        <div class="g-track">${w}${b.map($=>o`<button class="g-task" style=${`left:${l($.due)}%;color:${Re[$.type]??"var(--hl-soil-500)"}`}
          title=${`${k($.due,this.lang)} \xB7 ${$.title}`} @click=${()=>this.emit("open-task",$)}><ha-icon icon=${je[$.type]}></ha-icon></button>`)}</div></div>`:u}
      ${v.map($=>o`
        <div class="g-row bed" role="row"><div class="g-label">${$.name}</div><div class="g-track">${w}</div></div>
        ${m.filter(x=>x.bed_id===$.id).sort((x,P)=>e.timelines[x.id].in_ground<e.timelines[P.id].in_ground?-1:1).map(x=>{let P=e.timelines[x.id],C=this.plants.get(x.plant_id),ae=R(this.families,C?.family),V=y(C,this.lang),K=e.phenology?.[x.id];return o`<div class="g-row" role="row">
            <div class="g-label"><span class="family-dot" style=${`background:${ae};width:10px;height:10px`}></span>${V}
              ${K&&K.stage!=="not_planted"&&K.stage!=="finished"?o`<span class="xs muted">· ${this.t(`stage.${K.stage}`)}</span>`:u}</div>
            <div class="g-track">${w}
              ${P.sow_date&&P.sow_date<P.in_ground?d(P.sow_date,P.in_ground,"sow",`background:${ae}`,`${this.t("lib.indoor_sow")}: ${k(P.sow_date,this.lang)}`):u}
              ${d(P.in_ground,P.harvest_start,"",`background:color-mix(in srgb, ${ae} 35%, transparent);border:1px solid ${ae}`,`${k(P.in_ground,this.lang)} \u2013 ${k(P.harvest_start,this.lang)}`)}
              ${d(P.harvest_start,P.harvest_end,"",`background:${ae}`,`${this.t("lib.harvest")}: ${k(P.harvest_start,this.lang)} \u2013 ${k(P.harvest_end,this.lang)}`)}
              ${K?.harvest_estimate&&l(K.harvest_estimate)!==null?o`<span class="g-mark" style=${`left:${l(K.harvest_estimate)}%`}
                title=${this.t("cal.harvest_estimate",{date:k(K.harvest_estimate,this.lang)})}></span>`:u}
            </div></div>`})}`)}
      ${v.length?u:o`<p class="empty">${this.t("cal.no_plantings")}</p>`}
      <div class="g-legend">
        <span><i style="background:var(--hl-leaf-300);height:4px"></i>${this.t("lib.indoor_sow")}</span>
        <span><i style="background:color-mix(in srgb, var(--hl-leaf-500) 35%, transparent);border:1px solid var(--hl-leaf-500)"></i>${this.t("cal.growing")}</span>
        <span><i style="background:var(--hl-leaf-600)"></i>${this.t("lib.harvest")}</span>
        <span><i style="width:10px;height:10px;transform:rotate(45deg);background:var(--hl-text)"></i>${this.t("cal.harvest_estimate_short")}</span>
        <span><i style="border-left:2px dashed var(--hl-frost-500);width:2px;height:12px;border-radius:0"></i>${this.t("cal.frost_dates")}</span>
      </div>
    </div></div>`}render(){let e=this.mode==="timeline"||this.mode==="year"?this.t("common.season",{year:this.mode==="year"?this.year?.season??Number(this.cursor.slice(0,4)):Number(this.cursor.slice(0,4))}):this.mode==="month"?k(this.cursor,this.lang,{month:"long",year:"numeric"}):`${k(this.weekStart(this.cursor),this.lang)} \u2013 ${k(B(this.weekStart(this.cursor),6),this.lang)}`;return o`
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
    `}};W.styles=[A,$t,T`
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
    `],p([g({attribute:!1})],W.prototype,"snapshot",2),p([g({attribute:!1})],W.prototype,"t",2),p([g()],W.prototype,"lang",2),p([g({attribute:!1})],W.prototype,"plants",2),p([g({attribute:!1})],W.prototype,"families",2),p([f()],W.prototype,"mode",2),p([f()],W.prototype,"cursor",2),p([f()],W.prototype,"showDone",2),p([f()],W.prototype,"bedFilter",2),p([g({attribute:!1})],W.prototype,"api",2),p([f()],W.prototype,"year",2),W=p([j("hl-calendar-view")],W);var rn=["nl_be","uk_south","uk_north","de_central","fr_north","scandinavia_south","mediterranean","au_melbourne","nz_christchurch","za_highveld"],on={nl_be:"Nederland / Vlaanderen",uk_south:"UK (south)",uk_north:"UK (north)",de_central:"Deutschland (Mitte)",fr_north:"France (nord)",scandinavia_south:"Scandinavia (south)",mediterranean:"Mediterranean",au_melbourne:"Australia \u2013 Melbourne",nz_christchurch:"New Zealand \u2013 Christchurch",za_highveld:"South Africa \u2013 Highveld"},ln=Array.from({length:13},(c,r)=>[`${r+1}a`,`${r+1}b`]).flat(),dn={soil_moisture:{domains:["sensor"],deviceClass:"moisture"},soil_temperature:{domains:["sensor"],deviceClass:"temperature"},air_temperature:{domains:["sensor"],deviceClass:"temperature"},air_humidity:{domains:["sensor"],deviceClass:"humidity"},light:{domains:["sensor"],deviceClass:"illuminance"},rain:{domains:["sensor","binary_sensor"]},par:{domains:["sensor"]},ec:{domains:["sensor"],deviceClass:"conductivity"},npk_n:{domains:["sensor"]},npk_p:{domains:["sensor"]},npk_k:{domains:["sensor"]},leaf_wetness:{domains:["sensor","binary_sensor"]}},cn=["fresh","storage","herbs","pollinators","winter","perennials","easy"],se=class extends E{constructor(){super(...arguments);this.lang="en";this.admin=!0;this.busy=!1}entityOptions(e){let t=Object.values(this.hass?.states??{}),s=e==="weather"?{domains:["weather"]}:e==="irrigation"?{domains:["switch","valve"]}:e==="tts"?{domains:["tts"]}:e==="media_player"?{domains:["media_player"]}:e==="vent"?{domains:["cover","switch","fan"]}:e==="shade"?{domains:["cover","switch"]}:e==="pump"?{domains:["switch"]}:e==="meter"||e==="butt"?{domains:["sensor","input_number"]}:dn[e];return t.filter(i=>s.domains.includes(i.entity_id.split(".")[0])).filter(i=>!("deviceClass"in s)||!s.deviceClass||i.attributes.device_class===s.deviceClass).map(i=>i.entity_id).sort()}entityInput(e,t,s,i,n){let a=`list-${t}`,l=s?this.hass?.states[s]:void 0;return o`<label class="field">${n}
      <input list=${a} .value=${s??""} placeholder=${`${{weather:"weather",irrigation:"switch",tts:"tts",media_player:"media_player",vent:"cover"}[t]??"sensor"}.\u2026`} ?disabled=${!this.admin} id=${e}
        aria-invalid=${s&&!l?"true":"false"}
        @change=${d=>i(d.target.value.trim()||null)} />
      ${s?o`<span class="state">${l?`${l.state} ${l.attributes.unit_of_measurement??""}`:"\u26A0 not found"}</span>`:u}
    </label>`}datalists(){return o`${["soil_moisture","soil_temperature","air_temperature","air_humidity","light","rain","par","ec","npk_n","npk_p","npk_k","leaf_wetness","weather","irrigation","tts","media_player","vent","shade","pump","meter","butt"].map(t=>o`<datalist id=${`list-${t}`}>${this.entityOptions(t).map(s=>o`<option value=${s}></option>`)}</datalist>`)}`}async saveSettings(e){this.busy=!0;try{await this.api.saveSettings(e),this.toast(this.t("settings.saved"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}finally{this.busy=!1}}async savePlan(e){let t=structuredClone({zones:this.snapshot.zones,beds:this.snapshot.beds,plantings:this.snapshot.plantings,features:this.snapshot.features??[]});e(t);try{await this.api.savePlan(t,this.snapshot.revision),this.toast(this.t("settings.saved"))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}renderRegion(){let e=this.snapshot.settings.region,t=this.snapshot.analysis?.anchors,s=i=>this.saveSettings({region:i});return o`<section class="card stack" aria-labelledby="s-region">
      <h2 id="s-region">${this.t("settings.region")}</h2>
      <div class="form-grid">
        <label class="field">${this.t("settings.hemisphere")}
          <select ?disabled=${!this.admin} @change=${i=>s({hemisphere:i.target.value})}>
            ${["north","south"].map(i=>o`<option value=${i} ?selected=${e.hemisphere===i}>${this.t(`settings.hemisphere.${i}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("settings.mode")}
          <select ?disabled=${!this.admin} @change=${i=>s({mode:i.target.value})}>
            ${["preset","usda","custom"].map(i=>o`<option value=${i} ?selected=${e.mode===i}>${this.t(`settings.mode.${i}`)}</option>`)}
          </select></label>
        ${e.mode==="preset"?o`<label class="field full">${this.t("settings.preset")}
          <select ?disabled=${!this.admin} @change=${i=>s({preset:i.target.value})}>
            ${rn.map(i=>o`<option value=${i} ?selected=${e.preset===i}>${on[i]}</option>`)}</select></label>`:u}
        ${e.mode==="usda"?o`<label class="field full">${this.t("settings.zone")}
          <select ?disabled=${!this.admin} @change=${i=>s({hardiness_zone:i.target.value})}>
            ${ln.map(i=>o`<option value=${i} ?selected=${e.hardiness_zone===i}>${i}</option>`)}</select></label>`:u}
        ${e.mode==="custom"?o`
          <label class="field">${this.t("settings.last_frost")}<input pattern="\\d{2}-\\d{2}" .value=${e.last_frost} ?disabled=${!this.admin}
            @change=${i=>i.target.checkValidity()&&s({last_frost:i.target.value})} /></label>
          <label class="field">${this.t("settings.first_frost")}<input pattern="\\d{2}-\\d{2}" .value=${e.first_frost} ?disabled=${!this.admin}
            @change=${i=>i.target.checkValidity()&&s({first_frost:i.target.value})} /></label>`:u}
      </div>
      ${t?o`<p class="small muted">${this.t("settings.frost_dates_now",{last:k(t.last_frost,this.lang,{day:"numeric",month:"long"}),first:k(t.first_frost,this.lang,{day:"numeric",month:"long",year:"numeric"})})}</p>`:u}
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
    </section>`}renderZones(){let e=(t,s)=>this.savePlan(i=>s(i.zones.find(n=>n.id===t)));return o`<section class="card stack" aria-labelledby="s-zones">
      <h2 id="s-zones">${this.t("settings.zones")}</h2>
      ${this.snapshot.zones.map(t=>o`<div class="item">
        <h4><ha-icon icon=${t.type==="outdoor"?"mdi:tree-outline":"mdi:greenhouse"}></ha-icon>${t.name}<span class="chip">${this.t(`settings.zone_type.${t.type}`)}</span></h4>
        <div class="form-grid">
          ${["air_temperature","air_humidity","light"].map(s=>this.entityInput(`${t.id}-${s}`,s,t.sensors[s],i=>e(t.id,n=>n.sensors[s]=i),this.t(`settings.sensor.${s}`)))}
          ${this.entityInput(`${t.id}-lw`,"leaf_wetness",t.sensors.leaf_wetness,s=>e(t.id,i=>i.sensors.leaf_wetness=s),this.t("settings.sensor.leaf_wetness"))}
          ${this.entityInput(`${t.id}-par`,"par",t.sensors.par,s=>e(t.id,i=>i.sensors.par=s),this.t("settings.sensor.par"))}
          ${t.type!=="outdoor"?o`
            ${this.entityInput(`${t.id}-vent`,"vent",t.vent_entity,s=>e(t.id,i=>i.vent_entity=s),this.t("settings.vent"))}
            ${this.entityInput(`${t.id}-shade`,"shade",t.shade_entity,s=>e(t.id,i=>i.shade_entity=s),this.t("settings.shade_entity"))}
            <label class="field">${this.t("settings.climate_control")}
              <select ?disabled=${!this.admin} @change=${s=>e(t.id,i=>i.climate_control=s.target.value)}>
                ${["off","advise","auto"].map(s=>o`<option value=${s} ?selected=${(t.climate_control??"advise")===s}>${this.t(`settings.climate_control.${s}`)}</option>`)}
              </select></label>
            <label class="field check"><input type="checkbox" .checked=${!!t.microclimate.thermal_mass} ?disabled=${!this.admin}
              @change=${s=>e(t.id,i=>i.microclimate.thermal_mass=s.target.checked)} />${this.t("settings.thermal_mass")}</label>`:u}
          <label class="field check"><input type="checkbox" .checked=${!!t.microclimate.wall_heat} ?disabled=${!this.admin}
            @change=${s=>e(t.id,i=>i.microclimate.wall_heat=s.target.checked)} />${this.t("settings.wall_heat")}</label>
          <label class="field check"><input type="checkbox" .checked=${t.microclimate.heated} ?disabled=${!this.admin}
            @change=${s=>e(t.id,i=>i.microclimate.heated=s.target.checked)} />${this.t("settings.heated")}</label>
          ${t.microclimate.heated?o`<label class="field">${this.t("settings.min_heating")}<input type="number" step="0.5" .value=${String(t.microclimate.min_heating_temp_c??5)}
            @change=${s=>e(t.id,i=>i.microclimate.min_heating_temp_c=Number(s.target.value))} /></label>`:u}
        </div>
      </div>`)}
    </section>`}renderBeds(){let e=(t,s)=>this.savePlan(i=>s(i.beds.find(n=>n.id===t)));return o`<section class="card stack" aria-labelledby="s-beds">
      <h2 id="s-beds">${this.t("settings.beds")}</h2>
      ${this.snapshot.beds.map(t=>o`<div class="item">
        <h4><ha-icon icon="mdi:sprout-outline"></ha-icon>${t.name}<span class="chip">${Math.round(t.width_cm)} × ${Math.round(t.length_cm)} cm</span></h4>
        <div class="form-grid">
          ${["soil_moisture","soil_temperature","ec","npk_n","npk_p","npk_k"].map(s=>this.entityInput(`${t.id}-${s}`,s,t.sensors[s],i=>e(t.id,n=>n.sensors[s]=i),this.t(`settings.sensor.${s}`)))}
          ${this.entityInput(`${t.id}-irr`,"irrigation",t.irrigation_entity,s=>e(t.id,i=>i.irrigation_entity=s),this.t("settings.irrigation"))}
          <label class="field">${this.t("settings.flow")}<input type="number" min="0" step="0.1" .value=${String(t.irrigation_flow_lpm??"")} ?disabled=${!this.admin}
            @change=${s=>e(t.id,i=>i.irrigation_flow_lpm=Number(s.target.value)||null)} /></label>
        </div>
      </div>`)}
    </section>`}renderIrrigation(){let e=this.snapshot.settings.irrigation??{mode:"advise",pump_entity:null,start_time:"06:00",max_runtime_min:30,frost_lockout_c:2,rain_skip_mm:3,pump_lead_s:3},t=n=>this.saveSettings({irrigation:n}),s=(n,a,l=1,d=0,h=999)=>o`<label class="field">${a}
      <input type="number" step=${l} min=${d} max=${h} .value=${String(e[n])}
        @change=${m=>t({[n]:Number(m.target.value)})} /></label>`,i=this.snapshot.beds.filter(n=>n.irrigation_entity).length;return o`<section class="card stack" aria-labelledby="s-irrigation">
      <h2 id="s-irrigation">${this.t("settings.irrigation_hw")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></h2>
      <div class="form-grid">
        <label class="field full">${this.t("settings.irrigation_mode")}
          <select @change=${n=>t({mode:n.target.value})}>
            ${["off","advise","auto"].map(n=>o`<option value=${n} ?selected=${e.mode===n}>${this.t(`settings.irrigation_mode.${n}`)}</option>`)}
          </select></label>
        ${this.entityInput("pump","pump",e.pump_entity,n=>t({pump_entity:n}),this.t("settings.pump"))}
        <label class="field">${this.t("settings.start_time")}<input type="time" .value=${e.start_time}
          @change=${n=>t({start_time:n.target.value})} /></label>
        ${s("max_runtime_min",this.t("settings.max_runtime"),1,1,180)}
        ${s("frost_lockout_c",this.t("settings.frost_lockout"),.5,-5,10)}
        ${s("rain_skip_mm",this.t("settings.rain_skip"),.5,0,30)}
        ${s("pump_lead_s",this.t("settings.pump_lead"),.5,0,30)}
      </div>
      <p class="xs muted">${this.t("settings.irrigation_hint",{n:i})}</p>
    </section>`}renderResources(){let e=this.snapshot.settings,t=e.resources??{household_size:2,hours_per_week:3,water_liters_per_week:null,compost_kg:null,irrigation:!1,goals:["fresh","herbs"],wanted:[],excluded:[]},s=n=>this.saveSettings({resources:n}),i=n=>s({goals:t.goals.includes(n)?t.goals.filter(a=>a!==n):[...t.goals,n]});return o`<section class="card stack" aria-labelledby="s-resources">
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
        ${cn.map(n=>o`<button class="chip ${t.goals.includes(n)?"active":""}" aria-pressed=${String(t.goals.includes(n))} @click=${()=>i(n)}>${this.t(`autofill.goal.${n}`)}</button>`)}
      </div>
      <label class="field check"><input type="checkbox" .checked=${e.maintenance_tasks??!0}
        @change=${n=>this.saveSettings({maintenance_tasks:n.target.checked})} />${this.t("settings.maintenance_tasks")}</label>
    </section>`}renderNotifications(){let e=this.snapshot.settings.notifications,t=n=>this.saveSettings({notifications:n}),s=n=>n.split(",").map(a=>a.trim()).filter(Boolean),i=Object.keys(this.hass?.services?.notify??{}).map(n=>`notify.${n}`);return o`<section class="card stack" aria-labelledby="s-notify">
      <h2 id="s-notify">${this.t("settings.notifications")}</h2>
      <label class="field check"><input type="checkbox" .checked=${e.persistent} @change=${n=>t({persistent:n.target.checked})} />${this.t("settings.persistent")}</label>
      <label class="field">${this.t("settings.notify_services")}
        <input list="notify-services" .value=${e.notify_services.join(", ")} @change=${n=>t({notify_services:s(n.target.value)})} />
        <datalist id="notify-services">${i.map(n=>o`<option value=${n}></option>`)}</datalist></label>
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
          ${[0,1,2,3,4,5,6].map(n=>o`<option value=${n} ?selected=${(e.weekly_plan_weekday??6)===n}>${new Date(2024,0,1+n).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{weekday:"long"})}</option>`)}
        </select></label>
        <label class="field">${this.t("settings.weekly_time")}<input type="time" .value=${e.weekly_plan_time??"19:00"} @change=${n=>t({weekly_plan_time:n.target.value})} /></label>
      </div>
      <label class="field check"><input type="checkbox" .checked=${this.snapshot.settings.weather_aware_scheduling??!0}
        @change=${n=>this.saveSettings({weather_aware_scheduling:n.target.checked})} />${this.t("settings.weather_aware")}</label>
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
    </section>`}renderHousehold(){let e=this.snapshot.settings,t=e.assignment??{},s=e.person_notify??{},i=Ve(),n=Object.keys(this.hass?.services?.notify??{}).map(d=>`notify.${d}`),a=["water","harvest","sow_indoor","sow_direct","transplant","weed","pest_check","feed","ventilate","prune","clean_greenhouse","tool_care"],l=d=>o`<select @change=${h=>this.saveSettings({assignment:{[d]:h.target.value}})}>
      <option value="" ?selected=${!t[d]}>${this.t(d==="*"?"settings.nobody":"settings.default_person")}</option>
      ${i.map(h=>o`<option value=${h.id} ?selected=${t[d]===h.id}>${h.name}</option>`)}</select>`;return o`<section class="card stack" aria-labelledby="s-household">
      <h2 id="s-household">${this.t("settings.household")}</h2>
      ${i.length===0?o`<p class="small muted">${this.t("settings.no_persons")}</p>`:o`
        <label class="field">${this.t("settings.assign_default")}${l("*")}</label>
        <details><summary class="small">${this.t("settings.assign_per_type")}</summary>
          <div class="form-grid" style="margin-top:8px">${a.map(d=>o`<label class="field">${this.t(`type.${d}`)}${l(d)}</label>`)}</div>
        </details>
        <h3>${this.t("settings.person_notify")}</h3>
        <datalist id="notify-person">${n.map(d=>o`<option value=${d}></option>`)}</datalist>
        <div class="form-grid">${i.map(d=>o`<label class="field">${d.name}
          <input list="notify-person" placeholder="notify.mobile_app_…" .value=${s[d.id]??""}
            @change=${h=>this.saveSettings({person_notify:{[d.id]:h.target.value.trim()}})} /></label>`)}</div>
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
    </section>`}async export(e){let t=await this.api.exportPlan(e,!0);ft(t.filename,t.content,e==="json"?"application/json":"application/yaml")}render(){return o`
      ${this.admin?u:o`<p class="small" style="color:var(--hl-warning);margin-bottom:12px">${this.t("common.admin_only")}</p>`}
      <fieldset ?disabled=${!this.admin||this.busy} style="border:0;padding:0;margin:0">
        <div class="sections">
          ${this.renderRegion()} ${this.renderWeather()} ${this.renderZones()} ${this.renderBeds()} ${this.renderIrrigation()}
          ${this.renderResources()} ${this.renderNotifications()} ${this.renderWater()} ${this.renderHousehold()} ${this.renderGeneral()}
        </div>
      </fieldset>
      <section class="card stack" style="margin-top:var(--hl-s4)" aria-labelledby="s-display">
        <h2 id="s-display">${this.t("settings.display")}</h2>
        <label class="field check"><input type="checkbox" .checked=${it()}
          @change=${e=>ts(e.target.checked)} />${this.t("settings.photos")}</label>
        <p class="xs muted">${this.t("settings.photos_hint")}</p>
      </section>
      ${this.datalists()}
    `}};se.styles=[A,T`
      .sections { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: var(--hl-s4); align-items: start; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .item { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); display: flex; flex-direction: column; gap: var(--hl-s2); background: var(--hl-surface-2); }
      .item h4 { display: flex; align-items: center; gap: var(--hl-s2); }
      .check { flex-direction: row !important; align-items: center; gap: var(--hl-s2) !important; color: var(--hl-text) !important; }
      .state { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
    `],p([g({attribute:!1})],se.prototype,"snapshot",2),p([g({attribute:!1})],se.prototype,"hass",2),p([g({attribute:!1})],se.prototype,"api",2),p([g({attribute:!1})],se.prototype,"t",2),p([g()],se.prototype,"lang",2),p([g({type:Boolean})],se.prototype,"admin",2),p([f()],se.prototype,"busy",2),se=p([j("hl-settings-view")],se);var nt=c=>c.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");function he(c){let r=[],e=/(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g,t=0,s;for(;s=e.exec(c);)s.index>t&&r.push(c.slice(t,s.index)),s[2]!==void 0?r.push(o`<strong>${s[2]}</strong>`):s[3]!==void 0?r.push(o`<em>${s[3]}</em>`):r.push(o`<code>${s[4]}</code>`),t=s.index+s[0].length;return t<c.length&&r.push(c.slice(t)),r}function ri(c){return c.split(`
`).filter(r=>/^#{2,3} /.test(r)).map(r=>{let e=r.startsWith("### ")?3:2,t=r.replace(/^#+ /,"").trim();return{level:e,text:t,id:nt(t)}})}var ai=c=>c.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(r=>r.trim());function oi(c){let r=c.replace(/\r/g,"").split(`
`),e=[],t=0;for(;t<r.length;){let s=r[t];if(!s.trim()){t++;continue}let i=/^(#{1,4}) (.*)$/.exec(s);if(i){let a=i[2].trim(),l=Math.min(Math.max(i[1].length,2),4);e.push(l===2?o`<h2 id=${nt(a)}>${he(a)}</h2>`:l===3?o`<h3 id=${nt(a)}>${he(a)}</h3>`:o`<h4>${he(a)}</h4>`),t++;continue}if(s.trim().startsWith("|")){let a=[];for(;t<r.length&&r[t].trim().startsWith("|");)a.push(r[t++]);let[l,,...d]=a,m=a[1]!==void 0&&/^\s*\|?\s*:?-{2,}/.test(a[1])?d:a.slice(1);e.push(o`<div class="table-wrap"><table>
        <thead><tr>${ai(l).map(v=>o`<th>${he(v)}</th>`)}</tr></thead>
        <tbody>${m.map(v=>o`<tr>${ai(v).map(b=>o`<td>${he(b)}</td>`)}</tr>`)}</tbody>
      </table></div>`);continue}if(/^\s*([-*]|\d+\.) /.test(s)){let a=/^\s*\d+\. /.test(s),l=[];for(;t<r.length&&/^\s*([-*]|\d+\.) /.test(r[t]);)l.push(r[t].replace(/^\s*([-*]|\d+\.) /,"")),t++;let d=l.map(h=>o`<li>${he(h)}</li>`);e.push(a?o`<ol>${d}</ol>`:o`<ul>${d}</ul>`);continue}let n=[];for(;t<r.length&&r[t].trim()&&!/^(#{1,4} |\s*\||\s*([-*]|\d+\.) )/.test(r[t]);)n.push(r[t++].trim());e.push(o`<p>${he(n.join(" "))}</p>`)}return e.length?o`${e}`:o`${u}`}var z="#5a9a3c",Z="#d9412b",ge="#ef8a1e",Pt="#7a4aa0",at="#f2c230",zt='<circle cx="178" cy="16" r="9" fill="#f6cf4a"/><g stroke="#f6cf4a" stroke-width="2" stroke-linecap="round"><path d="M178 2v-2M178 32v2M164 16h-2M192 16h2M168 6l-1.5-1.5M188 6l1.5-1.5"/></g>',hn=`<g stroke="#5b9fd4" stroke-width="2" stroke-linecap="round"><path d="M30 8l-3 7M44 12l-3 7M58 6l-3 7M72 11l-3 7"/></g>
  <path d="M22 8q6-8 14-3 6-6 13 0 8-2 9 5H22z" fill="#cfe1ef"/>`,pn=`<path d="M118 62V34l26-16 26 16v28z" fill="#e6f2fb" fill-opacity=".7" stroke="#7fa9c9" stroke-width="1.6"/>
  <path d="M144 18v44M131 26v36M157 26v36M118 46h52" stroke="#7fa9c9" stroke-width="1"/>`,li=`<g transform="translate(150 34)"><path d="M0 8h22l-2 20H2z" fill="#4c8fbf"/><path d="M22 12l14-8" stroke="#4c8fbf" stroke-width="3" stroke-linecap="round"/>
  <path d="M5 8q6-10 12 0" fill="none" stroke="#2d6a96" stroke-width="2"/><g fill="#7fb6d9"><circle cx="40" cy="8" r="1.4"/><circle cx="43" cy="13" r="1.2"/><circle cx="40" cy="17" r="1"/></g></g>`,un=`<path d="M140 64l10-22h28l10 22z" fill="#7a5a3a"/><path d="M146 52h36M143 58h42" stroke="#5c442a" stroke-width="1.4"/>
  <path d="M154 40q8-10 16 0" fill="none" stroke="#6aa648" stroke-width="2"/>`,mn=`<g transform="translate(150 22)"><ellipse cx="10" cy="10" rx="9" ry="8" fill="${Z}"/><path d="M10 2v16" stroke="#222" stroke-width="1.2"/>
  <circle cx="10" cy="2.5" r="3.2" fill="#222"/><g fill="#222"><circle cx="6" cy="8" r="1.6"/><circle cx="14" cy="8" r="1.6"/><circle cx="6" cy="14" r="1.4"/><circle cx="14" cy="14" r="1.4"/></g></g>`,gn=`<g transform="translate(150 30)"><path d="M2 14q12-20 24 0z" fill="#c8506a"/><rect x="11" y="13" width="6" height="12" rx="2" fill="#efe3cf"/>
  <g fill="#fff"><circle cx="9" cy="9" r="1.6"/><circle cx="17" cy="7" r="1.4"/><circle cx="21" cy="11" r="1.2"/></g></g>`,fn=`<g transform="translate(144 34)"><path d="M2 10h36l-5 20H7z" fill="#b5843a"/><path d="M6 10q14-18 28 0" fill="none" stroke="#8a6238" stroke-width="2.5"/>
  <path d="M6 17h28M8 23h24" stroke="#8a6238" stroke-width="1.2"/><circle cx="14" cy="9" r="4" fill="${Z}"/><circle cx="23" cy="8" r="4.4" fill="${ge}"/><circle cx="30" cy="10" r="3.4" fill="${Pt}"/></g>`,di=`<g transform="translate(146 26)"><rect width="22" height="30" rx="2" fill="#efe3cf" stroke="#b3a283"/><circle cx="11" cy="12" r="6" fill="${at}"/>
  <g fill="#8a6a45"><ellipse cx="32" cy="24" rx="2" ry="1.2"/><ellipse cx="37" cy="28" rx="2" ry="1.2"/><ellipse cx="30" cy="30" rx="2" ry="1.2"/></g></g>`,ci='<g transform="translate(160 14) rotate(20)"><rect x="3" width="3" height="30" fill="#8a6238"/><path d="M-2 30h13l-1 14q-5 4-11 0z" fill="#9aa3a0"/></g>',vn=`<g fill="none" stroke="#6a84c0" stroke-width="2.2" stroke-linecap="round"><path d="M150 26a16 16 0 0 1 28 6"/><path d="M178 44a16 16 0 0 1-28-6"/></g>
  <path d="M176 26l3 7 5-5zM152 44l-3-7-5 5z" fill="#6a84c0"/>`,bn='<path d="M100 22c-4-6-12-2-10 4 1 4 10 10 10 10s9-6 10-10c2-6-6-10-10-4z" fill="#e06aa0"/>',hi='<g stroke="#9cc1de" stroke-width="1.6" stroke-linecap="round"><path d="M178 8v16M170 16h16M172 10l12 12M184 10l-12 12"/></g>',yn=`<g transform="translate(150 20)"><rect width="16" height="24" rx="3" fill="#3a4a42"/><rect x="3" y="4" width="10" height="8" rx="1" fill="#9fe0a0"/>
  <rect x="6" y="24" width="4" height="18" fill="#8a8f8c"/><path d="M22 6a10 10 0 0 1 0 12M26 2a16 16 0 0 1 0 20" fill="none" stroke="#6a84c0" stroke-width="1.6" stroke-linecap="round"/></g>`,$n='<path d="M0 66q50-6 100 0t100 0v14H0z" fill="#c9a86a"/><g stroke="#a8873f" stroke-width="1.2"><path d="M12 70l8-2M40 72l9 1M80 69l7 2M120 71l8-1M160 70l9 1"/></g>',_n=`<g transform="translate(150 26)"><rect x="2" y="6" width="22" height="30" rx="4" fill="#cfe7f6" fill-opacity=".8" stroke="#7fa9c9"/>
  <rect y="0" width="26" height="7" rx="2" fill="#c8506a"/><path d="M6 20h14M6 26h14" stroke="#5a9a3c" stroke-width="2"/></g>`,as={planning:{sky:"#eaf4e1",ground:"#8a6a45",pieces:[["carrot",ge,14,1],["lettuce",z,32,.9],["tomato",Z,50,1],["bean",z,68,1.1]],extra:zt},soil:{sky:"#f3ece0",ground:"#6b4f32",pieces:[["potato","#c9a46a",20,.9],["clover",z,40,.9],["leafy",z,58,.9]],extra:ci},sowing:{sky:"#eef6e8",ground:"#8a6a45",pieces:[["pea",z,16,.8],["lettuce",z,34,.7],["root","#c84a6a",52,.8]],extra:di},watering:{sky:"#e6f1fa",ground:"#7a5d3e",pieces:[["cucumber",z,20,1],["chard",Z,40,1],["lettuce",z,60,.9]],extra:hn+li},fertilizing:{sky:"#f1efe2",ground:"#7a5a3a",pieces:[["cabbage",z,18,1],["pumpkin",ge,40,1],["leek",z,60,1]],extra:un},rotation:{sky:"#eaf0f8",ground:"#8a6a45",pieces:[["potato","#c9a46a",14,.9],["bean",z,32,1],["cabbage",z,50,1],["onion","#b07a3a",68,.9]],extra:vn},companions:{sky:"#f6eef3",ground:"#8a6a45",pieces:[["tomato",Z,30,1.1],["herb",z,60,.9],["flower",ge,76,.8]],extra:bn},greenhouse:{sky:"#e8f3f8",ground:"#7a5d3e",pieces:[["pepper",Z,14,1],["eggplant",Pt,34,1],["tomato",Z,54,.9]],extra:pn},pests:{sky:"#eef5e6",ground:"#7a5d3e",pieces:[["cabbage",z,18,1],["lettuce",z,40,.9],["flower",at,60,.8]],extra:mn},diseases:{sky:"#efeee8",ground:"#6b4f32",pieces:[["tomato",Z,18,1],["potato","#c9a46a",40,.9],["leafy",z,60,.9]],extra:gn},seasons:{sky:"#eef2f7",ground:"#8a6a45",pieces:[["kale",z,16,1],["leek",z,34,1],["sprouts",z,52,1]],extra:hi},harvest:{sky:"#fbf1df",ground:"#8a6a45",pieces:[["corn",at,14,1.1],["pumpkin",ge,34,1],["tomato",Z,54,.9]],extra:fn},seeds:{sky:"#f7f1e2",ground:"#8a6a45",pieces:[["sunflower",at,18,1.2],["bean",z,40,1],["umbel","#e8e2c8",60,.9]],extra:di},nodig:{sky:"#f3efe4",ground:"#8a6a45",pieces:[["lettuce",z,20,.9],["chard",Z,40,1],["kale",z,60,1]],extra:$n},herbs:{sky:"#eef4ec",ground:"#7a5d3e",pieces:[["herb",z,16,1],["lavender",Pt,34,1],["umbel","#e8e2c8",52,1],["herb","#4f8a34",70,.8]],extra:zt},perennials:{sky:"#eef4ec",ground:"#7a5d3e",pieces:[["rhubarb",Z,18,1.1],["asparagus",z,40,1],["artichoke","#6f8f6a",60,1]]},fruit:{sky:"#f4f0e8",ground:"#6f9a45",pieces:[["tree_apple",Z,16,1.4],["berry_bush",Pt,42,1],["strawberry",Z,62,.8]],extra:zt},tools:{sky:"#f0efea",ground:"#8a6a45",pieces:[["leafy",z,24,.9],["carrot",ge,46,.9]],extra:ci+`<g transform="translate(-30 0)">${li}</g>`},home_remedies:{sky:"#f4eef4",ground:"#7a5d3e",pieces:[["herb",z,18,1],["flower",ge,38,.9],["garlic","#efe3cf",58,.9]],extra:_n},year_round:{sky:"#eef2f7",ground:"#8a6a45",pieces:[["leek",z,14,1],["kale",z,32,1],["tomato",Z,50,.9],["lettuce",z,68,.8]],extra:zt+`<g transform="translate(-40 0)">${hi}</g>`},sensors:{sky:"#e9f0f4",ground:"#7a5d3e",pieces:[["lettuce",z,20,.9],["tomato",Z,42,1],["pepper",Z,62,.9]],extra:yn}},pi={sky:"#eef4ec",ground:"#8a6a45",pieces:[["leafy",z,24,1],["carrot",ge,44,1],["flower",at,64,.8]]};function ui(c){let r=c.pieces.map(([e,t,s,i])=>{let n=34*i,a=Se[e]??Se.leafy;return`<g transform="translate(${s/100*200-n/2} ${64-n}) scale(${n/24})" style="color:${t}">${a}</g>`}).join("");return`<rect width="200" height="80" fill="${c.sky}"/>${c.extra??""}
    <path d="M0 62q50-5 100 0t100 0v18H0z" fill="${c.ground}"/>
    <path d="M0 64q50-5 100 0t100 0" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.5"/>${r}`}function rt(c,r=120){let e=as[c]??pi,t=ui(e);return o`<svg class="chapter-art" viewBox="0 0 200 80" preserveAspectRatio="xMidYMid slice" width="100%" height=${r}
    aria-hidden="true">${Ae(t)}</svg>`}var Ro=Object.keys(as);function mi(c,r=190){let e=as[c]??pi,t=`display:block;line-height:0;background:linear-gradient(to bottom, ${e.sky} 78%, ${e.ground} 78%)`;return o`<span class="chapter-banner" style=${t}>
    <svg viewBox="0 0 200 80" preserveAspectRatio="xMidYMax meet" width="100%" style=${`max-height:${r}px;aspect-ratio:5/2;display:block;margin:0 auto`}
      aria-hidden="true">${Ae(ui(e))}</svg></span>`}var wn={planning:"mdi:clipboard-text-outline",soil:"mdi:shovel",sowing:"mdi:seed-outline",watering:"mdi:watering-can-outline",fertilizing:"mdi:bottle-tonic-plus-outline",rotation:"mdi:rotate-3d-variant",companions:"mdi:handshake-outline",greenhouse:"mdi:greenhouse",pests:"mdi:bug-outline",diseases:"mdi:mushroom-outline",seasons:"mdi:calendar-sync-outline",harvest:"mdi:basket-outline",seeds:"mdi:seed",nodig:"mdi:layers-outline",herbs:"mdi:leaf",perennials:"mdi:flower-outline"},G=class extends E{constructor(){super(...arguments);this.lang="en";this.chapterId="";this.narrow=!1;this.chapters=[];this.glossary={};this.body="";this.loadedId="";this.query="";this.results=[];this.showGlossary=!1}willUpdate(e){(e.has("api")||e.has("lang"))&&this.api&&this.loadIndex(),(e.has("chapterId")||e.has("lang"))&&this.api&&this.chapterId&&this.chapterId!==this.loadedId&&this.loadChapter(this.chapterId)}async loadIndex(){let e=await this.api.handbookIndex(this.lang);this.chapters=e.chapters,this.glossary=e.glossary}async loadChapter(e){try{let t=await this.api.handbookChapter(e,this.lang);this.body=t.body,this.loadedId=e,this.updateComplete.then(()=>this.renderRoot.querySelector("article")?.scrollIntoView({block:"start"}))}catch{this.body="",this.loadedId=""}}open(e){this.showGlossary=!1,this.query="",this.results=[],this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e},bubbles:!0,composed:!0}))}onSearch(e){if(this.query=e,window.clearTimeout(this.searchTimer),!e.trim()){this.results=[];return}this.searchTimer=window.setTimeout(async()=>{let t=(await this.api.handbookSearch(e,this.lang)).results;e===this.query&&(this.results=t)},200)}renderToc(){return o`<nav class="toc card" aria-label=${this.t("handbook.contents")}>
      <input class="search" type="search" placeholder=${this.t("handbook.search")} .value=${this.query}
        @input=${e=>this.onSearch(e.target.value)} aria-label=${this.t("handbook.search")} />
      <a aria-current=${!this.chapterId&&!this.showGlossary?"page":"false"} @click=${()=>this.open("")}>
        <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("handbook.overview")}</a>
      ${this.chapters.map(e=>o`<a aria-current=${e.id===this.chapterId&&!this.showGlossary?"page":"false"} @click=${()=>this.open(e.id)}>
        <span class="num">${e.order}</span>${e.title}</a>`)}
      <a aria-current=${this.showGlossary?"page":"false"} @click=${()=>this.showGlossary=!0}>
        <ha-icon icon="mdi:alphabetical-variant"></ha-icon>${this.t("handbook.glossary")}</a>
    </nav>`}renderBody(){if(this.query.trim())return o`<article class="card"><h1>${this.t("handbook.results",{query:this.query})}</h1>
        ${this.results.length?this.results.map(n=>o`<div class="hit" @click=${()=>this.open(n.id)}><b>${n.title}</b><p class="small muted">…${n.snippet}…</p></div>`):o`<p class="muted">${this.t("handbook.no_results")}</p>`}</article>`;if(this.showGlossary){let n=Object.entries(this.glossary).sort((a,l)=>a[1].term.localeCompare(l[1].term,this.lang));return o`<article class="card"><h1>${this.t("handbook.glossary")}</h1>
        <dl class="gloss">${n.map(([,a])=>o`<dt>${a.term}</dt><dd>${a.text}
          ${a.chapter?o` <a href="#" @click=${l=>{l.preventDefault(),this.open(a.chapter)}}>→ ${this.chapters.find(l=>l.id===a.chapter)?.title??a.chapter}</a>`:u}</dd>`)}</dl>
      </article>`}if(!this.chapterId)return o`<article style="max-width:none">
        <h1>${this.t("handbook.title")}</h1>
        <p class="muted">${this.t("handbook.intro")}</p>
        <div class="grid">${this.chapters.map(n=>o`<button class="card tile" @click=${()=>this.open(n.id)}>
          <span class="art">${rt(n.id,96)}</span>
          <span class="txt"><h3><ha-icon icon=${wn[n.id]??"mdi:book-outline"}></ha-icon>${n.title}</h3>
          <p class="small muted">${he(n.summary)}</p></span></button>`)}</div>
      </article>`;let e=this.chapters.find(n=>n.id===this.chapterId),t=this.chapters.findIndex(n=>n.id===this.chapterId),s=t>0?this.chapters[t-1]:void 0,i=t>=0&&t<this.chapters.length-1?this.chapters[t+1]:void 0;return o`<article class="card">
      <span class="banner">${mi(this.chapterId)}</span>
      <h1>${e?.title??""}</h1>
      <div class="sections">${ri(this.body).filter(n=>n.level===2).map(n=>o`<a class="chip" href=${`#${n.id}`}
        @click=${a=>{a.preventDefault(),this.renderRoot.querySelector(`#${CSS.escape(nt(n.text))}`)?.scrollIntoView({behavior:"smooth"})}}>${n.text}</a>`)}</div>
      ${this.loadedId===this.chapterId?oi(this.body):o`<p class="muted">${this.t("common.loading")}</p>`}
      <div class="row" style="margin-top:var(--hl-s5)">
        ${s?o`<button class="btn small ghost" @click=${()=>this.open(s.id)}>← ${s.title}</button>`:u}
        <span class="spacer"></span>
        ${i?o`<button class="btn small" @click=${()=>this.open(i.id)}>${i.title} →</button>`:u}
      </div>
    </article>`}render(){let e=this.narrow&&(this.chapterId||this.showGlossary)?o`<details class="toc-wrap card"><summary><ha-icon icon="mdi:format-list-bulleted"></ha-icon>${this.t("handbook.contents")}</summary>${this.renderToc()}</details>`:this.renderToc();return o`<div class="layout ${this.narrow?"narrow":""}">${e}${this.renderBody()}</div>`}};G.styles=[A,T`
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
    `],p([g({attribute:!1})],G.prototype,"api",2),p([g({attribute:!1})],G.prototype,"t",2),p([g()],G.prototype,"lang",2),p([g()],G.prototype,"chapterId",2),p([g({type:Boolean})],G.prototype,"narrow",2),p([f()],G.prototype,"chapters",2),p([f()],G.prototype,"glossary",2),p([f()],G.prototype,"body",2),p([f()],G.prototype,"loadedId",2),p([f()],G.prototype,"query",2),p([f()],G.prototype,"results",2),p([f()],G.prototype,"showGlossary",2),G=p([j("hl-handbook-view")],G);var kn=[{id:"garden",icon:"mdi:floor-plan"},{id:"zone",icon:"mdi:greenhouse"},{id:"beds",icon:"mdi:sprout-outline"},{id:"tasks",icon:"mdi:format-list-checks"},{id:"season",icon:"mdi:chart-gantt"},{id:"year",icon:"mdi:calendar-month"},{id:"blank",icon:"mdi:draw"},{id:"plants",icon:"mdi:card-text-outline"}],xn=["remarkable","a4","a3","a5","letter"],gi="hortulus.print",J=class extends E{constructor(){super(...arguments);this.lang="en";this.narrow=!1;this.admin=!0;this.opts={document:"garden",page:"remarkable",landscape:!1,color_mode:"eink",days:28,notes:!0,grid:!0,labels:!0};this.pages=[];this.busy=!1;this.error=""}connectedCallback(){super.connectedCallback();try{let e=JSON.parse(localStorage.getItem(gi)??"null");e&&(this.opts={...this.opts,...e})}catch{}}willUpdate(e){e.has("api")&&this.api&&!this.pages.length&&this.schedule(0)}set(e,t){this.opts={...this.opts,[e]:t},e==="page"&&t==="remarkable"&&this.opts.color_mode==="color"&&(this.opts={...this.opts,color_mode:"eink"});try{localStorage.setItem(gi,JSON.stringify({...this.opts,bed_ids:null,zone_id:null,title:null}))}catch{}this.schedule()}schedule(e=350){window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>this.preview(),e)}async preview(){this.busy=!0,this.error="";try{this.pages=(await this.api.printPreview(this.payload())).pages}catch(e){this.error=e.message??String(e)}finally{this.busy=!1}}payload(){let e={...this.opts};return e.document!=="zone"&&delete e.zone_id,e.document!=="beds"&&delete e.bed_ids,e.title||delete e.title,e}async download(){this.busy=!0;try{let{blob:e,filename:t}=await this.api.printPdf(this.payload()),s=URL.createObjectURL(e),i=document.createElement("a");i.href=s,i.download=t,i.click(),setTimeout(()=>URL.revokeObjectURL(s),2e3)}catch(e){this.toast(this.t("common.error",{message:e.message}))}finally{this.busy=!1}}async saveToConfig(){try{await this.api.exportPdfToConfig(this.payload()),this.toast(this.t("print.saved_to_config"))}catch(e){this.toast(this.t("common.error",{message:e.message}))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}renderForm(){let e=this.opts,t=this.snapshot.analysis?.season??new Date().getFullYear(),s=this.snapshot.zones;return o`<section class="card stack" aria-label=${this.t("print.options")}>
      <h2>${this.t("print.document")}</h2>
      <div class="docs" role="group">
        ${kn.map(i=>o`<button class="doc" aria-pressed=${String(e.document===i.id)} @click=${()=>this.set("document",i.id)}>
          <ha-icon icon=${i.icon}></ha-icon><b>${this.t(`print.doc.${i.id}`)}</b><small>${this.t(`print.doc.${i.id}.hint`)}</small></button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("print.page")}
          <select @change=${i=>this.set("page",i.target.value)}>
            ${xn.map(i=>o`<option value=${i} ?selected=${e.page===i}>${this.t(`print.page.${i}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("print.orientation")}
          <select @change=${i=>this.set("landscape",i.target.value==="landscape")}>
            <option value="portrait" ?selected=${!e.landscape}>${this.t("print.portrait")}</option>
            <option value="landscape" ?selected=${e.landscape}>${this.t("print.landscape")}</option>
          </select></label>
        <label class="field">${this.t("print.colors")}
          <select @change=${i=>this.set("color_mode",i.target.value)}>
            ${["color","eink","grayscale"].map(i=>o`<option value=${i} ?selected=${e.color_mode===i}>${this.t(`print.color.${i}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("planner.season")}
          <select @change=${i=>this.set("season",Number(i.target.value))}>
            ${[t-1,t,t+1].map(i=>o`<option value=${i} ?selected=${(e.season??t)===i}>${i}</option>`)}
          </select></label>
        ${e.document==="zone"||e.document==="blank"?o`<label class="field full">${this.t("planner.zone")}
          <select @change=${i=>this.set("zone_id",i.target.value||null)}>
            <option value="">${this.t(e.document==="zone"?"print.all_greenhouses":"print.all_zones")}</option>
            ${s.map(i=>o`<option value=${i.id} ?selected=${e.zone_id===i.id}>${i.name}</option>`)}
          </select></label>`:u}
        ${e.document==="beds"?o`<fieldset class="full" style="border:0;padding:0;margin:0">
          <legend class="small muted">${this.t("print.beds")}</legend>
          <div class="row wrap">${this.snapshot.beds.map(i=>{let n=!e.bed_ids||e.bed_ids.includes(i.id);return o`<button class="chip" aria-pressed=${String(n)} @click=${()=>{let a=this.snapshot.beds.map(h=>h.id),l=e.bed_ids??a,d=n?l.filter(h=>h!==i.id):[...l,i.id];this.set("bed_ids",d.length===a.length?null:d)}}>${i.name}</button>`})}</div></fieldset>`:u}
        ${e.document==="tasks"?o`<label class="field">${this.t("print.days")}<input type="number" min="1" max="120" .value=${String(e.days)}
          @change=${i=>this.set("days",Number(i.target.value))} /></label>`:u}
        <label class="field full">${this.t("print.title")}<input .value=${e.title??""} placeholder=${this.t(`print.doc.${e.document}`)}
          @change=${i=>this.set("title",i.target.value||null)} /></label>
        <label class="field check"><input type="checkbox" .checked=${e.notes} @change=${i=>this.set("notes",i.target.checked)} />${this.t("print.notes")}</label>
        <label class="field check"><input type="checkbox" .checked=${e.grid} @change=${i=>this.set("grid",i.target.checked)} />${this.t("print.grid")}</label>
        <label class="field check full"><input type="checkbox" .checked=${e.labels} @change=${i=>this.set("labels",i.target.checked)} />${this.t("print.labels")}</label>
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
        ${this.pages.length?this.pages.map((e,t)=>o`<figure class="sheet" style="margin:0">${Zs(e)}
            <figcaption class="num">${this.t("print.page_n",{n:t+1,total:this.pages.length})}</figcaption></figure>`):o`<p class="muted">${this.busy?this.t("common.loading"):this.t("print.empty")}</p>`}
      </section>
    </div>`}};J.styles=[A,T`
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
    `],p([g({attribute:!1})],J.prototype,"snapshot",2),p([g({attribute:!1})],J.prototype,"api",2),p([g({attribute:!1})],J.prototype,"t",2),p([g()],J.prototype,"lang",2),p([g({type:Boolean})],J.prototype,"narrow",2),p([g({type:Boolean})],J.prototype,"admin",2),p([f()],J.prototype,"opts",2),p([f()],J.prototype,"pages",2),p([f()],J.prototype,"busy",2),p([f()],J.prototype,"error",2),J=p([j("hl-print-view")],J);var Sn=new Set(["growth","yellow_leaves","wilting","no_fruit","bolting","pests","disease","too_hot","too_cold","soil","slugs","frost"]),Mn={warning:"mdi:alert-outline",tip:"mdi:lightbulb-on-outline",info:"mdi:information-outline"},En={pollination:"mdi:bee-flower",neighbours:"mdi:handshake-outline",placement:"mdi:white-balance-sunny",year_round:"mdi:calendar-sync-outline",soil:"mdi:shovel",eco:"mdi:leaf-circle-outline",growth:"mdi:sprout",greenhouse:"mdi:greenhouse"},H=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.mode="question";this.options=null;this.subject="plant";this.target="";this.problem="what_to_do";this.answer=null;this.busy=!1;this.advice=null;this.supplies=null;this.dismissed=new Set}connectedCallback(){super.connectedCallback(),this.load()}async load(){try{let[e,t,s]=await Promise.all([this.api.qaOptions(),this.api.advice(),this.api.supplies()]);this.options=e,this.advice=t,this.supplies=s;let i=e.targets.plant.find(n=>n.planted);this.target=i?.id??e.targets.plant[0]?.id??""}catch(e){this.toast(e.message??String(e))}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}openChapter(e){this.dispatchEvent(new CustomEvent("open-handbook",{detail:{chapter:e},bubbles:!0,composed:!0}))}problems(){let e=this.options?.subjects[this.subject]??[],t=e.filter(s=>this.mode==="problem"===Sn.has(s));return t.length?t:e}setSubject(e){this.subject=e;let t=this.options?.targets[e]??[];this.target=t.find(s=>s.planted)?.id??t[0]?.id??"",this.problems().includes(this.problem)||(this.problem=this.problems()[0]??""),this.answer=null}setMode(e){this.mode=e,this.problems().includes(this.problem)||(this.problem=this.problems()[0]??""),this.answer=null}async ask(){this.busy=!0;try{this.answer=await this.api.qaAsk(this.subject,this.problem,this.target||null)}catch(e){this.toast(e.message??String(e))}finally{this.busy=!1}}async apply(e){let t=e.action;if(t)if(t.type==="add_planting"&&t.plant_id&&t.bed_id){let s=this.plants.find(b=>b.id===t.plant_id),i=this.snapshot,n=i.beds.find(b=>b.id===t.bed_id);if(!s||!n)return;let a=i.analysis?.season??new Date().getFullYear(),l=st(s,"block",n),d=i.plantings.filter(b=>b.bed_id===n.id&&ue(b,!!this.plants.find(w=>w.id===b.plant_id)?.perennial,a)).map(b=>({x:b.x_cm,y:b.y_cm,w:b.width_cm,h:b.length_cm})),h=Me(n,l,d,i.settings.snap_cm);if(!h){this.toast(this.t("advice.no_space",{bed:n.name}));return}let m={id:re("pl"),plant_id:s.id,bed_id:n.id,season:a,layout:"block",x_cm:h.x,y_cm:h.y,width_cm:l.w,length_cm:l.h,count:null,method:ns(s),status:"planned",sow_date:null,transplant_date:null,sown_on:null,transplanted_on:null,harvest_started_on:null,finished_on:null,succession_group:null,succession_index:0,notes:"advice"},v={zones:i.zones,beds:i.beds,plantings:[...i.plantings,m],features:i.features??[]};try{await this.api.savePlan(v,i.revision),this.dismissed=new Set([...this.dismissed,e.id]),this.toast(this.t("planner.placed",{plant:y(s,this.lang),bed:n.name}))}catch(b){this.toast(b.message??String(b))}}else t.type==="year_transition"?this.dispatchEvent(new CustomEvent("year-transition",{detail:t.from_season,bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("navigate",{detail:t.type==="draw"?"layout":"planner",bubbles:!0,composed:!0}))}suggestionPicture(e){let t=o`<ha-icon icon=${En[e.kind]??Mn[e.severity]}></ha-icon>`,s=e.plants.map(n=>this.plants.find(a=>a.id===n)).find(Boolean),i=this.t(`advice.kind.${e.kind}`);return s?o`<span class="pic" title=${i}><hl-plant-image .plant=${s} color=${R(this.families,s.family)}
        lang=${this.lang} size="thumb"></hl-plant-image><span class="badge">${t}</span></span>`:e.handbook?o`<span class="pic" title=${i}>${rt(e.handbook,44)}<span class="badge">${t}</span></span>`:o`<span class="icon" title=${i}>${t}</span>`}answerPicture(e){let t=e.subject==="plant"?this.plants.find(s=>s.id===e.target):void 0;return t?o`<hl-plant-image class="hero" .plant=${t} color=${R(this.families,t.family)} lang=${this.lang}
        size="hero" credit></hl-plant-image>`:e.handbook?o`<span class="hero">${rt(e.handbook,120)}</span>`:u}plantChip(e){let t=this.plants.find(s=>s.id===e);return t?o`<span class="plant-chip">${oe(ee(t),t.color||R(this.families,t.family),20)}${y(t,this.lang)}</span>`:o``}render(){return this.options?o`<div class="grid">
      <div class="stack">${this.renderAsk()}${this.answer?this.renderAnswer(this.answer):u}${this.renderSuggestions()}</div>
      <div class="stack">${this.renderCoverage()}${this.renderShopping()}</div>
    </div>`:o`<p class="empty">${this.t("common.loading")}</p>`}renderAsk(){let e=this.options,t=e.targets[this.subject]??[],s=t.filter(n=>n.planted),i=t.filter(n=>!n.planted);return o`<section class="card ask stack" aria-labelledby="ask-h">
      <h2 id="ask-h"><ha-icon icon="mdi:chat-question-outline"></ha-icon> ${this.t("advice.ask_title")}</h2>
      <div class="sentence">
        <span>${this.t("advice.i_have")}</span>
        <span class="modes segmented" role="group">
          <button aria-pressed=${String(this.mode==="question")} @click=${()=>this.setMode("question")}>${this.t("advice.mode.question")}</button>
          <button aria-pressed=${String(this.mode==="problem")} @click=${()=>this.setMode("problem")}>${this.t("advice.mode.problem")}</button>
        </span>
        <span>${this.t("advice.about")}</span>
        <select aria-label=${this.t("advice.subject")} @change=${n=>this.setSubject(n.target.value)}>
          ${Object.keys(e.subjects).map(n=>o`<option value=${n} ?selected=${n===this.subject}>${this.t(`advice.subject.${n}`)}</option>`)}
        </select>
        ${t.length?o`<select aria-label=${this.t("advice.target")} @change=${n=>{this.target=n.target.value,this.answer=null}}>
          ${s.length?o`<optgroup label=${this.t("advice.in_garden")}>${s.map(n=>o`<option value=${n.id} ?selected=${n.id===this.target}>${n.name}</option>`)}</optgroup>`:u}
          ${s.length?o`<optgroup label=${this.t("advice.all_plants")}>${i.map(n=>o`<option value=${n.id} ?selected=${n.id===this.target}>${n.name==="*"?this.t("advice.whole_garden"):this.subject==="tools"?this.t(`type.${n.id}`):n.name}</option>`)}</optgroup>`:i.map(n=>o`<option value=${n.id} ?selected=${n.id===this.target}>${n.name==="*"?this.t("advice.whole_garden"):this.subject==="tools"?this.t(`type.${n.id}`):n.name}</option>`)}
        </select>`:u}
        <span>:</span>
        <select aria-label=${this.t("advice.problem")} @change=${n=>{this.problem=n.target.value,this.answer=null}}>
          ${this.problems().map(n=>o`<option value=${n} ?selected=${n===this.problem}>${this.t(`advice.q.${n}`)}</option>`)}
        </select>
        <button class="btn primary" ?disabled=${this.busy} @click=${()=>this.ask()}><ha-icon icon="mdi:send"></ha-icon>${this.t("advice.ask")}</button>
      </div>
    </section>`}renderAnswer(e){let t=(s,i,n,a)=>a.length?o`<div class="section ${s}"><ha-icon icon=${i}></ha-icon><h4>${n}</h4><ul>${a.map(l=>o`<li>${l}</li>`)}</ul></div>`:u;return o`<section class="card answer" aria-live="polite">
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
    </section>`}renderCoverage(){let e=this.advice?.coverage;if(!e)return o``;let t=new Date().getMonth(),s=i=>new Date(2026,i,1).toLocaleDateString(this.lang==="nl"?"nl-BE":"en-GB",{month:"short"});return o`<section class="card stack" aria-labelledby="cov-h">
      <h2 id="cov-h"><ha-icon icon="mdi:calendar-sync-outline"></ha-icon> ${this.t("advice.coverage")}</h2>
      <div class="months" role="list">
        ${e.months.map((i,n)=>o`<div role="listitem" class="month ${i.length?"":"gap"} ${n===t?"now":""}"
          title=${i.map(a=>y(this.plants.find(l=>l.id===a),this.lang)).join(", ")||this.t("advice.nothing")}>
          ${s(n)}<b>${i.length}</b></div>`)}
      </div>
      <p class="xs muted">${e.gaps.length?this.t("advice.coverage_gaps"):this.t("advice.coverage_full")}</p>
    </section>`}renderShopping(){let e=this.supplies;if(!e)return o``;let t="";return o`<section class="card stack" aria-labelledby="shop-h">
      <h2 id="shop-h"><ha-icon icon="mdi:cart-outline"></ha-icon> ${this.t("advice.shopping")}</h2>
      <p class="small muted">${this.t("advice.shopping_intro")}</p>
      ${e.shopping.length?o`<table>
        ${e.shopping.map(s=>{let i=s.category!==t?o`<tr><td class="cat" colspan="3">${this.t(`advice.cat.${s.category}`)}</td></tr>`:u;return t=s.category,o`${i}<tr><td>${s.emoji} ${s.name}</td><td class="num">${s.quantity} ${s.unit}</td><td class="xs muted">${s.reason}</td></tr>`})}
      </table>`:o`<p class="small">${this.t("advice.nothing_to_buy")}</p>`}
      <details><summary class="small"><b>${this.t("advice.tools_per_task")}</b></summary>
        <table>${Object.entries(e.task_tools).filter(([,s])=>s.length).map(([s,i])=>o`<tr>
          <td>${this.t(`type.${s}`)}</td><td class="small">${i.map(n=>`${e.tools[n]?.emoji??""} ${e.tools[n]?.name??n}`).join(", ")}</td></tr>`)}</table>
      </details>
      <button class="btn small ghost" @click=${()=>this.openChapter("tools")}><ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("advice.read_tools")}</button>
    </section>`}};H.styles=[A,T`
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
    `],p([g({attribute:!1})],H.prototype,"snapshot",2),p([g({attribute:!1})],H.prototype,"plants",2),p([g({attribute:!1})],H.prototype,"families",2),p([g({attribute:!1})],H.prototype,"api",2),p([g({attribute:!1})],H.prototype,"t",2),p([g()],H.prototype,"lang",2),p([g({type:Boolean})],H.prototype,"admin",2),p([f()],H.prototype,"mode",2),p([f()],H.prototype,"options",2),p([f()],H.prototype,"subject",2),p([f()],H.prototype,"target",2),p([f()],H.prototype,"problem",2),p([f()],H.prototype,"answer",2),p([f()],H.prototype,"busy",2),p([f()],H.prototype,"advice",2),p([f()],H.prototype,"supplies",2),p([f()],H.prototype,"dismissed",2),H=p([j("hl-advice-view")],H);var fi=50,rs=6,Tn={add:"mdi:plus-circle-outline",remove:"mdi:minus-circle-outline",change:"mdi:pencil-outline"},zn=["note","observation","problem","milestone"],Pn={note:"mdi:note-text-outline",observation:"mdi:eye-outline",problem:"mdi:alert-circle-outline",milestone:"mdi:flag-checkered"},jn={ok:"ok",use_soon:"warn",expired:"bad",empty:"",unknown:""},O=class extends E{constructor(){super(...arguments);this.plants=[];this.families={};this.lang="en";this.admin=!0;this.section="diary";this.overview=null;this.filter="";this.draftPhotos=[];this.busy=!1;this.syslog=[];this.syslogMore=!1;this.syslogSystem=!0;this.quality=0}connectedCallback(){super.connectedCallback(),this.load()}updated(e){!e.has("snapshot")||!this.snapshot||e.get("snapshot")===void 0||(window.clearTimeout(this.reloadTimer),this.reloadTimer=window.setTimeout(()=>void this.load(),800))}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.reloadTimer)}async load(){try{this.overview=await this.api.records()}catch{}this.section==="system"&&await this.loadSyslog()}async loadSyslog(e=!1){try{let t=e?this.syslog[this.syslog.length-1]?.id??null:null,s=e?fi:Math.max(fi,this.syslog.length),i=await this.api.syslog({limit:s,before:t,include_system:this.syslogSystem});this.syslog=e?[...this.syslog,...i.entries]:i.entries,this.syslogMore=i.more}catch{}}toast(e){this.dispatchEvent(new CustomEvent("hl-toast",{detail:{message:e},bubbles:!0,composed:!0}))}async guard(e,t){this.busy=!0;try{return await e(),t&&this.toast(t),!0}catch(s){return this.toast(this.t("common.error",{message:s.message??String(s)})),!1}finally{this.busy=!1}}plant(e){return this.plants.find(t=>t.id===e)}icon(e,t=24){let s=this.plant(e);return s?oe(ee(s),s.color||R(this.families,s.family),t):o``}get season(){return this.snapshot.analysis?.season??new Date().getFullYear()}get presentPlantings(){return this.snapshot.plantings.filter(e=>ue(e,!!this.plant(e.plant_id)?.perennial,this.season))}plantingLabel(e){let t=this.snapshot.beds.find(s=>s.id===e.bed_id);return`${y(this.plant(e.plant_id),this.lang)} \xB7 ${t?.name??""}`}render(){return o`
      <div class="tabs" role="tablist">
        ${[["diary","mdi:notebook-outline"],["harvest","mdi:basket-outline"],["seeds","mdi:seed-outline"],["water","mdi:water-outline"],["system","mdi:history"]].map(([t,s])=>o`<button class="chip" role="tab" aria-selected=${String(this.section===t)} aria-pressed=${String(this.section===t)}
          @click=${()=>this.openSection(t)}><ha-icon icon=${s}></ha-icon>${this.t(`journal.${t}`)}</button>`)}
      </div>
      ${this.section==="diary"?this.renderDiary():this.section==="harvest"?this.renderHarvest():this.section==="seeds"?this.renderSeeds():this.section==="water"?this.renderWater():this.renderSystem()}
    `}openSection(e){this.section=e,e==="system"&&this.loadSyslog()}async addPhoto(e){let t=[...e.target.files??[]];for(let s of t)await this.guard(async()=>{this.draftPhotos=[...this.draftPhotos,await this.api.uploadPhoto(s)]});e.target.value=""}async saveEntry(e){e.preventDefault();let t=e.target,s=a=>t.elements.namedItem(a).value,i=s("link"),n={text:s("text"),kind:s("kind"),photos:this.draftPhotos,planting_id:i.startsWith("p:")?i.slice(2):null,bed_id:i.startsWith("b:")?i.slice(2):null};await this.guard(()=>this.api.saveJournal(n),this.t("journal.saved"))&&(t.reset(),this.draftPhotos=[])}renderDiary(){let e=[...this.snapshot.journal??[]].sort((i,n)=>i.at<n.at?1:-1),t=e.filter(i=>!this.filter||i.bed_id===this.filter||i.plant_id===this.filter),s="";return o`<div class="grid">
      <section class="card stack" aria-labelledby="new-entry">
        <h2 id="new-entry"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon> ${this.t("journal.new")}</h2>
        <form class="stack" @submit=${this.saveEntry}>
          <label class="field">${this.t("journal.text")}<textarea name="text" placeholder=${this.t("journal.placeholder")}></textarea></label>
          <div class="form-grid">
            <label class="field">${this.t("journal.kind")}<select name="kind">${zn.map(i=>o`<option value=${i}>${this.t(`journal.kind.${i}`)}</option>`)}</select></label>
            <label class="field">${this.t("journal.link")}<select name="link"><option value="">${this.t("journal.whole_garden")}</option>
              <optgroup label=${this.t("journal.beds")}>${this.snapshot.beds.map(i=>o`<option value=${`b:${i.id}`}>${i.name}</option>`)}</optgroup>
              <optgroup label=${this.t("journal.crops")}>${this.presentPlantings.map(i=>o`<option value=${`p:${i.id}`}>${this.plantingLabel(i)}</option>`)}</optgroup>
            </select></label>
          </div>
          <label class="btn small ghost" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("journal.add_photo")}
            <input type="file" accept="image/*" capture="environment" multiple hidden @change=${this.addPhoto} /></label>
          ${this.draftPhotos.length?o`<div class="photos" style="grid-column:auto">${this.draftPhotos.map(i=>o`<img src=${_e(i)} alt="" />`)}</div>`:u}
          <div class="row"><button class="btn primary" type="submit" ?disabled=${this.busy||!this.admin}>${this.t("journal.save")}</button></div>
        </form>
      </section>
      <section class="card stack" aria-labelledby="diary-h">
        <div class="row wrap"><h2 id="diary-h"><ha-icon icon="mdi:timeline-text-outline"></ha-icon> ${this.t("journal.diary")}</h2><span class="spacer"></span>
          <select aria-label=${this.t("journal.filter")} @change=${i=>this.filter=i.target.value}>
            <option value="">${this.t("journal.all")}</option>
            ${this.snapshot.beds.map(i=>o`<option value=${i.id}>${i.name}</option>`)}
            ${[...new Set(e.map(i=>i.plant_id).filter(Boolean))].map(i=>o`<option value=${i}>${y(this.plant(i),this.lang)}</option>`)}
          </select></div>
        ${t.length?o`<div class="timeline">${t.map(i=>{let n=k(i.at,this.lang,{month:"long",year:"numeric"}),a=n!==s?o`<div class="month">${n}</div>`:u;s=n;let l=this.snapshot.beds.find(d=>d.id===i.bed_id);return o`${a}<article class="entry ${i.kind}">
            <span class="icon">${i.plant_id?this.icon(i.plant_id,26):o`<ha-icon icon=${Pn[i.kind]}></ha-icon>`}</span>
            <div><div class="meta">${k(i.at,this.lang,{weekday:"short",day:"numeric",month:"short"})}
              · ${this.t(`journal.kind.${i.kind}`)}${i.plant_id?` \xB7 ${y(this.plant(i.plant_id),this.lang)}`:""}${l?` \xB7 ${l.name}`:""}${i.author?` \xB7 ${i.author}`:""}</div>
              <div>${i.text}</div></div>
            ${i.photos.length?o`<div class="photos">${i.photos.map(d=>o`<a href=${_e(d,"original")} target="_blank" rel="noopener"><img src=${_e(d)} alt="" loading="lazy" /></a>`)}</div>`:u}
            ${this.admin?o`<div style="grid-column:2"><button class="btn small ghost" @click=${()=>this.guard(()=>this.api.deleteRecord("journal",i.id))}>${this.t("common.delete")}</button></div>`:u}
          </article>`})}</div>`:o`<p class="small muted">${this.t("journal.empty")}</p>`}
      </section>
    </div>`}async saveHarvest(e){e.preventDefault();let t=e.target,s=a=>t.elements.namedItem(a).value,i=s("what");await this.guard(()=>this.api.logHarvest({planting_id:i.startsWith("p:")?i.slice(2):null,plant_id:i.startsWith("x:")?i.slice(2):null,kg:Number(s("kg"))||0,count:s("count")?Number(s("count")):null,quality:this.quality||null,day:s("day")||void 0,note:s("note")}),this.t("journal.harvest_saved"))&&(t.reset(),this.quality=0,this.load())}renderHarvest(){let e=this.overview,t=Object.values(e?.harvest_season??{}).sort((l,d)=>d.kg-l.kg),s=t.reduce((l,d)=>l+d.kg,0),i=Math.max(...t.map(l=>l.kg),.001),n=[...this.snapshot.harvest_log??[]].sort((l,d)=>l.day<d.day?1:-1).slice(0,25),a=this.presentPlantings.filter(l=>this.plant(l.plant_id)?.harvestable!==!1);return o`<div class="grid">
      <section class="card stack" aria-labelledby="h-new">
        <h2 id="h-new"><ha-icon icon="mdi:basket-plus-outline"></ha-icon> ${this.t("journal.log_harvest")}</h2>
        <form class="stack" @submit=${this.saveHarvest}>
          <label class="field">${this.t("journal.what")}<select name="what" required>
            <optgroup label=${this.t("journal.crops")}>${a.map(l=>o`<option value=${`p:${l.id}`}>${this.plantingLabel(l)}</option>`)}</optgroup>
            <optgroup label=${this.t("advice.all_plants")}>${[...this.plants].sort((l,d)=>y(l,this.lang).localeCompare(y(d,this.lang))).map(l=>o`<option value=${`x:${l.id}`}>${y(l,this.lang)}</option>`)}</optgroup>
          </select></label>
          <div class="form-grid">
            <label class="field">${this.t("journal.kg")}<input name="kg" type="number" min="0" step="0.05" inputmode="decimal" /></label>
            <label class="field">${this.t("journal.count")}<input name="count" type="number" min="0" step="1" inputmode="numeric" /></label>
            <label class="field">${this.t("journal.day")}<input name="day" type="date" .value=${this.snapshot.analysis?.today??""} /></label>
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
        ${t.map(l=>{let d=e?.learned_yields[l.plant_id],h=this.plant(l.plant_id)?.yield_kg_m2;return o`<div class="crop">${this.icon(l.plant_id,26)}
            <div><b>${y(this.plant(l.plant_id),this.lang)}</b>
              <div class="bar" style=${`width:${Math.max(l.kg/i*100,2)}%`}></div>
              ${d!=null?o`<span class="xs muted">${this.t("journal.yield",{kg:d,db:h??"\u2013"})}</span>`:u}</div>
            <span class="num"><b>${l.kg.toFixed(1)} kg</b>${l.count?o`<br /><span class="xs muted">${l.count} ×</span>`:u}</span></div>`})}
        ${n.length?o`<h3>${this.t("journal.recent")}</h3><table>
          <tr><th>${this.t("journal.day")}</th><th>${this.t("lib.plant")}</th><th class="num">kg</th><th class="num">#</th><th></th></tr>
          ${n.map(l=>o`<tr><td>${k(l.day,this.lang)}</td><td>${y(this.plant(l.plant_id),this.lang)}${l.quality?` ${"\u2605".repeat(l.quality)}`:""}</td>
            <td class="num">${l.kg?l.kg.toFixed(2):"\u2013"}</td><td class="num">${l.count??"\u2013"}</td>
            <td class="num">${this.admin?o`<button class="icon-btn" aria-label=${this.t("common.delete")} @click=${()=>this.guard(()=>this.api.deleteRecord("harvest",l.id)).then(()=>this.load())}>
              <ha-icon icon="mdi:delete-outline"></ha-icon></button>`:u}</td></tr>`)}
        </table>`:o`<p class="small muted">${this.t("journal.no_harvest")}</p>`}
      </section>
    </div>`}async saveSeed(e){e.preventDefault();let t=e.target,s=n=>t.elements.namedItem(n).value,i={plant_id:s("plant"),variety:s("variety"),year:s("year")?Number(s("year")):null,quantity:Number(s("quantity")||1),unit:s("unit"),source:s("source")};await this.guard(()=>this.api.saveSeed(i),this.t("journal.seed_saved"))&&(t.reset(),this.load())}renderSeeds(){let e=this.overview?.seeds,t=[...this.plants].sort((s,i)=>y(s,this.lang).localeCompare(y(i,this.lang)));return o`<div class="grid">
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
            <td><span class="chip ${jn[s.status]}">${this.t(`journal.seed.${s.status}`,{year:s.use_by??""})}</span></td>
            <td class="num">${this.admin?o`<button class="icon-btn" aria-label=${this.t("common.delete")} @click=${()=>this.guard(()=>this.api.deleteRecord("seed",s.id)).then(()=>this.load())}>
              <ha-icon icon="mdi:delete-outline"></ha-icon></button>`:u}</td></tr>`)}
        </table>`:o`<p class="small muted">${this.t("journal.no_seeds")}</p>`}
      </section>
    </div>`}renderWater(){let e=this.overview?.water,t=this.snapshot.settings.water,s=!!(t?.meter_entity||t?.butt_level_entity),i=Math.max(...(e?.per_day??[]).map(n=>n.liters),1);return o`<section class="card stack" aria-labelledby="w-h">
      <h2 id="w-h"><ha-icon icon="mdi:water-outline"></ha-icon> ${this.t("journal.water")}</h2>
      ${s?u:o`<div class="finding info"><ha-icon icon="mdi:information-outline"></ha-icon><span>${this.t("journal.water_setup")}</span></div>`}
      <div class="tiles">
        <div class="tile">${this.t("journal.water_week")}<b>${e?.week_l!=null?`${e.week_l} L`:"\u2013"}</b></div>
        <div class="tile">${this.t("journal.water_season")}<b>${e?.season_l!=null?`${e.season_l} L`:"\u2013"}</b></div>
        <div class="tile">${this.t("journal.rain_available")}<b>${e?.rain_available_l!=null?`${e.rain_available_l} L`:e?.butt_pct!=null?`${e.butt_pct}%`:"\u2013"}</b></div>
      </div>
      ${e?.per_day.length?o`<h3>${this.t("journal.per_day")}</h3><div class="days" role="img" aria-label=${this.t("journal.per_day")}>
        ${e.per_day.map(n=>o`<div title=${`${n.day}: ${n.liters} L`} style=${`height:${n.liters/i*100}%`}></div>`)}</div>`:u}
      <p class="xs muted">${this.t("journal.water_hint")}</p>
    </section>`}async undo(e){if(confirm(this.t("syslog.confirm",{what:this.entryTitle(e)}))){this.busy=!0;try{let t=await this.api.undo(e.id);!t.ok&&t.conflicts.length&&!t.problems.length&&confirm(this.t("syslog.conflict",{n:t.conflicts.length}))&&(t=await this.api.undo(e.id,!0)),t.ok?this.toast(this.t("syslog.undone")):t.problems.length&&this.toast(this.t("syslog.blocked")),await this.loadSyslog()}catch(t){this.toast(this.t("common.error",{message:t.message??String(t)}))}finally{this.busy=!1}}}summaryText(e){let t;e.col==="settings"?t=e.key??"":e.plant_id&&(e.col==="plantings"||!e.name)?t=y(this.plant(e.plant_id),this.lang)||e.plant_id:t=e.name??"";let s=[e.bed,e.col==="plantings"&&e.season?this.t("common.season",{year:e.season}):null].filter(Boolean).join(", ");return`${this.t(`syslog.col.${e.col}`)}: ${t}${s?` (${s})`:""}`}entryTitle(e){if(e.undo_of)return this.t("syslog.reason.undo");let t=e.summary[0],i=new Set(e.summary.map(n=>n.op)).size===1?this.t(`syslog.op.${t.op}`):this.t("syslog.op.mixed");return e.summary.length===1?`${i} \u2013 ${this.summaryText(t)}`:this.t("syslog.n_changes",{verb:i,n:e.count})}renderSystem(){let e=t=>new Date(t).toLocaleString(this.lang==="nl"?"nl-NL":"en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return o`<section class="card stack" aria-labelledby="sys-h">
      <h2 id="sys-h"><ha-icon icon="mdi:history"></ha-icon> ${this.t("journal.system")}</h2>
      <p class="small muted">${this.t("syslog.intro")}</p>
      <label class="row small"><input type="checkbox" .checked=${this.syslogSystem}
        @change=${t=>{this.syslogSystem=t.target.checked,this.loadSyslog()}} />${this.t("syslog.show_system")}</label>
      ${this.syslog.length?u:o`<p class="small muted">${this.t("syslog.empty")}</p>`}
      <div class="stack" style="gap:8px" role="list">
        ${this.syslog.map(t=>o`<article role="listitem" class="log ${t.source} ${t.undone_by?"undone":""}">
          <div class="icon"><ha-icon icon=${t.undo_of?"mdi:undo-variant":t.source==="system"?"mdi:robot-outline":"mdi:account-edit-outline"}></ha-icon></div>
          <div>
            <strong>${this.entryTitle(t)}</strong>
            <div class="meta">${e(t.at)} · ${t.source==="system"?this.t("syslog.by_system"):t.user??this.t("syslog.by_unknown")}
              · ${this.t(`syslog.reason.${t.reason}`)}${t.undone_by?o` · <span class="chip warn">${this.t("syslog.is_undone")}</span>`:u}</div>
            ${t.summary.length>1?o`<ul>
              ${t.summary.slice(0,rs).map(s=>o`<li><ha-icon icon=${Tn[s.op]}></ha-icon>${this.summaryText(s)}</li>`)}
              ${t.summary.length>rs?o`<li class="muted">${this.t("syslog.and_more",{n:t.summary.length-rs})}</li>`:u}
            </ul>`:u}
          </div>
          ${this.admin&&!t.undone_by?o`<button class="btn small ghost" ?disabled=${this.busy} @click=${()=>this.undo(t)}
            aria-label=${`${this.t("syslog.undo")}: ${this.entryTitle(t)}`}><ha-icon icon="mdi:undo"></ha-icon>${this.t("syslog.undo")}</button>`:o`<span></span>`}
        </article>`)}
      </div>
      ${this.syslogMore?o`<div class="row"><button class="btn small" @click=${()=>this.loadSyslog(!0)}>${this.t("syslog.more")}</button></div>`:u}
    </section>`}};O.styles=[A,T`
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
    `],p([g({attribute:!1})],O.prototype,"snapshot",2),p([g({attribute:!1})],O.prototype,"plants",2),p([g({attribute:!1})],O.prototype,"families",2),p([g({attribute:!1})],O.prototype,"api",2),p([g({attribute:!1})],O.prototype,"t",2),p([g()],O.prototype,"lang",2),p([g({type:Boolean})],O.prototype,"admin",2),p([g()],O.prototype,"section",2),p([f()],O.prototype,"overview",2),p([f()],O.prototype,"filter",2),p([f()],O.prototype,"draftPhotos",2),p([f()],O.prototype,"busy",2),p([f()],O.prototype,"syslog",2),p([f()],O.prototype,"syslogMore",2),p([f()],O.prototype,"syslogSystem",2),p([f()],O.prototype,"quality",2),O=p([j("hl-journal-view")],O);var vi=[{id:"dashboard",icon:"mdi:home-variant-outline",mobile:!0},{id:"layout",icon:"mdi:floor-plan",mobile:!1},{id:"planner",icon:"mdi:sprout",mobile:!0},{id:"library",icon:"mdi:sprout-outline",mobile:!0},{id:"calendar",icon:"mdi:calendar-month-outline",mobile:!0},{id:"journal",icon:"mdi:notebook-outline",mobile:!1},{id:"advice",icon:"mdi:chat-question-outline",mobile:!0},{id:"handbook",icon:"mdi:book-open-page-variant-outline",mobile:!0},{id:"print",icon:"mdi:printer-outline",mobile:!1},{id:"settings",icon:"mdi:cog-outline",mobile:!1}],N=class extends E{constructor(){super(...arguments);this.narrow=!1;this.snapshot=null;this.plants=[];this.families={};this.tab="dashboard";this.toastMsg="";this.openTask=null;this.creatingTask=!1;this.error="";this.chapter="";this.plannerSeason=null;this.transitionRequest=0;this.t=gt("en");this.uiLang="en"}willUpdate(e){if(e.has("hass")&&this.hass){let t=Xe(this.snapshot?.lang??this.hass.locale?.language??this.hass.language);t!==this.uiLang&&(this.uiLang=t,this.t=gt(t)),this.toggleAttribute("dark",!!this.hass.themes?.darkMode),Ds(this.hass),this.api?this.api.setHass(this.hass):(this.api=new Ye(this.hass),this.connect())}if(e.has("route")&&this.route){let[t,s]=this.route.path.replace(/^\//,"").split("/");this.tab=vi.some(i=>i.id===t)?t:"dashboard",this.tab==="handbook"&&(this.chapter=s??"")}}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.unsubscribe=void 0,this.api=void 0}connectedCallback(){super.connectedCallback(),this.hass&&!this.api&&(this.api=new Ye(this.hass),this.connect())}async connect(){try{await this.loadPlants(),this.loadGlossary(),this.unsubscribe=await this.api.subscribe(e=>{this.snapshot=e;let t=Xe(e.lang);t!==this.uiLang&&(this.uiLang=t,this.t=gt(t),this.loadGlossary()),this.openTask&&(this.openTask=e.tasks.find(s=>s.id===this.openTask.id)??null)})}catch(e){this.error=e.code==="not_loaded"?this.t("common.not_loaded"):String(e.message??e)}}async loadGlossary(){try{qs((await this.api.handbookIndex(this.uiLang)).glossary),Bs(await this.api.supplies())}catch{}}openHandbook(e=""){this.chapter=e;let t=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/handbook${e?`/${e}`:""}`;history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab="handbook"}async loadPlants(){let e=await this.api.plants();this.plants=e.plants,this.families=e.families}navigate(e,t){t?.preventDefault();let s=`/${this.route?.prefix?.replace(/^\//,"")||"hortulus"}/${e==="dashboard"?"":e}`.replace(/\/$/,"");history.pushState(null,"",s),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})),this.tab=e}toast(e){this.toastMsg=e,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastMsg="",4500)}async completeTask(e){try{await this.api.taskAction(e.id,"complete"),this.toast(this.t("task.completed",{title:e.title}))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async irrigation(e){try{if(e==="stop"){await this.api.irrigationStop(),this.toast(this.t("dash.irrigation_stopped"));return}let t=await this.api.irrigationRun(),s=Object.values(t.reasons??{});this.toast(t.started?this.t("dash.irrigation_started",{min:Math.round(t.total_minutes)}):s[0]??this.t("dash.irrigation_nothing"))}catch(t){this.toast(this.t("common.error",{message:t.message}))}}async postponeTask(e,t){try{await this.api.taskAction(e.id,"postpone",{days:t}),this.toast(this.t("task.postponed",{title:e.title,n:t}))}catch(s){this.toast(this.t("common.error",{message:s.message}))}}renderTab(){let e=this.snapshot,t=this.hass.user?.is_admin??!0,s=new Map(this.plants.map(i=>[i.id,i]));switch(this.tab){case"layout":return o`<hl-planner-view mode="layout" .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} .narrow=${this.narrow} .initialSeason=${this.plannerSeason}
          .transitionRequest=${this.transitionRequest}></hl-planner-view>`;case"planner":return o`<hl-planner-view mode="plant" .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} .narrow=${this.narrow} .initialSeason=${this.plannerSeason}></hl-planner-view>`;case"library":return o`<hl-library-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t} @plants-changed=${()=>this.loadPlants()}></hl-library-view>`;case"calendar":return o`<hl-calendar-view .snapshot=${e} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .plants=${s} .families=${this.families}></hl-calendar-view>`;case"journal":return o`<hl-journal-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t}></hl-journal-view>`;case"advice":return o`<hl-advice-view .snapshot=${e} .plants=${this.plants} .families=${this.families} .api=${this.api} .t=${this.t}
          .lang=${this.uiLang} .admin=${t}></hl-advice-view>`;case"handbook":return o`<hl-handbook-view .api=${this.api} .t=${this.t} .lang=${this.uiLang} .chapterId=${this.chapter} .narrow=${this.narrow}></hl-handbook-view>`;case"print":return o`<hl-print-view .snapshot=${e} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .narrow=${this.narrow} .admin=${t}></hl-print-view>`;case"settings":return o`<hl-settings-view .snapshot=${e} .hass=${this.hass} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .admin=${t}></hl-settings-view>`;default:return o`<hl-dashboard-view .snapshot=${e} .plants=${s} .families=${this.families} .t=${this.t} .lang=${this.uiLang} .admin=${t}></hl-dashboard-view>`}}renderNav(e){return o`<nav class=${e} aria-label="Hortulus">
      ${vi.filter(t=>e!=="bottom-nav"||t.mobile).map(t=>o`<a href="#" aria-current=${t.id===this.tab?"page":"false"} @click=${s=>this.navigate(t.id,s)}>
        <ha-icon icon=${t.icon}></ha-icon>${this.t(`nav.${t.id}`)}</a>`)}
    </nav>`}render(){return o`
      <header class="appbar">
        ${this.narrow?o`<button class="icon-btn" aria-label="Menu" @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}>
          <ha-icon icon="mdi:menu"></ha-icon></button>`:u}
        <div class="brand">${qt(30)}<span>Hortulus</span>${this.narrow?u:o`<small>${this.t("app.tagline")}</small>`}</div>
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
        @new-task=${()=>this.creatingTask=!0}
        @navigate=${e=>this.navigate(e.detail)}
        @season-changed=${e=>this.plannerSeason=e.detail}
        @year-transition=${()=>{this.navigate("layout"),this.transitionRequest+=1}}
        @open-handbook=${e=>this.openHandbook(e.detail?.chapter??"")}
        @hl-toast=${e=>this.toast(e.detail.message)}>
        ${this.error?o`<div class="card error">${qt(56)}<p>${this.error}</p></div>`:this.snapshot?this.renderTab():o`<p class="empty">${this.t("common.loading")}</p>`}
      </main>
      ${this.renderNav("bottom-nav")}
      ${this.snapshot&&(this.openTask||this.creatingTask)?o`<hl-task-dialog .task=${this.openTask} .create=${this.creatingTask} .snapshot=${this.snapshot}
        @open-handbook=${e=>this.openHandbook(e.detail?.chapter??"")}
        .beds=${this.snapshot.beds} .api=${this.api} .t=${this.t} .lang=${this.uiLang} .today=${this.snapshot.analysis?.today??""}
        @hl-toast=${e=>this.toast(e.detail.message)}
        @closed=${()=>{this.openTask=null,this.creatingTask=!1}}></hl-task-dialog>`:u}
      ${this.toastMsg?o`<div class="toast" role="status" aria-live="polite">${this.toastMsg}</div>`:u}
    `}};N.styles=[Hs,A,T`
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
    `],p([g({attribute:!1})],N.prototype,"hass",2),p([g({type:Boolean,reflect:!0})],N.prototype,"narrow",2),p([g({attribute:!1})],N.prototype,"route",2),p([g({attribute:!1})],N.prototype,"panel",2),p([f()],N.prototype,"snapshot",2),p([f()],N.prototype,"plants",2),p([f()],N.prototype,"families",2),p([f()],N.prototype,"tab",2),p([f()],N.prototype,"toastMsg",2),p([f()],N.prototype,"openTask",2),p([f()],N.prototype,"creatingTask",2),p([f()],N.prototype,"error",2),p([f()],N.prototype,"chapter",2),p([f()],N.prototype,"plannerSeason",2),p([f()],N.prototype,"transitionRequest",2),N=p([j("hortulus-panel")],N);export{N as HortulusPanel};
