import { newE2EPage } from "@stencil/core/testing";
export const setupPage = async (content) => {
    const page = await newE2EPage();
    await page.setContent(content);
    const el = await page.find('market-checkbox');
    const spy = await el.spyOnEvent('marketCheckboxValueChange');
    return { page, el, spy };
};
describe('market-checkbox: mouse interactivity', () => {
    let page;
    let el;
    let spy;
    describe('unchecked', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-checkbox></market-checkbox>'));
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
        });
        describe('when clicked and preventDefault is called', () => {
            beforeEach(async () => {
                await page.$eval('market-checkbox', (el) => el.addEventListener('marketCheckboxValueChange', (e) => e.preventDefault()));
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
            ({ page, el, spy } = await setupPage('<market-checkbox checked></market-checkbox>'));
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
                await page.$eval('market-checkbox', (el) => el.addEventListener('marketCheckboxValueChange', (e) => e.preventDefault()));
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
    describe('indeterminate', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-checkbox indeterminate></market-checkbox>'));
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
            it('is NOT indeterminate', async () => {
                await expect(el).not.toBeIndeterminateMarketControl();
            });
            it('fires the change event', () => {
                expect(spy).toHaveReceivedEventTimes(1);
                expect(spy).toHaveReceivedEventDetail({ current: true, previous: false });
            });
        });
    });
    describe('disabled', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-checkbox disabled></market-checkbox>'));
        });
        describe('when clicked', () => {
            beforeEach(async () => {
                await el.click();
                await page.waitForChanges();
            });
            it('does NOT receive focus', async () => {
                expect(await page.find(':focus')).not.toEqual(el);
            });
            it('is checked', async () => {
                await expect(el).not.toBeSelectedMarketControl();
            });
            it('does NOT fire the change event', () => {
                expect(spy).not.toHaveReceivedEvent();
            });
        });
    });
});
//# sourceMappingURL=market-checkbox.mouse.e2e.js.map
