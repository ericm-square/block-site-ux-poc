import { newE2EPage } from "@stencil/core/testing";
describe('market-activity-indicator-bar', () => {
    describe('progress tag', () => {
        it('renders', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).toEqualAttribute('role', 'progressbar');
            expect(marketElement).toEqualAttribute('aria-valuenow', '0');
            expect(marketElement).toEqualAttribute('aria-valuemin', '0');
            expect(marketElement).toEqualAttribute('aria-valuemax', '1');
            expect(marketElement).toEqualAttribute('aria-valuetext', '0%');
            expect(marketElement).not.toBeNull();
            const progressElement = await marketElement.find('pierce/progress');
            expect(progressElement).not.toBeNull();
        });
        it('will default to 0', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).not.toBeNull();
            const progressElement = await marketElement.find('pierce/progress');
            expect(progressElement).toEqualAttribute('value', 0);
        });
        it('will respect value prop percentage', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar value=0.25></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).not.toBeNull();
            const progressElement = await marketElement.find('pierce/progress');
            expect(progressElement).toEqualAttribute('value', 0.25);
        });
        it('will respect value max percentage', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar value=0.25 max=0.50></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).not.toBeNull();
            const progressElement = await marketElement.find('pierce/progress');
            expect(progressElement).toEqualAttribute('value', 0.25);
            expect(progressElement).toEqualAttribute('max', 0.5);
        });
        it('will bound to min of 0', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar value=-200></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).not.toBeNull();
            const progressElement = await marketElement.find('pierce/progress');
            expect(progressElement).toEqualAttribute('value', 0);
        });
        it('will bound to max of 1', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar value=200></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).not.toBeNull();
            const progressElement = await marketElement.find('pierce/progress');
            expect(progressElement).toEqualAttribute('value', 1);
        });
    });
    describe('html fallback', () => {
        it('renders', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).not.toBeNull();
            expect(marketElement).toEqualAttribute('role', 'progressbar');
            expect(marketElement).toEqualAttribute('aria-valuenow', '0');
            expect(marketElement).toEqualAttribute('aria-valuemin', '0');
            expect(marketElement).toEqualAttribute('aria-valuemax', '1');
            expect(marketElement).toEqualAttribute('aria-valuetext', '0%');
            const progressElement = await marketElement.find('pierce/.progress-bar');
            expect(progressElement).not.toBeNull();
        });
        it('will default to 0', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).not.toBeNull();
            const progressElement = await marketElement.find('pierce/.progress-bar>span');
            const styles = await progressElement.getComputedStyle();
            const width = styles.getPropertyValue('width');
            expect(width).toBe('0%');
        });
        it('will respect value prop percentage', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar value=0.25></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).not.toBeNull();
            const progressElement = await marketElement.find('pierce/.progress-bar>span');
            const styles = await progressElement.getComputedStyle();
            const width = styles.getPropertyValue('width');
            expect(width).toBe('25%');
        });
        it('will respect max prop percentage', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar value=0.25 max=0.50></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).not.toBeNull();
            const progressElement = await marketElement.find('pierce/.progress-bar>span');
            const styles = await progressElement.getComputedStyle();
            const width = styles.getPropertyValue('width');
            expect(width).toBe('50%');
        });
        it('will bound to min of 0', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar value=-200></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).not.toBeNull();
            const progressElement = await marketElement.find('pierce/.progress-bar>span');
            const styles = await progressElement.getComputedStyle();
            const width = styles.getPropertyValue('width');
            expect(width).toBe('0%');
        });
        it('will bound to max of 1', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-activity-indicator-bar value=200></market-activity-indicator-bar>');
            const marketElement = await page.find('market-activity-indicator-bar');
            expect(marketElement).not.toBeNull();
            const progressElement = await marketElement.find('pierce/.progress-bar>span');
            const styles = await progressElement.getComputedStyle();
            const width = styles.getPropertyValue('width');
            expect(width).toBe('100%');
        });
    });
});
//# sourceMappingURL=market-activity-indicator-bar.e2e.js.map
