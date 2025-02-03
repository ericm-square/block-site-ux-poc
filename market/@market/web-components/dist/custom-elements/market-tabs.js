import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';

const marketTabsCss = ":host{display:block}";
const MarketTabsStyle0 = marketTabsCss;

const MarketTabs$1 = /*@__PURE__*/ proxyCustomElement(class MarketTabs extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
    get el() { return this; }
    static get watchers() { return {
        "selectedTab": ["tabWatcher"]
    }; }
    static get style() { return MarketTabsStyle0; }
}, [1, "market-tabs", {
        "selectedTab": [1537, "selected-tab"],
        "defaultTab": [1, "default-tab"]
    }, [[0, "marketTabSelectedChanged", "marketTabSelectedChangedEventHandler"]], {
        "selectedTab": ["tabWatcher"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-tabs"];
    components.forEach(tagName => { switch (tagName) {
        case "market-tabs":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketTabs$1);
            }
            break;
    } });
}

const MarketTabs = MarketTabs$1;
const defineCustomElement = defineCustomElement$1;

export { MarketTabs, defineCustomElement };

//# sourceMappingURL=market-tabs.js.map