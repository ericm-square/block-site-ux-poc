import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const marketToasterCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{position:fixed;right:0;bottom:0;left:0;z-index:1010;padding:0 0 var(--toast-bottom-margin, 24px);pointer-events:none}:host ::slotted(.market-toast){width:calc(100% - var(--toast-horizontal-margin, 16px) * 2);margin:var(--toast-vertical-spacing, 16px) auto 0;pointer-events:auto}:host ::slotted(.use-transitions){position:absolute;top:100%;left:50%;margin:0;transition:transform var(--toast-animation-transition-duration, 200ms) ease-in-out;transform:translate(-50%, 0)}";
const MarketToasterStyle0 = marketToasterCss;

// TODO(UI-1153): add design tokens for these
const TOAST_VERTICAL_SPACING = 16;
const TOAST_BOTTOM_MARGIN = 24;
const TOAST_ANIMATION_TRANSITION_DURATION = 200;
const MarketToaster$1 = /*@__PURE__*/ proxyCustomElement(class MarketToaster extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
    get el() { return this; }
    static get style() { return MarketToasterStyle0; }
}, [1, "market-toaster", {
        "show": [64],
        "hide": [64],
        "removeAll": [64]
    }, [[0, "marketToastAutoDismissed", "toastAutoDismissedEventHandler"], [0, "marketToastManuallyDismissed", "toastManuallyDismissedEventHandler"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-toaster"];
    components.forEach(tagName => { switch (tagName) {
        case "market-toaster":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketToaster$1);
            }
            break;
    } });
}

const MarketToaster = MarketToaster$1;
const defineCustomElement = defineCustomElement$1;

export { MarketToaster, defineCustomElement };

//# sourceMappingURL=market-toaster.js.map