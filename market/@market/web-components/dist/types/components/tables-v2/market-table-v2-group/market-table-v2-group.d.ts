import { EventEmitter } from '../../../stencil-public-runtime';
import { TMarketTableV2Selection, MarketTableV2SelectionChangeEventDetail, TMarketTableV2SortOrder, TMarketTableV2SortStrategy } from '../market-table-v2/types';
import { TMarketDragEventDetail } from '../../../utils/draggable';
import { TMarketReorderableOptions, TMarketReorderEventDetail } from '../../../utils/reorderable';
import { TMarketDragCoords } from '../../../utils/gesture/types';
/**
 * @slot - Default slot for children rows
 * @slot parent - Slot for for the parent row
 */
export declare class MarketTableV2Group {
    private parent;
    private rows;
    private groups;
    private children;
    private drag;
    private reorder;
    el: HTMLMarketTableV2GroupElement;
    /**
     * Whether the group is collapsible.
     */
    readonly collapsible: boolean;
    /**
     * Whether the group is expanded or collapsed, when `collapsible` is `true`.
     */
    collapsed: boolean;
    /**
     * Whether the group is drag & drop enabled.
     */
    readonly dragEnabled: boolean;
    /**
     * Indentation level
     */
    readonly indent: number;
    /**
     * Whether the group is reorderable or not.
     * Setting to `internal` enables reordering table rows internally
     * while `external` also allows dragging to & from other tables.
     */
    readonly reorderable: TMarketReorderableOptions;
    /**
     * When set to `framework`, the group will move the reordered item back to its original position
     * before the `marketTableV2RowsReordered` event is fired. This is useful when the table
     * is rendered within a framework like Ember or React.
     */
    readonly reorderMode: 'default' | 'framework';
    /**
     * Whether the group is selected.
     * Relevant if the group has rows with slotted controls.
     */
    selected: TMarketTableV2Selection;
    /**
     * @internal
     * Fired when the group selection state changes. Used internally in table components.
     */
    marketInternalTableV2GroupSelectionChange: EventEmitter<MarketTableV2SelectionChangeEventDetail>;
    /**
     * Fired when the group's rows are reordered.
     * If a row was dropped into this group from an external source, `oldIndex` is `-1`.
     * If a row was removed from this group and dropped into an external source, `newIndex` is `-1`.
     */
    marketTableV2RowsReordered: EventEmitter<TMarketReorderEventDetail>;
    /**
     * Fired when the group's collapsed state changes.
     */
    marketTableV2GroupCollapsedChange: EventEmitter<{
        previous: boolean;
        current: boolean;
    }>;
    onMarketTableV2CellCaretClicked(e: CustomEvent<void>): void;
    onMarketTableV2SelectionChange(e: CustomEvent<MarketTableV2SelectionChangeEventDetail>): Promise<void>;
    onDragHandleStart(e: CustomEvent<TMarketDragCoords>): Promise<void>;
    onDragHandleMove(e: CustomEvent<TMarketDragCoords>): void;
    onDragHandleDragEnd(e: CustomEvent<TMarketDragCoords>): Promise<void>;
    onDragMove(e: CustomEvent<TMarketDragEventDetail>): void;
    onDragLeave(e: CustomEvent<TMarketDragEventDetail>): void;
    onDragEnd(e: CustomEvent<TMarketDragEventDetail>): void;
    onDragDrop(e: CustomEvent<TMarketDragEventDetail>): void;
    propagateNestedState(): void;
    watchDragEnabled(): void;
    watchReorderable(): void;
    /**
     * @internal
     * Sets selection on the group and propagates the value
     * downwards to its children rows and upwards to any parent groups or tables.
     */
    setSelected(selected: TMarketTableV2Selection, { silent }?: {
        silent?: boolean;
    }): Promise<void>;
    /**
     * @internal
     * Used internally by Reorderable utils.
     * Sets the group's collapsed state and fires the change event.
     * Normally you should set the `collapsed` prop directly.
     */
    setCollapsed(collapsed: boolean, { silent }?: {
        silent?: boolean;
    }): Promise<void>;
    /**
     * @internal
     * Recursively sorts the group's children rows and groups.
     */
    sort({ order, column, strategy, format, }: {
        order: TMarketTableV2SortOrder;
        column: number;
        strategy: TMarketTableV2SortStrategy;
        format: string;
    }): Promise<void>;
    private setSelectedFromChildEvent;
    private getElements;
    private getStyles;
    private syncDragEnabled;
    private onSlotChange;
    connectedCallback(): void;
    componentDidRender(): void;
    render(): any;
}
