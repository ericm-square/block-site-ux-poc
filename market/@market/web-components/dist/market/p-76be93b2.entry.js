import{r as o,h as e,H as t,g as a}from"./p-c9795ae2.js";import{g as r}from"./p-a7d431c5.js";const i=":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:inline-block;overflow-y:auto;min-width:var(--modal-popover-wide-viewport-min-width-size);max-height:var(--modal-popover-wide-viewport-max-height-size);padding:var(--modal-popover-wide-viewport-padding-right-size)\n    var(--modal-popover-wide-viewport-padding-right-size)\n    var(--modal-popover-wide-viewport-padding-right-size)\n    var(--modal-popover-wide-viewport-padding-left-size);border-radius:var(--modal-popover-border-radius);background-color:var(--modal-popover-background-color);box-shadow:var(--elevation-30-shadow)}@media (min-width: 600px){:host{width:auto}}::slotted(.market-list){display:block;width:100%;height:100%;margin-bottom:calc(var(--modal-popover-wide-viewport-padding-bottom-size) - var(--popover-padding, 24px))}::slotted(.market-list:not([has-search])){margin:calc(var(--popover-content-vertical-padding, 8px) - var(--popover-padding, 24px)) 0}";const d=i;const s=class{constructor(e){o(this,e)}initInteractiveList(){const o=this.el.querySelector("slot");let e;if(o){e=o.assignedElements().filter((o=>o.localName===r("market-list")))}else{e=[].slice.call(this.el.querySelectorAll(r("market-list")))}if(e){e.forEach((o=>{o.interactive=true}))}}render(){this.initInteractiveList();return e(t,{key:"8eabe587b426e91c81a0739af9800955a5c31640",class:"market-popover"},e("slot",{key:"a7f140e994d37aac481bbde312d2cd2604ab3e12"}))}get el(){return a(this)}};s.style=d;export{s as market_popover};
//# sourceMappingURL=p-76be93b2.entry.js.map