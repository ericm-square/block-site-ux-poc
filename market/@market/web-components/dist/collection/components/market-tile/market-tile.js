import { Host, h } from "@stencil/core";
import { classNames } from "../../utils/classnames";
/**
 * @slot media - When provided, replaces the solid color background with a background image and applies a slight gradient.
 * @slot leading-accessory - An icon set on the top-left corner of the tile.
 * @slot actions - Optional slot to customize action(s) in the top-right corner of the tile. Renders a remove button by default.
 * @slot indicator - Text to render in a pill-like element on the top-right corner of the slot.
 * Is overridden by `actions`.
 * @slot hint - Large text set in the center of a medium-sized tile. Intended to be one or two letters.
 * @slot label - Text set beneath the hint slot.
 * @slot subtext - Smaller text set beneath the label slot.
 */
export class MarketTile {
    constructor() {
        this.hasTrailingAccessorySlot = false;
        this.hasIndicatorTextSlot = false;
        this.disabled = false;
        this.interactive = false;
        this.showActions = false;
        this.size = 'medium';
        this.value = undefined;
        this.selected = false;
        this.hasSlottedMedia = false;
    }
    onSizeChange() {
        this.adjustSlottedLabels();
    }
    /**
     * Allows external elements to set selected value.
     */
    setSelected(newValue) {
        if (typeof newValue !== 'boolean') {
            return Promise.resolve();
        }
        if (this.selected !== newValue) {
            const { defaultPrevented } = this.marketTileSelectedChanged.emit({
                selected: this.selected,
                value: this.value,
            });
            if (!defaultPrevented) {
                this.selected = newValue;
            }
        }
        return Promise.resolve();
    }
    handleClick(event) {
        if (this.disabled || !this.interactive) {
            return;
        }
        this.selected = !this.selected;
        event.preventDefault();
        this.marketTileSelectedChanged.emit({ selected: this.selected, value: this.value });
    }
    handleRemoveActionKeydown(event) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.handleRemoveActionClick(event);
                break;
            default:
                break;
        }
    }
    handleRemoveActionClick(event) {
        if (this.disabled || !this.interactive) {
            return;
        }
        event.stopPropagation();
        this.marketTileRemoveClicked.emit();
    }
    renderDefaultRemoveAction() {
        const { disabled, handleRemoveActionClick, handleRemoveActionKeydown } = this;
        return (h("button", { class: "remove-button", disabled: disabled, onClick: handleRemoveActionClick.bind(this), onKeyUp: handleRemoveActionKeydown.bind(this) }, h("svg", { slot: "icon", width: "16", height: "16", viewBox: "0 0 16 16", fill: "var(--core-critical-text-color)", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M12.8318 7.3335V7.1685H12.6668H3.3335H3.1685V7.3335V8.66683V8.83183H3.3335H12.6668H12.8318V8.66683V7.3335Z", fill: "var(--core-critical-text-color)", stroke: "var(--core-critical-text-color)", "stroke-width": "0.33" }))));
    }
    handleKeydown(event) {
        // don't intercept keydown of descendant elements
        // e.g. remove button
        if (event.target !== this.el) {
            return;
        }
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.handleClick(event);
                break;
            default:
                break;
        }
    }
    /**
     * This function determines the number of lines the `label` slot text should clamp to.
     * It should clamp to a single line if the hint slot exists or if the subtext slot exists
     * and the element `size` prop is set to "small".
     */
    adjustSlottedLabels() {
        const { size, el } = this;
        const hint = el.querySelector('[slot="hint"]');
        const label = el.querySelector('[slot="label"]');
        const subtext = el.querySelector('[slot="subtext"]');
        if (!label) {
            return;
        }
        const labelLineClamp = hint || (subtext && size === 'small') ? 1 : 2;
        el.style.setProperty('--item-tile-label-line-clamp', labelLineClamp.toString());
    }
    checkSlottedMedia() {
        this.hasSlottedMedia = Boolean(this.el.querySelector('[slot="media"]'));
    }
    componentWillLoad() {
        this.checkSlottedMedia();
        this.hasIndicatorTextSlot = Boolean(this.el.querySelector('[slot="indicator"]'));
    }
    render() {
        const { disabled, size, hasSlottedMedia, hasIndicatorTextSlot, interactive, showActions, selected } = this;
        const tabindex = interactive && !disabled ? '0' : null;
        return (h(Host, { key: 'd517f7cb075bd6646ca3490faf7d0eeb127ffa82', class: "market-tile", tabindex: tabindex, "aria-selected": selected.toString(), onClick: (e) => this.handleClick(e), onKeydown: (e) => this.handleKeydown(e) }, h("div", { key: '4e8acbe5ef8c493e5b7dcdab61fe78aeb46a3058', class: classNames('background-image', { 'has-slotted-media': hasSlottedMedia }) }, h("slot", { key: 'ef14bfbc08c9cb408f3f6c778599af3a00857413', onSlotchange: () => this.checkSlottedMedia(), name: "media" })), h("slot", { key: '6f138c2dd2c724ed94d783971d5e61e690f3b204', name: "leading-accessory" }), h("div", { key: 'eb504c07a85e0888d6dc9e3cf691b4497428d185', class: "trailing-accessory-container" }, showActions && h("slot", { key: '5ad694873bbaea565bb629f48101311c52e5d5b1', name: "actions" }, this.renderDefaultRemoveAction()), !showActions && hasIndicatorTextSlot && h("slot", { key: '2e4922b851b506583bad374382a86751f263d575', name: "indicator" })), h("div", { key: '0ac231a58c9f189f38740ab5d2a97ae06e82386e', class: "content" }, size !== 'small' && h("slot", { key: 'ae24177ef72c114e1801f9baa06b656139efa4c1', onSlotchange: () => this.adjustSlottedLabels(), name: "hint" }), h("slot", { key: 'b99fe24dd8cf51110ca3276777ff36c1a416046f', onSlotchange: () => this.adjustSlottedLabels(), name: "label" }), h("slot", { key: 'ae3e99ca54cdfcfd1e8e0feb48e276b2c131d037', onSlotchange: () => this.adjustSlottedLabels(), name: "subtext" }))));
    }
    static get is() { return "market-tile"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-tile.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-tile.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "Whether to disable the tile."
                },
                "attribute": "aria-disabled",
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
                    "text": "Enables interactivity."
                },
                "attribute": "interactive",
                "reflect": false,
                "defaultValue": "false"
            },
            "showActions": {
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
                    "text": "Whether to render the markup in the action slot."
                },
                "attribute": "show-actions",
                "reflect": false,
                "defaultValue": "false"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'small' | 'medium'",
                    "resolved": "\"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "What size tile to render."
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'medium'"
            },
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
                    "text": "Value for the tile."
                },
                "attribute": "value",
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
                    "text": "Whether the tile is currently selected"
                },
                "attribute": "selected",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "hasSlottedMedia": {}
        };
    }
    static get events() {
        return [{
                "method": "marketTileSelectedChanged",
                "name": "marketTileSelectedChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the tile is selected."
                },
                "complexType": {
                    "original": "TMarketTileSelectedChanged",
                    "resolved": "{ selected: boolean; value: string; }",
                    "references": {
                        "TMarketTileSelectedChanged": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-tile/events.ts::TMarketTileSelectedChanged"
                        }
                    }
                }
            }, {
                "method": "marketTileRemoveClicked",
                "name": "marketTileRemoveClicked",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the remove button is clicked"
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
            "setSelected": {
                "complexType": {
                    "signature": "(newValue: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "newValue",
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
                    "text": "Allows external elements to set selected value.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "size",
                "methodName": "onSizeChange"
            }];
    }
}
//# sourceMappingURL=market-tile.js.map
