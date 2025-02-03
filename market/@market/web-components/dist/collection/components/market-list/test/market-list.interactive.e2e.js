import { newE2EPage } from "@stencil/core/testing";
describe('market-list: interactive', () => {
    let page;
    let rows;
    describe('single select', () => {
        describe('with market-radio control', () => {
            let controls;
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <div class="container">
            <market-list interactive>
              <market-row>
                <label slot="label">Apple</label>
                <market-radio slot="control"></market-radio>
              </market-row>
              <market-row>
                <label slot="label">Orange</label>
                <market-radio slot="control"></market-radio>
              </market-row>
              <market-row>
                <label slot="label">Pear</label>
                <market-radio slot="control"></market-radio>
              </market-row>
            </market-list>
          </div>
        `);
                rows = await page.findAll('market-row');
                controls = await Promise.all(rows.map((row) => row.find('market-radio')));
            });
            it('renders controls', async () => {
                expect(controls.length).toStrictEqual(3);
                expect(await controls[0].isVisible()).toStrictEqual(true);
                expect(await controls[1].isVisible()).toStrictEqual(true);
                expect(await controls[2].isVisible()).toStrictEqual(true);
            });
            it('clicking on row selects that row exclusively', async () => {
                await rows[0].click();
                expect(await rows[0].getProperty('selected')).toStrictEqual(true);
                expect(await rows[1].getProperty('selected')).toStrictEqual(false);
                expect(await rows[2].getProperty('selected')).toStrictEqual(false);
                await rows[1].click();
                expect(await rows[0].getProperty('selected')).toStrictEqual(false);
                expect(await rows[1].getProperty('selected')).toStrictEqual(true);
                expect(await rows[2].getProperty('selected')).toStrictEqual(false);
                await rows[2].click();
                expect(await rows[0].getProperty('selected')).toStrictEqual(false);
                expect(await rows[1].getProperty('selected')).toStrictEqual(false);
                expect(await rows[2].getProperty('selected')).toStrictEqual(true);
            });
            it('clicking on a row’s control selects that row', async () => {
                await controls[0].click();
                expect(await rows[0].getProperty('selected')).toStrictEqual(true);
                expect(await rows[1].getProperty('selected')).toStrictEqual(false);
                expect(await rows[2].getProperty('selected')).toStrictEqual(false);
                await controls[1].click();
                expect(await rows[0].getProperty('selected')).toStrictEqual(false);
                expect(await rows[1].getProperty('selected')).toStrictEqual(true);
                expect(await rows[2].getProperty('selected')).toStrictEqual(false);
                await controls[2].click();
                expect(await rows[0].getProperty('selected')).toStrictEqual(false);
                expect(await rows[1].getProperty('selected')).toStrictEqual(false);
                expect(await rows[2].getProperty('selected')).toStrictEqual(true);
            });
            it('selecting a row also selects the control', async () => {
                await rows[0].click();
                expect(await controls[0].getProperty('selected')).toStrictEqual(true);
                expect(await controls[1].getProperty('selected')).toStrictEqual(false);
                expect(await controls[2].getProperty('selected')).toStrictEqual(false);
                await rows[1].click();
                expect(await controls[0].getProperty('selected')).toStrictEqual(false);
                expect(await controls[1].getProperty('selected')).toStrictEqual(true);
                expect(await controls[2].getProperty('selected')).toStrictEqual(false);
                await rows[2].click();
                expect(await controls[0].getProperty('selected')).toStrictEqual(false);
                expect(await controls[1].getProperty('selected')).toStrictEqual(false);
                expect(await controls[2].getProperty('selected')).toStrictEqual(true);
            });
        });
    });
});
//# sourceMappingURL=market-list.interactive.e2e.js.map
