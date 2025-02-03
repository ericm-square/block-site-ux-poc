import{r as t,c as a,h as o,H as r,g as s}from"./p-c9795ae2.js";import{g as i}from"./p-a7d431c5.js";const n=':host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:flex;flex-direction:column;align-items:flex-start;overflow:hidden;width:100%;max-width:var(--toast-maximum-width);border-radius:var(--toast-radius);box-shadow:var(--elevation-30-shadow);font-weight:var(--toast-text-weight);font-size:var(--toast-text-size);line-height:var(--toast-text-leading);letter-spacing:var(--toast-text-tracking);text-transform:var(--toast-text-case)}.icon-container,.dismiss-container{display:flex;flex-shrink:0;align-items:center}.dismiss-container button{display:flex;justify-content:center;align-items:center;margin:0;padding:0;border:none;background-color:transparent;color:inherit;cursor:pointer;transition:opacity 0.2s;-webkit-appearance:none;-moz-appearance:none;appearance:none}.content{display:flex;align-items:flex-start;width:100%;padding:var(--toast-vertical-padding-size) var(--toast-horizontal-padding-size);-moz-column-gap:var(--toast-icon-spacing);column-gap:var(--toast-icon-spacing)}.main{display:flex;flex-grow:1;flex-wrap:wrap;row-gap:var(--toast-text-multiline-spacing);-moz-column-gap:var(--toast-content-spacing);column-gap:var(--toast-content-spacing)}section{flex-grow:1}nav{display:flex;flex-wrap:wrap;justify-content:flex-end}nav.hidden{display:none}::slotted(button),::slotted(a){margin:0;padding:0;border:none;background-color:transparent;color:inherit;font-weight:var(--toast-button-text-weight);font-size:var(--toast-button-text-size);font-family:inherit;line-height:var(--toast-button-text-leading);letter-spacing:var(--toast-button-text-tracking);text-decoration:none;text-transform:var(--toast-button-text-case);cursor:pointer;transition:opacity 0.2s}::slotted(button:hover),::slotted(a:hover){opacity:var(--text-link-hover-state-opacity)}::slotted(button:active),::slotted(a:active){opacity:var(--text-link-pressed-state-opacity)}::slotted([slot="action"]){display:flex;justify-content:center;align-items:center}::slotted([slot="action"]:not(:last-child)){margin-right:calc(var(--toast-button-spacing) * 2 + var(--toast-separator-width))}::slotted([slot="action"]:not(:last-child))::after{content:"";display:inline-block;width:var(--toast-separator-width);height:var(--toast-separator-height);margin-right:calc(-1 * var(--toast-button-spacing) - var(--toast-separator-width));margin-left:var(--toast-button-spacing);opacity:var(--toast-separator-opacity);pointer-events:none}progress-bar{height:var(--toast-progress-bar-height)}:host([variant="info"]){background-color:var(--toast-info-variant-background-color);color:var(--toast-info-variant-text-color)}:host([variant="info"]) .icon-container{color:var(--toast-info-variant-icon-color)}:host([variant="info"]) .dismiss-container{color:var(--toast-info-variant-dismiss-button-color)}:host([variant="info"]) progress-bar{background-color:var(--toast-info-variant-progress-bar-color)}:host([variant="info"]) ::slotted(a){color:var(--toast-info-variant-text-link-text-color)}:host([variant="info"]) ::slotted(button){color:var(--toast-info-variant-button-text-color)}:host([variant="info"]) ::slotted([slot="action"]:not(:last-child))::after{background-color:var(--toast-info-variant-separator-color)}:host([variant="success"]){background-color:var(--toast-success-variant-background-color);color:var(--toast-success-variant-text-color)}:host([variant="success"]) .icon-container{color:var(--toast-success-variant-icon-color)}:host([variant="success"]) .dismiss-container{color:var(--toast-success-variant-dismiss-button-color)}:host([variant="success"]) progress-bar{background-color:var(--toast-success-variant-progress-bar-color)}:host([variant="success"]) ::slotted(a){color:var(--toast-success-variant-text-link-text-color)}:host([variant="success"]) ::slotted(button){color:var(--toast-success-variant-button-text-color)}:host([variant="success"]) ::slotted([slot="action"]:not(:last-child))::after{background-color:var(--toast-success-variant-separator-color)}:host([variant="warning"]){background-color:var(--toast-warning-variant-background-color);color:var(--toast-warning-variant-text-color)}:host([variant="warning"]) .icon-container{color:var(--toast-warning-variant-icon-color)}:host([variant="warning"]) .dismiss-container{color:var(--toast-warning-variant-dismiss-button-color)}:host([variant="warning"]) progress-bar{background-color:var(--toast-warning-variant-progress-bar-color)}:host([variant="warning"]) ::slotted(a){color:var(--toast-warning-variant-text-link-text-color)}:host([variant="warning"]) ::slotted(button){color:var(--toast-warning-variant-button-text-color)}:host([variant="warning"]) ::slotted([slot="action"]:not(:last-child))::after{background-color:var(--toast-warning-variant-separator-color)}:host([variant="critical"]){background-color:var(--toast-critical-variant-background-color);color:var(--toast-critical-variant-text-color)}:host([variant="critical"]) .icon-container{color:var(--toast-critical-variant-icon-color)}:host([variant="critical"]) .dismiss-container{color:var(--toast-critical-variant-dismiss-button-color)}:host([variant="critical"]) progress-bar{background-color:var(--toast-critical-variant-progress-bar-color)}:host([variant="critical"]) ::slotted(a){color:var(--toast-critical-variant-text-link-text-color)}:host([variant="critical"]) ::slotted(button){color:var(--toast-critical-variant-button-text-color)}:host([variant="critical"]) ::slotted([slot="action"]:not(:last-child))::after{background-color:var(--toast-critical-variant-separator-color)}:host([variant="insight"]){background-color:var(--toast-insight-variant-background-color);color:var(--toast-insight-variant-text-color)}:host([variant="insight"]) .icon-container{color:var(--toast-insight-variant-icon-color)}:host([variant="insight"]) .dismiss-container{color:var(--toast-insight-variant-dismiss-button-color)}:host([variant="insight"]) progress-bar{background-color:var(--toast-insight-variant-progress-bar-color)}:host([variant="insight"]) ::slotted(a){color:var(--toast-insight-variant-text-link-text-color)}:host([variant="insight"]) ::slotted(button){color:var(--toast-insight-variant-button-text-color)}:host([variant="insight"]) ::slotted([slot="action"]:not(:last-child))::after{background-color:var(--toast-insight-variant-separator-color)}';const e=n;const c=class{constructor(o){t(this,o);this.marketToastAutoDismissed=a(this,"marketToastAutoDismissed",7);this.marketToastManuallyDismissed=a(this,"marketToastManuallyDismissed",7);this.variant="info";this.persistent=false;this.dismissButtonAriaLabel="Dismiss";this.progress=-1;this.durationTilAutoDismiss=5e3;this.showActionsNav=false}startAutoDismissTimer(){if(!this.persistent){setTimeout((()=>{this.marketToastAutoDismissed.emit()}),this.durationTilAutoDismiss)}return Promise.resolve()}handleManualDismiss(){this.marketToastManuallyDismissed.emit()}componentWillLoad(){this.checkIfActionsArePresent()}checkIfActionsArePresent(){const t=this.el.querySelector('[slot="action"]');this.showActionsNav=t?true:false}getVariantIcon(){switch(this.variant){case"success":return"success";case"info":return"info";case"warning":return"attention";case"insight":return"recommendation";default:return"warning"}}render(){const t=i("market-icon");const a=Math.min(this.progress,100);const s={width:`${a}%`};return o(r,{key:"fdf10e65a44f11b6e9c7c2ad76562888a9142b39",class:"market-toast",role:"alert"},o("div",{key:"7a5d3cdc63b1cb3f5cde06f0b94427aca548d7ad",class:"content"},o("span",{key:"e359a579c7a0d155a5547ce2bfb6c723dcfd936b",class:"icon-container"},o(t,{key:"4947d2fe92bb868612d02b19d4c29189d9a9065a",name:this.getVariantIcon()})),o("div",{key:"1a8fdb2cdd9abcf85ca03b2374ed4f1c22ef0075",class:"main"},o("section",{key:"fa3335da51befad1ab399425d1f2161e86998c74"},o("slot",{key:"ff628bab0db6dcbdb0469e00e86b78e756d67121"})),o("nav",{key:"d7a1f6203f81a1e4988abc5149770cdea2841628","aria-label":"toast-actions",class:this.showActionsNav?"":"hidden"},o("slot",{key:"f3cf89137e0234b85a604939004ad36ffd0631d1",name:"action",onSlotchange:()=>this.checkIfActionsArePresent()}))),o("nav",{key:"9e115d8b1035d6cbab8004babfb445bd3165b192","aria-label":"dismiss-container",class:"dismiss-container"},o("button",{key:"e4d1d6b5cc356bc8938b2fcd857d19f425c2cc0f",type:"button","aria-label":this.dismissButtonAriaLabel,onClick:()=>this.handleManualDismiss()},o(t,{key:"222a7a53bf9e260aa975f2cd8c5119381e59a994",name:"close"})))),this.progress>=0&&o("progress-bar",{key:"2050f45b9e54927cbe415c90e99a13f85e142142",role:"progressbar","aria-valuenow":a,"aria-valuemin":"0","aria-valuemax":"100",style:s}))}get el(){return s(this)}};c.style=e;export{c as market_toast};
//# sourceMappingURL=p-f8323543.entry.js.map