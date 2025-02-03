import { newE2EPage } from "@stencil/core/testing";
import { drag } from "../../../../utils/e2e/drag";
import { TABLE_GROUP_EXPAND_TIMEOUT_DURATION } from "../../../../utils/reorderable";
describe('market-table-v2: nested reorderable functionality', () => {
    let page;
    let table;
    let group;
    let rows;
    let reorderedSpy;
    let collapsedSpy;
    // magic numbers to assist with mouse manipulation
    const ROW_H = 50;
    const X_HANDLE = 20;
    const Y_ROW_1 = 25;
    const Y_ROW_2 = 75;
    const Y_ROW_3 = 125;
    const Y_ROW_3_1 = 175;
    const Y_ROW_3_2 = 225;
    const expectEvent = ({ event, targetId, oldIndex, newIndex }) => {
        // unable to verify that event.detail.item is the dragged node :(
        expect(event.target.id).toEqual(targetId);
        expect(event.detail.oldIndex).toEqual(oldIndex);
        expect(event.detail.newIndex).toEqual(newIndex);
    };
    beforeEach(async () => {
        page = await newE2EPage();
        // absolutely position tables to simplify mouse manipulation
        await page.setContent(`
      <market-table-v2 id="table" style="position: absolute; width: 200px; top: 0; left: 0;">
        <market-table-v2-row drag-handle-position="leading" id="row-1">
          <market-table-v2-cell>Row 1</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row drag-handle-position="leading" id="row-2">
          <market-table-v2-cell>Row 2</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-group id="group">
          <market-table-v2-row drag-handle-position="leading" slot="parent" id="row-3">
            <market-table-v2-cell>Row 3</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-row drag-handle-position="leading" id="row-3-1">
            <market-table-v2-cell>Row 3.1</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-row drag-handle-position="leading" id="row-3-2">
            <market-table-v2-cell>Row 3.2</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-row drag-handle-position="leading" id="row-3-3">
            <market-table-v2-cell>Row 3.3</market-table-v2-cell>
          </market-table-v2-row>
        </market-table-v2-group>
        <market-table-v2-row drag-handle-position="leading" id="row-4">
          <market-table-v2-cell>Row 4</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row drag-handle-position="leading" id="row-5">
          <market-table-v2-cell>Row 5</market-table-v2-cell>
        </market-table-v2-row>
      </market-table-v2>
    `);
        table = await page.find('#table');
        group = await page.find('#group');
        rows = await table.findAll('market-table-v2-row');
        reorderedSpy = await table.spyOnEvent('marketTableV2RowsReordered');
        collapsedSpy = await group.spyOnEvent('marketTableV2GroupCollapsedChange');
    });
    describe('when the table is NOT reorderable', () => {
        it('does NOT set the table groups & rows to be drag enabled', async () => {
            expect(await group.getProperty('dragEnabled')).toEqual(false);
            rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(false);
            });
        });
    });
    describe('when the table is internally reorderable', () => {
        beforeEach(async () => {
            table.setProperty('reorderable', 'internal');
            await page.waitForChanges();
        });
        it('sets the table groups & rows to be drag enabled', async () => {
            expect(await group.getProperty('dragEnabled')).toEqual(true);
            rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(true);
            });
        });
        describe('when a row is dragged from the table to the group', () => {
            describe('and no events are canceled', () => {
                beforeEach(async () => {
                    // drag row 2 between rows 3.1 snd 3.2
                    const from = { x: X_HANDLE, y: Y_ROW_2 };
                    const to = { x: X_HANDLE, y: Y_ROW_3_1 + ROW_H / 2 };
                    await drag(page, from, to);
                });
                it('fires two reordered events', () => {
                    expect(reorderedSpy).toHaveReceivedEventTimes(2);
                });
                it('fires the first reorder event on the table when leaving it', () => {
                    expectEvent({
                        event: reorderedSpy.firstEvent,
                        targetId: 'table',
                        oldIndex: 1,
                        newIndex: -1,
                    });
                });
                it('fires the second reorder event on the group when entering it', () => {
                    expectEvent({
                        event: reorderedSpy.lastEvent,
                        targetId: 'group',
                        oldIndex: -1,
                        newIndex: 1,
                    });
                });
                it('moves the row to proper position', async () => {
                    const rows = await table.findAll('market-table-v2-row');
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 1',
                        'Row 3',
                        'Row 3.1',
                        'Row 2',
                        'Row 3.2',
                        'Row 3.3',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
            describe("but preventDefault is called on the table's reordered event", () => {
                beforeEach(async () => {
                    await page.$eval('#table', (el) => {
                        el.addEventListener('marketTableV2RowsReordered', (e) => {
                            if (e.target.id === 'table')
                                e.preventDefault();
                        });
                    });
                    // drag row 2 between rows 3.1 snd 3.2
                    const from = { x: X_HANDLE, y: Y_ROW_2 };
                    const to = { x: X_HANDLE, y: Y_ROW_3_1 + ROW_H / 2 };
                    await drag(page, from, to);
                });
                it('fires one reordered event', () => {
                    expect(reorderedSpy).toHaveReceivedEventTimes(1);
                });
                it('fires the reordered event on the table', () => {
                    expectEvent({
                        event: reorderedSpy.firstEvent,
                        targetId: 'table',
                        oldIndex: 1,
                        newIndex: -1,
                    });
                });
                it('does NOT move the row', () => {
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 1',
                        'Row 2',
                        'Row 3',
                        'Row 3.1',
                        'Row 3.2',
                        'Row 3.3',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
            describe("but preventDefault is called on the group's reordered event", () => {
                beforeEach(async () => {
                    await page.$eval('#group', (el) => {
                        el.addEventListener('marketTableV2RowsReordered', (e) => {
                            if (e.target.id === 'group')
                                e.preventDefault();
                        });
                    });
                    // drag row 2 between rows 3.1 snd 3.2
                    const from = { x: X_HANDLE, y: Y_ROW_2 };
                    const to = { x: X_HANDLE, y: Y_ROW_3_1 + ROW_H / 2 };
                    await drag(page, from, to);
                });
                it('fires two reordered events', () => {
                    expect(reorderedSpy).toHaveReceivedEventTimes(2);
                });
                it('fires the first reorder event on the table', () => {
                    expectEvent({
                        event: reorderedSpy.firstEvent,
                        targetId: 'table',
                        oldIndex: 1,
                        newIndex: -1,
                    });
                });
                it('fires the second reorder event on the group', () => {
                    expectEvent({
                        event: reorderedSpy.lastEvent,
                        targetId: 'group',
                        oldIndex: -1,
                        newIndex: 1,
                    });
                });
                it('does NOT move the row', () => {
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 1',
                        'Row 2',
                        'Row 3',
                        'Row 3.1',
                        'Row 3.2',
                        'Row 3.3',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
        });
        describe('when a row is dragged from the group to the table', () => {
            describe('and no events are canceled', () => {
                beforeEach(async () => {
                    // drag row 3.2 between rows 1 and 2
                    const from = { x: X_HANDLE, y: Y_ROW_3_2 };
                    const to = { x: X_HANDLE, y: Y_ROW_1 + ROW_H / 2 };
                    await drag(page, from, to);
                });
                it('fires two reordered events', () => {
                    expect(reorderedSpy).toHaveReceivedEventTimes(2);
                });
                it('fires the first reorder event on the group when leaving it', () => {
                    expectEvent({
                        event: reorderedSpy.firstEvent,
                        targetId: 'group',
                        oldIndex: 1,
                        newIndex: -1,
                    });
                });
                it('fires the second reorder event on the table when entering it', () => {
                    expectEvent({
                        event: reorderedSpy.lastEvent,
                        targetId: 'table',
                        oldIndex: -1,
                        newIndex: 1,
                    });
                });
                it('moves the row to the proper position', async () => {
                    const rows = await table.findAll('market-table-v2-row');
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 1',
                        'Row 3.2',
                        'Row 2',
                        'Row 3',
                        'Row 3.1',
                        'Row 3.3',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
            describe("but preventDefault is called on the group's reordered event", () => {
                beforeEach(async () => {
                    await page.$eval('#table', (el) => {
                        el.addEventListener('marketTableV2RowsReordered', (e) => {
                            if (e.target.id === 'group')
                                e.preventDefault();
                        });
                    });
                    // drag row 3.2 between rows 1 and 2
                    const from = { x: X_HANDLE, y: Y_ROW_3_2 };
                    const to = { x: X_HANDLE, y: Y_ROW_1 + ROW_H / 2 };
                    await drag(page, from, to);
                });
                it('fires one reordered event', () => {
                    expect(reorderedSpy).toHaveReceivedEventTimes(1);
                });
                it('fires the reordered event on the group', () => {
                    expectEvent({
                        event: reorderedSpy.firstEvent,
                        targetId: 'group',
                        oldIndex: 1,
                        newIndex: -1,
                    });
                });
                it('does NOT move the row', () => {
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 1',
                        'Row 2',
                        'Row 3',
                        'Row 3.1',
                        'Row 3.2',
                        'Row 3.3',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
            describe("but preventDefault is called on the table's reordered event", () => {
                beforeEach(async () => {
                    await page.$eval('#table', (el) => {
                        el.addEventListener('marketTableV2RowsReordered', (e) => {
                            if (e.target.id === 'table')
                                e.preventDefault();
                        });
                    });
                    // drag row 3.2 between rows 1 and 2
                    const from = { x: X_HANDLE, y: Y_ROW_3_2 };
                    const to = { x: X_HANDLE, y: Y_ROW_1 + ROW_H / 2 };
                    await drag(page, from, to);
                });
                it('fires two reordered events', () => {
                    expect(reorderedSpy).toHaveReceivedEventTimes(2);
                });
                it('fires the first reorder event on the group', () => {
                    expectEvent({
                        event: reorderedSpy.firstEvent,
                        targetId: 'group',
                        oldIndex: 1,
                        newIndex: -1,
                    });
                });
                it('fires the second reorder event on the table', () => {
                    expectEvent({
                        event: reorderedSpy.lastEvent,
                        targetId: 'table',
                        oldIndex: -1,
                        newIndex: 1,
                    });
                });
                it('does NOT move the row', () => {
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 1',
                        'Row 2',
                        'Row 3',
                        'Row 3.1',
                        'Row 3.2',
                        'Row 3.3',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
        });
        describe('when a group is dragged within the table', () => {
            describe('and no events are canceled', () => {
                beforeEach(async () => {
                    // drag row 3 (the parent row of the group) between rows 1 and 2
                    const from = { x: X_HANDLE, y: Y_ROW_3 };
                    const to = { x: X_HANDLE, y: Y_ROW_1 + ROW_H / 2 };
                    await drag(page, from, to);
                });
                it('fires one reordered event', () => {
                    expect(reorderedSpy).toHaveReceivedEventTimes(1);
                });
                it('fires the reordered event on the table', () => {
                    expectEvent({
                        event: reorderedSpy.firstEvent,
                        targetId: 'table',
                        oldIndex: 2,
                        newIndex: 1,
                    });
                });
                it('moves the row to the proper position', async () => {
                    const rows = await table.findAll('market-table-v2-row');
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 1',
                        'Row 3',
                        'Row 3.1',
                        'Row 3.2',
                        'Row 3.3',
                        'Row 2',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
            describe("but preventDefault is called on the table's reordered event", () => {
                beforeEach(async () => {
                    await page.$eval('#table', (el) => {
                        el.addEventListener('marketTableV2RowsReordered', (e) => {
                            if (e.target.id === 'table')
                                e.preventDefault();
                        });
                    });
                    // drag row 3 (the parent row of the group) between rows 1 and 2
                    const from = { x: X_HANDLE, y: Y_ROW_3 };
                    const to = { x: X_HANDLE, y: Y_ROW_1 + ROW_H / 2 };
                    await drag(page, from, to);
                });
                it('fires one reordered event', () => {
                    expect(reorderedSpy).toHaveReceivedEventTimes(1);
                });
                it('fires the reordered event on the table', () => {
                    expectEvent({
                        event: reorderedSpy.firstEvent,
                        targetId: 'table',
                        oldIndex: 2,
                        newIndex: 1,
                    });
                });
                it('does NOT move the row', () => {
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 1',
                        'Row 2',
                        'Row 3',
                        'Row 3.1',
                        'Row 3.2',
                        'Row 3.3',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
        });
        describe('when the group is collapsed', () => {
            beforeEach(async () => {
                table.setProperty('collapsible', true);
                group.setProperty('collapsed', true);
                await page.waitForChanges();
            });
            describe('and a row is dragged from the table ABOVE the collapsed group', () => {
                beforeEach(async () => {
                    // drag row 1 onto top third of collapsed row 3
                    const from = { x: X_HANDLE, y: Y_ROW_1 };
                    const to = { x: X_HANDLE, y: Y_ROW_3 - ROW_H / 4 };
                    await drag(page, from, to);
                });
                it('fires one reordered event', () => {
                    expect(reorderedSpy).toHaveReceivedEventTimes(1);
                });
                it('fires the reordered event on the table', () => {
                    expectEvent({
                        event: reorderedSpy.firstEvent,
                        targetId: 'table',
                        oldIndex: 0,
                        newIndex: 1,
                    });
                });
                it('moves the row to proper position', async () => {
                    const rows = await table.findAll('market-table-v2-row');
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 2',
                        'Row 1',
                        'Row 3',
                        'Row 3.1',
                        'Row 3.2',
                        'Row 3.3',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
            describe('and a row is dragged from the table BELOW the collapsed group', () => {
                beforeEach(async () => {
                    // drag row 1 onto bottom third of collapsed row 3
                    const from = { x: X_HANDLE, y: Y_ROW_1 };
                    const to = { x: X_HANDLE, y: Y_ROW_3 + ROW_H / 4 };
                    await drag(page, from, to);
                });
                it('fires one reordered event', () => {
                    expect(reorderedSpy).toHaveReceivedEventTimes(1);
                });
                it('fires the reordered event on the table', () => {
                    expectEvent({
                        event: reorderedSpy.firstEvent,
                        targetId: 'table',
                        oldIndex: 0,
                        newIndex: 2,
                    });
                });
                it('moves the row to proper position', async () => {
                    const rows = await table.findAll('market-table-v2-row');
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 2',
                        'Row 3',
                        'Row 3.1',
                        'Row 3.2',
                        'Row 3.3',
                        'Row 1',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
            describe('and a row is dragged from the table INTO the collapsed group', () => {
                beforeEach(async () => {
                    // drag row 1 onto middle of collapsed row 3
                    const from = { x: X_HANDLE, y: Y_ROW_1 };
                    const to = { x: X_HANDLE, y: Y_ROW_3 };
                    await drag(page, from, to);
                });
                it('fires two reordered events', () => {
                    expect(reorderedSpy).toHaveReceivedEventTimes(2);
                });
                it('fires the first reorder event on the table when leaving it', () => {
                    expectEvent({
                        event: reorderedSpy.firstEvent,
                        targetId: 'table',
                        oldIndex: 0,
                        newIndex: -1,
                    });
                });
                it('fires the second reorder event on the group when entering it', () => {
                    expectEvent({
                        event: reorderedSpy.lastEvent,
                        targetId: 'group',
                        oldIndex: -1,
                        newIndex: 0,
                    });
                });
                it('moves the row to proper position', async () => {
                    const rows = await table.findAll('market-table-v2-row');
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 2',
                        'Row 3',
                        'Row 1',
                        'Row 3.1',
                        'Row 3.2',
                        'Row 3.3',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
            describe('and a row is held OVER the MIDDLE of the collapsed group long enough to expand it', () => {
                beforeEach(async () => {
                    // grab row 1
                    await page.mouse.move(X_HANDLE, Y_ROW_1);
                    await page.waitForChanges();
                    await page.mouse.down();
                    await page.waitForChanges();
                    // drag row 1 onto middle of collapsed row 3
                    await page.mouse.move(X_HANDLE, Y_ROW_3);
                    await page.waitForChanges();
                    // wait for timeout to complete
                    await new Promise((r) => setTimeout(r, TABLE_GROUP_EXPAND_TIMEOUT_DURATION + 1));
                    // drop row 1
                    await page.mouse.up();
                    await page.waitForChanges();
                });
                it('expands the collapsed group', async () => {
                    expect(await group.getProperty('collapsed')).toEqual(false);
                });
                it('fires the collapsed event', () => {
                    expect(collapsedSpy).toHaveReceivedEventTimes(1);
                    expect(collapsedSpy.lastEvent.detail).toEqual({ previous: true, current: false });
                });
                it('moves the row to proper position', async () => {
                    const rows = await table.findAll('market-table-v2-row');
                    expect(rows.map((row) => row.innerText.trim())).toEqual([
                        'Row 2',
                        'Row 3',
                        'Row 1',
                        'Row 3.1',
                        'Row 3.2',
                        'Row 3.3',
                        'Row 4',
                        'Row 5',
                    ]);
                });
            });
            // passes locally but flaky on CI :(
            describe.skip('and a row is held OVER the MIDDLE of the collapsed group but NOT long enough to expand it', () => {
                beforeEach(async () => {
                    // grab row 1
                    await page.mouse.move(X_HANDLE, Y_ROW_1);
                    await page.waitForChanges();
                    await page.mouse.down();
                    await page.waitForChanges();
                    // drag row 1 onto middle of collapsed row 3
                    await page.mouse.move(X_HANDLE, Y_ROW_3);
                    await page.waitForChanges();
                    // DON'T wait enough time for timeout to complete
                    await new Promise((r) => setTimeout(r, 1));
                    await page.waitForChanges();
                    // drag row 1 back to its original position
                    await page.mouse.move(X_HANDLE, Y_ROW_1);
                    await page.mouse.up();
                    await page.waitForChanges();
                });
                it('does NOT expand the collapsed group', async () => {
                    expect(await group.getProperty('collapsed')).toEqual(true);
                });
                it('does NOT fire the collapsed event', () => {
                    expect(collapsedSpy).not.toHaveReceivedEvent();
                });
            });
            // passes locally but flaky on CI :(
            describe.skip('and a row is held OVER the MIDDLE of the collapsed group but the collapsed group does NOT have any children', () => {
                beforeEach(async () => {
                    // remove children from group
                    await page.$eval('#group', (el) => {
                        el.querySelectorAll('*:not([slot="parent"])').forEach((child) => child.remove());
                    });
                    await page.waitForChanges();
                    // grab row 1
                    await page.mouse.move(X_HANDLE, Y_ROW_1);
                    await page.waitForChanges();
                    await page.mouse.down();
                    await page.waitForChanges();
                    // drag row 1 onto middle of collapsed row 3
                    await page.mouse.move(X_HANDLE, Y_ROW_3);
                    await page.waitForChanges();
                    // wait enough time for timeout to complete
                    await new Promise((r) => setTimeout(r, TABLE_GROUP_EXPAND_TIMEOUT_DURATION + 1));
                    await page.waitForChanges();
                    // drag row 1 back to its original position
                    await page.mouse.move(X_HANDLE, Y_ROW_1);
                    await page.mouse.up();
                    await page.waitForChanges();
                });
                it('does NOT expand the collapsed group', async () => {
                    expect(await group.getProperty('collapsed')).toEqual(true);
                });
                // this is being flaky
                it('does NOT fire the collapsed event', () => {
                    expect(collapsedSpy).not.toHaveReceivedEvent();
                });
            });
        });
    });
    describe('when the table reorder mode is set', () => {
        beforeEach(async () => {
            table.setProperty('reorderMode', 'framework');
            await page.waitForChanges();
        });
        it('sets reorder mode on the group', async () => {
            expect(await group.getProperty('reorderMode')).toEqual('framework');
        });
    });
});
//# sourceMappingURL=market-table-v2.reorderable.nested.e2e.js.map
