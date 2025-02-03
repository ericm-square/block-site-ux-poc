import { Host, h } from "@stencil/core";
import { getControlInputAriaLabel } from "../../utils/aria";
export class MarketRadio {
    constructor() {
        this.selected = false;
        this.disabled = false;
        this.invalid = false;
        this.focused = false;
        this.hovered = false;
        this.active = false;
    }
    /**
     * Toggles `selected` prop, and emits a change event accordingly.
     * Used by `market-row` to sync its selected state w/ slotted radio buttons.
     */
    setSelection(newValue, { silent = false } = {}) {
        const { marketRadioValueChange, selected: prevValue, innerInput } = this;
        if (typeof newValue !== 'boolean')
            return Promise.resolve();
        if (prevValue === newValue)
            return Promise.resolve();
        if (!silent) {
            const { defaultPrevented } = marketRadioValueChange.emit({
                current: newValue,
                previous: prevValue,
            });
            if (defaultPrevented) {
                return Promise.resolve();
            }
        }
        this.selected = newValue;
        // When using the non-lazy output target, this method sometimes gets called from
        // market-row's watcher before/after innerInput is removed, hence this check.
        if (innerInput) {
            innerInput.checked = newValue;
        }
        return Promise.resolve();
    }
    /**
     * DEPRECATED (3.x): Toggles `selected` state (unrelated to the HTML attribute `value`).
     */
    setValue(newValue) {
        /* eslint-disable-next-line no-console */
        console.warn("market-radio's setValue() method has been deprecated. Use setSelection() instead.", this.el);
        this.setSelection(newValue);
        return Promise.resolve();
    }
    /**
     * Sets `active` state. Allows external elements to programmatically
     * trigger active styling, ex. when slotted as a control into `market-row`.
     */
    setActive(value) {
        this.active = value;
        return Promise.resolve();
    }
    /**
     * Sets `hovered` state. Allows external elements to programmatically
     * trigger hover styling, ex. when slotted as a control into `market-row`.
     */
    setHover(value) {
        this.hovered = value;
        return Promise.resolve();
    }
    /**
     * Sets `disabled` state. Allows external elements to programmatically
     * trigger disabled styling, ex. when slotted as a control into `market-row`.
     */
    setDisabled(value) {
        this.disabled = value;
        return Promise.resolve();
    }
    /**
     * Sets `focused` state, except when disabled.
     * Allows external consumers to programmatically
     * trigger focused styling.
     */
    setFocus(value = true) {
        if (this.disabled) {
            return Promise.resolve();
        }
        this.focused = value;
        return Promise.resolve();
    }
    onFocus() {
        if (this.disabled) {
            return;
        }
        this.focused = true;
        this.el.shadowRoot.querySelector('input').focus();
    }
    handleClick(event) {
        // Always prevent default so we can manually control the selection
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        // once a radio is selected, it shouldn't be togglable/deselectable on click
        if (!this.selected) {
            this.setFocus();
            this.setSelection(true);
        }
    }
    render() {
        return (h(Host, { key: 'e4bc0538b6c3c6fb1d384cf4f4e500f34d4e0fb3', class: "market-radio", onBlur: () => {
                this.setFocus(false);
            }, onClick: this.handleClick, onFocus: () => {
                this.setFocus();
            } }, h("input", { key: '5150cbff8f7852b9541a7078551f6e30436e28ce', ref: (el) => (this.innerInput = el), type: "radio", "aria-label": getControlInputAriaLabel(this.el), checked: this.selected, disabled: this.disabled }), this.selected && (h("svg", { key: '0051115cef2bf8e95ec556ecc3a9b81d32fbf7db', width: "6", height: "6", viewBox: "0 0 6 6", xmlns: "http://www.w3.org/2000/svg" }, h("circle", { key: '9a8a954420a18075bfed037d82dfbb0467cb7823', cx: "3", cy: "3", r: "3" })))));
    }
    static get is() { return "market-radio"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-radio.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-radio.css"]
        };
    }
    static get properties() {
        return {
            "selected": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the radio button is selected (analogous to the HTML input attribute `checked`).\nIf used as a slotted control inside of `market-row`, this will be overridden by the row's `selected` property."
                },
                "attribute": "selected",
                "reflect": true,
                "defaultValue": "false"
            },
            "disabled": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the radio button is disabled."
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
                    "text": "Whether the radio button is invalid."
                },
                "attribute": "invalid",
                "reflect": true,
                "defaultValue": "false"
            },
            "focused": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the radio is focused or not."
                },
                "attribute": "focused",
                "reflect": true,
                "defaultValue": "false"
            },
            "hovered": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the radio is hovered or not."
                },
                "attribute": "hovered",
                "reflect": true,
                "defaultValue": "false"
            },
            "active": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the radio is active or not."
                },
                "attribute": "active",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketRadioValueChange",
                "name": "marketRadioValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever \"selected\" prop value changes."
                },
                "complexType": {
                    "original": "{ current: boolean; previous: boolean }",
                    "resolved": "{ current: boolean; previous: boolean; }",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "setSelection": {
                "complexType": {
                    "signature": "(newValue: boolean, { silent }?: { silent?: boolean; }) => Promise<void>",
                    "parameters": [{
                            "name": "newValue",
                            "type": "boolean",
                            "docs": ""
                        }, {
                            "name": "__1",
                            "type": "{ silent?: boolean; }",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Toggles `selected` prop, and emits a change event accordingly.\nUsed by `market-row` to sync its selected state w/ slotted radio buttons.",
                    "tags": []
                }
            },
            "setValue": {
                "complexType": {
                    "signature": "(newValue: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "newValue",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "DEPRECATED (3.x): Toggles `selected` state (unrelated to the HTML attribute `value`).",
                    "tags": []
                }
            },
            "setActive": {
                "complexType": {
                    "signature": "(value: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "value",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sets `active` state. Allows external elements to programmatically\ntrigger active styling, ex. when slotted as a control into `market-row`.",
                    "tags": []
                }
            },
            "setHover": {
                "complexType": {
                    "signature": "(value: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "value",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sets `hovered` state. Allows external elements to programmatically\ntrigger hover styling, ex. when slotted as a control into `market-row`.",
                    "tags": []
                }
            },
            "setDisabled": {
                "complexType": {
                    "signature": "(value: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "value",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sets `disabled` state. Allows external elements to programmatically\ntrigger disabled styling, ex. when slotted as a control into `market-row`.",
                    "tags": []
                }
            },
            "setFocus": {
                "complexType": {
                    "signature": "(value?: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "value",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sets `focused` state, except when disabled.\nAllows external consumers to programmatically\ntrigger focused styling.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-radio.js.map
