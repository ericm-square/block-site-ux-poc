'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const autocomplete = require('./autocomplete-d3ecf142.js');
const classnames = require('./classnames-46cc7012.js');
const index$1 = require('./index-254d04f0.js');
const forms = require('./forms-08db29a3.js');

const marketInputSearchCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}@keyframes market-popup{from{opacity:0%;transform:scale(0.9, 0.9)}to{opacity:100%;transform:scale(1, 1)}}@keyframes market-popdown{from{opacity:100%;transform:scale(1, 1)}to{opacity:0%;transform:scale(0.9, 0.9)}}@keyframes market-slideup{from{opacity:0%;transform:translateY(80vh)}to{opacity:100%;transform:translateY(0)}}@keyframes market-slidedown{from{opacity:100%;transform:translateY(0)}to{opacity:0%;transform:translateY(80vh)}}@keyframes market-slide-left-enter{from{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes market-slide-left-exit{from{transform:translateX(0)}to{transform:translateX(100%)}}@keyframes market-fade-in{from{opacity:0%}to{opacity:100%}}@keyframes market-fade-out{from{opacity:100%}to{opacity:0%}}@keyframes market-input-autofill-start{from{}to{}}@keyframes market-input-autofill-cancel{from{}to{}}@keyframes market-input-search-compact-enter{from{}to{}}@keyframes market-input-search-compact-exit{from{}to{}}:host{--input-search-accessory-height:48px;--input-search-accessory-width:48px;--input-search-animation-enter-transition-duration:var(--core-animation-enter-transition-moderate-speed-duration);--input-search-animation-enter-transition-easing:var(--core-animation-enter-transition-easing);--input-search-animation-exit-transition-duration:var(--core-animation-exit-transition-fast-speed-duration);--input-search-animation-exit-transition-easing:var(--core-animation-exit-transition-easing);--input-search-background-color:var(--core-surface-5-color);--input-search-border-radius:6px;--input-search-border-size:1px;--input-search-clear-button-fill:var(--core-text-20-color);--input-search-clear-button-hover-state-fill:var(--core-fill-10-color);--input-search-compact-state-hover-state-background-color:var(--core-fill-40-color);--input-search-compact-state-hover-state-border-color:var(--core-fill-30-color);--input-search-compact-state-max-width:40px;--input-search-disabled-state-border-color:var(--core-fill-40-color);--input-search-disabled-state-text-color:var(--core-text-20-color);--input-search-focused-state-border-color:var(--core-fill-10-color);--input-search-height:48px;--input-search-hover-state-border-color:var(--core-fill-20-color);--input-search-icon-color:var(--core-text-10-color);--input-search-normal-state-border-color:var(--core-fill-30-color);--input-search-secondary-button-disabled-state-color:var(--core-text-30-color);--input-search-small-size-accessory-height:40px;--input-search-small-size-accessory-width:40px;--input-search-small-size-compact-state-max-width:40px;--input-search-small-size-height:40px;--input-search-small-size-text-size:14px;--input-search-text-color:var(--core-text-10-color);--input-search-text-font-family:var(--square-sans-text);--input-search-text-leading:24px;--input-search-text-placeholder-color:var(--core-text-30-color);--input-search-text-size:16px;--input-search-text-weight:var(--core-type-regular-weight);display:flex;flex:1;flex-direction:row;align-items:center;border:var(--input-search-border-size) solid var(--input-search-normal-state-border-color);border-radius:var(--input-search-border-radius);background-color:var(--input-search-background-color);color:var(--input-search-text-color);font-weight:var(--input-search-text-weight);font-family:var(--input-search-text-font-family);line-height:var(--input-search-text-leading);cursor:text;transition:flex\n    var(--input-search-animation-enter-transition-duration)\n    var(--input-search-animation-enter-transition-easing)}:host(.preload){transition:none !important;}:host(:hover){border-color:var(--input-search-hover-state-border-color)}:host([focused]){border-color:var(--input-search-focused-state-border-color)}:host([disabled]){border-color:var(--input-search-disabled-state-border-color);color:var(--input-search-disabled-state-text-color);cursor:not-allowed}:host([disabled]) svg{fill:var(--input-search-secondary-button-disabled-state-color)}:host([variant=\"medium\" i]),:host([size=\"medium\" i]){height:var(--input-search-height);font-size:var(--input-search-text-size)}:host([variant=\"medium\" i]) .leading-accessory,:host([variant=\"medium\" i]) .leading-accessory .market-accessory,:host([variant=\"medium\" i]) ::slotted([slot=\"trailing-accessory\"]),:host([variant=\"medium\" i]) .clear-button,:host([size=\"medium\" i]) .leading-accessory,:host([size=\"medium\" i]) .leading-accessory .market-accessory,:host([size=\"medium\" i]) ::slotted([slot=\"trailing-accessory\"]),:host([size=\"medium\" i]) .clear-button{width:calc(var(--input-search-accessory-width) - var(--input-search-border-size) * 2);height:calc(var(--input-search-accessory-height) - var(--input-search-border-size) * 2)}:host([variant=\"medium\" i][compact]:not([focused])),:host([size=\"medium\" i][compact]:not([focused])){flex-basis:var(--input-search-compact-state-max-width)}:host([variant=\"small\" i]),:host([size=\"small\" i]){height:var(--input-search-small-size-height);font-size:var(--input-search-small-size-text-size)}:host([variant=\"small\" i]) .leading-accessory,:host([variant=\"small\" i]) .leading-accessory .market-accessory,:host([variant=\"small\" i]) ::slotted([slot=\"trailing-accessory\"]),:host([variant=\"small\" i]) .clear-button,:host([size=\"small\" i]) .leading-accessory,:host([size=\"small\" i]) .leading-accessory .market-accessory,:host([size=\"small\" i]) ::slotted([slot=\"trailing-accessory\"]),:host([size=\"small\" i]) .clear-button{width:calc(var(--input-search-small-size-accessory-width) - var(--input-search-border-size) * 2);height:calc(var(--input-search-small-size-accessory-height) - var(--input-search-border-size) * 2)}:host([variant=\"small\" i][compact]:not([focused])),:host([size=\"small\" i][compact]:not([focused])){flex-basis:var(--input-search-small-size-compact-state-max-width)}:host([compact]:not([focused])){flex:0;cursor:pointer;transition:flex\n    var(--input-search-animation-exit-transition-duration)\n    var(--input-search-animation-exit-transition-easing);animation-name:market-input-search-compact-exit;animation-duration:var(--input-search-animation-exit-transition-duration)}:host([compact]:not([focused])) .leading-accessory{margin-right:0;pointer-events:none}:host([compact]:not([focused])) ::slotted([slot=\"trailing-accessory\"]),:host([compact]:not([focused])) .clear-button{display:none}:host([compact]:not([focused]):hover){border-color:var(--input-search-compact-state-hover-state-border-color);background-color:var(--input-search-compact-state-hover-state-background-color)}:host([compact][focused]){animation-name:market-input-search-compact-enter;animation-duration:var(--input-search-animation-enter-transition-duration)}input::-moz-placeholder,::slotted(input::-moz-placeholder){color:var(--input-search-text-placeholder-color)}input::placeholder,::slotted(input::placeholder),:host([value=\"\"]) input,:host([value=\"\"]) ::slotted(input){color:var(--input-search-text-placeholder-color)}.leading-accessory,::slotted([slot=\"trailing-accessory\"]),.clear-button{display:flex;justify-content:center;align-items:center;padding:0;border:0;background:transparent}.leading-accessory.is-back-icon,.clear-button{cursor:pointer}.clear-button svg{fill:var(--input-search-clear-button-fill)}.clear-button:hover svg{fill:var(--input-search-clear-button-hover-state-fill)}.clear-button.hidden{display:none}svg{fill:var(--input-search-icon-color)}.input-container{flex:1}input,::slotted(input){width:100%;height:var(--input-search-text-leading);padding:0;border:none;background-color:transparent;color:inherit;font-weight:inherit;font-size:inherit;font-family:inherit}input:focus,::slotted(input:focus){outline:none}input[disabled],::slotted(input[disabled]){color:var(--input-search-disabled-state-text-color)}:host(:not([value=\"\"])) ::slotted([slot=\"trailing-accessory\"]){display:none}input:-webkit-autofill,::slotted(input:-webkit-autofill){box-shadow:0 0 0 var(--input-search-text-leading) var(--input-search-background-color) inset !important;-webkit-text-fill-color:var(--input-search-text-color) !important;caret-color:var(--input-search-text-color)}:host input:-webkit-autofill,:host ::slotted(input:-webkit-autofill){animation-name:market-input-autofill-start}:host input:not(:-webkit-autofill),:host ::slotted(input:not(:-webkit-autofill)){animation-name:market-input-autofill-cancel}";
const MarketInputSearchStyle0 = marketInputSearchCss;

const InputText = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketInputSearchCleared = index.createEvent(this, "marketInputSearchCleared", 7);
        this.marketInputSearchValueChange = index.createEvent(this, "marketInputSearchValueChange", 7);
        this.marketInputSearchFocus = index.createEvent(this, "marketInputSearchFocus", 7);
        this.marketInternalInputSearchCompactAnimation = index.createEvent(this, "marketInternalInputSearchCompactAnimation", 7);
        this.marketInputSearchDidLoad = index.createEvent(this, "marketInputSearchDidLoad", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
        this.value = '';
        this.placeholder = '';
        this.maxlength = undefined;
        this.size = 'medium';
        this.variant = 'medium';
        this.disabled = false;
        this.focused = false;
        this.autofocus = false;
        this.autocomplete = true;
        this.name = undefined;
        this.inputAriaLabel = 'Search';
        this.clearButtonAriaLabel = 'Clear';
        this.searchIconButtonAriaLabel = 'Search icon';
        this.compact = false;
    }
    /**
     * This toggles focus on the inner `<input>`.
     * When input is about to receive focus, force a `tabindex="-1"` on the `<Host>`.
     * Since the focus is already on the inner `<input>`, tabbing into `<Host>` is redundant.
     * When the input loses is focus, the previous `tabindex` value,
     * presumably assigned by the consumer, is assigned back.
     */
    focusedWatcher(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        if (newValue) {
            this.nativeInputEl.focus();
        }
    }
    disabledWatcher(newValue) {
        // if this component is disabled but focused, make sure to remove focus
        if (newValue && this.focused) {
            this.setFocus(false);
        }
    }
    autocompleteWatcher(newValue) {
        this._autocomplete = autocomplete.autocompleteWatcher(newValue);
    }
    /**
     * Sets focus styling on `<market-input-search>`;
     * toggles focus on the native `<input>` depending on the value passed
     * @param value new `focused` value
     */
    setFocus(value = true) {
        // don't do anything when: disabled; or it's already focused/blurred
        if ((this.disabled && value) || this.focused === value) {
            return Promise.resolve();
        }
        const { defaultPrevented } = this.marketInputSearchFocus.emit(value);
        if (!defaultPrevented) {
            this.focused = value; // this will cause the `focusedChangeHandler` to be triggered
            if (!value && this.nativeInputEl) {
                this.nativeInputEl.blur();
            }
        }
        return Promise.resolve();
    }
    /**
     * Clears the current input value.
     */
    clearInput() {
        const clearedEvent = this.marketInputSearchCleared.emit();
        if (clearedEvent.defaultPrevented || this.value === '') {
            // if the value is already '', no need to emit the value change event below
            return Promise.resolve();
        }
        const valueChangeEvent = this.marketInputSearchValueChange.emit({
            current: '',
            prevValue: this.value,
            originalEvent: null,
            value: '',
        });
        if (!valueChangeEvent.defaultPrevented) {
            this.value = '';
        }
        return Promise.resolve();
    }
    /**
     * When the clear (X) button is clicked
     */
    async handleClearButtonClicked() {
        await this.clearInput();
        this.clearButtonClicked = true;
    }
    /**
     * Handle value change from an <input> event
     */
    handleValueChange(e) {
        const target = e.target;
        if (!target) {
            return;
        }
        const { defaultPrevented } = this.marketInputSearchValueChange.emit({
            current: target.value,
            prevValue: this.value,
            originalEvent: e,
            value: target.value,
        });
        if (defaultPrevented) {
            e.preventDefault();
            return;
        }
        this.updateElementInternals();
        this.value = target.value;
    }
    /**
     * Handles `.input-container` animation changes
     */
    handleAnimation(e) {
        if (!this.compact) {
            return;
        }
        if (e.animationName === 'market-input-search-compact-enter' && e.type === 'animationstart' && this.focused) {
            this.marketInternalInputSearchCompactAnimation.emit(e.type);
            // re-focus because `this.focused` prop change happens first before this animation even trigger
            window.requestAnimationFrame(() => {
                var _a;
                (_a = this.nativeInputEl) === null || _a === void 0 ? void 0 : _a.focus();
            });
        }
        else if (e.animationName === 'market-input-search-compact-exit' && e.type === 'animationend') {
            this.marketInternalInputSearchCompactAnimation.emit(e.type);
        }
    }
    handleAccessoryClicked(e, isBackIcon) {
        if (isBackIcon) {
            e.stopPropagation();
            // back button should be displayed, so unfocus
            this.setFocus(false);
        }
    }
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            forms.submitFormImplicitly(this.el);
        }
    }
    /**
     * Allows passing an alternative light DOM input.
     */
    registerSlottedInput(slottedInput) {
        var _a;
        this.slottedInputEl =
            slottedInput ||
                // input slotted into market-input-search
                this.el.querySelector('input[slot=input]') ||
                (
                // input slotted into a higher-level component that uses market-input-search
                // (e.g. market-input-password)
                (_a = this.el.getRootNode().host) === null || _a === void 0 ? void 0 : _a.querySelector('input[slot=input]'));
        if (this.slottedInputEl) {
            this.slottedInputEl.addEventListener('input', (e) => this.handleValueChange(e));
            this.slottedInputEl.addEventListener('focus', () => this.setFocus());
            this.slottedInputEl.addEventListener('blur', () => this.setFocus(false));
            this.slottedInputEl.addEventListener('keydown', (e) => this.handleKeyDown(e));
            this.nativeInputEl = this.slottedInputEl;
        }
    }
    /**
     * TODO: This should be a common util. -antonn
     */
    updateSharedInputProps() {
        const prevSharedProps = Object.assign({}, this.sharedProps);
        // used by the default shadow DOM native input and to copy component properties to slotted inputs
        // conditionally adding key/value pairs based on whether we want to set them on the <input>
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#individual_attributes
        this.sharedProps = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (this._autocomplete && { autocomplete: this._autocomplete })), (this.autofocus && { autofocus: this.autofocus })), (this.disabled && { disabled: this.disabled })), (this.maxlength >= 0 && { maxlength: this.maxlength })), (this.name && { name: this.name })), (this.placeholder && { placeholder: this.placeholder })), (this.value !== undefined && { value: this.value }));
        // sync component props to slotted input, if one exists
        if (this.slottedInputEl) {
            const modifiedPropKeys = [...new Set([...Object.keys(prevSharedProps), ...Object.keys(this.sharedProps)])];
            modifiedPropKeys.forEach((key) => {
                if (!(key in this.sharedProps)) {
                    // remove properties that have been unset
                    this.slottedInputEl.removeAttribute(key);
                }
                else {
                    /**
                     * Boolean attributes can be set using empty strings
                     * https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#javascript
                     *
                     * But for setting properties like `value` (currently the only known one), directly modify the value instead
                     * https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#gecko_notes
                     */
                    const attributeValue = this.sharedProps[key] !== true ? this.sharedProps[key] : '';
                    if (key === 'value') {
                        this.slottedInputEl.value = attributeValue;
                    }
                    else if (attributeValue === false) {
                        this.slottedInputEl.removeAttribute(key);
                    }
                    else {
                        this.slottedInputEl.setAttribute(key, attributeValue);
                    }
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
        if (this.nativeInputEl) {
            (_d = (_c = this.internals).setValidity) === null || _d === void 0 ? void 0 : _d.call(_c, this.nativeInputEl.validity, this.nativeInputEl.validationMessage);
        }
    }
    componentWillLoad() {
        this.el.classList.add('preload'); // disables transitions on page load
        this.autocompleteWatcher(this.autocomplete);
        this.registerSlottedInput();
        this.updateSharedInputProps();
        this.updateElementInternals();
    }
    componentWillUpdate() {
        this.updateSharedInputProps();
        this.updateElementInternals();
    }
    componentDidLoad() {
        this.el.classList.remove('preload');
        this.marketInputSearchDidLoad.emit();
    }
    render() {
        const isBackIcon = this.compact && this.focused;
        // remove tabindex from host if inner <input> is already focused
        const tabindex = this.el.querySelector('input:focus') ? -1 : undefined;
        const MarketAccessoryTagName = index$1.getNamespacedTagFor('market-accessory');
        return (index.h(index.Host, { key: '133164a3dff4cdf3c6eb2794c8c5314b21bc581a', class: "market-input-search", onAnimationEnd: (e) => this.handleAnimation(e), onAnimationStart: (e) => this.handleAnimation(e), onBlur: () => {
                var _a;
                if (this.clearButtonClicked) {
                    (_a = this.nativeInputEl) === null || _a === void 0 ? void 0 : _a.focus();
                    this.clearButtonClicked = false;
                }
                else {
                    this.setFocus(false);
                }
            }, onClick: (e) => {
                e.stopPropagation();
                this.setFocus();
            }, onFocus: () => this.setFocus(), tabindex: tabindex }, index.h("button", { key: '65f27022216df4507d9e33f3be45c6cba519cd76', class: classnames.classNames('leading-accessory', {
                'is-back-icon': isBackIcon,
            }), "aria-label": this.searchIconButtonAriaLabel, onClick: (e) => this.handleAccessoryClicked(e, isBackIcon), "aria-hidden": isBackIcon ? 'false' : 'true', tabindex: isBackIcon ? '0' : '-1' }, index.h("slot", { key: 'cf48f6cef7804a9a729a011844bd5bbe86d7b902', name: "leading-accessory" }, index.h(MarketAccessoryTagName, { key: 'e1b65cddebbd31f71dce043619a582e7dfb60fe9', size: "icon", tabindex: "-1", "aria-hidden": "true" }, isBackIcon ? (
        // back icon
        index.h("svg", { width: "15", height: "16", viewBox: "0 0 15 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0.292894 7.29285C-0.0976308 7.68337 -0.0976307 8.31654 0.292894 8.70706L7.29289 15.7071L8.70711 14.2928L3.41421 8.99995L15 8.99995L15 6.99995L3.41421 6.99995L8.70711 1.70706L7.29289 0.292846L0.292894 7.29285Z" }))) : (
        // search icon
        index.h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { d: "M7.49999 14.4998C9.06999 14.4998 10.52 13.9698 11.68 13.0998L15.79 17.2098L17.2 15.7998L13.09 11.6898C13.97 10.5198 14.49 9.07983 14.49 7.50983C14.49 3.64983 11.35 0.509827 7.48999 0.509827C3.62999 0.509827 0.48999 3.64983 0.48999 7.50983C0.48999 11.3698 3.63999 14.4998 7.49999 14.4998ZM7.49999 2.49983C10.26 2.49983 12.5 4.73983 12.5 7.49983C12.5 10.2598 10.26 12.4998 7.49999 12.4998C4.73999 12.4998 2.49999 10.2598 2.49999 7.49983C2.49999 4.73983 4.73999 2.49983 7.49999 2.49983Z" })))))), index.h("div", { key: '616a4221ceecb87592b3f084a760fd4900ed58c0', class: "input-container" }, index.h("slot", { key: '71088c117ef927aed382b3a53fc1fbb9d7bf6fba', name: "input", onSlotchange: () => this.registerSlottedInput() }, !this.slottedInputEl && (index.h("input", Object.assign({ key: 'ffba176eaf116ee61fe69b3b234fb1f0ebc5edfa', "aria-label": this.inputAriaLabel, onInput: (e) => this.handleValueChange(e), onKeyDown: (e) => {
                this.handleKeyDown(e);
            }, part: "native-input", ref: (input) => (this.nativeInputEl = input), type: "text" }, this.sharedProps))))), index.h("slot", { key: 'f259048200346a8163766b86d6c65b204e328471', name: "trailing-accessory" }), index.h("button", { key: 'e4ecd8d3fecf4155c929c0676351ea26a00aae82', "aria-label": this.clearButtonAriaLabel, class: classnames.classNames('clear-button', { hidden: !this.value || this.disabled }), onClick: this.handleClearButtonClicked.bind(this), tabindex: "0" }, index.h("svg", { key: '625050a3a003ee3e1ae18da5f0dd9857e3f9f17a', width: "14", height: "14", viewBox: "0 0 14 14", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { key: '2a3e4a6396d02a59054f108a04881bacd671dd7c', d: "M1.71004 13.71L7.00004 8.41004L12.29 13.71L13.71 12.29L8.41004 7.00004L13.71 1.71004L12.29 0.290039L7.00004 5.59004L1.71004 0.290039L0.290039 1.71004L5.59004 7.00004L0.290039 12.29L1.71004 13.71Z" })))));
    }
    static get formAssociated() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "focused": ["focusedWatcher"],
        "disabled": ["disabledWatcher"],
        "autocomplete": ["autocompleteWatcher"]
    }; }
};
InputText.style = MarketInputSearchStyle0;

exports.market_input_search = InputText;

//# sourceMappingURL=market-input-search.cjs.entry.js.map