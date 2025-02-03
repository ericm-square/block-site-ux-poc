import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { PlaceholderSvg24 } from "../../../../docs/helpers/placeholder-svg";
export const MarketButtonTemplate = ({ 
// demo
text, icon, 
// props
caret, disabled, download, focused, href, iconOnly, innerTabindex, isLoading, rank, rel, size, target, type, variant, }) => html `
  <market-button
    caret=${ifDefined(caret)}
    ?disabled=${disabled}
    download=${ifDefined(download)}
    ?focused=${focused}
    href=${ifDefined(href)}
    ?icon-only=${iconOnly}
    inner-tabindex=${ifDefined(innerTabindex)}
    ?is-loading=${isLoading}
    rank=${ifDefined(rank)}
    rel=${ifDefined(rel)}
    size=${ifDefined(size)}
    target=${ifDefined(target)}
    type=${ifDefined(type)}
    variant=${ifDefined(variant)}
  >
    ${text} ${icon ? html ` <market-accessory slot="icon"> ${PlaceholderSvg24()} </market-accessory> ` : null}
  </market-button>
`;
export const MarketButtonTableRowTemplate = ({ 
// props
caret, isLoading, rank, size, variant, }) => html `
  <tr>
    <td>
      ${MarketButtonTemplate({
    text: 'Button',
    caret,
    isLoading,
    rank,
    size,
    variant,
})}
    </td>
    <td>
      ${MarketButtonTemplate({
    text: 'Button',
    caret,
    disabled: true,
    isLoading,
    rank,
    size,
    variant,
})}
    </td>
    <td>
      ${MarketButtonTemplate({
    text: 'Button',
    caret,
    icon: true,
    isLoading,
    rank,
    size,
    variant,
})}
    </td>
    <td>
      ${MarketButtonTemplate({
    text: 'Button',
    caret,
    disabled: true,
    icon: true,
    isLoading,
    rank,
    size,
    variant,
})}
    </td>
    <td>
      ${MarketButtonTemplate({
    caret,
    icon: true,
    iconOnly: true,
    isLoading,
    rank,
    size,
    variant,
})}
    </td>
    <td>
      ${MarketButtonTemplate({
    caret,
    disabled: true,
    icon: true,
    iconOnly: true,
    isLoading,
    rank,
    size,
    variant,
})}
    </td>
  </tr>
`;
export const MarketButtonTableTemplate = ({ 
// props
caret, isLoading, size, variant, }) => html `
  <table class="market-button-table">
    ${MarketButtonTableRowTemplate({
    caret,
    isLoading,
    rank: 'primary',
    size,
    variant,
})}
    ${MarketButtonTableRowTemplate({
    caret,
    isLoading,
    rank: 'secondary',
    size,
    variant,
})}
    ${MarketButtonTableRowTemplate({
    caret,
    isLoading,
    rank: 'tertiary',
    size,
    variant,
})}
  </table>
`;
//# sourceMappingURL=market-button.templates.js.map
