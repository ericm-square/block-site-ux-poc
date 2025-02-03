import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';

const marketPillCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:inline-flex;justify-content:center;align-items:center;border-radius:var(--pill-normal-size-corner-radius);white-space:nowrap}:host svg,:host ::slotted([slot=\"icon\"]){color:inherit;fill:currentcolor;stroke:inherit}:host([interactive]){cursor:pointer}:host([size=\"medium\"]){gap:var(--pill-normal-size-spacing-horizontal);padding:var(--pill-normal-size-padding-vertical-size) var(--pill-normal-size-padding-horizontal-size);font-weight:var(--pill-normal-size-text-weight);font-size:var(--pill-normal-size-text-size);line-height:var(--pill-normal-size-text-leading);letter-spacing:var(--pill-normal-size-text-tracking)}:host([size=\"small\"]){gap:var(--pill-compact-size-spacing-horizontal);padding:var(--pill-compact-size-padding-vertical-size) var(--pill-compact-size-padding-horizontal-size);font-weight:var(--pill-compact-size-text-weight);font-size:var(--pill-compact-size-text-size);line-height:var(--pill-compact-size-text-leading);letter-spacing:var(--pill-compact-size-text-tracking)}:host([variant=\"normal\"]){background-color:var(--pill-normal-variant-background-color);color:var(--pill-normal-variant-text-color)}:host([variant=\"emphasis\"]){background-color:var(--pill-emphasis-variant-background-color);color:var(--pill-emphasis-variant-text-color)}:host([variant=\"success\"]){background-color:var(--pill-success-variant-background-color);color:var(--pill-success-variant-text-color)}:host([variant=\"warning\"]){background-color:var(--pill-warning-variant-background-color);color:var(--pill-warning-variant-text-color)}:host([variant=\"critical\"]){background-color:var(--pill-critical-variant-background-color);color:var(--pill-critical-variant-text-color)}:host([variant=\"insight\"]){background-color:var(--pill-insight-variant-background-color);color:var(--pill-insight-variant-text-color)}:host([variant=\"alpha\"]){background-color:var(--pill-alpha-variant-background-color);color:var(--pill-alpha-variant-text-color)}:host([variant=\"beta\"]){background-color:var(--pill-beta-variant-background-color);color:var(--pill-beta-variant-text-color)}@media (hover: hover){:host([variant=\"normal\"][interactive]:hover){background-color:var(--pill-normal-variant-pressed-state-background-color)}:host([variant=\"emphasis\"][interactive]:hover){background-color:var(--pill-emphasis-variant-pressed-state-background-color)}:host([variant=\"success\"][interactive]:hover){background-color:var(--pill-success-variant-pressed-state-background-color)}:host([variant=\"warning\"][interactive]:hover){background-color:var(--pill-warning-variant-pressed-state-background-color)}:host([variant=\"critical\"][interactive]:hover){background-color:var(--pill-critical-variant-pressed-state-background-color)}:host([variant=\"insight\"][interactive]:hover){background-color:var(--pill-insight-variant-pressed-state-background-color)}:host([variant=\"alpha\"][interactive]:hover){background-color:var(--pill-alpha-variant-pressed-state-background-color)}:host([variant=\"beta\"][interactive]:hover){background-color:var(--pill-beta-variant-pressed-state-background-color)}}:host([variant=\"normal\"][interactive]:active){background-color:var(--pill-normal-variant-pressed-state-background-color)}:host([variant=\"emphasis\"][interactive]:active){background-color:var(--pill-emphasis-variant-pressed-state-background-color)}:host([variant=\"success\"][interactive]:active){background-color:var(--pill-success-variant-pressed-state-background-color)}:host([variant=\"warning\"][interactive]:active){background-color:var(--pill-warning-variant-pressed-state-background-color)}:host([variant=\"critical\"][interactive]:active){background-color:var(--pill-critical-variant-pressed-state-background-color)}:host([variant=\"insight\"][interactive]:active){background-color:var(--pill-insight-variant-pressed-state-background-color)}:host([variant=\"alpha\"][interactive]:active){background-color:var(--pill-alpha-variant-pressed-state-background-color)}:host([variant=\"beta\"][interactive]:active){background-color:var(--pill-beta-variant-pressed-state-background-color)}";
const MarketPillStyle0 = marketPillCss;

const MarketPill$1 = /*@__PURE__*/ proxyCustomElement(class MarketPill extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.variant = 'normal';
        this.size = 'medium';
        this.indicator = false;
        this.interactive = false;
    }
    renderIndicator() {
        const MarketAccessoryTag = getNamespacedTagFor('market-accessory');
        return this.size === 'medium' ? (h(MarketAccessoryTag, null, h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("circle", { cx: "8", cy: "8", r: "5" })))) : (h(MarketAccessoryTag, null, h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("circle", { cx: "8", cy: "8", r: "4" }))));
    }
    render() {
        return (h(Host, { key: 'e96bb6d40d9226db752a3934a88d04b5c5aa0cac', class: "market-pill" }, h("slot", { key: 'b1116a3e6fe9360b141f98c69c376ec2aea519f8', name: "icon" }, this.indicator && this.renderIndicator()), h("slot", { key: '4b50c149d4029c6847887127815d6146ce32a380' })));
    }
    static get style() { return MarketPillStyle0; }
}, [1, "market-pill", {
        "variant": [513],
        "size": [513],
        "indicator": [516],
        "interactive": [516]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-pill"];
    components.forEach(tagName => { switch (tagName) {
        case "market-pill":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketPill$1);
            }
            break;
    } });
}

const MarketPill = MarketPill$1;
const defineCustomElement = defineCustomElement$1;

export { MarketPill, defineCustomElement };

//# sourceMappingURL=market-pill.js.map