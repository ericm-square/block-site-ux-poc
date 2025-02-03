import { Host, h } from "@stencil/core";
import { autocompleteWatcher } from "../../utils/autocomplete";
import { classNames } from "../../utils/classnames";
import { getNamespacedTagFor } from "../../utils/namespace";
import { submitFormImplicitly } from "../../utils/forms";
/**
 * @slot input - Can be used to slot your own HTML input, if needed (ex. if supporting browser
 * autofill)
 * @part native-input - The default inner HTML input.
 */
export class InputText {
    constructor() {
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
        this._autocomplete = autocompleteWatcher(newValue);
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
            submitFormImplicitly(this.el);
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
        const MarketAccessoryTagName = getNamespacedTagFor('market-accessory');
        return (h(Host, { key: '133164a3dff4cdf3c6eb2794c8c5314b21bc581a', class: "market-input-search", onAnimationEnd: (e) => this.handleAnimation(e), onAnimationStart: (e) => this.handleAnimation(e), onBlur: () => {
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
            }, onFocus: () => this.setFocus(), tabindex: tabindex }, h("button", { key: '65f27022216df4507d9e33f3be45c6cba519cd76', class: classNames('leading-accessory', {
                'is-back-icon': isBackIcon,
            }), "aria-label": this.searchIconButtonAriaLabel, onClick: (e) => this.handleAccessoryClicked(e, isBackIcon), "aria-hidden": isBackIcon ? 'false' : 'true', tabindex: isBackIcon ? '0' : '-1' }, h("slot", { key: 'cf48f6cef7804a9a729a011844bd5bbe86d7b902', name: "leading-accessory" }, h(MarketAccessoryTagName, { key: 'e1b65cddebbd31f71dce043619a582e7dfb60fe9', size: "icon", tabindex: "-1", "aria-hidden": "true" }, isBackIcon ? (
        // back icon
        h("svg", { width: "15", height: "16", viewBox: "0 0 15 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0.292894 7.29285C-0.0976308 7.68337 -0.0976307 8.31654 0.292894 8.70706L7.29289 15.7071L8.70711 14.2928L3.41421 8.99995L15 8.99995L15 6.99995L3.41421 6.99995L8.70711 1.70706L7.29289 0.292846L0.292894 7.29285Z" }))) : (
        // search icon
        h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M7.49999 14.4998C9.06999 14.4998 10.52 13.9698 11.68 13.0998L15.79 17.2098L17.2 15.7998L13.09 11.6898C13.97 10.5198 14.49 9.07983 14.49 7.50983C14.49 3.64983 11.35 0.509827 7.48999 0.509827C3.62999 0.509827 0.48999 3.64983 0.48999 7.50983C0.48999 11.3698 3.63999 14.4998 7.49999 14.4998ZM7.49999 2.49983C10.26 2.49983 12.5 4.73983 12.5 7.49983C12.5 10.2598 10.26 12.4998 7.49999 12.4998C4.73999 12.4998 2.49999 10.2598 2.49999 7.49983C2.49999 4.73983 4.73999 2.49983 7.49999 2.49983Z" })))))), h("div", { key: '616a4221ceecb87592b3f084a760fd4900ed58c0', class: "input-container" }, h("slot", { key: '71088c117ef927aed382b3a53fc1fbb9d7bf6fba', name: "input", onSlotchange: () => this.registerSlottedInput() }, !this.slottedInputEl && (h("input", Object.assign({ key: 'ffba176eaf116ee61fe69b3b234fb1f0ebc5edfa', "aria-label": this.inputAriaLabel, onInput: (e) => this.handleValueChange(e), onKeyDown: (e) => {
                this.handleKeyDown(e);
            }, part: "native-input", ref: (input) => (this.nativeInputEl = input), type: "text" }, this.sharedProps))))), h("slot", { key: 'f259048200346a8163766b86d6c65b204e328471', name: "trailing-accessory" }), h("button", { key: 'e4ecd8d3fecf4155c929c0676351ea26a00aae82', "aria-label": this.clearButtonAriaLabel, class: classNames('clear-button', { hidden: !this.value || this.disabled }), onClick: this.handleClearButtonClicked.bind(this), tabindex: "0" }, h("svg", { key: '625050a3a003ee3e1ae18da5f0dd9857e3f9f17a', width: "14", height: "14", viewBox: "0 0 14 14", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '2a3e4a6396d02a59054f108a04881bacd671dd7c', d: "M1.71004 13.71L7.00004 8.41004L12.29 13.71L13.71 12.29L8.41004 7.00004L13.71 1.71004L12.29 0.290039L7.00004 5.59004L1.71004 0.290039L0.290039 1.71004L5.59004 7.00004L0.290039 12.29L1.71004 13.71Z" })))));
    }
    static get is() { return "market-input-search"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get originalStyleUrls() {
        return {
            "$": ["market-input-search.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-input-search.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "A string specifying a value for the input;\nthis will be visually shown on the input and can be edited by the user."
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
                    "text": "A string specifying the placeholder of the input;\nthis is shown before a user attempts to add a value, given no value is already provided."
                },
                "attribute": "placeholder",
                "reflect": false,
                "defaultValue": "''"
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
                    "text": "A number specifying the maximum length of characters for the input value"
                },
                "attribute": "maxlength",
                "reflect": false
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'small' | 'medium'",
                    "resolved": "\"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A string specifying the size of the input"
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'medium'"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'small' | 'medium'",
                    "resolved": "\"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "deprecated",
                            "text": "**DEPRECATED (v4.5.0)** Use `size` instead.\n\nA string specifying the size of the input"
                        }],
                    "text": ""
                },
                "attribute": "variant",
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
                    "text": "A boolean representing whether the input is disabled or not;\nthis visually and functionally will disable the input."
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
                    "text": "A boolean representing whether the input is focused or not"
                },
                "attribute": "focused",
                "reflect": true,
                "defaultValue": "false"
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
                    "text": "A boolean representing whether the input should focus on page load"
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
                    "text": "Whether or not this input should allow autocompletion by the browser;\naccepts a boolean, or `\"true\"`, `\"false\"`, `\"on\"`, `\"off\"` or an\n[accepted string value for the autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).\n\nNote (source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)):\nIn order to provide autocompletion, user-agents might require an input to have a:\n1. Have a `name` and/or `id` attribute;\n2. Be descendants of a `<form>` element;\n3. The form to have a submit button"
                },
                "attribute": "autocomplete",
                "reflect": false,
                "defaultValue": "true"
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
                    "text": "A string specifying a name for the search input"
                },
                "attribute": "name",
                "reflect": false
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
                    "text": "A string representing the input's aria-label; localize as needed"
                },
                "attribute": "input-aria-label",
                "reflect": false,
                "defaultValue": "'Search'"
            },
            "clearButtonAriaLabel": {
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
                    "text": "A string representing the clear button's aria-label; localize as needed"
                },
                "attribute": "clear-button-aria-label",
                "reflect": false,
                "defaultValue": "'Clear'"
            },
            "searchIconButtonAriaLabel": {
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
                    "text": "A string representing the search icon button's aria-label; localize as needed"
                },
                "attribute": "search-icon-button-aria-label",
                "reflect": false,
                "defaultValue": "'Search icon'"
            },
            "compact": {
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
                    "text": "**INTERNAL [do not use directly]**\n\nUsed by `market-filter-group` when setting this component to compact mode"
                },
                "attribute": "compact",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketInputSearchCleared",
                "name": "marketInputSearchCleared",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when input is cleared by clicking the clear button"
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "marketInputSearchValueChange",
                "name": "marketInputSearchValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted whenever the input value changes"
                },
                "complexType": {
                    "original": "TMarketInputSearchValueChangeEventDetail",
                    "resolved": "{ current: string; prevValue: string; originalEvent: unknown; value: string; }",
                    "references": {
                        "TMarketInputSearchValueChangeEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-input-search/events.ts::TMarketInputSearchValueChangeEventDetail"
                        }
                    }
                }
            }, {
                "method": "marketInputSearchFocus",
                "name": "marketInputSearchFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the inner `<input>` element is focused or blurred"
                },
                "complexType": {
                    "original": "TMarketInputSearchFocusEventDetail",
                    "resolved": "boolean",
                    "references": {
                        "TMarketInputSearchFocusEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-input-search/events.ts::TMarketInputSearchFocusEventDetail"
                        }
                    }
                }
            }, {
                "method": "marketInternalInputSearchCompactAnimation",
                "name": "marketInternalInputSearchCompactAnimation",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "**INTERNAL [do not use directly]**\n\nEmitted when the compact animation has started or ended"
                },
                "complexType": {
                    "original": "TMarketInternalInputSearchCompactAnimationEventDetail",
                    "resolved": "\"animationend\" | \"animationstart\"",
                    "references": {
                        "TMarketInternalInputSearchCompactAnimationEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-input-search/events.ts::TMarketInternalInputSearchCompactAnimationEventDetail"
                        }
                    }
                }
            }, {
                "method": "marketInputSearchDidLoad",
                "name": "marketInputSearchDidLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the component has loaded"
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
                            "docs": "new `focused` value"
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
                    "text": "Sets focus styling on `<market-input-search>`;\ntoggles focus on the native `<input>` depending on the value passed",
                    "tags": [{
                            "name": "param",
                            "text": "value new `focused` value"
                        }]
                }
            },
            "clearInput": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Clears the current input value.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "focused",
                "methodName": "focusedWatcher"
            }, {
                "propName": "disabled",
                "methodName": "disabledWatcher"
            }, {
                "propName": "autocomplete",
                "methodName": "autocompleteWatcher"
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=market-input-search.js.map
