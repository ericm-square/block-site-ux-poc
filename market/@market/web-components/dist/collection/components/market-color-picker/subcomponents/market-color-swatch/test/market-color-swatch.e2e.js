import { newE2EPage } from "@stencil/core/testing";
describe('market-color-swatch', () => {
    let page;
    let element;
    let swatchChangeEvent;
    const SWATCH_COLOR = 'red';
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-color-swatch value=${SWATCH_COLOR}>
      </market-color-swatch>
    `);
        element = await page.find('market-color-swatch');
        swatchChangeEvent = await page.spyOnEvent('marketColorSwatchSelectedChange');
    });
    it('renders', () => {
        expect(element).toHaveAttribute('hydrated');
    });
    it('contains the right color style when passed in', async () => {
        expect(await element.getProperty('value')).toEqual(SWATCH_COLOR);
        const elementStyles = await element.getComputedStyle();
        // SWATCH_COLOR = "red"'s computed value
        expect(elementStyles.backgroundColor).toEqual('rgb(255, 0, 0)');
    });
    it('fires marketColorSwatchSelectedChange event on click', async () => {
        await element.click();
        await page.waitForChanges();
        expect(swatchChangeEvent).toHaveReceivedEventTimes(1);
        expect(swatchChangeEvent.lastEvent.detail.value).toEqual(SWATCH_COLOR);
        expect(swatchChangeEvent.lastEvent.detail.selected).toEqual(true);
        await element.click();
        await page.waitForChanges();
        expect(swatchChangeEvent).toHaveReceivedEventTimes(2);
        expect(swatchChangeEvent.lastEvent.detail.value).toEqual(SWATCH_COLOR);
        expect(swatchChangeEvent.lastEvent.detail.selected).toEqual(false);
    });
    it('does not fire click event on a disabled swatch', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-color-swatch value=${SWATCH_COLOR} disabled>
      </market-color-swatch>
    `);
        element = await page.find('market-color-swatch');
        swatchChangeEvent = await page.spyOnEvent('marketColorSwatchSelectedChange');
        await element.click();
        await page.waitForChanges();
        expect(swatchChangeEvent).not.toHaveReceivedEventTimes(1);
    });
});
//# sourceMappingURL=market-color-swatch.e2e.js.map
