import { newE2EPage } from "@stencil/core/testing";
describe('market-progress-tracker: current-step-index', () => {
    let page;
    let el;
    let stepEls;
    beforeEach(async () => {
        page = await newE2EPage();
    });
    async function setContent(html) {
        await page.setContent(html);
        await page.waitForChanges();
        el = await page.find('market-progress-tracker');
        stepEls = await el.findAll('market-progress-tracker-step');
    }
    it('is undefined', async () => {
        await setContent(`
      <market-progress-tracker>
        <market-progress-tracker-step>
          <label slot="label">Step 1</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 2</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 3</label>
        </market-progress-tracker-step>
      </market-progress-tracker>
    `);
        expect(await stepEls[0].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[1].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[2].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[0].getProperty('completed')).toStrictEqual(false);
        expect(await stepEls[1].getProperty('completed')).toStrictEqual(false);
        expect(await stepEls[2].getProperty('completed')).toStrictEqual(false);
    });
    it('is -1', async () => {
        await setContent(`
      <market-progress-tracker current-step-index="-1">
        <market-progress-tracker-step>
          <label slot="label">Step 1</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 2</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 3</label>
        </market-progress-tracker-step>
      </market-progress-tracker>
    `);
        expect(await stepEls[0].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[1].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[2].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[0].getProperty('completed')).toStrictEqual(false);
        expect(await stepEls[1].getProperty('completed')).toStrictEqual(false);
        expect(await stepEls[2].getProperty('completed')).toStrictEqual(false);
    });
    it('is 0', async () => {
        await setContent(`
      <market-progress-tracker current-step-index="0">
        <market-progress-tracker-step>
          <label slot="label">Step 1</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 2</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 3</label>
        </market-progress-tracker-step>
      </market-progress-tracker>
    `);
        expect(await stepEls[0].getProperty('active')).toStrictEqual(true);
        expect(await stepEls[1].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[2].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[0].getProperty('completed')).toStrictEqual(false);
        expect(await stepEls[1].getProperty('completed')).toStrictEqual(false);
        expect(await stepEls[2].getProperty('completed')).toStrictEqual(false);
    });
    it('is 1', async () => {
        await setContent(`
      <market-progress-tracker current-step-index="1">
        <market-progress-tracker-step>
          <label slot="label">Step 1</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 2</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 3</label>
        </market-progress-tracker-step>
      </market-progress-tracker>
    `);
        expect(await stepEls[0].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[1].getProperty('active')).toStrictEqual(true);
        expect(await stepEls[2].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[0].getProperty('completed')).toStrictEqual(true);
        expect(await stepEls[1].getProperty('completed')).toStrictEqual(false);
        expect(await stepEls[2].getProperty('completed')).toStrictEqual(false);
    });
    it('is 2', async () => {
        await setContent(`
      <market-progress-tracker current-step-index="2">
        <market-progress-tracker-step>
          <label slot="label">Step 1</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 2</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 3</label>
        </market-progress-tracker-step>
      </market-progress-tracker>
    `);
        expect(await stepEls[0].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[1].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[2].getProperty('active')).toStrictEqual(true);
        expect(await stepEls[0].getProperty('completed')).toStrictEqual(true);
        expect(await stepEls[1].getProperty('completed')).toStrictEqual(true);
        expect(await stepEls[2].getProperty('completed')).toStrictEqual(false);
    });
    it('is 3', async () => {
        await setContent(`
      <market-progress-tracker current-step-index="3">
        <market-progress-tracker-step>
          <label slot="label">Step 1</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 2</label>
        </market-progress-tracker-step>
        <market-progress-tracker-step>
          <label slot="label">Step 3</label>
        </market-progress-tracker-step>
      </market-progress-tracker>
    `);
        expect(await stepEls[0].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[1].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[2].getProperty('active')).toStrictEqual(false);
        expect(await stepEls[0].getProperty('completed')).toStrictEqual(true);
        expect(await stepEls[1].getProperty('completed')).toStrictEqual(true);
        expect(await stepEls[2].getProperty('completed')).toStrictEqual(true);
    });
    describe('reversed', () => {
        it('is 0', async () => {
            await setContent(`
        <market-progress-tracker current-step-index="0" reversed>
          <market-progress-tracker-step>
            <label slot="label">Step 3</label>
          </market-progress-tracker-step>
          <market-progress-tracker-step>
            <label slot="label">Step 2</label>
          </market-progress-tracker-step>
          <market-progress-tracker-step>
            <label slot="label">Step 1</label>
          </market-progress-tracker-step>
        </market-progress-tracker>
      `);
            expect(await stepEls[0].getProperty('active')).toStrictEqual(false);
            expect(await stepEls[1].getProperty('active')).toStrictEqual(false);
            expect(await stepEls[2].getProperty('active')).toStrictEqual(true);
            expect(await stepEls[0].getProperty('completed')).toStrictEqual(false);
            expect(await stepEls[1].getProperty('completed')).toStrictEqual(false);
            expect(await stepEls[2].getProperty('completed')).toStrictEqual(false);
        });
        it('is 1', async () => {
            await setContent(`
        <market-progress-tracker current-step-index="1" reversed>
          <market-progress-tracker-step>
            <label slot="label">Step 3</label>
          </market-progress-tracker-step>
          <market-progress-tracker-step>
            <label slot="label">Step 2</label>
          </market-progress-tracker-step>
          <market-progress-tracker-step>
            <label slot="label">Step 1</label>
          </market-progress-tracker-step>
        </market-progress-tracker>
      `);
            expect(await stepEls[0].getProperty('active')).toStrictEqual(false);
            expect(await stepEls[1].getProperty('active')).toStrictEqual(true);
            expect(await stepEls[2].getProperty('active')).toStrictEqual(false);
            expect(await stepEls[0].getProperty('completed')).toStrictEqual(false);
            expect(await stepEls[1].getProperty('completed')).toStrictEqual(false);
            expect(await stepEls[2].getProperty('completed')).toStrictEqual(true);
        });
        it('is 2', async () => {
            await setContent(`
        <market-progress-tracker current-step-index="2" reversed>
          <market-progress-tracker-step>
            <label slot="label">Step 3</label>
          </market-progress-tracker-step>
          <market-progress-tracker-step>
            <label slot="label">Step 2</label>
          </market-progress-tracker-step>
          <market-progress-tracker-step>
            <label slot="label">Step 1</label>
          </market-progress-tracker-step>
        </market-progress-tracker>
      `);
            expect(await stepEls[0].getProperty('active')).toStrictEqual(true);
            expect(await stepEls[1].getProperty('active')).toStrictEqual(false);
            expect(await stepEls[2].getProperty('active')).toStrictEqual(false);
            expect(await stepEls[0].getProperty('completed')).toStrictEqual(false);
            expect(await stepEls[1].getProperty('completed')).toStrictEqual(true);
            expect(await stepEls[2].getProperty('completed')).toStrictEqual(true);
        });
        it('is 3', async () => {
            await setContent(`
        <market-progress-tracker current-step-index="3" reversed>
          <market-progress-tracker-step>
            <label slot="label">Step 3</label>
          </market-progress-tracker-step>
          <market-progress-tracker-step>
            <label slot="label">Step 2</label>
          </market-progress-tracker-step>
          <market-progress-tracker-step>
            <label slot="label">Step 1</label>
          </market-progress-tracker-step>
        </market-progress-tracker>
      `);
            expect(await stepEls[0].getProperty('active')).toStrictEqual(false);
            expect(await stepEls[1].getProperty('active')).toStrictEqual(false);
            expect(await stepEls[2].getProperty('active')).toStrictEqual(false);
            expect(await stepEls[0].getProperty('completed')).toStrictEqual(true);
            expect(await stepEls[1].getProperty('completed')).toStrictEqual(true);
            expect(await stepEls[2].getProperty('completed')).toStrictEqual(true);
        });
    });
});
//# sourceMappingURL=market-progress-tracker.current-step-index.e2e.js.map
