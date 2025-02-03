import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { b as getTextInputAriaLabel, o as observeAriaAttributes } from './aria.js';
import { a as autocompleteWatcher } from './autocomplete.js';
import { c as classNames } from './classnames.js';
import { s as submitFormImplicitly } from './forms.js';

const marketInputTextCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{position:relative;outline:none;font-weight:var(--field-input-weight);font-size:var(--field-input-size);line-height:var(--field-input-leading);cursor:text}:host input,:host ::slotted(input),:host textarea,:host ::slotted(textarea){width:100%;margin:0;padding:0;border:none;background-color:transparent;color:inherit;font-weight:inherit;font-size:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;cursor:inherit}:host ::slotted(label){cursor:inherit}:host input:focus,:host ::slotted(input:focus),:host textarea:focus,:host ::slotted(textarea:focus){outline:none}:host input::-moz-placeholder,:host textarea::-moz-placeholder{color:var(--field-placeholder-text-color)}:host input::placeholder,:host textarea::placeholder{color:var(--field-placeholder-text-color)}:host ::slotted(input)::-moz-placeholder,:host ::slotted(textarea)::-moz-placeholder{color:var(--field-placeholder-text-color)}:host ::slotted(input)::placeholder,:host ::slotted(textarea)::placeholder{color:var(--field-placeholder-text-color)}:host([size='small']){font-size:var(--core-type-paragraph-20-size);line-height:var(--core-type-paragraph-20-leading)}:host{border-radius:var(--field-border-radius);background-color:var(--field-normal-state-background-color);color:var(--field-normal-state-input-color)}:host::after{content:\"\";position:absolute;inset:0;border-radius:var(--field-border-radius);box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-normal-validity-border-color);pointer-events:none}:host([invalid])::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-invalid-validity-border-color)}:host(:hover){background-color:var(--field-hover-state-background-color);color:var(--field-hover-state-input-color)}:host(:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-hover-state-normal-validity-border-color)}:host([invalid]:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-hover-state-invalid-validity-border-color)}:host([focused]){color:var(--field-focus-state-input-color)}:host([focused])::after{box-shadow:inset 0 0 0 var(--field-focus-state-border-size)\n        var(--field-focus-state-normal-validity-border-color)}:host([focused][invalid])::after{box-shadow:inset 0 0 0 var(--field-focus-state-border-size) var(--field-focus-state-invalid-validity-border-color)}:host([readonly]:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-normal-validity-border-color)}:host([disabled]){background-color:var(--field-disabled-state-background-color) !important;color:var(--field-disabled-state-input-color) !important;cursor:not-allowed !important}:host([disabled])::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-disabled-state-border-color) !important}:host([disabled]) ::slotted(.market-accessory),:host([disabled]) ::slotted(img[slot*=\"accessory\"]),:host([disabled]) ::slotted(svg[slot*=\"accessory\"]),:host([disabled]) ::slotted(div[slot*=\"accessory\"]){--field-disabled-state-accessory-opacity:var(--row-disabled-state-leading-accessory-opacity);opacity:var(--field-disabled-state-accessory-opacity)}:host([value=\"\"]) ::slotted(label){color:var(--field-normal-state-empty-phase-label-color)}:host(:not([value=\"\"])) ::slotted(label),:host([value=\"\"][autofilled]) ::slotted(label){color:var(--field-normal-state-float-phase-label-color)}:host(:hover) ::slotted(label){color:var(--field-hover-state-empty-phase-label-color)}:host(:not([value=\"\"]):hover) ::slotted(label),:host([value=\"\"][autofilled]:hover) ::slotted(label){color:var(--field-hover-state-float-phase-label-color)}:host([focused]) ::slotted(label){color:var(--field-focus-state-float-phase-label-color)}:host([value=\"\"][disabled]) ::slotted(label){color:var(--field-disabled-state-empty-phase-label-color)}:host(:not([value=\"\"])[disabled]) ::slotted(label),:host([value=\"\"][autofilled][disabled]) ::slotted(label){color:var(--field-disabled-state-float-phase-label-color)}:host{--field-accessory-horizontal-spacing-size:16px;--field-size-small-accessory-horizontal-spacing-size:12px;--field-size-large-image-accessory-outer-spacing-size:12px;--field-size-medium-image-accessory-outer-spacing-size:4px;--field-size-large-button-accessory-outer-spacing-size:12px;--field-size-medium-button-accessory-outer-spacing-size:4px;--field-size-large-tooltip-accessory-horizontal-spacing-size:5px;--field-size-large-tooltip-accessory-vertical-spacing-size:-1px;--field-size-small-tooltip-accessory-horizontal-spacing-size:1px}:host ::slotted([slot=\"leading-accessory\"]){flex-shrink:0;margin-right:var(--field-accessory-horizontal-spacing-size);margin-left:var(--field-accessory-horizontal-spacing-size)}:host ::slotted(.market-accessory[slot=\"leading-accessory\"][size=\"image\"]){margin-left:var(--field-size-large-image-accessory-outer-spacing-size)}:host ::slotted(.market-tooltip[slot=\"leading-accessory\"]){margin:var(--field-size-large-tooltip-accessory-vertical-spacing-size)\n      var(--field-size-large-tooltip-accessory-horizontal-spacing-size)}:host ::slotted(.market-button[slot=\"leading-accessory\"][size=\"small\"]){margin-left:var(--field-size-large-button-accessory-outer-spacing-size)}:host ::slotted([slot=\"trailing-accessory\"]){flex-shrink:0;margin-right:var(--field-accessory-horizontal-spacing-size);margin-left:var(--field-accessory-horizontal-spacing-size)}:host ::slotted(.market-accessory[slot=\"trailing-accessory\"][size=\"image\"]){margin-right:var(--field-size-large-image-accessory-outer-spacing-size)}:host ::slotted(.market-tooltip[slot=\"trailing-accessory\"]){margin:var(--field-size-large-tooltip-accessory-vertical-spacing-size)\n      var(--field-size-large-tooltip-accessory-horizontal-spacing-size)}:host ::slotted(.market-button[slot=\"trailing-accessory\"][size=\"small\"]){margin-right:var(--field-size-large-button-accessory-outer-spacing-size)}:host([size='medium']) ::slotted(.market-accessory[slot=\"leading-accessory\"][size=\"image\"]){margin-left:var(--field-size-medium-image-accessory-outer-spacing-size)}:host([size='medium']) ::slotted(.market-button[slot=\"leading-accessory\"][size=\"small\"]){margin-left:var(--field-size-medium-button-accessory-outer-spacing-size)}:host([size='medium']) ::slotted(.market-accessory[slot=\"trailing-accessory\"][size=\"image\"]){margin-right:var(--field-size-medium-image-accessory-outer-spacing-size)}:host([size='medium']) ::slotted(.market-button[slot=\"trailing-accessory\"][size=\"small\"]){margin-right:var(--field-size-medium-button-accessory-outer-spacing-size)}:host([size='small']) ::slotted([slot=\"leading-accessory\"]),:host([size='small']) ::slotted([slot=\"trailing-accessory\"]){margin-right:var(--field-size-small-accessory-horizontal-spacing-size);margin-left:var(--field-size-small-accessory-horizontal-spacing-size)}:host([size='small']) ::slotted(.market-tooltip[slot=\"leading-accessory\"]),:host([size='small']) ::slotted(.market-tooltip[slot=\"trailing-accessory\"]){margin-right:var(--field-size-small-tooltip-accessory-horizontal-spacing-size);margin-left:var(--field-size-small-tooltip-accessory-horizontal-spacing-size)}:host .label-input-container.has-leading-accessory{padding-left:0 !important;}:host .label-input-container.has-trailing-accessory{padding-right:0 !important;}:host{--field-input-animation-speed:0.2s;--field-input-label-translate:12px;--field-empty-phase-label-text-size-unitless:16;--field-float-phase-label-text-size-unitless:14;--field-size-medium-float-phase-vertical-padding-size:12px;--field-size-medium-float-phase-horizontal-padding-size:16px;--field-size-small-float-phase-vertical-padding-size:9px;--field-size-small-float-phase-horizontal-padding-size:12px;display:flex;align-items:center}:host .label-input-container,:host([value='']:not([focused]):not([autofilled])) .label-input-container{flex-grow:1;padding:var(--field-float-phase-vertical-padding-size) var(--field-float-phase-horizontal-padding-size)}:host([size='medium']) .label-input-container,:host([size='medium'][value='']:not([focused]):not([autofilled])) .label-input-container{padding:var(--field-size-medium-float-phase-vertical-padding-size)\n      var(--field-size-medium-float-phase-horizontal-padding-size)}:host([size='small']) .label-input-container,:host([size='small'][value='']:not([focused]):not([autofilled])) .label-input-container{padding:var(--field-size-small-float-phase-vertical-padding-size)\n      var(--field-size-small-float-phase-horizontal-padding-size)}:host ::slotted(label){display:block;min-height:var(--field-empty-phase-label-text-leading);font-weight:var(--field-empty-phase-label-text-weight);font-size:var(--field-empty-phase-label-text-size);line-height:var(--field-empty-phase-label-text-leading);letter-spacing:var(--field-empty-phase-label-text-tracking);transition:all var(--field-input-animation-speed);transform:translateY(var(--field-input-label-translate));transform-origin:0 0}:host(:not([value=\"\"])) ::slotted(label),:host([value=\"\"]:not([focused])[autofilled]) ::slotted(label),:host([focused]) ::slotted(label){font-weight:var(--field-float-phase-label-text-weight);transform:scale(\n        calc(var(--field-float-phase-label-text-size-unitless) / var(--field-empty-phase-label-text-size-unitless))\n      )}:host input,:host ::slotted(input),:host textarea,:host ::slotted(textarea){opacity:0%}:host([focused]) input,:host([focused]) ::slotted(input),:host([focused]) textarea,:host([focused]) ::slotted(textarea),:host(:not([value=''])) input,:host(:not([value=''])) ::slotted(input),:host(:not([value=''])) textarea,:host(:not([value=''])) ::slotted(textarea){opacity:100%}:host([size='small']) ::slotted(label),:host([size='medium']) ::slotted(label){position:absolute;overflow:hidden;clip:rect(0 0 0 0);width:1px;height:1px;white-space:nowrap;-webkit-clip-path:inset(50%);clip-path:inset(50%)}:host([size='small']) input,:host([size='small']) ::slotted(input),:host([size='small']) textarea,:host([size='small']) ::slotted(textarea),:host([size='medium']) input,:host([size='medium']) ::slotted(input),:host([size='medium']) textarea,:host([size='medium']) ::slotted(textarea){opacity:100%}:host input::-webkit-outer-spin-button,:host input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none;appearance:none}:host input[type=\"number\"]{-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}input[type=\"time\"]::-webkit-inner-spin-button,input[type=\"time\"]::-webkit-outer-spin-button,input[type=\"time\"]::-webkit-clear-button,input[type=\"time\"]::-webkit-calendar-picker-indicator{display:none}input[type=\"date\"]::-webkit-calendar-picker-indicator,input[type=\"time\"]::-webkit-calendar-picker-indicator{display:none}input[type=\"date\"]::-webkit-inner-spin-button,input[type=\"time\"]::-webkit-inner-spin-button,input[type=\"date\"]::-webkit-clear-button,input[type=\"time\"]::-webkit-clear-button{display:none;margin:0;-webkit-appearance:none;appearance:none}:host([value=\"\"]) input,:host([value=\"\"]) ::slotted(input){color:var(--field-placeholder-text-color)}:host input:-webkit-autofill,:host ::slotted(input:-webkit-autofill){animation-name:market-input-autofill-start;animation-duration:0.1ms}:host input:not(:-webkit-autofill),:host ::slotted(input:not(:-webkit-autofill)){animation-name:market-input-autofill-cancel;animation-duration:0.1ms}:host input::-webkit-date-and-time-value{text-align:left}:host ::slotted(input::-webkit-date-and-time-value){text-align:left}";
const MarketInputTextStyle0 = marketInputTextCss;

const InputText = /*@__PURE__*/ proxyCustomElement(class InputText extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketInputValueChange = createEvent(this, "marketInputValueChange", 7);
        this.marketInputDidLoad = createEvent(this, "marketInputDidLoad", 7);
        this.internals = this.attachInternals();
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
    static get formAssociated() { return true; }
    get el() { return this; }
    static get watchers() { return {
        "focused": ["focusedChangeHandler"],
        "autocomplete": ["autocompleteWatcher"]
    }; }
    static get style() { return MarketInputTextStyle0; }
}, [65, "market-input-text", {
        "type": [513],
        "inputId": [1, "input-id"],
        "name": [1],
        "value": [1537],
        "placeholder": [1],
        "maxlength": [2],
        "minlength": [2],
        "size": [513],
        "step": [1],
        "min": [1],
        "max": [1],
        "pattern": [1],
        "required": [4],
        "readonly": [516],
        "disabled": [516],
        "focused": [1540],
        "invalid": [1540],
        "inputmode": [1],
        "autofocus": [4],
        "autocomplete": [8],
        "autovalidate": [4],
        "autofilled": [1540],
        "ariaAttributes": [32],
        "setFocus": [64],
        "getInputElement": [64],
        "registerSlottedInput": [64]
    }, [[8, "marketDialogLoaded", "handleMarketDialogLoaded"]], {
        "focused": ["focusedChangeHandler"],
        "autocomplete": ["autocompleteWatcher"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-input-text"];
    components.forEach(tagName => { switch (tagName) {
        case "market-input-text":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InputText);
            }
            break;
    } });
}

const MarketInputText = InputText;
const defineCustomElement = defineCustomElement$1;

export { MarketInputText, defineCustomElement };

//# sourceMappingURL=market-input-text.js.map