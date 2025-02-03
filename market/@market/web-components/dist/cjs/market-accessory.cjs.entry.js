'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');

const marketAccessoryCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:flex;justify-content:center;align-items:center}:host([size=\"icon\"]){width:var(--accessory-icon-variant-medium-size-width);height:var(--accessory-icon-variant-medium-size-height)}:host([size=\"image\"]){width:var(--accessory-medium-size-width);height:var(--accessory-medium-size-height)}:host ::slotted(.market-icon){}:host ::slotted(img){-o-object-fit:cover;object-fit:cover;width:100%;height:100%}:host([size=\"icon\"]) ::slotted(img){border-radius:var(--accessory-background-radius)}:host([size=\"image\"]) ::slotted(img){border-radius:var(--accessory-background-radius)}";
const MarketAccessoryStyle0 = marketAccessoryCss;

const MarketAccessory = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.size = undefined;
    }
    /* TODO: add optional height/width props for custom sizing of slotted image */
    render() {
        return (index.h(index.Host, { key: 'ce321a0739c785b655c6483c94ace4248f7adcbb', class: "market-accessory", size: this.size }, index.h("slot", { key: '4190735a507d572868ad9f54da6a6039a66794e5' })));
    }
};
MarketAccessory.style = MarketAccessoryStyle0;

exports.market_accessory = MarketAccessory;

//# sourceMappingURL=market-accessory.cjs.entry.js.map