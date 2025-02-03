'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const menu = require('./menu-9896e1fb.js');
const index$1 = require('./index-254d04f0.js');

const marketDatePickerMenuCss = ":host{display:block;margin-right:var(--date-picker-menu-horizontal-spacing);font-weight:var(--date-picker-menu-text-weight);font-size:var(--date-picker-menu-text-size);line-height:var(--date-picker-menu-text-leading)}:host>.market-list>.market-row{min-height:var(--date-picker-menu-row-height);padding:0 12px}:host>.market-list>.market-row::before{content:none}:host>.market-list>.market-row::part(container){padding-right:0;padding-left:0}:host>.market-list>.market-row[selected]{color:var(--date-picker-menu-row-label-selected-state-text-color)}@media only screen and (max-width: 800px){:host{margin-right:0}:host>.market-list>.market-row{width:inherit}}";
const MarketDatePickerMenuStyle0 = marketDatePickerMenuCss;

const MarketDatePickerMenu = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketDatePickerMenuSelectionChanged = index.createEvent(this, "marketDatePickerMenuSelectionChanged", 7);
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
        const MarketRowTagName = index$1.getNamespacedTagFor('market-row');
        this.el.shadowRoot.querySelectorAll(MarketRowTagName).forEach((row) => {
            if (row.querySelector('slot').name === menu.MENU_SLOT_NAMES.CUSTOM) {
                row.click();
            }
        });
        return Promise.resolve();
    }
    render() {
        const MarketListTagName = index$1.getNamespacedTagFor('market-list');
        const MarketRowTagName = index$1.getNamespacedTagFor('market-row');
        const excludedItems = this.excludeMenuItems.split(',');
        return (index.h(index.Host, { key: '6090ec920f710ad17233bc061600f108bc13fff6', class: "market-date-picker-menu" }, index.h(MarketListTagName, { key: '3473a573abe914accc731ff4d97cfe166248087c', interactive: true }, this.timeframe !== 'past' && !excludedItems.includes(menu.MENU_SLOT_NAMES.TODAY) && (index.h(MarketRowTagName, { key: 'eedc051737dc15a743af020751cef2c37271bff7', value: menu.MENU_SLOT_NAMES.TODAY, selected: this.presetMenuOption === menu.MENU_SLOT_NAMES.TODAY }, index.h("slot", { key: 'd782a493549f936b7a71c9ecd39ff67ad1c88d70', name: menu.MENU_SLOT_NAMES.TODAY }, "Today"))), this.timeframe !== 'future' && !excludedItems.includes(menu.MENU_SLOT_NAMES.YESTERDAY) && (index.h(MarketRowTagName, { key: '72521a7e96473e55de174166ff6afa46fd383f2f', value: menu.MENU_SLOT_NAMES.YESTERDAY, selected: this.presetMenuOption === menu.MENU_SLOT_NAMES.YESTERDAY }, index.h("slot", { key: 'db259f0d8269deb3fad87b4b2bcad6cd9867034c', name: menu.MENU_SLOT_NAMES.YESTERDAY }, "Yesterday"))), this.timeframe !== 'past' && !excludedItems.includes(menu.MENU_SLOT_NAMES.THIS_WEEK) && (index.h(MarketRowTagName, { key: '8660bc56922d1e2bcd14269659bd462749eba341', value: menu.MENU_SLOT_NAMES.THIS_WEEK, selected: this.presetMenuOption === menu.MENU_SLOT_NAMES.THIS_WEEK }, index.h("slot", { key: 'dfeb980290086dcc8d8f7201502239bbd51fa260', name: menu.MENU_SLOT_NAMES.THIS_WEEK }, "This week"))), this.timeframe !== 'future' && !excludedItems.includes(menu.MENU_SLOT_NAMES.LAST_WEEK) && (index.h(MarketRowTagName, { key: '776ed0ad2290ec60c57a55f9ae4010754c8c4acb', value: menu.MENU_SLOT_NAMES.LAST_WEEK, selected: this.presetMenuOption === menu.MENU_SLOT_NAMES.LAST_WEEK }, index.h("slot", { key: '9409f941203c9c46135301df12375494b3f3f28d', name: menu.MENU_SLOT_NAMES.LAST_WEEK }, "Last week"))), this.timeframe !== 'past' && !excludedItems.includes(menu.MENU_SLOT_NAMES.THIS_MONTH) && (index.h(MarketRowTagName, { key: 'fc732ad76d322f0ad329880e6603132917deb408', value: menu.MENU_SLOT_NAMES.THIS_MONTH, selected: this.presetMenuOption === menu.MENU_SLOT_NAMES.THIS_MONTH }, index.h("slot", { key: '43ffecd94558b942b89c55876591e0cbe2f66d86', name: menu.MENU_SLOT_NAMES.THIS_MONTH }, "This month"))), this.timeframe !== 'future' && !excludedItems.includes(menu.MENU_SLOT_NAMES.LAST_MONTH) && (index.h(MarketRowTagName, { key: 'e0ee3686874390121ac5d869eb0c913845ee4ad7', value: menu.MENU_SLOT_NAMES.LAST_MONTH, selected: this.presetMenuOption === menu.MENU_SLOT_NAMES.LAST_MONTH }, index.h("slot", { key: 'b1f4ebffed7e3c4e7a7694b092d6e9aac358d81b', name: menu.MENU_SLOT_NAMES.LAST_MONTH }, "Last month"))), this.timeframe !== 'past' && !excludedItems.includes(menu.MENU_SLOT_NAMES.THIS_YEAR) && (index.h(MarketRowTagName, { key: 'cfadc74f7f5dc2e690069586e32741b0cf0cccfe', value: menu.MENU_SLOT_NAMES.THIS_YEAR, selected: this.presetMenuOption === menu.MENU_SLOT_NAMES.THIS_YEAR }, index.h("slot", { key: 'bfc37f3ddc5714a1f3712659f84bac997e6e342b', name: menu.MENU_SLOT_NAMES.THIS_YEAR }, "This year"))), this.timeframe !== 'future' && !excludedItems.includes(menu.MENU_SLOT_NAMES.LAST_YEAR) && (index.h(MarketRowTagName, { key: 'e78f7a5172c0bfb5981a7406b4c72f97ea982fea', value: menu.MENU_SLOT_NAMES.LAST_YEAR, selected: this.presetMenuOption === menu.MENU_SLOT_NAMES.LAST_YEAR }, index.h("slot", { key: 'ef34c7825b2caff5958fb3555bb2f7acd9345876', name: menu.MENU_SLOT_NAMES.LAST_YEAR }, "Last year"))), !excludedItems.includes(menu.MENU_SLOT_NAMES.CUSTOM) && (index.h(MarketRowTagName, { key: 'b21974f32253bf276e7338a6cfabcdcbdfbe0c88', value: menu.MENU_SLOT_NAMES.CUSTOM, selected: this.presetMenuOption === menu.MENU_SLOT_NAMES.CUSTOM }, index.h("slot", { key: '4c6281b3a79f0d24d278b023fe52449b459bac11', name: menu.MENU_SLOT_NAMES.CUSTOM }, "Custom"))))));
    }
    get el() { return index.getElement(this); }
};
MarketDatePickerMenu.style = MarketDatePickerMenuStyle0;

exports.market_date_picker_menu = MarketDatePickerMenu;

//# sourceMappingURL=market-date-picker-menu.cjs.entry.js.map