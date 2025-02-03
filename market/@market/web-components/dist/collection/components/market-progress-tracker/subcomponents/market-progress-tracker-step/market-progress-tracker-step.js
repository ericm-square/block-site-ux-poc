import { Host, h, Fragment } from "@stencil/core";
import { getIcon } from "./icons";
import { classNames } from "../../../../utils/classnames";
import { getNamespacedTagFor } from "../../../../utils/namespace";
/**
 * @slot label - Primary text for the step
 * @slot subtext - Secondary text for the step
 * @part icon - The `<market-accessory>` that contains the custom icon indicator
 * @part content - The container for the text content
 * @part button - The clickable part when interactive and on horizontal orientation
 */
export class MarketProgressTrackerStep {
    constructor() {
        this.active = false;
        this.compact = false;
        this.connector = undefined;
        this.completed = false;
        this.indicator = 'circle';
        this.interactive = false;
        this.name = undefined;
        this.orientation = 'vertical';
        this.size = 'medium';
        this.defaultIcon = undefined;
    }
    /**
     * Updates the default icon based on the following attributes
     */
    updateDefaultIcon() {
        const { active, completed, el, indicator, orientation } = this;
        const slottedIcon = [...el.children].some((e) => e.slot === 'icon');
        if (slottedIcon) {
            this.defaultIcon = null;
        }
        else {
            this.defaultIcon = getIcon({ active, completed, indicator, orientation });
        }
    }
    handleClick() {
        const { el, interactive, marketProgressTrackerStepClick, name } = this;
        if (interactive) {
            marketProgressTrackerStepClick.emit({
                index: el.dataset.stepIndex !== undefined ? Number.parseInt(el.dataset.stepIndex, 10) : null,
                name: name !== null && name !== void 0 ? name : null,
            });
        }
    }
    connectedCallback() {
        this.updateDefaultIcon();
    }
    render() {
        const { defaultIcon, handleClick, interactive, orientation, updateDefaultIcon } = this;
        const MarketAccessoryTagName = getNamespacedTagFor('market-accessory');
        const HorizontalWrapperTagName = interactive ? 'button' : 'div';
        const renderContent = () => {
            return (h(Fragment, null, h("div", { class: classNames('icon', { 'custom-icon': Boolean(!defaultIcon) }), part: "icon" }, h("slot", { name: "icon", onSlotchange: updateDefaultIcon.bind(this) }, h(MarketAccessoryTagName, null, defaultIcon))), h("div", { class: "content", part: "content" }, h("slot", { name: "label" }), h("slot", { name: "subtext" }), h("slot", null))));
        };
        return (h(Host, { class: "market-progress-tracker-step", role: orientation === 'horizontal' ? 'presentation' : 'listitem' }, orientation === 'horizontal' ? (h(HorizontalWrapperTagName, { class: interactive ? 'button' : 'label', onClick: interactive ? handleClick.bind(this) : null, part: interactive ? 'button' : null, role: interactive ? 'tab' : 'listitem' }, renderContent())) : (renderContent())));
    }
    static get is() { return "market-progress-tracker-step"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["./styles/market-progress-tracker-step.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["styles/market-progress-tracker-step.css"]
        };
    }
    static get properties() {
        return {
            "active": {
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
                    "tags": [{
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Whether the step is active"
                },
                "attribute": "active",
                "reflect": true,
                "defaultValue": "false"
            },
            "compact": {
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
                    "tags": [{
                            "name": "internal",
                            "text": "Whether the step is in compact mode\n\nOnly functional when `orientation` is set to `\"horizontal\"`"
                        }, {
                            "name": "default",
                            "text": "false"
                        }],
                    "text": ""
                },
                "attribute": "compact",
                "reflect": true,
                "defaultValue": "false"
            },
            "connector": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'active' | 'hidden' | 'inactive'",
                    "resolved": "\"active\" | \"hidden\" | \"inactive\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "Type of connector displayed between steps"
                        }, {
                            "name": "default",
                            "text": "undefined"
                        }],
                    "text": ""
                },
                "attribute": "connector",
                "reflect": true
            },
            "completed": {
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
                    "tags": [{
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Whether the step is completed"
                },
                "attribute": "completed",
                "reflect": true,
                "defaultValue": "false"
            },
            "indicator": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'circle' | 'check'",
                    "resolved": "\"check\" | \"circle\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "Type of icon used to indicate the step\u2019s progress\n\nThis is disregarded when a custom icon is slotted via the `icon` slot."
                        }, {
                            "name": "default",
                            "text": "'circle'"
                        }],
                    "text": ""
                },
                "attribute": "indicator",
                "reflect": false,
                "defaultValue": "'circle'"
            },
            "interactive": {
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
                    "tags": [{
                            "name": "internal",
                            "text": "Whether the step is interactive\n\nOnly functional when `orientation` is set to `\"horizontal\"`"
                        }, {
                            "name": "default",
                            "text": "false"
                        }],
                    "text": ""
                },
                "attribute": "interactive",
                "reflect": true,
                "defaultValue": "false"
            },
            "name": {
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
                    "tags": [{
                            "name": "default",
                            "text": "undefined"
                        }],
                    "text": "Unique name of the step\n\nWhen this step is interactive and clicked, it is included in the detail of the emitted event."
                },
                "attribute": "name",
                "reflect": false
            },
            "orientation": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'vertical' | 'horizontal'",
                    "resolved": "\"horizontal\" | \"vertical\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "Affects the step\u2019s appearance"
                        }, {
                            "name": "default",
                            "text": "'vertical'"
                        }],
                    "text": ""
                },
                "attribute": "orientation",
                "reflect": true,
                "defaultValue": "'vertical'"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'small' | 'medium' | 'large'",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "Step\u2019s size"
                        }, {
                            "name": "default",
                            "text": "'medium'"
                        }],
                    "text": ""
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'medium'"
            }
        };
    }
    static get states() {
        return {
            "defaultIcon": {}
        };
    }
    static get events() {
        return [{
                "method": "marketProgressTrackerStepClick",
                "name": "marketProgressTrackerStepClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when this step is clicked"
                },
                "complexType": {
                    "original": "TMarketProgressTrackerStepClickEventDetail",
                    "resolved": "{ index: number; name: string; }",
                    "references": {
                        "TMarketProgressTrackerStepClickEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-progress-tracker/subcomponents/market-progress-tracker-step/events.ts::TMarketProgressTrackerStepClickEventDetail"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "active",
                "methodName": "updateDefaultIcon"
            }, {
                "propName": "completed",
                "methodName": "updateDefaultIcon"
            }, {
                "propName": "indicator",
                "methodName": "updateDefaultIcon"
            }, {
                "propName": "orientation",
                "methodName": "updateDefaultIcon"
            }];
    }
}
//# sourceMappingURL=market-progress-tracker-step.js.map
