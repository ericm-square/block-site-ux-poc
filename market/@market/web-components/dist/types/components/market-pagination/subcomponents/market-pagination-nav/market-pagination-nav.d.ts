import { EventEmitter } from '../../../../stencil-public-runtime';
import { TMarketInternalPaginationNavigationEventDetail } from '../../events';
export declare class MarketPaginationNav {
    el: HTMLMarketPaginationNavElement;
    /**
     * The current page being viewed.
     */
    readonly currentPage: number;
    /**
     * Functionally and visually disables the navigation buttons
     */
    readonly disabled: boolean;
    /**
     * The total number of pages.
     */
    readonly totalPages: number;
    /**
     * Allow the user to navigate to the next page
     */
    readonly hasNextPage: boolean;
    /**
     * Allow the user to navigate to the previous page
     */
    readonly hasPreviousPage: boolean;
    /**
     * The number of results displayed per page.
     * Required to emit this value as part of the navigation event.
     */
    readonly pageSize: string;
    /**
     * Fired when a new page is selected
     *
     * @property {string} page - page number to navigate to
     * @property {string} prevPage - the current page _before_ navigation
     * @property {string} pageSize - the number of items per page
     */
    marketInternalPaginationNavigation: EventEmitter<TMarketInternalPaginationNavigationEventDetail>;
    listSelectionEventHandler(e: CustomEvent): void;
    handlePrev(): void;
    handleNext(): void;
    /**
     * Dropdown navigates by every 10 pages if there are more than 20 pages
     *
     * pageList for a large dataset = [10, 20, 30, 40, 50...]
     * pageList for a small dataset = [1, 2, 3, 5, 6, 7...]
     */
    get pageList(): number[];
    render(): any;
}
