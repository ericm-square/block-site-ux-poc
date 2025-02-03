import { newE2EPage } from "@stencil/core/testing";
describe('market-progress-tracker-step: horizontal', () => {
    let page;
    let el;
    let marketProgressTrackerStepClickSpy;
    beforeEach(async () => {
        page = await newE2EPage();
    });
    async function setContent(html) {
        await page.setContent(html);
        await page.waitForChanges();
        el = await page.find('market-progress-tracker-step');
    }
    it('renders with default properties', async () => {
        await setContent('<market-progress-tracker-step orientation="horizontal"></market-progress-tracker-step>');
        expect(el).not.toBeNull();
        expect(await el.isVisible()).toStrictEqual(true);
        expect(el).toHaveClass('market-progress-tracker-step');
        expect(el).toEqualAttribute('role', 'presentation');
        expect(el).not.toHaveAttribute('active');
        expect(await el.getProperty('active')).toStrictEqual(false);
        expect(el).not.toHaveAttribute('connector');
        expect(await el.getProperty('connector')).toBeUndefined();
        expect(el).not.toHaveAttribute('compact');
        expect(await el.getProperty('compact')).toStrictEqual(false);
        expect(el).not.toHaveAttribute('indicator');
        expect(await el.getProperty('indicator')).toStrictEqual('circle');
        expect(el).not.toHaveAttribute('interactive');
        expect(await el.getProperty('interactive')).toStrictEqual(false);
        expect(el).not.toHaveAttribute('name');
        expect(await el.getProperty('name')).toBeUndefined();
        expect(el).toEqualAttribute('orientation', 'horizontal');
        expect(await el.getProperty('orientation')).toStrictEqual('horizontal');
        expect(el).toEqualAttribute('size', 'medium');
        expect(await el.getProperty('size')).toStrictEqual('medium');
    });
    it('does not render the subtext slot', async () => {
        await setContent(`
      <market-progress-tracker-step orientation="horizontal">
        <label slot="label">Step</label>
        <span slot="subtext">Subtext</span>
      </market-progress-tracker-step>
    `);
        const innerText = await page.$eval('market-progress-tracker-step', (e) => e.innerText);
        expect(innerText).toStrictEqual('Step');
        const subtextEl = await page.find('span[slot="subtext"]');
        expect(subtextEl).not.toBeNull();
        expect(await subtextEl.isVisible()).toStrictEqual(false);
    });
    it('can be compact', async () => {
        await setContent('<market-progress-tracker-step compact></market-progress-tracker-step>');
        const el = await page.find('market-progress-tracker-step');
        expect(await el.getProperty('compact')).toStrictEqual(true);
    });
    describe('not interactive', () => {
        beforeEach(async () => {
            await setContent(`
        <market-progress-tracker-step orientation="horizontal"></market-progress-tracker-step>
      `);
        });
        it('does not emit marketProgressTrackerStepClick when clicked', async () => {
            marketProgressTrackerStepClickSpy = await page.spyOnEvent('marketProgressTrackerStepClick');
            await el.click();
            await page.waitForChanges();
            expect(marketProgressTrackerStepClickSpy).not.toHaveReceivedEvent();
        });
        it('contains a wrapper with the correct attributes', async () => {
            const wrapperEl = await el.find('pierce/.label');
            expect(wrapperEl).not.toHaveAttribute('part');
            expect(wrapperEl).toEqualAttribute('role', 'listitem');
        });
    });
    describe('interactive', () => {
        let buttonEl;
        beforeEach(async () => {
            await setContent(`
        <market-progress-tracker-step
          interactive
          orientation="horizontal"
        ></market-progress-tracker-step>
      `);
            buttonEl = await el.find('pierce/.button');
            marketProgressTrackerStepClickSpy = await page.spyOnEvent('marketProgressTrackerStepClick');
        });
        it('can be interactive', async () => {
            expect(await el.getProperty('interactive')).toStrictEqual(true);
        });
        it('contains a button with the correct attributes', () => {
            expect(buttonEl).toEqualAttribute('part', 'button');
            expect(buttonEl).toEqualAttribute('role', 'tab');
        });
        it('emits marketProgressTrackerStepClick when clicked', async () => {
            await buttonEl.click();
            await page.waitForChanges();
            expect(marketProgressTrackerStepClickSpy.length).toStrictEqual(1);
            expect(marketProgressTrackerStepClickSpy).toHaveReceivedEventDetail({
                index: null,
                name: null,
            });
        });
        it('emits marketProgressTrackerStepClick with index and name in the event detail', async () => {
            el.setAttribute('name', 'step-3');
            await page.$eval('market-progress-tracker-step', (el) => {
                el.dataset.stepIndex = '2';
            });
            await page.waitForChanges();
            await buttonEl.click();
            await page.waitForChanges();
            expect(marketProgressTrackerStepClickSpy.length).toStrictEqual(1);
            expect(marketProgressTrackerStepClickSpy).toHaveReceivedEventDetail({
                index: 2,
                name: 'step-3',
            });
        });
    });
});
//# sourceMappingURL=market-progress-tracker-step.horizontal.e2e.js.map
