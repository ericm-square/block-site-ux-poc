import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';
import { v as v4 } from './v4.js';

const marketFieldCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--error-icon-height:16px;--error-icon-width:16px;--error-icon-offset:calc(calc(var(--field-error-message-text-leading) - var(--error-icon-height)) / 2);display:block;text-align:start}::slotted([slot]){margin-top:4px}::slotted([slot=\"error\"]){display:block;color:var(--field-error-message-text-color);font-weight:var(--field-error-message-text-weight);font-size:var(--field-error-message-text-size);line-height:var(--field-error-message-text-leading);letter-spacing:var(--field-error-message-text-tracking)}::slotted([slot=\"error\"])::before{content:\"\";display:inline-block;vertical-align:calc(-1 * var(--error-icon-offset));width:var(--error-icon-width);height:var(--error-icon-height);margin-right:calc(\n        var(--field-error-message-icon-padding, 2px) +\n        var(--field-error-message-icon-margin-right, 4px)\n      );margin-left:var(--field-error-message-icon-padding, 2px);background-color:var(--field-error-message-text-color);-webkit-mask:url(\"data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M8 15.5C12.1333 15.5 15.5 12.1333 15.5 8C15.5 3.86667 12.1333 0.5 8 0.5C3.86667 0.5 0.5 3.86667 0.5 8C0.5 12.1333 3.86667 15.5 8 15.5ZM8 2.16667C11.2167 2.16667 13.8333 4.78333 13.8333 8C13.8333 11.2167 11.2167 13.8333 8 13.8333C4.78333 13.8333 2.16667 11.2167 2.16667 8C2.16667 4.78333 4.78333 2.16667 8 2.16667ZM8 12.1667C8.5753 12.1667 9.04167 11.7003 9.04167 11.125C9.04167 10.5497 8.5753 10.0833 8 10.0833C7.4247 10.0833 6.95833 10.5497 6.95833 11.125C6.95833 11.7003 7.4247 12.1667 8 12.1667ZM7.16667 3.83333H8.83333V9.25H7.16667V3.83333Z'/></svg>\");mask:url(\"data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M8 15.5C12.1333 15.5 15.5 12.1333 15.5 8C15.5 3.86667 12.1333 0.5 8 0.5C3.86667 0.5 0.5 3.86667 0.5 8C0.5 12.1333 3.86667 15.5 8 15.5ZM8 2.16667C11.2167 2.16667 13.8333 4.78333 13.8333 8C13.8333 11.2167 11.2167 13.8333 8 13.8333C4.78333 13.8333 2.16667 11.2167 2.16667 8C2.16667 4.78333 4.78333 2.16667 8 2.16667ZM8 12.1667C8.5753 12.1667 9.04167 11.7003 9.04167 11.125C9.04167 10.5497 8.5753 10.0833 8 10.0833C7.4247 10.0833 6.95833 10.5497 6.95833 11.125C6.95833 11.7003 7.4247 12.1667 8 12.1667ZM7.16667 3.83333H8.83333V9.25H7.16667V3.83333Z'/></svg>\");-webkit-mask-size:cover;mask-size:cover}::slotted([slot=\"bottom-accessory\"]){display:block;margin:var(--field-helper-text-vertical-spacing) var(--field-helper-text-horizontal-spacing);color:var(--field-helper-text-text-color);font-weight:var(--field-helper-text-weight);font-size:var(--field-helper-text-size);line-height:var(--field-helper-text-leading);letter-spacing:var(--field-helper-text-tracking)}::slotted([slot=\"action\"]){display:block;padding:var(--field-action-vertical-padding-size) 0;color:var(--field-action-text-color);font-weight:var(--field-action-text-weight);font-size:var(--field-action-text-size);line-height:var(--field-action-text-leading);letter-spacing:var(--field-action-text-tracking);text-decoration:none;cursor:pointer}::slotted(button[slot=\"action\"]){padding:0;border:none;background-color:transparent;outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}";
const MarketFieldStyle0 = marketFieldCss;

const MarketField$1 = /*@__PURE__*/ proxyCustomElement(class MarketField extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.errorSlotId = v4();
        this.name = undefined;
        this.readonly = false;
        this.disabled = false;
        this.invalid = false;
    }
    getSlottedInputs() {
        const supportedInputTags = [
            getNamespacedTagFor('market-input-text'),
            getNamespacedTagFor('market-input-password'),
            getNamespacedTagFor('market-select'),
            getNamespacedTagFor('market-textarea'),
            getNamespacedTagFor('market-code-input'),
        ];
        // create flattened array of slotted supported input elements based on tag name
        const slottedInputElements = supportedInputTags.flatMap((tag) => {
            return [
                ...this.el.getElementsByTagName(tag),
            ];
        });
        return slottedInputElements;
    }
    getErrorSlot() {
        return this.el.querySelector('[slot="error"]');
    }
    getBottomAccessorySlot() {
        return this.el.querySelector('[slot="bottom-accessory"]');
    }
    getInputElAriaDescribedby() {
        const describedBy = [];
        if (this.getErrorSlot()) {
            describedBy.push(`${this.errorSlotId}-error`);
        }
        if (this.getBottomAccessorySlot()) {
            describedBy.push(`${this.errorSlotId}-bottom-accessory`);
        }
        return describedBy.join(' ');
    }
    handleErrorAttributes() {
        const errorSlotEl = this.getErrorSlot();
        if (errorSlotEl) {
            errorSlotEl.setAttribute('role', 'alert');
            errorSlotEl.setAttribute('id', `${this.errorSlotId}-error`);
        }
    }
    handleBottomAccessoryAttributes() {
        const bottomAccessorySlotEl = this.getBottomAccessorySlot();
        if (bottomAccessorySlotEl) {
            bottomAccessorySlotEl.setAttribute('id', `${this.errorSlotId}-bottom-accessory`);
        }
    }
    render() {
        // check for slotted supported market inputs and pass properties down
        this.getSlottedInputs().forEach((input) => {
            input.name = this.name;
            input.disabled = this.disabled;
            input.invalid = this.invalid;
            input.readonly = this.readonly;
            const inputElAriaDescribedby = this.getInputElAriaDescribedby();
            if (inputElAriaDescribedby) {
                input.setAttribute('aria-describedby', inputElAriaDescribedby);
            }
        });
        return (h(Host, { key: '7abe30582756b2b385dcb2a11fb8027a4b3fe9e9', class: "market-field" }, h("slot", { key: 'eaa6676be67540025cce0721382111d9149fe7ea' }), this.invalid && !this.disabled && (
        // slot relocation broke in @stencil/core@1.13.0
        // wrapping a slot in a shadowless div as a workaround
        // this should be fixed in 2.1.1
        h("div", { key: '736cbd69cbce0bb6aa2bc345c078082d6dc04ce4' }, h("slot", { key: '902c9a1ddff740365332f129d1935966d4c082a0', name: "error", onSlotchange: () => this.handleErrorAttributes() }))), h("slot", { key: 'ea8a27036ae7d823703b534e4b8c0bd21dab50ce', name: "bottom-accessory", onSlotchange: () => this.handleBottomAccessoryAttributes() }), h("slot", { key: '40922f28c8231b3e13fae355a90585f5635d01e9', name: "action" })));
    }
    get el() { return this; }
    static get style() { return MarketFieldStyle0; }
}, [1, "market-field", {
        "name": [513],
        "readonly": [516],
        "disabled": [516],
        "invalid": [516]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-field"];
    components.forEach(tagName => { switch (tagName) {
        case "market-field":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketField$1);
            }
            break;
    } });
}

const MarketField = MarketField$1;
const defineCustomElement = defineCustomElement$1;

export { MarketField, defineCustomElement };

//# sourceMappingURL=market-field.js.map