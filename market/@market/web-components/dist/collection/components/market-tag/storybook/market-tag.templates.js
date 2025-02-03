import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { PlaceholderSvg16 } from "../../../../docs/helpers/placeholder-svg";
export const MarketTagTemplate = ({ 
// demo
icon, text, 
// props
disabled, focused, size, }) => html `
  <market-tag ?disabled=${disabled} ?focused=${focused} size=${ifDefined(size)}>
    ${icon ? html ` <market-accessory slot="icon"> ${PlaceholderSvg16()} </market-accessory> ` : null} ${text}
  </market-tag>
`;
export const MarketTagTableTemplate = ({ text, size }) => html `
  <table class="market-tag-table">
    <tr>
      <td>${MarketTagTemplate({ text, size })}</td>
      <td>${MarketTagTemplate({ text, size, icon: true })}</td>
      <td>${MarketTagTemplate({ text, size, disabled: true })}</td>
      <td>
        ${MarketTagTemplate({
    text,
    size,
    icon: true,
    disabled: true,
})}
      </td>
    </tr>
  </table>
`;
//# sourceMappingURL=market-tag.templates.js.map
