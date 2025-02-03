import { newSpecPage } from "@stencil/core/testing";
import { MarketSegment } from "../market-segment";
describe('market-segment', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketSegment],
            html: '<market-segment value="one">One</market-segment>',
        });
        expect(page.root).toEqualHtml(`
      <market-segment class="market-segment" value="one">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        One
      </market-segment>
    `);
    });
});
//# sourceMappingURL=market-segment.spec.js.map
