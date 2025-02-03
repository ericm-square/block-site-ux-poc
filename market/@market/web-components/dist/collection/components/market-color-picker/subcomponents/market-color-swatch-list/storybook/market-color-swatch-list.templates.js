import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const ColorSwatchListTemplate = ({ customSwatches, value }) => html `
  <market-color-swatch-list value=${ifDefined(value)}
    >${customSwatches
    ? customSwatches.split(',').map((color) => html `<market-color-swatch value=${color}></market-color-swatch>`)
    : ''}</market-color-swatch-list
  >
`;
//# sourceMappingURL=market-color-swatch-list.templates.js.map
