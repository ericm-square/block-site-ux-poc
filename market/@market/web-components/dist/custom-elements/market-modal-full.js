import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as cjs } from './index3.js';
import { g as getDialogSelector, s as setupDialogCompactHandler } from './dialog.js';
import { c as createAndActivateFocusTrap } from './focus-trap.js';
import { g as getNamespacedTagFor } from './index2.js';

const marketModalFullCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}@keyframes market-popup{from{opacity:0%;transform:scale(0.9, 0.9)}to{opacity:100%;transform:scale(1, 1)}}@keyframes market-popdown{from{opacity:100%;transform:scale(1, 1)}to{opacity:0%;transform:scale(0.9, 0.9)}}@keyframes market-slideup{from{opacity:0%;transform:translateY(80vh)}to{opacity:100%;transform:translateY(0)}}@keyframes market-slidedown{from{opacity:100%;transform:translateY(0)}to{opacity:0%;transform:translateY(80vh)}}@keyframes market-slide-left-enter{from{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes market-slide-left-exit{from{transform:translateX(0)}to{transform:translateX(100%)}}@keyframes market-fade-in{from{opacity:0%}to{opacity:100%}}@keyframes market-fade-out{from{opacity:100%}to{opacity:0%}}@keyframes market-input-autofill-start{from{}to{}}@keyframes market-input-autofill-cancel{from{}to{}}@keyframes market-input-search-compact-enter{from{}to{}}@keyframes market-input-search-compact-exit{from{}to{}}:host{display:flex;flex-direction:column;justify-content:stretch;overflow:hidden}:host ::slotted(main),:host ::slotted(.main){flex:0 1 100%;overflow-y:auto;height:100%}:host ::slotted(.market-header){margin-bottom:var(--core-metrics-spacing-300);padding-top:0}:host ::slotted(.market-footer){padding-bottom:0}:host{position:absolute;top:0;left:0;width:100%;height:100%;padding-top:var(--modal-full-vertical-padding-size);padding-bottom:var(--modal-full-vertical-padding-size);background-color:var(--modal-full-background-color);animation:var(--modal-full-animation-enter-transition-duration)\n    market-slideup\n    forwards\n    var(--modal-full-animation-enter-transition-easing)}:host ::slotted(*){padding-right:var(--modal-full-horizontal-padding-size);padding-left:var(--modal-full-horizontal-padding-size)}:host([hidden]){animation-name:market-slidedown;animation-duration:var(--modal-full-animation-exit-transition-duration);animation-timing-function:var(--modal-full-animation-exit-transition-easing)}:host{--modal-full-wide-layout-width:1200px;--regular-modal-main-horizontal-padding:calc((100vw - var(--modal-full-fixed-layout-width)) / 2);--wide-modal-main-horizontal-padding:calc((100vw - var(--modal-full-wide-layout-width)) / 2)}@media (min-width: 648px){:host([layout=\"regular\"])>:not(.market-header,.market-footer),:host([layout=\"regular\"]) ::slotted(main),:host([layout=\"regular\"]) ::slotted(.main){padding:0 var(--regular-modal-main-horizontal-padding)}}@media (min-width: 1280px){:host([layout=\"wide\"])>:not(.market-header,.market-footer),:host([layout=\"wide\"]) ::slotted(main),:host([layout=\"wide\"]) ::slotted(.main){padding:0 var(--wide-modal-main-horizontal-padding)}}";
const MarketModalFullStyle0 = marketModalFullCss;

const MarketModalFull$1 = /*@__PURE__*/ proxyCustomElement(class MarketModalFull extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketDialogLoaded = createEvent(this, "marketDialogLoaded", 7);
        this.marketDialogDismissed = createEvent(this, "marketDialogDismissed", 7);
        this.marketDialogDidDismiss = createEvent(this, "marketDialogDidDismiss", 7);
        this.type = 'modal-full';
        this.hidden = false;
        this.dialogID = undefined;
        this.index = undefined;
        this.layout = 'regular';
        this.trapFocus = false;
        this.animationEnterDuration = cjs.MODAL_FULL_ANIMATION_ENTER_TRANSITION_DURATION;
        this.animationExitDuration = cjs.MODAL_FULL_ANIMATION_EXIT_TRANSITION_DURATION;
    }
    layoutWatcher() {
        this.repositionHeader();
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
     *  Repositions header inside of market-header to align with modal content */
    repositionHeader() {
        // since it isn't possible to style slotted child elements, we need to add
        // classes to the slotted header to apply needed styles to its shadow DOM.
        const slottedHeader = this.el.querySelector(getNamespacedTagFor('market-header'));
        if (slottedHeader) {
            slottedHeader.classList.remove('regular', 'wide');
            switch (this.layout) {
                case 'regular':
                    slottedHeader.classList.add('regular');
                    break;
                case 'wide':
                    slottedHeader.classList.add('wide');
                    break;
            }
        }
    }
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
        return (h(Host, { key: '53ab9cd6782b0337c4b49d8ed8547ff697737017', class: "market-modal-full", role: "dialog" }, h("slot", { key: '31f2fa16cdfca98bda559b3ae777a73120acbc38', onSlotchange: () => this.repositionHeader() })));
    }
    get el() { return this; }
    static get watchers() { return {
        "layout": ["layoutWatcher"],
        "trapFocus": ["onTrapFocusChanged"]
    }; }
    static get style() { return MarketModalFullStyle0; }
}, [1, "market-modal-full", {
        "hidden": [1540],
        "dialogID": [513, "data-dialog-id"],
        "index": [514, "data-dialog-index"],
        "layout": [513],
        "trapFocus": [1028, "trap-focus"],
        "animationEnterDuration": [2, "animation-enter-duration"],
        "animationExitDuration": [2, "animation-exit-duration"],
        "dismiss": [64],
        "activateFocusTrap": [64],
        "deactivateFocusTrap": [64]
    }, [[0, "marketHeaderNavigate", "headerNavigateEventHandler"]], {
        "layout": ["layoutWatcher"],
        "trapFocus": ["onTrapFocusChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-modal-full"];
    components.forEach(tagName => { switch (tagName) {
        case "market-modal-full":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketModalFull$1);
            }
            break;
    } });
}

const MarketModalFull = MarketModalFull$1;
const defineCustomElement = defineCustomElement$1;

export { MarketModalFull, defineCustomElement };

//# sourceMappingURL=market-modal-full.js.map