import { html, nothing } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { MarketListTemplate } from "../../market-list/storybook/market-list.templates";
const FilterTemplate = ({ content, disabled, displayValueText, dropdownInteraction, labelText, name, popoverPlacement, size, }) => html `
  <market-filter
    ?disabled=${disabled}
    dropdown-interaction=${ifDefined(dropdownInteraction)}
    name=${ifDefined(name)}
    popover-placement=${ifDefined(popoverPlacement)}
    size=${ifDefined(size)}
  >
    <label slot="label">${labelText}</label>
    ${displayValueText && html `<span slot="display-value">${displayValueText}</span>`} ${content}
  </market-filter>
`;
export const FilterListTemplate = ({ disabled, displayValueText, dropdownInteraction, labelText, listMultiselect, listRowArgMap, listValue, name, popoverPlacement, size, }) => FilterTemplate({
    content: MarketListTemplate({
        interactive: true,
        multiselect: listMultiselect,
        value: listValue,
        itemType: 'market-row',
        rowArgMap: listRowArgMap,
    }),
    disabled,
    displayValueText,
    dropdownInteraction,
    labelText,
    name,
    popoverPlacement,
    size,
});
export const FilterDateTemplate = ({ disabled, displayedDate, displayMenu, displayValueText, dropdownInteraction, labelText, name, popoverPlacement, selectedEndDate, selectedStartDate, selectionType, size, }) => FilterTemplate({
    /* TODO: use date picker template */
    content: html `
      <market-date-picker
        displayed-date="${ifDefined(displayedDate) ? new Date(displayedDate).toLocaleDateString() : nothing}"
        ?display-menu=${displayMenu}
        selected-start-date="${ifDefined(selectedStartDate)
        ? new Date(selectedStartDate).toLocaleDateString()
        : nothing}"
        selected-end-date="${ifDefined(selectedEndDate) ? new Date(selectedEndDate).toLocaleDateString() : nothing}"
        selection-type=${selectionType}
      ></market-date-picker>
    `,
    disabled,
    displayValueText,
    dropdownInteraction,
    labelText,
    name,
    popoverPlacement,
    size,
});
//# sourceMappingURL=market-filter.templates.js.map
