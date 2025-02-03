import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const marketContentCardCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:block;padding:var(--content-card-padding-vertical-size) var(--content-card-padding-horizontal-size);border:var(--content-card-border-width) solid var(--content-card-border-color);border-radius:var(--content-card-border-radius);background-color:var(--content-card-background-color)}";
const MarketContentCardStyle0 = marketContentCardCss;

const MarketContentCard$1 = /*@__PURE__*/ proxyCustomElement(class MarketContentCard extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    render() {
        return (h(Host, { key: 'd91376ddaea2a2b65b118b79866b90ffa2939abb', class: "market-content-card" }, h("slot", { key: 'e16f374413a2b1088cefb99bb2611fad77383b1b' })));
    }
    static get style() { return MarketContentCardStyle0; }
}, [1, "market-content-card"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-content-card"];
    components.forEach(tagName => { switch (tagName) {
        case "market-content-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketContentCard$1);
            }
            break;
    } });
}

const MarketContentCard = MarketContentCard$1;
const defineCustomElement = defineCustomElement$1;

export { MarketContentCard, defineCustomElement };

//# sourceMappingURL=market-content-card.js.map