import { newE2EPage } from "@stencil/core/testing";
describe('market-table', () => {
    let page;
    let rows;
    let columns;
    describe('basic use case', () => {
        // no sticky rows or columns, no custom grid
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table>
          <market-table-row slot="header">
            <market-table-column name="left">Left</market-table-column>
            <market-table-column name="middle">Middle</market-table-column>
            <market-table-column name="right">Right</market-table-column>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell 1</market-table-cell>
            <market-table-cell>Cell 2</market-table-cell>
            <market-table-cell>Cell 3</market-table-cell>
          </market-table-row>
        </market-table>
      `);
            rows = await page.findAll('market-table-row');
            columns = await page.findAll('market-table-column');
        });
        it('a row can be stuck and unstuck', async () => {
            await rows[1].callMethod('stick', 'top');
            await page.waitForChanges();
            let slot = await rows[1].getAttribute('slot');
            expect(slot).toBe('sticky-header');
            await rows[1].callMethod('stick', 'bottom');
            await page.waitForChanges();
            slot = await rows[1].getAttribute('slot');
            expect(slot).toBe('sticky-footer');
            await rows[1].callMethod('unstick');
            await page.waitForChanges();
            slot = await rows[1].getAttribute('slot');
            expect(slot).toBe(null);
        });
        it('a column can be stuck and unstuck', async () => {
            await columns[1].callMethod('stick', 'left');
            await page.waitForChanges();
            let slot = await columns[1].getAttribute('slot');
            expect(slot).toBe('sticky-left');
            await columns[1].callMethod('stick', 'right');
            await page.waitForChanges();
            slot = await columns[1].getAttribute('slot');
            expect(slot).toBe('sticky-right');
            await columns[1].callMethod('unstick');
            await page.waitForChanges();
            slot = await columns[1].getAttribute('slot');
            expect(slot).toBe(null);
        });
    });
    describe('when used with a sticky header/footer', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table>
          <market-table-row slot="header" sticky>
            <market-table-column name="left">Header 1</market-table-column>
            <market-table-column name="middle">Header 2</market-table-column>
            <market-table-column name="right">Header 3</market-table-column>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell 1</market-table-cell>
            <market-table-cell>Cell 2</market-table-cell>
            <market-table-cell>Cell 3</market-table-cell>
          </market-table-row>
          <market-table-row slot="footer" sticky>
          <market-table-cell>Footer 1</market-table-cell>
          <market-table-cell>Cell 2</market-table-cell>
          <market-table-cell>Cell 3</market-table-cell>
          </market-table-row>
        </market-table>
      `);
            rows = await page.findAll('market-table-row');
            columns = await page.findAll('market-table-column');
        });
        it('header/footer rows with the sticky attribute get assigned to the correct slot', async () => {
            const header = rows[0];
            const footer = rows[2];
            const headerSlot = await header.getAttribute('slot');
            expect(headerSlot).toBe('sticky-header');
            const footerSlot = await footer.getAttribute('slot');
            expect(footerSlot).toBe('sticky-footer');
        });
        it('multiple rows can be stuck at a time', async () => {
            let headerSlot = await rows[0].getAttribute('slot');
            expect(headerSlot).toBe('sticky-header');
            let rowSlot = await rows[1].getAttribute('slot');
            expect(rowSlot).toBe(null);
            await rows[1].callMethod('stick', 'top');
            await page.waitForChanges();
            headerSlot = await rows[0].getAttribute('slot');
            expect(headerSlot).toBe('sticky-header');
            rowSlot = await rows[1].getAttribute('slot');
            expect(rowSlot).toBe('sticky-header');
        });
    });
    describe('when used with grid-template-columns', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table style="grid-template-columns: 50px 75px 100px;">
          <market-table-row slot="header">
            <market-table-column name="left">Left</market-table-column>
            <market-table-column name="middle">Middle</market-table-column>
            <market-table-column name="right">Right</market-table-column>
          </market-table-row>
          <market-table-row>
            <market-table-cell>Cell 1</market-table-cell>
            <market-table-cell>Cell 2</market-table-cell>
            <market-table-cell>Cell 3</market-table-cell>
          </market-table-row>
        </market-table>
      `);
            rows = await page.findAll('market-table-row');
            columns = await page.findAll('market-table-column');
        });
        it('market-table-rows inherit their gridTemplate value correctly', async () => {
            const rowComputedStyles = await page.evaluate(() => {
                const headerRow = document.querySelector('market-table-row');
                return JSON.parse(JSON.stringify(getComputedStyle(headerRow)));
            });
            expect(rowComputedStyles.gridTemplateColumns).toEqual('50px 75px 100px');
        });
        it('market-table-columns inherit their width correctly', async () => {
            const colWidths = await Promise.all(columns.map(async (column) => {
                const width = await column.getProperty('width');
                return width;
            })).then((output) => {
                return output;
            });
            expect(colWidths).toEqual(['50px', '75px', '100px']);
        });
        it('market-table-columns remain correct width after a column has been stuck', async () => {
            await columns[1].callMethod('stick', 'left');
            await page.waitForChanges();
            const rowComputedStyles = await page.evaluate(() => {
                const headerRow = document.querySelector('market-table-row');
                return JSON.parse(JSON.stringify(getComputedStyle(headerRow)));
            });
            expect(rowComputedStyles.gridTemplateColumns).toEqual('75px 50px 100px');
            const colWidth = await columns[1].getProperty('width');
            expect(colWidth).toBe('75px');
        });
        it('when a column is unstuck, the market-table-area wrapping the empty sticky slot is deactivated', async () => {
            const getTableAreaProperties = () => {
                return page.evaluate(() => {
                    const row = document.querySelectorAll('market-table-row')[1];
                    const tableAreas = [...row.shadowRoot.querySelectorAll('market-table-area')];
                    return tableAreas.map((tableArea) => {
                        const stickTo = tableArea.getAttribute('stick-to');
                        const active = tableArea.hasAttribute('active');
                        return {
                            stickTo,
                            active,
                        };
                    });
                });
            };
            // before sticking anything
            let tableAreaProperties = await getTableAreaProperties();
            expect(tableAreaProperties).toEqual([
                { stickTo: 'left', active: false },
                { stickTo: null, active: true }, // only default slot/area is active
                { stickTo: 'right', active: false },
            ]);
            // sticking middle column to the right
            await columns[1].callMethod('stick', 'right');
            await page.waitForChanges();
            tableAreaProperties = await getTableAreaProperties();
            expect(tableAreaProperties).toEqual([
                { stickTo: 'left', active: false },
                { stickTo: null, active: true },
                { stickTo: 'right', active: true }, // sticky-right area active
            ]);
            // unsticking previously stuck middle column
            await columns[1].callMethod('unstick');
            await page.waitForChanges();
            tableAreaProperties = await getTableAreaProperties();
            expect(tableAreaProperties).toEqual([
                { stickTo: 'left', active: false },
                { stickTo: null, active: true },
                { stickTo: 'right', active: false }, // sticky-right area inactive
            ]);
        });
    });
    describe('nested rows', () => {
        let page;
        let row;
        let nestedRow;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table>
          <market-table-row class="nonNestedRow">
            <market-table-cell>Apple</market-table-cell>
          </market-table-row>
          <market-table-row class="nestedRow" leading-indentation="1">
            <market-table-cell>Fuji</market-table-cell>
          </market-table-row>
        </market-table>
      `);
            row = await page.find('market-table-row.nonNestedRow');
            nestedRow = await page.find('market-table-row.nestedRow');
        });
        it('has correct indentation', async () => {
            const rowFirstCell = await row.find('market-table-cell');
            const rowFirstCellStyle = await rowFirstCell.getComputedStyle();
            expect(rowFirstCellStyle.paddingLeft).toEqual('8px');
            const nestedRowFirstCell = await nestedRow.find('market-table-cell');
            const nestedRowFirstCellStyle = await nestedRowFirstCell.getComputedStyle();
            expect(nestedRowFirstCellStyle.paddingLeft).toEqual('48px');
        });
    });
    describe('nested rows with accordion items', () => {
        let page;
        let accordionButton;
        let topLevelRow1;
        let topLevelRow2;
        let nestedRow;
        let clickEvent;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table>
          <market-accordion-item>
            <market-table-row interactive slot="custom-trigger">
              <market-table-cell>Apple</market-table-cell>
            </market-table-row>
            <market-table-row class="nestedRow">
              <market-table-cell>Fuji</market-table-cell>
            </market-table-row>
          </market-accordion-item>
          <market-table-row interactive class="topLevelRow2">
            <market-table-cell>Orange</market-table-cell>
          </market-table-row>
        </market-table>
      `);
            topLevelRow1 = await page.find('market-table-row[slot=custom-trigger]');
            accordionButton = await topLevelRow1.find('[slot="nested-row-indicator"]');
            topLevelRow2 = await page.find('market-table-row.topLevelRow2');
            nestedRow = await page.find('market-table-row.nestedRow');
            clickEvent = await page.spyOnEvent('marketTableRowClicked');
        });
        it('has indentation on nested row', async () => {
            await accordionButton.click();
            expect(clickEvent).toHaveReceivedEventTimes(0);
            const topLevelRow1FirstCell = await topLevelRow1.find('market-table-cell');
            const topLevel1CellStyle = await topLevelRow1FirstCell.getComputedStyle();
            expect(topLevel1CellStyle.paddingLeft).toEqual('8px');
            const nestedRowFirstCell = await nestedRow.find('market-table-cell');
            const nestedCellStyle = await nestedRowFirstCell.getComputedStyle();
            expect(nestedCellStyle.paddingLeft).toEqual('78px');
            const topLevelRow2FirstCell = await topLevelRow2.find('market-table-cell');
            const topLevel2CellStyle = await topLevelRow2FirstCell.getComputedStyle();
            expect(topLevel2CellStyle.paddingLeft).toEqual('38px');
        });
    });
});
//# sourceMappingURL=market-table.e2e.js.map
