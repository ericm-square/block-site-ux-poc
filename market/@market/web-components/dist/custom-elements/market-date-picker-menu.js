import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { M as MENU_SLOT_NAMES } from './menu.js';
import { g as getNamespacedTagFor } from './index2.js';

const marketDatePickerMenuCss = ":host{display:block;margin-right:var(--date-picker-menu-horizontal-spacing);font-weight:var(--date-picker-menu-text-weight);font-size:var(--date-picker-menu-text-size);line-height:var(--date-picker-menu-text-leading)}:host>.market-list>.market-row{min-height:var(--date-picker-menu-row-height);padding:0 12px}:host>.market-list>.market-row::before{content:none}:host>.market-list>.market-row::part(container){padding-right:0;padding-left:0}:host>.market-list>.market-row[selected]{color:var(--date-picker-menu-row-label-selected-state-text-color)}@media only screen and (max-width: 800px){:host{margin-right:0}:host>.market-list>.market-row{width:inherit}}";
const MarketDatePickerMenuStyle0 = marketDatePickerMenuCss;

const MarketDatePickerMenu$1 = /*@__PURE__*/ proxyCustomElement(class MarketDatePickerMenu extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketDatePickerMenuSelectionChanged = createEvent(this, "marketDatePickerMenuSelectionChanged", 7);
        this.timeframe = 'present';
        this.excludeMenuItems = '';
        this.presetMenuOption = undefined;
    }
    handleMarketListSelectionsDidChange(e) {
        e.stopPropagation();
        this.marketDatePickerMenuSelectionChanged.emit({
            menuSelection: e.detail.newSelectionValue,
        });
    }
    /**
     * Method to visually select Custom row for use by the date picker component
     * (internal use only)
     */
    _selectCustomRow() {
        const MarketRowTagName = getNamespacedTagFor('market-row');
        this.el.shadowRoot.querySelectorAll(MarketRowTagName).forEach((row) => {
            if (row.querySelector('slot').name === MENU_SLOT_NAMES.CUSTOM) {
                row.click();
            }
        });
        return Promise.resolve();
    }
    render() {
        const MarketListTagName = getNamespacedTagFor('market-list');
        const MarketRowTagName = getNamespacedTagFor('market-row');
        const excludedItems = this.excludeMenuItems.split(',');
        return (h(Host, { key: '6090ec920f710ad17233bc061600f108bc13fff6', class: "market-date-picker-menu" }, h(MarketListTagName, { key: '3473a573abe914accc731ff4d97cfe166248087c', interactive: true }, this.timeframe !== 'past' && !excludedItems.includes(MENU_SLOT_NAMES.TODAY) && (h(MarketRowTagName, { key: 'eedc051737dc15a743af020751cef2c37271bff7', value: MENU_SLOT_NAMES.TODAY, selected: this.presetMenuOption === MENU_SLOT_NAMES.TODAY }, h("slot", { key: 'd782a493549f936b7a71c9ecd39ff67ad1c88d70', name: MENU_SLOT_NAMES.TODAY }, "Today"))), this.timeframe !== 'future' && !excludedItems.includes(MENU_SLOT_NAMES.YESTERDAY) && (h(MarketRowTagName, { key: '72521a7e96473e55de174166ff6afa46fd383f2f', value: MENU_SLOT_NAMES.YESTERDAY, selected: this.presetMenuOption === MENU_SLOT_NAMES.YESTERDAY }, h("slot", { key: 'db259f0d8269deb3fad87b4b2bcad6cd9867034c', name: MENU_SLOT_NAMES.YESTERDAY }, "Yesterday"))), this.timeframe !== 'past' && !excludedItems.includes(MENU_SLOT_NAMES.THIS_WEEK) && (h(MarketRowTagName, { key: '8660bc56922d1e2bcd14269659bd462749eba341', value: MENU_SLOT_NAMES.THIS_WEEK, selected: this.presetMenuOption === MENU_SLOT_NAMES.THIS_WEEK }, h("slot", { key: 'dfeb980290086dcc8d8f7201502239bbd51fa260', name: MENU_SLOT_NAMES.THIS_WEEK }, "This week"))), this.timeframe !== 'future' && !excludedItems.includes(MENU_SLOT_NAMES.LAST_WEEK) && (h(MarketRowTagName, { key: '776ed0ad2290ec60c57a55f9ae4010754c8c4acb', value: MENU_SLOT_NAMES.LAST_WEEK, selected: this.presetMenuOption === MENU_SLOT_NAMES.LAST_WEEK }, h("slot", { key: '9409f941203c9c46135301df12375494b3f3f28d', name: MENU_SLOT_NAMES.LAST_WEEK }, "Last week"))), this.timeframe !== 'past' && !excludedItems.includes(MENU_SLOT_NAMES.THIS_MONTH) && (h(MarketRowTagName, { key: 'fc732ad76d322f0ad329880e6603132917deb408', value: MENU_SLOT_NAMES.THIS_MONTH, selected: this.presetMenuOption === MENU_SLOT_NAMES.THIS_MONTH }, h("slot", { key: '43ffecd94558b942b89c55876591e0cbe2f66d86', name: MENU_SLOT_NAMES.THIS_MONTH }, "This month"))), this.timeframe !== 'future' && !excludedItems.includes(MENU_SLOT_NAMES.LAST_MONTH) && (h(MarketRowTagName, { key: 'e0ee3686874390121ac5d869eb0c913845ee4ad7', value: MENU_SLOT_NAMES.LAST_MONTH, selected: this.presetMenuOption === MENU_SLOT_NAMES.LAST_MONTH }, h("slot", { key: 'b1f4ebffed7e3c4e7a7694b092d6e9aac358d81b', name: MENU_SLOT_NAMES.LAST_MONTH }, "Last month"))), this.timeframe !== 'past' && !excludedItems.includes(MENU_SLOT_NAMES.THIS_YEAR) && (h(MarketRowTagName, { key: 'cfadc74f7f5dc2e690069586e32741b0cf0cccfe', value: MENU_SLOT_NAMES.THIS_YEAR, selected: this.presetMenuOption === MENU_SLOT_NAMES.THIS_YEAR }, h("slot", { key: 'bfc37f3ddc5714a1f3712659f84bac997e6e342b', name: MENU_SLOT_NAMES.THIS_YEAR }, "This year"))), this.timeframe !== 'future' && !excludedItems.includes(MENU_SLOT_NAMES.LAST_YEAR) && (h(MarketRowTagName, { key: 'e78f7a5172c0bfb5981a7406b4c72f97ea982fea', value: MENU_SLOT_NAMES.LAST_YEAR, selected: this.presetMenuOption === MENU_SLOT_NAMES.LAST_YEAR }, h("slot", { key: 'ef34c7825b2caff5958fb3555bb2f7acd9345876', name: MENU_SLOT_NAMES.LAST_YEAR }, "Last year"))), !excludedItems.includes(MENU_SLOT_NAMES.CUSTOM) && (h(MarketRowTagName, { key: 'b21974f32253bf276e7338a6cfabcdcbdfbe0c88', value: MENU_SLOT_NAMES.CUSTOM, selected: this.presetMenuOption === MENU_SLOT_NAMES.CUSTOM }, h("slot", { key: '4c6281b3a79f0d24d278b023fe52449b459bac11', name: MENU_SLOT_NAMES.CUSTOM }, "Custom"))))));
    }
    get el() { return this; }
    static get style() { return MarketDatePickerMenuStyle0; }
}, [1, "market-date-picker-menu", {
        "timeframe": [513],
        "excludeMenuItems": [1, "exclude-menu-items"],
        "presetMenuOption": [1, "preset-menu-option"],
        "_selectCustomRow": [64]
    }, [[0, "marketListSelectionsDidChange", "handleMarketListSelectionsDidChange"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-date-picker-menu"];
    components.forEach(tagName => { switch (tagName) {
        case "market-date-picker-menu":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketDatePickerMenu$1);
            }
            break;
    } });
}

const MarketDatePickerMenu = MarketDatePickerMenu$1;
const defineCustomElement = defineCustomElement$1;

export { MarketDatePickerMenu, defineCustomElement };

//# sourceMappingURL=market-date-picker-menu.js.map