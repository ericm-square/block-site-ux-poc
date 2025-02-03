import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-group: methods', () => {
    let page;
    let el;
    let parentRow;
    let childRow;
    let childGroup;
    // groups emit an internal change event that sometimes they catch themselves
    // so use an extra div to listen for the one that goes through this guard
    let eventCatcher;
    let selectionChangeSpy;
    describe('setSelected()', () => {
        describe('when rendered not selected', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <div class="event-catcher">
            <market-table-v2-group>
              <market-table-v2-row slot="parent"></market-table-v2-row>
              <market-table-v2-row></market-table-v2-row>
              <market-table-v2-group>
                <market-table-v2-row slot="parent"></market-table-v2-row>
                <market-table-v2-row></market-table-v2-row>
              </market-table-v2-group>
            </market-table-v2-group>
          </div>
        `);
                el = await page.find('market-table-v2-group');
                parentRow = await page.find('market-table-v2-group > market-table-v2-row[slot="parent"]');
                childRow = await page.find('market-table-v2-group > market-table-v2-row:not([slot="parent"])');
                childGroup = await page.find('market-table-v2-group > market-table-v2-group');
                eventCatcher = await page.find('div.event-catcher');
                selectionChangeSpy = await eventCatcher.spyOnEvent('marketInternalTableV2GroupSelectionChange');
            });
            describe('when setSelected(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false');
                    await page.waitForChanges();
                });
                it('remains unselected', async () => {
                    expect(await el.getProperty('selected')).toBe('false');
                    expect(await parentRow.getProperty('selected')).toBe('false');
                    expect(await childRow.getProperty('selected')).toBe('false');
                    expect(await childGroup.getProperty('selected')).toBe('false');
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
                it('sets the parent to selected', async () => {
                    expect(await parentRow.getProperty('selected')).toBe('true');
                });
                it('sets the children to selected', async () => {
                    expect(await childRow.getProperty('selected')).toBe('true');
                    expect(await childGroup.getProperty('selected')).toBe('true');
                });
                it('fires the internal change event', () => {
                    expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'false' });
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
                it('sets the parent to selected', async () => {
                    expect(await parentRow.getProperty('selected')).toBe('true');
                });
                it('sets the children to selected', async () => {
                    expect(await childRow.getProperty('selected')).toBe('true');
                    expect(await childGroup.getProperty('selected')).toBe('true');
                });
                it('does NOT fire the internal change event', () => {
                    expect(selectionChangeSpy).not.toHaveReceivedEvent();
                });
            });
        });
        describe('when rendered selected', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <div class="event-catcher">
            <market-table-v2-group selected="true">
              <market-table-v2-row slot="parent" selected="true"></market-table-v2-row>
              <market-table-v2-row selected="true"></market-table-v2-row>
              <market-table-v2-group selected="true">
                <market-table-v2-row slot="parent" selected="true"></market-table-v2-row>
                <market-table-v2-row selected="true"></market-table-v2-row>
              </market-table-v2-group>
            </market-table-v2-group>
          </div>
        `);
                el = await page.find('market-table-v2-group');
                parentRow = await page.find('market-table-v2-group > market-table-v2-row[slot="parent"]');
                childRow = await page.find('market-table-v2-group > market-table-v2-row:not([slot="parent"])');
                childGroup = await page.find('market-table-v2-group > market-table-v2-group');
                eventCatcher = await page.find('div.event-catcher');
                selectionChangeSpy = await eventCatcher.spyOnEvent('marketInternalTableV2GroupSelectionChange');
            });
            describe('when setSelected(true) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'true');
                    await page.waitForChanges();
                });
                it('remains selected', async () => {
                    expect(await el.getProperty('selected')).toBe('true');
                    expect(await parentRow.getProperty('selected')).toBe('true');
                    expect(await childRow.getProperty('selected')).toBe('true');
                    expect(await childGroup.getProperty('selected')).toBe('true');
                });
                it('does NOT fire the internal change event', () => {
                    expect(selectionChangeSpy).not.toHaveReceivedEvent();
                });
            });
            describe('when setSelected(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false');
                    await page.waitForChanges();
                });
                it('becomes selected', async () => {
                    expect(await el.getProperty('selected')).toBe('false');
                });
                it('sets the parent to selected', async () => {
                    expect(await parentRow.getProperty('selected')).toBe('false');
                });
                it('sets the children to selected', async () => {
                    expect(await childRow.getProperty('selected')).toBe('false');
                    expect(await childGroup.getProperty('selected')).toBe('false');
                });
                it('fires the internal change event', () => {
                    expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'true' });
                });
            });
            describe('when setSelected(false) is called silently', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false', { silent: true });
                    await page.waitForChanges();
                });
                it('becomes selected', async () => {
                    expect(await el.getProperty('selected')).toBe('false');
                });
                it('sets the parent to selected', async () => {
                    expect(await parentRow.getProperty('selected')).toBe('false');
                });
                it('sets the children to selected', async () => {
                    expect(await childRow.getProperty('selected')).toBe('false');
                    expect(await childGroup.getProperty('selected')).toBe('false');
                });
                it('does NOT fire the internal change event', () => {
                    expect(selectionChangeSpy).not.toHaveReceivedEvent();
                });
            });
        });
        describe('when rendered indeterminate', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <div class="event-catcher">
            <market-table-v2-group selected="indeterminate">
              <market-table-v2-row slot="parent" selected="indeterminate"></market-table-v2-row>
              <market-table-v2-row selected="false"></market-table-v2-row>
              <market-table-v2-group selected="true">
                <market-table-v2-row slot="parent" selected="true"></market-table-v2-row>
                <market-table-v2-row selected="true"></market-table-v2-row>
              </market-table-v2-group>
            </market-table-v2-group>
          </div>
        `);
                el = await page.find('market-table-v2-group');
                parentRow = await page.find('market-table-v2-group > market-table-v2-row[slot="parent"]');
                childRow = await page.find('market-table-v2-group > market-table-v2-row:not([slot="parent"])');
                childGroup = await page.find('market-table-v2-group > market-table-v2-group');
                eventCatcher = await page.find('div.event-catcher');
                selectionChangeSpy = await eventCatcher.spyOnEvent('marketInternalTableV2GroupSelectionChange');
            });
            describe('when setSelected(true) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'true');
                    await page.waitForChanges();
                });
                it('becomes selected', async () => {
                    expect(await el.getProperty('selected')).toBe('true');
                });
                it('sets the parent to selected', async () => {
                    expect(await parentRow.getProperty('selected')).toBe('true');
                });
                it('sets the children to selected', async () => {
                    expect(await childRow.getProperty('selected')).toBe('true');
                    expect(await childGroup.getProperty('selected')).toBe('true');
                });
                it('fires the internal change event', () => {
                    expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'true', previous: 'indeterminate' });
                });
            });
            describe('when setSelected(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false');
                    await page.waitForChanges();
                });
                it('becomes selected', async () => {
                    expect(await el.getProperty('selected')).toBe('false');
                });
                it('sets the parent to selected', async () => {
                    expect(await parentRow.getProperty('selected')).toBe('false');
                });
                it('sets the children to selected', async () => {
                    expect(await childRow.getProperty('selected')).toBe('false');
                    expect(await childGroup.getProperty('selected')).toBe('false');
                });
                it('fires the internal change event', () => {
                    expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
                    expect(selectionChangeSpy).toHaveReceivedEventDetail({ current: 'false', previous: 'indeterminate' });
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
                it('sets the parent to selected', async () => {
                    expect(await parentRow.getProperty('selected')).toBe('true');
                });
                it('sets the children to selected', async () => {
                    expect(await childRow.getProperty('selected')).toBe('true');
                    expect(await childGroup.getProperty('selected')).toBe('true');
                });
                it('does NOT fire the internal change event', () => {
                    expect(selectionChangeSpy).not.toHaveReceivedEvent();
                });
            });
        });
    });
});
//# sourceMappingURL=market-table-v2-group.methods.e2e.js.map
