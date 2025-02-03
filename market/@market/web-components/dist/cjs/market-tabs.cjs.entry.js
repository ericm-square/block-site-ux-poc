'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const index$1 = require('./index-254d04f0.js');

const marketTabsCss = ":host{display:block}";
const MarketTabsStyle0 = marketTabsCss;

const MarketTabs = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.selectedTab = undefined;
        this.defaultTab = undefined;
    }
    marketTabSelectedChangedEventHandler(e) {
        e.stopPropagation();
        const { panelId, tabId, value } = e.detail;
        if (!value) {
            return;
        }
        else if (this.selectedTab !== tabId) {
            this.selectedTab = tabId;
        }
        this.showPanelWithId(panelId);
    }
    tabWatcher(newTabId) {
        this.setTab(newTabId);
    }
    setTab(tabId) {
        if (this.tabListEl) {
            this.tabListEl.selectedTab = tabId;
        }
    }
    showPanelWithId(panelId) {
        var _a;
        (_a = this.panelEls) === null || _a === void 0 ? void 0 : _a.forEach((panelEl) => {
            panelEl.hidden = panelEl.id !== panelId;
        });
    }
    handleSlotChange() {
        /**
         * `market-tab-panel`s aren't hidden by default,
         * but once they become a descendant of `<market-tabs>`, they will be hidden by default.
         * Later on, one will be shown depending on which tab gets selected by default.
         */
        this.panelEls = [...this.el.querySelectorAll(index$1.getNamespacedTagFor('market-tab-panel'))].map((panelEl) => {
            panelEl.hidden = true;
            return panelEl;
        });
        this.tabListEl = this.el.querySelector(index$1.getNamespacedTagFor('market-tab-list'));
    }
    componentWillLoad() {
        var _a;
        this.handleSlotChange();
        this.setTab((_a = this.selectedTab) !== null && _a !== void 0 ? _a : this.defaultTab);
    }
    render() {
        return (index.h(index.Host, { key: '7c5ad53149c7116722902b21b7c678e83a4f98ce', class: "market-tabs" }, index.h("slot", { key: 'bdfd6785cd3debc36c36b7ac05b167e684b49874', onSlotchange: () => this.handleSlotChange() })));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "selectedTab": ["tabWatcher"]
    }; }
};
MarketTabs.style = MarketTabsStyle0;

exports.market_tabs = MarketTabs;

//# sourceMappingURL=market-tabs.cjs.entry.js.map