import { MarketQRCodeEncoder } from "@square/qrcode-encoder";
import { Host, h } from "@stencil/core";
export class MarketQrcode {
    constructor() {
        this.content = '';
        this.size = undefined;
        this.border = false;
        this.monochrome = false;
    }
    render() {
        const encoder = this.content
            ? new MarketQRCodeEncoder(this.content, {
                border: this.border,
                styleBackground: this.border ? 'class="background"' : '',
                styleForeground: 'class="foreground"',
                styleLogo: 'class="logo"',
            })
            : null;
        const containerStyle = this.size !== undefined
            ? {
                height: `${this.size}px`,
                width: `${this.size}px`,
            }
            : null;
        return (h(Host, { key: '5045d27eb8bd396a873727da5ac09bdabb1dcde9', class: "market-qrcode", "aria-hidden": "true" }, h("div", { key: '661f296b07f7e0278fdeeab78fe6b734a05bcce4', innerHTML: encoder ? encoder.svg : '', style: containerStyle })));
    }
    static get is() { return "market-qrcode"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-qrcode.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-qrcode.css"]
        };
    }
    static get properties() {
        return {
            "content": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The URL or other content of the QR code. The QR code is generated using\n[@square/qrcode-encoder](https://github.com/squareup/qrcode/blob/master/packages/square-qrcode-encoder/README.md)."
                },
                "attribute": "content",
                "reflect": true,
                "defaultValue": "''"
            },
            "size": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "By default, QR code size is dependent on the information being encoded.\nUse this property to set the QR code's height and width in pixels."
                },
                "attribute": "size",
                "reflect": true
            },
            "border": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Include a six data-pixel border around the QR code. When this attribute is\npresent, the QR code will have a background color (default is transparent\nbackground)."
                },
                "attribute": "border",
                "reflect": false,
                "defaultValue": "false"
            },
            "monochrome": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When true, QR code will render all elements in black & white."
                },
                "attribute": "monochrome",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
}
//# sourceMappingURL=market-qrcode.js.map
