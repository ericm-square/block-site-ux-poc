'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const aria = require('./aria-c58bdf8b.js');
const dropdown = require('./dropdown-b9b27ed3.js');
const index$1 = require('./index-254d04f0.js');
const v4 = require('./v4-8e8d6fbc.js');

const marketButtonDropdownCss = ":host{display:inline-block}market-dropdown,.market-dropdown{width:100%}svg{fill:transparent}";
const MarketButtonDropdownStyle0 = marketButtonDropdownCss;

/**
 * Type guard to check if the supported trigger element is a `market-button`
 */
function isMarketButton(el) {
    return el.tagName.toLowerCase() === index$1.getNamespacedTagFor('market-button');
}
const MarketButtonDropdown = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketButtonDropdownOpened = index.createEvent(this, "marketButtonDropdownOpened", 7);
        this.marketButtonDropdownClosed = index.createEvent(this, "marketButtonDropdownClosed", 7);
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
        this.slottedButton = this.el.querySelector(dropdown.supportedDropdownTriggers.join(','));
        this.syncTriggerDisabledState();
        this.setCaret();
    }
    componentWillLoad() {
        this.mutationObserver = aria.observeAriaAttributes(this.el, this.onMutationObserved);
    }
    componentWillRender() {
        const MarketListTagName = index$1.getNamespacedTagFor('market-list');
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
                popoverContent.id = `popover-${v4.v4()}`;
            }
            // Persist aria attributes on the slotted button
            aria.applyExpandableAriaControls(this.slottedButton, {
                expanded: this.dropdownIsActive.toString(),
                popoverId: popoverContent.id,
            });
        }
    }
    render() {
        const MarketDropdownTagName = index$1.getNamespacedTagFor('market-dropdown');
        const MarketPopoverTagName = index$1.getNamespacedTagFor('market-popover');
        return (index.h(index.Host, { key: '35a277377595acc3448cf6725c2026ef398df787', class: "market-button-dropdown" }, index.h(MarketDropdownTagName, { key: '706d03f37636b4a77ce2378279a85ecbbc563259', interaction: this.interaction, "popover-strategy": this.popoverStrategy, "popover-placement": this.popoverPlacement, disabled: this.disabled }, index.h("slot", { key: 'eb6a8ad8f2d20b110fea23dcca3f13ef4f888640', name: "trigger", slot: "trigger", onSlotchange: () => this.registerTrigger() }), index.h(MarketPopoverTagName, { key: '6eda9f25ab04d65c27fa96145fde542e040882c2', slot: "popover", part: "popover" }, index.h("slot", { key: '1a9a9e1e0fd8c895482d4a08e4d016530340e2cd', name: "content" })))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "disabled": ["syncTriggerDisabledState"]
    }; }
};
MarketButtonDropdown.style = MarketButtonDropdownStyle0;

exports.market_button_dropdown = MarketButtonDropdown;

//# sourceMappingURL=market-button-dropdown.cjs.entry.js.map