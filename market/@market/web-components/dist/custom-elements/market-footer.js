import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const marketFooterCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:flex;flex-wrap:wrap;justify-content:space-between;width:100%;padding:var(--footer-vertical-padding-size) 0}:host ::slotted(.market-button-group){width:100%}";
const MarketFooterStyle0 = marketFooterCss;

const MarketFooter$1 = /*@__PURE__*/ proxyCustomElement(class MarketFooter extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    render() {
        return (h(Host, { key: '99d6e49edf0d6d563f09d8e95f4f4f3a04cbd8a3', class: "market-footer" }, h("slot", { key: '65b517c3bbc7a9bc55637ee1d21f738546d70832' })));
    }
    static get style() { return MarketFooterStyle0; }
}, [1, "market-footer"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-footer"];
    components.forEach(tagName => { switch (tagName) {
        case "market-footer":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketFooter$1);
            }
            break;
    } });
}

const MarketFooter = MarketFooter$1;
const defineCustomElement = defineCustomElement$1;

export { MarketFooter, defineCustomElement };

//# sourceMappingURL=market-footer.js.map