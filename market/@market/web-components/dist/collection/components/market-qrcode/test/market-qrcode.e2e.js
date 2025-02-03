import { newE2EPage } from "@stencil/core/testing";
describe('market-qrcode', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-qrcode content="string"></market-qrcode>
    `);
        const element = await page.find('market-qrcode');
        expect(element).toHaveAttribute('hydrated');
    });
});
//# sourceMappingURL=market-qrcode.e2e.js.map
