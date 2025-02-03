import { newE2EPage } from "@stencil/core/testing";
describe('market-divider', () => {
    it('should render with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-divider></market-divider>');
        const el = await page.find('market-divider');
        expect(el).not.toBeNull();
        expect(el).toEqualAttribute('margin', 'medium');
        expect(el).toEqualAttribute('size', 'thick');
    });
    it('should render with large margin', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-divider margin="large"></market-divider>');
        const el = await page.find('market-divider');
        expect(el).toEqualAttribute('margin', 'large');
    });
    it('should render with small margin', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-divider margin="small"></market-divider>');
        const el = await page.find('market-divider');
        expect(el).toEqualAttribute('margin', 'small');
    });
});
//# sourceMappingURL=market-divider.e2e.js.map
