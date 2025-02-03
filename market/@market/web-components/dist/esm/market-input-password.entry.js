import { r as registerInstance, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { s as submitFormImplicitly } from './forms-6e9919f9.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';

const marketInputPasswordCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--focus-ring-color:color-mix(in srgb, var(--core-focus-ring-color) 100%, transparent);display:block}.toggle{display:flex;flex-shrink:0;justify-content:center;align-items:center;width:100%;height:100%;margin:0;border:none;background:transparent;outline:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.toggle svg{display:block;fill:var(--core-text-20-color)}.toggle:focus-visible{border-radius:var(--core-radius-10);outline:var(--core-focus-ring-border-size) solid var(--focus-ring-color);outline-offset:calc(var(--core-focus-ring-border-size) * -1)}";
const MarketInputPasswordStyle0 = marketInputPasswordCss;

const MarketInputPassword = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.inputId = undefined;
        this.name = undefined;
        this.value = undefined;
        this.placeholder = undefined;
        this.maxlength = undefined;
        this.minlength = undefined;
        this.size = 'large';
        this.readonly = undefined;
        this.required = undefined;
        this.disabled = undefined;
        this.focused = undefined;
        this.invalid = undefined;
        this.autocomplete = undefined;
        this.inputmode = undefined;
        this.type = 'password';
    }
    /**
     * Sets focus styling on `<market-input-password>`. Toggles focus on the inner `<input>` if true, and blurs focus if false.
     */
    async setFocus(value = true) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.focused = value;
        await this.marketInputText.setFocus(value);
    }
    registerSlottedInput() {
        // We need to pass in the slotted input here since it's inside market-input-password's
        // light DOM, and market-input-text is unable to find it.
        this.slottedInput = this.el.querySelector('input[slot=input]');
        if (this.slottedInput) {
            this.marketInputText.registerSlottedInput(this.slottedInput);
        }
    }
    togglePasswordVisibility(e) {
        this.type = this.type === 'password' ? 'text' : 'password';
        e.stopPropagation();
    }
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            submitFormImplicitly(this.el);
        }
    }
    renderSvgHidden() {
        return (h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16.5481 17.9609L16.55 17.96L19.3 20.71L20.71 19.3L18.31 16.9C19.81 15.78 21.06 14.27 21.91 12.43C22.03 12.16 22.03 11.85 21.91 11.59C20.03 7.52004 16.23 5.00004 12 5.00004C10.39 5.00004 8.85 5.37004 7.45 6.04004L4.71 3.29004L3.29361 4.70643L14.0183 15.4311L14.02 15.43L15.01 16.42L15.008 16.4208L16.5481 17.9609ZM11.49 10.07L13.93 12.51C13.97 12.35 14 12.18 14 12C14 10.9 13.1 10 12 10C11.82 10 11.65 10.03 11.49 10.07ZM15.43 14.02L16.86 15.45C18.09 14.6 19.14 13.43 19.89 12C18.28 8.90004 15.29 7.00004 12 7.00004C10.95 7.00004 9.94 7.21004 8.99 7.58004L9.98 8.57004C10.57 8.22004 11.26 8.00004 12 8.00004C14.21 8.00004 16 9.79004 16 12C16 12.74 15.79 13.43 15.43 14.02Z" }), h("path", { d: "M11.7512 15.9924L8.0076 12.2488C8.13092 14.2606 9.73948 15.8691 11.7512 15.9924Z" }), h("path", { d: "M5.61696 9.8582C5.03307 10.4841 4.52321 11.2015 4.11 12C5.72 15.1 8.71 17 12 17C12.244 17 12.4859 16.9887 12.7254 16.9666L14.4639 18.7052C13.6686 18.8984 12.8439 19 12 19C7.77 19 3.97 16.48 2.09 12.42C1.97 12.16 1.97 11.85 2.09 11.58C2.63958 10.3904 3.35638 9.33864 4.19985 8.44109L5.61696 9.8582Z" })));
    }
    renderSvgVisible() {
        return (h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.09 11.58C3.97 7.52 7.77 5 12 5C16.23 5 20.03 7.52 21.91 11.58C22.03 11.84 22.03 12.15 21.91 12.42C20.03 16.48 16.23 19 12 19C7.77 19 3.97 16.48 2.09 12.42C1.97 12.16 1.97 11.85 2.09 11.58ZM4.11 12C5.72 15.1 8.71 17 12 17C15.29 17 18.28 15.1 19.89 12C18.28 8.9 15.29 7 12 7C8.71 7 5.72 8.9 4.11 12ZM8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12ZM10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12Z" })));
    }
    render() {
        const MarketInputTextTagName = getNamespacedTagFor('market-input-text');
        const MarketAccessoryTagName = getNamespacedTagFor('market-accessory');
        return (h(Host, { key: '0d9ee78c234098738dd4a3d788d02ad27e1b3d9b', class: "market-input-password", onKeyDown: (e) => {
                this.handleKeyDown(e);
            } }, h(MarketInputTextTagName, { key: '6c17f320cbb9cfcf309a1c066ce7ea1abacde3e3', type: this.type, ref: (el) => (this.marketInputText = el), onBlur: () => { }, onClick: () => { }, onFocus: () => { }, inputId: this.inputId, name: this.name, placeholder: this.placeholder, maxlength: this.maxlength, minlength: this.minlength, size: this.size, value: this.value, readonly: this.readonly, required: this.required, disabled: this.disabled, invalid: this.invalid, autocomplete: this.autocomplete, inputmode: this.inputmode }, h("slot", { key: 'afe629c1b01a8c020fdc5fac660c6af169c1c07b' }), h("slot", { key: 'b98af81fa7cf0b6eaabe7f6e42be7a51cb6977c8', name: "input", onSlotchange: () => this.registerSlottedInput(),
            // if there is a slotted input, assign it to market-input-text's "input" slot
            slot: this.slottedInput ? 'input' : '' }), h(MarketAccessoryTagName, { key: 'e6828fe01ded7e6d69fee864efdd13bd22a7681d', slot: "trailing-accessory", size: "image" }, h("button", { key: '8febe33735908d2a0a2df804b927331dd3470353', class: "toggle", onClick: (e) => {
                this.togglePasswordVisibility(e);
            }, onKeyDown: (e) => {
                // don't submit a form if enter is pressed when the toggle is focused
                e.stopPropagation();
            } }, this.type === 'password' && this.renderSvgHidden(), this.type === 'text' && this.renderSvgVisible())))));
    }
    get el() { return getElement(this); }
};
MarketInputPassword.style = MarketInputPasswordStyle0;

export { MarketInputPassword as market_input_password };

//# sourceMappingURL=market-input-password.entry.js.map