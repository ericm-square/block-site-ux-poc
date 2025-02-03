import { EventEmitter } from '../../../stencil-public-runtime';
import { TMarketTableV2Selection, MarketTableV2SelectionChangeEventDetail, MarketTableV2SortOrderChangeDetail } from './types';
import { TMarketReorderableOptions, TMarketReorderEventDetail } from '../../../utils/reorderable';
import { TMarketDragEventDetail } from '../../../utils/draggable';
/**
 * @slot - Default slot for all rows.
 * @part table - The inner table element.
 */
export declare class MarketTableV2 {
    private rows;
    private groups;
    private children;
    private header;
    private footer;
    private reorder;
    el: HTMLMarketTableV2Element;
    /**
     * Sets the horizontal alignment.
     * Table alignment will be inherited by descendant rows & cells.
     */
    readonly align: 'left' | 'center' | 'right';
    /**
     * Whether the slotted table groups are collapsible.
     */
    readonly collapsible: boolean;
    /**
     * Sets the `table-layout` algorithm.
     * By default, the column widths are adjusted to fit the content.
     * If column widths are explicitly sized, use `fixed` to speed up render time.
     * See [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout)
     * for more information.
     */
    readonly layout: 'auto' | 'fixed';
    /**
     * Whether the table is reorderable or not.
     * Setting to `internal` enables reordering table rows internally
     * while `external` also allows dragging to & from other tables.
     */
    readonly reorderable: TMarketReorderableOptions;
    /**
     * When set to `framework`, the table will move the reordered item back to its original position
     * before the `marketTableV2RowsReordered` event is fired. This is useful when the table
     * is rendered within a framework like Ember or React.
     */
    readonly reorderMode: 'default' | 'framework';
    /**
     * Whether the table is selected.
     * Relevant if the table has rows with a slotted controls.
     */
    selected: TMarketTableV2Selection;
    /**
     * Sets the vertical alignment.
     * Table alignment will be inherited by descendant rows & cells.
     */
    readonly valign: 'bottom' | 'middle' | 'top';
    /**
     * Fired when the table rows are reordered.
     * If a row was dropped into this table from an external table, `oldIndex` is `-1`.
     * If a row was removed from this table and dropped into an external table, `newIndex` is `-1`.
     */
    marketTableV2RowsReordered: EventEmitter<TMarketReorderEventDetail>;
    onMarketTableV2SelectionChange(e: CustomEvent<MarketTableV2SelectionChangeEventDetail>): Promise<void>;
    onMarketTableV2CellSortClicked(e: CustomEvent<MarketTableV2SortOrderChangeDetail>): void;
    onDragMove(e: CustomEvent<TMarketDragEventDetail>): void;
    onDragLeave(): void;
    onDragEnd(e: CustomEvent<TMarketDragEventDetail>): void;
    onDragDrop(e: CustomEvent<TMarketDragEventDetail>): void;
    watchCollapsible(): void;
    watchReorderable(): void;
    /**
     * @internal
     * Sets selection on the table and propagates the value
     * downwards to its children rows and groups.
     */
    setSelected(selected: TMarketTableV2Selection, { silent }?: {
        silent?: boolean;
    }): Promise<void>;
    private setSelectedFromChildEvent;
    private getElements;
    private syncDragEnabled;
    private onSlotChange;
    connectedCallback(): void;
    componentDidRender(): void;
    render(): any;
}
