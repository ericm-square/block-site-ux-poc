import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../utils/namespace";
export class MarketPill {
    constructor() {
        this.variant = 'normal';
        this.size = 'medium';
        this.indicator = false;
        this.interactive = false;
    }
    renderIndicator() {
        const MarketAccessoryTag = getNamespacedTagFor('market-accessory');
        return this.size === 'medium' ? (h(MarketAccessoryTag, null, h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("circle", { cx: "8", cy: "8", r: "5" })))) : (h(MarketAccessoryTag, null, h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("circle", { cx: "8", cy: "8", r: "4" }))));
    }
    render() {
        return (h(Host, { key: 'e96bb6d40d9226db752a3934a88d04b5c5aa0cac', class: "market-pill" }, h("slot", { key: 'b1116a3e6fe9360b141f98c69c376ec2aea519f8', name: "icon" }, this.indicator && this.renderIndicator()), h("slot", { key: '4b50c149d4029c6847887127815d6146ce32a380' })));
    }
    static get is() { return "market-pill"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-pill.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-pill.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "MarketPillVariant",
                    "resolved": "\"alpha\" | \"beta\" | \"critical\" | \"emphasis\" | \"insight\" | \"normal\" | \"success\" | \"warning\"",
                    "references": {
                        "MarketPillVariant": {
                            "location": "import",
                            "path": "../../utils/pill-variant",
                            "id": "src/utils/pill-variant.ts::MarketPillVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sets the visual variant style for the pill."
                },
                "attribute": "variant",
                "reflect": true,
                "defaultValue": "'normal'"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'medium' | 'small'",
                    "resolved": "\"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting pill size"
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'medium'"
            },
            "indicator": {
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
                    "text": "Controls whether the pill should display an indicator icon."
                },
                "attribute": "indicator",
                "reflect": true,
                "defaultValue": "false"
            },
            "interactive": {
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
                    "text": "Controls whether the pill should react to hovers/clicks. It is recommended to only set this to true if you have also slotted an icon into the pill."
                },
                "attribute": "interactive",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
}
//# sourceMappingURL=market-pill.js.map
