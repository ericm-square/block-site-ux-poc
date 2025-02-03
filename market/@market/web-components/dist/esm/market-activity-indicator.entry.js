import { r as registerInstance, h, H as Host } from './index-e03cb5c3.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';

const marketActivityIndicatorCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host([size=\"large\"]) .market-icon{width:48px;height:48px}:host([size=\"small\"]) .market-icon{width:24px;height:24px}.market-icon{position:static;flex:none;fill:currentcolor;animation:rotation 1s infinite linear}@keyframes rotation{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}";
const MarketActivityIndicatorStyle0 = marketActivityIndicatorCss;

const MarketActivityIndicator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = 'large';
    }
    render() {
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        return (h(Host, { key: 'c13642455d6b245c715c753184dacb23e340e24d', class: "market-activity-indicator" }, h(MarketIconTagName, { key: 'cbfa4da92d24e125d4edbe192475faa710c94102', name: "radial-spinner" })));
    }
};
MarketActivityIndicator.style = MarketActivityIndicatorStyle0;

export { MarketActivityIndicator as market_activity_indicator };

//# sourceMappingURL=market-activity-indicator.entry.js.map