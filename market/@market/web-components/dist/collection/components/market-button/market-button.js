import { Host, h } from "@stencil/core";
import { observeAriaAttributes } from "../../utils/aria";
import { getNamespacedTagFor } from "../../utils/namespace";
/**
 * @slot - The text used for the button label
 * @slot icon - an icon that is to the left of button text, or centered if there is no text
 */
export class MarketButton {
    constructor() {
        // Implicit submission is when an interaction within a form fires a click event on the form's first submit button in tree order.
        // Because the inner <button> of <market-button> is in the shadow dom and not in tree order, we lose this functionality.
        // To ensure we have the exact behavior that a plain button would have had in this situation,
        // we add a hidden button to the form and click it for the implicit submission.
        // https://www.hjorthhansen.dev/shadow-dom-and-forms/
        // note: this is attached in the host element's onclick instead of with the @Listen decorator
        // to ensure the following fire in the correct order:
        // 1) handleClick
        // 2) the event passed to market-button
        // 3) implicit submission
        // In Ember, the @Listen would fire before the event passed to the button, which could result in the event not happening.
        this.handleImplicitSubmission = () => {
            if (this.type === 'submit') {
                const form = this.el.closest('form');
                if (form) {
                    const fakeButton = document.createElement('button');
                    fakeButton.type = this.type;
                    fakeButton.style.display = 'none';
                    form.appendChild(fakeButton);
                    fakeButton.click();
                    fakeButton.remove();
                }
            }
        };
        this.onMutationObserved = (ariaAttributes) => {
            this.ariaAttributes = ariaAttributes;
        };
        this.caret = 'none';
        this.disabled = false;
        this.download = undefined;
        this.focused = false;
        this.href = undefined;
        this.iconOnly = false;
        this.innerTabindex = undefined;
        this.isLoading = false;
        this.rank = 'secondary';
        this.rel = undefined;
        this.size = 'medium';
        this.target = undefined;
        this.type = 'button';
        this.variant = 'regular';
        this.ariaAttributes = undefined;
    }
    focusedChangeHandler(newValue) {
        if (!this.innerTag) {
            return;
        }
        if (newValue) {
            this.innerTag.focus();
        }
    }
    /* Listening for click events here allows us to stop bubbling when
    disabled. Attaching listeners to Host (as the Stencil linter prefers),
    seems to also work in Stencil tests, but fails in Ember for some reason.
    We listen in the "capture" phase to ensure we're hit before any external
    click handlers. See here for details:
    https://www.sitepoint.com/event-bubbling-javascript/ */
    handleClick(event) {
        if (this.disabled || this.isLoading) {
            // Calling `stopImmediatePropagation` instead of `stopPropagation`
            // allows us to block current and future "sibling" event listeners
            // that have also been attached to this element, as opposed to just
            // those higher in the DOM tree.
            event.stopImmediatePropagation();
        }
    }
    /**
     * Sets `focused` state, except when disabled. Allows external consumers to programmatically
     * trigger focused styling.
     */
    setFocus(value = true) {
        if (this.disabled) {
            return Promise.resolve();
        }
        this.focused = value; // this will cause the `focusedChangeHandler` to be triggered
        if (!value && this.innerTag) {
            this.innerTag.blur();
        }
        return Promise.resolve();
    }
    handleSlotChange() {
        const iconSlot = this.el.querySelector('[slot="icon"]');
        const hasIcon = Boolean(iconSlot);
        const buttonText = this.el.textContent.trim();
        let hasLabelText;
        if (hasIcon) {
            // Check for text in the icon itself, such as icon badge text. This text is considered part of the icon and not a label.
            // Since buttonText contains all text in the element including the svg, only set hasLabelText to true if text exists outside of the icon.
            const iconText = iconSlot.textContent.trim();
            hasLabelText = buttonText.length > iconText.length;
        }
        else {
            hasLabelText = buttonText.length > 0;
        }
        this.iconOnly = hasIcon && !hasLabelText;
    }
    componentWillLoad() {
        this.mutationObserver = observeAriaAttributes(this.el, this.onMutationObserved);
        this.handleSlotChange();
    }
    render() {
        const { 
        // props
        caret, disabled, href, innerTabindex, isLoading, target, type, rel, download, 
        // state
        ariaAttributes, 
        // methods
        handleImplicitSubmission, } = this;
        const TagType = href === undefined ? 'button' : 'a';
        const TagTypeAttrs = TagType === 'button' ? { type, disabled } : { href, target, rel, download };
        const MarketActivityIndicatorTagName = getNamespacedTagFor('market-activity-indicator');
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        return (h(Host, { key: '7ab029a8c99a088b7f4f6c780c74e07f89bcd73e', class: "market-button", onClick: handleImplicitSubmission }, h(TagType, Object.assign({ key: 'a82d9c744e51ae71d12e6611613dd3b19a9f32c9', class: "inner-tag" }, TagTypeAttrs, ariaAttributes, { tabindex: disabled ? -1 : innerTabindex, onFocus: () => {
                this.focused = true;
            }, onBlur: () => {
                this.focused = false;
            }, ref: (el) => (this.innerTag = el) }), h("slot", { key: '06c02b4d1e5896412bbfbe956394dd8c01f86ba6', name: "icon", onSlotchange: () => this.handleSlotChange() }), h("slot", { key: '79754fbad2cbd532c278c2702680e63ecdfecfb1', onSlotchange: () => this.handleSlotChange() }), caret === 'down' && h(MarketIconTagName, { key: 'e120aab00ab825ae0071014050f69f3bf1d2d256', name: "expand" }), caret === 'up' && h(MarketIconTagName, { key: '9c87ab277fe0826899270f5475cd95290c17aa36', name: "collapse" })), isLoading && h(MarketActivityIndicatorTagName, { key: '924783840ca804abfe7cb09e25c0303015805e1c', size: "small" })));
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    static get is() { return "market-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["styles/market-button.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["styles/market-button.css"]
        };
    }
    static get properties() {
        return {
            "caret": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'up' | 'down' | 'none'",
                    "resolved": "\"down\" | \"none\" | \"up\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting (optional) button caret direction"
                },
                "attribute": "caret",
                "reflect": false,
                "defaultValue": "'none'"
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
                    "text": "Functionally and visually disables the button"
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
                    "text": "Causes the browser to treat the linked URL as a download. Only works for same-origin URLs.\nOnly applies when an `href` is provided.\nSee [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download) for details on accepted values."
                },
                "attribute": "download",
                "reflect": false
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
                    "text": "Whether or not the button is in a focused state"
                },
                "attribute": "focused",
                "reflect": true,
                "defaultValue": "false"
            },
            "href": {
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
                    "text": "Contains a URL or a URL fragment that the hyperlink points to.\nIf this property is set, an anchor tag will be rendered."
                },
                "attribute": "href",
                "reflect": false
            },
            "iconOnly": {
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
                    "text": "Whether the button only contains an icon."
                },
                "attribute": "icon-only",
                "reflect": true,
                "defaultValue": "false"
            },
            "innerTabindex": {
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
                    "text": "Optionally set a custom tabindex on the inner HTML `<button>`."
                },
                "attribute": "inner-tabindex",
                "reflect": false
            },
            "isLoading": {
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
                    "text": "Whether or not the button is in a loading state"
                },
                "attribute": "is-loading",
                "reflect": true,
                "defaultValue": "false"
            },
            "rank": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'primary' | 'secondary' | 'tertiary'",
                    "resolved": "\"primary\" | \"secondary\" | \"tertiary\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting button rank"
                },
                "attribute": "rank",
                "reflect": true,
                "defaultValue": "'secondary'"
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
                    "text": "String for setting button size"
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'medium'"
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
                    "text": "Specifies where to display the linked URL.\nOnly applies when an `href` is provided.\nSee [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) for details on accepted values."
                },
                "attribute": "target",
                "reflect": false
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'button' | 'reset' | 'submit'",
                    "resolved": "\"button\" | \"reset\" | \"submit\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting button type"
                },
                "attribute": "type",
                "reflect": true,
                "defaultValue": "'button'"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'regular' | 'destructive'",
                    "resolved": "\"destructive\" | \"regular\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting button variant"
                },
                "attribute": "variant",
                "reflect": true,
                "defaultValue": "'regular'"
            }
        };
    }
    static get states() {
        return {
            "ariaAttributes": {}
        };
    }
    static get methods() {
        return {
            "setFocus": {
                "complexType": {
                    "signature": "(value?: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "value",
                            "type": "boolean",
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
                    "text": "Sets `focused` state, except when disabled. Allows external consumers to programmatically\ntrigger focused styling.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "focused",
                "methodName": "focusedChangeHandler"
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "handleClick",
                "target": undefined,
                "capture": true,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-button.js.map
