import { createPopper } from "@popperjs/core";
import { Host, h } from "@stencil/core";
import { v4 as uuid } from "uuid";
import { applyExpandableAriaControls, observeAriaAttributes } from "../../utils/aria";
import { supportedDropdownTriggers } from "../../utils/dropdown";
import { getNamespacedTagFor } from "../../utils/namespace";
/**
 * @slot trigger - Content slotted here will serve as the "trigger" for user
 * interaction that opens the element in the "content" slot. If it is a
 * `<market-button>`, `<market-filter-button>`, or `<market-link>`,
 * the dropdown will manage their disabled state.
 * @slot popover - Content slotted here will become visible when the slotted
 * trigger content is interacted with. Only tested with `<market-popover>`.
 *
 * To tweak popover position relative to the trigger, you can use the props
 * `popoverPlacement`, popoverSkidding`, and `popoverDistance`.
 */
export class MarketDropdown {
    constructor() {
        /**
         * Popper instance
         */
        this.popperInstance = null;
        this.onMutationObserved = (ariaAttributes) => {
            this.ariaAttributes = ariaAttributes;
        };
        this.interaction = 'click';
        this.disabled = false;
        this.expanded = false;
        this.popoverPlacement = 'bottom';
        this.popoverStrategy = 'absolute';
        this.popoverSkidding = undefined;
        this.popoverDistance = 8;
        this.ariaAttributes = undefined;
    }
    /**
     * Clicks outside of the dropdown component will close the popover. This means
     * that only one dropdown can be open on screen at a time.
     */
    windowClick(e) {
        // https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component
        if (this.expanded && !e.composedPath().includes(this.el)) {
            this.closeDropdown();
        }
    }
    /**
     * Toggles the dropdown
     */
    onExpandedChange(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        if (this.expanded) {
            this.openDropdown();
        }
        else {
            this.closeDropdown();
        }
    }
    syncDisabledState() {
        // this only covers elements slotted directly into market-dropdown, aka in the light DOM
        const slottedTriggerElements = this.el.querySelectorAll(supportedDropdownTriggers.map((elName) => getNamespacedTagFor(elName)).join(','));
        slottedTriggerElements.forEach((element) => {
            element.disabled = this.disabled;
        });
    }
    /**
     * Toggles the dropdown opened or closed
     */
    toggleDropdown() {
        if (this.expanded) {
            return this.closeDropdown();
        }
        else {
            return this.openDropdown();
        }
    }
    /**
     * Opens the dropdown
     */
    openDropdown() {
        if (this.expanded) {
            return Promise.resolve();
        }
        const { defaultPrevented } = this.marketDropdownOpened.emit();
        if (!defaultPrevented && !this.expanded) {
            this.expanded = true;
        }
        return Promise.resolve();
    }
    /**
     * Closes the dropdown
     */
    closeDropdown() {
        if (!this.expanded) {
            return Promise.resolve();
        }
        const { defaultPrevented } = this.marketDropdownClosed.emit();
        if (!defaultPrevented && this.expanded) {
            this.expanded = false;
        }
        return Promise.resolve();
    }
    /**
     * Updates the popper's tooltip location
     * https://popper.js.org/docs/v2/lifecycle/#manual-update
     */
    async updateDropdownPosition() {
        var _a;
        await ((_a = this.popperInstance) === null || _a === void 0 ? void 0 : _a.update());
        return Promise.resolve();
    }
    async handleInteraction(e) {
        if (this.disabled || this.interaction === 'none') {
            return;
        }
        // default behavior (interaction = 'click') is that the popover toggles
        // open/closed when any part of the element is clicked (trigger or popover)
        if (this.interaction === 'click' && e.type === 'click') {
            this.toggleDropdown();
        }
        // when interaction = 'hover', mousing over the trigger opens the popover
        // and mousing out of the trigger OR popover closes the popover
        if (this.interaction === 'hover' && e.type === 'mouseover') {
            this.openDropdown();
        }
        if (this.interaction === 'hover' && e.type === 'mouseout') {
            this.closeDropdown();
        }
        if (e instanceof KeyboardEvent && e.key === 'Enter') {
            this.toggleDropdown();
        }
        // when interaction = 'persistent', the popover can only be toggled
        // open/closed with clicks to the trigger element
        const trigger = this.el.querySelector('[slot="trigger"]');
        if (this.interaction === 'persistent' && e.type === 'click' && e.composedPath().includes(trigger)) {
            this.toggleDropdown();
        }
        // since slotted content is not visible until this.expanded is true,
        // we need to tell popper.js to more accurately calculate its position once
        // it becomes visible
        if (this.popperInstance) {
            await this.popperInstance.update();
        }
    }
    initializePopper() {
        const { el, popperInstance, popoverPlacement: placement, popoverStrategy: strategy, popoverSkidding: skidding, popoverDistance: distance, } = this;
        if (popperInstance) {
            popperInstance.destroy();
            this.popperInstance = null;
        }
        const trigger = el;
        const popover = el.querySelector('[slot="popover"]');
        if (popover === null) {
            return;
        }
        this.popperInstance = createPopper(trigger, popover, {
            // https://popper.js.org/docs/v2/constructors/#options
            placement,
            strategy,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [skidding, distance],
                    },
                },
            ],
        });
    }
    updatePopoverConfig() {
        const { popperInstance, popoverSkidding: skidding, popoverDistance: distance } = this;
        popperInstance.setOptions({
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [skidding, distance],
                    },
                },
            ],
        });
    }
    connectedCallback() {
        // It's possible for connectedCallback to fire when the element is not connected ¯\_(ツ)_/¯
        // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
        if (!this.el.isConnected) {
            return;
        }
        // If this is the initial connection, the popover slot may not exist yet. In that case we'll initialize Popper via
        // the slotchange event handler. If this is a reconnect, we need to reinitialize Popper since it will have been
        // destroyed by disconnectedCallback.
        this.initializePopper();
    }
    disconnectedCallback() {
        // It's possible for disconnectedCallback to fire when the element is still connected ¯\_(ツ)_/¯
        // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
        if (this.el.isConnected) {
            return;
        }
        if (this.popperInstance) {
            // Destroying Popper on disconnect prevents memory leaks
            this.popperInstance.destroy();
            this.popperInstance = null;
        }
    }
    registerTrigger() {
        this.slottedTriggerEl = this.el.querySelector(supportedDropdownTriggers.join(','));
        this.syncDisabledState();
    }
    componentWillLoad() {
        this.mutationObserver = observeAriaAttributes(this.el, this.onMutationObserved);
    }
    componentWillRender() {
        if (this.slottedTriggerEl) {
            const popover = this.el.querySelector('[slot="popover"]');
            if (!popover.id) {
                popover.id = `popover-${uuid()}`;
            }
            applyExpandableAriaControls(this.slottedTriggerEl, {
                expanded: this.expanded.toString(),
                popoverId: popover.id,
            });
        }
    }
    render() {
        return (h(Host, { key: '8f536e224e90a942948d1d8f1c2618e8c3c1d70d', class: "market-dropdown", expanded: this.expanded, onClick: (e) => {
                this.handleInteraction(e);
            }, onmouseover: (e) => {
                this.handleInteraction(e);
            }, onmouseout: (e) => {
                this.handleInteraction(e);
            }, onKeyDown: (e) => {
                this.handleInteraction(e);
            } }, h("slot", { key: '70de16830a447a9ae2fb1b92f88d03a01a315b2e', name: "trigger", onSlotchange: () => this.registerTrigger() }), h("slot", { key: '027a7018a99e24b1fa18b484368752a892180d09', name: "popover", onSlotchange: () => this.initializePopper() })));
    }
    static get is() { return "market-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-dropdown.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-dropdown.css"]
        };
    }
    static get properties() {
        return {
            "interaction": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'click' | 'hover' | 'persistent' | 'none'",
                    "resolved": "\"click\" | \"hover\" | \"none\" | \"persistent\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Defining how the popover should be triggered to open/close. Note that\nclicks outside the dropdown will always close it.\n\n`click`: popover toggles open/closed on clicks to the trigger or popover\n\n`hover`: popover opens on trigger mouseover, closes on trigger or popover\n mouseout\n\n`persistent`: popover toggles open/closed on clicks to the trigger, popover\nstays open if users click on it or its content\n\n`none`: popover does not toggle open/closed on any user interaction; it is\nexpected to be controlled by the parent component"
                },
                "attribute": "interaction",
                "reflect": false,
                "defaultValue": "'click'"
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
                    "text": "Functionally disables the component, as well as relevant Market components\nin the \"trigger\" slot (`<market-button>`, `<market-link>`)."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "expanded": {
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
                    "text": "Determines whether the dropdown is expanded or collapsed"
                },
                "attribute": "expanded",
                "reflect": true,
                "defaultValue": "false"
            },
            "popoverPlacement": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Placement",
                    "resolved": "\"auto\" | \"auto-end\" | \"auto-start\" | \"bottom\" | \"bottom-end\" | \"bottom-start\" | \"left\" | \"left-end\" | \"left-start\" | \"right\" | \"right-end\" | \"right-start\" | \"top\" | \"top-end\" | \"top-start\"",
                    "references": {
                        "Placement": {
                            "location": "import",
                            "path": "@popperjs/core",
                            "id": "../../node_modules/@popperjs/core/index.d.ts::Placement"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Configuration option for Popper.js (used to position `<market-popover>`).\nDescribes the preferred placement of the popper.\nhttps://popper.js.org/docs/v2/constructors//#placement"
                },
                "attribute": "popover-placement",
                "reflect": false,
                "defaultValue": "'bottom'"
            },
            "popoverStrategy": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "PositioningStrategy",
                    "resolved": "\"absolute\" | \"fixed\"",
                    "references": {
                        "PositioningStrategy": {
                            "location": "import",
                            "path": "@popperjs/core",
                            "id": "../../node_modules/@popperjs/core/index.d.ts::PositioningStrategy"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Configuration option for Popper.js (used to position `<market-popover>`).\nDescribes the positioning strategy to use. By default, it is absolute. If\nyour reference element is in a fixed container, use the fixed strategy.\nhttps://popper.js.org/docs/v2/constructors//#strategy"
                },
                "attribute": "popover-strategy",
                "reflect": false,
                "defaultValue": "'absolute'"
            },
            "popoverSkidding": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Configuration option for Popper.js (used to position `<market-popover>`).\nDisplaces the popover along the reference element.\nhttps://popper.js.org/docs/v2/modifiers/offset/#skidding-1"
                },
                "attribute": "popover-skidding",
                "reflect": false
            },
            "popoverDistance": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Configuration option for Popper.js (used to position `<market-popover>`).\nDisplaces the popper away from, or toward, the reference element in the\ndirection of its placement.\nhttps://popper.js.org/docs/v2/modifiers/offset/#distance-1"
                },
                "attribute": "popover-distance",
                "reflect": false,
                "defaultValue": "8"
            }
        };
    }
    static get states() {
        return {
            "ariaAttributes": {}
        };
    }
    static get events() {
        return [{
                "method": "marketDropdownOpened",
                "name": "marketDropdownOpened",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the dropdown is opened."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "marketDropdownClosed",
                "name": "marketDropdownClosed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the dropdown is closed."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "toggleDropdown": {
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
                    "text": "Toggles the dropdown opened or closed",
                    "tags": []
                }
            },
            "openDropdown": {
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
                    "text": "Opens the dropdown",
                    "tags": []
                }
            },
            "closeDropdown": {
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
                    "text": "Closes the dropdown",
                    "tags": []
                }
            },
            "updateDropdownPosition": {
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
                    "text": "Updates the popper's tooltip location\nhttps://popper.js.org/docs/v2/lifecycle/#manual-update",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "expanded",
                "methodName": "onExpandedChange"
            }, {
                "propName": "disabled",
                "methodName": "syncDisabledState"
            }, {
                "propName": "popoverSkidding",
                "methodName": "updatePopoverConfig"
            }, {
                "propName": "popoverDistance",
                "methodName": "updatePopoverConfig"
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "windowClick",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-dropdown.js.map
