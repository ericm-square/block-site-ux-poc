import { newE2EPage } from "@stencil/core/testing";
describe('market-input-password', () => {
    let page;
    it('renders', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-password></market-input-password>');
        const element = await page.find('market-input-password');
        expect(element).toHaveAttribute('hydrated');
    });
    it('should render with defaults', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-password></market-input-password>');
        const el = await page.find('market-input-password');
        expect(el).not.toBeNull();
        const inputText = await el.find('pierce/market-input-text');
        expect(inputText).not.toBeNull();
        expect(inputText).toEqualAttribute('type', 'password');
        expect(inputText).not.toHaveAttribute('disabled');
        expect(inputText).not.toHaveAttribute('readonly');
        expect(inputText).toEqualAttribute('value', '');
        expect(inputText).not.toHaveAttribute('invalid');
        expect(inputText).not.toHaveAttribute('focused');
        expect(inputText).toEqualAttribute('inputmode', null);
    });
    it('can have a label', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-input-password>
        <label>Label</label>
      </market-input-password>
    `);
        const label = await page.find('market-input-password label');
        expect(label).not.toBeNull();
    });
    it('can change inputmode', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-password inputmode="numeric"></market-input-password>');
        const el = await page.find('market-input-password');
        const innerInput = await el.find('pierce/input');
        expect(innerInput).toEqualAttribute('inputmode', 'numeric');
    });
    it('has an eye icon button within the input', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-input-password></market-input-password>
    `);
        const el = await page.find('market-input-password');
        const accessory = await el.find('pierce/market-accessory');
        expect(accessory).not.toBeNull();
        expect(accessory.getAttribute('slot')).toEqual('trailing-accessory');
    });
    it('should update the type attribute when the eye icon is clicked', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-input-password></market-input-password>
    `);
        const el = await page.find('market-input-password');
        const input = await el.find('pierce/market-input-text');
        expect(input).toEqualAttribute('type', 'password');
        const button = await el.find('pierce/button.toggle');
        await button.click();
        expect(input).toEqualAttribute('type', 'text');
    });
    it('submits the form with enter', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <form action="#">
        <market-input-password></market-input-password>
        <market-button type="submit">Submit</market-button>
      </form>
    `);
        const form = await page.find('form');
        const formSubmitSpy = await form.spyOnEvent('submit');
        const el = await page.find('market-input-password');
        const input = await el.find('pierce/input');
        await input.press('Enter');
        await page.waitForChanges();
        expect(formSubmitSpy).toHaveReceivedEventTimes(1);
    });
    describe('when used with slotted HTML input', () => {
        let page;
        let customInput;
        let slottedInput;
        let defaultInput;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-input-password class="default"></market-input-password>
        <market-input-password class="custom">
          <input slot="input" />
        </market-input-password>
      `);
            customInput = await page.find('.custom');
            slottedInput = await customInput.find('input');
            defaultInput = await page.find('.default');
        });
        it('conditionally renders either the slotted or default input', async () => {
            // market-input-password with slotted input
            let lightDomInput = await customInput.find('input');
            let shadowMarketInput = await customInput.shadowRoot.querySelector('market-input-text');
            let shadowMarketInputSlotContent = await shadowMarketInput.querySelector('slot[name="input"]');
            expect(lightDomInput).not.toBe(null);
            expect(shadowMarketInputSlotContent).not.toBe(null);
            // market-input-password w/o slotted input
            lightDomInput = await defaultInput.find('input');
            shadowMarketInput = await defaultInput.shadowRoot.querySelector('market-input-text');
            shadowMarketInputSlotContent = await shadowMarketInput.querySelector('input');
            expect(lightDomInput).toBe(null);
            expect(shadowMarketInputSlotContent).toBe(null);
        });
        it('focuses/blurs slotted input on mouse interaction', async () => {
            await customInput.click(); // focus
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(slottedInput);
            await defaultInput.click(); // blur
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(defaultInput);
            await customInput.click(); // focus
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(slottedInput);
        });
        it('focuses/blurs slotted input on tab interaction', async () => {
            await page.keyboard.press('Tab'); // focus default input
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(defaultInput);
            await page.keyboard.press('Tab'); // focus default input eye button
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(defaultInput);
            await page.keyboard.press('Tab'); // focus slotted input
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(slottedInput);
            await page.keyboard.press('Tab'); // focus slotted input eye button
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(customInput);
        });
    });
});
//# sourceMappingURL=market-input-password.e2e.js.map
