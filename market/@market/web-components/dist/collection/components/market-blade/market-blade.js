// TODO: use blade design tokens for animation speeds when they exist
import { CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION, CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION, } from "@market/market-theme/js/cjs/index.js";
import { Host, h } from "@stencil/core";
import { setupDialogCompactHandler, getDialogSelector, } from "../../utils/dialog";
import { getNamespacedTagFor } from "../../utils/namespace";
import { createAndActivateFocusTrap, } from "../../utils/focus-trap";
import { classNames } from "../../utils/classnames";
/**
 * @slot - The main content of the blade. Use `<section class="main">` tag.
 */
export class MarketBlade {
    constructor() {
        this.type = 'blade';
        /* Used to skip the exit animation for <market-blade hidden> on load */
        this.skipAnimation = false;
        this.hidden = false;
        this.dialogID = undefined;
        this.index = undefined;
        this.animationDuration = CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION;
        this.animationEnterDuration = CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION;
        this.animationExitDuration = CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION;
        this.trapFocus = false;
    }
    reenableAnimation() {
        this.skipAnimation = false;
    }
    /**
     * Listen to the marketHeaderNavigate event emitted by a market-header child component
     * so we can emit a close event if needed
     */
    headerNavigateEventHandler(event) {
        const { detail, target } = event;
        // TODO: 'close' should probably come from an enum of some sort
        if (detail.action === 'close') {
            // only dismiss if this is the first ancestor dialog
            if (target.closest(getDialogSelector()) === this.el) {
                this.dismiss();
            }
        }
    }
    /**
     * Emits the dismiss event
     * The parent context will handle actually removing elements from the DOM,
     * All the blade needs to do it emit an event so actually closing it can be
     * some other elements problem
     */
    dismiss(dismissOptions) {
        const { defaultPrevented } = this.marketDialogDismissed.emit({
            dialog: this.el,
            type: this.type,
            origin: (dismissOptions === null || dismissOptions === void 0 ? void 0 : dismissOptions.origin) || this.el,
        });
        if (!defaultPrevented) {
            this.hidden = true;
            /**
             * Emit a marketDialogDidDismiss event when modal gets fully dismissed (after animation).
             */
            setTimeout(() => {
                this.marketDialogDidDismiss.emit({
                    dialog: this.el,
                    type: this.type,
                    origin: this.el,
                });
            }, this.animationExitDuration);
        }
        return Promise.resolve();
    }
    onTrapFocusChanged(newValue, oldValue) {
        // only activate/deactivate when the `trapFocus` prop value changes
        if (newValue !== oldValue) {
            if (newValue) {
                this.activateFocusTrap();
            }
            else {
                this.deactivateFocusTrap();
            }
        }
    }
    /**
     * Activates the focus trap
     *
     * See [`focus-trap.ts`](../../utils/focus-trap.ts) for default options
     *
     * @param {Object} [options] [focus-trap create options](https://github.com/focus-trap/focus-trap#createoptions)
     * @param {Object} [activateOptions] set options for [onActivate, onPostActivate, and checkCanFocusTrap](https://github.com/focus-trap/focus-trap#trapactivate)
     */
    activateFocusTrap(options, activateOptions) {
        if (this.focusTrap) {
            this.focusTrap.activate(activateOptions !== null && activateOptions !== void 0 ? activateOptions : {});
            if (!this.trapFocus) {
                this.trapFocus = true;
            }
        }
        else {
            this.focusTrap = createAndActivateFocusTrap({
                activateOptions,
                el: this.el,
                options,
            });
        }
        return Promise.resolve();
    }
    /**
     * Deactivates the focus trap
     *
     * @param {FocusTrapDeactivateOptions} [deactivateOptions] set options for [onDeactivate, onPostDeactivate, and checkCanReturnFocus](https://github.com/focus-trap/focus-trap#trapdeactivate)
     */
    deactivateFocusTrap(deactivateOptions) {
        if (this.focusTrap) {
            this.focusTrap.deactivate(Object.assign({ returnFocus: true, checkCanReturnFocus: (trigger) => new Promise((resolve) => {
                    if (typeof (trigger === null || trigger === void 0 ? void 0 : trigger.setFocus) === 'function') {
                        trigger.setFocus();
                    }
                    else {
                        resolve(); // node.focus(); will be called by focus-trap
                    }
                }) }, deactivateOptions));
            this.focusTrap = undefined;
        }
        return Promise.resolve();
    }
    /**
     * Emit a marketDialogLoaded event when the component connects.
     * Need this so the context manager isn't rummaging around it's DOM
     * to try and find the dialog that was just appended
     */
    connectedCallback() {
        setTimeout(() => {
            this.marketDialogLoaded.emit({
                dialog: this.el,
                type: this.type,
            });
            if (this.trapFocus) {
                this.activateFocusTrap();
            }
        }, this.animationEnterDuration);
    }
    componentWillLoad() {
        const header = this.el.querySelector(getNamespacedTagFor('market-header'));
        if (header) {
            // We want to force the header to be navigable when slotted into blade
            header.showNavigation = true;
        }
        if (this.hidden) {
            this.skipAnimation = true;
        }
        setupDialogCompactHandler(this.el);
    }
    disconnectedCallback() {
        this.deactivateFocusTrap();
    }
    render() {
        return (h(Host, { key: '06712e57a83ac4e3a59ad347b7dd3ee64345849e', role: "dialog", class: classNames('market-blade', {
                'skip-animation': this.skipAnimation,
            }) }, h("slot", { key: '99deb622ccd2263d07aedda7146998984498b3e6' })));
    }
    static get is() { return "market-blade"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-blade.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-blade.css"]
        };
    }
    static get properties() {
        return {
            "hidden": {
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
                    "text": "INTERNAL ONLY: Used in CSS to trigger start and stop animations"
                },
                "attribute": "hidden",
                "reflect": true,
                "defaultValue": "false"
            },
            "dialogID": {
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
                    "text": "INTERNAL ONLY: Used by the context manager to identify a specific dialog/modal"
                },
                "attribute": "data-dialog-id",
                "reflect": true
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
                    "text": "INTERNAL ONLY: Used by the context manager to identify a specific dialog/modal's place\nin the stack"
                },
                "attribute": "data-dialog-index",
                "reflect": true
            },
            "animationDuration": {
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
                    "text": "DEPRECATED: The duration for the blade enter/exit animations, set from design tokens"
                },
                "attribute": "animation-duration",
                "reflect": false,
                "defaultValue": "CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION"
            },
            "animationEnterDuration": {
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
                    "text": "The duration for the modal enter animation, set from design tokens"
                },
                "attribute": "animation-enter-duration",
                "reflect": false,
                "defaultValue": "CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION"
            },
            "animationExitDuration": {
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
                    "text": "The duration for the modal exit animation, set from design tokens"
                },
                "attribute": "animation-exit-duration",
                "reflect": false,
                "defaultValue": "CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION"
            },
            "trapFocus": {
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
                    "text": "Enforces focus trapping on the modal"
                },
                "attribute": "trap-focus",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketDialogLoaded",
                "name": "marketDialogLoaded",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Triggered when the blade finishes loading"
                },
                "complexType": {
                    "original": "DialogLoadedEvent",
                    "resolved": "DialogLoadedEvent",
                    "references": {
                        "DialogLoadedEvent": {
                            "location": "import",
                            "path": "../../utils/dialog",
                            "id": "src/utils/dialog.tsx::DialogLoadedEvent"
                        }
                    }
                }
            }, {
                "method": "marketDialogDismissed",
                "name": "marketDialogDismissed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Triggered when the blade is dismissed, handled by context manager"
                },
                "complexType": {
                    "original": "DialogDismissedEvent",
                    "resolved": "DialogDismissedEvent",
                    "references": {
                        "DialogDismissedEvent": {
                            "location": "import",
                            "path": "../../utils/dialog",
                            "id": "src/utils/dialog.tsx::DialogDismissedEvent"
                        }
                    }
                }
            }, {
                "method": "marketDialogDidDismiss",
                "name": "marketDialogDidDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Triggered when the dialog is fully dismissed"
                },
                "complexType": {
                    "original": "DialogDismissedEvent",
                    "resolved": "DialogDismissedEvent",
                    "references": {
                        "DialogDismissedEvent": {
                            "location": "import",
                            "path": "../../utils/dialog",
                            "id": "src/utils/dialog.tsx::DialogDismissedEvent"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "dismiss": {
                "complexType": {
                    "signature": "(dismissOptions?: Partial<DialogDismissedEvent>) => Promise<void>",
                    "parameters": [{
                            "name": "dismissOptions",
                            "type": "{ dialog?: DialogElement; type?: \"dialog\" | \"modal-full\" | \"modal-partial\" | \"blade\" | \"sheet\"; origin?: HTMLElement; }",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "Partial": {
                            "location": "global",
                            "id": "global::Partial"
                        },
                        "DialogDismissedEvent": {
                            "location": "import",
                            "path": "../../utils/dialog",
                            "id": "src/utils/dialog.tsx::DialogDismissedEvent"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Emits the dismiss event\nThe parent context will handle actually removing elements from the DOM,\nAll the blade needs to do it emit an event so actually closing it can be\nsome other elements problem",
                    "tags": []
                }
            },
            "activateFocusTrap": {
                "complexType": {
                    "signature": "(options?: FocusTrapOptions, activateOptions?: FocusTrapActivateOptions) => Promise<void>",
                    "parameters": [{
                            "name": "options",
                            "type": "Options",
                            "docs": "[focus-trap create options](https://github.com/focus-trap/focus-trap#createoptions)"
                        }, {
                            "name": "activateOptions",
                            "type": "{ onActivate?: () => void; onPostActivate?: () => void; checkCanFocusTrap?: (containers: (HTMLElement | SVGElement)[]) => Promise<void>; }",
                            "docs": "set options for [onActivate, onPostActivate, and checkCanFocusTrap](https://github.com/focus-trap/focus-trap#trapactivate)"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "FocusTrapOptions": {
                            "location": "import",
                            "path": "../../utils/focus-trap",
                            "id": "src/utils/focus-trap.ts::FocusTrapOptions"
                        },
                        "FocusTrapActivateOptions": {
                            "location": "import",
                            "path": "../../utils/focus-trap",
                            "id": "src/utils/focus-trap.ts::FocusTrapActivateOptions"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Activates the focus trap\n\nSee [`focus-trap.ts`](../../utils/focus-trap.ts) for default options",
                    "tags": [{
                            "name": "param",
                            "text": "options [focus-trap create options](https://github.com/focus-trap/focus-trap#createoptions)"
                        }, {
                            "name": "param",
                            "text": "activateOptions set options for [onActivate, onPostActivate, and checkCanFocusTrap](https://github.com/focus-trap/focus-trap#trapactivate)"
                        }]
                }
            },
            "deactivateFocusTrap": {
                "complexType": {
                    "signature": "(deactivateOptions?: FocusTrapDeactivateOptions) => Promise<void>",
                    "parameters": [{
                            "name": "deactivateOptions",
                            "type": "DeactivateOptions",
                            "docs": "set options for [onDeactivate, onPostDeactivate, and checkCanReturnFocus](https://github.com/focus-trap/focus-trap#trapdeactivate)"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "FocusTrapDeactivateOptions": {
                            "location": "import",
                            "path": "../../utils/focus-trap",
                            "id": "src/utils/focus-trap.ts::FocusTrapDeactivateOptions"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Deactivates the focus trap",
                    "tags": [{
                            "name": "param",
                            "text": "deactivateOptions set options for [onDeactivate, onPostDeactivate, and checkCanReturnFocus](https://github.com/focus-trap/focus-trap#trapdeactivate)"
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "hidden",
                "methodName": "reenableAnimation"
            }, {
                "propName": "trapFocus",
                "methodName": "onTrapFocusChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketHeaderNavigate",
                "method": "headerNavigateEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-blade.js.map
