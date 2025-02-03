import { Host, h } from "@stencil/core";
/**
 * This is an implementation component only and does not relfect any component in the
 * design spec for Market */
/**
 * @slot - Default slot
 */
export class MarketTableArea {
    constructor() {
        this.orientation = 'horizontal';
        this.stickTo = undefined;
        this.gridTemplate = undefined;
        this.active = false;
        this.placement = [1, -1];
        this.elements = undefined;
    }
    /* When the gridTemplate changes, we need to parse it and update this elements's
    grid-template-columns property, which defines the number and widths of columns
    within this area */
    assignGridTemplate(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            if (newValue.length > 0 ||
                oldValue === undefined // shows content for tables w/o header row
            ) {
                this.active = true;
                this.el.style.gridTemplateColumns = newValue.join(' ');
            }
            else {
                this.active = false;
                this.el.style.gridTemplateColumns = undefined;
            }
        }
    }
    /* When the placement changes, we need to parse it and update this element's
    grid-column property in order to correctly place it within the parent grid.
    Used to support sticky areas */
    placementObserver(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.el.style.gridColumn = `${newValue[0]} / span ${newValue[1]}`;
        }
    }
    componentWillLoad() {
        this.assignGridTemplate(this.gridTemplate);
    }
    render() {
        return (h(Host, { key: 'cef70d070c991957e4b65b0bc959ee6bc2deb8b8', class: "market-table-area" }, h("slot", { key: 'be6981eae7a5e4ae5dd8753fb20542dbcfc2a072' })));
    }
    static get is() { return "market-table-area"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-table-area.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-table-area.css"]
        };
    }
    static get properties() {
        return {
            "orientation": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'horizontal' | 'vertical'",
                    "resolved": "\"horizontal\" | \"vertical\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether or not this area is grouping columns (vertical) or rows (horizontal)"
                },
                "attribute": "orientation",
                "reflect": true,
                "defaultValue": "'horizontal'"
            },
            "stickTo": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'top' | 'bottom' | 'left' | 'right'",
                    "resolved": "\"bottom\" | \"left\" | \"right\" | \"top\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sticks this area to an edge of the table"
                },
                "attribute": "stick-to",
                "reflect": true
            },
            "gridTemplate": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Array<string>",
                    "resolved": "string[]",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Set by the parent market-table or market-row component to determine CSS grid template"
                }
            },
            "active": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether or not this table area is currently visible/has any rows or cells within"
                },
                "attribute": "active",
                "reflect": true,
                "defaultValue": "false"
            },
            "placement": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Array<number>",
                    "resolved": "number[]",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sets the element's grid-column CSS property to determine where this particular element\nfalls on the parent grid. Used in vertical orientation table areas"
                },
                "defaultValue": "[1, -1]"
            }
        };
    }
    static get states() {
        return {
            "elements": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "gridTemplate",
                "methodName": "assignGridTemplate"
            }, {
                "propName": "placement",
                "methodName": "placementObserver"
            }];
    }
}
//# sourceMappingURL=market-table-area.js.map
