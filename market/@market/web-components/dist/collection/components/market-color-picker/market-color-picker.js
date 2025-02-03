import { Host, h } from "@stencil/core";
import { hsvToHex, parseToHSVA } from "../../utils/color";
import { getNamespacedTagFor } from "../../utils/namespace";
export class MarketColorPicker {
    constructor() {
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
    static get is() { return "market-color-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-color-picker.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-color-picker.css"]
        };
    }
    static get properties() {
        return {
            "value": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Value representing the color shown on the color picker."
                },
                "attribute": "value",
                "reflect": true
            }
        };
    }
    static get states() {
        return {
            "inputValue": {}
        };
    }
    static get events() {
        return [{
                "method": "marketColorPickerValueChange",
                "name": "marketColorPickerValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the color picker selection state changes."
                },
                "complexType": {
                    "original": "{ value: string; prevValue: string }",
                    "resolved": "{ value: string; prevValue: string; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "marketColorPickerGradientValueChange",
                "method": "gradientValueChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketColorSwatchListValueChange",
                "method": "swatchValueChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketColorPickerInputValueChange",
                "method": "inputValueChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-color-picker.js.map
