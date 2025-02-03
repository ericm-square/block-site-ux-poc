import { newE2EPage } from "@stencil/core/testing";
describe('market-date-picker-date', () => {
    it('default renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-date-picker-date></market-date-picker-date>');
        const element = await page.find('market-date-picker-date');
        expect(element).toHaveAttribute('hydrated');
        expect(element).toEqualAttribute('selection', 'none');
        expect(element).not.toHaveAttribute('day');
        expect(element).not.toHaveAttribute('today');
        expect(element).not.toHaveAttribute('disabled');
        expect(element).not.toHaveAttribute('selected');
    });
    it('when selection="none" cannot be selected when clicked', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-date-picker-date></market-date-picker-date>');
        const element = await page.find('market-date-picker-date');
        expect(element).toHaveAttribute('hydrated');
        expect(element).toEqualAttribute('selection', 'none');
        const elementSelectSpy = await element.spyOnEvent('marketDatePickerDateSelected');
        await page.click('market-date-picker-date');
        await page.waitForChanges();
        expect(elementSelectSpy).not.toHaveReceivedEvent();
        expect(element).not.toHaveAttribute('selected');
    });
    it('can be disabled and not emit any events', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-date-picker-date disabled day="12"></market-date-picker-date>');
        const element = await page.find('market-date-picker-date');
        expect(element).toHaveAttribute('disabled');
        const pageClickSpy = await page.spyOnEvent('click');
        const elementClickSpy = await element.spyOnEvent('click');
        const elementSelectSpy = await element.spyOnEvent('marketDatePickerDateSelected');
        await page.click('market-date-picker-date');
        await page.waitForChanges();
        expect(pageClickSpy).not.toHaveReceivedEvent();
        expect(elementClickSpy).not.toHaveReceivedEvent();
        expect(elementSelectSpy).not.toHaveReceivedEvent();
    });
    it('can have empty day string and not emit any events', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-date-picker-date day></market-date-picker-date>');
        const element = await page.find('market-date-picker-date');
        const elementClickSpy = await element.spyOnEvent('click');
        const elementSelectSpy = await element.spyOnEvent('marketDatePickerDateSelected');
        await page.click('market-date-picker-date');
        await page.waitForChanges();
        expect(elementClickSpy).not.toHaveReceivedEvent();
        expect(elementSelectSpy).not.toHaveReceivedEvent();
    });
    it('can emit proper custom event when clicked and become selected when selection is not "none" ', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-date-picker-date day="12" selection="single"></market-date-picker-date>');
        const element = await page.find('market-date-picker-date');
        expect(element).toEqualAttribute('selection', 'single');
        expect(element).toEqualAttribute('day', '12');
        expect(element).not.toHaveAttribute('selected');
        const pageClickSpy = await page.spyOnEvent('click');
        const elementClickSpy = await element.spyOnEvent('click');
        const elementSelectSpy = await element.spyOnEvent('marketDatePickerDateSelected');
        await page.click('market-date-picker-date');
        await page.waitForChanges();
        expect(pageClickSpy).toHaveReceivedEvent();
        expect(elementClickSpy).toHaveReceivedEvent();
        expect(elementSelectSpy).toHaveReceivedEvent();
    });
});
//# sourceMappingURL=market-date-picker-date.e2e.js.map
