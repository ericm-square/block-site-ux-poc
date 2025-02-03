import { g as getNamespacedTagFor } from './index2.js';

/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketCheckboxElement`
 */
function isCheckboxElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === getNamespacedTagFor('market-checkbox').toUpperCase();
}
/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketRadioElement`
 */
function isRadioElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === getNamespacedTagFor('market-radio').toUpperCase();
}
/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketRowElement`
 */
function isRowElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === getNamespacedTagFor('market-row').toUpperCase();
}
/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketToggleElement`
 */
function isToggleElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === getNamespacedTagFor('market-toggle').toUpperCase();
}

export { isCheckboxElement as a, isRadioElement as b, isToggleElement as c, isRowElement as i };

//# sourceMappingURL=element-type-guard.js.map