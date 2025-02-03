import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const marketTableAreaCss = ":host{position:relative;grid-column:1 / -1;background-color:var(--table-cell-state-normal-background-color, var(--core-surface-10-color))}:host(:not([active])){display:none !important;}:host([orientation=\"horizontal\"]){display:block}:host([orientation=\"vertical\"]){display:grid;grid-auto-columns:1fr;grid-auto-flow:column}:host([orientation=\"vertical\"]) ::slotted(.market-table-row){border-bottom:none}:host([stick-to]){position:sticky;z-index:1}:host([stick-to][orientation=\"horizontal\"]){z-index:2}:host([stick-to=\"top\"]){top:0;border-bottom:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}:host([stick-to=\"bottom\"]){bottom:0}:host([stick-to=\"bottom\"]:not(:empty)){border-top:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}:host([stick-to=\"left\"]){left:0;justify-content:end;border-right:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}:host([stick-to=\"right\"]){right:0;justify-content:start;border-left:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}";
const MarketTableAreaStyle0 = marketTableAreaCss;

const MarketTableArea$1 = /*@__PURE__*/ proxyCustomElement(class MarketTableArea extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.orientation = 'horizontal';
        this.stickTo = undefined;
        this.gridTemplate = undefined;
        this.active = false;
        this.placement = [1, -1];
        this.elements = undefined;
    }
    /* When the gridTemplate changes, we need to parse it and update this elements's
    grid-template-columns property, which defines the number and widths of columns
    within this area */
    assignGridTemplate(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            if (newValue.length > 0 ||
                oldValue === undefined // shows content for tables w/o header row
            ) {
                this.active = true;
                this.el.style.gridTemplateColumns = newValue.join(' ');
            }
            else {
                this.active = false;
                this.el.style.gridTemplateColumns = undefined;
            }
        }
    }
    /* When the placement changes, we need to parse it and update this element's
    grid-column property in order to correctly place it within the parent grid.
    Used to support sticky areas */
    placementObserver(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.el.style.gridColumn = `${newValue[0]} / span ${newValue[1]}`;
        }
    }
    componentWillLoad() {
        this.assignGridTemplate(this.gridTemplate);
    }
    render() {
        return (h(Host, { key: 'cef70d070c991957e4b65b0bc959ee6bc2deb8b8', class: "market-table-area" }, h("slot", { key: 'be6981eae7a5e4ae5dd8753fb20542dbcfc2a072' })));
    }
    get el() { return this; }
    static get watchers() { return {
        "gridTemplate": ["assignGridTemplate"],
        "placement": ["placementObserver"]
    }; }
    static get style() { return MarketTableAreaStyle0; }
}, [1, "market-table-area", {
        "orientation": [513],
        "stickTo": [513, "stick-to"],
        "gridTemplate": [16],
        "active": [1540],
        "placement": [16],
        "elements": [32]
    }, undefined, {
        "gridTemplate": ["assignGridTemplate"],
        "placement": ["placementObserver"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-table-area"];
    components.forEach(tagName => { switch (tagName) {
        case "market-table-area":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketTableArea$1);
            }
            break;
    } });
}

const MarketTableArea = MarketTableArea$1;
const defineCustomElement = defineCustomElement$1;

export { MarketTableArea, defineCustomElement };

//# sourceMappingURL=market-table-area.js.map