import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-row', () => {
    let page;
    let el;
    let firstCell;
    let thirdCell;
    let caret;
    let internalSelectionChangeSpy;
    let externalSelectionChangeSpy;
    describe('when rendered with defaults', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-row>
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
        </market-table-v2-row>
      `);
            el = await page.find('market-table-v2-row');
            firstCell = await el.find('market-table-v2-cell');
            caret = await firstCell.find('pierce/button.caret-button');
        });
        it('renders correctly', () => {
            expect(el).not.toBeNull();
            expect(el.getAttribute('role')).toBe('row');
            expect(el).not.toHaveAttribute('caret');
            expect(el).not.toHaveAttribute('indent');
        });
        it('does NOT set caret on the first cell', () => {
            expect(firstCell).not.toHaveAttribute('caret');
        });
        it('does NOT render the caret button', () => {
            expect(caret).toBeNull();
        });
        it('does NOT indent the first cell', () => {
            expect(firstCell).not.toHaveAttribute('indent');
        });
    });
    describe('when rendered with a caret', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-row caret="up">
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
        </market-table-v2-row>
      `);
            el = await page.find('market-table-v2-row');
            firstCell = await el.find('market-table-v2-cell');
            caret = await firstCell.find('pierce/button.caret-button');
        });
        it('sets caret on the first cell', () => {
            expect(firstCell.getAttribute('caret')).toBe('up');
        });
        it('renders the caret button', () => {
            expect(caret).not.toBeNull();
        });
    });
    describe('when rendered with indentation', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-row indent="3">
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
        </market-table-v2-row>
      `);
            el = await page.find('market-table-v2-row');
            firstCell = await el.find('market-table-v2-cell');
        });
        it('indents the first cell', () => {
            expect(firstCell.getAttribute('indent')).toBe('3');
        });
    });
    describe('when rendered not selected', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-row>
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
        </market-table-v2-row>
      `);
            el = await page.find('market-table-v2-row');
            firstCell = await el.find('market-table-v2-cell');
            thirdCell = (await el.findAll('market-table-v2-cell'))[2];
            internalSelectionChangeSpy = await el.spyOnEvent('marketInternalTableV2RowSelectionChange');
            externalSelectionChangeSpy = await el.spyOnEvent('marketTableV2RowSelectionChange');
        });
        it('leaves the first cell unselected', async () => {
            expect(await firstCell.getProperty('selected')).toBe('false');
        });
        describe('when the first cell is selected', () => {
            beforeEach(async () => {
                await firstCell.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('selects the row', async () => {
                expect(await el.getProperty('selected')).toBe('true');
            });
            it('fires the internal change event', () => {
                expect(internalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(internalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'false' });
            });
            it('fires the external change event', () => {
                expect(externalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(externalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'false' });
            });
        });
        describe('when a cell (but NOT the first cell) is selected', () => {
            beforeEach(async () => {
                await thirdCell.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('does NOT select the row', async () => {
                expect(await el.getProperty('selected')).toBe('false');
            });
            it('does NOT fire the internal change event', () => {
                expect(internalSelectionChangeSpy).not.toHaveReceivedEvent();
            });
            it('does NOT fire the external change event', () => {
                expect(externalSelectionChangeSpy).not.toHaveReceivedEvent();
            });
        });
    });
    describe('when rendered selected', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-row selected="true">
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
        </market-table-v2-row>
      `);
            el = await page.find('market-table-v2-row');
            firstCell = await el.find('market-table-v2-cell');
            internalSelectionChangeSpy = await el.spyOnEvent('marketInternalTableV2RowSelectionChange');
            externalSelectionChangeSpy = await el.spyOnEvent('marketTableV2RowSelectionChange');
        });
        it('sets the first cell to selected', async () => {
            expect(await firstCell.getProperty('selected')).toBe('true');
        });
        describe('when the first cell is deselected', () => {
            beforeEach(async () => {
                await firstCell.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('deselects the row', async () => {
                expect(await el.getProperty('selected')).toBe('false');
            });
            it('fires the internal change event', () => {
                expect(internalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(internalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'true' });
            });
            it('fires the external change event', () => {
                expect(externalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(externalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'true' });
            });
        });
    });
    describe('when rendered indeterminate', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-row selected="indeterminate">
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
          <market-table-v2-cell>Cell</market-table-v2-cell>
        </market-table-v2-row>
      `);
            el = await page.find('market-table-v2-row');
            firstCell = await el.find('market-table-v2-cell');
            internalSelectionChangeSpy = await el.spyOnEvent('marketInternalTableV2RowSelectionChange');
            externalSelectionChangeSpy = await el.spyOnEvent('marketTableV2RowSelectionChange');
        });
        it('sets the first cell to indeterminate', async () => {
            expect(await firstCell.getProperty('selected')).toBe('indeterminate');
        });
        describe('when the first cell is selected', () => {
            beforeEach(async () => {
                await firstCell.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('selects the row', async () => {
                expect(await el.getProperty('selected')).toBe('true');
            });
            it('fires the internal change event', () => {
                expect(internalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(internalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'indeterminate' });
            });
            it('fires the external change event', () => {
                expect(externalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(externalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'indeterminate' });
            });
        });
        describe('when the first cell is deselected', () => {
            beforeEach(async () => {
                await firstCell.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('deselects the row', async () => {
                expect(await el.getProperty('selected')).toBe('false');
            });
            it('fires the internal change event', () => {
                expect(internalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(internalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'indeterminate' });
            });
            it('fires the external change event', () => {
                expect(externalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(externalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'indeterminate' });
            });
        });
    });
});
//# sourceMappingURL=market-table-v2-row.e2e.js.map
