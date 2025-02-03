import { Host, h } from "@stencil/core";
import { getRowInActionCard } from "./utils";
/**
 * @slot - Optimized for use w/ slotted `<market-row>`s but can take any content. All slotted `market-row`s will automatically be set to interactive mode.
 */
export class MarketActionCard {
    constructor() {
        this.selected = false;
        this.disabled = false;
        this.value = undefined;
        this.transient = false;
    }
    /**
     * When rows are slotted into cards, we want to catch their selection events
     * and emit our own, so that the containing `market-list` only gets one set
     * of selection events.
     */
    handleRowSelection(e) {
        this.select();
        // Prevent `marketRowSelected` from bubbling up to containing lists, since we expect
        // them to listen to our card selection events instead.
        e.stopPropagation();
    }
    /**
     * When rows are slotted into cards, we want to catch their selection events
     * and emit our own, so that the containing `market-list` only gets one set
     * of selection events.
     */
    handleRowDeselection(e) {
        this.deselect();
        // Prevent `marketRowSelected` from bubbling up to containing lists, since we expect
        // them to listen to our card selection events instead.
        e.stopPropagation();
    }
    /**
     * Set `selected` to `true` and emit `marketCardSelected`. Generally speaking,
     * it is preferable to avoid using this method from outside this component
     * and allow `market-action-card` to manage its own selection state based on user
     * interaction. It should only be used for parent components that need to
     * manage a group of rows, such as `market-list`.
     */
    async select() {
        var _a, _b;
        this.selected = true;
        await ((_a = this.rowEl) === null || _a === void 0 ? void 0 : _a.silentlySelect());
        const { defaultPrevented } = this.marketCardSelected.emit({ value: this.value });
        if (defaultPrevented) {
            this.selected = false;
            await ((_b = this.rowEl) === null || _b === void 0 ? void 0 : _b.silentlyDeselect());
        }
    }
    /**
     * Set `selected` to `false` and emit `marketCardDeselected`. Generally speaking,
     * it is preferable to avoid using this method from outside this component
     * and allow `market-action-card` to manage its own selection state based on user
     * interaction. It should only be used for parent components that need to
     * manage a group of rows, such as `market-list`.
     */
    async deselect() {
        var _a, _b;
        this.selected = false;
        await ((_a = this.rowEl) === null || _a === void 0 ? void 0 : _a.silentlyDeselect());
        const { defaultPrevented } = this.marketCardDeselected.emit({ value: this.value });
        if (defaultPrevented) {
            this.selected = true;
            await ((_b = this.rowEl) === null || _b === void 0 ? void 0 : _b.silentlySelect());
        }
    }
    /**
     * Used for setting the selection state to true without emitting events.
     * Useful for scenarios where another component (ex. `<market-list>`) needs
     * to sync state with slotted `<market-action-card>`s.
     */
    async silentlySelect() {
        var _a;
        this.selected = true;
        await ((_a = this.rowEl) === null || _a === void 0 ? void 0 : _a.silentlySelect());
        return Promise.resolve();
    }
    /**
     * Set `selected` to `false`. Generally speaking,
     * it is preferable to avoid using this method from outside this component
     * and allow `market-action-card` to manage its own selection state based on user
     * interaction. It should only be used for parent components that need to
     * manage a group of rows, such as `market-list`.
     */
    async silentlyDeselect() {
        var _a;
        this.selected = false;
        await ((_a = this.rowEl) === null || _a === void 0 ? void 0 : _a.silentlyDeselect());
        return Promise.resolve();
    }
    isContentEditable(el) {
        // check whether element (Market or HTML) accepts text input
        const inputTagnames = ['input', 'textarea'];
        return inputTagnames.some((str) => el.tagName.includes(str)) || el.isContentEditable;
    }
    handleClick(e) {
        // clicks to text inputs should not select action card
        if (this.isContentEditable(e.target)) {
            return;
        }
        // Rows handle selected state when slotted. The only way you can click directly on
        // the card is by clicking the border, and we want to just ignore that edge case.
        if (this.disabled || this.transient || this.rowEl) {
            return;
        }
        if (!this.selected) {
            this.select();
        }
        else {
            this.deselect();
        }
    }
    handleKeydown(e) {
        // user should be able to type normally in text inputs
        if (this.isContentEditable(e.target)) {
            return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // prevents scroll down when Space is pressed
            if (this.rowEl) {
                this.rowEl.click();
            }
            else {
                this.el.click();
            }
        }
    }
    syncRowAttributes() {
        if (!this.rowEl) {
            return;
        }
        this.rowEl.interactive = true;
        this.rowEl.selected = this.selected;
        this.rowEl.removeAttribute('tabIndex');
    }
    handleSlotChangeDefault() {
        this.rowEl = getRowInActionCard(this.el);
        this.el.classList.toggle('has-slotted-row', Boolean(this.rowEl));
        this.syncRowAttributes();
    }
    componentDidRender() {
        // slotted rows inside action cards should not be able to receive focus because
        // they are controlled by interaction w/ the action card
        if (this.rowEl) {
            this.rowEl.removeAttribute('tabIndex');
        }
    }
    render() {
        return (h(Host, { key: '0bf60bf0a77712869982bdc9a8928ecc0fa19fc7', "aria-selected": this.selected, class: "market-action-card", onClick: this.handleClick.bind(this), onKeydown: this.handleKeydown.bind(this), role: "option", tabindex: this.disabled ? null : '0' }, h("slot", { key: '53d189d1a684ad82734157e67be5b640ed0a397b', onSlotchange: () => this.handleSlotChangeDefault() })));
    }
    static get is() { return "market-action-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-action-card.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-action-card.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "Whether the action card is selected or not."
                },
                "attribute": "selected",
                "reflect": true,
                "defaultValue": "false"
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
                    "text": "Visually and functionally disables the action card."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
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
                    "text": "A string specifying a value for the action card."
                },
                "attribute": "value",
                "reflect": true
            },
            "transient": {
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
                    "text": "When set to `true`, card will not persist selected state on click."
                },
                "attribute": "transient",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketCardSelected",
                "name": "marketCardSelected",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the action card is selected."
                },
                "complexType": {
                    "original": "TMarketActionCardSelectedEventDetail",
                    "resolved": "{ value: string; }",
                    "references": {
                        "TMarketActionCardSelectedEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-action-card/events.ts::TMarketActionCardSelectedEventDetail"
                        }
                    }
                }
            }, {
                "method": "marketCardDeselected",
                "name": "marketCardDeselected",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the action card is deselected."
                },
                "complexType": {
                    "original": "TMarketActionCardDeselectedEventDetail",
                    "resolved": "{ value: string; }",
                    "references": {
                        "TMarketActionCardDeselectedEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-action-card/events.ts::TMarketActionCardDeselectedEventDetail"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "select": {
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
                    "text": "Set `selected` to `true` and emit `marketCardSelected`. Generally speaking,\nit is preferable to avoid using this method from outside this component\nand allow `market-action-card` to manage its own selection state based on user\ninteraction. It should only be used for parent components that need to\nmanage a group of rows, such as `market-list`.",
                    "tags": []
                }
            },
            "deselect": {
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
                    "text": "Set `selected` to `false` and emit `marketCardDeselected`. Generally speaking,\nit is preferable to avoid using this method from outside this component\nand allow `market-action-card` to manage its own selection state based on user\ninteraction. It should only be used for parent components that need to\nmanage a group of rows, such as `market-list`.",
                    "tags": []
                }
            },
            "silentlySelect": {
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
                    "text": "Used for setting the selection state to true without emitting events.\nUseful for scenarios where another component (ex. `<market-list>`) needs\nto sync state with slotted `<market-action-card>`s.",
                    "tags": []
                }
            },
            "silentlyDeselect": {
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
                    "text": "Set `selected` to `false`. Generally speaking,\nit is preferable to avoid using this method from outside this component\nand allow `market-action-card` to manage its own selection state based on user\ninteraction. It should only be used for parent components that need to\nmanage a group of rows, such as `market-list`.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "marketRowSelected",
                "method": "handleRowSelection",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketRowDeselected",
                "method": "handleRowDeselection",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-action-card.js.map
