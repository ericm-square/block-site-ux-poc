import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';

const marketTableColumnCss = ":host{position:relative;display:flex;justify-content:flex-start;align-items:center;overflow:hidden;padding:var(--table-cell-vertical-padding-size, 12px) var(--table-cell-horizontal-padding-size, 8px);background-color:var(--table-cell-state-normal-background-color, var(--core-surface-10-color));font-weight:var(--table-cell-primary-text-font-weight, var(--core-type-paragraph-20-weight));font-size:var(--table-cell-primary-text-font-size, var(--core-type-paragraph-20-size));line-height:var(--table-cell-primary-text-line-height, var(--core-type-paragraph-20-leading));text-overflow:ellipsis}:host([align=\"right\"]){justify-content:flex-end}:host([align=\"right\"]) .sorting-caret{order:-1;margin-right:var(--table-heading-sort-icon-space-size, 8px);margin-left:0}:host([stickTo=\"left\"]){position:sticky;grid-area:left;border-right:var(--table-fixed-column-border-width, 1px)\n      solid\n      var(--table-fixed-column-border-color, var(--core-divider-20-color))}:host([stickTo=\"right\"]){grid-area:right;border-left:var(--table-fixed-column-border-width, 1px)\n      solid\n      var(--table-fixed-column-border-color, var(--core-divider-20-color))}:host{font-weight:var(--table-heading-primary-text-font-weight, 500);font-size:var(--table-heading-primary-text-font-size, var(--core-type-semibold-20-size));line-height:var(--table-heading-primary-text-line-height, var(--core-type-semibold-20-leading))}:host([sortable]){cursor:pointer;transition:background-color\n      var(--core-animation-enter-transition-fast-speed-duration)\n      var(--core-animation-enter-transition-fast-speed-duration-easing)}:host([sortable]:hover){background-color:var(--table-heading-hover-state-background-color, var(--core-fill-50-color))}:host([sortable]:active){background-color:var(--table-heading-active-state-background-color, var(--core-emphasis-40-color))}:host([sort-order]) .sorting-caret{fill:var(--table-heading-sortable-variant-active-state-caret-color, var(--core-text-10-color))}:host([sort-order=\"descending\"]) .sorting-caret{transform:rotate(0deg)}:host([hidden]){display:none}.sorting-caret{margin-left:var(--table-heading-sort-icon-space-size, 8px);fill:var(--table-heading-sortable-variant-normal-state-caret-color, var(--core-text-30-color));transition:color\n    var(--core-animation-enter-transition-fast-speed-duration)\n    var(--core-animation-enter-transition-fast-speed-duration-easing);transform:rotate(180deg)}::slotted([slot=\"leading-accessory\"][size=\"image\"]){margin-right:16px;margin-left:12px}::slotted([slot=\"leading-accessory\"][size=\"icon\"]){margin-right:16px;margin-left:16px}::slotted([slot=\"trailing-accessory\"][size=\"image\"]){margin-right:12px;margin-left:16px}::slotted([slot=\"trailing-accessory\"][size=\"icon\"]){margin-right:16px;margin-left:16px}button{display:flex;align-items:center;padding:0;border:inherit;background-color:transparent;font:inherit}";
const MarketTableColumnStyle0 = marketTableColumnCss;

const MarketTableColumn = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketTableColumnStick = createEvent(this, "marketTableColumnStick", 7);
        this.marketTableColumnUnstick = createEvent(this, "marketTableColumnUnstick", 7);
        this.marketTableColumnSort = createEvent(this, "marketTableColumnSort", 7);
        this.marketTableColumnVisibilityChange = createEvent(this, "marketTableColumnVisibilityChange", 7);
        this.name = undefined;
        this.align = false;
        this.stickTo = undefined;
        this.sortable = false;
        this.sortOrder = undefined;
        this.hidden = false;
        this.index = 0;
        this.width = undefined;
        this.originalSlot = undefined;
    }
    emitVisibilityChangeEvent(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.marketTableColumnVisibilityChange.emit({
                columnName: this.name,
                hidden: newValue,
            });
        }
    }
    async emitStickyEvents(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            await this.stick(newValue);
        }
        else {
            this.unstick(newValue);
        }
    }
    /**
     * Fixes this column to the provided table edge (position)
     */
    stick(position) {
        /* If our position is different than out current stickTo value,
        then we are probably calling stick() directly from javascript, rather
        than having it be triggered from the stickTo watcher, so we want to
        update that value, which will call this function again, the values will match
        and then the event will be emitted */
        if (position !== this.stickTo) {
            this.stickTo = position;
            /* Otherwise this function has been triggered from the stickTo watcher
          by someone updating the bound property so we want to emit the event */
        }
        else {
            this.marketTableColumnStick.emit({
                position,
                index: this.index,
            });
        }
        return Promise.resolve();
    }
    /**
     * Un-fixes this column from any table edge
     */
    unstick(position) {
        this.marketTableColumnUnstick.emit({
            position,
            index: this.index,
        });
        return Promise.resolve();
    }
    /**
     * **INTERNAL [do not use directly]**
     * Moves this column into a slot inside the market-table-area
     * which is fixed to the provided edge (position), allowing
     * for fixed columns
     */
    _stickSelf(position) {
        if (position) {
            this.el.slot = `sticky-${position}`;
        }
        this.stickTo = position;
        return Promise.resolve();
    }
    /**
     * **INTERNAL [do not use directly]**
     * Moves this column back into it's original slot from a slot
     * within a fixed market-table-area
     */
    _unstickSelf() {
        if (!this.originalSlot) {
            this.el.removeAttribute('slot');
        }
        else {
            this.el.slot = this.originalSlot;
        }
        this.el.removeAttribute('stick-to');
        return Promise.resolve();
    }
    clickHandler() {
        if (this.sortable) {
            this.marketTableColumnSort.emit({
                column: this.name,
                previousSortOrder: this.sortOrder,
            });
        }
    }
    componentWillLoad() {
        this.originalSlot = this.el.getAttribute('slot');
        if (!this.name) {
            console.warn('Please set a name on <market-table-column>. Tables may not work correctly without this.'); // eslint-disable-line no-console
        }
    }
    componentDidLoad() {
        // stickTo watcher does not fire on first component load
        if (this.stickTo) {
            this.stick(this.stickTo);
        }
    }
    render() {
        return (h(Host, { key: 'de01f70eb5bef7de63a4cd77fc72d01adadbc2b5', class: "market-table-column", align: this.align === 'right' && this.align, role: "columnheader", "aria-sort": this.sortOrder, onClick: () => this.clickHandler() }, h("slot", { key: 'cafa7ea4eb183281b723bd1acd4fcd6b1171bc43', name: "leading-accessory" }), this.sortable && (
        // A11Y: This button allows screen readers to access and click on the column header.
        h("button", { key: 'eda26a17db04b3fad4ff4d0fe288195a6eeccc9c' }, h("slot", { key: '37881dbd5b4e12c5b423ea9d0d0efc31b1de500a' }), h("svg", { key: '1e210d74d75f0122fae652a4733c5f4d556a5eb8', width: "16", height: "15", viewBox: "0 0 16 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", class: "sorting-caret", "aria-hidden": "true" }, h("path", { key: '95c1ac04ae00a822fbc484cbf05ee68358937add', "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.70709 14.7071C8.31657 15.0976 7.6834 15.0976 7.29288 14.7071L0.292879 7.7071L1.70709 6.29289L6.99999 11.5858L6.99999 -7.612e-07L8.99999 -5.86354e-07L8.99999 11.5858L14.2929 6.29289L15.7071 7.70711L8.70709 14.7071Z" })))), !this.sortable && h("slot", { key: '56146bd9c9a751c9de482596423f5ff8e1f70484' }), h("slot", { key: 'a9c0f4ae4ccd08a29c76272ac4e9717a89744a5e', name: "trailing-accessory" })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "hidden": ["emitVisibilityChangeEvent"],
        "stickTo": ["emitStickyEvents"]
    }; }
};
MarketTableColumn.style = MarketTableColumnStyle0;

export { MarketTableColumn as market_table_column };

//# sourceMappingURL=market-table-column.entry.js.map