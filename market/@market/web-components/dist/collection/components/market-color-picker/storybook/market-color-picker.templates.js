import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const ColorPickerTemplate = ({ 
// demo
customSwatches, gradient, input, swatches, 
// prop
value, }) => html `
  <market-color-picker value=${ifDefined(value)}>
    ${gradient ? html `<market-color-picker-gradient></market-color-picker-gradient>` : ''}
    ${swatches
    ? html `<market-color-swatch-list
          >${customSwatches
        ? customSwatches.split(',').map((color) => html `<market-color-swatch value=${color}></market-color-swatch>`)
        : ''}</market-color-swatch-list
        >`
    : ''}
    ${input ? html `<market-color-picker-input></market-color-picker-input>` : ''}
  </market-color-picker>
`;
//# sourceMappingURL=market-color-picker.templates.js.map
