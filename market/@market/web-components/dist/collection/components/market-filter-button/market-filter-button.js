import { Host, h } from "@stencil/core";
/**
 * @slot - The text used for the filter button label
 * @slot feedback - The text to indicate currently applied filters
 */
export class MarketFilterButton {
    constructor() {
        this.size = 'medium';
        this.disabled = false;
        this.focused = false;
        this.iconOnly = false;
        this.active = false;
        this.popoverId = undefined;
        this.ariaAttributes = undefined;
    }
    handleClick(event) {
        if (this.disabled) {
            event.stopImmediatePropagation();
        }
    }
    handleDisabledChange(newValue) {
        if (newValue && this.focused) {
            this.focused = false;
        }
    }
    /**
     * Toggle focus on the filter button
     * @param {boolean} [value=true] whether or not focus will be applied or removed
     * @returns {Promise<boolean>} whether or not the button was focused or blurred
     */
    async setFocus(value = true) {
        if (this.disabled) {
            return Promise.resolve(false);
        }
        this.focused = value;
        if (this.focused) {
            this.buttonEl.focus();
        }
        else {
            this.buttonEl.blur();
        }
        return Promise.resolve(this.focused);
    }
    render() {
        return (h(Host, { key: '752fd8ad8a381d5f89cf0e177d11ba9bb4d74a2c', class: "market-filter-button" }, h("button", { key: '42ad2cc1f2f0ab15177812c029be00a2c76bbe04', "aria-disabled": this.disabled, disabled: this.disabled, ref: (el) => (this.buttonEl = el), "aria-expanded": this.active.toString(), "aria-controls": this.popoverId, type: "button" }, h("svg", { key: '2fe6ab99cf28e8502042eebd33466849206357d9', width: "18", height: "12", viewBox: "0 0 18 12", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: 'a083550a7a9e99b2d609adfc231104bff2dd89d1', "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0 0H18V2H0V0ZM15 5H3V7H15V5ZM12 10H6V12H12V10Z" })), h("span", { key: '9220d6f2bfa3c6640773aae7b0b0e10fe3c0bf8f', class: "label" }, h("slot", { key: '78a1dff60c4b0cf87141a94ed4cbecdf62d9f213' })), h("slot", { key: '4e28fde3d40ce59ed21759070255a094ba42bf9d', name: "feedback" }))));
    }
    static get is() { return "market-filter-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-filter-button.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-filter-button.css"]
        };
    }
    static get properties() {
        return {
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'medium' | 'small'",
                    "resolved": "\"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting filter button size"
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'medium'"
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
                    "text": "Functionally and visually disables the button"
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
                    "text": "Whether or not the button is focused"
                },
                "attribute": "focused",
                "reflect": true,
                "defaultValue": "false"
            },
            "iconOnly": {
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
                    "text": "Whether to display icon in place of label"
                },
                "attribute": "icon-only",
                "reflect": true,
                "defaultValue": "false"
            },
            "active": {
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
                    "text": "Whether or not the button is in an active state, e.g. filter is selected and dropdown is opened"
                },
                "attribute": "active",
                "reflect": true,
                "defaultValue": "false"
            },
            "popoverId": {
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
                    "text": "The ID of the popover element that the button controls"
                },
                "attribute": "popover-id",
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "ariaAttributes": {}
        };
    }
    static get methods() {
        return {
            "setFocus": {
                "complexType": {
                    "signature": "(value?: boolean) => Promise<boolean>",
                    "parameters": [{
                            "name": "value",
                            "type": "boolean",
                            "docs": "whether or not focus will be applied or removed"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<boolean>"
                },
                "docs": {
                    "text": "Toggle focus on the filter button",
                    "tags": [{
                            "name": "param",
                            "text": "value whether or not focus will be applied or removed"
                        }, {
                            "name": "returns",
                            "text": "whether or not the button was focused or blurred"
                        }]
                }
            }
        };
    }
    static get watchers() {
        return [{
                "propName": "disabled",
                "methodName": "handleDisabledChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "handleClick",
                "target": undefined,
                "capture": true,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-filter-button.js.map
