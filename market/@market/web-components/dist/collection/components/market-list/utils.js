import { getNamespacedTagFor, isElementWithTagName } from "../../utils/namespace";
import { ListItemSelectableType } from "./types";
/**
 * Check if the value is considered empty
 * @param {unknown} value
 */
export function isValueEmpty(value) {
    // Note: we don't check for 0 here because it's a valid value, so _.isEmpty() is not used
    return value === '' || value === null || value === undefined || (Array.isArray(value) && value.length === 0);
}
/**
 * Check if the slotted control in <market-row slot="control-row> is a valid control row input
 * @param {unknown} control
 */
export function isValidControl(control) {
    var _a;
    if (!control) {
        return false;
    }
    const tagName = (_a = control.tagName) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
    const validControlTags = [
        getNamespacedTagFor('market-checkbox').toLocaleLowerCase(),
        getNamespacedTagFor('market-radio').toLocaleLowerCase(),
        getNamespacedTagFor('market-toggle').toLocaleLowerCase(),
    ];
    return validControlTags.includes(tagName);
}
function getRowSelectableType(row) {
    if (!row.interactive || row.variant === 'drill' || Boolean(row.href) || (row.interactive && row.transient)) {
        return undefined;
    }
    const slottedControl = row.querySelector('[slot="control"]');
    if (!slottedControl) {
        return ListItemSelectableType.SELECTABLE_WITHOUT_CONTROL;
    }
    if (isElementWithTagName(slottedControl, 'market-checkbox')) {
        return ListItemSelectableType.CHECKBOX;
    }
    if (isElementWithTagName(slottedControl, 'market-radio')) {
        return ListItemSelectableType.RADIO;
    }
    if (isElementWithTagName(slottedControl, 'market-toggle')) {
        return ListItemSelectableType.SWITCH;
    }
    return undefined;
}
/**
 * Get the selectable type (radio, checkbox, etc.) from a list item, which is either a market-row or market-action-card
 * @param {TMarketListItem} item
 */
export function getItemSelectableType(item) {
    if (isElementWithTagName(item, 'market-action-card')) {
        const innerRow = item.querySelector(getNamespacedTagFor('market-row'));
        if (innerRow) {
            return getRowSelectableType(innerRow);
        }
        return ListItemSelectableType.SELECTABLE_WITHOUT_CONTROL;
    }
    if (isElementWithTagName(item, 'market-row')) {
        return getRowSelectableType(item);
    }
    return undefined;
}
//# sourceMappingURL=utils.js.map
