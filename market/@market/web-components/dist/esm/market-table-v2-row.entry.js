import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';
import { D as Draggable } from './draggable-dbb6e789.js';
import './max-z-index-7a974719.js';
import './raf-ac8923ee.js';

const marketTableV2RowCss = ":host,*{box-sizing:border-box}:host{--table-cell-border-width:1px;--table-cell-border-color:var(--core-divider-20-color);--table-cell-horizontal-spacing:var(--core-metrics-spacing-150);--table-cell-heading-border-color:var(--core-divider-10-color);--table-cell-heading-font-weight:var(--core-type-medium-weight);--table-cell-state-normal-background-color:var(--core-surface-10-color);display:table-row;vertical-align:inherit;width:100%;outline:none;text-align:inherit}:host slot{vertical-align:inherit;text-align:inherit}:host([align=\"left\"]){text-align:left}:host([align=\"center\"]){text-align:center}:host([align=\"right\"]){text-align:right}:host([valign=\"top\"]){vertical-align:top}:host([valign=\"middle\"]){vertical-align:middle}:host([valign=\"bottom\"]){vertical-align:bottom}:host([header]) .market-table-v2-cell,:host([header]) ::slotted(.market-table-v2-cell),:host([footer]) .market-table-v2-cell,:host([footer]) ::slotted(.market-table-v2-cell){font-weight:var(--table-cell-heading-font-weight)}:host([header]) .market-drag-handle,:host([footer]) .market-drag-handle{visibility:hidden}:host([header]) .market-table-v2-cell,:host([header]) ::slotted(.market-table-v2-cell),:host([sticky=\"top\"]) .market-table-v2-cell,:host([sticky=\"top\"]) ::slotted(.market-table-v2-cell){border-bottom:var(--table-cell-border-width) solid var(--table-cell-heading-border-color)}:host([footer]) .market-table-v2-cell,:host([footer]) ::slotted(.market-table-v2-cell),:host([sticky=\"bottom\"]) .market-table-v2-cell,:host([sticky=\"bottom\"]) ::slotted(.market-table-v2-cell){border-top:var(--table-cell-border-width) solid var(--table-cell-heading-border-color);border-bottom:none}:host([sticky]){position:sticky;z-index:3;background-color:var(--table-cell-state-normal-background-color)}:host([sticky=\"top\"]){top:0}:host([sticky=\"bottom\"]){bottom:0}:host([interactive]){cursor:pointer}@media (hover: hover){:host([interactive]:hover){background-color:var(--table-cell-hover-state-background-color)}}:host([interactive]:focus){background-color:var(--table-cell-focus-state-background-color)}:host([active]),:host([interactive]:active){background-color:var(--table-cell-pressed-state-background-color)}:host([disabled]){color:var(--table-cell-disabled-state-text-color);pointer-events:none}.drag-handle-cell{width:var(--core-metrics-spacing-500)}@media (hover: hover){:host([drag-handle-visibility=\"hover\"]) .market-drag-handle{opacity:0%}:host([drag-handle-visibility=\"hover\"]:hover) .market-drag-handle{opacity:100%}}:host(.market-drag-placeholder),:host(.market-drag-placeholder[interactive]){background-color:var(--core-fill-50-color)}:host(.market-drag-placeholder) *,:host(.market-drag-placeholder) ::slotted(*),:host(.market-drag-placeholder[interactive]) *,:host(.market-drag-placeholder[interactive]) ::slotted(*){opacity:0%}:host(.market-drag-placeholder) .market-drag-handle,:host(.market-drag-placeholder[interactive]) .market-drag-handle{pointer-events:none}:host(.market-drag-clone),:host(.market-drag-clone[interactive]){--table-row-dragged-width:240px;display:flex;justify-content:space-between;align-items:center;width:var(--table-row-dragged-width);border-bottom:var(--table-cell-border-width) solid var(--table-cell-border-color);border-radius:var(--core-radius-10);background-color:var(--core-surface-20-color);cursor:grabbing;transition-timing-function:var(--core-animation-move-transition-easing);transition-duration:var(--core-animation-move-transition-moderate-speed-duration);transition-property:top, width, height}:host(.market-drag-clone)::after,:host(.market-drag-clone[interactive])::after{content:\"\";position:absolute;inset:0;display:block;border-radius:var(--core-radius-10);box-shadow:var(--elevation-20-shadow);opacity:var(--market-drag-clone-shadow-opacity, 0%);transition-timing-function:var(--core-animation-move-transition-easing);transition-duration:var(--core-animation-move-transition-moderate-speed-duration);transition-property:opacity}:host(.market-drag-clone) .market-drag-handle,:host(.market-drag-clone[interactive]) .market-drag-handle{cursor:grabbing}:host(.market-drag-clone) ::slotted(.market-table-v2-cell:first-child),:host(.market-drag-clone[interactive]) ::slotted(.market-table-v2-cell:first-child){overflow:hidden;width:100%;border:none;text-overflow:ellipsis;white-space:nowrap;transition-timing-function:var(--core-animation-move-transition-easing);transition-duration:var(--core-animation-move-transition-moderate-speed-duration);transition-property:padding-left}:host(.market-drag-clone) ::slotted(.market-table-v2-cell:not(:first-child)),:host(.market-drag-clone[interactive]) ::slotted(.market-table-v2-cell:not(:first-child)){display:none}:host(.market-drag-clone) .drag-handle-cell,:host(.market-drag-clone[interactive]) .drag-handle-cell{border:none}:host(.market-drag-clone[drag-handle-position=\"leading\"]){justify-content:flex-start}:host(.market-drag-released){pointer-events:none;transition-property:opacity, width, height, transform, scale}:host(.market-drag-into-collapsed-group){opacity:0%;scale:0}";
const MarketTableV2RowStyle0 = marketTableV2RowCss;

const MarketTableV2Row = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketInternalTableV2RowSelectionChange = createEvent(this, "marketInternalTableV2RowSelectionChange", 7);
        this.marketTableV2RowSelectionChange = createEvent(this, "marketTableV2RowSelectionChange", 7);
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "caret": ["watchCaret"],
        "indent": ["watchIndent"]
    }; }
};
MarketTableV2Row.style = MarketTableV2RowStyle0;

export { MarketTableV2Row as market_table_v2_row };

//# sourceMappingURL=market-table-v2-row.entry.js.map