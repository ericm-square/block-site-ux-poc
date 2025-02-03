import { newE2EPage } from "@stencil/core/testing";
export const setupPage = async (content) => {
    const page = await newE2EPage();
    await page.setContent(content);
    const el = await page.find('market-toggle');
    const spy = await el.spyOnEvent('marketToggleChange');
    return { page, el, spy };
};
describe('market-toggle: keyboard interactivity', () => {
    let page;
    let el;
    let spy;
    describe('unselected', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-toggle></market-toggle>'));
        });
        it('can be tabbed into', async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(el);
        });
        describe('when focused', () => {
            beforeEach(async () => {
                await page.keyboard.press('Tab');
                await page.waitForChanges();
            });
            it('can be tabbed out of', async () => {
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).not.toEqual(el);
            });
            describe('when spacebar is pressed', () => {
                beforeEach(async () => {
                    await page.keyboard.press(' ');
                    await page.waitForChanges();
                });
                it('is checked', async () => {
                    await expect(el).toBeSelectedMarketControl();
                });
                it('fires the change event', () => {
                    expect(spy).toHaveReceivedEventTimes(1);
                    expect(spy).toHaveReceivedEventDetail({ current: true, previous: false });
                });
            });
            describe('when spacebar is pressed and preventDefault is called', () => {
                beforeEach(async () => {
                    await page.$eval('market-toggle', (el) => el.addEventListener('marketToggleChange', (e) => e.preventDefault()));
                    await page.keyboard.press(' ');
                    await page.waitForChanges();
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
    });
    describe('checked', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-toggle checked></market-toggle>'));
        });
        it('can be tabbed into', async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(el);
        });
        describe('when focused', () => {
            beforeEach(async () => {
                await page.keyboard.press('Tab');
                await page.waitForChanges();
            });
            it('can be tabbed out of', async () => {
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).not.toEqual(el);
            });
            describe('when spacebar is pressed', () => {
                beforeEach(async () => {
                    await page.keyboard.press(' ');
                    await page.waitForChanges();
                });
                it('is NOT checked', async () => {
                    await expect(el).not.toBeSelectedMarketControl();
                });
                it('fires the change event', () => {
                    expect(spy).toHaveReceivedEventTimes(1);
                    expect(spy).toHaveReceivedEventDetail({ current: false, previous: true });
                });
            });
            describe('when spacebar is pressed and preventDefault is called', () => {
                beforeEach(async () => {
                    await page.$eval('market-toggle', (el) => el.addEventListener('marketToggleChange', (e) => e.preventDefault()));
                    await page.keyboard.press(' ');
                    await page.waitForChanges();
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
    });
    describe('disabled', () => {
        beforeEach(async () => {
            ({ page, el } = await setupPage('<market-toggle disabled></market-toggle>'));
        });
        it('can NOT be tabbed into', async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(el);
        });
    });
});
//# sourceMappingURL=market-toggle.keyboard.e2e.js.map
