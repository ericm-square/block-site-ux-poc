import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2: reorderable functionality', () => {
    let page;
    let table;
    let headers;
    let numberHeader;
    let stringHeader;
    let dateHeader;
    let timeHeader;
    let functionHeader;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-table-v2>
        <market-table-v2-row header>
          <market-table-v2-cell sortable sort-strategy="number">
            Number
          </market-table-v2-cell>
          <market-table-v2-cell sortable sort-strategy="string">
            String
          </market-table-v2-cell>
          <market-table-v2-cell sortable sort-strategy="datetime" sort-strategy-format="MM/dd/yyyy">
            Date
          </market-table-v2-cell>
          <market-table-v2-cell sortable sort-strategy="datetime" sort-strategy-format="h:mm aa">
            Time
          </market-table-v2-cell>
          <market-table-v2-cell sortable>
            Function
          </market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row>
          <market-table-v2-cell> 3.14 </market-table-v2-cell>
          <market-table-v2-cell> Eerie </market-table-v2-cell>
          <market-table-v2-cell> 12/31/1999 </market-table-v2-cell>
          <market-table-v2-cell> 11:11 AM </market-table-v2-cell>
          <market-table-v2-cell> $1,012.12 </market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row>
          <market-table-v2-cell> 42 </market-table-v2-cell>
          <market-table-v2-cell> Zebra </market-table-v2-cell>
          <market-table-v2-cell> 02/03/2024 </market-table-v2-cell>
          <market-table-v2-cell> 5:16 PM </market-table-v2-cell>
          <market-table-v2-cell> $448.20 </market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row>
          <market-table-v2-cell> -0.9 </market-table-v2-cell>
          <market-table-v2-cell> ascot </market-table-v2-cell>
          <market-table-v2-cell> 06/25/1982 </market-table-v2-cell>
          <market-table-v2-cell> 3:02 PM </market-table-v2-cell>
          <market-table-v2-cell> $2,344,330.20 </market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row>
          <market-table-v2-cell> 999 </market-table-v2-cell>
          <market-table-v2-cell> Wonderful </market-table-v2-cell>
          <market-table-v2-cell> 07/04/1776 </market-table-v2-cell>
          <market-table-v2-cell> 12:32 AM </market-table-v2-cell>
          <market-table-v2-cell> $76.03 </market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row>
          <market-table-v2-cell> 0 </market-table-v2-cell>
          <market-table-v2-cell> Aardvark </market-table-v2-cell>
          <market-table-v2-cell> 04/05/2063 </market-table-v2-cell>
          <market-table-v2-cell> 2:05 PM </market-table-v2-cell>
          <market-table-v2-cell> $9.99 </market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row>
          <market-table-v2-cell> -1 </market-table-v2-cell>
          <market-table-v2-cell> wonder </market-table-v2-cell>
          <market-table-v2-cell> 03/10/1984 </market-table-v2-cell>
          <market-table-v2-cell> 9:00 AM </market-table-v2-cell>
          <market-table-v2-cell> $25.00 </market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-row footer>
          <market-table-v2-cell> Number </market-table-v2-cell>
          <market-table-v2-cell> String </market-table-v2-cell>
          <market-table-v2-cell> Date </market-table-v2-cell>
          <market-table-v2-cell> Time </market-table-v2-cell>
          <market-table-v2-cell> Function </market-table-v2-cell>
        </market-table-v2-row>
      </market-table-v2>
    `);
        table = await page.find('market-table-v2');
        headers = await table.findAll('market-table-v2-row[header] market-table-v2-cell');
        numberHeader = headers[0];
        stringHeader = headers[1];
        dateHeader = headers[2];
        timeHeader = headers[3];
        functionHeader = headers[4];
    });
    describe('clicking the number header', () => {
        beforeEach(async () => {
            await numberHeader.click();
            await page.waitForChanges();
        });
        it('sets the header to ascending', async () => {
            expect(numberHeader.getAttribute('aria-sort')).toEqual('ascending');
            expect(await numberHeader.getProperty('sortOrder')).toEqual('ascending');
        });
        it('sorts the rows ascending by number', async () => {
            const cells = await table.findAll('market-table-v2-cell:nth-of-type(1)');
            expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                'Number',
                '-1',
                '-0.9',
                '0',
                '3.14',
                '42',
                '999',
                'Number',
            ]);
        });
        describe('clicking the number header again', () => {
            beforeEach(async () => {
                await numberHeader.click();
                await page.waitForChanges();
            });
            it('sets the header to descending', async () => {
                expect(numberHeader.getAttribute('aria-sort')).toEqual('descending');
                expect(await numberHeader.getProperty('sortOrder')).toEqual('descending');
            });
            it('sorts the rows descending by number', async () => {
                const cells = await table.findAll('market-table-v2-cell:nth-of-type(1)');
                expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                    'Number',
                    '999',
                    '42',
                    '3.14',
                    '0',
                    '-0.9',
                    '-1',
                    'Number',
                ]);
            });
        });
    });
    describe('clicking the string header', () => {
        beforeEach(async () => {
            await stringHeader.click();
            await page.waitForChanges();
        });
        it('sets the header to ascending', async () => {
            expect(stringHeader.getAttribute('aria-sort')).toEqual('ascending');
            expect(await stringHeader.getProperty('sortOrder')).toEqual('ascending');
        });
        it('sorts the rows ascending by string', async () => {
            const cells = await table.findAll('market-table-v2-cell:nth-of-type(2)');
            expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                'String',
                'Aardvark',
                'ascot',
                'Eerie',
                'wonder',
                'Wonderful',
                'Zebra',
                'String',
            ]);
        });
        describe('clicking the string header again', () => {
            beforeEach(async () => {
                await stringHeader.click();
                await page.waitForChanges();
            });
            it('sets the header to descending', async () => {
                expect(stringHeader.getAttribute('aria-sort')).toEqual('descending');
                expect(await stringHeader.getProperty('sortOrder')).toEqual('descending');
            });
            it('sorts the rows descending by string', async () => {
                const cells = await table.findAll('market-table-v2-cell:nth-of-type(2)');
                expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                    'String',
                    'Zebra',
                    'Wonderful',
                    'wonder',
                    'Eerie',
                    'ascot',
                    'Aardvark',
                    'String',
                ]);
            });
        });
    });
    describe('clicking the date header', () => {
        beforeEach(async () => {
            await dateHeader.click();
            await page.waitForChanges();
        });
        it('sets the header to ascending', async () => {
            expect(dateHeader.getAttribute('aria-sort')).toEqual('ascending');
            expect(await dateHeader.getProperty('sortOrder')).toEqual('ascending');
        });
        it('sorts the rows ascending by date', async () => {
            const cells = await table.findAll('market-table-v2-cell:nth-of-type(3)');
            expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                'Date',
                '07/04/1776',
                '06/25/1982',
                '03/10/1984',
                '12/31/1999',
                '02/03/2024',
                '04/05/2063',
                'Date',
            ]);
        });
        describe('clicking the date header again', () => {
            beforeEach(async () => {
                await dateHeader.click();
                await page.waitForChanges();
            });
            it('sets the header to descending', async () => {
                expect(dateHeader.getAttribute('aria-sort')).toEqual('descending');
                expect(await dateHeader.getProperty('sortOrder')).toEqual('descending');
            });
            it('sorts the rows descending by date', async () => {
                const cells = await table.findAll('market-table-v2-cell:nth-of-type(3)');
                expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                    'Date',
                    '04/05/2063',
                    '02/03/2024',
                    '12/31/1999',
                    '03/10/1984',
                    '06/25/1982',
                    '07/04/1776',
                    'Date',
                ]);
            });
        });
    });
    describe('clicking the time header', () => {
        beforeEach(async () => {
            await timeHeader.click();
            await page.waitForChanges();
        });
        it('sets the header to ascending', async () => {
            expect(timeHeader.getAttribute('aria-sort')).toEqual('ascending');
            expect(await timeHeader.getProperty('sortOrder')).toEqual('ascending');
        });
        it('sorts the rows ascending by time', async () => {
            const cells = await table.findAll('market-table-v2-cell:nth-of-type(4)');
            expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                'Time',
                '12:32 AM',
                '9:00 AM',
                '11:11 AM',
                '2:05 PM',
                '3:02 PM',
                '5:16 PM',
                'Time',
            ]);
        });
        describe('clicking the time header again', () => {
            beforeEach(async () => {
                await timeHeader.click();
                await page.waitForChanges();
            });
            it('sets the header to descending', async () => {
                expect(timeHeader.getAttribute('aria-sort')).toEqual('descending');
                expect(await timeHeader.getProperty('sortOrder')).toEqual('descending');
            });
            it('sorts the rows descending by time', async () => {
                const cells = await table.findAll('market-table-v2-cell:nth-of-type(4)');
                expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                    'Time',
                    '5:16 PM',
                    '3:02 PM',
                    '2:05 PM',
                    '11:11 AM',
                    '9:00 AM',
                    '12:32 AM',
                    'Time',
                ]);
            });
        });
    });
    describe('clicking the function header with strategy set to a custom function', () => {
        beforeEach(async () => {
            await page.$eval('market-table-v2-row[header] market-table-v2-cell:nth-of-type(5)', (cell) => {
                cell.sortStrategy = ({ rowA, rowB, order, column }) => {
                    const stringA = rowA.children[column].textContent.trim();
                    const stringB = rowB.children[column].textContent.trim();
                    const numA = Number.parseFloat(stringA.replace(/[^\d.]+/g, ''));
                    const numB = Number.parseFloat(stringB.replace(/[^\d.]+/g, ''));
                    if (order === 'ascending') {
                        return numA - numB;
                    }
                    else {
                        return numB - numA;
                    }
                };
            });
            await page.waitForChanges();
            await functionHeader.click();
            await page.waitForChanges();
        });
        it('sets the header to ascending', async () => {
            expect(functionHeader.getAttribute('aria-sort')).toEqual('ascending');
            expect(await functionHeader.getProperty('sortOrder')).toEqual('ascending');
        });
        it('sorts the rows ascending using the function', async () => {
            const cells = await table.findAll('market-table-v2-cell:nth-of-type(5)');
            expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                'Function',
                '$9.99',
                '$25.00',
                '$76.03',
                '$448.20',
                '$1,012.12',
                '$2,344,330.20',
                'Function',
            ]);
        });
        describe('clicking the function header again', () => {
            beforeEach(async () => {
                await functionHeader.click();
                await page.waitForChanges();
            });
            it('sets the header to descending', async () => {
                expect(functionHeader.getAttribute('aria-sort')).toEqual('descending');
                expect(await functionHeader.getProperty('sortOrder')).toEqual('descending');
            });
            it('sorts the rows descending using the function', async () => {
                const cells = await table.findAll('market-table-v2-cell:nth-of-type(5)');
                expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                    'Function',
                    '$2,344,330.20',
                    '$1,012.12',
                    '$448.20',
                    '$76.03',
                    '$25.00',
                    '$9.99',
                    'Function',
                ]);
            });
        });
    });
});
//# sourceMappingURL=market-table-v2.sortable.e2e.js.map
