import { newE2EPage } from "@stencil/core/testing";
describe('market-progress-tracker: interactive', () => {
    let page;
    let el;
    let stepEls;
    let marketProgressTrackerStepClickSpy;
    beforeEach(async () => {
        page = await newE2EPage();
    });
    async function setContent(html) {
        await page.setContent(html);
        await page.waitForChanges();
        el = await page.find('market-progress-tracker');
        stepEls = await el.findAll('market-progress-tracker-step');
        marketProgressTrackerStepClickSpy = await page.spyOnEvent('marketProgressTrackerStepClick');
    }
    it('renders with default attributes and props; steps are also interactive', async () => {
        await setContent(`
      <market-progress-tracker
        interactive
        orientation="horizontal"
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
        expect(el).toHaveAttribute('interactive');
        expect(await el.getProperty('interactive')).toStrictEqual(true);
        expect(el).toEqualAttribute('orientation', 'horizontal');
        expect(await el.getProperty('orientation')).toStrictEqual('horizontal');
        expect(stepEls[0]).toHaveAttribute('interactive');
        expect(await stepEls[0].getProperty('interactive')).toStrictEqual(true);
        expect(stepEls[1]).toHaveAttribute('interactive');
        expect(await stepEls[1].getProperty('interactive')).toStrictEqual(true);
        expect(stepEls[2]).toHaveAttribute('interactive');
        expect(await stepEls[2].getProperty('interactive')).toStrictEqual(true);
    });
    describe('clicking on a step', () => {
        describe('when current-step-index is defined', () => {
            it('updates current-step-index when a step is clicked', async () => {
                await setContent(`
          <market-progress-tracker
            current-step-index="-1"
            interactive
            orientation="horizontal"
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
                await stepEls[0].click();
                expect(el).toEqualAttribute('current-step-index', '0');
                await stepEls[1].click();
                expect(el).toEqualAttribute('current-step-index', '1');
                await stepEls[2].click();
                expect(el).toEqualAttribute('current-step-index', '2');
                // can return to a previous step
                await stepEls[1].click();
                expect(el).toEqualAttribute('current-step-index', '1');
                await stepEls[0].click();
                expect(el).toEqualAttribute('current-step-index', '0');
            });
            it('emits marketProgressTrackerStepClick when a step is clicked', async () => {
                await setContent(`
          <market-progress-tracker
            current-step-index="-1"
            interactive
            orientation="horizontal"
          >
            <market-progress-tracker-step name="step-1">
              <label slot="label">Step 1</label>
            </market-progress-tracker-step>
            <market-progress-tracker-step name="step-2">
              <label slot="label">Step 2</label>
            </market-progress-tracker-step>
            <market-progress-tracker-step name="step-3">
              <label slot="label">Step 3</label>
            </market-progress-tracker-step>
          </market-progress-tracker>
        `);
                await stepEls[0].click();
                expect(marketProgressTrackerStepClickSpy.length).toStrictEqual(1);
                expect(marketProgressTrackerStepClickSpy).toHaveReceivedEventDetail({
                    index: 0,
                    name: 'step-1',
                });
                await stepEls[1].click();
                expect(marketProgressTrackerStepClickSpy.length).toStrictEqual(2);
                expect(marketProgressTrackerStepClickSpy).toHaveReceivedEventDetail({
                    index: 1,
                    name: 'step-2',
                });
                await stepEls[2].click();
                expect(marketProgressTrackerStepClickSpy.length).toStrictEqual(3);
                expect(marketProgressTrackerStepClickSpy).toHaveReceivedEventDetail({
                    index: 2,
                    name: 'step-3',
                });
            });
            it('emits with the correct event detail when the steps are reversed', async () => {
                await setContent(`
          <market-progress-tracker
            current-step-index="-1"
            interactive
            orientation="horizontal"
            reversed
          >
            <market-progress-tracker-step name="step-3">
              <label slot="label">Step 3</label>
            </market-progress-tracker-step>
            <market-progress-tracker-step name="step-2">
              <label slot="label">Step 2</label>
            </market-progress-tracker-step>
            <market-progress-tracker-step name="step-1">
              <label slot="label">Step 1</label>
            </market-progress-tracker-step>
          </market-progress-tracker>
        `);
                await stepEls[2].click();
                expect(marketProgressTrackerStepClickSpy.length).toStrictEqual(1);
                expect(marketProgressTrackerStepClickSpy).toHaveReceivedEventDetail({
                    index: 0,
                    name: 'step-1',
                });
                await stepEls[1].click();
                expect(marketProgressTrackerStepClickSpy.length).toStrictEqual(2);
                expect(marketProgressTrackerStepClickSpy).toHaveReceivedEventDetail({
                    index: 1,
                    name: 'step-2',
                });
                await stepEls[0].click();
                expect(marketProgressTrackerStepClickSpy.length).toStrictEqual(3);
                expect(marketProgressTrackerStepClickSpy).toHaveReceivedEventDetail({
                    index: 2,
                    name: 'step-3',
                });
            });
            it('does not update when marketProgressTrackerStepClick is cancelled', async () => {
                await setContent(`
          <market-progress-tracker
            current-step-index="-1"
            interactive
            orientation="horizontal"
          >
            <market-progress-tracker-step name="step-1">
              <label slot="label">Step 1</label>
            </market-progress-tracker-step>
            <market-progress-tracker-step name="step-2">
              <label slot="label">Step 2</label>
            </market-progress-tracker-step>
            <market-progress-tracker-step name="step-3">
              <label slot="label">Step 3</label>
            </market-progress-tracker-step>
          </market-progress-tracker>
        `);
                // apply to all steps
                await page.$$eval('market-progress-tracker-step', (progressTrackerStepEls) => {
                    progressTrackerStepEls === null || progressTrackerStepEls === void 0 ? void 0 : progressTrackerStepEls.forEach((progressTrackerStepEl) => {
                        progressTrackerStepEl.addEventListener('marketProgressTrackerStepClick', (event) => {
                            event.preventDefault();
                        });
                    });
                });
                await stepEls[0].click();
                expect(el).toEqualAttribute('current-step-index', '-1');
                await stepEls[1].click();
                expect(el).toEqualAttribute('current-step-index', '-1');
                await stepEls[2].click();
                expect(el).toEqualAttribute('current-step-index', '-1');
            });
        });
        describe('when current-step-index is not defined', () => {
            it('does not update current-step-index when a step is clicked', async () => {
                await setContent(`
          <market-progress-tracker
            interactive
            orientation="horizontal"
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
                await stepEls[0].click();
                expect(el).not.toHaveAttribute('current-step-index');
                await stepEls[1].click();
                expect(el).not.toHaveAttribute('current-step-index');
                await stepEls[2].click();
                expect(el).not.toHaveAttribute('current-step-index');
            });
            it('will not override steps’ active and completed props', async () => {
                await setContent(`
          <market-progress-tracker
            interactive
            orientation="horizontal"
          >
            <market-progress-tracker-step completed>
              <label slot="label">Step 1</label>
            </market-progress-tracker-step>
            <market-progress-tracker-step active>
              <label slot="label">Step 2</label>
            </market-progress-tracker-step>
            <market-progress-tracker-step>
              <label slot="label">Step 3</label>
            </market-progress-tracker-step>
          </market-progress-tracker>
        `);
                expect(await stepEls[0].getProperty('completed')).toStrictEqual(true);
                expect(await stepEls[1].getProperty('active')).toStrictEqual(true);
            });
            it('does not update the steps’ active and completed props when a step is clicked', async () => {
                await setContent(`
          <market-progress-tracker
            interactive
            orientation="horizontal"
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
                await stepEls[0].click();
                expect(await stepEls[0].getProperty('active')).toStrictEqual(false);
                await stepEls[1].click();
                expect(el).not.toHaveAttribute('current-step-index');
                expect(await stepEls[0].getProperty('completed')).toStrictEqual(false);
                expect(await stepEls[1].getProperty('active')).toStrictEqual(false);
                await stepEls[2].click();
                expect(el).not.toHaveAttribute('current-step-index');
                expect(await stepEls[0].getProperty('completed')).toStrictEqual(false);
                expect(await stepEls[1].getProperty('completed')).toStrictEqual(false);
                expect(await stepEls[2].getProperty('active')).toStrictEqual(false);
            });
        });
    });
});
//# sourceMappingURL=market-progress-tracker.interactive.e2e.js.map
