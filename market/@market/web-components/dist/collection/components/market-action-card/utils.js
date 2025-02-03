import { isRowElement } from "../../utils/element-type-guard";
/**
 * Finds the row that's slotted in the action card
 *
 * @param {HTMLMarketActionCardElement} actionCardEl - the action card element
 * @returns {HTMLMarketRowElement | null} the row element, if found
 */
export function getRowInActionCard(actionCardEl) {
    if (!(actionCardEl === null || actionCardEl === void 0 ? void 0 : actionCardEl.children)) {
        return null;
    }
    return [...actionCardEl.children].find(isRowElement);
}
//# sourceMappingURL=utils.js.map
