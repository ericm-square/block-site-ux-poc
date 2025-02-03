import { Host, h } from "@stencil/core";
import { v4 as uuid } from "uuid";
import { applyExpandableAriaControls, observeAriaAttributes } from "../../utils/aria";
import { supportedDropdownTriggers } from "../../utils/dropdown";
import { getNamespacedTagFor } from "../../utils/namespace";
/**
 * Type guard to check if the supported trigger element is a `market-button`
 */
function isMarketButton(el) {
    return el.tagName.toLowerCase() === getNamespacedTagFor('market-button');
}
/**
 * @slot trigger - Expects a slotted `market-button` or `market-filter-button`.
 * @slot content - Content slotted here will appear in `market-popover`, which
 * becomes visible when the slotted trigger content is interacted with.
 * @part popover - The inner market-popover.
 */
export class MarketButtonDropdown {
    constructor() {
        this.onMutationObserved = (ariaAttributes) => {
            this.ariaAttributes = ariaAttributes;
        };
        this.interaction = 'click';
        this.disabled = false;
        this.noCaret = false;
        this.popoverPlacement = 'bottom-end';
        this.popoverStrategy = 'absolute';
        this.persistListSelections = false;
        this.dropdownIsActive = false;
        this.ariaAttributes = undefined;
    }
    dropdownOpenedEventHandler(e) {
        if (e.target !== this.el)
            return;
        this.dropdownIsActive = true;
        this.setCaret();
        this.marketButtonDropdownOpened.emit();
    }
    dropdownClosedEventHandler(e) {
        if (e.target !== this.el)
            return;
        this.dropdownIsActive = false;
        this.setCaret();
        this.marketButtonDropdownClosed.emit();
    }
    syncTriggerDisabledState() {
        if (this.slottedButton) {
            this.slottedButton.disabled = this.disabled;
        }
    }
    setCaret() {
        if (this.noCaret || !isMarketButton(this.slottedButton)) {
            return;
        }
        if (this.dropdownIsActive) {
            this.slottedButton.caret = 'up';
        }
        else {
            this.slottedButton.caret = 'down';
        }
    }
    registerTrigger() {
        this.slottedButton = this.el.querySelector(supportedDropdownTriggers.join(','));
        this.syncTriggerDisabledState();
        this.setCaret();
    }
    componentWillLoad() {
        this.mutationObserver = observeAriaAttributes(this.el, this.onMutationObserved);
    }
    componentWillRender() {
        const MarketListTagName = getNamespacedTagFor('market-list');
        const list = this.el.querySelector(MarketListTagName);
        const popoverContent = this.el.querySelector(`[slot="content"]`);
        if (list) {
            // We set this here even though market-popover also sets it,
            // because the slotted market-list's componentWillLoad hook
            // will fire before market-popover's, and we need it to be set
            // before the row processing that happens in that hook.
            list.interactive = true;
            list.transient = !this.persistListSelections;
        }
        if (this.slottedButton) {
            // Ensure popover has an ID and role for aria support
            if (!popoverContent.id) {
                popoverContent.id = `popover-${uuid()}`;
            }
            // Persist aria attributes on the slotted button
            applyExpandableAriaControls(this.slottedButton, {
                expanded: this.dropdownIsActive.toString(),
                popoverId: popoverContent.id,
            });
        }
    }
    render() {
        const MarketDropdownTagName = getNamespacedTagFor('market-dropdown');
        const MarketPopoverTagName = getNamespacedTagFor('market-popover');
        return (h(Host, { key: '35a277377595acc3448cf6725c2026ef398df787', class: "market-button-dropdown" }, h(MarketDropdownTagName, { key: '706d03f37636b4a77ce2378279a85ecbbc563259', interaction: this.interaction, "popover-strategy": this.popoverStrategy, "popover-placement": this.popoverPlacement, disabled: this.disabled }, h("slot", { key: 'eb6a8ad8f2d20b110fea23dcca3f13ef4f888640', name: "trigger", slot: "trigger", onSlotchange: () => this.registerTrigger() }), h(MarketPopoverTagName, { key: '6eda9f25ab04d65c27fa96145fde542e040882c2', slot: "popover", part: "popover" }, h("slot", { key: '1a9a9e1e0fd8c895482d4a08e4d016530340e2cd', name: "content" })))));
    }
    static get is() { return "market-button-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-button-dropdown.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-button-dropdown.css"]
        };
    }
    static get properties() {
        return {
            "interaction": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'click' | 'hover' | 'persistent'",
                    "resolved": "\"click\" | \"hover\" | \"persistent\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Defines what types of interaction the button dropdown should have\n(see `market-dropdown` docs for more granular explanation)"
                },
                "attribute": "interaction",
                "reflect": false,
                "defaultValue": "'click'"
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
                    "text": "Functionally and visually disables the button dropdown."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "noCaret": {
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
                    "text": "Disabling the up/down caret."
                },
                "attribute": "no-caret",
                "reflect": false,
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
                    "text": "Configuration option for Popper.js (used to position `<market-popover>`).\nDescribes the preferred placement of the popper.\nhttps://popper.js.org/docs/v2/constructors//#placement"
                },
                "attribute": "popover-placement",
                "reflect": false,
                "defaultValue": "'bottom-end'"
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
            "persistListSelections": {
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
                    "text": "Disables the default behavior of *not* persisting selections in slotted `market-list`s."
                },
                "attribute": "persist-list",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "dropdownIsActive": {},
            "ariaAttributes": {}
        };
    }
    static get events() {
        return [{
                "method": "marketButtonDropdownOpened",
                "name": "marketButtonDropdownOpened",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the button dropdown is opened."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "marketButtonDropdownClosed",
                "name": "marketButtonDropdownClosed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the button dropdown is closed."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "disabled",
                "methodName": "syncTriggerDisabledState"
            }];
    }
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
//# sourceMappingURL=market-button-dropdown.js.map
