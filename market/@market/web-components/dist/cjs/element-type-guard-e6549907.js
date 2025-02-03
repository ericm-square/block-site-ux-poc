'use strict';

const index = require('./index-254d04f0.js');

/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketCheckboxElement`
 */
function isCheckboxElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === index.getNamespacedTagFor('market-checkbox').toUpperCase();
}
/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketRadioElement`
 */
function isRadioElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === index.getNamespacedTagFor('market-radio').toUpperCase();
}
/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketRowElement`
 */
function isRowElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === index.getNamespacedTagFor('market-row').toUpperCase();
}
/**
 * @param {unknown} el - element to be checked
 * @returns {boolean} whether `el` is a `HTMLMarketToggleElement`
 */
function isToggleElement(el) {
    return (el === null || el === void 0 ? void 0 : el.tagName) === index.getNamespacedTagFor('market-toggle').toUpperCase();
}

exports.isCheckboxElement = isCheckboxElement;
exports.isRadioElement = isRadioElement;
exports.isRowElement = isRowElement;
exports.isToggleElement = isToggleElement;

//# sourceMappingURL=element-type-guard-e6549907.js.map