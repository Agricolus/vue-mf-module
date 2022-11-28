(function(a,c){typeof exports=="object"&&typeof module<"u"?c(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],c):(a=typeof globalThis<"u"?globalThis:a||self,c(a.VueMfModule={},a.Vue))})(this,function(a,c){"use strict";var B=Object.defineProperty;var F=(a,c,h)=>c in a?B(a,c,{enumerable:!0,configurable:!0,writable:!0,value:h}):a[c]=h;var o=(a,c,h)=>(F(a,typeof c!="symbol"?c+"":c,h),h);var h={exports:{}};function S(){}S.prototype={on:function(n,e,t){var i=this.e||(this.e={});return(i[n]||(i[n]=[])).push({fn:e,ctx:t}),this},once:function(n,e,t){var i=this;function r(){i.off(n,r),e.apply(t,arguments)}return r._=e,this.on(n,r,t)},emit:function(n){var e=[].slice.call(arguments,1),t=((this.e||(this.e={}))[n]||[]).slice(),i=0,r=t.length;for(i;i<r;i++)t[i].fn.apply(t[i].ctx,e);return this},off:function(n,e){var t=this.e||(this.e={}),i=t[n],r=[];if(i&&e)for(var s=0,l=i.length;s<l;s++)i[s].fn!==e&&i[s].fn._!==e&&r.push(i[s]);return r.length?t[n]=r:delete t[n],this}},h.exports=S;var x=h.exports.TinyEmitter=S,T=(n=>(n[n.drawer=0]="drawer",n[n.bottom=1]="bottom",n[n.header=2]="header",n))(T||{});const D={menuDefinitionAdded:"newmenuitem"},I=class{constructor(){o(this,"menuDefinitions",[]);o(this,"menuStructure",{});o(this,"notifications",new x)}get Notifications(){return this.notifications}static get Instance(){return I.instance}addMenuDefinition(e,...t){let i=this.menuDefinitions.find(r=>r.name==e.name);i?e=i:this.menuDefinitions.push(e);for(const r of t)this.menuStructure[r.section]=this.menuStructure[r.section]||{},this.menuStructure[r.section][r.parent||e.name]=this.menuStructure[r.section][r.parent||e.name]||[],r.parent&&this.menuStructure[r.section][r.parent].push(e.name);this.notifications.emit(D.menuDefinitionAdded,e)}getMenuItem(e){return this.menuDefinitions.find(t=>t.name==e)}getMenu(e){let t=[],i=new Set;for(const r in this.menuStructure[e]){const s=this.menuStructure[e][r];let l={item:this.menuDefinitions.find(u=>u.name==r&&(!u.hidden||!u.hidden())),children:s.map(u=>this.menuDefinitions.find(d=>d.name==u&&(!d.hidden||!d.hidden()))).filter(u=>!!u).sort((u,d)=>u&&d&&u.orderIndex&&d.orderIndex&&u.orderIndex>d.orderIndex?1:u&&d&&u.orderIndex&&d.orderIndex&&u.orderIndex<d.orderIndex?-1:0)};l.item&&(i.add(r),s.forEach(u=>i.add(u)),t.push(l))}return t.filter(r=>!!r.item).sort((r,s)=>r&&s&&r.item&&s.item&&r.item.orderIndex&&s.item.orderIndex&&r.item.orderIndex>s.item.orderIndex?1:r&&s&&r.item&&s.item&&r.item.orderIndex&&s.item.orderIndex&&r.item.orderIndex<s.item.orderIndex?-1:0)}};let v=I;o(v,"instance",new I);const C=class{constructor(){o(this,"registry",new Map);o(this,"groupedregistry",new Map);o(this,"serviceregistry",new Map);o(this,"groupedserviceregistry",new Map)}static get Instance(){return this.instance}static set Instance(e){this.instance=e}provideComponent(e,t,i){if(this.registry.set(i?`${i}-${t}`:t,e),i){this.groupedregistry.has(i)||this.groupedregistry.set(i,new Map);let r=this.groupedregistry.get(i);r&&r.set(t,e)}}getComponent(e,t){return this.registry.get(t?`${t}-${e}`:e)||null}getComponents(...e){return Array.from(this.registry.entries()).filter(t=>e.indexOf(t[0])>=0).map(t=>t[1])}getGroupComponents(e,...t){let i=this.groupedregistry.get(e);return i?Array.from(i.entries()||[]).filter(r=>!t||t.length==0||t.indexOf(r[0])>=0).map(r=>r[1]):[]}getGroupComponentsKeys(e){let t=this.groupedregistry.get(e);return t?Array.from(t.keys()):[]}provideService(e,t,i){if(this.serviceregistry.set(e,t),i){this.groupedserviceregistry.has(i)||this.groupedserviceregistry.set(i,new Map);let r=this.groupedserviceregistry.get(i);r&&r.set(e,t)}}getService(e){return this.serviceregistry.get(e)||null}getGroupServices(e,...t){let i=this.groupedserviceregistry.get(e);return i?Array.from(i.entries()||[]).filter(r=>!t||t.length==0||t.indexOf(r[0])>=0).map(r=>r[1]):[]}};let f=C;o(f,"instance",new C);const j=class{constructor(){o(this,"notifier",new x)}static get Instance(){return j.instance}static set Instance(e){this.instance=e}send(e,...t){this.notifier.emit(e,...t)}subscribe(e,t,i){this.notifier.on(e,t,i)}once(e,t,i){this.notifier.once(e,t,i)}unsubscribe(e,t){this.notifier.off(e,t)}ask(e,...t){return new Promise((i,r)=>{this.notifier.emit(`$ask-${e}`,{resolve:i,reject:r,args:t})})}reply(e,t){this.notifier.on(`$ask-${e}`,i=>{try{let r=t(...i.args);i.resolve(r)}catch{i.reject()}})}};let m=j;o(m,"instance",new j);const b=c.defineComponent({props:{id:{default:null},type:{default:null,type:String},value:{default:null},name:{type:String,default:null},names:{type:Array,default:null},group:{type:String,default:null},metadata:{type:Object,default:null},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1}},template:'<div><component :is="c"  v-for="(c, idx) in Components" :disabled="disabled" :readonly="readonly" :key="idx" :id="id" :type="type" :metadata="metadata" v-model="Value" @click="click" @save="save" /></div>',setup(n){const e=defineEmits(["input","click","save"]),t=c.computed({get:()=>n.value,set:l=>{e("input",l)}}),i=c.computed(()=>n.name?[f.Instance.getComponent(n.name,n.group)]:n.group?f.Instance.getGroupComponents(n.group,...n.names||[]):f.Instance.getComponents(...n.names||[])),r=(...l)=>{e("click",...l)},s=(...l)=>{e("save",...l)};return{id:n.id,type:n.type,value:n.value,name:n.name,names:n.names,group:n.group,metadata:n.metadata,disabled:n.disabled,readonly:n.readonly,click:r,save:s,Components:i,Value:t}}}),w=class{constructor(){o(this,"screens",new Map);o(this,"projecting",new Map)}static get Instance(){return w.instance}static set Instance(e){this.instance=e}setScreen(e,t="defaultscreen"){this.screens.set(t,e)}projectTo(e,t=null,i="defaultscreen",r=!0,s=!1){var l={data:t};let u=s?new Promise((L,z)=>{l.reject=z,l.resolve=L}):null;r?(this.projecting.has(i)||this.projecting.set(i,[]),(this.projecting.get(i)||[]).push({component:e,model:l,promise:u,queue:r})):this.projecting.set(i,[{component:e,model:l,promise:u,queue:r}]);let d=this.screens.get(i);return d?(d.screenModel.value=l,d.currentView.value=e,u&&u.then(()=>this.stopProjecting(i)).catch(()=>this.stopProjecting(i)),u):null}projectAsyncTo(e,t,i="defaultscreen",r=!0){return this.projectTo(e,t,i,r,!0)}stopProjecting(e="defaultscreen"){this.projecting.has(e)&&(this.projecting.get(e)||[]).pop();let t=this.screens.get(e);if(t&&t.currentView.value){if(t.currentView.value=null,t.screenModel.value=null,this.projecting.has(e)){let i=this.projecting.get(e);if(i&&i.length){let r=i.pop();r&&this.projectTo(r.component,r.model,e,r.queue,!!r.promise)}}return!0}return!1}};let p=w;o(p,"instance",new w);const k=c.defineComponent({props:{name:{type:String,default:"defaultscreen"}},template:'<div v-show="isVisible"><component v-if="currentView" v-bind:is="currentView" :value="screenModel" :key="screenModel"></component></div>',setup(n,{expose:e}){const t=c.getCurrentInstance(),i=c.ref(null),r=c.ref(null);e({currentView:i,screenModel:r});const s=c.computed(()=>i.value!=null);return c.onMounted(()=>{p.Instance.setScreen(t,n.name)}),{currentView:i,screenModel:r,isVisible:s}}}),V={projectToDirective:{inserted:(n,e)=>{g.Instance.injectTo(n,e.arg)},unbind:(n,e)=>{g.Instance.removeFrom(n,e.arg)}},screenDirective:{bind:(n,e)=>{!n||g.Instance.setScreen(n,e.arg)}}},M=class{constructor(){o(this,"screens",new Map)}static get Instance(){return M.instance}static set Instance(e){this.instance=e}injectTo(e,t){if(!(!e||!t)){var i=this.screens.has(t)?this.screens.get(t):null;try{e.parentElement&&e.removeChild(e)}catch{}i&&i.append(e)}}removeFrom(e,t){if(!(!e||!t)){var i=this.screens.has(t)?this.screens.get(t):null;try{i&&i.removeChild(e)}catch{}}}setScreen(e,t="defaultscreen"){this.screens.set(t,e)}};let g=M;o(g,"instance",new M);function y(n,e){if(n.target.validity){let t=n.target;if(t.validity){let i=[t.validity.badInput?"bad input":null,t.validity.customError?"custom error":null,t.validity.patternMismatch?"pattern mismatch":null,t.validity.rangeOverflow?"range overflow":null,t.validity.rangeUnderflow?"range underflow":null,t.validity.stepMismatch?"step mismatch":null,t.validity.tooLong?"too long":null,t.validity.tooShort?"too short":null,t.validity.typeMismatch?"type mismatch":null,t.validity.valueMissing?"value missing":null].filter(r=>!!r);e(i,t.validity.valid!=null?t.validity.valid:!0)}}}const A={inserted:(n,e)=>{if(!(!n||!n.willValidate)){switch(n.nodeName){case"INPUT":case"TEXTAREA":n.onblur=t=>y(t,e.value);break;case"SELECT":n.onchange=t=>y(t,e.value);break}n.oninvalid=t=>y(t,e.value),n.form&&n.form.addEventListener("invalid",()=>y({target:n},e.value)),e.arg=="immediate"?n.reportValidity():y({target:n},e.value)}},unbind:n=>{}};function E(n){n.component("screen",k),n.component("inject",b),n.directive("screen",V.screenDirective),n.directive("projectTo",V.projectToDirective),n.directive("validate",A)}const $={install:E};function O(n){let e={};return{init(t,i,r,s){return s.registry&&(f.Instance=s.registry),s.messageService&&(m.Instance=s.messageService),s.projector&&(p.Instance=s.projector),s.screens&&(g.Instance=s.screens),e=r,n.init(t,i,r)},config(t,i){return n.config?n.config(t,i,e):null},run(t,i){return n.run?n.run(t,i,e):null},routes:n.routes}}function P(n,e,t){const i=n.default.default||n.default;return i.init(v.Instance,e,t||{},{registry:f.Instance,messageService:m.Instance,projector:p.Instance,screens:g.Instance}).then(()=>i)}function G(n,e){return(n.default.default||n.default).config(v.Instance,e)}function N(n,e){return(n.default.default||n.default).run(v.Instance,e)}function R(n){return(n.default.default||n.default).routes}a.CommonRegistry=f,a.ConfigModule=G,a.InitModule=P,a.Inject=b,a.MenuHelper=v,a.MessageService=m,a.ModuleInitializer=O,a.ModuleRoutes=R,a.RunModule=N,a.Screen=k,a.ValidateDirective=A,a.default=$,a.menuType=T,Object.defineProperties(a,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
