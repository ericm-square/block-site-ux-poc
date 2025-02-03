import{r as t,c as a,h as i,H as e,g as o}from"./p-c9795ae2.js";import{c as r}from"./p-52c3ceb3.js";import{g as s,s as n}from"./p-3c1e3098.js";import{g as d}from"./p-a7d431c5.js";import{c as l}from"./p-850c2440.js";import{c as m}from"./p-8ccc0928.js";const h=":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}@keyframes market-popup{from{opacity:0%;transform:scale(0.9, 0.9)}to{opacity:100%;transform:scale(1, 1)}}@keyframes market-popdown{from{opacity:100%;transform:scale(1, 1)}to{opacity:0%;transform:scale(0.9, 0.9)}}@keyframes market-slideup{from{opacity:0%;transform:translateY(80vh)}to{opacity:100%;transform:translateY(0)}}@keyframes market-slidedown{from{opacity:100%;transform:translateY(0)}to{opacity:0%;transform:translateY(80vh)}}@keyframes market-slide-left-enter{from{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes market-slide-left-exit{from{transform:translateX(0)}to{transform:translateX(100%)}}@keyframes market-fade-in{from{opacity:0%}to{opacity:100%}}@keyframes market-fade-out{from{opacity:100%}to{opacity:0%}}@keyframes market-input-autofill-start{from{}to{}}@keyframes market-input-autofill-cancel{from{}to{}}@keyframes market-input-search-compact-enter{from{}to{}}@keyframes market-input-search-compact-exit{from{}to{}}:host{display:flex;flex-direction:column;justify-content:stretch;overflow:hidden}:host ::slotted(main),:host ::slotted(.main){flex:0 1 100%;overflow-y:auto;height:100%}:host ::slotted(.market-header){margin-bottom:var(--core-metrics-spacing-300);padding-top:0}:host ::slotted(.market-footer){padding-bottom:0}:host{position:fixed;top:0;right:0;width:100%;max-width:var(--modal-blade-maximum-width-size);height:100vh;padding-top:var(--modal-blade-regular-vertical-size-class-vertical-padding);padding-bottom:var(--modal-blade-regular-vertical-size-class-vertical-padding);background-color:var(--modal-blade-background-color);box-shadow:var(--elevation-20-shadow);animation-name:market-slide-left-enter;animation-duration:var(\n      --blade-animation-enter-transition-duration,\n      var(--core-animation-enter-transition-moderate-speed-duration)\n    );animation-timing-function:var(\n      --blade-animation-enter-transition-easing,\n      var(--core-animation-enter-transition-easing)\n    );animation-fill-mode:forwards}:host ::slotted(*){padding-right:var(--modal-blade-regular-horizontal-size-class-horizontal-padding);padding-left:var(--modal-blade-regular-horizontal-size-class-horizontal-padding)}:host([hidden]){animation-name:market-slide-left-exit;animation-duration:var(\n        --blade-animation-exit-transition-duration,\n        var(--core-animation-exit-transition-moderate-speed-duration)\n      );animation-timing-function:var(\n        --blade-animation-exit-transition-easing,\n        var(--core-animation-exit-transition-easing)\n      )}:host([hidden].skip-animation){transform:translateX(100%);animation:none}@media only screen and (min-width: 1200px){:host{max-width:var(--modal-blade-wide-viewport-width-size);padding-top:var(--modal-blade-wide-viewport-padding-top-size);padding-bottom:var(--modal-blade-wide-viewport-padding-bottom-size)}::slotted(*){padding-right:var(--modal-blade-wide-viewport-padding-right-size);padding-left:var(--modal-blade-wide-viewport-padding-left-size)}}";const c=h;const p=class{constructor(i){t(this,i);this.marketDialogLoaded=a(this,"marketDialogLoaded",7);this.marketDialogDismissed=a(this,"marketDialogDismissed",7);this.marketDialogDidDismiss=a(this,"marketDialogDidDismiss",7);this.type="blade";this.skipAnimation=false;this.hidden=false;this.dialogID=undefined;this.index=undefined;this.animationDuration=r.CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION;this.animationEnterDuration=r.CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION;this.animationExitDuration=r.CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION;this.trapFocus=false}reenableAnimation(){this.skipAnimation=false}headerNavigateEventHandler(t){const{detail:a,target:i}=t;if(a.action==="close"){if(i.closest(s())===this.el){this.dismiss()}}}dismiss(t){const{defaultPrevented:a}=this.marketDialogDismissed.emit({dialog:this.el,type:this.type,origin:(t===null||t===void 0?void 0:t.origin)||this.el});if(!a){this.hidden=true;setTimeout((()=>{this.marketDialogDidDismiss.emit({dialog:this.el,type:this.type,origin:this.el})}),this.animationExitDuration)}return Promise.resolve()}onTrapFocusChanged(t,a){if(t!==a){if(t){this.activateFocusTrap()}else{this.deactivateFocusTrap()}}}activateFocusTrap(t,a){if(this.focusTrap){this.focusTrap.activate(a!==null&&a!==void 0?a:{});if(!this.trapFocus){this.trapFocus=true}}else{this.focusTrap=l({activateOptions:a,el:this.el,options:t})}return Promise.resolve()}deactivateFocusTrap(t){if(this.focusTrap){this.focusTrap.deactivate(Object.assign({returnFocus:true,checkCanReturnFocus:t=>new Promise((a=>{if(typeof(t===null||t===void 0?void 0:t.setFocus)==="function"){t.setFocus()}else{a()}}))},t));this.focusTrap=undefined}return Promise.resolve()}connectedCallback(){setTimeout((()=>{this.marketDialogLoaded.emit({dialog:this.el,type:this.type});if(this.trapFocus){this.activateFocusTrap()}}),this.animationEnterDuration)}componentWillLoad(){const t=this.el.querySelector(d("market-header"));if(t){t.showNavigation=true}if(this.hidden){this.skipAnimation=true}n(this.el)}disconnectedCallback(){this.deactivateFocusTrap()}render(){return i(e,{key:"06712e57a83ac4e3a59ad347b7dd3ee64345849e",role:"dialog",class:m("market-blade",{"skip-animation":this.skipAnimation})},i("slot",{key:"99deb622ccd2263d07aedda7146998984498b3e6"}))}get el(){return o(this)}static get watchers(){return{hidden:["reenableAnimation"],trapFocus:["onTrapFocusChanged"]}}};p.style=c;export{p as market_blade};
//# sourceMappingURL=p-e9d9892f.entry.js.map