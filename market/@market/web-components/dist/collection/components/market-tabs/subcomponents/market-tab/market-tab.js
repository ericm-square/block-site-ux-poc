import { Host, h } from "@stencil/core";
/**
 * @slot - (Default slot) The text used for the button label
 * @part button - The `<button>` in the shadow DOM
 */
export class MarketTab {
    constructor() {
        this.disabled = false;
        this.size = 'medium';
        this.selected = false;
    }
    /**
     * Select the tab and emits a `marketTabSelectedChanged` event
     */
    select() {
        if (this.selected || this.disabled) {
            return Promise.resolve();
        }
        const { defaultPrevented } = this.marketTabSelectedChanged.emit({
            panelId: this.el.getAttribute('aria-controls'),
            prevValue: this.selected,
            tabId: this.el.id,
            value: true,
        });
        if (!defaultPrevented) {
            this.selected = true;
        }
        return Promise.resolve();
    }
    /**
     * Deselects the tab and emits a `marketTabSelectedChanged` event
     */
    deselect() {
        if (!this.selected) {
            return Promise.resolve();
        }
        const { defaultPrevented } = this.marketTabSelectedChanged.emit({
            panelId: this.el.getAttribute('aria-controls'),
            prevValue: this.selected,
            tabId: this.el.id,
            value: false,
        });
        if (!defaultPrevented) {
            this.selected = false;
        }
        return Promise.resolve();
    }
    disabledWatcher() {
        this.selected = false;
    }
    handleClick() {
        this.select();
    }
    handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // prevents scroll down when Space is pressed
            this.select();
        }
    }
    render() {
        return (h(Host, { key: '63c07a1172617ce4a15296229d059bc449de69cc', "aria-disabled": this.disabled.toString(), "aria-selected": this.selected.toString(), class: "market-tab", onClick: this.handleClick.bind(this), onKeydown: this.handleKeydown.bind(this), role: "tab", tabindex: "0" }, h("button", { key: 'be7240c4232ba41743c7274f2630563267055b5a', disabled: this.disabled, part: "button", ref: (el) => (this.buttonEl = el), tabindex: "-1" }, h("slot", { key: '8d4d35e1d14a52fb3e6d71805ab83eae31a83009' }))));
    }
    static get is() { return "market-tab"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-tab.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-tab.css"]
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
                    "tags": [{
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Whether or not the tab is disabled"
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
                    "tags": [{
                            "name": "default",
                            "text": "'medium'"
                        }],
                    "text": "Tab's size"
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'medium'"
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
                    "tags": [{
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Whether or not the tab is selected"
                },
                "attribute": "selected",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketTabSelectedChanged",
                "name": "marketTabSelectedChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the tab selection has changed\n\n`market-tab-list` listens to this event and stops further propagation"
                },
                "complexType": {
                    "original": "TMarketTabSelectedChangedEventDetail",
                    "resolved": "{ panelId: string; prevValue: boolean; tabId: string; value: boolean; }",
                    "references": {
                        "TMarketTabSelectedChangedEventDetail": {
                            "location": "import",
                            "path": "../../events",
                            "id": "src/components/market-tabs/events.ts::TMarketTabSelectedChangedEventDetail"
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
                    "text": "Select the tab and emits a `marketTabSelectedChanged` event",
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
                    "text": "Deselects the tab and emits a `marketTabSelectedChanged` event",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "disabled",
                "methodName": "disabledWatcher"
            }];
    }
}
//# sourceMappingURL=market-tab.js.map
