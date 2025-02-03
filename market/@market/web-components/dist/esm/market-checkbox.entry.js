import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { g as getControlInputAriaLabel } from './aria-7b58e134.js';

const marketCheckboxCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--checkbox-offset:calc(-1 * var(--checkbox-border-size));--focus-ring-color:color-mix(in srgb, var(--checkbox-focus-ring-color) 100%, transparent);position:relative;display:inline-block;width:var(--checkbox-width);height:var(--checkbox-height);border:var(--checkbox-border-size) solid var(--checkbox-normal-state-normal-validity-unchecked-value-border-color);border-radius:var(--checkbox-border-radius);background-color:var(--checkbox-normal-state-normal-validity-unchecked-value-background-color)}input{position:absolute;top:var(--checkbox-offset);left:var(--checkbox-offset);width:var(--checkbox-width);height:var(--checkbox-height);margin:0;border-radius:var(--checkbox-border-radius);background:transparent;outline:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}input:focus-visible{outline:var(--checkbox-focus-ring-border-size) solid var(--focus-ring-color);outline-offset:var(--checkbox-focus-ring-buffer-size)}svg{position:absolute;top:var(--checkbox-offset);left:var(--checkbox-offset);pointer-events:none}:host(:hover),:host([hovered]){border-color:var(--checkbox-hover-state-normal-validity-unchecked-value-border-color);background-color:var(--checkbox-hover-state-normal-validity-unchecked-value-background-color)}:host([focused]){border-color:var(--checkbox-focus-state-normal-validity-unchecked-value-border-color);background-color:var(--checkbox-focus-state-normal-validity-unchecked-value-background-color)}:host(:active),:host([active]){border-color:var(--checkbox-pressed-state-normal-validity-unchecked-value-border-color);background-color:var(--checkbox-pressed-state-normal-validity-unchecked-value-background-color)}:host([checked]){border-color:var(--checkbox-normal-state-normal-validity-checked-value-border-color);background-color:var(--checkbox-normal-state-normal-validity-checked-value-background-color)}:host([checked]) path{stroke:var(--checkbox-normal-state-normal-validity-checked-value-icon-color)}:host([checked]:hover),:host([checked][hovered]){border-color:var(--checkbox-hover-state-normal-validity-checked-value-border-color);background-color:var(--checkbox-hover-state-normal-validity-checked-value-background-color)}:host([checked]:hover) path,:host([checked][hovered]) path{stroke:var(--checkbox-hover-state-normal-validity-checked-value-icon-color)}:host([checked][focused]){border-color:var(--checkbox-focus-state-normal-validity-checked-value-border-color);background-color:var(--checkbox-focus-state-normal-validity-checked-value-background-color)}:host([checked][focused]) path{stroke:var(--checkbox-focus-state-normal-validity-checked-value-icon-color)}:host([checked]:active),:host([checked][active]){border-color:var(--checkbox-pressed-state-normal-validity-checked-value-border-color);background-color:var(--checkbox-pressed-state-normal-validity-checked-value-background-color)}:host([checked]:active) path,:host([checked][active]) path{stroke:var(--checkbox-pressed-state-normal-validity-checked-value-icon-color)}:host([indeterminate]){border-color:var(--checkbox-normal-state-normal-validity-indeterminate-value-border-color);background-color:var(--checkbox-normal-state-normal-validity-indeterminate-value-background-color)}:host([indeterminate]) path{stroke:var(--checkbox-normal-state-normal-validity-indeterminate-value-icon-color)}:host([indeterminate]:hover),:host([indeterminate][hovered]){border-color:var(--checkbox-hover-state-normal-validity-indeterminate-value-border-color);background-color:var(--checkbox-hover-state-normal-validity-indeterminate-value-background-color)}:host([indeterminate]:hover) path,:host([indeterminate][hovered]) path{stroke:var(--checkbox-hover-state-normal-validity-indeterminate-value-icon-color)}:host([indeterminate][focused]){border-color:var(--checkbox-focus-state-normal-validity-indeterminate-value-border-color);background-color:var(--checkbox-focus-state-normal-validity-indeterminate-value-background-color)}:host([indeterminate][focused]) path{stroke:var(--checkbox-focus-state-normal-validity-indeterminate-value-icon-color)}:host([indeterminate]:active),:host([indeterminate][active]){border-color:var(--checkbox-pressed-state-normal-validity-indeterminate-value-border-color);background-color:var(--checkbox-pressed-state-normal-validity-indeterminate-value-background-color)}:host([indeterminate]:active) path,:host([indeterminate][active]) path{stroke:var(--checkbox-pressed-state-normal-validity-indeterminate-value-icon-color)}:host([invalid]){border-color:var(--checkbox-normal-state-invalid-validity-unchecked-value-border-color);background-color:var(--checkbox-normal-state-invalid-validity-unchecked-value-background-color)}:host([invalid]:hover){border-color:var(--checkbox-hover-state-invalid-validity-unchecked-value-border-color);background-color:var(--checkbox-hover-state-invalid-validity-unchecked-value-background-color)}:host([invalid][focused]){border-color:var(--checkbox-focus-state-invalid-validity-unchecked-value-border-color);background-color:var(--checkbox-focus-state-invalid-validity-unchecked-value-background-color)}:host([invalid]:active){border-color:var(--checkbox-pressed-state-invalid-validity-unchecked-value-border-color);background-color:var(--checkbox-pressed-state-invalid-validity-unchecked-value-background-color)}:host([invalid][checked]){border-color:var(--checkbox-normal-state-invalid-validity-checked-value-border-color);background-color:var(--checkbox-normal-state-invalid-validity-checked-value-background-color)}:host([invalid][checked]) path{stroke:var(--checkbox-normal-state-invalid-validity-checked-value-icon-color)}:host([invalid][checked]:hover){border-color:var(--checkbox-hover-state-invalid-validity-checked-value-border-color);background-color:var(--checkbox-hover-state-invalid-validity-checked-value-background-color)}:host([invalid][checked]:hover) path{stroke:var(--checkbox-hover-state-invalid-validity-checked-value-icon-color)}:host([invalid][checked][focused]){border-color:var(--checkbox-focus-state-invalid-validity-checked-value-border-color);background-color:var(--checkbox-focus-state-invalid-validity-checked-value-background-color)}:host([invalid][checked][focused]) path{stroke:var(--checkbox-focus-state-invalid-validity-checked-value-icon-color)}:host([invalid][checked]:active){border-color:var(--checkbox-pressed-state-invalid-validity-checked-value-border-color);background-color:var(--checkbox-pressed-state-invalid-validity-checked-value-background-color)}:host([invalid][checked]:active) path{stroke:var(--checkbox-pressed-state-invalid-validity-checked-value-icon-color)}:host([invalid][indeterminate]){border-color:var(--checkbox-normal-state-invalid-validity-indeterminate-value-border-color);background-color:var(--checkbox-normal-state-invalid-validity-indeterminate-value-background-color)}:host([invalid][indeterminate]) path{stroke:var(--checkbox-normal-state-invalid-validity-indeterminate-value-icon-color)}:host([invalid][indeterminate]:hover){border-color:var(--checkbox-hover-state-invalid-validity-indeterminate-value-border-color);background-color:var(--checkbox-hover-state-invalid-validity-indeterminate-value-background-color)}:host([invalid][indeterminate]:hover) path{stroke:var(--checkbox-hover-state-invalid-validity-indeterminate-value-icon-color)}:host([invalid][indeterminate][focused]){border-color:var(--checkbox-focus-state-invalid-validity-indeterminate-value-border-color);background-color:var(--checkbox-focus-state-invalid-validity-indeterminate-value-background-color)}:host([invalid][indeterminate]:active){border-color:var(--checkbox-pressed-state-invalid-validity-indeterminate-value-border-color);background-color:var(--checkbox-pressed-state-invalid-validity-indeterminate-value-background-color)}:host([invalid][indeterminate]:active) path{stroke:var(--checkbox-pressed-state-invalid-validity-indeterminate-value-icon-color)}:host([disabled]){border-color:var(--checkbox-disabled-state-normal-validity-unchecked-value-border-color);background-color:var(--checkbox-disabled-state-normal-validity-unchecked-value-background-color);cursor:not-allowed}:host([disabled]) input{cursor:not-allowed}:host([checked][disabled]){border-color:var(--checkbox-disabled-state-normal-validity-checked-value-border-color);background-color:var(--checkbox-disabled-state-normal-validity-checked-value-background-color)}:host([checked][disabled]) path{stroke:var(--checkbox-disabled-state-normal-validity-checked-value-icon-color)}:host([indeterminate][disabled]){border-color:var(--checkbox-disabled-state-normal-validity-indeterminate-value-border-color);background-color:var(--checkbox-disabled-state-normal-validity-indeterminate-value-background-color)}:host([indeterminate][disabled]) path{stroke:var(--checkbox-disabled-state-normal-validity-indeterminate-value-icon-color)}";
const MarketCheckboxStyle0 = marketCheckboxCss;

const MarketCheckbox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketCheckboxValueChange = createEvent(this, "marketCheckboxValueChange", 7);
        this.checked = false;
        this.disabled = false;
        this.indeterminate = false;
        this.invalid = false;
        this.focused = false;
        this.hovered = false;
        this.active = false;
    }
    /**
     * Toggles `checked` prop, and emits a change event accordingly.
     * Used by `market-row` to sync its selected state w/ slotted checkboxes.
     */
    setSelection(newValue, { silent = false } = {}) {
        // this method's implementation could be cleaned up and simplified
        // (see analogous setSelection methods in toggle & radio),
        // but the extra indeterminate state complicates things a bit.
        // so just implementing this in a roundabout way for now in order to
        // keep the tests the same, until we decide to handle it differently.
        // ideally the indeterminate state wouldn't change if the event is prevented,
        // but this could be a breaking change which would need to be addressed.
        const { marketCheckboxValueChange, checked: prevValue, innerInput } = this;
        if (typeof newValue !== 'boolean')
            return Promise.resolve();
        this.indeterminate = false;
        if (prevValue === newValue)
            return Promise.resolve();
        if (!silent) {
            const { defaultPrevented } = marketCheckboxValueChange.emit({
                current: newValue,
                previous: prevValue,
            });
            if (defaultPrevented) {
                return Promise.resolve();
            }
        }
        this.checked = newValue;
        // When using the non-lazy output target, this method sometimes gets called
        // from market-row's watcher after innerInput is removed, hence this check.
        if (innerInput) {
            innerInput.checked = newValue;
        }
        return Promise.resolve();
    }
    /**
     * Toggles `indeterminate` prop. Operates independently of the `checked` property but if `true`,
     * indeterminate visual appearance takes precedence over checked/unchecked.
     */
    setIndeterminate(newValue) {
        this.indeterminate = newValue;
        return Promise.resolve();
    }
    /**
     * DEPRECATED (3.x): Toggles `selected` state (unrelated to the HTML attribute `value`).
     */
    setValue(newValue) {
        /* eslint-disable-next-line no-console */
        console.warn("market-checkbox's setValue() method has been deprecated. Use setSelection() instead.", this.el);
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
    handleClick(event) {
        // Always prevent default so we can manually control the selection
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        this.setFocus();
        this.setSelection(!this.checked);
    }
    getCheckedState() {
        return this.indeterminate ? 'indeterminate' : this.checked;
    }
    componentDidRender() {
        if (!this.innerInput) {
            this.innerInput = this.el.shadowRoot.querySelector('input');
        }
    }
    render() {
        return (h(Host, { key: '986021083a3fee4efb0f7f4c815ba933b8bc74be', class: "market-checkbox", onBlur: () => {
                this.setFocus(false);
            }, onClick: this.handleClick, onFocus: () => {
                this.setFocus();
            } }, h("input", { key: '6e48efe625e8a2bf41973d53494bc986bfabfc53', ref: (el) => (this.innerInput = el), type: "checkbox", "aria-label": getControlInputAriaLabel(this.el), checked: this.checked, indeterminate: this.indeterminate, disabled: this.disabled }), this.checked && !this.indeterminate && (h("svg", { key: 'bb79e0d37686e6439c90f5cb1cf5cb8254f644bf', width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", "data-testid": "check" }, h("path", { key: 'a04b9d93b99f30815a97a3f0c63d9bbc14c1fd09', d: "M6 10L8.85714 13L14 7", stroke: "white", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))), this.indeterminate && (h("svg", { key: 'a3f4496a0b99ef3cd29ef3a631eb2aa0e57bcc21', width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", "data-testid": "indeterminate" }, h("path", { key: '2e3e2bd50a4f8ec1f10ad186b603463d20c73916', d: "M6 10H14", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })))));
    }
    get el() { return getElement(this); }
};
MarketCheckbox.style = MarketCheckboxStyle0;

export { MarketCheckbox as market_checkbox };

//# sourceMappingURL=market-checkbox.entry.js.map