import type { Strategy } from '@floating-ui/dom';
import { EventEmitter } from '../../stencil-public-runtime';
declare const UP_DIRECTION = -1;
declare const DOWN_DIRECTION = 1;
/**
 * @slot - Intended for use as the input's text label.
 * @slot list - Intended for use with a slotted `<market-list>` containing `<market-row>`s.
 * @slot leading-accessory - An accessory set on the left side of the input.
 * @slot trailing-accessory - An accessory set on the right side of the input.
 * @slot displayed-selection - Used internally to display the selected `market-row` while retaining any custom styling. Not intended for use by Market consumers.
 */
export declare class MarketSelect {
    el: HTMLMarketSelectElement;
    /**
     * String for the "name" attribute. Used when slotted into `market-field`.
     */
    readonly name: string;
    /**
     * A string specifying a value for the select
     * Must correspond to a `value` attribute on a slotted `market-row`
     * For multiselect, separate values with a comma (e.g. 'orange,pear').
     */
    value: string | Array<any>;
    /**
     * String for setting select size.
     * Sizes `small` and `medium` visually hide the label,
     * but you should still provide one for accessibility purposes.
     */
    readonly size: 'small' | 'medium' | 'large';
    /**
     * A string specifying the placeholder for the select.
     * This is shown when the select is open with no selection.
     */
    readonly placeholder: string;
    /**
     * Whether or not the select is readonly.
     */
    readonly readonly: boolean;
    /**
     * Functionally and visually disables the select.
     */
    readonly disabled: boolean;
    /**
     * Whether or not the select is focused.
     */
    focused: boolean;
    /**
     * Whether or not the select is invalid (w/ corresponding visual state)
     */
    readonly invalid: boolean;
    /**
     * Whether or not the select is required. This property relays
     * important contextual information when using a screen reader
     */
    readonly required: boolean;
    /**
     * Whether or not multiselect is enabled
     */
    readonly multiselect: boolean;
    /**
     * Ancestor selector to contain the popover menu.
     * Use this if you need the popover to be appended to
     * an ancestor element other than the `body` element.
     */
    readonly popoverContainer: string;
    /**
     * Configuration option for Floating UI (used to position `<market-popover>`).
     * Describes the positioning strategy to use. By default, it is absolute. If
     * your reference element is in a fixed container, use the fixed strategy.
     * https://floating-ui.com/docs/computePosition#strategy
     */
    readonly popoverStrategy: Strategy;
    listIsActive: boolean;
    focusedRowIndex: number;
    hasLeadingAccessory: boolean;
    hasTrailingAccessory: boolean;
    /**
     * Fired by the `marketListSelectionsDidChange` listener.
     *
     * @property {string} value - value attribute of the selected element
     * @property {HTMLMarketRowElement} newSelectedOption - the row that has just been selected
     * @property {HTMLMarketRowElement} newDeselectedOption - the row that has just been deselected
     * @property {HTMLMarketRowElement} currentSelectedOptions - the rows that are currently selected
     */
    marketSelectValueDidChange: EventEmitter<{
        value: string | Array<any>;
        newSelectedOption: HTMLMarketRowElement;
        newDeselectedOption: HTMLMarketRowElement;
        currentSelectedOptions: Array<HTMLMarketRowElement>;
    }>;
    /**
     * Fired whenever the select is opened.
     */
    marketSelectOpened: EventEmitter;
    /**
     * Fired whenever the select is closed.
     */
    marketSelectClosed: EventEmitter;
    valueWatcher(): void;
    multiselectWatcher(): void;
    focusedRowIndexWatcher(): void;
    handleListSelection({ detail: { currentSelectionValues, currentSelections, newDeselection, newSelection } }: {
        detail: {
            currentSelectionValues: any;
            currentSelections: any;
            newDeselection: any;
            newSelection: any;
        };
    }): void;
    handleListItemsFiltered(): void;
    windowClick(e: any): void;
    getValues(): Set<string>;
    getValuesCount(): number;
    /**
     * We search based on the `value` property rather than using querySelector and the `value`
     * attribute (i.e. `market-row[value=${this.value}]`) due to rendering issues we've seen
     * with Ember/Handlebars, where the property may be set before attribute is present.
     * See here for details: https://github.com/squareup/market/issues/2635
     */
    getMatchingRows(): Array<HTMLMarketRowElement>;
    get hasMultipleSelections(): boolean;
    getMultiselectDisplayValue(): string;
    getDisplayedSelectionRow(): HTMLMarketRowElement;
    /**
     * Ensure the passed `value` is reflected in the selected list item and the displayed selection row.
     */
    propagateValue(): void;
    /**
     * Renders the passed row into the displayed selection slot, so it's visible
     * as the current selection in the main "input" area of the select.
     */
    displaySelection(selectedRows?: Array<HTMLMarketRowElement>): void;
    /**
     * Listens to changes in list content to ensure that if the content is dynamically updated,
     * those changes will be copied to the popover and the displayed-selection row.
     */
    initListObserver(): void;
    onListChange(): void;
    /**
     * Record the index of the new selected row for keyboard navigation
     */
    setFocusedRow(row: HTMLMarketRowElement): void;
    /**
     * Opens the select.
     */
    openList(): Promise<void>;
    /**
     * Closes the select.
     */
    closeList(): Promise<void>;
    /**
     * Toggles the select open and closed.
     */
    toggleList(): Promise<void>;
    handleTriggerKeyDown(ev: KeyboardEvent): void;
    /**
     * NOTE: market-list has its own internal keyboard functionality,
     * so we only handle the key presses while the parent select is focused.
     *
     * - if the list is open:
     *   - update the selected row to the next or previous row depending on the arrow direction
     * - if the list is closed:
     *   - open the list
     */
    handleArrowKey(ev: KeyboardEvent, direction: typeof UP_DIRECTION | typeof DOWN_DIRECTION): Promise<void>;
    /**
     * - if the list is open:
     *   - close it
     * - if the list is closed:
     *   - open the list
     *   - if there is a current selection, focus it
     */
    handleSpacebar(ev: KeyboardEvent): Promise<void>;
    /**
     * when the list is closed, invoke implicit submission
     */
    handleEnterKey(): void;
    handleEscape(): void;
    handleTab(ev: KeyboardEvent): void;
    handleHomeKey(ev: KeyboardEvent): void;
    handleEndKey(ev: KeyboardEvent): void;
    handleListKeyDown(ev: KeyboardEvent): void;
    /**
     * market-list handles selection functionality internally
     * just need to close the list if single select
     */
    handleListSpacebar(ev: any): void;
    /**
     * market-list handles selection functionality internally
     * just need to close the list if single select
     */
    handleListEnter(): void;
    rowsInnerText: Array<string>;
    keypresses: Array<string>;
    debounceDelay: number;
    typeaheadHandler(ev: KeyboardEvent): void;
    storeKeypresses(ev: any): void;
    setFocusOnMatch: (...args: any) => void;
    handleFocus(): void;
    handleTriggerClick(ev: any): void;
    handleListClick(): void;
    cleanupPopperListeners: Function;
    initPopperListeners(): void;
    updatePopper(): void;
    list: HTMLMarketListElement;
    rows: NodeListOf<HTMLMarketRowElement>;
    popoverElement: HTMLMarketPopoverElement;
    popoverId: string;
    initPopover(): void;
    initList(): void;
    initRows(): void;
    moveListToPopover(): void;
    moveListToSelect(): void;
    registerSlottedAccessories(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillRender(): void;
    disconnectedCallback(): void;
    render(): any;
}
export {};
