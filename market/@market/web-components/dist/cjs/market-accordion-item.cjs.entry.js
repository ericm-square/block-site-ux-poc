'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const index$1 = require('./index-305c3fd5.js');
const index$2 = require('./index-254d04f0.js');

const marketAccordionItemCss = ":host{display:block;box-shadow:inset\n    0\n    calc(var(--accordion-heading-30-variant-separator-size) * -1)\n    0\n    var(--accordion-heading-30-variant-separator-color)}button{all:unset;display:flex;justify-content:space-between;align-items:center;width:100%;color:var(--accordion-normal-state-content-color);cursor:pointer}button:focus-visible{outline:var(--core-focus-ring-border-size) solid var(--core-focus-ring-color)}button:hover{color:var(--accordion-hover-state-content-color)}button:active{color:var(--accordion-pressed-state-content-color)}:host([disabled]) button{color:var(--accordion-disabled-state-content-color);cursor:not-allowed;pointer-events:none}.market-icon{transition-duration:300ms}:host([expanded]) .market-icon{transform:rotate(-180deg)}h2{margin:0;font-weight:var(--accordion-heading-30-variant-text-weight);font-size:var(--accordion-heading-30-variant-text-size);font-family:var(--accordion-heading-30-variant-text-font-family)}h2 button{padding:var(--accordion-heading-30-variant-vertical-padding)\n      var(--accordion-heading-30-variant-horizontal-padding)}h2+.accordion-content{padding-bottom:var(--accordion-heading-30-variant-vertical-padding)}h2 .market-icon{width:var(--accordion-heading-30-variant-expanded-phase-icon-width);height:var(--accordion-heading-30-variant-expanded-phase-icon-height)}h3{margin:0;font-weight:var(--accordion-heading-20-variant-text-weight);font-size:var(--accordion-heading-20-variant-text-size);font-family:var(--accordion-heading-20-variant-text-font-family)}h3 button{padding:var(--accordion-heading-20-variant-vertical-padding)\n      var(--accordion-heading-20-variant-horizontal-padding)}h3+.accordion-content{padding-bottom:var(--accordion-heading-20-variant-vertical-padding)}h3 .market-icon{width:var(--accordion-heading-20-variant-expanded-phase-icon-width);height:var(--accordion-heading-20-variant-expanded-phase-icon-height)}h4{margin:0;font-weight:var(--accordion-heading-10-variant-text-weight);font-size:var(--accordion-heading-10-variant-text-size);font-family:var(--accordion-heading-10-variant-text-font-family)}h4 button{padding:var(--accordion-heading-10-variant-vertical-padding)\n      var(--accordion-heading-10-variant-horizontal-padding)}h4+.accordion-content{padding-bottom:var(--accordion-heading-10-variant-vertical-padding)}h4 .market-icon{width:var(--accordion-heading-10-variant-expanded-phase-icon-width);height:var(--accordion-heading-10-variant-expanded-phase-icon-height)}:host([size=\"medium\"]) svg{width:20px;height:20px}:host([size=\"small\"]) svg{width:16px;height:16px}";
const MarketAccordionItemStyle0 = marketAccordionItemCss;

const sizeToHeadingType = {
    large: '2',
    medium: '3',
    small: '4',
};
const MarketAccordionItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketAccordionItemExpandedChange = index.createEvent(this, "marketAccordionItemExpandedChange", 7);
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
                return index$1.cjs.ACCORDION_HEADING_10_VARIANT_EXPANDED_PHASE_ICON_ASSET;
            case 'large':
                return index$1.cjs.ACCORDION_HEADING_30_VARIANT_EXPANDED_PHASE_ICON_ASSET;
            default: // medium
                return index$1.cjs.ACCORDION_HEADING_20_VARIANT_EXPANDED_PHASE_ICON_ASSET;
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
        const MarketIconTagName = index$2.getNamespacedTagFor('market-icon');
        return (index.h(index.Host, { key: '9bf53527577d02430c7a2e71fcdcd1e9f46002f8', class: "market-accordion-item" }, this.customTrigger ? (index.h("slot", { name: "custom-trigger" })) : (index.h(Heading, null, index.h("button", { id: `${this.name}__button`, type: "button", "aria-expanded": this.expanded, "aria-controls": `${this.name}__content`, "aria-disabled": this.disabled, disabled: this.disabled, onClick: () => this.setExpanded(!this.expanded) }, index.h("slot", { name: "label" }), index.h(MarketIconTagName, { name: this.getAccordionIcon() })))), this.expanded && (index.h("div", { key: '698e4a519769aab483d1d273221a92b310f32d27', id: `${this.name}__content`, class: "accordion-content", role: "region", "aria-labelledby": `${this.name}__button` }, index.h("slot", { key: '65b7d758f1ee1fda7e3355a35a2dd9b465655265' })))));
    }
    get el() { return index.getElement(this); }
};
MarketAccordionItem.style = MarketAccordionItemStyle0;

exports.market_accordion_item = MarketAccordionItem;

//# sourceMappingURL=market-accordion-item.cjs.entry.js.map