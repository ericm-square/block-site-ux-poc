import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';

const marketTableRowCss = ":host{--transition-duration:0.2s;position:relative;display:grid;grid-column:1 / -1;grid-auto-columns:1fr;grid-auto-flow:column;border-bottom:var(--table-border-width, 1px) solid var(--table-row-border-color, var(--core-divider-20-color));transition:background-color var(--transition-duration)}@media (hover: hover){:host{}:host([interactive]:hover) ::slotted(.market-table-cell){background-color:var(--table-cell-hover-state-background-color, var(--core-fill-50-color))}}:host([header]){border-bottom:var(--table-border-width, 1px) solid var(--table-heading-border-color, var(--core-divider-10-color))}:host([footer]) ::slotted(.market-table-cell){border-bottom:none;font-weight:var(--table-footing-primary-text-font-weight, 500);font-size:var(--table-footing-primary-text-font-size, var(--core-type-semibold-20-size));line-height:var(--table-footing-primary-text-line-height, var(--core-type-semibold-20-leading))}:host([interactive]) ::slotted(.market-table-cell){cursor:pointer}:host([active]) ::slotted(.market-table-cell),:host([interactive]:active) ::slotted(.market-table-cell){background-color:var(--table-cell-pressed-state-background-color, var(--core-emphasis-40-color))}:host([interactive]:focus){outline:none;}:host([interactive]:not([disabled]):focus) ::slotted(.market-table-cell){background-color:var(--table-cell-focus-state-background-color, var(--core-fill-50-color))}:host([interactive][disabled]){pointer-events:none}:host([disabled]) ::slotted(.market-table-cell){background-color:transparent;color:var(--table-cell-disabled-state-text-color, var(--core-text-30-color));pointer-events:none}:host([nested]) ::slotted(.market-table-cell:first-of-type){padding-left:calc(\n        (\n          var(--cell-indent-level) *\n          var(--table-row-indentation-padding, 40px)\n        ) +\n        var(--table-cell-padding, 8px) +\n        var(--table-accordion-content-width, 30px)\n      )}:host([slot='custom-trigger']) ::slotted(.market-table-cell:first-of-type),:host([slot='header']) ::slotted(.market-table-cell:first-of-type),:host([slot='footer']) ::slotted(.market-table-cell:first-of-type){padding-left:var(--table-cell-padding, 8px)}:host ::slotted(.market-table-cell:first-of-type){padding-left:calc(\n      var(--table-cell-padding, 8px) +\n      (var(--cell-indent-level) * var(--table-row-indentation-padding, 40px))\n    )}";
const MarketTableRowStyle0 = marketTableRowCss;

const MarketTableRow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketTableHeaderLoaded = createEvent(this, "marketTableHeaderLoaded", 7);
        this.marketTableRowClicked = createEvent(this, "marketTableRowClicked", 7);
        this.marketTableRowStick = createEvent(this, "marketTableRowStick", 7);
        this.marketTableRowUnstick = createEvent(this, "marketTableRowUnstick", 7);
        this.marketAccordionToggled = createEvent(this, "marketAccordionToggled", 7);
        this.marketNestedRowToggled = createEvent(this, "marketNestedRowToggled", 7);
        // prevents unstick events from being fired on the slotchange before componentDidLoad
        this.componentLoaded = false;
        this.leadingIndentation = 0;
        this.stickTo = false;
        this.sticky = undefined;
        this.active = false;
        this.interactive = false;
        this.disabled = false;
        this.selected = false;
        this.header = false;
        this.footer = false;
        this.originalSlot = undefined;
        this.index = 0;
        this.tableColumns = undefined;
        this.cells = undefined;
        this.gridTemplateMain = [];
        this.gridTemplateLeft = [];
        this.gridTemplateRight = [];
        this.expanded = false;
        this.nested = false;
        this.styleDeclaration = undefined;
        this.gridTemplate = [];
        this.nestedRowToggleButton = undefined;
    }
    formNewGridTemplate() {
        this.gridTemplate = [...this.gridTemplateLeft, ...this.gridTemplateMain, ...this.gridTemplateRight];
        if (this.tableAreaLeft) {
            this.tableAreaLeft.placement = [1, this.gridTemplateLeft.length];
        }
        if (this.tableAreaMain) {
            this.tableAreaMain.placement = [this.gridTemplateLeft.length + 1, this.gridTemplateMain.length];
        }
        if (this.tableAreaRight) {
            this.tableAreaRight.placement = [
                this.gridTemplateLeft.length + this.gridTemplateMain.length + 1,
                this.gridTemplateRight.length,
            ];
        }
    }
    gridTemplateObserver(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.el.style.gridTemplateColumns = newValue.join(' ');
        }
    }
    stickyObserver(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.emitStickyEvents();
        }
    }
    columnsObserver(columns) {
        this.setCellColumnProperties(columns);
    }
    updateCellProperties(oldCellList, newCellList) {
        if (oldCellList !== newCellList) {
            this.setCellColumnProperties(this.tableColumns);
        }
    }
    updateFirstCellProperties() {
        this._setFirstCellProperties();
    }
    updateNestedRowButton() {
        if (this.nestedRowToggleButton) {
            this.nestedRowToggleButton.ariaExpanded = `${this.expanded}`;
            // We cannot access the svg from the css files in the current state,
            // so we have to do it through JS. I figured this was the best place
            // to do it since the rotation depends on expansion for now. We should
            // find a better way to access this svg in the style sheets. -lindamr
            const svgElement = this.nestedRowToggleButton.querySelector('svg');
            if (svgElement) {
                if (this.expanded) {
                    svgElement.style.transform = 'rotate(-180deg)';
                }
                else {
                    svgElement.style.transform = 'rotate(0deg)';
                }
            }
        }
    }
    updateSlottedControlCheckedValue() {
        var _a;
        (_a = this.slottedControl) === null || _a === void 0 ? void 0 : _a.setSelection(this.selected);
    }
    updateSlottedControlDisabledValue() {
        var _a;
        (_a = this.slottedControl) === null || _a === void 0 ? void 0 : _a.setDisabled(this.disabled);
    }
    handleMarketCheckboxValueChange(event) {
        // Update selected value if event is triggered by slottedControl
        if (event.target !== this.slottedControl) {
            return;
        }
        this.selected = event.detail.current;
    }
    /**
     * Sticks this row to the provided edge (position) of the table
     */
    stick(position) {
        if (position) {
            this.stickTo = position;
        }
        else if (this.header || this.footer) {
            this.sticky = true;
        }
        return Promise.resolve();
    }
    /**
     * Unsticks this row from any edge of the table
     */
    unstick() {
        this.sticky = false;
        this.stickTo = false;
        return Promise.resolve();
    }
    /**
     * **INTERNAL [do not use directly]**
     * Used by the parent table to support fixing columns to either side of the table
     */
    async _stickColumn(column, position) {
        const cell = this.el.querySelector(`[name="${column}"], [column="${column}"]`);
        if (cell) {
            await cell._stickSelf(position);
        }
        else {
            console.warn('cannot stick cell to unknown position'); // eslint-disable-line no-console
        }
    }
    /**
     * **INTERNAL [do not use directly]**
     * Used by the parent table to support fixing columns to either side of the table
     */
    async _unstickColumn(column) {
        const cell = this.el.querySelector(`[name="${column}"], [column="${column}"]`);
        if (cell) {
            await cell._unstickSelf();
        }
        else {
            console.warn('cannot unstick cell from unknown position'); // eslint-disable-line no-console
        }
    }
    /**
     * **INTERNAL [do not use directly]**
     * Sets the hidden prop on market-table-cell. Used by market-table to allow market-table-column
     * to control the hidden/visible state of its associated table cells.
     */
    _syncColumnVisibilityWithCells(columnName, hidden) {
        const cell = this.el.querySelector(`[name="${columnName}"], [column="${columnName}"]`);
        if (cell) {
            cell.hidden = hidden;
        }
        return Promise.resolve();
    }
    /**
     * **INTERNAL [do not use directly]**
     * Sets properties computed or specified on the row on the first
     * cell to keep the table rows from shifting
     */
    _setFirstCellProperties() {
        var _a, _b, _c;
        // Setting indentation on the first cell of the row to not mess
        // with the table grid
        if (((_a = this.cells) === null || _a === void 0 ? void 0 : _a.length) && this.isStylableCell(this.cells[0])) {
            (_c = (_b = this.cells[0])._updateFirstCellProperties) === null || _c === void 0 ? void 0 : _c.call(_b, this.el);
        }
        return Promise.resolve();
    }
    /**
     * Sets the leadingIndentation
     * @param leadingIndentation
     */
    setLeadingIndentation(leadingIndentation) {
        this.leadingIndentation = leadingIndentation;
        return Promise.resolve();
    }
    /**
     * Sets expanded property and emits nested row toggle event
     */
    toggleNestedRow() {
        this.expanded = !this.expanded;
        this.marketAccordionToggled.emit({ expanded: this.expanded });
        this.marketNestedRowToggled.emit({ expanded: this.expanded });
        return Promise.resolve();
    }
    /**
     * Checks type of cell to make Typescript happy about using functions that are only on
     * HTMLMarketTableCellElement and not HTMLMarketTableColumnElement
     * @param cell
     * @returns
     */
    isStylableCell(cell) {
        return (cell._updateColumnRelatedProperties !== undefined &&
            cell._updateFirstCellProperties !== undefined);
    }
    setCellColumnProperties(columns) {
        if (this.cells && columns && columns.length > 0) {
            this.cells.forEach((cell, i) => {
                if (this.isStylableCell(cell)) {
                    const column = columns[i];
                    cell._updateColumnRelatedProperties(column);
                }
            });
        }
    }
    emitStickyEvents() {
        let position;
        if (this.stickTo) {
            position = this.stickTo;
        }
        else if (this.header) {
            position = 'top';
        }
        else if (this.footer) {
            position = 'bottom';
        }
        if (this.sticky || this.stickTo) {
            // emit a stick event
            this.marketTableRowStick.emit({
                position,
                index: this.index,
            });
        }
        else if (this.componentLoaded) {
            // Emit an unstick event
            this.marketTableRowUnstick.emit({
                position,
                index: this.index,
            });
        }
    }
    componentWillLoad() {
        // setting row properties based on whether row is using a named slot
        this.originalSlot = this.el.slot;
        this.header = this.originalSlot === 'header';
        this.footer = this.originalSlot === 'footer';
        // prettier wants (typeof this.cells)[0] but that change seems wrong
        // prettier-ignore
        this.cells = this.el.querySelectorAll(getNamespacedTagFor('market-table-cell'));
    }
    handleSlotChange() {
        this.cells = this.el.querySelectorAll(`${getNamespacedTagFor('market-table-cell')}, ${getNamespacedTagFor('market-table-column')}`);
        // If this is our header row, meaning we have column children, then emit an
        // event that sends the columns to the table parent
        if (this.header) {
            this.marketTableHeaderLoaded.emit({
                columns: this.el.querySelectorAll(getNamespacedTagFor('market-table-column')),
            });
        }
        this.emitStickyEvents();
    }
    _getMarketRowElement(element) {
        return element.querySelector(getNamespacedTagFor('market-table-row'));
    }
    _addCaretButtonToFirstCell() {
        if (this.cells && this.cells[0]) {
            this.nestedRowToggleButton = document.createElement('button');
            Object.assign(this.nestedRowToggleButton, {
                slot: 'nested-row-indicator',
                type: 'button',
                ariaExpanded: `${this.expanded}`,
                onclick: () => this.toggleNestedRow(),
            });
            this.nestedRowToggleButton.innerHTML = `<svg class="caret" width="14" height="8" viewBox="0 0 14 8" fill="none" style="transition-duration:300ms;" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.70715 7.70711C7.31663 8.09763 6.68346 8.09763 6.29294 7.70711L0.29294 1.70711L1.70715 0.292892L7.00005 5.58579L12.2929 0.292893L13.7072 1.70711L7.70715 7.70711Z"
            fill="currentColor"
          />
        </svg>`;
            // Get the first table cell child element and append the this.nestedRowToggleButtonElement to it. Because it has the nested-row-indicator slot, it should appear in the correct place
            this.cells[0].append(this.nestedRowToggleButton);
        }
    }
    _registerSlottedControl() {
        this.slottedControl = this.el.querySelector([
            `[slot="control"] ${getNamespacedTagFor('market-checkbox')}`,
            `[slot="control"] ${getNamespacedTagFor('market-toggle')}`,
        ].join(','));
        if (this.slottedControl) {
            this.slottedControl.setDisabled(this.disabled);
            this.slottedControl.setSelection(this.selected);
        }
    }
    componentDidRender() {
        var _a, _b;
        // Get accordion parent
        const accordionElement = this.el.closest(getNamespacedTagFor('market-accordion-item'));
        if (accordionElement) {
            let parentRow;
            if (this.el.slot === 'custom-trigger') {
                // If current row has nested row, we need to look a level above for
                // the correct indentation.
                const parentAccordionElement = (_a = accordionElement.parentElement) === null || _a === void 0 ? void 0 : _a.closest(getNamespacedTagFor('market-accordion-item'));
                // If there is a parent accordion element, find the trigger row
                // to get previous level indentation and set the current one.
                // Otherwise, the current row is at top level and indentaion will
                // remain as 0.
                if (parentAccordionElement) {
                    parentRow = [...parentAccordionElement.children].find((child) => child.slot === 'custom-trigger');
                }
            }
            else {
                // Find the the trigger row within same level to set indentation
                parentRow = [...accordionElement.children].find((child) => child.slot === 'custom-trigger');
            }
            // Set indentation
            this.leadingIndentation = parentRow ? ((_b = parentRow.leadingIndentation) !== null && _b !== void 0 ? _b : 0) + 1 : 0;
        }
        // Set indentation on the first cell of the row to not mess
        // with the table grid
        this._setFirstCellProperties();
    }
    componentDidLoad() {
        this.componentLoaded = true;
        if (this.el.slot === 'custom-trigger') {
            // Add caret button
            this._addCaretButtonToFirstCell();
            // If accordion is expanded when component is loaded, we have to
            // we have to make sure the caret is facing the correct way
            const svgElement = this.nestedRowToggleButton.querySelector('svg');
            if (svgElement && this.expanded) {
                svgElement.style.transform = 'rotate(-180deg)';
            }
        }
    }
    handleClick(e) {
        const ignoredElementTagNames = [
            getNamespacedTagFor('market-accessory'),
            getNamespacedTagFor('market-button'),
            getNamespacedTagFor('market-button-dropdown'),
            getNamespacedTagFor('market-checkbox'),
            getNamespacedTagFor('market-link'),
            getNamespacedTagFor('market-toggle'),
            'button',
            'a',
            // add more interactive element tag names here
        ];
        // If the element clicked was one of the ignoredElementTagNames or anything inside of them,
        // do not trigger marketTableRowClicked
        const shouldIgnoreClick = ignoredElementTagNames.some((tagname) => e.target.closest(tagname));
        if (shouldIgnoreClick) {
            return;
        }
        if (this.interactive) {
            this.marketTableRowClicked.emit();
        }
    }
    handleKeydown(e) {
        // don't intercept keydown of descendant elements
        // e.g. when typing into nested input fields (gross)
        if (e.target !== this.el) {
            return;
        }
        switch (e.key) {
            case 'Enter':
                this.handleClick(e);
                break;
            case ' ':
                this.handleClick(e);
                e.preventDefault(); // spacebar should not scroll page
                break;
        }
    }
    render() {
        const { disabled, footer, gridTemplateLeft, gridTemplateMain, gridTemplateRight, header, interactive, selected, slottedControl, } = this;
        const MarketTableAreaTagName = getNamespacedTagFor('market-table-area');
        return (h(Host, { key: 'b21f7e4205a1bdeedb0e5b954cca59fa929759b6', "aria-selected": slottedControl ? Boolean(selected).toString() : null, class: "market-table-row", role: "row", tabindex: interactive && !disabled ? '0' : null, header: header, footer: footer, onClick: (e) => this.handleClick(e), onKeydown: (e) => this.handleKeydown(e) }, h(MarketTableAreaTagName, { key: '1ec156add1e9edfbc896c2bf4b4ed2dec6abc853', orientation: "vertical", "stick-to": "left", gridTemplate: gridTemplateLeft, ref: (el) => (this.tableAreaLeft = el) }, h("slot", { key: 'cc0b2f616a2ce5ee5cff172f71cfa061c5a19d39', name: "sticky-left" })), h(MarketTableAreaTagName, { key: '6c16c71570af888f249ed17e208cf7ba529ed408', orientation: "vertical", gridTemplate: gridTemplateMain, ref: (el) => (this.tableAreaMain = el), active: true }, h("slot", { key: '3fa9a13284967ade7ca15968a9be73b097c2934e', name: "control", onSlotchange: () => this._registerSlottedControl() }), h("slot", { key: '3ce80946bd17ff03315262bff77d728f92fc9fe0', onSlotchange: () => this.handleSlotChange() })), h(MarketTableAreaTagName, { key: '8c37a017089cc05a86be2228bdb56d3ce7da6d5b', orientation: "vertical", "stick-to": "right", gridTemplate: gridTemplateRight, ref: (el) => (this.tableAreaRight = el) }, h("slot", { key: '4144f5e42d7371d60733da1d8cc584a16f6d9eb0', name: "sticky-right" }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "gridTemplateMain": ["formNewGridTemplate"],
        "gridTemplateLeft": ["formNewGridTemplate"],
        "gridTemplateRight": ["formNewGridTemplate"],
        "gridTemplate": ["gridTemplateObserver"],
        "stickTo": ["stickyObserver"],
        "sticky": ["stickyObserver"],
        "tableColumns": ["columnsObserver"],
        "cells": ["updateCellProperties"],
        "leadingIndentation": ["updateFirstCellProperties"],
        "expanded": ["updateNestedRowButton"],
        "selected": ["updateSlottedControlCheckedValue"],
        "disabled": ["updateSlottedControlDisabledValue"]
    }; }
};
MarketTableRow.style = MarketTableRowStyle0;

export { MarketTableRow as market_table_row };

//# sourceMappingURL=market-table-row.entry.js.map