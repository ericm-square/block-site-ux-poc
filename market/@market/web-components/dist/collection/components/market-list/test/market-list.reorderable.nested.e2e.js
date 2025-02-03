import { newE2EPage } from "@stencil/core/testing";
import { drag } from "../../../utils/e2e/drag";
describe('market-list: nested reorderable functionality', () => {
    let page;
    let listOuter;
    let listOuterRowLabels;
    let listOuterReorderedSpy;
    let listInner;
    let listInnerRowLabels;
    let listInnerReorderedSpy;
    let draggedRowNode;
    // magic numbers to assist with mouse manipulation
    const ROW_H = 55;
    const X_LIST_INNER = 55;
    const X_LIST_OUTER = 15;
    const Y_ROW_1 = 115;
    const Y_ROW_1_1 = 70;
    const Y_ROW_1_2 = 125;
    const Y_ROW_2 = 260;
    const Y_ROW_3 = 310;
    beforeEach(async () => {
        page = await newE2EPage();
        // absolutely position elements to simplify mouse manipulation
        await page.setContent(`
      <market-list id="list-outer" reorderable="internal" style="position: absolute; width: 200px; top: 0; left: 0;">
        <market-row drag-handle-position="leading">
          <label slot="label">Row 1</label>
            <market-list id="list-inner" reorderable="internal">
              <market-row drag-handle-position="leading"><label slot="label">Row 1.1</label></market-row>
              <market-row drag-handle-position="leading"><label slot="label">Row 1.2</label></market-row>
              <market-row drag-handle-position="leading"><label slot="label">Row 1.3</label></market-row>
            </market-list>
        </market-row>
        <market-row drag-handle-position="leading">
          <label slot="label">Row 2</label>
        </market-row>
        <market-row drag-handle-position="leading">
          <label slot="label">Row 3</label>
        </market-row>
        <market-row drag-handle-position="leading">
          <label slot="label">Row 4</label>
        </market-row>
      </market-list>
    `);
        listOuter = await page.find('#list-outer');
        listOuterRowLabels = await page.findAll('#list-outer > market-row > label');
        listOuterReorderedSpy = await listOuter.spyOnEvent('marketListItemsReordered');
        listInner = await page.find('#list-inner');
        listInnerRowLabels = await page.findAll('#list-inner > market-row > label');
        listInnerReorderedSpy = await listInner.spyOnEvent('marketListItemsReordered');
    });
    describe('when the inner list is reordered', () => {
        beforeEach(async () => {
            // drag row 1.1 between rows 1.2 and 1.3
            draggedRowNode = (await page.$eval('#list-inner > market-row:nth-child(1)', (el) => el));
            const from = { x: X_LIST_INNER, y: Y_ROW_1_1 };
            const to = { x: X_LIST_INNER, y: Y_ROW_1_2 + ROW_H / 2 };
            await drag(page, from, to);
            listInnerRowLabels = await page.findAll('#list-inner > market-row > label');
        });
        it('reorders the inner list', () => {
            expect(listInnerRowLabels.map((label) => label.innerText)).toEqual(['Row 1.2', 'Row 1.1', 'Row 1.3']);
        });
        it('fires the reordered event on the inner row', () => {
            expect(listInnerReorderedSpy).toHaveReceivedEventTimes(1);
            expect(listInnerReorderedSpy).toHaveReceivedEventDetail({
                item: draggedRowNode,
                oldIndex: 0,
                newIndex: 1,
            });
        });
        it('does NOT fire the reordered event on the outer row', () => {
            expect(listOuterReorderedSpy).not.toHaveReceivedEvent();
        });
    });
    describe('when the outer list is reordered', () => {
        beforeEach(async () => {
            // drag row 2 between row 3 and row 4
            draggedRowNode = (await page.$eval('#list-outer > market-row:nth-child(2)', (el) => el));
            const from = { x: X_LIST_OUTER, y: Y_ROW_2 };
            const to = { x: X_LIST_OUTER, y: Y_ROW_3 + ROW_H / 2 };
            await drag(page, from, to);
            listOuterRowLabels = await page.findAll('#list-outer > market-row > label');
        });
        it('reorders the outer list', () => {
            expect(listOuterRowLabels.map((label) => label.innerText)).toEqual(['Row 1', 'Row 3', 'Row 2', 'Row 4']);
        });
        it('fires the reordered event on the outer row', () => {
            expect(listOuterReorderedSpy).toHaveReceivedEventTimes(1);
            expect(listOuterReorderedSpy).toHaveReceivedEventDetail({
                item: draggedRowNode,
                oldIndex: 1,
                newIndex: 2,
            });
        });
        it('does NOT fire the reordered event on the inner row', () => {
            expect(listInnerReorderedSpy).not.toHaveReceivedEvent();
        });
    });
    describe('when an inner list row is dragged to the outer list', () => {
        beforeEach(async () => {
            // drag row 1.2 between rows 2 and 3
            draggedRowNode = (await page.$eval('#list-inner > market-row:nth-child(2)', (el) => el));
            const from = { x: X_LIST_INNER, y: Y_ROW_1_2 };
            const to = { x: X_LIST_OUTER, y: Y_ROW_2 + ROW_H / 2 };
            await drag(page, from, to);
            listOuterRowLabels = await page.findAll('#list-outer > market-row > label');
            listInnerRowLabels = await page.findAll('#list-inner > market-row > label');
        });
        it('remmoves the row from the inner list', () => {
            expect(listInnerRowLabels.map((label) => label.innerText)).toEqual(['Row 1.1', 'Row 1.3']);
        });
        it('moves the row to the outer list', () => {
            // expect(listOuterRowLabels.map((label) => label.innerText)).toEqual([]);
            expect(listOuterRowLabels.map((label) => label.innerText)).toEqual([
                'Row 1',
                'Row 2',
                'Row 1.2',
                'Row 3',
                'Row 4',
            ]);
        });
        it('fires the reordered event on the inner row', () => {
            expect(listInnerReorderedSpy).toHaveReceivedEventTimes(1);
            expect(listInnerReorderedSpy).toHaveReceivedEventDetail({
                item: draggedRowNode,
                oldIndex: 1,
                newIndex: -1,
            });
        });
        it('fires the reordered event on the outer row', () => {
            expect(listOuterReorderedSpy).toHaveReceivedEventTimes(1);
            expect(listOuterReorderedSpy).toHaveReceivedEventDetail({
                item: draggedRowNode,
                oldIndex: -1,
                newIndex: 2,
            });
        });
    });
    describe('when an outer list row is dragged to the inner list', () => {
        beforeEach(async () => {
            // drag row 2 between rows 1.2 and 1.3
            draggedRowNode = (await page.$eval('#list-outer > market-row:nth-child(2)', (el) => el));
            const from = { x: X_LIST_OUTER, y: Y_ROW_2 };
            const to = { x: X_LIST_INNER, y: Y_ROW_1_2 + ROW_H / 2 };
            await drag(page, from, to);
            listOuterRowLabels = await page.findAll('#list-outer > market-row > label');
            listInnerRowLabels = await page.findAll('#list-inner > market-row > label');
        });
        it('remmoves the row from the outer list', () => {
            expect(listOuterRowLabels.map((label) => label.innerText)).toEqual(['Row 1', 'Row 3', 'Row 4']);
        });
        it('moves the row to the inner list', () => {
            expect(listInnerRowLabels.map((label) => label.innerText)).toEqual(['Row 1.1', 'Row 1.2', 'Row 2', 'Row 1.3']);
        });
        it('fires the reordered event on the outer row', () => {
            expect(listOuterReorderedSpy).toHaveReceivedEventTimes(1);
            expect(listOuterReorderedSpy).toHaveReceivedEventDetail({
                item: draggedRowNode,
                oldIndex: 1,
                newIndex: -1,
            });
        });
        it('fires the reordered event on the inner row', () => {
            expect(listInnerReorderedSpy).toHaveReceivedEventTimes(1);
            expect(listInnerReorderedSpy).toHaveReceivedEventDetail({
                item: draggedRowNode,
                oldIndex: -1,
                newIndex: 2,
            });
        });
    });
    describe('when the outer row with the nested inner list is reordered', () => {
        beforeEach(async () => {
            // drag row 1 between row 3 and row 4
            draggedRowNode = (await page.$eval('#list-outer > market-row:nth-child(2)', (el) => el));
            const from = { x: X_LIST_OUTER, y: Y_ROW_1 };
            const to = { x: X_LIST_OUTER, y: Y_ROW_3 + ROW_H / 2 };
            await drag(page, from, to);
            listOuterRowLabels = await page.findAll('#list-outer > market-row > label');
        });
        it('reorders the outer list', () => {
            expect(listOuterRowLabels.map((label) => label.innerText)).toEqual(['Row 2', 'Row 3', 'Row 1', 'Row 4']);
        });
        it('fires the reordered event on the outer row', () => {
            expect(listOuterReorderedSpy).toHaveReceivedEventTimes(1);
            expect(listOuterReorderedSpy).toHaveReceivedEventDetail({
                item: draggedRowNode,
                oldIndex: 0,
                newIndex: 2,
            });
        });
        it('does NOT fire the reordered event on the inner row', () => {
            expect(listInnerReorderedSpy).not.toHaveReceivedEvent();
        });
    });
});
//# sourceMappingURL=market-list.reorderable.nested.e2e.js.map
