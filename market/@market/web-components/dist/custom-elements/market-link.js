import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { o as observeAriaAttributes } from './aria.js';

const marketLinkCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}a,button{--text-link-focus-ring-border-size:var(--button-focus-ring-border-size);--text-link-focus-ring-buffer-size:var(--button-focus-ring-buffer-size);--text-link-focus-ring-color:var(--button-focus-ring-color);--focus-ring-color:color-mix(in srgb, var(--text-link-focus-ring-color) 100%, transparent)}a:focus-visible,button:focus-visible{border-radius:1px;outline:var(--text-link-focus-ring-border-size) solid var(--focus-ring-color);outline-offset:var(--text-link-focus-ring-buffer-size)}:host{--transition-duration:0.2s;color:var(--text-link-normal-variant-color);font-weight:var(--text-link-medium-size-text-weight);font-size:inherit;line-height:inherit;letter-spacing:var(--text-link-medium-size-text-tracking);cursor:pointer}:host a,:host a:link,:host a:visited,:host a:hover,:host a:active,:host button{color:inherit;font-family:inherit;text-decoration:none;transition:color var(--transition-duration)}:host a,:host a:link,:host a:visited,:host button{opacity:var(--text-link-normal-state-opacity)}:host a:hover,:host button:hover,:host a:focus,:host button:focus{color:var(--core-blue-20-color);text-decoration:underline}:host a:active,:host button:active{color:var(--core-blue-10-color);}:host([highlight=\"underline\"]) a,:host([highlight=\"underline\"]) button{display:inline-block;text-decoration:underline}:host([highlight=\"underline\"]) a:hover,:host([highlight=\"underline\"]) a:focus,:host([highlight=\"underline\"]) button:hover,:host([highlight=\"underline\"]) button:focus{color:var(--core-blue-20-color);text-decoration:none}:host([aria-disabled]) a,:host([aria-disabled]) button{opacity:var(--text-link-disabled-state-opacity)}:host([destructive]){color:var(--text-link-destructive-variant-color)}:host button{padding:0;border:none;background:none;font:inherit;text-align:inherit;cursor:pointer}";
const MarketLinkStyle0 = marketLinkCss;

const MarketLink$1 = /*@__PURE__*/ proxyCustomElement(class MarketLink extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.onMutationObserved = (ariaAttributes) => {
            this.ariaAttributes = ariaAttributes;
        };
        this.href = undefined;
        this.target = undefined;
        this.rel = undefined;
        this.destructive = false;
        this.disabled = false;
        this.download = undefined;
        this.highlight = undefined;
        this.ariaAttributes = undefined;
    }
    componentWillLoad() {
        this.mutationObserver = observeAriaAttributes(this.el, this.onMutationObserved);
    }
    handleClick(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    render() {
        const { disabled, handleClick, href, target, ariaAttributes, rel, download } = this;
        const TagType = href !== undefined ? 'a' : 'button';
        const TagTypeAttrs = TagType === 'a' ? { href, target, rel, download } : { disabled };
        return (h(Host, { key: '1ff15b453af9a9fc80263474f7415d669b4d158f', class: "market-link", onClick: handleClick, onKeyDown: handleClick }, h(TagType, Object.assign({ key: '9c680a5363b028c6dcece71a5e6d3efc7f131190' }, TagTypeAttrs, ariaAttributes, { "aria-disabled": disabled ? 'true' : null, tabindex: disabled ? '-1' : null }), h("slot", { key: 'ca9afe137bd74a21bfe944a4af0afc3d241d0015' }))));
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    get el() { return this; }
    static get style() { return MarketLinkStyle0; }
}, [1, "market-link", {
        "href": [1],
        "target": [1],
        "rel": [1],
        "destructive": [516],
        "disabled": [516],
        "download": [1],
        "highlight": [520],
        "ariaAttributes": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-link"];
    components.forEach(tagName => { switch (tagName) {
        case "market-link":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketLink$1);
            }
            break;
    } });
}

const MarketLink = MarketLink$1;
const defineCustomElement = defineCustomElement$1;

export { MarketLink, defineCustomElement };

//# sourceMappingURL=market-link.js.map