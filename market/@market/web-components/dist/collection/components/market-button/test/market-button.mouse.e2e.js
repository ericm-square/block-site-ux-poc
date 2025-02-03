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
describe('market-button: mouse interactivity', () => {
    let page;
    let el;
    let click;
    let submit;
    describe('with defaults', () => {
        beforeEach(async () => {
            ({ page, el, click } = await setupPage('<market-button>Button</market-button>'));
        });
        describe('when clicked', () => {
            beforeEach(async () => {
                await el.click();
                await page.waitForChanges();
            });
            it('fires the click event', () => {
                expect(click).toHaveReceivedEventTimes(1);
            });
        });
    });
    describe('when disabled', () => {
        beforeEach(async () => {
            ({ page, el, click } = await setupPage('<market-button disabled>Button</market-button>'));
        });
        describe('when clicked', () => {
            beforeEach(async () => {
                await el.click();
                await page.waitForChanges();
            });
            it('does NOT fire the click event', () => {
                expect(click).not.toHaveReceivedEvent();
            });
        });
    });
    describe('when loading', () => {
        beforeEach(async () => {
            ({ page, el, click } = await setupPage('<market-button is-loading>Button</market-button>'));
        });
        describe('when clicked', () => {
            beforeEach(async () => {
                await el.click();
                await page.waitForChanges();
            });
            it('does NOT fire the click event', () => {
                expect(click).not.toHaveReceivedEvent();
            });
        });
    });
    describe('with type submit & inside a form', () => {
        describe('when enabled', () => {
            beforeEach(async () => {
                ({ page, el, submit } = await setupPage('<form><market-button type="submit">Button</market-button></form>'));
            });
            describe('when clicked', () => {
                beforeEach(async () => {
                    await el.click();
                    await page.waitForChanges();
                });
                it('it submits the form', () => {
                    expect(submit).toHaveReceivedEventTimes(1);
                });
            });
        });
        describe('when disabled', () => {
            beforeEach(async () => {
                ({ page, el, submit } = await setupPage('<form><market-button type="submit" disabled>Button</market-button></form>'));
            });
            describe('when clicked', () => {
                beforeEach(async () => {
                    await el.click();
                    await page.waitForChanges();
                });
                it('it does NOT submit the form', () => {
                    expect(submit).not.toHaveReceivedEvent();
                });
            });
        });
        describe('when loading', () => {
            beforeEach(async () => {
                ({ page, el, submit } = await setupPage('<form><market-button type="submit" is-loading>Button</market-button></form>'));
            });
            describe('when clicked', () => {
                beforeEach(async () => {
                    await el.click();
                    await page.waitForChanges();
                });
                it('it does NOT submit the form', () => {
                    expect(submit).not.toHaveReceivedEvent();
                });
            });
        });
    });
});
//# sourceMappingURL=market-button.mouse.e2e.js.map
