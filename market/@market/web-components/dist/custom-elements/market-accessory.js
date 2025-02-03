import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const marketAccessoryCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:flex;justify-content:center;align-items:center}:host([size=\"icon\"]){width:var(--accessory-icon-variant-medium-size-width);height:var(--accessory-icon-variant-medium-size-height)}:host([size=\"image\"]){width:var(--accessory-medium-size-width);height:var(--accessory-medium-size-height)}:host ::slotted(.market-icon){}:host ::slotted(img){-o-object-fit:cover;object-fit:cover;width:100%;height:100%}:host([size=\"icon\"]) ::slotted(img){border-radius:var(--accessory-background-radius)}:host([size=\"image\"]) ::slotted(img){border-radius:var(--accessory-background-radius)}";
const MarketAccessoryStyle0 = marketAccessoryCss;

const MarketAccessory$1 = /*@__PURE__*/ proxyCustomElement(class MarketAccessory extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.size = undefined;
    }
    /* TODO: add optional height/width props for custom sizing of slotted image */
    render() {
        return (h(Host, { key: 'ce321a0739c785b655c6483c94ace4248f7adcbb', class: "market-accessory", size: this.size }, h("slot", { key: '4190735a507d572868ad9f54da6a6039a66794e5' })));
    }
    static get style() { return MarketAccessoryStyle0; }
}, [1, "market-accessory", {
        "size": [1]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-accessory"];
    components.forEach(tagName => { switch (tagName) {
        case "market-accessory":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketAccessory$1);
            }
            break;
    } });
}

const MarketAccessory = MarketAccessory$1;
const defineCustomElement = defineCustomElement$1;

export { MarketAccessory, defineCustomElement };

//# sourceMappingURL=market-accessory.js.map