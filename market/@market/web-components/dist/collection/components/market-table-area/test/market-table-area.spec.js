import { newSpecPage } from "@stencil/core/testing";
import { MarketTableArea } from "../market-table-area";
describe('market-table-area', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketTableArea],
            html: '<market-table-area>Table area content</market-table-area>',
        });
        expect(page.root).toEqualHtml(`
      <market-table-area class="market-table-area" orientation="horizontal">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Table area content
      </market-table-area>
    `);
    });
});
//# sourceMappingURL=market-table-area.spec.js.map
