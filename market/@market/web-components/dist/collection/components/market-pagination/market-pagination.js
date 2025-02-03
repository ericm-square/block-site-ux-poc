import { h, Host } from "@stencil/core";
import { getNamespacedTagFor } from "../../utils/namespace";
/**
 * @slot page-size-label - localized string to label the page size dropdown (defaults to English "Results per page")
 * @slot page-size-feedback - localized string to label the current page size (defaults to value of {this.pageSize})
 * @slot nav-label - localized string to label the page dropdown (defaults to English "Page")
 * @slot nav-feedback - localized string to label the current page of total pages
 *      (defaults to English "{this.currentPage} of {this.totalPages}").
 *      The #s for current page/total pages need to be passed in as part of the string.
 */
export class MarketPagination {
    constructor() {
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
    static get is() { return "market-pagination"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-pagination.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-pagination.css"]
        };
    }
    static get properties() {
        return {
            "currentPage": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The current page being viewed."
                },
                "attribute": "current-page",
                "reflect": false
            },
            "disabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Functionally and visually disables all navigation buttons"
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "totalPages": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The total number of pages."
                },
                "attribute": "total-pages",
                "reflect": false
            },
            "hasNextPage": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Allow the user to navigate to the next page"
                },
                "attribute": "has-next-page",
                "reflect": false
            },
            "hasPreviousPage": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Allow the user to navigate to the previous page"
                },
                "attribute": "has-previous-page",
                "reflect": false
            },
            "pageSize": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The number of results displayed per page."
                },
                "attribute": "page-size",
                "reflect": false
            },
            "pageSizeOptions": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Options for page sizes (comma separated list of numbers). If omitted, will not display the page size subcomponent."
                },
                "attribute": "page-size-options",
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "marketPaginationPageSizeChange",
                "name": "marketPaginationPageSizeChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the page size is changed."
                },
                "complexType": {
                    "original": "TMarketPaginationPageSizeChangeEventDetail",
                    "resolved": "{ value: string; }",
                    "references": {
                        "TMarketPaginationPageSizeChangeEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-pagination/events.ts::TMarketPaginationPageSizeChangeEventDetail"
                        }
                    }
                }
            }, {
                "method": "marketPaginationNavigation",
                "name": "marketPaginationNavigation",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the menu selection is changed."
                },
                "complexType": {
                    "original": "TMarketInternalPaginationNavigationEventDetail",
                    "resolved": "{ page: string; prevPage: string; pageSize: string; }",
                    "references": {
                        "TMarketInternalPaginationNavigationEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-pagination/events.ts::TMarketInternalPaginationNavigationEventDetail"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "marketInternalPaginationPageSizeChange",
                "method": "changePageSize",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketInternalPaginationNavigation",
                "method": "navigatePage",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-pagination.js.map
