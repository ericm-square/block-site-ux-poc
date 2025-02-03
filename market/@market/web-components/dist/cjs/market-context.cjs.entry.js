'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const index$1 = require('./index-305c3fd5.js');
const dialog = require('./dialog-3b638e9e.js');
const index$2 = require('./index-254d04f0.js');

const marketContextCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{position:absolute;display:grid;justify-items:center;width:100vw;height:100%;animation:var(--core-animation-enter-transition-moderate-speed-duration)\n    market-fade-in\n    forwards\n    var(--core-animation-enter-transition-easing)}:host([hidden]){opacity:0%;animation-name:market-fade-out;animation-duration:var(--core-animation-exit-transition-moderate-speed-duration);animation-timing-function:var(--core-animation-exit-transition-easing)}:host>*{pointer-events:auto}:host(:not(.no-veil)){background-color:var(--core-surface-overlay-color);opacity:100%;pointer-events:auto}:host(.no-veil){pointer-events:none}@media screen and (min-width: 800px){::slotted(.market-modal-partial){align-self:center;margin:var(--modal-partial-vertical-screen-buffer-size) var(--modal-partial-horizontal-screen-buffer-size)}}::slotted(.market-dialog){align-self:center;width:calc(100% - (2 * var(--modal-dialog-horizontal-screen-buffer-size, 16px)))}";
const MarketContextStyle0 = marketContextCss;

const MarketContext = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketContextContentsChanged = index.createEvent(this, "marketContextContentsChanged", 7);
        this.marketContextEmptied = index.createEvent(this, "marketContextEmptied", 7);
        this.currentDialog = undefined;
        this.noVeil = false;
        this.hidden = false;
        this.animationEnterDuration = index$1.cjs.CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION;
        this.animationExitDuration = index$1.cjs.CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION;
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
    doesStackContainDialogThatRequiresVeil(dialog$1) {
        const veiledDialogTagnames = Object.entries(dialog.DIALOGS_META)
            .filter(([, config]) => config.veil)
            .map(([type]) => index$2.getNamespacedTagFor(`market-${type}`));
        return veiledDialogTagnames.includes(dialog$1.tagName.toLowerCase());
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
        dialog.ALL_DIALOG_TYPES.forEach((dialogType) => {
            this.dialogMeta[dialogType] = { count: 0 };
        });
    }
    render() {
        return (index.h(index.Host, { key: '2a0b56ee061c12442f50ceeaa8cb717817a0d1d5', class: `market-context ${this.noVeil ? 'no-veil' : ''}` }, index.h("slot", { key: '12f97a955528ee801f1459cc9426f71b4a625025' })));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "currentDialog": ["currentDialogWatcher"],
        "stack": ["stackWatcher"]
    }; }
};
MarketContext.style = MarketContextStyle0;

exports.market_context = MarketContext;

//# sourceMappingURL=market-context.cjs.entry.js.map