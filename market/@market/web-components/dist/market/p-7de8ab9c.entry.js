import{r as t,h as o,H as e,g as r}from"./p-c9795ae2.js";const i=':host{position:relative;grid-column:1 / -1;background-color:var(--table-cell-state-normal-background-color, var(--core-surface-10-color))}:host(:not([active])){display:none !important;}:host([orientation="horizontal"]){display:block}:host([orientation="vertical"]){display:grid;grid-auto-columns:1fr;grid-auto-flow:column}:host([orientation="vertical"]) ::slotted(.market-table-row){border-bottom:none}:host([stick-to]){position:sticky;z-index:1}:host([stick-to][orientation="horizontal"]){z-index:2}:host([stick-to="top"]){top:0;border-bottom:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}:host([stick-to="bottom"]){bottom:0}:host([stick-to="bottom"]:not(:empty)){border-top:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}:host([stick-to="left"]){left:0;justify-content:end;border-right:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}:host([stick-to="right"]){right:0;justify-content:start;border-left:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}';const a=i;const s=class{constructor(o){t(this,o);this.orientation="horizontal";this.stickTo=undefined;this.gridTemplate=undefined;this.active=false;this.placement=[1,-1];this.elements=undefined}assignGridTemplate(t,o){if(t&&t!==o){if(t.length>0||o===undefined){this.active=true;this.el.style.gridTemplateColumns=t.join(" ")}else{this.active=false;this.el.style.gridTemplateColumns=undefined}}}placementObserver(t,o){if(t!==o){this.el.style.gridColumn=`${t[0]} / span ${t[1]}`}}componentWillLoad(){this.assignGridTemplate(this.gridTemplate)}render(){return o(e,{key:"cef70d070c991957e4b65b0bc959ee6bc2deb8b8",class:"market-table-area"},o("slot",{key:"be6981eae7a5e4ae5dd8753fb20542dbcfc2a072"}))}get el(){return r(this)}static get watchers(){return{gridTemplate:["assignGridTemplate"],placement:["placementObserver"]}}};s.style=a;export{s as market_table_area};
//# sourceMappingURL=p-7de8ab9c.entry.js.map