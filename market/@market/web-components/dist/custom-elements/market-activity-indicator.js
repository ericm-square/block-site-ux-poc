import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';

const marketActivityIndicatorCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host([size=\"large\"]) .market-icon{width:48px;height:48px}:host([size=\"small\"]) .market-icon{width:24px;height:24px}.market-icon{position:static;flex:none;fill:currentcolor;animation:rotation 1s infinite linear}@keyframes rotation{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}";
const MarketActivityIndicatorStyle0 = marketActivityIndicatorCss;

const MarketActivityIndicator$1 = /*@__PURE__*/ proxyCustomElement(class MarketActivityIndicator extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.size = 'large';
    }
    render() {
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        return (h(Host, { key: 'c13642455d6b245c715c753184dacb23e340e24d', class: "market-activity-indicator" }, h(MarketIconTagName, { key: 'cbfa4da92d24e125d4edbe192475faa710c94102', name: "radial-spinner" })));
    }
    static get style() { return MarketActivityIndicatorStyle0; }
}, [1, "market-activity-indicator", {
        "size": [513]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-activity-indicator"];
    components.forEach(tagName => { switch (tagName) {
        case "market-activity-indicator":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketActivityIndicator$1);
            }
            break;
    } });
}

const MarketActivityIndicator = MarketActivityIndicator$1;
const defineCustomElement = defineCustomElement$1;

export { MarketActivityIndicator, defineCustomElement };

//# sourceMappingURL=market-activity-indicator.js.map