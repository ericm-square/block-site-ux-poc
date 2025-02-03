import { Host, h } from "@stencil/core";
/**
 * @slot - The text used for the tag label
 * @slot icon - an icon that is to the left of tag text
 */
export class MarketTag {
    constructor() {
        this.disabled = false;
        this.focused = false;
        this.size = 'small';
        this.hasIcon = false;
    }
    /* handles click and unclick in tag */
    onFocus() {
        if (this.disabled) {
            return;
        }
        if (!this.focused) {
            this.focused = true;
        }
        else {
            this.focused = false;
        }
    }
    handleDismissTagEvent(e) {
        this.marketTagDismissed.emit();
        e.stopPropagation();
        this.el.remove();
    }
    componentWillLoad() {
        this.hasIcon = Boolean(this.el.querySelector('[slot="icon"]'));
    }
    render() {
        return (h(Host, { key: '9588fafee1306f4e8fd89988093e4fb13afe38a5', class: `market-tag ${this.hasIcon ? 'has-icon' : ''}`, onClick: () => {
                this.onFocus();
            }, onFocus: () => {
                this.onFocus();
            }, "aria-disabled": this.disabled }, h("span", { key: '1499efc8496c40be712260fdcd91d23715aec3ab', class: "icon" }, h("slot", { key: 'e96de4aeb44f76d18c76daad4e847a6df4a60b2c', name: "icon" })), h("slot", { key: '037db2c8139ae0286ad1aded9f7ac7b35855c21d' }), h("svg", { key: '49798505faaf489b65a409e3caaf213480555eba', class: "remove-indicator", width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", onClick: (e) => this.handleDismissTagEvent(e) }, h("path", { key: '1b0443049e52349ed740a3afba862645f38a7745', d: "M4.4734 12.4734L8.00007 8.94002L11.5267 12.4734L12.4734 11.5267L8.94007 8.00002L12.4734 4.47335L11.5267 3.52669L8.00007 7.06002L4.4734 3.52669L3.52673 4.47335L7.06007 8.00002L3.52673 11.5267L4.4734 12.4734Z" }))));
    }
    static get is() { return "market-tag"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-tag.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-tag.css"]
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
                    "text": "Functionally and visually disables the tag"
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "focused": {
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
                    "text": "Whether or not the tag is in a focused state"
                },
                "attribute": "focused",
                "reflect": true,
                "defaultValue": "false"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'medium' | 'small'",
                    "resolved": "\"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting tag size"
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'small'"
            }
        };
    }
    static get states() {
        return {
            "hasIcon": {}
        };
    }
    static get events() {
        return [{
                "method": "marketTagDismissed",
                "name": "marketTagDismissed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the tag's remove indicator is clicked."
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
//# sourceMappingURL=market-tag.js.map
