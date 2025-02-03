import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const marketActivityIndicatorBarCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--activity-indicator-bar-height:4px;--activity-indicator-bar-border-radius:6px;--activity-indicator-bar-bar-color:var(--core-fill-40-color);--activity-indicator-bar-value-color:var(--core-emphasis-fill-color);display:block;height:var(--activity-indicator-bar-height)}progress{display:block;width:100%;height:100%;border:none;border-radius:var(--activity-indicator-bar-border-radius);background-color:var(--activity-indicator-bar-bar-color);-webkit-appearance:none;-moz-appearance:none;appearance:none}progress[value]::-webkit-progress-value{border-radius:var(--activity-indicator-bar-border-radius);background-color:var(--activity-indicator-bar-value-color)}progress[value]::-webkit-progress-bar,progress:not([value])::-webkit-progress-bar{border-radius:var(--activity-indicator-bar-border-radius);background-color:var(--activity-indicator-bar-bar-color)}progress[value]::-moz-progress-bar{border-radius:var(--activity-indicator-bar-border-radius);background-color:var(--activity-indicator-bar-value-color)}progress:not([value])::-moz-progress-bar{visibility:hidden}.progress-bar{width:100%;height:100%;border-radius:var(--activity-indicator-bar-border-radius);background-color:var(--activity-indicator-bar-bar-color)}.progress-bar>span{display:block;height:100%;border-radius:var(--activity-indicator-bar-border-radius);background-color:var(--activity-indicator-bar-value-color);text-indent:-9999px}";
const MarketActivityIndicatorBarStyle0 = marketActivityIndicatorBarCss;

const MarketActivityIndicatorBar$1 = /*@__PURE__*/ proxyCustomElement(class MarketActivityIndicatorBar extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.value = 0;
        this.max = 1;
    }
    render() {
        const max = this.max > 0 ? this.max : 1;
        const value = this.value > 0 ? Math.min(this.value, this.max) : 0;
        const percentComplete = (value / max) * 100;
        return (h(Host, { key: '2e9db0488c0dc203483e1e9e56e41959a8329b1d', class: "market-activity-indicator-bar", role: "progressbar", "aria-valuenow": value, "aria-valuemin": "0", "aria-valuemax": max, "aria-valuetext": `${percentComplete}%` }, h("progress", { key: '5dfd6befd05042fa11d9488f0f20ecd83cda9a5c', value: value, max: max }, h("div", { key: 'cb0711db187e63011f1c2d12c4297c470f131445', class: "progress-bar" }, h("span", { key: '164fa23663f68bb1058f457f57e878971709773a', style: { width: `${percentComplete}%` } })))));
    }
    get el() { return this; }
    static get style() { return MarketActivityIndicatorBarStyle0; }
}, [1, "market-activity-indicator-bar", {
        "value": [2],
        "max": [2]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-activity-indicator-bar"];
    components.forEach(tagName => { switch (tagName) {
        case "market-activity-indicator-bar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketActivityIndicatorBar$1);
            }
            break;
    } });
}

const MarketActivityIndicatorBar = MarketActivityIndicatorBar$1;
const defineCustomElement = defineCustomElement$1;

export { MarketActivityIndicatorBar, defineCustomElement };

//# sourceMappingURL=market-activity-indicator-bar.js.map