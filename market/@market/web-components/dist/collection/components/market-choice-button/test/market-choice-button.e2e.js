import { newE2EPage } from "@stencil/core/testing";
describe('market-choice-button', () => {
    it('renders with all defaults', async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <market-choice-button>
          Choice
          </market-choice-button>
        `);
        const element = await page.find('market-choice-button');
        const button = await element.find('pierce/button');
        expect(button).not.toBeNull();
        expect(element).toEqualAttribute('size', 'medium');
        expect(element).not.toHaveAttribute('selected');
        expect(element).not.toHaveAttribute('disabled');
    });
    it('can update size', async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <market-choice-button size='large'>
            Choice
          </market-choice-button>
        `);
        const element = await page.find('market-choice-button');
        expect(element).toEqualAttribute('size', 'large');
    });
    it('can be disabled', async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <market-choice-button disabled>
            Choice
          </market-choice-button>
        `);
        const element = await page.find('market-choice-button');
        expect(element).toHaveAttribute('disabled');
    });
    it('should set tabindex to -1 when disabled', async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <market-choice-button disabled>
            Choice
          </market-choice-button>
        `);
        const element = await page.find('market-choice-button');
        expect(element).toEqualAttribute('tabindex', '-1');
    });
    it('can be selected and unselected when clicked and emit proper custom events', async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <market-choice-button>
            Choice
          </market-choice-button>
        `);
        const element = await page.find('market-choice-button');
        expect(element).not.toHaveAttribute('selected');
        const elementSelectSpy = await element.spyOnEvent('marketChoiceButtonSelected');
        const elementDeselectSpy = await element.spyOnEvent('marketChoiceButtonDeselected');
        await element.click();
        await page.waitForChanges();
        expect(element).toHaveAttribute('selected');
        expect(elementSelectSpy).toHaveReceivedEventTimes(1);
        expect(elementDeselectSpy).not.toHaveReceivedEvent();
        await element.click();
        await page.waitForChanges();
        expect(element).not.toHaveAttribute('selected');
        expect(elementDeselectSpy).toHaveReceivedEventTimes(1);
    });
    it('cannot emit click or custom events and cannot be selected when disabled', async () => {
        const page = await newE2EPage();
        await page.setContent(`
          <market-choice-button disabled>
            Choice
          </market-choice-button>
        `);
        const pageClickSpy = await page.spyOnEvent('click');
        const element = await page.find('market-choice-button');
        expect(element).toHaveAttribute('disabled');
        expect(element).not.toHaveAttribute('selected');
        const elementClickSpy = await element.spyOnEvent('click');
        const elementSelectSpy = await element.spyOnEvent('marketChoiceButtonSelected');
        const elementDeselectSpy = await element.spyOnEvent('marketChoiceButtonDeselected');
        await page.click('market-choice-button');
        await page.waitForChanges();
        expect(pageClickSpy).not.toHaveReceivedEvent();
        expect(elementClickSpy).not.toHaveReceivedEvent();
        expect(elementSelectSpy).not.toHaveReceivedEvent();
        expect(element).not.toHaveAttribute('selected');
        await page.click('market-choice-button');
        await page.waitForChanges();
        expect(pageClickSpy).not.toHaveReceivedEvent();
        expect(elementClickSpy).not.toHaveReceivedEvent();
        expect(elementDeselectSpy).not.toHaveReceivedEvent();
    });
});
//# sourceMappingURL=market-choice-button.e2e.js.map
