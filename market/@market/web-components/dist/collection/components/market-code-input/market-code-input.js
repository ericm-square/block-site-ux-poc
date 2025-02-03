import { Host, h } from "@stencil/core";
/**
 * @slot trailing-accessory - An icon set on the right side of the input.
 */
export class MarketCodeInput {
    constructor() {
        this.type = 'number';
        this.name = undefined;
        this.length = 4;
        this.focused = false;
        this.value = '';
        this.readonly = false;
        this.invalid = false;
        this.disabled = false;
        this._code = undefined;
    }
    valueChangeHandler(value) {
        const sanitized = this.sanitizeValue(value);
        if (this.value !== sanitized) {
            this.value = sanitized;
        }
        this.setInputsFromValue(this.value);
    }
    /**
     * Trigger focus styling on `<market-input-text>`
     * and focus the cursor on the first empty `<input />`.
     */
    setFocus(value = true) {
        var _a;
        this.focused = value;
        if (value) {
            this.focusFirstEmptyInput();
        }
        else {
            (_a = this.el.shadowRoot.activeElement) === null || _a === void 0 ? void 0 : _a.blur();
        }
        return Promise.resolve();
    }
    isNumber(value) {
        return /^\d+$/.test(value);
    }
    isValidChar(char) {
        // no whitespace
        if (/\s/.test(char))
            return false;
        // number check
        return ['text', 'password'].includes(this.type) || this.isNumber(char);
    }
    focusFirstEmptyInput() {
        const inputs = this.el.shadowRoot.querySelectorAll('input');
        let input;
        inputs.forEach((i) => {
            if (!i.value && !input)
                input = i;
        });
        if (!input)
            input = inputs[this.length - 1];
        input.focus();
    }
    /**
     * Inits this._code to the passed-in `value` prop or to an
     * empty array representation of the code input i.e ['', '', '', '']
     * Called only once on componentWillLoad() as to not cause re-renders
     */
    initCode(value) {
        if (value) {
            this._code = value.split('');
            // ensure that this._code is always of size this.length
            if (this._code.length < this.length) {
                const padding = Array.from({ length: this.length - this._code.length }).fill('');
                this._code = [...this._code, ...padding];
            }
            else if (this._code.length > this.length) {
                this._code = this._code.slice(0, this.length);
            }
        }
        else {
            this._code = Array.from({ length: this.length }).fill('');
        }
    }
    sanitizeValue(value) {
        return value
            .split('')
            .filter((char) => this.isValidChar(char))
            .join('')
            .slice(0, this.length);
    }
    getValueFromInputs() {
        let value = '';
        this.el.shadowRoot.querySelectorAll('input').forEach((input) => {
            value += input.value;
        });
        return value;
    }
    setInputsFromValue(value) {
        const inputs = this.el.shadowRoot.querySelectorAll('input');
        inputs.forEach((input, i) => {
            const char = value[i];
            const prevChar = value[i - 1];
            // set the input value
            input.value = char || '';
            // set the input tabindex
            if (i === 0 || prevChar) {
                input.removeAttribute('tabindex');
            }
            else {
                input.tabIndex = -1;
            }
        });
    }
    spreadChars(e) {
        const { target, data } = e;
        const chars = data || target.value;
        if (!chars)
            return;
        const sanitized = this.sanitizeValue(chars);
        if (sanitized) {
            this.insertChars(target, sanitized.split(''));
        }
        else {
            target.value = '';
        }
    }
    insertChars(input, chars) {
        const { nextElementSibling } = input;
        const [first, ...rest] = chars;
        input.value = first;
        nextElementSibling === null || nextElementSibling === void 0 ? void 0 : nextElementSibling.focus();
        if (nextElementSibling && rest.length > 0) {
            this.insertChars(nextElementSibling, rest);
        }
    }
    updateValue() {
        const previousValue = this.value;
        const newValue = this.sanitizeValue(this.getValueFromInputs());
        if (previousValue !== newValue) {
            const { defaultPrevented } = this.marketCodeInputValueChange.emit({ code: newValue });
            if (defaultPrevented) {
                this.setInputsFromValue(previousValue);
            }
            else {
                this.value = newValue;
            }
        }
    }
    onInput(e) {
        // Handle paste or autocomplete of multiple chars
        this.spreadChars(e);
        this.updateValue();
    }
    onFocus(e) {
        const { target } = e;
        this.focused = true;
        if (target.value) {
            target.select();
        }
        else {
            this.focusFirstEmptyInput();
        }
    }
    onBlur() {
        this.focused = false;
    }
    onKeyDown(e) {
        const { target, key } = e;
        const { value, previousElementSibling, nextElementSibling } = target;
        switch (key) {
            case 'ArrowLeft':
                e.preventDefault();
                previousElementSibling === null || previousElementSibling === void 0 ? void 0 : previousElementSibling.select();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextElementSibling === null || nextElementSibling === void 0 ? void 0 : nextElementSibling.select();
                break;
            case 'Backspace':
                if (!value)
                    previousElementSibling === null || previousElementSibling === void 0 ? void 0 : previousElementSibling.select();
                break;
            default:
                break;
        }
    }
    onKeyUp(e) {
        const { target } = e;
        const { value } = target;
        if (value.length > 1) {
            this.spreadChars(e);
        }
        else if (!this.isValidChar(value)) {
            target.value = '';
            target.focus();
        }
    }
    onHostClick() {
        // if a child input does not already have focus
        if (!this.el.shadowRoot.activeElement) {
            this.setFocus();
        }
    }
    componentWillLoad() {
        this.valueChangeHandler(this.value);
        this.initCode(this.value);
    }
    render() {
        const inputs = [];
        this._code.forEach((char, index) => {
            const tabindex = this._code[index - 1] || index === 0 ? null : -1;
            inputs.push(h("input", { required: true, type: this.type === 'password' ? 'password' : 'text', inputmode: this.type === 'number' ? 'numeric' : null, autocomplete: index === 0 ? 'one-time-code' : null, value: char, maxlength: index === this.length - 1 ? '1' : null, readOnly: this.readonly, disabled: this.disabled, placeholder: "\u25CF", tabindex: tabindex, onFocus: (e) => this.onFocus(e), onBlur: () => this.onBlur(), onInput: (e) => this.onInput(e), onKeyDown: (e) => this.onKeyDown(e), onKeyUp: (e) => this.onKeyUp(e) }));
        });
        return (h(Host, { key: 'c11c05f9414698bd9d8f87b3e98adc021b233f1c', class: "market-code-input", name: this.name, onClick: () => this.onHostClick() }, h("span", { key: 'd3b5a43bb80ee199628650c96e6f9b17cf8fee88', class: "code-input-container" }, inputs), h("slot", { key: '8f0aa799fa46d759e6015488a07a2f6bb7c64669', name: "trailing-accessory" })));
    }
    static get is() { return "market-code-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-code-input.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-code-input.css"]
        };
    }
    static get properties() {
        return {
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'text' | 'number' | 'password'",
                    "resolved": "\"number\" | \"password\" | \"text\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A string specifying the type of input to render (text or numeric)"
                },
                "attribute": "type",
                "reflect": true,
                "defaultValue": "'number'"
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
                    "text": "A string specifying a name for the code input."
                },
                "attribute": "name",
                "reflect": false
            },
            "length": {
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
                    "text": "A number specifying the length of the code"
                },
                "attribute": "length",
                "reflect": false,
                "defaultValue": "4"
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
                    "text": "A boolean representing whether the code input is focused or not."
                },
                "attribute": "focused",
                "reflect": true,
                "defaultValue": "false"
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
                    "text": "A string representing a default value (code) that can be passed in to be rendered"
                },
                "attribute": "value",
                "reflect": true,
                "defaultValue": "''"
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
                    "text": "A boolean representing whether the input is readonly or not."
                },
                "attribute": "readonly",
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
                    "text": "A boolean representing whether the input is invalid or not.\nThis represents error states."
                },
                "attribute": "invalid",
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
                    "text": "A boolean representing whether the input is disabled or not.\nThis visually and functionally will disable the input."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "_code": {}
        };
    }
    static get events() {
        return [{
                "method": "marketCodeInputValueChange",
                "name": "marketCodeInputValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted whenever any of the input values change."
                },
                "complexType": {
                    "original": "{ code: string }",
                    "resolved": "{ code: string; }",
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
                        },
                        "HTMLInputElement": {
                            "location": "global",
                            "id": "global::HTMLInputElement"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Trigger focus styling on `<market-input-text>`\nand focus the cursor on the first empty `<input />`.",
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
//# sourceMappingURL=market-code-input.js.map
