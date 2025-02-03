import { newE2EPage } from "@stencil/core/testing";
export const setupPage = async (content) => {
    const page = await newE2EPage();
    await page.setContent(content);
    const el = await page.find('market-button');
    const form = await page.find('form');
    const click = await el.spyOnEvent('click');
    const submit = await (form === null || form === void 0 ? void 0 : form.spyOnEvent('submit'));
    return { page, el, click, submit };
};
describe('market-button: keyboard interactivity', () => {
    let page;
    let el;
    let click;
    let submit;
    describe('with defaults', () => {
        beforeEach(async () => {
            ({ page, el, click } = await setupPage('<market-button>Button</market-button>'));
        });
        it('can be tabbed into', async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(el);
        });
        describe('when focused', () => {
            beforeEach(async () => {
                await page.keyboard.press('Tab');
                await page.waitForChanges();
            });
            it('can be tabbed out of', async () => {
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).not.toEqual(el);
            });
            describe('when spacebar is pressed', () => {
                beforeEach(async () => {
                    await page.keyboard.press(' ');
                    await page.waitForChanges();
                });
                it('fires the click event', () => {
                    expect(click).toHaveReceivedEventTimes(1);
                });
            });
            describe('when enter is pressed', () => {
                beforeEach(async () => {
                    await page.keyboard.press('Enter');
                    await page.waitForChanges();
                });
                it('fires the click event', () => {
                    expect(click).toHaveReceivedEventTimes(1);
                });
            });
        });
    });
    describe('when disabled', () => {
        beforeEach(async () => {
            ({ page, el } = await setupPage('<market-button disabled>Button</market-button>'));
        });
        it('can NOT be tabbed into', async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(el);
        });
    });
    describe('when loading', () => {
        beforeEach(async () => {
            ({ page, el, click } = await setupPage('<market-button is-loading>Button</market-button>'));
        });
        // can be, but SHOULD it be allowed?
        it('can be tabbed into', async () => {
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).toEqual(el);
        });
        describe('when focused', () => {
            beforeEach(async () => {
                await page.keyboard.press('Tab');
                await page.waitForChanges();
            });
            it('can be tabbed out of', async () => {
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).not.toEqual(el);
            });
            describe('when spacebar is pressed', () => {
                beforeEach(async () => {
                    await page.keyboard.press(' ');
                    await page.waitForChanges();
                });
                it('does NOT fire the click event', () => {
                    expect(click).not.toHaveReceivedEvent();
                });
            });
            describe('when enter is pressed', () => {
                beforeEach(async () => {
                    await page.keyboard.press('Enter');
                    await page.waitForChanges();
                });
                it('does NOT fire the click event', () => {
                    expect(click).not.toHaveReceivedEvent();
                });
            });
        });
    });
    describe('with type submit & inside a form', () => {
        beforeEach(async () => {
            ({ page, el, submit } = await setupPage('<form><market-button type="submit">Button</market-button></form>'));
        });
        describe('when focused', () => {
            beforeEach(async () => {
                await page.keyboard.press('Tab');
                await page.waitForChanges();
            });
            describe('when spacebar is pressed', () => {
                beforeEach(async () => {
                    await page.keyboard.press(' ');
                    await page.waitForChanges();
                });
                it('it submits the form', () => {
                    expect(submit).toHaveReceivedEventTimes(1);
                });
            });
            describe('when enter is pressed', () => {
                beforeEach(async () => {
                    await page.keyboard.press('Enter');
                    await page.waitForChanges();
                });
                it('it submits the form', () => {
                    expect(submit).toHaveReceivedEventTimes(1);
                });
            });
        });
    });
});
//# sourceMappingURL=market-button.keyboard.e2e.js.map
