import { Host, h } from "@stencil/core";
/**
 * @slot - Heading tag with text, ex. h2, h3, h4, h5, h6.
 * @slot trailing-accessory - Accessory to display at the end of the header line.
 */
export class MarketInlineSectionHeader {
    render() {
        return (h(Host, { key: '1e021e90353a3773683597d5b1509918652ed000' }, h("slot", { key: '9b822f33cb4a646ad27a0e9131cd98ee83b6cea6' }), h("slot", { key: '9395fdc855ced7754ce4cdc03023998de4b7c3b0', name: "trailing-accessory" })));
    }
    static get is() { return "market-inline-section-header"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-inline-section-header.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-inline-section-header.css"]
        };
    }
}
//# sourceMappingURL=market-inline-section-header.js.map
