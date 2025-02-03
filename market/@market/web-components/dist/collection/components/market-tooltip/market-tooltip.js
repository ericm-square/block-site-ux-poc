// note that there is currently no spec test for this component. for some
// reason, jest chokes when running spec tests on components that use
// js imports (ex. @market/market-theme/style-dictionary).
import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../utils/namespace";
/**
 * @slot trigger - The text or icon used for the tooltip trigger. Interacting with the
 * slotted content will serve as the trigger that opens the popover. Defaults to
 * an ℹ️ icon.
 * @slot content - Content slotted here will appear in `market-popover`, which
 * becomes visible when the slotted trigger content is interacted with.
 * @part dropdown - the market-dropdown element.
 * @part trigger - the trigger element.
 * @part popover - the popover element.
 */
export class MarketTooltip {
    constructor() {
        this.interaction = 'hover';
        this.disabled = false;
        this.popoverPlacement = 'bottom';
        this.popoverStrategy = 'absolute';
        this.popoverSkidding = undefined;
        this.popoverDistance = 0;
        this.expanded = false;
    }
    dropdownOpenedEventHandler(e) {
        if (e.target !== this.el)
            return;
        this.expanded = true;
        this.marketTooltipOpened.emit();
    }
    dropdownClosedEventHandler(e) {
        if (e.target !== this.el)
            return;
        this.expanded = false;
        this.marketTooltipClosed.emit();
    }
    /**
     * Opens the tooltip
     */
    openTooltip() {
        return this.innerDropdown.openDropdown();
    }
    /**
     * Closes the tooltip
     */
    closeTooltip() {
        return this.innerDropdown.closeDropdown();
    }
    styleLinks() {
        // since it isn't possible to style slotted child elements, we need to add
        // inline styles to slotted links in order to style them correctly
        // https://github.com/WICG/webcomponents/issues/594
        // https://github.com/WICG/webcomponents/issues/331
        var _a;
        const slottedLinks = (_a = [...this.el.children]
            .find((child) => child.slot === 'content')) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`a, ${getNamespacedTagFor('market-link')}`);
        slottedLinks.forEach((link) => {
            link.style.color = 'var(--tooltip-link-color)';
            link.style.fontSize = 'var(--tooltip-link-size)';
            link.style.fontWeight = 'var(--tooltip-link-weight)';
            link.style.lineHeight = 'var(--tooltip-link-leading)';
            link.style.letterSpacing = 'var(--tooltip-link-tracking)';
            link.style.textTransform = 'var(--tooltip-link-case)';
            link.style.textDecoration = 'none';
        });
    }
    componentWillRender() {
        this.styleLinks();
    }
    render() {
        const MarketDropdownTagName = getNamespacedTagFor('market-dropdown');
        return (h(Host, { key: '0e12f461ff0600e9e2cc8834e60ca40c9a0fe22c', "aria-expanded": this.expanded, class: "market-tooltip" }, h(MarketDropdownTagName, { key: 'e341826a86a06bc913f13dac950b73222f171055', interaction: this.interaction, "popover-placement": this.popoverPlacement, "popover-strategy": this.popoverStrategy, "popover-distance": this.popoverDistance, "popover-skidding": this.popoverSkidding, disabled: this.disabled, "aria-expanded": this.expanded, part: "dropdown", ref: (el) => (this.innerDropdown = el) }, h("div", { key: '32040d64d0bc3d7b6ba307bf33345b62603728bf', slot: "trigger", part: "trigger", class: "trigger-tap-target" }, h("slot", { key: '8c38a213e0df82c40722fcd9397605904b0b4ca0', name: "trigger" }, h("svg", { key: '64b67d47579f65e4895c266f95610e5ac6133de3', width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '5b6b8cc068c12a938fdb9bc1f83884edd6dbec2b', "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9 0C4.04 0 0 4.04 0 9C0 13.96 4.04 18 9 18C13.96 18 18 13.96 18 9C18 4.04 13.96 0 9 0ZM9 16C5.14 16 2 12.86 2 9C2 5.14 5.14 2 9 2C12.86 2 16 5.14 16 9C16 12.86 12.86 16 9 16ZM8 7.5V14H10V7.5H8ZM10.25 5.25C10.25 5.94036 9.69036 6.5 9 6.5C8.30964 6.5 7.75 5.94036 7.75 5.25C7.75 4.55964 8.30964 4 9 4C9.69036 4 10.25 4.55964 10.25 5.25Z" })))), h("aside", { key: 'a7b7504162d6d667d7363fdafec7ac9dc3fcac55', slot: "popover", part: "popover" }, h("slot", { key: '4c85381d41b0c8ea63cfc3678c3be2b6e68c05bc', name: "content", onSlotchange: () => this.styleLinks() })))));
    }
    static get is() { return "market-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-tooltip.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-tooltip.css"]
        };
    }
    static get properties() {
        return {
            "interaction": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'click' | 'hover' | 'persistent' | 'none'",
                    "resolved": "\"click\" | \"hover\" | \"none\" | \"persistent\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Defines what types of interaction the tooltip should have\n(see `market-dropdown` docs for more granular explanation)"
                },
                "attribute": "interaction",
                "reflect": false,
                "defaultValue": "'hover'"
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
                    "text": "Functionally and visually disables the tooltip trigger."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "popoverPlacement": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Placement",
                    "resolved": "\"auto\" | \"auto-end\" | \"auto-start\" | \"bottom\" | \"bottom-end\" | \"bottom-start\" | \"left\" | \"left-end\" | \"left-start\" | \"right\" | \"right-end\" | \"right-start\" | \"top\" | \"top-end\" | \"top-start\"",
                    "references": {
                        "Placement": {
                            "location": "import",
                            "path": "@popperjs/core",
                            "id": "../../node_modules/@popperjs/core/index.d.ts::Placement"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Configuration option for Popper.js (used to position the tooltip overlay).\nDescribes the preferred placement of the popper.\nhttps://popper.js.org/docs/v2/constructors//#placement"
                },
                "attribute": "popover-placement",
                "reflect": false,
                "defaultValue": "'bottom'"
            },
            "popoverStrategy": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "PositioningStrategy",
                    "resolved": "\"absolute\" | \"fixed\"",
                    "references": {
                        "PositioningStrategy": {
                            "location": "import",
                            "path": "@popperjs/core",
                            "id": "../../node_modules/@popperjs/core/index.d.ts::PositioningStrategy"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Configuration option for Popper.js (used to position `<market-popover>`).\nDescribes the positioning strategy to use. By default, it is absolute. If\nyour reference element is in a fixed container, use the fixed strategy.\nhttps://popper.js.org/docs/v2/constructors//#strategy"
                },
                "attribute": "popover-strategy",
                "reflect": false,
                "defaultValue": "'absolute'"
            },
            "popoverSkidding": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Configuration option for Popper.js (used to position `<market-popover>`).\nDisplaces the popover along the reference element.\nhttps://popper.js.org/docs/v2/modifiers/offset/#skidding-1"
                },
                "attribute": "popover-skidding",
                "reflect": false
            },
            "popoverDistance": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Configuration option for Popper.js (used to position `<market-popover>`).\nDisplaces the popper away from, or toward, the reference element in the\ndirection of its placement.\nhttps://popper.js.org/docs/v2/modifiers/offset/#distance-1"
                },
                "attribute": "popover-distance",
                "reflect": false,
                "defaultValue": "0"
            },
            "expanded": {
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
                    "text": "Whether or not the tooltip is open. Setting it to true means it will be open\nby default"
                },
                "attribute": "expanded",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketTooltipOpened",
                "name": "marketTooltipOpened",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the tooltip is opened."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "marketTooltipClosed",
                "name": "marketTooltipClosed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the tooltip is closed."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "openTooltip": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Opens the tooltip",
                    "tags": []
                }
            },
            "closeTooltip": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Closes the tooltip",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "marketDropdownOpened",
                "method": "dropdownOpenedEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDropdownClosed",
                "method": "dropdownClosedEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-tooltip.js.map
