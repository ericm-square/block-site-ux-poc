import { TMarketInputSearchFocusEventDetail, TMarketInternalInputSearchCompactAnimationEventDetail } from '../market-input-search/events';
/**
 * @slot search - Search input, using `<market-input-search>`
 * @slot filters - Filters, using `<market-filter>`
 */
export declare class MarketFilterGroup {
    el: HTMLMarketFilterGroupElement;
    /**
     * Maximum number of visible filters before they are truncated and moved into the overflow menu.
     * However, filters may be truncated anyway if there is not enough space.
     *
     * @default 3
     */
    readonly maxVisibleFilters: number;
    /**
     * Sorted overflow and visible filters
     */
    private _sortedFilterEls;
    /**
     * References to the filter elements
     */
    private _filterEls;
    /**
     * Reference to the `market-filter-dropdown-menu`
     */
    private _dropdownMenuEl;
    /**
     * Slotted input search element
     */
    private _slottedInputSearchEl;
    /**
     * Used to hide filters when on compact mode
     */
    private _isSearchActive;
    /**
     * Used to set the index cutoff for overflowing filters
     */
    private _filterCutoffIndex;
    /**
     * Used to focus on the first filter when 'Tab' is pressed on the input search
     */
    private _willFocusOnFirstFilter;
    /**
     * Used to delay the overflow dropdown menu from opening
     */
    private _willDelayDropdownOpen;
    /**
     * Observers
     */
    private _observers;
    maxVisibleFiltersWatcher(): void;
    /**
     * Search is active when it's focused
     */
    marketInputSearchFocusHandler({ detail }: CustomEvent<TMarketInputSearchFocusEventDetail>): void;
    /**
     * For every search animation event, we either show or hide filters
     */
    marketInternalInputSearchCompactAnimationHandler(e: CustomEvent<TMarketInternalInputSearchCompactAnimationEventDetail>): Promise<void>;
    /**
     * Handle dropdown menu's `marketDropdownOpened` event
     * TODO: There is no `market-dropdown` in this template below.
     * This event is bubbling up from `market-filter-dropdown-menu`.
     * We should refactor this to use a custom event from that instead,
     * but that component does not yet emit custom open/close events.
     */
    marketDropdownOpenedHandler(e: CustomEvent<void>): void;
    /**
     * The overflow feedback's text length is based on filters that have value.
     * Basically, the button's structure is: `[ <icon> <gap> <feedback> ]`
     */
    private calculateOverflowButtonWidth;
    private getComputedWidth;
    /**
     * Find out where the cutoff will happen.
     * Main chunk of the overflow logic happens here
     */
    private findFilterCutoffIndex;
    /**
     * Sort filters:
     * - split by `this._filterCutoffIndex`
     * - visible filters: set attr `[slot="filters"]`; remove `display: none;`
     * - overflow filters: set attr `[slot="overflow-filters"]`; add `display: none;`
     */
    private sortVisibleAndOverflowFilters;
    /**
     * Handle screen / component resize
     */
    private handleResize;
    /**
     * Toggle search's compact mode, if present and not focused
     */
    private checkIfSearchShouldBeCompact;
    /**
     * When tabbing from the search input and into the first filter,
     */
    private handleInputSearchTabKeydown;
    /**
     * When input search is focused, make sure that dropdown menu is closed
     */
    private handleInputSearchFocus;
    private registerSlottedInputSearch;
    private registerSlottedFilters;
    private throttledHandleResize;
    private observeContent;
    private filtersOnSlotChangeHandler;
    connectedCallback(): void;
    componentWillLoad(): void;
    componentWillRender(): void;
    disconnectedCallback(): void;
    render(): any;
}
