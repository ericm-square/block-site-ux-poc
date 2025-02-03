import { r as registerInstance, h, H as Host } from './index-e03cb5c3.js';

const marketDividerCss = ":host{--divider-thin-variant-height:1px;display:block;flex:none;height:var(--divider-height);border-radius:var(--divider-radius);background-color:var(--divider-fill-color)}:host([margin=\"large\"]){margin:var(--divider-large-variant-vertical-padding) 0}:host([margin=\"medium\"]){margin:var(--divider-medium-variant-vertical-padding) 0}:host([margin=\"small\"]){margin:var(--divider-small-variant-vertical-padding) 0}:host([size=\"thin\"]){height:var(--divider-thin-variant-height)}";
const MarketDividerStyle0 = marketDividerCss;

const MarketDivider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.margin = 'medium';
        this.size = 'thick';
    }
    render() {
        return h(Host, { key: 'b585eb868ec3ea219f031f101198924340befc6c', class: "market-divider" });
    }
};
MarketDivider.style = MarketDividerStyle0;

export { MarketDivider as market_divider };

//# sourceMappingURL=market-divider.entry.js.map