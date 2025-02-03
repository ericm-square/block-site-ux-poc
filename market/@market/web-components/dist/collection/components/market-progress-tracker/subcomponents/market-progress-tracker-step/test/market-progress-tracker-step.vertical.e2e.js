import { newE2EPage } from "@stencil/core/testing";
describe('market-progress-tracker-step: vertical', () => {
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
        await setContent('<market-progress-tracker-step orientation="vertical"></market-progress-tracker-step>');
        expect(el).not.toBeNull();
        expect(await el.isVisible()).toStrictEqual(true);
        expect(el).toHaveClass('market-progress-tracker-step');
        expect(el).toEqualAttribute('role', 'listitem');
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
        expect(el).toEqualAttribute('orientation', 'vertical');
        expect(await el.getProperty('orientation')).toStrictEqual('vertical');
        expect(el).toEqualAttribute('size', 'medium');
        expect(await el.getProperty('size')).toStrictEqual('medium');
    });
    it('does not contain a wrapper', async () => {
        await setContent('<market-progress-tracker-step></market-progress-tracker-step>');
        const wrapperEl = await el.find('.label, .button');
        expect(wrapperEl).toBeNull();
    });
    it('does not emit marketProgressTrackerStepClick when it is not interactive and when clicked', async () => {
        await setContent(`
      <market-progress-tracker-step>
        <label>Step</label>
      </market-progress-tracker-step>
    `);
        marketProgressTrackerStepClickSpy = await page.spyOnEvent('marketProgressTrackerStepClick');
        await el.click();
        await page.waitForChanges();
        expect(marketProgressTrackerStepClickSpy).not.toHaveReceivedEvent();
    });
});
//# sourceMappingURL=market-progress-tracker-step.vertical.e2e.js.map
