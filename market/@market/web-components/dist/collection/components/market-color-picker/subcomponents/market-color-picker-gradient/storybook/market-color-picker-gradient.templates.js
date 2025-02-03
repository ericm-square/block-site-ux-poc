import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const ColorPickerGradientTemplate = ({ value }) => html `
  <market-color-picker-gradient value=${ifDefined(value)}></market-color-picker-gradient>
`;
//# sourceMappingURL=market-color-picker-gradient.templates.js.map
