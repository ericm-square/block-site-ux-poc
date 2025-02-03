import { newSpecPage } from "@stencil/core/testing";
import { MarketTableV2 } from "../market-table-v2";
describe('market-table-v2', () => {
    let page;
    describe('with defaults', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketTableV2],
                html: '<market-table-v2><market-table-v2-row><market-table-v2-cell>Cell</market-table-v2-cell></market-table-v2-row></market-table-v2>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-table-v2 class="market-table-v2" layout="auto">
          <mock:shadow-root>
            <div part="table" role="table">
              <slot></slot>
            </div>
          </mock:shadow-root>
          <market-table-v2-row><market-table-v2-cell>Cell</market-table-v2-cell></market-table-v2-row>
        </market-table-v2>
      `);
        });
    });
});
//# sourceMappingURL=market-table-v2.spec.js.map
