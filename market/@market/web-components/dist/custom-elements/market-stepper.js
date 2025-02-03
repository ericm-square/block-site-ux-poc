import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { s as submitFormImplicitly } from './forms.js';

const marketStepperCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{position:relative;outline:none;font-weight:var(--field-input-weight);font-size:var(--field-input-size);line-height:var(--field-input-leading);cursor:text}:host input,:host ::slotted(input),:host textarea,:host ::slotted(textarea){width:100%;margin:0;padding:0;border:none;background-color:transparent;color:inherit;font-weight:inherit;font-size:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;cursor:inherit}:host ::slotted(label){cursor:inherit}:host input:focus,:host ::slotted(input:focus),:host textarea:focus,:host ::slotted(textarea:focus){outline:none}:host input::-moz-placeholder,:host textarea::-moz-placeholder{color:var(--field-placeholder-text-color)}:host input::placeholder,:host textarea::placeholder{color:var(--field-placeholder-text-color)}:host ::slotted(input)::-moz-placeholder,:host ::slotted(textarea)::-moz-placeholder{color:var(--field-placeholder-text-color)}:host ::slotted(input)::placeholder,:host ::slotted(textarea)::placeholder{color:var(--field-placeholder-text-color)}:host([size='small']){font-size:var(--core-type-paragraph-20-size);line-height:var(--core-type-paragraph-20-leading)}:host{border-radius:var(--field-border-radius);background-color:var(--field-normal-state-background-color);color:var(--field-normal-state-input-color)}:host::after{content:\"\";position:absolute;inset:0;border-radius:var(--field-border-radius);box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-normal-validity-border-color);pointer-events:none}:host([invalid])::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-invalid-validity-border-color)}:host(:hover){background-color:var(--field-hover-state-background-color);color:var(--field-hover-state-input-color)}:host(:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-hover-state-normal-validity-border-color)}:host([invalid]:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-hover-state-invalid-validity-border-color)}:host([focused]){color:var(--field-focus-state-input-color)}:host([focused])::after{box-shadow:inset 0 0 0 var(--field-focus-state-border-size)\n        var(--field-focus-state-normal-validity-border-color)}:host([focused][invalid])::after{box-shadow:inset 0 0 0 var(--field-focus-state-border-size) var(--field-focus-state-invalid-validity-border-color)}:host([readonly]:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-normal-validity-border-color)}:host([disabled]){background-color:var(--field-disabled-state-background-color) !important;color:var(--field-disabled-state-input-color) !important;cursor:not-allowed !important}:host([disabled])::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-disabled-state-border-color) !important}:host([disabled]) ::slotted(.market-accessory),:host([disabled]) ::slotted(img[slot*=\"accessory\"]),:host([disabled]) ::slotted(svg[slot*=\"accessory\"]),:host([disabled]) ::slotted(div[slot*=\"accessory\"]){--field-disabled-state-accessory-opacity:var(--row-disabled-state-leading-accessory-opacity);opacity:var(--field-disabled-state-accessory-opacity)}:host([value=\"\"]) ::slotted(label){color:var(--field-normal-state-empty-phase-label-color)}:host(:not([value=\"\"])) ::slotted(label),:host([value=\"\"][autofilled]) ::slotted(label){color:var(--field-normal-state-float-phase-label-color)}:host(:hover) ::slotted(label){color:var(--field-hover-state-empty-phase-label-color)}:host(:not([value=\"\"]):hover) ::slotted(label),:host([value=\"\"][autofilled]:hover) ::slotted(label){color:var(--field-hover-state-float-phase-label-color)}:host([focused]) ::slotted(label){color:var(--field-focus-state-float-phase-label-color)}:host([value=\"\"][disabled]) ::slotted(label){color:var(--field-disabled-state-empty-phase-label-color)}:host(:not([value=\"\"])[disabled]) ::slotted(label),:host([value=\"\"][autofilled][disabled]) ::slotted(label){color:var(--field-disabled-state-float-phase-label-color)}:host input::-webkit-outer-spin-button,:host input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none;appearance:none}:host input[type=\"number\"]{-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}:host{--focus-ring-color:color-mix(in srgb, var(--core-focus-ring-color) 100%, transparent);display:flex;align-items:center}:host input{--stepper-quantity-input-field-height:calc(\n        var(--stepper-quantity-input-field-value-text-leading) + var(--stepper-padding-size) * 2\n      );position:relative;bottom:0;width:100%;height:var(--stepper-quantity-input-field-height);color:var(--stepper-quantity-input-field-value-text-normal-state-color);font-weight:var(--stepper-quantity-input-field-value-text-weight);font-size:var(--stepper-quantity-input-field-value-text-size);font-family:var(--stepper-quantity-input-field-value-text-font-family);line-height:var(--stepper-quantity-input-field-value-text-leading);letter-spacing:var(--stepper-quantity-input-field-value-text-tracking);text-align:center;text-transform:var(--stepper-quantity-input-field-value-text-case);cursor:text;font-feature-settings:\"tnum\"}:host input[disabled]{color:var(--stepper-quantity-input-field-value-text-disabled-state-color)}:host input::-moz-placeholder{color:var(--stepper-quantity-input-field-value-text-placeholder-color)}:host input::placeholder{color:var(--stepper-quantity-input-field-value-text-placeholder-color)}button{--transition-duration:0.2s;--stepper-button-size:var(--stepper-button-minimum-height);position:relative;display:inline-flex;flex-shrink:0;justify-content:center;align-items:center;box-sizing:content-box;width:var(--stepper-button-size);height:var(--stepper-button-size);padding:var(--stepper-padding-size);border:none;border-radius:var(--stepper-border-radius);background:none;cursor:pointer;transition:background-color color var(--transition-duration)}button::before{content:\"\";position:absolute;inset:0;display:block;margin:var(--stepper-padding-size);border-radius:var(--stepper-button-border-radius);background:var(--stepper-button-normal-state-background-color)}button svg{position:relative;pointer-events:none;fill:var(--stepper-button-normal-state-icon-color)}button:hover::before{background:var(--stepper-button-hover-state-background-color)}button:hover svg{fill:var(--stepper-button-hover-state-icon-color)}button:focus{outline:none}button:focus::before{background:var(--stepper-button-focus-state-background-color)}button:focus svg{fill:var(--stepper-button-focus-state-icon-color)}button:focus-visible::before{outline:var(--core-focus-ring-border-size) solid var(--focus-ring-color);outline-offset:var(--core-focus-ring-border-size)}button:active::before{background:var(--stepper-button-pressed-state-background-color)}button:active svg{fill:var(--stepper-button-pressed-state-icon-color)}button[disabled]{cursor:not-allowed}button[disabled]::before{background:var(--stepper-button-disabled-state-background-color)}button[disabled] svg{fill:var(--stepper-button-disabled-state-icon-color)}";
const MarketStepperStyle0 = marketStepperCss;

const MarketStepper$1 = /*@__PURE__*/ proxyCustomElement(class MarketStepper extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketStepperValueChange = createEvent(this, "marketStepperValueChange", 7);
        this.marketStepperInputFocus = createEvent(this, "marketStepperInputFocus", 7);
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
    get el() { return this; }
    static get watchers() { return {
        "value": ["valueChangeHandler"]
    }; }
    static get style() { return MarketStepperStyle0; }
}, [1, "market-stepper", {
        "value": [1538],
        "inputId": [1, "input-id"],
        "name": [1],
        "placeholder": [1],
        "max": [2],
        "min": [2],
        "step": [2],
        "readonly": [516],
        "disabled": [516],
        "focused": [1540],
        "invalid": [516],
        "inputAriaLabel": [513, "input-aria-label"],
        "decrementAriaLabel": [513, "decrement-aria-label"],
        "incrementAriaLabel": [513, "increment-aria-label"],
        "incrementDisabled": [32],
        "decrementDisabled": [32],
        "setFocus": [64]
    }, undefined, {
        "value": ["valueChangeHandler"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-stepper"];
    components.forEach(tagName => { switch (tagName) {
        case "market-stepper":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketStepper$1);
            }
            break;
    } });
}

const MarketStepper = MarketStepper$1;
const defineCustomElement = defineCustomElement$1;

export { MarketStepper, defineCustomElement };

//# sourceMappingURL=market-stepper.js.map