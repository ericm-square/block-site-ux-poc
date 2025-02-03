import { newE2EPage } from "@stencil/core/testing";
describe('market-toast', () => {
    afterEach(() => {
        jest.useRealTimers();
    });
    it('renders with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-toast>Hello world!</market-toast>');
        const el = await page.find('market-toast');
        const button = await el.find('pierce/.dismiss-container button');
        expect(el).not.toBeNull();
        expect(el).toEqualAttribute('role', 'alert');
        expect(el).toEqualAttribute('variant', 'info');
        expect(el.textContent).toBe('Hello world!');
        expect(button).toEqualAttribute('aria-label', 'Dismiss');
    });
    it('renders with the optional button', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-toast>Hello world! <button slot="action">Goodbye</button></market-toast>');
        const actionButton = await page.find('market-toast button[slot="action"]');
        expect(actionButton.textContent).toBe('Goodbye');
    });
    it('emits dismiss event', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-toast/>');
        const el = await page.find('market-toast');
        const button = await el.find('pierce/.dismiss-container button');
        const elementDismissSpy = await el.spyOnEvent('marketToastManuallyDismissed');
        await button.click();
        await page.waitForChanges();
        expect(elementDismissSpy).toHaveReceivedEventTimes(1);
    });
    it('renders a progress bar', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-toast progress=50>Hello world!</market-toast>');
        const parent = await page.find('market-toast');
        const progress = await parent.find('pierce/progress-bar');
        expect(progress).not.toBeNull();
        const parentStyle = await parent.getComputedStyle();
        const parentWidth = Number.parseFloat(parentStyle.getPropertyValue('width'));
        const progressStyle = await progress.getComputedStyle();
        const progressWidth = Number.parseFloat(progressStyle.getPropertyValue('width'));
        const widthPercentage = Math.round(100 * (progressWidth / parentWidth));
        expect(widthPercentage).toBe(50);
    });
});
//# sourceMappingURL=market-toast.e2e.js.map
