import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { PlaceholderSvg24 } from "../../../../docs/helpers/placeholder-svg";
// TODO: migrate const/type back into market-banner in market repo
const ALL_BANNER_VARIANTS = ['info', 'success', 'warning', 'critical', 'insight'];
export const defaultBannerArgs = {
    // demo
    text: 'Lorem ipsum dolor sit amet.',
    title: '',
    inlineLink: false,
    inlineButton: false,
    customIcon: false,
    actionLinks: 0,
    actionButtons: 0,
};
export const MarketBannerTemplate = ({ 
// demo
text, title, inlineLink, inlineButton, customIcon, actionLinks, actionButtons, 
// props
variant, dismissable, dismissButtonAriaLabel, }) => html `
  <market-banner
    variant=${ifDefined(variant)}
    ?dismissable=${dismissable}
    dismiss-button-aria-label=${ifDefined(dismissButtonAriaLabel)}
  >
    ${customIcon ? html `<market-accessory slot="icon">${PlaceholderSvg24()}</market-accessory>` : null}
    ${title ? html `<span slot="title">${title}</span>` : null}
    ${inlineLink
    ? html `With an <a href="#">inline link</a>.`
    : inlineButton
        ? html `With an <button>inline button</button>.`
        : text}
    ${Array.from({ length: actionLinks }).map(() => html `<a slot="action" href="#">Link</a>`)}
    ${Array.from({ length: actionButtons }).map(() => html `<button slot="action">Button</button>`)}
  </market-banner>
`;
export const MarketBannerVariantsTemplate = ({ customIcon = false }) => html `
  ${ALL_BANNER_VARIANTS.map((variant) => html `${MarketBannerTemplate(Object.assign(Object.assign({}, defaultBannerArgs), { text: `Lorem ipsum dolor sit amet, ${variant} variant.`, variant,
    customIcon }))}<br />`)}
`;
//# sourceMappingURL=market-banner.templates.js.map
