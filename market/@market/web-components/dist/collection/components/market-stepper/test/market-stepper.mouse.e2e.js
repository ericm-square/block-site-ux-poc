import { newE2EPage } from "@stencil/core/testing";
describe('market-stepper: mouse interactivity', () => {
    let page;
    let el;
    let input;
    let decrement;
    let increment;
    let valueChangeSpy;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent('<market-stepper step="5" min="-10" max="10"></market-stepper>');
        el = await page.find('market-stepper');
        input = await el.find('pierce/input');
        decrement = await el.find('pierce/button:first-child');
        increment = await el.find('pierce/button:last-child');
        valueChangeSpy = await el.spyOnEvent('marketStepperValueChange');
    });
    describe('clicking the input', () => {
        beforeEach(async () => {
            await input.click();
            await page.waitForChanges();
        });
        it('adds focus styles', () => {
            expect(el).toHaveAttribute('focused');
        });
    });
    describe('clicking the decrement button', () => {
        beforeEach(async () => {
            await decrement.click();
            await page.waitForChanges();
        });
        it('adds focus styles', () => {
            expect(el).toHaveAttribute('focused');
        });
        it('decrements the input value by the step', async () => {
            expect(await input.getProperty('value')).toBe('-5');
        });
        it('updates the value attribute and property', async () => {
            expect(el.getAttribute('value')).toBe('-5');
            expect(await el.getProperty('value')).toBe(-5);
        });
        it('emits the change event', () => {
            expect(valueChangeSpy).toHaveReceivedEventTimes(1);
            expect(valueChangeSpy.lastEvent.detail.value).toBe(-5);
            expect(valueChangeSpy.lastEvent.detail.previousValue).toBe(undefined);
        });
        describe('until the min value is reached', () => {
            beforeEach(async () => {
                await decrement.click();
                await page.waitForChanges();
            });
            it('removes focus styles', () => {
                expect(el).not.toHaveAttribute('focused');
            });
            it('decrements the input value to the min', async () => {
                expect(await input.getProperty('value')).toBe('-10');
            });
            it('updates the value attribute and property', async () => {
                expect(el.getAttribute('value')).toBe('-10');
                expect(await el.getProperty('value')).toBe(-10);
            });
            it('emits an event for each change', () => {
                expect(valueChangeSpy).toHaveReceivedEventTimes(2);
                expect(valueChangeSpy.lastEvent.detail.value).toBe(-10);
                expect(valueChangeSpy.lastEvent.detail.previousValue).toBe(-5);
            });
            it('disables the decrement button', () => {
                expect(decrement).toHaveAttribute('disabled');
                expect(decrement).toEqualAttribute('tabindex', '-1');
            });
        });
    });
    describe('clicking the increment button', () => {
        beforeEach(async () => {
            await increment.click();
            await page.waitForChanges();
        });
        it('adds focus styles', () => {
            expect(el).toHaveAttribute('focused');
        });
        it('increments the input value by the step', async () => {
            expect(await input.getProperty('value')).toBe('5');
        });
        it('updates the value attribute and property', async () => {
            expect(el.getAttribute('value')).toBe('5');
            expect(await el.getProperty('value')).toBe(5);
        });
        it('emits the change event', () => {
            expect(valueChangeSpy).toHaveReceivedEventTimes(1);
            expect(valueChangeSpy.lastEvent.detail.value).toBe(5);
            expect(valueChangeSpy.lastEvent.detail.previousValue).toBe(undefined);
        });
        describe('until the max value is reached', () => {
            beforeEach(async () => {
                await increment.click();
                await page.waitForChanges();
            });
            it('removes focus styles', () => {
                expect(el).not.toHaveAttribute('focused');
            });
            it('increments the input value to the max', async () => {
                expect(await input.getProperty('value')).toBe('10');
            });
            it('updates the value attribute and property', async () => {
                expect(el.getAttribute('value')).toBe('10');
                expect(await el.getProperty('value')).toBe(10);
            });
            it('emits an event for each change', () => {
                expect(valueChangeSpy).toHaveReceivedEventTimes(2);
                expect(valueChangeSpy.lastEvent.detail.value).toBe(10);
                expect(valueChangeSpy.lastEvent.detail.previousValue).toBe(5);
            });
            it('disables the increment button', () => {
                expect(increment).toHaveAttribute('disabled');
                expect(increment).toEqualAttribute('tabindex', '-1');
            });
        });
    });
});
//# sourceMappingURL=market-stepper.mouse.e2e.js.map
