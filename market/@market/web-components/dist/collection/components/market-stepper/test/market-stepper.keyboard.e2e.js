import { newE2EPage } from "@stencil/core/testing";
describe('market-stepper: keyboard interactivity', () => {
    let page;
    let el;
    let input;
    let decrement;
    let increment;
    let valueChangeSpy;
    let inputFocusSpy;
    let inputFocusEventSpy;
    let inputBlurSpy;
    let decrementFocusSpy;
    let decrementBlurSpy;
    let incrementFocusSpy;
    let incrementBlurSpy;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <form action="#">
        <market-stepper step="5" min="-10" max="10"></market-stepper>
        <market-button type="submit">Submit</market-button>
      </form>
    `);
        el = await page.find('market-stepper');
        input = await el.find('pierce/input');
        decrement = await el.find('pierce/button:first-child');
        increment = await el.find('pierce/button:last-child');
        valueChangeSpy = await el.spyOnEvent('marketStepperValueChange');
        inputFocusSpy = await input.spyOnEvent('focus');
        inputFocusEventSpy = await el.spyOnEvent('marketStepperInputFocus');
        inputBlurSpy = await input.spyOnEvent('blur');
        decrementFocusSpy = await decrement.spyOnEvent('focus');
        decrementBlurSpy = await decrement.spyOnEvent('blur');
        incrementFocusSpy = await increment.spyOnEvent('focus');
        incrementBlurSpy = await increment.spyOnEvent('blur');
    });
    it('can be tabbed through', async () => {
        expect(el).not.toHaveAttribute('focused');
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        expect(el).toHaveAttribute('focused');
        expect(decrementFocusSpy).toHaveReceivedEventTimes(1);
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        expect(el).toHaveAttribute('focused');
        expect(decrementBlurSpy).toHaveReceivedEventTimes(1);
        expect(inputFocusSpy).toHaveReceivedEventTimes(1);
        expect(inputFocusEventSpy).toHaveReceivedEventTimes(1);
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        expect(el).toHaveAttribute('focused');
        expect(inputBlurSpy).toHaveReceivedEventTimes(1);
        expect(incrementFocusSpy).toHaveReceivedEventTimes(1);
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        expect(el).not.toHaveAttribute('focused');
        expect(incrementBlurSpy).toHaveReceivedEventTimes(1);
    });
    it('cannot be tabbed through while disabled', async () => {
        el.setProperty('disabled', true);
        await page.waitForChanges();
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        expect(el).not.toHaveAttribute('focused');
        expect(decrementFocusSpy).not.toHaveReceivedEvent();
        expect(inputFocusSpy).not.toHaveReceivedEvent();
        expect(incrementFocusSpy).not.toHaveReceivedEvent();
    });
    describe('when the decrement button has focus', () => {
        beforeEach(async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
        });
        describe('and enter is pressed', () => {
            beforeEach(async () => {
                await page.keyboard.press('Enter');
                await page.waitForChanges();
            });
            it('remains focused', () => {
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
                    await page.keyboard.press('Enter');
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
    });
    describe('when the increment button has focus', () => {
        beforeEach(async () => {
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
        });
        describe('and enter is pressed', () => {
            beforeEach(async () => {
                await page.keyboard.press('Enter');
                await page.waitForChanges();
            });
            it('remains focused', () => {
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
                    await page.keyboard.press('Enter');
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
    describe('when the inner input has focus', () => {
        beforeEach(async () => {
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
        });
        it('submits the form with enter', async () => {
            const form = await page.find('form');
            const formSubmitSpy = await form.spyOnEvent('submit');
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            expect(formSubmitSpy).toHaveReceivedEventTimes(1);
        });
        describe('and a valid value is entered', () => {
            beforeEach(async () => {
                await page.keyboard.type('-5');
                await page.keyboard.press('Tab'); // blur the input
                await page.waitForChanges();
            });
            it('updates the value attribute and property', async () => {
                expect(el.getAttribute('value')).toBe('-5');
                expect(await el.getProperty('value')).toBe(-5);
            });
            it('updates the displayed value', async () => {
                expect(await input.getProperty('value')).toBe('-5');
            });
            it('emits a change event', () => {
                expect(valueChangeSpy).toHaveReceivedEventTimes(1);
                expect(valueChangeSpy.lastEvent.detail.value).toBe(-5);
                expect(valueChangeSpy.lastEvent.detail.previousValue).toBe(undefined);
            });
        });
        describe('and an out of max range value is entered', () => {
            beforeEach(async () => {
                await page.keyboard.type('20');
                await page.keyboard.press('Tab'); // blur the input
                await page.waitForChanges();
            });
            it('clamps the value to the max', async () => {
                expect(el.getAttribute('value')).toBe('10');
                expect(await el.getProperty('value')).toBe(10);
            });
            it('updates the displayed value', async () => {
                expect(await input.getProperty('value')).toBe('10');
            });
            it('emits a change event', () => {
                expect(valueChangeSpy).toHaveReceivedEventTimes(1);
                expect(valueChangeSpy.lastEvent.detail.value).toBe(10);
                expect(valueChangeSpy.lastEvent.detail.previousValue).toBe(undefined);
            });
            it('disables the increment button', () => {
                expect(increment).toHaveAttribute('disabled');
            });
        });
        describe('and an out of min range value is entered', () => {
            beforeEach(async () => {
                await page.keyboard.type('-20');
                await page.keyboard.press('Tab'); // blur the input
                await page.waitForChanges();
            });
            it('clamps the value to the min', async () => {
                expect(el.getAttribute('value')).toBe('-10');
                expect(await el.getProperty('value')).toBe(-10);
            });
            it('updates the displayed value', async () => {
                expect(await input.getProperty('value')).toBe('-10');
            });
            it('emits a change event', () => {
                expect(valueChangeSpy).toHaveReceivedEventTimes(1);
                expect(valueChangeSpy.lastEvent.detail.value).toBe(-10);
                expect(valueChangeSpy.lastEvent.detail.previousValue).toBe(undefined);
            });
            it('disables the decrement button', () => {
                expect(decrement).toHaveAttribute('disabled');
            });
        });
        describe('and a value is entered that is not a multiple of step', () => {
            beforeEach(async () => {
                await page.keyboard.type('9');
                await page.keyboard.press('Tab'); // blur the input
                await page.waitForChanges();
            });
            it('rounds the value to the nearest step value', async () => {
                expect(el.getAttribute('value')).toBe('10');
                expect(await el.getProperty('value')).toBe(10);
            });
            it('updates the displayed value', async () => {
                expect(await input.getProperty('value')).toBe('10');
            });
            it('emits a change event', () => {
                expect(valueChangeSpy).toHaveReceivedEventTimes(1);
                expect(valueChangeSpy.lastEvent.detail.value).toBe(10);
                expect(valueChangeSpy.lastEvent.detail.previousValue).toBe(undefined);
            });
        });
        describe('and the down arrow is pressed', () => {
            beforeEach(async () => {
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
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
                    await page.keyboard.press('ArrowDown');
                    await page.waitForChanges();
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
        describe('and the up arrow is pressed', () => {
            beforeEach(async () => {
                await page.keyboard.press('ArrowUp');
                await page.waitForChanges();
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
                    await page.keyboard.press('ArrowUp');
                    await page.waitForChanges();
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
});
//# sourceMappingURL=market-stepper.keyboard.e2e.js.map
