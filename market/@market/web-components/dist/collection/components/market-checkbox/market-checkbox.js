import { Host, h } from "@stencil/core";
import { getControlInputAriaLabel } from "../../utils/aria";
export class MarketCheckbox {
    constructor() {
        this.checked = false;
        this.disabled = false;
        this.indeterminate = false;
        this.invalid = false;
        this.focused = false;
        this.hovered = false;
        this.active = false;
    }
    /**
     * Toggles `checked` prop, and emits a change event accordingly.
     * Used by `market-row` to sync its selected state w/ slotted checkboxes.
     */
    setSelection(newValue, { silent = false } = {}) {
        // this method's implementation could be cleaned up and simplified
        // (see analogous setSelection methods in toggle & radio),
        // but the extra indeterminate state complicates things a bit.
        // so just implementing this in a roundabout way for now in order to
        // keep the tests the same, until we decide to handle it differently.
        // ideally the indeterminate state wouldn't change if the event is prevented,
        // but this could be a breaking change which would need to be addressed.
        const { marketCheckboxValueChange, checked: prevValue, innerInput } = this;
        if (typeof newValue !== 'boolean')
            return Promise.resolve();
        this.indeterminate = false;
        if (prevValue === newValue)
            return Promise.resolve();
        if (!silent) {
            const { defaultPrevented } = marketCheckboxValueChange.emit({
                current: newValue,
                previous: prevValue,
            });
            if (defaultPrevented) {
                return Promise.resolve();
            }
        }
        this.checked = newValue;
        // When using the non-lazy output target, this method sometimes gets called
        // from market-row's watcher after innerInput is removed, hence this check.
        if (innerInput) {
            innerInput.checked = newValue;
        }
        return Promise.resolve();
    }
    /**
     * Toggles `indeterminate` prop. Operates independently of the `checked` property but if `true`,
     * indeterminate visual appearance takes precedence over checked/unchecked.
     */
    setIndeterminate(newValue) {
        this.indeterminate = newValue;
        return Promise.resolve();
    }
    /**
     * DEPRECATED (3.x): Toggles `selected` state (unrelated to the HTML attribute `value`).
     */
    setValue(newValue) {
        /* eslint-disable-next-line no-console */
        console.warn("market-checkbox's setValue() method has been deprecated. Use setSelection() instead.", this.el);
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
    handleClick(event) {
        // Always prevent default so we can manually control the selection
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        this.setFocus();
        this.setSelection(!this.checked);
    }
    getCheckedState() {
        return this.indeterminate ? 'indeterminate' : this.checked;
    }
    componentDidRender() {
        if (!this.innerInput) {
            this.innerInput = this.el.shadowRoot.querySelector('input');
        }
    }
    render() {
        return (h(Host, { key: '986021083a3fee4efb0f7f4c815ba933b8bc74be', class: "market-checkbox", onBlur: () => {
                this.setFocus(false);
            }, onClick: this.handleClick, onFocus: () => {
                this.setFocus();
            } }, h("input", { key: '6e48efe625e8a2bf41973d53494bc986bfabfc53', ref: (el) => (this.innerInput = el), type: "checkbox", "aria-label": getControlInputAriaLabel(this.el), checked: this.checked, indeterminate: this.indeterminate, disabled: this.disabled }), this.checked && !this.indeterminate && (h("svg", { key: 'bb79e0d37686e6439c90f5cb1cf5cb8254f644bf', width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", "data-testid": "check" }, h("path", { key: 'a04b9d93b99f30815a97a3f0c63d9bbc14c1fd09', d: "M6 10L8.85714 13L14 7", stroke: "white", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), this.indeterminate && (h("svg", { key: 'a3f4496a0b99ef3cd29ef3a631eb2aa0e57bcc21', width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", "data-testid": "indeterminate" }, h("path", { key: '2e3e2bd50a4f8ec1f10ad186b603463d20c73916', d: "M6 10H14", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })))));
    }
    static get is() { return "market-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-checkbox.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-checkbox.css"]
        };
    }
    static get properties() {
        return {
            "checked": {
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
                    "text": "Whether the checkbox is checked or unchecked. Operates independently of the indeterminate property.\nIf used as a slotted control inside of `market-row`, this will be overridden by the row's `selected` property."
                },
                "attribute": "checked",
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
                    "text": "Whether the checkbox is disabled."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "indeterminate": {
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
                    "text": "Whether the checkbox is indeterminate. If true, indeterminate visual state takes precedence over checked/unchecked."
                },
                "attribute": "indeterminate",
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
                    "text": "Whether the checkbox is invalid."
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
                    "text": "Whether the checkbox is focused or not."
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
                    "text": "Whether the checkbox is hovered or not."
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
                    "text": "Whether the checkbox is active or not."
                },
                "attribute": "active",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketCheckboxValueChange",
                "name": "marketCheckboxValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever \"checked\" prop value changes."
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
                    "text": "Toggles `checked` prop, and emits a change event accordingly.\nUsed by `market-row` to sync its selected state w/ slotted checkboxes.",
                    "tags": []
                }
            },
            "setIndeterminate": {
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
                    "text": "Toggles `indeterminate` prop. Operates independently of the `checked` property but if `true`,\nindeterminate visual appearance takes precedence over checked/unchecked.",
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
//# sourceMappingURL=market-checkbox.js.map
