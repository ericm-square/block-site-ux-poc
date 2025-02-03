import { EventEmitter } from '../../stencil-public-runtime';
import { MarketCheckboxCustomEvent, MarketToggleCustomEvent } from '../../components';
export type TCell = HTMLMarketTableCellElement | HTMLMarketTableColumnElement;
/**
 * @slot - Default slot for all cells
 * @slot control - Intended for use with a market table cell or market table column that contain a control element.
 */
export declare class MarketTableRow {
    private tableAreaLeft;
    private tableAreaRight;
    private tableAreaMain;
    private slottedControl;
    el: HTMLMarketTableRowElement;
    /**
     * Optional: Level of leading indentation
     * This will be multiplied by the default indentation size (40px) for uniform indentation
     * levels
     */
    leadingIndentation: number;
    /**
     * Optional: The edge of the table to fix this row to.
     */
    stickTo: false | 'top' | 'bottom';
    /**
     * Optional: When present, can be used instead of `stickTo` in combination
     * with `header` or `footer` to determine the edge of the table to stick this
     * row to. (`header` elements with `[sticky]` will be attached to the top, and
     * `footer` elements to the bottom)
     */
    sticky: boolean;
    /**
     * Whether the row is currently active.
     */
    readonly active: boolean;
    /**
     * Whether or not the row is interactive. Results in row receiving
     * hover and active styling when hovered/clicked.
     */
    readonly interactive: boolean;
    /**
     * Whether the row is disabled.
     */
    readonly disabled: boolean;
    /**
     * Whether the row is selected. Used by control element.
     */
    selected: boolean;
    /**
     * Gives this row header styling
     */
    header: boolean;
    /**
     * Gives this row footer styling
     */
    footer: boolean;
    /**
     * The slot this row was originally placed in
     */
    originalSlot: string;
    /**
     * **INTERNAL [do not use directly]**
     * The order of this row in the DOM
     */
    readonly index: number;
    /**
     * **INTERNAL [do not use directly]**
     * A list of the market-table-column elements, set from the parent table so
     * we can assign this row's cells some properties based on the columns
     */
    readonly tableColumns: Array<HTMLMarketTableColumnElement>;
    /**
     * **INTERNAL [do not use directly]**
     * This row's slotted market-table-cell elements
     */
    cells: NodeListOf<TCell>;
    /**
     * **INTERNAL [do not use directly]**
     * Used to set the CSS grid template for the main column group (market-table-area)
     * in the row. Set by the parent table element
     */
    readonly gridTemplateMain: Array<string>;
    /**
     * **INTERNAL [do not use directly]**
     * Used to set the CSS grid template for the fixed left column group (market-table-area)
     * in the row. Set by the parent table element
     */
    readonly gridTemplateLeft: Array<string>;
    /**
     * **INTERNAL [do not use directly]**
     * Used to set the CSS grid template for the fixed right column group (market-table-area)
     * in the row. Set by the parent table element
     */
    readonly gridTemplateRight: Array<string>;
    /**
     * **INTERNAL [do not use directly]**
     * Used to set aria-expanded on the nested button for animation
     */
    expanded: boolean;
    /**
     * Used to determine if the table has accordion rows. When true,
     * it will add extra spacing at the beginning of the row. This will
     * keep the row's contents aligned with the accordion rows. This is
     * set from the market-table component.
     *
     * This property can be overriden when the content does not need
     * the extra accordion spacing.
     */
    nested: boolean;
    /** This is a CSSStyleDeclaration object
     * https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
     */
    styleDeclaration: any;
    /**
     * Used to set the CSS grid template for the row itself
     */
    gridTemplate: Array<string>;
    /**
     * Used to update the button's aria-expanded
     */
    nestedRowToggleButton: HTMLButtonElement;
    /**
     * **INTERNAL [do not use directly]**
     * If this is a header row with column children, emit an event when this row loads
     * so the parent table can read the column data
     */
    marketTableHeaderLoaded: EventEmitter<{
        columns: NodeListOf<HTMLMarketTableColumnElement>;
    }>;
    /**
     * Fired whenever an interactive row is clicked.
     */
    marketTableRowClicked: EventEmitter;
    /**
     * Emitted when this row is stuck to a table edge
     * Can be fired when stick-to or sticky changes, the .stick() method is called directly
     * or when this row is first rendered or slotted
     */
    marketTableRowStick: EventEmitter<{
        position: 'left' | 'right';
        index: number;
    }>;
    /**
     * Emitted when this row is unstuck from a table edge
     * Can be fired when stick-to or sticky changes, the .unstick() method is called directly
     * or when this row is first rendered or slotted
     */
    marketTableRowUnstick: EventEmitter<{
        position: 'left' | 'right';
        index: number;
    }>;
    /**
     * Emitted when the nested row button is toggled
     */
    marketAccordionToggled: EventEmitter<{
        expanded: boolean;
    }>;
    /**
     * Emitted when the nested row button is toggled
     */
    marketNestedRowToggled: EventEmitter<{
        expanded: boolean;
    }>;
    formNewGridTemplate(): void;
    gridTemplateObserver(newValue: Array<string>, oldValue: Array<string>): void;
    stickyObserver(newValue: string | boolean, oldValue: string | boolean): void;
    columnsObserver(columns: Array<HTMLMarketTableColumnElement>): void;
    updateCellProperties(oldCellList: NodeListOf<HTMLMarketTableCellElement>, newCellList: NodeListOf<HTMLMarketTableCellElement>): void;
    updateFirstCellProperties(): void;
    updateNestedRowButton(): void;
    updateSlottedControlCheckedValue(): void;
    updateSlottedControlDisabledValue(): void;
    handleMarketCheckboxValueChange(event: MarketCheckboxCustomEvent<{
        current: boolean;
    }> | MarketToggleCustomEvent<{
        current: boolean;
    }>): void;
    /**
     * Sticks this row to the provided edge (position) of the table
     */
    stick(position?: 'top' | 'bottom'): Promise<void>;
    /**
     * Unsticks this row from any edge of the table
     */
    unstick(): Promise<void>;
    /**
     * **INTERNAL [do not use directly]**
     * Used by the parent table to support fixing columns to either side of the table
     */
    _stickColumn(column: string, position: 'left' | 'right'): Promise<void>;
    /**
     * **INTERNAL [do not use directly]**
     * Used by the parent table to support fixing columns to either side of the table
     */
    _unstickColumn(column: string): Promise<void>;
    /**
     * **INTERNAL [do not use directly]**
     * Sets the hidden prop on market-table-cell. Used by market-table to allow market-table-column
     * to control the hidden/visible state of its associated table cells.
     */
    _syncColumnVisibilityWithCells(columnName: any, hidden: any): Promise<void>;
    /**
     * **INTERNAL [do not use directly]**
     * Sets properties computed or specified on the row on the first
     * cell to keep the table rows from shifting
     */
    _setFirstCellProperties(): Promise<void>;
    /**
     * Sets the leadingIndentation
     * @param leadingIndentation
     */
    setLeadingIndentation(leadingIndentation: number): Promise<void>;
    /**
     * Sets expanded property and emits nested row toggle event
     */
    toggleNestedRow(): Promise<void>;
    /**
     * Checks type of cell to make Typescript happy about using functions that are only on
     * HTMLMarketTableCellElement and not HTMLMarketTableColumnElement
     * @param cell
     * @returns
     */
    isStylableCell(cell: TCell): cell is HTMLMarketTableCellElement;
    setCellColumnProperties(columns: Array<HTMLMarketTableColumnElement>): void;
    emitStickyEvents(): void;
    componentWillLoad(): void;
    handleSlotChange(): void;
    _getMarketRowElement(element: any): any;
    componentLoaded: Boolean;
    _addCaretButtonToFirstCell(): void;
    _registerSlottedControl(): void;
    componentDidRender(): void;
    componentDidLoad(): void;
    handleClick(e: any): void;
    handleKeydown(e: any): void;
    render(): any;
}
