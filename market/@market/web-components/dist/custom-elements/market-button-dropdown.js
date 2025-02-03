import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { o as observeAriaAttributes, a as applyExpandableAriaControls } from './aria.js';
import { s as supportedDropdownTriggers } from './dropdown.js';
import { g as getNamespacedTagFor } from './index2.js';
import { v as v4 } from './v4.js';

const marketButtonDropdownCss = ":host{display:inline-block}market-dropdown,.market-dropdown{width:100%}svg{fill:transparent}";
const MarketButtonDropdownStyle0 = marketButtonDropdownCss;

/**
 * Type guard to check if the supported trigger element is a `market-button`
 */
function isMarketButton(el) {
    return el.tagName.toLowerCase() === getNamespacedTagFor('market-button');
}
const MarketButtonDropdown$1 = /*@__PURE__*/ proxyCustomElement(class MarketButtonDropdown extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketButtonDropdownOpened = createEvent(this, "marketButtonDropdownOpened", 7);
        this.marketButtonDropdownClosed = createEvent(this, "marketButtonDropdownClosed", 7);
        this.onMutationObserved = (ariaAttributes) => {
            this.ariaAttributes = ariaAttributes;
        };
        this.interaction = 'click';
        this.disabled = false;
        this.noCaret = false;
        this.popoverPlacement = 'bottom-end';
        this.popoverStrategy = 'absolute';
        this.persistListSelections = false;
        this.dropdownIsActive = false;
        this.ariaAttributes = undefined;
    }
    dropdownOpenedEventHandler(e) {
        if (e.target !== this.el)
            return;
        this.dropdownIsActive = true;
        this.setCaret();
        this.marketButtonDropdownOpened.emit();
    }
    dropdownClosedEventHandler(e) {
        if (e.target !== this.el)
            return;
        this.dropdownIsActive = false;
        this.setCaret();
        this.marketButtonDropdownClosed.emit();
    }
    syncTriggerDisabledState() {
        if (this.slottedButton) {
            this.slottedButton.disabled = this.disabled;
        }
    }
    setCaret() {
        if (this.noCaret || !isMarketButton(this.slottedButton)) {
            return;
        }
        if (this.dropdownIsActive) {
            this.slottedButton.caret = 'up';
        }
        else {
            this.slottedButton.caret = 'down';
        }
    }
    registerTrigger() {
        this.slottedButton = this.el.querySelector(supportedDropdownTriggers.join(','));
        this.syncTriggerDisabledState();
        this.setCaret();
    }
    componentWillLoad() {
        this.mutationObserver = observeAriaAttributes(this.el, this.onMutationObserved);
    }
    componentWillRender() {
        const MarketListTagName = getNamespacedTagFor('market-list');
        const list = this.el.querySelector(MarketListTagName);
        const popoverContent = this.el.querySelector(`[slot="content"]`);
        if (list) {
            // We set this here even though market-popover also sets it,
            // because the slotted market-list's componentWillLoad hook
            // will fire before market-popover's, and we need it to be set
            // before the row processing that happens in that hook.
            list.interactive = true;
            list.transient = !this.persistListSelections;
        }
        if (this.slottedButton) {
            // Ensure popover has an ID and role for aria support
            if (!popoverContent.id) {
                popoverContent.id = `popover-${v4()}`;
            }
            // Persist aria attributes on the slotted button
            applyExpandableAriaControls(this.slottedButton, {
                expanded: this.dropdownIsActive.toString(),
                popoverId: popoverContent.id,
            });
        }
    }
    render() {
        const MarketDropdownTagName = getNamespacedTagFor('market-dropdown');
        const MarketPopoverTagName = getNamespacedTagFor('market-popover');
        return (h(Host, { key: '35a277377595acc3448cf6725c2026ef398df787', class: "market-button-dropdown" }, h(MarketDropdownTagName, { key: '706d03f37636b4a77ce2378279a85ecbbc563259', interaction: this.interaction, "popover-strategy": this.popoverStrategy, "popover-placement": this.popoverPlacement, disabled: this.disabled }, h("slot", { key: 'eb6a8ad8f2d20b110fea23dcca3f13ef4f888640', name: "trigger", slot: "trigger", onSlotchange: () => this.registerTrigger() }), h(MarketPopoverTagName, { key: '6eda9f25ab04d65c27fa96145fde542e040882c2', slot: "popover", part: "popover" }, h("slot", { key: '1a9a9e1e0fd8c895482d4a08e4d016530340e2cd', name: "content" })))));
    }
    get el() { return this; }
    static get watchers() { return {
        "disabled": ["syncTriggerDisabledState"]
    }; }
    static get style() { return MarketButtonDropdownStyle0; }
}, [1, "market-button-dropdown", {
        "interaction": [1],
        "disabled": [516],
        "noCaret": [4, "no-caret"],
        "popoverPlacement": [1, "popover-placement"],
        "popoverStrategy": [1, "popover-strategy"],
        "persistListSelections": [4, "persist-list"],
        "dropdownIsActive": [32],
        "ariaAttributes": [32]
    }, [[0, "marketDropdownOpened", "dropdownOpenedEventHandler"], [0, "marketDropdownClosed", "dropdownClosedEventHandler"]], {
        "disabled": ["syncTriggerDisabledState"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-button-dropdown"];
    components.forEach(tagName => { switch (tagName) {
        case "market-button-dropdown":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketButtonDropdown$1);
            }
            break;
    } });
}

const MarketButtonDropdown = MarketButtonDropdown$1;
const defineCustomElement = defineCustomElement$1;

export { MarketButtonDropdown, defineCustomElement };

//# sourceMappingURL=market-button-dropdown.js.map