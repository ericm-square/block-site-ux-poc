import { Host, h } from "@stencil/core";
import { MENU_SLOT_NAMES } from "../../enums/menu";
import { getNamespacedTagFor } from "../../../../utils/namespace";
/**
 * @slot 'today' - slot for market date picker menu today option;
 * @slot 'yesterday' - slot for market date picker menu yesterday option;
 * @slot 'this-week' - slot for market date picker menu this week option;
 * @slot 'last-week' - slot for market date picker menu last week option;
 * @slot 'this-month' - slot for market date picker menu this month option;
 * @slot 'last-month' - slot for market date picker menu last month option;
 * @slot 'this-year' - slot for market date picker menu this year option;
 * @slot 'last-year' - slot for market date picker menu last year option;
 * @slot 'custom' - slot for market date picker menu custom option;
 */
export class MarketDatePickerMenu {
    constructor() {
        this.timeframe = 'present';
        this.excludeMenuItems = '';
        this.presetMenuOption = undefined;
    }
    handleMarketListSelectionsDidChange(e) {
        e.stopPropagation();
        this.marketDatePickerMenuSelectionChanged.emit({
            menuSelection: e.detail.newSelectionValue,
        });
    }
    /**
     * Method to visually select Custom row for use by the date picker component
     * (internal use only)
     */
    _selectCustomRow() {
        const MarketRowTagName = getNamespacedTagFor('market-row');
        this.el.shadowRoot.querySelectorAll(MarketRowTagName).forEach((row) => {
            if (row.querySelector('slot').name === MENU_SLOT_NAMES.CUSTOM) {
                row.click();
            }
        });
        return Promise.resolve();
    }
    render() {
        const MarketListTagName = getNamespacedTagFor('market-list');
        const MarketRowTagName = getNamespacedTagFor('market-row');
        const excludedItems = this.excludeMenuItems.split(',');
        return (h(Host, { key: '6090ec920f710ad17233bc061600f108bc13fff6', class: "market-date-picker-menu" }, h(MarketListTagName, { key: '3473a573abe914accc731ff4d97cfe166248087c', interactive: true }, this.timeframe !== 'past' && !excludedItems.includes(MENU_SLOT_NAMES.TODAY) && (h(MarketRowTagName, { key: 'eedc051737dc15a743af020751cef2c37271bff7', value: MENU_SLOT_NAMES.TODAY, selected: this.presetMenuOption === MENU_SLOT_NAMES.TODAY }, h("slot", { key: 'd782a493549f936b7a71c9ecd39ff67ad1c88d70', name: MENU_SLOT_NAMES.TODAY }, "Today"))), this.timeframe !== 'future' && !excludedItems.includes(MENU_SLOT_NAMES.YESTERDAY) && (h(MarketRowTagName, { key: '72521a7e96473e55de174166ff6afa46fd383f2f', value: MENU_SLOT_NAMES.YESTERDAY, selected: this.presetMenuOption === MENU_SLOT_NAMES.YESTERDAY }, h("slot", { key: 'db259f0d8269deb3fad87b4b2bcad6cd9867034c', name: MENU_SLOT_NAMES.YESTERDAY }, "Yesterday"))), this.timeframe !== 'past' && !excludedItems.includes(MENU_SLOT_NAMES.THIS_WEEK) && (h(MarketRowTagName, { key: '8660bc56922d1e2bcd14269659bd462749eba341', value: MENU_SLOT_NAMES.THIS_WEEK, selected: this.presetMenuOption === MENU_SLOT_NAMES.THIS_WEEK }, h("slot", { key: 'dfeb980290086dcc8d8f7201502239bbd51fa260', name: MENU_SLOT_NAMES.THIS_WEEK }, "This week"))), this.timeframe !== 'future' && !excludedItems.includes(MENU_SLOT_NAMES.LAST_WEEK) && (h(MarketRowTagName, { key: '776ed0ad2290ec60c57a55f9ae4010754c8c4acb', value: MENU_SLOT_NAMES.LAST_WEEK, selected: this.presetMenuOption === MENU_SLOT_NAMES.LAST_WEEK }, h("slot", { key: '9409f941203c9c46135301df12375494b3f3f28d', name: MENU_SLOT_NAMES.LAST_WEEK }, "Last week"))), this.timeframe !== 'past' && !excludedItems.includes(MENU_SLOT_NAMES.THIS_MONTH) && (h(MarketRowTagName, { key: 'fc732ad76d322f0ad329880e6603132917deb408', value: MENU_SLOT_NAMES.THIS_MONTH, selected: this.presetMenuOption === MENU_SLOT_NAMES.THIS_MONTH }, h("slot", { key: '43ffecd94558b942b89c55876591e0cbe2f66d86', name: MENU_SLOT_NAMES.THIS_MONTH }, "This month"))), this.timeframe !== 'future' && !excludedItems.includes(MENU_SLOT_NAMES.LAST_MONTH) && (h(MarketRowTagName, { key: 'e0ee3686874390121ac5d869eb0c913845ee4ad7', value: MENU_SLOT_NAMES.LAST_MONTH, selected: this.presetMenuOption === MENU_SLOT_NAMES.LAST_MONTH }, h("slot", { key: 'b1f4ebffed7e3c4e7a7694b092d6e9aac358d81b', name: MENU_SLOT_NAMES.LAST_MONTH }, "Last month"))), this.timeframe !== 'past' && !excludedItems.includes(MENU_SLOT_NAMES.THIS_YEAR) && (h(MarketRowTagName, { key: 'cfadc74f7f5dc2e690069586e32741b0cf0cccfe', value: MENU_SLOT_NAMES.THIS_YEAR, selected: this.presetMenuOption === MENU_SLOT_NAMES.THIS_YEAR }, h("slot", { key: 'bfc37f3ddc5714a1f3712659f84bac997e6e342b', name: MENU_SLOT_NAMES.THIS_YEAR }, "This year"))), this.timeframe !== 'future' && !excludedItems.includes(MENU_SLOT_NAMES.LAST_YEAR) && (h(MarketRowTagName, { key: 'e78f7a5172c0bfb5981a7406b4c72f97ea982fea', value: MENU_SLOT_NAMES.LAST_YEAR, selected: this.presetMenuOption === MENU_SLOT_NAMES.LAST_YEAR }, h("slot", { key: 'ef34c7825b2caff5958fb3555bb2f7acd9345876', name: MENU_SLOT_NAMES.LAST_YEAR }, "Last year"))), !excludedItems.includes(MENU_SLOT_NAMES.CUSTOM) && (h(MarketRowTagName, { key: 'b21974f32253bf276e7338a6cfabcdcbdfbe0c88', value: MENU_SLOT_NAMES.CUSTOM, selected: this.presetMenuOption === MENU_SLOT_NAMES.CUSTOM }, h("slot", { key: '4c6281b3a79f0d24d278b023fe52449b459bac11', name: MENU_SLOT_NAMES.CUSTOM }, "Custom"))))));
    }
    static get is() { return "market-date-picker-menu"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-date-picker-menu.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-date-picker-menu.css"]
        };
    }
    static get properties() {
        return {
            "timeframe": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'past' | 'present' | 'future'",
                    "resolved": "\"future\" | \"past\" | \"present\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting timeframe type to select which menu items to show"
                },
                "attribute": "timeframe",
                "reflect": true,
                "defaultValue": "'present'"
            },
            "excludeMenuItems": {
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
                    "text": "A list of menu items that will be excluded from appearing on the menu list.\ni.e. `this-year,last-year` or `today,this-week,last-week,custom`\nThe menu names are lowercase and hyphenated strings, found here:\nhttps://github.com/squareup/market/blob/main/web/web-components/src/components/market-date-picker/enums/menu.tsx\n\nThis works in conjunction with timeframe,\ni.e. \"timeframe=past\", excludes dates in the future in addition to the ones here.\nThis is written as items separated by ','."
                },
                "attribute": "exclude-menu-items",
                "reflect": false,
                "defaultValue": "''"
            },
            "presetMenuOption": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "MENU_SLOT_NAMES",
                    "resolved": "MENU_SLOT_NAMES.CUSTOM | MENU_SLOT_NAMES.LAST_MONTH | MENU_SLOT_NAMES.LAST_WEEK | MENU_SLOT_NAMES.LAST_YEAR | MENU_SLOT_NAMES.THIS_MONTH | MENU_SLOT_NAMES.THIS_WEEK | MENU_SLOT_NAMES.THIS_YEAR | MENU_SLOT_NAMES.TODAY | MENU_SLOT_NAMES.YESTERDAY",
                    "references": {
                        "MENU_SLOT_NAMES": {
                            "location": "import",
                            "path": "../../enums/menu",
                            "id": "src/components/market-date-picker/enums/menu.tsx::MENU_SLOT_NAMES"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Preset menu option passed from the parent. For the menu, this handles visually selecting the menu row."
                },
                "attribute": "preset-menu-option",
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "marketDatePickerMenuSelectionChanged",
                "name": "marketDatePickerMenuSelectionChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever a menu item is selected"
                },
                "complexType": {
                    "original": "TMarketDatePickerMenuSelectionChangedEventDetail",
                    "resolved": "{ menuSelection: \"today\" | \"yesterday\" | \"this-week\" | \"last-week\" | \"this-month\" | \"last-month\" | \"this-year\" | \"last-year\" | \"custom\"; }",
                    "references": {
                        "TMarketDatePickerMenuSelectionChangedEventDetail": {
                            "location": "import",
                            "path": "../../events",
                            "id": "src/components/market-date-picker/events.ts::TMarketDatePickerMenuSelectionChangedEventDetail"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "_selectCustomRow": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Method to visually select Custom row for use by the date picker component\n(internal use only)",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "marketListSelectionsDidChange",
                "method": "handleMarketListSelectionsDidChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-date-picker-menu.js.map
