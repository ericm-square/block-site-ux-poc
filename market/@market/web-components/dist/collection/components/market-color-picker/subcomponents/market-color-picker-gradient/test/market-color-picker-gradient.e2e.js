import { newE2EPage } from "@stencil/core/testing";
describe('market-color-picker-gradient', () => {
    let page;
    let element;
    let gradientChangeEvent;
    let primaryPicker;
    let secondaryPicker;
    let primaryGradient;
    let secondaryGradient;
    let primaryStyles;
    let secondaryStyles;
    let secondaryGradientStyles;
    let primaryBackground;
    let secondaryBackground;
    let secondaryGradientBackground;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent('<market-color-picker-gradient value="#006AFF"></market-color-picker-gradient>');
        element = await page.find('market-color-picker-gradient');
        primaryPicker = await element.find('pierce/#primary-pointer');
        secondaryPicker = await element.find('pierce/#secondary-pointer');
        primaryGradient = await element.find('pierce/.primary-gradient');
        secondaryGradient = await element.find('pierce/.secondary-gradient');
        gradientChangeEvent = await page.spyOnEvent('marketColorPickerGradientValueChange');
        // The rgb value of #006AFF is rgb(0, 106, 255).
        primaryStyles = await primaryPicker.getComputedStyle();
        secondaryStyles = await secondaryPicker.getComputedStyle();
        secondaryGradientStyles = await secondaryGradient.getComputedStyle();
        primaryBackground = primaryStyles.getPropertyValue('backgroundColor');
        secondaryBackground = secondaryStyles.getPropertyValue('backgroundColor');
        secondaryGradientBackground = secondaryGradientStyles.getPropertyValue('background');
        await page.waitForChanges();
    });
    it('renders', () => {
        expect(element).toHaveClass('market-color-picker-gradient');
        expect(primaryPicker).toHaveClass('pointer');
        expect(secondaryPicker).toHaveClass('pointer');
        expect(primaryGradient).toHaveClass('primary-gradient');
        expect(secondaryGradient).toHaveClass('secondary-gradient');
    });
    it('renders with a preset value', () => {
        expect(primaryBackground).toEqual('rgb(0, 106, 255)');
        expect(secondaryBackground).toEqual('rgb(0, 106, 255)');
        // The expected gradient background for #006AFF.
        expect(secondaryGradientBackground).toContain('linear-gradient(to top, rgb(0, 0, 0)');
        expect(secondaryGradientBackground).toContain('linear-gradient(to left, rgb(0, 106, 255), rgb(255, 255, 255))');
    });
    it('updates picker colors, secondary gradient, and does not call event on value change', async () => {
        expect(gradientChangeEvent).not.toHaveReceivedEvent();
        await element.setProperty('value', '#00B23B');
        await page.waitForChanges();
        // get recomputed styles
        primaryStyles = await primaryPicker.getComputedStyle();
        secondaryStyles = await secondaryPicker.getComputedStyle();
        secondaryGradientStyles = await secondaryGradient.getComputedStyle();
        const updatedPrimaryBackground = primaryStyles.getPropertyValue('backgroundColor');
        const updatedSecondaryBackground = secondaryStyles.getPropertyValue('backgroundColor');
        const updatedSecondaryGradientBackground = secondaryGradientStyles.getPropertyValue('background');
        expect(updatedPrimaryBackground).toEqual('rgb(0, 255, 85)');
        expect(updatedSecondaryBackground).toEqual('rgb(0, 178, 59)');
        expect(updatedSecondaryGradientBackground).toContain('linear-gradient(to left, rgb(0, 255, 85), rgb(255, 255, 255))');
        expect(gradientChangeEvent).not.toHaveReceivedEvent();
    });
    describe('when a pointer is dragged', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            // absolutely position elements to simplify mouse manipulation
            await page.setContent(`
        <market-color-picker-gradient value="#006AFF" style="position: absolute; width: 200px; top: 0; left: 0;">
        </market-color-picker-gradient>
      `);
        });
        it('updates secondary gradient when primary pointer is dragged via click event and calls event', async () => {
            // Expected starting background gradient.
            expect(secondaryGradientBackground).toContain('linear-gradient(to top, rgb(0, 0, 0)');
            expect(secondaryGradientBackground).toContain('linear-gradient(to left, rgb(0, 106, 255), rgb(255, 255, 255))');
            expect(gradientChangeEvent).not.toHaveReceivedEvent();
            expect(primaryBackground).toEqual('rgb(0, 106, 255)');
            expect(secondaryBackground).toEqual('rgb(0, 106, 255)');
            primaryGradient.click();
            await page.waitForChanges();
            // Repopulate changes
            secondaryGradient = await element.find('pierce/.secondary-gradient');
            secondaryGradientStyles = await secondaryGradient.getComputedStyle();
            const updatedSecondaryGradientBackground = secondaryGradientStyles.getPropertyValue('background');
            primaryStyles = await primaryPicker.getComputedStyle();
            secondaryStyles = await secondaryPicker.getComputedStyle();
            const updatedPrimaryBackground = primaryStyles.getPropertyValue('backgroundColor');
            const updatedSecondaryBackground = secondaryStyles.getPropertyValue('backgroundColor');
            // Secondary gradient should change
            expect(updatedSecondaryGradientBackground).not.toContain('linear-gradient(to left, rgb(0, 106, 255), rgb(255, 255, 255))');
            // Primary pointer background should update
            expect(updatedPrimaryBackground).not.toEqual('rgb(0, 106, 255)');
            // Secondary pointer background should update
            expect(updatedSecondaryBackground).not.toEqual('rgb(0, 106, 255)');
            expect(gradientChangeEvent).toHaveReceivedEvent();
        });
        it('updates secondary color when secondary pointer is dragged via click event and calls event', async () => {
            // Expected starting background gradient.
            expect(secondaryGradientBackground).toContain('linear-gradient(to top, rgb(0, 0, 0)');
            expect(secondaryGradientBackground).toContain('linear-gradient(to left, rgb(0, 106, 255), rgb(255, 255, 255))');
            expect(gradientChangeEvent).not.toHaveReceivedEvent();
            expect(primaryBackground).toEqual('rgb(0, 106, 255)');
            expect(secondaryBackground).toEqual('rgb(0, 106, 255)');
            secondaryGradient.click();
            await page.waitForChanges();
            // Repopulate changes
            const updatedSecondaryGradient = await element.find('pierce/.secondary-gradient');
            const updatedSecondaryGradientStyles = await updatedSecondaryGradient.getComputedStyle();
            const updatedSecondaryGradientBackground = updatedSecondaryGradientStyles.getPropertyValue('background');
            primaryStyles = await primaryPicker.getComputedStyle();
            secondaryStyles = await secondaryPicker.getComputedStyle();
            const updatedPrimaryBackground = primaryStyles.getPropertyValue('backgroundColor');
            const updatedSecondaryBackground = secondaryStyles.getPropertyValue('backgroundColor');
            // Secondary background gradient should not change on secondary pointer movement.
            expect(updatedSecondaryGradientBackground).toContain('linear-gradient(to top, rgb(0, 0, 0)');
            expect(updatedSecondaryGradientBackground).toContain('linear-gradient(to left, rgb(0, 106, 255), rgb(255, 255, 255))');
            // Primary pointer background should not update
            expect(updatedPrimaryBackground).toEqual('rgb(0, 106, 255)');
            // Secondary pointer background should update
            expect(updatedSecondaryBackground).not.toEqual('rgb(0, 106, 255)');
            expect(gradientChangeEvent).toHaveReceivedEvent();
        });
    });
});
//# sourceMappingURL=market-color-picker-gradient.e2e.js.map
