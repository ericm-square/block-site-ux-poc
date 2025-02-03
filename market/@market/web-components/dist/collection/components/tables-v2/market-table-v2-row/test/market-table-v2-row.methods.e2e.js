import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-row: methods', () => {
    let page;
    let el;
    let firstCell;
    let internalSelectionChangeSpy;
    let externalSelectionChangeSpy;
    describe('setSelected()', () => {
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
                internalSelectionChangeSpy = await el.spyOnEvent('marketInternalTableV2RowSelectionChange');
                externalSelectionChangeSpy = await el.spyOnEvent('marketTableV2RowSelectionChange');
            });
            describe('when setSelected(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false');
                    await page.waitForChanges();
                });
                it('remains unselected', async () => {
                    expect(await el.getProperty('selected')).toBe('false');
                });
                it('leaves the first cell unselected', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('false');
                });
                it('does NOT fire the internal change event', () => {
                    expect(internalSelectionChangeSpy).not.toHaveReceivedEvent();
                });
                it('does NOT fire the external change event', () => {
                    expect(externalSelectionChangeSpy).not.toHaveReceivedEvent();
                });
            });
            describe('when setSelected(true) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'true');
                    await page.waitForChanges();
                });
                it('becomes selected', async () => {
                    expect(await el.getProperty('selected')).toBe('true');
                });
                it('selects the first cell', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('true');
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
            describe('when setSelected(indeterminate) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'indeterminate');
                    await page.waitForChanges();
                });
                it('becomes indeterminate', async () => {
                    expect(await el.getProperty('selected')).toBe('indeterminate');
                });
                it('sets the first cell to indeterminate', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('indeterminate');
                });
                it('fires the internal change event', () => {
                    expect(internalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(internalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'indeterminate', previous: 'false' });
                });
                it('fires the external change event', () => {
                    expect(externalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(externalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'indeterminate', previous: 'false' });
                });
            });
            describe('when setSelected(true) is called silently', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'true', { silent: true });
                    await page.waitForChanges();
                });
                it('becomes selected', async () => {
                    expect(await el.getProperty('selected')).toBe('true');
                });
                it('selects the first cell', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('true');
                });
                it('does NOT fire the internal change event', () => {
                    expect(internalSelectionChangeSpy).not.toHaveReceivedEvent();
                });
                it('STILL fires the external change event', () => {
                    expect(externalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(externalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'false' });
                });
            });
        });
        describe('when rendered with selected = true', () => {
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
            describe('when setSelected(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false');
                    await page.waitForChanges();
                });
                it('becomes unselected', async () => {
                    expect(await el.getProperty('selected')).toBe('false');
                });
                it('deselects the first cell', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('false');
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
            describe('when setSelected(true) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'true');
                    await page.waitForChanges();
                });
                it('remains selected', async () => {
                    expect(await el.getProperty('selected')).toBe('true');
                });
                it('leaves the first cell selected', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('true');
                });
                it('does NOT fire the internal change event', () => {
                    expect(internalSelectionChangeSpy).not.toHaveReceivedEvent();
                });
                it('does NOT fire the external change event', () => {
                    expect(externalSelectionChangeSpy).not.toHaveReceivedEvent();
                });
            });
            describe('when setSelected(indeterminate) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'indeterminate');
                    await page.waitForChanges();
                });
                it('becomes indeterminate', async () => {
                    expect(await el.getProperty('selected')).toBe('indeterminate');
                });
                it('sets the first cell to indeterminate control', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('indeterminate');
                });
                it('fires the internal change event', () => {
                    expect(internalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(internalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'indeterminate', previous: 'true' });
                });
                it('fires the external change event', () => {
                    expect(externalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(externalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'indeterminate', previous: 'true' });
                });
            });
            describe('when setSelected(false) is called silently', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false', { silent: true });
                    await page.waitForChanges();
                });
                it('becomes unselected', async () => {
                    expect(await el.getProperty('selected')).toBe('false');
                });
                it('deselects the first cell', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('false');
                });
                it('does NOT fire the internal change event', () => {
                    expect(internalSelectionChangeSpy).not.toHaveReceivedEvent();
                });
                it('STILL fires the external change event', () => {
                    expect(externalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(externalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'true' });
                });
            });
        });
        describe('when rendered with selected = indeterminate', () => {
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
            describe('when setSelected(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false');
                    await page.waitForChanges();
                });
                it('becomes unselected', async () => {
                    expect(await el.getProperty('selected')).toBe('false');
                });
                it('deselects the first cell', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('false');
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
            describe('when setSelected(true) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'true');
                    await page.waitForChanges();
                });
                it('becomes selected', async () => {
                    expect(await el.getProperty('selected')).toBe('true');
                });
                it('selects the first cell', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('true');
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
            describe('when setSelected(indeterminate) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'indeterminate');
                    await page.waitForChanges();
                });
                it('remains indeterminate', async () => {
                    expect(await el.getProperty('selected')).toBe('indeterminate');
                });
                it('leaves the first cell indeterminate', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('indeterminate');
                });
                it('does NOT fire the internal change event', () => {
                    expect(internalSelectionChangeSpy).not.toHaveReceivedEvent();
                });
                it('does NOT fire the external change event', () => {
                    expect(externalSelectionChangeSpy).not.toHaveReceivedEvent();
                });
            });
            describe('when setSelected(true) is called silently', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'true', { silent: true });
                    await page.waitForChanges();
                });
                it('becomes selected', async () => {
                    expect(await el.getProperty('selected')).toBe('true');
                });
                it('selects the first cell', async () => {
                    expect(await firstCell.getProperty('selected')).toBe('true');
                });
                it('does NOT fire the internal change event', () => {
                    expect(internalSelectionChangeSpy).not.toHaveReceivedEvent();
                });
                it('STILL fires the external change event', () => {
                    expect(externalSelectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(externalSelectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'indeterminate' });
                });
            });
        });
    });
});
//# sourceMappingURL=market-table-v2-row.methods.e2e.js.map
