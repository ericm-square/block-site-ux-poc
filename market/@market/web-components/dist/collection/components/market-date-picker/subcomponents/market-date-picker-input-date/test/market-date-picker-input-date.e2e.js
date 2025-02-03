import { newE2EPage } from "@stencil/core/testing";
describe('market-date-picker-input-date', () => {
    it('renders without range', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-date-picker-input-date></market-date-picker-input-date>');
        const element = await page.find('market-date-picker-input-date');
        expect(element).not.toHaveAttribute('invalid');
    });
    it('renders with range', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-date-picker-input-date range="true" ></market-date-picker-input-date>');
        const elements = await page.findAll('pierce/market-input-text');
        for (const element of elements) {
            expect(element).not.toHaveAttribute('invalid');
        }
        expect(elements.length).toEqual(2);
    });
    it('renders with Date and Time', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-date-picker-input-date with-time ></market-date-picker-input-date>');
        const elements = await page.findAll('pierce/market-input-text');
        expect(elements[0]).toEqualAttribute('type', 'date');
        expect(elements[1]).toEqualAttribute('type', 'time');
    });
    it('handles timeframe validation', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-date-picker-input-date
        timeframe="future"
        selected-start-date="2020-01-01"
      ></market-date-picker-input-date>
    `);
        const el = await page.find('market-date-picker-input-date');
        const input = await el.find('pierce/market-input-text');
        expect(input).toHaveAttribute('invalid');
        await page.$eval('market-date-picker-input-date', (el) => {
            el.timeframe = 'past';
            el.selectedStartDate = '2030-01-01';
        });
        await page.waitForChanges();
        expect(input).toHaveAttribute('invalid');
        await page.$eval('market-date-picker-input-date', (el) => {
            el.timeframe = 'present';
            el.selectedStartDate = '2023-01-01';
        });
        await page.waitForChanges();
        expect(input).not.toHaveAttribute('invalid');
    });
    it('handles isDateDisabled validation', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-date-picker-input-date
        selected-start-date="2020-01-01"
      ></market-date-picker-input-date>
    `);
        const el = await page.find('market-date-picker-input-date');
        const input = await el.find('pierce/market-input-text');
        expect(input).not.toHaveAttribute('invalid');
        await page.$eval('market-date-picker-input-date', (el) => {
            el.isDateDisabled = () => true;
        });
        await page.waitForChanges();
        expect(input).toHaveAttribute('invalid');
    });
    it('handles validation for invalid date ranges', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-date-picker-input-date
        range="true"
        selected-start-date="2020-01-02"
        selected-end-date="2020-01-01"
      ></market-date-picker-input-date>
    `);
        const elements = await page.findAll('pierce/market-input-text');
        const banner = await page.find('pierce/market-banner');
        for (const element of elements) {
            expect(element).toHaveAttribute('invalid');
        }
        expect(banner).toEqualAttribute('variant', 'critical');
    });
});
//# sourceMappingURL=market-date-picker-input-date.e2e.js.map
