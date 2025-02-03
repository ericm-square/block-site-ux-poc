import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketActivityIndicatorTemplate = ({ size }) => html `
  <market-activity-indicator size=${ifDefined(size)}></market-activity-indicator>
`;
//# sourceMappingURL=market-activity-indicator.templates.js.map
