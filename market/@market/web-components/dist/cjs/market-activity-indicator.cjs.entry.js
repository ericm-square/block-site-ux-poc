'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const index$1 = require('./index-254d04f0.js');

const marketActivityIndicatorCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host([size=\"large\"]) .market-icon{width:48px;height:48px}:host([size=\"small\"]) .market-icon{width:24px;height:24px}.market-icon{position:static;flex:none;fill:currentcolor;animation:rotation 1s infinite linear}@keyframes rotation{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}";
const MarketActivityIndicatorStyle0 = marketActivityIndicatorCss;

const MarketActivityIndicator = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.size = 'large';
    }
    render() {
        const MarketIconTagName = index$1.getNamespacedTagFor('market-icon');
        return (index.h(index.Host, { key: 'c13642455d6b245c715c753184dacb23e340e24d', class: "market-activity-indicator" }, index.h(MarketIconTagName, { key: 'cbfa4da92d24e125d4edbe192475faa710c94102', name: "radial-spinner" })));
    }
};
MarketActivityIndicator.style = MarketActivityIndicatorStyle0;

exports.market_activity_indicator = MarketActivityIndicator;

//# sourceMappingURL=market-activity-indicator.cjs.entry.js.map