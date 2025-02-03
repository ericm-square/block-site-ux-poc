import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const ColorPickerInputTemplate = ({ value, label }) => html `
  <market-color-picker-input value=${ifDefined(value)}>
    ${label ? html `<label slot="label">${label}</label>` : ''}
  </market-color-picker-input>
`;
//# sourceMappingURL=market-color-picker-input.templates.js.map
