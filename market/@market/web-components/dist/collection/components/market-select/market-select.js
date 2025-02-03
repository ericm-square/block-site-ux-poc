import { computePosition, autoUpdate, offset, autoPlacement, size, shift } from "@floating-ui/dom";
import { Host, h } from "@stencil/core";
import { v4 as uuid } from "uuid";
import { getTextInputAriaLabel } from "../../utils/aria";
import { debounce } from "../../utils/callbacks";
import { submitFormImplicitly } from "../../utils/forms";
import { getNamespacedTagFor } from "../../utils/namespace";
import { classNames } from "../../utils/classnames";
import { getMaxZIndex } from "../../utils/max-z-index";
const UP_DIRECTION = -1;
const DOWN_DIRECTION = 1;
/**
 * @slot - Intended for use as the input's text label.
 * @slot list - Intended for use with a slotted `<market-list>` containing `<market-row>`s.
 * @slot leading-accessory - An accessory set on the left side of the input.
 * @slot trailing-accessory - An accessory set on the right side of the input.
 * @slot displayed-selection - Used internally to display the selected `market-row` while retaining any custom styling. Not intended for use by Market consumers.
 */
export class MarketSelect {
    constructor() {
        /* TYPEAHEAD FUNCTIONALITY
        - https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
        - type a character: focus moves to the next item with a name that starts with
          the typed character
        - type multiple characters in rapid succession: focus moves to the next item
          with a name that starts with the string of characters typed
        - if no match is found, focus remains where it was
        - search wraps around end of list
        */
        this.rowsInnerText = [];
        this.keypresses = [];
        this.debounceDelay = 250;
        this.setFocusOnMatch = debounce(() => {
            const searchString = this.keypresses.join('');
            // array slicing is so we start the search from the currently focused row
            const nextMatch = [
                ...this.rowsInnerText.slice(this.focusedRowIndex + 1),
                ...this.rowsInnerText.slice(0, this.focusedRowIndex + 1),
            ].find((innerText) => innerText.startsWith(searchString));
            const matchIndex = this.rowsInnerText.findIndex((innerText) => {
                return innerText.startsWith(nextMatch);
            });
            const matchingRow = this.rows[matchIndex];
            // if matching row exists and is not disabled, focus it
            if (matchingRow && !matchingRow.disabled) {
                this.focusedRowIndex = matchIndex;
                // if list is closed and single select, set the value
                if (!this.listIsActive && !this.multiselect) {
                    // row is not in the DOM, so matchingRow.click() doesn't bubble
                    // instead we manually set the value to the row's value
                    this.value = matchingRow.value;
                    // since we're bypassing marketListSelectionsDidChange event here,
                    // we also need to manually emit marketSelectValueDidChange event
                    this.marketSelectValueDidChange.emit({
                        value: this.value,
                        newSelectedOption: matchingRow,
                        newDeselectedOption: null,
                        currentSelectedOptions: [matchingRow],
                    });
                }
            }
            this.keypresses = []; // reset keypress array
        }, this.debounceDelay);
        this.list = null;
        this.rows = null;
        this.popoverElement = null;
        this.name = undefined;
        this.value = '';
        this.size = 'large';
        this.placeholder = undefined;
        this.readonly = false;
        this.disabled = false;
        this.focused = false;
        this.invalid = false;
        this.required = false;
        this.multiselect = false;
        this.popoverContainer = undefined;
        this.popoverStrategy = 'absolute';
        this.listIsActive = false;
        this.focusedRowIndex = -1;
        this.hasLeadingAccessory = false;
        this.hasTrailingAccessory = false;
    }
    valueWatcher() {
        this.propagateValue();
    }
    multiselectWatcher() {
        this.list.multiselect = this.multiselect;
    }
    focusedRowIndexWatcher() {
        var _a;
        if (this.rows) {
            this.rows.forEach((r) => r.classList.remove('pseudo-focus'));
            (_a = this.rows[this.focusedRowIndex]) === null || _a === void 0 ? void 0 : _a.classList.add('pseudo-focus');
        }
    }
    // Listener for the change event emitted by `market-list`
    handleListSelection({ detail: { currentSelectionValues, currentSelections, newDeselection, newSelection } }) {
        const value = currentSelectionValues.join(',');
        this.value = value;
        if (this.multiselect) {
            this.setFocusedRow(newDeselection || newSelection);
        }
        else {
            this.setFocusedRow(newSelection);
        }
        this.marketSelectValueDidChange.emit({
            value,
            newSelectedOption: newSelection,
            newDeselectedOption: newDeselection,
            currentSelectedOptions: currentSelections,
        });
    }
    handleListItemsFiltered() {
        window.requestAnimationFrame(() => {
            if (this.listIsActive) {
                this.updatePopper();
            }
        });
    }
    windowClick(e) {
        var _a;
        if (this.el.contains(e.target) || ((_a = this.popoverElement) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
            return;
        }
        this.focused = false;
        if (this.listIsActive) {
            this.closeList();
        }
    }
    getValues() {
        if (Array.isArray(this.value)) {
            return new Set(this.value);
        }
        return new Set(this.multiselect ? this.value.split(',') : [this.value]);
    }
    getValuesCount() {
        return this.getValues().size;
    }
    /**
     * We search based on the `value` property rather than using querySelector and the `value`
     * attribute (i.e. `market-row[value=${this.value}]`) due to rendering issues we've seen
     * with Ember/Handlebars, where the property may be set before attribute is present.
     * See here for details: https://github.com/squareup/market/issues/2635
     */
    getMatchingRows() {
        if (this.rows === null) {
            return [];
        }
        else {
            const values = this.getValues();
            return [...this.rows].filter((row) => values.has(row.value));
        }
    }
    get hasMultipleSelections() {
        return this.multiselect && this.getValues().size > 1;
    }
    getMultiselectDisplayValue() {
        const values = this.getValues();
        return values.size > 1 ? `${values.size} selected` : '';
    }
    getDisplayedSelectionRow() {
        return this.el.querySelector(`${getNamespacedTagFor('market-row')}[slot="displayed-selection"]`);
    }
    /**
     * Ensure the passed `value` is reflected in the selected list item and the displayed selection row.
     */
    propagateValue() {
        if (!this.list || !this.rows)
            return;
        const matchingRows = this.getMatchingRows();
        if (matchingRows.length === 0) {
            // there were no matching rows, so sanitize & reset the value
            this.list.value = this.value = '';
            this.focusedRowIndex = -1;
        }
        else {
            // set the list value so the correct list row will be selected
            this.list.value = this.value;
            this.setFocusedRow(matchingRows[0]);
        }
        this.displaySelection(matchingRows);
    }
    /**
     * Renders the passed row into the displayed selection slot, so it's visible
     * as the current selection in the main "input" area of the select.
     */
    displaySelection(selectedRows = []) {
        var _a, _b, _c;
        // Remove existing selected row from the DOM
        (_b = (_a = this.getDisplayedSelectionRow()) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
        if (selectedRows.length === 1) {
            /**
             * For single select, we need to clone the row from the list so we can place a
             * duplicate into the field area. If we don't clone it, the row
             * will be removed from the list when we append it to the selection area
             */
            const clonedRow = selectedRows[0].cloneNode(true);
            // Row was cloned from the list, so we need to remove its interactive attribute + reset its role
            clonedRow.interactive = false;
            clonedRow.removeAttribute('tabindex');
            clonedRow.setAttribute('role', 'listitem'); // needed after Stencil 4 upgrade
            // don't duplicate cloned element IDs!
            clonedRow.removeAttribute('id');
            clonedRow.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
            // We don't want the row to show as "focused" inside the select box
            clonedRow.classList.remove('pseudo-focus');
            /**
             * Set slot='displayed-selection' so this shows up within the slotted area.
             * We use a slot instead of appending this directly into the shadowDOM
             * because we want to keep whatever styling cascaded from the Light DOM
             * on the row because market - row can accept any markup.
             */
            clonedRow.setAttribute('slot', 'displayed-selection');
            // if the select size is small, the selected row needs to be small too
            clonedRow.size = this.size === 'small' ? 'small' : 'medium';
            // Append the cloned node after the first slot element (label).
            this.el.append(clonedRow);
        }
        else if (selectedRows.length > 1) {
            /**
             * For multiselect, we need to create a `market-row` element to display "n selected"
             * and possibly clone the "selected-translation" slot, if provided
             */
            const multiselectDisplayRow = document.createElement(`${getNamespacedTagFor('market-row')}`);
            multiselectDisplayRow.setAttribute('slot', 'displayed-selection');
            multiselectDisplayRow.innerText = `${this.getValuesCount().toLocaleString()} `;
            // if the select size is small, the selected row needs to be small too
            multiselectDisplayRow.size = this.size === 'small' ? 'small' : 'medium';
            // Add slot for "selected"
            const selectedTranslationSlot = document.createElement('slot');
            selectedTranslationSlot.setAttribute('name', 'selected-translation');
            // Clone the contents of the "selected-translation"
            const selectedTranslation = this.el.querySelector('[slot="selected-translation"]');
            selectedTranslationSlot.innerHTML = (_c = selectedTranslation === null || selectedTranslation === void 0 ? void 0 : selectedTranslation.innerHTML) !== null && _c !== void 0 ? _c : 'selected';
            multiselectDisplayRow.appendChild(selectedTranslationSlot);
            // Observe for changes on the "selected-translation" slot
            if (selectedTranslation) {
                const observer = new MutationObserver(() => {
                    selectedTranslationSlot.innerHTML = selectedTranslation === null || selectedTranslation === void 0 ? void 0 : selectedTranslation.innerHTML;
                });
                observer.observe(selectedTranslation, { characterData: true, subtree: true });
            }
            this.el.append(multiselectDisplayRow);
        }
    }
    /**
     * Listens to changes in list content to ensure that if the content is dynamically updated,
     * those changes will be copied to the popover and the displayed-selection row.
     */
    initListObserver() {
        const observer = new MutationObserver(this.onListChange.bind(this));
        observer.observe(this.list, { childList: true, characterData: true, subtree: true });
    }
    onListChange() {
        this.initRows();
        this.propagateValue();
        this.updatePopper();
    }
    /**
     * Record the index of the new selected row for keyboard navigation
     */
    setFocusedRow(row) {
        this.focusedRowIndex = Array.prototype.indexOf.call(this.rows, row);
    }
    /**
     * Opens the select.
     */
    async openList() {
        if (this.listIsActive || !this.popoverElement) {
            return Promise.resolve();
        }
        const container = this.el.closest(this.popoverContainer) || document.body;
        Object.assign(this.popoverElement.style, {
            zIndex: `${getMaxZIndex(container) + 1}`,
            visibility: 'hidden',
        });
        this.moveListToPopover();
        container.append(this.popoverElement);
        this.initPopperListeners();
        return new Promise((resolve) => {
            // hack: ensure initial position is correctly set before visible
            setTimeout(() => {
                this.updatePopper();
                this.popoverElement.style.visibility = 'visible';
                this.listIsActive = true;
                this.marketSelectOpened.emit();
                resolve();
            }, 50);
        });
    }
    /**
     * Closes the select.
     */
    closeList() {
        if (!this.listIsActive) {
            return Promise.resolve();
        }
        this.popoverElement.remove();
        this.cleanupPopperListeners();
        this.moveListToSelect();
        this.listIsActive = false;
        this.marketSelectClosed.emit();
        return Promise.resolve();
    }
    /**
     * Toggles the select open and closed.
     */
    async toggleList() {
        this.listIsActive ? await this.closeList() : await this.openList();
    }
    /* KEYBOARD ACCESSIBILITY */
    // keyboard handler on the trigger (separate from the list)
    handleTriggerKeyDown(ev) {
        switch (ev.key) {
            case 'ArrowDown':
                this.handleArrowKey(ev, DOWN_DIRECTION);
                break;
            case 'ArrowUp':
                this.handleArrowKey(ev, UP_DIRECTION);
                break;
            case ' ':
                this.handleSpacebar(ev);
                break;
            case 'Enter':
                this.handleEnterKey();
                break;
            case 'Escape':
                this.handleEscape();
                break;
            case 'Tab':
                this.handleTab(ev);
                break;
            case 'Home':
                this.handleHomeKey(ev);
                break;
            case 'End':
                this.handleEndKey(ev);
                break;
            default:
                this.typeaheadHandler(ev);
                break;
        }
        ev.stopPropagation();
    }
    /**
     * NOTE: market-list has its own internal keyboard functionality,
     * so we only handle the key presses while the parent select is focused.
     *
     * - if the list is open:
     *   - update the selected row to the next or previous row depending on the arrow direction
     * - if the list is closed:
     *   - open the list
     */
    async handleArrowKey(ev, direction) {
        ev.preventDefault(); // do not scroll page while select has focus
        if (this.listIsActive) {
            for (let i = this.focusedRowIndex + direction; i >= 0 && i < this.rows.length; i += direction) {
                if (!this.rows[i].disabled) {
                    this.focusedRowIndex = i;
                    break;
                }
            }
        }
        else {
            await this.openList();
        }
    }
    /**
     * - if the list is open:
     *   - close it
     * - if the list is closed:
     *   - open the list
     *   - if there is a current selection, focus it
     */
    async handleSpacebar(ev) {
        var _a;
        ev.preventDefault(); // do not scroll page while select has focus
        if (this.listIsActive) {
            (_a = this.rows[this.focusedRowIndex]) === null || _a === void 0 ? void 0 : _a.toggle();
        }
        else {
            await this.openList();
        }
    }
    /**
     * when the list is closed, invoke implicit submission
     */
    handleEnterKey() {
        var _a;
        if (this.listIsActive) {
            (_a = this.rows[this.focusedRowIndex]) === null || _a === void 0 ? void 0 : _a.select();
            this.closeList();
        }
        else {
            submitFormImplicitly(this.el);
        }
    }
    /*
    - when the list is open, close it
    */
    handleEscape() {
        if (this.listIsActive) {
            this.closeList();
        }
    }
    /*
    - when the list is open, suppress tab navigation
    - when the list is closed, allow tab navigation and remove focus
    */
    handleTab(ev) {
        if (this.listIsActive) {
            ev.preventDefault();
        }
        else {
            this.focused = false;
        }
    }
    // On Mac, use Fn-Left as "Home"
    handleHomeKey(ev) {
        if (this.listIsActive) {
            ev.preventDefault();
            this.focusedRowIndex = 0;
        }
    }
    // On Mac, use Fn-Right as "End"
    handleEndKey(ev) {
        if (this.listIsActive) {
            ev.preventDefault();
            this.focusedRowIndex = this.rows.length - 1;
        }
    }
    // keyboard handler on the list (separate from the trigger)
    handleListKeyDown(ev) {
        switch (ev.key) {
            case 'Enter':
                this.handleListEnter();
                break;
            case 'Escape':
                this.handleEscape();
                break;
            case 'Tab':
                this.handleTab(ev);
                break;
            case ' ':
                this.handleListSpacebar(ev);
                break;
            default:
                this.typeaheadHandler(ev);
                break;
        }
        ev.stopPropagation();
    }
    /**
     * market-list handles selection functionality internally
     * just need to close the list if single select
     */
    handleListSpacebar(ev) {
        // do nothing if list is multiselect or keydown event is emitted by typing into a slotted search input
        if (this.multiselect || ev.target.hasAttribute('slot', 'search')) {
            return;
        }
        ev.preventDefault(); // do not scroll page while select has focus
        this.closeList();
        this.el.focus();
    }
    /**
     * market-list handles selection functionality internally
     * just need to close the list if single select
     */
    handleListEnter() {
        if (!this.multiselect) {
            this.closeList();
            this.el.focus();
        }
    }
    typeaheadHandler(ev) {
        var _a;
        // if list has a search, that will be used instead of a typeahead
        if ((_a = this.list) === null || _a === void 0 ? void 0 : _a.hasAttribute('has-search')) {
            // TODO: Proxy key events to the search input
            return;
        }
        // because this is the default keydown event handler, we're ignoring
        // "special" keys, numbers, and punctuation for typeahead functionality
        // note that this check will also ignore characters from languages that have
        // no concept of upper/lowercase (ex. japanese)
        // TODO: revisit if localization requires it
        if (ev.key.length > 1 || ev.key.toUpperCase() === ev.key.toLowerCase()) {
            return;
        }
        this.storeKeypresses(ev);
        this.setFocusOnMatch();
    }
    storeKeypresses(ev) {
        this.keypresses = [...this.keypresses, ev.key];
    }
    /* EVENT HANDLING */
    handleFocus() {
        if (this.readonly || this.disabled) {
            return;
        }
        this.focused = true;
    }
    handleTriggerClick(ev) {
        if (ev.target.tagName.toLowerCase() === getNamespacedTagFor('market-tooltip')) {
            return;
        }
        if (this.readonly || this.disabled) {
            return;
        }
        this.toggleList();
    }
    handleListClick() {
        if (!this.multiselect) {
            this.closeList();
            this.el.focus();
        }
    }
    initPopperListeners() {
        const { el, popoverElement, updatePopper } = this;
        this.cleanupPopperListeners = autoUpdate(el, popoverElement, updatePopper.bind(this), {
            elementResize: false,
        });
    }
    updatePopper() {
        const { el, popoverElement, popoverStrategy } = this;
        // TODO: use design tokens
        const MARGIN_OFFSET = 8;
        const MAX_HEIGHT = 464;
        computePosition(el, popoverElement, {
            strategy: popoverStrategy,
            middleware: [
                offset(MARGIN_OFFSET),
                autoPlacement({
                    allowedPlacements: ['top', 'bottom'],
                }),
                size({
                    apply({ rects, availableHeight }) {
                        Object.assign(popoverElement.style, {
                            width: `${rects.reference.width}px`,
                            maxHeight: `${Math.min(availableHeight - MARGIN_OFFSET, MAX_HEIGHT)}px`,
                        });
                    },
                }),
                shift({ padding: MARGIN_OFFSET }),
            ],
        }).then(({ x, y }) => {
            Object.assign(popoverElement.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
    initPopover() {
        this.popoverElement =
            this.popoverElement ||
                document.createElement(getNamespacedTagFor('market-popover'));
        this.popoverElement.id = this.popoverId;
        this.popoverElement.style.position = this.popoverStrategy;
    }
    initList() {
        this.list = this.el.querySelector('[slot="list"]');
        this.list.interactive = true;
        this.list.multiselect = this.multiselect;
        this.list.addEventListener('marketListSelectionsDidChange', this.handleListSelection.bind(this));
        this.list.addEventListener('marketListItemsFiltered', this.handleListItemsFiltered.bind(this));
        this.list.addEventListener('keydown', this.handleListKeyDown.bind(this));
        this.list.addEventListener('click', this.handleListClick.bind(this));
    }
    initRows() {
        this.rows = this.list.querySelectorAll(`${getNamespacedTagFor('market-row')}`);
        this.rows.forEach((row) => {
            // Set an ID for the row if it doesn't have one (we need this for aria-activedescendant)
            if (!row.id) {
                row.id = `market-row-${uuid()}`;
            }
        });
        // used for typeahead functionality
        this.rowsInnerText = [...this.rows]
            .filter((row) => {
            /**
             * Addresses an issue in test environments where the innerText of
             * market-rows isn't set before componentWillLoad of the parent market-select (this file)
             * is executed.
             */
            return row && row.innerText;
        })
            .map((row) => row.innerText.trim().toLowerCase());
    }
    moveListToPopover() {
        this.list.removeAttribute('slot');
        this.popoverElement.append(this.list);
    }
    moveListToSelect() {
        this.list.setAttribute('slot', 'list');
        this.el.append(this.list);
    }
    /* COMPONENT LIFECYCLE EVENTS AND HELPERS */
    registerSlottedAccessories() {
        const leadingAccessory = [...this.el.children].filter(function (child) {
            return child.matches('[slot="leading-accessory"]');
        });
        const trailingAccessory = [...this.el.children].filter(function (child) {
            return child.matches('[slot="trailing-accessory"]');
        });
        this.hasLeadingAccessory = leadingAccessory.length > 0;
        this.hasTrailingAccessory = trailingAccessory.length > 0;
    }
    componentWillLoad() {
        this.registerSlottedAccessories();
        this.popoverId = this.popoverId || `popover-${uuid()}`;
    }
    componentDidLoad() {
        this.initList();
        this.initRows();
        this.initPopover();
        this.initListObserver();
        this.propagateValue();
    }
    componentWillRender() {
        const { listIsActive, list } = this;
        if (list && listIsActive) {
            list.removeAttribute('slot');
        }
    }
    disconnectedCallback() {
        this.closeList();
    }
    render() {
        const tabindex = this.disabled ? null : '0';
        return (h(Host, { key: '9dc67f571060f9c4d9fc02684f5a1e6a4aeaf1ab', class: "market-select", role: "combobox", "aria-label": getTextInputAriaLabel(this.el), "aria-expanded": this.listIsActive.toString(), "aria-controls": this.popoverId, "aria-activedescendant": this.focusedRowIndex > -1 ? this.rows[this.focusedRowIndex].id : null, "aria-required": this.required.toString(), tabindex: tabindex, onClick: (e) => {
                this.handleTriggerClick(e);
            }, onFocus: () => {
                this.handleFocus();
            }, onKeyDown: (e) => {
                this.handleTriggerKeyDown(e);
            } }, h("slot", { key: '4b32c361f91a9e3ec8d602cf1f876008f5faca75', name: "leading-accessory", onSlotchange: () => this.registerSlottedAccessories() }), h("div", { key: '2f0a75e0c406f2b1e84c0c050505109f2f6707dc', class: classNames('label-input-container', {
                'has-leading-accessory': this.hasLeadingAccessory,
                'has-trailing-accessory': this.hasTrailingAccessory,
            }) }, h("slot", { key: '01e62bf7c3d22901f05ba0d050e5acb2a40fca34' }), h("slot", { key: '6e3f1047cda70d511eb140be503f536991002af0', name: "displayed-selection" }, h("div", { key: 'f82cb1204a14479df042296bcdf038a5050b10eb', class: "placeholder" }, this.placeholder))), h("slot", { key: 'c101691da11b4a75af72cafa91f42fc7bb8da3b1', name: "list" }), h("slot", { key: 'a156419f608e21bec5ea1d6075fc07f7638dfe96', name: "trailing-accessory", onSlotchange: () => this.registerSlottedAccessories() }), h("svg", { key: '7fa3d353a90501483e0e5adb804af1b51a1b5593', class: "caret", width: "14", height: "8", viewBox: "0 0 14 8", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '4e3ff52b7499db8f87bfae74ef7757378858891b', "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.70715 7.70711C7.31663 8.09763 6.68346 8.09763 6.29294 7.70711L0.29294 1.70711L1.70715 0.292892L7.00005 5.58579L12.2929 0.292893L13.7072 1.70711L7.70715 7.70711Z", fill: "black" }))));
    }
    static get is() { return "market-select"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-select.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-select.css"]
        };
    }
    static get properties() {
        return {
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
                    "tags": [],
                    "text": "String for the \"name\" attribute. Used when slotted into `market-field`."
                },
                "attribute": "name",
                "reflect": false
            },
            "value": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string | Array<any>",
                    "resolved": "any[] | string",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A string specifying a value for the select\nMust correspond to a `value` attribute on a slotted `market-row`\nFor multiselect, separate values with a comma (e.g. 'orange,pear')."
                },
                "attribute": "value",
                "reflect": true,
                "defaultValue": "''"
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
                    "tags": [],
                    "text": "String for setting select size.\nSizes `small` and `medium` visually hide the label,\nbut you should still provide one for accessibility purposes."
                },
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'large'"
            },
            "placeholder": {
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
                    "text": "A string specifying the placeholder for the select.\nThis is shown when the select is open with no selection."
                },
                "attribute": "placeholder",
                "reflect": false
            },
            "readonly": {
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
                    "text": "Whether or not the select is readonly."
                },
                "attribute": "readonly",
                "reflect": true,
                "defaultValue": "false"
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
                    "text": "Functionally and visually disables the select."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "focused": {
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
                    "text": "Whether or not the select is focused."
                },
                "attribute": "focused",
                "reflect": true,
                "defaultValue": "false"
            },
            "invalid": {
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
                    "text": "Whether or not the select is invalid (w/ corresponding visual state)"
                },
                "attribute": "invalid",
                "reflect": true,
                "defaultValue": "false"
            },
            "required": {
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
                    "text": "Whether or not the select is required. This property relays\nimportant contextual information when using a screen reader"
                },
                "attribute": "required",
                "reflect": true,
                "defaultValue": "false"
            },
            "multiselect": {
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
                    "text": "Whether or not multiselect is enabled"
                },
                "attribute": "multiselect",
                "reflect": true,
                "defaultValue": "false"
            },
            "popoverContainer": {
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
                    "text": "Ancestor selector to contain the popover menu.\nUse this if you need the popover to be appended to\nan ancestor element other than the `body` element."
                },
                "attribute": "popover-container",
                "reflect": false
            },
            "popoverStrategy": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Strategy",
                    "resolved": "\"absolute\" | \"fixed\"",
                    "references": {
                        "Strategy": {
                            "location": "import",
                            "path": "@floating-ui/dom",
                            "id": "../../node_modules/@floating-ui/dom/dist/floating-ui.dom.d.ts::Strategy"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Configuration option for Floating UI (used to position `<market-popover>`).\nDescribes the positioning strategy to use. By default, it is absolute. If\nyour reference element is in a fixed container, use the fixed strategy.\nhttps://floating-ui.com/docs/computePosition#strategy"
                },
                "attribute": "popover-strategy",
                "reflect": false,
                "defaultValue": "'absolute'"
            }
        };
    }
    static get states() {
        return {
            "listIsActive": {},
            "focusedRowIndex": {},
            "hasLeadingAccessory": {},
            "hasTrailingAccessory": {}
        };
    }
    static get events() {
        return [{
                "method": "marketSelectValueDidChange",
                "name": "marketSelectValueDidChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "property",
                            "text": "{string} value - value attribute of the selected element"
                        }, {
                            "name": "property",
                            "text": "{HTMLMarketRowElement} newSelectedOption - the row that has just been selected"
                        }, {
                            "name": "property",
                            "text": "{HTMLMarketRowElement} newDeselectedOption - the row that has just been deselected"
                        }, {
                            "name": "property",
                            "text": "{HTMLMarketRowElement} currentSelectedOptions - the rows that are currently selected"
                        }],
                    "text": "Fired by the `marketListSelectionsDidChange` listener."
                },
                "complexType": {
                    "original": "{\n    value: string | Array<any>;\n    newSelectedOption: HTMLMarketRowElement;\n    newDeselectedOption: HTMLMarketRowElement;\n    currentSelectedOptions: Array<HTMLMarketRowElement>;\n  }",
                    "resolved": "{ value: string | any[]; newSelectedOption: HTMLMarketRowElement; newDeselectedOption: HTMLMarketRowElement; currentSelectedOptions: HTMLMarketRowElement[]; }",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        },
                        "HTMLMarketRowElement": {
                            "location": "global",
                            "id": "global::HTMLMarketRowElement"
                        }
                    }
                }
            }, {
                "method": "marketSelectOpened",
                "name": "marketSelectOpened",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the select is opened."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "marketSelectClosed",
                "name": "marketSelectClosed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the select is closed."
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
            "openList": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLElement": {
                            "location": "global",
                            "id": "global::HTMLElement"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Opens the select.",
                    "tags": []
                }
            },
            "closeList": {
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
                    "text": "Closes the select.",
                    "tags": []
                }
            },
            "toggleList": {
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
                    "text": "Toggles the select open and closed.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "valueWatcher"
            }, {
                "propName": "multiselect",
                "methodName": "multiselectWatcher"
            }, {
                "propName": "focusedRowIndex",
                "methodName": "focusedRowIndexWatcher"
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
//# sourceMappingURL=market-select.js.map
