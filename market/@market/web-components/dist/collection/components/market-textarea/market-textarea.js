import { TEXTAREA_MAXIMUM_HEIGHT } from "@market/market-theme/js/cjs/index.js";
import { Host, h } from "@stencil/core";
import { getTextInputAriaLabel, observeAriaAttributes } from "../../utils/aria";
/**
 * @slot - The main label for the textarea.
 * @slot textarea - Can be used to slot your own custom textarea element.
 * @part container - The containing div for the textarea and label.
 */
export class MarketTextarea {
    constructor() {
        this.onMutationObserved = (ariaAttributes) => {
            this.ariaAttributes = ariaAttributes;
        };
        this.placeholder = undefined;
        this.name = undefined;
        this.value = '';
        this.maxlength = undefined;
        this.readonly = false;
        this.disabled = false;
        this.focused = false;
        this.invalid = false;
        this.maxHeight = `${TEXTAREA_MAXIMUM_HEIGHT}px`;
        this.autofocus = false;
        this.inputmode = undefined;
        this.ariaAttributes = undefined;
    }
    handleMarketDialogLoaded() {
        if (this.autofocus) {
            this.setFocus();
        }
    }
    /**
     * Allows passing an alternative light DOM textarea.
     * Sets the this.slottedTextarea value to undefined if there is no slotted element.
     */
    registerSlottedTextarea(slottedTextarea) {
        var _a;
        this.slottedTextarea =
            slottedTextarea ||
                // textarea slotted into market-textarea
                this.el.querySelector('textarea[slot=textarea]') ||
                (
                // textarea slotted into a higher-level component that uses market-textarea
                (_a = this.el.getRootNode().host) === null || _a === void 0 ? void 0 : _a.querySelector('textarea[slot=textarea]'));
        if (this.slottedTextarea) {
            this.slottedTextarea.addEventListener('input', (e) => this.textareaValueDidChange(e));
            this.slottedTextarea.addEventListener('focus', () => this.setFocus());
            this.slottedTextarea.addEventListener('blur', () => (this.focused = false));
        }
        return Promise.resolve();
    }
    syncSharedPropsToSlottedTextarea(prevSharedProps) {
        // sync component props to slotted input, if one exists
        if (this.slottedTextarea) {
            const modifiedPropKeys = [...new Set([...Object.keys(prevSharedProps), ...Object.keys(this.sharedProps)])];
            modifiedPropKeys.forEach((key) => {
                if (!(key in this.sharedProps)) {
                    // remove properties that have been unset
                    this.slottedTextarea.removeAttribute(key);
                }
                else {
                    // boolean attributes can be set using empty strings
                    // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#javascript
                    const attributeValue = this.sharedProps[key] !== true ? this.sharedProps[key] : '';
                    this.slottedTextarea.setAttribute(key, attributeValue);
                }
            });
        }
    }
    updateSharedPropsAndSyncSlottedTextarea() {
        const prevSharedProps = Object.assign({}, this.sharedProps);
        // used by the default shadow DOM native input and to copy component properties to slotted inputs
        // conditionally adding key/value pairs based on whether we want to set them on the <input>
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#individual_attributes
        this.sharedProps = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (this.name && { name: this.name })), (this.placeholder && { placeholder: this.placeholder })), (this.maxlength !== undefined && Number.parseInt(this.maxlength, 10) >= 0 && { maxlength: this.maxlength })), (this.value !== undefined && { value: this.value })), (this.readonly && { readonly: this.readonly })), (this.disabled && { disabled: this.disabled })), (this.autofocus && { autofocus: this.autofocus })), (this.inputmode && { inputmode: this.inputmode })), this.ariaAttributes), { 'aria-label': getTextInputAriaLabel(this.el) });
        this.syncSharedPropsToSlottedTextarea(prevSharedProps);
    }
    componentWillLoad() {
        this.mutationObserver = observeAriaAttributes(this.el, this.onMutationObserved);
        this.registerSlottedTextarea();
        this.updateSharedPropsAndSyncSlottedTextarea();
    }
    componentDidLoad() {
        if (this.maxHeight) {
            // Set the passed max height on the input container, since that's where
            // the drag handle will actually be visible.
            // This will be removed until `maxHeight` prop is fully deprecated.
            this.el.style.maxHeight = this.maxHeight;
        }
    }
    componentWillUpdate() {
        this.updateSharedPropsAndSyncSlottedTextarea();
    }
    textareaValueDidChange(e) {
        // Need to update value for the label, which floats if this value exists.
        this.value = e.target.value;
        this.marketTextareaValueChange.emit({
            value: e.target.value,
            originalEvent: e,
        });
    }
    setFocus(value = true) {
        var _a, _b, _c, _d, _e;
        if (this.readonly || this.disabled) {
            return;
        }
        const shouldSetElementFocus = value && !this.focused;
        this.focused = value;
        // Set focus on element if not already focused
        if (shouldSetElementFocus) {
            this.slottedTextarea ? this.slottedTextarea.focus() : (_e = (_d = (_c = (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector) === null || _c === void 0 ? void 0 : _c.call(_b, 'textarea')) === null || _d === void 0 ? void 0 : _d.focus) === null || _e === void 0 ? void 0 : _e.call(_d);
        }
    }
    render() {
        return (h(Host, { key: 'd3eff93de852f0b1f33bf7da766488313b423d8c', class: "market-textarea", onBlur: () => {
                this.focused = false;
            }, onClick: () => {
                this.setFocus();
            }, onFocus: () => {
                this.setFocus();
            } }, h("div", { key: '5e7d80d8934e0b29295db282f9e8df4a8543ce74', class: "label-input-container", part: "container" }, h("slot", { key: '52a6e3cdb68cef92a0b56d85aca22a3309ff3ad2' }), h("slot", { key: '2cc037b3ea0a349a61182804b3e5ecde4b8e9242', name: "textarea", onSlotchange: () => this.registerSlottedTextarea() }, !this.slottedTextarea && (h("textarea", Object.assign({ key: 'ab1a6abef98069da1f03b8d8e424e9450573a785' }, this.ariaAttributes, { id: this.name, onInput: (e) => this.textareaValueDidChange(e) }, this.sharedProps)))))));
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    static get is() { return "market-textarea"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-textarea.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-textarea.css"]
        };
    }
    static get properties() {
        return {
            "placeholder": {
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
                    "text": "A string specifying the placeholder of the textarea.\nThis is shown before a user attempts to add a value, given no value is already provided."
                },
                "attribute": "placeholder",
                "reflect": false
            },
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
                    "text": "A string specifying a name for the textarea."
                },
                "attribute": "name",
                "reflect": false
            },
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
                    "text": "A string specifying a value for the textarea. This will be visually shown on the textarea and can be edited by the user."
                },
                "attribute": "value",
                "reflect": true,
                "defaultValue": "''"
            },
            "maxlength": {
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
                    "text": "A string specifying the maximum length of characters for the input value."
                },
                "attribute": "maxlength",
                "reflect": false
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
                    "text": "A boolean representing whether the textarea is readonly or not."
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
                    "text": "A boolean representing whether the textarea is disabled or not.\nThis visually and functionally will disable the textarea."
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
                    "text": "A boolean representing whether the textarea is focused or not."
                },
                "attribute": "focused",
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
                    "text": "A boolean representing whether the textarea is invalid or not.\nThis represents error states."
                },
                "attribute": "invalid",
                "reflect": true,
                "defaultValue": "false"
            },
            "maxHeight": {
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
                    "tags": [{
                            "name": "default",
                            "text": "'320px'"
                        }],
                    "text": "A string specifying the maximum height in pixels for the textarea. Vertical resizing will be limited to this height. Example value: '200px'.\n\n**DEPRECATED**: set `max-height` via CSS"
                },
                "attribute": "max-height",
                "reflect": false,
                "defaultValue": "`${TEXTAREA_MAXIMUM_HEIGHT}px`"
            },
            "autofocus": {
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
                    "text": "A boolean representing whether the input should focus on page load.\nIf multiple elements with `autofocus` are present, it is not guaranteed which one\nwill ultimately receive the focus. It is advised that only one at most is present."
                },
                "attribute": "autofocus",
                "reflect": false,
                "defaultValue": "false"
            },
            "inputmode": {
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
                    "text": "Allows a browser to display an appropriate virtual keyboard.\n[Accepted values](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)."
                },
                "attribute": "inputmode",
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "ariaAttributes": {}
        };
    }
    static get events() {
        return [{
                "method": "marketTextareaValueChange",
                "name": "marketTextareaValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the value of the textarea changes."
                },
                "complexType": {
                    "original": "{ value: string; originalEvent: KeyboardEvent }",
                    "resolved": "{ value: string; originalEvent: KeyboardEvent; }",
                    "references": {
                        "KeyboardEvent": {
                            "location": "global",
                            "id": "global::KeyboardEvent"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "registerSlottedTextarea": {
                "complexType": {
                    "signature": "(slottedTextarea?: HTMLTextAreaElement) => Promise<void>",
                    "parameters": [{
                            "name": "slottedTextarea",
                            "type": "HTMLTextAreaElement",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLTextAreaElement": {
                            "location": "global",
                            "id": "global::HTMLTextAreaElement"
                        },
                        "ShadowRoot": {
                            "location": "global",
                            "id": "global::ShadowRoot"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Allows passing an alternative light DOM textarea.\nSets the this.slottedTextarea value to undefined if there is no slotted element.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "marketDialogLoaded",
                "method": "handleMarketDialogLoaded",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-textarea.js.map
