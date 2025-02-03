import { Host, h } from "@stencil/core";
export class MarketTabPanel {
    constructor() {
        this.hidden = false;
    }
    render() {
        return (h(Host, { key: '6d3e25ab96517ba62ea131f1f205afb5036aadbc', "aria-hidden": this.hidden.toString(), class: "market-tab-panel", role: "tabpanel", tabindex: "0" }, h("slot", { key: '348c7928d64c672f5562456f6faea14a1b549075' })));
    }
    static get is() { return "market-tab-panel"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-tab-panel.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-tab-panel.css"]
        };
    }
    static get properties() {
        return {
            "hidden": {
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
                    "text": "Whether or not the panel is hidden"
                },
                "attribute": "hidden",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-tab-panel.js.map
