import { newE2EPage } from "@stencil/core/testing";
import { expectValueToBe, expectInputHasFocus } from "./utils";
describe('market-code-input', () => {
    let page;
    let el;
    let marketCodeInputValueChange;
    it('renders with defaults', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input></market-code-input>');
        el = await page.find('market-code-input');
        expect(el).not.toBeNull();
        const inputs = el.shadowRoot.querySelectorAll('input');
        expect(inputs.length).toBe(4);
        const input = inputs[0];
        expect(input).not.toBeNull();
        expect(input).toEqualAttribute('autocomplete', 'one-time-code');
        expect(input).toEqualAttribute('type', 'text');
        expect(input).toEqualAttribute('inputmode', 'numeric');
        expect(input).toEqualAttribute('name', null);
        expect(input).toEqualAttribute('value', null);
        expect(input).toEqualAttribute('placeholder', '●');
    });
    it('can have a passed in value', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input value="5476"></market-code-input>');
        el = await page.find('market-code-input');
        await expectValueToBe(el, '5476');
    });
    it('sanitizes the passed in value', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input value="1 a 2 b 3 c 4 d 5 e"></market-code-input>');
        el = await page.find('market-code-input');
        await expectValueToBe(el, '1234');
    });
    it('can specify the length of the code', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input length="6"></market-code-input>');
        el = await page.find('market-code-input');
        const inputs = el.shadowRoot.querySelectorAll('input');
        expect(inputs.length).toBe(6);
    });
    it('can have a trailing accessory', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-code-input>
        <svg slot="trailing-accessory"/>
      </market-code-input>
    `);
        const accessory = await page.find('market-code-input svg');
        expect(accessory).not.toBeNull();
        expect(accessory.getAttribute('slot')).toEqual('trailing-accessory');
    });
    it('can change value programmatically', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input value="1234"></market-code-input>');
        el = await page.find('market-code-input');
        marketCodeInputValueChange = await el.spyOnEvent('marketCodeInputValueChange');
        await page.$eval('market-code-input', (el) => {
            el.value = '4321';
        });
        await page.waitForChanges();
        // does change the value
        await expectValueToBe(el, '4321');
        // does not emit an event
        expect(marketCodeInputValueChange).not.toHaveReceivedEvent();
    });
    it('only allows numeric input by default', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input></market-code-input>');
        el = await page.find('market-code-input');
        marketCodeInputValueChange = await el.spyOnEvent('marketCodeInputValueChange');
        await el.click();
        // input 1st digit
        await expectInputHasFocus(el, 0);
        await page.keyboard.press('1');
        await page.waitForChanges();
        await expectValueToBe(el, '1');
        expect(marketCodeInputValueChange).toHaveReceivedEventTimes(1);
        expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1');
        // try to input non-digit; prevents input & change event
        await expectInputHasFocus(el, 1);
        await page.keyboard.press('A');
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
    });
    it('allows non-numeric input if type is set to text', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input type="text"></market-code-input>');
        el = await page.find('market-code-input');
        marketCodeInputValueChange = await el.spyOnEvent('marketCodeInputValueChange');
        await el.click();
        // input 1st digit
        await expectInputHasFocus(el, 0);
        await page.keyboard.press('1');
        await page.waitForChanges();
        await expectValueToBe(el, '1');
        expect(marketCodeInputValueChange).toHaveReceivedEventTimes(1);
        expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1');
        // input non-numeric char
        await expectInputHasFocus(el, 1);
        await page.keyboard.press('A');
        await page.waitForChanges();
        await expectValueToBe(el, '1A');
        expect(marketCodeInputValueChange).toHaveReceivedEventTimes(2);
        expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1A');
    });
    it('allows non-numeric input if type is set to password', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input type="password"></market-code-input>');
        el = await page.find('market-code-input');
        marketCodeInputValueChange = await el.spyOnEvent('marketCodeInputValueChange');
        await el.click();
        // input 1st digit
        await expectInputHasFocus(el, 0);
        await page.keyboard.press('1');
        await page.waitForChanges();
        await expectValueToBe(el, '1');
        expect(marketCodeInputValueChange).toHaveReceivedEventTimes(1);
        expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1');
        // input non-numeric char
        await expectInputHasFocus(el, 1);
        await page.keyboard.press('A');
        await page.waitForChanges();
        await expectValueToBe(el, '1A');
        expect(marketCodeInputValueChange).toHaveReceivedEventTimes(2);
        expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1A');
    });
    it('does NOT allow whitespace', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input type="text"></market-code-input>');
        el = await page.find('market-code-input');
        marketCodeInputValueChange = await el.spyOnEvent('marketCodeInputValueChange');
        await el.click();
        // input 1st digit
        await expectInputHasFocus(el, 0);
        await page.keyboard.press('1');
        await page.waitForChanges();
        await expectValueToBe(el, '1');
        expect(marketCodeInputValueChange).toHaveReceivedEventTimes(1);
        expect(marketCodeInputValueChange.lastEvent.detail.code).toEqual('1');
        // try to whitespace; prevents input & change event
        await expectInputHasFocus(el, 1);
        await page.keyboard.press(' ');
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
    });
    it('focuses the first empty input on click', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input value="12"></market-code-input>');
        el = await page.find('market-code-input');
        const lastInput = await el.find('pierce/input:last-of-type');
        await lastInput.click();
        await expectInputHasFocus(el, 2);
    });
    it('focuses the first empty input on inner input click', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input value="1"></market-code-input>');
        el = await page.find('market-code-input');
        const shadowInputs = await el.findAll('pierce/input');
        await shadowInputs[2].click();
        await expectInputHasFocus(el, 1);
    });
    it('ensures only single characters are in each input field', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input value="1234"></market-code-input>');
        el = await page.find('market-code-input');
        const firstInput = await el.find('pierce/input:first-of-type');
        await firstInput.click(); // select 1 in first input
        await page.keyboard.press('ArrowUp'); // remove selection and move cursor to the left of 1
        await page.keyboard.press('5'); // insert 5 before 1 in first input
        await page.waitForChanges();
        // replaces 1 with 5 in first input
        await expectValueToBe(el, '5234');
    });
    it('can prevent default on marketCodeInputValueChange', async () => {
        page = await newE2EPage();
        await page.setContent('<market-code-input></market-code-input>');
        await page.$eval('market-code-input', (el) => {
            el.addEventListener('marketCodeInputValueChange', (e) => {
                e.preventDefault();
            });
        });
        el = await page.find('market-code-input');
        // on keyboard input, value doesn't change
        await el.click();
        await expectInputHasFocus(el, 0);
        await page.keyboard.press('1');
        await page.waitForChanges();
        await expectValueToBe(el, '');
        // value can still be changed programmatically
        await page.$eval('market-code-input', (el) => {
            el.value = '4321';
        });
        await page.waitForChanges();
        await expectValueToBe(el, '4321');
    });
    // can't get this to work :(((
    describe.skip('when the clipboard has text', () => {
        let clipboardContents = '';
        beforeEach(() => {
            Object.assign(navigator, {
                clipboard: {
                    writeText: jest.fn((text) => {
                        clipboardContents = text;
                    }),
                    readText: jest.fn(() => clipboardContents),
                },
            });
        });
        it('allows pasting a value', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <input id="copy-me" value="1234" />
        <market-code-input></market-code-input>
      `);
            el = await page.find('market-code-input');
            // copy
            expect(await page.find('*:focus')).toBeNull();
            await page.keyboard.press('Tab');
            expect(await page.find('#copy-me:focus')).not.toBeNull();
            await page.keyboard.down('Meta');
            await page.keyboard.press('C');
            await page.keyboard.up('Meta');
            // paste
            await el.click();
            await page.keyboard.down('Meta');
            await page.keyboard.press('V');
            await page.keyboard.up('Meta');
            await page.waitForChanges();
            // None of these pass
            expect(await el.getProperty('value')).toBe('1234');
            expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
            expect(window.navigator.clipboard.readText).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=market-code-input.e2e.js.map
