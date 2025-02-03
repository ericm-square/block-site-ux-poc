import { Host, h } from "@stencil/core";
import { isElementWithTagName } from "../../utils/namespace";
import { pick } from "lodash-es";
/**
 * @slot - Default slot, intended to be slotted with `<market-progress-tracker-step>`s
 */
export class MarketProgressTracker {
    constructor() {
        this.compact = false;
        this.connectorless = false;
        this.currentStepIndex = undefined;
        this.indicator = undefined;
        this.interactive = false;
        this.orientation = 'vertical';
        this.reversed = false;
        this.size = 'medium';
    }
    marketProgressTrackerStepClickEventHandler(event) {
        const { defaultPrevented, detail: { index }, } = event;
        // state will be updated only if `currentStepIndex` is defined
        if (!defaultPrevented && this.currentStepIndex !== undefined) {
            this.currentStepIndex = index;
        }
    }
    currentStepIndexWatcher() {
        this.updateStepState();
    }
    reversedWatcher() {
        this.updateStepState();
    }
    otherPropsWatcher(newValue, propKey) {
        this.propagatePropsToSteps({ [propKey]: newValue });
    }
    get stepEls() {
        return [...this.el.children].filter((childEl) => isElementWithTagName(childEl, 'market-progress-tracker-step'));
    }
    updateStepState() {
        var _a;
        const { connectorless, currentStepIndex, reversed, stepEls } = this;
        const orderedSteps = reversed ? [...stepEls].reverse() : stepEls; // logical order
        // set `data-step-index` based on logical order
        orderedSteps.forEach((stepEl, index) => {
            stepEl.dataset.stepIndex = `${index}`;
        });
        // automatically updates steps’ `completed` and `active` states if `currentStepIndex` is defined
        if (currentStepIndex !== undefined) {
            orderedSteps.forEach((stepEl, index) => {
                stepEl.completed = index < currentStepIndex;
                stepEl.active = index === currentStepIndex;
            });
        }
        const activeIndex = (_a = currentStepIndex !== null && currentStepIndex !== void 0 ? currentStepIndex : orderedSteps.findIndex((stepEl) => stepEl.active)) !== null && _a !== void 0 ? _a : -1;
        stepEls.forEach((stepEl, index) => {
            if (index < stepEls.length - 1) {
                if (connectorless) {
                    stepEl.connector = null;
                }
                else if ((reversed && index >= stepEls.length - activeIndex - 1) || (!reversed && index < activeIndex)) {
                    stepEl.connector = 'active';
                }
                else {
                    stepEl.connector = 'inactive';
                }
            }
            else {
                /**
                 * visually hides the last item’s connector:
                 *  - null:   progress tracker is connectorless
                 *  - hidden: progress tracker has connectors, but only the last step’s connector is hidden
                 * note that this has styling implications
                 */
                stepEl.connector = connectorless ? null : 'hidden';
            }
        });
    }
    /**
     * Updates the steps’ props based on the provided prop-value pair(s)
     */
    propagatePropsToSteps(propValues) {
        this.stepEls.forEach((stepEl) => {
            var _a, _b, _c, _d, _e;
            stepEl.compact = (_a = propValues === null || propValues === void 0 ? void 0 : propValues.compact) !== null && _a !== void 0 ? _a : stepEl.compact;
            stepEl.indicator = (_b = propValues === null || propValues === void 0 ? void 0 : propValues.indicator) !== null && _b !== void 0 ? _b : stepEl.indicator;
            stepEl.interactive = (_c = propValues === null || propValues === void 0 ? void 0 : propValues.interactive) !== null && _c !== void 0 ? _c : stepEl.interactive;
            stepEl.orientation = (_d = propValues === null || propValues === void 0 ? void 0 : propValues.orientation) !== null && _d !== void 0 ? _d : stepEl.orientation;
            stepEl.size = (_e = propValues === null || propValues === void 0 ? void 0 : propValues.size) !== null && _e !== void 0 ? _e : stepEl.size;
        });
    }
    handleDefaultSlotChange() {
        this.propagatePropsToSteps(pick(this, 'compact', 'indicator', 'interactive', 'orientation', 'size'));
        this.updateStepState();
    }
    connectedCallback() {
        this.propagatePropsToSteps(pick(this, 'compact', 'indicator', 'interactive', 'orientation', 'size'));
        this.updateStepState();
    }
    render() {
        const { handleDefaultSlotChange, interactive } = this;
        return (h(Host, { key: '6641d3c058d83c786d2666dfce3992da9d3ef13c', class: "market-progress-tracker", role: interactive ? 'tablist' : 'list' }, h("slot", { key: '531a425b494e0a91a5845da60b4a155b9eccdc86', onSlotchange: handleDefaultSlotChange.bind(this) })));
    }
    static get is() { return "market-progress-tracker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-progress-tracker.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-progress-tracker.css"]
        };
    }
    static get properties() {
        return {
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
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Whether the progress tracker is in compact mode\n\nOnly functional when `orientation` is set to `\"horizontal\"`"
                },
                "attribute": "compact",
                "reflect": false,
                "defaultValue": "false"
            },
            "connectorless": {
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
                    "text": "Whether there are connectors displayed between steps"
                },
                "attribute": "connectorless",
                "reflect": false,
                "defaultValue": "false"
            },
            "currentStepIndex": {
                "type": "number",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "undefined"
                        }],
                    "text": "Index of the current step of the tracker\n\nWhen defined, the child `market-progress-tracker-step` components\u2019\n`active` and `completed` attributes will be automatically set.\n\nOtherwise, it is expected that the steps\u2019\n`active` and `completed` properties are manually set."
                },
                "attribute": "current-step-index",
                "reflect": true
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
                            "name": "default",
                            "text": "undefined"
                        }],
                    "text": "Type of icon used to indicate the step\u2019s progress"
                },
                "attribute": "indicator",
                "reflect": false
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
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Whether this step tracker is interactive\n\nOnly functional when `orientation` is set to `\"horizontal\"`"
                },
                "attribute": "interactive",
                "reflect": false,
                "defaultValue": "false"
            },
            "orientation": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'horizontal' | 'vertical'",
                    "resolved": "\"horizontal\" | \"vertical\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "'vertical'"
                        }],
                    "text": "Progress tracker orientation"
                },
                "attribute": "orientation",
                "reflect": false,
                "defaultValue": "'vertical'"
            },
            "reversed": {
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
                    "text": "Whether the direction of the progress indicators is reversed"
                },
                "attribute": "reversed",
                "reflect": false,
                "defaultValue": "false"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'large' | 'medium' | 'small'",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "'medium'"
                        }],
                    "text": "Steps\u2019 size"
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'medium'"
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "currentStepIndex",
                "methodName": "currentStepIndexWatcher"
            }, {
                "propName": "reversed",
                "methodName": "reversedWatcher"
            }, {
                "propName": "compact",
                "methodName": "otherPropsWatcher"
            }, {
                "propName": "indicator",
                "methodName": "otherPropsWatcher"
            }, {
                "propName": "interactive",
                "methodName": "otherPropsWatcher"
            }, {
                "propName": "orientation",
                "methodName": "otherPropsWatcher"
            }, {
                "propName": "size",
                "methodName": "otherPropsWatcher"
            }];
    }
    static get listeners() {
        return [{
                "name": "marketProgressTrackerStepClick",
                "method": "marketProgressTrackerStepClickEventHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-progress-tracker.js.map
