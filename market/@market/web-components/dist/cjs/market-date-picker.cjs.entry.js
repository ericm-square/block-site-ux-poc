'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-37364565.js');
const menu = require('./menu-9896e1fb.js');
const index$3 = require('./index-254d04f0.js');
const index = require('./index-b1e6d30f.js');
const index$2 = require('./index-0cc3ca63.js');
const v4 = require('./v4-8e8d6fbc.js');

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} - the new date with the days added
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(dirtyDate, dirtyAmount) {
  index.requiredArgs(2, arguments);
  var date = index.toDate(dirtyDate);
  var amount = index.toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */
function addMonths(dirtyDate, dirtyAmount) {
  index.requiredArgs(2, arguments);
  var date = index.toDate(dirtyDate);
  var amount = index.toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return date;
  }
  var dayOfMonth = date.getDate();

  // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  index.requiredArgs(1, arguments);
  var defaultOptions = index.getDefaultOptions();
  var weekStartsOn = index.toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = index.toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name addWeeks
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of week to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the weeks added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * const result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
function addWeeks(dirtyDate, dirtyAmount) {
  index.requiredArgs(2, arguments);
  var amount = index.toInteger(dirtyAmount);
  var days = amount * 7;
  return addDays(dirtyDate, days);
}

/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the years added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * const result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears(dirtyDate, dirtyAmount) {
  index.requiredArgs(2, arguments);
  var amount = index.toInteger(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth(dirtyDate) {
  index.requiredArgs(1, arguments);
  var date = index.toDate(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(dirtyDate) {
  index.requiredArgs(1, arguments);
  var cleanDate = index.toDate(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the end of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  index.requiredArgs(1, arguments);
  var defaultOptions = index.getDefaultOptions();
  var weekStartsOn = index.toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = index.toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name lastDayOfMonth
 * @category Month Helpers
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the last day of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * const result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfMonth(dirtyDate) {
  index.requiredArgs(1, arguments);
  var date = index.toDate(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name lastDayOfYear
 * @category Year Helpers
 * @summary Return the last day of a year for the given date.
 *
 * @description
 * Return the last day of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the last day of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of a year for 2 September 2014 11:55:00:
 * const result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 00:00:00
 */
function lastDayOfYear(dirtyDate) {
  index.requiredArgs(1, arguments);
  var date = index.toDate(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name startOfYesterday
 * @category Day Helpers
 * @summary Return the start of yesterday.
 * @pure false
 *
 * @description
 * Return the start of yesterday.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `new Date()` internally hence impure and can't be safely curried.
 *
 * @returns {Date} the start of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfYesterday()
 * //=> Sun Oct 5 2014 00:00:00
 */
function startOfYesterday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name subMonths
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * const result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
function subMonths(dirtyDate, dirtyAmount) {
  index.requiredArgs(2, arguments);
  var amount = index.toInteger(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}

/**
 * @name subWeeks
 * @category Week Helpers
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the weeks subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * const result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
function subWeeks(dirtyDate, dirtyAmount) {
  index.requiredArgs(2, arguments);
  var amount = index.toInteger(dirtyAmount);
  return addWeeks(dirtyDate, -amount);
}

/**
 * @name subYears
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the years subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * const result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
function subYears(dirtyDate, dirtyAmount) {
  index.requiredArgs(2, arguments);
  var amount = index.toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}

const marketDatePickerCss = ":host{display:flex}@media only screen and (max-width: 800px){:host([mobile-menu-position=\"top\"]){flex-direction:column}:host([mobile-menu-position=\"top\"]) list-view{margin-bottom:var(--date-picker-menu-vertical-spacing)}:host([mobile-menu-position=\"bottom\"]){flex-direction:column-reverse}:host([mobile-menu-position=\"bottom\"]) list-view{margin-top:var(--date-picker-menu-vertical-spacing)}}header{height:var(--date-picker-header-minimum-height);margin-bottom:var(--date-picker-header-vertical-spacing)}nav{display:flex;justify-content:space-between;align-items:center}:host([year-view-active]) nav{justify-content:center}[id^=\"date-picker-label-\"]{margin:0}.year-view-button{color:var(--date-picker-month-year-label-color, var(--core-text-10-color))}.year-view-button:hover,.year-view-button:active{background-color:transparent;color:var(--core-emphasis-text-color)}.caret{margin-left:var(--date-picker-header-button-padding)}:host([year-view-active]) .caret{transform:rotate(-180deg)}calendar{min-width:var(--date-picker-minimum-width)}month-view{display:grid;grid-template-rows:repeat(auto-fill, 1fr);grid-template-columns:repeat(7, 1fr);gap:var(--date-picker-grid-item-vertical-padding) var(--date-picker-grid-item-horizontal-padding);box-sizing:border-box}year-section{display:flex;gap:var(--date-picker-grid-item-year-button-vertical-padding, 0)\n    var(--date-picker-grid-item-year-button-horizontal-padding, 12.5px);box-sizing:border-box}year-section .market-icon{width:var(--date-picker-grid-item-year-button-icon-size, var(--accessory-icon-variant-medium-size-height))}month-section{display:grid;grid-template-rows:repeat(3, 1fr);grid-template-columns:repeat(4, 1fr);gap:var(--date-picker-grid-item-month-button-vertical-padding, 16px)\n    var(--date-picker-grid-item-month-button-horizontal-padding, 26.67px);box-sizing:border-box}";
const MarketDatePickerStyle0 = marketDatePickerCss;

/**
 * Object class to hold necessary date information when building out each market-date-picker-date for the calendar
 */
class Day {
    constructor() {
        this.date = '';
        this.month = null;
        this.year = null;
        // For market-date-picker-date props
        this.selected = false;
        this.selection = 'none';
        this.today = false;
        this.disabled = false;
    }
}
const MarketDatePicker = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.marketDateRangeChanged = index$1.createEvent(this, "marketDateRangeChanged", 7);
        this.marketMenuSelectionChanged = index$1.createEvent(this, "marketMenuSelectionChanged", 7);
        /**
         * Current displayed months for the calendar year view. This can be updated with locale changes.
         */
        this.yearViewMonthList = [];
        this.selectionType = 'single';
        this.selectedStartDate = undefined;
        this.selectedEndDate = undefined;
        this.presetMenuOption = undefined;
        this.displayMenu = false;
        this.mobileMenuPosition = 'top';
        this.excludeMenuItems = '';
        this.timeframe = 'present';
        this.isDateDisabled = undefined;
        this.locale = navigator.language || 'en-US';
        this.displayedDate = undefined;
        this.withInputs = '';
        this.invalid = false;
        this.yearViewActive = false;
        this.displayedMonth = undefined;
        this.displayedWeekdays = [];
        this.yearViewYearsList = [];
        this.hoveredDate = undefined;
    }
    /**
     * Build out the weekday headers based on locale for the calendar view.
     */
    buildWeekdays() {
        this.displayedWeekdays = [];
        // Grab start of the week
        const weekday = startOfWeek(new Date(), { weekStartsOn: this.getLocaleFirstDayOfWeek() });
        let weekdayText;
        for (let d = 0; d < 7; d++) {
            weekdayText = weekday.toLocaleDateString(this.locale, { weekday: 'short' });
            // Shorten English based weekday headers by one
            if (this.locale.startsWith('en-')) {
                weekdayText = weekdayText.slice(0, -1);
            }
            this.displayedWeekdays.push(weekdayText);
            weekday.setDate(weekday.getDate() + 1);
        }
    }
    getLocaleFirstDayOfWeek() {
        var _a, _b, _c, _d, _e;
        const intl = new Intl.Locale(this.locale);
        // Chrome uses weekInfo as a property, Safari uses getWeekInfo() as a fn on the locale to get week info.
        // This is not yet supported in Firefox, so default to Sunday if no first day info is found.
        const firstDay = (_e = (_b = (_a = intl === null || intl === void 0 ? void 0 : intl.weekInfo) === null || _a === void 0 ? void 0 : _a.firstDay) !== null && _b !== void 0 ? _b : (_d = (_c = intl === null || intl === void 0 ? void 0 : intl.getWeekInfo) === null || _c === void 0 ? void 0 : _c.call(intl)) === null || _d === void 0 ? void 0 : _d.firstDay) !== null && _e !== void 0 ? _e : 0;
        // Translates the "Sunday" case, which weekInfo sets to 7
        return (firstDay % 7);
    }
    /**
     * Compares current hovered date to selected dates to determine correct styling for selection.
     */
    addHoveredDateRangeStyling(currentDate, datePickerDay) {
        if (!this.hoveredDate) {
            return;
        }
        const currentStartDate = new Date(this.selectedStartDate);
        // Set the day to be in the middle of a range when there is a start date and no end date,
        // and the day in question is between the start date and hovered date.
        if (this.selectedStartDate &&
            !this.selectedEndDate &&
            index$2.isBefore(currentDate, this.hoveredDate) &&
            index$2.isAfter(currentDate, currentStartDate)) {
            datePickerDay.selection = 'range-middle';
        }
        if (!index$2.isSameDay(this.hoveredDate, currentDate)) {
            return;
        }
        // If there's no start date, or a date range is selected, or the hovered date is before or the same as the start date,
        // the hovered button should be the start of a new range.
        if (!this.selectedStartDate ||
            (this.selectedStartDate && this.selectedEndDate) ||
            !index$2.isAfter(this.hoveredDate, currentStartDate)) {
            datePickerDay.selection = 'range-first';
        }
        else {
            datePickerDay.selection = 'range-last';
        }
    }
    /**
     * Helper function to add selection metadata to the date object being processed in buildCalendar.
     */
    addDateSelectionAttributes(day, calendarDate, currentStartDate, currentEndDate) {
        // Checks for start date comparison (for both single/range types)
        if (currentStartDate && index$2.isSameDay(calendarDate, currentStartDate)) {
            day.selected = true;
            day.selection = this.selectionType === 'single' ? 'single' : 'range-first';
        }
        // For range types only, check for dates within a selected range, or ends in a range
        if (this.selectionType === 'range') {
            this.addHoveredDateRangeStyling(calendarDate, day);
            if (currentStartDate &&
                currentEndDate &&
                index$2.isAfter(calendarDate, currentStartDate) &&
                index$2.isBefore(calendarDate, currentEndDate)) {
                day.selected = true;
                day.selection = 'range-middle';
            }
            if (currentEndDate && index$2.isSameDay(calendarDate, currentEndDate)) {
                day.selected = true;
                day.selection = 'range-last';
            }
        }
    }
    /**
     * The main chunk of this component is building out the calendar view.
     * Ensures correct styling and formatting is placed on each date component.
     * Adapted from: https://ionicframework.com/blog/building-with-stencil-calendar-component/
     */
    buildCalendar() {
        const today = new Date();
        const currentDisplayedDate = new Date(this.displayedDate);
        // Calendar used in iteration
        const calendar = new Date(currentDisplayedDate.getFullYear(), currentDisplayedDate.getMonth(), 1);
        // First day of month may not be first day of week
        // Roll back until first day of week
        // First day can either start at Sunday or Monday, so if it is Monday, subtract a day at the start of the calendar
        const firstDayOffset = this.getLocaleFirstDayOfWeek();
        // Handles edge case where a locale with Monday as the first day, starts on Sunday
        // This case builds the calendar with 6 blank squares in front of the first day (as expected)
        if (calendar.getDay() === 0 && firstDayOffset === 1) {
            calendar.setDate(calendar.getDate() - 6);
        }
        else {
            calendar.setDate(calendar.getDate() - (calendar.getDay() - firstDayOffset));
        }
        // Clear days to be rendered
        this.days = [];
        // Create date objects from selected dates if they exist
        const currentStartDate = this.selectedStartDate && new Date(this.selectedStartDate);
        const currentEndDate = this.selectedEndDate && new Date(this.selectedEndDate);
        for (let d = 0; d < 42; d++) {
            // Day to be rendered
            // Seed with current date in iteration
            const day = new Day();
            day.year = calendar.getFullYear();
            day.month = calendar.getMonth();
            // Populate day in month
            // Undefined date properties are not rendered
            if (calendar.getFullYear() === currentDisplayedDate.getFullYear() &&
                calendar.getMonth() === currentDisplayedDate.getMonth()) {
                day.date = calendar.getDate().toString();
            }
            // Check for today
            if (index$2.isSameDay(calendar, today)) {
                day.today = true;
            }
            // Check for selection types
            this.addDateSelectionAttributes(day, calendar, currentStartDate, currentEndDate);
            // Check for disabled dates
            if (day.date && this.isDateDisabled) {
                day.disabled = this.isDateDisabled(calendar);
            }
            if (this.timeframe === 'future' && index$2.isBefore(calendar, today) && !index$2.isSameDay(calendar, today)) {
                day.disabled = true;
            }
            if (this.timeframe === 'past' && index$2.isAfter(calendar, today) && !index$2.isSameDay(calendar, today)) {
                day.disabled = true;
            }
            // Add to days to be rendered
            this.days.push(day);
            // Move to next date
            calendar.setDate(calendar.getDate() + 1);
            // Do not render the last week
            // Depending on calendar layout
            // Some months require five weeks
            // Others six weeks (see May 2021)
            if (calendar.getDay() === 0 + firstDayOffset && calendar.getMonth() !== currentDisplayedDate.getMonth()) {
                break;
            }
        }
    }
    /**
     * Helper function to clear date selections.
     */
    clearDateSelections() {
        this.selectedStartDate = null;
        this.selectedEndDate = null;
    }
    /**
     * Used for the navigation arrows in the market-date-picker header, moves the calendar forward/backward by increment.
     * Currently only used for +1/-1 month.
     */
    navigateMonth(increment) {
        const currentDisplayedDate = new Date(this.displayedDate);
        this.displayedDate = new Date(currentDisplayedDate.getFullYear(), currentDisplayedDate.getMonth() + increment, 1).toISOString();
    }
    /**
     *  When ever an event changes the selected date, this updates the calendar view.
     *  The event receives a date string in the yyyy-mm-dd or yyy-mm-ddThh:mm format.
     *  this then checks what parts of the date have changed and only sends the changed parts to the
     * _selectDate function that receives (day, month, year)
     */
    dateInputDateSet({ detail: { date, input } }) {
        const [newDate, time] = date.split('T');
        const [newYear, newMonth, newDay] = newDate.split('-').map(Number);
        this.displayedDate = new Date(newYear, newMonth - 1, 1).toString();
        // fallback to undefined, to prevent overwriting if time was initialized but withTime is disabled.
        const [hour, minute] = this.withInputs === 'date-and-time' ? time.split(':').map(Number) : [];
        this._selectDate({
            day: newDay,
            month: newMonth - 1,
            year: newYear,
            hour,
            minute,
            input,
        });
    }
    /**
     * Whenever a market-date-picker-date is selected, this updates the selected date props, which then updates the calendar view.
     */
    selectDate({ detail: { date: dateElement } }) {
        if (dateElement.type !== 'day') {
            this.updateDisplayedHeader(dateElement.type, dateElement.day);
        }
        else {
            this._selectDate({ day: dateElement.day });
        }
    }
    /**
     * Whenever a market-date-picker-date is moused over or hovered, this updates the hovered date to update the calendar view.
     */
    hoverDate({ detail: { date: dateElement } }) {
        const currentDisplayedDate = new Date(this.displayedDate);
        this.hoveredDate = new Date(currentDisplayedDate.getFullYear(), currentDisplayedDate.getMonth(), dateElement.day);
    }
    /**
     * Whenever a market-date-picker-date is moused out, clear any hovering styling in the calendar view.
     */
    mousedOutDate() {
        this.hoveredDate = null;
    }
    /**
     * Whenever a market-row within market-date-picker-menu is selected, this ensures we move the current selected dates
     * to whichever option the user has selected.
     */
    selectMenuRow(e) {
        const menuOption = e.detail.menuSelection;
        if (!menuOption) {
            return;
        }
        this.marketMenuSelectionChanged.emit({
            menuSelection: menuOption,
        });
        const prevStartDate = this.selectedStartDate;
        const prevEndDate = this.selectedEndDate;
        this._setMenuRowOption(menuOption);
        if (menuOption !== menu.MENU_SLOT_NAMES.CUSTOM) {
            this.marketDateRangeChanged.emit({
                prevStartDate,
                prevEndDate,
                startDate: this.selectedStartDate,
                endDate: this.selectedEndDate,
                menuSelection: menuOption,
            });
        }
    }
    /**
     * Updates invalid state of date picker based on date input selections
     */
    setInvalidState({ detail: { invalid } }) {
        this.invalid = invalid;
    }
    _setMenuRowOption(menuOption) {
        const today = new Date();
        switch (menuOption) {
            case menu.MENU_SLOT_NAMES.TODAY:
                this.clearDateSelections();
                this.selectedStartDate = today.toISOString();
                break;
            case menu.MENU_SLOT_NAMES.YESTERDAY:
                this.clearDateSelections();
                this.selectedStartDate = startOfYesterday().toISOString();
                break;
            case menu.MENU_SLOT_NAMES.THIS_WEEK:
                this.selectedStartDate = startOfWeek(today).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = endOfWeek(today).toISOString();
                }
                break;
            case menu.MENU_SLOT_NAMES.LAST_WEEK: {
                const lastWeekDate = subWeeks(today, 1);
                this.selectedStartDate = startOfWeek(lastWeekDate).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = endOfWeek(lastWeekDate).toISOString();
                }
                break;
            }
            case menu.MENU_SLOT_NAMES.THIS_MONTH:
                this.selectedStartDate = startOfMonth(today).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = lastDayOfMonth(today).toISOString();
                }
                break;
            case menu.MENU_SLOT_NAMES.LAST_MONTH: {
                const lastMonthDate = subMonths(today, 1);
                this.selectedStartDate = startOfMonth(lastMonthDate).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = lastDayOfMonth(lastMonthDate).toISOString();
                }
                break;
            }
            case menu.MENU_SLOT_NAMES.THIS_YEAR:
                this.selectedStartDate = startOfYear(today).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = lastDayOfYear(today).toISOString();
                }
                break;
            case menu.MENU_SLOT_NAMES.LAST_YEAR: {
                const lastYearDate = subYears(today, 1);
                this.selectedStartDate = startOfYear(lastYearDate).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = lastDayOfYear(lastYearDate).toISOString();
                }
                break;
            }
        }
        // Update displayed date to selected date
        if (menuOption !== menu.MENU_SLOT_NAMES.CUSTOM) {
            this.displayedDate = this.selectedStartDate;
        }
    }
    _selectDate(options) {
        var _a;
        const prevStartDate = this.selectedStartDate;
        const prevEndDate = this.selectedEndDate;
        const currentDisplayedDate = new Date(this.displayedDate);
        // Handles case where month is January, represented by 0
        const checkedMonth = (_a = options.month) !== null && _a !== void 0 ? _a : currentDisplayedDate.getMonth();
        const day = new Date(options.year || currentDisplayedDate.getFullYear(), checkedMonth, options.day || currentDisplayedDate.getDate(), options.hour || currentDisplayedDate.getHours(), options.minute || currentDisplayedDate.getMinutes()).toISOString();
        if (this.displayMenu && !index$2.isSameDay(new Date(this.selectedStartDate), new Date(day))) {
            // Select custom menu row if it exists when calendar is updated
            const menu = this.el.shadowRoot.querySelector(index$3.getNamespacedTagFor('market-date-picker-menu'));
            menu._selectCustomRow();
        }
        if (this.selectionType === 'single') {
            this.clearDateSelections();
            this.selectedStartDate = day;
        }
        else {
            // Date range logic
            if (this.selectedStartDate && !this.selectedEndDate && day >= this.selectedStartDate) {
                // if new day is equal or after selected start date, and end date isn't set, update end date.
                this.selectedEndDate = day;
            }
            else {
                if (options.input) {
                    if (options.input === 'start')
                        this.selectedStartDate = day;
                    if (options.input === 'end')
                        this.selectedEndDate = day;
                }
                else {
                    this.clearDateSelections();
                    this.selectedStartDate = day;
                }
            }
        }
        this.marketDateRangeChanged.emit({
            prevStartDate,
            prevEndDate,
            startDate: this.selectedStartDate,
            endDate: this.selectedEndDate,
            menuSelection: menu.MENU_SLOT_NAMES.CUSTOM,
        });
    }
    // MONTH & YEAR VIEW FUNCTIONS
    toggleCaret() {
        this.yearViewActive = !this.yearViewActive;
    }
    validateDisplayedDate(date) {
        // Handles invalid dates passed in to displayed date
        if (new Date(date).toString() === 'Invalid Date') {
            this.displayedDate = new Date().toISOString();
        }
    }
    buildInitialYearView() {
        this.validateDisplayedDate(this.displayedDate);
        const currentDisplayedDate = new Date(this.displayedDate);
        const currentYear = currentDisplayedDate.getFullYear();
        this.yearViewYearsList = [(currentYear - 1).toString(), currentYear.toString(), (currentYear + 1).toString()];
        for (let i = 0; i < 12; i++) {
            const monthName = new Date(2024, i).toLocaleDateString(this.locale, { month: 'short' });
            this.yearViewMonthList.push(monthName);
        }
    }
    updateDisplayedYearList(increment) {
        this.yearViewYearsList = this.yearViewYearsList.map((year) => {
            return (Number(year) + increment).toString();
        });
    }
    updateDisplayedHeader(type, value) {
        var _a;
        let updatedDate;
        if (type === 'year') {
            updatedDate = { year: value };
        }
        if (type === 'month') {
            const monthDate = new Date(`${value} 1`);
            const monthValue = monthDate.toLocaleDateString(this.locale, { month: 'numeric' });
            updatedDate = { month: Number(monthValue) - 1 };
            // Close the year view if month is selected
            this.toggleCaret();
        }
        const currentDisplayedDate = new Date(this.displayedDate);
        // Handles case where month is January, represented by 0
        const checkedMonth = (_a = updatedDate === null || updatedDate === void 0 ? void 0 : updatedDate.month) !== null && _a !== void 0 ? _a : currentDisplayedDate.getMonth();
        const day = new Date(updatedDate.year || currentDisplayedDate.getFullYear(), checkedMonth, 1).toISOString();
        this.displayedDate = day;
    }
    componentWillLoad() {
        if (this.presetMenuOption) {
            this._setMenuRowOption(this.presetMenuOption);
        }
        this.buildInitialYearView();
        this.datePickerLabel = `date-picker-label-${v4.v4()}`;
    }
    /**
     * Core function called whenever props or states are changed to update the calendar view.
     */
    componentWillRender() {
        this.validateDisplayedDate(this.displayedDate);
        this.displayedMonth = new Date(this.displayedDate).toLocaleString(this.locale, { month: 'short', year: 'numeric' });
        this.buildWeekdays();
        this.buildCalendar();
    }
    render() {
        const MarketDatePickerMenuTagName = index$3.getNamespacedTagFor('market-date-picker-menu');
        const MarketDatePickerDateTagName = index$3.getNamespacedTagFor('market-date-picker-date');
        const MarketDatePickerInputDateTagName = index$3.getNamespacedTagFor('market-date-picker-input-date');
        const MarketButtonTagName = index$3.getNamespacedTagFor('market-button');
        const MarketIconTagName = index$3.getNamespacedTagFor('market-icon');
        const MarketDividerTagName = index$3.getNamespacedTagFor('market-divider');
        // TODO: remove when design tokens are added (UI-6454)
        const DATE_PICKER_BUTTON_PREVIOUS_YEAR_ICON_ASSET = 'chevron-left';
        const DATE_PICKER_BUTTON_NEXT_YEAR_ICON_ASSET = 'chevron-right';
        const DATE_PICKER_BUTTON_PREVIOUS_MONTH_ICON_ASSET = 'arrow-left';
        const DATE_PICKER_BUTTON_NEXT_MONTH_ICON_ASSET = 'arrow-right';
        return (index$1.h(index$1.Host, { key: 'c78a7b05df332b7aa06423aed1ed30275e618bc0', class: "market-date-picker" }, this.displayMenu && (index$1.h("list-view", { key: 'ac0a38b70c298576e139cf9d276424b8d31ab7af' }, index$1.h(MarketDatePickerMenuTagName, { key: 'f95cc5ab86f56d1a414553371fbfa16c8d37c0af', timeframe: this.timeframe, excludeMenuItems: this.excludeMenuItems, presetMenuOption: this.presetMenuOption }, index$1.h("slot", { key: '3cc5b7756b2b5a5e1d79a0f630c9b9c5fb61dba5', name: menu.MENU_SLOT_NAMES.TODAY, slot: menu.MENU_SLOT_NAMES.TODAY }, "Today"), index$1.h("slot", { key: 'dcd99d9668b7f6ecfed93e37a3074208ce33f6d1', name: menu.MENU_SLOT_NAMES.YESTERDAY, slot: menu.MENU_SLOT_NAMES.YESTERDAY }, "Yesterday"), index$1.h("slot", { key: '01b404c3d5ed89bb69e3e5ede661308d1937d6ef', name: menu.MENU_SLOT_NAMES.THIS_WEEK, slot: menu.MENU_SLOT_NAMES.THIS_WEEK }, "This week"), index$1.h("slot", { key: '1037a8b6ed5b53ff442fe33c22a038551cfb7666', name: menu.MENU_SLOT_NAMES.LAST_WEEK, slot: menu.MENU_SLOT_NAMES.LAST_WEEK }, "Last week"), index$1.h("slot", { key: '1ae37f2beab8500d77bc9047249f2818c8679df9', name: menu.MENU_SLOT_NAMES.THIS_MONTH, slot: menu.MENU_SLOT_NAMES.THIS_MONTH }, "This month"), index$1.h("slot", { key: '5aa7900479c4f236ca93614e1d992c147f5adf4c', name: menu.MENU_SLOT_NAMES.LAST_MONTH, slot: menu.MENU_SLOT_NAMES.LAST_MONTH }, "Last month"), index$1.h("slot", { key: 'd64f498efa100bcf1375c1754a396fa90d8f33a4', name: menu.MENU_SLOT_NAMES.THIS_YEAR, slot: menu.MENU_SLOT_NAMES.THIS_YEAR }, "This year"), index$1.h("slot", { key: 'a265f8265ab43a52080a0fee70d86eaf1faf7cb0', name: menu.MENU_SLOT_NAMES.LAST_YEAR, slot: menu.MENU_SLOT_NAMES.LAST_YEAR }, "Last year"), index$1.h("slot", { key: 'a8f9eab3bf9fcc47932e3298f01fa3b623d781c7', name: menu.MENU_SLOT_NAMES.CUSTOM, slot: menu.MENU_SLOT_NAMES.CUSTOM }, "Custom")))), index$1.h("calendar", { key: '74306dc7f74bf8ab987aa8bcfd052ca0cf218b5a' }, index$1.h("header", { key: '4bde0079d12ac3c1290260eb9526e30b3ac30710' }, index$1.h("nav", { key: '33a1fe6d6a15b50d461241106c2b2d035be49529' }, !this.yearViewActive && (index$1.h(MarketButtonTagName, { key: 'ba20533947d6c6dee2a3069fef4bf9e3600471dd', class: "left-nav", size: "small", "aria-label": "Previous month", onClick: () => this.navigateMonth(-1) }, index$1.h(MarketIconTagName, { key: 'ca3ecb61171ff64efce990de4353fa6be2b4e398', slot: "icon", name: DATE_PICKER_BUTTON_PREVIOUS_MONTH_ICON_ASSET }))), index$1.h(MarketButtonTagName, { key: '60a7f627185b9c0d6bf3af21eb8467be6ea8570d', class: "year-view-button", "aria-label": 'Toggle year view', onClick: () => this.toggleCaret(), caret: this.yearViewActive ? 'up' : 'down', rank: "tertiary" }, index$1.h("h2", { key: '09150c4c973668a250052523c621bd3bc0de9c44', id: this.datePickerLabel }, this.displayedMonth)), !this.yearViewActive && (index$1.h(MarketButtonTagName, { key: '93f69cba83dee974a878176b9a38b39b37f3212d', size: "small", "aria-label": "Next month", onClick: () => this.navigateMonth(1) }, index$1.h(MarketIconTagName, { key: '4f4a71fac7f937b7786331b23b05d5d24a68bf58', slot: "icon", name: DATE_PICKER_BUTTON_NEXT_MONTH_ICON_ASSET }))))), !this.yearViewActive && (index$1.h("month-view", { key: 'fc0709e315caf71fb7674aa1954d8e51102d16c6', role: "grid", "aria-labelledby": this.datePickerLabel }, 
        // Set the weekdays header for the date picker calendar
        this.displayedWeekdays.map((text) => (index$1.h(MarketDatePickerDateTagName, { class: 'weekday-header', disabled: true, day: text }))), 
        // Set the available dates
        this.days.map((day) => (index$1.h(MarketDatePickerDateTagName, { disabled: day.disabled, selection: day.selection, today: day.today, selected: day.selected, day: day.date || null, type: "day" }))))), this.yearViewActive && (index$1.h("year-view", { key: '6cdd043108fedfd459815f538c693d0bd4e8f75b', "aria-labelledby": this.datePickerLabel }, index$1.h("year-section", { key: '80534d9d3973be8708d224efde75a84ed167f9a7' }, index$1.h(MarketButtonTagName, { key: '6724cb67424c6c25df2fd43a098bd7a065112f78', size: "small", rank: "tertiary", "aria-label": "Previous year", onClick: () => this.updateDisplayedYearList(-1) }, index$1.h(MarketIconTagName, { key: 'f06c2e8ae425af9690325352dadece71761059cb', slot: "icon", name: DATE_PICKER_BUTTON_PREVIOUS_YEAR_ICON_ASSET })), this.yearViewYearsList.map((year) => (index$1.h(MarketDatePickerDateTagName, { day: year, type: "year" }))), index$1.h(MarketButtonTagName, { key: '47818e59632afab8f514f691b6df885ac27dcad0', size: "small", rank: "tertiary", "aria-label": "Next year", onClick: () => this.updateDisplayedYearList(1) }, index$1.h(MarketIconTagName, { key: '6a5d4cc241a1fccc5276a719cb30a03478fa6884', slot: "icon", name: DATE_PICKER_BUTTON_NEXT_YEAR_ICON_ASSET }))), index$1.h(MarketDividerTagName, { key: 'a2532c37506458317c88f2e1a134a7adaa9104d5', size: "thin" }), index$1.h("month-section", { key: 'f48b27b6528a2ff1f53e78b31f9cf8383f9fe7bf', role: "grid" }, this.yearViewMonthList.map((monthName) => (index$1.h(MarketDatePickerDateTagName, { day: monthName, type: "month" })))))), this.withInputs && (index$1.h(MarketDatePickerInputDateTagName, { key: '57aed426810970887e893dd8d60c28bda6b02663', class: "date-input-top-margin", range: this.selectionType === 'range', isDateDisabled: this.isDateDisabled, selectedStartDate: this.selectedStartDate, selectedEndDate: this.selectedEndDate, withTime: this.withInputs === 'date-and-time', timeframe: this.timeframe }, index$1.h("slot", { key: '304e7f7e99bf489c7853cd9f623fc9399f508c45', name: "start-date", slot: "start-date" }, this.selectionType === 'range' ? 'Start ' : '', "Date"), index$1.h("slot", { key: '5a738f898bdca337206719367b81288c5b20f991', name: "end-date", slot: "end-date" }, "End Date"), index$1.h("slot", { key: '2a0606961a10798604f47e0bb0a31237187bd2f1', name: "start-time", slot: "start-time" }, this.selectionType === 'range' ? 'Start ' : '', "Time"), index$1.h("slot", { key: '3027c801069e38f923baa0ac2d91d83b0d74d3a2', name: "end-time", slot: "end-time" }, "End Time"), index$1.h("slot", { key: '21026dbc719cafd2109f3c31b9553628ada54480', name: "range-error", slot: "range-error" }, "Enter a valid date range"))))));
    }
    get el() { return index$1.getElement(this); }
};
MarketDatePicker.style = MarketDatePickerStyle0;

exports.market_date_picker = MarketDatePicker;

//# sourceMappingURL=market-date-picker.cjs.entry.js.map