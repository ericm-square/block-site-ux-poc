import { Host, h } from "@stencil/core";
import { HEADER_CLOSE_BUTTON_ICON_ASSET } from "@market/market-theme/js/cjs/index.js";
import { getNamespacedTagFor } from "../../utils/namespace";
/**
 * @slot - The title. The position of the title varies based on the presence of other slots
 * @slot navigation - navigation buttons, ex close, back, forward, on the left side of the header
 * @slot wayfinding - the smaller "eyebrow" text displayed above the title, e.g. "Step 1 of 2"
 * @slot actions - for button(s) to perform actions, on the right side of the header
 * @slot subheading - Secondary text for the row
 * @part heading - the heading area where the default, wayfinding, and subheading slot is contained in
 */
export class MarketHeader {
    constructor() {
        this.showNavigation = null;
        this.closeButtonAriaLabel = 'Close';
        this.disableCloseButton = false;
        this.compact = false;
        this.showActions = false;
    }
    handleCompact() {
        if (this.compact) {
            const compact = this.el.shadowRoot.querySelector('.grid .compact');
            const minHeight = Number.parseInt(getComputedStyle(compact).height, 10);
            this.el.style.height = minHeight !== undefined ? `${minHeight}px` : '';
        }
        else {
            this.el.style.height = '';
        }
    }
    handleSlottedNavigation() {
        // If there is custom navigation passed in, we need to
        // attach event handlers to the slotted elements manually
        const customNavEl = this.el.querySelector('[slot="navigation"]');
        if (customNavEl) {
            this.showNavigation = true;
            customNavEl.addEventListener('click', this.handleSlottedNavClick.bind(this));
        }
    }
    handleSlottedActions() {
        const actions = this.el.querySelector('[slot="actions"]');
        this.showActions = actions ? true : false;
    }
    handleCloseButtonClick(event) {
        this.marketHeaderNavigate.emit({
            event,
            action: 'close',
        });
    }
    handleSlottedNavClick(event) {
        this.marketHeaderNavigate.emit({
            event,
            action: 'custom',
        });
    }
    componentWillLoad() {
        this.checkForNavigation();
        this.cloneDefaultHeadingToCompactHeading();
        // watch for changes in slotted children content
        const observer = new MutationObserver(this.handleMutation.bind(this));
        observer.observe(this.el, { childList: true, characterData: true, subtree: true });
    }
    componentDidRender() {
        // this function requires layout computation,
        // so we need to wait until render to call.
        this.handleCompact();
    }
    handleMutation(mutationList) {
        // We don't want to re-clone the default slot content if
        // the mutation was already the result of the cloning
        // because then we would get into an infinite loop!
        // So we have to look at the mutation data to check if a
        // compact slotted element was added to prevent re-cloning.
        let shouldClone = true;
        mutationList.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.slot === 'compact') {
                        shouldClone = false;
                    }
                });
            }
        });
        if (shouldClone) {
            this.cloneDefaultHeadingToCompactHeading();
        }
    }
    checkForNavigation() {
        // We want to force the header to be navigable when slotted in modals
        const hasModalParent = this.el.closest(`
      ${getNamespacedTagFor('market-modal-full')},
      ${getNamespacedTagFor('market-modal-partial')}
    `);
        // The same if custom navigation is slotted in
        const hasCustomNavigation = this.el.querySelector('[slot="navigation"]');
        // Only set this if the prop hasn't been passed in manually
        if (this.showNavigation === null) {
            this.showNavigation = hasModalParent || hasCustomNavigation ? true : false;
        }
    }
    cloneDefaultHeadingToCompactHeading() {
        // clear existing compact slotted content
        const compactSlottedContent = this.el.querySelectorAll('[slot="compact"]');
        for (const node of compactSlottedContent) {
            this.el.removeChild(node);
        }
        // clone the wayfinding or subheading slot into compact slot
        const wayfindingEl = this.el.querySelector('[slot="wayfinding"]');
        const subheadingEl = this.el.querySelector('[slot="subheading"]');
        if (wayfindingEl) {
            const clone = wayfindingEl.cloneNode(true);
            clone.slot = 'compact';
            clone.classList.add('wayfinding');
            this.el.appendChild(clone);
        }
        // clone the rest of the default slot content into compact slot
        const defaultSlotContent = [...this.el.children].filter((el) => !el.getAttribute('slot'));
        for (const node of defaultSlotContent) {
            const clone = node.cloneNode(true);
            clone.slot = 'compact';
            this.el.appendChild(clone);
        }
        if (!wayfindingEl && subheadingEl) {
            const clone = subheadingEl.cloneNode(true);
            clone.slot = 'compact';
            clone.classList.add('subheading');
            this.el.appendChild(clone);
        }
    }
    renderDefaultNavigation() {
        const MarketButtonTagName = getNamespacedTagFor('market-button');
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        return (h(MarketButtonTagName, { rank: "secondary", slot: "navigation", "aria-label": this.closeButtonAriaLabel, disabled: this.disableCloseButton, onClick: (event) => this.handleCloseButtonClick(event) }, h(MarketIconTagName, { slot: "icon", name: HEADER_CLOSE_BUTTON_ICON_ASSET })));
    }
    render() {
        return (h(Host, { key: '7deecc774073b8dbae2a706c36b0970ec4670fd0', class: "market-header", "show-actions": this.showActions }, h("div", { key: '949def9a4ec1fc238649852bce2dda05e79b01bf', class: "grid" }, h("div", { key: '48daf39e6b4e01e7d5ee2f046d14b70c05d5ca06', class: "navigation" }, h("nav", { key: 'bd1b1d181e8e9b681764ab57e1eabfa644913d3f' }, h("slot", { key: 'a9c8c33eea02ad025010c14a589dcf4928ea2888', name: "navigation", onSlotchange: () => this.handleSlottedNavigation() }, this.renderDefaultNavigation()))), h("div", { key: '87fe12de9b587f9f08eb883ab786afa118ebd2cd', class: "compact" }, h("slot", { key: '39d20daa0da037b878be425fc588a3e02fe73f14', name: "compact" })), h("div", { key: 'd5857c0e116b22270b5cd3f7b67239c19328117d', class: "actions" }, h("menu", { key: '12fc1cd1ed8570357a2e5888cb2e9ff523e8f760' }, h("slot", { key: 'ea3684f5a6bffe85330a873232d88961bd4f5efe', name: "actions", onSlotchange: () => this.handleSlottedActions() })))), h("div", { key: 'd209001247f0319930036590e609351026b684b6', class: "heading", part: "heading" }, h("slot", { key: 'f29115e8addad7b8989a786bf0bfd9c44752db54', name: "wayfinding" }), h("slot", { key: '39258aa88e9374c5c3d55544b4cab1b8d0402d7e' }), h("slot", { key: '90c57b59dca1f4fcfd6326170e39beb9b9ea6182', name: "subheading" }))));
    }
    static get is() { return "market-header"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-header.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-header.css"]
        };
    }
    static get properties() {
        return {
            "showNavigation": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean | null",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether or not the navigation slot is shown"
                },
                "attribute": "show-navigation",
                "reflect": true,
                "defaultValue": "null"
            },
            "closeButtonAriaLabel": {
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
                    "text": "String to use for the aria-label accessibility attribute of the default close \"x\" button."
                },
                "attribute": "close-button-aria-label",
                "reflect": true,
                "defaultValue": "'Close'"
            },
            "disableCloseButton": {
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
                    "text": "Disables the default close \"x\" button."
                },
                "attribute": "disable-close-button",
                "reflect": false,
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
                    "tags": [],
                    "text": "Whether or not the header is in compact mode\nwhen navigation is present."
                },
                "attribute": "compact",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "showActions": {}
        };
    }
    static get events() {
        return [{
                "method": "marketHeaderNavigate",
                "name": "marketHeaderNavigate",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the close icon in the navigation slot is clicked."
                },
                "complexType": {
                    "original": "TMarketHeaderNavigateEventDetail",
                    "resolved": "{ event: MouseEvent; action: \"custom\" | \"close\"; }",
                    "references": {
                        "TMarketHeaderNavigateEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-header/events.ts::TMarketHeaderNavigateEventDetail"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "compact",
                "methodName": "handleCompact"
            }];
    }
}
//# sourceMappingURL=market-header.js.map
