import { getNamespacedTagFor } from "../../../utils/namespace";
export function isMarketTableV2Row(value) {
    const tagName = value === null || value === void 0 ? void 0 : value.tagName.toLowerCase();
    return Boolean(value && tagName === getNamespacedTagFor('market-table-v2-row'));
}
//# sourceMappingURL=types.js.map
