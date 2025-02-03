import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';

const MarketPaginationPageSize$1 = /*@__PURE__*/ proxyCustomElement(class MarketPaginationPageSize extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.marketInternalPaginationPageSizeChange = createEvent(this, "marketInternalPaginationPageSizeChange", 7);
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
        const MarketButtonDropdownTagName = getNamespacedTagFor('market-button-dropdown');
        const MarketFilterButtonTagName = getNamespacedTagFor('market-filter-button');
        const MarketListTagName = getNamespacedTagFor('market-list');
        const MarketRowTagName = getNamespacedTagFor('market-row');
        return (h(Host, { key: 'c4511320fe668bb5e065a8f51957f819608757fa', class: "market-pagination-page-size" }, h(MarketButtonDropdownTagName, { key: '289fe7e37f92932ee31a5ade32092fbeb4ffd4a4', "no-caret": true, "popover-placement": "bottom-start", "persist-list": true, disabled: this.disabled }, h(MarketFilterButtonTagName, { key: '5f460172c2a650868946c795409161ca67238764', size: "small", slot: "trigger" }, h("span", { key: 'dd8d9faa460a3eec20671666790e6baff9bc03f0' }, h("slot", { key: '7d117121d9138aaf9950aecbc81f3965b6a3be7f', name: "page-size-label" }, "Results per page")), h("span", { key: 'd0bdaa3b315b6b4b13536e57f6b268aa31b5a986', slot: "feedback" }, h("slot", { key: '38f004fbb2b31bb0f0253b8c93fb161de4e08301', name: "page-size-feedback" }, this.value))), h(MarketListTagName, { key: '51673197836c462aa9dee75c3d27fbe376a49d9f', value: this.value, slot: "content" }, this.pageSizeOptions.split(',').map((v) => (h(MarketRowTagName, { key: `pageSize_${v}`, value: v }, v)))))));
    }
    get el() { return this; }
}, [4, "market-pagination-page-size", {
        "disabled": [516],
        "value": [1],
        "pageSizeOptions": [1, "page-size-options"]
    }, [[0, "marketListSelectionsDidChange", "listSelectionEventHander"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-pagination-page-size"];
    components.forEach(tagName => { switch (tagName) {
        case "market-pagination-page-size":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketPaginationPageSize$1);
            }
            break;
    } });
}

const MarketPaginationPageSize = MarketPaginationPageSize$1;
const defineCustomElement = defineCustomElement$1;

export { MarketPaginationPageSize, defineCustomElement };

//# sourceMappingURL=market-pagination-page-size.js.map