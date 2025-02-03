import { newE2EPage } from "@stencil/core/testing";
describe('market-color-picker-input', () => {
    let page;
    let element;
    let inputChangeEvent;
    let innerInput;
    let defaultIcon;
    let swatchIcon;
    beforeEach(async () => {
        page = await newE2EPage();
    });
    it('renders and shows default state', async () => {
        await page.setContent('<market-color-picker-input></market-color-picker-input>');
        element = await page.find('market-color-picker-input');
        expect(element).not.toBeNull();
        defaultIcon = await element.find('pierce/.color-picker-input-icon');
        expect(defaultIcon).not.toBeNull();
    });
    it('shows a swatch of corresponding color when value is provided', async () => {
        await page.setContent('<market-color-picker-input value="#FFFFFF"></market-color-picker-input>');
        element = await page.find('market-color-picker-input');
        defaultIcon = await element.find('pierce/.color-picker-input-icon');
        expect(defaultIcon).toBeNull();
        swatchIcon = await element.find('pierce/market-color-swatch');
        expect(swatchIcon).not.toBeNull();
        expect(await swatchIcon.getProperty('value')).toEqual('#FFFFFF');
    });
    it('shows default icon when invalid value is provided', async () => {
        await page.setContent('<market-color-picker-input value="invalid"></market-color-picker-input>');
        element = await page.find('market-color-picker-input');
        defaultIcon = await element.find('pierce/.color-picker-input-icon');
        expect(defaultIcon).not.toBeNull();
        swatchIcon = await element.find('pierce/market-color-swatch');
        expect(swatchIcon).toBeNull();
    });
    it('calls input text event when input value is changed and icon changes', async () => {
        await page.setContent('<market-color-picker-input></market-color-picker-input>');
        inputChangeEvent = await page.spyOnEvent('marketColorPickerInputValueChange');
        element = await page.find('market-color-picker-input');
        defaultIcon = await element.find('pierce/.color-picker-input-icon');
        expect(defaultIcon).not.toBeNull();
        swatchIcon = await element.find('pierce/market-color-swatch');
        expect(swatchIcon).toBeNull();
        expect(inputChangeEvent).not.toHaveReceivedEvent();
        const input = await element.find('pierce/market-input-text');
        innerInput = await input.find('pierce/input');
        expect(innerInput).not.toBeNull();
        await innerInput.type('#aff');
        await page.waitForChanges();
        expect(inputChangeEvent).toHaveReceivedEvent();
        expect(inputChangeEvent.lastEvent.detail.value).toEqual('#aff');
        const updatedDefaultIcon = await element.find('pierce/.color-picker-input-icon');
        expect(updatedDefaultIcon).toBeNull();
        const updatedSwatchIcon = await element.find('pierce/market-color-swatch');
        expect(updatedSwatchIcon).not.toBeNull();
    });
});
//# sourceMappingURL=market-color-picker-input.e2e.js.map
