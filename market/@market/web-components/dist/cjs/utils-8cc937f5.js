'use strict';

const index = require('./index-254d04f0.js');

exports.ListItemSelectableType = void 0;
(function (ListItemSelectableType) {
    ListItemSelectableType[ListItemSelectableType["RADIO"] = 0] = "RADIO";
    ListItemSelectableType[ListItemSelectableType["CHECKBOX"] = 1] = "CHECKBOX";
    ListItemSelectableType[ListItemSelectableType["SWITCH"] = 2] = "SWITCH";
    ListItemSelectableType[ListItemSelectableType["SELECTABLE_WITHOUT_CONTROL"] = 3] = "SELECTABLE_WITHOUT_CONTROL";
})(exports.ListItemSelectableType || (exports.ListItemSelectableType = {}));

/**
 * Check if the value is considered empty
 * @param {unknown} value
 */
function isValueEmpty(value) {
    // Note: we don't check for 0 here because it's a valid value, so _.isEmpty() is not used
    return value === '' || value === null || value === undefined || (Array.isArray(value) && value.length === 0);
}
/**
 * Check if the slotted control in <market-row slot="control-row> is a valid control row input
 * @param {unknown} control
 */
function isValidControl(control) {
    var _a;
    if (!control) {
        return false;
    }
    const tagName = (_a = control.tagName) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
    const validControlTags = [
        index.getNamespacedTagFor('market-checkbox').toLocaleLowerCase(),
        index.getNamespacedTagFor('market-radio').toLocaleLowerCase(),
        index.getNamespacedTagFor('market-toggle').toLocaleLowerCase(),
    ];
    return validControlTags.includes(tagName);
}
function getRowSelectableType(row) {
    if (!row.interactive || row.variant === 'drill' || Boolean(row.href) || (row.interactive && row.transient)) {
        return undefined;
    }
    const slottedControl = row.querySelector('[slot="control"]');
    if (!slottedControl) {
        return exports.ListItemSelectableType.SELECTABLE_WITHOUT_CONTROL;
    }
    if (index.isElementWithTagName(slottedControl, 'market-checkbox')) {
        return exports.ListItemSelectableType.CHECKBOX;
    }
    if (index.isElementWithTagName(slottedControl, 'market-radio')) {
        return exports.ListItemSelectableType.RADIO;
    }
    if (index.isElementWithTagName(slottedControl, 'market-toggle')) {
        return exports.ListItemSelectableType.SWITCH;
    }
    return undefined;
}
/**
 * Get the selectable type (radio, checkbox, etc.) from a list item, which is either a market-row or market-action-card
 * @param {TMarketListItem} item
 */
function getItemSelectableType(item) {
    if (index.isElementWithTagName(item, 'market-action-card')) {
        const innerRow = item.querySelector(index.getNamespacedTagFor('market-row'));
        if (innerRow) {
            return getRowSelectableType(innerRow);
        }
        return exports.ListItemSelectableType.SELECTABLE_WITHOUT_CONTROL;
    }
    if (index.isElementWithTagName(item, 'market-row')) {
        return getRowSelectableType(item);
    }
    return undefined;
}

exports.getItemSelectableType = getItemSelectableType;
exports.isValidControl = isValidControl;
exports.isValueEmpty = isValueEmpty;

//# sourceMappingURL=utils-8cc937f5.js.map