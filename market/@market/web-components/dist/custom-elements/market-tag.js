import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const marketTagCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--tag-small-size-minimum-height:var(--core-metrics-spacing-400);--tag-small-size-horizontal-spacing:var(--core-metrics-spacing-50);--tag-small-size-text-weight:var(--core-type-paragraph-10-weight);--tag-small-size-text-size:var(--core-type-paragraph-10-size);--tag-small-size-text-leading:var(--core-type-paragraph-10-leading);--tag-small-size-text-tracking:var(--core-type-paragraph-10-tracking);--tag-small-size-text-case:var(--core-type-paragraph-10-case);--tag-small-size-basic-format-top-padding:7px;--tag-small-size-basic-format-right-padding:8px;--tag-small-size-basic-format-bottom-padding:7px;--tag-small-size-basic-format-left-padding:12px;--tag-small-size-with-icon-format-top-padding:7px;--tag-small-size-with-icon-format-right-padding:8px;--tag-small-size-with-icon-format-bottom-padding:7px;--tag-small-size-with-icon-format-left-padding:8px;--tag-medium-size-minimum-height:var(--core-metrics-spacing-500);--tag-medium-size-horizontal-spacing:var(--core-metrics-spacing-50);--tag-medium-size-text-weight:var(--core-type-paragraph-20-weight);--tag-medium-size-text-size:var(--core-type-paragraph-20-size);--tag-medium-size-text-leading:var(--core-type-paragraph-20-leading);--tag-medium-size-text-tracking:var(--core-type-paragraph-20-tracking);--tag-medium-size-text-case:var(--core-type-paragraph-20-case);--tag-medium-size-basic-format-top-padding:9px;--tag-medium-size-basic-format-right-padding:8px;--tag-medium-size-basic-format-bottom-padding:9px;--tag-medium-size-basic-format-left-padding:12px;--tag-medium-size-with-icon-format-top-padding:9px;--tag-medium-size-with-icon-format-right-padding:8px;--tag-medium-size-with-icon-format-bottom-padding:9px;--tag-medium-size-with-icon-format-left-padding:8px;display:inline-flex;align-items:center;background-color:var(--tag-normal-state-background-color);color:var(--tag-normal-state-label-color);cursor:pointer}:host .icon{display:none}:host(.has-icon) .icon{display:inline-block}:host([size=\"small\"]){gap:var(--tag-small-size-horizontal-spacing);min-height:var(--tag-small-size-minimum-height);padding:var(--tag-small-size-basic-format-top-padding)\n      var(--tag-small-size-basic-format-right-padding)\n      var(--tag-small-size-basic-format-bottom-padding)\n      var(--tag-small-size-basic-format-left-padding);border-radius:calc(var(--tag-small-size-minimum-height) / 2);font-weight:var(--tag-small-size-text-weight);font-size:var(--tag-small-size-text-size);line-height:var(--tag-small-size-text-leading);letter-spacing:var(--tag-small-size-text-tracking);text-transform:var(--tag-small-size-text-case)}:host([size=\"small\"],.has-icon){padding:var(--tag-small-size-with-icon-format-top-padding)\n        var(--tag-small-size-with-icon-format-right-padding)\n        var(--tag-small-size-with-icon-format-bottom-padding)\n        var(--tag-small-size-with-icon-format-left-padding)}:host([size=\"medium\"]){gap:var(--tag-medium-size-horizontal-spacing);min-height:var(--tag-medium-size-minimum-height);padding:var(--tag-medium-size-basic-format-top-padding)\n      var(--tag-medium-size-basic-format-right-padding)\n      var(--tag-medium-size-basic-format-bottom-padding)\n      var(--tag-medium-size-basic-format-left-padding);border-radius:calc(var(--tag-medium-size-minimum-height) / 2);font-weight:var(--tag-medium-size-text-weight);font-size:var(--tag-medium-size-text-size);line-height:var(--tag-medium-size-text-leading);letter-spacing:var(--tag-medium-size-text-tracking);text-transform:var(--tag-medium-size-text-case)}:host([size=\"medium\"],.has-icon){padding:var(--tag-medium-size-with-icon-format-top-padding)\n        var(--tag-medium-size-with-icon-format-right-padding)\n        var(--tag-medium-size-with-icon-format-bottom-padding)\n        var(--tag-medium-size-with-icon-format-left-padding)}svg.remove-indicator,::slotted([slot=\"icon\"]){flex-shrink:0}::slotted([slot=\"icon\"]){fill:var(--tag-normal-state-icon-color)}svg.remove-indicator{fill:var(--tag-normal-state-remove-indicator-color)}@media (hover: hover){:host(:hover){background-color:var(--tag-hover-state-background-color);color:var(--tag-hover-state-label-color)}:host(:hover) ::slotted([slot=\"icon\"]){fill:var(--tag-hover-state-icon-color)}:host(:hover) svg.remove-indicator{fill:var(--tag-hover-state-remove-indicator-color)}}:host(:active){background-color:var(--tag-pressed-state-background-color);color:var(--tag-pressed-state-label-color)}:host(:active) ::slotted([slot=\"icon\"]){fill:var(--tag-pressed-state-icon-color)}:host(:active) svg.remove-indicator{fill:var(--tag-pressed-state-remove-indicator-color)}:host(:focus),:host([focused]){background-color:var(--tag-focus-state-background-color);color:var(--tag-focus-state-label-color)}:host(:focus) ::slotted([slot=\"icon\"]),:host([focused]) ::slotted([slot=\"icon\"]){fill:var(--tag-focus-state-icon-color)}:host(:focus) svg.remove-indicator,:host([focused]) svg.remove-indicator{fill:var(--tag-focus-state-remove-indicator-color)}:host([disabled]){background-color:var(--tag-disabled-state-background-color);color:var(--tag-disabled-state-label-color)}:host([disabled]) ::slotted([slot=\"icon\"]){fill:var(--tag-disabled-state-icon-color)}:host([disabled]) svg.remove-indicator{fill:var(--tag-disabled-state-remove-indicator-color)}";
const MarketTagStyle0 = marketTagCss;

const MarketTag$1 = /*@__PURE__*/ proxyCustomElement(class MarketTag extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketTagDismissed = createEvent(this, "marketTagDismissed", 7);
        this.disabled = false;
        this.focused = false;
        this.size = 'small';
        this.hasIcon = false;
    }
    /* handles click and unclick in tag */
    onFocus() {
        if (this.disabled) {
            return;
        }
        if (!this.focused) {
            this.focused = true;
        }
        else {
            this.focused = false;
        }
    }
    handleDismissTagEvent(e) {
        this.marketTagDismissed.emit();
        e.stopPropagation();
        this.el.remove();
    }
    componentWillLoad() {
        this.hasIcon = Boolean(this.el.querySelector('[slot="icon"]'));
    }
    render() {
        return (h(Host, { key: '9588fafee1306f4e8fd89988093e4fb13afe38a5', class: `market-tag ${this.hasIcon ? 'has-icon' : ''}`, onClick: () => {
                this.onFocus();
            }, onFocus: () => {
                this.onFocus();
            }, "aria-disabled": this.disabled }, h("span", { key: '1499efc8496c40be712260fdcd91d23715aec3ab', class: "icon" }, h("slot", { key: 'e96de4aeb44f76d18c76daad4e847a6df4a60b2c', name: "icon" })), h("slot", { key: '037db2c8139ae0286ad1aded9f7ac7b35855c21d' }), h("svg", { key: '49798505faaf489b65a409e3caaf213480555eba', class: "remove-indicator", width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", onClick: (e) => this.handleDismissTagEvent(e) }, h("path", { key: '1b0443049e52349ed740a3afba862645f38a7745', d: "M4.4734 12.4734L8.00007 8.94002L11.5267 12.4734L12.4734 11.5267L8.94007 8.00002L12.4734 4.47335L11.5267 3.52669L8.00007 7.06002L4.4734 3.52669L3.52673 4.47335L7.06007 8.00002L3.52673 11.5267L4.4734 12.4734Z" }))));
    }
    get el() { return this; }
    static get style() { return MarketTagStyle0; }
}, [1, "market-tag", {
        "disabled": [516],
        "focused": [1540],
        "size": [513],
        "hasIcon": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-tag"];
    components.forEach(tagName => { switch (tagName) {
        case "market-tag":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketTag$1);
            }
            break;
    } });
}

const MarketTag = MarketTag$1;
const defineCustomElement = defineCustomElement$1;

export { MarketTag, defineCustomElement };

//# sourceMappingURL=market-tag.js.map