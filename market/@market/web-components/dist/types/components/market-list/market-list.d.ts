import { EventEmitter } from '../../stencil-public-runtime';
import { TMarketInputSearchValueChangeEventDetail } from '../market-input-search/events';
import { Reorderable, TMarketReorderableOptions, TMarketReorderEventDetail } from '../../utils/reorderable';
import { TMarketDragEventDetail } from '../../utils/draggable';
import { TMarketListItemsFilteredEventDetail, TMarketListSelectionsDidChangeEventDetail } from './events';
import { TMarketListFilterStrategyPropTypes, TMarketListItem } from './types';
/**
 * @slot control-row - Intended for use with interactive multiselect lists. When used with a
 * `<market-row>` containing a slotted control (such as `<market-checkbox>`), toggling this row
 * will select/deselect all list options.
 * @slot search - Intended for use with `<market-input-search>`
 * @slot empty-state - Intended for use with `<market-empty-state>`; shown when filtering items
 * via `<market-input-search>` and there are no search results.
 * @slot - Intended for use with `<market-row>` or `<market-action-card>`.
 */
export declare class MarketList {
    el: HTMLMarketListElement;
    inputSearchEl: HTMLMarketInputSearchElement;
    controlRow: HTMLMarketRowElement;
    observers: {
        itemDisabledAttribute?: MutationObserver;
    };
    /**
     * A string specifying a value for the list. To select multiple values,
     * separate **unique** values with a comma (e.g. `'orange,pear'`).
     * Setting to empty string (`''`) will clear all current selections.
     */
    value: string | Array<any>;
    /**
     * Whether or not the list is interactive. Results in list items receiving hover
     * and active styling when hovered/clicked.<br>
     *
     * _NOTE:_ Lists slotted into `market-popover`, or any of the components that use it
     * internally such as `market-select`, `market-dropdown`, and `market-button-dropdown`,
     * will automatically have their `interactive` property set to `true`.
     */
    interactive: boolean;
    /**
     * When set to `true`, rows/cards will not persist selected state on click. Only takes effect when `interactive` is true.
     */
    readonly transient: boolean;
    /**
     * Whether or not the list can allow for multiple selections (currently not
     * reflected in the `value` prop)
     */
    readonly multiselect: boolean;
    /**
     * String value used for the `aria-labelledby` attribute.
     */
    readonly name: string;
    /**
     * Filter strategy
     *
     * - `"textcontent"` (default, case-insensitive): This strategy searches through each of the row’s `.textContent`. This means it would also search through a row’s subtext, accessories, and other slots.
     * - `"label"` (case-insensitive): This strategy searches through the slotted `<label>` elements of rows. Note that if a `<label>` is not slotted in a row, this default filter strategy will not work.
     * - `"value"` (case-sensitive): This strategy searches through the rows’ `value` attribute. Values are usually case-sensitive so they are treated the same way when searching for them.
     * - `Function`: This strategy works similarly to `Array.prototype.filter()` where the function’s `boolean` output determines if the item will be kept or filtered out. For your convenience, you are provided with 5 parameters:
     *   - `item`: `TMarketListItem`
     *   - `label`: the `<label>`’s `.textContent`
     *   - `query`: `value` of `<market-input-search>`
     *   - `textContent`: the item’s `.textContent`
     *   - `value`: `value` of the item
     */
    readonly filterStrategy: TMarketListFilterStrategyPropTypes;
    /**
     * Whether the list is reorderable or not.
     * Setting to `internal` enables reordering rows internally
     * while `external` also allows dragging to & from other lists.
     */
    readonly reorderable: TMarketReorderableOptions;
    /**
     * When set to `framework`, the list will move the reordered row back to its original position
     * before the `marketListItemsReordered` event is fired. This is useful when the list
     * is rendered within a framework like Ember or React.
     */
    readonly reorderMode: 'default' | 'framework';
    /**
     * Whether a count of selectable items rendered within the control row will be hidden
     */
    readonly hideSelectableCount: boolean;
    /**
     * Used to indicate if the list has a search input
     */
    hasSearch: boolean;
    /**
     * All items
     */
    items: Array<TMarketListItem>;
    /**
     * Current itemselections
     */
    selections: Set<TMarketListItem>;
    /**
     * Filtered items by `market-input-search`
     */
    filteredItems: {
        visible: Array<TMarketListItem>;
        hidden: Array<TMarketListItem>;
        visibleSelected: Array<TMarketListItem>;
        selected: Array<TMarketListItem>;
    };
    reorderableWatcher(): void;
    /**
     * Fired whenever an item is selected or deselected.
     *
     * @property {TMarketListItem} newSelection
     * - the row or card that has been selected
     * @property {string} newSelectionValue - the value of the new selection
     * @property {TMarketListItem} newDeselection
     * - the row or card that has been deselected
     * @property {string} newDeselectionValue - the value of the new deselection
     * @property {Array<TMarketListItem>} currentSelections
     * - an array of the currently selected rows or cards (excludes slotted control row, if any)
     * @property {string[]} currentSelectionValues - an array of the currently selected values
     * (excludes slotted control row, if any)
     * @property {string[]} prevSelectionValues - an array of the previously selected values
     * (excludes slotted control row, if any)
     */
    marketListSelectionsDidChange: EventEmitter<TMarketListSelectionsDidChangeEventDetail>;
    /**
     * Fired when the slotchange event happens on the list. Allows parent components (like `market-select`)
     * to update when slotted list items change.
     */
    marketListSlotChange: EventEmitter;
    /**
     * Fired when the list items are reordered.
     * If an item was dropped into this list from an external list, `oldIndex` is `-1`.
     * If an item was removed from this list and dropped into an external list, `newIndex` is `-1`.
     */
    marketListItemsReordered: EventEmitter<TMarketReorderEventDetail>;
    /**
     * Fired when items are filtered using `market-input-search`
     */
    marketListItemsFiltered: EventEmitter<TMarketListItemsFilteredEventDetail>;
    valueWatcher(): void;
    hideSelectableCountWatcher(): void;
    rowSelectedEventHandler(e: CustomEvent): void;
    rowDeselectedEventHandler(e: CustomEvent): void;
    cardSelectedEventHandler(e: CustomEvent): void;
    cardDeselectedEventHandler(e: CustomEvent): void;
    /**
     * Listen for `marketInputSearchValueChange` which is emitted by the slotted `market-input-search`
     */
    marketInputSearchValueChangeEventHander({ detail }: CustomEvent<TMarketInputSearchValueChangeEventDetail>): void;
    getEventSelectionDetails(): {
        currentSelections: TMarketListItem[];
        currentSelectionValues: string[];
        prevSelectionValues: any[];
    };
    handleItemSelectedEvent(selectedItem: TMarketListItem): void;
    handleItemDeselectedEvent(deselectedItem: TMarketListItem): void;
    /**
     * Selects a given option from the list. Also handles deselecting
     * all other elements when not in multiselect mode.
     */
    selectItem(selectedItem: TMarketListItem): void;
    /**
     * Selects all multiselect list options.
     */
    selectAllItems(): void;
    /**
     * Deselects a given option from the list.
     */
    deselectItem(deselectedItem: TMarketListItem): void;
    /**
     * Deselects all other items other than the ones that were just selected.
     */
    deselectItems(selectedItems: Array<TMarketListItem>): void;
    /**
     * Deselects all list options.
     */
    deselectAllItems(): void;
    /**
     * If passed or updates interactive, ensure list itself is set to interactive mode.
     */
    syncListInteractiveWithItems(): void;
    /**
     * Processes interactive, transient, and multiselect props and propagates these props
     * to children components whenever these props are updated.
     */
    processItems(): void;
    getCurrentSelectionValues(): Set<string>;
    setRowProperties(row: HTMLMarketRowElement): void;
    /**
     * Select item that corresponds to passed value, or clear all values if value is empty string.
     */
    setSelectionsFromValue(): void;
    /**
     * Find any list items with the `selected` property and add to `selections`.
     */
    setSelectionsFromRowAttributes(): void;
    setListAndItemsRoles(): void;
    /**
     * Sets the initial state of the list by updating and propagating props and setting
     * default value.
     */
    setInternalState(): void;
    /**
     * Syncs the state of the slotted control row with list selections (e.g. all selected, none
     * selected, some selected).
     */
    syncControlRowWithSelections(): Promise<void>;
    /**
     * Injects an accessory to the control row that displays the number of items;
     * or edit that accessory's text content if the element already exists.
     *
     * Disabled items are not included in the count.
     *
     * Count is only rendered when `hideSelectableCount` is `false`, which it is by default.
     */
    injectCountOnControlRow(): void;
    /**
     * Filters items based on search query inputted in slotted `market-input-search`
     */
    filterItems(query: string): void;
    updateSelectedItemsInFilteredItems(): void;
    handleSearchSlotchange(): void;
    defaultSlotchangeHandler(): void;
    /**
     * Rows slotted into the "control-row" slot only function as such if the list is interactive and
     * multiselect and the row contains a valid slotted control (checkbox or toggle).
     */
    controlRowSlotchangeHandler(): void;
    /**
     * Show empty state if:
     * - list isn't empty, but
     * - there is a search query, and
     * - there are no search results
     */
    setEmptyStateVisibility(): void;
    /**
     * Updates the count that is injected to the control row
     * when there’s a change on an item’s `disabled` attribute.
     */
    initItemDisabledAttributeObserver(): void;
    connectedCallback(): void;
    componentWillLoad(): void;
    componentWillRender(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    handleKeydown(e: KeyboardEvent): void;
    handleArrowDown(e: any): void;
    handleArrowUp(e: any): void;
    /**
     * Focuses the row at the given index.
     * @param index - The index of the row to focus.
     * @returns A promise that resolves when the row is focused.
     */
    focusRowAtIndex(index: number): Promise<void>;
    reorder: Reorderable;
    setReorderable(): void;
    onDragMove(e: CustomEvent<TMarketDragEventDetail>): void;
    onDragLeave(): void;
    onDragEnd(e: CustomEvent<TMarketDragEventDetail>): void;
    onDragDrop(e: CustomEvent<TMarketDragEventDetail>): void;
    componentDidRender(): void;
    render(): any;
}
