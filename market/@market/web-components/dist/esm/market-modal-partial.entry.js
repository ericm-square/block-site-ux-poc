import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { c as cjs } from './index-0ae5b082.js';
import { g as getDialogSelector, s as setupDialogCompactHandler } from './dialog-b3d4b5d7.js';
import { c as createAndActivateFocusTrap } from './focus-trap-a29c2e91.js';
import './index-2dc281eb.js';

const marketModalPartialCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}@keyframes market-popup{from{opacity:0%;transform:scale(0.9, 0.9)}to{opacity:100%;transform:scale(1, 1)}}@keyframes market-popdown{from{opacity:100%;transform:scale(1, 1)}to{opacity:0%;transform:scale(0.9, 0.9)}}@keyframes market-slideup{from{opacity:0%;transform:translateY(80vh)}to{opacity:100%;transform:translateY(0)}}@keyframes market-slidedown{from{opacity:100%;transform:translateY(0)}to{opacity:0%;transform:translateY(80vh)}}@keyframes market-slide-left-enter{from{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes market-slide-left-exit{from{transform:translateX(0)}to{transform:translateX(100%)}}@keyframes market-fade-in{from{opacity:0%}to{opacity:100%}}@keyframes market-fade-out{from{opacity:100%}to{opacity:0%}}@keyframes market-input-autofill-start{from{}to{}}@keyframes market-input-autofill-cancel{from{}to{}}@keyframes market-input-search-compact-enter{from{}to{}}@keyframes market-input-search-compact-exit{from{}to{}}:host{display:flex;flex-direction:column;justify-content:stretch;overflow:hidden}:host ::slotted(main),:host ::slotted(.main){flex:0 1 100%;overflow-y:auto;height:100%}:host ::slotted(.market-header){margin-bottom:var(--core-metrics-spacing-300);padding-top:0}:host ::slotted(.market-footer){padding-bottom:0}:host{position:absolute;top:0;left:0;width:100%;height:100%;padding-top:var(--modal-full-vertical-padding-size);padding-bottom:var(--modal-full-vertical-padding-size);background-color:var(--modal-full-background-color);animation:var(--modal-full-animation-enter-transition-duration)\n    market-slideup\n    forwards\n    var(--modal-full-animation-enter-transition-easing)}:host ::slotted(*){padding-right:var(--modal-full-horizontal-padding-size);padding-left:var(--modal-full-horizontal-padding-size)}:host([hidden]){animation-name:market-slidedown;animation-duration:var(--modal-full-animation-exit-transition-duration);animation-timing-function:var(--modal-full-animation-exit-transition-easing)}@media (min-width: 800px){:host{top:0;left:auto;width:var(--modal-partial-width);height:auto;max-height:calc(100vh - var(--modal-partial-vertical-screen-buffer-size) * 2);padding-top:var(--modal-partial-vertical-padding-size);padding-bottom:var(--modal-partial-vertical-padding-size);border-radius:var(--modal-partial-border-radius);animation:var(--modal-partial-animation-enter-transition-duration)\n      market-popup\n      forwards\n      var(--modal-partial-animation-enter-transition-easing)}:host ::slotted(*){padding-right:var(--modal-partial-horizontal-padding-size);padding-left:var(--modal-partial-horizontal-padding-size)}:host([hidden]){animation-name:market-popdown;animation-duration:var(--modal-partial-animation-exit-transition-duration);animation-timing-function:var(--modal-partial-animation-exit-transition-easing)}}";
const MarketModalPartialStyle0 = marketModalPartialCss;

const MarketModalPartial = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketDialogLoaded = createEvent(this, "marketDialogLoaded", 7);
        this.marketDialogDismissed = createEvent(this, "marketDialogDismissed", 7);
        this.marketDialogDidDismiss = createEvent(this, "marketDialogDidDismiss", 7);
        this.type = 'modal-partial';
        this.hidden = false;
        this.dialogID = undefined;
        this.index = undefined;
        this.trapFocus = false;
        this.animationEnterDuration = cjs.MODAL_PARTIAL_ANIMATION_ENTER_TRANSITION_DURATION;
        this.animationExitDuration = cjs.MODAL_PARTIAL_ANIMATION_EXIT_TRANSITION_DURATION;
    }
    /**
     * Listen to the headerNavigate event emitted by a market-header child component
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
    /* The parent context will handle actually removing elements from the DOM,
    All the modal needs to do it emit an event so actually closing it can be
    some other elements problem */
    /**
     * Emits the dismiss event
     * The parent context will handle actually removing elements from the DOM,
     * All the modal needs to do it emit an event so actually closing it can be
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
                el: this.el,
                options,
                activateOptions,
            });
        }
        return Promise.resolve();
    }
    /**
     * Deactivates the focus trap
     *
     * @param {FocusTrapDeactivateOptions} [deactivateOptions] set options for [onDeactivate, onPostDeactivate, and checkCanReturnFocus](https://github.com/focus-trap/focus-trap#trapdeactivate)
     */
    deactivateFocusTrap(deactivateOptions = {}) {
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
    connectedCallback() {
        this.connectedCallbackTimeout = setTimeout(() => {
            /**
             * Emit a dialogLoaded event when the component connects. Need this so
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
    }
    componentWillLoad() {
        setupDialogCompactHandler(this.el);
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
        return (h(Host, { key: '3230415c4df282cc7e8d956fffdb01cdff152372', class: "market-modal-partial", role: "dialog" }, h("slot", { key: 'd028733389b598ad8db15899e92a589ce3010cff' })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "trapFocus": ["onTrapFocusChanged"]
    }; }
};
MarketModalPartial.style = MarketModalPartialStyle0;

export { MarketModalPartial as market_modal_partial };

//# sourceMappingURL=market-modal-partial.entry.js.map