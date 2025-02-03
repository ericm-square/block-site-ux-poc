'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const aria = require('./aria-c58bdf8b.js');
const index$1 = require('./index-254d04f0.js');

const marketButtonCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--transition-duration:0.2s;--focus-ring-color:color-mix(in srgb, var(--button-focus-ring-color) 100%, transparent);position:relative;display:inline-block;border-radius:var(--button-border-radius);transition:background-color color var(--transition-duration)}.inner-tag{display:inline-flex;justify-content:center;align-items:center;width:100%;border:none;border-radius:var(--button-border-radius);background-color:transparent;color:inherit;outline:none;font-weight:inherit;font-size:inherit;font-family:inherit;line-height:inherit;text-align:center;text-decoration:none;cursor:pointer}.inner-tag:focus-visible{outline:var(--button-focus-ring-border-size) solid var(--focus-ring-color);outline-offset:var(--button-focus-ring-buffer-size)}::slotted([slot=\"icon\"]){position:relative;display:flex;color:inherit;fill:currentcolor;stroke:inherit}.market-activity-indicator{position:absolute;top:50%;left:50%;line-height:0;opacity:0%;transform:translate(-50%, -50%)}:host([is-loading]){pointer-events:none}:host([is-loading]) .inner-tag{opacity:0%}:host([is-loading]) .market-activity-indicator{opacity:100%}:host([size=\"small\"]){--button-small-size-minimum-width:var(--button-small-size-minimum-height);font-weight:var(--button-small-size-text-weight);font-size:var(--button-small-size-text-size);line-height:var(--button-small-size-text-leading);letter-spacing:var(--button-small-size-text-tracking)}:host([size=\"small\"]) .inner-tag{min-width:var(--button-small-size-minimum-width);min-height:var(--button-small-size-minimum-height);-moz-column-gap:var(--button-small-size-content-spacing);column-gap:var(--button-small-size-content-spacing)}:host([size=\"small\"][rank=\"primary\"]) .inner-tag{padding:var(--button-small-size-primary-rank-vertical-padding)\n      var(--button-small-size-primary-rank-horizontal-padding)}:host([size=\"small\"][rank=\"primary\"]) svg,:host([size=\"small\"][rank=\"primary\"]) ::slotted([slot=\"icon\"]){margin:calc(\n        (var(--button-small-size-minimum-height) - var(--accessory-icon-variant-size)) / 2\n        - var(--button-small-size-primary-rank-vertical-padding)\n      ) 0}:host([size=\"small\"][rank=\"secondary\"]) .inner-tag{padding:var(--button-small-size-secondary-rank-vertical-padding)\n      var(--button-small-size-secondary-rank-horizontal-padding)}:host([size=\"small\"][rank=\"secondary\"]) svg,:host([size=\"small\"][rank=\"secondary\"]) ::slotted([slot=\"icon\"]){margin:calc(\n        (var(--button-small-size-minimum-height) - var(--accessory-icon-variant-size)) / 2\n        - var(--button-small-size-secondary-rank-vertical-padding)\n      ) 0}:host([size=\"small\"][rank=\"tertiary\"]) .inner-tag{padding:var(--button-small-size-tertiary-rank-vertical-padding)\n      var(--button-small-size-tertiary-rank-horizontal-padding)}:host([size=\"small\"][rank=\"tertiary\"]) svg,:host([size=\"small\"][rank=\"tertiary\"]) ::slotted([slot=\"icon\"]){margin:calc(\n        (var(--button-small-size-minimum-height) - var(--accessory-icon-variant-size)) / 2\n        - var(--button-small-size-tertiary-rank-vertical-padding)\n      ) 0}:host([size=\"small\"][icon-only]) .inner-tag{padding:var(--icon-button-small-size-padding-size)}:host([size=\"medium\"]){--button-medium-size-minimum-width:var(--button-medium-size-minimum-height);font-weight:var(--button-medium-size-text-weight);font-size:var(--button-medium-size-text-size);line-height:var(--button-medium-size-text-leading);letter-spacing:var(--button-medium-size-text-tracking)}:host([size=\"medium\"]) .inner-tag{min-width:var(--button-medium-size-minimum-width);min-height:var(--button-medium-size-minimum-height);-moz-column-gap:var(--button-medium-size-content-spacing);column-gap:var(--button-medium-size-content-spacing)}:host([size=\"medium\"][rank=\"primary\"]) .inner-tag{padding:var(--button-medium-size-primary-rank-vertical-padding)\n      var(--button-medium-size-primary-rank-horizontal-padding)}:host([size=\"medium\"][rank=\"secondary\"]) .inner-tag{padding:var(--button-medium-size-secondary-rank-vertical-padding)\n      var(--button-medium-size-secondary-rank-horizontal-padding)}:host([size=\"medium\"][rank=\"tertiary\"]) .inner-tag{padding:var(--button-medium-size-tertiary-rank-vertical-padding)\n      var(--button-medium-size-tertiary-rank-horizontal-padding)}:host([size=\"medium\"][icon-only]) .inner-tag{padding:var(--icon-button-medium-size-padding-size)}:host([size=\"large\"]){--button-large-size-minimum-width:var(--button-large-size-minimum-height);font-weight:var(--button-large-size-text-weight);font-size:var(--button-large-size-text-size);line-height:var(--button-large-size-text-leading);letter-spacing:var(--button-large-size-text-tracking)}:host([size=\"large\"]) .inner-tag{min-width:var(--button-large-size-minimum-width);min-height:var(--button-large-size-minimum-height);-moz-column-gap:var(--button-large-size-content-spacing);column-gap:var(--button-large-size-content-spacing)}:host([size=\"large\"][rank=\"primary\"]) .inner-tag{padding:var(--button-large-size-primary-rank-vertical-padding)\n      var(--button-large-size-primary-rank-horizontal-padding)}:host([size=\"large\"][rank=\"secondary\"]) .inner-tag{padding:var(--button-large-size-secondary-rank-vertical-padding)\n      var(--button-large-size-secondary-rank-horizontal-padding)}:host([size=\"large\"][rank=\"tertiary\"]) .inner-tag{padding:var(--button-large-size-tertiary-rank-vertical-padding)\n      var(--button-large-size-tertiary-rank-horizontal-padding)}:host([size=\"large\"][icon-only]) .inner-tag{padding:var(--icon-button-large-size-padding-size)}:host([rank=\"primary\"]){background-color:var(--button-normal-variant-primary-rank-normal-state-background-color);color:var(--button-normal-variant-primary-rank-normal-state-label-color)}:host([rank=\"primary\"][icon-only]){color:var(--icon-button-primary-rank-normal-state-icon-color)}@media (hover: hover){:host([rank=\"primary\"]:hover){background-color:var(--button-normal-variant-primary-rank-hover-state-background-color);color:var(--button-normal-variant-primary-rank-hover-state-label-color)}:host([rank=\"primary\"][icon-only]:hover){color:var(--icon-button-primary-rank-hover-state-icon-color)}}:host([rank=\"primary\"][focused]){background-color:var(--button-normal-variant-primary-rank-focus-state-background-color);color:var(--button-normal-variant-primary-rank-focus-state-label-color)}:host([rank=\"primary\"][icon-only][focused]){color:var(--icon-button-primary-rank-focus-state-icon-color)}:host([rank=\"primary\"]:active){background-color:var(--button-normal-variant-primary-rank-pressed-state-background-color);color:var(--button-normal-variant-primary-rank-pressed-state-label-color)}:host([rank=\"primary\"][icon-only]:active){color:var(--icon-button-primary-rank-pressed-state-icon-color)}:host([rank=\"primary\"][disabled]){background-color:var(--button-normal-variant-primary-rank-disabled-state-background-color);color:var(--button-normal-variant-primary-rank-disabled-state-label-color)}:host([rank=\"primary\"][icon-only][disabled]){color:var(--icon-button-primary-rank-disabled-state-icon-color)}:host([rank=\"secondary\"]){background-color:var(--button-normal-variant-secondary-rank-normal-state-background-color);color:var(--button-normal-variant-secondary-rank-normal-state-label-color)}:host([rank=\"secondary\"][icon-only]){color:var(--icon-button-secondary-rank-normal-state-icon-color)}@media (hover: hover){:host([rank=\"secondary\"]:hover){background-color:var(--button-normal-variant-secondary-rank-hover-state-background-color);color:var(--button-normal-variant-secondary-rank-hover-state-label-color)}:host([rank=\"secondary\"][icon-only]:hover){color:var(--icon-button-secondary-rank-hover-state-icon-color)}}:host([rank=\"secondary\"][focused]){background-color:var(--button-normal-variant-secondary-rank-focus-state-background-color);color:var(--button-normal-variant-secondary-rank-focus-state-label-color)}:host([rank=\"secondary\"][icon-only][focused]){color:var(--icon-button-secondary-rank-focus-state-icon-color)}:host([rank=\"secondary\"]:active){background-color:var(--button-normal-variant-secondary-rank-pressed-state-background-color);color:var(--button-normal-variant-secondary-rank-pressed-state-label-color)}:host([rank=\"secondary\"][icon-only]:active){color:var(--icon-button-secondary-rank-pressed-state-icon-color)}:host([rank=\"secondary\"][disabled]){background-color:var(--button-normal-variant-secondary-rank-disabled-state-background-color);color:var(--button-normal-variant-secondary-rank-disabled-state-label-color)}:host([rank=\"secondary\"][icon-only][disabled]){color:var(--icon-button-secondary-rank-disabled-state-icon-color)}:host([rank=\"tertiary\"]){background-color:var(--button-normal-variant-tertiary-rank-normal-state-background-color);color:var(--button-normal-variant-tertiary-rank-normal-state-label-color)}:host([rank=\"tertiary\"][icon-only]){color:var(--icon-button-tertiary-rank-normal-state-icon-color)}@media (hover: hover){:host([rank=\"tertiary\"]:hover){background-color:var(--button-normal-variant-tertiary-rank-hover-state-background-color);color:var(--button-normal-variant-tertiary-rank-hover-state-label-color)}:host([rank=\"tertiary\"][icon-only]:hover){color:var(--icon-button-tertiary-rank-hover-state-icon-color)}}:host([rank=\"tertiary\"][focused]){background-color:var(--button-normal-variant-tertiary-rank-focus-state-background-color);color:var(--button-normal-variant-tertiary-rank-focus-state-label-color)}:host([rank=\"tertiary\"][icon-only][focused]){color:var(--icon-button-tertiary-rank-focus-state-icon-color)}:host([rank=\"tertiary\"]:active){background-color:var(--button-normal-variant-tertiary-rank-pressed-state-background-color);color:var(--button-normal-variant-tertiary-rank-pressed-state-label-color)}:host([rank=\"tertiary\"][icon-only]:active){color:var(--icon-button-tertiary-rank-pressed-state-icon-color)}:host([rank=\"tertiary\"][disabled]){background-color:var(--button-normal-variant-tertiary-rank-disabled-state-background-color);color:var(--button-normal-variant-tertiary-rank-disabled-state-label-color)}:host([rank=\"tertiary\"][icon-only][disabled]){color:var(--icon-button-tertiary-rank-disabled-state-icon-color)}:host([variant=\"destructive\"][rank=\"primary\"]){background-color:var(--button-destructive-variant-primary-rank-normal-state-background-color);color:var(--button-destructive-variant-primary-rank-normal-state-label-color)}@media (hover: hover){:host([variant=\"destructive\"][rank=\"primary\"]:hover){background-color:var(--button-destructive-variant-primary-rank-hover-state-background-color);color:var(--button-destructive-variant-primary-rank-hover-state-label-color)}}:host([variant=\"destructive\"][rank=\"primary\"][focused]){background-color:var(--button-destructive-variant-primary-rank-focus-state-background-color);color:var(--button-destructive-variant-primary-rank-focus-state-label-color)}:host([variant=\"destructive\"][rank=\"primary\"]:active){background-color:var(--button-destructive-variant-primary-rank-pressed-state-background-color);color:var(--button-destructive-variant-primary-rank-pressed-state-label-color)}:host([variant=\"destructive\"][rank=\"primary\"][disabled]){background-color:var(--button-destructive-variant-primary-rank-disabled-state-background-color);color:var(--button-destructive-variant-primary-rank-disabled-state-label-color)}:host([variant=\"destructive\"][rank=\"secondary\"]){background-color:var(--button-destructive-variant-secondary-rank-normal-state-background-color);color:var(--button-destructive-variant-secondary-rank-normal-state-label-color)}@media (hover: hover){:host([variant=\"destructive\"][rank=\"secondary\"]:hover){background-color:var(--button-destructive-variant-secondary-rank-hover-state-background-color);color:var(--button-destructive-variant-secondary-rank-hover-state-label-color)}}:host([variant=\"destructive\"][rank=\"secondary\"][focused]){background-color:var(--button-destructive-variant-secondary-rank-focus-state-background-color);color:var(--button-destructive-variant-secondary-rank-focus-state-label-color)}:host([variant=\"destructive\"][rank=\"secondary\"]:active){background-color:var(--button-destructive-variant-secondary-rank-pressed-state-background-color);color:var(--button-destructive-variant-secondary-rank-pressed-state-label-color)}:host([variant=\"destructive\"][rank=\"secondary\"][disabled]){background-color:var(--button-destructive-variant-secondary-rank-disabled-state-background-color);color:var(--button-destructive-variant-secondary-rank-disabled-state-label-color)}:host([variant=\"destructive\"][rank=\"tertiary\"]){background-color:var(--button-destructive-variant-tertiary-rank-normal-state-background-color);color:var(--button-destructive-variant-tertiary-rank-normal-state-label-color)}@media (hover: hover){:host([variant=\"destructive\"][rank=\"tertiary\"]:hover){background-color:var(--button-destructive-variant-tertiary-rank-hover-state-background-color);color:var(--button-destructive-variant-tertiary-rank-hover-state-label-color)}}:host([variant=\"destructive\"][rank=\"tertiary\"][focused]){background-color:var(--button-destructive-variant-tertiary-rank-focus-state-background-color);color:var(--button-destructive-variant-tertiary-rank-focus-state-label-color)}:host([variant=\"destructive\"][rank=\"tertiary\"]:active){background-color:var(--button-destructive-variant-tertiary-rank-pressed-state-background-color);color:var(--button-destructive-variant-tertiary-rank-pressed-state-label-color)}:host([variant=\"destructive\"][rank=\"tertiary\"][disabled]){background-color:var(--button-destructive-variant-tertiary-rank-disabled-state-background-color);color:var(--button-destructive-variant-tertiary-rank-disabled-state-label-color)}";
const MarketButtonStyle0 = marketButtonCss;

const MarketButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        // Implicit submission is when an interaction within a form fires a click event on the form's first submit button in tree order.
        // Because the inner <button> of <market-button> is in the shadow dom and not in tree order, we lose this functionality.
        // To ensure we have the exact behavior that a plain button would have had in this situation,
        // we add a hidden button to the form and click it for the implicit submission.
        // https://www.hjorthhansen.dev/shadow-dom-and-forms/
        // note: this is attached in the host element's onclick instead of with the @Listen decorator
        // to ensure the following fire in the correct order:
        // 1) handleClick
        // 2) the event passed to market-button
        // 3) implicit submission
        // In Ember, the @Listen would fire before the event passed to the button, which could result in the event not happening.
        this.handleImplicitSubmission = () => {
            if (this.type === 'submit') {
                const form = this.el.closest('form');
                if (form) {
                    const fakeButton = document.createElement('button');
                    fakeButton.type = this.type;
                    fakeButton.style.display = 'none';
                    form.appendChild(fakeButton);
                    fakeButton.click();
                    fakeButton.remove();
                }
            }
        };
        this.onMutationObserved = (ariaAttributes) => {
            this.ariaAttributes = ariaAttributes;
        };
        this.caret = 'none';
        this.disabled = false;
        this.download = undefined;
        this.focused = false;
        this.href = undefined;
        this.iconOnly = false;
        this.innerTabindex = undefined;
        this.isLoading = false;
        this.rank = 'secondary';
        this.rel = undefined;
        this.size = 'medium';
        this.target = undefined;
        this.type = 'button';
        this.variant = 'regular';
        this.ariaAttributes = undefined;
    }
    focusedChangeHandler(newValue) {
        if (!this.innerTag) {
            return;
        }
        if (newValue) {
            this.innerTag.focus();
        }
    }
    /* Listening for click events here allows us to stop bubbling when
    disabled. Attaching listeners to Host (as the Stencil linter prefers),
    seems to also work in Stencil tests, but fails in Ember for some reason.
    We listen in the "capture" phase to ensure we're hit before any external
    click handlers. See here for details:
    https://www.sitepoint.com/event-bubbling-javascript/ */
    handleClick(event) {
        if (this.disabled || this.isLoading) {
            // Calling `stopImmediatePropagation` instead of `stopPropagation`
            // allows us to block current and future "sibling" event listeners
            // that have also been attached to this element, as opposed to just
            // those higher in the DOM tree.
            event.stopImmediatePropagation();
        }
    }
    /**
     * Sets `focused` state, except when disabled. Allows external consumers to programmatically
     * trigger focused styling.
     */
    setFocus(value = true) {
        if (this.disabled) {
            return Promise.resolve();
        }
        this.focused = value; // this will cause the `focusedChangeHandler` to be triggered
        if (!value && this.innerTag) {
            this.innerTag.blur();
        }
        return Promise.resolve();
    }
    handleSlotChange() {
        const iconSlot = this.el.querySelector('[slot="icon"]');
        const hasIcon = Boolean(iconSlot);
        const buttonText = this.el.textContent.trim();
        let hasLabelText;
        if (hasIcon) {
            // Check for text in the icon itself, such as icon badge text. This text is considered part of the icon and not a label.
            // Since buttonText contains all text in the element including the svg, only set hasLabelText to true if text exists outside of the icon.
            const iconText = iconSlot.textContent.trim();
            hasLabelText = buttonText.length > iconText.length;
        }
        else {
            hasLabelText = buttonText.length > 0;
        }
        this.iconOnly = hasIcon && !hasLabelText;
    }
    componentWillLoad() {
        this.mutationObserver = aria.observeAriaAttributes(this.el, this.onMutationObserved);
        this.handleSlotChange();
    }
    render() {
        const { 
        // props
        caret, disabled, href, innerTabindex, isLoading, target, type, rel, download, 
        // state
        ariaAttributes, 
        // methods
        handleImplicitSubmission, } = this;
        const TagType = href === undefined ? 'button' : 'a';
        const TagTypeAttrs = TagType === 'button' ? { type, disabled } : { href, target, rel, download };
        const MarketActivityIndicatorTagName = index$1.getNamespacedTagFor('market-activity-indicator');
        const MarketIconTagName = index$1.getNamespacedTagFor('market-icon');
        return (index.h(index.Host, { key: '7ab029a8c99a088b7f4f6c780c74e07f89bcd73e', class: "market-button", onClick: handleImplicitSubmission }, index.h(TagType, Object.assign({ key: 'a82d9c744e51ae71d12e6611613dd3b19a9f32c9', class: "inner-tag" }, TagTypeAttrs, ariaAttributes, { tabindex: disabled ? -1 : innerTabindex, onFocus: () => {
                this.focused = true;
            }, onBlur: () => {
                this.focused = false;
            }, ref: (el) => (this.innerTag = el) }), index.h("slot", { key: '06c02b4d1e5896412bbfbe956394dd8c01f86ba6', name: "icon", onSlotchange: () => this.handleSlotChange() }), index.h("slot", { key: '79754fbad2cbd532c278c2702680e63ecdfecfb1', onSlotchange: () => this.handleSlotChange() }), caret === 'down' && index.h(MarketIconTagName, { key: 'e120aab00ab825ae0071014050f69f3bf1d2d256', name: "expand" }), caret === 'up' && index.h(MarketIconTagName, { key: '9c87ab277fe0826899270f5475cd95290c17aa36', name: "collapse" })), isLoading && index.h(MarketActivityIndicatorTagName, { key: '924783840ca804abfe7cb09e25c0303015805e1c', size: "small" })));
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "focused": ["focusedChangeHandler"]
    }; }
};
MarketButton.style = MarketButtonStyle0;

exports.market_button = MarketButton;

//# sourceMappingURL=market-button.cjs.entry.js.map