import { newSpecPage } from "@stencil/core/testing";
import MutationObserver from "mutation-observer";
import { MarketHeader } from "../market-header";
// Fix for ReferenceError: MutationObserver is not defined
global.MutationObserver = MutationObserver;
describe('market-header', () => {
    it('default renders', async () => {
        const page = await newSpecPage({
            components: [MarketHeader],
            html: '<market-header></market-header>',
        });
        expect(page.root).toEqualHtml(`
      <market-header class="market-header" close-button-aria-label="Close">
        <mock:shadow-root>
          <div class="grid">
            <div class="navigation">
              <nav>
                <slot name="navigation">
                  <market-button aria-label="Close" rank="secondary" slot="navigation">
                    <market-icon name="x" slot="icon"></market-icon>
                  </market-button>
                </slot>
              </nav>
            </div>
            <div class="compact">
              <slot name="compact"></slot>
            </div>
            <div class="actions">
              <menu>
                <slot name="actions"></slot>
              </menu>
            </div>
          </div>
          <div class="heading" part="heading">
            <slot name="wayfinding"></slot>
            <slot></slot>
            <slot name="subheading"></slot>
          </div>
        </mock:shadow-root>
      </market-header>
    `);
    });
    it('renders with navigation', async () => {
        const page = await newSpecPage({
            components: [MarketHeader],
            html: `
        <market-header show-navigation></market-header>
      `,
        });
        expect(page.root).toEqualHtml(`
      <market-header class="market-header" show-navigation close-button-aria-label="Close">
        <mock:shadow-root>
          <div class="grid">
            <div class="navigation">
              <nav>
                <slot name="navigation">
                  <market-button aria-label="Close" rank="secondary" slot="navigation">
                    <market-icon name="x" slot="icon"></market-icon>
                  </market-button>
                </slot>
              </nav>
            </div>
            <div class="compact">
              <slot name="compact"></slot>
            </div>
            <div class="actions">
              <menu>
                <slot name="actions"></slot>
              </menu>
            </div>
          </div>
          <div class="heading" part="heading">
            <slot name="wayfinding"></slot>
            <slot></slot>
            <slot name="subheading"></slot>
          </div>
        </mock:shadow-root>
      </market-header>
    `);
    });
});
//# sourceMappingURL=market-header.spec.js.map
