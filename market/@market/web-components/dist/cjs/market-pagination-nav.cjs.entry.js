'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const index$1 = require('./index-254d04f0.js');

const MarketPaginationNav = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketInternalPaginationNavigation = index.createEvent(this, "marketInternalPaginationNavigation", 7);
        this.currentPage = undefined;
        this.disabled = false;
        this.totalPages = undefined;
        this.hasNextPage = undefined;
        this.hasPreviousPage = undefined;
        this.pageSize = undefined;
    }
    listSelectionEventHandler(e) {
        const { newSelectionValue } = e.detail;
        this.marketInternalPaginationNavigation.emit({
            page: newSelectionValue,
            prevPage: `${this.currentPage}`,
            pageSize: this.pageSize,
        });
    }
    handlePrev() {
        if (this.hasPreviousPage === false || this.currentPage === 1) {
            return;
        }
        const prevPage = this.currentPage - 1;
        this.marketInternalPaginationNavigation.emit({
            page: `${prevPage}`,
            prevPage: `${this.currentPage}`,
            pageSize: this.pageSize,
        });
    }
    handleNext() {
        if (this.hasNextPage === false || (Boolean(this.totalPages) && this.currentPage === this.totalPages)) {
            return;
        }
        const nextPage = this.currentPage + 1;
        this.marketInternalPaginationNavigation.emit({
            page: `${nextPage}`,
            prevPage: `${this.currentPage}`,
            pageSize: this.pageSize,
        });
    }
    /**
     * Dropdown navigates by every 10 pages if there are more than 20 pages
     *
     * pageList for a large dataset = [10, 20, 30, 40, 50...]
     * pageList for a small dataset = [1, 2, 3, 5, 6, 7...]
     */
    get pageList() {
        const isLargeDataset = this.totalPages > 20;
        const largeDatasetSteps = 10;
        return isLargeDataset
            ? Array.from({ length: Math.floor(this.totalPages / largeDatasetSteps) }).map((_, i) => (i + 1) * largeDatasetSteps)
            : Array.from({ length: this.totalPages }).map((_, i) => i + 1);
    }
    render() {
        // Don't render page info when totalPages is missing or set to 0
        const renderPageInfo = Boolean(this.totalPages);
        const hasPreviousPage = this.currentPage > 1 || this.hasPreviousPage;
        const hasNextPage = this.currentPage < this.totalPages || this.hasNextPage;
        const MarketButtonTagName = index$1.getNamespacedTagFor('market-button');
        const MarketButtonDropdownTagName = index$1.getNamespacedTagFor('market-button-dropdown');
        const MarketFilterButtonTagName = index$1.getNamespacedTagFor('market-filter-button');
        const MarketListTagName = index$1.getNamespacedTagFor('market-list');
        const MarketRowTagName = index$1.getNamespacedTagFor('market-row');
        const MarketAccessoryTagName = index$1.getNamespacedTagFor('market-accessory');
        return (index.h(index.Host, { key: '1a1b08b672af0d218bfefd4224a55c28370f0b03', class: "market-pagination-nav" }, index.h("nav", { key: '11e5fe0adc8bf825845d771a5a80c770b9e82859' }, index.h(MarketButtonTagName, { key: '8b8de9d551c9931a8d055a61d4e040cddc161f81', size: "small", disabled: this.disabled || !hasPreviousPage, onClick: () => this.handlePrev() }, index.h(MarketAccessoryTagName, { key: 'd68f8220c3e1d024382d34c25881bd2f147ae906', slot: "icon" }, index.h("svg", { key: '3aa918aba8eb5108d81f6351284ad362c658af23', width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { key: '362cea388001d27fe0761c2a1b2b8320dce857f5', "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.29289 11.293C3.90237 11.6835 3.90237 12.3167 4.29289 12.7072L11.2929 19.7072L12.7071 18.293L7.41421 13.0001L19 13.0001V11.0001L7.41421 11.0001L12.7071 5.70718L11.2929 4.29297L4.29289 11.293Z" })))), renderPageInfo && (index.h(MarketButtonDropdownTagName, { key: 'd161fc23d7ba148dbd353aeca60db66d6233b7fd', disabled: this.disabled, "no-caret": true, "popover-placement": "bottom-end", "persist-list": true }, index.h(MarketFilterButtonTagName, { key: '9712f794d647f0769475b4109cc0ed0cb189fcc5', size: "small", slot: "trigger" }, index.h("span", { key: '826ed87de74d5abecaf2e3ad07881ac975a92051' }, index.h("slot", { key: '88ef338eaab4470e25e70a9d9b4c2833052c1fc3', name: "nav-label" }, "Page")), index.h("span", { key: 'c9fca87a76e1203abb26bfb9ca80200dc5136bae', slot: "feedback" }, index.h("slot", { key: '1d6207b2b3ce4995674d57dfa43d5232a16d95e4', name: "nav-feedback" }, this.currentPage, " of ", this.totalPages))), index.h(MarketListTagName, { key: 'c04b1964074e1ddad685664ce1c4b80f8650586c', slot: "content" }, this.pageList.map((pageNum) => (index.h(MarketRowTagName, { key: `pageNav_${pageNum}`, selected: this.currentPage === pageNum, value: `${pageNum}` }, pageNum)))))), index.h(MarketButtonTagName, { key: '991e53ad933bd431aa3d33480a778927c8477ff0', size: "small", disabled: this.disabled || !hasNextPage, onClick: () => this.handleNext() }, index.h(MarketAccessoryTagName, { key: '7933bfbed07cb4d488fba7c54b68455b00971d2e', slot: "icon" }, index.h("svg", { key: '77d87ca20e25596108f752b0d13ed49bac34d441', width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { key: '5536170797743ed022842af94a2be00fecabb58a', "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M19.7071 11.293C20.0976 11.6835 20.0976 12.3167 19.7071 12.7072L12.7071 19.7072L11.2929 18.293L16.5858 13.0001L5 13.0001L5 11.0001L16.5858 11.0001L11.2929 5.70718L12.7071 4.29297L19.7071 11.293Z" })))))));
    }
    get el() { return index.getElement(this); }
};

exports.market_pagination_nav = MarketPaginationNav;

//# sourceMappingURL=market-pagination-nav.cjs.entry.js.map