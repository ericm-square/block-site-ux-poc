import { newE2EPage } from "@stencil/core/testing";
import { drag } from "../../../../utils/e2e/drag";
describe('market-table-v2: reorderable functionality', () => {
    let page;
    let table1;
    let table1Rows;
    let table1ReorderedSpy;
    let table2;
    let table2Rows;
    let table2ReorderedSpy;
    let draggedRowNode;
    // magic numbers to assist with mouse manipulation
    const ROW_H = 50;
    const X_TABLE_1 = 20;
    const X_TABLE_2 = 220;
    const Y_ROW_2 = 75;
    const Y_ROW_3 = 125;
    const Y_ROW_4 = 175;
    beforeEach(async () => {
        page = await newE2EPage();
        // absolutely position tables to simplify mouse manipulation
        await page.setContent(`
      <market-table-v2 id="table-1" style="position: absolute; width: 200px; top: 0; left: 0;">
        <market-table-v2-row drag-handle-position="leading">
          <market-table-v2-cell>Row 1.1</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row drag-handle-position="leading">
          <market-table-v2-cell>Row 1.2</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row drag-handle-position="leading">
          <market-table-v2-cell>Row 1.3</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row drag-handle-position="leading">
          <market-table-v2-cell>Row 1.4</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row drag-handle-position="leading">
          <market-table-v2-cell>Row 1.5</market-table-v2-cell>
        </market-table-v2-row>
      </market-table-v2>
      <market-table-v2 id="table-2" style="position: absolute; width: 200px; top: 0; left: 200px;">
        <market-table-v2-row drag-handle-position="leading">
          <market-table-v2-cell>Row 2.1</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row drag-handle-position="leading">
          <market-table-v2-cell>Row 2.2</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row drag-handle-position="leading">
          <market-table-v2-cell>Row 2.3</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row drag-handle-position="leading">
          <market-table-v2-cell>Row 2.4</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row drag-handle-position="leading">
          <market-table-v2-cell>Row 2.5</market-table-v2-cell>
        </market-table-v2-row>
      </market-table-v2>
    `);
        table1 = await page.find('#table-1');
        table1Rows = await page.findAll('#table-1 > market-table-v2-row');
        table1ReorderedSpy = await table1.spyOnEvent('marketTableV2RowsReordered');
        table2 = await page.find('#table-2');
        table2Rows = await page.findAll('#table-2 > market-table-v2-row');
        table2ReorderedSpy = await table2.spyOnEvent('marketTableV2RowsReordered');
    });
    describe('when both tables are NOT reorderable', () => {
        it('does NOT set the table rows to be drag enabled', () => {
            table1Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(false);
            });
            table2Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(false);
            });
        });
    });
    describe('when both tables are internally reorderable', () => {
        beforeEach(async () => {
            table1.setProperty('reorderable', 'internal');
            table2.setProperty('reorderable', 'internal');
            await page.waitForChanges();
            draggedRowNode = (await page.$eval('#table-1 market-table-v2-row:nth-child(3)', (el) => el));
        });
        it('sets the table rows to be drag enabled', () => {
            table1Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(true);
            });
            table2Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(true);
            });
        });
        describe('when a row is dragged upwards', () => {
            beforeEach(async () => {
                // drag 3rd row between 1st and 2nd rows
                const from = { x: X_TABLE_1, y: Y_ROW_3 };
                const to = { x: X_TABLE_1, y: Y_ROW_2 - ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
            });
            it('fires the reordered event', () => {
                expect(table1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 1,
                });
            });
            it('moves the row to proper position', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 1.1',
                    'Row 1.3',
                    'Row 1.2',
                    'Row 1.4',
                    'Row 1.5',
                ]);
            });
        });
        describe('when a row is dragged downwards', () => {
            beforeEach(async () => {
                // drag 3rd row between 4th and 5th rows
                const from = { x: X_TABLE_1, y: Y_ROW_3 };
                const to = { x: X_TABLE_1, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
            });
            it('fires the reordered event', () => {
                expect(table1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 3,
                });
            });
            it('moves the row to the proper position', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 1.1',
                    'Row 1.2',
                    'Row 1.4',
                    'Row 1.3',
                    'Row 1.5',
                ]);
            });
        });
        describe('when preventDefault is called on the reordered event', () => {
            beforeEach(async () => {
                await page.$eval('#table-1', (el) => {
                    el.addEventListener('marketTableV2RowsReordered', (e) => {
                        e.preventDefault();
                    });
                });
                // drag 3rd row between 1st and 2nd rows
                const from = { x: X_TABLE_1, y: Y_ROW_3 };
                const to = { x: X_TABLE_1, y: Y_ROW_2 - ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
            });
            it('fires the reordered event', () => {
                expect(table1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 1,
                });
            });
            it('does NOT move the row', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 1.1',
                    'Row 1.2',
                    'Row 1.3',
                    'Row 1.4',
                    'Row 1.5',
                ]);
            });
        });
        describe('when a row is dragged from one table to the other', () => {
            beforeEach(async () => {
                // drag 3rd row in table 1 between 4th and 5th rows in table 2
                const from = { x: X_TABLE_1, y: Y_ROW_3 };
                const to = { x: X_TABLE_2, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
                table2Rows = await page.findAll('#table-2 > market-table-v2-row');
            });
            it('does NOT fire the reordered event on either table', () => {
                expect(table1ReorderedSpy).not.toHaveReceivedEvent();
                expect(table2ReorderedSpy).not.toHaveReceivedEvent();
            });
            it('does NOT move the row', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 1.1',
                    'Row 1.2',
                    'Row 1.3',
                    'Row 1.4',
                    'Row 1.5',
                ]);
                expect(table2Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 2.1',
                    'Row 2.2',
                    'Row 2.3',
                    'Row 2.4',
                    'Row 2.5',
                ]);
            });
        });
        describe('when a new row is added to a table', () => {
            beforeEach(async () => {
                await page.$eval('#table-1', (el) => {
                    const newRow = document.createElement('market-table-v2-row');
                    newRow.id = 'new-row';
                    el.append(newRow);
                });
                await page.waitForChanges();
            });
            it('makes the new row drag enabled', async () => {
                const newRow = await table1.find('#new-row');
                expect(newRow).toHaveAttribute('drag-enabled');
                expect(await newRow.getProperty('dragEnabled')).toEqual(true);
            });
        });
    });
    describe('when one table is internally reorderable and the other is externally reorderable', () => {
        beforeEach(async () => {
            table1.setProperty('reorderable', 'internal');
            table2.setProperty('reorderable', 'external');
            await page.waitForChanges();
            draggedRowNode = (await page.$eval('#table-1 market-table-v2-row:nth-child(3)', (el) => el));
        });
        describe('when a row is dragged from the internal table to the external table', () => {
            beforeEach(async () => {
                // drag 3rd row in table 1 between 4th and 5th rows in table 2
                const from = { x: X_TABLE_1, y: Y_ROW_3 };
                const to = { x: X_TABLE_2, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
                table2Rows = await page.findAll('#table-2 > market-table-v2-row');
            });
            it('does NOT fire the reordered event on either table', () => {
                expect(table1ReorderedSpy).not.toHaveReceivedEvent();
                expect(table2ReorderedSpy).not.toHaveReceivedEvent();
            });
            it('does NOT remove the row from the internal table', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 1.1',
                    'Row 1.2',
                    'Row 1.3',
                    'Row 1.4',
                    'Row 1.5',
                ]);
            });
            it('does NOT add the row to the external table', () => {
                expect(table2Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 2.1',
                    'Row 2.2',
                    'Row 2.3',
                    'Row 2.4',
                    'Row 2.5',
                ]);
            });
        });
        describe('when a row is dragged from the external table to the internal table', () => {
            beforeEach(async () => {
                // drag 3rd row in table 2 between 4th and 5th rows in table 1
                const from = { x: X_TABLE_2, y: Y_ROW_3 };
                const to = { x: X_TABLE_1, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
                table2Rows = await page.findAll('#table-2 > market-table-v2-row');
            });
            it('does NOT fire the reordered event on either table', () => {
                expect(table1ReorderedSpy).not.toHaveReceivedEvent();
                expect(table2ReorderedSpy).not.toHaveReceivedEvent();
            });
            it('does NOT add the row to the internal table', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 1.1',
                    'Row 1.2',
                    'Row 1.3',
                    'Row 1.4',
                    'Row 1.5',
                ]);
            });
            it('does NOT remove the row from the external table', () => {
                expect(table2Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 2.1',
                    'Row 2.2',
                    'Row 2.3',
                    'Row 2.4',
                    'Row 2.5',
                ]);
            });
        });
    });
    describe('when both tables are externally reorderable', () => {
        beforeEach(async () => {
            table1.setProperty('reorderable', 'external');
            table2.setProperty('reorderable', 'external');
            await page.waitForChanges();
            draggedRowNode = (await page.$eval('#table-1 market-table-v2-row:nth-child(3)', (el) => el));
        });
        it('sets the table rows to be drag enabled', () => {
            table1Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(true);
            });
            table2Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(true);
            });
        });
        describe('when a row is dragged from the first table to the second', () => {
            beforeEach(async () => {
                // drag 3rd row in table 1 between 4th and 5th rows in table 2
                const from = { x: X_TABLE_1, y: Y_ROW_3 };
                const to = { x: X_TABLE_2, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
                table2Rows = await page.findAll('#table-2 > market-table-v2-row');
            });
            it('fires the reordered event on the table the row exited', () => {
                expect(table1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: -1,
                });
            });
            it('fires the reordered event on the table the row entered', () => {
                expect(table2ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table2ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: -1,
                    newIndex: 4,
                });
            });
            it('removes the row from the first table', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual(['Row 1.1', 'Row 1.2', 'Row 1.4', 'Row 1.5']);
            });
            it('adds the row to the second table in the proper position', () => {
                expect(table2Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 2.1',
                    'Row 2.2',
                    'Row 2.3',
                    'Row 2.4',
                    'Row 1.3',
                    'Row 2.5',
                ]);
            });
        });
        describe('when a row is dragged from the second table to the first', () => {
            beforeEach(async () => {
                // drag 3rd row in table 2 between 4th and 5th rows in table 1
                const from = { x: X_TABLE_2, y: Y_ROW_3 };
                const to = { x: X_TABLE_1, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
                table2Rows = await page.findAll('#table-2 > market-table-v2-row');
            });
            it('fires the reordered event on the table the row exited', () => {
                expect(table2ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table2ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: -1,
                });
            });
            it('fires the reordered event on the table the row entered', () => {
                expect(table1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: -1,
                    newIndex: 4,
                });
            });
            it('removes the row from the second table', () => {
                expect(table2Rows.map((row) => row.innerText.trim())).toEqual(['Row 2.1', 'Row 2.2', 'Row 2.4', 'Row 2.5']);
            });
            it('adds the row to the first table in the proper position', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 1.1',
                    'Row 1.2',
                    'Row 1.3',
                    'Row 1.4',
                    'Row 2.3',
                    'Row 1.5',
                ]);
            });
        });
        describe('when preventDefault is called on the first table reordered event', () => {
            beforeEach(async () => {
                await page.$eval('#table-1', (el) => {
                    el.addEventListener('marketTableV2RowsReordered', (e) => {
                        e.preventDefault();
                    });
                });
                // drag 3rd row in table 1 between 4th and 5th rows in table 2
                const from = { x: X_TABLE_1, y: Y_ROW_3 };
                const to = { x: X_TABLE_2, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
                table2Rows = await page.findAll('#table-2 > market-table-v2-row');
            });
            it('fires the reordered event on the table the row exited', () => {
                expect(table1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: -1,
                });
            });
            it('does NOT fire the reordered event on the table the row entered', () => {
                expect(table2ReorderedSpy).not.toHaveReceivedEvent();
            });
            it('does NOT remove the row from the first table', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 1.1',
                    'Row 1.2',
                    'Row 1.3',
                    'Row 1.4',
                    'Row 1.5',
                ]);
            });
            it('does NOT add the row to the second table', () => {
                expect(table2Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 2.1',
                    'Row 2.2',
                    'Row 2.3',
                    'Row 2.4',
                    'Row 2.5',
                ]);
            });
        });
        describe('when preventDefault is called on the second table reordered event', () => {
            beforeEach(async () => {
                await page.$eval('#table-2', (el) => {
                    el.addEventListener('marketTableV2RowsReordered', (e) => {
                        e.preventDefault();
                    });
                });
                // drag 3rd row in table 1 between 4th and 5th rows in table 2
                const from = { x: X_TABLE_1, y: Y_ROW_3 };
                const to = { x: X_TABLE_2, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
                table2Rows = await page.findAll('#table-2 > market-table-v2-row');
            });
            it('fires the reordered event on the table the row exited', () => {
                expect(table1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: -1,
                });
            });
            it('fires the reordered event on the table the row entered', () => {
                expect(table2ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table2ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: -1,
                    newIndex: 4,
                });
            });
            it('does NOT remove the row from the first table', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 1.1',
                    'Row 1.2',
                    'Row 1.3',
                    'Row 1.4',
                    'Row 1.5',
                ]);
            });
            it('does NOT add the row to the second table', () => {
                expect(table2Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 2.1',
                    'Row 2.2',
                    'Row 2.3',
                    'Row 2.4',
                    'Row 2.5',
                ]);
            });
        });
    });
    describe('when a table is reorderable in framework mode', () => {
        beforeEach(async () => {
            table1.setProperty('reorderable', 'internal');
            table1.setProperty('reorderMode', 'framework');
            await page.waitForChanges();
            draggedRowNode = (await page.$eval('#table-1 market-table-v2-row:nth-child(3)', (el) => el));
        });
        describe.only('when a row is dragged upwards', () => {
            beforeEach(async () => {
                // drag 3rd row between 1st and 2nd rows
                const from = { x: X_TABLE_1, y: Y_ROW_3 };
                const to = { x: X_TABLE_1, y: Y_ROW_2 - ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
            });
            it('fires the reordered event', () => {
                expect(table1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 1,
                });
            });
            it('returns the row to its original position (for the framework to take over)', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 1.1',
                    'Row 1.2',
                    'Row 1.3',
                    'Row 1.4',
                    'Row 1.5',
                ]);
            });
        });
        describe.only('when a row is dragged downwards', () => {
            beforeEach(async () => {
                // drag 3rd row between 4th and 5th rows
                const from = { x: X_TABLE_1, y: Y_ROW_3 };
                const to = { x: X_TABLE_1, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                table1Rows = await page.findAll('#table-1 > market-table-v2-row');
            });
            it('fires the reordered event', () => {
                expect(table1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(table1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 3,
                });
            });
            it('returns the row to its original position (for the framework to take over)', () => {
                expect(table1Rows.map((row) => row.innerText.trim())).toEqual([
                    'Row 1.1',
                    'Row 1.2',
                    'Row 1.3',
                    'Row 1.4',
                    'Row 1.5',
                ]);
            });
        });
    });
});
//# sourceMappingURL=market-table-v2.reorderable.e2e.js.map
