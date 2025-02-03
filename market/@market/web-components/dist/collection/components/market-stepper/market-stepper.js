import { Host, h } from "@stencil/core";
import { submitFormImplicitly } from "../../utils/forms";
/**
 * @part native-input - the native input element.
 */
export class MarketStepper {
    constructor() {
        this.value = undefined;
        this.inputId = undefined;
        this.name = undefined;
        this.placeholder = '0';
        this.max = undefined;
        this.min = undefined;
        this.step = 1;
        this.readonly = false;
        this.disabled = false;
        this.focused = false;
        this.invalid = false;
        this.inputAriaLabel = 'Number';
        this.decrementAriaLabel = 'Decrement';
        this.incrementAriaLabel = 'Increment';
        this.incrementDisabled = false;
        this.decrementDisabled = false;
    }
    valueChangeHandler() {
        // sanitize value in case it was set programmatically
        const sanitized = this.sanitizeValue(this.value);
        if (sanitized !== this.value) {
            this.value = sanitized;
        }
        this.updateButtonDisabledStates();
    }
    /**
     * Toggle focus styling on `<market-stepper>` and focus/blur the inner `<input />`.
     */
    setFocus(value = true) {
        if (this.readonly || this.disabled) {
            return Promise.resolve();
        }
        this.focused = value;
        this.focused ? this.inputEl.focus() : this.inputEl.blur();
        return Promise.resolve();
    }
    onChange() {
        const previousValue = this.value;
        let nextValue = Number.parseFloat(this.inputEl.value);
        if (Number.isNaN(nextValue)) {
            // not a valid number, so reset it to null/empty
            nextValue = null;
            this.inputEl.value = '';
        }
        else {
            // a valid number, so sanitize it against min/max/step props
            nextValue = this.sanitizeValue(nextValue);
            this.inputEl.value = nextValue.toString();
        }
        // if value has changed, set it and emit event
        if (nextValue !== previousValue) {
            this.value = nextValue;
            this.emitChangeEvent(previousValue);
        }
    }
    onInputFocus() {
        this.emitInputFocusEvent();
    }
    onDecrementClick() {
        this.stepValue(-this.step);
    }
    onIncrementClick() {
        this.stepValue(this.step);
    }
    onKeyDown(e) {
        if (e.key === 'Enter') {
            submitFormImplicitly(this.el);
        }
    }
    stepValue(step) {
        const previousValue = this.value;
        const nextValue = (previousValue || 0) + step;
        const sanitizedValue = this.sanitizeValue(nextValue);
        if (sanitizedValue !== previousValue) {
            this.value = sanitizedValue;
            this.emitChangeEvent(previousValue);
        }
    }
    sanitizeValue(value) {
        var _a;
        const decimalPlaces = ((_a = this.step.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        const hasMax = this.max !== null && this.max !== undefined;
        const hasMin = this.min !== null && this.min !== undefined;
        // round value to the nearest step
        let sanitized = Math.round(value / this.step) * this.step;
        // correct any floating point math errors
        sanitized = Number.parseFloat(sanitized.toFixed(decimalPlaces));
        // limit value to max
        sanitized = hasMax ? Math.min(sanitized, this.max) : sanitized;
        // limit value to min
        return hasMin ? Math.max(sanitized, this.min) : sanitized;
    }
    updateButtonDisabledStates() {
        const { value, max, min } = this;
        const hasValue = value !== null && value !== undefined;
        this.incrementDisabled = hasValue ? value === max : false;
        this.decrementDisabled = hasValue ? value === min : false;
    }
    emitChangeEvent(previousValue) {
        const { el, value, marketStepperValueChange } = this;
        marketStepperValueChange.emit({ el, value, previousValue });
    }
    emitInputFocusEvent() {
        const { marketStepperInputFocus } = this;
        marketStepperInputFocus.emit();
    }
    componentWillRender() {
        this.updateButtonDisabledStates();
    }
    render() {
        return (h(Host, { key: '4fa66a3ae5b2e85fc2c0930c0c7662fd13a73109', class: "market-stepper", onFocus: () => {
                this.focused = true;
            }, onBlur: () => {
                this.focused = false;
            } }, h("button", { key: 'd0b486eb97f7d2f277ef7077da51a3736b4e11cb', tabindex: this.disabled || this.decrementDisabled ? -1 : null, disabled: this.disabled || this.decrementDisabled, onClick: () => this.onDecrementClick(), "aria-label": this.decrementAriaLabel }, h("svg", { key: '1f49587ce03a3ac77437e68b9acec58e675870a7', width: "10", height: "2", viewBox: "0 0 10 2", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '22eed75f2afcf818339fb56f4afa5b6d8615127f', d: "M9.66667 0.333328H0.333336V1.66666H9.66667V0.333328Z" }))), h("input", { key: 'cd43e7befba83e6666deb680801145ed3cc92323', ref: (el) => (this.inputEl = el), type: "number", id: this.inputId, name: this.name, readonly: this.readonly, disabled: this.disabled, placeholder: this.placeholder, step: this.step, min: this.min, max: this.max, value: this.value, "aria-label": this.inputAriaLabel, onChange: () => this.onChange(), onFocus: () => this.onInputFocus(), onKeyDown: (e) => this.onKeyDown(e), part: "native-input" }), h("button", { key: '6b2e74af300494bfac3c3796d369421e163dda06', tabindex: this.disabled || this.incrementDisabled ? -1 : null, disabled: this.disabled || this.incrementDisabled, onClick: () => this.onIncrementClick(), "aria-label": this.incrementAriaLabel }, h("svg", { key: 'b8ee04c78ce8c07cc16e4b47d761db6f359dee2b', width: "10", height: "10", viewBox: "0 0 10 10", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: 'bbd4fa4531041fada7b5e5794d33d0be968033a6', d: "M5.66665 9.66666V5.66666H9.66665V4.33333H5.66665V0.333328H4.33331V4.33333H0.333313V5.66666H4.33331V9.66666H5.66665Z" })))));
    }
    static get is() { return "market-stepper"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-stepper.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-stepper.css"]
        };
    }
    static get properties() {
        return {
            "value": {
                "type": "number",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The value for the input. This is visually shown on the input\nand can be edited by the user."
                },
                "attribute": "value",
                "reflect": true
            },
            "inputId": {
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
                    "text": "The ID for the inner input."
                },
                "attribute": "input-id",
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
                    "text": "The name for the inner input."
                },
                "attribute": "name",
                "reflect": false
            },
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
                    "text": "The placeholder of the input. Shown before a user attempts to\nadd a value, given no value is already provided."
                },
                "attribute": "placeholder",
                "reflect": false,
                "defaultValue": "'0'"
            },
            "max": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A number specifying the greatest value in the range of permitted values.\n(See MDN on the [max attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max))"
                },
                "attribute": "max",
                "reflect": false
            },
            "min": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A number specifying the most negative value in the range of permitted values.\n(See MDN on the [min attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min))"
                },
                "attribute": "min",
                "reflect": false
            },
            "step": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A positive number specifying the increment step.\n(See MDN on the [step attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step))"
                },
                "attribute": "step",
                "reflect": false,
                "defaultValue": "1"
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
                    "text": "Whether the input is readonly or not."
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
                    "text": "Whether the input is disabled or not.\nThis visually and functionally disables the input."
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
                    "text": "Whether the input is focused or not."
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
                    "text": "Whether the input is invalid or not. This represents error states."
                },
                "attribute": "invalid",
                "reflect": true,
                "defaultValue": "false"
            },
            "inputAriaLabel": {
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
                    "text": "The inner input's aria-label. Localize as needed."
                },
                "attribute": "input-aria-label",
                "reflect": true,
                "defaultValue": "'Number'"
            },
            "decrementAriaLabel": {
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
                    "text": "The decrement button's aria-label. Localize as needed."
                },
                "attribute": "decrement-aria-label",
                "reflect": true,
                "defaultValue": "'Decrement'"
            },
            "incrementAriaLabel": {
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
                    "text": "The increment button's aria-label. Localize as needed."
                },
                "attribute": "increment-aria-label",
                "reflect": true,
                "defaultValue": "'Increment'"
            }
        };
    }
    static get states() {
        return {
            "incrementDisabled": {},
            "decrementDisabled": {}
        };
    }
    static get events() {
        return [{
                "method": "marketStepperValueChange",
                "name": "marketStepperValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the value changes."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "marketStepperInputFocus",
                "name": "marketStepperInputFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the inner `<input>` element is focused."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
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
                    "text": "Toggle focus styling on `<market-stepper>` and focus/blur the inner `<input />`.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "valueChangeHandler"
            }];
    }
}
//# sourceMappingURL=market-stepper.js.map
