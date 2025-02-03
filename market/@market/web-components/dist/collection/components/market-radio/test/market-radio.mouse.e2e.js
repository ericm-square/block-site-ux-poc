import { newE2EPage } from "@stencil/core/testing";
export const setupPage = async (content) => {
    const page = await newE2EPage();
    await page.setContent(content);
    const el = await page.find('market-radio');
    const spy = await el.spyOnEvent('marketRadioValueChange');
    return { page, el, spy };
};
describe('market-radio: mouse interactivity', () => {
    let page;
    let el;
    let spy;
    describe('unselected', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-radio></market-radio>'));
        });
        describe('when clicked', () => {
            beforeEach(async () => {
                await el.click();
                await page.waitForChanges();
            });
            it('receives focus', async () => {
                expect(await page.find(':focus')).toEqual(el);
            });
            it('is selected', async () => {
                await expect(el).toBeSelectedMarketControl();
            });
            it('fires the change event', () => {
                expect(spy).toHaveReceivedEventTimes(1);
                expect(spy).toHaveReceivedEventDetail({ current: true, previous: false });
            });
        });
        describe('when clicked and preventDefault is called', () => {
            beforeEach(async () => {
                await page.$eval('market-radio', (el) => el.addEventListener('marketRadioValueChange', (e) => e.preventDefault()));
                await el.click();
                await page.waitForChanges();
            });
            it('receives focus', async () => {
                expect(await page.find(':focus')).toEqual(el);
            });
            it('is NOT selected', async () => {
                await expect(el).not.toBeSelectedMarketControl();
            });
            it('fires the change event', () => {
                expect(spy).toHaveReceivedEventTimes(1);
                expect(spy).toHaveReceivedEventDetail({ current: true, previous: false });
            });
        });
    });
    describe('selected', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-radio selected></market-radio>'));
        });
        describe('when clicked', () => {
            beforeEach(async () => {
                await el.click();
                await page.waitForChanges();
            });
            it('receives focus', async () => {
                expect(await page.find(':focus')).toEqual(el);
            });
            it('is STILL selected', async () => {
                await expect(el).toBeSelectedMarketControl();
            });
            it('does NOT fire the change event', () => {
                expect(spy).not.toHaveReceivedEvent();
            });
        });
    });
    describe('disabled', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-radio disabled></market-radio>'));
        });
        describe('when clicked', () => {
            beforeEach(async () => {
                await el.click();
                await page.waitForChanges();
            });
            it('does NOT receive focus', async () => {
                expect(await page.find(':focus')).not.toEqual(el);
            });
            it('is NOT selected', async () => {
                await expect(el).not.toBeSelectedMarketControl();
            });
            it('does NOT fire the change event', () => {
                expect(spy).not.toHaveReceivedEvent();
            });
        });
    });
});
//# sourceMappingURL=market-radio.mouse.e2e.js.map
