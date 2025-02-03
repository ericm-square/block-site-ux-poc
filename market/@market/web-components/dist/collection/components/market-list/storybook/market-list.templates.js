import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { MarketRowTemplate } from "../../market-row/storybook/market-row.templates";
import { MarketActionCardTemplate } from "../../market-action-card/storybook/market-action-card.templates";
export const MarketListTemplate = ({ 
// props
filterStrategy, hideSelectableCount, interactive, multiselect, name, reorderable, reorderMode, transient, value, 
// demo
className, control, customEmptyState, disabledItemsIndices, hasSearch, hasSelectAll, hasSubtext, hasValue, inputSearchValue, itemCount, itemType, rowArgMap, searchEmptyStatePrimaryText, searchEmptyStateSecondaryText, slot, style, tooltipItemsIndices, }) => html `
  <market-list
    class=${ifDefined(className)}
    filter-strategy=${ifDefined(filterStrategy)}
    ?hide-selectable-count=${hideSelectableCount}
    ?interactive=${interactive}
    ?multiselect=${multiselect}
    name=${ifDefined(name)}
    reorderable=${ifDefined(reorderable)}
    reorder-mode=${ifDefined(reorderMode)}
    slot=${ifDefined(slot)}
    style=${ifDefined(style)}
    ?transient=${transient}
    value=${ifDefined(value)}
  >
    ${hasSearch
    ? html `<market-input-search value=${ifDefined(inputSearchValue)} slot="search"></market-input-search>`
    : ''}
    ${hasSelectAll
    ? MarketRowTemplate({
        control,
        label: 'Select all',
        value: 'all',
        slot: 'control-row',
    })
    : ''}
    ${buildItems({
    control,
    disabledItemsIndices,
    hasSubtext,
    hasValue,
    itemCount,
    itemType,
    rowArgMap,
    tooltipItemsIndices,
})}
    ${customEmptyState !== null && customEmptyState !== void 0 ? customEmptyState : html `
      ${searchEmptyStatePrimaryText
    ? html `<span slot="empty-state-primary-text">${searchEmptyStatePrimaryText}</span>`
    : ''}
      ${searchEmptyStateSecondaryText
    ? html `<span slot="empty-state-secondary-text">${searchEmptyStateSecondaryText}</span>`
    : ''}
    `}
  </market-list>
`;
function getFruitName(index, itemCount) {
    const fruits = [
        'Apple',
        'Banana',
        'Blueberry',
        'Mango',
        'Melon',
        'Orange',
        'Pear',
        'Pineapple',
        'Strawberry',
        'Watermelon',
    ];
    if (itemCount > fruits.length) {
        return fruits[index % fruits.length];
    }
    else {
        return fruits[Math.round(index * (fruits.length / itemCount))];
    }
}
function getFruitSubtext(index, itemCount) {
    const subtext = ['Red', 'Yellow', 'Blue', 'Yellow', 'Orange', 'Orange', 'Green', 'Yellow', 'Red', 'Green'];
    if (itemCount > subtext.length) {
        return subtext[index % subtext.length];
    }
    else {
        return subtext[Math.round(index * (subtext.length / itemCount))];
    }
}
export function buildItems({ control, disabledItemsIndices, hasSubtext, hasValue, itemCount: _itemCount, itemType, rowArgMap, tooltipItemsIndices, }) {
    const itemCount = _itemCount !== null && _itemCount !== void 0 ? _itemCount : Object.keys(rowArgMap !== null && rowArgMap !== void 0 ? rowArgMap : {}).length;
    const tempList = Array.from({ length: itemCount }).fill(undefined);
    return tempList.map((_, index) => {
        var _a, _b, _c, _d, _e, _f;
        const value = hasValue
            ? (_b = (_a = rowArgMap === null || rowArgMap === void 0 ? void 0 : rowArgMap[index]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : `${getFruitName(index, itemCount).toLocaleLowerCase()}-${index}`
            : undefined;
        const label = (_d = (_c = rowArgMap === null || rowArgMap === void 0 ? void 0 : rowArgMap[index]) === null || _c === void 0 ? void 0 : _c.label) !== null && _d !== void 0 ? _d : getFruitName(index, itemCount);
        const subtext = hasSubtext ? (_f = (_e = rowArgMap === null || rowArgMap === void 0 ? void 0 : rowArgMap[index]) === null || _e === void 0 ? void 0 : _e.subtext) !== null && _f !== void 0 ? _f : getFruitSubtext(index, itemCount) : '';
        const disabled = disabledItemsIndices === null || disabledItemsIndices === void 0 ? void 0 : disabledItemsIndices.split(',').includes(`${index}`);
        const hasTooltip = tooltipItemsIndices === null || tooltipItemsIndices === void 0 ? void 0 : tooltipItemsIndices.split(',').includes(`${index}`);
        const trailingAccessory = hasTooltip ? 'tooltip' : '';
        const rowArgs = rowArgMap === null || rowArgMap === void 0 ? void 0 : rowArgMap[index];
        if (itemType === 'market-row') {
            return MarketRowTemplate(Object.assign({ control,
                disabled,
                label,
                subtext,
                trailingAccessory,
                value }, rowArgs));
        }
        else if (itemType === 'market-action-card') {
            return MarketActionCardTemplate({
                disabled,
                value,
                rowArgs: Object.assign({ control,
                    label,
                    subtext,
                    trailingAccessory }, rowArgs),
            });
        }
        return undefined;
    });
}
//# sourceMappingURL=market-list.templates.js.map
