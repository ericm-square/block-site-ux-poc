import { parse } from "date-fns";
import { isMarketTableV2Group } from "../market-table-v2-group/types";
export const sortItems = ({ items, order, column, strategy, format, }) => {
    const sortedItems = [...items];
    sortedItems.sort((childA, childB) => {
        const rowA = isMarketTableV2Group(childA)
            ? childA.querySelector('[slot="parent"]')
            : childA;
        const rowB = isMarketTableV2Group(childB)
            ? childB.querySelector('[slot="parent"]')
            : childB;
        const params = { rowA, rowB, order, column };
        if (typeof strategy === 'function') {
            return strategy(params);
        }
        else if (strategy === 'number') {
            return sortByNumber(params);
        }
        else if (strategy === 'datetime' && format) {
            return sortByDateTime(Object.assign(Object.assign({}, params), { format }));
        }
        else {
            return sortByString(params);
        }
    });
    return sortedItems;
};
const sortByNumber = ({ rowA, rowB, order, column, }) => {
    var _a, _b, _c, _d;
    const numberA = Number.parseFloat((_b = (_a = rowA === null || rowA === void 0 ? void 0 : rowA.children[column]) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim());
    const numberB = Number.parseFloat((_d = (_c = rowB === null || rowB === void 0 ? void 0 : rowB.children[column]) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim());
    if (order === 'ascending') {
        return numberA - numberB;
    }
    else {
        return numberB - numberA;
    }
};
const sortByString = ({ rowA, rowB, order, column, }) => {
    var _a, _b, _c, _d, _e, _f;
    const contentA = (_c = (_b = (_a = rowA === null || rowA === void 0 ? void 0 : rowA.children[column]) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) === null || _c === void 0 ? void 0 : _c.toUpperCase();
    const contentB = (_f = (_e = (_d = rowB === null || rowB === void 0 ? void 0 : rowB.children[column]) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim()) === null || _f === void 0 ? void 0 : _f.toUpperCase();
    if (order === 'ascending') {
        if (contentA < contentB)
            return -1;
        if (contentA > contentB)
            return 1;
        return 0;
    }
    else {
        if (contentA < contentB)
            return 1;
        if (contentA > contentB)
            return -1;
        return 0;
    }
};
const sortByDateTime = ({ rowA, rowB, order, column, format, }) => {
    var _a, _b, _c, _d;
    const contentA = (_b = (_a = rowA === null || rowA === void 0 ? void 0 : rowA.children[column]) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
    const contentB = (_d = (_c = rowB === null || rowB === void 0 ? void 0 : rowB.children[column]) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim();
    const dateA = parse(contentA, format, new Date());
    const dateB = parse(contentB, format, new Date());
    if (order === 'ascending') {
        if (dateA < dateB)
            return -1;
        if (dateA > dateB)
            return 1;
        return 0;
    }
    else {
        if (dateA < dateB)
            return 1;
        if (dateA > dateB)
            return -1;
        return 0;
    }
};
//# sourceMappingURL=utils.js.map
