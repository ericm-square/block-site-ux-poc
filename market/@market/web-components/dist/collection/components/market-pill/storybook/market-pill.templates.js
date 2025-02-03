import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { PlaceholderSvg16 } from "../../../../docs/helpers/placeholder-svg";
import { ALL_PILL_VARIANTS } from "../../../utils/pill-variant";
export const MarketPillTemplate = ({ 
// demo
icon, text, 
// props
indicator, interactive, size, variant, }) => html `
  <market-pill
    ?indicator=${indicator}
    ?interactive=${interactive}
    size=${ifDefined(size)}
    variant=${ifDefined(variant)}
  >
    ${icon ? html `<market-accessory slot="icon">${PlaceholderSvg16()}</svg>` : null} ${text}
  </market-pill>
`;
export const MarketPillTableTemplate = ({ interactive, size }) => html `
  <table class="market-pill-table">
    <tr>
      ${ALL_PILL_VARIANTS.map((variant) => html `
          <td>
            ${MarketPillTemplate({
    interactive,
    size,
    text: variant.charAt(0).toUpperCase() + variant.slice(1),
    variant,
})}
          </td>
        `)}
    </tr>
    <tr>
      ${ALL_PILL_VARIANTS.map((variant) => html `
          <td>
            ${MarketPillTemplate({
    indicator: true,
    interactive,
    size,
    text: variant.charAt(0).toUpperCase() + variant.slice(1),
    variant,
})}
          </td>
        `)}
    </tr>
    <tr>
      ${ALL_PILL_VARIANTS.map((variant) => html `
          <td>
            ${MarketPillTemplate({
    icon: true,
    interactive,
    size,
    text: variant.charAt(0).toUpperCase() + variant.slice(1),
    variant,
})}
          </td>
        `)}
    </tr>
  </table>
`;
//# sourceMappingURL=market-pill.templates.js.map
