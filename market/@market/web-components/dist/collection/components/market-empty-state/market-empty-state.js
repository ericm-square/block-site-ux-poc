import { Host, h } from "@stencil/core";
/**
 * @slot primary-text - Primary text; `<h3>` element is recommended
 * @slot secondary-text - Secondary text; `<p>` element is recommended
 * @slot media - Media that appears above the primary text
 * @slot actions - Action elements; `<market-button>` is recommended
 * @slot - default slot is available for slotting non-text content and will appear above all other slots
 */
export class MarketEmptyState {
    constructor() {
        /**
         * Whether or not `.actions` will be displayed (if `actions` slot is provided)
         */
        this.showActions = false;
    }
    handleSlottedContent() {
        this.showActions = Boolean(this.el.querySelector('[slot="actions"]'));
    }
    componentWillRender() {
        this.handleSlottedContent();
    }
    render() {
        return (h(Host, { key: '54e7233386056a887b6bf5ddd92e3c807ccc1a0b', class: "market-empty-state" }, h("slot", { key: '853617bbee38b7d377c76ab6825001578adc2dc8' }), h("slot", { key: '6a4c5d3c4237b40f41469805c4bb87c278106f45', name: "media" }), h("div", { key: 'f0855c32819b9987229b443ea6300643339d8a05', class: "text" }, h("slot", { key: '5b8cb78b638507654b8bca5784805b67f355141b', name: "primary-text" }), h("slot", { key: '1752a55ddc654a3ad72ee5ba000b115b712bbaa3', name: "secondary-text" })), this.showActions && (h("div", { key: '8fe597e76e04a8814c16e2c3958ddf1e3d7faa6b', class: "actions" }, h("slot", { key: '6f05692706f359bd5b604f347ee2e98db1a98be8', name: "actions" })))));
    }
    static get is() { return "market-empty-state"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-empty-state.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-empty-state.css"]
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-empty-state.js.map
