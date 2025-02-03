import { newE2EPage } from "@stencil/core/testing";
import { expectValueToBe, expectInputHasFocus } from "./utils";
describe('market-code-input: keyboard interactivity', () => {
    let page;
    let el;
    let marketCodeInputValueChange;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-code-input></market-code-input>
    `);
        el = await page.find('market-code-input');
        marketCodeInputValueChange = await el.spyOnEvent('marketCodeInputValueChange');
    });
    it('can be tabbed in & out of', async () => {
        expect(el).not.toHaveAttribute('focused');
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        expect(el).toHaveAttribute('focused');
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        expect(el).not.toHaveAttribute('focused');
    });
    it('cannot be tabbed into while disabled', async () => {
        el.setProperty('disabled', true);
        await page.waitForChanges();
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        expect(el).not.toHaveAttribute('focused');
    });
    it('accepts input sequentially and properly emits events', async () => {
        // focus first input
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        // input 1st digit
        await expectInputHasFocus(el, 0);
        await page.keyboard.press('1');
        await page.waitForChanges();
        await expectValueToBe(el, '1');
        expect(marketCodeInputValueChange).toHaveReceivedEventTimes(1);
        expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1');
        // input 2nd digit
        await expectInputHasFocus(el, 1);
        await page.keyboard.press('2');
        await page.waitForChanges();
        await expectValueToBe(el, '12');
        expect(marketCodeInputValueChange).toHaveReceivedEventTimes(2);
        expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('12');
        // input 3rd digit
        await expectInputHasFocus(el, 2);
        await page.keyboard.press('3');
        await page.waitForChanges();
        await expectValueToBe(el, '123');
        expect(marketCodeInputValueChange).toHaveReceivedEventTimes(3);
        expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('123');
        // input 4th digit
        await expectInputHasFocus(el, 3);
        await page.keyboard.press('4');
        await page.waitForChanges();
        await expectValueToBe(el, '1234');
        expect(marketCodeInputValueChange).toHaveReceivedEventTimes(4);
        expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1234');
    });
    describe('when the component has a value', () => {
        beforeEach(async () => {
            el.setProperty('value', '1234');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
        });
        it('navigates between inputs with arrow keys', async () => {
            // first input has focus
            await expectInputHasFocus(el, 0);
            // navigate to the last input
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await expectInputHasFocus(el, 3);
            // change last value, focus remains on last input
            await page.keyboard.press('5');
            await page.waitForChanges();
            await expectInputHasFocus(el, 3);
            await expectValueToBe(el, '1235');
            expect(marketCodeInputValueChange).toHaveReceivedEventTimes(1);
            expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1235');
            // navigate back to the first input
            await page.keyboard.press('ArrowLeft');
            await page.keyboard.press('ArrowLeft');
            await page.keyboard.press('ArrowLeft');
            await expectInputHasFocus(el, 0);
            // change first value, focus moves to 2nd input
            await page.keyboard.press('6');
            await page.waitForChanges();
            await expectInputHasFocus(el, 1);
            await expectValueToBe(el, '6235');
            expect(marketCodeInputValueChange).toHaveReceivedEventTimes(2);
            expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('6235');
        });
        it('navigates between inputs with tab key', async () => {
            // first input has focus
            await expectInputHasFocus(el, 0);
            // navigate to the last input
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await expectInputHasFocus(el, 3);
            // change last value, focus remains on last input
            await page.keyboard.press('5');
            await page.waitForChanges();
            await expectInputHasFocus(el, 3);
            await expectValueToBe(el, '1235');
            expect(marketCodeInputValueChange).toHaveReceivedEventTimes(1);
            expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1235');
            // navigate back to the first input
            await page.keyboard.down('Shift');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.up('Shift');
            await expectInputHasFocus(el, 0);
            // change first value, focus moves to 2nd input
            await page.keyboard.press('6');
            await page.waitForChanges();
            await expectInputHasFocus(el, 1);
            await expectValueToBe(el, '6235');
            expect(marketCodeInputValueChange).toHaveReceivedEventTimes(2);
            expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('6235');
        });
        it('deletes input values with backspace key', async () => {
            // first input has focus
            await expectInputHasFocus(el, 0);
            // navigate to the last input
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await expectInputHasFocus(el, 3);
            // delete last value, focus remains on last input
            await page.keyboard.press('Backspace');
            await page.waitForChanges();
            await expectInputHasFocus(el, 3);
            await expectValueToBe(el, '123');
            expect(marketCodeInputValueChange).toHaveReceivedEventTimes(1);
            expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('123');
            // delete 3rd value, focus moves to 3rd input
            await page.keyboard.press('Backspace');
            await page.waitForChanges();
            await expectInputHasFocus(el, 2);
            await expectValueToBe(el, '12');
            expect(marketCodeInputValueChange).toHaveReceivedEventTimes(2);
            expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('12');
            // delete 2nd value, focus moves to 2nd input
            await page.keyboard.press('Backspace');
            await page.waitForChanges();
            await expectInputHasFocus(el, 1);
            await expectValueToBe(el, '1');
            expect(marketCodeInputValueChange).toHaveReceivedEventTimes(3);
            expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1');
            // delete 1st value, focus moves to 1st input
            await page.keyboard.press('Backspace');
            await page.waitForChanges();
            await expectInputHasFocus(el, 0);
            await expectValueToBe(el, '');
            expect(marketCodeInputValueChange).toHaveReceivedEventTimes(4);
            expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('');
        });
        it('can delete a middle input value and shift over the rest', async () => {
            // first input has focus
            await expectInputHasFocus(el, 0);
            // navigate to the 2nd input
            await page.keyboard.press('Tab');
            await expectInputHasFocus(el, 1);
            // delete 2nd value, focus remains on 2nd input
            await page.keyboard.press('Backspace');
            await page.waitForChanges();
            await expectInputHasFocus(el, 1);
            await expectValueToBe(el, '134');
            expect(marketCodeInputValueChange).toHaveReceivedEventTimes(1);
            expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('134');
        });
        it('can update a value in the middle of the input', async () => {
            // first input has focus
            await expectInputHasFocus(el, 0);
            // navigate to the 2nd input
            await page.keyboard.press('Tab');
            await expectInputHasFocus(el, 1);
            // update 2nd value, focus proceeds to 3rd input
            await page.keyboard.press('5');
            await page.waitForChanges();
            await expectInputHasFocus(el, 2);
            await expectValueToBe(el, '1534');
            expect(marketCodeInputValueChange).toHaveReceivedEventTimes(1);
            expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1534');
        });
        it('does not fire an event if the value did not change', async () => {
            // first input has focus
            await expectInputHasFocus(el, 0);
            // navigate to the 2nd input
            await page.keyboard.press('Tab');
            await expectInputHasFocus(el, 1);
            // enter the same value, focus proceeds to 3rd input
            await page.keyboard.press('2');
            await page.waitForChanges();
            await expectInputHasFocus(el, 2);
            await expectValueToBe(el, '1234');
            expect(marketCodeInputValueChange).not.toHaveReceivedEvent();
        });
    });
    describe('when the component has a partial value', () => {
        beforeEach(async () => {
            el.setProperty('value', '12');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
        });
        it('will not arrow past an empty input', async () => {
            // first input has focus
            await expectInputHasFocus(el, 0);
            // try to navigate to the last input
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('ArrowRight');
            await page.waitForChanges();
            // focus stays on 3rd input
            await expectInputHasFocus(el, 2);
        });
        it('will not tab past an empty input', async () => {
            // first input has focus
            await expectInputHasFocus(el, 0);
            // try to navigate to the last input
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            // focus has left the component
            expect(el).not.toHaveAttribute('focused');
        });
    });
});
//# sourceMappingURL=market-code-input.keyboard.e2e.js.map
