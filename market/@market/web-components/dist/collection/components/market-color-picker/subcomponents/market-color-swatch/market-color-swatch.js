import { Host, h } from "@stencil/core";
import { CORE_BLUE_FILL_COLOR } from "@market/market-theme/js/cjs/index.js";
export class MarketColorSwatch {
    constructor() {
        this.value = CORE_BLUE_FILL_COLOR;
        this.name = undefined;
        this.disabled = undefined;
        this.selected = false;
    }
    toggleSelection() {
        if (this.disabled) {
            return;
        }
        const newSelection = !this.selected;
        const swatchValue = { value: this.value, selected: newSelection };
        const { defaultPrevented } = this.marketColorSwatchSelectedChange.emit(swatchValue);
        if (!defaultPrevented) {
            this.selected = newSelection;
        }
    }
    render() {
        return (h(Host, { key: 'cdffd64fba69827a9ddd35e01e9c01f1f05f130a', class: "market-color-swatch", role: "listitem", onClick: () => this.toggleSelection(), style: { '--swatch-color': this.value } }, h("div", { key: 'e119468a948e2c977c84d3ade7040d6864e1f7ba', class: "inner-circle" })));
    }
    static get is() { return "market-color-swatch"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-color-swatch.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-color-swatch.css"]
        };
    }
    static get properties() {
        return {
            "value": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Value representing the color of the swatch. This is a string that can represent any [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color)."
                },
                "attribute": "value",
                "reflect": true,
                "defaultValue": "CORE_BLUE_FILL_COLOR"
            },
            "name": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "name",
                "reflect": true
            },
            "disabled": {
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
                    "text": ""
                },
                "attribute": "disabled",
                "reflect": true
            },
            "selected": {
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
                    "text": "Whether the swatch is selected or not."
                },
                "attribute": "selected",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketColorSwatchSelectedChange",
                "name": "marketColorSwatchSelectedChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the swatch selection state changes."
                },
                "complexType": {
                    "original": "{ value: string; selected: boolean }",
                    "resolved": "{ value: string; selected: boolean; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-color-swatch.js.map
