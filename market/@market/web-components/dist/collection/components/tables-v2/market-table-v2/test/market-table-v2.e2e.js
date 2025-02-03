import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2', () => {
    let page;
    let el;
    let innerTable;
    let row;
    let header;
    let footer;
    let group;
    describe('when rendered with defaults', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2>
          <market-table-v2-row header></market-table-v2-row>  
          <market-table-v2-row class="normal-row"></market-table-v2-row>
          <market-table-v2-group>
            <market-table-v2-row slot="parent"></market-table-v2-row>
            <market-table-v2-row></market-table-v2-row>
          </market-table-v2-group>
          <market-table-v2-row footer></market-table-v2-row>  
        </market-table-v2>
      `);
            el = await page.find('market-table-v2');
            innerTable = await el.find('pierce/div');
            row = await el.find('market-table-v2-row.normal-row');
            header = await el.find('market-table-v2-row[header]');
            footer = await el.find('market-table-v2-row[footer]');
            group = await el.find('market-table-v2-group');
        });
        it('renders correctly', () => {
            expect(el).not.toBeNull();
            expect(el).not.toHaveAttribute('collapsible');
            expect(innerTable).not.toBeNull();
            expect(innerTable.getAttribute('role')).toBe('table');
        });
        describe('when collapsible', () => {
            beforeEach(async () => {
                el.setProperty('collapsible', true);
                await page.waitForChanges();
            });
            it('indents the child row', () => {
                expect(row.getAttribute('indent')).toBe('1');
            });
            it('does not indent the header row', () => {
                expect(header).not.toHaveAttribute('indent');
            });
            it('does not indent the footer row', () => {
                expect(footer).not.toHaveAttribute('indent');
            });
            it('sets the child group to collapsible', () => {
                expect(group).toHaveAttribute('collapsible');
            });
        });
    });
    describe('when rendered not selected', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2>
          <market-table-v2-row header></market-table-v2-row>  
          <market-table-v2-row class="normal-row"></market-table-v2-row>
          <market-table-v2-group>
            <market-table-v2-row slot="parent"></market-table-v2-row>
            <market-table-v2-row></market-table-v2-row>
          </market-table-v2-group>
          <market-table-v2-row footer></market-table-v2-row>  
        </market-table-v2>
      `);
            el = await page.find('market-table-v2');
            row = await el.find('market-table-v2-row.normal-row');
            header = await el.find('market-table-v2-row[header]');
            footer = await el.find('market-table-v2-row[footer]');
            group = await el.find('market-table-v2-group');
        });
        describe('when the header row is selected', () => {
            beforeEach(async () => {
                await header.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('selects the entire table', async () => {
                expect(await el.getProperty('selected')).toBe('true');
                expect(await header.getProperty('selected')).toBe('true');
                expect(await footer.getProperty('selected')).toBe('true');
                expect(await row.getProperty('selected')).toBe('true');
                expect(await group.getProperty('selected')).toBe('true');
            });
        });
        describe('when the footer row is selected', () => {
            beforeEach(async () => {
                await footer.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('selects the entire table', async () => {
                expect(await el.getProperty('selected')).toBe('true');
                expect(await header.getProperty('selected')).toBe('true');
                expect(await footer.getProperty('selected')).toBe('true');
                expect(await row.getProperty('selected')).toBe('true');
                expect(await group.getProperty('selected')).toBe('true');
            });
        });
        describe('when the child row is selected', () => {
            beforeEach(async () => {
                await row.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('sets the table to indeterminate', async () => {
                expect(await el.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the header to indeterminate', async () => {
                expect(await header.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the footer to indeterminate', async () => {
                expect(await footer.getProperty('selected')).toBe('indeterminate');
            });
            it('does not affect the children', async () => {
                expect(await row.getProperty('selected')).toBe('true');
                expect(await group.getProperty('selected')).toBe('false');
            });
        });
        describe('when the child group is selected', () => {
            beforeEach(async () => {
                await group.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('sets the table to indeterminate', async () => {
                expect(await el.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the header to indeterminate', async () => {
                expect(await header.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the footer to indeterminate', async () => {
                expect(await footer.getProperty('selected')).toBe('indeterminate');
            });
            it('does not affect the children', async () => {
                expect(await row.getProperty('selected')).toBe('false');
                expect(await group.getProperty('selected')).toBe('true');
            });
        });
    });
    describe('when rendered selected', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2 selected="true">
          <market-table-v2-row header selected="true"></market-table-v2-row>  
          <market-table-v2-row class="normal-row" selected="true"></market-table-v2-row>
          <market-table-v2-group selected="true">
            <market-table-v2-row slot="parent" selected="true"></market-table-v2-row>
            <market-table-v2-row selected="true"></market-table-v2-row>
          </market-table-v2-group>
          <market-table-v2-row footer selected="true"></market-table-v2-row>  
        </market-table-v2>
      `);
            el = await page.find('market-table-v2');
            row = await el.find('market-table-v2-row.normal-row');
            header = await el.find('market-table-v2-row[header]');
            footer = await el.find('market-table-v2-row[footer]');
            group = await el.find('market-table-v2-group');
        });
        describe('when the header row is deselected', () => {
            beforeEach(async () => {
                await header.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('deselects the entire table', async () => {
                expect(await el.getProperty('selected')).toBe('false');
                expect(await header.getProperty('selected')).toBe('false');
                expect(await footer.getProperty('selected')).toBe('false');
                expect(await row.getProperty('selected')).toBe('false');
                expect(await group.getProperty('selected')).toBe('false');
            });
        });
        describe('when the footer row is deselected', () => {
            beforeEach(async () => {
                await footer.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('deselects the entire table', async () => {
                expect(await el.getProperty('selected')).toBe('false');
                expect(await header.getProperty('selected')).toBe('false');
                expect(await footer.getProperty('selected')).toBe('false');
                expect(await row.getProperty('selected')).toBe('false');
                expect(await group.getProperty('selected')).toBe('false');
            });
        });
        describe('when the child row is deselected', () => {
            beforeEach(async () => {
                await row.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('sets the table to indeterminate', async () => {
                expect(await el.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the header to indeterminate', async () => {
                expect(await header.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the footer to indeterminate', async () => {
                expect(await footer.getProperty('selected')).toBe('indeterminate');
            });
            it('does not affect the children', async () => {
                expect(await row.getProperty('selected')).toBe('false');
                expect(await group.getProperty('selected')).toBe('true');
            });
        });
        describe('when the child group is deselected', () => {
            beforeEach(async () => {
                await group.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('sets the table to indeterminate', async () => {
                expect(await el.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the header to indeterminate', async () => {
                expect(await header.getProperty('selected')).toBe('indeterminate');
            });
            it('sets the footer to indeterminate', async () => {
                expect(await footer.getProperty('selected')).toBe('indeterminate');
            });
            it('does not affect the children', async () => {
                expect(await row.getProperty('selected')).toBe('true');
                expect(await group.getProperty('selected')).toBe('false');
            });
        });
    });
    describe('when rendered indeterminate', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-table-v2 selected="indeterminate">
          <market-table-v2-row header selected="indeterminate"></market-table-v2-row>  
          <market-table-v2-row class="normal-row" selected="false"></market-table-v2-row>
          <market-table-v2-group selected="true">
            <market-table-v2-row slot="parent"></market-table-v2-row>
            <market-table-v2-row></market-table-v2-row>
          </market-table-v2-group>
          <market-table-v2-row footer selected="indeterminate"></market-table-v2-row>  
        </market-table-v2>
      `);
            el = await page.find('market-table-v2');
            row = await el.find('market-table-v2-row.normal-row');
            header = await el.find('market-table-v2-row[header]');
            footer = await el.find('market-table-v2-row[footer]');
            group = await el.find('market-table-v2-group');
        });
        describe('when the header row is selected', () => {
            beforeEach(async () => {
                await header.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('selects the entire table', async () => {
                expect(await el.getProperty('selected')).toBe('true');
                expect(await header.getProperty('selected')).toBe('true');
                expect(await footer.getProperty('selected')).toBe('true');
                expect(await row.getProperty('selected')).toBe('true');
                expect(await group.getProperty('selected')).toBe('true');
            });
        });
        describe('when the footer row is selected', () => {
            beforeEach(async () => {
                await footer.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('selects the entire table', async () => {
                expect(await el.getProperty('selected')).toBe('true');
                expect(await header.getProperty('selected')).toBe('true');
                expect(await footer.getProperty('selected')).toBe('true');
                expect(await row.getProperty('selected')).toBe('true');
                expect(await group.getProperty('selected')).toBe('true');
            });
        });
        describe('when the child row is selected', () => {
            beforeEach(async () => {
                await row.callMethod('setSelected', 'true');
                await page.waitForChanges();
            });
            it('sets the table to selected', async () => {
                expect(await el.getProperty('selected')).toBe('true');
            });
            it('sets the header to selected', async () => {
                expect(await header.getProperty('selected')).toBe('true');
            });
            it('sets the footer to selected', async () => {
                expect(await footer.getProperty('selected')).toBe('true');
            });
            it('does not affect the children', async () => {
                expect(await row.getProperty('selected')).toBe('true');
                expect(await group.getProperty('selected')).toBe('true');
            });
        });
        describe('when the child group is deselected', () => {
            beforeEach(async () => {
                await group.callMethod('setSelected', 'false');
                await page.waitForChanges();
            });
            it('sets the table to unselected', async () => {
                expect(await el.getProperty('selected')).toBe('false');
            });
            it('sets the header to unselected', async () => {
                expect(await header.getProperty('selected')).toBe('false');
            });
            it('sets the footer to unselected', async () => {
                expect(await footer.getProperty('selected')).toBe('false');
            });
            it('does not affect the children', async () => {
                expect(await row.getProperty('selected')).toBe('false');
                expect(await group.getProperty('selected')).toBe('false');
            });
        });
    });
});
//# sourceMappingURL=market-table-v2.e2e.js.map
