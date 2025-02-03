import { newSpecPage } from "@stencil/core/testing";
import { MarketButtonDropdown } from "../market-button-dropdown";
import MutationObserver from "mutation-observer";
// Fix for ReferenceError: MutationObserver is not defined
global.MutationObserver = MutationObserver;
describe('market-button-dropdown', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketButtonDropdown],
            html: '<market-button-dropdown></market-button-dropdown>',
        });
        expect(page.root).toEqualHtml(`
      <market-button-dropdown class="market-button-dropdown">
        <mock:shadow-root>
          <market-dropdown interaction="click" popover-placement="bottom-end" popover-strategy="absolute">
            <slot name="trigger" slot="trigger"></slot>
            <market-popover part="popover" slot="popover">
              <slot name="content"></slot>
            </market-popover>
          </market-dropdown>
        </mock:shadow-root>
      </market-button-dropdown>
    `);
    });
});
//# sourceMappingURL=market-button-dropdown.spec.js.map
