import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../utils/namespace";
/**
 * @slot - The text for the toast
 * @slot action - for `<a href>` or `<button>` (not a `<market-button>`)
 */
export class MarketToast {
    constructor() {
        this.variant = 'info';
        this.persistent = false;
        this.dismissButtonAriaLabel = 'Dismiss';
        this.progress = -1;
        this.durationTilAutoDismiss = 5000;
        this.showActionsNav = false;
    }
    /**
     * Set toast to disappear after the autodismiss timeout has passed
     */
    startAutoDismissTimer() {
        if (!this.persistent) {
            setTimeout(() => {
                this.marketToastAutoDismissed.emit();
            }, this.durationTilAutoDismiss);
        }
        return Promise.resolve();
    }
    handleManualDismiss() {
        this.marketToastManuallyDismissed.emit();
    }
    componentWillLoad() {
        this.checkIfActionsArePresent();
    }
    checkIfActionsArePresent() {
        const actions = this.el.querySelector('[slot="action"]');
        this.showActionsNav = actions ? true : false;
    }
    // TODO: replace with design token references after they are added (UI-6241)
    getVariantIcon() {
        switch (this.variant) {
            case 'success':
                return 'success';
            case 'info':
                return 'info';
            case 'warning':
                return 'attention';
            case 'insight':
                return 'recommendation';
            default:
                return 'warning';
        }
    }
    render() {
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        const progress = Math.min(this.progress, 100);
        const progressStyle = {
            width: `${progress}%`,
        };
        return (h(Host, { key: 'fdf10e65a44f11b6e9c7c2ad76562888a9142b39', class: "market-toast", role: "alert" }, h("div", { key: '7a5d3cdc63b1cb3f5cde06f0b94427aca548d7ad', class: "content" }, h("span", { key: 'e359a579c7a0d155a5547ce2bfb6c723dcfd936b', class: "icon-container" }, h(MarketIconTagName, { key: '4947d2fe92bb868612d02b19d4c29189d9a9065a', name: this.getVariantIcon() })), h("div", { key: '1a8fdb2cdd9abcf85ca03b2374ed4f1c22ef0075', class: "main" }, h("section", { key: 'fa3335da51befad1ab399425d1f2161e86998c74' }, h("slot", { key: 'ff628bab0db6dcbdb0469e00e86b78e756d67121' })), h("nav", { key: 'd7a1f6203f81a1e4988abc5149770cdea2841628', "aria-label": "toast-actions", class: this.showActionsNav ? '' : 'hidden' }, h("slot", { key: 'f3cf89137e0234b85a604939004ad36ffd0631d1', name: "action", onSlotchange: () => this.checkIfActionsArePresent() }))), h("nav", { key: '9e115d8b1035d6cbab8004babfb445bd3165b192', "aria-label": "dismiss-container", class: "dismiss-container" }, h("button", { key: 'e4d1d6b5cc356bc8938b2fcd857d19f425c2cc0f', type: "button", "aria-label": this.dismissButtonAriaLabel, onClick: () => this.handleManualDismiss() }, h(MarketIconTagName, { key: '222a7a53bf9e260aa975f2cd8c5119381e59a994', name: "close" })))), this.progress >= 0 && (h("progress-bar", { key: '2050f45b9e54927cbe415c90e99a13f85e142142', role: "progressbar", "aria-valuenow": progress, "aria-valuemin": "0", "aria-valuemax": "100", style: progressStyle }))));
    }
    static get is() { return "market-toast"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-toast.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-toast.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'info' | 'success' | 'warning' | 'critical' | 'insight'",
                    "resolved": "\"critical\" | \"info\" | \"insight\" | \"success\" | \"warning\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "toast variant that corresponds to the type of info it is conveying"
                },
                "attribute": "variant",
                "reflect": true,
                "defaultValue": "'info'"
            },
            "persistent": {
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
                    "text": "Whether or not the toast persists, ie does not autodismiss after 5s"
                },
                "attribute": "persistent",
                "reflect": false,
                "defaultValue": "false"
            },
            "dismissButtonAriaLabel": {
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
                    "text": "Optional property to pass a string to the dismiss \"x\"\nthat will function as its aria-label. Defaults to \"Dismiss\"."
                },
                "attribute": "dismiss-button-aria-label",
                "reflect": true,
                "defaultValue": "'Dismiss'"
            },
            "progress": {
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
                    "text": "The progress of the action, progress bar will be rendered for values between 0-100 inclusive"
                },
                "attribute": "progress",
                "reflect": true,
                "defaultValue": "-1"
            }
        };
    }
    static get states() {
        return {
            "durationTilAutoDismiss": {},
            "showActionsNav": {}
        };
    }
    static get events() {
        return [{
                "method": "marketToastAutoDismissed",
                "name": "marketToastAutoDismissed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the toast automatically dismisses."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "marketToastManuallyDismissed",
                "name": "marketToastManuallyDismissed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the toast's dismissed button is clicked."
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
            "startAutoDismissTimer": {
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
                    "text": "Set toast to disappear after the autodismiss timeout has passed",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-toast.js.map
