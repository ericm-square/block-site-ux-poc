import { EventEmitter } from '../../../../stencil-public-runtime';
import { TMarketPaginationPageSizeChangeEventDetail } from '../../events';
export declare class MarketPaginationPageSize {
    el: HTMLMarketPaginationPageSizeElement;
    /**
     * Functionally and visually disables dropdown
     */
    readonly disabled: boolean;
    /**
     * The number of results displayed per page.
     */
    readonly value: string;
    /**
     * Options for page sizes (comma separated list).
     */
    readonly pageSizeOptions: string;
    /**
     * Fired when the selected page size value changes
     *
     * @property {string} value - new selected option
     */
    marketInternalPaginationPageSizeChange: EventEmitter<TMarketPaginationPageSizeChangeEventDetail>;
    listSelectionEventHander(e: CustomEvent): void;
    render(): any;
}
