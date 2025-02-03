import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';
import { c as cjs } from './index3.js';
import { a as asyncRequestAnimationFrame } from './raf.js';
import { t as throttle } from './throttle.js';

const marketButtonGroupCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:flex;flex-grow:1}.content{display:flex;flex:1;flex-flow:row nowrap;gap:var(--button-group-spacing)}:host([alignment=\"right\"]) .content{flex-direction:row-reverse}:host([alignment=\"left\"]) .content{justify-content:flex-start}:host([alignment=\"split\"]) .content{flex-direction:row-reverse;justify-content:flex-end}:host([alignment=\"split\"]) .content ::slotted(.market-button:first-of-type){margin-left:auto}:host([alignment=\"fill\"]) .content{flex-direction:row-reverse}:host([alignment=\"fill\"]) .content ::slotted(.market-button){flex:1}:host([alignment=\"stack\"]) .content{flex-direction:column}[slot=\"content\"]{display:flex;flex-direction:column;gap:var(--button-group-spacing)}::slotted([slot=\"overflow-buttons\"]){width:100%}";
const MarketButtonGroupStyle0 = marketButtonGroupCss;

const MAX_VISIBLE_BUTTONS = 2;
const DROPDOWN_MENU_BUTTON_WIDTH = 48;
const RESIZE_DEBOUNCE_DURATION = 16; // 60fps
const MarketButtonGroup$1 = /*@__PURE__*/ proxyCustomElement(class MarketButtonGroup extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /**
         * References to the button elements
         */
        this._buttonEls = [];
        /**
         * Observers
         */
        this._observers = {};
        this.throttledHandleResize = throttle(this.handleResize.bind(this), RESIZE_DEBOUNCE_DURATION);
        this.alignment = 'right';
        this.popoverStrategy = 'absolute';
        this._sortedButtonEls = {
            overflow: [],
            visible: [],
        };
    }
    getComputedWidth(el) {
        return Number.parseFloat(window.getComputedStyle(el).width);
    }
    /**
     * Find out where the cutoff will happen.
     * Main chunk of the overflow logic happens here
     */
    async findButtonCutoffIndex() {
        if (this.alignment === 'stack') {
            // buttons are full width so no overflow necessary
            return this._buttonEls.length;
        }
        const buttonGroupWidth = this.getComputedWidth(this.el);
        /**
         * Temporary container where we can measure button widths
         * https://dev.to/sstraatemans/calculate-html-element-width-before-render-4ii7
         */
        const tempEl = document.createElement('div');
        tempEl.style.width = 'auto';
        tempEl.style.position = 'absolute';
        tempEl.style.visibility = 'hidden';
        this.el.shadowRoot.appendChild(tempEl);
        let index = 0;
        let buttonWidths = 0;
        for (const buttonEl of this._buttonEls) {
            if (index === MAX_VISIBLE_BUTTONS) {
                break;
            }
            /**
             * Presuming that all the remaining buttons (**excluding** the current one, i.e. `buttonEl`)
             * will be overflowed, calculate the potential dropdown menu button width.
             * If this is the last button, it will not be followed by a `market-button-dropdown-menu`.
             */
            const dropdownMenuButtonWidth = index + 1 === this._buttonEls.length // is this the last one?
                ? 0
                : cjs.BUTTON_GROUP_SPACING + DROPDOWN_MENU_BUTTON_WIDTH;
            // measure the button's width in the temporary container
            const clonedButtonEl = buttonEl.cloneNode(true);
            clonedButtonEl.style.display = 'block';
            tempEl.appendChild(clonedButtonEl);
            // let the shadow DOM render within the temp container first before measuring its width
            await asyncRequestAnimationFrame();
            const buttonElWidth = this.getComputedWidth(tempEl);
            tempEl.removeChild(clonedButtonEl);
            // width of all the buttons so far; gap is only added for buttons after the first
            buttonWidths += (index > 0 ? cjs.BUTTON_GROUP_SPACING : 0) + buttonElWidth;
            // check if button can fit
            const potentialWidth = buttonWidths + dropdownMenuButtonWidth;
            if (potentialWidth >= buttonGroupWidth) {
                // it won't fit; breaking the loop sets the cutoff
                break;
            }
            ++index;
        }
        // cleanup
        this.el.shadowRoot.removeChild(tempEl);
        tempEl.remove();
        return index;
    }
    /**
     * Sort buttons:
     * - split by `this._buttonCutoffIndex`
     * - visible buttons: remove attr `[slot="overflow-buttons"]`; remove `display: none;`
     * - overflow buttons: set attr `[slot="overflow-buttons"]`; add `display: none;`
     */
    sortVisibleAndOverflowButtons() {
        this._sortedButtonEls = {
            visible: this._buttonEls.slice(0, this._buttonCutoffIndex),
            overflow: this._buttonEls.slice(this._buttonCutoffIndex),
        };
        this._sortedButtonEls.visible.forEach((buttonEl) => {
            // if (buttonEl.style.display) {
            //   buttonEl.style.removeProperty('display');
            // }
            if (buttonEl.getAttribute('slot') === 'overflow-buttons') {
                buttonEl.removeAttribute('slot');
            }
        });
        this._sortedButtonEls.overflow.forEach((buttonEl) => {
            // if (buttonEl.style.display !== 'none') {
            //   buttonEl.style.display = 'none';
            // }
            if (buttonEl.getAttribute('slot') !== 'overflow-buttons') {
                buttonEl.setAttribute('slot', 'overflow-buttons');
            }
        });
    }
    /**
     * Handle screen / component resize
     */
    async handleResize() {
        if (!this.getComputedWidth(this.el)) {
            // element isn't fully rendered yet
            return;
        }
        const index = await this.findButtonCutoffIndex();
        const isButtonCutoffUpdated = index !== this._buttonCutoffIndex;
        if (isButtonCutoffUpdated) {
            this._buttonCutoffIndex = index;
            await asyncRequestAnimationFrame();
            this.sortVisibleAndOverflowButtons();
        }
        this.el.style.visibility = '';
    }
    registerSlottedButtons() {
        const MarketButtonTagName = getNamespacedTagFor('market-button');
        this._buttonEls = [...this.el.querySelectorAll(MarketButtonTagName)];
    }
    observeContent(el) {
        if (!this._observers.content) {
            this._observers.content = new ResizeObserver(this.throttledHandleResize);
            this._observers.content.observe(el);
        }
    }
    connectedCallback() {
        if (!this._observers.host) {
            this._observers.host = new ResizeObserver(this.throttledHandleResize);
            this._observers.host.observe(this.el);
        }
    }
    componentWillLoad() {
        // hide component until handleResize()
        this.el.style.visibility = 'hidden';
        this.registerSlottedButtons();
        this.handleResize();
    }
    disconnectedCallback() {
        Object.entries(this._observers).forEach(([key, observer]) => {
            if (observer) {
                observer.disconnect();
                this._observers[key] = undefined;
            }
        });
    }
    render() {
        const MarketButtonDropdownTagName = getNamespacedTagFor('market-button-dropdown');
        const MarketButtonTagName = getNamespacedTagFor('market-button');
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        return (h(Host, { key: '0057bde7c5189dc71782960ea6a0a05ab850ffae', class: "market-button-group" }, h("div", { key: 'bb2bae68c3f6bcce4a467153493c54e5bf74a8d8', class: "content", ref: (el) => this.observeContent(el) }, h("slot", { key: 'aa97b649151b3dae1d6f98b07b55ebd5b59124a8', onSlotchange: () => this.registerSlottedButtons() }), this._sortedButtonEls.overflow.length > 0 && (h(MarketButtonDropdownTagName, { key: 'ed1403f69d8bdf9a2b177ab7d16274e78cd1c3bf', "no-caret": true, "popover-strategy": this.popoverStrategy }, h(MarketButtonTagName, { key: '633ade9faa3248a77fe539d03c3593778ce2647f', slot: "trigger" }, h(MarketIconTagName, { key: '61a4cf7a55a68750d827d9950232a564e1664150', slot: "icon", name: cjs.BUTTON_GROUP_OVERFLOW_BUTTON_ICON_ASSET })), h("div", { key: '1e30bc26ee0d90bbd1ca0324d7054d74beea088e', slot: "content" }, h("slot", { key: 'f02cea12d210b2170d13c14a10ac8027360cc445', name: "overflow-buttons", slot: "overflow-buttons" })))))));
    }
    get el() { return this; }
    static get style() { return MarketButtonGroupStyle0; }
}, [1, "market-button-group", {
        "alignment": [513],
        "popoverStrategy": [1, "popover-strategy"],
        "_sortedButtonEls": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-button-group"];
    components.forEach(tagName => { switch (tagName) {
        case "market-button-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketButtonGroup$1);
            }
            break;
    } });
}

const MarketButtonGroup = MarketButtonGroup$1;
const defineCustomElement = defineCustomElement$1;

export { MarketButtonGroup, defineCustomElement };

//# sourceMappingURL=market-button-group.js.map