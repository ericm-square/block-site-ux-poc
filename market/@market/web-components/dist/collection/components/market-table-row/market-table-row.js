import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../utils/namespace";
/**
 * @slot - Default slot for all cells
 * @slot control - Intended for use with a market table cell or market table column that contain a control element.
 */
export class MarketTableRow {
    constructor() {
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
            default:
                break;
        }
    }
    render() {
        const { disabled, footer, gridTemplateLeft, gridTemplateMain, gridTemplateRight, header, interactive, selected, slottedControl, } = this;
        const MarketTableAreaTagName = getNamespacedTagFor('market-table-area');
        return (h(Host, { key: 'b21f7e4205a1bdeedb0e5b954cca59fa929759b6', "aria-selected": slottedControl ? Boolean(selected).toString() : null, class: "market-table-row", role: "row", tabindex: interactive && !disabled ? '0' : null, header: header, footer: footer, onClick: (e) => this.handleClick(e), onKeydown: (e) => this.handleKeydown(e) }, h(MarketTableAreaTagName, { key: '1ec156add1e9edfbc896c2bf4b4ed2dec6abc853', orientation: "vertical", "stick-to": "left", gridTemplate: gridTemplateLeft, ref: (el) => (this.tableAreaLeft = el) }, h("slot", { key: 'cc0b2f616a2ce5ee5cff172f71cfa061c5a19d39', name: "sticky-left" })), h(MarketTableAreaTagName, { key: '6c16c71570af888f249ed17e208cf7ba529ed408', orientation: "vertical", gridTemplate: gridTemplateMain, ref: (el) => (this.tableAreaMain = el), active: true }, h("slot", { key: '3fa9a13284967ade7ca15968a9be73b097c2934e', name: "control", onSlotchange: () => this._registerSlottedControl() }), h("slot", { key: '3ce80946bd17ff03315262bff77d728f92fc9fe0', onSlotchange: () => this.handleSlotChange() })), h(MarketTableAreaTagName, { key: '8c37a017089cc05a86be2228bdb56d3ce7da6d5b', orientation: "vertical", "stick-to": "right", gridTemplate: gridTemplateRight, ref: (el) => (this.tableAreaRight = el) }, h("slot", { key: '4144f5e42d7371d60733da1d8cc584a16f6d9eb0', name: "sticky-right" }))));
    }
    static get is() { return "market-table-row"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-table-row.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-table-row.css"]
        };
    }
    static get properties() {
        return {
            "leadingIndentation": {
                "type": "number",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Optional: Level of leading indentation\nThis will be multiplied by the default indentation size (40px) for uniform indentation\nlevels"
                },
                "attribute": "leading-indentation",
                "reflect": true,
                "defaultValue": "0"
            },
            "stickTo": {
                "type": "any",
                "mutable": true,
                "complexType": {
                    "original": "false | 'top' | 'bottom'",
                    "resolved": "\"bottom\" | \"top\" | boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Optional: The edge of the table to fix this row to."
                },
                "attribute": "stick-to",
                "reflect": true,
                "defaultValue": "false"
            },
            "sticky": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Optional: When present, can be used instead of `stickTo` in combination\nwith `header` or `footer` to determine the edge of the table to stick this\nrow to. (`header` elements with `[sticky]` will be attached to the top, and\n`footer` elements to the bottom)"
                },
                "attribute": "sticky",
                "reflect": true
            },
            "active": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the row is currently active."
                },
                "attribute": "active",
                "reflect": true,
                "defaultValue": "false"
            },
            "interactive": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether or not the row is interactive. Results in row receiving\nhover and active styling when hovered/clicked."
                },
                "attribute": "interactive",
                "reflect": true,
                "defaultValue": "false"
            },
            "disabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the row is disabled."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "selected": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the row is selected. Used by control element."
                },
                "attribute": "selected",
                "reflect": true,
                "defaultValue": "false"
            },
            "header": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Gives this row header styling"
                },
                "attribute": "header",
                "reflect": true,
                "defaultValue": "false"
            },
            "footer": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Gives this row footer styling"
                },
                "attribute": "footer",
                "reflect": true,
                "defaultValue": "false"
            },
            "originalSlot": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The slot this row was originally placed in"
                },
                "attribute": "original-slot",
                "reflect": false
            },
            "index": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "**INTERNAL [do not use directly]**\nThe order of this row in the DOM"
                },
                "attribute": "index",
                "reflect": false,
                "defaultValue": "0"
            },
            "tableColumns": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Array<HTMLMarketTableColumnElement>",
                    "resolved": "HTMLMarketTableColumnElement[]",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        },
                        "HTMLMarketTableColumnElement": {
                            "location": "global",
                            "id": "global::HTMLMarketTableColumnElement"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "**INTERNAL [do not use directly]**\nA list of the market-table-column elements, set from the parent table so\nwe can assign this row's cells some properties based on the columns"
                }
            },
            "cells": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "NodeListOf<TCell>",
                    "resolved": "NodeListOf<TCell>",
                    "references": {
                        "NodeListOf": {
                            "location": "global",
                            "id": "global::NodeListOf"
                        },
                        "TCell": {
                            "location": "local",
                            "path": "/data/app/kochiku-worker/shared/build-partition/squareup/market/web/web-components/src/components/market-table-row/market-table-row.tsx",
                            "id": "src/components/market-table-row/market-table-row.tsx::TCell"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "**INTERNAL [do not use directly]**\nThis row's slotted market-table-cell elements"
                }
            },
            "gridTemplateMain": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Array<string>",
                    "resolved": "string[]",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "**INTERNAL [do not use directly]**\nUsed to set the CSS grid template for the main column group (market-table-area)\nin the row. Set by the parent table element"
                },
                "defaultValue": "[]"
            },
            "gridTemplateLeft": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Array<string>",
                    "resolved": "string[]",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "**INTERNAL [do not use directly]**\nUsed to set the CSS grid template for the fixed left column group (market-table-area)\nin the row. Set by the parent table element"
                },
                "defaultValue": "[]"
            },
            "gridTemplateRight": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Array<string>",
                    "resolved": "string[]",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "**INTERNAL [do not use directly]**\nUsed to set the CSS grid template for the fixed right column group (market-table-area)\nin the row. Set by the parent table element"
                },
                "defaultValue": "[]"
            },
            "expanded": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "**INTERNAL [do not use directly]**\nUsed to set aria-expanded on the nested button for animation"
                },
                "attribute": "expanded",
                "reflect": false,
                "defaultValue": "false"
            },
            "nested": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Used to determine if the table has accordion rows. When true,\nit will add extra spacing at the beginning of the row. This will\nkeep the row's contents aligned with the accordion rows. This is\nset from the market-table component.\n\nThis property can be overriden when the content does not need\nthe extra accordion spacing."
                },
                "attribute": "nested",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "styleDeclaration": {},
            "gridTemplate": {},
            "nestedRowToggleButton": {}
        };
    }
    static get events() {
        return [{
                "method": "marketTableHeaderLoaded",
                "name": "marketTableHeaderLoaded",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "**INTERNAL [do not use directly]**\nIf this is a header row with column children, emit an event when this row loads\nso the parent table can read the column data"
                },
                "complexType": {
                    "original": "{ columns: NodeListOf<HTMLMarketTableColumnElement> }",
                    "resolved": "{ columns: NodeListOf<HTMLMarketTableColumnElement>; }",
                    "references": {
                        "NodeListOf": {
                            "location": "global",
                            "id": "global::NodeListOf"
                        },
                        "HTMLMarketTableColumnElement": {
                            "location": "global",
                            "id": "global::HTMLMarketTableColumnElement"
                        }
                    }
                }
            }, {
                "method": "marketTableRowClicked",
                "name": "marketTableRowClicked",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever an interactive row is clicked."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "marketTableRowStick",
                "name": "marketTableRowStick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when this row is stuck to a table edge\nCan be fired when stick-to or sticky changes, the .stick() method is called directly\nor when this row is first rendered or slotted"
                },
                "complexType": {
                    "original": "{\n    position: 'left' | 'right';\n    index: number;\n  }",
                    "resolved": "{ position: \"left\" | \"right\"; index: number; }",
                    "references": {}
                }
            }, {
                "method": "marketTableRowUnstick",
                "name": "marketTableRowUnstick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when this row is unstuck from a table edge\nCan be fired when stick-to or sticky changes, the .unstick() method is called directly\nor when this row is first rendered or slotted"
                },
                "complexType": {
                    "original": "{\n    position: 'left' | 'right';\n    index: number;\n  }",
                    "resolved": "{ position: \"left\" | \"right\"; index: number; }",
                    "references": {}
                }
            }, {
                "method": "marketAccordionToggled",
                "name": "marketAccordionToggled",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the nested row button is toggled"
                },
                "complexType": {
                    "original": "{ expanded: boolean }",
                    "resolved": "{ expanded: boolean; }",
                    "references": {}
                }
            }, {
                "method": "marketNestedRowToggled",
                "name": "marketNestedRowToggled",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the nested row button is toggled"
                },
                "complexType": {
                    "original": "{ expanded: boolean }",
                    "resolved": "{ expanded: boolean; }",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "stick": {
                "complexType": {
                    "signature": "(position?: 'top' | 'bottom') => Promise<void>",
                    "parameters": [{
                            "name": "position",
                            "type": "\"top\" | \"bottom\"",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sticks this row to the provided edge (position) of the table",
                    "tags": []
                }
            },
            "unstick": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Unsticks this row from any edge of the table",
                    "tags": []
                }
            },
            "_stickColumn": {
                "complexType": {
                    "signature": "(column: string, position: 'left' | 'right') => Promise<void>",
                    "parameters": [{
                            "name": "column",
                            "type": "string",
                            "docs": ""
                        }, {
                            "name": "position",
                            "type": "\"left\" | \"right\"",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLMarketTableCellElement": {
                            "location": "global",
                            "id": "global::HTMLMarketTableCellElement"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "**INTERNAL [do not use directly]**\nUsed by the parent table to support fixing columns to either side of the table",
                    "tags": []
                }
            },
            "_unstickColumn": {
                "complexType": {
                    "signature": "(column: string) => Promise<void>",
                    "parameters": [{
                            "name": "column",
                            "type": "string",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLMarketTableCellElement": {
                            "location": "global",
                            "id": "global::HTMLMarketTableCellElement"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "**INTERNAL [do not use directly]**\nUsed by the parent table to support fixing columns to either side of the table",
                    "tags": []
                }
            },
            "_syncColumnVisibilityWithCells": {
                "complexType": {
                    "signature": "(columnName: any, hidden: any) => Promise<void>",
                    "parameters": [{
                            "name": "columnName",
                            "type": "any",
                            "docs": ""
                        }, {
                            "name": "hidden",
                            "type": "any",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLMarketTableCellElement": {
                            "location": "global",
                            "id": "global::HTMLMarketTableCellElement"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "**INTERNAL [do not use directly]**\nSets the hidden prop on market-table-cell. Used by market-table to allow market-table-column\nto control the hidden/visible state of its associated table cells.",
                    "tags": []
                }
            },
            "_setFirstCellProperties": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "**INTERNAL [do not use directly]**\nSets properties computed or specified on the row on the first\ncell to keep the table rows from shifting",
                    "tags": []
                }
            },
            "setLeadingIndentation": {
                "complexType": {
                    "signature": "(leadingIndentation: number) => Promise<void>",
                    "parameters": [{
                            "name": "leadingIndentation",
                            "type": "number",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sets the leadingIndentation",
                    "tags": [{
                            "name": "param",
                            "text": "leadingIndentation"
                        }]
                }
            },
            "toggleNestedRow": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sets expanded property and emits nested row toggle event",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "gridTemplateMain",
                "methodName": "formNewGridTemplate"
            }, {
                "propName": "gridTemplateLeft",
                "methodName": "formNewGridTemplate"
            }, {
                "propName": "gridTemplateRight",
                "methodName": "formNewGridTemplate"
            }, {
                "propName": "gridTemplate",
                "methodName": "gridTemplateObserver"
            }, {
                "propName": "stickTo",
                "methodName": "stickyObserver"
            }, {
                "propName": "sticky",
                "methodName": "stickyObserver"
            }, {
                "propName": "tableColumns",
                "methodName": "columnsObserver"
            }, {
                "propName": "cells",
                "methodName": "updateCellProperties"
            }, {
                "propName": "leadingIndentation",
                "methodName": "updateFirstCellProperties"
            }, {
                "propName": "expanded",
                "methodName": "updateNestedRowButton"
            }, {
                "propName": "selected",
                "methodName": "updateSlottedControlCheckedValue"
            }, {
                "propName": "disabled",
                "methodName": "updateSlottedControlDisabledValue"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketCheckboxValueChange",
                "method": "handleMarketCheckboxValueChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketToggleChange",
                "method": "handleMarketCheckboxValueChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-table-row.js.map
