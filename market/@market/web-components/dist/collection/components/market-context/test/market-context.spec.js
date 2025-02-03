import { newSpecPage } from "@stencil/core/testing";
import { MarketContext } from "../market-context";
describe('market-context', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketContext],
            html: '<market-context></market-context>',
        });
        expect(page.root).toEqualHtml(`
      <market-context class="market-context">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </market-context>
    `);
    });
});
//# sourceMappingURL=market-context.spec.js.map
