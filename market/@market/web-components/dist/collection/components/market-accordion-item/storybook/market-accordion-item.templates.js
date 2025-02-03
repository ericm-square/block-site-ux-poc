import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketAccordionItemTemplate = ({ label, disabled, expanded, name, size, }) => html `
  <market-accordion-item ?disabled=${disabled} ?expanded=${expanded} name=${ifDefined(name)} size=${ifDefined(size)}>
    <!-- The label slot element should be permitted content of a button DOM element as this is its parent -->
    <span slot="label">${label}</span>
    <p>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    </p>
  </market-accordion-item>
`;
//# sourceMappingURL=market-accordion-item.templates.js.map
