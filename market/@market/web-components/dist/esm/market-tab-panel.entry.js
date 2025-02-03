import { r as registerInstance, h, H as Host, g as getElement } from './index-e03cb5c3.js';

const marketTabPanelCss = ":host{display:block}:host([hidden]){display:none}";
const MarketTabPanelStyle0 = marketTabPanelCss;

const MarketTabPanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.hidden = false;
    }
    render() {
        return (h(Host, { key: '6d3e25ab96517ba62ea131f1f205afb5036aadbc', "aria-hidden": this.hidden.toString(), class: "market-tab-panel", role: "tabpanel", tabindex: "0" }, h("slot", { key: '348c7928d64c672f5562456f6faea14a1b549075' })));
    }
    get el() { return getElement(this); }
};
MarketTabPanel.style = MarketTabPanelStyle0;

export { MarketTabPanel as market_tab_panel };

//# sourceMappingURL=market-tab-panel.entry.js.map