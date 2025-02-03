import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { SlottedAccessory } from "../../../../docs/helpers/slotted-accessory";
export const MarketInputSearchTemplate = ({ 
// demo
leadingAccessory, slottedInput, trailingAccessory, 
// props
autocomplete, autofocus, clearButtonAriaLabel, compact, disabled, inputAriaLabel, maxlength, name, placeholder, searchIconButtonAriaLabel, size, value, }) => html `
  <market-input-search
    autocomplete=${ifDefined(autocomplete)}
    ?autofocus=${autofocus}
    clear-button-aria-label=${ifDefined(clearButtonAriaLabel)}
    ?compact=${compact}
    ?disabled=${disabled}
    input-aria-label=${ifDefined(inputAriaLabel)}
    maxlength=${ifDefined(maxlength)}
    name=${ifDefined(name)}
    placeholder=${ifDefined(placeholder)}
    search-icon-button-aria-label=${ifDefined(searchIconButtonAriaLabel)}
    size=${ifDefined(size)}
    value=${ifDefined(value)}
  >
    ${leadingAccessory
    ? SlottedAccessory({
        placement: 'leading',
        type: leadingAccessory,
    })
    : null}
    ${slottedInput ? html `<input slot="input" />` : null}
    ${trailingAccessory
    ? SlottedAccessory({
        placement: 'trailing',
        type: trailingAccessory,
    })
    : null}
  </market-input-search>
`;
export const MarketInputSearchFormTemplate = () => html `
  <form
    class="market-grid-container"
    onsubmit="alert('You submitted the form with entries: ' + JSON.stringify(Object.fromEntries(new FormData(event.target)))); return false;"
  >
    <div class="market-grid-item-small">
      <market-input-search name="form-input" required></market-input-search>
    </div>
    <div class="market-grid-item-small">
      <market-button type="submit" rank="primary" size="medium">Submit</market-button>
    </div>
  </form>
`;
//# sourceMappingURL=market-input-search.templates.js.map
