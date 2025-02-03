import { newSpecPage } from "@stencil/core/testing";
import MutationObserver from "mutation-observer";
import { MarketContextManager } from "../market-context-manager";
// Fix for ReferenceError: MutationObserver is not defined
global.MutationObserver = MutationObserver;
describe('market-context-manager', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketContextManager],
            html: '<market-context-manager></market-context-manager>',
        });
        expect(page.root).toEqualHtml(`
      <market-context-manager class="market-context-manager">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </market-context-manager>
    `);
    });
});
//# sourceMappingURL=market-context-manager.spec.js.map
