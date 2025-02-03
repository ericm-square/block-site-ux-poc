import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';

const marketCodeInputCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{position:relative;outline:none;font-weight:var(--field-input-weight);font-size:var(--field-input-size);line-height:var(--field-input-leading);cursor:text}:host input,:host ::slotted(input),:host textarea,:host ::slotted(textarea){width:100%;margin:0;padding:0;border:none;background-color:transparent;color:inherit;font-weight:inherit;font-size:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;cursor:inherit}:host ::slotted(label){cursor:inherit}:host input:focus,:host ::slotted(input:focus),:host textarea:focus,:host ::slotted(textarea:focus){outline:none}:host input::-moz-placeholder,:host textarea::-moz-placeholder{color:var(--field-placeholder-text-color)}:host input::placeholder,:host textarea::placeholder{color:var(--field-placeholder-text-color)}:host ::slotted(input)::-moz-placeholder,:host ::slotted(textarea)::-moz-placeholder{color:var(--field-placeholder-text-color)}:host ::slotted(input)::placeholder,:host ::slotted(textarea)::placeholder{color:var(--field-placeholder-text-color)}:host([size='small']){font-size:var(--core-type-paragraph-20-size);line-height:var(--core-type-paragraph-20-leading)}:host{border-radius:var(--field-border-radius);background-color:var(--field-normal-state-background-color);color:var(--field-normal-state-input-color)}:host::after{content:\"\";position:absolute;inset:0;border-radius:var(--field-border-radius);box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-normal-validity-border-color);pointer-events:none}:host([invalid])::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-invalid-validity-border-color)}:host(:hover){background-color:var(--field-hover-state-background-color);color:var(--field-hover-state-input-color)}:host(:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-hover-state-normal-validity-border-color)}:host([invalid]:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-hover-state-invalid-validity-border-color)}:host([focused]){color:var(--field-focus-state-input-color)}:host([focused])::after{box-shadow:inset 0 0 0 var(--field-focus-state-border-size)\n        var(--field-focus-state-normal-validity-border-color)}:host([focused][invalid])::after{box-shadow:inset 0 0 0 var(--field-focus-state-border-size) var(--field-focus-state-invalid-validity-border-color)}:host([readonly]:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-normal-validity-border-color)}:host([disabled]){background-color:var(--field-disabled-state-background-color) !important;color:var(--field-disabled-state-input-color) !important;cursor:not-allowed !important}:host([disabled])::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-disabled-state-border-color) !important}:host([disabled]) ::slotted(.market-accessory),:host([disabled]) ::slotted(img[slot*=\"accessory\"]),:host([disabled]) ::slotted(svg[slot*=\"accessory\"]),:host([disabled]) ::slotted(div[slot*=\"accessory\"]){--field-disabled-state-accessory-opacity:var(--row-disabled-state-leading-accessory-opacity);opacity:var(--field-disabled-state-accessory-opacity)}:host([value=\"\"]) ::slotted(label){color:var(--field-normal-state-empty-phase-label-color)}:host(:not([value=\"\"])) ::slotted(label),:host([value=\"\"][autofilled]) ::slotted(label){color:var(--field-normal-state-float-phase-label-color)}:host(:hover) ::slotted(label){color:var(--field-hover-state-empty-phase-label-color)}:host(:not([value=\"\"]):hover) ::slotted(label),:host([value=\"\"][autofilled]:hover) ::slotted(label){color:var(--field-hover-state-float-phase-label-color)}:host([focused]) ::slotted(label){color:var(--field-focus-state-float-phase-label-color)}:host([value=\"\"][disabled]) ::slotted(label){color:var(--field-disabled-state-empty-phase-label-color)}:host(:not([value=\"\"])[disabled]) ::slotted(label),:host([value=\"\"][autofilled][disabled]) ::slotted(label){color:var(--field-disabled-state-float-phase-label-color)}:host{display:flex;align-items:center;height:var(--input-code-height, 64px)}:host input{font-weight:var(--input-code-font-weight, var(--core-type-bold-weight));font-family:var(--core-type-mono-font-family, monospace);text-align:center}:host input:-webkit-autofill,:host input:-webkit-autofill:hover,:host input:-webkit-autofill:focus{box-shadow:0 0 0 calc(var(--input-code-height, 64px) / 2) var(--field-normal-state-background-color) inset}.code-input-container{display:flex;justify-content:center;width:100%;height:100%}.code-input-container::before,.code-input-container::after{content:\"\";flex-basis:100%;pointer-events:none}::slotted([slot=\"trailing-accessory\"]){margin-right:var(--input-code-trailing-accessory-spacing, 12px)}input::-moz-placeholder{color:var(--input-code-placeholder-color, var(--core-fill-30-color));font-size:var(--input-code-placeholder-font-size, 24px)}input::placeholder{color:var(--input-code-placeholder-color, var(--core-fill-30-color));font-size:var(--input-code-placeholder-font-size, 24px)}";
const MarketCodeInputStyle0 = marketCodeInputCss;

const MarketCodeInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketCodeInputValueChange = createEvent(this, "marketCodeInputValueChange", 7);
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "value": ["valueChangeHandler"]
    }; }
};
MarketCodeInput.style = MarketCodeInputStyle0;

export { MarketCodeInput as market_code_input };

//# sourceMappingURL=market-code-input.entry.js.map