import { newSpecPage } from "@stencil/core/testing";
import { MarketTableCell } from "../market-table-cell";
describe('market-table-cell', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketTableCell],
            html: '<market-table-cell>Cell content</market-table-cell>',
        });
        expect(page.root).toEqualHtml(`
      <market-table-cell class="market-table-cell" role="cell">
        <mock:shadow-root>
          <slot name="nested-row-indicator"></slot>
          <slot name="leading-accessory"></slot>
          <slot></slot>
          <slot name="trailing-accessory"></slot>
        </mock:shadow-root>
        Cell content
      </market-table-cell>
    `);
    });
});
//# sourceMappingURL=market-table-cell.spec.js.map
