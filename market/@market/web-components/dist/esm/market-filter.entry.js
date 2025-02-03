import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { c as classNames } from './classnames-84eaa2b2.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';
import { M as MENU_SLOT_NAMES } from './menu-48d7df69.js';
import { i as isValueEmpty } from './utils-642247e6.js';
import { v as v4 } from './v4-fa4bb814.js';

const marketFilterCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:inline-block}.dropdown,.dropdown>.filter-button{width:100%}.date-popover{max-width:unset;max-height:unset}";
const MarketFilterStyle0 = marketFilterCss;

const MarketFilter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketFilterClosed = createEvent(this, "marketFilterClosed", 7);
        this.marketFilterOpened = createEvent(this, "marketFilterOpened", 7);
        this.marketFilterExpandedChanged = createEvent(this, "marketFilterExpandedChanged", 7);
        this.marketFilterValueDidChange = createEvent(this, "marketFilterValueDidChange", 7);
        this.name = undefined;
        this.disabled = undefined;
        this.focused = false;
        this.size = 'medium';
        this.expanded = false;
        this.dropdownInteraction = undefined;
        this.popoverPlacement = 'bottom-start';
        this.popoverStrategy = 'absolute';
        this.selectedDisplayValue = undefined;
    }
    /**
     * **INTERNAL [do not use directly]**
     *
     * Get the filter type
     */
    async getFilterType() {
        return Promise.resolve(this.filterType);
    }
    /**
     * Toggle focus on the filter button
     * @param {boolean} [value=true] whether or not focus will be applied or removed
     * @returns {Promise<boolean>} whether or not the filter was focused or blurred
     */
    async setFocus(value = true) {
        this.focused = await this.filterButtonEl.setFocus(value);
        return Promise.resolve(this.focused);
    }
    /**
     * @private
     * *INTERNAL*: Used by `market-filter-dropdown-menu` to reemit events from the cloned datepicker inside the dropdown.
     *
     * Sets the value of the list and emits `marketFilterValueDidChange`.
     *
     * @param value - The value to set for the market filter.
     * @returns A promise that resolves when the value is set.
     */
    async __setAndEmitListValue(value) {
        var _a;
        if (!this.listEl) {
            return Promise.reject(new Error('No list found.'));
        }
        const prevValue = (_a = this.listEl) === null || _a === void 0 ? void 0 : _a.value;
        this.listEl.value = value;
        this.marketFilterValueDidChange.emit({
            name: this.name,
            prevValue: prevValue || null,
            value,
        });
        this.setDisplayValueFromSlottedElement();
        return Promise.resolve();
    }
    /**
     * @private
     * *INTERNAL*: Used by `market-filter-dropdown-menu` to reemit events from the cloned datepicker inside the dropdown.
     *
     * Sets the value of the date picker emits `marketFilterValueDidChange`.
     *
     * @param value - The new value for the date picker.
     * @returns A promise that resolves when the value is set.
     */
    async __setAndEmitDatePickerValue(value) {
        if (!this.datePickerEl) {
            return Promise.reject(new Error('No date picker found.'));
        }
        const prevStartDate = this.datePickerEl.selectedStartDate;
        const prevEndDate = this.datePickerEl.selectedEndDate;
        const startDate = value === null || value === void 0 ? void 0 : value.startDate;
        const endDate = value === null || value === void 0 ? void 0 : value.endDate;
        this.datePickerEl.selectedStartDate = startDate;
        this.datePickerEl.selectedEndDate = endDate;
        this.marketFilterValueDidChange.emit({
            name: this.name,
            prevValue: {
                startDate: prevStartDate,
                endDate: prevEndDate,
            },
            value: {
                startDate,
                endDate,
            },
        });
        this.setDisplayValueFromSlottedElement();
        return Promise.resolve();
    }
    /**
     * Handle `marketListSelectionsDidChange` emitted by `<market-list>`
     */
    handleListSelectionChange({ detail }) {
        var _a;
        this.setDisplayValueFromListEvent(detail);
        const prevValue = detail.prevSelectionValues.length > 1 ? detail.prevSelectionValues : detail.prevSelectionValues[0];
        const value = (() => {
            if (detail.currentSelectionValues.length === 0) {
                return null;
            }
            else if (detail.currentSelectionValues.length === 1) {
                return detail.currentSelectionValues[0];
            }
            return detail.currentSelectionValues;
        })();
        this.rawValue = value;
        this.marketFilterValueDidChange.emit({
            name: this.name,
            prevValue: prevValue || null,
            value,
        });
        /**
         * If the `<market-list>` is mutliselect, prevent the dropdown from collapsing after a selection.
         * Also prevent from closing when `dropdownInteraction` is provided.
         */
        if (!((_a = this.listEl) === null || _a === void 0 ? void 0 : _a.multiselect) && !this.dropdownInteraction) {
            this.expanded = false;
        }
    }
    /**
     * Handle `marketDateRangeChanged` emitted by `<market-date-picker>`
     */
    handleDateRangeChange(e) {
        const { startDate, endDate, prevStartDate, prevEndDate } = e.detail;
        this.setDisplayValueFromDateEvent(e);
        this.marketFilterValueDidChange.emit({
            name: this.name,
            prevValue: {
                startDate: prevStartDate,
                endDate: prevEndDate,
            },
            value: {
                startDate,
                endDate,
            },
        });
    }
    /**
     * Handle `marketDropdownOpened` emitted by `<market-dropdown>`
     */
    handleDropdownOpened(e) {
        if (e.target !== this.el)
            return;
        const { defaultPrevented } = this.marketFilterExpandedChanged.emit(true);
        if (defaultPrevented) {
            e.preventDefault();
            return;
        }
        // temporary handler for deprecated event
        if (this.marketFilterOpened.emit().defaultPrevented) {
            e.preventDefault();
            return;
        }
        if (!this.dropdownInteraction) {
            this.expanded = true;
        }
    }
    /**
     * Handle `marketDropdownClosed` emitted by `<market-dropdown>`
     */
    handleDropdownClosed(e) {
        if (e.target !== this.el)
            return;
        const { defaultPrevented } = this.marketFilterExpandedChanged.emit(false);
        if (defaultPrevented) {
            e.preventDefault();
            return;
        }
        // temporary handler for deprecated event
        if (this.marketFilterClosed.emit().defaultPrevented) {
            e.preventDefault();
            return;
        }
        if (!this.dropdownInteraction) {
            this.expanded = false;
        }
    }
    /**
     * Handle default slot changes
     */
    handleDefaultSlotChange() {
        this.datePickerEl = this.el.querySelector(getNamespacedTagFor('market-date-picker'));
        this.listEl = this.el.querySelector(getNamespacedTagFor('market-list'));
        const autoId = `popover-${v4()}`;
        if (this.datePickerEl) {
            if (!this.datePickerEl.id) {
                this.datePickerEl.id = autoId;
                this.popoverId = autoId;
            }
            else {
                this.popoverId = this.datePickerEl.id;
            }
            this.filterType = 'date';
            this.setDisplayValueFromSlottedElement();
        }
        else if (this.listEl) {
            // make sure that the list is interactive
            if (!this.listEl.interactive) {
                this.listEl.interactive = true;
            }
            if (!this.listEl.id) {
                this.listEl.id = autoId;
                this.popoverId = autoId;
            }
            else {
                this.popoverId = this.listEl.id;
            }
            this.filterType = 'list';
            this.setDisplayValueFromSlottedElement();
        }
    }
    /**
     * Listens to changes in row content to ensure that if the selected row's content
     * is dynamically updated, those changes will be reflected to `selectedDisplayValue`.
     */
    initRowObservers() {
        /**
         * Since onSlotchange only fires on changes to the slotted node itself,
         * we need to use mutation observers to listen to changes to market-list's
         * slotted market-rows: https://github.com/ionic-team/stencil/issues/232#issuecomment-397871813
         */
        const syncRowContent = (row) => {
            if (typeof this.rawValue === 'string' && row.value === this.rawValue) {
                this.selectedDisplayValue = this.getTextContentOfRowWithValue(row.value);
            }
        };
        const rows = this.el.querySelectorAll(`${getNamespacedTagFor('market-list')} ${getNamespacedTagFor('market-row')}`);
        rows.forEach((row) => {
            const observer = new MutationObserver(() => syncRowContent(row));
            observer.observe(row, { characterData: true, subtree: true });
        });
    }
    /**
     * Gets the `.textContent` of the `<market-row>` with the provided `value`.
     * This is only used for list types.
     */
    getTextContentOfRowWithValue(value) {
        const marketRowTag = getNamespacedTagFor('market-row');
        const labelEl = this.listEl.querySelector(`${marketRowTag}[value="${value}"] [slot="label"]`);
        return labelEl === null || labelEl === void 0 ? void 0 : labelEl.textContent;
    }
    /**
     * Infers the value from the <market-list> or <market-date-picker>
     */
    setDisplayValueFromSlottedElement() {
        const displayValueEl = this.el.querySelector('[slot="display-value"]');
        const hasDisplayValue = Boolean(displayValueEl);
        if (hasDisplayValue) {
            this.selectedDisplayValue = displayValueEl.textContent;
            return;
        }
        if (this.listEl) {
            if (!this.listEl.value) {
                this.selectedDisplayValue = undefined;
                return;
            }
            this.rawValue = this.listEl.value;
            if (this.listEl.multiselect) {
                // if there's more than 1 value selected, get the count of selected values
                const valueCount = (() => {
                    if (typeof this.listEl.value === 'string') {
                        return this.listEl.value.split(',').length;
                    }
                    else if (Array.isArray(this.listEl.value)) {
                        return this.listEl.value.length;
                    }
                    return undefined; // this will skip the check below and print the raw `value` instead
                })();
                if (valueCount > 1) {
                    this.selectedDisplayValue = `${valueCount}`;
                    return;
                }
            }
            // get the selected row's label textContent and set that as the display value
            this.selectedDisplayValue = this.getTextContentOfRowWithValue(this.listEl.value);
        }
        else if (this.datePickerEl) {
            this.selectedDisplayValue = this.formatDate({
                startDate: this.datePickerEl.selectedStartDate,
                endDate: this.datePickerEl.selectedEndDate,
            });
        }
    }
    formatDate({ startDate, endDate }) {
        var _a, _b;
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        if (!start && !end) {
            return '';
        }
        const locale = this.datePickerEl.locale;
        // If both dates exists and have the same year, show the year only on the end of the range.
        const startAndEndInTheSameYear = Boolean(start && end && start.getFullYear() === end.getFullYear());
        const startDateString = (_a = start === null || start === void 0 ? void 0 : start.toLocaleDateString(locale, startAndEndInTheSameYear && end ? { day: 'numeric', month: 'numeric' } : { dateStyle: 'short' })) !== null && _a !== void 0 ? _a : '';
        const endDateString = (_b = end === null || end === void 0 ? void 0 : end.toLocaleDateString(locale, { dateStyle: 'short' })) !== null && _b !== void 0 ? _b : '';
        return `${startDateString}${endDateString ? `–${endDateString}` : ''}`;
    }
    /**
     * Calculate the display value from the `marketDateRangeChanged` event of `<market-list>`
     * Formatting is based on design guidelines:
     * https://www.notion.so/marketdesignsystem/Filters-78885543b16446f49d5cfa98c6a56648#bb6aac7e29e04f98890ba32042ddae05
     */
    setDisplayValueFromDateEvent(e) {
        var _a, _b, _c, _d;
        const { menuSelection } = e.detail;
        if (menuSelection === MENU_SLOT_NAMES.CUSTOM) {
            this.selectedDisplayValue = this.formatDate(e.detail);
        }
        else if (menuSelection) {
            // get the textContent of the menu item
            const presetMenuTextContent = (_d = (_c = (_b = (_a = this.datePickerEl) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(`${getNamespacedTagFor('market-date-picker-menu')} slot[name="${menuSelection}"]`)) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim();
            this.selectedDisplayValue = presetMenuTextContent;
        }
    }
    /**
     * Calculate the display value from the `marketListSelectionsDidChange` event of `<market-list>`
     */
    setDisplayValueFromListEvent({ currentSelectionValues, currentSelections, }) {
        const displayValueEl = this.el.querySelector('[slot="display-value"]');
        const hasDisplayValue = Boolean(displayValueEl);
        if (hasDisplayValue) {
            this.selectedDisplayValue = displayValueEl.textContent;
            return;
        }
        if (!(currentSelectionValues === null || currentSelectionValues === void 0 ? void 0 : currentSelectionValues.length)) {
            // no selection
            this.selectedDisplayValue = undefined;
        }
        else if (currentSelectionValues.length > 1) {
            // multiple selections: display the count
            this.selectedDisplayValue = `${currentSelectionValues.length}`;
        }
        else {
            // single selection: display the selected row's label contents
            const labelEl = currentSelections[0].querySelector('[slot="label"]');
            this.selectedDisplayValue = labelEl.textContent;
        }
    }
    connectedCallback() {
        this.initRowObservers();
        this.handleDefaultSlotChange();
    }
    render() {
        var _a;
        const { datePickerEl, disabled, dropdownInteraction, expanded, handleDefaultSlotChange, listEl, popoverId, popoverPlacement, popoverStrategy, selectedDisplayValue, size, } = this;
        /**
         * Dropdown interaction will be set as 'persistent' by default if:
         * - `dropdownInteraction` is not defined; or
         * - `<market-list>` is provided and is `multiselect`; or
         * - `<market-date-picker>` is provided
         */
        const isMultiselectList = (_a = listEl === null || listEl === void 0 ? void 0 : listEl.multiselect) !== null && _a !== void 0 ? _a : false;
        const hasDatePicker = Boolean(datePickerEl);
        const interaction = dropdownInteraction !== null && dropdownInteraction !== void 0 ? dropdownInteraction : (hasDatePicker || isMultiselectList ? 'persistent' : undefined);
        const MarketDropdownTagName = getNamespacedTagFor('market-dropdown');
        const MarketPopoverTagName = getNamespacedTagFor('market-popover');
        const MarketFilterButtonTagName = getNamespacedTagFor('market-filter-button');
        return (h(Host, { key: '232446ed830e3feb776c691d0c77a27a13730e07', class: "market-filter" }, h(MarketDropdownTagName, { key: 'eeb8a4bfe3a2d0a2c8ecf73787e0de2105137ca2', class: "dropdown", disabled: disabled, expanded: expanded, interaction: interaction, popoverPlacement: popoverPlacement, popoverStrategy: popoverStrategy }, h(MarketFilterButtonTagName, { key: '7f34007cbf900c11b76d70d4b8ca5a341b0c69b7', active: expanded, class: "filter-button", disabled: disabled, ref: (el) => (this.filterButtonEl = el), slot: "trigger", size: size, popoverId: popoverId }, h("slot", { key: 'd69a920b6ece024223e9b41f938ded48d7581cd9', name: "label" }), !isValueEmpty(selectedDisplayValue) && (h("span", { key: 'b780be1b15399455522269be98a395af03f64c8b', slot: "feedback" }, h("slot", { key: '92193310039dd4006cb34d945403f2f62aca4349', name: "display-value" }, selectedDisplayValue)))), h(MarketPopoverTagName, { key: '8e1d32d1b6782be2fc9ddc3e09dec981adce7613', class: classNames({ 'date-popover': hasDatePicker }), slot: "popover", id: popoverId }, h("slot", { key: '41b3895ba903e29b90063a3085a60ab0aa16bb75', onSlotchange: handleDefaultSlotChange.bind(this) }), h("slot", { key: '08001b6b66a5bbc79e9e8c9ad51f285baa19ecd3', name: "list", onSlotchange: handleDefaultSlotChange.bind(this) })))));
    }
    get el() { return getElement(this); }
};
MarketFilter.style = MarketFilterStyle0;

export { MarketFilter as market_filter };

//# sourceMappingURL=market-filter.entry.js.map