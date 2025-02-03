import { isCheckboxElement, isRadioElement, isToggleElement } from "../../utils/element-type-guard";
/**
 * @param {unknown} el - Element to be checked
 * @returns {boolean} Whether `el` is a `TMarketRowValidControlElement`
 */
export function isValidRowControl(el) {
    return isCheckboxElement(el) || isRadioElement(el) || isToggleElement(el);
}
//# sourceMappingURL=utils.js.map
