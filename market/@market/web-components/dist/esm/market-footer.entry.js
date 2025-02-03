import { r as registerInstance, h, H as Host } from './index-e03cb5c3.js';

const marketFooterCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:flex;flex-wrap:wrap;justify-content:space-between;width:100%;padding:var(--footer-vertical-padding-size) 0}:host ::slotted(.market-button-group){width:100%}";
const MarketFooterStyle0 = marketFooterCss;

const MarketFooter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, { key: '99d6e49edf0d6d563f09d8e95f4f4f3a04cbd8a3', class: "market-footer" }, h("slot", { key: '65b517c3bbc7a9bc55637ee1d21f738546d70832' })));
    }
};
MarketFooter.style = MarketFooterStyle0;

export { MarketFooter as market_footer };

//# sourceMappingURL=market-footer.entry.js.map