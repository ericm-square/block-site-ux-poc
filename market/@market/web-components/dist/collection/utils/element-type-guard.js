import { getNamespacedTagFor } from "./namespace";
/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketCheckboxElement`
 */
export function isCheckboxElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === getNamespacedTagFor('market-checkbox').toUpperCase();
}
/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketRadioElement`
 */
export function isRadioElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === getNamespacedTagFor('market-radio').toUpperCase();
}
/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketRowElement`
 */
export function isRowElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === getNamespacedTagFor('market-row').toUpperCase();
}
/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketToggleElement`
 */
export function isToggleElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === getNamespacedTagFor('market-toggle').toUpperCase();
}
//# sourceMappingURL=element-type-guard.js.map
