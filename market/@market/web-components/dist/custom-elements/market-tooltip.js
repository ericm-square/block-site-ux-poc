import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';

const marketTooltipCss = ":host{display:inline-block}:host .market-dropdown{padding-bottom:0}:host .market-dropdown .trigger-tap-target{display:flex;justify-content:center;align-items:center;min-width:var(--tooltip-minimum-width);min-height:var(--tooltip-minimum-height)}:host svg,:host ::slotted(svg[slot=\"trigger\"]){fill:var(--tooltip-trigger-icon-normal-state-color);transition:fill\n      var(\n        --tooltip-animation-move-transition-duration,\n        0.3s\n      )\n      ease-out}:host ::slotted([slot=\"trigger\"]:not(svg)){color:var(--tooltip-trigger-text-normal-state-color);transition:color\n      border-bottom\n      var(\n        --tooltip-trigger-animation-fade-transition-duration,\n        0.3s\n      )\n      ease-out;text-decoration-line:underline;text-decoration-style:dashed;text-decoration-color:var(--tooltip-trigger-text-normal-state-color);text-decoration-thickness:var(--tooltip-trigger-text-underline-size);text-underline-position:under;text-underline-offset:2px;}:host([aria-expanded]) svg,:host([aria-expanded]) ::slotted(svg[slot=\"trigger\"]){fill:var(--tooltip-trigger-icon-active-state-color)}:host([aria-expanded]) ::slotted([slot=\"trigger\"]:not(svg)){color:var(--tooltip-trigger-text-active-state-color);text-decoration-color:var(--tooltip-trigger-text-active-state-color)}:host([disabled]) svg,:host([disabled]) ::slotted(svg[slot=\"trigger\"]){fill:var(--tooltip-trigger-icon-disabled-state-color)}:host([disabled]) ::slotted([slot=\"trigger\"]:not(svg)){color:var(--tooltip-trigger-text-disabled-state-color);text-decoration-color:var(--tooltip-trigger-text-disabled-state-color)}:host aside{max-width:var(--tooltip-maximum-width);padding:var(--tooltip-padding-vertical-size) var(--tooltip-padding-horizontal-size);border-radius:var(--tooltip-radius);background-color:var(--tooltip-background-color);color:var(--tooltip-text-color);box-shadow:var(--elevation-30-shadow);font-weight:var(--tooltip-text-weight);font-size:var(--tooltip-text-size);line-height:var(--tooltip-text-leading);letter-spacing:var(--tooltip-text-tracking);text-transform:var(--tooltip-text-case)}";
const MarketTooltipStyle0 = marketTooltipCss;

const MarketTooltip$1 = /*@__PURE__*/ proxyCustomElement(class MarketTooltip extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketTooltipOpened = createEvent(this, "marketTooltipOpened", 7);
        this.marketTooltipClosed = createEvent(this, "marketTooltipClosed", 7);
        this.interaction = 'hover';
        this.disabled = false;
        this.popoverPlacement = 'bottom';
        this.popoverStrategy = 'absolute';
        this.popoverSkidding = undefined;
        this.popoverDistance = 0;
        this.expanded = false;
    }
    dropdownOpenedEventHandler(e) {
        if (e.target !== this.el)
            return;
        this.expanded = true;
        this.marketTooltipOpened.emit();
    }
    dropdownClosedEventHandler(e) {
        if (e.target !== this.el)
            return;
        this.expanded = false;
        this.marketTooltipClosed.emit();
    }
    /**
     * Opens the tooltip
     */
    openTooltip() {
        return this.innerDropdown.openDropdown();
    }
    /**
     * Closes the tooltip
     */
    closeTooltip() {
        return this.innerDropdown.closeDropdown();
    }
    styleLinks() {
        // since it isn't possible to style slotted child elements, we need to add
        // inline styles to slotted links in order to style them correctly
        // https://github.com/WICG/webcomponents/issues/594
        // https://github.com/WICG/webcomponents/issues/331
        var _a;
        const slottedLinks = (_a = [...this.el.children]
            .find((child) => child.slot === 'content')) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`a, ${getNamespacedTagFor('market-link')}`);
        slottedLinks.forEach((link) => {
            link.style.color = 'var(--tooltip-link-color)';
            link.style.fontSize = 'var(--tooltip-link-size)';
            link.style.fontWeight = 'var(--tooltip-link-weight)';
            link.style.lineHeight = 'var(--tooltip-link-leading)';
            link.style.letterSpacing = 'var(--tooltip-link-tracking)';
            link.style.textTransform = 'var(--tooltip-link-case)';
            link.style.textDecoration = 'none';
        });
    }
    componentWillRender() {
        this.styleLinks();
    }
    render() {
        const MarketDropdownTagName = getNamespacedTagFor('market-dropdown');
        return (h(Host, { key: '0e12f461ff0600e9e2cc8834e60ca40c9a0fe22c', "aria-expanded": this.expanded, class: "market-tooltip" }, h(MarketDropdownTagName, { key: 'e341826a86a06bc913f13dac950b73222f171055', interaction: this.interaction, "popover-placement": this.popoverPlacement, "popover-strategy": this.popoverStrategy, "popover-distance": this.popoverDistance, "popover-skidding": this.popoverSkidding, disabled: this.disabled, "aria-expanded": this.expanded, part: "dropdown", ref: (el) => (this.innerDropdown = el) }, h("div", { key: '32040d64d0bc3d7b6ba307bf33345b62603728bf', slot: "trigger", part: "trigger", class: "trigger-tap-target" }, h("slot", { key: '8c38a213e0df82c40722fcd9397605904b0b4ca0', name: "trigger" }, h("svg", { key: '64b67d47579f65e4895c266f95610e5ac6133de3', width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '5b6b8cc068c12a938fdb9bc1f83884edd6dbec2b', "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9 0C4.04 0 0 4.04 0 9C0 13.96 4.04 18 9 18C13.96 18 18 13.96 18 9C18 4.04 13.96 0 9 0ZM9 16C5.14 16 2 12.86 2 9C2 5.14 5.14 2 9 2C12.86 2 16 5.14 16 9C16 12.86 12.86 16 9 16ZM8 7.5V14H10V7.5H8ZM10.25 5.25C10.25 5.94036 9.69036 6.5 9 6.5C8.30964 6.5 7.75 5.94036 7.75 5.25C7.75 4.55964 8.30964 4 9 4C9.69036 4 10.25 4.55964 10.25 5.25Z" })))), h("aside", { key: 'a7b7504162d6d667d7363fdafec7ac9dc3fcac55', slot: "popover", part: "popover" }, h("slot", { key: '4c85381d41b0c8ea63cfc3678c3be2b6e68c05bc', name: "content", onSlotchange: () => this.styleLinks() })))));
    }
    get el() { return this; }
    static get style() { return MarketTooltipStyle0; }
}, [1, "market-tooltip", {
        "interaction": [1],
        "disabled": [516],
        "popoverPlacement": [1, "popover-placement"],
        "popoverStrategy": [1, "popover-strategy"],
        "popoverSkidding": [2, "popover-skidding"],
        "popoverDistance": [2, "popover-distance"],
        "expanded": [516],
        "openTooltip": [64],
        "closeTooltip": [64]
    }, [[0, "marketDropdownOpened", "dropdownOpenedEventHandler"], [0, "marketDropdownClosed", "dropdownClosedEventHandler"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "market-tooltip":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketTooltip$1);
            }
            break;
    } });
}

const MarketTooltip = MarketTooltip$1;
const defineCustomElement = defineCustomElement$1;

export { MarketTooltip, defineCustomElement };

//# sourceMappingURL=market-tooltip.js.map