import { SEGMENTED_CONTROL_PADDING_HORIZONTAL } from "@market/market-theme/js/cjs/index.js";
import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../utils/namespace";
function isValueEmpty(value) {
    return value === '' || value === ' ' || value === null || value === undefined;
}
export class MarketSegmentedControl {
    constructor() {
        this.items = undefined;
        this.value = '';
        this.disabled = false;
    }
    valueWatcher() {
        this.setSelectionsFromValue();
    }
    /**
     * If a segment gets slotted in, set the value to match that of the row
     */
    disabledChangeHandler() {
        var _a;
        (_a = this.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => (item.disabled = this.disabled));
    }
    /**
     * Select item that corresponds to passed value, or clear all values if value is empty string.
     */
    setSelectionsFromValue() {
        var _a;
        (_a = this.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            if (this.value === item.value) {
                item.setSelectedState(true);
                this.setSliderPosition(item);
            }
            else {
                item.setSelectedState(false);
            }
        });
    }
    /**
     * Sets the initial state of the segmented-control by updating and propagating props and setting
     * default value.
     */
    setInternalState() {
        this.items = this.el.querySelectorAll(`${getNamespacedTagFor('market-segment')}`);
        this.selectedSlider = this.el.shadowRoot.getElementById('selected-slider');
        if (this.items.length > 0) {
            if (isValueEmpty(this.value)) {
                this.value = this.items[0].value;
            }
            this.setSelectionsFromValue();
        }
    }
    /**
     * Sets slider size to be the size of a segment
     */
    setSliderSize() {
        var _a;
        this.el.style.setProperty('--selected-slider-width', `calc(${100 / ((_a = this.items) === null || _a === void 0 ? void 0 : _a.length)}% - ${SEGMENTED_CONTROL_PADDING_HORIZONTAL * 2}px)`);
    }
    /**
     * Sets slider position (left offset) based on the currently selected item
     */
    setSliderPosition(selectedItem = undefined) {
        if (!selectedItem) {
            this.el.style.setProperty('--selected-slider-left', `${SEGMENTED_CONTROL_PADDING_HORIZONTAL}px`);
            return;
        }
        const newSelectionIndex = [...this.items].indexOf(selectedItem);
        this.el.style.setProperty('--selected-slider-left', `calc(${(newSelectionIndex / this.items.length) * 100}% + ${SEGMENTED_CONTROL_PADDING_HORIZONTAL}px)`);
    }
    /**
     * Sets the initial state of the segmented-control by updating and propagating props and setting
     * default value.
     */
    defaultSlotchangeHandler() {
        this.setInternalState();
        this.setSliderSize();
    }
    marketSegmentSelectedEventHandler(e) {
        const newSelection = e.target;
        const prevSelection = this.el.querySelector(`${getNamespacedTagFor('market-segment')}[selected]`);
        prevSelection === null || prevSelection === void 0 ? void 0 : prevSelection.setSelectedState(false);
        newSelection.setSelectedState(true);
        this.setSliderPosition(newSelection);
        this.marketSegmentedSelectionDidChange.emit({
            selectedSegment: newSelection,
            selectedSegmentValue: newSelection.value,
            deselectedSegment: prevSelection,
            deselectedSegmentValue: prevSelection === null || prevSelection === void 0 ? void 0 : prevSelection.value,
        });
    }
    render() {
        return (h(Host, { key: '9b4e2e05d111b43b02ad003f5ff57f9f65afa610', class: "market-segmented-control" }, h("slot", { key: '25608a3e24e8bfff6d9683db3a92553cffb896e0', onSlotchange: () => this.defaultSlotchangeHandler() })));
    }
    static get is() { return "market-segmented-control"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-segmented-control.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-segmented-control.css"]
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
                    "text": "A string specifying a value for the segmented-control.\nThis value determines which segment is selected based on the segment value."
                },
                "attribute": "value",
                "reflect": true,
                "defaultValue": "''"
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
                    "text": "A boolean representing whether the market-segmented-control is disabled or not.\nThis visually and functionally will disable the control area."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "items": {}
        };
    }
    static get events() {
        return [{
                "method": "marketSegmentedSelectionDidChange",
                "name": "marketSegmentedSelectionDidChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the a new segment is selected"
                },
                "complexType": {
                    "original": "{\n    selectedSegment: HTMLMarketSegmentElement;\n    selectedSegmentValue: string;\n    deselectedSegment: HTMLMarketSegmentElement;\n    deselectedSegmentValue: string;\n  }",
                    "resolved": "{ selectedSegment: HTMLMarketSegmentElement; selectedSegmentValue: string; deselectedSegment: HTMLMarketSegmentElement; deselectedSegmentValue: string; }",
                    "references": {
                        "HTMLMarketSegmentElement": {
                            "location": "global",
                            "id": "global::HTMLMarketSegmentElement"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "valueWatcher"
            }, {
                "propName": "disabled",
                "methodName": "disabledChangeHandler"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketSegmentSelectedChanged",
                "method": "marketSegmentSelectedEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-segmented-control.js.map
