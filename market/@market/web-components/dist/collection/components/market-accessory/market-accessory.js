import { Host, h } from "@stencil/core";
/**
 * @slot - Intended for a slotted image or icon.
 */
export class MarketAccessory {
    constructor() {
        this.size = undefined;
    }
    /* TODO: add optional height/width props for custom sizing of slotted image */
    render() {
        return (h(Host, { key: 'ce321a0739c785b655c6483c94ace4248f7adcbb', class: "market-accessory", size: this.size }, h("slot", { key: '4190735a507d572868ad9f54da6a6039a66794e5' })));
    }
    static get is() { return "market-accessory"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-accessory.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-accessory.css"]
        };
    }
    static get properties() {
        return {
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'icon' | 'image'",
                    "resolved": "\"icon\" | \"image\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The desired size for the leading or trailing accessory, which we expect to\nbe either an image or a <market-icon> component. The available sizes are\n\"icon\" (24x24) and \"image\" (40x40)."
                },
                "attribute": "size",
                "reflect": false
            }
        };
    }
}
//# sourceMappingURL=market-accessory.js.map
