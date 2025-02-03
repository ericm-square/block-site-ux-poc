import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const marketInlineSectionHeaderCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:flex;justify-content:space-between;align-items:center}";
const MarketInlineSectionHeaderStyle0 = marketInlineSectionHeaderCss;

const MarketInlineSectionHeader$1 = /*@__PURE__*/ proxyCustomElement(class MarketInlineSectionHeader extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    render() {
        return (h(Host, { key: '1e021e90353a3773683597d5b1509918652ed000' }, h("slot", { key: '9b822f33cb4a646ad27a0e9131cd98ee83b6cea6' }), h("slot", { key: '9395fdc855ced7754ce4cdc03023998de4b7c3b0', name: "trailing-accessory" })));
    }
    static get style() { return MarketInlineSectionHeaderStyle0; }
}, [1, "market-inline-section-header"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-inline-section-header"];
    components.forEach(tagName => { switch (tagName) {
        case "market-inline-section-header":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketInlineSectionHeader$1);
            }
            break;
    } });
}

const MarketInlineSectionHeader = MarketInlineSectionHeader$1;
const defineCustomElement = defineCustomElement$1;

export { MarketInlineSectionHeader, defineCustomElement };

//# sourceMappingURL=market-inline-section-header.js.map