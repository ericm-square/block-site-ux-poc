import { Host, h } from "@stencil/core";
import { observeAriaAttributes } from "../../utils/aria";
/**
 * @slot - The text used for the link.
 */
export class MarketLink {
    constructor() {
        this.onMutationObserved = (ariaAttributes) => {
            this.ariaAttributes = ariaAttributes;
        };
        this.href = undefined;
        this.target = undefined;
        this.rel = undefined;
        this.destructive = false;
        this.disabled = false;
        this.download = undefined;
        this.highlight = undefined;
        this.ariaAttributes = undefined;
    }
    componentWillLoad() {
        this.mutationObserver = observeAriaAttributes(this.el, this.onMutationObserved);
    }
    handleClick(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    render() {
        const { disabled, handleClick, href, target, ariaAttributes, rel, download } = this;
        const TagType = href !== undefined ? 'a' : 'button';
        const TagTypeAttrs = TagType === 'a' ? { href, target, rel, download } : { disabled };
        return (h(Host, { key: '1ff15b453af9a9fc80263474f7415d669b4d158f', class: "market-link", onClick: handleClick, onKeyDown: handleClick }, h(TagType, Object.assign({ key: '9c680a5363b028c6dcece71a5e6d3efc7f131190' }, TagTypeAttrs, ariaAttributes, { "aria-disabled": disabled ? 'true' : null, tabindex: disabled ? '-1' : null }), h("slot", { key: 'ca9afe137bd74a21bfe944a4af0afc3d241d0015' }))));
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    static get is() { return "market-link"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-link.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-link.css"]
        };
    }
    static get properties() {
        return {
            "href": {
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
                    "text": "String that represents the URL the link goes to.\nIf not present, the internal tag will be a `<button>` rather than `<a>` in order to align with a11y best practices."
                },
                "attribute": "href",
                "reflect": false
            },
            "target": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'_blank' | '_self' | '_parent' | '_top' | undefined",
                    "resolved": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Specifies where to open the linked URL.\nSee [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) for details on accepted values."
                },
                "attribute": "target",
                "reflect": false
            },
            "rel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | undefined",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Defines the relationship between a linked resource and the current document.\nOnly applies when an `href` is provided.\nSee [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) for details on accepted values."
                },
                "attribute": "rel",
                "reflect": false
            },
            "destructive": {
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
                    "text": "Gives the link destructive styling."
                },
                "attribute": "destructive",
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
                    "text": "Visually disables the link and prevents navigating to the link on click."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "download": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | undefined",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Causes the browser to treat the linked URL as a download. Only works for same-origin URLs.\nOnly applies when an `href` is provided.\nSee [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download) for details on accepted values."
                },
                "attribute": "download",
                "reflect": false
            },
            "highlight": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "null | false | 'underline'",
                    "resolved": "\"underline\" | boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Links that exist within a larger block of text need to rely on more than color to meet accessibility standards."
                },
                "attribute": "highlight",
                "reflect": true
            }
        };
    }
    static get states() {
        return {
            "ariaAttributes": {}
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-link.js.map
