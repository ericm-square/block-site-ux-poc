import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const TabTemplate = ({ ariaControls, disabled, id, selected, size, text }) => html `
  <market-tab
    aria-controls=${ifDefined(ariaControls)}
    ?disabled=${ifDefined(disabled)}
    id=${ifDefined(id)}
    ?selected=${ifDefined(selected)}
    size=${ifDefined(size)}
  >
    ${text}
  </market-tab>
`;
//# sourceMappingURL=market-tab.templates.js.map
