import { Host, h } from "@stencil/core";
import { ACCORDION_HEADING_10_VARIANT_EXPANDED_PHASE_ICON_ASSET, ACCORDION_HEADING_20_VARIANT_EXPANDED_PHASE_ICON_ASSET, ACCORDION_HEADING_30_VARIANT_EXPANDED_PHASE_ICON_ASSET, } from "@market/market-theme/js/cjs/index.js";
import { getNamespacedTagFor } from "../../utils/namespace";
const sizeToHeadingType = {
    large: '2',
    medium: '3',
    small: '4',
};
export class MarketAccordionItem {
    constructor() {
        this.name = undefined;
        this.expanded = false;
        this.disabled = false;
        this.size = 'medium';
        this.customTrigger = undefined;
    }
    marketAccordionToggleHandler(e) {
        e.stopPropagation();
        this.setExpanded(!this.expanded);
    }
    /**
     * Used to set the "open" state of the accordion.
     */
    setExpanded(newExpanded) {
        const oldExpanded = this.expanded;
        if (newExpanded !== oldExpanded) {
            const { defaultPrevented } = this.marketAccordionItemExpandedChange.emit({
                expanded: newExpanded,
            });
            if (!defaultPrevented) {
                this.expanded = newExpanded;
                if (this.customTrigger) {
                    this.customTrigger.expanded = newExpanded;
                }
            }
        }
        return Promise.resolve();
    }
    /**
     * Sets `disabled` state. Allows external elements to programmatically trigger disabled styling.
     */
    setDisabled(value) {
        this.disabled = value;
        return Promise.resolve();
    }
    getAccordionIcon() {
        switch (this.size) {
            case 'small':
                return ACCORDION_HEADING_10_VARIANT_EXPANDED_PHASE_ICON_ASSET;
            case 'large':
                return ACCORDION_HEADING_30_VARIANT_EXPANDED_PHASE_ICON_ASSET;
            default: // medium
                return ACCORDION_HEADING_20_VARIANT_EXPANDED_PHASE_ICON_ASSET;
        }
    }
    componentWillLoad() {
        this.customTrigger = this.el.querySelector('[slot="custom-trigger"]');
        if (this.customTrigger) {
            this.customTrigger.expanded = this.expanded;
        }
    }
    render() {
        const Heading = `h${sizeToHeadingType[this.size]}`;
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        return (h(Host, { key: '9bf53527577d02430c7a2e71fcdcd1e9f46002f8', class: "market-accordion-item" }, this.customTrigger ? (h("slot", { name: "custom-trigger" })) : (h(Heading, null, h("button", { id: `${this.name}__button`, type: "button", "aria-expanded": this.expanded, "aria-controls": `${this.name}__content`, "aria-disabled": this.disabled, disabled: this.disabled, onClick: () => this.setExpanded(!this.expanded) }, h("slot", { name: "label" }), h(MarketIconTagName, { name: this.getAccordionIcon() })))), this.expanded && (h("div", { key: '698e4a519769aab483d1d273221a92b310f32d27', id: `${this.name}__content`, class: "accordion-content", role: "region", "aria-labelledby": `${this.name}__button` }, h("slot", { key: '65b7d758f1ee1fda7e3355a35a2dd9b465655265' })))));
    }
    static get is() { return "market-accordion-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-accordion-item.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-accordion-item.css"]
        };
    }
    static get properties() {
        return {
            "name": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The unique name of the accordion."
                },
                "attribute": "name",
                "reflect": true
            },
            "expanded": {
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
                    "text": "Determines whether the accordion is shown as expanded or collapsed."
                },
                "attribute": "expanded",
                "reflect": true,
                "defaultValue": "false"
            },
            "disabled": {
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
                    "text": "Whether the accordion should appear in a disabled state."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "size": {
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
                    "text": "The size of the heading text of the accordion."
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'medium'"
            }
        };
    }
    static get states() {
        return {
            "customTrigger": {}
        };
    }
    static get events() {
        return [{
                "method": "marketAccordionItemExpandedChange",
                "name": "marketAccordionItemExpandedChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the \"expanded\" prop value changes."
                },
                "complexType": {
                    "original": "{ expanded: boolean }",
                    "resolved": "{ expanded: boolean; }",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "setExpanded": {
                "complexType": {
                    "signature": "(newExpanded: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "newExpanded",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Used to set the \"open\" state of the accordion.",
                    "tags": []
                }
            },
            "setDisabled": {
                "complexType": {
                    "signature": "(value: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "value",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sets `disabled` state. Allows external elements to programmatically trigger disabled styling.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "marketAccordionToggled",
                "method": "marketAccordionToggleHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-accordion-item.js.map
