import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { TabTemplate } from "../../market-tab/storybook/market-tab.templates";
export const TabListTemplate = ({ disabledTabIndices, numberOfTabs, selectedTab, size, tabLabels, }) => {
    var _a, _b;
    const disabledTabIndicesList = (() => {
        var _a;
        try {
            return (_a = disabledTabIndices.split(',').map((i) => Number.parseInt(i, 10))) !== null && _a !== void 0 ? _a : [];
        }
        catch (_b) {
            return [];
        }
    })();
    const tabLabelsList = (_b = (_a = tabLabels === null || tabLabels === void 0 ? void 0 : tabLabels.split) === null || _a === void 0 ? void 0 : _a.call(tabLabels, ',')) !== null && _b !== void 0 ? _b : [];
    return html `
    <market-tab-list size=${ifDefined(size)} selected-tab=${ifDefined(selectedTab)}>
      ${Array.from({ length: numberOfTabs })
        .fill(undefined)
        .map((_, index) => {
        var _a;
        return TabTemplate({
            ariaControls: `panel-${index + 1}`,
            disabled: disabledTabIndicesList.includes(index),
            id: `tab-${index + 1}`,
            text: (_a = tabLabelsList[index]) !== null && _a !== void 0 ? _a : `Tab ${index + 1}`,
        });
    })}
    </market-tab-list>
  `;
};
//# sourceMappingURL=market-tab-list.templates.js.map
