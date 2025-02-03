import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketHeaderTemplate = ({ 
// demo
actions, customNav, heading, subheading, wayfinding, 
// props
closeButtonAriaLabel, compact, disableCloseButton, showNavigation, }) => html `
  <market-header
    ?close-button-aria-label=${ifDefined(closeButtonAriaLabel)}
    ?compact=${compact}
    ?disable-close-button=${disableCloseButton}
    ?show-navigation=${showNavigation}
  >
    ${customNav
    ? html `
        <market-button rank="secondary" slot="navigation">
          <market-icon name="back" slot="icon">
        </market-button>
      `
    : null}
    ${wayfinding ? html `<small slot="wayfinding">${wayfinding}</small>` : null}
    ${heading ? html `<h2>${heading}</h2>` : null}
    ${subheading ? html `<small slot="subheading">${subheading}</small>` : null}
    ${actions
    ? html `
          <market-button rank="secondary" slot="actions">Secondary</market-button>
          <market-button rank="primary" slot="actions">Primary</market-button>
        `
    : null}
  </market-header>
`;
//# sourceMappingURL=market-header.templates.js.map
