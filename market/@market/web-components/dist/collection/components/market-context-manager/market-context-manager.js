import { Host, h } from "@stencil/core";
import { getNamespacedTagFor } from "../../utils/namespace";
import { asyncRequestAnimationFrame } from "../../utils/raf";
export class MarketContextManager {
    constructor() {
        this.active = false;
        this.currentContext = undefined;
        this.stack = [];
    }
    initChildListObserver() {
        if (this.childListObserver)
            return;
        const updateChildList = () => {
            this.stack = [...this.el.children];
            this.currentContext = this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
        };
        updateChildList();
        this.childListObserver = new MutationObserver(updateChildList);
        this.childListObserver.observe(this.el, { childList: true });
    }
    async getCurrentContext() {
        while (!this.currentContext) {
            await asyncRequestAnimationFrame();
        }
        return this.currentContext;
    }
    contextEmptiedEventHandler({ target: emptiedContext }) {
        // Remove the emptied context from the DOM
        emptiedContext.remove();
        // Remove the emptied context from the stack
        this.stack.splice(this.stack.indexOf(emptiedContext), 1);
        // Set the currentContext to the next highest context or null if this was the
        // only context in the stack
        if (this.stack.length === 0) {
            this.deactivate();
        }
    }
    windowKeydown(e) {
        var _a;
        if (e.key === 'Escape' || e.key === 'Esc') {
            (_a = this.currentContext) === null || _a === void 0 ? void 0 : _a.currentDialog.el.dismiss({ origin: this.el });
        }
    }
    /**
     * Adds the passed dialogEl to the DOM and creates a new context if necessary or according to
     * `shouldCreateNewContext` if it is passed
     */
    async open(dialogEl, shouldCreateNewContext) {
        let createNewContext = shouldCreateNewContext;
        if (!this.currentContext || dialogEl) {
            createNewContext = true;
        }
        // If we don't currently have a context, or we're opening certain types of
        // dialogs, then we should create a new context
        if (createNewContext) {
            this.createNewContext();
        }
        await this.currentContext.open(dialogEl);
    }
    /**
     * Closes the dialog with matching ID
     */
    close(dialogID) {
        this.currentContext.close(dialogID);
        return Promise.resolve();
    }
    /**
     * Adds a new market-context to the stack in the DOM and activates it
     */
    createNewContext() {
        this.activate();
        this.el.appendChild(document.createElement(getNamespacedTagFor('market-context')));
        this.currentContext = this.el.lastElementChild;
        return Promise.resolve();
    }
    /**
     * Hides the entire context manager
     */
    deactivate() {
        this.active = false;
        this.marketContextManagerDeactivated.emit();
        return Promise.resolve();
    }
    /**
     * Shows the context manager
     */
    activate() {
        if (!this.active) {
            this.active = true;
            this.marketContextManagerActivated.emit();
        }
        return Promise.resolve();
    }
    handleMouseEvents(e) {
        var _a, _b;
        // checking to make sure the click started and ended on a market-context
        // with a veil before dismissing the current dialog
        // (clicks pass through contexts w/o veil, currently only used w/ market-blade)
        if (e.type === 'mousedown') {
            this.mouseDownEl = e.target.tagName;
        }
        else if (e.type === 'mouseup') {
            const mouseUpEl = e.target.tagName;
            if (this.mouseDownEl === mouseUpEl &&
                e.target.tagName.toLowerCase() === getNamespacedTagFor('market-context') &&
                !e.target.classList.contains('no-veil')) {
                (_b = (_a = this.currentContext) === null || _a === void 0 ? void 0 : _a.currentDialog) === null || _b === void 0 ? void 0 : _b.el.dismiss({ origin: this.el });
            }
        }
    }
    componentDidLoad() {
        this.initChildListObserver();
    }
    render() {
        return (h(Host, { key: '72a7dfd3862281d08036a4d1af846b8203e73893', class: "market-context-manager", onMouseDown: (e) => this.handleMouseEvents(e), onMouseUp: (e) => this.handleMouseEvents(e) }, h("slot", { key: 'b7ef4e0031991376e48a559f2a026174667ff429' })));
    }
    disconnectedCallback() {
        var _a;
        (_a = this.childListObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    static get is() { return "market-context-manager"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-context-manager.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-context-manager.css"]
        };
    }
    static get properties() {
        return {
            "active": {
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
                    "text": "Whether or not the context manager is UI blocking"
                },
                "attribute": "active",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "currentContext": {},
            "stack": {}
        };
    }
    static get events() {
        return [{
                "method": "marketContextManagerActivated",
                "name": "marketContextManagerActivated",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the context manager is activated/blocking is turned on"
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "marketContextManagerDeactivated",
                "name": "marketContextManagerDeactivated",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the context manager is deactivated/blocking is turned off"
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
            "open": {
                "complexType": {
                    "signature": "(dialogEl: DialogElement, shouldCreateNewContext?: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "dialogEl",
                            "type": "HTMLMarketBladeElement | HTMLMarketDialogElement | HTMLMarketModalFullElement | HTMLMarketModalPartialElement | HTMLMarketSheetElement",
                            "docs": ""
                        }, {
                            "name": "shouldCreateNewContext",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "DialogElement": {
                            "location": "import",
                            "path": "../../utils/dialog",
                            "id": "src/utils/dialog.tsx::DialogElement"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Adds the passed dialogEl to the DOM and creates a new context if necessary or according to\n`shouldCreateNewContext` if it is passed",
                    "tags": []
                }
            },
            "close": {
                "complexType": {
                    "signature": "(dialogID?: string) => Promise<void>",
                    "parameters": [{
                            "name": "dialogID",
                            "type": "string",
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
                    "text": "Closes the dialog with matching ID",
                    "tags": []
                }
            },
            "createNewContext": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLMarketContextElement": {
                            "location": "global",
                            "id": "global::HTMLMarketContextElement"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Adds a new market-context to the stack in the DOM and activates it",
                    "tags": []
                }
            },
            "deactivate": {
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
                    "text": "Hides the entire context manager",
                    "tags": []
                }
            },
            "activate": {
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
                    "text": "Shows the context manager",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "marketContextEmptied",
                "method": "contextEmptiedEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "keydown",
                "method": "windowKeydown",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-context-manager.js.map
