import { newE2EPage } from "@stencil/core/testing";
export const setupPage = async (content) => {
    const page = await newE2EPage();
    await page.setContent(content);
    const el = await page.find('market-button');
    return { page, el };
};
describe('market-button: API', () => {
    let page;
    let el;
    describe('setFocus()', () => {
        describe('when NOT focused', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-button>Button</market-button>'));
            });
            describe('when setFocus() is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setFocus');
                    await page.waitForChanges();
                });
                it('focuses the el', async () => {
                    expect(await page.find(':focus')).toEqual(el);
                });
            });
        });
        describe('when focused', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-button>Button</market-button>'));
                await el.callMethod('setFocus');
            });
            describe('when setFocus(false) is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setFocus', false);
                    await page.waitForChanges();
                });
                it('blurs the el', async () => {
                    expect(await page.find(':focus')).not.toEqual(el);
                });
            });
        });
        describe('when disabled', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-button disabled>Button</market-button>'));
                await el.callMethod('setFocus');
            });
            describe('when setFocus() is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setFocus');
                    await page.waitForChanges();
                });
                it('does NOT focus the el', async () => {
                    expect(await page.find(':focus')).not.toEqual(el);
                });
            });
        });
        describe('when loading', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-button is-loading>Button</market-button>'));
                await el.callMethod('setFocus');
            });
            describe('when setFocus() is called', () => {
                beforeEach(async () => {
                    await el.callMethod('setFocus');
                    await page.waitForChanges();
                });
                // it does, but SHOULD it??
                it('focuses the el', async () => {
                    expect(await page.find(':focus')).toEqual(el);
                });
            });
        });
    });
});
//# sourceMappingURL=market-button.api.e2e.js.map
