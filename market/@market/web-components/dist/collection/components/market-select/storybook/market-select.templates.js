import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { SlottedAccessory } from "../../../../docs/helpers/slotted-accessory";
import { MarketListTemplate } from "../../market-list/storybook/market-list.templates";
export const MarketSelectTemplate = ({ 
// demo
itemCount, label, leadingAccessory, listArgs, selectedTranslation, trailingAccessory, 
// props
disabled, invalid, multiselect, name, placeholder, popoverContainer, popoverStrategy, readonly, required, size, value, }) => html `
  <market-select
    name=${ifDefined(name)}
    value=${ifDefined(value)}
    placeholder=${ifDefined(placeholder)}
    size=${ifDefined(size)}
    ?multiselect=${multiselect}
    ?readonly=${readonly}
    ?disabled=${disabled}
    ?invalid=${invalid}
    ?required=${required}
    popover-container=${ifDefined(popoverContainer)}
    popover-strategy=${ifDefined(popoverStrategy)}
  >
    <label>${label}</label>
    ${MarketListTemplate(Object.assign({ hasValue: true, itemType: 'market-row', itemCount, control: multiselect ? 'checkbox' : 'none', slot: 'list' }, listArgs))}
    ${leadingAccessory
    ? SlottedAccessory({
        placement: 'leading',
        type: leadingAccessory,
    })
    : null}
    ${trailingAccessory
    ? SlottedAccessory({
        placement: 'trailing',
        type: trailingAccessory,
    })
    : null}
    ${selectedTranslation ? html `<span slot="selected-translation">${selectedTranslation}</span>` : null}
  </market-select>
`;
//# sourceMappingURL=market-select.templates.js.map
