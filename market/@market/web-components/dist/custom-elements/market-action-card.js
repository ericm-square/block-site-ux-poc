import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { i as isRowElement } from './element-type-guard.js';

/**
 * Finds the row that's slotted in the action card
 *
 * @param {HTMLMarketActionCardElement} actionCardEl - the action card element
 * @returns {HTMLMarketRowElement | null} the row element, if found
 */
function getRowInActionCard(actionCardEl) {
    if (!(actionCardEl === null || actionCardEl === void 0 ? void 0 : actionCardEl.children)) {
        return null;
    }
    return [...actionCardEl.children].find(isRowElement);
}

const marketActionCardCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--focus-ring-color:color-mix(in srgb, var(--action-card-focus-ring-color) 100%, transparent);display:block;padding:var(--action-card-padding-vertical-size) var(--action-card-padding-horizontal-size);border-radius:var(--action-card-border-radius);background-color:var(--action-card-background-color);box-shadow:inset\n    0\n    0\n    0\n    var(--action-card-normal-state-unselected-value-border-width)\n    var(--action-card-normal-state-unselected-value-border-color);opacity:var(--action-card-normal-state-content-opacity);cursor:pointer}:host(:hover){box-shadow:inset\n      0\n      0\n      0\n      var(--action-card-hover-state-unselected-value-border-width)\n      var(--action-card-hover-state-unselected-value-border-color)}:host(:active){box-shadow:inset\n      0\n      0\n      0\n      var(--action-card-active-state-unselected-value-border-width)\n      var(--action-card-active-state-unselected-value-border-color)}:host([disabled]){box-shadow:inset\n      0\n      0\n      0\n      var(--action-card-disabled-state-unselected-value-border-width)\n      var(--action-card-disabled-state-unselected-value-border-color);opacity:var(--action-card-disabled-state-content-opacity)}:host([selected]){box-shadow:inset\n      0\n      0\n      0\n      var(--action-card-normal-state-selected-value-border-width)\n      var(--action-card-normal-state-selected-value-border-color)}:host([selected]:hover){box-shadow:inset\n      0\n      0\n      0\n      var(--action-card-hover-state-selected-value-border-width)\n      var(--action-card-hover-state-selected-value-border-color)}:host([selected]:active){box-shadow:inset\n      0\n      0\n      0\n      var(--action-card-active-state-selected-value-border-width)\n      var(--action-card-active-state-selected-value-border-color)}:host([selected][disabled]){box-shadow:inset\n      0\n      0\n      0\n      var(--action-card-disabled-state-selected-value-border-width)\n      var(--action-card-disabled-state-selected-value-border-color)}:host(.has-slotted-row){padding:0 var(--row-background-horizontal-outset-padding)}:host(.has-slotted-row) ::slotted(.market-row){--row-normal-variant-hover-state-text-color:var(--row-normal-variant-normal-state-text-color);--row-normal-variant-hover-state-subtext-color:var(--row-normal-variant-normal-state-subtext-color);--row-normal-variant-hover-state-side-text-primary-color:var(--row-normal-variant-normal-state-side-text-primary-color);--row-normal-variant-hover-state-side-text-secondary-color:var(--row-normal-variant-normal-state-side-text-secondary-color);--row-normal-variant-selected-state-text-color:var(--row-normal-variant-normal-state-text-color);--row-normal-variant-selected-state-subtext-color:var(--row-normal-variant-normal-state-subtext-color);--row-normal-variant-selected-state-side-text-primary-color:var(--row-normal-variant-normal-state-side-text-primary-color);--row-normal-variant-selected-state-side-text-secondary-color:var(--row-normal-variant-normal-state-side-text-secondary-color);--row-normal-variant-pressed-state-text-color:var(--row-normal-variant-normal-state-text-color);--row-normal-variant-pressed-state-subtext-color:var(--row-normal-variant-normal-state-subtext-color);--row-normal-variant-pressed-state-side-text-primary-color:var(--row-normal-variant-normal-state-side-text-primary-color);--row-normal-variant-pressed-state-side-text-secondary-color:var(--row-normal-variant-normal-state-side-text-secondary-color);padding-right:calc(\n          var(--action-card-padding-horizontal-size) -\n          var(--row-normal-variant-background-horizontal-outset-padding)\n        );padding-left:calc(\n          var(--action-card-padding-horizontal-size) -\n          var(--row-normal-variant-background-horizontal-outset-padding)\n        );background-color:transparent}:host(:focus-visible){outline:var(--action-card-focus-ring-border-size) solid var(--focus-ring-color);outline-offset:var(--action-card-focus-ring-buffer-size)}";
const MarketActionCardStyle0 = marketActionCardCss;

const MarketActionCard$1 = /*@__PURE__*/ proxyCustomElement(class MarketActionCard extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketCardSelected = createEvent(this, "marketCardSelected", 7);
        this.marketCardDeselected = createEvent(this, "marketCardDeselected", 7);
        this.selected = false;
        this.disabled = false;
        this.value = undefined;
        this.transient = false;
    }
    /**
     * When rows are slotted into cards, we want to catch their selection events
     * and emit our own, so that the containing `market-list` only gets one set
     * of selection events.
     */
    handleRowSelection(e) {
        this.select();
        // Prevent `marketRowSelected` from bubbling up to containing lists, since we expect
        // them to listen to our card selection events instead.
        e.stopPropagation();
    }
    /**
     * When rows are slotted into cards, we want to catch their selection events
     * and emit our own, so that the containing `market-list` only gets one set
     * of selection events.
     */
    handleRowDeselection(e) {
        this.deselect();
        // Prevent `marketRowSelected` from bubbling up to containing lists, since we expect
        // them to listen to our card selection events instead.
        e.stopPropagation();
    }
    /**
     * Set `selected` to `true` and emit `marketCardSelected`. Generally speaking,
     * it is preferable to avoid using this method from outside this component
     * and allow `market-action-card` to manage its own selection state based on user
     * interaction. It should only be used for parent components that need to
     * manage a group of rows, such as `market-list`.
     */
    async select() {
        var _a, _b;
        this.selected = true;
        await ((_a = this.rowEl) === null || _a === void 0 ? void 0 : _a.silentlySelect());
        const { defaultPrevented } = this.marketCardSelected.emit({ value: this.value });
        if (defaultPrevented) {
            this.selected = false;
            await ((_b = this.rowEl) === null || _b === void 0 ? void 0 : _b.silentlyDeselect());
        }
    }
    /**
     * Set `selected` to `false` and emit `marketCardDeselected`. Generally speaking,
     * it is preferable to avoid using this method from outside this component
     * and allow `market-action-card` to manage its own selection state based on user
     * interaction. It should only be used for parent components that need to
     * manage a group of rows, such as `market-list`.
     */
    async deselect() {
        var _a, _b;
        this.selected = false;
        await ((_a = this.rowEl) === null || _a === void 0 ? void 0 : _a.silentlyDeselect());
        const { defaultPrevented } = this.marketCardDeselected.emit({ value: this.value });
        if (defaultPrevented) {
            this.selected = true;
            await ((_b = this.rowEl) === null || _b === void 0 ? void 0 : _b.silentlySelect());
        }
    }
    /**
     * Used for setting the selection state to true without emitting events.
     * Useful for scenarios where another component (ex. `<market-list>`) needs
     * to sync state with slotted `<market-action-card>`s.
     */
    async silentlySelect() {
        var _a;
        this.selected = true;
        await ((_a = this.rowEl) === null || _a === void 0 ? void 0 : _a.silentlySelect());
        return Promise.resolve();
    }
    /**
     * Set `selected` to `false`. Generally speaking,
     * it is preferable to avoid using this method from outside this component
     * and allow `market-action-card` to manage its own selection state based on user
     * interaction. It should only be used for parent components that need to
     * manage a group of rows, such as `market-list`.
     */
    async silentlyDeselect() {
        var _a;
        this.selected = false;
        await ((_a = this.rowEl) === null || _a === void 0 ? void 0 : _a.silentlyDeselect());
        return Promise.resolve();
    }
    isContentEditable(el) {
        // check whether element (Market or HTML) accepts text input
        const inputTagnames = ['input', 'textarea'];
        return inputTagnames.some((str) => el.tagName.includes(str)) || el.isContentEditable;
    }
    handleClick(e) {
        // clicks to text inputs should not select action card
        if (this.isContentEditable(e.target)) {
            return;
        }
        // Rows handle selected state when slotted. The only way you can click directly on
        // the card is by clicking the border, and we want to just ignore that edge case.
        if (this.disabled || this.transient || this.rowEl) {
            return;
        }
        if (!this.selected) {
            this.select();
        }
        else {
            this.deselect();
        }
    }
    handleKeydown(e) {
        // user should be able to type normally in text inputs
        if (this.isContentEditable(e.target)) {
            return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // prevents scroll down when Space is pressed
            if (this.rowEl) {
                this.rowEl.click();
            }
            else {
                this.el.click();
            }
        }
    }
    syncRowAttributes() {
        if (!this.rowEl) {
            return;
        }
        this.rowEl.interactive = true;
        this.rowEl.selected = this.selected;
        this.rowEl.removeAttribute('tabIndex');
    }
    handleSlotChangeDefault() {
        this.rowEl = getRowInActionCard(this.el);
        this.el.classList.toggle('has-slotted-row', Boolean(this.rowEl));
        this.syncRowAttributes();
    }
    componentDidRender() {
        // slotted rows inside action cards should not be able to receive focus because
        // they are controlled by interaction w/ the action card
        if (this.rowEl) {
            this.rowEl.removeAttribute('tabIndex');
        }
    }
    render() {
        return (h(Host, { key: '0bf60bf0a77712869982bdc9a8928ecc0fa19fc7', "aria-selected": this.selected, class: "market-action-card", onClick: this.handleClick.bind(this), onKeydown: this.handleKeydown.bind(this), role: "option", tabindex: this.disabled ? null : '0' }, h("slot", { key: '53d189d1a684ad82734157e67be5b640ed0a397b', onSlotchange: () => this.handleSlotChangeDefault() })));
    }
    get el() { return this; }
    static get style() { return MarketActionCardStyle0; }
}, [1, "market-action-card", {
        "selected": [1540],
        "disabled": [516],
        "value": [513],
        "transient": [4],
        "select": [64],
        "deselect": [64],
        "silentlySelect": [64],
        "silentlyDeselect": [64]
    }, [[0, "marketRowSelected", "handleRowSelection"], [0, "marketRowDeselected", "handleRowDeselection"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-action-card"];
    components.forEach(tagName => { switch (tagName) {
        case "market-action-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketActionCard$1);
            }
            break;
    } });
}

const MarketActionCard = MarketActionCard$1;
const defineCustomElement = defineCustomElement$1;

export { MarketActionCard, defineCustomElement };

//# sourceMappingURL=market-action-card.js.map