import { newSpecPage } from "@stencil/core/testing";
import { MarketTableV2Group } from "../market-table-v2-group";
describe('market-table-v2-group', () => {
    let page;
    describe('with defaults', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketTableV2Group],
                html: `
          <market-table-v2-group>
            <market-table-v2-row slot="parent">
              <market-table-v2-cell>Cell</market-table-v2-cell>
            </market-table-v2-row>
            <market-table-v2-row>
              <market-table-v2-cell>Cell</market-table-v2-cell>
            </market-table-v2-row>
          </market-table-v2-group>
        `,
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-table-v2-group class="market-table-v2-group" indent="0" style="--drag-cursor-indent-level: 0;">
          <mock:shadow-root>
            <slot name="parent"></slot>
            <div class="children">
              <slot></slot>
            </div>
          </mock:shadow-root>
          <market-table-v2-row slot="parent">
            <market-table-v2-cell>Cell</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-row>
            <market-table-v2-cell>Cell</market-table-v2-cell>
          </market-table-v2-row>
        </market-table-v2-group>
      `);
        });
    });
});
//# sourceMappingURL=market-table-v2-group.spec.js.map
