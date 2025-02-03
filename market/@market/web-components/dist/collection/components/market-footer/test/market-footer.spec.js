import { newSpecPage } from "@stencil/core/testing";
import { MarketFooter } from "../market-footer";
describe('market-footer', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketFooter],
            html: '<market-footer></market-footer>',
        });
        expect(page.root).toEqualHtml(`
        <market-footer class="market-footer">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
        </market-footer>
      `);
    });
});
//# sourceMappingURL=market-footer.spec.js.map
