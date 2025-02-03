import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketCodeInputTemplate = ({ 
// demo
button, 
// props
disabled, focused, invalid, length, name, readonly, type, value, }) => html `
  <market-code-input
    ?disabled=${disabled}
    ?focused=${focused}
    ?invalid=${invalid}
    length=${ifDefined(length)}
    name=${ifDefined(name)}
    ?readonly=${readonly}
    type=${ifDefined(type)}
    value=${ifDefined(value)}
  >
    ${button &&
    html `
      <market-button icon-only size="small" slot="trailing-accessory">
        <market-icon slot="icon" name="refresh"></market-icon>
      </market-button>
    `}
  </market-code-input>
`;
//# sourceMappingURL=market-code-input.templates.js.map
