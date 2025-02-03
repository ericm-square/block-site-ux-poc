import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e03cb5c3.js';

const marketChoiceButtonCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--transition-duration:0.2s;--focus-ring-color:color-mix(in srgb, var(--choice-button-focus-ring-color) 100%, transparent);position:relative;display:inline-block;border-radius:var(--choice-button-border-radius);background-color:var(--choice-button-unselected-value-normal-state-background-color);color:var(--choice-button-unselected-value-normal-state-label-color);cursor:pointer;transition:background-color color var(--transition-duration)}button{display:inline-flex;justify-content:center;align-items:center;box-sizing:border-box;width:100%;margin:0;padding:0;border:none;border-radius:var(--choice-button-border-radius);background-color:transparent;color:inherit;outline:none;font-weight:inherit;font-size:inherit;font-family:inherit;line-height:inherit;text-align:center;cursor:inherit}button:focus-visible{outline:var(--choice-button-focus-ring-border-size) solid var(--focus-ring-color);outline-offset:var(--choice-button-focus-ring-buffer-size)}::slotted([slot=\"secondary-text\"]){cursor:inherit}:host([size=\"medium\"]) button{padding:var(--choice-button-medium-size-vertical-padding) var(--choice-button-medium-size-horizontal-padding);font-weight:var(--choice-button-medium-size-text-primary-weight);font-size:var(--choice-button-medium-size-text-primary-size);line-height:var(--choice-button-medium-size-text-primary-leading);letter-spacing:var(--choice-button-medium-size-text-primary-tracking);text-transform:var(--choice-button-medium-size-text-primary-case);-moz-column-gap:var(--choice-button-medium-size-content-spacing);column-gap:var(--choice-button-medium-size-content-spacing)}:host([size=\"medium\"]) ::slotted([slot=\"secondary-text\"]){font-weight:var(--choice-button-medium-size-text-secondary-weight);font-size:var(--choice-button-medium-size-text-secondary-size);line-height:var(--choice-button-medium-size-text-secondary-leading);letter-spacing:var(--choice-button-medium-size-text-secondary-tracking);text-transform:var(--choice-button-medium-size-text-secondary-case)}:host([size=\"small\"]) button{padding:var(--choice-button-small-size-vertical-padding) var(--choice-button-small-size-horizontal-padding);font-weight:var(--choice-button-small-size-text-primary-weight);font-size:var(--choice-button-small-size-text-primary-size);line-height:var(--choice-button-small-size-text-primary-leading);letter-spacing:var(--choice-button-small-size-text-primary-tracking);text-transform:var(--choice-button-small-size-text-primary-case);-moz-column-gap:var(--choice-button-small-size-content-spacing);column-gap:var(--choice-button-small-size-content-spacing)}:host([size=\"small\"]) ::slotted([slot=\"secondary-text\"]){font-weight:var(--choice-button-small-size-text-secondary-weight);font-size:var(--choice-button-small-size-text-secondary-size);line-height:var(--choice-button-small-size-text-secondary-leading);letter-spacing:var(--choice-button-small-size-text-secondary-tracking);text-transform:var(--choice-button-small-size-text-secondary-case)}:host([size=\"large\"]) button{padding:var(--choice-button-large-size-vertical-padding) var(--choice-button-large-size-horizontal-padding);font-weight:var(--choice-button-large-size-text-primary-weight);font-size:var(--choice-button-large-size-text-primary-size);line-height:var(--choice-button-large-size-text-primary-leading);letter-spacing:var(--choice-button-large-size-text-primary-tracking);text-transform:var(--choice-button-large-size-text-primary-case);-moz-column-gap:var(--choice-button-large-size-content-spacing);column-gap:var(--choice-button-large-size-content-spacing)}:host([size=\"large\"]) ::slotted([slot=\"secondary-text\"]){font-weight:var(--choice-button-large-size-text-secondary-weight);font-size:var(--choice-button-large-size-text-secondary-size);line-height:var(--choice-button-large-size-text-secondary-leading);letter-spacing:var(--choice-button-large-size-text-secondary-tracking);text-transform:var(--choice-button-large-size-text-secondary-case)}@media (hover: hover){:host(:hover){background-color:var(--choice-button-unselected-value-hover-state-background-color);color:var(--choice-button-unselected-value-hover-state-label-color)}}:host(:active){background-color:var(--choice-button-unselected-value-pressed-state-background-color);color:var(--choice-button-unselected-value-pressed-state-label-color)}:host([disabled]){background-color:var(--choice-button-unselected-value-disabled-state-background-color);color:var(--choice-button-unselected-value-disabled-state-label-color)}:host([selected]){background-color:var(--choice-button-selected-value-normal-state-background-color);color:var(--choice-button-selected-value-normal-state-label-color)}@media (hover: hover){:host([selected]:hover){background-color:var(--choice-button-selected-value-hover-state-background-color);color:var(--choice-button-selected-value-hover-state-label-color)}}:host([selected]:active){background-color:var(--choice-button-selected-value-pressed-state-background-color);color:var(--choice-button-selected-value-pressed-state-label-color)}:host([selected][disabled]){background-color:var(--choice-button-selected-value-disabled-state-background-color);color:var(--choice-button-selected-value-disabled-state-label-color)}";
const MarketChoiceButtonStyle0 = marketChoiceButtonCss;

const MarketChoiceButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.marketChoiceButtonSelected = createEvent(this, "marketChoiceButtonSelected", 7);
        this.marketChoiceButtonDeselected = createEvent(this, "marketChoiceButtonDeselected", 7);
        this.disabled = false;
        this.selected = false;
        this.size = 'medium';
    }
    onClick(e) {
        if (this.disabled) {
            e.stopImmediatePropagation();
            return;
        }
        if (this.selected) {
            this.selected = false;
            this.marketChoiceButtonDeselected.emit();
        }
        else {
            this.selected = true;
            this.marketChoiceButtonSelected.emit();
        }
    }
    render() {
        const { disabled } = this;
        return (h(Host, { key: '5fed443777aa284760086db85df12d195aada3cc', class: "market-choice-button", tabindex: disabled ? -1 : undefined, onClick: (e) => {
                this.onClick(e);
            } }, h("button", { key: 'c8e8aff08358a621202d705f6aa63f9dbeb7ab37', "aria-disabled": disabled }, h("slot", { key: '032cec3910431ad73dffef0d7fae6dfb72a3a4e2' }), h("slot", { key: '1921baa2a22e9ef012979d7232ac4dee74353776', name: "secondary-text" }))));
    }
    get el() { return getElement(this); }
};
MarketChoiceButton.style = MarketChoiceButtonStyle0;

export { MarketChoiceButton as market_choice_button };

//# sourceMappingURL=market-choice-button.entry.js.map