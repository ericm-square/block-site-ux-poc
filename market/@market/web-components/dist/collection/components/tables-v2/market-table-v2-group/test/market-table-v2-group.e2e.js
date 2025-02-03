import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-group', () => {
    let page;
    let el;
    let parentRow;
    let parentCaret;
    let childRow;
    let childGroup;
    let selectionChangeSpy;
    let collapsedChangeSpy;
    describe('when rendered with defaults', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-group>
          <market-table-v2-row slot="parent">
            <market-table-v2-cell>Cell</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-row>
            <market-table-v2-cell>Cell</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-group>
            <market-table-v2-row slot="parent">
              <market-table-v2-cell>Cell</market-table-v2-cell>
            </market-table-v2-row>
            <market-table-v2-row>
              <market-table-v2-cell>Cell</market-table-v2-cell>
            </market-table-v2-row>
          </market-table-v2-group>
        </market-table-v2-group>
      `);
            el = await page.find('market-table-v2-group');
            parentRow = await page.find('market-table-v2-group > market-table-v2-row[slot="parent"]');
            childRow = await page.find('market-table-v2-group > market-table-v2-row:not([slot="parent"])');
            childGroup = await page.find('market-table-v2-group > market-table-v2-group');
        });
        it('renders correctly', () => {
            expect(el).not.toBeNull();
            expect(el.getAttribute('indent')).toBe('0');
        });
        it('does not display a caret', () => {
            expect(parentRow).not.toHaveAttribute('caret');
        });
        it('indents correctly', () => {
            expect(el).not.toBeNull();
            expect(parentRow.getAttribute('indent')).toBe('0');
            expect(childRow.getAttribute('indent')).toBe('1');
            expect(childGroup.getAttribute('indent')).toBe('1');
        });
        describe('when indentation changes', () => {
            beforeEach(async () => {
                el.setProperty('indent', 10);
                await page.waitForChanges();
            });
            it('propagates the indentation correctly', () => {
                expect(parentRow.getAttribute('indent')).toBe('10');
                expect(childRow.getAttribute('indent')).toBe('11');
                expect(childGroup.getAttribute('indent')).toBe('11');
            });
        });
        describe('when collapsible', () => {
            beforeEach(async () => {
                el.setProperty('collapsible', true);
                await page.waitForChanges();
                parentCaret = await parentRow.find('pierce/button.caret-button');
                collapsedChangeSpy = await el.spyOnEvent('marketTableV2GroupCollapsedChange');
            });
            it('displays an up caret', () => {
                expect(parentCaret).not.toBeNull();
                expect(parentRow.getAttribute('caret')).toBe('up');
            });
            it('propagates collapsible correctly', () => {
                expect(childGroup).toHaveAttribute('collapsible');
            });
            it('propagates the indentation correctly', () => {
                expect(parentRow.getAttribute('indent')).toBe('0');
                expect(childRow.getAttribute('indent')).toBe('2');
                expect(childGroup.getAttribute('indent')).toBe('1');
            });
            describe('when the caret is clicked', () => {
                beforeEach(async () => {
                    await parentCaret.click();
                    await page.waitForChanges();
                });
                it('displays a down caret', () => {
                    expect(parentCaret).not.toBeNull();
                    expect(parentRow.getAttribute('caret')).toBe('down');
                });
                it('collapses the group', () => {
                    expect(el).toHaveAttribute('collapsed');
                });
                it('fires the collapsed change event', () => {
                    expect(collapsedChangeSpy).toHaveReceivedEventTimes(1);
                    expect(collapsedChangeSpy).toHaveReceivedEventDetail({ current: true, previous: false });
                });
                it('does NOT collapse the child group', () => {
                    expect(childGroup).not.toHaveAttribute('collapsed');
                });
                describe('when the caret is clicked again', () => {
                    beforeEach(async () => {
                        await parentCaret.click();
                        await page.waitForChanges();
                    });
                    it('displays an up caret', () => {
                        expect(parentCaret).not.toBeNull();
                        expect(parentRow.getAttribute('caret')).toBe('up');
                    });
                    it('opens the group', () => {
                        expect(el).not.toHaveAttribute('collapsed');
                    });
                    it('fires the collapsed change event', () => {
                        expect(collapsedChangeSpy).toHaveReceivedEventTimes(2);
                        expect(collapsedChangeSpy).toHaveReceivedEventDetail({ current: false, previous: true });
                    });
                    it('leaves the child group expanded', () => {
                        expect(childGroup).not.toHaveAttribute('collapsed');
                    });
                });
            });
            describe('when the caret is clicked but the change event is prevented', () => {
                beforeEach(async () => {
                    await page.$eval('market-table-v2-group', (el) => el.addEventListener('marketTableV2GroupCollapsedChange', (e) => e.preventDefault()));
                    await parentCaret.click();
                    await page.waitForChanges();
                });
                it('does NOT change the caret direction', () => {
                    expect(parentCaret).not.toBeNull();
                    expect(parentRow.getAttribute('caret')).toBe('up');
                });
                it('does NOT collapse the group', () => {
                    expect(el).not.toHaveAttribute('collapsed');
                });
                it('fires the collapsed change event', () => {
                    expect(collapsedChangeSpy).toHaveReceivedEventTimes(1);
                    expect(collapsedChangeSpy).toHaveReceivedEventDetail({ current: true, previous: false });
                });
            });
        });
    });
    describe('when rendered not selected', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-group>
          <market-table-v2-row slot="parent"></market-table-v2-row>
          <market-table-v2-row></market-table-v2-row>
          <market-table-v2-group>
            <market-table-v2-row slot="parent"></market-table-v2-row>
            <market-table-v2-row></market-table-v2-row>
          </market-table-v2-group>
        </market-table-v2-group>
      `);
            el = await page.find('market-table-v2-group');
            parentRow = await page.find('market-table-v2-group > market-table-v2-row[slot="parent"]');
            childRow = await page.find('market-table-v2-group > market-table-v2-row:not([slot="parent"])');
            childGroup = await page.find('market-table-v2-group > market-table-v2-group');
            selectionChangeSpy = await el.spyOnEvent('marketInternalTableV2GroupSelectionChange');
        });
        describe('when the parent row is selected', () => {
            beforeEach(async () => {
                await parentRow.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('selects the entire group', async () => {
                expect(await el.getProperty('selected')).toBe('true');
                expect(await parentRow.getProperty('selected')).toBe('true');
                expect(await childRow.getProperty('selected')).toBe('true');
                expect(await childGroup.getProperty('selected')).toBe('true');
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'false' });
            });
        });
        describe('when the child row is selected', () => {
            beforeEach(async () => {
                await childRow.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('sets the group to indeterminate', async () => {
                expect(await el.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the parent to indeterminate', async () => {
                expect(await parentRow.getProperty('selected')).toBe('indeterminate');
            });
            it('does not affect the children', async () => {
                expect(await childRow.getProperty('selected')).toBe('true');
                expect(await childGroup.getProperty('selected')).toBe('false');
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'indeterminate', previous: 'false' });
            });
        });
        describe('when the child group is selected', () => {
            beforeEach(async () => {
                await childGroup.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('sets the group to indeterminate', async () => {
                expect(await el.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the parent to indeterminate', async () => {
                expect(await parentRow.getProperty('selected')).toBe('indeterminate');
            });
            it('does not affect the children', async () => {
                expect(await childRow.getProperty('selected')).toBe('false');
                expect(await childGroup.getProperty('selected')).toBe('true');
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'indeterminate', previous: 'false' });
            });
        });
    });
    describe('when rendered selected', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-group selected="true">
          <market-table-v2-row slot="parent" selected="true"></market-table-v2-row>
          <market-table-v2-row selected="true"></market-table-v2-row>
          <market-table-v2-group selected="true">
            <market-table-v2-row slot="parent" selected="true"></market-table-v2-row>
            <market-table-v2-row selected="true"></market-table-v2-row>
          </market-table-v2-group>
        </market-table-v2-group>
      `);
            el = await page.find('market-table-v2-group');
            parentRow = await page.find('market-table-v2-group > market-table-v2-row[slot="parent"]');
            childRow = await page.find('market-table-v2-group > market-table-v2-row:not([slot="parent"])');
            childGroup = await page.find('market-table-v2-group > market-table-v2-group');
            selectionChangeSpy = await el.spyOnEvent('marketInternalTableV2GroupSelectionChange');
        });
        describe('when the parent row is deselected', () => {
            beforeEach(async () => {
                await parentRow.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('deselects the entire group', async () => {
                expect(await el.getProperty('selected')).toBe('false');
                expect(await parentRow.getProperty('selected')).toBe('false');
                expect(await childRow.getProperty('selected')).toBe('false');
                expect(await childGroup.getProperty('selected')).toBe('false');
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'true' });
            });
        });
        describe('when the child row is deselected', () => {
            beforeEach(async () => {
                await childRow.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('sets the group to indeterminate', async () => {
                expect(await el.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the parent to indeterminate', async () => {
                expect(await parentRow.getProperty('selected')).toBe('indeterminate');
            });
            it('does not affect the children', async () => {
                expect(await childRow.getProperty('selected')).toBe('false');
                expect(await childGroup.getProperty('selected')).toBe('true');
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'indeterminate', previous: 'true' });
            });
        });
        describe('when the child group is deselected', () => {
            beforeEach(async () => {
                await childGroup.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('sets the group to indeterminate', async () => {
                expect(await el.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the parent to indeterminate', async () => {
                expect(await parentRow.getProperty('selected')).toBe('indeterminate');
            });
            it('does not affect the children', async () => {
                expect(await childRow.getProperty('selected')).toBe('true');
                expect(await childGroup.getProperty('selected')).toBe('false');
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'indeterminate', previous: 'true' });
            });
        });
    });
    describe('when rendered indeterminate', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-group selected="indeterminate">
          <market-table-v2-row slot="parent" selected="indeterminate"></market-table-v2-row>
          <market-table-v2-row selected="false"></market-table-v2-row>
          <market-table-v2-group selected="true">
            <market-table-v2-row slot="parent" selected="true"></market-table-v2-row>
            <market-table-v2-row selected="true"></market-table-v2-row>
          </market-table-v2-group>
        </market-table-v2-group>
      `);
            el = await page.find('market-table-v2-group');
            parentRow = await page.find('market-table-v2-group > market-table-v2-row[slot="parent"]');
            childRow = await page.find('market-table-v2-group > market-table-v2-row:not([slot="parent"])');
            childGroup = await page.find('market-table-v2-group > market-table-v2-group');
            selectionChangeSpy = await el.spyOnEvent('marketInternalTableV2GroupSelectionChange');
        });
        describe('when the parent row is selected', () => {
            beforeEach(async () => {
                await parentRow.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('selects the entire group', async () => {
                expect(await el.getProperty('selected')).toBe('true');
                expect(await parentRow.getProperty('selected')).toBe('true');
                expect(await childRow.getProperty('selected')).toBe('true');
                expect(await childGroup.getProperty('selected')).toBe('true');
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'indeterminate' });
            });
        });
        describe('when the parent row is deselected', () => {
            beforeEach(async () => {
                await parentRow.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('deselects the entire group', async () => {
                expect(await el.getProperty('selected')).toBe('false');
                expect(await parentRow.getProperty('selected')).toBe('false');
                expect(await childRow.getProperty('selected')).toBe('false');
                expect(await childGroup.getProperty('selected')).toBe('false');
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'indeterminate' });
            });
        });
        describe('when the child row is selected', () => {
            beforeEach(async () => {
                await childRow.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('sets the group to selected', async () => {
                expect(await el.getProperty('selected')).toBe('true');
            });
            it('sets the parent to selected', async () => {
                expect(await parentRow.getProperty('selected')).toBe('true');
            });
            it('does not affect the children', async () => {
                expect(await childRow.getProperty('selected')).toBe('true');
                expect(await childGroup.getProperty('selected')).toBe('true');
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'indeterminate' });
            });
        });
        describe('when the child group is deselected', () => {
            beforeEach(async () => {
                await childGroup.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('sets the group to selected', async () => {
                expect(await el.getProperty('selected')).toBe('false');
            });
            it('sets the parent to selected', async () => {
                expect(await parentRow.getProperty('selected')).toBe('false');
            });
            it('does not affect the children', async () => {
                expect(await childRow.getProperty('selected')).toBe('false');
                expect(await childGroup.getProperty('selected')).toBe('false');
            });
            it('fires the internal change event', () => {
                expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'indeterminate' });
            });
        });
    });
});
//# sourceMappingURL=market-table-v2-group.e2e.js.map
