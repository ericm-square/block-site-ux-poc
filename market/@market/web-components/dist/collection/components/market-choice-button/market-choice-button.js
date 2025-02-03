import { Host, h } from "@stencil/core";
/**
 * @slot - The text used for the choice button label
 * @slot secondary-text - text to the right side of choice button
 */
export class MarketChoiceButton {
    constructor() {
        this.disabled = false;
        this.selected = false;
        this.size = 'medium';
    }
    onClick(e) {
        if (this.disabled) {
            e.stopImmediatePropagation();
            return;
        }
        if (this.selected) {
            this.selected = false;
            this.marketChoiceButtonDeselected.emit();
        }
        else {
            this.selected = true;
            this.marketChoiceButtonSelected.emit();
        }
    }
    render() {
        const { disabled } = this;
        return (h(Host, { key: '5fed443777aa284760086db85df12d195aada3cc', class: "market-choice-button", tabindex: disabled ? -1 : undefined, onClick: (e) => {
                this.onClick(e);
            } }, h("button", { key: 'c8e8aff08358a621202d705f6aa63f9dbeb7ab37', "aria-disabled": disabled }, h("slot", { key: '032cec3910431ad73dffef0d7fae6dfb72a3a4e2' }), h("slot", { key: '1921baa2a22e9ef012979d7232ac4dee74353776', name: "secondary-text" }))));
    }
    static get is() { return "market-choice-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-choice-button.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-choice-button.css"]
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
                    "text": "Functionally and visually disables the choice button"
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
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
                    "text": "Whether or not the choice button is in a selected state"
                },
                "attribute": "selected",
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
                    "text": "String for setting choice button size"
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'medium'"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketChoiceButtonSelected",
                "name": "marketChoiceButtonSelected",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the choice button is selected"
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "marketChoiceButtonDeselected",
                "name": "marketChoiceButtonDeselected",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the choice button is deselected"
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
//# sourceMappingURL=market-choice-button.js.map
