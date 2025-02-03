import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../utils/namespace";
import { v4 as uuid } from "uuid";
/**
 * @slot - The form input, ex. market-input-text.
 * @slot error - Optional error text for the block, displayed below the input when invalid.
 * @slot bottom-accessory - Optional content for the block, displayed below the input.
 * @slot action - Optional action component for the block, displayed below the input.
 */
export class MarketField {
    constructor() {
        this.errorSlotId = uuid();
        this.name = undefined;
        this.readonly = false;
        this.disabled = false;
        this.invalid = false;
    }
    getSlottedInputs() {
        const supportedInputTags = [
            getNamespacedTagFor('market-input-text'),
            getNamespacedTagFor('market-input-password'),
            getNamespacedTagFor('market-select'),
            getNamespacedTagFor('market-textarea'),
            getNamespacedTagFor('market-code-input'),
        ];
        // create flattened array of slotted supported input elements based on tag name
        const slottedInputElements = supportedInputTags.flatMap((tag) => {
            return [
                ...this.el.getElementsByTagName(tag),
            ];
        });
        return slottedInputElements;
    }
    getErrorSlot() {
        return this.el.querySelector('[slot="error"]');
    }
    getBottomAccessorySlot() {
        return this.el.querySelector('[slot="bottom-accessory"]');
    }
    getInputElAriaDescribedby() {
        const describedBy = [];
        if (this.getErrorSlot()) {
            describedBy.push(`${this.errorSlotId}-error`);
        }
        if (this.getBottomAccessorySlot()) {
            describedBy.push(`${this.errorSlotId}-bottom-accessory`);
        }
        return describedBy.join(' ');
    }
    handleErrorAttributes() {
        const errorSlotEl = this.getErrorSlot();
        if (errorSlotEl) {
            errorSlotEl.setAttribute('role', 'alert');
            errorSlotEl.setAttribute('id', `${this.errorSlotId}-error`);
        }
    }
    handleBottomAccessoryAttributes() {
        const bottomAccessorySlotEl = this.getBottomAccessorySlot();
        if (bottomAccessorySlotEl) {
            bottomAccessorySlotEl.setAttribute('id', `${this.errorSlotId}-bottom-accessory`);
        }
    }
    render() {
        // check for slotted supported market inputs and pass properties down
        this.getSlottedInputs().forEach((input) => {
            input.name = this.name;
            input.disabled = this.disabled;
            input.invalid = this.invalid;
            input.readonly = this.readonly;
            const inputElAriaDescribedby = this.getInputElAriaDescribedby();
            if (inputElAriaDescribedby) {
                input.setAttribute('aria-describedby', inputElAriaDescribedby);
            }
        });
        return (h(Host, { key: '7abe30582756b2b385dcb2a11fb8027a4b3fe9e9', class: "market-field" }, h("slot", { key: 'eaa6676be67540025cce0721382111d9149fe7ea' }), this.invalid && !this.disabled && (
        // slot relocation broke in @stencil/core@1.13.0
        // wrapping a slot in a shadowless div as a workaround
        // this should be fixed in 2.1.1
        h("div", { key: '736cbd69cbce0bb6aa2bc345c078082d6dc04ce4' }, h("slot", { key: '902c9a1ddff740365332f129d1935966d4c082a0', name: "error", onSlotchange: () => this.handleErrorAttributes() }))), h("slot", { key: 'ea8a27036ae7d823703b534e4b8c0bd21dab50ce', name: "bottom-accessory", onSlotchange: () => this.handleBottomAccessoryAttributes() }), h("slot", { key: '40922f28c8231b3e13fae355a90585f5635d01e9', name: "action" })));
    }
    static get is() { return "market-field"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-field.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-field.css"]
        };
    }
    static get properties() {
        return {
            "name": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A string specifying a name for the field."
                },
                "attribute": "name",
                "reflect": true
            },
            "readonly": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A boolean representing whether the field is readonly or not."
                },
                "attribute": "readonly",
                "reflect": true,
                "defaultValue": "false"
            },
            "disabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A boolean representing whether the field is disabled or not.\nThis visually and functionally will disable the field."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "invalid": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A boolean representing whether the field is invalid or not.\nThis represents error states."
                },
                "attribute": "invalid",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-field.js.map
