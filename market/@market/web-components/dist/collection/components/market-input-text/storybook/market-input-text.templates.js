import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { SlottedAccessory } from "../../../../docs/helpers/slotted-accessory";
export const MarketInputTextTemplate = ({ 
// demo
label, leadingAccessory, slottedInput, trailingAccessory, 
// props
autocomplete, autofocus, autovalidate, disabled, inputId, inputmode, invalid, max, maxlength, min, minlength, name, pattern, placeholder, readonly, required, size, step, type, value, }) => html `
  <market-input-text
    ?autofocus=${autofocus}
    autocomplete=${ifDefined(autocomplete)}
    ?autovalidate=${autovalidate}
    ?disabled=${disabled}
    input-id=${ifDefined(inputId)}
    inputmode=${ifDefined(inputmode)}
    ?invalid=${invalid}
    max=${ifDefined(max)}
    maxlength=${ifDefined(maxlength)}
    min=${ifDefined(min)}
    minlength=${ifDefined(minlength)}
    name=${ifDefined(name)}
    pattern=${ifDefined(pattern)}
    placeholder=${ifDefined(placeholder)}
    ?readonly=${readonly}
    ?required=${required}
    size=${ifDefined(size)}
    step=${ifDefined(step)}
    type=${ifDefined(type)}
    value=${ifDefined(value)}
  >
    <label>${label}</label>
    ${slottedInput ? html `<input slot="input" />` : null}
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
  </market-input-text>
`;
export const MarketInputTextStatesTemplate = ({ size, slottedInput }) => html `
  <table class="market-input-text-table-3-up">
    <tr>
      <td>
        ${MarketInputTextTemplate({
    size,
    slottedInput,
    label: 'Label',
    placeholder: 'Hint...',
})}
      </td>
      <td>
        ${MarketInputTextTemplate({
    size,
    slottedInput,
    label: 'Label',
    placeholder: 'Hint...',
    invalid: true,
})}
      </td>
      <td>
        ${MarketInputTextTemplate({
    size,
    slottedInput,
    label: 'Label',
    placeholder: 'Hint...',
    disabled: true,
})}
      </td>
    </tr>
  </table>
`;
export const MarketInputTextAccessoryTemplate = ({ size }) => html `
  <table class="market-input-text-table-3-up">
    <tr>
      <td>
        ${MarketInputTextTemplate({
    size,
    label: 'Text',
    leadingAccessory: 'text',
    trailingAccessory: 'text',
})}
      </td>
      <td>
        ${MarketInputTextTemplate({
    size,
    label: 'Tooltip',
    leadingAccessory: 'tooltip',
    trailingAccessory: 'tooltip',
})}
      </td>
      <td>
        ${MarketInputTextTemplate({
    size,
    label: 'Icon',
    leadingAccessory: 'icon',
    trailingAccessory: 'icon',
})}
      </td>
    </tr>
    ${size === 'large'
    ? html `<tr>
          <td>
            ${MarketInputTextTemplate({
        size,
        label: 'Image',
        leadingAccessory: 'image',
        trailingAccessory: 'image',
    })}
          </td>
          <td>
            ${MarketInputTextTemplate({
        size,
        label: 'Pill',
        leadingAccessory: 'pill',
        trailingAccessory: 'pill',
    })}
          </td>
          <td>
            ${MarketInputTextTemplate({
        size,
        label: 'Button',
        leadingAccessory: 'button',
        trailingAccessory: 'button',
    })}
          </td>
        </tr>`
    : null}
  </table>
`;
export const MarketInputTextLongLabelTemplate = () => html `
  <table class="market-input-text-table-2-up">
    <tr>
      <td>
        ${MarketInputTextTemplate({
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
})}
      </td>
      <td>
        ${MarketInputTextTemplate({
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    value: 'Input',
})}
      </td>
    </tr>
  </table>
`;
export const MarketInputTextFormTemplate = () => html `
  <form
    class="market-grid-container"
    onsubmit="alert('You submitted the form with entries: ' + JSON.stringify(Object.fromEntries(new FormData(event.target)))); return false;"
  >
    <div class="market-grid-item-small">
      ${MarketInputTextTemplate({
    label: 'Label',
    name: 'form-input',
    required: true,
})}
    </div>
    <div class="market-grid-item-small">
      <market-button type="submit" rank="primary" size="large">Submit</market-button>
    </div>
  </form>
`;
export const MarketInputTextPhoneTemplate = () => html `
  <market-input-text value="+1 " size="large">
    <label>Phone number</label>
    <market-accessory slot="leading-accessory">
      <market-button-dropdown>
        <market-button slot="trigger" rank="tertiary">🇺🇸</market-button>
        <market-list slot="content">
          <market-row value="US">
            <market-accessory size="icon" slot="leading-accessory"> 🇺🇸 </market-accessory>
            <label>United States +1</label>
          </market-row>
          <market-row value="CA">
            <market-accessory size="icon" slot="leading-accessory"> 🇨🇦 </market-accessory>
            <label>Canada +1</label>
          </market-row>
          <market-row value="JP">
            <market-accessory size="icon" slot="leading-accessory"> 🇯🇵 </market-accessory>
            <label>Japan +81</label>
          </market-row>
        </market-list>
      </market-button-dropdown>
    </market-accessory>
  </market-input-text>
`;
//# sourceMappingURL=market-input-text.templates.js.map
