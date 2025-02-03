import { newE2EPage } from "@stencil/core/testing";
describe('market-progress-tracker: connector', () => {
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
    it('sets default connectors; last step’s connector is hidden', async () => {
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
        expect(await stepEls[0].getProperty('connector')).toStrictEqual('inactive');
        expect(await stepEls[1].getProperty('connector')).toStrictEqual('inactive');
        expect(await stepEls[2].getProperty('connector')).toStrictEqual('hidden');
    });
    it('sets active connectors on completed steps; keeps last step’s connector as hidden', async () => {
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
        expect(await stepEls[0].getProperty('connector')).toStrictEqual('active');
        expect(await stepEls[1].getProperty('connector')).toStrictEqual('active');
        expect(await stepEls[2].getProperty('connector')).toStrictEqual('hidden');
    });
    it('can be connectorless, with current-step-index not set', async () => {
        await setContent(`
      <market-progress-tracker connectorless>
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
        expect(await stepEls[0].getProperty('connector')).toBeNull();
        expect(await stepEls[1].getProperty('connector')).toBeNull();
        expect(await stepEls[2].getProperty('connector')).toBeNull();
    });
    it('can be connectorless, with current-step-index set to 3; keeps last step’s connector as hidden', async () => {
        await setContent(`
      <market-progress-tracker connectorless current-step-index="3">
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
        expect(await stepEls[0].getProperty('connector')).toBeNull();
        expect(await stepEls[1].getProperty('connector')).toBeNull();
        expect(await stepEls[2].getProperty('connector')).toBeNull();
    });
});
//# sourceMappingURL=market-progress-tracker.connector.e2e.js.map
