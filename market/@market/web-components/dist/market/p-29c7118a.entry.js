import{r as t,h as o,H as i,g as e}from"./p-c9795ae2.js";import{o as n}from"./p-fb3db021.js";const r=':host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}a,button{--text-link-focus-ring-border-size:var(--button-focus-ring-border-size);--text-link-focus-ring-buffer-size:var(--button-focus-ring-buffer-size);--text-link-focus-ring-color:var(--button-focus-ring-color);--focus-ring-color:color-mix(in srgb, var(--text-link-focus-ring-color) 100%, transparent)}a:focus-visible,button:focus-visible{border-radius:1px;outline:var(--text-link-focus-ring-border-size) solid var(--focus-ring-color);outline-offset:var(--text-link-focus-ring-buffer-size)}:host{--transition-duration:0.2s;color:var(--text-link-normal-variant-color);font-weight:var(--text-link-medium-size-text-weight);font-size:inherit;line-height:inherit;letter-spacing:var(--text-link-medium-size-text-tracking);cursor:pointer}:host a,:host a:link,:host a:visited,:host a:hover,:host a:active,:host button{color:inherit;font-family:inherit;text-decoration:none;transition:color var(--transition-duration)}:host a,:host a:link,:host a:visited,:host button{opacity:var(--text-link-normal-state-opacity)}:host a:hover,:host button:hover,:host a:focus,:host button:focus{color:var(--core-blue-20-color);text-decoration:underline}:host a:active,:host button:active{color:var(--core-blue-10-color);}:host([highlight="underline"]) a,:host([highlight="underline"]) button{display:inline-block;text-decoration:underline}:host([highlight="underline"]) a:hover,:host([highlight="underline"]) a:focus,:host([highlight="underline"]) button:hover,:host([highlight="underline"]) button:focus{color:var(--core-blue-20-color);text-decoration:none}:host([aria-disabled]) a,:host([aria-disabled]) button{opacity:var(--text-link-disabled-state-opacity)}:host([destructive]){color:var(--text-link-destructive-variant-color)}:host button{padding:0;border:none;background:none;font:inherit;text-align:inherit;cursor:pointer}';const s=r;const a=class{constructor(o){t(this,o);this.onMutationObserved=t=>{this.ariaAttributes=t};this.href=undefined;this.target=undefined;this.rel=undefined;this.destructive=false;this.disabled=false;this.download=undefined;this.highlight=undefined;this.ariaAttributes=undefined}componentWillLoad(){this.mutationObserver=n(this.el,this.onMutationObserved)}handleClick(t){if(this.disabled){t.preventDefault();t.stopPropagation()}}render(){const{disabled:t,handleClick:e,href:n,target:r,ariaAttributes:s,rel:a,download:l}=this;const d=n!==undefined?"a":"button";const c=d==="a"?{href:n,target:r,rel:a,download:l}:{disabled:t};return o(i,{key:"1ff15b453af9a9fc80263474f7415d669b4d158f",class:"market-link",onClick:e,onKeyDown:e},o(d,Object.assign({key:"9c680a5363b028c6dcece71a5e6d3efc7f131190"},c,s,{"aria-disabled":t?"true":null,tabindex:t?"-1":null}),o("slot",{key:"ca9afe137bd74a21bfe944a4af0afc3d241d0015"})))}disconnectedCallback(){var t;(t=this.mutationObserver)===null||t===void 0?void 0:t.disconnect()}get el(){return e(this)}};a.style=s;export{a as market_link};
//# sourceMappingURL=p-29c7118a.entry.js.map