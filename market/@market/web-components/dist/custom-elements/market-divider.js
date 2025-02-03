import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const marketDividerCss = ":host{--divider-thin-variant-height:1px;display:block;flex:none;height:var(--divider-height);border-radius:var(--divider-radius);background-color:var(--divider-fill-color)}:host([margin=\"large\"]){margin:var(--divider-large-variant-vertical-padding) 0}:host([margin=\"medium\"]){margin:var(--divider-medium-variant-vertical-padding) 0}:host([margin=\"small\"]){margin:var(--divider-small-variant-vertical-padding) 0}:host([size=\"thin\"]){height:var(--divider-thin-variant-height)}";
const MarketDividerStyle0 = marketDividerCss;

const MarketDivider$1 = /*@__PURE__*/ proxyCustomElement(class MarketDivider extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.margin = 'medium';
        this.size = 'thick';
    }
    render() {
        return h(Host, { key: 'b585eb868ec3ea219f031f101198924340befc6c', class: "market-divider" });
    }
    static get style() { return MarketDividerStyle0; }
}, [1, "market-divider", {
        "margin": [513],
        "size": [513]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-divider"];
    components.forEach(tagName => { switch (tagName) {
        case "market-divider":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketDivider$1);
            }
            break;
    } });
}

const MarketDivider = MarketDivider$1;
const defineCustomElement = defineCustomElement$1;

export { MarketDivider, defineCustomElement };

//# sourceMappingURL=market-divider.js.map