'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-37364565.js');
const index$2 = require('./index-254d04f0.js');
const index = require('./index-305c3fd5.js');

/**
 * Helper function to grab default Market color swatches formatted for market-color-picker
 * @returns { string } colorString
 */
function getDefaultMarketColorSwatches() {
    return [
        index.cjs.CORE_BURGUNDY_FILL_COLOR,
        index.cjs.CORE_RED_FILL_COLOR,
        index.cjs.CORE_ORANGE_FILL_COLOR,
        index.cjs.CORE_GOLD_FILL_COLOR,
        index.cjs.CORE_YELLOW_FILL_COLOR,
        index.cjs.CORE_TAUPE_FILL_COLOR,
        index.cjs.CORE_BROWN_FILL_COLOR,
        index.cjs.CORE_FOREST_FILL_COLOR,
        index.cjs.CORE_GREEN_FILL_COLOR,
        index.cjs.CORE_TEAL_FILL_COLOR,
        index.cjs.CORE_BLUE_FILL_COLOR,
        index.cjs.CORE_SKY_FILL_COLOR,
        index.cjs.CORE_PURPLE_FILL_COLOR,
        index.cjs.CORE_PINK_FILL_COLOR,
    ];
}

const marketColorSwatchListCss = ":host{display:grid;grid-template-columns:repeat(auto-fill, var(--color-swatch-width, 40px));grid-gap:var(--color-swatch-list-spacing, 16px)}";
const MarketColorSwatchListStyle0 = marketColorSwatchListCss;

const MarketColorSwatchList = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.marketColorSwatchListValueChange = index$1.createEvent(this, "marketColorSwatchListValueChange", 7);
        this.value = undefined;
    }
    valueWatcher() {
        this.setSelectionFromValue();
    }
    /* Listen for the marketColorSwatchSelectedChange event which is emitted by slotted market-color-swatch elements
    when they are clicked */
    colorSwatchSelectedEventHandler(e) {
        this.handleItemSelectedEvent(e.detail);
    }
    handleItemSelectedEvent(eventInfo) {
        const selectedValue = eventInfo.selected ? eventInfo.value : '';
        if (this.value === selectedValue) {
            return;
        }
        const { defaultPrevented } = this.marketColorSwatchListValueChange.emit({
            value: selectedValue,
            prevValue: this.value,
        });
        if (!defaultPrevented) {
            this.value = selectedValue;
        }
    }
    // After selection, the swatches in the list update their selected state
    setSelectionFromValue() {
        // First check for slotted swatches, otherwise use default in shadow dom
        let items = [
            ...this.el.querySelectorAll(index$2.getNamespacedTagFor('market-color-swatch')),
        ];
        if (items.length === 0) {
            items = [
                ...this.el.shadowRoot.querySelectorAll(index$2.getNamespacedTagFor('market-color-swatch')),
            ];
        }
        items.forEach((item) => (item.selected = this.value === item.value));
    }
    handleSlotChange() {
        this.setSelectionFromValue();
    }
    render() {
        return (index$1.h(index$1.Host, { key: 'ab0de23d5b4ba4357aafd8538968032feef9bb62', class: "market-color-swatch-list", role: "list" }, index$1.h("slot", { key: 'e2e2430fcfa4b89fae3928cac368351c25d1fe61', onSlotchange: () => this.handleSlotChange() }, getDefaultMarketColorSwatches().map((swatchValue) => {
            return index$1.h("market-color-swatch", { value: swatchValue });
        }))));
    }
    get el() { return index$1.getElement(this); }
    static get watchers() { return {
        "value": ["valueWatcher"]
    }; }
};
MarketColorSwatchList.style = MarketColorSwatchListStyle0;

exports.market_color_swatch_list = MarketColorSwatchList;

//# sourceMappingURL=market-color-swatch-list.cjs.entry.js.map