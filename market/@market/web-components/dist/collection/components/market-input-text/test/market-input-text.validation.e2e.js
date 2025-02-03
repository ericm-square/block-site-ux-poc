import { newE2EPage } from "@stencil/core/testing";
describe('market-input-text: validation', () => {
    let page;
    let el;
    let inputEl;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent('<market-input-text autovalidate></market-input-text>');
        el = await page.find('market-input-text');
        inputEl = await el.find('pierce/input');
    });
    describe('when the input is required', () => {
        beforeEach(async () => {
            el.setProperty('required', true);
            await page.waitForChanges();
        });
        it('passes the required attribute down to the inner input', () => {
            expect(inputEl).toHaveAttribute('required');
        });
        it('correctly validates the input', async () => {
            await el.click();
            // input some text
            await page.keyboard.type('123');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '123');
            expect(el).not.toHaveAttribute('invalid');
            // delete the text
            await page.keyboard.press('Backspace');
            await page.keyboard.press('Backspace');
            await page.keyboard.press('Backspace');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '');
            expect(el).toHaveAttribute('invalid');
        });
    });
    describe('when a regex pattern is specified', () => {
        beforeEach(async () => {
            el.setProperty('pattern', '\\d{4,4}');
            await page.waitForChanges();
        });
        it('passes the pattern attribute down to the inner input', () => {
            expect(inputEl).toEqualAttribute('pattern', '\\d{4,4}');
        });
        it('correctly validates the input', async () => {
            await el.click();
            // invalid input
            await page.keyboard.type('123');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '123');
            expect(el).toHaveAttribute('invalid');
            // valid input
            await page.keyboard.type('4');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '1234');
            expect(el).not.toHaveAttribute('invalid');
            // invalid input
            await page.keyboard.type('5');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '12345');
            expect(el).toHaveAttribute('invalid');
        });
    });
    describe('when minlength & maxlength are specified', () => {
        beforeEach(async () => {
            el.setProperty('minlength', '2');
            el.setProperty('maxlength', '4');
            await page.waitForChanges();
        });
        it('passes the attributes down to the inner input', () => {
            expect(inputEl).toEqualAttribute('minlength', '2');
            expect(inputEl).toEqualAttribute('maxlength', '4');
        });
        it('correctly validates the input', async () => {
            await el.click();
            // not enough chars
            await page.keyboard.type('A');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', 'A');
            expect(el).toHaveAttribute('invalid');
            // valid input
            await page.keyboard.type('B');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', 'AB');
            expect(el).not.toHaveAttribute('invalid');
            // prevents too many chars
            await page.keyboard.type('CDE');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', 'ABCD');
            expect(el).not.toHaveAttribute('invalid');
        });
    });
    describe('when min & max are specified in a number input', () => {
        beforeEach(async () => {
            el.setProperty('type', 'number');
            el.setProperty('min', '5');
            el.setProperty('max', '15');
            await page.waitForChanges();
        });
        it('passes the attributes down to the inner input', () => {
            expect(inputEl).toEqualAttribute('type', 'number');
            expect(inputEl).toEqualAttribute('min', '5');
            expect(inputEl).toEqualAttribute('max', '15');
        });
        it('correctly validates the input', async () => {
            await el.click();
            // number is too low
            await page.keyboard.type('1');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '1');
            expect(el).toHaveAttribute('invalid');
            // valid input
            await page.keyboard.type('0');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '10');
            expect(el).not.toHaveAttribute('invalid');
            // number is too high
            await page.keyboard.type('0');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '100');
            expect(el).toHaveAttribute('invalid');
        });
    });
    describe('when min & max & step are specified in a number input', () => {
        beforeEach(async () => {
            el.setProperty('type', 'number');
            el.setProperty('min', '0');
            el.setProperty('max', '100');
            el.setProperty('step', '10');
            await page.waitForChanges();
        });
        it('passes the attributes down to the inner input', () => {
            expect(inputEl).toEqualAttribute('type', 'number');
            expect(inputEl).toEqualAttribute('min', '0');
            expect(inputEl).toEqualAttribute('max', '100');
            expect(inputEl).toEqualAttribute('step', '10');
        });
        it('correctly validates the input', async () => {
            await el.click();
            // number is not a multiple of min + step
            await page.keyboard.type('1');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '1');
            expect(el).toHaveAttribute('invalid');
            // valid input
            await page.keyboard.type('0');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '10');
            expect(el).not.toHaveAttribute('invalid');
            // number is not a multiple of min + step
            await page.keyboard.press('Backspace');
            await page.keyboard.type('5');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '15');
            expect(el).toHaveAttribute('invalid');
        });
    });
    describe('when min & max are specified in a time input', () => {
        beforeEach(async () => {
            el.setProperty('type', 'time');
            el.setProperty('min', '02:00');
            el.setProperty('max', '04:00');
            await page.waitForChanges();
        });
        it('passes the attributes down to the inner input', () => {
            expect(inputEl).toEqualAttribute('type', 'time');
            expect(inputEl).toEqualAttribute('min', '02:00');
            expect(inputEl).toEqualAttribute('max', '04:00');
        });
        it('marks invalid when the time is below the min', async () => {
            await el.click();
            await page.keyboard.type('0100AM');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '01:00');
            expect(el).toHaveAttribute('invalid');
        });
        it('does not mark invalid when the time is between the min and max', async () => {
            await el.click();
            await page.keyboard.type('0300AM');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '03:00');
            expect(el).not.toHaveAttribute('invalid');
        });
        it('marks invalid when the time is above the max', async () => {
            await el.click();
            await page.keyboard.type('0500AM');
            await page.waitForChanges();
            expect(el).toEqualAttribute('value', '05:00');
            expect(el).toHaveAttribute('invalid');
        });
    });
});
//# sourceMappingURL=market-input-text.validation.e2e.js.map
