import { newSpecPage } from "@stencil/core/testing";
import { MarketTableRow } from "../market-table-row";
describe('market-table-row', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketTableRow],
            html: '<market-table-row>Row content</market-table-row>',
        });
        expect(page.root).toEqualHtml(`
      <market-table-row class="market-table-row" role="row" leading-indentation="0">
        <mock:shadow-root>
          <market-table-area orientation="vertical" stick-to="left">
            <slot name="sticky-left"></slot>
          </market-table-area>
          <market-table-area active="" orientation="vertical">
            <slot name="control"></slot>
            <slot></slot>
          </market-table-area>
          <market-table-area orientation="vertical" stick-to="right">
            <slot name="sticky-right"></slot>
          </market-table-area>
        </mock:shadow-root>
        Row content
      </market-table-row>
    `);
    });
});
//# sourceMappingURL=market-table-row.spec.js.map
