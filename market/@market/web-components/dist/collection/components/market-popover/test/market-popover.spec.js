import { newSpecPage } from "@stencil/core/testing";
import { Popover } from "../market-popover";
describe('market-popover', () => {
    it('it renders', async () => {
        const page = await newSpecPage({
            components: [Popover],
            html: '<market-popover></market-popover>',
        });
        expect(page.root).toEqualHtml(`
      <market-popover class="market-popover">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </market-popover>
    `);
    });
});
//# sourceMappingURL=market-popover.spec.js.map
