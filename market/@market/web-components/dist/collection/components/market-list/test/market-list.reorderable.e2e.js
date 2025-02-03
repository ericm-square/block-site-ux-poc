import { newE2EPage } from "@stencil/core/testing";
import { drag } from "../../../utils/e2e/drag";
describe('market-list: reorderable functionality', () => {
    let page;
    let list1;
    let list1Rows;
    let list1ReorderedSpy;
    let list2;
    let list2Rows;
    let list2ReorderedSpy;
    let draggedRowNode;
    // magic numbers to assist with mouse manipulation
    const ROW_H = 55;
    const X_LIST_1 = 15;
    const X_LIST_2 = 215;
    const Y_ROW_2 = 85;
    const Y_ROW_3 = 140;
    const Y_ROW_4 = 195;
    beforeEach(async () => {
        page = await newE2EPage();
        // absolutely position elements to simplify mouse manipulation
        await page.setContent(`
      <market-list id="list-1" style="position: absolute; width: 200px; top: 0; left: 0;">
        <market-row drag-handle-position="leading">Row 1.1</market-row>
        <market-row drag-handle-position="leading">Row 1.2</market-row>
        <market-row drag-handle-position="leading">Row 1.3</market-row>
        <market-row drag-handle-position="leading">Row 1.4</market-row>
        <market-row drag-handle-position="leading">Row 1.5</market-row>
      </market-list>
      <market-list id="list-2" style="position: absolute; width: 200px; top: 0; left: 200px;">
        <market-row drag-handle-position="leading">Row 2.1</market-row>
        <market-row drag-handle-position="leading">Row 2.2</market-row>
        <market-row drag-handle-position="leading">Row 2.3</market-row>
        <market-row drag-handle-position="leading">Row 2.4</market-row>
        <market-row drag-handle-position="leading">Row 2.5</market-row>
      </market-list>
    `);
        list1 = await page.find('#list-1');
        list1Rows = await page.findAll('#list-1 > market-row');
        list1ReorderedSpy = await list1.spyOnEvent('marketListItemsReordered');
        list2 = await page.find('#list-2');
        list2Rows = await page.findAll('#list-2 > market-row');
        list2ReorderedSpy = await list2.spyOnEvent('marketListItemsReordered');
        draggedRowNode = (await page.$eval('#list-1 > market-row:nth-child(3)', (el) => el));
    });
    describe('when both lists are NOT reorderable (off)', () => {
        it('does NOT set the list rows to be drag enabled', () => {
            list1Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(false);
            });
            list2Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(false);
            });
        });
    });
    describe('when both lists are internally reorderable', () => {
        beforeEach(async () => {
            list1.setProperty('reorderable', 'internal');
            list2.setProperty('reorderable', 'internal');
            await page.waitForChanges();
        });
        it('sets the list rows to be drag enabled', () => {
            list1Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(true);
            });
            list2Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(true);
            });
        });
        describe('when a row is dragged upwards', () => {
            beforeEach(async () => {
                // drag 3rd row between 1st and 2nd rows
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_1, y: Y_ROW_2 - ROW_H / 2 };
                await drag(page, from, to);
                list1Rows = await page.findAll('#list-1 > market-row');
            });
            it('fires the reordered event', () => {
                expect(list1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 1,
                });
            });
            it('moves the row to proper position', () => {
                expect(list1Rows.map((row) => row.innerText)).toEqual(['Row 1.1', 'Row 1.3', 'Row 1.2', 'Row 1.4', 'Row 1.5']);
            });
        });
        describe('when a row is dragged downwards', () => {
            beforeEach(async () => {
                // drag 3rd row between 4th and 5th rows
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_1, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                list1Rows = await page.findAll('#list-1 > market-row');
            });
            it('fires the reordered event', () => {
                expect(list1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 3,
                });
            });
            it('moves the row to the proper position', () => {
                expect(list1Rows.map((row) => row.innerText)).toEqual(['Row 1.1', 'Row 1.2', 'Row 1.4', 'Row 1.3', 'Row 1.5']);
            });
        });
        describe('when preventDefault is called on the reordered event', () => {
            beforeEach(async () => {
                await page.$eval('#list-1', (el) => {
                    el.addEventListener('marketListItemsReordered', (e) => {
                        e.preventDefault();
                    });
                });
                // drag 3rd row between 1st and 2nd rows
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_1, y: Y_ROW_2 - ROW_H / 2 };
                await drag(page, from, to);
                list1Rows = await page.findAll('#list-1 > market-row');
            });
            it('fires the reordered event', () => {
                expect(list1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 1,
                });
            });
            it('does NOT move the row', () => {
                expect(list1Rows.map((row) => row.innerText)).toEqual(['Row 1.1', 'Row 1.2', 'Row 1.3', 'Row 1.4', 'Row 1.5']);
            });
        });
        describe('when a row is dragged from one list to the other', () => {
            beforeEach(async () => {
                // drag 3rd row in list 1 between 4th and 5th rows in list 2
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_2, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                list1Rows = await page.findAll('#list-1 > market-row');
                list2Rows = await page.findAll('#list-2 > market-row');
            });
            it('does NOT fire the reordered event on either list', () => {
                expect(list1ReorderedSpy).not.toHaveReceivedEvent();
                expect(list2ReorderedSpy).not.toHaveReceivedEvent();
            });
            it('does NOT move the row', () => {
                expect(list1Rows.map((row) => row.innerText)).toEqual(['Row 1.1', 'Row 1.2', 'Row 1.3', 'Row 1.4', 'Row 1.5']);
                expect(list2Rows.map((row) => row.innerText)).toEqual(['Row 2.1', 'Row 2.2', 'Row 2.3', 'Row 2.4', 'Row 2.5']);
            });
        });
    });
    describe('when one list is internally reorderable and the other is externally reorderable', () => {
        beforeEach(async () => {
            list1.setProperty('reorderable', 'internal');
            list2.setProperty('reorderable', 'external');
            await page.waitForChanges();
        });
        describe('when a row is dragged from the internal list to the external list', () => {
            beforeEach(async () => {
                // drag 3rd row in list 1 between 4th and 5th rows in list 2
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_2, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                list1Rows = await page.findAll('#list-1 > market-row');
                list2Rows = await page.findAll('#list-2 > market-row');
            });
            it('does NOT fire the reordered event on either list', () => {
                expect(list1ReorderedSpy).not.toHaveReceivedEvent();
                expect(list2ReorderedSpy).not.toHaveReceivedEvent();
            });
            it('does NOT remove the row from the internal list', () => {
                expect(list1Rows.map((row) => row.innerText)).toEqual(['Row 1.1', 'Row 1.2', 'Row 1.3', 'Row 1.4', 'Row 1.5']);
            });
            it('does NOT add the row to the external list', () => {
                expect(list2Rows.map((row) => row.innerText)).toEqual(['Row 2.1', 'Row 2.2', 'Row 2.3', 'Row 2.4', 'Row 2.5']);
            });
        });
        describe('when a row is dragged from the external list to the internal list', () => {
            beforeEach(async () => {
                // drag 3rd row in list 2 between 4th and 5th rows in list 1
                const from = { x: X_LIST_2, y: Y_ROW_3 };
                const to = { x: X_LIST_1, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                list1Rows = await page.findAll('#list-1 > market-row');
                list2Rows = await page.findAll('#list-2 > market-row');
            });
            it('does NOT fire the reordered event on either list', () => {
                expect(list1ReorderedSpy).not.toHaveReceivedEvent();
                expect(list2ReorderedSpy).not.toHaveReceivedEvent();
            });
            it('does NOT add the row to the internal list', () => {
                expect(list1Rows.map((row) => row.innerText)).toEqual(['Row 1.1', 'Row 1.2', 'Row 1.3', 'Row 1.4', 'Row 1.5']);
            });
            it('does NOT remove the row from the external list', () => {
                expect(list2Rows.map((row) => row.innerText)).toEqual(['Row 2.1', 'Row 2.2', 'Row 2.3', 'Row 2.4', 'Row 2.5']);
            });
        });
    });
    describe('when both lists are externally reorderable', () => {
        beforeEach(async () => {
            list1.setProperty('reorderable', 'external');
            list2.setProperty('reorderable', 'external');
            await page.waitForChanges();
        });
        it('sets the list rows to be drag enabled', () => {
            list1Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(true);
            });
            list2Rows.forEach(async (row) => {
                expect(await row.getProperty('dragEnabled')).toEqual(true);
            });
        });
        describe('when a row is dragged from the first list to the second', () => {
            beforeEach(async () => {
                // drag 3rd row in list 1 between 4th and 5th rows in list 2
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_2, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                list1Rows = await page.findAll('#list-1 > market-row');
                list2Rows = await page.findAll('#list-2 > market-row');
            });
            it('fires the reordered event on the list the row exited', () => {
                expect(list1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: -1,
                });
            });
            it('fires the reordered event on the list the row entered', () => {
                expect(list2ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list2ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: -1,
                    newIndex: 4,
                });
            });
            it('removes the row from the first list', () => {
                expect(list1Rows.map((row) => row.innerText)).toEqual(['Row 1.1', 'Row 1.2', 'Row 1.4', 'Row 1.5']);
            });
            it('adds the row to the second list in the proper position', () => {
                expect(list2Rows.map((row) => row.innerText)).toEqual([
                    'Row 2.1',
                    'Row 2.2',
                    'Row 2.3',
                    'Row 2.4',
                    'Row 1.3',
                    'Row 2.5',
                ]);
            });
        });
        describe('when a row is dragged from the second list to the first', () => {
            beforeEach(async () => {
                // drag 3rd row in list 2 between 4th and 5th rows in list 1
                const from = { x: X_LIST_2, y: Y_ROW_3 };
                const to = { x: X_LIST_1, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                list1Rows = await page.findAll('#list-1 > market-row');
                list2Rows = await page.findAll('#list-2 > market-row');
            });
            it('fires the reordered event on the list the row exited', () => {
                expect(list2ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list2ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: -1,
                });
            });
            it('fires the reordered event on the list the row entered', () => {
                expect(list1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: -1,
                    newIndex: 4,
                });
            });
            it('removes the row from the second list', () => {
                expect(list2Rows.map((row) => row.innerText)).toEqual(['Row 2.1', 'Row 2.2', 'Row 2.4', 'Row 2.5']);
            });
            it('adds the row to the first list in the proper position', () => {
                expect(list1Rows.map((row) => row.innerText)).toEqual([
                    'Row 1.1',
                    'Row 1.2',
                    'Row 1.3',
                    'Row 1.4',
                    'Row 2.3',
                    'Row 1.5',
                ]);
            });
        });
        describe('when preventDefault is called on the first list reordered event', () => {
            beforeEach(async () => {
                await page.$eval('#list-1', (el) => {
                    el.addEventListener('marketListItemsReordered', (e) => {
                        e.preventDefault();
                    });
                });
                // drag 3rd row in list 1 between 4th and 5th rows in list 2
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_2, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                list1Rows = await page.findAll('#list-1 > market-row');
                list2Rows = await page.findAll('#list-2 > market-row');
            });
            it('fires the reordered event on the list the row exited', () => {
                expect(list1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: -1,
                });
            });
            it('does NOT fire the reordered event on the list the row entered', () => {
                expect(list2ReorderedSpy).not.toHaveReceivedEvent();
            });
            it('does NOT remove the row from the first list', () => {
                expect(list1Rows.map((row) => row.innerText)).toEqual(['Row 1.1', 'Row 1.2', 'Row 1.3', 'Row 1.4', 'Row 1.5']);
            });
            it('does NOT add the row to the second list', () => {
                expect(list2Rows.map((row) => row.innerText)).toEqual(['Row 2.1', 'Row 2.2', 'Row 2.3', 'Row 2.4', 'Row 2.5']);
            });
        });
        describe('when preventDefault is called on the second list reordered event', () => {
            beforeEach(async () => {
                await page.$eval('#list-2', (el) => {
                    el.addEventListener('marketListItemsReordered', (e) => {
                        e.preventDefault();
                    });
                });
                // drag 3rd row in list 1 between 4th and 5th rows in list 2
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_2, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                list1Rows = await page.findAll('#list-1 > market-row');
                list2Rows = await page.findAll('#list-2 > market-row');
            });
            it('fires the reordered event on the list the row exited', () => {
                expect(list1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: -1,
                });
            });
            it('fires the reordered event on the list the row entered', () => {
                expect(list2ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list2ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: -1,
                    newIndex: 4,
                });
            });
            it('does NOT remove the row from the first list', () => {
                expect(list1Rows.map((row) => row.innerText)).toEqual(['Row 1.1', 'Row 1.2', 'Row 1.3', 'Row 1.4', 'Row 1.5']);
            });
            it('does NOT add the row to the second list', () => {
                expect(list2Rows.map((row) => row.innerText)).toEqual(['Row 2.1', 'Row 2.2', 'Row 2.3', 'Row 2.4', 'Row 2.5']);
            });
        });
    });
    describe('when the list is reorderable in framework mode', () => {
        let rowLabels;
        beforeEach(async () => {
            page = await newE2EPage();
            // absolutely position elements to simplify mouse manipulation
            await page.setContent(`
        <market-list
          id="list-1"
          reorderable="internal"
          reorder-mode="framework"
          style="position: absolute; width: 200px; top: 0; left: 0;"
        >
          <market-row drag-handle-position="leading">
            <label slot="label">Row 1</label>
          </market-row>
          <market-row drag-handle-position="leading">
            <label slot="label">Row 2</label>
          </market-row>
          <market-row drag-handle-position="leading" class="drag-me">
            <label slot="label">Row 3</label>
          </market-row>
          <market-row drag-handle-position="leading">
            <label slot="label">Row 4</label>
          </market-row>
          <market-row drag-handle-position="leading">
            <label slot="label">Row 5</label>
          </market-row>
        </market-list>
      `);
            list1 = await page.find('#list-1');
            list1ReorderedSpy = await list1.spyOnEvent('marketListItemsReordered');
            draggedRowNode = (await page.$eval('#list-1 market-row:nth-child(3)', (el) => el));
        });
        describe('when a row is dragged upwards', () => {
            beforeEach(async () => {
                // drag 3rd row between 1st and 2nd rows
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_1, y: Y_ROW_2 - ROW_H / 2 };
                await drag(page, from, to);
                rowLabels = await page.findAll('#list-1 > market-row > label');
            });
            it('fires the reordered event', () => {
                expect(list1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 1,
                });
            });
            it('returns the row to its original position (for the framework to take over)', () => {
                expect(rowLabels.map((row) => row.innerText)).toEqual(['Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5']);
            });
        });
        describe('when a row is dragged downwards', () => {
            beforeEach(async () => {
                // drag 3rd row between 4th and 5th rows
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_1, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                rowLabels = await page.findAll('#list-1 > market-row > label');
            });
            it('fires the reordered event', () => {
                expect(list1ReorderedSpy).toHaveReceivedEventTimes(1);
                expect(list1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 3,
                });
            });
            it('returns the row to its original position (for the framework to take over)', () => {
                expect(rowLabels.map((row) => row.innerText)).toEqual(['Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5']);
            });
        });
    });
    describe('when the list rows have nested rows', () => {
        let rowLabels;
        beforeEach(async () => {
            page = await newE2EPage();
            // absolutely position elements to simplify mouse manipulation
            await page.setContent(`
        <market-list reorderable="internal" id="list-1" style="position: absolute; width: 200px; top: 0; left: 0;">
          <market-row drag-handle-position="leading">
            <label slot="label">Row 1</label>
            <market-dropdown slot="trailing-accessory">
              <span slot="trigger">More</span>
              <market-popover slot="popover">
                <market-list>
                  <market-row>Nested Row 1</market-row>
                  <market-row>Nested Row 2</market-row>
                  <market-row>Nested Row 3</market-row>
                </market-list>
              </market-popover>
            </market-dropdown>
          </market-row>
          <market-row drag-handle-position="leading">
            <label slot="label">Row 2</label>
            <market-dropdown slot="trailing-accessory">
              <span slot="trigger">More</span>
              <market-popover slot="popover">
                <market-list>
                  <market-row>Nested Row 1</market-row>
                  <market-row>Nested Row 2</market-row>
                  <market-row>Nested Row 3</market-row>
                </market-list>
              </market-popover>
            </market-dropdown>
          </market-row>
          <market-row drag-handle-position="leading" class="drag-me">
            <label slot="label">Row 3</label>
            <market-dropdown slot="trailing-accessory">
              <span slot="trigger">More</span>
              <market-popover slot="popover">
                <market-list>
                  <market-row>Nested Row 1</market-row>
                  <market-row>Nested Row 2</market-row>
                  <market-row>Nested Row 3</market-row>
                </market-list>
              </market-popover>
            </market-dropdown>
          </market-row>
          <market-row drag-handle-position="leading">
            <label slot="label">Row 4</label>
            <market-dropdown slot="trailing-accessory">
              <span slot="trigger">More</span>
              <market-popover slot="popover">
                <market-list>
                  <market-row>Nested Row 1</market-row>
                  <market-row>Nested Row 2</market-row>
                  <market-row>Nested Row 3</market-row>
                </market-list>
              </market-popover>
            </market-dropdown>
          </market-row>
          <market-row drag-handle-position="leading">
            <label slot="label">Row 5</label>
            <market-dropdown slot="trailing-accessory">
              <span slot="trigger">More</span>
              <market-popover slot="popover">
                <market-list>
                  <market-row>Nested Row 1</market-row>
                  <market-row>Nested Row 2</market-row>
                  <market-row>Nested Row 3</market-row>
                </market-list>
              </market-popover>
            </market-dropdown>
          </market-row>
        </market-list>
      `);
            list1 = await page.find('#list-1');
            list1ReorderedSpy = await list1.spyOnEvent('marketListItemsReordered');
            draggedRowNode = (await page.$eval('#list-1 market-row:nth-child(3)', (el) => el));
        });
        describe('when a row is dragged upwards', () => {
            beforeEach(async () => {
                // drag 3rd row between 1st and 2nd rows
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_1, y: Y_ROW_2 - ROW_H / 2 };
                await drag(page, from, to);
                rowLabels = await page.findAll('#list-1 > market-row > label');
            });
            it('fires the reordered event', () => {
                expect(list1ReorderedSpy).toHaveReceivedEventTimes(1);
                // expect event detail to ignore nested row indices
                expect(list1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 1,
                });
            });
            it('moves the row to proper position', () => {
                expect(rowLabels.map((row) => row.innerText)).toEqual(['Row 1', 'Row 3', 'Row 2', 'Row 4', 'Row 5']);
            });
        });
        describe('when a row is dragged downwards', () => {
            beforeEach(async () => {
                // drag 3rd row between 4th and 5th rows
                const from = { x: X_LIST_1, y: Y_ROW_3 };
                const to = { x: X_LIST_1, y: Y_ROW_4 + ROW_H / 2 };
                await drag(page, from, to);
                rowLabels = await page.findAll('#list-1 > market-row > label');
            });
            it('fires the reordered event', () => {
                expect(list1ReorderedSpy).toHaveReceivedEventTimes(1);
                // expect event detail to ignore nested row indices
                expect(list1ReorderedSpy).toHaveReceivedEventDetail({
                    item: draggedRowNode,
                    oldIndex: 2,
                    newIndex: 3,
                });
            });
            it('moves the row to the proper position', () => {
                expect(rowLabels.map((row) => row.innerText)).toEqual(['Row 1', 'Row 2', 'Row 4', 'Row 3', 'Row 5']);
            });
        });
    });
});
//# sourceMappingURL=market-list.reorderable.e2e.js.map
