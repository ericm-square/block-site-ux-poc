import { Host, h, } from "@stencil/core";
import { observeAriaAttributes, getTextInputAriaLabel } from "../../utils/aria";
import { autocompleteWatcher } from "../../utils/autocomplete";
import { classNames } from "../../utils/classnames";
import { submitFormImplicitly } from "../../utils/forms";
/**
 * @slot - The main label for the input.
 * @slot leading-accessory - An icon set on the left side of the input.
 * @slot trailing-accessory - An icon set on the right side of the input.
 *
 * @slot input - Can be used to slot your own HTML input, if needed (ex. if supporting browser
 * autofill)
 * @part native-input - The default inner HTML input.
 */
export class InputText {
    constructor() {
        this.hasLeadingAccessory = false;
        this.hasTrailingAccessory = false;
        this.type = 'text';
        this.inputId = undefined;
        this.name = undefined;
        this.value = '';
        this.placeholder = undefined;
        this.maxlength = undefined;
        this.minlength = undefined;
        this.size = 'large';
        this.step = undefined;
        this.min = undefined;
        this.max = undefined;
        this.pattern = undefined;
        this.required = undefined;
        this.readonly = false;
        this.disabled = false;
        this.focused = false;
        this.invalid = false;
        this.inputmode = undefined;
        this.autofocus = false;
        this.autocomplete = true;
        this.autovalidate = false;
        this.autofilled = false;
        this.ariaAttributes = undefined;
    }
    focusedChangeHandler(newValue) {
        if (!this.nativeInput) {
            return;
        }
        if (newValue) {
            this.nativeInput.focus();
        }
    }
    autocompleteWatcher(newValue) {
        this._autocomplete = autocompleteWatcher(newValue);
    }
    handleMarketDialogLoaded() {
        if (this.autofocus) {
            this.setFocus();
        }
    }
    valueDidChange(e) {
        const result = this.marketInputValueChange.emit({
            value: e.target.value,
            originalEvent: e,
        });
        if (result.defaultPrevented) {
            e.target.value = this.value;
            e.preventDefault();
        }
        else {
            this.value = e.target.value;
            this.updateElementInternals();
            if (this.autovalidate || this.validatingThroughSubmission) {
                this.invalid = !this.nativeInput.checkValidity();
            }
        }
        // Once the merchant has entered text, the content is no longer populated
        // via autofill, and should be styled as usual.
        this.autofilled = false;
    }
    handleAutofill(e) {
        // This a hack to detect browser autofill, since there's no event emitted for it.
        // See here for details: https://stackoverflow.com/a/41530164
        if (e.animationName === 'market-input-autofill-start') {
            this.autofilled = true;
        }
        else if (e.animationName === 'market-input-autofill-cancel' && !this.value) {
            this.autofilled = false;
        }
    }
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            // There are cases where the input acts as a trigger for a dropdown for example a dropdown that renders
            // the market-date-picker. In those cases, we want to prevent the form from submitting when the user clicks
            // enter
            if (this.el.slot === 'trigger') {
                e.preventDefault();
            }
            else {
                submitFormImplicitly(this.el);
            }
        }
    }
    /**
     * Handles the invalid submission event of this component.
     * This can happen when the component has been externally
     * checked for validity and does not satisfy the constraints.
     */
    handleSubmissionInvalid(event) {
        event.preventDefault(); // Prevent the default auto focus behavior as this will error out.
        this.validatingThroughSubmission = true;
        this.invalid = !this.nativeInput.checkValidity();
    }
    /**
     * Sets focus styling on `<market-input-text>`. Toggles focus on the inner `<input>` if true, and blurs focus if false.
     */
    setFocus(value = true) {
        if (this.readonly || this.disabled) {
            return Promise.resolve();
        }
        this.focused = value; // this will cause the `focusedChangeHandler` to be triggered
        if (!value && this.nativeInput) {
            this.nativeInput.blur();
        }
        return Promise.resolve();
    }
    /**
     * Returns the native `<input>` element used under the hood.
     */
    getInputElement() {
        return Promise.resolve(this.nativeInput);
    }
    /**
     * Allows passing an alternative light DOM input.
     */
    registerSlottedInput(slottedInput) {
        var _a;
        this.slottedInput =
            slottedInput ||
                // input slotted into market-input-text
                this.el.querySelector('input[slot=input]') ||
                (
                // input slotted into a higher-level component that uses market-input-text
                // (e.g. market-input-password)
                (_a = this.el.getRootNode().host) === null || _a === void 0 ? void 0 : _a.querySelector('input[slot=input]'));
        if (this.slottedInput) {
            this.slottedInput.addEventListener('input', (e) => this.valueDidChange(e));
            this.slottedInput.addEventListener('focus', () => this.setFocus());
            this.slottedInput.addEventListener('blur', () => (this.focused = false));
            this.slottedInput.addEventListener('animationstart', (e) => this.handleAutofill(e));
            this.nativeInput = this.slottedInput;
        }
        return Promise.resolve();
    }
    updateSharedInputProps() {
        const prevSharedProps = Object.assign({}, this.sharedProps);
        // used by the default shadow DOM native input and to copy component properties to slotted inputs
        // conditionally adding key/value pairs based on whether we want to set them on the <input>
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#individual_attributes
        this.sharedProps = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (this.inputId && { id: this.inputId })), (this.name && { name: this.name })), (this.type && { type: this.type })), (this.placeholder && { placeholder: this.placeholder })), (this.maxlength >= 0 && { maxlength: this.maxlength })), (this.minlength >= 0 && { minlength: this.minlength })), (this.step && { step: this.step })), (this.min && { min: this.min })), (this.max && { max: this.max })), (this.pattern && { pattern: this.pattern })), (this.value !== undefined && { value: this.value })), (this.readonly && { readonly: this.readonly })), (this.required && { required: this.required })), (this.disabled && { disabled: this.disabled })), (this.autofocus && { autofocus: this.autofocus })), (this.inputmode && { inputmode: this.inputmode })), (this._autocomplete && { autocomplete: this._autocomplete })), this.ariaAttributes), { 'aria-label': getTextInputAriaLabel(this.el) });
        // sync component props to slotted input, if one exists
        if (this.slottedInput) {
            const modifiedPropKeys = [...new Set([...Object.keys(prevSharedProps), ...Object.keys(this.sharedProps)])];
            modifiedPropKeys.forEach((key) => {
                if (!(key in this.sharedProps)) {
                    // remove properties that have been unset
                    this.slottedInput.removeAttribute(key);
                }
                else {
                    // boolean attributes can be set using empty strings
                    // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#javascript
                    const attributeValue = this.sharedProps[key] !== true ? this.sharedProps[key] : '';
                    this.slottedInput.setAttribute(key, attributeValue);
                }
            });
        }
    }
    /**
     * Updates the internal state of this element bound to the surrounding form.
     */
    updateElementInternals() {
        var _a, _b, _c, _d;
        if (!this.internals) {
            return;
        }
        (_b = (_a = this.internals).setFormValue) === null || _b === void 0 ? void 0 : _b.call(_a, this.value);
        if (this.nativeInput) {
            (_d = (_c = this.internals).setValidity) === null || _d === void 0 ? void 0 : _d.call(_c, this.nativeInput.validity, this.nativeInput.validationMessage);
        }
    }
    componentWillLoad() {
        this.hasLeadingAccessory = Boolean([...this.el.children].some((el) => el.slot === 'leading-accessory'));
        this.hasTrailingAccessory = Boolean([...this.el.children].some((el) => el.slot === 'trailing-accessory'));
        // In testing environments like vitest, formAssociated stencil classes aren't fully supported at the moment.
        // This leads to issues like missing functions on the this context of the class. In order to address this
        // we've defined the onMutationObserved callback inline.
        this.mutationObserver = observeAriaAttributes(this.el, (ariaAttributes) => {
            this.ariaAttributes = ariaAttributes;
        });
        this.registerSlottedInput();
        this.autocompleteWatcher(this.autocomplete);
        this.updateSharedInputProps();
        this.updateElementInternals();
    }
    componentDidLoad() {
        this.marketInputDidLoad.emit({ input: this.nativeInput });
    }
    componentWillUpdate() {
        this.updateSharedInputProps();
        this.updateElementInternals();
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    render() {
        return (h(Host, { key: '2b00628499d159769decf60369dacf70e7f25e76', class: "market-input-text", onBlur: () => {
                this.focused = false;
            }, onClick: () => {
                this.setFocus();
            }, onFocus: () => {
                this.setFocus();
            }, onKeyDown: (e) => {
                this.handleKeyDown(e);
            }, onInvalid: (e) => {
                this.handleSubmissionInvalid(e);
            } }, h("slot", { key: '4e44ddfc5331ad822c1c23daddbcab7236e2e41f', name: "leading-accessory" }), h("div", { key: '04efd6df745a8d1d72b1dc06d0fbd9127a32a604', class: classNames('label-input-container', {
                'has-leading-accessory': this.hasLeadingAccessory,
                'has-trailing-accessory': this.hasTrailingAccessory,
            }) }, h("slot", { key: 'e03b88c83f61893431f963b2a38796b4687d5cde' }), h("slot", { key: '5d92ec605564a2a9f2b45510a5b1e68f0ede8ebc', name: "input", onSlotchange: () => this.registerSlottedInput() }, !this.slottedInput && (h("input", Object.assign({ key: 'a51c7a88872af608513d780e7798990d7f76d38c', part: "native-input", ref: (input) => (this.nativeInput = input), onInput: (e) => this.valueDidChange(e), onAnimationStart: (e) => this.handleAutofill(e) }, this.sharedProps))))), h("slot", { key: 'fe4dc406e24264c849b098ee7b439b84124717ff', name: "trailing-accessory" })));
    }
    static get is() { return "market-input-text"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get originalStyleUrls() {
        return {
            "$": ["market-input-text.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-input-text.css"]
        };
    }
    static get properties() {
        return {
            "type": {
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
                    "text": "A string specifying the type of control to render. Any native HTML input type would work here."
                },
                "attribute": "type",
                "reflect": true,
                "defaultValue": "'text'"
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
                    "text": "A string specifying an ID for the input."
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
                    "text": "A string specifying a name for the input."
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
                    "text": "A string specifying a value for the input. This will be visually shown on the input and can be edited by the user."
                },
                "attribute": "value",
                "reflect": true,
                "defaultValue": "''"
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
                    "text": "A string specifying the placeholder of the input.\nThis is shown before a user attempts to add a value, given no value is already provided."
                },
                "attribute": "placeholder",
                "reflect": false
            },
            "maxlength": {
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
                    "text": "A number specifying the maximum length of characters for the input value.\nSee MDN on the [maxlength attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength)"
                },
                "attribute": "maxlength",
                "reflect": false
            },
            "minlength": {
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
                    "text": "A number specifying the minimum length of characters for the input value.\nSee MDN on the [minlength attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength)"
                },
                "attribute": "minlength",
                "reflect": false
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'small' | 'medium' | 'large'",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting input size.\nSizes `small` and `medium` visually hide the label,\nbut you should still provide one for accessibility purposes."
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'large'"
            },
            "step": {
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
                    "text": "Specifies the increment step for number and time inputs.\nSee MDN on the [step attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step)"
                },
                "attribute": "step",
                "reflect": false
            },
            "min": {
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
                    "text": "Specifies the minimum value for number and time inputs.\nSee MDN on the [min attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min)"
                },
                "attribute": "min",
                "reflect": false
            },
            "max": {
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
                    "text": "Specifies the maximum value for number and time inputs.\nSee MDN on the [max attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max)"
                },
                "attribute": "max",
                "reflect": false
            },
            "pattern": {
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
                    "text": "Specifies a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)\nto validate the input's value against.\nSee MDN on the [pattern attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern)"
                },
                "attribute": "pattern",
                "reflect": false
            },
            "required": {
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
                    "text": "Whether or not the input is required; used to validate the input's value.\nSee MDN on the [required attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)"
                },
                "attribute": "required",
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
                    "text": "A boolean representing whether the input is readonly or not."
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
                    "text": "A boolean representing whether the input is disabled or not.\nThis visually and functionally will disable the input."
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
                    "text": "A boolean representing whether the input is focused or not."
                },
                "attribute": "focused",
                "reflect": true,
                "defaultValue": "false"
            },
            "invalid": {
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
                    "text": "A boolean representing whether the input is invalid or not.\nThis represents error states."
                },
                "attribute": "invalid",
                "reflect": true,
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
            "autocomplete": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "string | boolean",
                    "resolved": "boolean | string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether or not this input should allow autocompletion by the browser\nAccepts a boolean, or \"true\", \"false\", \"on\", \"off\" or an\n[accepted string value for the autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)"
                },
                "attribute": "autocomplete",
                "reflect": false,
                "defaultValue": "true"
            },
            "autovalidate": {
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
                    "text": "Whether or not to automatically style this input as invalid based on\nnative input validation attributes: `min`, `max`, `pattern`, `required`, `maxlength`, `minlength`.\nSee MDN articles on [form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)\nand [constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation)"
                },
                "attribute": "autovalidate",
                "reflect": false,
                "defaultValue": "false"
            },
            "autofilled": {
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
                    "text": "Whether the input is displaying an initial autofill value. Used for\nstyling to ensure the label floats up correctly."
                },
                "attribute": "autofilled",
                "reflect": true,
                "defaultValue": "false"
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
                "method": "marketInputValueChange",
                "name": "marketInputValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted whenever the input value changes."
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
            }, {
                "method": "marketInputDidLoad",
                "name": "marketInputDidLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when `market-input` is first fully rendered."
                },
                "complexType": {
                    "original": "{ input: HTMLInputElement }",
                    "resolved": "{ input: HTMLInputElement; }",
                    "references": {
                        "HTMLInputElement": {
                            "location": "global",
                            "id": "global::HTMLInputElement"
                        }
                    }
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
                    "text": "Sets focus styling on `<market-input-text>`. Toggles focus on the inner `<input>` if true, and blurs focus if false.",
                    "tags": []
                }
            },
            "getInputElement": {
                "complexType": {
                    "signature": "() => Promise<HTMLInputElement>",
                    "parameters": [],
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
                    "return": "Promise<HTMLInputElement>"
                },
                "docs": {
                    "text": "Returns the native `<input>` element used under the hood.",
                    "tags": []
                }
            },
            "registerSlottedInput": {
                "complexType": {
                    "signature": "(slottedInput?: HTMLInputElement) => Promise<void>",
                    "parameters": [{
                            "name": "slottedInput",
                            "type": "HTMLInputElement",
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
                        },
                        "ShadowRoot": {
                            "location": "global",
                            "id": "global::ShadowRoot"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Allows passing an alternative light DOM input.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "focused",
                "methodName": "focusedChangeHandler"
            }, {
                "propName": "autocomplete",
                "methodName": "autocompleteWatcher"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketDialogLoaded",
                "method": "handleMarketDialogLoaded",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=market-input-text.js.map
