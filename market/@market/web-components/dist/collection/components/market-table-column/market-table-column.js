import { Host, h } from "@stencil/core";
/**
 * @slot - Default slot for all content
 */
export class MarketTableColumn {
    constructor() {
        this.name = undefined;
        this.align = false;
        this.stickTo = undefined;
        this.sortable = false;
        this.sortOrder = undefined;
        this.hidden = false;
        this.index = 0;
        this.width = undefined;
        this.originalSlot = undefined;
    }
    emitVisibilityChangeEvent(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.marketTableColumnVisibilityChange.emit({
                columnName: this.name,
                hidden: newValue,
            });
        }
    }
    async emitStickyEvents(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            await this.stick(newValue);
        }
        else {
            this.unstick(newValue);
        }
    }
    /**
     * Fixes this column to the provided table edge (position)
     */
    stick(position) {
        /* If our position is different than out current stickTo value,
        then we are probably calling stick() directly from javascript, rather
        than having it be triggered from the stickTo watcher, so we want to
        update that value, which will call this function again, the values will match
        and then the event will be emitted */
        if (position !== this.stickTo) {
            this.stickTo = position;
            /* Otherwise this function has been triggered from the stickTo watcher
          by someone updating the bound property so we want to emit the event */
        }
        else {
            this.marketTableColumnStick.emit({
                position,
                index: this.index,
            });
        }
        return Promise.resolve();
    }
    /**
     * Un-fixes this column from any table edge
     */
    unstick(position) {
        this.marketTableColumnUnstick.emit({
            position,
            index: this.index,
        });
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
        this.stickTo = position;
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
        this.el.removeAttribute('stick-to');
        return Promise.resolve();
    }
    clickHandler() {
        if (this.sortable) {
            this.marketTableColumnSort.emit({
                column: this.name,
                previousSortOrder: this.sortOrder,
            });
        }
    }
    componentWillLoad() {
        this.originalSlot = this.el.getAttribute('slot');
        if (!this.name) {
            console.warn('Please set a name on <market-table-column>. Tables may not work correctly without this.'); // eslint-disable-line no-console
        }
    }
    componentDidLoad() {
        // stickTo watcher does not fire on first component load
        if (this.stickTo) {
            this.stick(this.stickTo);
        }
    }
    render() {
        return (h(Host, { key: 'de01f70eb5bef7de63a4cd77fc72d01adadbc2b5', class: "market-table-column", align: this.align === 'right' && this.align, role: "columnheader", "aria-sort": this.sortOrder, onClick: () => this.clickHandler() }, h("slot", { key: 'cafa7ea4eb183281b723bd1acd4fcd6b1171bc43', name: "leading-accessory" }), this.sortable && (
        // A11Y: This button allows screen readers to access and click on the column header.
        h("button", { key: 'eda26a17db04b3fad4ff4d0fe288195a6eeccc9c' }, h("slot", { key: '37881dbd5b4e12c5b423ea9d0d0efc31b1de500a' }), h("svg", { key: '1e210d74d75f0122fae652a4733c5f4d556a5eb8', width: "16", height: "15", viewBox: "0 0 16 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", class: "sorting-caret", "aria-hidden": "true" }, h("path", { key: '95c1ac04ae00a822fbc484cbf05ee68358937add', "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.70709 14.7071C8.31657 15.0976 7.6834 15.0976 7.29288 14.7071L0.292879 7.7071L1.70709 6.29289L6.99999 11.5858L6.99999 -7.612e-07L8.99999 -5.86354e-07L8.99999 11.5858L14.2929 6.29289L15.7071 7.70711L8.70709 14.7071Z" })))), !this.sortable && h("slot", { key: '56146bd9c9a751c9de482596423f5ff8e1f70484' }), h("slot", { key: 'a9c0f4ae4ccd08a29c76272ac4e9717a89744a5e', name: "trailing-accessory" })));
    }
    static get is() { return "market-table-column"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-table-column.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-table-column.css"]
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
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "**REQUIRED:** A unique key for this column, used to map all related cells together"
                },
                "attribute": "name",
                "reflect": true
            },
            "align": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "false | 'left' | 'right'",
                    "resolved": "\"left\" | \"right\" | boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Will set the `align` property on all related cells to this value"
                },
                "attribute": "align",
                "reflect": false,
                "defaultValue": "false"
            },
            "stickTo": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "'left' | 'right'",
                    "resolved": "\"left\" | \"right\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Makes this column stick to an edge of the table"
                },
                "attribute": "stick-to",
                "reflect": true
            },
            "sortable": {
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
                    "text": "Whether or not this column is sortable"
                },
                "attribute": "sortable",
                "reflect": true,
                "defaultValue": "false"
            },
            "sortOrder": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'ascending' | 'descending'",
                    "resolved": "\"ascending\" | \"descending\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "What order the column is sorting in; ascending points up and descending points down\nIf the column is sortable and this prop is not present, the sort icon points up but is grayed out."
                },
                "attribute": "sort-order",
                "reflect": true
            },
            "hidden": {
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
                    "text": "Hides the column and all related cells."
                },
                "attribute": "hidden",
                "reflect": true,
                "defaultValue": "false"
            },
            "index": {
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
                    "text": "**INTERNAL [do not use directly]**\nThe order of this market-table-column in the DOM"
                },
                "attribute": "index",
                "reflect": false,
                "defaultValue": "0"
            },
            "width": {
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
                    "text": "**INTERNAL [do not use directly]**\nSet by the parent table element, based on it's grid-template-columns CSS value"
                },
                "attribute": "width",
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "originalSlot": {}
        };
    }
    static get events() {
        return [{
                "method": "marketTableColumnStick",
                "name": "marketTableColumnStick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when this column is stuck to a table edge.\nCan happen when the stick-to property is updated, .stick() method is called\nor when slotted content in the parent table changes"
                },
                "complexType": {
                    "original": "{\n    position: 'left' | 'right';\n    index: number;\n  }",
                    "resolved": "{ position: \"left\" | \"right\"; index: number; }",
                    "references": {}
                }
            }, {
                "method": "marketTableColumnUnstick",
                "name": "marketTableColumnUnstick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when a table column heading is clicked to sort"
                },
                "complexType": {
                    "original": "{\n    position: 'left' | 'right';\n    index: number;\n  }",
                    "resolved": "{ position: \"left\" | \"right\"; index: number; }",
                    "references": {}
                }
            }, {
                "method": "marketTableColumnSort",
                "name": "marketTableColumnSort",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when a table column heading is clicked to sort"
                },
                "complexType": {
                    "original": "{\n    column: string;\n    previousSortOrder: 'ascending' | 'descending';\n  }",
                    "resolved": "{ column: string; previousSortOrder: \"ascending\" | \"descending\"; }",
                    "references": {}
                }
            }, {
                "method": "marketTableColumnVisibilityChange",
                "name": "marketTableColumnVisibilityChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when a table column's hidden property changes. Used by market-table\nto toggle visibility of related table cells."
                },
                "complexType": {
                    "original": "{\n    columnName: string;\n    hidden: boolean;\n  }",
                    "resolved": "{ columnName: string; hidden: boolean; }",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "stick": {
                "complexType": {
                    "signature": "(position?: 'left' | 'right') => Promise<void>",
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
                    "text": "Fixes this column to the provided table edge (position)",
                    "tags": []
                }
            },
            "unstick": {
                "complexType": {
                    "signature": "(position?: 'left' | 'right') => Promise<void>",
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
                    "text": "Un-fixes this column from any table edge",
                    "tags": []
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
    static get watchers() {
        return [{
                "propName": "hidden",
                "methodName": "emitVisibilityChangeEvent"
            }, {
                "propName": "stickTo",
                "methodName": "emitStickyEvents"
            }];
    }
}
//# sourceMappingURL=market-table-column.js.map
