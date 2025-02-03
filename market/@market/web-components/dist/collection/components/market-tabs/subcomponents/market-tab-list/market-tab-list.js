import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../../../utils/namespace";
/**
 * @slot - Default slot for `<market-tab>`s
 */
export class MarketTabList {
    constructor() {
        this.size = undefined;
        this.selectedTab = undefined;
        this.defaultTab = undefined;
    }
    marketTabSelectedChangedEventHandler(e) {
        var _a;
        const { tabId, value } = e.detail;
        if (!value) {
            return;
        }
        if (this.selectedTab !== tabId) {
            const { defaultPrevented } = this.marketTabListSelectedTabChanged.emit({
                prevValue: this.selectedTab,
                value: tabId,
            });
            if (!defaultPrevented) {
                this.selectedTab = tabId;
            }
        }
        (_a = this.tabEls) === null || _a === void 0 ? void 0 : _a.forEach((tabEl) => {
            if (tabEl.id !== tabId) {
                tabEl.deselect();
                tabEl.tabIndex = -1;
            }
            else {
                tabEl.tabIndex = 0;
            }
        });
    }
    tabWatcher(newTabId) {
        this.selectTab(newTabId);
    }
    sizeWatcher(newSize) {
        this.propagateSizeProp(newSize);
    }
    selectTab(tabId) {
        var _a, _b;
        const tabEl = ((_a = this.tabEls) === null || _a === void 0 ? void 0 : _a.find((el) => tabId === el.id && !el.disabled)) || ((_b = this.tabEls) === null || _b === void 0 ? void 0 : _b.find((el) => !el.disabled));
        tabEl === null || tabEl === void 0 ? void 0 : tabEl.select();
    }
    propagateSizeProp(size) {
        this.tabEls.forEach((el) => {
            if (this.size && el.size !== this.size) {
                el.size = size;
            }
        });
    }
    focusOnTab(el) {
        var _a, _b;
        (_b = (_a = el === null || el === void 0 ? void 0 : el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button')) === null || _b === void 0 ? void 0 : _b.focus();
    }
    handleKeyDown(e) {
        if (!this.tabEls || this.tabEls.every((el) => el.disabled)) {
            return;
        }
        /**
         * These keyboard shortcut behaviours are from:
         * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/#kbd_label
         *
         * Tab, Enter, and Space behaviours should already natively work.
         */
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home' || e.key === 'End') {
            e.preventDefault(); // prevent key press from triggering scroll events
            const currentTabIndex = this.tabEls.indexOf(e.target);
            if (currentTabIndex < 0) {
                return;
            }
            const left = this.tabEls.slice(0, currentTabIndex);
            const right = this.tabEls.slice(currentTabIndex + 1);
            switch (e.key) {
                case 'ArrowRight': {
                    const focusableTabEls = [...right, ...left].find((el) => !el.disabled);
                    this.focusOnTab(focusableTabEls);
                    break;
                }
                case 'ArrowLeft': {
                    const focusableTabEls = [...right, ...left].reverse().find((el) => !el.disabled);
                    this.focusOnTab(focusableTabEls);
                    break;
                }
                case 'Home': {
                    const focusableTabEls = this.tabEls.find((el) => !el.disabled);
                    this.focusOnTab(focusableTabEls);
                    break;
                }
                case 'End': {
                    const focusableTabEls = this.tabEls.filter((el) => !el.disabled);
                    this.focusOnTab(focusableTabEls[focusableTabEls.length - 1]);
                    break;
                }
                default:
                    break;
            }
        }
    }
    handleSlotChange() {
        this.tabEls = [...this.el.querySelectorAll(getNamespacedTagFor('market-tab'))];
        this.propagateSizeProp(this.size);
    }
    componentWillLoad() {
        this.handleSlotChange();
        this.selectTab(this.selectedTab || this.defaultTab);
    }
    render() {
        return (h(Host, { key: 'a2159152585d6f16a997a913e9044a7139f66ddb', class: "market-tab-list", onKeyDown: this.handleKeyDown.bind(this), role: "tablist" }, h("slot", { key: '45fce6685de615924133dec82799db58f2f6557b', onSlotchange: () => this.handleSlotChange() })));
    }
    static get is() { return "market-tab-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-tab-list.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-tab-list.css"]
        };
    }
    static get properties() {
        return {
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'small' | 'medium' | 'large'",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "undefined"
                        }],
                    "text": "Tabs' size"
                },
                "attribute": "size",
                "reflect": false
            },
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
    static get events() {
        return [{
                "method": "marketTabListSelectedTabChanged",
                "name": "marketTabListSelectedTabChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when a `market-tab` is selected"
                },
                "complexType": {
                    "original": "TMarketTabListSelectedTabChangedEventDetail",
                    "resolved": "{ prevValue: string; value: string; }",
                    "references": {
                        "TMarketTabListSelectedTabChangedEventDetail": {
                            "location": "import",
                            "path": "../../events",
                            "id": "src/components/market-tabs/events.ts::TMarketTabListSelectedTabChangedEventDetail"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "selectedTab",
                "methodName": "tabWatcher"
            }, {
                "propName": "size",
                "methodName": "sizeWatcher"
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
//# sourceMappingURL=market-tab-list.js.map
