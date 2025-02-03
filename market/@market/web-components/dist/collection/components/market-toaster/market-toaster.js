import { Host, h } from "@stencil/core";
// TODO(UI-1153): add design tokens for these
const TOAST_VERTICAL_SPACING = 16;
const TOAST_BOTTOM_MARGIN = 24;
const TOAST_ANIMATION_TRANSITION_DURATION = 200;
export class MarketToaster {
    constructor() {
        this.toasts = [];
    }
    /**
     * Add the passed toastEl to market-toaster and make it visible
     **/
    async show(toastEl) {
        this.toasts.unshift(toastEl);
        toastEl.classList.add('use-transitions');
        this.el.appendChild(toastEl);
        window.requestAnimationFrame(this.positionToasts.bind(this));
        await new Promise((resolve) => setTimeout(resolve, TOAST_ANIMATION_TRANSITION_DURATION));
        toastEl.startAutoDismissTimer();
    }
    positionToasts() {
        let offset = TOAST_BOTTOM_MARGIN;
        this.toasts.forEach((toast) => {
            toast.style.transform = `translate(-50%, calc(-100% - ${offset}px))`;
            offset += toast.offsetHeight + TOAST_VERTICAL_SPACING;
        });
    }
    /**
     * Remove the passed toastEl from market-toaster
     **/
    async hide(toastEl) {
        const index = this.toasts.indexOf(toastEl);
        this.toasts.splice(index, 1);
        window.requestAnimationFrame(() => {
            toastEl.style.transform = '';
            this.positionToasts();
        });
        await new Promise((resolve) => setTimeout(resolve, TOAST_ANIMATION_TRANSITION_DURATION));
        toastEl.remove();
    }
    /**
     * Remove all market-toasts from market-toaster
     **/
    removeAll() {
        const allActiveToasts = [...this.toasts];
        return Promise.all(allActiveToasts.map((toast) => this.hide(toast)));
    }
    toastAutoDismissedEventHandler({ target: toast }) {
        this.hide(toast);
    }
    toastManuallyDismissedEventHandler({ target: toast }) {
        this.hide(toast);
    }
    render() {
        return (h(Host, { key: '0ff23d72f29449393173f717b060818de032de23', class: "market-toaster" }, h("slot", { key: '5f0ab526f9f5c704cb1d92e8c02d5a1eae5936b1' })));
    }
    static get is() { return "market-toaster"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-toaster.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-toaster.css"]
        };
    }
    static get methods() {
        return {
            "show": {
                "complexType": {
                    "signature": "(toastEl: any) => Promise<void>",
                    "parameters": [{
                            "name": "toastEl",
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
                    "text": "Add the passed toastEl to market-toaster and make it visible",
                    "tags": []
                }
            },
            "hide": {
                "complexType": {
                    "signature": "(toastEl: any) => Promise<void>",
                    "parameters": [{
                            "name": "toastEl",
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
                    "text": "Remove the passed toastEl from market-toaster",
                    "tags": []
                }
            },
            "removeAll": {
                "complexType": {
                    "signature": "() => Promise<void[]>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void[]>"
                },
                "docs": {
                    "text": "Remove all market-toasts from market-toaster",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "marketToastAutoDismissed",
                "method": "toastAutoDismissedEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketToastManuallyDismissed",
                "method": "toastManuallyDismissedEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-toaster.js.map
