import { h, Host } from "@stencil/core";
import { getNamespacedTagFor } from "../../utils/namespace";
export class MarketTabs {
    constructor() {
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
    static get is() { return "market-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-tabs.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-tabs.css"]
        };
    }
    static get properties() {
        return {
            "selectedTab": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "undefined"
                        }],
                    "text": "String for the selected tab (i.e. `market-tab`'s `id` attribute)\n\nOmitting or setting to empty string will default to the first non-disabled tab"
                },
                "attribute": "selected-tab",
                "reflect": true
            },
            "defaultTab": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "undefined"
                        }],
                    "text": "String for the default selected tab (i.e. `market-tab`'s `id` attribute)\n\nOnly used when the component initially loads"
                },
                "attribute": "default-tab",
                "reflect": false
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "selectedTab",
                "methodName": "tabWatcher"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketTabSelectedChanged",
                "method": "marketTabSelectedChangedEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-tabs.js.map
