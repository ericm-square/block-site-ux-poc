import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as cjs } from './index3.js';

const marketColorSwatchCss = ":host{position:relative;display:inline-block;width:40px;height:40px;border-radius:50%;background-color:var(--swatch-color);box-shadow:inset 0 0 0 1px rgb(0 0 0 / 15%);transition:box-shadow\n    var(--core-animation-enter-transition-moderate-speed-duration)\n    var(--core-animation-enter-transition-easing)}:host .inner-circle{position:absolute;top:50%;left:50%;width:0;height:0;border:0;border-radius:50%;background-color:white;box-shadow:0 0 0 0 rgb(0 0 0 / 15%);transition:width\n      var(--core-animation-enter-transition-moderate-speed-duration)\n      var(--core-animation-enter-transition-easing),\n      height\n      var(--core-animation-enter-transition-moderate-speed-duration)\n      var(--core-animation-enter-transition-easing),\n      box-shadow\n      var(--core-animation-enter-transition-moderate-speed-duration)\n      var(--core-animation-enter-transition-easing),\n      border\n      var(--core-animation-enter-transition-fast-speed-duration)\n      var(--core-animation-enter-transition-easing);transform:translate(-50%, -50%)}:host(:hover:not([disabled])) .inner-circle{width:8px;height:8px;box-shadow:0 0 0 1px rgb(0 0 0 / 15%)}:host([selected]){box-shadow:inset 0 0 0 2px #006aff}:host([selected]) .inner-circle,:host([selected]:hover) .inner-circle{width:32px;height:32px;border:2px solid white;background-color:transparent;box-shadow:inset 0 0 0 1px rgb(0 0 0 / 15%)}:host(:active:not([disabled])) .inner-circle,:host([selected]:active) .inner-circle{width:16px;height:16px;border:0;background-color:white;box-shadow:0 0 0 1px rgb(0 0 0 / 15%)}:host(:hover:not([disabled])) .inner-circle,:host(:active:not([disabled])) .inner-circle{transition:width var(--core-animation-exit-transition-moderate-speed-duration),\n    height var(--core-animation-exit-transition-moderate-speed-duration),\n    box-shadow var(--core-animation-exit-transition-moderate-speed-duration),\n    border var(--core-animation-exit-transition-fast-speed-duration)}";
const MarketColorSwatchStyle0 = marketColorSwatchCss;

const MarketColorSwatch = /*@__PURE__*/ proxyCustomElement(class MarketColorSwatch extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketColorSwatchSelectedChange = createEvent(this, "marketColorSwatchSelectedChange", 7);
        this.value = cjs.CORE_BLUE_FILL_COLOR;
        this.name = undefined;
        this.disabled = undefined;
        this.selected = false;
    }
    toggleSelection() {
        if (this.disabled) {
            return;
        }
        const newSelection = !this.selected;
        const swatchValue = { value: this.value, selected: newSelection };
        const { defaultPrevented } = this.marketColorSwatchSelectedChange.emit(swatchValue);
        if (!defaultPrevented) {
            this.selected = newSelection;
        }
    }
    render() {
        return (h(Host, { key: 'cdffd64fba69827a9ddd35e01e9c01f1f05f130a', class: "market-color-swatch", role: "listitem", onClick: () => this.toggleSelection(), style: { '--swatch-color': this.value } }, h("div", { key: 'e119468a948e2c977c84d3ade7040d6864e1f7ba', class: "inner-circle" })));
    }
    get el() { return this; }
    static get style() { return MarketColorSwatchStyle0; }
}, [1, "market-color-swatch", {
        "value": [513],
        "name": [513],
        "disabled": [516],
        "selected": [1540]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-color-swatch"];
    components.forEach(tagName => { switch (tagName) {
        case "market-color-swatch":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketColorSwatch);
            }
            break;
    } });
}

export { MarketColorSwatch as M, defineCustomElement as d };

//# sourceMappingURL=market-color-swatch2.js.map