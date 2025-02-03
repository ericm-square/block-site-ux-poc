import { newSpecPage } from "@stencil/core/testing";
import { MarketAccessory } from "../market-accessory";
describe('market-accessory', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketAccessory],
            html: '<market-accessory></market-accessory>',
        });
        expect(page.root).toEqualHtml(`
      <market-accessory class="market-accessory">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </market-accessory>
    `);
    });
});
//# sourceMappingURL=market-accessory.spec.js.map
