import { Host, h } from "@stencil/core";
/**
 * @slot - The content of the footer, ex button(s), text
 */
export class MarketFooter {
    render() {
        return (h(Host, { key: '99d6e49edf0d6d563f09d8e95f4f4f3a04cbd8a3', class: "market-footer" }, h("slot", { key: '65b517c3bbc7a9bc55637ee1d21f738546d70832' })));
    }
    static get is() { return "market-footer"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-footer.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-footer.css"]
        };
    }
}
//# sourceMappingURL=market-footer.js.map
