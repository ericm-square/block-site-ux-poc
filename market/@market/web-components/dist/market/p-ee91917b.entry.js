import{r as e,c as t,h as r,H as o,g as a}from"./p-c9795ae2.js";import{g as n}from"./p-a7d431c5.js";function i(e){var t;const r=(t=e===null||e===void 0?void 0:e.tagName)===null||t===void 0?void 0:t.toLowerCase();return Boolean(e&&r===n("market-checkbox"))}function l(e){var t;const r=(t=e===null||e===void 0?void 0:e.tagName)===null||t===void 0?void 0:t.toLowerCase();return Boolean(e&&r===n("market-toggle"))}function s(e){return i(e)||l(e)}const c=':host,*{box-sizing:border-box}:host{--table-cell-vertical-padding-size:var(--core-metrics-spacing-150);--table-cell-horizontal-padding-size:var(--core-metrics-spacing-100);--table-cell-horizontal-spacing-size:var(--core-metrics-spacing-150);--table-cell-border-width:1px;--table-cell-heading-border-color:var(--core-divider-10-color);--table-cell-state-normal-background-color:var(--core-surface-10-color);--table-cell-hover-state-background-color:var(--core-fill-50-color);--table-cell-focus-state-background-color:var(--core-fill-50-color);--table-cell-pressed-state-background-color:var(--core-emphasis-40-color);--table-cell-disabled-state-text-color:var(--core-text-30-color);--table-cell-indent-level:0;--table-cell-indent-size:var(--core-metrics-spacing-500);--table-cell-caret-size:var(--core-metrics-spacing-500);--table-cell-text-font-weight:var(--core-type-paragraph-20-weight);--table-cell-text-font-size:var(--core-type-paragraph-20-size);--table-cell-text-line-height:var(--core-type-paragraph-20-leading);--table-cell-focus-ring-color:color-mix(in srgb, var(--core-focus-ring-color) 50%, transparent);display:table-cell;vertical-align:inherit;width:auto;padding:var(--table-cell-vertical-padding-size) var(--table-cell-horizontal-padding-size);border-bottom:var(--table-cell-border-width) solid var(--table-cell-border-color);outline:none;font-weight:var(--table-cell-text-font-weight);font-size:var(--table-cell-text-font-size);line-height:var(--table-cell-text-line-height);text-align:inherit}:host .content-outer{display:flex;gap:var(--table-cell-horizontal-spacing-size);justify-content:space-between;align-items:center;width:100%;transition-timing-function:var(--core-animation-move-transition-easing);transition-duration:var(--core-animation-move-transition-moderate-speed-duration);transition-property:gap}:host .content-inner{display:flex;gap:var(--table-cell-horizontal-spacing-size);align-items:center;width:100%}:host .default-slot{width:100%}:host([indent]:not([indent="0"])){padding-left:calc(\n        var(--table-cell-horizontal-spacing-size) + var(--table-cell-indent-level) * var(--table-cell-indent-size)\n      )}:host([indent][caret]:not([indent="0"])){padding-left:calc(\n        var(--table-cell-horizontal-padding-size) + var(--table-cell-indent-level) * var(--table-cell-indent-size)\n      )}:host([nowrap]) .default-slot{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([align="left"]){text-align:left}:host([align="center"]){text-align:center}:host([align="right"]){text-align:right}:host([valign="top"]){vertical-align:top}:host([valign="middle"]){vertical-align:middle}:host([valign="bottom"]){vertical-align:bottom}:host([sticky]){position:sticky;z-index:2;background-color:var(--table-cell-state-normal-background-color)}:host([sticky="left"]){left:0;border-right:var(--table-cell-border-width) solid var(--table-cell-heading-border-color)}:host([sticky="right"]){right:0;border-left:var(--table-cell-border-width) solid var(--table-cell-heading-border-color)}:host(.market-drag-clone-first-cell){padding-left:var(--table-cell-horizontal-padding-size) !important}:host(.market-drag-clone-first-cell) .content-outer{gap:0}:host(.market-drag-clone-first-cell) .caret-button,:host(.market-drag-clone-first-cell) ::slotted([slot="control"]){width:0;height:0;opacity:0%}::slotted([slot="control"]),::slotted([slot="leading-accessory"]),::slotted([slot="trailing-accessory"]){flex-shrink:0}.caret-button,::slotted([slot="control"]){transition-timing-function:var(--core-animation-move-transition-easing);transition-duration:var(--core-animation-move-transition-moderate-speed-duration);transition-property:width, height, opacity}:host([interactive]){cursor:pointer}@media (hover: hover){:host([sortable]:hover),:host([interactive]:hover){background-color:var(--table-cell-hover-state-background-color)}}:host([sortable]:focus),:host([interactive]:focus){background-color:var(--table-cell-focus-state-background-color)}:host([active]),:host([sortable]:active),:host([interactive]:active){background-color:var(--table-cell-pressed-state-background-color)}:host([disabled]){color:var(--table-cell-disabled-state-text-color);pointer-events:none}.caret-button{display:flex;flex-shrink:0;justify-content:center;align-items:center;width:var(--table-cell-caret-size);height:var(--table-cell-caret-size);margin-top:calc(var(--table-cell-vertical-padding-size) * -1);margin-bottom:calc(var(--table-cell-vertical-padding-size) * -1);margin-left:calc(var(--table-cell-horizontal-padding-size) * -1);padding:0;border:none;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.caret-button svg{display:block;fill:var(--core-fill-20-color);transition:0.2s transform ease}:host([caret="up"]) .caret-button svg{transform:rotate(-180deg)}.caret-button:focus-visible{border-radius:var(--core-radius-10);outline:var(--core-focus-ring-border-size) solid var(--table-cell-focus-ring-color);outline-offset:calc(var(--core-focus-ring-border-size) * -1)}.sort-button{display:flex;flex-shrink:0;gap:var(--core-metrics-spacing-50);align-items:center;width:100%;margin:0;padding:var(--table-cell-vertical-padding-size) var(--table-cell-horizontal-padding-size);border:none;background:transparent;outline:none;font-weight:inherit;font-size:inherit;font-family:inherit;line-height:inherit;text-align:inherit;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.sort-button svg{display:block;flex-shrink:0;fill:var(--core-text-30-color)}.sort-button:focus-visible{border-radius:var(--core-radius-10);outline:var(--core-focus-ring-border-size) solid var(--table-cell-focus-ring-color);outline-offset:calc(var(--core-focus-ring-border-size) * -1)}:host([align="left"]) .sort-button{justify-content:start}:host([align="center"]) .sort-button{justify-content:center}:host([align="right"]) .sort-button{justify-content:end}:host([sortable]){padding:0}:host([sortable][sort-order="ascending"]) .sort-button svg,:host([sortable][sort-order="descending"]) .sort-button svg{fill:var(--core-text-10-color)}';const d=c;const h=class{constructor(r){e(this,r);this.marketTableV2CellCaretClicked=t(this,"marketTableV2CellCaretClicked",7);this.marketTableV2CellSortClicked=t(this,"marketTableV2CellSortClicked",7);this.marketInternalTableV2CellSelectionChange=t(this,"marketInternalTableV2CellSelectionChange",7);this.active=false;this.align=undefined;this.caret=undefined;this.caretAriaLabelExpanded="Group of rows is expanded: click to collapse";this.caretAriaLabelCollapsed="Group of rows is collapsed: click to expand";this.disabled=false;this.indent=undefined;this.interactive=false;this.nowrap=false;this.selected="false";this.sticky=undefined;this.sortable=undefined;this.sortAriaLabelAscending="Sorted ascending: click to sort descending";this.sortAriaLabelDescending="Sorted descending: click to sort ascending";this.sortAriaLabelNone="Not sorted: click to sort ascending";this.sortOrder="none";this.sortStrategy=undefined;this.sortStrategyFormat=undefined;this.valign=undefined}onKeydown(e){const{target:t,key:r}=e;const{el:o,disabled:a,interactive:n}=this;if(a)return;if(!n)return;if(t!==o)return;if(r==="Enter"||r===" "){e.preventDefault();o.click()}}async onMarketControlSelectionChange(e){const{control:t}=this;const{target:r,detail:o}=e;if(r!==t)return;const a=o.current?"true":"false";await this.setSelected(a)}async setSelected(e,{silent:t=false}={}){const{marketInternalTableV2CellSelectionChange:r,selected:o}=this;if(o===e)return Promise.resolve();if(!t){r.emit({current:e,previous:o})}this.selected=e;await this.setControlSelected(e);return Promise.resolve()}async setControlSelected(e){const{control:t}=this;if(!t)return;await t.setSelection(e==="true",{silent:true});if(i(t))await t.setIndeterminate(e==="indeterminate")}getTabIndex(){const{disabled:e,interactive:t}=this;return t&&!e?"0":null}getStyles(){const{indent:e}=this;if(!e||e<1)return{};return{"--table-cell-indent-level":e.toString()}}getSortButtonLabel(){const{sortOrder:e,sortAriaLabelAscending:t,sortAriaLabelDescending:r,sortAriaLabelNone:o}=this;switch(e){case"ascending":return t;case"descending":return r;default:return o}}onCaretClick(e){e.stopPropagation();this.marketTableV2CellCaretClicked.emit()}onSortClick(){const{sortOrder:e,marketTableV2CellSortClicked:t}=this;const r=e||"none";const o=r==="ascending"?"descending":"ascending";const{defaultPrevented:a}=t.emit({current:o,previous:r});if(!a)this.sortOrder=o}async syncControlState(){const{el:e,selected:t}=this;const r=[...e.children].find((e=>e.slot==="control"));if(s(r)){this.control=r;if(t)await this.setControlSelected(t)}}async connectedCallback(){await this.syncControlState()}renderCaretButton(){return r("button",{class:"caret-button","aria-label":this.caret==="down"?this.caretAriaLabelCollapsed:this.caretAriaLabelExpanded,onClick:e=>this.onCaretClick(e)},r("svg",{width:"16",height:"16",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},r("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M8.70715 11.7071C8.31663 12.0976 7.68346 12.0976 7.29294 11.7071L1.29294 5.70711L2.70715 4.29289L8.00005 9.58579L13.2929 4.29289L14.7072 5.70711L8.70715 11.7071Z"})))}renderSortAscendingSvg(){return r("svg",{width:"16",height:"16",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},r("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M7.52861 2.86177C7.78895 2.60142 8.21107 2.60142 8.47141 2.86177L13.1381 7.52843L12.1953 8.47124L8.66668 4.94265L8.66668 12.6665H7.33334V4.94265L3.80475 8.47124L2.86194 7.52843L7.52861 2.86177Z"}))}renderSortDecendingSvg(){return r("svg",{width:"16",height:"16",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},r("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M8.47129 13.1382C8.21094 13.3986 7.78883 13.3986 7.52848 13.1382L2.86182 8.47157L3.80463 7.52876L7.33322 11.0574L7.33322 3.3335L8.66655 3.3335L8.66655 11.0574L12.1952 7.52876L13.138 8.47157L8.47129 13.1382Z"}))}renderSortNoneSvg(){return r("svg",{width:"16",height:"17",viewBox:"0 0 16 17",xmlns:"http://www.w3.org/2000/svg"},r("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M10.8633 14.31L8.19664 11.6434L9.1433 10.7034L10.67 12.23L10.67 3.17002L12.0033 3.17002L12.0033 12.23L13.53 10.7034L14.47 11.6434L11.8033 14.31C11.5433 14.57 11.1233 14.57 10.8633 14.31ZM2.46997 6.30338L1.52997 5.36338L4.19664 2.69671C4.45664 2.43671 4.87664 2.43671 5.13664 2.69671L7.8033 5.36338L6.8633 6.30338L5.33664 4.77671L5.33664 13.8367L4.0033 13.8367L4.0033 4.77671L2.46997 6.30338Z"}))}renderSortSvg(){switch(this.sortOrder){case"ascending":return this.renderSortAscendingSvg();case"descending":return this.renderSortDecendingSvg();default:return this.renderSortNoneSvg()}}render(){var e;const{el:t,caret:a,sortable:n,sortOrder:i}=this;return r(o,{key:"2d295a766cd4cb793b862dd91fc75268c2a87dd4",role:(e=t.role)!==null&&e!==void 0?e:"cell",tabindex:this.getTabIndex(),style:this.getStyles(),class:"market-table-v2-cell","sort-order":i!=="none"?i:null,"aria-sort":i!=="none"?i:null},r("div",{key:"906e275506a64e166a30803cfc82c62f777ed6d3",class:"content-outer"},a&&this.renderCaretButton(),r("slot",{key:"ac57aa86c019e676af0bb682c62566edafd49ac9",name:"control",onSlotchange:()=>this.syncControlState()}),r("div",{key:"2a4230ff9f54efa8ee8cee84520d33dd825dde2c",class:"content-inner"},r("slot",{key:"99ed0e6392d5578d91f4241e327ff35b94f0b399",name:"leading-accessory"}),r("div",{key:"bfd35740621d1e2ae479b6a0f04f6f4d0cbe44bf",class:"default-slot"},!n&&r("slot",{key:"dd7101744adee33b83c23edd386ae2f5569a3b08"}),n&&r("button",{key:"b50edf4b821d5d7b558403069525a2094c7074fb",class:"sort-button","aria-describedby":"sort-button-label",onClick:()=>this.onSortClick()},r("slot",{key:"6b025eba66325233948b4049c8f4488811a5bd56"}),this.renderSortSvg(),r("span",{key:"d3fbf14b0b8cce540086ad7085ae39fc534c659d",id:"sort-button-label",hidden:true},this.getSortButtonLabel()))),r("slot",{key:"ff30de7fc804ca8308dc6a997c22449fdc14307b",name:"trailing-accessory"}))))}get el(){return a(this)}};h.style=d;export{h as market_table_v2_cell};
//# sourceMappingURL=p-ee91917b.entry.js.map