import { h, Host } from "@stencil/core";
import { isEmpty } from "lodash-es";
import { ROW_MEDIUM_SIZE_CARET_ICON_ASSET, ROW_SMALL_SIZE_CARET_ICON_ASSET, } from "@market/market-theme/js/cjs/index.js";
import { classNames } from "../../utils/classnames";
import { Draggable } from "../../utils/draggable";
import { getNamespacedTagFor } from "../../utils/namespace";
import { asyncRequestAnimationFrame } from "../../utils/raf";
import { isValidRowControl } from "./utils";
/**
 * @slot label - Text label for the row
 * @slot subtext - Secondary text for the row
 * @slot side-label - Additional text label to display on the side of the row
 * @slot side-subtext - Secondary text to display on the side of the row
 * @slot control - An interactive control, intended for use with `<market-checkbox>`, `<market-radio>`, or `<market-toggle>`.
 * The row's `selected` prop will set the control's selection state.
 * @slot leading-accessory - An icon set on the left side of the row; intended for use with `<market-accessory>`
 * @slot trailing-accessory - An icon set on the right side of the row; intended for use with `<market-accessory>`
 * @slot - Default slot can take any content, intended as an "escape hatch" for
 * scenarios where rows need to contain more complex HTML content stylable from
 * the light DOM.
 *
 * @part container - Wraps the main and side areas (see below). The outer padding of the row is specified on this element.
 * @part main - Wraps the label and subtext slots, can be used for styling purposes as needed.
 * @part side - Wraps the side-label and side-subtext slots, can be used for styling purposes as needed.
 * @part drag-handle - the drag handle when `dragEnabled` is true.
 */
export class MarketRow {
    constructor() {
        this.slottedControlEl = undefined;
        this.selected = false;
        this.value = undefined;
        this.disabled = false;
        this.size = 'medium';
        this.interactive = false;
        this.transient = false;
        this.togglable = true;
        this.variant = 'regular';
        this.destructive = false;
        this.controlPosition = 'trailing';
        this.href = undefined;
        this.target = undefined;
        this.dragEnabled = false;
        this.dragHandlePosition = 'trailing';
        this.hasSideText = false;
    }
    /**
     * If a control gets slotted in, set the value to match that of the row
     */
    selectedWatcher(newValue) {
        var _a;
        // prevent the row from being selected if it is transient
        const selected = newValue && this.transient ? false : newValue;
        this.selected = selected;
        (_a = this.slottedControlEl) === null || _a === void 0 ? void 0 : _a.setSelection(selected);
    }
    /**
     * If a control gets slotted in, set the value to match that of the row
     */
    disabledWatcher(newValue) {
        var _a;
        (_a = this.slottedControlEl) === null || _a === void 0 ? void 0 : _a.setDisabled(newValue);
    }
    /**
     * Link rows should not be selectable
     */
    hrefWatcher(newValue) {
        if (!isEmpty(newValue)) {
            this.transient = true;
        }
    }
    /**
     * Drill rows are interactive and transient
     */
    variantWatcher(newValue) {
        if (newValue === 'drill') {
            this.interactive = true;
            this.transient = true;
        }
    }
    /**
     * @internal
     * @private
     *
     * Used for setting the selection state to true without emiting the `marketRowSelected` event.
     */
    async silentlySelect() {
        this.selected = true;
        return Promise.resolve();
    }
    /**
     * @internal
     * @private
     *
     * Used for setting the selection state to false without emiting the `marketRowDeselected` event.
     */
    async silentlyDeselect() {
        this.selected = false;
        return Promise.resolve();
    }
    /**
     * @internal
     * @private
     *
     * Used for manually setting `selected` to true. Generally speaking, it
     * is preferable to avoid using this method and allow `market-row` to
     * manage its own selection state based on user interaction. It should only
     * be used for parent components that need to manage a group of rows, such as
     * `market-list`.
     */
    select() {
        this.selected = true;
        const { defaultPrevented } = this.marketRowSelected.emit({ value: this.value });
        if (defaultPrevented) {
            this.selected = false;
        }
        return Promise.resolve();
    }
    /**
     * @internal
     * @private
     *
     * Used for manually setting `selected` to false. Generally speaking, it
     * is preferable to avoid using this method and allow `market-row` to
     * manage its own selection state based on user interaction. It should only
     * be used for parent components that need to manage a group of rows, such as
     * `market-list`.
     */
    deselect() {
        this.selected = false;
        const { defaultPrevented } = this.marketRowDeselected.emit({ value: this.value });
        if (defaultPrevented) {
            this.selected = true;
        }
        return Promise.resolve();
    }
    /**
     * @internal
     * @private
     *
     * Used for toggling the row's selected state.
     */
    toggle() {
        return !this.selected ? this.select() : this.deselect();
    }
    handleControlSlotChange() {
        var _a;
        this.querySlots();
        if (this.slottedControlEl) {
            this.interactive = true;
            this.selectedWatcher(this.selected);
            this.disabledWatcher(this.disabled);
            const slottedControlLabel = (_a = this.el.querySelector('[slot="label"]')) === null || _a === void 0 ? void 0 : _a.textContent;
            this.slottedControlEl.setAttribute('aria-label', slottedControlLabel);
        }
    }
    setControlActive(value) {
        var _a, _b;
        (_b = (_a = this.slottedControlEl) === null || _a === void 0 ? void 0 : _a.setActive) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    }
    setControlHover(value) {
        var _a, _b;
        (_b = (_a = this.slottedControlEl) === null || _a === void 0 ? void 0 : _a.setHover) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    }
    async handleClick(e) {
        // clicks on links inside row content shouldn't select the row itself
        if (this.disabled ||
            this.transient ||
            !this.interactive ||
            e.target.tagName === 'A' ||
            e.target.tagName === 'BUTTON' ||
            e.target.tagName === getNamespacedTagFor('market-button').toUpperCase() ||
            e.target.tagName === getNamespacedTagFor('market-link').toUpperCase()) {
            return;
        }
        if (this.togglable) {
            await this.toggle();
        }
        else if (!this.selected) {
            await this.select();
        }
        // fixes a weird UI bug where the row keeps its focus when clicked using a mouse
        if (e.type === 'click' && e.pointerType === 'mouse') {
            this.el.blur();
        }
    }
    handleKeydown(e) {
        // don't intercept keydown of descendant elements
        // e.g. when typing into nested input fields (gross)
        if (e.target !== this.el) {
            return;
        }
        if (e.key === ' ') {
            e.preventDefault(); // spacebar should not scroll page
            this.el.click();
        }
        if (e.key === 'Enter') {
            this.el.click();
        }
    }
    async onDragStart(e) {
        e.stopPropagation();
        const { el, dragHandlePosition } = this;
        const coords = e.detail;
        const anchor = dragHandlePosition === 'leading' ? 'left' : 'right';
        const drag = new Draggable(el, { anchor });
        this.drag = drag;
        await drag.start(coords);
    }
    onDragMove(e) {
        e.stopPropagation();
        const coords = e.detail;
        this.drag.move(coords);
    }
    async onDragEnd(e) {
        e.stopPropagation();
        const coords = e.detail;
        await this.drag.end(coords);
        this.drag.destroy();
    }
    checkIfSideTextIsPresent() {
        const sideTextEl = this.el.querySelector('[slot="side-label"], [slot="side-subtext"]');
        this.hasSideText = Boolean(sideTextEl);
    }
    querySlots() {
        this.slottedControlEl = [...this.el.querySelectorAll('[slot="control"]')].find(isValidRowControl);
        this.checkIfSideTextIsPresent();
    }
    determineRowRole() {
        // Should only apply an a11y role if the row acts as a button.
        // Links are covered with the anchor tag, and option roles are handled by market-list.
        if (this.interactive && this.transient && !this.href) {
            return 'button';
        }
        return undefined;
    }
    connectedCallback() {
        this.querySlots();
        this.selectedWatcher(this.selected);
        this.disabledWatcher(this.disabled);
        this.hrefWatcher(this.href);
        this.variantWatcher(this.variant);
    }
    componentWillLoad() {
        this.checkIfSideTextIsPresent();
    }
    async componentDidUpdate() {
        // remove preload class (used to manage slotted control transitions)
        if (this.el.classList.contains('preload')) {
            await asyncRequestAnimationFrame();
            this.el.classList.remove('preload');
        }
    }
    render() {
        const { controlPosition, disabled, href, interactive, selected, slottedControlEl, target, variant, hasSideText, dragEnabled, dragHandlePosition, size, el, } = this;
        /*
         * a11y: If the row has a slotted control, we want to tab directly to the inner control element.
         * Doing this ensures we don't violate the "no nested interactive" rule:
         * https://dequeuniversity.com/rules/axe/html/4.3/nested-interactive
         */
        const tabindex = interactive && !disabled && !slottedControlEl ? '0' : null;
        const ContainerTag = href === undefined ? 'div' : 'a';
        const ContainerTagAttrs = ContainerTag === 'a' ? { href, target } : {};
        ContainerTagAttrs['role'] = this.determineRowRole();
        const leadingControl = controlPosition === 'leading';
        const MarketDragHandleTagName = getNamespacedTagFor('market-drag-handle');
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        const drillIconName = size === 'small' ? ROW_SMALL_SIZE_CARET_ICON_ASSET : ROW_MEDIUM_SIZE_CARET_ICON_ASSET;
        return (h(Host, { key: 'e0af5fb30f2569971d64057d871af60405d80b75', tabindex: tabindex, "aria-selected": el.role === 'option' ? Boolean(selected).toString() : undefined, class: classNames('market-row', 'preload', {
                'has-slotted-control': typeof slottedControlEl !== 'undefined',
                'has-leading-control': leadingControl,
            }), onMouseDown: () => this.setControlActive(true), onMouseUp: () => this.setControlActive(false), onMouseEnter: () => this.setControlHover(true), onMouseLeave: () => this.setControlHover(false), onClick: (e) => this.handleClick(e), onKeydown: (e) => this.handleKeydown(e), onMarketDragHandleDragStart: (e) => this.onDragStart(e), onMarketDragHandleDragMove: (e) => this.onDragMove(e), onMarketDragHandleDragEnd: (e) => this.onDragEnd(e) }, h(ContainerTag, Object.assign({ key: '0147448e4008da14a2597f43676707e1f6276f2a', part: "container", class: "container", tabindex: tabindex }, ContainerTagAttrs), dragEnabled && dragHandlePosition === 'leading' && (h(MarketDragHandleTagName, { key: '8845f82742506140a6cd2b252f1b44ca2581f71b', part: "drag-handle" })), leadingControl && h("slot", { key: 'b29f3a7673646aab9e2fa1d7698e793bce4f7854', name: "control", onSlotchange: () => this.handleControlSlotChange() }), h("slot", { key: '38f2988c383126c852a3a92ba0eaaa0c0754039c', name: "leading-accessory" }), h("div", { key: '7e4e81d29f8c9cb9af9dc0980cb73d5d1e60541e', class: "main", part: "main" }, h("slot", { key: '251e758e1ad0c07de7713a7b608314bd17fcbf6e', name: "label" }), h("slot", { key: '090c451be4b114a61dc79c2a256ac6dbda53efbd', name: "subtext" }), h("slot", { key: '144000d524652a21de2f011bae7534356c20d288' })), h("div", { key: 'd99b67c24f5ce1c4628414ebbb376926f2d58ef9', part: "side", class: classNames('side', { hidden: !hasSideText }) }, h("slot", { key: '4dd0e0f24441e84871a0ecedca2330caf2a8595b', name: "side-label", onSlotchange: () => this.checkIfSideTextIsPresent() }), h("slot", { key: '075ef3d3278322018477a0704b5f96a9cfab043c', name: "side-subtext", onSlotchange: () => this.checkIfSideTextIsPresent() })), h("slot", { key: '3ca9095e427e5326ccb54ed1dd1cd7d7a97c28eb', name: "trailing-accessory" }), variant === 'regular' && !leadingControl && (h("slot", { key: '41155201ba966c0ef66a0424302f0b3361fd9a10', name: "control", onSlotchange: () => this.handleControlSlotChange() })), variant === 'drill' && h(MarketIconTagName, { key: '85e1065ce85fa95d5588811629c2cb1d64271e0d', class: "drill-icon", name: drillIconName }), dragEnabled && dragHandlePosition === 'trailing' && (h(MarketDragHandleTagName, { key: '60ca3ae6e23bfe53caefc31806c69f96e456f940', part: "drag-handle" })))));
    }
    static get is() { return "market-row"; }
    static get encapsulation() { return "shadow"; }
    static get delegatesFocus() { return true; }
    static get originalStyleUrls() {
        return {
            "$": ["./styles/market-row.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["styles/market-row.css"]
        };
    }
    static get properties() {
        return {
            "selected": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the row is currently selected. Used by `<market-list>` and `<market-select>`.\nAlso sets the selection state for slotted controls (`<market-checkbox>`, `<market-radio>`, or `<market-toggle>`),\nif present."
                },
                "attribute": "selected",
                "reflect": true,
                "defaultValue": "false"
            },
            "value": {
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
                    "text": "The value for the row."
                },
                "attribute": "value",
                "reflect": true
            },
            "disabled": {
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
                    "text": "Whether the row is disabled.\nAlso disables slotted controls (`<market-checkbox>`, `<market-radio>`, or `<market-toggle>`), if present."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'small' | 'medium'",
                    "resolved": "\"medium\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Determines the form factor of the row."
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'medium'"
            },
            "interactive": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether or not the row is interactive. Results in rows receiving hover\nand active styling when hovered/clicked.\n\nAutomatically set to `true` when using the drill variant\nor passing in a slotted control (checkbox/radio/toggle).<br>\n\nAutomatically be set to reflect the list's `interactive`\nvalue if used inside of `<market-list>`."
                },
                "attribute": "interactive",
                "reflect": true,
                "defaultValue": "false"
            },
            "transient": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When set to `true`, rows will not persist selected state on click.\nOnly takes effect when `interactive` is true."
                },
                "attribute": "transient",
                "reflect": true,
                "defaultValue": "false"
            },
            "togglable": {
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
                    "text": "By default, row selection is toggled on click. There are some cases, such\nas selects, where we instead want the row to stay active on subsequent\nclicks. Setting `togglable` to `false` enables this behavior. Can be set\nby `<market-list>` and `<market-select>`."
                },
                "attribute": "togglable",
                "reflect": false,
                "defaultValue": "true"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'regular' | 'drill'",
                    "resolved": "\"drill\" | \"regular\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The style of row you want to use. The default is \"regular\", which allows\nyou to optionally slot a checkbox, radio, or (in the future) toggle control.\nThe other option is \"drill\", which functions more like a link that you can\nuse to drill through a series of action card sets."
                },
                "attribute": "variant",
                "reflect": false,
                "defaultValue": "'regular'"
            },
            "destructive": {
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
                    "text": "Gives the row destructive styling."
                },
                "attribute": "destructive",
                "reflect": true,
                "defaultValue": "false"
            },
            "controlPosition": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'trailing' | 'leading'",
                    "resolved": "\"leading\" | \"trailing\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the slotted control appears to the left or right of the main content."
                },
                "attribute": "control-position",
                "reflect": false,
                "defaultValue": "'trailing'"
            },
            "href": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | undefined",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A link that this row should navigate to on click.\nIf this property is set, an anchor tag will be rendered."
                },
                "attribute": "href",
                "reflect": false
            },
            "target": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'_blank' | '_self' | '_parent' | '_top' | undefined",
                    "resolved": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Specifies where to display the linked URL.\nOnly applies when an `href` is provided.\nSee [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) for details on accepted values."
                },
                "attribute": "target",
                "reflect": false
            },
            "dragEnabled": {
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
                    "text": "Whether the row is drag & drop enabled"
                },
                "attribute": "drag-enabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "dragHandlePosition": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'leading' | 'trailing'",
                    "resolved": "\"leading\" | \"trailing\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the drag handle appears to the left or right."
                },
                "attribute": "drag-handle-position",
                "reflect": true,
                "defaultValue": "'trailing'"
            }
        };
    }
    static get states() {
        return {
            "slottedControlEl": {},
            "hasSideText": {}
        };
    }
    static get events() {
        return [{
                "method": "marketRowSelected",
                "name": "marketRowSelected",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever a row is selected."
                },
                "complexType": {
                    "original": "TMarketRowSelectedEventDetail",
                    "resolved": "{ value: string; }",
                    "references": {
                        "TMarketRowSelectedEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-row/events.ts::TMarketRowSelectedEventDetail"
                        }
                    }
                }
            }, {
                "method": "marketRowDeselected",
                "name": "marketRowDeselected",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever a row is deselected."
                },
                "complexType": {
                    "original": "TMarketRowDeselectedEventDetail",
                    "resolved": "{ value: string; }",
                    "references": {
                        "TMarketRowDeselectedEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-row/events.ts::TMarketRowDeselectedEventDetail"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "silentlySelect": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }, {
                            "name": "private",
                            "text": "Used for setting the selection state to true without emiting the `marketRowSelected` event."
                        }]
                }
            },
            "silentlyDeselect": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }, {
                            "name": "private",
                            "text": "Used for setting the selection state to false without emiting the `marketRowDeselected` event."
                        }]
                }
            },
            "select": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }, {
                            "name": "private",
                            "text": "Used for manually setting `selected` to true. Generally speaking, it\nis preferable to avoid using this method and allow `market-row` to\nmanage its own selection state based on user interaction. It should only\nbe used for parent components that need to manage a group of rows, such as\n`market-list`."
                        }]
                }
            },
            "deselect": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }, {
                            "name": "private",
                            "text": "Used for manually setting `selected` to false. Generally speaking, it\nis preferable to avoid using this method and allow `market-row` to\nmanage its own selection state based on user interaction. It should only\nbe used for parent components that need to manage a group of rows, such as\n`market-list`."
                        }]
                }
            },
            "toggle": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }, {
                            "name": "private",
                            "text": "Used for toggling the row's selected state."
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "selected",
                "methodName": "selectedWatcher"
            }, {
                "propName": "disabled",
                "methodName": "disabledWatcher"
            }, {
                "propName": "href",
                "methodName": "hrefWatcher"
            }, {
                "propName": "variant",
                "methodName": "variantWatcher"
            }];
    }
}
//# sourceMappingURL=market-row.js.map
