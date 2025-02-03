import { Host, h } from "@stencil/core";
import { endOfWeek, isAfter, isBefore, isSameDay, lastDayOfMonth, startOfMonth, startOfWeek, subMonths, subWeeks, startOfYesterday, startOfYear, lastDayOfYear, subYears, } from "date-fns";
import { v4 as uuid } from "uuid";
import { MENU_SLOT_NAMES } from "./enums/menu";
import { getNamespacedTagFor } from "../../utils/namespace";
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
export class MarketDatePicker {
    constructor() {
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
            isBefore(currentDate, this.hoveredDate) &&
            isAfter(currentDate, currentStartDate)) {
            datePickerDay.selection = 'range-middle';
        }
        if (!isSameDay(this.hoveredDate, currentDate)) {
            return;
        }
        // If there's no start date, or a date range is selected, or the hovered date is before or the same as the start date,
        // the hovered button should be the start of a new range.
        if (!this.selectedStartDate ||
            (this.selectedStartDate && this.selectedEndDate) ||
            !isAfter(this.hoveredDate, currentStartDate)) {
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
        if (currentStartDate && isSameDay(calendarDate, currentStartDate)) {
            day.selected = true;
            day.selection = this.selectionType === 'single' ? 'single' : 'range-first';
        }
        // For range types only, check for dates within a selected range, or ends in a range
        if (this.selectionType === 'range') {
            this.addHoveredDateRangeStyling(calendarDate, day);
            if (currentStartDate &&
                currentEndDate &&
                isAfter(calendarDate, currentStartDate) &&
                isBefore(calendarDate, currentEndDate)) {
                day.selected = true;
                day.selection = 'range-middle';
            }
            if (currentEndDate && isSameDay(calendarDate, currentEndDate)) {
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
            if (isSameDay(calendar, today)) {
                day.today = true;
            }
            // Check for selection types
            this.addDateSelectionAttributes(day, calendar, currentStartDate, currentEndDate);
            // Check for disabled dates
            if (day.date && this.isDateDisabled) {
                day.disabled = this.isDateDisabled(calendar);
            }
            if (this.timeframe === 'future' && isBefore(calendar, today) && !isSameDay(calendar, today)) {
                day.disabled = true;
            }
            if (this.timeframe === 'past' && isAfter(calendar, today) && !isSameDay(calendar, today)) {
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
        if (menuOption !== MENU_SLOT_NAMES.CUSTOM) {
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
            case MENU_SLOT_NAMES.TODAY:
                this.clearDateSelections();
                this.selectedStartDate = today.toISOString();
                break;
            case MENU_SLOT_NAMES.YESTERDAY:
                this.clearDateSelections();
                this.selectedStartDate = startOfYesterday().toISOString();
                break;
            case MENU_SLOT_NAMES.THIS_WEEK:
                this.selectedStartDate = startOfWeek(today).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = endOfWeek(today).toISOString();
                }
                break;
            case MENU_SLOT_NAMES.LAST_WEEK: {
                const lastWeekDate = subWeeks(today, 1);
                this.selectedStartDate = startOfWeek(lastWeekDate).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = endOfWeek(lastWeekDate).toISOString();
                }
                break;
            }
            case MENU_SLOT_NAMES.THIS_MONTH:
                this.selectedStartDate = startOfMonth(today).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = lastDayOfMonth(today).toISOString();
                }
                break;
            case MENU_SLOT_NAMES.LAST_MONTH: {
                const lastMonthDate = subMonths(today, 1);
                this.selectedStartDate = startOfMonth(lastMonthDate).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = lastDayOfMonth(lastMonthDate).toISOString();
                }
                break;
            }
            case MENU_SLOT_NAMES.THIS_YEAR:
                this.selectedStartDate = startOfYear(today).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = lastDayOfYear(today).toISOString();
                }
                break;
            case MENU_SLOT_NAMES.LAST_YEAR: {
                const lastYearDate = subYears(today, 1);
                this.selectedStartDate = startOfYear(lastYearDate).toISOString();
                if (this.selectionType === 'range') {
                    this.selectedEndDate = lastDayOfYear(lastYearDate).toISOString();
                }
                break;
            }
            default:
                break;
        }
        // Update displayed date to selected date
        if (menuOption !== MENU_SLOT_NAMES.CUSTOM) {
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
        if (this.displayMenu && !isSameDay(new Date(this.selectedStartDate), new Date(day))) {
            // Select custom menu row if it exists when calendar is updated
            const menu = this.el.shadowRoot.querySelector(getNamespacedTagFor('market-date-picker-menu'));
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
            menuSelection: MENU_SLOT_NAMES.CUSTOM,
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
        this.datePickerLabel = `date-picker-label-${uuid()}`;
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
        const MarketDatePickerMenuTagName = getNamespacedTagFor('market-date-picker-menu');
        const MarketDatePickerDateTagName = getNamespacedTagFor('market-date-picker-date');
        const MarketDatePickerInputDateTagName = getNamespacedTagFor('market-date-picker-input-date');
        const MarketButtonTagName = getNamespacedTagFor('market-button');
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        const MarketDividerTagName = getNamespacedTagFor('market-divider');
        // TODO: remove when design tokens are added (UI-6454)
        const DATE_PICKER_BUTTON_PREVIOUS_YEAR_ICON_ASSET = 'chevron-left';
        const DATE_PICKER_BUTTON_NEXT_YEAR_ICON_ASSET = 'chevron-right';
        const DATE_PICKER_BUTTON_PREVIOUS_MONTH_ICON_ASSET = 'arrow-left';
        const DATE_PICKER_BUTTON_NEXT_MONTH_ICON_ASSET = 'arrow-right';
        return (h(Host, { key: 'c78a7b05df332b7aa06423aed1ed30275e618bc0', class: "market-date-picker" }, this.displayMenu && (h("list-view", { key: 'ac0a38b70c298576e139cf9d276424b8d31ab7af' }, h(MarketDatePickerMenuTagName, { key: 'f95cc5ab86f56d1a414553371fbfa16c8d37c0af', timeframe: this.timeframe, excludeMenuItems: this.excludeMenuItems, presetMenuOption: this.presetMenuOption }, h("slot", { key: '3cc5b7756b2b5a5e1d79a0f630c9b9c5fb61dba5', name: MENU_SLOT_NAMES.TODAY, slot: MENU_SLOT_NAMES.TODAY }, "Today"), h("slot", { key: 'dcd99d9668b7f6ecfed93e37a3074208ce33f6d1', name: MENU_SLOT_NAMES.YESTERDAY, slot: MENU_SLOT_NAMES.YESTERDAY }, "Yesterday"), h("slot", { key: '01b404c3d5ed89bb69e3e5ede661308d1937d6ef', name: MENU_SLOT_NAMES.THIS_WEEK, slot: MENU_SLOT_NAMES.THIS_WEEK }, "This week"), h("slot", { key: '1037a8b6ed5b53ff442fe33c22a038551cfb7666', name: MENU_SLOT_NAMES.LAST_WEEK, slot: MENU_SLOT_NAMES.LAST_WEEK }, "Last week"), h("slot", { key: '1ae37f2beab8500d77bc9047249f2818c8679df9', name: MENU_SLOT_NAMES.THIS_MONTH, slot: MENU_SLOT_NAMES.THIS_MONTH }, "This month"), h("slot", { key: '5aa7900479c4f236ca93614e1d992c147f5adf4c', name: MENU_SLOT_NAMES.LAST_MONTH, slot: MENU_SLOT_NAMES.LAST_MONTH }, "Last month"), h("slot", { key: 'd64f498efa100bcf1375c1754a396fa90d8f33a4', name: MENU_SLOT_NAMES.THIS_YEAR, slot: MENU_SLOT_NAMES.THIS_YEAR }, "This year"), h("slot", { key: 'a265f8265ab43a52080a0fee70d86eaf1faf7cb0', name: MENU_SLOT_NAMES.LAST_YEAR, slot: MENU_SLOT_NAMES.LAST_YEAR }, "Last year"), h("slot", { key: 'a8f9eab3bf9fcc47932e3298f01fa3b623d781c7', name: MENU_SLOT_NAMES.CUSTOM, slot: MENU_SLOT_NAMES.CUSTOM }, "Custom")))), h("calendar", { key: '74306dc7f74bf8ab987aa8bcfd052ca0cf218b5a' }, h("header", { key: '4bde0079d12ac3c1290260eb9526e30b3ac30710' }, h("nav", { key: '33a1fe6d6a15b50d461241106c2b2d035be49529' }, !this.yearViewActive && (h(MarketButtonTagName, { key: 'ba20533947d6c6dee2a3069fef4bf9e3600471dd', class: "left-nav", size: "small", "aria-label": "Previous month", onClick: () => this.navigateMonth(-1) }, h(MarketIconTagName, { key: 'ca3ecb61171ff64efce990de4353fa6be2b4e398', slot: "icon", name: DATE_PICKER_BUTTON_PREVIOUS_MONTH_ICON_ASSET }))), h(MarketButtonTagName, { key: '60a7f627185b9c0d6bf3af21eb8467be6ea8570d', class: "year-view-button", "aria-label": 'Toggle year view', onClick: () => this.toggleCaret(), caret: this.yearViewActive ? 'up' : 'down', rank: "tertiary" }, h("h2", { key: '09150c4c973668a250052523c621bd3bc0de9c44', id: this.datePickerLabel }, this.displayedMonth)), !this.yearViewActive && (h(MarketButtonTagName, { key: '93f69cba83dee974a878176b9a38b39b37f3212d', size: "small", "aria-label": "Next month", onClick: () => this.navigateMonth(1) }, h(MarketIconTagName, { key: '4f4a71fac7f937b7786331b23b05d5d24a68bf58', slot: "icon", name: DATE_PICKER_BUTTON_NEXT_MONTH_ICON_ASSET }))))), !this.yearViewActive && (h("month-view", { key: 'fc0709e315caf71fb7674aa1954d8e51102d16c6', role: "grid", "aria-labelledby": this.datePickerLabel }, 
        // Set the weekdays header for the date picker calendar
        this.displayedWeekdays.map((text) => (h(MarketDatePickerDateTagName, { class: 'weekday-header', disabled: true, day: text }))), 
        // Set the available dates
        this.days.map((day) => (h(MarketDatePickerDateTagName, { disabled: day.disabled, selection: day.selection, today: day.today, selected: day.selected, day: day.date || null, type: "day" }))))), this.yearViewActive && (h("year-view", { key: '6cdd043108fedfd459815f538c693d0bd4e8f75b', "aria-labelledby": this.datePickerLabel }, h("year-section", { key: '80534d9d3973be8708d224efde75a84ed167f9a7' }, h(MarketButtonTagName, { key: '6724cb67424c6c25df2fd43a098bd7a065112f78', size: "small", rank: "tertiary", "aria-label": "Previous year", onClick: () => this.updateDisplayedYearList(-1) }, h(MarketIconTagName, { key: 'f06c2e8ae425af9690325352dadece71761059cb', slot: "icon", name: DATE_PICKER_BUTTON_PREVIOUS_YEAR_ICON_ASSET })), this.yearViewYearsList.map((year) => (h(MarketDatePickerDateTagName, { day: year, type: "year" }))), h(MarketButtonTagName, { key: '47818e59632afab8f514f691b6df885ac27dcad0', size: "small", rank: "tertiary", "aria-label": "Next year", onClick: () => this.updateDisplayedYearList(1) }, h(MarketIconTagName, { key: '6a5d4cc241a1fccc5276a719cb30a03478fa6884', slot: "icon", name: DATE_PICKER_BUTTON_NEXT_YEAR_ICON_ASSET }))), h(MarketDividerTagName, { key: 'a2532c37506458317c88f2e1a134a7adaa9104d5', size: "thin" }), h("month-section", { key: 'f48b27b6528a2ff1f53e78b31f9cf8383f9fe7bf', role: "grid" }, this.yearViewMonthList.map((monthName) => (h(MarketDatePickerDateTagName, { day: monthName, type: "month" })))))), this.withInputs && (h(MarketDatePickerInputDateTagName, { key: '57aed426810970887e893dd8d60c28bda6b02663', class: "date-input-top-margin", range: this.selectionType === 'range', isDateDisabled: this.isDateDisabled, selectedStartDate: this.selectedStartDate, selectedEndDate: this.selectedEndDate, withTime: this.withInputs === 'date-and-time', timeframe: this.timeframe }, h("slot", { key: '304e7f7e99bf489c7853cd9f623fc9399f508c45', name: "start-date", slot: "start-date" }, this.selectionType === 'range' ? 'Start ' : '', "Date"), h("slot", { key: '5a738f898bdca337206719367b81288c5b20f991', name: "end-date", slot: "end-date" }, "End Date"), h("slot", { key: '2a0606961a10798604f47e0bb0a31237187bd2f1', name: "start-time", slot: "start-time" }, this.selectionType === 'range' ? 'Start ' : '', "Time"), h("slot", { key: '3027c801069e38f923baa0ac2d91d83b0d74d3a2', name: "end-time", slot: "end-time" }, "End Time"), h("slot", { key: '21026dbc719cafd2109f3c31b9553628ada54480', name: "range-error", slot: "range-error" }, "Enter a valid date range"))))));
    }
    static get is() { return "market-date-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-date-picker.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-date-picker.css"]
        };
    }
    static get properties() {
        return {
            "selectionType": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'single' | 'range'",
                    "resolved": "\"range\" | \"single\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the date picker allows selection of a single date or a date range"
                },
                "attribute": "selection-type",
                "reflect": false,
                "defaultValue": "'single'"
            },
            "selectedStartDate": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "User selected single date or start date for a range saved as an ISO formatted string.\nUse DateTime string format as seen here: https://tc39.es/ecma262/#sec-date-time-string-format\nExample: `YYYY-MM-DDT08:00`."
                },
                "attribute": "selected-start-date",
                "reflect": true
            },
            "selectedEndDate": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "User selected end date for a range saved as an ISO formatted string.\nUse DateTime string format as seen here: https://tc39.es/ecma262/#sec-date-time-string-format\nExample: `YYYY-MM-DDT08:00`."
                },
                "attribute": "selected-end-date",
                "reflect": true
            },
            "presetMenuOption": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "MENU_SLOT_NAMES",
                    "resolved": "MENU_SLOT_NAMES.CUSTOM | MENU_SLOT_NAMES.LAST_MONTH | MENU_SLOT_NAMES.LAST_WEEK | MENU_SLOT_NAMES.LAST_YEAR | MENU_SLOT_NAMES.THIS_MONTH | MENU_SLOT_NAMES.THIS_WEEK | MENU_SLOT_NAMES.THIS_YEAR | MENU_SLOT_NAMES.TODAY | MENU_SLOT_NAMES.YESTERDAY",
                    "references": {
                        "MENU_SLOT_NAMES": {
                            "location": "import",
                            "path": "./enums/menu",
                            "id": "src/components/market-date-picker/enums/menu.tsx::MENU_SLOT_NAMES"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Preset menu option to populate date picker range.\nPresetting `custom` should be used with `selectedStartDate` and `selectedEndDate` props.\nOtherwise if both `selectedStartDate/selectedEndDate` and `presetMenuOption` are given, `presetMenuOption` takes precedence."
                },
                "attribute": "preset-menu-option",
                "reflect": false
            },
            "displayMenu": {
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
                    "text": "Whether or not the side market-date-picker-menu is shown.\nTo pass in translation supported text, use slots available for each option."
                },
                "attribute": "display-menu",
                "reflect": false,
                "defaultValue": "false"
            },
            "mobileMenuPosition": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'top' | 'bottom'",
                    "resolved": "\"bottom\" | \"top\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Position of menu on a mobile screen, if market-date-picker-menu is shown."
                },
                "attribute": "mobile-menu-position",
                "reflect": true,
                "defaultValue": "'top'"
            },
            "excludeMenuItems": {
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
                    "text": "A list of market-date-picker-menu items that will be excluded from appearing on the menu list.\ni.e. `this-year,last-year` or `today,this-week,last-week,custom`\nThe menu names are lowercase and hyphenated strings, found here:\nhttps://github.com/squareup/market/blob/main/web/web-components/src/components/market-date-picker/enums/menu.tsx\n\nThis works in conjunction with timeframe,\ni.e. \"timeframe=past\", excludes dates in the future in addition to the ones here.\nThis is written as items separated by ','."
                },
                "attribute": "exclude-menu-items",
                "reflect": false,
                "defaultValue": "''"
            },
            "timeframe": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'past' | 'present' | 'future'",
                    "resolved": "\"future\" | \"past\" | \"present\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String for setting timeframe type to select which market-date-picker-menu items to show.\nPast means only past dates available, future is only current and future dates, and present is the default for all shown."
                },
                "attribute": "timeframe",
                "reflect": false,
                "defaultValue": "'present'"
            },
            "isDateDisabled": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "(day: Date) => boolean",
                    "resolved": "(day: Date) => boolean",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "A function that takes a datestring and returns a boolean determining if it should be disabled.\nThis does not override disabled dates based on the timeframe prop.\nSee https://ionicframework.com/docs/api/datetime#advanced-date-constraints for examples of passing in a function as a Stencil component prop."
                }
            },
            "locale": {
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
                    "text": "Date picker locale. Defaults to browser locale. If that cannot be determined, defaults to 'en-US'."
                },
                "attribute": "locale",
                "reflect": false,
                "defaultValue": "navigator.language || 'en-US'"
            },
            "displayedDate": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The ISO formatted string that determines the displayed month on the calendar.\nUse DateTime string format as seen here: https://tc39.es/ecma262/#sec-date-time-string-format\nExample: `YYYY-MM-DDT08:00`.\nNote: Omitting the time portion defaults to UTC, so this may display as a day behind on your calendar!\nIf you add hours it will default to your timezone, like the above example.\nInvalid date strings default to today's date."
                },
                "attribute": "displayed-date",
                "reflect": false
            },
            "withInputs": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "'' | 'date' | 'date-and-time'",
                    "resolved": "\"\" | \"date\" | \"date-and-time\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "This enables the input field for the date picker."
                },
                "attribute": "with-inputs",
                "reflect": true,
                "defaultValue": "''"
            },
            "invalid": {
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
                    "text": "Whether the selected dates are invalid.\nIt should not be possible to click on invalid dates, so this occurs through date inputs."
                },
                "attribute": "invalid",
                "reflect": true,
                "defaultValue": "false"
            },
            "yearViewActive": {
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
                    "text": "Displays a clickable caret in the month/year header.\nIf it is up, we show the month/year selection view instead of dates."
                },
                "attribute": "year-view-active",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "displayedMonth": {},
            "displayedWeekdays": {},
            "yearViewYearsList": {},
            "hoveredDate": {}
        };
    }
    static get events() {
        return [{
                "method": "marketDateRangeChanged",
                "name": "marketDateRangeChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Fired whenever the selected date range is changed."
                },
                "complexType": {
                    "original": "TMarketDateRangeChangedEventDetail",
                    "resolved": "{ endDate: string; menuSelection: string; prevEndDate: string; prevStartDate: string; startDate: string; }",
                    "references": {
                        "TMarketDateRangeChangedEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-date-picker/events.ts::TMarketDateRangeChangedEventDetail"
                        }
                    }
                }
            }, {
                "method": "marketMenuSelectionChanged",
                "name": "marketMenuSelectionChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "deprecated",
                            "text": "**DEPRECATED (v4.5.0)** Use `marketDatePickerMenuSelectionChanged` instead.\n\nFired whenever the menu selection is changed. Indicates which menu option is currently selected.\nPossible values are found here:\nhttps://github.com/squareup/market/blob/main/web/web-components/src/components/market-date-picker/enums/menu.tsx"
                        }],
                    "text": ""
                },
                "complexType": {
                    "original": "TMarketDatePickerMenuSelectionChangedEventDetail",
                    "resolved": "{ menuSelection: \"today\" | \"yesterday\" | \"this-week\" | \"last-week\" | \"this-month\" | \"last-month\" | \"this-year\" | \"last-year\" | \"custom\"; }",
                    "references": {
                        "TMarketDatePickerMenuSelectionChangedEventDetail": {
                            "location": "import",
                            "path": "./events",
                            "id": "src/components/market-date-picker/events.ts::TMarketDatePickerMenuSelectionChangedEventDetail"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "marketDatePickerInputDateSet",
                "method": "dateInputDateSet",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDatePickerDateSelected",
                "method": "selectDate",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDatePickerDateMousedOver",
                "method": "hoverDate",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDatePickerDateMousedOut",
                "method": "mousedOutDate",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDatePickerMenuSelectionChanged",
                "method": "selectMenuRow",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "marketDatePickerInputDateInvalidStateChanged",
                "method": "setInvalidState",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=market-date-picker.js.map
