import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';

const marketTabCss = ":host([size=\"large\"]){font-weight:var(--core-type-heading-30-weight);font-size:var(--core-type-heading-30-size);font-family:var(--core-type-heading-30-font-family);line-height:var(--core-type-heading-30-leading);letter-spacing:var(--core-type-heading-30-tracking);text-transform:var(--core-type-heading-30-case)}:host(:not([size])),:host([size=\"medium\"]){font-weight:var(--core-type-heading-20-weight);font-size:var(--core-type-heading-20-size);font-family:var(--core-type-heading-20-font-family);line-height:var(--core-type-heading-20-leading);letter-spacing:var(--core-type-heading-20-tracking);text-transform:var(--core-type-heading-20-case)}:host([size=\"small\"]){font-weight:var(--core-type-medium-20-weight);font-size:var(--core-type-medium-20-size);font-family:var(--core-type-medium-20-font-family);line-height:var(--core-type-medium-20-leading);letter-spacing:var(--core-type-medium-20-tracking);text-transform:var(--core-type-medium-20-case)}:host{color:var(--tabs-tab-text-color, var(--core-text-20-color))}:host [part=\"button\"]{position:relative;border:0;background:none;color:inherit;font-weight:inherit;font-size:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;text-transform:inherit;cursor:pointer;transition:color\n    var(--core-animation-enter-transition-fast-speed-duration)\n    var(--core-animation-enter-transition-easing)}:host [part=\"button\"]::after{content:\"\";position:absolute;bottom:0;left:0;width:100%;height:0;border-radius:var(--tabs-tab-bottom-border-border-radius-top-left, var(--core-metrics-spacing-25))\n      var(--tabs-tab-bottom-border-border-radius-top-right, var(--core-metrics-spacing-25))\n      var(--tabs-tab-bottom-border-border-radius-bottom-right, 0)\n      var(--tabs-tab-bottom-border-border-radius-bottom-left, 0);background:var(--tabs-tab-bottom-border-background-color, var(--core-text-10-color));transition:height\n      var(--core-animation-enter-transition-fast-speed-duration)\n      var(--core-animation-enter-transition-easing),\n      background\n      var(--core-animation-enter-transition-fast-speed-duration)\n      var(--core-animation-enter-transition-easing)}:host(:hover),:host(:active){color:var(--tabs-tab-hover-state-text-color, var(--core-emphasis-text-color));transition:color\n    var(--core-animation-exit-transition-fast-speed-duration)\n    var(--core-animation-exit-transition-easing)}@media (-webkit-device-pixel-ratio: 1){:host [part=\"button\"]::after{border-radius:0}}:host([size=\"small\"]) [part=\"button\"]{padding:var(--tabs-tab-small-size-top-padding-size, 4px)\n      0\n      var(--tabs-tab-small-size-bottom-padding-size, 10px)}:host(:not([size])) [part=\"button\"],:host([size=\"medium\"]) [part=\"button\"]{padding:var(--tabs-tab-medium-size-top-padding-size, 4px)\n      0\n      var(--tabs-tab-medium-size-bottom-padding-size, 10px)}:host([size=\"large\"]) [part=\"button\"]{padding:var(--tabs-tab-large-size-top-padding-size, 4px)\n      0\n      var(--tabs-tab-large-size-bottom-padding-size, 12px)}:host([selected]){color:var(--tabs-tab-selected-text-color, var(--core-text-10-color))}:host([selected]) [part=\"button\"]::after{height:var(--tabs-tab-selected-bottom-border-height, var(--core-metrics-spacing-25))}:host([selected]):hover{color:var(--tabs-tab-hover-state-selected-text-color, var(--core-text-10-color))}:host([selected]):active{color:var(--tabs-tab-active-state-selected-text-color, var(--core-emphasis-text-color))}:host([selected]):active [part=\"button\"]::after{background:var(--tabs-tab-active-state-bottom-border-background-color, var(--core-emphasis-text-color))}:host([disabled]){color:var(--tabs-tab-disabled-state-text-color, var(--core-text-30-color))}:host([disabled]):hover{color:var(--tabs-tab-disabled-state-text-color, var(--core-text-30-color))}:host([disabled]) [part=\"button\"]{cursor:not-allowed}";
const MarketTabStyle0 = marketTabCss;

const MarketTab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketTabSelectedChanged = createEvent(this, "marketTabSelectedChanged", 7);
        this.disabled = false;
        this.size = 'medium';
        this.selected = false;
    }
    /**
     * Select the tab and emits a `marketTabSelectedChanged` event
     */
    select() {
        if (this.selected || this.disabled) {
            return Promise.resolve();
        }
        const { defaultPrevented } = this.marketTabSelectedChanged.emit({
            panelId: this.el.getAttribute('aria-controls'),
            prevValue: this.selected,
            tabId: this.el.id,
            value: true,
        });
        if (!defaultPrevented) {
            this.selected = true;
        }
        return Promise.resolve();
    }
    /**
     * Deselects the tab and emits a `marketTabSelectedChanged` event
     */
    deselect() {
        if (!this.selected) {
            return Promise.resolve();
        }
        const { defaultPrevented } = this.marketTabSelectedChanged.emit({
            panelId: this.el.getAttribute('aria-controls'),
            prevValue: this.selected,
            tabId: this.el.id,
            value: false,
        });
        if (!defaultPrevented) {
            this.selected = false;
        }
        return Promise.resolve();
    }
    disabledWatcher() {
        this.selected = false;
    }
    handleClick() {
        this.select();
    }
    handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // prevents scroll down when Space is pressed
            this.select();
        }
    }
    render() {
        return (h(Host, { key: '63c07a1172617ce4a15296229d059bc449de69cc', "aria-disabled": this.disabled.toString(), "aria-selected": this.selected.toString(), class: "market-tab", onClick: this.handleClick.bind(this), onKeydown: this.handleKeydown.bind(this), role: "tab", tabindex: "0" }, h("button", { key: 'be7240c4232ba41743c7274f2630563267055b5a', disabled: this.disabled, part: "button", ref: (el) => (this.buttonEl = el), tabindex: "-1" }, h("slot", { key: '8d4d35e1d14a52fb3e6d71805ab83eae31a83009' }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "disabled": ["disabledWatcher"]
    }; }
};
MarketTab.style = MarketTabStyle0;

export { MarketTab as market_tab };

//# sourceMappingURL=market-tab.entry.js.map