'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');

const marketTabPanelCss = ":host{display:block}:host([hidden]){display:none}";
const MarketTabPanelStyle0 = marketTabPanelCss;

const MarketTabPanel = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.hidden = false;
    }
    render() {
        return (index.h(index.Host, { key: '6d3e25ab96517ba62ea131f1f205afb5036aadbc', "aria-hidden": this.hidden.toString(), class: "market-tab-panel", role: "tabpanel", tabindex: "0" }, index.h("slot", { key: '348c7928d64c672f5562456f6faea14a1b549075' })));
    }
    get el() { return index.getElement(this); }
};
MarketTabPanel.style = MarketTabPanelStyle0;

exports.market_tab_panel = MarketTabPanel;

//# sourceMappingURL=market-tab-panel.cjs.entry.js.map