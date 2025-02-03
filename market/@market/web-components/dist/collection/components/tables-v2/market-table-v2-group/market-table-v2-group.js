import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../../utils/namespace";
import { isDraggable, Draggable } from "../../../utils/draggable";
import { Reorderable } from "../../../utils/reorderable";
import { sortItems } from "../market-table-v2/utils";
/**
 * @slot - Default slot for children rows
 * @slot parent - Slot for for the parent row
 */
export class MarketTableV2Group {
    constructor() {
        this.collapsible = false;
        this.collapsed = false;
        this.dragEnabled = false;
        this.indent = 0;
        this.reorderable = undefined;
        this.reorderMode = 'default';
        this.selected = 'false';
    }
    onMarketTableV2CellCaretClicked(e) {
        e.stopPropagation();
        this.setCollapsed(!this.collapsed);
    }
    async onMarketTableV2SelectionChange(e) {
        const { el, parent } = this;
        const { target, detail } = e;
        const { current } = detail;
        // oddly, a component's instance can catch its own event
        // before it bubbles, so prevent an infinite loop!
        if (target === el)
            return;
        e.stopImmediatePropagation();
        if (target === parent) {
            // if the target is the parent, propagate values downward
            await this.setSelected(current);
        }
        else {
            // the target is a child, and it's complicated...
            await this.setSelectedFromChildEvent(e);
        }
    }
    // These marketDragHandle listeners are for dragging this entire group,
    // which is triggered by dragging the handle of the parent row.
    // We ONLY want to listen for drag handle events on the parent,
    // so we return early if the target is NOT the parent.
    async onDragHandleStart(e) {
        e.stopImmediatePropagation();
        const { el, parent } = this;
        const { target, detail: coords } = e;
        if (parent !== target)
            return;
        const anchor = parent.dragHandlePosition === 'leading' ? 'left' : 'right';
        const drag = new Draggable(el, { anchor });
        this.drag = drag;
        await drag.start(coords);
        parent.classList.add('market-drag-placeholder');
    }
    onDragHandleMove(e) {
        e.stopImmediatePropagation();
        const { parent, drag } = this;
        const { target, detail: coords } = e;
        if (parent !== target)
            return;
        drag.move(coords);
    }
    async onDragHandleDragEnd(e) {
        e.stopImmediatePropagation();
        const { parent, drag } = this;
        const { target, detail: coords } = e;
        if (parent !== target)
            return;
        await drag.end(coords);
        parent.classList.remove('market-drag-placeholder');
        drag.destroy();
    }
    // These marketDrag listeners are for dragging WITHIN this group.
    // If the dragged element is the parent row, we return early.
    onDragMove(e) {
        const { parent, reorder } = this;
        const { el } = e.detail;
        if (parent === el)
            return;
        e.stopImmediatePropagation();
        reorder === null || reorder === void 0 ? void 0 : reorder.dragMove(e);
    }
    onDragLeave(e) {
        const { parent, reorder } = this;
        const { el } = e.detail;
        if (parent === el)
            return;
        e.stopImmediatePropagation();
        reorder === null || reorder === void 0 ? void 0 : reorder.dragLeave();
    }
    onDragEnd(e) {
        const { parent, reorder } = this;
        const { el } = e.detail;
        if (parent === el)
            return;
        reorder === null || reorder === void 0 ? void 0 : reorder.dragEnd(e);
    }
    onDragDrop(e) {
        const { parent, reorder } = this;
        const { el } = e.detail;
        if (parent === el)
            return;
        reorder === null || reorder === void 0 ? void 0 : reorder.dragDrop(e);
    }
    propagateNestedState() {
        const { parent, children, groups, rows, indent, collapsible, collapsed } = this;
        groups.forEach((group) => {
            group.collapsible = collapsible;
        });
        if (collapsible) {
            const hasChildren = children.length > 0;
            if (parent) {
                parent.caret = hasChildren ? (collapsed ? 'down' : 'up') : undefined;
                parent.indent = hasChildren ? indent : indent + 1;
            }
            groups.forEach((group) => {
                group.indent = indent + 1;
                group.collapsible = collapsible;
            });
            rows.forEach((row) => {
                // child rows get extra indentation to account for no caret
                row.indent = indent + 2;
            });
        }
        else {
            if (parent) {
                parent.caret = undefined;
                parent.indent = indent;
            }
            children.forEach((child) => {
                child.indent = indent + 1;
            });
            groups.forEach((group) => {
                group.collapsible = collapsible;
            });
        }
    }
    watchDragEnabled() {
        const { parent, children, dragEnabled } = this;
        if (parent)
            parent.dragEnabled = dragEnabled;
        children === null || children === void 0 ? void 0 : children.forEach((child) => {
            child.dragEnabled = dragEnabled;
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
     * Sets selection on the group and propagates the value
     * downwards to its children rows and upwards to any parent groups or tables.
     */
    async setSelected(selected, { silent = false } = {}) {
        const { parent, children, marketInternalTableV2GroupSelectionChange, selected: prevSelected } = this;
        // return if no values have changed
        if (prevSelected === selected)
            return Promise.resolve();
        // fire the internal selection event
        if (!silent) {
            marketInternalTableV2GroupSelectionChange.emit({
                current: selected,
                previous: prevSelected,
            });
        }
        // propagate the new values
        this.selected = selected;
        // this direction is top -> down, so don't fire events to avoid infinite loop
        await (parent === null || parent === void 0 ? void 0 : parent.setSelected(selected, { silent: true }));
        children === null || children === void 0 ? void 0 : children.forEach(async (child) => {
            await child.setSelected(selected, { silent: true });
        });
        return Promise.resolve();
    }
    /**
     * @internal
     * Used internally by Reorderable utils.
     * Sets the group's collapsed state and fires the change event.
     * Normally you should set the `collapsed` prop directly.
     */
    async setCollapsed(collapsed, { silent = false } = {}) {
        const { collapsed: prevCollapsed, collapsible, marketTableV2GroupCollapsedChange } = this;
        if (!collapsible)
            return Promise.resolve();
        if (collapsed === prevCollapsed)
            return Promise.resolve();
        this.collapsed = collapsed;
        if (!silent) {
            const { defaultPrevented } = marketTableV2GroupCollapsedChange.emit({
                previous: prevCollapsed,
                current: collapsed,
            });
            if (defaultPrevented)
                this.collapsed = prevCollapsed;
        }
        return Promise.resolve();
    }
    /**
     * @internal
     * Recursively sorts the group's children rows and groups.
     */
    async sort({ order, column, strategy, format, }) {
        const { el, children, groups } = this;
        // sort the children
        const sortedChildren = sortItems({
            items: children,
            order,
            column,
            strategy,
            format,
        });
        // sort the groups' children
        groups === null || groups === void 0 ? void 0 : groups.forEach((group) => group.sort({
            order,
            column,
            strategy,
            format,
        }));
        // render the sorted rows
        sortedChildren.forEach((row) => {
            el.append(row);
        });
        return Promise.resolve();
    }
    async setSelectedFromChildEvent(e) {
        const { parent, children, marketInternalTableV2GroupSelectionChange, selected: prevSelected } = this;
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
        // what this group's selected value would be AFTER this event
        const groupSelected = childrenSelected.every((val) => val === 'true')
            ? 'true'
            : childrenSelected.every((val) => val === 'false')
                ? 'false'
                : 'indeterminate';
        // return if no values have changed
        if (prevSelected === groupSelected)
            return;
        // fire the internal selection event
        marketInternalTableV2GroupSelectionChange.emit({
            current: groupSelected,
            previous: prevSelected,
        });
        // propagate the new values
        this.selected = groupSelected;
        await parent.setSelected(groupSelected, { silent: true });
    }
    getElements() {
        this.parent = [...this.el.children].find((child) => {
            return child.tagName === getNamespacedTagFor('market-table-v2-row').toUpperCase() && child.slot === 'parent';
        });
        this.rows = [...this.el.children].filter((child) => {
            return child.tagName === getNamespacedTagFor('market-table-v2-row').toUpperCase() && child.slot !== 'parent';
        });
        this.groups = [...this.el.children].filter((child) => {
            return child.tagName === getNamespacedTagFor('market-table-v2-group').toUpperCase() && child.slot !== 'parent';
        });
        this.children = [...this.groups, ...this.rows];
    }
    getStyles() {
        const { indent } = this;
        return { '--drag-cursor-indent-level': indent.toString() };
    }
    syncDragEnabled() {
        const { parent, rows, groups, reorderable, reorderMode } = this;
        const reorderEnabled = ['internal', 'external'].includes(reorderable);
        if (parent)
            parent.dragEnabled = reorderEnabled;
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
        this.propagateNestedState();
        this.syncDragEnabled();
    }
    connectedCallback() {
        this.getElements();
        this.propagateNestedState();
        this.syncDragEnabled();
    }
    componentDidRender() {
        this.watchReorderable();
    }
    render() {
        return (h(Host, { key: 'dabd9bc7e9c87046618544958c5fea00a375c631', class: "market-table-v2-group", style: this.getStyles() }, h("slot", { key: 'd5893440e44dc0014fd3921e5eb46f8e31a32813', name: "parent", onSlotchange: () => this.onSlotChange() }), h("div", { key: '876dbab692978351ceb9f70358fe82b76d80d174', class: "children" }, h("slot", { key: '11071473d3ca6f7b7619258c2bef6bcd987a4a95', onSlotchange: () => this.onSlotChange() }))));
    }
    static get is() { return "market-table-v2-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-table-v2-group.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-table-v2-group.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "Whether the group is collapsible."
                },
                "attribute": "collapsible",
                "reflect": true,
                "defaultValue": "false"
            },
            "collapsed": {
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
                    "text": "Whether the group is expanded or collapsed, when `collapsible` is `true`."
                },
                "attribute": "collapsed",
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
                    "text": "Whether the group is drag & drop enabled."
                },
                "attribute": "drag-enabled",
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
                "reflect": true,
                "defaultValue": "0"
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
                    "text": "Whether the group is reorderable or not.\nSetting to `internal` enables reordering table rows internally\nwhile `external` also allows dragging to & from other tables."
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
                    "text": "When set to `framework`, the group will move the reordered item back to its original position\nbefore the `marketTableV2RowsReordered` event is fired. This is useful when the table\nis rendered within a framework like Ember or React."
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
                            "path": "../market-table-v2/types",
                            "id": "src/components/tables-v2/market-table-v2/types.ts::TMarketTableV2Selection"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the group is selected.\nRelevant if the group has rows with slotted controls."
                },
                "attribute": "selected",
                "reflect": false,
                "defaultValue": "'false'"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketInternalTableV2GroupSelectionChange",
                "name": "marketInternalTableV2GroupSelectionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "Fired when the group selection state changes. Used internally in table components."
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
                "method": "marketTableV2RowsReordered",
                "name": "marketTableV2RowsReordered",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the group's rows are reordered.\nIf a row was dropped into this group from an external source, `oldIndex` is `-1`.\nIf a row was removed from this group and dropped into an external source, `newIndex` is `-1`."
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
            }, {
                "method": "marketTableV2GroupCollapsedChange",
                "name": "marketTableV2GroupCollapsedChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the group's collapsed state changes."
                },
                "complexType": {
                    "original": "{ previous: boolean; current: boolean }",
                    "resolved": "{ previous: boolean; current: boolean; }",
                    "references": {}
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
                            "text": "Sets selection on the group and propagates the value\ndownwards to its children rows and upwards to any parent groups or tables."
                        }]
                }
            },
            "setCollapsed": {
                "complexType": {
                    "signature": "(collapsed: boolean, { silent }?: { silent?: boolean; }) => Promise<void>",
                    "parameters": [{
                            "name": "collapsed",
                            "type": "boolean",
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
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": [{
                            "name": "internal",
                            "text": "Used internally by Reorderable utils.\nSets the group's collapsed state and fires the change event.\nNormally you should set the `collapsed` prop directly."
                        }]
                }
            },
            "sort": {
                "complexType": {
                    "signature": "({ order, column, strategy, format, }: { order: TMarketTableV2SortOrder; column: number; strategy: TMarketTableV2SortStrategy; format: string; }) => Promise<void>",
                    "parameters": [{
                            "name": "__0",
                            "type": "{ order: TMarketTableV2SortOrder; column: number; strategy: TMarketTableV2SortStrategy; format: string; }",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "TMarketTableV2SortOrder": {
                            "location": "import",
                            "path": "../market-table-v2/types",
                            "id": "src/components/tables-v2/market-table-v2/types.ts::TMarketTableV2SortOrder"
                        },
                        "TMarketTableV2SortStrategy": {
                            "location": "import",
                            "path": "../market-table-v2/types",
                            "id": "src/components/tables-v2/market-table-v2/types.ts::TMarketTableV2SortStrategy"
                        },
                        "HTMLMarketTableV2RowElement": {
                            "location": "global",
                            "id": "global::HTMLMarketTableV2RowElement"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": [{
                            "name": "internal",
                            "text": "Recursively sorts the group's children rows and groups."
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "indent",
                "methodName": "propagateNestedState"
            }, {
                "propName": "collapsed",
                "methodName": "propagateNestedState"
            }, {
                "propName": "collapsible",
                "methodName": "propagateNestedState"
            }, {
                "propName": "dragEnabled",
                "methodName": "watchDragEnabled"
            }, {
                "propName": "reorderable",
                "methodName": "watchReorderable"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketTableV2CellCaretClicked",
                "method": "onMarketTableV2CellCaretClicked",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
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
                "name": "marketDragHandleDragStart",
                "method": "onDragHandleStart",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDragHandleDragMove",
                "method": "onDragHandleMove",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDragHandleDragEnd",
                "method": "onDragHandleDragEnd",
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
//# sourceMappingURL=market-table-v2-group.js.map
