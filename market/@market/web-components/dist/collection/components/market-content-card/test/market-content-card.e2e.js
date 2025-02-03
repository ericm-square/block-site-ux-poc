import { newE2EPage } from "@stencil/core/testing";
describe('market-content-card', () => {
    it('should render with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-content-card></market-content-card>');
        const el = await page.find('market-content-card');
        expect(el).not.toBeNull();
    });
});
//# sourceMappingURL=market-content-card.e2e.js.map
