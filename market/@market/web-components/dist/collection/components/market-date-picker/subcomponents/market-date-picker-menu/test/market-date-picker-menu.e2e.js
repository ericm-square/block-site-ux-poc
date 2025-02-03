import { newE2EPage } from "@stencil/core/testing";
describe('market-date-picker-date', () => {
    it('default renders with default properties', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-date-picker-menu></market-date-picker-menu>');
        const element = await page.find('market-date-picker-menu');
        expect(element).toHaveAttribute('hydrated');
        expect(await element.getProperty('timeframe')).toEqual('present');
        const list = await element.find('pierce/market-list');
        expect(await list.isVisible()).toBe(true);
    });
    it('can change timeframe', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-date-picker-menu timeframe="future"></market-date-picker-menu>');
        const element = await page.find('market-date-picker-menu');
        expect(element).toEqualAttribute('timeframe', 'future');
    });
});
//# sourceMappingURL=market-date-picker-menu.e2e.js.map
