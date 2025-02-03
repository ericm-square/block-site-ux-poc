import { r as registerInstance, h, H as Host } from './index-e03cb5c3.js';

const marketContentCardCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:block;padding:var(--content-card-padding-vertical-size) var(--content-card-padding-horizontal-size);border:var(--content-card-border-width) solid var(--content-card-border-color);border-radius:var(--content-card-border-radius);background-color:var(--content-card-background-color)}";
const MarketContentCardStyle0 = marketContentCardCss;

const MarketContentCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, { key: 'd91376ddaea2a2b65b118b79866b90ffa2939abb', class: "market-content-card" }, h("slot", { key: 'e16f374413a2b1088cefb99bb2611fad77383b1b' })));
    }
};
MarketContentCard.style = MarketContentCardStyle0;

export { MarketContentCard as market_content_card };

//# sourceMappingURL=market-content-card.entry.js.map