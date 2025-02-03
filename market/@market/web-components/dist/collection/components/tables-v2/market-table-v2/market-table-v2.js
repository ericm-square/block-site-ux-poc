import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../../utils/namespace";
import { Reorderable } from "../../../utils/reorderable";
import { isDraggable } from "../../../utils/draggable";
import { sortItems } from "./utils";
/**
 * @slot - Default slot for all rows.
 * @part table - The inner table element.
 */
export class MarketTableV2 {
    constructor() {
        this.align = undefined;
        this.collapsible = false;
        this.layout = 'auto';
        this.reorderable = undefined;
        this.reorderMode = 'default';
        this.selected = 'false';
        this.valign = undefined;
    }
    async onMarketTableV2SelectionChange(e) {
        const { header, footer } = this;
        const { target, detail } = e;
        const eventSelected = detail.current;
        e.stopPropagation();
        if (target === header || target === footer) {
            // the target is the header or footer, so propagate values downward
            await this.setSelected(eventSelected, { silent: true });
        }
        else {
            // the target is a child, and it's complicated...
            await this.setSelectedFromChildEvent(e);
        }
    }
    onMarketTableV2CellSortClicked(e) {
        const { el, header, children, groups, footer } = this;
        const sortedCell = e.target;
        // only allow sorting from the header row
        if (sortedCell.parentElement !== header)
            return;
        const { current: newSortOrder } = e.detail;
        const headerChildren = [...header.children];
        const sortedColumnIndex = headerChildren.indexOf(sortedCell);
        const { sortStrategy, sortStrategyFormat } = sortedCell;
        // sort the children
        const sortedChildren = sortItems({
            items: children,
            order: newSortOrder,
            column: sortedColumnIndex,
            strategy: sortStrategy,
            format: sortStrategyFormat,
        });
        // sort the groups' children
        groups === null || groups === void 0 ? void 0 : groups.forEach((group) => {
            group.sort({
                order: newSortOrder,
                column: sortedColumnIndex,
                strategy: sortStrategy,
                format: sortStrategyFormat,
            });
        });
        // set the header sort values
        sortedCell.sortOrder = newSortOrder;
        headerChildren.forEach((cell) => {
            cell.sortOrder = cell === sortedCell ? newSortOrder : undefined;
        });
        // render the sorted rows
        sortedChildren.forEach((row) => {
            el.append(row);
        });
        if (footer)
            el.append(footer);
    }
    onDragMove(e) {
        var _a;
        (_a = this.reorder) === null || _a === void 0 ? void 0 : _a.dragMove(e);
    }
    onDragLeave() {
        var _a;
        (_a = this.reorder) === null || _a === void 0 ? void 0 : _a.dragLeave();
    }
    onDragEnd(e) {
        var _a;
        (_a = this.reorder) === null || _a === void 0 ? void 0 : _a.dragEnd(e);
    }
    onDragDrop(e) {
        var _a;
        (_a = this.reorder) === null || _a === void 0 ? void 0 : _a.dragDrop(e);
    }
    watchCollapsible() {
        const { rows, groups, collapsible } = this;
        groups.forEach((group) => {
            group.collapsible = collapsible;
            group.indent = 0;
        });
        rows.forEach((row) => {
            // per design, don't indent header or footer rows
            if (row.header || row.footer)
                return;
            // indent rows to line up with groups w/ carets
            row.indent = collapsible && groups.length > 0 ? 1 : 0;
        });
    }
    watchReorderable() {
        const { el, reorder, reorderable, reorderMode, marketTableV2RowsReordered } = this;
        reorder === null || reorder === void 0 ? void 0 : reorder.destroy();
        const reorderEnabled = ['internal', 'external'].includes(reorderable);
        if (reorderEnabled) {
            const rowTagName = getNamespacedTagFor('market-table-v2-row');
            const groupTagName = getNamespacedTagFor('market-table-v2-group');
            this.reorder = new Reorderable({
                el,
                accepts: [`${rowTagName}:not([header]):not([footer]):not([slot="parent"])`, groupTagName],
                event: marketTableV2RowsReordered,
                mode: reorderMode,
            });
        }
        this.syncDragEnabled();
    }
    /**
     * @internal
     * Sets selection on the table and propagates the value
     * downwards to its children rows and groups.
     */
    async setSelected(selected, { silent = false } = {}) {
        const { header, footer, children, selected: prevSelected } = this;
        // return if no values have changed
        if (prevSelected === selected)
            return Promise.resolve();
        // propagate the new values
        this.selected = selected;
        await (header === null || header === void 0 ? void 0 : header.setSelected(selected, { silent }));
        await (footer === null || footer === void 0 ? void 0 : footer.setSelected(selected, { silent }));
        children === null || children === void 0 ? void 0 : children.forEach(async (child) => {
            await child.setSelected(selected, { silent });
        });
        return Promise.resolve();
    }
    async setSelectedFromChildEvent(e) {
        const { header, footer, children, selected: prevSelected } = this;
        const { target, detail } = e;
        const { current: childSelected } = detail;
        // get an array of what the children's selected values would be AFTER this event
        const childrenSelected = children.map((child) => {
            // if the target was THIS child, it will be new event value (not .selected)
            if (target === child)
                return childSelected;
            // otherwise, get the current value directly from this child
            return child.selected;
        });
        // what the table's selected value would be AFTER this event
        const tableSelected = childrenSelected.every((val) => val === 'true')
            ? 'true'
            : childrenSelected.every((val) => val === 'false')
                ? 'false'
                : 'indeterminate';
        // return if no values have changed
        if (prevSelected === tableSelected)
            return;
        // propagate the new value
        this.selected = tableSelected;
        await (header === null || header === void 0 ? void 0 : header.setSelected(tableSelected, { silent: true }));
        await (footer === null || footer === void 0 ? void 0 : footer.setSelected(tableSelected, { silent: true }));
    }
    getElements() {
        this.rows = [...this.el.children].filter((child) => {
            return child.tagName === getNamespacedTagFor('market-table-v2-row').toUpperCase();
        });
        this.groups = [...this.el.children].filter((child) => {
            return child.tagName === getNamespacedTagFor('market-table-v2-group').toUpperCase();
        });
        this.header = this.rows.find((row) => row.header);
        this.footer = this.rows.find((row) => row.footer);
        this.children = [...this.groups, ...this.rows.filter((row) => !row.header && !row.footer)];
    }
    syncDragEnabled() {
        const { header, footer, rows, groups, reorderable, reorderMode } = this;
        const reorderEnabled = ['internal', 'external'].includes(reorderable);
        if (header)
            header.dragEnabled = reorderEnabled;
        if (footer)
            footer.dragEnabled = reorderEnabled;
        rows === null || rows === void 0 ? void 0 : rows.forEach((row) => {
            if (!isDraggable(row))
                return;
            row.dragEnabled = reorderEnabled;
        });
        groups === null || groups === void 0 ? void 0 : groups.forEach((group) => {
            group.dragEnabled = reorderEnabled;
            group.reorderable = reorderable;
            group.reorderMode = reorderMode;
        });
    }
    onSlotChange() {
        this.getElements();
        this.watchCollapsible();
        this.syncDragEnabled();
    }
    connectedCallback() {
        this.getElements();
        this.watchCollapsible();
        this.syncDragEnabled();
    }
    componentDidRender() {
        this.watchReorderable();
    }
    render() {
        return (h(Host, { key: 'e149228f1e4d3e136f9571d5cb385c7e0f4670e9', class: "market-table-v2" }, h("div", { key: 'b28e0fe40fbbd5e7dac970e3a5adce848f88c64c', role: "table", part: "table" }, h("slot", { key: '555aa3b36f06ad72a913161c62169f6029fe3f3f', onSlotchange: () => this.onSlotChange() }))));
    }
    static get is() { return "market-table-v2"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-table-v2.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-table-v2.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "Sets the horizontal alignment.\nTable alignment will be inherited by descendant rows & cells."
                },
                "attribute": "align",
                "reflect": true
            },
            "collapsible": {
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
                    "text": "Whether the slotted table groups are collapsible."
                },
                "attribute": "collapsible",
                "reflect": true,
                "defaultValue": "false"
            },
            "layout": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'auto' | 'fixed'",
                    "resolved": "\"auto\" | \"fixed\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sets the `table-layout` algorithm.\nBy default, the column widths are adjusted to fit the content.\nIf column widths are explicitly sized, use `fixed` to speed up render time.\nSee [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout)\nfor more information."
                },
                "attribute": "layout",
                "reflect": true,
                "defaultValue": "'auto'"
            },
            "reorderable": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "TMarketReorderableOptions",
                    "resolved": "\"external\" | \"internal\" | \"off\"",
                    "references": {
                        "TMarketReorderableOptions": {
                            "location": "import",
                            "path": "../../../utils/reorderable",
                            "id": "src/utils/reorderable.ts::TMarketReorderableOptions"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the table is reorderable or not.\nSetting to `internal` enables reordering table rows internally\nwhile `external` also allows dragging to & from other tables."
                },
                "attribute": "reorderable",
                "reflect": true
            },
            "reorderMode": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'default' | 'framework'",
                    "resolved": "\"default\" | \"framework\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When set to `framework`, the table will move the reordered item back to its original position\nbefore the `marketTableV2RowsReordered` event is fired. This is useful when the table\nis rendered within a framework like Ember or React."
                },
                "attribute": "reorder-mode",
                "reflect": false,
                "defaultValue": "'default'"
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
                            "path": "./types",
                            "id": "src/components/tables-v2/market-table-v2/types.ts::TMarketTableV2Selection"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the table is selected.\nRelevant if the table has rows with a slotted controls."
                },
                "attribute": "selected",
                "reflect": false,
                "defaultValue": "'false'"
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
                    "text": "Sets the vertical alignment.\nTable alignment will be inherited by descendant rows & cells."
                },
                "attribute": "valign",
                "reflect": true
            }
        };
    }
    static get events() {
        return [{
                "method": "marketTableV2RowsReordered",
                "name": "marketTableV2RowsReordered",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the table rows are reordered.\nIf a row was dropped into this table from an external table, `oldIndex` is `-1`.\nIf a row was removed from this table and dropped into an external table, `newIndex` is `-1`."
                },
                "complexType": {
                    "original": "TMarketReorderEventDetail",
                    "resolved": "{ item: MarketDraggableElement; oldIndex: number; newIndex: number; }",
                    "references": {
                        "TMarketReorderEventDetail": {
                            "location": "import",
                            "path": "../../../utils/reorderable",
                            "id": "src/utils/reorderable.ts::TMarketReorderEventDetail"
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
                            "path": "./types",
                            "id": "src/components/tables-v2/market-table-v2/types.ts::TMarketTableV2Selection"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": [{
                            "name": "internal",
                            "text": "Sets selection on the table and propagates the value\ndownwards to its children rows and groups."
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "collapsible",
                "methodName": "watchCollapsible"
            }, {
                "propName": "reorderable",
                "methodName": "watchReorderable"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketInternalTableV2RowSelectionChange",
                "method": "onMarketTableV2SelectionChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketInternalTableV2GroupSelectionChange",
                "method": "onMarketTableV2SelectionChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketTableV2CellSortClicked",
                "method": "onMarketTableV2CellSortClicked",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDragMove",
                "method": "onDragMove",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDragLeave",
                "method": "onDragLeave",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDragEnd",
                "method": "onDragEnd",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDragDrop",
                "method": "onDragDrop",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-table-v2.js.map
