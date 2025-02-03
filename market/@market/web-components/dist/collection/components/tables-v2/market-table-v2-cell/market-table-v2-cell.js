import { Host, h } from "@stencil/core";
import { isMarketCheckbox } from "../../market-checkbox/types";
import { isMarketTableV2ControlElement } from "./types";
/**
 * @slot - Default slot for content.
 * @slot control - Intended for use with a form control element.
 * @slot leading-accessory - Intended for use with a leading accessory.
 * @slot trailing-accessory - Intended for use with a trailing accessory.
 */
export class MarketTableV2Cell {
    constructor() {
        this.active = false;
        this.align = undefined;
        this.caret = undefined;
        this.caretAriaLabelExpanded = 'Group of rows is expanded: click to collapse';
        this.caretAriaLabelCollapsed = 'Group of rows is collapsed: click to expand';
        this.disabled = false;
        this.indent = undefined;
        this.interactive = false;
        this.nowrap = false;
        this.selected = 'false';
        this.sticky = undefined;
        this.sortable = undefined;
        this.sortAriaLabelAscending = 'Sorted ascending: click to sort descending';
        this.sortAriaLabelDescending = 'Sorted descending: click to sort ascending';
        this.sortAriaLabelNone = 'Not sorted: click to sort ascending';
        this.sortOrder = 'none';
        this.sortStrategy = undefined;
        this.sortStrategyFormat = undefined;
        this.valign = undefined;
    }
    onKeydown(e) {
        const { target, key } = e;
        const { el, disabled, interactive } = this;
        if (disabled)
            return;
        if (!interactive)
            return;
        if (target !== el)
            return;
        if (key === 'Enter' || key === ' ') {
            e.preventDefault();
            el.click();
        }
    }
    async onMarketControlSelectionChange(e) {
        const { control } = this;
        const { target, detail } = e;
        // return if the target wasn't this cell's control
        if (target !== control)
            return;
        const selected = detail.current ? 'true' : 'false';
        await this.setSelected(selected);
    }
    /**
     * @internal
     * Sets selection on the cell and propagates value to its slotted control
     */
    async setSelected(selected, { silent = false } = {}) {
        const { marketInternalTableV2CellSelectionChange, selected: prevSelected } = this;
        // return if no values have changed
        if (prevSelected === selected)
            return Promise.resolve();
        // fire the internal selection event
        if (!silent) {
            marketInternalTableV2CellSelectionChange.emit({
                current: selected,
                previous: prevSelected,
            });
        }
        // save the state
        this.selected = selected;
        await this.setControlSelected(selected);
        return Promise.resolve();
    }
    async setControlSelected(selected) {
        const { control } = this;
        if (!control)
            return;
        await control.setSelection(selected === 'true', { silent: true });
        if (isMarketCheckbox(control))
            await control.setIndeterminate(selected === 'indeterminate');
    }
    getTabIndex() {
        const { disabled, interactive } = this;
        return interactive && !disabled ? '0' : null;
    }
    getStyles() {
        const { indent } = this;
        if (!indent || indent < 1)
            return {};
        return { '--table-cell-indent-level': indent.toString() };
    }
    getSortButtonLabel() {
        const { sortOrder, sortAriaLabelAscending, sortAriaLabelDescending, sortAriaLabelNone } = this;
        switch (sortOrder) {
            case 'ascending':
                return sortAriaLabelAscending;
            case 'descending':
                return sortAriaLabelDescending;
            default:
                return sortAriaLabelNone;
        }
    }
    onCaretClick(e) {
        e.stopPropagation();
        this.marketTableV2CellCaretClicked.emit();
    }
    onSortClick() {
        const { sortOrder, marketTableV2CellSortClicked } = this;
        const previous = sortOrder || 'none';
        const current = previous === 'ascending' ? 'descending' : 'ascending';
        const { defaultPrevented } = marketTableV2CellSortClicked.emit({
            current,
            previous,
        });
        if (!defaultPrevented)
            this.sortOrder = current;
    }
    async syncControlState() {
        const { el, selected } = this;
        const control = [...el.children].find((child) => child.slot === 'control');
        if (isMarketTableV2ControlElement(control)) {
            this.control = control;
            if (selected)
                await this.setControlSelected(selected);
        }
    }
    async connectedCallback() {
        await this.syncControlState();
    }
    renderCaretButton() {
        return (
        // Note: We would ideally also have aria-expanded and aria-controls attributes; however, this is not currently
        // possible (as of Mar 2024) due to the lack of support for referencing elements across shadow DOMs. Browser
        // support work is ongoing in this area, but it is insufficient at this time. We should revisit in the future.
        h("button", { class: "caret-button", "aria-label": this.caret === 'down' ? this.caretAriaLabelCollapsed : this.caretAriaLabelExpanded, onClick: (e) => this.onCaretClick(e) }, h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.70715 11.7071C8.31663 12.0976 7.68346 12.0976 7.29294 11.7071L1.29294 5.70711L2.70715 4.29289L8.00005 9.58579L13.2929 4.29289L14.7072 5.70711L8.70715 11.7071Z" }))));
    }
    renderSortAscendingSvg() {
        return (h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.52861 2.86177C7.78895 2.60142 8.21107 2.60142 8.47141 2.86177L13.1381 7.52843L12.1953 8.47124L8.66668 4.94265L8.66668 12.6665H7.33334V4.94265L3.80475 8.47124L2.86194 7.52843L7.52861 2.86177Z" })));
    }
    renderSortDecendingSvg() {
        return (h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.47129 13.1382C8.21094 13.3986 7.78883 13.3986 7.52848 13.1382L2.86182 8.47157L3.80463 7.52876L7.33322 11.0574L7.33322 3.3335L8.66655 3.3335L8.66655 11.0574L12.1952 7.52876L13.138 8.47157L8.47129 13.1382Z" })));
    }
    renderSortNoneSvg() {
        return (h("svg", { width: "16", height: "17", viewBox: "0 0 16 17", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.8633 14.31L8.19664 11.6434L9.1433 10.7034L10.67 12.23L10.67 3.17002L12.0033 3.17002L12.0033 12.23L13.53 10.7034L14.47 11.6434L11.8033 14.31C11.5433 14.57 11.1233 14.57 10.8633 14.31ZM2.46997 6.30338L1.52997 5.36338L4.19664 2.69671C4.45664 2.43671 4.87664 2.43671 5.13664 2.69671L7.8033 5.36338L6.8633 6.30338L5.33664 4.77671L5.33664 13.8367L4.0033 13.8367L4.0033 4.77671L2.46997 6.30338Z" })));
    }
    renderSortSvg() {
        switch (this.sortOrder) {
            case 'ascending':
                return this.renderSortAscendingSvg();
            case 'descending':
                return this.renderSortDecendingSvg();
            default:
                return this.renderSortNoneSvg();
        }
    }
    render() {
        var _a;
        const { el, caret, sortable, sortOrder } = this;
        return (h(Host, { key: '2d295a766cd4cb793b862dd91fc75268c2a87dd4', role: (_a = el.role) !== null && _a !== void 0 ? _a : 'cell', tabindex: this.getTabIndex(), style: this.getStyles(), class: "market-table-v2-cell", "sort-order": sortOrder !== 'none' ? sortOrder : null, "aria-sort": sortOrder !== 'none' ? sortOrder : null }, h("div", { key: '906e275506a64e166a30803cfc82c62f777ed6d3', class: "content-outer" }, caret && this.renderCaretButton(), h("slot", { key: 'ac57aa86c019e676af0bb682c62566edafd49ac9', name: "control", onSlotchange: () => this.syncControlState() }), h("div", { key: '2a4230ff9f54efa8ee8cee84520d33dd825dde2c', class: "content-inner" }, h("slot", { key: '99ed0e6392d5578d91f4241e327ff35b94f0b399', name: "leading-accessory" }), h("div", { key: 'bfd35740621d1e2ae479b6a0f04f6f4d0cbe44bf', class: "default-slot" }, !sortable && h("slot", { key: 'dd7101744adee33b83c23edd386ae2f5569a3b08' }), sortable && (h("button", { key: 'b50edf4b821d5d7b558403069525a2094c7074fb', class: "sort-button", "aria-describedby": "sort-button-label", onClick: () => this.onSortClick() }, h("slot", { key: '6b025eba66325233948b4049c8f4488811a5bd56' }), this.renderSortSvg(), h("span", { key: 'd3fbf14b0b8cce540086ad7085ae39fc534c659d', id: "sort-button-label", hidden: true }, this.getSortButtonLabel())))), h("slot", { key: 'ff30de7fc804ca8308dc6a997c22449fdc14307b', name: "trailing-accessory" })))));
    }
    static get is() { return "market-table-v2-cell"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-table-v2-cell.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-table-v2-cell.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "Whether the cell is currently active."
                },
                "attribute": "active",
                "reflect": true,
                "defaultValue": "false"
            },
            "align": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'left' | 'center' | 'right'",
                    "resolved": "\"center\" | \"left\" | \"right\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sets the horizontal alignment. When not set,\nalignment is inherited from an ancestor row or table."
                },
                "attribute": "align",
                "reflect": true
            },
            "caret": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'up' | 'down'",
                    "resolved": "\"down\" | \"up\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Displays a leading clickable caret;\nintended to be used in conjunction with\n`<market-table-v2-group>` to support nested rows."
                },
                "attribute": "caret",
                "reflect": true
            },
            "caretAriaLabelExpanded": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Translated label for the collapse action when group is currently expanded (for screen reader users)"
                },
                "attribute": "caret-aria-label-expanded",
                "reflect": false,
                "defaultValue": "'Group of rows is expanded: click to collapse'"
            },
            "caretAriaLabelCollapsed": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Translated label for the expand action when group is currently collapsed (for screen reader users)"
                },
                "attribute": "caret-aria-label-collapsed",
                "reflect": false,
                "defaultValue": "'Group of rows is collapsed: click to expand'"
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
                    "text": "Whether the cell is currently disabled."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "indent": {
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
                    "text": "Indentation level"
                },
                "attribute": "indent",
                "reflect": true
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
                    "text": "Whether the cell is interactive, which results in hover, focus, & pressed styles."
                },
                "attribute": "interactive",
                "reflect": true,
                "defaultValue": "false"
            },
            "nowrap": {
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
                    "text": "Set this to `true` to force cell text onto one line.\nMay cause horizontal scrolling in the ancestor table."
                },
                "attribute": "nowrap",
                "reflect": true,
                "defaultValue": "false"
            },
            "selected": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "TMarketTableV2Selection",
                    "resolved": "\"false\" | \"indeterminate\" | \"true\"",
                    "references": {
                        "TMarketTableV2Selection": {
                            "location": "import",
                            "path": "../market-table-v2/types",
                            "id": "src/components/tables-v2/market-table-v2/types.ts::TMarketTableV2Selection"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the cell is selected.\nRelevant if the cell has a slotted control."
                },
                "attribute": "selected",
                "reflect": false,
                "defaultValue": "'false'"
            },
            "sticky": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'left' | 'right'",
                    "resolved": "\"left\" | \"right\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Makes a cell \"stick\" to the left or right of its parent row.\nRequires the row to be sized wider than the table to enable horizontal scrolling."
                },
                "attribute": "sticky",
                "reflect": true
            },
            "sortable": {
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
                    "text": "When the cell is in a table header row, this prop enables sorting by this cell's column."
                },
                "attribute": "sortable",
                "reflect": true
            },
            "sortAriaLabelAscending": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Translated label for the icon indicating an ascending sort (for screen reader users)"
                },
                "attribute": "sort-aria-label-ascending",
                "reflect": false,
                "defaultValue": "'Sorted ascending: click to sort descending'"
            },
            "sortAriaLabelDescending": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Translated label for the icon indicating a descending sort (for screen reader users)"
                },
                "attribute": "sort-aria-label-descending",
                "reflect": false,
                "defaultValue": "'Sorted descending: click to sort ascending'"
            },
            "sortAriaLabelNone": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Translated label for the icon indicating no sort applied (for screen reader users)"
                },
                "attribute": "sort-aria-label-none",
                "reflect": false,
                "defaultValue": "'Not sorted: click to sort ascending'"
            },
            "sortOrder": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "TMarketTableV2SortOrder",
                    "resolved": "\"ascending\" | \"descending\" | \"none\"",
                    "references": {
                        "TMarketTableV2SortOrder": {
                            "location": "import",
                            "path": "../market-table-v2/types",
                            "id": "src/components/tables-v2/market-table-v2/types.ts::TMarketTableV2SortOrder"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When `sortable` is `true`, this prop sets the `aria-sort` attribute\nand displays an arrow in the correct sort direction."
                },
                "attribute": "sort-order",
                "reflect": false,
                "defaultValue": "'none'"
            },
            "sortStrategy": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "TMarketTableV2SortStrategy",
                    "resolved": "\"datetime\" | \"number\" | \"string\" | ((attrs: { rowA: HTMLMarketTableV2RowElement; rowB: HTMLMarketTableV2RowElement; order: TMarketTableV2SortOrder; column: number; format?: string; }) => number)",
                    "references": {
                        "TMarketTableV2SortStrategy": {
                            "location": "import",
                            "path": "../market-table-v2/types",
                            "id": "src/components/tables-v2/market-table-v2/types.ts::TMarketTableV2SortStrategy"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When `sortable` is `true`, this prop specifies the sorting strategy.\n- `'string'`: sorts rows alphabetically (case-insensitive) by the text content of the cell (default)\n- `'number'`: sorts rows numerically using [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) to parse the cell content\n- `'datetime'`: sorts rows chronologically using [date-fns `parse()`](https://date-fns.org/v3.3.1/docs/parse) method to parse the cell content. This strategy requires specifying a format in the cell's `sortStrategyFormat` prop; see accepted formats [here](https://date-fns.org/v3.3.1/docs/parse)\n- `Function`: a custom callback function to compare rows, similar to the `compareFn` in [`Array.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). The following arguments are provided to the function:\n  - `rowA`: the first row for comparison\n  - `rowB`: the second row for comparison\n  - `order`: the direction of the sort, either `ascending` or `descending`\n  - `index`: the index of the column being sorted on\n\n  The callback function should return a number whose sign indicates the relative order of the two elements:\n  - negative if `rowA` is less than `rowB`\n  - positive if `rowA` is greater than `rowB`\n  - zero if `rowA` & `rowB` are equal"
                },
                "attribute": "sort-strategy",
                "reflect": false
            },
            "sortStrategyFormat": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When setting `sortStrategy` to `\"datetime\"`, this prop is required to specify the format.\nSee accepted formats [here](https://date-fns.org/v3.3.1/docs/parse)"
                },
                "attribute": "sort-strategy-format",
                "reflect": false
            },
            "valign": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'bottom' | 'middle' | 'top'",
                    "resolved": "\"bottom\" | \"middle\" | \"top\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sets the vertical alignment. When not set,\nalignment is inherited from an ancestor row or table."
                },
                "attribute": "valign",
                "reflect": true
            }
        };
    }
    static get events() {
        return [{
                "method": "marketTableV2CellCaretClicked",
                "name": "marketTableV2CellCaretClicked",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the caret is clicked"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "marketTableV2CellSortClicked",
                "name": "marketTableV2CellSortClicked",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when clicked when sortable is `true`"
                },
                "complexType": {
                    "original": "MarketTableV2SortOrderChangeDetail",
                    "resolved": "{ current: TMarketTableV2SortOrder; previous: TMarketTableV2SortOrder; }",
                    "references": {
                        "MarketTableV2SortOrderChangeDetail": {
                            "location": "import",
                            "path": "../market-table-v2/types",
                            "id": "src/components/tables-v2/market-table-v2/types.ts::MarketTableV2SortOrderChangeDetail"
                        }
                    }
                }
            }, {
                "method": "marketInternalTableV2CellSelectionChange",
                "name": "marketInternalTableV2CellSelectionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "Fired when the cell selection state changes. Used internally in table components."
                        }],
                    "text": ""
                },
                "complexType": {
                    "original": "MarketTableV2SelectionChangeEventDetail",
                    "resolved": "{ current: TMarketTableV2Selection; previous: TMarketTableV2Selection; }",
                    "references": {
                        "MarketTableV2SelectionChangeEventDetail": {
                            "location": "import",
                            "path": "../market-table-v2/types",
                            "id": "src/components/tables-v2/market-table-v2/types.ts::MarketTableV2SelectionChangeEventDetail"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "setSelected": {
                "complexType": {
                    "signature": "(selected: TMarketTableV2Selection, { silent }?: { silent?: boolean; }) => Promise<void>",
                    "parameters": [{
                            "name": "selected",
                            "type": "\"true\" | \"false\" | \"indeterminate\"",
                            "docs": ""
                        }, {
                            "name": "__1",
                            "type": "{ silent?: boolean; }",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "TMarketTableV2Selection": {
                            "location": "import",
                            "path": "../market-table-v2/types",
                            "id": "src/components/tables-v2/market-table-v2/types.ts::TMarketTableV2Selection"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": [{
                            "name": "internal",
                            "text": "Sets selection on the cell and propagates value to its slotted control"
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "keydown",
                "method": "onKeydown",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketToggleChange",
                "method": "onMarketControlSelectionChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketCheckboxValueChange",
                "method": "onMarketControlSelectionChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-table-v2-cell.js.map
