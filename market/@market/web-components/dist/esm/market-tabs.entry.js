import { r as registerInstance, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';

const marketTabsCss = ":host{display:block}";
const MarketTabsStyle0 = marketTabsCss;

const MarketTabs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.panelEls = [...this.el.querySelectorAll(getNamespacedTagFor('market-tab-panel'))].map((panelEl) => {
            panelEl.hidden = true;
            return panelEl;
        });
        this.tabListEl = this.el.querySelector(getNamespacedTagFor('market-tab-list'));
    }
    componentWillLoad() {
        var _a;
        this.handleSlotChange();
        this.setTab((_a = this.selectedTab) !== null && _a !== void 0 ? _a : this.defaultTab);
    }
    render() {
        return (h(Host, { key: '7c5ad53149c7116722902b21b7c678e83a4f98ce', class: "market-tabs" }, h("slot", { key: 'bdfd6785cd3debc36c36b7ac05b167e684b49874', onSlotchange: () => this.handleSlotChange() })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "selectedTab": ["tabWatcher"]
    }; }
};
MarketTabs.style = MarketTabsStyle0;

export { MarketTabs as market_tabs };

//# sourceMappingURL=market-tabs.entry.js.map