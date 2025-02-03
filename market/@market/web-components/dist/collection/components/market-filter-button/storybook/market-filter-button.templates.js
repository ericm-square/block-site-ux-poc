import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const FilterButtonTemplate = ({ disabled, feedbackText, iconOnly, labelText, size, }) => html `
  <market-filter-button ?disabled=${disabled} ?icon-only=${iconOnly} size=${ifDefined(size)}>
    ${labelText} ${feedbackText ? html `<span slot="feedback">${feedbackText}</span>` : ''}
  </market-filter-button>
`;
//# sourceMappingURL=market-filter-button.templates.js.map
