import { newE2EPage } from "@stencil/core/testing";
describe('market-stepper: API', () => {
    let page;
    let el;
    let input;
    let decrement;
    let increment;
    let valueChangeSpy;
    let inputFocusSpy;
    let inputFocusEventSpy;
    let inputBlurSpy;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent('<market-stepper step="5" min="-10" max="10"></market-stepper>');
        el = await page.find('market-stepper');
        input = await el.find('pierce/input');
        decrement = await el.find('pierce/button:first-child');
        increment = await el.find('pierce/button:last-child');
        valueChangeSpy = await el.spyOnEvent('marketStepperValueChange');
        inputFocusSpy = await input.spyOnEvent('focus');
        inputFocusEventSpy = await el.spyOnEvent('marketStepperInputFocus');
        inputBlurSpy = await input.spyOnEvent('blur');
    });
    describe('setting the value programmatically', () => {
        describe('with a valid value', () => {
            beforeEach(async () => {
                el.setProperty('value', 5);
                await page.waitForChanges();
            });
            it('updates the value attribute and property', async () => {
                expect(el.getAttribute('value')).toBe('5');
                expect(await el.getProperty('value')).toBe(5);
            });
            it('updates the displayed value', async () => {
                expect(await input.getProperty('value')).toBe('5');
            });
            it('does not emit a change event (like a native <input>)', () => {
                expect(valueChangeSpy).not.toHaveReceivedEvent();
            });
        });
        describe('with an out of max range value', () => {
            beforeEach(async () => {
                el.setProperty('value', 20);
                await page.waitForChanges();
            });
            it('clamps the value to the max', async () => {
                expect(el.getAttribute('value')).toBe('10');
                expect(await el.getProperty('value')).toBe(10);
            });
            it('updates the displayed value', async () => {
                expect(await input.getProperty('value')).toBe('10');
            });
            it('does not emit a change event (like a native <input>)', () => {
                expect(valueChangeSpy).not.toHaveReceivedEvent();
            });
            it('disables the increment button', () => {
                expect(increment).toHaveAttribute('disabled');
            });
        });
        describe('with an out of min range value', () => {
            beforeEach(async () => {
                el.setProperty('value', -20);
                await page.waitForChanges();
            });
            it('clamps the value to the min', async () => {
                expect(el.getAttribute('value')).toBe('-10');
                expect(await el.getProperty('value')).toBe(-10);
            });
            it('updates the displayed value', async () => {
                expect(await input.getProperty('value')).toBe('-10');
            });
            it('does not emit a change event (like a native <input>)', () => {
                expect(valueChangeSpy).not.toHaveReceivedEvent();
            });
            it('disables the decrement button', () => {
                expect(decrement).toHaveAttribute('disabled');
            });
        });
        describe('with a value that is not a multiple of step', () => {
            beforeEach(async () => {
                el.setProperty('value', 9);
                await page.waitForChanges();
            });
            it('rounds the value to the nearest step value', async () => {
                expect(el.getAttribute('value')).toBe('10');
                expect(await el.getProperty('value')).toBe(10);
            });
            it('updates the displayed value', async () => {
                expect(await input.getProperty('value')).toBe('10');
            });
            it('does not emit a change event (like a native <input>)', () => {
                expect(valueChangeSpy).not.toHaveReceivedEvent();
            });
        });
        describe('with a value that creates a decimal rounding point error', () => {
            beforeEach(async () => {
                el.setProperty('step', 0.01);
                // without rounding fix, 0.35 becomes 0.35000000000000003
                el.setProperty('value', 0.35);
                await page.waitForChanges();
            });
            it('rounds the value to the nearest step value', async () => {
                expect(el.getAttribute('value')).toBe('0.35');
                expect(await el.getProperty('value')).toBe(0.35);
            });
        });
    });
    describe('calling setFocus()', () => {
        beforeEach(async () => {
            await el.callMethod('setFocus');
            await page.waitForChanges();
        });
        it('displays focus styling', () => {
            expect(el).toHaveAttribute('focused');
        });
        it('focuses the inner input', () => {
            expect(inputFocusSpy).toHaveReceivedEventTimes(1);
            expect(inputFocusEventSpy).toHaveReceivedEventTimes(1);
        });
    });
    describe('calling setFocus(false) when focused', () => {
        beforeEach(async () => {
            await el.callMethod('setFocus');
            await el.callMethod('setFocus', false);
            await page.waitForChanges();
        });
        it('removes focus styling', () => {
            expect(el).not.toHaveAttribute('focused');
        });
        it('blurs the inner input', () => {
            expect(inputBlurSpy).toHaveReceivedEventTimes(1);
        });
    });
});
//# sourceMappingURL=market-stepper.api.e2e.js.map
