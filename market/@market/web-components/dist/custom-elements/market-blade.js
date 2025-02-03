import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as cjs } from './index3.js';
import { g as getDialogSelector, s as setupDialogCompactHandler } from './dialog.js';
import { g as getNamespacedTagFor } from './index2.js';
import { c as createAndActivateFocusTrap } from './focus-trap.js';
import { c as classNames } from './classnames.js';

const marketBladeCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}@keyframes market-popup{from{opacity:0%;transform:scale(0.9, 0.9)}to{opacity:100%;transform:scale(1, 1)}}@keyframes market-popdown{from{opacity:100%;transform:scale(1, 1)}to{opacity:0%;transform:scale(0.9, 0.9)}}@keyframes market-slideup{from{opacity:0%;transform:translateY(80vh)}to{opacity:100%;transform:translateY(0)}}@keyframes market-slidedown{from{opacity:100%;transform:translateY(0)}to{opacity:0%;transform:translateY(80vh)}}@keyframes market-slide-left-enter{from{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes market-slide-left-exit{from{transform:translateX(0)}to{transform:translateX(100%)}}@keyframes market-fade-in{from{opacity:0%}to{opacity:100%}}@keyframes market-fade-out{from{opacity:100%}to{opacity:0%}}@keyframes market-input-autofill-start{from{}to{}}@keyframes market-input-autofill-cancel{from{}to{}}@keyframes market-input-search-compact-enter{from{}to{}}@keyframes market-input-search-compact-exit{from{}to{}}:host{display:flex;flex-direction:column;justify-content:stretch;overflow:hidden}:host ::slotted(main),:host ::slotted(.main){flex:0 1 100%;overflow-y:auto;height:100%}:host ::slotted(.market-header){margin-bottom:var(--core-metrics-spacing-300);padding-top:0}:host ::slotted(.market-footer){padding-bottom:0}:host{position:fixed;top:0;right:0;width:100%;max-width:var(--modal-blade-maximum-width-size);height:100vh;padding-top:var(--modal-blade-regular-vertical-size-class-vertical-padding);padding-bottom:var(--modal-blade-regular-vertical-size-class-vertical-padding);background-color:var(--modal-blade-background-color);box-shadow:var(--elevation-20-shadow);animation-name:market-slide-left-enter;animation-duration:var(\n      --blade-animation-enter-transition-duration,\n      var(--core-animation-enter-transition-moderate-speed-duration)\n    );animation-timing-function:var(\n      --blade-animation-enter-transition-easing,\n      var(--core-animation-enter-transition-easing)\n    );animation-fill-mode:forwards}:host ::slotted(*){padding-right:var(--modal-blade-regular-horizontal-size-class-horizontal-padding);padding-left:var(--modal-blade-regular-horizontal-size-class-horizontal-padding)}:host([hidden]){animation-name:market-slide-left-exit;animation-duration:var(\n        --blade-animation-exit-transition-duration,\n        var(--core-animation-exit-transition-moderate-speed-duration)\n      );animation-timing-function:var(\n        --blade-animation-exit-transition-easing,\n        var(--core-animation-exit-transition-easing)\n      )}:host([hidden].skip-animation){transform:translateX(100%);animation:none}@media only screen and (min-width: 1200px){:host{max-width:var(--modal-blade-wide-viewport-width-size);padding-top:var(--modal-blade-wide-viewport-padding-top-size);padding-bottom:var(--modal-blade-wide-viewport-padding-bottom-size)}::slotted(*){padding-right:var(--modal-blade-wide-viewport-padding-right-size);padding-left:var(--modal-blade-wide-viewport-padding-left-size)}}";
const MarketBladeStyle0 = marketBladeCss;

const MarketBlade$1 = /*@__PURE__*/ proxyCustomElement(class MarketBlade extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketDialogLoaded = createEvent(this, "marketDialogLoaded", 7);
        this.marketDialogDismissed = createEvent(this, "marketDialogDismissed", 7);
        this.marketDialogDidDismiss = createEvent(this, "marketDialogDidDismiss", 7);
        this.type = 'blade';
        /* Used to skip the exit animation for <market-blade hidden> on load */
        this.skipAnimation = false;
        this.hidden = false;
        this.dialogID = undefined;
        this.index = undefined;
        this.animationDuration = cjs.CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION;
        this.animationEnterDuration = cjs.CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION;
        this.animationExitDuration = cjs.CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION;
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
    get el() { return this; }
    static get watchers() { return {
        "hidden": ["reenableAnimation"],
        "trapFocus": ["onTrapFocusChanged"]
    }; }
    static get style() { return MarketBladeStyle0; }
}, [1, "market-blade", {
        "hidden": [1540],
        "dialogID": [513, "data-dialog-id"],
        "index": [514, "data-dialog-index"],
        "animationDuration": [2, "animation-duration"],
        "animationEnterDuration": [2, "animation-enter-duration"],
        "animationExitDuration": [2, "animation-exit-duration"],
        "trapFocus": [1028, "trap-focus"],
        "dismiss": [64],
        "activateFocusTrap": [64],
        "deactivateFocusTrap": [64]
    }, [[0, "marketHeaderNavigate", "headerNavigateEventHandler"]], {
        "hidden": ["reenableAnimation"],
        "trapFocus": ["onTrapFocusChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-blade"];
    components.forEach(tagName => { switch (tagName) {
        case "market-blade":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketBlade$1);
            }
            break;
    } });
}

const MarketBlade = MarketBlade$1;
const defineCustomElement = defineCustomElement$1;

export { MarketBlade, defineCustomElement };

//# sourceMappingURL=market-blade.js.map