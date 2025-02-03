import { EventEmitter } from '../../stencil-public-runtime';
import { MENU_SLOT_NAMES } from './enums/menu';
import { TMarketDateRangeChangedEventDetail, TMarketDatePickerMenuSelectionChangedEventDetail } from './events';
/**
 * Object class to hold necessary date information when building out each market-date-picker-date for the calendar
 */
declare class Day {
    date: string;
    month: number;
    year: number;
    selected: boolean;
    selection: 'none' | 'single' | 'range-first' | 'range-middle' | 'range-last';
    today: boolean;
    disabled: boolean;
}
export declare class MarketDatePicker {
    el: HTMLMarketDatePickerElement;
    /**
     * Whether the date picker allows selection of a single date or a date range
     */
    readonly selectionType: 'single' | 'range';
    /**
     * User selected single date or start date for a range saved as an ISO formatted string.
     * Use DateTime string format as seen here: https://tc39.es/ecma262/#sec-date-time-string-format
     * Example: `YYYY-MM-DDT08:00`.
     */
    selectedStartDate: string;
    /**
     * User selected end date for a range saved as an ISO formatted string.
     * Use DateTime string format as seen here: https://tc39.es/ecma262/#sec-date-time-string-format
     * Example: `YYYY-MM-DDT08:00`.
     */
    selectedEndDate: string;
    /**
     * Preset menu option to populate date picker range.
     * Presetting `custom` should be used with `selectedStartDate` and `selectedEndDate` props.
     * Otherwise if both `selectedStartDate/selectedEndDate` and `presetMenuOption` are given, `presetMenuOption` takes precedence.
     */
    readonly presetMenuOption: MENU_SLOT_NAMES;
    /**
     * Whether or not the side market-date-picker-menu is shown.
     * To pass in translation supported text, use slots available for each option.
     */
    readonly displayMenu: boolean;
    /**
     * Position of menu on a mobile screen, if market-date-picker-menu is shown.
     */
    readonly mobileMenuPosition: 'top' | 'bottom';
    /**
     * A list of market-date-picker-menu items that will be excluded from appearing on the menu list.
     * i.e. `this-year,last-year` or `today,this-week,last-week,custom`
     * The menu names are lowercase and hyphenated strings, found here:
     * https://github.com/squareup/market/blob/main/web/web-components/src/components/market-date-picker/enums/menu.tsx
     *
     * This works in conjunction with timeframe,
     * i.e. "timeframe=past", excludes dates in the future in addition to the ones here.
     * This is written as items separated by ','.
     */
    readonly excludeMenuItems: string;
    /**
     * String for setting timeframe type to select which market-date-picker-menu items to show.
     * Past means only past dates available, future is only current and future dates, and present is the default for all shown.
     */
    readonly timeframe: 'past' | 'present' | 'future';
    /**
     * A function that takes a datestring and returns a boolean determining if it should be disabled.
     * This does not override disabled dates based on the timeframe prop.
     * See https://ionicframework.com/docs/api/datetime#advanced-date-constraints for examples of passing in a function as a Stencil component prop.
     */
    readonly isDateDisabled: (day: Date) => boolean;
    /**
     * Date picker locale. Defaults to browser locale. If that cannot be determined, defaults to 'en-US'.
     */
    readonly locale: string;
    /**
     * The ISO formatted string that determines the displayed month on the calendar.
     * Use DateTime string format as seen here: https://tc39.es/ecma262/#sec-date-time-string-format
     * Example: `YYYY-MM-DDT08:00`.
     * Note: Omitting the time portion defaults to UTC, so this may display as a day behind on your calendar!
     * If you add hours it will default to your timezone, like the above example.
     * Invalid date strings default to today's date.
     */
    displayedDate: string;
    /**
     * This enables the input field for the date picker.
     */
    withInputs: '' | 'date' | 'date-and-time';
    /**
     * Whether the selected dates are invalid.
     * It should not be possible to click on invalid dates, so this occurs through date inputs.
     */
    invalid: boolean;
    /**
     * Displays a clickable caret in the month/year header.
     * If it is up, we show the month/year selection view instead of dates.
     */
    yearViewActive: boolean;
    /**
     * Fired whenever the selected date range is changed.
     */
    marketDateRangeChanged: EventEmitter<TMarketDateRangeChangedEventDetail>;
    /**
     * @deprecated
     * **DEPRECATED (v4.5.0)** Use `marketDatePickerMenuSelectionChanged` instead.
     *
     * Fired whenever the menu selection is changed. Indicates which menu option is currently selected.
     * Possible values are found here:
     * https://github.com/squareup/market/blob/main/web/web-components/src/components/market-date-picker/enums/menu.tsx
     */
    marketMenuSelectionChanged: EventEmitter<TMarketDatePickerMenuSelectionChangedEventDetail>;
    /**
     * Current displayed month and year for the calendar view. This can be updated with month or locale changes.
     */
    displayedMonth: string;
    /**
     * Current displayed weekday header for the calendar view. This can be updated with locale changes.
     */
    displayedWeekdays: Array<string>;
    /**
     * Current displayed years for the calendar year view. This can be updated with the left and right chevron buttons.
     */
    yearViewYearsList: Array<string>;
    /**
     * Currently hovered date. Only used for date range calendar styling to highlight potential ranges.
     */
    hoveredDate: Date;
    /**
     * Array holding our Day objects to build out calendar view.
     */
    private days;
    /**
     * Current displayed months for the calendar year view. This can be updated with locale changes.
     */
    private yearViewMonthList;
    /**
     * Unique id for date picker label for a11y
     */
    private datePickerLabel;
    /**
     * Build out the weekday headers based on locale for the calendar view.
     */
    buildWeekdays(): void;
    getLocaleFirstDayOfWeek(): 0 | 1 | 5 | 2 | 3 | 4 | 6;
    /**
     * Compares current hovered date to selected dates to determine correct styling for selection.
     */
    addHoveredDateRangeStyling(currentDate: Date, datePickerDay: Day): void;
    /**
     * Helper function to add selection metadata to the date object being processed in buildCalendar.
     */
    addDateSelectionAttributes(day: any, calendarDate: any, currentStartDate: any, currentEndDate: any): void;
    /**
     * The main chunk of this component is building out the calendar view.
     * Ensures correct styling and formatting is placed on each date component.
     * Adapted from: https://ionicframework.com/blog/building-with-stencil-calendar-component/
     */
    buildCalendar(): void;
    /**
     * Helper function to clear date selections.
     */
    clearDateSelections(): void;
    /**
     * Used for the navigation arrows in the market-date-picker header, moves the calendar forward/backward by increment.
     * Currently only used for +1/-1 month.
     */
    navigateMonth(increment: any): void;
    /**
     *  When ever an event changes the selected date, this updates the calendar view.
     *  The event receives a date string in the yyyy-mm-dd or yyy-mm-ddThh:mm format.
     *  this then checks what parts of the date have changed and only sends the changed parts to the
     * _selectDate function that receives (day, month, year)
     */
    dateInputDateSet({ detail: { date, input } }: {
        detail: {
            date: any;
            input: any;
        };
    }): void;
    /**
     * Whenever a market-date-picker-date is selected, this updates the selected date props, which then updates the calendar view.
     */
    selectDate({ detail: { date: dateElement } }: {
        detail: {
            date: any;
        };
    }): void;
    /**
     * Whenever a market-date-picker-date is moused over or hovered, this updates the hovered date to update the calendar view.
     */
    hoverDate({ detail: { date: dateElement } }: {
        detail: {
            date: any;
        };
    }): void;
    /**
     * Whenever a market-date-picker-date is moused out, clear any hovering styling in the calendar view.
     */
    mousedOutDate(): void;
    /**
     * Whenever a market-row within market-date-picker-menu is selected, this ensures we move the current selected dates
     * to whichever option the user has selected.
     */
    selectMenuRow(e: CustomEvent<TMarketDatePickerMenuSelectionChangedEventDetail>): void;
    /**
     * Updates invalid state of date picker based on date input selections
     */
    setInvalidState({ detail: { invalid } }: {
        detail: {
            invalid: any;
        };
    }): void;
    private _setMenuRowOption;
    _selectDate(options: {
        day?: number;
        month?: number;
        year?: number;
        hour?: number;
        minute?: number;
        input?: string;
    }): void;
    toggleCaret(): void;
    validateDisplayedDate(date: string): void;
    buildInitialYearView(): void;
    updateDisplayedYearList(increment: number): void;
    updateDisplayedHeader(type: string, value: string): void;
    componentWillLoad(): void;
    /**
     * Core function called whenever props or states are changed to update the calendar view.
     */
    componentWillRender(): void;
    render(): any;
}
export {};
