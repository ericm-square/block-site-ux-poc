'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const classnames = require('./classnames-46cc7012.js');
const index$1 = require('./index-254d04f0.js');
const v4 = require('./v4-8e8d6fbc.js');

const marketBannerCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:flex;align-items:flex-start;width:100%;padding:var(--banner-vertical-padding) var(--banner-horizontal-padding);border-width:calc(var(--banner-border-width) * 1px);border-style:solid;border-radius:var(--banner-border-radius);font-weight:var(--banner-text-weight);font-size:var(--banner-text-size);line-height:var(--banner-text-leading);letter-spacing:var(--banner-text-tracking);text-transform:var(--banner-text-case);-moz-column-gap:var(--banner-icon-spacing);column-gap:var(--banner-icon-spacing)}.icon-container,.dismiss-container{display:flex;flex-shrink:0;align-items:center}.dismiss-container button{display:flex;justify-content:center;align-items:center;margin:0;padding:0;border:none;background-color:transparent;cursor:pointer;transition:opacity 0.2s;-webkit-appearance:none;-moz-appearance:none;appearance:none}.dismiss-container button svg{fill:var(--banner-dismiss-button-normal-state-color)}.dismiss-container button:active svg{fill:var(--banner-dismiss-button-pressed-state-color)}.main{display:flex;flex-grow:1;flex-wrap:wrap;row-gap:var(--banner-multiline-spacing);-moz-column-gap:var(--banner-content-spacing);column-gap:var(--banner-content-spacing)}.main.has-title{flex-direction:column}.main.has-title .actions{justify-content:unset}::slotted([slot=\"title\"]){margin:0;font-weight:var(--banner-title-weight);font-size:var(--banner-title-size);font-family:inherit;line-height:var(--banner-title-leading);letter-spacing:var(--banner-title-tracking);text-transform:var(--banner-title-case)}section{flex-grow:1}nav{display:flex;flex-wrap:wrap;justify-content:flex-end}nav.hidden{display:none}::slotted(a),::slotted(button){margin:0;padding:0;border:none;background-color:transparent;font-weight:var(--banner-button-text-weight);font-size:var(--banner-button-text-size);font-family:inherit;line-height:var(--banner-button-text-leading);letter-spacing:var(--banner-button-text-tracking);text-decoration:none;text-transform:var(--banner-button-text-case);cursor:pointer;transition:opacity 0.2s}::slotted(a:hover),::slotted(button:hover){opacity:var(--text-link-hover-state-opacity)}::slotted(a:active),::slotted(button:active){opacity:var(--text-link-pressed-state-opacity)}::slotted([slot=\"action\"]){display:flex;justify-content:center;align-items:center}::slotted([slot=\"action\"]:not(:last-child)){margin-right:calc(var(--banner-button-spacing) * 2 + var(--banner-button-separator-width))}::slotted([slot=\"action\"]:not(:last-child))::after{content:\"\";display:inline-block;width:var(--banner-button-separator-width);height:var(--banner-button-separator-height);margin-right:calc(-1 * var(--banner-button-spacing) - var(--banner-button-separator-width));margin-left:var(--banner-button-spacing);background-color:var(--banner-button-separator-color);opacity:var(--banner-button-separator-opacity);pointer-events:none}:host([variant=\"info\"]){border-color:var(--banner-info-variant-border-color);background-color:var(--banner-info-variant-background-color);color:var(--banner-info-variant-text-color)}:host([variant=\"info\"]) .icon-container svg,:host([variant=\"info\"]) ::slotted([slot=\"icon\"]){fill:var(--banner-info-variant-icon-color)}:host([variant=\"info\"]) ::slotted(a){color:var(--banner-info-variant-text-link-text-color)}:host([variant=\"info\"]) ::slotted(button){color:var(--banner-info-variant-button-text-color)}:host([variant=\"success\"]){border-color:var(--banner-success-variant-border-color);background-color:var(--banner-success-variant-background-color);color:var(--banner-success-variant-text-color)}:host([variant=\"success\"]) .icon-container svg,:host([variant=\"success\"]) ::slotted([slot=\"icon\"]){fill:var(--banner-success-variant-icon-color)}:host([variant=\"success\"]) ::slotted(a){color:var(--banner-success-variant-text-link-text-color)}:host([variant=\"success\"]) ::slotted(button){color:var(--banner-success-variant-button-text-color)}:host([variant=\"warning\"]){border-color:var(--banner-warning-variant-border-color);background-color:var(--banner-warning-variant-background-color);color:var(--banner-warning-variant-text-color)}:host([variant=\"warning\"]) .icon-container svg,:host([variant=\"warning\"]) ::slotted([slot=\"icon\"]){fill:var(--banner-warning-variant-icon-color)}:host([variant=\"warning\"]) ::slotted(a){color:var(--banner-warning-variant-text-link-text-color)}:host([variant=\"warning\"]) ::slotted(button){color:var(--banner-warning-variant-button-text-color)}:host([variant=\"critical\"]){border-color:var(--banner-critical-variant-border-color);background-color:var(--banner-critical-variant-background-color);color:var(--banner-critical-variant-text-color)}:host([variant=\"critical\"]) .icon-container svg,:host([variant=\"critical\"]) ::slotted([slot=\"icon\"]){fill:var(--banner-critical-variant-icon-color)}:host([variant=\"critical\"]) ::slotted(a){color:var(--banner-critical-variant-text-color)}:host([variant=\"critical\"]) ::slotted(button){color:var(--banner-critical-variant-button-text-color)}:host([variant=\"insight\"]){border-color:var(--banner-insight-variant-border-color);background-color:var(--banner-insight-variant-background-color);color:var(--banner-insight-variant-text-color)}:host([variant=\"insight\"]) .icon-container svg,:host([variant=\"insight\"]) ::slotted([slot=\"icon\"]){fill:var(--banner-insight-variant-icon-color)}:host([variant=\"insight\"]) ::slotted(a){color:var(--banner-insight-variant-text-link-text-color)}:host([variant=\"insight\"]) ::slotted(button){color:var(--banner-insight-variant-button-text-color)}";
const MarketBannerStyle0 = marketBannerCss;

const MarketBanner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketBannerDismissed = index.createEvent(this, "marketBannerDismissed", 7);
        this.iconImageTitleId = v4.v4();
        this.variant = 'info';
        this.dismissable = false;
        this.dismissButtonAriaLabel = 'Dismiss';
        this.iconImageTitle = '';
        this.hasTitle = false;
        this.hasAction = false;
    }
    renderIcon() {
        if (this.variant === 'success') {
            return (index.h("svg", { role: "img", "aria-labelledby": this.iconImageTitleId, width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, index.h("title", { id: this.iconImageTitleId }, this.iconImageTitle || 'Success'), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12ZM5 12C5 15.86 8.14 19 12 19C15.86 19 19 15.86 19 12C19 8.14 15.86 5 12 5C8.14 5 5 8.14 5 12ZM8.71005 10.8L11 13.09L15.3101 8.80005L16.72 10.21L11.72 15.21C11.52 15.4 11.27 15.5 11.01 15.5C10.75 15.5 10.5 15.41 10.3 15.21L7.30005 12.21L8.71005 10.8Z" })));
        }
        else if (this.variant === 'info') {
            return (index.h("svg", { role: "img", "aria-labelledby": this.iconImageTitleId, width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, index.h("title", { id: this.iconImageTitleId }, this.iconImageTitle || 'Info'), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19ZM11 10.5V17H13V10.5H11ZM13.25 8.25C13.25 8.94036 12.6904 9.5 12 9.5C11.3096 9.5 10.75 8.94036 10.75 8.25C10.75 7.55964 11.3096 7 12 7C12.6904 7 13.25 7.55964 13.25 8.25Z" })));
        }
        else if (this.variant === 'insight') {
            return (index.h("svg", { role: "img", "aria-labelledby": this.iconImageTitleId, width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, index.h("title", { id: this.iconImageTitleId }, this.iconImageTitle || 'Insight'), index.h("path", { d: "M11 23.1701V15.0001H3.07996L13 0.830078V9.00008H20.92L11 23.1701ZM6.91996 13.0001H13V16.8301L17.08 11.0001H11V7.17008L6.91996 13.0001Z" })));
        }
        else if (this.variant === 'warning') {
            return (index.h("svg", { role: "img", "aria-labelledby": this.iconImageTitleId, width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, index.h("title", { id: this.iconImageTitleId }, this.iconImageTitle || 'Warning'), index.h("path", { d: "M11 9.00005H13V14.5H11V9.00005Z" }), index.h("path", { d: "M12 18C12.6904 18 13.25 17.4404 13.25 16.75C13.25 16.0596 12.6904 15.5 12 15.5C11.3096 15.5 10.75 16.0596 10.75 16.75C10.75 17.4404 11.3096 18 12 18Z" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.866 2.17944C12.6874 1.87004 12.3573 1.67944 12 1.67944C11.6427 1.67944 11.3126 1.87004 11.134 2.17944L1.13397 19.5C0.955342 19.8094 0.955342 20.1905 1.13397 20.5C1.31261 20.8094 1.64273 21 2 21H22C22.3573 21 22.6874 20.8094 22.866 20.5C23.0447 20.1905 23.0447 19.8094 22.866 19.5L12.866 2.17944ZM12 4.67944L20.268 19H3.73205L12 4.67944Z" })));
        }
        else {
            return (index.h("svg", { role: "img", "aria-labelledby": this.iconImageTitleId, width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, index.h("title", { id: this.iconImageTitleId }, this.iconImageTitle || 'Critical'), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21ZM12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5ZM12 17C12.6904 17 13.25 16.4404 13.25 15.75C13.25 15.0596 12.6904 14.5 12 14.5C11.3096 14.5 10.75 15.0596 10.75 15.75C10.75 16.4404 11.3096 17 12 17ZM11 7H13V13.5H11V7Z" })));
        }
    }
    handleTitleSlotChange() {
        this.hasTitle = Boolean(this.el.querySelector('[slot="title"]'));
    }
    handleActionSlotChange() {
        this.hasAction = Boolean(this.el.querySelector('[slot="action"]'));
    }
    componentWillLoad() {
        this.handleTitleSlotChange();
        this.handleActionSlotChange();
    }
    dismiss() {
        const { defaultPrevented } = this.marketBannerDismissed.emit();
        if (defaultPrevented) {
            return;
        }
        this.el.remove();
    }
    render() {
        const MarketAccessoryTag = index$1.getNamespacedTagFor('market-accessory');
        return (index.h(index.Host, { key: 'ffb5574b44bc37b38d23efd7307d7415a4c3ceaf', class: "market-banner", role: "region", "aria-label": "Announcement" }, index.h("span", { key: '5935fe0a725184b2ec2a7a0dfdf23173f5252869', class: "icon-container" }, index.h("slot", { key: 'fcbf0a6047b5050c61a579635357a83d77d64926', name: "icon" }, index.h(MarketAccessoryTag, { key: '2bd70945af27aa5abdf98fe9cc58b9b0dd8bb628' }, this.renderIcon()))), index.h("div", { key: '62ef145918434a57336b3c111ddc36cce75370c0', class: classnames.classNames('main', { 'has-title': this.hasTitle }) }, index.h("section", { key: '3da66ddffb51bf5e5f901ceb375db16ad64ccd3a' }, index.h("header", { key: '2c5e807ae88351662d1fa2a8df9ad4d18c0048ee', class: "title" }, index.h("slot", { key: '69a3be7dd31ff30c99c1340365e8a287c6b796dd', name: "title", onSlotchange: () => this.handleTitleSlotChange() })), index.h("slot", { key: '2c67b3f1c634f981caad07ebb1d55ac4b6036a3c' })), index.h("nav", { key: '09220d97def465dbd2df1a9f7c48369dc78aa1a1', class: classnames.classNames('actions', { hidden: !this.hasAction }) }, index.h("slot", { key: 'e59da0a55031ad40136cf1266d4576b659364c67', name: "action", onSlotchange: () => this.handleActionSlotChange() }))), this.dismissable && (index.h("nav", { key: 'c075f617de3956f6cd0f63af1b37b6c314625250', class: "dismiss-container" }, index.h("button", { key: '19211edf4ff14faba7ff45dad9d7eb59995b9a79', type: "button", "aria-label": this.dismissButtonAriaLabel, onClick: () => this.dismiss() }, index.h("svg", { key: 'd0653fc50daff8e3335b59a2df41dd44b450e7ca', role: "presentation", "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { key: '40960b4f1d753ae6422f23e6be4969fa65ca37a6', d: "M6.71004 18.71L12 13.41L17.29 18.71L18.71 17.29L13.41 12L18.71 6.71004L17.29 5.29004L12 10.59L6.71004 5.29004L5.29004 6.71004L10.59 12L5.29004 17.29L6.71004 18.71Z" })))))));
    }
    get el() { return index.getElement(this); }
};
MarketBanner.style = MarketBannerStyle0;

exports.market_banner = MarketBanner;

//# sourceMappingURL=market-banner.cjs.entry.js.map