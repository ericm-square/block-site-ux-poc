import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const ColorSwatchTemplate = ({ disabled, name, selected, value }) => html `
  <market-color-swatch
    ?disabled=${disabled}
    name=${ifDefined(name)}
    ?selected=${selected}
    value=${ifDefined(value)}
  ></market-color-swatch>
`;
//# sourceMappingURL=market-color-swatch.templates.js.map
