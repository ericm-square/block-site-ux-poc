import { r as registerInstance, h, F as Fragment, H as Host, g as getElement } from './index-e03cb5c3.js';
import { c as classNames } from './classnames-84eaa2b2.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';
import { i as isValueEmpty } from './utils-642247e6.js';

const marketFilterDropdownMenuCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}::slotted([slot=\"filter-title\"]){font-weight:var(--core-type-heading-20-weight);font-size:var(--core-type-heading-20-size);font-family:var(--core-type-heading-20-font-family);line-height:var(--core-type-heading-20-leading);letter-spacing:var(--core-type-heading-20-tracking);text-transform:var(--core-type-heading-20-case)}.overflow-filters{overflow:hidden;height:0}.popover{display:flex;flex-direction:column}.selection-header::part(heading){--filter-overflow-heading-margin-top-size:var(--core-metrics-spacing-200);margin-top:var(--filter-overflow-heading-margin-top-size)}.filter-options-container{--filter-overflow-filter-options-container-margin-top-size:var(--core-metrics-spacing-100);display:flex;flex:1;overflow-y:auto;width:calc(\n      100% +\n      var(--modal-popover-wide-viewport-padding-left-size) +\n      var(--modal-popover-wide-viewport-padding-right-size)\n    );margin:var(--filter-overflow-filter-options-container-margin-top-size)\n    calc(var(--modal-popover-wide-viewport-padding-right-size) * -1)\n    calc(var(--modal-popover-wide-viewport-padding-bottom-size) * -1)\n    calc(var(--modal-popover-wide-viewport-padding-left-size) * -1);padding-left:var(--modal-popover-wide-viewport-padding-left-size)}.filter-options-container ::slotted(.market-list[slot=\"filter-options\"]){width:calc(100% - var(--modal-popover-wide-viewport-padding-right-size))}.filter-options-container ::slotted(.market-list[slot=\"filter-options\"])::after{content:\"\";display:block;width:100%;height:var(--core-metrics-spacing-100)}.filter-options-container ::slotted(.market-date-picker[slot=\"filter-options\"]){width:auto;min-width:var(--date-picker-minimum-width);padding-right:var(--modal-popover-wide-viewport-padding-right-size)}.filter-options-container ::slotted(.market-date-picker[slot=\"filter-options\"])::after{content:\"\";display:block;width:100%;height:var(--core-metrics-spacing-300)}.filter-options-container ::slotted(.market-date-picker[slot=\"filter-options\"][display-menu]){height:calc(100%)}";
const MarketFilterDropdownMenuStyle0 = marketFilterDropdownMenuCss;

const MarketFilterDropdownMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = 'medium';
        this.filtersWithSelectedValue = undefined;
        this.hasSelectedFilter = undefined;
        this.isDropdownActive = undefined;
    }
    /**
     * Handle `marketDropdownOpened` emitted by `<market-dropdown>`
     */
    handleDropdownOpened(e) {
        if (e.target !== this.el)
            return;
        this.deselectFilter();
        this.isDropdownActive = true;
    }
    /**
     * Handle `marketDropdownClosed` emitted by `<market-dropdown>`
     */
    handleDropdownClosed(e) {
        if (e.target !== this.el)
            return;
        this.isDropdownActive = false;
    }
    /**
     * Handle `marketHeaderNavigate` emitted by `<market-button>` when clicking the back button
     */
    handleHeaderNavigate() {
        this.deselectFilter();
    }
    /**
     * Deselect filter
     */
    deselectFilter() {
        this.hasSelectedFilter = false;
    }
    /**
     * Handle overflow-filters slot change
     */
    handleOverflowFiltersSlotChange() {
        this.filterEls = this.el
            .querySelector('[slot="overflow-filters"]')
            .assignedNodes();
        // create <market-row>s; and calculate how many filters have set `values`
        this.createRowsFromFilters();
        this.calculateFiltersWithSelectedValue();
    }
    /**
     * Create rows from filter slots
     */
    createRowsFromFilters() {
        var _a, _b, _c, _d;
        // no more filters, remove rows if they exist
        if (!((_a = this.filterEls) === null || _a === void 0 ? void 0 : _a.length)) {
            (_b = this.filterRowEls) === null || _b === void 0 ? void 0 : _b.forEach((filterRowEl) => {
                filterRowEl.remove();
            });
            return;
        }
        const filterRowElsByValue = ((_c = this.filterRowEls) !== null && _c !== void 0 ? _c : []).reduce((result, rowEl) => {
            result[rowEl.value] = rowEl;
            return result;
        }, {});
        const filterNames = new Set();
        const rowsByName = {};
        this.filterEls.forEach((filterEl) => {
            var _a;
            const name = filterEl.name;
            filterNames.add(name);
            const currentRowEl = filterRowElsByValue[name];
            if (currentRowEl) {
                // recycle filter row with the same name if it exists
                rowsByName[name] = currentRowEl;
            }
            else {
                // create new row element
                const newRowEl = document.createElement(getNamespacedTagFor('market-row'));
                newRowEl.variant = 'drill';
                newRowEl.interactive = true;
                newRowEl.transient = true;
                newRowEl.value = name;
                newRowEl.size = this.size;
                newRowEl.addEventListener('click', async () => {
                    await this.handleFilterSelection(newRowEl);
                });
                rowsByName[name] = newRowEl;
            }
            // create the row label
            const label = (_a = rowsByName[name]) === null || _a === void 0 ? void 0 : _a.querySelector('label');
            label === null || label === void 0 ? void 0 : label.remove();
            const filterLabelEl = filterEl.querySelector('label');
            if (filterLabelEl) {
                rowsByName[name].appendChild(filterLabelEl.cloneNode(true));
            }
            // disable the row if the filter is disabled
            if (filterEl.disabled) {
                rowsByName[name].disabled = true;
            }
            // assign the slot
            rowsByName[name].setAttribute('slot', 'filter-row');
        });
        // remove rows that should not exist anymore
        (_d = this.filterRowEls) === null || _d === void 0 ? void 0 : _d.forEach((filterRowEl) => {
            if (!filterNames.has(filterRowEl.value)) {
                filterRowEl.remove();
            }
        });
        // add the new rows to the DOM
        this.filterRowEls = [...this.filterEls].map(({ name }) => rowsByName[name]);
        this.filterRowEls.forEach((filterRowEl) => {
            filterRowEl.setAttribute('slot', 'filter-rows');
            this.el.appendChild(filterRowEl);
        });
    }
    /**
     * When a filter is selected, the popover content will show
     * the selected filter's title and list selection
     */
    async handleFilterSelection(rowEl) {
        var _a, _b, _c;
        const value = rowEl.value;
        this.hasSelectedFilter = true;
        const filterEl = this.filterEls.find((filterEl) => filterEl.name === value);
        // clone the label
        const labelEl = filterEl.querySelector('label');
        const clonedLabelEl = labelEl.cloneNode(true);
        clonedLabelEl.setAttribute('slot', 'filter-title');
        (_a = this.el.querySelector('[slot="filter-title"]')) === null || _a === void 0 ? void 0 : _a.remove();
        this.el.appendChild(clonedLabelEl);
        switch (await filterEl.getFilterType()) {
            case 'date': {
                // clone the date picker
                const datePickerEl = filterEl.querySelector(getNamespacedTagFor('market-date-picker'));
                const clonedDatePickerEl = datePickerEl.cloneNode(true);
                clonedDatePickerEl.setAttribute('slot', 'filter-options');
                clonedDatePickerEl.addEventListener('marketDateRangeChanged', (e) => {
                    this.handleDatePickerFilterSelection(e, filterEl);
                });
                (_b = this.el.querySelector('[slot="filter-options"]')) === null || _b === void 0 ? void 0 : _b.remove();
                this.el.appendChild(clonedDatePickerEl);
                break;
            }
            case 'list': {
                // clone the list
                const listEl = filterEl.querySelector(getNamespacedTagFor('market-list'));
                const clonedListEl = listEl.cloneNode(true);
                clonedListEl.setAttribute('slot', 'filter-options');
                clonedListEl.addEventListener('marketListSelectionsDidChange', (e) => {
                    this.handleListFilterSelection(e, filterEl, listEl);
                });
                clonedListEl.setAttribute('interactive', '');
                listEl.multiselect && clonedLabelEl.setAttribute('multiselect', '');
                (_c = this.el.querySelector('[slot="filter-options"]')) === null || _c === void 0 ? void 0 : _c.remove();
                this.el.appendChild(clonedListEl);
                break;
            }
        }
    }
    async handleDatePickerFilterSelection(e, filterEl) {
        const { startDate, endDate } = e.detail;
        await filterEl.__setAndEmitDatePickerValue({ startDate, endDate });
        // after selecting, recalculate what we display as feedback
        this.calculateFiltersWithSelectedValue();
    }
    async handleListFilterSelection(e, filterEl, listEl) {
        // set the filter value, then automatically deselect if the list is not multiselect
        const { currentSelectionValues } = e.detail;
        await filterEl.__setAndEmitListValue(currentSelectionValues);
        if (!listEl.multiselect) {
            this.deselectFilter();
        }
        // after selecting, recalculate what we display as feedback
        this.calculateFiltersWithSelectedValue();
    }
    /**
     * Count how many filters with selected value
     * and that count is displayed as feedback.
     */
    calculateFiltersWithSelectedValue() {
        this.filtersWithSelectedValue = [...(this.filterEls || [])].reduce((count, filterEl) => {
            const list = filterEl.querySelector(getNamespacedTagFor('market-list'));
            if (!isValueEmpty(list === null || list === void 0 ? void 0 : list.value)) {
                return count + 1;
            }
            const datePicker = filterEl.querySelector(getNamespacedTagFor('market-date-picker'));
            if (datePicker === null || datePicker === void 0 ? void 0 : datePicker.selectedStartDate) {
                return count + 1;
            }
            return count;
        }, 0);
    }
    componentDidLoad() {
        this.handleOverflowFiltersSlotChange();
    }
    render() {
        const { filtersWithSelectedValue, handleOverflowFiltersSlotChange, hasSelectedFilter, isDropdownActive, size } = this;
        const MarketButtonTagName = getNamespacedTagFor('market-button');
        const MarketDropdownTagName = getNamespacedTagFor('market-dropdown');
        const MarketFilterButtonTagName = getNamespacedTagFor('market-filter-button');
        const MarketHeaderTagName = getNamespacedTagFor('market-header');
        const MarketListTagName = getNamespacedTagFor('market-list');
        const MarketPopoverTagName = getNamespacedTagFor('market-popover');
        const MarketAccessoryTagName = getNamespacedTagFor('market-accessory');
        return (h(Host, { key: 'a0855f0de2eacc84c813febeb342ca93632969c4', class: classNames('market-filter-dropdown-menu', { 'show-options': hasSelectedFilter }) }, h(MarketDropdownTagName, { key: 'fff9d200c45bad3f954435486c01877af984c7aa', interaction: "persistent", popoverPlacement: "bottom-end" }, h(MarketFilterButtonTagName, { key: '704fa58e50c9d254387e0765ae0b5d07830255c1', active: isDropdownActive, iconOnly: true, size: size, slot: "trigger" }, filtersWithSelectedValue && h("span", { key: '62cc860fe5084000ed4effbb64faf1e78de6e613', slot: "feedback" }, filtersWithSelectedValue)), h(MarketPopoverTagName, { key: '5c8149b85ffcca282d261f21480af60940ac081d', class: "popover", slot: "popover" }, !hasSelectedFilter ? (h(MarketListTagName, { class: "filter-list", interactive: true }, h("slot", { name: "filter-rows" }))) : (h(Fragment, null, h(MarketHeaderTagName, { class: "selection-header" }, h(MarketButtonTagName, { rank: "secondary", size: "small", slot: "navigation" }, h(MarketAccessoryTagName, { slot: "icon" }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.29289 11.293C3.90237 11.6835 3.90237 12.3167 4.29289 12.7072L11.2929 19.7072L12.7071 18.293L7.41421 13.0001L19 13.0001V11.0001L7.41421 11.0001L12.7071 5.70718L11.2929 4.29297L4.29289 11.293Z" })))), h("slot", { name: "filter-title" })), h("div", { class: "filter-options-container" }, h("slot", { name: "filter-options" })))))), h("div", { key: '8d07e768be4265b1dc9fddcb830ca9d788a3da80', class: "overflow-filters" }, h("slot", { key: '4e9b383b6a4b36fc5665fd072965bfcf86c194ac', name: "overflow-filters", onSlotchange: handleOverflowFiltersSlotChange.bind(this) }))));
    }
    get el() { return getElement(this); }
};
MarketFilterDropdownMenu.style = MarketFilterDropdownMenuStyle0;

export { MarketFilterDropdownMenu as market_filter_dropdown_menu };

//# sourceMappingURL=market-filter-dropdown-menu.entry.js.map