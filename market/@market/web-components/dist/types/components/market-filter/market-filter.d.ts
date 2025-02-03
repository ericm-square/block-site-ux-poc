import type { Placement, PositioningStrategy } from '@popperjs/core';
import { EventEmitter } from '../../stencil-public-runtime';
import { TMarketDateRangeChangedEventDetail } from '../market-date-picker/events';
import { TMarketListSelectionsDidChangeEventDetail } from '../market-list/events';
import { TMarketFilterDateRangeValues, TMarketFilterExpandedChangeEventDetail, TMarketFilterValueDidChangeEventDetail } from './events';
import { TMarketFilterType } from './types';
/**
 * @slot label - Filter label, using `<label>`
 * @slot display-value - Overwrites the displayed value or feedback
 * @slot - The `<market-list>` or `<market-date-picker>` element
 */
export declare class MarketFilter {
    el: HTMLMarketFilterElement;
    /**
     * Filter name
     */
    readonly name: string;
    /**
     * Functionally and visually disables the filter button
     */
    readonly disabled?: boolean;
    /**
     * Whether or not the button is focused
     */
    focused: boolean;
    /**
     * String for setting filter button size
     */
    readonly size: 'medium' | 'small';
    /**
     * Determines whether the filter is expanded or collapsed
     */
    expanded: boolean;
    /**
     * Defines what types of interaction the dropdown should have
     * (see `market-dropdown` docs for more granular explanation).
     *
     * If not defined and the list is multiselect,
     * the dropdown interaction will be set to `persistent`
     * so that the dropdown won't automatically close after selecting a row.
     */
    readonly dropdownInteraction?: HTMLMarketDropdownElement['interaction'];
    /**
     * Configuration option for Popper.js (used to position `<market-popover>`).
     * Describes the positioning strategy to use. By default, it is `bottom-start`.
     * https://popper.js.org/docs/v2/constructors/#strategy
     */
    readonly popoverPlacement?: Placement;
    /**
     * Configuration option for Popper.js (used to position `<market-popover>`).
     * Describes the positioning strategy to use. By default, it is absolute. If
     * your reference element is in a fixed container, use the fixed strategy.
     * https://popper.js.org/docs/v2/constructors//#strategy
     */
    readonly popoverStrategy: PositioningStrategy;
    /**
     * @deprecated
     * **DEPRECATED (v4.5.0)** Use `marketFilterExpandedChanged` instead.
     *
     * Fired whenever the filter is closed
     */
    marketFilterClosed: EventEmitter<void>;
    /**
     * @deprecated
     * **DEPRECATED (v4.5.0)** Use `marketFilterExpandedChanged` instead.
     *
     * Fired whenever the filter is opened
     */
    marketFilterOpened: EventEmitter<void>;
    /**
     * Fired whenever the dropdown is expanded/collapsed
     */
    marketFilterExpandedChanged: EventEmitter<TMarketFilterExpandedChangeEventDetail>;
    /**
     * Fired by the `marketListSelectionsDidChange` listener.
     *
     * @property {string} name - filter name, from `name` prop
     * @property {string | string[] | TMarketFilterDateRangeValues } prevValue - list: selected value(s); date: `[<startDate>, <endDate>]`
     * @property {string | string[] | TMarketFilterDateRangeValues } value - list: selected value(s); date: `[<startDate>, <endDate>]`
     */
    marketFilterValueDidChange: EventEmitter<TMarketFilterValueDidChangeEventDetail>;
    /**
     * Display value inferred from the `<market-list>` or `<market-date-picker>`
     */
    selectedDisplayValue: string;
    /**
     * Reference to the market-filter-button
     */
    private filterButtonEl;
    /**
     * The selected row's raw value. This is only used for list types.
     */
    private rawValue;
    /**
     * Filter type
     */
    private filterType;
    /**
     * Reference to the slotted `<market-date-picker>`
     */
    private datePickerEl?;
    /**
     * Reference to the slotted `<market-list>`
     */
    private listEl?;
    private popoverId;
    /**
     * **INTERNAL [do not use directly]**
     *
     * Get the filter type
     */
    getFilterType(): Promise<TMarketFilterType>;
    /**
     * Toggle focus on the filter button
     * @param {boolean} [value=true] whether or not focus will be applied or removed
     * @returns {Promise<boolean>} whether or not the filter was focused or blurred
     */
    setFocus(value?: boolean): Promise<boolean>;
    /**
     * @private
     * *INTERNAL*: Used by `market-filter-dropdown-menu` to reemit events from the cloned datepicker inside the dropdown.
     *
     * Sets the value of the list and emits `marketFilterValueDidChange`.
     *
     * @param value - The value to set for the market filter.
     * @returns A promise that resolves when the value is set.
     */
    __setAndEmitListValue(value: string | string[]): Promise<void>;
    /**
     * @private
     * *INTERNAL*: Used by `market-filter-dropdown-menu` to reemit events from the cloned datepicker inside the dropdown.
     *
     * Sets the value of the date picker emits `marketFilterValueDidChange`.
     *
     * @param value - The new value for the date picker.
     * @returns A promise that resolves when the value is set.
     */
    __setAndEmitDatePickerValue(value: TMarketFilterDateRangeValues): Promise<void>;
    /**
     * Handle `marketListSelectionsDidChange` emitted by `<market-list>`
     */
    handleListSelectionChange({ detail }: CustomEvent<TMarketListSelectionsDidChangeEventDetail>): void;
    /**
     * Handle `marketDateRangeChanged` emitted by `<market-date-picker>`
     */
    handleDateRangeChange(e: CustomEvent<TMarketDateRangeChangedEventDetail>): void;
    /**
     * Handle `marketDropdownOpened` emitted by `<market-dropdown>`
     */
    handleDropdownOpened(e: CustomEvent<void>): void;
    /**
     * Handle `marketDropdownClosed` emitted by `<market-dropdown>`
     */
    handleDropdownClosed(e: CustomEvent<void>): void;
    /**
     * Handle default slot changes
     */
    handleDefaultSlotChange(): void;
    /**
     * Listens to changes in row content to ensure that if the selected row's content
     * is dynamically updated, those changes will be reflected to `selectedDisplayValue`.
     */
    private initRowObservers;
    /**
     * Gets the `.textContent` of the `<market-row>` with the provided `value`.
     * This is only used for list types.
     */
    private getTextContentOfRowWithValue;
    /**
     * Infers the value from the <market-list> or <market-date-picker>
     */
    private setDisplayValueFromSlottedElement;
    private formatDate;
    /**
     * Calculate the display value from the `marketDateRangeChanged` event of `<market-list>`
     * Formatting is based on design guidelines:
     * https://www.notion.so/marketdesignsystem/Filters-78885543b16446f49d5cfa98c6a56648#bb6aac7e29e04f98890ba32042ddae05
     */
    private setDisplayValueFromDateEvent;
    /**
     * Calculate the display value from the `marketListSelectionsDidChange` event of `<market-list>`
     */
    private setDisplayValueFromListEvent;
    connectedCallback(): void;
    render(): any;
}
