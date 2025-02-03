import { getNamespacedTagFor } from "../../utils/namespace";
export function isMarketToggle(value) {
    var _a;
    const tagName = (_a = value === null || value === void 0 ? void 0 : value.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    return Boolean(value && tagName === getNamespacedTagFor('market-toggle'));
}
//# sourceMappingURL=types.js.map
