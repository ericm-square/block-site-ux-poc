import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2: nested reorderable functionality', () => {
    let page;
    let table;
    let headers;
    let stringHeader;
    let numberHeader;
    let dateHeader;
    let timeHeader;
    let functionHeader;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-table-v2>
        <market-table-v2-row header>
          <market-table-v2-cell sortable sort-strategy="string">
            Item
          </market-table-v2-cell>
          <market-table-v2-cell sortable sort-strategy="number">
            Qty
          </market-table-v2-cell>
          <market-table-v2-cell
            sortable
            sort-strategy="datetime"
            sort-strategy-format="M/d/yyyy"
          >
            Date
          </market-table-v2-cell>
          <market-table-v2-cell
            sortable
            sort-strategy="datetime"
            sort-strategy-format="h:mm aa"
          >
            Time
          </market-table-v2-cell>
          <market-table-v2-cell sortable> Price</market-table-v2-cell>
        </market-table-v2-row>
        <market-table-v2-group>
          <market-table-v2-row slot="parent">
            <market-table-v2-cell>Fruit</market-table-v2-cell>
            <market-table-v2-cell>177</market-table-v2-cell>
            <market-table-v2-cell>3/4/2084</market-table-v2-cell>
            <market-table-v2-cell>1:21 AM</market-table-v2-cell>
            <market-table-v2-cell>$5.67</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-group>
            <market-table-v2-row slot="parent">
              <market-table-v2-cell>Apple</market-table-v2-cell>
              <market-table-v2-cell>30</market-table-v2-cell>
              <market-table-v2-cell>12/7/1803</market-table-v2-cell>
              <market-table-v2-cell>8:09 AM</market-table-v2-cell>
              <market-table-v2-cell>$3.10</market-table-v2-cell>
            </market-table-v2-row>
            <market-table-v2-row>
              <market-table-v2-cell>Fuji</market-table-v2-cell>
              <market-table-v2-cell>10</market-table-v2-cell>
              <market-table-v2-cell>7/21/1870</market-table-v2-cell>
              <market-table-v2-cell>4:52 PM</market-table-v2-cell>
              <market-table-v2-cell>$3.24</market-table-v2-cell>
            </market-table-v2-row>
            <market-table-v2-row>
              <market-table-v2-cell>Gala</market-table-v2-cell>
              <market-table-v2-cell>15</market-table-v2-cell>
              <market-table-v2-cell>3/25/1907</market-table-v2-cell>
              <market-table-v2-cell>1:21 AM</market-table-v2-cell>
              <market-table-v2-cell>$2.98</market-table-v2-cell>
            </market-table-v2-row>
            <market-table-v2-row>
              <market-table-v2-cell>McIntosh</market-table-v2-cell>
              <market-table-v2-cell>5</market-table-v2-cell>
              <market-table-v2-cell>11/29/1860</market-table-v2-cell>
              <market-table-v2-cell>10:19 PM</market-table-v2-cell>
              <market-table-v2-cell>$3.12</market-table-v2-cell>
            </market-table-v2-row>
          </market-table-v2-group>
          <market-table-v2-row>
            <market-table-v2-cell>Banana</market-table-v2-cell>
            <market-table-v2-cell>80</market-table-v2-cell>
            <market-table-v2-cell>9/19/1944</market-table-v2-cell>
            <market-table-v2-cell>3:45 PM</market-table-v2-cell>
            <market-table-v2-cell>$2.34</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-group>
            <market-table-v2-row slot="parent">
              <market-table-v2-cell>Orange</market-table-v2-cell>
              <market-table-v2-cell>42</market-table-v2-cell>
              <market-table-v2-cell>3/4/2084</market-table-v2-cell>
              <market-table-v2-cell>2:00 PM</market-table-v2-cell>
              <market-table-v2-cell>$7.34</market-table-v2-cell>
            </market-table-v2-row>
            <market-table-v2-row>
              <market-table-v2-cell>Clementine</market-table-v2-cell>
              <market-table-v2-cell>19</market-table-v2-cell>
              <market-table-v2-cell>12/9/1934</market-table-v2-cell>
              <market-table-v2-cell>11:23 PM</market-table-v2-cell>
              <market-table-v2-cell>$5.12</market-table-v2-cell>
            </market-table-v2-row>
            <market-table-v2-row>
              <market-table-v2-cell>Mandarin</market-table-v2-cell>
              <market-table-v2-cell>3</market-table-v2-cell>
              <market-table-v2-cell>2/20/1953</market-table-v2-cell>
              <market-table-v2-cell>4:36 AM</market-table-v2-cell>
              <market-table-v2-cell>$6.78</market-table-v2-cell>
            </market-table-v2-row>
            <market-table-v2-row>
              <market-table-v2-cell>Tangerine</market-table-v2-cell>
              <market-table-v2-cell>20</market-table-v2-cell>
              <market-table-v2-cell>5/2/1856</market-table-v2-cell>
              <market-table-v2-cell>11:02 PM</market-table-v2-cell>
              <market-table-v2-cell>$4.56</market-table-v2-cell>
            </market-table-v2-row>
          </market-table-v2-group>
          <market-table-v2-row>
            <market-table-v2-cell>Peach</market-table-v2-cell>
            <market-table-v2-cell>23</market-table-v2-cell>
            <market-table-v2-cell>5/2/1856</market-table-v2-cell>
            <market-table-v2-cell>11:02 PM</market-table-v2-cell>
            <market-table-v2-cell>$4.56</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-row>
            <market-table-v2-cell>Pear</market-table-v2-cell>
            <market-table-v2-cell>2</market-table-v2-cell>
            <market-table-v2-cell>2/20/1953</market-table-v2-cell>
            <market-table-v2-cell>4:36 AM</market-table-v2-cell>
            <market-table-v2-cell>$6.78</market-table-v2-cell>
          </market-table-v2-row>
        </market-table-v2-group>
        <market-table-v2-group>
          <market-table-v2-row slot="parent">
            <market-table-v2-cell>Vegetables</market-table-v2-cell>
            <market-table-v2-cell>160</market-table-v2-cell>
            <market-table-v2-cell>3/4/2084</market-table-v2-cell>
            <market-table-v2-cell>1:21 AM</market-table-v2-cell>
            <market-table-v2-cell>$4.56</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-row>
            <market-table-v2-cell>Broccoli</market-table-v2-cell>
            <market-table-v2-cell>12</market-table-v2-cell>
            <market-table-v2-cell>12/7/1803</market-table-v2-cell>
            <market-table-v2-cell>8:09 AM</market-table-v2-cell>
            <market-table-v2-cell>$2.10</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-row>
            <market-table-v2-cell>Carrot</market-table-v2-cell>
            <market-table-v2-cell>32</market-table-v2-cell>
            <market-table-v2-cell>7/21/1870</market-table-v2-cell>
            <market-table-v2-cell>4:52 PM</market-table-v2-cell>
            <market-table-v2-cell>$1.24</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-row>
            <market-table-v2-cell>Cauliflower</market-table-v2-cell>
            <market-table-v2-cell>8</market-table-v2-cell>
            <market-table-v2-cell>3/25/1907</market-table-v2-cell>
            <market-table-v2-cell>1:21 AM</market-table-v2-cell>
            <market-table-v2-cell>$2.98</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-group>
            <market-table-v2-row slot="parent">
              <market-table-v2-cell>Onion</market-table-v2-cell>
              <market-table-v2-cell>101</market-table-v2-cell>
              <market-table-v2-cell>10/21/2050</market-table-v2-cell>
              <market-table-v2-cell>3:00 PM</market-table-v2-cell>
              <market-table-v2-cell>$1.23</market-table-v2-cell>
            </market-table-v2-row>
            <market-table-v2-row>
              <market-table-v2-cell>Red</market-table-v2-cell>
              <market-table-v2-cell>1</market-table-v2-cell>
              <market-table-v2-cell>5/23/1939</market-table-v2-cell>
              <market-table-v2-cell>12:00 PM</market-table-v2-cell>
              <market-table-v2-cell>$2.34</market-table-v2-cell>
            </market-table-v2-row>
            <market-table-v2-row>
              <market-table-v2-cell>White</market-table-v2-cell>
              <market-table-v2-cell>10</market-table-v2-cell>
              <market-table-v2-cell>8/12/1945</market-table-v2-cell>
              <market-table-v2-cell>1:00 PM</market-table-v2-cell>
              <market-table-v2-cell>$3.45</market-table-v2-cell>
            </market-table-v2-row>
            <market-table-v2-row>
              <market-table-v2-cell>Yellow</market-table-v2-cell>
              <market-table-v2-cell>90</market-table-v2-cell>
              <market-table-v2-cell>2/20/1953</market-table-v2-cell>
              <market-table-v2-cell>4:36 AM</market-table-v2-cell>
              <market-table-v2-cell>$4.56</market-table-v2-cell>
            </market-table-v2-row>
          </market-table-v2-group>
          <market-table-v2-row>
            <market-table-v2-cell>Potato</market-table-v2-cell>
            <market-table-v2-cell>7</market-table-v2-cell>
            <market-table-v2-cell>11/29/1860</market-table-v2-cell>
            <market-table-v2-cell>10:19 PM</market-table-v2-cell>
            <market-table-v2-cell>$3.12</market-table-v2-cell>
          </market-table-v2-row>
        </market-table-v2-group>
        <market-table-v2-group>
          <market-table-v2-row slot="parent">
            <market-table-v2-cell>Misc.</market-table-v2-cell>
            <market-table-v2-cell>101</market-table-v2-cell>
            <market-table-v2-cell>10/21/2050</market-table-v2-cell>
            <market-table-v2-cell>3:00 PM</market-table-v2-cell>
            <market-table-v2-cell>$1.23</market-table-v2-cell>
          </market-table-v2-row>
        </market-table-v2-group>
      </market-table-v2>
    `);
        table = await page.find('market-table-v2');
        headers = await table.findAll('market-table-v2-row[header] market-table-v2-cell');
        stringHeader = headers[0];
        numberHeader = headers[1];
        dateHeader = headers[2];
        timeHeader = headers[3];
        functionHeader = headers[4];
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
            const cells = await table.findAll('market-table-v2-cell:nth-of-type(1)');
            expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                'Item',
                'Fruit',
                'Apple',
                'Fuji',
                'Gala',
                'McIntosh',
                'Banana',
                'Orange',
                'Clementine',
                'Mandarin',
                'Tangerine',
                'Peach',
                'Pear',
                'Misc.',
                'Vegetables',
                'Broccoli',
                'Carrot',
                'Cauliflower',
                'Onion',
                'Red',
                'White',
                'Yellow',
                'Potato',
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
                const cells = await table.findAll('market-table-v2-cell:nth-of-type(1)');
                expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                    'Item',
                    'Vegetables',
                    'Potato',
                    'Onion',
                    'Yellow',
                    'White',
                    'Red',
                    'Cauliflower',
                    'Carrot',
                    'Broccoli',
                    'Misc.',
                    'Fruit',
                    'Pear',
                    'Peach',
                    'Orange',
                    'Tangerine',
                    'Mandarin',
                    'Clementine',
                    'Banana',
                    'Apple',
                    'McIntosh',
                    'Gala',
                    'Fuji',
                ]);
            });
        });
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
            const cells = await table.findAll('market-table-v2-cell:nth-of-type(2)');
            expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                'Qty',
                '101',
                '160',
                '7',
                '8',
                '12',
                '32',
                '101',
                '1',
                '10',
                '90',
                '177',
                '2',
                '23',
                '30',
                '5',
                '10',
                '15',
                '42',
                '3',
                '19',
                '20',
                '80',
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
                const cells = await table.findAll('market-table-v2-cell:nth-of-type(2)');
                expect(cells.map((cell) => cell.innerText.trim())).toEqual([
                    'Qty',
                    '177',
                    '80',
                    '42',
                    '20',
                    '19',
                    '3',
                    '30',
                    '15',
                    '10',
                    '5',
                    '23',
                    '2',
                    '160',
                    '101',
                    '90',
                    '10',
                    '1',
                    '32',
                    '12',
                    '8',
                    '7',
                    '101',
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
                '10/21/2050',
                '3/4/2084',
                '12/7/1803',
                '11/29/1860',
                '7/21/1870',
                '3/25/1907',
                '5/2/1856',
                '9/19/1944',
                '2/20/1953',
                '3/4/2084',
                '5/2/1856',
                '12/9/1934',
                '2/20/1953',
                '3/4/2084',
                '12/7/1803',
                '11/29/1860',
                '7/21/1870',
                '3/25/1907',
                '10/21/2050',
                '5/23/1939',
                '8/12/1945',
                '2/20/1953',
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
                    '3/4/2084',
                    '3/4/2084',
                    '2/20/1953',
                    '12/9/1934',
                    '5/2/1856',
                    '2/20/1953',
                    '9/19/1944',
                    '5/2/1856',
                    '12/7/1803',
                    '3/25/1907',
                    '7/21/1870',
                    '11/29/1860',
                    '3/4/2084',
                    '10/21/2050',
                    '2/20/1953',
                    '8/12/1945',
                    '5/23/1939',
                    '3/25/1907',
                    '7/21/1870',
                    '11/29/1860',
                    '12/7/1803',
                    '10/21/2050',
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
                '1:21 AM',
                '4:36 AM',
                '8:09 AM',
                '1:21 AM',
                '4:52 PM',
                '10:19 PM',
                '2:00 PM',
                '4:36 AM',
                '11:02 PM',
                '11:23 PM',
                '3:45 PM',
                '11:02 PM',
                '1:21 AM',
                '1:21 AM',
                '8:09 AM',
                '3:00 PM',
                '4:36 AM',
                '12:00 PM',
                '1:00 PM',
                '4:52 PM',
                '10:19 PM',
                '3:00 PM',
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
                    '3:00 PM',
                    '1:21 AM',
                    '11:02 PM',
                    '3:45 PM',
                    '2:00 PM',
                    '11:23 PM',
                    '11:02 PM',
                    '4:36 AM',
                    '8:09 AM',
                    '10:19 PM',
                    '4:52 PM',
                    '1:21 AM',
                    '4:36 AM',
                    '1:21 AM',
                    '10:19 PM',
                    '4:52 PM',
                    '3:00 PM',
                    '1:00 PM',
                    '12:00 PM',
                    '4:36 AM',
                    '8:09 AM',
                    '1:21 AM',
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
                'Price',
                '$1.23',
                '$4.56',
                '$1.23',
                '$2.34',
                '$3.45',
                '$4.56',
                '$1.24',
                '$2.10',
                '$2.98',
                '$3.12',
                '$5.67',
                '$2.34',
                '$3.10',
                '$2.98',
                '$3.12',
                '$3.24',
                '$4.56',
                '$6.78',
                '$7.34',
                '$4.56',
                '$5.12',
                '$6.78',
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
                    'Price',
                    '$5.67',
                    '$7.34',
                    '$6.78',
                    '$5.12',
                    '$4.56',
                    '$6.78',
                    '$4.56',
                    '$3.10',
                    '$3.24',
                    '$3.12',
                    '$2.98',
                    '$2.34',
                    '$4.56',
                    '$3.12',
                    '$2.98',
                    '$2.10',
                    '$1.24',
                    '$1.23',
                    '$4.56',
                    '$3.45',
                    '$2.34',
                    '$1.23',
                ]);
            });
        });
    });
});
//# sourceMappingURL=market-table-v2.sortable.nested.e2e.js.map
