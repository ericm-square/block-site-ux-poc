import { Host, h } from "@stencil/core";
import { isEqual, throttle } from "lodash-es";
import { getNamespacedTagFor } from "../../utils/namespace";
import { parsedGridTemplateColumnValues } from "./utils";
const RESIZE_DEBOUNCE_DURATION = 16; // 60fps
/**
 * @slot - Default slot for all rows
 *
 * @slot header - Slot for header rows at the top of the table. Slotting a header row is required to set custom column
 * widths.
 *
 * **NOTE:** slotting rows into this area will not sticky rows to the top. Use `sticky` or
 * `stick-to="top"` on the row element instead.
 *
 * @slot footer - Slot for footer rows at the bottom of the table
 *
 * **NOTE:** slotting rows into this area will not sticky rows to the bottom. Use `sticky` or
 * `stick-to="bottom"` on the row element instead.
 */
export class MarketTable {
    constructor() {
        this.observers = {};
        this.throttledDetectStyleDeclaration = throttle(this.detectStyleDeclaration.bind(this), RESIZE_DEBOUNCE_DURATION);
        this.styleDeclaration = undefined;
        this.gridColumnTemplate = undefined;
        this.allColumns = [];
        this.visibleColumns = [];
        this.columnsStuckLeft = [];
        this.columnsStuckRight = [];
        this.columnsUnstuck = [];
        this.allRows = [];
        this.rowsStuckTop = [];
        this.rowsStuckBottom = [];
        this.rowsUnstuck = [];
        this.hasAccordionRows = false;
    }
    /* Everytime the computed CSS style for this element is updated, we want to
      mutate the grid template definition, and save whatever template they have set
      to our grid definition so we know what size the columns are */
    styleDeclarationObserver(newValue, oldValue) {
        /* lodash's `isEqual` should not be used on CSSStyleDeclaration as it's vulnerable to prototype pollution causing false negatives
        and modifying the data in place. More at https://square.slack.com/archives/C06RMPM072N/p1717600186722089 */
        if (newValue !== oldValue) {
            /* unset this.gridColumnTemplate value when there is no explicit grid-template-columns style
              in this situation, the computed value of grid-template-columns === the width of the element
              https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value */
            if (newValue.getPropertyValue('grid-template-columns') === newValue.getPropertyValue('width')) {
                this.gridColumnTemplate = [];
                return;
            }
            /* when there is an explicit grid-template-columns style, update this.gridColumnTemplate */
            const gridTemplateColumnsValue = parsedGridTemplateColumnValues(newValue.getPropertyValue('grid-template-columns'));
            if (!isEqual(gridTemplateColumnsValue, this.gridColumnTemplate)) {
                this.gridColumnTemplate = gridTemplateColumnsValue;
            }
        }
    }
    /* When the grid template changes, forward it's value to the child sections.
    Use an observer instead of binding in the template to prevent polluting
    the DOM with unneeded attributes */
    gridTemplateObserver(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.setColumnWidths(newValue);
            this.updateGridLayout();
        }
    }
    /* If the columns change, forward their values to the child rows, and update
    the column count */
    allColumnsObserver(columns, oldValue) {
        if (columns && (!oldValue || columns !== oldValue)) {
            this.setColumnWidths(this.gridColumnTemplate);
            this.forwardColumnPropertiesToCells(this.allColumns);
            this.updateGridLayout();
        }
    }
    allRowsObserver(rows, oldValue) {
        if (rows !== oldValue && rows) {
            this.updateGridLayout();
            this.forwardColumnPropertiesToCells(this.allColumns);
            this.updateStickyRows();
        }
    }
    stuckRowsObserver(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.allRows.map((row) => row.classList.remove('buffer-row'));
            if (this.rowsStuckTop.length > 0) {
                this.rowsStuckTop[this.rowsStuckTop.length - 1].classList.add('buffer-row');
            }
            if (this.rowsUnstuck.length > 0 && this.rowsStuckBottom.length > 0) {
                this.rowsUnstuck[this.rowsUnstuck.length - 1].classList.add('buffer-row');
            }
        }
    }
    marketTableHeaderLoadedEventHandler({ detail }) {
        this.allColumns = [...detail.columns];
        this.checkColumnVisibility();
    }
    marketTableRowStickEventHandler({ target, detail }) {
        switch (detail.position) {
            case 'top':
                target.slot = 'sticky-header';
                break;
            case 'bottom':
                target.slot = 'sticky-footer';
                break;
            default:
                // eslint-disable-next-line no-console
                console.warn('could not stick row to an unknown position');
                break;
        }
        this.updateStickyRows();
    }
    marketTableRowUnstickEventHandler({ target }) {
        /* If the row was originally in a named slot, we want to put the
        row back into that slot */
        if (target.originalSlot) {
            target.slot = target.originalSlot;
            /* Otherwise we just remove the slot attribute so it will return
          to the default slot */
        }
        else {
            target.removeAttribute('slot');
        }
        this.updateStickyRows();
    }
    async marketTableColumnStickEventHandler({ target, detail }) {
        // Stick each cell to the correct side in the row
        await Promise.all([...this.allRows].map(async (row) => {
            await row._stickColumn(target.name, detail.position);
        }));
        this.updateGridLayout();
    }
    async marketTableColumnUnstickEventHandler({ target }) {
        await Promise.all([...this.allRows].map(async (row) => {
            await row._unstickColumn(target.name);
        }));
        this.updateGridLayout();
    }
    marketTableColumnVisibilityChangeHandler({ detail }) {
        this.checkColumnVisibility();
        this.allRows.forEach((row) => row._syncColumnVisibilityWithCells(detail.columnName, detail.hidden));
        this.detectStyleDeclaration();
    }
    checkColumnVisibility() {
        this.visibleColumns = this.allColumns.filter((column) => !column.hidden);
    }
    setColumnWidths(gridTemplate) {
        if (this.allColumns.length > 0) {
            this.visibleColumns.forEach((column, i) => {
                column.width = gridTemplate[i];
            });
        }
    }
    forwardColumnPropertiesToCells(columns) {
        this.allRows.forEach((row) => (row.tableColumns = columns));
    }
    updateGridLayout() {
        if (this.allColumns.length > 0) {
            this.columnsUnstuck = this.visibleColumns.filter((column) => !column.stickTo);
            this.columnsStuckLeft = this.visibleColumns.filter((column) => column.stickTo === 'left');
            this.columnsStuckRight = this.visibleColumns.filter((column) => column.stickTo === 'right');
            const mainGrid = this.columnsUnstuck.map((column) => column.width);
            const leftGrid = this.columnsStuckLeft.map((column) => column.width);
            const rightGrid = this.columnsStuckRight.map((column) => column.width);
            if (this.allRows.length > 0) {
                this.allRows.forEach((row) => {
                    row.gridTemplateMain = mainGrid;
                    row.gridTemplateLeft = leftGrid;
                    row.gridTemplateRight = rightGrid;
                });
            }
        }
    }
    updateStickyRows() {
        this.rowsStuckTop = this.allRows.filter((row) => (row.sticky && row.header) || row.stickTo === 'top');
        this.rowsStuckBottom = this.allRows.filter((row) => (row.sticky && row.footer) || row.stickTo === 'bottom');
        this.rowsUnstuck = this.allRows.filter((row) => !row.stickTo && !row.sticky);
    }
    /* If the slotted content of the table changes, we need to update
    our saved copy of the section and column children */
    handleSlotChange() {
        // Get all the child rows
        this.allRows = [...this.el.querySelectorAll(getNamespacedTagFor('market-table-row'))];
        // Check for root accordion fields or default to passed in prop
        const hasAccordionElements = [...this.el.children].some((element) => {
            return element.tagName.toLowerCase() === getNamespacedTagFor('market-accordion-item');
        }) || this.hasAccordionRows;
        /* Set an index for each row so we have some sort of id and can track it
        this will perhaps come in useful later when we need to add a row re-ordering
        drag & drop feature (although we probably need some conditional, or to set
        the index somewhere else than here) - jbiggs */
        this.allRows.forEach((row) => {
            row.index = Array.prototype.indexOf.call(this.allRows, row);
            row.nested = hasAccordionElements;
        });
    }
    /**
     * Gets current CSSStyleDeclaration object for this.el (see styleDeclarationObserver)
     */
    detectStyleDeclaration() {
        this.styleDeclaration = window.getComputedStyle(this.el);
    }
    /**
     * Supports setting dynamic column sizes using CSS media queries by recalculating column width on table resize
     */
    initResizeObserver() {
        if (!this.observers.resize) {
            this.observers.resize = new ResizeObserver(() => {
                window.requestAnimationFrame(() => {
                    this.throttledDetectStyleDeclaration();
                });
            });
            this.observers.resize.observe(this.el);
        }
    }
    /**
     * Supports setting dynamic column widths by updating inline styles
     */
    initInlineStyleObserver() {
        if (!this.observers.inlineStyle) {
            this.observers.inlineStyle = new MutationObserver(() => this.detectStyleDeclaration());
            this.observers.inlineStyle.observe(this.el, {
                attributes: true,
                attributeFilter: ['style'],
            });
        }
    }
    /**
     * since onSlotchange only fires on changes to the <Host> node itself (not changes to the child slots of the
     * <market-table-area>s), we're using a mutation observer to listen for added rows or changes in row content
     * https://github.com/ionic-team/stencil/issues/232#issuecomment-397871813
     */
    initContentObserver() {
        if (!this.observers.content) {
            this.observers.content = new MutationObserver(() => this.handleSlotChange());
            this.observers.content.observe(this.el, {
                childList: true,
                subtree: true,
                characterData: true,
            });
        }
    }
    /* When the component loads, we need to check for a grid-template-columns
    CSS declaration on the table, and also read the column children
    Setting both of these will trigger watcher functions which forward these
    values to the row children */
    componentWillLoad() {
        this.detectStyleDeclaration();
        this.handleSlotChange();
    }
    componentDidLoad() {
        this.initResizeObserver();
        this.initInlineStyleObserver();
        this.initContentObserver();
    }
    render() {
        const MarketTableAreaTagName = getNamespacedTagFor('market-table-area');
        return (h(Host, { key: '750ac6164e83749b5758c5f20c91f6a6d988af91', class: "market-table", role: "table", onSlotchange: () => this.handleSlotChange() }, h(MarketTableAreaTagName, { key: '8bc1b426fbad9c7304f6bda63db8601b45f97b99', orientation: "horizontal", "stick-to": "top", active: this.rowsStuckTop.length > 0 }, h("slot", { key: '2ab3c201d6e338fbb397cc36cfc6fbc9d038bcb6', name: "sticky-header" })), h(MarketTableAreaTagName, { key: '07bfd6ecb2f17bb9e638c785f011da78f2b8862f', orientation: "horizontal", active: true }, h("slot", { key: 'ca54212375991cbac6de49408d2f96f2c48da7ba', name: "header" }), h("slot", { key: 'e94324ff706ca1c4042012ff1023b987afdc6f22' }), h("slot", { key: '6cc3e5e907e99aae0da23475a78a0bde71b15a5f', name: "footer" })), h(MarketTableAreaTagName, { key: '7f7a445262d602d1663ce17a6045757fc0120707', orientation: "horizontal", "stick-to": "bottom", active: this.rowsStuckBottom.length > 0 }, h("slot", { key: 'fcc44e81dccc24f0eebbd83847628a92179df269', name: "sticky-footer" }))));
    }
    disconnectedCallback() {
        Object.values(this.observers).forEach((observer) => {
            observer === null || observer === void 0 ? void 0 : observer.disconnect();
        });
    }
    static get is() { return "market-table"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-table.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-table.css"]
        };
    }
    static get states() {
        return {
            "styleDeclaration": {},
            "gridColumnTemplate": {},
            "allColumns": {},
            "visibleColumns": {},
            "columnsStuckLeft": {},
            "columnsStuckRight": {},
            "columnsUnstuck": {},
            "allRows": {},
            "rowsStuckTop": {},
            "rowsStuckBottom": {},
            "rowsUnstuck": {},
            "hasAccordionRows": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "styleDeclaration",
                "methodName": "styleDeclarationObserver"
            }, {
                "propName": "gridColumnTemplate",
                "methodName": "gridTemplateObserver"
            }, {
                "propName": "allColumns",
                "methodName": "allColumnsObserver"
            }, {
                "propName": "visibleColumns",
                "methodName": "allColumnsObserver"
            }, {
                "propName": "allRows",
                "methodName": "allRowsObserver"
            }, {
                "propName": "rowsStuckTop",
                "methodName": "stuckRowsObserver"
            }, {
                "propName": "rowsStuckBottom",
                "methodName": "stuckRowsObserver"
            }, {
                "propName": "rowsUnstuck",
                "methodName": "stuckRowsObserver"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketTableHeaderLoaded",
                "method": "marketTableHeaderLoadedEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketTableRowStick",
                "method": "marketTableRowStickEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketTableRowUnstick",
                "method": "marketTableRowUnstickEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketTableColumnStick",
                "method": "marketTableColumnStickEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketTableColumnUnstick",
                "method": "marketTableColumnUnstickEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketTableColumnVisibilityChange",
                "method": "marketTableColumnVisibilityChangeHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-table.js.map
