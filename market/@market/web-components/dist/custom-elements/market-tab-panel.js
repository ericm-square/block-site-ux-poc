import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const marketTabPanelCss = ":host{display:block}:host([hidden]){display:none}";
const MarketTabPanelStyle0 = marketTabPanelCss;

const MarketTabPanel$1 = /*@__PURE__*/ proxyCustomElement(class MarketTabPanel extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.hidden = false;
    }
    render() {
        return (h(Host, { key: '6d3e25ab96517ba62ea131f1f205afb5036aadbc', "aria-hidden": this.hidden.toString(), class: "market-tab-panel", role: "tabpanel", tabindex: "0" }, h("slot", { key: '348c7928d64c672f5562456f6faea14a1b549075' })));
    }
    get el() { return this; }
    static get style() { return MarketTabPanelStyle0; }
}, [1, "market-tab-panel", {
        "hidden": [516]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-tab-panel"];
    components.forEach(tagName => { switch (tagName) {
        case "market-tab-panel":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketTabPanel$1);
            }
            break;
    } });
}

const MarketTabPanel = MarketTabPanel$1;
const defineCustomElement = defineCustomElement$1;

export { MarketTabPanel, defineCustomElement };

//# sourceMappingURL=market-tab-panel.js.map