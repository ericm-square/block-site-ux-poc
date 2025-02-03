import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - Default slot for all content
 */
export declare class MarketTableColumn {
    el: HTMLMarketTableColumnElement;
    /**
     * **REQUIRED:** A unique key for this column, used to map all related cells together
     */
    readonly name: string;
    /**
     * Will set the `align` property on all related cells to this value
     */
    readonly align: false | 'left' | 'right';
    /**
     * Makes this column stick to an edge of the table
     */
    stickTo: 'left' | 'right';
    /**
     * Whether or not this column is sortable
     */
    readonly sortable: boolean;
    /**
     * What order the column is sorting in; ascending points up and descending points down
     * If the column is sortable and this prop is not present, the sort icon points up but is grayed out.
     */
    readonly sortOrder: 'ascending' | 'descending';
    /**
     * Hides the column and all related cells.
     */
    readonly hidden: boolean;
    /**
     * **INTERNAL [do not use directly]**
     * The order of this market-table-column in the DOM
     */
    readonly index: number;
    /**
     * **INTERNAL [do not use directly]**
     * Set by the parent table element, based on it's grid-template-columns CSS value
     */
    readonly width: string;
    /**
     * The original slot this column was placed in
     */
    originalSlot: string;
    /**
     * Emitted when this column is stuck to a table edge.
     * Can happen when the stick-to property is updated, .stick() method is called
     * or when slotted content in the parent table changes
     */
    marketTableColumnStick: EventEmitter<{
        position: 'left' | 'right';
        index: number;
    }>;
    /**
     * Emitted when a table column heading is clicked to sort
     */
    marketTableColumnUnstick: EventEmitter<{
        position: 'left' | 'right';
        index: number;
    }>;
    /**
     * Emitted when a table column heading is clicked to sort
     */
    marketTableColumnSort: EventEmitter<{
        column: string;
        previousSortOrder: 'ascending' | 'descending';
    }>;
    /**
     * Emitted when a table column's hidden property changes. Used by market-table
     * to toggle visibility of related table cells.
     */
    marketTableColumnVisibilityChange: EventEmitter<{
        columnName: string;
        hidden: boolean;
    }>;
    emitVisibilityChangeEvent(newValue: boolean, oldValue: boolean): void;
    emitStickyEvents(newValue: 'left' | 'right', oldValue: 'left' | 'right'): Promise<void>;
    /**
     * Fixes this column to the provided table edge (position)
     */
    stick(position?: 'left' | 'right'): Promise<void>;
    /**
     * Un-fixes this column from any table edge
     */
    unstick(position?: 'left' | 'right'): Promise<void>;
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
    clickHandler(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): any;
}
