import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-cell', () => {
    let page;
    let el;
    let caretButton;
    let sortButton;
    let cellClickSpy;
    let caretClickSpy;
    let sortClickSpy;
    describe('when rendered with defaults', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-cell>Cell</market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            caretButton = await el.find('pierce/button.caret-button');
        });
        it('renders correctly', () => {
            expect(el).not.toBeNull();
            expect(el.getAttribute('role')).toBe('cell');
            expect(el).not.toHaveAttribute('caret');
            expect(el).not.toHaveAttribute('indent');
        });
        it('does NOT render the caret button', () => {
            expect(caretButton).toBeNull();
        });
        it('is NOT selected', async () => {
            expect(await el.getProperty('selected')).toBe('false');
        });
    });
    describe('when rendered with a caret', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-cell caret="up">
          Cell
        </market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            caretButton = await el.find('pierce/button.caret-button');
        });
        it('renders the caret button', () => {
            expect(caretButton).not.toBeNull();
        });
        describe('when the caret button is clicked', () => {
            beforeEach(async () => {
                cellClickSpy = await el.spyOnEvent('click');
                caretClickSpy = await el.spyOnEvent('marketTableV2CellCaretClicked');
                await caretButton.click();
                await page.waitForChanges();
            });
            it('fires the caret click event', () => {
                expect(caretClickSpy).toHaveReceivedEventTimes(1);
            });
            it('does NOT bubble the native click event up to the cell', () => {
                expect(cellClickSpy).not.toHaveReceivedEvent();
            });
        });
    });
    describe('when rendered with sort button', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-cell sortable>
          Cell
        </market-table-v2-cell>
      `);
            el = await page.find('market-table-v2-cell');
            sortButton = await el.find('pierce/button.sort-button');
            sortClickSpy = await el.spyOnEvent('marketTableV2CellSortClicked');
        });
        it('renders the sort button', () => {
            expect(sortButton).not.toBeNull();
        });
        it('is not sorted', async () => {
            expect(await el.getProperty('sortOrder')).toBe('none');
            expect(el).not.toHaveAttribute('aria-sort');
        });
        describe('when the sort button is clicked', () => {
            beforeEach(async () => {
                await sortButton.click();
                await page.waitForChanges();
            });
            it('updates the sort order', async () => {
                expect(await el.getProperty('sortOrder')).toBe('ascending');
                expect(el.getAttribute('aria-sort')).toBe('ascending');
            });
            it('fires the click event', () => {
                expect(sortClickSpy).toHaveReceivedEventTimes(1);
                expect(sortClickSpy).toHaveReceivedEventDetail({ current: 'ascending', previous: 'none' });
            });
            describe('when the sort button is clicked again', () => {
                beforeEach(async () => {
                    await sortButton.click();
                    await page.waitForChanges();
                });
                it('updates the sort order', async () => {
                    expect(await el.getProperty('sortOrder')).toBe('descending');
                    expect(el.getAttribute('aria-sort')).toBe('descending');
                });
                it('fires the click event', () => {
                    expect(sortClickSpy).toHaveReceivedEventTimes(2);
                    expect(sortClickSpy).toHaveReceivedEventDetail({ current: 'descending', previous: 'ascending' });
                });
            });
        });
    });
});
//# sourceMappingURL=market-table-v2-cell.e2e.js.map
