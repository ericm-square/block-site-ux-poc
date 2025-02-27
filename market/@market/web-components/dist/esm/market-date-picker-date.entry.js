import { r as registerInstance, c as createEvent, h, g as getElement, H as Host } from './index-e03cb5c3.js';

const marketDatePickerDateCss = ":host(:not([day])){border-width:0 !important;border-radius:0 !important;background-color:rgb(0 0 0 / 0%) !important;color:rgb(0 0 0 / 0%) !important;pointer-events:none !important;}:host{display:inline-flex;flex-direction:row;justify-content:center;align-items:center;width:100%;min-width:var(--date-picker-grid-item-width);height:var(--date-picker-grid-item-height);padding:0;font-size:var(--date-picker-weekdays-font-size);line-height:var(--date-picker-weekdays-font-leading);text-align:center}:host([disabled]){color:var(--date-picker-date-text-unselected-selection-disabled-state-color);cursor:not-allowed}:host(.weekday-header){color:var(--date-picker-weekdays-color-color);cursor:auto}:host(:not([selection='range-middle']:not([today]))){border-radius:var(--date-picker-date-border-radius)}:host([selection='none']:not([disabled])){color:var(--date-picker-date-text-unselected-selection-normal-state-color)}:host([selection='single'][selected]),:host([selection='range-first'][selected]),:host([selection='range-last'][selected]){background-color:var(--date-picker-date-background-single-selection-normal-state-color);color:var(--date-picker-date-text-single-selection-disabled-state-color)}:host([selection='single'][disabled][selected]),:host([selection='range-first'][disabled][selected]),:host([selection='range-last'][disabled][selected]){background-color:var(--date-picker-date-background-single-selection-disabled-state-color);color:var(--date-picker-date-text-single-selection-disabled-state-color)}:host(:hover[selection='range-first']:not([selected]):not([today])),:host(:active[selection='range-first']:not([selected]):not([today])){--date-picker-date-range-first-selection-border-radius-top-left:var(--date-picker-date-border-radius);--date-picker-date-range-first-selection-border-radius-top-right:0;--date-picker-date-range-first-selection-border-radius-bottom-right:0;--date-picker-date-range-first-selection-border-radius-bottom-left:var(--date-picker-date-border-radius);border-radius:var(--date-picker-date-range-first-selection-border-radius-top-left)\n      var(--date-picker-date-range-first-selection-border-radius-top-right)\n      var(--date-picker-date-range-first-selection-border-radius-bottom-right)\n      var(--date-picker-date-range-first-selection-border-radius-bottom-left)}:host([selection='range-middle']:not([disabled])){background-color:var(--date-picker-date-background-range-middle-selection-hover-state-color);color:var(--date-picker-date-text-range-middle-selection-hover-state-color)}:host([selection='range-middle'][selected]){background-color:var(--date-picker-date-background-range-middle-selection-normal-state-color)}:host([selection='range-middle'][disabled][today]){border-color:var(--date-picker-date-border-disabled-state-color-color)}:host(:hover[selection='range-last']:not([selected]):not([today])),:host(:active[selection='range-last']:not([selected]):not([today])){--date-picker-date-range-last-selection-border-radius-top-left:0;--date-picker-date-range-last-selection-border-radius-top-right:var(--date-picker-date-border-radius);--date-picker-date-range-last-selection-border-radius-bottom-right:var(--date-picker-date-border-radius);--date-picker-date-range-last-selection-border-radius-bottom-left:0;border-radius:var(--date-picker-date-range-last-selection-border-radius-top-left)\n      var(--date-picker-date-range-last-selection-border-radius-top-right)\n      var(--date-picker-date-range-last-selection-border-radius-bottom-right)\n      var(--date-picker-date-range-last-selection-border-radius-bottom-left)}:host([today]){box-sizing:border-box;border-width:calc(var(--date-picker-today-border-width) * 1px);border-style:solid;border-radius:var(--date-picker-date-border-radius);font-weight:var(--date-picker-today-font-weight)}:host([today]:not([disabled])){border-color:var(--date-picker-today-border-color-color)}:host([today][disabled]){color:var(--date-picker-today-label-disabled-state-color-color)}:host(:hover:not([disabled])){cursor:pointer}:host(:hover:not([disabled]):not([selected])){background-color:var(--date-picker-date-background-unselected-selection-hover-state-color);color:var(--date-picker-date-text-unselected-selection-hover-state-color)}:host(:active:not([disabled]):not([selected])){background-color:var(--date-picker-date-background-unselected-selection-pressed-state-color);color:var(--date-picker-date-text-unselected-selection-pressed-state-color)}";
const MarketDatePickerDateStyle0 = marketDatePickerDateCss;

const MarketDatePickerDate = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketDatePickerDateSelected = createEvent(this, "marketDatePickerDateSelected", 7);
        this.marketDatePickerDateMousedOver = createEvent(this, "marketDatePickerDateMousedOver", 7);
        this.marketDatePickerDateMousedOut = createEvent(this, "marketDatePickerDateMousedOut", 7);
        this.disabled = false;
        this.selection = 'none';
        this.today = false;
        this.selected = false;
        this.day = undefined;
        this.type = undefined;
    }
    /**
     * Interaction handler that passes events back to the market-date-picker component
     */
    handleInteraction(e) {
        var _a;
        if (this.disabled || ((_a = this.day) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            e.stopImmediatePropagation();
            return;
        }
        const isKeyboardEnter = e instanceof KeyboardEvent && e.type === 'keydown' && e.key === 'Enter';
        if (e.type === 'click' || isKeyboardEnter) {
            this.marketDatePickerDateSelected.emit({ date: this.el });
        }
        if (e.type === 'mouseover') {
            this.marketDatePickerDateMousedOver.emit({ date: this.el });
        }
        if (e.type === 'mouseout') {
            this.marketDatePickerDateMousedOut.emit();
        }
    }
    render() {
        return (h(Host, { key: '4a7621e744a0ecf6b77dc02b8d73fec0f311c51a', class: "market-date-picker-date", role: this.disabled || !this.day ? undefined : 'button', tabindex: this.disabled || !this.day ? -1 : 0, "aria-disabled": this.disabled, onClick: (e) => {
                this.handleInteraction(e);
            }, onmouseover: (e) => {
                this.handleInteraction(e);
            }, onmouseout: (e) => {
                this.handleInteraction(e);
            }, onkeydown: (e) => {
                this.handleInteraction(e);
            } }, this.day));
    }
    get el() { return getElement(this); }
};
MarketDatePickerDate.style = MarketDatePickerDateStyle0;

export { MarketDatePickerDate as market_date_picker_date };

//# sourceMappingURL=market-date-picker-date.entry.js.map