import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../utils/namespace";
export class MarketActivityIndicator {
    constructor() {
        this.size = 'large';
    }
    render() {
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        return (h(Host, { key: 'c13642455d6b245c715c753184dacb23e340e24d', class: "market-activity-indicator" }, h(MarketIconTagName, { key: 'cbfa4da92d24e125d4edbe192475faa710c94102', name: "radial-spinner" })));
    }
    static get is() { return "market-activity-indicator"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-activity-indicator.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-activity-indicator.css"]
        };
    }
    static get properties() {
        return {
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'large' | 'small'",
                    "resolved": "\"large\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting activity indicator size"
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'large'"
            }
        };
    }
}
//# sourceMappingURL=market-activity-indicator.js.map
