import { newSpecPage } from "@stencil/core/testing";
import { MarketDialog } from "../market-dialog";
describe('market-dialog', () => {
    it('default renders', async () => {
        const page = await newSpecPage({
            components: [MarketDialog],
            html: '<market-dialog></market-dialog>',
        });
        expect(page.root).toEqualHtml(`
      <market-dialog class="market-dialog" role="dialog">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </market-dialog>
    `);
    });
    it('activity indicator renders', async () => {
        const page = await newSpecPage({
            components: [MarketDialog],
            html: '<market-dialog is-loading=true></market-dialog>',
        });
        expect(page.root).toEqualHtml(`
      <market-dialog class="market-dialog" is-loading=true role="dialog">
        <mock:shadow-root>
        <market-activity-indicator></market-activity-indicator>
          <slot></slot>
        </mock:shadow-root>
      </market-dialog>
    `);
    });
});
//# sourceMappingURL=market-dialog.spec.js.map
