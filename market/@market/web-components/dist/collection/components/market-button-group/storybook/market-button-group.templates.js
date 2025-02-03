import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketButtonGroupTemplate = ({ 
// demo
buttonCount, buttonText, 
// props
alignment, popoverStrategy, }) => html `
  <market-button-group alignment=${ifDefined(alignment)} popover-strategy=${ifDefined(popoverStrategy)}>
    ${Array.from({ length: buttonCount }).map((_, i) => html `<market-button rank="${i === 0 ? 'primary' : 'secondary'}">${buttonText} ${i + 1}</market-button>`)}
  </market-button-group>
`;
//# sourceMappingURL=market-button-group.templates.js.map
