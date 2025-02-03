'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');

const marketSegmentCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{--segmented-control-option-min-width:var(--core-small-size-minimum-height);display:flex;flex-direction:row;justify-content:center;align-items:center;min-width:var(--segmented-control-option-min-width);padding:var(--segmented-control-option-padding-vertical) var(--segmented-control-option-padding-horizontal);border-radius:var(--segmented-control-option-background-radius);color:var(--segmented-control-option-label-normal-state);font-weight:var(--segmented-control-option-label-weight);font-size:var(--segmented-control-option-label-size);line-height:var(--segmented-control-option-label-leading);letter-spacing:var(--segmented-control-option-label-tracking);text-align:center;cursor:pointer;transition:color var(--segmented-control-animation-duration)}:host([selected]){color:var(--segmented-control-option-label-selected-state);box-shadow:none !important;}:host([disabled]){background:var(--segmented-control-option-background-disabled-state-color);color:var(--segmented-control-option-label-disabled-state-color);cursor:not-allowed}:host(:hover:not([selected]):not([disabled])){color:var(--segmented-control-option-label-hover-state-color)}:host(:active:not([disabled])){color:var(--segmented-control-option-label-pressed-state-color)}";
const MarketSegmentStyle0 = marketSegmentCss;

const MarketSegment = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketSegmentSelectedChanged = index.createEvent(this, "marketSegmentSelectedChanged", 7);
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
        return (index.h(index.Host, { key: '9927e6b28aeeab4bb55f8ed43af995ff17ca009d', selected: this.selected, class: "market-segment", onClick: () => this.selectSegment() }, index.h("slot", { key: '705146bdc557b8eb2ff952c0c8dd1b8aedc6edcf' })));
    }
    get el() { return index.getElement(this); }
};
MarketSegment.style = MarketSegmentStyle0;

exports.market_segment = MarketSegment;

//# sourceMappingURL=market-segment.cjs.entry.js.map