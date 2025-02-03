import { CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION, CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION, } from "@market/market-theme/js/cjs/index.js";
import { Host, h } from "@stencil/core";
import { ALL_DIALOG_TYPES, DIALOGS_META } from "../../utils/dialog";
import { getNamespacedTagFor } from "../../utils/namespace";
export class MarketContext {
    constructor() {
        this.currentDialog = undefined;
        this.noVeil = false;
        this.hidden = false;
        this.animationEnterDuration = CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION;
        this.animationExitDuration = CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION;
        this.stack = [];
        this.totalCount = 0;
        this.dialogMeta = {};
    }
    currentDialogWatcher(newDialog) {
        this.stack.push(newDialog);
        this.stack = [...this.stack]; // Spread syntax ensures triggering the watcher
    }
    stackWatcher(newValue) {
        newValue.forEach((dialog) => {
            // increase the count of the type of dialog in the meta
            this.dialogMeta[dialog.type].count += 1;
            // Increase the total count of dialogs
            this.totalCount += 1;
        });
        // If there are no more dialogs opened, then emit an event indicating so
        if (newValue.length === 0) {
            this.hidden = true;
            setTimeout(() => {
                this.marketContextEmptied.emit();
            }, this.animationExitDuration);
        }
        this.setContextVeil();
    }
    doesStackContainDialogThatRequiresVeil(dialog) {
        const veiledDialogTagnames = Object.entries(DIALOGS_META)
            .filter(([, config]) => config.veil)
            .map(([type]) => getNamespacedTagFor(`market-${type}`));
        return veiledDialogTagnames.includes(dialog.tagName.toLowerCase());
    }
    setContextVeil() {
        // consumer use of noVeil prop overrides default behavior
        // veil shouldn't reset when stack is emptied
        if (this.el.hasAttribute('no-veil') || this.stack.length === 0) {
            return;
        }
        // context will turn off veil if no context in its stack requires one
        this.noVeil = !this.stack.some((dialog) => this.doesStackContainDialogThatRequiresVeil(dialog.el));
    }
    stackHasDialog(dialogEl) {
        return this.stack.some((dialog) => dialog.el === dialogEl);
    }
    modalLoadedEventHandler(e) {
        const dialog = e.detail.dialog;
        const type = e.detail.type;
        if (dialog.parentElement !== this.el) {
            // Ignore marketDialogLoaded events from dialogs which are not children of this
            // context.
            return;
        }
        else if (this.stackHasDialog(dialog)) {
            // Ignore marketDialogLoaded events from dialogs already contained in this
            // context's stack.
            return;
        }
        // Generate a new dialogID (ex. "modal-partial-2")
        const generatedDialogID = this.generateDialogID(type);
        // Set the dialogID for the dialog element (note: this maps to data-dialog-id
        // and not the native id attribute)
        dialog.dialogID = generatedDialogID;
        // Set the id prop if one does not exist
        // (we don't use this prop anymore, but since we were setting it to
        // generatedDialogID before, removing it would be a breaking change)
        dialog.id = dialog.id || generatedDialogID;
        // Build a new Dialog object and set the currentDialog
        this.currentDialog = {
            el: dialog,
            type,
            dialogID: dialog.dialogID,
            id: dialog.id,
            index: this.stack.length,
            indexOfType: this.dialogMeta[type].count + 1,
        };
        // Emit a nice marketContextContentsChanged event
        this.marketContextContentsChanged.emit({
            action: 'marketNewDialogOpened',
            currentDialog: this.currentDialog,
            stack: this.stack,
        });
    }
    // This event is emitted from market dialog components (Modal, Sheet, Blade, etc.)
    dialogDismissedEventHandler(event) {
        if (event.defaultPrevented) {
            return;
        }
        // only close direct children of this context
        if (event.target.parentElement === this.el) {
            this.close(event.detail.dialog.dialogID);
        }
    }
    generateDialogID(type) {
        // ex. "sheet-2"
        return `${type}-${this.dialogMeta[type].count + 1}`;
    }
    getDialogByID(dialogID) {
        return this.stack.find((dialog) => dialog.dialogID === dialogID);
    }
    /**
     * Adds the passed dialogTemplate to the stack and inserts it into the DOM
     */
    open(dialogTemplate) {
        if (this.stack.length === 0) {
            this.noVeil = !this.doesStackContainDialogThatRequiresVeil(dialogTemplate);
        }
        this.el.appendChild(dialogTemplate);
        return Promise.resolve();
    }
    /**
     * **Recommended for internal use only**
     * Removes the topmost dialog from the stack or the dialog matching the passed `dialogID`
     * Note that using this will not trigger the dialog to emit a marketDialogDismissed event.
     *
     * The recommended path for closing a dialog is to call its dismiss() method.
     */
    // TODO (breaking): consider renaming this method to `removeDialogElement`
    close(dialogID) {
        let dialog;
        const d = this.stack.indexOf(dialog);
        // If we want to close a specific dialog, then find that dialog in the stack
        if (dialogID) {
            dialog = this.stack.find((dialog) => dialog.dialogID === dialogID);
            // If there is no dialog with the passed id, log a helpful warning
            /* eslint-disable-next-line no-console */
            !dialog && console.warn(`Tried to close dialog with data-dialog-id "${dialogID}" but none were found`);
            // Otherwise we will close the current/most recently opened dialog
        }
        else {
            dialog = this.currentDialog;
        }
        if (dialog) {
            // currently, "persistent" is only implemented for market-dialog, bc it's
            // the only dialog type that doesn't programmatically insert a close button
            // when used w/ market-header
            if (dialog.type === 'dialog' && dialog.el.persistent) {
                return Promise.resolve();
            }
            // Remove the dialog node from the DOM
            setTimeout(() => {
                dialog.el.remove();
                // Remove the dialog from the stack. Reassign to trigger the watcher
                this.stack.splice(d, 1);
                this.stack = [...this.stack];
                // Emit a nice event
                this.marketContextContentsChanged.emit({
                    action: 'marketDialogClosed',
                    currentDialog: dialog,
                    stack: this.stack,
                });
            }, dialog.el.animationExitDuration);
        }
        return Promise.resolve();
    }
    /**
     * **Recommended for internal use only**
     * Removes the topmost dialog from the stack (just an alias for default .close() behavior)
     * Note that using this will not trigger the dialog to emit a marketDialogDismissed event.
     *
     * The recommended path for closing a dialog is to call its dismiss() method.
     */
    // TODO (breaking): consider removing this method in favor of encouraging consumers to close dialogs via dialog.dismiss();
    closeCurrent() {
        this.close();
        return Promise.resolve();
    }
    connectedCallback() {
        ALL_DIALOG_TYPES.forEach((dialogType) => {
            this.dialogMeta[dialogType] = { count: 0 };
        });
    }
    render() {
        return (h(Host, { key: '2a0b56ee061c12442f50ceeaa8cb717817a0d1d5', class: `market-context ${this.noVeil ? 'no-veil' : ''}` }, h("slot", { key: '12f97a955528ee801f1459cc9426f71b4a625025' })));
    }
    static get is() { return "market-context"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-context.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-context.css"]
        };
    }
    static get properties() {
        return {
            "currentDialog": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "Dialog",
                    "resolved": "Dialog",
                    "references": {
                        "Dialog": {
                            "location": "import",
                            "path": "../../utils/dialog",
                            "id": "src/utils/dialog.tsx::Dialog"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "**INTERNAL [do not use directly]**\nExposes the context's currentDialog for use by market-context-manager"
                }
            },
            "noVeil": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "Boolean",
                    "resolved": "Boolean",
                    "references": {
                        "Boolean": {
                            "location": "global",
                            "id": "global::Boolean"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "**INTERNAL [do not use directly]**\nDisabling the context's default veil (including scroll blocking behavior)\nwhen visible. By default, this is set by market-context according to what\ndialog type is being opened. In the future, we want to expose this as an\noptional config option for market-context-manager's open() method."
                },
                "defaultValue": "false"
            },
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
                    "text": "Whether the context is hidden or visible."
                },
                "attribute": "hidden",
                "reflect": true,
                "defaultValue": "false"
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
            }
        };
    }
    static get states() {
        return {
            "stack": {},
            "totalCount": {},
            "dialogMeta": {}
        };
    }
    static get events() {
        return [{
                "method": "marketContextContentsChanged",
                "name": "marketContextContentsChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted whenever the contents of the context have changed:\n- Dialog added to the stack\n- Dialog removed from the stack"
                },
                "complexType": {
                    "original": "{\n    action: 'marketNewDialogOpened' | 'marketDialogClosed';\n    currentDialog: Dialog;\n    stack: Array<Dialog>;\n  }",
                    "resolved": "{ action: \"marketNewDialogOpened\" | \"marketDialogClosed\"; currentDialog: Dialog; stack: Dialog[]; }",
                    "references": {
                        "Dialog": {
                            "location": "import",
                            "path": "../../utils/dialog",
                            "id": "src/utils/dialog.tsx::Dialog"
                        },
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    }
                }
            }, {
                "method": "marketContextEmptied",
                "name": "marketContextEmptied",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted whenever the context's stack is empty (no more open dialogs)"
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
                    "signature": "(dialogTemplate: any) => Promise<void>",
                    "parameters": [{
                            "name": "dialogTemplate",
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
                    "text": "Adds the passed dialogTemplate to the stack and inserts it into the DOM",
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
                    "text": "**Recommended for internal use only**\nRemoves the topmost dialog from the stack or the dialog matching the passed `dialogID`\nNote that using this will not trigger the dialog to emit a marketDialogDismissed event.\n\nThe recommended path for closing a dialog is to call its dismiss() method.",
                    "tags": []
                }
            },
            "closeCurrent": {
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
                    "text": "**Recommended for internal use only**\nRemoves the topmost dialog from the stack (just an alias for default .close() behavior)\nNote that using this will not trigger the dialog to emit a marketDialogDismissed event.\n\nThe recommended path for closing a dialog is to call its dismiss() method.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "currentDialog",
                "methodName": "currentDialogWatcher"
            }, {
                "propName": "stack",
                "methodName": "stackWatcher"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketDialogLoaded",
                "method": "modalLoadedEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDialogDismissed",
                "method": "dialogDismissedEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-context.js.map
