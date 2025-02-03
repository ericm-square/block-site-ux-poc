import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as cjs } from './index3.js';
import { g as getNamespacedTagFor } from './index2.js';

const marketAccordionItemCss = ":host{display:block;box-shadow:inset\n    0\n    calc(var(--accordion-heading-30-variant-separator-size) * -1)\n    0\n    var(--accordion-heading-30-variant-separator-color)}button{all:unset;display:flex;justify-content:space-between;align-items:center;width:100%;color:var(--accordion-normal-state-content-color);cursor:pointer}button:focus-visible{outline:var(--core-focus-ring-border-size) solid var(--core-focus-ring-color)}button:hover{color:var(--accordion-hover-state-content-color)}button:active{color:var(--accordion-pressed-state-content-color)}:host([disabled]) button{color:var(--accordion-disabled-state-content-color);cursor:not-allowed;pointer-events:none}.market-icon{transition-duration:300ms}:host([expanded]) .market-icon{transform:rotate(-180deg)}h2{margin:0;font-weight:var(--accordion-heading-30-variant-text-weight);font-size:var(--accordion-heading-30-variant-text-size);font-family:var(--accordion-heading-30-variant-text-font-family)}h2 button{padding:var(--accordion-heading-30-variant-vertical-padding)\n      var(--accordion-heading-30-variant-horizontal-padding)}h2+.accordion-content{padding-bottom:var(--accordion-heading-30-variant-vertical-padding)}h2 .market-icon{width:var(--accordion-heading-30-variant-expanded-phase-icon-width);height:var(--accordion-heading-30-variant-expanded-phase-icon-height)}h3{margin:0;font-weight:var(--accordion-heading-20-variant-text-weight);font-size:var(--accordion-heading-20-variant-text-size);font-family:var(--accordion-heading-20-variant-text-font-family)}h3 button{padding:var(--accordion-heading-20-variant-vertical-padding)\n      var(--accordion-heading-20-variant-horizontal-padding)}h3+.accordion-content{padding-bottom:var(--accordion-heading-20-variant-vertical-padding)}h3 .market-icon{width:var(--accordion-heading-20-variant-expanded-phase-icon-width);height:var(--accordion-heading-20-variant-expanded-phase-icon-height)}h4{margin:0;font-weight:var(--accordion-heading-10-variant-text-weight);font-size:var(--accordion-heading-10-variant-text-size);font-family:var(--accordion-heading-10-variant-text-font-family)}h4 button{padding:var(--accordion-heading-10-variant-vertical-padding)\n      var(--accordion-heading-10-variant-horizontal-padding)}h4+.accordion-content{padding-bottom:var(--accordion-heading-10-variant-vertical-padding)}h4 .market-icon{width:var(--accordion-heading-10-variant-expanded-phase-icon-width);height:var(--accordion-heading-10-variant-expanded-phase-icon-height)}:host([size=\"medium\"]) svg{width:20px;height:20px}:host([size=\"small\"]) svg{width:16px;height:16px}";
const MarketAccordionItemStyle0 = marketAccordionItemCss;

const sizeToHeadingType = {
    large: '2',
    medium: '3',
    small: '4',
};
const MarketAccordionItem$1 = /*@__PURE__*/ proxyCustomElement(class MarketAccordionItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketAccordionItemExpandedChange = createEvent(this, "marketAccordionItemExpandedChange", 7);
        this.name = undefined;
        this.expanded = false;
        this.disabled = false;
        this.size = 'medium';
        this.customTrigger = undefined;
    }
    marketAccordionToggleHandler(e) {
        e.stopPropagation();
        this.setExpanded(!this.expanded);
    }
    /**
     * Used to set the "open" state of the accordion.
     */
    setExpanded(newExpanded) {
        const oldExpanded = this.expanded;
        if (newExpanded !== oldExpanded) {
            const { defaultPrevented } = this.marketAccordionItemExpandedChange.emit({
                expanded: newExpanded,
            });
            if (!defaultPrevented) {
                this.expanded = newExpanded;
                if (this.customTrigger) {
                    this.customTrigger.expanded = newExpanded;
                }
            }
        }
        return Promise.resolve();
    }
    /**
     * Sets `disabled` state. Allows external elements to programmatically trigger disabled styling.
     */
    setDisabled(value) {
        this.disabled = value;
        return Promise.resolve();
    }
    getAccordionIcon() {
        switch (this.size) {
            case 'small':
                return cjs.ACCORDION_HEADING_10_VARIANT_EXPANDED_PHASE_ICON_ASSET;
            case 'large':
                return cjs.ACCORDION_HEADING_30_VARIANT_EXPANDED_PHASE_ICON_ASSET;
            default: // medium
                return cjs.ACCORDION_HEADING_20_VARIANT_EXPANDED_PHASE_ICON_ASSET;
        }
    }
    componentWillLoad() {
        this.customTrigger = this.el.querySelector('[slot="custom-trigger"]');
        if (this.customTrigger) {
            this.customTrigger.expanded = this.expanded;
        }
    }
    render() {
        const Heading = `h${sizeToHeadingType[this.size]}`;
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        return (h(Host, { key: '9bf53527577d02430c7a2e71fcdcd1e9f46002f8', class: "market-accordion-item" }, this.customTrigger ? (h("slot", { name: "custom-trigger" })) : (h(Heading, null, h("button", { id: `${this.name}__button`, type: "button", "aria-expanded": this.expanded, "aria-controls": `${this.name}__content`, "aria-disabled": this.disabled, disabled: this.disabled, onClick: () => this.setExpanded(!this.expanded) }, h("slot", { name: "label" }), h(MarketIconTagName, { name: this.getAccordionIcon() })))), this.expanded && (h("div", { key: '698e4a519769aab483d1d273221a92b310f32d27', id: `${this.name}__content`, class: "accordion-content", role: "region", "aria-labelledby": `${this.name}__button` }, h("slot", { key: '65b7d758f1ee1fda7e3355a35a2dd9b465655265' })))));
    }
    get el() { return this; }
    static get style() { return MarketAccordionItemStyle0; }
}, [1, "market-accordion-item", {
        "name": [513],
        "expanded": [1540],
        "disabled": [1540],
        "size": [513],
        "customTrigger": [32],
        "setExpanded": [64],
        "setDisabled": [64]
    }, [[0, "marketAccordionToggled", "marketAccordionToggleHandler"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-accordion-item"];
    components.forEach(tagName => { switch (tagName) {
        case "market-accordion-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketAccordionItem$1);
            }
            break;
    } });
}

const MarketAccordionItem = MarketAccordionItem$1;
const defineCustomElement = defineCustomElement$1;

export { MarketAccordionItem, defineCustomElement };

//# sourceMappingURL=market-accordion-item.js.map