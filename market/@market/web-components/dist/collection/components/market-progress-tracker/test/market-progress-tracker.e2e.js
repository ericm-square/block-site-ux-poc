import { newE2EPage } from "@stencil/core/testing";
describe('market-progress-tracker', () => {
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
    it('renders with default attributes and props', async () => {
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
        expect(await el.isVisible()).toStrictEqual(true);
        expect(stepEls).toHaveLength(3);
        expect(await stepEls[0].isVisible()).toStrictEqual(true);
        expect(await stepEls[1].isVisible()).toStrictEqual(true);
        expect(await stepEls[2].isVisible()).toStrictEqual(true);
        expect(el).not.toHaveAttribute('connectorless');
        expect(await el.getProperty('connectorless')).toStrictEqual(false);
        expect(el).not.toHaveAttribute('compact');
        expect(await el.getProperty('compact')).toStrictEqual(false);
        expect(el).not.toHaveAttribute('currentStepIndex');
        expect(await el.getProperty('currentStepIndex')).toBeUndefined();
        expect(el).not.toHaveAttribute('indicator');
        expect(await el.getProperty('indicator')).toBeUndefined();
        expect(el).not.toHaveAttribute('interactive');
        expect(await el.getProperty('interactive')).toStrictEqual(false);
        expect(el).not.toHaveAttribute('orientation');
        expect(await el.getProperty('orientation')).toStrictEqual('vertical');
        expect(el).not.toHaveAttribute('reversed');
        expect(await el.getProperty('reversed')).toStrictEqual(false);
        expect(el).toEqualAttribute('size', 'medium');
        expect(await el.getProperty('size')).toStrictEqual('medium');
    });
    it('propagates compact, indicator, interactive, orientation, and size props to child step components', async () => {
        await setContent(`
      <market-progress-tracker
        compact
        indicator="check"
        interactive
        orientation="horizontal"
        size="small"
      >
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
        for (let i = 0; i < 3; ++i) {
            expect(await stepEls[i].getProperty('compact')).toStrictEqual(true);
            expect(await stepEls[i].getProperty('indicator')).toStrictEqual('check');
            expect(await stepEls[i].getProperty('interactive')).toStrictEqual(true);
            expect(await stepEls[i].getProperty('orientation')).toStrictEqual('horizontal');
            expect(await stepEls[i].getProperty('size')).toStrictEqual('small');
        }
    });
    describe('dynamically adding a new step', () => {
        beforeEach(async () => {
            await setContent(`
        <market-progress-tracker
          compact
          current-step-index="1"
          indicator="check"
          interactive
          orientation="horizontal"
          size="small"
        >
          <market-progress-tracker-step>
            <label slot="label">Step 1</label>
          </market-progress-tracker-step>
          <market-progress-tracker-step>
            <label slot="label">Step 2</label>
          </market-progress-tracker-step>
        </market-progress-tracker>
      `);
            // add a step between "Step 1" and "Step 2"
            await page.$eval('market-progress-tracker', (progressTrackerEl) => {
                const newStepEl = document.createElement('market-progress-tracker-step');
                newStepEl.textContent = 'Step 1.5';
                const stepEls = progressTrackerEl.querySelector('market-progress-tracker-step');
                progressTrackerEl.insertBefore(newStepEl, stepEls[1]);
            });
            await page.waitForChanges();
            stepEls = await el.findAll('market-progress-tracker-step');
        });
        it('propagates props to the new step', async () => {
            expect(await stepEls[1].getProperty('compact')).toStrictEqual(true);
            expect(await stepEls[1].getProperty('indicator')).toStrictEqual('check');
            expect(await stepEls[1].getProperty('interactive')).toStrictEqual(true);
            expect(await stepEls[1].getProperty('orientation')).toStrictEqual('horizontal');
            expect(await stepEls[1].getProperty('size')).toStrictEqual('small');
        });
        it('updates data-step-index on all steps', () => {
            expect(stepEls[0]).toEqualAttribute('data-step-index', '0');
            expect(stepEls[1]).toEqualAttribute('data-step-index', '1');
            expect(stepEls[2]).toEqualAttribute('data-step-index', '2');
        });
        it('updates the active and completes props', async () => {
            expect(await stepEls[0].getProperty('active')).toStrictEqual(false);
            expect(await stepEls[1].getProperty('active')).toStrictEqual(true);
            expect(await stepEls[2].getProperty('active')).toStrictEqual(false);
            expect(await stepEls[0].getProperty('completed')).toStrictEqual(true);
            expect(await stepEls[1].getProperty('completed')).toStrictEqual(false);
            expect(await stepEls[2].getProperty('completed')).toStrictEqual(false);
        });
    });
});
//# sourceMappingURL=market-progress-tracker.e2e.js.map
