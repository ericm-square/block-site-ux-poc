import { Host, h } from "@stencil/core";
import { v4 as uuid } from "uuid";
import { classNames } from "../../utils/classnames";
import { getNamespacedTagFor } from "../../utils/namespace";
/**
 * @slot - The text for the banner
 * @slot title - Optional title text for the banner
 * @slot action - for `<a href>` or `<button>` (not a `<market-button>`)
 * @slot icon - for use with a custom icon
 */
export class MarketBanner {
    constructor() {
        this.iconImageTitleId = uuid();
        this.variant = 'info';
        this.dismissable = false;
        this.dismissButtonAriaLabel = 'Dismiss';
        this.iconImageTitle = '';
        this.hasTitle = false;
        this.hasAction = false;
    }
    renderIcon() {
        if (this.variant === 'success') {
            return (h("svg", { role: "img", "aria-labelledby": this.iconImageTitleId, width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("title", { id: this.iconImageTitleId }, this.iconImageTitle || 'Success'), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12ZM5 12C5 15.86 8.14 19 12 19C15.86 19 19 15.86 19 12C19 8.14 15.86 5 12 5C8.14 5 5 8.14 5 12ZM8.71005 10.8L11 13.09L15.3101 8.80005L16.72 10.21L11.72 15.21C11.52 15.4 11.27 15.5 11.01 15.5C10.75 15.5 10.5 15.41 10.3 15.21L7.30005 12.21L8.71005 10.8Z" })));
        }
        else if (this.variant === 'info') {
            return (h("svg", { role: "img", "aria-labelledby": this.iconImageTitleId, width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("title", { id: this.iconImageTitleId }, this.iconImageTitle || 'Info'), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19ZM11 10.5V17H13V10.5H11ZM13.25 8.25C13.25 8.94036 12.6904 9.5 12 9.5C11.3096 9.5 10.75 8.94036 10.75 8.25C10.75 7.55964 11.3096 7 12 7C12.6904 7 13.25 7.55964 13.25 8.25Z" })));
        }
        else if (this.variant === 'insight') {
            return (h("svg", { role: "img", "aria-labelledby": this.iconImageTitleId, width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("title", { id: this.iconImageTitleId }, this.iconImageTitle || 'Insight'), h("path", { d: "M11 23.1701V15.0001H3.07996L13 0.830078V9.00008H20.92L11 23.1701ZM6.91996 13.0001H13V16.8301L17.08 11.0001H11V7.17008L6.91996 13.0001Z" })));
        }
        else if (this.variant === 'warning') {
            return (h("svg", { role: "img", "aria-labelledby": this.iconImageTitleId, width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("title", { id: this.iconImageTitleId }, this.iconImageTitle || 'Warning'), h("path", { d: "M11 9.00005H13V14.5H11V9.00005Z" }), h("path", { d: "M12 18C12.6904 18 13.25 17.4404 13.25 16.75C13.25 16.0596 12.6904 15.5 12 15.5C11.3096 15.5 10.75 16.0596 10.75 16.75C10.75 17.4404 11.3096 18 12 18Z" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.866 2.17944C12.6874 1.87004 12.3573 1.67944 12 1.67944C11.6427 1.67944 11.3126 1.87004 11.134 2.17944L1.13397 19.5C0.955342 19.8094 0.955342 20.1905 1.13397 20.5C1.31261 20.8094 1.64273 21 2 21H22C22.3573 21 22.6874 20.8094 22.866 20.5C23.0447 20.1905 23.0447 19.8094 22.866 19.5L12.866 2.17944ZM12 4.67944L20.268 19H3.73205L12 4.67944Z" })));
        }
        else {
            return (h("svg", { role: "img", "aria-labelledby": this.iconImageTitleId, width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("title", { id: this.iconImageTitleId }, this.iconImageTitle || 'Critical'), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21ZM12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5ZM12 17C12.6904 17 13.25 16.4404 13.25 15.75C13.25 15.0596 12.6904 14.5 12 14.5C11.3096 14.5 10.75 15.0596 10.75 15.75C10.75 16.4404 11.3096 17 12 17ZM11 7H13V13.5H11V7Z" })));
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
        const MarketAccessoryTag = getNamespacedTagFor('market-accessory');
        return (h(Host, { key: 'ffb5574b44bc37b38d23efd7307d7415a4c3ceaf', class: "market-banner", role: "region", "aria-label": "Announcement" }, h("span", { key: '5935fe0a725184b2ec2a7a0dfdf23173f5252869', class: "icon-container" }, h("slot", { key: 'fcbf0a6047b5050c61a579635357a83d77d64926', name: "icon" }, h(MarketAccessoryTag, { key: '2bd70945af27aa5abdf98fe9cc58b9b0dd8bb628' }, this.renderIcon()))), h("div", { key: '62ef145918434a57336b3c111ddc36cce75370c0', class: classNames('main', { 'has-title': this.hasTitle }) }, h("section", { key: '3da66ddffb51bf5e5f901ceb375db16ad64ccd3a' }, h("header", { key: '2c5e807ae88351662d1fa2a8df9ad4d18c0048ee', class: "title" }, h("slot", { key: '69a3be7dd31ff30c99c1340365e8a287c6b796dd', name: "title", onSlotchange: () => this.handleTitleSlotChange() })), h("slot", { key: '2c67b3f1c634f981caad07ebb1d55ac4b6036a3c' })), h("nav", { key: '09220d97def465dbd2df1a9f7c48369dc78aa1a1', class: classNames('actions', { hidden: !this.hasAction }) }, h("slot", { key: 'e59da0a55031ad40136cf1266d4576b659364c67', name: "action", onSlotchange: () => this.handleActionSlotChange() }))), this.dismissable && (h("nav", { key: 'c075f617de3956f6cd0f63af1b37b6c314625250', class: "dismiss-container" }, h("button", { key: '19211edf4ff14faba7ff45dad9d7eb59995b9a79', type: "button", "aria-label": this.dismissButtonAriaLabel, onClick: () => this.dismiss() }, h("svg", { key: 'd0653fc50daff8e3335b59a2df41dd44b450e7ca', role: "presentation", "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '40960b4f1d753ae6422f23e6be4969fa65ca37a6', d: "M6.71004 18.71L12 13.41L17.29 18.71L18.71 17.29L13.41 12L18.71 6.71004L17.29 5.29004L12 10.59L6.71004 5.29004L5.29004 6.71004L10.59 12L5.29004 17.29L6.71004 18.71Z" })))))));
    }
    static get is() { return "market-banner"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-banner.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-banner.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'info' | 'success' | 'warning' | 'critical' | 'insight'",
                    "resolved": "\"critical\" | \"info\" | \"insight\" | \"success\" | \"warning\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "banner variant that corresponds to the type of info it is conveying"
                },
                "attribute": "variant",
                "reflect": true,
                "defaultValue": "'info'"
            },
            "dismissable": {
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
                    "text": "whether to show the dismiss \"x\" or not"
                },
                "attribute": "dismissable",
                "reflect": true,
                "defaultValue": "false"
            },
            "dismissButtonAriaLabel": {
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
                    "text": "Optional property to pass a string to the dismiss \"x\"\nthat will function as its aria-label. Defaults to \"Dismiss\"."
                },
                "attribute": "dismiss-button-aria-label",
                "reflect": true,
                "defaultValue": "'Dismiss'"
            },
            "iconImageTitle": {
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
                    "text": "Title for the icon image, used as the accessible name for the icon.\nIf a custom icon is provided, this prop is ignored."
                },
                "attribute": "icon-image-title",
                "reflect": false,
                "defaultValue": "''"
            }
        };
    }
    static get states() {
        return {
            "hasTitle": {},
            "hasAction": {}
        };
    }
    static get events() {
        return [{
                "method": "marketBannerDismissed",
                "name": "marketBannerDismissed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the banner's dismiss button is clicked."
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
//# sourceMappingURL=market-banner.js.map
