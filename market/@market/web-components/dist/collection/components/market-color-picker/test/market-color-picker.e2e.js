import { newE2EPage } from "@stencil/core/testing";
import { CORE_RED_FILL_COLOR } from "@market/market-theme/js/cjs/index.js";
describe('market-color-picker', () => {
    let page;
    let element;
    let gradientElement;
    let swatchListElement;
    let inputElement;
    let gradientChangeEvent;
    let swatchChangeEvent;
    let inputChangeEvent;
    let colorPickerChangeEvent;
    // Gradient related testing
    let primaryGradient;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-color-picker>
        <market-color-picker-gradient></market-color-picker-gradient>
        <market-color-swatch-list></market-color-swatch-list>
        <market-color-picker-input></market-color-picker-input>  
      </market-color-picker>
    `);
        element = await page.find('market-color-picker');
        gradientElement = await element.find('pierce/market-color-picker-gradient');
        swatchListElement = await element.find('pierce/market-color-swatch-list');
        inputElement = await element.find('pierce/market-color-picker-input');
        gradientChangeEvent = await page.spyOnEvent('marketColorPickerGradientValueChange');
        swatchChangeEvent = await page.spyOnEvent('marketColorSwatchListValueChange');
        inputChangeEvent = await page.spyOnEvent('marketColorPickerInputValueChange');
        colorPickerChangeEvent = await page.spyOnEvent('marketColorPickerValueChange');
        // For gradient related tests
        primaryGradient = await gradientElement.find('pierce/.primary-gradient');
    });
    it('renders', async () => {
        expect(element).not.toBeNull();
        expect(element).not.toHaveAttribute('value');
        expect(gradientElement).not.toBeNull();
        expect(gradientElement).not.toHaveAttribute('value');
        expect(swatchListElement).not.toBeNull();
        expect(swatchListElement).not.toHaveAttribute('value');
        const swatchElements = await swatchListElement.findAll('market-color-swatch');
        expect(swatchElements.length).toEqual(0);
        expect(inputElement).not.toBeNull();
        expect(inputElement).not.toHaveAttribute('value');
    });
    it('renders with a default value and saved swatch colors', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-color-picker value="#FFFFFF">
        <market-color-picker-gradient></market-color-picker-gradient>
        <market-color-swatch-list>
          <market-color-swatch value="rgb(204, 0, 35)"></market-color-swatch>
          <market-color-swatch value="rgb(255, 191, 0)"></market-color-swatch>
          <market-color-swatch value="rgb(0, 106, 255)"></market-color-swatch>
        </market-color-swatch-list>
        <market-color-picker-input></market-color-picker-input>
      </market-color-picker>
    `);
        element = await page.find('market-color-picker');
        gradientElement = await element.find('pierce/market-color-picker-gradient');
        swatchListElement = await element.find('pierce/market-color-swatch-list');
        inputElement = await element.find('pierce/market-color-picker-input');
        expect(await element.getProperty('value')).toEqual('#FFFFFF');
        expect(await gradientElement.getProperty('value')).toEqual('#FFFFFF');
        expect(swatchListElement).not.toBeNull();
        expect(await swatchListElement.getProperty('value')).toEqual('#FFFFFF');
        const swatchElements = await swatchListElement.findAll('market-color-swatch');
        expect(swatchElements.length).toEqual(3);
        expect(await inputElement.getProperty('value')).toEqual('#FFFFFF');
    });
    it('can render without gradient and input', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-color-picker>
        <market-color-swatch-list></market-color-swatch-list>
      </market-color-picker>
    `);
        element = await page.find('market-color-picker');
        gradientElement = await element.find('pierce/market-color-picker-gradient');
        swatchListElement = await element.find('pierce/market-color-swatch-list');
        inputElement = await element.find('pierce/market-color-picker-input');
        expect(gradientElement).toBeNull();
        expect(swatchListElement).not.toBeNull();
        expect(inputElement).toBeNull();
    });
    it('can render without swatch list', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-color-picker>
        <market-color-picker-gradient></market-color-picker-gradient>
        <market-color-picker-input></market-color-picker-input>  
    </market-color-picker>
    `);
        element = await page.find('market-color-picker');
        gradientElement = await element.find('pierce/market-color-picker-gradient');
        swatchListElement = await element.find('pierce/market-color-swatch-list');
        inputElement = await element.find('pierce/market-color-picker-input');
        expect(gradientElement).not.toBeNull();
        expect(swatchListElement).toBeNull();
        expect(inputElement).not.toBeNull();
    });
    it('updates the input value when the gradient is updated', async () => {
        expect(inputElement).not.toHaveAttribute('value');
        expect(gradientChangeEvent).not.toHaveReceivedEvent();
        expect(colorPickerChangeEvent).not.toHaveReceivedEvent();
        primaryGradient.click();
        await page.waitForChanges();
        expect(inputElement).toHaveAttribute('value');
        expect(gradientChangeEvent).toHaveReceivedEvent();
        expect(swatchChangeEvent).not.toHaveReceivedEvent();
        expect(inputChangeEvent).not.toHaveReceivedEvent();
        expect(colorPickerChangeEvent).toHaveReceivedEvent();
    });
    describe('when interacting with swatches', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-color-picker>
          <market-color-picker-gradient></market-color-picker-gradient>
          <market-color-swatch-list>
            <market-color-swatch value="rgb(204, 0, 35)"></market-color-swatch>
            <market-color-swatch value="rgb(255, 191, 0)"></market-color-swatch>
            <market-color-swatch value="rgb(0, 106, 255)"></market-color-swatch>
          </market-color-swatch-list>
          <market-color-picker-input></market-color-picker-input>  
        </market-color-picker>
      `);
            element = await page.find('market-color-picker');
            gradientElement = await element.find('pierce/market-color-picker-gradient');
            swatchListElement = await element.find('pierce/market-color-swatch-list');
            inputElement = await element.find('pierce/market-color-picker-input');
            gradientChangeEvent = await page.spyOnEvent('marketColorPickerGradientValueChange');
            swatchChangeEvent = await page.spyOnEvent('marketColorSwatchListValueChange');
            inputChangeEvent = await page.spyOnEvent('marketColorPickerInputValueChange');
            colorPickerChangeEvent = await page.spyOnEvent('marketColorPickerValueChange');
        });
        it('updates the gradient selection and input selection when swatch is selected', async () => {
            expect(inputElement).not.toHaveAttribute('value');
            expect(gradientElement).not.toHaveAttribute('value');
            expect(gradientChangeEvent).not.toHaveReceivedEvent();
            expect(swatchChangeEvent).not.toHaveReceivedEvent();
            expect(inputChangeEvent).not.toHaveReceivedEvent();
            expect(colorPickerChangeEvent).not.toHaveReceivedEvent();
            const swatchList = await swatchListElement.findAll('market-color-swatch');
            const redSwatch = swatchList[0];
            expect(swatchList.length).toBe(3);
            expect(redSwatch).not.toBeNull();
            redSwatch.click();
            await page.waitForChanges();
            // The CORE_RED_FILL_COLOR gets converted to hex for the input, which should be '#cc0023'
            const RED_COLOR_HEX = '#cc0023';
            expect(inputElement).toEqualAttribute('value', RED_COLOR_HEX);
            expect(await gradientElement.getProperty('value')).toEqual(CORE_RED_FILL_COLOR);
            expect(gradientChangeEvent).not.toHaveReceivedEvent();
            expect(swatchChangeEvent).toHaveReceivedEvent();
            expect(inputChangeEvent).not.toHaveReceivedEvent();
            expect(colorPickerChangeEvent).toHaveReceivedEvent();
        });
        it('clears input when swatch is deselected', async () => {
            const swatchList = await swatchListElement.findAll('market-color-swatch');
            const redSwatch = swatchList[0];
            redSwatch.click();
            await page.waitForChanges();
            redSwatch.click();
            await page.waitForChanges();
            expect(inputElement).toEqualAttribute('value', '');
            expect(await gradientElement.getProperty('value')).toEqual('');
        });
    });
    it('updates gradient when input is typed in', async () => {
        const inputTextElement = await inputElement.find('pierce/market-input-text');
        const innerInput = await inputTextElement.find('pierce/input');
        expect(innerInput).not.toBeNull();
        await innerInput.type('#aff');
        await page.waitForChanges();
        const updatedInputElement = await element.find('pierce/market-color-picker-input');
        const updatedGradientElement = await element.find('pierce/market-color-picker-gradient');
        expect(updatedInputElement).toEqualAttribute('value', '#aff');
        expect(await updatedGradientElement.getProperty('value')).toEqual('#aff');
        expect(gradientChangeEvent).not.toHaveReceivedEvent();
        expect(inputChangeEvent).toHaveReceivedEvent();
        expect(colorPickerChangeEvent).toHaveReceivedEvent();
    });
});
//# sourceMappingURL=market-color-picker.e2e.js.map
