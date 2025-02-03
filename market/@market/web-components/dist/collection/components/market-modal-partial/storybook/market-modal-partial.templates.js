import { html, nothing } from "lit";
export const MarketModalPartialTemplate = ({ actions, apiMessage, paragraphs, footer, header, 
// props
trapFocus, }) => html `
  <market-modal-partial
    aria-labelledby=${(header && 'modal-heading') || nothing}
    aria-label=${(!header && 'Modal Title') || nothing}
    ?trap-focus=${trapFocus}
  >
    ${header
    ? html `
          <market-header>
            <h2 id="modal-heading">Modal Title</h2>
            ${actions
        ? html `
                  <market-button rank="primary" slot="actions">Primary</market-button>
                  <market-button rank="secondary" slot="actions">Secondary</market-button>
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
              <li>A partial modal displays full screen at viewport widths &lt; 800px.</li>
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
  </market-modal-partial>
`;
//# sourceMappingURL=market-modal-partial.templates.js.map
