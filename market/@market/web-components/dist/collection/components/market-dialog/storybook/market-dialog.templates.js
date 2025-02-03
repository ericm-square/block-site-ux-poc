import { html, nothing } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketDialogTemplate = ({ 
// demo
apiMessage, bodyText, buttonGroup, buttonGroupAlignment, headerText, 
// props
isLoading, persistent, trapFocus, }) => html `
  <market-dialog
    aria-labelledby=${(headerText && 'header-text') || nothing}
    aria-label=${(!headerText && 'Dialog header text') || nothing}
    ?is-loading=${isLoading}
    ?persistent=${persistent}
    ?trap-focus=${trapFocus}
  >
    ${headerText
    ? html `
          <market-header>
            <h2 id="header-text">${headerText}</h2>
          </market-header>
        `
    : null}
    <section class="main">
      ${apiMessage
    ? html `
            <ul class="heading-10">
              <li>Hit option + A to toggle the live API controls.</li>
              <li>View the live source code in the left sidebar.</li>
            </ul>
          `
    : null}
      ${bodyText ? html `<p>${bodyText}</p>` : null}
    </section>
    ${buttonGroup
    ? html `
          <market-footer>
            <market-button-group alignment=${ifDefined(buttonGroupAlignment)}>
              <market-button rank="primary">Agree</market-button>
              <market-button rank="secondary" variant="destructive">Disagree</market-button>
            </market-button-group>
          </market-footer>
        `
    : null}
  </market-dialog>
`;
//# sourceMappingURL=market-dialog.templates.js.map
