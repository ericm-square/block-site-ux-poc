import { EventEmitter } from '../../../stencil-public-runtime';
import { TMarketTableV2Selection, MarketTableV2SelectionChangeEventDetail, MarketTableV2SortOrderChangeDetail, TMarketTableV2SortOrder, TMarketTableV2SortStrategy } from '../market-table-v2/types';
/**
 * @slot - Default slot for content.
 * @slot control - Intended for use with a form control element.
 * @slot leading-accessory - Intended for use with a leading accessory.
 * @slot trailing-accessory - Intended for use with a trailing accessory.
 */
export declare class MarketTableV2Cell {
    private control;
    el: HTMLMarketTableV2CellElement;
    /**
     * Whether the cell is currently active.
     */
    readonly active: boolean;
    /**
     * Sets the horizontal alignment. When not set,
     * alignment is inherited from an ancestor row or table.
     */
    readonly align: 'left' | 'center' | 'right';
    /**
     * Displays a leading clickable caret;
     * intended to be used in conjunction with
     * `<market-table-v2-group>` to support nested rows.
     */
    readonly caret: 'up' | 'down';
    /**
     * Translated label for the collapse action when group is currently expanded (for screen reader users)
     */
    readonly caretAriaLabelExpanded: string;
    /**
     * Translated label for the expand action when group is currently collapsed (for screen reader users)
     */
    readonly caretAriaLabelCollapsed: string;
    /**
     * Whether the cell is currently disabled.
     */
    readonly disabled: boolean;
    /**
     * Indentation level
     */
    readonly indent: number;
    /**
     * Whether the cell is interactive, which results in hover, focus, & pressed styles.
     */
    readonly interactive: boolean;
    /**
     * Set this to `true` to force cell text onto one line.
     * May cause horizontal scrolling in the ancestor table.
     */
    readonly nowrap: boolean;
    /**
     * Whether the cell is selected.
     * Relevant if the cell has a slotted control.
     */
    selected: TMarketTableV2Selection;
    /**
     * Makes a cell "stick" to the left or right of its parent row.
     * Requires the row to be sized wider than the table to enable horizontal scrolling.
     */
    readonly sticky: 'left' | 'right';
    /**
     * When the cell is in a table header row, this prop enables sorting by this cell's column.
     */
    readonly sortable: boolean;
    /**
     * Translated label for the icon indicating an ascending sort (for screen reader users)
     */
    readonly sortAriaLabelAscending: string;
    /**
     * Translated label for the icon indicating a descending sort (for screen reader users)
     */
    readonly sortAriaLabelDescending: string;
    /**
     * Translated label for the icon indicating no sort applied (for screen reader users)
     */
    readonly sortAriaLabelNone: string;
    /**
     * When `sortable` is `true`, this prop sets the `aria-sort` attribute
     * and displays an arrow in the correct sort direction.
     */
    sortOrder: TMarketTableV2SortOrder;
    /**
     * When `sortable` is `true`, this prop specifies the sorting strategy.
     * - `'string'`: sorts rows alphabetically (case-insensitive) by the text content of the cell (default)
     * - `'number'`: sorts rows numerically using [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) to parse the cell content
     * - `'datetime'`: sorts rows chronologically using [date-fns `parse()`](https://date-fns.org/v3.3.1/docs/parse) method to parse the cell content. This strategy requires specifying a format in the cell's `sortStrategyFormat` prop; see accepted formats [here](https://date-fns.org/v3.3.1/docs/parse)
     * - `Function`: a custom callback function to compare rows, similar to the `compareFn` in [`Array.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). The following arguments are provided to the function:
     *   - `rowA`: the first row for comparison
     *   - `rowB`: the second row for comparison
     *   - `order`: the direction of the sort, either `ascending` or `descending`
     *   - `index`: the index of the column being sorted on
     *
     *   The callback function should return a number whose sign indicates the relative order of the two elements:
     *   - negative if `rowA` is less than `rowB`
     *   - positive if `rowA` is greater than `rowB`
     *   - zero if `rowA` & `rowB` are equal
     */
    readonly sortStrategy: TMarketTableV2SortStrategy;
    /**
     * When setting `sortStrategy` to `"datetime"`, this prop is required to specify the format.
     * See accepted formats [here](https://date-fns.org/v3.3.1/docs/parse)
     */
    readonly sortStrategyFormat: string;
    /**
     * Sets the vertical alignment. When not set,
     * alignment is inherited from an ancestor row or table.
     */
    readonly valign: 'bottom' | 'middle' | 'top';
    /**
     * Fired when the caret is clicked
     */
    marketTableV2CellCaretClicked: EventEmitter<void>;
    /**
     * Fired when clicked when sortable is `true`
     */
    marketTableV2CellSortClicked: EventEmitter<MarketTableV2SortOrderChangeDetail>;
    /**
     * @internal
     * Fired when the cell selection state changes. Used internally in table components.
     */
    marketInternalTableV2CellSelectionChange: EventEmitter<MarketTableV2SelectionChangeEventDetail>;
    onKeydown(e: KeyboardEvent): void;
    onMarketControlSelectionChange(e: CustomEvent<{
        current: boolean;
        previous: boolean;
    }>): Promise<void>;
    /**
     * @internal
     * Sets selection on the cell and propagates value to its slotted control
     */
    setSelected(selected: TMarketTableV2Selection, { silent }?: {
        silent?: boolean;
    }): Promise<void>;
    private setControlSelected;
    private getTabIndex;
    private getStyles;
    private getSortButtonLabel;
    private onCaretClick;
    private onSortClick;
    private syncControlState;
    connectedCallback(): Promise<void>;
    private renderCaretButton;
    private renderSortAscendingSvg;
    private renderSortDecendingSvg;
    private renderSortNoneSvg;
    private renderSortSvg;
    render(): any;
}
