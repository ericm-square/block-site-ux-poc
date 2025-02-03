import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - Default slot for content
 * @slot leading-accessory - Intended for use with a leading accessory.
 * @slot trailing-accessory - Intended for use with a trailing accessory.
 */
export declare class MarketTableCell {
    el: HTMLMarketTableCellElement;
    /**
     * Content/text alignment for this cell, default is set based on the alignment of the
     * market-table-column with matching column/name prop
     *
     * **NOTE:** this is set automatically when used in a `market-table` with a corresponding
     * `market-table-column`.
     */
    align: false | 'left' | 'right';
    /**
     * A key that matches the 'name' prop on the appropriate market-table-column
     *
     * **NOTE:** this is set automatically when used in a `market-table` with a corresponding
     * `market-table-column`.
     */
    column: string;
    /**
     * Determines how much to indent the cell by.
     * This will be multiplied by the default indentation size (40px) for uniform indentation levels
     *
     * **NOTE:** this is inherited automatically if set on the parent `market-table-row`.
     */
    leadingIndentation: number;
    /**
     * Whether the cell is currently active.
     */
    readonly active: boolean;
    /**
     * Whether or not the cell is interactive. Results in cell receiving
     * hover and active styling when hovered/clicked.
     */
    readonly interactive: boolean;
    /**
     * Whether the cell is disabled.
     */
    readonly disabled: boolean;
    /**
     * Fired whenever an interactive cell is clicked.
     */
    marketTableCellClicked: EventEmitter;
    /**
     * The slot this element was originally placed in
     */
    originalSlot: string;
    /**
     * Whether or not the table cell is hidden.
     *
     * **NOTE:** this is derived from the hidden prop of the corresponding
     * `market-table-column`, if one exists
     */
    hidden: boolean;
    /**
     * **INTERNAL [do not use directly]**
     * Forwards appropriate properties from matching header market-table-column element to this cell.
     */
    _updateColumnRelatedProperties(column: HTMLMarketTableColumnElement): Promise<void>;
    /**
     * **INTERNAL [do not use directly]**
     * Sets properties specified in the row element. Leading and trailing
     * accessories are best set on the first or last cell to not mess
     * with the grid structure
     * @param rowEl
     */
    _updateFirstCellProperties(rowEl: HTMLMarketTableRowElement): Promise<void>;
    /**
     * **INTERNAL [do not use directly]**
     * Moves this column into a slot inside the market-table-area
     * which is fixed to the provided edge (position), allowing
     * for fixed columns
     */
    _stickSelf(position: 'left' | 'right'): Promise<void>;
    /**
     * **INTERNAL [do not use directly]**
     * Moves this column back into it's original slot from a slot
     * within a fixed market-table-area
     */
    _unstickSelf(): Promise<void>;
    componentWillLoad(): void;
    handleClick(): void;
    handleKeydown(e: any): void;
    render(): any;
}
