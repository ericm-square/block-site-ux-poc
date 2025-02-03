import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-cell: checkbox control', () => {
    let page;
    let el;
    let checkbox;
    let selectionChangeSpy;
    describe('when rendered not selected', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-cell>
          <market-checkbox slot="control"></market-checkbox>
          Cell
        </market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            checkbox = await el.find('market-checkbox');
            selectionChangeSpy = await el.spyOnEvent('marketInternalTableV2CellSelectionChange');
        });
        it('renders an unchecked checkbox', async () => {
            expect(checkbox).not.toBeNull();
            expect(await checkbox.getProperty('checked')).toBe(false);
            expect(await checkbox.getProperty('indeterminate')).toBe(false);
        });
        describe('when the checkbox is clicked', () => {
            beforeEach(async () => {
                await checkbox.click();
                await page.waitForChanges();
            });
            it('sets the cell selection to true', async () => {
                expect(await el.getProperty('selected')).toBe('true');
            });
            it('renders a checked checkbox', async () => {
                expect(await checkbox.getProperty('checked')).toBe(true);
                expect(await checkbox.getProperty('indeterminate')).toBe(false);
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
          <market-checkbox slot="control"></market-checkbox>
          Cell
        </market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            checkbox = await el.find('market-checkbox');
            selectionChangeSpy = await el.spyOnEvent('marketInternalTableV2CellSelectionChange');
        });
        it('renders a checked checkbox', async () => {
            expect(checkbox).not.toBeNull();
            expect(await checkbox.getProperty('checked')).toBe(true);
            expect(await checkbox.getProperty('indeterminate')).toBe(false);
        });
        describe('when the checkbox is clicked', () => {
            beforeEach(async () => {
                await checkbox.click();
                await page.waitForChanges();
            });
            it('sets the cell selection to false', async () => {
                expect(await el.getProperty('selected')).toBe('false');
            });
            it('renders an unchecked checkbox', async () => {
                expect(await checkbox.getProperty('checked')).toBe(false);
                expect(await checkbox.getProperty('indeterminate')).toBe(false);
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
          <market-checkbox slot="control"></market-checkbox>
          Cell
        </market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            checkbox = await el.find('market-checkbox');
            selectionChangeSpy = await el.spyOnEvent('marketInternalTableV2CellSelectionChange');
        });
        it('renders an indeterminate checkbox', async () => {
            expect(checkbox).not.toBeNull();
            expect(await checkbox.getProperty('checked')).toBe(false);
            expect(await checkbox.getProperty('indeterminate')).toBe(true);
        });
        describe('when the checkbox is clicked', () => {
            beforeEach(async () => {
                await checkbox.click();
                await page.waitForChanges();
            });
            it('sets the cell selection to true', async () => {
                expect(await el.getProperty('selected')).toBe('true');
            });
            it('renders a checked checkbox', async () => {
                expect(await checkbox.getProperty('checked')).toBe(true);
                expect(await checkbox.getProperty('indeterminate')).toBe(false);
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'indeterminate' });
            });
        });
    });
    describe('when a nested control checkbox is clicked', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-cell>
          <market-row><market-checkbox slot="control"></market-checkbox></market-row>
        </market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            checkbox = await el.find('market-checkbox');
            selectionChangeSpy = await el.spyOnEvent('marketInternalTableV2CellSelectionChange');
            await checkbox.click();
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
//# sourceMappingURL=market-table-v2-cell.checkbox.e2e.js.map
