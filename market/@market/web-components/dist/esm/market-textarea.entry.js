import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { c as cjs } from './index-0ae5b082.js';
import { b as getTextInputAriaLabel, o as observeAriaAttributes } from './aria-7b58e134.js';

const marketTextareaCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{position:relative;outline:none;font-weight:var(--field-input-weight);font-size:var(--field-input-size);line-height:var(--field-input-leading);cursor:text}:host input,:host ::slotted(input),:host textarea,:host ::slotted(textarea){width:100%;margin:0;padding:0;border:none;background-color:transparent;color:inherit;font-weight:inherit;font-size:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;cursor:inherit}:host ::slotted(label){cursor:inherit}:host input:focus,:host ::slotted(input:focus),:host textarea:focus,:host ::slotted(textarea:focus){outline:none}:host input::-moz-placeholder,:host textarea::-moz-placeholder{color:var(--field-placeholder-text-color)}:host input::placeholder,:host textarea::placeholder{color:var(--field-placeholder-text-color)}:host ::slotted(input)::-moz-placeholder,:host ::slotted(textarea)::-moz-placeholder{color:var(--field-placeholder-text-color)}:host ::slotted(input)::placeholder,:host ::slotted(textarea)::placeholder{color:var(--field-placeholder-text-color)}:host([size='small']){font-size:var(--core-type-paragraph-20-size);line-height:var(--core-type-paragraph-20-leading)}:host{border-radius:var(--field-border-radius);background-color:var(--field-normal-state-background-color);color:var(--field-normal-state-input-color)}:host::after{content:\"\";position:absolute;inset:0;border-radius:var(--field-border-radius);box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-normal-validity-border-color);pointer-events:none}:host([invalid])::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-invalid-validity-border-color)}:host(:hover){background-color:var(--field-hover-state-background-color);color:var(--field-hover-state-input-color)}:host(:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-hover-state-normal-validity-border-color)}:host([invalid]:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-hover-state-invalid-validity-border-color)}:host([focused]){color:var(--field-focus-state-input-color)}:host([focused])::after{box-shadow:inset 0 0 0 var(--field-focus-state-border-size)\n        var(--field-focus-state-normal-validity-border-color)}:host([focused][invalid])::after{box-shadow:inset 0 0 0 var(--field-focus-state-border-size) var(--field-focus-state-invalid-validity-border-color)}:host([readonly]:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-normal-validity-border-color)}:host([disabled]){background-color:var(--field-disabled-state-background-color) !important;color:var(--field-disabled-state-input-color) !important;cursor:not-allowed !important}:host([disabled])::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-disabled-state-border-color) !important}:host([disabled]) ::slotted(.market-accessory),:host([disabled]) ::slotted(img[slot*=\"accessory\"]),:host([disabled]) ::slotted(svg[slot*=\"accessory\"]),:host([disabled]) ::slotted(div[slot*=\"accessory\"]){--field-disabled-state-accessory-opacity:var(--row-disabled-state-leading-accessory-opacity);opacity:var(--field-disabled-state-accessory-opacity)}:host([value=\"\"]) ::slotted(label){color:var(--field-normal-state-empty-phase-label-color)}:host(:not([value=\"\"])) ::slotted(label),:host([value=\"\"][autofilled]) ::slotted(label){color:var(--field-normal-state-float-phase-label-color)}:host(:hover) ::slotted(label){color:var(--field-hover-state-empty-phase-label-color)}:host(:not([value=\"\"]):hover) ::slotted(label),:host([value=\"\"][autofilled]:hover) ::slotted(label){color:var(--field-hover-state-float-phase-label-color)}:host([focused]) ::slotted(label){color:var(--field-focus-state-float-phase-label-color)}:host([value=\"\"][disabled]) ::slotted(label){color:var(--field-disabled-state-empty-phase-label-color)}:host(:not([value=\"\"])[disabled]) ::slotted(label),:host([value=\"\"][autofilled][disabled]) ::slotted(label){color:var(--field-disabled-state-float-phase-label-color)}:host{--field-input-animation-speed:0.2s;--field-input-label-translate:12px;--field-empty-phase-label-text-size-unitless:16;--field-float-phase-label-text-size-unitless:14;--field-size-medium-float-phase-vertical-padding-size:12px;--field-size-medium-float-phase-horizontal-padding-size:16px;--field-size-small-float-phase-vertical-padding-size:9px;--field-size-small-float-phase-horizontal-padding-size:12px;display:flex;align-items:center}:host .label-input-container,:host([value='']:not([focused]):not([autofilled])) .label-input-container{flex-grow:1;padding:var(--field-float-phase-vertical-padding-size) var(--field-float-phase-horizontal-padding-size)}:host([size='medium']) .label-input-container,:host([size='medium'][value='']:not([focused]):not([autofilled])) .label-input-container{padding:var(--field-size-medium-float-phase-vertical-padding-size)\n      var(--field-size-medium-float-phase-horizontal-padding-size)}:host([size='small']) .label-input-container,:host([size='small'][value='']:not([focused]):not([autofilled])) .label-input-container{padding:var(--field-size-small-float-phase-vertical-padding-size)\n      var(--field-size-small-float-phase-horizontal-padding-size)}:host ::slotted(label){display:block;min-height:var(--field-empty-phase-label-text-leading);font-weight:var(--field-empty-phase-label-text-weight);font-size:var(--field-empty-phase-label-text-size);line-height:var(--field-empty-phase-label-text-leading);letter-spacing:var(--field-empty-phase-label-text-tracking);transition:all var(--field-input-animation-speed);transform:translateY(var(--field-input-label-translate));transform-origin:0 0}:host(:not([value=\"\"])) ::slotted(label),:host([value=\"\"]:not([focused])[autofilled]) ::slotted(label),:host([focused]) ::slotted(label){font-weight:var(--field-float-phase-label-text-weight);transform:scale(\n        calc(var(--field-float-phase-label-text-size-unitless) / var(--field-empty-phase-label-text-size-unitless))\n      )}:host input,:host ::slotted(input),:host textarea,:host ::slotted(textarea){opacity:0%}:host([focused]) input,:host([focused]) ::slotted(input),:host([focused]) textarea,:host([focused]) ::slotted(textarea),:host(:not([value=''])) input,:host(:not([value=''])) ::slotted(input),:host(:not([value=''])) textarea,:host(:not([value=''])) ::slotted(textarea){opacity:100%}:host([size='small']) ::slotted(label),:host([size='medium']) ::slotted(label){position:absolute;overflow:hidden;clip:rect(0 0 0 0);width:1px;height:1px;white-space:nowrap;-webkit-clip-path:inset(50%);clip-path:inset(50%)}:host([size='small']) input,:host([size='small']) ::slotted(input),:host([size='small']) textarea,:host([size='small']) ::slotted(textarea),:host([size='medium']) input,:host([size='medium']) ::slotted(input),:host([size='medium']) textarea,:host([size='medium']) ::slotted(textarea){opacity:100%}:host{--textarea-height:120px;--textarea-minimum-height:120px;--textarea-label-bottom-padding:16px;flex-direction:column;overflow:hidden;min-height:var(--textarea-minimum-height);max-height:var(--textarea-maximum-height);resize:vertical}:host .label-input-container,:host([value='']:not([focused]):not([autofilled])) .label-input-container{display:flex;flex-direction:column;width:100%;padding-bottom:var(--textarea-label-bottom-padding);font-weight:var(--textarea-font-weight);font-size:var(--textarea-font-size);line-height:var(--textarea-font-leading);letter-spacing:var(--textarea-font-tracking)}:host([disabled]) textarea,:host([disabled]) ::slotted(textarea){pointer-events:auto !important;}textarea,::slotted(textarea){flex-grow:1;resize:none}";
const MarketTextareaStyle0 = marketTextareaCss;

const MarketTextarea = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketTextareaValueChange = createEvent(this, "marketTextareaValueChange", 7);
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
        this.maxHeight = `${cjs.TEXTAREA_MAXIMUM_HEIGHT}px`;
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
    get el() { return getElement(this); }
};
MarketTextarea.style = MarketTextareaStyle0;

export { MarketTextarea as market_textarea };

//# sourceMappingURL=market-textarea.entry.js.map