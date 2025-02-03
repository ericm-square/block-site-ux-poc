import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-cell: toggle control', () => {
    let page;
    let el;
    let toggle;
    let selectionChangeSpy;
    describe('when rendered not selected', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-cell>
          <market-toggle slot="control"></market-toggle>
          Cell
        </market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            toggle = await el.find('market-toggle');
            selectionChangeSpy = await el.spyOnEvent('marketInternalTableV2CellSelectionChange');
        });
        it('renders an unchecked toggle', async () => {
            expect(toggle).not.toBeNull();
            expect(await toggle.getProperty('checked')).toBe(false);
        });
        describe('when the toggle is clicked', () => {
            beforeEach(async () => {
                await toggle.click();
                await page.waitForChanges();
            });
            it('sets the cell selection to true', async () => {
                expect(await el.getProperty('selected')).toBe('true');
            });
            it('renders a checked toggle', async () => {
                expect(await toggle.getProperty('checked')).toBe(true);
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'false' });
            });
        });
    });
    describe('when rendered with selected = true', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-cell selected="true">
          <market-toggle slot="control"></market-toggle>
          Cell
        </market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            toggle = await el.find('market-toggle');
            selectionChangeSpy = await el.spyOnEvent('marketInternalTableV2CellSelectionChange');
        });
        it('renders a checked toggle', async () => {
            expect(toggle).not.toBeNull();
            expect(await toggle.getProperty('checked')).toBe(true);
        });
        describe('when the toggle is clicked', () => {
            beforeEach(async () => {
                await toggle.click();
                await page.waitForChanges();
            });
            it('sets the cell selection to false', async () => {
                expect(await el.getProperty('selected')).toBe('false');
            });
            it('renders an unchecked toggle', async () => {
                expect(await toggle.getProperty('checked')).toBe(false);
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'true' });
            });
        });
    });
    describe('when rendered with selected = indeterminate', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-cell selected="indeterminate">
          <market-toggle slot="control"></market-toggle>
          Cell
        </market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            toggle = await el.find('market-toggle');
            selectionChangeSpy = await el.spyOnEvent('marketInternalTableV2CellSelectionChange');
        });
        it('renders an unchecked toggle', async () => {
            expect(toggle).not.toBeNull();
            expect(await toggle.getProperty('checked')).toBe(false);
        });
        describe('when the toggle is clicked', () => {
            beforeEach(async () => {
                await toggle.click();
                await page.waitForChanges();
            });
            it('sets the cell selection to true', async () => {
                expect(await el.getProperty('selected')).toBe('true');
            });
            it('renders a checked toggle', async () => {
                expect(await toggle.getProperty('checked')).toBe(true);
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'indeterminate' });
            });
        });
    });
    describe('when a nested control toggle is clicked', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-cell>
          <market-row><market-toggle slot="control"></market-toggle></market-row>
        </market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            toggle = await el.find('market-toggle');
            selectionChangeSpy = await el.spyOnEvent('marketInternalTableV2CellSelectionChange');
            await toggle.click();
            await page.waitForChanges();
        });
        it('does NOT set the cell selection to true', async () => {
            expect(await el.getProperty('selected')).toBe('false');
        });
        it('does NOT fire the internal change event', () => {
            expect(selectionChangeSpy).not.toHaveReceivedEvent();
        });
    });
});
//# sourceMappingURL=market-table-v2-cell.toggle.e2e.js.map
