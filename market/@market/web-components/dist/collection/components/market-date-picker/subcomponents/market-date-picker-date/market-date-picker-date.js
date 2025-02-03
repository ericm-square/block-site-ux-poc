import { Host, h } from "@stencil/core";
export class MarketDatePickerDate {
    constructor() {
        this.disabled = false;
        this.selection = 'none';
        this.today = false;
        this.selected = false;
        this.day = undefined;
        this.type = undefined;
    }
    /**
     * Interaction handler that passes events back to the market-date-picker component
     */
    handleInteraction(e) {
        var _a;
        if (this.disabled || ((_a = this.day) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            e.stopImmediatePropagation();
            return;
        }
        const isKeyboardEnter = e instanceof KeyboardEvent && e.type === 'keydown' && e.key === 'Enter';
        if (e.type === 'click' || isKeyboardEnter) {
            this.marketDatePickerDateSelected.emit({ date: this.el });
        }
        if (e.type === 'mouseover') {
            this.marketDatePickerDateMousedOver.emit({ date: this.el });
        }
        if (e.type === 'mouseout') {
            this.marketDatePickerDateMousedOut.emit();
        }
    }
    render() {
        return (h(Host, { key: '4a7621e744a0ecf6b77dc02b8d73fec0f311c51a', class: "market-date-picker-date", role: this.disabled || !this.day ? undefined : 'button', tabindex: this.disabled || !this.day ? -1 : 0, "aria-disabled": this.disabled, onClick: (e) => {
                this.handleInteraction(e);
            }, onmouseover: (e) => {
                this.handleInteraction(e);
            }, onmouseout: (e) => {
                this.handleInteraction(e);
            }, onkeydown: (e) => {
                this.handleInteraction(e);
            } }, this.day));
    }
    static get is() { return "market-date-picker-date"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-date-picker-date.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-date-picker-date.css"]
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
                    "text": "Functionally and visually disables the date picker date"
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "selection": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'none' | 'single' | 'range-first' | 'range-middle' | 'range-last'",
                    "resolved": "\"none\" | \"range-first\" | \"range-last\" | \"range-middle\" | \"single\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting date picker date selection type"
                },
                "attribute": "selection",
                "reflect": true,
                "defaultValue": "'none'"
            },
            "today": {
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
                    "text": "Handles whether or not date picker date is for today's date"
                },
                "attribute": "today",
                "reflect": true,
                "defaultValue": "false"
            },
            "selected": {
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
                    "text": "Handles whether or not date picker date is selected"
                },
                "attribute": "selected",
                "reflect": true,
                "defaultValue": "false"
            },
            "day": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | null",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for user to pass in value of the date"
                },
                "attribute": "day",
                "reflect": true
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'day' | 'month' | 'year'",
                    "resolved": "\"day\" | \"month\" | \"year\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String type to determine type of date selected for parent component"
                },
                "attribute": "type",
                "reflect": true
            }
        };
    }
    static get events() {
        return [{
                "method": "marketDatePickerDateSelected",
                "name": "marketDatePickerDateSelected",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the date picker date is selected"
                },
                "complexType": {
                    "original": "{ date: HTMLMarketDatePickerDateElement }",
                    "resolved": "{ date: HTMLMarketDatePickerDateElement; }",
                    "references": {
                        "HTMLMarketDatePickerDateElement": {
                            "location": "global",
                            "id": "global::HTMLMarketDatePickerDateElement"
                        }
                    }
                }
            }, {
                "method": "marketDatePickerDateMousedOver",
                "name": "marketDatePickerDateMousedOver",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the date picker date is hovered or moused over"
                },
                "complexType": {
                    "original": "{ date: HTMLMarketDatePickerDateElement }",
                    "resolved": "{ date: HTMLMarketDatePickerDateElement; }",
                    "references": {
                        "HTMLMarketDatePickerDateElement": {
                            "location": "global",
                            "id": "global::HTMLMarketDatePickerDateElement"
                        }
                    }
                }
            }, {
                "method": "marketDatePickerDateMousedOut",
                "name": "marketDatePickerDateMousedOut",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the date picker date is unhovered or moused out"
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-date-picker-date.js.map
