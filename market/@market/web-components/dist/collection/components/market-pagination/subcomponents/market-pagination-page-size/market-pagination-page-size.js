import { h, Host } from "@stencil/core";
import { getNamespacedTagFor } from "../../../../utils/namespace";
export class MarketPaginationPageSize {
    constructor() {
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
    static get is() { return "market-pagination-page-size"; }
    static get properties() {
        return {
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
                    "text": "Functionally and visually disables dropdown"
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "value": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The number of results displayed per page."
                },
                "attribute": "value",
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
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Options for page sizes (comma separated list)."
                },
                "attribute": "page-size-options",
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "marketInternalPaginationPageSizeChange",
                "name": "marketInternalPaginationPageSizeChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "property",
                            "text": "{string} value - new selected option"
                        }],
                    "text": "Fired when the selected page size value changes"
                },
                "complexType": {
                    "original": "TMarketPaginationPageSizeChangeEventDetail",
                    "resolved": "{ value: string; }",
                    "references": {
                        "TMarketPaginationPageSizeChangeEventDetail": {
                            "location": "import",
                            "path": "../../events",
                            "id": "src/components/market-pagination/events.ts::TMarketPaginationPageSizeChangeEventDetail"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "marketListSelectionsDidChange",
                "method": "listSelectionEventHander",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-pagination-page-size.js.map
