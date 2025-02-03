import { html, nothing } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const MarketSheetTemplate = ({ 
// demo
actions, apiMessage, paragraphs, footer, header, 
// props
closeHandleAriaLabel, disableFocus, openMode, }) => html `
  <market-sheet
    aria-labelledby=${(header && 'modal-heading') || nothing}
    aria-label=${(!header && 'Modal Title') || nothing}
    close-handle-aria-label=${ifDefined(closeHandleAriaLabel)}
    ?disable-focus=${disableFocus}
    open-mode=${ifDefined(openMode)}
  >
    ${header
    ? html `
          <market-header>
            <h2 id="modal-heading">Modal Title</h2>
            ${actions
        ? html `
                  <market-button-group slot="actions">
                    <market-button rank="primary">Primary</market-button>
                    <market-button rank="secondary">Secondary</market-button>
                  </market-button-group>
                `
        : null}
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
      ${paragraphs > 0
    ? Array.from({ length: paragraphs }).map(() => html `
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et turpis lobortis, consectetur massa
                at, molestie urna. Nam ipsum enim, tincidunt at tempor sed, imperdiet a est. Praesent nisl felis,
                placerat et lobortis vitae, ultricies eu velit.
              </p>
            `)
    : null}
    </section>
    ${footer
    ? html `
          <market-footer>
            <market-button-group alignment="fill">
              <market-button rank="primary"> Primary </market-button>
              <market-button rank="secondary"> Secondary </market-button>
            </market-button-group>
          </market-footer>
        `
    : null}
  </market-sheet>
`;
//# sourceMappingURL=market-sheet.templates.js.map
