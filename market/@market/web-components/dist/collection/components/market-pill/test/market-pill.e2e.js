import { newE2EPage } from "@stencil/core/testing";
describe('market-pill', () => {
    it('should render with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-pill></market-pill>');
        const el = await page.find('market-pill');
        expect(el).not.toBeNull();
        expect(el).not.toHaveAttribute('indicator');
        expect(el).toEqualAttribute('variant', 'normal');
        expect(el).toEqualAttribute('size', 'medium');
    });
    it('can have variants', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-pill variant="success"></market-pill>');
        const el = await page.find('market-pill');
        expect(el).not.toBeNull();
        expect(el).toEqualAttribute('variant', 'success');
    });
    it('can have sizes', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-pill size="small"></market-pill>');
        const el = await page.find('market-pill');
        expect(el).not.toBeNull();
        expect(el).toEqualAttribute('size', 'small');
    });
    it('can have indicator', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-pill indicator></market-pill>');
        const el = await page.find('market-pill');
        expect(el).not.toBeNull();
        expect(el).toHaveAttribute('indicator');
    });
});
//# sourceMappingURL=market-pill.e2e.js.map
