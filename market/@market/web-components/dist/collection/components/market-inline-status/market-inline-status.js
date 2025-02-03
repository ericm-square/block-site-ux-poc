import { Host, h } from "@stencil/core";
import { getSuccessIcon, getInfoIcon, getWarningIcon, getCriticalIcon } from "./icons";
/**
 * @slot - The text for market-inline-status
 * @slot icon - Optional, for use with a custom icon
 */
export class MarketInlineStatus {
    constructor() {
        this.variant = 'info';
    }
    render() {
        return (h(Host, { key: 'ce4428f0523ed96deb0f6167b96f87ed34bd64d1', class: "market-inline-status" }, h("slot", { key: 'd03865e2931b958cfb05f1224af729cd41eb095c', name: "icon" }, this.variant === 'info' && getInfoIcon(), this.variant === 'success' && getSuccessIcon(), this.variant === 'warning' && getWarningIcon(), this.variant === 'critical' && getCriticalIcon()), h("slot", { key: 'b830ce20c7ce9c407e5a14d46f97b80024b14168' })));
    }
    static get is() { return "market-inline-status"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-inline-status.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-inline-status.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'info' | 'success' | 'warning' | 'critical'",
                    "resolved": "\"critical\" | \"info\" | \"success\" | \"warning\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "variant",
                "reflect": true,
                "defaultValue": "'info'"
            }
        };
    }
}
//# sourceMappingURL=market-inline-status.js.map
