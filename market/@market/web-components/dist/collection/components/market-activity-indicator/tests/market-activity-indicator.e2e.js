import { newE2EPage } from "@stencil/core/testing";
describe('market-activity-indicator', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-activity-indicator></market-activity-indicator>');
        const element = await page.find('market-activity-indicator');
        expect(element).not.toBeNull();
        expect(element).toHaveAttribute('hydrated');
        expect(element).toHaveAttribute('size');
        expect(element).toEqualAttribute('size', 'large');
    });
});
//# sourceMappingURL=market-activity-indicator.e2e.js.map
