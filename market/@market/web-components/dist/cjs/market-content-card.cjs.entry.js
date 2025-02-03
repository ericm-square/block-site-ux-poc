'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');

const marketContentCardCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:block;padding:var(--content-card-padding-vertical-size) var(--content-card-padding-horizontal-size);border:var(--content-card-border-width) solid var(--content-card-border-color);border-radius:var(--content-card-border-radius);background-color:var(--content-card-background-color)}";
const MarketContentCardStyle0 = marketContentCardCss;

const MarketContentCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, { key: 'd91376ddaea2a2b65b118b79866b90ffa2939abb', class: "market-content-card" }, index.h("slot", { key: 'e16f374413a2b1088cefb99bb2611fad77383b1b' })));
    }
};
MarketContentCard.style = MarketContentCardStyle0;

exports.market_content_card = MarketContentCard;

//# sourceMappingURL=market-content-card.cjs.entry.js.map