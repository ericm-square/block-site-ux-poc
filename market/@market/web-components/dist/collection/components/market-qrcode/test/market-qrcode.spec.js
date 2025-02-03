import { newSpecPage } from "@stencil/core/testing";
import { MarketQrcode } from "../market-qrcode";
describe('market-qrcode', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [MarketQrcode],
            html: '<market-qrcode></market-qrcode>',
        });
        expect(page.root).toEqualHtml(`
      <market-qrcode class="market-qrcode" aria-hidden="true" content="">
        <mock:shadow-root>
          <div></div>
        </mock:shadow-root>
      </market-qrcode>
    `);
    });
});
//# sourceMappingURL=market-qrcode.spec.js.map
