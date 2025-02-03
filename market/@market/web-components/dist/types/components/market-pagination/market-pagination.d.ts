import { EventEmitter } from '../../stencil-public-runtime';
import { TMarketInternalPaginationNavigationEventDetail, TMarketPaginationPageSizeChangeEventDetail } from './events';
/**
 * @slot page-size-label - localized string to label the page size dropdown (defaults to English "Results per page")
 * @slot page-size-feedback - localized string to label the current page size (defaults to value of {this.pageSize})
 * @slot nav-label - localized string to label the page dropdown (defaults to English "Page")
 * @slot nav-feedback - localized string to label the current page of total pages
 *      (defaults to English "{this.currentPage} of {this.totalPages}").
 *      The #s for current page/total pages need to be passed in as part of the string.
 */
export declare class MarketPagination {
    el: HTMLMarketPaginationElement;
    /**
     * The current page being viewed.
     */
    readonly currentPage: number;
    /**
     * Functionally and visually disables all navigation buttons
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
     */
    readonly pageSize: string;
    /**
     * Options for page sizes (comma separated list of numbers). If omitted, will not display the page size subcomponent.
     */
    readonly pageSizeOptions: string;
    /**
     * Fired whenever the page size is changed.
     */
    marketPaginationPageSizeChange: EventEmitter<TMarketPaginationPageSizeChangeEventDetail>;
    /**
     * Fired whenever the menu selection is changed.
     */
    marketPaginationNavigation: EventEmitter<TMarketInternalPaginationNavigationEventDetail>;
    /**
     * Rebroadcast up events from market-pagination-page-size.
     */
    changePageSize(e: CustomEvent<TMarketPaginationPageSizeChangeEventDetail>): void;
    /**
     * Rebroadcast up events from market-pagination-nav.
     */
    navigatePage(e: CustomEvent<TMarketInternalPaginationNavigationEventDetail>): void;
    render(): any;
}
