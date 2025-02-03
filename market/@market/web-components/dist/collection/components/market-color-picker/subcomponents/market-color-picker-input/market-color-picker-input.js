import { Host, h } from "@stencil/core";
import { pencilWritingIcon } from "./icons";
import { getNamespacedTagFor } from "../../../../utils/namespace";
import { parseToHSVA } from "../../../../utils/color";
export class MarketColorPickerInput {
    constructor() {
        this.value = undefined;
    }
    displayLeadingAccessory() {
        const MarketColorSwatchTagName = getNamespacedTagFor('market-color-swatch');
        const parsedValue = parseToHSVA(this.value);
        // If invalid, this will be null
        if (parsedValue.values) {
            return h(MarketColorSwatchTagName, { value: this.value, disabled: true });
        }
        // otherwise return default icon
        return h("div", { class: "color-picker-input-icon" }, pencilWritingIcon());
    }
    inputValueChange(event) {
        const { detail } = event;
        const prevValue = this.value;
        // Format for hexadecimal if required
        this.formatAndUpdateValue(detail.value);
        const { defaultPrevented } = this.marketColorPickerInputValueChange.emit({ prevValue, value: this.value });
        if (defaultPrevented) {
            this.value = prevValue;
        }
    }
    formatAndUpdateValue(value = this.value) {
        if (!value)
            return;
        let updatedValue = value;
        if (updatedValue[0] !== '#') {
            updatedValue = `#${updatedValue}`;
        }
        this.value = updatedValue;
    }
    componentWillLoad() {
        this.formatAndUpdateValue();
    }
    render() {
        const MarketInputTextTagName = getNamespacedTagFor('market-input-text');
        return (h(Host, { key: '065ff7a8b9ec8a397dd945737ab77d7c465b996f', class: "market-color-picker-input" }, h(MarketInputTextTagName, { key: '06608611fe126161506d8145d7a09de10b2dd02e', value: this.value, id: 'color-picker-input-text', maxlength: 7 }, h("div", { key: '442ad70d982f86c5869004670b47132b670666a4', slot: "leading-accessory" }, this.displayLeadingAccessory()), h("label", { key: '6e69242ce7ad59e3d099492a0898aa919dac643c', htmlFor: "color-picker-input-text" }, h("slot", { key: '3fe01f07c3f4fadf32d5aef7809d46919a1f4b72', name: "label" }, "Hex")), h("slot", { key: 'ebc1477530d21b20038b69557d5aabd9343d8d9f' }))));
    }
    static get is() { return "market-color-picker-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-color-picker-input.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-color-picker-input.css"]
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
                    "text": "Value representing the color shown on the input.\nThis should be in a hexadecimal format (i.e. #ABC123), similarly to native HTML color inputs."
                },
                "attribute": "value",
                "reflect": true
            }
        };
    }
    static get events() {
        return [{
                "method": "marketColorPickerInputValueChange",
                "name": "marketColorPickerInputValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the color picker input value changes."
                },
                "complexType": {
                    "original": "{ prevValue: string; value: string }",
                    "resolved": "{ prevValue: string; value: string; }",
                    "references": {}
                }
            }];
    }
    static get listeners() {
        return [{
                "name": "marketInputValueChange",
                "method": "inputValueChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-color-picker-input.js.map
