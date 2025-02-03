import { newE2EPage } from "@stencil/core/testing";
describe('market-inline-status', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-inline-status>This is a market inline status component.</market-inline-status>');
        const element = await page.find('market-inline-status');
        expect(element).not.toBeNull();
        expect(await element.getProperty('variant')).toBe('info');
        expect(element.textContent).toBe('This is a market inline status component.');
    });
    it('renders with a success variant', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-inline-status variant="success">This is a market inline status component.</market-inline-status>');
        const element = await page.find('market-inline-status');
        expect(element).not.toBeNull();
        expect(await element.getProperty('variant')).toBe('success');
        expect(element.textContent).toBe('This is a market inline status component.');
    });
    it('renders with a warning variant', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-inline-status variant="warning">This is a market inline status component.</market-inline-status>');
        const element = await page.find('market-inline-status');
        expect(element).not.toBeNull();
        expect(await element.getProperty('variant')).toBe('warning');
        expect(element.textContent).toBe('This is a market inline status component.');
    });
    it('renders with a critical variant', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-inline-status variant="critical">This is a market inline status component.</market-inline-status>');
        const element = await page.find('market-inline-status');
        expect(element).not.toBeNull();
        expect(await element.getProperty('variant')).toBe('critical');
        expect(element.textContent).toBe('This is a market inline status component.');
    });
});
//# sourceMappingURL=market-inline-status.e2e.js.map
