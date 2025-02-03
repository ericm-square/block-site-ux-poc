import { newE2EPage } from "@stencil/core/testing";
describe('market-progress-tracker-step', () => {
    let page;
    let el;
    beforeEach(async () => {
        page = await newE2EPage();
    });
    async function setContent(html) {
        await page.setContent(html);
        await page.waitForChanges();
        el = await page.find('market-progress-tracker-step');
    }
    it('renders with default properties', async () => {
        await setContent('<market-progress-tracker-step></market-progress-tracker-step>');
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
    it('renders the label slot', async () => {
        await setContent(`
      <market-progress-tracker-step>
        <label slot="label">Step</label>
      </market-progress-tracker-step>
    `);
        const innerText = await page.$eval('market-progress-tracker-step', (e) => e.innerText);
        expect(innerText).toStrictEqual('Step');
        const labelEl = await page.find('label[slot="label"]');
        expect(labelEl).not.toBeNull();
        expect(await labelEl.isVisible()).toStrictEqual(true);
    });
    it('renders the default slot', async () => {
        await setContent(`
      <market-progress-tracker-step>
        Foo
      </market-progress-tracker-step>
    `);
        const innerText = await page.$eval('market-progress-tracker-step', (e) => e.innerText);
        expect(innerText).toStrictEqual('Foo');
    });
    it('can be active', async () => {
        await setContent('<market-progress-tracker-step active></market-progress-tracker-step>');
        expect(await el.getProperty('active')).toStrictEqual(true);
    });
    it('can have an active connector', async () => {
        await setContent('<market-progress-tracker-step connector="active"></market-progress-tracker-step>');
        expect(await el.getProperty('connector')).toStrictEqual('active');
    });
    it('can have a hidden connector', async () => {
        await setContent('<market-progress-tracker-step connector="hidden"></market-progress-tracker-step>');
        expect(await el.getProperty('connector')).toStrictEqual('hidden');
    });
    it('can have an inactive connector', async () => {
        await setContent('<market-progress-tracker-step connector="inactive"></market-progress-tracker-step>');
        expect(await el.getProperty('connector')).toStrictEqual('inactive');
    });
    it('can be completed', async () => {
        await setContent('<market-progress-tracker-step completed></market-progress-tracker-step>');
        expect(await el.getProperty('completed')).toStrictEqual(true);
    });
    it('can have a check indicator', async () => {
        await setContent('<market-progress-tracker-step indicator="check"></market-progress-tracker-step>');
        expect(await el.getProperty('indicator')).toStrictEqual('check');
    });
    it('can have a name attribute', async () => {
        await setContent('<market-progress-tracker-step name="step-3"></market-progress-tracker-step>');
        expect(await el.getProperty('name')).toStrictEqual('step-3');
    });
    it('can be small', async () => {
        await setContent('<market-progress-tracker-step size="small"></market-progress-tracker-step>');
        expect(await el.getProperty('size')).toStrictEqual('small');
    });
    it('can be large', async () => {
        await setContent('<market-progress-tracker-step size="large"></market-progress-tracker-step>');
        expect(await el.getProperty('size')).toStrictEqual('large');
    });
});
//# sourceMappingURL=market-progress-tracker-step.e2e.js.map
