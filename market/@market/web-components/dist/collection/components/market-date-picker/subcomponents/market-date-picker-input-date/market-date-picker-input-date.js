import { h, Host } from "@stencil/core";
import { getNamespacedTagFor } from "../../../../utils/namespace";
import { format, isAfter, isBefore, isSameDay, isValid, parseISO } from "date-fns";
export class MarketDateInputDate {
    constructor() {
        this.withTime = false;
        this.selectedStartDate = undefined;
        this.selectedEndDate = undefined;
        this.isDateDisabled = undefined;
        this.timeframe = 'present';
        this.range = false;
        this.isRangeInvalid = false;
    }
    emitInvalidStateEvent() {
        this.marketDatePickerInputDateInvalidStateChanged.emit({
            invalid: this.isRangeInvalid,
        });
    }
    formatDate(date, isTime = false) {
        if (!date)
            return '';
        const dateObj = new Date(date);
        if (!isValid(dateObj)) {
            return '';
        }
        const formatStr = isTime ? 'HH:mm' : 'yyyy-MM-dd';
        return format(dateObj, formatStr);
    }
    isInvalidDateForTimeframe(dateObj, today = new Date()) {
        const isFutureDate = this.timeframe === 'future' && isBefore(dateObj, today) && !isSameDay(dateObj, today);
        const isPastDate = this.timeframe === 'past' && isAfter(dateObj, today) && !isSameDay(dateObj, today);
        return isFutureDate || isPastDate;
    }
    updateInvalidState(start = this.selectedStartDate, end = this.selectedEndDate) {
        if (this.isDateInvalid(start) || this.isDateInvalid(end)) {
            this.isRangeInvalid = true;
            return;
        }
        // If end date is set, check if start date is after end date
        if (end) {
            this.isRangeInvalid = isAfter(new Date(start), new Date(end));
            return;
        }
        this.isRangeInvalid = false;
    }
    isDateInvalid(date) {
        if (!date)
            return false;
        const dateObj = parseISO(date);
        if (dateObj.toString() === 'Invalid Date')
            return true;
        if (this.isDateDisabled && this.isDateDisabled(dateObj)) {
            return true;
        }
        if (this.timeframe && this.isInvalidDateForTimeframe(dateObj)) {
            return true;
        }
        return false;
    }
    emitDateSetStart(ev) {
        this.emitDateSet(ev, 'start');
    }
    emitDateSetEnd(ev) {
        this.emitDateSet(ev, 'end');
    }
    emitDateSetStartTime(ev) {
        this.emitDateSet(ev, 'start', true);
    }
    emitDateSetEndTime(ev) {
        this.emitDateSet(ev, 'end', true);
    }
    emitDateSet(ev, input, timeInput = false) {
        ev.preventDefault();
        ev.stopPropagation();
        const { value } = ev.target;
        let valueToSubmit = value;
        // If time is set, add the time to the date
        if (this.withTime) {
            if (timeInput) {
                const date = this.formatDate(input === 'start' ? this.selectedStartDate : this.selectedEndDate);
                const time = value.slice(0, 5);
                valueToSubmit = `${date}T${time}`;
            }
            else {
                const time = this.formatDate(input === 'start' ? this.selectedStartDate : this.selectedEndDate, true);
                valueToSubmit = `${value}T${time}`;
            }
        }
        // Remove leading zeros
        const realLength = valueToSubmit.replace(/^0+/, '').length;
        // Only emit if length is (yyyy-mm-dd) or (yyyy-mm-ddThh:mm) and is valid
        if (realLength === 10 || realLength === 16) {
            this.marketDatePickerInputDateSet.emit({ date: valueToSubmit, input });
        }
    }
    componentWillRender() {
        this.updateInvalidState();
    }
    render() {
        const MarketInputTextTagName = getNamespacedTagFor('market-input-text');
        const MarketBannerTagName = getNamespacedTagFor('market-banner');
        const inputWrapper = (type) => (h("div", { key: 'b21389daf44f3f7c01c99332c863b3694a5fe3ec', class: `input-wrapper ${type === 'start' ? 'start-input' : ''}` }, type === 'start' && dateInput('start'), type === 'start' && this.withTime && timeInput('start'), type === 'end' && dateInput('end'), type === 'end' && this.withTime && timeInput('end')));
        const dateInput = (type) => (h(MarketInputTextTagName, { key: 'f425b7803c14bc28ba82f6ac33c84f2258d2a988', type: "date", class: `date-input`, name: `date-picker-date-${type}`, invalid: this.isRangeInvalid, value: this.formatDate(type === 'start' ? this.selectedStartDate : this.selectedEndDate), onInput: type === 'start' ? this.emitDateSetStart.bind(this) : this.emitDateSetEnd.bind(this) }, h("label", { key: 'b9049334bb2a711c69327172411d07ba37c1aaaa', htmlFor: `date-picker-${type}` }, h("slot", { key: '79396ea901c67d286f81dc132659f3967c8d7d9b', name: `${type}-date` }, this.range && (type === 'start' ? 'Start' : 'End'), " Date"))));
        const timeInput = (type) => (h(MarketInputTextTagName, { key: '51b47dd0eaa7750109e65e870b028f940cce097b', type: "time", class: `time-input`, name: `date-picker-time-${type}`, invalid: this.isRangeInvalid, value: this.formatDate(type === 'start' ? this.selectedStartDate : this.selectedEndDate, true), onInput: type === 'start' ? this.emitDateSetStartTime.bind(this) : this.emitDateSetEndTime.bind(this) }, h("label", { key: 'a0c76ff259384cbe05c43246c8e02219b728e958', htmlFor: `date-picker-time-${type}` }, h("slot", { key: '542b72217fe71c460e650ae561151f54c66c331e', name: `${type}-time` }, this.range && (type === 'start' ? 'Start' : 'End'), " Time"))));
        return (h(Host, { key: '97b4fde78831d10fb483c5ba14c5eb7d5a4ad6dc', class: "market-date-picker-input-date" }, this.range ? (h("div", { class: "input-row" }, inputWrapper('start'), inputWrapper('end'))) : (h("div", null, inputWrapper('start'))), this.isRangeInvalid && (h(MarketBannerTagName, { key: 'e307642e971df21b7e52d49de81208537955275d', variant: "critical" }, h("slot", { key: '573adb7b99baacc96011ba953f785e2fff879ca7', name: "range-error" }, "Enter a valid date range")))));
    }
    static get is() { return "market-date-picker-input-date"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-date-picker-input-date.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-date-picker-input-date.css"]
        };
    }
    static get properties() {
        return {
            "withTime": {
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
                    "tags": [{
                            "name": "type",
                            "text": "{boolean}"
                        }, {
                            "name": "memberof",
                            "text": "MarketDateInputDate"
                        }, {
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Whether to use date-time input instead of date-only"
                },
                "attribute": "with-time",
                "reflect": false,
                "defaultValue": "false"
            },
            "selectedStartDate": {
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
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }, {
                            "name": "memberof",
                            "text": "MarketDateInputDate"
                        }, {
                            "name": "default",
                            "text": "''"
                        }],
                    "text": "The selected start date"
                },
                "attribute": "selected-start-date",
                "reflect": false
            },
            "selectedEndDate": {
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
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }, {
                            "name": "memberof",
                            "text": "MarketDateInputDate"
                        }, {
                            "name": "default",
                            "text": "''"
                        }],
                    "text": "The selected end date"
                },
                "attribute": "selected-end-date",
                "reflect": false
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
                    "tags": [{
                            "name": "type",
                            "text": "{(day: Date) => boolean}"
                        }, {
                            "name": "memberof",
                            "text": "MarketDateInputDate"
                        }, {
                            "name": "default",
                            "text": "undefined"
                        }],
                    "text": "A function that returns true if the date should be disabled"
                }
            },
            "timeframe": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'past' | 'future' | 'present'",
                    "resolved": "\"future\" | \"past\" | \"present\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{'past' | 'future' | 'present'}"
                        }, {
                            "name": "memberof",
                            "text": "MarketDateInputDate"
                        }, {
                            "name": "default",
                            "text": "'present'"
                        }],
                    "text": "The timeframe to restrict the date picker to"
                },
                "attribute": "timeframe",
                "reflect": false,
                "defaultValue": "'present'"
            },
            "range": {
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
                    "tags": [{
                            "name": "type",
                            "text": "{boolean}"
                        }, {
                            "name": "memberof",
                            "text": "MarketDateInputDate"
                        }, {
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Whether the date picker is a range"
                },
                "attribute": "range",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "isRangeInvalid": {}
        };
    }
    static get events() {
        return [{
                "method": "marketDatePickerInputDateSet",
                "name": "marketDatePickerInputDateSet",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the date picker date is selected"
                },
                "complexType": {
                    "original": "{ date: string; input: string }",
                    "resolved": "{ date: string; input: string; }",
                    "references": {}
                }
            }, {
                "method": "marketDatePickerInputDateInvalidStateChanged",
                "name": "marketDatePickerInputDateInvalidStateChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the date selection changes validity"
                },
                "complexType": {
                    "original": "{ invalid: boolean }",
                    "resolved": "{ invalid: boolean; }",
                    "references": {}
                }
            }];
    }
    static get watchers() {
        return [{
                "propName": "isRangeInvalid",
                "methodName": "emitInvalidStateEvent"
            }];
    }
}
//# sourceMappingURL=market-date-picker-input-date.js.map
