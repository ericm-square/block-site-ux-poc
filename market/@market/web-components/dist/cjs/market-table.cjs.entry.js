'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const index$1 = require('./index-254d04f0.js');
const throttle = require('./throttle-88e2e29a.js');
const _baseIsEqual = require('./_baseIsEqual-9956408d.js');
require('./isObject-7dcf0083.js');
require('./isSymbol-fbd13c73.js');
require('./_arrayPush-24af5aa3.js');
require('./_getNative-666f22b9.js');
require('./_Map-07e1b6b7.js');
require('./_getTag-7be0e78a.js');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return _baseIsEqual.baseIsEqual(value, other);
}

/**
 * Parses a CSS grid-template-columns declaration and attempts to return an array with one entry for each column.
 *
 * @param {string} cssPropertyValue - Value of the `grid-template-columns` property.
 *
 * Example inputs and outputs:
 * '100px 80px 50px' --> ['100px', '80px', '50px']
 * '100px repeat(2, 80px)' --> ['100px', '80px', '80px']
 * '100px repeat(3, 50px, 75px)' --> ['100px', '50px', '75px', '50px']
 * 'repeat(2, 80px) repeat(3, 50px, 75px) 100px' --> ['80px', '80px', '50px', '75px', '50px', '100px']
 *
 * Why do we need this?
 * `market-table` has a `styleDeclaration` watcher which checks the CSS styles applied to the table. this gets used to
 * determine the grid template definition for the table (`this.gridColumnTemplate`), which in turn is used to set column
 * widths and update the grid layout. however, in situations where `grid-template-columns` is defined using the
 * `repeat()` function, we need to parse the value to ensure that we have a width explicitly specified for each column.
 * this ensures consistent column sizing and behavior when columns are being stuck/unstuck to the left/right.
 *
 * Cases where this will break:
 * 1. If user is using <auto-repeat> values ("auto-fill", "auto-fit") instead of explicit widths
 * 2. If user is using a CSS function other than `repeat()` (ex. `minmax()`, `fit-content()`)
 * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
 * https://developer.mozilla.org/en-US/docs/Web/CSS/repeat
 */
const parsedGridTemplateColumnValues = (cssPropertyValue) => {
    const array = cssPropertyValue.split(' '); // ex. '100px repeat(2, 80px)' --> ['100px', 'repeat(2', '80px)']
    // error handling for unsupported cases
    const unsupportedValues = ['auto-fill', 'auto-fit', 'minmax', 'fit-content'];
    const matches = unsupportedValues.filter((value) => cssPropertyValue.includes(value));
    const unsupportedValuesText = `${matches.length > 0 ? 'features' : 'feature'} ${matches
        .map((match) => `\`${match}\``)
        .join(', ')}`;
    if (matches.length > 0) {
        // eslint-disable-next-line no-console
        console.warn(`<market-table>'s grid layout is not built to support the use of the CSS ${unsupportedValuesText}.
To avoid potential column layout issues, try using explicitly defined \`grid-template-column\` widths using length, percentage, or flex units.`);
        // while this seems wonky (will return an array like ['repeat(auto-fill,', '250px)']), it means that table rows will
        // inherit the parent table's `grid-template-columns` declaration and will look as intended except for in situations
        // where columns are being stuck/unstuck.
        return array;
    }
    const output = [];
    let i = 0;
    let repeatedColCount = null;
    for (i = 0; i < array.length; i++) {
        const item = array[i];
        // check to see if we are at the start of a `repeat` block
        if (item.includes('repeat(')) {
            // get number of repeats, ex. "repeat(4" --> 4)
            repeatedColCount = Number.parseInt(item.match(/\d+/).toString(), 10);
            // figure out what's being repeated
            // look ahead from current index to the next index containing ")" (the end of the repeat block)
            const endOfRepeatFunctionIndex = array.findIndex((item, index) => index > i && item.includes(')'));
            // slice grid-template-columns values into their own array and strip parens/commas
            const repeatedValues = array.slice(i + 1, endOfRepeatFunctionIndex + 1).map((item) => item.replace(/\W/, ''));
            // push as many values from the set of repeating column sizes as are needed
            for (let j = 0; j < repeatedColCount; j++) {
                output.push(repeatedValues[j % repeatedValues.length].toString());
            }
            // reset repeatedColCount bc we're done w/ the repeat block
            repeatedColCount = null;
            // increment for loop to skip all the items we just dealt with
            i += repeatedValues.length;
        }
        else if (!repeatedColCount) {
            // if not in a `repeat()` block, save value as normal
            output.push(item);
        }
    }
    return output;
};

const marketTableCss = ":host{position:relative;display:grid;grid-auto-columns:1fr;grid-auto-flow:rows;overflow-x:clip;height:auto}::slotted(.market-table-row:last-of-type:not([slot=\"header\"])),::slotted(.market-table-row.buffer-row){border-bottom:none !important;}";
const MarketTableStyle0 = marketTableCss;

const RESIZE_DEBOUNCE_DURATION = 16; // 60fps
const MarketTable = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.observers = {};
        this.throttledDetectStyleDeclaration = throttle.throttle(this.detectStyleDeclaration.bind(this), RESIZE_DEBOUNCE_DURATION);
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
        this.allRows = [...this.el.querySelectorAll(index$1.getNamespacedTagFor('market-table-row'))];
        // Check for root accordion fields or default to passed in prop
        const hasAccordionElements = [...this.el.children].some((element) => {
            return element.tagName.toLowerCase() === index$1.getNamespacedTagFor('market-accordion-item');
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
        const MarketTableAreaTagName = index$1.getNamespacedTagFor('market-table-area');
        return (index.h(index.Host, { key: '750ac6164e83749b5758c5f20c91f6a6d988af91', class: "market-table", role: "table", onSlotchange: () => this.handleSlotChange() }, index.h(MarketTableAreaTagName, { key: '8bc1b426fbad9c7304f6bda63db8601b45f97b99', orientation: "horizontal", "stick-to": "top", active: this.rowsStuckTop.length > 0 }, index.h("slot", { key: '2ab3c201d6e338fbb397cc36cfc6fbc9d038bcb6', name: "sticky-header" })), index.h(MarketTableAreaTagName, { key: '07bfd6ecb2f17bb9e638c785f011da78f2b8862f', orientation: "horizontal", active: true }, index.h("slot", { key: 'ca54212375991cbac6de49408d2f96f2c48da7ba', name: "header" }), index.h("slot", { key: 'e94324ff706ca1c4042012ff1023b987afdc6f22' }), index.h("slot", { key: '6cc3e5e907e99aae0da23475a78a0bde71b15a5f', name: "footer" })), index.h(MarketTableAreaTagName, { key: '7f7a445262d602d1663ce17a6045757fc0120707', orientation: "horizontal", "stick-to": "bottom", active: this.rowsStuckBottom.length > 0 }, index.h("slot", { key: 'fcc44e81dccc24f0eebbd83847628a92179df269', name: "sticky-footer" }))));
    }
    disconnectedCallback() {
        Object.values(this.observers).forEach((observer) => {
            observer === null || observer === void 0 ? void 0 : observer.disconnect();
        });
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "styleDeclaration": ["styleDeclarationObserver"],
        "gridColumnTemplate": ["gridTemplateObserver"],
        "allColumns": ["allColumnsObserver"],
        "visibleColumns": ["allColumnsObserver"],
        "allRows": ["allRowsObserver"],
        "rowsStuckTop": ["stuckRowsObserver"],
        "rowsStuckBottom": ["stuckRowsObserver"],
        "rowsUnstuck": ["stuckRowsObserver"]
    }; }
};
MarketTable.style = MarketTableStyle0;

exports.market_table = MarketTable;

//# sourceMappingURL=market-table.cjs.entry.js.map