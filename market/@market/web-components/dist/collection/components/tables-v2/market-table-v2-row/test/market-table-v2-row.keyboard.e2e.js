import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-row: keyboard functionality', () => {
    let page;
    let el;
    let click;
    describe('when interactive', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-row interactive>
          <market-table-v2-cell>Cell</market-table-v2-cell>
        </market-table-v2-row>
      `);
            el = await page.find('market-table-v2-row');
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
        <market-table-v2-row interactive disabled>
          <market-table-v2-cell>Cell</market-table-v2-cell>
        </market-table-v2-row>
      `);
            el = await page.find('market-table-v2-row');
        });
        it('can NOT be tabbed into', async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(el);
        });
    });
    describe('when interactive with interactive cells', () => {
        let rows;
        let cells;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-row interactive>
          <market-table-v2-cell interactive>Cell</market-table-v2-cell>
          <market-table-v2-cell interactive>Cell</market-table-v2-cell>
          <market-table-v2-cell interactive>Cell</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row interactive>
          <market-table-v2-cell interactive>Cell</market-table-v2-cell>
          <market-table-v2-cell interactive>Cell</market-table-v2-cell>
          <market-table-v2-cell interactive>Cell</market-table-v2-cell>
        </market-table-v2-row>
      `);
            rows = await page.findAll('market-table-v2-row');
            cells = await page.findAll('market-table-v2-cell');
        });
        it('has a functional tab order', async () => {
            // nothing focused
            expect(await page.find(':focus')).toEqual(null);
            // focus 1st row
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(rows[0]);
            // focus 1st row, 1st cell
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(cells[0]);
            // focus 1st row, 2nd cell
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(cells[1]);
            // focus 1st row, 3rd cell
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(cells[2]);
            // focus 2nd row
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(rows[1]);
            // focus 2nd row, 1st cell
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(cells[3]);
            // focus 2nd row, 2nd cell
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(cells[4]);
            // focus 2nd row, 3rd cell
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(cells[5]);
        });
    });
});
//# sourceMappingURL=market-table-v2-row.keyboard.e2e.js.map
