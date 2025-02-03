import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketTextareaTemplate = ({ 
// demo
label, slottedTextarea, 
// props
autofocus, disabled, inputmode, invalid, maxHeight, maxlength, name, placeholder, readonly, value, }) => html `
  <market-textarea
    ?autofocus=${autofocus}
    ?disabled=${disabled}
    inputmode=${ifDefined(inputmode)}
    ?invalid=${invalid}
    max-height=${ifDefined(maxHeight)}
    maxlength=${ifDefined(maxlength)}
    name=${ifDefined(name)}
    placeholder=${ifDefined(placeholder)}
    ?readonly=${readonly}
    value=${ifDefined(value)}
  >
    <label>${label}</label>
    ${slottedTextarea ? html `<textarea slot="textarea" />` : null}
  </market-textarea>
`;
//# sourceMappingURL=market-textarea.templates.js.map
