(()=>{var e={};e.id=2192,e.ids=[2192],e.modules={1429:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,66959,23)),Promise.resolve().then(r.t.bind(r,33875,23)),Promise.resolve().then(r.t.bind(r,88903,23)),Promise.resolve().then(r.t.bind(r,57174,23)),Promise.resolve().then(r.t.bind(r,84178,23)),Promise.resolve().then(r.t.bind(r,87190,23)),Promise.resolve().then(r.t.bind(r,48429,23)),Promise.resolve().then(r.t.bind(r,61365,23))},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},7348:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>s.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d});var o=r(70260),a=r(28203),i=r(25155),s=r.n(i),n=r(67292),l={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d={children:["",{children:["auth",{children:["forgotPassword",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,46361)),"G:\\lastminutedeal\\lmdfrontend\\src\\app\\auth\\forgotPassword\\page.jsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,62804)),"G:\\lastminutedeal\\lmdfrontend\\src\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,c=["G:\\lastminutedeal\\lmdfrontend\\src\\app\\auth\\forgotPassword\\page.jsx"],u={require:r,loadChunk:()=>Promise.resolve()},p=new o.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/auth/forgotPassword/page",pathname:"/auth/forgotPassword",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},13849:(e,t,r)=>{"use strict";r.d(t,{Ay:()=>f,CG:()=>n,NS:()=>p,RO:()=>l,bE:()=>a,dt:()=>i,n:()=>c,n2:()=>u,o7:()=>s,sX:()=>d});let o=(0,r(2231).Z0)({name:"cart",initialState:{items:[],totalQuantity:0,totalAmount:0,isOpen:!1},reducers:{addToCart:(e,t)=>{let r=t.payload,o=e.items.find(e=>e.id===r.id);o?(o.quantity+=1,o.totalPrice=o.quantity*o.price):e.items.push({...r,quantity:1,totalPrice:r.price}),e.totalQuantity+=1,e.totalAmount=e.items.reduce((e,t)=>e+t.totalPrice,0)},removeFromCart:(e,t)=>{let r=t.payload,o=e.items.find(e=>e.id===r);o&&(e.totalQuantity-=o.quantity,e.totalAmount-=o.totalPrice,e.items=e.items.filter(e=>e.id!==r))},increaseQuantity:(e,t)=>{let r=t.payload,o=e.items.find(e=>e.id===r);o&&(o.quantity+=1,o.totalPrice=o.quantity*o.price,e.totalQuantity+=1,e.totalAmount=e.items.reduce((e,t)=>e+t.totalPrice,0))},decreaseQuantity:(e,t)=>{let r=t.payload,o=e.items.find(e=>e.id===r);o&&(1===o.quantity?e.items=e.items.filter(e=>e.id!==r):(o.quantity-=1,o.totalPrice=o.quantity*o.price),e.totalQuantity-=1,e.totalAmount=e.items.reduce((e,t)=>e+t.totalPrice,0))},updateQuantity:(e,t)=>{let{id:r,quantity:o}=t.payload,a=e.items.find(e=>e.id===r);if(a&&o>0){let t=a.quantity;a.quantity=o,a.totalPrice=a.quantity*a.price,e.totalQuantity+=o-t,e.totalAmount=e.items.reduce((e,t)=>e+t.totalPrice,0)}else a&&o<=0&&(e.items=e.items.filter(e=>e.id!==r),e.totalQuantity-=a.quantity,e.totalAmount=e.items.reduce((e,t)=>e+t.totalPrice,0))},clearCart:e=>{e.items=[],e.totalQuantity=0,e.totalAmount=0},toggleCart:e=>{e.isOpen=!e.isOpen},openCart:e=>{e.isOpen=!0},closeCart:e=>{e.isOpen=!1},loadCart:(e,t)=>{let r=t.payload;r&&(e.items=r.items||[],e.totalQuantity=r.totalQuantity||0,e.totalAmount=r.totalAmount||0)}}}),{addToCart:a,removeFromCart:i,increaseQuantity:s,decreaseQuantity:n,updateQuantity:l,clearCart:d,toggleCart:c,openCart:u,closeCart:p,loadCart:m}=o.actions,f=o.reducer},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},22403:(e,t,r)=>{"use strict";r.d(t,{Ay:()=>X});var o,a=r(58009);let i={data:""},s=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||i,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let r="",o="",a="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":o+="f"==i[1]?c(s,i):i+"{"+c(s,"k"==i[1]?"":t)+"}":"object"==typeof s?o+=c(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,s):i+":"+s+";")}return r+(t&&a?t+"{"+a+"}":a)+o},u={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},m=(e,t,r,o,a)=>{let i=p(e),s=u[i]||(u[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!u[s]){let t=i!==e?e:(e=>{let t,r,o=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?o.shift():t[3]?(r=t[3].replace(d," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(d," ").trim();return o[0]})(e);u[s]=c(a?{["@keyframes "+s]:t}:t,r?"":"."+s)}let m=r&&u.g?u.g:null;return r&&(u.g=u[s]),((e,t,r,o)=>{o?t.data=t.data.replace(o,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(u[s],t,o,m),s},f=(e,t,r)=>e.reduce((e,o,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+o+(null==i?"":i)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return m(r.unshift?r.raw?f(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,s(t.target),t.g,t.o,t.k)}h.bind({g:1});let g,y,b,x=h.bind({k:1});function v(e,t){let r=this||{};return function(){let o=arguments;function a(i,s){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:y&&y()},n),r.o=/ *go\d+/.test(l),n.className=h.apply(r,o)+(l?" "+l:""),t&&(n.ref=s);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),g(d,n)}return t?t(a):a}}var w=e=>"function"==typeof e,P=(e,t)=>w(e)?e(t):e,A=(()=>{let e=0;return()=>(++e).toString()})(),S=(()=>{let e;return()=>e})(),k=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return k(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},C=[],N={toasts:[],pausedAt:void 0},q=e=>{N=k(N,e),C.forEach(e=>{e(N)})},L={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=(e={})=>{let[t,r]=j(N),o=Q(N);H(()=>(o.current!==N&&r(N),C.push(r),()=>{let e=C.indexOf(r);e>-1&&C.splice(e,1)}),[]);let a=t.toasts.map(t=>{var r,o,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(o=e[t.type])?void 0:o.duration)||(null==e?void 0:e.duration)||L[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...t,toasts:a}},O=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||A()}),E=e=>(t,r)=>{let o=O(t,e,r);return q({type:2,toast:o}),o.id},_=(e,t)=>E("blank")(e,t);_.error=E("error"),_.success=E("success"),_.loading=E("loading"),_.custom=E("custom"),_.dismiss=e=>{q({type:3,toastId:e})},_.remove=e=>q({type:4,toastId:e}),_.promise=(e,t,r)=>{let o=_.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?P(t.success,e):void 0;return a?_.success(a,{id:o,...r,...null==r?void 0:r.success}):_.dismiss(o),e}).catch(e=>{let a=t.error?P(t.error,e):void 0;a?_.error(a,{id:o,...r,...null==r?void 0:r.error}):_.dismiss(o)}),e};var $=(e,t)=>{q({type:1,toast:{id:e,height:t}})},G=()=>{q({type:5,time:Date.now()})},I=new Map,T=1e3,z=(e,t=T)=>{if(I.has(e))return;let r=setTimeout(()=>{I.delete(e),q({type:4,toastId:e})},t);I.set(e,r)},F=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=x`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=x`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,U=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${M} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,x`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),Z=(v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${U} 1s linear infinite;
`,x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),B=x`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,K=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,v("div")`
  position: absolute;
`,v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,x`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`);v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,o=a.createElement,c.p=void 0,g=o,y=void 0,b=void 0,h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var X=_},24288:(e,t,r)=>{"use strict";r.d(t,{ug:()=>o,wD:()=>a});let o=e=>{},a=()=>null},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},36326:(e,t,r)=>{"use strict";r.d(t,{Ay:()=>d,Qq:()=>s,U0:()=>i,gB:()=>a});let o=(0,r(2231).Z0)({name:"location",initialState:{location:null,loading:!1,error:null,isLocationSet:!1},reducers:{setLocationStart:e=>{e.loading=!0,e.error=null},setAutoLocationSuccess:(e,t)=>{e.location=t.payload,e.loading=!1,e.error=null,e.isLocationSet=!0},setLocationFailure:(e,t)=>{e.loading=!1,e.error=t.payload,e.isLocationSet=!1},setManualLocation:(e,t)=>{e.location=t.payload,e.loading=!1,e.error=null,e.isLocationSet=!0},clearLocation:e=>{e.location=null,e.loading=!1,e.error=null,e.isLocationSet=!1}}}),{setLocationStart:a,setAutoLocationSuccess:i,setLocationFailure:s,setManualLocation:n,clearLocation:l}=o.actions,d=o.reducer},42286:(e,t,r)=>{"use strict";r.d(t,{$c:()=>a,Ay:()=>m,gT:()=>i,zk:()=>u});let o=(0,r(2231).Z0)({name:"user",initialState:{user:null,phone:null,password:null,loading:!1,profilePic:null,error:null},reducers:{signUpStart:e=>{e.loading=!0,e.error=null},signUpSuccess:(e,t)=>{e.loading=!1,e.user=t.payload.user||null,e.phone=t.payload.phone,e.password=t.payload.password},signUpFailure:(e,t)=>{e.loading=!1,e.error=t.payload},loginStart:e=>{e.loading=!0,e.error=null},loginSuccess:(e,t)=>{e.loading=!1,e.user=t.payload},loginFailure:(e,t)=>{e.loading=!1,e.error=t.payload},setUser:(e,t)=>{e.user=t.payload,e.loading=!1,e.error=null},updateProfilePic:(e,t)=>{e.profilePic=t.payload,e.user&&(e.user.profilePic=t.payload)},logout:e=>{e.user=null,e.loading=!1,e.error=null}}}),{signUpStart:a,signUpSuccess:i,signUpFailure:s,loginStart:n,loginSuccess:l,loginFailure:d,setUser:c,updateProfilePic:u,logout:p}=o.actions,m=o.reducer},46361:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});let o=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"G:\\\\lastminutedeal\\\\lmdfrontend\\\\src\\\\app\\\\auth\\\\forgotPassword\\\\page.jsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"G:\\lastminutedeal\\lmdfrontend\\src\\app\\auth\\forgotPassword\\page.jsx","default")},56131:(e,t,r)=>{Promise.resolve().then(r.bind(r,77103))},59573:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,13219,23)),Promise.resolve().then(r.t.bind(r,34863,23)),Promise.resolve().then(r.t.bind(r,25155,23)),Promise.resolve().then(r.t.bind(r,40802,23)),Promise.resolve().then(r.t.bind(r,9350,23)),Promise.resolve().then(r.t.bind(r,48530,23)),Promise.resolve().then(r.t.bind(r,81601,23)),Promise.resolve().then(r.t.bind(r,88921,23))},61135:()=>{},62804:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s,metadata:()=>i});var o=r(62740);r(61135);var a=r(99294);let i={title:"LMD - Last Minute Deals",description:"Your one-stop destination for last-minute deals on everything you need",keywords:"deals, discounts, shopping, e-commerce, last minute"};function s({children:e}){return(0,o.jsx)("html",{lang:"en",children:(0,o.jsx)("body",{className:"antialiased",children:(0,o.jsx)(a.default,{children:e})})})}},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},64944:(e,t,r)=>{Promise.resolve().then(r.bind(r,46361))},68784:(e,t,r)=>{Promise.resolve().then(r.bind(r,99294))},70440:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var o=r(88077);let a=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,o.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},74672:(e,t,r)=>{Promise.resolve().then(r.bind(r,83373))},77103:(e,t,r)=>{"use strict";r.d(t,{default:()=>v});var o=r(45512),a=r(90993),i=r(58009),s=r(92273),n=r(2231);let l=(0,n.Z0)({name:"categories",initialState:{categories:[],categoryProducts:[],isLoading:!1,error:null},reducers:{setCategories:(e,t)=>{e.categories=t.payload,e.isLoading=!1,e.error=null},setCategoryProducts:(e,t)=>{e.categoryProducts=t.payload,e.isLoading=!1,e.error=null},setLoading:(e,t)=>{e.isLoading=t.payload},setError:(e,t)=>{e.error=t.payload,e.isLoading=!1}}}),{setCategories:d,setCategoryProducts:c,setLoading:u,setError:p}=l.actions,m=l.reducer;var f=r(13849),h=r(42286),g=r(86694),y=r(36326);let b=()=>(0,n.U1)({reducer:{categories:m,cart:f.Ay,user:h.Ay,modalLocation:g.A,location:y.Ay}});function x({children:e}){let t=(0,i.useRef)();return t.current||(t.current=b()),(0,o.jsx)(s.Kq,{store:t.current,children:e})}function v({children:e}){return(0,o.jsx)(a.SessionProvider,{children:(0,o.jsx)(x,{children:e})})}r(24288)},79551:e=>{"use strict";e.exports=require("url")},83373:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var o=r(45512),a=r(58009),i=r(79334),s=r(45103),n=r(28531),l=r.n(n),d=r(22403);function c(){let[e,t]=(0,a.useState)(""),[r,n]=(0,a.useState)(""),[c,u]=(0,a.useState)(!1),[p,m]=(0,a.useState)(""),f=(0,i.useRouter)(),h=async t=>{t.preventDefault(),u(!0),m("");try{if(!e&&!r)throw Error("Please provide either email or phone number");if(r){let e=r.replace(/\D/g,"");if(10!==e.length)throw Error("Invalid phone number format. Please enter a 10-digit number.")}if(e&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))throw Error("Please enter a valid email address");let t={};e&&(t.email=e),r&&(t.phone=r.replace(/\D/g,""));let o=await fetch("http://localhost:4000/lmd/api/v1/auth/customer/forgot-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),a=await o.json();if(!o.ok)throw Error(a.message||"Failed to send OTP");localStorage.setItem("reset-userId",a.data.userId),localStorage.setItem("reset-email",e),localStorage.setItem("reset-phone",r),d.Ay.success("OTP sent successfully! Check your email and/or phone."),f.push("/auth/verification?flow=password-reset")}catch(e){d.Ay.error(e.message)}finally{u(!1)}};return(0,o.jsxs)("div",{className:"flex min-h-screen bg-white",children:[(0,o.jsx)("div",{className:"w-1/2",children:(0,o.jsxs)("div",{className:"flex flex-col justify-center items-start max-w-[418px] mx-auto h-screen",children:[(0,o.jsx)(s.default,{src:"/auth-asset/logo.png",alt:"Logo",width:86,height:65,className:"mb-[32px]"}),(0,o.jsx)("h1",{className:"text-black text-[32px] font-medium height-[52px] width-[257px]",children:"Forgot password"}),(0,o.jsx)("p",{className:"text-[#828282] text-[20px] font-normal leading-[24px] tracking-[0.15px] mt-[32px]",children:"Enter your email or phone number to receive a verification code."}),(0,o.jsxs)("form",{onSubmit:h,className:"w-full max-w-md mt-[32px]",children:[(0,o.jsxs)("div",{className:"mb-6",children:[(0,o.jsx)("label",{className:"block text-sm font-medium text-black mb-2",children:"Email Address (Optional)"}),(0,o.jsx)("input",{type:"email",value:e,onChange:e=>t(e.target.value),placeholder:"Enter your email address",className:"w-full p-3 border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"})]}),(0,o.jsxs)("div",{className:"mb-6",children:[(0,o.jsx)("label",{className:"block text-sm font-medium text-black mb-2",children:"Phone Number (Optional)"}),(0,o.jsx)("input",{type:"tel",value:r,onChange:e=>n(e.target.value),placeholder:"Enter your phone number",className:"w-full p-3 border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"})]}),(0,o.jsx)("button",{type:"submit",disabled:c,className:`w-full py-3 bg-yellow-400 font-semibold rounded-lg transition-colors
              ${c?"opacity-75 cursor-not-allowed":"hover:bg-yellow-500"}`,children:c?"Sending OTP...":"SEND OTP"})]}),(0,o.jsx)("div",{className:"mt-6 text-center w-full",children:(0,o.jsx)(l(),{href:"/auth/login",className:"hover:underline font-medium",children:"← Back to Login"})})]})}),(0,o.jsx)("div",{className:"hidden md:block w-1/2 shrink-0 rounded-l-[40px] relative",children:(0,o.jsx)(s.default,{src:"/auth-asset/hero-bg.png",alt:"Decorative background",fill:!0,priority:!0,className:"rounded-l-[40px] object-cover"})})]})}},86694:(e,t,r)=>{"use strict";r.d(t,{A:()=>i,O:()=>a});let o=(0,r(2231).Z0)({name:"modalLocation",initialState:{location:""},reducers:{setLocation:(e,t)=>{e.location=t.payload}}}),{setLocation:a}=o.actions,i=o.reducer},99294:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});let o=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"G:\\\\lastminutedeal\\\\lmdfrontend\\\\src\\\\app\\\\providers.jsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"G:\\lastminutedeal\\lmdfrontend\\src\\app\\providers.jsx","default")}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[5994,7065,8077,5684,7519],()=>r(7348));module.exports=o})();