import { newE2EPage } from "@stencil/core/testing";
describe('market-inline-section-header', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-inline-section-header></market-inline-section-header>');
        const element = await page.find('market-inline-section-header');
        expect(element).toHaveAttribute('hydrated');
    });
});
//# sourceMappingURL=market-inline-section-header.e2e.js.map
