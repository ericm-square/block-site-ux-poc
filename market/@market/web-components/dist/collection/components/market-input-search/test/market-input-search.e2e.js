import { newE2EPage } from "@stencil/core/testing";
describe('market-input-search', () => {
    let page;
    let el;
    it('should render with defaults', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-search></market-input-search>');
        await page.waitForChanges();
        el = await page.find('market-input-search');
        const inputEl = await el.find('pierce/input');
        expect(await el.isVisible()).toBe(true);
        expect(await inputEl.isVisible()).toBe(true);
        expect(el).toEqualAttribute('size', 'medium');
        expect(el).toEqualAttribute('variant', 'medium');
        expect(inputEl).toEqualAttribute('type', 'text');
        expect(inputEl).not.toHaveAttribute('value');
        expect(inputEl).not.toHaveAttribute('placeholder');
        expect(inputEl).not.toHaveAttribute('maxlength');
        expect(inputEl).not.toHaveAttribute('disabled');
        expect(inputEl).not.toHaveAttribute('value');
        expect(inputEl).not.toHaveAttribute('focused');
    });
    describe('when disabled', () => {
        let inputEl;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-input-search disabled></market-input-search>');
            el = await page.find('market-input-search');
            inputEl = await el.find('pierce/input');
        });
        it('should have disabled properties', () => {
            expect(el).toHaveAttribute('disabled');
            expect(inputEl).toHaveAttribute('disabled');
        });
        it('should not focus on click', async () => {
            await el.click();
            expect(el).not.toHaveAttribute('focused');
            expect(inputEl).not.toHaveAttribute('focused');
        });
        it('cannot be cleared', async () => {
            el.setAttribute('value', 'can’t touch this');
            await page.waitForChanges();
            const clearButtonEl = await el.find('pierce/.clear-button');
            expect(await clearButtonEl.isVisible()).toStrictEqual(false);
        });
    });
    describe('focus', () => {
        it('can be focused via click', async () => {
            page = await newE2EPage();
            await page.setContent('<market-input-search></market-input-search>');
            el = await page.find('market-input-search');
            await el.click();
            await page.waitForChanges();
            expect(el).toHaveAttribute('focused');
        });
        it('can be focused via inner input', async () => {
            page = await newE2EPage();
            await page.setContent('<market-input-search></market-input-search>');
            el = await page.find('market-input-search');
            const inputEl = await el.find('pierce/input');
            await inputEl.focus();
            await page.waitForChanges();
            expect(el).toHaveAttribute('focused');
        });
        it('can be focused/blurred via tabbing', async () => {
            page = await newE2EPage();
            await page.setContent('<market-input-search></market-input-search>');
            await page.waitForChanges();
            el = await page.find('market-input-search');
            await page.focus('body');
            await page.waitForChanges();
            expect(el).not.toHaveAttribute('focused');
            await page.keyboard.press('Tab'); // will focus
            await page.waitForChanges();
            expect(el).toHaveAttribute('focused');
            await page.keyboard.press('Tab'); // will blur
            await page.waitForChanges();
            expect(el).not.toHaveAttribute('focused');
        });
        it('focuses native input when focused attributed changes', async () => {
            page = await newE2EPage();
            await page.setContent('<market-input-search></market-input-search>');
            el = await page.find('market-input-search');
            el.setAttribute('focused', '');
            await page.waitForChanges();
            expect(await el.find('pierce/input:focus')).not.toBeNull();
        });
    });
    it('can have a default value', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-search value="foo bar"></market-input-search>');
        el = await page.find('market-input-search');
        const input = await el.find('pierce/input');
        expect(el).toEqualAttribute('value', 'foo bar');
        expect(await input.getProperty('value')).toStrictEqual('foo bar');
    });
    it('can change value', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-search></market-input-search>');
        el = await page.find('market-input-search');
        const input = await el.find('pierce/input');
        await input.type('foo bar');
        await page.waitForChanges();
        expect(el).toEqualAttribute('value', 'foo bar');
    });
    it('can change placeholder', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-search placeholder="foo bar"></market-input-search>');
        el = await page.find('market-input-search');
        const input = await el.find('pierce/input');
        expect(input).toEqualAttribute('placeholder', 'foo bar');
    });
    it('can change maxlength', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-search maxlength="20"></market-input-search>');
        el = await page.find('market-input-search');
        const input = await el.find('pierce/input');
        expect(input).toEqualAttribute('maxlength', '20');
    });
    it('can turn autocomplete off', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-search autocomplete="off"></market-input-search>');
        el = await page.find('market-input-search');
        const input = await el.find('pierce/input');
        expect(input).toEqualAttribute('autocomplete', 'off');
    });
    it('has aria-hidden set to true on the leading accessory if it is not the back button', async () => {
        page = await newE2EPage();
        await page.setContent(`<market-input-search></market-input-search>`);
        const accessory = await page.find('pierce/market-accessory');
        expect(accessory).not.toBeNull();
        expect(accessory).not.toHaveClass('is-back-icon');
        expect(await accessory.isVisible()).toStrictEqual(true);
        expect(accessory).toEqualAttribute('tabindex', '-1');
        expect(accessory).toEqualAttribute('aria-hidden', 'true');
    });
    it('can have a trailing accessory', async () => {
        page = await newE2EPage();
        await page.setContent(`<market-input-search><market-accessory slot="trailing-accessory"/></market-input-search>`);
        const accessory = await page.find('market-input-search market-accessory');
        expect(accessory).not.toBeNull();
        expect(await accessory.isVisible()).toStrictEqual(true);
        expect(accessory.getAttribute('slot')).toEqual('trailing-accessory');
    });
    it('hides trailing accessory when value is present', async () => {
        page = await newE2EPage();
        await page.setContent(`<market-input-search><market-accessory slot="trailing-accessory"/></market-input-search>`);
        el = await page.find('market-input-search');
        const input = await el.find('pierce/input');
        await input.type('foo bar');
        await page.waitForChanges();
        const accessory = await page.find('market-input-search market-accessory');
        const clearButtonEl = await el.find('pierce/.clear-button');
        expect(await accessory.isVisible()).toStrictEqual(false);
        expect(await clearButtonEl.isVisible()).toStrictEqual(true);
    });
    it('fires the change value event when input changes', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-search></market-input-search>');
        el = await page.find('market-input-search');
        const input = await el.find('pierce/input');
        const marketInputSearchValueChangeSpy = await page.spyOnEvent('marketInputSearchValueChange');
        await input.type('f');
        await page.waitForChanges();
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.prevValue).toEqual('');
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.current).toEqual('f');
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.value).toEqual('f');
        await input.type('o');
        await page.waitForChanges();
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.prevValue).toEqual('f');
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.current).toEqual('fo');
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.value).toEqual('fo');
        await input.type('o');
        await page.waitForChanges();
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.prevValue).toEqual('fo');
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.current).toEqual('foo');
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.value).toEqual('foo');
    });
    it('can be cleared, and fires a clear and value change event', async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-search></market-input-search>');
        el = await page.find('market-input-search');
        const marketInputSearchClearedSpy = await page.spyOnEvent('marketInputSearchCleared');
        const marketInputSearchValueChangeSpy = await page.spyOnEvent('marketInputSearchValueChange');
        el.setAttribute('value', 'can touch this');
        await page.waitForChanges();
        const clearButtonEl = await el.find('pierce/.clear-button');
        expect(clearButtonEl).toEqualAttribute('tabindex', '0');
        await clearButtonEl.click();
        await page.waitForChanges();
        expect(el).toHaveAttribute('focused');
        expect(el).toEqualAttribute('value', '');
        expect(marketInputSearchClearedSpy.length).toStrictEqual(1);
        expect(marketInputSearchValueChangeSpy.length).toStrictEqual(1);
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.prevValue).toEqual('can touch this');
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.current).toEqual('');
        expect(marketInputSearchValueChangeSpy.lastEvent.detail.value).toEqual('');
    });
    it('submits the form with enter', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <form action="#">
        <market-input-search></market-input-search>
        <market-button type="submit">Submit</market-button>
      </form>
    `);
        const form = await page.find('form');
        const formSubmitSpy = await form.spyOnEvent('submit');
        const el = await page.find('market-input-search');
        const input = await el.find('pierce/input');
        await input.press('Enter');
        await page.waitForChanges();
        expect(formSubmitSpy).toHaveReceivedEventTimes(1);
    });
    describe('when used with slotted HTML input', () => {
        let customInput;
        let slottedInput;
        let defaultInput;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-input-search class="default"></market-input-search>
        <market-input-search class="custom">
          <input slot="input" />
        </market-input-search>
      `);
            customInput = await page.find('.custom');
            slottedInput = await customInput.find('input');
            defaultInput = await page.find('.default');
        });
        it('conditionally renders either the slotted or default input', async () => {
            {
                // market-input-search with slotted input
                const lightDomInput = slottedInput;
                const shadowInput = customInput.shadowRoot.querySelector('input');
                expect(lightDomInput).not.toBe(null);
                expect(shadowInput).toBe(null);
            }
            {
                // market-input-search w/o slotted input
                const lightDomInput = await defaultInput.find('input');
                const shadowInput = defaultInput.shadowRoot.querySelector('input');
                expect(lightDomInput).toBe(null);
                expect(shadowInput).not.toBe(null);
            }
        });
        it('focuses/blurs slotted input on mouse interaction', async () => {
            // focus
            await customInput.click();
            await page.waitForChanges();
            expect(customInput).toHaveAttribute('focused');
            expect(await page.find(':focus')).toEqual(slottedInput);
            // focus on something else
            await defaultInput.click();
            await page.waitForChanges();
            expect(customInput).not.toHaveAttribute('focused');
            expect(await page.find(':focus')).not.toEqual(slottedInput);
            // focus
            await customInput.click();
            await page.waitForChanges();
            expect(customInput).toHaveAttribute('focused');
            expect(await page.find(':focus')).toEqual(slottedInput);
        });
        it('focuses/blurs slotted input on tab interaction', async () => {
            await defaultInput.click();
            // focus
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(customInput).toHaveAttribute('focused');
            expect(await page.find(':focus')).toEqual(slottedInput);
            // focus on something else
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(customInput).not.toHaveAttribute('focused');
            expect(await page.find(':focus')).not.toEqual(slottedInput);
        });
        it('syncs its properties with the slotted input', async () => {
            customInput.setAttribute('autofocus', true);
            customInput.setAttribute('disabled', true);
            customInput.setAttribute('maxlength', 8);
            customInput.setAttribute('placeholder', 'pants');
            await page.waitForChanges();
            expect(slottedInput).toHaveAttribute('autofocus');
            expect(slottedInput).toHaveAttribute('disabled');
            expect(slottedInput).toEqualAttribute('maxlength', 8);
            expect(slottedInput).toEqualAttribute('placeholder', 'pants');
            customInput.setAttribute('autofocus', false);
            customInput.setAttribute('disabled', false);
            customInput.setAttribute('maxlength', 16);
            customInput.setAttribute('placeholder', 'jacket');
            await page.waitForChanges();
            expect(slottedInput).not.toHaveAttribute('autofocus');
            expect(slottedInput).not.toHaveAttribute('disabled');
            expect(slottedInput).toEqualAttribute('maxlength', 16);
            expect(slottedInput).toEqualAttribute('placeholder', 'jacket');
        });
    });
});
//# sourceMappingURL=market-input-search.e2e.js.map
