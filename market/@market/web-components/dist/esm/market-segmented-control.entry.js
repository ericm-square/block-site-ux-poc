import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { c as cjs } from './index-0ae5b082.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';

const marketSegmentedControlCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{position:relative;display:inline-flex;flex-direction:row;gap:calc(var(--segmented-control-padding-horizontal) * 2);align-items:center;min-width:100%;padding:var(--segmented-control-padding-vertical) var(--segmented-control-padding-horizontal);border-radius:var(--segmented-control-background-radius);background:var(--segmented-control-background-normal-state-color)}:host([disabled]){background:var(--segmented-control-background-disabled-state-color);color:var(--segmented-control-option-label-disabled-state-color)}::slotted(.market-segment){z-index:2;width:100%;height:100%}:host::before{content:\"\";position:absolute;left:var(--selected-slider-left);z-index:1;width:var(--selected-slider-width);height:calc(100% - var(--segmented-control-padding-vertical) * 2);border-radius:var(--segmented-control-option-background-radius);background:var(--segmented-control-option-background-selected-state-color);box-shadow:var(--elevation-10-shadow);transition:left var(--segmented-control-animation-duration)}";
const MarketSegmentedControlStyle0 = marketSegmentedControlCss;

function isValueEmpty(value) {
    return value === '' || value === ' ' || value === null || value === undefined;
}
const MarketSegmentedControl = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketSegmentedSelectionDidChange = createEvent(this, "marketSegmentedSelectionDidChange", 7);
        this.items = undefined;
        this.value = '';
        this.disabled = false;
    }
    valueWatcher() {
        this.setSelectionsFromValue();
    }
    /**
     * If a segment gets slotted in, set the value to match that of the row
     */
    disabledChangeHandler() {
        var _a;
        (_a = this.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => (item.disabled = this.disabled));
    }
    /**
     * Select item that corresponds to passed value, or clear all values if value is empty string.
     */
    setSelectionsFromValue() {
        var _a;
        (_a = this.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            if (this.value === item.value) {
                item.setSelectedState(true);
                this.setSliderPosition(item);
            }
            else {
                item.setSelectedState(false);
            }
        });
    }
    /**
     * Sets the initial state of the segmented-control by updating and propagating props and setting
     * default value.
     */
    setInternalState() {
        this.items = this.el.querySelectorAll(`${getNamespacedTagFor('market-segment')}`);
        this.selectedSlider = this.el.shadowRoot.getElementById('selected-slider');
        if (this.items.length > 0) {
            if (isValueEmpty(this.value)) {
                this.value = this.items[0].value;
            }
            this.setSelectionsFromValue();
        }
    }
    /**
     * Sets slider size to be the size of a segment
     */
    setSliderSize() {
        var _a;
        this.el.style.setProperty('--selected-slider-width', `calc(${100 / ((_a = this.items) === null || _a === void 0 ? void 0 : _a.length)}% - ${cjs.SEGMENTED_CONTROL_PADDING_HORIZONTAL * 2}px)`);
    }
    /**
     * Sets slider position (left offset) based on the currently selected item
     */
    setSliderPosition(selectedItem = undefined) {
        if (!selectedItem) {
            this.el.style.setProperty('--selected-slider-left', `${cjs.SEGMENTED_CONTROL_PADDING_HORIZONTAL}px`);
            return;
        }
        const newSelectionIndex = [...this.items].indexOf(selectedItem);
        this.el.style.setProperty('--selected-slider-left', `calc(${(newSelectionIndex / this.items.length) * 100}% + ${cjs.SEGMENTED_CONTROL_PADDING_HORIZONTAL}px)`);
    }
    /**
     * Sets the initial state of the segmented-control by updating and propagating props and setting
     * default value.
     */
    defaultSlotchangeHandler() {
        this.setInternalState();
        this.setSliderSize();
    }
    marketSegmentSelectedEventHandler(e) {
        const newSelection = e.target;
        const prevSelection = this.el.querySelector(`${getNamespacedTagFor('market-segment')}[selected]`);
        prevSelection === null || prevSelection === void 0 ? void 0 : prevSelection.setSelectedState(false);
        newSelection.setSelectedState(true);
        this.setSliderPosition(newSelection);
        this.marketSegmentedSelectionDidChange.emit({
            selectedSegment: newSelection,
            selectedSegmentValue: newSelection.value,
            deselectedSegment: prevSelection,
            deselectedSegmentValue: prevSelection === null || prevSelection === void 0 ? void 0 : prevSelection.value,
        });
    }
    render() {
        return (h(Host, { key: '9b4e2e05d111b43b02ad003f5ff57f9f65afa610', class: "market-segmented-control" }, h("slot", { key: '25608a3e24e8bfff6d9683db3a92553cffb896e0', onSlotchange: () => this.defaultSlotchangeHandler() })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "value": ["valueWatcher"],
        "disabled": ["disabledChangeHandler"]
    }; }
};
MarketSegmentedControl.style = MarketSegmentedControlStyle0;

export { MarketSegmentedControl as market_segmented_control };

//# sourceMappingURL=market-segmented-control.entry.js.map