import { EventEmitter } from '../../../../stencil-public-runtime';
export declare class MarketDateInputDate {
    /**
     * Whether to use date-time input instead of date-only
     * @type {boolean}
     * @memberof MarketDateInputDate
     * @default false
     */
    readonly withTime: boolean;
    /**
     * The selected start date
     * @type {string}
     * @memberof MarketDateInputDate
     * @default ''
     */
    readonly selectedStartDate: string;
    /**
     * The selected end date
     * @type {string}
     * @memberof MarketDateInputDate
     * @default ''
     */
    readonly selectedEndDate: string;
    /**
     * A function that returns true if the date should be disabled
     * @type {(day: Date) => boolean}
     * @memberof MarketDateInputDate
     * @default undefined
     */
    readonly isDateDisabled: (day: Date) => boolean;
    /**
     * The timeframe to restrict the date picker to
     * @type {'past' | 'future' | 'present'}
     * @memberof MarketDateInputDate
     * @default 'present'
     */
    readonly timeframe: 'past' | 'future' | 'present';
    /**
     * Whether the date picker is a range
     * @type {boolean}
     * @memberof MarketDateInputDate
     * @default false
     */
    readonly range: boolean;
    /**
     * Emitted when the date picker date is selected
     */
    marketDatePickerInputDateSet: EventEmitter<{
        date: string;
        input: string;
    }>;
    /**
     * Emitted when the date selection changes validity
     */
    marketDatePickerInputDateInvalidStateChanged: EventEmitter<{
        invalid: boolean;
    }>;
    isRangeInvalid: boolean;
    emitInvalidStateEvent(): void;
    private formatDate;
    private isInvalidDateForTimeframe;
    private updateInvalidState;
    private isDateInvalid;
    emitDateSetStart(ev: Event): void;
    emitDateSetEnd(ev: Event): void;
    emitDateSetStartTime(ev: Event): void;
    emitDateSetEndTime(ev: Event): void;
    emitDateSet(ev: Event, input: string, timeInput?: boolean): void;
    componentWillRender(): void;
    render(): any;
}
