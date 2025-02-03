'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const index$2 = require('./index-305c3fd5.js');
const index$1 = require('./index-254d04f0.js');

const marketHeaderCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}::slotted(.wayfinding),::slotted([slot=\"wayfinding\"]),::slotted(.subheading),::slotted([slot=\"subheading\"]){font-weight:var(--core-type-paragraph-20-weight);font-size:var(--core-type-paragraph-20-size);font-family:var(--core-type-paragraph-20-font-family);line-height:var(--core-type-paragraph-20-leading);letter-spacing:var(--core-type-paragraph-20-tracking);text-transform:var(--core-type-paragraph-20-case)}::slotted(.wayfinding) b,::slotted(.wayfinding) strong,::slotted([slot=\"wayfinding\"]) b,::slotted([slot=\"wayfinding\"]) strong,::slotted(.subheading) b,::slotted(.subheading) strong,::slotted([slot=\"subheading\"]) b,::slotted([slot=\"subheading\"]) strong{font-weight:var(--core-type-semibold-20-weight)}:host{--header-animation-duration:0.2s;display:block}::slotted(*){margin:0}::slotted(.wayfinding),::slotted([slot=\"wayfinding\"]){display:block;margin-bottom:var(--header-sub-text-spacing-bottom-size);color:var(--header-sub-text-text-color)}::slotted(.subheading),::slotted([slot=\"subheading\"]){display:block;margin-top:var(--header-sub-text-spacing-bottom-size);color:var(--header-sub-text-text-color)}:host([show-navigation]) ::slotted([slot=\"compact\"]:not(.wayfinding):not(.subheading)){font-weight:var(--core-type-heading-20-weight);font-size:var(--core-type-heading-20-size);font-family:var(--core-type-heading-20-font-family);line-height:var(--core-type-heading-20-leading);letter-spacing:var(--core-type-heading-20-tracking);text-transform:var(--core-type-heading-20-case)}nav{padding-right:var(--header-main-text-horizontal-spacing)}menu{display:none;grid-auto-flow:column;align-items:start;margin:0;padding-left:var(--header-main-text-horizontal-spacing);-moz-column-gap:var(--button-group-spacing);column-gap:var(--button-group-spacing)}:host([show-actions]) menu{display:grid}.grid{display:none}:host([show-actions]) .grid{display:grid;grid-template-columns:auto minmax(max-content, 1fr)}:host([show-navigation]) .grid{display:grid;grid-template-columns:minmax(max-content, 1fr) auto minmax(max-content, 1fr)}.navigation{display:none}:host([show-navigation]) .navigation{display:flex}.actions{display:flex;place-content:flex-end}.compact{display:flex;flex-direction:column;place-content:center}::slotted(p){margin-top:var(--header-bottom-padding-size)}::slotted(p[slot=\"compact\"]){display:none}:host([show-navigation]) .compact{overflow:hidden;text-align:center;opacity:0%;visibility:hidden;transition:opacity var(--header-animation-duration) ease-in-out,\n    visibility 0s linear var(--header-animation-duration)}:host([show-navigation]) .compact ::slotted([slot=\"compact\"]){overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.heading{display:block;transition:opacity var(--header-animation-duration) ease-in-out, visibility 0s}:host([show-navigation]) .heading{margin-top:var(--header-nav-icon-button-spacing-buttom-size)}:host([show-actions]:not([show-navigation])) .heading{display:none}:host([show-navigation][compact]) .compact{opacity:100%;visibility:visible;transition:opacity var(--header-animation-duration) ease-in-out, visibility 0s}:host([show-navigation][compact]) .heading{opacity:0%;visibility:hidden;transition:opacity var(--header-animation-duration) ease-in-out,\n      visibility 0s linear var(--header-animation-duration)}:host(.regular) .heading{max-width:var(--modal-full-fixed-layout-width);margin-right:auto;margin-left:auto}:host(.wide) .heading{max-width:1200px;margin-right:auto;margin-left:auto}";
const MarketHeaderStyle0 = marketHeaderCss;

const MarketHeader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketHeaderNavigate = index.createEvent(this, "marketHeaderNavigate", 7);
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
      ${index$1.getNamespacedTagFor('market-modal-full')},
      ${index$1.getNamespacedTagFor('market-modal-partial')}
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
        const MarketButtonTagName = index$1.getNamespacedTagFor('market-button');
        const MarketIconTagName = index$1.getNamespacedTagFor('market-icon');
        return (index.h(MarketButtonTagName, { rank: "secondary", slot: "navigation", "aria-label": this.closeButtonAriaLabel, disabled: this.disableCloseButton, onClick: (event) => this.handleCloseButtonClick(event) }, index.h(MarketIconTagName, { slot: "icon", name: index$2.cjs.HEADER_CLOSE_BUTTON_ICON_ASSET })));
    }
    render() {
        return (index.h(index.Host, { key: '7deecc774073b8dbae2a706c36b0970ec4670fd0', class: "market-header", "show-actions": this.showActions }, index.h("div", { key: '949def9a4ec1fc238649852bce2dda05e79b01bf', class: "grid" }, index.h("div", { key: '48daf39e6b4e01e7d5ee2f046d14b70c05d5ca06', class: "navigation" }, index.h("nav", { key: 'bd1b1d181e8e9b681764ab57e1eabfa644913d3f' }, index.h("slot", { key: 'a9c8c33eea02ad025010c14a589dcf4928ea2888', name: "navigation", onSlotchange: () => this.handleSlottedNavigation() }, this.renderDefaultNavigation()))), index.h("div", { key: '87fe12de9b587f9f08eb883ab786afa118ebd2cd', class: "compact" }, index.h("slot", { key: '39d20daa0da037b878be425fc588a3e02fe73f14', name: "compact" })), index.h("div", { key: 'd5857c0e116b22270b5cd3f7b67239c19328117d', class: "actions" }, index.h("menu", { key: '12fc1cd1ed8570357a2e5888cb2e9ff523e8f760' }, index.h("slot", { key: 'ea3684f5a6bffe85330a873232d88961bd4f5efe', name: "actions", onSlotchange: () => this.handleSlottedActions() })))), index.h("div", { key: 'd209001247f0319930036590e609351026b684b6', class: "heading", part: "heading" }, index.h("slot", { key: 'f29115e8addad7b8989a786bf0bfd9c44752db54', name: "wayfinding" }), index.h("slot", { key: '39258aa88e9374c5c3d55544b4cab1b8d0402d7e' }), index.h("slot", { key: '90c57b59dca1f4fcfd6326170e39beb9b9ea6182', name: "subheading" }))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "compact": ["handleCompact"]
    }; }
};
MarketHeader.style = MarketHeaderStyle0;

exports.market_header = MarketHeader;

//# sourceMappingURL=market-header.cjs.entry.js.map