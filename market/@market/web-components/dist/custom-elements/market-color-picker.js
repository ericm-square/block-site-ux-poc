import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { p as parseToHSVA, h as hsvToHex } from './color.js';
import { g as getNamespacedTagFor } from './index2.js';

const marketColorPickerCss = ":host{display:flex;flex-direction:column;gap:var(--color-picker-vertical-spacing)}";
const MarketColorPickerStyle0 = marketColorPickerCss;

const MarketColorPicker$1 = /*@__PURE__*/ proxyCustomElement(class MarketColorPicker extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketColorPickerValueChange = createEvent(this, "marketColorPickerValueChange", 7);
        this.value = undefined;
        this.inputValue = undefined;
    }
    /**
     * Listener for gradient value change. This only fires when the gradient is dragged manually, which currently will only pass a hex value.
     * Since it's a hex value, we know the value will be formatted for inputs.
     * @param event
     */
    gradientValueChange(event) {
        const { detail } = event;
        const { defaultPrevented } = this.marketColorPickerValueChange.emit({
            value: detail.value,
            prevValue: this.value,
        });
        if (!defaultPrevented) {
            this.value = detail.value;
            this.inputValue = detail.value;
            if (this.swatchList) {
                this.swatchList.value = this.value;
            }
            if (this.colorInput) {
                this.colorInput.value = this.inputValue;
            }
        }
    }
    swatchValueChange(event) {
        const { detail } = event;
        const { defaultPrevented } = this.marketColorPickerValueChange.emit({
            value: detail.value,
            prevValue: this.value,
        });
        if (!defaultPrevented) {
            this.inputValue = this.formatInputValue(detail.value);
            this.value = detail.value;
            if (this.gradientPicker) {
                this.gradientPicker.value = this.value;
            }
            if (this.colorInput) {
                this.colorInput.value = this.inputValue;
            }
        }
    }
    inputValueChange(event) {
        const { detail } = event;
        const { defaultPrevented } = this.marketColorPickerValueChange.emit({
            value: detail.value,
            prevValue: this.value,
        });
        if (!defaultPrevented) {
            this.value = detail.value;
            if (this.gradientPicker) {
                this.gradientPicker.value = this.value;
            }
            if (this.swatchList) {
                this.swatchList.value = this.value;
            }
        }
    }
    /**
     * Helper function taking a color string and converting it to Hex if it's in rgba format.
     * @param colorString
     * @returns { string } Hex color string
     */
    formatInputValue(colorString) {
        const parsedValue = parseToHSVA(colorString);
        // If it is a valid color format, convert to hex
        if (parsedValue.colorType && parsedValue.colorType !== 'hexa') {
            return `#${hsvToHex(parsedValue.values[0], parsedValue.values[1], parsedValue.values[2]).join('')}`;
        }
        return colorString;
    }
    setSubcomponentValues() {
        this.gradientPicker = this.el.querySelector(getNamespacedTagFor('market-color-picker-gradient'));
        this.swatchList = this.el.querySelector(getNamespacedTagFor('market-color-swatch-list'));
        this.colorInput = this.el.querySelector(getNamespacedTagFor('market-color-picker-input'));
        if (this.gradientPicker) {
            this.gradientPicker.value = this.value;
        }
        if (this.swatchList) {
            this.swatchList.value = this.value;
        }
        if (this.colorInput) {
            this.colorInput.value = this.inputValue;
        }
    }
    handleSlotChange() {
        this.setSubcomponentValues();
    }
    componentWillLoad() {
        this.inputValue = this.formatInputValue(this.value);
    }
    componentDidLoad() {
        this.setSubcomponentValues();
    }
    render() {
        return (h(Host, { key: '928249a34e21a700eb7d1ddfe495f395a68c647c', class: "market-color-picker" }, h("slot", { key: '0624906ac6684321a6a74638299afd90d44fc12c', onSlotchange: () => this.handleSlotChange() })));
    }
    get el() { return this; }
    static get style() { return MarketColorPickerStyle0; }
}, [1, "market-color-picker", {
        "value": [1537],
        "inputValue": [32]
    }, [[0, "marketColorPickerGradientValueChange", "gradientValueChange"], [0, "marketColorSwatchListValueChange", "swatchValueChange"], [0, "marketColorPickerInputValueChange", "inputValueChange"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-color-picker"];
    components.forEach(tagName => { switch (tagName) {
        case "market-color-picker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketColorPicker$1);
            }
            break;
    } });
}

const MarketColorPicker = MarketColorPicker$1;
const defineCustomElement = defineCustomElement$1;

export { MarketColorPicker, defineCustomElement };

//# sourceMappingURL=market-color-picker.js.map