import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';

const marketTabListCss = ":host{position:relative;display:flex}:host::after{content:\"\";position:absolute;bottom:0;left:0;display:block;width:100%;height:var(--tabs-list-bottom-border-size, 1px);background-color:var(--tabs-list-bottom-border-color, var(--core-divider-20-color))}:host(:not([size])),:host([size=\"small\"]),:host([size=\"medium\"]){gap:var(--tabs-list-medium-size-horizontal-spacing, var(--core-metrics-spacing-200))}:host([size=\"large\"]){gap:var(--tabs-list-large-size-horizontal-spacing, var(--core-metrics-spacing-300))}";
const MarketTabListStyle0 = marketTabListCss;

const MarketTabList$1 = /*@__PURE__*/ proxyCustomElement(class MarketTabList extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketTabListSelectedTabChanged = createEvent(this, "marketTabListSelectedTabChanged", 7);
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
    get el() { return this; }
    static get watchers() { return {
        "selectedTab": ["tabWatcher"],
        "size": ["sizeWatcher"]
    }; }
    static get style() { return MarketTabListStyle0; }
}, [1, "market-tab-list", {
        "size": [1],
        "selectedTab": [1537, "selected-tab"],
        "defaultTab": [1, "default-tab"]
    }, [[0, "marketTabSelectedChanged", "marketTabSelectedChangedEventHandler"]], {
        "selectedTab": ["tabWatcher"],
        "size": ["sizeWatcher"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-tab-list"];
    components.forEach(tagName => { switch (tagName) {
        case "market-tab-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketTabList$1);
            }
            break;
    } });
}

const MarketTabList = MarketTabList$1;
const defineCustomElement = defineCustomElement$1;

export { MarketTabList, defineCustomElement };

//# sourceMappingURL=market-tab-list.js.map