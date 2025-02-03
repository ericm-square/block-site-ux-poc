import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketTooltipTemplate = ({ 
// demo
link, popoverText, triggerText, 
// props
disabled, expanded, interaction, popoverDistance, popoverPlacement, popoverSkidding, popoverStrategy, }) => html `
  <market-tooltip
    ?expanded=${expanded}
    interaction=${ifDefined(interaction)}
    ?disabled=${disabled}
    popover-distance=${ifDefined(popoverDistance)}
    popover-placement=${ifDefined(popoverPlacement)}
    popover-skidding=${ifDefined(popoverSkidding)}
    popover-strategy=${ifDefined(popoverStrategy)}
  >
    <span slot="content"> ${popoverText} ${link ? html `<a href="#">Link</a>` : null} </span>
    ${triggerText ? html `<span slot="trigger">${triggerText}</span>` : null}
  </market-tooltip>
`;
//# sourceMappingURL=market-tooltip.templates.js.map
