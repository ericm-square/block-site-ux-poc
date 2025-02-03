import { newE2EPage } from "@stencil/core/testing";
export const setupPage = async (content) => {
    const page = await newE2EPage();
    await page.setContent(content);
    const el = await page.find('market-toggle');
    const spy = await el.spyOnEvent('marketToggleChange');
    return { page, el, spy };
};
describe('market-toggle: mouse interactivity', () => {
    let page;
    let el;
    let spy;
    describe('unchecked', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-toggle></market-toggle>'));
        });
        describe('when clicked', () => {
            beforeEach(async () => {
                await el.click();
                await page.waitForChanges();
            });
            it('receives focus', async () => {
                expect(await page.find(':focus')).toEqual(el);
            });
            it('is checked', async () => {
                await expect(el).toBeSelectedMarketControl();
            });
            it('fires the change event', () => {
                expect(spy).toHaveReceivedEventTimes(1);
                expect(spy).toHaveReceivedEventDetail({ current: true, previous: false });
            });
            it('removes focus attribute when setting disabled', async () => {
                await el.setProperty('disabled', true);
                await page.waitForChanges();
                expect(el).not.toHaveAttribute('focused');
            });
        });
        describe('when clicked and preventDefault is called', () => {
            beforeEach(async () => {
                await page.$eval('market-toggle', (el) => el.addEventListener('marketToggleChange', (e) => e.preventDefault()));
                await el.click();
                await page.waitForChanges();
            });
            it('receives focus', async () => {
                expect(await page.find(':focus')).toEqual(el);
            });
            it('is NOT checked', async () => {
                await expect(el).not.toBeSelectedMarketControl();
            });
            it('fires the change event', () => {
                expect(spy).toHaveReceivedEventTimes(1);
                expect(spy).toHaveReceivedEventDetail({ current: true, previous: false });
            });
        });
    });
    describe('checked', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-toggle checked></market-toggle>'));
        });
        describe('when clicked', () => {
            beforeEach(async () => {
                await el.click();
                await page.waitForChanges();
            });
            it('receives focus', async () => {
                expect(await page.find(':focus')).toEqual(el);
            });
            it('is NOT checked', async () => {
                await expect(el).not.toBeSelectedMarketControl();
            });
            it('fires the change event', () => {
                expect(spy).toHaveReceivedEventTimes(1);
                expect(spy).toHaveReceivedEventDetail({ current: false, previous: true });
            });
        });
        describe('when clicked and preventDefault is called', () => {
            beforeEach(async () => {
                await page.$eval('market-toggle', (el) => el.addEventListener('marketToggleChange', (e) => e.preventDefault()));
                await el.click();
                await page.waitForChanges();
            });
            it('receives focus', async () => {
                expect(await page.find(':focus')).toEqual(el);
            });
            it('is STILL checked', async () => {
                await expect(el).toBeSelectedMarketControl();
            });
            it('fires the change event', () => {
                expect(spy).toHaveReceivedEventTimes(1);
                expect(spy).toHaveReceivedEventDetail({ current: false, previous: true });
            });
        });
    });
    describe('disabled', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-toggle disabled></market-toggle>'));
        });
        describe('when clicked', () => {
            beforeEach(async () => {
                await el.click();
                await page.waitForChanges();
            });
            it('does NOT receive focus', async () => {
                expect(await page.find(':focus')).not.toEqual(el);
            });
            it('is NOT checked', async () => {
                await expect(el).not.toBeSelectedMarketControl();
            });
            it('does NOT fire the change event', () => {
                expect(spy).not.toHaveReceivedEvent();
            });
        });
    });
});
//# sourceMappingURL=market-toggle.mouse.e2e.js.map
