import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as cjs } from './index3.js';
import { c as createAndActivateFocusTrap } from './focus-trap.js';
import { g as getNamespacedTagFor } from './index2.js';

const marketDialogCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}@keyframes market-popup{from{opacity:0%;transform:scale(0.9, 0.9)}to{opacity:100%;transform:scale(1, 1)}}@keyframes market-popdown{from{opacity:100%;transform:scale(1, 1)}to{opacity:0%;transform:scale(0.9, 0.9)}}@keyframes market-slideup{from{opacity:0%;transform:translateY(80vh)}to{opacity:100%;transform:translateY(0)}}@keyframes market-slidedown{from{opacity:100%;transform:translateY(0)}to{opacity:0%;transform:translateY(80vh)}}@keyframes market-slide-left-enter{from{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes market-slide-left-exit{from{transform:translateX(0)}to{transform:translateX(100%)}}@keyframes market-fade-in{from{opacity:0%}to{opacity:100%}}@keyframes market-fade-out{from{opacity:100%}to{opacity:0%}}@keyframes market-input-autofill-start{from{}to{}}@keyframes market-input-autofill-cancel{from{}to{}}@keyframes market-input-search-compact-enter{from{}to{}}@keyframes market-input-search-compact-exit{from{}to{}}:host{display:flex;flex-direction:column;justify-content:stretch;overflow:hidden}:host ::slotted(main),:host ::slotted(.main){flex:0 1 100%;overflow-y:auto;height:100%}:host ::slotted(.market-header){margin-bottom:var(--core-metrics-spacing-300);padding-top:0}:host ::slotted(.market-footer){padding-bottom:0}:host{--modal-dialog-width:var(--modal-dialog-maximum-width-size);--modal-dialog-horizontal-padding-size:var(--modal-dialog-compact-horizontal-size-class-horizontal-padding);--modal-dialog-vertical-padding-size:var(--modal-dialog-compact-vertical-size-class-vertical-padding);width:var(--modal-dialog-width);max-width:var(--modal-dialog-width);padding:var(--modal-dialog-vertical-padding-size)\n    var(--modal-dialog-horizontal-padding-size);border-radius:var(--modal-dialog-border-radius);background-color:var(--modal-dialog-background-color);animation:var(--modal-dialog-animation-enter-transition-duration)\n    market-popup\n    forwards\n    var(--modal-dialog-animation-enter-transition-easing)}:host([hidden]){animation-name:market-popdown;animation-duration:var(--modal-dialog-animation-exit-transition-duration);animation-timing-function:var(--modal-dialog-animation-exit-transition-easing)}:host([value=\"loadingMode\"]){display:flex;flex-direction:column}::slotted(.market-footer){padding-top:var(--modal-dialog-regular-vertical-size-class-vertical-padding)}.market-activity-indicator{align-self:flex-start;margin-bottom:var(--core-metrics-spacing-200)}@media only screen and (min-width: 600px){:host{--modal-dialog-horizontal-padding-size:var(--modal-dialog-regular-horizontal-size-class-horizontal-padding);--modal-dialog-vertical-padding-size:var(--modal-dialog-regular-vertical-size-class-vertical-padding)}}@media only screen and (min-width: 1200px){:host{--modal-dialog-horizontal-padding-size:var(--modal-dialog-wide-horizontal-size-class-horizontal-padding);--modal-dialog-vertical-padding-size:var(--modal-dialog-wide-vertical-size-class-vertical-padding, 32px)}}";
const MarketDialogStyle0 = marketDialogCss;

const MarketDialog$1 = /*@__PURE__*/ proxyCustomElement(class MarketDialog extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketDialogLoaded = createEvent(this, "marketDialogLoaded", 7);
        this.marketDialogDismissed = createEvent(this, "marketDialogDismissed", 7);
        this.marketDialogDidDismiss = createEvent(this, "marketDialogDidDismiss", 7);
        this.type = 'dialog';
        this.hidden = false;
        this.dialogID = undefined;
        this.index = undefined;
        this.isLoading = false;
        this.persistent = false;
        this.trapFocus = false;
        this.animationEnterDuration = cjs.MODAL_DIALOG_ANIMATION_ENTER_TRANSITION_DURATION;
        this.animationExitDuration = cjs.MODAL_DIALOG_ANIMATION_EXIT_TRANSITION_DURATION;
    }
    /**
     * Emits the dismiss event
     * The parent context will handle actually removing elements from the DOM,
     * All the dialog needs to do it emit an event so actually closing it can be
     * some other elements problem
     */
    dismiss(dismissOptions) {
        if (!this.persistent) {
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
    removeTopMarginOfFirstHeading() {
        const headings = this.el.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length > 0) {
            headings[0].style.marginTop = '0';
        }
    }
    handleSlotchange() {
        this.removeTopMarginOfFirstHeading();
    }
    connectedCallback() {
        this.connectedCallbackTimeout = setTimeout(() => {
            /**
             * Emit a marketDialogLoaded event when the component connects. Need this so
             * the context manager isn't rummaging around it's DOM to try and find the
             * dialog that was just appended
             */
            this.marketDialogLoaded.emit({
                dialog: this.el,
                type: this.type,
            });
            if (this.trapFocus) {
                this.activateFocusTrap();
            }
        }, this.animationEnterDuration);
        this.handleSlotchange();
    }
    disconnectedCallback() {
        this.deactivateFocusTrap();
        /**
         * Prevents error caused by race conditions during rapid mounting and
         * unmounting of component by clearing the setTimeout from connectedCallback
         * if it gets called after disconnectedCallback.
         */
        clearTimeout(this.connectedCallbackTimeout);
    }
    render() {
        const MarketActivityIndicatorTagName = getNamespacedTagFor('market-activity-indicator');
        return (h(Host, { key: '7da7425983b6355851687256e2dc66d205f316ed', class: "market-dialog", role: "dialog" }, this.isLoading && h(MarketActivityIndicatorTagName, { key: '474cdfa415c07cf3c9e0cff7a0d0584f4b837386' }), h("slot", { key: 'f26ca73aa2034db72a0c075051f89c7e95dcfeea', onSlotchange: this.handleSlotchange.bind(this) })));
    }
    get el() { return this; }
    static get watchers() { return {
        "trapFocus": ["onTrapFocusChanged"]
    }; }
    static get style() { return MarketDialogStyle0; }
}, [1, "market-dialog", {
        "hidden": [1540],
        "dialogID": [513, "data-dialog-id"],
        "index": [514, "data-dialog-index"],
        "isLoading": [4, "is-loading"],
        "persistent": [516],
        "trapFocus": [1028, "trap-focus"],
        "animationEnterDuration": [2, "animation-enter-duration"],
        "animationExitDuration": [2, "animation-exit-duration"],
        "dismiss": [64],
        "activateFocusTrap": [64],
        "deactivateFocusTrap": [64]
    }, undefined, {
        "trapFocus": ["onTrapFocusChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-dialog"];
    components.forEach(tagName => { switch (tagName) {
        case "market-dialog":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketDialog$1);
            }
            break;
    } });
}

const MarketDialog = MarketDialog$1;
const defineCustomElement = defineCustomElement$1;

export { MarketDialog, defineCustomElement };

//# sourceMappingURL=market-dialog.js.map