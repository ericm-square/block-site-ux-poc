import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const marketSegmentCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--segmented-control-option-min-width:var(--core-small-size-minimum-height);display:flex;flex-direction:row;justify-content:center;align-items:center;min-width:var(--segmented-control-option-min-width);padding:var(--segmented-control-option-padding-vertical) var(--segmented-control-option-padding-horizontal);border-radius:var(--segmented-control-option-background-radius);color:var(--segmented-control-option-label-normal-state);font-weight:var(--segmented-control-option-label-weight);font-size:var(--segmented-control-option-label-size);line-height:var(--segmented-control-option-label-leading);letter-spacing:var(--segmented-control-option-label-tracking);text-align:center;cursor:pointer;transition:color var(--segmented-control-animation-duration)}:host([selected]){color:var(--segmented-control-option-label-selected-state);box-shadow:none !important;}:host([disabled]){background:var(--segmented-control-option-background-disabled-state-color);color:var(--segmented-control-option-label-disabled-state-color);cursor:not-allowed}:host(:hover:not([selected]):not([disabled])){color:var(--segmented-control-option-label-hover-state-color)}:host(:active:not([disabled])){color:var(--segmented-control-option-label-pressed-state-color)}";
const MarketSegmentStyle0 = marketSegmentCss;

const MarketSegment$1 = /*@__PURE__*/ proxyCustomElement(class MarketSegment extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketSegmentSelectedChanged = createEvent(this, "marketSegmentSelectedChanged", 7);
        this.disabled = false;
        this.value = undefined;
        this.selected = false;
    }
    setSelectedState(state) {
        this.selected = state;
        return Promise.resolve();
    }
    selectSegment() {
        if (this.selected || this.disabled) {
            return Promise.resolve();
        }
        this.marketSegmentSelectedChanged.emit();
        return Promise.resolve();
    }
    render() {
        return (h(Host, { key: '9927e6b28aeeab4bb55f8ed43af995ff17ca009d', selected: this.selected, class: "market-segment", onClick: () => this.selectSegment() }, h("slot", { key: '705146bdc557b8eb2ff952c0c8dd1b8aedc6edcf' })));
    }
    get el() { return this; }
    static get style() { return MarketSegmentStyle0; }
}, [1, "market-segment", {
        "disabled": [1540],
        "value": [1537],
        "selected": [32],
        "setSelectedState": [64],
        "selectSegment": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-segment"];
    components.forEach(tagName => { switch (tagName) {
        case "market-segment":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketSegment$1);
            }
            break;
    } });
}

const MarketSegment = MarketSegment$1;
const defineCustomElement = defineCustomElement$1;

export { MarketSegment, defineCustomElement };

//# sourceMappingURL=market-segment.js.map