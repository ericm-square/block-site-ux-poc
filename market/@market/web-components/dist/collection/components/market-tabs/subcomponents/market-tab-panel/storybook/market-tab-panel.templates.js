import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const TabPanelTemplate = ({ ariaLabelledby, hidden, id, content }) => html `
  <market-tab-panel aria-labelledby=${ifDefined(ariaLabelledby)} ?hidden=${ifDefined(hidden)} id=${ifDefined(id)}>
    ${content}
  </market-tab-panel>
`;
//# sourceMappingURL=market-tab-panel.templates.js.map
