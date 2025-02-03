import { h, proxyCustomElement, HTMLElement, Host } from '@stencil/core/internal/client';

const getSuccessIcon = () => (h("svg", { class: "icon", width: "20", height: "20", viewBox: "-2 -2 26 26", xmlns: "http://www.w3.org/2000/svg" },
    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12ZM5 12C5 15.86 8.14 19 12 19C15.86 19 19 15.86 19 12C19 8.14 15.86 5 12 5C8.14 5 5 8.14 5 12ZM8.71005 10.8L11 13.09L15.3101 8.80005L16.72 10.21L11.72 15.21C11.52 15.4 11.27 15.5 11.01 15.5C10.75 15.5 10.5 15.41 10.3 15.21L7.30005 12.21L8.71005 10.8Z" })));
const getInfoIcon = () => (h("svg", { class: "icon", width: "20", height: "20", viewBox: "-2 -2 26 26", xmlns: "http://www.w3.org/2000/svg" },
    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19ZM11 10.5V17H13V10.5H11ZM13.25 8.25C13.25 8.94036 12.6904 9.5 12 9.5C11.3096 9.5 10.75 8.94036 10.75 8.25C10.75 7.55964 11.3096 7 12 7C12.6904 7 13.25 7.55964 13.25 8.25Z" })));
const getWarningIcon = () => (h("svg", { class: "icon", width: "20", height: "20", viewBox: "-2 -2 26 26", xmlns: "http://www.w3.org/2000/svg" },
    h("path", { d: "M11 9.00005H13V14.5H11V9.00005Z" }),
    h("path", { d: "M12 18C12.6904 18 13.25 17.4404 13.25 16.75C13.25 16.0596 12.6904 15.5 12 15.5C11.3096 15.5 10.75 16.0596 10.75 16.75C10.75 17.4404 11.3096 18 12 18Z" }),
    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.866 2.17944C12.6874 1.87004 12.3573 1.67944 12 1.67944C11.6427 1.67944 11.3126 1.87004 11.134 2.17944L1.13397 19.5C0.955342 19.8094 0.955342 20.1905 1.13397 20.5C1.31261 20.8094 1.64273 21 2 21H22C22.3573 21 22.6874 20.8094 22.866 20.5C23.0447 20.1905 23.0447 19.8094 22.866 19.5L12.866 2.17944ZM12 4.67944L20.268 19H3.73205L12 4.67944Z" })));
const getCriticalIcon = () => (h("svg", { class: "icon", width: "20", height: "20", viewBox: "-2 -2 26 26", xmlns: "http://www.w3.org/2000/svg" },
    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21ZM12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5ZM12 17C12.6904 17 13.25 16.4404 13.25 15.75C13.25 15.0596 12.6904 14.5 12 14.5C11.3096 14.5 10.75 15.0596 10.75 15.75C10.75 16.4404 11.3096 17 12 17ZM11 7H13V13.5H11V7Z" })));

const marketInlineStatusCss = ":host{display:flex;align-items:flex-start;font-weight:var(--inline-status-normal-size-text-weight);font-size:var(--inline-status-normal-size-text-size);font-family:var(--inline-status-normal-size-text-font-family);line-height:var(--inline-status-normal-size-text-leading);letter-spacing:var(--inline-status-normal-size-text-tracking);text-transform:var(--inline-status-normal-size-text-case)}:host .icon,:host ::slotted([slot=\"icon\"]){flex-shrink:0;margin-right:var(--inline-status-normal-size-spacing-horizontal)}:host([variant=\"info\"]){color:var(--core-text-20-color)}:host([variant=\"info\"]) .icon,:host([variant=\"info\"]) ::slotted([slot=\"icon\"]){fill:var(--core-fill-20-color)}:host([variant=\"critical\"]){color:var(--inline-status-error-variant-icon-color)}:host([variant=\"critical\"]) .icon,:host([variant=\"critical\"]) ::slotted([slot=\"icon\"]){fill:var(--inline-status-error-variant-text-color)}:host([variant=\"success\"]){color:var(--inline-status-success-variant-icon-color)}:host([variant=\"success\"]) .icon,:host([variant=\"success\"]) ::slotted([slot=\"icon\"]){fill:var(--inline-status-success-variant-text-color)}:host([variant=\"warning\"]){color:var(--inline-status-warning-variant-icon-color)}:host([variant=\"warning\"]) .icon,:host([variant=\"warning\"]) ::slotted([slot=\"icon\"]){fill:var(--inline-status-warning-variant-icon-color)}";
const MarketInlineStatusStyle0 = marketInlineStatusCss;

const MarketInlineStatus$1 = /*@__PURE__*/ proxyCustomElement(class MarketInlineStatus extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.variant = 'info';
    }
    render() {
        return (h(Host, { key: 'ce4428f0523ed96deb0f6167b96f87ed34bd64d1', class: "market-inline-status" }, h("slot", { key: 'd03865e2931b958cfb05f1224af729cd41eb095c', name: "icon" }, this.variant === 'info' && getInfoIcon(), this.variant === 'success' && getSuccessIcon(), this.variant === 'warning' && getWarningIcon(), this.variant === 'critical' && getCriticalIcon()), h("slot", { key: 'b830ce20c7ce9c407e5a14d46f97b80024b14168' })));
    }
    static get style() { return MarketInlineStatusStyle0; }
}, [1, "market-inline-status", {
        "variant": [513]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-inline-status"];
    components.forEach(tagName => { switch (tagName) {
        case "market-inline-status":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketInlineStatus$1);
            }
            break;
    } });
}

const MarketInlineStatus = MarketInlineStatus$1;
const defineCustomElement = defineCustomElement$1;

export { MarketInlineStatus, defineCustomElement };

//# sourceMappingURL=market-inline-status.js.map