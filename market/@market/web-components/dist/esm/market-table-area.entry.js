import { r as registerInstance, h, H as Host, g as getElement } from './index-e03cb5c3.js';

const marketTableAreaCss = ":host{position:relative;grid-column:1 / -1;background-color:var(--table-cell-state-normal-background-color, var(--core-surface-10-color))}:host(:not([active])){display:none !important;}:host([orientation=\"horizontal\"]){display:block}:host([orientation=\"vertical\"]){display:grid;grid-auto-columns:1fr;grid-auto-flow:column}:host([orientation=\"vertical\"]) ::slotted(.market-table-row){border-bottom:none}:host([stick-to]){position:sticky;z-index:1}:host([stick-to][orientation=\"horizontal\"]){z-index:2}:host([stick-to=\"top\"]){top:0;border-bottom:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}:host([stick-to=\"bottom\"]){bottom:0}:host([stick-to=\"bottom\"]:not(:empty)){border-top:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}:host([stick-to=\"left\"]){left:0;justify-content:end;border-right:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}:host([stick-to=\"right\"]){right:0;justify-content:start;border-left:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}";
const MarketTableAreaStyle0 = marketTableAreaCss;

const MarketTableArea = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "gridTemplate": ["assignGridTemplate"],
        "placement": ["placementObserver"]
    }; }
};
MarketTableArea.style = MarketTableAreaStyle0;

export { MarketTableArea as market_table_area };

//# sourceMappingURL=market-table-area.entry.js.map