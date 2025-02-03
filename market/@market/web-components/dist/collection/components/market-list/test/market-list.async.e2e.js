import { newE2EPage } from "@stencil/core/testing";
describe('market-list: async', () => {
    let page;
    let rows;
    it('should update control row count when more rows are added later', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-list interactive multiselect>
        <market-row slot="control-row">
          <label slot="label">Select all</label>
          <market-radio slot="control"></market-radio>
        </market-row>
        <market-row value="apple">
          <label slot="label">Apple</label>
          <market-radio slot="control"></market-radio>
        </market-row>
      </market-list>
    `);
        rows = await page.findAll('market-row');
        let countEl = await rows[0].find('.count');
        expect(countEl.textContent).toStrictEqual('1');
        // select all
        await rows[0].click();
        expect(rows[0]).toHaveAttribute('selected');
        expect(rows[1]).toHaveAttribute('selected');
        // add 3 new rows after 2 seconds
        await page.$eval('.market-list', async (listEl) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            ['banana', 'mango', 'watermelon'].forEach((fruit) => {
                const rowEl = document.createElement('market-row');
                rowEl.setAttribute('value', fruit);
                const labelEl = document.createElement('label');
                labelEl.setAttribute('slot', 'label');
                labelEl.textContent = fruit;
                const radioEl = document.createElement('market-radio');
                radioEl.setAttribute('slot', 'control');
                rowEl.appendChild(labelEl);
                rowEl.appendChild(radioEl);
                listEl.appendChild(rowEl);
            });
        });
        await page.waitForSelector('market-row:nth-child(5)');
        // count is updated
        countEl = await rows[0].find('.count');
        expect(countEl.textContent).toStrictEqual('4');
        // "Select all" should not be selected, and as well as the new rows
        const updatedRows = await page.findAll('market-row');
        expect(updatedRows[0]).not.toHaveAttribute('selected');
        expect(updatedRows[1]).toHaveAttribute('selected');
        expect(updatedRows[2]).not.toHaveAttribute('selected');
        expect(updatedRows[3]).not.toHaveAttribute('selected');
        expect(updatedRows[4]).not.toHaveAttribute('selected');
        // select all again
        await updatedRows[0].click();
        expect(updatedRows[0]).toHaveAttribute('selected');
        expect(updatedRows[1]).toHaveAttribute('selected');
        expect(updatedRows[2]).toHaveAttribute('selected');
        expect(updatedRows[3]).toHaveAttribute('selected');
        expect(updatedRows[4]).toHaveAttribute('selected');
        // unselect all
        await updatedRows[0].click();
        expect(updatedRows[0]).not.toHaveAttribute('selected');
        expect(updatedRows[1]).not.toHaveAttribute('selected');
        expect(updatedRows[2]).not.toHaveAttribute('selected');
        expect(updatedRows[3]).not.toHaveAttribute('selected');
        expect(updatedRows[4]).not.toHaveAttribute('selected');
    });
});
//# sourceMappingURL=market-list.async.e2e.js.map
