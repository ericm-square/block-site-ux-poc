import { r as registerInstance, h, H as Host } from './index-e03cb5c3.js';

const marketFilterButtonCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--filter-button-normal-state-icon-color:var(--filter-button-normal-state-label-color);--filter-button-hover-state-icon-color:var(--filter-button-hover-state-label-color);--filter-button-pressed-state-icon-color:var(--filter-button-pressed-state-label-color);--filter-button-disabled-state-icon-color:var(--filter-button-disabled-state-label-color);display:inline-block;white-space:nowrap}button{display:inline-flex;gap:var(--filter-button-label-content-spacing);justify-content:center;align-items:center;width:100%;border:none;border-radius:var(--filter-button-border-radius);background-color:var(--filter-button-normal-state-background-color);color:var(--filter-button-normal-state-label-color);box-shadow:var(--filter-button-normal-state-border-color) 0 0 0 var(--filter-button-border-size) inset;font-family:inherit;white-space:nowrap;cursor:pointer}button:focus{outline:none}button ::slotted([slot]){cursor:inherit}button ::slotted([slot=\"feedback\"]){color:var(--filter-button-normal-state-feedback-color);white-space:nowrap}button svg{display:none;fill:var(--filter-button-normal-state-icon-color)}:host([icon-only]) .label{display:none}:host([icon-only]) svg{display:block}:host([size=\"medium\"]) button{min-height:var(--filter-button-medium-size-minimum-height);padding:var(--filter-button-medium-size-label-vertical-padding)\n      var(--filter-button-medium-size-label-horizontal-padding);font-weight:var(--filter-button-medium-size-label-text-weight);font-size:var(--filter-button-medium-size-label-text-size);line-height:var(--filter-button-medium-size-label-text-leading);letter-spacing:var(--filter-button-medium-size-label-text-tracking);text-transform:var(--filter-button-medium-size-label-text-case)}:host([size=\"medium\"]) ::slotted([slot=\"feedback\"]){font-weight:var(--filter-button-medium-size-feedback-text-weight);font-size:var(--filter-button-medium-size-feedback-text-size);line-height:var(--filter-button-medium-size-feedback-text-leading);letter-spacing:var(--filter-button-medium-size-feedback-text-tracking);text-transform:var(--filter-button-medium-size-feedback-text-case)}:host([size=\"small\"]) button{min-height:var(--filter-button-small-size-minimum-height);padding:var(--filter-button-small-size-label-vertical-padding)\n      var(--filter-button-small-size-label-horizontal-padding);font-weight:var(--filter-button-small-size-label-text-weight);font-size:var(--filter-button-small-size-label-text-size);line-height:var(--filter-button-small-size-label-text-leading);letter-spacing:var(--filter-button-small-size-label-text-tracking);text-transform:var(--filter-button-small-size-label-text-case)}:host([size=\"small\"]) ::slotted([slot=\"feedback\"]){font-weight:var(--filter-button-small-size-feedback-text-weight);font-size:var(--filter-button-small-size-feedback-text-size);line-height:var(--filter-button-small-size-feedback-text-leading);letter-spacing:var(--filter-button-small-size-feedback-text-tracking);text-transform:var(--filter-button-small-size-feedback-text-case)}:host(:hover) button,:host(:focus) button{background-color:var(--filter-button-hover-state-background-color);color:var(--filter-button-hover-state-label-color);box-shadow:var(--filter-button-hover-state-border-color) 0 0 0 var(--filter-button-border-size) inset}:host(:hover) ::slotted([slot=\"feedback\"]),:host(:focus) ::slotted([slot=\"feedback\"]){color:var(--filter-button-hover-state-feedback-color)}:host(:hover) svg,:host(:focus) svg{fill:var(--filter-button-hover-state-icon-color)}:host([active]) button,:host(:active) button{background-color:var(--filter-button-pressed-state-background-color);color:var(--filter-button-pressed-state-label-color);box-shadow:var(--filter-button-pressed-state-border-color) 0 0 0 var(--filter-button-border-size) inset}:host([active]) ::slotted([slot=\"feedback\"]),:host(:active) ::slotted([slot=\"feedback\"]){color:var(--filter-button-pressed-state-feedback-color)}:host([active]) svg,:host(:active) svg{fill:var(--filter-button-pressed-state-icon-color)}:host([disabled]) button{background-color:var(--filter-button-disabled-state-background-color);color:var(--filter-button-disabled-state-label-color);box-shadow:var(--filter-button-disabled-state-border-color) 0 0 0 var(--filter-button-border-size) inset}:host([disabled]) ::slotted([slot=\"feedback\"]){color:var(--filter-button-disabled-state-feedback-color)}:host([disabled]) svg{fill:var(--filter-button-disabled-state-icon-color)}";
const MarketFilterButtonStyle0 = marketFilterButtonCss;

const MarketFilterButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = 'medium';
        this.disabled = false;
        this.focused = false;
        this.iconOnly = false;
        this.active = false;
        this.popoverId = undefined;
        this.ariaAttributes = undefined;
    }
    handleClick(event) {
        if (this.disabled) {
            event.stopImmediatePropagation();
        }
    }
    handleDisabledChange(newValue) {
        if (newValue && this.focused) {
            this.focused = false;
        }
    }
    /**
     * Toggle focus on the filter button
     * @param {boolean} [value=true] whether or not focus will be applied or removed
     * @returns {Promise<boolean>} whether or not the button was focused or blurred
     */
    async setFocus(value = true) {
        if (this.disabled) {
            return Promise.resolve(false);
        }
        this.focused = value;
        if (this.focused) {
            this.buttonEl.focus();
        }
        else {
            this.buttonEl.blur();
        }
        return Promise.resolve(this.focused);
    }
    render() {
        return (h(Host, { key: '752fd8ad8a381d5f89cf0e177d11ba9bb4d74a2c', class: "market-filter-button" }, h("button", { key: '42ad2cc1f2f0ab15177812c029be00a2c76bbe04', "aria-disabled": this.disabled, disabled: this.disabled, ref: (el) => (this.buttonEl = el), "aria-expanded": this.active.toString(), "aria-controls": this.popoverId, type: "button" }, h("svg", { key: '2fe6ab99cf28e8502042eebd33466849206357d9', width: "18", height: "12", viewBox: "0 0 18 12", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: 'a083550a7a9e99b2d609adfc231104bff2dd89d1', "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0 0H18V2H0V0ZM15 5H3V7H15V5ZM12 10H6V12H12V10Z" })), h("span", { key: '9220d6f2bfa3c6640773aae7b0b0e10fe3c0bf8f', class: "label" }, h("slot", { key: '78a1dff60c4b0cf87141a94ed4cbecdf62d9f213' })), h("slot", { key: '4e28fde3d40ce59ed21759070255a094ba42bf9d', name: "feedback" }))));
    }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"]
    }; }
};
MarketFilterButton.style = MarketFilterButtonStyle0;

export { MarketFilterButton as market_filter_button };

//# sourceMappingURL=market-filter-button.entry.js.map