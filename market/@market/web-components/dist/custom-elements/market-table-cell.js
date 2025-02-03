import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const marketTableCellCss = ":host{position:relative;display:flex;justify-content:flex-start;align-items:center;overflow:hidden;padding:var(--table-cell-vertical-padding-size, 12px) var(--table-cell-horizontal-padding-size, 8px);background-color:var(--table-cell-state-normal-background-color, var(--core-surface-10-color));font-weight:var(--table-cell-primary-text-font-weight, var(--core-type-paragraph-20-weight));font-size:var(--table-cell-primary-text-font-size, var(--core-type-paragraph-20-size));line-height:var(--table-cell-primary-text-line-height, var(--core-type-paragraph-20-leading));text-overflow:ellipsis}:host([align=\"right\"]){justify-content:flex-end}:host([align=\"right\"]) .sorting-caret{order:-1;margin-right:var(--table-heading-sort-icon-space-size, 8px);margin-left:0}:host([stickTo=\"left\"]){position:sticky;grid-area:left;border-right:var(--table-fixed-column-border-width, 1px)\n      solid\n      var(--table-fixed-column-border-color, var(--core-divider-20-color))}:host([stickTo=\"right\"]){grid-area:right;border-left:var(--table-fixed-column-border-width, 1px)\n      solid\n      var(--table-fixed-column-border-color, var(--core-divider-20-color))}:host{--transition-duration:0.2s;transition:background-color var(--transition-duration)}@media (hover: hover){:host{}:host([interactive]:hover){background-color:var(--table-cell-hover-state-background-color)}}:host([interactive]){cursor:pointer}:host([interactive]:focus){outline:none;}:host([interactive]:not([disabled]):focus){background-color:var(--table-cell-focus-state-background-color)}:host([active]),:host([interactive]:not([disabled]):active){background-color:var(--table-cell-pressed-state-background-color)}:host([interactive][disabled]){pointer-events:none}:host([disabled]){background-color:transparent;color:var(--table-cell-disabled-state-text-color);pointer-events:none}:host([hidden]){display:none}:host(:first-of-type){padding-left:var(--table-cell-padding, 8px)}:host(:first-of-type) ::slotted(button){all:unset;display:flex;justify-content:space-between;align-items:center;padding-right:var(--core-metrics-spacing-100);padding-left:calc(\n        var(--cell-indent-level) *\n        var(--table-row-indentation-padding, 40px) +\n        var(--core-metrics-spacing-100)\n      );color:var(--table-cell-normal-state-content-color, var(--core-fill-black-color));cursor:pointer}:host(:first-of-type) ::slotted(button):focus-visible{outline:none}:host(:first-of-type) ::slotted(button):focus{color:var(--table-accordion-focus-state-content-color, var(--core-fill-black-color))}:host(:first-of-type) ::slotted(button):hover{color:var(--table-accordion-hover-state-content-color, var(--core-fill-black-color))}:host(:first-of-type) ::slotted(button):active{color:var(--table-accordion-pressed-state-content-color, var(--core-fill-black-color))}:host(:first-of-type) ::slotted([slot=\"nested-row-indicator\"]){height:100%}::slotted([slot=\"leading-accessory\"][size=\"image\"]){margin-right:16px;margin-left:12px}::slotted([slot=\"leading-accessory\"][size=\"icon\"]){margin-right:16px;margin-left:16px}::slotted([slot=\"trailing-accessory\"][size=\"image\"]){margin-right:12px;margin-left:16px}::slotted([slot=\"trailing-accessory\"][size=\"icon\"]){margin-right:16px;margin-left:16px}::slotted([slot=\"nested-row-indicator\"]){color:var(--table-cell-normal-state-content-color, var(--core-fill-black-color))}::slotted([slot=\"nested-row-indicator\"]:focus-visible){outline:none}::slotted([slot=\"nested-row-indicator\"]:focus){color:var(--table-accordion-focus-state-content-color, var(--core-fill-black-color))}::slotted([slot=\"nested-row-indicator\"]:hover){color:var(--table-accordion-hover-state-content-color, var(--core-fill-black-color))}::slotted([slot=\"nested-row-indicator\"]:active){color:var(--table-accordion-pressed-state-content-color, var(--core-fill-black-color))}";
const MarketTableCellStyle0 = marketTableCellCss;

const MarketTableCell$1 = /*@__PURE__*/ proxyCustomElement(class MarketTableCell extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketTableCellClicked = createEvent(this, "marketTableCellClicked", 7);
        this.align = false;
        this.column = undefined;
        this.leadingIndentation = 0;
        this.active = false;
        this.interactive = false;
        this.disabled = false;
        this.originalSlot = undefined;
        this.hidden = false;
    }
    /**
     * **INTERNAL [do not use directly]**
     * Forwards appropriate properties from matching header market-table-column element to this cell.
     */
    _updateColumnRelatedProperties(column) {
        if (!column) {
            return Promise.resolve();
        }
        this.column = column.name;
        this.align = column.align;
        this.hidden = column.hidden;
        if (column.stickTo) {
            this._stickSelf(column.stickTo);
        }
        return Promise.resolve();
    }
    /**
     * **INTERNAL [do not use directly]**
     * Sets properties specified in the row element. Leading and trailing
     * accessories are best set on the first or last cell to not mess
     * with the grid structure
     * @param rowEl
     */
    _updateFirstCellProperties(rowEl) {
        this.leadingIndentation = rowEl.leadingIndentation || 0;
        // Sets leading accessory level of indentation on current row
        this.el.style.setProperty('--cell-indent-level', `${this.leadingIndentation}`);
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
        return Promise.resolve();
    }
    componentWillLoad() {
        this.originalSlot = this.el.getAttribute('slot');
    }
    handleClick() {
        if (this.interactive) {
            this.marketTableCellClicked.emit();
        }
    }
    handleKeydown(e) {
        // don't intercept keydown of descendant elements
        // e.g. when typing into nested input fields (gross)
        if (e.target !== this.el) {
            return;
        }
        switch (e.key) {
            case 'Enter':
                this.handleClick();
                break;
            case ' ':
                this.handleClick();
                e.preventDefault(); // spacebar should not scroll page
                break;
        }
    }
    render() {
        const { disabled, interactive, align, hidden } = this;
        return (h(Host, { key: '1bb91d3a4d5fcf5d7a27b3fa9af90f548f5e5e68', class: "market-table-cell", role: "cell", align: align === 'right' && align, hidden: hidden, tabindex: interactive && !disabled ? '0' : null, onClick: () => this.handleClick(), onKeydown: (e) => this.handleKeydown(e) }, h("slot", { key: 'e97ec19689f887c5e25949a69c28c41d56fd0e84', name: "nested-row-indicator" }), h("slot", { key: 'b9c46c7522d68ee674fed3eb04195924215a78c9', name: "leading-accessory" }), h("slot", { key: '9a15f89b0c3b4bd2939fcf713872a08978193400' }), h("slot", { key: '8094c84e509ca8854f87d56d34268544090bee78', name: "trailing-accessory" })));
    }
    get el() { return this; }
    static get style() { return MarketTableCellStyle0; }
}, [1, "market-table-cell", {
        "align": [1032],
        "column": [1537],
        "leadingIndentation": [1026, "leading-indentation"],
        "active": [516],
        "interactive": [516],
        "disabled": [516],
        "originalSlot": [32],
        "hidden": [32],
        "_updateColumnRelatedProperties": [64],
        "_updateFirstCellProperties": [64],
        "_stickSelf": [64],
        "_unstickSelf": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-table-cell"];
    components.forEach(tagName => { switch (tagName) {
        case "market-table-cell":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketTableCell$1);
            }
            break;
    } });
}

const MarketTableCell = MarketTableCell$1;
const defineCustomElement = defineCustomElement$1;

export { MarketTableCell, defineCustomElement };

//# sourceMappingURL=market-table-cell.js.map