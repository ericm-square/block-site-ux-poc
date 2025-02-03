import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-cell: methods', () => {
    let page;
    let el;
    let checkbox;
    let selectionChangeSpy;
    describe('setSelected()', () => {
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
            describe('when setSelected(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false');
                    await page.waitForChanges();
                });
                it('remains unselected', async () => {
                    expect(await el.getProperty('selected')).toBe('false');
                });
                it('renders an unselected control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(false);
                    expect(await checkbox.getProperty('indeterminate')).toBe(false);
                });
                it('does NOT fire the internal change event', () => {
                    expect(selectionChangeSpy).not.toHaveReceivedEvent();
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
                it('renders a selected control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(true);
                    expect(await checkbox.getProperty('indeterminate')).toBe(false);
                });
                it('fires the internal change event', () => {
                    expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'false' });
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
                it('renders an indeterminate control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(false);
                    expect(await checkbox.getProperty('indeterminate')).toBe(true);
                });
                it('fires the internal change event', () => {
                    expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'indeterminate', previous: 'false' });
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
                it('renders a selected control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(true);
                    expect(await checkbox.getProperty('indeterminate')).toBe(false);
                });
                it('does NOT fire the internal change event', () => {
                    expect(selectionChangeSpy).not.toHaveReceivedEvent();
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
            describe('when setSelected(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false');
                    await page.waitForChanges();
                });
                it('becomes unselected', async () => {
                    expect(await el.getProperty('selected')).toBe('false');
                });
                it('renders an unselected control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(false);
                    expect(await checkbox.getProperty('indeterminate')).toBe(false);
                });
                it('fires the internal change event', () => {
                    expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'true' });
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
                it('renders a selected control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(true);
                    expect(await checkbox.getProperty('indeterminate')).toBe(false);
                });
                it('does NOT fire the internal change event', () => {
                    expect(selectionChangeSpy).not.toHaveReceivedEvent();
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
                it('renders an indeterminate control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(false);
                    expect(await checkbox.getProperty('indeterminate')).toBe(true);
                });
                it('fires the internal change event', () => {
                    expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'indeterminate', previous: 'true' });
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
                it('renders an unselected control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(false);
                    expect(await checkbox.getProperty('indeterminate')).toBe(false);
                });
                it('does NOT fire the internal change event', () => {
                    expect(selectionChangeSpy).not.toHaveReceivedEvent();
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
            describe('when setSelected(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false');
                    await page.waitForChanges();
                });
                it('becomes unselected', async () => {
                    expect(await el.getProperty('selected')).toBe('false');
                });
                it('renders an unselected control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(false);
                    expect(await checkbox.getProperty('indeterminate')).toBe(false);
                });
                it('fires the internal change event', () => {
                    expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'indeterminate' });
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
                it('renders a selected control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(true);
                    expect(await checkbox.getProperty('indeterminate')).toBe(false);
                });
                it('fires the internal change event', () => {
                    expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'indeterminate' });
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
                it('renders an indeterminate control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(false);
                    expect(await checkbox.getProperty('indeterminate')).toBe(true);
                });
                it('does NOT fire the internal change event', () => {
                    expect(selectionChangeSpy).not.toHaveReceivedEvent();
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
                it('renders a selected control', async () => {
                    expect(await checkbox.getProperty('checked')).toBe(true);
                    expect(await checkbox.getProperty('indeterminate')).toBe(false);
                });
                it('does NOT fire the internal change event', () => {
                    expect(selectionChangeSpy).not.toHaveReceivedEvent();
                });
            });
        });
    });
});
//# sourceMappingURL=market-table-v2-cell.methods.e2e.js.map
