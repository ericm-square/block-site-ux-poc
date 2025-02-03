import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { PlaceholderSvg24, PlaceholderSvg40 } from "../../../../docs/helpers/placeholder-svg";
export const MarketAccessoryTemplate = ({ size, slot }) => html `
  <market-accessory size=${ifDefined(size)} slot=${ifDefined(slot)}>
    ${size === 'icon' ? PlaceholderSvg24() : PlaceholderSvg40()}
  </market-accessory>
`;
//# sourceMappingURL=market-accessory.templates.js.map
