import { Host, h } from "@stencil/core";
/**
 * When code is split up, represents how many characters are in each group.
 */
const CODE_GROUP_LEN = 4;
export class MarketCodeDisplay {
    constructor() {
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
    static get is() { return "market-code-display"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-code-display.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-code-display.css"]
        };
    }
    static get properties() {
        return {
            "disabled": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the component should appear in a disabled state."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "focused": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A boolean representing whether the code input is focused or not."
                },
                "attribute": "focused",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "marketCodeCopied",
                "name": "marketCodeCopied",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the 'Copy' button is pressed. Can be used by consumer to create toast."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-code-display.js.map
