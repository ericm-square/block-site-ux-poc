import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';
import { R as Reorderable } from './reorderable.js';
import { i as isDraggable } from './draggable.js';
import { s as sortItems } from './utils3.js';

const marketTableV2Css = ":host,*{box-sizing:border-box}:host{--table-cell-state-normal-background-color:var(--core-surface-10-color);position:relative;display:block;overflow:auto;width:100%;background-color:var(--table-cell-state-normal-background-color);font-feature-settings:\"tnum\"}:host [role=\"table\"]{display:table;vertical-align:middle;width:100%;height:100%;border-spacing:0;border-collapse:separate;table-layout:auto;text-align:left}:host slot{vertical-align:inherit;text-align:inherit}:host([layout=\"fixed\"]) [role=\"table\"]{table-layout:fixed}:host([align=\"left\"]) [role=\"table\"]{text-align:left}:host([align=\"center\"]) [role=\"table\"]{text-align:center}:host([align=\"right\"]) [role=\"table\"]{text-align:right}:host([valign=\"top\"]) [role=\"table\"]{vertical-align:top}:host([valign=\"middle\"]) [role=\"table\"]{vertical-align:middle}:host([valign=\"bottom\"]) [role=\"table\"]{vertical-align:bottom}::slotted(.market-drag-cursor){--drag-cursor-height:4px;position:absolute;right:0;left:0;display:block;height:0;outline:calc(var(--drag-cursor-height) / 2) solid var(--core-emphasis-fill-color);pointer-events:none}";
const MarketTableV2Style0 = marketTableV2Css;

const MarketTableV2$1 = /*@__PURE__*/ proxyCustomElement(class MarketTableV2 extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketTableV2RowsReordered = createEvent(this, "marketTableV2RowsReordered", 7);
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
    get el() { return this; }
    static get watchers() { return {
        "collapsible": ["watchCollapsible"],
        "reorderable": ["watchReorderable"]
    }; }
    static get style() { return MarketTableV2Style0; }
}, [1, "market-table-v2", {
        "align": [513],
        "collapsible": [516],
        "layout": [513],
        "reorderable": [513],
        "reorderMode": [1, "reorder-mode"],
        "selected": [1025],
        "valign": [513],
        "setSelected": [64]
    }, [[0, "marketInternalTableV2RowSelectionChange", "onMarketTableV2SelectionChange"], [0, "marketInternalTableV2GroupSelectionChange", "onMarketTableV2SelectionChange"], [0, "marketTableV2CellSortClicked", "onMarketTableV2CellSortClicked"], [0, "marketDragMove", "onDragMove"], [0, "marketDragLeave", "onDragLeave"], [0, "marketDragEnd", "onDragEnd"], [0, "marketDragDrop", "onDragDrop"]], {
        "collapsible": ["watchCollapsible"],
        "reorderable": ["watchReorderable"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-table-v2"];
    components.forEach(tagName => { switch (tagName) {
        case "market-table-v2":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketTableV2$1);
            }
            break;
    } });
}

const MarketTableV2 = MarketTableV2$1;
const defineCustomElement = defineCustomElement$1;

export { MarketTableV2, defineCustomElement };

//# sourceMappingURL=market-table-v2.js.map