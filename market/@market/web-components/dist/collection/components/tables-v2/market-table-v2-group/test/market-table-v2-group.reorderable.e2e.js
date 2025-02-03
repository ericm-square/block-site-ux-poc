import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-group: reorderable functionality', () => {
    let page;
    let el;
    describe('when the group is reorderable', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2-group reorderable="internal">
          <market-table-v2-row slot="parent">
            <market-table-v2-cell>Cell</market-table-v2-cell>
          </market-table-v2-row>
          <market-table-v2-row>
            <market-table-v2-cell>Cell</market-table-v2-cell>
          </market-table-v2-row>
        </market-table-v2-group>
      `);
            el = await page.find('market-table-v2-group');
        });
        describe('when a new row is added', () => {
            beforeEach(async () => {
                await page.$eval('market-table-v2-group', (el) => {
                    const newRow = document.createElement('market-table-v2-row');
                    newRow.id = 'new-row';
                    el.append(newRow);
                });
                await page.waitForChanges();
            });
            it('makes the new row drag enabled', async () => {
                const newRow = await el.find('#new-row');
                expect(newRow).toHaveAttribute('drag-enabled');
                expect(await newRow.getProperty('dragEnabled')).toEqual(true);
            });
        });
    });
});
//# sourceMappingURL=market-table-v2-group.reorderable.e2e.js.map
