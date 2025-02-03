import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classNames } from './classnames.js';

const marketTileCss = "::slotted([slot=\"hint\"]){font-weight:var(--core-type-display-10-weight);font-size:var(--core-type-display-10-size);font-family:var(--core-type-display-10-font-family);line-height:var(--core-type-display-10-leading);letter-spacing:var(--core-type-display-10-tracking);text-transform:var(--core-type-display-10-case)}::slotted([slot=\"subtext\"]){font-weight:var(--core-type-paragraph-10-weight);font-size:var(--core-type-paragraph-10-size);font-family:var(--core-type-paragraph-10-font-family);line-height:var(--core-type-paragraph-10-leading);letter-spacing:var(--core-type-paragraph-10-tracking);text-transform:var(--core-type-paragraph-10-case)}::slotted([slot=\"subtext\"]) b,::slotted([slot=\"subtext\"]) strong{font-weight:var(--core-type-semibold-10-weight)}::slotted([slot=\"label\"]){font-weight:var(--core-type-medium-30-weight);font-size:var(--core-type-medium-30-size);font-family:var(--core-type-medium-30-font-family);line-height:var(--core-type-medium-30-leading);letter-spacing:var(--core-type-medium-30-tracking);text-transform:var(--core-type-medium-30-case)}::slotted([slot=\"indicator\"]){font-weight:var(--core-type-semibold-10-weight);font-size:var(--core-type-semibold-10-size);font-family:var(--core-type-semibold-10-font-family);line-height:var(--core-type-semibold-10-leading);letter-spacing:var(--core-type-semibold-10-tracking);text-transform:var(--core-type-semibold-10-case)}:host{--item-tile-text-color:black;--focus-ring-color:color-mix(\n      in srgb,\n      var(--item-tile-focus-ring-color, var(--core-focus-ring-color)) 100%,\n      transparent\n    );position:relative;z-index:1;display:grid;grid-template-areas:\"leading-accessory _ trailing-accessory\"\n    \"content content content\";grid-template-columns:minmax(0, max-content) 1fr auto;box-sizing:border-box;width:var(--item-tile-width, 200px);height:var(--item-tile-medium-height, 124px);padding:var(--item-tile-medium-padding, var(--core-metrics-spacing-150));border-radius:var(--item-tile-border-radius, 6px);background:var(--item-tile-fill-color, var(--core-fill-40-color));-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([interactive]){cursor:pointer}:host([size=\"small\"]){grid-template-areas:\"leading-accessory content trailing-accessory\";grid-template-columns:max-content 1fr minmax(0, max-content);height:var(--item-tile-small-height, 56px);padding:var(--item-tile-small-padding-vertical, var(--core-metrics-spacing-50))\n      var(--item-tile-small-padding-horizontal, var(--core-metrics-spacing-150));-moz-column-gap:var(--core-metrics-spacing-100);column-gap:var(--core-metrics-spacing-100)}:host([size=\"small\"]) ::slotted([slot=\"leading-accessory\"]),:host([size=\"small\"]) .trailing-accessory-container{align-items:center}:host([size=\"small\"]) .content{justify-content:center;align-items:start}:host([size=\"small\"]) .remove-button{position:relative}:host([aria-disabled]){opacity:20%;cursor:not-allowed}:host([aria-disabled]) .remove-button{cursor:not-allowed}:host([aria-disabled]) .remove-button:hover{background:var(--item-tile-remove-button-fill, #fff)}:host([aria-selected=\"true\"]){box-shadow:inset 0 0 0 var(--item-tile-selected-value-border-width, 2px)\n      var(--item-tile-selected-value-border-color, var(--core-emphasis-fill-color))}:host(:focus-visible){outline:var(--item-tile-focus-ring-border-size, var(--core-focus-ring-border-size)) solid var(--focus-ring-color);outline-offset:var(--item-tile-focus-ring-buffer-size, var(--core-focus-ring-buffer-size))}.background-image{display:none}.background-image.has-slotted-media,.background-image ::slotted([slot=\"media\"]){--item-tile-text-color:white;position:absolute;top:0;left:0;z-index:-1;display:block;-o-object-fit:cover;object-fit:cover;width:100%;height:100%;border-radius:var(--item-tile-border-radius, 6px)}.background-image.has-slotted-media::before,.background-image ::slotted([slot=\"media\"])::before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;border-radius:var(--item-tile-border-radius, 6px);background-image:var(\n        --item-tile-background-image-gradient,\n        linear-gradient(180.98deg, rgb(0 0 0 / 4%) 0.84%, rgb(0 0 0 / 40%) 99.16%)\n      )}::slotted([slot=\"leading-accessory\"]){z-index:2;display:flex;grid-area:leading-accessory;align-items:flex-start}.trailing-accessory-container{z-index:3;display:flex;grid-area:trailing-accessory;justify-content:flex-end}.trailing-accessory-container .remove-button{position:absolute;width:var(--item-tile-remove-button-width, 24px);height:var(--item-tile-remove-button-height, 24px);border:none;border-radius:100px;background:var(--item-tile-remove-button-fill, var(--core-surface-30-color));box-shadow:var(--elevation-10-shadow);cursor:pointer}.trailing-accessory-container .remove-button:hover{background:var(--item-tile-remove-button-hover-state-background-color, #ffe5ea)}.trailing-accessory-container .remove-button:active{background:var(--item-time-remove-button-active-state-background-color, #ffccd5)}.trailing-accessory-container .remove-button svg{position:absolute;top:0;left:0;padding:var(--core-metrics-spacing-50)}.trailing-accessory-container ::slotted([slot=\"indicator\"]){height:var(--core-metrics-spacing-200);padding:0 var(--core-metrics-spacing-100);border-radius:100px;background:var(--core-fill-10-dark-mode-color);color:black;box-shadow:var(--elevation-10-shadow)}.content{z-index:2;display:flex;flex-direction:column;grid-area:content;justify-content:flex-end;min-width:0}::slotted([slot=\"label\"]){display:-webkit-box;overflow-y:hidden;min-width:0;-webkit-line-clamp:var(--item-tile-label-line-clamp, 1);-webkit-box-orient:vertical}::slotted([slot=\"subtext\"]){display:-webkit-box;overflow-y:hidden;min-width:0;-webkit-line-clamp:1;-webkit-box-orient:vertical}";
const MarketTileStyle0 = marketTileCss;

const MarketTile$1 = /*@__PURE__*/ proxyCustomElement(class MarketTile extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketTileSelectedChanged = createEvent(this, "marketTileSelectedChanged", 7);
        this.marketTileRemoveClicked = createEvent(this, "marketTileRemoveClicked", 7);
        this.hasTrailingAccessorySlot = false;
        this.hasIndicatorTextSlot = false;
        this.disabled = false;
        this.interactive = false;
        this.showActions = false;
        this.size = 'medium';
        this.value = undefined;
        this.selected = false;
        this.hasSlottedMedia = false;
    }
    onSizeChange() {
        this.adjustSlottedLabels();
    }
    /**
     * Allows external elements to set selected value.
     */
    setSelected(newValue) {
        if (typeof newValue !== 'boolean') {
            return Promise.resolve();
        }
        if (this.selected !== newValue) {
            const { defaultPrevented } = this.marketTileSelectedChanged.emit({
                selected: this.selected,
                value: this.value,
            });
            if (!defaultPrevented) {
                this.selected = newValue;
            }
        }
        return Promise.resolve();
    }
    handleClick(event) {
        if (this.disabled || !this.interactive) {
            return;
        }
        this.selected = !this.selected;
        event.preventDefault();
        this.marketTileSelectedChanged.emit({ selected: this.selected, value: this.value });
    }
    handleRemoveActionKeydown(event) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.handleRemoveActionClick(event);
                break;
        }
    }
    handleRemoveActionClick(event) {
        if (this.disabled || !this.interactive) {
            return;
        }
        event.stopPropagation();
        this.marketTileRemoveClicked.emit();
    }
    renderDefaultRemoveAction() {
        const { disabled, handleRemoveActionClick, handleRemoveActionKeydown } = this;
        return (h("button", { class: "remove-button", disabled: disabled, onClick: handleRemoveActionClick.bind(this), onKeyUp: handleRemoveActionKeydown.bind(this) }, h("svg", { slot: "icon", width: "16", height: "16", viewBox: "0 0 16 16", fill: "var(--core-critical-text-color)", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M12.8318 7.3335V7.1685H12.6668H3.3335H3.1685V7.3335V8.66683V8.83183H3.3335H12.6668H12.8318V8.66683V7.3335Z", fill: "var(--core-critical-text-color)", stroke: "var(--core-critical-text-color)", "stroke-width": "0.33" }))));
    }
    handleKeydown(event) {
        // don't intercept keydown of descendant elements
        // e.g. remove button
        if (event.target !== this.el) {
            return;
        }
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.handleClick(event);
                break;
        }
    }
    /**
     * This function determines the number of lines the `label` slot text should clamp to.
     * It should clamp to a single line if the hint slot exists or if the subtext slot exists
     * and the element `size` prop is set to "small".
     */
    adjustSlottedLabels() {
        const { size, el } = this;
        const hint = el.querySelector('[slot="hint"]');
        const label = el.querySelector('[slot="label"]');
        const subtext = el.querySelector('[slot="subtext"]');
        if (!label) {
            return;
        }
        const labelLineClamp = hint || (subtext && size === 'small') ? 1 : 2;
        el.style.setProperty('--item-tile-label-line-clamp', labelLineClamp.toString());
    }
    checkSlottedMedia() {
        this.hasSlottedMedia = Boolean(this.el.querySelector('[slot="media"]'));
    }
    componentWillLoad() {
        this.checkSlottedMedia();
        this.hasIndicatorTextSlot = Boolean(this.el.querySelector('[slot="indicator"]'));
    }
    render() {
        const { disabled, size, hasSlottedMedia, hasIndicatorTextSlot, interactive, showActions, selected } = this;
        const tabindex = interactive && !disabled ? '0' : null;
        return (h(Host, { key: 'd517f7cb075bd6646ca3490faf7d0eeb127ffa82', class: "market-tile", tabindex: tabindex, "aria-selected": selected.toString(), onClick: (e) => this.handleClick(e), onKeydown: (e) => this.handleKeydown(e) }, h("div", { key: '4e8acbe5ef8c493e5b7dcdab61fe78aeb46a3058', class: classNames('background-image', { 'has-slotted-media': hasSlottedMedia }) }, h("slot", { key: 'ef14bfbc08c9cb408f3f6c778599af3a00857413', onSlotchange: () => this.checkSlottedMedia(), name: "media" })), h("slot", { key: '6f138c2dd2c724ed94d783971d5e61e690f3b204', name: "leading-accessory" }), h("div", { key: 'eb504c07a85e0888d6dc9e3cf691b4497428d185', class: "trailing-accessory-container" }, showActions && h("slot", { key: '5ad694873bbaea565bb629f48101311c52e5d5b1', name: "actions" }, this.renderDefaultRemoveAction()), !showActions && hasIndicatorTextSlot && h("slot", { key: '2e4922b851b506583bad374382a86751f263d575', name: "indicator" })), h("div", { key: '0ac231a58c9f189f38740ab5d2a97ae06e82386e', class: "content" }, size !== 'small' && h("slot", { key: 'ae24177ef72c114e1801f9baa06b656139efa4c1', onSlotchange: () => this.adjustSlottedLabels(), name: "hint" }), h("slot", { key: 'b99fe24dd8cf51110ca3276777ff36c1a416046f', onSlotchange: () => this.adjustSlottedLabels(), name: "label" }), h("slot", { key: 'ae3e99ca54cdfcfd1e8e0feb48e276b2c131d037', onSlotchange: () => this.adjustSlottedLabels(), name: "subtext" }))));
    }
    get el() { return this; }
    static get watchers() { return {
        "size": ["onSizeChange"]
    }; }
    static get style() { return MarketTileStyle0; }
}, [1, "market-tile", {
        "disabled": [516, "aria-disabled"],
        "interactive": [4],
        "showActions": [4, "show-actions"],
        "size": [513],
        "value": [513],
        "selected": [1540],
        "hasSlottedMedia": [32],
        "setSelected": [64]
    }, undefined, {
        "size": ["onSizeChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-tile"];
    components.forEach(tagName => { switch (tagName) {
        case "market-tile":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketTile$1);
            }
            break;
    } });
}

const MarketTile = MarketTile$1;
const defineCustomElement = defineCustomElement$1;

export { MarketTile, defineCustomElement };

//# sourceMappingURL=market-tile.js.map