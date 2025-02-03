import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';
import { c as cjs } from './index3.js';
import { d as defineCustomElement$2 } from './market-color-swatch2.js';

/**
 * Helper function to grab default Market color swatches formatted for market-color-picker
 * @returns { string } colorString
 */
function getDefaultMarketColorSwatches() {
    return [
        cjs.CORE_BURGUNDY_FILL_COLOR,
        cjs.CORE_RED_FILL_COLOR,
        cjs.CORE_ORANGE_FILL_COLOR,
        cjs.CORE_GOLD_FILL_COLOR,
        cjs.CORE_YELLOW_FILL_COLOR,
        cjs.CORE_TAUPE_FILL_COLOR,
        cjs.CORE_BROWN_FILL_COLOR,
        cjs.CORE_FOREST_FILL_COLOR,
        cjs.CORE_GREEN_FILL_COLOR,
        cjs.CORE_TEAL_FILL_COLOR,
        cjs.CORE_BLUE_FILL_COLOR,
        cjs.CORE_SKY_FILL_COLOR,
        cjs.CORE_PURPLE_FILL_COLOR,
        cjs.CORE_PINK_FILL_COLOR,
    ];
}

const marketColorSwatchListCss = ":host{display:grid;grid-template-columns:repeat(auto-fill, var(--color-swatch-width, 40px));grid-gap:var(--color-swatch-list-spacing, 16px)}";
const MarketColorSwatchListStyle0 = marketColorSwatchListCss;

const MarketColorSwatchList$1 = /*@__PURE__*/ proxyCustomElement(class MarketColorSwatchList extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketColorSwatchListValueChange = createEvent(this, "marketColorSwatchListValueChange", 7);
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
            ...this.el.querySelectorAll(getNamespacedTagFor('market-color-swatch')),
        ];
        if (items.length === 0) {
            items = [
                ...this.el.shadowRoot.querySelectorAll(getNamespacedTagFor('market-color-swatch')),
            ];
        }
        items.forEach((item) => (item.selected = this.value === item.value));
    }
    handleSlotChange() {
        this.setSelectionFromValue();
    }
    render() {
        return (h(Host, { key: 'ab0de23d5b4ba4357aafd8538968032feef9bb62', class: "market-color-swatch-list", role: "list" }, h("slot", { key: 'e2e2430fcfa4b89fae3928cac368351c25d1fe61', onSlotchange: () => this.handleSlotChange() }, getDefaultMarketColorSwatches().map((swatchValue) => {
            return h("market-color-swatch", { value: swatchValue });
        }))));
    }
    get el() { return this; }
    static get watchers() { return {
        "value": ["valueWatcher"]
    }; }
    static get style() { return MarketColorSwatchListStyle0; }
}, [1, "market-color-swatch-list", {
        "value": [1537]
    }, [[0, "marketColorSwatchSelectedChange", "colorSwatchSelectedEventHandler"]], {
        "value": ["valueWatcher"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-color-swatch-list", "market-color-swatch"];
    components.forEach(tagName => { switch (tagName) {
        case "market-color-swatch-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketColorSwatchList$1);
            }
            break;
        case "market-color-swatch":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const MarketColorSwatchList = MarketColorSwatchList$1;
const defineCustomElement = defineCustomElement$1;

export { MarketColorSwatchList, defineCustomElement };

//# sourceMappingURL=market-color-swatch-list.js.map