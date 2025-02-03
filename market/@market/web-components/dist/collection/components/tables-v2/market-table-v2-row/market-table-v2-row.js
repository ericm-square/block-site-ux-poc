import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../../utils/namespace";
import { Draggable } from "../../../utils/draggable";
/**
 * @slot - Default slot for table cells.
 * @part drag-handle - the drag handle when `dragEnabled` is true.
 */
export class MarketTableV2Row {
    constructor() {
        this.active = false;
        this.align = undefined;
        this.caret = undefined;
        this.disabled = false;
        this.dragEnabled = false;
        this.dragHandleVisibility = undefined;
        this.dragHandlePosition = undefined;
        this.footer = false;
        this.header = false;
        this.indent = undefined;
        this.interactive = false;
        this.selected = 'false';
        this.sticky = undefined;
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
    async onMarketInternalTableV2CellSelectionChange(e) {
        const { detail, target } = e;
        const { current } = detail;
        const { firstCell } = this;
        if (target !== firstCell)
            return;
        e.stopPropagation();
        await this.setSelected(current);
    }
    async onDragStart(e) {
        const { el, dragHandlePosition } = this;
        if (el.slot === 'parent')
            return;
        e.stopPropagation();
        const coords = e.detail;
        const anchor = dragHandlePosition === 'leading' ? 'left' : 'right';
        const drag = new Draggable(el, { anchor });
        this.drag = drag;
        await drag.start(coords);
    }
    onDragMove(e) {
        if (this.el.slot === 'parent')
            return;
        e.stopPropagation();
        const coords = e.detail;
        this.drag.move(coords);
    }
    async onDragEnd(e) {
        if (this.el.slot === 'parent')
            return;
        e.stopPropagation();
        const coords = e.detail;
        await this.drag.end(coords);
        this.drag.destroy();
    }
    watchCaret() {
        const { firstCell, caret } = this;
        if (firstCell)
            firstCell.caret = caret;
    }
    watchIndent() {
        const { firstCell, indent } = this;
        if (firstCell)
            firstCell.indent = indent;
    }
    /**
     * Sets selection on the row and propagates the value
     * downwards to the slotted control in its first cell
     * and upwards to any parent groups or tables.
     */
    async setSelected(selected, { silent = false } = {}) {
        const { firstCell, selected: prevSelected, marketTableV2RowSelectionChange, marketInternalTableV2RowSelectionChange, } = this;
        // return if no values have changed
        if (prevSelected === selected)
            return Promise.resolve();
        // always fire the external selection event
        const { defaultPrevented } = marketTableV2RowSelectionChange.emit({
            current: selected,
            previous: prevSelected,
        });
        // if default was prevented, reset the cell & control
        if (defaultPrevented) {
            await (firstCell === null || firstCell === void 0 ? void 0 : firstCell.setSelected(prevSelected, { silent: true }));
            return Promise.resolve();
        }
        // fire the internal selection event
        if (!silent) {
            marketInternalTableV2RowSelectionChange.emit({
                current: selected,
                previous: prevSelected,
            });
        }
        // save the state
        this.selected = selected;
        await (firstCell === null || firstCell === void 0 ? void 0 : firstCell.setSelected(selected, { silent }));
        return Promise.resolve();
    }
    getTabIndex() {
        const { disabled, interactive } = this;
        return interactive && !disabled ? '0' : null;
    }
    async initFirstCell() {
        const { el, selected } = this;
        const MarketTableV2CellTagName = getNamespacedTagFor('market-table-v2-cell');
        const firstCell = el.querySelector(`${MarketTableV2CellTagName}`);
        if (firstCell) {
            this.firstCell = firstCell;
            if (selected)
                await (firstCell === null || firstCell === void 0 ? void 0 : firstCell.setSelected(selected));
        }
        this.watchCaret();
        this.watchIndent();
    }
    async connectedCallBack() {
        await this.initFirstCell();
    }
    renderDragHandleCell() {
        const MarketDragHandleTagName = getNamespacedTagFor('market-drag-handle');
        const MarketTableV2CellTagName = getNamespacedTagFor('market-table-v2-cell');
        return (h(MarketTableV2CellTagName, { class: "drag-handle-cell" }, h(MarketDragHandleTagName, { part: "drag-handle" })));
    }
    render() {
        const { dragEnabled, dragHandlePosition } = this;
        return (h(Host, { key: '6adae61ab707d2a6d4a73dd244855cf75d91ddb9', role: "row", class: "market-table-v2-row", tabindex: this.getTabIndex(), onMarketDragHandleDragStart: (e) => this.onDragStart(e), onMarketDragHandleDragMove: (e) => this.onDragMove(e), onMarketDragHandleDragEnd: (e) => this.onDragEnd(e) }, dragEnabled && dragHandlePosition === 'leading' && this.renderDragHandleCell(), h("slot", { key: '734bcabee33118c8368a332e8de4287099f1d1fa', onSlotchange: () => this.initFirstCell() }), dragEnabled && dragHandlePosition !== 'leading' && this.renderDragHandleCell()));
    }
    static get is() { return "market-table-v2-row"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-table-v2-row.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-table-v2-row.css"]
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
                    "text": "Whether the row is currently active."
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
                    "text": "Sets the horizontal alignment.\nWhen not set, alignment is inherited from an ancestor table.\nLikewise, row alignment will be inherited by descendant cells."
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
                    "text": "Displays a leading clickable caret in the first cell;\nintended to be used in conjunction with\n`<market-table-v2-group>` to support nested rows."
                },
                "attribute": "caret",
                "reflect": true
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
                    "text": "Whether the row is currently disabled."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "dragEnabled": {
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
                    "text": "Whether the row is drag & drop enabled."
                },
                "attribute": "drag-enabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "dragHandleVisibility": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'always' | 'hover'",
                    "resolved": "\"always\" | \"hover\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the drag handle appears always or only on hover"
                },
                "attribute": "drag-handle-visibility",
                "reflect": true
            },
            "dragHandlePosition": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'leading' | 'trailing'",
                    "resolved": "\"leading\" | \"trailing\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the drag handle appears to the left or right."
                },
                "attribute": "drag-handle-position",
                "reflect": true
            },
            "footer": {
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
                    "text": "Styles a row with footer styles."
                },
                "attribute": "footer",
                "reflect": true,
                "defaultValue": "false"
            },
            "header": {
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
                    "text": "Styles a row with header styles."
                },
                "attribute": "header",
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
                    "text": "Indentation level of the first cell in the row."
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
                    "text": "Whether the row is interactive, which results in hover, focus, & pressed styles."
                },
                "attribute": "interactive",
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
                    "text": "Whether the row is selected.\nRelevant if the row's first cell has a slotted control."
                },
                "attribute": "selected",
                "reflect": false,
                "defaultValue": "'false'"
            },
            "sticky": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'top' | 'bottom'",
                    "resolved": "\"bottom\" | \"top\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Makes a row \"stick\" to the top or bottom of its parent table.\nRequires an explict height on the table to enable vertical scrolling."
                },
                "attribute": "sticky",
                "reflect": true
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
                    "text": "Sets the vertical alignment.\nWhen not set, alignment is inherited from an ancestor table.\nLikewise, row alignment will be inherited by descendant cells."
                },
                "attribute": "valign",
                "reflect": true
            }
        };
    }
    static get events() {
        return [{
                "method": "marketInternalTableV2RowSelectionChange",
                "name": "marketInternalTableV2RowSelectionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "Fired when the row selection state changes. Used internally in table components."
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
            }, {
                "method": "marketTableV2RowSelectionChange",
                "name": "marketTableV2RowSelectionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the row selection state changes. Used to externally signal selection changes."
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
                    "text": "Sets selection on the row and propagates the value\ndownwards to the slotted control in its first cell\nand upwards to any parent groups or tables.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "caret",
                "methodName": "watchCaret"
            }, {
                "propName": "indent",
                "methodName": "watchIndent"
            }];
    }
    static get listeners() {
        return [{
                "name": "keydown",
                "method": "onKeydown",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketInternalTableV2CellSelectionChange",
                "method": "onMarketInternalTableV2CellSelectionChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-table-v2-row.js.map
