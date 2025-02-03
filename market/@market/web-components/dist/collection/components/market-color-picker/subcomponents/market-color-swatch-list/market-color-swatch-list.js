import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../../../utils/namespace";
import { getDefaultMarketColorSwatches } from "../../utils";
export class MarketColorSwatchList {
    constructor() {
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
    static get is() { return "market-color-swatch-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-color-swatch-list.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-color-swatch-list.css"]
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
                    "text": "A string specifying a value for the list.\nFor a color swatch to be selected, this value should match the swatch's value.\nNote: all color swatch values slotted in must be **unique**!\nAn empty string, or '', will clear the selection."
                },
                "attribute": "value",
                "reflect": true
            }
        };
    }
    static get events() {
        return [{
                "method": "marketColorSwatchListValueChange",
                "name": "marketColorSwatchListValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever an item is selected or deselected."
                },
                "complexType": {
                    "original": "{ value: string; prevValue: string }",
                    "resolved": "{ value: string; prevValue: string; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "valueWatcher"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketColorSwatchSelectedChange",
                "method": "colorSwatchSelectedEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-color-swatch-list.js.map
