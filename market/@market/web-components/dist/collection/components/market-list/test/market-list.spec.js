import { newSpecPage } from "@stencil/core/testing";
import { MarketList } from "../market-list";
describe('market-list', () => {
    /**
     * skipping this test because of error: `Syntax error, unrecognized expression: unsupported pseudo: scope`
     * https://github.com/jsdom/jsdom/issues/3141
     * https://github.com/squareup/market/pull/4656
     */
    it.skip('renders', async () => {
        const page = await newSpecPage({
            components: [MarketList],
            html: '<market-list></market-list>',
        });
        expect(page.root).toEqualHtml(`
      <market-list class="market-list" role="list" value="">
        <mock:shadow-root>
          <slot name="control-row"></slot>
          <slot></slot>
        </mock:shadow-root>
      </market-list>
    `);
    });
});
//# sourceMappingURL=market-list.spec.js.map
