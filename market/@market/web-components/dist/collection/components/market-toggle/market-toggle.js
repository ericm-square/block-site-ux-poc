import { Host, h } from "@stencil/core";
import { getControlInputAriaLabel } from "../../utils/aria";
export class MarketToggle {
    constructor() {
        this.checked = false;
        this.disabled = false;
        this.focused = false;
        this.hovered = false;
        this.active = false;
    }
    /**
     * Toggles `checked` prop, and emits a change event accordingly.
     * Used by `market-row` to sync its selected state w/ slotted toggles.
     */
    setSelection(newValue, { silent = false } = {}) {
        const { marketToggleChange, checked: prevValue, innerInput } = this;
        if (typeof newValue !== 'boolean')
            return Promise.resolve();
        if (prevValue === newValue)
            return Promise.resolve();
        if (!silent) {
            const { defaultPrevented } = marketToggleChange.emit({
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
     * DEPRECATED (3.x): Toggles `selected` state (unrelated to the HTML attribute `value`).
     */
    setValue(newValue) {
        /* eslint-disable-next-line no-console */
        console.warn("market-toggle's setValue() method has been deprecated. Use setSelection() instead.", this.el);
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
        // We don't want to set focus to true if the toggle is disabled,
        // but we do want to allow setting focus to false when disabled,
        // since disabling the toggle causes it to lose browser focus,
        // triggering the onBlur event and calling this method.
        if (this.disabled && value) {
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
    render() {
        return (h(Host, { key: '951c262c523b48e73f7eac8a34f466946a2f7daa', class: "market-toggle", onBlur: () => {
                this.setFocus(false);
            }, onClick: this.handleClick, onFocus: () => {
                this.setFocus();
            } }, h("input", { key: '4ab242da6a76ba4472ad14478d8f07f4d82c3a77', ref: (el) => (this.innerInput = el), type: "checkbox", role: "switch", "aria-label": getControlInputAriaLabel(this.el), checked: this.checked, disabled: this.disabled }), h("svg", { key: 'f990289d9d5d1f06609c1b4e065e34525ea4e11f', width: "40", height: "24", viewBox: "0 0 40 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" }, h("rect", { key: '88fcdb713db813a007e1cc07fa9a2562136e1134', x: "1", y: "1", width: "38", height: "22", rx: "11", "stroke-width": "2" }), h("circle", { key: '10e6d92b7936078bc9a2f7a43253c58448c126ca', cx: "12", cy: "12", r: "7" }))));
    }
    static get is() { return "market-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-toggle.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-toggle.css"]
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
                    "text": "Whether the toggle is checked or not.\nIf used as a slotted control inside of `market-row`, this will be overridden by the row's `selected` property."
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
                    "text": "Whether the toggle is disabled."
                },
                "attribute": "disabled",
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
                    "text": "Whether the toggle is focused or not."
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
                    "text": "Whether the toggle is hovered or not."
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
                    "text": "Whether the toggle is active or not."
                },
                "attribute": "active",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketToggleChange",
                "name": "marketToggleChange",
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
                    "text": "Toggles `checked` prop, and emits a change event accordingly.\nUsed by `market-row` to sync its selected state w/ slotted toggles.",
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
//# sourceMappingURL=market-toggle.js.map
