import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketInputPasswordTemplate = ({ 
// demo
label, slottedInput, 
// props
autocomplete, disabled, inputId, inputmode, invalid, maxlength, minlength, name, placeholder, readonly, required, size, value, }) => html `
  <market-input-password
    autocomplete=${ifDefined(autocomplete)}
    ?disabled=${disabled}
    input-id=${ifDefined(inputId)}
    inputmode=${ifDefined(inputmode)}
    ?invalid=${invalid}
    maxlength=${ifDefined(maxlength)}
    minlength=${ifDefined(minlength)}
    name=${ifDefined(name)}
    placeholder=${ifDefined(placeholder)}
    ?readonly=${readonly}
    ?required=${required}
    size=${ifDefined(size)}
    value=${ifDefined(value)}
  >
    <label>${label}</label>
    ${slottedInput ? html `<input slot="input" />` : null}
  </market-input-password>
`;
export const MarketInputPasswordFormTemplate = () => html `
  <form class="market-grid-container" onsubmit="alert('You submitted the form!'); return false;">
    <div class="market-grid-item-full">
      <market-input-text type="email">
        <label>Email</label>
        <input slot="input" />
      </market-input-text>
    </div>
    <div class="market-grid-item-full">
      <market-input-password>
        <label>Password</label>
        <input slot="input" />
      </market-input-password>
    </div>
    <div class="market-grid-item-full">
      <market-button rank="primary" type="submit">Log in</market-button>
    </div>
  </form>
`;
//# sourceMappingURL=market-input-password.templates.js.map
