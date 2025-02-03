import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getNamespacedTagFor } from './index2.js';

function isMarketCheckbox(value) {
    var _a;
    const tagName = (_a = value === null || value === void 0 ? void 0 : value.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    return Boolean(value && tagName === getNamespacedTagFor('market-checkbox'));
}

function isMarketToggle(value) {
    var _a;
    const tagName = (_a = value === null || value === void 0 ? void 0 : value.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    return Boolean(value && tagName === getNamespacedTagFor('market-toggle'));
}

function isMarketTableV2ControlElement(value) {
    return isMarketCheckbox(value) || isMarketToggle(value);
}

const marketTableV2CellCss = ":host,*{box-sizing:border-box}:host{--table-cell-vertical-padding-size:var(--core-metrics-spacing-150);--table-cell-horizontal-padding-size:var(--core-metrics-spacing-100);--table-cell-horizontal-spacing-size:var(--core-metrics-spacing-150);--table-cell-border-width:1px;--table-cell-heading-border-color:var(--core-divider-10-color);--table-cell-state-normal-background-color:var(--core-surface-10-color);--table-cell-hover-state-background-color:var(--core-fill-50-color);--table-cell-focus-state-background-color:var(--core-fill-50-color);--table-cell-pressed-state-background-color:var(--core-emphasis-40-color);--table-cell-disabled-state-text-color:var(--core-text-30-color);--table-cell-indent-level:0;--table-cell-indent-size:var(--core-metrics-spacing-500);--table-cell-caret-size:var(--core-metrics-spacing-500);--table-cell-text-font-weight:var(--core-type-paragraph-20-weight);--table-cell-text-font-size:var(--core-type-paragraph-20-size);--table-cell-text-line-height:var(--core-type-paragraph-20-leading);--table-cell-focus-ring-color:color-mix(in srgb, var(--core-focus-ring-color) 50%, transparent);display:table-cell;vertical-align:inherit;width:auto;padding:var(--table-cell-vertical-padding-size) var(--table-cell-horizontal-padding-size);border-bottom:var(--table-cell-border-width) solid var(--table-cell-border-color);outline:none;font-weight:var(--table-cell-text-font-weight);font-size:var(--table-cell-text-font-size);line-height:var(--table-cell-text-line-height);text-align:inherit}:host .content-outer{display:flex;gap:var(--table-cell-horizontal-spacing-size);justify-content:space-between;align-items:center;width:100%;transition-timing-function:var(--core-animation-move-transition-easing);transition-duration:var(--core-animation-move-transition-moderate-speed-duration);transition-property:gap}:host .content-inner{display:flex;gap:var(--table-cell-horizontal-spacing-size);align-items:center;width:100%}:host .default-slot{width:100%}:host([indent]:not([indent=\"0\"])){padding-left:calc(\n        var(--table-cell-horizontal-spacing-size) + var(--table-cell-indent-level) * var(--table-cell-indent-size)\n      )}:host([indent][caret]:not([indent=\"0\"])){padding-left:calc(\n        var(--table-cell-horizontal-padding-size) + var(--table-cell-indent-level) * var(--table-cell-indent-size)\n      )}:host([nowrap]) .default-slot{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([align=\"left\"]){text-align:left}:host([align=\"center\"]){text-align:center}:host([align=\"right\"]){text-align:right}:host([valign=\"top\"]){vertical-align:top}:host([valign=\"middle\"]){vertical-align:middle}:host([valign=\"bottom\"]){vertical-align:bottom}:host([sticky]){position:sticky;z-index:2;background-color:var(--table-cell-state-normal-background-color)}:host([sticky=\"left\"]){left:0;border-right:var(--table-cell-border-width) solid var(--table-cell-heading-border-color)}:host([sticky=\"right\"]){right:0;border-left:var(--table-cell-border-width) solid var(--table-cell-heading-border-color)}:host(.market-drag-clone-first-cell){padding-left:var(--table-cell-horizontal-padding-size) !important}:host(.market-drag-clone-first-cell) .content-outer{gap:0}:host(.market-drag-clone-first-cell) .caret-button,:host(.market-drag-clone-first-cell) ::slotted([slot=\"control\"]){width:0;height:0;opacity:0%}::slotted([slot=\"control\"]),::slotted([slot=\"leading-accessory\"]),::slotted([slot=\"trailing-accessory\"]){flex-shrink:0}.caret-button,::slotted([slot=\"control\"]){transition-timing-function:var(--core-animation-move-transition-easing);transition-duration:var(--core-animation-move-transition-moderate-speed-duration);transition-property:width, height, opacity}:host([interactive]){cursor:pointer}@media (hover: hover){:host([sortable]:hover),:host([interactive]:hover){background-color:var(--table-cell-hover-state-background-color)}}:host([sortable]:focus),:host([interactive]:focus){background-color:var(--table-cell-focus-state-background-color)}:host([active]),:host([sortable]:active),:host([interactive]:active){background-color:var(--table-cell-pressed-state-background-color)}:host([disabled]){color:var(--table-cell-disabled-state-text-color);pointer-events:none}.caret-button{display:flex;flex-shrink:0;justify-content:center;align-items:center;width:var(--table-cell-caret-size);height:var(--table-cell-caret-size);margin-top:calc(var(--table-cell-vertical-padding-size) * -1);margin-bottom:calc(var(--table-cell-vertical-padding-size) * -1);margin-left:calc(var(--table-cell-horizontal-padding-size) * -1);padding:0;border:none;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.caret-button svg{display:block;fill:var(--core-fill-20-color);transition:0.2s transform ease}:host([caret=\"up\"]) .caret-button svg{transform:rotate(-180deg)}.caret-button:focus-visible{border-radius:var(--core-radius-10);outline:var(--core-focus-ring-border-size) solid var(--table-cell-focus-ring-color);outline-offset:calc(var(--core-focus-ring-border-size) * -1)}.sort-button{display:flex;flex-shrink:0;gap:var(--core-metrics-spacing-50);align-items:center;width:100%;margin:0;padding:var(--table-cell-vertical-padding-size) var(--table-cell-horizontal-padding-size);border:none;background:transparent;outline:none;font-weight:inherit;font-size:inherit;font-family:inherit;line-height:inherit;text-align:inherit;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.sort-button svg{display:block;flex-shrink:0;fill:var(--core-text-30-color)}.sort-button:focus-visible{border-radius:var(--core-radius-10);outline:var(--core-focus-ring-border-size) solid var(--table-cell-focus-ring-color);outline-offset:calc(var(--core-focus-ring-border-size) * -1)}:host([align=\"left\"]) .sort-button{justify-content:start}:host([align=\"center\"]) .sort-button{justify-content:center}:host([align=\"right\"]) .sort-button{justify-content:end}:host([sortable]){padding:0}:host([sortable][sort-order=\"ascending\"]) .sort-button svg,:host([sortable][sort-order=\"descending\"]) .sort-button svg{fill:var(--core-text-10-color)}";
const MarketTableV2CellStyle0 = marketTableV2CellCss;

const MarketTableV2Cell$1 = /*@__PURE__*/ proxyCustomElement(class MarketTableV2Cell extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketTableV2CellCaretClicked = createEvent(this, "marketTableV2CellCaretClicked", 7);
        this.marketTableV2CellSortClicked = createEvent(this, "marketTableV2CellSortClicked", 7);
        this.marketInternalTableV2CellSelectionChange = createEvent(this, "marketInternalTableV2CellSelectionChange", 7);
        this.active = false;
        this.align = undefined;
        this.caret = undefined;
        this.caretAriaLabelExpanded = 'Group of rows is expanded: click to collapse';
        this.caretAriaLabelCollapsed = 'Group of rows is collapsed: click to expand';
        this.disabled = false;
        this.indent = undefined;
        this.interactive = false;
        this.nowrap = false;
        this.selected = 'false';
        this.sticky = undefined;
        this.sortable = undefined;
        this.sortAriaLabelAscending = 'Sorted ascending: click to sort descending';
        this.sortAriaLabelDescending = 'Sorted descending: click to sort ascending';
        this.sortAriaLabelNone = 'Not sorted: click to sort ascending';
        this.sortOrder = 'none';
        this.sortStrategy = undefined;
        this.sortStrategyFormat = undefined;
        this.valign = undefined;
    }
    onKeydown(e) {
        const { target, key } = e;
        const { el, disabled, interactive } = this;
        if (disabled)
            return;
        if (!interactive)
            return;
        if (target !== el)
            return;
        if (key === 'Enter' || key === ' ') {
            e.preventDefault();
            el.click();
        }
    }
    async onMarketControlSelectionChange(e) {
        const { control } = this;
        const { target, detail } = e;
        // return if the target wasn't this cell's control
        if (target !== control)
            return;
        const selected = detail.current ? 'true' : 'false';
        await this.setSelected(selected);
    }
    /**
     * @internal
     * Sets selection on the cell and propagates value to its slotted control
     */
    async setSelected(selected, { silent = false } = {}) {
        const { marketInternalTableV2CellSelectionChange, selected: prevSelected } = this;
        // return if no values have changed
        if (prevSelected === selected)
            return Promise.resolve();
        // fire the internal selection event
        if (!silent) {
            marketInternalTableV2CellSelectionChange.emit({
                current: selected,
                previous: prevSelected,
            });
        }
        // save the state
        this.selected = selected;
        await this.setControlSelected(selected);
        return Promise.resolve();
    }
    async setControlSelected(selected) {
        const { control } = this;
        if (!control)
            return;
        await control.setSelection(selected === 'true', { silent: true });
        if (isMarketCheckbox(control))
            await control.setIndeterminate(selected === 'indeterminate');
    }
    getTabIndex() {
        const { disabled, interactive } = this;
        return interactive && !disabled ? '0' : null;
    }
    getStyles() {
        const { indent } = this;
        if (!indent || indent < 1)
            return {};
        return { '--table-cell-indent-level': indent.toString() };
    }
    getSortButtonLabel() {
        const { sortOrder, sortAriaLabelAscending, sortAriaLabelDescending, sortAriaLabelNone } = this;
        switch (sortOrder) {
            case 'ascending':
                return sortAriaLabelAscending;
            case 'descending':
                return sortAriaLabelDescending;
            default:
                return sortAriaLabelNone;
        }
    }
    onCaretClick(e) {
        e.stopPropagation();
        this.marketTableV2CellCaretClicked.emit();
    }
    onSortClick() {
        const { sortOrder, marketTableV2CellSortClicked } = this;
        const previous = sortOrder || 'none';
        const current = previous === 'ascending' ? 'descending' : 'ascending';
        const { defaultPrevented } = marketTableV2CellSortClicked.emit({
            current,
            previous,
        });
        if (!defaultPrevented)
            this.sortOrder = current;
    }
    async syncControlState() {
        const { el, selected } = this;
        const control = [...el.children].find((child) => child.slot === 'control');
        if (isMarketTableV2ControlElement(control)) {
            this.control = control;
            if (selected)
                await this.setControlSelected(selected);
        }
    }
    async connectedCallback() {
        await this.syncControlState();
    }
    renderCaretButton() {
        return (
        // Note: We would ideally also have aria-expanded and aria-controls attributes; however, this is not currently
        // possible (as of Mar 2024) due to the lack of support for referencing elements across shadow DOMs. Browser
        // support work is ongoing in this area, but it is insufficient at this time. We should revisit in the future.
        h("button", { class: "caret-button", "aria-label": this.caret === 'down' ? this.caretAriaLabelCollapsed : this.caretAriaLabelExpanded, onClick: (e) => this.onCaretClick(e) }, h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.70715 11.7071C8.31663 12.0976 7.68346 12.0976 7.29294 11.7071L1.29294 5.70711L2.70715 4.29289L8.00005 9.58579L13.2929 4.29289L14.7072 5.70711L8.70715 11.7071Z" }))));
    }
    renderSortAscendingSvg() {
        return (h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.52861 2.86177C7.78895 2.60142 8.21107 2.60142 8.47141 2.86177L13.1381 7.52843L12.1953 8.47124L8.66668 4.94265L8.66668 12.6665H7.33334V4.94265L3.80475 8.47124L2.86194 7.52843L7.52861 2.86177Z" })));
    }
    renderSortDecendingSvg() {
        return (h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.47129 13.1382C8.21094 13.3986 7.78883 13.3986 7.52848 13.1382L2.86182 8.47157L3.80463 7.52876L7.33322 11.0574L7.33322 3.3335L8.66655 3.3335L8.66655 11.0574L12.1952 7.52876L13.138 8.47157L8.47129 13.1382Z" })));
    }
    renderSortNoneSvg() {
        return (h("svg", { width: "16", height: "17", viewBox: "0 0 16 17", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.8633 14.31L8.19664 11.6434L9.1433 10.7034L10.67 12.23L10.67 3.17002L12.0033 3.17002L12.0033 12.23L13.53 10.7034L14.47 11.6434L11.8033 14.31C11.5433 14.57 11.1233 14.57 10.8633 14.31ZM2.46997 6.30338L1.52997 5.36338L4.19664 2.69671C4.45664 2.43671 4.87664 2.43671 5.13664 2.69671L7.8033 5.36338L6.8633 6.30338L5.33664 4.77671L5.33664 13.8367L4.0033 13.8367L4.0033 4.77671L2.46997 6.30338Z" })));
    }
    renderSortSvg() {
        switch (this.sortOrder) {
            case 'ascending':
                return this.renderSortAscendingSvg();
            case 'descending':
                return this.renderSortDecendingSvg();
            default:
                return this.renderSortNoneSvg();
        }
    }
    render() {
        var _a;
        const { el, caret, sortable, sortOrder } = this;
        return (h(Host, { key: '2d295a766cd4cb793b862dd91fc75268c2a87dd4', role: (_a = el.role) !== null && _a !== void 0 ? _a : 'cell', tabindex: this.getTabIndex(), style: this.getStyles(), class: "market-table-v2-cell", "sort-order": sortOrder !== 'none' ? sortOrder : null, "aria-sort": sortOrder !== 'none' ? sortOrder : null }, h("div", { key: '906e275506a64e166a30803cfc82c62f777ed6d3', class: "content-outer" }, caret && this.renderCaretButton(), h("slot", { key: 'ac57aa86c019e676af0bb682c62566edafd49ac9', name: "control", onSlotchange: () => this.syncControlState() }), h("div", { key: '2a4230ff9f54efa8ee8cee84520d33dd825dde2c', class: "content-inner" }, h("slot", { key: '99ed0e6392d5578d91f4241e327ff35b94f0b399', name: "leading-accessory" }), h("div", { key: 'bfd35740621d1e2ae479b6a0f04f6f4d0cbe44bf', class: "default-slot" }, !sortable && h("slot", { key: 'dd7101744adee33b83c23edd386ae2f5569a3b08' }), sortable && (h("button", { key: 'b50edf4b821d5d7b558403069525a2094c7074fb', class: "sort-button", "aria-describedby": "sort-button-label", onClick: () => this.onSortClick() }, h("slot", { key: '6b025eba66325233948b4049c8f4488811a5bd56' }), this.renderSortSvg(), h("span", { key: 'd3fbf14b0b8cce540086ad7085ae39fc534c659d', id: "sort-button-label", hidden: true }, this.getSortButtonLabel())))), h("slot", { key: 'ff30de7fc804ca8308dc6a997c22449fdc14307b', name: "trailing-accessory" })))));
    }
    get el() { return this; }
    static get style() { return MarketTableV2CellStyle0; }
}, [1, "market-table-v2-cell", {
        "active": [516],
        "align": [513],
        "caret": [513],
        "caretAriaLabelExpanded": [1, "caret-aria-label-expanded"],
        "caretAriaLabelCollapsed": [1, "caret-aria-label-collapsed"],
        "disabled": [516],
        "indent": [514],
        "interactive": [516],
        "nowrap": [516],
        "selected": [1025],
        "sticky": [513],
        "sortable": [516],
        "sortAriaLabelAscending": [1, "sort-aria-label-ascending"],
        "sortAriaLabelDescending": [1, "sort-aria-label-descending"],
        "sortAriaLabelNone": [1, "sort-aria-label-none"],
        "sortOrder": [1025, "sort-order"],
        "sortStrategy": [1, "sort-strategy"],
        "sortStrategyFormat": [1, "sort-strategy-format"],
        "valign": [513],
        "setSelected": [64]
    }, [[0, "keydown", "onKeydown"], [0, "marketToggleChange", "onMarketControlSelectionChange"], [0, "marketCheckboxValueChange", "onMarketControlSelectionChange"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-table-v2-cell"];
    components.forEach(tagName => { switch (tagName) {
        case "market-table-v2-cell":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketTableV2Cell$1);
            }
            break;
    } });
}

const MarketTableV2Cell = MarketTableV2Cell$1;
const defineCustomElement = defineCustomElement$1;

export { MarketTableV2Cell, defineCustomElement };

//# sourceMappingURL=market-table-v2-cell.js.map