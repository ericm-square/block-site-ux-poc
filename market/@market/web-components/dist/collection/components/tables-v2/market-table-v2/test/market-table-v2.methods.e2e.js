import { newE2EPage } from "@stencil/core/testing";
describe('market-table-v2-group: methods', () => {
    let page;
    let el;
    let row;
    let header;
    let footer;
    let group;
    describe('setSelected()', () => {
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
            describe('when setSelected(true) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'true');
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
            describe('when setSelected(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false');
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
            describe('when setSelected(true) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'true');
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
            describe('when setSelected(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setSelected', 'false');
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
        });
    });
});
//# sourceMappingURL=market-table-v2.methods.e2e.js.map
