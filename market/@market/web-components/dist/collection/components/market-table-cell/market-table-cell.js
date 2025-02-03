import { Host, h } from "@stencil/core";
/**
 * @slot - Default slot for content
 * @slot leading-accessory - Intended for use with a leading accessory.
 * @slot trailing-accessory - Intended for use with a trailing accessory.
 */
export class MarketTableCell {
    constructor() {
        this.align = false;
        this.column = undefined;
        this.leadingIndentation = 0;
        this.active = false;
        this.interactive = false;
        this.disabled = false;
        this.originalSlot = undefined;
        this.hidden = false;
    }
    /**
     * **INTERNAL [do not use directly]**
     * Forwards appropriate properties from matching header market-table-column element to this cell.
     */
    _updateColumnRelatedProperties(column) {
        if (!column) {
            return Promise.resolve();
        }
        this.column = column.name;
        this.align = column.align;
        this.hidden = column.hidden;
        if (column.stickTo) {
            this._stickSelf(column.stickTo);
        }
        return Promise.resolve();
    }
    /**
     * **INTERNAL [do not use directly]**
     * Sets properties specified in the row element. Leading and trailing
     * accessories are best set on the first or last cell to not mess
     * with the grid structure
     * @param rowEl
     */
    _updateFirstCellProperties(rowEl) {
        this.leadingIndentation = rowEl.leadingIndentation || 0;
        // Sets leading accessory level of indentation on current row
        this.el.style.setProperty('--cell-indent-level', `${this.leadingIndentation}`);
        return Promise.resolve();
    }
    /**
     * **INTERNAL [do not use directly]**
     * Moves this column into a slot inside the market-table-area
     * which is fixed to the provided edge (position), allowing
     * for fixed columns
     */
    _stickSelf(position) {
        if (position) {
            this.el.slot = `sticky-${position}`;
        }
        return Promise.resolve();
    }
    /**
     * **INTERNAL [do not use directly]**
     * Moves this column back into it's original slot from a slot
     * within a fixed market-table-area
     */
    _unstickSelf() {
        if (!this.originalSlot) {
            this.el.removeAttribute('slot');
        }
        else {
            this.el.slot = this.originalSlot;
        }
        return Promise.resolve();
    }
    componentWillLoad() {
        this.originalSlot = this.el.getAttribute('slot');
    }
    handleClick() {
        if (this.interactive) {
            this.marketTableCellClicked.emit();
        }
    }
    handleKeydown(e) {
        // don't intercept keydown of descendant elements
        // e.g. when typing into nested input fields (gross)
        if (e.target !== this.el) {
            return;
        }
        switch (e.key) {
            case 'Enter':
                this.handleClick();
                break;
            case ' ':
                this.handleClick();
                e.preventDefault(); // spacebar should not scroll page
                break;
            default:
                break;
        }
    }
    render() {
        const { disabled, interactive, align, hidden } = this;
        return (h(Host, { key: '1bb91d3a4d5fcf5d7a27b3fa9af90f548f5e5e68', class: "market-table-cell", role: "cell", align: align === 'right' && align, hidden: hidden, tabindex: interactive && !disabled ? '0' : null, onClick: () => this.handleClick(), onKeydown: (e) => this.handleKeydown(e) }, h("slot", { key: 'e97ec19689f887c5e25949a69c28c41d56fd0e84', name: "nested-row-indicator" }), h("slot", { key: 'b9c46c7522d68ee674fed3eb04195924215a78c9', name: "leading-accessory" }), h("slot", { key: '9a15f89b0c3b4bd2939fcf713872a08978193400' }), h("slot", { key: '8094c84e509ca8854f87d56d34268544090bee78', name: "trailing-accessory" })));
    }
    static get is() { return "market-table-cell"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-table-cell.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-table-cell.css"]
        };
    }
    static get properties() {
        return {
            "align": {
                "type": "any",
                "mutable": true,
                "complexType": {
                    "original": "false | 'left' | 'right'",
                    "resolved": "\"left\" | \"right\" | boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Content/text alignment for this cell, default is set based on the alignment of the\nmarket-table-column with matching column/name prop\n\n**NOTE:** this is set automatically when used in a `market-table` with a corresponding\n`market-table-column`."
                },
                "attribute": "align",
                "reflect": false,
                "defaultValue": "false"
            },
            "column": {
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
                    "text": "A key that matches the 'name' prop on the appropriate market-table-column\n\n**NOTE:** this is set automatically when used in a `market-table` with a corresponding\n`market-table-column`."
                },
                "attribute": "column",
                "reflect": true
            },
            "leadingIndentation": {
                "type": "number",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Determines how much to indent the cell by.\nThis will be multiplied by the default indentation size (40px) for uniform indentation levels\n\n**NOTE:** this is inherited automatically if set on the parent `market-table-row`."
                },
                "attribute": "leading-indentation",
                "reflect": false,
                "defaultValue": "0"
            },
            "active": {
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
                    "text": "Whether the cell is currently active."
                },
                "attribute": "active",
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
                    "text": "Whether or not the cell is interactive. Results in cell receiving\nhover and active styling when hovered/clicked."
                },
                "attribute": "interactive",
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
                    "text": "Whether the cell is disabled."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "originalSlot": {},
            "hidden": {}
        };
    }
    static get events() {
        return [{
                "method": "marketTableCellClicked",
                "name": "marketTableCellClicked",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever an interactive cell is clicked."
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
            "_updateColumnRelatedProperties": {
                "complexType": {
                    "signature": "(column: HTMLMarketTableColumnElement) => Promise<void>",
                    "parameters": [{
                            "name": "column",
                            "type": "HTMLMarketTableColumnElement",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLMarketTableColumnElement": {
                            "location": "global",
                            "id": "global::HTMLMarketTableColumnElement"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "**INTERNAL [do not use directly]**\nForwards appropriate properties from matching header market-table-column element to this cell.",
                    "tags": []
                }
            },
            "_updateFirstCellProperties": {
                "complexType": {
                    "signature": "(rowEl: HTMLMarketTableRowElement) => Promise<void>",
                    "parameters": [{
                            "name": "rowEl",
                            "type": "HTMLMarketTableRowElement",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLMarketTableRowElement": {
                            "location": "global",
                            "id": "global::HTMLMarketTableRowElement"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "**INTERNAL [do not use directly]**\nSets properties specified in the row element. Leading and trailing\naccessories are best set on the first or last cell to not mess\nwith the grid structure",
                    "tags": [{
                            "name": "param",
                            "text": "rowEl"
                        }]
                }
            },
            "_stickSelf": {
                "complexType": {
                    "signature": "(position: 'left' | 'right') => Promise<void>",
                    "parameters": [{
                            "name": "position",
                            "type": "\"left\" | \"right\"",
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
                    "text": "**INTERNAL [do not use directly]**\nMoves this column into a slot inside the market-table-area\nwhich is fixed to the provided edge (position), allowing\nfor fixed columns",
                    "tags": []
                }
            },
            "_unstickSelf": {
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
                    "text": "**INTERNAL [do not use directly]**\nMoves this column back into it's original slot from a slot\nwithin a fixed market-table-area",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-table-cell.js.map
