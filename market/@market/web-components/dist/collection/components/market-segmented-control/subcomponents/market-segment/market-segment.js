import { Host, h } from "@stencil/core";
export class MarketSegment {
    constructor() {
        this.disabled = false;
        this.value = undefined;
        this.selected = false;
    }
    setSelectedState(state) {
        this.selected = state;
        return Promise.resolve();
    }
    selectSegment() {
        if (this.selected || this.disabled) {
            return Promise.resolve();
        }
        this.marketSegmentSelectedChanged.emit();
        return Promise.resolve();
    }
    render() {
        return (h(Host, { key: '9927e6b28aeeab4bb55f8ed43af995ff17ca009d', selected: this.selected, class: "market-segment", onClick: () => this.selectSegment() }, h("slot", { key: '705146bdc557b8eb2ff952c0c8dd1b8aedc6edcf' })));
    }
    static get is() { return "market-segment"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-segment.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-segment.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "Whether the market segment should appear in a disabled state."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "value": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A string specifying a value for the segment."
                },
                "attribute": "value",
                "reflect": true
            }
        };
    }
    static get states() {
        return {
            "selected": {}
        };
    }
    static get events() {
        return [{
                "method": "marketSegmentSelectedChanged",
                "name": "marketSegmentSelectedChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired when the segment is clicked or otherwise selected"
                },
                "complexType": {
                    "original": "{\n    value: boolean;\n    prevValue: boolean;\n  }",
                    "resolved": "{ value: boolean; prevValue: boolean; }",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "setSelectedState": {
                "complexType": {
                    "signature": "(state: any) => Promise<void>",
                    "parameters": [{
                            "name": "state",
                            "type": "any",
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
                    "text": "",
                    "tags": []
                }
            },
            "selectSegment": {
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
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-segment.js.map
