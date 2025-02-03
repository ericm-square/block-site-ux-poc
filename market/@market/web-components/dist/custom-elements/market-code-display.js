import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const marketCodeDisplayCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:flex;justify-content:space-between;align-items:center;width:-moz-min-content;width:min-content;min-width:var(--code-display-width, 320px);min-height:var(--code-display-height, 48px);margin:var(--code-display-margin, 12px);padding:var(--code-display-padding-vertical, 12px)\n    var(--code-display-padding-right, 16px)\n    var(--code-display-padding-vertical, 12px)\n    var(--code-display-zero-value, 0);border-radius:var(--code-display-border-radius, 6px);background-color:var(--code-display-background-color, var(--core-fill-40-color));font-weight:var(--code-display-code-font-weight, var(--core-type-bold-weight));font-size:var(--code-display-code-font-size, var(--core-type-heading-20-size));font-family:var(--code-display-font-family, var(--core-type-font-family));font-feature-settings:\"tnum\"}:host(:not([disabled])) button:hover,:host ::slotted(button:hover),:host ::slotted(a:hover){opacity:var(--code-display-action-interaction-opacity, 60%)}:host(:not([disabled])) button:active,:host ::slotted(button:active),:host ::slotted(a:active){opacity:var(--code-display-action-interaction-opacity, 60%)}:host([disabled]){color:var(--code-display-disabled-text-color, var(--core-text-30-color));}:host([disabled]) ::slotted(button),:host ::slotted(a){color:var(--code-display-disabled-text-color, var(--core-text-30-color));}:host .code-container{display:flex;flex-grow:2;justify-content:space-between;min-width:var(--code-display-code-container-min-width, 269px)}:host .code-char{flex-basis:100%;font-family:var(--core-type-mono-font-family, monospace);text-align:center}:host .actions-container{display:flex;justify-content:center;align-items:center}:host .actions-container ::slotted([slot=\"actions\"]:not(:last-child)){margin-right:var(--code-display-extra-actions-margin-right, 25px)}:host .actions-container ::slotted([slot=\"actions\"]:not(:last-child))::after{content:\"\";display:inline-block;width:var(--code-display-button-separator-width, 1px);height:var(--code-display-button-separator-height, 8px);margin-right:var(--code-display-separator-margin-right, -13px);margin-left:var(--code-display-button-content-spacing, 12px);background-color:var(--code-display-button-separator-color, var(--core-fill-10-color));opacity:var(--code-display-button-separator-opacity, 30%);pointer-events:none}:host button,:host ::slotted(button),:host ::slotted(a){margin:var(--code-display-zero-value, 0);padding:var(--code-display-zero-value, 0);border:none;background-color:transparent;color:var(--code-display-button-font-color, var(--core-blue-text-color));font-weight:var(--code-display-button-font-weight, var(--core-type-semibold-weight));font-size:var(--code-display-button-font-size, var(--core-type-paragraph-20-size));font-family:inherit;line-height:var(--code-display-button-line-height, var(--core-type-paragraph-20-leading));text-decoration:none;cursor:pointer}@media only screen and (max-width: 320px){:host{flex-wrap:wrap;width:100%;min-width:var(--code-display-zero-value, 0)}:host .code-container{min-width:var(--code-display-zero-value, 0)}}";
const MarketCodeDisplayStyle0 = marketCodeDisplayCss;

/**
 * When code is split up, represents how many characters are in each group.
 */
const CODE_GROUP_LEN = 4;
const MarketCodeDisplay$1 = /*@__PURE__*/ proxyCustomElement(class MarketCodeDisplay extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketCodeCopied = createEvent(this, "marketCodeCopied", 7);
        /**
         * A string holding the code inputted by the user through a slot.
         */
        this.code = '';
        /**
         * An array holding spans containing each character in the code, with some blanks.
         * Used for styling and spacing.
         */
        this.codeChars = [];
        this.disabled = false;
        this.focused = false;
    }
    /**
     * Component Lifecycle Event:
     * Grab the code and its len from inputted code slot.
     * Set relevant props and insert the Copy button programmatically so that it appears in the light DOM.
     */
    componentWillLoad() {
        // Set code and codeGroups
        const slottedCodeTag = this.el.querySelector('[slot=code]');
        const code = slottedCodeTag.textContent;
        // Remove whitespace from slotted code
        this.code = code.replace(/\s/g, '');
        this.initCodeChars(this.code);
        // Programmatically insert default Copy button into light DOM
        this.copyButton = document.createElement('button');
        Object.assign(this.copyButton, {
            slot: 'actions',
            type: 'button',
            tabIndex: this.disabled ? -1 : 0,
            onclick: () => this.copyToClipboard(),
        });
        // NOTE: The following code is brittle! Relies on the fact that the consumer
        //       slotted in elements in order of 'code' -> 'copy-text' -> 'actions'
        // If consumer slotted in alt copy-text, place copyButton after code & copy-text
        if (this.el.querySelector('[slot=copy-text]')) {
            // Set text of the Copy button to slotted copy-text
            const slottedCopyText = this.el.querySelector('[slot=copy-text]');
            const copyText = slottedCopyText.textContent;
            this.copyButton.innerHTML = copyText;
            slottedCopyText.insertAdjacentElement('afterend', this.copyButton);
        }
        else {
            this.copyButton.innerHTML = `Copy`;
            slottedCodeTag.insertAdjacentElement('afterend', this.copyButton);
        }
    }
    /**
     * Inits this.codeChars to an array of <span> tags containing each character in the code string.
     * Additionally contains empty strings at certain indices based on codeLen.
     * By default, blanks are only placed at the front & back of the array.
     *    ['', 'x', 'x', 'x', 'x', '']
     * If codeLen is divisible by 4, put blanks every 4 spots too.
     *    ['', 'x', 'x', 'x', 'x', '', 'x', 'x', 'x', 'x', '']
     * The exception to this is if codeLen===4, in which case we use the default.
     * This codeChars arr is used in render() to space and style characters appropriately.
     * Called only once on componentWillLoad() as to not cause re-renders
     */
    initCodeChars(code) {
        const codeLen = code.length;
        const BLANK_CODE_SPAN = h("span", { class: "code-char" });
        // Place blanks every 4 chars
        if (codeLen !== CODE_GROUP_LEN && codeLen % CODE_GROUP_LEN === 0) {
            for (let i = 0; i < codeLen; i++) {
                if (i % CODE_GROUP_LEN === 0)
                    this.codeChars.push(BLANK_CODE_SPAN);
                this.codeChars.push(h("span", { class: "code-char" }, code[i]));
            }
        }
        // Only place blank at the front & back
        else {
            this.codeChars.push(BLANK_CODE_SPAN);
            for (let i = 0; i < codeLen; i++) {
                this.codeChars.push(h("span", { class: "code-char" }, code[i]));
            }
        }
        this.codeChars.push(BLANK_CODE_SPAN);
    }
    /**
     * When user presses the 'Copy' button, copy code to clipboard & emit an event.
     */
    copyToClipboard() {
        navigator.clipboard.writeText(this.code);
        this.marketCodeCopied.emit();
    }
    render() {
        return (h(Host, { key: 'd20b66bb6de60a11d86a92b2fa8faafa594727b7', class: "market-code-display", tabIndex: this.disabled ? null : 0, "aria-label": this.code }, h("span", { key: 'd403656bd834ecea1b9deb6409d9d0747e41e27b', class: "code-container" }, this.codeChars), h("span", { key: '87a4cc31d2bcf6dd393b247e43a75067cd65b0e0', class: "actions-container" }, h("slot", { key: '42ceb91d39adfef778a695c1c4b3700d78d77a55', name: "actions" }))));
    }
    get el() { return this; }
    static get style() { return MarketCodeDisplayStyle0; }
}, [1, "market-code-display", {
        "disabled": [1540],
        "focused": [1540]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-code-display"];
    components.forEach(tagName => { switch (tagName) {
        case "market-code-display":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketCodeDisplay$1);
            }
            break;
    } });
}

const MarketCodeDisplay = MarketCodeDisplay$1;
const defineCustomElement = defineCustomElement$1;

export { MarketCodeDisplay, defineCustomElement };

//# sourceMappingURL=market-code-display.js.map