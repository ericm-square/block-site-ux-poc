'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const index$1 = require('./index-254d04f0.js');

const marketTabListCss = ":host{position:relative;display:flex}:host::after{content:\"\";position:absolute;bottom:0;left:0;display:block;width:100%;height:var(--tabs-list-bottom-border-size, 1px);background-color:var(--tabs-list-bottom-border-color, var(--core-divider-20-color))}:host(:not([size])),:host([size=\"small\"]),:host([size=\"medium\"]){gap:var(--tabs-list-medium-size-horizontal-spacing, var(--core-metrics-spacing-200))}:host([size=\"large\"]){gap:var(--tabs-list-large-size-horizontal-spacing, var(--core-metrics-spacing-300))}";
const MarketTabListStyle0 = marketTabListCss;

const MarketTabList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketTabListSelectedTabChanged = index.createEvent(this, "marketTabListSelectedTabChanged", 7);
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
        this.tabEls = [...this.el.querySelectorAll(index$1.getNamespacedTagFor('market-tab'))];
        this.propagateSizeProp(this.size);
    }
    componentWillLoad() {
        this.handleSlotChange();
        this.selectTab(this.selectedTab || this.defaultTab);
    }
    render() {
        return (index.h(index.Host, { key: 'a2159152585d6f16a997a913e9044a7139f66ddb', class: "market-tab-list", onKeyDown: this.handleKeyDown.bind(this), role: "tablist" }, index.h("slot", { key: '45fce6685de615924133dec82799db58f2f6557b', onSlotchange: () => this.handleSlotChange() })));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "selectedTab": ["tabWatcher"],
        "size": ["sizeWatcher"]
    }; }
};
MarketTabList.style = MarketTabListStyle0;

exports.market_tab_list = MarketTabList;

//# sourceMappingURL=market-tab-list.cjs.entry.js.map