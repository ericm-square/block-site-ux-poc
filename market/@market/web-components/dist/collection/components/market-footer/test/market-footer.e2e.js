import { newE2EPage } from "@stencil/core/testing";
describe('market-footer', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent(`
        <market-footer>
        </market-footer>
      `);
        const element = await page.find('market-footer');
        expect(element).toHaveAttribute('hydrated');
    });
});
//# sourceMappingURL=market-footer.e2e.js.map
