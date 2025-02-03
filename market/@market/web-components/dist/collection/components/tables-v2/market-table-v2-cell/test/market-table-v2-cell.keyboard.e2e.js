import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-cell: keyboard functionality', () => {
    let page;
    let el;
    let click;
    describe('when interactive', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-cell interactive>Cell</market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            click = await el.spyOnEvent('click');
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
                it('fires the click event', () => {
                    expect(click).toHaveReceivedEventTimes(1);
                });
            });
            describe('when enter is pressed', () => {
                beforeEach(async () => {
                    await page.keyboard.press('Enter');
                    await page.waitForChanges();
                });
                it('fires the click event', () => {
                    expect(click).toHaveReceivedEventTimes(1);
                });
            });
        });
    });
    describe('when interactive but disabled', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-cell interactive disabled>Cell</market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
        });
        it('can NOT be tabbed into', async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(el);
        });
    });
});
//# sourceMappingURL=market-table-v2-cell.keyboard.e2e.js.map
