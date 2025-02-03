import { newE2EPage } from "@stencil/core/testing";
export const setupPage = async (content) => {
    const page = await newE2EPage();
    await page.setContent(content);
    const el = await page.find('market-radio');
    const spy = await el.spyOnEvent('marketRadioValueChange');
    return { page, el, spy };
};
describe('market-radio: keyboard interactivity', () => {
    let page;
    let el;
    let spy;
    describe('unselected', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-radio></market-radio>'));
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
                it('is selected', async () => {
                    await expect(el).toBeSelectedMarketControl();
                });
                it('fires the change event', () => {
                    expect(spy).toHaveReceivedEventTimes(1);
                    expect(spy).toHaveReceivedEventDetail({ current: true, previous: false });
                });
            });
            describe('when spacebar is pressed and preventDefault is called', () => {
                beforeEach(async () => {
                    await page.$eval('market-radio', (el) => el.addEventListener('marketRadioValueChange', (e) => e.preventDefault()));
                    await page.keyboard.press(' ');
                    await page.waitForChanges();
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
    });
    describe('selected', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-radio selected></market-radio>'));
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
                it('is STILL selected', async () => {
                    await expect(el).toBeSelectedMarketControl();
                });
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
        });
    });
    describe('disabled', () => {
        beforeEach(async () => {
            ({ page, el, spy } = await setupPage('<market-radio disabled></market-radio>'));
        });
        it('can NOT be tabbed into', async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(el);
        });
    });
});
//# sourceMappingURL=market-radio.keyboard.e2e.js.map
