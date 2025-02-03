import { newSpecPage } from "@stencil/core/testing";
import { MarketDivider } from "../market-divider";
describe('market-divider', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketDivider],
            html: '<market-divider></market-divider>',
        });
        expect(page.root).toEqualHtml(`
      <market-divider class="market-divider" margin="medium" size="thick">
        <mock:shadow-root>
        </mock:shadow-root>
      </market-divider>
    `);
    });
});
//# sourceMappingURL=market-divider.spec.js.map
