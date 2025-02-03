import { newSpecPage } from "@stencil/core/testing";
import { MarketTableColumn } from "../market-table-column";
describe('market-table-column', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketTableColumn],
            html: '<market-table-column name="test">Column content</market-table-column>',
        });
        expect(page.root).toEqualHtml(`
      <market-table-column class="market-table-column" name="test" role="columnheader">
        <mock:shadow-root>
          <slot name="leading-accessory"></slot>
          <slot></slot>
          <slot name="trailing-accessory"></slot>
        </mock:shadow-root>
        Column content
      </market-table-column>
    `);
    });
});
//# sourceMappingURL=market-table-column.spec.js.map
