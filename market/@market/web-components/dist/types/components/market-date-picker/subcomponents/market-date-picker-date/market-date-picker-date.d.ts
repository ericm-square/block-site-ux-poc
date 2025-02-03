import { EventEmitter } from '../../../../stencil-public-runtime';
export declare class MarketDatePickerDate {
    el: HTMLMarketDatePickerDateElement;
    /**
     * Functionally and visually disables the date picker date
     */
    readonly disabled: boolean;
    /**
     * String for setting date picker date selection type
     */
    readonly selection: 'none' | 'single' | 'range-first' | 'range-middle' | 'range-last';
    /**
     * Handles whether or not date picker date is for today's date
     */
    readonly today: boolean;
    /**
     * Handles whether or not date picker date is selected
     */
    readonly selected: boolean;
    /**
     * String for user to pass in value of the date
     */
    readonly day: string | null;
    /**
     * String type to determine type of date selected for parent component
     */
    readonly type: 'day' | 'month' | 'year';
    /**
     * Emitted when the date picker date is selected
     */
    marketDatePickerDateSelected: EventEmitter<{
        date: HTMLMarketDatePickerDateElement;
    }>;
    /**
     * Emitted when the date picker date is hovered or moused over
     */
    marketDatePickerDateMousedOver: EventEmitter<{
        date: HTMLMarketDatePickerDateElement;
    }>;
    /**
     * Emitted when the date picker date is unhovered or moused out
     */
    marketDatePickerDateMousedOut: EventEmitter;
    /**
     * Interaction handler that passes events back to the market-date-picker component
     */
    handleInteraction(e: Event): void;
    render(): any;
}
