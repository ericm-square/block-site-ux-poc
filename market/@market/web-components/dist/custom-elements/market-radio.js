import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getControlInputAriaLabel } from './aria.js';

const marketRadioCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--transition-duration:0.2s;--radio-offset:calc(-1 * var(--radio-border-size));--focus-ring-color:color-mix(in srgb, var(--radio-focus-ring-color) 100%, transparent);position:relative;display:inline-block;width:var(--radio-width);height:var(--radio-height);border:var(--radio-border-size) solid var(--radio-normal-state-normal-validity-unselected-value-border-color);border-radius:var(--radio-border-radius);background-color:var(--radio-normal-state-normal-validity-unselected-value-background-color)}input{position:absolute;top:var(--radio-offset);left:var(--radio-offset);width:var(--radio-width);height:var(--radio-height);margin:0;border-radius:var(--radio-border-radius);background:transparent;outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}input:focus-visible{outline:var(--radio-focus-ring-border-size, var(--core-focus-ring-border-size)) solid var(--focus-ring-color);outline-offset:var(--radio-focus-ring-buffer-size)}svg{position:absolute;top:calc(50% - var(--radio-svg-radius));left:calc(50% - var(--radio-svg-radius));align-items:center;pointer-events:none}@media (hover: hover){:host(:hover),:host([hovered]){border-color:var(--radio-hover-state-normal-validity-unselected-value-border-color);background-color:var(--radio-hover-state-normal-validity-unselected-value-background-color)}}:host(:focus),:host([focused]){border-color:var(--radio-focus-state-normal-validity-unselected-value-border-color);background-color:var(--radio-focus-state-normal-validity-unselected-value-background-color)}:host(:active),:host([active]){border-color:var(--radio-pressed-state-normal-validity-unselected-value-border-color);background-color:var(--radio-pressed-state-normal-validity-unselected-value-background-color)}:host([invalid]){border-color:var(--radio-normal-state-invalid-validity-unselected-value-border-color);background-color:var(--radio-normal-state-invalid-validity-unselected-value-background-color)}@media (hover: hover){:host([invalid]:hover),:host([invalid][hovered]){border-color:var(--radio-hover-state-invalid-validity-unselected-value-border-color);background-color:var(--radio-hover-state-invalid-validity-unselected-value-background-color)}}:host([invalid]:focus),:host([invalid][focused]){border-color:var(--radio-focus-state-invalid-validity-unselected-value-border-color);background-color:var(--radio-focus-state-invalid-validity-unselected-value-background-color)}:host([invalid]:active),:host([invalid][active]){border-color:var(--radio-pressed-state-invalid-validity-unselected-value-border-color);background-color:var(--radio-pressed-state-invalid-validity-unselected-value-background-color)}:host([disabled]),:host([invalid][disabled]){border-color:var(--radio-disabled-state-normal-validity-unselected-value-border-color);background-color:var(--radio-disabled-state-normal-validity-unselected-value-background-color)}:host([selected]){border-color:var(--radio-normal-state-normal-validity-selected-value-border-color);background-color:var(--radio-normal-state-normal-validity-selected-value-background-color)}:host([selected]) svg{fill:var(--radio-normal-state-normal-validity-selected-value-icon-color)}@media (hover: hover){:host([selected]:hover),:host([selected][hovered]){border-color:var(--radio-hover-state-normal-validity-selected-value-border-color);background-color:var(--radio-hover-state-normal-validity-selected-value-background-color)}:host([selected]:hover) svg,:host([selected][hovered]) svg{fill:var(--radio-normal-state-normal-validity-selected-value-icon-color)}}:host([selected]:focus),:host([selected][focused]){border-color:var(--radio-focus-state-normal-validity-selected-value-border-color);background-color:var(--radio-focus-state-normal-validity-selected-value-background-color)}:host([selected]:focus) svg,:host([selected][focused]) svg{fill:var(--radio-focus-state-normal-validity-selected-value-icon-color)}:host([selected]:active),:host([selected][active]){border-color:var(--radio-pressed-state-normal-validity-selected-value-border-color);background-color:var(--radio-pressed-state-normal-validity-selected-value-background-color)}:host([selected]:active) svg,:host([selected][active]) svg{fill:var(--radio-pressed-state-normal-validity-selected-value-icon-color)}:host([invalid][selected]){border-color:var(--radio-normal-state-invalid-validity-selected-value-border-color);background-color:var(--radio-normal-state-invalid-validity-selected-value-background-color)}:host([invalid][selected]) svg{fill:var(--radio-normal-state-invalid-validity-selected-value-icon-color)}@media (hover: hover){:host([invalid][selected]:hover),:host([invalid][selected][hovered]){border-color:var(--radio-hover-state-invalid-validity-selected-value-border-color);background-color:var(--radio-hover-state-invalid-validity-selected-value-background-color)}:host([invalid][selected]:hover) svg,:host([invalid][selected][hovered]) svg{fill:var(--radio-hover-state-invalid-validity-selected-value-icon-color)}}:host([invalid][selected]:focus),:host([invalid][selected][focused]){border-color:var(--radio-focus-state-invalid-validity-selected-value-border-color);background-color:var(--radio-focus-state-invalid-validity-selected-value-background-color)}:host([invalid][selected]:focus) svg,:host([invalid][selected][focused]) svg{fill:var(--radio-focus-state-invalid-validity-selected-value-icon-color)}:host([invalid][selected]:active),:host([invalid][selected][active]){border-color:var(--radio-pressed-state-invalid-validity-selected-value-border-color);background-color:var(--radio-pressed-state-invalid-validity-selected-value-background-color)}:host([invalid][selected]:active) svg,:host([invalid][selected][active]) svg{fill:var(--radio-pressed-state-invalid-validity-selected-value-icon-color)}:host([selected][disabled]),:host([selected][disabled][invalid]){border-color:var(--radio-disabled-state-normal-validity-selected-value-border-color);background-color:var(--radio-disabled-state-normal-validity-selected-value-background-color)}:host([selected][disabled]) svg,:host([selected][disabled][invalid]) svg{fill:var(--radio-disabled-state-normal-validity-selected-value-icon-color)}";
const MarketRadioStyle0 = marketRadioCss;

const MarketRadio$1 = /*@__PURE__*/ proxyCustomElement(class MarketRadio extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketRadioValueChange = createEvent(this, "marketRadioValueChange", 7);
        this.selected = false;
        this.disabled = false;
        this.invalid = false;
        this.focused = false;
        this.hovered = false;
        this.active = false;
    }
    /**
     * Toggles `selected` prop, and emits a change event accordingly.
     * Used by `market-row` to sync its selected state w/ slotted radio buttons.
     */
    setSelection(newValue, { silent = false } = {}) {
        const { marketRadioValueChange, selected: prevValue, innerInput } = this;
        if (typeof newValue !== 'boolean')
            return Promise.resolve();
        if (prevValue === newValue)
            return Promise.resolve();
        if (!silent) {
            const { defaultPrevented } = marketRadioValueChange.emit({
                current: newValue,
                previous: prevValue,
            });
            if (defaultPrevented) {
                return Promise.resolve();
            }
        }
        this.selected = newValue;
        // When using the non-lazy output target, this method sometimes gets called from
        // market-row's watcher before/after innerInput is removed, hence this check.
        if (innerInput) {
            innerInput.checked = newValue;
        }
        return Promise.resolve();
    }
    /**
     * DEPRECATED (3.x): Toggles `selected` state (unrelated to the HTML attribute `value`).
     */
    setValue(newValue) {
        /* eslint-disable-next-line no-console */
        console.warn("market-radio's setValue() method has been deprecated. Use setSelection() instead.", this.el);
        this.setSelection(newValue);
        return Promise.resolve();
    }
    /**
     * Sets `active` state. Allows external elements to programmatically
     * trigger active styling, ex. when slotted as a control into `market-row`.
     */
    setActive(value) {
        this.active = value;
        return Promise.resolve();
    }
    /**
     * Sets `hovered` state. Allows external elements to programmatically
     * trigger hover styling, ex. when slotted as a control into `market-row`.
     */
    setHover(value) {
        this.hovered = value;
        return Promise.resolve();
    }
    /**
     * Sets `disabled` state. Allows external elements to programmatically
     * trigger disabled styling, ex. when slotted as a control into `market-row`.
     */
    setDisabled(value) {
        this.disabled = value;
        return Promise.resolve();
    }
    /**
     * Sets `focused` state, except when disabled.
     * Allows external consumers to programmatically
     * trigger focused styling.
     */
    setFocus(value = true) {
        if (this.disabled) {
            return Promise.resolve();
        }
        this.focused = value;
        return Promise.resolve();
    }
    onFocus() {
        if (this.disabled) {
            return;
        }
        this.focused = true;
        this.el.shadowRoot.querySelector('input').focus();
    }
    handleClick(event) {
        // Always prevent default so we can manually control the selection
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        // once a radio is selected, it shouldn't be togglable/deselectable on click
        if (!this.selected) {
            this.setFocus();
            this.setSelection(true);
        }
    }
    render() {
        return (h(Host, { key: 'e4bc0538b6c3c6fb1d384cf4f4e500f34d4e0fb3', class: "market-radio", onBlur: () => {
                this.setFocus(false);
            }, onClick: this.handleClick, onFocus: () => {
                this.setFocus();
            } }, h("input", { key: '5150cbff8f7852b9541a7078551f6e30436e28ce', ref: (el) => (this.innerInput = el), type: "radio", "aria-label": getControlInputAriaLabel(this.el), checked: this.selected, disabled: this.disabled }), this.selected && (h("svg", { key: '0051115cef2bf8e95ec556ecc3a9b81d32fbf7db', width: "6", height: "6", viewBox: "0 0 6 6", xmlns: "http://www.w3.org/2000/svg" }, h("circle", { key: '9a8a954420a18075bfed037d82dfbb0467cb7823', cx: "3", cy: "3", r: "3" })))));
    }
    get el() { return this; }
    static get style() { return MarketRadioStyle0; }
}, [1, "market-radio", {
        "selected": [1540],
        "disabled": [1540],
        "invalid": [516],
        "focused": [1540],
        "hovered": [1540],
        "active": [1540],
        "setSelection": [64],
        "setValue": [64],
        "setActive": [64],
        "setHover": [64],
        "setDisabled": [64],
        "setFocus": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-radio"];
    components.forEach(tagName => { switch (tagName) {
        case "market-radio":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketRadio$1);
            }
            break;
    } });
}

const MarketRadio = MarketRadio$1;
const defineCustomElement = defineCustomElement$1;

export { MarketRadio, defineCustomElement };

//# sourceMappingURL=market-radio.js.map