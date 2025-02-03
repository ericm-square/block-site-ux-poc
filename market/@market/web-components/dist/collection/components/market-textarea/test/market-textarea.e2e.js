import { newE2EPage } from "@stencil/core/testing";
describe('market-textarea', () => {
    let page;
    it('should render with defaults', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea></market-textarea>');
        const el = await page.find('market-textarea');
        expect(el).not.toBeNull();
        const textarea = await el.find('pierce/textarea');
        expect(textarea).not.toBeNull();
        expect(textarea).toEqualAttribute('placeholder', null);
        expect(textarea).toEqualAttribute('name', null);
        expect(textarea).toEqualAttribute('value', null);
        expect(textarea).toEqualAttribute('maxlength', null);
        expect(textarea).toEqualAttribute('inputmode', null);
        expect(textarea).not.toHaveAttribute('disabled');
        expect(textarea).not.toHaveAttribute('readonly');
        expect(textarea).not.toHaveAttribute('value');
        expect(textarea).not.toHaveAttribute('invalid');
        expect(textarea).not.toHaveAttribute('focused');
    });
    it('can have a label', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-textarea>
        <label>Label</label>
      </market-textarea>
    `);
        const label = await page.find('market-textarea label');
        expect(label).not.toBeNull();
    });
    describe('when disabled', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-textarea disabled></market-textarea>');
        });
        it('should have disabled properties', async () => {
            const el = await page.find('market-textarea');
            const textarea = await el.find('pierce/textarea');
            expect(el).toHaveAttribute('disabled');
            expect(textarea).toHaveAttribute('disabled');
        });
        it('should not focus on click', async () => {
            const el = await page.find('market-textarea');
            await el.click();
            expect(el).not.toHaveAttribute('focused');
        });
    });
    it('can be invalid', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea invalid></market-textarea>');
        const el = await page.find('market-textarea');
        expect(el).toHaveAttribute('invalid');
    });
    it('can be focused', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea></market-textarea>');
        const el = await page.find('market-textarea');
        const textarea = await el.find('pierce/textarea');
        await textarea.focus();
        await page.waitForChanges();
        expect(el).toHaveAttribute('focused');
    });
    it('can be autofocused', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea autofocus></market-textarea>');
        const el = await page.find('market-textarea');
        expect(el).toHaveAttribute('focused');
    });
    it('can have a default value', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea value="foo bar"></market-textarea>');
        const el = await page.find('market-textarea');
        expect(el).toEqualAttribute('value', 'foo bar');
    });
    it('can have a name', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea name="foo bar"></market-textarea>');
        const el = await page.find('market-textarea');
        const textarea = await el.find('pierce/textarea');
        expect(textarea).toEqualAttribute('name', 'foo bar');
    });
    it('can change placeholder', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea placeholder="foo bar"></market-textarea>');
        const el = await page.find('market-textarea');
        const textarea = await el.find('pierce/textarea');
        expect(textarea).toEqualAttribute('placeholder', 'foo bar');
    });
    it('can change maxlength', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea maxlength="20"></market-textarea>');
        const el = await page.find('market-textarea');
        const textarea = await el.find('pierce/textarea');
        expect(textarea).toEqualAttribute('maxlength', '20');
    });
    it('can change inputmode', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea inputmode="numeric"></market-textarea>');
        const el = await page.find('market-textarea');
        const textarea = await el.find('pierce/textarea');
        expect(textarea).toEqualAttribute('inputmode', 'numeric');
    });
    it('can change value', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea></market-textarea>');
        const el = await page.find('market-textarea');
        const textarea = await el.find('pierce/textarea');
        await textarea.type('changed value');
        await page.waitForChanges();
        expect(el).toEqualAttribute('value', 'changed value');
    });
    it('fires the change value event when textarea changes', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea></market-textarea>');
        const el = await page.find('market-textarea');
        const textarea = await el.find('pierce/textarea');
        const marketTextareaValueChange = await page.spyOnEvent('marketTextareaValueChange');
        await textarea.type('event value changed');
        await page.waitForChanges();
        expect(marketTextareaValueChange.lastEvent.detail.value).toEqual('event value changed');
    });
    it('should pass down aria attributes to textarea element', async () => {
        page = await newE2EPage();
        await page.setContent('<market-textarea aria-required="true"></market-textarea>');
        const el = await page.find('market-textarea');
        const textarea = await el.find('pierce/textarea');
        expect(textarea).toEqualAttribute('aria-required', 'true');
        el.setAttribute('aria-required', false);
        await page.waitForChanges();
        expect(textarea).toEqualAttribute('aria-required', 'false');
    });
    describe('when used with a slotted textarea', () => {
        let page;
        let customTextarea;
        let slottedTextarea;
        let defaultTextarea;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-textarea class="default"></market-textarea>
        <market-textarea class="custom">
          <textarea slot="textarea" />
        </market-textarea>
      `);
            customTextarea = await page.find('.custom');
            slottedTextarea = await customTextarea.find('textarea');
            defaultTextarea = await page.find('.default');
        });
        it('conditionally renders either the slotted or default textarea', async () => {
            // market-textarea with slotted textarea
            let lightDomTextarea = slottedTextarea;
            let shadowTextarea = customTextarea.shadowRoot.querySelector('textarea');
            expect(lightDomTextarea).not.toBe(null);
            expect(shadowTextarea).toBe(null);
            // market-textarea w/o slotted textarea
            lightDomTextarea = await defaultTextarea.find('textarea');
            shadowTextarea = defaultTextarea.shadowRoot.querySelector('textarea');
            expect(lightDomTextarea).toBe(null);
            expect(shadowTextarea).not.toBe(null);
        });
        it('focuses/blurs slotted textarea on mouse interaction', async () => {
            await customTextarea.click(); // focus
            await page.waitForChanges();
            expect(customTextarea).toHaveAttribute('focused');
            expect(await page.find(':focus')).toEqual(slottedTextarea);
            await defaultTextarea.click(); // blur
            await page.waitForChanges();
            expect(customTextarea).not.toHaveAttribute('focused');
            expect(await page.find(':focus')).not.toEqual(slottedTextarea);
            await customTextarea.click(); // focus
            await page.waitForChanges();
            expect(customTextarea).toHaveAttribute('focused');
            expect(await page.find(':focus')).toEqual(slottedTextarea);
        });
        it('focuses/blurs slotted textarea on tab interaction', async () => {
            await defaultTextarea.click();
            await page.keyboard.press('Tab'); // focus
            await page.waitForChanges();
            expect(customTextarea).toHaveAttribute('focused');
            expect(await page.find(':focus')).toEqual(slottedTextarea);
            await page.keyboard.press('Tab'); // blur
            await page.waitForChanges();
            expect(customTextarea).not.toHaveAttribute('focused');
            expect(await page.find(':focus')).not.toEqual(slottedTextarea);
        });
        it('syncs its properties with the slotted textarea', async () => {
            customTextarea.setAttribute('disabled', true);
            customTextarea.setAttribute('maxlength', 8);
            await page.waitForChanges();
            expect(slottedTextarea).toHaveAttribute('disabled');
            expect(slottedTextarea).toEqualAttribute('maxlength', 8);
            customTextarea.setAttribute('disabled', false);
            customTextarea.setAttribute('maxlength', 16);
            await page.waitForChanges();
            expect(slottedTextarea).not.toHaveAttribute('disabled');
            expect(slottedTextarea).toEqualAttribute('maxlength', 16);
        });
    });
});
//# sourceMappingURL=market-textarea.e2e.js.map
