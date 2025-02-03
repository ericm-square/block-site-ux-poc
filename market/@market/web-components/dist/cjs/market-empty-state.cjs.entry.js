'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');

const marketEmptyStateCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:flex;flex-direction:column;gap:var(--empty-state-button-group-vertical-spacing);justify-content:center;align-items:center;width:100%;padding:var(--empty-state-vertical-padding) var(--empty-state-horizontal-padding);border-width:calc(var(--empty-state-border-width) * 1px);border-style:solid;border-color:var(--core-fill-40-color);border-radius:var(--empty-state-border-radius);background-color:var(--empty-state-background-color)}.text{display:flex;flex-direction:column;gap:var(--empty-state-paragraph-vertical-spacing);width:100%;max-width:var(--empty-state-text-maximum-width, 600px);margin:0 auto;text-align:center}.text ::slotted([slot=\"primary-text\"]),.text ::slotted([slot=\"secondary-text\"]){margin:0;font-family:inherit}.text ::slotted([slot=\"primary-text\"]){color:var(--empty-state-heading-color);font-weight:var(--empty-state-heading-text-weight);font-size:var(--empty-state-heading-text-size);line-height:var(--empty-state-heading-text-leading)}.text ::slotted([slot=\"secondary-text\"]){color:var(--empty-state-paragraph-color);font-weight:var(--empty-state-paragraph-text-weight);font-size:var(--empty-state-paragraph-text-size);line-height:var(--empty-state-paragraph-text-leading)}.actions{display:flex;flex-direction:row;gap:var(--empty-state-actions-spacing, var(--core-metrics-spacing-200));}";
const MarketEmptyStateStyle0 = marketEmptyStateCss;

const MarketEmptyState = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * Whether or not `.actions` will be displayed (if `actions` slot is provided)
         */
        this.showActions = false;
    }
    handleSlottedContent() {
        this.showActions = Boolean(this.el.querySelector('[slot="actions"]'));
    }
    componentWillRender() {
        this.handleSlottedContent();
    }
    render() {
        return (index.h(index.Host, { key: '54e7233386056a887b6bf5ddd92e3c807ccc1a0b', class: "market-empty-state" }, index.h("slot", { key: '853617bbee38b7d377c76ab6825001578adc2dc8' }), index.h("slot", { key: '6a4c5d3c4237b40f41469805c4bb87c278106f45', name: "media" }), index.h("div", { key: 'f0855c32819b9987229b443ea6300643339d8a05', class: "text" }, index.h("slot", { key: '5b8cb78b638507654b8bca5784805b67f355141b', name: "primary-text" }), index.h("slot", { key: '1752a55ddc654a3ad72ee5ba000b115b712bbaa3', name: "secondary-text" })), this.showActions && (index.h("div", { key: '8fe597e76e04a8814c16e2c3958ddf1e3d7faa6b', class: "actions" }, index.h("slot", { key: '6f05692706f359bd5b604f347ee2e98db1a98be8', name: "actions" })))));
    }
    get el() { return index.getElement(this); }
};
MarketEmptyState.style = MarketEmptyStateStyle0;

exports.market_empty_state = MarketEmptyState;

//# sourceMappingURL=market-empty-state.cjs.entry.js.map