import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { MarketRowTemplate } from "../../market-row/storybook/market-row.templates";
export const MarketActionCardTemplate = ({ 
// demo
content, rowArgs, 
// props
selected, disabled, transient, value, }) => html `
  <market-action-card ?selected=${selected} ?disabled=${disabled} ?transient=${transient} value=${ifDefined(value)}>
    ${rowArgs ? MarketRowTemplate(Object.assign({ label: content }, rowArgs)) : content}
  </market-action-card>
`;
//# sourceMappingURL=market-action-card.templates.js.map
