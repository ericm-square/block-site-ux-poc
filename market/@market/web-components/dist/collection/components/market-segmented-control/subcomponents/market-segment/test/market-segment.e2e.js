import { newE2EPage } from "@stencil/core/testing";
describe('market-segment', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-segment value="1">One</market-segment>');
        const element = await page.find('market-segment');
        expect(element).toHaveAttribute('hydrated');
    });
    it('fires select event on click', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-segment value="1">One</market-segment>');
        const element = await page.find('market-segment');
        const marketSegmentSelectedChanged = await page.spyOnEvent('marketSegmentSelectedChanged');
        await element.click();
        expect(marketSegmentSelectedChanged).toHaveReceivedEventTimes(1);
    });
});
//# sourceMappingURL=market-segment.e2e.js.map
