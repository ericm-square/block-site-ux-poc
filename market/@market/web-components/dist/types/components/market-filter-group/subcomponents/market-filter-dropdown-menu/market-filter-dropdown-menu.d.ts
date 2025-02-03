/**
 * @slot search - Search input, using `<market-input-search>`
 * @slot filters - Filters, using `<market-filter>`
 * @slot settings - Filter settings, using `<market-filter>`
 * @slot visible-filters - INTERNAL ONLY: Used by `<market-filter-group>` when programmatically arranging visible vs overflow
 * buttons based on available space.
 */
export declare class MarketFilterDropdownMenu {
    el: HTMLMarketFilterDropdownMenuElement;
    /**
     * The `<market-filter>` elements
     */
    private filterEls;
    /**
     * The filter rows
     */
    private filterRowEls;
    /**
     * String for setting filter button size
     */
    readonly size: 'medium' | 'small';
    /**
     * Display the number of filters with a selected value as feedback
     */
    private filtersWithSelectedValue;
    /**
     * Active filter's `name` prop
     */
    private hasSelectedFilter;
    /**
     * Is market-dropdown active
     */
    private isDropdownActive;
    /**
     * Handle `marketDropdownOpened` emitted by `<market-dropdown>`
     */
    handleDropdownOpened(e: CustomEvent<void>): void;
    /**
     * Handle `marketDropdownClosed` emitted by `<market-dropdown>`
     */
    handleDropdownClosed(e: CustomEvent<void>): void;
    /**
     * Handle `marketHeaderNavigate` emitted by `<market-button>` when clicking the back button
     */
    handleHeaderNavigate(): void;
    /**
     * Deselect filter
     */
    private deselectFilter;
    /**
     * Handle overflow-filters slot change
     */
    private handleOverflowFiltersSlotChange;
    /**
     * Create rows from filter slots
     */
    private createRowsFromFilters;
    /**
     * When a filter is selected, the popover content will show
     * the selected filter's title and list selection
     */
    private handleFilterSelection;
    private handleDatePickerFilterSelection;
    private handleListFilterSelection;
    /**
     * Count how many filters with selected value
     * and that count is displayed as feedback.
     */
    private calculateFiltersWithSelectedValue;
    componentDidLoad(): void;
    render(): any;
}
