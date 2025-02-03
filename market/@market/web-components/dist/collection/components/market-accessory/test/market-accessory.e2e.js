import { newE2EPage } from "@stencil/core/testing";
describe('market-accessory', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-accessory></market-accessory>');
        const element = await page.find('market-accessory');
        expect(element).toHaveAttribute('hydrated');
    });
});
//# sourceMappingURL=market-accessory.e2e.js.map
