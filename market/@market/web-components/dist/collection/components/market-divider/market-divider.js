import { Host, h } from "@stencil/core";
export class MarketDivider {
    constructor() {
        this.margin = 'medium';
        this.size = 'thick';
    }
    render() {
        return h(Host, { key: 'b585eb868ec3ea219f031f101198924340befc6c', class: "market-divider" });
    }
    static get is() { return "market-divider"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-divider.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-divider.css"]
        };
    }
    static get properties() {
        return {
            "margin": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'small' | 'medium' | 'large'",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sets the vertical margin for the divider."
                },
                "attribute": "margin",
                "reflect": true,
                "defaultValue": "'medium'"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'thick' | 'thin'",
                    "resolved": "\"thick\" | \"thin\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sets the vertical margin for the divider."
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'thick'"
            }
        };
    }
}
//# sourceMappingURL=market-divider.js.map
