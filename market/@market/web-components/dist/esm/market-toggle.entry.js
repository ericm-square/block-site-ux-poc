import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { g as getControlInputAriaLabel } from './aria-7b58e134.js';

const marketToggleCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--focus-ring-color:color-mix(in srgb, var(--toggle-focus-ring-color) 100%, transparent);position:relative;display:inline-block;height:var(--toggle-height)}input{position:absolute;top:0;left:0;width:100%;height:100%;margin:0;border-radius:var(--toggle-border-radius);background:transparent;outline:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}input:focus-visible{outline:var(--toggle-focus-ring-border-size) solid var(--focus-ring-color);outline-offset:var(--core-focus-ring-buffer-size);}circle,rect{transition:var(--row-slotted-control-transition, cx 0.3s)}circle{fill:var(--toggle-normal-state-unselected-value-thumb-color)}rect{fill:var(--toggle-normal-state-unselected-value-track-color);stroke:var(--toggle-normal-state-unselected-value-border-color)}:host([checked]) circle{fill:var(--toggle-normal-state-selected-value-thumb-color);cx:28px}:host([checked]) rect{fill:var(--toggle-normal-state-selected-value-track-color);stroke:var(--toggle-normal-state-selected-value-border-color)}:host(:hover) circle,:host([hovered]) circle{fill:var(--toggle-hover-state-unselected-value-thumb-color)}:host(:hover) rect,:host([hovered]) rect{fill:var(--toggle-hover-state-unselected-value-track-color);stroke:var(--toggle-hover-state-unselected-value-border-color)}:host([checked]:hover) circle,:host([checked][hovered]) circle{fill:var(--toggle-hover-state-selected-value-thumb-color)}:host([checked]:hover) rect,:host([checked][hovered]) rect{fill:var(--toggle-hover-state-selected-value-track-color);stroke:var(--toggle-hover-state-selected-value-border-color)}:host([focused]) circle{fill:var(--toggle-focus-state-unselected-value-thumb-color)}:host([focused]) rect{fill:var(--toggle-focus-state-unselected-value-track-color);stroke:var(--toggle-focus-state-unselected-value-border-color)}:host([checked][focused]) circle{fill:var(--toggle-focus-state-selected-value-thumb-color)}:host([checked][focused]) rect{fill:var(--toggle-focus-state-selected-value-track-color);stroke:var(--toggle-focus-state-selected-value-border-color)}:host(:active) circle,:host([active]) circle{fill:var(--toggle-pressed-state-unselected-value-thumb-color)}:host(:active) rect,:host([active]) rect{fill:var(--toggle-pressed-state-unselected-value-track-color);stroke:var(--toggle-pressed-state-unselected-value-border-color)}:host([checked]:active) circle,:host([checked][active]) circle{fill:var(--toggle-pressed-state-selected-value-thumb-color)}:host([checked]:active) rect,:host([checked][active]) rect{fill:var(--toggle-pressed-state-selected-value-track-color);stroke:var(--toggle-pressed-state-selected-value-border-color)}:host([disabled]) input{cursor:not-allowed}:host([disabled]) circle{fill:var(--toggle-disabled-state-unselected-value-thumb-color)}:host([disabled]) rect{fill:var(--toggle-disabled-state-unselected-value-track-color);stroke:var(--toggle-disabled-state-unselected-value-border-color)}:host([disabled][checked]) circle{fill:var(--toggle-disabled-state-selected-value-thumb-color)}:host([disabled][checked]) rect{fill:var(--toggle-disabled-state-selected-value-track-color);stroke:var(--toggle-disabled-state-selected-value-border-color)}";
const MarketToggleStyle0 = marketToggleCss;

const MarketToggle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketToggleChange = createEvent(this, "marketToggleChange", 7);
        this.checked = false;
        this.disabled = false;
        this.focused = false;
        this.hovered = false;
        this.active = false;
    }
    /**
     * Toggles `checked` prop, and emits a change event accordingly.
     * Used by `market-row` to sync its selected state w/ slotted toggles.
     */
    setSelection(newValue, { silent = false } = {}) {
        const { marketToggleChange, checked: prevValue, innerInput } = this;
        if (typeof newValue !== 'boolean')
            return Promise.resolve();
        if (prevValue === newValue)
            return Promise.resolve();
        if (!silent) {
            const { defaultPrevented } = marketToggleChange.emit({
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
     * DEPRECATED (3.x): Toggles `selected` state (unrelated to the HTML attribute `value`).
     */
    setValue(newValue) {
        /* eslint-disable-next-line no-console */
        console.warn("market-toggle's setValue() method has been deprecated. Use setSelection() instead.", this.el);
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
        // We don't want to set focus to true if the toggle is disabled,
        // but we do want to allow setting focus to false when disabled,
        // since disabling the toggle causes it to lose browser focus,
        // triggering the onBlur event and calling this method.
        if (this.disabled && value) {
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
    render() {
        return (h(Host, { key: '951c262c523b48e73f7eac8a34f466946a2f7daa', class: "market-toggle", onBlur: () => {
                this.setFocus(false);
            }, onClick: this.handleClick, onFocus: () => {
                this.setFocus();
            } }, h("input", { key: '4ab242da6a76ba4472ad14478d8f07f4d82c3a77', ref: (el) => (this.innerInput = el), type: "checkbox", role: "switch", "aria-label": getControlInputAriaLabel(this.el), checked: this.checked, disabled: this.disabled }), h("svg", { key: 'f990289d9d5d1f06609c1b4e065e34525ea4e11f', width: "40", height: "24", viewBox: "0 0 40 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" }, h("rect", { key: '88fcdb713db813a007e1cc07fa9a2562136e1134', x: "1", y: "1", width: "38", height: "22", rx: "11", "stroke-width": "2" }), h("circle", { key: '10e6d92b7936078bc9a2f7a43253c58448c126ca', cx: "12", cy: "12", r: "7" }))));
    }
    get el() { return getElement(this); }
};
MarketToggle.style = MarketToggleStyle0;

export { MarketToggle as market_toggle };

//# sourceMappingURL=market-toggle.entry.js.map