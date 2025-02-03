import { newE2EPage } from "@stencil/core/testing";
describe('market-input-text', () => {
    let page;
    it('should render with defaults', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text></market-input-text>');
        const el = await page.find('market-input-text');
        expect(el).not.toBeNull();
        const input = await el.find('pierce/input');
        expect(input).not.toBeNull();
        expect(input).toEqualAttribute('type', 'text');
        expect(input).toEqualAttribute('name', null);
        expect(input).toEqualAttribute('value', null);
        expect(input).toEqualAttribute('placeholder', null);
        expect(input).toEqualAttribute('maxlength', null);
        expect(input).toEqualAttribute('minlength', null);
        expect(input).toEqualAttribute('size', null);
        expect(input).toEqualAttribute('inputmode', null);
        expect(input).toEqualAttribute('inputId', null);
        expect(input).toEqualAttribute('max', null);
        expect(input).toEqualAttribute('min', null);
        expect(input).toEqualAttribute('step', null);
        expect(input).toEqualAttribute('pattern', null);
        expect(input).not.toHaveAttribute('disabled');
        expect(input).not.toHaveAttribute('readonly');
        expect(input).not.toHaveAttribute('value');
        expect(input).not.toHaveAttribute('invalid');
        expect(input).not.toHaveAttribute('focused');
        expect(input).not.toHaveAttribute('required');
    });
    it('can have a label', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-input-text>
        <label>Label</label>
      </market-input-text>
    `);
        const label = await page.find('market-input-text label');
        expect(label).not.toBeNull();
        expect(label.innerText).toEqual('Label');
    });
    it('can have a leading icon accessory', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-input-text>
        <market-accessory slot="leading-accessory" size="icon">
          <img src="https://via.placeholder.com/40x40.png" />
        </market-accessory>
      </market-input-text>
    `);
        const el = await page.find('market-input-text');
        const accessory = await el.find('market-accessory');
        expect(accessory).not.toBeNull();
        expect(accessory.getAttribute('slot')).toEqual('leading-accessory');
        const container = await el.find('pierce/.label-input-container.has-leading-accessory');
        expect(container).not.toBeNull();
    });
    it('can have a leading image accessory', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-input-text>
        <market-accessory slot="leading-accessory" size="image">
          <img src="https://via.placeholder.com/40x40.png" />
        </market-accessory>
      </market-input-text>
    `);
        const el = await page.find('market-input-text');
        const accessory = await el.find(' market-accessory');
        expect(accessory).not.toBeNull();
        expect(accessory.getAttribute('slot')).toEqual('leading-accessory');
        const container = await el.find('pierce/.label-input-container.has-leading-accessory');
        expect(container).not.toBeNull();
    });
    it('can have a trailing accessory', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-input-text>
        <svg slot="trailing-accessory"/>
      </market-input-text>
    `);
        const el = await page.find('market-input-text');
        const accessory = await el.find('market-input-text svg');
        expect(accessory).not.toBeNull();
        expect(accessory.getAttribute('slot')).toEqual('trailing-accessory');
        const container = await el.find('pierce/.has-trailing-accessory');
        expect(container).not.toBeNull();
    });
    it('can have both a leading and trailing accessory', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-input-text>
        <market-accessory slot="leading-accessory" size="image"></market-accessory>
        <svg slot="trailing-accessory"/>
      </market-input-text>
    `);
        const el = await page.find('market-input-text');
        const container = await el.find('pierce/.label-input-container.has-leading-accessory.has-trailing-accessory');
        expect(container).not.toBeNull();
    });
    describe('when disabled', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-input-text disabled></market-input-text>');
        });
        it('should have disabled properties', async () => {
            const el = await page.find('market-input-text');
            const input = await el.find('pierce/input');
            expect(el).toHaveAttribute('disabled');
            expect(input).toHaveAttribute('disabled');
        });
        it('should not focus on click', async () => {
            const el = await page.find('market-input-text');
            await el.click();
            expect(el).not.toHaveAttribute('focused');
        });
    });
    it('can be invalid', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text invalid></market-input-text>');
        const el = await page.find('market-input-text');
        expect(el).toHaveAttribute('invalid');
    });
    it('can be focused', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text></market-input-text>');
        const el = await page.find('market-input-text');
        const input = await el.find('pierce/input');
        await input.focus();
        await page.waitForChanges();
        expect(el).toHaveAttribute('focused');
    });
    it('can be autofocused', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text autofocus></market-input-text>');
        const el = await page.find('market-input-text');
        expect(el).toHaveAttribute('focused');
    });
    it('focuses native input when focused attributed changes', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text></market-input-text>');
        const el = await page.find('market-input-text');
        el.setProperty('focused', true);
        await page.waitForChanges();
        const focusedElement = await el.find('pierce/input:focus');
        expect(focusedElement).toBeTruthy();
    });
    it('can have a default value', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text value="foo bar"></market-input-text>');
        const el = await page.find('market-input-text');
        expect(el).toEqualAttribute('value', 'foo bar');
    });
    it('can change value', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text></market-input-text>');
        const el = await page.find('market-input-text');
        const input = await el.find('pierce/input');
        await input.type('foo bar');
        await page.waitForChanges();
        expect(el).toEqualAttribute('value', 'foo bar');
    });
    it('can change placeholder', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text placeholder="foo bar"></market-input-text>');
        const el = await page.find('market-input-text');
        const input = await el.find('pierce/input');
        expect(input).toEqualAttribute('placeholder', 'foo bar');
    });
    it('can change maxlength', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text maxlength="20"></market-input-text>');
        const el = await page.find('market-input-text');
        const innerInput = await el.find('pierce/input');
        expect(innerInput).toEqualAttribute('maxlength', '20');
    });
    it('can change minlength', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text minlength="20"></market-input-text>');
        const el = await page.find('market-input-text');
        const innerInput = await el.find('pierce/input');
        expect(innerInput).toEqualAttribute('minlength', '20');
    });
    it('can change min', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text min="20"></market-input-text>');
        const el = await page.find('market-input-text');
        const innerInput = await el.find('pierce/input');
        expect(innerInput).toEqualAttribute('min', '20');
    });
    it('can change max', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text max="20"></market-input-text>');
        const el = await page.find('market-input-text');
        const innerInput = await el.find('pierce/input');
        expect(innerInput).toEqualAttribute('max', '20');
    });
    it('can change step', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text step="5"></market-input-text>');
        const el = await page.find('market-input-text');
        const innerInput = await el.find('pierce/input');
        expect(innerInput).toEqualAttribute('step', '5');
    });
    it('can change required', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text required></market-input-text>');
        const el = await page.find('market-input-text');
        const innerInput = await el.find('pierce/input');
        expect(innerInput).toHaveAttribute('required');
    });
    it('can change pattern', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text pattern="[A-Za-z]{3}"></market-input-text>');
        const el = await page.find('market-input-text');
        const innerInput = await el.find('pierce/input');
        expect(innerInput).toEqualAttribute('pattern', '[A-Za-z]{3}');
    });
    it('can change inputmode', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text inputmode="numeric"></market-input-text>');
        const el = await page.find('market-input-text');
        const innerInput = await el.find('pierce/input');
        expect(innerInput).toEqualAttribute('inputmode', 'numeric');
    });
    it('fires the change value event when input changes', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text></market-input-text>');
        const el = await page.find('market-input-text');
        const input = await el.find('pierce/input');
        const marketInputValueChange = await page.spyOnEvent('marketInputValueChange');
        await input.type('foo bar');
        await page.waitForChanges();
        expect(marketInputValueChange.lastEvent.detail.value).toEqual('foo bar');
    });
    it('can prevent input from changing', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text></market-input-text>');
        const el = await page.find('market-input-text');
        const input = await el.find('pierce/input');
        await page.$eval('market-input-text', (elm) => {
            elm.addEventListener('marketInputValueChange', (event) => {
                if (/\D/.test(event.detail.value)) {
                    event.preventDefault();
                }
            });
        });
        await input.type('abc123');
        await page.waitForChanges();
        const component = await page.find('market-input-text');
        expect(component).toEqualAttribute('value', '123');
        const inputValue = await input.getProperty('value');
        expect(inputValue).toEqualText('123');
    });
    it('should pass down aria attributes to input element', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text aria-required="true"></market-input-text>');
        const el = await page.find('market-input-text');
        const innerInput = await el.find('pierce/input');
        expect(innerInput).toEqualAttribute('aria-required', 'true');
        el.setAttribute('aria-required', false);
        await page.waitForChanges();
        expect(innerInput).toEqualAttribute('aria-required', 'false');
    });
    it('can turn autocomplete off', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text autocomplete="off"></market-input-text>');
        const el = await page.find('market-input-text');
        const input = await el.find('pierce/input');
        expect(input).toEqualAttribute('autocomplete', 'off');
    });
    it('submits the form with enter', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <form action="#">
        <market-input-text></market-input-text>
        <market-button type="submit">Submit</market-button>
      </form>
    `);
        const form = await page.find('form');
        const formSubmitSpy = await form.spyOnEvent('submit');
        const el = await page.find('market-input-text');
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
        <market-input-text class="default"></market-input-text>
        <market-input-text class="custom">
          <input slot="input" />
        </market-input-text>
      `);
            customInput = await page.find('.custom');
            slottedInput = await customInput.find('input');
            defaultInput = await page.find('.default');
        });
        it('conditionally renders either the slotted or default input', async () => {
            // market-input-text with slotted input
            let lightDomInput = slottedInput;
            let shadowInput = await customInput.shadowRoot.querySelector('input');
            expect(lightDomInput).not.toBe(null);
            expect(shadowInput).toBe(null);
            // market-input-text w/o slotted input
            lightDomInput = await defaultInput.find('input');
            shadowInput = await defaultInput.shadowRoot.querySelector('input');
            expect(lightDomInput).toBe(null);
            expect(shadowInput).not.toBe(null);
        });
        it('focuses/blurs slotted input on mouse interaction', async () => {
            await customInput.click(); // focus
            await page.waitForChanges();
            expect(customInput).toHaveAttribute('focused');
            expect(await page.find(':focus')).toEqual(slottedInput);
            await defaultInput.click(); // blur
            await page.waitForChanges();
            expect(customInput).not.toHaveAttribute('focused');
            expect(await page.find(':focus')).not.toEqual(slottedInput);
            await customInput.click(); // focus
            await page.waitForChanges();
            expect(customInput).toHaveAttribute('focused');
            expect(await page.find(':focus')).toEqual(slottedInput);
        });
        it('focuses/blurs slotted input on tab interaction', async () => {
            await defaultInput.click();
            await page.keyboard.press('Tab'); // focus
            await page.waitForChanges();
            expect(customInput).toHaveAttribute('focused');
            expect(await page.find(':focus')).toEqual(slottedInput);
            await page.keyboard.press('Tab'); // blur
            await page.waitForChanges();
            expect(customInput).not.toHaveAttribute('focused');
            expect(await page.find(':focus')).not.toEqual(slottedInput);
        });
        it('syncs its properties with the slotted input', async () => {
            customInput.setAttribute('disabled', true);
            customInput.setAttribute('maxlength', 8);
            await page.waitForChanges();
            expect(slottedInput).toHaveAttribute('disabled');
            expect(slottedInput).toEqualAttribute('maxlength', 8);
            customInput.setAttribute('disabled', false);
            customInput.setAttribute('maxlength', 16);
            await page.waitForChanges();
            expect(slottedInput).not.toHaveAttribute('disabled');
            expect(slottedInput).toEqualAttribute('maxlength', 16);
        });
    });
    describe('when used with slot="trigger" in a market-dropdown', () => {
        let page;
        let marketInput;
        let innerInput;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-dropdown>
          <market-input-text slot="trigger"></market-input-text>
          <market-popover slot="popover">...</market-popover>
        </market-dropdown>
      `);
            marketInput = await page.find('market-input-text');
            innerInput = await marketInput.find('pierce/input');
        });
        it('typing a string fires a value change event', async () => {
            const marketInputValueChange = await page.spyOnEvent('marketInputValueChange');
            await innerInput.type('foo bar');
            await page.waitForChanges();
            expect(marketInputValueChange.lastEvent.detail.value).toEqual('foo bar');
        });
        it('hitting enter does not fire a value change event', async () => {
            const marketInputValueChange = await page.spyOnEvent('marketInputValueChange');
            await innerInput.click();
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            expect(marketInputValueChange).not.toHaveReceivedEvent();
        });
    });
});
//# sourceMappingURL=market-input-text.e2e.js.map
