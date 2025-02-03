'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const index$1 = require('./index-254d04f0.js');

const MarketPaginationPageSize = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketInternalPaginationPageSizeChange = index.createEvent(this, "marketInternalPaginationPageSizeChange", 7);
        this.disabled = false;
        this.value = undefined;
        this.pageSizeOptions = undefined;
    }
    listSelectionEventHander(e) {
        const { newSelectionValue } = e.detail;
        this.marketInternalPaginationPageSizeChange.emit({
            value: newSelectionValue,
        });
    }
    render() {
        const MarketButtonDropdownTagName = index$1.getNamespacedTagFor('market-button-dropdown');
        const MarketFilterButtonTagName = index$1.getNamespacedTagFor('market-filter-button');
        const MarketListTagName = index$1.getNamespacedTagFor('market-list');
        const MarketRowTagName = index$1.getNamespacedTagFor('market-row');
        return (index.h(index.Host, { key: 'c4511320fe668bb5e065a8f51957f819608757fa', class: "market-pagination-page-size" }, index.h(MarketButtonDropdownTagName, { key: '289fe7e37f92932ee31a5ade32092fbeb4ffd4a4', "no-caret": true, "popover-placement": "bottom-start", "persist-list": true, disabled: this.disabled }, index.h(MarketFilterButtonTagName, { key: '5f460172c2a650868946c795409161ca67238764', size: "small", slot: "trigger" }, index.h("span", { key: 'dd8d9faa460a3eec20671666790e6baff9bc03f0' }, index.h("slot", { key: '7d117121d9138aaf9950aecbc81f3965b6a3be7f', name: "page-size-label" }, "Results per page")), index.h("span", { key: 'd0bdaa3b315b6b4b13536e57f6b268aa31b5a986', slot: "feedback" }, index.h("slot", { key: '38f004fbb2b31bb0f0253b8c93fb161de4e08301', name: "page-size-feedback" }, this.value))), index.h(MarketListTagName, { key: '51673197836c462aa9dee75c3d27fbe376a49d9f', value: this.value, slot: "content" }, this.pageSizeOptions.split(',').map((v) => (index.h(MarketRowTagName, { key: `pageSize_${v}`, value: v }, v)))))));
    }
    get el() { return index.getElement(this); }
};

exports.market_pagination_page_size = MarketPaginationPageSize;

//# sourceMappingURL=market-pagination-page-size.cjs.entry.js.map