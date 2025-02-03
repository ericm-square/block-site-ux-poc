import { EventEmitter } from '../../../stencil-public-runtime';
import { TMarketTableV2Selection, MarketTableV2SelectionChangeEventDetail } from '../market-table-v2/types';
import type { TMarketDragCoords } from '../../../utils/gesture/types';
/**
 * @slot - Default slot for table cells.
 * @part drag-handle - the drag handle when `dragEnabled` is true.
 */
export declare class MarketTableV2Row {
    private firstCell;
    private drag;
    el: HTMLMarketTableV2RowElement;
    /**
     * Whether the row is currently active.
     */
    readonly active: boolean;
    /**
     * Sets the horizontal alignment.
     * When not set, alignment is inherited from an ancestor table.
     * Likewise, row alignment will be inherited by descendant cells.
     */
    readonly align: 'left' | 'center' | 'right';
    /**
     * Displays a leading clickable caret in the first cell;
     * intended to be used in conjunction with
     * `<market-table-v2-group>` to support nested rows.
     */
    readonly caret: 'up' | 'down';
    /**
     * Whether the row is currently disabled.
     */
    readonly disabled: boolean;
    /**
     * Whether the row is drag & drop enabled.
     */
    readonly dragEnabled: boolean;
    /**
     * Whether the drag handle appears always or only on hover
     */
    readonly dragHandleVisibility: 'always' | 'hover';
    /**
     * Whether the drag handle appears to the left or right.
     */
    readonly dragHandlePosition: 'leading' | 'trailing';
    /**
     * Styles a row with footer styles.
     */
    readonly footer: boolean;
    /**
     * Styles a row with header styles.
     */
    readonly header: boolean;
    /**
     * Indentation level of the first cell in the row.
     */
    readonly indent: number;
    /**
     * Whether the row is interactive, which results in hover, focus, & pressed styles.
     */
    readonly interactive: boolean;
    /**
     * Whether the row is selected.
     * Relevant if the row's first cell has a slotted control.
     */
    selected: TMarketTableV2Selection;
    /**
     * Makes a row "stick" to the top or bottom of its parent table.
     * Requires an explict height on the table to enable vertical scrolling.
     */
    readonly sticky: 'top' | 'bottom';
    /**
     * Sets the vertical alignment.
     * When not set, alignment is inherited from an ancestor table.
     * Likewise, row alignment will be inherited by descendant cells.
     */
    readonly valign: 'bottom' | 'middle' | 'top';
    /**
     * @internal
     * Fired when the row selection state changes. Used internally in table components.
     */
    marketInternalTableV2RowSelectionChange: EventEmitter<MarketTableV2SelectionChangeEventDetail>;
    /**
     * Fired when the row selection state changes. Used to externally signal selection changes.
     */
    marketTableV2RowSelectionChange: EventEmitter<MarketTableV2SelectionChangeEventDetail>;
    onKeydown(e: KeyboardEvent): void;
    onMarketInternalTableV2CellSelectionChange(e: CustomEvent<MarketTableV2SelectionChangeEventDetail>): Promise<void>;
    onDragStart(e: CustomEvent<TMarketDragCoords>): Promise<void>;
    onDragMove(e: CustomEvent<TMarketDragCoords>): void;
    onDragEnd(e: CustomEvent<TMarketDragCoords>): Promise<void>;
    watchCaret(): void;
    watchIndent(): void;
    /**
     * Sets selection on the row and propagates the value
     * downwards to the slotted control in its first cell
     * and upwards to any parent groups or tables.
     */
    setSelected(selected: TMarketTableV2Selection, { silent }?: {
        silent?: boolean;
    }): Promise<void>;
    private getTabIndex;
    private initFirstCell;
    connectedCallBack(): Promise<void>;
    private renderDragHandleCell;
    render(): any;
}
