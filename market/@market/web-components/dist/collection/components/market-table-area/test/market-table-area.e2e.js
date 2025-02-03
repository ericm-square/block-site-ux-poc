import { newE2EPage } from "@stencil/core/testing";
describe('market-table-area', () => {
    it("correctly inherits gridTemplate value from the parent market-table's styles", async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-table style="grid-template-columns: 50px 100px 100px;">
        <market-table-row slot="header">
          <market-table-column name="one">Column 1</market-table-column>
          <market-table-column name="two">Column 2</market-table-column>
          <market-table-column name="three">Column 3</market-table-column>
        </market-table-row>
        <market-table-row>
          <market-table-cell>Cell 1</market-table-cell>
          <market-table-cell>Cell 2</market-table-cell>
          <market-table-cell>Cell 3</market-table-cell>
        </market-table-row>
      </market-table>
    `);
        const headerRow = await page.find('market-table-row[slot="header"]');
        // by default (with no sticky areas) there is only one active market-table-area in a row
        const activeTableArea = await headerRow.find('pierce/market-table-area[active]');
        const gridTemplate = await activeTableArea.getProperty('gridTemplate');
        expect(gridTemplate).toEqual(['50px', '100px', '100px']);
    });
});
//# sourceMappingURL=market-table-area.e2e.js.map
