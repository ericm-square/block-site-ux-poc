import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';
import { i as isDraggable, D as Draggable } from './draggable-dbb6e789.js';
import { R as Reorderable } from './reorderable-a47cef94.js';
import { s as sortItems } from './utils-81774f07.js';
import './max-z-index-7a974719.js';
import './raf-ac8923ee.js';
import './index-b9ae40c9.js';
import './index-33c9a13b.js';

const marketTableV2GroupCss = ":host{--table-cell-horizontal-padding-size:8px;--table-cell-indent-size:40px;--drag-highlight-border-size:2px}:host,slot,.children{vertical-align:inherit;text-align:inherit}:host,.children{display:contents}:host([collapsible][collapsed]) .children{display:none}:host(.market-drag-cursor-parent[collapsible][collapsed]) ::slotted([slot=\"parent\"]){position:relative;border-radius:var(--core-radius-10);background-color:var(--core-emphasis-40-color);outline:var(--drag-highlight-border-size) solid var(--core-emphasis-fill-color);outline-offset:calc(var(--drag-highlight-border-size) * -1)}::slotted(.market-drag-cursor){--drag-cursor-height:4px;position:absolute;right:0;left:calc(\n      var(--table-cell-horizontal-padding-size) +\n      (var(--drag-cursor-indent-level) + 1) * var(--table-cell-indent-size)\n    );display:block;height:0;outline:calc(var(--drag-cursor-height) / 2) solid var(--core-emphasis-fill-color);pointer-events:none}:host(.market-drag-placeholder) ::slotted(:not([slot=\"parent\"])){display:none}";
const MarketTableV2GroupStyle0 = marketTableV2GroupCss;

const MarketTableV2Group = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketInternalTableV2GroupSelectionChange = createEvent(this, "marketInternalTableV2GroupSelectionChange", 7);
        this.marketTableV2RowsReordered = createEvent(this, "marketTableV2RowsReordered", 7);
        this.marketTableV2GroupCollapsedChange = createEvent(this, "marketTableV2GroupCollapsedChange", 7);
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "indent": ["propagateNestedState"],
        "collapsed": ["propagateNestedState"],
        "collapsible": ["propagateNestedState"],
        "dragEnabled": ["watchDragEnabled"],
        "reorderable": ["watchReorderable"]
    }; }
};
MarketTableV2Group.style = MarketTableV2GroupStyle0;

export { MarketTableV2Group as market_table_v2_group };

//# sourceMappingURL=market-table-v2-group.entry.js.map