import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';

const marketPaginationCss = ":host{display:flex;flex-direction:column;align-items:stretch}.market-button-dropdown{display:flex;flex-direction:column;align-items:stretch}.market-button-dropdown .market-filter-button{display:block}.market-pagination-page-size+.market-pagination-nav{margin-top:var(--pagination-nav-vertical-margin)}@media only screen and (min-width: 600px){.market-pagination-page-size+.market-pagination-nav{margin-top:0;margin-left:var(--pagination-nav-horizontal-margin)}}.market-pagination-nav nav{display:flex;justify-content:space-between;-moz-column-gap:var(--pagination-nav-content-spacing);column-gap:var(--pagination-nav-content-spacing)}.market-pagination-nav nav .market-button-dropdown{flex-grow:1}@media only screen and (min-width: 600px){:host{flex-direction:row;justify-content:space-between}.market-pagination-nav:only-child{margin-left:auto}}";
const MarketPaginationStyle0 = marketPaginationCss;

const MarketPagination$1 = /*@__PURE__*/ proxyCustomElement(class MarketPagination extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketPaginationPageSizeChange = createEvent(this, "marketPaginationPageSizeChange", 7);
        this.marketPaginationNavigation = createEvent(this, "marketPaginationNavigation", 7);
        this.currentPage = undefined;
        this.disabled = false;
        this.totalPages = undefined;
        this.hasNextPage = undefined;
        this.hasPreviousPage = undefined;
        this.pageSize = undefined;
        this.pageSizeOptions = undefined;
    }
    /**
     * Rebroadcast up events from market-pagination-page-size.
     */
    changePageSize(e) {
        e.stopPropagation();
        const { detail } = e;
        this.marketPaginationPageSizeChange.emit(detail);
    }
    /**
     * Rebroadcast up events from market-pagination-nav.
     */
    navigatePage(e) {
        e.stopPropagation();
        const { detail } = e;
        this.marketPaginationNavigation.emit(detail);
    }
    render() {
        const MarketPaginationPageSizeTagName = getNamespacedTagFor('market-pagination-page-size');
        const MarketPaginationNavTagName = getNamespacedTagFor('market-pagination-nav');
        return (h(Host, { key: '886ec957c0100e5ab77ae0f4782f44f145af5be6', class: "market-pagination" }, this.pageSizeOptions && (h(MarketPaginationPageSizeTagName, { key: '5d22ac9b0db9bbba524cfef95d395177d7347b90', value: this.pageSize, pageSizeOptions: this.pageSizeOptions, disabled: this.disabled }, h("slot", { key: 'a805b0072497159fe497617180886acafbeebd9f', name: "page-size-label", slot: "page-size-label" }, "Results per page"), h("slot", { key: '172de2942561a2bbeac01adb45868f5268487403', name: "page-size-feedback", slot: "page-size-feedback" }, this.pageSize))), h(MarketPaginationNavTagName, { key: '8a0229a3ea449e7aaf46af514a0907ce64ed1621', currentPage: this.currentPage, disabled: this.disabled, totalPages: this.totalPages, pageSize: this.pageSize, hasNextPage: this.hasNextPage, hasPreviousPage: this.hasPreviousPage }, h("slot", { key: '36f5e388f866816f8305f73cf8e5f47b7e5ad43b', name: "nav-label", slot: "nav-label" }, "Page"), h("slot", { key: '6e3a4e3957f624982b952d76a89dd94ff02e51a8', name: "nav-feedback", slot: "nav-feedback" }, this.currentPage, " of ", this.totalPages))));
    }
    get el() { return this; }
    static get style() { return MarketPaginationStyle0; }
}, [1, "market-pagination", {
        "currentPage": [2, "current-page"],
        "disabled": [516],
        "totalPages": [2, "total-pages"],
        "hasNextPage": [4, "has-next-page"],
        "hasPreviousPage": [4, "has-previous-page"],
        "pageSize": [1, "page-size"],
        "pageSizeOptions": [1, "page-size-options"]
    }, [[0, "marketInternalPaginationPageSizeChange", "changePageSize"], [0, "marketInternalPaginationNavigation", "navigatePage"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-pagination"];
    components.forEach(tagName => { switch (tagName) {
        case "market-pagination":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketPagination$1);
            }
            break;
    } });
}

const MarketPagination = MarketPagination$1;
const defineCustomElement = defineCustomElement$1;

export { MarketPagination, defineCustomElement };

//# sourceMappingURL=market-pagination.js.map