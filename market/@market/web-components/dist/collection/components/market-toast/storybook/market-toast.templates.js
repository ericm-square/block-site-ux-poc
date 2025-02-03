import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
// TODO: migrate const/type back into market-toast in market repo
export const ALL_TOAST_VARIANTS = ['info', 'success', 'warning', 'critical', 'insight'];
export const defaultToastArgs = {
    text: 'Lorem ipsum dolor sit amet.',
    inlineLink: false,
    inlineButton: false,
    actionLinks: 0,
    actionButtons: 0,
};
export const MarketToastTemplate = ({ 
// demo
text, inlineLink, inlineButton, actionLinks, actionButtons, 
// props
variant, progress, persistent, dismissButtonAriaLabel, }) => html `
  <market-toast
    variant=${ifDefined(variant)}
    progress=${ifDefined(progress)}
    ?persistent=${persistent}
    dismiss-button-aria-label=${ifDefined(dismissButtonAriaLabel)}
  >
    ${inlineLink
    ? html `With an <a href="#">inline link</a>.`
    : inlineButton
        ? html `With an <button>inline button</button>.`
        : text}
    ${Array.from({ length: actionLinks }).map(() => html `<a slot="action" href="#">Link</a>`)}
    ${Array.from({ length: actionButtons }).map(() => html `<button slot="action">Button</button>`)}
  </market-banner>
`;
export const MarketToastVariantsTemplate = () => html `
  ${ALL_TOAST_VARIANTS.map((variant) => html `${MarketToastTemplate(Object.assign(Object.assign({}, defaultToastArgs), { text: `Lorem ipsum dolor sit amet, ${variant} variant.`, variant }))}<br />`)}
`;
//# sourceMappingURL=market-toast.templates.js.map
